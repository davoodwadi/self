import { Flag } from "./Flag";

const HUMAN_ROWS = [
  { label: "Detroit (USA)",    mean: 68.58, sd: 25.96 },
  { label: "Carolinas (USA)",  mean: 61.28, sd: 24.41 },
  { label: "Denver (USA)",     mean: 57.84, sd: 26.10 },
  { label: "Los Angeles (USA)",mean: 56.62, sd: 26.37 },
  { label: "Students (Pre)",   mean: 51.92, sd: 16.37 },
  { label: "Students (Post)",  mean: 53.39, sd: 16.52 },
];

const LLM_ROWS = [
  { label: "Aya Expanse 32B",  mean: 89.11, sd: 1.32,  flag: "CA" },
  { label: "Llama 3.3 70B",   mean: 71.99, sd: 0.95,  flag: "US" },
  { label: "Ministral 14B",   mean: 70.20, sd: 5.25,  flag: "FR" },
  { label: "Gemma 3 27B",     mean: 60.32, sd: 0.94,  flag: "US" },
  { label: "Qwen3 Next 80B",  mean: 53.85, sd: 1.17,  flag: "CN" },
];

// Max human mean for scale reference
const SCALE_MAX = 120;

export default function LLMvsHumansSlide() {
  return (
    <section
      id="results"
      className="p-slide"
      style={{ padding: "8rem 2rem", backgroundColor: "var(--surface)", position: "relative" }}
    >
      <hr className="rule-accent" />
      <div style={{ maxWidth: "76rem", margin: "0 auto", paddingTop: "5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "7rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              <span>Results</span>
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
              05
            </div>
          </div>
          <div>
            <h2
              className="p-heading"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", marginBottom: "0.75rem" }}
            >
              LLMs score at the{" "}<span className="grad-violet-cyan">extreme end</span>{" "}of human ethnocentrism
            </h2>
            <p className="p-body" style={{ maxWidth: "52ch", marginBottom: "2.5rem", fontSize: "1.0625rem" }}>
              Composite CETSCALE scores (sum of 17 items, range 17-119) for the Target = USA condition.
              Human data are historical population samples from Shimp and Sharma (1987).
              Several models exceed the most ethnocentric human population ever recorded.
            </p>

            {/* Human populations */}
            <p className="p-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--amber-light)", marginBottom: "0.75rem" }}>
              Human populations
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "2rem" }}>
              {HUMAN_ROWS.map(({ label, mean, sd }) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "13rem 1fr 5rem", alignItems: "center", gap: "0.75rem" }}>
                  <span className="p-small" style={{ color: "var(--text-muted)" }}>{label}</span>
                  <div style={{ position: "relative", height: "0.5rem", background: "var(--border)", borderRadius: "4px" }}>
                    <div style={{
                      position: "absolute", left: 0, top: 0, height: "100%",
                      width: `${(mean / SCALE_MAX) * 100}%`,
                      background: "var(--amber-light)", borderRadius: "4px", opacity: 0.6,
                    }} />
                  </div>
                  <span className="p-mono" style={{ fontSize: "0.78rem", color: "var(--amber-light)", textAlign: "right" }}>
                    {mean.toFixed(1)} <span style={{ color: "var(--text-faint)", fontSize: "0.7rem" }}>±{sd.toFixed(1)}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* LLM models */}
            <p className="p-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--violet-light)", marginBottom: "0.75rem" }}>
              LLMs (Target = USA)
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {LLM_ROWS.map(({ label, mean, sd, flag }) => {
                const exceedsHuman = mean > 68.58;
                return (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "13rem 1fr 5rem", alignItems: "center", gap: "0.75rem" }}>
                    <span className="p-small" style={{ color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Flag country={flag} /> {label}
                    </span>
                    <div style={{ position: "relative", height: "0.5rem", background: "var(--border)", borderRadius: "4px" }}>
                      <div style={{
                        position: "absolute", left: 0, top: 0, height: "100%",
                        width: `${(mean / SCALE_MAX) * 100}%`,
                        background: exceedsHuman ? "var(--cyan-light)" : "var(--violet-light)",
                        borderRadius: "4px",
                      }} />
                      {/* human max reference line */}
                      <div style={{
                        position: "absolute", top: "-3px", bottom: "-3px",
                        left: `${(68.58 / SCALE_MAX) * 100}%`,
                        width: "1px", background: "var(--amber-light)", opacity: 0.5,
                      }} />
                    </div>
                    <span className="p-mono" style={{ fontSize: "0.78rem", color: exceedsHuman ? "var(--cyan-light)" : "var(--violet-light)", textAlign: "right" }}>
                      {mean.toFixed(1)} <span style={{ color: "var(--text-faint)", fontSize: "0.7rem" }}>±{sd.toFixed(1)}</span>
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="p-small" style={{ color: "var(--text-faint)", marginTop: "1.25rem" }}>
              Vertical line marks the highest human population mean (Detroit, 68.58).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
