/* ==========================================================================
   Week 02 Visuals — Consumer Behavior: Perception & Sensory Marketing
   ========================================================================== */

import React from "react";

const INK = "var(--ink)";
const INK2 = "var(--ink-2)";
const INK3 = "var(--ink-3)";
const RULE = "var(--rule)";
const SIGNAL = "var(--signal)";
const COUNTER = "var(--counter)";
const PAPER = "var(--paper)";
const PAPER2 = "var(--paper-2)";

function Key({
  x,
  y,
  children,
  anchor = "start",
  fill = INK3,
  size = 11,
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
      fontSize={size}
      letterSpacing="0.08em"
      fontWeight="600"
      style={{ textTransform: "uppercase" }}
      fill={fill}
    >
      {children}
    </text>
  );
}

function Note({
  x,
  y,
  children,
  anchor = "start",
  fill = INK2,
  size = 13,
  weight = "normal",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
  weight?: "normal" | "bold" | "500" | "600";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
    >
      {children}
    </text>
  );
}

/**
 * 1. PerceptionFunnel: Exposure -> Attention -> Interpretation
 */
export function PerceptionFunnel() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto"
      style={{ maxHeight: "250px" }}
    >
      {/* Background track */}
      <line x1="80" y1="120" x2="720" y2="120" stroke={RULE} strokeWidth="3" />

      {/* Stage 1: Exposure */}
      <g transform="translate(140, 120)">
        <circle r="46" fill={PAPER2} stroke={RULE} strokeWidth="2" />
        <circle r="38" fill={PAPER} stroke={SIGNAL} strokeWidth="2.5" />
        <Key x={0} y={-4} anchor="middle" fill={SIGNAL} size={11}>
          STAGE 1
        </Key>
        <Note x={0} y={15} anchor="middle" weight="600" size={13}>
          Exposure
        </Note>
        <Note x={0} y={-62} anchor="middle" size={12} fill={INK3}>
          Sensory Receptors
        </Note>
        <Note x={0} y={75} anchor="middle" size={11} fill={INK2}>
          Stimuli come in range
        </Note>
      </g>

      {/* Arrow 1 to 2 */}
      <path
        d="M 230 120 L 335 120"
        stroke={SIGNAL}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <polygon points="340,120 330,115 330,125" fill={SIGNAL} />

      {/* Stage 2: Attention */}
      <g transform="translate(400, 120)">
        <circle r="46" fill={PAPER2} stroke={RULE} strokeWidth="2" />
        <circle r="38" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <Key x={0} y={-4} anchor="middle" fill={INK} size={11}>
          STAGE 2
        </Key>
        <Note x={0} y={15} anchor="middle" weight="600" size={13}>
          Attention
        </Note>
        <Note x={0} y={-62} anchor="middle" size={12} fill={INK3}>
          Mental Allocation
        </Note>
        <Note x={0} y={75} anchor="middle" size={11} fill={INK2}>
          Focus on specific cue
        </Note>
      </g>

      {/* Arrow 2 to 3 */}
      <path
        d="M 490 120 L 595 120"
        stroke={COUNTER}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <polygon points="600,120 590,115 590,125" fill={COUNTER} />

      {/* Stage 3: Interpretation */}
      <g transform="translate(660, 120)">
        <circle r="46" fill={PAPER2} stroke={RULE} strokeWidth="2" />
        <circle r="38" fill={PAPER} stroke={COUNTER} strokeWidth="2.5" />
        <Key x={0} y={-4} anchor="middle" fill={COUNTER} size={11}>
          STAGE 3
        </Key>
        <Note x={0} y={15} anchor="middle" weight="600" size={13}>
          Interpretation
        </Note>
        <Note x={0} y={-62} anchor="middle" size={12} fill={INK3}>
          Assigned Meaning
        </Note>
        <Note x={0} y={75} anchor="middle" size={11} fill={INK2}>
          Schema &amp; Context
        </Note>
      </g>
    </svg>
  );
}

/**
 * 2. SensoryWheel: 5 senses in marketing
 */
export function SensoryWheel() {
  const senses = [
    {
      name: "Sight",
      label: "Visual Identity",
      detail: "Color, shape, package recognition",
    },
    {
      name: "Sound",
      label: "Audio Branding",
      detail: "Jingles, voice tone, ambient tempo",
    },
    {
      name: "Smell",
      label: "Scent Marketing",
      detail: "Direct link to limbic system & memory",
    },
    {
      name: "Touch",
      label: "Haptics",
      detail: "Texture, weight, perceived quality",
    },
    {
      name: "Taste",
      label: "Flavor Profile",
      detail: "Sampling, sweetness, brand loyalty",
    },
  ];

  return (
    <svg
      viewBox="0 0 800 180"
      className="w-full h-auto"
      style={{ maxHeight: "200px" }}
    >
      {senses.map((s, i) => {
        const x = 20 + i * 155;
        const isHighlight = i === 2 || i === 3;
        return (
          <g key={s.name}>
            <rect
              x={x}
              y="15"
              width="145"
              height="150"
              rx="6"
              fill={isHighlight ? PAPER : PAPER2}
              stroke={isHighlight ? SIGNAL : RULE}
              strokeWidth={isHighlight ? 2 : 1}
            />
            <Key
              x={x + 72}
              y={44}
              anchor="middle"
              fill={isHighlight ? SIGNAL : INK3}
              size={11}
            >
              {s.name}
            </Key>
            <Note
              x={x + 72}
              y={72}
              anchor="middle"
              weight="600"
              size={13}
              fill={INK}
            >
              {s.label}
            </Note>
            <line
              x1={x + 20}
              y1={86}
              x2={x + 125}
              y2={86}
              stroke={RULE}
              strokeWidth="1"
            />
            <Note x={x + 72} y={110} anchor="middle" size={11} fill={INK2}>
              {s.detail.split(" ").slice(0, 3).join(" ")}
            </Note>
            <Note x={x + 72} y={128} anchor="middle" size={11} fill={INK2}>
              {s.detail.split(" ").slice(3).join(" ")}
            </Note>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * 3. WebersLawScale: Weber's Law illustration
 */
export function WebersLawScale() {
  return (
    <svg
      viewBox="0 0 800 220"
      className="w-full h-auto"
      style={{ maxHeight: "230px" }}
    >
      {/* Box A: Low base intensity */}
      <rect
        x="60"
        y="25"
        width="310"
        height="170"
        rx="8"
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth="2"
      />
      <Key x={215} y={55} anchor="middle" fill={SIGNAL} size={11}>
        Low Base Stimulus
      </Key>
      <Note x={215} y={85} anchor="middle" weight="600" size={16} fill={INK}>
        $1.00 Candy Bar
      </Note>
      <Note x={215} y={115} anchor="middle" size={13} fill={INK2}>
        +$0.10 Price Increase = 10% Jump
      </Note>
      <rect
        x="95"
        y="135"
        width="240"
        height="36"
        rx="4"
        fill={PAPER2}
        stroke={RULE}
        strokeWidth="1"
      />
      <Note
        x={215}
        y={158}
        anchor="middle"
        weight="600"
        size={12}
        fill={SIGNAL}
      >
        Above JND: Noticeable immediately
      </Note>

      {/* Box B: High base intensity */}
      <rect
        x="430"
        y="25"
        width="310"
        height="170"
        rx="8"
        fill={PAPER2}
        stroke={RULE}
        strokeWidth="1.5"
      />
      <Key x={585} y={55} anchor="middle" fill={INK3} size={11}>
        High Base Stimulus
      </Key>
      <Note x={585} y={85} anchor="middle" weight="600" size={16} fill={INK}>
        $1,000 Laptop
      </Note>
      <Note x={585} y={115} anchor="middle" size={13} fill={INK2}>
        +$0.10 Price Increase = 0.01% Change
      </Note>
      <rect
        x="465"
        y="135"
        width="240"
        height="36"
        rx="4"
        fill={PAPER}
        stroke={RULE}
        strokeWidth="1"
      />
      <Note
        x={585}
        y={158}
        anchor="middle"
        weight="600"
        size={12}
        fill={COUNTER}
      >
        Below JND: Unnoticed by buyers
      </Note>
    </svg>
  );
}

/**
 * 4. GestaltPrinciples: Closure, Similarity, Figure-Ground
 */
export function GestaltPrinciples() {
  return (
    <svg
      viewBox="0 0 800 210"
      className="w-full h-auto"
      style={{ maxHeight: "220px" }}
    >
      {/* Principle 1: Closure */}
      <g transform="translate(60, 20)">
        <rect
          x="0"
          y="0"
          width="200"
          height="170"
          rx="6"
          fill={PAPER2}
          stroke={RULE}
          strokeWidth="1.5"
        />
        <Key x={100} y={32} anchor="middle" fill={SIGNAL} size={11}>
          01. Closure
        </Key>
        {/* Incomplete circle pattern */}
        <path
          d="M 75 75 A 25 25 0 1 1 125 75"
          fill="none"
          stroke={SIGNAL}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="3" fill={SIGNAL} />
        <Note x={100} y={130} anchor="middle" weight="600" size={12} fill={INK}>
          Mind Fills Gaps
        </Note>
        <Note x={100} y={150} anchor="middle" size={11} fill={INK2}>
          Incomplete logo seen as whole
        </Note>
      </g>

      {/* Principle 2: Similarity */}
      <g transform="translate(300, 20)">
        <rect
          x="0"
          y="0"
          width="200"
          height="170"
          rx="6"
          fill={PAPER}
          stroke={RULE}
          strokeWidth="1.5"
        />
        <Key x={100} y={32} anchor="middle" fill={INK} size={11}>
          02. Similarity
        </Key>
        {/* Grouped elements */}
        <circle cx="75" cy="70" r="8" fill={SIGNAL} />
        <circle cx="100" cy="70" r="8" fill={SIGNAL} />
        <circle cx="125" cy="70" r="8" fill={SIGNAL} />
        <rect x="67" y="87" width="16" height="16" rx="2" fill={COUNTER} />
        <rect x="92" y="87" width="16" height="16" rx="2" fill={COUNTER} />
        <rect x="117" y="87" width="16" height="16" rx="2" fill={COUNTER} />
        <Note x={100} y={130} anchor="middle" weight="600" size={12} fill={INK}>
          Group by Shared Traits
        </Note>
        <Note x={100} y={150} anchor="middle" size={11} fill={INK2}>
          Same color/shape grouped
        </Note>
      </g>

      {/* Principle 3: Figure-Ground */}
      <g transform="translate(540, 20)">
        <rect
          x="0"
          y="0"
          width="200"
          height="170"
          rx="6"
          fill={PAPER2}
          stroke={COUNTER}
          strokeWidth="2"
        />
        <Key x={100} y={32} anchor="middle" fill={COUNTER} size={11}>
          03. Figure-Ground
        </Key>
        {/* Contrast square inside */}
        <rect x="65" y="55" width="70" height="50" rx="4" fill={INK} />
        <circle cx="100" cy="80" r="14" fill={PAPER} />
        <Note x={100} y={130} anchor="middle" weight="600" size={12} fill={INK}>
          Focal Object vs Field
        </Note>
        <Note x={100} y={150} anchor="middle" size={11} fill={INK2}>
          Foreground stands out
        </Note>
      </g>
    </svg>
  );
}
