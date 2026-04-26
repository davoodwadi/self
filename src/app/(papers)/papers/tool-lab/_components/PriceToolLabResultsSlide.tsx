import { MiniTable, SlideShell } from "./SlidePrimitives";

function Bar({ value, color = "var(--cyan-light)" }: { value: number; color?: string }) {
  return (
    <div style={{ height: "0.7rem", background: "var(--surface)", borderRadius: "99px", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color }} />
    </div>
  );
}

export default function PriceToolLabResultsSlide() {
  return (
    <SlideShell
      number="15"
      eyebrow="Study 2.2 Results"
      title={
        <>
          Tool cost changes the <span className="grad-violet-cyan">search policy</span>
        </>
      }
      message="Under high tool costs, the larger model strategically truncates search. Search depth predicts choice optimality, so the policy shift can produce heuristic choices."
    >
      <div style={{ display: "grid", gap: "1rem" }}>
        <div className="tl-panel">
          <div className="tl-node-label">optimal choice rate</div>
          <div style={{ display: "grid", gap: "0.85rem", marginTop: "1rem" }}>
            <span className="p-small">Gemini 3.1 Pro, free information: 76%</span>
            <Bar value={76} />
            <span className="p-small">Gemini 3.1 Pro, $10 tool cost: 7%</span>
            <Bar value={7} color="var(--amber-light)" />
          </div>
        </div>
        <MiniTable
          columns={[
            { label: "Finding" },
            { label: "Value" },
          ]}
          rows={[
            ["Flash Lite baseline optimality", "32%"],
            ["Pro checks cents under $10 cost", "5%"],
            ["Flash Lite checks cents under $10 cost", "42%"],
            ["Search depth -> optimality", "positive, beta = 1.09"],
          ]}
        />
      </div>
    </SlideShell>
  );
}
