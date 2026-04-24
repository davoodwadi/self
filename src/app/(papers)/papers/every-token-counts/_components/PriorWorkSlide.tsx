export default function PriorWorkSlide() {
  const cards = [
    {
      label: "What we know",
      color: "var(--cyan-light)",
      items: ["Political leanings in LLMs", "Cultural stereotypes"],
    },
    {
      label: "The gap",
      color: "var(--amber-light)",
      items: ["Studies limited to descriptive statistics only", "Aggregate metrics on existing datasets", "No systematic quantification"],
    },
    {
      label: "What is missing",
      color: "var(--violet-light)",
      items: ["Limited statistical guarantees", "Cannot isolate factors"],
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
        style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
      />
      <div style={{ maxWidth: "76rem", margin: "0 auto", position: "relative" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Prior Work</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "44rem", marginBottom: "3rem" }}
        >
          Bias research exists.{" "}<span className="grad-violet-cyan">But it does not measure.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {cards.map(({ label, color, items }) => (
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
