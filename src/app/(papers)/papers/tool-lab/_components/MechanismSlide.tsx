import { ImageFigure } from "./SlidePrimitives";

export default function MechanismSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-row">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"16"}</span>
              <span className="tag tag-muted">{"Mechanism"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Bias is mediated by{" "}
                  <span className="grad-violet-cyan">search</span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "Tool-Lab lets us test whether final-output bias is explained by the model's information-acquisition process."
              }
            </p>
          </div>
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <ImageFigure
              className="!max-h-none h-full"
              src="/papers/tool-lab/mediation2-no-prompt.drawio.png"
              alt="Mediation diagram linking model size, tool cost, information search, and choice optimality"
              white
              caption="Model size maps to planning capacity; tool cost maps to resource constraint; search maps to the tool-use policy; choice optimality maps to task reward."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
