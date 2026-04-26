const studies = [
  ["2.1", "Price-truncation bias", "Final choices"],
  ["2.2", "Tool-Lab price task", "Search under cost"],
  ["3.1", "Discount-framing bias", "Final choices"],
  ["3.2", "Tool-Lab discount task", "Cue reliance under cost"],
];

export default function ControlledTestbedSlide() {
  return (
    <section id="studies" className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"10"}</span>
              <span className="tag tag-muted">
                {"Controlled Experiments & Roadmap"}
              </span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Why <span className="grad-violet-cyan">product choice?</span>
                </>
              }
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <p className="p-body tl-message">
                {
                  "Consumption tasks give us hidden attributes, known utility functions, interpretable heuristics, and controllable information costs."
                }
              </p>
              <p className="p-body tl-message">
                {
                  "Because true best options are computable, we can score both final choice and search behavior. The empirical studies use two marketing biases to test whether final-output biases are mediated by information-search policies."
                }
              </p>
            </div>
          </div>
          <div>
            <div className="tl-panel">
              <h3
                className="p-body"
                style={{ marginBottom: "1rem", fontWeight: "bold" }}
              >
                Study Roadmap
              </h3>
              <div style={{ display: "grid", gap: "1rem" }}>
                {studies.map(([number, title, subtitle]) => (
                  <div
                    className="tl-trace-step"
                    key={number}
                    style={{ gridTemplateColumns: "auto 1fr auto" }}
                  >
                    <span className="tl-step-index">{number}</span>
                    <span className="p-body">{title}</span>
                    <span className="tag tag-muted">{subtitle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
