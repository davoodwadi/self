/* ==========================================================================
   Week 03 Visuals — Consumer Behavior: Learning & Memory
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
 * 1. ConditioningFlow: Classical conditioning mechanism
 * Shows pairing of Unconditioned Stimulus (UCS) + Conditioned Stimulus (CS) -> Conditioned Response (CR)
 */
export function ConditioningFlow() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto"
      style={{ maxHeight: "250px" }}
    >
      <defs>
        <marker
          id="arrow-signal"
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
          id="arrow-counter"
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

      {/* Group A: Pairing Phase */}
      <rect
        x="30"
        y="25"
        width="340"
        height="190"
        rx="10"
        fill={PAPER2}
        stroke={RULE}
        strokeWidth="1.5"
      />
      <Key x={200} y={50} anchor="middle" fill={INK3}>
        Phase 1 · Conditioning Pairing
      </Key>

      {/* UCS */}
      <rect
        x="50"
        y="70"
        width="130"
        height="55"
        rx="6"
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth="2"
      />
      <Key x={115} y={92} anchor="middle" fill={COUNTER} size={10}>
        Natural Stimulus
      </Key>
      <Note x={115} y={112} anchor="middle" weight="600" size={12}>
        Upbeat Music / Energy
      </Note>

      {/* Plus */}
      <Note x={195} y={110} anchor="middle" weight="600" size={18} fill={INK3}>
        +
      </Note>

      {/* CS */}
      <rect
        x="215"
        y="70"
        width="135"
        height="55"
        rx="6"
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth="2"
      />
      <Key x={282} y={92} anchor="middle" fill={SIGNAL} size={10}>
        Neutral Brand
      </Key>
      <Note x={282} y={112} anchor="middle" weight="600" size={12}>
        Brand Logo / Can
      </Note>

      {/* Arrow Down */}
      <path
        d="M 200 135 L 200 160"
        stroke={RULE}
        strokeWidth="2"
        markerEnd="url(#arrow-counter)"
      />
      <Note x={200} y={185} anchor="middle" size={12} fill={INK2}>
        Repeated pairing creates association
      </Note>

      {/* Big Transition Arrow */}
      <g transform="translate(390, 120)">
        <circle r="22" fill={PAPER} stroke={SIGNAL} strokeWidth="2" />
        <path
          d="M -8 0 L 8 0 M 3 -5 L 8 0 L 3 5"
          fill="none"
          stroke={SIGNAL}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Group B: Learned Result */}
      <rect
        x="430"
        y="25"
        width="340"
        height="190"
        rx="10"
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth="2"
      />
      <Key x={600} y={50} anchor="middle" fill={SIGNAL}>
        Phase 2 · Conditioned Outcome
      </Key>

      {/* Brand alone */}
      <rect
        x="455"
        y="75"
        width="120"
        height="65"
        rx="6"
        fill={PAPER2}
        stroke={SIGNAL}
        strokeWidth="1.5"
      />
      <Key x={515} y={98} anchor="middle" fill={SIGNAL} size={10}>
        Conditioned Stimulus
      </Key>
      <Note x={515} y={122} anchor="middle" weight="600" size={13}>
        Brand Cue Alone
      </Note>

      {/* Arrow to response */}
      <line
        x1="585"
        y1="108"
        x2="625"
        y2="108"
        stroke={SIGNAL}
        strokeWidth="2"
        markerEnd="url(#arrow-signal)"
      />

      {/* Response */}
      <rect
        x="635"
        y="75"
        width="115"
        height="65"
        rx="6"
        fill={PAPER2}
        stroke={AFFIRM}
        strokeWidth="1.5"
      />
      <Key x={692} y={98} anchor="middle" fill={AFFIRM} size={10}>
        Learned Response
      </Key>
      <Note x={692} y={122} anchor="middle" weight="600" size={13}>
        Positive Emotion
      </Note>

      <Note x={600} y={185} anchor="middle" size={12} fill={INK2}>
        Automatic positive reaction without music
      </Note>
    </svg>
  );
}

/**
 * 2. GeneralizationChart: Stimulus generalization vs Discrimination
 */
export function GeneralizationChart() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto"
      style={{ maxHeight: "250px" }}
    >
      {/* Box 1: National Brand Leader */}
      <rect
        x="50"
        y="30"
        width="210"
        height="180"
        rx="8"
        fill={PAPER}
        stroke={COUNTER}
        strokeWidth="2.5"
      />
      <Key x={155} y={60} anchor="middle" fill={COUNTER}>
        Market Leader
      </Key>
      <Note x={155} y={92} anchor="middle" weight="600" size={15}>
        Established Brand
      </Note>
      <line x1="80" y1="110" x2="230" y2="110" stroke={RULE} strokeWidth="1" />
      <Note x={155} y={135} anchor="middle" size={12} fill={INK2}>
        Signature blue bottle
      </Note>
      <Note x={155} y={155} anchor="middle" size={12} fill={INK2}>
        Recognized badge &amp; typography
      </Note>
      <Note x={155} y={180} anchor="middle" size={11} fill={INK3}>
        Built over years of ads
      </Note>

      {/* Middle Comparison: Generalization */}
      <g transform="translate(300, 120)">
        <path
          d="M 0 -25 L 30 0 L 0 25"
          fill="none"
          stroke={SIGNAL}
          strokeWidth="2"
        />
        <Key x={15} y={-35} anchor="middle" fill={SIGNAL} size={10}>
          Generalization
        </Key>
      </g>

      {/* Box 2: Store Brand Mimicry */}
      <rect
        x="350"
        y="30"
        width="210"
        height="180"
        rx="8"
        fill={PAPER2}
        stroke={SIGNAL}
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <Key x={455} y={60} anchor="middle" fill={SIGNAL}>
        Store Brand
      </Key>
      <Note x={455} y={92} anchor="middle" weight="600" size={15}>
        Stimulus Generalization
      </Note>
      <line x1="380" y1="110" x2="530" y2="110" stroke={RULE} strokeWidth="1" />
      <Note x={455} y={135} anchor="middle" size={12} fill={INK2}>
        Similar blue bottle &amp; font
      </Note>
      <Note x={455} y={155} anchor="middle" size={12} fill={INK2}>
        Adjacent shelf position
      </Note>
      <Note x={455} y={180} anchor="middle" size={11} fill={INK3}>
        Leverages learned familiarity
      </Note>

      {/* Box 3: Stimulus Discrimination */}
      <rect
        x="590"
        y="30"
        width="170"
        height="180"
        rx="8"
        fill={PAPER}
        stroke={AFFIRM}
        strokeWidth="2"
      />
      <Key x={675} y={60} anchor="middle" fill={AFFIRM}>
        Discrimination
      </Key>
      <Note x={675} y={92} anchor="middle" weight="600" size={14}>
        Unique Identity
      </Note>
      <line x1="610" y1="110" x2="740" y2="110" stroke={RULE} strokeWidth="1" />
      <Note x={675} y={135} anchor="middle" size={12} fill={INK2}>
        Patented bottle shape
      </Note>
      <Note x={675} y={155} anchor="middle" size={12} fill={INK2}>
        Proprietary formula cue
      </Note>
      <Note x={675} y={180} anchor="middle" size={11} fill={INK3}>
        Stands apart from copies
      </Note>
    </svg>
  );
}

/**
 * 3. InstrumentalMatrix: Positive reinforcement, Negative reinforcement, Punishment
 */
export function InstrumentalMatrix() {
  const quadrants = [
    {
      title: "Positive Reinforcement",
      type: "Reward Added",
      effect: "Behavior Increases",
      example: "Loyalty points, thank-you coupons",
      color: AFFIRM,
    },
    {
      title: "Negative Reinforcement",
      type: "Unpleasant Removed",
      effect: "Behavior Increases",
      example: "Pain reliever removes headache",
      color: COUNTER,
    },
    {
      title: "Punishment",
      type: "Negative Consequence",
      effect: "Behavior Decreases",
      example: "Late payment fee, cancellation charge",
      color: SIGNAL,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {quadrants.map((q, idx) => (
        <div
          key={idx}
          className="p-4 rounded-lg bg-[var(--paper-2)] border border-[var(--rule)] flex flex-col justify-between"
        >
          <div>
            <div
              className="text-xs font-semibold tracking-wider uppercase mb-1"
              style={{ color: q.color }}
            >
              {q.type}
            </div>
            <div className="text-base font-serif font-medium text-[var(--ink)]">
              {q.title}
            </div>
            <div className="mt-2 text-sm text-[var(--ink-2)]">
              <strong>Outcome:</strong> {q.effect}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--rule)] text-xs text-[var(--ink-3)]">
            <span className="font-semibold text-[var(--ink-2)]">Example: </span>
            {q.example}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 4. MemoryStorageFlow: Sensory Memory -> Short-Term Memory -> Long-Term Memory
 */
export function MemoryStorageFlow() {
  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto"
      style={{ maxHeight: "250px" }}
    >
      <defs>
        <marker
          id="flow-arrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill={SIGNAL} />
        </marker>
      </defs>

      {/* Sensory Memory */}
      <rect
        x="40"
        y="40"
        width="190"
        height="160"
        rx="8"
        fill={PAPER2}
        stroke={RULE}
        strokeWidth="2"
      />
      <Key x={135} y={70} anchor="middle" fill={INK3}>
        1. Sensory Memory
      </Key>
      <Note x={135} y={100} anchor="middle" weight="600" size={14}>
        Raw Senses
      </Note>
      <Note x={135} y={125} anchor="middle" size={12} fill={INK2}>
        Duration: &lt; 2 seconds
      </Note>
      <Note x={135} y={145} anchor="middle" size={12} fill={INK2}>
        High sensory capacity
      </Note>
      <Note
        x={135}
        y={175}
        anchor="middle"
        size={11}
        fill={SIGNAL}
        weight="600"
      >
        Requires Attention
      </Note>

      {/* Arrow 1 to 2 */}
      <line
        x1="240"
        y1="120"
        x2="280"
        y2="120"
        stroke={SIGNAL}
        strokeWidth="2"
        markerEnd="url(#flow-arrow)"
      />
      <Key x={260} y={110} anchor="middle" size={9} fill={SIGNAL}>
        Attention
      </Key>

      {/* Short-Term Memory */}
      <rect
        x="290"
        y="40"
        width="210"
        height="160"
        rx="8"
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth="2.5"
      />
      <Key x={395} y={70} anchor="middle" fill={SIGNAL}>
        2. Short-Term Memory
      </Key>
      <Note x={395} y={100} anchor="middle" weight="600" size={14}>
        Working Memory
      </Note>
      <Note x={395} y={125} anchor="middle" size={12} fill={INK2}>
        Duration: ~20 seconds
      </Note>
      <Note x={395} y={145} anchor="middle" size={12} fill={INK2}>
        Limited: 4 to 7 chunks
      </Note>
      <Note
        x={395}
        y={175}
        anchor="middle"
        size={11}
        fill={COUNTER}
        weight="600"
      >
        Requires Rehearsal
      </Note>

      {/* Arrow 2 to 3 */}
      <line
        x1="510"
        y1="120"
        x2="550"
        y2="120"
        stroke={SIGNAL}
        strokeWidth="2"
        markerEnd="url(#flow-arrow)"
      />
      <Key x={530} y={110} anchor="middle" size={9} fill={COUNTER}>
        Elaboration
      </Key>

      {/* Long-Term Memory */}
      <rect
        x="560"
        y="40"
        width="200"
        height="160"
        rx="8"
        fill={PAPER2}
        stroke={COUNTER}
        strokeWidth="2.5"
      />
      <Key x={660} y={70} anchor="middle" fill={COUNTER}>
        3. Long-Term Memory
      </Key>
      <Note x={660} y={100} anchor="middle" weight="600" size={14}>
        Associative Network
      </Note>
      <Note x={660} y={125} anchor="middle" size={12} fill={INK2}>
        Duration: Days to decades
      </Note>
      <Note x={660} y={145} anchor="middle" size={12} fill={INK2}>
        Unlimited capacity
      </Note>
      <Note
        x={660}
        y={175}
        anchor="middle"
        size={11}
        fill={AFFIRM}
        weight="600"
      >
        Retrieval via Cues
      </Note>
    </svg>
  );
}

/**
 * 5. BrandAssociativeNetwork: Web of concepts branching from a brand node
 */
export function BrandAssociativeNetwork() {
  const nodes = [
    { label: "Marathon", x: 180, y: 55, color: INK3 },
    { label: "Running Shoes", x: 140, y: 120, color: COUNTER },
    { label: "High Performance", x: 220, y: 185, color: INK3 },
    { label: "Athletic Heroes", x: 570, y: 55, color: INK3 },
    { label: "'Just Do It'", x: 630, y: 120, color: SIGNAL },
    { label: "Swoosh Logo", x: 580, y: 185, color: COUNTER },
  ];

  return (
    <svg
      viewBox="0 0 800 240"
      className="w-full h-auto"
      style={{ maxHeight: "250px" }}
    >
      {/* Connecting Spider-web Lines */}
      {nodes.map((node, i) => (
        <line
          key={i}
          x1="400"
          y1="120"
          x2={node.x}
          y2={node.y}
          stroke={RULE}
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      ))}
      {/* Sub-connections */}
      <line x1="180" y1="55" x2="140" y2="120" stroke={RULE} strokeWidth="1" />
      <line x1="140" y1="120" x2="220" y2="185" stroke={RULE} strokeWidth="1" />
      <line x1="570" y1="55" x2="630" y2="120" stroke={RULE} strokeWidth="1" />
      <line x1="630" y1="120" x2="580" y2="185" stroke={RULE} strokeWidth="1" />

      {/* Central Brand Node */}
      <circle
        r="52"
        cx="400"
        cy="120"
        fill={PAPER}
        stroke={SIGNAL}
        strokeWidth="3"
      />
      <circle
        r="44"
        cx="400"
        cy="120"
        fill={PAPER2}
        stroke={RULE}
        strokeWidth="1"
      />
      <Key x={400} y={112} anchor="middle" fill={SIGNAL} size={10}>
        Core Node
      </Key>
      <Note x={400} y={132} anchor="middle" weight="600" size={14}>
        Brand Name
      </Note>

      {/* Associated Concept Nodes */}
      {nodes.map((node, i) => (
        <g key={i} transform={`translate(${node.x}, ${node.y})`}>
          <rect
            x="-60"
            y="-18"
            width="120"
            height="36"
            rx="18"
            fill={PAPER}
            stroke={node.color}
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="12"
            fontWeight="500"
            fill={INK}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
