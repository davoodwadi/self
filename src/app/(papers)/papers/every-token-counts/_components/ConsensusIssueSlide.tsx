import Image from "next/image";

export default function ConsensusIssueSlide() {
  return (
    <section className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Layer 02 — Consensus: The Problem</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "48rem", marginBottom: "1rem" }}
        >
          Why entropy <span className="grad-violet-cyan">fails for Likert scales</span>
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", marginTop: "4rem" }}>
          <div>
            <p className="p-body" style={{ fontSize: "1.0625rem", marginBottom: "1.5rem" }}>
              Identical means can mask fundamentally different regimes, a model polarized between 1 and 7
              looks the same as one concentrated on 4. 
            </p>
            <p className="p-body" style={{ fontSize: "1.0625rem", marginBottom: "1.5rem" }}>
              Traditional measures of dispersion, such as Shannon entropy, assume categorical values.
              They are agnostic to the distances between responses.
            </p>
            <p className="p-body" style={{ fontSize: "1.0625rem", color: "var(--accent)" }}>
              Entropy alone cannot distinguish these three distributions.
            </p>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { file: "hist_4.png",       entropy: "0.00", label: "All mass on one point" },
              { file: "hist_3,5.png",     entropy: "1.00", label: "Adjacent poles" },
              { file: "hist_1,7.png",     entropy: "1.00", label: "Opposite extremes" },
            ].map(({ file, entropy, label }) => (
              <div
                key={file}
                style={{
                  display: "grid",
                  gridTemplateColumns: "6rem 1fr auto",
                  alignItems: "center",
                  gap: "1rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "0.625rem 1rem",
                }}
              >
                <div style={{ position: "relative", height: "3.5rem" }}>
                  <Image
                    src={`/papers/every-token-counts/figures/${file}`}
                    alt={label}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className="p-small" style={{ color: "var(--text-muted)" }}>{label}</span>
                <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                    H = {entropy}
                  </div>
                </div>
              </div>
            ))}
            <p className="p-small" style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Rows 2 and 3 have identical entropy (H = 1.00) but represent completely different behavior: entropy is blind to ordinal distance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
