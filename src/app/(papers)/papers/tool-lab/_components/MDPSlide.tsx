import { FlowNode, MiniTable, StatGrid } from "./SlidePrimitives";

export default function MDPSlide() {
  return (
    <section id="mdp" className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"09"}</span>
              <span className="tag tag-muted">{"MDP & Benchmarks"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  A sequential{" "}
                  <span className="grad-violet-cyan">decision problem</span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "Tool-Lab can be formalized as a Markov decision process, making LLM tool use comparable to optimal planning policies. Once the task is an MDP, the observed LLM trajectory can be compared against exhaustive search, heuristic search, and the optimal cost-aware policy."
              }
            </p>
            <div style={{ marginTop: "2rem" }}>
              <MiniTable
                columns={[
                  { label: "Policy" },
                  { label: "Tool Cost" },
                  { label: "Accuracy" },
                ]}
                rows={[
                  ["Exhaustive", "High", "High"],
                  ["Heuristic", "Low", "Variable"],
                  ["Optimal", "Moderate", "High enough"],
                ]}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div className="tl-panel">
                <div className="tl-flow">
                  <FlowNode
                    label="state"
                    text="Revealed cells, hidden cells, cumulative cost"
                  />
                  <div className="tl-arrow">policy chooses action ↓</div>
                  <FlowNode
                    label="action"
                    text="Inspect a cell or submit a final answer"
                    accent="var(--violet-light)"
                  />
                  <div className="tl-arrow">observation updates state ↓</div>
                  <FlowNode
                    label="reward"
                    text="Final task utility minus acquisition cost"
                    accent="var(--amber-light)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
