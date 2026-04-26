import { MiniTable, SlideShell, StatGrid } from "./SlidePrimitives";

export default function OptimalPolicySlide() {
  return (
    <SlideShell
      number="10"
      eyebrow="Policy Benchmark"
      title={
        <>
          From accuracy to <span className="grad-violet-cyan">policy optimality</span>
        </>
      }
      message="Once the task is an MDP, the observed LLM trajectory can be compared against exhaustive search, heuristic search, and the optimal cost-aware policy."
    >
      <div style={{ display: "grid", gap: "1rem" }}>
        <StatGrid
          stats={[
            { value: "High", label: "Exhaustive cost" },
            { value: "Low", label: "Heuristic cost" },
            { value: "Best", label: "Optimal net reward" },
          ]}
        />
        <MiniTable
          columns={[
            { label: "Policy" },
            { label: "Tool Cost" },
            { label: "Accuracy" },
            { label: "Interpretation" },
          ]}
          rows={[
            ["Exhaustive", "High", "High", "Accurate but inefficient"],
            ["Heuristic", "Low", "Variable", "Cheap but brittle"],
            ["Optimal", "Moderate", "High enough", "Cost-aware planning"],
          ]}
        />
      </div>
    </SlideShell>
  );
}
