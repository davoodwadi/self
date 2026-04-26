function Bar({
  value,
  color = "var(--cyan-light)",
  label,
}: {
  value: number;
  color?: string;
  label?: string;
}) {
  return (
    <div>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.25rem",
          }}
        >
          <span className="p-small" style={{ opacity: 0.8 }}>
            {label.split(":")[0]}
          </span>
          <span className="p-small" style={{ fontWeight: 600 }}>
            {label.split(":")[1]?.trim()}
          </span>
        </div>
      )}
      <div
        style={{
          height: "0.7rem",
          background: "var(--surface)",
          borderRadius: "99px",
          overflow: "hidden",
        }}
      >
        <div
          style={{ width: `${value}%`, height: "100%", background: color }}
        />
      </div>
    </div>
  );
}

export default function PriceToolLabResultsSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"15"}</span>
              <span className="tag tag-muted">{"Study 2.2 Results"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Tool cost changes the{" "}
                  <span className="grad-violet-cyan">search policy</span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "Under high tool costs, the larger model strategically truncates search to conserve resources. This adaptive policy shift directly predicts the decline in choice optimality, while smaller models blindly expend resources with little benefit."
              }
            </p>
          </div>
          <div>
            <div style={{ display: "grid", gap: "1rem" }}>
              {/* Flash Lite Panel */}
              <div className="tl-panel">
                <div className="tl-node-label" style={{ marginBottom: "1rem" }}>
                  Gemini 3.1 Flash Lite
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ display: "grid", gap: "0.85rem" }}>
                    <div
                      className="p-small"
                      style={{
                        opacity: 0.6,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontSize: "0.7rem",
                      }}
                    >
                      Optimal Choice
                    </div>
                    <Bar value={32} label="$0 Cost: 32%" />
                    <Bar
                      value={31}
                      label="$10 Cost: 31%"
                      color="var(--amber-light)"
                    />
                  </div>
                  <div style={{ display: "grid", gap: "0.85rem" }}>
                    <div
                      className="p-small"
                      style={{
                        opacity: 0.6,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontSize: "0.7rem",
                      }}
                    >
                      Checked Cents
                    </div>
                    <Bar value={99} label="$0 Cost: 99%" />
                    <Bar
                      value={42}
                      label="$10 Cost: 42%"
                      color="var(--amber-light)"
                    />
                  </div>
                </div>
              </div>

              {/* Pro Panel */}
              <div
                className="tl-panel"
                style={{
                  borderLeft: "4px solid var(--violet-light)",
                  background: "rgba(139, 92, 246, 0.03)",
                }}
              >
                <div
                  className="tl-node-label"
                  style={{ marginBottom: "1rem", color: "var(--violet-light)" }}
                >
                  Gemini 3.1 Pro (Adaptive)
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ display: "grid", gap: "0.85rem" }}>
                    <div
                      className="p-small"
                      style={{
                        opacity: 0.6,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontSize: "0.7rem",
                      }}
                    >
                      Optimal Choice
                    </div>
                    <Bar value={76} label="$0 Cost: 76%" />
                    <Bar
                      value={7}
                      label="$10 Cost: 7%"
                      color="var(--amber-light)"
                    />
                  </div>
                  <div style={{ display: "grid", gap: "0.85rem" }}>
                    <div
                      className="p-small"
                      style={{
                        opacity: 0.6,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontSize: "0.7rem",
                      }}
                    >
                      Checked Cents
                    </div>
                    <Bar value={89} label="$0 Cost: 89%" />
                    <Bar
                      value={5}
                      label="$10 Cost: 5%"
                      color="var(--amber-light)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
