"use client";

import { useState, Fragment } from "react";

const products = [
  ["Coffee C", "Cheapest list price", "$8.00", "tag-cyan"],
  ["Coffee D", "20% discount", "$15.00", "tag-amber"],
  ["Coffee E", "Optimal value", "$10.00", "tag-violet"],
];

const attributes = [
  { id: "list_price", label: "List Price" },
  { id: "discount", label: "Discount" },
  { id: "weight", label: "Weight" },
];

const alternatives = [
  { id: "C", label: "Coffee C" },
  { id: "D", label: "Coffee D" },
  { id: "E", label: "Coffee E" },
];

const values: Record<string, Record<string, string>> = {
  C: { list_price: "$8.00", discount: "0%", weight: "8 oz" },
  D: { list_price: "$15.00", discount: "20%", weight: "12 oz" },
  E: { list_price: "$10.00", discount: "0%", weight: "10.9 oz" },
};

export default function DiscountBiasSlide() {
  const [revealed, setRevealed] = useState<string[]>([]);
  const cost = revealed.length * 10;

  function toggle(id: string) {
    setRevealed((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }

  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"17"}</span>
              <span className="tag tag-muted">{"Study 3.2"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  The discount cue{" "}
                  <span className="grad-violet-cyan">looks valuable</span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "LLMs can favor a salient discount even when the discounted option is not the best economic value."
              }
            </p>
            <p className="p-body tl-message" style={{ marginTop: "1rem" }}>
              {
                "Discount evaluation requires deeper search because the model must acquire and integrate list price, discount percentage, and weight."
              }
            </p>
          </div>
          <div>
            <div className="tl-panel">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {products.map(([name, cue, price, tag]) => (
                  <div className="tl-node" key={name}>
                    <span className={`tag ${tag}`}>{cue}</span>
                    <h3
                      className="p-heading"
                      style={{ fontSize: "1rem", marginTop: "1rem" }}
                    >
                      {name}
                    </h3>
                    <p
                      className="p-mono"
                      style={{ color: "var(--text-dim)", marginTop: "0.35rem" }}
                    >
                      {price}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `auto repeat(${attributes.length}, 1fr)`,
                  gap: "0.6rem",
                  alignItems: "center",
                }}
              >
                {/* Header row */}
                <div></div>
                {attributes.map((attr) => (
                  <div
                    key={attr.id}
                    className="tl-node-label"
                    style={{ textAlign: "center", color: "var(--text-muted)" }}
                  >
                    {attr.label}
                  </div>
                ))}

                {/* Data rows */}
                {alternatives.map((alt) => (
                  <Fragment key={alt.id}>
                    <div
                      className="tl-node-label"
                      style={{
                        textAlign: "right",
                        paddingRight: "1rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {alt.label}
                    </div>
                    {attributes.map((attr) => {
                      const cellId = `${alt.id}-${attr.id}`;
                      const isRevealed = revealed.includes(cellId);
                      return (
                        <button
                          key={attr.id}
                          className={`tl-cell ${isRevealed ? "tl-cell-revealed" : ""} tl-cell-critical`}
                          onClick={() => toggle(cellId)}
                          type="button"
                          style={{ width: "100%" }}
                        >
                          {isRevealed ? values[alt.id][attr.id] : "?"}
                        </button>
                      );
                    })}
                  </Fragment>
                ))}
              </div>

              <div
                className="tl-panel tl-panel-tight"
                style={{ marginTop: "1rem" }}
              >
                <div
                  className="tl-node-label"
                  style={{ color: "var(--cyan-light)" }}
                >
                  tools
                </div>
                <p
                  className="p-mono"
                  style={{ color: "var(--text-dim)", marginTop: "0.5rem" }}
                >
                  inspect_cell(option_id, attribute_id)
                  <br />
                  submit_choice(option_id)
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="tl-caption">Cumulative tool cost: ${cost}</p>
                  {revealed.length > 0 && (
                    <button
                      onClick={() => setRevealed([])}
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        cursor: "pointer",
                        opacity: 0.6,
                        padding: 0,
                      }}
                    >
                      [reset]
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
