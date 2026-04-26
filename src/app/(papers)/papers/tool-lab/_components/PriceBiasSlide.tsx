import { MiniTable } from "./SlidePrimitives";

export default function PriceBiasSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"11"}</span>
              <span className="tag tag-muted">{"Study 2.1"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Testing{" "}
                  <span className="grad-violet-cyan">Left-Digit Bias</span> in
                  LLMs
                </>
              }
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <p className="p-body tl-message">
                {
                  "We conducted a conjoint choice experiment where LLMs evaluated 913 non-dominated choice sets of ground coffee. We introduced left-digit pricing (.99) randomly to half of the alternatives to test if LLMs exhibit human-like pricing heuristics."
                }
              </p>
              <p className="p-body tl-message">
                {
                  "Results show that larger LLMs exhibit a massive left-digit bias, overvaluing the .99 cent ending far beyond its actual mathematical value. The small model remains rational, evaluating purely on price."
                }
              </p>
            </div>
          </div>
          <div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div className="tl-panel">
                <div className="tl-node-label">Sample Choice Set</div>
                <MiniTable
                  columns={[
                    { label: "Brand" },
                    { label: "Weight", align: "right" },
                    { label: "Price", align: "right" },
                  ]}
                  rows={[
                    ["Starbucks", "18 oz", "$12.00"],
                    ["McCafé", "24 oz", "$13.99"],
                    ["Maxwell House", "28.4 oz", "$14.96"],
                    ["Folgers", "27 oz", "$12.99"],
                  ]}
                />
                <p className="tl-caption">
                  Half of the alternatives received a $0.01 price drop to
                  trigger the left-digit effect.
                </p>
              </div>

              <div className="tl-panel">
                <div className="tl-node-label">
                  Equivalent Price Reduction ($)
                </div>
                <MiniTable
                  columns={[
                    { label: "Model" },
                    { label: "Perceived Value of 1¢ Drop", align: "right" },
                  ]}
                  rows={[
                    ["Gemini 3.1 Pro (Large)", "$0.22"],
                    ["Gemini 3 Flash (Medium)", "$0.14"],
                    ["Gemini 3.1 Flash Lite (Small)", "-$0.01"],
                  ]}
                />
                <p className="tl-caption">
                  For the large model, a 1¢ drop to .99 feels like a 22¢ price
                  reduction, inflating the discount by 22x.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
