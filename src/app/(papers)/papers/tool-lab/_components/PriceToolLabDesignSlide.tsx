"use client";

import { useState } from "react";
import { SlideShell } from "./SlidePrimitives";

const priceCells = [
  ["Coffee A", "price_dollars", "4"],
  ["Coffee A", "price_cents", "99"],
  ["Coffee A", "weight", "10 oz"],
  ["Coffee B", "price_dollars", "5"],
  ["Coffee B", "price_cents", "00"],
  ["Coffee B", "weight", "11 oz"],
  ["Coffee A", "noise", "organic"],
  ["Coffee B", "noise", "arabica"],
];

export default function PriceToolLabDesignSlide() {
  const [revealed, setRevealed] = useState<string[]>(["Coffee A-price_dollars"]);

  return (
    <SlideShell
      number="14"
      eyebrow="Study 2.2"
      title={
        <>
          Process test: <span className="grad-violet-cyan">hide the information</span>
        </>
      }
      message="Study 2.2 tests whether price-truncation bias emerges because models choose not to acquire costly information."
    >
      <div className="tl-panel">
        <div className="tl-hidden-grid">
          {priceCells.map(([option, attr, value]) => {
            const id = `${option}-${attr}`;
            const isRevealed = revealed.includes(id);
            const isCritical = attr === "price_cents" || attr === "weight";
            return (
              <button
                key={id}
                className={`tl-cell ${isRevealed ? "tl-cell-revealed" : ""} ${isCritical ? "tl-cell-critical" : ""}`}
                type="button"
                onClick={() => setRevealed((current) => (current.includes(id) ? current : [...current, id]))}
              >
                {isRevealed ? value : attr}
              </button>
            );
          })}
        </div>
        <div className="tl-segment-row" style={{ marginTop: "1rem" }}>
          <span className="tag tag-cyan">$0 tool cost</span>
          <span className="tag tag-amber">$10 tool cost</span>
          <span className="tag tag-muted">revealed cells: {revealed.length}</span>
        </div>
      </div>
    </SlideShell>
  );
}
