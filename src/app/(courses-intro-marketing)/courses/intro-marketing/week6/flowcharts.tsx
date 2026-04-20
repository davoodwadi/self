import React from "react";
import { 
  Users, Target, Map, Brain, Activity, Compass,
  Layers, Crosshair, Flag
} from "lucide-react";

// Semantic Colors: 
// Charcoal (#1A1A1D) for process/inputs
// Crimson (#8B0000) for key outcomes/decisions

export const stpProcessFlow = {
  aiGeneratedNodes: [
    {
      id: "stp-1",
      position: { x: 0, y: 0 },
      data: {
        label: "Segmentation",
        sublabel: "Identify groups",
        icon: <Layers size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "stp-2",
      position: { x: 320, y: 0 },
      data: {
        label: "Targeting",
        sublabel: "Select segments",
        icon: <Crosshair size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "stp-3",
      position: { x: 640, y: 0 },
      data: {
        label: "Positioning",
        sublabel: "Create value",
        icon: <Flag size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "stp-e1",
      source: "stp-1",
      target: "stp-2",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "stp-e2",
      source: "stp-2",
      target: "stp-3",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
  ]
};

export const segmentationBasesFlow = {
  aiGeneratedNodes: [
    {
      id: "sb-1",
      position: { x: 0, y: 0 },
      data: {
        label: "Geographic",
        sublabel: "Location, climate",
        icon: <Map size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "sb-2",
      position: { x: 640, y: 0 },
      data: {
        label: "Demographic",
        sublabel: "Age, gender, income",
        icon: <Users size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "sb-3",
      position: { x: 0, y: 320 },
      data: {
        label: "Psychographic",
        sublabel: "Lifestyle, personality",
        icon: <Brain size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "sb-4",
      position: { x: 640, y: 320 },
      data: {
        label: "Behavioral",
        sublabel: "Usage, loyalty, benefits",
        icon: <Activity size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "sb-5",
      position: { x: 320, y: 160 },
      data: {
        label: "Market Segmentation",
        sublabel: "Distinct buyer groups",
        icon: <Compass size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "sb-e1",
      source: "sb-1",
      target: "sb-5",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "sb-e2",
      source: "sb-2",
      target: "sb-5",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "sb-e3",
      source: "sb-3",
      target: "sb-5",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "sb-e4",
      source: "sb-4",
      target: "sb-5",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
  ]
};
