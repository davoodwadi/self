import { FlowNode } from "./SlidePrimitives";

export default function EvaluationGapSlide() {
  return (
    <section id="gap" className="tl-slide">
      <div className="tl-slide-inner" style={{ padding: "3rem 4rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div className="tl-kicker">
            <span className="tag tag-violet">02</span>
            <span className="tag tag-muted">Evaluation Gap</span>
          </div>
          <h2 className="p-heading tl-title">
            Final answers are{" "}
            <span className="grad-violet-cyan">not enough</span>
          </h2>
          <p className="p-body tl-message" style={{ maxWidth: "800px" }}>
            Most LLM benchmarks score final outputs, but agentic models also
            choose what information to gather, what tools to call, how long to
            reason, and when to stop.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              className="tl-node-label"
              style={{
                color: "var(--violet-light)",
                marginBottom: "0.25rem",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            >
              STANDARD BENCHMARK
            </div>
            <div
              className="tl-trace"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "rgba(3, 3, 8, 0.2)",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px dashed var(--border)",
              }}
            >
              <div
                className="tl-trace-step"
                style={{ gridTemplateColumns: "auto 1fr" }}
              >
                <div
                  className="tl-step-index"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "var(--text-muted)",
                  }}
                >
                  1
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontSize: "1.1rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span className="tag tag-muted">Input</span> Task Prompt
                  </div>
                  <div className="tl-caption">
                    "Find me the best laptop under $2000."
                  </div>
                </div>
              </div>

              <div
                style={{
                  textAlign: "center",
                  color: "var(--text-muted)",
                  padding: "1rem 0",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                }}
              >
                Ignores the intermediate process
              </div>

              <div
                className="tl-trace-step"
                style={{ gridTemplateColumns: "auto 1fr" }}
              >
                <div
                  className="tl-step-index"
                  style={{
                    background: "var(--violet-pale)",
                    color: "var(--violet-light)",
                  }}
                >
                  2
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontSize: "1.1rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span className="tag tag-violet">Output</span> Final Answer
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              className="tl-node-label"
              style={{
                color: "var(--cyan-light)",
                marginBottom: "0.25rem",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            >
              AGENTIC TRAJECTORY
            </div>
            <div
              className="tl-trace"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "0.8rem",
                background: "rgba(3, 3, 8, 0.2)",
                borderRadius: "12px",
                padding: "1.5rem",
                border: "1px dashed var(--border)",
              }}
            >
              <div
                className="tl-trace-step"
                style={{ gridTemplateColumns: "auto 1fr auto" }}
              >
                <div
                  className="tl-step-index"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "var(--text-muted)",
                  }}
                >
                  1
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontSize: "1.1rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span className="tag tag-muted">Input</span> Task Prompt
                  </div>
                  <div className="tl-caption">
                    "Find me the best laptop under $2000."
                  </div>
                </div>
                <div className="tl-caption" style={{ textAlign: "right" }}>
                  Cost: $0.000
                </div>
              </div>

              <div
                className="tl-trace-step"
                style={{ gridTemplateColumns: "auto 1fr auto" }}
              >
                <div
                  className="tl-step-index"
                  style={{
                    background: "var(--cyan-pale)",
                    color: "var(--cyan-light)",
                  }}
                >
                  2
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontSize: "1.1rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span className="tag tag-cyan">Action</span> Tool Call
                  </div>
                  <div className="tl-caption">
                    SearchAmazon("best laptop", max_price=2000)
                  </div>
                </div>
                <div className="tl-caption" style={{ textAlign: "right" }}>
                  Cost: $0.001
                </div>
              </div>

              <div
                className="tl-trace-step"
                style={{ gridTemplateColumns: "auto 1fr auto" }}
              >
                <div
                  className="tl-step-index"
                  style={{
                    background: "var(--cyan-pale)",
                    color: "var(--cyan-light)",
                  }}
                >
                  3
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontSize: "1.1rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span className="tag tag-muted">Env</span> Observation
                  </div>
                  <div className="tl-caption">
                    [Top results: MacBook Pro M3, Dell XPS 15, Lenovo ThinkPad
                    X1]
                  </div>
                </div>
                <div className="tl-caption" style={{ textAlign: "right" }}>
                  Cost: $0.002
                </div>
              </div>

              <div
                className="tl-trace-step"
                style={{ gridTemplateColumns: "auto 1fr auto" }}
              >
                <div
                  className="tl-step-index"
                  style={{
                    background: "var(--cyan-pale)",
                    color: "var(--cyan-light)",
                  }}
                >
                  4
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontSize: "1.1rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span className="tag tag-cyan">Action</span> Tool Call
                  </div>
                  <div className="tl-caption">
                    CheckDescription("Dell XPS 15")
                  </div>
                </div>
                <div className="tl-caption" style={{ textAlign: "right" }}>
                  Cost: $0.003
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0.5rem 0",
                  color: "var(--text-muted)",
                  letterSpacing: "0.2em",
                  fontSize: "1.2rem",
                }}
              >
                ...
              </div>

              <div
                className="tl-trace-step"
                style={{ gridTemplateColumns: "auto 1fr auto" }}
              >
                <div
                  className="tl-step-index"
                  style={{
                    background: "var(--cyan-pale)",
                    color: "var(--cyan-light)",
                  }}
                >
                  n
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--text)",
                      fontSize: "1.1rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    <span className="tag tag-violet">Output</span> Final Answer
                  </div>
                </div>
                <div className="tl-caption" style={{ textAlign: "right" }}>
                  Cost: $0.008
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
