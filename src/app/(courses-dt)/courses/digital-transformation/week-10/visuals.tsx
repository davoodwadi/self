"use client";

/* ==========================================================================
   Week 10, Cyber Security, Ethics and Social Issues of Digital Transformation
   (Flat Silhouette, Interactive-First)
   --------------------------------------------------------------------------
   Bespoke visual vocabulary crafted specifically for Week 10 (deliberately
   avoiding overused Shop, Doc, Coins, Person, Conversation, and generic icon
   boxes from earlier weeks):
     - Rotary Vault Tumbler & Bulkhead Gate   (Cybersecurity & Defense)
     - Forensic Loupe & Signal Waveform       (Verification vs. Hallucination)
     - Direct-Deposit Routing Switchboard     (CRA / H&R Block Case Study)
     - 8-Blade Mechanical Camera Iris         (Privacy by Design vs. Data Models)
     - Optical X-Ray Prism & Neural Monolith  (Algorithmic Bias & Explainability)
     - Cantilevered Moderation Pendulum       (Misinformation vs. Censorship)
     - Hyperboloid Cooling Towers & Racks     (AI Carbon Footprint & Costs)
     - Five-Monolith Gravitational Funnel     (Top-5 Cloud Monopoly Dynamics)
     - Three-Gear Feedback Escapement         (Weapons of Math Destruction)
     - Monitor / MiniScreen                   (Digital systems, per course style)
   Every coordinate is a literal or rounded with r2(), so server and client
   render identical markup.
   ========================================================================== */

import React, { useState } from "react";
import {
  WHITE,
  INK,
  SIGNAL,
  COUNTER,
  COUNTER_FILL,
  r2,
  Plate,
  Monitor,
  Pointer,
  Knob,
} from "../_visuals/kit";

const HEAD = { fontFamily: "var(--font-sans)", fontWeight: 700 } as const;
const BODY = { fontFamily: "var(--font-sans)", fontWeight: 600 } as const;

/* ==========================================================================
   Bespoke Silhouette Primitives for Week 10
   ========================================================================== */


/** Hyperboloid cooling tower silhouette (bottom-center at bx, by, scaled by k). */
function CoolingTowerGlyph({
  bx,
  by,
  k = 1,
  tone = INK,
  plume = false,
}: {
  bx: number;
  by: number;
  k?: number;
  tone?: string;
  plume?: boolean;
}) {
  return (
    <g transform={`translate(${bx} ${by}) scale(${k})`}>
      {plume && (
        <path
          d="M -14 -82 C -22 -96 -8 -108 0 -104 C 10 -112 24 -98 14 -82 Z"
          fill={SIGNAL}
        />
      )}
      <path
        d="M -28 0 C -18 -26 -16 -52 -20 -76 H 20 C 16 -52 18 -26 28 0 Z"
        fill={tone}
      />
      <rect x={-22} y={-76} width={44} height={5} fill={tone} />
      <path d="M -22 -12 H 22 M -18 -38 H 18 M -18 -60 H 18" stroke={WHITE} strokeWidth={2.2} />
    </g>
  );
}



/* ==========================================================================
   1. Hero: Interactive 4-Pillar Responsible Governance Compass
   Click any of the four agenda quadrants (1. Cyber Risks, 2. Ethical AI,
   3. Social Challenges, 4. Balanced Innovation) to rotate the central
   governance needle and inspect its digital screen mechanism.
   ========================================================================== */


/* ==========================================================================
   2. Review of Last Week: 5-Station Chrono-Escapement Recall Instrument
   Students click any of the 5 review questions (1st, 2nd, 3rd, 4th Industrial
   Revolutions, and Expected Changes in Industry 4.0) to inspect its visual
   escapement mechanism and key takeaways from Week 9.
   ========================================================================== */


/* ==========================================================================
   3. The Evolving Threat Landscape: Interactive Attack-Surface & Threat
   Defense Dome (made-up governance posture + real lecture vectors)
   ========================================================================== */


/* ==========================================================================
   4. Question: North America Breach Anatomy Reconstructor
   Interactive forensic board for the 3 research questions:
     1. Who caused it?
     2. What vulnerability enabled it?
     3. How could the organization/business prevented the breach?
   ========================================================================== */


/* ==========================================================================
   5. Note on Research: Interactive GenAI Hallucination & Source Scanner
   Students drag the verification loupe across articles in a "2024 in Review"
   webpage to distinguish fabricated GenAI breach claims from real filings.
   ========================================================================== */


/* ==========================================================================
   6. Case Study: Canadian Revenue Agency (CRA) Data Leak
   Interactive 3-Stage Forensic Switchboard synchronized with the slide's
   three dossier columns:
     Stage 0: 2020 H&R Block Canada credential theft -> Direct deposit switch -> $6M+ stolen
     Stage 1: CRA internal error -> 30,000+ taxpayers' SINs, tax returns & financial details exposed
     Stage 2: Ongoing investigation -> Office of the Privacy Commissioner (OPC) & Privacy Act
   ========================================================================== */

/* ==========================================================================
   7. Ethics in Digital Transformation: Interactive Privacy Aperture vs.
   Personalization Instrument
   "Instead of protecting the collected data, do not collect data at all."
   ========================================================================== */

/* ==========================================================================
   8. Ethical AI and Algorithm Governance: Interactive Bias & Explainability
   X-Ray Lens ("How is the AI model making decisions?")
   ========================================================================== */


/* ==========================================================================
   9. Truth, Trust and Digital Information Integrity: Interactive Content
   Moderation Balance Fulcrum
   "The balance between battling misinformation and censorship"
   ========================================================================== */

/* ==========================================================================
   10. Environmental Sustainability (Slide 1): Frontier AI Training Cost &
   Carbon Footprint Comparator (Real Cited Data: GPT-3, GPT-4, Gemini Ultra)
   ========================================================================== */

const FRONTIER_MODELS = [
  {
    id: "gpt3",
    name: "GPT-3 (2020)",
    minM: 2.0,
    maxM: 4.6,
    staffM: null,
    rangeText: "$2 million to $4.6 million",
    note: "Estimated training compute cost",
    towers: 1,
  },
  {
    id: "gpt4",
    name: "GPT-4 (2023)",
    minM: 41.0,
    maxM: 78.4,
    staffM: 100.0,
    rangeText: "$41 million to $78.4 million (> $100M with staff salaries)",
    note: "Sam Altman suggested total cost exceeded $100M including staff salaries",
    towers: 3,
  },
  {
    id: "gemini",
    name: "Gemini Ultra (2023)",
    minM: 30.0,
    maxM: 191.0,
    staffM: null,
    rangeText: "$30 million to $191 million (excluding staff salaries)",
    note: "Google's advanced AI model estimated training cost range",
    towers: 4,
  },
];

export function AiTrainingFootprintComparatorInteractive({
  activeModel,
  onSelectModel,
}: {
  activeModel: number;
  onSelectModel: (i: number) => void;
}) {
  const [includeSalaries, setIncludeSalaries] = useState(false);
  const current = FRONTIER_MODELS[activeModel] ?? FRONTIER_MODELS[1];

  const scaleMax = 200; // $200M axis ceiling

  return (
    <Plate
      w={800}
      h={316}
      title={`Interactive frontier AI training cost and carbon footprint comparator: GPT-3 (2020, $2M, $4.6M), GPT-4 (2023, $41M, $78.4M, exceeding $100M with staff salaries), and Gemini Ultra (2023, $30M, $191M excluding staff salaries). Currently inspecting: ${current.name}`}
    >
      {/* Top model selector tabs + GPT-4 staff salary toggle */}
      {FRONTIER_MODELS.map((m, i) => {
        const isLit = i === activeModel;
        const x = 20 + i * 186;
        return (
          <g
            key={m.id}
            role="button"
            tabIndex={0}
            aria-pressed={isLit}
            aria-label={m.name}
            onClick={() => onSelectModel(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectModel(i);
              }
            }}
            className="cursor-pointer"
          >
            <rect x={x} y={14} width={178} height={36} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
            <text x={x + 89} y={37} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
              {m.name}
            </text>
          </g>
        );
      })}

      {/* Staff salaries toggle (highlights Sam Altman >$100M quote on GPT-4) */}
      <g
        role="button"
        tabIndex={0}
        aria-pressed={includeSalaries}
        aria-label="Toggle GPT-4 staff salaries (> $100M total cost)"
        onClick={() => {
          setIncludeSalaries((s) => !s);
          onSelectModel(1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIncludeSalaries((s) => !s);
            onSelectModel(1);
          }
        }}
        className="cursor-pointer"
      >
        <rect
          x={582}
          y={14}
          width={198}
          height={36}
          fill={INK}
          fillOpacity={includeSalaries ? 0.08 : 0.03}
          stroke={INK}
          strokeWidth={includeSalaries ? 2 : 1.25}
        />
        <text
          x={681}
          y={37}
          textAnchor="middle"
          {...HEAD}
          fontSize={13}
          fill={INK}
        >
          {includeSalaries ? "+ Staff Salaries: ON (>$100M)" : "+ Staff Salaries: OFF (Click)"}
        </text>
      </g>

      {/* Left: Cooling Tower & Data Center Carbon Footprint Silhouette */}
      <rect x={20} y={64} width={224} height={176} fill={COUNTER_FILL} stroke={INK} strokeWidth={3} />
      <text x={132} y={88} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
        Carbon & Compute Scale
      </text>
      {Array.from({ length: current.towers }, (_, tIdx) => {
        const spacing = 46;
        const startX = r2(132 - ((current.towers - 1) * spacing) / 2);
        return (
          <CoolingTowerGlyph
            key={tIdx}
            bx={r2(startX + tIdx * spacing)}
            by={206}
            k={0.82}
            tone={INK}
            plume
          />
        );
      })}
      <text x={132} y={228} textAnchor="middle" {...BODY} fontSize={13} fill={INK}>
        {current.name} Footprint
      </text>

      {/* Right: Framed Monitor showing the Min-to-Max Dollar Range Bars */}
      <Monitor x={262} y={64} w={518} h={176}>
        <text x={521} y={90} textAnchor="middle" {...HEAD} fontSize={14.5} fill={INK}>
          Estimated Training Cost Range ($ Millions USD)
        </text>

        {FRONTIER_MODELS.map((m, i) => {
          const isLit = i === activeModel;
          const rowY = 108 + i * 38;
          const barX0 = 408;
          const maxTrackW = 240;
          const minW = Math.max(6, r2((m.minM / scaleMax) * maxTrackW));
          const maxW = Math.max(12, r2((m.maxM / scaleMax) * maxTrackW));
          const staffW = m.staffM ? r2((m.staffM / scaleMax) * maxTrackW) : null;

          return (
            <g
              key={m.id}
              onClick={() => onSelectModel(i)}
              className="cursor-pointer"
            >
              <text
                x={396}
                y={rowY + 16}
                textAnchor="end"
                {...HEAD}
                fontSize={13.5}
                fill={INK}
              >
                {m.name}
              </text>
              {/* Full range bar (max estimate) */}
              <rect
                x={barX0}
                y={rowY}
                width={maxW}
                height={22}
                fill={isLit ? SIGNAL : COUNTER_FILL}
                stroke={INK}
                strokeWidth={1.5}
              />
              {/* Minimum estimate solid core */}
              <rect x={barX0} y={rowY} width={minW} height={22} fill={INK} />
              {/* Optional >$100M staff salary extension for GPT-4 */}
              {includeSalaries && staffW && (
                <rect
                  x={r2(barX0 + maxW)}
                  y={rowY}
                  width={r2(staffW - maxW)}
                  height={22}
                  fill={COUNTER}
                />
              )}
              <text
                x={r2(barX0 + (includeSalaries && staffW ? staffW : maxW) + 8)}
                y={rowY + 16}
                {...BODY}
                fontSize={12.5}
                fill={INK}
              >
                {m.id === "gpt3" && "$2M: $4.6M"}
                {m.id === "gpt4" && (includeSalaries ? ">$100M" : "$41M: $78.4M")}
                {m.id === "gemini" && "$30M: $191M"}
              </text>
            </g>
          );
        })}
      </Monitor>

      {/* Bottom readout */}
      <rect x={20} y={278} width={760} height={28} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
      <text x={400} y={297} textAnchor="middle" {...BODY} fontSize={13.5} fill={INK}>
        {current.name}: {current.rangeText}
      </text>
    </Plate>
  );
}

/* ==========================================================================
   11. Environmental Sustainability (Slide 2): 2017 to 2027 Exponential AI
   Training Cost Trajectory Forecaster ($930 Transformer -> >$78M GPT-4 -> >$1B 2027)
   ========================================================================== */

export function ExponentialCostForecasterInteractive() {
  // Annual growth factor in tenths: 20 = 2.0x/yr, 25 = 2.5x/yr, 30 = 3.0x/yr
  const [factorTenths, setFactorTenths] = useState(25);
  const factor = r2(factorTenths / 10);

  // Project from 2023 ($78.4M) over 4 years to 2027: 78.4 * factor^4
  const projected2027M = Math.round(78.4 * Math.pow(factor, 4));
  const projected2027B = r2(projected2027M / 1000);

  const milestones = [
    { year: "2017", model: "Transformer", costLabel: "$930", logH: 14, tone: INK },
    { year: "2020", model: "GPT-3", costLabel: "$2M: $4.6M", logH: 48, tone: INK },
    { year: "2023", model: "GPT-4", costLabel: "Over $78M", logH: 78, tone: SIGNAL },
    {
      year: "2027",
      model: "Projection",
      costLabel: `~$${projected2027B}B (>$1B)`,
      logH: r2(94 + ((factorTenths - 20) / 10) * 14),
      tone: COUNTER,
    },
  ];

  return (
    <Plate
      w={800}
      h={304}
      title={`Interactive 2017 to 2027 AI training cost growth instrument: from $930 for the 2017 Transformer model to over $78 million for GPT-4 in 2023, compounding at ${factor}x per year (between 2x and 3x per year) to exceed $1 billion (~$${projected2027B}B) by 2027`}
    >
      {/* Framed digital Monitor showing the logarithmic rising columns */}
      <Monitor x={20} y={14} w={760} h={212}>
        <rect x={36} y={28} width={728} height={26} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
        <text x={400} y={46} textAnchor="middle" {...HEAD} fontSize={14} fill={INK}>
          2017 to 2027 Frontier Training Cost Trajectory (Log Scale | {factor}x / Year)
        </text>

        {milestones.map((m, i) => {
          const cx = 132 + i * 178;
          const baseY = 182;
          const barY = r2(baseY - m.logH);
          return (
            <g key={m.year}>
              <rect x={cx - 48} y={barY} width={96} height={m.logH} fill={INK} fillOpacity={0.07} stroke={INK} strokeWidth={1.5} />
              <text x={cx} y={barY - 7} textAnchor="middle" {...HEAD} fontSize={13.5} fill={INK}>
                {m.costLabel}
              </text>
              <text x={cx} y={202} textAnchor="middle" {...HEAD} fontSize={13} fill={INK}>
                {m.year} | {m.model}
              </text>
              {i < milestones.length - 1 && (
                <Pointer
                  x1={cx + 54}
                  y1={r2(barY + m.logH / 2)}
                  x2={cx + 122}
                  y2={r2(baseY - milestones[i + 1].logH / 2)}
                  w={3.5}
                  color={SIGNAL}
                />
              )}
            </g>
          );
        })}
      </Monitor>

      {/* Bottom Interactive Growth Factor Slider (2.0x to 3.0x per year) */}
      <text x={24} y={280} {...HEAD} fontSize={14} fill={INK}>
        Growth Factor: {factor}x / yr (2x: 3x)
      </text>
      <rect x={340} y={272} width={220} height={8} fill={INK} />
      <rect x={340} y={272} width={r2(((factorTenths - 20) / 10) * 220)} height={8} fill={SIGNAL} />
      <Knob
        x={340}
        y={276}
        len={220}
        min={20}
        max={30}
        step={1}
        value={factorTenths}
        onChange={setFactorTenths}
        label="Annual AI training cost growth factor between 2.0x and 3.0x per year"
        tone={SIGNAL}
      />
      <text x={584} y={280} {...HEAD} fontSize={14} fill={INK}>
        2027: &gt;$1B (~${projected2027B}B)
      </text>
    </Plate>
  );
}

/* ==========================================================================
   12. Platform Power and Digital Monopolies: Interactive Network-Effects
   & Top-5 Cloud Centralization Funnel
   "In 2024, if you were to host your website, you had to go through one of
   top five cloud companies."
   ========================================================================== */

/* ==========================================================================
   13. Further Readings: Interactive Weapons of Math Destruction (O'Neil, 2016)
   Three-Gear Inequality & Democracy Feedback Escapement
   ========================================================================== */

