import { Edge, Node } from "@xyflow/react";
import { Factory, Network, Users, LineChart, Megaphone, Boxes, Store } from "lucide-react";

// Hub-and-Spoke: Information flowing between producers, channel members, and consumers
export const channelsAddValueFlow = {
  aiGeneratedNodes: [
    {
      id: "producers",
      position: { x: 0, y: 150 },
      data: {
        label: "Producers",
        sublabel: "Creators",
        icon: <Factory className="w-6 h-6" />,
        color: "charcoal",
      },
    },
    {
      id: "intermediary",
      position: { x: 320, y: 150 },
      data: {
        label: "Intermediaries",
        sublabel: "Value Add",
        icon: <Network className="w-6 h-6" />,
        color: "crimson",
      },
    },
    {
      id: "consumers",
      position: { x: 640, y: 150 },
      data: {
        label: "Consumers",
        sublabel: "End Users",
        icon: <Users className="w-6 h-6" />,
        color: "charcoal",
      },
    },
    {
      id: "information",
      position: { x: 320, y: 0 },
      data: {
        label: "Market Information",
        sublabel: "Intelligence",
        icon: <LineChart className="w-6 h-6" />,
        color: "champagne",
      },
    },
    {
      id: "promotion",
      position: { x: 320, y: 300 },
      data: {
        label: "Promotion & Scale",
        sublabel: "Reach",
        icon: <Megaphone className="w-6 h-6" />,
        color: "champagne",
      },
    }
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "p-i",
      source: "producers",
      target: "intermediary",
      type: "smoothstep",
      animated: true,
      label: "Products",
    },
    {
      id: "i-c",
      source: "intermediary",
      target: "consumers",
      type: "smoothstep",
      animated: true,
      label: "Assortments",
    },
    {
      id: "info-i",
      source: "information",
      target: "intermediary",
      type: "smoothstep",
      animated: true,
    },
    {
      id: "promo-i",
      source: "promotion",
      target: "intermediary",
      type: "smoothstep",
      animated: true,
    }
  ] as Edge[],
};

// Cascading Flow: Producer to Wholesaler to Retailer acting as a unified system
export const vmsFlow = {
  aiGeneratedNodes: [
    {
      id: "producer",
      position: { x: 0, y: 0 },
      data: {
        label: "Producer",
        sublabel: "Creation",
        icon: <Factory className="w-6 h-6" />,
        color: "charcoal",
      },
    },
    {
      id: "wholesaler",
      position: { x: 320, y: 160 },
      data: {
        label: "Wholesaler",
        sublabel: "Bulk Distribution",
        icon: <Boxes className="w-6 h-6" />,
        color: "crimson",
      },
    },
    {
      id: "retailer",
      position: { x: 640, y: 320 },
      data: {
        label: "Retailer",
        sublabel: "Consumer Access",
        icon: <Store className="w-6 h-6" />,
        color: "charcoal",
      },
    },
  ] as Node[],
  aiGeneratedEdges: [
    {
      id: "e1",
      source: "producer",
      target: "wholesaler",
      type: "smoothstep",
      animated: true,
      label: "Unified",
    },
    {
      id: "e2",
      source: "wholesaler",
      target: "retailer",
      type: "smoothstep",
      animated: true,
      label: "System",
    },
  ] as Edge[],
};
