import { FlowNode, SlideShell } from "./SlidePrimitives";

export default function ControlledTestbedSlide() {
  return (
    <SlideShell
      number="11"
      eyebrow="Controlled Testbed"
      title={
        <>
          Why <span className="grad-violet-cyan">product choice?</span>
        </>
      }
      message="Marketing tasks give us hidden attributes, known utility functions, interpretable heuristics, and controllable information costs."
    >
      <div className="tl-panel">
        <div className="tl-flow">
          <FlowNode label="hidden attributes" text="Prices, discounts, and weights are revealed only through tool calls." />
          <div className="tl-arrow">↓</div>
          <FlowNode label="known utility" text="The true best option can be computed from product value." accent="var(--violet-light)" />
          <div className="tl-arrow">↓</div>
          <FlowNode label="process score" text="We score both final choice and search behavior." accent="var(--amber-light)" />
        </div>
      </div>
    </SlideShell>
  );
}
