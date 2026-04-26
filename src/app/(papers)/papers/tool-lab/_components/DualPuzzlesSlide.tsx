export default function DualPuzzlesSlide() {
  return (
    <section className="tl-slide">
      <div
        className="tl-slide-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "3rem 4rem",
        }}
      >
        <p
          className="tl-node-label"
          style={{ color: "var(--violet-light)", marginBottom: "1rem" }}
        >
          THE PLOT THICKENS
        </p>
        <h2
          className="p-heading tl-title"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          Before we can propose a framework to measure efficiency, we must
          consider a{" "}
          <span className="grad-violet-cyan">
            second, seemingly unrelated puzzle
          </span>{" "}
          in LLM behavior.
        </h2>
      </div>
    </section>
  );
}
