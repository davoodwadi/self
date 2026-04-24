export default function BarrierSamplingSlide() {
  const cols = [
    {
      label: "Human science",
      color: "var(--amber-light)",
      items: [
        "Latent states are inaccessible — sampling is unavoidable",
        "Variance reflects real individual differences across people",
        "Aggregation estimates the population distribution",
        "Sample size determines precision of that estimate",
      ],
    },
    {
      label: "LLMs",
      color: "var(--violet-light)",
      items: [
        "Each prompt has a fixed, fully observable internal state",
        "Token probabilities are exact — not a sample from anything",
        "Sampling only injects Monte Carlo noise on top of exact data",
        "We recover the exact PMF directly from the logits",
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
        overflow: "hidden",
      }}
    >
      <div
        className="line-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }}
      />
      <div style={{ maxWidth: "76rem", margin: "0 auto", position: "relative" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Barrier III</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "52rem", marginBottom: "1rem" }}
        >
          Stop sampling.{" "}<span className="grad-violet-cyan">We already have the distribution.</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          Human survey methodology requires sampling because population distributions are unknowable. 
          With LLMs, their response distributions are exact and fully observable.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {cols.map(({ label, color, items }) => (
            <div key={label} className="p-card-hover" style={{ padding: "2rem" }}>
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
                {label}
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
      </div>
    </section>
  );
}
