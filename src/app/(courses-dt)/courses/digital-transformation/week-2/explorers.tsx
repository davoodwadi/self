"use client";

/* Week 2 click-through plates: the diagram stays put and the panel under it
   shows the stage or activity the lecturer selects. The words come from the
   page (content.md), never from here. */

import React, { useState } from "react";
import { PlateWell, Stack } from "../_visuals/kit";
import { DataChain, ValueChain } from "./visuals";

function Panel({ kicker, name, text, on }: { kicker?: string; name: string; text: string; on: boolean }) {
  return (
    <div
      aria-hidden={!on}
      className={`border-t border-[var(--dt-ink)]/15 pt-5 max-w-4xl transition-opacity duration-200 ${on ? "opacity-100" : "opacity-0 pointer-events-none select-none"}`}
    >
      {kicker && <p className="font-sans font-semibold text-lg text-[var(--ink-2)] mb-1">{kicker}</p>}
      <p className="font-sans font-bold text-[1.75rem] leading-tight text-[var(--dt-ink)]">{name}</p>
      <p className="mt-3 font-sans text-xl leading-[1.5] text-[var(--ink-2)]">{text}</p>
    </div>
  );
}

/** Nine stages: 0 to 7 are the circles, 8 is the feedback loop. */
export function DataChainExplorer({ stages }: { stages: [string, string][] }) {
  const [sel, setSel] = useState(0);
  return (
    <>
      <PlateWell>
        <DataChain selected={sel} onSelect={setSel} />
      </PlateWell>
      {/* every panel sits in the same cell, so the slide keeps its height */}
      <Stack>
        {stages.map(([name, text], i) => (
          <Panel key={name} on={i === sel} kicker={i < 8 ? `Stage ${i + 1}` : undefined} name={name} text={text} />
        ))}
      </Stack>
    </>
  );
}

/** Activities in plate order: support bars 0 to 3 (top down), primary columns 4 to 8. */
export function ValueChainExplorer({
  activities,
}: {
  activities: { group: string; name: string; text: string }[];
}) {
  const [sel, setSel] = useState(4);
  return (
    <>
      <PlateWell>
        <ValueChain selected={sel} onSelect={setSel} />
      </PlateWell>
      <Stack>
        {activities.map((a, i) => (
          <Panel key={a.name} on={i === sel} kicker={a.group} name={a.name} text={a.text} />
        ))}
      </Stack>
    </>
  );
}
