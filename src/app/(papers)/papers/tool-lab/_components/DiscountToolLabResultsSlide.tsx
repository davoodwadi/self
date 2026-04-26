import { MiniTable, SlideShell } from "./SlidePrimitives";

export default function DiscountToolLabResultsSlide() {
  return (
    <SlideShell
      number="19"
      eyebrow="Study 3.2 Results"
      title={
        <>
          Discounts become <span className="grad-violet-cyan">shortcuts under constraint</span>
        </>
      }
      message="Tool-Lab reveals whether the model actually computes value or uses the discount cue as a shortcut."
    >
      <MiniTable
        columns={[
          { label: "Prompt" },
          { label: "Model" },
          { label: "Cost", align: "right" },
          { label: "Cheapest", align: "right" },
          { label: "Discount", align: "right" },
          { label: "Optimal", align: "right" },
          { label: "Triad", align: "right" },
        ]}
        rows={[
          ["Deal", "Flash Lite", "$0", "10%", "85%", "5%", "100%"],
          ["Deal", "Flash Lite", "$10", "11%", "85%", "4%", "98%"],
          ["Deal", "Pro", "$0", "9%", "7%", "84%", "100%"],
          ["Deal", "Pro", "$10", "34%", "1%", "65%", "70%"],
          ["Value", "Pro", "$0", "0%", "0%", "100%", "100%"],
          ["Value", "Pro", "$10", "0%", "59%", "41%", "97%"],
        ]}
      />
    </SlideShell>
  );
}
