"use client";

import { useState } from "react";
const cells = [
    { id: "a-price", label: "A price", value: "$4" },
    { id: "a-cents", label: "A cents", value: "99c" },
    { id: "a-weight", label: "A weight", value: "10 oz" },
    { id: "b-price", label: "B price", value: "$5" },
    { id: "b-cents", label: "B cents", value: "00c" },
    { id: "b-weight", label: "B weight", value: "11 oz" },
    { id: "a-roast", label: "A roast", value: "dark" },
    { id: "b-roast", label: "B roast", value: "medium" },
];

export default function ToolLabInterfaceSlide() {
    const [revealed, setRevealed] = useState<string[]>(["a-price"]);
    const cost = revealed.length * 10;

    function toggle(id: string) {
        setRevealed((current) => (current.includes(id) ? current : [...current, id]));
    }

    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"07"}</span>
                            <span className="tag tag-muted">{"Observable Search"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                Tool-Lab makes <span className="grad-violet-cyan">search observable</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"Task-relevant information is hidden behind explicit tool calls, so the model's information-acquisition process becomes measurable."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div className="tl-hidden-grid">
                                {cells.map((cell) => {
                                    const isRevealed = revealed.includes(cell.id);
                                    return (
                                        <button
                                            key={cell.id}
                                            className={`tl-cell ${isRevealed ? "tl-cell-revealed" : ""}`}
                                            onClick={() => toggle(cell.id)}
                                            type="button"
                                        >
                                            {isRevealed ? cell.value : cell.label}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="tl-panel tl-panel-tight" style={{ marginTop: "1rem" }}>
                                <div className="tl-node-label" style={{ color: "var(--cyan-light)" }}>
                                    tools
                                </div>
                                <p className="p-mono" style={{ color: "var(--text-dim)", marginTop: "0.5rem" }}>
                                    inspect_cell(option_id, attribute_id)
                                    <br />
                                    submit_choice(option_id)
                                </p>
                                <p className="tl-caption">Cumulative tool cost: {cost}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
