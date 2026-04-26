import { FlowNode } from "./SlidePrimitives";

export default function FailureModesSlide() {
    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"20"}</span>
                            <span className="tag tag-muted">{"Diagnosis"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                Capability failure or <span className="grad-violet-cyan">rational tradeoff?</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"Final-answer evaluation often collapses distinct mechanisms. Tool-Lab can diagnose why an LLM succeeded or failed."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div className="tl-flow">
                                <FlowNode label="1. knew what mattered?" text="Did the model inspect the relevant attributes?" />
                                <div className="tl-arrow">if yes ↓</div>
                                <FlowNode label="2. integrated correctly?" text="Did it compute value from the acquired information?" accent="var(--violet-light)" />
                                <div className="tl-arrow">if yes ↓</div>
                                <FlowNode label="3. stopped rationally?" text="Was further search worth less than its expected cost?" accent="var(--amber-light)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
