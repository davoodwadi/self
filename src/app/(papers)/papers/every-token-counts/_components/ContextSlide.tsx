export default function ContextSlide() {
  return (
    <section id="question" className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <hr className="rule-accent" />
      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          paddingTop: "5rem",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        <div style={{ position: "sticky", top: "7rem" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span>Context</span>
          </div>
          <div
            className="p-mono"
            style={{ fontSize: "clamp(4rem, 8vw, 6rem)", color: "var(--text-faint)", lineHeight: "1", userSelect: "none" }}
          >
            01
          </div>
        </div>
        <div>
          <h2
            className="p-heading"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", marginBottom: "2rem" }}
          >
            Chinese AI has gone global.{" "}<span className="grad-amber">Can we trust it?</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              "Chinese LLMs (DeepSeek, Qwen) are now widely used in North America and beyond.",
              "Users increasingly ask: do these models carry a political or cultural agenda?",
              "We study this through ethnocentrism — the tendency to favor one's own country.",
            ].map((bullet, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span
                  className="p-mono"
                  style={{ color: "var(--violet-light)", fontSize: "0.75rem", marginTop: "0.3rem", flexShrink: 0 }}
                >
                  —
                </span>
                <p className="p-body" style={{ fontSize: "1.0625rem", lineHeight: "1.7" }}>
                  {bullet}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem 2rem",
              background: "var(--card)",
              border: "1px solid var(--border-mid)",
              borderRadius: "12px",
            }}
          >
            <p
              className="p-mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--violet-light)",
                marginBottom: "0.75rem",
              }}
            >
              Definition
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-dim)", lineHeight: "1.75" }}>
              <strong style={{ color: "var(--text)" }}>Ethnocentrism</strong> is in-group bias: the tendency of a group
              to evaluate its own country favorably while being dismissive of foreign countries. Originally from
              consumer behavior, extended to political science, sociology, and psychology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
