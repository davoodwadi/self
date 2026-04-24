export default function BarriersSlide() {
  const barriers = [
    {
      n: "I",
      color: "var(--violet-light)",
      title: "Experimental Design",
      desc: "Vignettes show that behavior exists. Factorial designs prove which factor causes it.",
    },
    {
      n: "II",
      color: "var(--cyan-light)",
      title: "Ordinal Measurement",
      desc: "LLMs output token probabilities. Likert scales are ordinal. Standard metrics fail to bridge these.",
    },
    {
      n: "III",
      color: "var(--amber-light)",
      title: "Exact vs. Sampled Distribution",
      desc: "Sampling is borrowed from human research, but LLM distributions are exact and known. Sampling adds noise unnecessarily.",
    },
  ];

  return (
    <section id="barriers" className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <hr className="rule-accent" />
      <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          <div style={{ position: "sticky", top: "7rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              <span>The Problem</span>
            </div>
            <div
              className="p-mono"
              style={{
                fontSize: "clamp(4rem, 8vw, 6rem)",
                color: "var(--text-faint)",
                lineHeight: "1",
                userSelect: "none",
              }}
            >
              02
            </div>
          </div>
          <div>
            <h2
              className="p-heading"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", marginBottom: "0.75rem" }}
            >
              Three distinct{" "}<span className="grad-amber">methodological barriers</span>
            </h2>
            <p className="p-body" style={{ maxWidth: "52ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
              Rigorous measurement of LLM ethnocentrism requires overcoming challenges that existing methods cannot
              address.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {barriers.map(({ n, color, title, desc }) => (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                    padding: "1.5rem",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className="p-mono"
                    style={{ fontSize: "1.25rem", color, minWidth: "2.5rem", fontWeight: 700 }}
                  >
                    {n}
                  </div>
                  <div>
                    <h3 className="p-heading" style={{ fontSize: "1rem", color, marginBottom: "0.4rem" }}>
                      {title}
                    </h3>
                    <p className="p-body" style={{ fontSize: "0.9375rem" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
