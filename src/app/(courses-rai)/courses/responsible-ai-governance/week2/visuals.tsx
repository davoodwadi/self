"use client";

import React, { useState } from "react";
import { CENTRE_DASH, Fig, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, Segmented, Slider, r2, stip } from "../_visuals/kit";
import { Chip, Coins, Figure, Gear, cross, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 02 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), FIG. lines in
   Caslon italic and one examiner's red for the finding. The protected group
   keeps one mark all week: a figure in a dense-stippled coat. See the course
   CLAUDE.md.
   ========================================================================== */

const ink = { stroke: PAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: PAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/** Caslon numerals or a quantity on a plate. */
function Num({ x, y, children, size = 14, anchor = "middle", fill = PAT.ink }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end"; fill?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-heading)" fontSize={size} fill={fill} style={{ fontVariantNumeric: "lining-nums" }}>
      {children}
    </text>
  );
}

/**
 * From statistical to market discrimination. Each figure is a rail of
 * predicted probability with a threshold blade standing at its middle;
 * customers stand at their scores. FIG. 1: both groups fall on both sides.
 * FIG. 2: the protected group (dense coats) falls below the blade, in red.
 */
export function StatisticalToMarket() {
  const id = "w2-sort";
  const fig = (x0: number, groups: string, red: boolean) => {
    const w = 340;
    const blade = x0 + w / 2;
    return (
      <g>
        <ObliqueBox id={id} x={x0} y={150} w={w} h={9} dx={16} dy={9} />
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line x1={r2(x0 + 14 + t * (w - 28))} y1={159} x2={r2(x0 + 14 + t * (w - 28))} y2={165} {...hair} />
            <Num x={r2(x0 + 14 + t * (w - 28))} y={178} size={12}>
              {t === 0.5 ? "0.5" : t}
            </Num>
          </g>
        ))}
        {[...groups].map((g, i) => {
          const left = i < 5;
          const x = r2(x0 + 24 + i * 31 + (left ? 0 : 24));
          const protectedGroup = g === "B";
          const harmed = red && protectedGroup && left;
          return (
            <Figure
              key={i}
              id={id}
              x={x}
              y={146}
              s={0.8}
              coat={harmed ? "signal" : protectedGroup ? "dense" : "paper"}
              stroke={harmed ? PAT.signal : PAT.ink}
            />
          );
        })}
        {/* threshold blade standing in the rail */}
        <ObliqueBox id={id} x={blade - 3} y={46} w={6} h={104} dx={8} dy={5} />
        <PatentKey x={blade - 14} y={52} anchor="end" size={10.5}>
          LOW
        </PatentKey>
        <PatentKey x={blade + 20} y={52} anchor="start" size={10.5}>
          HIGH
        </PatentKey>
      </g>
    );
  };
  return (
    <Frame
      width={800}
      height={218}
      label="Patent drawing in two figures. Each figure is a rail of predicted probability from 0 to 1 with a threshold blade standing at 0.5; customers stand along the rail at their scores, the low ones left of the blade and the high ones right of it. Customers of the protected group wear dense-stippled coats. FIG. 1, discriminating in the statistical sense: both groups stand on both sides of the blade. FIG. 2, market discrimination: four of the five protected-group customers stand on the low side, drawn in red."
    >
      <PatentDefs id={id} />
      {fig(26, "ABABABABAB", false)}
      <line x1={81} y1={34} x2={81} y2={76} {...hair} />
      <PatentKey x={70} y={28} anchor="start" size={10.5}>
        PROTECTED GROUP
      </PatentKey>
      <line x1={400} y1={20} x2={400} y2={192} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {fig(430, "BBABBAABAA", true)}
      <Fig x={204} y={208} n={1} size={12}>
        discriminating in the statistical sense
      </Fig>
      <Fig x={608} y={208} n={2} size={12}>
        market discrimination
      </Fig>
    </Frame>
  );
}

/**
 * Disparate treatment and disparate impact at the same gate. FIG. 1: the
 * gate's sign bars the protected group by name (its figure struck through);
 * the two protected-group customers are stopped. FIG. 2: the sign is a plain
 * written policy that names no group, and the same two are still stopped.
 */
export function TreatmentVsImpact() {
  const id = "w2-treat";
  const g = 150;
  const fig = (x0: number, explicit: boolean) => (
    <g>
      <line x1={x0} y1={g + 1} x2={x0 + 178} y2={g + 1} {...hair} />
      {/* stopped before the gate */}
      <Figure id={id} x={x0 + 16} y={g} s={0.68} coat="signal" stroke={PAT.signal} />
      <Figure id={id} x={x0 + 44} y={g} s={0.68} coat="signal" stroke={PAT.signal} />
      {/* boom gate: a post and its lowered boom across the path */}
      <ObliqueBox id={id} x={x0 + 70} y={g - 66} w={12} h={66} dx={8} dy={5} />
      <path d={`M${x0 + 82} ${g - 44}L${x0 + 124} ${g - 69}V${g - 61}L${x0 + 82} ${g - 36}Z`} fill={stip(id, "light")} {...ink} />
      <path d={`M${x0 + 82} ${g - 44}L${x0 + 90} ${g - 49}V${g - 41}L${x0 + 82} ${g - 36}Z`} fill={PAT.paper} {...ink} />
      {/* through the gate */}
      <Figure id={id} x={x0 + 140} y={g} s={0.68} coat="paper" />
      <Figure id={id} x={x0 + 166} y={g} s={0.68} coat="paper" />
      {/* the gate's sign */}
      <line x1={x0 + 80} y1={60} x2={x0 + 80} y2={g - 71} {...ink} />
      <ObliqueBox id={id} x={x0 + 48} y={10} w={64} h={50} dx={6} dy={4} />
      {explicit ? (
        <g>
          <Figure id={id} x={x0 + 80} y={53} s={0.46} coat="dense" />
          <circle cx={x0 + 80} cy={35} r={21} fill="none" {...ink} strokeWidth={LINE.bold} />
          <line x1={r2(x0 + 80 - 14.85)} y1={r2(35 - 14.85)} x2={r2(x0 + 80 + 14.85)} y2={r2(35 + 14.85)} {...ink} strokeWidth={LINE.bold} />
        </g>
      ) : (
        <g>
          <line x1={x0 + 56} y1={21} x2={x0 + 96} y2={21} {...ink} />
          {[30, 38, 46].map((y) => (
            <line key={y} x1={x0 + 56} y1={y} x2={x0 + (y === 46 ? 90 : 104)} y2={y} {...hair} />
          ))}
        </g>
      )}
    </g>
  );
  return (
    <Frame
      width={400}
      height={176}
      label="Patent drawing in two figures of the same boom gate, its boom lowered across the path. Two customers of the protected group, in red, are stopped before the gate; two other customers have passed through. FIG. 1, disparate treatment: the gate's sign shows the protected group's figure struck through. FIG. 2, disparate impact: the sign is a plain written policy that names no group, and the same two protected-group customers are still stopped."
    >
      <PatentDefs id={id} />
      {fig(8, true)}
      <line x1={200} y1={10} x2={200} y2={156} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {fig(212, false)}
      <Fig x={100} y={172} n={1} size={12.5}>
        disparate treatment
      </Fig>
      <Fig x={304} y={172} n={2} size={12.5}>
        disparate impact
      </Fig>
    </Frame>
  );
}

/** A graduated cylinder seen from the front, filled to `level` (0..1 of its height). */
function Cylinder({ id, cx, top, bottom, rx = 30, ry = 7, level, red = false }: { id: string; cx: number; top: number; bottom: number; rx?: number; ry?: number; level: number; red?: boolean }) {
  const yl = r2(bottom - (bottom - top) * level);
  const c = red ? PAT.signal : PAT.ink;
  return (
    <g>
      <path d={`M${cx - rx} ${top}V${bottom}A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom}V${top}`} fill={PAT.paper} {...ink} />
      <path
        d={`M${cx - rx} ${yl}V${bottom}A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom}V${yl}A${rx} ${ry} 0 0 1 ${cx - rx} ${yl}Z`}
        fill={stip(id, red ? "signal" : "light")}
        stroke={c}
        strokeWidth={LINE.outline}
      />
      <ellipse cx={cx} cy={yl} rx={rx} ry={ry} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} />
      <ellipse cx={cx} cy={top} rx={rx} ry={ry} fill="none" {...ink} />
    </g>
  );
}

/**
 * The four-fifths rule: two graduated cylinders hold the selection rates of
 * the highest-selected group (fixed at 50%) and a protected group (the
 * slider). A dashed line marks four-fifths of the higher level; below it the
 * protected group's cylinder and the ratio turn red.
 */
export function FourFifthsRule() {
  const [rateB, setRateB] = useState(30);
  const id = "w2-fifths";
  const rateA = 50;
  const top = 32;
  const bottom = 142;
  const yAt = (pct: number) => r2(bottom - ((bottom - top) * pct) / 70);
  const ratio = rateB / rateA;
  const adverse = ratio < 0.8;
  const line = yAt(rateA * 0.8);
  return (
    <div>
      <Frame
        width={400}
        height={180}
        label={`Patent drawing: two graduated cylinders. The highest-selected group's cylinder is filled to a 50% selection rate; the protected group's cylinder is filled to ${rateB}%. A dashed line marks four-fifths of the higher rate, 40%. The ratio of the two rates is ${ratio.toFixed(2)}${adverse ? ", below four-fifths, so the protected group's cylinder and the ratio are red, signalling potential adverse impact" : ", at or above four-fifths"}.`}
      >
        <PatentDefs id={id} />
        {[0, 20, 40, 60].map((p) => (
          <g key={p}>
            <line x1={56} y1={yAt(p)} x2={62} y2={yAt(p)} {...hair} />
            <Num x={50} y={r2(yAt(p) + 4)} size={12} anchor="end">
              {p}
            </Num>
          </g>
        ))}
        <Cylinder id={id} cx={96} top={top} bottom={bottom} level={rateA / 70} />
        <Cylinder id={id} cx={240} top={top} bottom={bottom} level={rateB / 70} red={adverse} />
        <line x1={62} y1={line} x2={274} y2={line} {...ink} strokeDasharray="5 3" />
        <PatentKey x={280} y={r2(line + 4)} anchor="start" size={11.5}>
          FOUR-FIFTHS
        </PatentKey>
        <Num x={96} y={17} size={15}>
          50%
        </Num>
        <Num x={240} y={17} size={15} fill={adverse ? PAT.signal : PAT.ink}>
          {`${rateB}%`}
        </Num>
        <PatentKey x={96} y={173} size={11.5}>
          HIGHEST-SELECTED
        </PatentKey>
        <PatentKey x={240} y={173} size={11.5}>
          PROTECTED
        </PatentKey>
        <Num x={344} y={134} size={30} fill={adverse ? PAT.signal : PAT.ink}>
          {ratio.toFixed(2)}
        </Num>
        <PatentKey x={344} y={156} size={11.5}>
          RATIO
        </PatentKey>
      </Frame>
      <Slider label="Protected group selection rate" value={rateB} min={10} max={60} step={2} onChange={setRateB} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/**
 * Part 1: the pipeline pulled apart along its centre line into the four
 * stages bias can enter (data generation, measurement, model specification,
 * market deployment). Each stage is its own mechanism and lets bias in its
 * own way (red): a skewed record in the hopper, a gauge reading off, a
 * mis-cut gear, and a short allocation to one group's tray.
 */
export function PipelineStages() {
  const id = "w2-stages";
  const y = 62;
  const h = 84;
  const w = 172;
  const xs = [18, 214, 410, 606];
  const red = { stroke: PAT.signal, strokeWidth: LINE.bold, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const keys = ["DATA GENERATION", "MEASUREMENT", "MODEL SPECIFICATION", "MARKET DEPLOYMENT"];
  return (
    <Frame
      width={800}
      height={204}
      label="Patent drawing, exploded view: the modeling pipeline pulled apart along a centre line into four housings, data generation, measurement, model specification and market deployment. Bias enters each in its own way, drawn in red: one skewed record among the records falling into the data hopper, a gauge whose needle reads off its mark, a mis-cut gear in the model's gear train, and, at deployment, a short stack of allocations in one group's tray beside a full stack in the other's."
    >
      <PatentDefs id={id} />
      <line x1={12} y1={y + 30} x2={792} y2={y + 30} {...hair} strokeDasharray={CENTRE_DASH} />
      {xs.map((x, i) => (
        <g key={x}>
          <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={12} dy={8} />
          {/* flanges where the housings were pulled apart */}
          <rect x={x - 5} y={y + 14} width={5} height={32} fill={PAT.paper} {...ink} />
          <rect x={x + w} y={y + 14} width={5} height={32} fill={stip(id, "dense")} {...ink} />
          <line x1={x} y1={y + 58} x2={x + w} y2={y + 58} {...hair} />
          <PatentKey x={x + w / 2} y={y + 75} size={9.5}>
            {keys[i]}
          </PatentKey>
        </g>
      ))}

      {/* 1 — data generation: records falling into a hopper */}
      <path d="M58 8H148L114 54H92Z" fill={PAT.paper} {...ink} />
      <path d="M148 8L156 3L120 50L114 54Z" fill={stip(id, "dense")} {...ink} />
      <path d={`M92 54V${y}M114 54V${y - 6}`} fill="none" {...ink} />
      <Chip id={id} x={78} y={30} w={22} d={7} sk={8} />
      <Chip id={id} x={102} y={22} w={22} d={7} sk={8} red />
      <Chip id={id} x={92} y={44} w={16} d={6} sk={6} />

      {/* 2 — measurement: a gauge reading off its mark */}
      <circle cx={300} cy={y + 29} r={24} fill={stip(id, "light")} {...ink} />
      <circle cx={300} cy={y + 29} r={20} fill={PAT.paper} {...ink} />
      {[-60, -30, 30, 60].map((t) => (
        <line
          key={t}
          x1={r2(300 + Math.sin((t * Math.PI) / 180) * 18)}
          y1={r2(y + 29 - Math.cos((t * Math.PI) / 180) * 18)}
          x2={r2(300 + Math.sin((t * Math.PI) / 180) * 13)}
          y2={r2(y + 29 - Math.cos((t * Math.PI) / 180) * 13)}
          {...hair}
        />
      ))}
      <path d={`M300 ${y + 14}L297 ${y + 8}H303Z`} fill={PAT.ink} />
      <line x1={300} y1={y + 29} x2={r2(300 + Math.sin(0.8) * 16)} y2={r2(y + 29 - Math.cos(0.8) * 16)} {...red} />
      <circle cx={300} cy={y + 29} r={2} fill={PAT.signal} />

      {/* 3 — model specification: the gear train, one gear mis-cut */}
      <circle cx={496} cy={y + 29} r={26} fill={stip(id, "light")} {...ink} />
      <Gear cx={487} cy={y + 23} r={11} n={10} />
      <path d={gearPathRed(505, y + 37, 7, 7)} fill={PAT.paper} {...red} strokeWidth={LINE.outline} />
      <circle cx={505} cy={y + 37} r={1.8} fill={PAT.signal} />

      {/* 4 — market deployment: a nozzle filling two groups' trays */}
      <path d={`M689 ${y + h}V${y + h + 10}H681V${y + h + 18}H703V${y + h + 10}H695V${y + h}Z`} fill={PAT.paper} {...ink} />
      <ObliqueBox id={id} x={658} y={194} w={56} h={7} dx={10} dy={6} />
      <ObliqueBox id={id} x={726} y={194} w={50} h={7} dx={10} dy={6} />
      <Coins id={id} cx={692} y={193} n={4} rx={13} ry={4} h={5} />
      <Coins id={id} cx={753} y={193} n={1} rx={13} ry={4} h={5} red />
    </Frame>
  );
}

/** A gear outline for the mis-cut gear: one tooth missing. */
function gearPathRed(cx: number, cy: number, r: number, n: number) {
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const st = (Math.PI * 2) / n;
    const ring = i === 2 ? [[r, a], [r, a + st * 0.54]] : [[r, a], [r + 3, a + st * 0.12], [r + 3, a + st * 0.42], [r, a + st * 0.54]];
    for (const [rr, aa] of ring) pts.push(`${r2(cx + rr * Math.cos(aa))} ${r2(cy + rr * Math.sin(aa))}`);
  }
  return `M${pts.join("L")}Z`;
}

/**
 * A head-and-shoulders portrait in a frame, (x, y) the frame's top-left: the
 * record of one person. `coat` "dense" is the week's protected group.
 */
function Portrait({ id, x, y, w = 22, h = 30, coat = "paper", stroke = PAT.ink }: { id: string; x: number; y: number; w?: number; h?: number; coat?: "paper" | "dense" | "signal"; stroke?: string }) {
  const cx = r2(x + w / 2);
  const o = { stroke, strokeWidth: LINE.hair, strokeLinejoin: "round" as const };
  const hr = r2(w * 0.2);
  const sh = r2(w * 0.36);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={PAT.paper} {...o} strokeWidth={LINE.outline} />
      <path
        d={`M${r2(cx - sh)} ${r2(y + h)}V${r2(y + h * 0.78)}Q${r2(cx - sh)} ${r2(y + h * 0.56)} ${cx} ${r2(y + h * 0.56)}Q${r2(cx + sh)} ${r2(y + h * 0.56)} ${r2(cx + sh)} ${r2(y + h * 0.78)}V${r2(y + h)}`}
        fill={coat === "paper" ? PAT.paper : stip(id, coat)}
        {...o}
      />
      <circle cx={cx} cy={r2(y + h * 0.36)} r={hr} fill={PAT.paper} {...o} />
    </g>
  );
}

/**
 * Historical bias in hiring: the record of ten years of executive promotions
 * (nine of ten portraits from the majority group) trains the hiring model,
 * which passes a new applicant like the past (tick) and rejects an applicant
 * from the protected group (red).
 */
export function HistoricalBias() {
  const id = "w2-hist";
  const past = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
  return (
    <Frame
      width={400}
      height={176}
      label="Patent drawing: a board of ten portraits records ten years of executive promotions, nine of them from the majority group and one from the protected group. A centre line runs from the board into the hiring model's housing, its gears in a window. Out of the model come two applicant files: the majority-group applicant's file is ticked, and the protected-group applicant's file is rejected with a cross, both drawn in red."
    >
      <PatentDefs id={id} />

      {/* Ten years of past promotions */}
      <ObliqueBox id={id} x={12} y={38} w={146} h={104} dx={10} dy={6} />
      {past.map((g, i) => (
        <Portrait key={i} id={id} x={22 + (i % 5) * 26} y={48 + Math.floor(i / 5) * 46} w={22} h={38} coat={g ? "dense" : "paper"} />
      ))}
      <PatentKey x={85} y={166} size={11.5}>
        10 YEARS
      </PatentKey>

      {/* The hiring model trained on that record */}
      <line x1={172} y1={92} x2={196} y2={92} {...hair} strokeDasharray={CENTRE_DASH} />
      <ObliqueBox id={id} x={198} y={62} w={60} h={60} dx={10} dy={6} />
      <circle cx={228} cy={92} r={19} fill={stip(id, "light")} {...ink} />
      <Gear cx={222} cy={87} r={8.5} n={9} />
      <Gear cx={236} cy={100} r={6} n={7} phase={0.3} />
      <path d="M272 82L292 62M272 104L292 124" fill="none" {...hair} strokeDasharray={CENTRE_DASH} />

      {/* Two new applicants' files */}
      <ObliqueBox id={id} x={296} y={22} w={88} h={50} dx={8} dy={5} />
      <Portrait id={id} x={304} y={28} w={24} h={38} />
      <path d={tick(360, 47, 11)} fill="none" {...ink} strokeWidth={LINE.bold} />
      <ObliqueBox id={id} x={296} y={112} w={88} h={50} dx={8} dy={5} stroke={PAT.signal} />
      <Portrait id={id} x={304} y={118} w={24} h={38} coat="signal" stroke={PAT.signal} />
      <path d={cross(360, 137, 10)} fill="none" stroke={PAT.signal} strokeWidth={LINE.bold} strokeLinecap="round" />
    </Frame>
  );
}

/** A half-round meter, 0 to `max` across its arc, needle at `value`. */
function Meter({ cx, cy, r, value, max, red = false }: { cx: number; cy: number; r: number; value: number; max: number; red?: boolean }) {
  const at = (v: number, rr: number) => {
    const a = Math.PI * (1 - Math.min(v, max) / max);
    return [r2(cx + Math.cos(a) * rr), r2(cy - Math.sin(a) * rr)] as const;
  };
  const [nx, ny] = at(value, r - 6);
  return (
    <g>
      <path d={`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}Z`} fill={PAT.paper} {...ink} />
      {Array.from({ length: 7 }, (_, i) => {
        const [x1, y1] = at((max * i) / 6, r - 2);
        const [x2, y2] = at((max * i) / 6, r - (i % 3 === 0 ? 9 : 6));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...hair} />;
      })}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={red ? PAT.signal : PAT.ink} strokeWidth={LINE.bold} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={2.4} fill={red ? PAT.signal : PAT.ink} />
    </g>
  );
}

/**
 * Representation bias: a training set of twenty faces, of which the slider
 * sets the protected group's share; two meters read the deployed error rate
 * for each group. The protected group's error falls steeply as its share
 * rises, and the gains taper off toward parity.
 */
export function RepresentationBias() {
  const [share, setShare] = useState(10);
  const id = "w2-repr";
  const n = Math.round((20 * share) / 100);
  // Fixed order in which seats in the sample go to the protected group.
  const order = [7, 13, 2, 18, 10, 5, 16, 0, 11, 8, 19, 3, 14, 6, 17, 1, 12, 9, 15, 4];
  const seats = new Set(order.slice(0, n));
  const errB = r2(4 + 30 * Math.exp(-share / 8));
  const errA = r2(4 + 30 * Math.exp(-(100 - share) / 8));
  const high = errB > 2 * errA;
  return (
    <div>
      <Frame
        width={400}
        height={176}
        label={`Patent drawing: a training set of twenty face records, ${n} of them from the underrepresented protected group (${share}%). Two meters read the error rate after deployment: ${Math.round(errA)}% for the majority group and ${Math.round(errB)}% for the protected group${high ? ", far higher, in red" : ""}.`}
      >
        <PatentDefs id={id} />
        <ObliqueBox id={id} x={12} y={22} w={150} h={140} dx={10} dy={6} />
        {Array.from({ length: 20 }, (_, i) => (
          <Portrait key={i} id={id} x={20 + (i % 5) * 28} y={30 + Math.floor(i / 5) * 32} w={22} h={28} coat={seats.has(i) ? "dense" : "paper"} />
        ))}
        <PatentKey x={300} y={30} size={11.5}>
          ERROR RATE
        </PatentKey>
        <Meter cx={250} cy={104} r={42} value={errA} max={36} />
        <Meter cx={350} cy={104} r={42} value={errB} max={36} red={high} />
        <Portrait id={id} x={238} y={116} w={24} h={30} />
        <Portrait id={id} x={338} y={116} w={24} h={30} coat={high ? "signal" : "dense"} stroke={high ? PAT.signal : PAT.ink} />
        <Num x={250} y={168} size={15}>
          {`${Math.round(errA)}%`}
        </Num>
        <Num x={350} y={168} size={15} fill={high ? PAT.signal : PAT.ink}>
          {`${Math.round(errB)}%`}
        </Num>
      </Frame>
      <Slider label="Underrepresented group in training data" value={share} min={0} max={50} step={5} onChange={setShare} formatValue={(v) => `${v}%`} />
    </div>
  );
}
