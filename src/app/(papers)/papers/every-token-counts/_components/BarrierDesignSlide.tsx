export default function BarrierDesignSlide() {
  const cols = [
    {
      side: "Current practice",
      color: "var(--amber-light)",
      items: [
        "Single vignette per condition",
        "One model, one prompt",
        "Hard to isolate cause",
        "Cannot rule out confounds",
      ],
    },
    {
      side: "Our approach",
      color: "var(--violet-light)",
      items: [
        "Fully crossed factorial design",
        "5 models × 4 national targets",
        "All cells filled — main effects isolated",
        "Interaction effects visible",
      ],
    },
  ];

  return (
    <section
      className="p-slide"
      style={{
        padding: "8rem 2rem",
        backgroundColor: "var(--surface)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Barrier I</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "44rem", marginBottom: "3rem" }}
        >
          Design for{" "}<span className="grad-violet-cyan">causal inference,</span> not just observation
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {cols.map(({ side, color, items }) => (
            <div key={side} className="p-card-hover" style={{ padding: "2rem" }}>
              <p
                className="p-mono"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color,
                  marginBottom: "1.25rem",
                }}
              >
                {side}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {items.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color, fontSize: "0.75rem", marginTop: "0.2rem" }}>›</span>
                    <span className="p-body" style={{ fontSize: "0.9375rem" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "1.5rem 2rem",
            background: "var(--card)",
            border: "1px solid var(--violet)",
            borderRadius: "10px",
          }}
        >
          <p
            className="p-mono"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--violet-light)",
              marginBottom: "0.5rem",
            }}
          >
            Key point
          </p>
          <p className="p-body" style={{ fontSize: "1rem" }}>
            Factorial design transforms the research question from "does bias exist?" to "how much and under what
            conditions?"
          </p>
        </div>
      </div>
    </section>
  );
}
