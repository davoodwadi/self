import { MiniTable, SlideShell } from "./SlidePrimitives";

export default function PriceBiasSlide() {
  return (
    <SlideShell
      number="13"
      eyebrow="Study 2.1"
      title={
        <>
          The lower dollar <span className="grad-violet-cyan">looks better</span>
        </>
      }
      message="LLMs can prefer an option with a lower whole-dollar price even when another option has better economic value."
    >
      <MiniTable
        columns={[
          { label: "Option" },
          { label: "Dollars", align: "right" },
          { label: "Cents", align: "right" },
          { label: "Weight", align: "right" },
          { label: "True Value" },
        ]}
        rows={[
          ["Coffee A", "4", "99", "10 oz", "Lower"],
          ["Coffee B", "5", "00", "11 oz", "Higher"],
        ]}
      />
      <p className="tl-caption">The misleading cue is the whole-dollar amount. The true comparison requires cents and weight.</p>
    </SlideShell>
  );
}
