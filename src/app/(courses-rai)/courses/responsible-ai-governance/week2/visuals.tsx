"use client";

import React, { useState } from "react";
import { CENTRE_DASH, FigureName, Frame, LINE, ObliqueBox, PAT, PatentDefs, PatentKey, Segmented, Slider, r2, stip } from "../_visuals/kit";
import { Chip, Coins, Figure, Gear, House, Tag, cross, headAlongPath, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 2 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names in
   the body face and one examiner's red for the finding. The protected group
   keeps one mark all week: a figure in a dense-stippled coat. See the course
   CLAUDE.md.
   ========================================================================== */

const ink = { stroke: PAT.ink, strokeWidth: LINE.outline, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const hair = { stroke: PAT.ink, strokeWidth: LINE.hair, strokeLinecap: "round" as const };

/** Numerals or a quantity on a plate. */
function Num({ x, y, children, size = 14, anchor = "middle", fill = PAT.ink }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end"; fill?: string }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-body)" fontSize={size} fill={fill} style={{ fontVariantNumeric: "lining-nums" }}>
      {children}
    </text>
  );
}

/**
 * From statistical to market discrimination. Each figure is a rail of
 * predicted probability with a threshold blade standing at its middle.
 * Customers stand at their scores. The first figure: both groups fall on both sides.
 * The second figure: the protected group (dense coats) falls below the blade, in red.
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
          Low
        </PatentKey>
        <PatentKey x={blade + 20} y={52} anchor="start" size={10.5}>
          High
        </PatentKey>
      </g>
    );
  };
  return (
    <Frame
      width={800}
      height={218}
      label="Patent drawing in two figures. Each figure is a rail of predicted probability from 0 to 1 with a threshold blade standing at 0.5. Customers stand along the rail at their scores, the low ones left of the blade and the high ones right of it. Customers of the protected group wear dense-stippled coats. The first figure, discriminating in the statistical sense: both groups stand on both sides of the blade. The second figure, market discrimination: four of the five protected-group customers stand on the low side, drawn in red."
    >
      <PatentDefs id={id} />
      {fig(26, "ABABABABAB", false)}
      <line x1={81} y1={34} x2={81} y2={76} {...hair} />
      <PatentKey x={70} y={28} anchor="start" size={10.5}>
        Protected group
      </PatentKey>
      <line x1={400} y1={20} x2={400} y2={192} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {fig(430, "BBABBAABAA", true)}
      <FigureName x={204} y={208} size={12}>
        discriminating in the statistical sense
      </FigureName>
      <FigureName x={608} y={208} size={12}>
        market discrimination
      </FigureName>
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
 * slider). A dashed line marks four-fifths of the higher level. Below it the
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
        label={`Patent drawing: two graduated cylinders. The highest-selected group's cylinder is filled to a 50% selection rate. The protected group's cylinder is filled to ${rateB}%. A dashed line marks four-fifths of the higher rate, 40%. The ratio of the two rates is ${ratio.toFixed(2)}${adverse ? ", below four-fifths, so the protected group's cylinder and the ratio are red, signalling potential adverse impact" : ", at or above four-fifths"}.`}
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
          Four-fifths
        </PatentKey>
        <Num x={96} y={17} size={15}>
          50%
        </Num>
        <Num x={240} y={17} size={15} fill={adverse ? PAT.signal : PAT.ink}>
          {`${rateB}%`}
        </Num>
        <PatentKey x={96} y={173} size={11.5}>
          Highest-selected
        </PatentKey>
        <PatentKey x={240} y={173} size={11.5}>
          Protected
        </PatentKey>
        <Num x={344} y={134} size={30} fill={adverse ? PAT.signal : PAT.ink}>
          {ratio.toFixed(2)}
        </Num>
        <PatentKey x={344} y={156} size={11.5}>
          Ratio
        </PatentKey>
      </Frame>
      <Slider label="Protected group selection rate" value={rateB} min={10} max={60} step={2} onChange={setRateB} formatValue={(v) => `${v}%`} />
    </div>
  );
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
        10 years
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
 * sets the protected group's share. Two meters read the deployed error rate
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
          Error rate
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
 * Aggregation bias on a plotted board: majority points (white) follow a
 * gentle slope, minority points (dense) a steep one. A single pooled model
 * lays one straightedge along the majority, and the minority's residuals
 * (red) are long. Group-specific models lay one straightedge per group.
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
        label={`Patent drawing of a plotted board, predictor across and outcome up. White points of the majority group follow a gentle slope. Six dense points of a minority group follow a steep slope. ${pooled ? "A single model lays one straightedge along the majority points. The minority points' residuals to it, drawn in red, are long." : "Group-specific models lay one straightedge along each group. Every residual is short."}`}
      >
        <PatentDefs id={id} />
        <ObliqueBox id={id} x={30} y={14} w={352} h={156} dx={10} dy={6} />
        <path d="M54 22V146H372" fill="none" {...ink} />
        <PatentKey x={370} y={162} anchor="end" size={11.5}>
          Predictor
        </PatentKey>
        <text x={44} y={86} textAnchor="middle" fontFamily="var(--font-body)" fontSize={11.5} fill={PAT.ink} transform="rotate(-90 44 86)">
          Outcome
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
 * features into the model. The row it rebuilds (red) matches the deleted one
 * with a precision that climbs as features are combined.
 */
export function ProxyReconstruction() {
  const [k, setK] = useState(4);
  const id = "w2-proxy";
  const rows = ["Postal code", "Device brand", "Browser language", "Shopping schedule"];
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
          Protected attribute
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
          Precision
        </PatentKey>
      </Frame>
      <Slider label="Behavioral features combined" value={k} min={0} max={4} onChange={setK} />
    </div>
  );
}

/**
 * A runaway feedback loop. The credit model's decisions run out along the
 * top to two neighborhoods. The one approved sends its repayment records back
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
      label="Patent drawing of a runaway feedback loop. A credit model's housing sends its decisions out along a line across the top to two neighborhoods of two houses each. The first neighborhood is approved, and its repayment records travel back along the bottom into the training pile below the model, which feeds the model's retraining. The second neighborhood is denied at a red cross. Its return path to the training pile is a dashed red line carrying no records, never observed."
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
        Never observed
      </PatentKey>
    </Frame>
  );
}

/**
 * A confusion matrix as a shallow tray, (x, y) the front face's top-left:
 * columns Y = 1, Y = 0. Rows D = 1, D = 0. A bold frame rings the cells a
 * criterion conditions on (`given`, as [row0, col0, rows, cols]). Dense
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
 * row out of every applicant. Separation counts approvals within the true
 * outcome's column. Sufficiency counts repayers within the approved row.
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
      label="Patent drawing in three figures. Each figure shows the confusion matrix of Group A beside that of Group B, columns for Y = 1 and Y = 0, rows for D = 1 and D = 0, with an equals sign between them. A bold frame rings the cells each criterion conditions on and dense stipple fills the cells it counts. The first figure, independence: the whole matrix is framed and the approved row is stippled. The second figure, separation: the Y = 1 column is framed and its approved cell is stippled. The third figure, sufficiency: the D = 1 row is framed and its repaid cell is stippled."
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
            Group A
          </PatentKey>
          <PatentKey x={f.x + 204} y={130} size={10}>
            Group B
          </PatentKey>
          <FigureName x={f.x + 126} y={164} size={12}>
            {f.name}
          </FigureName>
        </g>
      ))}
    </Frame>
  );
}

/**
 * Confusion matrices across groups, as an instrument. Each group's applicants
 * sit on a score axis in two rows: those who would repay (Y = 1, white) and
 * those who would default (Y = 0, dense). The cutoff blade approves every
 * score at or above it. Qualified applicants left of the blade (rejected)
 * turn red. The table reads the four rates for each group.
 */
export function ConfusionCutoff() {
  const [cut, setCut] = useState(60);
  const id = "w2-conf";
  const groups = [
    { name: "Group A", y: 44, pos: [45, 55, 62, 68, 72, 78, 84, 90, 95], neg: [15, 25, 33, 40, 50, 58, 66] },
    { name: "Group B", y: 118, pos: [38, 44, 52, 60, 70, 82], neg: [8, 14, 22, 28, 34, 42, 49, 57, 65, 76] },
  ];
  const X = (v: number) => r2(124 + v * 3.9);
  const pct = (a: number, b: number) => (b === 0 ? "n/a" : `${Math.round((100 * a) / b)}%`);
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
        label={`Patent drawing of two score axes, one per group, with the cutoff blade at a score of ${cut}. Applicants who would repay sit in a white row and those who would default in a dense row. Everyone at or above the cutoff is approved, and qualified applicants below it, rejected, are drawn in red. The table reads, for Group A and Group B: selection rate ${stats[0][0]} and ${stats[1][0]}. True positive rate ${stats[0][1]} and ${stats[1][1]}. False positive rate ${stats[0][2]} and ${stats[1][2]}. Positive predictive value ${stats[0][3]} and ${stats[1][3]}.`}
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
 * platform. The slider sets how many of Group B's ten are qualified. Parity
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
        label={`Patent drawing: two groups of ten applicants, Group A in white coats and Group B in dense coats. Applicants who are qualified hold up a certificate. Each group has a platform for the 30% approved under demographic parity. Group A's three qualified applicants stand on its platform. ${q * 10}% of Group B is qualified. With three of its ten approved, ${errors}.`}
      >
        <PatentDefs id={id} />
        {group(14, groupA.up, groupA.down, "paper", "Group A")}
        <line x1={400} y1={10} x2={400} y2={164} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
        {group(420, upB, downB, "dense", "Group B")}
        <line x1={52} y1={22} x2={52} y2={40} {...hair} />
        <PatentKey x={40} y={16} anchor="start" size={10}>
          Qualified
        </PatentKey>
      </Frame>
      <Slider label="Group B qualification rate" value={rateB} min={10} max={60} step={10} onChange={setRateB} formatValue={(v) => `${v}%`} />
    </div>
  );
}

/**
 * A tray of ten applicants lying flat, two rows of five discs. The first
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
 * tray for each group, selected applicants dense. The first figure: without
 * separation, Group B's qualified applicants are overlooked at a higher rate
 * (red). The second figure, equal opportunity: the Y = 1 trays match. The third figure, equalized
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
      label="Patent drawing in three figures. In each, applicants lie on trays sorted by the true outcome: a Y = 1 tray of ten who would repay and a Y = 0 tray of ten who would default, for Group A and for Group B. The applicants the model selects are stippled dense. The first figure, overlooked at higher rates: Group A has 8 of 10 qualified selected, Group B only 5 of 10, its five overlooked qualified applicants drawn in red. The second figure, equal opportunity: both groups have 8 of 10 qualified selected, while 3 and 1 of 10 unqualified are selected. The third figure, equalized odds: 8 of 10 qualified and 2 of 10 unqualified selected in both groups."
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
        Selected
      </PatentKey>
      {figs.map((f, i) => (
        <g key={f.name}>
          {i > 0 ? <line x1={f.x - 12} y1={10} x2={f.x - 12} y2={168} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} /> : null}
          <PatentKey x={f.x + 56} y={22} size={10}>
            Group A
          </PatentKey>
          <PatentKey x={f.x + 172} y={22} size={10}>
            Group B
          </PatentKey>
          <Tray id={id} x={f.x} y={82} chosen={f.a[0]} />
          <Tray id={id} x={f.x + 116} y={82} chosen={f.b[0]} red={i === 0} />
          <Tray id={id} x={f.x} y={148} chosen={f.a[1]} />
          <Tray id={id} x={f.x + 116} y={148} chosen={f.b[1]} />
          <FigureName x={f.x + 114} y={186} size={12}>
            {f.name}
          </FigureName>
        </g>
      ))}
    </Frame>
  );
}

/**
 * Sufficiency: calibration read off test tubes. At each score level S, one
 * tube per group holds the share who repaid. The blade is the single cutoff.
 * The first figure, calibration within groups: both groups' tubes fill to the same
 * level at every score. The second figure: at the same scores Group B's tubes fall
 * short (red), so the one cutoff no longer means the same thing for both.
 */
export function CalibrationTubes() {
  const id = "w2-calib";
  const levels = [0.2, 0.4, 0.6, 0.8];
  const top = 34;
  const bottom = 150;
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
        <FigureName x={x0 + 165} y={194} size={12}>
          {name}
        </FigureName>
      </g>
    );
  };
  return (
    <Frame
      width={800}
      height={204}
      label="Patent drawing in two figures. At four score levels S, 0.2, 0.4, 0.6 and 0.8, two test tubes stand side by side, Group A's lightly stippled and Group B's densely stippled, each filled to the share of applicants with that score who repaid. A blade between 0.4 and 0.6 is the single cutoff. The first figure, calibration within groups: both groups' tubes fill to the same level at every score. The second figure, a stricter predictive standard: at every score Group B's tubes, in red, fill lower than Group A's."
    >
      <PatentDefs id={id} />
      {fig(14, true, 1, "calibration within groups")}
      <line x1={400} y1={14} x2={400} y2={176} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {fig(414, false, 2, "a stricter predictive standard")}
      <path d="M196 16H206L211 26" fill="none" {...hair} />
      <PatentKey x={192} y={20} anchor="end" size={10}>
        Group A
      </PatentKey>
      <path d="M252 16H242L237 26" fill="none" {...hair} />
      <PatentKey x={256} y={20} anchor="start" size={10}>
        Group B
      </PatentKey>
    </Frame>
  );
}

/** A straight pipe run from (x1, y1) to (x2, y2), horizontal or vertical, `red` when it carries the discrimination. */
function Pipe({ id, x1, y1, x2, y2, red = false }: { id: string; x1: number; y1: number; x2: number; y2: number; red?: boolean }) {
  const t = 3.5;
  const h = y1 === y2;
  const x = Math.min(x1, x2) - (h ? 0 : t);
  const y = Math.min(y1, y2) - (h ? t : 0);
  const w = h ? Math.abs(x2 - x1) : 2 * t;
  const hh = h ? 2 * t : Math.abs(y2 - y1);
  return <rect x={x} y={y} width={w} height={hh} fill={red ? stip(id, "signal") : PAT.paper} stroke={red ? PAT.signal : PAT.ink} strokeWidth={LINE.outline} />;
}

/** An upright tank, (cx, top) the centre of its lid. */
function Tank({ id, cx, top, h = 34, rx = 17, red = false }: { id: string; cx: number; top: number; h?: number; rx?: number; red?: boolean }) {
  const c = red ? PAT.signal : PAT.ink;
  return (
    <g>
      <path d={`M${cx - rx} ${top}V${top + h}A${rx} 5 0 0 0 ${cx + rx} ${top + h}V${top}`} fill={red ? stip(id, "signal") : PAT.paper} stroke={c} strokeWidth={LINE.outline} />
      <ellipse cx={cx} cy={top} rx={rx} ry={5} fill={stip(id, "light")} stroke={c} strokeWidth={LINE.outline} />
    </g>
  );
}

/**
 * Counterfactual fairness as pipework. The protected attribute's tank feeds
 * the decision directly and through a mediator (school quality) into test
 * scores. The first figure, fairness through unawareness: the direct pipe is blanked
 * off, but the attribute still flows (red) through the mediator to the
 * decision. The second figure, counterfactual fairness: a closed valve removes the
 * attribute's effect on the mediator, and only the legitimate flow remains.
 */
export function CausalPipework() {
  const id = "w2-cause";
  const fig = (x0: number, counterfactual: boolean) => {
    const ax = x0 + 38;
    const mx = x0 + 138;
    const tx = x0 + 238;
    const dx = x0 + 330;
    const y = 72;
    const red = !counterfactual;
    return (
      <g>
        {/* direct pipe, blanked off near the attribute in both figures */}
        <Pipe id={id} x1={ax} y1={y + 40} x2={ax} y2={132} />
        <Pipe id={id} x1={ax - 3.5} y1={132} x2={dx + 3.5} y2={132} />
        <Pipe id={id} x1={dx} y1={132} x2={dx} y2={y + 22} />
        <rect x={ax - 10} y={y + 46} width={20} height={6} fill={stip(id, "dense")} {...ink} />
        {/* attribute → mediator → test scores → decision */}
        <Pipe id={id} x1={ax + 17} y1={y + 16} x2={mx - 17} y2={y + 16} red={red} />
        <Pipe id={id} x1={mx + 17} y1={y + 16} x2={tx - 17} y2={y + 16} red={red} />
        <Pipe id={id} x1={tx + 17} y1={y + 16} x2={dx - 16} y2={y + 16} red={red} />
        {counterfactual ? (
          <g>
            <path d={`M${x0 + 80} ${y + 8}L${x0 + 96} ${y + 24}V${y + 8}L${x0 + 80} ${y + 24}Z`} fill={PAT.paper} {...ink} />
            <line x1={x0 + 88} y1={y + 16} x2={x0 + 88} y2={y} {...ink} />
            <ellipse cx={x0 + 88} cy={y - 2} rx={10} ry={3} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
          </g>
        ) : null}
        <Tank id={id} cx={ax} top={y} />
        <Tank id={id} cx={mx} top={y} red={red} />
        <Tank id={id} cx={tx} top={y} red={red} />
        <ObliqueBox id={id} x={dx - 16} y={y + 2} w={32} h={20} dx={8} dy={5} stroke={red ? PAT.signal : PAT.ink} />
        {[
          [ax, ["Protected", "attribute"]],
          [mx, ["School", "quality"]],
          [tx, ["Test", "scores"]],
          [dx + 4, ["Decision"]],
        ].map(([x, lines]) =>
          (lines as string[]).map((l, k) => (
            <PatentKey key={l} x={x as number} y={36 + k * 13 - ((lines as string[]).length - 1) * 13 + 13} size={9.5}>
              {l}
            </PatentKey>
          )),
        )}
      </g>
    );
  };
  return (
    <Frame
      width={800}
      height={176}
      label="Patent drawing in two figures of pipework: a tank for the protected attribute feeds a tank for neighborhood school quality, which feeds a tank for test scores, which feeds the decision. A second, direct pipe from the protected attribute to the decision is blanked off near the attribute. The first figure, fairness through unawareness: with only the direct pipe blanked off, the attribute's flow still runs in red through school quality and test scores to the decision. The second figure, counterfactual fairness: a closed valve on the pipe from the protected attribute to school quality removes its effect, and the remaining pipes to the decision carry no red."
    >
      <PatentDefs id={id} />
      {fig(14, false)}
      <line x1={400} y1={14} x2={400} y2={148} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />
      {fig(414, true)}
      <FigureName x={200} y={168} size={12}>
        fairness through unawareness
      </FigureName>
      <FigureName x={600} y={168} size={12}>
        counterfactual fairness
      </FigureName>
    </Frame>
  );
}

/**
 * The impossibility theorem as three beam levels. Each beam rests on a Group
 * A post and a Group B post as tall as that group's rate. A spirit level on
 * the beam shows whether the two are equal. Positive predictive value and
 * true positive rate are held equal. The false positive rate then follows
 * from each group's base rate. The slider sets Group B's base rate (Group A
 * stays at 50%), and the toggle swaps in a perfect predictor.
 */
export function ImpossibilityLevels() {
  const [baseB, setBaseB] = useState(30);
  const [predictor, setPredictor] = useState<"imperfect" | "perfect">("imperfect");
  const id = "w2-imposs";
  const perfect = predictor === "perfect";
  const ppv = perfect ? 1 : 0.75;
  const tpr = perfect ? 1 : 0.8;
  const fpr = (p: number) => (perfect ? 0 : (p / (1 - p)) * ((1 - ppv) / ppv) * tpr);
  const pA = 0.5;
  const pB = baseB / 100;
  const rows = [
    { label: "P(Y = 1 | D = 1)", a: ppv, b: ppv },
    { label: "P(D = 1 | Y = 1)", a: tpr, b: tpr },
    { label: "P(D = 1 | Y = 0)", a: fpr(pA), b: fpr(pB) },
  ];
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  const ground = 150;
  const H = (v: number) => r2(14 + v * 80);
  return (
    <div>
      <Frame
        width={800}
        height={196}
        label={`Patent drawing: Group A's base rate is 50% and Group B's is ${baseB}%, shown as trays of ten applicants with those who would repay stippled. Three beams each rest on a Group A post and a Group B post as tall as that group's rate, with a spirit level on top. With ${perfect ? "a perfect predictor" : "an imperfect predictor"}, positive predictive value reads ${pct(rows[0].a)} for both groups and true positive rate ${pct(rows[1].a)} for both. The false positive rate reads ${pct(rows[2].a)} for Group A and ${pct(rows[2].b)} for Group B${Math.round(rows[2].a * 100) !== Math.round(rows[2].b * 100) ? ", so that beam tilts and its level is red" : ", so every beam is level"}.`}
      >
        <PatentDefs id={id} />

        {/* base rates: ten applicants per group, those who would repay dense */}
        {[
          { y: 58, p: pA, name: "Group A" },
          { y: 128, p: pB, name: "Group B" },
        ].map((g) => (
          <g key={g.name}>
            <PatentKey x={18} y={g.y - 30} anchor="start" size={10}>
              {g.name}
            </PatentKey>
            <Num x={196} y={g.y - 29} size={13} anchor="end">
              {`P(Y = 1) ${pct(g.p)}`}
            </Num>
            {Array.from({ length: 10 }, (_, i) => (
              <ellipse key={i} cx={28 + i * 17} cy={g.y} rx={7} ry={4.5} fill={i < Math.round(g.p * 10) ? stip(id, "dense") : PAT.paper} {...ink} />
            ))}
          </g>
        ))}
        <line x1={222} y1={14} x2={222} y2={176} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

        {/* three beams */}
        {rows.map((r, i) => {
          const x0 = 248 + i * 186;
          const xa = x0 + 22;
          const xb = x0 + 146;
          const ha = H(r.a);
          const hb = H(r.b);
          const tilted = Math.round(r.a * 100) !== Math.round(r.b * 100);
          const c = tilted ? PAT.signal : PAT.ink;
          const ya = ground - ha;
          const yb = ground - hb;
          const mx = (xa + xb) / 2;
          const my = (ya + yb) / 2;
          const ang = (Math.atan2(yb - ya, xb - xa) * 180) / Math.PI;
          const bubble = Math.max(-16, Math.min(16, (ya - yb) * 1.2));
          return (
            <g key={r.label}>
              <line x1={x0} y1={ground} x2={x0 + 168} y2={ground} {...hair} />
              <ObliqueBox id={id} x={xa - 6} y={ya} w={12} h={ha} dx={6} dy={4} />
              <ObliqueBox id={id} x={xb - 6} y={yb} w={12} h={hb} dx={6} dy={4} />
              <Num x={xa} y={ground + 16} size={12}>
                {pct(r.a)}
              </Num>
              <Num x={xb} y={ground + 16} size={12} fill={tilted ? PAT.signal : PAT.ink}>
                {pct(r.b)}
              </Num>
              <g transform={`rotate(${r2(ang)} ${r2(mx)} ${r2(my)})`}>
                <rect x={r2(xa - 12)} y={r2(my - 8)} width={r2(xb - xa + 24)} height={6} fill={PAT.paper} stroke={c} strokeWidth={LINE.bold} />
                <rect x={r2(mx - 24)} y={r2(my - 20)} width={48} height={12} rx={6} fill={PAT.paper} stroke={c} strokeWidth={LINE.outline} />
                <line x1={r2(mx - 6)} y1={r2(my - 20)} x2={r2(mx - 6)} y2={r2(my - 8)} stroke={c} strokeWidth={LINE.hair} />
                <line x1={r2(mx + 6)} y1={r2(my - 20)} x2={r2(mx + 6)} y2={r2(my - 8)} stroke={c} strokeWidth={LINE.hair} />
                <ellipse cx={r2(mx + bubble)} cy={r2(my - 14)} rx={5} ry={3.4} fill={tilted ? stip(id, "signal") : stip(id, "light")} stroke={c} strokeWidth={LINE.outline} />
              </g>
              <Num x={x0 + 84} y={188} size={12.5}>
                {r.label}
              </Num>
            </g>
          );
        })}
      </Frame>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Slider label="Group B base rate" value={baseB} min={20} max={50} step={5} onChange={setBaseB} formatValue={(v) => `${v}%`} />
        <Segmented
          label="Predictor"
          options={[
            { id: "imperfect", label: "Imperfect predictor" },
            { id: "perfect", label: "Perfect predictor" },
          ]}
          value={predictor}
          onChange={setPredictor}
        />
      </div>
    </div>
  );
}

/**
 * Delivery skew. The first figure, the ad auction: one budget buys twenty impressions
 * for a STEM careers ad, split between young women and men. The slider sets
 * what retail bidding makes a click from young women cost. A budget-
 * constrained algorithm buys the cheaper clicks, so young women's row empties
 * (red). The second figure, relevance steering: a luxury rental listing goes to the
 * higher-income house, a subprime credit ad to the vulnerable neighborhood
 * (red).
 */
export function AdAuctionSkew() {
  const [cost, setCost] = useState(1.5);
  const id = "w2-auction";
  const share = 1 / (1 + cost * cost);
  const women = Math.round(20 * share);
  const men = 20 - women;
  const lanes = [
    { y: 52, key: "Young women", n: women, price: `$${cost.toFixed(2)}`, red: women < 10 },
    { y: 134, key: "Men", n: men, price: "$1.00", red: false },
  ];
  return (
    <div>
      <Frame
        width={800}
        height={200}
        label={`Patent drawing in two figures. The first figure, the ad auction: one budget, a stack of coins, buys twenty impressions of a STEM careers ad. A click from young women costs ${lanes[0].price} and a click from men $1.00. The budget-constrained algorithm serves ${women} impressions to young women and ${men} to men${women < 10 ? ", leaving young women's empty slots in red" : ""}. The second figure, relevance steering: a luxury rental listing runs to a large higher-income house, and a subprime credit ad runs, in red, to two small houses in a vulnerable neighborhood.`}
      >
        <PatentDefs id={id} />

        {/* The first figure: one budget, two prices */}
        <ObliqueBox id={id} x={22} y={118} w={56} h={10} dx={10} dy={6} />
        <Coins id={id} cx={52} y={116} n={9} rx={16} ry={5} h={6} />
        {lanes.map((l) => (
          <g key={l.key}>
            <path d={`M70 ${l.y < 100 ? 74 : 104}C96 ${l.y < 100 ? 74 : 104} 96 ${l.y + 16} 118 ${l.y + 16}`} fill="none" {...hair} />
            <Tag cx={154} cy={l.y + 16} text={l.price} w={58} size={14} />
            <PatentKey x={206} y={l.y} anchor="start" size={10} fill={l.red ? PAT.signal : PAT.ink}>
              {l.key}
            </PatentKey>
            {Array.from({ length: 20 }, (_, i) => {
              const on = i < l.n;
              return (
                <rect
                  key={i}
                  x={206 + i * 13.5}
                  y={l.y + 10}
                  width={10}
                  height={13}
                  fill={on ? stip(id, "dense") : PAT.paper}
                  stroke={!on && l.red ? PAT.signal : PAT.ink}
                  strokeWidth={LINE.hair}
                  strokeDasharray={on ? undefined : "2 1.5"}
                />
              );
            })}
            <Num x={482} y={l.y + 22} size={14} anchor="start" fill={l.red ? PAT.signal : PAT.ink}>
              {l.n}
            </Num>
          </g>
        ))}

        <line x1={514} y1={14} x2={514} y2={170} {...hair} strokeWidth={0.5} strokeDasharray={CENTRE_DASH} />

        {/* The second figure: listings steered by click probability */}
        {[
          { y: 34, text: "Luxury rental", red: false },
          { y: 112, text: "Subprime credit", red: true },
        ].map((a) => (
          <g key={a.text}>
            <ObliqueBox id={id} x={528} y={a.y} w={134} h={34} dx={8} dy={5} stroke={a.red ? PAT.signal : PAT.ink} />
            <PatentKey x={595} y={a.y + 21} size={9.5} fill={a.red ? PAT.signal : PAT.ink}>
              {a.text}
            </PatentKey>
            <line x1={672} y1={a.y + 17} x2={688} y2={a.y + 17} stroke={a.red ? PAT.signal : PAT.ink} strokeWidth={a.red ? LINE.bold : LINE.outline} />
            <path d={headAlongPath(692, a.y + 17, 1, 0, 7)} fill="none" stroke={a.red ? PAT.signal : PAT.ink} strokeWidth={a.red ? LINE.bold : LINE.outline} />
          </g>
        ))}
        <House id={id} x={704} y={74} w={58} h={36} dx={12} dy={7} roof={20} />
        {[700, 744].map((x) => (
          <House key={x} id={id} x={x} y={152} w={34} h={34} dx={6} dy={4} roof={12} />
        ))}

        <FigureName x={260} y={192} size={12}>
          the ad auction
        </FigureName>
        <FigureName x={656} y={192} size={12}>
          click probability
        </FigureName>
      </Frame>
      <Slider label="Cost per click, young women" value={cost} min={1} max={3} step={0.25} onChange={setCost} formatValue={(v) => `$${v.toFixed(2)}`} />
    </div>
  );
}

/**
 * The accuracy-fairness frontier. The slider tightens the fairness
 * constraint and moves the operating point along the curve, and the
 * accuracy given up is dimensioned in red.
 */
export function MitigationFrontier() {
  const [k, setK] = useState(50);
  const id = "w2-frontier";
  const lam = k / 100;
  const acc = (x: number) => 0.9 - 0.08 * Math.pow(x, 2.5);
  const X = (x: number) => r2(110 + x * 640);
  const Y = (a: number) => r2(160 - ((a - 0.8) / 0.12) * 130);
  const curve = Array.from({ length: 41 }, (_, i) => {
    const x = i / 40;
    return `${i === 0 ? "M" : "L"}${X(x)} ${Y(acc(x))}`;
  }).join("");
  const a = acc(lam);
  const disparity = 0.3 * (1 - lam);
  const lost = Y(a) - Y(0.9);
  return (
    <div>
      <Frame
        width={800}
        height={190}
        label={`Patent drawing of the accuracy-fairness frontier: a curve of accuracy against fairness falls slowly and then steeply as fairness rises. With the fairness constraint at ${k}%, the operating point sits at ${(a * 100).toFixed(1)}% accuracy with a disparity of ${disparity.toFixed(2)}${lost > 0.5 ? ", and the accuracy given up is dimensioned in red" : ""}.`}
      >
        <PatentDefs id={id} />
        <path d="M110 18V160H772" fill="none" {...ink} />
        <PatentKey x={772} y={178} anchor="end" size={12}>
          Fairness
        </PatentKey>
        <text x={92} y={89} textAnchor="middle" fontFamily="var(--font-body)" fontSize={12} fill={PAT.ink} transform="rotate(-90 92 89)">
          Accuracy
        </text>
        <path d={curve} fill="none" {...ink} strokeWidth={LINE.bold} />
        <line x1={X(0)} y1={Y(0.9)} x2={X(lam)} y2={Y(0.9)} {...hair} strokeDasharray="4 3" />
        {lost > 0.5 ? (
          <g>
            <line x1={r2(X(lam) + 14)} y1={Y(0.9)} x2={r2(X(lam) + 14)} y2={Y(a)} stroke={PAT.signal} strokeWidth={LINE.outline} />
            <path d={`M${r2(X(lam) + 9)} ${Y(0.9)}H${r2(X(lam) + 19)}M${r2(X(lam) + 9)} ${Y(a)}H${r2(X(lam) + 19)}`} fill="none" stroke={PAT.signal} strokeWidth={LINE.outline} />
          </g>
        ) : null}
        <circle cx={X(lam)} cy={Y(a)} r={6} fill={PAT.paper} {...ink} strokeWidth={LINE.bold} />
        <Num x={134} y={120} size={17} anchor="start">
          {`${(a * 100).toFixed(1)}%`}
        </Num>
        <PatentKey x={204} y={120} anchor="start" size={12}>
          Accuracy
        </PatentKey>
        <Num x={134} y={146} size={17} anchor="start">
          {disparity.toFixed(2)}
        </Num>
        <PatentKey x={204} y={146} anchor="start" size={12}>
          Disparity
        </PatentKey>
      </Frame>
      <Slider label="Fairness constraint" value={k} min={0} max={100} step={10} onChange={setK} formatValue={(v) => `${v}%`} />
    </div>
  );
}
