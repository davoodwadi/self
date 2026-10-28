import React from "react";
import { Frame, INK, INK2, INK3, RULE, RULE2, SIGNAL, LABEL, SERIF } from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";

type Row = { label: string; sub?: string; value: number; text: string; key?: boolean };

/** The plate's measure, named as the manuscript names it, in the top-left corner. */
function Measure({ x = 8, y = 16, children }: { x?: number; y?: number; children: React.ReactNode }) {
  return (
    <text x={x} y={y} fontFamily={LABEL} fontSize={13} fontWeight={600} fill={INK3}>
      {children}
    </text>
  );
}

/** Horizontal bars, one per condition. The slide's key condition is the only bar in the accent. */
function HBars({ rows, max, label, measure }: { rows: Row[]; max: number; label: string; measure: string }) {
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
      <line x1={left} x2={left} y1={top - 4} y2={H - 4} stroke={RULE2} strokeWidth={1} />
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
              <text x={left - 12} y={y + 40} textAnchor="end" fontFamily={LABEL} fontSize={12} fill={INK3}>
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
      <line x1={left} x2={W - right} y1={H - 4} y2={H - 4} stroke={RULE} strokeWidth={1} />
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
        { label: "Specific goal prompt", sub: "$0 acquisition cost", value: 0.94, text: "0.94" },
        { label: "Specific goal prompt", sub: "$10 acquisition cost", value: 0.83, text: "0.83" },
        { label: "Vague goal prompt", sub: "$0 acquisition cost", value: 0.89, text: "0.89" },
        { label: "Vague goal prompt", sub: "$10 acquisition cost", value: 0.29, text: "0.29", key: true },
      ]}
    />
  );
}

/**
 * Paper 2 (Wadi & Ma, JBR, Study 1, Gemini 3.1 Pro, manuscript-jbr.qmd,
 * tbl-role-neutral-descriptive): target choice share when the target carries
 * the "Platform sponsor" tag, by principal specification.
 */
export function SponsorBars() {
  return (
    <HBars
      label="Sponsored target choice share by principal specification (Study 1, Gemini 3.1 Pro)"
      measure="Sponsored target choice share"
      max={30}
      rows={[
        { label: "Role-neutral", value: 7.8, text: "7.8%" },
        { label: "Consumer delegation", value: 2.8, text: "2.8%" },
        { label: "Platform delegation", value: 25.0, text: "25.0%", key: true },
        { label: "Platform with", sub: "consumer beneficiary", value: 3.2, text: "3.2%" },
      ]}
    />
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
            <line x1={zero} x2={zero} y1={gy + head - 2} y2={gy + head + 2 * rowGap} stroke={INK3} strokeWidth={1} />
            <text x={8} y={gy + 18} fontFamily={SERIF} fontSize={18} fill={INK}>
              {g.label}
            </text>
            <text x={W - 8} y={gy + 17} textAnchor="end" fontFamily={LABEL} fontSize={11} fill={INK3}>
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
                  <text x={left - 12} y={y + 19} textAnchor="end" fontFamily={LABEL} fontSize={12} fontWeight={600} fill={INK}>
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
      <line x1={36} x2={W - 8} y1={y(uniform)} y2={y(uniform)} stroke={INK3} strokeWidth={1.2} strokeDasharray="5 4" />
      <text x={W - 8} y={y(uniform) - 8} textAnchor="end" fontFamily={LABEL} fontSize={12} fill={INK3}>
        uniform baseline
      </text>
      {groups.map((g, i) => {
        const x0 = gx(i);
        return (
          <g key={g.size}>
            <rect x={x0} y={y(g.off)} width={bw} height={base - y(g.off)} fill={RULE2} />
            <rect x={x0 + bw + 6} y={y(g.ft)} width={bw} height={base - y(g.ft)} fill={SIGNAL} />
            <text x={x0 + bw / 2} y={y(g.off) + 18} textAnchor="middle" fontFamily={SERIF} fontSize={15} fill={INK}>
              {g.off.toFixed(2)}
            </text>
            <text x={x0 + bw * 1.5 + 6} y={y(g.ft) - 8} textAnchor="middle" fontFamily={SERIF} fontSize={16} fontWeight={600} fill={SIGNAL}>
              {g.ft.toFixed(2)}
            </text>
            <text x={x0 + bw + 3} y={base + 24} textAnchor="middle" fontFamily={SERIF} fontSize={17} fill={INK}>
              {g.size}
            </text>
            {i === 0 ? (
              <>
                <text x={x0 + bw} y={base + 46} textAnchor="end" fontFamily={LABEL} fontSize={12} fill={INK3}>
                  off-the-shelf
                </text>
                <text x={x0 + bw + 6} y={base + 46} fontFamily={LABEL} fontSize={12} fontWeight={600} fill={SIGNAL}>
                  fine-tuned
                </text>
              </>
            ) : null}
          </g>
        );
      })}
      <line x1={36} x2={W - 8} y1={base} y2={base} stroke={RULE} strokeWidth={1} />
    </Frame>
  );
}
