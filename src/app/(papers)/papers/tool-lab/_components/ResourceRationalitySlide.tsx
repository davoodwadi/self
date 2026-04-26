"use client";

import { useState } from "react";
import { Bullets } from "./SlidePrimitives";
import { Slider } from "@/components/ui/slider";

export default function ResourceRationalitySlide() {
  const [cost, setCost] = useState(15);

  // Calculate data points for n = 0 to 6
  const data = Array.from({ length: 7 }).map((_, n) => {
    const value = 100 * (1 - Math.pow(0.5, n));
    const totalCost = n * cost;
    const utility = value - totalCost;
    return { n, value, totalCost, utility };
  });

  // Find optimal n (max utility)
  const optimal = data.reduce(
    (max, d) => (d.utility > max.utility ? d : max),
    data[0],
  );

  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"06"}</span>
              <span className="tag tag-muted">{"Resource Rationality"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Bias can be a{" "}
                  <span className="grad-violet-cyan">cost-saving policy</span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "Resource rationality says agents should maximize expected utility net of computation, information, time, and monetary costs."
              }
            </p>
          </div>
          <div>
            <div className="tl-panel">
              <div style={{ display: "grid", gap: "1.25rem" }}>
                <div
                  style={{
                    height: "28rem",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    position: "relative",
                    padding: "1rem",
                    background: "var(--card-dim)",
                  }}
                >
                  <svg
                    viewBox="0 0 700 260"
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    {/* Baseline */}
                    <line
                      x1="50"
                      y1="160"
                      x2="650"
                      y2="160"
                      stroke="var(--border-mid)"
                      strokeWidth="2"
                    />

                    {/* Value Curve */}
                    <polyline
                      fill="none"
                      stroke="var(--cyan)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      points={data
                        .map((d) => `${d.n * 100 + 50},${160 - d.value}`)
                        .join(" ")}
                    />

                    {/* Cost Line */}
                    <polyline
                      fill="none"
                      stroke="var(--amber)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      points={data
                        .map((d) => `${d.n * 100 + 50},${160 - d.totalCost}`)
                        .join(" ")}
                    />

                    {/* Utility Curve */}
                    <polyline
                      fill="none"
                      stroke="var(--violet)"
                      strokeWidth="4"
                      points={data
                        .map((d) => `${d.n * 100 + 50},${160 - d.utility}`)
                        .join(" ")}
                    />

                    {/* Highlight Optimal Column */}
                    <g transform={`translate(${optimal.n * 100 + 50}, 0)`}>
                      <rect
                        x="-40"
                        y="20"
                        width="80"
                        height="30"
                        rx="4"
                        fill="var(--violet-pale)"
                        stroke="var(--violet)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <text
                        x="0"
                        y="40"
                        textAnchor="middle"
                        fill="var(--violet-light)"
                        fontSize="14"
                        fontWeight="bold"
                        fontFamily="var(--font-body)"
                      >
                        Optimal
                      </text>
                      <line
                        x1="0"
                        y1="50"
                        x2="0"
                        y2="260"
                        stroke="var(--violet)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.5"
                      />
                    </g>

                    {/* Utility Nodes */}
                    {data.map((d) => (
                      <circle
                        key={d.n}
                        cx={d.n * 100 + 50}
                        cy={160 - d.utility}
                        r={d.n === optimal.n ? 6 : 4}
                        fill={
                          d.n === optimal.n ? "var(--violet)" : "var(--card)"
                        }
                        stroke="var(--violet)"
                        strokeWidth="2"
                      />
                    ))}

                    {/* X Axis Labels */}
                    {data.map((d) => (
                      <text
                        key={d.n}
                        x={d.n * 100 + 50}
                        y="195"
                        textAnchor="middle"
                        fill="var(--text-muted)"
                        fontSize="14"
                        fontFamily="var(--font-mono)"
                      >
                        {d.n}
                      </text>
                    ))}
                    <text
                      x="350"
                      y="235"
                      textAnchor="middle"
                      fill="var(--text-dim)"
                      fontSize="14"
                      fontFamily="var(--font-body)"
                    >
                      Number of Search API Calls
                    </text>
                  </svg>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "0",
                          borderTop: "2px dashed var(--cyan)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        Expected Accuracy
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "0",
                          borderTop: "2px dashed var(--amber)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        Token / Latency Cost
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "3px",
                          background: "var(--violet)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        Net Utility
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="p-mono"
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.76rem",
                        }}
                      >
                        Cost per Call
                      </span>
                      <span
                        className="p-mono"
                        style={{ color: "var(--text)", fontSize: "0.76rem" }}
                      >
                        {cost}
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={50}
                      step={1}
                      value={[cost]}
                      onValueChange={(vals) => setCost(vals[0])}
                      className="w-full"
                    />
                  </div>
                </div>

                <Bullets
                  items={[
                    "Classical rationality: exhaustively search for the perfect answer.",
                    "Bounded rationality: use heuristics because compute is limited.",
                    "Resource rationality: stop when another API call isn't worth the token cost.",
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
