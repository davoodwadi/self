"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ErrorBar,
} from "recharts";

const data = [
  {
    cost: 0,
    "Flash Lite": 5.88,
    FlashLiteError: 0.093564,
    Pro: 5.49,
    ProError: 0.282036,
    "Optimal Policy": 6.0,
  },
  { cost: 0.5, "Optimal Policy": 4.0 },
  { cost: 1.0, "Optimal Policy": 4.0 },
  { cost: 1.5, "Optimal Policy": 4.0 },
  { cost: 2.0, "Optimal Policy": 4.0 },
  { cost: 2.5, "Optimal Policy": 4.0 },
  { cost: 3.0, "Optimal Policy": 4.0 },
  { cost: 3.5, "Optimal Policy": 4.0 },
  { cost: 4.0, "Optimal Policy": 4.0 },
  { cost: 4.5, "Optimal Policy": 4.0 },
  { cost: 5.0, "Optimal Policy": 4.0 },
  { cost: 5.5, "Optimal Policy": 4.0 },
  { cost: 6.0, "Optimal Policy": 4.0 },
  { cost: 6.5, "Optimal Policy": 1.0 },
  { cost: 7.0, "Optimal Policy": 1.0 },
  { cost: 7.5, "Optimal Policy": 1.0 },
  { cost: 8.0, "Optimal Policy": 1.0 },
  { cost: 8.5, "Optimal Policy": 1.0 },
  { cost: 9.0, "Optimal Policy": 1.0 },
  { cost: 9.5, "Optimal Policy": 1.0 },
  {
    cost: 10.0,
    "Flash Lite": 4.72,
    FlashLiteError: 0.189108,
    Pro: 2.2,
    ProError: 0.184791,
    "Optimal Policy": 1.0,
  },
];

export default function ResourceRationalityGapSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-rows">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"16"}</span>
              <span className="tag tag-muted">{"RL Motivation"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  The gap to the{" "}
                  <span className="grad-violet-cyan">
                    actual optimal policy
                  </span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "While the Pro model adapts to tool costs in a resource-rational direction, there remains a massive gap between its behavior and the true optimal policy computed via Monte Carlo Tree Search. This huge discrepancy highlights that heuristic adaptation is not enough, motivating the critical need for future work to train models using Reinforcement Learning to achieve true resource-rational decision making."
              }
            </p>
          </div>
          <div style={{ height: "700px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="cost"
                  type="number"
                  domain={[0, 10]}
                  ticks={[0, 1, 2, 5, 10]}
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  label={{
                    value: "Tool Cost ($)",
                    position: "bottom",
                    offset: 0,
                    style: { fill: "rgba(255,255,255,0.7)", fontSize: 14 },
                  }}
                />
                <YAxis
                  tickFormatter={(value) => `${Number(value).toFixed(1)}`}
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  domain={[0, 6]}
                  label={{
                    value: "Number of Tool Calls",
                    angle: -90,
                    position: "insideLeft",
                    offset: -10,
                    style: {
                      textAnchor: "middle",
                      fill: "rgba(255,255,255,0.7)",
                      fontSize: 14,
                    },
                  }}
                />
                <Tooltip
                  formatter={(value: any) => [
                    Number(value).toFixed(2),
                    undefined,
                  ]}
                  labelFormatter={(label) => `Cost: $${label}`}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Line
                  type="monotone"
                  dataKey="Optimal Policy"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Pro"
                  stroke="#c084fc"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                >
                  <ErrorBar
                    dataKey="ProError"
                    width={4}
                    strokeWidth={2}
                    stroke="rgba(255,255,255,0.5)"
                    direction="y"
                  />
                </Line>
                <Line
                  type="monotone"
                  dataKey="Flash Lite"
                  stroke="#fbbf24"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                >
                  <ErrorBar
                    dataKey="FlashLiteError"
                    width={4}
                    strokeWidth={2}
                    stroke="rgba(255,255,255,0.5)"
                    direction="y"
                  />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
