/* ==========================================================================
   Week 06 plates: Data Preparation and Descriptive Analysis.
   Built on ../_visuals/kit and ../_visuals/objects. Every plate follows the
   sentence it illustrates on the slide.
   ========================================================================== */

import React, { useState } from "react";
import {
  Frame,
  Key,
  Note,
  Display,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  COUNTER,
  PAPER,
  PAPER3,
  SIGNAL_TINT,
  COUNTER_TINT,
  head,
  r2,
  Slider,
  Segmented,
  Toggles,
} from "../_visuals/kit";
import { Person1, AiMark1, RatingRow1, Tick1 } from "../_visuals/objects";


/* --------------------------------------------------------------------------
   Coding and the Data Matrix
   -------------------------------------------------------------------------- */

/** Five coded respondents: Q1 rating, then one 0/1 variable per option of Q2. */
const MATRIX_ROWS = [
  [1, 5, 1, 1, 0],
  [2, 2, 0, 1, 1],
  [3, 4, 1, 0, 1],
  [4, 3, 1, 1, 1],
  [5, 4, 0, 0, 1],
];
const MATRIX_COLS = [
  { key: "ID", w: 40 },
  { key: "Q1", w: 48 },
  { key: "Q2_WEB", w: 64 },
  { key: "Q2_APP", w: 64 },
  { key: "Q2_STORE", w: 72 },
];

/**
 * Coding and the data matrix: respondent 3's questionnaire, with a rating
 * coded 1 to 5 and a multiple-response question whose options become three
 * 0/1 variables, entered as the third row of the matrix. Each row is a
 * respondent; each column is a variable.
 */
export function CodedMatrix() {
  const fx = 10;
  const fy = 12;
  const fw = 214;
  const fh = 222;
  const options = [
    { label: "Website", on: true },
    { label: "App", on: false },
    { label: "Store", on: true },
  ];
  const mx0 = 270;
  const colX = MATRIX_COLS.reduce<number[]>((acc, c, i) => [...acc, i ? acc[i - 1] + MATRIX_COLS[i - 1].w : mx0], []);
  const mx1 = colX[colX.length - 1] + MATRIX_COLS[MATRIX_COLS.length - 1].w;
  const hy = 60;
  const rh = 30;
  const rowY = (i: number) => hy + 10 + i * rh;
  const me = 2;
  const meY = r2(rowY(me) + rh / 2);

  return (
    <Frame
      width={560}
      height={252}
      label="Respondent 3's questionnaire: a rating of 4 on a five-point scale, and a multiple-response question with Website and Store selected and App not selected. In the data matrix, row 3 reads ID 3, Q1 4, Q2_WEB 1, Q2_APP 0, Q2_STORE 1; each row is a respondent and each column a variable"
    >
      {/* the questionnaire */}
      <rect x={fx} y={fy} width={fw} height={fh} fill={PAPER} stroke={INK} strokeWidth={1.25} />
      <Key x={fx + 14} y={fy + 24} fill={INK} size={10}>Q1</Key>
      <line x1={fx + 40} y1={fy + 20} x2={fx + 170} y2={fy + 20} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
      <RatingRow1 x={fx + 14} y={fy + 36} n={5} pick={4} box={26} gap={6} />
      <Display x={fx + fw - 16} y={fy + 57} anchor="end" fill={SIGNAL} size={20}>4</Display>
      <Key x={fx + 14} y={fy + 98} fill={INK} size={10}>Q2</Key>
      <line x1={fx + 40} y1={fy + 94} x2={fx + 186} y2={fy + 94} stroke={RULE2} strokeWidth={4} strokeLinecap="round" />
      {options.map((o, i) => {
        const y = fy + 112 + i * 30;
        return (
          <g key={o.label}>
            <rect x={fx + 14} y={y} width={18} height={18} fill={o.on ? INK : PAPER} stroke={INK} strokeWidth={1.25} />
            {o.on ? <Tick1 cx={fx + 23} cy={y + 9} s={5} /> : null}
            <Note x={fx + 42} y={y + 14} size={13} fill={INK2}>{o.label}</Note>
            <Display x={fx + fw - 16} y={y + 16} anchor="end" fill={SIGNAL} size={20}>{o.on ? "1" : "0"}</Display>
          </g>
        );
      })}

      {/* respondent 3 enters the matrix as row 3 */}
      <line x1={fx + fw + 6} y1={meY} x2={mx0 - 8} y2={meY} stroke={SIGNAL} strokeWidth={1.5} />
      <path d={head.right(mx0 - 8, meY, 7)} fill="none" stroke={SIGNAL} strokeWidth={1.5} />

      {/* the data matrix */}
      <Key x={mx0} y={20} fill={INK3} size={9.5}>{"VARIABLES \u2192"}</Key>
      {MATRIX_COLS.map((c, j) => (
        <Key key={c.key} x={r2(colX[j] + c.w / 2)} y={hy} anchor="middle" fill={INK} size={9}>{c.key}</Key>
      ))}
      <line x1={mx0} y1={hy + 8} x2={mx1} y2={hy + 8} stroke={INK} strokeWidth={1.25} />
      <rect x={mx0} y={rowY(me)} width={mx1 - mx0} height={rh} fill={SIGNAL_TINT} />
      {MATRIX_ROWS.map((row, i) => (
        <g key={i}>
          {row.map((v, j) => (
            <text
              key={j}
              x={r2(colX[j] + MATRIX_COLS[j].w / 2)}
              y={r2(rowY(i) + rh / 2 + 5)}
              textAnchor="middle"
              fontFamily="var(--font-label)"
              fontSize={14}
              fontWeight={i === me ? 700 : 400}
              fill={i === me ? SIGNAL : j === 0 ? INK3 : INK2}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {v}
            </text>
          ))}
          <line x1={mx0} y1={rowY(i) + rh} x2={mx1} y2={rowY(i) + rh} stroke={RULE} strokeWidth={1} />
        </g>
      ))}
      {colX.slice(1).map((x) => (
        <line key={x} x1={x} y1={hy - 14} x2={x} y2={rowY(4) + rh} stroke={RULE} strokeWidth={1} />
      ))}
      <Key x={mx0} y={rowY(4) + rh + 22} fill={INK3} size={9.5}>{"\u2193 RESPONDENTS"}</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Data Cleaning
   -------------------------------------------------------------------------- */

/** Satisfaction (1–5), used support (0/1), support rating (1–5), monthly spending. */
const CLEAN_ROWS = [
  [1, 4, 1, 4, 32],
  [2, 7, 1, 3, 18],
  [3, 5, 1, 5, 25],
  [4, 2, 0, 4, 12],
  [5, 3, 1, 2, 90000],
  [6, 4, 1, 4, 41],
];
const CLEAN_COLS = [
  { key: "ID", code: "", w: 70 },
  { key: "SATISFACTION", code: "CODES 1\u20135", w: 150 },
  { key: "USED SUPPORT", code: "0 NEVER \u00b7 1 YES", w: 160 },
  { key: "SUPPORT RATING", code: "CODES 1\u20135", w: 160 },
  { key: "MONTHLY SPENDING", code: "DOLLARS", w: 170 },
];
/** Flagged cells: [row, column]. */
const FLAGS = [
  { row: 1, cells: [1], key: "OUT-OF-RANGE VALUE" },
  { row: 3, cells: [2, 3], key: "LOGICAL INCONSISTENCY" },
  { row: 4, cells: [4], key: "EXTREME VALUE" },
];

/**
 * Data cleaning: six rows of a data matrix under their codebook entries.
 * A 7 where the codebook allows 1 to 5; a respondent who never used support
 * but rates it; and a monthly spending of 90,000 dollars among values in
 * the tens. Each error is marked in its row.
 */
export function CleaningMatrix() {
  const x0 = 20;
  const colX = CLEAN_COLS.reduce<number[]>((acc, c, i) => [...acc, i ? acc[i - 1] + CLEAN_COLS[i - 1].w : x0], []);
  const x1 = colX[colX.length - 1] + CLEAN_COLS[CLEAN_COLS.length - 1].w;
  const hy = 24;
  const cy = 44;
  const top = 56;
  const rh = 26;
  const rowY = (i: number) => top + i * rh;
  const cx = (j: number) => r2(colX[j] + CLEAN_COLS[j].w / 2);

  return (
    <Frame
      width={1000}
      height={top + CLEAN_ROWS.length * rh + 10}
      label="Six rows of a data matrix under the codebook's permitted codes. Respondent 2 has a satisfaction of 7 where the codes run from 1 to 5, an out-of-range value; respondent 4 reports never having used support but rates it 4, a logical inconsistency; respondent 5 reports monthly spending of 90,000 dollars while the others report 12 to 41, an extreme value"
    >
      {CLEAN_COLS.map((c, j) => (
        <g key={c.key}>
          <Key x={cx(j)} y={hy} anchor="middle" fill={INK} size={10}>{c.key}</Key>
          {c.code ? <Key x={cx(j)} y={cy} anchor="middle" fill={INK3} size={9}>{c.code}</Key> : null}
        </g>
      ))}
      <line x1={x0} y1={top - 4} x2={x1} y2={top - 4} stroke={INK} strokeWidth={1.25} />
      {CLEAN_ROWS.map((row, i) => {
        const flag = FLAGS.find((f) => f.row === i);
        return (
          <g key={i}>
            {flag
              ? flag.cells.map((j) => (
                  <rect key={j} x={colX[j] + 6} y={rowY(i) + 2} width={CLEAN_COLS[j].w - 12} height={rh - 4} fill={COUNTER_TINT} stroke={COUNTER} strokeWidth={1.5} />
                ))
              : null}
            {row.map((v, j) => {
              const bad = flag?.cells.includes(j);
              return (
                <text
                  key={j}
                  x={cx(j)}
                  y={r2(rowY(i) + rh / 2 + 5)}
                  textAnchor="middle"
                  fontFamily="var(--font-label)"
                  fontSize={14}
                  fontWeight={bad ? 700 : 400}
                  fill={bad ? COUNTER : j === 0 ? INK3 : INK2}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {v.toLocaleString("en-US")}
                </text>
              );
            })}
            {flag ? (
              <Key x={x1 + 26} y={r2(rowY(i) + rh / 2 + 4)} fill={COUNTER} size={10.5} weight={700}>{flag.key}</Key>
            ) : null}
            {flag ? (
              <path d={`M${x1 + 18} ${r2(rowY(i) + rh / 2)}H${x1 + 4}${head.left(x1 + 4, r2(rowY(i) + rh / 2), 6)}`} fill="none" stroke={COUNTER} strokeWidth={1.5} />
            ) : null}
            <line x1={x0} y1={rowY(i) + rh} x2={x1} y2={rowY(i) + rh} stroke={RULE} strokeWidth={1} />
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Missing Values
   -------------------------------------------------------------------------- */

/** Twenty respondents: income ($ thousands), age, satisfaction (1–5), visits; null = no answer. */
const SURVEY: (number | null)[][] = [
  [42, 31, 4, 6],
  [55, 45, 3, 4],
  [38, 26, 5, 9],
  [null, 58, 4, 2],
  [61, 49, 2, 3],
  [47, null, 4, 5],
  [72, 52, 3, 4],
  [null, 61, null, 1],
  [35, 24, 5, 10],
  [58, 44, null, 5],
  [44, 33, 4, null],
  [null, 63, 3, 2],
  [66, 50, 2, 3],
  [40, 29, 4, 8],
  [52, null, 3, 6],
  [null, 55, 4, 3],
  [49, 38, null, 5],
  [70, 56, 3, 2],
  [null, 47, 5, 4],
  [33, 23, 4, null],
];
const SURVEY_VARS = ["INCOME", "AGE", "SATISF.", "VISITS"];
/** Estimates from the respondent's other answers: income from age, the others from income. */
const MODEL_ESTIMATE = (row: (number | null)[], j: number) => {
  const inc = row[0] ?? Math.round(1.25 * (row[1] as number) + 3);
  if (j === 0) return Math.round(1.25 * (row[1] as number) + 3);
  if (j === 1) return Math.round((inc - 3) / 1.25);
  if (j === 2) return Math.max(1, Math.min(5, Math.round(6.3 - inc / 17)));
  return Math.max(0, Math.round(12.5 - inc / 7));
};
type Treatment = "casewise" | "pairwise" | "mean" | "model";
const TREATMENTS: { id: Treatment; label: string }[] = [
  { id: "casewise", label: "Casewise" },
  { id: "pairwise", label: "Pairwise" },
  { id: "mean", label: "Mean substitution" },
  { id: "model", label: "Imputation" },
];
const colMean = (j: number) => {
  const v = SURVEY.map((r) => r[j]).filter((x): x is number => x !== null);
  return v.reduce((a, b) => a + b, 0) / v.length;
};
const describe = (v: number[]) => {
  const m = v.reduce((a, b) => a + b, 0) / v.length;
  const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1));
  return { n: v.length, m, sd };
};

/**
 * Missing values: twenty respondents, twelve blank cells. The student
 * chooses a treatment. Casewise deletion drops every row with a blank, so
 * each statistic rests on 9 respondents; pairwise deletion keeps a different
 * n in every column; mean substitution fills every blank in a column with
 * one value, piling income at its mean and narrowing its standard
 * deviation; imputation fills each blank with its own estimate.
 */
export function MissingTreatments() {
  const [t, setT] = useState<Treatment>("casewise");
  const complete = SURVEY.map((r) => r.every((v) => v !== null));
  const cell = (i: number, j: number): { v: number | null; filled: boolean } => {
    const v = SURVEY[i][j];
    if (v !== null) return { v, filled: false };
    if (t === "mean") return { v: Math.round(colMean(j) * (j === 2 ? 10 : 1)) / (j === 2 ? 10 : 1), filled: true };
    if (t === "model") return { v: MODEL_ESTIMATE(SURVEY[i], j), filled: true };
    return { v: null, filled: false };
  };
  const used = (i: number, j: number) => (t === "casewise" ? complete[i] : cell(i, j).v !== null);
  const nOf = (j: number) => SURVEY.filter((_, i) => used(i, j)).length;
  const incomes = SURVEY.map((_, i) => ({ ...cell(i, 0), i })).filter((c) => used(c.i, 0));
  const inc = describe(incomes.map((c) => c.v as number));

  // the matrix
  const mx = 14;
  const cw = 54;
  const hy = 22;
  const top = 32;
  const rh = 12.5;
  const rowY = (i: number) => r2(top + i * rh);
  const foot = r2(top + SURVEY.length * rh + 18);

  // the income strip
  const sx0 = 268;
  const sx1 = 540;
  const X = (v: number) => r2(sx0 + ((v - 20) / 100) * (sx1 - sx0));
  const base = 250;
  const step = 13;
  const stacks = new Map<number, number>();
  const dots = incomes
    .slice()
    .sort((a, b) => Number(a.filled) - Number(b.filled))
    .map((c) => {
      const bin = Math.round((c.v as number) / 4) * 4;
      const level = stacks.get(bin) ?? 0;
      stacks.set(bin, level + 1);
      return { x: X(bin), y: r2(base - 8 - level * step), filled: c.filled };
    });
  const tallest = Math.max(...Array.from(stacks.values()));
  const bracketY = r2(base - 8 - tallest * step - 4);

  return (
    <>
      <Frame
        width={560}
        height={foot + 10}
        label={`Twenty respondents answer four questions, with twelve answers missing. Under ${TREATMENTS.find((x) => x.id === t)!.label.toLowerCase()}, the columns rest on ${[0, 1, 2, 3].map(nOf).join(", ")} respondents, and income has a mean of ${Math.round(inc.m)} thousand dollars and a standard deviation of ${inc.sd.toFixed(1)}, from ${inc.n} values`}
      >
        {SURVEY_VARS.map((v, j) => (
          <Key key={v} x={r2(mx + j * cw + cw / 2)} y={hy} anchor="middle" fill={j === 0 ? INK : INK3} size={8.5}>{v}</Key>
        ))}
        {SURVEY.map((row, i) => {
          const dropped = t === "casewise" && !complete[i];
          return (
            <g key={i} opacity={dropped ? 0.3 : 1}>
              {row.map((_, j) => {
                const c = cell(i, j);
                const x = mx + j * cw;
                return (
                  <g key={j}>
                    {c.v === null ? null : (
                      <text
                        x={r2(x + cw / 2)}
                        y={r2(rowY(i) + rh - 2.5)}
                        textAnchor="middle"
                        fontFamily="var(--font-label)"
                        fontSize={10}
                        fontWeight={c.filled ? 700 : 400}
                        fill={c.filled ? SIGNAL : INK2}
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {c.v}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* blank answers stay visible, including in the rows they cost */}
        {SURVEY.flatMap((row, i) =>
          row.map((v, j) =>
            v === null && cell(i, j).v === null ? (
              <rect key={`${i}-${j}`} x={mx + j * cw + 9} y={rowY(i) + 1.5} width={cw - 18} height={rh - 3} fill={PAPER3} stroke={INK3} strokeWidth={1} strokeDasharray="2 2" />
            ) : null,
          ),
        )}
        <line x1={mx} y1={top - 4} x2={mx + 4 * cw} y2={top - 4} stroke={INK} strokeWidth={1.25} />
        <line x1={mx} y1={foot - 13} x2={mx + 4 * cw} y2={foot - 13} stroke={INK} strokeWidth={1.25} />
        {[0, 1, 2, 3].map((j) => (
          <Display key={j} x={r2(mx + j * cw + cw / 2)} y={foot + 2} anchor="middle" fill={SIGNAL} size={15}>{nOf(j)}</Display>
        ))}
        <Key x={mx + 4 * cw + 8} y={foot - 1} fill={SIGNAL} size={10}>N</Key>

        {/* income, as each treatment leaves it */}
        <Key x={sx0} y={hy} fill={INK} size={9.5}>INCOME, $ THOUSANDS</Key>
        {[
          { k: "N", v: String(inc.n), x: sx0 },
          { k: "MEAN", v: String(Math.round(inc.m)), x: sx0 + 90 },
          { k: "SD", v: inc.sd.toFixed(1), x: sx0 + 180 },
        ].map((r) => (
          <g key={r.k}>
            <Key x={r.x} y={52} fill={INK3} size={9}>{r.k}</Key>
            <Display x={r.x} y={84} fill={r.k === "SD" ? SIGNAL : INK} size={30}>{r.v}</Display>
          </g>
        ))}
        <path d={`M${X(inc.m - inc.sd)} ${bracketY + 5}V${bracketY}H${X(inc.m + inc.sd)}V${bracketY + 5}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
        <Key x={X(inc.m)} y={bracketY - 7} anchor="middle" fill={SIGNAL} size={9}>{"\u00b11 SD"}</Key>
        {dots.map((d, k) => (
          <circle key={k} cx={d.x} cy={d.y} r={5.75} fill={d.filled ? SIGNAL : INK3} fillOpacity={d.filled ? 1 : 0.6} />
        ))}
        <path d={`M${X(inc.m)} ${base + 3}l-5 8h10z`} fill={INK} />
        <line x1={sx0 - 4} y1={base} x2={sx1 + 10} y2={base} stroke={INK} strokeWidth={1.25} />
        <path d={head.right(sx1 + 10, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
        {[20, 40, 60, 80, 100, 120].map((v) => (
          <Key key={v} x={X(v)} y={base + 26} anchor="middle" fill={INK3} size={9}>{v}</Key>
        ))}
      </Frame>
      <Segmented label="Treatment" options={TREATMENTS} value={t} onChange={setT} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Weighting
   -------------------------------------------------------------------------- */

const POP_WOMEN = 0.51;
const WEIGHT_N = 500;
const moe = (n: number) => 196 * Math.sqrt(0.25 / n);

/**
 * Weighting: women are 51% of the population. The student sets their share
 * of a sample of 500. Twenty respondents stand for the sample, each drawn at
 * the height of its weight, so under-represented women grow and men shrink;
 * the margin of error, computed on the weighted sample, widens slowly near
 * 51% and quickly as the sample drifts far from it.
 */
export function WeightedSample() {
  const [pct, setPct] = useState(40);
  const share = pct / 100;
  const wW = POP_WOMEN / share;
  const wM = (1 - POP_WOMEN) / (1 - share);
  const meanSq = share * wW ** 2 + (1 - share) * wM ** 2;
  const nEff = WEIGHT_N / meanSq;
  const e0 = moe(WEIGHT_N);
  const e = moe(nEff);
  const women = Math.round(share * 20);

  const bx0 = 120;
  const bx1 = 540;
  const B = (v: number) => r2(bx0 + v * (bx1 - bx0));
  const bars = [
    { key: "POPULATION", y: 18, v: POP_WOMEN },
    { key: `SAMPLE OF ${WEIGHT_N}`, y: 50, v: share },
  ];

  const base = 214;
  const glyph = 0.9;
  const pad = 5;
  const sizes = Array.from({ length: 20 }, (_, i) => glyph * (i < women ? wW : wM));
  const total = sizes.reduce((a, k) => a + 20 * k + pad, -pad);
  let run = 280 - total / 2;
  const people = sizes.map((k, i) => {
    const x = r2(run + 10 * k);
    run += 20 * k + pad;
    return { x, k: r2(k), isW: i < women };
  });

  const cx = 390;
  const unit = 18;
  const ey = 262;

  return (
    <>
      <Frame
        width={560}
        height={290}
        label={`Women are 51 percent of the population and ${pct} percent of a sample of 500. Each woman receives a weight of ${wW.toFixed(2)} and each man ${wM.toFixed(2)}, drawn as the heights of twenty respondents. The margin of error of the weighted estimate is plus or minus ${e.toFixed(1)} points, against ${e0.toFixed(1)} without weighting`}
      >
        {bars.map((b) => (
          <g key={b.key}>
            <Key x={16} y={b.y + 15} fill={INK} size={9.5}>{b.key}</Key>
            <rect x={bx0} y={b.y + 3} width={r2(B(b.v) - bx0)} height={16} fill={COUNTER} />
            <rect x={B(b.v)} y={b.y + 3} width={r2(bx1 - B(b.v))} height={16} fill={PAPER} stroke={INK3} strokeWidth={1} />
            {B(b.v) - bx0 > 96 ? (
              <Key x={bx0 + 6} y={b.y + 15} fill={PAPER} size={9.5} weight={700}>{`${Math.round(b.v * 100)}% WOMEN`}</Key>
            ) : (
              <Key x={r2(B(b.v) + 6)} y={b.y + 15} fill={COUNTER} size={9.5} weight={700}>{`${Math.round(b.v * 100)}% WOMEN`}</Key>
            )}
          </g>
        ))}
        <line x1={B(POP_WOMEN)} y1={16} x2={B(POP_WOMEN)} y2={74} stroke={INK} strokeWidth={1.25} strokeDasharray="3 3" />

        {/* twenty respondents, each at the height of its weight */}
        {people.map((p, i) => (
          <Person1 key={i} x={p.x} y={base} k={p.k} stroke={p.isW ? COUNTER : INK} fill={p.isW ? COUNTER : PAPER} width={1.25} />
        ))}
        <line x1={16} y1={base + 1} x2={544} y2={base + 1} stroke={INK3} strokeWidth={1} />
        {women > 0 ? (
          <Key x={r2((people[0].x + people[women - 1].x) / 2)} y={r2(base - 34 * glyph * wW - 12)} anchor="middle" fill={COUNTER} size={10.5} weight={700}>
            {`WEIGHT ${wW.toFixed(2)}`}
          </Key>
        ) : null}
        {women < 20 ? (
          <Key x={r2((people[women].x + people[19].x) / 2)} y={r2(base - 34 * glyph * wM - 12)} anchor="middle" fill={INK} size={10.5} weight={700}>
            {`WEIGHT ${wM.toFixed(2)}`}
          </Key>
        ) : null}

        {/* the margin of error of the weighted estimate */}
        <Key x={16} y={ey + 4} fill={INK3} size={9.5}>MARGIN OF ERROR</Key>
        <path d={`M${r2(cx - e0 * unit)} ${ey - 10}V${ey}H${r2(cx + e0 * unit)}V${ey - 10}`} fill="none" stroke={INK3} strokeWidth={1.25} strokeDasharray="3 3" />
        <path d={`M${r2(cx - e * unit)} ${ey + 10}V${ey}H${r2(cx + e * unit)}V${ey + 10}`} fill="none" stroke={SIGNAL} strokeWidth={2} />
        <circle cx={cx} cy={ey} r={3.5} fill={SIGNAL} />
        <Key x={r2(cx - Math.max(e, e0) * unit - 10)} y={ey - 3} anchor="end" fill={INK3} size={9}>{`UNWEIGHTED \u00b1${e0.toFixed(1)}`}</Key>
        <Key x={r2(cx - Math.max(e, e0) * unit - 10)} y={ey + 12} anchor="end" fill={SIGNAL} size={10} weight={700}>{`WEIGHTED \u00b1${e.toFixed(1)}`}</Key>
      </Frame>
      <Slider label="Women in sample, %" value={pct} min={15} max={75} step={5} onChange={setPct} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Frequency Distributions
   -------------------------------------------------------------------------- */

/** Store visits in the past month by 200 customers; 10 did not answer. */
const VISITS = [
  { v: 0, n: 14 },
  { v: 1, n: 38 },
  { v: 2, n: 44 },
  { v: 3, n: 41 },
  { v: 4, n: 22 },
  { v: 5, n: 13 },
  { v: 6, n: 8 },
  { v: 7, n: 5 },
  { v: 8, n: 3 },
  { v: 20, n: 2 },
];
const VISITS_MISSING = 10;
const VISITS_TOTAL = 200;
const VISITS_VALID = VISITS_TOTAL - VISITS_MISSING;

/**
 * Frequency distribution: visits in the past month, as a table with
 * number, percentage, valid percentage and cumulative percentage, and as a
 * histogram. The row for three visits carries the cumulative 72.1%, and the
 * same visits are marked on the histogram, whose long right tail and single
 * bar at twenty visits show the skew and the extreme value.
 */
export function FrequencyTable() {
  const cols = [
    { key: "VISITS", x: 70 },
    { key: "N", x: 150 },
    { key: "%", x: 225 },
    { key: "VALID %", x: 315 },
    { key: "CUMULATIVE %", x: 425 },
  ];
  const tx0 = 20;
  const tx1 = 480;
  const hy = 22;
  const top = 32;
  const rh = 18.5;
  const rowY = (i: number) => r2(top + i * rh);
  const rows = VISITS.map((d, i) => {
    const cum = VISITS.slice(0, i + 1).reduce((a, x) => a + x.n, 0);
    return { ...d, pct: (100 * d.n) / VISITS_TOTAL, valid: (100 * d.n) / VISITS_VALID, cum: (100 * cum) / VISITS_VALID };
  });
  const mark = 3;
  const markRow = rows.find((r) => r.v === mark)!;
  const num = (x: number, y: number, t: string, strong = false, fill = INK2) => (
    <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-label)" fontSize={12.5} fontWeight={strong ? 700 : 400} fill={fill} style={{ fontVariantNumeric: "tabular-nums" }}>
      {t}
    </text>
  );

  // the histogram
  const hx0 = 560;
  const hx1 = 970;
  const X = (v: number) => r2(hx0 + ((v + 0.5) / 21.5) * (hx1 - hx0));
  const bw = r2(((hx1 - hx0) / 21.5) * 0.86);
  const base = 234;
  const H = (n: number) => r2((n / 44) * 178);

  return (
    <Frame
      width={1000}
      height={272}
      label={`Store visits in the past month by 200 customers, 10 of whom did not answer. The table gives the number, percentage, valid percentage and cumulative percentage for each value: ${markRow.cum.toFixed(1)} percent of those who answered visited three times or fewer. The histogram of the same data peaks at two visits, trails off to the right, and has an extreme value of two customers at twenty visits`}
    >
      {/* the table */}
      {cols.map((c) => (
        <Key key={c.key} x={c.x} y={hy} anchor="middle" fill={c.key === "CUMULATIVE %" ? SIGNAL : INK} size={9.5}>{c.key}</Key>
      ))}
      <line x1={tx0} y1={top - 3} x2={tx1} y2={top - 3} stroke={INK} strokeWidth={1.25} />
      {rows.map((r, i) => {
        const on = r.v === mark;
        const y = r2(rowY(i) + rh - 5);
        return (
          <g key={r.v}>
            {on ? <rect x={tx0} y={rowY(i)} width={tx1 - tx0} height={rh} fill={SIGNAL_TINT} /> : null}
            {num(cols[0].x, y, String(r.v), on, on ? SIGNAL : INK)}
            {num(cols[1].x, y, String(r.n))}
            {num(cols[2].x, y, r.pct.toFixed(1))}
            {num(cols[3].x, y, r.valid.toFixed(1))}
            {num(cols[4].x, y, r.cum.toFixed(1), on, on ? SIGNAL : INK2)}
          </g>
        );
      })}
      {(() => {
        const i = rows.length;
        const y = r2(rowY(i) + rh - 5);
        return (
          <g>
            <line x1={tx0} y1={rowY(i)} x2={tx1} y2={rowY(i)} stroke={RULE2} strokeWidth={1} />
            <text x={cols[0].x} y={y} textAnchor="middle" fontFamily="var(--font-body)" fontSize={12} fontStyle="italic" fill={INK3}>No answer</text>
            {num(cols[1].x, y, String(VISITS_MISSING), false, INK3)}
            {num(cols[2].x, y, ((100 * VISITS_MISSING) / VISITS_TOTAL).toFixed(1), false, INK3)}
            <line x1={tx0} y1={rowY(i + 1) + 2} x2={tx1} y2={rowY(i + 1) + 2} stroke={INK} strokeWidth={1.25} />
            {num(cols[1].x, r2(rowY(i + 1) + rh - 1), String(VISITS_TOTAL), true, INK)}
            {num(cols[2].x, r2(rowY(i + 1) + rh - 1), "100.0", true, INK)}
            {num(cols[3].x, r2(rowY(i + 1) + rh - 1), "100.0", true, INK)}
          </g>
        );
      })()}

      {/* the same data as a histogram */}
      {rows.map((r) => (
        <rect key={r.v} x={r2(X(r.v) - bw / 2)} y={r2(base - H(r.n))} width={bw} height={H(r.n)} fill={r.v <= mark ? SIGNAL : INK3} fillOpacity={r.v <= mark ? 1 : 0.55} />
      ))}
      <path d={`M${r2(X(0) - bw / 2)} ${r2(base - H(44) - 16)}V${r2(base - H(44) - 22)}H${r2(X(mark) + bw / 2)}V${r2(base - H(44) - 16)}`} fill="none" stroke={SIGNAL} strokeWidth={1.5} />
      <Key x={r2(X(mark) + bw / 2 + 8)} y={r2(base - H(44) - 17)} fill={SIGNAL} size={10} weight={700}>{`${markRow.cum.toFixed(1)}% AT 3 OR FEWER`}</Key>
      <Key x={X(20)} y={r2(base - H(2) - 10)} anchor="middle" fill={INK} size={9.5}>EXTREME VALUE</Key>
      <line x1={hx0 - 6} y1={base} x2={hx1 + 12} y2={base} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(hx1 + 12, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[0, 5, 10, 15, 20].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={base} x2={X(v)} y2={base + 4} stroke={INK} strokeWidth={1} />
          <Key x={X(v)} y={base + 18} anchor="middle" fill={INK3} size={9.5}>{v}</Key>
        </g>
      ))}
      <Key x={hx1 + 12} y={base + 34} anchor="end" fill={INK3} size={9.5}>VISITS IN THE PAST MONTH</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Measures of Central Tendency
   -------------------------------------------------------------------------- */

/** Monthly spending of seventeen ordinary customers, in dollars. */
const REGULAR_SPEND = [12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 35, 38, 40, 45, 50, 55, 60];
/** Three heavy spenders; with them the mean is 80 and the median 35. */
const HEAVY_SPEND = [280, 340, 420];
const SHIFT_MIN = -170;
const SHIFT_MAX = 140;

/**
 * Mean and median in a skewed distribution: twenty customers' monthly
 * spending. The student drags the three heavy spenders along the axis; the
 * mean follows them, from about $55 to $101, while the median stays at $35,
 * among the customers who spend ordinary amounts.
 */
export function MeanMedian() {
  const [d, setD] = useState(0);
  const heavy = HEAVY_SPEND.map((v) => v + d);
  const all = [...REGULAR_SPEND, ...heavy].sort((a, b) => a - b);
  const mean = all.reduce((a, b) => a + b, 0) / all.length;
  const median = (all[9] + all[10]) / 2;

  const x0 = 30;
  const x1 = 620;
  const X = (v: number) => r2(x0 + (v / 600) * (x1 - x0));
  const vInv = (x: number) => ((x - x0) / (x1 - x0)) * 600;
  const base = 156;
  const step = 10.5;
  const set = (v: number) => setD(Math.max(SHIFT_MIN, Math.min(SHIFT_MAX, Math.round(v / 5) * 5)));
  const drag = (ev: React.PointerEvent<SVGSVGElement>) => {
    const ctm = ev.currentTarget.getScreenCTM();
    if (!ctm) return;
    set(vInv(new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse()).x) - HEAVY_SPEND[1]);
  };
  const stacks = new Map<number, number>();
  const dot = (v: number) => {
    const bin = Math.floor(v / 10) * 10 + 5;
    const level = stacks.get(bin) ?? 0;
    stacks.set(bin, level + 1);
    return { x: X(bin), y: r2(base - 7 - level * step) };
  };
  const regular = REGULAR_SPEND.map(dot);
  const heavyDots = heavy.map((v) => ({ x: X(v), y: r2(base - 7) }));
  const tip = r2(base - 7 - Math.max(...Array.from(stacks.values())) * step - 2);
  const hx0 = heavyDots[0].x - 14;
  const hx1 = heavyDots[2].x + 14;

  return (
    <Frame
      width={640}
      height={200}
      label={`Monthly spending of twenty customers: seventeen spend between 12 and 60 dollars, and three heavy spenders spend ${heavy.join(", ")} dollars. The median is ${median} dollars and the mean ${Math.round(mean)} dollars`}
      className="cursor-ew-resize touch-none select-none"
      svgProps={{
        onPointerDown: (ev) => {
          ev.currentTarget.setPointerCapture(ev.pointerId);
          drag(ev);
        },
        onPointerMove: (ev) => {
          if (ev.currentTarget.hasPointerCapture(ev.pointerId)) drag(ev);
        },
      }}
    >
      {/* median and mean */}
      <path d={`M${X(median)} 52V${tip}${head.down(X(median), tip, 7)}`} fill="none" stroke={SIGNAL} strokeWidth={1.75} />
      <Key x={r2(X(median) - 8)} y={20} anchor="end" fill={SIGNAL} size={9.5}>MEDIAN</Key>
      <Display x={r2(X(median) - 8)} y={44} anchor="end" fill={SIGNAL} size={24}>{`$${median}`}</Display>
      <path d={`M${X(mean)} 52V${tip}${head.down(X(mean), tip, 7)}`} fill="none" stroke={COUNTER} strokeWidth={1.75} />
      <Key x={r2(X(mean) + 8)} y={20} fill={COUNTER} size={9.5}>MEAN</Key>
      <Display x={r2(X(mean) + 8)} y={44} fill={COUNTER} size={24}>{`$${Math.round(mean)}`}</Display>

      {regular.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4.5} fill={INK3} fillOpacity={0.7} />
      ))}

      {/* the heavy spenders: dragged along the axis */}
      <g
        role="slider"
        tabIndex={0}
        aria-label="Spending of the three heavy spenders"
        aria-valuemin={HEAVY_SPEND[1] + SHIFT_MIN}
        aria-valuemax={HEAVY_SPEND[1] + SHIFT_MAX}
        aria-valuenow={heavy[1]}
        className="outline-none [&:focus-visible>rect]:stroke-[var(--ink)]"
        onKeyDown={(ev) => {
          if (ev.key === "ArrowRight" || ev.key === "ArrowUp") set(d + 10);
          else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") set(d - 10);
          else return;
          ev.preventDefault();
        }}
      >
        <rect x={hx0} y={base - 22} width={r2(hx1 - hx0)} height={20} rx={10} fill={PAPER} stroke={INK} strokeWidth={1.25} />
        {heavyDots.map((p, i) => (
          <circle key={i} cx={p.x} cy={r2(p.y - 5)} r={5.5} fill={INK} />
        ))}
        <path d={`M${r2(hx0 - 6)} ${base - 16}L${r2(hx0 - 12)} ${base - 12}L${r2(hx0 - 6)} ${base - 8}Z`} fill={INK} />
        <path d={`M${r2(hx1 + 6)} ${base - 16}L${r2(hx1 + 12)} ${base - 12}L${r2(hx1 + 6)} ${base - 8}Z`} fill={INK} />
      </g>

      <line x1={x0 - 6} y1={base} x2={x1 + 12} y2={base} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x1 + 12, base, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[0, 100, 200, 300, 400, 500, 600].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={base} x2={X(v)} y2={base + 4} stroke={INK} strokeWidth={1} />
          <Key x={X(v)} y={base + 18} anchor="middle" fill={INK3} size={9.5}>{`$${v}`}</Key>
        </g>
      ))}
      <Key x={x1 + 12} y={base + 36} anchor="end" fill={INK3} size={9.5}>MONTHLY SPENDING</Key>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Measures of Dispersion
   -------------------------------------------------------------------------- */

/** Twenty-four customers' ratings of each brand, as counts for 1–5. */
const BRAND_RATINGS = [
  { counts: [0, 0, 3, 18, 3], tone: SIGNAL },
  { counts: [3, 2, 1, 4, 14], tone: COUNTER },
];

/**
 * Dispersion: twenty-four customers rate each of two brands. Both average
 * 4.0; the first brand's ratings sit almost all at 4, standard deviation
 * 0.5, while the second's run from 1 to 5, standard deviation 1.5. The
 * bracket under each spans one standard deviation either side of the mean.
 */
export function TwoBrandsSpread() {
  const x0 = 70;
  const cw = 94;
  const cx = (v: number) => r2(x0 + (v - 0.5) * cw);
  const perRow = 4;
  const gx = 19;
  const gy = 18;
  const panels = BRAND_RATINGS.map((b, i) => ({ ...b, ...describeCounts(b.counts), base: 112 + i * 112 }));

  return (
    <Frame
      width={560}
      height={292}
      label={`Twenty-four customers rate two brands from 1 to 5. Both have a mean of 4.0. The first brand's ratings are almost all 4, with a standard deviation of ${panels[0].sd.toFixed(1)}; the second brand's run from 1 to 5, with a standard deviation of ${panels[1].sd.toFixed(1)}`}
    >
      {panels.map((b, i) => (
        <g key={i}>
          <Key x={16} y={b.base - 72} fill={b.tone} size={10} weight={700}>{`MEAN ${b.m.toFixed(1)}`}</Key>
          <Key x={16} y={b.base - 56} fill={b.tone} size={10} weight={700}>{`SD ${b.sd.toFixed(1)}`}</Key>
          {b.counts.flatMap((c, v) =>
            Array.from({ length: c }, (_, j) => {
              const row = Math.floor(j / perRow);
              const inRow = Math.min(perRow, c - row * perRow);
              return (
                <Person1
                  key={`${v}-${j}`}
                  x={r2(cx(v + 1) + ((j % perRow) - (inRow - 1) / 2) * gx)}
                  y={r2(b.base - row * gy)}
                  k={0.5}
                  stroke={b.tone}
                  fill={b.tone}
                  width={1}
                />
              );
            }),
          )}
          <line x1={x0} y1={b.base + 2} x2={x0 + 5 * cw} y2={b.base + 2} stroke={INK3} strokeWidth={1} />
          <path d={`M${cx(b.m - b.sd)} ${b.base + 10}V${b.base + 16}H${cx(b.m + b.sd)}V${b.base + 10}`} fill="none" stroke={b.tone} strokeWidth={1.75} />
          <circle cx={cx(b.m)} cy={b.base + 16} r={3.5} fill={b.tone} />
        </g>
      ))}
      <line x1={x0} y1={262} x2={x0 + 5 * cw + 12} y2={262} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x0 + 5 * cw + 12, 262, 7)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[1, 2, 3, 4, 5].map((v) => (
        <Key key={v} x={cx(v)} y={280} anchor="middle" fill={INK3} size={10}>{v}</Key>
      ))}
      <Key x={16} y={280} fill={INK3} size={9.5}>RATING</Key>
    </Frame>
  );
}

function describeCounts(counts: number[]) {
  const n = counts.reduce((a, b) => a + b, 0);
  const m = counts.reduce((a, c, i) => a + c * (i + 1), 0) / n;
  const sd = Math.sqrt(counts.reduce((a, c, i) => a + c * (i + 1 - m) ** 2, 0) / (n - 1));
  return { m, sd };
}

/* --------------------------------------------------------------------------
   Constructing a Cross-Tabulation
   -------------------------------------------------------------------------- */

const AGES = ["18\u201334", "35\u201354", "55+"];
const CHANNELS = ["ONLINE", "IN-STORE", "MOBILE"];
/** Respondents by age group (rows) and preferred channel (columns). */
const CHANNEL_COUNTS = [
  [60, 30, 110],
  [90, 80, 80],
  [45, 90, 15],
];
type Direction = "age" | "channel";

/**
 * Constructing a cross-tabulation: 600 respondents by age group and
 * preferred shopping channel. The student chooses the direction of the
 * percentages. Within each age group, the rows sum to 100% and the
 * channels can be compared across ages: mobile falls from 55% to 10%.
 * Within each channel, the same counts give columns that sum to 100%, which
 * describe the age mix of each channel's users instead.
 */
export function CrossTabDirection() {
  const [dir, setDir] = useState<Direction>("age");
  const rowT = CHANNEL_COUNTS.map((r) => r.reduce((a, b) => a + b, 0));
  const colT = CHANNELS.map((_, j) => CHANNEL_COUNTS.reduce((a, r) => a + r[j], 0));
  const total = rowT.reduce((a, b) => a + b, 0);
  const pct = (i: number, j: number) => (100 * CHANNEL_COUNTS[i][j]) / (dir === "age" ? rowT[i] : colT[j]);

  const lx = 16;
  const x0 = 104;
  const cw = 118;
  const tx = x0 + 3 * cw;
  const tw = 92;
  const hy = 30;
  const y0 = 44;
  const rh = 64;
  const by = y0 + 3 * rh;
  const cellX = (j: number) => x0 + j * cw;
  const cellY = (i: number) => y0 + i * rh;

  return (
    <>
      <Frame
        width={560}
        height={by + 56}
        label={`Cross-tabulation of 600 respondents by age group and preferred shopping channel, with percentages calculated within each ${dir === "age" ? "age group" : "channel"}. ${AGES.map((a, i) => `${a}: ${CHANNELS.map((c, j) => `${c.toLowerCase()} ${Math.round(pct(i, j))}%`).join(", ")}`).join("; ")}`}
      >
        {CHANNELS.map((c, j) => (
          <Key key={c} x={r2(cellX(j) + cw / 2)} y={hy} anchor="middle" fill={INK} size={10}>{c}</Key>
        ))}
        <Key x={r2(tx + tw / 2)} y={hy} anchor="middle" fill={INK3} size={10}>TOTAL</Key>
        <line x1={lx} y1={y0 - 4} x2={tx + tw} y2={y0 - 4} stroke={INK} strokeWidth={1.25} />

        {AGES.map((a, i) => (
          <g key={a}>
            <Key x={lx} y={r2(cellY(i) + rh / 2 + 4)} fill={INK} size={10.5}>{a}</Key>
            {CHANNELS.map((_, j) => {
              const p = pct(i, j);
              return (
                <g key={j}>
                  <rect x={cellX(j) + 3} y={cellY(i) + 3} width={cw - 6} height={rh - 6} fill={SIGNAL} fillOpacity={r2(0.04 + (p / 100) * 0.5)} />
                  <Display x={r2(cellX(j) + cw / 2)} y={r2(cellY(i) + rh / 2 + 5)} anchor="middle" fill={INK} size={24}>{`${Math.round(p)}%`}</Display>
                  <Key x={r2(cellX(j) + cw / 2)} y={r2(cellY(i) + rh - 11)} anchor="middle" fill={INK2} size={9}>{`N ${CHANNEL_COUNTS[i][j]}`}</Key>
                </g>
              );
            })}
            <Display x={r2(tx + tw / 2)} y={r2(cellY(i) + rh / 2 + 5)} anchor="middle" fill={dir === "age" ? SIGNAL : INK3} size={dir === "age" ? 22 : 17}>
              {dir === "age" ? "100%" : String(rowT[i])}
            </Display>
          </g>
        ))}
        <line x1={lx} y1={by + 2} x2={tx + tw} y2={by + 2} stroke={INK} strokeWidth={1.25} />
        <Key x={lx} y={by + 32} fill={INK3} size={10}>TOTAL</Key>
        {CHANNELS.map((_, j) => (
          <Display key={j} x={r2(cellX(j) + cw / 2)} y={by + 34} anchor="middle" fill={dir === "channel" ? SIGNAL : INK3} size={dir === "channel" ? 22 : 17}>
            {dir === "channel" ? "100%" : String(colT[j])}
          </Display>
        ))}
        <Display x={r2(tx + tw / 2)} y={by + 34} anchor="middle" fill={INK3} size={17}>{String(total)}</Display>
        <line x1={tx} y1={hy - 14} x2={tx} y2={by + 44} stroke={RULE2} strokeWidth={1} />
      </Frame>
      <Segmented
        label="Percentages within"
        options={[
          { id: "age", label: "Each age group" },
          { id: "channel", label: "Each channel" },
        ]}
        value={dir}
        onChange={setDir}
      />
    </>
  );
}

/* --------------------------------------------------------------------------
   Interpreting Cross-Tabulations
   -------------------------------------------------------------------------- */

/** Twenty customers per group, by income; `high` of them are high spenders. */
const APP_GROUPS = [
  { key: "APP USERS", strata: [{ n: 15, high: 9 }, { n: 5, high: 1 }] },
  { key: "OTHER CUSTOMERS", strata: [{ n: 5, high: 3 }, { n: 15, high: 3 }] },
];
const INCOME_LABELS = ["HIGHER INCOME", "LOWER INCOME"];

/**
 * A spurious association: half of the app users are high spenders against
 * 30% of other customers. Adding income as a third variable splits each
 * group: most app users have higher incomes, and within each income group
 * users and other customers are high spenders equally often (60% and 20%).
 */
export function ThirdVariable() {
  const [on, setOn] = useState<"income"[]>([]);
  const split = on.length > 0;
  const colX = [104, 340];
  const gx = 22;
  const gy = 28;
  const k = 0.62;
  const person = (x: number, y: number, high: boolean, key: string) => (
    <Person1 key={key} x={x} y={y} k={k} stroke={high ? COUNTER : INK} fill={high ? COUNTER : PAPER} width={1.25} />
  );
  const pctLabel = (x: number, y: number, v: number, tone: string, key: string) => (
    <g key={key}>
      <Display x={x} y={y} fill={tone} size={26}>{`${Math.round(v * 100)}%`}</Display>
      <Key x={x} y={y + 19} fill={INK3} size={8.5}>HIGH SPENDERS</Key>
    </g>
  );
  const grid = (n: number, high: number, x0: number, top: number, key: string) =>
    Array.from({ length: n }, (_, i) => person(r2(x0 + (i % 5) * gx), r2(top + Math.floor(i / 5) * gy), i < high, `${key}-${i}`));

  return (
    <>
      <Frame
        width={560}
        height={290}
        label={
          split
            ? "Split by income, app users and other customers are high spenders equally often: 60 percent of each among customers with higher incomes and 20 percent of each among customers with lower incomes. Fifteen of the twenty app users have higher incomes, against five of the twenty other customers"
            : "Fifty percent of twenty app users are high spenders, against thirty percent of twenty other customers"
        }
      >
        {APP_GROUPS.map((g, c) => {
          const n = g.strata.reduce((a, s) => a + s.n, 0);
          const high = g.strata.reduce((a, s) => a + s.high, 0);
          return (
            <g key={g.key}>
              <Key x={colX[c] - 10} y={24} fill={INK} size={10}>{g.key}</Key>
              <line x1={colX[c] - 10} y1={34} x2={colX[c] + 206} y2={34} stroke={INK} strokeWidth={1.25} />
              {split
                ? g.strata.map((st, si) => {
                    const top = si === 0 ? 84 : 200;
                    return (
                      <g key={si}>
                        {grid(st.n, st.high, colX[c], top, `${c}-${si}`)}
                        {pctLabel(colX[c] + 5 * gx + 6, top - 2, st.high / st.n, SIGNAL, `p-${si}`)}
                      </g>
                    );
                  })
                : (
                  <>
                    {grid(n, high, colX[c], 110, `${c}`)}
                    {pctLabel(colX[c] + 5 * gx + 6, 144, high / n, c === 0 ? SIGNAL : INK, "p")}
                  </>
                )}
            </g>
          );
        })}
        {split
          ? INCOME_LABELS.map((l, si) => (
              <g key={l}>
                <Key x={16} y={si === 0 ? 72 : 188} fill={INK} size={9.5}>{l.split(" ")[0]}</Key>
                <Key x={16} y={si === 0 ? 86 : 202} fill={INK} size={9.5}>{l.split(" ")[1]}</Key>
                {si === 1 ? <line x1={16} y1={150} x2={554} y2={150} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" /> : null}
              </g>
            ))
          : null}
      </Frame>
      <Toggles label="Third variable" options={[{ id: "income" as const, label: "Income" }]} value={on} onChange={setOn} allowNone />
    </>
  );
}

/* --------------------------------------------------------------------------
   Principles of Data Visualization
   -------------------------------------------------------------------------- */

const REGION_SAT = [
  { r: "North", v: 72 },
  { r: "East", v: 58 },
  { r: "South", v: 55 },
  { r: "West", v: 51 },
];

/** A cross or a tick in a circle, marking the chart to avoid and the one to follow. */
function Verdict({ cx, cy, ok }: { cx: number; cy: number; ok: boolean }) {
  const tone = ok ? SIGNAL : COUNTER;
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill={PAPER} stroke={tone} strokeWidth={1.5} />
      {ok ? (
        <path d={`M${cx - 4.5} ${cy}L${cx - 1.2} ${cy + 3.5}L${cx + 4.8} ${cy - 3.8}`} fill="none" stroke={tone} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M${cx - 4} ${cy - 4}L${cx + 4} ${cy + 4}M${cx + 4} ${cy - 4}L${cx - 4} ${cy + 4}`} stroke={tone} strokeWidth={1.75} strokeLinecap="round" />
      )}
    </g>
  );
}

/**
 * Principles of data visualization: one finding, the share of satisfied
 * customers by region, charted twice. Above, a generic title, a legend,
 * four decorative colours, three-dimensional bars, heavy gridlines and an
 * axis from 50. Below, the finding as the title, bars from zero labelled
 * directly, and one colour for the region the finding concerns.
 */
export function ChartPrinciples() {
  // the cluttered chart
  const ax = 44;
  const ay0 = 44;
  const ay1 = 146;
  const Y = (v: number) => r2(ay1 - ((v - 50) / 25) * (ay1 - ay0));
  const fills = [SIGNAL, COUNTER, INK, INK3];
  const bw = 30;
  const depth = 8;
  // the clean chart
  const cy0 = 214;
  const bx = 64;
  const W = (v: number) => r2((v / 100) * 250);

  return (
    <Frame
      width={400}
      height={334}
      label="The same data charted twice. Above, to avoid: a generic title, three-dimensional bars in four colours identified by a legend, heavy gridlines, and a value axis from 50 to 75 percent. Below, to follow: a title stating the finding that the North has the most satisfied customers, horizontal bars from zero labelled directly with 72, 58, 55 and 51 percent, and colour only on the North"
    >
      {/* to avoid */}
      <Verdict cx={16} cy={15} ok={false} />
      <text x={34} y={20} fontFamily="var(--font-heading)" fontSize={14} fill={INK2}>Customer Satisfaction by Region</text>
      {[50, 55, 60, 65, 70, 75].map((v) => (
        <g key={v}>
          <line x1={ax} y1={Y(v)} x2={262} y2={Y(v)} stroke={INK3} strokeWidth={1.5} />
          <Key x={ax - 6} y={r2(Y(v) + 3.5)} anchor="end" fill={INK3} size={8.5}>{v}</Key>
        </g>
      ))}
      {REGION_SAT.map((d, i) => {
        const x = ax + 16 + i * 52;
        const top = Y(d.v);
        return (
          <g key={d.r}>
            <path d={`M${x} ${top}l${depth} ${-depth}h${bw}l${-depth} ${depth}Z`} fill={fills[i]} fillOpacity={0.55} stroke={PAPER} strokeWidth={0.75} />
            <path d={`M${x + bw} ${top}l${depth} ${-depth}V${ay1 - depth}l${-depth} ${depth}Z`} fill={fills[i]} fillOpacity={0.8} stroke={PAPER} strokeWidth={0.75} />
            <rect x={x} y={top} width={bw} height={r2(ay1 - top)} fill={fills[i]} stroke={PAPER} strokeWidth={0.75} />
          </g>
        );
      })}
      <rect x={276} y={50} width={112} height={86} fill={PAPER} stroke={INK3} strokeWidth={1} />
      {REGION_SAT.map((d, i) => (
        <g key={d.r}>
          <rect x={286} y={60 + i * 19} width={11} height={11} fill={fills[i]} />
          <Note x={304} y={70 + i * 19} size={11.5} fill={INK2}>{d.r}</Note>
        </g>
      ))}

      <line x1={16} y1={170} x2={384} y2={170} stroke={RULE2} strokeWidth={1} />

      {/* to follow */}
      <Verdict cx={16} cy={193} ok />
      <text x={34} y={198} fontFamily="var(--font-heading)" fontSize={14} fill={INK}>The North has the most satisfied customers</text>
      {REGION_SAT.map((d, i) => {
        const y = cy0 + i * 29;
        const hi = i === 0;
        return (
          <g key={d.r}>
            <Note x={bx - 8} y={y + 15} anchor="end" size={12} fill={hi ? SIGNAL : INK2} weight={hi ? 600 : 400}>{d.r}</Note>
            <rect x={bx} y={y + 3} width={W(d.v)} height={17} fill={hi ? SIGNAL : INK3} fillOpacity={hi ? 1 : 0.45} />
            <Key x={r2(bx + W(d.v) + 7)} y={y + 16} fill={hi ? SIGNAL : INK2} size={11} weight={hi ? 700 : 500}>{`${d.v}%`}</Key>
          </g>
        );
      })}
      <line x1={bx} y1={cy0} x2={bx} y2={cy0 + 4 * 29} stroke={INK} strokeWidth={1.25} />
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Selecting a Chart
   -------------------------------------------------------------------------- */

type ChartKind = "bar" | "line" | "histogram" | "scatter" | "stacked" | "table";

const THUMB_LABEL: Record<ChartKind, string> = {
  bar: "A bar chart of market share for brands A to D: 34, 27, 21 and 18 percent",
  line: "A line chart of monthly sales across 2024 and 2025, rising with a peak each December",
  histogram: "A histogram of the number of visits per customer, most customers at one to three visits and a tail to the right",
  scatter: "A scatter plot of advertising expenditure against sales for twelve regions, rising together",
  stacked: "A stacked bar chart of the channel mix of three age groups, each bar summing to 100 percent",
  table: "A table of exact satisfaction scores for four regions in two years",
};

/** Axis pair for the thumbnails: an ink x axis with an open head, and a short y axis. */
function ThumbAxes({ x0, x1, y0, y1, yAxis = true }: { x0: number; x1: number; y0: number; y1: number; yAxis?: boolean }) {
  return (
    <g>
      <line x1={x0} y1={y1} x2={x1} y2={y1} stroke={INK} strokeWidth={1.25} />
      <path d={head.right(x1, y1, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
      {yAxis ? (
        <>
          <line x1={x0} y1={y1} x2={x0} y2={y0} stroke={INK} strokeWidth={1.25} />
          <path d={head.up(x0, y0, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
        </>
      ) : null}
    </g>
  );
}

/**
 * Selecting a chart: one small chart of each type, drawn on the example its
 * sentence gives.
 */
export function ChartThumb({ kind }: { kind: ChartKind }) {
  return (
    <Frame width={400} height={150} label={THUMB_LABEL[kind]}>
      {kind === "bar" ? <BarThumb /> : null}
      {kind === "line" ? <LineThumb /> : null}
      {kind === "histogram" ? <HistogramThumb /> : null}
      {kind === "scatter" ? <ScatterThumb /> : null}
      {kind === "stacked" ? <StackedThumb /> : null}
      {kind === "table" ? <TableThumb /> : null}
    </Frame>
  );
}

function BarThumb() {
  const shares = [
    { b: "A", v: 34 },
    { b: "B", v: 27 },
    { b: "C", v: 21 },
    { b: "D", v: 18 },
  ];
  const base = 124;
  return (
    <g>
      <ThumbAxes x0={40} x1={370} y0={14} y1={base} yAxis={false} />
      {shares.map((d, i) => {
        const x = 70 + i * 76;
        const h = r2((d.v / 36) * 96);
        return (
          <g key={d.b}>
            <rect x={x} y={r2(base - h)} width={44} height={h} fill={SIGNAL} fillOpacity={i === 0 ? 1 : 0.55} />
            <Key x={x + 22} y={r2(base - h - 6)} anchor="middle" fill={INK} size={10.5} weight={600}>{`${d.v}%`}</Key>
            <Key x={x + 22} y={base + 16} anchor="middle" fill={INK2} size={10.5} weight={700}>{d.b}</Key>
          </g>
        );
      })}
    </g>
  );
}

/** Monthly sales over two years: a rising trend with a December peak. */
const MONTHLY_SALES = Array.from({ length: 24 }, (_, i) => 40 + i * 1.6 + (i % 12 === 11 ? 18 : i % 12 === 10 ? 6 : 0) + ((i * 7) % 5) - 2);

function LineThumb() {
  const x0 = 40;
  const x1 = 370;
  const base = 124;
  const X = (i: number) => r2(x0 + 14 + (i / 23) * (x1 - x0 - 34));
  const Y = (v: number) => r2(base - ((v - 30) / 72) * 96);
  const d = MONTHLY_SALES.map((v, i) => `${i ? "L" : "M"}${X(i)} ${Y(v)}`).join("");
  return (
    <g>
      <ThumbAxes x0={x0} x1={x1} y0={14} y1={base} />
      <line x1={r2((X(11) + X(12)) / 2)} y1={base} x2={r2((X(11) + X(12)) / 2)} y2={base + 5} stroke={INK} strokeWidth={1} />
      <path d={d} fill="none" stroke={SIGNAL} strokeWidth={2} strokeLinejoin="round" />
      <Key x={r2((X(0) + X(11)) / 2)} y={base + 17} anchor="middle" fill={INK3} size={10}>2024</Key>
      <Key x={r2((X(12) + X(23)) / 2)} y={base + 17} anchor="middle" fill={INK3} size={10}>2025</Key>
    </g>
  );
}

function HistogramThumb() {
  const x0 = 40;
  const x1 = 370;
  const base = 124;
  const bins = VISITS.filter((d) => d.v <= 8);
  const bw = (x1 - x0 - 40) / bins.length;
  return (
    <g>
      <ThumbAxes x0={x0} x1={x1} y0={14} y1={base} />
      {bins.map((d, i) => {
        const h = r2((d.n / 44) * 100);
        return <rect key={d.v} x={r2(x0 + 10 + i * bw)} y={r2(base - h)} width={r2(bw - 1.5)} height={h} fill={SIGNAL} fillOpacity={0.75} />;
      })}
      {[0, 4, 8].map((v) => (
        <Key key={v} x={r2(x0 + 10 + (v + 0.5) * bw)} y={base + 16} anchor="middle" fill={INK3} size={10}>{v}</Key>
      ))}
    </g>
  );
}

/** Twelve regions: advertising expenditure and sales, on 0–1 scales. */
const REGION_AD_SALES = [
  [0.08, 0.16], [0.14, 0.3], [0.2, 0.22], [0.27, 0.38], [0.33, 0.33], [0.4, 0.5],
  [0.47, 0.44], [0.55, 0.6], [0.62, 0.55], [0.7, 0.72], [0.8, 0.7], [0.9, 0.86],
];

function ScatterThumb() {
  const x0 = 40;
  const x1 = 370;
  const base = 124;
  const X = (v: number) => r2(x0 + 14 + v * (x1 - x0 - 44));
  const Y = (v: number) => r2(base - 8 - v * 92);
  return (
    <g>
      <ThumbAxes x0={x0} x1={x1} y0={14} y1={base} />
      {REGION_AD_SALES.map(([a, s], i) => (
        <circle key={i} cx={X(a)} cy={Y(s)} r={5} fill={SIGNAL} fillOpacity={0.8} />
      ))}
      <Key x={x1} y={base + 17} anchor="end" fill={INK3} size={9.5}>ADVERTISING</Key>
      <Key x={x0 + 10} y={20} fill={INK3} size={9.5}>SALES</Key>
    </g>
  );
}

function StackedThumb() {
  const x0 = 78;
  const x1 = 384;
  const tones = [
    { fill: SIGNAL, opacity: 1, text: PAPER },
    { fill: INK3, opacity: 0.45, text: INK },
    { fill: COUNTER, opacity: 1, text: PAPER },
  ];
  return (
    <g>
      {CHANNEL_COUNTS.map((row, i) => {
        const tot = row.reduce((a, b) => a + b, 0);
        const y = 22 + i * 40;
        let run = x0;
        return (
          <g key={i}>
            <Key x={x0 - 10} y={y + 17} anchor="end" fill={INK} size={10}>{AGES[i]}</Key>
            {row.map((n, j) => {
              const w = r2(((x1 - x0) * n) / tot);
              const x = run;
              run += w;
              return (
                <g key={j}>
                  <rect x={r2(x)} y={y} width={r2(w - 1.5)} height={26} fill={tones[j].fill} fillOpacity={tones[j].opacity} />
                  {i === 1 ? (
                    <Key x={r2(x + 6)} y={y + 17} fill={tones[j].text} size={8.5} weight={700}>{CHANNELS[j]}</Key>
                  ) : null}
                </g>
              );
            })}
          </g>
        );
      })}
      <Key x={x1} y={144} anchor="end" fill={INK3} size={9.5}>100%</Key>
    </g>
  );
}

function TableThumb() {
  const rows = [
    ["North", "4.21", "4.34"],
    ["East", "4.08", "4.02"],
    ["South", "3.97", "4.11"],
    ["West", "3.86", "3.92"],
  ];
  const cols = [70, 220, 320];
  return (
    <g>
      <Key x={cols[1]} y={18} anchor="middle" fill={INK} size={10}>2024</Key>
      <Key x={cols[2]} y={18} anchor="middle" fill={INK} size={10}>2025</Key>
      <line x1={30} y1={26} x2={370} y2={26} stroke={INK} strokeWidth={1.25} />
      {rows.map((r, i) => {
        const y = 48 + i * 26;
        return (
          <g key={r[0]}>
            <Note x={cols[0]} y={y} size={13} fill={INK2}>{r[0]}</Note>
            {[1, 2].map((j) => (
              <text key={j} x={cols[j]} y={y} textAnchor="middle" fontFamily="var(--font-label)" fontSize={13.5} fill={INK} style={{ fontVariantNumeric: "tabular-nums" }}>
                {r[j]}
              </text>
            ))}
            <line x1={30} y1={y + 9} x2={370} y2={y + 9} stroke={RULE} strokeWidth={1} />
          </g>
        );
      })}
    </g>
  );
}

/* --------------------------------------------------------------------------
   Misleading Visualizations
   -------------------------------------------------------------------------- */

const STORE_SCORES = [
  { s: "A", v: 3.9 },
  { s: "B", v: 4.0 },
  { s: "C", v: 4.3 },
];
const BASE_MAX = 3.8;

/**
 * A truncated value axis: satisfaction scores of 3.9, 4.0 and 4.3. A ruler
 * from 0 to 5 beside the chart shows the part of the scale the chart
 * displays; the student drags its lower edge up. From zero the bars differ
 * by a tenth; from 3.8, bar C is five times as long as bar A, although its
 * score is only 1.1 times as high.
 */
export function TruncatedAxis() {
  const [b, setB] = useState(0);
  const top = 4.5;
  const R = (v: number) => r2(226 - (v / 5) * 196);
  const rx = 44;
  const cx0 = 104;
  const cy0 = 226;
  const cy1 = 44;
  const Y = (v: number) => r2(cy0 - ((v - b) / (top - b)) * (cy0 - cy1));
  const set = (v: number) => setB(Math.max(0, Math.min(BASE_MAX, Math.round(v * 10) / 10)));
  const drag = (ev: React.PointerEvent<SVGSVGElement>) => {
    const ctm = ev.currentTarget.getScreenCTM();
    if (!ctm) return;
    const y = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse()).y;
    set(((226 - y) / 196) * 5);
  };
  const ticks = [0, 1, 2, 3, 4, 4.5].filter((v) => v > b + 0.08 && v <= top);
  const fine = b >= 3 ? [3.9, 4.1, 4.2, 4.3, 4.4].filter((v) => v > b + 0.04 && v < top) : [];
  const barRatio = (STORE_SCORES[2].v - b) / (STORE_SCORES[0].v - b);
  const scoreRatio = STORE_SCORES[2].v / STORE_SCORES[0].v;
  const fmt1 = (v: number) => (Number.isInteger(v) ? v.toFixed(0) : v.toFixed(1));

  return (
    <Frame
      width={400}
      height={262}
      label={`Satisfaction scores of 3.9, 4.0 and 4.3 for stores A, B and C, charted with a value axis from ${fmt1(b)} to 4.5. Bar C is ${barRatio.toFixed(1)} times as long as bar A, while its score is ${scoreRatio.toFixed(1)} times as high`}
      className="touch-none select-none"
      svgProps={{
        onPointerDown: (ev) => {
          ev.currentTarget.setPointerCapture(ev.pointerId);
          drag(ev);
        },
        onPointerMove: (ev) => {
          if (ev.currentTarget.hasPointerCapture(ev.pointerId)) drag(ev);
        },
      }}
    >
      {/* the whole scale, and the part the chart shows */}
      <line x1={rx} y1={R(0)} x2={rx} y2={R(5)} stroke={INK3} strokeWidth={1.25} />
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={rx - 4} y1={R(v)} x2={rx} y2={R(v)} stroke={INK3} strokeWidth={1} />
          <Key x={rx - 14} y={r2(R(v) + 3.5)} anchor="end" fill={INK3} size={9}>{v}</Key>
        </g>
      ))}
      <rect x={rx - 1} y={R(top)} width={8} height={r2(R(b) - R(top))} fill={SIGNAL_TINT} stroke={SIGNAL} strokeWidth={1.25} />
      <line x1={rx + 16} y1={R(top)} x2={cx0 - 32} y2={cy1} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <line x1={rx + 16} y1={R(b)} x2={cx0 - 24} y2={cy0} stroke={RULE2} strokeWidth={1} strokeDasharray="3 3" />
      <g
        role="slider"
        tabIndex={0}
        aria-label="Start of the value axis"
        aria-valuemin={0}
        aria-valuemax={BASE_MAX}
        aria-valuenow={b}
        className="cursor-ns-resize outline-none [&:focus-visible>rect]:stroke-[var(--ink)]"
        onKeyDown={(ev) => {
          if (ev.key === "ArrowUp" || ev.key === "ArrowRight") set(b + 0.1);
          else if (ev.key === "ArrowDown" || ev.key === "ArrowLeft") set(b - 0.1);
          else return;
          ev.preventDefault();
        }}
      >
        <rect x={rx - 7} y={r2(R(b) - 5)} width={20} height={10} rx={5} fill={SIGNAL} stroke={SIGNAL} strokeWidth={1.5} />
        <path d={`M${rx - 1} ${r2(R(b) - 9)}l4 -5l4 5Z`} fill={SIGNAL} />
        <path d={`M${rx - 1} ${r2(R(b) + 9)}l4 5l4 -5Z`} fill={SIGNAL} />
      </g>

      {/* the chart, drawn from the chosen start */}
      <line x1={cx0} y1={cy0} x2={cx0} y2={cy1 - 12} stroke={INK} strokeWidth={1.25} />
      <path d={head.up(cx0, cy1 - 12, 6)} fill="none" stroke={INK} strokeWidth={1.25} />
      {[...ticks, ...fine].map((v) => (
        <g key={v}>
          <line x1={cx0 - 4} y1={Y(v)} x2={cx0} y2={Y(v)} stroke={INK} strokeWidth={1} />
          <Key x={cx0 - 8} y={r2(Y(v) + 3.5)} anchor="end" fill={INK3} size={9}>{fmt1(v)}</Key>
        </g>
      ))}
      <Key x={cx0 - 8} y={r2(cy0 + 3.5)} anchor="end" fill={b > 0 ? COUNTER : INK3} size={9.5} weight={700}>{fmt1(b)}</Key>
      {STORE_SCORES.map((d, i) => {
        const x = cx0 + 22 + i * 62;
        return (
          <g key={d.s}>
            <rect x={x} y={Y(d.v)} width={42} height={r2(cy0 - Y(d.v))} fill={i === 2 ? SIGNAL : INK3} fillOpacity={i === 2 ? 1 : 0.5} />
            <Key x={x + 21} y={r2(Y(d.v) - 6)} anchor="middle" fill={INK} size={10}>{d.v.toFixed(1)}</Key>
            <Key x={x + 21} y={cy0 + 16} anchor="middle" fill={INK2} size={10} weight={700}>{d.s}</Key>
          </g>
        );
      })}
      <line x1={cx0} y1={cy0} x2={cx0 + 206} y2={cy0} stroke={INK} strokeWidth={1.25} />

      {/* what the eye compares, and what the data say */}
      <Key x={392} y={70} anchor="end" fill={INK3} size={8.5}>{"BAR C \u00f7 BAR A"}</Key>
      <Display x={392} y={98} anchor="end" fill={barRatio > 1.5 ? COUNTER : INK} size={28}>{`\u00d7${barRatio.toFixed(1)}`}</Display>
      <Key x={392} y={150} anchor="end" fill={INK3} size={8.5}>{"SCORE C \u00f7 SCORE A"}</Key>
      <Display x={392} y={178} anchor="end" fill={INK} size={28}>{`\u00d7${scoreRatio.toFixed(1)}`}</Display>
    </Frame>
  );
}

/** Twelve months of advertising spending ($ thousands) and website visits (thousands). */
const AD_SPEND = [20, 20.5, 21, 21.2, 21.8, 22, 22.5, 22.9, 23.2, 23.6, 23.8, 24.2];
const SITE_VISITS = [50.1, 50.0, 50.3, 50.2, 50.5, 50.4, 50.7, 50.6, 50.9, 51.0, 50.9, 51.2];
const RIGHT_AXES = [
  { id: "wide", label: "0\u2013100", lo: 0, hi: 100, ticks: [0, 50, 100] },
  { id: "mid", label: "45\u201355", lo: 45, hi: 55, ticks: [45, 50, 55] },
  { id: "tight", label: "49\u201351.5", lo: 49, hi: 51.5, ticks: [49, 50, 51] },
] as const;
type RightAxis = (typeof RIGHT_AXES)[number]["id"];

/**
 * Two value axes: advertising spending rises by a fifth over a year while
 * website visits rise by 2%. The student rescales the right axis. From 0 to
 * 100 thousand, visits are flat; from 49 to 51.5 thousand, the visits line
 * climbs alongside spending and suggests that one drives the other, from
 * the same data.
 */
export function TwoValueAxes() {
  const [ax, setAx] = useState<RightAxis>("wide");
  const r = RIGHT_AXES.find((a) => a.id === ax)!;
  const x0 = 56;
  const x1 = 336;
  const y0 = 226;
  const y1 = 44;
  const X = (i: number) => r2(x0 + 14 + (i / 11) * (x1 - x0 - 28));
  const YL = (v: number) => r2(y0 - ((v - 16) / 10) * (y0 - y1));
  const YR = (v: number) => r2(y0 - ((v - r.lo) / (r.hi - r.lo)) * (y0 - y1));
  const path = (vals: number[], Y: (v: number) => number) => vals.map((v, i) => `${i ? "L" : "M"}${X(i)} ${Y(v)}`).join("");

  return (
    <>
      <Frame
        width={400}
        height={262}
        label={`Twelve months of advertising spending, rising from 20 to 24.2 thousand dollars on the left axis, and website visits, rising from 50.1 to 51.2 thousand on a right axis from ${r.lo} to ${r.hi} thousand. ${ax === "wide" ? "The visits line is flat" : ax === "mid" ? "The visits line rises slightly" : "The visits line rises alongside spending"}`}
      >
        <Key x={x0 - 8} y={22} fill={INK} size={9}>AD SPENDING, $K</Key>
        <Key x={x1 + 8} y={22} anchor="end" fill={COUNTER} size={9}>VISITS, THOUSANDS</Key>
        <line x1={x0} y1={y0} x2={x0} y2={y1 - 10} stroke={INK} strokeWidth={1.25} />
        <line x1={x1} y1={y0} x2={x1} y2={y1 - 10} stroke={COUNTER} strokeWidth={1.25} />
        <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={INK} strokeWidth={1.25} />
        {[16, 20, 24].map((v) => (
          <g key={v}>
            <line x1={x0 - 4} y1={YL(v)} x2={x0} y2={YL(v)} stroke={INK} strokeWidth={1} />
            <Key x={x0 - 8} y={r2(YL(v) + 3.5)} anchor="end" fill={INK} size={9}>{v}</Key>
          </g>
        ))}
        {r.ticks.map((v) => (
          <g key={v}>
            <line x1={x1} y1={YR(v)} x2={x1 + 4} y2={YR(v)} stroke={COUNTER} strokeWidth={1} />
            <Key x={x1 + 8} y={r2(YR(v) + 3.5)} fill={COUNTER} size={9}>{v}</Key>
          </g>
        ))}
        <path d={path(AD_SPEND, YL)} fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <path d={path(SITE_VISITS, YR)} fill="none" stroke={COUNTER} strokeWidth={2} strokeLinejoin="round" />
        {AD_SPEND.map((v, i) => (
          <circle key={`a${i}`} cx={X(i)} cy={YL(v)} r={2.5} fill={INK} />
        ))}
        {SITE_VISITS.map((v, i) => (
          <circle key={`v${i}`} cx={X(i)} cy={YR(v)} r={2.5} fill={COUNTER} />
        ))}
        <Key x={X(0)} y={y0 + 16} anchor="middle" fill={INK3} size={9}>JAN</Key>
        <Key x={X(11)} y={y0 + 16} anchor="middle" fill={INK3} size={9}>DEC</Key>
      </Frame>
      <Segmented label="Right axis" options={RIGHT_AXES.map(({ id, label }) => ({ id, label }))} value={ax} onChange={setAx} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Discussion: One Dataset, Two Charts
   -------------------------------------------------------------------------- */

const REGION_SCORES = [
  { r: "North", v: 4.2 },
  { r: "East", v: 4.0 },
  { r: "South", v: 3.9 },
  { r: "West", v: 4.1 },
];

/** The discussion's two charts: the same four regional scores on axes from 0 to 5 and from 3.5 to 4.5. */
export function TwoChartsOneDataset() {
  const panels = [
    { x: 40, lo: 0, hi: 5, ticks: [0, 1, 2, 3, 4, 5] },
    { x: 440, lo: 3.5, hi: 4.5, ticks: [3.5, 3.75, 4, 4.25, 4.5] },
  ];
  const y0 = 166;
  const y1 = 16;
  return (
    <Frame
      width={800}
      height={190}
      label="The same satisfaction scores for four regions, North 4.2, East 4.0, South 3.9 and West 4.1, charted twice: on an axis from zero to five the bars look nearly equal; on an axis from 3.5 to 4.5 North's bar looks almost twice as long as South's"
    >
      {panels.map((p) => {
        const Y = (v: number) => r2(y0 - ((v - p.lo) / (p.hi - p.lo)) * (y0 - y1));
        return (
          <g key={p.x}>
            <line x1={p.x + 40} y1={y0} x2={p.x + 40} y2={y1} stroke={INK} strokeWidth={1.25} />
            {p.ticks.map((t) => (
              <g key={t}>
                <line x1={p.x + 36} y1={Y(t)} x2={p.x + 40} y2={Y(t)} stroke={INK} strokeWidth={1} />
                <Key x={p.x + 32} y={r2(Y(t) + 3.5)} anchor="end" fill={INK3} size={9}>{t}</Key>
              </g>
            ))}
            {REGION_SCORES.map((d, i) => {
              const x = p.x + 60 + i * 72;
              return (
                <g key={d.r}>
                  <rect x={x} y={Y(d.v)} width={46} height={r2(y0 - Y(d.v))} fill={INK3} fillOpacity={0.55} />
                  <Note x={x + 23} y={y0 + 17} anchor="middle" size={12} fill={INK2}>{d.r}</Note>
                </g>
              );
            })}
            <line x1={p.x + 40} y1={y0} x2={p.x + 350} y2={y0} stroke={INK} strokeWidth={1.25} />
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------------------------
   Sources of Error in AI-Assisted Analysis
   -------------------------------------------------------------------------- */

/** Twenty respondents per region: ratings 1–5, and how many were coded 99 for no answer. */
const REGION_ANSWERS = [
  { r: "North", valid: 20, sum: 82, missing: 0 },
  { r: "East", valid: 18, sum: 64.8, missing: 2 },
  { r: "South", valid: 19, sum: 74.1, missing: 1 },
  { r: "West", valid: 20, sum: 76, missing: 0 },
];

/**
 * A misread code: an AI assistant answers "What is the average satisfaction
 * rating by region?" on a five-point scale. Without the codebook it counts
 * the code 99 as a rating, so East, the region with the most unanswered
 * questions, comes out on top at 13.1. When the student supplies the
 * codebook, 99 is treated as missing, East falls to 3.6 on 18 respondents,
 * and North leads at 4.1.
 */
export function MissingCode() {
  const [on, setOn] = useState<"codebook"[]>([]);
  const coded = on.length > 0;
  const rows = REGION_ANSWERS.map((d) => ({
    ...d,
    n: coded ? d.valid : d.valid + d.missing,
    m: coded ? d.sum / d.valid : (d.sum + 99 * d.missing) / (d.valid + d.missing),
  }));
  const best = rows.reduce((a, b) => (b.m > a.m ? b : a));
  const max = coded ? 5 : 15;
  const bx = 96;
  const bw = 340;
  const W = (v: number) => r2((v / max) * bw);
  const top = 112;
  const rh = 34;

  return (
    <>
      <Frame
        width={560}
        height={top + 4 * rh + 30}
        label={`An AI assistant's answer to the question "What is the average satisfaction rating by region?" on a five-point scale. ${coded ? "With the codebook supplied, 99 is treated as missing" : "Without the codebook, the code 99 is counted as a rating"}: North ${rows[0].m.toFixed(1)}, East ${rows[1].m.toFixed(1)}, South ${rows[2].m.toFixed(1)}, West ${rows[3].m.toFixed(1)}. The assistant reports that ${best.r} has the highest average satisfaction`}
      >
        {/* the question and the assistant's fluent answer */}
        <rect x={10} y={10} width={540} height={top + 4 * rh + 10} fill={PAPER} stroke={RULE2} strokeWidth={1} />
        <Note x={30} y={40} size={13} fill={INK3} italic>What is the average satisfaction rating by region?</Note>
        <AiMark1 cx={38} cy={72} s={20} fill={SIGNAL} />
        <Note x={58} y={77} size={15} fill={INK}>
          {`${best.r} has the highest average satisfaction, at ${best.m.toFixed(1)}.`}
        </Note>
        <line x1={30} y1={94} x2={530} y2={94} stroke={RULE} strokeWidth={1} />

        {coded ? null : (
          <>
            <rect x={r2(bx + W(5))} y={top - 4} width={r2(W(max) - W(5))} height={4 * rh} fill={COUNTER_TINT} />
            <Key x={r2(bx + W(5) + 6)} y={top - 10} fill={COUNTER} size={9}>ABOVE THE SCALE MAXIMUM OF 5</Key>
          </>
        )}
        {rows.map((d, i) => {
          const y = top + i * rh;
          const hi = d === best;
          return (
            <g key={d.r}>
              <Note x={bx - 10} y={y + 17} anchor="end" size={13} fill={hi ? SIGNAL : INK2} weight={hi ? 600 : 400}>{d.r}</Note>
              <rect x={bx} y={y + 3} width={W(d.m)} height={20} fill={hi ? SIGNAL : INK3} fillOpacity={hi ? 1 : 0.5} />
              <Key x={r2(bx + W(d.m) + 8)} y={y + 18} fill={hi ? SIGNAL : INK} size={11} weight={700}>{d.m.toFixed(1)}</Key>
              <Key x={530} y={y + 18} anchor="end" fill={INK3} size={10}>{`N ${d.n}`}</Key>
            </g>
          );
        })}
        <line x1={bx} y1={top - 4} x2={bx} y2={top + 4 * rh - 4} stroke={INK} strokeWidth={1.25} />
        <Key x={530} y={top - 10} anchor="end" fill={INK3} size={9}>RESPONDENTS</Key>
      </Frame>
      <Toggles label="Codebook" options={[{ id: "codebook" as const, label: "99 = missing" }]} value={on} onChange={setOn} allowNone />
    </>
  );
}
