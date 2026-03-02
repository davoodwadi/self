"use client";

import { useMemo, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  type Edge,
  type Node,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import OmniNode from "./OmniNode";

/**
 * Props consumed by {@link FlowRenderer}.
 *
 * `aiGeneratedNodes` and `aiGeneratedEdges` are intentionally flexible so they
 * can accept AI-generated graph payloads with different shapes, as long as they
 * follow the minimal React Flow contract.
 *
 * Expected node fields:
 * - `id: string`
 * - `type?: string` (defaults to `"omni"` when omitted)
 * - `position: { x: number; y: number }`
 * - `data: { label?: string; sublabel?: string; icon?: ReactNode; color?: string }`
 *
 * Expected edge fields:
 * - `id: string`
 * - `source: string`
 * - `target: string`
 * - optional routing and style fields such as `sourceHandle`, `targetHandle`,
 *   `type`, `animated`, `label`, and `style`
 */
interface AIFlowRendererProps {
  aiGeneratedNodes: Node[];
  aiGeneratedEdges: Edge[];
}

/**
 * Renders an AI-authored flowchart using React Flow.
 *
 * Core behavior:
 * - Registers the custom `omni` node type via `OmniNode`.
 * - Syncs incoming node and edge arrays into local React Flow state.
 * - Normalizes nodes so missing `type` values default to `"omni"`.
 * - Automatically injects a closed arrow marker on each edge for consistent
 *   directional flow styling.
 * - Uses `fitView` so graphs are framed when data changes.
 *
 * This component expects to be mounted in a parent container with explicit
 * dimensions (width and height), because React Flow requires measurable space
 * to render correctly.
 */
export default function FlowRenderer({
  aiGeneratedNodes,
  aiGeneratedEdges,
}: AIFlowRendererProps) {
  const nodeTypes = useMemo(() => ({ omni: OmniNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    const formattedNodes = aiGeneratedNodes.map((node) => ({
      ...node,
      type: node.type ?? "omni",
    }));

    setNodes(formattedNodes);

    // Automatically inject Arrowheads into the AI's edges so they look like flowcharts
    const formattedEdges = aiGeneratedEdges.map((edge) => ({
      ...edge,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: edge.style?.stroke || "#b1b1b7",
      },
    }));

    setEdges(formattedEdges);
  }, [aiGeneratedNodes, aiGeneratedEdges, setNodes, setEdges]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
