export default function FrameworkSlide() {
  const layers = [
    {
      n: "01",
      color: "var(--violet-light)",
      title: "Constraint",
      desc: "Does the LLM adhere to the task constraints.",
    },
    {
      n: "02",
      color: "var(--cyan-light)",
      title: "Consensus",
      desc: "Measure consensus and polarization on the scale.",
    },
    {
      n: "03",
      color: "var(--amber-light)",
      title: "Construct",
      desc: "Decompose the observed response into factor effects.",
    },
  ];

  return (
    <section id="framework" className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <hr className="rule-accent" />
      <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "7rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              <span>Our Method</span>
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
              03
            </div>
          </div>
          <div>
            <h2
              className="p-heading"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", marginBottom: "0.75rem" }}
            >
              Three-layer{" "}<span className="grad-violet-cyan">measurement framework</span>
            </h2>
            <p className="p-body" style={{ maxWidth: "52ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
              Each layer addresses one of the methodological barriers.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {layers.map(({ n, color, title, desc }) => (
                <div
                  key={n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                    padding: "1.75rem",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    className="p-mono"
                    style={{
                      fontSize: "1.5rem",
                      color,
                      fontWeight: 700,
                      lineHeight: "1",
                      paddingTop: "0.1rem",
                    }}
                  >
                    {n}
                  </div>
                  <div>
                    <h3 className="p-heading" style={{ fontSize: "1.0625rem", color, marginBottom: "0.4rem" }}>
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
