/* ==========================================================================
   Week 05 Visuals — Consumer Behavior: Personality, Self-Concept & Lifestyles
   ========================================================================== */

import React from "react";

const INK = "var(--ink)";
const INK2 = "var(--ink-2)";
const INK3 = "var(--ink-3)";
const RULE = "var(--rule)";
const SIGNAL = "var(--signal)";
const COUNTER = "var(--counter)";
const AFFIRM = "var(--affirm)";
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
 * 1. SelfDiscrepancyModel
 * Visualizes the gap between Actual Self and Ideal Self, with compensatory consumption bridging the gap.
 */
export function SelfDiscrepancyModel() {
  return (
    <svg
      viewBox="0 0 800 230"
      className="w-full h-auto"
      style={{ maxHeight: "240px" }}
    >
      <defs>
        <marker
          id="arrow-signal-5"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill={SIGNAL} />
        </marker>
        <marker
          id="arrow-counter-5"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill={COUNTER} />
        </marker>
      </defs>

      {/* Actual Self Card */}
      <rect
        x="40"
        y="45"
        width="210"
        height="140"
        rx="10"
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth="2"
      />
      <Key x={145} y={75} anchor="middle" fill={COUNTER} size={11}>
        Current State
      </Key>
      <Note x={145} y={105} anchor="middle" weight="600" size={16} fill={INK}>
        Actual Self
      </Note>
      <Note x={145} y={130} anchor="middle" size={12} fill={INK3}>
        Realistic appraisal of
      </Note>
      <Note x={145} y={148} anchor="middle" size={12} fill={INK3}>
        current qualities &amp; traits
      </Note>

      {/* Middle Bridge: Self-Discrepancy Tension */}
      <g transform="translate(265, 30)">
        <rect
          x="0"
          y="15"
          width="270"
          height="140"
          rx="10"
          fill={PAPER2}
          stroke={RULE}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <Key x={135} y={45} anchor="middle" fill={INK3} size={10}>
          Self-Discrepancy Gap
        </Key>
        <Note
          x={135}
          y={70}
          anchor="middle"
          weight="600"
          size={13}
          fill={SIGNAL}
        >
          Emotional Tension
        </Note>

        {/* Arrow through the bridge */}
        <line
          x1="20"
          y1="95"
          x2="245"
          y2="95"
          stroke={SIGNAL}
          strokeWidth="2.5"
          markerEnd="url(#arrow-signal-5)"
        />
        <rect
          x="40"
          y="110"
          width="190"
          height="32"
          rx="6"
          fill={PAPER}
          stroke={SIGNAL}
          strokeWidth="1"
        />
        <Note x={135} y={131} anchor="middle" size={11} weight="600" fill={INK}>
          Compensatory Consumption
        </Note>
      </g>

      {/* Ideal Self Card */}
      <rect
        x="550"
        y="45"
        width="210"
        height="140"
        rx="10"
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth="2"
      />
      <Key x={655} y={75} anchor="middle" fill={SIGNAL} size={11}>
        Aspirational State
      </Key>
      <Note x={655} y={105} anchor="middle" weight="600" size={16} fill={INK}>
        Ideal Self
      </Note>
      <Note x={655} y={130} anchor="middle" size={12} fill={INK3}>
        Conception of who the
      </Note>
      <Note x={655} y={148} anchor="middle" size={12} fill={INK3}>
        consumer wishes to be
      </Note>
    </svg>
  );
}

/**
 * 2. ExtendedSelfRings
 * Visualizes Belk's 4 concentric layers of the extended self:
 * Individual -> Family -> Community -> Group
 */
export function ExtendedSelfRings() {
  return (
    <svg
      viewBox="0 0 800 230"
      className="w-full h-auto"
      style={{ maxHeight: "240px" }}
    >
      {/* 4 horizontal step cards */}
      {/* 1. Individual */}
      <g transform="translate(30, 35)">
        <rect
          x="0"
          y="0"
          width="170"
          height="150"
          rx="10"
          fill={PAPER}
          stroke={SIGNAL}
          strokeWidth="2"
        />
        <Key x={85} y={30} anchor="middle" fill={SIGNAL}>
          Level 01
        </Key>
        <Note x={85} y={58} anchor="middle" weight="600" size={15} fill={INK}>
          Individual
        </Note>
        <line x1="25" y1="72" x2="145" y2="72" stroke={RULE} strokeWidth="1" />
        <Note x={85} y={94} anchor="middle" size={12} fill={INK2}>
          Personal items
        </Note>
        <Note x={85} y={114} anchor="middle" size={11} fill={INK3}>
          Jewelry, phones,
        </Note>
        <Note x={85} y={130} anchor="middle" size={11} fill={INK3}>
          favorite wardrobe
        </Note>
      </g>

      {/* Arrow 1 */}
      <line x1="205" y1="110" x2="220" y2="110" stroke={RULE} strokeWidth="2" />

      {/* 2. Family */}
      <g transform="translate(225, 35)">
        <rect
          x="0"
          y="0"
          width="170"
          height="150"
          rx="10"
          fill={PAPER}
          stroke={COUNTER}
          strokeWidth="2"
        />
        <Key x={85} y={30} anchor="middle" fill={COUNTER}>
          Level 02
        </Key>
        <Note x={85} y={58} anchor="middle" weight="600" size={15} fill={INK}>
          Family
        </Note>
        <line x1="25" y1="72" x2="145" y2="72" stroke={RULE} strokeWidth="1" />
        <Note x={85} y={94} anchor="middle" size={12} fill={INK2}>
          Shared dwelling
        </Note>
        <Note x={85} y={114} anchor="middle" size={11} fill={INK3}>
          Home, furnishings,
        </Note>
        <Note x={85} y={130} anchor="middle" size={11} fill={INK3}>
          heirlooms, car
        </Note>
      </g>

      {/* Arrow 2 */}
      <line x1="400" y1="110" x2="415" y2="110" stroke={RULE} strokeWidth="2" />

      {/* 3. Community */}
      <g transform="translate(420, 35)">
        <rect
          x="0"
          y="0"
          width="170"
          height="150"
          rx="10"
          fill={PAPER}
          stroke={AFFIRM}
          strokeWidth="2"
        />
        <Key x={85} y={30} anchor="middle" fill={AFFIRM}>
          Level 03
        </Key>
        <Note x={85} y={58} anchor="middle" weight="600" size={15} fill={INK}>
          Community
        </Note>
        <line x1="25" y1="72" x2="145" y2="72" stroke={RULE} strokeWidth="1" />
        <Note x={85} y={94} anchor="middle" size={12} fill={INK2}>
          Neighborhood
        </Note>
        <Note x={85} y={114} anchor="middle" size={11} fill={INK3}>
          Hometown pride,
        </Note>
        <Note x={85} y={130} anchor="middle" size={11} fill={INK3}>
          local landmarks
        </Note>
      </g>

      {/* Arrow 3 */}
      <line x1="595" y1="110" x2="610" y2="110" stroke={RULE} strokeWidth="2" />

      {/* 4. Group */}
      <g transform="translate(615, 35)">
        <rect
          x="0"
          y="0"
          width="155"
          height="150"
          rx="10"
          fill={PAPER}
          stroke={SIGNAL}
          strokeWidth="2"
        />
        <Key x={77} y={30} anchor="middle" fill={SIGNAL}>
          Level 04
        </Key>
        <Note x={77} y={58} anchor="middle" weight="600" size={15} fill={INK}>
          Group
        </Note>
        <line x1="20" y1="72" x2="135" y2="72" stroke={RULE} strokeWidth="1" />
        <Note x={77} y={94} anchor="middle" size={12} fill={INK2}>
          Subcultures
        </Note>
        <Note x={77} y={114} anchor="middle" size={11} fill={INK3}>
          Sports teams, fandoms,
        </Note>
        <Note x={77} y={130} anchor="middle" size={11} fill={INK3}>
          social causes
        </Note>
      </g>
    </svg>
  );
}

/**
 * 3. BrandPersonalityDimensions
 * Jennifer Aaker's 5 dimensions of brand personality:
 * Sincerity, Excitement, Competence, Sophistication, Ruggedness
 */
export function BrandPersonalityDimensions() {
  const dimensions = [
    {
      title: "Sincerity",
      traits: "Honest, wholesome, cheerful",
      example: "Hallmark, Campbell's",
      color: COUNTER,
    },
    {
      title: "Excitement",
      traits: "Daring, spirited, modern",
      example: "Apple, Red Bull",
      color: SIGNAL,
    },
    {
      title: "Competence",
      traits: "Reliable, intelligent, leader",
      example: "Volvo, Google",
      color: AFFIRM,
    },
    {
      title: "Sophistication",
      traits: "Upper class, glamorous, charming",
      example: "Chanel, Rolex",
      color: SIGNAL,
    },
    {
      title: "Ruggedness",
      traits: "Outdoorsy, tough, durable",
      example: "Jeep, Patagonia",
      color: COUNTER,
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 w-full my-3">
      {dimensions.map((dim) => (
        <div
          key={dim.title}
          className="rounded-lg border p-3 flex flex-col justify-between"
          style={{
            borderColor: dim.color,
            backgroundColor: "var(--paper-2)",
          }}
        >
          <div>
            <span
              className="text-[10px] font-mono font-semibold uppercase tracking-wider block mb-1"
              style={{ color: dim.color }}
            >
              Dimension
            </span>
            <h4
              className="font-serif font-bold text-base mb-1"
              style={{ color: "var(--ink)" }}
            >
              {dim.title}
            </h4>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--ink-2)" }}
            >
              {dim.traits}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[var(--rule)]">
            <span
              className="text-[10px] uppercase font-mono tracking-wider block"
              style={{ color: "var(--ink-3)" }}
            >
              Ex:
            </span>
            <p className="text-xs font-medium" style={{ color: "var(--ink)" }}>
              {dim.example}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 4. AioFramework
 * Visual diagram breaking down Activities, Interests, and Opinions
 */
export function AioFramework() {
  return (
    <svg
      viewBox="0 0 800 220"
      className="w-full h-auto"
      style={{ maxHeight: "230px" }}
    >
      {/* Three columns: Activities, Interests, Opinions */}
      {/* 1. Activities */}
      <g transform="translate(30, 25)">
        <rect
          x="0"
          y="0"
          width="225"
          height="170"
          rx="10"
          fill={PAPER}
          stroke={SIGNAL}
          strokeWidth="2"
        />
        <Key x={112} y={30} anchor="middle" fill={SIGNAL} size={11}>
          Behavioral Dimension
        </Key>
        <Note x={112} y={55} anchor="middle" weight="600" size={16} fill={INK}>
          Activities
        </Note>
        <line x1="20" y1="70" x2="205" y2="70" stroke={RULE} strokeWidth="1" />
        <Note x={30} y={95} size={12} fill={INK2}>
          • Daily work &amp; professions
        </Note>
        <Note x={30} y={118} size={12} fill={INK2}>
          • Hobbies &amp; recreation
        </Note>
        <Note x={30} y={141} size={12} fill={INK2}>
          • Social events &amp; club outings
        </Note>
        <Note x={30} y={160} size={11} fill={INK3}>
          Focus: How consumers spend time
        </Note>
      </g>

      {/* 2. Interests */}
      <g transform="translate(285, 25)">
        <rect
          x="0"
          y="0"
          width="225"
          height="170"
          rx="10"
          fill={PAPER}
          stroke={COUNTER}
          strokeWidth="2"
        />
        <Key x={112} y={30} anchor="middle" fill={COUNTER} size={11}>
          Focus of Attention
        </Key>
        <Note x={112} y={55} anchor="middle" weight="600" size={16} fill={INK}>
          Interests
        </Note>
        <line x1="20" y1="70" x2="205" y2="70" stroke={RULE} strokeWidth="1" />
        <Note x={30} y={95} size={12} fill={INK2}>
          • Family &amp; home living
        </Note>
        <Note x={30} y={118} size={12} fill={INK2}>
          • Food, fashion &amp; nutrition
        </Note>
        <Note x={30} y={141} size={12} fill={INK2}>
          • Community &amp; achievements
        </Note>
        <Note x={30} y={160} size={11} fill={INK3}>
          Focus: What consumers value most
        </Note>
      </g>

      {/* 3. Opinions */}
      <g transform="translate(540, 25)">
        <rect
          x="0"
          y="0"
          width="230"
          height="170"
          rx="10"
          fill={PAPER}
          stroke={AFFIRM}
          strokeWidth="2"
        />
        <Key x={115} y={30} anchor="middle" fill={AFFIRM} size={11}>
          Beliefs &amp; Judgments
        </Key>
        <Note x={115} y={55} anchor="middle" weight="600" size={16} fill={INK}>
          Opinions
        </Note>
        <line x1="20" y1="70" x2="210" y2="70" stroke={RULE} strokeWidth="1" />
        <Note x={30} y={95} size={12} fill={INK2}>
          • Views on oneself &amp; society
        </Note>
        <Note x={30} y={118} size={12} fill={INK2}>
          • Politics &amp; public affairs
        </Note>
        <Note x={30} y={141} size={12} fill={INK2}>
          • Business, economy &amp; future
        </Note>
        <Note x={30} y={160} size={11} fill={INK3}>
          Focus: How consumers view the world
        </Note>
      </g>
    </svg>
  );
}
