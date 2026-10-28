"use client";

import React, { useState } from "react";

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Finely proportioned Isotype human silhouette (Rule 9: Fixed cast per week).
 * Drawn with clean scholarly linework, no cartoon embellishments.
 */
function IsotypePerson({
  cx,
  cy,
  scale = 1,
  state = "neutral",
}: {
  cx: number;
  cy: number;
  scale?: number;
  state?: "neutral" | "queued" | "affected" | "verified";
}) {
  const stroke =
    state === "affected"
      ? "#A83226"
      : state === "verified"
        ? "#7D5614"
        : state === "queued"
          ? "#A39C8E"
          : "#181715";
  const fill =
    state === "affected"
      ? "rgba(168, 50, 38, 0.22)"
      : state === "verified"
        ? "rgba(125, 86, 20, 0.18)"
        : state === "queued"
          ? "transparent"
          : "rgba(24, 23, 21, 0.08)";

  const headR = round2(2.7 * scale);
  const headY = round2(cy - 4.2 * scale);
  const shW = round2(4.6 * scale);
  const topY = round2(cy - 0.3 * scale);
  const botY = round2(cy + 5.6 * scale);

  return (
    <g>
      <circle
        cx={cx}
        cy={headY}
        r={headR}
        fill={fill}
        stroke={stroke}
        strokeWidth={round2(1.1 * Math.min(scale, 1.15))}
      />
      <path
        d={`M ${round2(cx - shW)} ${botY} C ${round2(cx - shW)} ${round2(topY + 1.2 * scale)}, ${round2(cx - shW * 0.55)} ${topY}, ${cx} ${topY} C ${round2(cx + shW * 0.55)} ${topY}, ${round2(cx + shW)} ${round2(topY + 1.2 * scale)}, ${round2(cx + shW)} ${botY}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={round2(1.1 * Math.min(scale, 1.15))}
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * Fine-line domain artifact glyphs drawn by hand for the four market allocations
 * in Sentence 1 (Products seen, Prices quoted, Credit approval, Service complaints).
 */
function MarketAllocationGlyph({
  kind,
  cx,
  cy,
}: {
  kind: "products" | "prices" | "credit" | "complaints";
  cx: number;
  cy: number;
}) {
  const left = round2(cx - 8);
  const top = round2(cy - 7);

  if (kind === "products") {
    return (
      <g stroke="#181715" strokeWidth="1" fill="none">
        <rect x={left} y={top} width="16" height="14" rx="1" fill="#FAF8F3" />
        <rect x={round2(left + 2.5)} y={round2(top + 2.5)} width="4.5" height="9" />
        <rect x={round2(left + 9)} y={round2(top + 2.5)} width="4.5" height="4" />
        <line x1={round2(left + 9)} y1={round2(top + 9)} x2={round2(left + 13.5)} y2={round2(top + 9)} />
        <line x1={round2(left + 9)} y1={round2(top + 11.2)} x2={round2(left + 12.5)} y2={round2(top + 11.2)} />
      </g>
    );
  }
  if (kind === "prices") {
    return (
      <g stroke="#181715" strokeWidth="1" fill="none">
        <polygon
          points={`${left},${round2(cy - 5.5)} ${round2(cx + 4)},${round2(cy - 5.5)} ${round2(cx + 8.5)},${cy} ${round2(cx + 4)},${round2(cy + 5.5)} ${left},${round2(cy + 5.5)}`}
          fill="#FAF8F3"
        />
        <circle cx={round2(cx + 4.5)} cy={cy} r="1.1" fill="#181715" />
        <line x1={round2(left + 3)} y1={round2(cy - 2)} x2={round2(cx + 1)} y2={round2(cy - 2)} />
        <line x1={round2(left + 3)} y1={round2(cy + 2)} x2={round2(cx - 1)} y2={round2(cy + 2)} />
      </g>
    );
  }
  if (kind === "credit") {
    return (
      <g stroke="#181715" strokeWidth="1" fill="none">
        <rect x={round2(cx - 6.5)} y={round2(cy - 7.5)} width="13" height="15" rx="1" fill="#FAF8F3" />
        <line x1={round2(cx - 3.8)} y1={round2(cy - 4)} x2={round2(cx + 3.8)} y2={round2(cy - 4)} />
        <line x1={round2(cx - 3.8)} y1={round2(cy - 1)} x2={round2(cx + 2)} y2={round2(cy - 1)} />
        <circle cx={round2(cx + 2.2)} cy={round2(cy + 3.5)} r="2.1" />
      </g>
    );
  }
  return (
    <g stroke="#181715" strokeWidth="1" fill="none">
      <path
        d={`M ${round2(cx - 7.5)} ${round2(cy - 6)} L ${round2(cx + 7.5)} ${round2(cy - 6)} L ${round2(cx + 7.5)} ${round2(cy + 3.5)} L ${round2(cx - 1)} ${round2(cy + 3.5)} L ${round2(cx - 4.5)} ${round2(cy + 6.8)} L ${round2(cx - 4.5)} ${round2(cy + 3.5)} L ${round2(cx - 7.5)} ${round2(cy + 3.5)} Z`}
        fill="#FAF8F3"
        strokeLinejoin="round"
      />
      <line x1={round2(cx - 4.5)} y1={round2(cy - 2.5)} x2={round2(cx + 4.5)} y2={round2(cy - 2.5)} />
      <line x1={round2(cx - 4.5)} y1={round2(cy + 0.5)} x2={round2(cx + 2)} y2={round2(cy + 0.5)} />
    </g>
  );
}

/**
 * Figure I (viewBox="0 0 800 212"):
 * Illustrates Sentences 1, 2, and 3 on an open, frameless academic surface.
 */
function ScaleAndPropagationFigure({
  biasLevel,
}: {
  biasLevel: "biased" | "unbiased";
}) {
  const isBiased = biasLevel === "biased";

  const serialQueue = [
    { x: 44, label: "t₁", active: true },
    { x: 86, label: "t₂", active: false },
    { x: 128, label: "t₃", active: false },
    { x: 170, label: "t₄", active: false },
    { x: 212, label: "t₅", active: false },
  ];

  const domains = [
    { label: "Products seen", kind: "products" as const, y: 66 },
    { label: "Prices quoted", kind: "prices" as const, y: 95 },
    { label: "Credit approval", kind: "credit" as const, y: 124 },
    { label: "Service complaints", kind: "complaints" as const, y: 153 },
  ];

  const consumerX = [
    576, 594, 612, 630, 648, 666, 684, 702, 720, 738, 756, 774,
  ];
  const tau0X = 657;
  const tauBiasedX = 729;

  return (
    <svg
      role="img"
      viewBox="0 0 800 184"
      aria-label="Two-panel academic figure comparing a human employee making one decision at a time along a sequential queue against a deployed algorithmic model applying the same decision rule thousands of times per second across product visibility, price quotes, credit approval, and service complaints, where a bias in the rule reclassifies an entire market segment simultaneously."
      className="w-full h-auto block select-none"
    >
      <title>
        Human sequential decision-making versus algorithmic decision-rule scaling across an entire market segment
      </title>

      <defs>
        <pattern
          id="crimsonHatch"
          width="5"
          height="5"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="5"
            stroke="#A83226"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Top and bottom hairline rules */}
      <line
        x1="0"
        y1="1"
        x2="800"
        y2="1"
        stroke="#181715"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="183"
        x2="800"
        y2="183"
        stroke="#181715"
        strokeOpacity="0.22"
        strokeWidth="1"
      />

      {/* Vertical hairline separating Panel A and Panel B */}
      <line
        x1="248"
        y1="10"
        x2="248"
        y2="174"
        stroke="#181715"
        strokeOpacity="0.16"
        strokeWidth="1"
      />

      {/* ===================================================================
          PANEL A: HUMAN EMPLOYEE: ONE DECISION AT A TIME (x = 8..236)
      =================================================================== */}
      <text
        x="8"
        y="20"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="12"
        fontWeight="600"
        fill="#181715"
      >
        I. Human employee
      </text>
      <text
        x="8"
        y="34"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="10.5"
        fill="#6E695F"
      >
        One decision at a time
      </text>

      {/* Human employee figure at upper-left reviewing only t1 */}
      <IsotypePerson cx={44} cy={58} scale={1.08} state="neutral" />
      <text
        x="60"
        y="60"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.8"
        fill="#6E695F"
      >
        Employee reviewing case t₁
      </text>
      <line
        x1="44"
        y1="68"
        x2="44"
        y2="86"
        stroke="#181715"
        strokeWidth="1.1"
      />
      <polygon points="44,90 41.3,84.5 46.7,84.5" fill="#181715" />

      {/* Serial Queue of 5 Consumer Cases (t1..t5) */}
      <line
        x1="24"
        y1="126"
        x2="228"
        y2="126"
        stroke="#181715"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      {serialQueue.map((item) => (
        <g key={item.label}>
          <rect
            x={round2(item.x - 13)}
            y="92"
            width="26"
            height="30"
            rx="1.5"
            fill={item.active ? "#F2ECE0" : "#FAF8F3"}
            stroke={item.active ? "#181715" : "#A39C8E"}
            strokeWidth={item.active ? "1.25" : "0.9"}
            strokeDasharray={item.active ? undefined : "2 2"}
          />
          <IsotypePerson
            cx={item.x}
            cy={107}
            scale={0.88}
            state={item.active ? "neutral" : "queued"}
          />
          <text
            x={item.x}
            y="139"
            textAnchor="middle"
            fontFamily="var(--font-editorial), Georgia, serif"
            fontStyle="italic"
            fontSize="10"
            fill={item.active ? "#181715" : "#6E695F"}
          >
            {item.label}
          </text>
        </g>
      ))}

      {/* Bracket under unexamined queue t2..t5 */}
      <path
        d="M 74 144 L 74 148 L 224 148 L 224 144"
        fill="none"
        stroke="#A39C8E"
        strokeWidth="0.9"
      />
      <text
        x="149"
        y="159"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.5"
        fill="#6E695F"
      >
        Unexamined queue
      </text>

      <text
        x="8"
        y="174"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="10"
        fill="#6E695F"
      >
        Reach of single judgment: 1 consumer
      </text>

      {/* ===================================================================
          PANEL B: DEPLOYED MODEL: THOUSANDS OF DECISIONS / SEC (x = 266..792)
      =================================================================== */}
      <text
        x="268"
        y="20"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="12"
        fontWeight="600"
        fill="#181715"
      >
        II. Deployed model
      </text>
      <text
        x="268"
        y="34"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="10.5"
        fill="#6E695F"
      >
        Thousands of decisions per second | same decision rule
      </text>

      <text
        x="788"
        y="20"
        textAnchor="end"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="12"
        fontWeight="600"
        fill="#181715"
      >
        Market segment
      </text>
      <text
        x="788"
        y="34"
        textAnchor="end"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="10.5"
        fill={isBiased ? "#A83226" : "#7D5614"}
      >
        {isBiased
          ? "Error or bias scales across segment"
          : "Calibrated threshold across segment"}
      </text>

      {/* Stage 1 (x = 268..394): The Shared Decision Rule Curve f(x) >= tau */}
      <text
        x="331"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="10"
        fontWeight="600"
        fill="#181715"
      >
        Same decision rule
      </text>

      {isBiased ? (
        <g>
          <path
            d="M 328 142 L 328 74 C 337 68, 345 76, 354 100 L 354 142 Z"
            fill="rgba(168, 50, 38, 0.14)"
          />
          <path
            d="M 328 142 L 328 74 C 337 68, 345 76, 354 100 L 354 142 Z"
            fill="url(#crimsonHatch)"
          />
        </g>
      ) : (
        <path
          d="M 328 142 L 328 74 C 338 68, 350 84, 366 122 L 388 142 Z"
          fill="rgba(125, 86, 20, 0.12)"
        />
      )}

      {/* Smooth scoring distribution curve */}
      <path
        d="M 270 142 C 286 141, 300 128, 314 100 C 322 80, 328 72, 333 72 C 338 72, 344 80, 354 100 C 368 128, 380 141, 392 142"
        fill="none"
        stroke="#181715"
        strokeWidth="1.5"
      />
      <line
        x1="268"
        y1="142"
        x2="394"
        y2="142"
        stroke="#181715"
        strokeWidth="1"
      />
      <line
        x1="328"
        y1="64"
        x2="328"
        y2="146"
        stroke="#181715"
        strokeDasharray={isBiased ? "3 2" : undefined}
        strokeWidth="1.1"
      />
      {isBiased && (
        <line
          x1="354"
          y1="64"
          x2="354"
          y2="146"
          stroke="#A83226"
          strokeWidth="1.7"
        />
      )}
      <text
        x="331"
        y="158"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.8"
        fill={isBiased ? "#A83226" : "#7D5614"}
      >
        {isBiased ? "Error or bias in rule (Δτ)" : "Calibrated threshold (τ₀)"}
      </text>

      {/* Shaded Market Segment Band across all 4 rows */}
      {isBiased && (
        <g>
          <rect
            x={tau0X}
            y="52"
            width={round2(tauBiasedX - tau0X)}
            height="112"
            fill="rgba(168, 50, 38, 0.09)"
          />
          <rect
            x={tau0X}
            y="52"
            width={round2(tauBiasedX - tau0X)}
            height="112"
            fill="url(#crimsonHatch)"
          />
          <text
            x={round2((tau0X + tauBiasedX) / 2)}
            y="48"
            textAnchor="middle"
            fontFamily="var(--font-editorial), Georgia, serif"
            fontStyle="italic"
            fontSize="9.5"
            fontWeight="600"
            fill="#A83226"
          >
            Impacted segment
          </text>
        </g>
      )}

      {/* Stem from active decision threshold on f(x) to manifold junction (400, 110) */}
      <circle
        cx={isBiased ? 354 : 328}
        cy="110"
        r="2.4"
        fill={isBiased ? "#A83226" : "#7D5614"}
      />
      <line
        x1={isBiased ? 354 : 328}
        y1="110"
        x2="400"
        y2="110"
        stroke={isBiased ? "#A83226" : "#181715"}
        strokeOpacity="0.7"
        strokeWidth="1.15"
      />
      <circle
        cx="400"
        cy="110"
        r="2"
        fill={isBiased ? "#A83226" : "#181715"}
      />

      {/* Stage 2 & 3: Four Market Allocations + Simultaneous Consumer Segment Rows */}
      {domains.map((d) => (
        <g key={d.label}>
          <path
            d={`M 400 110 C 412 110, 414 ${d.y}, 426 ${d.y}`}
            fill="none"
            stroke={isBiased ? "#A83226" : "#181715"}
            strokeOpacity="0.7"
            strokeWidth="1.15"
          />

          <MarketAllocationGlyph kind={d.kind} cx={436} cy={d.y} />

          <text
            x="450"
            y={round2(d.y + 3.5)}
            fontFamily="var(--font-editorial), Georgia, serif"
            fontSize="10.8"
            fontWeight="500"
            fill="#181715"
          >
            {d.label}
          </text>

          <line
            x1="544"
            y1={d.y}
            x2="562"
            y2={d.y}
            stroke="#181715"
            strokeOpacity="0.3"
            strokeDasharray="1.5 2"
            strokeWidth="0.9"
          />

          <line
            x1="564"
            y1={round2(d.y + 5.2)}
            x2="784"
            y2={round2(d.y + 5.2)}
            stroke="#181715"
            strokeOpacity="0.16"
            strokeWidth="0.9"
          />

          {consumerX.map((cx) => {
            const inImpactedBand =
              isBiased && cx >= tau0X && cx <= tauBiasedX;
            const aboveCut = cx > (isBiased ? tauBiasedX : tau0X);
            return (
              <IsotypePerson
                key={`${d.label}-${cx}`}
                cx={cx}
                cy={d.y}
                scale={0.78}
                state={
                  inImpactedBand
                    ? "affected"
                    : aboveCut
                      ? "verified"
                      : "neutral"
                }
              />
            );
          })}
        </g>
      ))}

      {/* Shared Decision Rule Plane cutting vertically across all 4 market rows */}
      <line
        x1={tau0X}
        y1="50"
        x2={tau0X}
        y2="164"
        stroke={isBiased ? "#181715" : "#7D5614"}
        strokeDasharray={isBiased ? "3 2" : undefined}
        strokeWidth={isBiased ? "1" : "1.6"}
      />
      {isBiased && (
        <line
          x1={tauBiasedX}
          y1="50"
          x2={tauBiasedX}
          y2="164"
          stroke="#A83226"
          strokeWidth="1.8"
        />
      )}

      <text
        x="530"
        y="174"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="10"
        fill={isBiased ? "#A83226" : "#6E695F"}
      >
        {isBiased
          ? "Reach of 1 rule defect: scales immediately across the entire market segment in all 4 domains"
          : "Reach of calibrated rule: consistent threshold applied across all 4 market domains"}
      </text>
    </svg>
  );
}

/**
 * Figure II (viewBox="0 0 400 164"):
 * Illustrates Sentence 4 on an open academic surface:
 * Learning from historical records (left empirical scatter) and optimizing
 * narrow commercial objectives (click-through rate or short-term revenue)
 * beyond the point of alignment, creating a conflict with consumer welfare.
 */
function ObjectiveDivergenceFigure() {
  const historicalPoints = [
    [42, 117],
    [48, 111],
    [54, 114],
    [61, 106],
    [67, 109],
    [73, 101],
    [79, 104],
    [85, 97],
    [91, 100],
    [97, 92],
    [103, 95],
    [109, 87],
    [115, 90],
    [121, 83],
    [127, 85],
    [133, 79],
  ];

  return (
    <svg
      role="img"
      viewBox="0 0 400 152"
      aria-label="Quantitative trajectory plot showing historical records on the left and algorithmic optimization on the right, where rising click-through rate and short-term revenue diverge from declining consumer welfare."
      className="w-full h-auto block select-none"
    >
      <title>
        Historical records and divergence between narrow commercial objectives and consumer welfare
      </title>

      <defs>
        <pattern
          id="divergenceHatch"
          width="5"
          height="5"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="5"
            stroke="#A83226"
            strokeOpacity="0.26"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Top and bottom hairline rules */}
      <line
        x1="0"
        y1="1"
        x2="400"
        y2="1"
        stroke="#181715"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="151"
        x2="400"
        y2="151"
        stroke="#181715"
        strokeOpacity="0.22"
        strokeWidth="1"
      />

      {/* Top rubric */}
      <text
        x="6"
        y="18"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="11.5"
        fontWeight="600"
        fill="#181715"
      >
        III. Proxy optimization versus consumer welfare
      </text>

      {/* Coordinate axes (x = 24..382, y = 28..128) */}
      <line
        x1="24"
        y1="28"
        x2="24"
        y2="128"
        stroke="#181715"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <line
        x1="24"
        y1="128"
        x2="382"
        y2="128"
        stroke="#181715"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {/* Historical vs. Deployed Optimization divider at x = 138 */}
      <line
        x1="138"
        y1="28"
        x2="138"
        y2="128"
        stroke="#181715"
        strokeOpacity="0.3"
        strokeDasharray="3 2"
        strokeWidth="1"
      />

      {/* Shaded historical records envelope (x = 36..138) */}
      <polygon
        points="36,122 138,85 138,71 36,108"
        fill="rgba(24, 23, 21, 0.06)"
      />
      <line
        x1="36"
        y1="115"
        x2="138"
        y2="78"
        stroke="#181715"
        strokeWidth="1.4"
      />
      {historicalPoints.map(([px, py], idx) => (
        <circle
          key={idx}
          cx={px}
          cy={py}
          r="2"
          fill="#FAF8F3"
          stroke="#181715"
          strokeOpacity="0.75"
          strokeWidth="1"
        />
      ))}

      {/* Shaded conflict wedge between commercial objective and consumer welfare */}
      <path
        d="M 138 78 C 195 62, 260 48, 352 44 L 352 114 C 258 102, 195 72, 138 78 Z"
        fill="rgba(168, 50, 38, 0.08)"
      />
      <path
        d="M 138 78 C 195 62, 260 48, 352 44 L 352 114 C 258 102, 195 72, 138 78 Z"
        fill="url(#divergenceHatch)"
      />

      {/* Upper Curve: Click-through rate or short-term revenue */}
      <path
        d="M 138 78 C 195 62, 260 48, 352 44"
        fill="none"
        stroke="#A83226"
        strokeWidth="2"
      />
      <circle cx="352" cy="44" r="3" fill="#A83226" />

      <text
        x="232"
        y="37"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="10"
        fontWeight="600"
        fill="#A83226"
      >
        Click-through &amp; short-term revenue
      </text>

      {/* Lower Curve: Consumer welfare */}
      <path
        d="M 138 78 C 195 72, 258 102, 352 114"
        fill="none"
        stroke="#181715"
        strokeWidth="1.8"
        strokeDasharray="4 2.5"
      />
      <circle cx="352" cy="114" r="2.8" fill="#181715" />

      <IsotypePerson cx={372} cy={111} scale={0.92} state="affected" />

      <text
        x="194"
        y="122"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="10"
        fontWeight="600"
        fill="#181715"
      >
        Consumer welfare
      </text>

      <circle
        cx="138"
        cy="78"
        r="3.2"
        fill="#FAF8F3"
        stroke="#181715"
        strokeWidth="1.5"
      />

      {/* Vertical divergence caliper at x = 338 */}
      <line
        x1="338"
        y1="50"
        x2="338"
        y2="108"
        stroke="#A83226"
        strokeWidth="1.15"
      />
      <polygon points="338,46 335.5,51 340.5,51" fill="#A83226" />
      <polygon points="338,112 335.5,107 340.5,107" fill="#A83226" />
      <text
        x="331"
        y="82"
        textAnchor="end"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.5"
        fontWeight="600"
        fill="#A83226"
      >
        Welfare conflict
      </text>

      <text
        x="81"
        y="143"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.8"
        fill="#6E695F"
      >
        Historical records
      </text>
      <text
        x="258"
        y="143"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.8"
        fill="#6E695F"
      >
        Narrow objective optimization →
      </text>
    </svg>
  );
}

/**
 * Figure III (viewBox="0 0 400 152"):
 * Illustrates Sentence 5 on an open academic surface:
 * Normative principles establish the admissible region of acceptable behavior
 * [τ_min, τ_max], while empirical methods measure the deployed system's
 * realized output distribution and confidence intervals to verify compliance.
 */
function NormativeAndEmpiricalFigure() {
  const rugTicks = [
    154, 162, 169, 175, 180, 184, 188, 192, 196, 201, 207, 214, 222,
  ];

  return (
    <svg
      role="img"
      viewBox="0 0 400 152"
      aria-label="Audit verification plot showing normative principles as acceptable behavior bounds and empirical methods as measured outcome distributions with confidence intervals verifying whether a deployed system complies or breaches."
      className="w-full h-auto block select-none"
    >
      <title>
        Normative boundaries defining acceptable behavior and empirical audit distributions verifying compliance
      </title>

      <defs>
        <pattern
          id="breachHatch"
          width="5"
          height="5"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="5"
            stroke="#A83226"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Top and bottom hairline rules */}
      <line
        x1="0"
        y1="1"
        x2="400"
        y2="1"
        stroke="#181715"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="151"
        x2="400"
        y2="151"
        stroke="#181715"
        strokeOpacity="0.22"
        strokeWidth="1"
      />

      {/* Top rubric */}
      <text
        x="6"
        y="18"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="11.5"
        fontWeight="600"
        fill="#181715"
      >
        IV. Normative principles &amp; empirical verification
      </text>

      {/* Coordinate axes (matching Figure II: x = 24..382, y = 28..128) */}
      <line
        x1="24"
        y1="28"
        x2="24"
        y2="128"
        stroke="#181715"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <line
        x1="24"
        y1="128"
        x2="382"
        y2="128"
        stroke="#181715"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {/* Normative Admissible Zone: Acceptable Behavior [x = 108..264] */}
      <rect
        x="108"
        y="28"
        width="156"
        height="100"
        fill="rgba(125, 86, 20, 0.08)"
      />
      <line
        x1="108"
        y1="28"
        x2="108"
        y2="128"
        stroke="#7D5614"
        strokeWidth="1.4"
      />
      <line
        x1="264"
        y1="28"
        x2="264"
        y2="128"
        stroke="#7D5614"
        strokeWidth="1.4"
      />
      <line x1="108" y1="32" x2="116" y2="32" stroke="#7D5614" strokeWidth="1.4" />
      <line x1="256" y1="32" x2="264" y2="32" stroke="#7D5614" strokeWidth="1.4" />

      <text
        x="186"
        y="39"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="9.5"
        fontWeight="600"
        fill="#7D5614"
      >
        Normative principles
      </text>
      <text
        x="186"
        y="50"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9"
        fill="#7D5614"
      >
        (acceptable behavior)
      </text>

      {/* ===================================================================
          TRACK 1 (y = 78): UNGOVERNED DEPLOYMENT BREACHING BOUNDARY
      =================================================================== */}
      <text
        x="32"
        y="71"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.2"
        fill="#A83226"
      >
        Ungoverned
      </text>
      <text
        x="32"
        y="83"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.2"
        fill="#A83226"
      >
        deployment
      </text>

      <line
        x1="96"
        y1="78"
        x2="348"
        y2="78"
        stroke="#181715"
        strokeOpacity="0.14"
        strokeWidth="1"
      />
      {/* Shaded breach tail outside x = 264 */}
      <path
        d="M 264 78 L 264 58 C 272 53, 282 53, 292 60 C 306 70, 318 77, 336 78 Z"
        fill="rgba(168, 50, 38, 0.16)"
      />
      <path
        d="M 264 78 L 264 58 C 272 53, 282 53, 292 60 C 306 70, 318 77, 336 78 Z"
        fill="url(#breachHatch)"
      />
      <path
        d="M 216 78 C 234 77, 248 68, 264 58 C 272 53, 282 53, 292 60 C 306 70, 318 77, 336 78"
        fill="none"
        stroke="#A83226"
        strokeWidth="1.6"
      />
      {/* 95% CI whisker & point estimate */}
      <line x1="246" y1="78" x2="306" y2="78" stroke="#A83226" strokeWidth="1.8" />
      <line x1="246" y1="75" x2="246" y2="81" stroke="#A83226" strokeWidth="1.3" />
      <line x1="306" y1="75" x2="306" y2="81" stroke="#A83226" strokeWidth="1.3" />
      <circle cx="277" cy="78" r="3" fill="#A83226" />

      {/* Breach callout in completely clear upper-right space above y = 53 */}
      <text
        x="280"
        y="44"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.5"
        fontWeight="600"
        fill="#A83226"
      >
        Boundary breach
      </text>

      {/* ===================================================================
          TRACK 2 (y = 114): VERIFIED COMPLIANT SYSTEM WITHIN BOUNDS
      =================================================================== */}
      <text
        x="32"
        y="107"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="9.2"
        fontWeight="600"
        fill="#181715"
      >
        Verified
      </text>
      <text
        x="32"
        y="119"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontSize="9.2"
        fontWeight="600"
        fill="#181715"
      >
        compliance
      </text>

      <line
        x1="96"
        y1="114"
        x2="348"
        y2="114"
        stroke="#181715"
        strokeOpacity="0.14"
        strokeWidth="1"
      />
      {/* Empirical density curve strictly within [108, 264] */}
      <path
        d="M 130 114 C 148 113, 162 100, 174 89 C 181 83, 191 83, 198 89 C 210 100, 224 113, 242 114 Z"
        fill="rgba(125, 86, 20, 0.16)"
        stroke="#181715"
        strokeWidth="1.6"
      />
      {/* 95% CI whisker & point estimate */}
      <line x1="154" y1="114" x2="218" y2="114" stroke="#181715" strokeWidth="1.8" />
      <line x1="154" y1="111" x2="154" y2="117" stroke="#181715" strokeWidth="1.3" />
      <line x1="218" y1="111" x2="218" y2="117" stroke="#181715" strokeWidth="1.3" />
      <circle cx="186" cy="114" r="3" fill="#7D5614" />

      {/* Empirical sample rug ticks along x-axis */}
      {rugTicks.map((tx) => (
        <line
          key={tx}
          x1={tx}
          y1="124"
          x2={tx}
          y2="128"
          stroke="#181715"
          strokeOpacity="0.6"
          strokeWidth="1"
        />
      ))}

      {/* Protected consumer silhouette on right of verified track */}
      <IsotypePerson cx={366} cy={109} scale={0.92} state="verified" />

      {/* Bottom X-axis label */}
      <text
        x="203"
        y="143"
        textAnchor="middle"
        fontFamily="var(--font-editorial), Georgia, serif"
        fontStyle="italic"
        fontSize="9.8"
        fill="#6E695F"
      >
        Empirical audit distribution &amp; 95% confidence bounds →
      </text>
    </svg>
  );
}

export default function SampleSlidePage() {
  const [biasLevel, setBiasLevel] = useState<"biased" | "unbiased">("biased");

  return (
    <main className="w-full min-h-svh flex flex-col justify-center">
      <section
        data-slide
        className="w-full min-h-svh flex flex-col justify-center px-6 py-6 md:px-14 md:py-7 max-w-[1440px] mx-auto"
      >
        {/* Top Academic Running Head */}
        <header className="flex items-baseline justify-between border-b border-[#181715]/20 pb-2 mb-4">
          <div className="flex items-baseline gap-3">
            <span className="text-[12px] tracking-[0.08em] uppercase text-[#181715] font-semibold">
              Week 01
            </span>
            <span className="text-[#181715]/30">n/a</span>
            <span className="text-[13.5px] italic text-[#6E695F]">
              Foundations of Responsible AI in Markets
            </span>
          </div>
          <span className="text-[12px] italic text-[#6E695F]">
            Responsible AI &amp; Algorithmic Governance
          </span>
        </header>

        {/* Slide Title */}
        <h1
          className="text-[32px] md:text-[40px] leading-[1.06] tracking-[-0.015em] text-[#181715] mb-3.5"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        >
          Why Market Algorithms Require Governance
        </h1>

        {/* ===============================================================
            UPPER TIER: SENTENCES 1, 2, 3 + FIGURE I
        =============================================================== */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-2.5">
            <p className="md:col-span-4 text-[14.5px] leading-[1.5] text-[#2C2A26]">
              Algorithms now determine which products consumers see, what prices
              they are quoted, whether their credit application is approved, and
              how their service complaints are resolved.
            </p>
            <p className="md:col-span-4 text-[14.5px] leading-[1.5] text-[#2C2A26] md:border-l md:border-[#181715]/12 md:pl-4">
              Unlike a human employee who makes one decision at a time, a
              deployed model executes thousands of decisions per second using
              the same decision rule.
            </p>
            <p className="md:col-span-4 text-[14.5px] leading-[1.5] text-[#2C2A26] md:border-l md:border-[#181715]/12 md:pl-4">
              An{" "}
              <span className="text-[#A83226] font-semibold">
                error, bias, or perverse incentive in that rule therefore scales
                immediately across an entire market segment.
              </span>
            </p>
          </div>

          {/* Quiet interactive parameter switch integrated with Figure I */}
          <div className="flex items-center justify-end gap-3 mb-1 text-[12px] italic text-[#6E695F]">
            <span>Decision rule parameter:</span>
            <button
              type="button"
              onClick={() => setBiasLevel("biased")}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                biasLevel === "biased"
                  ? "text-[#A83226] font-semibold underline underline-offset-4"
                  : "text-[#6E695F] hover:text-[#181715]"
              }`}
            >
              Rule with error or bias (Δτ)
            </button>
            <span className="text-[#181715]/25">|</span>
            <button
              type="button"
              onClick={() => setBiasLevel("unbiased")}
              className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                biasLevel === "unbiased"
                  ? "text-[#7D5614] font-semibold underline underline-offset-4"
                  : "text-[#6E695F] hover:text-[#181715]"
              }`}
            >
              Calibrated rule (τ₀)
            </button>
          </div>

          <ScaleAndPropagationFigure biasLevel={biasLevel} />
        </div>

        {/* ===============================================================
            LOWER TIER: SENTENCE 4 (LEFT) & SENTENCE 5 (RIGHT)
        =============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
          <div className="md:col-span-6 flex flex-col gap-2">
            <p className="text-[14.5px] leading-[1.5] text-[#2C2A26]">
              Market algorithms also learn from historical records and optimize
              narrow commercial objectives, such as click-through rate or
              short-term revenue, that can conflict with consumer welfare.
            </p>
            <ObjectiveDivergenceFigure />
          </div>

          <div className="md:col-span-6 flex flex-col gap-2 md:border-l md:border-[#181715]/15 md:pl-8">
            <p className="text-[14.5px] leading-[1.5] text-[#2C2A26]">
              Governing these systems requires both normative principles that
              define acceptable behavior and empirical methods that verify
              whether a deployed system complies with them.
            </p>
            <NormativeAndEmpiricalFigure />
          </div>
        </div>
      </section>
    </main>
  );
}
