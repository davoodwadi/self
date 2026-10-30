"use client";

import React, { useState } from "react";
import {
  Anchor,
  Barricade,
  CalendarBlank,
  CheckCircle,
  CloudRain,
  CloudSlash,
  Cpu,
  Factory,
  Fire,
  Footprints,
  Hoodie,
  MagnifyingGlass,
  Newspaper,
  Package,
  Robot,
  Tag,
  Truck,
  User,
  Warehouse,
  WarningCircle,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, hash, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 6 PLATES
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

/** A row of choices under an interactive plate. */
function Choice<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-4 flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={`rounded border px-3 py-1.5 font-sans text-[0.9375rem] transition-colors ${
              on
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--rule)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--ink-3)]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** A polyline path from points. */
const path = (pts: [number, number][]) =>
  `M${pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join("L")}`;

/** Standard normal density and distribution function. */
const phi = (z: number) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
function Phi(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = phi(z) * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1 - d : d;
}
function PhiInv(p: number) {
  let lo = -6;
  let hi = 6;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (Phi(m) < p) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

/* --------------------------------------------------------------------------
   Coupling Machine Learning Prediction with Mathematical Optimization
   -------------------------------------------------------------------------- */

function Bell({ x, y, w, h, spread = 1, tone = C.ink }: { x: number; y: number; w: number; h: number; spread?: number; tone?: string }) {
  const pts: [number, number][] = Array.from({ length: 41 }, (_, i) => {
    const z = (i / 40 - 0.5) * 6;
    return [x + (i / 40) * w, y - h * Math.exp((-z * z) / (2 * spread * spread))];
  });
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={C.ink3} />
      <path d={`M${x} ${y}${path(pts).replace("M", "L")}L${x + w} ${y}Z`} fill={C.grey} stroke="none" />
      <path d={path(pts)} fill="none" stroke={tone} strokeWidth={1.4} />
    </g>
  );
}

export function PredictOptimize() {
  const preds = [
    { t: "next week's store demand", s: 1 },
    { t: "supplier transit time", s: 0.6 },
    { t: "turbine failure probability", s: 1.4 },
  ];
  const acts = [
    { t: "order quantities", icon: Package },
    { t: "production schedules", icon: CalendarBlank },
    { t: "truck routes", icon: Truck },
  ];
  // feasible region in the optimization panel
  const fx = 410;
  const fy = 262;
  const poly: [number, number][] = [
    [fx, fy],
    [fx, 118],
    [fx + 70, 104],
    [fx + 150, 150],
    [fx + 190, 212],
    [fx + 190, fy],
  ];
  return (
    <Plate
      w={960}
      h={300}
      title="Two-stage pipeline. Machine learning estimates distributions for store demand, transit time and failure probability. Mathematical optimization takes them as inputs and, inside the region allowed by truck weight limits, shelf capacity and shift labor rules, selects order quantities, production schedules and truck routes"
    >
      {/* stage 1 */}
      <text x={0} y={20} fill={C.ink} style={LB}>
        machine learning
      </text>
      <text x={0} y={40} fill={C.ink3} style={LS}>
        prediction: estimates uncertain quantities
      </text>
      <Box x={0} y={56} w={300} h={234} tone={C.ink3} />
      {preds.map((p, i) => {
        const y = 118 + i * 70;
        return (
          <g key={p.t}>
            <Bell x={16} y={y} w={88} h={40} spread={p.s} />
            <Lines x={118} y={y - 22} lines={p.t.split(/ (?=\S+$)/)} style={L} />
          </g>
        );
      })}
      <Arrow x1={308} y1={173} x2={360} y2={173} />

      {/* stage 2 */}
      <text x={370} y={20} fill={C.ink} style={LB}>
        mathematical optimization
      </text>
      <text x={370} y={40} fill={C.ink3} style={LS}>
        prescription: enforces hard constraints
      </text>
      <Box x={370} y={56} w={270} h={234} tone={C.ink} />
      <path d={`${path(poly)}Z`} fill={C.grey} stroke="none" />
      <line x1={fx} y1={fy} x2={fx + 214} y2={fy} stroke={C.ink3} />
      <line x1={fx} y1={fy} x2={fx} y2={74} stroke={C.ink3} />
      {/* constraint edges */}
      <path d={path([[fx, 118], [fx + 70, 104]])} stroke={C.ink} strokeWidth={1.6} />
      <path d={path([[fx + 70, 104], [fx + 150, 150]])} stroke={C.ink} strokeWidth={1.6} />
      <path d={path([[fx + 150, 150], [fx + 190, 212]])} stroke={C.ink} strokeWidth={1.6} />
      <text x={fx + 6} y={96} fill={C.ink2} style={LS}>
        shelf capacity
      </text>
      <text x={fx + 118} y={118} fill={C.ink2} style={LS}>
        truck weight limit
      </text>
      <Lines x={fx + 176} y={170} lines={["shift", "labor rules"]} style={LS} fill={C.ink2} dy={14} />
      {/* best feasible plan */}
      <circle cx={fx + 150} cy={150} r={6.5} fill={C.accent} />
      <Lines x={fx + 18} y={212} lines={["lowest cost plan", "inside the limits"]} style={label(12, 600)} fill={C.accent} dy={15} />
      <Arrow x1={648} y1={173} x2={700} y2={173} tone={C.accent} />

      {/* actions */}
      <text x={712} y={20} fill={C.accent} style={LB}>
        actions
      </text>
      <text x={712} y={40} fill={C.ink3} style={LS}>
        minimize cost or maximize service
      </text>
      {acts.map((a, i) => {
        const y = 100 + i * 70;
        return (
          <g key={a.t}>
            <Box x={712} y={y - 24} w={248} h={48} tone={C.accent} />
            <Icon as={a.icon} x={738} y={y} size={28} tone={C.accent} />
            <text x={762} y={y + 5} fill={C.accent} style={LA}>
              {a.t}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Point Forecasts Versus Probabilistic Quantile Forecasts
   Two products, both averaging 100 units a week.
   -------------------------------------------------------------------------- */

const HIST = Array.from({ length: 8 }, (_, i) => ({
  steady: Math.round(100 + (hash(i + 11) - 0.5) * 22),
  volatile: Math.round(100 + (hash(i + 41) - 0.5) * 84),
}));
const half = (base: number, h: number) => base * Math.sqrt(1 + (h - 1) / 6);

export function QuantileFan() {
  const panel = (ox: number, fan: boolean) => {
    const X = (w: number) => r2(ox + 46 + ((w + 7) / 19) * 330);
    const Y = (v: number) => r2(272 - (v / 200) * 216);
    const fut = Array.from({ length: 12 }, (_, k) => k + 1);
    const band = (base: number) =>
      `${path(fut.map((h) => [X(h), Y(100 + half(base, h))]))}L${fut
        .slice()
        .reverse()
        .map((h) => `${X(h)} ${Y(100 - half(base, h))}`)
        .join("L")}Z`;
    return (
      <g>
        <text x={ox} y={20} fill={fan ? C.accent : C.ink} style={LB}>
          {fan ? "probabilistic forecast" : "point forecast"}
        </text>
        {[0, 100, 200].map((v) => (
          <g key={v}>
            <line x1={X(-7) - 6} y1={Y(v)} x2={X(12) + 4} y2={Y(v)} stroke={C.rule} />
            <text x={ox + 34} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
              {v}
            </text>
          </g>
        ))}
        <line x1={X(0.5)} y1={Y(205)} x2={X(0.5)} y2={Y(0)} stroke={C.ink3} strokeDasharray="3 3" />
        <text x={X(0.5) - 6} y={Y(205) + 2} textAnchor="end" fill={C.ink3} style={LS}>
          now
        </text>
        {/* history */}
        {HIST.map((d, i) => (
          <g key={i}>
            <circle cx={X(i - 7)} cy={Y(d.steady)} r={3.4} fill={C.paper} stroke={C.ink3} strokeWidth={1.4} />
            <circle cx={X(i - 7)} cy={Y(d.volatile)} r={3.6} fill={C.ink} />
          </g>
        ))}
        {fan ? (
          <g>
            <path d={band(45)} fill={C.tint} stroke="none" />
            <path d={path(fut.map((h) => [X(h), Y(100 + half(45, h))]))} fill="none" stroke={C.accent} strokeWidth={1.4} />
            <path d={path(fut.map((h) => [X(h), Y(100 - half(45, h))]))} fill="none" stroke={C.accent} strokeWidth={1.4} />
            <path d={band(11)} fill="rgba(103, 109, 119, 0.32)" stroke="none" />
            <line x1={X(1)} y1={Y(100)} x2={X(12)} y2={Y(100)} stroke={C.accent} strokeWidth={2} />
            <text x={X(12) + 8} y={Y(100 + half(45, 12)) + 4} fill={C.accent} style={LA}>
              90th
            </text>
            <text x={X(12) + 8} y={Y(100) + 4} fill={C.accent} style={LA}>
              50th
            </text>
            <text x={X(12) + 8} y={Y(100 - half(45, 12)) + 4} fill={C.accent} style={LA}>
              10th
            </text>
            <circle cx={X(1)} cy={Y(145)} r={4} fill={C.accent} />
            <text x={X(1) + 8} y={Y(145) - 8} fill={C.accent} style={LA}>
              145
            </text>
          </g>
        ) : (
          <g>
            <line x1={X(1)} y1={Y(100)} x2={X(12)} y2={Y(100)} stroke={C.ink} strokeWidth={2.4} />
            <Lines x={X(1) + 4} y={Y(100) - 30} lines={["100 units per week", "for both products"]} style={L} />
          </g>
        )}
        {[1, 6, 12].map((h) => (
          <text key={h} x={X(h)} y={Y(0) + 18} textAnchor="middle" fill={C.ink3} style={LS}>
            {h}
          </text>
        ))}
        <text x={X(12)} y={Y(0) + 36} textAnchor="end" fill={C.ink3} style={LS}>
          weeks ahead
        </text>
      </g>
    );
  };
  return (
    <Plate
      w={960}
      h={334}
      title="Two products sell an average of 100 units a week. One has steady weekly sales and the other swings widely. A point forecast draws the same line at 100 for both. A probabilistic forecast draws a narrow band for the steady product and a wide 10th to 90th percentile fan for the volatile one, whose 90th percentile next week is 145 units"
    >
      {panel(0, false)}
      {panel(500, true)}
      {/* which dots are which */}
      <circle cx={6} cy={322} r={3.4} fill={C.paper} stroke={C.ink3} strokeWidth={1.4} />
      <text x={16} y={326} fill={C.ink2} style={LS}>
        steady product
      </text>
      <circle cx={120} cy={322} r={3.6} fill={C.ink} />
      <text x={130} y={326} fill={C.ink2} style={LS}>
        volatile product
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Demand Sensing and External Covariates
   -------------------------------------------------------------------------- */

const SKU_COLS = 6;
const SKU_ROWS = 4;
const JACKETS = [8, 14];
const NEW_JACKET = 15;

export function DemandSensing() {
  const covs = [
    { t: "price promotions", icon: Tag },
    { t: "weather forecasts", icon: CloudRain },
    { t: "holiday calendar", icon: CalendarBlank },
    { t: "web search trends", icon: MagnifyingGlass },
    { t: "in-store foot traffic", icon: Footprints },
  ];
  const mx = 330;
  const my = 170;
  const gx = 590;
  const gy = 40;
  const tw = 56;
  const th = 46;
  const tile = (k: number) => ({
    x: gx + (k % SKU_COLS) * (tw + 6),
    y: gy + Math.floor(k / SKU_COLS) * (th + 8),
  });
  const spark = (k: number, x: number, y: number, tone: string) => {
    const pts: [number, number][] = Array.from({ length: 9 }, (_, i) => [
      x + (JACKETS.includes(k) ? 24 : 6) + i * (JACKETS.includes(k) ? 3.6 : 5.5),
      y + th - 10 - (0.3 + 0.55 * hash(k * 13 + i)) * (th - 18),
    ]);
    return <path d={path(pts)} fill="none" stroke={tone} strokeWidth={1.3} />;
  };
  return (
    <Plate
      w={960}
      h={340}
      title="Demand sensing. Point-of-sale history and external covariates (price promotions, weather forecasts, holiday calendar, web search trends and in-store foot traffic) feed one global model trained across thousands of SKUs. It forecasts a newly launched winter jacket with no sales history from similar jackets"
    >
      <text x={0} y={20} fill={C.ink} style={LB}>
        point-of-sale history
      </text>
      <Box x={0} y={32} w={250} h={40} tone={C.ink3} />
      <path
        d={path(Array.from({ length: 24 }, (_, i) => [10 + i * 10, 62 - (0.2 + 0.7 * hash(i + 5)) * 22]))}
        fill="none"
        stroke={C.ink}
        strokeWidth={1.3}
      />
      <text x={0} y={104} fill={C.ink} style={LB}>
        external covariates
      </text>
      {covs.map((c, i) => {
        const y = 132 + i * 42;
        return (
          <g key={c.t}>
            <Icon as={c.icon} x={14} y={y} size={24} tone={C.ink} />
            <text x={34} y={y + 5} fill={C.ink} style={L}>
              {c.t}
            </text>
          </g>
        );
      })}
      {/* converge on the model */}
      <Arrow x1={256} y1={52} x2={mx - 6} y2={my - 22} tone={C.ink3} />
      {covs.map((c, i) => (
        <Arrow key={c.t} x1={190} y1={132 + i * 42} x2={mx - 6} y2={my - 8 + i * 4} tone={C.ink3} width={1.1} />
      ))}
      <Box x={mx} y={my - 44} w={190} h={88} tone={C.ink} />
      <text x={mx + 95} y={my - 12} textAnchor="middle" fill={C.ink} style={LB}>
        one global model
      </text>
      <Lines x={mx + 95} y={my + 10} lines={["trained across tens of", "thousands of SKUs"]} style={LS} fill={C.ink2} anchor="middle" dy={15} />
      <Arrow x1={mx + 196} y1={my} x2={gx - 10} y2={my} />

      {/* the SKU forecasts */}
      {Array.from({ length: SKU_COLS * SKU_ROWS }, (_, k) => {
        const { x, y } = tile(k);
        const isNew = k === NEW_JACKET;
        const isJacket = JACKETS.includes(k);
        return (
          <g key={k}>
            <rect x={x} y={y} width={tw} height={th} rx={3} fill={isNew ? C.tint : C.paper} stroke={isNew ? C.accent : C.rule} strokeWidth={isNew ? 1.6 : 1.1} />
            {isJacket || isNew ? <Icon as={Hoodie} x={x + 12} y={y + 14} size={16} tone={isNew ? C.accent : C.ink} weight="regular" /> : null}
            {!isNew && spark(k, x, y, isJacket ? C.ink : C.ink3)}
            {isNew && (
              <path
                d={path([
                  [x + 28, y + th - 12],
                  [x + 36, y + th - 22],
                  [x + 44, y + th - 32],
                  [x + 52, y + th - 26],
                ])}
                fill="none"
                stroke={C.accent}
                strokeWidth={2}
              />
            )}
          </g>
        );
      })}
      <Arrow x1={tile(JACKETS[0]).x + tw / 2} y1={tile(JACKETS[0]).y + th + 1} x2={tile(NEW_JACKET).x + 4} y2={tile(NEW_JACKET).y + 6} tone={C.accent} width={1.4} />
      <Arrow x1={tile(JACKETS[1]).x + tw + 1} y1={tile(JACKETS[1]).y + th / 2} x2={tile(NEW_JACKET).x - 3} y2={tile(NEW_JACKET).y + th / 2} tone={C.accent} width={1.4} />
      <Lines x={gx} y={gy + SKU_ROWS * (th + 8) + 18} lines={["new winter jacket with no sales history,", "forecast from similar jackets"]} style={LA} fill={C.accent} dy={17} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Bullwhip Effect and Information Sharing
   Each tier sets an order-up-to level from a smoothed forecast, two weeks of
   lead time. Shared data means every tier forecasts from point-of-sale sales.
   -------------------------------------------------------------------------- */

const WEEKS = 52;
const PROMO = [18, 21];
const DEMAND = Array.from(
  { length: WEEKS },
  (_, t) => 100 + (hash(t + 3) - 0.5) * 16 + (t >= PROMO[0] && t < PROMO[1] ? 14 : 0),
);
const TIERS = ["consumer purchases", "retailer orders", "wholesaler orders", "manufacturer orders", "raw-material supplier orders"];

function bullwhip(shared: boolean) {
  const lead = 2;
  const a = 0.35;
  const series = [DEMAND];
  let inc = DEMAND;
  for (let k = 0; k < 4; k++) {
    let F = 100;
    let prev = 100 * (lead + 1);
    const out: number[] = [];
    for (let t = 0; t < WEEKS; t++) {
      F = a * (shared ? DEMAND[t] : inc[t]) + (1 - a) * F;
      const S = F * (lead + 1);
      out.push(Math.max(0, inc[t] + S - prev));
      prev = S;
    }
    series.push(out);
    inc = out;
  }
  return series;
}
const sd = (x: number[]) => {
  const m = x.reduce((s, v) => s + v, 0) / x.length;
  return Math.sqrt(x.reduce((s, v) => s + (v - m) ** 2, 0) / x.length);
};
const BULL = { own: bullwhip(false), shared: bullwhip(true) };

export function BullwhipLab() {
  const [mode, setMode] = useState<"own" | "shared">("own");
  const series = BULL[mode];
  const x0 = 210;
  const x1 = 790;
  const rowH = 48;
  const top = 40;
  const X = (t: number) => r2(x0 + (t / (WEEKS - 1)) * (x1 - x0));
  const swings = series.map((s) => Math.round(sd(s)));
  return (
    <div className="w-full">
      <Plate
        w={960}
        h={316}
        title={`Interactive: weekly orders at five supply chain tiers over a year. ${
          mode === "own" ? "When each tier forecasts from its own customer's orders" : "When every tier forecasts from shared point-of-sale data"
        }, the typical weekly swing grows from ${swings[0]} units at the consumer to ${swings[4]} units at the raw-material supplier`}
      >
        <text x={x1 + 30} y={24} fill={C.ink3} style={LS}>
          typical weekly swing
        </text>
        {series.map((s, k) => {
          const mid = top + k * rowH + rowH / 2;
          const Y = (v: number) => r2(Math.min(mid + rowH / 2, Math.max(mid - rowH / 2, mid - ((v - 100) / 200) * rowH)));
          const lit = k === 4;
          return (
            <g key={k}>
              <text x={0} y={mid + 5} fill={C.ink} style={L}>
                {TIERS[k]}
              </text>
              <line x1={x0} y1={mid} x2={x1} y2={mid} stroke={C.rule} />
              <path
                d={path(s.map((v, t) => [X(t), Y(v)]))}
                fill="none"
                stroke={lit ? C.accent : C.ink}
                strokeWidth={lit ? 1.8 : 1.4}
                strokeLinejoin="round"
              />
              <text x={x1 + 30} y={mid + 6} fill={lit ? C.accent : C.ink} style={label(17, 700)}>
                ±{swings[k]}
              </text>
              <text x={x1 + 30 + (swings[k] >= 100 ? 46 : swings[k] >= 10 ? 36 : 26)} y={mid + 6} fill={C.ink3} style={LS}>
                units
              </text>
            </g>
          );
        })}
        {/* the promotion */}
        <rect x={X(PROMO[0])} y={top + 4} width={X(PROMO[1]) - X(PROMO[0])} height={rowH - 8} fill={C.grey} />
        <text x={X(PROMO[0]) + 4} y={top + 2} fill={C.ink3} style={LS}>
          temporary promotion
        </text>
        {[1, 26, 52].map((w) => (
          <text key={w} x={X(w - 1)} y={top + 5 * rowH + 18} textAnchor="middle" fill={C.ink3} style={LS}>
            week {w}
          </text>
        ))}
      </Plate>
      <Choice
        name="How each tier forecasts demand"
        value={mode}
        onChange={setMode}
        options={[
          { id: "own", label: "Each tier forecasts from its customer's orders" },
          { id: "shared", label: "All tiers share point-of-sale data" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Asymmetric Inventory Costs and the Newsvendor Trade-Off
   Demand for the device is normal, mean 100 units, standard deviation 25.
   -------------------------------------------------------------------------- */

const MU = 100;
const SIG = 25;
const expShort = (q: number) => {
  const z = (q - MU) / SIG;
  return SIG * (phi(z) - z * (1 - Phi(z)));
};
const expCost = (q: number, cu: number, co: number) => {
  const short = expShort(q);
  return cu * short + co * (q - MU + short);
};

export function NewsvendorLab() {
  const [cu, setCu] = useState(400);
  const [co, setCo] = useState(100);
  const frac = cu / (cu + co);
  const q = MU + PhiInv(frac) * SIG;
  const qs = Math.round(q);
  const x0 = 40;
  const x1 = 540;
  const X = (v: number) => r2(x0 + ((v - 30) / 140) * (x1 - x0));
  const db = 196;
  const DY = (v: number) => r2(db - (phi((v - MU) / SIG) / phi(0)) * 130);
  const grid = Array.from({ length: 71 }, (_, i) => 30 + i * 2);
  const left = grid.filter((v) => v <= q).concat([q]);
  const right = [q, ...grid.filter((v) => v > q)];
  const area = (pts: number[]) => `${path(pts.map((v) => [X(v), DY(v)]))}L${X(pts[pts.length - 1])} ${db}L${X(pts[0])} ${db}Z`;
  const costs = grid.map((v) => expCost(v, cu, co));
  const cmax = Math.max(...costs);
  const cmin = expCost(q, cu, co);
  const cb = 394;
  const CY = (v: number) => r2(cb - (v / cmax) * 110);
  return (
    <Plate
      w={560}
      h={560}
      title={`Interactive: drag the underage cost and the overage cost. With underage cost ${cu} dollars and overage cost ${co} dollars, the critical fractile is ${frac.toFixed(2)}, so the cost-minimizing order is ${qs} units, the ${Math.round(frac * 100)}th percentile of predicted demand`}
    >
      <text x={0} y={18} fill={C.ink} style={L}>
        predicted demand for the device
      </text>
      <path d={area(left)} fill={C.tint} stroke="none" />
      <path d={area(right)} fill={C.grey} stroke="none" />
      <path d={path(grid.map((v) => [X(v), DY(v)]))} fill="none" stroke={C.ink} strokeWidth={1.5} />
      <line x1={x0} y1={db} x2={x1} y2={db} stroke={C.ink} />
      {[50, 100, 150].map((v) => (
        <text key={v} x={X(v)} y={db + 18} textAnchor="middle" fill={C.ink3} style={LS}>
          {v}
        </text>
      ))}
      <text x={x1} y={db + 18} textAnchor="end" fill={C.ink3} style={LS}>
        units
      </text>
      <line x1={X(q)} y1={40} x2={X(q)} y2={cb} stroke={C.accent} strokeWidth={2} />
      <text x={X(q) + (q > 135 ? -8 : 8)} y={50} textAnchor={q > 135 ? "end" : "start"} fill={C.accent} style={LB}>
        order {qs} units
      </text>
      <text x={X(Math.max(q - 26, 34))} y={db - 14} textAnchor="start" fill={C.accent} style={LA}>
        {Math.round(frac * 100)}%
      </text>
      <text x={X(Math.min(q + 6, 150))} y={db - 14} textAnchor="start" fill={C.ink2} style={LA}>
        {100 - Math.round(frac * 100)}%
      </text>

      {/* expected cost */}
      <text x={0} y={252} fill={C.ink} style={L}>
        expected cost per period
      </text>
      <path d={path(grid.map((v, i) => [X(v), CY(costs[i])]))} fill="none" stroke={C.ink3} strokeWidth={1.6} />
      <line x1={x0} y1={cb} x2={x1} y2={cb} stroke={C.ink} />
      <circle cx={X(q)} cy={CY(cmin)} r={6} fill={C.accent} />
      <text x={X(q) + (q > 135 ? -10 : 10)} y={CY(cmin) - 10} textAnchor={q > 135 ? "end" : "start"} fill={C.accent} style={LA}>
        lowest: ${Math.round(cmin).toLocaleString("en-US")}
      </text>

      {/* the fractile */}
      <text x={0} y={436} fill={C.ink} style={L}>
        critical fractile
      </text>
      <text x={120} y={437} fill={C.accent} style={LB}>
        {cu} / ({cu} + {co}) = {frac.toFixed(2)}
      </text>

      <text x={0} y={482} fill={C.ink} style={L}>
        underage
      </text>
      <Knob x={100} y={478} len={330} value={cu} min={50} max={500} step={50} onChange={setCu} label="Underage cost per unit short, in dollars" />
      <text x={456} y={483} fill={C.accent} style={LB}>
        ${cu}
      </text>
      <text x={0} y={532} fill={C.ink} style={L}>
        overage
      </text>
      <Knob x={100} y={528} len={330} value={co} min={50} max={500} step={50} onChange={setCo} label="Overage cost per unsold unit, in dollars" tone={C.ink2} />
      <text x={456} y={533} fill={C.ink2} style={LB}>
        ${co}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Censored Demand and Multi-Echelon Replenishment
   Hourly demand Friday to Sunday, 8:00 to 20:00. The shelf empties at
   Saturday 12:00.
   -------------------------------------------------------------------------- */

const HOURLY = Array.from({ length: 36 }, (_, i) => {
  const day = Math.floor(i / 12);
  const h = i % 12;
  const base = [4, 7, 6][day];
  const amp = [4, 7, 5][day];
  return Math.max(1, Math.round(base + amp * Math.sin((Math.PI * (h + 0.5)) / 12) + (hash(i + 7) - 0.5) * 2));
});
const OUT_AT = 16;
const STOCK = HOURLY.slice(0, OUT_AT).reduce((s, v) => s + v, 0);
/** Units on the shelf at the start of each hour. */
const SHELF = HOURLY.map((_, i) => STOCK - HOURLY.slice(0, Math.min(i, OUT_AT)).reduce((s, v) => s + v, 0));

export function CensoredDemand() {
  const x0 = 50;
  const bw = 24.4;
  const X = (i: number) => r2(x0 + i * bw);
  const yb = 230;
  const Y = (v: number) => r2(yb - (v / 16) * 180);
  const SY = (v: number) => r2(318 - (v / STOCK) * 42);
  const xs = X(OUT_AT);
  return (
    <Plate
      w={960}
      h={350}
      title="Hourly demand from Friday to Sunday. Until the shelf empties at Saturday 12:00, recorded sales match demand. After that the register records zero sales while customers keep arriving at the weekend peak, so the lost sales never appear in the sales log"
    >
      {[0, 8, 16].map((v) => (
        <g key={v}>
          <line x1={x0} y1={Y(v)} x2={X(36)} y2={Y(v)} stroke={C.rule} />
          <text x={x0 - 8} y={Y(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {v}
          </text>
        </g>
      ))}
      <text x={0} y={22} fill={C.ink3} style={LS}>
        units per hour
      </text>
      {HOURLY.map((v, i) => {
        const lost = i >= OUT_AT;
        return (
          <rect
            key={i}
            x={X(i) + 3}
            y={Y(v)}
            width={bw - 6}
            height={r2(yb - Y(v))}
            fill={lost ? C.tint : C.ink}
            stroke={lost ? C.accent : "none"}
            strokeWidth={1.2}
            strokeDasharray={lost ? "3 2" : undefined}
          />
        );
      })}
      <line x1={x0} y1={yb} x2={X(36)} y2={yb} stroke={C.ink} />
      <line x1={xs} y1={44} x2={xs} y2={322} stroke={C.ink} strokeWidth={1.2} />
      <text x={xs + 6} y={50} fill={C.ink} style={LA}>
        shelf empty, Saturday 12:00
      </text>
      <Lines x={X(5)} y={64} lines={["recorded sales", "match demand"]} style={L} fill={C.ink} />
      <Lines x={X(25)} y={64} lines={["customers who wanted to buy,", "the register records zero"]} style={LA} fill={C.accent} />
      {["Friday", "Saturday", "Sunday"].map((d, k) => (
        <g key={d}>
          <text x={X(k * 12 + 6)} y={yb + 20} textAnchor="middle" fill={C.ink2} style={L}>
            {d}
          </text>
          {k > 0 && <line x1={X(k * 12)} y1={yb} x2={X(k * 12)} y2={yb + 26} stroke={C.ink3} />}
        </g>
      ))}
      {/* inventory timestamp log */}
      <text x={0} y={290} fill={C.ink3} style={LS}>
        on shelf
      </text>
      <path
        d={`M${X(0)} ${SY(SHELF[0])}${SHELF.map((v, i) => `L${X(i)} ${SY(v)}L${X(i + 1)} ${SY(i < OUT_AT ? v - HOURLY[i] : 0)}`).join("")}`}
        fill="none"
        stroke={C.ink}
        strokeWidth={1.5}
      />
      <line x1={x0} y1={318} x2={X(36)} y2={318} stroke={C.ink3} />
      <text x={X(36)} y={340} textAnchor="end" fill={C.ink3} style={LS}>
        0 units on shelf from Saturday 12:00
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Warehouse Robotics and Human-Robot Fulfillment
   Top-down floor: storage pods on the left, robots carry pods to people at
   stationary work cells on the right.
   -------------------------------------------------------------------------- */

function Pod({ x, y, carried = false, lit = false }: { x: number; y: number; carried?: boolean; lit?: boolean }) {
  return (
    <g>
      {carried && <rect x={x - 3} y={y - 3} width={42} height={42} rx={5} fill={C.ink} />}
      {carried && <Icon as={Robot} x={x + 18} y={y + 50} size={20} tone={C.ink} weight="regular" />}
      <rect x={x} y={y} width={36} height={36} rx={2} fill={lit ? C.tint : C.paper} stroke={lit ? C.accent : C.ink3} strokeWidth={1.3} />
      <line x1={x} y1={y + 12} x2={x + 36} y2={y + 12} stroke={lit ? C.accent : C.rule} />
      <line x1={x} y1={y + 24} x2={x + 36} y2={y + 24} stroke={lit ? C.accent : C.rule} />
      {lit && (
        <g fill={C.accent}>
          <rect x={x + 6} y={y + 3} width={9} height={7} />
          <rect x={x + 20} y={y + 3} width={9} height={7} />
        </g>
      )}
    </g>
  );
}

export function GoodsToPerson() {
  const cols = 7;
  const rows = 4;
  const px = (c: number) => 30 + c * 66;
  const py = (r: number) => 56 + r * 58;
  const gone = new Set(["2-1", "4-2", "5-0"]);
  const stations = [74, 154, 234];
  const routes: [number, number][][] = [
    [[px(5) + 18, py(0) + 18], [px(5) + 18, py(0) - 22], [700, py(0) - 22], [700, stations[0]], [770, stations[0]]],
    [[px(4) + 18, py(2) + 18], [px(4) + 51, py(2) + 18], [px(4) + 51, py(1) + 53], [720, py(1) + 53], [720, stations[1]], [770, stations[1]]],
    [[px(2) + 18, py(1) + 18], [px(2) + 51, py(1) + 18], [px(2) + 51, py(2) + 53], [px(6) + 51, py(2) + 53], [740, py(2) + 53], [740, stations[2]], [770, stations[2]]],
  ];
  return (
    <Plate
      w={960}
      h={330}
      title="Goods-to-person fulfillment center seen from above. Autonomous mobile robots lift storage pods out of the grid and carry them along planned, non-crossing routes to three stationary work cells, where people pick and pack. Slotting puts two items that are often bought together on the same pod"
    >
      <rect x={0} y={30} width={960} height={268} rx={4} fill="none" stroke={C.rule} />
      {Array.from({ length: cols * rows }, (_, k) => {
        const c = k % cols;
        const r = Math.floor(k / cols);
        if (gone.has(`${c}-${r}`)) return <rect key={k} x={px(c)} y={py(r)} width={36} height={36} rx={2} fill="none" stroke={C.rule} strokeDasharray="3 3" />;
        return <Pod key={k} x={px(c)} y={py(r)} lit={c === 1 && r === 3} />;
      })}
      {routes.map((pts, i) => (
        <g key={i}>
          <path d={path(pts.slice(0, -1))} fill="none" stroke={C.ink3} strokeWidth={1.4} strokeDasharray="5 4" />
          <Arrow x1={pts[pts.length - 2][0]} y1={pts[pts.length - 2][1]} x2={pts[pts.length - 1][0] - 8} y2={pts[pts.length - 1][1]} tone={C.ink3} width={1.4} />
        </g>
      ))}
      {stations.map((y, i) => (
        <g key={y}>
          <Pod x={780} y={y - 18} carried />
          <rect x={834} y={y - 26} width={58} height={52} rx={3} fill={C.grey} stroke={C.ink3} />
          <Icon as={User} x={918} y={y} size={36} tone={C.ink} />
          {i === 0 && <Icon as={Package} x={862} y={y} size={24} tone={C.ink} weight="regular" />}
        </g>
      ))}
      <line x1={px(1) + 18} y1={py(3) + 38} x2={px(1) + 18} y2={312} stroke={C.accent} strokeWidth={1.2} />
      <text x={px(1) + 26} y={322} fill={C.accent} style={LA}>
        slotting: items often bought together share a pod
      </text>
      <text x={600} y={22} fill={C.ink2} style={L}>
        multi-agent path planning
      </text>
      <text x={960} y={22} textAnchor="end" fill={C.ink2} style={L}>
        human dexterity
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Vehicle Routing Problem and Last-Mile Logistics
   -------------------------------------------------------------------------- */

type Node = [number, number];
const STOPS: Node[] = [
  [1, 0],
  [3, 0],
  [5, 1],
  [5, 3],
  [3, 4],
  [1, 4],
];
const MORNING: Node[] = [[0, 2], [5, 2], [5, 1], [5, 0], [3, 0], [1, 0], [1, 2], [1, 4], [3, 4], [5, 4], [5, 3], [5, 2], [0, 2]];
const AFTERNOON: Node[] = [[0, 2], [1, 2], [1, 0], [3, 0], [4, 0], [4, 1], [5, 1], [5, 3], [5, 4], [3, 4], [1, 4], [1, 2], [0, 2]];

export function VrpRoutes() {
  const panel = (ox: number, late: boolean) => {
    const X = (i: number) => ox + 40 + i * 74;
    const Y = (j: number) => 66 + j * 60;
    const P = (n: Node): [number, number] => [X(n[0]), Y(n[1])];
    const route = (late ? AFTERNOON : MORNING).map(P);
    // offset the return leg on the highway so both directions show
    const shown = route.map(([x, y], i, a) => (y === Y(2) && i > a.length / 2 && !late ? [x, y + 6] : [x, y]) as [number, number]);
    return (
      <g>
        <text x={ox} y={22} fill={late ? C.accent : C.ink} style={LB}>
          {late ? "afternoon, re-solved" : "morning plan"}
        </text>
        {[0, 1, 2, 3, 4].map((j) => (
          <line key={`h${j}`} x1={X(0)} y1={Y(j)} x2={X(5)} y2={Y(j)} stroke={C.rule} strokeWidth={j === 2 ? 9 : 1.2} strokeLinecap="round" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(4)} stroke={C.rule} strokeWidth={1.2} />
        ))}
        <text x={X(5) + 10} y={Y(2) + 4} fill={C.ink3} style={LS}>
          highway
        </text>
        {late && (
          <g>
            <line x1={X(2) + 14} y1={Y(2) - 12} x2={X(3) - 14} y2={Y(2) + 12} stroke={C.ink} strokeWidth={2} />
            <line x1={X(2) + 14} y1={Y(2) + 12} x2={X(3) - 14} y2={Y(2) - 12} stroke={C.ink} strokeWidth={2} />
            <Icon as={Barricade} x={X(2.5)} y={Y(2) - 26} size={24} tone={C.ink} />
            <text x={X(2.5) + 16} y={Y(2) - 22} fill={C.ink} style={LS}>
              closed
            </text>
          </g>
        )}
        <path d={path(shown)} fill="none" stroke={late ? C.accent : C.ink} strokeWidth={2.4} strokeLinejoin="round" />
        {STOPS.map((s, k) => (
          <circle key={k} cx={X(s[0])} cy={Y(s[1])} r={7} fill={C.paper} stroke={late ? C.accent : C.ink} strokeWidth={2} />
        ))}
        {late && (
          <g>
            <circle cx={X(4)} cy={Y(1)} r={7} fill={C.accent} />
            <text x={X(4) - 12} y={Y(1) - 10} textAnchor="end" fill={C.accent} style={label(12, 600)}>
              new pickup request
            </text>
          </g>
        )}
        <Icon as={Warehouse} x={X(0) - 22} y={Y(2)} size={30} tone={C.ink} />
        <text x={X(3)} y={Y(4) + 24} textAnchor="middle" fill={C.ink2} style={LS}>
          window 13:00 to 15:00
        </text>
      </g>
    );
  };
  return (
    <Plate
      w={960}
      h={346}
      title="Two delivery maps of the same six stops. The morning plan runs along the highway. In the afternoon a highway segment is closed and a new pickup request arrives, so the solver re-routes the van along city streets, adds the pickup and still reaches the stop whose time window is 13:00 to 15:00"
    >
      {panel(20, false)}
      {panel(500, true)}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Supply Chain Visibility and Unstructured Disruption Sensing
   -------------------------------------------------------------------------- */

export function MultiTierGraph() {
  const cx = { t3: 120, t2: 340, t1: 580, m: 840 };
  const t3 = [125, 195, 265];
  const t2 = [150, 215, 275];
  const t1 = [115, 190, 265];
  const edges: [number, number, number, number, boolean][] = [
    [cx.t3, t3[0], cx.t2, t2[0], false],
    [cx.t3, t3[1], cx.t2, t2[1], false],
    [cx.t3, t3[2], cx.t2, t2[2], false],
    [cx.t3, t3[1], cx.t2, t2[0], false],
    [cx.t2, t2[0], cx.t1, t1[0], true],
    [cx.t2, t2[0], cx.t1, t1[1], true],
    [cx.t2, t2[0], cx.t1, t1[2], true],
    [cx.t2, t2[1], cx.t1, t1[1], false],
    [cx.t2, t2[2], cx.t1, t1[2], false],
    ...t1.map((y) => [cx.t1, y, cx.m, 190, false] as [number, number, number, number, boolean]),
  ];
  const node = (x: number, y: number, lit = false) => (
    <g key={`${x}-${y}`}>
      <circle cx={x} cy={y} r={20} fill={lit ? C.tint : C.paper} stroke={lit ? C.accent : C.ink} strokeWidth={lit ? 2 : 1.3} />
      <Icon as={Factory} x={x} y={y} size={22} tone={lit ? C.accent : C.ink} weight="regular" />
    </g>
  );
  const alerts = [
    { icon: Newspaper, x: 250 },
    { icon: Anchor, x: 310 },
    { icon: CloudRain, x: 370 },
  ];
  return (
    <Plate
      w={960}
      h={340}
      title="Supplier network feeding one manufacturer. The manufacturer's direct contractual visibility covers only its three tier-1 suppliers. One tier-2 specialty supplier feeds all three of them. NLP alerts from news, port and weather feeds flag a factory fire at that hidden tier-2 plant"
    >
      {/* visibility */}
      <rect x={cx.t1 - 60} y={80} width={cx.m - cx.t1 + 120} height={226} rx={10} fill="none" stroke={C.ink3} strokeDasharray="6 4" />
      <text x={cx.t1 - 48} y={296} fill={C.ink2} style={L}>
        direct contractual visibility
      </text>
      {edges.map(([a, b, c, d, lit], i) => (
        <Arrow key={i} x1={a + 22} y1={b} x2={c - 24} y2={d} tone={lit ? C.accent : C.ink3} width={lit ? 1.8 : 1.2} />
      ))}
      {t3.map((y) => node(cx.t3, y))}
      {t2.map((y, i) => node(cx.t2, y, i === 0))}
      {t1.map((y) => node(cx.t1, y))}
      <rect x={cx.m - 30} y={160} width={60} height={60} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.6} />
      <Icon as={Factory} x={cx.m} y={190} size={36} tone={C.ink} />
      {/* alerts */}
      <text x={180} y={24} fill={C.accent} style={LA}>
        NLP risk alerts
      </text>
      {alerts.map((a) => (
        <g key={a.x}>
          <Icon as={a.icon} x={a.x} y={52} size={26} tone={C.ink} weight="regular" />
          <Arrow x1={a.x} y1={70} x2={cx.t2 + (a.x - cx.t2) * 0.25} y2={t2[0] - 26} tone={C.accent} width={1.2} />
        </g>
      ))}
      <Icon as={Fire} x={cx.t2 + 34} y={t2[0] - 22} size={24} tone={C.accent} weight="duotone" />
      <text x={cx.t2 + 50} y={t2[0] - 16} fill={C.accent} style={LA}>
        factory fire
      </text>
      {[
        ["tier 3", cx.t3],
        ["tier 2", cx.t2],
        ["tier 1", cx.t1],
      ].map(([t, x]) => (
        <text key={t} x={x} y={330} textAnchor="middle" fill={C.ink2} style={L}>
          {t}
        </text>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Reactive, Preventive, and Predictive Maintenance
   Three parts in turn, lasting 9, 12 and 8 weeks of operation.
   -------------------------------------------------------------------------- */

const LIVES = [9, 12, 8];

export function MaintenanceTimelines() {
  const x0 = 200;
  const x1 = 940;
  const T = 30;
  const X = (t: number) => r2(x0 + (t / T) * (x1 - x0));
  const rows = [
    { name: "reactive", sub: "run to failure", y: 62 },
    { name: "preventive", sub: "fixed schedule", y: 150 },
    { name: "predictive", sub: "remaining useful life", y: 238 },
  ];
  const H = 60;
  const health = (age: number, life: number) => 1 - (age / life) ** 2;
  const curve = (y: number, start: number, end: number, life: number) => {
    const pts: [number, number][] = [];
    for (let s = 0; s <= 20; s++) {
      const t = start + ((end - start) * s) / 20;
      pts.push([X(t), r2(y - H / 2 + (1 - health(t - start, life)) * H)]);
    }
    return pts;
  };
  // replacement times per policy
  const reactive: number[] = [];
  const predictive: number[] = [];
  const preventive: number[] = [];
  let t = 0;
  for (const life of LIVES) {
    reactive.push(t + life);
    t += life;
  }
  t = 0;
  for (const life of LIVES) {
    predictive.push(t + life - 1);
    t += life - 1;
  }
  for (let s = 6; s < T; s += 6) preventive.push(s);
  const segs = (stops: number[]) => {
    const out: { a: number; b: number; life: number }[] = [];
    let a = 0;
    let k = 0;
    for (const b of stops) {
      out.push({ a, b, life: LIVES[Math.min(k, LIVES.length - 1)] });
      a = b;
      k++;
    }
    if (a < T) out.push({ a, b: T, life: LIVES[Math.min(k, LIVES.length - 1)] });
    return out;
  };
  const policies = [reactive, preventive, predictive];
  return (
    <Plate
      w={960}
      h={300}
      title="Equipment health over 30 weeks under three policies. Reactive maintenance runs each part until it fails, causing three unplanned stoppages. Preventive maintenance replaces every six weeks, before any failure but while parts still have life left. Predictive maintenance estimates remaining useful life and replaces each part one week before its estimated failure, at a planned changeover"
    >
      {rows.map((r, k) => {
        const lit = k === 2;
        const tone = lit ? C.accent : C.ink;
        const top = r.y - H / 2;
        return (
          <g key={r.name}>
            <text x={0} y={r.y - 2} fill={tone} style={LB}>
              {r.name}
            </text>
            <text x={0} y={r.y + 17} fill={C.ink3} style={LS}>
              {r.sub}
            </text>
            <line x1={x0} y1={top + H} x2={x1} y2={top + H} stroke={C.rule} />
            {segs(policies[k]).map((s, i) => (
              <path key={i} d={path(curve(r.y, s.a, s.b, s.life))} fill="none" stroke={tone} strokeWidth={1.8} />
            ))}
            {policies[k].map((b, i) => {
              const sg = segs(policies[k])[i];
              const end = r2(top + (1 - health(b - sg.a, sg.life)) * H);
              return (
                <g key={b}>
                  <line x1={X(b)} y1={end} x2={X(b)} y2={top} stroke={tone} strokeWidth={1.2} strokeDasharray={k === 0 ? undefined : "3 3"} />
                  {k === 0 && (
                    <g stroke={C.ink} strokeWidth={2.2}>
                      <line x1={X(b) - 7} y1={end - 7} x2={X(b) + 7} y2={end + 7} />
                      <line x1={X(b) - 7} y1={end + 7} x2={X(b) + 7} y2={end - 7} />
                    </g>
                  )}
                  {k === 1 && (
                    <path
                      d={path(
                        Array.from({ length: 11 }, (_, j) => {
                          const tt = b + ((sg.a + sg.life - b) * j) / 10;
                          return [X(tt), r2(top + (1 - health(tt - sg.a, sg.life)) * H)] as [number, number];
                        }),
                      )}
                      fill="none"
                      stroke={C.ink3}
                      strokeWidth={1.3}
                      strokeDasharray="3 3"
                    />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
      <text x={X(9) + 10} y={rows[0].y + H / 2 + 4} fill={C.ink} style={LS}>
        unplanned stoppage
      </text>
      <text x={X(9) + 6} y={rows[1].y + H / 2 - 4} fill={C.ink2} style={LS}>
        life discarded
      </text>
      {/* RUL estimate on the first predictive cycle */}
      <line x1={X(4)} y1={rows[2].y + H / 2 + 14} x2={X(8)} y2={rows[2].y + H / 2 + 14} stroke={C.accent} strokeWidth={1.4} />
      <line x1={X(4)} y1={rows[2].y + H / 2 + 8} x2={X(4)} y2={rows[2].y + H / 2 + 20} stroke={C.accent} strokeWidth={1.4} />
      <line x1={X(8)} y1={rows[2].y + H / 2 + 8} x2={X(8)} y2={rows[2].y + H / 2 + 20} stroke={C.accent} strokeWidth={1.4} />
      <text x={X(8) + 8} y={rows[2].y + H / 2 + 19} fill={C.accent} style={label(12, 600)}>
        estimated remaining useful life, replaced at a planned changeover
      </text>
      <text x={X(0)} y={22} fill={C.ink3} style={LS}>
        equipment health
      </text>
      <text x={x1} y={22} textAnchor="end" fill={C.ink3} style={LS}>
        operating time
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Sensor Fusion and Anomaly Detection on Industrial Equipment
   -------------------------------------------------------------------------- */

const DEV = Array.from({ length: 60 }, (_, i) => {
  const load = i >= 18 && i < 22 ? 0.55 : 0;
  const drift = i >= 38 ? ((i - 38) / 22) ** 1.4 * 2.2 : 0;
  return 0.25 + (hash(i + 2) - 0.5) * 0.3 + load + drift;
});

export function SensorFusion() {
  const panels = [
    { t: "vibration spectrum", y: 40 },
    { t: "acoustic emissions", y: 150 },
    { t: "motor temperature", y: 260 },
  ];
  const ph = 66;
  const fx = 370;
  const fy = 190;
  const x0 = 520;
  const x1 = 950;
  const X = (i: number) => r2(x0 + (i / 59) * (x1 - x0));
  const yb = 330;
  const Y = (v: number) => r2(yb - (v / 2.8) * 250);
  const alert = DEV.findIndex((v, i) => i > 30 && v > 1 && DEV[i + 1] > 1);
  return (
    <Plate
      w={960}
      h={360}
      title="Vibration spectra, acoustic emissions and motor temperature are fused into one deviation-from-normal signal. A brief load change stays inside the normal operating band. Later the signal leaves the band and stays out, and the system raises an alert on bearing wear"
    >
      {panels.map((p, k) => (
        <g key={p.t}>
          <text x={0} y={p.y - 8} fill={C.ink} style={L}>
            {p.t}
          </text>
          <rect x={0} y={p.y} width={240} height={ph} rx={3} fill="none" stroke={C.rule} />
          {k === 0 &&
            Array.from({ length: 22 }, (_, i) => {
              const harm = i === 6 || i === 12;
              const h = harm ? (i === 6 ? 48 : 30) : 6 + hash(i + 31) * 12;
              return <rect key={i} x={8 + i * 10.4} y={r2(p.y + ph - 4 - h)} width={6} height={r2(h)} fill={harm ? C.accent : C.ink3} />;
            })}
          {k === 1 && (
            <path
              d={path(Array.from({ length: 116 }, (_, i) => [6 + i * 2, p.y + ph / 2 + Math.sin(i * 0.9) * (6 + hash(i) * 14) * (i > 70 ? 1.4 : 1)]))}
              fill="none"
              stroke={C.ink}
              strokeWidth={1}
            />
          )}
          {k === 2 && (
            <path
              d={path(Array.from({ length: 30 }, (_, i) => [6 + i * 7.9, p.y + ph - 18 - (i > 18 ? (i - 18) * 1.6 : 0) - hash(i + 9) * 6]))}
              fill="none"
              stroke={C.ink}
              strokeWidth={1.5}
            />
          )}
          <Arrow x1={248} y1={p.y + ph / 2} x2={fx - 44} y2={fy + (k - 1) * 18} tone={C.ink3} width={1.2} />
        </g>
      ))}
      <text x={60 + 8 * 10.4} y={36} fill={C.accent} style={label(11.5, 600)}>
        bearing harmonics
      </text>
      <circle cx={fx} cy={fy} r={40} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      <Lines x={fx} y={fy - 3} lines={["sensor", "fusion"]} style={LA} anchor="middle" dy={16} />
      <Arrow x1={fx + 46} y1={fy} x2={x0 - 12} y2={fy} />

      {/* deviation from the normal baseline */}
      <text x={x0} y={36} fill={C.ink} style={L}>
        deviation from normal operation
      </text>
      <rect x={x0} y={Y(1)} width={x1 - x0} height={r2(yb - Y(1))} fill={C.grey} />
      <text x={x0 + 6} y={Y(1) + 16} fill={C.ink2} style={LS}>
        normal operating band
      </text>
      <path d={path(DEV.map((v, i) => [X(i), Y(Math.min(v, 2.75))]))} fill="none" stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" />
      <path d={path(DEV.slice(alert).map((v, i) => [X(i + alert), Y(Math.min(v, 2.75))]))} fill="none" stroke={C.accent} strokeWidth={2.2} strokeLinejoin="round" />
      <line x1={x0} y1={yb} x2={x1} y2={yb} stroke={C.ink} />
      <text x={X(20)} y={Y(1) - 8} textAnchor="middle" fill={C.ink3} style={LS}>
        load change
      </text>
      <Icon as={WarningCircle} x={X(alert) - 4} y={Y(DEV[alert]) - 26} size={24} tone={C.accent} weight="duotone" />
      <Lines x={X(alert) - 22} y={Y(DEV[alert]) - 46} lines={["alert:", "bearing wear"]} style={LA} fill={C.accent} anchor="end" dy={16} />
      <text x={x1} y={yb + 20} textAnchor="end" fill={C.ink3} style={LS}>
        operating time
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Computer Vision for Automated Quality Inspection
   -------------------------------------------------------------------------- */

function Board({ x, y, bad = false }: { x: number; y: number; bad?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={76} height={40} rx={2} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
      <rect x={x + 26} y={y + 8} width={24} height={24} rx={1} fill={C.ink} />
      {[0, 1, 2, 3].map((k) => (
        <g key={k} stroke={C.ink3} strokeWidth={1.4}>
          <line x1={x + 29 + k * 6} y1={y + 4} x2={x + 29 + k * 6} y2={y + 8} />
          <line x1={x + 29 + k * 6} y1={y + 32} x2={x + 29 + k * 6} y2={y + 36} />
        </g>
      ))}
      {bad && <rect x={x + 34} y={y + 32} width={8} height={4} fill={C.accent} />}
    </g>
  );
}

export function CvInspection() {
  const belt = 230;
  const cam = 330;
  const gate = 700;
  return (
    <Plate
      w={960}
      h={330}
      title="Circuit boards ride a conveyor under a camera. An edge computer beside the belt processes each frame within a few milliseconds and opens a reject gate that drops the board with a solder bridge into a reject bin, and it keeps running when the external internet connection fails"
    >
      {/* belt, open at the gate */}
      <rect x={0} y={belt} width={gate - 10} height={18} rx={9} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <rect x={gate + 50} y={belt} width={150} height={18} rx={9} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={20 + i * 56} cy={belt + 9} r={5} fill="none" stroke={C.ink3} />
      ))}
      {[30, 170, 300, 520].map((x) => (
        <Board key={x} x={x} y={belt - 42} bad={x === 520} />
      ))}
      <Arrow x1={30} y1={belt + 42} x2={150} y2={belt + 42} tone={C.ink3} />
      {/* camera and field of view */}
      <rect x={cam - 18} y={92} width={36} height={22} rx={3} fill={C.ink} />
      <path d={`M${cam - 10} 114L${cam - 70} ${belt - 44}L${cam + 70} ${belt - 44}L${cam + 10} 114Z`} fill={C.tint} stroke="none" />
      {/* edge computer */}
      <rect x={cam + 90} y={60} width={70} height={56} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <Icon as={Cpu} x={cam + 125} y={88} size={32} tone={C.ink} />
      <line x1={cam + 18} y1={103} x2={cam + 90} y2={103} stroke={C.ink} strokeWidth={1.3} />
      <path d={`M${cam + 160} 88L${gate + 20} 88L${gate + 20} ${belt - 30}`} fill="none" stroke={C.accent} strokeWidth={1.8} />
      <Arrow x1={gate + 20} y1={belt - 40} x2={gate + 20} y2={belt - 8} tone={C.accent} width={1.8} />
      <text x={cam + 176} y={80} fill={C.accent} style={LA}>
        within a few milliseconds
      </text>
      {/* the gate swings down, the board drops into the bin */}
      <line x1={gate - 8} y1={belt + 4} x2={gate + 14} y2={belt + 44} stroke={C.accent} strokeWidth={6} strokeLinecap="round" />
      <path d={`M${gate - 40} 270V318H${gate + 90}V270`} fill="none" stroke={C.ink} strokeWidth={1.4} />
      <g transform={`rotate(-14 ${gate + 26} 294)`}>
        <Board x={gate - 12} y={274} bad />
      </g>
      <text x={gate + 100} y={312} fill={C.ink2} style={LS}>
        rejected
      </text>
      {/* offline */}
      <Icon as={CloudSlash} x={cam + 125} y={22} size={30} tone={C.ink3} weight="regular" />
      <text x={cam + 146} y={27} fill={C.ink3} style={LS}>
        runs without the internet
      </text>
      {/* magnified defect */}
      <circle cx={880} cy={100} r={66} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      <line x1={562} y1={belt - 6} x2={826} y2={138} stroke={C.ink3} strokeDasharray="3 3" />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={840 + k * 30} y={68} width={16} height={64} rx={2} fill={C.grey} stroke={C.ink} />
      ))}
      <rect x={856} y={110} width={14} height={12} fill={C.accent} />
      <text x={880} y={188} textAnchor="middle" fill={C.accent} style={LA}>
        solder bridge
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Agentic Workflows in Procurement and Supplier Coordination
   -------------------------------------------------------------------------- */

function Doc({ x, y, head, lines, odd }: { x: number; y: number; head: string; lines: string[]; odd?: number }) {
  return (
    <g>
      <path d={`M${x} ${y}h100l18 18v84h-118Z`} fill={C.paper} stroke={C.ink} strokeWidth={1.2} />
      <path d={`M${x + 100} ${y}v18h18`} fill="none" stroke={C.ink} strokeWidth={1.2} />
      <text x={x + 8} y={y + 20} fill={C.ink3} style={LS}>
        {head}
      </text>
      {lines.map((t, i) => (
        <g key={i}>
          {odd === i && <rect x={x + 4} y={y + 38 + i * 24} width={110} height={22} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.6} />}
          <text x={x + 8} y={y + 54 + i * 24} fill={C.ink} style={label(13, odd === i ? 700 : 500)}>
            {t}
          </text>
        </g>
      ))}
    </g>
  );
}

export function ThreeWayMatch() {
  const cases = [
    { y: 8, recv: "100 units", ok: true },
    { y: 150, recv: "80 units", ok: false },
  ];
  return (
    <Plate
      w={960}
      h={262}
      title="Three-way matching by a procurement agent. In the first case the purchase order, the warehouse receiving log and the supplier invoice all show 100 units, so the agent schedules payment. In the second case the receiving log shows only 80 units, so the agent escalates the exception to a human buyer"
    >
      {cases.map((c) => (
        <g key={c.y}>
          <Doc x={0} y={c.y} head="purchase order" lines={["100 units", "$4.20 each"]} />
          <Doc x={140} y={c.y} head="receiving log" lines={[c.recv, "received"]} odd={c.ok ? undefined : 0} />
          <Doc x={280} y={c.y} head="supplier invoice" lines={["100 units", "$420.00"]} />
          <Arrow x1={404} y1={c.y + 51} x2={444} y2={c.y + 51} tone={C.ink3} />
          <Icon as={Robot} x={476} y={c.y + 51} size={46} tone={C.ink} />
          <Arrow x1={510} y1={c.y + 51} x2={590} y2={c.y + 51} tone={c.ok ? C.accent : C.ink} />
          {c.ok ? (
            <g>
              <Icon as={CheckCircle} x={622} y={c.y + 51} size={36} tone={C.accent} weight="duotone" />
              <text x={650} y={c.y + 46} fill={C.accent} style={LB}>
                all three match
              </text>
              <text x={650} y={c.y + 66} fill={C.accent} style={L}>
                schedule payment automatically
              </text>
            </g>
          ) : (
            <g>
              <Icon as={WarningCircle} x={622} y={c.y + 51} size={36} tone={C.ink} weight="regular" />
              <Arrow x1={650} y1={c.y + 51} x2={720} y2={c.y + 51} tone={C.ink} />
              <Icon as={User} x={752} y={c.y + 51} size={40} tone={C.ink} />
              <Lines x={780} y={c.y + 46} lines={["exception escalated", "to a human buyer"]} style={LB} dy={20} />
            </g>
          )}
        </g>
      ))}
      <line x1={0} y1={130} x2={960} y2={130} stroke={C.rule} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Algorithmic Coupling and Automated Ordering Spirals
   Five retailers each order 100 units a day from one supplier that can ship
   540. Each agent raises its order in proportion to how far the quoted lead
   time exceeds the five-day norm by more than two days. A 2.5-day port delay
   runs from day 4 to day 13.
   -------------------------------------------------------------------------- */

const DAYS = 40;
const CAPACITY = 540;
function coupling(cap: number) {
  let backlog = 0;
  let lead = 5;
  const orders: number[] = [];
  const leads: number[] = [];
  for (let t = 0; t < DAYS; t++) {
    const delay = t >= 4 && t < 14 ? 2.5 : 0;
    const each = Math.min(100 * (1 + 0.5 * Math.max(0, lead - 7)), 100 * cap);
    const total = 5 * each;
    backlog = Math.max(0, backlog + total - CAPACITY);
    lead = 5 + delay + backlog / CAPACITY;
    orders.push(total);
    leads.push(lead);
  }
  return { orders, leads };
}
const UNCAPPED = coupling(Infinity);

export function CouplingLab() {
  const [cap, setCap] = useState(3);
  const { orders, leads } = coupling(cap);
  const x0 = 470;
  const x1 = 930;
  const X = (t: number) => r2(x0 + (t / (DAYS - 1)) * (x1 - x0));
  const ob = 170;
  const OMAX = 2000;
  const OY = (v: number) => r2(ob - (Math.min(v, OMAX) / OMAX) * 136);
  const lb = 334;
  const LMAX = 60;
  const LY = (v: number) => r2(lb - (Math.min(v, LMAX) / LMAX) * 112);
  const spiral = leads[DAYS - 1] > 8;
  const loop = [
    { t: ["quoted lead time", "lengthens"], x: 150, y: 66 },
    { t: ["every agent submits", "surge orders"], x: 280, y: 180 },
    { t: ["supplier backlog", "grows"], x: 150, y: 294 },
  ];
  return (
    <Plate
      w={960}
      h={414}
      title={`Interactive: drag the daily order-quantity cap. With each agent capped at ${Math.round(cap * 100)} percent of its normal order, total orders peak at ${Math.round(Math.max(...orders)).toLocaleString("en-US")} units a day against a supplier capacity of 540, and the quoted lead time ends the 40 days at ${leads[DAYS - 1].toFixed(1)} days`}
    >
      {/* the feedback loop */}
      <text x={0} y={22} fill={C.ink3} style={LS}>
        a 2.5-day port delay starts it
      </text>
      <Arrow x1={70} y1={32} x2={104} y2={58} tone={C.ink3} />
      {loop.map((n, i) => (
        <g key={i}>
          <Box x={n.x - 88} y={n.y - 26} w={176} h={52} tone={i === 1 ? C.accent : C.ink} />
          {i === 1 && (
            <g>
              {[0, 1, 2].map((k) => (
                <Icon key={k} as={Robot} x={n.x + 20 + k * 22} y={n.y - 44} size={22} tone={C.accent} />
              ))}
            </g>
          )}
          <Lines x={n.x} y={n.y - 4} lines={n.t} style={i === 1 ? LA : L} fill={i === 1 ? C.accent : C.ink} anchor="middle" dy={17} />
        </g>
      ))}
      <Arrow x1={238} y1={80} x2={272} y2={146} tone={C.ink} />
      <Arrow x1={272} y1={214} x2={238} y2={280} tone={C.ink} />
      <Arrow x1={92} y1={268} x2={92} y2={94} tone={C.ink} />

      {/* orders */}
      <text x={x0} y={22} fill={C.ink} style={L}>
        orders placed with the supplier per day
      </text>
      <path d={path(UNCAPPED.orders.map((v, t) => [X(t), OY(v)]))} fill="none" stroke={C.ink3} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={x1} y={OY(OMAX) + 14} textAnchor="end" fill={C.ink3} style={LS}>
        no cap
      </text>
      <line x1={x0} y1={OY(CAPACITY)} x2={x1} y2={OY(CAPACITY)} stroke={C.ink} strokeDasharray="6 4" />
      <text x={x1} y={OY(CAPACITY) + 16} textAnchor="end" fill={C.ink2} style={LS}>
        supplier capacity 540
      </text>
      <path d={path(orders.map((v, t) => [X(t), OY(v)]))} fill="none" stroke={C.accent} strokeWidth={2.2} strokeLinejoin="round" />
      <line x1={x0} y1={ob} x2={x1} y2={ob} stroke={C.ink} />
      {[0, 1000, 2000].map((v) => (
        <text key={v} x={x0 - 8} y={OY(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v.toLocaleString("en-US")}
        </text>
      ))}

      {/* lead time */}
      <text x={x0} y={204} fill={C.ink} style={L}>
        quoted lead time, days
      </text>
      <path d={path(UNCAPPED.leads.map((v, t) => [X(t), LY(v)]))} fill="none" stroke={C.ink3} strokeWidth={1.2} strokeDasharray="4 3" />
      <line x1={x0} y1={LY(7)} x2={x1} y2={LY(7)} stroke={C.ink3} strokeDasharray="2 3" />
      <text x={x0 - 8} y={LY(7) + 4} textAnchor="end" fill={C.ink2} style={LS}>
        surge trigger
      </text>
      <path d={path(leads.map((v, t) => [X(t), LY(v)]))} fill="none" stroke={C.accent} strokeWidth={2.2} strokeLinejoin="round" />
      <line x1={x0} y1={lb} x2={x1} y2={lb} stroke={C.ink} />
      {[30, 60].map((v) => (
        <text key={v} x={x0 - 8} y={LY(v) + 4} textAnchor="end" fill={C.ink3} style={LS}>
          {v}
        </text>
      ))}
      {[1, 20, 40].map((d) => (
        <text key={d} x={X(d - 1)} y={lb + 22} textAnchor="middle" fill={C.ink3} style={LS}>
          day {d}
        </text>
      ))}
      <text x={X(DAYS - 1) - 4} y={LY(leads[DAYS - 1]) - 10} textAnchor="end" fill={C.accent} style={LA}>
        {spiral ? `${leads[DAYS - 1].toFixed(0)} days and rising` : "back to normal"}
      </text>

      {/* the guardrail */}
      <text x={0} y={386} fill={C.ink} style={L}>
        daily order-quantity cap per agent
      </text>
      <Knob x={x0} y={382} len={x1 - x0 - 70} value={cap} min={1} max={3} step={0.1} onChange={(v) => setCap(Math.round(v * 10) / 10)} label="Daily order-quantity cap, as a multiple of each agent's normal order" />
      <text x={x1 - 50} y={387} fill={C.accent} style={LB}>
        {Math.round(cap * 100)}%
      </text>
      <text x={x0} y={408} fill={C.ink3} style={LS}>
        of normal order
      </text>
    </Plate>
  );
}
