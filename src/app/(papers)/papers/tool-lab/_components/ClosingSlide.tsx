export default function ClosingSlide() {
  return (
    <section className="tl-slide dot-grid">
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-cyan">24</span>
              <span className="tag tag-muted">Closing</span>
            </div>
            <h2 className="p-heading tl-title">
              From answer accuracy to <span className="grad-violet-cyan">policy optimality</span>
            </h2>
            <p className="p-body tl-message">
              Future LLM systems will not only generate answers. They will search, call tools, spend tokens, incur latency,
              and act under uncertainty. Tool-Lab gives us a controlled way to evaluate and train that behavior.
            </p>
          </div>
          <div className="tl-panel">
            <div className="tl-flow">
              <div className="tl-node">
                <div className="tl-node-label">state</div>
                <div className="tl-node-text">What the model knows now</div>
              </div>
              <div className="tl-arrow">→ action → observation → cost → reward</div>
              <div className="tl-node" style={{ borderColor: "var(--cyan)" }}>
                <div className="tl-node-label" style={{ color: "var(--cyan-light)" }}>
                  evaluate the policy
                </div>
                <div className="tl-node-text">not just the answer</div>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <p className="p-heading" style={{ fontSize: "2rem" }}>
                Questions?
              </p>
              <p className="tl-caption">Davood Wadi · Tool-Lab · NLP Reading Group</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
