import { MiniTable } from "./SlidePrimitives";

export default function PriceBiasSlide() {
    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"13"}</span>
                            <span className="tag tag-muted">{"Study 2.1"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                The lower dollar <span className="grad-violet-cyan">looks better</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"LLMs can prefer an option with a lower whole-dollar price even when another option has better economic value."}</p>
                    </div>
                    <div>
                        <MiniTable
                            columns={[
                                { label: "Option" },
                                { label: "Dollars", align: "right" },
                                { label: "Cents", align: "right" },
                                { label: "Weight", align: "right" },
                                { label: "True Value" },
                            ]}
                            rows={[
                                ["Coffee A", "4", "99", "10 oz", "Lower"],
                                ["Coffee B", "5", "00", "11 oz", "Higher"],
                            ]}
                        /><p className="tl-caption">The misleading cue is the whole-dollar amount. The true comparison requires cents and weight.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
