/* ==========================================================================
   Week 03 plates: Qualitative Research.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import { Plus, RotateCcw } from "lucide-react";
import { Sneaker, PersonSimpleRun, Medal, Microphone, Eye, ChatsCircle } from "@phosphor-icons/react";
import {
  Frame,
  Key,
  Display,
  Note,
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
  COUNTER_TINT,
  head,
  r2,
  PlateButton,
  Segmented,
  Slider,
  Toggles,
} from "../_visuals/kit";
import { Person1, AiMark1 } from "../_visuals/objects";

/* --------------------------------------------------------------------------
   Shared marks
   -------------------------------------------------------------------------- */

/**
 * A speech bubble holding lines of words, its tail pointing down to the
 * speaker at (tx, ty). Lines are drawn as hairline bars, since the words
 * themselves are not the point: that the data are words is.
 */
function WordsBubble({
  x,
  y,
  w,
  h,
  tx,
  ty,
  lines,
  stroke = INK,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tx: number;
  ty: number;
  /** Line lengths as fractions of the inner width. */
  lines: number[];
  stroke?: string;
}) {
  const rr = 6;
  const tb = Math.max(x + rr + 4, Math.min(x + w - rr - 14, tx - 5));
  const d = `M${x + rr} ${y}H${x + w - rr}Q${x + w} ${y} ${x + w} ${y + rr}V${y + h - rr}Q${x + w} ${y + h} ${x + w - rr} ${y + h}H${r2(tb + 10)}L${tx} ${ty}L${r2(tb)} ${y + h}H${x + rr}Q${x} ${y + h} ${x} ${y + h - rr}V${y + rr}Q${x} ${y} ${x + rr} ${y}Z`;
  const pad = 9;
  const gap = (h - 2 * pad) / Math.max(1, lines.length - 1);
  return (
    <g>
      <path d={d} fill={PAPER} stroke={stroke} strokeWidth={1.25} strokeLinejoin="round" />
      {lines.map((f, i) => (
        <line
          key={i}
          x1={x + pad}
          y1={r2(y + pad + i * gap)}
          x2={r2(x + pad + f * (w - 2 * pad))}
          y2={r2(y + pad + i * gap)}
          stroke={RULE2}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

/* --------------------------------------------------------------------------
   Qualitative and Quantitative Research
   -------------------------------------------------------------------------- */

/**
 * Qualitative and Quantitative Research: the two kinds of data side by side.
 * Left, four participants, each answering in words. Right, four hundred
 * respondents, 152 of them counted, and the share they make: a number.
 */
export function QualQuantData() {
  const people = [70, 160, 250, 340];
  const bubbles = [
    [0.9, 0.7, 0.45],
    [0.8, 0.95, 0.6],
    [0.95, 0.55, 0.8],
    [0.7, 0.9, 0.35],
  ];
  const base = 176;
  const k = 1.1;
  const cols = 40;
  const rows = 10;
  const gx = 432;
  const gy = 66;
  const counted = 152;
  return (
    <Frame
      width={800}
      height={196}
      label="Two kinds of data. Qualitative: four participants, each answering in several lines of words. Quantitative: four hundred respondents, 152 of whom are counted, reported as 38 percent"
    >
      <Key x={20} y={20} fill={SIGNAL}>QUALITATIVE</Key>
      <Key x={380} y={20} anchor="end" fill={INK3}>n = 4</Key>
      {people.map((x, i) => (
        <g key={x}>
          <WordsBubble x={x - 40} y={50} w={80} h={48} tx={x + 2} ty={r2(base - 44 * k) + 2} lines={bubbles[i]} stroke={SIGNAL} />
          <Person1 x={x} y={base} k={k} />
        </g>
      ))}

      <line x1={410} y1={12} x2={410} y2={184} stroke={RULE} strokeWidth={1} />

      <Key x={gx} y={20} fill={INK}>QUANTITATIVE</Key>
      <Key x={780} y={20} anchor="end" fill={INK3}>n = 400</Key>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = Math.floor(i / rows);
        const r = i % rows;
        const on = i < counted;
        return (
          <Person1
            key={i}
            x={r2(gx + 3 + c * 6.2)}
            y={r2(gy + 8 + r * 11.6)}
            k={0.28}
            width={0.7}
            stroke={on ? COUNTER : INK3}
            fill={on ? COUNTER : PAPER}
          />
        );
      })}
      <Display x={780} y={134} anchor="end" fill={COUNTER} size={40}>38%</Display>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Focus Groups
   -------------------------------------------------------------------------- */

/** How much each seat at the table tends to talk, fixed per seat; seat 0 dominates. */
const TALK = [1.3, 0.34, 0.58, 0.22, 0.42, 0.28, 0.17, 0.25, 0.19, 0.15, 0.31, 0.13];
const SESSION = 90;
const MODERATOR = 20;

/**
 * Focus Groups: how a 90-minute session divides among its speakers. The
 * moderator speaks for 20 minutes; the other 70 are shared by the
 * participants, unevenly, as in a real group: each seat keeps the same
 * tendency to talk, and one participant dominates.
 *
 * Interactive: the PARTICIPANTS slider seats more people. Every bar shrinks,
 * and the quietest participants fall to two or three minutes in a whole
 * session, while the dominant one still speaks for far longer. It opens at
 * eight, inside the usual six to ten.
 */
export function FocusGroupAirtime() {
  const [n, setN] = useState(8);
  const w = TALK.slice(0, n);
  const total = w.reduce((a, b) => a + b, 0);
  const mins = w.map((v) => ((SESSION - MODERATOR) * v) / total);
  const quiet = Math.min(...mins);
  const loud = Math.max(...mins);

  const base = 206;
  const unit = 4.3; // units per minute: the largest bar (4 seats) still clears the key
  const mx = 38;
  const x0 = 88;
  const x1 = 380;
  const step = (x1 - x0) / n;
  const bw = Math.min(20, step * 0.56);
  const fmt = (m: number) => String(Math.max(1, Math.round(m)));

  const bar = (x: number, m: number, fill: string, stroke: string, numFill: string, key: string) => {
    const h = r2(m * unit);
    return (
      <g key={key}>
        <rect x={r2(x - bw / 2)} y={r2(base - h)} width={r2(bw)} height={h} fill={fill} stroke={stroke} strokeWidth={1.25} />
        <Key x={r2(x)} y={r2(base - h - 7)} anchor="middle" fill={numFill} size={10.5}>
          {fmt(m)}
        </Key>
      </g>
    );
  };

  return (
    <>
      <Frame
        width={400}
        height={270}
        label={`Minutes each speaker talks in a 90-minute focus group with ${n} participants: the moderator 20, the dominant participant ${fmt(loud)}, and the quietest ${fmt(quiet)}`}
      >
        <Key x={20} y={18} fill={INK3}>MINUTES SPOKEN IN A 90-MINUTE SESSION</Key>

        {/* baseline */}
        <line x1={16} y1={base} x2={386} y2={base} stroke={INK} strokeWidth={1.25} />
        <line x1={64} y1={base - 166} x2={64} y2={base + 44} stroke={RULE} strokeWidth={1} />

        {/* the moderator */}
        {bar(mx, MODERATOR, PAPER3, INK3, INK3, "mod")}
        <Person1 x={mx} y={base + 40} k={0.9} fill={INK} stroke={INK} />
        <Key x={mx} y={base + 55} anchor="middle" fill={INK3} size={9}>MODERATOR</Key>

        {/* the participants */}
        {mins.map((m, i) => {
          const x = x0 + step * (i + 0.5);
          const dominant = m === loud;
          const tone = dominant ? COUNTER : INK;
          return (
            <g key={i}>
              {bar(x, m, dominant ? COUNTER_TINT : PAPER, tone, tone, `p${i}`)}
              <Person1 x={r2(x)} y={base + 40} k={Math.min(0.9, step / 30)} stroke={INK} />
            </g>
          );
        })}
        <Key x={r2(x0 + step * 0.5 + bw / 2 + 6)} y={r2(base - loud * unit + 12)} fill={COUNTER} size={9.5}>
          DOMINATES
        </Key>
      </Frame>
      <Slider label="Participants" value={n} min={4} max={12} onChange={setN} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Depth Interviews
   -------------------------------------------------------------------------- */

/**
 * Depth Interviews: laddering drawn as a ladder. Each rung is one answer in
 * the running-shoe example, climbing from the attribute at the foot to the
 * personal value at the top; the value is the finding, in the accent.
 */
export function Laddering() {
  const rungs = [
    { key: "ATTRIBUTE", note: "lightweight", Icon: Sneaker },
    { key: "CONSEQUENCE", note: "faster running", Icon: PersonSimpleRun },
    { key: "CONSEQUENCE", note: "a sense of achievement", Icon: Medal },
    { key: "PERSONAL VALUE", note: "self-esteem", Icon: null },
  ];
  const L = 74;
  const R = 122;
  const y0 = 222;
  const gap = 56;
  return (
    <Frame
      width={400}
      height={252}
      label="A ladder of four rungs for a running shoe: the attribute lightweight at the foot, then the consequences faster running and a sense of achievement, and at the top the personal value self-esteem"
    >
      {/* rails */}
      <line x1={L} y1={y0 + 20} x2={L} y2={y0 - 3 * gap - 22} stroke={INK} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={R} y1={y0 + 20} x2={R} y2={y0 - 3 * gap - 22} stroke={INK} strokeWidth={1.75} strokeLinecap="round" />
      {rungs.map((r, i) => {
        const y = y0 - i * gap;
        const top = i === rungs.length - 1;
        const tone = top ? SIGNAL : INK;
        return (
          <g key={i}>
            <line x1={L} y1={y} x2={R} y2={y} stroke={tone} strokeWidth={top ? 3 : 1.75} strokeLinecap="round" />
            {i > 0 ? (
              <path d={head.up(98, y + 14, 7)} fill="none" stroke={INK3} strokeWidth={1.25} />
            ) : null}
            {r.Icon ? (
              <r.Icon x={144} y={y - 17} size={34} weight="regular" color={INK} />
            ) : null}
            <Key x={192} y={y - 6} fill={top ? SIGNAL : INK3} size={10.5}>
              {r.key}
            </Key>
            <Note x={192} y={top ? y + 16 : y + 13} fill={tone} size={top ? 18 : 15} weight={top ? 600 : 400}>
              {r.note}
            </Note>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Discussion: Choosing the Method
   -------------------------------------------------------------------------- */

/** A leaf, the mark for environmentally friendly, centred on (cx, cy); s is its span. */
function LeafMark({ cx, cy, s = 14, fill = SIGNAL }: { cx: number; cy: number; s?: number; fill?: string }) {
  const h = s / 2;
  return (
    <g>
      <path
        d={`M${r2(cx - h)} ${r2(cy + h)}Q${r2(cx - h)} ${r2(cy - h)} ${r2(cx + h)} ${r2(cy - h)}Q${r2(cx + h)} ${r2(cy + h)} ${r2(cx - h)} ${r2(cy + h)}Z`}
        fill={fill}
      />
      <line x1={r2(cx - h * 0.55)} y1={r2(cy + h * 0.55)} x2={r2(cx + h * 0.6)} y2={r2(cy - h * 0.6)} stroke={PAPER} strokeWidth={1} />
    </g>
  );
}

/** A trigger spray bottle of cleaner standing on (x, y), 44 units tall; eco carries a leaf on its label. */
function SprayBottle1({ x, y, eco = false }: { x: number; y: number; eco?: boolean }) {
  return (
    <g>
      <rect x={x - 10} y={y - 30} width={20} height={30} rx={3} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <rect x={x - 4} y={y - 36} width={8} height={6} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <path d={`M${x - 7} ${y - 36}V${y - 44}H${x + 12}V${y - 40}H${x + 3}V${y - 36}Z`} fill={INK} stroke={INK} strokeWidth={1} strokeLinejoin="round" />
      <line x1={x + 4} y1={y - 36} x2={x + 8} y2={y - 30} stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      {eco ? <LeafMark cx={x} cy={y - 15} s={12} /> : null}
    </g>
  );
}

/**
 * Discussion: Choosing the Method: ten consumers, each above the cleaner
 * they bought. Eight state a preference for environmentally friendly
 * products (the leaf beside them); only three of the bottles carry the leaf.
 */
export function SayDoGap() {
  const prefers = [true, true, true, false, true, true, true, false, true, true];
  const bought = [false, true, false, false, false, true, false, false, true, false];
  const x = (i: number) => 38 + i * 36;
  const personY = 104;
  const bottleY = 206;
  return (
    <Frame
      width={400}
      height={222}
      label="Ten consumers. Eight state a preference for environmentally friendly products, marked with a leaf; beneath each one is the cleaner they purchased, and only three of those ten bottles are environmentally friendly"
    >
      <Key x={20} y={18} fill={INK3}>STATED PREFERENCE</Key>
      <Key x={380} y={18} anchor="end" fill={SIGNAL}>8 OF 10</Key>
      {prefers.map((p, i) => (
        <g key={i}>
          {p ? (
            <>
              <path
                d={`M${x(i) - 10} 30H${x(i) + 10}Q${x(i) + 13} 30 ${x(i) + 13} 33V${49}Q${x(i) + 13} 52 ${x(i) + 10} 52H${x(i) + 4}L${x(i) + 1} 59L${x(i) - 3} 52H${x(i) - 10}Q${x(i) - 13} 52 ${x(i) - 13} 49V33Q${x(i) - 13} 30 ${x(i) - 10} 30Z`}
                fill={PAPER}
                stroke={INK}
                strokeWidth={1.1}
                strokeLinejoin="round"
              />
              <LeafMark cx={x(i)} cy={41} s={13} />
            </>
          ) : null}
          <Person1 x={x(i)} y={personY} k={0.95} />
        </g>
      ))}
      <line x1={20} y1={122} x2={380} y2={122} stroke={RULE} strokeWidth={1} />
      <Key x={20} y={144} fill={INK3}>PURCHASED</Key>
      <Key x={380} y={144} anchor="end" fill={SIGNAL}>3 OF 10</Key>
      {bought.map((b, i) => (
        <SprayBottle1 key={i} x={x(i)} y={bottleY} eco={b} />
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Coding
   -------------------------------------------------------------------------- */

/**
 * Coding: a page of interview transcript with three segments coded in the
 * margin. Two codes come from the codebook (deductive, ink); the third
 * idea was not in the codebook and gets a new code developed from the data
 * (inductive, in the accent).
 */
export function CodedTranscript() {
  const lines = [
    "I always check the app to compare",
    "prices before I leave home.",
    "Then I walk the aisles in the same",
    "order every week.",
    "I wait until my usual brand is on",
    "promotion before I buy it.",
    "The self-checkout makes me nervous,",
    "so I queue for a cashier instead.",
  ];
  const top = 34;
  const lh = 23;
  const ly = (i: number) => top + i * lh;
  const segments = [
    { from: 0, to: 1, code: "compares prices online", kind: "DEDUCTIVE", tone: INK, tint: PAPER3 },
    { from: 4, to: 5, code: "waits for promotions", kind: "DEDUCTIVE", tone: INK, tint: PAPER3 },
    { from: 6, to: 7, code: "avoids self-checkout", kind: "INDUCTIVE", tone: SIGNAL, tint: SIGNAL_TINT },
  ];
  const sx = 12;
  const sw = 232;
  const tx = 262;
  return (
    <Frame
      width={400}
      height={226}
      label="A page of interview transcript with three highlighted segments. Two are coded from the codebook, deductively: compares prices online, and waits for promotions. The third, about avoiding the self-checkout, gets a new code developed from the data, inductively"
    >
      {/* the page */}
      <rect x={sx} y={10} width={sw} height={206} fill={PAPER} stroke={RULE2} strokeWidth={1} />
      {segments.map((g, i) => (
        <rect
          key={i}
          x={sx + 6}
          y={r2(ly(g.from) - 15)}
          width={sw - 12}
          height={r2((g.to - g.from + 1) * lh - 2)}
          fill={g.tint}
        />
      ))}
      {lines.map((t, i) => (
        <Note key={i} x={sx + 12} y={ly(i)} size={12} fill={INK2}>
          {t}
        </Note>
      ))}

      {/* codes in the margin */}
      {segments.map((g, i) => {
        const y0 = ly(g.from) - 15;
        const y1 = ly(g.to) + 7;
        const mid = r2((y0 + y1) / 2);
        return (
          <g key={i}>
            <path d={`M${sx + sw + 4} ${r2(y0 + 1)}H${sx + sw + 9}V${r2(y1 - 1)}H${sx + sw + 4}`} fill="none" stroke={g.tone} strokeWidth={1.5} />
            <line x1={sx + sw + 9} y1={mid} x2={tx - 4} y2={mid} stroke={g.tone} strokeWidth={1.25} />
            <Key x={tx} y={r2(mid - 6)} fill={g.tone === SIGNAL ? SIGNAL : INK3} size={9}>
              {g.kind}
            </Key>
            <Note x={tx} y={r2(mid + 10)} size={12} fill={g.tone} weight={600}>
              {g.code}
            </Note>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   From Codes to Themes
   -------------------------------------------------------------------------- */

/**
 * From Codes to Themes: the three codes of the example converge on the
 * theme of price vigilance (the finding, in the accent). A representative
 * quotation supports the theme; a participant whose case does not fit it
 * is reported beside it, in the contrast colour.
 */
export function CodesToThemes() {
  const codes = ["compares prices online", "waits for promotions", "buys store brands"];
  const cy = [52, 96, 140];
  const cw = 196;
  const mid = 96;
  const tx = 300;
  const tw = 176;
  const qx = 548;
  return (
    <Frame
      width={800}
      height={176}
      label="Three codes, compares prices online, waits for promotions, and buys store brands, converge on one theme, price vigilance. A participant's quotation supports the theme; another participant's quotation does not fit it"
    >
      <Key x={20} y={18} fill={INK3}>CODES</Key>
      {codes.map((c, i) => (
        <g key={c}>
          <rect x={20} y={cy[i] - 16} width={cw} height={30} fill={PAPER3} />
          <Note x={32} y={cy[i] + 4} size={14} fill={INK} weight={600}>
            {c}
          </Note>
          <path
            d={`M${20 + cw} ${cy[i] - 1}H${250}Q${262} ${cy[i] - 1} ${262} ${r2(cy[i] - 1 + (mid - cy[i]) * 0.5)}V${r2(cy[i] - 1 + (mid - cy[i]) * 0.5)}Q${262} ${mid} ${274} ${mid}`}
            fill="none"
            stroke={INK3}
            strokeWidth={1.25}
          />
        </g>
      ))}
      <line x1={274} y1={mid} x2={tx - 4} y2={mid} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head.right(tx - 4, mid, 7)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      <Key x={tx} y={18} fill={SIGNAL}>THEME</Key>
      <rect x={tx} y={mid - 30} width={tw} height={60} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.5} />
      <Display x={tx + tw / 2} y={mid + 8} anchor="middle" fill={SIGNAL} size={24}>
        price vigilance
      </Display>

      {/* evidence: a representative quotation, and a case that does not fit */}
      <line x1={tx + tw} y1={mid} x2={qx - 44} y2={mid} stroke={RULE2} strokeWidth={1} />
      <line x1={qx - 44} y1={52} x2={qx - 44} y2={140} stroke={RULE2} strokeWidth={1} />
      <line x1={qx - 44} y1={52} x2={qx - 28} y2={52} stroke={RULE2} strokeWidth={1} />
      <line x1={qx - 44} y1={140} x2={qx - 28} y2={140} stroke={RULE2} strokeWidth={1} />

      <Person1 x={qx - 12} y={66} k={0.85} stroke={SIGNAL} />
      <Key x={qx + 8} y={30} fill={SIGNAL} size={10}>REPRESENTATIVE QUOTATION</Key>
      <Note x={qx + 8} y={52} size={13.5} italic fill={INK}>
        &ldquo;I never buy anything before I have
      </Note>
      <Note x={qx + 8} y={70} size={13.5} italic fill={INK}>
        checked three websites.&rdquo;
      </Note>

      <Person1 x={qx - 12} y={154} k={0.85} stroke={COUNTER} />
      <Key x={qx + 8} y={118} fill={COUNTER} size={10}>DOES NOT FIT</Key>
      <Note x={qx + 8} y={140} size={13.5} italic fill={INK}>
        &ldquo;I buy the brand my mother bought,
      </Note>
      <Note x={qx + 8} y={158} size={13.5} italic fill={INK}>
        whatever it costs.&rdquo;
      </Note>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Saturation
   -------------------------------------------------------------------------- */

type Sample = "similar" | "diverse";
/** New codes produced by each successive interview, for two kinds of sample. */
const NEW_CODES: Record<Sample, number[]> = {
  similar: [5, 4, 3, 2, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  diverse: [5, 4, 4, 3, 3, 2, 3, 2, 2, 1, 2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
};
const MAX_INTERVIEWS = 24;
/** Interviews without a new code needed before saturation is declared. */
const CONFIRM = 3;

/**
 * Saturation: each bar is one interview, as tall as the number of distinct
 * codes found so far; the codes that interview added sit on top in the
 * accent. Once three interviews in a row add nothing, the plate marks
 * saturation after the last interview that did.
 *
 * Interactive: "Conduct the next interview" runs one more interview, so the
 * student collects data until saturation is reached, and sees the new codes
 * per interview dwindle to zero. PARTICIPANTS switches between a similar and
 * a diverse sample: the diverse one needs about twice as many interviews. It
 * opens after six interviews with similar participants.
 */
export function SaturationCurve() {
  const [sample, setSample] = useState<Sample>("similar");
  const [done, setDone] = useState(6);
  const seq = NEW_CODES[sample];
  const cum = seq.reduce<number[]>((a, v) => [...a, (a[a.length - 1] ?? 0) + v], []);
  const lastNew = seq.reduce((a, v, i) => (v > 0 ? i : a), 0); // index of the last interview with a new code
  const saturated = done >= lastNew + 1 + CONFIRM;

  const L = 44;
  const base = 238;
  const cell = 4.4;
  const slot = 14;
  const bw = 9;
  const bx = (i: number) => L + 8 + i * slot;
  const cy = (n: number) => r2(base - n * cell);
  const current = done - 1;
  const plural = (n: number) => (n === 1 ? "1 NEW CODE" : `${n} NEW CODES`);
  const status = saturated
    ? `NO NEW CODES IN INTERVIEWS ${lastNew + 2}–${lastNew + 1 + CONFIRM}`
    : `INTERVIEW ${done}: ${plural(seq[current])}`;
  const satX = r2(bx(lastNew) + bw + (slot - bw) / 2);

  return (
    <>
      <Frame
        width={400}
        height={272}
        label={`Distinct codes found after each of ${done} interviews with ${sample} participants: ${cum[current]} codes so far, the last interview adding ${seq[current]}.${saturated ? ` Saturation was reached after interview ${lastNew + 1}.` : ""}`}
      >
        <Key x={L} y={18} fill={INK3}>CODES FOUND SO FAR</Key>
        <Key x={388} y={44} anchor="end" fill={SIGNAL} size={10}>{status}</Key>

        {/* axes */}
        <line x1={L} y1={base} x2={392} y2={base} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(392, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        <line x1={L} y1={base} x2={L} y2={40} stroke={INK} strokeWidth={1.25} />
        <path d={head.up(L, 40, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[10, 20, 30].map((v) => (
          <g key={v}>
            <line x1={L - 4} y1={cy(v)} x2={L} y2={cy(v)} stroke={INK} strokeWidth={1} />
            <Key x={L - 8} y={r2(cy(v) + 4)} anchor="end" fill={INK3} size={9.5}>{v}</Key>
          </g>
        ))}
        {[1, 6, 12, 18, 24].map((v) => (
          <Key key={v} x={r2(bx(v - 1) + bw / 2)} y={base + 16} anchor="middle" fill={INK3} size={9.5}>{v}</Key>
        ))}
        <Key x={392} y={base + 30} anchor="end" fill={INK3}>INTERVIEWS</Key>

        {/* one bar per interview conducted */}
        {Array.from({ length: done }, (_, i) => {
          const before = i === 0 ? 0 : cum[i - 1];
          return (
            <g key={i}>
              {Array.from({ length: cum[i] }, (_, c) => (
                <rect
                  key={c}
                  x={bx(i)}
                  y={r2(base - (c + 1) * cell + 0.5)}
                  width={bw}
                  height={r2(cell - 1)}
                  fill={c >= before ? SIGNAL : PAPER3}
                />
              ))}
              {seq[i] > 0 ? (
                <Key x={r2(bx(i) + bw / 2)} y={r2(cy(cum[i]) - 5)} anchor="middle" fill={SIGNAL} size={8.5} weight={700}>
                  {`+${seq[i]}`}
                </Key>
              ) : null}
            </g>
          );
        })}
        {/* the interviews still to come */}
        {Array.from({ length: MAX_INTERVIEWS - done }, (_, j) => (
          <line key={j} x1={bx(done + j)} y1={base - 1.5} x2={bx(done + j) + bw} y2={base - 1.5} stroke={RULE2} strokeWidth={1.5} />
        ))}

        {saturated ? (
          <g>
            <line x1={satX} y1={base} x2={satX} y2={54} stroke={SIGNAL} strokeWidth={1.25} strokeDasharray="4 3" />
            <Key x={r2(satX + 6)} y={64} fill={SIGNAL} size={10.5}>SATURATION</Key>
          </g>
        ) : null}
      </Frame>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 px-1">
        {done < MAX_INTERVIEWS ? (
          <PlateButton onClick={() => setDone((d) => d + 1)} icon={<Plus className="size-3.5" aria-hidden />}>
            Conduct the next interview
          </PlateButton>
        ) : (
          <PlateButton onClick={() => setDone(1)} icon={<RotateCcw className="size-3.5" aria-hidden />}>
            Start over
          </PlateButton>
        )}
        <Segmented
          label="Participants"
          value={sample}
          onChange={(v) => {
            setSample(v);
            setDone(6);
          }}
          options={[
            { id: "similar", label: "Similar" },
            { id: "diverse", label: "Diverse" },
          ]}
        />
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
   Trustworthiness of Qualitative Findings
   -------------------------------------------------------------------------- */

type Source = "interviews" | "observation" | "posts";
const SOURCES: { id: Source; label: string; key: string; Icon: typeof Eye }[] = [
  { id: "interviews", label: "Interviews", key: "INTERVIEWS", Icon: Microphone },
  { id: "observation", label: "Observation", key: "OBSERVATION", Icon: Eye },
  { id: "posts", label: "Online posts", key: "ONLINE POSTS", Icon: ChatsCircle },
];
/** Whether each source supports (true) or contradicts (false) each theme of a grocery study. */
const EVIDENCE: { theme: string; by: Record<Source, boolean> }[] = [
  { theme: "price vigilance", by: { interviews: true, observation: true, posts: true } },
  { theme: "loyalty to a usual brand", by: { interviews: true, observation: true, posts: true } },
  { theme: "concern about packaging", by: { interviews: true, observation: false, posts: true } },
];

/**
 * Trustworthiness: triangulation of three themes from a grocery shopping
 * study. Each column is a data source; a filled dot means the source
 * supports the theme, a cross that it contradicts it.
 *
 * Interactive: SOURCES adds or removes a source. From interviews alone,
 * every theme looks supported. Adding observation shows that shoppers who
 * speak about packaging waste do not act on it, and adding online posts,
 * which are also what people say, does not settle it. It opens on
 * interviews only.
 */
export function Triangulation() {
  const [on, setOn] = useState<Source[]>(["interviews"]);
  const cx = [222, 294, 362];
  const rowY = [110, 160, 210];
  const verdict = (by: Record<Source, boolean>) => {
    const used = on.map((id) => by[id]);
    if (used.some((v) => !v)) return { text: "NOT CORROBORATED", fill: COUNTER };
    if (used.length === 1) return { text: "ONE SOURCE ONLY", fill: INK3 };
    return { text: `CORROBORATED BY ${used.length} SOURCES`, fill: SIGNAL };
  };
  const summary = EVIDENCE.map((e) => `${e.theme}: ${verdict(e.by).text.toLowerCase()}`).join("; ");

  return (
    <>
      <Frame
        width={400}
        height={236}
        label={`Three themes from a grocery shopping study checked against ${on.length} data source${on.length > 1 ? "s" : ""} (${on.join(", ")}): ${summary}`}
      >
        {SOURCES.map((src, i) => {
          const active = on.includes(src.id);
          return (
            <g key={src.id} opacity={active ? 1 : 0.3}>
              <src.Icon x={cx[i] - 15} y={8} size={30} weight="regular" color={INK} />
              {src.key.split(" ").map((w, j, all) => (
                <Key key={w} x={cx[i]} y={r2(64 - (all.length - 1 - j) * 11)} anchor="middle" fill={INK3} size={8.5}>
                  {w}
                </Key>
              ))}
            </g>
          );
        })}
        <line x1={20} y1={78} x2={380} y2={78} stroke={RULE} strokeWidth={1} />

        {EVIDENCE.map((e, r) => {
          const v = verdict(e.by);
          const y = rowY[r];
          return (
            <g key={e.theme}>
              <Note x={20} y={y - 2} size={14} weight={600} fill={v.fill === COUNTER ? COUNTER : INK}>
                {e.theme}
              </Note>
              <Key x={20} y={y + 15} fill={v.fill} size={8.5}>
                {v.text}
              </Key>
              {SOURCES.map((src, i) => {
                const x = cx[i];
                if (!on.includes(src.id)) {
                  return <line key={src.id} x1={x - 5} y1={y} x2={x + 5} y2={y} stroke={RULE2} strokeWidth={1.5} />;
                }
                return e.by[src.id] ? (
                  <circle key={src.id} cx={x} cy={y} r={7} fill={SIGNAL} />
                ) : (
                  <path key={src.id} d={`M${x - 6} ${y - 6}L${x + 6} ${y + 6}M${x + 6} ${y - 6}L${x - 6} ${y + 6}`} stroke={COUNTER} strokeWidth={2.5} strokeLinecap="round" />
                );
              })}
            </g>
          );
        })}
      </Frame>
      <Toggles
        label="Sources"
        value={on}
        onChange={setOn}
        options={SOURCES.map(({ id, label }) => ({ id, label }))}
      />
    </>
  );
}

/* --------------------------------------------------------------------------
   Validating AI Coding Against Human Coders
   -------------------------------------------------------------------------- */

/**
 * Validating AI Coding: agreement on the same sample of segments. Two human
 * coders agree on 84%, the benchmark carried down as a dashed line. The AI
 * tool with its first instructions agrees with them on 67%, well short; after
 * the codebook and instructions are revised, on 81%, comparable to the
 * humans, so it may code the full dataset.
 */
export function AgreementCheck() {
  const x0 = 116;
  const x1 = 372;
  const X = (p: number) => r2(x0 + (p / 100) * (x1 - x0));
  const bench = 84;
  const rows = [
    { y: 62, value: 84, key: "HUMAN vs HUMAN", tone: INK, tint: PAPER3, ai: false },
    { y: 142, value: 67, key: "AI vs HUMANS · FIRST", tone: COUNTER, tint: COUNTER_TINT, ai: true },
    { y: 222, value: 81, key: "AI vs HUMANS · REVISED", tone: SIGNAL, tint: SIGNAL_TINT, ai: true },
  ];
  const bh = 26;
  return (
    <Frame
      width={400}
      height={278}
      label="Agreement on the same sample of coded segments: two human coders agree on 84 percent; the AI tool agrees with them on 67 percent with its first instructions, and on 81 percent after the codebook and instructions are revised, comparable to the human coders"
    >
      <Key x={x0} y={16} fill={INK3}>AGREEMENT</Key>

      {rows.map((r) => (
        <g key={r.key}>
          {r.ai ? <AiMark1 cx={44} cy={r.y + 2} s={26} fill={SIGNAL} /> : <Person1 x={44} y={r.y + 17} k={0.85} />}
          <Person1 x={80} y={r.y + 17} k={0.85} />
          <Key x={x0} y={r.y - bh / 2 - 8} fill={r.tone === INK ? INK3 : r.tone} size={9.5}>
            {r.key}
          </Key>
          <rect x={x0} y={r.y - bh / 2} width={r2(X(r.value) - x0)} height={bh} fill={r.tint} stroke={r.tone} strokeWidth={1.25} />
          <Display x={r2(X(r.value) - 8)} y={r.y + 8} anchor="end" fill={r.tone} size={20}>
            {`${r.value}%`}
          </Display>
        </g>
      ))}

      {/* the revision between the two AI runs */}
      <path d={`M62 168V196`} fill="none" stroke={INK3} strokeWidth={1.25} />
      <path d={head.down(62, 197, 6)} fill="none" stroke={INK3} strokeWidth={1.25} />
      <Key x={70} y={186} fill={INK3} size={9}>REVISE</Key>

      {/* the human benchmark, carried down to the AI rows */}
      <line x1={X(bench)} y1={62 + bh / 2} x2={X(bench)} y2={248} stroke={INK} strokeWidth={1.25} strokeDasharray="4 3" />
      <line x1={x0} y1={248} x2={x1} y2={248} stroke={INK} strokeWidth={1.25} />
      {[0, 50, 100].map((p) => (
        <g key={p}>
          <line x1={X(p)} y1={248} x2={X(p)} y2={253} stroke={INK} strokeWidth={1} />
          <Key x={X(p)} y={268} anchor="middle" fill={INK3} size={9.5}>{`${p}%`}</Key>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Netnography
   -------------------------------------------------------------------------- */

/** Customers at each level of satisfaction, and how many of them post in the online community. */
const SATISFACTION = [
  { all: 4, post: 3 },
  { all: 8, post: 1 },
  { all: 16, post: 1 },
  { all: 22, post: 2 },
  { all: 10, post: 5 },
];

/**
 * Netnography: sixty customers stacked by how satisfied they are, most of
 * them in the middle. The twelve who post in the online community, filled,
 * sit mostly at the two extremes: the conversation a netnographer reads is
 * not the customer base.
 */
export function CommunityVoices() {
  const colX = [80, 240, 400, 560, 720];
  const per = 6;
  const dx = 17;
  const dy = 24;
  const base = 128;
  return (
    <Frame
      width={800}
      height={176}
      label="Sixty customers stacked by satisfaction, from low to high, most of them in the middle. The twelve who post in the online community are filled; most of them are at the two extremes, very dissatisfied or very satisfied"
    >
      <Key x={20} y={16} fill={INK3}>CUSTOMERS</Key>
      <Key x={780} y={16} anchor="end" fill={COUNTER}>POST IN THE COMMUNITY: 12 OF 60</Key>
      {SATISFACTION.map((g, c) => (
        <g key={c}>
          {Array.from({ length: g.all }, (_, i) => {
            const col = i % per;
            const row = Math.floor(i / per);
            const poster = i < g.post;
            return (
              <Person1
                key={i}
                x={r2(colX[c] - ((per - 1) * dx) / 2 + col * dx)}
                y={base - row * dy}
                k={0.6}
                width={1.1}
                stroke={poster ? COUNTER : INK}
                fill={poster ? COUNTER : PAPER}
              />
            );
          })}
        </g>
      ))}
      <line x1={20} y1={base + 8} x2={772} y2={base + 8} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(780, base + 8, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      <Key x={20} y={base + 28} fill={INK3}>LOW</Key>
      <Key x={400} y={base + 28} anchor="middle" fill={INK3}>SATISFACTION</Key>
      <Key x={780} y={base + 28} anchor="end" fill={INK3}>HIGH</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Reasoning Traces as Verbal Protocols
   -------------------------------------------------------------------------- */

/**
 * A shopping agent's reasoning trace, coded like an interview transcript:
 * one segment states the objective the agent adopts, another expresses
 * skepticism toward a sponsored listing. The codes come from a codebook.
 */
export function CodedTrace() {
  const lines = [
    "The user asked for the best deal on",
    "coffee, so I will look for the lowest",
    "total price.",
    "Coffee A costs $4.99 and Coffee B",
    "costs $5.00.",
    "Coffee A is marked Sponsored, so its",
    "placement may have been paid for.",
  ];
  const top = 58;
  const lh = 22;
  const ly = (i: number) => top + i * lh;
  const segments = [
    { from: 0, to: 2, kind: "OBJECTIVE", code: "lowest total price" },
    { from: 5, to: 6, kind: "SKEPTICISM", code: "paid placement" },
  ];
  const sx = 12;
  const sw = 240;
  const tx = 272;
  return (
    <Frame
      width={400}
      height={212}
      label="A page of an AI agent's reasoning trace with two highlighted segments, coded from a codebook: the first states the objective, the lowest total price; the second expresses skepticism about a paid placement"
    >
      <rect x={sx} y={10} width={sw} height={192} fill={PAPER} stroke={RULE2} strokeWidth={1} />
      <AiMark1 cx={sx + 16} cy={27} s={14} fill={SIGNAL} />
      <Key x={sx + 30} y={31} fill={INK3} size={9}>REASONING TRACE</Key>
      {segments.map((g, i) => (
        <rect
          key={i}
          x={sx + 6}
          y={r2(ly(g.from) - 15)}
          width={sw - 12}
          height={r2((g.to - g.from + 1) * lh - 2)}
          fill={PAPER3}
        />
      ))}
      {lines.map((t, i) => (
        <Note key={i} x={sx + 12} y={ly(i)} size={12} fill={INK2}>
          {t}
        </Note>
      ))}
      {segments.map((g, i) => {
        const y0 = ly(g.from) - 15;
        const y1 = ly(g.to) + 5;
        const mid = r2((y0 + y1) / 2);
        return (
          <g key={i}>
            <path d={`M${sx + sw + 4} ${r2(y0 + 1)}H${sx + sw + 9}V${r2(y1 - 1)}H${sx + sw + 4}`} fill="none" stroke={INK} strokeWidth={1.5} />
            <line x1={sx + sw + 9} y1={mid} x2={tx - 4} y2={mid} stroke={INK} strokeWidth={1.25} />
            <Key x={tx} y={r2(mid - 6)} fill={INK3} size={9}>
              {g.kind}
            </Key>
            <Note x={tx} y={r2(mid + 10)} size={12} fill={INK} weight={600}>
              {g.code}
            </Note>
          </g>
        );
      })}
    </Frame>
  );
}
