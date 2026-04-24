import { Fragment } from "react";
import { MODELS, TARGETS } from "./data";
import { Flag } from "./Flag";

export default function ExperimentSlide() {
  return (
    <section className="p-slide" style={{ padding: "8rem 2rem", position: "relative" }}>
      <hr className="rule-accent" />
      <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "7rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              <span>Experiment</span>
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
              04
            </div>
          </div>
          <div>
            <h2
              className="p-heading"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", marginBottom: "0.75rem" }}
            >
              Five models.{" "}<span className="grad-violet-cyan">Four national targets.</span>
            </h2>
            <p className="p-body" style={{ maxWidth: "52ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
              A fully crossed 5 × 4 factorial design using CETSCALE — the validated consumer
              ethnocentrism measurement instrument — adapted for national attribution.
            </p>
            <div style={{ marginBottom: "2.5rem" }}>
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
                Model factor
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {MODELS.map((m) => (
                  <div key={m.name} className="model-badge" style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                    <span style={{ minWidth: "5rem", display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <Flag country={m.flag} /> {m.origin}
                    </span>
                    <span style={{ color: "var(--text)" }}>{m.name}</span>
                    <span style={{ color: "var(--text-muted)" }}>{m.org}</span>
                  </div>
                ))}
              </div>
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
                Fully crossed design (5 models &times; 4 targets = 20 conditions)
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `auto repeat(${TARGETS.length}, 1fr)`,
                  gap: "2px",
                  fontSize: "0.8rem",
                }}
              >
                <div className="matrix-cell matrix-cell-header" />
                {TARGETS.map((t) => (
                  <div key={t} className="matrix-cell matrix-cell-header" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem" }}>
                    <Flag country={t} /> {t}
                  </div>
                ))}
                {MODELS.map((m) => (
                  <Fragment key={m.name}>
                    <div className="matrix-cell matrix-cell-header" style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <Flag country={m.flag} /> {m.name}
                    </div>
                    {TARGETS.map((t) => {
                      const isInGroup = t.startsWith(m.origin);
                      return (
                        <div
                          key={t}
                          className={isInGroup ? "matrix-cell matrix-cell-ingroup" : "matrix-cell matrix-cell-active"}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.15rem", padding: "0.4rem 0.25rem" }}
                        >
                          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                            {isInGroup ? "In-group" : "Out-group"}
                          </span>
                          <span style={{ fontSize: "0.65rem", opacity: 0.6 }}>
                            {isInGroup ? "favor?" : "bias?"}
                          </span>
                        </div>
                      );
                    })}
                  </Fragment>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "3px", background: "rgba(6,182,212,0.18)", border: "1px solid rgba(6,182,212,0.5)" }} />
                  <span className="p-small" style={{ color: "var(--text-muted)" }}>In-group: model evaluates its own country</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "3px", background: "var(--violet-pale)", border: "1px solid rgba(124,58,237,0.3)" }} />
                  <span className="p-small" style={{ color: "var(--text-muted)" }}>Out-group: model evaluates a foreign country</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
