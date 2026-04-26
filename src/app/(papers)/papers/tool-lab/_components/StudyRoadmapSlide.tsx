import { SlideShell } from "./SlidePrimitives";

const studies = [
  ["2.1", "Price-truncation bias", "Final choices"],
  ["2.2", "Tool-Lab price task", "Search under cost"],
  ["3.1", "Discount-framing bias", "Final choices"],
  ["3.2", "Tool-Lab discount task", "Cue reliance under cost"],
];

export default function StudyRoadmapSlide() {
  return (
    <SlideShell
      id="roadmap"
      number="12"
      eyebrow="Roadmap"
      title={
        <>
          Two biases, <span className="grad-violet-cyan">same mechanism</span>
        </>
      }
      message="The empirical studies use two marketing biases to test whether final-output biases are mediated by information-search policies."
    >
      <div className="tl-panel">
        <div style={{ display: "grid", gap: "1rem" }}>
          {studies.map(([number, title, subtitle]) => (
            <div className="tl-trace-step" key={number} style={{ gridTemplateColumns: "auto 1fr auto" }}>
              <span className="tl-step-index">{number}</span>
              <span className="p-body">{title}</span>
              <span className="tag tag-muted">{subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
