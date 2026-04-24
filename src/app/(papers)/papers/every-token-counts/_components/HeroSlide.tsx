export default function HeroSlide() {
  return (
    <section
      className="dot-grid"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "9rem 2rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="ambient-glow"
        style={{
          top: "15%",
          left: "20%",
          width: "500px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-glow"
        style={{
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />
      <div style={{ maxWidth: "76rem", margin: "0 auto", width: "100%", position: "relative" }}>
        <div className="fade-up" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <span className="tag tag-violet">Research Manuscript</span>
          {/* <span className="tag tag-amber">EMNLP 2026</span> */}
          <span className="tag tag-muted">NLP · LLM Evaluation · Psychometrics</span>
        </div>
        <h1
          className="p-display fade-up delay-100"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", marginBottom: "1rem" }}
        >
          Every{" "}<span className="grad-violet-cyan">Token</span>{" "}Counts
        </h1>
        <p
          className="p-display-italic fade-up delay-200"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.65rem)", maxWidth: "52rem", marginBottom: "2.5rem" }}
        >
          Isolating Latent Behavior of LLMs via Exact Likert Distributions
        </p>
        <div
          className="fade-up delay-300"
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)" }}>
            Davood Wadi
          </span>
          <span style={{ color: "var(--border-mid)" }}>·</span>
          <span className="p-small">HEC Montréal · 2026</span>
        </div>
        <blockquote
          className="fade-up delay-400"
          style={{
            borderLeft: "2px solid var(--violet)",
            paddingLeft: "1.5rem",
            maxWidth: "56rem",
            marginBottom: "3.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "2.1rem",
              fontStyle: "italic",
              lineHeight: "1.85",
              color: "var(--text-dim)",
            }}
          >
            "Can I trust Chinese AI models?"
          </p>
        </blockquote>
        {/* <div className="fade-up delay-500" style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
          <a href="#question" className="btn-p btn-p-primary">Explore</a>
          <a href="#cite" className="btn-p btn-p-ghost">Cite Paper</a>
        </div> */}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-faint)",
        }}
      >
        {/* <span className="p-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom, var(--border-mid), transparent)",
          }}
        /> */}
      </div>
    </section>
  );
}
