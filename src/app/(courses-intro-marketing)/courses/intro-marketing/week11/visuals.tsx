/* ==========================================================================
   Week 11 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea. The week moves from broadcast
   to conversation, so a fixed cast of glyphs carries it: a person is a
   consumer, the ring-and-diamond seal is the brand (from Week 10), a search
   bar is search, an envelope is email, a browser window is a website, a
   speech bubble is social conversation, and a phone is the digital device.

   Colour code for the week:
     · SIGNAL  — paid (ads, SEM, bids) and the operative case
     · COUNTER — earned and organic (SEO, shares, reviews), or the risk
     · INK     — owned media and the neutral case

   Conventions carried over from earlier weeks:
     · viewBox width 800 (400 for column plates), flat fills, hairline rules
     · every label reuses words from the slide the plate sits on
     · trig results rounded, so server and client render the same markup
   ========================================================================== */

import React from "react";

import { Megaphone, ShareFat, ChatsCircle } from "@phosphor-icons/react";
import {
  COUNTER,
  COUNTER_TINT,
  Display,
  Frame,
  headAlong2,
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
  Arrow3,
  Bubble2,
  Bulb2,
  Coins2,
  CurveArrow1,
  Eye2,
  Gear2,
  GlyphFrame,
  Laptop2,
  Magnifier1,
  Mark2,
  Person3,
  Phone2,
  Star2,
  Tool,
  Tv2,
  TwoWay3,
} from "../_visuals/objects";

/* -- geometry helpers ------------------------------------------------------ */

/* -- the cast of the week -------------------------------------------------- */

/** Three short text lines inside a box: generic copy. */
function Lines({
  x,
  y,
  w,
  n = 3,
  gap = 6,
  tone = INK3,
  width = 1.25,
}: {
  x: number;
  y: number;
  w: number;
  n?: number;
  gap?: number;
  tone?: string;
  width?: number;
}) {
  return (
    <path
      d={Array.from({ length: n }, (_, i) => `M${x} ${y + i * gap}H${r2(x + (i === n - 1 ? w * 0.6 : w))}`).join("")}
      stroke={tone}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

/** A browser window (a website), top-left at (x, y). */
export function Browser({
  x,
  y,
  w = 90,
  h = 64,
  tone = INK,
  fill = PAPER,
  body = true,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  body?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill} stroke={tone} strokeWidth={1.5} />
      <line x1={x} y1={y + 12} x2={x + w} y2={y + 12} stroke={tone} strokeWidth={1} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 7 + i * 6} cy={y + 6} r={1.6} fill={tone} />
      ))}
      {body ? (
        <>
          <rect x={x + 8} y={y + 19} width={r2(w * 0.4)} height={r2(h * 0.34)} fill={PAPER2} stroke={tone} strokeWidth={0.75} />
          <Lines x={r2(x + w * 0.4 + 14)} y={y + 22} w={r2(w * 0.6 - 22)} n={3} gap={6} tone={tone} width={1} />
          <Lines x={x + 8} y={r2(y + h * 0.34 + 28)} w={w - 16} n={2} gap={6} tone={INK3} width={1} />
        </>
      ) : null}
    </g>
  );
}

/** A search bar with a magnifier, top-left at (x, y). */
export function SearchBar({
  x,
  y,
  w = 150,
  h = 26,
  tone = INK,
  fill = PAPER,
  text,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
  text?: string;
}) {
  const cy = y + h / 2;
  const mx = x + w - 16;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={tone} strokeWidth={1.5} />
      <circle cx={mx} cy={cy - 1.5} r={5} fill="none" stroke={tone} strokeWidth={1.5} />
      <line x1={mx + 3.5} y1={cy + 2} x2={mx + 7.5} y2={cy + 6} stroke={tone} strokeWidth={1.75} strokeLinecap="round" />
      {text ? (
        <text x={x + 12} y={cy + 4} fontFamily="var(--font-body)" fontSize={11} fill={INK}>
          {text}
        </text>
      ) : (
        <line x1={x + 12} y1={cy} x2={x + w * 0.45} y2={cy} stroke={INK3} strokeWidth={1.25} strokeLinecap="round" />
      )}
    </g>
  );
}

/** An envelope, centred on (x, y). About 40 by 26 at k = 1. */
export function Envelope({
  x,
  y,
  k = 1,
  tone = INK,
  fill = PAPER,
  width = 1.5,
}: {
  x: number;
  y: number;
  k?: number;
  tone?: string;
  fill?: string;
  width?: number;
}) {
  const w = r2(20 * k);
  const h = r2(13 * k);
  return (
    <g strokeLinejoin="round">
      <rect x={r2(x - w)} y={r2(y - h)} width={r2(w * 2)} height={r2(h * 2)} rx={2} fill={fill} stroke={tone} strokeWidth={width} />
      <path d={`M${r2(x - w)} ${r2(y - h)}L${x} ${r2(y + h * 0.15)}L${r2(x + w)} ${r2(y - h)}`} fill="none" stroke={tone} strokeWidth={width} />
    </g>
  );
}

/** A heart, centred on (x, y): a like. */
export function Heart({
  x,
  y,
  s = 8,
  tone = SIGNAL,
  fill,
}: {
  x: number;
  y: number;
  s?: number;
  tone?: string;
  fill?: string;
}) {
  const k = s / 8;
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <path
      d={`M${X(0)} ${Y(7)}C${X(-9)} ${Y(1)} ${X(-9)} ${Y(-7)} ${X(-4.5)} ${Y(-7)}C${X(-2)} ${Y(-7)} ${X(0)} ${Y(-5)} ${X(0)} ${Y(-3)}C${X(0)} ${Y(-5)} ${X(2)} ${Y(-7)} ${X(4.5)} ${Y(-7)}C${X(9)} ${Y(-7)} ${X(9)} ${Y(1)} ${X(0)} ${Y(7)}Z`}
      fill={fill ?? tone}
      stroke={tone}
      strokeWidth={1.25}
      strokeLinejoin="round"
    />
  );
}

/** A share arrow (a curved arrow leaving a box), centred on (x, y). */
export function ShareGlyph({ x, y, tone = COUNTER }: { x: number; y: number; tone?: string }) {
  return (
    <g>
      <path d={`M${x - 8} ${y - 1}V${y + 8}H${x + 8}V${y + 3}`} fill="none" stroke={tone} strokeWidth={1.5} strokeLinejoin="round" />
      <CurveArrow1 x1={x - 4} y1={y + 3} cx={x - 3} cy={y - 7} x2={x + 9} y2={y - 7} tone={tone} width={1.5} size={5} />
    </g>
  );
}

/** A paid ad unit: a box with an "AD" badge, top-left at (x, y). */
export function AdUnit({
  x,
  y,
  w = 90,
  h = 50,
  tone = SIGNAL,
  fill = SIGNAL_TINT,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  fill?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={tone} strokeWidth={1.5} />
      <rect x={x + 6} y={y + 6} width={22} height={13} fill={tone} />
      <text x={x + 17} y={y + 16} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={9} fill={PAPER}>
        AD
      </text>
      <Lines x={x + 36} y={y + 11} w={w - 46} n={2} gap={6} tone={tone} width={1.25} />
      <Lines x={x + 8} y={y + 29} w={w - 16} n={2} gap={6} tone={INK3} width={1} />
    </g>
  );
}

/** A radio set, centred on x, standing on y. */
export function Radio({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <line x1={X(-20)} y1={Y(-34)} x2={X(10)} y2={Y(-58)} stroke={tone} strokeWidth={1.5} />
      <rect x={X(-34)} y={Y(-34)} width={r2(68 * k)} height={r2(34 * k)} rx={4} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <circle cx={X(-14)} cy={Y(-17)} r={r2(10 * k)} fill={PAPER2} stroke={tone} strokeWidth={1} />
      <path d={`M${X(4)} ${Y(-24)}H${X(26)}M${X(4)} ${Y(-17)}H${X(26)}M${X(4)} ${Y(-10)}H${X(26)}`} stroke={tone} strokeWidth={1} />
    </g>
  );
}

/** A folded newspaper, centred on (x, y). Print. */
export function Paper({ x, y, k = 1, tone = INK }: { x: number; y: number; k?: number; tone?: string }) {
  return <Tool kind="pr" x={x} y={y} k={k} tone={tone} />;
}

/** A padlock, centred on (x, y). */
function Lock({ x, y, k = 1, tone = SIGNAL, fill = PAPER }: { x: number; y: number; k?: number; tone?: string; fill?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g>
      <path d={`M${X(-7)} ${Y(-2)}V${Y(-8)}A${r2(7 * k)} ${r2(7 * k)} 0 0 1 ${X(7)} ${Y(-8)}V${Y(-2)}`} fill="none" stroke={tone} strokeWidth={2} />
      <rect x={X(-11)} y={Y(-2)} width={r2(22 * k)} height={r2(16 * k)} rx={2} fill={fill} stroke={tone} strokeWidth={1.5} />
      <circle cx={x} cy={Y(5)} r={r2(2 * k)} fill={tone} />
    </g>
  );
}

/** A shield, centred on (x, y). */
function Shield({ x, y, k = 1, tone = COUNTER, fill = COUNTER_TINT }: { x: number; y: number; k?: number; tone?: string; fill?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <path
      d={`M${X(0)} ${Y(-24)}L${X(20)} ${Y(-16)}V${Y(0)}Q${X(20)} ${Y(16)} ${X(0)} ${Y(26)}Q${X(-20)} ${Y(16)} ${X(-20)} ${Y(0)}V${Y(-16)}Z`}
      fill={fill}
      stroke={tone}
      strokeWidth={1.75}
      strokeLinejoin="round"
    />
  );
}

/** A data file: a sheet with a folded corner and rows, centred on (x, y). */
function DataFile({ x, y, k = 1, tone = INK, fill = PAPER }: { x: number; y: number; k?: number; tone?: string; fill?: string }) {
  const X = (d: number) => r2(x + d * k);
  const Y = (d: number) => r2(y + d * k);
  return (
    <g strokeLinejoin="round">
      <path d={`M${X(-12)} ${Y(-16)}H${X(6)}L${X(12)} ${Y(-10)}V${Y(16)}H${X(-12)}Z`} fill={fill} stroke={tone} strokeWidth={1.5} />
      <path d={`M${X(-7)} ${Y(-4)}H${X(7)}M${X(-7)} ${Y(2)}H${X(7)}M${X(-7)} ${Y(8)}H${X(3)}`} stroke={tone} strokeWidth={1} />
    </g>
  );
}

/* -- small glyph frames for HTML strips ------------------------------------ */

export type ChannelKind = "seo" | "sem" | "content" | "email";

/** The four strategies of Part 2 as glyphs, for the strategy strip. */
export function ChannelGlyph({
  kind,
  tone = INK,
  size = 56,
}: {
  kind: ChannelKind;
  tone?: string;
  size?: number;
}) {
  const fill = tone === SIGNAL ? SIGNAL_TINT : PAPER;
  return (
    <svg viewBox="0 0 64 48" width={size} height={Math.round((size * 48) / 64)} aria-hidden className="block shrink-0">
      {kind === "seo" ? (
        <g>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M10 ${10 + i * 12}H${i === 0 ? 40 : 34}`} stroke={i === 0 ? tone : INK3} strokeWidth={i === 0 ? 3 : 2} strokeLinecap="round" />
          ))}
          <path d="M52 34V14M46 20L52 14L58 20" fill="none" stroke={tone} strokeWidth={2} strokeLinejoin="round" />
        </g>
      ) : kind === "sem" ? (
        <g>
          <rect x={6} y={8} width={52} height={16} fill={fill} stroke={tone} strokeWidth={1.5} />
          <rect x={9} y={11} width={14} height={10} fill={tone} />
          <text x={16} y={19} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={7} fill={PAPER}>
            AD
          </text>
          <path d="M28 16H52" stroke={tone} strokeWidth={1.5} />
          <path d="M10 32H48M10 40H40" stroke={INK3} strokeWidth={2} strokeLinecap="round" />
        </g>
      ) : kind === "content" ? (
        <g>
          <rect x={16} y={4} width={32} height={40} rx={2} fill={fill} stroke={tone} strokeWidth={1.5} />
          <path d="M28 14L38 20L28 26Z" fill={tone} />
          <path d="M22 33H42M22 38H36" stroke={tone} strokeWidth={1.25} />
        </g>
      ) : (
        <Envelope x={32} y={24} k={1.1} tone={tone} fill={fill} />
      )}
    </svg>
  );
}

/* ==========================================================================
   TITLE — from broadcast to ecosystem
   ========================================================================== */

/** Left, one tower talking at a row of people. Right, the same people linked. */
export function Transition() {
  const left = [60, 110, 160, 210, 260];
  const net = [
    { x: 520, y: 70 },
    { x: 620, y: 52 },
    { x: 720, y: 86 },
    { x: 560, y: 168 },
    { x: 690, y: 176 },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 4],
  ];
  const hub = { x: 626, y: 118 };
  return (
    <Frame
      height={240}
      label="On the left a megaphone above a row of five people, one-way arrows pointing down at them. An arrow leads right to an ecosystem: five people with phones, each joined to the others and to a brand seal in the middle."
    >
      <Tool kind="ad" x={160} y={40} k={1.1} tone={INK} />
      {left.map((x) => (
        <g key={x}>
          <Arrow3 x1={160} y1={64} x2={Math.round(160 + (x - 160) * 0.9)} y2={146} tone={INK3} width={1} size={6} />
          <Person3 x={x} y={192} k={0.9} stroke={INK} />
        </g>
      ))}
      <Key x={160} y={222} anchor="middle" fill={INK3} size={10}>
        TRADITIONAL STRATEGIES
      </Key>
      <Arrow3 x1={320} y1={120} x2={440} y2={120} tone={SIGNAL} width={2} />
      {links.map(([a, b], i) => (
        <line key={i} x1={net[a].x} y1={net[a].y} x2={net[b].x} y2={net[b].y} stroke={COUNTER} strokeWidth={1} />
      ))}
      {net.map((p, i) => (
        <line key={`h${i}`} x1={hub.x} y1={hub.y} x2={p.x} y2={p.y} stroke={SIGNAL} strokeWidth={1.25} />
      ))}
      <circle cx={hub.x} cy={hub.y} r={18} fill={PAPER} stroke="none" />
      <Mark2 x={hub.x} y={hub.y} r={13} />
      {net.map((p, i) => (
        <g key={`p${i}`}>
          <circle cx={p.x} cy={p.y} r={20} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
          <Phone2 x={p.x} y={p.y} k={0.55} tone={COUNTER} />
        </g>
      ))}
      <Key x={626} y={222} anchor="middle" fill={SIGNAL} size={10}>
        DIGITAL ECOSYSTEMS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   THE EVOLUTION
   ========================================================================== */

/** Print, radio and TV talk one way; the phone talks both ways. */
export function MediaTimeline() {
  const eras = [
    { x: 110, kind: "print" as const, key: "PRINT" },
    { x: 280, kind: "radio" as const, key: "RADIO" },
    { x: 450, kind: "tv" as const, key: "TELEVISION" },
  ];
  return (
    <Frame
      height={330}
      label="A time line running left to right. Print, radio and television each sit above it with a single arrow pointing down at a crowd of three people. At the far end a phone sits above it, and between the phone and one person, speech bubbles go both ways."
    >
      <Arrow3 x1={30} y1={150} x2={776} y2={150} tone={INK3} width={1.25} />
      {eras.map((e) => (
        <g key={e.key}>
          {e.kind === "print" ? (
            <Paper x={e.x} y={82} k={1.3} />
          ) : e.kind === "radio" ? (
            <Radio x={e.x} y={104} k={1} />
          ) : (
            <Tv2 x={e.x} y={108} k={1} />
          )}
          <Key x={e.x} y={132} anchor="middle" fill={INK} size={10}>
            {e.key}
          </Key>
          <circle cx={e.x} cy={150} r={4} fill={INK} />
          <Arrow3 x1={e.x} y1={160} x2={e.x} y2={210} tone={INK} width={1.5} />
          {[-26, 0, 26].map((d) => (
            <Person3 key={d} x={e.x + d} y={262} k={0.8} stroke={INK3} />
          ))}
        </g>
      ))}
      <path d="M60 290H500" stroke={INK} strokeWidth={1} />
      <Key x={280} y={312} anchor="middle" fill={INK} size={10}>
        STATIC, ONE-WAY COMMUNICATION
      </Key>
      {/* digital */}
      <rect x={560} y={30} width={216} height={292} fill={SIGNAL_TINT} stroke="none" />
      <Phone2 x={620} y={84} k={1.3} tone={SIGNAL} />
      <circle cx={620} cy={150} r={5} fill={SIGNAL} />
      <Person3 x={730} y={272} k={1.2} stroke={INK} />
      <Bubble2 x={576} y={172} w={66} h={26} tone={SIGNAL} fill={PAPER} tail="left" />
      <Lines x={586} y={182} w={44} n={2} gap={6} tone={SIGNAL} />
      <Bubble2 x={650} y={206} w={66} h={26} tone={INK} fill={PAPER} tail="right" />
      <Lines x={660} y={216} w={44} n={2} gap={6} tone={INK} />
      <Key x={668} y={312} anchor="middle" fill={SIGNAL} size={10}>
        INTERACTIVE DIALOGUES
      </Key>
    </Frame>
  );
}

/** One person picked out of a crowd, and a counter that records the response. */
export function Precision() {
  const crowd: { x: number; y: number }[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) crowd.push({ x: 60 + c * 56, y: 72 + r * 56 });
  const target = 9;
  const t = crowd[target];
  return (
    <Frame
      width={400}
      height={290}
      label="A grid of eighteen people. A crosshair sits on exactly one of them. Below, a meter with tick marks records that person's response."
    >
      {crowd.map((p, i) => (
        <Person3 key={i} x={p.x} y={p.y + 14} k={0.8} stroke={i === target ? SIGNAL : INK3} fill={i === target ? SIGNAL_TINT : PAPER} />
      ))}
      <circle cx={t.x} cy={t.y} r={24} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <path d={`M${t.x - 32} ${t.y}H${t.x - 18}M${t.x + 18} ${t.y}H${t.x + 32}M${t.x} ${t.y - 32}V${t.y - 18}M${t.x} ${t.y + 18}V${t.y + 32}`} stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={20} y={218} fill={SIGNAL} size={9.5}>
        PRECISION TARGETING
      </Key>
      <line x1={20} y1={252} x2={380} y2={252} stroke={INK} strokeWidth={1.25} />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={20 + i * 30} y1={252} x2={20 + i * 30} y2={i % 4 === 0 ? 240 : 246} stroke={INK} strokeWidth={1} />
      ))}
      <rect x={20} y={246} width={210} height={6} fill={COUNTER} />
      <Key x={380} y={276} anchor="end" fill={COUNTER} size={9.5}>
        MEASURABLE ENGAGEMENT
      </Key>
    </Frame>
  );
}

/** A steady line and a quick zigzag join into one line that reaches the marketer. */
export function Blend() {
  return (
    <Frame
      width={400}
      height={250}
      label="Two lines enter from the left: a straight, steady ink line labelled traditional principles and a quick zigzag line labelled digital agility. They merge into one line that runs to a person, the modern marketer."
    >
      <Key x={20} y={40} fill={INK} size={9.5}>
        TRADITIONAL PRINCIPLES
      </Key>
      <path d="M20 60H150Q210 60 240 120" fill="none" stroke={INK} strokeWidth={3} />
      <Key x={20} y={218} fill={SIGNAL} size={9.5}>
        DIGITAL AGILITY
      </Key>
      <path d="M20 184L34 168L48 190L62 170L76 192L90 172L104 190L118 174L134 186L150 178Q210 180 240 124" fill="none" stroke={SIGNAL} strokeWidth={2} strokeLinejoin="round" />
      <path d="M240 122H300" stroke={INK} strokeWidth={3} />
      <path d="M240 122H300" stroke={SIGNAL} strokeWidth={1} strokeDasharray="4 3" />
      <Arrow3 x1={300} y1={122} x2={322} y2={122} tone={INK} width={3} />
      <Person3 x={352} y={150} k={1.3} stroke={INK} fill={SIGNAL_TINT} />
      <Key x={352} y={176} anchor="middle" fill={INK} size={9}>
        THE MODERN
      </Key>
      <Key x={352} y={189} anchor="middle" fill={INK} size={9}>
        MARKETER
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   THE PROBLEM
   ========================================================================== */

/** Legacy operations on one cliff, the digital space on the other, a gap. */
export function LegacyGap() {
  return (
    <Frame
      height={260}
      label="Two cliffs with a gap between them. On the left cliff a heavy filing cabinet and stacked papers, legacy operations. On the right cliff a browser window and a phone, the digital space. A dashed arrow from the cabinet arcs toward the right cliff but falls into the gap."
    >
      <path d="M20 170H300L310 250H20Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M500 170H780V250H490Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      {/* filing cabinet */}
      <rect x={150} y={62} width={76} height={108} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1={150} y1={98 + i * 36 - 36 + 36} x2={226} y2={98 + i * 36 - 36 + 36} stroke={INK} strokeWidth={1} />
          <rect x={176} y={72 + i * 36} width={24} height={6} fill={PAPER2} stroke={INK} strokeWidth={1} />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={64 - (i % 2) * 3} y={158 - i * 10} width={56} height={10} fill={PAPER} stroke={INK} strokeWidth={1.1} />
      ))}
      <Key x={130} y={200} anchor="middle" fill={INK} size={10}>
        LEGACY OPERATIONS
      </Key>
      {/* digital space */}
      <Browser x={560} y={80} w={120} h={82} tone={COUNTER} />
      <Phone2 x={720} y={138} k={1.2} tone={COUNTER} />
      <Key x={640} y={200} anchor="middle" fill={COUNTER} size={10}>
        THE DIGITAL SPACE
      </Key>
      {/* the failed crossing */}
      <CurveArrow1 x1={236} y1={90} cx={360} cy={30} x2={404} y2={228} tone={SIGNAL} width={1.75} dash="5 4" />
      <Key x={404} y={120} anchor="middle" fill={SIGNAL} size={10}>
        STRUGGLE
      </Key>
    </Frame>
  );
}

/** The same seal carried across fast platforms, drifting out of shape. */
export function ConsistencyDrift() {
  const xs = [52, 126, 200, 274, 348];
  return (
    <Frame
      width={400}
      height={230}
      label="Five phone screens in a row, each with speed lines behind it. The first shows the brand seal. On each next screen the seal drifts: tilted, then squashed, then a different shape altogether."
    >
      {xs.map((x, i) => (
        <g key={x}>
          <path d={`M${x - 34} ${80}H${x - 22}M${x - 36} ${96}H${x - 22}M${x - 32} ${112}H${x - 22}`} stroke={RULE2} strokeWidth={1.25} />
          <Phone2 x={x} y={96} k={1.35} tone={INK} />
          {i === 0 ? (
            <Mark2 x={x} y={92} r={10} />
          ) : i === 1 ? (
            <g transform={`rotate(20 ${x} 92)`}>
              <Mark2 x={x} y={92} r={10} />
            </g>
          ) : i === 2 ? (
            <g transform={`translate(${x} 92) scale(1.25 0.7) translate(${-x} -92)`}>
              <Mark2 x={x} y={92} r={10} tone={COUNTER} />
            </g>
          ) : i === 3 ? (
            <rect x={x - 9} y={83} width={18} height={18} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
          ) : (
            <path d={`M${x} ${80}L${x + 11} ${102}H${x - 11}Z`} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} strokeLinejoin="round" />
          )}
        </g>
      ))}
      <Arrow3 x1={20} y1={160} x2={380} y2={160} tone={INK3} width={1} size={6} />
      <Key x={20} y={186} fill={INK} size={9.5}>
        MULTIPLE FAST-PACED PLATFORMS
      </Key>
      <Key x={20} y={206} fill={COUNTER} size={9.5}>
        BRAND CONSISTENCY
      </Key>
    </Frame>
  );
}

/** A small organisation under a towering heap of tools. */
export function ToolPile() {
  const kinds = ["browser", "search", "mail", "chart", "phone", "ad", "bubble", "heart"];
  const pile: { x: number; y: number; k: string }[] = [];
  const rows = [7, 6, 6, 5, 4, 3];
  rows.forEach((n, r) => {
    for (let i = 0; i < n; i++) {
      pile.push({ x: 200 - ((n - 1) * 40) / 2 + i * 40, y: 196 - r * 30, k: kinds[(r * 3 + i) % kinds.length] });
    }
  });
  return (
    <Frame
      width={400}
      height={262}
      label="A small person stands under a towering pile of some thirty digital tool icons: browser windows, search bars, envelopes, charts, phones, ads, speech bubbles and hearts. There is no map or plan in the person's hands."
    >
      {pile.map((p, i) => (
        <g key={i}>
          <rect x={p.x - 17} y={p.y - 13} width={34} height={26} rx={3} fill={PAPER} stroke={INK3} strokeWidth={1} />
          {p.k === "browser" ? (
            <Browser x={p.x - 12} y={p.y - 9} w={24} h={18} tone={INK} body={false} />
          ) : p.k === "search" ? (
            <Magnifier1 x={p.x - 2} y={p.y - 2} r={5} tone={INK} />
          ) : p.k === "mail" ? (
            <Envelope x={p.x} y={p.y} k={0.5} tone={INK} width={1.1} />
          ) : p.k === "chart" ? (
            <path d={`M${p.x - 10} ${p.y + 7}L${p.x - 3} ${p.y}L${p.x + 2} ${p.y + 3}L${p.x + 10} ${p.y - 7}`} fill="none" stroke={INK} strokeWidth={1.5} />
          ) : p.k === "phone" ? (
            <Phone2 x={p.x} y={p.y} k={0.45} tone={INK} />
          ) : p.k === "ad" ? (
            <g>
              <rect x={p.x - 10} y={p.y - 6} width={20} height={12} fill={SIGNAL} />
              <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={8} fill={PAPER}>
                AD
              </text>
            </g>
          ) : p.k === "bubble" ? (
            <Bubble2 x={p.x - 10} y={p.y - 8} w={20} h={12} tone={INK} width={1.1} />
          ) : (
            <Heart x={p.x} y={p.y} s={6} tone={SIGNAL} />
          )}
        </g>
      ))}
      <Person3 x={200} y={250} k={0.9} stroke={COUNTER} fill={COUNTER_TINT} />
      <Key x={236} y={246} fill={COUNTER} size={9}>
        NO CLEAR STRATEGY
      </Key>
    </Frame>
  );
}

/** A customer asks; the brand answers at once, by name. */
export function Expectation() {
  return (
    <Frame
      height={250}
      label="A chat thread. A customer on the left sends a question bubble. A stopwatch in the middle has barely moved. The brand seal on the right replies at once, and its reply bubble carries a small portrait of that same customer: personalized."
    >
      <Person3 x={80} y={200} k={1.8} stroke={INK} fill={COUNTER_TINT} />
      <Bubble2 x={130} y={50} w={180} h={50} tone={INK} tail="left" />
      <Display x={150} y={86} size={28} fill={INK}>
        ?
      </Display>
      <Lines x={178} y={66} w={110} n={3} gap={8} tone={INK} />
      {/* stopwatch */}
      <circle cx={400} cy={150} r={40} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <rect x={393} y={100} width={14} height={8} fill={INK} />
      <path d="M400 150V116" stroke={SIGNAL} strokeWidth={2.25} strokeLinecap="round" />
      <path d="M400 150L406 118" stroke={SIGNAL} strokeWidth={1} />
      <path d="M400 110A40 40 0 0 1 410 111L400 150Z" fill={SIGNAL_TINT} />
      <circle cx={400} cy={150} r={3} fill={INK} />
      <Key x={400} y={220} anchor="middle" fill={SIGNAL} size={10}>
        IMMEDIATE
      </Key>
      <Bubble2 x={490} y={120} w={200} h={56} tone={SIGNAL} fill={SIGNAL_TINT} tail="right" />
      <circle cx={518} cy={148} r={14} fill={PAPER} stroke={SIGNAL} strokeWidth={1} />
      <Person3 x={518} y={160} k={0.55} stroke={INK} fill={COUNTER_TINT} width={1.1} />
      <Lines x={544} y={138} w={130} n={3} gap={9} tone={SIGNAL} />
      <Mark2 x={730} y={200} r={20} />
      <Key x={590} y={220} anchor="middle" fill={SIGNAL} size={10}>
        PERSONALIZED
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   WHAT IS DIGITAL MARKETING?
   ========================================================================== */

/** Inside the boundary, everything on a device or the internet. */
export function DeviceBoundary() {
  return (
    <Frame
      height={290}
      label="A large rounded boundary labelled digital marketing holds a phone, a laptop, a browser window and a globe for the internet. Outside the boundary, left in grey, sit a printed flyer and a roadside billboard."
    >
      <rect x={30} y={36} width={520} height={220} rx={24} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={2} />
      <Key x={54} y={64} fill={SIGNAL} size={10.5}>
        DIGITAL MARKETING
      </Key>
      <Phone2 x={96} y={170} k={1.5} tone={INK} />
      <Laptop2 x={210} y={206} k={1.3} tone={INK} />
      <Browser x={290} y={118} w={120} h={86} tone={INK} />
      {/* globe */}
      <g>
        <circle cx={486} cy={160} r={40} fill={PAPER} stroke={INK} strokeWidth={1.5} />
        <ellipse cx={486} cy={160} rx={17} ry={40} fill="none" stroke={INK} strokeWidth={1} />
        <path d="M446 160H526M452 140H520M452 180H520" stroke={INK} strokeWidth={1} />
      </g>
      <Key x={150} y={240} anchor="middle" fill={INK} size={9.5}>
        AN ELECTRONIC DEVICE
      </Key>
      <Key x={486} y={226} anchor="middle" fill={INK} size={9.5}>
        THE INTERNET
      </Key>
      {/* outside */}
      <rect x={600} y={112} width={52} height={70} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <Lines x={608} y={126} w={36} n={5} gap={9} tone={INK3} />
      <rect x={674} y={96} width={100} height={56} fill={PAPER} stroke={INK3} strokeWidth={1.25} />
      <path d="M704 152V204M744 152V204" stroke={INK3} strokeWidth={1.5} />
      <Lines x={686} y={112} w={76} n={3} gap={10} tone={INK3} />
      <line x1={590} y1={204} x2={790} y2={204} stroke={RULE2} strokeWidth={1} />
    </Frame>
  );
}

/** Brand to four channels to current and prospective customers. */
export function ChannelsConnect() {
  const ch = [
    { y: 50, key: "SEARCH ENGINES" },
    { y: 116, key: "SOCIAL MEDIA" },
    { y: 182, key: "EMAIL" },
    { y: 248, key: "OTHER WEBSITES" },
  ];
  return (
    <Frame
      height={300}
      label="The brand seal on the left. Lines run from it to four channels in a column: a search bar, a speech bubble, an envelope and a browser window. From the channels, lines run on to two groups of people on the right: solid current customers above, dashed prospective customers below."
    >
      <Mark2 x={70} y={150} r={26} />
      {ch.map((c, i) => (
        <g key={c.key}>
          <line x1={98} y1={150} x2={268} y2={c.y} stroke={SIGNAL} strokeWidth={1.25} />
          {i === 0 ? (
            <SearchBar x={270} y={c.y - 13} w={110} tone={INK} />
          ) : i === 1 ? (
            <g>
              <Bubble2 x={296} y={c.y - 16} w={46} h={26} tone={INK} />
              <Heart x={319} y={c.y - 3} s={6} />
            </g>
          ) : i === 2 ? (
            <Envelope x={322} y={c.y} k={1.1} tone={INK} />
          ) : (
            <Browser x={290} y={c.y - 20} w={62} h={40} tone={INK} body={false} />
          )}
          <Key x={410} y={c.y + 4} fill={INK} size={9.5}>
            {c.key}
          </Key>
        </g>
      ))}
      {ch.map((c) => (
        <g key={`o${c.key}`}>
          <line x1={540} y1={c.y} x2={600} y2={c.y < 150 ? 110 : 230} stroke={INK3} strokeWidth={1} />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <Person3 key={`c${i}`} x={630 + i * 40} y={124} k={1} stroke={INK} fill={SIGNAL_TINT} />
      ))}
      <Key x={670} y={146} anchor="middle" fill={INK} size={9.5}>
        CURRENT
      </Key>
      {[0, 1, 2].map((i) => (
        <g key={`p${i}`} strokeDasharray="3 2">
          <Person3 x={630 + i * 40} y={244} k={1} stroke={INK3} />
        </g>
      ))}
      <Key x={670} y={266} anchor="middle" fill={INK3} size={9.5}>
        PROSPECTIVE
      </Key>
    </Frame>
  );
}

/** A campaign line tracked live; feedback arrives; the course turns. */
export function TrackAdjust() {
  return (
    <Frame
      height={280}
      label="A chart with a campaign line tracked over time. It dips; at the low point a feedback bubble appears right away; a turning arrow marks the adjustment, and the line climbs again. A dashed line shows where the unchanged campaign would have gone."
    >
      <g>
        <path d="M60 40V230H770" fill="none" stroke={INK} strokeWidth={1.25} />
        <path d="M60 140C160 130 230 150 300 190" fill="none" stroke={INK} strokeWidth={2.25} />
        <path d="M300 190C380 230 460 244 560 250" fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="5 4" />
        <path d="M300 190C340 176 380 130 460 100C540 72 640 66 740 60" fill="none" stroke={SIGNAL} strokeWidth={2.5} />
        <circle cx={300} cy={190} r={6} fill={SIGNAL} />
        {[100, 160, 220, 280].map((x) => (
          <line key={x} x1={x} y1={226} x2={x} y2={234} stroke={INK} strokeWidth={1} />
        ))}
        <g>
          <Key x={70} y={254} fill={INK} size={9.5}>
            REAL-TIME TRACKING
          </Key>
        </g>
        <g>
          <Bubble2 x={212} y={56} w={148} h={40} tone={COUNTER} fill={COUNTER_TINT} />
          <Key x={286} y={80} anchor="middle" fill={COUNTER} size={9}>
            IMMEDIATE FEEDBACK
          </Key>
          <Arrow3 x1={290} y1={106} x2={298} y2={176} tone={COUNTER} width={1.25} size={6} />
        </g>
        <g>
          <CurveArrow1 x1={330} y1={214} cx={400} cy={210} x2={404} y2={142} tone={SIGNAL} width={1.75} />
          <Key x={420} y={210} fill={SIGNAL} size={9.5}>
            RAPID CAMPAIGN ADJUSTMENT
          </Key>
        </g>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   THE PARADIGM SHIFT
   ========================================================================== */

/** One tower, one identical message, a grid of identical receivers. */
export function Broadcast() {
  const grid: { x: number; y: number }[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) grid.push({ x: 70 + c * 52, y: 140 + r * 44 });
  return (
    <Frame
      width={400}
      height={290}
      label="A broadcast tower at the top sends rings outward. Below, a grid of eighteen people each receives the same brand seal, identical for all."
    >
      <path d="M200 26L186 96H214Z" fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M190 76H210M193 60H207" stroke={INK} strokeWidth={1} />
      <circle cx={200} cy={24} r={4} fill={INK} />
      {[16, 28, 40].map((r) => (
        <path key={r} d={`M${200 - r} ${24 + r * 0.2}A${r} ${r} 0 0 1 ${200 + r} ${24 + r * 0.2}`} fill="none" stroke={INK3} strokeWidth={1} />
      ))}
      {grid.map((p, i) => (
        <g key={i}>
          <Mark2 x={p.x + 12} y={p.y - 30} r={5} tone={INK} />
          <Person3 x={p.x} y={p.y} k={0.7} stroke={INK3} />
        </g>
      ))}
      <Key x={200} y={276} anchor="middle" fill={INK} size={9.5}>
        UNIFORM MESSAGE · BROAD AUDIENCE
      </Key>
    </Frame>
  );
}

/** A brand and three people, each talking back. */
export function Conversation() {
  const people = [
    { x: 80, y: 250 },
    { x: 200, y: 250 },
    { x: 320, y: 250 },
  ];
  return (
    <Frame
      width={400}
      height={290}
      label="The brand seal at the top. Below, three people. Between the brand and each person a two-way arrow, and each person has a speech bubble of their own."
    >
      <Mark2 x={200} y={44} r={22} />
      {people.map((p, i) => (
        <g key={i}>
          <TwoWay3 x1={200 + (p.x - 200) * 0.2} y1={74} x2={p.x} y2={170} tone={SIGNAL} width={1.5} />
          <Person3 x={p.x} y={p.y} k={1.2} stroke={INK} fill={i === 1 ? SIGNAL_TINT : PAPER} />
          <Bubble2 x={p.x + 12} y={186} w={40} h={20} tone={INK} tail="left" width={1.25} />
          <Lines x={p.x + 19} y={193} w={26} n={2} gap={6} tone={INK} width={1} />
        </g>
      ))}
      <Key x={200} y={278} anchor="middle" fill={SIGNAL} size={9.5}>
        TWO-WAY CONVERSATION
      </Key>
    </Frame>
  );
}

/** One post: shared outward, commented on below, and personalized per reader. */
export function SharedCampaign() {
  return (
    <Frame
      height={300}
      label="A campaign post in the middle. On the left, a thread of comment bubbles hangs from it. On the right, share arrows carry it to three people, and each person's copy carries their own colour and initial."
    >
      {/* the post */}
      <rect x={300} y={40} width={200} height={200} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <rect x={316} y={56} width={168} height={110} fill={PAPER2} stroke={INK} strokeWidth={1} />
      <Mark2 x={400} y={111} r={22} />
      <Heart x={330} y={190} s={8} />
      <Bubble2 x={354} y={180} w={22} h={16} tone={INK} width={1.25} />
      <ShareGlyph x={410} y={188} />
      <Lines x={320} y={216} w={150} n={2} gap={8} tone={INK3} />
      {/* comments */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Bubble2 x={60 + i * 16} y={70 + i * 58} w={170} h={36} tone={INK} tail="left" width={1.25} />
          <Lines x={76 + i * 16} y={82 + i * 58} w={130} n={2} gap={8} tone={INK} width={1} />
        </g>
      ))}
      <line x1={250} y1={128} x2={298} y2={128} stroke={INK} strokeWidth={1} strokeDasharray="3 3" />
      <Key x={130} y={268} anchor="middle" fill={INK} size={10}>
        COMMENTED ON
      </Key>
      {/* shares */}
      {[
        { y: 70, t: SIGNAL, l: "A" },
        { y: 140, t: COUNTER, l: "B" },
        { y: 210, t: INK, l: "C" },
      ].map((p) => (
        <g key={p.l}>
          <CurveArrow1 x1={504} y1={140} cx={560} cy={p.y} x2={610} y2={p.y} tone={COUNTER} width={1.25} size={6} />
          <rect x={620} y={p.y - 22} width={44} height={44} rx={4} fill={PAPER} stroke={p.t} strokeWidth={1.5} />
          <Display x={642} y={p.y + 9} anchor="middle" size={22} fill={p.t}>
            {p.l}
          </Display>
          <Person3 x={712} y={p.y + 20} k={1.1} stroke={p.t} />
        </g>
      ))}
      <Key x={600} y={268} fill={COUNTER} size={10}>
        SHARED
      </Key>
      <Key x={690} y={268} fill={SIGNAL} size={10}>
        PERSONALIZED
      </Key>
    </Frame>
  );
}

/** The seal assembled from pieces: one from the brand, the rest from consumers. */
export function CoCreators() {
  const cx = 200;
  const cy = 140;
  const seg = (a0: number, a1: number, r: number) => {
    const p = (a: number) => {
      const t = (a * Math.PI) / 180;
      return `${r2(cx + r * Math.cos(t))} ${r2(cy + r * Math.sin(t))}`;
    };
    return `M${cx} ${cy}L${p(a0)}A${r} ${r} 0 0 1 ${p(a1)}Z`;
  };
  const people = [
    { a: -30, t: COUNTER },
    { a: 50, t: COUNTER },
    { a: 130, t: COUNTER },
  ];
  return (
    <Frame
      width={400}
      height={290}
      label="A large brand seal cut into four slices like a pie. One slice, drawn in the brand colour, comes from the brand; the other three are each pushed in by a consumer standing around it."
    >
      <path d={seg(-150, -60, 70)} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      {[
        [-60, 30],
        [30, 120],
        [120, 210],
      ].map(([a, b], i) => (
        <path key={i} d={seg(a, b, 70)} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      ))}
      <path d={`M${cx} ${cy - 30}L${cx + 30} ${cy}L${cx} ${cy + 30}L${cx - 30} ${cy}Z`} fill={SIGNAL} />
      <Mark2 x={70} y={50} r={14} />
      <Arrow3 x1={88} y1={62} x2={140} y2={96} tone={SIGNAL} width={1.5} />
      {people.map((p, i) => {
        const t = (p.a * Math.PI) / 180;
        const x = Math.round(cx + 150 * Math.cos(t));
        const y = Math.round(cy + 112 * Math.sin(t));
        return (
          <g key={i}>
            <Person3 x={x} y={y + 22} k={0.9} stroke={COUNTER} />
            <Arrow3
              x1={Math.round(x - 26 * Math.cos(t))}
              y1={Math.round(y - 20 * Math.sin(t))}
              x2={Math.round(cx + 82 * Math.cos(t))}
              y2={Math.round(cy + 82 * Math.sin(t))}
              tone={COUNTER}
              width={1.5}
            />
          </g>
        );
      })}
      <Key x={200} y={280} anchor="middle" fill={COUNTER} size={9.5}>
        CO-CREATORS OF BRAND VALUE
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   THE DIGITAL MARKETING ECOSYSTEM — hub and spoke
   ========================================================================== */

/** Data analytics at the hub; seven channels round it, linked to each other. */
export function EcosystemHub() {
  const cx = 400;
  const cy = 206;
  const nodes = [
    { key: "WEBSITES", kind: "web", tone: INK },
    { key: "SEARCH", kind: "search", tone: INK },
    { key: "ADS", kind: "ad", tone: SIGNAL },
    { key: "EMAIL", kind: "mail", tone: INK },
    { key: "REVIEWS", kind: "star", tone: COUNTER },
    { key: "SHARES", kind: "share", tone: COUNTER },
    { key: "SOCIAL MEDIA", kind: "social", tone: INK },
  ].map((n, i, all) => {
    const a = ((-90 + (i * 360) / all.length) * Math.PI) / 180;
    return { ...n, x: Math.round(cx + 290 * Math.cos(a)), y: Math.round(cy + 150 * Math.sin(a)), ux: Math.cos(a), uy: Math.sin(a) };
  });
  return (
    <Frame
      height={420}
      label="A hub and seven spokes. At the hub a circle holding a small bar chart, labelled data analytics. Spokes run out to seven channels around it: websites, search, ads, email, reviews, shares and social media. Each channel is also joined to its neighbours, so the ring forms a network."
    >
      {nodes.map((n, i) => {
        const m = nodes[(i + 1) % nodes.length];
        return <line key={`r${i}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={RULE2} strokeWidth={1.25} strokeDasharray="4 4" />;
      })}
      {nodes.map((n) => (
        <line
          key={`s${n.key}`}
          x1={Math.round(cx + 70 * n.ux)}
          y1={Math.round(cy + 70 * n.uy)}
          x2={Math.round(n.x - 34 * n.ux)}
          y2={Math.round(n.y - 30 * n.uy)}
          stroke={INK}
          strokeWidth={1.5}
        />
      ))}
      <circle cx={cx} cy={cy} r={68} fill={PAPER2} stroke={INK} strokeWidth={2} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={cx - 26 + i * 14} y={cy - 4 - [10, 18, 14, 26][i]} width={10} height={[10, 18, 14, 26][i]} fill={i === 3 ? SIGNAL : INK} />
      ))}
      <line x1={cx - 30} y1={cy - 4} x2={cx + 30} y2={cy - 4} stroke={INK} strokeWidth={1} />
      <Key x={cx} y={cy + 18} anchor="middle" fill={INK} size={10}>
        DATA
      </Key>
      <Key x={cx} y={cy + 32} anchor="middle" fill={INK} size={10}>
        ANALYTICS
      </Key>
      {nodes.map((n) => {
        const above = n.uy < -0.3;
        return (
          <g key={n.key}>
            <circle cx={n.x} cy={n.y} r={30} fill={PAPER} stroke={n.tone} strokeWidth={1.5} />
            {n.kind === "web" ? (
              <Browser x={n.x - 18} y={n.y - 13} w={36} h={26} tone={n.tone} body={false} />
            ) : n.kind === "search" ? (
              <Magnifier1 x={n.x - 3} y={n.y - 3} r={9} tone={n.tone} />
            ) : n.kind === "ad" ? (
              <Megaphone x={n.x - 18} y={n.y - 18} size={36} weight="duotone" color={n.tone} />
            ) : n.kind === "mail" ? (
              <Envelope x={n.x} y={n.y} k={0.8} tone={n.tone} />
            ) : n.kind === "star" ? (
              <Star2 x={n.x} y={n.y} r={13} tone={n.tone} />
            ) : n.kind === "share" ? (
              <ShareFat x={n.x - 18} y={n.y - 18} size={36} weight="duotone" color={n.tone} />
            ) : (
              <ChatsCircle x={n.x - 18} y={n.y - 18} size={36} weight="duotone" color={n.tone} />
            )}
            <Key
              x={n.ux > 0.3 ? n.x + 40 : n.ux < -0.3 ? n.x - 40 : n.x}
              y={above && Math.abs(n.ux) < 0.3 ? n.y - 40 : Math.abs(n.ux) >= 0.3 ? n.y + 4 : n.y + 48}
              anchor={n.ux > 0.3 ? "start" : n.ux < -0.3 ? "end" : "middle"}
              fill={n.tone}
              size={10}
            >
              {n.key}
            </Key>
          </g>
        );
      })}
    </Frame>
  );
}

/** Owned, paid and earned media as three overlapping circles. */
export function OwnedPaidEarned() {
  return (
    <Frame
      height={340}
      label="Three overlapping circles. Owned media holds a browser window, paid media an ad, earned media a share arrow and a review star. Where all three overlap, in the middle, the brand seal: the strategy that integrates them."
    >
      <circle cx={330} cy={130} r={100} fill="none" stroke={INK} strokeWidth={1.75} />
      <circle cx={470} cy={130} r={100} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <circle cx={400} cy={226} r={100} fill="none" stroke={COUNTER} strokeWidth={1.75} />
      <Browser x={250} y={78} w={64} h={44} tone={INK} />
      <AdUnit x={488} y={78} w={70} h={42} />
      <ShareGlyph x={372} y={276} />
      <Star2 x={426} y={278} r={10} />
      <circle cx={400} cy={166} r={20} fill={PAPER} stroke="none" />
      <Mark2 x={400} y={166} r={15} />
      <Key x={200} y={60} anchor="end" fill={INK} size={10.5}>
        OWNED MEDIA
      </Key>
      <Key x={200} y={76} anchor="end" fill={INK3} size={9}>
        WEBSITES
      </Key>
      <Key x={600} y={60} fill={SIGNAL} size={10.5}>
        PAID MEDIA
      </Key>
      <Key x={600} y={76} fill={INK3} size={9}>
        ADS
      </Key>
      <Key x={520} y={306} fill={COUNTER} size={10.5}>
        EARNED MEDIA
      </Key>
      <Key x={520} y={322} fill={INK3} size={9}>
        SHARES AND REVIEWS
      </Key>
    </Frame>
  );
}

/** Three pillars (owned, paid, earned) standing on a slab of data analytics. */
export function Foundation() {
  const cols = [
    { x: 100, key: "OWNED", tone: INK },
    { x: 200, key: "PAID", tone: SIGNAL },
    { x: 300, key: "EARNED", tone: COUNTER },
  ];
  return (
    <Frame
      width={400}
      height={290}
      label="A small building. A roof spans three pillars labelled owned, paid and earned. The pillars stand on a wide slab marked with a bar chart and labelled data analytics; arrows rise from the slab up through each pillar."
    >
      <path d="M40 70L200 22L360 70Z" fill={PAPER2} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={200} y={60} anchor="middle" fill={INK} size={9}>
        DECISIONS
      </Key>
      {cols.map((c) => (
        <g key={c.key}>
          <rect x={c.x - 26} y={70} width={52} height={120} fill={PAPER} stroke={c.tone} strokeWidth={1.75} />
          <Arrow3 x1={c.x} y1={180} x2={c.x} y2={96} tone={c.tone} width={1.25} size={6} />
          <Key x={c.x} y={88} anchor="middle" fill={c.tone} size={9}>
            {c.key}
          </Key>
        </g>
      ))}
      <rect x={24} y={190} width={352} height={50} fill={INK} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={46 + i * 12} y={230 - [12, 20, 16, 26, 32][i]} width={8} height={[12, 20, 16, 26, 32][i]} fill={PAPER} />
      ))}
      <Key x={130} y={221} fill={PAPER} size={10.5}>
        DATA ANALYTICS
      </Key>
      <Key x={200} y={270} anchor="middle" fill={INK} size={9.5}>
        THE FOUNDATION
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   SEO AND SEM — one results page, two ways to the top
   ========================================================================== */

/**
 * A search engine results page. `organic` lights the organic list and shows
 * one page climbing it; `paid` lights the ad slots bought at the top.
 */
export function Serp({ mode }: { mode: "organic" | "paid" }) {
  const paid = mode === "paid";
  const organicY = [128, 170, 212, 254];
  return (
    <Frame
      width={400}
      height={320}
      label={
        paid
          ? "A search results page. Under the search bar, the two top slots are ads, marked AD and drawn in the paid colour. The organic results below them are greyed out."
          : "A search results page. The two ad slots at the top are greyed out. Below them, four organic results; one page climbs from the bottom of the list to the top of the organic results."
      }
    >
      <rect x={20} y={10} width={360} height={300} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <SearchBar x={40} y={24} w={240} tone={INK} />
      {[0, 1].map((i) => (
        <g key={i} opacity={paid ? 1 : 0.35}>
          <rect x={40} y={62 + i * 30} width={24} height={13} fill={paid ? SIGNAL : INK3} />
          <text x={52} y={72 + i * 30} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={8.5} fill={PAPER}>
            AD
          </text>
          <path d={`M72 ${66 + i * 30}H${paid ? 250 : 230}M72 ${75 + i * 30}H200`} stroke={paid ? SIGNAL : INK3} strokeWidth={paid ? 2.5 : 1.5} strokeLinecap="round" />
        </g>
      ))}
      {paid ? (
        <rect x={34} y={56} width={332} height={56} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      ) : null}
      <line x1={40} y1={116} x2={360} y2={116} stroke={RULE} strokeWidth={1} />
      {organicY.map((y, i) => {
        const lit = !paid && i === 0;
        return (
          <g key={y} opacity={paid ? 0.35 : 1}>
            <Display x={44} y={y + 14} size={15} fill={lit ? COUNTER : INK3}>
              {String(i + 1)}
            </Display>
            <path d={`M66 ${y + 4}H${lit ? 250 : 220}M66 ${y + 14}H${lit ? 280 : 300}M66 ${y + 23}H200`} stroke={lit ? COUNTER : INK3} strokeWidth={lit ? 2.25 : 1.25} strokeLinecap="round" />
          </g>
        );
      })}
      {!paid ? (
        <g>
          <path d="M334 262V166" stroke={COUNTER} strokeWidth={1.5} strokeDasharray="4 3" />
          <path d={headAlong2(334, 162, 0, -1, 9)} fill="none" stroke={COUNTER} strokeWidth={2} />
          <rect x={318} y={262} width={32} height={18} rx={2} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
          <rect x={60} y={124} width={300} height={34} fill="none" stroke={COUNTER} strokeWidth={1.75} />
        </g>
      ) : null}
      <Key x={200} y={304} anchor="middle" fill={paid ? SIGNAL : COUNTER} size={9.5}>
        {paid ? "PAID SEARCH ADVERTISING" : "ORGANIC SEARCH ENGINE RESULTS"}
      </Key>
    </Frame>
  );
}

/** Three jobs of SEO: tune the site, research the words, write the content. */
export function SeoThree() {
  const parts = [
    { x: 140, key: "TECHNICAL WEBSITE", key2: "ADJUSTMENTS" },
    { x: 400, key: "KEYWORD", key2: "RESEARCH" },
    { x: 660, key: "HIGH-QUALITY", key2: "CONTENT CREATION" },
  ];
  return (
    <Frame
      height={250}
      label="Three panels. First, a browser window with a wrench on it: technical website adjustments. Second, a magnifier over a row of word tags, one of them picked out: keyword research. Third, a page of writing with a star on it: high-quality content creation."
    >
      {/* technical */}
      <Browser x={80} y={50} w={120} h={90} tone={COUNTER} />
      <Gear2 x={196} y={138} r={20} />
      {/* keywords */}
      {[
        { x: 320, y: 70, w: 64 },
        { x: 392, y: 70, w: 76 },
        { x: 336, y: 102, w: 80, lit: true },
        { x: 424, y: 102, w: 50 },
        { x: 330, y: 134, w: 70 },
        { x: 408, y: 134, w: 62 },
      ].map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width={t.w} height={22} rx={11} fill={t.lit ? COUNTER_TINT : PAPER} stroke={t.lit ? COUNTER : INK3} strokeWidth={t.lit ? 1.75 : 1} />
      ))}
      <Magnifier1 x={376} y={113} r={28} tone={COUNTER} fill="none" />
      {/* content */}
      <path d="M612 42H692L712 62V160H612Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <Lines x={626} y={76} w={70} n={7} gap={11} tone={INK} width={1.25} />
      <Star2 x={704} y={148} r={16} tone={COUNTER} />
      {parts.map((p) => (
        <g key={p.key}>
          <Key x={p.x} y={204} anchor="middle" fill={INK} size={10}>
            {p.key}
          </Key>
          <Key x={p.x} y={220} anchor="middle" fill={INK} size={10}>
            {p.key2}
          </Key>
        </g>
      ))}
      <line x1={270} y1={40} x2={270} y2={226} stroke={RULE} strokeWidth={1} />
      <line x1={530} y1={40} x2={530} y2={226} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}

/**
 * One plot, one time axis. Traffic builds and holds; direct advertising cost
 * lies flat on zero. The axis is offset a few units below zero so the cost
 * line reads as its own line instead of merging with the axis. Both lines are
 * labelled at their ends.
 */
export function SeoTraffic() {
  const L = 70;
  const R = 590;
  const ZERO = 222;
  const TOP = 60;
  const AXIS = ZERO + 12;
  const X = (t: number) => r2(L + ((R - L) * t) / 24);
  const Y = (v: number) => r2(ZERO - ((ZERO - TOP) * v) / 100);
  // A logistic rise: slow start, steady climb, then it holds.
  const pts = Array.from({ length: 97 }, (_, i) => {
    const t = i / 4;
    return { x: X(t), y: Y(4 + 94 / (1 + Math.exp(-(t - 9) / 2.6))) };
  });
  const curve = pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join("");
  const end = pts[pts.length - 1];
  return (
    <Frame
      height={286}
      label="One chart over time. A teal area rises slowly, climbs, and then holds high to the end, labelled long-term, sustainable traffic. Along its bottom edge a persimmon line lies flat on zero from start to finish, labelled direct advertising costs. A single time axis runs just below."
    >
      {[25, 50, 75, 100].map((v) => (
        <line key={v} x1={L} y1={Y(v)} x2={R} y2={Y(v)} stroke={RULE} strokeWidth={0.75} />
      ))}
      <path d={`${curve}L${R} ${ZERO}L${L} ${ZERO}Z`} fill={COUNTER_TINT} />
      <path d={curve} fill="none" stroke={COUNTER} strokeWidth={2.75} strokeLinejoin="round" />
      <circle cx={end.x} cy={end.y} r={4.5} fill={COUNTER} />
      <Key x={R + 16} y={end.y - 2} fill={COUNTER} size={10.5}>
        LONG-TERM,
      </Key>
      <Key x={R + 16} y={end.y + 13} fill={COUNTER} size={10.5}>
        SUSTAINABLE TRAFFIC
      </Key>
      {/* cost: flat on zero */}
      <line x1={L} y1={ZERO} x2={R} y2={ZERO} stroke={SIGNAL} strokeWidth={3} />
      <circle cx={R} cy={ZERO} r={4.5} fill={SIGNAL} />
      <text x={L - 10} y={ZERO + 4} textAnchor="end" fontFamily="var(--font-label)" fontSize={10} fill={INK3}>
        $0
      </text>
      <Key x={R + 16} y={ZERO - 2} fill={SIGNAL} size={10.5}>
        DIRECT ADVERTISING
      </Key>
      <Key x={R + 16} y={ZERO + 13} fill={SIGNAL} size={10.5}>
        COSTS
      </Key>
      {/* the one time axis, offset below zero */}
      <line x1={L} y1={AXIS} x2={R} y2={AXIS} stroke={INK} strokeWidth={1.25} />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={X(i * 2)} y1={AXIS} x2={X(i * 2)} y2={AXIS + 6} stroke={INK} strokeWidth={1} />
      ))}
      <Arrow3 x1={R - 50} y1={AXIS + 26} x2={R} y2={AXIS + 26} tone={INK3} width={1} size={6} />
      <Key x={R - 58} y={AXIS + 30} anchor="end" fill={INK3} size={9.5}>
        TIME
      </Key>
    </Frame>
  );
}

/** Three signals feed the algorithm; the page that meets all three ranks first. */
export function AlgorithmSieve() {
  const ins = [
    { y: 60, key: "USER INTENT" },
    { y: 140, key: "RELEVANCE" },
    { y: 220, key: "WEBSITE AUTHORITY" },
  ];
  return (
    <Frame
      height={290}
      label="Three inputs on the left feed a box labelled the algorithm: a person with a question bubble for user intent, a query matching a page for relevance, and a page with many links pointing to it for website authority. Out of the box comes a ranked list with that page at number one."
    >
      {/* intent */}
      <Person3 x={60} y={80} k={1.1} stroke={INK} />
      <Bubble2 x={78} y={30} w={30} h={22} tone={INK} />
      <Display x={93} y={48} anchor="middle" size={16} fill={INK}>
        ?
      </Display>
      {/* relevance */}
      <rect x={40} y={128} width={44} height={22} rx={11} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M48 139H76" stroke={INK} strokeWidth={1.5} />
      <path d="M90 139H104" stroke={COUNTER} strokeWidth={1.5} />
      <rect x={108} y={124} width={26} height={32} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M113 133H129" stroke={INK} strokeWidth={1.5} />
      <path d="M113 140H129M113 146H124" stroke={INK3} strokeWidth={1} />
      {/* authority */}
      <rect x={82} y={202} width={30} height={38} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      {[
        [40, 196],
        [44, 236],
        [66, 262],
        [128, 262],
        [142, 206],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 7} y={y - 9} width={14} height={18} fill={PAPER} stroke={INK3} strokeWidth={1} />
          <line x1={x} y1={y} x2={97} y2={221} stroke={INK3} strokeWidth={1} />
        </g>
      ))}
      <rect x={82} y={202} width={30} height={38} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      {ins.map((n) => (
        <g key={n.key}>
          <Key x={170} y={n.y > 140 ? n.y + 20 : n.y - 8} fill={INK} size={9.5}>
            {n.key}
          </Key>
          <Arrow3 x1={170} y1={n.y} x2={340} y2={Math.round(145 + (n.y - 140) * 0.3)} tone={COUNTER} width={1.5} />
        </g>
      ))}
      <rect x={344} y={90} width={140} height={110} fill={INK} />
      <Key x={414} y={140} anchor="middle" fill={PAPER} size={10}>
        THE
      </Key>
      <Key x={414} y={156} anchor="middle" fill={PAPER} size={10}>
        ALGORITHM
      </Key>
      <Arrow3 x1={488} y1={145} x2={560} y2={145} tone={COUNTER} width={2} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Display x={580} y={82 + i * 44} size={18} fill={i === 0 ? COUNTER : INK3}>
            {String(i + 1)}
          </Display>
          <rect x={606} y={64 + i * 44} width={160} height={26} fill={i === 0 ? COUNTER_TINT : PAPER} stroke={i === 0 ? COUNTER : RULE2} strokeWidth={i === 0 ? 1.75 : 1} />
        </g>
      ))}
    </Frame>
  );
}

/** Three advertisers bid on one keyword; the tallest bid wins the top slot. */
export function KeywordAuction() {
  const bids = [
    { x: 110, n: 5, rank: 2 },
    { x: 230, n: 9, rank: 1 },
    { x: 350, n: 3, rank: 3 },
  ];
  return (
    <Frame
      height={300}
      label="Three advertisers stand behind coin stacks of different heights, their bids on one keyword. Arrows carry each bid to a results page on the right: the tallest stack takes the top slot, the next takes the second, the shortest the third."
    >
      <rect x={140} y={24} width={180} height={30} rx={15} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={230} y={44} anchor="middle" fill={SIGNAL} size={10}>
        KEYWORD
      </Key>
      {bids.map((b) => (
        <g key={b.x}>
          <Coins2 x={b.x} y={220} n={b.n} tone={b.rank === 1 ? SIGNAL : INK} fill={b.rank === 1 ? SIGNAL_TINT : PAPER} w={40} />
          <Person3 x={b.x} y={276} k={0.9} stroke={b.rank === 1 ? SIGNAL : INK} />
          <path d={`M${b.x} 60V${220 - b.n * 6 - 12}`} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
        </g>
      ))}
      <Key x={230} y={296} anchor="middle" fill={INK} size={9.5}>
        ADVERTISERS BID
      </Key>
      {/* page */}
      <rect x={500} y={30} width={270} height={250} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <SearchBar x={516} y={44} w={200} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={516} y={86 + i * 40} width={238} height={32} fill={i === 0 ? SIGNAL_TINT : PAPER} stroke={i === 0 ? SIGNAL : INK3} strokeWidth={i === 0 ? 2 : 1} />
          <rect x={522} y={95 + i * 40} width={22} height={13} fill={i === 0 ? SIGNAL : INK3} />
          <text x={533} y={105 + i * 40} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={8} fill={PAPER}>
            AD
          </text>
          <Display x={742} y={109 + i * 40} anchor="end" size={15} fill={i === 0 ? SIGNAL : INK3}>
            {String(i + 1)}
          </Display>
        </g>
      ))}
      <path d="M516 222H700M516 240H660M516 258H690" stroke={RULE2} strokeWidth={1.25} strokeLinecap="round" />
      {bids.map((b) => (
        <CurveArrow1
          key={`a${b.x}`}
          x1={b.x + 24}
          y1={220 - b.n * 6}
          cx={440}
          cy={220 - b.n * 6}
          x2={508}
          y2={102 + (b.rank - 1) * 40}
          tone={b.rank === 1 ? SIGNAL : INK3}
          width={b.rank === 1 ? 1.75 : 1}
          size={6}
        />
      ))}
      <Key x={635} y={298} anchor="middle" fill={SIGNAL} size={9.5}>
        THE TOP OF THE RESULTS PAGE
      </Key>
    </Frame>
  );
}

/** The query typed, and the ad that matches it, at once. */
export function QueryTarget() {
  return (
    <Frame
      width={400}
      height={260}
      label="A person types a query into a search bar. Instantly, a lightning stroke later, an ad appears directly beneath it whose headline matches the query word for word."
    >
      <Person3 x={46} y={96} k={1.3} stroke={INK} />
      <SearchBar x={86} y={40} w={290} text="winter tires montreal" />
      <path d="M232 76L222 104H236L226 132" fill="none" stroke={SIGNAL} strokeWidth={2} strokeLinejoin="round" />
      <Key x={246} y={108} fill={SIGNAL} size={9.5}>
        IMMEDIATE VISIBILITY
      </Key>
      <rect x={86} y={142} width={290} height={62} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <rect x={96} y={152} width={22} height={13} fill={SIGNAL} />
      <text x={107} y={162} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={8} fill={PAPER}>
        AD
      </text>
      <text x={126} y={163} fontFamily="var(--font-body)" fontWeight={600} fontSize={12} fill={SIGNAL}>
        Winter tires in Montréal
      </text>
      <path d="M98 180H340M98 192H280" stroke={INK3} strokeWidth={1.25} strokeLinecap="round" />
      <Key x={200} y={240} anchor="middle" fill={INK} size={9.5}>
        BASED ON USER SEARCH QUERIES
      </Key>
    </Frame>
  );
}

/** A monitor watching spend and return, with a budget dial being turned. */
export function Monitoring() {
  return (
    <Frame
      width={400}
      height={270}
      label="A monitor showing two lines over time, ad spend and return. An eye watches it. Beside it a budget dial with a hand turning the needle: constant monitoring and budget optimization, aimed at return on ad spend."
    >
      <rect x={20} y={30} width={240} height={150} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M130 180V204M96 206H164" stroke={INK} strokeWidth={1.5} />
      <path d="M40 150H240" stroke={RULE} strokeWidth={1} />
      <path d="M40 130L80 128L120 132L160 126L200 128L240 126" fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
      <path d="M40 140L80 120L120 124L160 96L200 82L240 60" fill="none" stroke={SIGNAL} strokeWidth={2.25} />
      <Key x={40} y={54} fill={SIGNAL} size={8.5}>
        RETURN ON AD SPEND
      </Key>
      <Eye2 x={236} y={56} k={0.7} tone={INK} />
      {/* dial */}
      <circle cx={328} cy={120} r={44} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      {Array.from({ length: 9 }, (_, i) => {
        const a = ((150 + i * 30) * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={r2(328 + 36 * Math.cos(a))}
            y1={r2(120 + 36 * Math.sin(a))}
            x2={r2(328 + 42 * Math.cos(a))}
            y2={r2(120 + 42 * Math.sin(a))}
            stroke={INK}
            strokeWidth={1}
          />
        );
      })}
      <line x1={328} y1={120} x2={350} y2={92} stroke={SIGNAL} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={328} cy={120} r={4} fill={INK} />
      <path d="M300 78A40 40 0 0 1 356 78" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <path d={headAlong2(356, 78, 1, 1, 6)} fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <Key x={328} y={186} anchor="middle" fill={INK} size={9}>
        BUDGET
      </Key>
      <Key x={200} y={250} anchor="middle" fill={INK} size={9.5}>
        CONSTANT MONITORING
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   CONTENT MARKETING
   ========================================================================== */

/** Pieces of content published at an even beat along a calendar. */
export function ContentCadence() {
  const xs = [90, 190, 290, 390, 490, 590, 690];
  return (
    <Frame
      height={240}
      label="A calendar strip of seven weeks. Each week, at the same beat, the brand publishes one piece of content, all the same size and style, each with a star for value and a target ring for relevance, and each is carried out to a small group of people."
    >
      <rect x={40} y={40} width={720} height={36} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      {xs.map((x, i) => (
        <g key={x}>
          {i > 0 ? <line x1={x - 50} y1={40} x2={x - 50} y2={76} stroke={INK3} strokeWidth={1} /> : null}
          <rect x={x - 20} y={100} width={40} height={50} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          <Lines x={x - 12} y={112} w={24} n={3} gap={7} tone={INK} width={1} />
          <Star2 x={x + 10} y={140} r={6} tone={SIGNAL} />
          <circle cx={x} cy={58} r={6} fill={SIGNAL} />
          <line x1={x} y1={64} x2={x} y2={100} stroke={SIGNAL} strokeWidth={1.25} />
          <Arrow3 x1={x} y1={154} x2={x} y2={176} tone={INK3} width={1} size={5} />
          {[-10, 10].map((d) => (
            <Person3 key={d} x={x + d} y={212} k={0.6} stroke={INK3} />
          ))}
        </g>
      ))}
      <Key x={40} y={30} fill={INK} size={10}>
        CONSISTENT
      </Key>
      <Key x={760} y={30} anchor="end" fill={SIGNAL} size={10}>
        VALUABLE, RELEVANT
      </Key>
      <Key x={400} y={234} anchor="middle" fill={INK3} size={9.5}>
        CREATING AND DISTRIBUTING
      </Key>
    </Frame>
  );
}

/** A magnet draws people in, a ring keeps them, and one of them buys. */
export function AttractRetainAct() {
  const drift = [
    { x: 40, y: 80 },
    { x: 70, y: 180 },
    { x: 30, y: 250 },
    { x: 110, y: 120 },
    { x: 100, y: 230 },
  ];
  return (
    <Frame
      height={300}
      label="Three stages left to right. First, a magnet made of a content page pulls a scattered crowd toward it: attract. Second, the same people inside a ring that holds them: retain, a clearly defined audience. Third, one of them steps out with a filled shopping bag and a coin: profitable customer action."
    >
      {drift.map((p, i) => (
        <g key={i}>
          <Person3 x={p.x} y={p.y + 20} k={0.8} stroke={INK3} />
          <Arrow3 x1={p.x + 14} y1={p.y} x2={Math.round(p.x + (200 - p.x) * 0.45)} y2={Math.round(p.y + (160 - p.y) * 0.45)} tone={RULE2} width={1} size={5} />
        </g>
      ))}
      {/* magnet */}
      <path d="M178 110H206V180Q206 196 222 196Q238 196 238 180V110H266V180Q266 224 222 224Q178 224 178 180Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <rect x={178} y={110} width={28} height={16} fill={SIGNAL} />
      <rect x={238} y={110} width={28} height={16} fill={SIGNAL} />
      <Key x={222} y={260} anchor="middle" fill={SIGNAL} size={10}>
        ATTRACT
      </Key>
      <Arrow3 x1={290} y1={160} x2={340} y2={160} tone={INK} />
      {/* retain */}
      <circle cx={450} cy={160} r={84} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={2} />
      {[
        [420, 120],
        [480, 120],
        [410, 182],
        [450, 160],
        [490, 190],
      ].map(([x, y], i) => (
        <Person3 key={i} x={x} y={y + 20} k={0.9} stroke={COUNTER} />
      ))}
      <Key x={450} y={268} anchor="middle" fill={COUNTER} size={10}>
        RETAIN
      </Key>
      <Key x={450} y={284} anchor="middle" fill={INK3} size={9}>
        A CLEARLY DEFINED AUDIENCE
      </Key>
      <Arrow3 x1={540} y1={160} x2={600} y2={160} tone={INK} />
      {/* action */}
      <Person3 x={650} y={210} k={1.5} stroke={INK} fill={SIGNAL_TINT} />
      <path d="M690 150H730L736 206H684Z" fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <path d="M700 150V142Q710 132 720 142V150" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Coins2 x={752} y={206} n={3} tone={SIGNAL} fill={SIGNAL_TINT} w={22} />
      <Key x={700} y={260} anchor="middle" fill={SIGNAL} size={10}>
        PROFITABLE
      </Key>
      <Key x={700} y={276} anchor="middle" fill={SIGNAL} size={10}>
        CUSTOMER ACTION
      </Key>
    </Frame>
  );
}

/** Two content cards lit (a bulb, a smile); a hard-sell price tag set aside. */
export function EducateEntertain() {
  return (
    <Frame
      width={400}
      height={260}
      label="Three cards. The first shows a lightbulb: educates. The second shows a laughing face: entertains. Both are lit. The third, set lower and greyed out, is a price tag shouting buy now: directly selling a product."
    >
      <rect x={24} y={30} width={110} height={130} rx={6} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Bulb2 x={79} y={86} k={1.6} />
      <Key x={79} y={148} anchor="middle" fill={SIGNAL} size={9.5}>
        EDUCATES
      </Key>
      <rect x={146} y={30} width={110} height={130} rx={6} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <circle cx={201} cy={88} r={30} fill={PAPER} stroke={SIGNAL} strokeWidth={1.75} />
      <circle cx={190} cy={80} r={3} fill={SIGNAL} />
      <circle cx={212} cy={80} r={3} fill={SIGNAL} />
      <path d="M186 96Q201 112 216 96Z" fill={SIGNAL} stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={201} y={148} anchor="middle" fill={SIGNAL} size={9.5}>
        ENTERTAINS
      </Key>
      <g opacity={0.5}>
        <rect x={268} y={70} width={110} height={130} rx={6} fill={PAPER} stroke={INK3} strokeWidth={1.25} strokeDasharray="4 3" />
        <path d="M290 110H340L360 130L340 150H290Z" fill={PAPER} stroke={INK3} strokeWidth={1.5} strokeLinejoin="round" />
        <circle cx={344} cy={130} r={3} fill="none" stroke={INK3} strokeWidth={1.25} />
        <Display x={316} y={137} anchor="middle" size={18} fill={INK3}>
          $
        </Display>
        <Key x={323} y={186} anchor="middle" fill={INK3} size={9}>
          BUY NOW
        </Key>
      </g>
      <Key x={323} y={226} anchor="middle" fill={INK3} size={9}>
        DIRECTLY SELLING
      </Key>
      <Key x={140} y={200} anchor="middle" fill={INK} size={9.5}>
        EFFECTIVE CONTENT
      </Key>
    </Frame>
  );
}

export type FormatKind = "blog" | "video" | "infographic" | "podcast";

/** One of the four content formats, as a glyph for the format row. */
export function FormatGlyph({ kind, size = 72 }: { kind: FormatKind; size?: number }) {
  return (
    <svg viewBox="0 0 72 56" width={size} height={Math.round((size * 56) / 72)} aria-hidden className="block shrink-0">
      {kind === "blog" ? (
        <g>
          <rect x={14} y={4} width={44} height={48} rx={2} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          <rect x={20} y={10} width={32} height={12} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1} />
          <Lines x={20} y={28} w={32} n={4} gap={6} tone={INK} width={1.25} />
        </g>
      ) : kind === "video" ? (
        <g>
          <rect x={6} y={8} width={60} height={40} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          <path d="M30 18L46 28L30 38Z" fill={SIGNAL} />
          <path d="M10 44H62" stroke={INK3} strokeWidth={1} />
          <path d="M10 44H30" stroke={SIGNAL} strokeWidth={2} />
        </g>
      ) : kind === "infographic" ? (
        <g>
          <rect x={16} y={2} width={40} height={52} rx={2} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          <circle cx={28} cy={16} r={7} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
          <path d="M28 16V9A7 7 0 0 1 35 16Z" fill={SIGNAL} />
          <rect x={40} y={10} width={10} height={12} fill={COUNTER} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={22 + i * 11} y={46 - [10, 16, 22][i]} width={8} height={[10, 16, 22][i]} fill={i === 2 ? SIGNAL : INK} />
          ))}
        </g>
      ) : (
        <g>
          <rect x={28} y={4} width={16} height={28} rx={8} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
          <path d="M20 24Q20 40 36 40Q52 40 52 24" fill="none" stroke={INK} strokeWidth={1.5} />
          <path d="M36 40V50M26 50H46" stroke={INK} strokeWidth={1.5} />
        </g>
      )}
    </svg>
  );
}

/* ==========================================================================
   EMAIL MARKETING
   ========================================================================== */

/** Envelopes keep going out to the customers already inside the circle. */
export function Retention() {
  return (
    <Frame
      width={400}
      height={270}
      label="Six existing customers inside a ring around the brand seal. An envelope goes out from the seal to each of them, and all six stay inside the ring: customer retention."
    >
      <circle cx={200} cy={130} r={100} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={2} />
      <Mark2 x={200} y={130} r={18} />
      {Array.from({ length: 6 }, (_, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        const x = r2(200 + 76 * Math.cos(a));
        const y = r2(130 + 76 * Math.sin(a));
        const ex = r2(200 + 44 * Math.cos(a));
        const ey = r2(130 + 44 * Math.sin(a));
        return (
          <g key={i}>
            <Person3 x={x} y={r2(y + 14)} k={0.75} stroke={COUNTER} />
            <Envelope x={ex} y={ey} k={0.42} tone={SIGNAL} fill={PAPER} width={1.1} />
          </g>
        );
      })}
      <Key x={200} y={258} anchor="middle" fill={COUNTER} size={9.5}>
        CUSTOMER RETENTION
      </Key>
    </Frame>
  );
}

/** People sorted by what they did; each segment gets its own email. */
export function Segmented() {
  const segs = [
    { y: 60, key: "BROWSED", tone: INK, glyph: "eye" },
    { y: 150, key: "BOUGHT", tone: SIGNAL, glyph: "bag" },
    { y: 240, key: "WENT QUIET", tone: COUNTER, glyph: "zz" },
  ];
  return (
    <Frame
      height={300}
      label="A mixed crowd of people on the left is sorted by their behaviour into three rows: those who browsed, those who bought and those who went quiet. Each row receives a differently coloured envelope carrying its own message."
    >
      {Array.from({ length: 12 }, (_, i) => (
        <Person3 key={i} x={40 + (i % 3) * 34} y={96 + Math.floor(i / 3) * 50} k={0.8} stroke={segs[i % 3].tone} />
      ))}
      <Key x={74} y={290} anchor="middle" fill={INK3} size={9}>
        USER BEHAVIOR
      </Key>
      {segs.map((s) => (
        <g key={s.key}>
          <Arrow3 x1={150} y1={150} x2={236} y2={s.y} tone={s.tone} width={1.25} />
          <rect x={250} y={s.y - 34} width={250} height={68} fill={PAPER} stroke={s.tone} strokeWidth={1.5} />
          {[0, 1, 2, 3].map((j) => (
            <Person3 key={j} x={296 + j * 34} y={s.y + 24} k={0.8} stroke={s.tone} />
          ))}
          {s.glyph === "eye" ? (
            <Eye2 x={466} y={s.y} k={0.8} tone={s.tone} />
          ) : s.glyph === "bag" ? (
            <path d={`M452 ${s.y - 12}H480L484 ${s.y + 16}H448Z`} fill={SIGNAL_TINT} stroke={s.tone} strokeWidth={1.5} strokeLinejoin="round" />
          ) : (
            <Display x={466} y={s.y + 8} anchor="middle" size={20} fill={s.tone}>
              z
            </Display>
          )}
          <Key x={262} y={s.y - 18} fill={s.tone} size={9}>
            {s.key}
          </Key>
          <Arrow3 x1={620} y1={s.y} x2={512} y2={s.y} tone={s.tone} width={1.5} />
          <Envelope x={660} y={s.y} k={1.2} tone={s.tone} fill={s.tone === INK ? PAPER2 : s.tone === SIGNAL ? SIGNAL_TINT : COUNTER_TINT} />
        </g>
      ))}
      <Key x={660} y={290} anchor="middle" fill={INK} size={9}>
        SEGMENTED
      </Key>
    </Frame>
  );
}

/** A journey line; at the critical points, a gear fires an email. */
export function JourneyTriggers() {
  const stops = [
    { x: 80, glyph: "join", crit: true },
    { x: 230, glyph: "browse", crit: false },
    { x: 380, glyph: "cart", crit: true },
    { x: 530, glyph: "buy", crit: true },
    { x: 690, glyph: "time", crit: false },
  ];
  return (
    <Frame
      height={260}
      label="A customer journey drawn as a line with five stops: joining, browsing, filling a cart, buying, and time passing afterward. At three of the stops, joining, the cart and the purchase, an automation gear fires a specific email down to the customer."
    >
      <Arrow3 x1={30} y1={170} x2={776} y2={170} tone={INK} width={2} />
      <Key x={30} y={200} fill={INK} size={10}>
        THE CUSTOMER JOURNEY
      </Key>
      {stops.map((s) => (
        <g key={s.x}>
          <circle cx={s.x} cy={170} r={s.crit ? 9 : 5} fill={s.crit ? SIGNAL : PAPER} stroke={s.crit ? SIGNAL : INK} strokeWidth={1.5} />
          {s.glyph === "join" ? (
            <g>
              <Person3 x={s.x} y={234} k={0.8} stroke={INK} />
              <path d={`M${s.x + 14} 216H${s.x + 24}M${s.x + 19} 211V221`} stroke={INK} strokeWidth={1.75} />
            </g>
          ) : s.glyph === "browse" ? (
            <Browser x={s.x - 22} y={206} w={44} h={30} body={false} />
          ) : s.glyph === "cart" ? (
            <g fill="none" stroke={INK} strokeWidth={1.5} strokeLinejoin="round">
              <path d={`M${s.x - 20} 206H${s.x - 12}L${s.x - 6} 228H${s.x + 16}L${s.x + 20} 212H${s.x - 10}`} />
              <circle cx={s.x - 3} cy={234} r={3} />
              <circle cx={s.x + 13} cy={234} r={3} />
            </g>
          ) : s.glyph === "buy" ? (
            <path d={`M${s.x - 14} 210H${s.x + 14}L${s.x + 18} 238H${s.x - 18}Z`} fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
          ) : (
            <g>
              <circle cx={s.x} cy={222} r={14} fill={PAPER} stroke={INK} strokeWidth={1.5} />
              <path d={`M${s.x} 222V212M${s.x} 222H${s.x + 7}`} stroke={INK} strokeWidth={1.5} />
            </g>
          )}
          {s.crit ? (
            <g>
              <Gear2 x={s.x} y={36} r={13} />
              <Envelope x={s.x} y={96} k={0.9} tone={SIGNAL} fill={SIGNAL_TINT} />
              <Arrow3 x1={s.x} y1={58} x2={s.x} y2={80} tone={SIGNAL} width={1.25} size={6} />
              <Arrow3 x1={s.x} y1={112} x2={s.x} y2={156} tone={SIGNAL} width={1.25} size={6} />
            </g>
          ) : null}
        </g>
      ))}
      <Key x={776} y={40} anchor="end" fill={INK} size={9.5}>
        AUTOMATION TOOLS
      </Key>
      <Key x={776} y={100} anchor="end" fill={SIGNAL} size={9.5}>
        CRITICAL POINTS
      </Key>
    </Frame>
  );
}

/** Two inboxes: one valued email, and a flood of promotions. */
export function ValueOrFlood() {
  const flood = Array.from({ length: 14 }, (_, i) => ({ x: 470 + (i % 4) * 64 + (Math.floor(i / 4) % 2) * 20, y: 70 + Math.floor(i / 4) * 44 }));
  return (
    <Frame
      height={290}
      label="Two inboxes side by side. On the left, a single envelope with a star and a subscriber beside it: delivering value. On the right, fourteen envelopes stamped with percent signs fill the inbox and two spill over its edge: overwhelming subscribers with promotional material."
    >
      <rect x={40} y={40} width={300} height={200} rx={6} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Envelope x={170} y={140} k={2} tone={SIGNAL} fill={PAPER} />
      <Star2 x={208} y={116} r={14} tone={SIGNAL} />
      <Person3 x={290} y={220} k={1.3} stroke={SIGNAL} />
      <Key x={190} y={272} anchor="middle" fill={SIGNAL} size={10}>
        DELIVERING VALUE
      </Key>
      <rect x={440} y={40} width={320} height={200} rx={6} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      {flood.map((f, i) => (
        <g key={i}>
          <Envelope x={f.x} y={f.y} k={0.95} tone={COUNTER} fill={PAPER} width={1.25} />
          <text x={f.x} y={f.y + 9} textAnchor="middle" fontFamily="var(--font-heading)" fontWeight={600} fontSize={11} fill={COUNTER}>
            %
          </text>
        </g>
      ))}
      <Envelope x={752} y={236} k={0.95} tone={COUNTER} fill={PAPER} width={1.25} />
      <Envelope x={774} y={206} k={0.95} tone={COUNTER} fill={PAPER} width={1.25} />
      <Key x={580} y={272} anchor="middle" fill={COUNTER} size={10}>
        OVERWHELMING SUBSCRIBERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION — SEO vs SEM
   ========================================================================== */

/** Limited funds at a fork: a short quick road, or a long rising one. */
export function SeoSemFork() {
  return (
    <Frame
      height={260}
      label="A small coin stack labelled limited funds sits at a fork. The upper road, in the paid colour, is short and steep and ends at a shopping bag: immediate SEM campaigns for quick sales. The lower road, in teal, is long and climbs slowly toward a growing plant: long-term SEO for sustainable growth."
    >
      <Coins2 x={80} y={150} n={3} tone={INK} w={34} />
      <Key x={80} y={176} anchor="middle" fill={INK} size={9.5}>
        LIMITED FUNDS
      </Key>
      <path d="M110 136C170 136 190 70 280 60H360" fill="none" stroke={SIGNAL} strokeWidth={3} />
      <path d="M110 144C220 150 320 210 480 196C600 186 680 110 740 90" fill="none" stroke={COUNTER} strokeWidth={3} />
      <path d="M372 44H400L404 76H368Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={280} y={36} anchor="middle" fill={SIGNAL} size={10}>
        IMMEDIATE SEM · QUICK SALES
      </Key>
      {/* plant */}
      <path d="M756 90V50" stroke={COUNTER} strokeWidth={2} />
      <path d="M756 66Q736 60 734 44Q752 46 756 62" fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <path d="M756 58Q772 48 780 34Q762 34 756 54" fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Key x={560} y={236} anchor="middle" fill={COUNTER} size={10}>
        LONG-TERM SEO · SUSTAINABLE GROWTH
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   THE POWER OF SOCIAL MEDIA MARKETING
   ========================================================================== */

/** Before: the brand on a pedestal above the crowd. After: among them. */
export function RelationshipShift() {
  const crowd = [70, 120, 170, 220, 270];
  const ring = Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180;
    return { x: Math.round(600 + 110 * Math.cos(a)), y: Math.round(150 + 82 * Math.sin(a)) };
  });
  return (
    <Frame
      height={290}
      label="Two scenes. On the left, the brand seal sits high on a pedestal and people stand in a row below it, far away. On the right, the brand seal stands at the centre of a ring of people, each joined to it and to their neighbours by two-way links."
    >
      <rect x={146} y={70} width={48} height={60} fill={PAPER2} stroke={INK3} strokeWidth={1.25} />
      <Mark2 x={170} y={50} r={18} tone={INK} />
      {crowd.map((x) => (
        <Person3 key={x} x={x} y={240} k={0.9} stroke={INK3} />
      ))}
      <line x1={40} y1={240} x2={300} y2={240} stroke={RULE} strokeWidth={1} />
      <Key x={170} y={272} anchor="middle" fill={INK3} size={10}>
        BEFORE
      </Key>
      <Arrow3 x1={330} y1={150} x2={420} y2={150} tone={SIGNAL} width={2} />
      {ring.map((p, i) => {
        const q = ring[(i + 1) % ring.length];
        return <line key={`n${i}`} x1={p.x} y1={p.y - 14} x2={q.x} y2={q.y - 14} stroke={COUNTER} strokeWidth={1} />;
      })}
      {ring.map((p, i) => (
        <g key={i}>
          <TwoWay3 x1={Math.round(600 + (p.x - 600) * 0.25)} y1={Math.round(150 + (p.y - 150) * 0.25)} x2={Math.round(600 + (p.x - 600) * 0.72)} y2={Math.round(150 + (p.y - 150) * 0.72)} tone={SIGNAL} width={1.25} />
          <circle cx={p.x} cy={p.y - 14} r={18} fill={PAPER} stroke="none" />
          <Person3 x={p.x} y={p.y + 3} k={0.9} stroke={INK} />
        </g>
      ))}
      <Mark2 x={600} y={150} r={18} />
      <Key x={600} y={272} anchor="middle" fill={SIGNAL} size={10}>
        BUILD RELATIONSHIPS
      </Key>
    </Frame>
  );
}

/** A story told in frames, the progress bar across the top. */
export function Storytelling() {
  const xs = [30, 150, 270];
  return (
    <Frame
      width={400}
      height={260}
      label="Three tall phone-story frames in a row, each with a segmented progress bar across the top. In the first a seed, in the second a sprout, in the third a plant in flower: one story told in frames."
    >
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x} y={30} width={100} height={170} rx={8} fill={i === 2 ? SIGNAL_TINT : PAPER} stroke={i === 2 ? SIGNAL : INK} strokeWidth={1.5} />
          {[0, 1, 2].map((j) => (
            <line key={j} x1={x + 10 + j * 28} y1={42} x2={x + 34 + j * 28} y2={42} stroke={j <= i ? SIGNAL : RULE2} strokeWidth={3} strokeLinecap="round" />
          ))}
          <line x1={x + 20} y1={170} x2={x + 80} y2={170} stroke={INK} strokeWidth={1.25} />
          {i === 0 ? (
            <ellipse cx={x + 50} cy={164} rx={6} ry={4} fill={INK} />
          ) : i === 1 ? (
            <g>
              <path d={`M${x + 50} 170V136`} stroke={COUNTER} strokeWidth={2} />
              <path d={`M${x + 50} 146Q${x + 36} 140 ${x + 34} 128Q${x + 48} 130 ${x + 50} 144`} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
            </g>
          ) : (
            <g>
              <path d={`M${x + 50} 170V96`} stroke={COUNTER} strokeWidth={2} />
              <path d={`M${x + 50} 146Q${x + 34} 140 ${x + 32} 126Q${x + 48} 128 ${x + 50} 142`} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
              <path d={`M${x + 50} 130Q${x + 66} 124 ${x + 68} 110Q${x + 52} 112 ${x + 50} 126`} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
              {Array.from({ length: 6 }, (_, k) => {
                const a = (k * 60 * Math.PI) / 180;
                return <circle key={k} cx={r2(x + 50 + 9 * Math.cos(a))} cy={r2(88 + 9 * Math.sin(a))} r={6} fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} />;
              })}
              <circle cx={x + 50} cy={88} r={5} fill={SIGNAL} />
            </g>
          )}
        </g>
      ))}
      <Key x={200} y={236} anchor="middle" fill={SIGNAL} size={9.5}>
        STORYTELLING
      </Key>
    </Frame>
  );
}

/** People linked to each other, not only to the brand. */
export function Community() {
  const pts = Array.from({ length: 8 }, (_, i) => {
    const a = ((-90 + i * 45) * Math.PI) / 180;
    return { x: Math.round(200 + 120 * Math.cos(a)), y: Math.round(118 + 82 * Math.sin(a)) };
  });
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [0, 3], [1, 5], [2, 6], [4, 7],
  ];
  return (
    <Frame
      width={400}
      height={260}
      label="Eight people in a ring with the brand seal in the middle. Lines join the people to one another across the ring, not only to the brand: a community."
    >
      {links.map(([a, b], i) => (
        <line key={i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} stroke={COUNTER} strokeWidth={1} />
      ))}
      <circle cx={200} cy={118} r={20} fill={PAPER} stroke="none" />
      <Mark2 x={200} y={118} r={15} />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={17} fill={PAPER} stroke="none" />
          <Person3 x={p.x} y={p.y + 15} k={0.85} stroke={COUNTER} />
        </g>
      ))}
      <Key x={200} y={242} anchor="middle" fill={COUNTER} size={9.5}>
        COMMUNITY BUILDING
      </Key>
    </Frame>
  );
}

/** The logo turns into a person, who talks with a user directly. */
export function Humanize() {
  return (
    <Frame
      width={400}
      height={250}
      label="On the left the brand seal alone. An arrow leads to a person wearing the same seal, who faces a user; the two exchange speech bubbles."
    >
      <Mark2 x={50} y={120} r={26} tone={INK} />
      <Arrow3 x1={86} y1={120} x2={126} y2={120} tone={SIGNAL} width={1.5} />
      <Person3 x={180} y={200} k={2} stroke={SIGNAL} fill={SIGNAL_TINT} />
      <Mark2 x={180} y={184} r={9} />
      <Person3 x={330} y={200} k={2} stroke={INK} />
      <Bubble2 x={196} y={40} w={70} h={30} tone={SIGNAL} tail="left" />
      <Lines x={206} y={50} w={48} n={2} gap={8} tone={SIGNAL} />
      <Bubble2 x={256} y={78} w={70} h={30} tone={INK} tail="right" />
      <Lines x={266} y={88} w={48} n={2} gap={8} tone={INK} />
      <Key x={255} y={234} anchor="middle" fill={SIGNAL} size={9.5}>
        INTERACTING DIRECTLY WITH USERS
      </Key>
    </Frame>
  );
}

/** A complaint in a thread, answered and resolved. */
export function SupportThread() {
  return (
    <Frame
      width={400}
      height={260}
      label="A social post thread. A customer's comment carries an exclamation mark, a problem. Below it the brand replies, and a check mark closes the thread: customer service and support."
    >
      <rect x={30} y={20} width={340} height={216} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Person3 x={64} y={92} k={1} stroke={INK} />
      <Bubble2 x={90} y={44} w={230} h={44} tone={COUNTER} fill={COUNTER_TINT} />
      <Display x={108} y={76} size={24} fill={COUNTER}>
        !
      </Display>
      <Lines x={130} y={58} w={170} n={3} gap={8} tone={COUNTER} />
      <line x1={64} y1={100} x2={64} y2={150} stroke={RULE2} strokeWidth={1} />
      <line x1={64} y1={150} x2={100} y2={150} stroke={RULE2} strokeWidth={1} />
      <Mark2 x={118} y={170} r={14} />
      <Bubble2 x={142} y={134} w={200} h={40} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Lines x={156} y={148} w={140} n={2} gap={9} tone={SIGNAL} />
      <circle cx={322} cy={154} r={12} fill={SIGNAL} />
      <path d="M316 154L321 159L329 149" fill="none" stroke={PAPER} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
      <Key x={200} y={218} anchor="middle" fill={INK} size={9.5}>
        CUSTOMER SERVICE AND SUPPORT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   PLATFORMS AND DEMOGRAPHICS
   ========================================================================== */

type PlatformKind = "visual" | "pro" | "short";

/** A platform's screen, centred on x with top at y. */
function PlatformScreen({ kind, x, y, tone = INK }: { kind: PlatformKind; x: number; y: number; tone?: string }) {
  if (kind === "visual") {
    return (
      <g>
        <rect x={x - 50} y={y} width={100} height={100} rx={6} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={x - 42 + c * 29} y={y + 8 + r * 29} width={26} height={26} fill={(r + c) % 2 === 0 ? SIGNAL_TINT : PAPER2} stroke={tone} strokeWidth={0.75} />
          )),
        )}
      </g>
    );
  }
  if (kind === "pro") {
    return (
      <g>
        <rect x={x - 50} y={y} width={100} height={100} rx={6} fill={PAPER} stroke={tone} strokeWidth={1.5} />
        <rect x={x - 50} y={y} width={100} height={24} rx={6} fill={PAPER2} stroke={tone} strokeWidth={1} />
        <circle cx={x - 26} cy={y + 30} r={12} fill={PAPER} stroke={tone} strokeWidth={1.25} />
        <path d={`M${x - 8} ${y + 32}H${x + 38}`} stroke={tone} strokeWidth={2} />
        <path d={`M${x - 38} ${y + 58}H${x + 38}M${x - 38} ${y + 68}H${x + 30}M${x - 38} ${y + 78}H${x + 20}`} stroke={INK3} strokeWidth={1.25} />
        <rect x={x + 14} y={y + 82} width={22} height={12} rx={2} fill={PAPER} stroke={tone} strokeWidth={1.25} />
        <path d={`M${x + 20} ${y + 82}V${y + 79}H${x + 30}V${y + 82}`} fill="none" stroke={tone} strokeWidth={1.25} />
      </g>
    );
  }
  return (
    <g>
      <rect x={x - 30} y={y - 10} width={60} height={112} rx={8} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      <rect x={x - 25} y={y - 2} width={50} height={94} fill={PAPER2} stroke={tone} strokeWidth={0.75} />
      <path d={`M${x - 8} ${y + 32}L${x + 12} ${y + 45}L${x - 8} ${y + 58}Z`} fill={tone === INK ? INK : tone} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 18} cy={y + 60 + i * 10} r={2.5} fill={tone} />
      ))}
    </g>
  );
}

/** Three platforms, each with its own crowd and its own shape of content. */
export function PlatformAudiences() {
  const cols = [
    { x: 140, kind: "visual" as const, tone: SIGNAL, people: [0.9, 1, 0.95, 1.05] },
    { x: 400, kind: "pro" as const, tone: INK, people: [1.1, 1.1, 1.1, 1.1] },
    { x: 660, kind: "short" as const, tone: COUNTER, people: [0.75, 0.8, 0.7, 0.8] },
  ];
  return (
    <Frame
      height={310}
      label="Three platform screens side by side: a photo grid, a professional profile, and a vertical short video. Under each stands its own distinct crowd, drawn in its own colour. Above each screen sits a differently shaped piece of content, tailored to that platform: a square photo, a document, a vertical clip."
    >
      {cols.map((c) => (
        <g key={c.kind}>
          {c.kind === "visual" ? (
            <rect x={c.x - 16} y={16} width={32} height={32} fill={SIGNAL_TINT} stroke={c.tone} strokeWidth={1.5} />
          ) : c.kind === "pro" ? (
            <g>
              <rect x={c.x - 14} y={12} width={28} height={38} fill={PAPER} stroke={c.tone} strokeWidth={1.5} />
              <Lines x={c.x - 8} y={22} w={16} n={3} gap={7} tone={c.tone} width={1} />
            </g>
          ) : (
            <g>
              <rect x={c.x - 11} y={10} width={22} height={40} rx={3} fill={COUNTER_TINT} stroke={c.tone} strokeWidth={1.5} />
              <path d={`M${c.x - 3} 24L${c.x + 5} 30L${c.x - 3} 36Z`} fill={c.tone} />
            </g>
          )}
          <Arrow3 x1={c.x} y1={54} x2={c.x} y2={76} tone={c.tone} width={1.25} size={6} />
          <PlatformScreen kind={c.kind} x={c.x} y={82} tone={c.tone} />
          {c.people.map((k, i) => (
            <g key={i}>
              <Person3 x={c.x - 57 + i * 38} y={262} k={k} stroke={c.tone} />
              {c.kind === "pro" ? <path d={`M${c.x - 57 + i * 38} ${262 - 21 * k}L${c.x - 57 + i * 38} ${262 - 8 * k}`} stroke={c.tone} strokeWidth={2} /> : null}
            </g>
          ))}
          <line x1={c.x - 90} y1={270} x2={c.x + 90} y2={270} stroke={c.tone} strokeWidth={1.25} />
        </g>
      ))}
      <Key x={400} y={298} anchor="middle" fill={INK} size={10}>
        DISTINCT USER DEMOGRAPHICS · TAILORED CONTENT STRATEGIES
      </Key>
    </Frame>
  );
}

/** A photo grid of products in use: lifestyle and product showcasing. */
export function VisualPlatform() {
  return (
    <Frame
      width={400}
      height={260}
      label="A photo grid of six tiles, each showing a product: a mug beside a plant, a sneaker, a backpack on a hill in the sun, a jacket, a wristwatch and a shelf of goods. Two tiles carry a heart."
    >
      <PlatformScreenLarge />
      <Key x={200} y={246} anchor="middle" fill={SIGNAL} size={9.5}>
        LIFESTYLE AND PRODUCT SHOWCASING
      </Key>
    </Frame>
  );
}

function PlatformScreenLarge() {
  const tiles = [
    { x: 40, y: 20 },
    { x: 150, y: 20 },
    { x: 260, y: 20 },
    { x: 40, y: 124 },
    { x: 150, y: 124 },
    { x: 260, y: 124 },
  ];
  return (
    <g>
      {tiles.map((t, i) => (
        <rect key={i} x={t.x} y={t.y} width={100} height={96} fill={i % 2 === 0 ? SIGNAL_TINT : PAPER2} stroke={INK} strokeWidth={1.25} />
      ))}
      {/* mug and plant */}
      <path d="M62 94H118" stroke={INK} strokeWidth={1.25} />
      <rect x={70} y={66} width={24} height={28} rx={3} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M94 72Q104 74 104 80Q104 86 94 88" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <path d="M110 94V74M110 80Q100 76 100 66M110 78Q118 72 120 64" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      {/* sneaker */}
      <path d="M168 88V74Q176 74 182 66L196 70Q204 80 228 82Q236 84 236 92H168Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M168 92H236" stroke={INK} strokeWidth={3} />
      {/* backpack on a hill */}
      <path d="M260 104Q300 70 360 90V116H260Z" fill={COUNTER_TINT} stroke="none" />
      <circle cx={336} cy={46} r={10} fill={PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      <rect x={292} y={58} width={26} height={32} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M296 72H314" stroke={INK} strokeWidth={1} />
      {/* bottom row: jacket, bike wheel, shelf */}
      <path d="M70 146L84 140H96L110 146L114 168H106V200H74V168H66Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <rect x={190} y={134} width={20} height={88} rx={4} fill={PAPER2} stroke={INK} strokeWidth={1.25} />
      <circle cx={200} cy={176} r={20} fill={PAPER} stroke={INK} strokeWidth={1.75} />
      <path d="M200 176V164M200 176H209" stroke={SIGNAL} strokeWidth={1.75} strokeLinecap="round" />
      <path d="M272 176H348M272 200H348" stroke={INK} strokeWidth={1.25} />
      {[280, 300, 322].map((x, i) => (
        <rect key={x} x={x} y={176 - [18, 26, 14][i]} width={14} height={[18, 26, 14][i]} fill={i === 1 ? SIGNAL_TINT : PAPER} stroke={INK} strokeWidth={1.25} />
      ))}
      <Heart x={128} y={34} s={7} />
      <Heart x={348} y={138} s={7} />
    </g>
  );
}

/** Two companies joined through a professional profile: B2B. */
export function ProfessionalNetwork() {
  return (
    <Frame
      width={400}
      height={260}
      label="Two office buildings, one on each side. Between them a professional profile card with a briefcase, and a two-way link that runs from one building through the profile to the other: B2B marketing and corporate branding."
    >
      {[50, 350].map((x) => (
        <g key={x}>
          <rect x={x - 34} y={70} width={68} height={120} fill={PAPER} stroke={INK} strokeWidth={1.5} />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={x - 24 + c * 18} y={82 + r * 24} width={12} height={14} fill={PAPER2} stroke={INK} strokeWidth={0.75} />),
          )}
        </g>
      ))}
      <Key x={50} y={210} anchor="middle" fill={INK} size={9}>
        BUSINESS
      </Key>
      <Key x={350} y={210} anchor="middle" fill={INK} size={9}>
        BUSINESS
      </Key>
      <TwoWay3 x1={90} y1={130} x2={148} y2={130} tone={INK} width={1.5} />
      <TwoWay3 x1={252} y1={130} x2={310} y2={130} tone={INK} width={1.5} />
      <PlatformScreen kind="pro" x={200} y={80} />
      <Mark2 x={174} y={110} r={8} />
      <Key x={200} y={240} anchor="middle" fill={INK} size={9.5}>
        B2B MARKETING · CORPORATE BRANDING
      </Key>
    </Frame>
  );
}

/** A vertical video, a crowd of young viewers, and a trend line rising fast. */
export function ShortFormVideo() {
  return (
    <Frame
      width={400}
      height={260}
      label="A vertical short-video phone on the left. To its right, a crowd of smaller, younger figures, and above them a trend line that shoots upward: younger demographics and trend creation."
    >
      <PlatformScreen kind="short" x={70} y={50} tone={COUNTER} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Person3 key={i} x={160 + (i % 3) * 40 + (i >= 3 ? 20 : 0)} y={i >= 3 ? 214 : 190} k={0.7} stroke={COUNTER} />
      ))}
      <path d="M150 140L200 132L240 120L280 90L310 50L330 30" fill="none" stroke={SIGNAL} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={headAlong2(330, 30, 20, -20, 9)} fill="none" stroke={SIGNAL} strokeWidth={2.5} />
      <Key x={340} y={60} fill={SIGNAL} size={9}>
        TREND
      </Key>
      <Key x={200} y={246} anchor="middle" fill={COUNTER} size={9.5}>
        YOUNGER DEMOGRAPHICS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   BUILDING CUSTOMER ENGAGEMENT
   ========================================================================== */

/** A staircase that climbs past likes and follows to advocacy. */
export function EngagementStairs() {
  const steps = [
    { x: 60, h: 50, key: "LIKES" },
    { x: 230, h: 100, key: "FOLLOWS" },
    { x: 400, h: 150, key: "" },
    { x: 570, h: 200, key: "GENUINE BRAND ADVOCACY" },
  ];
  return (
    <Frame
      height={290}
      label="A staircase of four steps rising left to right. The first step holds a heart, likes. The second holds a plus-person, follows. The third, a person sharing. On the top step, lit, a person with a megaphone speaks up for the brand seal: genuine brand advocacy."
    >
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={250 - s.h} width={170} height={s.h} fill={i === 3 ? SIGNAL_TINT : PAPER2} stroke={i === 3 ? SIGNAL : INK} strokeWidth={1.5} />
          {s.key ? (
            <Key x={s.x + 85} y={250 - s.h + 24} anchor="middle" fill={i === 3 ? SIGNAL : INK} size={i === 3 ? 9 : 10}>
              {s.key}
            </Key>
          ) : null}
        </g>
      ))}
      <Heart x={145} y={176} s={14} />
      <Person3 x={306} y={148} k={1.1} stroke={INK} />
      <path d="M326 118H340M333 111V125" stroke={INK} strokeWidth={2} />
      <Person3 x={470} y={96} k={1.1} stroke={INK} />
      <ShareGlyph x={500} y={66} />
      <Person3 x={630} y={50} k={1.3} stroke={SIGNAL} fill={PAPER} />
      <Tool kind="ad" x={680} y={20} k={0.7} tone={SIGNAL} fill={PAPER} />
      <Mark2 x={720} y={20} r={8} />
      <path d="M380 258H40" stroke={INK3} strokeWidth={1} strokeDasharray="4 3" />
      <Arrow3 x1={390} y1={272} x2={760} y2={272} tone={SIGNAL} width={1.5} />
      <Key x={40} y={278} fill={INK3} size={9}>
        BEYOND LIKES AND FOLLOWS
      </Key>
    </Frame>
  );
}

/** A poll post that people vote in and pass on. */
export function InteractivePoll() {
  return (
    <Frame
      width={400}
      height={260}
      label="A post holding a poll with two options and their result bars. Cursors from several users tap the options, and a share arrow carries the poll on to more people."
    >
      <rect x={40} y={24} width={240} height={180} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Mark2 x={64} y={48} r={10} />
      <path d="M84 44H200M84 54H160" stroke={INK} strokeWidth={1.25} />
      {[
        { y: 84, w: 150, lit: true },
        { y: 130, w: 70, lit: false },
      ].map((o) => (
        <g key={o.y}>
          <rect x={60} y={o.y} width={200} height={32} rx={16} fill={PAPER} stroke={INK} strokeWidth={1.25} />
          <rect x={60} y={o.y} width={o.w} height={32} rx={16} fill={o.lit ? SIGNAL_TINT : PAPER2} stroke={o.lit ? SIGNAL : INK3} strokeWidth={1.25} />
          <path d={`M76 ${o.y + 16}H${o.lit ? 150 : 110}`} stroke={o.lit ? SIGNAL : INK} strokeWidth={2} strokeLinecap="round" />
        </g>
      ))}
      {[
        [196, 108],
        [224, 96],
        [140, 156],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}V${y + 18}L${x + 5} ${y + 13}L${x + 9} ${y + 21}L${x + 12} ${y + 19}L${x + 8} ${y + 12}H${x + 14}Z`} fill={PAPER} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      ))}
      <Heart x={64} y={188} s={7} />
      <Bubble2 x={84} y={180} w={20} h={14} tone={INK} width={1.1} />
      <ShareGlyph x={126} y={186} />
      <CurveArrow1 x1={284} y1={120} cx={330} cy={100} x2={344} y2={150} tone={COUNTER} width={1.5} />
      {[0, 1, 2].map((i) => (
        <Person3 key={i} x={320 + i * 26} y={206} k={0.75} stroke={COUNTER} />
      ))}
      <Key x={200} y={244} anchor="middle" fill={INK} size={9.5}>
        PARTICIPATION AND SHARING
      </Key>
    </Frame>
  );
}

/** A comment, a quick human reply, and a trust gauge that fills. */
export function ReplyTrust() {
  return (
    <Frame
      width={400}
      height={260}
      label="A user's comment bubble, then straight beneath it the brand's reply, joined by a short line: prompt. Beside them a vertical gauge labelled trust fills up in the brand colour."
    >
      <Person3 x={46} y={84} k={1} stroke={INK} />
      <Bubble2 x={70} y={34} w={190} h={38} tone={INK} />
      <Lines x={84} y={46} w={150} n={2} gap={9} tone={INK} />
      <path d="M90 82V112H110" fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Mark2 x={128} y={150} r={12} />
      <Bubble2 x={146} y={104} w={170} h={38} tone={SIGNAL} fill={SIGNAL_TINT} />
      <Lines x={160} y={116} w={130} n={2} gap={9} tone={SIGNAL} />
      <Key x={70} y={196} fill={SIGNAL} size={9}>
        PROMPT AND AUTHENTIC
      </Key>
      <rect x={344} y={40} width={24} height={170} rx={12} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <rect x={344} y={80} width={24} height={130} rx={12} fill={SIGNAL} />
      <Arrow3 x1={384} y1={190} x2={384} y2={90} tone={SIGNAL} width={1.25} size={6} />
      <Key x={356} y={234} anchor="middle" fill={SIGNAL} size={9.5}>
        TRUST
      </Key>
    </Frame>
  );
}

/** One user's photo, reshared by the brand, reaching rings of new people. */
export function UgcAmplify() {
  return (
    <Frame
      height={300}
      label="A user holds up their own photo of the product. The brand reshares it, and the post, now stamped with a check for credibility, sends out widening rings that reach three growing rows of people: amplified reach."
    >
      <Person3 x={70} y={220} k={1.6} stroke={COUNTER} fill={COUNTER_TINT} />
      <rect x={96} y={110} width={80} height={70} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      <rect x={122} y={128} width={28} height={36} rx={4} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <Key x={120} y={262} anchor="middle" fill={COUNTER} size={9.5}>
        USER-GENERATED CONTENT
      </Key>
      <Arrow3 x1={186} y1={146} x2={250} y2={146} tone={INK} width={1.5} />
      <rect x={260} y={90} width={130} height={116} rx={6} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Mark2 x={280} y={108} r={9} />
      <rect x={274} y={124} width={102} height={70} fill={PAPER2} stroke={INK} strokeWidth={1} />
      <rect x={312} y={138} width={26} height={34} rx={4} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.25} />
      <circle cx={386} cy={96} r={14} fill={SIGNAL} />
      <path d="M379 96L384 101L393 91" fill="none" stroke={PAPER} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
      <Key x={386} y={70} anchor="middle" fill={SIGNAL} size={9.5}>
        CREDIBILITY
      </Key>
      {[
        [70, 60],
        [150, 100],
        [250, 130],
      ].map(([rx, ry]) => (
        <path key={rx} d={`M400 ${148 - ry}A${rx} ${ry} 0 0 1 400 ${148 + ry}`} fill="none" stroke={SIGNAL} strokeWidth={1} strokeDasharray="4 4" />
      ))}
      {[
        { x: 500, n: 2 },
        { x: 590, n: 4 },
        { x: 690, n: 6 },
      ].map((col) =>
        Array.from({ length: col.n }, (_, i) => (
          <Person3 key={`${col.x}-${i}`} x={col.x + (i % 2) * 26} y={Math.round(150 - ((Math.ceil(col.n / 2) - 1) * 44) / 2 + Math.floor(i / 2) * 44 + 12)} k={0.7} stroke={SIGNAL} />
        )),
      )}
      <Key x={640} y={286} anchor="middle" fill={SIGNAL} size={9.5}>
        AMPLIFY REACH
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   SOCIAL LISTENING
   ========================================================================== */

/** A field of conversations; a listener picks out the ones about the brand. */
export function Listening() {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    x: 250 + (i % 5) * 104 + (Math.floor(i / 5) % 2) * 30,
    y: 40 + Math.floor(i / 5) * 72,
    brand: [1, 7, 13].includes(i),
    industry: [4, 9].includes(i),
  }));
  return (
    <Frame
      height={270}
      label="A person wearing headphones on the left listens across a wide field of fifteen conversation bubbles. Three bubbles contain the brand seal and are lit; two contain a small shop, the industry; the rest are plain chatter. Dashed listening lines run to the lit ones."
    >
      <Person3 x={80} y={200} k={2.2} stroke={INK} />
      <path d="M62 128Q62 106 80 106Q98 106 98 128" fill="none" stroke={SIGNAL} strokeWidth={3} />
      <rect x={56} y={124} width={8} height={14} rx={3} fill={SIGNAL} />
      <rect x={96} y={124} width={8} height={14} rx={3} fill={SIGNAL} />
      <Key x={80} y={232} anchor="middle" fill={SIGNAL} size={9.5}>
        MONITORING
      </Key>
      {bubbles
        .filter((b) => b.brand || b.industry)
        .map((b, i) => (
          <line key={i} x1={108} y1={128} x2={b.x} y2={b.y + 16} stroke={b.brand ? SIGNAL : COUNTER} strokeWidth={1} strokeDasharray="4 4" />
        ))}
      {bubbles.map((b, i) => (
        <g key={i}>
          <Bubble2 x={b.x} y={b.y} w={78} h={34} tone={b.brand ? SIGNAL : b.industry ? COUNTER : RULE2} fill={b.brand ? SIGNAL_TINT : b.industry ? COUNTER_TINT : PAPER} width={b.brand || b.industry ? 1.5 : 1} />
          {b.brand ? (
            <Mark2 x={b.x + 18} y={b.y + 17} r={9} />
          ) : b.industry ? (
            <path d={`M${b.x + 9} ${b.y + 26}V${b.y + 14}L${b.x + 18} ${b.y + 8}L${b.x + 27} ${b.y + 14}V${b.y + 26}Z`} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} strokeLinejoin="round" />
          ) : null}
          <Lines x={b.brand || b.industry ? b.x + 34 : b.x + 10} y={b.y + 12} w={b.brand || b.industry ? 34 : 56} n={2} gap={9} tone={b.brand ? SIGNAL : b.industry ? COUNTER : RULE2} width={1} />
        </g>
      ))}
      <Key x={776} y={262} anchor="end" fill={INK} size={9.5}>
        DIGITAL CONVERSATIONS ABOUT A BRAND OR INDUSTRY
      </Key>
    </Frame>
  );
}

/** Three things heard: sentiment, pain points, emerging trends. */
export function UnfilteredInsights() {
  return (
    <Frame
      height={260}
      label="Three panels. Customer sentiment: a row of faces, most smiling, some flat, a few frowning. Pain points: a bubble with a jagged lightning mark. Emerging trends: a small line that runs flat and then shoots up at the end."
    >
      {/* sentiment */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const mood = i < 3 ? 1 : i < 5 ? 0 : -1;
        const x = 50 + (i % 3) * 56;
        const y = 80 + Math.floor(i / 3) * 60;
        const tone = mood === 1 ? SIGNAL : mood === 0 ? INK3 : COUNTER;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={20} fill={PAPER} stroke={tone} strokeWidth={1.5} />
            <circle cx={x - 7} cy={y - 5} r={2} fill={tone} />
            <circle cx={x + 7} cy={y - 5} r={2} fill={tone} />
            <path d={mood === 1 ? `M${x - 8} ${y + 5}Q${x} ${y + 13} ${x + 8} ${y + 5}` : mood === 0 ? `M${x - 8} ${y + 8}H${x + 8}` : `M${x - 8} ${y + 11}Q${x} ${y + 3} ${x + 8} ${y + 11}`} fill="none" stroke={tone} strokeWidth={1.75} strokeLinecap="round" />
          </g>
        );
      })}
      <Key x={106} y={206} anchor="middle" fill={INK} size={10}>
        CUSTOMER SENTIMENT
      </Key>
      <line x1={260} y1={40} x2={260} y2={220} stroke={RULE} strokeWidth={1} />
      {/* pain points */}
      <Bubble2 x={320} y={60} w={160} h={96} tone={COUNTER} fill={COUNTER_TINT} />
      <path d="M404 72L382 112H402L390 146L428 100H406L420 72Z" fill={COUNTER} stroke={COUNTER} strokeWidth={1} strokeLinejoin="round" />
      <Key x={400} y={206} anchor="middle" fill={COUNTER} size={10}>
        PAIN POINTS
      </Key>
      <line x1={540} y1={40} x2={540} y2={220} stroke={RULE} strokeWidth={1} />
      {/* trends */}
      <path d="M580 170H770" stroke={INK} strokeWidth={1} />
      <path d="M580 160L620 162L660 158L700 156L730 130L750 90L766 58" fill="none" stroke={SIGNAL} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={766} cy={58} r={4} fill={SIGNAL} />
      <Key x={680} y={206} anchor="middle" fill={SIGNAL} size={10}>
        EMERGING TRENDS
      </Key>
    </Frame>
  );
}

/** Complaints building toward a crisis; the brand steps in early and it flattens. */
export function Escalation() {
  return (
    <Frame
      height={290}
      label="A chart of negative mentions over time. A dashed curve rises steeply into a shaded zone at the top labelled crisis. The solid line follows it only at the start: at an early point marked with the brand seal, the brand addresses the issue and the line flattens out well below the crisis zone."
    >
      <rect x={70} y={36} width={700} height={52} fill={COUNTER_TINT} />
      <Key x={760} y={66} anchor="end" fill={COUNTER} size={10.5}>
        CRISES
      </Key>
      <path d="M70 40V240H770" fill="none" stroke={INK} strokeWidth={1.25} />
      <path d="M70 232C200 230 260 220 300 204C400 170 480 110 540 40" fill="none" stroke={COUNTER} strokeWidth={2} strokeDasharray="6 5" />
      <path d="M70 232C200 230 260 220 300 204C360 192 420 196 520 200C600 202 700 204 770 204" fill="none" stroke={SIGNAL} strokeWidth={2.75} />
      <circle cx={300} cy={204} r={20} fill={PAPER} stroke="none" />
      <Mark2 x={300} y={204} r={14} />
      <Key x={300} y={164} anchor="middle" fill={SIGNAL} size={10}>
        PROACTIVELY ADDRESS ISSUES
      </Key>
      <Key x={70} y={266} fill={INK3} size={9.5}>
        TIME
      </Key>
    </Frame>
  );
}

/** Bubbles into a lightbulb; the lightbulb into a product and a plan. */
export function InsightToProduct() {
  return (
    <Frame
      width={400}
      height={260}
      label="Three conversation bubbles on the left funnel into a lightbulb, the insight. From the bulb two arrows go on: one to a new product box, one to a strategy sheet."
    >
      {[40, 90, 140].map((y) => (
        <g key={y}>
          <Bubble2 x={20} y={y} w={70} h={30} tone={INK} />
          <Lines x={30} y={y + 10} w={48} n={2} gap={8} tone={INK} width={1} />
          <Arrow3 x1={96} y1={y + 16} x2={150} y2={116} tone={INK3} width={1} size={5} />
        </g>
      ))}
      <Bulb2 x={184} y={110} k={2} />
      <Arrow3 x1={214} y1={96} x2={278} y2={66} tone={SIGNAL} width={1.5} />
      <Arrow3 x1={214} y1={126} x2={278} y2={160} tone={SIGNAL} width={1.5} />
      <path d="M292 44L322 32L352 44V88L322 100L292 88Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M292 44L322 56L352 44M322 56V100" fill="none" stroke={SIGNAL} strokeWidth={1.25} />
      <rect x={296} y={140} width={56} height={62} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <path d="M306 186L318 170L328 178L342 154" fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
      <Key x={322} y={122} anchor="middle" fill={SIGNAL} size={9}>
        PRODUCT DEVELOPMENT
      </Key>
      <Key x={322} y={224} anchor="middle" fill={INK} size={9}>
        MARKETING STRATEGIES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   INFLUENCER MARKETING
   ========================================================================== */

/** An expert within a niche, a dedicated following round them, a brand partner. */
export function InfluencerNiche() {
  const followers = Array.from({ length: 10 }, (_, i) => {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    return { x: Math.round(500 + 150 * Math.cos(a)), y: Math.round(150 + 100 * Math.sin(a)) };
  });
  return (
    <Frame
      height={310}
      label="An influencer in a graduation cap, an expert, stands in the middle of a small circle, the niche. Ten followers stand in a ring around the circle, each facing inward. On the left the brand seal reaches out to the influencer with a handshake line: a partnership."
    >
      <circle cx={500} cy={150} r={70} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.75} />
      <Person3 x={500} y={180} k={2} stroke={COUNTER} fill={PAPER} />
      {/* mortarboard: expertise */}
      <path d="M476 118L500 108L524 118L500 128Z" fill={INK} stroke={INK} strokeWidth={1.25} strokeLinejoin="round" />
      <path d="M488 123V130Q500 136 512 130V123" fill={INK} />
      <path d="M522 118V132" stroke={INK} strokeWidth={1.25} />
      <Key x={500} y={210} anchor="middle" fill={COUNTER} size={9}>
        NICHE
      </Key>
      {followers.map((f, i) => (
        <Person3 key={i} x={f.x} y={f.y + 14} k={0.75} stroke={INK} />
      ))}
      <Key x={784} y={30} anchor="end" fill={INK} size={9.5}>
        DEDICATED SOCIAL
      </Key>
      <Key x={784} y={44} anchor="end" fill={INK} size={9.5}>
        FOLLOWING
      </Key>
      <Mark2 x={90} y={150} r={30} />
      <path d="M126 150H330" stroke={SIGNAL} strokeWidth={2} />
      <circle cx={126} cy={150} r={4} fill={SIGNAL} />
      <circle cx={330} cy={150} r={4} fill={SIGNAL} />
      <Key x={228} y={140} anchor="middle" fill={SIGNAL} size={10}>
        PARTNERS
      </Key>
      <Key x={500} y={296} anchor="middle" fill={COUNTER} size={10}>
        VIEWED AS EXPERTS
      </Key>
    </Frame>
  );
}

/** Brand to audience runs through the trust the influencer already holds. */
export function TrustRelay() {
  return (
    <Frame
      width={400}
      height={260}
      label="The brand seal at the top left, an influencer at the top right, and a small audience below. The direct line from the brand to the audience is thin and dashed. The line from the influencer to the audience is thick and solid, labelled trust."
    >
      <Mark2 x={70} y={60} r={22} />
      <Person3 x={320} y={90} k={1.5} stroke={COUNTER} fill={COUNTER_TINT} />
      <Arrow3 x1={98} y1={60} x2={290} y2={60} tone={SIGNAL} width={1.5} />
      {[140, 190, 240].map((x) => (
        <Person3 key={x} x={x} y={226} k={1} stroke={INK} />
      ))}
      <line x1={80} y1={90} x2={150} y2={180} stroke={INK3} strokeWidth={1} strokeDasharray="3 4" />
      <path d="M312 104Q300 170 250 186" fill="none" stroke={COUNTER} strokeWidth={5} strokeLinecap="round" />
      <Key x={316} y={170} fill={COUNTER} size={10}>
        TRUST
      </Key>
      <Key x={190} y={252} anchor="middle" fill={INK} size={9}>
        THEIR AUDIENCE
      </Key>
    </Frame>
  );
}

/** A celebrity's big crowd with a few engaged; a micro-influencer's small one, many engaged. */
export function MicroVsCeleb() {
  const celeb: { x: number; y: number; on: boolean }[] = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) celeb.push({ x: 60 + c * 30, y: 110 + r * 26, on: (r * 10 + c) % 17 === 5 });
  const micro: { x: number; y: number; on: boolean }[] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) micro.push({ x: 560 + c * 34, y: 162 + r * 30, on: (r * 4 + c) % 2 === 0 || r * 4 + c === 7 });
  return (
    <Frame
      height={330}
      label="Two audiences drawn as dots. Left, a high-profile celebrity above a big field of sixty dots, only a handful lit as engaged. Right, a micro-influencer above a small field of twelve dots, more than half of them lit. The right field is small but its share of engaged dots is far higher."
    >
      {/* celebrity with a star */}
      <Person3 x={200} y={84} k={1.6} stroke={INK} />
      <Star2 x={228} y={36} r={11} tone={INK} fill={PAPER} />
      <Key x={200} y={100} anchor="middle" fill={INK} size={9.5}>
        HIGH-PROFILE CELEBRITIES
      </Key>
      {celeb.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y + 16} r={8} fill={d.on ? SIGNAL : PAPER} stroke={d.on ? SIGNAL : INK3} strokeWidth={1} />
      ))}
      <line x1={420} y1={40} x2={420} y2={300} stroke={RULE} strokeWidth={1} />
      <Person3 x={610} y={124} k={1.2} stroke={COUNTER} fill={COUNTER_TINT} />
      <Key x={610} y={140} anchor="middle" fill={COUNTER} size={9.5}>
        MICRO-INFLUENCERS
      </Key>
      {micro.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y + 16} r={8} fill={d.on ? SIGNAL : PAPER} stroke={d.on ? SIGNAL : INK3} strokeWidth={1} />
      ))}
      <circle cx={450} cy={312} r={6} fill={SIGNAL} />
      <Key x={462} y={316} fill={SIGNAL} size={9.5}>
        ENGAGED
      </Key>
      <Key x={610} y={282} anchor="middle" fill={SIGNAL} size={10}>
        HIGHER ENGAGEMENT RATES
      </Key>
    </Frame>
  );
}

/** Brand and influencer as two circles whose shared values sit in the overlap. */
export function Alignment() {
  return (
    <Frame
      width={400}
      height={260}
      label="Two overlapping circles: the brand on the left, the influencer on the right. In the overlap sit a leaf and a mountain, values both of them share. Each circle also holds one thing of its own."
    >
      <circle cx={150} cy={120} r={90} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <circle cx={250} cy={120} r={90} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.75} />
      <Mark2 x={96} y={120} r={16} />
      <Person3 x={306} y={138} k={1.1} stroke={COUNTER} />
      {/* leaf */}
      <path d="M200 102Q180 96 184 72Q204 76 204 98Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M200 102L188 80" stroke={INK} strokeWidth={1} />
      {/* mountain */}
      <path d="M180 162L196 136L206 148L214 138L226 162Z" fill={PAPER} stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      <Key x={100} y={236} anchor="middle" fill={SIGNAL} size={9.5}>
        THE BRAND
      </Key>
      <Key x={300} y={236} anchor="middle" fill={COUNTER} size={9.5}>
        THE INFLUENCER
      </Key>
      <Key x={200} y={24} anchor="middle" fill={INK} size={9.5}>
        AUTHENTIC ALIGNMENT
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   THE CHALLENGE: MEASURING ROI
   ========================================================================== */

/** Money goes in; the path to the return is a tangle; the exact return is a question. */
export function TangledReturn() {
  return (
    <Frame
      height={250}
      label="On the left, a stack of coins: the investment. A line leaves it and knots itself into a tangle through a phone, an envelope and a heart. It comes out on the right at a coin stack with a question mark over it: the exact return."
    >
      <Coins2 x={70} y={180} n={6} tone={INK} w={40} />
      <Key x={70} y={210} anchor="middle" fill={INK} size={9.5}>
        INVESTMENT
      </Key>
      <path
        d="M96 150C160 150 170 60 240 70C320 82 250 200 330 190C420 178 330 60 420 60C500 60 440 180 520 170C600 160 560 90 620 110C660 124 660 150 690 150"
        fill="none"
        stroke={COUNTER}
        strokeWidth={2}
      />
      <path d="M250 120C300 100 360 150 300 160C260 168 240 110 290 96" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <path d="M470 110C520 90 540 140 500 146C470 150 460 120 480 108" fill="none" stroke={COUNTER} strokeWidth={1.5} />
      <circle cx={240} cy={70} r={16} fill={PAPER} stroke="none" />
      <Phone2 x={240} y={70} k={0.6} />
      <circle cx={420} cy={60} r={16} fill={PAPER} stroke="none" />
      <Envelope x={420} y={60} k={0.6} />
      <circle cx={520} cy={170} r={14} fill={PAPER} stroke="none" />
      <Heart x={520} y={170} s={8} />
      <Coins2 x={730} y={180} n={4} tone={SIGNAL} fill={SIGNAL_TINT} w={40} />
      <Display x={730} y={132} anchor="middle" size={34} fill={SIGNAL}>
        ?
      </Display>
      <Key x={730} y={210} anchor="middle" fill={SIGNAL} size={9.5}>
        THE EXACT RETURN
      </Key>
    </Frame>
  );
}

/** From click-through rates at one end to attribution at the other. */
export function MetricSpan() {
  const touches = [
    { x: 420, kind: "ad" },
    { x: 500, kind: "mail" },
    { x: 580, kind: "social" },
    { x: 660, kind: "search" },
  ];
  const credit = [
    { w: 60, t: SIGNAL },
    { w: 40, t: INK },
    { w: 70, t: COUNTER },
    { w: 90, t: INK3 },
  ];
  return (
    <Frame
      height={310}
      label="A span arrow runs from click-through rates on the left to conversion attribution models on the right, with a jumble of other metric chips along the way. On the left, ten ad views of which two became clicks. On the right, a customer's path touches an ad, an email, a social post and a search before a purchase, and a bar below splits the credit for that sale among the four touchpoints."
    >
      <TwoWay3 x1={40} y1={30} x2={760} y2={30} tone={INK} width={1.25} />
      <Key x={40} y={56} fill={SIGNAL} size={10}>
        CLICK-THROUGH RATES
      </Key>
      <Key x={760} y={56} anchor="end" fill={COUNTER} size={10}>
        CONVERSION ATTRIBUTION MODELS
      </Key>
      {/* the multitude */}
      {[
        [230, 70, 44],
        [284, 74, 30],
        [248, 96, 36],
        [300, 100, 26],
        [264, 122, 40],
      ].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={14} rx={7} fill={PAPER2} stroke={INK3} strokeWidth={1} />
      ))}
      {/* CTR: views and clicks */}
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <Eye2 x={56 + (i % 5) * 32} y={100 + Math.floor(i / 5) * 40} k={0.55} tone={i === 1 || i === 7 ? SIGNAL : INK3} />
        </g>
      ))}
      {[1, 7].map((i) => (
        <path key={i} transform={`translate(${60 + (i % 5) * 32} ${104 + Math.floor(i / 5) * 40})`} d="M0 0V16L4 12L7 19L10 17L7 11H12Z" fill={PAPER} stroke={SIGNAL} strokeWidth={1.25} strokeLinejoin="round" />
      ))}
      <Display x={120} y={210} anchor="middle" size={26} fill={SIGNAL}>
        2 / 10
      </Display>
      {/* attribution */}
      <path d="M380 150H720" stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
      <Person3 x={380} y={168} k={0.9} stroke={INK} />
      {touches.map((t) => (
        <g key={t.x}>
          <circle cx={t.x} cy={150} r={20} fill={PAPER} stroke={INK} strokeWidth={1.25} />
          {t.kind === "ad" ? (
            <g>
              <rect x={t.x - 12} y={143} width={24} height={14} fill={SIGNAL} />
              <text x={t.x} y={154} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={9} fill={PAPER}>
                AD
              </text>
            </g>
          ) : t.kind === "mail" ? (
            <Envelope x={t.x} y={150} k={0.55} />
          ) : t.kind === "social" ? (
            <Heart x={t.x} y={150} s={7} tone={COUNTER} />
          ) : (
            <Magnifier1 x={t.x - 2} y={148} r={6} tone={INK3} />
          )}
        </g>
      ))}
      <path d="M730 136H756L760 168H726Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} strokeLinejoin="round" />
      {(() => {
        let x = 420;
        return credit.map((c, i) => {
          const el = <rect key={i} x={x} y={210} width={c.w * 1.3} height={26} fill={c.t === INK3 ? PAPER2 : c.t} stroke={INK} strokeWidth={1} />;
          x += c.w * 1.3;
          return el;
        });
      })()}
    </Frame>
  );
}

/** Hearts and comments on one side, revenue on the other, joined only by tracking. */
export function EngagementToRevenue() {
  return (
    <Frame
      width={400}
      height={250}
      label="Hearts and comment bubbles on the left, a stack of coins on the right. Between them a box with a chart, analytics tracking, threads a line that ties the one to the other."
    >
      <Heart x={50} y={70} s={12} />
      <Heart x={84} y={110} s={9} />
      <Bubble2 x={30} y={132} w={46} h={28} tone={INK} />
      <Heart x={96} y={56} s={7} />
      <Key x={64} y={206} anchor="middle" fill={INK} size={9}>
        SOCIAL ENGAGEMENT
      </Key>
      <path d="M110 100C140 100 140 110 150 110" fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
      <rect x={150} y={70} width={100} height={80} fill={INK} />
      <path d="M164 134L186 110L206 120L236 86" fill="none" stroke={PAPER} strokeWidth={2} strokeLinejoin="round" />
      <Key x={200} y={176} anchor="middle" fill={INK} size={9}>
        ANALYTICS TRACKING
      </Key>
      <Arrow3 x1={250} y1={110} x2={300} y2={110} tone={SIGNAL} width={2} />
      <Coins2 x={340} y={150} n={7} tone={SIGNAL} fill={SIGNAL_TINT} w={40} />
      <Key x={340} y={206} anchor="middle" fill={SIGNAL} size={9}>
        REVENUE
      </Key>
    </Frame>
  );
}

/** A big heart count going nowhere; a smaller metric aimed at the objective. */
export function VanityVsObjective() {
  return (
    <Frame
      width={400}
      height={270}
      label="Top: a big, bold heart count in a balloon floating free on a string, attached to nothing: vanity numbers. Bottom: a small metric gauge with an arrow running straight into the centre of a target labelled business objectives."
    >
      <ellipse cx={120} cy={62} rx={88} ry={42} fill={PAPER} stroke={INK3} strokeWidth={1.5} />
      <Heart x={70} y={62} s={14} tone={INK3} />
      <Display x={98} y={74} size={32} fill={INK3}>
        ♥♥♥
      </Display>
      <path d="M120 104Q110 120 124 134Q138 148 126 160" fill="none" stroke={INK3} strokeWidth={1} />
      <Key x={230} y={66} fill={INK3} size={9.5}>
        VANITY NUMBERS
      </Key>
      <line x1={20} y1={172} x2={380} y2={172} stroke={RULE} strokeWidth={1} />
      <path d="M40 240A30 30 0 0 1 100 240" fill="none" stroke={SIGNAL} strokeWidth={3} />
      <line x1={70} y1={240} x2={88} y2={220} stroke={SIGNAL} strokeWidth={2} />
      <Arrow3 x1={108} y1={226} x2={270} y2={226} tone={SIGNAL} width={2} />
      {[34, 22, 10].map((r, i) => (
        <circle key={r} cx={300} cy={226} r={r} fill={i === 2 ? SIGNAL : PAPER} stroke={SIGNAL} strokeWidth={1.5} />
      ))}
      <Key x={300} y={186} anchor="middle" fill={SIGNAL} size={9}>
        BUSINESS OBJECTIVES
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   ETHICS AND PRIVACY
   ========================================================================== */

/** A road that has to pass between fences guarding consumer data. */
export function DataBoundaries() {
  return (
    <Frame
      height={272}
      label="A winding road runs from left to right. On both sides of it stand fences, and behind each fence sit consumer data files. The road stays between the fences the whole way: ethical boundaries around consumer data."
    >
      <path d="M20 125C150 125 200 95 300 95C420 95 440 155 560 155C660 155 700 120 780 120" fill="none" stroke={PAPER2} strokeWidth={46} />
      <path d="M20 125C150 125 200 95 300 95C420 95 440 155 560 155C660 155 700 120 780 120" fill="none" stroke={SIGNAL} strokeWidth={2} strokeDasharray="10 8" />
      {[
        [110, 36],
        [300, 36],
        [520, 36],
        [700, 36],
      ].map(([x, y], i) => (
        <g key={`t${i}`}>
          <path d={`M${x - 40} ${y + 24}H${x + 40}`} stroke={COUNTER} strokeWidth={1.5} />
          {[-36, -18, 0, 18, 36].map((d) => (
            <line key={d} x1={x + d} y1={y + 12} x2={x + d} y2={y + 30} stroke={COUNTER} strokeWidth={1.5} />
          ))}
          <DataFile x={x} y={y - 8} k={0.8} />
        </g>
      ))}
      {[
        [150, 214],
        [360, 214],
        [620, 214],
      ].map(([x, y], i) => (
        <g key={`b${i}`}>
          <path d={`M${x - 40} ${y - 24}H${x + 40}`} stroke={COUNTER} strokeWidth={1.5} />
          {[-36, -18, 0, 18, 36].map((d) => (
            <line key={d} x1={x + d} y1={y - 30} x2={x + d} y2={y - 12} stroke={COUNTER} strokeWidth={1.5} />
          ))}
          <DataFile x={x} y={y + 8} k={0.8} />
        </g>
      ))}
      <Key x={780} y={262} anchor="end" fill={COUNTER} size={10}>
        ETHICAL BOUNDARIES · CONSUMER DATA
      </Key>
    </Frame>
  );
}

/** Rules pile higher each year; the data sits in a clear jar for all to see. */
export function Regulations() {
  return (
    <Frame
      width={400}
      height={260}
      label="Left: four stacks of rule documents, each taller than the last, increasing regulations. Right: a clear glass jar with the data dots plainly visible inside, and an eye looking in: transparent data collection and usage."
    >
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {Array.from({ length: i + 2 }, (_, j) => (
            <rect key={j} x={28 + i * 44} y={196 - (j + 1) * 16} width={34} height={14} fill={PAPER} stroke={INK} strokeWidth={1.1} />
          ))}
        </g>
      ))}
      <line x1={20} y1={198} x2={200} y2={198} stroke={INK} strokeWidth={1} />
      <Key x={110} y={226} anchor="middle" fill={INK} size={9}>
        INCREASING REGULATIONS
      </Key>
      <path d="M262 80V190Q262 200 272 200H348Q358 200 358 190V80" fill={PAPER} stroke={COUNTER} strokeWidth={1.75} />
      <rect x={256} y={66} width={108} height={14} rx={3} fill={PAPER} stroke={COUNTER} strokeWidth={1.5} />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={278 + (i % 5) * 16} cy={186 - Math.floor(i / 5) * 16} r={5} fill={COUNTER} />
      ))}
      <Eye2 x={310} y={40} k={0.8} tone={INK} />
      <Key x={310} y={226} anchor="middle" fill={COUNTER} size={9}>
        TRANSPARENT
      </Key>
    </Frame>
  );
}

/** A person holding their data behind a shield. */
export function Protective() {
  return (
    <Frame
      width={400}
      height={260}
      label="A person holds their own data file close. In front of them stands a large shield, and a grabbing arrow from the right stops against it."
    >
      <Person3 x={130} y={200} k={2.6} stroke={INK} />
      <DataFile x={160} y={150} k={1.2} tone={INK} fill={PAPER2} />
      <Shield x={230} y={130} k={2.4} />
      <Arrow3 x1={380} y1={130} x2={292} y2={130} tone={SIGNAL} width={1.75} dash="5 4" />
      <path d="M284 118L296 142M296 118L284 142" stroke={SIGNAL} strokeWidth={2} />
      <Key x={200} y={240} anchor="middle" fill={COUNTER} size={9.5}>
        PERSONAL INFORMATION
      </Key>
    </Frame>
  );
}

/** A balance tipped toward privacy; trust grows on that side. */
export function PrivacyScale() {
  return (
    <Frame
      height={290}
      label="A balance scale. The left pan holds a padlock, user privacy, and sits low: it outweighs the right pan, which holds a scoop hauling up data files, aggressive data harvesting. Beneath the low side, the brand and a person joined by a two-way link: building trust."
    >
      <path d="M400 70V240M340 250H460" stroke={INK} strokeWidth={2} />
      <path d="M390 250L400 236L410 250" fill={INK} />
      <line x1={220} y1={110} x2={580} y2={50} stroke={INK} strokeWidth={2.5} />
      <circle cx={400} cy={80} r={6} fill={INK} />
      {/* left pan (low) */}
      <path d="M220 110L180 170M220 110L260 170" stroke={INK} strokeWidth={1} />
      <path d="M170 170H270Q260 190 220 190Q180 190 170 170Z" fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
      <Lock x={220} y={150} k={1.6} tone={COUNTER} />
      <Key x={220} y={214} anchor="middle" fill={COUNTER} size={10}>
        USER PRIVACY
      </Key>
      {/* right pan (high) */}
      <path d="M580 50L540 110M580 50L620 110" stroke={INK} strokeWidth={1} />
      <path d="M530 110H630Q620 130 580 130Q540 130 530 110Z" fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      {[556, 580, 604].map((x) => (
        <DataFile key={x} x={x} y={94} k={0.6} tone={SIGNAL} />
      ))}
      <Key x={580} y={154} anchor="middle" fill={SIGNAL} size={10}>
        AGGRESSIVE DATA HARVESTING
      </Key>
      {/* trust */}
      <Mark2 x={186} y={248} r={10} tone={COUNTER} />
      <TwoWay3 x1={200} y1={248} x2={238} y2={248} tone={COUNTER} width={1.5} />
      <Person3 x={254} y={262} k={0.7} stroke={COUNTER} />
      <Key x={220} y={284} anchor="middle" fill={COUNTER} size={10}>
        BUILDING TRUST
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION — DATA PRIVACY
   ========================================================================== */

/** Two bars: third-party data doubles conversions, under a watching eye. */
export function DataDilemma() {
  return (
    <Frame
      height={270}
      label="Two options side by side. Left, third-party data: an ad conversion bar twice as tall, with an eye watching over the customers beneath it, surveillance. Right, first-party data: a conversion bar half that height, and the brand and a customer exchanging data face to face."
    >
      <line x1={60} y1={220} x2={740} y2={220} stroke={INK} strokeWidth={1.25} />
      <rect x={180} y={60} width={80} height={160} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.75} />
      <Display x={220} y={100} anchor="middle" size={26} fill={SIGNAL}>
        ×2
      </Display>
      <Eye2 x={110} y={70} k={1.4} tone={COUNTER} />
      {[80, 110, 140].map((x) => (
        <Person3 key={x} x={x} y={214} k={0.9} stroke={INK3} />
      ))}
      <path d="M92 86L80 170M110 86V170M128 86L140 170" stroke={COUNTER} strokeWidth={1} strokeDasharray="3 3" />
      <Key x={170} y={248} anchor="middle" fill={SIGNAL} size={10}>
        THIRD-PARTY DATA
      </Key>
      <Key x={220} y={50} anchor="middle" fill={SIGNAL} size={9}>
        AD CONVERSION RATE
      </Key>
      <rect x={540} y={140} width={80} height={80} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.75} />
      <Mark2 x={660} y={170} r={14} />
      <Person3 x={720} y={214} k={1.2} stroke={INK} />
      <TwoWay3 x1={678} y1={176} x2={704} y2={176} tone={COUNTER} width={1.5} />
      <DataFile x={690} y={146} k={0.6} tone={COUNTER} />
      <Key x={630} y={248} anchor="middle" fill={COUNTER} size={10}>
        FIRST-PARTY DATA
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   CONCLUSION — small glyphs
   ========================================================================== */

export function GlyphTransformed() {
  return (
    <GlyphFrame>
      <path d="M4 20H16M4 28H16M4 36H16" stroke={INK3} strokeWidth={2} />
      <Arrow3 x1={20} y1={28} x2={34} y2={28} tone={SIGNAL} width={1.5} size={5} />
      <Phone2 x={52} y={28} k={0.95} tone={SIGNAL} />
    </GlyphFrame>
  );
}

export function GlyphFourStrategies() {
  return (
    <GlyphFrame>
      <Magnifier1 x={14} y={14} r={7} tone={COUNTER} />
      <rect x={40} y={6} width={24} height={14} fill={SIGNAL} />
      <text x={52} y={17} textAnchor="middle" fontFamily="var(--font-label)" fontWeight={700} fontSize={9} fill={PAPER}>
        AD
      </text>
      <rect x={8} y={32} width={20} height={20} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d="M15 37L22 42L15 47Z" fill={INK} />
      <Envelope x={52} y={42} k={0.55} />
    </GlyphFrame>
  );
}

export function GlyphCommunity() {
  const pts = [
    [20, 16],
    [52, 16],
    [14, 42],
    [58, 42],
  ];
  return (
    <GlyphFrame>
      {pts.map(([x, y], i) => (
        <line key={i} x1={36} y1={29} x2={x} y2={y} stroke={COUNTER} strokeWidth={1} />
      ))}
      <path d="M20 16L52 16L58 42L14 42Z" fill="none" stroke={COUNTER} strokeWidth={1} />
      {pts.map(([x, y], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r={5} fill={PAPER} stroke={COUNTER} strokeWidth={1.25} />
      ))}
      <Mark2 x={36} y={29} r={8} />
    </GlyphFrame>
  );
}

export function GlyphEthics() {
  return (
    <GlyphFrame>
      <Shield x={24} y={28} k={0.9} />
      <Lock x={24} y={27} k={0.6} tone={COUNTER} />
      <path d="M44 40L52 30L58 34L68 16" fill="none" stroke={SIGNAL} strokeWidth={1.75} strokeLinejoin="round" />
    </GlyphFrame>
  );
}
