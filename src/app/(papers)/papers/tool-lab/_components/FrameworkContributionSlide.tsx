export default function FrameworkContributionSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            gap: "4rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              className="tl-kicker"
              style={{ justifyContent: "center", marginBottom: "1rem" }}
            >
              <span className="tag tag-muted">{"Contributions"}</span>
            </div>
            <h2 className="p-heading tl-title">
              A new framework for evaluating{" "}
              <span className="grad-violet-cyan">LLMs</span>
            </h2>
            <p
              className="p-body tl-message"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              Given previous studies and the motivation for Tool-Lab, we have
              introduced a new framework for evaluating large language models.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "2rem",
            }}
          >
            <div
              className="tl-panel"
              style={{
                borderTop: "4px solid var(--cyan-light)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                className="tl-node-label"
                style={{ color: "var(--cyan-light)" }}
              >
                1. Efficiency & Cost Optimization
              </div>
              <p
                className=""
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text)",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Accounts for not just the final answer, but also the efficiency
                of the LLM at arriving at the answer while optimizing tool cost.
              </p>
            </div>

            <div
              className="tl-panel"
              style={{
                borderTop: "4px solid var(--violet-light)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                className="tl-node-label"
                style={{
                  color: "var(--violet-light)",
                }}
              >
                2. Resource Rationality
              </div>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text)",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Delivers strong evidence that large language models are resource
                rational in their decision-making.
              </p>
            </div>

            <div
              className="tl-panel"
              style={{
                borderTop: "4px solid var(--amber-light)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                className="tl-node-label"
                style={{
                  color: "var(--amber-light)",
                }}
              >
                3. Optimal Policy Evaluation
              </div>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text)",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Enables LLMs to be evaluated across similar tasks in different
                domains to determine whether they adopt the optimal policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
