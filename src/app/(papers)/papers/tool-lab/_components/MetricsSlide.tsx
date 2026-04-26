import { MiniTable } from "./SlidePrimitives";

export default function MetricsSlide() {
    return (
        <section id="metrics" className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"21"}</span>
                            <span className="tag tag-muted">{"Metrics"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                What we can <span className="grad-violet-cyan">measure</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"Tool-Lab enables metrics for process quality, not only final task success."}</p>
                    </div>
                    <div>
                        <MiniTable
                            columns={[
                                { label: "Metric" },
                                { label: "Captures" },
                                { label: "Why It Matters" },
                            ]}
                            rows={[
                                ["Accuracy", "Final outcome", "Standard benchmark score"],
                                ["Tool cost", "Resource expenditure", "Efficiency"],
                                ["Net reward", "Accuracy minus cost", "Resource rationality"],
                                ["Search depth", "Amount of information acquired", "Planning behavior"],
                                ["Regret", "Gap from optimal policy", "Policy quality"],
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
