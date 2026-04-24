import InlineMath from "@/app/(papers)/_components/InlineMath";
import { Flag } from "./Flag";

// Grand mean μ∅ = 66.25 (composite CETSCALE, range 17–119)
// Effects are Hoeffding decomposition components — deviations from grand mean
// SNR = E/SD (signal-to-noise ratio); dPD = directional probability of difference

const MODEL_EFFECTS = [
  { label: "Aya Expanse 32B",  flag: "CA", e: 21.19,  sd: 13.01, snr: 1.63, dpd: ">0.99", robust: true  },
  { label: "Ministral 14B",   flag: "FR", e: 5.11,   sd: 9.59,  snr: 0.53, dpd: "0.62",  robust: false },
  { label: "Llama 3.3 70B",   flag: "US", e: 0.31,   sd: 12.79, snr: 0.02, dpd: "0.55",  robust: false },
  { label: "Gemma 3 27B",     flag: "US", e: -11.99, sd: 13.15, snr: 0.91, dpd: "0.77",  robust: false },
  { label: "Qwen3 Next 80B",  flag: "CN", e: -14.63, sd: 12.17, snr: 1.20, dpd: "0.93",  robust: true  },
];

const COUNTRY_EFFECTS = [
  { label: "Canada",  flag: "CA", e: 4.62,  sd: 5.72, snr: 0.81, dpd: "0.90", robust: true  },
  { label: "USA",     flag: "US", e: 2.84,  sd: 5.43, snr: 0.52, dpd: "0.55", robust: false },
  { label: "France",  flag: "FR", e: -1.00, sd: 4.72, snr: 0.21, dpd: "0.54", robust: false },
  { label: "China",   flag: "CN", e: -6.46, sd: 6.19, snr: 1.04, dpd: "0.95", robust: true  },
];

export default function MainEffectsSlide() {
  return (
    <section className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Main Effects</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "52rem", marginBottom: "1rem" }}
        >
          Aya far exceeds human ethnocentrism; China is the most{" "}<span className="grad-amber">disfavored country</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          The exact-PMF Hoeffding decomposition isolates model and country main effects as distributions
          centered on the grand mean (<InlineMath>{"\\mu_\\emptyset = 66.25"}</InlineMath>). Robustness is assessed via SNR and dPD — no p-values,
          no sampling assumptions.
        </p>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}
        >
          <div>
            <p
              className="p-mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--violet-light)",
                marginBottom: "1rem",
              }}
            >
              Model main effects (<InlineMath>{"\\mathbb{E}[E_m]"}</InlineMath>, deviation from <InlineMath>{"\\mu_\\emptyset"}</InlineMath>)
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500, fontFamily: "var(--font-body)" }}>Model</th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathbb{E}"}</InlineMath></th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathrm{SD}"}</InlineMath></th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathrm{SNR}"}</InlineMath></th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathrm{dPD}"}</InlineMath></th>
                </tr>
              </thead>
              <tbody>
                {MODEL_EFFECTS.map(({ label, flag, e, sd, snr, dpd, robust }) => (
                  <tr key={label} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                        <Flag country={flag} /> {label}
                      </span>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: e > 0 ? "var(--amber-light)" : "var(--cyan-light)" }}>
                      {e > 0 ? "+" : ""}{e.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-faint)" }}>
                      {sd.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: robust ? "var(--violet-light)" : "var(--text-faint)" }}>
                      {snr.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: robust ? "var(--violet-light)" : "var(--text-faint)" }}>
                      {dpd}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p
              className="p-mono"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--cyan-light)",
                marginBottom: "1rem",
              }}
            >
              Country main effects (<InlineMath>{"\\mathbb{E}[E_t]"}</InlineMath>, deviation from <InlineMath>{"\\mu_\\emptyset"}</InlineMath>)
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500, fontFamily: "var(--font-body)" }}>Country</th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathbb{E}"}</InlineMath></th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathrm{SD}"}</InlineMath></th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathrm{SNR}"}</InlineMath></th>
                  <th style={{ textAlign: "right", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-mid)", color: "var(--text-muted)", fontWeight: 500 }}><InlineMath>{"\\mathrm{dPD}"}</InlineMath></th>
                </tr>
              </thead>
              <tbody>
                {COUNTRY_EFFECTS.map(({ label, flag, e, sd, snr, dpd, robust }) => (
                  <tr key={label} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-body)" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                        <Flag country={flag} /> {label}
                      </span>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: e > 0 ? "var(--amber-light)" : "var(--cyan-light)" }}>
                      {e > 0 ? "+" : ""}{e.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: "var(--text-faint)" }}>
                      {sd.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: robust ? "var(--cyan-light)" : "var(--text-faint)" }}>
                      {snr.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem", textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", color: robust ? "var(--cyan-light)" : "var(--text-faint)" }}>
                      {dpd}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="p-small" style={{ color: "var(--text-faint)", marginTop: "1rem" }}>
              <InlineMath>{"\\mathrm{SNR} = \\mathbb{E}/\\mathrm{SD}"}</InlineMath>. <InlineMath>{"\\mathrm{dPD}"}</InlineMath> = directional probability of difference (Bayesian analog of one-sided p-value). Robust rows highlighted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
