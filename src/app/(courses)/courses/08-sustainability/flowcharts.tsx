import {
  Binary,
  Brain,
  Cog,
  Factory,
  Flame,
  FlaskConical,
  Laptop,
  Leaf,
  Pickaxe,
  Recycle,
  Ruler,
  Scissors,
  ShoppingCart,
  Target,
  Trash2,
} from "lucide-react";

// Deep crimson for primary/risk path
const PRIMARY = "#7f1d1d";
// Slate for neutral processing steps
const NEUTRAL = "#1e293b";
// Deep green for eco/sustainability focus
const SUSTAINABLE = "#14532d";

export const hardwareLifecycleFlow = {
  aiGeneratedNodes: [
    {
      id: "A",
      position: { x: 0, y: 0 },
      data: {
        label: "Extraction",
        sublabel: "Raw Materials",
        icon: <Pickaxe size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "B",
      position: { x: 320, y: 160 },
      data: {
        label: "Manufacturing",
        sublabel: "Assembly & Testing",
        icon: <Factory size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "C",
      position: { x: 640, y: 320 },
      data: {
        label: "Use Phase",
        sublabel: "Active Deployment",
        icon: <Laptop size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "D",
      position: { x: 960, y: 480 },
      data: {
        label: "End of Life",
        sublabel: "E-Waste Processing",
        icon: <Recycle size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "eA-B",
      source: "A",
      target: "B",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: {
        stroke: PRIMARY,
        strokeWidth: 1.5,
        opacity: 0.6,
      },
    },
    {
      id: "eB-C",
      source: "B",
      target: "C",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: {
        stroke: PRIMARY,
        strokeWidth: 1.5,
        opacity: 0.6,
      },
    },
    {
      id: "eC-D",
      source: "C",
      target: "D",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: {
        stroke: PRIMARY,
        strokeWidth: 1.5,
        opacity: 0.6,
      },
    },
  ],
};

export const redGreenFlow = {
  aiGeneratedNodes: [
    {
      id: "R1",
      position: { x: 0, y: 20 },
      data: {
        label: "Maximize Accuracy",
        sublabel: "Resource Intensive",
        icon: <Target size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "R2",
      position: { x: 300, y: 20 },
      data: {
        label: "Scale Complexity",
        sublabel: "Massive Models",
        icon: <Brain size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "R3",
      position: { x: 600, y: 20 },
      data: {
        label: "Red AI",
        sublabel: "High Carbon Cost",
        icon: <Flame size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "G1",
      position: { x: 0, y: 180 },
      data: {
        label: "Efficiency Focus",
        sublabel: "Sustainable Metrics",
        icon: <Ruler size={20} strokeWidth={1.5} />,
        color: SUSTAINABLE,
      },
    },
    {
      id: "G2",
      position: { x: 300, y: 180 },
      data: {
        label: "Model Optimization",
        sublabel: "Lean Architecture",
        icon: <Cog size={20} strokeWidth={1.5} />,
        color: SUSTAINABLE,
      },
    },
    {
      id: "G3",
      position: { x: 600, y: 180 },
      data: {
        label: "Green AI",
        sublabel: "Low Footprint",
        icon: <Leaf size={20} strokeWidth={1.5} />,
        color: SUSTAINABLE,
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "eR1-R2",
      source: "R1",
      target: "R2",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: PRIMARY, strokeWidth: 1.5, opacity: 0.6 },
    },
    {
      id: "eR2-R3",
      source: "R2",
      target: "R3",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: PRIMARY, strokeWidth: 1.5, opacity: 0.6 },
    },
    {
      id: "eG1-G2",
      source: "G1",
      target: "G2",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: SUSTAINABLE, strokeWidth: 1.5, opacity: 0.6 },
    },
    {
      id: "eG2-G3",
      source: "G2",
      target: "G3",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: SUSTAINABLE, strokeWidth: 1.5, opacity: 0.6 },
    },
  ],
};

export const compressionFlow = {
  aiGeneratedNodes: [
    {
      id: "Input",
      position: { x: 280, y: 0 },
      data: {
        label: "Generalist AI",
        sublabel: "Massive Parameters",
        icon: <Brain size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "Q",
      position: { x: 0, y: 160 },
      data: {
        label: "Quantization",
        sublabel: "Lower Bit Precision",
        icon: <Binary size={20} strokeWidth={1.5} />,
        color: NEUTRAL,
      },
    },
    {
      id: "P",
      position: { x: 280, y: 160 },
      data: {
        label: "Pruning",
        sublabel: "Sparse Weights",
        icon: <Scissors size={20} strokeWidth={1.5} />,
        color: NEUTRAL,
      },
    },
    {
      id: "D",
      position: { x: 560, y: 160 },
      data: {
        label: "Distillation",
        sublabel: "Knowledge Transfer",
        icon: <FlaskConical size={20} strokeWidth={1.5} />,
        color: NEUTRAL,
      },
    },
    {
      id: "Output",
      position: { x: 280, y: 320 },
      data: {
        label: "Green Deployment",
        sublabel: "Efficient AI Model",
        icon: <Leaf size={20} strokeWidth={1.5} />,
        color: SUSTAINABLE,
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "eInput-Q",
      source: "Input",
      target: "Q",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { stroke: PRIMARY, strokeWidth: 1.5, opacity: 0.5 },
    },
    {
      id: "eInput-P",
      source: "Input",
      target: "P",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { stroke: PRIMARY, strokeWidth: 1.5, opacity: 0.5 },
    },
    {
      id: "eInput-D",
      source: "Input",
      target: "D",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { stroke: PRIMARY, strokeWidth: 1.5, opacity: 0.5 },
    },
    {
      id: "eQ-Output",
      source: "Q",
      target: "Output",
      sourceHandle: "bottom-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: SUSTAINABLE, strokeWidth: 1.5, opacity: 0.6 },
    },
    {
      id: "eP-Output",
      source: "P",
      target: "Output",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { stroke: SUSTAINABLE, strokeWidth: 1.5, opacity: 0.6 },
    },
    {
      id: "eD-Output",
      source: "D",
      target: "Output",
      sourceHandle: "bottom-source",
      targetHandle: "right",
      type: "smoothstep",
      animated: true,
      style: { stroke: SUSTAINABLE, strokeWidth: 1.5, opacity: 0.6 },
    },
  ],
};

export const circularEconomyFlow = {
  aiGeneratedNodes: [
    {
      id: "P",
      position: { x: 280, y: 0 },
      data: {
        label: "Manufacturing",
        sublabel: "Hardware Production",
        icon: <Factory size={20} strokeWidth={1.5} />,
        color: NEUTRAL,
      },
    },
    {
      id: "C",
      position: { x: 560, y: 140 },
      data: {
        label: "Utilization",
        sublabel: "Active Lifespan",
        icon: <ShoppingCart size={20} strokeWidth={1.5} />,
        color: NEUTRAL,
      },
    },
    {
      id: "W",
      position: { x: 280, y: 280 },
      data: {
        label: "End of Life",
        sublabel: "E-Waste Accumulation",
        icon: <Trash2 size={20} strokeWidth={1.5} />,
        color: PRIMARY,
      },
    },
    {
      id: "R",
      position: { x: 0, y: 140 },
      data: {
        label: "AI Sorting",
        sublabel: "Material Recovery",
        icon: <Recycle size={20} strokeWidth={1.5} />,
        color: SUSTAINABLE,
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "eP-C",
      source: "P",
      target: "C",
      sourceHandle: "right-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { stroke: NEUTRAL, strokeWidth: 1.5, opacity: 0.5 },
    },
    {
      id: "eC-W",
      source: "C",
      target: "W",
      sourceHandle: "left-source",
      targetHandle: "right",
      type: "smoothstep",
      animated: true,
      style: { stroke: PRIMARY, strokeWidth: 1.5, opacity: 0.5 },
    },
    {
      id: "eW-R",
      source: "W",
      target: "R",
      sourceHandle: "left-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      label: "Intervention",
      style: { stroke: SUSTAINABLE, strokeWidth: 1.5, opacity: 0.7 },
    },
    {
      id: "eR-P",
      source: "R",
      target: "P",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      label: "Reintegration",
      style: { stroke: SUSTAINABLE, strokeWidth: 1.5, opacity: 0.7 },
    },
  ],
};
