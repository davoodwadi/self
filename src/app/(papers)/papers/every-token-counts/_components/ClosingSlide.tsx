export default function ClosingSlide() {
  return (
    <section
      className="dot-grid p-slide"
      style={{
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        className="ambient-glow"
        style={{
          top: "10%",
          left: "5%",
          width: "600px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-glow"
        style={{
          bottom: "10%",
          right: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />

      <div style={{ maxWidth: "72rem", margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
        >
          {/* Left: Thank you + Q&A */}
          <div>
            <div className="section-label" style={{ marginBottom: "2rem" }}>
              <span>Thank You</span>
            </div>
            <h2
              className="p-heading"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: "1.1", marginBottom: "1.5rem" }}
            >
              Questions?
            </h2>
            <p className="p-body" style={{ fontSize: "1.0625rem", maxWidth: "40ch", marginBottom: "2.5rem" }}>
              Happy to dig into any part of the framework, measurement theory,
              the exact-PMF approach, model selection, or the bias findings.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span className="p-small" style={{ color: "var(--text-faint)" }}>Davood Wadi, PhD</span>
              <span className="p-small" style={{ color: "var(--text-faint)" }}>Marketing and AI</span>
              <a
                href="davood.wadi@hec.ca"
                className="p-mono"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--cyan-light)",
                  textDecoration: "none",
                  marginTop: "0.5rem",
                }}
              >
                davood.wadi@hec.ca
              </a>
            </div>
          </div>

          {/* Right: Collaboration invitation */}
          <div style={{ paddingTop: "1rem" }}>
            <div
              style={{
                padding: "2rem 2.25rem",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderTop: "3px solid var(--violet-light)",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <p
                className="p-mono"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--violet-light)",
                  marginBottom: "1.25rem",
                }}
              >
                Open Questions
              </p>
              <p className="p-body" style={{ fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
                This framework generalizes to any psychometric instrument.
                If you are working on LLM evaluation methods, there may be natural overlap.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  "Behavioral LLM research",
                  "Resource/Bounded rationality of LLMs",
                  "The decision making process of LLMs",
                ].map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "var(--cyan-light)",
                        flexShrink: 0,
                        marginTop: "0.45rem",
                      }}
                    />
                    <span className="p-small" style={{ color: "var(--text-dim)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
