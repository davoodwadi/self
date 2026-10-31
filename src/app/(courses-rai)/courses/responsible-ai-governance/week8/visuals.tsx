"use client";

import React, { useState } from "react";
import {
  CENTRE_DASH,
  FigureName,
  Frame,
  LINE,
  ObliqueBox,
  PAT,
  PatentDefs,
  PatentKey,
  Segmented,
  Slider,
  Toggles,
  r2,
  stip,
} from "../_visuals/kit";
import { Coins, Cylinder, Dial, Figure, Gear, Hall, Lens, Sheet, SmallModel, cross, headAlongPath, star, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 8 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in the body face and one examiner's red for the finding. See the course
   CLAUDE.md.

   Week cast: the consumer is a patent Figure. The AI agent is the model
   housing with two gears (SmallModel). The platform is a columned hall. A
   listing is an upright card with a house. A paid placement wears a badge.
   A system prompt is a sheet of italic lines. A choice share is a cylinder.
   ========================================================================== */

const ink = {
  stroke: PAT.ink,
  strokeWidth: LINE.outline,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
const hair = {
  stroke: PAT.ink,
  strokeWidth: LINE.hair,
  strokeLinecap: "round" as const,
};
const R = PAT.signal;

/** Numerals or a quantity on a plate. */
function Num({
  x,
  y,
  children,
  size = 14,
  anchor = "middle",
  fill = PAT.ink,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-body)"
      fontSize={size}
      fill={fill}
      style={{ fontVariantNumeric: "lining-nums" }}
    >
      {children}
    </text>
  );
}

/** Width a sentence-case label takes at `size` in the body face. */
const labelWidth = (text: string, size: number) => r2(text.length * size * 0.56);

/**
 * A paid-placement badge: a small outlined plate with its label,
 * centred on (cx, cy). Red when the badge is the finding.
 */
function Badge({ cx, cy, text, size = 10, red = false }: { cx: number; cy: number; text: string; size?: number; red?: boolean }) {
  const w = labelWidth(text, size) + 10;
  const h = size + 8;
  const c = red ? R : PAT.ink;
  return (
    <g>
      <rect x={r2(cx - w / 2)} y={r2(cy - h / 2)} width={r2(w)} height={h} fill={PAT.paper} stroke={c} strokeWidth={red ? LINE.bold : LINE.outline} />
      <PatentKey x={cx} y={r2(cy + size * 0.36)} size={size} fill={c}>
        {text}
      </PatentKey>
    </g>
  );
}

/**
 * A hotel listing standing upright: a shallow card in oblique projection with
 * a small house, a name rule, five stars and a price rule. (x, y) is the
 * front face's top-left.
 */
function Listing({
  id,
  x,
  y,
  w = 120,
  h = 64,
  badge,
  red = false,
  stars = 4,
  stroke = PAT.ink,
  badgeSize = 11,
  price,
}: {
  id: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  badge?: string;
  badgeSize?: number;
  price?: string;
  red?: boolean;
  stars?: number;
  stroke?: string;
}) {
  const hw = r2(Math.min(h * 0.62, w * 0.3));
  const tx = r2(x + 12 + hw + 10);
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={5} dy={3} stroke={stroke} />
      {/* the house */}
      <path
        d={`M${x + 10} ${r2(y + h - 10)}V${r2(y + h * 0.42)}L${r2(x + 10 + hw / 2)} ${r2(y + 9)}L${r2(x + 10 + hw)} ${r2(y + h * 0.42)}V${r2(y + h - 10)}Z`}
        fill={PAT.paper}
        {...ink}
        stroke={stroke}
      />
      <rect x={r2(x + 10 + hw / 2 - 3.5)} y={r2(y + h - 20)} width={7} height={10} fill={PAT.paper} {...hair} />
      {/* name, stars, price */}
      <line x1={tx} y1={r2(y + 14)} x2={r2(x + w - 10)} y2={r2(y + 14)} {...ink} stroke={stroke} />
      {w >= 100 && Array.from({ length: 5 }, (_, j) => (
        <path
          key={j}
          d={star(r2(tx + 4 + j * 10), r2(y + h * (price ? 0.42 : 0.5)), 3.6)}
          fill={j < stars ? stroke : PAT.paper}
          stroke={stroke}
          strokeWidth={LINE.hair}
          strokeLinejoin="round"
        />
      ))}
      {price ? null : (
        <line x1={tx} y1={r2(w >= 100 ? y + h - 12 : y + h * 0.55)} x2={r2(tx + (w - (tx - x)) * 0.5)} y2={r2(w >= 100 ? y + h - 12 : y + h * 0.55)} {...hair} stroke={stroke} />
      )}
      {price ? (
        <text x={r2(x + w - 8)} y={r2(y + h - 7)} textAnchor="end" fontFamily="var(--font-body)" fontSize={13} fill={stroke}>
          {price}
        </text>
      ) : null}
      {badge ? <Badge cx={r2(Math.max(x + labelWidth(badge, badgeSize) / 2 + 5, x + w - labelWidth(badge, badgeSize) / 2 - 8))} cy={r2(y - badgeSize / 2 - 6)} text={badge} size={badgeSize} red={red} /> : null}
    </g>
  );
}

/**
 * A system prompt: an upright sheet with a turned corner and lines of
 * italic text. A line may be red (the finding) or a plain hairline (`""`).
 */
function PromptSheet({
  id,
  x,
  y,
  w,
  h,
  lines,
  size = 12,
  gap = 18,
}: {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  lines: { t: string; red?: boolean }[];
  size?: number;
  gap?: number;
}) {
  const c = 14;
  return (
    <g>
      <path d={`M${x + 4} ${y + 5}H${x + w - c + 4}L${x + w + 4} ${y + c + 5}V${y + h + 5}H${x + 4}Z`} fill={stip(id, "dense")} {...ink} />
      <path d={`M${x} ${y}H${x + w - c}L${x + w} ${y + c}V${y + h}H${x}Z`} fill={PAT.paper} {...ink} />
      <path d={`M${x + w - c} ${y}V${y + c}H${x + w}`} fill={PAT.paper} {...hair} />
      {lines.map((l, i) =>
        l.t ? (
          <text
            key={i}
            x={x + 12}
            y={y + 24 + i * gap}
            fontFamily="var(--font-body)"
            fontStyle="italic"
            fontSize={size}
            fill={l.red ? R : PAT.ink}
          >
            {l.t}
          </text>
        ) : (
          <line key={i} x1={x + 12} y1={y + 20 + i * gap} x2={x + w - 18 - (i % 3) * 22} y2={y + 20 + i * gap} {...hair} />
        ),
      )}
    </g>
  );
}

/**
 * The two duties as two figures. Care: the agent works along a row of
 * listings with its lens, ticking each one it has examined. Loyalty: the
 * agent is tied by one cord to its beneficiary. A cord from a third party's
 * coins is cut (red), because the duty forbids that pull.
 */
export function CareAndLoyalty() {
  const id = "w8-duties";
  const g = 178;
  const cards = [104, 168, 232, 296, 360];
  return (
    <Frame
      width={880}
      height={166}
      label="Patent drawing in two figures. Duty of care: an AI agent housing beside a row of five hotel listings. The first two carry ticks, a hand lens rests over the third, the last two wait. Duty of loyalty: a beneficiary at left holds a cord tied to the agent housing. At right a columned hall with a stack of coins runs a second cord toward the housing, drawn in red and cut, with a red cross at the break."
    >
      <PatentDefs id={id} />
      <g transform="translate(0 -42)">
      {/* duty of care */}
      <line x1={14} y1={g} x2={420} y2={g} {...hair} />
      <SmallModel id={id} x={24} y={g - 72} w={58} h={72} />
      {cards.map((x, i) => (
        <g key={x}>
          <Listing id={id} x={x} y={g - 40} w={54} h={40} />
          {i < 2 ? <path d={tick(x + 27, g - 56, 7)} fill="none" {...ink} strokeWidth={LINE.bold} /> : null}
        </g>
      ))}
      <Lens id={id} cx={262} cy={g - 66} r={22} a={-Math.PI * 0.22} handle={24}>
        <line x1={250} y1={g - 70} x2={274} y2={g - 70} {...ink} />
        <line x1={250} y1={g - 62} x2={266} y2={g - 62} {...hair} />
      </Lens>
      <FigureName x={220} y={g + 24} size={15}>
        duty of care
      </FigureName>
      <line x1={446} y1={60} x2={446} y2={g + 22} {...hair} strokeDasharray={CENTRE_DASH} />
      {/* duty of loyalty */}
      <line x1={470} y1={g} x2={866} y2={g} {...hair} />
      <Figure id={id} x={500} y={g} s={1.55} arm="reach" />
      <SmallModel id={id} x={604} y={g - 72} w={62} h={72} />
      <path d={`M550 ${g - 79}Q578 ${g - 70} 604 ${g - 48}`} fill="none" {...ink} strokeWidth={LINE.bold} />
      <Hall id={id} x={770} y={g} w={70} h={92} />
      <Coins id={id} cx={744} y={g} n={6} rx={14} ry={4.5} h={5} />
      <path d={`M676 ${g - 48}Q690 ${g - 56} 698 ${g - 60}`} fill="none" stroke={R} strokeWidth={LINE.bold} />
      <path d={`M716 ${g - 64}Q728 ${g - 64} 736 ${g - 34}`} fill="none" stroke={R} strokeWidth={LINE.bold} />
      <path d={cross(707, g - 62, 5)} fill="none" stroke={R} strokeWidth={LINE.bold} />
      <FigureName x={668} y={g + 24} size={15}>
        duty of loyalty
      </FigureName>
      </g>
    </Frame>
  );
}

/**
 * Five work stations of a purchase, from suggesting candidates to paying.
 * The level slider moves the hand-over point: stations left of it are worked
 * by the agent housing, the rest by the shopper. At Level 4 the shopper
 * leaves the bench and stands outside a dashed fence of rules set in advance.
 */
export function DelegationLevels() {
  const [level, setLevel] = useState(1);
  const id = "w8-levels";
  const g = 182;
  const stations = ["Suggest", "Search", "Compare", "Choose", "Purchase"];
  const cut = [1, 3, 4, 5][level - 1];
  const cs = [170, 324, 478, 632, 786];
  const object = (i: number, c: number) => {
    const ox = c + 4;
    const top = 144;
    if (i === 0)
      return <Sheet id={id} x={ox} y={top} w={50} d={16} sk={12} lines={3} />;
    if (i === 1)
      return (
        <g>
          {[0, 1, 2, 3, 4].map((k) => (
            <Sheet key={k} id={id} x={ox} y={top - k * 5} w={50} d={16} sk={12} t={3} lines={k === 4 ? 2 : 0} />
          ))}
        </g>
      );
    if (i === 2)
      return (
        <g>
          <Listing id={id} x={ox} y={top - 30} w={30} h={28} />
          <Listing id={id} x={ox + 36} y={top - 30} w={30} h={28} />
        </g>
      );
    if (i === 3)
      return (
        <g>
          <Listing id={id} x={ox + 6} y={top - 30} w={36} h={28} />
          <path d={tick(ox + 58, top - 26, 7)} fill="none" {...ink} strokeWidth={LINE.bold} />
        </g>
      );
    return (
      <g>
        <path d={`M${ox + 2} ${top - 34}H${ox + 10}L${ox + 16} ${top - 10}H${ox + 46}L${ox + 52} ${top - 28}H${ox + 13}`} fill="none" {...ink} />
        <circle cx={ox + 20} cy={top - 4} r={3.5} fill={PAT.paper} {...ink} />
        <circle cx={ox + 42} cy={top - 4} r={3.5} fill={PAT.paper} {...ink} />
      </g>
    );
  };
  return (
    <div>
      <Frame
        width={880}
        height={160}
        label={`Patent drawing of five work stations in a row, suggest, search, compare, choose and purchase, each a plinth carrying its object: a summary sheet, a stack of catalog cards, two shortlisted listings, one listing with a tick, and a cart. Level ${level}: ${
          ["the agent works only the suggest station. The shopper stands at search, compare, choose and purchase.", "the agent works suggest, search and compare. The shopper chooses from the shortlist and purchases.", "the agent works every station up to choose. The shopper stands only at purchase, for the final confirmation.", "the agent works all five stations. The shopper stands outside, holding a sheet of rules, behind a dashed fence that encloses the bench."][level - 1]
        }`}
      >
        <PatentDefs id={id} />
        <g transform="translate(0 -58)">
        <line x1={10} y1={g} x2={870} y2={g} {...hair} />
        {level === 4 ? (
          <g>
            <rect x={96} y={100} width={780} height={g - 90} fill="none" {...hair} strokeDasharray="6 4" />
            <Figure id={id} x={38} y={g} s={1.35} arm="reach" />
            <g transform="rotate(-8 72 104)">
              <rect x={62} y={88} width={24} height={32} fill={PAT.paper} {...ink} />
              {[96, 103, 110].map((yy) => (
                <line key={yy} x1={66} y1={yy} x2={82} y2={yy} {...hair} />
              ))}
            </g>
          </g>
        ) : null}
        {cs.map((c, i) => (
          <g key={c}>
            {i < cut ? (
              <SmallModel id={id} x={c - 70} y={g - 60} w={50} h={60} />
            ) : (
              <Figure id={id} x={c - 46} y={g} s={1.35} arm="reach" />
            )}
            <ObliqueBox id={id} x={c - 4} y={150} w={78} h={g - 150} dx={10} dy={6} />
            {object(i, c)}
            <PatentKey x={c + 36} y={208} size={11}>
              {stations[i]}
            </PatentKey>
          </g>
        ))}
        </g>
      </Frame>
      <Slider label="Level of delegation" value={level} min={1} max={4} onChange={setLevel} />
    </div>
  );
}

/**
 * The dyad and the triad on one bench. In the dyad the shopper looks straight
 * at the platform's results page, sponsored badge and all. In the triad the
 * agent housing stands between them: it reads the page, and the shopper sees
 * only the single card it hands back. The badge (red) never reaches the eye.
 */
export function DyadTriad() {
  const [mode, setMode] = useState<"dyad" | "triad">("dyad");
  const id = "w8-triad";
  const triad = mode === "triad";
  const g = 262;
  const px = 244;
  const rows = [60, 124, 190];
  return (
    <div>
      <Frame
        width={500}
        height={292}
        label={
          triad
            ? "Patent drawing of the agentic triad. A shopper stands at left. An AI agent, a model housing with two gears, stands between the shopper and the platform's results page, a columned hall behind three hotel listings, one wearing a Sponsored badge drawn in red. The agent's dashed sight line reads the page. The shopper's sight line ends at the single listing card the agent hands out of its slot."
            : "Patent drawing of the dyad. A shopper stands at left and looks straight at the platform's results page: three hotel listings in front of a columned hall, one wearing a Sponsored badge. The shopper's dashed sight line reaches the page."
        }
      >
        <PatentDefs id={id} />
        <line x1={10} y1={g} x2={490} y2={g} {...hair} />
        {/* the platform behind its page */}
        <Hall id={id} x={410} y={g} w={64} h={124} />
        <path d={`M${px + 150} 46L${px + 158} 41V${g - 13}L${px + 150} ${g - 8}Z`} fill={stip(id, "dense")} {...ink} />
        <path d={`M${px} 46L${px + 8} 41H${px + 158}L${px + 150} 46Z`} fill={stip(id, "light")} {...ink} />
        <rect x={px} y={46} width={150} height={g - 54} fill={PAT.paper} {...ink} />
        {rows.map((y, i) => (
          <Listing key={y} id={id} x={px + 10} y={y + 8} w={126} h={38} badge={i === 1 ? "Sponsored" : undefined} red={triad && i === 1} />
        ))}
        {/* the shopper */}
        <Figure id={id} x={56} y={g} s={1.85} arm={triad ? "reach" : "down"} />
        {triad ? (
          <g>
            {/* the agent between them */}
            <SmallModel id={id} x={124} y={g - 76} w={72} h={76} />
            {/* agent reads the page */}
            <line x1={210} y1={g - 56} x2={px - 6} y2={g - 56} {...hair} strokeDasharray="4 3" />
            <path d={headAlongPath(px - 4, g - 56, 1, 0, 7)} fill="none" {...hair} />
            {/* the single card it hands back */}
            <Listing id={id} x={94} y={g - 136} w={100} h={36} />
            <line x1={66} y1={g - 136} x2={92} y2={g - 122} {...hair} strokeDasharray="4 3" />
          </g>
        ) : (
          <g>
            <line x1={66} y1={g - 138} x2={px - 6} y2={g - 138} {...hair} strokeDasharray="4 3" />
            <path d={headAlongPath(px - 4, g - 138, 1, 0, 7)} fill="none" {...hair} />
          </g>
        )}
        <FigureName x={250} y={286} size={14}>
          {triad ? "the agentic triad" : "the dyad"}
        </FigureName>
      </Frame>
      <Segmented
        label="Commerce"
        options={[
          { id: "dyad", label: "Dyad" },
          { id: "triad", label: "Agentic triad" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/**
 * Wadi and Ma (2026a): choice by rank at each configured reasoning effort,
 * for the four models whose choices show a middle penalty. Each bar is the
 * probability that the listing at that rank is booked, from the quadratic
 * linear probability model of choice (position and position² on rank / 100,
 * intercept set so the bars average 1 in 100, since every session books one
 * hotel). The joint Wald test of both position terms (χ²(2), 5% level)
 * decides the verdict. Cost per session is at list prices. The frontier
 * reference is Pro at its default high effort, $0.2825 per session.
 */
const EFFORT = {
  flashlite: {
    label: "Flash Lite",
    levels: [
      { name: "Minimal", b1: -0.0503, b2: 0.0418, chi: 60.36, cost: 0.0132 },
      { name: "Low", b1: -0.0276, b2: 0.0197, chi: 29.9, cost: 0.0114 },
      { name: "Medium", b1: -0.0095, b2: 0.0052, chi: 8.66, cost: 0.0125 },
      { name: "High", b1: 0.0023, b2: -0.001, chi: 0.68, cost: 0.0113 },
    ],
  },
  pro: {
    label: "Pro",
    levels: [
      { name: "Low", b1: -0.076, b2: 0.0638, chi: 107.21, cost: 0.037 },
      { name: "Medium", b1: -0.0237, b2: 0.0179, chi: 17.12, cost: 0.0622 },
      { name: "High", b1: -0.008, b2: 0.0071, chi: 1.56, cost: 0.2825 },
    ],
  },
  sonnet: {
    label: "Sonnet",
    levels: [
      { name: "Low", b1: -0.1565, b2: 0.1217, chi: 609.27, cost: 0.0623 },
      { name: "High", b1: -0.0051, b2: 0.0016, chi: 5.56, cost: 0.0956 },
    ],
  },
  luna: {
    label: "Luna",
    levels: [
      { name: "None", b1: -0.0729, b2: 0.0544, chi: 145.58, cost: 0.0051 },
      { name: "Medium", b1: -0.0652, b2: 0.0441, chi: 187.49, cost: 0.0061 },
      { name: "xHigh", b1: -0.0364, b2: 0.0202, chi: 120.06, cost: 0.01 },
    ],
  },
} as const;
type EffortModel = keyof typeof EFFORT;
const FRONTIER = 0.2825;

export function EffortLever() {
  const [model, setModel] = useState<EffortModel>("flashlite");
  const [lvl, setLvl] = useState(0);
  const id = "w8-effort";
  const levels = EFFORT[model].levels;
  const L = levels[Math.min(lvl, levels.length - 1)];
  const neutral = L.chi < 5.99;
  const a = 0.01 - L.b1 / 2 - L.b2 / 3;
  const p = (rank: number) => Math.max(0, a + L.b1 * (rank / 100) + L.b2 * (rank / 100) ** 2);
  const x0 = 150;
  const x1 = 540;
  const base = 190;
  const top = 40;
  const pmax = 0.05;
  const X = (rank: number) => r2(x0 + ((rank - 1) / 99) * (x1 - x0));
  const Y = (v: number) => r2(base - (Math.min(v, pmax) / pmax) * (base - top));
  const frac = levels.length > 1 ? Math.min(lvl, levels.length - 1) / (levels.length - 1) : 1;
  const deg = r2(-70 + frac * 140);
  const share = (L.cost / FRONTIER) * 100;
  return (
    <div>
      <Frame
        width={560}
        height={286}
        label={`Patent drawing of reasoning effort as a lever. An AI agent housing at left carries a dial set to ${L.name} effort for ${EFFORT[model].label}. At right, a comb of 100 bars gives the probability that the listing at each rank is booked, against a dashed line at 1 in 100. ${
          neutral ? "The bars run level with the line: choice is position-neutral" : "The bars sag through the middle ranks: choice is position-dependent, keyed in red"
        } (chi-square ${L.chi.toFixed(2)}). Cost per session: $${L.cost.toFixed(4)}, ${share.toFixed(0)} percent of Pro at its default high effort.`}
      >
        <PatentDefs id={id} />
        {/* the agent and its effort dial */}
        <ObliqueBox id={id} x={16} y={78} w={100} h={112} dx={10} dy={6} />
        <Dial cx={62} cy={122} r={30} deg={deg} />
        <Gear cx={96} cy={170} r={9} n={9} />
        <line x1={14} y1={base} x2={x1 + 6} y2={base} {...hair} />
        {/* the comb of choice by rank */}
        <line x1={x0 - 8} y1={top - 4} x2={x0 - 8} y2={base} {...ink} />
        {[0.01, 0.05].map((v) => (
          <g key={v}>
            <line x1={x0 - 13} y1={Y(v)} x2={x0 - 8} y2={Y(v)} {...ink} />
            <Num x={x0 - 17} y={Y(v) + 4} size={12} anchor="end">
              {`${Math.round(v * 100)}%`}
            </Num>
          </g>
        ))}
        {Array.from({ length: 100 }, (_, i) => {
          const rank = i + 1;
          return <line key={i} x1={X(rank)} y1={base} x2={X(rank)} y2={Y(p(rank))} stroke={neutral ? PAT.ink : R} strokeWidth={2.2} style={{ transition: "all 400ms ease" }} />;
        })}
        <line x1={x0 - 8} y1={Y(0.01)} x2={x1 + 6} y2={Y(0.01)} {...ink} strokeDasharray="5 3" />
        {[1, 50, 100].map((rank) => (
          <Num key={rank} x={X(rank)} y={base + 16} size={12}>
            {rank}
          </Num>
        ))}
        <PatentKey x={x1} y={base + 30} size={11} anchor="end">
          Rank
        </PatentKey>
        <PatentKey x={x0} y={top - 14} size={11} anchor="start">
          Probability of choice
        </PatentKey>
        {/* verdict and cost */}
        <line x1={14} y1={232} x2={546} y2={232} {...hair} />
        <PatentKey x={16} y={262} size={12} anchor="start" fill={neutral ? PAT.ink : R}>
          {neutral ? "Position-neutral" : "Position-dependent"}
        </PatentKey>
        <Num x={16} y={280} size={12} anchor="start">
          {`χ²(2) = ${L.chi.toFixed(2)}`}
        </Num>
        <Num x={336} y={264} size={20} anchor="start">
          {`$${L.cost.toFixed(4)}`}
        </Num>
        <Num x={336} y={282} size={12} anchor="start">
          {`${share < 10 ? share.toFixed(1) : share.toFixed(0)}% of Pro at high effort`}
        </Num>
        <PatentKey x={436} y={263} size={11} anchor="start">
          Per session
        </PatentKey>
      </Frame>
      <Segmented
        label="Model"
        options={(Object.keys(EFFORT) as EffortModel[]).map((k) => ({ id: k, label: EFFORT[k].label }))}
        value={model}
        onChange={(m) => {
          setModel(m);
          setLvl(0);
        }}
      />
      <Slider
        label="Reasoning effort"
        value={Math.min(lvl, levels.length - 1)}
        min={0}
        max={levels.length - 1}
        onChange={setLvl}
        formatValue={(v) => levels[v].name}
      />
    </div>
  );
}

/**
 * A human scanning a 100-item results page from the top. The gaze cone takes
 * in only the first rows above the screen fold, one of which is clicked. The
 * rest of the page (dashed, below the fold) is never reached. A red bracket
 * marks the few top ranks that form the consideration set.
 */
export function HumanScan() {
  const id = "w8-scan";
  const g = 292;
  const px = 150;
  const pw = 134;
  const rows = 22;
  const ry = (i: number) => r2(16 + i * 12.2);
  const fold = ry(7) - 3;
  return (
    <Frame
      width={470}
      height={300}
      label="Patent drawing of a human shopper scanning a results page of 100 listings, numbered 1 at the top and 100 at the bottom. A stippled gaze cone from the shopper's eye covers only the first three rows. A pointer clicks the second. A centre line marks the screen fold, and the rows below it are drawn dashed. A red bracket beside the first three rows is keyed consideration set. Beside it, 1.12 clicks."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={g} x2={460} y2={g} {...hair} />
      {/* gaze cone */}
      <path d={`M70 140L${px} ${ry(0) - 2}L${px} ${ry(3) - 2}Z`} fill={stip(id, "light")} stroke="none" />
      <line x1={70} y1={140} x2={px} y2={ry(0) - 2} {...hair} strokeDasharray="4 3" />
      <line x1={70} y1={140} x2={px} y2={ry(3) - 2} {...hair} strokeDasharray="4 3" />
      {/* the page */}
      <path d={`M${px + pw} 10L${px + pw + 8} 5V${g - 6}L${px + pw} ${g - 1}Z`} fill={stip(id, "dense")} {...ink} />
      <rect x={px} y={10} width={pw} height={g - 11} fill={PAT.paper} {...ink} />
      {Array.from({ length: rows }, (_, i) => {
        const below = ry(i) > fold;
        return (
          <g key={i}>
            <rect x={px + 28} y={ry(i)} width={pw - 36} height={8} fill={PAT.paper} {...hair} strokeDasharray={below ? "2 2.5" : undefined} />
          </g>
        );
      })}
      <Num x={px + 5} y={ry(0) + 8} size={12} anchor="start">
        1
      </Num>
      <Num x={px + 4} y={ry(rows - 1) + 8} size={12} anchor="start">
        100
      </Num>
      <line x1={px - 6} y1={fold} x2={px + pw + 12} y2={fold} {...hair} strokeDasharray={CENTRE_DASH} />
      {/* the click */}
      <path d={`M${px + 96} ${ry(1) + 3}V${ry(1) + 19}L${px + 100} ${ry(1) + 15}L${px + 103.5} ${ry(1) + 22}L${px + 106} ${ry(1) + 21}L${px + 103} ${ry(1) + 14}H${px + 108}Z`} fill={PAT.paper} {...ink} strokeLinejoin="round" />
      {/* consideration set */}
      <path d={`M${px + pw + 16} ${ry(0)}H${px + pw + 24}V${ry(2) + 8}H${px + pw + 16}`} fill="none" stroke={R} strokeWidth={LINE.bold} />
      <PatentKey x={px + pw + 32} y={ry(0) + 9} size={12} anchor="start" fill={R}>
        Consideration
      </PatentKey>
      <PatentKey x={px + pw + 32} y={ry(2) + 4} size={12} anchor="start" fill={R}>
        set
      </PatentKey>
      <Num x={px + pw + 32} y={ry(5) + 4} size={20} anchor="start">
        1.12
      </Num>
      <PatentKey x={px + pw + 78} y={ry(5) + 4} size={12} anchor="start">
        Clicks
      </PatentKey>
      {/* the shopper */}
      <Figure id={id} x={62} y={g} s={2.05} />
    </Frame>
  );
}

/**
 * Wadi and Ma (2026a), 500 sessions per model at its default reasoning
 * effort. Curves are the quadratic linear probability models of inspection
 * (Table "effort-ols-sq-inspected": position and position² on rank / 100),
 * with the intercept set so the curve averages the model's mean inspections
 * per session over 100 listings (controls at their means). The human
 * reference is Ursu (2018): 0.0019 lower click probability per rank across a
 * page of about 27 listings, averaging 1.12 clicks. The rank 62 to 81 trough
 * is marked in red on the rank strip.
 */
const AGENTS = {
  flashlite: { label: "Flash Lite", mean: 3.12, b1: -0.146, b2: 0.0982 },
  flash: { label: "Flash", mean: 4.25, b1: -0.1356, b2: 0.0993 },
  pro: { label: "Pro", mean: 5.83, b1: -0.0567, b2: 0.0276 },
  sonnet: { label: "Sonnet", mean: 1.63, b1: -0.0643, b2: 0.0454 },
  luna: { label: "Luna", mean: 4.0, b1: -0.1867, b2: 0.1272 },
} as const;
type AgentKey = keyof typeof AGENTS;

export function InspectionCurve() {
  const [who, setWho] = useState<AgentKey>("flashlite");
  const id = "w8-curve";
  const m = AGENTS[who];
  const a = m.mean / 100 - m.b1 / 2 - m.b2 / 3;
  const f = (rank: number) => {
    const x = rank / 100;
    return a + m.b1 * x + m.b2 * x * x;
  };
  const x0 = 64;
  const x1 = 536;
  const y0 = 196;
  const yTop = 34;
  const pmax = 0.1;
  const X = (rank: number) => r2(x0 + ((rank - 1) / 99) * (x1 - x0));
  const Y = (p: number) => r2(y0 - (p / pmax) * (y0 - yTop));
  const pts = Array.from({ length: 100 }, (_, i) => `${X(i + 1)} ${Y(f(i + 1))}`);
  const human = (rank: number) => 1.12 / 27 - 0.0019 * (rank - 14);
  let minRank = 1;
  for (let r = 1; r <= 100; r++) if (f(r) < f(minRank)) minRank = r;
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={`Patent drawing of inspection probability by rank on a 100-listing hotel page. The ${m.label} agent's curve, a stippled volume, starts at ${(f(1) * 100).toFixed(1)} percent at rank 1 and ${minRank < 100 ? `falls to its lowest point at rank ${minRank}, then rises again toward rank 100` : "declines gently to rank 100"}. A dashed human reference line falls from 6.6 percent at rank 1 to 1.7 percent at rank 27, where the human page ends. Ranks 62 to 81 are marked in red on the rank strip. Below: ${m.label} inspects ${m.mean.toFixed(2)} listings per session against 1.12 for humans, and ends 0 percent of sessions without booking against 34 percent for humans.`}
      >
        <PatentDefs id={id} />
        {/* axes */}
        <line x1={x0} y1={yTop - 6} x2={x0} y2={y0} {...ink} />
        {[0, 0.05, 0.1].map((p) => (
          <g key={p}>
            <line x1={x0 - 5} y1={Y(p)} x2={x0} y2={Y(p)} {...ink} />
            <Num x={x0 - 9} y={Y(p) + 4} size={12} anchor="end">
              {`${Math.round(p * 100)}%`}
            </Num>
          </g>
        ))}
        <PatentKey x={x0 + 8} y={yTop - 14} size={12} anchor="start">
          Probability of inspection
        </PatentKey>
        {/* the rank strip */}
        {Array.from({ length: 100 }, (_, i) => {
          const rank = i + 1;
          const trough = rank >= 62 && rank <= 81;
          return (
            <rect
              key={i}
              x={r2(X(rank) - 1.9)}
              y={y0 + 4}
              width={3.8}
              height={12}
              fill={trough ? stip(id, "signal") : PAT.paper}
              stroke={trough ? R : PAT.ink}
              strokeWidth={LINE.hair}
            />
          );
        })}
        <path d={`M${X(62) - 2} ${y0 + 22}V${y0 + 26}H${X(81) + 2}V${y0 + 22}`} fill="none" stroke={R} strokeWidth={LINE.outline} />
        <Num x={r2((X(62) + X(81)) / 2)} y={y0 + 40} size={13} fill={R}>
          62 to 81
        </Num>
        {[1, 25, 50, 100].map((rank) => (
          <Num key={rank} x={X(rank)} y={y0 + 32} size={12}>
            {rank}
          </Num>
        ))}
        <PatentKey x={x1} y={y0 + 52} size={12} anchor="end">
          Rank
        </PatentKey>
        {/* the agent's curve as a volume */}
        <path d={`M${X(1)} ${y0}L${pts.join("L")}L${X(100)} ${y0}Z`} fill={stip(id, "light")} stroke="none" style={{ transition: "all 400ms ease" }} />
        <path d={`M${pts.join("L")}`} fill="none" {...ink} strokeWidth={LINE.bold} />
        {/* the human reference */}
        <line x1={X(1)} y1={Y(human(1))} x2={X(27)} y2={Y(human(27))} {...ink} strokeDasharray="5 3" />
        <circle cx={X(27)} cy={Y(human(27))} r={2.5} fill={PAT.paper} {...ink} />
        <FigureName x={r2(X(27) + 8)} y={r2(Y(human(27)) + 5)} anchor="start" size={13}>
          human
        </FigureName>
        <FigureName x={X(96)} y={r2(Y(f(96)) - 10)} anchor="end" size={13}>
          {m.label}
        </FigureName>
        {/* search depth and the no-buy option */}
        <line x1={14} y1={250} x2={546} y2={250} {...hair} />
        <PatentKey x={x0} y={272} size={12} anchor="start">
          Listings inspected
        </PatentKey>
        <Num x={x0 + 214} y={274} size={20} anchor="start">
          {m.mean.toFixed(2)}
        </Num>
        <Num x={x0 + 214} y={292} size={12} anchor="start">
          human 1.12
        </Num>
        <PatentKey x={330} y={272} size={12} anchor="start">
          No booking
        </PatentKey>
        <Num x={460} y={274} size={20} anchor="start">
          0%
        </Num>
        <Num x={460} y={292} size={12} anchor="start">
          human 34%
        </Num>
      </Frame>
      <Segmented
        label="AI agent"
        options={(Object.keys(AGENTS) as AgentKey[]).map((k) => ({ id: k, label: AGENTS[k].label }))}
        value={who}
        onChange={setWho}
      />
    </div>
  );
}

/**
 * The invariance test as a balance. The agent housing carries a beam that
 * weighs a sponsored listing against a matched organic one. The system
 * prompt pinned beside it names the employer. Swapping the employer should
 * leave the pointer where it was. Under the platform it swings toward the
 * paid listing: the shift is drawn as a red arc from the traveler reading.
 */
export function InvarianceBalance() {
  const [who, setWho] = useState<"traveler" | "platform">("traveler");
  const id = "w8-invariance";
  const platform = who === "platform";
  const px = 330;
  const py = 106;
  const half = 150;
  const tilt = (deg: number) => (deg * Math.PI) / 180;
  const base = 13;
  const deg = platform ? 4 : base;
  const a = tilt(deg);
  const ends = [-1, 1].map((s) => ({ x: r2(px + s * half * Math.cos(a)), y: r2(py + s * half * Math.sin(a)) }));
  const pointer = (d: number, len = 78) => ({ x: r2(px + Math.sin(tilt(d)) * len), y: r2(py - Math.cos(tilt(d)) * len) });
  const p = pointer(deg);
  const p0 = pointer(base);
  const arcR = 78;
  return (
    <div>
      <Frame
        width={560}
        height={292}
        label={`Patent drawing of a balance standing on an AI agent housing. The beam weighs a sponsored hotel listing on the left pan against a matched organic listing on the right pan. A pointer rises from the pivot against a graduated arc. A system prompt pinned beside the housing reads: You have been employed by ${platform ? "a hotel booking platform" : "a traveler"}. ${
          platform
            ? "With the platform named, the beam has swung back toward the sponsored listing. A dashed pointer marks the reading under the traveler and a red arc marks the shift between them."
            : "With the traveler named, the sponsored listing's pan rides high: the paid listing is weighed down in the agent's judgment."
        }`}
      >
        <PatentDefs id={id} />
        <line x1={10} y1={282} x2={550} y2={282} {...hair} />
        {/* the prompt that names the employer */}
        {/* the agent housing, its column and the prompt on its face */}
        <ObliqueBox id={id} x={px - 5} y={py + 6} w={10} h={210 - py - 6} dx={4} dy={2.5} />
        <ObliqueBox id={id} x={150} y={212} w={330} h={70} dx={12} dy={7} />
        <Gear cx={436} cy={238} r={13} n={10} />
        <Gear cx={460} cy={262} r={9} n={8} phase={0.25} />
        <PromptSheet
          id={id}
          x={162}
          y={220}
          w={238}
          h={54}
          size={13}
          lines={[{ t: "You have been employed by" }, { t: platform ? "a hotel booking platform." : "a traveler.", red: platform }]}
        />
        {/* graduated arc for the pointer */}
        {[-20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20].map((t) => {
          const o = pointer(t, arcR + 4);
          const i = pointer(t, arcR + (t === 0 ? 16 : 11));
          return <line key={t} x1={o.x} y1={o.y} x2={i.x} y2={i.y} {...(t === 0 ? ink : hair)} />;
        })}
        {/* beam, pans and the two listings */}
        <line x1={ends[0].x} y1={ends[0].y} x2={ends[1].x} y2={ends[1].y} {...ink} strokeWidth={LINE.bold} style={{ transition: "all 400ms ease" }} />
        {ends.map((e, i) => {
          const panY = r2(e.y + 54);
          return (
            <g key={i} style={{ transition: "all 400ms ease" }}>
              <line x1={e.x} y1={e.y} x2={r2(e.x - 44)} y2={panY} {...hair} />
              <line x1={e.x} y1={e.y} x2={r2(e.x + 44)} y2={panY} {...hair} />
              <path d={`M${r2(e.x - 52)} ${panY}Q${e.x} ${r2(panY + 14)} ${r2(e.x + 52)} ${panY}`} fill={stip(id, "dense")} {...ink} />
              <ellipse cx={e.x} cy={panY} rx={52} ry={4} fill={PAT.paper} {...ink} />
              <Listing id={id} x={r2(e.x - 46)} y={r2(panY - 44)} w={86} h={40} badge={i === 0 ? "Sponsored" : undefined} badgeSize={11} />
            </g>
          );
        })}
        {/* the pointer */}
        {platform ? (
          <g>
            <line x1={px} y1={py} x2={p0.x} y2={p0.y} {...hair} strokeDasharray="3 3" />
            <path
              d={`M${pointer(base, arcR - 6).x} ${pointer(base, arcR - 6).y}A${arcR - 6} ${arcR - 6} 0 0 0 ${pointer(deg, arcR - 6).x} ${pointer(deg, arcR - 6).y}`}
              fill="none"
              stroke={R}
              strokeWidth={LINE.bold}
            />
          </g>
        ) : null}
        <line x1={px} y1={py} x2={p.x} y2={p.y} stroke={platform ? R : PAT.ink} strokeWidth={LINE.bold} style={{ transition: "all 400ms ease" }} />
        <circle cx={px} cy={py} r={4} fill={PAT.paper} {...ink} />
      </Frame>
      <Segmented
        label="Named employer"
        options={[
          { id: "traveler", label: "Traveler" },
          { id: "platform", label: "Booking platform" },
        ]}
        value={who}
        onChange={setWho}
      />
    </div>
  );
}

/**
 * Study 2 of Wadi and Ma (2026c), Table 14 (Gemini 3.1 Pro, 500 runs per
 * cell). Students build the badge on the target listing (Promoted or
 * Sponsored, with or without "by the platform") and read the share of runs
 * in which each delegate picks it. The platform delegate's cylinder and the
 * gap between the two delegates are drawn in red.
 */
const LABEL_SHARE = {
  promoted: { no: [0.288, 0.396], yes: [0.346, 0.742] },
  sponsored: { no: [0.008, 0.014], yes: [0.036, 0.212] },
} as const;

export function LabelBuilder() {
  const [type, setType] = useState<"promoted" | "sponsored">("promoted");
  const [attr, setAttr] = useState<"platform"[]>(["platform"]);
  const id = "w8-label";
  const by = attr.includes("platform");
  const [cons, plat] = LABEL_SHARE[type][by ? "yes" : "no"];
  const word = type === "promoted" ? "Promoted" : "Sponsored";
  const badge = by ? `${word} By the platform` : word;
  const base = 226;
  const H = 176;
  const max = 0.9;
  const yOf = (v: number) => r2(base - (v / max) * H);
  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
  const gap = r2((plat - cons) * 100);
  const cx = [358, 478];
  return (
    <div>
      <Frame
        width={560}
        height={268}
        label={`Patent drawing of a hotel listing whose badge reads ${badge.toLowerCase()}, beside two graduated cylinders: the share of runs in which the consumer-delegated agent picks the listing, ${pct(cons)}, and the share for the platform-delegated agent, ${pct(plat)}, drawn in red. A dashed line marks 50 percent. A red bracket between the two levels marks a gap of ${gap.toFixed(1)} percentage points.`}
      >
        <PatentDefs id={id} />
        {/* the listing and its badge */}
        <Listing id={id} x={10} y={112} w={266} h={78} badge={badge} badgeSize={11} />
        {/* the two delegates */}
        <line x1={322} y1={yOf(0.5)} x2={506} y2={yOf(0.5)} {...hair} strokeDasharray="5 3" />
        <Num x={318} y={yOf(0.5) + 4} size={13} anchor="end">
          50%
        </Num>
        <Cylinder id={id} cx={cx[0]} base={base} h={H} rate={cons} max={max} rx={26} />
        <Cylinder id={id} cx={cx[1]} base={base} h={H} rate={plat} max={max} rx={26} red />
        <Num x={cx[0] + 4} y={yOf(cons) - 10} size={15}>
          {pct(cons)}
        </Num>
        <Num x={cx[1] + 4} y={yOf(plat) - 10} size={15} fill={R}>
          {pct(plat)}
        </Num>
        <path d={`M508 ${yOf(plat)}H520V${yOf(cons)}H508`} fill="none" stroke={R} strokeWidth={LINE.bold} style={{ transition: "all 400ms ease" }} />
        <line x1={384} y1={yOf(cons)} x2={506} y2={yOf(cons)} stroke={R} strokeWidth={LINE.hair} strokeDasharray="2 3" />
        <Num x={523} y={r2((yOf(plat) + yOf(cons)) / 2 + 5)} size={13} anchor="start" fill={R}>
          {`+${gap.toFixed(1)}`}
        </Num>
        {[["Consumer", "delegated"], ["Platform", "delegated"]].map((k, i) => (
          <g key={i}>
            <PatentKey x={cx[i]} y={248} size={11}>
              {k[0]}
            </PatentKey>
            <PatentKey x={cx[i]} y={263} size={11}>
              {k[1]}
            </PatentKey>
          </g>
        ))}
      </Frame>
      <Segmented
        label="Disclosure"
        options={[
          { id: "promoted", label: "Promoted" },
          { id: "sponsored", label: "Sponsored" },
        ]}
        value={type}
        onChange={setType}
      />
      <Toggles label="Platform attribution" options={[{ id: "platform", label: "By the platform" }]} value={attr} onChange={setAttr} />
    </div>
  );
}

/**
 * The Persuasion Knowledge Model at a human shopper's eye. The prominence
 * slider grows the "Sponsored" label from a faint tag to a bold plate. Below
 * the noticing point the shopper's gaze lands on the listing's claim. Once
 * the label is noticed the gaze lands on it, the claim is struck through in
 * red (discounted) and a second gaze goes to the organic listing below.
 */
export function LabelProminence() {
  const [p, setP] = useState(1);
  const id = "w8-pkm";
  const noticed = p >= 3;
  const g = 292;
  const size = [10.6, 11.5, 13, 15.5, 18][p - 1];
  const bw = r2(labelWidth("Sponsored", size) + 10);
  const bh = r2(size + 8);
  const cx = 196;
  const cy = 62;
  const eye = { x: 78, y: 128 };
  return (
    <div>
      <Frame
        width={560}
        height={262}
        label={`Patent drawing of a shopper reading a sponsored hotel listing whose card claims: Best hotel in town. Its Sponsored label is drawn at prominence ${p} of 5. ${
          noticed
            ? "The shopper's dashed gaze lands on the label. The claim is struck through in red, and a second gaze goes to the organic listing below."
            : "The label is small and faint. The shopper's dashed gaze passes it and lands on the claim."
        }`}
      >
        <PatentDefs id={id} />
        <g transform="translate(0 -40)">
        <line x1={10} y1={g} x2={550} y2={g} {...hair} />
        {/* the sponsored listing */}
        <ObliqueBox id={id} x={cx} y={cy} w={330} h={116} dx={8} dy={5} />
        <path d={`M${cx + 228} ${cy + 100}V${cy + 50}L${cx + 262} ${cy + 22}L${cx + 296} ${cy + 50}V${cy + 100}Z`} fill={PAT.paper} {...ink} />
        <rect x={cx + 254} y={cy + 78} width={16} height={22} fill={PAT.paper} {...hair} />
        <text x={cx + 16} y={cy + 66} fontFamily="var(--font-body)" fontStyle="italic" fontSize={19} fill={PAT.ink}>
          Best hotel in town!
        </text>
        {noticed ? <line x1={cx + 12} y1={cy + 60} x2={cx + 198} y2={cy + 60} stroke={R} strokeWidth={LINE.bold} /> : null}
        {Array.from({ length: 5 }, (_, j) => (
          <path key={j} d={star(cx + 24 + j * 16, cy + 88, 5.5)} fill={PAT.ink} stroke={PAT.ink} strokeWidth={LINE.hair} strokeLinejoin="round" />
        ))}
        <line x1={cx + 16} y1={cy + 104} x2={cx + 150} y2={cy + 104} {...hair} />
        {/* the label */}
        <g>
          <rect
            x={cx + 12}
            y={r2(cy + 8)}
            width={bw}
            height={bh}
            fill={PAT.paper}
            stroke={PAT.ink}
            strokeWidth={p >= 4 ? LINE.bold : LINE.hair}
            strokeDasharray={p <= 2 ? "1.5 2" : undefined}
          />
          <PatentKey x={r2(cx + 12 + bw / 2 + size * 0.11)} y={r2(cy + 8 + bh / 2 + size * 0.36)} size={size}>
            Sponsored
          </PatentKey>
        </g>
        {/* the organic alternative */}
        <Listing id={id} x={cx + 60} y={210} w={240} h={62} />
        {/* the shopper and the gaze */}
        <Figure id={id} x={70} y={g} s={2.2} />
        {noticed ? (
          <g>
            <line x1={eye.x} y1={eye.y} x2={cx + 8} y2={r2(cy + 8 + bh / 2)} {...hair} strokeDasharray="4 3" />
            <line x1={eye.x} y1={eye.y + 4} x2={cx + 56} y2={238} {...hair} strokeDasharray="4 3" />
          </g>
        ) : (
          <line x1={eye.x} y1={eye.y} x2={cx + 10} y2={cy + 58} {...hair} strokeDasharray="4 3" />
        )}
        </g>
      </Frame>
      <Slider label="Label prominence" value={p} min={1} max={5} onChange={setP} />
    </div>
  );
}

/**
 * What the principal can observe. The shopper sees one recommended listing on
 * a stand. Behind a roller shutter lies everything the agent worked from: a
 * board of one hundred listings and the system prompt. Rolling the shutter up
 * shows the pick (ticked) and, in red, a better listing it passed over.
 */
export function PassedOver() {
  const [view, setView] = useState<"principal" | "agent">("principal");
  const id = "w8-passed";
  const open = view === "agent";
  const g = 290;
  const bx = 282;
  const by = 54;
  const pick = 13;
  const best = 97;
  const cell = (i: number) => ({ x: bx + (i % 10) * 25, y: by + Math.floor(i / 10) * 17 });
  const shutterTop = 38;
  const shutterBottom = open ? 44 : g - 2;
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={
          open
            ? "Patent drawing of a principal-agent relationship with the shutter rolled up. The shopper at left sees one recommended listing on a stand, handed over by the AI agent housing. Behind the raised roller shutter: a board of one hundred listings, the pick marked with a tick, and one listing the agent passed over drawn in red with more stars and a lower price. Below the board, the system prompt that governed the evaluation."
            : "Patent drawing of a principal-agent relationship. The shopper at left sees one recommended listing on a stand, handed over by the AI agent housing. Everything else sits behind a closed roller shutter."
        }
      >
        <PatentDefs id={id} />
        <line x1={10} y1={g} x2={550} y2={g} {...hair} />
        {/* the board of listings and the system prompt */}
        <rect x={bx - 10} y={by - 10} width={262} height={186} fill={PAT.paper} {...ink} />
        {Array.from({ length: 100 }, (_, i) => {
          const { x, y } = cell(i);
          const red = i === best;
          const c = red ? R : PAT.ink;
          return (
            <g key={i}>
              <rect x={x} y={y} width={20} height={12} fill={red ? stip(id, "signal") : PAT.paper} stroke={c} strokeWidth={red || i === pick ? LINE.bold : LINE.hair} />
              <line x1={x + 4} y1={y + 6} x2={x + 16} y2={y + 6} stroke={c} strokeWidth={LINE.hair} />
            </g>
          );
        })}
        <path d={tick(cell(pick).x + 10, cell(pick).y + 6, 4)} fill="none" {...ink} strokeWidth={LINE.bold} />
        <PromptSheet id={id} x={bx - 10} y={by + 186} w={112} h={42} lines={[{ t: "" }, { t: "" }]} gap={12} />
        {open ? (
          <g>
            <line x1={cell(best).x + 10} y1={cell(best).y + 12} x2={cell(best).x + 10} y2={by + 184} stroke={R} strokeWidth={LINE.hair} />
            <Listing id={id} x={cell(best).x - 54} y={by + 184} w={104} h={50} stars={5} price="$180" stroke={R} />
          </g>
        ) : null}
        {/* the roller shutter */}
        <rect x={bx - 16} y={shutterTop} width={274} height={r2(shutterBottom - shutterTop)} fill={PAT.paper} {...ink} />
        {Array.from({ length: Math.max(0, Math.floor((shutterBottom - shutterTop - 6) / 9)) }, (_, k) => (
          <line key={k} x1={bx - 16} y1={shutterTop + 9 + k * 9} x2={bx + 258} y2={shutterTop + 9 + k * 9} {...hair} />
        ))}
        <path d={`M${bx - 20} ${shutterTop}V${shutterTop - 14}H${bx + 262}V${shutterTop}`} fill={PAT.paper} {...ink} />
        <path d={`M${bx - 20} ${shutterTop - 14}L${bx - 12} ${shutterTop - 20}H${bx + 270}L${bx + 262} ${shutterTop - 14}Z`} fill={stip(id, "light")} {...ink} />
        <path d={`M${bx + 262} ${shutterTop - 14}L${bx + 270} ${shutterTop - 20}V${shutterTop - 6}L${bx + 262} ${shutterTop}Z`} fill={stip(id, "dense")} {...ink} />
        {/* the agent and the one card it hands over */}
        <SmallModel id={id} x={188} y={g - 82} w={64} h={82} />
        <line x1={130} y1={g} x2={130} y2={196} {...ink} strokeWidth={LINE.bold} />
        <Listing id={id} x={76} y={146} w={104} h={50} price="$240" />
        {/* the shopper */}
        <Figure id={id} x={42} y={g} s={1.9} />
        <line x1={50} y1={g - 144} x2={74} y2={g - 128} {...hair} strokeDasharray="4 3" />
      </Frame>
      <Segmented
        label="View"
        options={[
          { id: "principal", label: "What the principal sees" },
          { id: "agent", label: "What the agent worked from" },
        ]}
        value={view}
        onChange={setView}
      />
    </div>
  );
}

/**
 * Two plates for the dual-agency slide. "fee": a click on the sponsored
 * listing drops a coin (red) down a chute into the platform's slot. The same
 * click on an organic listing drops nothing. "prompt": the role definition
 * at the head of an enterprise system prompt, its platform name in red,
 * feeding the agent housing.
 */
export function PayPerClick({ part }: { part: "fee" | "prompt" }) {
  const id = `w8-ppc-${part}`;
  if (part === "prompt") {
    return (
      <Frame
        width={480}
        height={176}
        label="Patent drawing of an enterprise system prompt: a sheet whose first lines read, You are a helpful shopping assistant for [Platform Name], with the platform name in red, followed by hairline rows of further instructions. A dashed line runs from the sheet into the slot of the AI agent housing beside it."
      >
        <PatentDefs id={id} />
        <PromptSheet
          id={id}
          x={14}
          y={14}
          w={330}
          h={146}
          size={15}
          gap={22}
          lines={[{ t: "You are a helpful shopping assistant" }, { t: "for [Platform Name]," , red: true }, { t: "" }, { t: "" }, { t: "" }, { t: "" }]}
        />
        <SmallModel id={id} x={384} y={80} w={80} h={84} />
        <rect x={384} y={96} width={3} height={22} fill={PAT.ink} stroke="none" />
        <line x1={352} y1={107} x2={380} y2={107} {...hair} strokeDasharray="4 3" />
        <path d={headAlongPath(382, 107, 1, 0, 7)} fill="none" {...hair} />
      </Frame>
    );
  }
  const cursor = (x: number, y: number) => (
    <path d={`M${x} ${y}V${y + 20}L${x + 5} ${y + 15}L${x + 9} ${y + 24}L${x + 12.5} ${y + 22.5}L${x + 8.5} ${y + 14}H${x + 15}Z`} fill={PAT.paper} {...ink} strokeLinejoin="round" />
  );
  return (
    <Frame
      width={480}
      height={196}
      label="Patent drawing of pay-per-click fees. Two hotel listings stand at left, each under a pointer that clicks it. From the sponsored listing a red coin travels along a dashed red path into the coin slot of the platform's columned hall at right. The organic listing below sends nothing."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={188} x2={470} y2={188} {...hair} />
      <Hall id={id} x={360} y={188} w={92} h={110} slot />
      <Listing id={id} x={14} y={46} w={164} h={52} badge="Sponsored" badgeSize={12} />
      <Listing id={id} x={14} y={124} w={164} h={52} />
      {cursor(146, 66)}
      {cursor(146, 144)}
      {/* the fee */}
      <path d="M192 72Q300 10 404 60" fill="none" stroke={R} strokeWidth={LINE.outline} strokeDasharray="5 4" />
      <path d={headAlongPath(405, 62, 0.6, 0.8, 8)} fill="none" stroke={R} strokeWidth={LINE.outline} />
      <ellipse cx={298} cy={37} rx={13} ry={4.5} fill={stip(id, "signal")} stroke={R} strokeWidth={LINE.outline} />
      <path d="M285 37V42A13 4.5 0 0 0 311 42V37" fill={PAT.paper} stroke={R} strokeWidth={LINE.outline} />
    </Frame>
  );
}

/**
 * Study 1 of Wadi and Ma (2026c), Gemini 3.1 Pro, 500 runs per cell. Left:
 * choice share of the target hotel when organic and when tagged sponsored
 * (Table 3), with the sponsorship penalty bracketed. Right: the coded
 * skepticism toward the sponsored target in the pre-choice reasoning traces
 * (Table 6, 1 to 7). Switching the employer from traveler to platform
 * shrinks the penalty from 50.2 to 29.2 points (red) and drops skepticism.
 */
const ROLE = {
  traveler: { organic: 0.53, sponsored: 0.028, skeptic: 5.62 },
  platform: { organic: 0.542, sponsored: 0.25, skeptic: 4.16 },
} as const;

export function RoleAssignment() {
  const [who, setWho] = useState<"traveler" | "platform">("traveler");
  const id = "w8-role";
  const d = ROLE[who];
  const other = ROLE[who === "traveler" ? "platform" : "traveler"];
  const platform = who === "platform";
  const c = platform ? R : PAT.ink;
  const base = 222;
  const H = 168;
  const max = 0.7;
  const yOf = (v: number) => r2(base - (v / max) * H);
  const pen = r2((d.organic - d.sponsored) * 100);
  // the gauge
  const gx = 430;
  const gy = 196;
  const gr = 92;
  const ang = (v: number) => Math.PI * (17 / 18) - ((v - 1) / 6) * Math.PI * (8 / 9);
  const at = (v: number, r: number) => ({ x: r2(gx + Math.cos(ang(v)) * r), y: r2(gy - Math.sin(ang(v)) * r) });
  const needle = at(d.skeptic, gr - 14);
  const ghost = at(other.skeptic, gr - 14);
  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
  return (
    <div>
      <Frame
        width={560}
        height={262}
        label={`Patent drawing of the role-assignment experiment, ${platform ? "agent employed by the booking platform" : "agent employed by the traveler"}. Left: two graduated cylinders of choice share, the organic target at ${pct(d.organic)} and the sponsored target at ${pct(d.sponsored)}. A bracket between their levels marks the sponsorship penalty of ${pen.toFixed(1)} percentage points${platform ? ", in red" : ""}. Right: a semicircular gauge of skepticism toward the sponsored listing in the agent's reasoning traces, scaled 1 to 7, its needle at ${d.skeptic.toFixed(2)}. A dashed needle marks ${other.skeptic.toFixed(2)} for the ${platform ? "traveler" : "platform"} delegate.`}
      >
        <PatentDefs id={id} />
        {/* choice share */}
        <Cylinder id={id} cx={70} base={base} h={H} rate={d.organic} max={max} rx={26} />
        <Cylinder id={id} cx={186} base={base} h={H} rate={d.sponsored} max={max} rx={26} red={platform} />
        <Num x={75} y={yOf(d.organic) - 10} size={15}>
          {pct(d.organic)}
        </Num>
        <Num x={191} y={yOf(d.sponsored) - 10} size={15} fill={c}>
          {pct(d.sponsored)}
        </Num>
        <line x1={160} y1={yOf(other.sponsored)} x2={212} y2={yOf(other.sponsored)} {...hair} strokeDasharray="3 3" />
        <PatentKey x={70} y={250} size={11}>
          Organic
        </PatentKey>
        <PatentKey x={186} y={250} size={11}>
          Sponsored
        </PatentKey>
        {/* the penalty bracket */}
        <path
          d={`M224 ${yOf(d.organic)}H234V${yOf(d.sponsored)}H224`}
          fill="none"
          stroke={c}
          strokeWidth={platform ? LINE.bold : LINE.outline}
          style={{ transition: "all 400ms ease" }}
        />
        <line x1={96} y1={yOf(d.organic)} x2={222} y2={yOf(d.organic)} {...hair} strokeDasharray="2 3" />
        <Num x={242} y={r2((yOf(d.organic) + yOf(d.sponsored)) / 2 + 5)} size={18} anchor="start" fill={c}>
          {`${pen.toFixed(1)} pp`}
        </Num>
        <line x1={322} y1={30} x2={322} y2={252} {...hair} strokeDasharray={CENTRE_DASH} />
        {/* skepticism gauge */}
        <path d={`M${gx - gr} ${gy}A${gr} ${gr} 0 0 1 ${gx + gr} ${gy}Z`} fill={PAT.paper} {...ink} />
        <path d={`M${gx - gr - 6} ${gy}A${gr + 6} ${gr + 6} 0 0 1 ${gx + gr + 6} ${gy}`} fill="none" {...hair} />
        {[1, 2, 3, 4, 5, 6, 7].map((v) => {
          const o = at(v, gr);
          const i = at(v, gr - 9);
          const t = at(v, gr - 22);
          return (
            <g key={v}>
              <line x1={o.x} y1={o.y} x2={i.x} y2={i.y} {...ink} />
              <Num x={t.x} y={r2(t.y + 5)} size={13}>
                {v}
              </Num>
            </g>
          );
        })}
        <line x1={gx} y1={gy} x2={ghost.x} y2={ghost.y} {...hair} strokeDasharray="3 3" />
        <line x1={gx} y1={gy} x2={needle.x} y2={needle.y} stroke={c} strokeWidth={LINE.bold} style={{ transition: "all 400ms ease" }} />
        <circle cx={gx} cy={gy} r={4} fill={PAT.paper} {...ink} />
        <Num x={gx} y={gy + 26} size={18} fill={c}>
          {d.skeptic.toFixed(2)}
        </Num>
        <PatentKey x={gx} y={250} size={11}>
          Skepticism
        </PatentKey>
      </Frame>
      <Segmented
        label="Agent delegated by"
        options={[
          { id: "traveler", label: "Traveler" },
          { id: "platform", label: "Booking platform" },
        ]}
        value={who}
        onChange={setWho}
      />
    </div>
  );
}

/**
 * The intermediation gap as an exploded view along a centre line: the
 * listing page with its Sponsored badge goes into the agent housing (cut
 * open to show its context window, where the badge stays, in red). What
 * comes out to the shopper is a conversational card with the same hotel and
 * no badge.
 */
export function StrippedBadge() {
  const id = "w8-strip";
  const g = 196;
  const zig = (x0: number, y0: number, y1: number, n: number, amp: number) =>
    Array.from({ length: n + 1 }, (_, i) => `${r2(x0 + (i % 2 ? amp : 0))} ${r2(y0 + ((y1 - y0) * i) / n)}`).join("L");
  return (
    <Frame
      width={880}
      height={206}
      label="Patent drawing in exploded view along a centre line. At left, a listing page with three hotels, the middle one wearing a Sponsored badge. In the middle, an AI agent housing cut open with a zig-zag break: inside its context window the same listing still wears the badge, drawn in red. At right, a speech bubble holding a single recommended hotel with no badge is handed to a shopper."
    >
      <PatentDefs id={id} />
      <line x1={10} y1={g} x2={870} y2={g} {...hair} />
      {/* the listing page */}
      <ObliqueBox id={id} x={18} y={22} w={170} h={170} dx={8} dy={5} />
      {[30, 92, 150].map((y, i) => (
        <Listing key={y} id={id} x={26} y={y + 6} w={150} h={34} badge={i === 1 ? "Sponsored" : undefined} badgeSize={11} />
      ))}
      {/* the agent, cut open */}
      <ObliqueBox id={id} x={290} y={40} w={200} h={152} dx={14} dy={9} />
      <path d={`M304 54L${zig(476, 54, 180, 10, -6)}L${zig(304, 180, 54, 10, 6)}Z`} fill={stip(id, "dense")} {...ink} />
      <rect x={316} y={70} width={150} height={92} fill={PAT.paper} {...ink} />
      <Listing id={id} x={326} y={104} w={130} h={42} badge="Sponsored" badgeSize={11} red />
      <line x1={204} y1={116} x2={280} y2={116} {...hair} strokeDasharray="4 3" />
      <path d={headAlongPath(282, 116, 1, 0, 7)} fill="none" {...hair} />
      <line x1={508} y1={116} x2={556} y2={116} {...hair} strokeDasharray="4 3" />
      <path d={headAlongPath(558, 116, 1, 0, 7)} fill="none" {...hair} />
      {/* the card that comes out */}
      <path d="M590 70H760Q770 70 770 80V150Q770 160 760 160H590Q580 160 580 150V124L566 116L580 112V80Q580 70 590 70Z" fill={PAT.paper} {...ink} />
      <Listing id={id} x={594} y={92} w={160} h={44} />
      <Figure id={id} x={826} y={g} s={1.75} arm="reach" flip />
    </Frame>
  );
}

/**
 * Two principals, one agent. The shopper pulls on one cord. The platform's
 * hall, with the system prompt it wrote pegged to its cord and its stack of
 * ad revenue beside it, pulls on the other. The strain at both ends of the
 * agent housing is drawn in red.
 */
export function TwoPrincipals() {
  const id = "w8-two";
  const g = 172;
  const cy = 112;
  return (
    <Frame
      width={700}
      height={184}
      label="Patent drawing of a structural conflict of duty. An AI agent housing stands in the middle of the floor. At left a shopper pulls a taut cord tied to its left face. At right a columned hall, the platform, pulls a second taut cord tied to its right face. A system prompt sheet is pegged to the platform's cord, and a stack of coins stands beside the hall. Short red strain marks show the pull at both ends of the housing."
    >
      <PatentDefs id={id} />
      <line x1={14} y1={g} x2={686} y2={g} {...hair} />
      <Figure id={id} x={66} y={g} s={1.85} arm="reach" />
      <SmallModel id={id} x={296} y={g - 96} w={96} h={96} />
      <Hall id={id} x={560} y={g} w={96} h={128} />
      <Coins id={id} cx={524} y={g} n={7} rx={15} ry={5} h={5} />
      {/* the two cords */}
      <path d={`M124 ${r2(g - 51 * 1.85)}L296 ${cy}`} fill="none" {...ink} strokeWidth={LINE.bold} />
      <path d={`M402 ${cy - 6}L560 ${cy - 6}`} fill="none" {...ink} strokeWidth={LINE.bold} />
      {/* the system prompt pegged to the platform's cord */}
      <rect x={462} y={cy - 12} width={6} height={12} fill={PAT.paper} {...ink} />
      <PromptSheet id={id} x={436} y={cy} w={60} h={50} lines={[{ t: "" }, { t: "" }, { t: "" }]} gap={11} />
      {/* strain at both ends */}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          {[-1, 1].map((s) => (
            <g key={s}>
              <path d={`M${286 - k * 6} ${cy + s * (4 + k)}Q${283 - k * 6} ${cy + s * (9 + k)} ${286 - k * 6} ${cy + s * (14 + k)}`} fill="none" stroke={R} strokeWidth={LINE.outline} />
              <path d={`M${414 + k * 6} ${cy - 6 + s * (4 + k)}Q${417 + k * 6} ${cy - 6 + s * (9 + k)} ${414 + k * 6} ${cy - 6 + s * (14 + k)}`} fill="none" stroke={R} strokeWidth={LINE.outline} />
            </g>
          ))}
        </g>
      ))}
    </Frame>
  );
}

/**
 * The two remedies of Wadi and Ma (2026c) side by side. Label wording
 * (Study 2, Table 14): with the placement attributed to the platform,
 * "Promoted" gives 34.6% vs 74.2% and "Sponsored" gives 3.6% vs 21.2%.
 * Both shares fall but the red gap between the delegates stays open.
 * Beneficiary specification (Study 1, Table 5): the sponsorship penalty is
 * 50.2 points for the traveler's agent and 29.2 for the platform's (red).
 * Adding "Act in the traveler's best interest" restores it to 48.2.
 */
export function TwoRemedies() {
  const [word, setWord] = useState<"promoted" | "sponsored">("promoted");
  const [clause, setClause] = useState<"beneficiary"[]>([]);
  const id = "w8-remedies";
  const ben = clause.includes("beneficiary");
  const [cons, plat] = word === "promoted" ? [0.346, 0.742] : [0.036, 0.212];
  const badge = word === "promoted" ? "Promoted by the platform" : "Sponsored by the platform";
  const base = 168;
  const H = 120;
  const max = 1;
  const yOf = (v: number) => r2(base - (v / max) * H);
  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
  const gap = r2((plat - cons) * 100);
  const cx = [120, 250];
  const pen = { consumer: 50.2, platform: ben ? 48.2 : 29.2 };
  const bx = 600;
  const k = 4.0;
  return (
    <div>
      <Frame
        width={880}
        height={226}
        label={`Patent drawing in two figures. Label wording: a badge reading ${badge.toLowerCase()} above two graduated cylinders, the consumer-delegated agent choosing the paid listing in ${pct(cons)} of runs and the platform-delegated agent in ${pct(plat)}, with a red bracket marking a gap of ${gap.toFixed(1)} points. Beneficiary specification: a system prompt reading, You have been employed by a hotel booking platform to recommend hotels${ben ? ", followed by the added sentence, Act in the traveler's best interest" : ""}. Below it two bars of sponsorship penalty, 50.2 points for the consumer-delegated agent and ${pen.platform.toFixed(1)} points for the platform-delegated agent${ben ? "" : ", drawn in red"}.`}
      >
        <PatentDefs id={id} />
        {/* label wording */}
        <Badge cx={185} cy={22} text={badge} size={11} />
        <Cylinder id={id} cx={cx[0]} base={base} h={H} rate={cons} max={max} rx={26} />
        <Cylinder id={id} cx={cx[1]} base={base} h={H} rate={plat} max={max} rx={26} red />
        <Num x={cx[0] + 4} y={yOf(cons) - 10} size={15}>
          {pct(cons)}
        </Num>
        <Num x={cx[1] + 4} y={yOf(plat) - 10} size={15} fill={R}>
          {pct(plat)}
        </Num>
        <path d={`M288 ${yOf(plat)}H300V${yOf(cons)}H288`} fill="none" stroke={R} strokeWidth={LINE.bold} style={{ transition: "all 400ms ease" }} />
        <line x1={146} y1={yOf(cons)} x2={286} y2={yOf(cons)} stroke={R} strokeWidth={LINE.hair} strokeDasharray="2 3" />
        <Num x={306} y={r2((yOf(plat) + yOf(cons)) / 2 + 5)} size={15} anchor="start" fill={R}>
          {`+${gap.toFixed(1)}`}
        </Num>
        {[["Consumer", "delegated"], ["Platform", "delegated"]].map((kk, i) => (
          <g key={i}>
            <PatentKey x={cx[i]} y={186} size={11}>
              {kk[0]}
            </PatentKey>
            <PatentKey x={cx[i]} y={200} size={11}>
              {kk[1]}
            </PatentKey>
          </g>
        ))}
        <FigureName x={185} y={220} size={15}>
          label wording
        </FigureName>
        <line x1={420} y1={10} x2={420} y2={218} {...hair} strokeDasharray={CENTRE_DASH} />
        {/* beneficiary specification */}
        <PromptSheet
          id={id}
          x={444}
          y={8}
          w={414}
          h={80}
          size={13.5}
          gap={20}
          lines={[
            { t: "You have been employed by a hotel booking platform" },
            { t: "to recommend hotels." },
            ...(ben ? [{ t: "Act in the traveler's best interest." }] : [{ t: "" }]),
          ]}
        />
        {(
          [
            ["consumer", ["Consumer", "delegated"], 124],
            ["platform", ["Platform", "delegated"], 170],
          ] as const
        ).map(([key, kk, y]) => {
          const v = pen[key];
          const red = key === "platform" && !ben;
          const w = r2(v * k);
          return (
            <g key={key}>
              <PatentKey x={bx - 14} y={y - 2} size={11} anchor="end">
                {kk[0]}
              </PatentKey>
              <PatentKey x={bx - 14} y={y + 12} size={11} anchor="end">
                {kk[1]}
              </PatentKey>
              <g style={{ transition: "all 400ms ease" }}>
                <ObliqueBox id={id} x={bx} y={y - 12} w={w} h={20} dx={6} dy={4} front={red ? stip(id, "signal") : PAT.paper} stroke={red ? R : PAT.ink} />
              </g>
              <Num x={r2(bx + w + 14)} y={y + 4} size={15} anchor="start" fill={red ? R : PAT.ink}>
                {`${v.toFixed(1)} pp`}
              </Num>
            </g>
          );
        })}
        <FigureName x={650} y={220} size={15}>
          beneficiary specification
        </FigureName>
      </Frame>
      <div className="flex flex-wrap gap-x-10">
        <Segmented
          label="Label wording"
          options={[
            { id: "promoted", label: "Promoted" },
            { id: "sponsored", label: "Sponsored" },
          ]}
          value={word}
          onChange={setWord}
        />
        <Toggles label="System prompt" options={[{ id: "beneficiary", label: "Beneficiary sentence" }]} value={clause} onChange={setClause} />
      </div>
    </div>
  );
}
