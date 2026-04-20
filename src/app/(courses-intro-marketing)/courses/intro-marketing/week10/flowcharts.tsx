import { Edge, Node } from "@xyflow/react";

// Color semantics:
// Crimson (#8B0000): Center/Core Brand Identity, Primary Flow
// Charcoal (#1A1A1D): Neutral tools/stages
export const promotionMixFlow = {
  aiGeneratedNodes: [
    {
      id: "advertising",
      position: { x: 160, y: 0 },
      data: { label: "Advertising", sublabel: "Mass Reach", icon: "Megaphone", color: "#1A1A1D" }
    },
    {
      id: "public-relations",
      position: { x: 480, y: 0 },
      data: { label: "Public Relations", sublabel: "Relationships", icon: "Users", color: "#1A1A1D" }
    },
    {
      id: "imc-center",
      position: { x: 320, y: 160 },
      data: { label: "Consistent Message", sublabel: "Unified Identity", icon: "Target", color: "#8B0000" }
    },
    {
      id: "sales-promotion",
      position: { x: 0, y: 320 },
      data: { label: "Sales Promotion", sublabel: "Incentives", icon: "Tag", color: "#1A1A1D" }
    },
    {
      id: "personal-selling",
      position: { x: 320, y: 320 },
      data: { label: "Personal Selling", sublabel: "Interaction", icon: "Handshake", color: "#1A1A1D" }
    },
    {
      id: "direct-digital",
      position: { x: 640, y: 320 },
      data: { label: "Direct & Digital", sublabel: "Targeted Action", icon: "Smartphone", color: "#1A1A1D" }
    }
  ] as Node[],
  aiGeneratedEdges: [
    { id: "adv-imc", source: "advertising", target: "imc-center", sourceHandle: "bottom-source", targetHandle: "top", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#1A1A1D", opacity: 0.55 } },
    { id: "pr-imc", source: "public-relations", target: "imc-center", sourceHandle: "bottom-source", targetHandle: "top", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#1A1A1D", opacity: 0.55 } },
    { id: "sp-imc", source: "sales-promotion", target: "imc-center", sourceHandle: "top-source", targetHandle: "bottom", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#1A1A1D", opacity: 0.55 } },
    { id: "ps-imc", source: "personal-selling", target: "imc-center", sourceHandle: "top-source", targetHandle: "bottom", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#1A1A1D", opacity: 0.55 } },
    { id: "dd-imc", source: "direct-digital", target: "imc-center", sourceHandle: "top-source", targetHandle: "bottom", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#1A1A1D", opacity: 0.55 } },
  ] as Edge[]
};

// Color semantics:
// Crimson (#8B0000): Primary cascade steps
export const communicationStepsFlow = {
  aiGeneratedNodes: [
    {
      id: "step-1",
      position: { x: 0, y: 0 },
      data: { label: "Target Audience", sublabel: "Identify Receivers", icon: "Users", color: "#8B0000" }
    },
    {
      id: "step-2",
      position: { x: 320, y: 0 },
      data: { label: "Objectives", sublabel: "Determine Goals", icon: "Flag", color: "#8B0000" }
    },
    {
      id: "step-3",
      position: { x: 640, y: 0 },
      data: { label: "Design Message", sublabel: "Create Content", icon: "PenTool", color: "#8B0000" }
    },
    {
      id: "step-4",
      position: { x: 160, y: 200 },
      data: { label: "Choose Media", sublabel: "Select Channels", icon: "MonitorPlay", color: "#8B0000" }
    },
    {
      id: "step-5",
      position: { x: 480, y: 200 },
      data: { label: "Collect Feedback", sublabel: "Measure Results", icon: "MessageSquare", color: "#8B0000" }
    }
  ] as Node[],
  aiGeneratedEdges: [
    { id: "e1-2", source: "step-1", target: "step-2", sourceHandle: "right-source", targetHandle: "left", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 } },
    { id: "e2-3", source: "step-2", target: "step-3", sourceHandle: "right-source", targetHandle: "left", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 } },
    { id: "e3-4", source: "step-3", target: "step-4", sourceHandle: "bottom-source", targetHandle: "top", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 } },
    { id: "e4-5", source: "step-4", target: "step-5", sourceHandle: "right-source", targetHandle: "left", type: "smoothstep", animated: true, style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 } }
  ] as Edge[]
};
