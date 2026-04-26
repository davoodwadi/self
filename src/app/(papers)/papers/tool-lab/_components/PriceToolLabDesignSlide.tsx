"use client";

import { useState, Fragment } from "react";

const attributes = [
  { id: "price_dollars", label: "Price ($)" },
  { id: "price_cents", label: "Cents" },
  { id: "weight", label: "Weight" },
  { id: "origin", label: "Origin" },
  { id: "roast_date", label: "Roast Date" },
  { id: "calories", label: "Calories" },
  { id: "packaging", label: "Packaging" },
];

const alternatives = [
  { id: "a", label: "Coffee A" },
  { id: "b", label: "Coffee B" },
];

const values: Record<string, Record<string, string>> = {
  a: {
    price_dollars: "$4",
    price_cents: ".99",
    weight: "10 oz",
    origin: "Colombia",
    roast_date: "Recent",
    calories: "0",
    packaging: "Bag",
  },
  b: {
    price_dollars: "$5",
    price_cents: ".00",
    weight: "11 oz",
    origin: "Colombia",
    roast_date: "Recent",
    calories: "0",
    packaging: "Bag",
  },
};

export default function PriceToolLabDesignSlide() {
  const [revealed, setRevealed] = useState<string[]>([]);
  const [costPerCall, setCostPerCall] = useState<number>(0);

  const cost = revealed.length * costPerCall;

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
              <span className="tag tag-violet">{"14"}</span>
              <span className="tag tag-muted">{"Study 2.2"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Process test:{" "}
                  <span className="grad-violet-cyan">hide the information</span>
                </>
              }
            </h2>
            <p className="p-body tl-message" style={{ maxWidth: "100%" }}>
              {
                "Study 2.2 tests whether price-truncation bias emerges because models choose not to acquire costly information. Task-relevant information is hidden behind explicit tool calls."
              }
            </p>
          </div>

          <div>
            <div className="tl-panel">
              {/* Cost Condition Toggle */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <span
                  className="tl-node-label"
                  style={{ color: "var(--text-muted)" }}
                >
                  Experimental Condition:
                </span>
                <button
                  className={`tag ${costPerCall === 0 ? "tag-cyan" : "tag-muted"}`}
                  onClick={() => {
                    setCostPerCall(0);
                    setRevealed([]);
                  }}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    fontFamily: "inherit",
                  }}
                >
                  $0 tool cost
                </button>
                <button
                  className={`tag ${costPerCall === 10 ? "tag-amber" : "tag-muted"}`}
                  onClick={() => {
                    setCostPerCall(10);
                    setRevealed([]);
                  }}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    fontFamily: "inherit",
                  }}
                >
                  $10 tool cost
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `auto repeat(${attributes.length}, 1fr)`,
                  gap: "0.6rem",
                  alignItems: "center",
                  overflowX: "auto",
                }}
              >
                {/* Header row */}
                <div></div>
                {attributes.map((attr) => (
                  <div
                    key={attr.id}
                    className="tl-node-label"
                    style={{
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: "0.85rem",
                    }}
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
                        whiteSpace: "nowrap",
                      }}
                    >
                      {alt.label}
                    </div>
                    {attributes.map((attr) => {
                      const cellId = `${alt.id}-${attr.id}`;
                      const isRevealed = revealed.includes(cellId);
                      const isCritical =
                        attr.id === "price_dollars" ||
                        // attr.id === "price_cents" ||
                        attr.id === "weight";

                      return (
                        <button
                          key={attr.id}
                          className={`tl-cell ${isRevealed ? "tl-cell-revealed" : ""} ${!isRevealed && isCritical ? "tl-cell-critical" : ""}`}
                          onClick={() => toggle(cellId)}
                          type="button"
                          style={{ width: "100%", padding: "0.5rem" }}
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
                style={{ marginTop: "1.5rem" }}
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
