import React from "react";
import {
  Frame,
  INK,
  INK3,
  SIGNAL,
  LABEL,
  SERIF,
  PAPER,
  PAPER3,
  r2,
  headAlong,
} from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";

/** The plate's measure, named as the manuscript names it, in the top-left corner. */
function Measure({
  x = 8,
  y = 16,
  children,
}: {
  x?: number;
  y?: number;
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fontFamily={LABEL}
      fontSize={13}
      fill={INK}
    >
      {children}
    </text>
  );
}

/** A legend row of filled swatches, as APA figures carry one. */
function Legend({
  x,
  y,
  items,
}: {
  x: number;
  y: number;
  items: { label: string; fill: string }[];
}) {
  const starts = items.map((_, i) =>
    items
      .slice(0, i)
      .reduce((acc, it) => acc + 40 + it.label.length * 7.5, x),
  );
  return (
    <g>
      {items.map((it, i) => {
        const x0 = starts[i];
        return (
          <g key={it.label}>
            <rect
              x={x0}
              y={y - 11}
              width={14}
              height={14}
              fill={it.fill}
              stroke={INK}
              strokeWidth={1}
            />
            <text x={x0 + 20} y={y} fontFamily={LABEL} fontSize={13} fill={INK}>
              {it.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Light and dark grey fills for the two levels of a factor, in every chart. */
const LEVEL = [PAPER3, INK3];

/** A y axis with ticks, tick labels and a rotated axis title. */
function YAxis({
  x,
  ticks,
  py,
  fmt,
  title,
}: {
  x: number;
  ticks: number[];
  py: (v: number) => number;
  fmt: (v: number) => string;
  title: string;
}) {
  const yTop = py(ticks[ticks.length - 1]);
  const yBot = py(ticks[0]);
  return (
    <g>
      <line x1={x} x2={x} y1={yTop} y2={yBot} stroke={INK} strokeWidth={1.25} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x - 5} x2={x} y1={py(t)} y2={py(t)} stroke={INK} strokeWidth={1.25} />
          <text
            x={x - 9}
            y={r2(py(t) + 4)}
            textAnchor="end"
            fontFamily={LABEL}
            fontSize={12}
            fill={INK}
          >
            {fmt(t)}
          </text>
        </g>
      ))}
      <text
        transform={`translate(14 ${r2((yTop + yBot) / 2)}) rotate(-90)`}
        textAnchor="middle"
        fontFamily={LABEL}
        fontSize={13}
        fill={INK}
      >
        {title}
      </text>
    </g>
  );
}

/**
 * Paper 1 (Wadi & Ma 2026, Study 1, Table 1): choice optimality, the
 * proportion of sessions selecting the normatively optimal alternative
 * (Coffee B), by goal prompt and acquisition cost. Cross-LLM means, drawn
 * as a grouped bar chart.
 */
const TOOL_LAB = [
  { goal: "Specific", cells: [0.94, 0.83] },
  { goal: "Vague", cells: [0.89, 0.29] },
];

export function ToolLabBars() {
  const left = 62;
  const right = 390;
  const top = 46;
  const base = 230;
  const py = (v: number) => r2(base - v * (base - top));
  const bw = 52;
  const centers = [146, 306];
  return (
    <Frame
      width={400}
      height={284}
      label={`Choice optimality by goal prompt and acquisition cost (Study 1). ${TOOL_LAB.map(
        (g) => `${g.goal} goal prompt: $0 cost ${g.cells[0].toFixed(2)}, $10 cost ${g.cells[1].toFixed(2)}`,
      ).join(". ")}.`}
    >
      <Legend
        x={left + 8}
        y={18}
        items={[
          { label: "$0 acquisition cost", fill: LEVEL[0] },
          { label: "$10 acquisition cost", fill: LEVEL[1] },
        ]}
      />
      <YAxis
        x={left}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        py={py}
        fmt={(t) => t.toFixed(2)}
        title="Choice optimality"
      />
      <line x1={left} x2={right} y1={base} y2={base} stroke={INK} strokeWidth={1.25} />
      {TOOL_LAB.map((g, gi) => (
        <g key={g.goal}>
          {g.cells.map((v, ci) => {
            const x = r2(centers[gi] + (ci === 0 ? -bw - 2 : 2));
            return (
              <g key={ci}>
                <rect
                  x={x}
                  y={py(v)}
                  width={bw}
                  height={r2(base - py(v))}
                  fill={LEVEL[ci]}
                  stroke={INK}
                  strokeWidth={1}
                />
                <text
                  x={r2(x + bw / 2)}
                  y={r2(py(v) - 6)}
                  textAnchor="middle"
                  fontFamily={LABEL}
                  fontSize={13}
                  fill={INK}
                >
                  {v.toFixed(2)}
                </text>
              </g>
            );
          })}
          <text
            x={centers[gi]}
            y={base + 20}
            textAnchor="middle"
            fontFamily={LABEL}
            fontSize={13}
            fill={INK}
          >
            {g.goal}
          </text>
        </g>
      ))}
      <text
        x={r2((left + right) / 2)}
        y={base + 46}
        textAnchor="middle"
        fontFamily={LABEL}
        fontSize={13}
        fill={INK}
      >
        Goal prompt
      </text>
    </Frame>
  );
}

/**
 * Paper 2 (Wadi & Ma, JBR, Study 1, Gemini 3.1 Pro, manuscript-jbr.qmd,
 * tbl-role-neutral-descriptive and fig-main-choice): target choice share in
 * the 2 × 2 of sponsorship and principal, 500 replications per cell, with
 * 95% confidence intervals (normal approximation, as in the paper's figure).
 */
const SPONSOR_CELLS = [
  { group: "Organic", principal: "Consumer", share: 53.0 },
  { group: "Organic", principal: "Platform", share: 54.2 },
  { group: "Sponsored", principal: "Consumer", share: 2.8 },
  { group: "Sponsored", principal: "Platform", share: 25.0 },
];

export function SponsorBars() {
  const left = 62;
  const right = 390;
  const top = 46;
  const base = 230;
  const py = (v: number) => r2(base - (v / 100) * (base - top));
  const bw = 52;
  const centers = [146, 306];
  const half = (p: number) =>
    196 * Math.sqrt(((p / 100) * (1 - p / 100)) / 500);
  return (
    <Frame
      width={400}
      height={284}
      label={`Target choice share by sponsorship and principal (Study 1, Gemini 3.1 Pro, 500 replications per cell). Organic target: ${SPONSOR_CELLS.slice(
        0,
        2,
      )
        .map(
          (c) =>
            `${c.principal.toLowerCase()} delegation ${c.share.toFixed(1)}%`,
        )
        .join(", ")}. Sponsored target: ${SPONSOR_CELLS.slice(2)
        .map(
          (c) =>
            `${c.principal.toLowerCase()} delegation ${c.share.toFixed(1)}%`,
        )
        .join(", ")}. Error bars show 95% confidence intervals.`}
    >
      <Legend
        x={left + 8}
        y={18}
        items={[
          { label: "Consumer delegation", fill: LEVEL[0] },
          { label: "Platform delegation", fill: LEVEL[1] },
        ]}
      />
      <YAxis
        x={left}
        ticks={[0, 20, 40, 60, 80, 100]}
        py={py}
        fmt={(t) => `${t}%`}
        title="Target choice share"
      />
      <line x1={left} x2={right} y1={base} y2={base} stroke={INK} strokeWidth={1.25} />
      {SPONSOR_CELLS.map((c, i) => {
        const gi = c.group === "Organic" ? 0 : 1;
        const ci = c.principal === "Consumer" ? 0 : 1;
        const x = r2(centers[gi] + (ci === 0 ? -bw - 2 : 2));
        const cx = r2(x + bw / 2);
        const e = half(c.share);
        const hi = py(c.share + e);
        const lo = py(Math.max(0, c.share - e));
        return (
          <g key={i}>
            <rect
              x={x}
              y={py(c.share)}
              width={bw}
              height={r2(base - py(c.share))}
              fill={LEVEL[ci]}
              stroke={INK}
              strokeWidth={1}
            />
            <g stroke={INK} strokeWidth={1.25}>
              <line x1={cx} x2={cx} y1={hi} y2={lo} />
              <line x1={r2(cx - 5)} x2={r2(cx + 5)} y1={hi} y2={hi} />
              <line x1={r2(cx - 5)} x2={r2(cx + 5)} y1={lo} y2={lo} />
            </g>
            <text
              x={cx}
              y={r2(hi - 6)}
              textAnchor="middle"
              fontFamily={LABEL}
              fontSize={13}
              fill={INK}
            >
              {`${c.share.toFixed(1)}%`}
            </text>
          </g>
        );
      })}
      {centers.map((cx, i) => (
        <text
          key={i}
          x={cx}
          y={base + 20}
          textAnchor="middle"
          fontFamily={LABEL}
          fontSize={13}
          fill={INK}
        >
          {i === 0 ? "Organic" : "Sponsored"}
        </text>
      ))}
      <text
        x={r2((left + right) / 2)}
        y={base + 46}
        textAnchor="middle"
        fontFamily={LABEL}
        fontSize={13}
        fill={INK}
      >
        Sponsorship
      </text>
    </Frame>
  );
}

/**
 * Paper 2, preliminary (sponsorship-disclosure, studies/study3b/
 * decision-model/finetuning/train-kev-9b.ipynb): Kev 9B on the 360 held-out
 * Study 2 hotel stimuli. Sponsorship penalty = organic minus sponsored
 * P(target), in points. Baseline = released adapter, distilled = LoRA-only
 * principal-invariance context distillation on retail categories (step 180).
 */
export function DebiasBars() {
  const W = 400;
  const left = 150;
  const zero = 250;
  const perPt = 34;
  const groups = [
    {
      label: "Baseline",
      stat: (
        <>
          Principal × Sponsorship <tspan fontStyle="italic">β</tspan> = +0.193,{" "}
          <tspan fontStyle="italic">p</tspan> &lt; .001
        </>
      ),
      rows: [
        { who: "Consumer delegation", v: 2.83 },
        { who: "Platform delegation", v: -1.22 },
      ],
    },
    {
      label: "Context distillation",
      stat: (
        <>
          <tspan fontStyle="italic">β</tspan> = −0.001, <tspan fontStyle="italic">p</tspan> = .85
        </>
      ),
      rows: [
        { who: "Consumer delegation", v: 1.47 },
        { who: "Platform delegation", v: 1.53 },
      ],
    },
  ];
  const barH = 26;
  const rowGap = 34;
  const head = 30;
  const groupGap = 18;
  const top = 34;
  const H = top + groups.length * (head + 2 * rowGap) + groupGap + 8;
  return (
    <Frame
      width={W}
      height={H}
      label="Kev 9B sponsorship penalty under consumer and platform delegation on held-out Study 2 stimuli, baseline vs. principal-invariance context distillation"
    >
      <Measure>Sponsorship penalty (pp)</Measure>
      {groups.map((g, gi) => {
        const gy = top + gi * (head + 2 * rowGap + groupGap);
        return (
          <g key={g.label}>
            {/* Zero line spans only this group's bars, clear of the header and its statistic. */}
            <line
              x1={zero}
              x2={zero}
              y1={gy + head - 2}
              y2={gy + head + 2 * rowGap}
              stroke={INK}
              strokeWidth={1.25}
            />
            <text x={8} y={gy + 18} fontFamily={LABEL} fontSize={15} fontWeight={700} fill={INK}>
              {g.label}
            </text>
            <text
              x={W - 8}
              y={gy + 17}
              textAnchor="end"
              fontFamily={LABEL}
              fontSize={12}
              fill={INK}
            >
              {g.stat}
            </text>
            {g.rows.map((r, ri) => {
              const y = gy + head + ri * rowGap;
              const w = Math.abs(r.v) * perPt;
              const x = r.v >= 0 ? zero : zero - w;
              const fill = LEVEL[ri];
              const txt = `${r.v < 0 ? "−" : ""}${Math.abs(r.v).toFixed(1)}`;
              return (
                <g key={r.who}>
                  <text
                    x={left - 12}
                    y={y + 19}
                    textAnchor="end"
                    fontFamily={LABEL}
                    fontSize={13}
                    fill={INK}
                  >
                    {r.who}
                  </text>
                  <rect
                    x={x}
                    y={y + 2}
                    width={w}
                    height={barH}
                    fill={fill}
                    stroke={INK}
                    strokeWidth={1}
                  />
                  <text
                    x={r.v >= 0 ? zero + w + 8 : zero - w - 8}
                    y={y + 21}
                    textAnchor={r.v >= 0 ? "start" : "end"}
                    fontFamily={SERIF}
                    fontSize={15}
                    fill={INK}
                  >
                    {txt}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </Frame>
  );
}

export type KlGroup = { size: string; off: number; ft: number };

/**
 * KL divergence from human subpopulation response distributions, off-the-shelf
 * vs. fine-tuned Kev decision models, with the uniform baseline as a dashed line.
 */
export function KlChart({
  groups,
  uniform,
  max,
  measure,
  label,
}: {
  groups: KlGroup[];
  uniform: number;
  max: number;
  measure: string;
  label: string;
}) {
  const W = 400;
  const H = 300;
  const left = 62;
  const right = 390;
  const top = 64;
  const base = 248;
  const py = (v: number) => r2(base - (v / max) * (base - top));
  const bw = 38;
  const gx = (i: number) => r2(left + ((right - left) / groups.length) * (i + 0.5));
  const ticks = [0, 0.25, 0.5, 0.75].filter((t) => t <= max);
  return (
    <Frame width={W} height={H} label={label}>
      <Legend
        x={left + 8}
        y={18}
        items={[
          { label: "Off-the-shelf", fill: LEVEL[0] },
          { label: "Fine-tuned", fill: LEVEL[1] },
        ]}
      />
      <g stroke={INK} strokeWidth={1.25} strokeDasharray="5 4">
        <line x1={W - 88} x2={W - 64} y1={41} y2={41} />
      </g>
      <text x={W - 58} y={46} fontFamily={LABEL} fontSize={13} fill={INK}>
        Uniform
      </text>
      <text x={left} y={46} fontFamily={LABEL} fontSize={13} fill={INK}>
        {measure}
      </text>
      <YAxis x={left} ticks={ticks} py={py} fmt={(t) => t.toFixed(2)} title="" />
      <line x1={left} x2={right} y1={base} y2={base} stroke={INK} strokeWidth={1.25} />
      <line
        x1={left}
        x2={right}
        y1={py(uniform)}
        y2={py(uniform)}
        stroke={INK}
        strokeWidth={1.25}
        strokeDasharray="5 4"
      />
      {groups.map((g, i) => (
        <g key={g.size}>
          {[g.off, g.ft].map((v, ci) => {
            const x = r2(gx(i) + (ci === 0 ? -bw - 2 : 2));
            return (
              <g key={ci}>
                <rect
                  x={x}
                  y={py(v)}
                  width={bw}
                  height={r2(base - py(v))}
                  fill={LEVEL[ci]}
                  stroke={INK}
                  strokeWidth={1}
                />
                <text
                  x={r2(x + bw / 2)}
                  y={r2(py(v) + 16)}
                  textAnchor="middle"
                  fontFamily={LABEL}
                  fontSize={12}
                  fill={ci === 0 ? INK : PAPER}
                >
                  {v.toFixed(2)}
                </text>
              </g>
            );
          })}
          <text
            x={gx(i)}
            y={base + 20}
            textAnchor="middle"
            fontFamily={LABEL}
            fontSize={13}
            fill={INK}
          >
            {g.size}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/**
 * Paper 2 (Wadi & Ma, JBR, Study 1, Gemini 3.1 Pro, manuscript-jbr.qmd,
 * tbl-mediation): PROCESS Model 8. Sponsorship raises pre-choice skepticism
 * (b = 4.827, consumer delegation), platform delegation weakens that first
 * path (principal × sponsorship b = −1.361), and skepticism lowers target
 * choice (β = −1.670). The moderation of the first path, the slide's
 * finding, is the only element in the accent.
 */
function Node({
  cx,
  cy,
  w,
  lines,
}: {
  cx: number;
  cy: number;
  w: number;
  lines: string[];
}) {
  const h = lines.length > 1 ? 50 : 36;
  return (
    <g>
      <rect
        x={r2(cx - w / 2)}
        y={r2(cy - h / 2)}
        width={w}
        height={h}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.5}
      />
      {lines.map((l, i) => (
        <text
          key={l}
          x={cx}
          y={r2(cy + 5 + (i - (lines.length - 1) / 2) * 18)}
          textAnchor="middle"
          fontFamily={SERIF}
          fontSize={15}
          fill={INK}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = INK,
  dash,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dash?: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dash}
      />
      <path d={headAlong(x2, y2, x2 - x1, y2 - y1, 9)} fill={color} />
    </g>
  );
}

export function MediationPlate({ results = true }: { results?: boolean }) {
  const sk = { cx: 200, cy: 32 };
  const sp = { cx: 52, cy: 126 };
  const tc = { cx: 346, cy: 126 };
  const pr = { cx: 192, cy: 214 };
  return (
    <Frame
      width={400}
      height={246}
      label={
        results
          ? "Moderated mediation, PROCESS Model 8 (Study 1, Gemini 3.1 Pro). Sponsorship raises pre-choice skepticism, b = 4.83. Principal times sponsorship weakens that path, b = −1.36. Skepticism lowers target choice, β = −1.67. A direct path also runs from sponsorship to target choice."
          : "Conceptual model (Figure 1). Sponsorship reduces target choice (H1), attenuated by principal (H2). Pre-choice skepticism mediates the effect of sponsorship on target choice (H3), and principal moderates the first path from sponsorship to pre-choice skepticism (H4)."
      }
    >
      <Node
        cx={sk.cx}
        cy={sk.cy}
        w={136}
        lines={["Pre-choice", "skepticism"]}
      />
      <Node cx={sp.cx} cy={sp.cy} w={92} lines={["Sponsorship"]} />
      <Node cx={tc.cx} cy={tc.cy} w={100} lines={["Target choice"]} />
      <Node
        cx={pr.cx}
        cy={pr.cy}
        w={188}
        lines={["Principal", "(Platform vs. Consumer)"]}
      />
      {/* Sponsorship -> Pre-choice skepticism */}
      <Arrow x1={98} y1={114} x2={148} y2={57} />
      {/* Pre-choice skepticism -> Target choice */}
      <Arrow x1={252} y1={57} x2={296} y2={114} />
      {/* Sponsorship -> Target choice */}
      <Arrow
        x1={98}
        y1={134}
        x2={296}
        y2={134}
        color={INK}
        dash={results ? "5 4" : undefined}
      />
      {/* Principal -> first path (H4) */}
      <Arrow
        x1={158}
        y1={189}
        x2={125}
        y2={86}
        color={SIGNAL}
      />
      {/* Principal -> direct path (H2) */}
      <Arrow
        x1={226}
        y1={189}
        x2={226}
        y2={136}
        color={results ? INK : SIGNAL}
      />
      {!results ? (
        <>
          <text
            x={sk.cx}
            y={74}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize={15}
            fill={INK}
          >
            H3
          </text>
          <text
            x={260}
            y={154}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize={15}
            fill={INK}
          >
            H1 (−)
          </text>
          <text
            x={144}
            y={110}
            fontFamily={SERIF}
            fontSize={15}
            fill={SIGNAL}
          >
            H4 (−)
          </text>
          <text
            x={218}
            y={176}
            textAnchor="end"
            fontFamily={SERIF}
            fontSize={15}
            fill={SIGNAL}
          >
            H2 (+)
          </text>
        </>
      ) : (
        <>
          <text
            x={110}
            y={72}
            textAnchor="end"
            fontFamily={SERIF}
            fontSize={15}
            fill={INK}
          >
            <tspan fontStyle="italic">b</tspan> = 4.83***
          </text>
          <text
            x={144}
            y={110}
            fontFamily={SERIF}
            fontSize={15}
            fill={SIGNAL}
          >
            <tspan fontStyle="italic">b</tspan> = −1.36***
          </text>
          <text
            x={284}
            y={72}
            fontFamily={SERIF}
            fontSize={15}
            fill={INK}
          >
            <tspan fontStyle="italic">β</tspan> = −1.67***
          </text>
        </>
      )}
    </Frame>
  );
}
