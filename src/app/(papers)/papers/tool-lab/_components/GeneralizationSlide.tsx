import { Terminal, Database } from "lucide-react";

export default function GeneralizationSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center" }}>
            <div
              className="tl-kicker"
              style={{ justifyContent: "center", marginBottom: "1rem" }}
            >
              <span className="tag tag-violet">{"23"}</span>
              <span className="tag tag-muted">{"Generalization"}</span>
            </div>
            <h2 className="p-heading tl-title">
              Tool-Lab Across <span className="grad-violet-cyan">Domains</span>
            </h2>
            <p
              className="p-body tl-message"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              The framework applies universally to any domain where an LLM must
              acquire information sequentially under cost or uncertainty
              constraints.
            </p>
          </div>

          {/* 50/50 Split Screen Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              flex: 1,
              alignItems: "stretch",
            }}
          >
            {/* Panel 1: Code Debugging */}
            <div
              style={{
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderTop: "6px solid var(--cyan-light)",
                borderRadius: "16px",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                background: "rgba(15, 23, 42, 0.2)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Terminal size={40} color="var(--cyan-light)" />
                <h3
                  style={{
                    color: "var(--text)",
                    fontSize: "1.5rem",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  Automated Code Debugging
                </h3>
              </div>

              <div>
                <h4
                  style={{
                    color: "var(--cyan-light)",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Specific Tools
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <code
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    grep_logs(error_code)
                  </code>
                  <code
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    read_file(path, lines)
                  </code>
                  <code
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    run_unit_tests(target)
                  </code>
                </div>
              </div>

              <div>
                <h4
                  style={{
                    color: "var(--cyan-light)",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Training Objective
                </h4>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  Train the agent to minimize high-cost token consumption.
                  Instead of dumping entire log files into context, the model is
                  penalized for excessive reading and rewarded for sequentially
                  pinpointing errors using targeted grep commands and isolated
                  unit tests.
                </p>
              </div>
            </div>

            {/* Panel 2: RAG */}
            <div
              style={{
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderTop: "6px solid var(--violet-light)",
                borderRadius: "16px",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                background: "rgba(15, 23, 42, 0.2)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <Database size={40} color="var(--violet-light)" />
                <h3
                  style={{
                    color: "var(--text)",
                    fontSize: "1.5rem",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  Retrieval-Augmented Gen.
                </h3>
              </div>

              <div>
                <h4
                  style={{
                    color: "var(--violet-light)",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Specific Tools
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <code
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    dense_vector_search(query, k=5)
                  </code>
                  <code
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    exact_keyword_match(term)
                  </code>
                  <code
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    fetch_document(doc_id)
                  </code>
                </div>
              </div>

              <div>
                <h4
                  style={{
                    color: "var(--violet-light)",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Training Objective
                </h4>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  Train the agent to balance latency and compute. It learns the
                  optimal policy of when to stop after a fast dense vector
                  search, and when the uncertainty is high enough to justify the
                  compute cost of chaining deeper exact-keyword queries to find
                  precedent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
