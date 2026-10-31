"use client";

import React, { useState } from "react";
import {
  ChartLine,
  CurrencyDollar,
  Gauge,
  Receipt,
  Stethoscope,
  Truck,
  User,
  UserCheck,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, hash, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 8 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned
   or chosen. See the course CLAUDE.md.
   ========================================================================== */

const L = label(13);
const LS = label(11.5, 400);
const LB = label(14, 600);
const LA = label(13, 600);

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

/** A polyline path from points. */
const path = (pts: [number, number][]) =>
  `M${pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L")}`;

/** Dollars in thousands or millions, as a plate reads them. */
const money = (v: number) =>
  v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : v >= 1e4 ? `$${Math.round(v / 1e3)}k` : `$${(v / 1e3).toFixed(1)}k`;

/* --------------------------------------------------------------------------
   Operational Effectiveness Versus Strategic Differentiation
   -------------------------------------------------------------------------- */

export function FrontierShift() {
  const ox = 70;
  const oy = 262;
  const pt = (a: number, b: number, deg: number, f = 1): [number, number] => {
    const t = (deg * Math.PI) / 180;
    return [r2(ox + a * f * Math.cos(t)), r2(oy - b * f * Math.sin(t))];
  };
  const arc = (a: number, b: number) => path(Array.from({ length: 87 }, (_, i) => pt(a, b, 3 + i)));
  const bump = path(
    Array.from({ length: 25 }, (_, i) => pt(700, 212, 22 + i, 1 + 0.13 * Math.sin((Math.PI * i) / 24))),
  );
  const firms = [25, 47, 68];
  const lit = pt(700, 212, 34, 1.12);
  return (
    <Plate
      w={960}
      h={292}
      title="Productivity frontier. When every firm in an industry licenses the same AI copilot, the frontier moves outward and all three firms rise together, keeping the same positions relative to one another: operational effectiveness. One firm pushes a distinctive part of the frontier beyond its rivals by building on proprietary data and workflows: strategic differentiation"
    >
      {/* axes */}
      <line x1={ox} y1={oy} x2={ox} y2={14} stroke={C.ink} />
      <line x1={ox} y1={oy} x2={900} y2={oy} stroke={C.ink} />
      <Arrow x1={ox} y1={40} x2={ox} y2={12} />
      <Arrow x1={860} y1={oy} x2={904} y2={oy} />
      <text x={ox - 14} y={140} fill={C.ink2} style={L} textAnchor="middle" transform={`rotate(-90 ${ox - 14} 140)`}>
        value to buyers
      </text>
      <text x={900} y={oy + 20} fill={C.ink2} style={L} textAnchor="end">
        lower cost
      </text>

      {/* frontiers */}
      <path d={arc(520, 150)} fill="none" stroke={C.ink3} strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={98} y={99} fill={C.ink3} style={LS}>
        industry frontier before the copilot
      </text>
      <path d={arc(700, 212)} fill="none" stroke={C.ink} strokeWidth={1.6} />
      <path d={bump} fill={C.tint} stroke={C.accent} strokeWidth={2} />
      <text x={98} y={38} fill={C.ink} style={LS}>
        after every firm licenses the same copilot
      </text>

      {/* the industry rises together */}
      {firms.map((d) => {
        const [x0, y0] = pt(520, 150, d, 0.82);
        const [x1, y1] = pt(700, 212, d, 0.82);
        return (
          <g key={d}>
            <circle cx={x0} cy={y0} r={6} fill="none" stroke={C.ink3} strokeWidth={1.3} />
            <Arrow x1={x0 + 6} y1={y0 - 3} x2={x1 - 7} y2={y1 + 4} tone={C.ink3} width={1.3} />
            <circle cx={x1} cy={y1} r={6.5} fill={C.ink3} />
          </g>
        );
      })}
      <text x={216} y={224} fill={C.ink} style={LA}>
        operational effectiveness
      </text>
      <text x={216} y={241} fill={C.ink2} style={LS}>
        every firm rises together, positions unchanged
      </text>

      {/* the one firm that leaves the shared frontier */}
      <circle cx={lit[0]} cy={lit[1]} r={7.5} fill={C.accent} />
      <text x={lit[0] + 18} y={lit[1] - 4} fill={C.accent} style={LA}>
        strategic differentiation
      </text>
      <text x={lit[0] + 18} y={lit[1] + 13} fill={C.ink2} style={LS}>
        proprietary data and workflows
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Four Layers of the Enterprise AI Stack
   -------------------------------------------------------------------------- */

const LAYERS = [
  {
    t: "application workflows",
    items: ["clinical triage", "tax preparation", "supply chain planning"],
    icons: [Stethoscope, Receipt, Truck],
  },
  {
    t: "enterprise data and orchestration",
    items: ["vector databases", "feature stores", "retrieval pipelines", "security guardrails", "observability"],
  },
  {
    t: "foundation models",
    items: ["proprietary labs", "open-weight consortia", "language, vision and multimodal models"],
  },
  {
    t: "hardware and compute",
    items: ["semiconductor accelerators", "networking fabric", "energy", "hyperscale data centers"],
  },
] as const;

export function AIStack() {
  const H = 58;
  const G = 10;
  return (
    <Plate
      w={960}
      h={4 * H + 3 * G + 4}
      title="The enterprise AI stack, from the bottom up: hardware and compute (semiconductor accelerators, networking fabric, energy and hyperscale data centers), foundation models (proprietary labs and open-weight consortia), enterprise data and orchestration (vector databases, feature stores, retrieval pipelines, security guardrails and observability), and application workflows such as clinical triage, tax preparation and supply chain planning"
    >
      {LAYERS.map((l, i) => {
        const y = 2 + i * (H + G);
        const top = i === 0;
        const inset = i * 14;
        return (
          <g key={l.t}>
            <Box x={inset} y={y} w={960 - 2 * inset} h={H} tone={top ? C.accent : C.ink} fill={top ? C.tint : i % 2 ? C.paper : C.grey} />
            <text x={inset + 20} y={y + 34} fill={top ? C.accent : C.ink} style={LB}>
              {l.t}
            </text>
            {"icons" in l ? (
              l.items.map((it, k) => (
                <g key={it}>
                  <Icon as={l.icons[k]} x={330 + k * 200} y={y + 29} size={28} tone={C.accent} />
                  <text x={352 + k * 200} y={y + 34} fill={C.ink} style={L}>
                    {it}
                  </text>
                </g>
              ))
            ) : (
              <text x={330} y={y + 34} fill={C.ink2} style={L}>
                {l.items.join("  |  ")}
              </text>
            )}
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Commoditization Pressure at the Foundation Model Layer
   --------------------------------------------------------------------------
   Real data. MMLU (5-shot) as reported by each developer: GPT-3.5 70.0,
   GPT-4 86.4 (OpenAI 2023), GPT-4o 88.7 (OpenAI 2024). LLaMA 65B 63.4,
   Llama 2 70B 68.9, Llama 3 70B 82.0, Llama 3.1 405B 88.6 (Meta). Price per
   million tokens for GPT-3-level capability (MMLU 42): $60 for GPT-3 in
   November 2021, $0.06 for Llama 3.2 3B in 2024 (Appenzeller 2024, a16z).
   -------------------------------------------------------------------------- */

const GPT: [number, number][] = [
  [2022 + 10.5 / 12, 70.0],
  [2023 + 2.5 / 12, 86.4],
  [2024 + 4.5 / 12, 88.7],
];
const LLAMA: [number, number][] = [
  [2023 + 1.5 / 12, 63.4],
  [2023 + 6.5 / 12, 68.9],
  [2024 + 3.5 / 12, 82.0],
  [2024 + 6.5 / 12, 88.6],
];

export function Commoditization() {
  // capability chart
  const x0 = 60;
  const x1 = 440;
  const yB = 230;
  const X = (t: number) => r2(x0 + ((t - 2022.75) / 2.25) * (x1 - x0));
  const Y = (m: number) => r2(yB - ((m - 60) / 30) * 190);
  const steps = (pts: [number, number][], end: number) => {
    const out: [number, number][] = [];
    pts.forEach(([t, m], i) => {
      if (i) out.push([X(t), Y(pts[i - 1][1])]);
      out.push([X(t), Y(m)]);
    });
    out.push([X(end), Y(pts[pts.length - 1][1])]);
    return path(out);
  };

  // price chart (log scale)
  const p0 = 560;
  const p1 = 930;
  const PX = (t: number) => r2(p0 + ((t - 2021.5) / 3.5) * (p1 - p0));
  const PY = (v: number) => r2(yB - ((Math.log10(v) + 2) / 4) * 190);
  const a: [number, number] = [PX(2021 + 10.5 / 12), PY(60)];
  const b: [number, number] = [PX(2024 + 8.5 / 12), PY(0.06)];

  return (
    <Plate
      w={960}
      h={286}
      title="Real data. Left: MMLU benchmark scores reported by OpenAI and Meta. In March 2023 GPT-4 scored 86.4 while the best open-weight Llama model scored 63.4, a gap of 23 points. By July 2024 Llama 3.1 405B scored 88.6 against GPT-4o's 88.7. Right: the price per million tokens for GPT-3-level capability fell from 60 dollars in November 2021 to 6 cents in 2024, about a thousand times cheaper in three years"
    >
      <text x={x0} y={16} fill={C.ink} style={L}>
        MMLU benchmark score
      </text>
      <line x1={x0} y1={yB} x2={x1} y2={yB} stroke={C.ink} />
      {[60, 70, 80, 90].map((m) => (
        <g key={m}>
          <line x1={x0} y1={Y(m)} x2={x1} y2={Y(m)} stroke={C.rule} />
          <text x={x0 - 8} y={Y(m) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {m}
          </text>
        </g>
      ))}
      {[2023, 2024].map((t) => (
        <text key={t} x={X(t)} y={yB + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {t}
        </text>
      ))}
      <path d={steps(GPT, 2024.95)} fill="none" stroke={C.ink} strokeWidth={1.8} />
      <path d={steps(LLAMA, 2024.95)} fill="none" stroke={C.accent} strokeWidth={2} />
      {GPT.map(([t, m]) => (
        <circle key={t} cx={X(t)} cy={Y(m)} r={3.5} fill={C.ink} />
      ))}
      {LLAMA.map(([t, m]) => (
        <circle key={t} cx={X(t)} cy={Y(m)} r={3.5} fill={C.accent} />
      ))}
      <text x={X(2023 + 2.5 / 12) + 8} y={Y(86.4) - 8} fill={C.ink} style={LA}>
        OpenAI GPT
      </text>
      <text x={X(2023 + 6.5 / 12) + 8} y={Y(68.9) + 18} fill={C.accent} style={LA}>
        Meta Llama, open weights
      </text>
      {/* the gap, then and now */}
      <line x1={X(2023 + 2.5 / 12)} y1={Y(86.4) + 5} x2={X(2023 + 2.5 / 12)} y2={Y(63.4) - 3} stroke={C.ink3} strokeDasharray="3 3" />
      <text x={X(2023 + 2.5 / 12) - 6} y={Y(75) + 4} fill={C.ink2} style={LS} textAnchor="end">
        23 points
      </text>
      <text x={X(2024 + 6.5 / 12) + 8} y={Y(88.6) + 20} fill={C.ink2} style={LS}>
        0.1 point
      </text>

      <text x={p0} y={16} fill={C.ink} style={L}>
        price per million tokens, GPT-3-level capability
      </text>
      <line x1={p0} y1={yB} x2={p1} y2={yB} stroke={C.ink} />
      {[100, 1, 0.01].map((v) => (
        <g key={v}>
          <line x1={p0} y1={PY(v)} x2={p1} y2={PY(v)} stroke={C.rule} />
          <text x={p0 - 8} y={PY(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {`$${v}`}
          </text>
        </g>
      ))}
      {[2022, 2023, 2024].map((t) => (
        <text key={t} x={PX(t)} y={yB + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {t}
        </text>
      ))}
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.accent} strokeWidth={2} />
      <circle cx={a[0]} cy={a[1]} r={5} fill={C.ink} />
      <circle cx={b[0]} cy={b[1]} r={5} fill={C.accent} />
      <text x={a[0] + 12} y={a[1] - 10} fill={C.ink} style={LA}>
        $60
      </text>
      <text x={a[0] + 44} y={a[1] - 10} fill={C.ink3} style={LS}>
        GPT-3, 2021
      </text>
      <text x={b[0] - 12} y={b[1] + 14} fill={C.accent} style={LA} textAnchor="end">
        $0.06
      </text>
      <text x={b[0] - 56} y={b[1] + 14} fill={C.ink3} style={LS} textAnchor="end">
        Llama 3.2 3B, 2024
      </text>
      <text x={PX(2023.3)} y={PY(1.5) - 4} fill={C.ink2} style={LS}>
        about 1,000× cheaper in three years
      </text>

      <text x={0} y={282} fill={C.ink3} style={label(10, 400)}>
        Scores as reported by OpenAI and Meta. Prices from Appenzeller (2024), a16z.
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   What Makes a Data Asset a True Competitive Moat?
   -------------------------------------------------------------------------- */

const DATASETS = [
  { t: "public web text", s: [0, 0, 0] },
  { t: "generic customer chat logs", s: [1, 0, 0] },
  { t: "third-party demographic tables", s: [0, 0, 0] },
  { t: "ten years of loan decisions with repayment outcomes", s: [2, 2, 2] },
  { t: "machine sensor traces with verified failures", s: [2, 2, 2] },
];

/** A scoring disc: empty, half or full. */
function Score({ x, y, v, tone }: { x: number; y: number; v: number; tone: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={9} fill={v === 2 ? tone : C.paper} stroke={tone} strokeWidth={1.4} />
      {v === 1 && <path d={`M${x} ${y - 9}A9 9 0 0 1 ${x} ${y + 9}Z`} fill={tone} />}
    </g>
  );
}

export function MoatMatrix() {
  const cols = [
    { t: ["unique to", "the firm"], x: 470 },
    { t: ["verified", "outcome labels"], x: 580 },
    { t: ["costly for a", "rival to imitate"], x: 690 },
  ];
  const y0 = 64;
  const RH = 40;
  return (
    <Plate
      w={960}
      h={y0 + 5 * RH + 4}
      title="Scoring five datasets. Public web text, generic customer chat logs and third-party demographic tables score low on uniqueness, verified outcome labels and cost to imitate, because any competitor can buy or generate them. Ten years of loan decisions with repayment outcomes and machine sensor traces with verified failures score high on all three: they are exclusive byproducts of operations with closed-loop outcomes"
    >
      {cols.map((c) => (
        <Lines key={c.x} x={c.x} y={20} lines={c.t} style={LS} fill={C.ink2} anchor="middle" dy={14} />
      ))}
      {DATASETS.map((d, i) => {
        const y = y0 + i * RH;
        const lit = i >= 3;
        const tone = lit ? C.accent : C.ink3;
        return (
          <g key={d.t}>
            <line x1={0} y1={y - 20} x2={740} y2={y - 20} stroke={C.rule} />
            <text x={0} y={y + 5} fill={lit ? C.ink : C.ink2} style={lit ? LA : L}>
              {d.t}
            </text>
            {d.s.map((v, k) => (
              <Score key={k} x={cols[k].x} y={y} v={v} tone={tone} />
            ))}
          </g>
        );
      })}
      <line x1={0} y1={y0 + 5 * RH - 20} x2={740} y2={y0 + 5 * RH - 20} stroke={C.rule} />

      {/* brackets */}
      <path d={`M760 ${y0 - 14}h8v${2 * RH + 28}h-8`} fill="none" stroke={C.ink3} />
      <Lines x={782} y={y0 + RH - 2} lines={["bought or generated", "by any competitor"]} style={LS} fill={C.ink3} dy={14} />
      <path d={`M760 ${y0 + 3 * RH - 14}h8v${RH + 28}h-8`} fill="none" stroke={C.accent} strokeWidth={1.4} />
      <Lines x={782} y={y0 + 3.5 * RH - 2} lines={["exclusive byproduct", "with closed-loop outcomes"]} style={label(11.5, 600)} fill={C.accent} dy={14} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Data Flywheels and Diminishing Returns to Scale
   -------------------------------------------------------------------------- */

/** Accuracy against labeled examples on a static task. */
const acc = (n: number) => 0.95 - 8 / Math.sqrt(n);

export function FlywheelLab() {
  const [share, setShare] = useState(5);
  const leader = 1e7;
  const rival = (share / 100) * leader;
  const ratio = (acc(rival) / acc(leader)) * 100;

  // flywheel loop
  const cx = 168;
  const cy = 136;
  const R = 112;
  const nodes = [
    { t: ["better", "product"], a: -90 },
    { t: ["more", "users"], a: 0 },
    { t: ["more labeled", "outcome data"], a: 90 },
    { t: ["better", "model"], a: 180 },
  ];
  const at = (deg: number, r = R): [number, number] => {
    const t = (deg * Math.PI) / 180;
    return [r2(cx + r * Math.cos(t)), r2(cy + r * Math.sin(t))];
  };

  // learning curve
  const x0 = 390;
  const x1 = 900;
  const yB = 236;
  const X = (n: number) => r2(x0 + ((Math.log10(n) - 3) / 5) * (x1 - x0));
  const Y = (v: number) => r2(yB - ((v - 0.65) / 0.32) * 210);
  const curve = Array.from({ length: 101 }, (_, i) => {
    const n = 10 ** (3 + i / 20);
    return [X(n), Y(acc(n))] as [number, number];
  });

  return (
    <Plate
      w={960}
      h={318}
      title={`Interactive: drag the rival's data volume. A data flywheel runs from a better product to more users, more labeled outcome data and a better model. On a static task accuracy climbs steeply from 1 thousand to 100 thousand labeled examples and barely moves from 10 million to 100 million. A rival holding ${share} percent of the leader's 10 million examples reaches ${ratio.toFixed(1)} percent of the leader's accuracy`}
    >
      {/* the loop */}
      {nodes.map((n, i) => {
        const pts = Array.from({ length: 13 }, (_, k) => at(n.a + 33 + k * 2));
        const [ex, ey] = at(n.a + 59);
        const [px, py] = pts[pts.length - 1];
        return (
          <g key={i}>
            <path d={path(pts)} fill="none" stroke={C.ink3} strokeWidth={1.5} />
            <Arrow x1={px} y1={py} x2={ex} y2={ey} tone={C.ink3} width={1.5} />
          </g>
        );
      })}
      {nodes.map((n) => {
        const [x, y] = at(n.a);
        return (
          <g key={n.a}>
            <rect x={x - 50} y={y - 19} width={100} height={38} rx={4} fill={C.paper} stroke={n.a === 90 ? C.accent : C.ink} strokeWidth={1.3} />
            <Lines x={x} y={y - 3} lines={n.t} style={LS} fill={n.a === 90 ? C.accent : C.ink} anchor="middle" dy={13} />
          </g>
        );
      })}

      {/* the learning curve */}
      <text x={x0} y={16} fill={C.ink} style={L}>
        model accuracy on a static task
      </text>
      <line x1={x0} y1={yB} x2={x1} y2={yB} stroke={C.ink} />
      {[0.7, 0.8, 0.9].map((v) => (
        <g key={v}>
          <line x1={x0} y1={Y(v)} x2={x1} y2={Y(v)} stroke={C.rule} />
          <text x={x0 - 8} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {`${Math.round(v * 100)}%`}
          </text>
        </g>
      ))}
      {[
        [1e3, "1 thousand"],
        [1e5, "100 thousand"],
        [1e7, "10 million"],
        [1e8, "100 million"],
      ].map(([n, t]) => (
        <text key={t} x={X(n as number)} y={yB + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {t}
        </text>
      ))}
      <text x={x1} y={yB + 36} textAnchor="end" fill={C.ink2} style={LS}>
        labeled examples, log scale
      </text>
      <path d={path(curve)} fill="none" stroke={C.ink} strokeWidth={1.7} />

      <line x1={X(leader)} y1={Y(acc(leader))} x2={X(leader)} y2={yB} stroke={C.ink3} strokeDasharray="3 3" />
      <circle cx={X(leader)} cy={Y(acc(leader))} r={6} fill={C.ink} />
      <text x={X(leader) + 8} y={Y(acc(leader)) - 12} fill={C.ink} style={LA}>
        leader
      </text>

      <line x1={X(rival)} y1={Y(acc(rival))} x2={X(rival)} y2={yB} stroke={C.accent} strokeDasharray="3 3" />
      <circle cx={X(rival)} cy={Y(acc(rival))} r={6.5} fill={C.accent} />
      <text x={X(rival) - 10} y={Y(acc(rival)) - 12} fill={C.accent} style={LA} textAnchor="end">
        rival
      </text>

      {/* the knob */}
      <text x={0} y={303} fill={C.ink} style={L}>
        {"rival's data, as a share of the leader's 10 million"}
      </text>
      <Knob x={330} y={298} len={300} value={share} min={1} max={100} step={1} onChange={setShare} label="Rival's data volume as a percent of the leader's, from 1 to 100" />
      <text x={656} y={303} fill={C.accent} style={LB}>
        {`${share}%`}
      </text>
      <text x={734} y={305} fill={C.accent} style={label(22, 700)}>
        {`${ratio.toFixed(1)}%`}
      </text>
      <text x={820} y={303} fill={C.ink2} style={LS}>
        {"of the leader's accuracy"}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Four Procurement Archetypes for Enterprise AI
   -------------------------------------------------------------------------- */

const PARTS = ["workflow logic", "document index", "model weights", "training data and compute"];
const ARCHETYPES = [
  { t: ["buy turnkey", "SaaS"], own: ["vendor", "vendor", "vendor", "vendor"], ex: "meeting transcription" },
  { t: ["compose commercial", "API with RAG"], own: ["firm", "firm", "vendor", "vendor"], ex: "private document indexes" },
  { t: ["fine-tune and host", "open weights"], own: ["firm", "firm", "firm", "consortium"], ex: "data residency, high volume" },
  { t: ["train a proprietary", "model from scratch"], own: ["firm", "firm", "firm", "firm"], ex: "credit scoring" },
];

export function ArchetypeGrid() {
  const cx0 = 260;
  const CW = 172;
  const y0 = 54;
  const RH = 44;
  return (
    <Plate
      w={960}
      h={y0 + 4 * RH + 70}
      title="Four procurement archetypes along a spectrum of customization and control. Buying turnkey SaaS leaves the workflow logic, document index, model weights and training with the vendor. Composing a commercial API with RAG puts the workflow logic and document index with the firm. Fine-tuning and hosting open weights also brings the model weights inside the firm, on a base trained by an open-weight consortium. Training a proprietary model from scratch puts every part, including training data and compute, inside the firm"
    >
      {ARCHETYPES.map((a, k) => (
        <Lines key={k} x={cx0 + k * CW + CW / 2} y={18} lines={a.t} style={LA} fill={C.ink} anchor="middle" dy={16} />
      ))}
      {PARTS.map((p, i) => {
        const y = y0 + i * RH;
        return (
          <g key={p}>
            <text x={0} y={y + 26} fill={C.ink2} style={L}>
              {p}
            </text>
            {ARCHETYPES.map((a, k) => {
              const firm = a.own[i] === "firm";
              const x = cx0 + k * CW + 8;
              return (
                <g key={k}>
                  <rect x={x} y={y + 6} width={CW - 16} height={RH - 10} rx={3} fill={firm ? C.tint : C.paper} stroke={firm ? C.accent : C.rule} strokeWidth={firm ? 1.4 : 1.1} />
                  <text x={x + (CW - 16) / 2} y={y + 27} textAnchor="middle" fill={firm ? C.accent : C.ink3} style={firm ? LA : LS}>
                    {a.own[i]}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      {ARCHETYPES.map((a, k) => (
        <text key={k} x={cx0 + k * CW + CW / 2} y={y0 + 4 * RH + 22} textAnchor="middle" fill={C.ink3} style={LS}>
          {a.ex}
        </text>
      ))}
      <Arrow x1={cx0 + 8} y1={y0 + 4 * RH + 46} x2={cx0 + 4 * CW - 8} y2={y0 + 4 * RH + 46} tone={C.ink} width={1.4} />
      <text x={cx0 - 12} y={y0 + 4 * RH + 50} fill={C.ink2} style={L} textAnchor="end">
        customization and control
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Unit Economics: Fixed Training Costs Versus Variable Inference Costs
   -------------------------------------------------------------------------- */

/** $0.0002 per query: about 500 tokens at $0.40 per million, 30 days a month. */
const apiBill = (q: number) => q * 30 * 0.0002;
/** One fine-tuned small-model cluster: $120k a month, 50 million queries a day. */
const CLUSTER = 50e6;
const hostBill = (q: number) => Math.ceil(q / CLUSTER) * 120e3;

export function BreakEvenLab() {
  const [e, setE] = useState(62);
  const q = 10 ** (e / 10);
  const api = apiBill(q);
  const host = hostBill(q);
  const use = Math.min(100, (q / (Math.ceil(q / CLUSTER) * CLUSTER)) * 100);
  const apiWins = api < host;

  const x0 = 80;
  const x1 = 600;
  const yT = 24;
  const yB = 196;
  const X = (v: number) => r2(x0 + ((Math.log10(v) - 5) / 3) * (x1 - x0));
  const Y = (v: number) => r2(yB - ((Math.log10(v) - 2) / 4) * (yB - yT));
  const qs = Array.from({ length: 61 }, (_, i) => 10 ** (5 + i / 20));
  const apiLine = path(qs.map((v) => [X(v), Y(apiBill(v))]));
  const hostLine = path([
    [X(1e5), Y(120e3)],
    [X(CLUSTER), Y(120e3)],
    [X(CLUSTER), Y(240e3)],
    [X(1e8), Y(240e3)],
  ]);
  const cheap = path(
    qs.flatMap((v, i) => {
      const pt: [number, number] = [X(v), Y(Math.min(apiBill(v), hostBill(v)))];
      if (i && hostBill(v) !== hostBill(qs[i - 1])) return [[X(CLUSTER), Y(120e3)] as [number, number], [X(CLUSTER), Y(Math.min(apiBill(v), 240e3))] as [number, number], pt];
      return [pt];
    }),
  );
  const qLabel = q >= 1e6 ? `${(q / 1e6).toFixed(q >= 1e7 ? 0 : 1)} million` : `${Math.round(q / 1e3)} thousand`;

  return (
    <Plate
      w={960}
      h={262}
      title={`Interactive: drag the daily query volume. A commercial API charges about 2 hundredths of a cent per query, so its monthly bill rises with volume. Hosting a fine-tuned small open-weight model costs a fixed 120 thousand dollars a month per cluster, whether or not the GPUs sit idle. At ${qLabel} queries a day the API bill is ${money(api)} a month and hosting is ${money(host)}, so the ${apiWins ? "API" : "hosted model"} is cheaper. The two cross at 20 million queries a day`}
    >
      <text x={x0} y={14} fill={C.ink} style={L}>
        monthly cost, log scale
      </text>
      <line x1={x0} y1={yB} x2={x1} y2={yB} stroke={C.ink} />
      {[1e3, 1e4, 1e5, 1e6].map((v) => (
        <g key={v}>
          <line x1={x0} y1={Y(v)} x2={x1} y2={Y(v)} stroke={C.rule} />
          <text x={x0 - 8} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {v >= 1e6 ? "$1M" : `$${v / 1e3}k`}
          </text>
        </g>
      ))}
      {[
        [1e5, "100 thousand"],
        [1e6, "1 million"],
        [1e7, "10 million"],
        [1e8, "100 million"],
      ].map(([v, t]) => (
        <text key={t} x={X(v as number)} y={yB + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {t}
        </text>
      ))}
      <text x={x1} y={yB + 36} textAnchor="end" fill={C.ink2} style={LS}>
        queries per day
      </text>

      <path d={apiLine} fill="none" stroke={C.ink3} strokeWidth={1.4} />
      <path d={hostLine} fill="none" stroke={C.ink3} strokeWidth={1.4} />
      <path d={cheap} fill="none" stroke={C.accent} strokeWidth={3} strokeLinejoin="round" />
      <text x={X(2e5)} y={Y(apiBill(2e5)) + 22} fill={C.ink} style={L}>
        commercial API, per token
      </text>
      <text x={X(1.2e5)} y={Y(120e3) - 10} fill={C.ink} style={L}>
        self-hosted open-weight model, fixed
      </text>
      <line x1={X(2e7)} y1={Y(120e3) + 6} x2={X(2e7)} y2={yB} stroke={C.ink3} strokeDasharray="3 3" />
      <text x={X(2e7) + 6} y={yB - 8} fill={C.ink2} style={LS}>
        break-even
      </text>

      <circle cx={X(q)} cy={Y(api)} r={5} fill={apiWins ? C.accent : C.paper} stroke={C.accent} strokeWidth={1.6} />
      <circle cx={X(q)} cy={Y(host)} r={5} fill={apiWins ? C.paper : C.accent} stroke={C.accent} strokeWidth={1.6} />

      {/* readout */}
      <text x={660} y={40} fill={C.ink2} style={L}>
        queries per day
      </text>
      <text x={660} y={68} fill={C.ink} style={label(20, 700)}>
        {qLabel}
      </text>
      <text x={660} y={102} fill={C.ink2} style={L}>
        API bill
      </text>
      <text x={950} y={102} fill={apiWins ? C.accent : C.ink} style={apiWins ? LB : L} textAnchor="end">
        {`${money(api)} a month`}
      </text>
      <text x={660} y={126} fill={C.ink2} style={L}>
        GPU hosting
      </text>
      <text x={950} y={126} fill={apiWins ? C.ink : C.accent} style={apiWins ? L : LB} textAnchor="end">
        {`${money(host)} a month`}
      </text>
      <line x1={660} y1={142} x2={950} y2={142} stroke={C.rule} />
      <text x={660} y={166} fill={C.ink2} style={L}>
        GPU capacity in use
      </text>
      <text x={950} y={166} fill={C.ink} style={L} textAnchor="end">
        {`${use < 1 ? use.toFixed(1) : Math.round(use)}%`}
      </text>
      <text x={660} y={196} fill={C.accent} style={LB}>
        {apiWins ? "the API is cheaper" : "hosting is cheaper"}
      </text>

      {/* the knob */}
      <Knob x={x0} y={246} len={x1 - x0} value={e} min={50} max={80} step={1} onChange={setE} label="Daily query volume, from 100 thousand to 100 million, on a log scale" />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Separating Model Metrics from Business Outcomes
   -------------------------------------------------------------------------- */

const CHAIN = [
  { icon: ChartLine, t: ["offline model", "accuracy"], v: "AUC 0.94" },
  { icon: UserCheck, t: ["worker", "adoption"], v: "31% of flags acted on" },
  { icon: Gauge, t: ["operational", "throughput"], v: "+1% files per day" },
  { icon: CurrencyDollar, t: ["net return", "on investment"], v: "−6%" },
];

export function ValueChain() {
  const xs = [110, 370, 630, 870];
  const breaks = [
    ["workers distrust", "or ignore the score"],
    ["added verification time", "and downstream bottlenecks"],
  ];
  return (
    <Plate
      w={960}
      h={250}
      title="Causal value chain for a claims fraud model. Offline accuracy is high, with an AUC of 0.94. Worker adoption is low: adjusters act on 31 percent of flags because they distrust or ignore the score. Added verification time and downstream bottlenecks hold throughput to 1 percent more files per day. Net return on investment is minus 6 percent"
    >
      <text x={xs[0]} y={16} fill={C.ink3} style={LS} textAnchor="middle">
        data science team
      </text>
      <text x={xs[3]} y={16} fill={C.ink3} style={LS} textAnchor="middle">
        executive leadership
      </text>
      {CHAIN.map((c, i) => {
        const last = i === 3;
        return (
          <g key={i}>
            <Icon as={c.icon} x={xs[i]} y={54} size={40} tone={last ? C.accent : C.ink} />
            <Lines x={xs[i]} y={98} lines={c.t} style={LA} fill={C.ink} anchor="middle" dy={16} />
            <text x={xs[i]} y={152} textAnchor="middle" fill={last ? C.accent : C.ink} style={label(last ? 24 : 16, 700)}>
              {c.v}
            </text>
          </g>
        );
      })}
      {[0, 1, 2].map((k) => {
        const a = xs[k] + 40;
        const b = xs[k + 1] - 40;
        const m = (a + b) / 2;
        const broken = k < 2;
        return (
          <g key={k}>
            {broken ? (
              <g stroke={C.ink3} strokeWidth={1.6} fill="none">
                <path d={`M${a} 54H${m - 10}l4 -8`} />
                <path d={`M${m + 10} 54l-4 8M${m + 10} 54H${b}`} />
                <Arrow x1={b - 10} y1={54} x2={b} y2={54} tone={C.ink3} width={1.6} />
              </g>
            ) : (
              <Arrow x1={a} y1={54} x2={b} y2={54} tone={C.ink3} width={1.6} />
            )}
            {broken && <Lines x={m} y={200} lines={breaks[k]} style={LS} fill={C.ink2} anchor="middle" dy={14} />}
            {broken && <line x1={m} y1={66} x2={m} y2={186} stroke={C.rule} strokeDasharray="2 3" />}
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Designing Controlled Experiments and A/B Tests for AI Systems
   -------------------------------------------------------------------------- */

const LIFT = 0.08;
const BASE = 40;
const noise = (k: number) => r2((hash(k) - 0.5) * 1.4);

export function ExperimentLab() {
  const [s, setS] = useState(15);
  const season = s / 100;
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const ctrl = weeks.map((w) => BASE * (w > 6 ? 1 + season : 1) + noise(w));
  const treat = weeks.map((w) => BASE * (w > 6 ? (1 + season) * (1 + LIFT) : 1) + noise(w + 40));
  const mean = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
  const beforeAfter = (mean(treat.slice(6)) / mean(treat.slice(0, 6)) - 1) * 100;
  const ab = (mean(treat.slice(6)) / mean(ctrl.slice(6)) - 1) * 100;

  // random assignment
  const people = Array.from({ length: 20 }, (_, i) => ({
    x: 22 + (i % 5) * 38,
    y: 44 + Math.floor(i / 5) * 40,
    t: hash(i * 7 + 3) > 0.5,
  }));

  const x0 = 300;
  const x1 = 610;
  const yB = 226;
  const X = (w: number) => r2(x0 + ((w - 1) / 11) * (x1 - x0));
  const Y = (v: number) => r2(yB - ((v - 34) / 26) * 196);

  return (
    <Plate
      w={960}
      h={318}
      title={`Interactive: drag the seasonal demand shift. Twenty claims adjusters are randomly assigned to a treatment group with the AI system or a control group on the baseline workflow. After launch in week 7, seasonal demand lifts both groups by ${s} percent. A before-and-after comparison credits the AI with ${beforeAfter.toFixed(0)} percent, while treatment minus control gives the true ${ab.toFixed(0)} percent. Guardrail metrics: quality score 4.5 in both groups, downstream rework 3.2 percent with AI and 3.1 percent without`}
    >
      <text x={0} y={16} fill={C.ink} style={L}>
        random assignment
      </text>
      {people.map((p, i) => (
        <Icon key={i} as={User} x={p.x} y={p.y} size={26} tone={p.t ? C.accent : C.ink3} weight={p.t ? "fill" : "regular"} />
      ))}
      <Icon as={User} x={18} y={222} size={20} tone={C.accent} weight="fill" />
      <text x={34} y={226} fill={C.accent} style={LS}>
        treatment, with the AI system
      </text>
      <Icon as={User} x={18} y={246} size={20} tone={C.ink3} weight="regular" />
      <text x={34} y={250} fill={C.ink2} style={LS}>
        control, baseline workflow
      </text>

      {/* the weekly chart */}
      <text x={x0} y={16} fill={C.ink} style={L}>
        claims closed per adjuster each week
      </text>
      <line x1={x0} y1={yB} x2={x1} y2={yB} stroke={C.ink} />
      {[40, 50, 60].map((v) => (
        <g key={v}>
          <line x1={x0} y1={Y(v)} x2={x1} y2={Y(v)} stroke={C.rule} />
          <text x={x0 - 8} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {v}
          </text>
        </g>
      ))}
      <line x1={X(6.5)} y1={30} x2={X(6.5)} y2={yB} stroke={C.ink3} strokeDasharray="4 3" />
      <text x={X(6.5) + 6} y={40} fill={C.ink2} style={LS}>
        launch
      </text>
      {[1, 6, 12].map((w) => (
        <text key={w} x={X(w)} y={yB + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {`week ${w}`}
        </text>
      ))}
      <path d={path(ctrl.map((v, i) => [X(i + 1), Y(v)]))} fill="none" stroke={C.ink3} strokeWidth={1.7} />
      <path d={path(treat.map((v, i) => [X(i + 1), Y(v)]))} fill="none" stroke={C.accent} strokeWidth={2} />

      {/* estimates */}
      <text x={650} y={36} fill={C.ink2} style={L}>
        before and after, treatment only
      </text>
      <text x={950} y={36} fill={C.ink} style={LB} textAnchor="end">
        {`+${beforeAfter.toFixed(0)}%`}
      </text>
      <text x={650} y={62} fill={C.accent} style={LA}>
        treatment minus control
      </text>
      <text x={950} y={62} fill={C.accent} style={LB} textAnchor="end">
        {`+${ab.toFixed(0)}%`}
      </text>

      <line x1={650} y1={92} x2={950} y2={92} stroke={C.ink} />
      <text x={650} y={112} fill={C.ink3} style={LS}>
        after launch
      </text>
      <text x={850} y={112} fill={C.accent} style={LS} textAnchor="end">
        with AI
      </text>
      <text x={950} y={112} fill={C.ink3} style={LS} textAnchor="end">
        without
      </text>
      {[
        ["speed, claims a week", (mean(treat.slice(6))).toFixed(1), (mean(ctrl.slice(6))).toFixed(1)],
        ["quality score", "4.5", "4.5"],
        ["downstream rework", "3.2%", "3.1%"],
      ].map(([t, a, b], i) => (
        <g key={t}>
          <line x1={650} y1={122 + i * 30} x2={950} y2={122 + i * 30} stroke={C.rule} />
          <text x={650} y={141 + i * 30} fill={C.ink} style={L}>
            {t}
          </text>
          <text x={850} y={141 + i * 30} fill={C.accent} style={L} textAnchor="end">
            {a}
          </text>
          <text x={950} y={141 + i * 30} fill={C.ink2} style={L} textAnchor="end">
            {b}
          </text>
        </g>
      ))}
      <text x={650} y={238} fill={C.ink3} style={LS}>
        guardrail metrics hold
      </text>

      {/* the knob */}
      <text x={0} y={303} fill={C.ink} style={L}>
        seasonal demand shift after launch
      </text>
      <Knob x={250} y={298} len={460} value={s} min={0} max={30} step={1} onChange={setS} label="Seasonal demand shift after launch, from 0 to 30 percent" />
      <text x={740} y={303} fill={C.accent} style={LB}>
        {`+${s}%`}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Risk-Adjusted ROI and Hidden Cost Accounting
   -------------------------------------------------------------------------- */

const LEDGER = [
  { t: ["labor time", "saved, gross"], v: 2.4 },
  { t: ["fragmented,", "not converted"], v: -0.8 },
  { t: ["model", "development"], v: -0.25, cost: true },
  { t: ["tokens and", "compute"], v: -0.3, cost: true },
  { t: ["data pipeline", "maintenance"], v: -0.2, cost: true },
  { t: ["index updates,", "drift monitoring"], v: -0.15, cost: true },
  { t: ["human review", "labor"], v: -0.4, cost: true },
  { t: ["expected", "failure cost"], v: -0.2, cost: true },
];

export function ROILedger() {
  const CW = 106;
  const yB = 214;
  const Y = (v: number) => r2(yB - (v / 2.4) * 176);
  const bars = LEDGER.map((l, i) => {
    const from = LEDGER.slice(0, i).reduce((a, b) => a + b.v, 0);
    return { ...l, from, to: from + l.v };
  });
  const net = bars[bars.length - 1].to;
  const cost = -LEDGER.filter((l) => l.cost).reduce((a, l) => a + l.v, 0);
  return (
    <Plate
      w={960}
      h={292}
      title="Investment ledger in millions of dollars a year. A business case claims 2.4 million in gross labor time saved, but 0.8 million of it is fragmented minutes that never convert into savings. Lifecycle costs total 1.5 million: model development 0.25, tokens and compute 0.3, data pipeline maintenance 0.2, retrieval index updates and drift monitoring 0.15, human review labor 0.4 and the expected cost of residual failures 0.2. Development is 17 percent of lifecycle cost. The risk-adjusted net return is 0.1 million"
    >
      <line x1={0} y1={yB} x2={960} y2={yB} stroke={C.ink} />
      {bars.map((b, i) => {
        const x = i * CW + 18;
        const top = Y(Math.max(b.from, b.to));
        const h = Math.abs(Y(b.from) - Y(b.to));
        const gain = b.v > 0;
        return (
          <g key={i}>
            <rect x={x} y={top} width={70} height={r2(h)} fill={gain ? C.ink3 : C.paper} stroke={gain ? C.ink3 : C.ink} strokeWidth={1.2} opacity={gain ? 0.75 : 1} />
            {i < bars.length - 1 && <line x1={x + 70} y1={Y(b.to)} x2={x + CW} y2={Y(b.to)} stroke={C.ink3} strokeDasharray="2 2" />}
            <text x={x + 35} y={top - 6} textAnchor="middle" fill={C.ink} style={LS}>
              {gain ? `+${b.v.toFixed(1)}` : `−${Math.abs(b.v).toFixed(2).replace(/0$/, "")}`}
            </text>
            <Lines x={x + 35} y={yB + 18} lines={b.t} style={LS} fill={C.ink2} anchor="middle" dy={13} />
          </g>
        );
      })}
      {/* net */}
      <rect x={8 * CW + 18} y={Y(net)} width={70} height={r2(yB - Y(net))} fill={C.accent} />
      <text x={8 * CW + 53} y={Y(net) - 8} textAnchor="middle" fill={C.accent} style={LB}>
        {`+${net.toFixed(1)}`}
      </text>
      <Lines x={8 * CW + 53} y={yB + 18} lines={["risk-adjusted", "net return"]} style={label(11.5, 600)} fill={C.accent} anchor="middle" dy={13} />

      {/* lifecycle bracket */}
      <path d={`M${2 * CW + 18} 30v-8H${8 * CW - 18}v8`} fill="none" stroke={C.ink3} />
      <text x={5 * CW} y={14} textAnchor="middle" fill={C.ink2} style={LS}>
        {`lifecycle cost ${cost.toFixed(1)}, of which development is ${Math.round((0.25 / cost) * 100)}%`}
      </text>
      <text x={0} y={288} fill={C.ink3} style={LS}>
        $ million a year
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Why Enterprise AI Projects Stall in Pilot Purgatory
   -------------------------------------------------------------------------- */

const FUNNEL = [
  { n: 40, gate: ["pilots", "funded"] },
  { n: 24, gate: ["decision, owner", "and metric defined"], why: ["technology-first,", "no business owner"] },
  { n: 13, gate: ["live production", "data connected"], why: ["built on clean", "static CSV extracts"] },
  { n: 7, gate: ["legal, privacy and", "security cleared"], why: ["compliance review", "left to the end"] },
  { n: 3, gate: ["in production", "workflows"], why: ["incentives and", "habits unchanged"] },
];

export function PilotFunnel() {
  const CW = 192;
  const S = 12;
  const G = 4;
  return (
    <Plate
      w={960}
      h={250}
      title="Deployment funnel. Of 40 funded proof-of-concept pilots, 24 have a defined business decision, owner and metric, the rest being technology-first. 13 connect to live production data, the rest built on clean static CSV extracts. 7 clear legal, privacy and security review, the rest held back because compliance review was left to the end. Only 3 reach production workflows, because incentives and habits elsewhere did not change"
    >
      {FUNNEL.map((f, k) => {
        const cx = k * CW + CW / 2;
        const prev = k ? FUNNEL[k - 1].n : f.n;
        const last = k === FUNNEL.length - 1;
        const gx = cx - (8 * (S + G) - G) / 2;
        return (
          <g key={k}>
            <Lines x={cx} y={16} lines={f.gate} style={LS} fill={last ? C.accent : C.ink2} anchor="middle" dy={13} />
            {Array.from({ length: prev }, (_, i) => {
              const alive = i < f.n;
              return (
                <rect
                  key={i}
                  x={gx + (i % 8) * (S + G)}
                  y={52 + Math.floor(i / 8) * (S + G)}
                  width={S}
                  height={S}
                  rx={2}
                  fill={alive ? (last ? C.accent : C.ink3) : C.paper}
                  stroke={alive ? "none" : C.ink3}
                  strokeWidth={1}
                  strokeDasharray={alive ? undefined : "2 2"}
                />
              );
            })}
            <text x={cx} y={162} textAnchor="middle" fill={last ? C.accent : C.ink} style={label(22, 700)}>
              {f.n}
            </text>
            {f.why && (
              <>
                <text x={cx} y={196} textAnchor="middle" fill={C.ink3} style={LS}>
                  {`${prev - f.n} stall`}
                </text>
                <Lines x={cx} y={214} lines={f.why} style={LS} fill={C.ink2} anchor="middle" dy={14} />
              </>
            )}
            {k > 0 && <Arrow x1={cx - CW / 2 - 12} y1={84} x2={cx - CW / 2 + 12} y2={84} tone={C.ink3} width={1.3} />}
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Operating Models: Centralized, Decentralized, and Hub-and-Spoke
   -------------------------------------------------------------------------- */

const UNITS = ["marketing", "finance", "operations"];

/** Small figures standing for machine learning engineers and analysts. */
function Team({ x, y, n, tone, cols = 3 }: { x: number; y: number; n: number; tone: string; cols?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} as={User} x={x + (i % cols) * 18} y={y + Math.floor(i / cols) * 20} size={18} tone={tone} weight="fill" />
      ))}
    </g>
  );
}

export function OperatingModels() {
  const PW = 296;
  const GAP = 36;
  const unitW = 88;
  const uy = 150;
  const panel = (k: number) => k * (PW + GAP);
  const unitX = (k: number, i: number) => panel(k) + i * (unitW + 16);
  return (
    <Plate
      w={960}
      h={222}
      title="Three operating models. In a centralized AI lab, every engineer sits in one corporate group far from marketing, finance and operations. In a fully decentralized model, each business unit has its own analysts, its own vendor tools and its own data silo. In a hub-and-spoke model, a central platform hub provides shared data pipelines, a model gateway, security guardrails and evaluation, while embedded domain teams sit inside each business unit"
    >
      {[
        ["centralized AI lab"],
        ["fully decentralized"],
        ["hub-and-spoke"],
      ].map(([t], k) => (
        <text key={t} x={panel(k)} y={16} fill={k === 2 ? C.accent : C.ink} style={LB}>
          {t}
        </text>
      ))}

      {/* business units, the same in every panel */}
      {[0, 1, 2].map((k) =>
        UNITS.map((u, i) => (
          <g key={`${k}-${u}`}>
            <Box x={unitX(k, i)} y={uy} w={unitW} h={48} tone={C.ink} />
            <text x={unitX(k, i) + unitW / 2} y={uy + 64} textAnchor="middle" fill={C.ink2} style={LS}>
              {u}
            </text>
          </g>
        )),
      )}

      {/* centralized: one lab far above the units */}
      <Box x={panel(0) + 70} y={34} w={156} h={68} tone={C.ink} fill={C.grey} />
      <Team x={panel(0) + 98} y={52} n={12} tone={C.ink} cols={6} />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={panel(0) + 148} y1={102} x2={unitX(0, i) + unitW / 2} y2={uy} stroke={C.ink3} strokeDasharray="2 5" />
      ))}

      {/* decentralized: each unit with its own team, tools and data */}
      {UNITS.map((u, i) => {
        const x = unitX(1, i);
        return (
          <g key={u}>
            <Team x={x + 26} y={uy + 13} n={3} tone={C.ink} />
            <rect x={x + 16} y={uy + 26} width={14} height={14} fill={C.paper} stroke={C.ink3} />
            <rect x={x + 36} y={uy + 26} width={14} height={14} rx={7} fill={C.paper} stroke={C.ink3} />
            <ellipse cx={x + 66} cy={uy + 28} rx={8} ry={3} fill={C.paper} stroke={C.ink3} />
            <path d={`M${x + 58} ${uy + 28}v10a8 3 0 0 0 16 0v-10`} fill={C.paper} stroke={C.ink3} />
          </g>
        );
      })}
      {UNITS.map((u, i) => (
        <g key={`s-${u}`}>
          <rect x={unitX(1, i) + 8} y={64} width={72} height={18} rx={3} fill={C.paper} stroke={C.ink3} strokeDasharray="3 2" />
          <text x={unitX(1, i) + 44} y={77} textAnchor="middle" fill={C.ink3} style={label(10, 400)}>
            {`contract ${i + 1}`}
          </text>
          <line x1={unitX(1, i) + 44} y1={82} x2={unitX(1, i) + 44} y2={uy} stroke={C.ink3} strokeDasharray="2 3" />
        </g>
      ))}

      {/* hub-and-spoke: one platform, teams embedded in every unit */}
      <Box x={panel(2) + 40} y={34} w={216} h={78} tone={C.accent} />
      {["data pipelines", "model gateway", "guardrails", "evaluation"].map((t, i) => (
        <g key={t}>
          <rect x={panel(2) + 50 + (i % 2) * 102} y={42 + Math.floor(i / 2) * 34} width={94} height={26} rx={3} fill={C.paper} stroke={C.accent} strokeWidth={1} />
          <text x={panel(2) + 97 + (i % 2) * 102} y={59 + Math.floor(i / 2) * 34} textAnchor="middle" fill={C.accent} style={label(11, 500)}>
            {t}
          </text>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <line key={i} x1={panel(2) + 148} y1={112} x2={unitX(2, i) + unitW / 2} y2={uy} stroke={C.accent} strokeWidth={1.4} />
      ))}
      {[0, 1, 2].map((i) => (
        <Team key={i} x={unitX(2, i) + 35} y={uy + 24} n={2} tone={C.accent} />
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Executive Leadership and Portfolio Prioritization
   -------------------------------------------------------------------------- */

const INITIATIVES = [
  { t: "claims triage", r: 0.74, v: 0.84, lit: true },
  { t: "underwriting risk model", r: 0.3, v: 0.8 },
  { t: "invoice matching", r: 0.66, v: 0.4 },
  { t: "meeting summaries", r: 0.86, v: 0.3 },
  { t: "HR policy chatbot", r: 0.28, v: 0.22, cut: true },
  { t: "marketing copy demo", r: 0.14, v: 0.36, cut: true },
];

export function PortfolioMatrix() {
  const x0 = 70;
  const x1 = 760;
  const yT = 12;
  const yB = 262;
  const X = (r: number) => r2(x0 + r * (x1 - x0));
  const Y = (v: number) => r2(yB - v * (yB - yT));
  return (
    <Plate
      w={960}
      h={300}
      title="Portfolio matrix plotting initiatives by readiness and value. Claims triage, high on both, receives concentrated multi-quarter investment. Invoice matching and meeting summaries, high in readiness and moderate in value, serve as foundational learning projects. An underwriting risk model is valuable but not yet ready. An HR policy chatbot and a marketing copy demo, low on both, are pruned at the stage gate"
    >
      <rect x={X(0.5)} y={yT} width={X(1) - X(0.5)} height={Y(0.5) - yT} fill={C.tint} />
      <line x1={x0} y1={yB} x2={x1} y2={yB} stroke={C.ink} />
      <line x1={x0} y1={yB} x2={x0} y2={yT} stroke={C.ink} />
      <line x1={X(0.5)} y1={yT} x2={X(0.5)} y2={yB} stroke={C.rule} />
      <line x1={x0} y1={Y(0.5)} x2={x1} y2={Y(0.5)} stroke={C.rule} />
      <text x={x0 - 14} y={(yT + yB) / 2} fill={C.ink2} style={L} textAnchor="middle" transform={`rotate(-90 ${x0 - 14} ${(yT + yB) / 2})`}>
        strategic and financial value
      </text>
      <text x={x1} y={yB + 20} fill={C.ink2} style={L} textAnchor="end">
        data, technical and governance readiness
      </text>

      <text x={X(0.98)} y={yT + 22} fill={C.accent} style={LA} textAnchor="end">
        concentrated investment
      </text>
      <text x={X(0.98)} y={yB - 12} fill={C.ink} style={LA} textAnchor="end">
        foundational learning projects
      </text>
      <text x={X(0.02)} y={yB - 12} fill={C.ink} style={LA}>
        prune at the stage gate
      </text>

      {INITIATIVES.map((d) => {
        const x = X(d.r);
        const y = Y(d.v);
        return (
          <g key={d.t}>
            {d.cut ? (
              <g stroke={C.ink3} strokeWidth={1.6}>
                <circle cx={x} cy={y} r={7} fill={C.paper} />
                <path d={`M${x - 5} ${y - 5}l10 10M${x + 5} ${y - 5}l-10 10`} />
              </g>
            ) : (
              <circle cx={x} cy={y} r={d.lit ? 8 : 6.5} fill={d.lit ? C.accent : C.ink} />
            )}
            <text x={x + 14} y={y + 4} fill={d.lit ? C.accent : d.cut ? C.ink3 : C.ink} style={d.lit ? LA : L}>
              {d.t}
            </text>
          </g>
        );
      })}

      {/* talent moves from pruned pilots to the proven workflow */}
      <path d={`M${X(0.3)} ${Y(0.27)}Q${X(0.55)} ${Y(0.6)} ${X(0.72)} ${Y(0.8)}`} fill="none" stroke={C.accent} strokeDasharray="4 4" />
      <Arrow x1={X(0.7)} y1={Y(0.78)} x2={X(0.725)} y2={Y(0.805)} tone={C.accent} width={1.4} />
      <Lines x={790} y={Y(0.62)} lines={["talent reallocated", "to proven", "production workflows"]} style={LS} fill={C.accent} dy={14} />
    </Plate>
  );
}
