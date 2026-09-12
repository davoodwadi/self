import { 
  Package, 
  Handshake, 
  Building2, 
  Brain, 
  Users, 
  LineChart, 
  Target, 
  MessageSquare 
} from "lucide-react";

// Semantic Color Palette
// Charcoal: Low/Medium Risk Modes, Neutral Processing (#17160F, #3B382E)
// Crimson: High Risk/Control Mode, Core Concepts (#B23A15, #8A2B0E)

// Diagram 1: Market entry risk and control
// Shape: Cascading flow (step-down diagonal)
// Charcoal for exporting and joint venturing, Crimson for direct investment to highlight the risk/control tradeoff.
export const marketEntryFlow = {
  variant: "broadsheet" as const,
  aiGeneratedNodes: [
    {
      id: "exporting",
      position: { x: 0, y: 0 },
      data: {
        label: "Exporting",
        sublabel: "Low Risk & Control",
        icon: <Package size={20} strokeWidth={2} />,
        color: "#3B382E", 
      },
    },
    {
      id: "joint-venturing",
      position: { x: 320, y: 160 },
      data: {
        label: "Joint Venturing",
        sublabel: "Shared Risk & Control",
        icon: <Handshake size={20} strokeWidth={2} />,
        color: "#17160F", 
      },
    },
    {
      id: "direct-investment",
      position: { x: 640, y: 320 },
      data: {
        label: "Direct Investment",
        sublabel: "High Risk & Control",
        icon: <Building2 size={20} strokeWidth={2} />,
        color: "#B23A15", 
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "e1",
      source: "exporting",
      target: "joint-venturing",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      label: "Increase Commitment",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e2",
      source: "joint-venturing",
      target: "direct-investment",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      label: "Maximize Control",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
  ],
};

// Diagram 2: AI Applications in Marketing
// Shape: Hub-and-spoke
// Crimson for the core AI hub, Charcoal for the application spokes.
export const aiApplicationsFlow = {
  variant: "broadsheet" as const,
  aiGeneratedNodes: [
    {
      id: "ai-core",
      position: { x: 320, y: 160 },
      data: {
        label: "AI in Marketing",
        sublabel: "Core Technology",
        icon: <Brain size={20} strokeWidth={2} />,
        color: "#B23A15", 
      },
    },
    {
      id: "data-analysis",
      position: { x: 320, y: 0 },
      data: {
        label: "Data Analysis",
        sublabel: "Processing Info",
        icon: <LineChart size={20} strokeWidth={2} />,
        color: "#3B382E", 
      },
    },
    {
      id: "consumer-insights",
      position: { x: 0, y: 160 },
      data: {
        label: "Consumer Insights",
        sublabel: "Understanding Users",
        icon: <Users size={20} strokeWidth={2} />,
        color: "#3B382E", 
      },
    },
    {
      id: "predictive-modeling",
      position: { x: 640, y: 160 },
      data: {
        label: "Predictive Modeling",
        sublabel: "Forecasting Behavior",
        icon: <Target size={20} strokeWidth={2} />,
        color: "#3B382E", 
      },
    },
    {
      id: "customer-service",
      position: { x: 320, y: 320 },
      data: {
        label: "Customer Service",
        sublabel: "Automated Chatbots",
        icon: <MessageSquare size={20} strokeWidth={2} />,
        color: "#3B382E", 
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "hub-top",
      source: "ai-core",
      target: "data-analysis",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "hub-left",
      source: "ai-core",
      target: "consumer-insights",
      sourceHandle: "left-source",
      targetHandle: "right",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "hub-right",
      source: "ai-core",
      target: "predictive-modeling",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "hub-bottom",
      source: "ai-core",
      target: "customer-service",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55 },
    },
  ],
};
