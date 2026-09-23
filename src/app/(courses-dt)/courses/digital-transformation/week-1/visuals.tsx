/* ==========================================================================
   Week 1 — plates (Flat Silhouette)
   --------------------------------------------------------------------------
   Solid black silhouettes on cream are the physical business; a pale blue
   copy with a dashed outer edge is its digital version. Fixed cast:
     · Shop     — the business
     · Doc      — analog information (a paper page)
     · Monitor  — the digital place the copy lives in
     · Person   — every human (bust in profile)
     · Coins    — revenue (SIGNAL: what is gained)
   Every coordinate is a literal or rounded, so server and client match.
   ========================================================================== */

import React from "react";
import { Laptop, Gear } from "@phosphor-icons/react/dist/ssr";

export const CREAM = "#F1EADB";
export const INK = "#1D1B1A";
export const SKIN = "#DCCFB8";
export const SIGNAL = "#A63A2C";
export const COUNTER = "#1F5FAF";
export const COUNTER_FILL = "#CFDDF0";

const r2 = (n: number) => Math.round(n * 100) / 100;

/* -- frame ---------------------------------------------------------------- */

export function Plate({
  w = 400,
  h,
  title,
  children,
}: {
  w?: number;
  h: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={title}
      className="block w-full h-auto"
      style={{ background: CREAM }}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/* A physical shape: solid ink, holes left as cream gaps. */
function Solid({ outer, holes = "", tone = INK }: { outer: string; holes?: string; tone?: string }) {
  return <path d={`${outer} ${holes}`} fill={tone} fillRule="evenodd" />;
}

/* Its digital copy: the same path in pale blue, dashed on the outer edge only. */
function Twin({ outer, holes = "", k = 1 }: { outer: string; holes?: string; k?: number }) {
  return (
    <g>
      <path d={`${outer} ${holes}`} fill={COUNTER_FILL} fillRule="evenodd" />
      <path
        d={outer}
        fill="none"
        stroke={COUNTER}
        strokeWidth={r2(2.5 / k)}
        strokeDasharray={`${r2(6 / k)} ${r2(5 / k)}`}
        strokeLinejoin="round"
      />
    </g>
  );
}

function Shape({
  outer,
  holes,
  digital,
  k = 1,
  tone,
}: {
  outer: string;
  holes?: string;
  digital?: boolean;
  k?: number;
  tone?: string;
}) {
  return digital ? <Twin outer={outer} holes={holes} k={k} /> : <Solid outer={outer} holes={holes} tone={tone} />;
}

/* -- cast: Shop (160 × 150, origin top-left) ------------------------------ */

const SHOP_SIGN = "M 0 0 H 160 V 26 H 0 Z";
const SHOP_AWNING = (() => {
  // straight top edge, six scallops along the bottom
  const n = 6;
  const left = -8;
  const width = 176;
  const step = width / n;
  let d = `M ${left} 34 H ${left + width} V 50`;
  for (let i = n - 1; i >= 0; i--) {
    const x0 = r2(left + step * i);
    d += ` A ${r2(step / 2)} ${r2(step / 2)} 0 0 1 ${x0} 50`;
  }
  return d + " Z";
})();
const SHOP_BODY = "M 6 70 H 154 V 150 H 136 V 90 H 102 V 150 H 6 Z";
const SHOP_HOLES = "M 22 88 H 84 V 124 H 22 Z";
const SHOP_OUTER = `${SHOP_SIGN} ${SHOP_AWNING} ${SHOP_BODY}`;

export function Shop({
  x,
  y,
  k = 1,
  digital,
  tone,
}: {
  x: number;
  y: number;
  k?: number;
  digital?: boolean;
  tone?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <Shape outer={SHOP_OUTER} holes={SHOP_HOLES} digital={digital} k={k} tone={tone} />
    </g>
  );
}

/* -- cast: Doc (90 × 116, origin top-left) -------------------------------- */

const DOC_SHEET = "M 0 0 H 56 V 34 H 90 V 116 H 0 Z";
const DOC_FOLD = "M 62 0 L 90 28 H 62 Z";
const DOC_LINES =
  "M 14 48 H 76 V 55 H 14 Z M 14 64 H 76 V 71 H 14 Z M 14 80 H 76 V 87 H 14 Z M 14 96 H 52 V 103 H 14 Z";

export function Doc({
  x,
  y,
  k = 1,
  digital,
}: {
  x: number;
  y: number;
  k?: number;
  digital?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <Shape outer={`${DOC_SHEET} ${DOC_FOLD}`} holes={DOC_LINES} digital={digital} k={k} />
    </g>
  );
}

/* -- cast: Monitor (heavy frame, thin inner rule, stand) ------------------ */

export function Monitor({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: React.ReactNode;
}) {
  const cx = r2(x + w / 2);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={8} />
      <rect
        x={x + 9}
        y={y + 9}
        width={w - 18}
        height={h - 18}
        fill="none"
        stroke={INK}
        strokeWidth={1.5}
      />
      <path d={`M ${cx - 10} ${y + h + 4} H ${cx + 10} V ${y + h + 22} H ${cx - 10} Z`} fill={INK} />
      <path d={`M ${cx - 40} ${y + h + 22} H ${cx + 40} V ${y + h + 30} H ${cx - 40} Z`} fill={INK} />
      {children}
    </g>
  );
}

/* -- cast: Arrow ---------------------------------------------------------- */

export function Arrow({ x1, x2, y, color = INK }: { x1: number; x2: number; y: number; color?: string }) {
  return (
    <g>
      <path d={`M ${x1} ${y} H ${x2 - 14}`} stroke={color} strokeWidth={6} />
      <path d={`M ${x2 - 18} ${y - 12} L ${x2} ${y} L ${x2 - 18} ${y + 12} Z`} fill={color} />
    </g>
  );
}

/* ==========================================================================
   Hero — a physical shop and its digital copy
   ========================================================================== */

export function HeroShopTwin() {
  return (
    <Plate
      w={560}
      h={240}
      title="A black shop silhouette with an arrow pointing to its pale blue digital copy"
    >
      <Shop x={40} y={38} k={1.1} />
      <Arrow x1={240} x2={318} y={140} />
      <Shop x={344} y={38} k={1.1} digital />
    </Plate>
  );
}

/* ==========================================================================
   Digitization — analog information converted into digital format
   ========================================================================== */

export function Digitize() {
  return (
    <Plate
      h={250}
      title="A black paper page with an arrow pointing to a screen showing the same page as a pale blue digital copy"
    >
      <Doc x={34} y={57} />
      <Arrow x1={140} x2={194} y={115} />
      <Monitor x={206} y={30} w={170} h={170}>
        <Doc x={246} y={57} digital />
      </Monitor>
    </Plate>
  );
}

/* -- cast: Coins (stack of n, bottom-centre at x, y) ---------------------- */

export function Coins({ x, y, n = 4 }: { x: number; y: number; n?: number }) {
  const w = 46;
  const t = 11;
  const gap = 3;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          x={x - w / 2}
          y={y - (i + 1) * (t + gap) + gap}
          width={w}
          height={t}
          rx={5.5}
          fill={SIGNAL}
        />
      ))}
      <ellipse cx={x} cy={y - n * (t + gap) - 5} rx={w / 2} ry={8} fill={SIGNAL} />
    </g>
  );
}

/* ==========================================================================
   Digitalization — the business model moves to a digital business
   ========================================================================== */

export function Digitalize() {
  return (
    <Plate
      h={240}
      title="A black shop with an arrow pointing to a screen showing the shop as a pale blue digital copy, with a red stack of coins beside the screen"
    >
      <Shop x={24} y={66} k={0.6} />
      <Arrow x1={128} x2={170} y={111} />
      <Monitor x={180} y={36} w={150} h={150}>
        <Shop x={209.4} y={66} k={0.6} digital />
      </Monitor>
      <Coins x={368} y={186} />
    </Plate>
  );
}

/* -- cast: Person (bust in profile, facing right; 100 tall, bottom-centre) -- */

type Hair = "bob" | "crop" | "bun";

const HAIR: Record<Hair, string> = {
  bob: "M -25 52 C -30 30 -22 8 -2 5 C 12 3 23 11 24 23 C 16 20 9 22 5 27 C 1 35 -1 45 -3 54 Z",
  crop: "M -25 40 C -27 18 -13 3 3 3 C 16 3 24 11 25 22 C 15 18 5 19 -3 23 C -8 27 -10 33 -10 42 C -16 46 -22 45 -25 40 Z",
  bun: "M -25 40 C -27 18 -13 3 3 3 C 16 3 24 11 25 22 C 15 18 5 19 -3 23 C -8 27 -10 33 -10 42 C -16 46 -22 45 -25 40 Z M -30 14 A 11 11 0 1 1 -29.9 14.1 Z",
};

export function Person({
  x,
  y,
  k = 1,
  hair = "bob",
  flip,
}: {
  x: number;
  y: number;
  k?: number;
  hair?: Hair;
  flip?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -k : k} ${k})`}>
      <path
        d="M -8 60 V 46 C -20 42 -24 32 -22 24 C -20 12 -10 7 2 7 C 14 7 22 15 22 25 L 22 29 L 28 37 L 22 39 L 22 43 C 22 47 18 49 14 49 L 7 49 V 60 Z"
        fill={SKIN}
        stroke={INK}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M 10 27.5 Q 14 24.5 18 27.5 Q 14 30 10 27.5 Z" fill={INK} />
      <path d={HAIR[hair]} fill={INK} />
      <path d="M -40 100 C -40 76 -28 62 -8 60 H 8 C 28 62 40 76 40 100 Z" fill={INK} />
    </g>
  );
}

/* ==========================================================================
   Technology, people and processes — equally important
   ========================================================================== */

export function EqualFooting() {
  const tops = [88, 200, 312];
  return (
    <Plate
      h={212}
      title="Three plinths of equal height: a laptop on the first, a person on the second and a gear on the third"
    >
      {tops.map((cx) => (
        <rect key={cx} x={cx - 52} y={150} width={104} height={36} fill={INK} />
      ))}
      <Laptop x={88 - 62} y={40.5} size={124} weight="fill" color={INK} />
      <Person x={200} y={26} k={1.2} />
      <Gear x={312 - 58} y={41.4} size={116} weight="fill" color={INK} />
    </Plate>
  );
}

/* ==========================================================================
   Data-driven decision-making
   ========================================================================== */

export function DataDecision() {
  const bars = [40, 64, 96, 56];
  const base = 148;
  return (
    <Plate
      h={222}
      title="A person looks at a screen showing four bars of data; the tallest bar, the one chosen, is red"
    >
      <Person x={84} y={70} k={1.3} hair="crop" />
      <Monitor x={170} y={30} w={200} h={140}>
        {bars.map((hgt, i) => (
          <rect
            key={i}
            x={194 + i * 42}
            y={base - hgt}
            width={26}
            height={hgt}
            fill={i === 2 ? SIGNAL : INK}
          />
        ))}
        <rect x={186} y={base + 2} width={168} height={2.5} fill={INK} />
      </Monitor>
    </Plate>
  );
}

/* ==========================================================================
   Strategic vision — digital initiatives joined into one strategy
   ========================================================================== */

/* A small screen (heavy frame, thin inner rule, short stand) holding one glyph. */
function MiniScreen({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  const w = 84;
  const h = 56;
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={5} />
      <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} fill="none" stroke={INK} strokeWidth={1} />
      <path d={`M ${cx - 5} ${y + h + 2.5} H ${cx + 5} V ${y + h + 10} H ${cx - 5} Z`} fill={INK} />
      <path d={`M ${cx - 20} ${y + h + 10} H ${cx + 20} V ${y + h + 14} H ${cx - 20} Z`} fill={INK} />
      {children}
    </g>
  );
}

export function OneStrategy() {
  const sx = 132;
  const rows = [12, 98, 184];
  const join = { x: 284, y: 126 };
  return (
    <Plate
      h={266}
      title="A leader faces three digital initiatives, each on a small screen: a page, a shop and a gear; lines from all three join into one red arrow pointing forward"
    >
      <Person x={64} y={82} k={1.2} hair="bun" />
      <MiniScreen x={sx} y={rows[0]}>
        <Doc x={sx + 26.7} y={rows[0] + 8.3} k={0.34} />
      </MiniScreen>
      <MiniScreen x={sx} y={rows[1]}>
        <Shop x={sx + 21.2} y={rows[1] + 8.5} k={0.26} />
      </MiniScreen>
      <MiniScreen x={sx} y={rows[2]}>
        <Gear x={sx + 22} y={rows[2] + 8} size={40} weight="fill" color={INK} />
      </MiniScreen>
      <path
        d={rows
          .map((ry) => `M ${sx + 96} ${ry + 28} L ${join.x} ${join.y}`)
          .join(" ")}
        stroke={INK}
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
      />
      <Arrow x1={join.x} x2={384} y={join.y} color={SIGNAL} />
    </Plate>
  );
}

/* ==========================================================================
   Class discussion — two people face each other
   ========================================================================== */

export function Discussion() {
  return (
    <Plate
      h={246}
      title="Two people in profile face each other, each with a speech bubble, in conversation"
    >
      <ellipse cx={164} cy={36} rx={32} ry={21} fill={INK} />
      <path d="M 160 54 L 172 80 L 176 52 Z" fill={INK} />
      <ellipse cx={236} cy={56} rx={32} ry={21} fill={INK} />
      <path d="M 224 72 L 222 96 L 238 75 Z" fill={INK} />
      <Person x={128} y={86} k={1.4} hair="bob" />
      <Person x={272} y={86} k={1.4} hair="crop" flip />
    </Plate>
  );
}


/* ==========================================================================
   Five steps from digitization to digital transformation
   (recreates the dt.png staircase in the course's own cast)
   ========================================================================== */

const STEP_NAMES = [
  ["Digitize", "information"],
  ["Organize", "information"],
  ["Automate", "processes"],
  ["Streamline", "processes"],
  ["Transform the", "institution"],
];

const STEP_GROUPS = [
  { from: 0, to: 1, name: "Digitization", tone: INK },
  { from: 2, to: 3, name: "Digitalization", tone: INK },
  { from: 4, to: 4, name: "Digital transformation", tone: SIGNAL },
];

const STEPS_TITLE =
  "Five rising steps, each with a small screen: digitize information (a page), organize information (three pages), automate processes (a gear), streamline processes (two gears), and transform the institution (a red shop on the red last step). Steps 1–2 are grouped as digitization, 3–4 as digitalization and 5 as digital transformation";

/* The glyph for step i on a MiniScreen whose top-left is (x, y). */
function StepGlyph({ i, x, y }: { i: number; x: number; y: number }) {
  switch (i) {
    case 0:
      return <Doc x={x + 26.7} y={y + 8.3} k={0.34} />;
    case 1:
      return (
        <g>
          {[0, 1, 2].map((j) => (
            <Doc key={j} x={x + 10 + j * 22} y={y + 14} k={0.2} />
          ))}
        </g>
      );
    case 2:
      return <Gear x={x + 22} y={y + 8} size={40} weight="fill" color={INK} />;
    case 3:
      return (
        <g>
          <Gear x={x + 14} y={y + 11} size={30} weight="fill" color={INK} />
          <Gear x={x + 39} y={y + 15} size={30} weight="fill" color={INK} />
        </g>
      );
    default:
      return <Shop x={x + 21.2} y={y + 8.5} k={0.26} tone={SIGNAL} />;
  }
}

function StepLabel({ i, cx, y, size }: { i: number; cx: number; y: number; size: number }) {
  return (
    <>
      {STEP_NAMES[i].map((line, j) => (
        <text
          key={j}
          x={cx}
          y={y + j * Math.round(size * 1.4)}
          textAnchor="middle"
          fontFamily="var(--font-body)"
          fontWeight={600}
          fontSize={size}
          fill={CREAM}
        >
          {line}
        </text>
      ))}
    </>
  );
}

/* ==========================================================================
   Five steps from digitization to digital transformation
   (recreates the dt.png staircase in the course's own cast)
   Wide: a staircase. Tall (phones): rows with bars that grow at each step.
   ========================================================================== */

export function TransformationSteps() {
  const x0 = 40;
  const pitch = 144;
  const w = 136;
  const bottom = 384;
  const tops = [324, 284, 244, 204, 164];
  // screen (84 × 56 + 14 stand) centred on each step, 6 above its top
  const sx = (i: number) => x0 + i * pitch + (w - 84) / 2;
  const sy = (i: number) => tops[i] - 6 - 70;
  return (
    <Plate w={800} h={404} title={STEPS_TITLE}>
      {tops.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * pitch} y={t} width={w} height={bottom - t} fill={i === 4 ? SIGNAL : INK} />
          <StepLabel i={i} cx={x0 + i * pitch + w / 2} y={t + 24} size={15} />
          <MiniScreen x={sx(i)} y={sy(i)}>
            <StepGlyph i={i} x={sx(i)} y={sy(i)} />
          </MiniScreen>
        </g>
      ))}
      {STEP_GROUPS.map((g) => {
        const left = x0 + g.from * pitch;
        const right = x0 + g.to * pitch + w;
        const y = sy(g.to) - 18;
        return (
          <g key={g.name}>
            <path
              d={`M ${left} ${y + 10} V ${y} H ${right} V ${y + 10}`}
              stroke={g.tone}
              strokeWidth={3}
              fill="none"
            />
            <text
              x={g.from === 4 ? right : (left + right) / 2}
              y={y - 10}
              textAnchor={g.from === 4 ? "end" : "middle"}
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={20}
              fill={g.tone}
            >
              {g.name}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

export function TransformationStepsTall() {
  const head = 38;
  const row = 86;
  // lay out headings and rows top to bottom
  const items: { kind: "head" | "row"; i: number; y: number }[] = [];
  let y = 14;
  STEP_GROUPS.forEach((g, gi) => {
    items.push({ kind: "head", i: gi, y });
    y += head;
    for (let i = g.from; i <= g.to; i++) {
      items.push({ kind: "row", i, y });
      y += row;
    }
    y += 8;
  });
  return (
    <Plate w={400} h={y - 4} title={STEPS_TITLE}>
      {items.map((it) => {
        if (it.kind === "head") {
          const g = STEP_GROUPS[it.i];
          return (
            <g key={`h${it.i}`}>
              <text
                x={16}
                y={it.y + 16}
                fontFamily="var(--font-heading)"
                fontWeight={700}
                fontSize={20}
                fill={g.tone}
              >
                {g.name}
              </text>
              <path
                d={`M 16 ${it.y + 34} V ${it.y + 26} H 384 V ${it.y + 34}`}
                stroke={g.tone}
                strokeWidth={3}
                fill="none"
              />
            </g>
          );
        }
        const bw = 150 + it.i * 30;
        const ry = it.y + 4;
        return (
          <g key={`r${it.i}`}>
            <MiniScreen x={16} y={ry}>
              <StepGlyph i={it.i} x={16} y={ry} />
            </MiniScreen>
            <rect x={114} y={ry + 6} width={bw} height={56} fill={it.i === 4 ? SIGNAL : INK} />
            <StepLabel i={it.i} cx={114 + bw / 2} y={ry + 29} size={17} />
          </g>
        );
      })}
    </Plate>
  );
}

/* ==========================================================================
   Three stages: digitization → digitalization → digital transformation
   (recreates ddd.jpeg in the course's own cast)
   ========================================================================== */

export function ThreeStages() {
  const xs = [14, 156, 298];
  const top = 12;
  const names = [["Digitization"], ["Digitalization"], ["Digital", "transformation"]];
  return (
    <Plate
      h={140}
      title="Three screens joined by arrows: a page (digitization), a gear (digitalization) and a red shop (digital transformation)"
    >
      {xs.map((x, i) => (
        <g key={i}>
          <MiniScreen x={x} y={top}>
            <StepGlyph i={[0, 2, 4][i]} x={x} y={top} />
          </MiniScreen>
          {names[i].map((line, j) => (
            <text
              key={j}
              x={x + 42}
              y={top + 98 + j * 20}
              textAnchor="middle"
              fontFamily="var(--font-heading)"
              fontWeight={700}
              fontSize={15}
              fill={i === 2 ? SIGNAL : INK}
            >
              {line}
            </text>
          ))}
        </g>
      ))}
      <Arrow x1={106} x2={148} y={top + 28} />
      <Arrow x1={248} x2={290} y={top + 28} />
    </Plate>
  );
}
