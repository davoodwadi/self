import { FlowNode, SlideShell } from "./SlidePrimitives";

export default function TrainingSlide() {
  return (
    <SlideShell
      number="22"
      eyebrow="Training"
      title={
        <>
          Tool-Lab as a <span className="grad-violet-cyan">training environment</span>
        </>
      }
      message="If Tool-Lab is an MDP, it can support reinforcement learning, imitation learning, and reward shaping for better tool-use policies."
    >
      <div className="tl-panel">
        <div className="tl-flow">
          <FlowNode label="LLM policy" text="Chooses inspect or submit actions under a resource constraint" />
          <div className="tl-arrow">acts in environment ↓</div>
          <FlowNode label="Tool-Lab" text="Returns observations, costs, final reward, and trace-level feedback" accent="var(--violet-light)" />
          <div className="tl-arrow">updates via reward or imitation ↓</div>
          <FlowNode label="trainer" text="Improves stopping and search policies without rewarding unnecessary tools" accent="var(--amber-light)" />
        </div>
      </div>
    </SlideShell>
  );
}
