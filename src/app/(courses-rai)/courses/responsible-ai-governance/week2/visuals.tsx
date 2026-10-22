"use client";

import React, { useState } from "react";
import { CENTRE_DASH, Fig, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, Segmented, Slider, r2, stip } from "../_visuals/kit";
import { Figure } from "../_visuals/objects";

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
