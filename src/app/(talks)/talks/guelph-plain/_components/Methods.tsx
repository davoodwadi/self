"use client";

import React, { useMemo, useState } from "react";
import {
  Frame,
  Plate,
  INK,
  INK2,
  INK3,
  RULE2,
  PAPER,
  SIGNAL,
  COUNTER,
  SERIF,
  seeded,
  r2,
} from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/kit";
import { Person1, AiMark1 } from "@/app/(courses-mra)/courses/marketing-research-analytics/_visuals/objects";

/** A plain sentence-case label in the heading serif. */
function Label({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 15,
  halo = false,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
  /** A paper-coloured outline, so the label stays legible over bars. */
  halo?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={SERIF}
      fontSize={size}
      fill={fill}
      stroke={halo ? PAPER : undefined}
      strokeWidth={halo ? 4 : undefined}
      strokeLinejoin="round"
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

/** A normal draw from a seeded stream (Box and Muller). */
function normal(rand: () => number, mean: number, sd: number) {
  const u = Math.max(rand(), 1e-9);
  const v = rand();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Dollar axis along the bottom of a plate. */
function DollarAxis({ x0, x1, y, max, step }: { x0: number; x1: number; y: number; max: number; step: number }) {
  const px = (v: number) => r2(x0 + (v / max) * (x1 - x0));
  const ticks = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);
  return (
    <g>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={INK} strokeWidth={1.25} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={y} x2={px(t)} y2={y + 5} stroke={INK} strokeWidth={1.25} />
          <Label x={px(t)} y={y + 20} anchor="middle" fill={INK3} size={13}>
            {`$${t}`}
          </Label>
        </g>
      ))}
    </g>
  );
}

/** One turn of the transcript: who speaks, then what they say. */
function Turn({ who, children }: { who: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[4.2rem_minmax(0,1fr)] gap-x-3 border-t border-[var(--rule)] py-1.5 first:border-t-0">
      <span className="text-[12px] text-[var(--ink-3)]">{who}</span>
      <span className="text-[13px] leading-snug text-[var(--ink)]" style={{ fontFamily: SERIF }}>
        {children}
      </span>
    </div>
  );
}

/** The anchor digits, marked in the contrast colour. */
const XX = <span className="font-semibold text-[var(--counter)]">XX</span>;

/**
 * The prompt of Wadi & Fredette (2025), Figure 5, as the model saw it: a
 * system prompt, then the user turns. With an anchor, the system prompt
 * carries the Social Security Number and a purchase question asks about a
 * dollar figure equal to its last two digits (after Ariely et al., 2003).
 * Without one, the plate shows only the willingness-to-pay question.
 */
function Transcript({ anchored, product }: { anchored: boolean; product?: React.ReactNode }) {
  return (
    <div className="mb-3 border border-[var(--rule-2)] bg-[var(--paper)] px-3 py-1.5">
      <Turn who="System">
        {anchored ? (
          <>
            Your social security number is 987-65-43{XX}. Answer the following questions.
          </>
        ) : (
          <>Answer the following questions.</>
        )}
      </Turn>
      {anchored && (
        <Turn who="User">
          Product: {product}
          <br />
          Would you buy this product for a dollar figure equal to the last two digits of your social security number?
          (0: Reject / 1: Accept)
        </Turn>
      )}
      <Turn who="User">What is your dollar maximum willingness-to-pay for this product?</Turn>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Methods 2, where the variance comes from. Twenty different participants
   answer the control prompt once each, so their spread mixes differences
   between people with each person's own variability. One LLM answers the
   same prompt twenty times, so its spread is one probability distribution.
   A mechanism plate: illustrative answers around $40 (the paper's
   paper-towel mean across conditions is $37.07).
   -------------------------------------------------------------------------- */

export function PeoplePlate() {
  const x0 = 70;
  const x1 = 380;
  const max = 100;
  const bin = 5;
  const px = (v: number) => r2(x0 + (Math.min(max, Math.max(0, v)) / max) * (x1 - x0));
  const draw = (seed: number, mean: number, sd: number) => {
    const rand = seeded(seed);
    return Array.from({ length: 20 }, () => Math.round(Math.min(98, Math.max(3, normal(rand, mean, sd)))));
  };
  const people = useMemo(() => draw(12, 38, 19), []);
  const answers = useMemo(() => draw(46, 40, 17), []);
  // Stack each row in $5 bins, so every answer stays visible.
  const stack = (vals: number[]) => {
    const seen = new Map<number, number>();
    return vals.map((v) => {
      const k = Math.floor(v / bin);
      const n = seen.get(k) ?? 0;
      seen.set(k, n + 1);
      return { x: px(k * bin + bin / 2), n };
    });
  };
  const humanBase = 82;
  const llmBase = 168;
  const sorted = (v: number[]) => [...v].sort((a, b) => a - b).join(", ");
  return (
    <Plate>
      <Frame
        width={400}
        height={222}
        label={`Answers to the willingness-to-pay question. Twenty different participants answer once each: ${sorted(people)} dollars. One LLM answers the same prompt twenty times: ${sorted(answers)} dollars.`}
      >
        {stack(people).map((p, i) => (
          <Person1 key={i} x={p.x} y={r2(humanBase - p.n * 19)} k={0.5} width={1.25} />
        ))}
        <line x1={x0} y1={humanBase + 4} x2={x1} y2={humanBase + 4} stroke={RULE2} strokeWidth={0.75} />
        <AiMark1 cx={34} cy={llmBase - 14} s={30} fill={SIGNAL} />
        {stack(answers).map((p, i) => (
          <circle key={i} cx={p.x} cy={r2(llmBase - 6 - p.n * 13)} r={5.5} fill={SIGNAL} />
        ))}
        <DollarAxis x0={x0} x1={x1} y={llmBase + 4} max={max} step={25} />
        <Label x={r2((x0 + x1) / 2)} y={llmBase + 42} anchor="middle" fill={INK3} size={14}>
          Willingness to pay
        </Label>
      </Frame>
    </Plate>
  );
}

/** One choice at a time, under a plate, in sentence case. */
function Choice<T extends string>({
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
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 px-1" role="group" aria-label={label}>
      <span className="shrink-0 text-[15px] text-[var(--ink-2)]" style={{ fontFamily: SERIF }}>
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

/** A price tag shape pointing left, with its amount, tip at (x, y). */
function Tag({
  x,
  y,
  amount,
  color,
  flip = false,
}: {
  x: number;
  y: number;
  amount: string;
  color: string;
  flip?: boolean;
}) {
  const w = 40;
  const h = 20;
  if (flip) {
    return (
      <g>
        <path
          d={`M${x} ${y} L${x - 9} ${r2(y - h / 2)} H${x - w} V${r2(y + h / 2)} H${x - 9} Z`}
          fill={PAPER}
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <circle cx={x - 9} cy={y} r={2} fill={color} />
        <Label x={x - 25} y={y + 5} anchor="middle" fill={color} size={13}>
          {amount}
        </Label>
      </g>
    );
  }
  return (
    <g>
      <path
        d={`M${x} ${y} L${x + 9} ${r2(y - h / 2)} H${x + w} V${r2(y + h / 2)} H${x + 9} Z`}
        fill={PAPER}
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <circle cx={x + 9} cy={y} r={2} fill={color} />
      <Label x={x + 25} y={y + 5} anchor="middle" fill={color} size={13}>
        {amount}
      </Label>
    </g>
  );
}

/* --------------------------------------------------------------------------
   Methods 1 and 3, the anchoring test. On Methods 1 it is a static plate of
   the standard practice: one response per condition, drawn so that the
   high-anchor answer falls below the low-anchor answer. On Methods 3, with
   `sampling`, the same plate also takes 10 and 100 responses per condition,
   the Monte-Carlo framework. A mechanism
   plate: illustrative answers drawn around the condition means of Wadi &
   Fredette (2025), Table 1 ($95 anchor $77.95, $15 anchor $30.64), each
   with a coefficient of variation of 0.38, within the paper's reported range
   (up to 0.44). With one answer per condition the
   order of the two answers can flip; with more the means separate.
    Beyond one response, each mean carries its 95% confidence interval.
   -------------------------------------------------------------------------- */

type K = "1" | "10" | "100";
const MEANS = { high: 77.95, low: 30.64 };
const CV = 0.38;

function draws(seed: number, n: number) {
  const rand = seeded(seed);
  const one = (m: number) => Math.round(Math.min(139, Math.max(1, normal(rand, m, CV * m))));
  return {
    high: Array.from({ length: n }, () => one(MEANS.high)),
    low: Array.from({ length: n }, () => one(MEANS.low)),
  };
}

/** The first seed at or after `from` whose single draws reverse the anchors. */
function reversedSeed(from: number) {
  for (let s = from; s < from + 500; s++) {
    const d = draws(s * 31 + 1, 1);
    if (d.high[0] <= d.low[0]) return s;
  }
  return from;
}

export function PassAtOnePlate({ sampling = false, prompt = true }: { sampling?: boolean; prompt?: boolean }) {
  const [k, setK] = useState<K>("1");
  const seed = useMemo(() => reversedSeed(1), []);
  const n = Number(k);
  const d = useMemo(() => draws(seed * 31 + n, n), [seed, n]);
  const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
  const mHigh = mean(d.high);
  const mLow = mean(d.low);
  // 95% confidence half-width of a Monte-Carlo mean: 1.96 × SD / √K.
  const half = (v: number[], m: number) =>
    v.length < 2 ? 0 : 1.96 * Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1) / v.length);

  const x0 = 96;
  const x1 = 384;
  const max = 140;
  const bin = 10;
  const px = (v: number) => r2(x0 + (Math.min(max, Math.max(0, v)) / max) * (x1 - x0));
  const rows = [
    { id: "high" as const, base: 70, tag: "High anchor", vals: d.high, m: mHigh },
    { id: "low" as const, base: 152, tag: "Low anchor", vals: d.low, m: mLow },
  ];
  const hist = (vals: number[]) => {
    const c = Array.from({ length: max / bin }, () => 0);
    vals.forEach((v) => (c[Math.min(c.length - 1, Math.floor(v / bin))] += 1));
    return c;
  };
  const counts = rows.map((r) => hist(r.vals));
  const top = Math.max(...counts.flat(), 1);
  const barH = 48;

  return (
    <Plate>
      {prompt && <Transcript anchored product={<>one of 6 Amazon bestsellers (e.g., paper towels)</>} />}
      <Frame
        width={400}
        height={212}
        label={`Willingness to pay in the high-anchor (XX = 95) and low-anchor (XX = 15) conditions, ${n} ${n === 1 ? "response" : "responses"} per condition. Mean willingness to pay $${mHigh.toFixed(0)} under the high anchor and $${mLow.toFixed(0)} under the low anchor${n > 1 ? ", each with its 95% confidence interval" : ""}.`}
      >
        {rows.map((r, ri) => (
          <g key={r.id}>
            <Label x={6} y={r.base - 7} fill={COUNTER} size={14}>
              {r.tag}
            </Label>
            <line x1={x0} y1={r.base} x2={x1} y2={r.base} stroke={RULE2} strokeWidth={0.75} />
            {n === 1 ? (
              <g>
                <circle cx={px(r.vals[0])} cy={r.base - 12} r={8} fill={SIGNAL} />
                <Label x={px(r.vals[0])} y={r.base - 28} anchor="middle" fill={INK} size={14}>
                  {`$${r.vals[0]}`}
                </Label>
              </g>
            ) : (
              <g>
                {counts[ri].map((c, bi) =>
                  c > 0 ? (
                    <rect
                      key={bi}
                      x={r2(px(bi * bin) + 1)}
                      y={r2(r.base - (c / top) * barH)}
                      width={r2(px(bin) - px(0) - 2)}
                      height={r2((c / top) * barH)}
                      fill={SIGNAL}
                      fillOpacity={0.35}
                      stroke={SIGNAL}
                      strokeWidth={1}
                    />
                  ) : null,
                )}
                <line x1={px(r.m)} y1={r.base - barH - 6} x2={px(r.m)} y2={r.base} stroke={SIGNAL} strokeWidth={3} />
                {(() => {
                  const h = half(r.vals, r.m);
                  const y = r.base - barH - 6;
                  return (
                    <g stroke={INK} strokeWidth={1.5}>
                      <line x1={px(r.m - h)} y1={y} x2={px(r.m + h)} y2={y} />
                      <line x1={px(r.m - h)} y1={y - 5} x2={px(r.m - h)} y2={y + 5} />
                      <line x1={px(r.m + h)} y1={y - 5} x2={px(r.m + h)} y2={y + 5} />
                    </g>
                  );
                })()}
                <Label x={r2(px(r.m + half(r.vals, r.m)) + 8)} y={r.base - barH - 1} fill={SIGNAL} size={14} halo>
                  {`mean $${r.m.toFixed(0)}`}
                </Label>
              </g>
            )}
          </g>
        ))}
        <DollarAxis x0={x0} x1={x1} y={168} max={max} step={20} />
        <Label x={r2((x0 + x1) / 2)} y={204} anchor="middle" fill={INK3} size={14}>
          Willingness to pay
        </Label>
      </Frame>
      <div className="flex flex-wrap items-end gap-x-4">
        {sampling && (
          <Choice
            label="Responses per condition"
            value={k}
            onChange={setK}
            options={[
              { id: "1", label: "1 (pass@1)" },
              { id: "10", label: "10" },
              { id: "100", label: "100" },
            ]}
          />
        )}
      </div>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Methods 3, the replication result (Wadi & Fredette 2025, Table 1: OLS of
   willingness to pay on anchoring condition, 16 LLMs, 6 products, 100
   responses per condition). No anchor: intercept $46.33, 95% CI [44.01,
   48.66]. $95 anchor: +31.62 [28.33, 34.91]. $15 anchor: −15.70 [−18.98,
   −12.41]. Anchored means are the intercept plus the effect, and their
   whiskers carry the effect's interval.
   -------------------------------------------------------------------------- */

const ANCHOR_ROWS = [
  { id: "low", tag: "$15", anchor: 15, mean: 46.334 - 15.696, lo: 46.334 - 18.98, hi: 46.334 - 12.41, effect: "−$15.70" },
  { id: "none", tag: "", anchor: null, mean: 46.334, lo: 44.01, hi: 48.66, effect: "" },
  { id: "high", tag: "$95", anchor: 95, mean: 46.334 + 31.617, lo: 46.334 + 28.33, hi: 46.334 + 34.91, effect: "+$31.62" },
];

export function AnchorPullPlate() {
  const x0 = 70;
  const x1 = 384;
  const max = 100;
  const px = (v: number) => r2(x0 + (v / max) * (x1 - x0));
  const y = { low: 54, none: 104, high: 154 } as const;
  const base = px(46.334);
  return (
    <Plate>
      <Transcript
        anchored
        product={
          <>one of 6 Amazon bestsellers (coffee pods, docking station, paper towels, paperback book, weighted vest, women&apos;s shorts)</>
        }
      />
      <Frame
        width={400}
        height={238}
        label="Mean willingness to pay across 16 LLMs, 6 products and 100 responses per condition. With no anchor, $46.33 (95% CI $44.01 to $48.66). After a $15 anchor, $30.64, a change of −$15.70 (CI −$18.98 to −$12.41). After a $95 anchor, $77.95, a change of +$31.62 (CI +$28.33 to +$34.91)."
      >
        <g>
        <line x1={base} y1={30} x2={base} y2={172} stroke={RULE2} strokeWidth={1} strokeDasharray="3 4" />
        {ANCHOR_ROWS.map((r) => {
          const ry = y[r.id as keyof typeof y];
          return (
            <g key={r.id}>
              {r.anchor !== null ? (
                <Tag x={px(r.anchor)} y={ry - 26} amount={r.tag} color={COUNTER} flip={r.anchor > 50} />
              ) : (
                <Label x={16} y={ry + 5} fill={INK3} size={14}>
                  No anchor
                </Label>
              )}
              <line x1={px(r.lo)} y1={ry} x2={px(r.hi)} y2={ry} stroke={r.anchor === null ? INK : SIGNAL} strokeWidth={2} />
              <line x1={px(r.lo)} y1={ry - 6} x2={px(r.lo)} y2={ry + 6} stroke={r.anchor === null ? INK : SIGNAL} strokeWidth={2} />
              <line x1={px(r.hi)} y1={ry - 6} x2={px(r.hi)} y2={ry + 6} stroke={r.anchor === null ? INK : SIGNAL} strokeWidth={2} />
              <circle cx={px(r.mean)} cy={ry} r={6.5} fill={r.anchor === null ? INK : SIGNAL} />
              <Label
                x={px(r.mean)}
                y={ry + 24}
                anchor="middle"
                fill={r.anchor === null ? INK : SIGNAL}
                size={14}
              >
                {r.anchor === null ? `$${r.mean.toFixed(2)}` : `$${r.mean.toFixed(2)} (${r.effect})`}
              </Label>
            </g>
          );
        })}
        <DollarAxis x0={x0} x1={x1} y={190} max={max} step={25} />
        <Label x={r2((x0 + x1) / 2)} y={230} anchor="middle" fill={INK3} size={14}>
          Mean willingness to pay (95% CI)
        </Label>
        </g>
      </Frame>
    </Plate>
  );
}

/* --------------------------------------------------------------------------
   Every Token Counts, sampled vs. exact. Real data: Qwen3-32B's next-token
   probabilities for the CETSCALE item "Only those products that are
   unavailable in Canada should be imported." (Wadi, Ghodrat & Philp,
   experiment files, data/Qwen3-32B.pkl), summed over each digit's surface
   forms and renormalized over the valid digits. The sampled views draw K
   responses from that exact distribution, as Monte-Carlo text sampling
   does, so the bars carry sampling error and can miss rare answers. The
   exact view is the distribution itself, from one forward pass.
   -------------------------------------------------------------------------- */

const ETC_PMF = [0.0024, 0.0228, 0.3573, 0.3573, 0.2167, 0.0376, 0.0058];
const ETC_SYSTEM =
  "You are a consumer in a market research study. Your task is to provide answers to the questions given. Response format is 7-point Likert-type scale (Strongly agree = 7, Strongly disagree =1). Please respond with ONLY the digit of the response. Do not provide any other text, explanation, or punctuation.";
const ETC_ITEM = "Only those products that are unavailable in Canada should be imported.";

type View = "10" | "100" | "exact";

function sampleShares(k: number, seed: number) {
  const rand = seeded(seed);
  const counts = ETC_PMF.map(() => 0);
  for (let i = 0; i < k; i++) {
    let u = rand();
    let j = 0;
    while (j < ETC_PMF.length - 1 && u >= ETC_PMF[j]) {
      u -= ETC_PMF[j];
      j += 1;
    }
    counts[j] += 1;
  }
  return counts.map((c) => c / k);
}

export function ExactPlate() {
  const [view, setView] = useState<View>("10");
  const exact = view === "exact";
  const k = exact ? 1 : Number(view);
  const shares = useMemo(() => (exact ? ETC_PMF : sampleShares(k, 5 + k)), [exact, k]);

  const base = 176;
  const h = 150;
  const max = 0.6;
  const cx = (i: number) => r2(78 + i * 46);
  const py = (v: number) => r2(base - (Math.min(v, max) / max) * h);
  const pct = (v: number) => `${Math.round(v * 100)}%`;

  return (
    <Plate>
      <div className="mb-3 border border-[var(--rule-2)] bg-[var(--paper)] px-3 py-1.5">
        <Turn who="System">{ETC_SYSTEM}</Turn>
        <Turn who="User">{ETC_ITEM}</Turn>
      </div>
      <Frame
        width={400}
        height={222}
        label={`Answers to the item on a 7-point agreement scale, ${exact ? "the exact distribution from one forward pass" : `shares of ${k} sampled responses`}: ${shares
          .map((v, i) => `${i + 1}: ${pct(v)}`)
          .join(", ")}.${exact ? "" : ` The exact distribution is ${ETC_PMF.map((v, i) => `${i + 1}: ${(v * 100).toFixed(1)}%`).join(", ")}.`}`}
      >
        {[0, 0.2, 0.4, 0.6].map((t) => (
          <g key={t}>
            <line x1={50} y1={py(t)} x2={384} y2={py(t)} stroke={RULE2} strokeWidth={t === 0 ? 1.5 : 0.75} />
            <Label x={44} y={r2(py(t) + 5)} anchor="end" fill={INK3} size={13}>
              {pct(t)}
            </Label>
          </g>
        ))}
        {shares.map((v, i) => {
          const bh = r2(base - py(v));
          return (
            <g key={i}>
              {bh > 0 ? (
                <rect
                  x={r2(cx(i) - 15)}
                  y={py(v)}
                  width={30}
                  height={bh}
                  fill={exact ? SIGNAL : PAPER}
                  fillOpacity={exact ? 0.85 : 1}
                  stroke={exact ? SIGNAL : INK}
                  strokeWidth={1.25}
                />
              ) : null}
              {!exact && (
                <line
                  x1={r2(cx(i) - 20)}
                  y1={py(ETC_PMF[i])}
                  x2={r2(cx(i) + 20)}
                  y2={py(ETC_PMF[i])}
                  stroke={SIGNAL}
                  strokeWidth={3}
                />
              )}
              <Label x={cx(i)} y={base + 20} anchor="middle" fill={INK} size={14}>
                {String(i + 1)}
              </Label>
            </g>
          );
        })}
        <Label x={384} y={18} anchor="end" fill={INK3} size={14}>
          {exact ? "1 forward pass" : `${k} forward passes`}
        </Label>
        <Label x={r2(cx(0) - 15)} y={base + 42} fill={INK3} size={13}>
          Strongly disagree
        </Label>
        <Label x={r2(cx(6) + 15)} y={base + 42} anchor="end" fill={INK3} size={13}>
          Strongly agree
        </Label>
      </Frame>
      <Choice
        label="Responses"
        value={view}
        onChange={setView}
        options={[
          { id: "10", label: "10 sampled" },
          { id: "100", label: "100 sampled" },
          { id: "exact", label: "Exact" },
        ]}
      />
    </Plate>
  );
}
