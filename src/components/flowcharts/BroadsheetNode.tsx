"use client";

import { Handle, Position } from "@xyflow/react";

const HANDLES = [
  { type: "target", position: Position.Top, id: "top" },
  { type: "source", position: Position.Top, id: "top-source" },
  { type: "target", position: Position.Right, id: "right" },
  { type: "source", position: Position.Right, id: "right-source" },
  { type: "target", position: Position.Bottom, id: "bottom" },
  { type: "source", position: Position.Bottom, id: "bottom-source" },
  { type: "target", position: Position.Left, id: "left" },
  { type: "source", position: Position.Left, id: "left-source" },
] as const;

/**
 * BroadsheetNode - Flow node matching the Broadsheet editorial system.
 *
 * Square corners, a hairline border and a single accent rule at the top edge.
 * Deliberately flat: nothing in this design language casts a shadow, so the
 * diagram reads as part of the page rather than a widget sitting on it.
 */
export default function BroadsheetNode({ data }: { data: any }) {
  const accent = data.color || "var(--signal, #B23A15)";

  return (
    <div
      className="flex items-center gap-4 px-5 py-4 min-w-[210px] transition-colors duration-200"
      style={{
        background: "var(--paper, #fff)",
        border: "1px solid var(--rule, #ddd7c8)",
        borderTop: `2px solid ${accent}`,
      }}
    >
      {HANDLES.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          className="opacity-0"
        />
      ))}

      {data.icon && (
        <div
          className="flex items-center justify-center w-9 h-9 flex-shrink-0"
          style={{ color: accent }}
        >
          {data.icon}
        </div>
      )}

      <div className="flex flex-col text-left">
        <div
          className="text-[0.9rem] font-semibold leading-tight"
          style={{
            color: "var(--ink, #17160F)",
            fontFamily: "var(--font-heading, Georgia, serif)",
          }}
        >
          {data.label}
        </div>
        {data.sublabel && (
          <div
            className="text-[0.65rem] mt-1 uppercase tracking-[0.12em]"
            style={{
              color: "var(--ink-3, #6F6A5C)",
              fontFamily: "var(--font-label, sans-serif)",
            }}
          >
            {data.sublabel}
          </div>
        )}
      </div>
    </div>
  );
}
