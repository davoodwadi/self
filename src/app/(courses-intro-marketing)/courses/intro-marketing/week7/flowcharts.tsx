import { Edge, Node } from "@xyflow/react";

// Color Semantics:
// - Charcoal: Neutral or standard phases
// - Crimson: High-growth, market-facing, or critical phases
export const productLifeCycleFlow = {
  aiGeneratedNodes: [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: {
        label: "Development",
        sublabel: "Investment",
        icon: "flask-conical",
        color: "var(--charcoal)",
      },
    },
    {
      id: "2",
      position: { x: 320, y: 0 },
      data: {
        label: "Introduction",
        sublabel: "Awareness",
        icon: "rocket",
        color: "var(--crimson)",
      },
    },
    {
      id: "3",
      position: { x: 640, y: 0 },
      data: {
        label: "Growth",
        sublabel: "Expansion",
        icon: "trending-up",
        color: "var(--crimson)",
      },
    },
    {
      id: "4",
      position: { x: 0, y: 280 },
      data: {
        label: "Maturity",
        sublabel: "Defend Share",
        icon: "shield",
        color: "var(--charcoal)",
      },
    },
    {
      id: "5",
      position: { x: 320, y: 280 },
      data: {
        label: "Decline",
        sublabel: "Harvest or Drop",
        icon: "trending-down",
        color: "var(--charcoal)",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "smoothstep",
      sourceHandle: "right-source",
      targetHandle: "left",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--charcoal)", opacity: 0.55 },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      type: "smoothstep",
      sourceHandle: "right-source",
      targetHandle: "left",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "smoothstep",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      type: "smoothstep",
      sourceHandle: "right-source",
      targetHandle: "left",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--charcoal)", opacity: 0.55 },
    },
  ] as Edge[],
};

// Color Semantics:
// - Charcoal: Internal development and testing
// - Crimson: Market entry and strategy
export const newProductDevFlow = {
  aiGeneratedNodes: [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: {
        label: "Idea Generation",
        sublabel: "Sourcing",
        icon: "lightbulb",
        color: "var(--charcoal)",
      },
    },
    {
      id: "2",
      position: { x: 320, y: 0 },
      data: {
        label: "Concept Testing",
        sublabel: "Consumer Validation",
        icon: "users",
        color: "var(--charcoal)",
      },
    },
    {
      id: "3",
      position: { x: 640, y: 0 },
      data: {
        label: "Strategy & Analysis",
        sublabel: "Business Feasibility",
        icon: "target",
        color: "var(--crimson)",
      },
    },
    {
      id: "4",
      position: { x: 0, y: 280 },
      data: {
        label: "Product Dev",
        sublabel: "Prototyping",
        icon: "wrench",
        color: "var(--charcoal)",
      },
    },
    {
      id: "5",
      position: { x: 320, y: 280 },
      data: {
        label: "Commercialization",
        sublabel: "Market Launch",
        icon: "megaphone",
        color: "var(--crimson)",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "smoothstep",
      sourceHandle: "right-source",
      targetHandle: "left",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--charcoal)", opacity: 0.55 },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      type: "smoothstep",
      sourceHandle: "right-source",
      targetHandle: "left",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--charcoal)", opacity: 0.55 },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "smoothstep",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      type: "smoothstep",
      sourceHandle: "right-source",
      targetHandle: "left",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--charcoal)", opacity: 0.55 },
    },
  ] as Edge[],
};

// Color Semantics:
// - Crimson: Core concept (Service)
// - Charcoal: Four inherent characteristics of services
export const serviceCharacteristicsFlow = {
  aiGeneratedNodes: [
    {
      id: "hub",
      position: { x: 320, y: 160 },
      data: {
        label: "Service",
        sublabel: "Core Offering",
        icon: "briefcase",
        color: "var(--crimson)",
      },
    },
    {
      id: "spoke1",
      position: { x: 0, y: 0 },
      data: {
        label: "Intangibility",
        sublabel: "Cannot be seen",
        icon: "ghost",
        color: "var(--charcoal)",
      },
    },
    {
      id: "spoke2",
      position: { x: 640, y: 0 },
      data: {
        label: "Inseparability",
        sublabel: "Tied to provider",
        icon: "link",
        color: "var(--charcoal)",
      },
    },
    {
      id: "spoke3",
      position: { x: 0, y: 320 },
      data: {
        label: "Variability",
        sublabel: "Quality fluctuates",
        icon: "activity",
        color: "var(--charcoal)",
      },
    },
    {
      id: "spoke4",
      position: { x: 640, y: 320 },
      data: {
        label: "Perishability",
        sublabel: "Cannot be stored",
        icon: "clock",
        color: "var(--charcoal)",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e-hub-spoke1",
      source: "hub",
      target: "spoke1",
      type: "smoothstep",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
    {
      id: "e-hub-spoke2",
      source: "hub",
      target: "spoke2",
      type: "smoothstep",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
    {
      id: "e-hub-spoke3",
      source: "hub",
      target: "spoke3",
      type: "smoothstep",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
    {
      id: "e-hub-spoke4",
      source: "hub",
      target: "spoke4",
      type: "smoothstep",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
  ] as Edge[],
};
