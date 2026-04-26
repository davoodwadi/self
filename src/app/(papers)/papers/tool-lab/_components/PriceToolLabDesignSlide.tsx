"use client";

import { useState } from "react";
const priceCells = [
    ["Coffee A", "price_dollars", "4"],
    ["Coffee A", "price_cents", "99"],
    ["Coffee A", "weight", "10 oz"],
    ["Coffee B", "price_dollars", "5"],
    ["Coffee B", "price_cents", "00"],
    ["Coffee B", "weight", "11 oz"],
    ["Coffee A", "noise", "organic"],
    ["Coffee B", "noise", "arabica"],
];

export default function PriceToolLabDesignSlide() {
    const [revealed, setRevealed] = useState<string[]>(["Coffee A-price_dollars"]);

    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"14"}</span>
                            <span className="tag tag-muted">{"Study 2.2"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                Process test: <span className="grad-violet-cyan">hide the information</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"Study 2.2 tests whether price-truncation bias emerges because models choose not to acquire costly information."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div className="tl-hidden-grid">
                                {priceCells.map(([option, attr, value]) => {
                                    const id = `${option}-${attr}`;
                                    const isRevealed = revealed.includes(id);
                                    const isCritical = attr === "price_cents" || attr === "weight";
                                    return (
                                        <button
                                            key={id}
                                            className={`tl-cell ${isRevealed ? "tl-cell-revealed" : ""} ${isCritical ? "tl-cell-critical" : ""}`}
                                            type="button"
                                            onClick={() => setRevealed((current) => (current.includes(id) ? current : [...current, id]))}
                                        >
                                            {isRevealed ? value : attr}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="tl-segment-row" style={{ marginTop: "1rem" }}>
                                <span className="tag tag-cyan">$0 tool cost</span>
                                <span className="tag tag-amber">$10 tool cost</span>
                                <span className="tag tag-muted">revealed cells: {revealed.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
