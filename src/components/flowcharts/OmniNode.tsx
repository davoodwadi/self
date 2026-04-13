"use client";

import { Handle, Position } from "@xyflow/react";

export default function OmniNode({ data }: { data: any }) {
  // Use the AI's color, but fallback to a sleek slate if none is provided
  const accentColor = data.color || "#475569";

  return (
    // The main card: ultra-soft shadow, subtle hover lift, crisp white background
    <div className="flex items-center gap-4 px-5 py-4 bg-white/90 backdrop-blur-md border border-gray-100/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 min-w-[220px]">
      {/* Invisible Handles for the AI Routing */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        className="opacity-0"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        className="opacity-0"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="opacity-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="opacity-0"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        className="opacity-0"
      />

      {/* The Icon Badge (If the AI provided an icon) */}
      {data.icon && (
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-sm text-xl"
          style={{ backgroundColor: `${accentColor}15`, color: accentColor }} // Adds a 15% opacity background of the accent color
        >
          {data.icon}
        </div>
      )}

      {/* The Typography */}
      <div className="flex flex-col text-left">
        <div className="text-sm font-bold text-gray-800 tracking-wide">
          {data.label}
        </div>
        {data.sublabel && (
          <div className="text-xs font-medium text-gray-400 mt-0.5">
            {data.sublabel}
          </div>
        )}
      </div>
    </div>
  );
}
