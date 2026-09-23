/* ==========================================================================
   Consumer Behavior · Week 01 — figures
   --------------------------------------------------------------------------
   Hand-drawn SVG plates, one grammar per idea: a receipt, an iceberg, a
   chain, a cycle, a hand-off, two walks through the same shelf, a fan-in of
   forces, a branching need, a household, a sorted crowd, a colonnade, a
   marionette and a sign-up trap.

   Conventions, so the set reads as one system:
     · viewBox width 800 (or 400 for column plates), flat fills, hairlines
     · INK is the neutral case, SIGNAL the operative one, COUNTER the
       contrast (the other person, the other model, the other side)
     · one Person glyph for every human on every plate
     · labels reuse words from the slide the plate sits on
     · keys are set in the body grotesque, uppercase and tracked (no mono)
   ========================================================================== */

import React from "react";
import {
  SK,
  type Pt,
  seeded,
  wobble,
  blobPts,
  InkLine,
  PencilLine,
  Wash,
  Paper,
  SketchFrame,
  SketchText,
} from "../_sketch/sketch";

export const INK = "var(--ink)";
export const INK2 = "var(--ink-2)";
export const INK3 = "var(--ink-3)";
export const RULE = "var(--rule)";
export const RULE2 = "var(--rule-2)";
export const SIGNAL = "var(--signal)";
export const COUNTER = "var(--counter)";
export const PAPER = "var(--paper)";
export const PAPER2 = "var(--paper-2)";
export const SIGNAL_TINT = "rgba(192, 74, 38, 0.10)";
export const COUNTER_TINT = "rgba(30, 78, 82, 0.10)";

const LABEL = "var(--font-label)";
const BODY = "var(--font-body)";
const SERIF = "var(--font-heading)";

/* -- typographic helpers ------------------------------------------------- */

type Anchor = "start" | "middle" | "end";

export function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 10.5,
  weight = 600,
  transform,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
  weight?: number;
  transform?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={LABEL}
      fontSize={size}
      fontWeight={weight}
      letterSpacing="0.14em"
      fill={fill}
      transform={transform}
    >
      {children}
    </text>
  );
}

export function Note({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 13,
  italic = false,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
  italic?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={BODY}
      fontSize={size}
      fontStyle={italic ? "italic" : undefined}
      fill={fill}
    >
      {children}
    </text>
  );
}

export function Display({
  x,
  y,
  children,
  anchor = "start",
  fill = INK,
  size = 28,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: Anchor;
  fill?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={SERIF}
      fontSize={size}
      fontWeight={500}
      fill={fill}
    >
      {children}
    </text>
  );
}

export function Frame({
  height,
  label,
  children,
  width = 800,
}: {
  height: number;
  label: string;
  children: React.ReactNode;
  width?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="block h-auto w-full"
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Open arrowhead pointing along (dx, dy), tip at (x, y). */
function headAlong(x: number, y: number, dx: number, dy: number, s = 8) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * s;
  const by = y - uy * s;
  const px = -uy * (s * 0.62);
  const py = ux * (s * 0.62);
  return `M${r2(bx + px)} ${r2(by + py)}L${r2(x)} ${r2(y)}L${r2(bx - px)} ${r2(by - py)}`;
}

/** Straight arrow with an open head. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  stroke = INK,
  width = 1.5,
  dash,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  width?: number;
  dash?: string;
}) {
  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dash} />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1)} />
    </g>
  );
}

/* -- the cast ------------------------------------------------------------ */

/**
 * One person. (x, y) is the point between the feet; `s` scales the figure
 * (s = 1 is 64 units tall). `head` enlarges the head for a child or a baby.
 */
export function Person({
  x,
  y,
  s = 1,
  fill = INK,
  head = 1,
  opacity,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
  head?: number;
  opacity?: number;
}) {
  const w = 13 * s;
  const shoulder = y - 33 * s;
  const hr = 8 * s * head;
  const hy = y - 46 * s - 3 * s - hr;
  return (
    <g fill={fill} opacity={opacity}>
      <path
        d={`M${r2(x - w)} ${r2(y)}V${r2(shoulder)}A${r2(w)} ${r2(w)} 0 0 1 ${r2(x + w)} ${r2(shoulder)}V${r2(y)}Z`}
      />
      <circle cx={r2(x)} cy={r2(hy)} r={r2(hr)} />
    </g>
  );
}

/** Magnifying glass, centred on its lens. */
function Magnifier({
  x,
  y,
  r = 16,
  stroke = INK,
}: {
  x: number;
  y: number;
  r?: number;
  stroke?: string;
}) {
  const d = r * 0.707;
  return (
    <g fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="round">
      <circle cx={x} cy={y} r={r} />
      <line
        x1={r2(x + d)}
        y1={r2(y + d)}
        x2={r2(x + d + r * 0.8)}
        y2={r2(y + d + r * 0.8)}
        strokeWidth={4.5}
      />
    </g>
  );
}

/** Shopping bag with two handles. */
function Bag({
  x,
  y,
  w = 40,
  stroke = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  w?: number;
  stroke?: string;
  fill?: string;
}) {
  const h = w * 0.95;
  return (
    <g stroke={stroke} strokeWidth={2.2} strokeLinejoin="round">
      <path
        d={`M${x - w / 2} ${y - h / 2}H${x + w / 2}L${x + w / 2 + 3} ${y + h / 2}H${x - w / 2 - 3}Z`}
        fill={fill}
      />
      <path
        d={`M${x - w * 0.22} ${y - h / 2}V${y - h / 2 - 6}A${w * 0.22} ${w * 0.22} 0 0 1 ${x + w * 0.22} ${y - h / 2 - 6}V${y - h / 2}`}
        fill="none"
      />
    </g>
  );
}

function starPath(cx: number, cy: number, R: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? R : R * 0.45;
    pts.push(`${r2(cx + rr * Math.cos(a))} ${r2(cy + rr * Math.sin(a))}`);
  }
  return `M${pts.join("L")}Z`;
}

function Star({
  x,
  y,
  R = 10,
  fill = SIGNAL,
  stroke,
}: {
  x: number;
  y: number;
  R?: number;
  fill?: string;
  stroke?: string;
}) {
  return (
    <path
      d={starPath(x, y, R)}
      fill={fill}
      stroke={stroke ?? fill}
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  );
}

function Heart({
  x,
  y,
  s = 1,
  fill = SIGNAL,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
}) {
  // (x, y) is the centre; 24 units wide at s = 1.
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 9C-4 5-12 1-12-5A6 6 0 0 1 0-8A6 6 0 0 1 12-5C12 1 4 5 0 9Z"
      fill={fill}
    />
  );
}

/** An eye: the marketer watching. */
function Eye({
  x,
  y,
  w = 30,
  stroke = COUNTER,
}: {
  x: number;
  y: number;
  w?: number;
  stroke?: string;
}) {
  const h = w * 0.36;
  return (
    <g fill="none" stroke={stroke} strokeWidth={2} strokeLinejoin="round">
      <path
        d={`M${x - w / 2} ${y}Q${x} ${y - h * 2} ${x + w / 2} ${y}Q${x} ${y + h * 2} ${x - w / 2} ${y}Z`}
      />
      <circle cx={x} cy={y} r={h * 0.8} fill={stroke} stroke="none" />
    </g>
  );
}

/** A plain product carton. */
function Box({
  x,
  y,
  w = 34,
  h = 30,
  stroke = INK,
  fill = PAPER,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  stroke?: string;
  fill?: string;
}) {
  return (
    <g stroke={stroke} strokeWidth={1.8} strokeLinejoin="round">
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={3}
        fill={fill}
      />
      <line
        x1={x - w / 2}
        y1={y - h / 2 + 9}
        x2={x + w / 2}
        y2={y - h / 2 + 9}
      />
    </g>
  );
}

/* ==========================================================================
   TITLE · a receipt that did not sell a product
   Drawn in the editorial-sketch style: wobbly doubled ink, loose watercolour
   washes set off-register, and faint dashed pencil for what was not bought.
   ========================================================================== */

export function Receipt() {
  const W = 420;
  const H = 500;
  const left = 70;
  const right = 350;
  const top = 34;
  const bottom = 446;
  const teeth = 14;
  const step = (right - left) / teeth;
  const outline: Pt[] = [
    [left, top],
    [right, top],
    [right, bottom],
  ];
  for (let i = 0; i < teeth; i++) {
    const x0 = right - i * step;
    outline.push([x0 - step / 2, bottom - 9], [x0 - step, bottom]);
  }
  const rnd = seeded(41);
  const bars = Array.from({ length: 16 }, () => 1 + Math.round(rnd() * 3));
  let bx = 102;
  const items = ["FEELINGS", "PROBLEMS", "SOCIAL NEEDS"];
  // a ragged brushstroke patch, behind the receipt
  const blob = blobPts(206, 236, 180, 186, 41);
  return (
    <SketchFrame
      id="sk-receipt"
      width={W}
      height={H}
      label="A sketched till receipt: the line for a product is struck through, and the lines bought are feelings, problems and social needs, each ticked."
    >
      {/* one pale blush wash behind the subject */}
      <Wash seed={5} fill={SK.blush} opacity={0.55} dx={0} dy={0} pts={blob} />

      {/* a few scratchy strokes and an earth wash for the ground */}
      <Wash
        seed={9}
        fill={SK.earth}
        opacity={0.5}
        dx={0}
        dy={0}
        pts={[
          [90, 468],
          [210, 460],
          [340, 466],
          [320, 480],
          [180, 482],
          [104, 478],
        ]}
      />
      <InkLine
        pts={[
          [82, 470],
          [168, 466],
        ]}
        seed={11}
        width={0.9}
      />
      <InkLine
        pts={[
          [196, 472],
          [320, 468],
        ]}
        seed={12}
        width={0.9}
      />
      <InkLine
        pts={[
          [256, 478],
          [354, 475],
        ]}
        seed={13}
        width={0.8}
      />

      {/* the receipt: cream paper with a faint grain, then its ink edge */}
      <Paper pts={outline} seed={21} />
      <InkLine pts={outline} seed={22} amp={1.3} closed />

      <g transform="translate(20 0)">
        <SketchText x={190} y={84} anchor="middle" size={26} serif>
          Receipt
        </SketchText>
        <PencilLine
          pts={[
            [74, 104],
            [306, 104],
          ]}
          seed={31}
        />

        {/* the line people expect: left in pencil, then struck out in ink */}
        <SketchText x={74} y={142} fill={SK.pencil}>
          PRODUCT
        </SketchText>
        <InkLine
          pts={[
            [66, 137],
            [314, 135],
          ]}
          seed={33}
          width={1.6}
        />
        <InkLine
          pts={[
            [294, 128],
            [306, 141],
          ]}
          seed={34}
          width={1.3}
          amp={0.4}
        />
        <InkLine
          pts={[
            [306, 128],
            [293, 141],
          ]}
          seed={35}
          width={1.3}
          amp={0.4}
        />

        {/* what was actually bought, each with a teal tick */}
        {items.map((t, i) => {
          const y = 192 + i * 44;
          const lx = 74 + t.length * 11.2 + 10;
          return (
            <g key={t}>
              <SketchText x={74} y={y}>
                {t}
              </SketchText>
              <PencilLine
                pts={[
                  [lx, y - 3],
                  [270, y - 3],
                ]}
                seed={40 + i}
                width={1.3}
                dash="1 5"
              />
              <path
                d={wobble(
                  [
                    [283, y - 7],
                    [290, y + 1],
                    [305, y - 15],
                  ],
                  50 + i,
                  0.6,
                  6,
                )}
                fill="none"
                stroke={SK.teal}
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        <PencilLine
          pts={[
            [74, 312],
            [306, 312],
          ]}
          seed={61}
        />
        <SketchText x={74} y={342} size={12}>
          SOLUTIONS
        </SketchText>
        <Wash
          seed={63}
          fill={SK.ochre}
          opacity={0.55}
          dx={1}
          dy={-1}
          pts={[
            [288, 324],
            [308, 322],
            [312, 344],
            [290, 348],
          ]}
        />
        <SketchText x={306} y={342} anchor="end" size={12}>
          3
        </SketchText>

        {/* a quick barcode: a handful of loose strokes */}
        {bars.map((b, i) => {
          const x = bx;
          bx += b * 2.4 + 6;
          return (
            <path
              key={i}
              d={wobble(
                [
                  [x, 370],
                  [x + 0.6, 414],
                ],
                70 + i,
                0.5,
                12,
              )}
              fill="none"
              stroke={SK.ink}
              strokeWidth={b * 1.1}
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}
      </g>
    </SketchFrame>
  );
}

/* ==========================================================================
   TIP OF THE ICEBERG
   ========================================================================== */

export function Iceberg() {
  const water = 150;
  const tip = "M352 150L371 122L384 96L398 62L409 84L418 92L432 120L450 150Z";
  const facet = "M398 62L392 112L371 150H352L371 122L384 96Z";
  const mass =
    "M352 150L302 160L258 182L226 200L200 232L166 256L152 294L134 328L158 362L184 392L234 404L288 426L350 430L408 446L468 432L528 428L582 404L624 384L650 348L676 318L664 280L648 248L616 218L584 198L540 178L494 160L450 150Z";
  const shade =
    "M408 446L468 432L528 428L582 404L624 384L650 348L676 318L664 280L648 248L616 218L620 262L596 318L548 372L476 412Z";
  const waves = [60, 130, 200, 530, 600, 670, 740];
  return (
    <Frame
      height={460}
      label="An iceberg. Above the waterline, a small tip marked just shopping. Below it, a far larger mass: before the sale, noticing problems, searching options and asking friends; after the sale, using the item, feeling happy or regretful and telling others. A bracket down the whole iceberg reads consumer behavior."
    >
      {/* water */}
      <rect x={20} y={water} width={740} height={300} fill={COUNTER_TINT} />
      <line
        x1={20}
        y1={water}
        x2={760}
        y2={water}
        stroke={COUNTER}
        strokeWidth={1.5}
      />
      {waves.map((x) => (
        <path
          key={x}
          d={`M${x} ${water - 8}q8 -6 16 0t16 0`}
          fill="none"
          stroke={COUNTER}
          strokeWidth={1.2}
          opacity={0.6}
        />
      ))}

      {/* underwater mass and the tip */}
      <path
        d={mass}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d={shade} fill={COUNTER_TINT} />
      <path
        d={mass}
        fill="none"
        stroke={INK}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path
        d={tip}
        fill={SIGNAL}
        stroke={SIGNAL}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d={facet} fill="var(--signal-deep)" />
      <line
        x1={401}
        y1={168}
        x2={401}
        y2={416}
        stroke={RULE2}
        strokeDasharray="3 5"
      />

      {/* what most people see */}
      <line x1={296} y1={96} x2={378} y2={108} stroke={INK3} />
      <Key x={290} y={92} anchor="end" fill={SIGNAL}>
        JUST SHOPPING
      </Key>
      <Note x={290} y={112} anchor="end" fill={INK3} size={12}>
        one second at the register
      </Note>

      {/* before */}
      <Key x={206} y={256} fill={INK}>
        BEFORE
      </Key>
      {["noticing problems", "searching options", "asking friends"].map(
        (t, i) => (
          <Note key={t} x={206} y={286 + i * 24}>
            {t}
          </Note>
        ),
      )}

      {/* after */}
      <Key x={430} y={256} fill={INK}>
        AFTER
      </Key>
      {["use the item", "feel happy or regretful", "tell others"].map(
        (t, i) => (
          <Note key={t} x={430} y={286 + i * 24}>
            {t}
          </Note>
        ),
      )}

      {/* the whole chain */}
      <path
        d="M724 64H736V438H724"
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
      />
      <Key
        x={0}
        y={0}
        fill={INK}
        transform="translate(756 251) rotate(90)"
        anchor="middle"
      >
        CONSUMER BEHAVIOR
      </Key>
    </Frame>
  );
}

/** A long chain with one link lit: the second at the register. */
export function OneSecondChain() {
  const links = 11;
  const lit = 5;
  const gap = 36;
  const x0 = 200 - lit * gap;
  return (
    <Frame
      width={400}
      height={170}
      label="A long chain of links running off both edges; one link in the middle is lit and marked one second."
    >
      <Key x={200} y={40} anchor="middle" fill={SIGNAL}>
        THE REGISTER
      </Key>
      <line
        x1={200}
        y1={48}
        x2={200}
        y2={68}
        stroke={SIGNAL}
        strokeWidth={1.2}
      />
      {Array.from({ length: links }, (_, i) => {
        const cx = x0 + i * gap;
        const on = i === lit;
        const fade = Math.max(0.18, 1 - Math.abs(i - lit) * 0.16);
        const stroke = on ? SIGNAL : INK;
        return i % 2 === 1 ? (
          <ellipse
            key={i}
            cx={cx}
            cy={95}
            rx={24}
            ry={14}
            fill="none"
            stroke={stroke}
            strokeWidth={on ? 4 : 3}
            opacity={on ? 1 : fade}
          />
        ) : (
          <rect
            key={i}
            x={cx - 24}
            y={91}
            width={48}
            height={8}
            rx={4}
            fill="none"
            stroke={stroke}
            strokeWidth={on ? 4 : 3}
            opacity={on ? 1 : fade}
          />
        );
      })}
      <Key x={200} y={140} anchor="middle" fill={INK}>
        ONE SECOND
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   THREE STAGES OF CONSUMPTION
   ========================================================================== */

const STAGES = ["Prepurchase", "Purchase", "Postpurchase"];

function StageGlyph({
  stage,
  x,
  y,
  tone = INK,
}: {
  stage: number;
  x: number;
  y: number;
  tone?: string;
}) {
  if (stage === 0)
    return <Magnifier x={x - 4} y={y - 4} r={17} stroke={tone} />;
  if (stage === 1) return <Bag x={x} y={y + 4} w={40} stroke={tone} />;
  return (
    <g>
      {[-22, 0, 22].map((dx, i) => (
        <Star
          key={dx}
          x={x + dx}
          y={y}
          R={10}
          fill={i < 2 ? tone : "none"}
          stroke={tone}
        />
      ))}
    </g>
  );
}

export function ConsumptionCycle() {
  const xs = [150, 400, 650];
  const cy = 158;
  const R = 56;
  return (
    <Frame
      height={320}
      label="Three stages in a loop: Stage 1 Prepurchase (a magnifying glass), Stage 2 Purchase (a shopping bag), Stage 3 Postpurchase (a star rating). An arrow from Postpurchase curves back to Prepurchase, marked repeat purchases."
    >
      {xs.map((x, i) => (
        <g key={x}>
          <Key x={x} y={40} anchor="middle" fill={SIGNAL}>
            {`STAGE ${i + 1}`}
          </Key>
          <Display x={x} y={74} anchor="middle" size={24}>
            {STAGES[i]}
          </Display>
          <circle
            cx={x}
            cy={cy}
            r={R}
            fill={PAPER}
            stroke={INK}
            strokeWidth={1.6}
          />
          <StageGlyph stage={i} x={x} y={cy} />
        </g>
      ))}
      <Arrow x1={214} y1={cy} x2={334} y2={cy} />
      <Arrow x1={464} y1={cy} x2={584} y2={cy} />
      {/* the loop back */}
      <path
        d={`M650 ${cy + R + 6}C650 312 150 312 150 ${cy + R + 10}`}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
        strokeDasharray="5 5"
      />
      <path
        d={headAlong(150, cy + R + 8, 0, -1)}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Key x={400} y={264} anchor="middle" fill={COUNTER}>
        REPEAT PURCHASES
      </Key>
    </Frame>
  );
}

/** Row markers for the stage table: the consumer and the marketer. */
export function ConsumerMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
      <Person x={20} y={38} s={0.56} fill={SIGNAL} />
    </svg>
  );
}

export function MarketerMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
      <Eye x={20} y={20} w={32} />
    </svg>
  );
}

/* ==========================================================================
   CONSUMERS VERSUS CUSTOMERS
   ========================================================================== */

function Jar({ x, y }: { x: number; y: number }) {
  // (x, y) is the centre of the jar.
  return (
    <g>
      <rect x={x - 22} y={y - 46} width={44} height={13} rx={3} fill={INK} />
      <rect
        x={x - 28}
        y={y - 33}
        width={56}
        height={78}
        rx={12}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.8}
      />
      <rect
        x={x - 28}
        y={y - 12}
        width={56}
        height={30}
        fill={SIGNAL_TINT}
        stroke={INK}
        strokeWidth={1.2}
      />
      <circle
        cx={x}
        cy={y + 3}
        r={8}
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
      />
      <circle cx={x - 3} cy={y + 1} r={1.4} fill={INK} />
      <circle cx={x + 3} cy={y + 1} r={1.4} fill={INK} />
    </g>
  );
}

export function BuysUses() {
  const base = 256;
  return (
    <Frame
      height={250}
      label="A parent pays for a jar of baby food: the customer, who buys it and weighs price and nutrition. A baby in a high chair eats it: the consumer, who uses it and cares about taste and texture."
    >
      <g transform="translate(0 -84)">
        {/* the parent: customer */}
        <Person x={170} y={base} s={1.55} fill={SIGNAL} />
        <rect
          x={196}
          y={176}
          width={34}
          height={22}
          rx={3}
          fill={PAPER}
          stroke={SIGNAL}
          strokeWidth={1.8}
        />
        <line
          x1={196}
          y1={184}
          x2={230}
          y2={184}
          stroke={SIGNAL}
          strokeWidth={3}
        />

        {/* the jar */}
        <Jar x={400} y={176} />
        <Arrow x1={248} y1={186} x2={352} y2={186} stroke={SIGNAL} />
        <Key x={300} y={172} anchor="middle" fill={SIGNAL}>
          BUYS
        </Key>
        <Arrow x1={448} y1={186} x2={560} y2={186} stroke={COUNTER} />
        <Key x={504} y={172} anchor="middle" fill={COUNTER}>
          USES
        </Key>

        {/* the baby in a high chair: consumer */}
        <g
          stroke={COUNTER}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M612 206H664V140" />
          <path d="M620 206L604 256M656 206L672 256M611 234H665" />
          <path d="M588 182H622V206" />
        </g>
        <Person x={638} y={206} s={0.74} head={1.35} fill={COUNTER} />
        <path d="M594 182A10 8 0 0 0 614 182Z" fill={COUNTER} />
        <line
          x1={608}
          y1={176}
          x2={624}
          y2={160}
          stroke={COUNTER}
          strokeWidth={2.2}
          strokeLinecap="round"
        />

        <line x1={80} y1={base} x2={720} y2={base} stroke={RULE2} />

        <Key x={170} y={290} anchor="middle" fill={SIGNAL} size={12}>
          CUSTOMER
        </Key>
        <Note x={170} y={312} anchor="middle" fill={INK3}>
          price · nutrition
        </Note>
        <Key x={632} y={290} anchor="middle" fill={COUNTER} size={12}>
          CONSUMER
        </Key>
        <Note x={632} y={312} anchor="middle" fill={INK3}>
          taste · texture
        </Note>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   WHY CONSUMERS ARE NOT CALCULATORS
   ========================================================================== */

const SHELF_COLS = 4;
const SHELF_ROWS = 3;
function shelfPos(i: number) {
  const c = i % SHELF_COLS;
  const r = Math.floor(i / SHELF_COLS);
  return { x: 150 + c * 62, y: 70 + r * 62 };
}

function Shelf({
  faded = false,
  lit,
  picked,
}: {
  faded?: boolean;
  lit?: number;
  picked?: number;
}) {
  return (
    <g>
      {Array.from({ length: SHELF_COLS * SHELF_ROWS }, (_, i) => {
        const { x, y } = shelfPos(i);
        const on = i === lit || i === picked;
        return (
          <rect
            key={i}
            x={x - 20}
            y={y - 20}
            width={40}
            height={40}
            rx={4}
            fill={on ? SIGNAL : PAPER}
            stroke={on ? SIGNAL : INK}
            strokeWidth={1.5}
            opacity={faded && !on ? 0.35 : 1}
          />
        );
      })}
    </g>
  );
}

/** The old model: visit every option, score it, take the best. */
export function CalculatorWalk() {
  // serpentine order through the 3 × 4 shelf
  const order = [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11];
  const best = 10;
  const pts = order.map((i) => shelfPos(i));
  const d = `M60 132L${pts.map((p) => `${p.x} ${p.y}`).join("L")}`;
  return (
    <Frame
      width={400}
      height={300}
      label="The old model: a buyer walks a path that visits every one of twelve options on a shelf in turn, then takes the single best one."
    >
      <Person x={60} y={186} s={0.8} fill={COUNTER} />
      <Shelf lit={best} />
      <path
        d={d}
        fill="none"
        stroke={COUNTER}
        strokeWidth={1.6}
        strokeDasharray="4 4"
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={COUNTER} />
      ))}
      <Star x={shelfPos(best).x} y={shelfPos(best).y} R={9} fill={PAPER} />
      <Key x={20} y={260} fill={COUNTER}>
        COMPARE ALL · CALCULATE · PICK THE BEST
      </Key>
      <Note x={20} y={282} fill={INK3} size={12}>
        every option, every cost
      </Note>
    </Frame>
  );
}

function Clock({
  x,
  y,
  r = 13,
  stroke = INK,
}: {
  x: number;
  y: number;
  r?: number;
  stroke?: string;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round">
      <circle cx={x} cy={y} r={r} />
      <path d={`M${x} ${y - r * 0.6}V${y}L${x + r * 0.45} ${y + r * 0.3}`} />
    </g>
  );
}

function Battery({
  x,
  y,
  stroke = INK,
  level = 0.2,
}: {
  x: number;
  y: number;
  stroke?: string;
  level?: number;
}) {
  return (
    <g>
      <rect
        x={x - 16}
        y={y - 9}
        width={30}
        height={18}
        rx={3}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
      />
      <rect x={x + 15} y={y - 4} width={3} height={8} rx={1} fill={stroke} />
      <rect
        x={x - 13}
        y={y - 6}
        width={24 * level}
        height={12}
        rx={1.5}
        fill={SIGNAL}
      />
    </g>
  );
}

/** Real people: short of time and energy, one shortcut to a familiar pick. */
export function ShortcutWalk() {
  const pick = 4;
  const p = shelfPos(pick);
  return (
    <Frame
      width={400}
      height={300}
      label="Real people: the same shelf of twelve options, mostly unvisited. A buyer short of time (a clock) and energy (a low battery) takes one short curved shortcut straight to a single option."
    >
      <Shelf faded picked={pick} />
      <Person x={60} y={186} s={0.8} fill={SIGNAL} />
      <Clock x={34} y={82} />
      <Battery x={80} y={82} />
      <path
        d={`M82 150Q106 ${p.y + 6} ${p.x - 26} ${p.y + 2}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <path
        d={headAlong(p.x - 24, p.y + 2, 1, -0.05)}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Key x={20} y={260} fill={SIGNAL}>
        LIMITED TIME · LIMITED ENERGY
      </Key>
      <Note x={20} y={282} fill={INK3} size={12}>
        a mental shortcut
      </Note>
    </Frame>
  );
}

function Face({
  x,
  y,
  r = 20,
  stroke = INK,
}: {
  x: number;
  y: number;
  r?: number;
  stroke?: string;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round">
      <circle cx={x} cy={y} r={r} />
      <circle cx={x - r * 0.35} cy={y - r * 0.2} r={1.6} fill={stroke} />
      <circle cx={x + r * 0.35} cy={y - r * 0.2} r={1.6} fill={stroke} />
      <path
        d={`M${x - r * 0.45} ${y + r * 0.3}Q${x - r * 0.2} ${y + r * 0.1} ${x} ${y + r * 0.32}T${x + r * 0.45} ${y + r * 0.3}`}
      />
    </g>
  );
}

function Loop({
  x,
  y,
  r = 18,
  stroke = INK,
}: {
  x: number;
  y: number;
  r?: number;
  stroke?: string;
}) {
  // three quarters of a circle, arrowhead at the open end
  const ex = x + r;
  const ey = y;
  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={`M${x} ${y - r}A${r} ${r} 0 1 0 ${ex} ${ey}`} />
      <path d={headAlong(x + 1, y - r, 1, 0.02, 7)} transform={`rotate(0)`} />
    </g>
  );
}

/** Mood, habits, brand loyalty and social pressure all pull on one choice. */
export function FourPulls() {
  const src = [
    { x: 130, label: "MOOD" },
    { x: 310, label: "HABITS" },
    { x: 490, label: "BRAND LOYALTY" },
    { x: 670, label: "SOCIAL PRESSURE" },
  ];
  const gy = 60;
  const target = { x: 400, y: 212 };
  return (
    <Frame
      height={320}
      label="Four forces, each an arrow converging on one person's decision: mood (a face), habits (a looping arrow), brand loyalty (a heart) and social pressure (a small crowd)."
    >
      <Face x={130} y={gy} />
      <Loop x={310} y={gy} />
      <Heart x={490} y={gy + 1} s={1.5} />
      <g>
        <Person x={650} y={gy + 22} s={0.55} fill={INK} />
        <Person x={690} y={gy + 22} s={0.55} fill={INK} />
        <Person x={670} y={gy + 26} s={0.65} fill={INK} />
      </g>
      {src.map((s) => (
        <Key key={s.label} x={s.x} y={112} anchor="middle" fill={INK}>
          {s.label}
        </Key>
      ))}
      {src.map((s) => {
        const tx = target.x + (s.x - target.x) * 0.16;
        return (
          <Arrow
            key={s.label}
            x1={s.x + (target.x - s.x) * 0.1}
            y1={128}
            x2={tx}
            y2={target.y - 14}
            stroke={SIGNAL}
          />
        );
      })}
      <Person x={400} y={300} s={1.2} fill={INK} />
    </Frame>
  );
}

/** A calculator whose display reads ERROR. */
export function CalculatorError() {
  return (
    <Frame
      width={400}
      height={300}
      label="A pocket calculator whose display reads ERROR."
    >
      <rect
        x={120}
        y={20}
        width={160}
        height={260}
        rx={16}
        fill={PAPER}
        stroke={INK}
        strokeWidth={2}
      />
      <rect
        x={138}
        y={40}
        width={124}
        height={50}
        rx={4}
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.5}
      />
      <Key x={250} y={74} anchor="end" fill={SIGNAL} size={20} weight={700}>
        ERROR
      </Key>
      {Array.from({ length: 16 }, (_, i) => {
        const c = i % 4;
        const r = Math.floor(i / 4);
        return (
          <rect
            key={i}
            x={140 + c * 31}
            y={108 + r * 40}
            width={24}
            height={30}
            rx={4}
            fill={c === 3 ? INK : PAPER2}
            stroke={INK}
            strokeWidth={1.2}
          />
        );
      })}
    </Frame>
  );
}

/* ==========================================================================
   NEEDS VERSUS WANTS
   ========================================================================== */

function Glass({ x, y }: { x: number; y: number }) {
  // (x, y) is the base centre
  return (
    <g>
      <path
        d={`M${x - 16} ${y - 58}L${x - 12} ${y}H${x + 12}L${x + 16} ${y - 58}Z`}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <path
        d={`M${x - 14.5} ${y - 38}L${x - 12} ${y}H${x + 12}L${x + 14.5} ${y - 38}Z`}
        fill={COUNTER_TINT}
      />
      <line
        x1={x - 14.5}
        y1={y - 38}
        x2={x + 14.5}
        y2={y - 38}
        stroke={COUNTER}
        strokeWidth={1.4}
      />
    </g>
  );
}

function Can({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 16} y={y - 58} width={32} height={58} rx={5} fill={SIGNAL} />
      <rect x={x - 13} y={y - 62} width={26} height={6} rx={2} fill={INK} />
      <path
        d={`M${x - 16} ${y - 36}Q${x} ${y - 26} ${x + 16} ${y - 36}`}
        fill="none"
        stroke={PAPER}
        strokeWidth={2.5}
      />
    </g>
  );
}

function Cup({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M${x - 24} ${y - 40}H${x + 18}V${y - 16}A16 16 0 0 1 ${x + 2} ${y}H${x - 8}A16 16 0 0 1 ${x - 24} ${y - 16}Z`}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.8}
      />
      <path
        d={`M${x + 18} ${y - 34}A10 10 0 0 1 ${x + 18} ${y - 14}`}
        fill="none"
        stroke={INK}
        strokeWidth={1.8}
      />
      <line
        x1={x - 34}
        y1={y + 3}
        x2={x + 28}
        y2={y + 3}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      {[-12, 0, 12].map((dx) => (
        <path
          key={dx}
          d={`M${x - 3 + dx} ${y - 48}q-5 -8 0 -14t0 -14`}
          fill="none"
          stroke={SIGNAL}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

export function NeedWantTrio() {
  const needs = ["THIRST", "HUNGER", "SHELTER", "BELONGING"];
  const pillY = (i: number) => 96 + i * 56;
  const tY = pillY(0);
  const mtl = 110;
  const other = 280;
  return (
    <Frame
      height={350}
      label="Needs on the left: thirst, hunger, shelter and belonging. Thirst branches into two wants: in Montreal, cold tap water or a soda; in another country, hot tea."
    >
      <Key x={40} y={34} fill={INK} size={12}>
        NEEDS
      </Key>
      <Note x={40} y={56} fill={INK3} size={12}>
        exist before marketing
      </Note>
      <Key x={320} y={34} fill={SIGNAL} size={12}>
        WANTS
      </Key>
      <Note x={320} y={56} fill={INK3} size={12}>
        shaped by culture and personality
      </Note>
      <line
        x1={286}
        y1={24}
        x2={286}
        y2={330}
        stroke={RULE2}
        strokeDasharray="3 5"
      />

      {needs.map((n, i) => (
        <g key={n} opacity={i === 0 ? 1 : 0.45}>
          <rect
            x={40}
            y={pillY(i) - 20}
            width={170}
            height={40}
            rx={20}
            fill={i === 0 ? INK : PAPER}
            stroke={INK}
            strokeWidth={1.4}
          />
          <Key
            x={125}
            y={pillY(i) + 4}
            anchor="middle"
            fill={i === 0 ? PAPER : INK}
          >
            {n}
          </Key>
        </g>
      ))}

      {/* thirst branches */}
      <path
        d={`M210 ${tY}C260 ${tY} 270 ${mtl} 320 ${mtl}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.8}
      />
      <path
        d={`M210 ${tY}C270 ${tY} 250 ${other} 320 ${other}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.8}
      />
      <circle cx={320} cy={mtl} r={4} fill={SIGNAL} />
      <circle cx={320} cy={other} r={4} fill={SIGNAL} />
      <Key x={334} y={mtl + 4} fill={INK}>
        MONTREAL
      </Key>
      <Key x={334} y={other + 4} fill={INK}>
        ANOTHER COUNTRY
      </Key>

      <Glass x={540} y={mtl + 24} />
      <Note x={540} y={mtl + 50} anchor="middle" fill={INK3} size={12}>
        cold tap water
      </Note>
      <Can x={660} y={mtl + 24} />
      <Note x={660} y={mtl + 50} anchor="middle" fill={INK3} size={12}>
        soda
      </Note>
      <Cup x={600} y={other + 22} />
      <Note x={600} y={other + 48} anchor="middle" fill={INK3} size={12}>
        hot tea
      </Note>
    </Frame>
  );
}

/* ==========================================================================
   THE MANY ROLES ONE PERSON PLAYS
   ========================================================================== */

function Bubble({
  x,
  y,
  w = 44,
  h = 30,
  stroke = SIGNAL,
  tailLeft = true,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  stroke?: string;
  tailLeft?: boolean;
}) {
  // (x, y) is the bubble centre; the tail points down toward the speaker
  const tx = tailLeft ? x - w * 0.2 : x + w * 0.2;
  const dir = tailLeft ? -1 : 1;
  return (
    <path
      d={`M${x - w / 2 + 8} ${y - h / 2}H${x + w / 2 - 8}Q${x + w / 2} ${y - h / 2} ${x + w / 2} ${y - h / 2 + 8}V${y + h / 2 - 8}Q${x + w / 2} ${y + h / 2} ${x + w / 2 - 8} ${y + h / 2}H${tx + 6}L${tx + dir * 8} ${y + h / 2 + 10}L${tx - 4} ${y + h / 2}H${x - w / 2 + 8}Q${x - w / 2} ${y + h / 2} ${x - w / 2} ${y + h / 2 - 8}V${y - h / 2 + 8}Q${x - w / 2} ${y - h / 2} ${x - w / 2 + 8} ${y - h / 2}Z`}
      fill={PAPER}
      stroke={stroke}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  );
}

/** One glyph per role: the same person, a different prop. */
export function RoleGlyph({ role }: { role: 0 | 1 | 2 | 3 }) {
  const labels = [
    "A person with an exclamation mark: noticing the problem first.",
    "A person speaking, a speech bubble aimed at someone else.",
    "A person handing over a payment card.",
    "A person holding and using the product.",
  ];
  return (
    <svg
      viewBox="0 0 160 120"
      className="block h-auto w-full max-w-[180px]"
      role="img"
      aria-label={labels[role]}
    >
      <title>{labels[role]}</title>
      <line x1={10} y1={112} x2={150} y2={112} stroke={RULE2} />
      <Person x={role === 1 ? 56 : 70} y={112} s={1.2} fill={INK} />
      {role === 0 ? (
        <g>
          <Bubble x={112} y={32} w={36} h={34} />
          <line
            x1={112}
            y1={22}
            x2={112}
            y2={36}
            stroke={SIGNAL}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={112} cy={43} r={2} fill={SIGNAL} />
        </g>
      ) : null}
      {role === 1 ? (
        <g>
          <Bubble x={100} y={30} w={48} h={30} />
          {[-10, 0, 10].map((dx) => (
            <circle key={dx} cx={100 + dx} cy={30} r={2.4} fill={SIGNAL} />
          ))}
          <Person x={132} y={112} s={0.9} fill={INK3} opacity={0.7} />
        </g>
      ) : null}
      {role === 2 ? (
        <g>
          <rect x={92} y={62} width={40} height={26} rx={3} fill={SIGNAL} />
          <rect x={92} y={68} width={40} height={5} fill={INK} />
          <rect x={98} y={78} width={12} height={5} rx={1} fill={PAPER} />
        </g>
      ) : null}
      {role === 3 ? (
        <g>
          <Box
            x={108}
            y={78}
            w={36}
            h={32}
            stroke={SIGNAL}
            fill={SIGNAL_TINT}
          />
          <Star x={108} y={84} R={7} />
        </g>
      ) : null}
    </svg>
  );
}

function Car({
  x,
  y,
  stroke = INK,
}: {
  x: number;
  y: number;
  stroke?: string;
}) {
  // (x, y) is the ground point under the middle of the car
  return (
    <g>
      <path
        d={`M${x - 130} ${y - 22}V${y - 50}Q${x - 128} ${y - 60} ${x - 112} ${y - 62}L${x - 70} ${y - 66}L${x - 40} ${y - 104}H${x + 52}L${x + 86} ${y - 66}L${x + 118} ${y - 60}Q${x + 132} ${y - 56} ${x + 132} ${y - 42}V${y - 22}Z`}
        fill={PAPER}
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d={`M${x - 58} ${y - 68}L${x - 34} ${y - 96}H${x - 2}V${y - 68}Z`}
        fill={COUNTER_TINT}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <path
        d={`M${x + 6} ${y - 68}V${y - 96}H${x + 48}L${x + 72} ${y - 68}Z`}
        fill={COUNTER_TINT}
        stroke={stroke}
        strokeWidth={1.5}
      />
      {[-78, 80].map((dx) => (
        <g key={dx}>
          <circle cx={x + dx} cy={y - 20} r={20} fill={INK} />
          <circle cx={x + dx} cy={y - 20} r={8} fill={PAPER} />
        </g>
      ))}
    </g>
  );
}

export function FamilyCar() {
  const g = 262;
  return (
    <Frame
      height={236}
      label="A household buying a family car. Two children, speech bubbles raised, sway the choice: children influence. Two parents, one holding a payment card, pay for it: parents buy."
    >
      <g transform="translate(0 -84)">
        {/* parents: the buyers */}
        <Person x={100} y={g} s={1.45} fill={SIGNAL} />
        <Person x={166} y={g} s={1.35} fill={SIGNAL} />
        <rect x={188} y={186} width={34} height={22} rx={3} fill={SIGNAL} />
        <rect x={188} y={191} width={34} height={4} fill={INK} />

        <Car x={400} y={g} />

        {/* children: the influencers */}
        <Person x={624} y={g} s={0.82} head={1.25} fill={COUNTER} />
        <Person x={690} y={g} s={0.72} head={1.25} fill={COUNTER} />
        <Bubble
          x={608}
          y={140}
          w={46}
          h={32}
          stroke={COUNTER}
          tailLeft={false}
        />
        <Heart x={608} y={141} s={0.6} fill={COUNTER} />
        <Bubble
          x={690}
          y={160}
          w={46}
          h={32}
          stroke={COUNTER}
          tailLeft={false}
        />
        <line
          x1={690}
          y1={150}
          x2={690}
          y2={163}
          stroke={COUNTER}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={690} cy={170} r={2} fill={COUNTER} />
        <Arrow
          x1={582}
          y1={130}
          x2={498}
          y2={130}
          stroke={COUNTER}
          dash="4 4"
        />

        <line x1={40} y1={g} x2={760} y2={g} stroke={RULE2} />
        <Key x={133} y={294} anchor="middle" fill={SIGNAL} size={12}>
          PARENTS BUY
        </Key>
        <Key x={656} y={294} anchor="middle" fill={COUNTER} size={12}>
          CHILDREN INFLUENCE
        </Key>
      </g>
    </Frame>
  );
}

/* ==========================================================================
   MARKET SEGMENTATION
   ========================================================================== */

type Shape = 0 | 1 | 2 | 3;

function Mark({
  x,
  y,
  kind,
  fill,
  r = 9,
}: {
  x: number;
  y: number;
  kind: Shape;
  fill: string;
  r?: number;
}) {
  if (kind === 0) return <circle cx={x} cy={y} r={r} fill={fill} />;
  if (kind === 1)
    return (
      <rect
        x={x - r * 0.85}
        y={y - r * 0.85}
        width={r * 1.7}
        height={r * 1.7}
        fill={fill}
      />
    );
  if (kind === 2)
    return (
      <path
        d={`M${x} ${r2(y - r * 1.05)}L${r2(x + r)} ${r2(y + r * 0.75)}H${r2(x - r)}Z`}
        fill={fill}
      />
    );
  return (
    <path
      d={`M${x} ${y - r * 1.1}L${x + r * 1.1} ${y}L${x} ${y + r * 1.1}L${x - r * 1.1} ${y}Z`}
      fill={fill}
    />
  );
}

// A mixed crowd: 20 people of four kinds, placed by hand so nobody overlaps.
const CROWD: { x: number; y: number; k: Shape }[] = [
  { x: 214, y: 58, k: 1 },
  { x: 258, y: 44, k: 0 },
  { x: 302, y: 62, k: 2 },
  { x: 346, y: 46, k: 3 },
  { x: 232, y: 98, k: 3 },
  { x: 278, y: 90, k: 1 },
  { x: 322, y: 104, k: 0 },
  { x: 364, y: 88, k: 2 },
  { x: 212, y: 140, k: 0 },
  { x: 256, y: 134, k: 2 },
  { x: 300, y: 148, k: 3 },
  { x: 346, y: 134, k: 1 },
  { x: 232, y: 182, k: 2 },
  { x: 276, y: 176, k: 0 },
  { x: 320, y: 190, k: 1 },
  { x: 366, y: 176, k: 0 },
  { x: 214, y: 222, k: 3 },
  { x: 258, y: 218, k: 1 },
  { x: 302, y: 230, k: 2 },
  { x: 346, y: 218, k: 3 },
];

function Megaphone({
  x,
  y,
  stroke = INK,
}: {
  x: number;
  y: number;
  stroke?: string;
}) {
  return (
    <g stroke={stroke} strokeWidth={2} strokeLinejoin="round" fill={PAPER}>
      <path d={`M${x} ${y - 9}L${x + 40} ${y - 26}V${y + 26}L${x} ${y + 9}Z`} />
      <rect x={x - 10} y={y - 9} width={10} height={18} rx={2} />
      <path
        d={`M${x + 8} ${y + 7}L${x + 12} ${y + 24}H${x + 20}L${x + 18} ${y + 10}`}
        fill="none"
      />
    </g>
  );
}

/** One message aimed at everyone lands with only one kind of person. */
export function OneMessage() {
  return (
    <Frame
      width={400}
      height={270}
      label="One megaphone sends the same circle-shaped message to a mixed crowd; only the circles light up, the squares, triangles and diamonds stay grey."
    >
      <Megaphone x={34} y={140} />
      {[0, 1, 2].map((i) => (
        <Mark
          key={i}
          x={100 + i * 26}
          y={140}
          kind={0}
          fill={SIGNAL}
          r={7 - i * 1.5}
        />
      ))}
      <Key x={54} y={204} anchor="middle" fill={SIGNAL}>
        SAME
      </Key>
      <Key x={54} y={220} anchor="middle" fill={SIGNAL}>
        MESSAGE
      </Key>
      {CROWD.map((p, i) => (
        <Mark
          key={i}
          x={p.x}
          y={p.y}
          kind={p.k}
          fill={p.k === 0 ? SIGNAL : RULE2}
        />
      ))}
      <Key x={290} y={262} anchor="middle" fill={INK3}>
        EVERYONE
      </Key>
    </Frame>
  );
}

/** The same crowd sorted into smaller groups with shared traits. */
export function SortedGroups() {
  const groups: { cx: number; cy: number; k: Shape; tone: string }[] = [
    { cx: 110, cy: 78, k: 0, tone: SIGNAL },
    { cx: 290, cy: 78, k: 1, tone: COUNTER },
    { cx: 110, cy: 188, k: 2, tone: INK },
    { cx: 290, cy: 188, k: 3, tone: INK3 },
  ];
  return (
    <Frame
      width={400}
      height={270}
      label="The same twenty people sorted into four smaller groups, each holding only one shape."
    >
      {groups.map((g) => {
        const members = CROWD.filter((p) => p.k === g.k);
        return (
          <g key={g.k}>
            <rect
              x={g.cx - 76}
              y={g.cy - 44}
              width={152}
              height={88}
              rx={44}
              fill="none"
              stroke={g.tone}
              strokeWidth={1.4}
              strokeDasharray="4 4"
            />
            {members.map((_, i) => {
              const c = i % 3;
              const r = Math.floor(i / 3);
              const n = Math.min(3, members.length - r * 3);
              return (
                <Mark
                  key={i}
                  x={g.cx + (c - (n - 1) / 2) * 36}
                  y={g.cy - 14 + r * 30 + (members.length <= 3 ? 14 : 0)}
                  kind={g.k}
                  fill={g.tone}
                />
              );
            })}
          </g>
        );
      })}
      <Key x={200} y={262} anchor="middle" fill={INK3}>
        SMALLER GROUPS · SHARED TRAITS
      </Key>
    </Frame>
  );
}

function Pin({ x, y, fill = SIGNAL }: { x: number; y: number; fill?: string }) {
  // (x, y) is the tip of the pin
  return (
    <g>
      <path
        d={`M${x} ${y}C${x - 6} ${y - 14} ${x - 18} ${y - 22} ${x - 18} ${y - 34}A18 18 0 0 1 ${x + 18} ${y - 34}C${x + 18} ${y - 22} ${x + 6} ${y - 14} ${x} ${y}Z`}
        fill={fill}
      />
      <circle cx={x} cy={y - 34} r={6.5} fill={PAPER} />
    </g>
  );
}

function Cart({
  x,
  y,
  stroke = INK,
}: {
  x: number;
  y: number;
  stroke?: string;
}) {
  return (
    <g
      fill="none"
      stroke={stroke}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d={`M${x - 26} ${y - 26}H${x - 18}L${x - 10} ${y + 2}H${x + 18}L${x + 24} ${y - 16}H${x - 14}`}
      />
      <circle cx={x - 6} cy={y + 10} r={3.2} fill={stroke} />
      <circle cx={x + 14} cy={y + 10} r={3.2} fill={stroke} />
    </g>
  );
}

function PillarGlyph({ i, x, y }: { i: number; x: number; y: number }) {
  if (i === 0)
    return (
      <g>
        <Person x={x - 20} y={y + 26} s={0.46} head={1.3} fill={SIGNAL} />
        <Person x={x} y={y + 26} s={0.8} fill={SIGNAL} />
        <Person x={x + 21} y={y + 26} s={0.66} fill={SIGNAL} />
      </g>
    );
  if (i === 1) return <Pin x={x} y={y + 26} />;
  if (i === 2)
    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={24}
          fill="none"
          stroke={SIGNAL}
          strokeWidth={2.2}
        />
        <Heart x={x} y={y + 1} s={0.95} />
      </g>
    );
  return (
    <g>
      <Cart x={x} y={y + 6} stroke={SIGNAL} />
      <path
        d={`M${x + 12} ${y - 30}A12 12 0 1 1 ${x + 24} ${y - 18}`}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d={headAlong(x + 24, y - 17, 0.1, 1, 6)}
        fill="none"
        stroke={SIGNAL}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
}

export const PILLARS = [
  "DEMOGRAPHICS",
  "GEOGRAPHICS",
  "PSYCHOGRAPHICS",
  "BEHAVIORAL",
];

export function SegmentationPillars() {
  const xs = [100, 300, 500, 700];
  return (
    <Frame
      height={330}
      label="A temple front labelled market segmentation, held up by four pillars: demographics (people of different ages), geographics (a map pin), psychographics (a heart), behavioral (a shopping cart with a repeat arrow)."
    >
      <path
        d="M40 92L400 20L760 92Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <rect x={40} y={92} width={720} height={30} fill={INK} />
      <Key x={400} y={112} anchor="middle" fill={PAPER} size={12}>
        MARKET SEGMENTATION
      </Key>
      {xs.map((x, i) => (
        <g key={x}>
          <rect
            x={x - 62}
            y={122}
            width={124}
            height={12}
            fill={PAPER}
            stroke={INK}
            strokeWidth={1.4}
          />
          <rect
            x={x - 50}
            y={134}
            width={100}
            height={132}
            fill={PAPER}
            stroke={INK}
            strokeWidth={1.4}
          />
          {[-34, 34].map((dx) => (
            <line
              key={dx}
              x1={x + dx}
              y1={138}
              x2={x + dx}
              y2={262}
              stroke={RULE2}
            />
          ))}
          <rect
            x={x - 62}
            y={266}
            width={124}
            height={12}
            fill={PAPER}
            stroke={INK}
            strokeWidth={1.4}
          />
          <PillarGlyph i={i} x={x} y={196} />
          <Key x={x} y={310} anchor="middle" fill={INK} size={11}>
            {PILLARS[i]}
          </Key>
        </g>
      ))}
      <rect x={24} y={278} width={752} height={10} fill={INK} />
    </Frame>
  );
}

/* ==========================================================================
   THE ETHICAL BORDER
   ========================================================================== */

/** Ethical marketing: the product handed over with its facts showing. */
export function Informs() {
  return (
    <Frame
      width={400}
      height={220}
      label="A seller hands a buyer a product whose label is plainly showing an information mark."
    >
      <line x1={40} y1={196} x2={360} y2={196} stroke={RULE2} />
      <Person x={100} y={196} s={1.6} fill={INK} />
      <Person x={300} y={196} s={1.6} fill={COUNTER} />
      <rect
        x={172}
        y={100}
        width={56}
        height={52}
        rx={4}
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth={2}
      />
      <circle cx={200} cy={126} r={13} fill={COUNTER} />
      <circle cx={200} cy={119} r={2.2} fill={PAPER} />
      <line
        x1={200}
        y1={125}
        x2={200}
        y2={134}
        stroke={PAPER}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M126 138H170M230 138H274"
        stroke={INK3}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Frame>
  );
}

/** Manipulative marketing: a shopper on strings. */
export function Marionette() {
  const ends = [
    { x: 168, y: 118 },
    { x: 232, y: 118 },
    { x: 200, y: 64 },
  ];
  return (
    <Frame
      width={400}
      height={220}
      label="A marionette: a hand-held control bar above a small shopper, with strings to the head, the hands and the feet."
    >
      <path
        d="M140 22H260M200 14V40"
        stroke={SIGNAL}
        strokeWidth={4}
        strokeLinecap="round"
      />
      {ends.map((e, i) => {
        const top = [
          { x: 140, y: 22 },
          { x: 260, y: 22 },
          { x: 200, y: 40 },
        ][i];
        return (
          <line
            key={i}
            x1={top.x}
            y1={top.y}
            x2={e.x}
            y2={e.y}
            stroke={SIGNAL}
            strokeWidth={1}
          />
        );
      })}
      <Person x={200} y={200} s={1.9} fill={INK} />
      <path
        d="M174 118L168 118M226 118L232 118"
        stroke={INK}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line x1={40} y1={200} x2={360} y2={200} stroke={RULE2} />
    </Frame>
  );
}

/** A dark pattern: the sign-up box you cannot easily leave. */
export function DarkPattern() {
  return (
    <Frame
      width={400}
      height={320}
      label="A website pop-up: a huge button reading yes, sign me up; a pre-ticked box to send offers; a countdown timer; and a tiny, faint no thanks link."
    >
      <rect
        x={20}
        y={14}
        width={360}
        height={292}
        rx={8}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.6}
      />
      <line x1={20} y1={40} x2={380} y2={40} stroke={INK} strokeWidth={1.2} />
      {[36, 50, 64].map((x) => (
        <circle key={x} cx={x} cy={27} r={4} fill={RULE2} />
      ))}
      {/* page behind, greyed */}
      {[64, 80, 96].map((y) => (
        <rect
          key={y}
          x={40}
          y={y}
          width={y === 96 ? 180 : 320}
          height={7}
          rx={3}
          fill={RULE}
        />
      ))}
      {/* the modal */}
      <rect
        x={58}
        y={70}
        width={284}
        height={220}
        rx={6}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.6}
      />
      <Display x={200} y={106} anchor="middle" size={19}>
        Wait! Don&rsquo;t miss out
      </Display>
      <rect x={122} y={120} width={156} height={26} rx={4} fill={SIGNAL_TINT} />
      <Key x={200} y={138} anchor="middle" fill={SIGNAL} size={12} weight={700}>
        ENDS IN 00:59
      </Key>
      <rect x={80} y={160} width={240} height={46} rx={6} fill={SIGNAL} />
      <Key x={200} y={188} anchor="middle" fill={PAPER} size={13} weight={700}>
        YES, SIGN ME UP
      </Key>
      <rect x={80} y={220} width={14} height={14} rx={2} fill={INK} />
      <path
        d="M83 227L86 231L91 223"
        fill="none"
        stroke={PAPER}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Note x={102} y={232} fill={INK2} size={12}>
        Send me offers every day
      </Note>
      <Note x={200} y={272} anchor="middle" fill={RULE2} size={9}>
        no thanks, I don&rsquo;t like saving money
      </Note>
    </Frame>
  );
}

/** Regulators and consumers push back: a gavel and a one-star review. */
export function Punished() {
  return (
    <Frame
      width={400}
      height={220}
      label="A judge's gavel coming down, marked regulators, and a review card with one star out of five, marked consumers."
    >
      {/* gavel */}
      <g transform="translate(118 96) rotate(-35)">
        <rect x={-4} y={10} width={8} height={100} rx={3} fill={INK} />
        <rect x={-34} y={-16} width={68} height={32} rx={4} fill={INK} />
        <rect x={-42} y={-20} width={10} height={40} rx={3} fill={INK} />
        <rect x={32} y={-20} width={10} height={40} rx={3} fill={INK} />
      </g>
      <rect x={42} y={170} width={80} height={12} rx={3} fill={INK} />
      <path
        d="M50 150l-12 -8M62 142l-4 -14M36 164h-14"
        stroke={SIGNAL}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Key x={100} y={206} anchor="middle" fill={INK}>
        REGULATORS
      </Key>
      {/* review */}
      <rect
        x={220}
        y={62}
        width={150}
        height={108}
        rx={6}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.6}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          x={242 + i * 26}
          y={92}
          R={10}
          fill={i === 0 ? SIGNAL : "none"}
          stroke={i === 0 ? SIGNAL : RULE2}
        />
      ))}
      {[118, 134, 150].map((y, i) => (
        <rect
          key={y}
          x={236}
          y={y}
          width={i === 2 ? 70 : 118}
          height={6}
          rx={3}
          fill={RULE}
        />
      ))}
      <Key x={295} y={206} anchor="middle" fill={INK}>
        CONSUMERS
      </Key>
    </Frame>
  );
}

/* ==========================================================================
   DISCUSSION
   ========================================================================== */

/** The three stages, each in question, beside a scale of need and want. */
export function RegretCheck() {
  const xs = [90, 230, 370];
  return (
    <Frame
      height={250}
      label="The three stages of consumption, Prepurchase, Purchase and Postpurchase, each marked with a question mark; beside them a balance scale weighing need against impulsive want."
    >
      {xs.map((x, i) => (
        <g key={x}>
          <circle
            cx={x}
            cy={128}
            r={46}
            fill={PAPER}
            stroke={INK}
            strokeWidth={1.5}
          />
          <g opacity={0.5}>
            <StageGlyph stage={i} x={x} y={128} />
          </g>
          <Display x={x + 34} y={96} anchor="middle" fill={SIGNAL} size={34}>
            ?
          </Display>
          <Key x={x} y={202} anchor="middle" fill={INK}>
            {STAGES[i].toUpperCase()}
          </Key>
        </g>
      ))}
      <line
        x1={470}
        y1={40}
        x2={470}
        y2={214}
        stroke={RULE2}
        strokeDasharray="3 5"
      />

      {/* balance: need vs impulsive want */}
      <g stroke={INK} strokeWidth={2} strokeLinecap="round" fill="none">
        <path d="M640 64V190M604 190H676" />
        <path d="M556 68H724" />
        <path d="M556 68L534 124M556 68L578 124" strokeWidth={1.2} />
        <path d="M724 68L702 124M724 68L746 124" strokeWidth={1.2} />
      </g>
      <circle cx={640} cy={68} r={5} fill={INK} />
      <path
        d="M526 124H586Q586 142 556 142Q526 142 526 124Z"
        fill={COUNTER_TINT}
        stroke={COUNTER}
        strokeWidth={1.6}
      />
      <path
        d="M694 124H754Q754 142 724 142Q694 142 694 124Z"
        fill={SIGNAL_TINT}
        stroke={SIGNAL}
        strokeWidth={1.6}
      />
      <Display x={640} y={48} anchor="middle" fill={SIGNAL} size={30}>
        ?
      </Display>
      <Key x={556} y={166} anchor="middle" fill={COUNTER}>
        NEED
      </Key>
      <Key x={724} y={166} anchor="middle" fill={SIGNAL}>
        IMPULSIVE WANT
      </Key>
    </Frame>
  );
}
