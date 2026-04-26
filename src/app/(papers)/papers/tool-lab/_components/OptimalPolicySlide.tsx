import { MiniTable, StatGrid } from "./SlidePrimitives";

export default function OptimalPolicySlide() {
    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"10"}</span>
                            <span className="tag tag-muted">{"Policy Benchmark"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                From accuracy to <span className="grad-violet-cyan">policy optimality</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"Once the task is an MDP, the observed LLM trajectory can be compared against exhaustive search, heuristic search, and the optimal cost-aware policy."}</p>
                    </div>
                    <div>
                        <div style={{ display: "grid", gap: "1rem" }}>
                            <StatGrid
                                stats={[
                                    { value: "High", label: "Exhaustive cost" },
                                    { value: "Low", label: "Heuristic cost" },
                                    { value: "Best", label: "Optimal net reward" },
                                ]}
                            />
                            <MiniTable
                                columns={[
                                    { label: "Policy" },
                                    { label: "Tool Cost" },
                                    { label: "Accuracy" },
                                    { label: "Interpretation" },
                                ]}
                                rows={[
                                    ["Exhaustive", "High", "High", "Accurate but inefficient"],
                                    ["Heuristic", "Low", "Variable", "Cheap but brittle"],
                                    ["Optimal", "Moderate", "High enough", "Cost-aware planning"],
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
