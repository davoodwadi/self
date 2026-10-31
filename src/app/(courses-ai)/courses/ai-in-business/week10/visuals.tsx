"use client";

import React, { useState } from "react";
import {
  BatteryCharging,
  Brain,
  Buildings,
  ChartLineUp,
  ChatCircleText,
  Cloud,
  CloudSun,
  Code,
  Cpu,
  Database,
  Drop,
  Factory,
  FileText,
  Gauge,
  Leaf,
  Lightning,
  Robot,
  Scales,
  Sun,
  Table,
  Truck,
  Wind,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 10 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned
   or chosen. See the course CLAUDE.md.
   ========================================================================== */

const L = label(13);
const LS = label(11.5, 400);
const LB = label(14, 600);
const LA = label(13, 600);

/** Whole number with thousands separators, the same on server and client. */
const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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

/** A row of buttons under a plate, one of which is on. */
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

/** A server rack seen from the front: a frame of stacked units with status lights. */
function Rack({ x, y, w, h, units = 6, tone = C.ink }: { x: number; y: number; w: number; h: number; units?: number; tone?: string }) {
  const uh = (h - 12) / units;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={C.paper} stroke={tone} strokeWidth={1.4} />
      {Array.from({ length: units }, (_, i) => (
        <g key={i}>
          <rect x={x + 6} y={r2(y + 6 + i * uh)} width={w - 12} height={r2(uh - 4)} rx={1.5} fill={C.grey} stroke={C.ink3} strokeWidth={0.8} />
          <circle cx={x + w - 12} cy={r2(y + 6 + i * uh + (uh - 4) / 2)} r={2} fill={tone === C.accent ? C.accent : C.ink3} />
        </g>
      ))}
    </g>
  );
}

/** A hyperbolic cooling tower standing on `base`. */
function Tower({ cx, base, top, wb, wt, tone = C.ink }: { cx: number; base: number; top: number; wb: number; wt: number; tone?: string }) {
  const mid = top + (base - top) * 0.62;
  const ww = wt * 0.82;
  return (
    <path
      d={`M${cx - wb} ${base}Q${cx - ww} ${r2(mid)} ${cx - wt} ${top}L${cx + wt} ${top}Q${cx + ww} ${r2(mid)} ${cx + wb} ${base}Z`}
      fill={C.paper}
      stroke={tone}
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  );
}

/** Evaporated water rising off a tower: a column of soft puffs. */
function Plume({ cx, top }: { cx: number; top: number }) {
  const puffs: [number, number, number][] = [
    [0, -14, 14],
    [-9, -34, 15],
    [10, -50, 16],
    [-2, -70, 17],
  ];
  return (
    <g>
      {puffs.map(([dx, dy, r], i) => (
        <circle key={i} cx={cx + dx} cy={top + dy} r={r} fill={C.tint} stroke={C.accent} strokeWidth={1.2} />
      ))}
    </g>
  );
}

/* --------------------------------------------------------------------------
   The Dual Relationship Between AI and Sustainability
   -------------------------------------------------------------------------- */

export function DualSides() {
  const left = [
    { icon: Lightning, t: "electricity and carbon", y: 88 },
    { icon: Drop, t: "cooling water", y: 140 },
    { icon: Cpu, t: "hardware waste", y: 192 },
  ];
  const right = [
    { icon: Lightning, t: "energy grids", y: 76 },
    { icon: Truck, t: "transportation", y: 116 },
    { icon: Buildings, t: "buildings", y: 156 },
    { icon: Factory, t: "manufacturing", y: 196 },
  ];
  return (
    <Plate
      w={960}
      h={286}
      title="Two separate ledgers. On the left, the sustainability of AI: a server rack that draws electricity, cooling water and hardware, a footprint to measure and reduce. On the right, AI for sustainability: an AI chip that cuts emissions in energy grids, transportation, buildings and manufacturing. An inefficient internal chatbot is not offset by solar forecasting in another industry"
    >
      <text x={0} y={22} fill={C.ink} style={LB}>
        sustainability of AI (Green AI)
      </text>
      <text x={0} y={42} fill={C.ink3} style={LS}>
        footprint to measure and reduce
      </text>
      <Rack x={30} y={64} w={96} h={148} units={7} />
      {left.map((r) => (
        <g key={r.t}>
          <Arrow x1={136} y1={r.y} x2={196} y2={r.y} tone={C.ink} width={1.4} />
          <Icon as={r.icon} x={222} y={r.y} size={30} />
          <text x={246} y={r.y + 5} fill={C.ink} style={L}>
            {r.t}
          </text>
          <text x={430} y={r.y + 6} fill={C.ink} style={label(16, 700)} textAnchor="end">
            +
          </text>
        </g>
      ))}

      <line x1={480} y1={8} x2={480} y2={220} stroke={C.rule} strokeWidth={1.4} />

      <text x={512} y={22} fill={C.accent} style={LB}>
        AI for sustainability
      </text>
      <text x={512} y={42} fill={C.ink3} style={LS}>
        emissions cut in other sectors
      </text>
      <Icon as={Cpu} x={560} y={138} size={64} tone={C.accent} />
      {right.map((r) => (
        <g key={r.t}>
          <Arrow x1={598} y1={138 + (r.y - 138) * 0.25} x2={676} y2={r.y} tone={C.accent} width={1.4} />
          <Icon as={r.icon} x={702} y={r.y} size={28} />
          <text x={726} y={r.y + 5} fill={C.ink} style={L}>
            {r.t}
          </text>
          <text x={950} y={r.y + 6} fill={C.accent} style={label(18, 700)} textAnchor="end">
            −
          </text>
        </g>
      ))}

      <line x1={0} y1={238} x2={960} y2={238} stroke={C.rule} />
      <Icon as={ChatCircleText} x={16} y={266} size={28} />
      <text x={40} y={271} fill={C.ink} style={L}>
        inefficient internal chatbot
      </text>
      <text x={480} y={271} fill={C.ink2} style={LA} textAnchor="middle">
        is not offset by
      </text>
      <Icon as={Sun} x={696} y={266} size={28} />
      <text x={720} y={271} fill={C.ink} style={L}>
        solar forecasting in another industry
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Training Energy Versus Lifetime Inference Energy
   -------------------------------------------------------------------------- */

export function CrossoverLab() {
  const [q, setQ] = useState(500);
  const WH = 0.5;
  const TRAIN = 50;
  const LIFE = 24;
  const perMonth = (q * 1e6 * WH * 30) / 1e9;
  const inf = perMonth * LIFE;
  const share = Math.round((inf / (inf + TRAIN)) * 100);
  const cross = TRAIN / perMonth;

  const x0 = 70;
  const x1 = 580;
  const yB = 236;
  const yT = 34;
  const X = (m: number) => r2(x0 + ((m + 6) / 30) * (x1 - x0));
  const Y = (g: number) => r2(yB - (g / 400) * (yB - yT));
  const trainPts: [number, number][] = [
    [X(-6), Y(0)],
    [X(0), Y(TRAIN)],
    [X(LIFE), Y(TRAIN)],
  ];

  const bx = 680;
  const bw = 270;
  const tw = r2(bw * (1 - share / 100));

  return (
    <Plate
      w={960}
      h={318}
      title={`Interactive: drag the number of queries per day. Training uses 50 gigawatt-hours over six months. At ${q} million queries a day and 0.5 watt-hours per query, inference uses ${perMonth.toFixed(1)} gigawatt-hours a month, ${cross <= LIFE ? `overtakes training at month ${cross.toFixed(1)}` : "and does not overtake training within two years"}, and accounts for ${share} percent of lifetime energy over 24 months`}
    >
      <text x={0} y={18} fill={C.ink2} style={L}>
        cumulative electricity, GWh
      </text>
      {[0, 100, 200, 300, 400].map((g) => (
        <g key={g}>
          <line x1={x0} y1={Y(g)} x2={x1} y2={Y(g)} stroke={C.rule} strokeWidth={g ? 0.8 : 1.2} />
          <text x={x0 - 8} y={Y(g) + 4} fill={C.ink3} style={LS} textAnchor="end">
            {g}
          </text>
        </g>
      ))}
      <rect x={X(-6)} y={yT} width={X(0) - X(-6)} height={yB - yT} fill={C.grey} opacity={0.6} />
      <text x={r2((X(-6) + X(0)) / 2)} y={yT + 16} fill={C.ink2} style={LS} textAnchor="middle">
        training run
      </text>
      <line x1={X(0)} y1={yT} x2={X(0)} y2={yB} stroke={C.ink3} strokeDasharray="4 4" />
      {[-6, 0, 6, 12, 18, 24].map((m) => (
        <text key={m} x={X(m)} y={yB + 18} fill={C.ink3} style={LS} textAnchor="middle">
          {m < 0 ? `−${-m}` : m}
        </text>
      ))}
      <text x={x1} y={yB + 36} fill={C.ink2} style={LS} textAnchor="end">
        months since deployment
      </text>

      <path d={path(trainPts)} fill="none" stroke={C.ink} strokeWidth={2} />
      <text x={x1 + 8} y={Y(TRAIN) + 4} fill={C.ink} style={L}>
        training
      </text>
      <path d={path([[X(0), Y(0)], [X(LIFE), Y(inf)]])} fill="none" stroke={C.accent} strokeWidth={2.4} />
      <text x={x1 + 8} y={Y(inf) + 4} fill={C.accent} style={LA}>
        inference
      </text>
      {cross <= LIFE ? (
        <g>
          <circle cx={X(cross)} cy={Y(TRAIN)} r={5.5} fill={C.accent} />
          <text x={X(cross) + 10} y={Y(TRAIN) + 22} fill={C.accent} style={LS}>
            {`overtakes training at month ${cross.toFixed(1)}`}
          </text>
        </g>
      ) : (
        <text x={X(9)} y={Y(TRAIN) - 12} fill={C.ink2} style={LS}>
          inference has not overtaken training by month 24
        </text>
      )}

      <text x={bx} y={18} fill={C.ink2} style={L}>
        share of lifetime energy
      </text>
      <rect x={bx} y={34} width={tw} height={26} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
      <rect x={bx + tw} y={34} width={r2(bw - tw)} height={26} fill={C.tint} stroke={C.accent} strokeWidth={1.2} />
      <text x={bx} y={124} fill={C.accent} style={label(40, 700)}>
        {`${share}%`}
      </text>
      <text x={bx} y={148} fill={C.accent} style={LA}>
        inference
      </text>
      <text x={bx} y={180} fill={C.ink} style={LB}>
        {`${100 - share}%`}
      </text>
      <text x={bx + 44} y={180} fill={C.ink2} style={L}>
        training
      </text>
      <Lines x={bx} y={214} lines={["0.5 Wh per query", "24 months in service"]} style={LS} fill={C.ink3} dy={16} />

      <text x={0} y={302} fill={C.ink} style={L}>
        queries per day
      </text>
      <Knob x={130} y={298} len={380} value={q} min={50} max={1000} step={50} onChange={setQ} label="Queries per day, from 50 million to 1 billion" />
      <text x={536} y={303} fill={C.accent} style={LB}>
        {q === 1000 ? "1 billion" : `${q} million`}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Grid Carbon Intensity and Power Usage Effectiveness
   -------------------------------------------------------------------------- */

const GRIDS = [
  { id: "hydro", t: "hydroelectric grid", g: 20 },
  { id: "nuclear", t: "nuclear-heavy grid", g: 60 },
  { id: "gas", t: "gas-heavy grid", g: 450 },
  { id: "coal", t: "coal-heavy grid", g: 900 },
] as const;

export function EmissionsLab() {
  const [p, setP] = useState(115);
  const [grid, setGrid] = useState<(typeof GRIDS)[number]["id"]>("coal");
  const pue = p / 100;
  const g = GRIDS.find((d) => d.id === grid)!.g;
  const t = pue * g;

  const cols = [110, 360, 610, 860];
  const kx = 270;
  const klen = 180;
  const K = (v: number) => r2(kx + ((v - 1) / 1) * klen);
  const bx = 200;
  const BW = (tt: number) => r2((tt / 1800) * 600);

  return (
    <Plate
      w={960}
      h={318}
      title={`Interactive: drag the Power Usage Effectiveness and pick a grid. 1,000 megawatt-hours of compute electricity times a PUE of ${pue.toFixed(2)} times ${g} grams of carbon dioxide equivalent per kilowatt-hour gives ${fmt(t)} tonnes. The same job emits ${GRIDS.map((d) => `${fmt(pue * d.g)} tonnes on a ${d.t}`).join(", ")}`}
    >
      {[
        { n: "compute electricity", v: "1,000", u: "MWh", tone: C.ink },
        { n: "Power Usage Effectiveness", v: pue.toFixed(2), u: "facility ÷ computing energy", tone: C.ink },
        { n: "grid carbon intensity", v: String(g), u: "gCO₂e per kWh", tone: C.ink },
        { n: "operational emissions", v: fmt(t), u: "tonnes CO₂e", tone: C.accent },
      ].map((c, i) => (
        <g key={c.n}>
          <text x={cols[i]} y={20} fill={C.ink2} style={L} textAnchor="middle">
            {c.n}
          </text>
          <text x={cols[i]} y={60} fill={c.tone} style={label(28, 700)} textAnchor="middle">
            {c.v}
          </text>
          <text x={cols[i]} y={80} fill={C.ink3} style={LS} textAnchor="middle">
            {c.u}
          </text>
        </g>
      ))}
      {[
        { x: 235, s: "×" },
        { x: 485, s: "×" },
        { x: 735, s: "=" },
      ].map((o) => (
        <text key={o.x} x={o.x} y={58} fill={C.ink3} style={label(24, 400)} textAnchor="middle">
          {o.s}
        </text>
      ))}

      <text x={cols[0]} y={124} fill={C.ink3} style={LS} textAnchor="middle">
        {`+${fmt((pue - 1) * 1000)} MWh cooling and conversion`}
      </text>
      <rect x={K(1.1)} y={131} width={K(1.2) - K(1.1)} height={4} fill={C.ink3} />
      <Knob x={kx} y={118} len={klen} value={p} min={100} max={200} step={5} onChange={setP} label="Power Usage Effectiveness, from 1.0 to 2.0" />
      <text x={kx} y={146} fill={C.ink3} style={LS} textAnchor="middle">
        1.0 ideal
      </text>
      <text x={K(1.15)} y={146} fill={C.ink3} style={LS} textAnchor="start" dx={14}>
        hyperscale
      </text>
      <text x={kx + klen} y={146} fill={C.ink3} style={LS} textAnchor="middle">
        2.0
      </text>

      <text x={0} y={176} fill={C.ink2} style={L}>
        the same job on four grids, tonnes CO₂e
      </text>
      {GRIDS.map((d, i) => {
        const on = d.id === grid;
        const y = 190 + i * 32;
        const tt = pue * d.g;
        return (
          <g
            key={d.id}
            role="radio"
            aria-checked={on}
            aria-label={d.t}
            tabIndex={0}
            className="outline-none"
            style={{ cursor: "pointer" }}
            onClick={() => setGrid(d.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setGrid(d.id);
              }
            }}
          >
            <rect x={0} y={y - 2} width={960} height={28} fill="transparent" />
            <circle cx={8} cy={y + 12} r={6.5} fill={C.paper} stroke={on ? C.accent : C.ink3} strokeWidth={1.6} />
            {on && <circle cx={8} cy={y + 12} r={3.2} fill={C.accent} />}
            <text x={24} y={y + 17} fill={on ? C.accent : C.ink} style={on ? LA : L}>
              {d.t}
            </text>
            <rect
              x={bx}
              y={y + 2}
              width={Math.max(2, BW(tt))}
              height={20}
              fill={on ? C.tint : C.grey}
              stroke={on ? C.accent : C.ink3}
              strokeWidth={1.2}
            />
            <text x={bx + Math.max(2, BW(tt)) + 8} y={y + 17} fill={on ? C.accent : C.ink2} style={on ? LA : LS}>
              {fmt(tt)}
            </text>
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Data Center Cooling and Water Consumption
   -------------------------------------------------------------------------- */

export function WaterLoop() {
  const waves = Array.from({ length: 3 }, (_, k) => {
    const y = 290 + k * 8;
    const pts: string[] = [];
    for (let x = 0; x <= 960; x += 24) pts.push(`${x} ${y}`, `${x + 12} ${y - 3}`);
    return `M${pts.join("L")}`;
  });
  return (
    <Plate
      w={960}
      h={318}
      title="On site, heat from the server racks is piped to a cooling tower that draws water from the local watershed, returns part of it and evaporates the rest, which is water consumption. Off site, the thermoelectric power plant that supplies the data center's electricity evaporates water through its own cooling tower"
    >
      <rect x={0} y={282} width={960} height={36} fill={C.grey} />
      {waves.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={C.ink3} strokeWidth={0.8} />
      ))}
      <text x={950} y={276} fill={C.ink3} style={LS} textAnchor="end">
        local watershed
      </text>

      {/* the grid connection */}
      <path d="M776 176L776 36L118 36L118 146" fill="none" stroke={C.ink} strokeWidth={1.4} />
      <circle cx={450} cy={36} r={16} fill={C.paper} />
      <Icon as={Lightning} x={450} y={36} size={26} />

      {/* on site */}
      <text x={30} y={134} fill={C.ink} style={LB}>
        on-site
      </text>
      <rect x={30} y={146} width={176} height={104} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      {[0, 1, 2, 3].map((i) => (
        <Rack key={i} x={42 + i * 40} y={158} w={32} h={84} units={6} />
      ))}
      <Arrow x1={206} y1={182} x2={284} y2={182} />
      <text x={244} y={174} fill={C.ink2} style={LS} textAnchor="middle">
        heat
      </text>
      <Arrow x1={290} y1={220} x2={210} y2={220} tone={C.ink3} />
      <Tower cx={334} base={250} top={136} wb={50} wt={30} />
      <Plume cx={334} top={136} />
      <Lines x={372} y={84} lines={["water", "consumption"]} style={LA} fill={C.accent} dy={16} />
      <Arrow x1={306} y1={282} x2={306} y2={256} tone={C.ink} />
      <text x={298} y={274} fill={C.ink} style={LS} textAnchor="end">
        withdrawal
      </text>
      <Arrow x1={362} y1={256} x2={362} y2={282} tone={C.ink3} />
      <text x={370} y={274} fill={C.ink2} style={LS}>
        returned
      </text>

      <line x1={486} y1={60} x2={486} y2={270} stroke={C.rule} strokeDasharray="5 5" />

      {/* off site */}
      <text x={722} y={124} fill={C.ink} style={LB}>
        off-site
      </text>
      <Tower cx={620} base={250} top={130} wb={56} wt={34} />
      <Plume cx={620} top={130} />
      <Lines x={582} y={84} lines={["water", "consumption"]} style={LA} fill={C.accent} dy={16} anchor="end" />
      <rect x={722} y={176} width={130} height={74} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      <rect x={826} y={128} width={14} height={48} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      {[0, 1].map((k) => (
        <circle key={k} cx={836 + k * 12} cy={114 - k * 14} r={8 + k * 2} fill={C.grey} stroke={C.ink3} strokeWidth={0.8} />
      ))}
      <Icon as={Gauge} x={760} y={213} size={30} tone={C.ink3} />
      <Lines x={786} y={208} lines={["steam", "turbine"]} style={LS} fill={C.ink2} dy={14} />
      <Arrow x1={592} y1={282} x2={592} y2={256} tone={C.ink} />
      <Arrow x1={648} y1={256} x2={648} y2={282} tone={C.ink3} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Embodied Carbon Versus Operational Carbon
   -------------------------------------------------------------------------- */

const EMBODIED = [
  { t: "extraction", v: 3 },
  { t: "fabrication", v: 14 },
  { t: "assembly", v: 3 },
];

export function LifespanLab() {
  const [years, setYears] = useState(3);
  const [power, setPower] = useState<"grid" | "renew">("renew");
  const emb = 20;
  const op = power === "grid" ? 30 : 3;
  const eol = 1;
  const total = emb + op * years + eol;
  const share = Math.round((emb / total) * 100);

  const yB = 222;
  const H = (v: number) => r2(v * 4.6);
  const cw = 46;
  const ex = (i: number) => 14 + i * 62;
  const yx = (i: number) => 220 + i * 56;
  const eolX = yx(years) + 8;

  return (
    <div>
      <Plate
        w={960}
        h={318}
        title={`Interactive: drag the years in service and pick the electricity source. Embodied carbon is 20 tonnes before use: 3 from extraction, 14 from fabrication and 3 from assembly. Operational carbon is ${op} tonnes a year on ${power === "grid" ? "grid-mix" : "renewable"} electricity. Over ${years} years the lifecycle total is ${total} tonnes, embodied carbon is ${share} percent of it, and annualized embodied carbon is ${(emb / years).toFixed(1)} tonnes a year`}
      >
        <text x={0} y={18} fill={C.ink2} style={L}>
          tonnes CO₂e per server
        </text>
        <text x={r2((ex(0) + ex(2) + cw) / 2)} y={46} fill={C.accent} style={LA} textAnchor="middle">
          embodied carbon
        </text>
        <text x={r2((yx(0) + yx(5) + cw) / 2)} y={46} fill={C.ink} style={LA} textAnchor="middle">
          operational carbon
        </text>
        <line x1={0} y1={yB} x2={610} y2={yB} stroke={C.ink} strokeWidth={1.2} />

        {EMBODIED.map((d, i) => (
          <g key={d.t}>
            <rect x={ex(i)} y={yB - H(d.v)} width={cw} height={H(d.v)} fill={C.tint} stroke={C.accent} strokeWidth={1.3} />
            <text x={ex(i) + cw / 2} y={yB - H(d.v) - 6} fill={C.accent} style={LS} textAnchor="middle">
              {d.v}
            </text>
            <text x={ex(i) + cw / 2} y={yB + 18} fill={C.ink2} style={LS} textAnchor="middle">
              {d.t}
            </text>
          </g>
        ))}
        <line x1={200} y1={70} x2={200} y2={yB + 30} stroke={C.ink3} strokeDasharray="4 4" />

        {Array.from({ length: years }, (_, i) => (
          <g key={i}>
            <rect x={yx(i)} y={yB - H(op)} width={cw} height={H(op)} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
            <text x={yx(i) + cw / 2} y={yB - H(op) - 6} fill={C.ink2} style={LS} textAnchor="middle">
              {op}
            </text>
            <text x={yx(i) + cw / 2} y={yB + 18} fill={C.ink2} style={LS} textAnchor="middle">
              {`year ${i + 1}`}
            </text>
          </g>
        ))}
        <rect x={eolX} y={yB - H(eol)} width={cw} height={H(eol)} fill={C.grey} stroke={C.ink3} strokeWidth={1.2} />
        <Lines x={eolX + cw / 2} y={yB + 18} lines={["end of", "life"]} style={LS} fill={C.ink2} dy={13} anchor="middle" />

        <text x={660} y={18} fill={C.ink2} style={L}>
          embodied share of lifecycle
        </text>
        <text x={660} y={66} fill={C.accent} style={label(40, 700)}>
          {`${share}%`}
        </text>
        <text x={660} y={110} fill={C.ink2} style={L}>
          annualized embodied carbon
        </text>
        <text x={660} y={136} fill={C.ink} style={label(20, 700)}>
          {`${(emb / years).toFixed(1)} t per year`}
        </text>
        <text x={660} y={176} fill={C.ink2} style={L}>
          lifecycle total
        </text>
        <text x={660} y={200} fill={C.ink} style={LB}>
          {`${total} t CO₂e`}
        </text>

        <text x={0} y={300} fill={C.ink} style={L}>
          years in service
        </text>
        <Knob x={140} y={296} len={300} value={years} min={2} max={6} step={1} onChange={setYears} label="Years in service, from 2 to 6" />
        <text x={466} y={301} fill={C.accent} style={LB}>
          {`${years} years`}
        </text>
      </Plate>
      <Choice
        name="Electricity that runs the server"
        value={power}
        onChange={setPower}
        options={[
          { id: "grid", label: "Grid-mix electricity" },
          { id: "renew", label: "Renewable electricity" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Scope 1, 2, and 3 Emissions Reporting for Enterprise AI
   -------------------------------------------------------------------------- */

export function ScopeMap() {
  return (
    <Plate
      w={960}
      h={290}
      title="Scope 1 is on-site fuel, such as the diesel backup generator at a company data center. Scope 2 is purchased electricity for hardware the company owns. Both sit inside the company boundary. Scope 3 sits outside it: servers made in a factory and run by a cloud vendor that the company calls through an API. An enterprise AI footprint reached through cloud APIs sits mostly in Scope 3"
    >
      {[
        { x: 150, s: "Scope 1", t: "on-site fuel", tone: C.ink },
        { x: 480, s: "Scope 2", t: "purchased electricity", tone: C.ink },
        { x: 810, s: "Scope 3", t: "cloud vendors and hardware supply chain", tone: C.accent },
      ].map((c) => (
        <g key={c.s}>
          <text x={c.x} y={20} fill={c.tone} style={LB} textAnchor="middle">
            {c.s}
          </text>
          <text x={c.x} y={40} fill={C.ink2} style={L} textAnchor="middle">
            {c.t}
          </text>
        </g>
      ))}

      <rect x={8} y={56} width={636} height={160} rx={8} fill="none" stroke={C.ink3} strokeDasharray="6 5" />
      <text x={22} y={206} fill={C.ink3} style={LS}>
        owned or controlled by the company
      </text>

      {/* Scope 1: data center and its diesel generator */}
      <rect x={50} y={92} width={110} height={92} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      {[0, 1].map((i) => (
        <Rack key={i} x={62 + i * 46} y={102} w={38} h={74} units={5} />
      ))}
      <rect x={186} y={140} width={78} height={44} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      {[0, 1, 2, 3, 4].map((k) => (
        <line key={k} x1={196 + k * 9} y1={150} x2={196 + k * 9} y2={174} stroke={C.ink3} strokeWidth={1.2} />
      ))}
      <rect x={246} y={118} width={10} height={22} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      <circle cx={254} cy={104} r={8} fill={C.grey} stroke={C.ink3} strokeWidth={0.8} />
      <circle cx={264} cy={88} r={10} fill={C.grey} stroke={C.ink3} strokeWidth={0.8} />
      <line x1={160} y1={162} x2={186} y2={162} stroke={C.ink} strokeWidth={1.4} />

      {/* Scope 2: grid pylon feeding owned servers */}
      <path d="M380 184L396 92L412 184M386 150L406 150M390 124L402 124M378 104L414 104" fill="none" stroke={C.ink} strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M396 92Q470 112 540 108" fill="none" stroke={C.ink} strokeWidth={1.3} />
      <circle cx={468} cy={106} r={14} fill={C.paper} />
      <Icon as={Lightning} x={468} y={106} size={24} />
      <Rack x={540} y={100} w={50} h={84} units={6} />

      {/* Scope 3: hardware made upstream and run by a cloud vendor */}
      <Icon as={Factory} x={716} y={116} size={50} />
      <Arrow x1={746} y1={112} x2={808} y2={112} />
      <Icon as={Cloud} x={866} y={112} size={86} />
      <Rack x={850} y={104} w={32} h={34} units={2} tone={C.accent} />
      <Arrow x1={836} y1={150} x2={656} y2={186} tone={C.accent} dash="5 4" />
      <text x={760} y={196} fill={C.accent} style={LS} textAnchor="middle">
        API calls
      </text>

      <text x={0} y={246} fill={C.ink2} style={L}>
        an enterprise AI footprint reached through cloud APIs
      </text>
      <rect x={0} y={256} width={29} height={26} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
      <rect x={29} y={256} width={115} height={26} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
      <rect x={144} y={256} width={816} height={26} fill={C.tint} stroke={C.accent} strokeWidth={1.2} />
      <text x={14.5} y={274} fill={C.ink2} style={LS} textAnchor="middle">
        1
      </text>
      <text x={86} y={274} fill={C.ink2} style={LS} textAnchor="middle">
        2
      </text>
      <text x={552} y={274} fill={C.accent} style={LA} textAnchor="middle">
        Scope 3
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Red AI Versus Green AI: Right-Sizing the Model to the Task
   -------------------------------------------------------------------------- */

const MODELS = [
  { t: "gradient-boosted tree", e: 0.05, a: 88, dx: 10, dy: 18 },
  { t: "fine-tuned 7B model", e: 30, a: 92.5, dx: 10, dy: 20 },
  { t: "100B frontier model", e: 3000, a: 94, dx: -10, dy: -14 },
];

export function RoutingLab() {
  const [s, setS] = useState(80);
  const f = s / 100;
  const cost = (k: number) => 0.05 + (1 - k) * 3000;
  const acc = (k: number) => 94 - 6 * k ** 8;
  const e = cost(f);
  const a = acc(f);
  const cut = Math.round((1 - e / 3000) * 100);

  const x0 = 70;
  const x1 = 590;
  const yB = 236;
  const yT = 30;
  const X = (v: number) => r2(x0 + ((Math.log10(v) + 2) / 6) * (x1 - x0));
  const Y = (v: number) => r2(yB - ((v - 86) / 10) * (yB - yT));
  const trace = Array.from({ length: 201 }, (_, i) => {
    const k = i / 200;
    return [X(cost(k)), Y(acc(k))] as [number, number];
  });

  return (
    <Plate
      w={960}
      h={318}
      title={`Interactive: drag the share of support tickets the gradient-boosted tree answers before it escalates the rest to the frontier model. A gradient-boosted tree uses 0.05 watt-hours per 1,000 tickets at 88 percent accuracy, a fine-tuned 7B model 30 watt-hours at 92.5 percent and a 100B frontier model 3,000 watt-hours at 94 percent. With ${s} percent answered by the tree, the routed system uses ${fmt(e)} watt-hours, ${cut} percent less than the frontier model alone, at ${a.toFixed(1)} percent accuracy`}
    >
      <text x={0} y={16} fill={C.ink2} style={L}>
        tickets classified correctly, %
      </text>
      {[86, 90, 94].map((v) => (
        <g key={v}>
          <line x1={x0} y1={Y(v)} x2={x1} y2={Y(v)} stroke={C.rule} strokeWidth={0.8} />
          <text x={x0 - 8} y={Y(v) + 4} fill={C.ink3} style={LS} textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      <line x1={x0} y1={yB} x2={x1} y2={yB} stroke={C.ink} strokeWidth={1.2} />
      {[
        { v: 0.01, t: "0.01" },
        { v: 1, t: "1" },
        { v: 100, t: "100" },
        { v: 10000, t: "10,000" },
      ].map((k) => (
        <text key={k.t} x={X(k.v)} y={yB + 18} fill={C.ink3} style={LS} textAnchor="middle">
          {k.t}
        </text>
      ))}
      <text x={x1} y={yB + 36} fill={C.ink2} style={LS} textAnchor="end">
        energy per 1,000 tickets, Wh (log scale)
      </text>

      <path d={path(MODELS.map((m) => [X(m.e), Y(m.a)]))} fill="none" stroke={C.ink3} strokeWidth={1.3} />
      <path d={path(trace)} fill="none" stroke={C.accent} strokeWidth={1.2} strokeDasharray="3 4" />
      {MODELS.map((m) => (
        <g key={m.t}>
          <circle cx={X(m.e)} cy={Y(m.a)} r={6} fill={C.paper} stroke={C.ink} strokeWidth={1.8} />
          <text x={X(m.e) + m.dx} y={Y(m.a) + m.dy} fill={C.ink} style={L} textAnchor={m.dx < 0 ? "end" : "start"}>
            {m.t}
          </text>
        </g>
      ))}
      <circle cx={X(e)} cy={Y(a)} r={7} fill={C.accent} />
      {s > 0 && s < 100 && (
        <text x={X(e) + 12} y={Y(a) + 22} fill={C.accent} style={LA}>
          routed system
        </text>
      )}

      <text x={650} y={16} fill={C.accent} style={LB}>
        tiered routing
      </text>
      <Lines x={650} y={38} lines={["the tree answers easy tickets", "and escalates the rest"]} style={LS} fill={C.ink2} dy={15} />
      <text x={650} y={98} fill={C.ink2} style={L}>
        energy compared with frontier only
      </text>
      <text x={650} y={142} fill={C.accent} style={label(40, 700)}>
        {cut > 0 ? `−${cut}%` : "0%"}
      </text>
      <text x={650} y={172} fill={C.ink3} style={LS}>
        {`${fmt(e)} Wh per 1,000 tickets`}
      </text>
      <text x={650} y={206} fill={C.ink2} style={L}>
        accuracy
      </text>
      <text x={650} y={232} fill={C.ink} style={label(20, 700)}>
        {`${a.toFixed(1)}%`}
      </text>

      <text x={0} y={302} fill={C.ink} style={L}>
        share the tree answers
      </text>
      <Knob x={170} y={298} len={360} value={s} min={0} max={100} step={5} onChange={setS} label="Share of tickets the gradient-boosted tree answers, from 0 to 100 percent" />
      <text x={556} y={303} fill={C.accent} style={LB}>
        {`${s}%`}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Model Distillation, Quantization, and Semantic Caching
   -------------------------------------------------------------------------- */

/** A small feed-forward network: layers of nodes joined by every edge. */
function Net({ x, y, w, h, layers, tone }: { x: number; y: number; w: number; h: number; layers: number[]; tone: string }) {
  const pos = layers.map((n, li) =>
    Array.from({ length: n }, (_, k) => [
      r2(x + (li / (layers.length - 1)) * w),
      r2(y + ((k + 0.5) / n) * h),
    ]),
  );
  return (
    <g>
      {pos.slice(1).map((layer, li) =>
        layer.map(([bx, by], k) =>
          pos[li].map(([ax, ay], j) => (
            <line key={`${li}-${k}-${j}`} x1={ax} y1={ay} x2={bx} y2={by} stroke={tone} strokeWidth={0.6} opacity={0.45} />
          )),
        ),
      )}
      {pos.flat().map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={4.5} fill={C.paper} stroke={tone} strokeWidth={1.3} />
      ))}
    </g>
  );
}

/** A speech bubble with one line of text. */
function Bubble({ x, y, w, t, tone = C.ink }: { x: number; y: number; w: number; t: string; tone?: string }) {
  return (
    <g>
      <path
        d={`M${x} ${y}h${w}v26h${-w + 22}l-8 8v-8h-14z`}
        fill={tone === C.accent ? C.tint : C.paper}
        stroke={tone}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <text x={x + 10} y={y + 17} fill={tone === C.accent ? C.accent : C.ink} style={LS}>
        {t}
      </text>
    </g>
  );
}

export function EfficientPipeline() {
  const bits = [
    { t: "16-bit", n: 16, gb: "14 GB", y: 80 },
    { t: "8-bit", n: 8, gb: "7 GB", y: 128 },
    { t: "4-bit", n: 4, gb: "3.5 GB", y: 176 },
  ];
  return (
    <Plate
      w={960}
      h={282}
      title="Three panels. Distillation: a large teacher network labels examples that train a small student network, which needs a fraction of the compute per call. Quantization: one weight stored in 16 bits, 8 bits or 4 bits, so a 7-billion-parameter model takes 14, 7 or 3.5 gigabytes of memory. Semantic caching: three phrasings of the same PIN question are answered from a cache with one verified answer, and the network is not run"
    >
      {[
        { x: 0, t: "distillation" },
        { x: 334, t: "quantization" },
        { x: 668, t: "semantic caching" },
      ].map((p) => (
        <text key={p.t} x={p.x} y={20} fill={C.ink} style={LB}>
          {p.t}
        </text>
      ))}
      <line x1={312} y1={10} x2={312} y2={272} stroke={C.rule} />
      <line x1={646} y1={10} x2={646} y2={272} stroke={C.rule} />

      {/* distillation */}
      <Net x={16} y={46} w={96} h={150} layers={[5, 7, 7, 5]} tone={C.ink} />
      <Icon as={FileText} x={160} y={112} size={30} tone={C.ink2} />
      <Icon as={FileText} x={168} y={122} size={30} tone={C.ink2} />
      <Arrow x1={120} y1={120} x2={146} y2={120} width={1.4} />
      <Arrow x1={186} y1={120} x2={216} y2={120} width={1.4} />
      <Net x={226} y={86} w={56} h={70} layers={[3, 3, 3]} tone={C.accent} />
      <text x={64} y={218} fill={C.ink} style={L} textAnchor="middle">
        teacher
      </text>
      <text x={254} y={218} fill={C.accent} style={LA} textAnchor="middle">
        student
      </text>
      <text x={0} y={246} fill={C.ink3} style={LS}>
        compute per call
      </text>
      <rect x={14} y={256} width={110} height={10} fill={C.grey} stroke={C.ink} strokeWidth={1} />
      <rect x={232} y={256} width={10} height={10} fill={C.tint} stroke={C.accent} strokeWidth={1} />

      {/* quantization */}
      <text x={400} y={50} fill={C.ink3} style={LS}>
        one weight
      </text>
      <text x={630} y={50} fill={C.ink3} style={LS} textAnchor="end">
        7B model
      </text>
      {bits.map((b) => {
        const lit = b.n === 4;
        return (
          <g key={b.t}>
            <text x={334} y={b.y + 13} fill={lit ? C.accent : C.ink} style={lit ? LA : L}>
              {b.t}
            </text>
            {Array.from({ length: b.n }, (_, k) => (
              <rect
                key={k}
                x={400 + k * 11}
                y={b.y}
                width={9}
                height={18}
                fill={lit ? C.tint : C.grey}
                stroke={lit ? C.accent : C.ink3}
                strokeWidth={1}
              />
            ))}
            <text x={630} y={b.y + 13} fill={lit ? C.accent : C.ink} style={lit ? LA : L} textAnchor="end">
              {b.gb}
            </text>
          </g>
        );
      })}
      <text x={334} y={246} fill={C.ink3} style={LS}>
        memory bandwidth and energy per token fall
      </text>
      <text x={334} y={262} fill={C.ink3} style={LS}>
        with each halving of precision
      </text>

      {/* semantic caching */}
      <Bubble x={668} y={44} w={168} t="How do I reset my PIN?" />
      <Bubble x={668} y={92} w={168} t="Forgot my PIN, what now?" />
      <Bubble x={668} y={140} w={168} t="Steps to change a PIN?" />
      {[57, 105, 153].map((y) => (
        <Arrow key={y} x1={842} y1={y} x2={880} y2={104} tone={C.ink} width={1.2} />
      ))}
      <Icon as={Database} x={908} y={104} size={40} tone={C.accent} />
      <Arrow x1={908} y1={128} x2={860} y2={206} tone={C.accent} width={1.4} />
      <Bubble x={690} y={200} w={164} t="Settings, Security, PIN" tone={C.accent} />
      <Icon as={Brain} x={918} y={236} size={30} tone={C.ink3} weight="regular" />
      <text x={918} y={268} fill={C.ink3} style={LS} textAnchor="middle">
        not run
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Carbon-Aware Spatiotemporal Workload Scheduling
   -------------------------------------------------------------------------- */

const solar = (h: number) =>
  380 +
  120 * Math.cos((2 * Math.PI * (h - 19)) / 24) -
  180 * Math.exp(-(((h - 13) / 3) ** 2)) -
  60 * Math.exp(-(((h - 3) / 2.5) ** 2));
const hydro = (h: number) => 30 + 6 * Math.cos((2 * Math.PI * (h - 18)) / 24);
const jobT = (start: number, g: (h: number) => number) =>
  Array.from({ length: 6 }, (_, k) => 2 * g(start + k + 0.5)).reduce((a, b) => a + b, 0) / 1000;

export function ShiftLab() {
  const [start, setStart] = useState(17);
  const [region, setRegion] = useState<"same" | "hydro">("same");
  const g = region === "same" ? solar : hydro;
  const t = jobT(start, g);
  const base = jobT(17, solar);
  const cut = Math.round((1 - t / base) * 100);

  const x0 = 70;
  const x1 = 610;
  const yB = 184;
  const yT = 30;
  const X = (h: number) => r2(x0 + (h / 24) * (x1 - x0));
  const Y = (v: number) => r2(yB - (v / 600) * (yB - yT));
  const curve = (fn: (h: number) => number) =>
    Array.from({ length: 97 }, (_, i) => [X(i / 4), Y(fn(i / 4))] as [number, number]);
  const band = [
    [X(start), Y(0)],
    ...Array.from({ length: 25 }, (_, i) => {
      const h = start + (i / 24) * 6;
      return [X(h), Y(g(h))] as [number, number];
    }),
    [X(start + 6), Y(0)],
  ] as [number, number][];
  const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

  return (
    <div>
      <Plate
        w={960}
        h={268}
        title={`Interactive: drag the start time of a six-hour, 12 megawatt-hour fine-tuning run and pick the region. Grid carbon intensity in the solar-heavy region is highest in the evening and lowest at midday, while the hydro-powered region stays near 30 grams per kilowatt-hour. Starting at ${hh(start)} in the ${region === "same" ? "solar-heavy" : "hydro-powered"} region, the run emits ${t.toFixed(1)} tonnes, ${cut > 0 ? `${cut} percent less than` : "the same as"} starting at 17:00 in the solar-heavy region`}
      >
        <text x={0} y={16} fill={C.ink2} style={L}>
          grid carbon intensity, gCO₂e per kWh
        </text>
        {[0, 200, 400, 600].map((v) => (
          <g key={v}>
            <line x1={x0} y1={Y(v)} x2={x1} y2={Y(v)} stroke={C.rule} strokeWidth={v ? 0.8 : 1.2} />
            <text x={x0 - 8} y={Y(v) + 4} fill={C.ink3} style={LS} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        {[0, 6, 12, 18, 24].map((h) => (
          <text key={h} x={X(h)} y={yB + 18} fill={C.ink3} style={LS} textAnchor="middle">
            {hh(h)}
          </text>
        ))}
        <Icon as={Sun} x={X(13)} y={Y(solar(13)) + 20} size={20} tone={C.ink3} weight="regular" />

        <path d={path(band)} fill={C.tint} stroke="none" />
        <path d={path(curve(solar))} fill="none" stroke={region === "same" ? C.ink : C.ink3} strokeWidth={region === "same" ? 2 : 1.3} />
        <path d={path(curve(hydro))} fill="none" stroke={region === "hydro" ? C.ink : C.ink3} strokeWidth={region === "hydro" ? 2 : 1.3} strokeDasharray={region === "hydro" ? undefined : "5 4"} />
        <text x={X(20.5)} y={Y(solar(20.5)) - 10} fill={C.ink} style={LS} textAnchor="middle">
          solar-heavy region
        </text>
        <text x={x1} y={Y(hydro(24)) - 8} fill={C.ink} style={LS} textAnchor="end">
          hydro-powered region
        </text>
        <rect x={X(start)} y={yB + 26} width={X(start + 6) - X(start)} height={10} fill={C.accent} />
        <text x={r2((X(start) + X(start + 6)) / 2)} y={yB + 52} fill={C.accent} style={LS} textAnchor="middle">
          {`fine-tuning run, ${hh(start)} to ${hh(start + 6)}`}
        </text>

        <Lines x={660} y={16} lines={["six-hour fine-tuning run", "12 MWh"]} style={LS} fill={C.ink3} dy={15} />
        <text x={660} y={72} fill={C.ink2} style={L}>
          emissions
        </text>
        <text x={660} y={104} fill={C.ink} style={label(30, 700)}>
          {`${t.toFixed(1)} t CO₂e`}
        </text>
        <Lines x={660} y={134} lines={["compared with 17:00", "in the solar-heavy region"]} style={L} fill={C.ink2} dy={17} />
        <text x={660} y={196} fill={C.accent} style={label(40, 700)}>
          {cut > 0 ? `−${cut}%` : cut < 0 ? `+${-cut}%` : "0%"}
        </text>

        <text x={0} y={258} fill={C.ink} style={L}>
          start time
        </text>
        <Knob x={110} y={254} len={400} value={start} min={0} max={18} step={1} onChange={setStart} label="Start time of the fine-tuning run, from 00:00 to 18:00" />
        <text x={536} y={259} fill={C.accent} style={LB}>
          {hh(start)}
        </text>
      </Plate>
      <Choice
        name="Region that runs the job"
        value={region}
        onChange={setRegion}
        options={[
          { id: "same", label: "Solar-heavy region" },
          { id: "hydro", label: "Hydro-powered region" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Renewable Grid Integration and Building Energy Optimization
   -------------------------------------------------------------------------- */

export function GridLoop() {
  const cx0 = 260;
  const cx1 = 520;
  const cyB = 196;
  const X = (h: number) => r2(cx0 + (h / 24) * (cx1 - cx0));
  const gen = (h: number) => 0.9 * Math.exp(-(((h - 13) / 3.4) ** 2)) + 0.18;
  const Y = (v: number) => r2(cyB - v * 130);
  const up = Array.from({ length: 49 }, (_, i) => [X(i / 2), Y(gen(i / 2) + 0.08)] as [number, number]);
  const dn = Array.from({ length: 49 }, (_, i) => [X(24 - i / 2), Y(gen(24 - i / 2) - 0.08)] as [number, number]);
  const mid = Array.from({ length: 49 }, (_, i) => [X(i / 2), Y(gen(i / 2))] as [number, number]);
  return (
    <Plate
      w={960}
      h={292}
      title="A control loop. Satellite cloud imagery, numerical weather data and smart-meter telemetry feed a machine learning forecast of solar and wind output hours ahead. The forecast marks a midday surplus, when grid batteries charge and commercial buildings pre-cool, and the evening peak, when batteries discharge, so fewer fossil-fuel peaker plants idle as spinning reserve. Smart-meter telemetry flows back into the forecast"
    >
      {[
        { as: CloudSun, t: ["satellite", "cloud imagery"], y: 60 },
        { as: Wind, t: ["numerical", "weather data"], y: 122 },
        { as: Gauge, t: ["smart-meter", "telemetry"], y: 184 },
      ].map((r) => (
        <g key={r.t[0]}>
          <Icon as={r.as} x={22} y={r.y} size={34} />
          <Lines x={48} y={r.y - 3} lines={r.t} style={LS} fill={C.ink2} dy={14} />
          <Arrow x1={140} y1={r.y} x2={232} y2={124} tone={C.ink3} width={1.2} />
        </g>
      ))}

      <text x={cx0} y={24} fill={C.ink} style={LB}>
        solar and wind forecast
      </text>
      <text x={cx0} y={42} fill={C.ink3} style={LS}>
        hours ahead
      </text>
      <rect x={X(10)} y={56} width={X(16) - X(10)} height={cyB - 56} fill={C.tint} />
      <path d={`${path(up)}L${path(dn).slice(1)}Z`} fill={C.grey} stroke="none" />
      <path d={path(mid)} fill="none" stroke={C.ink} strokeWidth={1.8} />
      <line x1={cx0} y1={cyB} x2={cx1} y2={cyB} stroke={C.ink} strokeWidth={1.2} />
      {[0, 12, 24].map((h) => (
        <text key={h} x={X(h)} y={cyB + 16} fill={C.ink3} style={LS} textAnchor="middle">
          {`${String(h).padStart(2, "0")}:00`}
        </text>
      ))}
      <text x={X(13)} y={cyB - 10} fill={C.accent} style={LA} textAnchor="middle">
        surplus
      </text>

      <Arrow x1={540} y1={110} x2={604} y2={74} tone={C.accent} width={1.4} />
      <Arrow x1={540} y1={140} x2={604} y2={150} tone={C.accent} width={1.4} />
      <Arrow x1={540} y1={170} x2={604} y2={222} tone={C.ink3} width={1.2} />
      <Icon as={BatteryCharging} x={634} y={70} size={42} tone={C.accent} />
      <Lines x={668} y={64} lines={["charge in the surplus,", "discharge at the evening peak"]} style={L} fill={C.ink} dy={16} />
      <Icon as={Buildings} x={634} y={150} size={42} tone={C.accent} />
      <Lines x={668} y={144} lines={["HVAC pre-cools while", "clean power is abundant"]} style={L} fill={C.ink} dy={16} />
      <Icon as={Factory} x={634} y={226} size={38} tone={C.ink3} weight="regular" />
      <Lines x={668} y={220} lines={["fewer peaker plants idling", "as spinning reserve"]} style={L} fill={C.ink2} dy={16} />

      <path d="M640 256L640 280L22 280L22 208" fill="none" stroke={C.ink3} strokeWidth={1.2} strokeDasharray="5 4" />
      <path d={`M17 216L22 206L27 216`} fill="none" stroke={C.ink3} strokeWidth={1.2} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Decarbonizing Supply Chains, Logistics, and Materials Discovery
   -------------------------------------------------------------------------- */

/** A box truck facing right, its cargo hold filled to `load`. */
function Lorry({ x, y, load, tone = C.ink }: { x: number; y: number; load: number; tone?: string }) {
  const w = 120;
  return (
    <g>
      <rect x={x} y={y} width={w} height={42} rx={2} fill={C.paper} stroke={tone} strokeWidth={1.4} />
      <rect x={x + 2} y={y + 2} width={r2((w - 4) * load)} height={38} fill={tone === C.accent ? C.tint : C.grey} />
      <path d={`M${x + w + 2} ${y + 42}V${y + 12}h20l12 14v16z`} fill={C.paper} stroke={tone} strokeWidth={1.4} strokeLinejoin="round" />
      <circle cx={x + 22} cy={y + 46} r={7} fill={C.paper} stroke={tone} strokeWidth={1.4} />
      <circle cx={x + 96} cy={y + 46} r={7} fill={C.paper} stroke={tone} strokeWidth={1.4} />
      <circle cx={x + w + 22} cy={y + 46} r={7} fill={C.paper} stroke={tone} strokeWidth={1.4} />
      <text x={x + w / 2} y={y + 26} fill={tone === C.accent ? C.accent : C.ink} style={LA} textAnchor="middle">
        {`${Math.round(load * 100)}%`}
      </text>
    </g>
  );
}

/** A small ring molecule. */
function Ring({ cx, cy, r = 10, tone }: { cx: number; cy: number; r?: number; tone: string }) {
  const pts = Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 3) * k + Math.PI / 6;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
  return <path d={`${path(pts)}Z`} fill={tone === C.accent ? C.tint : C.paper} stroke={tone} strokeWidth={1.3} />;
}

export function DecarbApps() {
  const dots = Array.from({ length: 84 }, (_, i) => [688 + (i % 14) * 18, 52 + Math.floor(i / 14) * 15] as const);
  const pipe = 214;
  return (
    <Plate
      w={960}
      h={276}
      title="Three panels. Freight consolidation: two trucks each 45 percent full become one truck 90 percent full. Methane detection: a satellite scans a pipeline and boxes an invisible methane plume leaking from it. Materials discovery: millions of candidate structures screened in simulation narrow to a few low-carbon candidates for laboratory testing"
    >
      {[
        { x: 0, t: "freight consolidation" },
        { x: 334, t: "methane detection" },
        { x: 668, t: "materials discovery" },
      ].map((p) => (
        <text key={p.t} x={p.x} y={20} fill={C.ink} style={LB}>
          {p.t}
        </text>
      ))}
      <line x1={312} y1={10} x2={312} y2={266} stroke={C.rule} />
      <line x1={646} y1={10} x2={646} y2={266} stroke={C.rule} />

      {/* freight */}
      <Lorry x={10} y={42} load={0.45} />
      <Lorry x={10} y={110} load={0.45} />
      <Arrow x1={80} y1={168} x2={80} y2={190} />
      <Lorry x={10} y={198} load={0.9} tone={C.accent} />

      {/* methane */}
      <g>
        <rect x={462} y={42} width={30} height={22} rx={2} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
        <rect x={418} y={46} width={38} height={14} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
        <rect x={498} y={46} width={38} height={14} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
        <line x1={456} y1={53} x2={462} y2={53} stroke={C.ink} strokeWidth={1.2} />
        <line x1={492} y1={53} x2={498} y2={53} stroke={C.ink} strokeWidth={1.2} />
      </g>
      <path d={`M470 66L380 ${pipe - 8}M484 66L580 ${pipe - 8}`} fill="none" stroke={C.ink3} strokeDasharray="4 4" />
      <rect x={334} y={pipe} width={300} height={12} rx={6} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      {[380, 440, 560].map((x) => (
        <line key={x} x1={x} y1={pipe} x2={x} y2={pipe + 12} stroke={C.ink} strokeWidth={1.2} />
      ))}
      {[
        [500, pipe - 12, 9],
        [490, pipe - 30, 12],
        [506, pipe - 50, 14],
        [494, pipe - 72, 15],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={C.tint} stroke={C.accent} strokeWidth={1.1} strokeDasharray="3 2" />
      ))}
      <rect x={466} y={pipe - 98} width={60} height={96} fill="none" stroke={C.accent} strokeWidth={1.6} />
      <text x={534} y={pipe - 84} fill={C.accent} style={LA}>
        leak found
      </text>
      <text x={334} y={pipe + 40} fill={C.ink3} style={LS}>
        aerial spectroscopy sees what the eye cannot
      </text>

      {/* materials */}
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.2} fill={C.grey} stroke={C.ink3} strokeWidth={0.7} />
      ))}
      <path d="M700 160L790 198M910 160L830 198" fill="none" stroke={C.ink3} strokeWidth={1.2} />
      {[786, 810, 834].map((x) => (
        <Ring key={x} cx={x} cy={214} tone={C.accent} />
      ))}
      <text x={668} y={148} fill={C.ink3} style={LS}>
        millions screened
      </text>
      <text x={950} y={148} fill={C.ink3} style={LS} textAnchor="end">
        in simulation
      </text>
      <text x={810} y={250} fill={C.accent} style={LA} textAnchor="middle">
        a few for laboratory testing
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Jevons Paradox, Rebound Effects, and Greenwashing Risks
   -------------------------------------------------------------------------- */

export function JevonsLab() {
  const [v, setV] = useState(50);
  const vol = v / 10;
  const total = 0.4 * vol;

  const x0 = 70;
  const U = 62;
  const yB = 158;
  const H = 118;
  const X = (k: number) => r2(x0 + k * U);
  const Y = (k: number) => r2(yB - k * H);
  const verdict = total > 1.001 ? "more than before" : total < 0.999 ? "less than before" : "the same as before";

  return (
    <Plate
      w={960}
      h={232}
      title={`Interactive: drag query volume after costs fall. Energy per query drops 60 percent, from 1.0 to 0.4. At ${vol} times the original volume, total energy, the area of each rectangle, is ${total.toFixed(1)} times what it was before, ${verdict}. Total energy breaks even at 2.5 times the volume`}
    >
      <text x={0} y={16} fill={C.ink2} style={L}>
        energy per query
      </text>
      <line x1={x0} y1={yB} x2={X(8) + 10} y2={yB} stroke={C.ink} strokeWidth={1.2} />
      <line x1={x0} y1={yB} x2={x0} y2={Y(1) - 14} stroke={C.ink} strokeWidth={1.2} />
      {[
        { k: 1, t: "1.0" },
        { k: 0.4, t: "0.4" },
      ].map((d) => (
        <text key={d.t} x={x0 - 8} y={Y(d.k) + 4} fill={C.ink3} style={LS} textAnchor="end">
          {d.t}
        </text>
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
        <text key={k} x={X(k)} y={yB + 18} fill={C.ink3} style={LS} textAnchor="middle">
          {`${k}×`}
        </text>
      ))}
      <text x={X(8) + 10} y={yB + 36} fill={C.ink2} style={LS} textAnchor="end">
        query volume
      </text>

      <rect x={X(0)} y={Y(0.4)} width={r2(vol * U)} height={r2(0.4 * H)} fill={C.tint} stroke={C.accent} strokeWidth={1.6} />
      <rect x={X(0)} y={Y(1)} width={U} height={H} fill={C.grey} fillOpacity={0.5} stroke={C.ink} strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={X(0.5)} y={Y(1) + 20} fill={C.ink} style={L} textAnchor="middle">
        before
      </text>
      <text x={X(Math.max(1, vol) - 0.1)} y={Y(0.4) + 20} fill={C.accent} style={LA} textAnchor="end">
        after
      </text>
      <path d={`M${X(1) + 18} ${Y(1)}L${X(1) + 18} ${Y(0.4) - 4}`} stroke={C.ink2} strokeWidth={1.2} />
      <path d={`M${X(1) + 13} ${Y(0.4) - 12}l5 8l5 -8`} fill="none" stroke={C.ink2} strokeWidth={1.2} />
      <text x={X(1) + 28} y={Y(0.7) + 4} fill={C.ink2} style={LS}>
        −60% per query
      </text>

      <text x={660} y={16} fill={C.ink2} style={L}>
        total energy, compared with before
      </text>
      <text x={660} y={58} fill={total > 1.001 ? C.accent : C.ink} style={label(40, 700)}>
        {`${total.toFixed(1)}×`}
      </text>
      <text x={660} y={80} fill={C.ink3} style={LS}>
        {`0.4 per query × ${vol} the volume`}
      </text>
      <line x1={660} y1={158} x2={950} y2={158} stroke={C.ink} strokeWidth={1.2} />
      <rect x={690} y={r2(158 - 18)} width={44} height={18} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
      <rect x={790} y={r2(158 - total * 18)} width={44} height={r2(total * 18)} fill={C.tint} stroke={C.accent} strokeWidth={1.2} />
      <line x1={680} y1={140} x2={950} y2={140} stroke={C.ink3} strokeDasharray="4 4" />
      <text x={712} y={176} fill={C.ink2} style={LS} textAnchor="middle">
        before
      </text>
      <text x={812} y={176} fill={C.accent} style={LS} textAnchor="middle">
        after
      </text>
      <text x={950} y={134} fill={C.ink3} style={LS} textAnchor="end">
        break-even at 2.5×
      </text>

      <text x={0} y={222} fill={C.ink} style={L}>
        query volume after costs fall
      </text>
      <Knob x={210} y={218} len={330} value={v} min={10} max={80} step={5} onChange={setV} label="Query volume after costs fall, from 1 to 8 times the original" />
      <text x={566} y={223} fill={C.accent} style={LB}>
        {`${vol}×`}
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The Four Pillars of Enterprise AI Leadership
   -------------------------------------------------------------------------- */

const PILLARS = [
  { as: Cpu, t: ["Technical", "Fit"], w: "Weeks 1 and 2" },
  { as: ChartLineUp, t: ["Functional and", "Strategic Value"], w: "Weeks 3 through 8" },
  { as: Scales, t: ["Ethical and EDII", "Governance"], w: "Week 9" },
  { as: Leaf, t: ["Environmental", "Stewardship"], w: "Week 10" },
];

export function FourPillars() {
  return (
    <Plate
      w={960}
      h={300}
      title="A portico. Its beam reads every consequential AI decision and rests on four pillars: Technical Fit from Weeks 1 and 2, Functional and Strategic Value from Weeks 3 through 8, Ethical and EDII Governance from Week 9, and Environmental Stewardship from Week 10"
    >
      <path d="M40 66L480 12L920 66Z" fill={C.paper} stroke={C.ink} strokeWidth={1.4} strokeLinejoin="round" />
      <rect x={40} y={66} width={880} height={34} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
      <text x={480} y={89} fill={C.ink} style={LB} textAnchor="middle">
        every consequential AI decision
      </text>
      {PILLARS.map((p, i) => {
        const cx = 150 + i * 220;
        const lit = i === 3;
        const tone = lit ? C.accent : C.ink;
        return (
          <g key={p.w}>
            <rect x={cx - 76} y={100} width={152} height={12} fill={C.paper} stroke={tone} strokeWidth={1.3} />
            <rect x={cx - 64} y={112} width={128} height={124} fill={lit ? C.tint : C.paper} stroke={tone} strokeWidth={1.4} />
            <rect x={cx - 76} y={236} width={152} height={12} fill={C.paper} stroke={tone} strokeWidth={1.3} />
            <Icon as={p.as} x={cx} y={146} size={34} tone={tone} />
            <Lines x={cx} y={188} lines={p.t} style={lit ? LA : L} fill={tone} dy={17} anchor="middle" />
            <text x={cx} y={272} fill={lit ? C.accent : C.ink2} style={LS} textAnchor="middle">
              {p.w}
            </text>
          </g>
        );
      })}
      <rect x={20} y={248} width={920} height={8} fill={C.grey} stroke={C.ink} strokeWidth={1.2} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Matching the Right AI Architecture to the Business Problem
   -------------------------------------------------------------------------- */

const ARCH = [
  {
    as: Code,
    t: ["software and optimization"],
    cells: [["rules known in advance"], ["fastest"], ["completely verifiable"], ["fixed rules applied exactly"]],
  },
  {
    as: Table,
    t: ["calibrated tabular model"],
    cells: [["structured records"], ["tight"], ["legal explainability"], ["scored against error costs"]],
  },
  {
    as: FileText,
    t: ["retrieval-augmented generation"],
    cells: [["unstructured documents"], ["seconds"], ["citation checks"], ["drafted text, schema checked"]],
  },
  {
    as: Robot,
    t: ["tool-using agent"],
    cells: [["external software tools"], ["minutes"], ["sandboxed execution"], ["human sign-off when irreversible"]],
  },
];

export function ArchitectureMatrix() {
  const cx = [290, 470, 590, 760];
  const rowY = (i: number) => 40 + i * 46;
  return (
    <Plate
      w={960}
      h={226}
      title="A matrix with four architectures as rows and four problem traits as columns: data structure, latency, explainability and action risk. Software and optimization: rules known in advance, fastest, completely verifiable, fixed rules applied exactly. Calibrated tabular model: structured records, tight latency, legal explainability, scored against error costs. Retrieval-augmented generation: unstructured documents, seconds, citation checks, drafted text that is schema checked. Tool-using agent: external software tools, minutes, sandboxed execution, human sign-off when irreversible"
    >
      {["data structure", "latency", "explainability", "action risk"].map((h, j) => (
        <text key={h} x={cx[j]} y={20} fill={C.ink3} style={LA}>
          {h}
        </text>
      ))}
      <line x1={0} y1={32} x2={960} y2={32} stroke={C.ink} strokeWidth={1.2} />
      {ARCH.map((r, i) => {
        const y = rowY(i);
        return (
          <g key={r.t[0]}>
            <Icon as={r.as} x={16} y={y + 22} size={26} />
            <text x={42} y={y + 27} fill={C.ink} style={LB}>
              {r.t[0]}
            </text>
            {r.cells.map((c, j) => {
              const lit = i === 3 && j === 3;
              return (
                <text key={j} x={cx[j]} y={y + 27} fill={lit ? C.accent : C.ink2} style={lit ? LA : L}>
                  {c[0]}
                </text>
              );
            })}
            <line x1={0} y1={y + 44} x2={960} y2={y + 44} stroke={C.rule} />
          </g>
        );
      })}
    </Plate>
  );
}
