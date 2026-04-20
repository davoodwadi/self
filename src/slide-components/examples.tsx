import { Node, Edge } from "@xyflow/react";

// --- EXAMPLE 1: Top-Down Decision Tree ---
export const aiTopDownData = {
  nodes: [
    {
      id: "1",
      position: { x: 250, y: 0 },
      data: { label: "User Request", color: "#3b82f6" },
    },
    {
      id: "2",
      position: { x: 250, y: 150 },
      data: { label: "Is Authenticated?", sublabel: "Middleware check" },
    },
    {
      id: "3",
      position: { x: 50, y: 300 },
      data: { label: "Redirect to Login", color: "#ef4444" },
    },
    {
      id: "4",
      position: { x: 450, y: 300 },
      data: { label: "Load Dashboard", color: "#22c55e" },
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "default",
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      label: "No",
      style: { stroke: "#ef4444" },
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      sourceHandle: "bottom-source",
      targetHandle: "top",
      type: "smoothstep",
      label: "Yes",
      style: { stroke: "#22c55e" },
    },
  ],
};

// --- EXAMPLE 2: Cascading with a Bottom Feedback Loop ---
export const aiCascadingData = {
  nodes: [
    {
      id: "1",
      position: { x: 0, y: 250 },
      data: { label: "1. Login Screen" },
    },
    {
      id: "2",
      position: { x: 300, y: 125 },
      data: { label: "2. Auth Server", color: "#eab308" },
    },
    {
      id: "3",
      position: { x: 600, y: 0 },
      data: { label: "3. Secure Area", color: "#22c55e" },
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "default",
      animated: true,
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      sourceHandle: "right-source",
      targetHandle: "left",
      type: "default",
      animated: true,
    },
    // The magical feedback loop routed underneath using the exact handles!
    {
      id: "e2-1",
      source: "2",
      target: "1",
      sourceHandle: "bottom-source",
      targetHandle: "bottom",
      type: "smoothstep",
      label: "Token Expired",
      style: { stroke: "#ef4444", strokeWidth: 2 },
    },
  ],
};

// --- EXAMPLE 3: Mathematical Circular Diagram (Lifecycle) ---
// Note how the AI perfectly calculated the x/y coordinates using sine/cosine rules to make a ring!
export const aiCircularData = {
  nodes: [
    {
      id: "1",
      position: { x: 250, y: 50 },
      data: { label: "1. Plan", color: "#8b5cf6" },
    }, // Top
    {
      id: "2",
      position: { x: 450, y: 250 },
      data: { label: "2. Build", color: "#3b82f6" },
    }, // Right
    {
      id: "3",
      position: { x: 250, y: 450 },
      data: { label: "3. Test", color: "#f59e0b" },
    }, // Bottom
    {
      id: "4",
      position: { x: 50, y: 250 },
      data: { label: "4. Deploy", color: "#10b981" },
    }, // Left
  ],
  edges: [
    // Connecting nodes in a circle using adjacent handles to force beautiful curves
    {
      id: "e1-2",
      source: "1",
      target: "2",
      sourceHandle: "right-source",
      targetHandle: "top",
      type: "default",
      animated: true,
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      sourceHandle: "bottom-source",
      targetHandle: "right",
      type: "default",
      animated: true,
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      sourceHandle: "left-source",
      targetHandle: "bottom",
      type: "default",
      animated: true,
    },
    {
      id: "e4-1",
      source: "4",
      target: "1",
      sourceHandle: "top-source",
      targetHandle: "left",
      type: "default",
      animated: true,
    },
  ],
};
