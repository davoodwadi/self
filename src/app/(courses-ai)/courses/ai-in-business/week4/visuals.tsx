"use client";

import React, { useState } from "react";
import {
  Bank,
  Calculator,
  CreditCard,
  DeviceMobile,
  FileText,
  Globe,
  Storefront,
  User,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, hash, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 4 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned
   or chosen. See the course CLAUDE.md.
   ========================================================================== */

const L = label(13);
const LS = label(11.5, 400);
const LB = label(14, 600);

/** Several lines of plate text, one tspan per line. */
function Lines({
  x,
  y,
  lines,
  style = L,
  fill = C.ink,
  dy = 17,
  anchor,
}: {
  x: number;
  y: number;
  lines: string[];
  style?: React.CSSProperties;
  fill?: string;
  dy?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fill={fill} style={style} textAnchor={anchor}>
      {lines.map((t, i) => (
        <tspan key={i} x={x} dy={i ? dy : 0}>
          {t}
        </tspan>
      ))}
    </text>
  );
}

/** A rounded frame, tinted when it carries the accent. */
function Box({
  x,
  y,
  w,
  h,
  tone = C.ink,
  fill,
  rx = 4,
  dash,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: string;
  fill?: string;
  rx?: number;
  dash?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={rx}
      fill={fill ?? (tone === C.accent ? C.tint : C.paper)}
      stroke={tone}
      strokeWidth={1.3}
      strokeDasharray={dash}
    />
  );
}

/** A Phosphor icon placed by its centre. */
function Icon({
  as,
  x,
  y,
  size = 34,
  tone = C.ink,
  weight = "duotone",
}: {
  as: React.ElementType;
  x: number;
  y: number;
  size?: number;
  tone?: string;
  weight?: "duotone" | "regular" | "fill";
}) {
  return React.createElement(as, {
    x: x - size / 2,
    y: y - size / 2,
    size,
    weight,
    color: tone,
  });
}

/** Standard normal cumulative distribution, from the Abramowitz and Stegun erf. */
function phi(z: number) {
  const t = 1 / (1 + 0.3275911 * (Math.abs(z) / Math.SQRT2));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-(z * z) / 2);
  return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
}

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/* --------------------------------------------------------------------------
   Distinctive Constraints of Financial AI
   -------------------------------------------------------------------------- */

/** A level beam balance with whatever sits in each pan. */
function Balance({
  cx,
  y,
  left,
  right,
  tone,
}: {
  cx: number;
  y: number;
  left: React.ReactNode;
  right: React.ReactNode;
  tone: string;
}) {
  const s = 58;
  return (
    <g>
      <path d={`M${cx} ${y + 4}l-9 46h18z`} fill={C.paper} stroke={tone} strokeWidth={1.3} />
      <line x1={cx - s} y1={y} x2={cx + s} y2={y} stroke={tone} strokeWidth={2} />
      {[-1, 1].map((d) => (
        <g key={d}>
          <line x1={cx + d * s} y1={y} x2={cx + d * s} y2={y + 44} stroke={tone} strokeWidth={1} />
          <line x1={cx + d * s - 22} y1={y + 44} x2={cx + d * s + 22} y2={y + 44} stroke={tone} strokeWidth={2} />
        </g>
      ))}
      <g transform={`translate(${cx - s} ${y + 43})`}>{left}</g>
      <g transform={`translate(${cx + s} ${y + 43})`}>{right}</g>
    </g>
  );
}

export function FinanceConstraints() {
  const x0 = 186;
  const cw = 196;
  const cols = ["error cost asymmetry", "latency", "legal explainability", "non-stationary markets"];
  const rows = [
    { y: 50, name: ["consumer", "web AI"], tone: C.ink3 },
    { y: 222, name: ["regulated", "financial AI"], tone: C.accent },
  ];
  // latency ruler, 10 ms to 10 s on a log scale
  const lx = (ms: number, c: number) => r2(c + 14 + ((Math.log10(ms) - 1) / 3) * 158);
  return (
    <Plate
      w={970}
      h={384}
      title="Consumer web AI against regulated financial AI. Error cost: a wrong suggestion costs about one click either way, while the interest earned on twenty repaid loans only balances one default. Latency: a chat reply takes one to five seconds, a payment decision 50 to 150 milliseconds. Explainability: a recommendation needs no reasons, a credit decline letter must state its principal reasons. Markets: consumer patterns repeat, while a financial relationship learned in the past shifts after deployment"
    >
      {cols.map((c, i) => (
        <text key={c} x={x0 + i * cw + 8} y={26} fill={C.ink} style={LB}>
          {c}
        </text>
      ))}
      {rows.map((r) => (
        <g key={r.y}>
          <line x1={0} y1={r.y - 8} x2={970} y2={r.y - 8} stroke={C.rule} />
          <Lines x={0} y={r.y + 64} lines={r.name} style={label(15, 600)} fill={r.tone === C.accent ? C.accent : C.ink} dy={19} />
        </g>
      ))}

      {/* error cost asymmetry */}
      {(() => {
        const cx = x0 + cw / 2;
        return (
          <g>
            <Balance
              cx={cx}
              y={rows[0].y + 22}
              tone={C.ink3}
              left={<circle cx={0} cy={-8} r={8} fill={C.grey} stroke={C.ink3} />}
              right={<circle cx={0} cy={-8} r={8} fill={C.grey} stroke={C.ink3} />}
            />
            <text x={cx - 58} y={rows[0].y + 92} textAnchor="middle" fill={C.ink3} style={LS}>
              one click
            </text>
            <text x={cx + 58} y={rows[0].y + 92} textAnchor="middle" fill={C.ink3} style={LS}>
              one click
            </text>
            <Balance
              cx={cx}
              y={rows[1].y + 34}
              tone={C.ink}
              left={
                <g>
                  {Array.from({ length: 20 }, (_, k) => {
                    const col = Math.floor(k / 5);
                    const row = k % 5;
                    return (
                      <ellipse
                        key={k}
                        cx={-15 + col * 10}
                        cy={-4 - row * 5}
                        rx={4.6}
                        ry={2.4}
                        fill={C.tint}
                        stroke={C.accent}
                        strokeWidth={1}
                      />
                    );
                  })}
                </g>
              }
              right={<rect x={-17} y={-30} width={34} height={30} fill={C.ink} />}
            />
            <Lines x={cx - 58} y={rows[1].y + 110} lines={["interest on", "20 repaid loans"]} style={LS} fill={C.accent} anchor="middle" dy={14} />
            <Lines x={cx + 58} y={rows[1].y + 110} lines={["principal of", "1 default"]} style={LS} fill={C.ink} anchor="middle" dy={14} />
          </g>
        );
      })()}

      {/* latency */}
      {rows.map((r, i) => {
        const c = x0 + cw;
        const yb = r.y + 70;
        const band = i === 0 ? [1000, 5000] : [50, 150];
        return (
          <g key={r.y}>
            <line x1={lx(10, c)} y1={yb} x2={lx(10000, c)} y2={yb} stroke={C.ink3} />
            {[10, 100, 1000, 10000].map((ms) => (
              <g key={ms}>
                <line x1={lx(ms, c)} y1={yb} x2={lx(ms, c)} y2={yb + 5} stroke={C.ink3} />
                <text x={lx(ms, c)} y={yb + 20} textAnchor="middle" fill={C.ink3} style={LS}>
                  {ms < 1000 ? `${ms} ms` : `${ms / 1000} s`}
                </text>
              </g>
            ))}
            <rect
              x={lx(band[0], c)}
              y={yb - 22}
              width={r2(lx(band[1], c) - lx(band[0], c))}
              height={16}
              fill={i ? C.accent : C.grey}
              stroke={i ? C.accent : C.ink3}
            />
            <text
              x={r2((lx(band[0], c) + lx(band[1], c)) / 2)}
              y={yb - 32}
              textAnchor="middle"
              fill={i ? C.accent : C.ink3}
              style={i ? label(13, 600) : L}
            >
              {i ? "50 to 150 ms" : "1 to 5 s"}
            </text>
          </g>
        );
      })}

      {/* legal explainability */}
      {(() => {
        const c = x0 + 2 * cw + 14;
        const y1 = rows[0].y + 14;
        const y2 = rows[1].y + 6;
        return (
          <g>
            <Box x={c} y={y1} w={164} h={92} tone={C.ink3} />
            <rect x={c + 12} y={y1 + 12} width={46} height={66} rx={2} fill={C.grey} />
            <text x={c + 68} y={y1 + 30} fill={C.ink3} style={label(12, 600)}>
              Recommended
            </text>
            <text x={c + 68} y={y1 + 46} fill={C.ink3} style={label(12, 600)}>
              for you
            </text>
            {[0, 1, 2, 3, 4].map((k) => (
              <path
                key={k}
                d={`M${Array.from({ length: 10 }, (_, q) => {
                  const a = -Math.PI / 2 + (q * Math.PI) / 5;
                  const rr = q % 2 ? 2.4 : 5.6;
                  return `${r2(c + 74 + k * 14 + rr * Math.cos(a))} ${r2(y1 + 70 + rr * Math.sin(a))}`;
                }).join("L")}Z`}
                fill={C.ink3}
              />
            ))}
            <path d={`M${c} ${y2}h148l16 16v114h-164z`} fill={C.tint} stroke={C.accent} strokeWidth={1.3} />
            <path d={`M${c + 148} ${y2}v16h16`} fill="none" stroke={C.accent} strokeWidth={1.1} />
            <text x={c + 12} y={y2 + 24} fill={C.ink} style={label(12.5, 700)}>
              Application declined
            </text>
            <text x={c + 12} y={y2 + 46} fill={C.ink2} style={label(11.5, 600)}>
              Principal reasons:
            </text>
            <Lines x={c + 12} y={y2 + 64} lines={["1. high credit utilization", "2. recent delinquency", "3. short account history"]} style={LS} fill={C.ink2} dy={16} />
          </g>
        );
      })()}

      {/* non-stationary markets */}
      {rows.map((r, i) => {
        const c = x0 + 3 * cw + 14;
        const yt = r.y + 6;
        const yb = r.y + 100;
        const mid = c + 96;
        const wave = (x: number) => r2(yt + 48 - 22 * Math.sin((x - c) / 15));
        const pts = (a: number, b: number, f: (x: number) => number) => {
          const p: string[] = [];
          for (let x = a; x <= b; x += 4) p.push(`${x} ${r2(f(x))}`);
          return `M${p.join("L")}`;
        };
        const past = (x: number) => yb - 14 - (x - c) * 0.42;
        const shifted = (x: number) => past(mid) + (x - mid) * 0.5;
        return (
          <g key={r.y}>
            <line x1={c} y1={yb} x2={c + 172} y2={yb} stroke={C.ink3} />
            <line x1={mid} y1={yt - 4} x2={mid} y2={yb} stroke={C.rule} strokeDasharray="3 3" />
            <text x={c + 46} y={yb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
              trained
            </text>
            <text x={mid + 42} y={yb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
              deployed
            </text>
            {i === 0 ? (
              <path d={pts(c, c + 172, wave)} fill="none" stroke={C.ink3} strokeWidth={1.8} />
            ) : (
              <g>
                <path d={pts(c, mid, past)} fill="none" stroke={C.ink} strokeWidth={1.8} />
                <path d={pts(mid, c + 172, past)} fill="none" stroke={C.ink3} strokeWidth={1.4} strokeDasharray="4 3" />
                <path d={pts(mid, c + 172, shifted)} fill="none" stroke={C.accent} strokeWidth={2.2} />
              </g>
            )}
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Probability of Default, Loss Given Default, and Expected Loss
   -------------------------------------------------------------------------- */

export function ExpectedLoss() {
  const y = 64;
  return (
    <Plate
      w={970}
      h={262}
      title="Expected loss on one credit line: probability of default 4 percent, four borrowers in a hundred; exposure at default 18,000 dollars drawn on a 25,000 dollar line; loss given default 45 percent of that exposure after recovery; expected loss 4 percent times 18,000 dollars times 45 percent equals 324 dollars"
    >
      {/* PD */}
      <text x={0} y={22} fill={C.ink} style={LB}>
        probability of default
      </text>
      {Array.from({ length: 100 }, (_, k) => {
        const d = [23, 47, 58, 86].includes(k);
        return (
          <circle
            key={k}
            cx={7 + (k % 10) * 16}
            cy={y + 7 + Math.floor(k / 10) * 13}
            r={4.6}
            fill={d ? C.ink : C.paper}
            stroke={d ? C.ink : C.ink3}
            strokeWidth={1}
          />
        );
      })}
      <text x={0} y={216} fill={C.ink} style={label(22, 700)}>
        4%
      </text>
      <text x={0} y={238} fill={C.ink3} style={LS}>
        within twelve months
      </text>

      <text x={190} y={150} textAnchor="middle" fill={C.ink3} style={label(24, 400)}>
        ×
      </text>

      {/* EAD */}
      <text x={222} y={22} fill={C.ink} style={LB}>
        exposure at default
      </text>
      <rect x={222} y={y + 30} width={200} height={34} fill={C.paper} stroke={C.ink3} strokeDasharray="4 3" />
      <rect x={222} y={y + 30} width={144} height={34} fill={C.ink} />
      <text x={222} y={y + 20} fill={C.ink3} style={LS}>
        credit line $25,000
      </text>
      <text x={222} y={y + 84} fill={C.ink2} style={LS}>
        drawn when default occurs
      </text>
      <text x={222} y={216} fill={C.ink} style={label(22, 700)}>
        $18,000
      </text>

      <text x={466} y={150} textAnchor="middle" fill={C.ink3} style={label(24, 400)}>
        ×
      </text>

      {/* LGD */}
      <text x={500} y={22} fill={C.ink} style={LB}>
        loss given default
      </text>
      <rect x={500} y={y + 30} width={79} height={34} fill={C.grey} stroke={C.ink3} />
      <rect x={579} y={y + 30} width={65} height={34} fill={C.ink} />
      <text x={539.5} y={y + 20} textAnchor="middle" fill={C.ink3} style={LS}>
        recovered
      </text>
      <text x={611.5} y={y + 20} textAnchor="middle" fill={C.ink} style={label(11.5, 600)}>
        lost
      </text>
      <text x={500} y={y + 84} fill={C.ink2} style={LS}>
        after collateral and collection
      </text>
      <text x={500} y={216} fill={C.ink} style={label(22, 700)}>
        45%
      </text>

      <text x={706} y={150} textAnchor="middle" fill={C.ink3} style={label(24, 400)}>
        =
      </text>

      {/* EL */}
      <rect x={740} y={y - 6} width={230} height={186} rx={4} fill={C.tint} stroke={C.accent} strokeWidth={1.3} />
      <text x={758} y={22} fill={C.accent} style={LB}>
        expected loss
      </text>
      <text x={758} y={y + 48} fill={C.accent} style={label(40, 700)}>
        $324
      </text>
      <Lines x={758} y={y + 88} lines={["sets the loan's risk price", "and the loss provision"]} style={L} fill={C.ink2} dy={18} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Traditional Scorecards Versus Machine Learning Underwriting
   -------------------------------------------------------------------------- */

const logistic = (z: number) => 1 / (1 + Math.exp(-z));
/** Scorecard: spending and unpaid balance each add points on their own. */
const scoreLinear = (s: number, r: number) => logistic(-3.9 + 1.3 * s + 2.6 * (1 - r));
/** Trees: spending raises risk only when the balance is not repaid. */
const scoreTrees = (s: number, r: number) =>
  r >= 0.75 ? (s >= 0.5 ? 0.012 : 0.025) : r >= 0.35 ? (s >= 0.5 ? 0.1 : 0.06) : s >= 0.5 ? 0.31 : 0.09;

export function ScorecardVsTrees() {
  const N = 8;
  const mw = 300;
  const mh = 184;
  const maps = [
    { x: 92, name: "logistic regression scorecard", f: scoreLinear },
    { x: 590, name: "gradient-boosted trees", f: scoreTrees },
  ];
  const people = [
    { s: 0.87, r: 0.94, lit: true },
    { s: 0.87, r: 0.12, lit: false },
  ];
  const yt = 40;
  return (
    <Plate
      w={970}
      h={256}
      title={`Default risk across monthly card spending and share of the balance repaid. The scorecard adds points for each variable on its own, so the high spender who repays in full gets ${(scoreLinear(0.87, 0.94) * 100).toFixed(0)} percent, more than a low spender. The trees find the interaction: the same high spender who repays in full gets ${(scoreTrees(0.87, 0.94) * 100).toFixed(0)} percent, while a high spender with a rising revolving balance gets ${(scoreTrees(0.87, 0.12) * 100).toFixed(0)} percent`}
    >
      {maps.map((m) => {
        const cell = (i: number, j: number) => {
          const s = (i + 0.5) / N;
          const r = (j + 0.5) / N;
          return m.f(s, r);
        };
        return (
          <g key={m.x}>
            <text x={m.x} y={22} fill={C.ink} style={LB}>
              {m.name}
            </text>
            {Array.from({ length: N * N }, (_, k) => {
              const i = k % N;
              const j = Math.floor(k / N);
              const p = cell(i, j);
              return (
                <rect
                  key={k}
                  x={r2(m.x + (i * mw) / N)}
                  y={r2(yt + mh - ((j + 1) * mh) / N)}
                  width={r2(mw / N)}
                  height={r2(mh / N)}
                  fill={`rgba(26, 29, 36, ${r2(0.03 + p * 1.7)})`}
                  stroke={C.paper}
                  strokeWidth={0.8}
                />
              );
            })}
            <text x={m.x + mw / 2} y={yt + mh + 20} textAnchor="middle" fill={C.ink3} style={LS}>
              monthly card spending →
            </text>
            {people.map((p) => {
              const cx = r2(m.x + p.s * mw);
              const cy = r2(yt + mh - p.r * mh);
              const v = m.f(p.s, p.r);
              return (
                <g key={p.r}>
                  <circle cx={cx} cy={cy} r={8} fill={p.lit ? C.accent : C.paper} stroke={p.lit ? C.paper : C.ink} strokeWidth={2} />
                  <rect x={cx + 14} y={cy - 11} width={44} height={22} rx={3} fill={C.paper} stroke={p.lit ? C.accent : C.ink3} />
                  <text x={cx + 36} y={cy + 5} textAnchor="middle" fill={p.lit ? C.accent : C.ink} style={label(13, 700)}>
                    {(v * 100).toFixed(0)}%
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      {/* shared y axis meaning, written once at each map's side */}
      {maps.map((m) => (
        <g key={m.x}>
          <Lines x={m.x - 10} y={yt + 14} lines={["repays", "in full"]} style={LS} fill={C.ink3} anchor="end" dy={14} />
          <Lines x={m.x - 10} y={yt + mh - 18} lines={["rising", "balance"]} style={LS} fill={C.ink3} anchor="end" dy={14} />
        </g>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Alternative Credit Data and Reject Inference
   -------------------------------------------------------------------------- */

export function RejectInference() {
  const cols = 20;
  const rows = 5;
  const cut = 12; // columns approved under past rules
  const g = 47;
  const x0 = 12;
  const y0 = 70;
  const cutX = x0 + cut * g - 4;
  return (
    <Plate
      w={970}
      h={354}
      title="One hundred past applicants ordered by their old score. The sixty approved under past rules show their outcome, mostly repaid with a few defaults. The forty rejected applicants have no recorded outcome. A model trained only on the approved outcomes is then applied to the rejected segment"
    >
      <text x={x0} y={22} fill={C.ink} style={LB}>
        approved under past rules
      </text>
      <text x={x0} y={42} fill={C.ink3} style={LS}>
        repayment or default recorded
      </text>
      <text x={cutX + 18} y={22} fill={C.accent} style={LB}>
        rejected under past rules
      </text>
      <text x={cutX + 18} y={42} fill={C.accent} style={LS}>
        true outcome never observed
      </text>
      <line x1={cutX} y1={6} x2={cutX} y2={y0 + rows * g} stroke={C.ink} strokeWidth={1.6} />
      {Array.from({ length: cols * rows }, (_, k) => {
        const i = Math.floor(k / rows);
        const j = k % rows;
        const cx = x0 + i * g + 14;
        const cy = y0 + j * g + 14;
        if (i >= cut) {
          return (
            <g key={k}>
              <circle cx={cx} cy={cy} r={13} fill={C.paper} stroke={C.accent} strokeWidth={1.3} strokeDasharray="3 2.5" />
              <text x={cx} y={cy + 5} textAnchor="middle" fill={C.accent} style={label(14, 700)}>
                ?
              </text>
            </g>
          );
        }
        return [7, 23, 31, 44, 52].includes(k) ? (
          <g key={k}>
            <circle cx={cx} cy={cy} r={13} fill={C.ink} />
            <path d={`M${cx - 5} ${cy - 5}l10 10M${cx + 5} ${cy - 5}l-10 10`} stroke={C.paper} strokeWidth={2} strokeLinecap="round" />
          </g>
        ) : (
          <g key={k}>
            <circle cx={cx} cy={cy} r={13} fill={C.paper} stroke={C.ink3} strokeWidth={1.2} />
            <path d={`M${cx - 6} ${cy}l4 4.5l8-9`} fill="none" stroke={C.ink3} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {/* what the model learns from and where it is used */}
      <path d={`M${x0} ${y0 + rows * g + 8}v8h${cutX - x0 - 12}v-8`} fill="none" stroke={C.ink} />
      <text x={x0} y={y0 + rows * g + 36} fill={C.ink} style={L}>
        a naive model is trained only on these outcomes
      </text>
      <path d={`M${cutX + 12} ${y0 + rows * g + 8}v8h${x0 + cols * g - cutX - 24}v-8`} fill="none" stroke={C.accent} />
      <text x={cutX + 12} y={y0 + rows * g + 36} fill={C.accent} style={label(13, 600)}>
        and then applied here
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Extreme Class Imbalance and Precision-Recall Trade-Offs (interactive)
   -------------------------------------------------------------------------- */

const PAY = 1_000_000;
const FRAUD = 1_000;
const FRAUD_MEAN = 3.5;
const LOSS_FRAUD = 250;
const LOSS_DECLINE = 30;

function fraudAt(t: number) {
  const tp = FRAUD * (1 - phi(t - FRAUD_MEAN));
  const fp = (PAY - FRAUD) * (1 - phi(t));
  const fn = FRAUD - tp;
  return {
    tp,
    fp,
    fn,
    recall: tp / FRAUD,
    precision: tp + fp > 0 ? tp / (tp + fp) : 1,
    accuracy: (PAY - fn - fp) / PAY,
    cost: fn * LOSS_FRAUD + fp * LOSS_DECLINE,
  };
}

const T_MIN = 2;
const T_MAX = 5;
const T_GRID = Array.from({ length: 61 }, (_, k) => T_MIN + k * 0.05);
const T_BEST = T_GRID.reduce((b, t) => (fraudAt(t).cost < fraudAt(b).cost ? t : b), T_MIN);

export function FraudThresholdLab() {
  const [t, setT] = useState(2.5);
  const m = fraudAt(t);
  // precision-recall chart
  const px0 = 52;
  const px1 = 250;
  const pyt = 34;
  const pyb = 214;
  const PX = (v: number) => r2(px0 + v * (px1 - px0));
  const PY = (v: number) => r2(pyb - v * (pyb - pyt));
  // cost chart
  const cx0 = 340;
  const cx1 = 552;
  const CX = (v: number) => r2(cx0 + ((v - T_MIN) / (T_MAX - T_MIN)) * (cx1 - cx0));
  const CMAX = 800_000;
  const CY = (v: number) => r2(pyb - (Math.min(v, CMAX) / CMAX) * (pyb - pyt));
  const score = (v: number) => Math.round(v * 20);
  return (
    <Plate
      w={560}
      h={560}
      title={`Interactive: drag the decline threshold. At a risk score of ${score(t)}, out of 1,000,000 payments with 1,000 frauds, the model stops ${Math.round(m.tp)} frauds and lets ${Math.round(m.fn)} through, falsely declines ${Math.round(m.fp).toLocaleString("en-US")} legitimate payments, precision is ${Math.round(m.precision * 100)} percent, recall ${Math.round(m.recall * 100)} percent, accuracy stays near 99.9 percent, and total cost is ${usd(m.cost)}`}
    >
      {/* precision against recall */}
      <text x={0} y={16} fill={C.ink} style={L}>
        precision against recall
      </text>
      <path
        d={`M${T_GRID.map((v) => {
          const f = fraudAt(v);
          return `${PX(f.recall)} ${PY(f.precision)}`;
        }).join("L")}`}
        fill="none"
        stroke={C.ink3}
        strokeWidth={1.6}
      />
      <line x1={px0} y1={pyb} x2={px1} y2={pyb} stroke={C.ink} />
      <line x1={px0} y1={pyt} x2={px0} y2={pyb} stroke={C.ink} />
      {[0, 0.5, 1].map((v) => (
        <g key={v}>
          <text x={px0 - 8} y={PY(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {v * 100}%
          </text>
          <text x={PX(v)} y={pyb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
            {v * 100}%
          </text>
        </g>
      ))}
      <text x={px1} y={pyb + 36} textAnchor="end" fill={C.ink3} style={LS}>
        recall
      </text>
      <circle cx={PX(m.recall)} cy={PY(m.precision)} r={6.5} fill={C.accent} />

      {/* total cost against threshold */}
      <text x={cx0 - 40} y={16} fill={C.ink} style={L}>
        total cost against threshold
      </text>
      <path
        d={`M${T_GRID.map((v) => `${CX(v)} ${CY(fraudAt(v).cost)}`).join("L")}`}
        fill="none"
        stroke={C.ink3}
        strokeWidth={1.6}
      />
      <line x1={cx0} y1={pyb} x2={cx1} y2={pyb} stroke={C.ink} />
      <line x1={cx0} y1={pyt} x2={cx0} y2={pyb} stroke={C.ink} />
      {[0, 400_000, 800_000].map((v) => (
        <text key={v} x={cx0 - 8} y={CY(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v === 0 ? "$0" : `$${v / 1000}k`}
        </text>
      ))}
      {[2, 3, 4, 5].map((v) => (
        <text key={v} x={CX(v)} y={pyb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {score(v)}
        </text>
      ))}
      <text x={cx1} y={pyb + 36} textAnchor="end" fill={C.ink3} style={LS}>
        risk score threshold
      </text>
      <line x1={CX(T_BEST)} y1={pyt} x2={CX(T_BEST)} y2={pyb} stroke={C.rule} strokeDasharray="4 3" />
      <text x={CX(T_BEST) + 6} y={pyb - 8} fill={C.ink3} style={LS}>
        lowest cost
      </text>
      <circle cx={CX(t)} cy={CY(m.cost)} r={6.5} fill={C.accent} />

      {/* the counts */}
      <text x={0} y={282} fill={C.ink3} style={LS}>
        per 1,000,000 payments, 1,000 of them fraud
      </text>
      {[
        { k: "fraud stopped", v: Math.round(m.tp).toLocaleString("en-US") },
        { k: `fraud let through (× $${LOSS_FRAUD})`, v: Math.round(m.fn).toLocaleString("en-US") },
        { k: `legitimate cardholders declined (× $${LOSS_DECLINE})`, v: Math.round(m.fp).toLocaleString("en-US") },
        { k: "precision | recall", v: `${Math.round(m.precision * 100)}% | ${Math.round(m.recall * 100)}%` },
        { k: "accuracy", v: `${(m.accuracy * 100).toFixed(1)}%` },
      ].map((row, i) => (
        <g key={row.k}>
          <line x1={0} y1={292 + i * 28} x2={552} y2={292 + i * 28} stroke={C.rule} />
          <text x={0} y={311 + i * 28} fill={C.ink} style={L}>
            {row.k}
          </text>
          <text x={552} y={311 + i * 28} textAnchor="end" fill={C.ink} style={label(13.5, 600)}>
            {row.v}
          </text>
        </g>
      ))}
      <line x1={0} y1={432} x2={552} y2={432} stroke={C.ink} />
      <text x={0} y={456} fill={C.ink} style={LB}>
        total economic cost
      </text>
      <text x={552} y={458} textAnchor="end" fill={C.accent} style={label(22, 700)}>
        {usd(m.cost)}
      </text>

      <text x={0} y={506} fill={C.ink} style={L}>
        decline above
      </text>
      <Knob x={130} y={501} len={330} value={t} min={T_MIN} max={T_MAX} step={0.05} onChange={setT} label="Risk score threshold for declining a payment" />
      <text x={482} y={506} fill={C.accent} style={LB}>
        {score(t)}
      </text>
      <text x={130} y={538} textAnchor="middle" fill={C.ink3} style={LS}>
        catch more fraud
      </text>
      <text x={460} y={538} textAnchor="middle" fill={C.ink3} style={LS}>
        decline fewer cardholders
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Supervised, Unsupervised, and Graph Models in Fraud Prevention
   -------------------------------------------------------------------------- */

export function FraudRing() {
  // ordinary customers: each with their own card, phone and merchant
  const normal = [
    { x: 40, y: 72 },
    { x: 40, y: 160 },
    { x: 40, y: 248 },
  ];
  const ring = Array.from({ length: 5 }, (_, k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5;
    return { x: r2(620 + 128 * Math.cos(a)), y: r2(166 + 100 * Math.sin(a)) };
  });
  const phone = { x: 582, y: 166 };
  const ip = { x: 658, y: 166 };
  const mule = { x: 860, y: 166 };
  return (
    <Plate
      w={970}
      h={300}
      title="Ordinary accounts each connect to their own card, phone and merchant. Five accounts that each look normal on their own all log in from one shared phone and one shared IP address and send money to the same receiving account, which forwards it to a bank: a coordinated fraud ring visible only in the graph"
    >
      <text x={0} y={22} fill={C.ink3} style={LB}>
        scored in isolation
      </text>
      {normal.map((n, i) => (
        <g key={i}>
          <line x1={n.x + 22} y1={n.y} x2={n.x + 86} y2={n.y} stroke={C.ink3} />
          <line x1={n.x + 118} y1={n.y} x2={n.x + 182} y2={n.y} stroke={C.ink3} />
          <line x1={n.x + 214} y1={n.y} x2={n.x + 278} y2={n.y} stroke={C.ink3} />
          <Icon as={User} x={n.x} y={n.y} size={36} tone={C.ink3} />
          <Icon as={CreditCard} x={n.x + 102} y={n.y} size={30} tone={C.ink3} />
          <Icon as={DeviceMobile} x={n.x + 198} y={n.y} size={30} tone={C.ink3} />
          <Icon as={Storefront} x={n.x + 294} y={n.y} size={30} tone={C.ink3} />
        </g>
      ))}
      <line x1={400} y1={40} x2={400} y2={290} stroke={C.rule} />

      <text x={430} y={22} fill={C.accent} style={LB}>
        linked by shared attributes and transfers
      </text>
      {ring.map((p, k) => (
        <g key={k}>
          <line x1={p.x} y1={p.y} x2={phone.x} y2={phone.y} stroke={C.accent} strokeWidth={1.4} />
          <line x1={p.x} y1={p.y} x2={ip.x} y2={ip.y} stroke={C.accent} strokeWidth={1.4} />
        </g>
      ))}
      {ring.map((p, k) => {
        const a = Math.atan2(mule.y - p.y, mule.x - p.x);
        return (
          <path
            key={k}
            d={`M${r2(p.x + 22 * Math.cos(a))} ${r2(p.y + 22 * Math.sin(a))}Q${r2((p.x + mule.x) / 2)} ${r2(p.y < mule.y ? p.y - 6 : p.y + 6)} ${r2(mule.x - 26)} ${mule.y}`}
            fill="none"
            stroke={C.ink}
            strokeWidth={1.1}
            strokeDasharray="5 3"
          />
        );
      })}
      <circle cx={phone.x} cy={phone.y} r={22} fill={C.paper} stroke={C.accent} strokeWidth={1.4} />
      <Icon as={DeviceMobile} x={phone.x} y={phone.y} size={28} tone={C.accent} />
      <circle cx={ip.x} cy={ip.y} r={22} fill={C.paper} stroke={C.accent} strokeWidth={1.4} />
      <Icon as={Globe} x={ip.x} y={ip.y} size={28} tone={C.accent} />
      <text x={phone.x - 30} y={phone.y + 44} textAnchor="end" fill={C.accent} style={label(12, 600)}>
        one phone
      </text>
      <text x={ip.x + 30} y={ip.y + 44} fill={C.accent} style={label(12, 600)}>
        one IP address
      </text>
      {ring.map((p, k) => (
        <g key={k}>
          <circle cx={p.x} cy={p.y} r={21} fill={C.paper} />
          <Icon as={User} x={p.x} y={p.y} size={36} tone={C.ink} />
        </g>
      ))}
      <path d={`M${mule.x - 28} ${mule.y}l-9 -5v10z`} fill={C.ink} />
      <circle cx={mule.x} cy={mule.y} r={22} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      <Icon as={User} x={mule.x} y={mule.y} size={32} tone={C.ink} />
      <Lines x={mule.x} y={mule.y + 46} lines={["receiving", "account"]} style={LS} fill={C.ink} anchor="middle" dy={14} />
      <Arrow x1={mule.x + 24} y1={mule.y - 24} x2={mule.x + 68} y2={mule.y - 82} tone={C.ink} width={1.2} />
      <Icon as={Bank} x={mule.x + 82} y={mule.y - 106} size={34} tone={C.ink} />
      <text x={740} y={72} textAnchor="middle" fill={C.ink} style={LS}>
        money transfers
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Low Signal-to-Noise Ratios and Backtest Overfitting (interactive)
   -------------------------------------------------------------------------- */

const BT_SEED = 1115;
const BT_N = 200;
const BT_MONTHS = 84;
const BT_IN = 60;
const btGauss = (i: number) => {
  const u = Math.max(1e-9, hash(BT_SEED * 100000 + i * 2 + 1));
  const v = hash(BT_SEED * 100000 + i * 2 + 2);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
/** Cumulative monthly returns in percent: no true skill, minus trading costs. */
const BT_PATHS = Array.from({ length: BT_N }, (_, s) => {
  let c = 0;
  const p = [0];
  for (let m = 0; m < BT_MONTHS; m++) {
    c += btGauss(s * BT_MONTHS + m) * 3 - 0.15;
    p.push(c);
  }
  return p;
});
const BT_STEPS = [1, 2, 5, 10, 20, 50, 100, 200];

export function BacktestLab() {
  const [k, setK] = useState(0);
  const n = BT_STEPS[k];
  let best = 0;
  for (let i = 1; i < n; i++) if (BT_PATHS[i][BT_IN] > BT_PATHS[best][BT_IN]) best = i;
  const p = BT_PATHS[best];
  const inYr = p[BT_IN] / 5;
  const liveYr = (p[BT_MONTHS] - p[BT_IN]) / 2;
  const x0 = 52;
  const x1 = 552;
  const yt = 34;
  const yb = 304;
  const X = (m: number) => r2(x0 + (m / BT_MONTHS) * (x1 - x0));
  const Y = (v: number) => r2(yt + ((90 - Math.max(-90, Math.min(90, v))) / 180) * (yb - yt));
  const line = (q: number[], a: number, b: number) =>
    `M${q.slice(a, b + 1).map((v, m) => `${X(a + m)} ${Y(v)}`).join("L")}`;
  return (
    <Plate
      w={560}
      h={520}
      title={`Interactive: choose how many trading models are tested. None has real predictive power. With ${n} tested, the best backtest returns ${inYr.toFixed(1)} percent a year over five years, and the same model returns ${liveYr.toFixed(1)} percent a year over two live years`}
    >
      <text x={0} y={16} fill={C.ink} style={L}>
        cumulative return
      </text>
      <rect x={X(BT_IN)} y={yt} width={r2(x1 - X(BT_IN))} height={yb - yt} fill={C.grey} opacity={0.5} />
      <text x={r2((X(0) + X(BT_IN)) / 2)} y={yt + 16} textAnchor="middle" fill={C.ink3} style={LS}>
        backtest, five years
      </text>
      <text x={r2((X(BT_IN) + x1) / 2)} y={yt + 16} textAnchor="middle" fill={C.ink3} style={LS}>
        live, two years
      </text>
      {BT_PATHS.slice(0, n).map((q, i) =>
        i === best ? null : (
          <path key={i} d={line(q, 0, BT_IN)} fill="none" stroke={C.ink3} strokeWidth={0.8} opacity={n > 50 ? 0.35 : 0.6} />
        ),
      )}
      <line x1={x0} y1={Y(0)} x2={x1} y2={Y(0)} stroke={C.ink3} strokeDasharray="3 3" />
      <path d={line(p, 0, BT_IN)} fill="none" stroke={C.accent} strokeWidth={2.4} />
      <path d={line(p, BT_IN, BT_MONTHS)} fill="none" stroke={C.ink} strokeWidth={2.4} />
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.ink} />
      <line x1={x0} y1={yt} x2={x0} y2={yb} stroke={C.ink} />
      {[-80, -40, 0, 40, 80].map((v) => (
        <text key={v} x={x0 - 8} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v > 0 ? `+${v}%` : v < 0 ? `−${-v}%` : "0%"}
        </text>
      ))}
      {[0, 2, 4, 6].map((yr) => (
        <text key={yr} x={X(yr * 12)} y={yb + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          year {yr}
        </text>
      ))}

      {/* the payoff */}
      {[
        { k: "best backtest, per year", v: inYr, tone: C.accent },
        { k: "same model live, per year", v: liveYr, tone: C.ink },
      ].map((row, i) => (
        <g key={row.k}>
          <line x1={0} y1={350 + i * 40} x2={552} y2={350 + i * 40} stroke={C.rule} />
          <text x={0} y={376 + i * 40} fill={row.tone} style={label(14, 600)}>
            {row.k}
          </text>
          <text x={552} y={378 + i * 40} textAnchor="end" fill={row.tone} style={label(22, 700)}>
            {row.v >= 0 ? `+${row.v.toFixed(1)}%` : `−${(-row.v).toFixed(1)}%`}
          </text>
        </g>
      ))}

      <text x={0} y={472} fill={C.ink} style={L}>
        models tested
      </text>
      <Knob x={130} y={467} len={330} value={k} min={0} max={BT_STEPS.length - 1} step={1} onChange={setK} label="Number of trading models tested" />
      <text x={482} y={472} fill={C.accent} style={LB}>
        {n}
      </text>
      {BT_STEPS.map((s, i) => (
        <text key={s} x={r2(130 + (i / (BT_STEPS.length - 1)) * 330)} y={500} textAnchor="middle" fill={C.ink3} style={LS}>
          {s}
        </text>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Financial Sentiment and Retrieval over Unstructured Filings
   -------------------------------------------------------------------------- */

export function FilingRetrieval() {
  const docs = ["10-K annual filing", "credit agreement", "earnings call transcript"];
  const extracts = [
    { text: "Total debt $4.2 billion", cite: "10-K, p. 61, Table 8" },
    { text: "Adjusted EBITDA $1.4 billion", cite: "10-K, p. 44, Table 5" },
    { text: "Leverage covenant: at most 3.5×", cite: "credit agreement, p. 112, §7.1" },
  ];
  return (
    <Plate
      w={970}
      h={300}
      title="Retrieval over filings: from a 10-K, a credit agreement and an earnings call transcript, the system retrieves total debt of 4.2 billion dollars, adjusted EBITDA of 1.4 billion dollars and a leverage covenant of at most 3.5 times, each with its exact page and table. A calculator tool, not the language model, computes debt over EBITDA as 3.0 times, inside the covenant"
    >
      {/* the source documents */}
      {docs.map((d, i) => {
        const y = 24 + i * 88;
        return (
          <g key={d}>
            <path d={`M0 ${y}h130l14 14v58h-144z`} fill={C.paper} stroke={C.ink} strokeWidth={1.2} />
            <path d={`M130 ${y}v14h14`} fill="none" stroke={C.ink} strokeWidth={1} />
            <Icon as={FileText} x={20} y={y + 22} size={22} tone={C.ink3} weight="regular" />
            <Lines x={10} y={y + 52} lines={d.split(" ").length > 2 ? [d.split(" ").slice(0, 2).join(" "), d.split(" ").slice(2).join(" ")] : [d]} style={label(12, 600)} fill={C.ink} dy={15} />
          </g>
        );
      })}
      <Arrow x1={156} y1={150} x2={210} y2={150} tone={C.ink3} />

      {/* retrieved extracts, each with its citation */}
      {extracts.map((e, i) => {
        const y = 26 + i * 86;
        return (
          <g key={e.text}>
            <Box x={222} y={y} w={300} h={68} tone={C.ink3} />
            <text x={238} y={y + 28} fill={C.ink} style={label(14, 600)}>
              {e.text}
            </text>
            <rect x={238} y={y + 38} width={200} height={20} rx={3} fill={C.tint} stroke={C.accent} strokeWidth={1} />
            <text x={246} y={y + 52} fill={C.accent} style={label(11.5, 600)}>
              {e.cite}
            </text>
          </g>
        );
      })}
      <Arrow x1={530} y1={94} x2={600} y2={128} tone={C.ink3} />
      <Arrow x1={530} y1={146} x2={600} y2={146} tone={C.ink3} />

      {/* deterministic arithmetic */}
      <Box x={612} y={96} w={150} h={96} tone={C.ink} />
      <Icon as={Calculator} x={640} y={126} size={30} tone={C.ink} />
      <text x={662} y={130} fill={C.ink} style={label(12, 600)}>
        4.2 ÷ 1.4
      </text>
      <text x={628} y={172} fill={C.ink3} style={LS}>
        code tool
      </text>
      <Arrow x1={770} y1={144} x2={812} y2={144} tone={C.ink3} />
      <text x={824} y={140} fill={C.ink} style={label(28, 700)}>
        3.0×
      </text>
      <text x={824} y={164} fill={C.ink2} style={L}>
        debt to EBITDA
      </text>
      <text x={824} y={184} fill={C.ink3} style={LS}>
        covenant at most 3.5×
      </text>
      <Arrow x1={530} y1={198} x2={600} y2={166} tone={C.ink3} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Accuracy-Interpretability Trade-Off and Feature Attribution
   -------------------------------------------------------------------------- */

export function ShapWaterfall() {
  const base = 4.0;
  const steps = [
    { f: "debt-to-income ratio = 48%", v: 3.2 },
    { f: "recent overdraft count = 3", v: 2.1 },
    { f: "annual income = $82,000", v: -1.3 },
    { f: "account age = 9 years", v: -0.8 },
    { f: "credit utilization = 35%", v: 0.4 },
  ];
  const x0 = 250;
  const x1 = 950;
  const X = (v: number) => r2(x0 + (v / 10) * (x1 - x0));
  const rh = 30;
  const y0 = 4;
  let run = base;
  const final = base + steps.reduce((a, s) => a + s.v, 0);
  return (
    <Plate
      w={970}
      h={266}
      title="Local feature attribution for one applicant. Starting from a baseline default probability of 4.0 percent, debt-to-income ratio of 48 percent adds 3.2 points, three recent overdrafts add 2.1, income of 82,000 dollars subtracts 1.3, nine years of account age subtracts 0.8 and utilization of 35 percent adds 0.4, for a predicted default probability of 7.6 percent"
    >
      <text x={x0 - 14} y={y0 + rh / 2 + 5} textAnchor="end" fill={C.ink3} style={L}>
        baseline default rate
      </text>
      <rect x={x0} y={y0 + 6} width={X(base) - x0} height={rh - 12} fill={C.grey} stroke={C.ink3} />
      <text x={X(base) + 8} y={y0 + rh / 2 + 5} fill={C.ink3} style={label(13, 600)}>
        {base.toFixed(1)}%
      </text>
      {steps.map((s, i) => {
        const y = y0 + (i + 1) * rh;
        const a = run;
        run += s.v;
        const lo = Math.min(a, run);
        const hi = Math.max(a, run);
        const up = s.v > 0;
        return (
          <g key={s.f}>
            <line x1={X(a)} y1={y - 6} x2={X(a)} y2={y + 6} stroke={C.ink3} strokeDasharray="2 2" />
            <text x={x0 - 14} y={y + rh / 2 + 5} textAnchor="end" fill={C.ink} style={L}>
              {s.f}
            </text>
            <rect x={X(lo)} y={y + 6} width={r2(X(hi) - X(lo))} height={rh - 12} fill={up ? C.ink : C.paper} stroke={C.ink} />
            <text
              x={up ? X(hi) + 8 : X(lo) - 8}
              y={y + rh / 2 + 5}
              textAnchor={up ? "start" : "end"}
              fill={C.ink}
              style={label(13, 600)}
            >
              {up ? `+${s.v.toFixed(1)}` : `−${(-s.v).toFixed(1)}`}
            </text>
          </g>
        );
      })}
      {(() => {
        const y = y0 + (steps.length + 1) * rh + 8;
        return (
          <g>
            <line x1={0} y1={y - 2} x2={x1} y2={y - 2} stroke={C.rule} />
            <text x={x0 - 14} y={y + rh / 2 + 7} textAnchor="end" fill={C.accent} style={label(14, 700)}>
              predicted default probability
            </text>
            <rect x={x0} y={y + 6} width={X(final) - x0} height={rh - 10} fill={C.accent} />
            <text x={X(final) + 8} y={y + rh / 2 + 8} fill={C.accent} style={label(16, 700)}>
              {final.toFixed(1)}%
            </text>
            <line x1={x0} y1={y + rh + 10} x2={x1} y2={y + rh + 10} stroke={C.ink} />
            {[0, 2, 4, 6, 8, 10].map((v) => (
              <text key={v} x={X(v)} y={y + rh + 28} textAnchor="middle" fill={C.ink3} style={LS}>
                {v}%
              </text>
            ))}
          </g>
        );
      })()}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Adverse Action Notices and Proxy Discrimination
   -------------------------------------------------------------------------- */

export function ProxyPath() {
  const feats = ["income", "debt-to-income ratio", "postal code", "merchant mix"];
  const fy = (i: number) => 104 + i * 38;
  return (
    <Plate
      w={970}
      h={300}
      title="A protected attribute is removed from the model's feature table, but it is correlated with postal code and merchant mix, which stay in the table. The model learns from those proxies, and approval rates differ between demographic groups: 72 percent against 51 percent"
    >
      {/* the protected attribute, outside the table */}
      <Box x={0} y={112} w={170} h={74} tone={C.accent} />
      <Lines x={14} y={142} lines={["protected attribute", "race, sex, religion"]} style={label(13, 600)} fill={C.accent} dy={20} />

      {/* the feature table */}
      <text x={300} y={30} fill={C.ink} style={LB}>
        model feature table
      </text>
      <rect x={300} y={44} width={220} height={36} fill={C.paper} stroke={C.ink3} />
      <text x={316} y={67} fill={C.ink3} style={L} textDecoration="line-through">
        race, sex, religion
      </text>
      <text x={530} y={67} fill={C.ink3} style={LS}>
        excluded
      </text>
      {feats.map((f, i) => {
        const proxy = i >= 2;
        return (
          <g key={f}>
            <rect x={300} y={fy(i) - 18} width={220} height={36} fill={proxy ? C.tint : C.paper} stroke={proxy ? C.accent : C.ink} />
            <text x={316} y={fy(i) + 5} fill={proxy ? C.accent : C.ink} style={label(13, proxy ? 600 : 500)}>
              {f}
            </text>
          </g>
        );
      })}
      {[2, 3].map((i) => (
        <Arrow key={i} x1={176} y1={149} x2={292} y2={fy(i)} tone={C.accent} width={1.6} />
      ))}
      <text x={186} y={246} fill={C.accent} style={LS}>
        correlated
      </text>

      {/* model and outcome */}
      <Arrow x1={528} y1={180} x2={600} y2={180} tone={C.ink} />
      <Box x={608} y={150} w={92} h={60} tone={C.ink} />
      <text x={654} y={185} textAnchor="middle" fill={C.ink} style={label(13, 600)}>
        model
      </text>
      <Arrow x1={706} y1={180} x2={760} y2={180} tone={C.ink} />
      <text x={780} y={58} fill={C.ink} style={LB}>
        approval rate
      </text>
      {[
        { g: "group A", v: 0.72, tone: C.ink },
        { g: "group B", v: 0.51, tone: C.accent },
      ].map((b, i) => {
        const yb = 250;
        const h = b.v * 170;
        const x = 790 + i * 90;
        return (
          <g key={b.g}>
            <rect x={x} y={r2(yb - h)} width={56} height={r2(h)} fill={b.tone === C.accent ? C.accent : C.ink} />
            <text x={x + 28} y={r2(yb - h - 8)} textAnchor="middle" fill={b.tone} style={label(15, 700)}>
              {Math.round(b.v * 100)}%
            </text>
            <text x={x + 28} y={yb + 20} textAnchor="middle" fill={C.ink3} style={LS}>
              {b.g}
            </text>
          </g>
        );
      })}
      <line x1={776} y1={250} x2={960} y2={250} stroke={C.ink} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Regime Shifts and Structural Breaks in Financial Markets
   -------------------------------------------------------------------------- */

/** US federal funds effective rate, annual average, percent. */
const POLICY_RATE: [number, number][] = [
  [2012, 0.14], [2013, 0.11], [2014, 0.09], [2015, 0.13], [2016, 0.4], [2017, 1.0], [2018, 1.83],
  [2019, 2.16], [2020, 0.38], [2021, 0.08], [2022, 1.68], [2023, 5.02], [2024, 5.14], [2025, 4.21],
];
/** Auto-loan portfolio default rate, percent: what happened and what the model expected. */
const ACTUAL = [2.1, 2.0, 1.9, 1.9, 2.0, 2.1, 2.1, 2.0, 1.8, 1.6, 2.4, 3.3, 3.7, 3.6];
const PREDICTED = [2.0, 2.0, 2.0, 1.9, 2.0, 2.0, 2.1, 2.0, 1.9, 1.7, 1.8, 1.8, 1.9, 1.9];

export function RegimeShift() {
  const x0 = 70;
  const x1 = 910;
  const X = (yr: number) => r2(x0 + ((yr - 2012) / 13) * (x1 - x0));
  const top = { t: 30, b: 104, max: 6 };
  const bot = { t: 146, b: 246, max: 4 };
  const Yt = (v: number) => r2(top.b - (v / top.max) * (top.b - top.t));
  const Yb = (v: number) => r2(bot.b - (v / bot.max) * (bot.b - bot.t));
  const path = (vals: number[], Y: (v: number) => number) =>
    `M${vals.map((v, i) => `${X(2012 + i)} ${Y(v)}`).join("L")}`;
  const gap = `M${ACTUAL.slice(10).map((v, i) => `${X(2022 + i)} ${Yb(v)}`).join("L")}L${PREDICTED.slice(10)
    .map((v, i) => `${X(2022 + i)} ${Yb(v)}`)
    .reverse()
    .join("L")}Z`;
  return (
    <Plate
      w={970}
      h={282}
      title="Interest rates and auto-loan defaults, 2012 to 2025. The policy rate stays near zero through the 2012 to 2021 training window, then rises to about 5 percent in 2023. The model trained on that window keeps predicting defaults near 2 percent, while actual defaults climb to about 3.7 percent"
    >
      <rect x={X(2012)} y={top.t - 6} width={r2(X(2021.5) - X(2012))} height={bot.b - top.t + 6} fill={C.grey} opacity={0.6} />
      <text x={X(2012) + 8} y={top.t + 10} fill={C.ink3} style={label(12, 600)}>
        training data, 2012 to 2021
      </text>

      <text x={0} y={top.t - 14} fill={C.ink} style={L}>
        interest rate
      </text>
      <path d={path(POLICY_RATE.map((p) => p[1]), Yt)} fill="none" stroke={C.ink} strokeWidth={2} />
      <line x1={x0} y1={top.b} x2={x1} y2={top.b} stroke={C.ink3} />
      {[0, 5].map((v) => (
        <text key={v} x={x0 - 8} y={Yt(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v}%
        </text>
      ))}

      <text x={0} y={bot.t - 14} fill={C.ink} style={L}>
        default rate
      </text>
      <path d={gap} fill={C.tint} />
      <path d={path(PREDICTED, Yb)} fill="none" stroke={C.ink3} strokeWidth={1.8} strokeDasharray="5 4" />
      <path d={path(ACTUAL, Yb)} fill="none" stroke={C.accent} strokeWidth={2.4} />
      <text x={X(2025) + 6} y={Yb(ACTUAL[13]) + 4} fill={C.accent} style={label(12, 600)} textAnchor="start">
        actual
      </text>
      <text x={X(2025) + 6} y={Yb(PREDICTED[13]) + 4} fill={C.ink3} style={label(12, 600)}>
        model
      </text>
      <line x1={x0} y1={bot.b} x2={x1} y2={bot.b} stroke={C.ink} />
      {[0, 2, 4].map((v) => (
        <text key={v} x={x0 - 8} y={Yb(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v}%
        </text>
      ))}
      {[2012, 2015, 2018, 2021, 2024].map((yr) => (
        <text key={yr} x={X(yr)} y={bot.b + 20} textAnchor="middle" fill={C.ink3} style={LS}>
          {yr}
        </text>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Tail Risk, Scenario Analysis, and Reverse Stress-Testing
   -------------------------------------------------------------------------- */

export function TailRisk() {
  const x0 = 20;
  const x1 = 950;
  const xmax = 14;
  const X = (v: number) => r2(x0 + (v / xmax) * (x1 - x0));
  const yb = 230;
  // a right-skewed loss density with a heavy tail (lognormal body plus a Pareto-like tail)
  const dens = (v: number) => {
    if (v <= 0) return 0;
    const body = Math.exp(-((Math.log(v) - Math.log(1.6)) ** 2) / (2 * 0.35 ** 2)) / v;
    const tail = (0.06 / (1 + Math.exp(-(v - 2.5) * 3))) * Math.exp(-(v - 2.5) / 3.2);
    return body + tail;
  };
  const peak = 0.66;
  // square-root height, so the thin tail stays visible next to the tall body
  const Y = (d: number) => r2(yb - Math.sqrt(d / peak) * 170);
  const pts: string[] = [];
  for (let v = 0.05; v <= xmax; v += 0.05) pts.push(`${X(v)} ${Y(dens(v))}`);
  const tailStart = 5;
  const tailPts: string[] = [];
  for (let v = tailStart; v <= xmax; v += 0.05) tailPts.push(`${X(v)} ${Y(dens(v))}`);
  // ten years of observed annual losses, all in the body
  const obs = [1.1, 1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 2.1, 2.4, 2.9];
  const capital = 10;
  const scen = 7.4;
  return (
    <Plate
      w={970}
      h={330}
      title="A portfolio loss distribution. Ten years of observed annual losses all fall between 1 and 3 percent. The distribution's tail extends far beyond them. A severe stress scenario with unemployment, interest rates and commercial vacancies spiking together produces a 7.4 percent loss, still inside a 10 percent capital buffer; reverse stress-testing starts from losses beyond that buffer and asks what would cause them"
    >
      <path d={`M${X(tailStart)} ${yb}L${tailPts.join("L")}L${X(xmax)} ${yb}Z`} fill={C.tint} />
      <path d={`M${X(0)} ${yb}L${pts.join("L")}`} fill="none" stroke={C.ink} strokeWidth={2} />
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.ink} />
      {obs.map((v, i) => (
        <circle key={i} cx={X(v)} cy={yb + 14 + (i % 2) * 9} r={4} fill={C.ink} />
      ))}
      <text x={X(2)} y={yb + 52} textAnchor="middle" fill={C.ink} style={L}>
        ten years of observed losses
      </text>
      <text x={X(9)} y={Y(dens(9)) - 30} textAnchor="middle" fill={C.accent} style={LB}>
        tail risk
      </text>

      {/* forward-looking stress scenario */}
      <line x1={X(scen)} y1={yb} x2={X(scen)} y2={70} stroke={C.ink} strokeWidth={1.4} />
      <circle cx={X(scen)} cy={yb} r={5} fill={C.ink} />
      <Lines x={X(scen) - 8} y={78} lines={["stress scenario:", "unemployment, rates and", "commercial vacancies spike"]} style={LS} fill={C.ink} anchor="end" dy={15} />

      {/* capital buffer and the reverse question */}
      <line x1={X(capital)} y1={yb} x2={X(capital)} y2={24} stroke={C.ink} strokeWidth={2} />
      <text x={X(capital) - 8} y={30} textAnchor="end" fill={C.ink} style={label(13, 600)}>
        capital buffer
      </text>
      <text x={X(capital) + 10} y={30} fill={C.accent} style={label(13, 600)}>
        insolvency
      </text>
      <Lines x={X(capital) + 10} y={112} lines={["reverse stress test:", "what would", "bring us here?"]} style={LS} fill={C.accent} dy={15} />
      <Arrow x1={X(13.2)} y1={186} x2={X(10.6)} y2={186} tone={C.accent} width={1.4} />

      {[0, 2, 4, 6, 8, 10, 12, 14].map((v) => (
        <text key={v} x={X(v)} y={yb + 76} textAnchor="middle" fill={C.ink3} style={LS}>
          {v}%
        </text>
      ))}
      <text x={x1} y={yb + 96} textAnchor="end" fill={C.ink3} style={LS}>
        annual portfolio loss
      </text>
    </Plate>
  );
}
