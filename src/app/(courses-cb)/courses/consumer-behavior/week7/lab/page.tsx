"use client";

// TEMPORARY review route: renders one Week 7 plate at full size (?p=Name&w=800).
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import * as V from "../visuals";

function One() {
  const sp = useSearchParams();
  const p = sp.get("p") ?? "";
  const w = Number(sp.get("w") ?? 800);
  const C = (V as unknown as Record<string, React.ComponentType>)[p];
  return (
    <div id="lab" style={{ background: "var(--paper-2)", padding: 16, width: w + 32 }}>
      <style>{`#lab svg{max-width:none!important}`}</style>
      {C ? <C /> : <p>{Object.keys(V).join(", ")}</p>}
    </div>
  );
}

export default function Lab() {
  return (
    <Suspense>
      <One />
    </Suspense>
  );
}
