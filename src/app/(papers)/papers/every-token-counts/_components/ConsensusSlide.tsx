import Image from "next/image";
import MathContent from "../../../_components/MathContent";
import InlineMath from "../../../_components/InlineMath";

export default function ConsensusSlide() {
  return (
    <section className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Layer 02 — Consensus: The Solution</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "48rem", marginBottom: "1rem" }}
        >
          Measuring <span className="grad-violet-cyan">internal consistency</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          To remedy this, we use a multidimensional consensus measure. It penalizes spread in proportion
          to the ordinal distances between responses.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <MathContent>
              {`$$\\mathrm{Cns}(\\mathbf{Y}_{\\boldsymbol{\\lambda}})=1+\\sum_{\\mathbf{y}\\in\\mathcal{Y}^K}P(\\mathbf{y})\\log_2\\!\\left(1-\\frac{\\|\\mathbf{y}-\\boldsymbol{\\mu}\\|_2}{d_{\\max}}\\right)$$`}
            </MathContent>
            <p className="p-body" style={{ fontSize: "0.9rem", marginBottom: "2rem", marginTop: "2rem" }}>
              where{" "}
              <InlineMath>{"\\boldsymbol{\\mu}"}</InlineMath> is the itemwise mean vector and{" "}
              <InlineMath>{"d_{\\max}"}</InlineMath> is the maximum diagonal distance on the Likert scale.
            </p>
            <p className="p-body" style={{ fontSize: "0.9rem" }}>
              This demonstrates the level of internal consistency, or polarization, a model has on our ethnocentrism scale. High consensus means probability mass is tightly concentrated; high dissension means it is spread across opposing poles.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
             <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden", padding: "0.5rem" }}>
               <Image
                 src="/papers/every-token-counts/figures/consensus-original-issue.png"
                 alt="Consensus penalization diagram"
                 fill
                 style={{ objectFit: "contain" }}
               />
             </div>
             <p className="p-small" style={{ color: "var(--text-muted)", textAlign: "center" }}>
               Convolving a multi-item scale collapses polarization.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
