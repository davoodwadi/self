import { Edge, Node } from "@xyflow/react";
import {
  Activity,
  BookOpen,
  Box,
  Brain,
  CheckCircle,
  Copy,
  Cpu,
  Database,
  Factory,
  Filter,
  HelpCircle,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

// Crimson = transformation path, Charcoal = governance context, Gold = synthesis node
export const transformativeShiftsFlow = {
  aiGeneratedNodes: [
    {
      id: "shift-1",
      position: { x: 0, y: 0 },
      data: {
        label: "Simulation Shift",
        sublabel: "Dynamic Learning",
        icon: <Activity size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "shift-2",
      position: { x: 0, y: 160 },
      data: {
        label: "Generative Shift",
        sublabel: "Mainstream Engineering",
        icon: <Zap size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "shift-3",
      position: { x: 0, y: 320 },
      data: {
        label: "Compliance Shift",
        sublabel: "Code Governance",
        icon: <ShieldCheck size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "center",
      position: { x: 320, y: 160 },
      data: {
        label: "Product Dev 2.0",
        sublabel: "Integrated Operating Model",
        icon: <Cpu size={20} strokeWidth={2} />,
        color: "#D4AF37",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1",
      source: "shift-1",
      target: "center",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e2",
      source: "shift-2",
      target: "center",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e3",
      source: "shift-3",
      target: "center",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
  ] as Edge[],
};

// Crimson = generative exploration, Charcoal = evaluation, Gold = final decision
export const divergentConvergentFlow = {
  aiGeneratedNodes: [
    {
      id: "problem",
      position: { x: 0, y: 80 },
      data: {
        label: "Problem Framing",
        sublabel: "Scope Definition",
        icon: <HelpCircle size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "diverge",
      position: { x: 320, y: 80 },
      data: {
        label: "AI Divergence",
        sublabel: "Option Expansion",
        icon: <Brain size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "converge",
      position: { x: 640, y: 80 },
      data: {
        label: "Human Convergence",
        sublabel: "Selection Refinement",
        icon: <Filter size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "solution",
      position: { x: 960, y: 80 },
      data: {
        label: "Solution Choice",
        sublabel: "Launch Candidate",
        icon: <CheckCircle size={20} strokeWidth={2} />,
        color: "#D4AF37",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1-div",
      source: "problem",
      target: "diverge",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e1-conv",
      source: "diverge",
      target: "converge",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#1A1A1D", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e2-div",
      source: "converge",
      target: "solution",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#D4AF37", strokeWidth: 2, opacity: 0.6 },
    },
    // Feedback loop from human filtering back to AI exploration
    {
      id: "e-loop",
      source: "converge",
      target: "diverge",
      sourceHandle: "top-source",
      targetHandle: "top",
      label: "Iterate",
      type: "smoothstep",
      animated: false,
      style: {
        stroke: "#A52A2A",
        strokeWidth: 2,
        opacity: 0.55,
        strokeDasharray: "5,5",
      },
    },
  ] as Edge[],
};

// Charcoal = scientific input constraints, Crimson = model optimization, Gold = deployment output
export const pinnsFlow = {
  aiGeneratedNodes: [
    {
      id: "data",
      position: { x: 0, y: 80 },
      data: {
        label: "Sparse Data",
        sublabel: "Measured Signals",
        icon: <Database size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "physics",
      position: { x: 320, y: 80 },
      data: {
        label: "Physics Laws",
        sublabel: "Equation Constraints",
        icon: <BookOpen size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "model",
      position: { x: 640, y: 80 },
      data: {
        label: "PINN Model",
        sublabel: "Loss-Balanced Training",
        color: "#8B0000",
        icon: <Settings size={20} strokeWidth={2} />,
      },
    },
    {
      id: "output",
      position: { x: 960, y: 80 },
      data: {
        label: "Simulation",
        sublabel: "Real-Time Use",
        icon: <Zap size={20} strokeWidth={2} />,
        color: "#D4AF37",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1",
      source: "data",
      target: "physics",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#1A1A1D", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e2",
      source: "physics",
      target: "model",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e3",
      source: "model",
      target: "output",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#D4AF37", strokeWidth: 2, opacity: 0.6 },
    },
  ] as Edge[],
};

// Charcoal = physical system, Crimson = cognitive transformation, Gold = optimization loop
export const digitalTwinFlow = {
  aiGeneratedNodes: [
    {
      id: "physical",
      position: { x: 0, y: 80 },
      data: {
        label: "Physical Asset",
        sublabel: "Real World",
        icon: <Box size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "digital",
      position: { x: 320, y: 80 },
      data: {
        label: "Digital Twin",
        sublabel: "Virtual Replica",
        icon: <Copy size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "reasoning",
      position: { x: 320, y: 360 },
      data: {
        label: "AI Reasoning",
        sublabel: "Predictive Logic",
        icon: <Brain size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "action",
      position: { x: 0, y: 360 },
      data: {
        label: "Auto Action",
        sublabel: "Maintenance",
        icon: <Wrench size={20} strokeWidth={2} />,
        color: "#D4AF37",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1",
      source: "physical",
      target: "digital",
      sourceHandle: "right-source",
      targetHandle: "left",
      label: "Live Data Stream",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e2",
      source: "digital",
      target: "reasoning",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e3",
      source: "reasoning",
      target: "action",
      sourceHandle: "left-source",
      targetHandle: "right",
      label: "Decision",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#D4AF37", strokeWidth: 2, opacity: 0.6 },
    },
    // Feedback loop: action results inform the next monitoring cycle
    {
      id: "e4",
      source: "action",
      target: "physical",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      label: "Optimize",
      type: "smoothstep",
      animated: false,
      style: {
        stroke: "#A52A2A",
        strokeWidth: 2,
        opacity: 0.55,
        strokeDasharray: "5,5",
      },
    },
  ] as Edge[],
};

// Crimson = generative path, Charcoal = customer context, Gold = approved execution
export const generativeLoopFlow = {
  aiGeneratedNodes: [
    {
      id: "customer",
      position: { x: 0, y: 80 },
      data: {
        label: "Customer Input",
        sublabel: "Need Signals",
        icon: <Users size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "gen-ai",
      position: { x: 320, y: 80 },
      data: {
        label: "Generative Engine",
        sublabel: "Design Variations",
        icon: <RefreshCw size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "constraints",
      position: { x: 640, y: 80 },
      data: {
        label: "Constraint Check",
        sublabel: "Manufacturability",
        icon: <ShieldCheck size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "factory",
      position: { x: 960, y: 80 },
      data: {
        label: "Smart Factory",
        sublabel: "Approved Build",
        icon: <Factory size={20} strokeWidth={2} />,
        color: "#D4AF37",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1",
      source: "customer",
      target: "gen-ai",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      label: "Preferences",
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e2",
      source: "gen-ai",
      target: "constraints",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#8B0000", strokeWidth: 2, opacity: 0.55 },
    },
    // Feedback loop if constraints fail
    {
      id: "e-retry",
      source: "constraints",
      target: "gen-ai",
      sourceHandle: "top-source",
      targetHandle: "top",
      type: "smoothstep",
      label: "Retry",
      animated: false,
      style: {
        stroke: "#A52A2A",
        strokeWidth: 2,
        opacity: 0.55,
        strokeDasharray: "5,5",
      },
    },
    {
      id: "e3",
      source: "constraints",
      target: "factory",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      label: "Approved",
      style: { stroke: "#D4AF37", strokeWidth: 2, opacity: 0.6 },
    },
  ] as Edge[],
};
