export default function HeroSlide() {
  const trace = [
    "inspect_cell(A, price)",
    "inspect_cell(B, weight)",
    "submit_choice(B)",
  ];

  return (
    <section className="tl-slide dot-grid" style={{ minHeight: "100vh" }}>
      <div className="tl-slide-inner">
        <div className="tl-kicker">
          <span className="tag tag-muted">LLM Agents</span>
          <span className="tag tag-cyan">Tool Use</span>
          <span className="tag tag-muted">Planning</span>
        </div>
        <div className="tl-two-col">
          <div>
            <h1 className="p-display tl-hero-title">
              Tool-<span className="grad-violet-cyan">Lab</span>
            </h1>
            <p
              className="p-display-italic"
              style={{ fontSize: "1.55rem", marginBottom: "1.75rem" }}
            >
              Evaluating LLM Tool Use as Resource-Rational Planning
            </p>
            <p className="p-body tl-message">
              LLM agents should be evaluated not only by whether they get the
              answer right, but by whether they acquire information efficiently
              under resource constraints.
            </p>
          </div>
          <div
            className="tl-panel"
            aria-label="Abstract Tool-Lab interface visual"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 0.82fr",
                gap: "1rem",
              }}
            >
              <div
                className="tl-hidden-grid"
                style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
              >
                {[
                  "A price",
                  "A cents",
                  "A weight",
                  "B price",
                  "B cents",
                  "B weight",
                ].map((cell, index) => (
                  <div
                    key={cell}
                    className={`tl-cell ${index === 0 || index === 5 ? "tl-cell-revealed" : ""}`}
                  >
                    {index === 0 ? "$4" : index === 5 ? "11 oz" : "hidden"}
                  </div>
                ))}
              </div>
              <div className="tl-trace">
                {trace.map((item, index) => (
                  <div
                    className="tl-trace-step"
                    key={item}
                    style={{ gridTemplateColumns: "auto 1fr" }}
                  >
                    <span className="tl-step-index">{index + 1}</span>
                    <span
                      className="p-mono"
                      style={{ color: "var(--text-dim)", fontSize: "0.72rem" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
                <div
                  className="tl-node"
                  style={{ borderColor: "rgba(252, 211, 77, 0.5)" }}
                >
                  <div
                    className="tl-node-label"
                    style={{ color: "var(--amber-light)" }}
                  >
                    final decision
                  </div>
                  <div className="tl-node-text">Choice + information cost</div>
                </div>
              </div>
            </div>
            <p className="tl-caption">
              A hidden table, observable tool calls, cumulative cost, and a
              final decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
