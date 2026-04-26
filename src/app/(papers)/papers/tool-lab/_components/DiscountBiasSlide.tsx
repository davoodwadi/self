const products = [
    ["Coffee C", "Cheapest list price", "$7.49", "tag-cyan"],
    ["Coffee D", "20% discount", "$7.99", "tag-amber"],
    ["Coffee E", "Best true value", "$8.29", "tag-violet"],
];

export default function DiscountBiasSlide() {
    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"17"}</span>
                            <span className="tag tag-muted">{"Study 3.1"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                The discount cue <span className="grad-violet-cyan">looks valuable</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"LLMs can favor a salient discount even when the discounted option is not the best economic value."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
                                {products.map(([name, cue, price, tag]) => (
                                    <div className="tl-node" key={name}>
                                        <span className={`tag ${tag}`}>{cue}</span>
                                        <h3 className="p-heading" style={{ fontSize: "1rem", marginTop: "1rem" }}>
                                            {name}
                                        </h3>
                                        <p className="p-mono" style={{ color: "var(--text-dim)", marginTop: "0.35rem" }}>
                                            {price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="tl-caption">True value requires integrating list price, discount percentage, and weight.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
