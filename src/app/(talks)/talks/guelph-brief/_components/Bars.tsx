import React from "react";
import {
  Frame,
  INK,
  INK2,
  INK3,
  RULE,
  RULE2,
  SIGNAL,
  LABEL,
  SERIF,
  PAPER,
  PAPER3,
  r2,
  headAlong,
} from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";

type Row = {
  label: string;
  sub?: string;
  value: number;
  text: string;
  key?: boolean;
};

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
      fontWeight={600}
      fill={INK3}
    >
      {children}
    </text>
  );
}

/** Horizontal bars, one per condition. The slide's key condition is the only bar in the accent. */
function HBars({
  rows,
  max,
  label,
  measure,
}: {
  rows: Row[];
  max: number;
  label: string;
  measure: string;
}) {
  const W = 400;
  const left = 170;
  const right = 52;
  const rowH = 58;
  const top = 32;
  const H = top + rows.length * rowH + 4;
  const span = W - left - right;
  return (
    <Frame width={W} height={H} label={label}>
      <Measure>{measure}</Measure>
      <line
        x1={left}
        x2={left}
        y1={top - 4}
        y2={H - 4}
        stroke={RULE2}
        strokeWidth={1}
      />
      {rows.map((r, i) => {
        const y = top + i * rowH;
        const w = Math.max(2, (r.value / max) * span);
        const fill = r.key ? SIGNAL : RULE2;
        return (
          <g key={r.label + (r.sub ?? "")}>
            <text
              x={left - 12}
              y={y + (r.sub ? 22 : 30)}
              textAnchor="end"
              fontFamily={LABEL}
              fontSize={14}
              fontWeight={600}
              fill={INK}
            >
              {r.label}
            </text>
            {r.sub ? (
              <text
                x={left - 12}
                y={y + 40}
                textAnchor="end"
                fontFamily={LABEL}
                fontSize={12}
                fill={INK3}
              >
                {r.sub}
              </text>
            ) : null}
            <rect x={left} y={y + 8} width={w} height={34} fill={fill} />
            <text
              x={left + w + 8}
              y={y + 31}
              fontFamily={SERIF}
              fontSize={20}
              fill={r.key ? SIGNAL : INK2}
              fontWeight={r.key ? 600 : 400}
            >
              {r.text}
            </text>
          </g>
        );
      })}
      <line
        x1={left}
        x2={W - right}
        y1={H - 4}
        y2={H - 4}
        stroke={RULE}
        strokeWidth={1}
      />
    </Frame>
  );
}

/**
 * Paper 1 (Wadi & Ma 2026, Study 1, Table 1): choice optimality, the
 * proportion of sessions selecting the normatively optimal alternative
 * (Coffee B), by goal prompt and acquisition cost. Cross-LLM means.
 */
export function ToolLabBars() {
  return (
    <HBars
      label="Choice optimality by goal prompt and acquisition cost (Study 1)"
      measure="Choice optimality"
      max={1}
      rows={[
        {
          label: "Specific goal prompt",
          sub: "$0 acquisition cost",
          value: 0.94,
          text: "0.94",
        },
        {
          label: "Specific goal prompt",
          sub: "$10 acquisition cost",
          value: 0.83,
          text: "0.83",
        },
        {
          label: "Vague goal prompt",
          sub: "$0 acquisition cost",
          value: 0.89,
          text: "0.89",
        },
        {
          label: "Vague goal prompt",
          sub: "$10 acquisition cost",
          value: 0.29,
          text: "0.29",
          key: true,
        },
      ]}
    />
  );
}

/**
 * Paper 2 (Wadi & Ma, JBR, Study 1, Gemini 3.1 Pro, manuscript-jbr.qmd,
 * tbl-role-neutral-descriptive and fig-main-choice): target choice share in
 * the 2 × 2 of sponsorship and principal, 500 replications per cell, with
 * 95% confidence intervals (normal approximation, as in the paper's figure).
 * The sponsored target under platform delegation, the slide's finding, is
 * the only bar in the accent.
 */
const SPONSOR_CELLS = [
  { group: "Organic", principal: "Consumer", share: 53.0 },
  { group: "Organic", principal: "Platform", share: 54.2 },
  { group: "Sponsored", principal: "Consumer", share: 2.8 },
  { group: "Sponsored", principal: "Platform", share: 25.0, key: true },
];

export function SponsorBars() {
  const left = 46;
  const right = 392;
  const top = 34;
  const base = 222;
  const h = base - top;
  const py = (v: number) => r2(base - (v / 100) * h);
  const bw = 54;
  const centers = [118, 286];
  const half = (p: number) =>
    196 * Math.sqrt(((p / 100) * (1 - p / 100)) / 500);
  return (
    <Frame
      width={400}
      height={282}
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
        .join(", ")}. Whiskers show 95% confidence intervals.`}
    >
      <Measure>Target choice share</Measure>
      {[0, 20, 40, 60, 80, 100].map((t) => (
        <g key={t}>
          <line
            x1={left}
            x2={right}
            y1={py(t)}
            y2={py(t)}
            stroke={t === 0 ? INK : RULE}
            strokeWidth={t === 0 ? 1.5 : 0.75}
          />
          <text
            x={left - 6}
            y={r2(py(t) + 4)}
            textAnchor="end"
            fontFamily={LABEL}
            fontSize={12}
            fill={INK3}
          >
            {`${t}%`}
          </text>
        </g>
      ))}
      {SPONSOR_CELLS.map((c, i) => {
        const cx =
          centers[c.group === "Organic" ? 0 : 1] +
          (c.principal === "Consumer" ? -(bw / 2 + 2) : bw / 2 + 2);
        const x = r2(cx - bw / 2);
        const e = half(c.share);
        const fill = c.key
          ? SIGNAL
          : c.principal === "Consumer"
            ? PAPER3
            : INK2;
        return (
          <g key={i}>
            <rect
              x={x}
              y={py(c.share)}
              width={bw}
              height={r2(base - py(c.share))}
              fill={fill}
              stroke={c.key ? SIGNAL : INK}
              strokeWidth={1.25}
            />
            <g stroke={INK} strokeWidth={1.25}>
              <line
                x1={cx}
                x2={cx}
                y1={py(c.share + e)}
                y2={py(Math.max(0, c.share - e))}
              />
              <line
                x1={r2(cx - 5)}
                x2={r2(cx + 5)}
                y1={py(c.share + e)}
                y2={py(c.share + e)}
              />
              <line
                x1={r2(cx - 5)}
                x2={r2(cx + 5)}
                y1={py(Math.max(0, c.share - e))}
                y2={py(Math.max(0, c.share - e))}
              />
            </g>
            <text
              x={cx}
              y={r2(py(c.share + e) - 7)}
              textAnchor="middle"
              fontFamily={SERIF}
              fontSize={15}
              fill={c.key ? SIGNAL : INK}
            >
              {`${c.share.toFixed(1)}%`}
            </text>
            <text
              x={cx}
              y={base + 18}
              textAnchor="middle"
              fontFamily={LABEL}
              fontSize={12}
              fill={INK2}
            >
              {c.principal}
            </text>
          </g>
        );
      })}
      {centers.map((cx, i) => (
        <text
          key={i}
          x={cx}
          y={base + 46}
          textAnchor="middle"
          fontFamily={SERIF}
          fontSize={16}
          fill={INK}
        >
          {i === 0 ? "Organic" : "Sponsored"}
        </text>
      ))}
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
      stat: "Principal × Sponsorship β = +0.193, p < .001",
      rows: [
        { who: "Consumer delegation", v: 2.83 },
        { who: "Platform delegation", v: -1.22, key: true },
      ],
    },
    {
      label: "Context distillation",
      stat: "β = −0.001, p = .85",
      rows: [
        { who: "Consumer delegation", v: 1.47 },
        { who: "Platform delegation", v: 1.53, key: true },
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
              stroke={INK3}
              strokeWidth={1}
            />
            <text x={8} y={gy + 18} fontFamily={SERIF} fontSize={18} fill={INK}>
              {g.label}
            </text>
            <text
              x={W - 8}
              y={gy + 17}
              textAnchor="end"
              fontFamily={LABEL}
              fontSize={11}
              fill={INK3}
            >
              {g.stat}
            </text>
            {g.rows.map((r, ri) => {
              const y = gy + head + ri * rowGap;
              const w = Math.abs(r.v) * perPt;
              const x = r.v >= 0 ? zero : zero - w;
              const fill = r.key ? SIGNAL : RULE2;
              const txt = `${r.v < 0 ? "−" : ""}${Math.abs(r.v).toFixed(1)}`;
              return (
                <g key={r.who}>
                  <text
                    x={left - 12}
                    y={y + 19}
                    textAnchor="end"
                    fontFamily={LABEL}
                    fontSize={12}
                    fontWeight={600}
                    fill={INK}
                  >
                    {r.who}
                  </text>
                  <rect x={x} y={y + 2} width={w} height={barH} fill={fill} />
                  <text
                    x={r.v >= 0 ? zero + w + 8 : zero - w - 8}
                    y={y + 21}
                    textAnchor={r.v >= 0 ? "start" : "end"}
                    fontFamily={SERIF}
                    fontSize={17}
                    fill={r.key ? SIGNAL : INK2}
                    fontWeight={r.key ? 600 : 400}
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
  const H = 310;
  const base = 250;
  const top = 40;
  const y = (v: number) => base - (v / max) * (base - top);
  const bw = 42;
  const gx = (i: number) => 60 + i * 118;
  return (
    <Frame width={W} height={H} label={label}>
      <Measure>{measure}</Measure>
      <line
        x1={36}
        x2={W - 8}
        y1={y(uniform)}
        y2={y(uniform)}
        stroke={INK3}
        strokeWidth={1.2}
        strokeDasharray="5 4"
      />
      <text
        x={W - 8}
        y={y(uniform) - 8}
        textAnchor="end"
        fontFamily={LABEL}
        fontSize={12}
        fill={INK3}
      >
        uniform baseline
      </text>
      {groups.map((g, i) => {
        const x0 = gx(i);
        return (
          <g key={g.size}>
            <rect
              x={x0}
              y={y(g.off)}
              width={bw}
              height={base - y(g.off)}
              fill={RULE2}
            />
            <rect
              x={x0 + bw + 6}
              y={y(g.ft)}
              width={bw}
              height={base - y(g.ft)}
              fill={SIGNAL}
            />
            <text
              x={x0 + bw / 2}
              y={y(g.off) + 18}
              textAnchor="middle"
              fontFamily={SERIF}
              fontSize={15}
              fill={INK}
            >
              {g.off.toFixed(2)}
            </text>
            <text
              x={x0 + bw * 1.5 + 6}
              y={y(g.ft) - 8}
              textAnchor="middle"
              fontFamily={SERIF}
              fontSize={16}
              fontWeight={600}
              fill={SIGNAL}
            >
              {g.ft.toFixed(2)}
            </text>
            <text
              x={x0 + bw + 3}
              y={base + 24}
              textAnchor="middle"
              fontFamily={SERIF}
              fontSize={17}
              fill={INK}
            >
              {g.size}
            </text>
            {i === 0 ? (
              <>
                <text
                  x={x0 + bw}
                  y={base + 46}
                  textAnchor="end"
                  fontFamily={LABEL}
                  fontSize={12}
                  fill={INK3}
                >
                  off-the-shelf
                </text>
                <text
                  x={x0 + bw + 6}
                  y={base + 46}
                  fontFamily={LABEL}
                  fontSize={12}
                  fontWeight={600}
                  fill={SIGNAL}
                >
                  fine-tuned
                </text>
              </>
            ) : null}
          </g>
        );
      })}
      <line
        x1={36}
        x2={W - 8}
        y1={base}
        y2={base}
        stroke={RULE}
        strokeWidth={1}
      />
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
        fill={PAPER3}
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
        strokeWidth={color === INK ? 1.5 : 2.25}
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
            x={118}
            y={154}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize={15}
            fill={INK}
          >
            H1 (−)
          </text>
          <rect x={126} y={95} width={16} height={18} fill={PAPER} />
          <text
            x={138}
            y={110}
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize={15}
            fill={SIGNAL}
          >
            H4 (−)
          </text>
          <rect x={218} y={153} width={16} height={18} fill={PAPER} />
          <text
            x={226}
            y={168}
            textAnchor="middle"
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
            b = 4.83***
          </text>
          <rect x={126} y={95} width={16} height={18} fill={PAPER} />
          <text
            x={122}
            y={110}
            fontFamily={SERIF}
            fontSize={15}
            fill={SIGNAL}
          >
            b = −1.36***
          </text>
          <text
            x={284}
            y={72}
            fontFamily={SERIF}
            fontSize={15}
            fill={INK}
          >
            β = −1.67***
          </text>
        </>
      )}
    </Frame>
  );
}
