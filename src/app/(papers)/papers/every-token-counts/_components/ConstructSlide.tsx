import MathContent from "../../../_components/MathContent";
import InlineMath from "../../../_components/InlineMath";

export default function ConstructSlide() {
  return (
    <section
      className="p-slide"
      style={{ padding: "8rem 2rem", backgroundColor: "var(--surface)", position: "relative" }}
    >
      <div style={{ maxWidth: "76rem", margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>
          <span>Layer 03 — Construct</span>
        </div>
        <h2
          className="p-heading"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", maxWidth: "48rem", marginBottom: "1rem" }}
        >
          From item PMFs to{" "}<span className="grad-amber">exact effect distributions</span>
        </h2>
        <p className="p-body" style={{ maxWidth: "60ch", marginBottom: "3rem", fontSize: "1.0625rem" }}>
          Comparing means across conditions is insufficient: it obscures variance and cannot isolate
          one factor from another. We adapt ANOVA to exact probability distributions, giving us
          statistically grounded effect sizes without sampling noise.
        </p>
        <div style={{ maxWidth: "56rem" }}>
          <div>
            <MathContent>
              {`$$P_{S_{\\boldsymbol{\\lambda}}}=P_{Y_{1,\\boldsymbol{\\lambda}}}\\circledast\\cdots\\circledast P_{Y_{K,\\boldsymbol{\\lambda}}}$$`}
            </MathContent>
            <p className="p-body" style={{ fontSize: "0.9rem", marginBottom: "2rem" }}>
              The composite construct score <InlineMath>{"S_{\\boldsymbol{\\lambda}}"}</InlineMath> is the
              sum of <InlineMath>{"K"}</InlineMath> independent item responses. Its exact PMF is derived
              by discrete convolution <InlineMath>{"\\circledast"}</InlineMath> of the individual item
              distributions propagating all aleatoric uncertainty to the construct level.
            </p>
            <MathContent>
              {`$$\\mathbb{E}[S_{\\boldsymbol{\\lambda}}] = \\underbrace{\\mathbb{E}[S_0]}_{\\text{Grand Mean}} + \\sum_{c \\in \\mathcal{C}} \\underbrace{\\mathbb{E}[E_c(\\lambda_c)]}_{\\text{Main Effects}} + \\sum_{\\substack{U \\subseteq \\mathcal{C} \\ |U| \\ge 2}} \\underbrace{\\mathbb{E}[E_U(\\boldsymbol{\\lambda}_U)]}_{\\text{Interactions}}$$`}
            </MathContent>
            <p className="p-body" style={{ fontSize: "0.9rem" }}>
              Hoeffding decomposition: the expected construct score decomposes exactly into a grand
              baseline <InlineMath>{"\\mathbb{E}[S_0]"}</InlineMath>, main effects per factor, and
              interaction effects, recovering classical ANOVA fixed-effects parameters (Theorem 1).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
