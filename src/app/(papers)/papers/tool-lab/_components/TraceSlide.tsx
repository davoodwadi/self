"use client";

import { useState } from "react";
const trace = [
  ["Inspect price dollars for Coffee A", "Observation: A starts at $14"],
  ["Inspect price dollars for Coffee B", "Observation: B starts at $15"],
  ["Inspect weight for Coffee B", "Observation: B has 10.1 oz"],
  ["Stop search", "The marginal value of another cell is judged too low"],
  ["Submit Coffee B", "Final choice is evaluated net of search cost"],
];

export default function TraceSlide() {
  const [step, setStep] = useState(0);

  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"08"}</span>
              <span className="tag tag-muted">{"Trajectory"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  The unit of analysis is the{" "}
                  <span className="grad-violet-cyan">trajectory</span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "Two models can choose the same final answer but follow very different policies."
              }
            </p>
          </div>
          <div>
            <div className="tl-panel">
              <div className="tl-trace">
                {trace.map(([action, observation], index) => {
                  const active = index <= step;
                  return (
                    <div
                      className="tl-trace-step"
                      key={action}
                      style={{
                        opacity: active ? 1 : 0.38,
                        borderColor: active
                          ? "var(--border-mid)"
                          : "var(--border)",
                      }}
                    >
                      <span className="tl-step-index">{index + 1}</span>
                      <span className="p-body" style={{ lineHeight: 1.4 }}>
                        {action}
                      </span>
                      <span className="tl-caption">{observation}</span>
                    </div>
                  );
                })}
              </div>
              <div className="tl-segment-row" style={{ marginTop: "1rem" }}>
                {trace.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`tl-segment ${step === index ? "tl-segment-active" : ""}`}
                    onClick={() => setStep(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
