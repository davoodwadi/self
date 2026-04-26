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
} from "recharts";

const data = [
  {
    name: "Deal (Flash Lite)",
    "$0 Cost": 5,
    "$10 Cost": 4,
  },
  {
    name: "Value (Flash Lite)",
    "$0 Cost": 12,
    "$10 Cost": 8,
  },
  {
    name: "Deal (Pro)",
    "$0 Cost": 84,
    "$10 Cost": 65,
  },
  {
    name: "Value (Pro)",
    "$0 Cost": 100,
    "$10 Cost": 41,
  },
];

export default function DiscountToolLabResultsSlide() {
  return (
    <section className="tl-slide">
      <div className="tl-slide-inner">
        <div className="tl-two-rows">
          <div>
            <div className="tl-kicker">
              <span className="tag tag-violet">{"18"}</span>
              <span className="tag tag-muted">{"Study 3.2 Results"}</span>
            </div>
            <h2 className="p-heading tl-title">
              {
                <>
                  Discounts become{" "}
                  <span className="grad-violet-cyan">
                    shortcuts under constraint
                  </span>
                </>
              }
            </h2>
            <p className="p-body tl-message">
              {
                "Tool-Lab reveals whether the model actually computes value or uses the discount cue as a shortcut. When tool costs are imposed, we observe a sharp drop in optimal choices, especially for the 'Pro' model under the 'Value' prompt."
              }
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
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  domain={[0, 100]}
                  label={{
                    value: "Optimal %",
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
                  formatter={(value) => [`${value}%`, undefined]}
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
                />
                <Bar
                  dataKey="$10 Cost"
                  fill="#c084fc"
                  name="$10 Tool Cost"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
