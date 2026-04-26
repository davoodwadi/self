import { ImageFigure } from "./SlidePrimitives";

export default function BiasPuzzleSlide() {
  return (
    <section className="tl-slide" style={{ padding: 0 }}>
      <div
        className="tl-slide-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          minHeight: "800px",
          padding: 0,
        }}
      >
        {/* Top Section */}
        <div
          style={{
            padding: "3rem 4rem 2rem 4rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <div className="tl-kicker" style={{ marginBottom: "1rem" }}>
              <span className="tag tag-violet">04</span>
              <span className="tag tag-muted">Puzzle 2: Bias</span>
            </div>

            <h2
              className="p-heading tl-title"
              style={{
                fontSize: "3rem",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              When LLMs <span className="grad-violet-cyan">look biased</span>
            </h2>

            <p
              className="p-body tl-message"
              style={{ fontSize: "1.15rem", maxWidth: "800px" }}
            >
              Alongside efficiency, there is another open puzzle: LLMs display
              human-like cognitive biases.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Left: Quote */}
            <div
              style={{
                background:
                  "linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%)",
                padding: "1.5rem",
                borderRadius: "0 8px 8px 0",
                borderLeftWidth: "4px",
                borderLeftStyle: "solid",
                borderLeftColor: "var(--violet-light)",
              }}
            >
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--text)",
                  lineHeight: 1.6,
                  marginBottom: "0.75rem",
                }}
              >
                "...the clichés and biases exhibited by LLMs, emphasizing that
                the presence of these biases is not due to the models’ mental
                capacities but due to the data they are trained on."
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.02em",
                }}
              >
                &mdash; Macmillan-Scott & Musolesi (2024).{" "}
                <span style={{ opacity: 0.8 }}>
                  (Ir)rationality and cognitive biases in large language models.
                </span>
              </p>
            </div>

            {/* Right: Hypothesis */}
            <div
              className="tl-node"
              style={{
                borderColor: "var(--cyan-light)",
                background: "rgba(6, 182, 212, 0.05)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                className="tl-node-label"
                style={{ color: "var(--cyan-light)" }}
              >
                THE TOOL-LAB HYPOTHESIS
              </div>
              <div
                className="tl-node-text"
                style={{ fontSize: "1.05rem", lineHeight: 1.5 }}
              >
                Instead of inherited human flaws learned through the training
                data, are some behaviors actually{" "}
                <strong style={{ color: "var(--text)" }}>
                  adaptive, cost-sensitive shortcuts
                </strong>{" "}
                under resource constraints?
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            flex: 1,
            background: "rgba(3, 3, 8, 0.4)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem 4rem",
            position: "relative",
            minHeight: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ImageFigure
              src="/papers/tool-lab/anchoring-literature.png"
              alt="Anchoring literature example"
              caption="Artifact of training data, or adaptive shortcut under constraints?"
              white
            />
          </div>
        </div>
      </div>
    </section>
  );
}
