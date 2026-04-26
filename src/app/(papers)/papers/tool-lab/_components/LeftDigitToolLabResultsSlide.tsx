"use client";

import {
  BarChart,
  Bar,
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
    name: "Flash Lite",
    "$0 Cost": 2.066725,
    cost0Error: 0.01801,
    "$10 Cost": 0.722101,
    cost10Error: 0.017613,
  },
  {
    name: "Pro",
    "$0 Cost": 2.152962,
    cost0Error: 0.016489,
    "$10 Cost": 1.097779,
    cost10Error: 0.027295,
  },
];

export default function LeftDigitToolLabResultsSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-rows">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"15"}</span>
              <span className="tag tag-muted">{"Study 2.2 Results"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Constraints amplify{" "}
                  <span className="grad-violet-cyan">left-digit bias</span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "When tool costs are introduced, the effective value (ounces per dollar) drops significantly across both models. As search truncates under resource constraints, models fall back on the heuristic left-digit pricing cue, reducing overall choice optimality. "
              }
              {"But the Pro model does better with limited information."}
            </p>
          </div>
          <div style={{ height: "700px", width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                />
                <YAxis
                  tickFormatter={(value) => `${Number(value).toFixed(1)}`}
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  domain={[0, 2.5]}
                  label={{
                    value: "Effective Oz / $",
                    angle: -90,
                    position: "insideLeft",
                    offset: -10,
                    style: {
                      textAnchor: "middle",
                      fill: "rgba(255,255,255,0.7)",
                    },
                  }}
                />
                <Tooltip
                  formatter={(value: any) => [
                    Number(value).toFixed(2),
                    undefined,
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar
                  dataKey="$0 Cost"
                  fill="#38bdf8"
                  name="$0 Tool Cost"
                  radius={[4, 4, 0, 0]}
                >
                  <ErrorBar
                    dataKey="cost0Error"
                    width={4}
                    strokeWidth={2}
                    stroke="rgba(255,255,255,0.5)"
                  />
                </Bar>
                <Bar
                  dataKey="$10 Cost"
                  fill="#c084fc"
                  name="$10 Tool Cost"
                  radius={[4, 4, 0, 0]}
                >
                  <ErrorBar
                    dataKey="cost10Error"
                    width={4}
                    strokeWidth={2}
                    stroke="rgba(255,255,255,0.5)"
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
