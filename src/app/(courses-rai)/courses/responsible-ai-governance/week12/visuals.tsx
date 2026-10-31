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
  r2,
  stip,
} from "../_visuals/kit";
import { Figure, Lens, Sheet, SmallModel, cross, headAlongPath } from "../_visuals/objects";

/* ==========================================================================
   WEEK 12 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in the body face and one examiner's red for the finding. See the course
   CLAUDE.md.

   Week cast: people are patent Figures, an AI system is the model housing
   with two gears (SmallModel), a dossier is a Sheet, and the board is a long
   table in oblique projection.
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
    <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-body)" fontSize={size} fill={fill} style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
      {children}
    </text>
  );
}

/** A hand stamp: a knob, a neck and a block, its face at (cx, y). */
function Stamp({ id, cx, y }: { id: string; cx: number; y: number }) {
  return (
    <g>
      <ObliqueBox id={id} x={cx - 16} y={y - 12} w={32} h={12} dx={6} dy={4} />
      <rect x={cx - 3} y={y - 26} width={6} height={14} fill={PAT.paper} {...ink} />
      <ellipse cx={cx} cy={y - 30} rx={9} ry={6} fill={stip(id, "light")} {...ink} />
    </g>
  );
}

/**
 * The three lines of defense. Under the board, three teams stand apart, each
 * with its own reporting line running up to the board: the first line works
 * at the model it builds and operates, the second brings a stamp down on the
 * release dossier (binding sign-off), and the third holds a lens, with a
 * dashed path running back under the first two lines it evaluates.
 */
export function ThreeLines() {
  const id = "w12-lines";
  const g = 222;
  const cols = [110, 320, 530];
  return (
    <Frame
      width={640}
      height={300}
      label="Patent drawing of the three lines of defense under the board, each with its own reporting line up to the board. The first line, product teams, work at the model they build and operate. The second line, the independent risk and ethics function, brings a stamp down on the release dossier for binding sign-off. The third line, auditors, hold a lens, and a dashed path runs back under the first two lines to show that they evaluate both."
    >
      <PatentDefs id={id} />
      {/* the board */}
      <ObliqueBox id={id} x={40} y={26} w={560} h={16} dx={12} dy={7} />
      {[81, 283, 501].map((x) => (
        <g key={x}>
          <line x1={x} y1={42} x2={x} y2={g - 124} {...ink} />
          <circle cx={x} cy={42} r={2.4} fill={PAT.ink} />
        </g>
      ))}
      <line x1={20} y1={g} x2={620} y2={g} {...ink} />
      {/* first line: build and operate */}
      <Figure id={id} x={80} y={g} s={1.3} arm="reach" />
      <SmallModel id={id} x={124} y={g - 66} w={60} h={66} />
      {/* second line: binding sign-off */}
      <Figure id={id} x={282} y={g} s={1.3} arm="reach" />
      <ObliqueBox id={id} x={316} y={g - 44} w={64} h={44} dx={10} dy={6} />
      <Sheet id={id} x={320} y={g - 47} w={48} d={10} sk={10} lines={2} />
      <line x1={344} y1={g - 70} x2={344} y2={g - 60} {...hair} strokeDasharray="3 2" />
      <Stamp id={id} cx={344} y={g - 72} />
      {/* third line: evaluates both */}
      <Figure id={id} x={500} y={g} s={1.3} arm="reach" />
      <Lens id={id} cx={556} cy={g - 76} r={16} a={2.3} handle={14} />
      <path d={`M530 ${g + 8}V${g + 22}H110V${g + 8}M320 ${g + 22}V${g + 8}`} fill="none" {...hair} strokeDasharray="4 3" />
      <path d={headAlongPath(110, g + 6, 0, -1, 7)} fill="none" {...hair} />
      <path d={headAlongPath(320, g + 6, 0, -1, 7)} fill="none" {...hair} />
      <FigureName x={cols[0]} y={g + 46} size={14}>
        first line
      </FigureName>
      <FigureName x={cols[1]} y={g + 46} size={14}>
        second line
      </FigureName>
      <FigureName x={cols[2]} y={g + 46} size={14}>
        third line
      </FigureName>
      <PatentKey x={600} y={62} size={12} anchor="end">
        Board
      </PatentKey>
    </Frame>
  );
}

/**
 * A RACI matrix for an AI launch, drawn as a sheet: five milestones down the
 * side, five roles across the top, and in every row exactly one A, ringed.
 */
export function RaciMatrix() {
  const id = "w12-raci";
  const roles = [
    ["ML", "engineering"],
    ["Product", "owner"],
    ["Governance", "officer"],
    ["Legal", "counsel"],
    ["Customer", "support"],
  ];
  const rows: [string, string[]][] = [
    ["Scoping approval", ["C", "R", "A", "C", "I"]],
    ["Data-provenance clearance", ["R", "I", "C", "A", "I"]],
    ["Fairness audit", ["R", "I", "A", "C", "I"]],
    ["Model card", ["R", "A", "C", "C", "I"]],
    ["Launch sign-off", ["C", "R", "A", "C", "I"]],
  ];
  const cx = (j: number) => 250 + j * 74;
  const ry = (i: number) => 104 + i * 38;
  return (
    <Frame
      width={600}
      height={312}
      label={`Patent drawing of a RACI matrix on a sheet, with milestones as rows and roles as columns. ${rows
        .map(([m, v]) => `${m}: ${v.map((c, j) => `${roles[j].join(" ")} ${c}`).join(", ")}`)
        .join(". ")}. Each row has exactly one A, ringed.`}
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={14} y={18} w={566} h={282} dx={8} dy={5} />
      {roles.map(([a, b], j) => (
        <g key={a}>
          <PatentKey x={cx(j)} y={50} size={12}>
            {a}
          </PatentKey>
          <PatentKey x={cx(j)} y={66} size={12}>
            {b}
          </PatentKey>
        </g>
      ))}
      <line x1={26} y1={80} x2={568} y2={80} {...ink} />
      {rows.map(([m, v], i) => (
        <g key={m}>
          <PatentKey x={28} y={ry(i) + 5} size={13} anchor="start">
            {m}
          </PatentKey>
          {v.map((c, j) => (
            <g key={j}>
              {c === "A" ? <circle cx={cx(j)} cy={ry(i)} r={13} fill="none" {...ink} strokeWidth={LINE.bold} /> : null}
              <Num x={cx(j)} y={ry(i) + 6} size={17}>
                {c}
              </Num>
            </g>
          ))}
          {i < rows.length - 1 ? <line x1={26} y1={ry(i) + 19} x2={568} y2={ry(i) + 19} {...hair} /> : null}
        </g>
      ))}
      {roles.map((_, j) => (
        <line key={j} x1={cx(j) - 37} y1={30} x2={cx(j) - 37} y2={290} {...hair} />
      ))}
    </Frame>
  );
}

type Tier = "minimal" | "limited" | "high";
const TIER_MIN: Record<Tier, number> = { minimal: 0.7, limited: 0.8, high: 0.9 };

/** A boom gate: a post with an arm, lowered across the track in front of the post or raised. */
function Gate({ id, x, g, open, red }: { id: string; x: number; g: number; open: boolean; red: boolean }) {
  const c = red ? R : PAT.ink;
  return (
    <g>
      {open ? (
        <rect x={x - 3} y={g - 132} width={6} height={76} fill={PAT.paper} {...ink} />
      ) : (
        <rect x={x - 78} y={g - 60} width={78} height={7} fill={red ? stip(id, "signal") : PAT.paper} {...ink} stroke={c} strokeWidth={LINE.bold} />
      )}
      <ObliqueBox id={id} x={x - 5} y={g - 70} w={10} h={70} dx={6} dy={4} />
    </g>
  );
}

/**
 * Stage gates. A release, the model housing on a cart, travels a track
 * through four gates toward production traffic. The pre-deployment gate
 * opens only when the audit's disparate-impact ratio meets the threshold for
 * the system's risk tier: when it does not, the cart stops at a red gate.
 */
export function StageGates() {
  const [tier, setTier] = useState<Tier>("high");
  const [di, setDi] = useState(0.84);
  const id = "w12-gates";
  const g = 196;
  const gx = [110, 250, 430, 560];
  const pass = di >= TIER_MIN[tier] - 1e-9;
  const cartX = pass ? 606 : gx[2] - 142;
  const names = [
    ["Scoping", "approval"],
    ["Data-provenance", "clearance"],
    ["Pre-deployment", "sign-off"],
    ["Monitoring", "readiness"],
  ];
  return (
    <div>
      <Frame
        width={680}
        height={262}
        label={`Patent drawing of four stage gates on a track: scoping approval, data-provenance clearance, pre-deployment sign-off and monitoring readiness. The ${tier}-risk tier requires a disparate-impact ratio of at least ${TIER_MIN[tier].toFixed(2)} at pre-deployment sign-off, and the audit shows ${di.toFixed(2)}. ${
          pass ? "Every gate is open and the release has reached production traffic." : "The pre-deployment gate is closed in red, and the release waits in front of it."
        }`}
      >
        <PatentDefs id={id} />
        <line x1={14} y1={g} x2={666} y2={g} {...ink} />
        {gx.map((x, i) => (
          <g key={x}>
            <Gate id={id} x={x} g={g} open={i !== 2 || pass} red={i === 2 && !pass} />
            {names[i].map((t, j) => (
              <PatentKey key={t} x={x} y={g + 22 + j * 16} size={13} fill={i === 2 && !pass ? R : PAT.ink}>
                {t}
              </PatentKey>
            ))}
          </g>
        ))}
        {/* the threshold plate on the pre-deployment gate */}
        <rect x={gx[2] + 14} y={g - 64} width={64} height={36} fill={PAT.paper} {...ink} />
        <Num x={gx[2] + 46} y={g - 41} size={16} fill={pass ? PAT.ink : R}>
          {`≥ ${TIER_MIN[tier].toFixed(2)}`}
        </Num>
        <PatentKey x={640} y={g + 22} size={13}>
          Production
        </PatentKey>
        <PatentKey x={640} y={g + 38} size={13}>
          traffic
        </PatentKey>
        {/* the release */}
        <g style={{ transform: `translateX(${cartX}px)`, transition: "transform 500ms ease" }}>
          <rect x={-4} y={g - 16} width={60} height={6} fill={PAT.paper} {...ink} />
          <circle cx={8} cy={g - 5} r={5} fill={PAT.paper} {...ink} />
          <circle cx={44} cy={g - 5} r={5} fill={PAT.paper} {...ink} />
          <SmallModel id={id} x={2} y={g - 62} w={44} h={46} />
          <Num x={26} y={g - 82} size={15} fill={pass ? PAT.ink : R}>
            {di.toFixed(2)}
          </Num>
        </g>
      </Frame>
      <Segmented
        label="Risk tier"
        options={[
          { id: "minimal", label: "Minimal" },
          { id: "limited", label: "Limited" },
          { id: "high", label: "High" },
        ]}
        value={tier}
        onChange={setTier}
      />
      <Slider label="Disparate-impact ratio in the audit" value={di} min={0.6} max={1} step={0.01} onChange={setDi} formatValue={(v) => v.toFixed(2)} />
    </div>
  );
}

/**
 * Post-deployment monitoring. The live disparate-impact ratio drifts down
 * across the weeks after launch. A canary audit reads it every week (a dot on
 * the line). The first week it falls below the 0.80 release threshold is
 * flagged in red, and the model is decommissioned at its recertification
 * date, week 40, whether or not it breached.
 */
export function DriftMonitor() {
  const [drift, setDrift] = useState(0.005);
  const id = "w12-drift";
  const x0 = 70;
  const x1 = 600;
  const y0 = 220;
  const y1 = 40;
  const X = (w: number) => r2(x0 + (w / 52) * (x1 - x0));
  const Y = (v: number) => r2(y0 - ((v - 0.6) / 0.4) * (y0 - y1));
  const recert = 40;
  const di = (w: number) => 0.95 - drift * w + 0.008 * Math.sin(w * 1.3);
  const weeks = Array.from({ length: recert + 1 }, (_, w) => w);
  const breach = weeks.find((w) => di(w) < 0.8);
  const seg = (from: number, to: number) =>
    weeks
      .filter((w) => w >= from && w <= to)
      .map((w, i) => `${i ? "L" : "M"}${X(w)} ${Y(di(w))}`)
      .join("");
  const fmt = (v: number) => `−${v.toFixed(4)} per week`;
  return (
    <div>
      <Frame
        width={640}
        height={276}
        label={`Patent drawing of a live disparate-impact ratio over the weeks after launch, starting at 0.95 and drifting down by ${drift.toFixed(4)} a week, with a weekly canary audit dot on the line and a dashed release threshold at 0.80. ${
          breach !== undefined ? `The canary audit in week ${breach} flags the breach in red.` : "The ratio stays above the threshold until the recertification date."
        } At the recertification date, week ${recert}, the model is decommissioned.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={y1 - 6} x2={x0} y2={y0} {...ink} />
        <line x1={x0} y1={y0} x2={x1 + 6} y2={y0} {...ink} />
        {[0.6, 0.8, 1].map((v) => (
          <g key={v}>
            <line x1={x0 - 5} y1={Y(v)} x2={x0} y2={Y(v)} {...ink} />
            <Num x={x0 - 9} y={Y(v) + 4} size={12} anchor="end">
              {v.toFixed(2)}
            </Num>
          </g>
        ))}
        {[0, 13, 26, 39, 52].map((w) => (
          <g key={w}>
            <line x1={X(w)} y1={y0} x2={X(w)} y2={y0 + 5} {...ink} />
            <Num x={X(w)} y={y0 + 19} size={12}>
              {w}
            </Num>
          </g>
        ))}
        <PatentKey x={x0 - 4} y={y1 - 16} size={12} anchor="start">
          Live disparate-impact ratio
        </PatentKey>
        <PatentKey x={x1 + 6} y={y0 + 38} size={12} anchor="end">
          Weeks after launch
        </PatentKey>
        <line x1={x0} y1={Y(0.8)} x2={X(recert)} y2={Y(0.8)} {...ink} strokeDasharray="5 3" />
        <PatentKey x={x0 + 8} y={Y(0.8) + 18} size={12} anchor="start">
          Release threshold
        </PatentKey>
        {/* the ratio, black until the breach, red after */}
        <path d={seg(0, breach ?? recert)} fill="none" {...ink} strokeWidth={LINE.bold} />
        {breach !== undefined ? <path d={seg(breach, recert)} fill="none" {...ink} stroke={R} strokeWidth={LINE.bold} /> : null}
        {weeks.map((w) => (
          <circle key={w} cx={X(w)} cy={Y(di(w))} r={w === breach ? 5 : 1.8} fill={w === breach ? PAT.paper : breach !== undefined && w > breach ? R : PAT.ink} stroke={w === breach ? R : "none"} strokeWidth={LINE.bold} />
        ))}
        {breach !== undefined ? (
          <g>
            <line x1={X(breach)} y1={Y(0.895)} x2={X(breach)} y2={Y(di(breach)) - 7} stroke={R} strokeWidth={LINE.hair} />
            <PatentKey x={X(breach)} y={Y(0.9)} size={12} anchor="middle" fill={R}>
              {`Breach flagged, week ${breach}`}
            </PatentKey>
          </g>
        ) : null}
        {/* recertification and decommissioning */}
        <line x1={X(recert)} y1={y1} x2={X(recert)} y2={y0} {...hair} strokeDasharray={CENTRE_DASH} />
        <PatentKey x={X(recert) + 8} y={y1 + 4} size={12} anchor="start">
          Recertification date
        </PatentKey>
        <path d={cross(X(recert), Y(di(recert)), 7)} fill="none" {...ink} strokeWidth={LINE.bold} />
        <PatentKey x={X(recert) + 14} y={Y(di(recert)) + 4} size={12} anchor="start">
          Decommissioned
        </PatentKey>
      </Frame>
      <Slider label="Drift in the ratio" value={drift} min={0} max={0.008} step={0.0005} onChange={setDrift} formatValue={fmt} />
    </div>
  );
}

/** Gradient descent on f = (x² + 8y²) / 2, from (−4, 1.6), for 30 epochs. */
function descend(lr0: number, active: boolean) {
  let x = -4;
  let y = 1.6;
  let lx = lr0;
  let ly = lr0;
  let pg: [number, number] | null = null;
  const path: [number, number][] = [[x, y]];
  for (let t = 0; t < 30; t++) {
    const g: [number, number] = [x, 8 * y];
    if (active && pg) {
      lx *= g[0] * pg[0] > 0 ? 1.3 : 0.5;
      ly *= g[1] * pg[1] > 0 ? 1.3 : 0.5;
    }
    x -= lx * g[0];
    y -= ly * g[1];
    pg = g;
    path.push([x, y]);
  }
  return { path, loss: 0.5 * (x * x + 8 * y * y) };
}

/**
 * ActiveLR on a loss surface. Contours of a long, narrow valley, and two
 * optimization paths from the same start over 30 epochs. A fixed learning
 * rate (red) crawls when set low and bounces across the valley when set
 * high. The sign-conscious rate (ink) grows each parameter's step while its
 * gradient keeps its sign and halves it when the sign flips, and reaches the
 * minimum from any initial value.
 */
export function ActiveLrPath() {
  const [lgLr, setLgLr] = useState(-2);
  const id = "w12-alr";
  const lr0 = 10 ** lgLr;
  const fixed = descend(lr0, false);
  const active = descend(lr0, true);
  const px0 = 30;
  const px1 = 410;
  const py0 = 40;
  const py1 = 250;
  const X = (x: number) => r2(px0 + ((Math.max(-5, Math.min(1.5, x)) + 5) / 6.5) * (px1 - px0));
  const Y = (y: number) => r2(py0 + ((2.6 - Math.max(-2.6, Math.min(2.6, y))) / 5.2) * (py1 - py0));
  const line = (p: [number, number][]) => p.map(([x, y], i) => `${i ? "L" : "M"}${X(x)} ${Y(y)}`).join("");
  const kx = (px1 - px0) / 6.5;
  const ky = (py1 - py0) / 5.2;
  const loss = (v: number) => (v > 1000 ? "diverges" : v < 0.001 ? "below 0.001" : v.toFixed(3));
  return (
    <div>
      <Frame
        width={600}
        height={268}
        label={`Patent drawing of a loss surface as contours of a long, narrow valley, with two optimization paths over 30 epochs from an initial learning rate of ${lr0.toPrecision(2)}. The fixed learning rate, in red, ends with loss ${loss(fixed.loss)}. ActiveLR, in ink, ends with loss ${loss(active.loss)}.`}
      >
        <PatentDefs id={id} />
        <defs>
          <clipPath id={`${id}-clip`}>
            <rect x={px0} y={py0} width={px1 - px0} height={py1 - py0} />
          </clipPath>
        </defs>
        <rect x={px0} y={py0} width={px1 - px0} height={py1 - py0} fill={PAT.paper} {...ink} />
        <g clipPath={`url(#${id}-clip)`}>
          {[0.25, 1, 2.5, 5, 9, 14].map((c) => (
            <ellipse key={c} cx={X(0)} cy={Y(0)} rx={r2(Math.sqrt(2 * c) * kx)} ry={r2(Math.sqrt((2 * c) / 8) * ky)} fill="none" {...hair} />
          ))}
          <path d={line(fixed.path)} fill="none" stroke={R} strokeWidth={LINE.bold} strokeLinejoin="round" />
          {fixed.path.map(([x, y], i) => (
            <circle key={`f${i}`} cx={X(x)} cy={Y(y)} r={1.8} fill={R} />
          ))}
          <path d={line(active.path)} fill="none" {...ink} strokeWidth={LINE.bold} />
          {active.path.map(([x, y], i) => (
            <circle key={`a${i}`} cx={X(x)} cy={Y(y)} r={1.8} fill={PAT.ink} />
          ))}
        </g>
        <circle cx={X(-4)} cy={Y(1.6)} r={4} fill={PAT.paper} {...ink} />
        <PatentKey x={px0} y={py0 - 12} size={12} anchor="start">
          Loss surface
        </PatentKey>
        {/* the readout */}
        <PatentKey x={436} y={92} size={13} anchor="start" fill={R}>
          Fixed learning rate
        </PatentKey>
        <Num x={436} y={114} size={15} anchor="start" fill={R}>
          {`Loss ${loss(fixed.loss)}`}
        </Num>
        <PatentKey x={436} y={160} size={13} anchor="start">
          ActiveLR
        </PatentKey>
        <Num x={436} y={182} size={15} anchor="start">
          {`Loss ${loss(active.loss)}`}
        </Num>
        <PatentKey x={436} y={228} size={12} anchor="start">
          After 30 epochs
        </PatentKey>
      </Frame>
      <Slider label="Initial learning rate" value={lgLr} min={-2.3} max={-0.5} step={0.05} onChange={setLgLr} formatValue={(v) => (10 ** v).toPrecision(2)} />
    </div>
  );
}

/**
 * Wadi and Ma (2026a): cost per session against position bias, from the
 * reasoning-effort sweep also drawn in Week 8. Position bias is the joint
 * Wald test of both position terms in the choice model, χ²(2), with the 5%
 * critical value 5.99 dashed. Pro at its default high effort is the frontier
 * reference. Flash Lite is drawn at each configured effort: its cost barely
 * moves while its bias falls below the line at high effort, at 4 percent of
 * Pro's cost.
 */
const FLASH = [
  { name: "Minimal", chi: 60.36, cost: 0.0132 },
  { name: "Low", chi: 29.9, cost: 0.0114 },
  { name: "Medium", chi: 8.66, cost: 0.0125 },
  { name: "High", chi: 0.68, cost: 0.0113 },
];
const PRO = { chi: 1.56, cost: 0.2825 };

export function EffortCost() {
  const id = "w12-cost";
  const x0 = 80;
  const x1 = 560;
  const y0 = 230;
  const y1 = 40;
  const X = (c: number) => r2(x0 + ((Math.log10(c) + 2.3) / 2) * (x1 - x0));
  const Y = (chi: number) => r2(y0 - ((Math.log10(chi) + 0.5) / 2.5) * (y0 - y1));
  const crit = 5.99;
  return (
    <Frame
      width={600}
      height={300}
      label="Patent chart of cost per session against position bias (Wadi and Ma, 2026a), both on logarithmic scales, with a dashed line at the 5 percent critical value 5.99 below which choice is position-neutral. Pro at its default high effort costs $0.2825 with chi-square 1.56. Flash Lite costs about a cent at every effort: chi-square 60.36 at minimal, 29.9 at low and 8.66 at medium, all in red above the line, and 0.68 at high effort for $0.0113, below the line at 4 percent of Pro's cost."
    >
      <PatentDefs id={id} />
      <line x1={x0} y1={y1 - 6} x2={x0} y2={y0} {...ink} />
      <line x1={x0} y1={y0} x2={x1 + 6} y2={y0} {...ink} />
      {[1, 10, 100].map((v) => (
        <g key={v}>
          <line x1={x0 - 5} y1={Y(v)} x2={x0} y2={Y(v)} {...ink} />
          <Num x={x0 - 9} y={Y(v) + 4} size={12} anchor="end">
            {v}
          </Num>
        </g>
      ))}
      {[0.01, 0.1].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={y0} x2={X(v)} y2={y0 + 5} {...ink} />
          <Num x={X(v)} y={y0 + 19} size={12}>
            {`$${v}`}
          </Num>
        </g>
      ))}
      <PatentKey x={x0 - 4} y={y1 - 16} size={12} anchor="start">
        Position bias, χ²(2)
      </PatentKey>
      <PatentKey x={x1 + 6} y={y0 + 38} size={12} anchor="end">
        Cost per session
      </PatentKey>
      <line x1={x0} y1={Y(crit)} x2={x1 + 6} y2={Y(crit)} {...ink} strokeDasharray="5 3" />
      <PatentKey x={x1 + 4} y={Y(crit) + 18} size={12} anchor="end">
        Position-neutral below
      </PatentKey>
      {/* Flash Lite at each effort */}
      <path d={`M${FLASH.map((p) => `${X(p.cost)} ${Y(p.chi)}`).join("L")}`} fill="none" {...hair} strokeDasharray="3 3" />
      {FLASH.map((p) => {
        const red = p.chi >= crit;
        return (
          <g key={p.name}>
            <circle cx={X(p.cost)} cy={Y(p.chi)} r={5} fill={red ? stip(id, "signal") : PAT.paper} {...ink} stroke={red ? R : PAT.ink} />
            <PatentKey x={X(p.cost) + 12} y={Y(p.chi) + 4} size={12} anchor="start" fill={red ? R : PAT.ink}>
              {p.name}
            </PatentKey>
          </g>
        );
      })}
      <PatentKey x={X(0.0113) - 14} y={Y(17)} size={13} anchor="end">
        Flash Lite
      </PatentKey>
      {/* Pro at default */}
      <rect x={X(PRO.cost) - 5} y={Y(PRO.chi) - 5} width={10} height={10} fill={PAT.paper} {...ink} />
      <PatentKey x={X(PRO.cost)} y={Y(PRO.chi) + 22} size={13} anchor="middle">
        Pro at default
      </PatentKey>
      {/* the cost ratio as a dimension line */}
      <line x1={X(0.0113)} y1={Y(0.68) + 10} x2={X(0.0113)} y2={Y(0.68) + 30} {...hair} />
      <line x1={X(PRO.cost)} y1={Y(PRO.chi) + 28} x2={X(PRO.cost)} y2={Y(0.68) + 30} {...hair} />
      <line x1={X(0.0113) + 2} y1={Y(0.68) + 24} x2={X(PRO.cost) - 2} y2={Y(0.68) + 24} {...hair} />
      <path d={headAlongPath(X(0.0113), Y(0.68) + 24, -1, 0, 7)} fill="none" {...hair} />
      <path d={headAlongPath(X(PRO.cost), Y(0.68) + 24, 1, 0, 7)} fill="none" {...hair} />
      <Num x={r2((X(0.0113) + X(PRO.cost)) / 2)} y={Y(0.68) + 18} size={15}>
        4% of the cost
      </Num>
    </Frame>
  );
}
