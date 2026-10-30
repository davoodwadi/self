"use client";

import React, { useState } from "react";
import { Files, Gear, HandCoins, Robot, Scales, Stamp, TreeStructure } from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, hash, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 1 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned
   or chosen. See the course CLAUDE.md.
   ========================================================================== */

const L = label(13);
const LS = label(11.5, 400);
const LB = label(14, 600);

/** Gaussian noise from the shared hash, so data match on server and client. */
const noise = (n: number) => {
  const u = Math.max(1e-6, hash(n));
  const v = hash(n + 7919);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const money = (v: number) =>
  `${v < 0 ? "−" : ""}$${Math.round(Math.abs(v)).toLocaleString("en-US")}`;

/* --------------------------------------------------------------------------
   Prediction Versus Judgment: the decision flow
   -------------------------------------------------------------------------- */

export function DecisionFlow() {
  const xs = [90, 270, 450, 630, 810];
  const y = 112;
  const names = ["Historical records", "Prediction", "Judgment", "Action", "Outcome"];
  const notes = ["past loan files", "chance of default", "cost of each error", "approve or decline", "repaid or defaulted"];
  return (
    <Plate w={900} h={262} title="A loan decision flows from historical records to a prediction, the manager's judgment, an action and an outcome that feeds back into the records">
      {/* who supplies each part */}
      {[
        { a: xs[0], b: xs[1], t: "machine learning", tone: C.ink3 },
        { a: xs[2], b: xs[3], t: "manager", tone: C.accent },
      ].map((g) => (
        <g key={g.t}>
          <path d={`M${g.a - 40} 44V36H${g.b + 40}V44`} fill="none" stroke={g.tone} strokeWidth={1.2} />
          <text x={(g.a + g.b) / 2} y={26} textAnchor="middle" fill={g.tone} style={L}>
            {g.t}
          </text>
        </g>
      ))}
      {xs.slice(0, -1).map((x, i) => (
        <Arrow key={x} x1={x + 48} y1={y} x2={xs[i + 1] - 48} y2={y} tone={C.ink3} />
      ))}
      {xs.map((x, i) => {
        const lit = i === 2;
        return (
          <g key={x}>
            <circle cx={x} cy={y} r={40} fill={lit ? C.tint : C.paper} stroke={lit ? C.accent : C.ink} strokeWidth={1.5} />
            {i === 1 ? (
              <text x={x} y={y + 7} textAnchor="middle" fill={C.ink} style={label(20, 600)}>
                0.18
              </text>
            ) : (
              React.createElement([Files, Files, Scales, Stamp, HandCoins][i], {
                x: x - 18,
                y: y - 18,
                size: 36,
                weight: "duotone",
                color: lit ? "var(--accent)" : "var(--ink)",
              })
            )}
            <text x={x} y={y + 66} textAnchor="middle" fill={lit ? C.accent : C.ink} style={LB}>
              {names[i]}
            </text>
            <text x={x} y={y + 84} textAnchor="middle" fill={C.ink3} style={LS}>
              {notes[i]}
            </text>
          </g>
        );
      })}
      {/* outcomes become new records */}
      <path d={`M${xs[4]} 214V236H${xs[0]}V214`} fill="none" stroke={C.ink3} strokeWidth={1.2} strokeDasharray="4 4" />
      <Arrow x1={xs[0]} y1={226} x2={xs[0]} y2={212} tone={C.ink3} width={1.2} />
      <text x={450} y={254} textAnchor="middle" fill={C.ink3} style={LS}>
        each outcome is added to the records
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Rule-Based Software Versus Machine Learning
   -------------------------------------------------------------------------- */

function Card({
  x,
  y,
  w,
  h,
  head,
  children,
  tone = C.ink,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  head: string;
  children?: React.ReactNode;
  tone?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={tone === C.accent ? C.tint : C.paper} stroke={tone} strokeWidth={1.3} />
      <text x={x + 10} y={y + 17} fill={tone === C.accent ? C.accent : C.ink3} style={label(11.5, 600)}>
        {head}
      </text>
      {children}
    </g>
  );
}

export function RulesVersusLearning() {
  const mono = { ...label(13, 500), fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };
  // a few past transactions, with the one fraudulent case marked
  const pts = [
    [18, 40], [30, 34], [42, 30], [52, 22], [62, 20], [24, 30], [46, 36], [70, 14],
  ];
  return (
    <Plate w={560} h={392} title="Rule-based software turns inputs and written rules into an output. Machine learning turns inputs and their historical outcomes into a model">
      {/* rule-based */}
      <text x={0} y={14} fill={C.ink} style={LB}>
        Rule-based software
      </text>
      <Card x={0} y={28} w={176} h={56} head="inputs">
        <text x={10} y={70} fill={C.ink} style={mono}>
          hours 38, rate $32
        </text>
      </Card>
      <Card x={0} y={98} w={176} h={56} head="rules">
        <text x={10} y={140} fill={C.ink} style={mono}>
          pay = hours × rate
        </text>
      </Card>
      <Arrow x1={182} y1={56} x2={236} y2={84} tone={C.ink3} />
      <Arrow x1={182} y1={126} x2={236} y2={100} tone={C.ink3} />
      <rect x={242} y={56} width={84} height={72} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <Gear x={266} y={74} size={36} weight="duotone" color="var(--ink)" />
      <Arrow x1={332} y1={92} x2={386} y2={92} tone={C.ink3} />
      <Card x={392} y={64} w={168} h={56} head="output">
        <text x={402} y={106} fill={C.ink} style={mono}>
          pay $1,216
        </text>
      </Card>

      <line x1={0} y1={186} x2={560} y2={186} stroke={C.rule} />

      {/* machine learning */}
      <text x={0} y={218} fill={C.ink} style={LB}>
        Machine learning
      </text>
      <Card x={0} y={232} w={176} h={64} head="inputs">
        {[0, 1, 2].map((r) => (
          <text key={r} x={10} y={248 + 14 + r * 14} fill={C.ink} style={{ ...mono, fontSize: 11 }}>
            {["$412, 03:14, abroad", "$38, 12:05, local", "$96, 18:40, local"][r]}
          </text>
        ))}
      </Card>
      <Card x={0} y={306} w={176} h={64} head="historical outcomes">
        {[0, 1, 2].map((r) => (
          <text key={r} x={10} y={322 + 14 + r * 14} fill={C.ink} style={{ ...mono, fontSize: 11 }}>
            {["fraud", "legitimate", "legitimate"][r]}
          </text>
        ))}
      </Card>
      <Arrow x1={182} y1={264} x2={236} y2={292} tone={C.ink3} />
      <Arrow x1={182} y1={338} x2={236} y2={310} tone={C.ink3} />
      {/* estimation: the system fits the relationship from examples */}
      <rect x={242} y={264} width={84} height={72} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      {pts.map(([px, py], i) => (
        <circle key={i} cx={242 + px} cy={264 + py + 10} r={2.6} fill={C.ink3} />
      ))}
      <path d="M256 322L318 280" stroke={C.ink} strokeWidth={1.4} />
      <Arrow x1={332} y1={300} x2={386} y2={300} tone={C.ink3} />
      <Card x={392} y={264} w={168} h={72} head="model" tone={C.accent}>
        <path d="M406 324C430 318 450 300 470 292S520 280 546 282" fill="none" stroke={C.accent} strokeWidth={2} />
      </Card>
      <text x={476} y={356} textAnchor="middle" fill={C.ink3} style={LS}>
        the estimated relationship
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Formulating a Prediction Problem: the churn table
   -------------------------------------------------------------------------- */

export function ChurnTable() {
  const cols = [
    { h: ["Customer", ""], w: 104 },
    { h: ["Months", "subscribed"], w: 112 },
    { h: ["Logins in", "last 30 days"], w: 118 },
    { h: ["Support", "tickets"], w: 104 },
    { h: ["Monthly", "plan"], w: 100 },
    { h: ["Exit survey", "completed"], w: 140 },
    { h: ["Cancelled", "within 90 days"], w: 150 },
  ];
  const rows = [
    ["C-1041", "26", "18", "0", "$12", "no", "no"],
    ["C-1042", "3", "2", "4", "$25", "yes", "yes"],
    ["C-1043", "14", "9", "1", "$12", "no", "no"],
    ["C-1044", "7", "1", "3", "$25", "yes", "yes"],
    ["C-1045", "31", "22", "0", "$40", "no", "no"],
  ];
  const x0 = 12;
  const xs = cols.reduce<number[]>((a, c) => [...a, a[a.length - 1] + c.w], [x0]);
  const top = 78;
  const rh = 32;
  const bottom = top + 46 + rows.length * rh;
  const span = (a: number, b: number) => [xs[a] + 6, xs[b + 1] - 6];
  const groups = [
    { a: 0, b: 0, t: "unit of observation", tone: C.ink },
    { a: 1, b: 4, t: "features, known before the decision", tone: C.ink },
    { a: 5, b: 5, t: "recorded after the outcome", tone: C.ink3 },
    { a: 6, b: 6, t: "target", tone: C.accent },
  ];
  return (
    <Plate w={952} h={bottom + 8} title="A customer churn table: each row is a customer, four feature columns are known before the decision, an exit survey column is recorded only after cancelling, and the last column is the target">
      <defs>
        <pattern id="w1-hatch" width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={6} stroke="rgba(103,109,119,0.28)" strokeWidth={2} />
        </pattern>
      </defs>
      {groups.map((g) => {
        const [a, b] = span(g.a, g.b);
        return (
          <g key={g.t}>
            <path d={`M${a} ${top - 10}V${top - 18}H${b}V${top - 10}`} fill="none" stroke={g.tone} strokeWidth={1.2} />
            <text x={(a + b) / 2} y={top - 26} textAnchor="middle" fill={g.tone} style={label(12.5, 600)}>
              {g.t}
            </text>
          </g>
        );
      })}
      {/* leakage column and target column grounds */}
      <rect x={xs[5]} y={top} width={cols[5].w} height={bottom - top} fill="url(#w1-hatch)" />
      <rect x={xs[6]} y={top} width={cols[6].w} height={bottom - top} fill={C.tint} />
      <line x1={x0} y1={top} x2={xs[7]} y2={top} stroke={C.ink} strokeWidth={1.4} />
      <line x1={x0} y1={top + 46} x2={xs[7]} y2={top + 46} stroke={C.ink} strokeWidth={1} />
      <line x1={x0} y1={bottom} x2={xs[7]} y2={bottom} stroke={C.ink} strokeWidth={1.4} />
      {cols.map((c, i) => (
        <text key={i} x={xs[i] + 10} y={top + 19} fill={i === 6 ? C.accent : i === 5 ? C.ink3 : C.ink} style={label(12.5, 600)}>
          <tspan x={xs[i] + 10}>{c.h[0]}</tspan>
          <tspan x={xs[i] + 10} dy={15}>
            {c.h[1]}
          </tspan>
        </text>
      ))}
      {rows.map((r, j) => (
        <g key={r[0]}>
          {j > 0 && <line x1={x0} y1={top + 46 + j * rh} x2={xs[7]} y2={top + 46 + j * rh} stroke={C.rule} />}
          {r.map((v, i) => (
            <text
              key={i}
              x={xs[i] + 10}
              y={top + 46 + j * rh + 21}
              fill={i === 6 ? C.accent : i === 5 ? C.ink3 : C.ink}
              style={label(13, i === 6 ? 600 : 400)}
            >
              {v}
            </text>
          ))}
        </g>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Error Asymmetry and Decision Thresholds (interactive)
   Predicted default probabilities for 1,000 loan applications: 850 repaid,
   150 defaulted. Loans above the threshold are declined.
   -------------------------------------------------------------------------- */

const BINS = 100;
const N_REPAID = 850;
const N_DEFAULT = 150;
const MARGIN = 300;
const shape = (a: number, b: number) => {
  const raw = Array.from({ length: BINS }, (_, i) => {
    const p = (i + 0.5) / BINS;
    return p ** (a - 1) * (1 - p) ** (b - 1);
  });
  const s = raw.reduce((x, y) => x + y, 0);
  return raw.map((v) => v / s);
};
const REPAID = shape(2, 9);
const DEFAULTED = shape(5, 4);
const PEAK = Math.max(...REPAID, ...DEFAULTED);
const cum = (arr: number[]) => arr.reduce<number[]>((a, v) => [...a, a[a.length - 1] + v], [0]);
const CUM_R = cum(REPAID);
const CUM_D = cum(DEFAULTED);

function outcome(t: number, loss: number) {
  const repaidApproved = N_REPAID * CUM_R[t];
  const defaultApproved = N_DEFAULT * CUM_D[t];
  return {
    fp: Math.round(N_REPAID - repaidApproved),
    fn: Math.round(defaultApproved),
    profit: MARGIN * repaidApproved - loss * defaultApproved,
  };
}

export function ThresholdLab() {
  const [t, setT] = useState(50);
  const [loss, setLoss] = useState(4000);
  const X0 = 60;
  const W = 520;
  const px = (i: number) => r2(X0 + (i / BINS) * W);
  const base = 132;
  const amp = 92;
  const area = (arr: number[], dir: 1 | -1, from: number, to: number) => {
    let d = `M${px(from)} ${base}`;
    for (let i = from; i < to; i++) {
      const yy = r2(base - dir * (arr[i] / PEAK) * amp);
      d += `L${px(i)} ${yy}L${px(i + 1)} ${yy}`;
    }
    return d + `L${px(to)} ${base}Z`;
  };
  const now = outcome(t, loss);
  const curve = Array.from({ length: BINS + 1 }, (_, i) => outcome(i, loss).profit);
  const best = curve.indexOf(Math.max(...curve));
  const P_TOP = 346;
  const P_H = 96;
  const lo = -200000;
  const hi = 200000;
  const py = (v: number) => r2(P_TOP + P_H - ((v - lo) / (hi - lo)) * P_H);
  const tx = px(t);
  return (
    <Plate w={620} h={512} title="Interactive: move the threshold to see how many good loans are declined, how many defaults are approved, and the expected profit">
      <defs>
        <clipPath id="w1-profit-clip">
          <rect x={X0} y={P_TOP - 8} width={W} height={P_H + 8} />
        </clipPath>
      </defs>
      {/* approve or decline either side of the threshold */}
      <text x={tx - 10} y={20} textAnchor="end" fill={C.ink} style={L}>
        approve
      </text>
      <text x={tx + 10} y={20} fill={C.ink} style={L}>
        decline
      </text>
      {/* repaid loans above the axis, defaulted below */}
      <path d={area(REPAID, 1, 0, BINS)} fill={C.grey} stroke={C.ink3} strokeWidth={1} />
      <path d={area(DEFAULTED, -1, 0, BINS)} fill={C.grey} stroke={C.ink3} strokeWidth={1} />
      {t < BINS && <path d={area(REPAID, 1, t, BINS)} fill="rgba(26,29,36,0.55)" />}
      {t > 0 && <path d={area(DEFAULTED, -1, 0, t)} fill="rgba(26,29,36,0.55)" />}
      <line x1={X0} y1={base} x2={X0 + W} y2={base} stroke={C.ink} />
      <text x={X0 + W} y={base - 10} textAnchor="end" fill={C.ink} style={LB}>
        repaid loans
      </text>
      <text x={X0} y={base + 86} fill={C.ink} style={LB}>
        defaulted loans
      </text>
      <line x1={tx} y1={30} x2={tx} y2={236} stroke={C.accent} strokeWidth={2} />
      {/* probability axis and the threshold control */}
      <Knob x={X0} y={248} len={W} value={t} min={0} max={BINS} onChange={setT} label="Decision threshold" />
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <text key={v} x={px(v * BINS)} y={278} textAnchor="middle" fill={C.ink3} style={LS}>
          {v}
        </text>
      ))}
      <text x={X0 + W / 2} y={294} textAnchor="middle" fill={C.ink3} style={LS}>
        predicted probability of default
      </text>
      <text x={X0} y={324} fill={C.ink} style={L}>
        threshold {(t / BINS).toFixed(2)} | false positives {now.fp} | false negatives {now.fn}
      </text>
      <text x={X0 + W} y={324} textAnchor="end" fill={C.accent} style={LB}>
        expected profit {money(now.profit)}
      </text>

      {/* expected profit across thresholds */}
      <line x1={X0} y1={py(0)} x2={X0 + W} y2={py(0)} stroke={C.rule} />
      <text x={X0 - 6} y={py(0) + 4} textAnchor="end" fill={C.ink3} style={LS}>
        $0
      </text>
      <path
        d={curve.map((v, i) => `${i ? "L" : "M"}${px(i)} ${py(v)}`).join("")}
        fill="none"
        stroke={C.ink}
        strokeWidth={1.6}
        clipPath="url(#w1-profit-clip)"
      />
      <line x1={px(best)} y1={py(curve[best])} x2={px(best)} y2={P_TOP + P_H} stroke={C.ink3} strokeDasharray="3 3" />
      <text x={px(best)} y={P_TOP + P_H + 16} textAnchor="middle" fill={C.ink3} style={LS}>
        best threshold {(best / BINS).toFixed(2)}
      </text>
      {now.profit >= lo && <circle cx={tx} cy={py(now.profit)} r={5} fill={C.accent} />}

      {/* cost of the expensive error */}
      <text x={X0} y={498} fill={C.ink} style={L}>
        loss per default {money(loss)}
      </text>
      <Knob x={236} y={493} len={180} value={loss} min={1000} max={10000} step={500} onChange={setLoss} label="Loss per default" tone={C.ink} />
      <text x={X0 + W} y={498} textAnchor="end" fill={C.ink3} style={LS}>
        margin per repaid loan $300
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Supervised Learning: regression and classification panels
   -------------------------------------------------------------------------- */

function Axes({ w, h, x, y }: { w: number; h: number; x: string; y: string }) {
  return (
    <g>
      <path d={`M60 12V${h - 40}H${w - 8}`} fill="none" stroke={C.ink} strokeWidth={1.2} />
      <text x={(60 + w) / 2} y={h - 6} textAnchor="middle" fill={C.ink3} style={LS}>
        {x}
      </text>
      <text transform={`translate(12 ${(h - 40) / 2 + 6}) rotate(-90)`} textAnchor="middle" fill={C.ink3} style={LS}>
        {y}
      </text>
    </g>
  );
}

const HOUSES = Array.from({ length: 26 }, (_, i) => {
  const area = 900 + hash(i + 11) * 2300;
  const price = 60000 + 165 * area + noise(i + 40) * 38000;
  return { area, price };
});

export function RegressionPanel() {
  const w = 420;
  const h = 260;
  const sx = (a: number) => r2(60 + ((a - 800) / 2600) * (w - 76));
  const sy = (p: number) => r2(h - 40 - ((p - 150000) / 500000) * (h - 56));
  return (
    <Plate w={w} h={h} title="Regression: house sale prices rise with floor area, and the fitted line gives a continuous price for any floor area">
      <Axes w={w} h={h} x="floor area (sq ft)" y="sale price" />
      {[1000, 2000, 3000].map((a) => (
        <text key={a} x={sx(a)} y={h - 24} textAnchor="middle" fill={C.ink3} style={LS}>
          {a.toLocaleString("en-US")}
        </text>
      ))}
      {[200000, 400000, 600000].map((p) => (
        <text key={p} x={56} y={sy(p) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          ${p / 1000}k
        </text>
      ))}
      {HOUSES.map((d, i) => (
        <circle key={i} cx={sx(d.area)} cy={sy(d.price)} r={3.6} fill={C.ink3} />
      ))}
      <line x1={sx(850)} y1={sy(60000 + 165 * 850)} x2={sx(3300)} y2={sy(60000 + 165 * 3300)} stroke={C.accent} strokeWidth={2.2} />
    </Plate>
  );
}

const TXNS = Array.from({ length: 46 }, (_, i) => {
  const fraud = i % 4 === 0;
  const amount = fraud ? 1080 + hash(i + 3) * 860 : 60 + hash(i + 3) * 1100;
  const km = fraud ? 1050 + hash(i + 91) * 1250 : 20 + hash(i + 91) * (amount > 700 ? 500 : 1300);
  return { amount, km, fraud };
});

export function ClassificationPanel() {
  const w = 420;
  const h = 260;
  const sx = (a: number) => r2(60 + (a / 2000) * (w - 76));
  const sy = (k: number) => r2(h - 40 - (k / 2400) * (h - 56));
  return (
    <Plate w={w} h={h} title="Classification: fraudulent transactions, large and far from home, sit on one side of a boundary and legitimate transactions on the other">
      <Axes w={w} h={h} x="transaction amount" y="distance from home (km)" />
      {[0, 1000, 2000].map((a) => (
        <text key={a} x={sx(a)} y={h - 24} textAnchor="middle" fill={C.ink3} style={LS}>
          ${a.toLocaleString("en-US")}
        </text>
      ))}
      <path d={`M${sx(760)} ${sy(2400)}C${sx(800)} ${sy(1400)} ${sx(1100)} ${sy(900)} ${sx(2000)} ${sy(700)}`} fill="none" stroke={C.accent} strokeWidth={2.2} />
      {TXNS.map((d, i) =>
        d.fraud ? (
          <path
            key={i}
            d={`M${sx(d.amount) - 4} ${sy(d.km) - 4}l8 8M${sx(d.amount) + 4} ${sy(d.km) - 4}l-8 8`}
            stroke={C.ink}
            strokeWidth={2}
          />
        ) : (
          <circle key={i} cx={sx(d.amount)} cy={sy(d.km)} r={3.6} fill="none" stroke={C.ink3} strokeWidth={1.4} />
        ),
      )}
      <text x={sx(1960)} y={sy(2280)} textAnchor="end" fill={C.ink} style={L}>
        fraudulent
      </text>
      <text x={sx(80)} y={sy(2280)} fill={C.ink3} style={L}>
        legitimate
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Unsupervised Learning: three behavioural segments in unlabeled records
   -------------------------------------------------------------------------- */

const SEGMENTS = [
  { f: 5, v: 158, sf: 1.3, sv: 17, n: 22 },
  { f: 15, v: 42, sf: 2.6, sv: 9, n: 30 },
  { f: 27, v: 112, sf: 2.4, sv: 16, n: 24 },
];
const CUSTOMERS = SEGMENTS.flatMap((s, k) =>
  Array.from({ length: s.n }, (_, i) => ({
    f: s.f + noise(k * 100 + i) * s.sf,
    v: s.v + noise(k * 100 + i + 50) * s.sv,
  })),
);

export function Segments() {
  const w = 500;
  const h = 340;
  const sx = (f: number) => r2(60 + (f / 34) * (w - 76));
  const sy = (v: number) => r2(h - 40 - (v / 230) * (h - 56));
  return (
    <Plate w={w} h={h} title="Unlabeled customer records plotted by purchase frequency and average order value fall into three groups">
      <Axes w={w} h={h} x="purchase frequency (orders per year)" y="average order value" />
      {[0, 10, 20, 30].map((f) => (
        <text key={f} x={sx(f)} y={h - 24} textAnchor="middle" fill={C.ink3} style={LS}>
          {f}
        </text>
      ))}
      {[50, 100, 150, 200].map((v) => (
        <text key={v} x={56} y={sy(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          ${v}
        </text>
      ))}
      {SEGMENTS.map((s, i) => (
        <ellipse
          key={i}
          cx={sx(s.f)}
          cy={sy(s.v)}
          rx={r2(((s.sf * 2.5) / 34) * (w - 76))}
          ry={r2(((s.sv * 2.5) / 230) * (h - 56))}
          fill={C.tint}
          stroke={C.accent}
          strokeWidth={1.6}
          strokeDasharray="5 4"
        />
      ))}
      {CUSTOMERS.map((d, i) => (
        <circle key={i} cx={sx(d.f)} cy={sy(d.v)} r={3.4} fill={C.ink} />
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Reinforcement Learning: an airline pricing agent and its flight
   -------------------------------------------------------------------------- */

export function RewardLoop() {
  const seats = Array.from({ length: 40 }, (_, i) => hash(i + 5) < 0.62);
  return (
    <Plate w={540} h={330} title="A pricing agent sets a fare for a flight. The flight returns its new state, seats left and days to departure, and a reward, the revenue from that step">
      {/* agent */}
      <rect x={10} y={96} width={150} height={136} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
      <Robot x={55} y={118} size={60} weight="duotone" color="var(--ink)" />
      <text x={85} y={210} textAnchor="middle" fill={C.ink} style={LB}>
        agent
      </text>
      {/* environment: the flight's seat map */}
      <rect x={350} y={60} width={180} height={208} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
      {seats.map((sold, i) => {
        const r = Math.floor(i / 4);
        const c = i % 4;
        return (
          <rect
            key={i}
            x={380 + c * 28 + (c > 1 ? 12 : 0)}
            y={74 + r * 16}
            width={20}
            height={11}
            rx={2}
            fill={sold ? C.ink3 : C.paper}
            stroke={C.ink3}
          />
        );
      })}
      <text x={440} y={254} textAnchor="middle" fill={C.ink} style={LB}>
        environment
      </text>
      {/* action */}
      <path d="M85 92V36H440V56" fill="none" stroke={C.ink} strokeWidth={1.6} />
      <Arrow x1={440} y1={46} x2={440} y2={58} />
      <text x={262} y={28} textAnchor="middle" fill={C.ink} style={LB}>
        action
      </text>
      <text x={262} y={54} textAnchor="middle" fill={C.ink3} style={LS}>
        set the fare at $289
      </text>
      {/* state and reward */}
      <path d="M440 272V300H64V236" fill="none" stroke={C.ink} strokeWidth={1.6} />
      <Arrow x1={64} y1={250} x2={64} y2={238} />
      <path d="M440 272V286H110V236" fill="none" stroke={C.accent} strokeWidth={1.6} />
      <Arrow x1={110} y1={250} x2={110} y2={238} tone={C.accent} />
      <text x={170} y={320} fill={C.ink} style={LB}>
        state
      </text>
      <text x={216} y={320} fill={C.ink3} style={LS}>
        16 seats left, 12 days to departure
      </text>
      <text x={170} y={276} fill={C.accent} style={LB}>
        reward
      </text>
      <text x={226} y={276} fill={C.ink3} style={LS}>
        +$578 revenue
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Underfitting, Overfitting, and Generalization (interactive)
   Weekly unit sales over a year: 14 weeks train the model, the other 38 test
   it. Polynomials of degree 1 to 10 are fitted by least squares.
   -------------------------------------------------------------------------- */

const truth = (w: number) => 52 + 22 * Math.sin((2 * Math.PI * (w - 12)) / 52) + 8 * Math.sin((4 * Math.PI * w) / 52);
const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1);
const ORDER = [...WEEKS].sort((a, b) => hash(a * 7.7) - hash(b * 7.7));
const TRAIN = ORDER.slice(0, 14).map((w) => ({ w, y: truth(w) + noise(w + 300) * 7 }));
const TEST = ORDER.slice(14).map((w) => ({ w, y: truth(w) + noise(w + 300) * 7 }));
const toT = (w: number) => (w - 26.5) / 25.5;

/** Legendre polynomials P0..Pd at t, a well-conditioned basis on [−1, 1]. */
const legendre = (t: number, d: number) => {
  const p = [1, t];
  for (let n = 1; n < d; n++) p.push(((2 * n + 1) * t * p[n] - n * p[n - 1]) / (n + 1));
  return p.slice(0, d + 1);
};

function fitPoly(d: number) {
  const k = d + 1;
  const A = Array.from({ length: k }, () => new Array(k + 1).fill(0));
  for (const pt of TRAIN) {
    const b = legendre(toT(pt.w), d);
    for (let i = 0; i < k; i++) {
      for (let j = 0; j < k; j++) A[i][j] += b[i] * b[j];
      A[i][k] += b[i] * pt.y;
    }
  }
  for (let i = 0; i < k; i++) A[i][i] += 1e-6;
  for (let c = 0; c < k; c++) {
    let m = c;
    for (let r = c + 1; r < k; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r;
    [A[c], A[m]] = [A[m], A[c]];
    for (let r = 0; r < k; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let j = c; j <= k; j++) A[r][j] -= f * A[c][j];
    }
  }
  const coef = A.map((row, i) => row[k] / row[i]);
  const f = (w: number) => legendre(toT(w), d).reduce((s, b, i) => s + b * coef[i], 0);
  const rmse = (pts: { w: number; y: number }[]) => Math.sqrt(pts.reduce((s, p) => s + (f(p.w) - p.y) ** 2, 0) / pts.length);
  return { f, train: rmse(TRAIN), test: rmse(TEST) };
}

const DEGREES = Array.from({ length: 10 }, (_, i) => i + 1);
const FITS = DEGREES.map(fitPoly);

export function FitLab() {
  const [deg, setDeg] = useState(1);
  const fit = FITS[deg - 1];
  const X0 = 56;
  const W = 530;
  const sx = (w: number) => r2(X0 + ((w - 1) / 51) * W);
  const sy = (y: number) => r2(206 - ((y - 10) / 90) * 186);
  const curve = Array.from({ length: 205 }, (_, i) => 1 + (i / 204) * 51)
    .map((w, i) => `${i ? "L" : "M"}${sx(w)} ${sy(Math.max(-40, Math.min(160, fit.f(w))))}`)
    .join("");
  const E_TOP = 290;
  const E_H = 110;
  const ex = (d: number) => r2(X0 + ((d - 1) / 9) * W);
  // log scale, so the test error's climb stays on the chart
  const ey = (e: number) => r2(E_TOP + E_H - (Math.log(Math.min(Math.max(e, 3), 100) / 3) / Math.log(100 / 3)) * E_H);
  const line = (key: "train" | "test") => FITS.map((f, i) => `${i ? "L" : "M"}${ex(i + 1)} ${ey(f[key])}`).join("");
  const first = TRAIN.reduce((a, b) => (b.w < a.w ? b : a));
  const firstTest = TEST.reduce((a, b) => (b.w > a.w ? b : a));
  return (
    <Plate w={620} h={482} title="Interactive: raise model complexity to see training error keep falling while test error falls and then rises">
      <defs>
        <clipPath id="w1-fit-clip">
          <rect x={X0} y={14} width={W} height={196} />
        </clipPath>
      </defs>
      {/* weekly sales and the fitted model */}
      <path d={`M${X0} 14V210H${X0 + W}`} fill="none" stroke={C.ink} strokeWidth={1.2} />
      {[1, 13, 26, 39, 52].map((w) => (
        <text key={w} x={sx(w)} y={226} textAnchor="middle" fill={C.ink3} style={LS}>
          {w}
        </text>
      ))}
      <text x={X0 + W / 2} y={244} textAnchor="middle" fill={C.ink3} style={LS}>
        week of year
      </text>
      <text transform={`translate(20 112) rotate(-90)`} textAnchor="middle" fill={C.ink3} style={LS}>
        units sold (thousands)
      </text>
      <path d={curve} fill="none" stroke={C.accent} strokeWidth={2.2} clipPath="url(#w1-fit-clip)" />
      {TEST.map((p) => (
        <circle key={`t${p.w}`} cx={sx(p.w)} cy={sy(p.y)} r={4} fill={C.paper} stroke={C.ink3} strokeWidth={1.5} />
      ))}
      {TRAIN.map((p) => (
        <circle key={`r${p.w}`} cx={sx(p.w)} cy={sy(p.y)} r={4} fill={C.ink} />
      ))}
      <text x={sx(first.w) + 8} y={sy(first.y) - 8} fill={C.ink} style={{ ...LS, paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 4, strokeLinejoin: "round" as const }}>
        training week
      </text>
      <text x={sx(firstTest.w) - 8} y={sy(firstTest.y) - 8} textAnchor="end" fill={C.ink3} style={{ ...LS, paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 4, strokeLinejoin: "round" as const }}>
        test week
      </text>

      {/* error against complexity */}
      <path d={`M${X0} ${E_TOP}V${E_TOP + E_H}H${X0 + W}`} fill="none" stroke={C.ink} strokeWidth={1.2} />
      <text transform={`translate(20 ${E_TOP + E_H / 2}) rotate(-90)`} textAnchor="middle" fill={C.ink3} style={LS}>
        error
      </text>
      <text x={X0 + 6} y={E_TOP - 8} fill={C.ink3} style={L}>
        underfitting
      </text>
      <text x={X0 + W - 6} y={E_TOP - 8} textAnchor="end" fill={C.ink3} style={L}>
        overfitting
      </text>
      <path d={line("train")} fill="none" stroke={C.ink} strokeWidth={1.8} />
      <path d={line("test")} fill="none" stroke={C.ink3} strokeWidth={1.8} strokeDasharray="6 4" />
      <text x={ex(10) - 4} y={ey(FITS[9].train) - 8} textAnchor="end" fill={C.ink} style={LS}>
        training error
      </text>
      <text x={ex(6) - 6} y={ey(FITS[5].test) - 10} textAnchor="end" fill={C.ink3} style={LS}>
        test error
      </text>
      <line x1={ex(deg)} y1={E_TOP} x2={ex(deg)} y2={E_TOP + E_H} stroke={C.accent} strokeWidth={1.5} />
      <circle cx={ex(deg)} cy={ey(fit.train)} r={4.5} fill={C.ink} />
      <circle cx={ex(deg)} cy={ey(fit.test)} r={4.5} fill={C.paper} stroke={C.ink3} strokeWidth={1.8} />
      <Knob x={X0} y={E_TOP + E_H + 26} len={W} value={deg} min={1} max={10} onChange={setDeg} label="Model complexity" />
      <text x={X0} y={E_TOP + E_H + 62} fill={C.ink} style={L}>
        model complexity {deg}
      </text>
      <text x={X0 + W} y={E_TOP + E_H + 62} textAnchor="end" fill={C.ink} style={L}>
        training error {fit.train.toFixed(1)} | test error {fit.test.toFixed(1)}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Distribution Shift and Model Drift: a demand forecast's monthly error
   -------------------------------------------------------------------------- */

const MONTHS = 60;
const SHOCK = 26;
const RETRAIN = 31;
const DRIFT = Array.from({ length: MONTHS }, (_, m) => {
  const wiggle = noise(m + 600) * 1.1;
  if (m < SHOCK) return 7.5 + wiggle;
  if (m < RETRAIN) return [31, 34, 29, 27, 26][m - SHOCK] + wiggle;
  return 9.5 + Math.max(0, 6 - (m - RETRAIN) * 2) + wiggle;
});

export function DriftTimeline() {
  const X0 = 56;
  const W = 830;
  const sx = (m: number) => r2(X0 + (m / (MONTHS - 1)) * W);
  const sy = (e: number) => r2(196 - (e / 40) * 176);
  return (
    <Plate w={900} h={236} title="A demand forecast's monthly error holds near 8 percent through 2018 and 2019, jumps above 30 percent after the March 2020 market change, and falls back after retraining">
      <rect x={sx(0)} y={20} width={sx(23) - sx(0)} height={176} fill={C.grey} />
      <text x={sx(11.5)} y={40} textAnchor="middle" fill={C.ink2} style={L}>
        training period
      </text>
      <path d={`M${X0} 20V196H${X0 + W}`} fill="none" stroke={C.ink} strokeWidth={1.2} />
      {[0, 10, 20, 30, 40].map((e) => (
        <text key={e} x={X0 - 8} y={sy(e) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {e}%
        </text>
      ))}
      {[2018, 2019, 2020, 2021, 2022].map((yr, i) => (
        <text key={yr} x={sx(i * 12 + 6)} y={216} textAnchor="middle" fill={C.ink3} style={LS}>
          {yr}
        </text>
      ))}
      <text transform="translate(14 108) rotate(-90)" textAnchor="middle" fill={C.ink3} style={LS}>
        forecast error
      </text>
      <line x1={sx(SHOCK - 0.5)} y1={20} x2={sx(SHOCK - 0.5)} y2={196} stroke={C.ink} strokeDasharray="4 3" />
      <text x={sx(SHOCK - 0.5) - 8} y={34} textAnchor="end" fill={C.ink} style={L}>
        market change
      </text>
      <line x1={sx(RETRAIN - 0.5)} y1={20} x2={sx(RETRAIN - 0.5)} y2={196} stroke={C.accent} strokeWidth={1.5} />
      <text x={sx(RETRAIN - 0.5) + 8} y={34} fill={C.accent} style={L}>
        retraining
      </text>
      <path d={DRIFT.map((e, m) => `${m ? "L" : "M"}${sx(m)} ${sy(e)}`).join("")} fill="none" stroke={C.ink} strokeWidth={2} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Structured Versus Unstructured Data
   -------------------------------------------------------------------------- */

function Net({ x, y, w, h, tone }: { x: number; y: number; w: number; h: number; tone: string }) {
  const layers = [4, 5, 5, 5, 2];
  const pos = layers.map((n, l) =>
    Array.from({ length: n }, (_, i) => [x + (l / (layers.length - 1)) * w, y + ((i + 0.5) / n) * h]),
  );
  return (
    <g>
      {pos.slice(0, -1).map((col, l) =>
        col.flatMap((a, i) =>
          pos[l + 1].map((b, j) => (
            <line key={`${l}-${i}-${j}`} x1={r2(a[0])} y1={r2(a[1])} x2={r2(b[0])} y2={r2(b[1])} stroke={tone} strokeOpacity={0.28} strokeWidth={0.8} />
          )),
        ),
      )}
      {pos.flat().map(([cx, cy], i) => (
        <circle key={i} cx={r2(cx)} cy={r2(cy)} r={4.5} fill={C.paper} stroke={tone} strokeWidth={1.4} />
      ))}
    </g>
  );
}

export function StructuredUnstructured() {
  const wave = Array.from({ length: 60 }, (_, i) => {
    const a = (Math.sin(i * 0.9) * 0.5 + 0.5) * (0.35 + hash(i + 70) * 0.65);
    return r2(4 + a * 24);
  });
  return (
    <Plate w={800} h={290} title="A table of account balance, tenure and unit price feeds a tabular model. Call audio, a product photo and a text document feed a deep neural network">
      <text x={0} y={18} fill={C.ink} style={LB}>
        structured
      </text>
      <text x={0} y={152} fill={C.ink} style={LB}>
        unstructured
      </text>
      {/* table */}
      <g>
        <rect x={110} y={20} width={300} height={96} fill={C.paper} stroke={C.ink} strokeWidth={1.2} />
        {["account balance", "tenure", "unit price"].map((hd, i) => (
          <text key={hd} x={120 + i * 100} y={40} fill={C.ink} style={label(12, 600)}>
            {hd}
          </text>
        ))}
        <line x1={110} y1={48} x2={410} y2={48} stroke={C.ink} />
        {[
          ["$4,210", "6 yr", "$18.40"],
          ["$920", "1 yr", "$7.95"],
          ["$15,060", "11 yr", "$42.00"],
        ].map((row, j) =>
          row.map((v, i) => (
            <text key={`${j}${i}`} x={120 + i * 100} y={68 + j * 18} fill={C.ink2} style={label(12, 400)}>
              {v}
            </text>
          )),
        )}
      </g>
      <Arrow x1={420} y1={68} x2={560} y2={68} tone={C.ink3} />
      <rect x={570} y={34} width={120} height={68} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      <TreeStructure x={612} y={50} size={36} weight="duotone" color="var(--ink)" />
      <text x={630} y={124} textAnchor="middle" fill={C.ink3} style={LS}>
        tabular model
      </text>

      {/* audio, image, text */}
      <g>
        <rect x={110} y={168} width={88} height={88} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.2} />
        <path
          d={wave.map((a, i) => `M${r2(116 + i * 1.28)} ${r2(212 - a)}V${r2(212 + a)}`).join("")}
          stroke={C.ink}
          strokeWidth={0.9}
        />
        <text x={154} y={276} textAnchor="middle" fill={C.ink3} style={LS}>
          call audio
        </text>
        <rect x={216} y={168} width={88} height={88} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.2} />
        {Array.from({ length: 64 }, (_, i) => {
          const cx = i % 8;
          const cy = Math.floor(i / 8);
          const d = Math.hypot(cx - 3.5, cy - 4) / 4.5;
          const shade = Math.max(0.06, Math.min(0.75, 0.8 - d * 0.8 + hash(i + 200) * 0.12));
          return <rect key={i} x={222 + cx * 9.5} y={174 + cy * 9.5} width={9.5} height={9.5} fill={`rgba(26,29,36,${r2(shade)})`} />;
        })}
        <text x={260} y={276} textAnchor="middle" fill={C.ink3} style={LS}>
          product image
        </text>
        <rect x={322} y={168} width={88} height={88} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.2} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={332} y1={184 + i * 10} x2={r2(332 + (i === 6 ? 36 : 60 + hash(i + 9) * 8))} y2={184 + i * 10} stroke={C.ink3} strokeWidth={2.4} strokeLinecap="round" />
        ))}
        <text x={366} y={276} textAnchor="middle" fill={C.ink3} style={LS}>
          text document
        </text>
      </g>
      <Arrow x1={420} y1={212} x2={560} y2={212} tone={C.ink3} />
      <Net x={580} y={168} w={200} h={88} tone={C.accent} />
      <text x={680} y={276} textAnchor="middle" fill={C.accent} style={LS}>
        deep neural network
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Neural Networks and Representation Learning: inspecting a hex nut
   -------------------------------------------------------------------------- */

const HEX = Array.from({ length: 6 }, (_, i) => [Math.cos((i * Math.PI) / 3), Math.sin((i * Math.PI) / 3)]);
const insideHex = (x: number, y: number) => {
  // a regular hexagon of circumradius 1 with flat top and bottom
  const ax = Math.abs(x);
  const ay = Math.abs(y);
  return ay <= Math.sqrt(3) / 2 && Math.sqrt(3) * ax + ay <= Math.sqrt(3);
};
/** The crack runs from the hole toward the lower right corner. */
const crackDist = (x: number, y: number) => {
  const [ax, ay, bx, by] = [0.32, 0.16, 0.82, 0.42];
  const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)));
  return Math.hypot(x - (ax + t * (bx - ax)), y - (ay + t * (by - ay)));
};

export function FourStages() {
  const P = 150;
  const xs = [20, 250, 480, 710];
  const top = 46;
  const N = 16;
  const cell = P / N;
  const u = (v: number) => (v + 1) / 2;
  const hexPath = (x: number, s: number) =>
    HEX.map(([hx, hy], i) => `${i ? "L" : "M"}${r2(x + u(hx * s) * P)} ${r2(top + u(hy * s) * P)}`).join("") + "Z";
  const crack = (x: number) => `M${r2(x + u(0.32) * P)} ${r2(top + u(0.16) * P)}L${r2(x + u(0.58) * P)} ${r2(top + u(0.3) * P)}L${r2(x + u(0.82) * P)} ${r2(top + u(0.42) * P)}`;
  const groups = [
    { a: 0, b: 1, t: "early layers" },
    { a: 2, b: 2, t: "intermediate layers" },
    { a: 3, b: 3, t: "final layer" },
  ];
  return (
    <Plate w={880} h={252} title="A product image of a hex nut passes from raw pixels to detected edges, to component shapes including a crack, to a classification of defective">
      {groups.map((g) => {
        const a = g.a === 0 ? xs[1] : xs[g.a];
        const b = xs[g.b] + P;
        return (
          <g key={g.t}>
            <path d={`M${a} 30V22H${b}V30`} fill="none" stroke={g.b === 3 ? C.accent : C.ink3} strokeWidth={1.2} />
            <text x={(a + b) / 2} y={14} textAnchor="middle" fill={g.b === 3 ? C.accent : C.ink3} style={L}>
              {g.t}
            </text>
          </g>
        );
      })}
      {xs.slice(0, -1).map((x) => (
        <Arrow key={x} x1={x + P + 14} y1={top + P / 2} x2={x + P + 66} y2={top + P / 2} tone={C.ink3} />
      ))}

      {/* 1. raw pixels */}
      {Array.from({ length: N * N }, (_, i) => {
        const cx = i % N;
        const cy = Math.floor(i / N);
        const x = ((cx + 0.5) / N) * 2 - 1;
        const y = ((cy + 0.5) / N) * 2 - 1;
        const metal = insideHex(x / 0.92, y / 0.92) && Math.hypot(x, y) > 0.36;
        const cracked = metal && crackDist(x, y) < 0.08;
        const v = cracked ? 0.85 : metal ? 0.42 + 0.18 * (y + 1) / 2 + hash(i) * 0.06 : 0.04 + hash(i) * 0.03;
        return <rect key={i} x={r2(xs[0] + cx * cell)} y={r2(top + cy * cell)} width={r2(cell)} height={r2(cell)} fill={`rgba(26,29,36,${r2(v)})`} />;
      })}

      {/* 2. edges */}
      <rect x={xs[1]} y={top} width={P} height={P} fill={C.paper} stroke={C.rule} />
      <path d={hexPath(xs[1], 0.92)} fill="none" stroke={C.ink} strokeWidth={1.4} strokeDasharray="7 3" />
      <circle cx={xs[1] + P / 2} cy={top + P / 2} r={0.36 * (P / 2)} fill="none" stroke={C.ink} strokeWidth={1.4} strokeDasharray="5 3" />
      <path d={crack(xs[1])} fill="none" stroke={C.ink} strokeWidth={1.4} strokeDasharray="5 3" />

      {/* 3. component shapes */}
      <rect x={xs[2]} y={top} width={P} height={P} fill={C.paper} stroke={C.rule} />
      <path d={hexPath(xs[2], 0.92)} fill={C.grey} stroke={C.ink} strokeWidth={1.6} />
      <circle cx={xs[2] + P / 2} cy={top + P / 2} r={0.36 * (P / 2)} fill={C.paper} stroke={C.ink} strokeWidth={1.6} />
      <path d={crack(xs[2])} fill="none" stroke={C.accent} strokeWidth={3.5} strokeLinecap="round" />

      {/* 4. classification */}
      {[
        { t: "intact", v: 0.04, tone: C.ink3 },
        { t: "defective", v: 0.96, tone: C.accent },
      ].map((o, i) => (
        <g key={o.t}>
          <text x={xs[3]} y={top + 52 + i * 52} fill={o.tone} style={i ? LB : L}>
            {o.t}
          </text>
          <rect x={xs[3]} y={top + 60 + i * 52} width={P} height={12} fill={C.grey} />
          <rect x={xs[3]} y={top + 60 + i * 52} width={r2(o.v * P)} height={12} fill={o.tone} />
          <text x={xs[3] + P} y={top + 52 + i * 52} textAnchor="end" fill={o.tone} style={i ? LB : L}>
            {o.v.toFixed(2)}
          </text>
        </g>
      ))}

      {["pixels", "edges", "component shapes", "classification"].map((t, i) => (
        <text key={t} x={xs[i] + P / 2} y={top + P + 26} textAnchor="middle" fill={C.ink} style={LB}>
          {t}
        </text>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Predictive AI Versus Generative AI
   -------------------------------------------------------------------------- */

export function PredictiveGenerative() {
  const field = (x: number, y: number, k: string, v: string) => (
    <g>
      <text x={x} y={y} fill={C.ink3} style={LS}>
        {k}
      </text>
      <text x={x + 150} y={y} textAnchor="end" fill={C.ink} style={label(12, 600)}>
        {v}
      </text>
    </g>
  );
  return (
    <Plate w={580} h={370} title="Predictive AI maps a customer record to a single churn probability of 0.82. Generative AI maps a prompt to a drafted customer email">
      <text x={0} y={16} fill={C.ink} style={LB}>
        predictive
      </text>
      <rect x={0} y={30} width={170} height={104} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <text x={10} y={50} fill={C.ink} style={label(12.5, 600)}>
        Customer C-2087
      </text>
      {field(10, 74, "tenure", "14 months")}
      {field(10, 96, "logins this month", "2")}
      {field(10, 118, "support tickets", "5")}
      <Arrow x1={180} y1={82} x2={248} y2={82} tone={C.ink3} />
      <rect x={256} y={50} width={76} height={64} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={270 + i * 13} y={98 - [14, 26, 20, 34][i]} width={9} height={[14, 26, 20, 34][i]} fill={C.ink3} />
      ))}
      <Arrow x1={340} y1={82} x2={408} y2={82} tone={C.ink3} />
      <text x={416} y={96} fill={C.accent} style={label(40, 700)}>
        0.82
      </text>
      <text x={416} y={126} fill={C.ink3} style={LS}>
        probability of canceling
      </text>

      <line x1={0} y1={170} x2={580} y2={170} stroke={C.rule} />

      <text x={0} y={200} fill={C.ink} style={LB}>
        generative
      </text>
      <rect x={0} y={214} width={170} height={82} rx={10} fill={C.grey} />
      <text x={12} y={240} fill={C.ink} style={label(12.5, 400)}>
        <tspan x={12}>Draft a retention</tspan>
        <tspan x={12} dy={18}>message for this</tspan>
        <tspan x={12} dy={18}>customer.</tspan>
      </text>
      <Arrow x1={180} y1={256} x2={248} y2={256} tone={C.ink3} />
      <rect x={256} y={224} width={76} height={64} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={268} y1={240 + i * 16} x2={268 + [52, 40, 30][i]} y2={240 + i * 16} stroke={C.ink3} strokeWidth={3} strokeLinecap="round" />
      ))}
      <Arrow x1={340} y1={256} x2={408} y2={256} tone={C.ink3} />
      <rect x={416} y={196} width={164} height={150} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <text x={428} y={218} fill={C.ink} style={label(12, 600)}>
        Subject: Thank you, Sam
      </text>
      <line x1={416} y1={228} x2={580} y2={228} stroke={C.rule} />
      <text x={428} y={248} fill={C.ink2} style={label(12, 400)}>
        Hi Sam,
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={428} y1={266 + i * 14} x2={r2(428 + (i === 4 ? 70 : 128 + hash(i + 33) * 12))} y2={266 + i * 14} stroke={C.ink3} strokeWidth={2.4} strokeLinecap="round" />
      ))}
    </Plate>
  );
}
