import Image from "next/image";

// Source: tab:coefficient-table-marginal (Appendix.tex)
// Only interactions with SNR >= 0.8 noted as noteworthy in paper narrative
const FINDINGS = [
  {
    color: "var(--violet-light)",
    title: "US models favor North America, penalize China",
    body: "Gemma 3-27B and Llama 3.3-70B (both US-developed) show the strongest structured interactions: positive toward USA and Canada, sharply negative toward China. The paper identifies these as the primary country-of-origin bias signal.",
  },
  {
    color: "var(--cyan-light)",
    title: "The Chinese model does not reciprocate",
    body: "Qwen3-80B (Chinese) shows near-zero interactions across almost all targets (all SNR < 0.5). It does not exhibit a reciprocal in-group preference of comparable magnitude to the US models.",
  },
  {
    color: "var(--amber-light)",
    title: "Interactions are isolated from baseline behavior",
    body: "The framework mathematically isolates interaction effects from main effects. The country-of-origin bias is a true Model × Target interaction — not an artifact of a model's overall ethnocentrism level.",
  },
];

export default function InteractionSlide() {
  return (
    <section
      className="p-slide"
      style={{ padding: "8rem 2rem", backgroundColor: "var(--surface)", position: "relative" }}
    >
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Interaction Effects</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "52rem", marginBottom: "1rem" }}
        >
          The model's origin{" "}<span className="grad-violet-cyan">shapes which countries it devalues</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          The Model × Target interaction effects, isolated via Hoeffding decomposition, reveal
          country-of-origin bias: which model you use determines not just how ethnocentric it is overall,
          but which specific target countries it systematically favors or disfavors.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {FINDINGS.map(({ color, title, body }) => (
              <div
                key={title}
                style={{
                  padding: "1.5rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${color}`,
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <h3 className="p-heading" style={{ fontSize: "1rem", color, marginBottom: "0.4rem" }}>
                  {title}
                </h3>
                <p className="p-body" style={{ fontSize: "0.9375rem" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", width: "100%", paddingBottom: "100%" }}>
              <Image
                src="/papers/every-token-counts/figures/interactions.png"
                alt="Interaction plot: model origin × national target"
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
              Model × Target interaction plot
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
