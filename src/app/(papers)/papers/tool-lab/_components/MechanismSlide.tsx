import { ImageFigure, SlideShell } from "./SlidePrimitives";

export default function MechanismSlide() {
  return (
    <SlideShell
      number="16"
      eyebrow="Mechanism"
      title={
        <>
          Bias is mediated by <span className="grad-violet-cyan">search</span>
        </>
      }
      message="Tool-Lab lets us test whether final-output bias is explained by the model's information-acquisition process."
    >
      <ImageFigure
        src="/papers/tool-lab/mediation2-no-prompt.drawio.png"
        alt="Mediation diagram linking model size, tool cost, information search, and choice optimality"
        white
        caption="Model size maps to planning capacity; tool cost maps to resource constraint; search maps to the tool-use policy; choice optimality maps to task reward."
      />
    </SlideShell>
  );
}
