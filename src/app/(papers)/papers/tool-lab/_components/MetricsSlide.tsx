import { MiniTable, SlideShell } from "./SlidePrimitives";

export default function MetricsSlide() {
  return (
    <SlideShell
      id="metrics"
      number="21"
      eyebrow="Metrics"
      title={
        <>
          What we can <span className="grad-violet-cyan">measure</span>
        </>
      }
      message="Tool-Lab enables metrics for process quality, not only final task success."
    >
      <MiniTable
        columns={[
          { label: "Metric" },
          { label: "Captures" },
          { label: "Why It Matters" },
        ]}
        rows={[
          ["Accuracy", "Final outcome", "Standard benchmark score"],
          ["Tool cost", "Resource expenditure", "Efficiency"],
          ["Net reward", "Accuracy minus cost", "Resource rationality"],
          ["Search depth", "Amount of information acquired", "Planning behavior"],
          ["Regret", "Gap from optimal policy", "Policy quality"],
        ]}
      />
    </SlideShell>
  );
}
