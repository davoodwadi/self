import { BIBTEX } from "./data";

export default function CitationSlide() {
  return (
    <section id="cite" className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <hr className="rule-accent" />
      <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Citation</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", maxWidth: "44rem", marginBottom: "3rem" }}
        >
          Cite this work
        </h2>
        <div
          className="code-block"
          style={{
            padding: "2rem",
            borderRadius: "12px",
            marginBottom: "3rem",
            overflowX: "auto",
          }}
        >
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              lineHeight: "1.75",
              color: "var(--text-dim)",
              margin: 0,
              whiteSpace: "pre",
            }}
          >
            {BIBTEX}
          </pre>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            { label: "Author", value: "Davood Wadi" },
            { label: "Affiliation", value: "HEC Montréal" },
            { label: "Year", value: "2025" },
            { label: "Venue", value: "EMNLP 2026" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: "1.25rem 1.5rem",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
              }}
            >
              <p
                className="p-mono"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "0.4rem",
                }}
              >
                {label}
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--text)" }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
