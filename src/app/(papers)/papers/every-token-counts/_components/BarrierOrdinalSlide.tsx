import InlineMath from "@/app/(papers)/_components/InlineMath";

// Two PMFs with identical entropy (H=1 bit) but different ordinal spread.
// Illustrates why entropy fails for Likert scales.
// Source: Introduction.tex, presentation-narrative.md
const PMF_A = [0, 0, 0.5, 0, 0.5, 0, 0]; // mass at 3 and 5  → near-centre split
const PMF_B = [0.5, 0, 0, 0, 0, 0, 0.5]; // mass at 1 and 7  → extreme split

function MiniBar({ pmf, color }: { pmf: number[]; color: string }) {
  const max = Math.max(...pmf);
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "60px" }}>
      {pmf.map((p, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", flex: 1 }}>
          <div
            style={{
              width: "100%",
              height: `${(p / max) * 52}px`,
              background: p > 0 ? color : "var(--border)",
              borderRadius: "3px 3px 0 0",
              opacity: p > 0 ? 1 : 0.3,
            }}
          />
          <span style={{ fontSize: "0.6rem", color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
            {i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function BarrierOrdinalSlide() {
  return (
    <section className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Barrier II</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "52rem", marginBottom: "1rem" }}
        >
          Likert scales are ordinal.{" "}
          <span className="grad-violet-cyan">Entropy is not.</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          Entropy treats all categories as unordered. It cannot distinguish a model split between
          adjacent responses from one split between the extremes — even when the two distributions
          have identical <InlineMath>{"H"}</InlineMath>.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            maxWidth: "52rem",
          }}
        >
          {/* PMF A */}
          <div
            style={{
              padding: "1.75rem",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderTop: "3px solid var(--cyan-light)",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <MiniBar pmf={PMF_A} color="var(--cyan-light)" />
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <span className="p-small" style={{ color: "var(--text-muted)" }}>Mass at 3 and 5</span>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <span className="p-mono" style={{ fontSize: "0.8125rem", color: "var(--text-faint)" }}>
                  <InlineMath>{"H = 1.00"}</InlineMath>
                </span>
                <span className="p-mono" style={{ fontSize: "0.8125rem", color: "var(--cyan-light)" }}>
                  <InlineMath>{"\\mathrm{Cns} = 0.74"}</InlineMath>
                </span>
              </div>
              <p className="p-small" style={{ color: "var(--text-dim)", marginTop: "0.25rem" }}>
                Near-centre split. Moderate ordinal disagreement.
              </p>
            </div>
          </div>

          {/* PMF B */}
          <div
            style={{
              padding: "1.75rem",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderTop: "3px solid var(--amber-light)",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <MiniBar pmf={PMF_B} color="var(--amber-light)" />
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <span className="p-small" style={{ color: "var(--text-muted)" }}>Mass at 1 and 7</span>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <span className="p-mono" style={{ fontSize: "0.8125rem", color: "var(--text-faint)" }}>
                  <InlineMath>{"H = 1.00"}</InlineMath>
                </span>
                <span className="p-mono" style={{ fontSize: "0.8125rem", color: "var(--amber-light)" }}>
                  <InlineMath>{"\\mathrm{Cns} = 0.00"}</InlineMath>
                </span>
              </div>
              <p className="p-small" style={{ color: "var(--text-dim)", marginTop: "0.25rem" }}>
                Extreme polarization. Complete ordinal dissension.
              </p>
            </div>
          </div>
        </div>

        <p className="p-small" style={{ color: "var(--text-faint)", marginTop: "1.5rem", maxWidth: "52rem" }}>
          Both distributions have <InlineMath>{"H = 1"}</InlineMath> bit. Entropy says they are identical.
          A distance-sensitive consensus measure separates them.
        </p>
      </div>
    </section>
  );
}

