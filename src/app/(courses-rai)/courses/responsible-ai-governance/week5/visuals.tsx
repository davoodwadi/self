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
  PlateButton,
  Segmented,
  Slider,
  Toggles,
  r2,
  seeded,
  stip,
} from "../_visuals/kit";
import { Figure, Sheet, SmallModel, Tag, cross, headAlongPath } from "../_visuals/objects";

/* ==========================================================================
   WEEK 5 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in the body face and one examiner's red for the finding. See the course
   CLAUDE.md.
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

/* --------------------------------------------------------------------------
   Why Opacity Is a Governance Problem
   -------------------------------------------------------------------------- */

/**
 * A sealed model housing. Six input cards feed its left face. Three decisions
 * leave its right face: a loan letter stamped DENIED, a premium tag raised,
 * a supplier shortlist with one name crossed off. Inside, the routes from the
 * inputs to the decisions are hidden lines, drawn dashed in red: which
 * variables drove the outcome cannot be seen from outside.
 */
export function OpaqueDecisions() {
  const id = "w5-opaque";
  const bx = 196;
  const by = 34;
  const bw = 150;
  const bh = 150;
  const ins = Array.from({ length: 6 }, (_, i) => r2(by + 18 + i * 23));
  const outs = [by + 26, by + 75, by + 124];
  const exitX = bx + bw;
  return (
    <Frame
      width={560}
      height={262}
      label="Patent drawing of a sealed model housing. Six input cards feed its left face, and three decisions leave its right face: a loan letter stamped denied, an insurance premium tag raised by 18 percent, and a supplier shortlist with one name crossed off. Inside the housing, the routes from the inputs to the decisions are hidden lines, dashed in red, so which variables drove each outcome cannot be seen."
    >
      <PatentDefs id={id} />
      {/* input cards */}
      {ins.map((y, i) => (
        <g key={i}>
          <Sheet id={id} x={44} y={r2(y + 4)} w={52} d={9} sk={10} t={2.5} lines={1} />
          <line x1={110} y1={r2(y - 1)} x2={bx} y2={r2(y - 1)} {...hair} />
        </g>
      ))}
      {/* the sealed housing */}
      <ObliqueBox id={id} x={bx} y={by} w={bw} h={bh} dx={16} dy={10} />
      {/* hidden routes inside */}
      {ins.map((y, i) =>
        outs.map((oy, j) =>
          (i + j) % 2 === 0 || i === 2 ? (
            <path
              key={`${i}-${j}`}
              d={`M${bx + 4} ${r2(y - 1)}C${bx + 60} ${r2(y - 1)} ${bx + 80} ${oy} ${exitX - 4} ${oy}`}
              fill="none"
              stroke={PAT.signal}
              strokeWidth={LINE.hair}
              strokeDasharray="4 3"
            />
          ) : null,
        ),
      )}
      {/* outputs */}
      {outs.map((oy) => (
        <line key={oy} x1={exitX + 16} y1={oy} x2={exitX + 34} y2={oy} {...hair} />
      ))}
      {/* loan letter, stamped */}
      <rect x={exitX + 38} y={outs[0] - 30} width={66} height={56} fill={PAT.paper} {...ink} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={exitX + 46} y1={outs[0] - 20 + k * 7} x2={exitX + 90 - k * 8} y2={outs[0] - 20 + k * 7} {...hair} />
      ))}
      <g transform={`rotate(-8 ${exitX + 74} ${outs[0] + 12})`}>
        <rect x={exitX + 46} y={outs[0] + 3} width={56} height={17} fill="none" {...ink} />
        <PatentKey x={exitX + 75} y={outs[0] + 15.5} size={10}>
          Denied
        </PatentKey>
      </g>
      {/* premium tag, raised */}
      <Tag cx={exitX + 78} cy={outs[1]} text="+18%" w={56} size={14} />
      {/* supplier shortlist, one struck */}
      <rect x={exitX + 38} y={outs[2] - 24} width={66} height={52} fill={PAT.paper} {...ink} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          {k === 2 ? (
            <path d={cross(exitX + 47, outs[2] - 13 + k * 11, 3)} {...ink} />
          ) : (
            <circle cx={exitX + 47} cy={outs[2] - 13 + k * 11} r={1.6} fill={PAT.ink} />
          )}
          <line x1={exitX + 53} y1={outs[2] - 13 + k * 11} x2={exitX + 94} y2={outs[2] - 13 + k * 11} {...hair} />
        </g>
      ))}
      <FigureName x={70} y={240} size={14}>
        variables
      </FigureName>
      <FigureName x={exitX + 72} y={240} size={14}>
        outcomes
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Transparency Versus Explainability Versus Interpretability
   -------------------------------------------------------------------------- */


/* --------------------------------------------------------------------------
   Part 1: Intrinsic Interpretability Versus Black-Box Complexity
   -------------------------------------------------------------------------- */

/** A small decision tree: a root, two branches and four leaves, centred on (cx, y). */
function TreeGlyph({ cx, y, s = 1, stroke = PAT.ink }: { cx: number; y: number; s?: number; stroke?: string }) {
  const o = { stroke, strokeWidth: LINE.hair, strokeLinecap: "round" as const, fill: "none" };
  const p = (dx: number, dy: number) => `${r2(cx + dx * s)} ${r2(y + dy * s)}`;
  return (
    <g>
      <path d={`M${p(0, 0)}L${p(-6, 7)}M${p(0, 0)}L${p(6, 7)}M${p(-6, 7)}L${p(-9, 14)}M${p(-6, 7)}L${p(-3, 14)}M${p(6, 7)}L${p(3, 14)}M${p(6, 7)}L${p(9, 14)}`} {...o} />
      <circle cx={cx} cy={y} r={r2(1.6 * s)} fill={stroke} />
      {[-9, -3, 3, 9].map((dx) => (
        <rect key={dx} x={r2(cx + dx * s - 1.5 * s)} y={r2(y + 14 * s)} width={r2(3 * s)} height={r2(3 * s)} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.hair} />
      ))}
    </g>
  );
}

/**
 * A platform balance with a level needle. On the left platform lies one
 * card: a three-line rule list. On the right stands a crate packed with
 * decision trees: the ensemble. The beam rests level and the needle, in red,
 * points straight up: the same out-of-sample accuracy.
 */
export function LevelBalance() {
  const id = "w5-balance";
  const cx = 270;
  const beamY = 168;
  return (
    <Frame
      width={540}
      height={330}
      label="Patent drawing of a platform balance whose base reads out-of-sample accuracy. On the left platform lies a single card carrying a three-line rule list, the constrained interpretable model. On the right platform stands a crate packed with fifteen small decision trees, the black-box ensemble. The beam rests level and the needle, in red, points straight up at the centre of its dial."
    >
      <PatentDefs id={id} />
      {/* base with its key */}
      <ObliqueBox id={id} x={52} y={262} w={424} h={30} dx={14} dy={9} />
      <PatentKey x={cx} y={282} size={13}>
        Out-of-sample accuracy
      </PatentKey>
      {/* column and beam */}
      <rect x={cx - 8} y={beamY + 8} width={16} height={262 - beamY - 8} fill={PAT.paper} {...ink} />
      <ObliqueBox id={id} x={84} y={beamY} w={372} h={8} dx={6} dy={4} />
      <circle cx={cx} cy={beamY + 4} r={3} fill={PAT.paper} {...ink} />
      {/* stems and platforms */}
      {[114, 426].map((x) => (
        <g key={x}>
          <line x1={x} y1={beamY - 4} x2={x} y2={146} {...ink} strokeWidth={LINE.bold} />
          <Sheet id={id} x={x - 66} y={146} w={120} d={12} sk={12} t={4} />
        </g>
      ))}
      {/* the rule list */}
      <Sheet id={id} x={78} y={140} w={60} d={34} sk={22} t={2} lines={3} />
      {/* the crate of trees */}
      <ObliqueBox id={id} x={374} y={52} w={100} h={88} dx={12} dy={8} />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4].map((col) => <TreeGlyph key={`${row}-${col}`} cx={r2(386 + col * 19)} y={60 + row * 27} s={0.82} />),
      )}
      {/* level needle and dial */}
      <path d={`M${cx - 40} 112A40 40 0 0 1 ${cx + 40} 112`} fill="none" {...ink} />
      {[-30, -15, 0, 15, 30].map((d) => {
        const a = ((d - 90) * Math.PI) / 180;
        return (
          <line
            key={d}
            x1={r2(cx + Math.cos(a) * 34)}
            y1={r2(112 + Math.sin(a) * 34)}
            x2={r2(cx + Math.cos(a) * 40)}
            y2={r2(112 + Math.sin(a) * 40)}
            {...hair}
          />
        );
      })}
      <line x1={cx} y1={beamY} x2={cx} y2={78} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      <FigureName x={118} y={318} size={14}>
        constrained interpretable model
      </FigureName>
      <FigureName x={424} y={318} size={14}>
        black-box ensemble
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Intrinsically Interpretable Models
   -------------------------------------------------------------------------- */

const LIN = { b: -2, v: 0.6, a: -0.15 };
const gamV = (v: number) => 2.2 / (1 + Math.exp(-1.4 * (v - 3.5))) - 1.1;
const gamA = (a: number) => 1.2 * Math.exp(-a / 6) - 0.4;
const sgn = (n: number) => (n < 0 ? `− ${Math.abs(n).toFixed(2)}` : `+ ${n.toFixed(2)}`);

/**
 * One account scored by three interpretable models at once, driven by two
 * sliders. Left: a sparse linear model's two contributions as bars from a
 * zero line (coefficient times value). Middle: a GAM's two shape functions,
 * with the account's point on each. Right: a falling rule list on a card,
 * the line that fires marked. In every figure the account's reading (red) is
 * the computation itself.
 */
export function ReadableModels() {
  const [v, setV] = useState(4);
  const [a, setA] = useState(3);
  const id = "w5-readable";
  const cv = LIN.v * v;
  const ca = LIN.a * a;
  const z = LIN.b + cv + ca;
  const gv = gamV(v);
  const ga = gamA(a);
  const flag = v > 3 && a < 7;
  // linear figure
  const zx = 150;
  const u = 17;
  const bar = (y: number, c: number) => {
    const x0 = c < 0 ? r2(zx + c * u) : zx;
    return <rect x={x0} y={y} width={r2(Math.abs(c) * u)} height={16} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />;
  };
  // GAM figure
  const plot = (y0: number, max: number, f: (t: number) => number, t: number, lo: number, hi: number) => {
    const x0 = 300;
    const x1 = 520;
    const h = 56;
    const xAt = (s: number) => r2(x0 + (s / max) * (x1 - x0));
    const yAt = (q: number) => r2(y0 + h - ((q - lo) / (hi - lo)) * h);
    const pts = Array.from({ length: 61 }, (_, i) => `${xAt((i / 60) * max)} ${yAt(f((i / 60) * max))}`);
    return (
      <g>
        <line x1={x0} y1={y0} x2={x0} y2={y0 + h + 0.5} {...ink} />
        <line x1={x0} y1={yAt(0)} x2={x1} y2={yAt(0)} {...hair} strokeDasharray={CENTRE_DASH} />
        <line x1={x0} y1={y0 + h + 0.5} x2={x1} y2={y0 + h + 0.5} {...ink} />
        <path d={`M${pts.join("L")}`} fill="none" {...ink} />
        <line x1={xAt(t)} y1={yAt(f(t))} x2={xAt(t)} y2={y0 + h} stroke={PAT.signal} strokeWidth={LINE.hair} strokeDasharray="3 2" />
        <circle cx={xAt(t)} cy={yAt(f(t))} r={4} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />
        <Num x={x1} y={y0 + h + 16} anchor="end" size={12}>
          {max}
        </Num>
        <Num x={x0} y={y0 + h + 16} anchor="start" size={12}>
          0
        </Num>
      </g>
    );
  };
  const rows = [
    { text: `IF velocity > 3 per hour`, on: flag },
    { text: `AND account age < 7 days`, on: flag },
    { text: `THEN flag`, on: flag },
    { text: `ELSE pass`, on: !flag },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={240}
        label={`Patent drawing of one account, with transaction velocity ${v} per hour and account age ${a} days, scored by three interpretable models. Sparse linear model: contributions ${sgn(cv)} for velocity and ${sgn(ca)} for account age on an intercept of ${LIN.b}, total ${z.toFixed(2)}. Generalized additive model: the account's point on each shape function, ${sgn(gv)} and ${sgn(ga)}. Falling rule list: ${flag ? "the first rule fires and the account is flagged" : "no rule fires and the account passes"}.`}
      >
        <PatentDefs id={id} />
        {/* sparse linear model */}
        <line x1={zx} y1={64} x2={zx} y2={170} {...ink} />
        <PatentKey x={14} y={60} size={11} anchor="start">
          Velocity
        </PatentKey>
        {bar(68, cv)}
        <Num x={r2(zx + Math.max(0, cv) * u + 6)} y={81} anchor="start" size={13}>
          {`${LIN.v} × ${v}`}
        </Num>
        <PatentKey x={14} y={118} size={11} anchor="start">
          Account age
        </PatentKey>
        {bar(126, ca)}
        <Num x={r2(zx + 6)} y={139} anchor="start" size={13}>
          {`${LIN.a} × ${a}`}
        </Num>
        <Num x={140} y={196} size={15} fill={PAT.signal}>
          {`${LIN.b} ${sgn(cv)} ${sgn(ca)} = ${z.toFixed(2)}`}
        </Num>
        <FigureName x={140} y={230} size={14}>
          sparse linear model
        </FigureName>

        {/* generalized additive model */}
        <PatentKey x={300} y={30} size={11} anchor="start">
          Velocity
        </PatentKey>
        {plot(38, 8, gamV, v, -1.3, 1.3)}
        <PatentKey x={300} y={130} size={11} anchor="start">
          Account age
        </PatentKey>
        {plot(138, 30, gamA, a, -0.6, 1)}
        <FigureName x={410} y={230} size={14}>
          generalized additive model
        </FigureName>

        {/* falling rule list */}
        <ObliqueBox id={id} x={572} y={44} w={206} h={148} dx={8} dy={5} />
        {rows.map((r, i) => (
          <text
            key={i}
            x={590}
            y={78 + i * 30 + (i === 3 ? 6 : 0)}
            fontFamily="var(--font-body)"
            fontSize={14}
            fill={r.on ? PAT.signal : PAT.ink}
          >
            {r.text}
          </text>
        ))}
        <line x1={586} y1={154} x2={764} y2={154} {...hair} />
        <FigureName x={679} y={230} size={14}>
          falling rule list
        </FigureName>
      </Frame>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Slider label="Transaction velocity" value={v} min={0} max={8} onChange={setV} formatValue={(n) => `${n} / h`} />
        <Slider label="Account age" value={a} min={0} max={30} onChange={setA} formatValue={(n) => `${n} d`} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Black-Box Models
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   When High-Stakes Decisions Should Use Interpretable Models
   -------------------------------------------------------------------------- */

/** The black box's decision boundary over the applicant plane (both axes 0..1). */
const bbBoundary = (x: number) =>
  0.5 + 0.17 * Math.sin(2 * Math.PI * x * 1.4) + 0.08 * Math.sin(2 * Math.PI * x * 4.7 + 1) + 0.045 * Math.sin(2 * Math.PI * x * 10.3 + 2);
const BB_GRID = Array.from({ length: 1001 }, (_, i) => 0.2 + (i / 1000) * 0.6);
const BB_PEAK = BB_GRID.reduce((m, u) => (bbBoundary(u) > bbBoundary(m) ? u : m), 0.2);
const PIECES = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32];
const APPLICANTS = (() => {
  const rnd = seeded(515);
  return Array.from({ length: 160 }, () => ({ x: 0.015 + rnd() * 0.97, y: 0.015 + rnd() * 0.97 }));
})();

/**
 * Applicants scattered over a two-feature plane, split by the black box's
 * wiggly decision boundary. A post-hoc surrogate approximates that boundary
 * with straight pieces. The slider sets how many. Applicants who fall between
 * the two lines are explained wrongly (red). Beside the plane, the surrogate's
 * rule card grows one line per piece: only a card as long as the model itself
 * closes the gap.
 */
export function SurrogateGap() {
  const [step, setStep] = useState(1);
  const id = "w5-surrogate";
  const k = PIECES[step];
  const x0 = 24;
  const x1 = 364;
  const y0 = 24;
  const y1 = 276;
  const X = (u: number) => r2(x0 + u * (x1 - x0));
  const Y = (v: number) => r2(y1 - v * (y1 - y0));
  const sur = (u: number) => {
    const i = Math.min(k - 1, Math.floor(u * k));
    const a = i / k;
    const b = (i + 1) / k;
    return bbBoundary(a) + ((u - a) / (b - a)) * (bbBoundary(b) - bbBoundary(a));
  };
  const N = 200;
  const bb = Array.from({ length: N + 1 }, (_, i) => `${X(i / N)} ${Y(bbBoundary(i / N))}`);
  const sp = Array.from({ length: k + 1 }, (_, i) => `${X(i / k)} ${Y(bbBoundary(i / k))}`);
  const gap = `M${bb.join("L")}L${Array.from({ length: N + 1 }, (_, i) => `${X(1 - i / N)} ${Y(sur(1 - i / N))}`).join("L")}Z`;
  const wrong = APPLICANTS.filter((p) => (p.y - bbBoundary(p.x)) * (p.y - sur(p.x)) < 0);
  const lines = Math.min(k, 32);
  // key each line in place at the black box's highest peak, where the
  // straight pieces always run below it: one key above, one below
  const clear = (u0: number, text: string, below: boolean) => {
    const half = (text.length * 9.6) / 2 / (x1 - x0);
    let top = y1;
    let bottom = y0;
    for (let i = 0; i <= 40; i++) {
      const u = Math.min(1, Math.max(0, u0 - half + (i / 40) * 2 * half));
      top = Math.min(top, Y(sur(u)), Y(bbBoundary(u)));
      bottom = Math.max(bottom, Y(sur(u)), Y(bbBoundary(u)));
    }
    return [X(u0), r2(below ? bottom + 16 : top - 8)];
  };
  const kb = clear(BB_PEAK, "Black box", false);
  const ke = clear(BB_PEAK, "Explanation", true);
  const keyAt = ([x, y]: number[], text: string) => (
    <g>
      <rect x={r2(x - (text.length * 9.6) / 2)} y={r2(y - 11)} width={r2(text.length * 9.6)} height={15} fill={PAT.paper} />
      <PatentKey x={x} y={y} size={11}>
        {text}
      </PatentKey>
    </g>
  );
  return (
    <div>
      <Frame
        width={560}
        height={312}
        label={`Patent drawing of 160 applicants scattered over a two-feature plane, split by a black box's wiggly decision boundary. A post-hoc surrogate approximates the boundary with ${k} straight ${k === 1 ? "piece" : "pieces"}. The slivers between the two lines are stippled red, and ${wrong.length} applicants fall in them, explained wrongly. Beside the plane, the surrogate's rule card holds ${k} ${k === 1 ? "line" : "lines"}.`}
      >
        <PatentDefs id={id} />
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={PAT.paper} {...ink} />
        <defs>
          <clipPath id={`${id}-clip`}>
            <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id}-clip)`}>
          <path d={gap} fill={stip(id, "signal")} stroke="none" fillRule="evenodd" />
          <path d={`M${bb.join("L")}`} fill="none" {...ink} strokeWidth={LINE.bold} />
          <path d={`M${sp.join("L")}`} fill="none" {...ink} strokeDasharray="6 3" />
        </g>
        {APPLICANTS.map((p, i) => {
          const bad = (p.y - bbBoundary(p.x)) * (p.y - sur(p.x)) < 0;
          return (
            <circle
              key={i}
              cx={X(p.x)}
              cy={Y(p.y)}
              r={bad ? 3.2 : 2.2}
              fill={bad ? PAT.signal : PAT.paper}
              stroke={bad ? PAT.signal : PAT.ink}
              strokeWidth={LINE.hair}
            />
          );
        })}
        {keyAt(kb, "Black box")}
        {keyAt(ke, "Explanation")}
        <Num x={x0} y={300} anchor="start" size={15} fill={PAT.signal}>
          {`${wrong.length} of ${APPLICANTS.length} applicants explained wrongly`}
        </Num>

        {/* the surrogate's rule card */}
        <ObliqueBox id={id} x={404} y={34} w={120} h={242} dx={8} dy={5} />
        {Array.from({ length: lines }, (_, i) => (
          <line key={i} x1={416} y1={r2(44 + i * 7.2)} x2={r2(500 - (i % 3) * 12)} y2={r2(44 + i * 7.2)} {...hair} />
        ))}
        <Num x={464} y={300} size={15}>
          {`${k} ${k === 1 ? "rule" : "rules"}`}
        </Num>
      </Frame>
      <Slider label="Surrogate pieces" value={step} min={0} max={PIECES.length - 1} onChange={setStep} formatValue={(v) => String(PIECES[v])} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 2: Post-Hoc Feature Attribution Methods
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Global Versus Local Explanations
   -------------------------------------------------------------------------- */

const GL_FEATURES = ["Utilization", "Inquiries", "Income", "Tenure"];
const GL_BASE = 0.18;
const GL_FOCUS = 13;
/** 24 customers: an id, four signed attributions and the default probability they sum to. */
const GL_CUSTOMERS = (() => {
  const rnd = seeded(4082);
  const scale = [0.11, 0.07, 0.06, 0.035];
  const lean = [0.45, 0.35, -0.1, -0.2];
  return Array.from({ length: 24 }, (_, i) => {
    const a =
      i === GL_FOCUS
        ? [0.14, 0.09, 0.04, -0.03]
        : scale.map((s, j) => Math.round((rnd() * 2 - 1 + lean[j]) * s * 100) / 100);
    const p = Math.max(0.02, Math.min(0.95, GL_BASE + a.reduce((x, y) => x + y, 0)));
    return { id: 4069 + i, a, p: Math.round(p * 100) / 100 };
  });
})();
const GL_GLOBAL = GL_FEATURES.map((_, j) => GL_CUSTOMERS.reduce((s, c) => s + Math.abs(c.a[j]), 0) / GL_CUSTOMERS.length);

/**
 * A population of 24 customers on the left. In the middle, the global
 * explanation: each feature's average weight across all of them, as bars
 * running left from the feature names. On the right, the local explanation
 * for the one customer selected (red, ringed): that customer's own signed
 * contributions from the baseline, summing to their default probability.
 * Tapping another customer changes only the local side.
 */
export function GlobalLocal() {
  const [sel, setSel] = useState(GL_FOCUS);
  const id = "w5-globlocal";
  const c = GL_CUSTOMERS[sel];
  const keyX = 466;
  const gx = 400;
  const gScale = 1500;
  const lx = 648;
  const lScale = 560;
  const rowY = (j: number) => 62 + j * 30;
  return (
    <div>
      <Frame
        width={800}
        height={214}
        label={`Patent drawing of 24 customers. Global explanation: average weight of each feature across all customers, ${GL_FEATURES.map((f, j) => `${f.toLowerCase()} ${GL_GLOBAL[j].toFixed(2)}`).join(", ")}. Local explanation for applicant ${c.id}, default probability ${c.p.toFixed(2)} from a baseline of ${GL_BASE}: ${GL_FEATURES.map((f, j) => `${f.toLowerCase()} ${c.a[j] >= 0 ? "+" : "−"}${Math.abs(c.a[j]).toFixed(2)}`).join(", ")}.`}
      >
        <PatentDefs id={id} />
        {/* the population */}
        {GL_CUSTOMERS.map((cu, i) => {
          const row = Math.floor(i / 8);
          const x = r2(28 + (i % 8) * 30 + (row % 2) * 12);
          const y = 82 + row * 48;
          const on = i === sel;
          return (
            <g
              key={cu.id}
              role="button"
              tabIndex={0}
              aria-label={`Applicant ${cu.id}`}
              aria-pressed={on}
              onClick={() => setSel(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(i)}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <rect x={x - 13} y={y - 42} width={26} height={46} fill="transparent" />
              <Figure id={id} x={x} y={y} s={0.48} coat={on ? "signal" : row === 1 ? "paper" : "light"} stroke={on ? PAT.signal : PAT.ink} />
              {on ? <circle cx={x} cy={y - 19} r={22} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} /> : null}
            </g>
          );
        })}
        <FigureName x={145} y={200} size={14}>
          population of customers
        </FigureName>

        {/* feature names, shared */}
        {GL_FEATURES.map((f, j) => (
          <PatentKey key={f} x={keyX} y={rowY(j) + 4} size={11}>
            {f}
          </PatentKey>
        ))}
        {/* global: average weight, running left */}
        <line x1={gx + 0.5} y1={44} x2={gx + 0.5} y2={rowY(3) + 16} {...ink} />
        {GL_GLOBAL.map((g, j) => (
          <rect key={j} x={r2(gx - g * gScale)} y={rowY(j) - 7} width={r2(g * gScale)} height={14} fill={stip(id, "light")} {...ink} />
        ))}
        <FigureName x={340} y={200} size={14}>
          global explanation
        </FigureName>

        {/* local: this customer's signed contributions */}
        <Num x={lx} y={32} size={15} fill={PAT.signal}>
          {`Applicant ${c.id} | ${c.p.toFixed(2)}`}
        </Num>
        <line x1={lx + 0.5} y1={44} x2={lx + 0.5} y2={rowY(3) + 16} {...ink} />
        {c.a.map((v, j) => (
          <rect
            key={j}
            x={r2(v < 0 ? lx + v * lScale : lx)}
            y={rowY(j) - 7}
            width={r2(Math.abs(v) * lScale)}
            height={14}
            fill={stip(id, "signal")}
            stroke={PAT.signal}
            strokeWidth={LINE.outline}
          />
        ))}
        {c.a.map((v, j) => (
          <Num key={j} x={r2(v >= 0 ? lx + v * lScale + 6 : lx + 6)} y={rowY(j) + 5} anchor="start" size={12}>
            {`${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}`}
          </Num>
        ))}
        <FigureName x={lx} y={200} size={14}>
          local explanation
        </FigureName>
      </Frame>
      <Segmented
        label="Explain applicant"
        options={[GL_FOCUS, 2, 9, 20].map((i) => ({ id: String(i), label: String(GL_CUSTOMERS[i].id) }))}
        value={String(sel)}
        onChange={(v) => setSel(Number(v))}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Permutation Feature Importance and Partial Dependence
   -------------------------------------------------------------------------- */

type ShuffleCol = "none" | "income" | "util";
const SH_COLS: { id: Exclude<ShuffleCol, "none">; key: string }[] = [
  { id: "income", key: "Income" },
  { id: "util", key: "Utilization" },
];
const SH_ERROR: Record<ShuffleCol, number> = { none: 0.12, income: 0.18, util: 0.29 };
/** Eight holdout customers: two feature values (0..1) and whether they defaulted. */
const SH_ROWS = [
  { v: [0.82, 0.18], d: false },
  { v: [0.35, 0.88], d: true },
  { v: [0.6, 0.3], d: false },
  { v: [0.22, 0.95], d: true },
  { v: [0.9, 0.12], d: false },
  { v: [0.45, 0.7], d: true },
  { v: [0.7, 0.4], d: false },
  { v: [0.28, 0.62], d: false },
];
const SH_PERM = [5, 3, 7, 0, 6, 1, 4, 2];

/**
 * A holdout table: eight customers, two feature columns drawn as value bars
 * and an outcome column (filled = defaulted). Choosing a feature shuffles its
 * column across the rows (red), breaking its link to the outcome. The gauge
 * beside the table shows how far the model's holdout error rises.
 */
export function ShuffleColumn() {
  const [col, setCol] = useState<ShuffleCol>("util");
  const id = "w5-shuffle";
  const cx0 = 18;
  const cw = 124;
  const top = 50;
  const rh = 19;
  const err = SH_ERROR[col];
  const needle = (e: number) => -60 + (e / 0.4) * 120;
  const da = ((needle(err) - 90) * Math.PI) / 180;
  const db = ((needle(SH_ERROR.none) - 90) * Math.PI) / 180;
  const gx = 418;
  const gy = 132;
  const gr = 46;
  return (
    <div>
      <Frame
        width={488}
        height={226}
        label={`Patent drawing of a holdout table of eight customers with income and utilization columns and a default outcome column. ${col === "none" ? "No column is shuffled" : `The ${SH_COLS.find((c) => c.id === col)?.key.toLowerCase()} column is shuffled across rows, in red`}. A gauge beside the table reads the model's holdout error: ${err.toFixed(2)}, against ${SH_ERROR.none.toFixed(2)} unshuffled.`}
      >
        <PatentDefs id={id} />
        {/* table frame */}
        <rect x={cx0} y={top - 30} width={cw * 2 + 90} height={30 + rh * 8 + 6} fill={PAT.paper} {...ink} />
        <line x1={cx0} y1={top - 4} x2={cx0 + cw * 2 + 90} y2={top - 4} {...ink} />
        {[1, 2].map((k) => (
          <line key={k} x1={cx0 + cw * k} y1={top - 30} x2={cx0 + cw * k} y2={top + rh * 8 + 2} {...hair} />
        ))}
        {SH_COLS.map((c, j) => (
          <PatentKey key={c.id} x={cx0 + cw * j + cw / 2} y={top - 13} size={11} fill={c.id === col ? PAT.signal : PAT.ink}>
            {c.key}
          </PatentKey>
        ))}
        <PatentKey x={cx0 + cw * 2 + 45} y={top - 13} size={11}>
          Outcome
        </PatentKey>
        {SH_ROWS.map((r, i) => (
          <g key={i}>
            {SH_COLS.map((c, j) => {
              const shuffled = c.id === col;
              const v = shuffled ? SH_ROWS[SH_PERM[i]].v[j] : r.v[j];
              return (
                <rect
                  key={c.id}
                  x={cx0 + cw * j + 12}
                  y={r2(top + i * rh + 3)}
                  width={r2(v * (cw - 24))}
                  height={9}
                  fill={stip(id, shuffled ? "signal" : "light")}
                  stroke={shuffled ? PAT.signal : PAT.ink}
                  strokeWidth={LINE.hair}
                />
              );
            })}
            <circle cx={cx0 + cw * 2 + 45} cy={r2(top + i * rh + 7.5)} r={4.5} fill={r.d ? PAT.ink : PAT.paper} {...ink} />
          </g>
        ))}

        {/* holdout error gauge */}
        <path d={`M${r2(gx + Math.cos(((-150) * Math.PI) / 180) * gr)} ${r2(gy + Math.sin(((-150) * Math.PI) / 180) * gr)}A${gr} ${gr} 0 0 1 ${r2(gx + Math.cos(((-30) * Math.PI) / 180) * gr)} ${r2(gy + Math.sin(((-30) * Math.PI) / 180) * gr)}`} fill="none" {...ink} />
        {[0, 0.1, 0.2, 0.3, 0.4].map((e) => {
          const a = ((needle(e) - 90) * Math.PI) / 180;
          return (
            <g key={e}>
              <line x1={r2(gx + Math.cos(a) * (gr - 6))} y1={r2(gy + Math.sin(a) * (gr - 6))} x2={r2(gx + Math.cos(a) * gr)} y2={r2(gy + Math.sin(a) * gr)} {...hair} />
            </g>
          );
        })}
        <line x1={gx} y1={gy} x2={r2(gx + Math.cos(db) * (gr - 10))} y2={r2(gy + Math.sin(db) * (gr - 10))} {...hair} strokeDasharray="3 2" />
        <line x1={gx} y1={gy} x2={r2(gx + Math.cos(da) * (gr - 4))} y2={r2(gy + Math.sin(da) * (gr - 4))} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
        <circle cx={gx} cy={gy} r={3} fill={PAT.ink} />
        <Num x={gx} y={gy + 28} size={22}>
          {err.toFixed(2)}
        </Num>
        <Num x={gx} y={gy + 50} size={14} fill={PAT.signal}>
          {col === "none" ? "" : `+${(err - SH_ERROR.none).toFixed(2)}`}
        </Num>
        <FigureName x={gx} y={62} size={14}>
          holdout error
        </FigureName>
      </Frame>
      <Segmented
        label="Shuffle"
        options={[
          { id: "none", label: "None" },
          { id: "income", label: "Income" },
          { id: "util", label: "Utilization" },
        ]}
        value={col}
        onChange={setCol}
      />
    </div>
  );
}

/** Sixteen customers' ICE curves over income (0..1): half fall, half rise, through an interaction. */
const ICE = (() => {
  const rnd = seeded(77);
  return Array.from({ length: 16 }, (_, i) => {
    const up = i % 2 === 1;
    const level = 0.32 + rnd() * 0.32;
    const slope = (up ? 1 : -1) * (0.2 + rnd() * 0.16);
    const bend = 0.06 * (rnd() - 0.5);
    return { up, f: (u: number) => level + slope * (u - 0.5) + bend * Math.sin(u * Math.PI * 2) };
  });
})();

/**
 * A partial dependence plot of predicted default against income: the average
 * curve (bold) is nearly flat. Switching on the ICE curves draws one thin
 * curve per customer underneath it: half rise and half fall (the falling
 * half in red), an effect the average hides.
 */
export function IceCurves() {
  const [view, setView] = useState<"pdp" | "ice">("pdp");
  const id = "w5-ice";
  const x0 = 62;
  const x1 = 456;
  const y0 = 18;
  const y1 = 188;
  const X = (u: number) => r2(x0 + u * (x1 - x0));
  const Y = (v: number) => r2(y1 - v * (y1 - y0));
  const path = (f: (u: number) => number) => `M${Array.from({ length: 41 }, (_, i) => `${X(i / 40)} ${Y(f(i / 40))}`).join("L")}`;
  const pdp = (u: number) => ICE.reduce((s, c) => s + c.f(u), 0) / ICE.length;
  return (
    <div>
      <Frame
        width={488}
        height={226}
        label={`Patent drawing of a partial dependence plot of predicted default against income: the average curve is nearly flat${view === "ice" ? ". Sixteen individual conditional expectation curves are drawn beneath it, one per customer: eight rise with income and eight fall, the falling ones in red" : ""}.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={y0} x2={x0} y2={y1 + 0.5} {...ink} />
        <line x1={x0} y1={y1 + 0.5} x2={x1} y2={y1 + 0.5} {...ink} />
        <PatentKey x={x1} y={y1 + 28} size={11} anchor="end">
          Income
        </PatentKey>
        <PatentKey x={x0 + 8} y={y0 + 4} size={11} anchor="start">
          Predicted default
        </PatentKey>
        {view === "ice"
          ? ICE.map((c, i) => (
              <path key={i} d={path(c.f)} fill="none" stroke={c.up ? PAT.ink : PAT.signal} strokeWidth={LINE.hair} />
            ))
          : null}
        <path d={path(pdp)} fill="none" {...ink} strokeWidth={LINE.bold} />
        {[0, 0.5, 1].map((v) => (
          <Num key={v} x={x0 - 8} y={Y(v) + 4} anchor="end" size={12}>
            {v === 0 ? "0" : v.toFixed(1)}
          </Num>
        ))}
      </Frame>
      <Segmented
        label="Show"
        options={[
          { id: "pdp", label: "Partial dependence" },
          { id: "ice", label: "With ICE curves" },
        ]}
        value={view}
        onChange={setView}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Local Surrogates and Game-Theoretic Attributions: LIME and SHAP
   -------------------------------------------------------------------------- */

/** The black box's curved boundary over the plane (0..1 each way): above it, denied. */
const limeBoundary = (u: number) => 0.3 + 0.5 * u * u + 0.08 * Math.sin(u * 9);
const LIME_ME = { x: 0.52, y: 0.43 };
const LIME_PTS = (() => {
  const rnd = seeded(2016);
  return Array.from({ length: 46 }, () => {
    const a = rnd() * Math.PI * 2;
    const d = Math.sqrt(rnd()) * 0.26;
    return { x: LIME_ME.x + Math.cos(a) * d, y: LIME_ME.y + Math.sin(a) * d * 1.1, d };
  });
})();

/**
 * LIME around one customer. The black box splits the plane along a curve
 * (the denied side stippled). Around the customer (the cross), perturbed
 * profiles are scattered. Each is answered by the black box (filled = denied)
 * and weighted by closeness (larger = heavier). A straight local line fitted
 * to those answers (red) stands in for the curve near the customer only.
 */
export function LimeFit() {
  const id = "w5-lime";
  const x0 = 20;
  const x1 = 420;
  const y0 = 16;
  const y1 = 236;
  const X = (u: number) => r2(x0 + u * (x1 - x0));
  const Y = (v: number) => r2(y1 - v * (y1 - y0));
  const curve = Array.from({ length: 81 }, (_, i) => `${X(i / 80)} ${Y(Math.min(1, limeBoundary(i / 80)))}`);
  // tangent of the boundary at the customer's x, shifted through the boundary point
  const h = 0.001;
  const slope = (limeBoundary(LIME_ME.x + h) - limeBoundary(LIME_ME.x - h)) / (2 * h);
  const b0 = limeBoundary(LIME_ME.x);
  const line = (u: number) => b0 + slope * (u - LIME_ME.x);
  const ua = LIME_ME.x - 0.3;
  const ub = LIME_ME.x + 0.3;
  return (
    <Frame
      width={440}
      height={252}
      label="Patent drawing of LIME around one customer. A black-box model divides a two-feature plane along a curved boundary, the denied side stippled. Around the customer, marked by a cross, 46 perturbed profiles are scattered inside a dashed neighbourhood. Each is filled if the black box denies it, and drawn larger the closer it lies. A straight local line, in red, is fitted to them and follows the curve only near the customer."
    >
      <PatentDefs id={id} />
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <path d={`M${curve.join("L")}L${x1} ${y0}L${x0} ${y0}Z`} fill={stip(id, "light")} stroke="none" />
        <path d={`M${curve.join("L")}`} fill="none" {...ink} strokeWidth={LINE.bold} />
      </g>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="none" {...ink} />
      <ellipse cx={X(LIME_ME.x)} cy={Y(LIME_ME.y)} rx={r2(0.27 * (x1 - x0))} ry={r2(0.3 * (y1 - y0))} fill="none" {...hair} strokeDasharray="5 3" />
      {LIME_PTS.map((p, i) => {
        const denied = p.y > limeBoundary(p.x);
        return (
          <circle
            key={i}
            cx={X(p.x)}
            cy={Y(p.y)}
            r={r2(4.2 - p.d * 9)}
            fill={denied ? PAT.ink : PAT.paper}
            stroke={PAT.ink}
            strokeWidth={LINE.hair}
          />
        );
      })}
      <line x1={X(ua)} y1={Y(line(ua))} x2={X(ub)} y2={Y(line(ub))} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      <path d={cross(X(LIME_ME.x), Y(LIME_ME.y), 6)} stroke={PAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" />
      <circle cx={X(LIME_ME.x)} cy={Y(LIME_ME.y)} r={11} fill="none" {...ink} />
    </Frame>
  );
}

type Player = "I" | "U" | "N";
const PLAYERS: { id: Player; key: string; tone: "light" | "dense" | "paper" }[] = [
  { id: "I", key: "Inquiries", tone: "dense" },
  { id: "U", key: "Utilization", tone: "light" },
  { id: "N", key: "Income", tone: "paper" },
];
/** The model's prediction when only the features in the coalition are known (the rest at baseline). */
const COALITION: Record<string, number> = { "": 0.18, I: 0.26, U: 0.22, N: 0.24, IU: 0.3, IN: 0.36, NU: 0.27, INU: 0.42 };
const coal = (s: Player[]) => COALITION[[...s].sort().join("")];
const ORDERS: Player[][] = [
  ["I", "U", "N"],
  ["I", "N", "U"],
  ["U", "I", "N"],
  ["U", "N", "I"],
  ["N", "I", "U"],
  ["N", "U", "I"],
];
const marginals = (order: Player[]) => {
  const out = {} as Record<Player, number>;
  order.forEach((p, i) => (out[p] = coal(order.slice(0, i + 1)) - coal(order.slice(0, i))));
  return out;
};
const SHAPLEY = (() => {
  const sum = { I: 0, U: 0, N: 0 } as Record<Player, number>;
  for (const o of ORDERS) {
    const m = marginals(o);
    for (const p of o) sum[p] += m[p] / ORDERS.length;
  }
  return sum;
})();

/**
 * One applicant's prediction (0.42) built up from the baseline mean (0.18) as
 * three features join the coalition. Left: the stack for one joining order,
 * chosen below. Each feature's block is its marginal contribution in that
 * order, and the same feature adds different amounts in different orders.
 * Right: the Shapley stack, each block the average over all six orders.
 * Both stacks always reach the prediction line (red): local accuracy.
 */
export function ShapleyOrders() {
  const [k, setK] = useState(0);
  const id = "w5-shap";
  const order = ORDERS[k];
  const m = marginals(order);
  const Y = (v: number) => r2(190 - (v - 0.18) * 620);
  const stack = (x: number, seq: Player[], vals: Record<Player, number>) => {
    let acc = 0.18;
    return seq.map((p) => {
      const from = acc;
      acc += vals[p];
      const pl = PLAYERS.find((q) => q.id === p)!;
      const top = Y(acc);
      const bot = Y(from);
      return (
        <g key={p}>
          <rect x={x} y={top} width={70} height={r2(bot - top)} fill={pl.tone === "paper" ? PAT.paper : stip(id, pl.tone)} {...ink} />
          <PatentKey x={x + 124} y={r2((top + bot) / 2 + 4)} size={11.5} anchor="start">
            {pl.key}
          </PatentKey>
          <Num x={x + 76} y={r2((top + bot) / 2 + 4)} anchor="start" size={13}>
            {`+${vals[p].toFixed(3).replace(/0$/, "")}`}
          </Num>
        </g>
      );
    });
  };
  return (
    <div>
      <Frame
        width={600}
        height={232}
        label={`Patent drawing of one applicant's prediction built up from a baseline of 0.18 to 0.42. For the joining order ${order.map((p) => PLAYERS.find((q) => q.id === p)!.key.toLowerCase()).join(", then ")}, the marginal contributions are ${order.map((p) => `${PLAYERS.find((q) => q.id === p)!.key.toLowerCase()} +${m[p].toFixed(2)}`).join(", ")}. The Shapley values, averaged over all six orders, are ${PLAYERS.map((q) => `${q.key.toLowerCase()} +${SHAPLEY[q.id].toFixed(3)}`).join(", ")}. Both stacks reach the prediction line, in red.`}
      >
        <PatentDefs id={id} />
        {/* baseline and prediction */}
        <line x1={24} y1={Y(0.18)} x2={590} y2={Y(0.18)} {...hair} strokeDasharray={CENTRE_DASH} />
        <Num x={590} y={Y(0.18) + 17} anchor="end" size={13}>
          baseline 0.18
        </Num>
        <line x1={24} y1={Y(0.42)} x2={590} y2={Y(0.42)} stroke={PAT.signal} strokeWidth={LINE.outline} />
        <Num x={590} y={Y(0.42) - 7} anchor="end" size={13} fill={PAT.signal}>
          prediction 0.42
        </Num>
        {stack(90, order, m)}
        {stack(344, ["I", "U", "N"], SHAPLEY)}
        <FigureName x={125} y={222} size={14}>
          one joining order
        </FigureName>
        <FigureName x={379} y={222} size={14}>
          Shapley values
        </FigureName>
      </Frame>
      <div className="mt-2.5 px-1">
        <PlateButton onClick={() => setK((v) => (v + 1) % ORDERS.length)}>Try another joining order</PlateButton>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Limitations and Vulnerabilities of Post-Hoc Attributions
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Part 3: Counterfactual Explanations and Actionable Recourse
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Counterfactual Explanations: What Would Have Changed the Decision
   -------------------------------------------------------------------------- */

const CF_ME = { inc: 52, util: 42 };
/** The model's boundary: approved when utilization is at or below this line (income in thousands). */
const cfLine = (inc: number) => 30 + 3 * (inc - 52);
const cfApproved = (inc: number, util: number) => util <= cfLine(inc) + 1e-9;

/**
 * The applicant on the model's decision plane: annual income across,
 * credit card utilization up. The denied side of the boundary is stippled.
 * The two sliders move the applicant's profile. The ring stays at the
 * original. Two counterfactuals sit on the boundary: income 4,000 dollars
 * higher, or utilization down to 30 percent. The stamp shows the decision at
 * the moved profile, read off the model's own rule.
 */
export function CounterfactualPlane() {
  const [inc, setInc] = useState(CF_ME.inc);
  const [util, setUtil] = useState(CF_ME.util);
  const id = "w5-cf";
  const x0 = 56;
  const x1 = 340;
  const y0 = 24;
  const y1 = 270;
  const X = (v: number) => r2(x0 + ((v - 40) / 30) * (x1 - x0));
  const Y = (u: number) => r2(y1 - ((u - 10) / 60) * (y1 - y0));
  const ok = cfApproved(inc, util);
  // boundary across the plot
  const b0 = [Math.max(40, (10 - 30) / 3 + 52), 10];
  const b1 = [Math.min(70, (70 - 30) / 3 + 52), 70];
  const dInc = inc - CF_ME.inc;
  const dUtil = util - CF_ME.util;
  return (
    <div>
      <Frame
        width={500}
        height={318}
        label={`Patent drawing of a decision plane with annual income from 40,000 to 70,000 dollars across and credit card utilization from 10 to 70 percent up. The denied side of the model's boundary is stippled. The applicant's original profile, 52,000 dollars and 42 percent, is ringed. Two counterfactuals sit on the boundary: 56,000 dollars at 42 percent, and 52,000 dollars at 30 percent. The profile now shown is ${inc},000 dollars and ${util} percent: ${ok ? "approved" : "denied"}.`}
      >
        <PatentDefs id={id} />
        <path d={`M${X(b0[0])} ${Y(b0[1])}L${X(b1[0])} ${Y(b1[1])}L${X(40)} ${Y(70)}L${X(40)} ${Y(10)}Z`} fill={stip(id, "light")} stroke="none" />
        <line x1={X(b0[0])} y1={Y(b0[1])} x2={X(b1[0])} y2={Y(b1[1])} {...ink} strokeWidth={LINE.bold} />
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="none" {...ink} />
        {[40, 50, 60, 70].map((v) => (
          <Num key={v} x={X(v)} y={y1 + 18} size={13}>
            {`$${v}k`}
          </Num>
        ))}
        {[30, 50, 70].map((u) => (
          <Num key={u} x={x0 - 8} y={Y(u) + 4} anchor="end" size={13}>
            {`${u}%`}
          </Num>
        ))}
        <PatentKey x={x1} y={y1 + 40} size={12} anchor="end">
          Annual income
        </PatentKey>
        <PatentKey x={x0 + 8} y={y0 + 18} size={12} anchor="start">
          Utilization
        </PatentKey>
        {/* the two counterfactuals on the boundary */}
        {[
          [56, 42],
          [52, 30],
        ].map(([a, b]) => (
          <path key={a} d={`M${X(a)} ${Y(b) - 6}L${X(a) + 6} ${Y(b)}L${X(a)} ${Y(b) + 6}L${X(a) - 6} ${Y(b)}Z`} fill={PAT.paper} {...ink} />
        ))}
        <line x1={X(52) + 9} y1={Y(42)} x2={X(56) - 8} y2={Y(42)} {...hair} strokeDasharray="3 2" />
        <line x1={X(52)} y1={Y(42) + 9} x2={X(52)} y2={Y(30) - 8} {...hair} strokeDasharray="3 2" />
        {/* original profile and the moved one */}
        <circle cx={X(CF_ME.inc)} cy={Y(CF_ME.util)} r={8} fill="none" {...ink} />
        <circle cx={X(inc)} cy={Y(util)} r={4.5} fill={ok ? PAT.signal : PAT.ink} stroke={ok ? PAT.signal : PAT.ink} />
        {/* the decision stamp */}
        <g transform="rotate(-6 424 70)">
          <rect x={366} y={54} width={116} height={30} fill="none" stroke={ok ? PAT.signal : PAT.ink} strokeWidth={LINE.bold} />
          <PatentKey x={425} y={74} size={13} fill={ok ? PAT.signal : PAT.ink}>
            {ok ? "Approved" : "Denied"}
          </PatentKey>
        </g>
        <Num x={366} y={128} anchor="start" size={15}>
          {`income ${dInc >= 0 ? "+" : "−"}$${(Math.abs(dInc) * 1000).toLocaleString("en-US")}`}
        </Num>
        <Num x={366} y={152} anchor="start" size={15}>
          {`utilization ${dUtil > 0 ? "+" : dUtil < 0 ? "−" : "±"}${Math.abs(dUtil)} pts`}
        </Num>
      </Frame>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Slider label="Annual income" value={inc} min={40} max={70} onChange={setInc} formatValue={(v) => `$${v}k`} />
        <Slider label="Utilization" value={util} min={10} max={70} onChange={setUtil} formatValue={(v) => `${v}%`} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   From Explanation to Actionable Recourse
   -------------------------------------------------------------------------- */

type LeverKind = "mutable" | "oneway" | "locked";
const LEVERS: { key: string; kind: LeverKind }[] = [
  { key: "Savings", kind: "mutable" },
  { key: "Utilization", kind: "mutable" },
  { key: "Education", kind: "oneway" },
  { key: "Age", kind: "locked" },
  { key: "Birthplace", kind: "locked" },
];
/** The counterfactual each search returns: how far each lever moves (−1..1) and its printed change. */
const SEARCH: Record<"all" | "actionable", { move: number[]; text: string[] }> = {
  all: { move: [0, -0.15, 0, 0.6, 0.4], text: ["", "−3 pts", "", "+6 yrs", "other"] },
  actionable: { move: [0.5, -0.45, 0.3, 0, 0], text: ["+$3,000", "−10 pts", "+1 cert.", "", ""] },
};

/** A small padlock centred on (cx, cy). */
function Padlock({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path d={`M${cx - 4} ${cy - 2}V${cy - 6}A4 4 0 0 1 ${cx + 4} ${cy - 6}V${cy - 2}`} fill="none" {...ink} />
      <rect x={cx - 6} y={cy - 2} width={12} height={10} fill={PAT.paper} {...ink} />
      <circle cx={cx} cy={cy + 3} r={1.2} fill={PAT.ink} />
    </g>
  );
}

/**
 * The applicant's profile as a control panel of five levers. Mutable
 * features slide either way. A directionally constrained one carries a
 * one-way ratchet. Immutable ones are padlocked. The choice below sets what
 * the counterfactual search may move: over all features it moves padlocked
 * levers (red), over actionable features only it moves only those the
 * applicant can change.
 */
export function RecourseLevers() {
  const [mode, setMode] = useState<"all" | "actionable">("all");
  const id = "w5-levers";
  const xs = [46, 150, 260, 344, 432];
  const mid = 80;
  const half = 40;
  const s = SEARCH[mode];
  return (
    <div>
      <Frame
        width={512}
        height={186}
        label={`Patent drawing of a control panel of five levers: savings and utilization slide either way, education has a one-way ratchet, age and birthplace are padlocked. ${mode === "all" ? "Searching over all features, the counterfactual moves the padlocked age lever by six years and birthplace, in red, and utilization by 3 points." : "Searching over actionable features only, the counterfactual moves savings by 3,000 dollars, utilization down 10 points and education up by one certificate. The padlocked levers stay put."}`}
      >
        <PatentDefs id={id} />
        <ObliqueBox id={id} x={6} y={20} w={494} h={160} dx={10} dy={6} />
        {LEVERS.map((l, i) => {
          const x = xs[i];
          const m = s.move[i];
          const bad = l.kind === "locked" && m !== 0;
          const c = bad ? PAT.signal : PAT.ink;
          const ky = r2(mid - m * half);
          return (
            <g key={l.key}>
              <rect x={x - 4} y={mid - half - 6} width={8} height={half * 2 + 12} rx={4} fill={stip(id, "dense")} {...hair} />
              <line x1={x - 12} y1={mid} x2={x + 12} y2={mid} {...hair} />
              {m !== 0 ? <line x1={x} y1={mid} x2={x} y2={ky} stroke={c} strokeWidth={LINE.bold} /> : null}
              <circle cx={x} cy={ky} r={8} fill={bad ? stip(id, "signal") : PAT.paper} stroke={c} strokeWidth={LINE.outline} />
              {l.kind === "locked" ? <Padlock cx={x} cy={mid + half + 18} /> : null}
              {l.kind === "oneway" ? (
                <g>
                  <path d={headAlongPath(x - 20, mid - 30, 0, -1, 8)} fill="none" {...ink} />
                  <line x1={x - 20} y1={mid - 30} x2={x - 20} y2={mid + 4} {...ink} />
                  <line x1={x - 26} y1={mid + 4} x2={x - 14} y2={mid + 4} {...ink} strokeWidth={LINE.bold} />
                </g>
              ) : null}
              {s.text[i] && s.text[i] !== "other" ? (
                <Num x={x + 14} y={r2(ky + 5)} anchor="start" size={13} fill={c}>
                  {s.text[i]}
                </Num>
              ) : null}
              <PatentKey x={x} y={170} size={11.5}>
                {l.key}
              </PatentKey>
            </g>
          );
        })}
      </Frame>
      <Segmented
        label="Search over"
        options={[
          { id: "all", label: "All features" },
          { id: "actionable", label: "Mutable features only" },
        ]}
        value={mode}
        onChange={setMode}
      />
    </div>
  );
}

/** Distances from the boundary of each group's rejected members (both groups: 6 of 10 approved). */
const BURDEN = {
  A: { approved: [18, 40, 62, 90, 118, 150], rejected: [-14, -30, -46, -62] },
  B: { approved: [22, 46, 70, 96, 124, 146], rejected: [-92, -118, -144, -170] },
};

/**
 * Two groups of ten applicants on one score track each, with the decision
 * boundary as a shared vertical line. Both groups have six approved members
 * to its right: prediction parity holds. Their four rejected members sit at
 * different distances to its left: close for group A, far for group B. A
 * caliper measures each group's mean distance. Group B's (red) is the larger
 * recourse burden.
 */
export function RecourseBurden() {
  const id = "w5-burden";
  const bx = 262;
  const rows = [
    { key: "Group A", y: 54, d: BURDEN.A, red: false },
    { key: "Group B", y: 128, d: BURDEN.B, red: true },
  ];
  return (
    <Frame
      width={500}
      height={190}
      label="Patent drawing of two groups of ten applicants on score tracks either side of one decision boundary. In both groups six applicants are approved, to the right. Group A's four rejected applicants sit close to the boundary, a mean of 38 units away. Group B's sit far from it, a mean of 131 units away, marked by a red caliper: a larger recourse burden."
    >
      <PatentDefs id={id} />
      <line x1={bx} y1={18} x2={bx} y2={172} {...ink} strokeWidth={LINE.bold} />
      <PatentKey x={bx - 12} y={186} size={12} anchor="end">
        Rejected
      </PatentKey>
      <PatentKey x={bx + 12} y={186} size={12} anchor="start">
        Approved
      </PatentKey>
      {rows.map((r) => {
        const mean = r.d.rejected.reduce((a, b) => a + b, 0) / r.d.rejected.length;
        const c = r.red ? PAT.signal : PAT.ink;
        return (
          <g key={r.key}>
            <PatentKey x={8} y={r.y + 4} size={12} anchor="start">
              {r.key}
            </PatentKey>
            <line x1={92} y1={r.y} x2={490} y2={r.y} {...hair} />
            {r.d.approved.map((v) => (
              <circle key={v} cx={r2(bx + v * 1.45)} cy={r.y} r={5} fill={PAT.paper} {...ink} />
            ))}
            {r.d.rejected.map((v) => (
              <circle key={v} cx={r2(bx + v * 0.9)} cy={r.y} r={5} fill={PAT.ink} {...ink} />
            ))}
            {/* caliper: mean distance to the boundary */}
            <g stroke={c} strokeWidth={r.red ? LINE.bold : LINE.outline} strokeLinecap="round">
              <line x1={r2(bx + mean * 0.9)} y1={r.y + 18} x2={bx} y2={r.y + 18} />
              <line x1={r2(bx + mean * 0.9)} y1={r.y + 12} x2={r2(bx + mean * 0.9)} y2={r.y + 24} />
            </g>
            <Num x={r2(bx + mean * 0.9 - 6)} y={r.y + 23} anchor="end" size={13} fill={c}>
              {`${Math.round(-mean)}`}
            </Num>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Part 4: Reasoning Traces in Large Language Models as Verbal Protocols
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Chain-of-Thought and Reasoning Traces as Verbal Protocols
   -------------------------------------------------------------------------- */

type Code = "goal" | "attributes" | "disclosure";
type Span = [string, Code?];
const HUMAN: Span[][] = [
  [["“Okay, I want the "], ["cheapest per ounce", "goal"], ["."]],
  [["This one is "], ["$4.99 for 10 oz", "attributes"], [", that one"]],
  [["is "], ["$5.00 for 11 oz", "attributes"], [". Oh, the second says"]],
  [["Sponsored", "disclosure"], [". Still cheaper per ounce,"]],
  [["so I’ll take it.”"]],
];
const AGENT: Span[][] = [
  [["Goal: the "], ["lowest price per ounce", "goal"], ["."]],
  [["Coffee A is "], ["$4.99 for 10 oz", "attributes"], [". Coffee B"]],
  [["is "], ["$5.00 for 11 oz", "attributes"], [". B carries a"]],
  [["Sponsored label", "disclosure"], [", but its unit price"]],
  [["is lower. I choose Coffee B."]],
];

/**
 * Two transcripts side by side: a shopper's think-aloud protocol at the
 * shelf and an AI shopping agent's reasoning trace for the same choice. The
 * codebook below picks one decision construct. Its spans are marked in red
 * in both transcripts at once, by the same rule.
 */
export function CodedProtocols() {
  const [code, setCode] = useState<Code>("goal");
  const id = "w5-coded";
  const card = (x: number, rows: Span[][]) => (
    <g>
      <rect x={x} y={20} width={318} height={128} fill={PAT.paper} {...ink} />
      {rows.map((spans, i) => (
        <text key={i} x={x + 16} y={48 + i * 22} fontFamily="var(--font-body)" fontSize={14} fill={PAT.ink}>
          {spans.map(([t, c], j) => (
            <tspan key={j} fill={c === code ? PAT.signal : PAT.ink} style={c === code ? { textDecoration: "underline" } : undefined}>
              {t}
            </tspan>
          ))}
        </text>
      ))}
    </g>
  );
  const coded = (rows: Span[][]) =>
    rows
      .flat()
      .filter(([, c]) => c === code)
      .map(([t]) => t)
      .join(". ");
  return (
    <div>
      <Frame
        width={800}
        height={184}
        label={`Patent drawing of two transcripts. Left, a shopper at a shelf speaks a think-aloud protocol. Right, an AI shopping agent writes a reasoning trace for the same coffee choice. The codebook construct ${code} is marked in red in both: shopper, ${coded(HUMAN)}. Agent, ${coded(AGENT)}.`}
      >
        <PatentDefs id={id} />
        <Figure id={id} x={34} y={146} s={1.2} arm="reach" />
        <path d="M64 70L74 64V78Z" fill={PAT.paper} {...ink} />
        {card(74, HUMAN)}
        <SmallModel id={id} x={420} y={86} w={48} h={50} />
        <path d="M482 70L492 64V78Z" fill={PAT.paper} {...ink} />
        {card(474, AGENT)}
        <FigureName x={233} y={174} size={14}>
          think-aloud protocol
        </FigureName>
        <FigureName x={633} y={174} size={14}>
          reasoning trace
        </FigureName>
      </Frame>
      <Segmented
        label="Codebook"
        options={[
          { id: "goal", label: "Goal formulated" },
          { id: "attributes", label: "Attributes compared" },
          { id: "disclosure", label: "Disclosure noticed" },
        ]}
        value={code}
        onChange={setCode}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Plausibility Versus Faithfulness in LLM Explanations
   -------------------------------------------------------------------------- */

const CUE_TRACE = {
  off: ["Laptop B lasts 14 hours on a", "charge, against 9 hours for", "laptop A, at the same price", "and weight. Answer: (B)"],
  on: ["Laptop A has the sturdier", "aluminium build and the better", "keyboard, which matter most", "for daily use. Answer: (A)"],
};

/**
 * A few-shot prompt and the model's reply. The prompt's three worked
 * examples sit on the left with their marked answers, the new question
 * beneath them. With the covert cue on, every worked answer is (A). The
 * model then answers (A) and writes a reason about build quality that never
 * mentions the pattern (red). Two meters read the reply: plausibility stays
 * high either way. Faithfulness falls when the cue drives the answer.
 */
export function CoveredCue() {
  const [cue, setCue] = useState(false);
  const id = "w5-cue";
  const answers = cue ? ["A", "A", "A"] : ["A", "B", "B"];
  const trace = cue ? CUE_TRACE.on : CUE_TRACE.off;
  const red = cue ? PAT.signal : PAT.ink;
  const meter = (y: number, key: string, v: number, c: string) => (
    <g>
      <PatentKey x={318} y={y} size={11} anchor="start">
        {key}
      </PatentKey>
      <rect x={318} y={y + 8} width={230} height={12} fill={PAT.paper} {...ink} />
      <rect x={318} y={y + 8} width={r2(230 * v)} height={12} fill={stip(id, c === PAT.signal ? "signal" : "light")} stroke={c} strokeWidth={LINE.outline} />
    </g>
  );
  return (
    <div>
      <Frame
        width={580}
        height={300}
        label={`Patent drawing of a few-shot prompt and a model's reply. The three worked examples are answered ${answers.join(", ")}${cue ? ": the covert cue, every answer (A)" : ""}. The model replies: “${trace.join(" ")}” Meters below: plausibility high. Faithfulness ${cue ? "low, since the reason never mentions the answer pattern that drove the choice" : "high"}.`}
      >
        <PatentDefs id={id} />
        {/* worked examples */}
        {answers.map((a, i) => (
          <g key={i}>
            <rect x={16} y={20 + i * 56} width={188} height={46} fill={PAT.paper} {...ink} />
            <line x1={28} y1={36 + i * 56} x2={146} y2={36 + i * 56} {...hair} />
            <line x1={28} y1={50 + i * 56} x2={124} y2={50 + i * 56} {...hair} />
            <circle cx={178} cy={43 + i * 56} r={13} fill="none" {...ink} />
            <Num x={178} y={48 + i * 56} size={14}>
              {`(${a})`}
            </Num>
          </g>
        ))}
        {/* the new question */}
        <rect x={16} y={200} width={188} height={64} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
        <line x1={28} y1={218} x2={170} y2={218} {...hair} />
        <Num x={28} y={250} anchor="start" size={14}>
          (A) laptop A
        </Num>
        <Num x={118} y={250} anchor="start" size={14}>
          (B) laptop B
        </Num>
        <FigureName x={110} y={290} size={14}>
          prompt
        </FigureName>
        {/* the model */}
        <line x1={212} y1={150} x2={228} y2={150} {...hair} />
        <SmallModel id={id} x={232} y={124} w={46} h={50} />
        <line x1={290} y1={150} x2={306} y2={150} {...hair} />
        {/* the reply */}
        <rect x={310} y={20} width={252} height={130} fill={PAT.paper} stroke={red} strokeWidth={LINE.outline} />
        {trace.map((t, i) => (
          <text key={i} x={324} y={46 + i * 26} fontFamily="var(--font-body)" fontSize={14} fill={red}>
            {t}
          </text>
        ))}
        {meter(186, "Plausibility", 0.92, PAT.ink)}
        {meter(236, "Faithfulness", cue ? 0.18 : 0.9, red)}
        <FigureName x={436} y={290} size={14}>
          chain-of-thought explanation
        </FigureName>
      </Frame>
      <Toggles
        label="Prompt"
        options={[{ id: "cue", label: "Covert cue: every worked answer is (A)" }]}
        value={cue ? ["cue"] : []}
        onChange={(v) => setCue(v.includes("cue"))}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Auditing Reasoning Traces Alongside Observed Choices
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Part 5: Designing Disclosures and Documentation for Stakeholders
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Tailoring Explanations to Stakeholder Needs
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Model Cards, Datasheets, and System Transparency Notes
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   Dark Transparency and Disclosure Overload
   -------------------------------------------------------------------------- */

/** Share of readers who get as far as page k: most stop after the first few pages. */
const reachPage = (k: number) => Math.exp(-(k - 1) / 4);

/**
 * A disclosure as a stack of pages seen edge-on in oblique projection. The
 * page carrying the adverse error rate (red) sits about two-thirds of the
 * way down. The slider adds pages. The readout gives the share of readers who reach the red
 * page, which falls as the stack grows.
 */
export function BuriedDisclosure() {
  const [n, setN] = useState(3);
  const id = "w5-buried";
  const red = Math.max(2, Math.round(n * 0.65));
  const reach = reachPage(red);
  const t = 4.4;
  const base = 262;
  const x = 150;
  const w = 180;
  const d = 64;
  const sk = 60;
  const topY = r2(base - n * t);
  const pct = `${(reach * 100).toFixed(reach < 0.1 ? 1 : 0)}%`;
  return (
    <div>
      <Frame
        width={560}
        height={300}
        label={`Patent drawing of a disclosure of ${n} pages stacked in oblique projection, with the page carrying the adverse error rate, in red, at page ${red}. A reader stands beside the stack. ${pct} of readers reach the red page.`}
      >
        <PatentDefs id={id} />
        {/* page edges, bottom to top */}
        {Array.from({ length: n }, (_, i) => {
          const k = n - i; // page number from the top
          const y = r2(base - i * t);
          const isRed = k === red;
          return (
            <path
              key={i}
              d={`M${x} ${y}V${r2(y - t)}H${x + w}L${x + w + sk} ${r2(y - t - d)}V${r2(y - d)}L${x + w} ${y}Z`}
              fill={isRed ? stip(id, "signal") : PAT.paper}
              stroke={isRed ? PAT.signal : PAT.ink}
              strokeWidth={LINE.hair}
              strokeLinejoin="round"
            />
          );
        })}
        {/* the top page face */}
        <path d={`M${x} ${topY}L${x + sk} ${r2(topY - d)}H${x + w + sk}L${x + w} ${topY}Z`} fill={PAT.paper} {...ink} />
        {[0, 1, 2, 3].map((l) => {
          const f = (l + 1) / 5;
          const yy = r2(topY - d * f);
          return <line key={l} x1={r2(x + sk * f + 20)} y1={yy} x2={r2(x + sk * f + w - 30 - (l % 2) * 30)} y2={yy} {...hair} />;
        })}
        <Figure id={id} x={84} y={base} s={1.3} arm="reach" />
        {/* the red page's depth */}
        <Num x={x + w + sk + 8} y={r2(base - (n - red) * t - d + 2)} anchor="start" size={14} fill={PAT.signal}>
          {`error rate, page ${red}`}
        </Num>
        <Num x={20} y={292} anchor="start" size={15}>
          {`${n} pages | `}
          <tspan fill={PAT.signal}>{`${pct} of readers reach page ${red}`}</tspan>
        </Num>
      </Frame>
      <Slider label="Pages disclosed" value={n} min={3} max={30} onChange={setN} />
    </div>
  );
}
