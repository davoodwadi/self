import Image from "next/image";
import MathContent from "../../../_components/MathContent";
import InlineMath from "../../../_components/InlineMath";

export default function ConstraintSlide() {
  return (
    <section
      className="p-slide"
      style={{ padding: "8rem 2rem", backgroundColor: "var(--surface)", position: "relative" }}
    >
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Layer 01 — Constraint</span>
        </div> 
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "48rem", marginBottom: "1rem" }}
        >
          Can the model even{" "}<span className="grad-violet-cyan">follow the task?</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          We define the valid token set <InlineMath>{"\\mathcal{V}_{\\mathrm{val}}"}</InlineMath> as the
          subset of vocabulary tokens that map to the allowed Likert responses 1&ndash;7. Any probability
          mass outside <InlineMath>{"\\mathcal{V}_{\\mathrm{val}}"}</InlineMath> means the model
          fence-sat or hallucinated out of range and cannot be used.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <MathContent>
              {`$$\\text{Failure rate} = 1 - \\sum_{t\\in\\mathcal{V}_{\\mathrm{val}}}P_{\\mathrm{raw}}(t\\mid x)$$`}
            </MathContent>
            <p className="p-body" style={{ fontSize: "0.9rem", marginBottom: "2rem", marginTop: "1rem" }}>
              Probability mass that falls outside the valid token set. the model&apos;s rate of
              non-adherence to the numeric constraint.
            </p>
            <p className="p-body" style={{ fontSize: "0.9rem" }}>
              Subsequent analysis (Layers 2 and 3) operates on the renormalized distribution
              restricted to <InlineMath>{"\\mathcal{V}_{\\mathrm{val}}"}</InlineMath> analogous to
              excluding non-compliant participants in human studies.
            </p>
          </div>
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ position: "relative", width: "100%", paddingBottom: "75%" }}>
              <Image
                src="/papers/every-token-counts/figures/failure_rate.png"
                alt="Failure rate by model and national target"
                fill
                style={{ objectFit: "contain", padding: "1rem" }}
              />
            </div>
            <p
              className="p-small"
              style={{
                textAlign: "center",
                padding: "0.625rem 1rem",
                borderTop: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              Failure rate by model and target country
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
