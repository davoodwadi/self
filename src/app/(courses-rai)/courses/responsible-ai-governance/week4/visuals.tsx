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
  r2,
  seeded,
  stip,
} from "../_visuals/kit";
import { Chip, Detail, Dial, Figure, Gear, Sheet, SmallModel, Tag, cross, headAlongPath, star, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 4 PLATES: PATENT DRAWING
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

/**
 * A model housing in oblique projection. Closed, it is a black box with an
 * output slot. Open, its front face is broken away (zig-zag) to show the two
 * weight gears inside. (x, y) is the front face's top-left.
 */
function Housing({ id, x, y, w, h, open = false }: { id: string; x: number; y: number; w: number; h: number; open?: boolean }) {
  const zig = Array.from({ length: 7 }, (_, i) => `${r2(x + w * 0.16 + (i % 2 ? 6 : -2))} ${r2(y + 10 + (i * (h - 20)) / 6)}`);
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={14} dy={9} />
      {open ? (
        <g>
          <path
            d={`M${zig[0]}L${zig.slice(1).join("L")}L${zig[6].split(" ")[0]} ${r2(y + h - 0.5)}H${r2(x + w - 0.5)}V${r2(y + 0.5)}H${zig[0].split(" ")[0]}Z`}
            fill={stip(id, "light")}
            stroke="none"
          />
          <path d={`M${zig.join("L")}`} fill="none" {...ink} />
          <Gear cx={r2(x + w * 0.46)} cy={r2(y + h * 0.4)} r={r2(h * 0.17)} n={10} />
          <Gear cx={r2(x + w * 0.72)} cy={r2(y + h * 0.64)} r={r2(h * 0.13)} n={8} phase={0.25} />
        </g>
      ) : (
        <rect x={r2(x + w / 2 - 16)} y={r2(y + h - 12)} width={32} height={4} fill={PAT.ink} />
      )}
    </g>
  );
}

/* --------------------------------------------------------------------------
   From Anecdotal Prompts to Scientific Behavioral Audits
   -------------------------------------------------------------------------- */

const SLIP_PILE = [1, 3, 6, 8, 5, 3, 1];
const READ_PMF = [0.04, 0.07, 0.12, 0.21, 0.31, 0.17, 0.08];

/**
 * The two frameworks side by side. Left: a closed housing (a black-box
 * interface) drops answer slips one by one into a pile that builds a
 * histogram. Right: the housing is broken open and its seven scale
 * probabilities are read straight off as columns.
 */
export function AuditBench() {
  const id = "w4-bench";
  const base = 262;
  return (
    <Frame
      width={560}
      height={318}
      label="Patent drawing of the two audit frameworks. Left, Monte-Carlo sampling: a closed model housing drops sampled answer slips that pile up into a histogram. Right, exact probability mass function analysis: the housing is cut open to show its gears, and seven probability columns over the scale points 1 to 7 are read off it directly."
    >
      <PatentDefs id={id} />
      {/* Monte-Carlo sampling */}
      <g transform="translate(-60 0)">
        <Housing id={id} x={110} y={40} w={150} h={96} />
        {[0, 1].map((k) => (
          <g key={k}>
            <line x1={r2(187 + k * 4)} y1={r2(146 + k * 26)} x2={r2(187 + k * 4)} y2={r2(152 + k * 26)} {...hair} />
            <Chip id={id} x={r2(178 + k * 4)} y={r2(164 + k * 26)} w={16} d={5} sk={5} />
          </g>
        ))}
        <line x1={100} y1={base + 0.5} x2={288} y2={base + 0.5} {...ink} />
        {SLIP_PILE.map((c, i) =>
          Array.from({ length: c }, (_, j) => <Chip key={`${i}-${j}`} id={id} x={r2(104 + i * 25)} y={r2(base - 1 - j * 7)} w={17} d={5} sk={5} />),
        )}
        <FigureName x={194} y={300} size={14}>
          Monte-Carlo sampling
        </FigureName>
      </g>

      {/* Exact probability mass function analysis */}
      <g transform="translate(-200 0)">
        <Housing id={id} x={520} y={40} w={150} h={96} open />
        {READ_PMF.map((p, i) => {
          const h = r2(p * 300);
          const x = 510 + i * 25;
          return <ObliqueBox key={i} id={id} x={x} y={r2(base - h)} w={16} h={h} dx={6} dy={4} />;
        })}
        <line x1={500} y1={base + 0.5} x2={694} y2={base + 0.5} {...ink} />
        {READ_PMF.map((_, i) => (
          <Num key={i} x={518 + i * 25} y={base + 16} size={12}>
            {i + 1}
          </Num>
        ))}
        <FigureName x={600} y={300} size={14}>
          exact probability mass function analysis
        </FigureName>
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Why Single-Prompt Evaluations Fail
   -------------------------------------------------------------------------- */

/** A wide, two-humped response density over 0..1 (unnormalised). */
const wideDensity = (u: number) => 0.9 * Math.exp(-0.5 * ((u - 0.36) / 0.13) ** 2) + 0.65 * Math.exp(-0.5 * ((u - 0.7) / 0.11) ** 2);

/**
 * Two figures. Left: the model's distribution over possible completions, a
 * stippled hill over the outcome axis, with the one completion pass-at-one
 * draws marked in red (n = 1). Right: a crowd of consumers in three rows, one
 * of them in red under a hand lens: the single consumer surveyed.
 */
export function OneDraw() {
  const id = "w4-onedraw";
  const x0 = 40;
  const x1 = 360;
  const base = 168;
  const pts = Array.from({ length: 81 }, (_, i) => {
    const u = i / 80;
    return `${r2(x0 + u * (x1 - x0))} ${r2(base - wideDensity(u) * 118)}`;
  });
  const drawU = 0.8;
  const dx = r2(x0 + drawU * (x1 - x0));
  const dy = r2(base - wideDensity(drawU) * 118);
  const crowd = [0, 1, 2].flatMap((row) => Array.from({ length: 8 }, (_, i) => ({ row, x: r2(458 + i * 38 + (row % 2) * 17), y: 96 + row * 36 })));
  const pick = crowd[19];
  return (
    <Frame
      width={800}
      height={222}
      label="Patent drawing of two figures. Left, pass-at-one: a model's wide, two-humped distribution over possible completions, drawn as a stippled hill, with the single completion that is drawn marked by a red line, n = 1. Right, a single consumer: a crowd of 24 people in three rows, one of them in red under a hand lens."
    >
      <PatentDefs id={id} />
      {/* pass-at-one */}
      <path d={`M${x0} ${base}L${pts.join("L")}L${x1} ${base}Z`} fill={stip(id, "light")} {...ink} />
      <line x1={x0 - 10} y1={base + 0.5} x2={x1 + 10} y2={base + 0.5} {...ink} />
      <line x1={dx} y1={base} x2={dx} y2={r2(dy - 26)} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
      <circle cx={dx} cy={r2(dy - 30)} r={4} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.bold} />
      <Num x={r2(dx + 10)} y={r2(dy - 26)} anchor="start" size={15} fill={PAT.signal}>
        n = 1
      </Num>
      <FigureName x={200} y={204} size={14}>
        pass-at-one
      </FigureName>

      {/* a single consumer */}
      {crowd.map((c, i) => (c === pick ? null : <Figure key={i} id={id} x={c.x} y={c.y} s={0.42} coat={c.row === 1 ? "paper" : "light"} />))}
      <Figure id={id} x={pick.x} y={pick.y} s={0.42} coat="signal" stroke={PAT.signal} />
      <circle cx={pick.x} cy={r2(pick.y - 17)} r={21} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} />
      <line
        x1={r2(pick.x + 15)}
        y1={r2(pick.y - 2)}
        x2={r2(pick.x + 27)}
        y2={r2(pick.y + 10)}
        stroke={PAT.signal}
        strokeWidth={LINE.bold * 2}
        strokeLinecap="round"
      />
      <FigureName x={600} y={204} size={14}>
        a single consumer
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Part 1: The Monte-Carlo Sampling Framework for Open-Ended Decisions
   -------------------------------------------------------------------------- */

const BOARD_PILE = [1, 4, 7, 9, 6, 3, 1];
/** One answer's path through the pegs: -1 left, +1 right at each row. */
const BOARD_PATH = [1, -1, 1, 1];

/**
 * A Galton board in a framed case: each row of pegs is one token chosen in
 * turn, so the dollar answer only exists once a draw has fallen through every
 * row. The bins below hold the answers drawn so far, piled into the output
 * distribution. One more draw, in red, is still falling.
 */
export function SampleDispenser() {
  const id = "w4-galton";
  const cx = 280;
  const sp = 44;
  const row0 = 92;
  const rowH = 22;
  const binTop = 222;
  const binBot = 318;
  const pegs = Array.from({ length: 6 }, (_, i) => Array.from({ length: i + 1 }, (_, j) => ({ x: r2(cx + (j - i / 2) * sp), y: row0 + i * rowH }))).flat();
  // The falling draw: from the hopper mouth, bouncing off a peg in each row.
  let px = cx;
  const path = [`${cx} ${row0 - 22}`];
  BOARD_PATH.forEach((d, i) => {
    path.push(`${r2(px)} ${row0 + i * rowH - 8}`);
    px += (d * sp) / 2;
    path.push(`${r2(px)} ${row0 + i * rowH + 10}`);
  });
  return (
    <Frame
      width={440}
      height={362}
      label="Patent drawing of a Galton board in a framed case. A hopper at the top feeds six rows of pegs, one row per token chosen in turn. Seven bins at the bottom, marked 25 to 85 dollars, hold 31 sampled answers piled into a hump-shaped distribution. One more answer, in red, is partway down its path through the pegs."
    >
      <PatentDefs id={id} />
      <g transform="translate(-60 0)">
        <ObliqueBox id={id} x={110} y={42} w={340} h={290} dx={14} dy={9} />
        {/* hopper */}
        <path d={`M${cx - 46} 50L${cx - 9} ${row0 - 26}V${row0 - 20}M${cx + 46} 50L${cx + 9} ${row0 - 26}V${row0 - 20}`} fill="none" {...ink} />
        {[-20, -6, 8, 22, -13, 1, 15].map((dx, i) => (
          <circle key={i} cx={cx + dx} cy={i < 4 ? 56 : 66} r={5} fill={PAT.paper} {...ink} />
        ))}
        {/* pegs */}
        {pegs.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={2.6} fill={PAT.ink} />
        ))}
        {/* bins */}
        {Array.from({ length: 8 }, (_, k) => {
          const x = r2(cx + (k - 3.5) * sp);
          return <line key={k} x1={x} y1={binTop} x2={x} y2={binBot} {...ink} />;
        })}
        <line x1={r2(cx - 3.5 * sp)} y1={binBot + 0.5} x2={r2(cx + 3.5 * sp)} y2={binBot + 0.5} {...ink} />
        {BOARD_PILE.map((c, k) =>
          Array.from({ length: c }, (_, j) => (
            <circle key={`${k}-${j}`} cx={r2(cx + (k - 3) * sp)} cy={r2(binBot - 6 - j * 9.5)} r={4.5} fill={stip(id, "light")} {...ink} />
          )),
        )}
        {/* the draw still falling */}
        <path d={`M${path.join("L")}`} fill="none" stroke={PAT.signal} strokeWidth={LINE.hair} strokeDasharray="3 3" />
        <circle cx={r2(px)} cy={row0 + 3 * rowH + 11} r={4.5} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />
        {BOARD_PILE.map((_, k) => (
          <Num key={k} x={r2(cx + (k - 3) * sp)} y={352} size={13}>
            {`$${25 + k * 10}`}
          </Num>
        ))}
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Stochastic Generation and Response Entropy
   -------------------------------------------------------------------------- */

/** Standard normal draws from a seeded stream (Box-Muller). */
function normals(seed: number, n: number) {
  const rnd = seeded(seed);
  return Array.from({ length: n }, () => {
    const u = Math.max(1e-9, rnd());
    const v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  });
}

/** Two models' quoted prices: A answers steadily, B with high entropy but a higher true mean. */
const MODEL_A = { mean: 52, sd: 5 };
const MODEL_B = { mean: 58, sd: 15 };
const MAX_PAIRS = 400;
const PAIRS = (() => {
  const za = normals(41, MAX_PAIRS);
  const zb = normals(97, MAX_PAIRS);
  const clamp = (v: number) => Math.min(108, Math.max(22, v));
  return za.map((z, i) => ({ a: Math.round(clamp(MODEL_A.mean + MODEL_A.sd * z)), b: Math.round(clamp(MODEL_B.mean + MODEL_B.sd * zb[i])) }));
})();
const gauss = (v: number, m: number, sd: number) => Math.exp(-0.5 * ((v - m) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));

/**
 * Two models on parallel tracks over one dollar scale: each model's response
 * distribution (narrow for A, wide for B) with its expected value marked
 * beneath. Each press draws one response from each model, pinned in red on
 * its track. Below, a tally keeps every single-draw comparison: a tick when
 * the draw ranks B above A (as their expected values do), a red cross when
 * noise reverses the order.
 */
export function TwoModelsOneDraw() {
  const [n, setN] = useState(12);
  const id = "w4-onedraw2";
  const x0 = 132;
  const x1 = 540;
  const xAt = (v: number) => r2(x0 + ((v - 20) / 90) * (x1 - x0));
  const rows = [
    { key: "Model A", m: MODEL_A, base: 104, draw: PAIRS[n - 1].a },
    { key: "Model B", m: MODEL_B, base: 206, draw: PAIRS[n - 1].b },
  ];
  const shown = PAIRS.slice(0, n);
  const reversed = shown.filter((p) => p.b <= p.a).length;
  const tally = shown.slice(-40);
  return (
    <div>
      <Frame
        width={560}
        height={318}
        label={`Patent drawing of two models' response distributions over one dollar scale from 20 to 110. Model A: narrow, expected value $${MODEL_A.mean}. Model B: wide, expected value $${MODEL_B.mean}. The latest single draw, in red: A $${PAIRS[n - 1].a}, B $${PAIRS[n - 1].b}. Below, a tally of ${n} single-draw comparisons, ${reversed} of them reversing the true order.`}
      >
        <PatentDefs id={id} />
        {rows.map((r) => {
          const pts = Array.from({ length: 121 }, (_, i) => {
            const v = 20 + (i / 120) * 90;
            return `${xAt(v)} ${r2(r.base - gauss(v, r.m.mean, r.m.sd) * 860)}`;
          });
          const dy = r2(r.base - gauss(r.draw, r.m.mean, r.m.sd) * 860);
          return (
            <g key={r.key}>
              <SmallModel id={id} x={22} y={r.base - 62} w={50} h={44} />
              <PatentKey x={48} y={r.base + 18} size={12}>
                {r.key}
              </PatentKey>
              <path d={`M${pts.join("L")}Z`} fill={stip(id, "light")} {...ink} />
              <line x1={x0 - 6} y1={r.base + 0.5} x2={x1 + 6} y2={r.base + 0.5} {...ink} />
              <path d={`M${xAt(r.m.mean)} ${r.base + 3}l-5 8h10Z`} fill={PAT.ink} />
              <line
                x1={xAt(r.draw)}
                y1={r.base}
                x2={xAt(r.draw)}
                y2={r2(Math.min(dy, r.base - 8) - 14)}
                stroke={PAT.signal}
                strokeWidth={LINE.bold}
                strokeLinecap="round"
              />
              <circle cx={xAt(r.draw)} cy={r2(Math.min(dy, r.base - 8) - 18)} r={3.5} fill={PAT.paper} stroke={PAT.signal} strokeWidth={LINE.bold} />
              <Num x={r2(xAt(r.draw) + 8)} y={r2(Math.min(dy, r.base - 8) - 14)} anchor="start" size={14} fill={PAT.signal}>
                {`$${r.draw}`}
              </Num>
            </g>
          );
        })}
        {[20, 35, 50, 65, 80, 95, 110].map((v) => (
          <g key={v}>
            <line x1={xAt(v)} y1={207} x2={xAt(v)} y2={211} {...hair} />
            <Num x={xAt(v)} y={232} size={13}>
              {`$${v}`}
            </Num>
          </g>
        ))}
        {/* tally of single-draw comparisons */}
        <line x1={22} y1={250.5} x2={540} y2={250.5} {...hair} />
        {tally.map((p, i) => {
          const cx = r2(30 + i * 12.6);
          const bad = p.b <= p.a;
          return bad ? (
            <path key={i} d={cross(cx, 272, 4)} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinecap="round" />
          ) : (
            <path key={i} d={tick(cx, 272, 4.5)} fill="none" {...ink} />
          );
        })}
        <Num x={22} y={304} anchor="start" size={14}>
          {`${n} ${n === 1 ? "draw" : "draws"} | `}
          <tspan fill={PAT.signal}>{`${reversed} reversed`}</tspan>
        </Num>
      </Frame>
      <div className="mt-2.5 flex flex-wrap gap-2 px-1">
        <PlateButton onClick={() => setN((v) => Math.min(v + 1, MAX_PAIRS))}>Draw one response from each</PlateButton>
        <PlateButton onClick={() => setN((v) => Math.min(v + 20, MAX_PAIRS))}>Draw 20 more</PlateButton>
        <PlateButton onClick={() => setN(1)}>Start over</PlateButton>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The Monte-Carlo Estimator and Its Statistical Guarantees
   -------------------------------------------------------------------------- */

const MC = { mean: 58, sd: 15 };
const K_STEPS = [1, 2, 3, 5, 8, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200, 300, 400];
/** Thirty repeated audits, each a standard-normal deviation of its K-sample mean. */
const AUDIT_Z = normals(203, 30);

/**
 * Thirty repeated audits of the same prompt condition, each reporting the
 * sample mean of K responses, stacked as dots over the dollar scale around the
 * true expected value (ink triangle). The sampling distribution is drawn over
 * them and the 95% confidence interval is a red caliper. Beside it, the
 * standard error against K marks where the slider sits: each fourfold
 * increase in K only halves the interval.
 */
export function EstimatorConverges() {
  const [step, setStep] = useState(5);
  const id = "w4-mc";
  const K = K_STEPS[step];
  const se = MC.sd / Math.sqrt(K);
  const x0 = 30;
  const x1 = 530;
  const lo = 28;
  const hi = 88;
  const xAt = (v: number) => r2(x0 + ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * (x1 - x0));
  const base = 196;
  const stacks: Record<number, number> = {};
  const dots = AUDIT_Z.map((z) => {
    const x = xAt(MC.mean + se * z);
    const bin = Math.round(x / 7);
    stacks[bin] = (stacks[bin] ?? 0) + 1;
    return { x: bin * 7, y: r2(base - 5 - (stacks[bin] - 1) * 7) };
  });
  const peak = Math.max(...Object.values(stacks)) * 7 + 12;
  const env = Math.hypot(se, 0.84) * 1.35;
  const curve = Array.from({ length: 241 }, (_, i) => {
    const v = lo + (i / 240) * (hi - lo);
    return `${xAt(v)} ${r2(base - peak * Math.exp(-0.5 * ((v - MC.mean) / env) ** 2))}`;
  });
  const half = 1.96 * se;
  // standard error against K
  const gx0 = 300;
  const gx1 = 530;
  const gy0 = 256;
  const gy1 = 330;
  const gxAt = (k: number) => r2(gx0 + ((k - 1) / 399) * (gx1 - gx0));
  const gyAt = (s: number) => r2(gy1 - (s / MC.sd) * (gy1 - gy0));
  const seCurve = Array.from({ length: 100 }, (_, i) => {
    const k = 1 + (i / 99) ** 2 * 399;
    return `${gxAt(k)} ${gyAt(MC.sd / Math.sqrt(k))}`;
  });
  return (
    <div>
      <Frame
        width={560}
        height={378}
        label={`Patent drawing of the Monte-Carlo estimator with K = ${K} responses per audit. Thirty repeated audits' sample means are stacked as dots over a dollar scale from 28 to 88 around the true expected value of $${MC.mean}, under a normal sampling distribution. The 95% confidence interval, in red, is plus or minus $${half.toFixed(2)}. A small chart beside it plots the standard error against K, falling steeply and then flattening, with the current K marked: standard error $${se.toFixed(2)}.`}
      >
        <PatentDefs id={id} />
        <path d={`M${curve.join("L")}`} fill="none" {...hair} />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={3.2} fill={stip(id, "light")} {...ink} />
        ))}
        <line x1={x0 - 8} y1={base + 0.5} x2={x1 + 8} y2={base + 0.5} {...ink} />
        <path d={`M${xAt(MC.mean)} ${base + 3}l-5 8h10Z`} fill={PAT.ink} />
        {[30, 40, 50, 60, 70, 80].map((v) => (
          <Num key={v} x={xAt(v)} y={base + 28} size={13}>
            {`$${v}`}
          </Num>
        ))}
        {/* the 95% interval */}
        <g stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round">
          <line x1={xAt(MC.mean - half)} y1={base + 46} x2={xAt(MC.mean + half)} y2={base + 46} />
          <line x1={xAt(MC.mean - half)} y1={base + 39} x2={xAt(MC.mean - half)} y2={base + 53} />
          <line x1={xAt(MC.mean + half)} y1={base + 39} x2={xAt(MC.mean + half)} y2={base + 53} />
        </g>
        <Num x={30} y={300} anchor="start" size={22}>
          {`K = ${K}`}
        </Num>
        <Num x={30} y={330} anchor="start" size={15} fill={PAT.signal}>
          {`95% interval ± $${half.toFixed(2)}`}
        </Num>
        {/* standard error against K */}
        <line x1={gx0} y1={gy0 - 4} x2={gx0} y2={gy1 + 0.5} {...ink} />
        <line x1={gx0} y1={gy1 + 0.5} x2={gx1 + 4} y2={gy1 + 0.5} {...ink} />
        <path d={`M${seCurve.join("L")}`} fill="none" {...ink} />
        <circle cx={gxAt(K)} cy={gyAt(se)} r={4} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} />
        {[1, 100, 200, 300, 400].map((k) => (
          <Num key={k} x={gxAt(k)} y={gy1 + 15} size={11}>
            {k}
          </Num>
        ))}
        <FigureName x={r2((gx0 + gx1) / 2)} y={372} size={13}>
          standard error
        </FigureName>
      </Frame>
      <Slider label="Samples K" value={step} min={0} max={K_STEPS.length - 1} onChange={setStep} formatValue={(v) => String(K_STEPS[v])} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Behavioral Validity Metrics: CSVR, APD, and Coefficient of Variation
   -------------------------------------------------------------------------- */

const LIST_PRICE = 55;
const VALID = [15, 120];
type ValidityModel = "A" | "B" | "C" | "D";
/** Each model's 100 answers: centre, spread, and how many fall off the scale (negative or absurd). */
const VALIDITY_SPEC: Record<ValidityModel, { mean: number; sd: number; low: number; high: number; seed: number }> = {
  A: { mean: 88, sd: 4.5, low: 0, high: 0, seed: 11 },
  B: { mean: 57, sd: 27, low: 0, high: 0, seed: 23 },
  C: { mean: 56, sd: 5, low: 9, high: 14, seed: 37 },
  D: { mean: 57, sd: 5.5, low: 0, high: 0, seed: 53 },
};
const validityAnswers = (m: ValidityModel) => {
  const s = VALIDITY_SPEC[m];
  const z = normals(s.seed, 100 - s.low - s.high);
  return {
    onScale: z.map((v) => Math.round(Math.min(148, Math.max(1, s.mean + s.sd * v)))),
    low: s.low,
    high: s.high,
  };
};

/**
 * One model's 100 sampled willingness-to-pay answers stacked over a dollar
 * ruler: the empirically valid range is stippled, the list price hangs as a
 * tag beneath, and answers beyond the ruler (negative, absurd or not a
 * price) pile up past the break marks at either end. The readout gives the
 * three metrics, a red cross on any that fails.
 */
export function ValidityMetrics() {
  const [m, setM] = useState<ValidityModel>("A");
  const id = "w4-validity";
  const x0 = 64;
  const x1 = 544;
  const xAt = (v: number) => r2(x0 + (v / 150) * (x1 - x0));
  const base = 126;
  const a = validityAnswers(m);
  const valid = a.onScale.filter((v) => v >= VALID[0] && v <= VALID[1]);
  const csvr = valid.length / 100;
  const apd = valid.reduce((t, v) => t + Math.abs(v - LIST_PRICE), 0) / valid.length;
  const vm = valid.reduce((t, v) => t + v, 0) / valid.length;
  const cv = Math.sqrt(valid.reduce((t, v) => t + (v - vm) ** 2, 0) / (valid.length - 1)) / vm;
  const stacks: Record<number, number> = {};
  const dots = a.onScale.map((v) => {
    const bin = Math.round(v / 2);
    stacks[bin] = (stacks[bin] ?? 0) + 1;
    return { x: xAt(bin * 2), y: r2(base - 4 - (stacks[bin] - 1) * 5.4), out: v < VALID[0] || v > VALID[1] };
  });
  const pile = (n: number, x: number) => Array.from({ length: n }, (_, j) => ({ x: r2(x + (j % 2) * 6), y: r2(base - 4 - Math.floor(j / 2) * 5.4) }));
  const offDots = [...pile(a.low, 24), ...pile(a.high, 578)];
  const metrics = [
    { key: "CSVR", text: `${Math.round(csvr * 100)}%`, ok: csvr >= 0.95 },
    { key: "APD", text: `$${apd.toFixed(2)}`, ok: apd <= 10 },
    { key: "CV", text: cv.toFixed(2), ok: cv <= 0.2 },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={196}
        label={`Patent drawing of Model ${m}'s 100 sampled willingness-to-pay answers stacked over a dollar ruler from 0 to 150, with the valid range from $${VALID[0]} to $${VALID[1]} stippled and the list price tag at $${LIST_PRICE}. ${a.low + a.high} answers fall off the scale. Readout: CSVR ${metrics[0].text}${metrics[0].ok ? "" : " (fails)"}, APD ${metrics[1].text}${metrics[1].ok ? "" : " (fails)"}, CV ${metrics[2].text}${metrics[2].ok ? "" : " (fails)"}.`}
      >
        <PatentDefs id={id} />
        {/* valid range */}
        <rect x={xAt(VALID[0])} y={base + 1} width={r2(xAt(VALID[1]) - xAt(VALID[0]))} height={9} fill={stip(id, "light")} {...hair} />
        <PatentKey x={xAt(98)} y={base + 58} size={11}>
          Valid range
        </PatentKey>
        {/* the ruler, broken at both ends */}
        <line x1={x0} y1={base + 0.5} x2={x1} y2={base + 0.5} {...ink} />
        <path d={`M${x0 - 4} ${base - 6}l-6 12M${x0 - 9} ${base - 6}l-6 12M${x1 + 9} ${base - 6}l-6 12M${x1 + 14} ${base - 6}l-6 12`} {...ink} />
        <line x1={14} y1={base + 0.5} x2={x0 - 16} y2={base + 0.5} {...ink} />
        <line x1={x1 + 18} y1={base + 0.5} x2={596} y2={base + 0.5} {...ink} />
        {[0, 50, 100, 150].map((v) => (
          <g key={v}>
            <line x1={xAt(v)} y1={base} x2={xAt(v)} y2={base + 14} {...hair} />
            <Num x={xAt(v)} y={base + 30} size={13}>
              {`$${v}`}
            </Num>
          </g>
        ))}
        <line x1={xAt(LIST_PRICE)} y1={base + 10} x2={xAt(LIST_PRICE)} y2={base + 54} {...hair} />
        <Tag cx={r2(xAt(LIST_PRICE) + 33)} cy={base + 54} text={`$${LIST_PRICE}`} w={44} size={13} />
        {/* answers */}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={2.5}
            fill={d.out ? stip(id, "signal") : PAT.paper}
            stroke={d.out ? PAT.signal : PAT.ink}
            strokeWidth={LINE.hair}
          />
        ))}
        {offDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={2.5} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.hair} />
        ))}
        {/* readout */}
        <line x1={628.5} y1={20} x2={628.5} y2={180} {...hair} />
        {metrics.map((mt, i) => {
          const y = 54 + i * 48;
          return (
            <g key={mt.key}>
              <PatentKey x={648} y={y} anchor="start" size={12}>
                {mt.key}
              </PatentKey>
              <Num x={762} y={y + 1} anchor="end" size={18} fill={mt.ok ? PAT.ink : PAT.signal}>
                {mt.text}
              </Num>
              {mt.ok ? (
                <path d={tick(780, y - 5, 5)} fill="none" {...ink} />
              ) : (
                <path d={cross(780, y - 5, 4.5)} stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
              )}
            </g>
          );
        })}
      </Frame>
      <Segmented<ValidityModel>
        label="Model"
        options={[
          { id: "A", label: "Model A" },
          { id: "B", label: "Model B" },
          { id: "C", label: "Model C" },
          { id: "D", label: "Model D" },
        ]}
        value={m}
        onChange={setM}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Anchoring Bias and Generational Regression in LLMs
   -------------------------------------------------------------------------- */

/** A graduated cylinder filled to `p` (0 to 1) of its height `h`. The fill is dense stipple. */
function Cylinder({ id, cx, base, h, p, w = 34 }: { id: string; cx: number; base: number; h: number; p: number; w?: number }) {
  const rx = w / 2;
  const top = base - h;
  const lv = r2(base - h * p);
  return (
    <g>
      <path d={`M${cx - rx} ${lv}V${base}A${rx} 4 0 0 0 ${cx + rx} ${base}V${lv}Z`} fill={stip(id, "dense")} stroke="none" />
      <ellipse cx={cx} cy={lv} rx={rx} ry={4} fill={stip(id, "light")} {...hair} />
      <path d={`M${cx - rx} ${top}V${base}A${rx} 4 0 0 0 ${cx + rx} ${base}V${top}`} fill="none" {...ink} />
      <ellipse cx={cx} cy={top} rx={rx} ry={4} fill="none" {...ink} />
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={cx - rx} y1={r2(base - h * t)} x2={cx - rx + 7} y2={r2(base - h * t)} {...hair} />
      ))}
    </g>
  );
}

/**
 * Wadi & Fredette (2025), three findings. Anchoring: mean willingness to pay
 * shifted +$31.62 by a high anchor and −$15.70 by a low one, drawn as bars
 * either side of the no-anchor line. Anchor-response correlation: the
 * models' 0.697 against the human benchmark's 0.388, as two graduated
 * cylinders over a model housing and a person. Generational regression:
 * Llama 3 70B's absolute price deviation 89% above Llama 2 70B's, in red.
 */
export function AnchoringFindings() {
  const id = "w4-anchor";
  const zx = 150;
  const sc = 3.5;
  return (
    <Frame
      width={800}
      height={222}
      label="Patent drawing of three findings from Wadi and Fredette (2025). Anchoring: a high anchor raised mean willingness to pay by $31.62 and a low anchor lowered it by $15.70, drawn as bars to either side of the no-anchor line. Anchor-response correlation: language models 0.697 against the human benchmark of 0.388, drawn as two graduated cylinders over a model housing and a person. Generational regression: Llama 3 70B's absolute price deviation is 89 percent higher than Llama 2 70B's, its bar drawn in red."
    >
      <PatentDefs id={id} />
      {/* anchoring */}
      <line x1={zx} y1={40} x2={zx} y2={172} {...hair} strokeDasharray={CENTRE_DASH} />
      <PatentKey x={zx - 10} y={86} anchor="end" size={11}>
        High anchor
      </PatentKey>
      <ObliqueBox id={id} x={zx} y={70} w={r2(31.62 * sc)} h={18} dx={8} dy={5} />
      <Num x={r2(zx + 31.62 * sc + 20)} y={84} anchor="start" size={15}>
        +$31.62
      </Num>
      <PatentKey x={zx + 10} y={146} anchor="start" size={11}>
        Low anchor
      </PatentKey>
      <ObliqueBox id={id} x={r2(zx - 15.7 * sc)} y={112} w={r2(15.7 * sc)} h={18} dx={8} dy={5} />
      <Num x={r2(zx - 15.7 * sc - 6)} y={126} anchor="end" size={15}>
        −$15.70
      </Num>
      <FigureName x={160} y={208} size={14}>
        anchoring
      </FigureName>

      {/* anchor-response correlation */}
      <Cylinder id={id} cx={372} base={140} h={96} p={0.697} />
      <Num x={372} y={30} size={15}>
        0.697
      </Num>
      <SmallModel id={id} x={353} y={158} w={34} h={30} />
      <Cylinder id={id} cx={452} base={140} h={96} p={0.388} />
      <Num x={452} y={30} size={15}>
        0.388
      </Num>
      <Figure id={id} x={452} y={186} s={0.4} />
      <FigureName x={412} y={208} size={14}>
        anchor-response correlation
      </FigureName>

      {/* generational regression */}
      <ObliqueBox id={id} x={580} y={r2(150 - 52)} w={40} h={52} dx={9} dy={6} />
      <ObliqueBox
        id={id}
        x={720}
        y={r2(150 - 52 * 1.89)}
        w={40}
        h={r2(52 * 1.89)}
        dx={9}
        dy={6}
        front={PAT.paper}
        top={stip(id, "signal")}
        side={stip(id, "signal")}
        stroke={PAT.signal}
      />
      <Num x={744} y={r2(150 - 52 * 1.89 - 14)} size={15} fill={PAT.signal}>
        +89%
      </Num>
      <line x1={560} y1={150.5} x2={782} y2={150.5} {...ink} />
      <PatentKey x={600} y={170} size={10.5}>
        Llama 2 70B
      </PatentKey>
      <PatentKey x={740} y={170} size={10.5}>
        Llama 3 70B
      </PatentKey>
      <FigureName x={670} y={208} size={14}>
        generational regression
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Part 2: Exact Token-Level Probability Distributions for Rating Scales
   -------------------------------------------------------------------------- */

const LIKERT_PMF = [0.03, 0.05, 0.08, 0.14, 0.27, 0.29, 0.14];

/**
 * A rating-scale item lying flat with seven answer boxes, 1 to 7. On each box stands a column as tall as the model's
 * next-token probability for that digit, read in one pass.
 */
export function LikertLogprobs() {
  const id = "w4-likert";
  const cx0 = 22;
  const cy0 = 330;
  const w = 436;
  const d = 96;
  const sk = 66;
  const at = (u: number, v: number) => ({ x: r2(cx0 + u * w + v * sk), y: r2(cy0 - v * d) });
  const boxV = 0.36;
  return (
    <Frame
      width={540}
      height={350}
      label={`Patent drawing of a rating-scale item card lying flat with seven answer boxes numbered 1 to 7. On each box stands a column as tall as the model's next-token probability for that digit: ${LIKERT_PMF.map((p, i) => `${i + 1}: ${Math.round(p * 100)}%`).join(", ")}.`}
    >
      <PatentDefs id={id} />
      <Sheet id={id} x={cx0} y={cy0} w={w} d={d} sk={sk} t={4} />
      {LIKERT_PMF.map((p, i) => {
        const u = (i + 0.5) / 7;
        const c = at(u, boxV);
        const bw = 13;
        const bd = 0.14;
        const q = [at(u - bw / w, boxV - bd / 2), at(u + bw / w, boxV - bd / 2), at(u + bw / w, boxV + bd / 2), at(u - bw / w, boxV + bd / 2)];
        const n = at(u, 0.1);
        const h = r2(p * 880);
        return (
          <g key={i}>
            <path d={`M${q.map((pt) => `${pt.x} ${pt.y}`).join("L")}Z`} fill={PAT.paper} {...hair} />
            <Num x={n.x} y={r2(n.y + 4)} size={13}>
              {i + 1}
            </Num>
            <ObliqueBox id={id} x={r2(c.x - 9)} y={r2(c.y - h)} w={18} h={h} dx={7} dy={4} />
            <Num x={r2(c.x + 3)} y={r2(c.y - h - 12)} size={12}>
              {`${Math.round(p * 100)}%`}
            </Num>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Why Text Sampling Is Redundant When Token Probabilities Are Observable
   -------------------------------------------------------------------------- */

/**
 * Two vessels. Left: a human population as an opaque urn. Its attitudes
 * cannot be seen, so a few respondents' answers are drawn out of the mouth.
 * Right: the language model as a glass case of seven graduated tubes, one per
 * scale point, each filled to the model's exact probability for that digit,
 * there to be read without drawing anything.
 */
export function SampleVsRead() {
  const id = "w4-urn";
  const base = 262;
  const tubes = LIKERT_PMF.map((p, i) => ({ x: 330 + i * 30, h: r2((p / 0.4) * 190) }));
  return (
    <Frame
      width={560}
      height={318}
      label={`Patent drawing of two vessels. Left, random samples of respondents: an opaque urn standing for a human population, with three answers, 5, 6 and 3, drawn out of its mouth. Right, exact conditional PMF: a glass case of seven graduated tubes for the scale points 1 to 7, filled to ${LIKERT_PMF.map((p) => `${Math.round(p * 100)}%`).join(", ")}.`}
    >
      <PatentDefs id={id} />
      {/* the opaque urn */}
      <path
        d={`M120 112C120 128 112 136 96 150C70 172 66 210 84 236C94 252 104 ${base} 112 ${base}H168C176 ${base} 186 252 196 236C214 210 210 172 184 150C168 136 160 128 160 112Z`}
        fill={stip(id, "dense")}
        {...ink}
      />
      <ellipse cx={140} cy={112} rx={22} ry={6} fill={PAT.paper} {...ink} />
      <line x1={92} y1={base + 0.5} x2={188} y2={base + 0.5} {...ink} />
      {[
        { x: 128, y: 82, d: 5 },
        { x: 156, y: 56, d: 6 },
        { x: 132, y: 30, d: 3 },
      ].map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r={10} fill={PAT.paper} {...ink} />
          <Num x={b.x} y={b.y + 4.5} size={13}>
            {b.d}
          </Num>
        </g>
      ))}
      <path d="M140 100V96M146 72L150 68M138 46L136 44" {...hair} />
      <FigureName x={140} y={300} size={14}>
        random samples of respondents
      </FigureName>

      {/* the glass case of tubes */}
      <ObliqueBox id={id} x={314} y={52} w={218} h={base - 52} dx={14} dy={9} />
      {tubes.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={r2(base - t.h - 6)} width={20} height={r2(t.h)} fill={stip(id, "light")} stroke="none" />
          <line x1={t.x} y1={r2(base - t.h - 6)} x2={t.x + 20} y2={r2(base - t.h - 6)} {...ink} />
          <path d={`M${t.x} ${base - 196}V${base - 6}H${t.x + 20}V${base - 196}`} fill="none" {...ink} />
          {[0.1, 0.2, 0.3].map((g) => (
            <line key={g} x1={t.x} y1={r2(base - 6 - (g / 0.4) * 190)} x2={t.x + 5} y2={r2(base - 6 - (g / 0.4) * 190)} {...hair} />
          ))}
          <Num x={t.x + 10} y={base + 18} size={13}>
            {i + 1}
          </Num>
        </g>
      ))}
      <FigureName x={423} y={300} size={14}>
        exact conditional PMF
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Why Shannon Entropy Fails on Ordinal Rating Scales
   -------------------------------------------------------------------------- */

type Split = "17" | "26" | "35" | "34" | "4";
const SPLITS: Record<Split, number[]> = {
  "17": [1, 7],
  "26": [2, 6],
  "35": [3, 5],
  "34": [3, 4],
  "4": [4],
};
const splitPmf = (s: Split) => [1, 2, 3, 4, 5, 6, 7].map((k) => (SPLITS[s].includes(k) ? 1 / SPLITS[s].length : 0));
const shannon = (p: number[]) => -p.reduce((t, q) => (q > 0 ? t + q * Math.log2(q) : t), 0);
/** Tastle & Wierman (2007) consensus on a 1 to 7 scale. */
const consensus = (p: number[]) => {
  const mu = p.reduce((t, q, i) => t + q * (i + 1), 0);
  return 1 + p.reduce((t, q, i) => (q > 0 ? t + q * Math.log2(1 - Math.abs(i + 1 - mu) / 6) : t), 0);
};

/**
 * The model's probability split across the 1 to 7 scale, chosen below, as two
 * columns (or one). Under it, two linear gauges: Shannon entropy (bits), in
 * red, which reads 1 bit for every two-way split however far apart the
 * points are. And ordinal consensus, which falls to 0 as the split moves to
 * the extremes.
 */
export function EntropyVsConsensus() {
  const [s, setS] = useState<Split>("17");
  const id = "w4-entropy";
  const p = splitPmf(s);
  const H = shannon(p);
  const C = consensus(p);
  const xAt = (k: number) => r2(90 + (k - 1) * 64);
  const base = 206;
  const gauges = [
    { key: "Shannon entropy", v: H, max: Math.log2(7), text: `${H.toFixed(2)} bits`, red: true, ticks: [0, 1, 2] },
    { key: "Consensus", v: C, max: 1, text: C.toFixed(2), red: false, ticks: [0, 0.5, 1] },
  ];
  const g0 = 196;
  const g1 = 470;
  return (
    <div>
      <Frame
        width={560}
        height={352}
        label={`Patent drawing of a model's probability over a 1 to 7 rating scale, split equally on ${SPLITS[s].join(" and ")}. Two gauges below: Shannon entropy reads ${H.toFixed(2)} bits, in red. Ordinal consensus reads ${C.toFixed(2)}.`}
      >
        <PatentDefs id={id} />
        {p.map((q, i) =>
          q > 0 ? (
            <g key={i} style={{ transition: "opacity 300ms" }}>
              <ObliqueBox id={id} x={r2(xAt(i + 1) - 16)} y={r2(base - q * 176)} w={32} h={r2(q * 176)} dx={8} dy={5} />
              <Num x={xAt(i + 1)} y={r2(base - q * 176 - 13)} size={13}>
                {`${Math.round(q * 100)}%`}
              </Num>
            </g>
          ) : null,
        )}
        <line x1={50} y1={base + 0.5} x2={514} y2={base + 0.5} {...ink} />
        {[1, 2, 3, 4, 5, 6, 7].map((k) => (
          <Num key={k} x={xAt(k)} y={base + 18} size={14}>
            {k}
          </Num>
        ))}
        {gauges.map((g, i) => {
          const y = 268 + i * 54;
          const gx = (v: number) => r2(g0 + (v / g.max) * (g1 - g0));
          const c = g.red ? PAT.signal : PAT.ink;
          return (
            <g key={g.key}>
              <PatentKey x={24} y={y + 4} anchor="start" size={11.5}>
                {g.key}
              </PatentKey>
              <line x1={g0} y1={y} x2={g1} y2={y} {...ink} />
              {g.ticks.map((t) => (
                <g key={t}>
                  <line x1={gx(t)} y1={y} x2={gx(t)} y2={y + 5} {...hair} />
                  <Num x={gx(t)} y={y + 18} size={11}>
                    {t}
                  </Num>
                </g>
              ))}
              <g style={{ transform: `translateX(${gx(g.v)}px)`, transition: "transform 450ms ease" }}>
                <path d={`M0 ${y - 1}l-6 -10h12Z`} fill={g.red ? stip(id, "signal") : PAT.ink} stroke={c} strokeWidth={LINE.outline} strokeLinejoin="round" />
              </g>
              <Num x={540} y={y + 5} anchor="end" size={16} fill={c}>
                {g.text}
              </Num>
            </g>
          );
        })}
      </Frame>
      <Segmented<Split>
        label="Mass split on"
        options={[
          { id: "17", label: "1 and 7" },
          { id: "26", label: "2 and 6" },
          { id: "35", label: "3 and 5" },
          { id: "34", label: "3 and 4" },
          { id: "4", label: "4 alone" },
        ]}
        value={s}
        onChange={setS}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   The Three-Layer Exact-PMF Pipeline
   -------------------------------------------------------------------------- */

/** Discrete convolution of two PMFs. */
function convolve(a: number[], b: number[]) {
  const out = new Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
  return out;
}

/** Raw next-token mass: the seven digits, then three words that break the format. */
const RAW_DIGITS = [0.02, 0.04, 0.07, 0.13, 0.25, 0.29, 0.14];
const RAW_WORDS = [
  { t: "Sure", p: 0.03 },
  { t: "I", p: 0.02 },
  { t: "As", p: 0.01 },
];
const VALID_MASS = RAW_DIGITS.reduce((a, b) => a + b, 0);
const ITEM = RAW_DIGITS.map((p) => p / VALID_MASS);

/**
 * The pipeline's three layers side by side, each on its own plinth. Constraint: the raw next-token mass, seven digits in ink and
 * three words in red, whose sum is the task failure rate. Consensus: the
 * renormalized item PMF with its ordinal consensus read on a dial.
 * Construct: seventeen such items convolved into the composite score's
 * distribution over 17 to 119.
 */
export function ThreeLayerExploded() {
  const id = "w4-layers";
  const base = 124;
  const fail = 1 - VALID_MASS;
  const cns = consensus(ITEM);
  const composite = Array.from({ length: 16 }).reduce<number[]>((acc) => convolve(acc, ITEM), ITEM);
  const peak = Math.max(...composite);
  const mean = ITEM.reduce((t, q, i) => t + q * (i + 1), 0) * 17;
  const raw = [...RAW_DIGITS.map((p, i) => ({ t: String(i + 1), p, red: false })), ...RAW_WORDS.map((w) => ({ ...w, red: true }))];
  return (
    <Frame
      width={800}
      height={180}
      label={`Patent drawing of the exact-PMF pipeline as three layers on plinths. Constraint: the raw next-token mass on the digits 1 to 7 and, in red, on the words Sure, I and As, a task failure rate of ${Math.round(fail * 100)}%. Consensus: the renormalized item PMF over 1 to 7 with a dial reading consensus ${cns.toFixed(2)}. Construct: seventeen items convolved into a composite score distribution over 17 to 119, centred near ${Math.round(mean)}.`}
    >
      <PatentDefs id={id} />
      {/* Constraint */}
      {raw.map((r, i) => {
        const x = 28 + i * 23;
        const h = r2(r.p * 300);
        return (
          <g key={i}>
            <ObliqueBox
              id={id}
              x={x}
              y={r2(base - h)}
              w={14}
              h={h}
              dx={5}
              dy={3}
              front={PAT.paper}
              top={r.red ? stip(id, "signal") : undefined}
              side={r.red ? stip(id, "signal") : undefined}
              stroke={r.red ? PAT.signal : PAT.ink}
            />
            <Num x={x + 7} y={base + 30} size={r.t.length > 1 ? 11 : 12} fill={r.red ? PAT.signal : PAT.ink}>
              {r.t}
            </Num>
          </g>
        );
      })}
      <Num x={213} y={r2(base - 30)} size={14} fill={PAT.signal}>
        {`${Math.round(fail * 100)}%`}
      </Num>
      <ObliqueBox id={id} x={20} y={base + 2} w={238} h={10} dx={10} dy={6} />

      {/* Consensus */}
      {ITEM.map((p, i) => {
        const x = 300 + i * 23;
        const h = r2(p * 300);
        return (
          <g key={i}>
            <ObliqueBox id={id} x={x} y={r2(base - h)} w={14} h={h} dx={5} dy={3} />
            <Num x={x + 7} y={base + 30} size={12}>
              {i + 1}
            </Num>
          </g>
        );
      })}
      <Dial cx={490} cy={44} r={22} deg={r2(-60 + cns * 120)} />
      <Num x={490} y={86} size={14}>
        {cns.toFixed(2)}
      </Num>
      <ObliqueBox id={id} x={292} y={base + 2} w={232} h={10} dx={10} dy={6} />

      {/* Construct */}
      {composite.map((q, i) => {
        const x = r2(560 + i * 2.1);
        const h = r2((q / peak) * 112);
        return h > 0.6 ? <line key={i} x1={x} y1={base} x2={x} y2={r2(base - h)} {...hair} /> : null;
      })}
      <line x1={560} y1={base + 0.5} x2={r2(560 + 102 * 2.1)} y2={base + 0.5} {...ink} />
      {[17, 68, 119].map((v) => (
        <Num key={v} x={r2(560 + (v - 17) * 2.1)} y={base + 30} size={12}>
          {v}
        </Num>
      ))}
      <ObliqueBox id={id} x={552} y={base + 2} w={230} h={10} dx={10} dy={6} />

      {[
        { x: 144, t: "Constraint" },
        { x: 413, t: "Consensus" },
        { x: 672, t: "Construct" },
      ].map((k) => (
        <PatentKey key={k.t} x={k.x} y={base + 52} size={12}>
          {k.t}
        </PatentKey>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Part 3: Distributional ANOVA and Hoeffding Decomposition
   -------------------------------------------------------------------------- */

/** Seventeen item PMFs over 1 to 7, each a peaked distribution around its own centre. */
const SCALE_ITEMS = (() => {
  const rnd = seeded(71);
  return Array.from({ length: 17 }, () => {
    const c = 3.6 + rnd() * 2.6;
    const sd = 0.7 + rnd() * 0.7;
    const raw = [1, 2, 3, 4, 5, 6, 7].map((k) => Math.exp(-0.5 * ((k - c) / sd) ** 2));
    const t = raw.reduce((a, b) => a + b, 0);
    return raw.map((v) => v / t);
  });
})();

/**
 * * A seventeen-item scale as a row of upright item cards, each carrying its
 * own seven-point PMF. Beside them, the composite score's exact
 * distribution over 17 to 119, the convolution of all seventeen.
 */
export function ItemStack() {
  const id = "w4-items";
  const composite = SCALE_ITEMS.slice(1).reduce((acc, p) => convolve(acc, p), SCALE_ITEMS[0]);
  const peak = Math.max(...composite);
  const base = 118;
  return (
    <Frame
      width={800}
      height={166}
      label="Patent drawing of a multi-item scale: seventeen upright item cards in a row, each carrying a small seven-point probability distribution. Beside them, the composite construct score's exact distribution over 17 to 119, the convolution of the seventeen item distributions."
    >
      <PatentDefs id={id} />
      {SCALE_ITEMS.map((p, i) => {
        const x = r2(20 + i * 30.5);
        return (
          <g key={i}>
            <ObliqueBox id={id} x={x} y={base - 74} w={24} h={74} dx={5} dy={3} />
            {p.map((q, k) => {
              const lx = r2(x + 3.2 + k * 2.9);
              return <line key={k} x1={lx} y1={base - 8} x2={lx} y2={r2(base - 8 - q * 90)} {...ink} />;
            })}
          </g>
        );
      })}
      <FigureName x={278} y={154} size={14}>
        multi-item scale
      </FigureName>
      {composite.map((q, i) => {
        const x = r2(578 + i * 2);
        const h = r2((q / peak) * 100);
        return h > 0.6 ? <line key={i} x1={x} y1={base} x2={x} y2={r2(base - h)} {...hair} /> : null;
      })}
      <line x1={574} y1={base + 0.5} x2={r2(582 + 102 * 2)} y2={base + 0.5} {...ink} />
      {[17, 68, 119].map((v) => (
        <Num key={v} x={r2(578 + (v - 17) * 2)} y={base + 17} size={12}>
          {v}
        </Num>
      ))}
      <FigureName x={680} y={154} size={14}>
        composite construct score
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Convolving Item Distributions Into a Composite Construct Score
   -------------------------------------------------------------------------- */

/**
 * The scale's seventeen item cards across the top: the first K are in the
 * composite, the rest dashed. Below, the composite score's exact PMF, the
 * discrete convolution of the first K item PMFs, over its full range K to 7K,
 * with its expected value marked. Sliding K turns one jagged item into a
 * smooth composite without ever collapsing it to a single number.
 */
export function ConvolutionBuild() {
  const [K, setK] = useState(3);
  const id = "w4-conv";
  const pmf = SCALE_ITEMS.slice(1, K).reduce((acc, p) => convolve(acc, p), SCALE_ITEMS[0]);
  const peak = Math.max(...pmf);
  const mean = pmf.reduce((t, q, i) => t + q * (K + i), 0);
  const x0 = 40;
  const x1 = 520;
  const base = 276;
  const n = pmf.length;
  const bw = (x1 - x0) / n;
  const xAt = (score: number) => r2(x0 + (score - K + 0.5) * bw);
  return (
    <div>
      <Frame
        width={560}
        height={316}
        label={`Patent drawing of a seventeen-item scale with the first ${K} items included. Below, the composite score's exact distribution from ${K} to ${7 * K}, the convolution of ${K} item distributions, with its expected value ${mean.toFixed(1)} marked.`}
      >
        <PatentDefs id={id} />
        {SCALE_ITEMS.map((p, i) => {
          const x = r2(26 + i * 30);
          const on = i < K;
          return on ? (
            <g key={i}>
              <ObliqueBox id={id} x={x} y={22} w={22} h={48} dx={4} dy={3} />
              {p.map((q, k) => {
                const lx = r2(x + 3 + k * 2.65);
                return <line key={k} x1={lx} y1={64} x2={lx} y2={r2(64 - q * 60)} {...ink} />;
              })}
            </g>
          ) : (
            <rect key={i} x={x} y={22} width={22} height={48} fill="none" {...hair} strokeDasharray="3 3" />
          );
        })}
        {pmf.map((q, i) => {
          const h = r2((q / peak) * 160);
          const x = r2(x0 + i * bw);
          return bw > 6 ? (
            <rect key={i} x={r2(x + bw * 0.12)} y={r2(base - h)} width={r2(bw * 0.76)} height={h} fill={stip(id, "light")} {...ink} />
          ) : (
            <line key={i} x1={r2(x + bw / 2)} y1={base} x2={r2(x + bw / 2)} y2={r2(base - h)} {...(bw > 3 ? ink : hair)} />
          );
        })}
        <line x1={x0 - 6} y1={base + 0.5} x2={x1 + 6} y2={base + 0.5} {...ink} />
        <path d={`M${xAt(mean)} ${base + 3}l-5 8h10Z`} fill={PAT.ink} />
        {[K, 4 * K, 7 * K].map((v, i) => (
          <Num key={i} x={xAt(v)} y={base + 30} size={13}>
            {v}
          </Num>
        ))}
      </Frame>
      <Slider label="Items K" value={K} min={1} max={17} onChange={setK} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Hoeffding Decomposition of Main Effects and Interactions
   -------------------------------------------------------------------------- */

/**
 * Wadi, Ghodrat & Philp (2026): one cell of the fully crossed CETSCALE
 * experiment, Aya Expanse 32B judging the United States, decomposed. Grand
 * mean 66.25, model main effect +21.19, target main effect +2.84 (Table 2),
 * interaction −1.18 (Figure 5). Their sum, 89.10, levels with the cell's
 * composite score of 89.11 (Table 3).
 */
export function HoeffdingStack() {
  const id = "w4-hoeff";
  const sc = 2.8;
  const base = 300;
  const x = 176;
  const w = 86;
  const grand = r2(base - 66.25 * sc);
  const model = r2(grand - 21.19 * sc);
  const target = r2(model - 2.84 * sc);
  const final = r2(target + 1.18 * sc);
  const cx = 438;
  const cTop = r2(base - 89.11 * sc);
  return (
    <Frame
      width={556}
      height={340}
      label="Patent drawing of one cell of a fully crossed experiment, Aya Expanse 32B judging the United States, decomposed into stacked blocks: grand mean 66.25, model main effect plus 21.19, target-country main effect plus 2.84, and an interaction of minus 1.18 cut from the top. The stack levels with a single column for the cell's composite score, 89.11. Data: Wadi, Ghodrat and Philp (2026)."
    >
      <PatentDefs id={id} />
      <g transform="translate(-6 0)">
        {/* the decomposed stack */}
        <ObliqueBox id={id} x={x} y={grand} w={w} h={r2(base - grand)} dx={14} dy={8} />
        <ObliqueBox id={id} x={x} y={model} w={w} h={r2(grand - model)} dx={14} dy={8} />
        <ObliqueBox id={id} x={x} y={target} w={w} h={r2(model - target)} dx={14} dy={8} />
        <rect x={x} y={target} width={w} height={r2(final - target)} fill={stip(id, "light")} stroke={PAT.ink} strokeWidth={LINE.hair} strokeDasharray="3 2" />
        {/* keys */}
        <PatentKey x={x - 14} y={r2((base + grand) / 2 - 4)} anchor="end" size={12}>
          Grand mean
        </PatentKey>
        <Num x={x - 14} y={r2((base + grand) / 2 + 16)} anchor="end" size={15}>
          66.25
        </Num>
        <PatentKey x={x - 14} y={r2((grand + model) / 2 - 4)} anchor="end" size={12}>
          Model effect
        </PatentKey>
        <Num x={x - 14} y={r2((grand + model) / 2 + 16)} anchor="end" size={15}>
          +21.19
        </Num>
        <line x1={x - 10} y1={r2(target - 14)} x2={x - 2} y2={r2((model + target) / 2)} {...hair} />
        <PatentKey x={x - 14} y={r2(target - 26)} anchor="end" size={12}>
          Target effect
        </PatentKey>
        <Num x={x - 14} y={r2(target - 8)} anchor="end" size={15}>
          +2.84
        </Num>
        <line x1={x + w - 8} y1={r2(final - 1)} x2={x + w + 22} y2={r2(final + 22)} {...hair} />
        <PatentKey x={x + w + 26} y={r2(final + 30)} anchor="start" size={12}>
          Interaction
        </PatentKey>
        <Num x={x + w + 26} y={r2(final + 48)} anchor="start" size={15}>
          −1.18
        </Num>
        {/* level line to the composite */}
        <line x1={x + w} y1={final} x2={cx - 2} y2={final} {...hair} strokeDasharray={CENTRE_DASH} />
        {/* the composite score */}
        <ObliqueBox id={id} x={cx} y={cTop} w={w} h={r2(base - cTop)} dx={14} dy={8} />
        <PatentKey x={cx + w / 2 + 3} y={r2(cTop - 38)} size={11.5}>
          Aya Expanse 32B
        </PatentKey>
        <PatentKey x={cx + w / 2 + 3} y={r2(cTop - 22)} size={11.5}>
          United States
        </PatentKey>
        <Num x={cx + w / 2} y={r2(cTop + 30)} size={18}>
          89.11
        </Num>
        <line x1={x - 20} y1={base + 0.5} x2={cx + w + 20} y2={base + 0.5} {...ink} />
        <FigureName x={x + w / 2} y={326} size={14}>
          decomposed effects
        </FigureName>
        <FigureName x={cx + w / 2} y={326} size={14}>
          composite score
        </FigureName>
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Four Distributional Inference Metrics
   -------------------------------------------------------------------------- */

/**
 * One factor level's effect distribution, a PMF over shifts of −20 to +20
 * scale points, set by two sliders. Bars on the dominant side of zero are
 * stippled. The readout computes the four metrics from the drawn PMF: mean
 * shift, predictive dispersion, discrete probability of direction (mass on
 * the dominant side plus half the mass at zero) and signal-to-noise ratio.
 */
export function EffectInstrument() {
  const [shift, setShift] = useState(4);
  const [spread, setSpread] = useState(5);
  const id = "w4-effect";
  const ks = Array.from({ length: 41 }, (_, i) => i - 20);
  const raw = ks.map((k) => Math.exp(-0.5 * ((k - shift) / spread) ** 2));
  const tot = raw.reduce((a, b) => a + b, 0);
  const p = raw.map((v) => v / tot);
  const E = p.reduce((t, q, i) => t + q * ks[i], 0);
  const SD = Math.sqrt(p.reduce((t, q, i) => t + q * (ks[i] - E) ** 2, 0));
  const pos = p.reduce((t, q, i) => (ks[i] > 0 ? t + q : t), 0);
  const neg = p.reduce((t, q, i) => (ks[i] < 0 ? t + q : t), 0);
  const zero = p[20];
  const dominant = pos >= neg ? 1 : -1;
  const dpd = Math.max(pos, neg) + zero / 2;
  const snr = Math.abs(E) / SD;
  const peak = Math.max(...p);
  const x0 = 30;
  const x1 = 522;
  const bw = (x1 - x0) / 41;
  const xAt = (k: number) => r2(x0 + (k + 20.5) * bw);
  const base = 136;
  const rows = [
    { key: "Mean shift", v: `${E >= 0 ? "+" : "−"}${Math.abs(E).toFixed(2)}` },
    { key: "SD", v: SD.toFixed(2) },
    { key: "dPD", v: dpd.toFixed(2) },
    { key: "SNR", v: snr.toFixed(2) },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={166}
        label={`Patent drawing of an effect distribution over shifts from −20 to +20 scale points, with the bars on the dominant side of zero stippled. Mean shift ${rows[0].v}, predictive dispersion ${rows[1].v}, discrete probability of direction ${rows[2].v}, signal-to-noise ratio ${rows[3].v}.`}
      >
        <PatentDefs id={id} />
        <line x1={xAt(0)} y1={14} x2={xAt(0)} y2={base + 6} {...hair} strokeDasharray={CENTRE_DASH} />
        {p.map((q, i) => {
          const k = ks[i];
          const h = r2((q / peak) * 104);
          if (h < 0.4) return null;
          const side = Math.sign(k) === dominant;
          return (
            <rect
              key={k}
              x={r2(xAt(k) - bw * 0.36)}
              y={r2(base - h)}
              width={r2(bw * 0.72)}
              height={h}
              fill={k === 0 ? `url(#${id}-light)` : side ? stip(id, "dense") : PAT.paper}
              stroke={PAT.ink}
              strokeWidth={LINE.hair}
            />
          );
        })}
        <line x1={x0 - 4} y1={base + 0.5} x2={x1 + 4} y2={base + 0.5} {...ink} />
        {[-20, -10, 0, 10, 20].map((v) => (
          <Num key={v} x={xAt(v)} y={base + 22} size={13}>
            {v > 0 ? `+${v}` : v < 0 ? `−${-v}` : "0"}
          </Num>
        ))}
        <path d={`M${xAt(E)} ${base + 3}l-5 8h10Z`} fill={PAT.ink} />
        <line x1={566.5} y1={14} x2={566.5} y2={154} {...hair} />
        {rows.map((r, i) => {
          const y = 36 + i * 34;
          return (
            <g key={r.key}>
              <PatentKey x={584} y={y} anchor="start" size={12}>
                {r.key}
              </PatentKey>
              <Num x={786} y={y + 1} anchor="end" size={18}>
                {r.v}
              </Num>
            </g>
          );
        })}
      </Frame>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Slider
          label="Mean shift"
          value={shift}
          min={-8}
          max={8}
          step={0.5}
          onChange={setShift}
          formatValue={(v) => (v > 0 ? `+${v}` : v < 0 ? `−${-v}` : "0")}
        />
        <Slider label="Dispersion" value={spread} min={1} max={10} step={0.5} onChange={setSpread} formatValue={(v) => v.toFixed(1)} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Part 4: Designing Controlled Factorial Choice and Rating Experiments
   -------------------------------------------------------------------------- */

/** A lever standing in a slot on a top face: pivot (px, py), tilted `deg` from upright (positive = right). */
function Lever({ px, py, deg, len = 104 }: { px: number; py: number; deg: number; len?: number }) {
  const a = (deg * Math.PI) / 180;
  const kx = r2(px + Math.sin(a) * len);
  const ky = r2(py - Math.cos(a) * len);
  const nx = r2(Math.cos(a) * 3);
  const ny = r2(Math.sin(a) * 3);
  return (
    <g>
      <path d={`M${r2(px - 12)} ${py + 2}L${r2(px - 6)} ${py - 2}H${r2(px + 18)}L${r2(px + 12)} ${py + 2}Z`} fill={PAT.ink} />
      <path
        d={`M${r2(px - nx)} ${r2(py - ny)}L${r2(kx - nx)} ${r2(ky - ny)}L${r2(kx + nx)} ${r2(ky + ny)}L${r2(px + nx)} ${r2(py + ny)}Z`}
        fill={PAT.paper}
        {...ink}
      />
      <circle cx={kx} cy={ky} r={9} fill={PAT.paper} {...ink} />
      <circle cx={r2(kx + 2.5)} cy={r2(ky - 2.5)} r={2.5} fill="none" {...hair} />
    </g>
  );
}

/**
 * Two figures of the same two-lever bench. Confounded design: the factor
 * levers are welded together (red), so neither can move alone. Controlled
 * factorial experimentation: the levers are free and set independently.
 */
export function WeldedLevers() {
  const id = "w4-levers";
  const benches = [
    { x: 22, degs: [22, 22], weld: true, name: "confounded design" },
    { x: 296, degs: [-22, 22], weld: false, name: "controlled factorial experimentation" },
  ];
  const at = (px: number, py: number, deg: number, t: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: r2(px + Math.sin(a) * 104 * t), y: r2(py - Math.cos(a) * 104 * t) };
  };
  return (
    <Frame
      width={540}
      height={232}
      label="Patent drawing of a two-lever bench in two figures. Confounded design: the levers for factor A and factor B lean the same way and are welded together by a red bar, so neither can move alone. Controlled factorial experimentation: the two levers are free, one set left and one set right."
    >
      <PatentDefs id={id} />
      <g transform="translate(0 -70)">
        {benches.map((b) => {
          const py = 205;
          const p1 = b.x + 66;
          const p2 = b.x + 160;
          const w1 = at(p1, py, b.degs[0], 0.62);
          const w2 = at(p2, py, b.degs[1], 0.62);
          return (
            <g key={b.name}>
              <ObliqueBox id={id} x={b.x} y={214} w={210} h={30} dx={16} dy={10} />
              <Lever px={p1} py={py} deg={b.degs[0]} />
              <Lever px={p2} py={py} deg={b.degs[1]} />
              {b.weld ? (
                <path
                  d={`M${w1.x} ${r2(w1.y - 5)}L${w2.x} ${r2(w2.y - 5)}V${r2(w2.y + 5)}L${w1.x} ${r2(w1.y + 5)}Z`}
                  fill={stip(id, "signal")}
                  stroke={PAT.signal}
                  strokeWidth={LINE.bold}
                  strokeLinejoin="round"
                />
              ) : null}
              <PatentKey x={p1 + 3} y={234} size={11}>
                Factor A
              </PatentKey>
              <PatentKey x={p2 + 3} y={234} size={11}>
                Factor B
              </PatentKey>
              <FigureName x={b.x + 113} y={280} size={14}>
                {b.name}
              </FigureName>
            </g>
          );
        })}
      </g>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Why Isolated Vignettes Cannot Isolate Causes
   -------------------------------------------------------------------------- */

/** A handwritten-story card standing upright: folded corner, two lines of story, then its three fields. */
function VignetteCard({ x, y, name, job, city }: { x: number; y: number; name: string; job: string; city: string }) {
  const w = 220;
  const h = 150;
  return (
    <g>
      <path d={`M${x} ${y}H${x + w - 18}L${x + w} ${y + 18}V${y + h}H${x}Z`} fill={PAT.paper} {...ink} />
      <path d={`M${x + w - 18} ${y}V${y + 18}H${x + w}`} fill="none" {...hair} />
      {[22, 34].map((dy, i) => (
        <line key={dy} x1={x + 18} y1={y + dy} x2={x + (i ? 150 : 176)} y2={y + dy} {...hair} />
      ))}
      <text x={x + 18} y={y + 66} fontFamily="var(--font-body)" fontSize={20} fill={PAT.ink}>
        {name}
      </text>
      <text x={x + 18} y={y + 100} fontFamily="var(--font-body)" fontSize={15} fill={PAT.ink}>
        {job}
      </text>
      <text x={x + 18} y={y + 132} fontFamily="var(--font-body)" fontSize={15} fill={PAT.ink}>
        {city}
      </text>
    </g>
  );
}

/**
 * The two vignettes side by side, each with the model's response read on a
 * dial beneath. Between them, the four attributes that change together, in
 * red, each led to the field that carries it on both cards: gender and
 * ethnicity to the name, occupation, city.
 */
export function ConfoundedVignettes() {
  const lx = 70;
  const rx = 510;
  const top = 12;
  const rows = [
    { key: "Gender", ky: 58, fy: top + 60 },
    { key: "Ethnicity", ky: 80, fy: top + 60 },
    { key: "Occupation", ky: top + 96, fy: top + 95 },
    { key: "City", ky: top + 128, fy: top + 127 },
  ];
  const red = { stroke: PAT.signal, strokeWidth: LINE.hair, strokeLinecap: "round" as const };
  return (
    <Frame
      width={800}
      height={210}
      label="Patent drawing of two story vignettes side by side: John, software engineer, Boston. And Maria, nurse, Miami. A dial under each card reads the model's response, the two needles at different angles. Between the cards, four attributes in red, gender, ethnicity, occupation and city, are each led to the field that carries it on both cards: all four differ at once."
    >
      <VignetteCard x={lx} y={top} name="John" job="Software engineer" city="Boston" />
      <VignetteCard x={rx} y={top} name="Maria" job="Nurse" city="Miami" />
      {rows.map((r) => (
        <g key={r.key}>
          <PatentKey x={400} y={r.ky + 4} size={11.5} fill={PAT.signal}>
            {r.key}
          </PatentKey>
          <path d={`M${lx + 222} ${r.fy}L${336} ${r.ky}`} fill="none" {...red} />
          <path d={`M${464} ${r.ky}L${rx - 2} ${r.fy}`} fill="none" {...red} />
        </g>
      ))}
      <Dial cx={lx + 110} cy={186} r={18} deg={-40} />
      <Dial cx={rx + 110} cy={186} r={18} deg={35} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Fully Crossed Factorial Designs and Context Isolation
   -------------------------------------------------------------------------- */

/**
 * Above, a fully crossed design in plan: three levels of factor A by four of
 * factor B, every combination a cell, and every cell its own fresh sheet.
 * Below, the same three questions put in sequence. To a person, each earlier
 * question carries over into the next (red arcs). To the model, each trial
 * sits in its own context window, reset in between.
 */
export function CrossedGrid() {
  const id = "w4-grid";
  const gx = 140;
  const gy = 46;
  const cw = 92;
  const ch = 44;
  const qy = 318;
  return (
    <Frame
      width={540}
      height={370}
      label="Patent drawing in three figures. Fully crossed factorial design: a plan grid of three levels of factor A by four levels of factor B, twelve cells, each holding its own fresh sheet. Carryover: a person faces three questions in sequence, red arcs carrying each earlier question into the next. Context isolation: a model faces the same three questions, each inside its own separate context window."
    >
      <PatentDefs id={id} />
      <PatentKey x={gx + 2 * cw} y={16} size={11.5}>
        Factor B
      </PatentKey>
      <PatentKey x={20} y={gy + 1.5 * ch + 4} anchor="start" size={11.5}>
        Factor A
      </PatentKey>
      {[0, 1, 2, 3].map((c) => (
        <Num key={c} x={gx + c * cw + cw / 2} y={36} size={13}>
          {c + 1}
        </Num>
      ))}
      {[0, 1, 2].map((r) => (
        <Num key={r} x={gx - 12} y={gy + r * ch + ch / 2 + 5} size={13}>
          {r + 1}
        </Num>
      ))}
      <rect x={gx} y={gy} width={4 * cw} height={3 * ch} fill="none" {...ink} />
      {[1, 2, 3].map((c) => (
        <line key={c} x1={gx + c * cw} y1={gy} x2={gx + c * cw} y2={gy + 3 * ch} {...hair} />
      ))}
      {[1, 2].map((r) => (
        <line key={r} x1={gx} y1={gy + r * ch} x2={gx + 4 * cw} y2={gy + r * ch} {...hair} />
      ))}
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2, 3].map((c) => <Sheet key={`${r}-${c}`} id={id} x={gx + c * cw + 22} y={gy + r * ch + 32} w={40} d={18} sk={12} t={2} lines={2} />),
      )}
      <FigureName x={gx + 2 * cw} y={gy + 3 * ch + 24} size={14}>
        fully crossed factorial design
      </FigureName>

      {/* carryover */}
      <Figure id={id} x={40} y={qy + 12} s={0.6} />
      {[0, 1, 2].map((i) => (
        <Sheet key={i} id={id} x={70 + i * 56} y={qy} w={38} d={16} sk={12} t={2} lines={2} />
      ))}
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${r2(96 + i * 56)} ${qy - 20}Q${r2(116 + i * 56)} ${qy - 46} ${r2(138 + i * 56)} ${qy - 22}`}
          fill="none"
          stroke={PAT.signal}
          strokeWidth={LINE.outline}
          strokeLinecap="round"
        />
      ))}
      {[0, 1].map((i) => (
        <path
          key={i}
          d={headAlongPath(r2(138 + i * 56), qy - 22, 1, 1.2, 7)}
          fill="none"
          stroke={PAT.signal}
          strokeWidth={LINE.outline}
          strokeLinecap="round"
        />
      ))}
      <FigureName x={140} y={358} size={14}>
        carryover
      </FigureName>

      {/* context isolation */}
      <SmallModel id={id} x={300} y={qy - 34} w={40} h={36} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={364 + i * 58} y={qy - 34} width={50} height={44} fill="none" {...hair} strokeDasharray="4 3" />
          <Sheet id={id} x={372 + i * 58} y={qy} w={26} d={14} sk={10} t={2} lines={2} />
        </g>
      ))}
      <FigureName x={428} y={358} size={14}>
        context isolation
      </FigureName>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Controlling Prompt Sensitivity, Order Effects, and Framing
   -------------------------------------------------------------------------- */

/** A small product glyph for list rows: one shape per product. */
function ProductMark({ cx, cy, shape }: { cx: number; cy: number; shape: number }) {
  const s = 7;
  const d = [
    `M${cx - s} ${cy}A${s} ${s} 0 1 0 ${cx + s} ${cy}A${s} ${s} 0 1 0 ${cx - s} ${cy}Z`,
    `M${cx - s} ${cy - s}H${cx + s}V${cy + s}H${cx - s}Z`,
    `M${cx} ${cy - s}L${cx + s} ${cy + s}H${cx - s}Z`,
    `M${cx} ${cy - s}L${cx + s} ${cy}L${cx} ${cy + s}L${cx - s} ${cy}Z`,
  ][shape];
  return <path d={d} fill={PAT.paper} {...ink} />;
}

/** A row of stars, `n` filled with light stipple. */
function StarRow({ id, x, y, n, of = 5 }: { id: string; x: number; y: number; n: number; of?: number }) {
  return (
    <g>
      {Array.from({ length: of }, (_, i) => (
        <path key={i} d={star(x + i * 15, y, 6.5)} fill={i < n ? stip(id, "dense") : PAT.paper} {...hair} />
      ))}
    </g>
  );
}

/**
 * One small plate per control. Template counterbalancing: three prompt
 * cards of different wording joined by a bracket into one condition.
 * Polarity: the same scale printed forward and reversed. Position: four
 * products listed in one order in a first session and reshuffled in a
 * second, a hairline following each product. Matching: two product cards
 * identical in price, warranty and stars, differing only in the one
 * manipulated attribute, ringed.
 */
export function FourControls({ kind }: { kind: "template" | "polarity" | "position" | "matching" }) {
  const id = `w4-ctl-${kind}`;
  if (kind === "template") {
    const cards = [
      [0.7, 0.5, 0.62],
      [0.55, 0.72, 0.4],
      [0.66, 0.36, 0.58],
    ];
    return (
      <Frame
        width={240}
        height={150}
        label="Patent drawing of prompt template counterbalancing: three prompt cards with differently worded lines, joined by a bracket into one experimental condition."
      >
        <PatentDefs id={id} />
        {cards.map((c, i) => {
          const x = 14 + i * 74;
          return (
            <g key={i}>
              <ObliqueBox id={id} x={x} y={20} w={62} h={66} dx={5} dy={4} />
              {c.map((f, j) => (
                <line key={j} x1={x + 8} y1={38 + j * 14} x2={r2(x + 8 + f * 46)} y2={38 + j * 14} {...hair} />
              ))}
            </g>
          );
        })}
        <path d="M45 96V108H193V96M119 108V122" fill="none" {...ink} />
        <path d={`M105 124H133V140H105Z`} fill={stip(id, "light")} {...ink} />
      </Frame>
    );
  }
  if (kind === "polarity") {
    const strip = (y: number, rev: boolean) =>
      [1, 2, 3, 4, 5, 6, 7].map((k, i) => (
        <g key={`${y}-${k}`}>
          <rect x={18 + i * 30} y={y} width={26} height={26} fill={PAT.paper} {...ink} />
          <Num x={31 + i * 30} y={y + 18} size={14}>
            {rev ? 8 - k : k}
          </Num>
        </g>
      ));
    return (
      <Frame
        width={240}
        height={150}
        label="Patent drawing of scale direction and polarity counterbalancing: the same seven-point scale printed forward, 1 to 7, and reversed, 7 to 1."
      >
        {strip(30, false)}
        {strip(92, true)}
      </Frame>
    );
  }
  if (kind === "position") {
    const first = [0, 1, 2, 3];
    const second = [2, 0, 3, 1];
    const rowY = (i: number) => 30 + i * 28;
    return (
      <Frame
        width={240}
        height={150}
        label="Patent drawing of position randomization: four products listed in one order in a first session and in a shuffled order in a second session, with a hairline following each product from its first position to its new one."
      >
        {[0, 1].map((col) => (
          <g key={col}>
            <rect x={col ? 150 : 18} y={14} width={72} height={124} fill={PAT.paper} {...ink} />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <ProductMark cx={(col ? 150 : 18) + 16} cy={rowY(i)} shape={(col ? second : first)[i]} />
                <line x1={(col ? 150 : 18) + 30} y1={rowY(i)} x2={(col ? 150 : 18) + 62} y2={rowY(i)} {...hair} />
              </g>
            ))}
          </g>
        ))}
        {first.map((p, i) => {
          const j = second.indexOf(p);
          return <path key={p} d={`M92 ${rowY(i)}C120 ${rowY(i)} 122 ${rowY(j)} 148 ${rowY(j)}`} fill="none" {...hair} />;
        })}
      </Frame>
    );
  }
  return (
    <Frame
      width={240}
      height={150}
      label="Patent drawing of attribute matching: two product cards with the same price tag, the same two-year warranty and the same four stars, differing only in the one manipulated attribute, a mark at the top of each card, which is ringed."
    >
      <PatentDefs id={id} />
      {[0, 1].map((i) => {
        const x = 14 + i * 116;
        return (
          <g key={i}>
            <ObliqueBox id={id} x={x} y={14} w={96} h={124} dx={6} dy={4} />
            <ProductMark cx={x + 48} cy={36} shape={i === 0 ? 0 : 2} />
            <Tag cx={x + 52} cy={68} text="$49" w={40} size={12} />
            <PatentKey x={x + 48} y={98} size={11.5}>
              2 yr
            </PatentKey>
            <StarRow id={id} x={x + 18} y={120} n={4} />
            <Detail cx={x + 48} cy={36} r={15} />
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Part 5: Enterprise Pre-Deployment and Post-Deployment Auditing Workflows
   -------------------------------------------------------------------------- */

/** A barrier gate: a post with a striped boom, raised or lowered across the track to its left. */
function BarrierGate({ id, x, ground, raised }: { id: string; x: number; ground: number; raised: boolean }) {
  const py = ground - 58;
  const len = raised ? 84 : 96;
  const segs = 6;
  const along = (t: number) => (raised ? { x: r2(x + 4 - Math.sin(0.25) * len * t), y: r2(py - Math.cos(0.25) * len * t) } : { x: r2(x + 4 - len * t), y: py });
  return (
    <g>
      {Array.from({ length: segs }, (_, i) => {
        const a = along(i / segs);
        const b = along((i + 1) / segs);
        const nx = raised ? r2(Math.cos(0.25) * 3.5) : 0;
        const ny = raised ? r2(-Math.sin(0.25) * 3.5) : 3.5;
        return (
          <path
            key={i}
            d={`M${r2(a.x - nx)} ${r2(a.y - ny)}L${r2(b.x - nx)} ${r2(b.y - ny)}L${r2(b.x + nx)} ${r2(b.y + ny)}L${r2(a.x + nx)} ${r2(a.y + ny)}Z`}
            fill={i % 2 ? PAT.paper : stip(id, "signal")}
            stroke={PAT.signal}
            strokeWidth={LINE.outline}
            strokeLinejoin="round"
          />
        );
      })}
      <ObliqueBox id={id} x={x} y={py - 4} w={9} h={ground - py + 4} dx={5} dy={3} />
      <circle cx={x + 4.5} cy={py} r={2.4} fill={PAT.ink} />
    </g>
  );
}

/** A model housing on two wheels, with its version keyed on the front. */
function ModelCar({ id, x, ground, v }: { id: string; x: number; ground: number; v: string }) {
  return (
    <g>
      <SmallModel id={id} x={x} y={ground - 60} w={64} h={46} />
      <circle cx={x + 14} cy={ground - 7} r={7} fill={PAT.paper} {...ink} />
      <circle cx={x + 50} cy={ground - 7} r={7} fill={PAT.paper} {...ink} />
      <PatentKey x={x + 32} y={ground - 70} size={12}>
        {v}
      </PatentKey>
    </g>
  );
}

/**
 * The model lifecycle as a track in side elevation. Version 1 has passed the
 * first audit gate (boom raised) and runs past monitoring dials. Version 2
 * waits at the next gate, its boom lowered. Each gate is red: the audit
 * recurs with every version.
 */
export function LifecycleGates() {
  const id = "w4-gates";
  const ground = 176;
  return (
    <Frame
      width={800}
      height={196}
      label="Patent drawing of the model lifecycle as a track in side elevation. Version 1, a model housing on wheels, has passed a first audit gate whose red-striped boom is raised, and runs past two monitoring dials on posts. Version 2 waits at a second gate with its red-striped boom lowered across the track."
    >
      <PatentDefs id={id} />
      <line x1={14} y1={ground + 0.5} x2={786} y2={ground + 0.5} {...ink} strokeWidth={LINE.bold} />
      {Array.from({ length: 39 }, (_, i) => (
        <line key={i} x1={20 + i * 20} y1={ground + 2} x2={14 + i * 20} y2={ground + 9} {...hair} />
      ))}
      <BarrierGate id={id} x={196} ground={ground} raised />
      <ModelCar id={id} x={252} ground={ground} v="V1" />
      {[392, 456].map((x) => (
        <g key={x}>
          <line x1={x} y1={ground} x2={x} y2={ground - 70} {...ink} />
          <Dial cx={x} cy={ground - 86} r={15} deg={x === 392 ? -15 : 10} />
        </g>
      ))}
      <ModelCar id={id} x={500} ground={ground} v="V2" />
      <BarrierGate id={id} x={694} ground={ground} raised={false} />
      <line x1={740} y1={ground} x2={740} y2={ground - 70} {...ink} />
      <Dial cx={740} cy={ground - 86} r={15} deg={0} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Pre-Deployment Red-Teaming Versus Behavioral Auditing
   -------------------------------------------------------------------------- */

/** A probe: a slim tool with a handle, its tip at (tx, ty), coming in along (dx, dy). */
function Probe({ tx, ty, dx, dy, len = 92 }: { tx: number; ty: number; dx: number; dy: number; len?: number }) {
  const l = Math.hypot(dx, dy);
  const ux = dx / l;
  const uy = dy / l;
  const px = -uy;
  const py = ux;
  const bx = tx - ux * len;
  const by = ty - uy * len;
  const hx = tx - ux * len * 0.62;
  const hy = ty - uy * len * 0.62;
  const pt = (x: number, y: number) => `${r2(x)} ${r2(y)}`;
  return (
    <g>
      <path d={`M${pt(tx, ty)}L${pt(hx + px * 2.2, hy + py * 2.2)}L${pt(hx - px * 2.2, hy - py * 2.2)}Z`} fill={PAT.paper} {...ink} />
      <path
        d={`M${pt(hx + px * 5, hy + py * 5)}L${pt(bx + px * 5, by + py * 5)}L${pt(bx - px * 5, by - py * 5)}L${pt(hx - px * 5, hy - py * 5)}Z`}
        fill="url(#w4-probe-dense)"
        {...ink}
      />
    </g>
  );
}

/**
 * Red-teaming: a model housing probed at single points by three tools from
 * different sides. Two meet a sound surface, the third finds a seam and the
 * crack it opens is red. Behavioral auditing: a factorial grid of routine
 * requests from three customer segments, each row feeding the housing, and
 * the housing's answers measured as one distribution per segment.
 */
export function ProbeVsGrid({ kind }: { kind: "probe" | "grid" }) {
  if (kind === "probe") {
    const id = "w4-probe";
    const hx = 180;
    const hy = 58;
    return (
      <Frame
        width={480}
        height={204}
        label="Patent drawing of adversarial red-teaming: a model housing probed at single points by three slim tools from the left, top and right. Two tips rest on a sound surface. The third, coming from below, has opened a crack in the front face, drawn in red."
      >
        <PatentDefs id={id} />
        <Housing id={id} x={hx} y={hy} w={130} h={104} />
        <Probe tx={hx - 2} ty={hy + 36} dx={1} dy={0.35} />
        <Probe tx={hx + 70} ty={hy - 9} dx={0.15} dy={1} len={44} />
        <path
          d={`M${hx + 88} ${hy + 60}l-8 -7l3 -9l-9 -6M${hx + 80} ${hy + 53}l-10 6l-4 10M${hx + 88} ${hy + 60}l9 -4l4 -10`}
          fill="none"
          stroke={PAT.signal}
          strokeWidth={LINE.outline}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Probe tx={hx + 88} ty={hy + 60} dx={-0.32} dy={-1} len={84} />
      </Frame>
    );
  }
  const id = "w4-gridaudit";
  const segs = [
    { coat: "paper" as const, m: 0.42 },
    { coat: "light" as const, m: 0.5 },
    { coat: "dense" as const, m: 0.6 },
  ];
  return (
    <Frame
      width={480}
      height={196}
      label="Patent drawing of behavioral auditing: three customer segments, each a person figure with a row of eight routine request sheets, feed a closed model housing. On its right, the answers are measured as one distribution per segment, with each segment's mean marked."
    >
      <PatentDefs id={id} />
      {segs.map((sg, r) => {
        const y = 52 + r * 56;
        const pts = Array.from({ length: 41 }, (_, i) => {
          const u = i / 40;
          return `${r2(352 + u * 110)} ${r2(y + 8 - 30 * Math.exp(-0.5 * ((u - sg.m) / 0.12) ** 2))}`;
        });
        return (
          <g key={r}>
            <Figure id={id} x={20} y={y + 16} s={0.42} coat={sg.coat} />
            {Array.from({ length: 8 }, (_, c) => (
              <Sheet key={c} id={id} x={38 + c * 18} y={y + 6} w={12} d={8} sk={5} t={1.5} />
            ))}
            <line x1={206} y1={y + 2} x2={232} y2={r2(98 + (r - 1) * 18)} {...hair} strokeDasharray="3 2" />
            <path d={`M${pts.join("L")}`} fill={stip(id, "light")} {...ink} />
            <line x1={348} y1={y + 8.5} x2={466} y2={y + 8.5} {...ink} />
            <path d={`M${r2(352 + sg.m * 110)} ${y + 10}l-4 7h8Z`} fill={PAT.ink} />
          </g>
        );
      })}
      <Housing id={id} x={236} y={60} w={80} h={76} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Six Steps of an Enterprise Behavioral Audit
   -------------------------------------------------------------------------- */

/**
 * The model dossier lying open, six numbered index tabs along its far edge,
 * one per step. Its page holds hairline entries and a red RE-TEST imprint.
 * The stamp that made it stands beside the dossier.
 */
export function AuditDossier() {
  const id = "w4-dossier";
  const x = 10;
  const y = 160;
  const w = 222;
  const d = 128;
  const sk = 76;
  const at = (u: number, v: number) => ({ x: r2(x + u * w + v * sk), y: r2(y - v * d) });
  const stampAt = at(0.6, 0.3);
  return (
    <Frame
      width={360}
      height={180}
      label="Patent drawing of a model dossier lying open, with six numbered index tabs, 1 to 6, along its far edge. Its page carries hairline entries and a red re-test stamp imprint. The stamp that made it stands on the table beside the dossier."
    >
      <PatentDefs id={id} />
      {/* index tabs, behind the page */}
      {[1, 2, 3, 4, 5, 6].map((n, i) => {
        const u0 = 0.03 + i * 0.16;
        const a = at(u0, 1);
        const b = at(u0 + 0.13, 1);
        return (
          <g key={n}>
            <path d={`M${a.x} ${a.y}L${r2(a.x + 3)} ${r2(a.y - 20)}H${r2(b.x - 3)}L${b.x} ${b.y}Z`} fill={PAT.paper} {...ink} />
            <Num x={r2((a.x + b.x) / 2)} y={r2(a.y - 6)} size={12}>
              {n}
            </Num>
          </g>
        );
      })}
      <Sheet id={id} x={x} y={y} w={w} d={d} sk={sk} t={5} />
      {/* entries */}
      {[0.86, 0.74, 0.62].map((v, i) => {
        const p0 = at(0.08, v);
        const p1 = at(i === 2 ? 0.5 : 0.82, v);
        return <line key={v} x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} {...hair} />;
      })}
      {/* the imprint */}
      <g transform={`rotate(-6 ${stampAt.x} ${stampAt.y})`}>
        <rect x={r2(stampAt.x - 50)} y={r2(stampAt.y - 14)} width={100} height={28} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} />
        <PatentKey x={r2(stampAt.x + 1)} y={r2(stampAt.y + 5)} size={13} fill={PAT.signal}>
          Re-test
        </PatentKey>
      </g>
      {/* the stamp, set down beside the dossier */}
      <ObliqueBox id={id} x={268} y={134} w={62} h={18} dx={10} dy={6} />
      <ObliqueBox id={id} x={292} y={100} w={14} h={34} dx={5} dy={3} />
      <ellipse cx={r2(301.5)} cy={94} rx={15} ry={5} fill={stip(id, "light")} {...ink} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Continuous Post-Deployment Drift Monitoring and Version Pinning
   -------------------------------------------------------------------------- */

/**
 * Two deployments over the same months, each with the band its audit
 * certified (stippled). Above, an unpinned endpoint: the provider updates
 * the hosted weights silently (gears on the time line) and the behaviour
 * steps out of the certified band, in red. Below, a pinned snapshot: its
 * behaviour holds, and each change (a deprecated snapshot, an edited system
 * prompt) is checked off by a re-run of the audit.
 */
export function PinnedVsLatest() {
  const id = "w4-pin";
  const x0 = 40;
  const x1 = 780;
  const tracks = [
    { key: "Unpinned endpoint", top: 34, pinned: false },
    { key: "Pinned snapshot", top: 132, pinned: true },
  ];
  const updates = [270, 500];
  return (
    <Frame
      width={800}
      height={204}
      label="Patent drawing of two deployments over time, each with the behaviour band its audit certified, stippled. Unpinned endpoint: at two silent provider updates, marked by gears on the time line, the behaviour trace steps out of the certified band, drawn in red. Pinned snapshot: the same two changes are marked by gears, each followed by a check mark for a re-run audit, and the trace stays inside its band."
    >
      <PatentDefs id={id} />
      {tracks.map((t) => {
        const band = t.top + 10;
        const mid = band + 15;
        const axis = t.top + 58;
        const trace = t.pinned ? `M${x0} ${mid}H${x1}` : `M${x0} ${mid}H${updates[0]}V${mid - 22}H${updates[1]}V${mid - 34}H${x1}`;
        return (
          <g key={t.key}>
            <PatentKey x={x0} y={t.top} anchor="start" size={12}>
              {t.key}
            </PatentKey>
            <rect x={x0} y={band} width={x1 - x0} height={30} fill={stip(id, "light")} stroke="none" />
            <line x1={x0} y1={band} x2={x1} y2={band} {...hair} />
            <line x1={x0} y1={band + 30} x2={x1} y2={band + 30} {...hair} />
            <line x1={x0} y1={axis + 0.5} x2={x1} y2={axis + 0.5} {...ink} />
            {t.pinned ? (
              <path d={trace} fill="none" {...ink} strokeWidth={LINE.bold} />
            ) : (
              <g>
                <path d={`M${x0} ${mid}H${updates[0]}`} fill="none" {...ink} strokeWidth={LINE.bold} />
                <path
                  d={`M${updates[0]} ${mid}V${mid - 22}H${updates[1]}V${mid - 34}H${x1}`}
                  fill="none"
                  stroke={PAT.signal}
                  strokeWidth={LINE.bold}
                  strokeLinejoin="round"
                />
                {updates.map((u) => (
                  <Gear key={u} cx={u} cy={axis} r={6} n={8} />
                ))}
              </g>
            )}
            {t.pinned
              ? updates.map((u) => (
                  <g key={u}>
                    <Gear cx={u} cy={axis} r={6} n={8} />
                    <path d={tick(u + 22, axis - 1, 6)} fill="none" {...ink} strokeWidth={LINE.bold} />
                  </g>
                ))
              : null}
          </g>
        );
      })}
    </Frame>
  );
}
