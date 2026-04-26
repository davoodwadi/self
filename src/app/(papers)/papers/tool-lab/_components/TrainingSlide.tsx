import {
  Database,
  GitBranch,
  BrainCircuit,
  Scale,
  ArrowRight,
} from "lucide-react";

export default function TrainingSlide() {
  return (
    <section id="future" className="tl-slide">
      <div className="tl-slide-inner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            gap: "5rem",
          }}
        >
          {/* Header Section */}
          <div style={{ textAlign: "center" }}>
            <div
              className="tl-kicker"
              style={{ justifyContent: "center", marginBottom: "1rem" }}
            >
              <span className="tag tag-violet">{"20"}</span>
              <span className="tag tag-muted">{"Training"}</span>
            </div>
            <h2 className="p-heading tl-title">
              Beyond Accuracy:{" "}
              <span className="grad-violet-cyan">Optimizing the Process</span>
            </h2>
            <p
              className="p-body tl-message"
              style={{ maxWidth: "800px", margin: "0 auto" }}
            >
              Current RL methods optimize purely for final response accuracy.
              Tool-Lab enables the creation of self-supervised data to train
              LLMs not just for the final decision, but for the efficiency of
              the entire decision-making process.
            </p>
          </div>

          {/* Clean Flat Horizontal Pipeline */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "2rem",
              paddingTop: "1rem",
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Database size={28} color="var(--cyan-light)" />
                <h3
                  style={{
                    color: "var(--text)",
                    fontSize: "1.15rem",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  Known States
                </h3>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                Start with an environment containing fully defined states and
                parameters.
              </p>
            </div>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "3rem",
                color: "var(--text-dim)",
                opacity: 0.5,
              }}
            >
              <ArrowRight size={24} />
            </div>

            {/* Step 2 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <GitBranch size={28} color="var(--violet-light)" />
                <h3
                  style={{
                    color: "var(--text)",
                    fontSize: "1.15rem",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  MCTS
                </h3>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                Use Monte Carlo Tree Search to explore the state space and find
                the optimal policy.
              </p>
            </div>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "3rem",
                color: "var(--text-dim)",
                opacity: 0.5,
              }}
            >
              <ArrowRight size={24} />
            </div>

            {/* Step 3 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <BrainCircuit size={28} color="#d8b4fe" />
                <h3
                  style={{
                    color: "var(--text)",
                    fontSize: "1.15rem",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  RL Optimization
                </h3>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                Apply reinforcement learning to train the LLM for optimal
                planning and efficient tool calling.
              </p>
            </div>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "3rem",
                color: "var(--text-dim)",
                opacity: 0.5,
              }}
            >
              <ArrowRight size={24} />
            </div>

            {/* Step 4 */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Scale size={28} color="var(--amber-light)" />
                <h3
                  style={{
                    color: "var(--text)",
                    fontSize: "1.15rem",
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  Cost Balancing
                </h3>
              </div>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                Incorporate different tool costs to explicitly balance accuracy
                against resource expenditure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
