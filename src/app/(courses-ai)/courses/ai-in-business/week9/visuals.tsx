"use client";

import React, { useState } from "react";
import {
  Bank,
  Briefcase,
  Buildings,
  ChartBar,
  ChatCircleText,
  CheckCircle,
  Cpu,
  CreditCard,
  CurrencyDollar,
  Database,
  Envelope,
  Files,
  Fingerprint,
  FirstAid,
  GameController,
  GraduationCap,
  HandHeart,
  HardDrives,
  Heartbeat,
  House,
  Key,
  Lightbulb,
  Lightning,
  MapPin,
  Mountains,
  Prohibit,
  Scales,
  SlidersHorizontal,
  Storefront,
  Tree,
  UsersThree,
  Wheelchair,
} from "@phosphor-icons/react";
import { Arrow, C, Knob, Plate, label, r2 } from "../_visuals/kit";

/* ==========================================================================
   WEEK 9 PLATES
   --------------------------------------------------------------------------
   Plain academic plates on the white slide: ink for structure, grey for
   secondary marks, and one slate-blue mark for the element that is learned,
   lit or chosen. On the people plates the slate-blue figures are the
   community the slide is about. See the course CLAUDE.md.
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
    x: r2(x - size / 2),
    y: r2(y - size / 2),
    size,
    weight,
    color: tone,
  });
}

/** A small person: head and shoulders. */
function Person({ x, y, s = 1, tone = C.ink, fill }: { x: number; y: number; s?: number; tone?: string; fill?: string }) {
  const f = fill ?? (tone === C.accent ? C.tint : C.paper);
  return (
    <g stroke={tone} strokeWidth={1.4} fill={f}>
      <circle cx={x} cy={r2(y - 9 * s)} r={r2(5.5 * s)} />
      <path d={`M${r2(x - 9 * s)} ${r2(y + 9 * s)}Q${r2(x - 9 * s)} ${r2(y - 1 * s)} ${x} ${r2(y - 1 * s)}Q${r2(x + 9 * s)} ${r2(y - 1 * s)} ${r2(x + 9 * s)} ${r2(y + 9 * s)}Z`} />
    </g>
  );
}

/** A page with a folded corner. */
function Page({ x, y, w, h, tone = C.ink, fill }: { x: number; y: number; w: number; h: number; tone?: string; fill?: string }) {
  const f = 12;
  return (
    <g stroke={tone} strokeWidth={1.3} fill={fill ?? C.paper} strokeLinejoin="round">
      <path d={`M${x} ${y}H${x + w - f}L${x + w} ${y + f}V${y + h}H${x}Z`} />
      <path d={`M${x + w - f} ${y}V${y + f}H${x + w}`} fill="none" />
    </g>
  );
}

/* --------------------------------------------------------------------------
   Allocative Harm Versus Representational Harm
   -------------------------------------------------------------------------- */

const RESOURCES = [CreditCard, Briefcase, House, FirstAid];

export function HarmTaxonomy() {
  // left: a system hands out resources, and one community is refused
  const sysX = 120;
  const rows = [
    { y: 70, lit: false },
    { y: 150, lit: true },
  ];
  // right: the people in a profession, and the images generated for it
  const pop = [0, 1, 0, 0, 1, 0, 1, 0];
  return (
    <Plate
      w={960}
      h={262}
      title="Two kinds of harm. On the left, allocative harm: an automated system hands credit, a job, housing and medical care to one group of people and refuses the same resources to a second community. On the right, representational harm: the people who work as doctors include members of that community, but every image an image model generates for a doctor shows only the majority group, so the community disappears. A dashed arrow from the right panel back to the left says that representational harm leads to future allocative inequities"
    >
      <text x={0} y={18} fill={C.ink} style={LB}>
        allocative harm
      </text>
      <Box x={sysX - 46} y={64} w={92} h={110} tone={C.ink} />
      {RESOURCES.map((Ic, i) => (
        <Icon key={i} as={Ic} x={sysX - 20 + (i % 2) * 40} y={95 + Math.floor(i / 2) * 46} size={28} tone={C.ink2} />
      ))}
      {rows.map((r) => (
        <g key={r.y}>
          {r.lit ? (
            <g>
              <path d={`M${sysX + 50} ${r.y + 10}H${sysX + 140}`} stroke={C.accent} strokeWidth={1.6} strokeDasharray="5 4" />
              <Icon as={Prohibit} x={sysX + 158} y={r.y + 10} size={26} tone={C.accent} weight="regular" />
            </g>
          ) : (
            <g>
              <Arrow x1={sysX + 50} y1={r.y + 10} x2={sysX + 172} y2={r.y + 10} />
              {RESOURCES.map((Ic, i) => (
                <Icon key={i} as={Ic} x={sysX + 70 + i * 24} y={r.y - 6} size={18} tone={C.ink2} weight="regular" />
              ))}
            </g>
          )}
          {[0, 1, 2].map((k) => (
            <Person key={k} x={sysX + 210 + k * 34} y={r.y + 10} s={1.1} tone={r.lit ? C.accent : C.ink} />
          ))}
        </g>
      ))}

      <line x1={470} y1={0} x2={470} y2={210} stroke={C.rule} />

      <text x={500} y={18} fill={C.ink} style={LB}>
        representational harm
      </text>
      <text x={500} y={50} fill={C.ink2} style={L}>
        people who work as doctors
      </text>
      {pop.map((c, i) => (
        <Person key={i} x={516 + i * 34} y={82} s={1.1} tone={c ? C.accent : C.ink} />
      ))}
      <text x={500} y={130} fill={C.ink2} style={L}>
        {"images generated for “a doctor”"}
      </text>
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={500 + i * 58} y={142} width={50} height={56} rx={3} fill={C.paper} stroke={C.ink3} strokeWidth={1.1} />
          <Person x={525 + i * 58} y={176} s={1.25} tone={C.ink} />
        </g>
      ))}
      <text x={856} y={176} fill={C.accent} style={LA}>
        community
      </text>
      <text x={856} y={192} fill={C.accent} style={LA}>
        erased
      </text>

      <path d="M720 212V230H245V190" fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="5 4" />
      <Arrow x1={245} y1={200} x2={245} y2={186} tone={C.accent} width={1.5} />
      <text x={482} y={252} textAnchor="middle" fill={C.accent} style={LA}>
        future allocative inequities
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Historical, Representation, and Measurement Bias
   -------------------------------------------------------------------------- */

export function BiasPipeline() {
  // a 4 × 3 street grid where one redlined district holds few loans
  const blocks = Array.from({ length: 12 }, (_, i) => ({ c: i % 4, r: Math.floor(i / 4) }));
  const redlined = (c: number, r: number) => c >= 2 && r >= 1;
  const sample = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
  const popl = Array.from({ length: 18 }, (_, i) => (i % 3 === 1 ? 1 : 0));
  return (
    <Plate
      w={960}
      h={270}
      title="Three places bias enters a training dataset. First, historical bias in society: a street map where past loans are dense in most districts but sparse in one redlined district. Second, representation bias in sampling: a population where one person in three belongs to a community shrinks to a sample with one such person in ten. Third, measurement bias in proxy labels: the training label records the medical bill instead of how sick the patient is. All three feed into one training table"
    >
      {/* stage titles */}
      {[
        { x: 0, t: "historical bias", s: "in society" },
        { x: 250, t: "representation bias", s: "in sampling" },
        { x: 500, t: "measurement bias", s: "in proxy labels" },
      ].map((s) => (
        <g key={s.t}>
          <text x={s.x} y={18} fill={C.ink} style={LB}>
            {s.t}
          </text>
          <text x={s.x} y={36} fill={C.ink3} style={LS}>
            {s.s}
          </text>
        </g>
      ))}

      {/* 1: redlined map with past loans */}
      {blocks.map(({ c, r }) => {
        const x = c * 50;
        const y = 54 + r * 50;
        const red = redlined(c, r);
        const loans = red ? 1 : 5;
        return (
          <g key={`${c}-${r}`}>
            <rect x={x} y={y} width={44} height={44} fill={red ? C.tint : C.paper} stroke={red ? C.accent : C.ink3} strokeWidth={1.1} />
            {Array.from({ length: loans }, (_, k) => (
              <Icon
                key={k}
                as={CurrencyDollar}
                x={red ? x + 22 : [11, 33, 22, 11, 33][k]! + x}
                y={red ? y + 22 : [11, 11, 22, 33, 33][k]! + y}
                size={13}
                tone={red ? C.accent : C.ink2}
                weight="regular"
              />
            ))}
          </g>
        );
      })}
      <text x={0} y={222} fill={C.ink3} style={LS}>
        past loans by district
      </text>

      {/* 2: population to sample */}
      {popl.map((c, i) => (
        <Person key={i} x={262 + (i % 6) * 30} y={68 + Math.floor(i / 6) * 32} s={0.85} tone={c ? C.accent : C.ink} />
      ))}
      <Arrow x1={340} y1={160} x2={340} y2={180} />
      {sample.map((c, i) => (
        <Person key={i} x={262 + (i % 5) * 30} y={200 + Math.floor(i / 5) * 30} s={0.8} tone={c ? C.accent : C.ink} />
      ))}
      <text x={428} y={58} fill={C.ink3} style={LS}>
        population
      </text>
      <text x={420} y={204} fill={C.ink3} style={LS}>
        sample
      </text>

      {/* 3: true construct versus proxy */}
      <Icon as={Heartbeat} x={522} y={86} size={34} tone={C.ink3} />
      <text x={546} y={82} fill={C.ink3} style={L}>
        how sick the
      </text>
      <text x={546} y={98} fill={C.ink3} style={L}>
        patient is
      </text>
      <path d="M522 108V180" stroke={C.ink3} strokeWidth={1.3} strokeDasharray="4 4" />
      <text x={532} y={150} fill={C.ink3} style={LS}>
        not recorded
      </text>
      <Icon as={CurrencyDollar} x={522} y={200} size={34} tone={C.accent} />
      <text x={546} y={196} fill={C.accent} style={LA}>
        medical bill
      </text>
      <text x={546} y={212} fill={C.accent} style={LA}>
        used as the label
      </text>

      {/* the pipeline into the training table */}
      <Arrow x1={208} y1={130} x2={244} y2={130} />
      <Arrow x1={446} y1={130} x2={490} y2={130} />
      <Arrow x1={680} y1={148} x2={760} y2={148} />
      <g>
        <rect x={770} y={60} width={188} height={198} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
        <rect x={770} y={60} width={188} height={24} fill={C.grey} stroke={C.ink} strokeWidth={1.3} />
        {[1, 2, 3].map((k) => (
          <line key={k} x1={770 + k * 47.5} y1={60} x2={770 + k * 47.5} y2={258} stroke={C.ink3} strokeWidth={0.8} />
        ))}
        <rect x={912.5} y={60} width={45.5} height={198} fill={C.tint} stroke={C.accent} strokeWidth={1.3} />
        {Array.from({ length: 7 }, (_, k) => (
          <line key={k} x1={770} y1={110 + k * 21} x2={960} y2={110 + k * 21} stroke={C.rule} />
        ))}
      </g>
      <text x={865} y={52} textAnchor="middle" fill={C.ink} style={L}>
        training dataset
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Case Study: Measurement Bias in Healthcare Risk Algorithms
   Real data: Obermeyer, Powers, Vogeli and Mullainathan (2019), Science 366.
   At the 97th percentile of risk score, Black patients had 4.8 active chronic
   conditions against 3.8 for white patients (26.3 percent more). Predicting
   illness instead of cost raises the Black share of auto-enrolled patients
   from 17.7 to 46.5 percent.
   -------------------------------------------------------------------------- */

export function CostProxy() {
  const b0 = 222;
  const per = 30; // px per chronic condition
  const sx0 = 560;
  const sw = 360;
  return (
    <Plate
      w={960}
      h={270}
      title="Real data from Obermeyer and colleagues, 2019. Left: patients with the same algorithm risk score, at the 97th percentile where enrollment is automatic. White patients average 3.8 active chronic conditions and Black patients 4.8, which is 26.3 percent more. Right: the share of Black patients among those enrolled in extra care is 17.7 percent when the model predicts cost, and 46.5 percent when it predicts chronic illness"
    >
      <text x={0} y={18} fill={C.ink} style={LB}>
        same risk score, 97th percentile
      </text>
      <text x={0} y={36} fill={C.ink3} style={LS}>
        active chronic conditions per patient
      </text>
      <line x1={40} y1={b0} x2={420} y2={b0} stroke={C.ink} />
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={40} y1={b0 - v * per} x2={420} y2={b0 - v * per} stroke={C.rule} opacity={v ? 1 : 0} />
          <text x={30} y={b0 - v * per + 4} textAnchor="end" fill={C.ink3} style={LS}>
            {v}
          </text>
        </g>
      ))}
      {[
        { x: 90, v: 3.8, t: "white patients", lit: false },
        { x: 250, v: 4.8, t: "Black patients", lit: true },
      ].map((b) => (
        <g key={b.t}>
          <rect
            x={b.x}
            y={r2(b0 - b.v * per)}
            width={110}
            height={r2(b.v * per)}
            fill={b.lit ? C.tint : C.grey}
            stroke={b.lit ? C.accent : C.ink3}
            strokeWidth={1.3}
          />
          <text x={b.x + 55} y={r2(b0 - b.v * per - 8)} textAnchor="middle" fill={b.lit ? C.accent : C.ink} style={LB}>
            {b.v.toFixed(1)}
          </text>
          <text x={b.x + 55} y={b0 + 20} textAnchor="middle" fill={C.ink2} style={L}>
            {b.t}
          </text>
        </g>
      ))}
      <text x={420} y={r2(b0 - 4.8 * per + 18)} textAnchor="end" fill={C.accent} style={LA}>
        +26.3%
      </text>

      <line x1={480} y1={0} x2={480} y2={230} stroke={C.rule} />

      <text x={sx0 - 60} y={18} fill={C.ink} style={LB}>
        Black patients among those enrolled in extra care
      </text>
      {[
        { y: 70, v: 17.7, t: "label: future cost", lit: false },
        { y: 150, v: 46.5, t: "label: chronic illness", lit: true },
      ].map((b) => (
        <g key={b.t}>
          <text x={sx0 - 60} y={b.y - 10} fill={b.lit ? C.accent : C.ink2} style={b.lit ? LA : L}>
            {b.t}
          </text>
          <rect x={sx0 - 60} y={b.y} width={sw} height={30} fill={C.paper} stroke={C.rule} />
          <rect
            x={sx0 - 60}
            y={b.y}
            width={r2((b.v / 100) * sw)}
            height={30}
            fill={b.lit ? C.tint : C.grey}
            stroke={b.lit ? C.accent : C.ink3}
            strokeWidth={1.3}
          />
          <text x={r2(sx0 - 60 + (b.v / 100) * sw + 10)} y={b.y + 20} fill={b.lit ? C.accent : C.ink} style={LB}>
            {`${b.v}%`}
          </text>
        </g>
      ))}
      <text x={sx0 - 60 + sw} y={212} textAnchor="end" fill={C.ink3} style={LS}>
        100%
      </text>
      <text x={0} y={262} fill={C.ink3} style={LS}>
        Obermeyer, Powers, Vogeli and Mullainathan (2019), Science
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Statistical Definitions of Fairness and Their Trade-Offs
   -------------------------------------------------------------------------- */

/** Standard normal CDF (Abramowitz and Stegun 7.1.26). */
function phi(x: number) {
  const t = 1 / (1 + 0.3275911 * (Math.abs(x) / Math.SQRT2));
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-(x * x) / 2);
  return x >= 0 ? 0.5 + y / 2 : 0.5 - y / 2;
}

/** Inverse of phi by bisection. */
function invPhi(p: number) {
  let lo = -6;
  let hi = 6;
  for (let k = 0; k < 50; k++) {
    const m = (lo + hi) / 2;
    if (phi(m) < p) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

/** 100 applicants: `q` who repay score around +0.9, the rest around −0.9. */
function applicants(q: number) {
  const out: { s: number; ok: boolean }[] = [];
  for (let i = 0; i < q; i++) out.push({ s: r2(0.9 + invPhi((i + 0.5) / q)), ok: true });
  for (let i = 0; i < 100 - q; i++) out.push({ s: r2(-0.9 + invPhi((i + 0.5) / (100 - q))), ok: false });
  return out;
}

const GROUPS = [
  { id: "A", q: 60, people: applicants(60) },
  { id: "B", q: 30, people: applicants(30) },
];

function rates(people: { s: number; ok: boolean }[], t: number) {
  const yes = people.filter((p) => p.s >= t);
  const q = people.filter((p) => p.ok).length;
  const tp = yes.filter((p) => p.ok).length;
  return {
    approve: yes.length,
    tpr: (tp / q) * 100,
    ppv: yes.length ? (tp / yes.length) * 100 : NaN,
  };
}

export function FairnessLab() {
  const [ta, setTa] = useState(0);
  const [tb, setTb] = useState(0);
  const th = [ta, tb];
  const sx0 = 50;
  const sw = 460;
  const smin = -3.4;
  const smax = 3.4;
  const X = (s: number) => r2(sx0 + ((s - smin) / (smax - smin)) * sw);
  const BIN = 0.34;
  const R = GROUPS.map((g, i) => rates(g.people, th[i]));
  const crit = [
    { t: "demographic parity", s: "share approved", k: "approve" as const },
    { t: "equal opportunity", s: "share of repayers approved", k: "tpr" as const },
    { t: "predictive parity", s: "share of approved who repay", k: "ppv" as const },
  ];
  const fmt = (v: number) => (Number.isNaN(v) ? "n/a" : `${Math.round(v)}%`);

  return (
    <Plate
      w={960}
      h={300}
      title={`Interactive: drag the approval threshold for each group. Group A has 60 of 100 applicants who would repay, group B 30 of 100. With thresholds at ${ta.toFixed(1)} and ${tb.toFixed(1)}, the approval rates are ${fmt(R[0].approve)} and ${fmt(R[1].approve)}, the share of repayers approved is ${fmt(R[0].tpr)} and ${fmt(R[1].tpr)}, and the share of approved applicants who repay is ${fmt(R[0].ppv)} and ${fmt(R[1].ppv)}. Because the groups' repayment rates differ, no pair of thresholds makes all three equal`}
    >
      {/* key */}
      <circle cx={sx0 + 4} cy={12} r={3.6} fill={C.ink} />
      <text x={sx0 + 14} y={16} fill={C.ink2} style={LS}>
        would repay
      </text>
      <circle cx={sx0 + 104} cy={12} r={3.6} fill={C.paper} stroke={C.ink} strokeWidth={1.1} />
      <text x={sx0 + 114} y={16} fill={C.ink2} style={LS}>
        would default
      </text>
      <text x={sx0 + sw} y={16} textAnchor="end" fill={C.ink3} style={LS}>
        {"model score → approved right of the line"}
      </text>

      {GROUPS.map((g, gi) => {
        const base = 104 + gi * 138;
        const stacks = new Map<number, number>();
        const sorted = [...g.people].sort((a, b) => Number(b.ok) - Number(a.ok));
        return (
          <g key={g.id}>
            <text x={0} y={base - 70} fill={C.ink} style={LB}>
              {`group ${g.id}`}
            </text>
            <text x={0} y={base - 54} fill={C.ink3} style={LS}>
              {`${g.q} of 100 repay`}
            </text>
            <line x1={sx0} y1={base + 5} x2={sx0 + sw} y2={base + 5} stroke={C.ink3} />
            {sorted.map((p, i) => {
              const b = Math.floor((p.s - smin) / BIN);
              const k = stacks.get(b) ?? 0;
              stacks.set(b, k + 1);
              const cx = X(smin + (b + 0.5) * BIN);
              const yes = p.s >= th[gi];
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={r2(base - k * 6.6)}
                  r={2.9}
                  fill={p.ok ? (yes ? C.accent : C.ink3) : C.paper}
                  stroke={yes ? C.accent : C.ink3}
                  strokeWidth={1.1}
                />
              );
            })}
            <line x1={X(th[gi])} y1={base - 74} x2={X(th[gi])} y2={base + 10} stroke={C.accent} strokeWidth={1.8} />
            <Knob
              x={sx0}
              y={base + 25}
              len={sw}
              value={th[gi]}
              min={smin}
              max={smax}
              step={0.1}
              onChange={gi ? setTb : setTa}
              label={`Approval threshold for group ${g.id}`}
            />
          </g>
        );
      })}

      {/* the three criteria */}
      <line x1={560} y1={0} x2={560} y2={300} stroke={C.rule} />
      {crit.map((c, ci) => {
        const y0 = 12 + ci * 98;
        const a = R[0][c.k];
        const b = R[1][c.k];
        const gap = Math.abs(a - b);
        const met = !Number.isNaN(gap) && gap <= 2;
        return (
          <g key={c.t}>
            <text x={590} y={y0 + 4} fill={C.ink} style={LB}>
              {c.t}
            </text>
            <text x={590} y={y0 + 21} fill={C.ink3} style={LS}>
              {c.s}
            </text>
            {[a, b].map((v, k) => (
              <g key={k}>
                <text x={590} y={y0 + 44 + k * 22} fill={C.ink2} style={LS}>
                  {k ? "B" : "A"}
                </text>
                <rect x={606} y={y0 + 33 + k * 22} width={220} height={14} fill={C.paper} stroke={C.rule} />
                <rect
                  x={606}
                  y={y0 + 33 + k * 22}
                  width={r2(Number.isNaN(v) ? 0 : (v / 100) * 220)}
                  height={14}
                  fill={met ? C.tint : C.grey}
                  stroke={met ? C.accent : C.ink3}
                />
                <text x={834} y={y0 + 45 + k * 22} fill={C.ink} style={LS}>
                  {fmt(v)}
                </text>
              </g>
            ))}
            {met ? (
              <g>
                <Icon as={CheckCircle} x={890} y={y0 + 50} size={20} tone={C.accent} weight="fill" />
                <text x={904} y={y0 + 55} fill={C.accent} style={LA}>
                  equal
                </text>
              </g>
            ) : (
              <text x={884} y={y0 + 55} fill={C.ink3} style={LS}>
                {Number.isNaN(gap) ? "" : `gap ${Math.round(gap)} pts`}
              </text>
            )}
          </g>
        );
      })}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Embedding EDII Across the AI Lifecycle
   -------------------------------------------------------------------------- */

const STAGES = [
  { t: ["problem", "formulation"], ic: Lightbulb },
  { t: ["data", "curation"], ic: Database },
  { t: ["disaggregated", "testing"], ic: ChartBar },
  { t: ["accessible", "deployment"], ic: Wheelchair },
  { t: ["community", "recourse"], ic: HandHeart },
];

export function EdiiRing() {
  const cx = 260;
  const cy = 230;
  const R = 150;
  const pos = STAGES.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / STAGES.length;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)] as [number, number];
  });
  return (
    <Plate
      w={520}
      h={405}
      title="A lifecycle ring of five stages: problem formulation, data curation, disaggregated testing, accessible deployment and community recourse, which loops back to problem formulation. Equity, Diversity, Inclusion and Indigeneity sit at the centre and apply at every stage"
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.ink3} strokeWidth={1.3} />
      {pos.map((_, i) => {
        const a0 = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / STAGES.length;
        const a1 = a0 + 0.06;
        return (
          <Arrow
            key={i}
            x1={cx + R * Math.cos(a0 - 0.08)}
            y1={cy + R * Math.sin(a0 - 0.08)}
            x2={cx + R * Math.cos(a1)}
            y2={cy + R * Math.sin(a1)}
            tone={C.ink3}
            width={1.3}
          />
        );
      })}
      {pos.map(([x, y], i) => {
        const s = STAGES[i];
        const right = x > cx + 10;
        const left = x < cx - 10;
        const below = y > cy;
        return (
          <g key={i}>
            <circle cx={r2(x)} cy={r2(y)} r={28} fill={C.paper} stroke={C.ink} strokeWidth={1.4} />
            <Icon as={s.ic} x={x} y={y} size={30} tone={C.ink} />
            <Lines
              x={r2(right ? x + 36 : left ? x - 36 : x)}
              y={r2(left || right ? y + (below ? 18 : -4) : y - 54)}
              lines={s.t}
              anchor={right ? "start" : left ? "end" : "middle"}
              style={L}
              fill={C.ink2}
              dy={16}
            />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={78} fill={C.tint} stroke={C.accent} strokeWidth={1.4} />
      <Lines x={cx} y={cy - 28} lines={["Equity", "Diversity", "Inclusion", "Indigeneity"]} anchor="middle" style={LA} fill={C.accent} dy={20} />
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Indigenous Data Sovereignty and Collective Rights
   -------------------------------------------------------------------------- */

export function ConsentModels() {
  const ccx = 640;
  const ccy = 116;
  return (
    <Plate
      w={960}
      h={238}
      title="Two consent models. On the left, individual click-wrap consent: one person ticks I agree on a phone, and data flow one way to a company. On the right, collective governance: a Nation's community surrounds its land, language and population records, an outside company reaches them only through a data agreement the community governs, and benefit flows back to the community"
    >
      <text x={0} y={18} fill={C.ink} style={LB}>
        individual click-wrap consent
      </text>
      <Person x={40} y={136} s={2.2} tone={C.ink} />
      <rect x={100} y={70} width={78} height={130} rx={10} fill={C.paper} stroke={C.ink} strokeWidth={1.6} />
      <rect x={113} y={126} width={14} height={14} rx={2} fill={C.ink} />
      <path d="M116 133l3 3l5-6" stroke={C.paper} strokeWidth={1.6} fill="none" />
      <text x={133} y={138} fill={C.ink} style={label(12, 600)}>
        I agree
      </text>
      {[0, 1, 2].map((k) => (
        <rect key={k} x={113} y={88 + k * 10} width={[52, 44, 50][k]} height={3} rx={1.5} fill={C.ink3} opacity={0.5} />
      ))}
      <Arrow x1={190} y1={136} x2={318} y2={136} />
      <text x={196} y={124} fill={C.ink3} style={LS}>
        data flow one way
      </text>
      <Icon as={Buildings} x={360} y={132} size={64} tone={C.ink2} />

      <line x1={440} y1={0} x2={440} y2={230} stroke={C.rule} />

      <text x={470} y={18} fill={C.ink} style={LB}>
        collective governance
      </text>
      {Array.from({ length: 11 }, (_, i) => {
        const a = ((i + 1) / 12) * 2 * Math.PI;
        return <Person key={i} x={r2(ccx + 122 * Math.cos(a))} y={r2(ccy + 84 * Math.sin(a) + 6)} s={0.95} tone={C.accent} />;
      })}
      <ellipse cx={ccx} cy={ccy} rx={96} ry={60} fill={C.tint} stroke={C.accent} strokeWidth={1.3} />
      <Icon as={Mountains} x={ccx - 44} y={ccy - 16} size={34} tone={C.ink2} />
      <Icon as={Tree} x={ccx} y={ccy - 26} size={30} tone={C.ink2} />
      <Icon as={ChatCircleText} x={ccx + 44} y={ccy - 14} size={30} tone={C.ink2} />
      <Icon as={Files} x={ccx} y={ccy + 24} size={30} tone={C.ink2} />

      {/* the company reaches the data only through the agreement */}
      <Icon as={Buildings} x={912} y={128} size={60} tone={C.ink2} />
      <Arrow x1={878} y1={128} x2={830} y2={128} tone={C.ink3} />
      <Page x={790} y={106} w={34} h={44} tone={C.accent} fill={C.tint} />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={797} y1={122 + k * 8} x2={816} y2={122 + k * 8} stroke={C.accent} strokeWidth={1} />
      ))}
      <Arrow x1={786} y1={128} x2={742} y2={128} tone={C.ink3} />
      <text x={807} y={172} textAnchor="middle" fill={C.ink3} style={LS}>
        data agreement
      </text>
      <path d={`M912 148Q912 214 ${ccx + 40} 206`} fill="none" stroke={C.accent} strokeWidth={1.5} />
      <Arrow x1={ccx + 60} y1={208} x2={ccx + 40} y2={206} tone={C.accent} width={1.5} />
      <text x={790} y={230} fill={C.accent} style={LA}>
        community benefit
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   The First Nations Principles of OCAP
   -------------------------------------------------------------------------- */

const PILLARS = [
  { t: "Ownership", ic: UsersThree, sub: ["collective, like", "personal information"] },
  { t: "Control", ic: SlidersHorizontal, sub: ["from formulation", "to retirement"] },
  { t: "Access", ic: Key, sub: ["wherever records", "are held"] },
  { t: "Possession", ic: HardDrives, sub: ["where the data", "physically sit"] },
];

export function OcapPillars() {
  const pw = 150;
  const gap = (960 - 4 * pw) / 5;
  return (
    <Plate
      w={960}
      h={250}
      title="Four pillars holding up a Nation's data: Ownership, collective in the same way as personal information; Control, from project formulation to retirement; Access, wherever records are held; Possession, the jurisdiction where the data physically sit"
    >
      {/* the data the pillars hold up */}
      <path d="M40 46L480 8L920 46Z" fill={C.tint} stroke={C.accent} strokeWidth={1.4} strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((k) => (
        <Icon key={k} as={Files} x={400 + k * 40} y={32} size={22} tone={C.accent} weight="regular" />
      ))}
      <rect x={30} y={46} width={900} height={12} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      {PILLARS.map((p, i) => {
        const x = gap + i * (pw + gap);
        return (
          <g key={p.t}>
            <rect x={r2(x)} y={58} width={pw} height={130} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
            <Icon as={p.ic} x={x + pw / 2} y={86} size={38} tone={C.ink} />
            {i === 3 && <Icon as={MapPin} x={x + pw / 2 + 26} y={74} size={20} tone={C.accent} weight="fill" />}
            <text x={r2(x + pw / 2)} y={142} textAnchor="middle" fill={C.ink} style={LB}>
              {p.t}
            </text>
            <Lines
              x={r2(x + pw / 2)}
              y={162}
              lines={p.sub}
              anchor="middle"
              style={LS}
              fill={C.ink3}
              dy={14}
            />
          </g>
        );
      })}
      <rect x={20} y={188} width={920} height={14} fill={C.paper} stroke={C.ink} strokeWidth={1.3} />
      {Array.from({ length: 9 }, (_, i) => (
        <Person key={i} x={120 + i * 90} y={232} s={0.95} tone={C.accent} />
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Demographic Stereotyping and Cultural Alignment in LLMs
   -------------------------------------------------------------------------- */

export function NameSwap() {
  const out = (x: number, name: string, words: string[], pay: string, lit: boolean) => (
    <g>
      <Box x={x} y={150} w={300} h={110} tone={lit ? C.accent : C.ink} />
      <text x={x + 14} y={172} fill={C.ink3} style={LS}>
        {`reference letter for ${name}`}
      </text>
      <rect x={x + 14} y={182} width={200} height={4} rx={2} fill={C.ink3} opacity={0.5} />
      <text x={x + 14} y={204} fill={lit ? C.accent : C.ink} style={LA}>
        {words.join(", ")}
      </text>
      <rect x={x + 14} y={214} width={240} height={4} rx={2} fill={C.ink3} opacity={0.5} />
      <text x={x + 14} y={246} fill={C.ink2} style={L}>
        suggested starting salary
      </text>
      <text x={x + 286} y={246} textAnchor="end" fill={lit ? C.accent : C.ink} style={LB}>
        {pay}
      </text>
    </g>
  );
  return (
    <Plate
      w={960}
      h={270}
      title="A behavioral audit of one prompt. The same resume and the same request, to draft a reference letter and suggest a starting salary, are sent twice with only the name changed. For Emily the letter uses communal words, warm, helpful and caring, and suggests 68,000 dollars. For James it uses agentic words, confident, ambitious and a natural leader, and suggests 74,000 dollars"
    >
      <Box x={290} y={10} w={380} h={92} tone={C.ink} fill={C.paper} />
      <Icon as={Files} x={316} y={56} size={34} tone={C.ink3} />
      <text x={344} y={38} fill={C.ink} style={L}>
        Draft a reference letter and suggest a
      </text>
      <text x={344} y={56} fill={C.ink} style={L}>
        starting salary for
      </text>
      <rect x={458} y={43} width={88} height={18} rx={3} fill={C.tint} stroke={C.accent} />
      <text x={502} y={56} textAnchor="middle" fill={C.accent} style={LA}>
        Emily | James
      </text>
      <text x={344} y={80} fill={C.ink3} style={LS}>
        identical resume attached
      </text>

      <Arrow x1={380} y1={104} x2={250} y2={144} />
      <Arrow x1={580} y1={104} x2={710} y2={144} />
      {out(60, "Emily", ["warm", "helpful", "caring"], "$68,000", true)}
      {out(600, "James", ["confident", "ambitious", "a natural leader"], "$74,000", false)}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Counterfactual Testing and Behavioral Audits
   -------------------------------------------------------------------------- */

const RUNS = [10, 30, 100, 300, 1000, 3000];
const TRUE = [0.52, 0.46];

/** Observed approvals out of n repeated runs, from a seeded generator so every reader sees the same audit. */
function observed(n: number, p: number, seed: number) {
  let a = seed >>> 0;
  const rnd = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  let k = 0;
  for (let i = 0; i < n; i++) if (rnd() < p) k++;
  return k / n;
}

export function AuditLab() {
  const [ri, setRi] = useState(1);
  const n = RUNS[ri];
  const est = TRUE.map((p, i) => observed(n, p, 62 * 7919 + i * 104729));
  const se = est.map((p) => Math.sqrt((p * (1 - p)) / n));
  const gap = (est[0] - est[1]) * 100;
  const gse = Math.sqrt(se[0] ** 2 + se[1] ** 2) * 100;
  const lo = gap - 1.96 * gse;
  const hi = gap + 1.96 * gse;
  const found = lo > 0;
  const num = (v: number) => `${v < 0 ? "\u2212" : ""}${Math.abs(v).toFixed(1)}`;

  const px0 = 560;
  const pw = 360;
  const X = (v: number) => r2(px0 + ((v - 20) / 60) * pw);
  const names = ["Greg Baker", "Jamal Jones"];

  return (
    <Plate
      w={960}
      h={326}
      title={`Interactive: drag the number of repeated runs per name. The same loan summary, with identical income, debt and credit history, is sent to a language model with only the applicant's name changed. With ${n} runs per name, Greg Baker is approved in ${Math.round(est[0] * 100)} percent of runs and Jamal Jones in ${Math.round(est[1] * 100)} percent, a gap of ${gap.toFixed(1)} points with a 95 percent interval from ${lo.toFixed(1)} to ${hi.toFixed(1)}. ${found ? "The interval excludes zero, so the model violates invariance" : "The interval includes zero, so the audit cannot yet tell"}`}
    >
      {/* the permutation matrix */}
      <text x={130} y={18} fill={C.ink} style={L}>
        same loan summaries
      </text>
      {Array.from({ length: 5 }, (_, c) => (
        <g key={c}>
          {[0, 1].map((r) => {
            const x = 130 + c * 66;
            const y = 34 + r * 92;
            return (
              <g key={r}>
                <Page x={x} y={y} w={54} h={76} tone={C.ink3} />
                <rect x={x + 6} y={y + 8} width={34} height={9} rx={2} fill={C.tint} stroke={C.accent} strokeWidth={0.9} />
                {[0, 1, 2].map((k) => (
                  <rect key={k} x={x + 6} y={y + 28 + k * 12} width={[38, 28, 34][(k + c) % 3]} height={4} rx={2} fill={C.ink3} opacity={0.55} />
                ))}
              </g>
            );
          })}
        </g>
      ))}
      {names.map((nm, r) => (
        <text key={nm} x={120} y={78 + r * 92} textAnchor="end" fill={C.accent} style={LA}>
          {nm}
        </text>
      ))}
      <text x={130} y={226} fill={C.ink3} style={LS}>
        only the name changes, everything else is held identical
      </text>

      {/* the result */}
      <text x={px0} y={18} fill={C.ink} style={L}>
        share of runs approved
      </text>
      <line x1={px0} y1={156} x2={px0 + pw} y2={156} stroke={C.ink} />
      {[20, 40, 60, 80].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={30} x2={X(v)} y2={156} stroke={C.rule} />
          <text x={X(v)} y={174} textAnchor="middle" fill={C.ink3} style={LS}>
            {`${v}%`}
          </text>
        </g>
      ))}
      {names.map((nm, i) => {
        const y = 66 + i * 54;
        const p = est[i] * 100;
        const e = 1.96 * se[i] * 100;
        return (
          <g key={nm}>
            <text x={px0 - 10} y={y + 4} textAnchor="end" fill={C.ink2} style={LS}>
              {nm}
            </text>
            <line x1={X(Math.max(20, p - e))} y1={y} x2={X(Math.min(80, p + e))} y2={y} stroke={C.ink} strokeWidth={1.6} />
            {[Math.max(20, p - e), Math.min(80, p + e)].map((v, k) => (
              <line key={k} x1={X(v)} y1={y - 7} x2={X(v)} y2={y + 7} stroke={C.ink} strokeWidth={1.6} />
            ))}
            <circle cx={X(p)} cy={y} r={5.5} fill={C.ink} />
          </g>
        );
      })}
      <text x={px0} y={204} fill={C.ink2} style={L}>
        {`gap ${num(gap)} points, 95% interval ${num(lo)} to ${num(hi)}`}
      </text>
      <text x={px0} y={228} fill={found ? C.accent : C.ink3} style={found ? LA : L}>
        {found ? "interval excludes zero: invariance violated" : "interval includes zero: cannot tell yet"}
      </text>

      {/* the knob */}
      <text x={0} y={296} fill={C.ink} style={L}>
        repeated runs per name
      </text>
      <Knob x={180} y={292} len={500} value={ri} min={0} max={RUNS.length - 1} step={1} onChange={setRi} label="Repeated runs per name, from 10 to 3,000" />
      {RUNS.map((v, i) => (
        <text key={v} x={r2(180 + (i / (RUNS.length - 1)) * 500)} y={318} textAnchor="middle" fill={i === ri ? C.accent : C.ink3} style={i === ri ? LA : LS}>
          {v.toLocaleString("en-US")}
        </text>
      ))}
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Risk-Based AI Regulation Across Jurisdictions
   -------------------------------------------------------------------------- */

export function RiskPyramid() {
  const cx = 218;
  const top = 10;
  const base = 300;
  const hw = 210;
  const edge = (y: number) => (hw * (y - top)) / (base - top);
  const cuts = [top, 96, 176, 238, base];
  const tiers = [
    { n: ["unacceptable"], ex: [Scales], ob: "prohibited outright" },
    {
      n: ["high"],
      ex: [Briefcase, Bank, GraduationCap, HandHeart, Fingerprint, Lightning],
      ob: "conformity assessment, bias testing, human oversight, registration",
    },
    { n: ["limited", "transparency"], ex: [ChatCircleText], ob: "disclose that people are dealing with AI" },
    { n: ["minimal"], ex: [Envelope, GameController], ob: "no new obligations" },
  ];
  return (
    <Plate
      w={960}
      h={306}
      title="The four risk tiers of the European Union AI Act as a pyramid. At the narrow top, unacceptable risk such as social scoring is prohibited outright. Below it, high-risk uses in employment, credit, education, public benefits, biometric identification and critical infrastructure need conformity assessment, bias testing, human oversight and registration. Limited transparency risk, such as chatbots, must disclose that people are dealing with AI. Minimal risk, such as spam filters and games, carries no new obligations"
    >
      {tiers.map((t, i) => {
        const y0 = cuts[i];
        const y1 = cuts[i + 1];
        const mid = (y0 + y1) / 2;
        const lit = i === 0;
        return (
          <g key={t.n.join(" ")}>
            <path
              d={`M${r2(cx - edge(y0))} ${y0} L${r2(cx + edge(y0))} ${y0} L${r2(cx + edge(y1))} ${y1} L${r2(cx - edge(y1))} ${y1} Z`}
              fill={lit ? C.tint : i === 1 ? C.grey : C.paper}
              stroke={lit ? C.accent : C.ink}
              strokeWidth={1.3}
            />
            <Lines
              x={cx}
              y={r2(i === 0 ? y1 - 10 : mid + 5 - ((t.n.length - 1) * 16) / 2)}
              lines={t.n}
              anchor="middle"
              style={LB}
              fill={lit ? C.accent : C.ink}
              dy={16}
            />
            {i < 3 && <line x1={430} y1={y1} x2={960} y2={y1} stroke={C.rule} />}
            {t.ex.map((Ic, k) => (
              <Icon key={k} as={Ic} x={450 + k * 34} y={mid} size={26} tone={lit ? C.accent : C.ink2} />
            ))}
            {lit && (
              <Icon as={Prohibit} x={450} y={mid} size={34} tone={C.accent} weight="regular" />
            )}
            <Lines
              x={660}
              y={r2(mid + 5 - (i === 1 ? 8 : 0))}
              lines={i === 1 ? ["conformity assessment, bias testing,", "human oversight, registration"] : [t.ob]}
              style={lit ? LA : L}
              fill={lit ? C.accent : C.ink}
              dy={17}
            />
          </g>
        );
      })}
      <text x={450} y={r2((cuts[0] + cuts[1]) / 2 + 30)} fill={C.ink3} style={LS}>
        social scoring
      </text>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Documentation Standards: Model Cards, Datasheets, and Impact Assessments
   -------------------------------------------------------------------------- */

export function DocTrio() {
  const docs = [
    {
      x: 20,
      t: "Datasheet for Datasets",
      ic: Database,
      f: ["who funded and collected it", "who is included or missing", "how consent was obtained", "how labels were defined"],
    },
    {
      x: 340,
      t: "Model Card",
      ic: Cpu,
      f: ["intended use: marketing", "out of scope: credit, HR", "error rate by subgroup"],
    },
    {
      x: 660,
      t: "Algorithmic Impact Assessment",
      ic: Storefront,
      f: ["allocative and representational harms", "human-in-the-loop safeguards", "monitoring plan"],
    },
  ];
  return (
    <Plate
      w={960}
      h={234}
      title="Three documents follow a system from dataset to model to deployment. The Datasheet for Datasets records who collected the data, who is missing, consent and label definitions. The Model Card records the intended use, marketing, the out-of-scope uses, credit and HR, and the error rate by subgroup. The Algorithmic Impact Assessment covers harms, human safeguards and monitoring for the deployment. An attempt to reuse the marketing model for a credit decision is stopped by the out-of-scope line on its Model Card"
    >
      {docs.map((d, i) => (
        <g key={d.t}>
          <Icon as={d.ic} x={d.x + 30} y={30} size={40} tone={C.ink} />
          {i < 2 && <Arrow x1={d.x + 62} y1={30} x2={d.x + 300} y2={30} tone={C.ink3} />}
          <Page x={d.x} y={62} w={280} h={124} tone={C.ink} />
          <text x={d.x + 14} y={86} fill={C.ink} style={LB}>
            {d.t}
          </text>
          {d.f.map((f, k) => {
            const lit = i === 1 && k === 1;
            return (
              <g key={f}>
                {lit && <rect x={d.x + 8} y={94 + k * 22} width={200} height={22} rx={3} fill={C.tint} stroke={C.accent} />}
                <text x={d.x + 14} y={109 + k * 22} fill={lit ? C.accent : C.ink2} style={lit ? LA : L}>
                  {f}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      {/* subgroup error bars on the model card */}
      {[0.4, 0.55, 1].map((v, k) => (
        <rect key={k} x={550 + k * 20} y={r2(178 - v * 26)} width={14} height={r2(v * 26)} fill={C.grey} stroke={C.ink3} />
      ))}

      {/* the blocked reuse */}
      <path d="M440 186V214H600" fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="5 4" />
      <Icon as={Prohibit} x={618} y={214} size={28} tone={C.accent} weight="regular" />
      <Icon as={CreditCard} x={660} y={214} size={30} tone={C.ink3} />
      <text x={684} y={219} fill={C.ink3} style={L}>
        credit decision
      </text>
    </Plate>
  );
}
