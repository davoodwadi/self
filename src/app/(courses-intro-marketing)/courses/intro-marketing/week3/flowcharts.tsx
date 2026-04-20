import React from "react";
import { 
  Search, Target, Scale, ShoppingCart, MessageCircle, 
  Globe, Users, User, Brain,
  Laptop, Mic, Shield, CreditCard, CheckCircle, Briefcase 
} from "lucide-react";

// Semantic Colors: 
// Charcoal (#1A1A1D) for process/inputs
// Crimson (#8B0000) for key outcomes/decisions

export const consumerDecisionFlow = {
  aiGeneratedNodes: [
    {
      id: "cd-1",
      position: { x: 0, y: 0 },
      data: {
        label: "Need Recognition",
        sublabel: "Triggered by stimuli",
        icon: <Target size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "cd-2",
      position: { x: 320, y: 0 },
      data: {
        label: "Information Search",
        sublabel: "Gathering data",
        icon: <Search size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "cd-3",
      position: { x: 640, y: 0 },
      data: {
        label: "Evaluate Alternatives",
        sublabel: "Comparing brands",
        icon: <Scale size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "cd-4",
      position: { x: 640, y: 160 },
      data: {
        label: "Purchase Decision",
        sublabel: "Selecting preferred",
        icon: <ShoppingCart size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
    {
      id: "cd-5",
      position: { x: 640, y: 320 },
      data: {
        label: "Postpurchase",
        sublabel: "Satisfaction & dissonance",
        icon: <MessageCircle size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "cd-e1",
      source: "cd-1",
      target: "cd-2",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "cd-e2",
      source: "cd-2",
      target: "cd-3",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "cd-e3",
      source: "cd-3",
      target: "cd-4",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "cd-e4",
      source: "cd-4",
      target: "cd-5",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#8B0000" },
    },
  ]
};

export const buyingInfluencesFlow = {
  aiGeneratedNodes: [
    {
      id: "bi-1",
      position: { x: 160, y: 0 },
      data: {
        label: "Cultural",
        sublabel: "Values & subcultures",
        icon: <Globe size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bi-2",
      position: { x: 480, y: 0 },
      data: {
        label: "Social",
        sublabel: "Networks & family",
        icon: <Users size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bi-3",
      position: { x: 160, y: 320 },
      data: {
        label: "Personal",
        sublabel: "Age & lifestyle",
        icon: <User size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bi-4",
      position: { x: 480, y: 320 },
      data: {
        label: "Psychological",
        sublabel: "Motivation & beliefs",
        icon: <Brain size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bi-5",
      position: { x: 320, y: 160 },
      data: {
        label: "Buying Behavior",
        sublabel: "Consumer actions",
        icon: <ShoppingCart size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "bi-e1",
      source: "bi-1",
      target: "bi-5",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "bi-e2",
      source: "bi-2",
      target: "bi-5",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "bi-e3",
      source: "bi-3",
      target: "bi-5",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "bi-e4",
      source: "bi-4",
      target: "bi-5",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
  ]
};

export const buyingCenterFlow = {
  aiGeneratedNodes: [
    {
      id: "bc-1",
      position: { x: 0, y: 0 },
      data: {
        label: "Users",
        sublabel: "Product consumers",
        icon: <Laptop size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bc-2",
      position: { x: 320, y: 0 },
      data: {
        label: "Influencers",
        sublabel: "Define specs",
        icon: <Mic size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bc-3",
      position: { x: 640, y: 0 },
      data: {
        label: "Gatekeepers",
        sublabel: "Control information",
        icon: <Shield size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bc-4",
      position: { x: 160, y: 320 },
      data: {
        label: "Buyers",
        sublabel: "Negotiate terms",
        icon: <CreditCard size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bc-5",
      position: { x: 480, y: 320 },
      data: {
        label: "Deciders",
        sublabel: "Final approval",
        icon: <CheckCircle size={20} strokeWidth={2} />,
        color: "#1A1A1D",
      },
    },
    {
      id: "bc-6",
      position: { x: 320, y: 160 },
      data: {
        label: "Buying Center",
        sublabel: "B2B Decision Unit",
        icon: <Briefcase size={20} strokeWidth={2} />,
        color: "#8B0000",
      },
    },
  ],
  aiGeneratedEdges: [
    {
      id: "bc-e1",
      source: "bc-1",
      target: "bc-6",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "bc-e2",
      source: "bc-2",
      target: "bc-6",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "bc-e3",
      source: "bc-3",
      target: "bc-6",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "bc-e4",
      source: "bc-4",
      target: "bc-6",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
    {
      id: "bc-e5",
      source: "bc-5",
      target: "bc-6",
      sourceHandle: "top-source",
      targetHandle: "bottom",
      type: "smoothstep",
      animated: true,
      style: { strokeWidth: 2, opacity: 0.55, stroke: "#1A1A1D" },
    },
  ]
};
