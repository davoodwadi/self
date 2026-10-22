"use client";

import React, { useState } from "react";
import { CENTRE_DASH, Fig, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, Segmented, Slider, r2, stip } from "../_visuals/kit";
import { Chip, Coins, Figure, Gear, House, Pan, cross, headAlongPath, tick } from "../_visuals/objects";

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
function Cylinder({ id, cx, top, bottom, rx = 30, ry = 7, level, red = false, tone = "light" }: { id: string; cx: number; top: number; bottom: number; rx?: number; ry?: number; level: number; red?: boolean; tone?: "light" | "dense" }) {
  const yl = r2(bottom - (bottom - top) * level);
  const c = red ? PAT.signal : PAT.ink;
  return (
    <g>
      <path d={`M${cx - rx} ${top}V${bottom}A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom}V${top}`} fill={PAT.paper} {...ink} />
      <path
        d={`M${cx - rx} ${yl}V${bottom}A${rx} ${ry} 0 0 0 ${cx + rx} ${bottom}V${yl}A${rx} ${ry} 0 0 1 ${cx - rx} ${yl}Z`}
        fill={stip(id, red ? "signal" : tone)}
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

/** A thermometer standing with its bulb at (cx, bulbY), filled to `level` (y of the column's top). */
function Thermometer({ id, cx, top, bulbY, level }: { id: string; cx: number; top: number; bulbY: number; level: number }) {
  return (
    <g>
      <path d={`M${cx - 4} ${bulbY - 6}V${top + 4}A4 4 0 0 1 ${cx + 4} ${top + 4}V${bulbY - 6}`} fill={PAT.paper} {...ink} />
      <rect x={cx - 1.6} y={level} width={3.2} height={r2(bulbY - level)} fill={stip(id, "dense")} />
      <circle cx={cx} cy={bulbY} r={7} fill={stip(id, "dense")} {...ink} />
      {[0.25, 0.5, 0.75].map((f) => {
        const ty = r2(top + 8 + (bulbY - 14 - top) * f);
        return <line key={f} x1={cx + 4} y1={ty} x2={cx + 8} y2={ty} {...hair} />;
      })}
    </g>
  );
}

/** A police officer: a patent figure with a peaked cap. */
function Officer({ id, x, y, s = 0.5 }: { id: string; x: number; y: number; s?: number }) {
  return (
    <g>
      <Figure id={id} x={x} y={y} s={s} coat="paper" />
      <path
        d={`M${r2(x - 7 * s)} ${r2(y - 78 * s)}H${r2(x + 9 * s)}V${r2(y - 83 * s)}Q${r2(x + 1 * s)} ${r2(y - 88 * s)} ${r2(x - 7 * s)} ${r2(y - 83 * s)}ZM${r2(x + 9 * s)} ${r2(y - 78 * s)}L${r2(x + 14 * s)} ${r2(y - 76 * s)}`}
        fill={stip(id, "dense")}
        {...ink}
      />
    </g>
  );
}

/** A pile of `n` record sheets lying flat, front-left corner at (x, y). */
function Pile({ id, x, y, n, w = 40, red = false }: { id: string; x: number; y: number; n: number; w?: number; red?: boolean }) {
  const c = red ? PAT.signal : PAT.ink;
  const t = 3;
  return (
    <g>
      <path d={`M${x} ${y - n * t}V${y}H${x + w}L${x + w + 10} ${y - 7}V${r2(y - 7 - n * t)}L${x + w} ${y - n * t}Z`} fill={stip(id, red ? "signal" : "dense")} stroke={c} strokeWidth={LINE.outline} strokeLinejoin="round" />
      <path d={`M${x} ${y - n * t}V${y}H${x + w}V${y - n * t}Z`} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} />
      {Array.from({ length: n - 1 }, (_, i) => (
        <line key={i} x1={x} y1={y - (i + 1) * t} x2={x + w} y2={y - (i + 1) * t} stroke={c} strokeWidth={LINE.hair} />
      ))}
      <path d={`M${x} ${y - n * t}L${x + 10} ${r2(y - 7 - n * t)}H${x + w + 10}L${x + w} ${y - n * t}Z`} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} strokeLinejoin="round" />
    </g>
  );
}

/**
 * Measurement bias, two proxies. FIG. 1: two patients equally sick (same
 * thermometer reading), but the lower-income patient (dense coat) has spent
 * far less on care (short coin stack, red). FIG. 2: two identical
 * neighborhoods; the one patrolled by three officers piles up far more
 * arrest records (red) than the one with a single officer.
 */
export function MeasurementBias() {
  const id = "w2-meas";
  const g = 170;
  return (
    <Frame
      width={400}
      height={204}
      label="Patent drawing in two figures. FIG. 1, healthcare expenditures: two patients, a higher-income patient and a lower-income patient in a dense coat, each stand by a thermometer at the same reading, equally sick; the higher-income patient's stack of spent coins is tall, the lower-income patient's is short and drawn in red. FIG. 2, arrest records: two identical houses; three police officers stand by the first and one by the second; the first neighborhood's pile of arrest records is tall and drawn in red, the second's is short."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 — same sickness, unequal spending */}
      <line x1={8} y1={g + 1} x2={190} y2={g + 1} {...hair} />
      {[
        { x: 22, coat: "paper" as const, coins: 9 },
        { x: 112, coat: "dense" as const, coins: 2 },
      ].map((p) => (
        <g key={p.x}>
          <Figure id={id} x={p.x + 12} y={g} s={0.78} coat={p.coat} />
          <Thermometer id={id} cx={p.x + 38} top={86} bulbY={g - 8} level={102} />
          <Coins id={id} cx={p.x + 64} y={g} n={p.coins} rx={11} ry={3.5} h={6} red={p.coins < 4} />
        </g>
      ))}
      <line x1={48} y1={102} x2={162} y2={102} {...hair} strokeDasharray="4 2.5" />

      <line x1={200} y1={14} x2={200} y2={178} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 — same neighborhoods, unequal policing */}
      <line x1={210} y1={g + 1} x2={394} y2={g + 1} {...hair} />
      {[
        { x: 216, officers: 3, records: 12 },
        { x: 308, officers: 1, records: 3 },
      ].map((n) => (
        <g key={n.x}>
          <House id={id} x={n.x + 10} y={100} w={46} h={30} dx={10} dy={6} roof={18} />
          <line x1={n.x} y1={123} x2={n.x + 80} y2={123} {...hair} />
          {Array.from({ length: n.officers }, (_, k) => (
            <Officer key={k} id={id} x={r2(n.x + 33 + (k - (n.officers - 1) / 2) * 19)} y={122} s={0.46} />
          ))}
          <Pile id={id} x={n.x + 6} y={g} n={n.records} w={46} red={n.records > 6} />
        </g>
      ))}

      <Fig x={100} y={196} n={1} size={12}>
        healthcare expenditures
      </Fig>
      <Fig x={302} y={196} n={2} size={12}>
        arrest records
      </Fig>
    </Frame>
  );
}

/**
 * Aggregation bias on a plotted board: majority points (white) follow a
 * gentle slope, minority points (dense) a steep one. A single pooled model
 * lays one straightedge along the majority, and the minority's residuals
 * (red) are long; group-specific models lay one straightedge per group.
 */
export function AggregationBias() {
  const [fit, setFit] = useState<"pooled" | "specific">("pooled");
  const pooled = fit === "pooled";
  const id = "w2-agg";
  const X = (v: number) => r2(64 + v * 30);
  const Y = (v: number) => r2(150 - v * 12.6);
  const major: [number, number][] = [
    [0.8, 2.3], [1.6, 2.0], [2.2, 3.1], [2.9, 2.8], [3.4, 3.6], [4.1, 3.3], [4.6, 4.2], [5.3, 3.9],
    [5.9, 4.8], [6.4, 4.4], [7.0, 5.3], [7.7, 5.0], [8.3, 5.9], [9.0, 5.6], [9.5, 6.4],
  ];
  const minor: [number, number][] = [[5.0, 4.4], [5.8, 5.9], [6.6, 6.6], [7.4, 8.0], [8.2, 8.8], [9.0, 9.9]];
  const lineP = (x: number) => 1.65 + 0.5 * x;
  const lineA = (x: number) => 1.45 + 0.5 * x;
  const lineB = (x: number) => -2.75 + 1.4 * x;
  return (
    <div>
      <Frame
        width={400}
        height={178}
        label={`Patent drawing of a plotted board, predictor across and outcome up. White points of the majority group follow a gentle slope; six dense points of a minority group follow a steep slope. ${pooled ? "A single model lays one straightedge along the majority points; the minority points' residuals to it, drawn in red, are long." : "Group-specific models lay one straightedge along each group; every residual is short."}`}
      >
        <PatentDefs id={id} />
        <ObliqueBox id={id} x={30} y={14} w={352} h={156} dx={10} dy={6} />
        <path d="M54 22V146H372" fill="none" {...ink} />
        <PatentKey x={370} y={162} anchor="end" size={11.5}>
          PREDICTOR
        </PatentKey>
        <text x={44} y={86} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={11.5} letterSpacing="0.22em" fill={PAT.ink} transform="rotate(-90 44 86)">
          OUTCOME
        </text>

        {/* residuals of the minority points */}
        {minor.map(([x, y]) => {
          const yy = pooled ? lineP(x) : lineB(x);
          return (
            <line key={x} x1={X(x)} y1={Y(y)} x2={X(x)} y2={Y(yy)} stroke={pooled ? PAT.signal : PAT.ink} strokeWidth={pooled ? LINE.bold : LINE.hair} />
          );
        })}

        {/* straightedges */}
        {pooled ? (
          <line x1={X(0.2)} y1={Y(lineP(0.2))} x2={X(9.9)} y2={Y(lineP(9.9))} {...ink} strokeWidth={LINE.bold} />
        ) : (
          <g>
            <line x1={X(0.2)} y1={Y(lineA(0.2))} x2={X(9.9)} y2={Y(lineA(9.9))} {...ink} strokeWidth={LINE.bold} />
            <line x1={X(4.4)} y1={Y(lineB(4.4))} x2={X(9.4)} y2={Y(lineB(9.4))} {...ink} strokeWidth={LINE.bold} />
          </g>
        )}

        {major.map(([x, y]) => (
          <circle key={x} cx={X(x)} cy={Y(y)} r={3.4} fill={PAT.paper} {...ink} />
        ))}
        {minor.map(([x, y]) => (
          <circle key={x} cx={X(x)} cy={Y(y)} r={4.6} fill={stip(id, "dense")} {...ink} />
        ))}
      </Frame>
      <Segmented
        label="Model"
        options={[
          { id: "pooled", label: "Single model" },
          { id: "specific", label: "Group-specific" },
        ]}
        value={fit}
        onChange={setFit}
      />
    </div>
  );
}

/**
 * Proxy reconstruction: the input table with its protected-attribute row
 * deleted (dashed). The slider feeds 0 to 4 seemingly neutral behavioral
 * features into the model; the row it rebuilds (red) matches the deleted one
 * with a precision that climbs as features are combined.
 */
export function ProxyReconstruction() {
  const [k, setK] = useState(4);
  const id = "w2-proxy";
  const rows = ["POSTAL CODE", "DEVICE BRAND", "BROWSER LANGUAGE", "SHOPPING SCHEDULE"];
  const precision = [50, 64, 78, 88, 95][k];
  const rowY = (i: number) => 20 + i * 28;
  return (
    <div>
      <Frame
        width={400}
        height={176}
        label={`Patent drawing: an input table lists four behavioral features, postal code, device brand, browser language and shopping schedule, above a dashed, deleted row for the protected attribute. ${k === 0 ? "No feature is fed to the model" : `The first ${k} feature${k > 1 ? "s are" : " is"} fed into the model`}, which rebuilds the deleted row, drawn in red, with ${precision}% precision.`}
      >
        <PatentDefs id={id} />
        {/* the input table, its protected-attribute row cut away */}
        <ObliqueBox id={id} x={12} y={20} w={186} h={112} dx={10} dy={6} />
        {rows.map((r, i) => {
          const on = i < k;
          return (
            <g key={r}>
              {i > 0 ? <line x1={12} y1={rowY(i)} x2={198} y2={rowY(i)} {...hair} /> : null}
              {on ? <rect x={14} y={rowY(i) + 2} width={182} height={24} fill="none" {...ink} strokeWidth={LINE.bold} /> : null}
              <PatentKey x={22} y={rowY(i) + 18} anchor="start" size={9.5}>
                {r}
              </PatentKey>
              {on ? <path d={`M208 ${rowY(i) + 11}C216 ${rowY(i) + 11} 216 ${r2(74 + i * 6)} 224 ${r2(74 + i * 6)}`} fill="none" {...hair} /> : null}
            </g>
          );
        })}
        <rect x={12} y={140} width={186} height={26} fill="none" {...hair} strokeDasharray="4 3" />
        <PatentKey x={22} y={158} anchor="start" size={9.5}>
          PROTECTED ATTRIBUTE
        </PatentKey>

        {/* the model */}
        <ObliqueBox id={id} x={224} y={62} w={58} h={52} dx={10} dy={6} />
        <circle cx={253} cy={88} r={17} fill={stip(id, "light")} {...ink} />
        <Gear cx={248} cy={84} r={8} n={9} />
        <Gear cx={261} cy={96} r={5.5} n={7} phase={0.3} />
        <line x1={253} y1={118} x2={253} y2={136} {...hair} strokeDasharray={CENTRE_DASH} />

        {/* the rebuilt row */}
        <rect
          x={224}
          y={140}
          width={164}
          height={26}
          fill={k === 0 ? PAT.paper : stip(id, "signal")}
          stroke={k === 0 ? PAT.ink : PAT.signal}
          strokeWidth={LINE.bold}
          strokeDasharray={k === 0 ? "4 3" : undefined}
        />
        <Num x={344} y={90} size={28} fill={k === 0 ? PAT.ink : PAT.signal}>
          {`${precision}%`}
        </Num>
        <PatentKey x={344} y={110} size={10}>
          PRECISION
        </PatentKey>
      </Frame>
      <Slider label="Behavioral features combined" value={k} min={0} max={4} onChange={setK} />
    </div>
  );
}

/**
 * A runaway feedback loop. The credit model's decisions run out along the
 * top to two neighborhoods; the one approved sends its repayment records back
 * along the bottom into the training pile, which retrains the model. The one
 * denied (red cross) sends nothing back: its return path is a dashed red
 * line that never carries a record.
 */
export function FeedbackLoop() {
  const id = "w2-loop";
  const red = { stroke: PAT.signal, strokeWidth: LINE.bold, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <Frame
      width={400}
      height={186}
      label="Patent drawing of a runaway feedback loop. A credit model's housing sends its decisions out along a line across the top to two neighborhoods of two houses each. The first neighborhood is approved, and its repayment records travel back along the bottom into the training pile below the model, which feeds the model's retraining. The second neighborhood is denied at a red cross; its return path to the training pile is a dashed red line carrying no records, never observed."
    >
      <PatentDefs id={id} />

      {/* the model and its training pile */}
      <ObliqueBox id={id} x={18} y={58} w={66} h={52} dx={10} dy={6} />
      <circle cx={51} cy={84} r={17} fill={stip(id, "light")} {...ink} />
      <Gear cx={46} cy={80} r={8} n={9} />
      <Gear cx={59} cy={92} r={5.5} n={7} phase={0.3} />
      <Pile id={id} x={22} y={176} n={6} w={50} />
      <line x1={51} y1={148} x2={51} y2={118} {...ink} />
      <path d={headAlongPath(51, 116, 0, -1, 7)} fill="none" {...ink} />

      {/* decisions out along the top */}
      <path d="M51 50V22H337V38" fill="none" {...ink} />
      <path d="M215 22V48" fill="none" {...ink} />
      <path d={headAlongPath(215, 52, 0, 1, 7)} fill="none" {...ink} />
      <path d={cross(337, 46, 7)} {...red} />

      {/* two neighborhoods */}
      {[172, 218, 294, 340].map((x) => (
        <House key={x} id={id} x={x} y={114} w={34} h={34} dx={7} dy={4} roof={14} />
      ))}

      {/* repayment records come back from the approved neighborhood */}
      <path d="M215 120V146H84" fill="none" {...ink} />
      <path d={headAlongPath(82, 146, -1, 0, 7)} fill="none" {...ink} />
      {[110, 146, 182].map((x) => (
        <Chip key={x} id={id} x={x} y={142} w={18} d={6} sk={6} />
      ))}

      {/* nothing comes back from the denied one */}
      <path d="M337 120V166H84" {...red} strokeWidth={LINE.outline} strokeDasharray="5 3.5" />
      <PatentKey x={208} y={182} fill={PAT.signal} size={10}>
        NEVER OBSERVED
      </PatentKey>
    </Frame>
  );
}

/**
 * Identifying the four sources, one figure each, in the week's cast.
 * FIG. 1 historical bias: a large, cleanly kept pile of records whose label
 * tabs are red. FIG. 2 representation bias: the population's faces above a
 * sample tray whose protected-group seats are empty (red). FIG. 3
 * measurement bias: equal thermometers, unequal coin stacks (the short one
 * red). FIG. 4 aggregation bias: one straightedge through two groups, the
 * minority's residuals red.
 */
export function FourSources() {
  const id = "w2-four";
  const red = { stroke: PAT.signal, strokeWidth: LINE.bold, strokeLinecap: "round" as const };
  const g = 152;
  const people = ["paper", "dense", "paper", "paper", "dense", "paper", "dense", "paper"] as const;
  const X = (v: number) => r2(626 + v * 14);
  const Y = (v: number) => r2(146 - v * 10);
  const major: [number, number][] = [[0.5, 1.3], [1.5, 1.6], [2.4, 2.4], [3.3, 2.5], [4.2, 3.2], [5.1, 3.3], [6, 4], [6.9, 4.1], [7.8, 4.8]];
  const minor: [number, number][] = [[4.6, 4.6], [5.6, 6.1], [6.6, 7.6], [7.6, 9.1]];
  const pooled = (x: number) => 1.15 + 0.47 * x;
  return (
    <Frame
      width={800}
      height={196}
      label="Patent drawing in four figures. FIG. 1, historical bias: a large, neat pile of records whose label tabs are all red. FIG. 2, representation bias: a row of eight faces from the population, three of the protected group, above a sample tray whose three protected-group seats are empty and outlined in red. FIG. 3, measurement bias: two thermometers at the same reading beside two coin stacks, one tall and one short in red. FIG. 4, aggregation bias: one straightedge laid through white majority points and dense minority points, the minority points' residuals drawn in red."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 — historical bias: the labels themselves */}
      <line x1={20} y1={g + 1} x2={182} y2={g + 1} {...hair} />
      <Pile id={id} x={60} y={g} n={30} w={86} />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M60 ${g - 5 - i * 9}h-12v-5h12`} fill={stip(id, "signal")} stroke={PAT.signal} strokeWidth={LINE.outline} strokeLinejoin="round" />
      ))}

      <line x1={200} y1={16} x2={200} y2={170} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 — representation bias: seats left empty in the sample */}
      {people.map((c, i) => (
        <Portrait key={i} id={id} x={224 + i * 19} y={30} w={16} h={26} coat={c} />
      ))}
      <line x1={300} y1={64} x2={300} y2={88} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(300, 92, 0, 1, 6)} fill="none" {...hair} />
      <ObliqueBox id={id} x={220} y={100} w={160} h={44} dx={10} dy={6} />
      {people.map((c, i) =>
        c === "dense" ? (
          <rect key={i} x={226 + i * 19} y={108} width={16} height={26} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} strokeDasharray="3 2" />
        ) : (
          <Portrait key={i} id={id} x={226 + i * 19} y={108} w={16} h={26} />
        ),
      )}

      <line x1={400} y1={16} x2={400} y2={170} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 3 — measurement bias: same need, unequal spending */}
      <line x1={420} y1={g + 1} x2={582} y2={g + 1} {...hair} />
      {[
        { x: 440, coins: 9 },
        { x: 516, coins: 2 },
      ].map((p) => (
        <g key={p.x}>
          <Thermometer id={id} cx={p.x} top={52} bulbY={g - 8} level={70} />
          <Coins id={id} cx={p.x + 36} y={g} n={p.coins} rx={12} ry={4} h={7} red={p.coins < 4} />
        </g>
      ))}
      <line x1={448} y1={70} x2={524} y2={70} {...hair} strokeDasharray="4 2.5" />

      <line x1={600} y1={16} x2={600} y2={170} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 4 — aggregation bias: one straightedge for two groups */}
      <path d="M622 30V150H780" fill="none" {...ink} />
      {minor.map(([x, y]) => (
        <line key={x} x1={X(x)} y1={Y(y)} x2={X(x)} y2={Y(pooled(x))} {...red} />
      ))}
      <line x1={X(0)} y1={Y(pooled(0))} x2={X(10.5)} y2={Y(pooled(10.5))} {...ink} strokeWidth={LINE.bold} />
      {major.map(([x, y]) => (
        <circle key={x} cx={X(x)} cy={Y(y)} r={3.4} fill={PAT.paper} {...ink} />
      ))}
      {minor.map(([x, y]) => (
        <circle key={x} cx={X(x)} cy={Y(y)} r={4.4} fill={stip(id, "dense")} {...ink} />
      ))}

      <Fig x={100} y={186} n={1} size={12}>
        historical bias
      </Fig>
      <Fig x={300} y={186} n={2} size={12}>
        representation bias
      </Fig>
      <Fig x={500} y={186} n={3} size={12}>
        measurement bias
      </Fig>
      <Fig x={700} y={186} n={4} size={12}>
        aggregation bias
      </Fig>
    </Frame>
  );
}

/**
 * A confusion matrix as a shallow tray, (x, y) the front face's top-left:
 * columns Y = 1, Y = 0; rows D = 1, D = 0. A bold frame rings the cells a
 * criterion conditions on (`given`, as [row0, col0, rows, cols]); dense
 * stipple fills the cells it counts.
 */
function Matrix({ id, x, y, cw = 44, ch = 32, given, count }: { id: string; x: number; y: number; cw?: number; ch?: number; given: [number, number, number, number]; count: [number, number][] }) {
  const has = (r: number, c: number) => count.some(([a, b]) => a === r && b === c);
  const [r0, c0, nr, nc] = given;
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={cw * 2} h={ch * 2} dx={8} dy={5} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <rect key={`${r}${c}`} x={x + c * cw} y={y + r * ch} width={cw} height={ch} fill={has(r, c) ? stip(id, "dense") : PAT.paper} {...hair} />
        )),
      )}
      <rect x={x + c0 * cw} y={y + r0 * ch} width={nc * cw} height={nr * ch} fill="none" {...ink} strokeWidth={LINE.bold} />
    </g>
  );
}

/**
 * Part 2: the three families of group fairness, each read off the same
 * confusion matrix for Group A and Group B. Independence counts the approved
 * row out of every applicant; separation counts approvals within the true
 * outcome's column; sufficiency counts repayers within the approved row.
 */
export function ThreeFamilies() {
  const id = "w2-fam";
  const figs = [
    { x: 10, name: "independence", given: [0, 0, 2, 2] as [number, number, number, number], count: [[0, 0], [0, 1]] as [number, number][] },
    { x: 276, name: "separation", given: [0, 0, 2, 1] as [number, number, number, number], count: [[0, 0]] as [number, number][] },
    { x: 542, name: "sufficiency", given: [0, 0, 1, 2] as [number, number, number, number], count: [[0, 0]] as [number, number][] },
  ];
  return (
    <Frame
      width={800}
      height={176}
      label="Patent drawing in three figures. Each figure shows the confusion matrix of Group A beside that of Group B, columns for Y = 1 and Y = 0, rows for D = 1 and D = 0, with an equals sign between them. A bold frame rings the cells each criterion conditions on and dense stipple fills the cells it counts. FIG. 1, independence: the whole matrix is framed and the approved row is stippled. FIG. 2, separation: the Y = 1 column is framed and its approved cell is stippled. FIG. 3, sufficiency: the D = 1 row is framed and its repaid cell is stippled."
    >
      <PatentDefs id={id} />
      {figs.map((f, i) => (
        <g key={f.name}>
          {i > 0 ? <line x1={f.x - 12} y1={14} x2={f.x - 12} y2={150} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} /> : null}
          <Num x={f.x + 60} y={34} size={12}>
            Y = 1
          </Num>
          <Num x={f.x + 104} y={34} size={12}>
            Y = 0
          </Num>
          <Num x={f.x + 34} y={68} size={12} anchor="end">
            D = 1
          </Num>
          <Num x={f.x + 34} y={100} size={12} anchor="end">
            D = 0
          </Num>
          <Matrix id={id} x={f.x + 38} y={46} given={f.given} count={f.count} />
          <Num x={f.x + 146} y={84} size={20}>
            =
          </Num>
          <Matrix id={id} x={f.x + 160} y={46} given={f.given} count={f.count} />
          <PatentKey x={f.x + 82} y={130} size={10}>
            GROUP A
          </PatentKey>
          <PatentKey x={f.x + 204} y={130} size={10}>
            GROUP B
          </PatentKey>
          <Fig x={f.x + 126} y={164} n={i + 1} size={12}>
            {f.name}
          </Fig>
        </g>
      ))}
    </Frame>
  );
}

/**
 * Confusion matrices across groups, as an instrument. Each group's applicants
 * sit on a score axis in two rows: those who would repay (Y = 1, white) and
 * those who would default (Y = 0, dense). The cutoff blade approves every
 * score at or above it; qualified applicants left of the blade (rejected)
 * turn red. The table reads the four rates for each group.
 */
export function ConfusionCutoff() {
  const [cut, setCut] = useState(60);
  const id = "w2-conf";
  const groups = [
    { name: "GROUP A", y: 44, pos: [45, 55, 62, 68, 72, 78, 84, 90, 95], neg: [15, 25, 33, 40, 50, 58, 66] },
    { name: "GROUP B", y: 118, pos: [38, 44, 52, 60, 70, 82], neg: [8, 14, 22, 28, 34, 42, 49, 57, 65, 76] },
  ];
  const X = (v: number) => r2(124 + v * 3.9);
  const pct = (a: number, b: number) => (b === 0 ? "–" : `${Math.round((100 * a) / b)}%`);
  const stats = groups.map((g) => {
    const tp = g.pos.filter((v) => v >= cut).length;
    const fp = g.neg.filter((v) => v >= cut).length;
    const n = g.pos.length + g.neg.length;
    return [pct(tp + fp, n), pct(tp, g.pos.length), pct(fp, g.neg.length), pct(tp, tp + fp)];
  });
  const rows = ["P(D = 1)", "P(D = 1 | Y = 1)", "P(D = 1 | Y = 0)", "P(Y = 1 | D = 1)"];
  const bx = X(cut);
  return (
    <div>
      <Frame
        width={800}
        height={186}
        label={`Patent drawing of two score axes, one per group, with the cutoff blade at a score of ${cut}. Applicants who would repay sit in a white row and those who would default in a dense row; everyone at or above the cutoff is approved, and qualified applicants below it, rejected, are drawn in red. The table reads, for Group A and Group B: selection rate ${stats[0][0]} and ${stats[1][0]}; true positive rate ${stats[0][1]} and ${stats[1][1]}; false positive rate ${stats[0][2]} and ${stats[1][2]}; positive predictive value ${stats[0][3]} and ${stats[1][3]}.`}
      >
        <PatentDefs id={id} />
        {/* the cutoff blade */}
        <ObliqueBox id={id} x={r2(bx - 2)} y={30} w={4} h={128} dx={6} dy={4} />
        <Num x={r2(bx - 10)} y={24} size={11.5} anchor="end">
          D = 0
        </Num>
        <Num x={r2(bx + 14)} y={24} size={11.5} anchor="start">
          D = 1
        </Num>
        {groups.map((g) => (
          <g key={g.name}>
            <PatentKey x={14} y={g.y + 16} anchor="start" size={10}>
              {g.name}
            </PatentKey>
            {[0, 1].map((r) => (
              <g key={r}>
                <line x1={X(0)} y1={g.y + r * 24} x2={X(100)} y2={g.y + r * 24} {...hair} />
                <Num x={114} y={g.y + r * 24 + 4} size={11.5} anchor="end">
                  {r === 0 ? "Y = 1" : "Y = 0"}
                </Num>
              </g>
            ))}
            {g.pos.map((v) => {
              const rejected = v < cut;
              return <circle key={`p${v}`} cx={X(v)} cy={g.y} r={5.5} fill={rejected ? stip(id, "signal") : PAT.paper} stroke={rejected ? PAT.signal : PAT.ink} strokeWidth={rejected ? LINE.bold : LINE.outline} />;
            })}
            {g.neg.map((v) => (
              <circle key={`n${v}`} cx={X(v)} cy={g.y + 24} r={5.5} fill={stip(id, "dense")} {...ink} />
            ))}
          </g>
        ))}
        {/* score axis */}
        <line x1={X(0)} y1={160} x2={X(100)} y2={160} {...ink} />
        {[0, 50, 100].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={160} x2={X(v)} y2={165} {...ink} />
            <Num x={X(v)} y={179} size={11.5}>
              {v}
            </Num>
          </g>
        ))}
        <Num x={X(100) + 14} y={164} size={12} anchor="start">
          S
        </Num>

        {/* the table */}
        <line x1={578} y1={30} x2={790} y2={30} {...ink} />
        <PatentKey x={718} y={24} size={10}>
          A
        </PatentKey>
        <PatentKey x={768} y={24} size={10}>
          B
        </PatentKey>
        {rows.map((r, i) => (
          <g key={r}>
            <Num x={582} y={56 + i * 30} size={12} anchor="start">
              {r}
            </Num>
            <Num x={716} y={56 + i * 30} size={14}>
              {stats[0][i]}
            </Num>
            <Num x={766} y={56 + i * 30} size={14}>
              {stats[1][i]}
            </Num>
            <line x1={578} y1={64 + i * 30} x2={790} y2={64 + i * 30} {...hair} />
          </g>
        ))}
      </Frame>
      <Slider label="Cutoff threshold" value={cut} min={20} max={90} step={2} onChange={setCut} />
    </div>
  );
}

/** A qualified applicant: a patent figure holding a certificate up over the head. */
function Qualified({ id, x, y, s = 0.62, coat = "paper", stroke = PAT.ink }: { id: string; x: number; y: number; s?: number; coat?: "paper" | "dense" | "signal"; stroke?: string }) {
  const hx = r2(x + 27 * s);
  const hy = r2(y - 84 * s);
  const w = r2(15 * s);
  const h = r2(18 * s);
  return (
    <g>
      <Figure id={id} x={x} y={y} s={s} arm="raise" coat={coat} stroke={stroke} />
      <rect x={r2(hx - w / 2)} y={r2(hy - h)} width={w} height={h} fill={PAT.paper} stroke={stroke} strokeWidth={LINE.outline} />
      <line x1={r2(hx - w / 2 + 2.5)} y1={r2(hy - h * 0.6)} x2={r2(hx + w / 2 - 2.5)} y2={r2(hy - h * 0.6)} stroke={stroke} strokeWidth={LINE.hair} />
    </g>
  );
}

/**
 * Demographic parity: each group has ten applicants and a platform for the
 * 30 percent approved. Group A's three qualified applicants fill its
 * platform. The slider sets how many of Group B's ten are qualified; parity
 * still approves exactly three, so either qualified applicants are left on
 * the ground or less-qualified ones are raised (red).
 */
export function DemographicParity() {
  const [rateB, setRateB] = useState(50);
  const id = "w2-parity";
  const g = 146;
  const q = rateB / 10;
  type P = { qualified: boolean; red: boolean };
  const groupA: { up: P[]; down: P[] } = {
    up: [0, 1, 2].map(() => ({ qualified: true, red: false })),
    down: Array.from({ length: 7 }, () => ({ qualified: false, red: false })),
  };
  const upB: P[] = Array.from({ length: 3 }, (_, i) => (i < q ? { qualified: true, red: false } : { qualified: false, red: true }));
  const downB: P[] = Array.from({ length: 7 }, (_, i) => (i < q - 3 ? { qualified: true, red: true } : { qualified: false, red: false }));
  const errors = q > 3 ? `${q - 3} qualified applicant${q - 3 > 1 ? "s are" : " is"} left unapproved, in red` : q < 3 ? `${3 - q} less-qualified applicant${3 - q > 1 ? "s are" : " is"} approved, in red` : "the three approved are exactly the three qualified";
  const person = (p: P, x: number, y: number, coat: "paper" | "dense", k: string) =>
    p.qualified ? (
      <Qualified key={k} id={id} x={x} y={y} s={0.76} coat={p.red ? "signal" : coat} stroke={p.red ? PAT.signal : PAT.ink} />
    ) : (
      <Figure key={k} id={id} x={x} y={y} s={0.76} coat={p.red ? "signal" : coat} stroke={p.red ? PAT.signal : PAT.ink} />
    );
  const group = (x0: number, up: P[], down: P[], coat: "paper" | "dense", name: string) => (
    <g>
      <line x1={x0} y1={g + 1} x2={x0 + 366} y2={g + 1} {...hair} />
      <ObliqueBox id={id} x={x0} y={g - 18} w={104} h={18} dx={12} dy={7} />
      <Num x={x0 + 52} y={g - 4} size={13}>
        30%
      </Num>
      {up.map((p, i) => person(p, x0 + 18 + i * 32, g - 21, coat, `u${i}`))}
      {down.map((p, i) => person(p, x0 + 136 + i * 33, g, coat, `d${i}`))}
      <PatentKey x={x0 + 183} y={g + 20} size={10}>
        {name}
      </PatentKey>
    </g>
  );
  return (
    <div>
      <Frame
        width={800}
        height={174}
        label={`Patent drawing: two groups of ten applicants, Group A in white coats and Group B in dense coats; applicants who are qualified hold up a certificate. Each group has a platform for the 30% approved under demographic parity. Group A's three qualified applicants stand on its platform. ${q * 10}% of Group B is qualified; with three of its ten approved, ${errors}.`}
      >
        <PatentDefs id={id} />
        {group(14, groupA.up, groupA.down, "paper", "GROUP A")}
        <line x1={400} y1={10} x2={400} y2={164} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
        {group(420, upB, downB, "dense", "GROUP B")}
        <line x1={52} y1={22} x2={52} y2={40} {...hair} />
        <PatentKey x={40} y={16} anchor="start" size={10}>
          QUALIFIED
        </PatentKey>
      </Frame>
      <Slider label="Group B qualification rate" value={rateB} min={10} max={60} step={10} onChange={setRateB} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/**
 * A tray of ten applicants lying flat, two rows of five discs; the first
 * `chosen` discs are selected (dense). `red` marks unselected discs red.
 */
function Tray({ id, x, y, chosen, red = false }: { id: string; x: number; y: number; chosen: number; red?: boolean }) {
  return (
    <g>
      <path d={`M${x} ${y}L${x + 16} ${y - 30}H${x + 112}L${x + 96} ${y}Z`} fill={PAT.paper} {...ink} />
      <path d={`M${x} ${y}V${y + 4}H${x + 96}L${x + 112} ${y - 26}V${y - 30}L${x + 96} ${y}Z`} fill={stip(id, "dense")} {...ink} />
      {Array.from({ length: 10 }, (_, i) => {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const cx = r2(x + 18 + col * 17 + (1 - row) * 7);
        const cy = r2(y - 9 - (1 - row) * 13);
        const on = i < chosen;
        const hot = !on && red;
        return <ellipse key={i} cx={cx} cy={cy} rx={6.5} ry={4} fill={on ? stip(id, "dense") : hot ? stip(id, "signal") : PAT.paper} stroke={hot ? PAT.signal : PAT.ink} strokeWidth={hot ? LINE.bold : LINE.outline} />;
      })}
    </g>
  );
}

/**
 * Separation on trays sorted by the true outcome: a Y = 1 tray and a Y = 0
 * tray for each group, selected applicants dense. FIG. 1: without
 * separation, Group B's qualified applicants are overlooked at a higher rate
 * (red). FIG. 2, equal opportunity: the Y = 1 trays match. FIG. 3, equalized
 * odds: both trays match.
 */
export function SeparationTrays() {
  const id = "w2-sep";
  const figs = [
    { x: 76, a: [8, 3], b: [5, 1], name: "overlooked at higher rates" },
    { x: 318, a: [8, 3], b: [8, 1], name: "equal opportunity" },
    { x: 560, a: [8, 2], b: [8, 2], name: "equalized odds" },
  ];
  return (
    <Frame
      width={800}
      height={196}
      label="Patent drawing in three figures. In each, applicants lie on trays sorted by the true outcome: a Y = 1 tray of ten who would repay and a Y = 0 tray of ten who would default, for Group A and for Group B; the applicants the model selects are stippled dense. FIG. 1, overlooked at higher rates: Group A has 8 of 10 qualified selected, Group B only 5 of 10, its five overlooked qualified applicants drawn in red. FIG. 2, equal opportunity: both groups have 8 of 10 qualified selected, while 3 and 1 of 10 unqualified are selected. FIG. 3, equalized odds: 8 of 10 qualified and 2 of 10 unqualified selected in both groups."
    >
      <PatentDefs id={id} />
      <Num x={50} y={70} size={13} anchor="end">
        Y = 1
      </Num>
      <Num x={50} y={136} size={13} anchor="end">
        Y = 0
      </Num>
      <line x1={94} y1={80} x2={94} y2={94} {...hair} />
      <PatentKey x={84} y={106} anchor="start" size={10}>
        SELECTED
      </PatentKey>
      {figs.map((f, i) => (
        <g key={f.name}>
          {i > 0 ? <line x1={f.x - 12} y1={10} x2={f.x - 12} y2={168} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} /> : null}
          <PatentKey x={f.x + 56} y={22} size={10}>
            GROUP A
          </PatentKey>
          <PatentKey x={f.x + 172} y={22} size={10}>
            GROUP B
          </PatentKey>
          <Tray id={id} x={f.x} y={82} chosen={f.a[0]} />
          <Tray id={id} x={f.x + 116} y={82} chosen={f.b[0]} red={i === 0} />
          <Tray id={id} x={f.x} y={148} chosen={f.a[1]} />
          <Tray id={id} x={f.x + 116} y={148} chosen={f.b[1]} />
          <Fig x={f.x + 114} y={186} n={i + 1} size={12}>
            {f.name}
          </Fig>
        </g>
      ))}
    </Frame>
  );
}

/**
 * Sufficiency: calibration read off test tubes. At each score level S, one
 * tube per group holds the share who repaid; the blade is the single cutoff.
 * FIG. 1, calibration within groups: both groups' tubes fill to the same
 * level at every score. FIG. 2: at the same scores Group B's tubes fall
 * short (red), so the one cutoff no longer means the same thing for both.
 */
export function CalibrationTubes() {
  const id = "w2-calib";
  const levels = [0.2, 0.4, 0.6, 0.8];
  const top = 34;
  const bottom = 150;
  const Y = (v: number) => r2(bottom - (bottom - top) * v);
  const fig = (x0: number, calibrated: boolean, n: number, name: string) => {
    const X = (v: number) => r2(x0 + 30 + ((v - 0.2) / 0.6) * 270);
    return (
      <g>
        {levels.map((v) => {
          const b = calibrated ? v : v - 0.17;
          return (
            <g key={v}>
              <Cylinder id={id} cx={X(v) - 13} top={top} bottom={bottom} rx={10} ry={3} level={v} />
              <Cylinder id={id} cx={X(v) + 13} top={top} bottom={bottom} rx={10} ry={3} level={b} tone="dense" red={!calibrated} />
              <Num x={X(v)} y={170} size={12}>
                {v}
              </Num>
            </g>
          );
        })}
        <Num x={X(0.8) + 40} y={170} size={12} anchor="start">
          S
        </Num>
        {/* the single cutoff */}
        <ObliqueBox id={id} x={r2((X(0.4) + X(0.6)) / 2 - 2)} y={30} w={4} h={128} dx={6} dy={4} />
        <Fig x={x0 + 165} y={194} n={n} size={12}>
          {name}
        </Fig>
      </g>
    );
  };
  return (
    <Frame
      width={800}
      height={204}
      label="Patent drawing in two figures. At four score levels S, 0.2, 0.4, 0.6 and 0.8, two test tubes stand side by side, Group A's lightly stippled and Group B's densely stippled, each filled to the share of applicants with that score who repaid; a blade between 0.4 and 0.6 is the single cutoff. FIG. 1, calibration within groups: both groups' tubes fill to the same level at every score. FIG. 2, a stricter predictive standard: at every score Group B's tubes, in red, fill lower than Group A's."
    >
      <PatentDefs id={id} />
      {fig(14, true, 1, "calibration within groups")}
      <line x1={400} y1={14} x2={400} y2={176} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {fig(414, false, 2, "a stricter predictive standard")}
      <path d="M196 16H206L211 26" fill="none" {...hair} />
      <PatentKey x={192} y={20} anchor="end" size={10}>
        GROUP A
      </PatentKey>
      <path d="M252 16H242L237 26" fill="none" {...hair} />
      <PatentKey x={256} y={20} anchor="start" size={10}>
        GROUP B
      </PatentKey>
    </Frame>
  );
}

/**
 * Selecting a criterion, one context per figure. FIG. 1, demographic parity:
 * an outreach billboard reaches the same number from each group. FIG. 2,
 * equal opportunity: a qualified applicant (certificate held up) at a
 * screening gate. FIG. 3, equalized odds: a level balance weighs each
 * group's fraud flags. FIG. 4, predictive parity and calibration: one risk
 * score dial with a single cutoff mark.
 */
export function CriterionContexts() {
  const id = "w2-select";
  const g = 156;
  const at = (deg: number, r: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [r2(700 + Math.cos(a) * r), r2(104 + Math.sin(a) * r)] as const;
  };
  const [n1, n2] = at(28, 30);
  const [c1, c2] = at(6, 51);
  const [c3, c4] = at(14, 51);
  const [c5, c6] = at(10, 43);
  return (
    <Frame
      width={800}
      height={192}
      label="Patent drawing in four figures. FIG. 1, demographic parity: an outreach billboard on two posts faces three people from each group. FIG. 2, equal opportunity: a qualified applicant holding up a certificate waits at a screening gate. FIG. 3, equalized odds: a balance hangs level with one fraud flag in each pan, one pan per group. FIG. 4, predictive parity and calibration: a risk score dial with a single cutoff mark on its rim and its needle just past it."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 — outreach billboard, equal reach */}
      <line x1={18} y1={g + 1} x2={186} y2={g + 1} {...hair} />
      <line x1={64} y1={74} x2={64} y2={g} {...ink} />
      <line x1={136} y1={74} x2={136} y2={g} {...ink} />
      <ObliqueBox id={id} x={40} y={26} w={120} h={48} dx={8} dy={5} />
      {[40, 50, 60].map((y) => (
        <line key={y} x1={52} x2={y === 60 ? 120 : 148} y1={y} y2={y} {...hair} />
      ))}
      {[26, 46, 66].map((x) => (
        <Figure key={x} id={id} x={x} y={g} s={0.5} coat="paper" />
      ))}
      {[134, 154, 174].map((x) => (
        <Figure key={x} id={id} x={x} y={g} s={0.5} coat="dense" flip />
      ))}

      <line x1={200} y1={16} x2={200} y2={168} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 — a qualified applicant at the screening gate */}
      <line x1={218} y1={g + 1} x2={386} y2={g + 1} {...hair} />
      <Qualified id={id} x={258} y={g} s={0.84} />
      <ObliqueBox id={id} x={312} y={g - 70} w={12} h={70} dx={8} dy={5} />
      <path d={`M324 ${g - 46}L370 ${g - 74}V${g - 66}L324 ${g - 38}Z`} fill={stip(id, "light")} {...ink} />

      <line x1={400} y1={16} x2={400} y2={168} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 3 — a level balance, one fraud flag in each group's pan */}
      <ObliqueBox id={id} x={466} y={g - 10} w={68} h={10} dx={10} dy={6} />
      <path d={`M496 ${g - 10}V40H504V${g - 10}`} fill={PAT.paper} {...ink} />
      <path d="M430 34H570V40H430Z" fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
      <circle cx={500} cy={36} r={4} fill={PAT.paper} {...ink} />
      <Pan id={id} cx={442} hookY={40} y={108} w={48} />
      <Pan id={id} cx={558} hookY={40} y={108} w={48} />
      {[438, 554].map((x) => (
        <g key={x}>
          <line x1={x} y1={106} x2={x} y2={84} {...ink} />
          <path d={`M${x} 84L${x + 14} 89L${x} 94Z`} fill={PAT.paper} {...ink} />
        </g>
      ))}
      <PatentKey x={442} y={134} size={10}>
        GROUP A
      </PatentKey>
      <PatentKey x={558} y={134} size={10}>
        GROUP B
      </PatentKey>

      <line x1={600} y1={16} x2={600} y2={168} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 4 — one risk score, one cutoff */}
      <circle cx={700} cy={104} r={50} fill={stip(id, "light")} {...ink} />
      <circle cx={700} cy={104} r={44} fill={PAT.paper} {...ink} />
      {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((t) => {
        const [x1, y1] = at(t, 42);
        const [x2, y2] = at(t, 36);
        return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} {...hair} />;
      })}
      <path d={`M${c1} ${c2}L${c3} ${c4}L${c5} ${c6}Z`} fill={PAT.ink} />
      <line x1={700} y1={104} x2={n1} y2={n2} {...ink} strokeWidth={LINE.bold} />
      <circle cx={700} cy={104} r={3} fill={PAT.ink} />

      <Fig x={100} y={184} n={1} size={12}>
        demographic parity
      </Fig>
      <Fig x={300} y={184} n={2} size={12}>
        equal opportunity
      </Fig>
      <Fig x={500} y={184} n={3} size={12}>
        equalized odds
      </Fig>
      <Fig x={700} y={184} n={4} size={12}>
        calibration
      </Fig>
    </Frame>
  );
}

/**
 * Part 3. FIG. 1, the group average: eight members of one group, a tick or
 * a cross over each, average to 50 percent; yet two equally qualified
 * members side by side get opposite outcomes, the rejected one red. FIG. 2,
 * the single consumer: one person under a hand lens.
 */
export function GroupAverageVsIndividual() {
  const id = "w2-indiv";
  const g = 168;
  const members = [
    { ok: true, q: false },
    { ok: false, q: false },
    { ok: true, q: true },
    { ok: false, q: true, red: true },
    { ok: true, q: false },
    { ok: false, q: false },
    { ok: true, q: false },
    { ok: false, q: false },
  ];
  return (
    <Frame
      width={800}
      height={206}
      label="Patent drawing in two figures. FIG. 1, the group average: eight members of one group stand in a row under a bar reading a 50% group average; a tick or a cross hangs over each. Two members side by side, both holding up the same certificate, are equally qualified, yet one has a tick and the other a cross, drawn in red. FIG. 2, the single consumer: one person stands under a large hand lens."
    >
      <PatentDefs id={id} />

      {/* FIG. 1 — the group average */}
      <line x1={20} y1={g + 1} x2={480} y2={g + 1} {...hair} />
      <ObliqueBox id={id} x={40} y={18} w={420} h={22} dx={10} dy={6} />
      <PatentKey x={250} y={34} size={11}>
        GROUP AVERAGE 50%
      </PatentKey>
      {members.map((m, i) => {
        const x = 62 + i * 54;
        const c = m.red ? PAT.signal : PAT.ink;
        return (
          <g key={i}>
            {m.ok ? (
              <path d={tick(x + 4, 58, 7)} fill="none" stroke={c} strokeWidth={LINE.bold} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d={cross(x + 4, 58, 6)} fill="none" stroke={c} strokeWidth={LINE.bold} strokeLinecap="round" />
            )}
            {m.q ? (
              <Qualified id={id} x={x} y={g} s={0.86} coat={m.red ? "signal" : "paper"} stroke={c} />
            ) : (
              <Figure id={id} x={x} y={g} s={0.86} coat="paper" />
            )}
          </g>
        );
      })}

      <line x1={500} y1={14} x2={500} y2={184} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

      {/* FIG. 2 — the single consumer under the lens */}
      <line x1={540} y1={g + 1} x2={780} y2={g + 1} {...hair} />
      <Figure id={id} x={640} y={g} s={1.2} coat="paper" />
      {/* a hand lens held over the consumer: rim and handle, the glass clear */}
      <path d="M640 52a52 52 0 1 0 0.01 0ZM640 58a46 46 0 1 1 -0.01 0Z" fill={stip(id, "dense")} fillRule="evenodd" {...ink} />
      <path d="M676.2 67.4L704.5 39.1L711.6 46.2L683.3 74.5" fill={stip(id, "dense")} {...ink} />

      <Fig x={250} y={198} n={1} size={12}>
        the group average
      </Fig>
      <Fig x={640} y={198} n={2} size={12}>
        the single consumer
      </Fig>
    </Frame>
  );
}
