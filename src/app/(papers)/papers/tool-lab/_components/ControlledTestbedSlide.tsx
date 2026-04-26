import { FlowNode } from "./SlidePrimitives";

export default function ControlledTestbedSlide() {
    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"11"}</span>
                            <span className="tag tag-muted">{"Controlled Testbed"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                Why <span className="grad-violet-cyan">product choice?</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"Marketing tasks give us hidden attributes, known utility functions, interpretable heuristics, and controllable information costs."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div className="tl-flow">
                                <FlowNode label="hidden attributes" text="Prices, discounts, and weights are revealed only through tool calls." />
                                <div className="tl-arrow">↓</div>
                                <FlowNode label="known utility" text="The true best option can be computed from product value." accent="var(--violet-light)" />
                                <div className="tl-arrow">↓</div>
                                <FlowNode label="process score" text="We score both final choice and search behavior." accent="var(--amber-light)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
