import Image from "next/image";
import MathContent from "../../../_components/MathContent";
import InlineMath from "../../../_components/InlineMath";

export default function ConsensusSlide() {
  return (
    <section className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Layer 02 — Consensus</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "48rem", marginBottom: "1rem" }}
        >
          Does the model have a{" "}<span className="grad-violet-cyan">clear, consistent opinion?</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          Identical means can mask fundamentally different regimes  a model polarized between 1 and 7
          looks the same as one concentrated on 4. Shannon entropy fails here because it ignores ordinal
          distance. We use a multivariate generalization of Consensus that penalizes spread in proportion
          to distance from the mean.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <MathContent>
              {`$$\\mathrm{Cns}(\\mathbf{Y}_{\\boldsymbol{\\lambda}})=1+\\sum_{\\mathbf{y}\\in\\mathcal{Y}^K}P(\\mathbf{y})\\log_2\\!\\left(1-\\frac{\\|\\mathbf{y}-\\boldsymbol{\\mu}\\|_2}{d_{\\max}}\\right)$$`}
            </MathContent>
            <p className="p-body" style={{ fontSize: "0.9rem", marginBottom: "2rem" }}>
              where{" "}
              <InlineMath>{"\\boldsymbol{\\mu}"}</InlineMath> is the itemwise mean vector and{" "}
              <InlineMath>{"d_{\\max}"}</InlineMath> is the maximum diagonal distance on the Likert scale.
              High consensus means probability mass is tightly concentrated; high dissension means it is spread
              across opposing poles.
            </p>
            <p className="p-body" style={{ fontSize: "0.9rem" }}>
              Unlike entropy, this metric correctly quantifies the model&apos;s opinion certainty 
              severely penalizing polarization at the extremes and rewarding concentrated probability mass.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p className="p-small" style={{ color: "var(--text-muted)", marginBottom: "0.25rem" }}>
              Entropy alone cannot distinguish these three distributions:
            </p>
            {[
              { file: "hist_4.png",       cns: "1.00", entropy: "0.00", label: "All mass on one point" },
              { file: "hist_3,5.png",     cns: "0.74", entropy: "1.00", label: "Adjacent poles" },
              { file: "hist_1,7.png",     cns: "0.00", entropy: "1.00", label: "Opposite extremes" },
            ].map(({ file, cns, entropy, label }) => (
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
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    H = {entropy}
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                    Cns = {cns}
                  </div>
                </div>
              </div>
            ))}
            <p className="p-small" style={{ color: "var(--text-muted)", marginTop: "0.25rem" }}>
              Rows 2 and 3 have identical entropy but opposite consensus -- entropy is blind to ordinal distance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
