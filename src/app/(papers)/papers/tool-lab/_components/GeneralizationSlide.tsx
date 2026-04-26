const domains = [
    "retrieval-augmented generation",
    "web search",
    "code debugging",
    "database querying",
    "legal or medical information gathering",
    "workflow automation",
    "interactive decision support",
];

export default function GeneralizationSlide() {
    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"23"}</span>
                            <span className="tag tag-muted">{"Generalization"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                Many LLM tasks are <span className="grad-violet-cyan">Tool-Lab problems</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"The same framework applies wherever an LLM must acquire information sequentially under cost or uncertainty."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                                {domains.map((domain, index) => (
                                    <span key={domain} className={`tag ${index % 3 === 0 ? "tag-cyan" : index % 3 === 1 ? "tag-violet" : "tag-amber"}`}>
                                        {domain}
                                    </span>
                                ))}
                            </div>
                            <div className="tl-node" style={{ marginTop: "1.5rem" }}>
                                <div className="tl-node-label" style={{ color: "var(--cyan-light)" }}>
                                    shared structure
                                </div>
                                <div className="tl-node-text">Hidden state + tool action + cost + final task reward.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
