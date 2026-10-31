"use client";

import React, { useState } from "react";
import { Bank, Briefcase, FirstAidKit, House, ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import {
  CENTRE_DASH,
  FigureName,
  Frame,
  LINE,
  ObliqueBox,
  PAT,
  PatentDefs,
  PatentKey,
  Slider,
  r2,
  stip,
} from "../_visuals/kit";
import { Figure, Gear, SmallModel, headAlongPath, tick } from "../_visuals/objects";

/* ==========================================================================
   WEEK 11 PLATES: PATENT DRAWING
   --------------------------------------------------------------------------
   Each plate is drawn as an invention on file: ink outlines at three weights,
   stipple tone, oblique projection (depth up and to the right), figure names
   in the body face and one examiner's red for the finding. See the course
   CLAUDE.md.

   Week cast: a statute is a bar of law in oblique projection with hairline
   text rows. An AI model is the model housing with two gears (SmallModel).
   A dataset is a drum of stacked records.
   ========================================================================== */

const ink = {
  stroke: PAT.ink,
  strokeWidth: LINE.outline,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
const hair = {
  stroke: PAT.ink,
  strokeWidth: LINE.hair,
  strokeLinecap: "round" as const,
};
const R = PAT.signal;
const G = PAT.counter;

/** Numerals or a quantity on a plate. */
function Num({
  x,
  y,
  children,
  size = 14,
  anchor = "middle",
  fill = PAT.ink,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  fill?: string;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-body)" fontSize={size} fill={fill} style={{ fontVariantNumeric: "lining-nums tabular-nums" }}>
      {children}
    </text>
  );
}

/** A statute: a bar of law with hairline text rows on its white front. */
function Statute({ id, x, y, w, h = 22 }: { id: string; x: number; y: number; w: number; h?: number }) {
  return (
    <g>
      <ObliqueBox id={id} x={x} y={y} w={w} h={h} dx={8} dy={5} />
      {[0.35, 0.65].map((f) => (
        <line key={f} x1={r2(x + 6)} y1={r2(y + h * f)} x2={r2(x + w - 6)} y2={r2(y + h * f)} {...hair} />
      ))}
    </g>
  );
}

const SECTORS = [Bank, Briefcase, FirstAidKit, House, ShoppingCart];

/**
 * Horizontal versus sectoral regulation. Five industries stand on one ground
 * line: finance, employment, healthcare, housing and consumer protection. In
 * the first figure one statute spans all five. In the second each industry
 * has its own statute and its own regulator above it.
 */
export function HorizontalSectoral() {
  const id = "w11-scope";
  const g = 186;
  const sector = (x0: number) =>
    SECTORS.map((Icon, i) => {
      const cx = x0 + 28 + i * 56;
      return (
        <g key={i}>
          <ObliqueBox id={id} x={cx - 20} y={g - 12} w={40} h={12} dx={8} dy={5} />
          <Icon x={cx - 15} y={g - 50} size={30} weight="light" color={PAT.ink} />
        </g>
      );
    });
  return (
    <Frame
      width={640}
      height={226}
      label="Patent drawing of two arrangements of AI regulation over five industries: finance, employment, healthcare, housing and consumer protection. In the first, one horizontal statute spans every industry. In the second, each industry has its own statute and its own regulator above it."
    >
      <PatentDefs id={id} />
      {/* horizontal */}
      {sector(14)}
      <Figure id={id} x={158} y={46} s={0.42} />
      <Statute id={id} x={20} y={56} w={268} />
      {SECTORS.map((_, i) => (
        <line key={i} x1={42 + i * 56} y1={80} x2={42 + i * 56} y2={g - 58} {...hair} strokeDasharray="3 3" />
      ))}
      <line x1={10} y1={g} x2={306} y2={g} {...ink} />
      <FigureName x={160} y={g + 30} size={14}>
        horizontal regulation
      </FigureName>
      {/* sectoral */}
      {sector(334)}
      {SECTORS.map((_, i) => {
        const cx = 362 + i * 56;
        return (
          <g key={i}>
            <Figure id={id} x={cx} y={46} s={0.42} />
            <Statute id={id} x={cx - 21} y={56} w={42} />
            <line x1={cx} y1={80} x2={cx} y2={g - 58} {...hair} strokeDasharray="3 3" />
          </g>
        );
      })}
      <line x1={330} y1={g} x2={630} y2={g} {...ink} />
      <FigureName x={480} y={g + 30} size={14}>
        sectoral regulation
      </FigureName>
    </Frame>
  );
}

/**
 * The four risk tiers of the EU AI Act as a stepped pyramid: unacceptable
 * risk (red) at the narrow top, then high, limited and minimal risk at the
 * broad base. Each step is read across to its example systems and its
 * obligations.
 */
export function RiskTiers() {
  const id = "w11-tiers";
  const tiers = [
    { name: "Unacceptable risk", ex: ["Social scoring", "Manipulative techniques"], ob: ["Prohibited"], red: true },
    { name: "High risk", ex: ["Credit scoring", "Recruitment"], ob: ["Conformity", "assessment"] },
    { name: "Limited risk", ex: ["Chatbots", "Synthetic media"], ob: ["Disclosure"] },
    { name: "Minimal risk", ex: ["Spam filters", "Inventory forecasting"], ob: ["No mandatory", "obligations"] },
  ];
  const top = 46;
  const rowH = 60;
  const cx = 130;
  return (
    <Frame
      width={560}
      height={300}
      label="Patent drawing of the four risk tiers of the EU AI Act as a stepped pyramid. Unacceptable risk, in red at the top: social scoring and manipulative techniques, prohibited. High risk: credit scoring and recruitment, conformity assessment. Limited risk: chatbots and synthetic media, disclosure. Minimal risk: spam filters and inventory forecasting, no mandatory obligations."
    >
      <PatentDefs id={id} />
      <PatentKey x={282} y={22} size={13} anchor="start">
        Example systems
      </PatentKey>
      <PatentKey x={440} y={22} size={13} anchor="start">
        Obligations
      </PatentKey>
      {tiers.map((t, i) => {
        const w = 118 + i * 44;
        const y = top + i * rowH;
        const c = t.red ? R : PAT.ink;
        return (
          <g key={t.name}>
            <ObliqueBox
              id={id}
              x={r2(cx - w / 2)}
              y={y + 8}
              w={w}
              h={rowH - 8}
              dx={12}
              dy={7}
              stroke={c}
              top={t.red ? stip(id, "signal") : undefined}
              side={t.red ? stip(id, "signal") : undefined}
            />
            <PatentKey x={cx} y={y + 40} size={13} fill={c}>
              {t.name}
            </PatentKey>
            <line x1={282} y1={y + 8} x2={552} y2={y + 8} {...hair} />
            {t.ex.map((e, j) => (
              <PatentKey key={e} x={282} y={y + 30 + j * 18} size={13} anchor="start">
                {e}
              </PatentKey>
            ))}
            {t.ob.map((o, j) => (
              <PatentKey key={o} x={440} y={y + 30 + j * 18} size={13} anchor="start" fill={c}>
                {o}
              </PatentKey>
            ))}
          </g>
        );
      })}
    </Frame>
  );
}

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const pow10 = (e: number) => `10${String(e)
  .split("")
  .map((d) => SUP[Number(d)])
  .join("")}`;

/**
 * The systemic-risk threshold for general-purpose AI. A model housing slides
 * along a logarithmic axis of cumulative training compute. Below 10^25 FLOP
 * it carries the obligations of every GPAI provider. Past the red threshold
 * the systemic-risk obligations switch on as well.
 */
export function ComputeThreshold() {
  const [e, setE] = useState(24);
  const id = "w11-flop";
  const x0 = 70;
  const x1 = 560;
  const X = (v: number) => r2(x0 + ((v - 21) / 6) * (x1 - x0));
  const axisY = 108;
  const systemic = e >= 25;
  const all = ["Technical documentation", "Copyright and opt-out policy", "Pre-training content summary"];
  const extra = ["Model evaluations and red-teaming", "Systemic risk assessment", "Serious incident reports", "Cybersecurity for weights"];
  const item = (x: number, y: number, text: string, on: boolean, red = false) => (
    <g key={text}>
      <rect x={x} y={y - 11} width={12} height={12} fill={PAT.paper} {...ink} stroke={red && on ? R : PAT.ink} strokeDasharray={on ? undefined : "2 2"} />
      {on ? <path d={tick(x + 6, y - 5, 5)} fill="none" {...ink} stroke={red ? R : PAT.ink} strokeWidth={LINE.bold} /> : null}
      <PatentKey x={x + 20} y={y} size={13} anchor="start" fill={on && red ? R : PAT.ink}>
        {text}
      </PatentKey>
    </g>
  );
  return (
    <div>
      <Frame
        width={600}
        height={286}
        label={`Patent drawing of a model housing on a logarithmic axis of cumulative training compute from 10 to the 21 to 10 to the 27 floating-point operations, with a red threshold at 10 to the 25. The model sits at 10 to the ${e}. ${
          systemic
            ? "It is past the threshold, so the systemic-risk obligations apply, in red, on top of the obligations for all GPAI providers."
            : "It is below the threshold, so only the obligations for all GPAI providers apply."
        }`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={axisY} x2={x1} y2={axisY} {...ink} />
        {[21, 22, 23, 24, 25, 26, 27].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={axisY} x2={X(v)} y2={axisY + 6} {...ink} />
            <Num x={X(v)} y={axisY + 24} size={14} fill={v === 25 ? R : PAT.ink}>
              {pow10(v)}
            </Num>
          </g>
        ))}
        <PatentKey x={x1} y={axisY + 44} size={12} anchor="end">
          Cumulative training compute (FLOP)
        </PatentKey>
        <line x1={X(25)} y1={22} x2={X(25)} y2={axisY + 8} stroke={R} strokeWidth={LINE.bold} />
        <PatentKey x={X(25) + 6} y={30} size={12} anchor="start" fill={R}>
          Systemic risk
        </PatentKey>
        <g style={{ transform: `translateX(${X(e) - X(24)}px)`, transition: "transform 400ms ease" }}>
          <SmallModel id={id} x={X(24) - 26} y={axisY - 50} w={46} h={42} />
          <path d={headAlongPath(X(24), axisY - 1, 0, 1, 7)} fill="none" {...ink} />
        </g>
        {/* the obligations */}
        <line x1={20} y1={172} x2={580} y2={172} {...hair} />
        <PatentKey x={30} y={196} size={13} anchor="start">
          All GPAI providers
        </PatentKey>
        {all.map((t, i) => item(30, 222 + i * 22, t, true))}
        <PatentKey x={300} y={196} size={13} anchor="start" fill={systemic ? R : PAT.ink}>
          Systemic risk
        </PatentKey>
        {extra.map((t, i) => item(300, 222 + i * 20, t, systemic, true))}
      </Frame>
      <Slider label="Cumulative training compute" value={e} min={21} max={27} onChange={setE} formatValue={(v) => `${pow10(v)} FLOP`} />
    </div>
  );
}

const euro = (v: number) => {
  if (v < 1e9) return `€${Math.round(v / 1e6)} million`;
  const b = v / 1e9;
  return `€${b >= 10 || Math.abs(b - Math.round(b)) < 0.05 ? Math.round(b) : b.toFixed(1)} billion`;
};

/**
 * The maximum EU AI Act fine against global annual turnover, on log scales.
 * For prohibited practices (red) the ceiling is €35 million or 7 percent of
 * turnover, whichever is higher. For high-risk violations it is €15 million or
 * 3 percent. Both lines are flat at the fixed sum and turn upward at €500
 * million of turnover, where the percentage takes over.
 */
export function PenaltyCeiling() {
  const [t, setT] = useState(9.5);
  const id = "w11-fine";
  const T = 10 ** t;
  const x0 = 96;
  const x1 = 560;
  const y0 = 230;
  const y1 = 30;
  const X = (lt: number) => r2(x0 + ((lt - 7) / 4) * (x1 - x0));
  const Y = (lp: number) => r2(y0 - ((lp - 7) / 3) * (y0 - y1));
  const lines = [
    { key: "Prohibited practices", fixed: 35e6, pct: 0.07, red: true },
    { key: "High-risk violations", fixed: 15e6, pct: 0.03, red: false },
  ];
  const fine = (l: (typeof lines)[number], v: number) => Math.max(l.fixed, l.pct * v);
  const path = (l: (typeof lines)[number]) =>
    Array.from({ length: 41 }, (_, i) => 7 + i * 0.1)
      .map((lt, i) => `${i ? "L" : "M"}${X(lt)} ${Y(Math.log10(fine(l, 10 ** lt)))}`)
      .join("");
  return (
    <div>
      <Frame
        width={600}
        height={286}
        label={`Patent drawing of the maximum EU AI Act fine against global annual turnover on logarithmic scales. At a turnover of ${euro(T)}, the ceiling for prohibited practices, in red, is ${euro(fine(lines[0], T))}, and for high-risk violations ${euro(fine(lines[1], T))}. Both lines stay flat at the fixed sum and turn upward at 500 million euros of turnover, where the percentage of turnover takes over.`}
      >
        <PatentDefs id={id} />
        <line x1={x0} y1={y1 - 6} x2={x0} y2={y0} {...ink} />
        <line x1={x0} y1={y0} x2={x1 + 6} y2={y0} {...ink} />
        {[7, 8, 9, 10].map((v) => (
          <g key={v}>
            <line x1={x0 - 5} y1={Y(v)} x2={x0} y2={Y(v)} {...ink} />
            <Num x={x0 - 9} y={Y(v) + 4} size={12} anchor="end">
              {euro(10 ** v).replace(" million", "M").replace(" billion", "B")}
            </Num>
          </g>
        ))}
        {[7, 8, 9, 10, 11].map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={y0} x2={X(v)} y2={y0 + 5} {...ink} />
            <Num x={X(v)} y={y0 + 19} size={12}>
              {euro(10 ** v).replace(" million", "M").replace(" billion", "B")}
            </Num>
          </g>
        ))}
        <PatentKey x={x0 - 6} y={16} size={12} anchor="start">
          Maximum fine
        </PatentKey>
        <PatentKey x={x1 + 6} y={y0 + 40} size={12} anchor="end">
          Global annual turnover
        </PatentKey>
        {lines.map((l) => (
          <path key={l.key} d={path(l)} fill="none" {...ink} stroke={l.red ? R : PAT.ink} strokeWidth={LINE.bold} />
        ))}
        <line x1={X(t)} y1={80} x2={X(t)} y2={y0} {...hair} strokeDasharray="3 3" />
        {lines.map((l, i) => {
          const v = fine(l, T);
          const c = l.red ? R : PAT.ink;
          const pct = l.pct * T > l.fixed;
          return (
            <g key={l.key}>
              <circle cx={X(t)} cy={Y(Math.log10(v))} r={4.5} fill={PAT.paper} {...ink} stroke={c} />
              <PatentKey x={x0 + 14} y={46 + i * 22} size={13} anchor="start" fill={c}>
                {`${l.key}: ${euro(v)} (${pct ? `${Math.round(l.pct * 100)}% of turnover` : "fixed sum"})`}
              </PatentKey>
            </g>
          );
        })}
      </Frame>
      <Slider label="Global annual turnover" value={t} min={7} max={11} step={0.1} onChange={setT} formatValue={(v) => euro(10 ** v)} />
    </div>
  );
}

/**
 * A Quebec Law 25 decision letter. A credit decision addressed to a resident
 * of Montréal states that it was made by automated processing, offers the
 * principal factors and parameters on request, and routes the reader, along a
 * green line, to a staff member who can review and overturn it.
 */
export function Law25Letter() {
  const id = "w11-law25";
  const px = 28;
  const pw = 270;
  const line = (y: number, text: string, size = 13, fill: string = PAT.ink) => (
    <PatentKey x={px + 18} y={y} size={size} anchor="start" fill={fill}>
      {text}
    </PatentKey>
  );
  return (
    <Frame
      width={460}
      height={330}
      label="Patent drawing of an automated credit decision letter addressed to a resident of Montréal, Québec. It states that the decision was made by automated processing, that the principal factors and parameters and the personal information used are available on request, and that the resident may submit observations to a staff member for review. A green line runs from that last block to a staff member who can overturn the decision."
    >
      <PatentDefs id={id} />
      <ObliqueBox id={id} x={px} y={20} w={pw} h={296} dx={8} dy={5} />
      <line x1={px + 18} y1={40} x2={px + 120} y2={40} {...hair} />
      <line x1={px + 18} y1={50} x2={px + 96} y2={50} {...hair} />
      {line(70, "Montréal (Québec)", 12)}
      {line(100, "Credit decision: declined", 15)}
      <line x1={px + 12} y1={114} x2={px + pw - 12} y2={114} {...hair} />
      {line(138, "This decision was made by")}
      {line(156, "automated processing.")}
      <line x1={px + 12} y1={172} x2={px + pw - 12} y2={172} {...hair} />
      {line(196, "On request: the principal factors")}
      {line(214, "and parameters, and the personal")}
      {line(232, "information used, with correction.")}
      <line x1={px + 12} y1={248} x2={px + pw - 12} y2={248} {...hair} />
      <rect x={px + 12} y={258} width={pw - 24} height={44} fill={PAT.paper} stroke={G} strokeWidth={LINE.bold} />
      {line(276, "Submit observations to a staff", 13, G)}
      {line(294, "member for review.", 13, G)}
      <path d={`M${px + pw - 12} 280H372V254`} fill="none" stroke={G} strokeWidth={LINE.outline} strokeDasharray="4 3" />
      <path d={headAlongPath(372, 250, 0, -1, 8)} fill="none" stroke={G} strokeWidth={LINE.outline} />
      <Figure id={id} x={384} y={236} s={1.4} arm="reach" flip />
      <line x1={340} y1={236} x2={440} y2={236} {...ink} />
    </Frame>
  );
}

/** A dataset as a drum of stacked records. */
function Drum({ id, cx, y, rx = 34, h = 52, red = false }: { id: string; cx: number; y: number; rx?: number; h?: number; red?: boolean }) {
  const ry = 9;
  const c = red ? R : PAT.ink;
  const o = { ...ink, stroke: c };
  return (
    <g>
      <path d={`M${cx - rx} ${y}V${y + h}A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h}V${y}`} fill={PAT.paper} {...o} />
      {[1, 2].map((k) => (
        <path key={k} d={`M${cx - rx} ${r2(y + (h * k) / 3)}A${rx} ${ry} 0 0 0 ${cx + rx} ${r2(y + (h * k) / 3)}`} fill="none" {...o} strokeWidth={LINE.hair} />
      ))}
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill={red ? stip(id, "signal") : stip(id, "light")} {...o} />
    </g>
  );
}

/**
 * Algorithmic disgorgement. An unlawfully collected dataset trains a model
 * (a centre line from drum to housing). Both drop into one shredder, and
 * strips fall from its throat: the order reaches the weights as well as the
 * data. The tainted lineage, data and model, is drawn in red.
 */
export function Disgorgement() {
  const id = "w11-disgorge";
  return (
    <Frame
      width={420}
      height={236}
      label="Patent drawing of algorithmic disgorgement. An unlawfully collected dataset, drawn as a red drum of records, trains a model housing outlined in red. Both drop into a single shredder, and shredded strips fall from its throat: the order destroys the model weights as well as the data."
    >
      <PatentDefs id={id} />
      {/* data and the model trained on it */}
      <Drum id={id} cx={70} y={26} rx={32} h={46} red />
      <line x1={110} y1={52} x2={266} y2={52} {...hair} strokeDasharray={CENTRE_DASH} />
      <path d={headAlongPath(274, 52, 1, 0, 8)} fill="none" {...hair} />
      <ObliqueBox id={id} x={282} y={22} w={68} h={58} dx={10} dy={6} stroke={R} />
      <Gear cx={304} cy={42} r={9} n={9} />
      <Gear cx={328} cy={64} r={6} n={8} phase={0.25} />
      <PatentKey x={70} y={104} size={14}>
        Unlawfully collected data
      </PatentKey>
      <PatentKey x={321} y={104} size={14}>
        Weights trained on it
      </PatentKey>
      {/* the drop */}
      <path d="M70 114C70 136 130 142 160 150" fill="none" {...hair} strokeDasharray="4 3" />
      <path d={headAlongPath(164, 152, 1, 0.45, 8)} fill="none" {...hair} />
      <path d="M321 114C321 136 268 142 240 150" fill="none" {...hair} strokeDasharray="4 3" />
      <path d={headAlongPath(236, 152, -1, 0.45, 8)} fill="none" {...hair} />
      {/* the shredder */}
      <ObliqueBox id={id} x={136} y={164} w={124} h={42} dx={14} dy={9} />
      <path d="M162 160L170 155H242L234 160Z" fill={PAT.ink} />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 150 + i * 14;
        const len = 12 + ((i * 7) % 5) * 3;
        return <path key={i} d={`M${x} 206V${206 + len}l3 3`} fill="none" {...ink} stroke={i % 3 === 1 ? R : PAT.ink} />;
      })}
    </Frame>
  );
}

/**
 * The NIST AI RMF as a mechanism: Govern is the hub gear at the centre,
 * cross-cutting everything, and Map, Measure and Manage are three segments of
 * a ring turning around it in a continuous cycle.
 */
export function RmfWheel() {
  const id = "w11-rmf";
  const cx = 200;
  const cy = 176;
  const r0 = 84;
  const r1 = 152;
  const rm = (r0 + r1) / 2;
  const deg = (d: number) => (d * Math.PI) / 180;
  const pt = (r: number, d: number) => `${r2(cx + r * Math.cos(deg(d)))} ${r2(cy + r * Math.sin(deg(d)))}`;
  const seg = (d0: number, d1: number) => `M${pt(r1, d0)}A${r1} ${r1} 0 0 1 ${pt(r1, d1)}L${pt(r0, d1)}A${r0} ${r0} 0 0 0 ${pt(r0, d0)}Z`;
  const parts = [
    { key: "Map", mid: -90 },
    { key: "Measure", mid: 30 },
    { key: "Manage", mid: 150 },
  ];
  return (
    <Frame
      width={400}
      height={352}
      label="Patent drawing of the NIST AI Risk Management Framework as a mechanism. Govern is a hub gear at the centre. Around it, a ring of three segments, Map, Measure and Manage, turns in a continuous cycle, with an arrow across each gap to the next segment."
    >
      <PatentDefs id={id} />
      {parts.map((p) => {
        const d0 = p.mid + 51;
        const d1 = p.mid + 69;
        const a = deg(d1);
        return (
          <g key={p.key}>
            <path d={seg(p.mid - 51, p.mid + 51)} fill={PAT.paper} {...ink} />
            <PatentKey x={r2(cx + rm * Math.cos(deg(p.mid)))} y={r2(cy + rm * Math.sin(deg(p.mid)) + 6)} size={17}>
              {p.key}
            </PatentKey>
            <path d={`M${pt(rm, d0)}A${rm} ${rm} 0 0 1 ${pt(rm, d1)}`} fill="none" {...ink} strokeWidth={LINE.bold} />
            <path d={headAlongPath(r2(cx + rm * Math.cos(a)), r2(cy + rm * Math.sin(a)), r2(-Math.sin(a)), r2(Math.cos(a)), 10)} fill="none" {...ink} strokeWidth={LINE.bold} />
          </g>
        );
      })}
      <Gear cx={cx} cy={cy} r={60} n={18} />
      <circle cx={cx} cy={cy} r={46} fill={PAT.paper} {...ink} />
      <circle cx={cx} cy={cy} r={42} fill="none" {...hair} />
      <PatentKey x={cx} y={cy + 6} size={18}>
        Govern
      </PatentKey>
    </Frame>
  );
}
