import React from "react";
import {
  Search,
  CreditCard,
  PackageOpen,
  Trash2,
  Users,
  Building2,
  Brain,
  Heart,
  Globe,
} from "lucide-react";

// The Consumption Process
// Charcoal for the stages consumers move through, crimson for the purchase moment
// marketers traditionally over-focus on, gold for the disposal stage the field
// increasingly cares about.
export const consumptionProcessFlow = {
  aiGeneratedNodes: [
    {
      id: "prepurchase",
      position: { x: 0, y: 0 },
      data: { label: "Pre-Purchase", sublabel: "Need & Search", icon: <Search size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "purchase",
      position: { x: 320, y: 0 },
      data: { label: "Purchase", sublabel: "Choice & Payment", icon: <CreditCard size={20} strokeWidth={2} /> },
      color: "#8B0000",
    },
    {
      id: "usage",
      position: { x: 640, y: 0 },
      data: { label: "Usage", sublabel: "Experience & Meaning", icon: <PackageOpen size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "disposal",
      position: { x: 640, y: 160 },
      data: { label: "Disposal", sublabel: "Resale, Reuse, Discard", icon: <Trash2 size={20} strokeWidth={2} /> },
      color: "#D4AF37",
    },
  ],
  aiGeneratedEdges: [
    {
      id: "e-pre-purchase",
      source: "prepurchase",
      target: "purchase",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-purchase-usage",
      source: "purchase",
      target: "usage",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 },
    },
    {
      id: "e-usage-disposal",
      source: "usage",
      target: "disposal",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#D4AF37", opacity: 0.55 },
    },
    {
      id: "e-disposal-prepurchase",
      source: "disposal",
      target: "prepurchase",
      sourceHandle: "left-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.35 },
    },
  ],
};

// Levels of Analysis in Consumer Behavior
// The field studies the same act at widening circles of scale.
export const levelsOfAnalysisFlow = {
  aiGeneratedNodes: [
    {
      id: "individual",
      position: { x: 0, y: 0 },
      data: { label: "The Individual", sublabel: "Perception, Memory, Attitudes", icon: <Brain size={20} strokeWidth={2} /> },
      color: "#8B0000",
    },
    {
      id: "decision",
      position: { x: 320, y: 0 },
      data: { label: "The Decision", sublabel: "Search & Choice Rules", icon: <Heart size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "groups",
      position: { x: 640, y: 0 },
      data: { label: "Groups", sublabel: "Family, Peers, Communities", icon: <Users size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "subculture",
      position: { x: 320, y: 160 },
      data: { label: "Subcultures", sublabel: "Class, Age, Ethnicity", icon: <Building2 size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "culture",
      position: { x: 640, y: 160 },
      data: { label: "Culture", sublabel: "Values, Rituals, Myths", icon: <Globe size={20} strokeWidth={2} /> },
      color: "#D4AF37",
    },
  ],
  aiGeneratedEdges: [
    {
      id: "e-ind-dec",
      source: "individual",
      target: "decision",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 },
    },
    {
      id: "e-dec-groups",
      source: "decision",
      target: "groups",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-groups-subculture",
      source: "groups",
      target: "subculture",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-subculture-culture",
      source: "subculture",
      target: "culture",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#D4AF37", opacity: 0.55 },
    },
  ],
};
