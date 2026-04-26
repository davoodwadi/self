import { FlowNode, SlideShell } from "./SlidePrimitives";

export default function MDPSlide() {
  return (
    <SlideShell
      id="mdp"
      number="09"
      eyebrow="MDP"
      title={
        <>
          A sequential <span className="grad-violet-cyan">decision problem</span>
        </>
      }
      message="Tool-Lab can be formalized as a Markov decision process, making LLM tool use comparable to optimal planning policies."
    >
      <div className="tl-panel">
        <div className="tl-flow">
          <FlowNode label="state" text="Revealed cells, hidden cells, cumulative cost, and task context" />
          <div className="tl-arrow">policy chooses action ↓</div>
          <FlowNode label="action" text="Inspect a cell, call a tool, or submit a final answer" accent="var(--violet-light)" />
          <div className="tl-arrow">observation updates state ↓</div>
          <FlowNode label="reward" text="Final task utility minus acquisition cost" accent="var(--amber-light)" />
        </div>
      </div>
    </SlideShell>
  );
}
