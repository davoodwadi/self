"use client";

import { useState } from "react";
import { SlideShell } from "./SlidePrimitives";

const discountCells = [
  ["C", "list_price", "$7.49"],
  ["C", "discount", "0%"],
  ["C", "weight", "10 oz"],
  ["D", "list_price", "$7.99"],
  ["D", "discount", "20%"],
  ["D", "weight", "9 oz"],
  ["E", "list_price", "$8.29"],
  ["E", "discount", "10%"],
  ["E", "weight", "12 oz"],
];

export default function DiscountToolLabDesignSlide() {
  const [revealed, setRevealed] = useState<string[]>(["D-discount"]);
  const completeTriad = ["E-list_price", "E-discount", "E-weight"].every((id) => revealed.includes(id));

  return (
    <SlideShell
      number="18"
      eyebrow="Study 3.2"
      title={
        <>
          More attributes, more <span className="grad-violet-cyan">planning pressure</span>
        </>
      }
      message="Discount evaluation requires deeper search because the model must acquire and integrate list price, discount percentage, and weight."
    >
      <div className="tl-panel">
        <div className="tl-hidden-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          {discountCells.map(([option, attr, value]) => {
            const id = `${option}-${attr}`;
            const isRevealed = revealed.includes(id);
            return (
              <button
                key={id}
                type="button"
                className={`tl-cell ${isRevealed ? "tl-cell-revealed" : ""} tl-cell-critical`}
                onClick={() => setRevealed((current) => (current.includes(id) ? current : [...current, id]))}
              >
                {isRevealed ? value : `${option}: ${attr}`}
              </button>
            );
          })}
        </div>
        <div className="tl-node" style={{ marginTop: "1rem", borderColor: completeTriad ? "var(--cyan)" : "var(--border-mid)" }}>
          <div className="tl-node-label" style={{ color: completeTriad ? "var(--cyan-light)" : "var(--text-muted)" }}>
            compute value
          </div>
          <div className="tl-node-text">
            {completeTriad ? "E has the complete triad needed for unit value." : "Reveal list price, discount, and weight to compute unit value."}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
