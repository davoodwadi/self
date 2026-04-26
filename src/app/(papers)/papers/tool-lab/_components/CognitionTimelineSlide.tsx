export default function CognitionTimelineSlide() {
  return (
    <section className="tl-slide">
      <style>{`
        @media (max-width: 860px) {
          .tl-timeline-track { display: none !important; }
          .tl-timeline-marker { display: none !important; }
          .tl-node-year-mobile { display: block !important; }
        }
        .tl-node-year-mobile { display: none; }
      `}</style>

      <div
        className="tl-slide-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="tl-kicker" style={{ justifyContent: "center" }}>
            <span className="tag tag-violet">{"05"}</span>
            <span className="tag tag-muted">{"Evolution of Rationality"}</span>
          </div>
          <h2
            className="p-heading tl-title"
            style={{
              maxWidth: "800px",
              fontSize: "3.5rem",
              lineHeight: 1.1,
              marginTop: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            From <span className="grad-violet-cyan">Pure</span> to{" "}
            <span className="grad-violet-cyan">Resource</span> Rationality
          </h2>
          <p
            className="p-body tl-message"
            style={{ textAlign: "center", fontSize: "1.2rem" }}
          >
            {
              "How our understanding of human cognition has evolved to account for computational and informational limits."
            }
          </p>
        </div>

        <div style={{ width: "100%", position: "relative" }}>
          {/* Horizontal Track Line (hidden on mobile) */}
          <div
            className="tl-timeline-track"
            style={{
              position: "absolute",
              top: "24px",
              left: "16.66%",
              right: "16.66%",
              height: "2px",
              background:
                "linear-gradient(90deg, var(--violet) 0%, var(--cyan) 50%, var(--amber-light) 100%)",
              opacity: 0.5,
              zIndex: 0,
            }}
          />

          <div
            className="tl-stat-grid"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Node 1: Pure Rationality */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                height: "100%",
              }}
            >
              {/* Timeline Marker (Desktop) */}
              <div
                className="tl-timeline-marker"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "var(--violet)",
                    boxShadow: "0 0 0 6px var(--bg), 0 0 20px var(--violet)",
                    marginBottom: "1rem",
                  }}
                />
                <span
                  className="p-mono"
                  style={{
                    color: "var(--violet)",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  ~1944
                </span>
                {/* Connecting Stem */}
                <div
                  style={{
                    width: "2px",
                    height: "1.5rem",
                    background: "var(--violet)",
                    opacity: 0.5,
                    marginTop: "0.5rem",
                    marginBottom: "-1.5rem",
                  }}
                />
              </div>

              {/* Card */}
              <div
                className="tl-node"
                style={{
                  borderColor: "var(--violet)",
                  background: "rgba(139, 92, 246, 0.05)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    className="p-mono tl-node-year-mobile"
                    style={{
                      color: "var(--violet)",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    ~1944
                  </span>
                  <span
                    className="tag tag-muted"
                    style={{ marginLeft: "auto" }}
                  >
                    Homo Economicus
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "1rem",
                  }}
                >
                  Pure Rationality
                </h3>
                <p
                  className="p-body tl-message"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    color: "var(--text-dim)",
                  }}
                >
                  Expected Utility Theory (von Neumann & Morgenstern). Assumes
                  agents have infinite cognitive resources to find the
                  objectively optimal choice.
                </p>
              </div>
            </div>

            {/* Node 2: Bounded Rationality */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                height: "100%",
              }}
            >
              {/* Timeline Marker (Desktop) */}
              <div
                className="tl-timeline-marker"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "var(--cyan)",
                    boxShadow: "0 0 0 6px var(--bg), 0 0 20px var(--cyan)",
                    marginBottom: "1rem",
                  }}
                />
                <span
                  className="p-mono"
                  style={{
                    color: "var(--cyan)",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  ~1955
                </span>
                {/* Connecting Stem */}
                <div
                  style={{
                    width: "2px",
                    height: "1.5rem",
                    background: "var(--cyan)",
                    opacity: 0.5,
                    marginTop: "0.5rem",
                    marginBottom: "-1.5rem",
                  }}
                />
              </div>

              {/* Card */}
              <div
                className="tl-node"
                style={{
                  borderColor: "var(--cyan)",
                  background: "rgba(6, 182, 212, 0.05)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    className="p-mono tl-node-year-mobile"
                    style={{
                      color: "var(--cyan)",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    ~1955
                  </span>
                  <span
                    className="tag tag-muted"
                    style={{ marginLeft: "auto" }}
                  >
                    Satisficing
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "1rem",
                  }}
                >
                  Bounded Rationality
                </h3>
                <p
                  className="p-body tl-message"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    color: "var(--text-dim)",
                  }}
                >
                  Herbert Simon introduces limits to cognition. Instead of
                  maximizing, humans use heuristics and &ldquo;satisfice&rdquo;
                  (accepting a good-enough solution).
                </p>
              </div>
            </div>

            {/* Node 3: Resource Rationality */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                height: "100%",
              }}
            >
              {/* Timeline Marker (Desktop) */}
              <div
                className="tl-timeline-marker"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "var(--amber-light)",
                    boxShadow:
                      "0 0 0 6px var(--bg), 0 0 20px var(--amber-light)",
                    marginBottom: "1rem",
                  }}
                />
                <span
                  className="p-mono"
                  style={{
                    color: "var(--amber-light)",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  ~2020
                </span>
                {/* Connecting Stem */}
                <div
                  style={{
                    width: "2px",
                    height: "1.5rem",
                    background: "var(--amber-light)",
                    opacity: 0.5,
                    marginTop: "0.5rem",
                    marginBottom: "-1.5rem",
                  }}
                />
              </div>

              {/* Card */}
              <div
                className="tl-node"
                style={{
                  borderColor: "var(--amber-light)",
                  background: "rgba(252, 211, 77, 0.05)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    className="p-mono tl-node-year-mobile"
                    style={{
                      color: "var(--amber-light)",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    ~2020
                  </span>
                  <span
                    className="tag tag-amber"
                    style={{ marginLeft: "auto" }}
                  >
                    Optimal Heuristics
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "1rem",
                  }}
                >
                  Resource Rationality
                </h3>
                <p
                  className="p-body tl-message"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    color: "var(--text-dim)",
                  }}
                >
                  Lieder & Griffiths formalize cognition as an optimization
                  problem: maximizing expected utility <em>net of</em>{" "}
                  computational and time costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
