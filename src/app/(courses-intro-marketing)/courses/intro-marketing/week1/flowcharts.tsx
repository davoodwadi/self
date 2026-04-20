import React from "react";
import {
  Heart,
  Globe,
  CreditCard,
  Factory,
  PackageSearch,
  Megaphone,
  Target,
  Leaf,
  Search,
  PenTool,
  Wrench,
  Users,
  Trophy
} from "lucide-react";

// Needs, Wants, and Demands
// Charcoal for internal/external states, Crimson for the actionable business end (Demands).
export const needsWantsDemandsFlow = {
  aiGeneratedNodes: [
    {
      id: "needs",
      position: { x: 0, y: 0 },
      data: { label: "Needs", sublabel: "Felt Deprivation", icon: <Heart size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "wants",
      position: { x: 320, y: 0 },
      data: { label: "Wants", sublabel: "Shaped by Culture", icon: <Globe size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "demands",
      position: { x: 640, y: 0 },
      data: { label: "Demands", sublabel: "Buying Power", icon: <CreditCard size={20} strokeWidth={2} /> },
      color: "#8B0000",
    },
  ],
  aiGeneratedEdges: [
    {
      id: "e-needs-wants",
      source: "needs",
      target: "wants",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-wants-demands",
      source: "wants",
      target: "demands",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 },
    },
  ],
};

// Evolution of Marketing
// Charcoal for historical eras. Crimson for current standard (Marketing). Gold for the aspirational future (Societal).
export const evolutionOfMarketingFlow = {
  aiGeneratedNodes: [
    {
      id: "production",
      position: { x: 0, y: 0 },
      data: { label: "Production", sublabel: "Efficiency & Scale", icon: <Factory size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "product",
      position: { x: 320, y: 0 },
      data: { label: "Product", sublabel: "Quality Focus", icon: <PackageSearch size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "selling",
      position: { x: 640, y: 0 },
      data: { label: "Selling", sublabel: "Promotion Driven", icon: <Megaphone size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "marketing",
      position: { x: 640, y: 160 },
      data: { label: "Marketing", sublabel: "Customer Centered", icon: <Target size={20} strokeWidth={2} /> },
      color: "#8B0000",
    },
    {
      id: "societal",
      position: { x: 320, y: 160 },
      data: { label: "Societal", sublabel: "Sustainable Value", icon: <Leaf size={20} strokeWidth={2} /> },
      color: "#D4AF37",
    },
  ],
  aiGeneratedEdges: [
    {
      id: "e-1-2",
      source: "production",
      target: "product",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-2-3",
      source: "product",
      target: "selling",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-3-4",
      source: "selling",
      target: "marketing",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 },
    },
    {
      id: "e-4-5",
      source: "marketing",
      target: "societal",
      sourceHandle: "left-source",
      targetHandle: "right",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#D4AF37", opacity: 0.55 },
    },
  ],
};

// The Five-Step Marketing Process
// Charcoal for the four steps of creating value. Crimson for the ultimate step of capturing value.
export const marketingProcessFlow = {
  aiGeneratedNodes: [
    {
      id: "understand",
      position: { x: 0, y: 0 },
      data: { label: "Understand", sublabel: "Marketplace & Needs", icon: <Search size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "design",
      position: { x: 320, y: 0 },
      data: { label: "Design", sublabel: "Value-Driven Strategy", icon: <PenTool size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "construct",
      position: { x: 640, y: 0 },
      data: { label: "Construct", sublabel: "Integrated Program", icon: <Wrench size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "engage",
      position: { x: 640, y: 160 },
      data: { label: "Engage", sublabel: "Build Relationships", icon: <Users size={20} strokeWidth={2} /> },
      color: "#2D2D32",
    },
    {
      id: "capture",
      position: { x: 320, y: 160 },
      data: { label: "Capture Value", sublabel: "Sales & Loyalty", icon: <Trophy size={20} strokeWidth={2} /> },
      color: "#8B0000",
    },
  ],
  aiGeneratedEdges: [
    {
      id: "e-1-2",
      source: "understand",
      target: "design",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-2-3",
      source: "design",
      target: "construct",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-3-4",
      source: "construct",
      target: "engage",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#2D2D32", opacity: 0.55 },
    },
    {
      id: "e-4-5",
      source: "engage",
      target: "capture",
      sourceHandle: "left-source",
      targetHandle: "right",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, stroke: "#8B0000", opacity: 0.55 },
    },
  ],
};
