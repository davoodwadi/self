"use client";

import { useState, Fragment } from "react";

const attributes = [
  { id: "price", label: "Price" },
  { id: "cents", label: "Cents" },
  { id: "weight", label: "Weight" },
  { id: "roast", label: "Roast" },
];

const alternatives = [
  { id: "a", label: "Coffee A" },
  { id: "b", label: "Coffee B" },
];

const values: Record<string, Record<string, string>> = {
  a: { price: "$14", cents: "99c", weight: "10 oz", roast: "medium" },
  b: { price: "$15", cents: "00c", weight: "10.1 oz", roast: "medium" },
};

export default function ToolLabInterfaceSlide() {
  const [revealed, setRevealed] = useState<string[]>([]);
  const cost = revealed.length * 3;

  function toggle(id: string) {
    setRevealed((current) =>
      current.includes(id) ? current : [...current, id],
    );
  }

  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"07"}</span>
              <span className="tag tag-muted">{"Observable Search"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Tool-Lab makes{" "}
                  <span className="grad-violet-cyan">search observable</span>
                </>
              }
            </h2>
            <p className="p-body tl-message" style={{ maxWidth: "100%" }}>
              {
                "Task-relevant information is hidden behind explicit tool calls, so the model's information-acquisition process becomes measurable."
              }
            </p>
          </div>
          <div>
            <div className="tl-panel">
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
                          className={`tl-cell ${isRevealed ? "tl-cell-revealed" : ""}`}
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
                  <p className="tl-caption">Cumulative tool cost: {cost}</p>
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
