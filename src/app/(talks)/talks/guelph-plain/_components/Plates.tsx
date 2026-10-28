"use client";

import React, { useState } from "react";
import {
  Frame,
  Display,
  Plate,
  INK,
  INK3,
  RULE2,
  PAPER,
  PAPER3,
  SIGNAL,
  INK2,
  SERIF,
  seeded,
  r2,
} from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";


/** A plain sentence-case label in the heading serif. */
function Label({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 15,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={SERIF}
      fontSize={size}
      fill={fill}
    >
      {children}
    </text>
  );
}

/** One choice at a time, under a plate, in sentence case. */
export function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 px-1"
      role="group"
      aria-label={label}
    >
      <span
        className="shrink-0 text-[15px] text-[var(--ink-2)]"
        style={{ fontFamily: SERIF }}
      >
        {label}
      </span>
      <div className="flex flex-wrap border border-[var(--rule-2)]">
        {options.map((o) => {
          const on = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.id)}
              className={
                "border-l border-[var(--rule-2)] px-3 py-1.5 text-[13px] first:border-l-0 transition-colors " +
                (on
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "bg-[var(--paper)] text-[var(--ink-2)] hover:bg-[var(--paper-3)]")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Selectable data tables: each row is a condition, and choosing a row
   redraws the plate beside it.
   -------------------------------------------------------------------------- */

const TH =
  "border-b border-[var(--ink)] px-2 pb-2 text-left align-bottom text-[13px] font-semibold leading-snug text-[var(--ink)]";
const TD =
  "border-b border-[var(--rule)] px-2 py-2 align-middle text-[15px] tabular-nums";

function rowClass(on: boolean) {
  return (
    "cursor-pointer transition-colors " +
    (on
      ? "bg-[var(--paper-3)] shadow-[inset_3px_0_0_var(--signal)]"
      : "hover:bg-[var(--paper-2)]")
  );
}

/* --------------------------------------------------------------------------
   Study 1, Tool-Lab (Wadi & Ma 2026, Study 1, Table 1: means across eight
   LLMs of cells opened per diagnostic row, out of 2, and choice optimality,
   the share of sessions choosing Coffee B).
   -------------------------------------------------------------------------- */

const TOOL_LAB = [
  {
    goal: "Specific",
    cost: "$0",
    dollars: "2.00",
    cents: "2.00",
    weight: "2.00",
    diag: "6.00",
    opt: "0.94",
  },
  {
    goal: "Specific",
    cost: "$10",
    dollars: "2.00",
    cents: "1.72",
    weight: "2.00",
    diag: "5.72",
    opt: "0.83",
  },
  {
    goal: "Vague",
    cost: "$0",
    dollars: "2.00",
    cents: "1.97",
    weight: "1.90",
    diag: "5.86",
    opt: "0.89",
  },
  {
    goal: "Vague",
    cost: "$10",
    dollars: "1.94",
    cents: "0.77",
    weight: "1.10",
    diag: "3.81",
    opt: "0.29",
  },
];

/* --------------------------------------------------------------------------
   Paper 1, a live Tool-Lab (Mouselab) board with the Study 1 stimuli: two
   instant coffees, seven attributes each behind inspect_cell, at the cost
   of the chosen condition, ended by submit_choice. Attribute values,
   prompts and costs follow Wadi & Ma (2026), Study 1.
   -------------------------------------------------------------------------- */

const ATTRS = [
  { id: "price_dollars", a: "$4", b: "$5" },
  { id: "price_cents", a: "99 cents", b: "00 cents" },
  { id: "weight", a: "10 oz", b: "11 oz" },
  { id: "origin", a: "Colombia", b: "Colombia" },
  { id: "roast_date", a: "2 weeks ago", b: "2 weeks ago" },
  { id: "calories", a: "3", b: "3" },
  { id: "packaging", a: "Foil bag", b: "Foil bag" },
];

const PROMPTS = {
  Specific: "You need to find the coffee with the lowest price per ounce.",
  Vague: "You need to find the best deal on instant coffee.",
};

type Option = "coffee_a" | "coffee_b";

function Mouselab({ goal, cost }: { goal: "Specific" | "Vague"; cost: number }) {
  const [opened, setOpened] = useState<string[]>([]);
  const [last, setLast] = useState<string | null>(null);
  const [chosen, setChosen] = useState<Option | null>(null);
  const spent = opened.length * cost;
  const done = chosen !== null;

  const inspect = (opt: Option, attr: string, value: string) => {
    const key = `${opt}.${attr}`;
    if (done || opened.includes(key)) return;
    setOpened((o) => [...o, key]);
    setLast(`inspect_cell(${opt}, ${attr}) → "${value}"`);
  };
  const choose = (opt: Option) => {
    if (done) return;
    setChosen(opt);
    setLast(`submit_choice(${opt})`);
  };
  const reset = () => {
    setOpened([]);
    setLast(null);
    setChosen(null);
  };

  const cell = (opt: Option, attr: string, value: string) => {
    const open = opened.includes(`${opt}.${attr}`);
    return open ? (
      <span className="block border border-transparent px-2 py-[3px] text-center text-[14px] font-medium text-[var(--ink)]">{value}</span>
    ) : (
      <button
        type="button"
        disabled={done}
        onClick={() => inspect(opt, attr, value)}
        aria-label={`Inspect ${attr} of ${opt === "coffee_a" ? "Coffee A" : "Coffee B"}, costs $${cost}`}
        className="block w-full border border-[var(--ink-3)] bg-[var(--paper-3)] px-2 py-[3px] text-center text-[13px] text-[var(--ink-3)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--rule)] hover:text-[var(--ink)] disabled:cursor-default disabled:hover:border-[var(--ink-3)] disabled:hover:bg-[var(--paper-3)]"
      >
        {`$${cost}`}
      </button>
    );
  };

  const optimal = chosen === "coffee_b";
  return (
    <div className="figure-well w-full px-4 py-3">
      <p className="text-[14px] leading-snug text-[var(--ink-2)]" style={{ fontFamily: "var(--font-heading)" }}>
        <span className="text-[var(--ink-3)]">{goal} goal prompt:</span> <em>&ldquo;{PROMPTS[goal]}&rdquo;</em>
      </p>
      <table className="mt-3 w-full border-collapse">
        <thead>
          <tr>
            <th className="w-[38%]" />
            {(["coffee_a", "coffee_b"] as Option[]).map((opt) => (
              <th key={opt} className="border-b border-[var(--ink)] pb-1.5 text-center align-bottom text-[13px] font-normal text-[var(--ink)]">
                <code>{opt}</code>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ATTRS.map((r) => (
            <tr key={r.id}>
              <td className="py-[2px] pr-3 text-[13px] text-[var(--ink-2)]">
                <code className="bg-[var(--paper)] px-1 py-0.5">{r.id}</code>
              </td>
              <td className="px-1.5 py-[2px]">{cell("coffee_a", r.id, r.a)}</td>
              <td className="px-1.5 py-[2px]">{cell("coffee_b", r.id, r.b)}</td>
            </tr>
          ))}
          <tr>
            <td className="pt-3" />
            {(["coffee_a", "coffee_b"] as Option[]).map((opt) => (
              <td key={opt} className="px-1.5 pt-3">
                <button
                  type="button"
                  disabled={done}
                  onClick={() => choose(opt)}
                  className={
                    "block w-full border px-2 py-1.5 text-[13px] transition-colors " +
                    (chosen === opt
                      ? optimal
                        ? "border-[var(--signal)] bg-[var(--signal)] text-[var(--paper)]"
                        : "border-[var(--counter)] bg-[var(--counter)] text-[var(--paper)]"
                      : "border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] disabled:opacity-40 disabled:hover:bg-[var(--paper)] disabled:hover:text-[var(--ink)]")
                  }
                >
                  submit_choice
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="mt-3 flex h-[3.1rem] items-center justify-between gap-4 border-t border-[var(--rule-2)] pt-2">
        <p
          className={`line-clamp-2 min-w-0 text-[13px] leading-snug ${
            done ? (optimal ? "text-[var(--signal)]" : "text-[var(--counter)]") : "text-[var(--ink-3)]"
          }`}
        >
          {done
            ? optimal
              ? "submit_choice(coffee_b): $5.00 / 11 oz = $0.455/oz, the optimal choice"
              : "submit_choice(coffee_a): $4.99 / 10 oz = $0.499/oz. Coffee B was $0.455/oz"
            : (last ?? "Click a cell to call inspect_cell")}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <p className="text-[13px] text-[var(--ink-3)]">
            Charged to the consumer{" "}
            <span className="pl-1 text-[1.35rem] leading-none text-[var(--ink)]" style={{ fontFamily: "var(--font-heading)" }}>
              {`$${spent}`}
            </span>
          </p>
          {opened.length > 0 || done ? (
            <button
              type="button"
              onClick={reset}
              className="border border-[var(--rule-2)] bg-[var(--paper)] px-2.5 py-1 text-[13px] text-[var(--ink-2)] hover:bg-[var(--paper-3)]"
            >
              Reset
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Paper 1: coffee descriptions and condition table on the left. The live board on the right. Picking a row sets the board's condition. */
export function ToolLabStudy({ intro }: { intro: React.ReactNode }) {
  const [sel, setSel] = useState(3);
  const head = [
    "Goal Prompt",
    "Cost",
    "Cents (of 2)",
    "Weight (of 2)",
    "Dollars (of 2)",
    "Diagnostic (of 6)",
    "Choice Optimality",
  ];
  const row = TOOL_LAB[sel];
  return (
    <div className="grid w-full items-center gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
      <div className="flex min-w-0 flex-col gap-5">
        {intro}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} className={TH}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOOL_LAB.map((r, i) => (
              <tr
                key={i}
                className={rowClass(i === sel)}
                onClick={() => setSel(i)}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" ? setSel(i) : null)}
                aria-selected={i === sel}
              >
                <td className={`${TD} font-semibold text-[var(--ink)]`}>{r.goal}</td>
                <td className={`${TD} font-semibold text-[var(--ink)]`}>{r.cost}</td>
                <td className={TD}>{r.cents}</td>
                <td className={TD}>{r.weight}</td>
                <td className={TD}>{r.dollars}</td>
                <td className={TD}>{r.diag}</td>
                <td className={`${TD} font-semibold ${i === sel ? "text-[var(--signal)]" : "text-[var(--ink)]"}`}>
                  {r.opt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Mouselab
        key={sel}
        goal={row.goal as "Specific" | "Vague"}
        cost={row.cost === "$10" ? 10 : 0}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Study 2, sponsorship (Wadi & Ma, JBR, Study 1, Gemini 3.1 Pro: target
   choice share when organic vs tagged "Platform sponsor", by principal).
   -------------------------------------------------------------------------- */

const SPONSOR = [
  {
    spec: "Role-neutral",
    organic: "49.6%",
    sponsored: "7.8%",
    penalty: "41.8 pp",
  },
  {
    spec: "Consumer delegation",
    organic: "53.0%",
    sponsored: "2.8%",
    penalty: "50.2 pp",
  },
  {
    spec: "Platform delegation",
    organic: "54.2%",
    sponsored: "25.0%",
    penalty: "29.2 pp",
  },
  {
    spec: "Platform with consumer beneficiary",
    organic: "51.4%",
    sponsored: "3.2%",
    penalty: "48.2 pp",
  },
];

function HotelCard({ x, y, tag }: { x: number; y: number; tag?: string }) {
  const w = 140;
  const h = 96;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.5}
      />
      <text x={x + w / 2} y={y + 44} textAnchor="middle" fill={INK} fontSize={15} letterSpacing={1}>
        ★★★★☆
      </text>
      <text x={x + w / 2} y={y + 72} textAnchor="middle" fill={INK} fontSize={17}>
        $189
      </text>
      {tag ? (
        <g>
          <rect
            x={x + w - 106}
            y={y - 9}
            width={100}
            height={18}
            fill={PAPER}
            stroke={INK}
            strokeWidth={1.25}
          />
          <text
            x={x + w - 56}
            y={y + 4}
            textAnchor="middle"
            fill={INK}
            fontSize={11}
          >
            {tag}
          </text>
        </g>
      ) : null}
    </g>
  );
}

function HotelPair({ row }: { row: (typeof SPONSOR)[number] }) {
  const organic = parseFloat(row.organic);
  const sponsored = parseFloat(row.sponsored);
  const base = 270;
  const scale = 118 / 60;
  return (
    <Frame
      width={400}
      height={296}
      label={`Two identical hotel listings at $189 with four stars. The right one carries a Platform sponsor tag. ${row.spec}: ${row.organic} chose the organic target and ${row.sponsored} the sponsored target, a sponsorship penalty of ${row.penalty}.`}
    >
      <HotelCard x={15} y={14} />
      <HotelCard x={245} y={14} tag="Platform sponsor" />
      {[
        { cx: 85, v: organic, text: row.organic, fill: PAPER3, ink: INK },
        {
          cx: 315,
          v: sponsored,
          text: row.sponsored,
          fill: SIGNAL,
          ink: SIGNAL,
        },
      ].map((b) => {
        const h = r2(b.v * scale);
        return (
          <g key={b.cx}>
            <rect
              x={b.cx - 32}
              y={r2(base - h)}
              width={64}
              height={h}
              fill={b.fill}
              stroke={b.fill === PAPER3 ? INK : "none"}
              strokeWidth={1.25}
            />
            <Display
              x={b.cx}
              y={r2(base - h - 8)}
              anchor="middle"
              fill={b.ink}
              size={20}
            >
              {b.text}
            </Display>
          </g>
        );
      })}
      <line
        x1={20}
        y1={base}
        x2={380}
        y2={base}
        stroke={INK}
        strokeWidth={1.5}
      />
      <Display x={200} y={222} anchor="middle" size={24}>
        {row.penalty}
      </Display>
      <Label x={200} y={244} anchor="middle" size={14} fill={INK3}>
        Sponsorship penalty
      </Label>
      <Label x={85} y={290} anchor="middle" size={14} fill={INK3}>
        Organic target
      </Label>
      <Label x={315} y={290} anchor="middle" size={14} fill={INK3}>
        Sponsored target
      </Label>
    </Frame>
  );
}

export function SponsorStudy() {
  const [sel, setSel] = useState(2);
  const head = [
    "Principal Specification (Study 1, Gemini 3.1 Pro)",
    "Organic Target Choice",
    "Sponsored Target Choice",
    "Sponsorship Penalty (pp)",
  ];
  return (
    <div className="grid w-full items-center gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-10">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SPONSOR.map((r, i) => (
            <tr
              key={r.spec}
              className={rowClass(i === sel)}
              onClick={() => setSel(i)}
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" ? setSel(i) : null)}
              aria-selected={i === sel}
            >
              <td className={`${TD} font-semibold text-[var(--ink)]`}>
                {r.spec}
              </td>
              <td className={TD}>{r.organic}</td>
              <td className={TD}>{r.sponsored}</td>
              <td
                className={`${TD} font-semibold ${i === sel ? "text-[var(--signal)]" : "text-[var(--ink)]"}`}
              >
                {r.penalty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Plate>
        <HotelPair row={SPONSOR[sel]} />
      </Plate>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Study 3, position effect on choice (Wadi & Ma, Marketing Letters,
   appendix: linear probability models of choice with quadratic position,
   position scaled to rank / 100, by LLM and reasoning effort, human
   benchmark: linear position coefficient on choice, -0.0001 per rank, from
   Ursu 2018, Table 2). Curves are the change in choice probability relative
   to rank 1, controls held fixed.
   -------------------------------------------------------------------------- */

type Effort = { id: string; label: string; b1: number; b2: number };

const CHOICE_CURVES: { id: string; label: string; efforts: Effort[] }[] = [
  {
    id: "sonnet",
    label: "Sonnet",
    efforts: [
      { id: "low", label: "Low", b1: -0.1565, b2: 0.1217 },
      { id: "high", label: "High", b1: -0.0051, b2: 0.0016 },
    ],
  },
  {
    id: "pro",
    label: "Pro",
    efforts: [
      { id: "low", label: "Low", b1: -0.076, b2: 0.0638 },
      { id: "medium", label: "Medium", b1: -0.0237, b2: 0.0179 },
      { id: "high", label: "High", b1: -0.008, b2: 0.0071 },
    ],
  },
  {
    id: "luna",
    label: "Luna",
    efforts: [
      { id: "none", label: "None", b1: -0.0729, b2: 0.0544 },
      { id: "medium", label: "Medium", b1: -0.0652, b2: 0.0441 },
      { id: "xhigh", label: "xHigh", b1: -0.0364, b2: 0.0202 },
    ],
  },
  {
    id: "flashlite",
    label: "Flash Lite",
    efforts: [
      { id: "minimal", label: "Minimal", b1: -0.0503, b2: 0.0418 },
      { id: "low", label: "Low", b1: -0.0276, b2: 0.0197 },
      { id: "medium", label: "Medium", b1: -0.0095, b2: 0.0052 },
      { id: "high", label: "High", b1: 0.0023, b2: -0.001 },
    ],
  },
  {
    id: "flash",
    label: "Flash",
    efforts: [
      { id: "low", label: "Low", b1: 0.0034, b2: -0.0038 },
      { id: "medium", label: "Medium", b1: 0.0037, b2: -0.0051 },
    ],
  },
];

const HUMAN_PER_RANK = -0.0001;

export function PositionCurvePlate() {
  const [modelId, setModelId] = useState("sonnet");
  const model = CHOICE_CURVES.find((m) => m.id === modelId)!;
  const [effortId, setEffortId] = useState(model.efforts[0].id);
  const effort = model.efforts.find((e) => e.id === effortId) ?? model.efforts[0];

  const pickModel = (id: string) => {
    setModelId(id);
    setEffortId(CHOICE_CURVES.find((m) => m.id === id)!.efforts[0].id);
  };

  // Change in choice probability (percentage points) relative to rank 1.
  const agent = (rank: number) => {
    const x = rank / 100;
    return 100 * (effort.b1 * (x - 0.01) + effort.b2 * (x * x - 0.0001));
  };
  const human = (rank: number) => 100 * HUMAN_PER_RANK * (rank - 1);

  const X0 = 58;
  const X1 = 372;
  const Y0 = 74;
  const Y1 = 246;
  const MIN = -6;
  const px = (rank: number) => r2(X0 + ((rank - 1) / 99) * (X1 - X0));
  const py = (pp: number) => r2(Y0 + (Math.min(0.5, Math.max(MIN, pp)) / MIN) * (Y1 - Y0));
  const ranks = Array.from({ length: 100 }, (_, i) => i + 1);
  const path = ranks.map((r, i) => `${i === 0 ? "M" : "L"}${px(r)} ${py(agent(r))}`).join("");

  let low = 1;
  ranks.forEach((r) => {
    if (agent(r) < agent(low)) low = r;
  });
  const lowPp = agent(low);
  const dips = low > 1 && low < 100 && lowPp < -0.5;

  return (
    <Plate>
      <Frame
        width={400}
        height={294}
        label={`Change in the probability that a listing is chosen, relative to the top listing, by rank from 1 to 100. Humans (Ursu 2018) decline in a straight line to ${human(100).toFixed(1)} points at rank 100. ${model.label} at ${effort.label} reasoning effort ${
          dips
            ? `dips to ${lowPp.toFixed(1)} points at rank ${low} and recovers to ${agent(100).toFixed(1)} at rank 100, the lost-in-the-middle shape`
            : `stays close to flat, ${agent(100).toFixed(1)} points at rank 100`
        }.`}
      >
        <g stroke={INK} strokeWidth={2}>
          <line x1={X1 - 196} x2={X1 - 172} y1={10} y2={10} strokeDasharray="6 4" />
          <line x1={X1 - 196} x2={X1 - 172} y1={28} y2={28} />
        </g>
        <Label x={X1 - 166} y={15} fill={INK} size={13}>
          Humans (Ursu, 2018)
        </Label>
        <Label x={X1 - 166} y={33} fill={INK} size={13}>
          {`${model.label}, ${effort.label.toLowerCase()} effort`}
        </Label>
        <Label x={X0} y={58} fill={INK} size={13}>
          Choice probability vs. the top listing (pp)
        </Label>
        {[0, -2, -4, -6].map((t) => (
          <g key={t}>
            <line x1={X0 - 5} y1={py(t)} x2={t === 0 ? X1 : X0} y2={py(t)} stroke={INK} strokeWidth={t === 0 ? 1 : 1.25} />
            <Label x={X0 - 9} y={r2(py(t) + 4)} anchor="end" fill={INK} size={12}>
              {t === 0 ? "0" : `−${Math.abs(t)}`}
            </Label>
          </g>
        ))}
        <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke={INK} strokeWidth={1.25} />
        <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke={INK} strokeWidth={1.25} />
        {[1, 25, 50, 75, 100].map((r) => (
          <g key={r}>
            <line x1={px(r)} y1={Y1} x2={px(r)} y2={Y1 + 5} stroke={INK} strokeWidth={1.25} />
            <Label x={px(r)} y={Y1 + 19} anchor="middle" fill={INK} size={12}>
              {String(r)}
            </Label>
          </g>
        ))}
        <Label x={r2((X0 + X1) / 2)} y={Y1 + 40} anchor="middle" fill={INK} size={13}>
          Rank on the results page
        </Label>
        {/* humans: a straight decline */}
        <line x1={px(1)} y1={py(human(1))} x2={px(100)} y2={py(human(100))} stroke={INK} strokeWidth={2} strokeDasharray="6 4" />
        {/* the agent */}
        <path d={path} fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        {dips ? (
          <g>
            <circle cx={px(low)} cy={py(lowPp)} r={3.5} fill={INK} />
            <Label x={px(low)} y={r2(py(lowPp) + 20)} anchor="middle" fill={INK} size={13}>
              {`−${Math.abs(lowPp).toFixed(1)} pp at rank ${low}`}
            </Label>
          </g>
        ) : null}
      </Frame>
      <Choice
        label="AI agent"
        value={modelId}
        onChange={pickModel}
        options={CHOICE_CURVES.map((m) => ({ id: m.id, label: m.label }))}
      />
      <Choice
        label="Reasoning effort"
        value={effort.id}
        onChange={setEffortId}
        options={model.efforts.map((e) => ({ id: e.id, label: e.label }))}
      />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   00, The agentic triad as a plain box diagram: consumer, AI agent and firm,
   each pair joined by a line.
   -------------------------------------------------------------------------- */

/** A labelled box centred at (cx, cy). */
function Box({ cx, cy, w, children }: { cx: number; cy: number; w: number; children: string }) {
  const h = 40;
  return (
    <g>
      <rect x={r2(cx - w / 2)} y={r2(cy - h / 2)} width={w} height={h} fill={PAPER} stroke={INK} strokeWidth={1.5} />
      <Label x={cx} y={r2(cy + 5.5)} anchor="middle" fill={INK} size={16}>
        {children}
      </Label>
    </g>
  );
}

export function TriadPlate() {
  const agent = { x: 200, y: 32 };
  const consumer = { x: 70, y: 170 };
  const firm = { x: 330, y: 170 };
  return (
    <Plate>
      <Frame
        width={400}
        height={196}
        label="The agentic triad: three boxes, consumer, AI agent and firm, joined by lines in a triangle with the AI agent at the top."
      >
        <g stroke={INK} strokeWidth={1.5}>
          <line x1={agent.x - 40} y1={agent.y + 20} x2={consumer.x + 20} y2={consumer.y - 20} />
          <line x1={agent.x + 40} y1={agent.y + 20} x2={firm.x - 20} y2={firm.y - 20} />
          <line x1={consumer.x + 60} y1={consumer.y} x2={firm.x - 60} y2={firm.y} />
        </g>
        <Box cx={agent.x} cy={agent.y} w={120}>AI agent</Box>
        <Box cx={consumer.x} cy={consumer.y} w={120}>Consumer</Box>
        <Box cx={firm.x} cy={firm.y} w={120}>Firm</Box>
      </Frame>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   06, One draw versus the distribution. An illustrative 7-point response
   distribution for one prompt. Sampled answers scatter around it, while
   token probabilities give it exactly.
   -------------------------------------------------------------------------- */

const EXACT = [0.02, 0.05, 0.12, 0.22, 0.33, 0.19, 0.07];
type Draws = "1" | "10" | "100" | "exact";

function sample(n: number, seed: number) {
  const rand = seeded(seed);
  const counts = EXACT.map(() => 0);
  for (let i = 0; i < n; i++) {
    let u = rand();
    let k = 0;
    while (k < EXACT.length - 1 && u >= EXACT[k]) {
      u -= EXACT[k];
      k++;
    }
    counts[k]++;
  }
  return counts.map((c) => c / n);
}

export function LikertPlate() {
  const [draws, setDraws] = useState<Draws>("1");
  const [seed, setSeed] = useState(11);
  const shares =
    draws === "exact"
      ? EXACT
      : sample(Number(draws), seed * 101 + Number(draws));
  const base = 196;
  const h = 160;
  const cx = (i: number) => 72 + i * 44;
  const what =
    draws === "exact"
      ? "the exact distribution from token probabilities"
      : `${draws} sampled ${draws === "1" ? "response" : "responses"}`;

  return (
    <Plate>
      <Frame
        width={400}
        height={244}
        label={`Share of answers at each point of a 7-point agreement scale, from ${what}. Bars show the shares: ${shares
          .map((v, i) => `${i + 1}: ${Math.round(v * 100)}%`)
          .join(
            ", ",
          )}. Blue ticks mark the exact distribution, peaking at 5 with 33%.`}
      >
        {[0, 0.5, 1].map((t) => (
          <g key={t}>
            <line
              x1={44}
              y1={r2(base - t * h)}
              x2={380}
              y2={r2(base - t * h)}
              stroke={RULE2}
              strokeWidth={t === 0 ? 1.5 : 0.75}
            />
            <Label
              x={38}
              y={r2(base - t * h + 5)}
              anchor="end"
              fill={INK3}
              size={13}
            >
              {`${t * 100}%`}
            </Label>
          </g>
        ))}
        {shares.map((v, i) => {
          const bh = r2(v * h);
          return (
            <g key={i}>
              {bh > 0 ? (
                <rect
                  x={cx(i) - 15}
                  y={r2(base - bh)}
                  width={30}
                  height={bh}
                  fill={PAPER3}
                  stroke={INK}
                  strokeWidth={1.25}
                />
              ) : null}
              <line
                x1={cx(i) - 19}
                y1={r2(base - EXACT[i] * h)}
                x2={cx(i) + 19}
                y2={r2(base - EXACT[i] * h)}
                stroke={SIGNAL}
                strokeWidth={3}
              />
              <Label x={cx(i)} y={214} anchor="middle" fill={INK} size={14}>
                {String(i + 1)}
              </Label>
            </g>
          );
        })}
        <Label
          x={cx(4)}
          y={r2(base - EXACT[4] * h - 9)}
          anchor="middle"
          fill={SIGNAL}
          size={14}
        >
          exact
        </Label>
        <Label x={cx(0) - 15} y={236} fill={INK3} size={13}>
          Strongly disagree
        </Label>
        <Label x={cx(6) + 15} y={236} anchor="end" fill={INK3} size={13}>
          Strongly agree
        </Label>
      </Frame>
      <div className="flex flex-wrap items-end gap-x-4">
        <Choice
          label="Responses"
          value={draws}
          onChange={setDraws}
          options={[
            { id: "1", label: "One" },
            { id: "10", label: "10" },
            { id: "100", label: "100" },
            { id: "exact", label: "Exact" },
          ]}
        />
        <button
          type="button"
          disabled={draws === "exact"}
          onClick={() => setSeed((v) => v + 1)}
          className="mt-3 border border-[var(--rule-2)] bg-[var(--paper)] px-3 py-1.5 text-[13px] text-[var(--ink-2)] transition-colors hover:bg-[var(--paper-3)] disabled:opacity-40"
        >
          Ask again
        </button>
      </div>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Paper 4, party opinions on unseen questions (Wadi & Ma 2026, SubPOP / US
   GSS, Democrat and Republican subpopulations). Human shares are exact from
   subpop_eval.jsonl. Model shares are human plus the per-option errors
   printed in political_party_mixed_diff_vs_human_subpop.png (whole points),
   and KL values are those printed in the KDE figure. Curves use the same
   discrete KDE (bandwidth 0.55) as political_party_mixed_kde_by_sample_subpop.
   -------------------------------------------------------------------------- */

type PartyModel = "k08" | "k08ft" | "k4" | "k4ft";
type Party = "dem" | "rep";

const PARTY_QS: {
  id: string;
  label: string;
  ends: [string, string];
  human: Record<Party, number[]>;
  err: Record<PartyModel, Record<Party, number[]>>;
  kl: Record<PartyModel, Record<Party, number>>;
}[] = [
  {
    id: "letin1a",
    label: "Immigration",
    ends: ["Increased a lot", "Reduced a lot"],
    human: { dem: [0.157, 0.2363, 0.436, 0.1005, 0.0702], rep: [0.0343, 0.0544, 0.2536, 0.2564, 0.4013] },
    err: {
      k08: { dem: [1, 4, -15, 6, 4], rep: [12, 20, 4, -8, -28] },
      k08ft: { dem: [-5, -9, -10, 12, 12], rep: [-1, -1, -4, 1, 4] },
      k4: { dem: [5, 3, -10, 2, -1], rep: [-1, -1, -10, 1, 11] },
      k4ft: { dem: [-7, -4, -1, 9, 4], rep: [-2, -1, -7, -7, 18] },
    },
    kl: {
      k08: { dem: 0.09, rep: 0.6 },
      k08ft: { dem: 0.21, rep: 0.01 },
      k4: { dem: 0.03, rep: 0.06 },
      k4ft: { dem: 0.1, rep: 0.11 },
    },
  },
  {
    id: "marhomo",
    label: "Same-sex marriage",
    ends: ["Strongly agree", "Strongly disagree"],
    human: { dem: [0.6455, 0.1518, 0.0982, 0.0341, 0.0704], rep: [0.2045, 0.2624, 0.1914, 0.1279, 0.2138] },
    err: {
      k08: { dem: [-52, -1, 36, 15, 2], rep: [-10, -14, 26, 9, -11] },
      k08ft: { dem: [-46, 18, 9, 16, 3], rep: [-10, -1, 1, 11, -1] },
      k4: { dem: [-31, 43, -4, -2, -6], rep: [-8, -12, 3, 17, 0] },
      k4ft: { dem: [-14, 20, -1, 1, -5], rep: [-17, -13, -7, 21, 16] },
    },
    kl: {
      k08: { dem: 1.23, rep: 0.38 },
      k08ft: { dem: 0.77, rep: 0.1 },
      k4: { dem: 0.62, rep: 0.19 },
      k4ft: { dem: 0.18, rep: 0.55 },
    },
  },
];

/**
 * Only the untuned and fine-tuned Kev 0.8B, on the two questions where
 * fine-tuning visibly separated the parties toward the human curves
 * (immigration and same-sex marriage). The paper figure's newspaper and
 * hiring questions, and the 4B pair, are left out.
 */
const PARTY_MODELS: { id: PartyModel; label: string }[] = [
  { id: "k08", label: "Kev 0.8B" },
  { id: "k08ft", label: "Kev 0.8B FT" },
];

/** Human share plus the printed error, clipped at zero and renormalized. */
function modelShares(human: number[], err: number[]) {
  const raw = human.map((h, i) => Math.max(0, h + err[i] / 100));
  const sum = raw.reduce((a, b) => a + b, 0) || 1;
  return raw.map((v) => v / sum);
}

/** The figure's discrete KDE: a Gaussian bump (bw 0.55) on each option, in %. */
function kdePath(probs: number[], x0: number, x1: number, base: number, scale: number) {
  const n = probs.length;
  const pts: string[] = [];
  const steps = 60;
  for (let s = 0; s <= steps; s++) {
    const g = -0.4 + (s / steps) * (n - 0.2);
    let v = 0;
    probs.forEach((p, c) => {
      v += (p * Math.exp(-0.5 * ((g - c) / 0.55) ** 2)) / (0.55 * Math.sqrt(2 * Math.PI));
    });
    const x = x0 + ((g + 0.4) / (n - 0.2)) * (x1 - x0);
    pts.push(`${s === 0 ? "M" : "L"}${r2(x)} ${r2(base - v * 100 * scale)}`);
  }
  return pts.join("");
}

function PartyPanel({
  x,
  title,
  shares,
  kl,
  ends,
  tag,
}: {
  x: number;
  title: string;
  shares: Record<Party, number[]>;
  kl?: Record<Party, number>;
  ends: [string, string];
  tag?: boolean;
}) {
  const w = 176;
  const base = 168;
  const scale = 2.6;
  const party: { id: Party; name: string; dash?: string }[] = [
    { id: "dem", name: "Democrat" },
    { id: "rep", name: "Republican", dash: "5 4" },
  ];
  return (
    <g>
      <Label x={x} y={18} fill={INK} size={15}>
        {title}
      </Label>
      {kl ? (
        <g>
          <Label x={x} y={base + 34} fill={INK} size={12}>
            {`Democrat KL = ${kl.dem.toFixed(2)}`}
          </Label>
          <Label x={x} y={base + 50} fill={INK} size={12}>
            {`Republican KL = ${kl.rep.toFixed(2)}`}
          </Label>
        </g>
      ) : null}
      {party.map((p) => {
        const d = kdePath(shares[p.id], x, x + w, base, scale);
        return (
          <g key={p.id}>
            <path d={d} fill="none" stroke={INK} strokeWidth={2} strokeDasharray={p.dash} strokeLinejoin="round" />
          </g>
        );
      })}
      <line x1={x} y1={base} x2={x + w} y2={base} stroke={INK} strokeWidth={1.25} />
      <Label x={x} y={base + 16} fill={INK} size={11.5}>
        {ends[0]}
      </Label>
      <Label x={x + w} y={base + 16} anchor="end" fill={INK} size={11.5}>
        {ends[1]}
      </Label>
      {tag ? (
        <g>
          <g stroke={INK} strokeWidth={2}>
            <line x1={x} x2={x + 20} y1={base + 30} y2={base + 30} />
            <line x1={x + 92} x2={x + 112} y1={base + 30} y2={base + 30} strokeDasharray="5 4" />
          </g>
          <Label x={x + 25} y={base + 34} fill={INK} size={12}>
            Democrat
          </Label>
          <Label x={x + 117} y={base + 34} fill={INK} size={12}>
            Republican
          </Label>
        </g>
      ) : null}
    </g>
  );
}

export function PartyPlate() {
  const [qid, setQid] = useState("letin1a");
  const [mid, setMid] = useState<PartyModel>("k08");
  const q = PARTY_QS.find((x) => x.id === qid)!;
  const model = PARTY_MODELS.find((m) => m.id === mid)!;
  const shares = {
    dem: modelShares(q.human.dem, q.err[mid].dem),
    rep: modelShares(q.human.rep, q.err[mid].rep),
  };
  const pct = (v: number[]) => v.map((p) => `${Math.round(p * 100)}%`).join(", ");
  return (
    <Plate>
      <Frame
        width={400}
        height={224}
        label={`Answer distributions on the unseen GSS question about ${q.label.toLowerCase()}, from ${q.ends[0]} to ${q.ends[1]}. Humans: Democrats ${pct(q.human.dem)}. Republicans ${pct(q.human.rep)}. ${model.label}: Democrats ${pct(shares.dem)} (KL ${q.kl[mid].dem}). Republicans ${pct(shares.rep)} (KL ${q.kl[mid].rep}).`}
      >
        <PartyPanel x={12} title="Human" shares={q.human} ends={q.ends} tag />
        <line x1={200} y1={8} x2={200} y2={184} stroke={INK} strokeWidth={1} />
        <PartyPanel x={212} title={model.label} shares={shares} kl={q.kl[mid]} ends={q.ends} />
      </Frame>
      <Choice
        label="Question"
        value={qid}
        onChange={setQid}
        options={PARTY_QS.map((x) => ({ id: x.id, label: x.label }))}
      />
      <Choice label="Model" value={mid} onChange={setMid} options={PARTY_MODELS} />
    </Plate>
  );
}

/** The live Tool-Lab board on its own, with the goal prompt and inspection cost as choices beneath it. */
export function ToolLabBoard() {
  const [goal, setGoal] = useState<"Specific" | "Vague">("Vague");
  const [cost, setCost] = useState<"0" | "10">("10");
  return (
    <div className="w-full min-w-0">
      <Mouselab key={`${goal}-${cost}`} goal={goal} cost={Number(cost)} />
      <Choice
        label="Goal prompt"
        value={goal}
        onChange={setGoal}
        options={[
          { id: "Specific", label: "Specific" },
          { id: "Vague", label: "Vague" },
        ]}
      />
      <Choice
        label="Acquisition cost"
        value={cost}
        onChange={setCost}
        options={[
          { id: "0", label: "$0" },
          { id: "10", label: "$10" },
        ]}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Paper 2 design, no results: the principal's system prompt (Wadi & Ma, JBR,
   Study 1, tbl-principal, main experiment) over a matched target and
   competitor. The sponsorship manipulation adds the "Platform sponsor" tag to
   the target only.
   -------------------------------------------------------------------------- */

/** The principal noun is the manipulated part of the prompt and is set in bold. */
const PRINCIPAL_NOUN = { consumer: "a traveler", platform: "a hotel booking platform" };

export function SponsorDesign() {
  const [principal, setPrincipal] = useState<"consumer" | "platform">("platform");
  const [sponsorship, setSponsorship] = useState<"organic" | "sponsored">("sponsored");
  return (
    <div className="figure-well w-full min-w-0 px-4 py-4">
      {/* Both prompts share one grid cell, so the box keeps the longer one's height when the principal changes. */}
      <div className="grid">
        {(["consumer", "platform"] as const).map((p) => (
          <p
            key={p}
            aria-hidden={p !== principal}
            className={`col-start-1 row-start-1 text-[15px] leading-snug text-[var(--ink-2)] ${
              p === principal ? "" : "invisible"
            }`}
            style={{ fontFamily: SERIF }}
          >
            <span className="text-[var(--ink-3)]">System prompt:</span>{" "}
            <em>
              &ldquo;You have been employed by{" "}
              <strong className="font-semibold text-[var(--ink)]">{PRINCIPAL_NOUN[p]}</strong> to recommend hotels.
              Which hotel would you book?&rdquo;
            </em>
          </p>
        ))}
      </div>
      <Frame
        width={400}
        height={150}
        label={`A target and a competitor hotel listing, identical in price and rating${
          sponsorship === "sponsored" ? ". The target carries a Platform sponsor tag" : ""
        }`}
        className="mt-3"
      >
        <HotelCard x={15} y={22} tag={sponsorship === "sponsored" ? "Platform sponsor" : undefined} />
        <HotelCard x={245} y={22} />
        <Label x={85} y={142} anchor="middle" size={14} fill={INK3}>
          Target
        </Label>
        <Label x={315} y={142} anchor="middle" size={14} fill={INK3}>
          Competitor
        </Label>
      </Frame>
      <Choice
        label="Principal"
        value={principal}
        onChange={setPrincipal}
        options={[
          { id: "consumer", label: "Consumer delegation" },
          { id: "platform", label: "Platform delegation" },
        ]}
      />
      <Choice
        label="Sponsorship"
        value={sponsorship}
        onChange={setSponsorship}
        options={[
          { id: "organic", label: "Organic" },
          { id: "sponsored", label: "Sponsored" },
        ]}
      />
    </div>
  );
}
