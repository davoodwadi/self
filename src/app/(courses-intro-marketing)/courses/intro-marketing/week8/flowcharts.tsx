import { Edge, Node } from "@xyflow/react";

// Color Semantics:
// - Charcoal: Standard/cost approaches and market logic
// - Crimson: Value and high-impact approaches
export const pricingApproachesFlow = {
  aiGeneratedNodes: [
    {
      id: "root",
      position: { x: 320, y: 0 },
      data: {
        label: "Pricing Strategy",
        sublabel: "Core Approaches",
        icon: "tag",
        color: "var(--crimson)",
      },
    },
    {
      id: "1",
      position: { x: 0, y: 200 },
      data: {
        label: "Cost-Based",
        sublabel: "Design -> Cost -> Price",
        icon: "calculator",
        color: "var(--charcoal)",
      },
    },
    {
      id: "2",
      position: { x: 320, y: 200 },
      data: {
        label: "Value-Based",
        sublabel: "Needs -> Value -> Price",
        icon: "star",
        color: "var(--crimson)",
      },
    },
    {
      id: "3",
      position: { x: 640, y: 200 },
      data: {
        label: "Competition-Based",
        sublabel: "Market -> Competitors -> Price",
        icon: "bar-chart-2",
        color: "var(--charcoal)",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e-root-1",
      source: "root",
      target: "1",
      type: "smoothstep",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--charcoal)", opacity: 0.55 },
    },
    {
      id: "e-root-2",
      source: "root",
      target: "2",
      type: "smoothstep",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--crimson)", opacity: 0.55 },
    },
    {
      id: "e-root-3",
      source: "root",
      target: "3",
      type: "smoothstep",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      animated: true,
      style: { strokeWidth: 2, stroke: "var(--charcoal)", opacity: 0.55 },
    },
  ] as Edge[],
};

export const newProductPricingFlow = {
  aiGeneratedNodes: [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: {
        label: "Market-Skimming",
        sublabel: "High Initial Price",
        icon: "trending-up",
        color: "var(--crimson)",
      },
    },
    {
      id: "2",
      position: { x: 320, y: 140 },
      data: {
        label: "Lifecycle Transition",
        sublabel: "Layer by Layer",
        icon: "layers",
        color: "var(--charcoal)",
      },
    },
    {
      id: "3",
      position: { x: 640, y: 280 },
      data: {
        label: "Market-Penetration",
        sublabel: "Lower Price, High Volume",
        icon: "trending-down",
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
  ] as Edge[],
};
