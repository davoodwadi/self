export default function ClosingSlide() {
  return (
    <section id="questions" className="tl-slide dot-grid">
      <div
        className="tl-slide-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          className="tl-kicker"
          style={{ justifyContent: "center", marginBottom: "2rem" }}
        >
          <span className="tag tag-cyan">24</span>
          <span className="tag tag-muted">Closing</span>
        </div>
        <h2 className="tl-hero-title">
          Thank you! <br />
          <span className="grad-violet-cyan">Questions?</span>
        </h2>
        <div style={{ marginTop: "4rem" }}>
          <p
            className="p-body"
            style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}
          >
            Davood Wadi · davood.wadi@hec.ca
          </p>
        </div>
      </div>
    </section>
  );
}
