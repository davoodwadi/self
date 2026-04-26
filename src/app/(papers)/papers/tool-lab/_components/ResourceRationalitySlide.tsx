"use client";

import { useState } from "react";
import { Bullets } from "./SlidePrimitives";

export default function ResourceRationalitySlide() {
    const [cost, setCost] = useState(40);
    const stopPoint = Math.max(22, 76 - cost * 0.62);

    return (
        <section className="tl-slide">
            <div className="tl-slide-inner">
                <div className="tl-two-col">
                    <div>
                        <div className="tl-kicker">
                            <span className="tag tag-violet">{"06"}</span>
                            <span className="tag tag-muted">{"Resource Rationality"}</span>
                        </div>
                        <h2 className="p-heading tl-title">{
                            <>
                                Bias can be a <span className="grad-violet-cyan">cost-saving policy</span>
                            </>
                        }</h2>
                        <p className="p-body tl-message">{"Resource rationality says agents should maximize expected utility net of computation, information, time, and monetary costs."}</p>
                    </div>
                    <div>
                        <div className="tl-panel">
                            <div style={{ display: "grid", gap: "1.25rem" }}>
                                <div
                                    style={{
                                        height: "14rem",
                                        border: "1px solid var(--border)",
                                        borderRadius: "8px",
                                        position: "relative",
                                        background:
                                            "linear-gradient(to top, rgba(6,182,212,0.12), transparent), linear-gradient(135deg, transparent 0 52%, rgba(252,211,77,0.35) 52% 54%, transparent 54%)",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: `${stopPoint}%`,
                                            top: "12%",
                                            bottom: "12%",
                                            width: "2px",
                                            background: "var(--amber-light)",
                                        }}
                                    />
                                    <span
                                        className="tag tag-amber"
                                        style={{ position: "absolute", left: `calc(${stopPoint}% - 3.2rem)`, top: "0.75rem" }}
                                    >
                                        stop
                                    </span>
                                    <span className="tl-caption" style={{ position: "absolute", left: "1rem", bottom: "0.75rem" }}>
                                        more information
                                    </span>
                                    <span className="tl-caption" style={{ position: "absolute", right: "1rem", top: "0.75rem" }}>
                                        value and cost
                                    </span>
                                </div>
                                <label className="p-mono" style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>
                                    Tool cost: {cost}
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={cost}
                                        onChange={(event) => setCost(Number(event.target.value))}
                                        style={{ width: "100%", marginTop: "0.75rem" }}
                                    />
                                </label>
                                <Bullets
                                    items={[
                                        "Classical rationality: choose the objectively best option.",
                                        "Bounded rationality: use shortcuts because resources are limited.",
                                        "Resource rationality: stop when more information is not worth its cost.",
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
