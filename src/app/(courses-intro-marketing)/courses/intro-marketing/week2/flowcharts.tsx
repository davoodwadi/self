import { Edge, Node } from "@xyflow/react";
import { Globe, Landmark, Coins, Users, Zap, Scale, Leaf } from "lucide-react";

// The PESTLE Framework - Hub and spoke model
// Central hub: The Macroenvironment (Charcoal - neutral)
// Spokes: Political, Economic, Social, Technological, Legal, Environmental (Crimson - key forces)
export const pestleFrameworkFlow: { aiGeneratedNodes: Node[], aiGeneratedEdges: Edge[] } = {
  aiGeneratedNodes: [
    {
      id: "hub",
      position: { x: 320, y: 200 },
      data: {
        label: "Macroenvironment",
        sublabel: "Societal Forces",
        icon: <Globe size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "political",
      position: { x: 320, y: 0 },
      data: {
        label: "Political",
        sublabel: "Laws & Agencies",
        icon: <Landmark size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "economic",
      position: { x: 640, y: 100 },
      data: {
        label: "Economic",
        sublabel: "Purchasing Power",
        icon: <Coins size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "social",
      position: { x: 640, y: 300 },
      data: {
        label: "Social",
        sublabel: "Values & Trends",
        icon: <Users size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "technological",
      position: { x: 320, y: 400 },
      data: {
        label: "Technological",
        sublabel: "New Opportunities",
        icon: <Zap size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "legal",
      position: { x: 0, y: 300 },
      data: {
        label: "Legal",
        sublabel: "Regulations",
        icon: <Scale size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "environmental",
      position: { x: 0, y: 100 },
      data: {
        label: "Environmental",
        sublabel: "Natural Resources",
        icon: <Leaf size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "e-hub-political",
      source: "hub",
      target: "political",
      type: "smoothstep",
      animated: true,
      sourceHandle: "top-source",
      targetHandle: "bottom",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e-hub-economic",
      source: "hub",
      target: "economic",
      type: "smoothstep",
      animated: true,
      sourceHandle: "right-source",
      targetHandle: "left",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e-hub-social",
      source: "hub",
      target: "social",
      type: "smoothstep",
      animated: true,
      sourceHandle: "right-source",
      targetHandle: "left",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e-hub-technological",
      source: "hub",
      target: "technological",
      type: "smoothstep",
      animated: true,
      sourceHandle: "bottom-source",
      targetHandle: "top",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e-hub-legal",
      source: "hub",
      target: "legal",
      type: "smoothstep",
      animated: true,
      sourceHandle: "left-source",
      targetHandle: "right",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
    {
      id: "e-hub-environmental",
      source: "hub",
      target: "environmental",
      type: "smoothstep",
      animated: true,
      sourceHandle: "left-source",
      targetHandle: "right",
      style: { strokeWidth: 2, opacity: 0.55 },
    },
  ],
};
