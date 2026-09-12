/* ==========================================================================
   Week 01 Visuals — Consumer Behavior
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
 * 1. ConsumptionCycle: 3 stages of consumption with perspectives
 */
export function ConsumptionCycle() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto"
      style={{ maxHeight: "260px" }}
    >
      {/* Background track */}
      <line x1="100" y1="120" x2="700" y2="120" stroke={RULE} strokeWidth="3" />

      {/* Stage 1: Prepurchase */}
      <g transform="translate(140, 120)">
        <circle r="44" fill={PAPER2} stroke={RULE} strokeWidth="2" />
        <circle r="36" fill={PAPER} stroke={SIGNAL} strokeWidth="2.5" />
        <Key x={0} y={-4} anchor="middle" fill={SIGNAL} size={11}>
          STAGE 1
        </Key>
        <Note x={0} y={15} anchor="middle" weight="600" size={12}>
          Prepurchase
        </Note>
        <Note x={0} y={-60} anchor="middle" size={12} fill={INK3}>
          Need &amp; Search
        </Note>
        <Note x={0} y={75} anchor="middle" size={11} fill={INK2}>
          Attitude formation
        </Note>
      </g>

      {/* Arrow 1 to 2 */}
      <path
        d="M 230 120 L 340 120"
        stroke={SIGNAL}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <polygon points="345,120 335,115 335,125" fill={SIGNAL} />

      {/* Stage 2: Purchase */}
      <g transform="translate(400, 120)">
        <circle r="44" fill={PAPER2} stroke={RULE} strokeWidth="2" />
        <circle r="36" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <Key x={0} y={-4} anchor="middle" fill={INK} size={11}>
          STAGE 2
        </Key>
        <Note x={0} y={15} anchor="middle" weight="600" size={12}>
          Purchase
        </Note>
        <Note x={0} y={-60} anchor="middle" size={12} fill={INK3}>
          Store &amp; Checkout
        </Note>
        <Note x={0} y={75} anchor="middle" size={11} fill={INK2}>
          Atmosphere &amp; Packaging
        </Note>
      </g>

      {/* Arrow 2 to 3 */}
      <path
        d="M 490 120 L 600 120"
        stroke={COUNTER}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <polygon points="605,120 595,115 595,125" fill={COUNTER} />

      {/* Stage 3: Postpurchase */}
      <g transform="translate(660, 120)">
        <circle r="44" fill={PAPER2} stroke={RULE} strokeWidth="2" />
        <circle r="36" fill={PAPER} stroke={COUNTER} strokeWidth="2.5" />
        <Key x={0} y={-4} anchor="middle" fill={COUNTER} size={11}>
          STAGE 3
        </Key>
        <Note x={0} y={15} anchor="middle" weight="600" size={12}>
          Postpurchase
        </Note>
        <Note x={0} y={-60} anchor="middle" size={12} fill={INK3}>
          Use &amp; Regret
        </Note>
        <Note x={0} y={75} anchor="middle" size={11} fill={INK2}>
          Satisfaction &amp; Loyalty
        </Note>
      </g>
    </svg>
  );
}

/**
 * 2. NeedWantTrio: concentric diagram showing Needs vs. Wants vs. Demands
 */
export function NeedWantTrio() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto"
      style={{ maxHeight: "250px" }}
    >
      <rect
        x="60"
        y="30"
        width="200"
        height="180"
        rx="8"
        fill={PAPER2}
        stroke={RULE}
        strokeWidth="1.5"
      />
      <Key x={160} y={65} anchor="middle" fill={INK3}>
        1. Biological Need
      </Key>
      <Note x={160} y={98} anchor="middle" weight="600" size={15}>
        Thirst or Hunger
      </Note>
      <Note x={160} y={130} anchor="middle" size={12} fill={INK2}>
        Exists naturally.
      </Note>
      <Note x={160} y={150} anchor="middle" size={12} fill={INK2}>
        Cannot be invented.
      </Note>

      {/* Arrow */}
      <path
        d="M 270 120 L 310 120"
        stroke={SIGNAL}
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <polygon points="315,120 305,115 305,125" fill={SIGNAL} />

      <rect
        x="320"
        y="30"
        width="200"
        height="180"
        rx="8"
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth="2"
      />
      <Key x={420} y={65} anchor="middle" fill={SIGNAL}>
        2. Cultural Want
      </Key>
      <Note x={420} y={98} anchor="middle" weight="600" size={15}>
        Cold Soda or Tea
      </Note>
      <Note x={420} y={130} anchor="middle" size={12} fill={INK2}>
        Shaped by culture,
      </Note>
      <Note x={420} y={150} anchor="middle" size={12} fill={INK2}>
        habits, and peers.
      </Note>

      {/* Arrow */}
      <path d="M 530 120 L 570 120" stroke={COUNTER} strokeWidth="2" />
      <polygon points="575,120 565,115 565,125" fill={COUNTER} />

      <rect
        x="580"
        y="30"
        width="180"
        height="180"
        rx="8"
        fill={PAPER2}
        stroke={COUNTER}
        strokeWidth="2"
      />
      <Key x={670} y={65} anchor="middle" fill={COUNTER}>
        3. Market Demand
      </Key>
      <Note x={670} y={98} anchor="middle" weight="600" size={15}>
        Purchased Brand
      </Note>
      <Note x={670} y={130} anchor="middle" size={12} fill={INK2}>
        Backed by ability
      </Note>
      <Note x={670} y={150} anchor="middle" size={12} fill={INK2}>
        and willingness to pay.
      </Note>
    </svg>
  );
}

/**
 * 3. SegmentationPillars: 4 key segmentation bases
 */
export function SegmentationPillars() {
  const pillars = [
    {
      title: "Demographics",
      sub: "Age, Gender, Income",
      desc: "Who they are objectively",
    },
    {
      title: "Geographics",
      sub: "City, Region, Climate",
      desc: "Where they live and shop",
    },
    {
      title: "Psychographics",
      sub: "Values, Lifestyle, Self",
      desc: "How they think and identify",
    },
    {
      title: "Behavioral",
      sub: "Usage, Loyalty, Benefits",
      desc: "How they actually act",
    },
  ];

  return (
    <svg
      viewBox="0 0 800 180"
      className="w-full h-auto"
      style={{ maxHeight: "200px" }}
    >
      {pillars.map((p, i) => {
        const x = 40 + i * 185;
        return (
          <g key={p.title}>
            <rect
              x={x}
              y="15"
              width="170"
              height="150"
              rx="6"
              fill={i === 2 ? "var(--signal-tint)" : PAPER2}
              stroke={i === 2 ? SIGNAL : RULE}
              strokeWidth={i === 2 ? "2" : "1"}
            />
            <Key
              x={x + 85}
              y={45}
              anchor="middle"
              fill={i === 2 ? SIGNAL : INK3}
            >
              BASE 0{i + 1}
            </Key>
            <Note x={x + 85} y={75} anchor="middle" weight="600" size={14}>
              {p.title}
            </Note>
            <Note x={x + 85} y={105} anchor="middle" size={12} fill={INK2}>
              {p.sub}
            </Note>
            <Note x={x + 85} y={130} anchor="middle" size={11} fill={INK3}>
              {p.desc}
            </Note>
          </g>
        );
      })}
    </svg>
  );
}
