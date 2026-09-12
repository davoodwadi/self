import React from "react";
import { 
  Users, Target, Map, Brain, Activity, Compass,
  Layers, Crosshair, Flag
} from "lucide-react";

// Semantic Colors: 
// Charcoal (#17160F) for process/inputs
// Crimson (#B23A15) for key outcomes/decisions

export const stpProcessFlow = {
  variant: "broadsheet" as const,
  aiGeneratedNodes: [
    {
      id: "stp-1",
      position: { x: 0, y: 0 },
      data: {
        label: "Segmentation",
        sublabel: "Identify groups",
        icon: <Layers size={20} strokeWidth={2} />,
        color: "#17160F",
      },
    },
    {
      id: "stp-2",
      position: { x: 320, y: 0 },
      data: {
        label: "Targeting",
        sublabel: "Select segments",
        icon: <Crosshair size={20} strokeWidth={2} />,
        color: "#17160F",
      },
    },
    {
      id: "stp-3",
      position: { x: 640, y: 0 },
      data: {
        label: "Positioning",
        sublabel: "Create value",
        icon: <Flag size={20} strokeWidth={2} />,
        color: "#B23A15",
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
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#17160F" },
    },
    {
      id: "stp-e2",
      source: "stp-2",
      target: "stp-3",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#17160F" },
    },
  ]
};

export const segmentationBasesFlow = {
  variant: "broadsheet" as const,
  aiGeneratedNodes: [
    {
      id: "sb-1",
      position: { x: 0, y: 0 },
      data: {
        label: "Geographic",
        sublabel: "Location, climate",
        icon: <Map size={20} strokeWidth={2} />,
        color: "#17160F",
      },
    },
    {
      id: "sb-2",
      position: { x: 640, y: 0 },
      data: {
        label: "Demographic",
        sublabel: "Age, gender, income",
        icon: <Users size={20} strokeWidth={2} />,
        color: "#17160F",
      },
    },
    {
      id: "sb-3",
      position: { x: 0, y: 320 },
      data: {
        label: "Psychographic",
        sublabel: "Lifestyle, personality",
        icon: <Brain size={20} strokeWidth={2} />,
        color: "#17160F",
      },
    },
    {
      id: "sb-4",
      position: { x: 640, y: 320 },
      data: {
        label: "Behavioral",
        sublabel: "Usage, loyalty, benefits",
        icon: <Activity size={20} strokeWidth={2} />,
        color: "#17160F",
      },
    },
    {
      id: "sb-5",
      position: { x: 320, y: 160 },
      data: {
        label: "Market Segmentation",
        sublabel: "Distinct buyer groups",
        icon: <Compass size={20} strokeWidth={2} />,
        color: "#B23A15",
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
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#17160F" },
    },
    {
      id: "sb-e2",
      source: "sb-2",
      target: "sb-5",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#17160F" },
    },
    {
      id: "sb-e3",
      source: "sb-3",
      target: "sb-5",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#17160F" },
    },
    {
      id: "sb-e4",
      source: "sb-4",
      target: "sb-5",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#17160F" },
    },
  ]
};
