import { FlowNode } from "./SlidePrimitives";

export default function TrainingSlide() {
    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"22"}</span>
                            <span className="tag tag-muted">{"Training"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                Tool-Lab as a <span className="grad-violet-cyan">training environment</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"If Tool-Lab is an MDP, it can support reinforcement learning, imitation learning, and reward shaping for better tool-use policies."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div className="tl-flow">
                                <FlowNode label="LLM policy" text="Chooses inspect or submit actions under a resource constraint" />
                                <div className="tl-arrow">acts in environment ↓</div>
                                <FlowNode label="Tool-Lab" text="Returns observations, costs, final reward, and trace-level feedback" accent="var(--violet-light)" />
                                <div className="tl-arrow">updates via reward or imitation ↓</div>
                                <FlowNode label="trainer" text="Improves stopping and search policies without rewarding unnecessary tools" accent="var(--amber-light)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
