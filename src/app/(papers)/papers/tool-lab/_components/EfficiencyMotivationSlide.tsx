import { ImageFigure } from "./SlidePrimitives";

export default function EfficiencyMotivationSlide() {
  return (
    <section className="tl-slide">
      <div
        className="tl-slide-inner"
        style={{
          padding: "3rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ marginBottom: "1rem", maxWidth: "900px" }}>
          <div className="tl-kicker">
            <span className="tag tag-violet">03</span>
            <span className="tag tag-muted">Puzzle 1: Efficiency</span>
          </div>
          <h2 className="p-heading tl-title">
            Efficiency is becoming a{" "}
            <span className="grad-violet-cyan">new metric</span>
          </h2>
          <p className="p-body tl-message">
            Model benchmarks increasingly emphasize doing the same task with
            fewer tokens or lower cost. Tool-Lab asks whether the planning
            process itself is efficient.
          </p>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 -2rem",
            position: "relative",
          }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <ImageFigure
              src="/papers/tool-lab/GPT 5.5-Artificial Analysis Intelligence Index.png"
              alt="Artificial Analysis intelligence index image"
              white
              caption="The evaluation target is shifting from raw capability to capability per unit cost."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
