"use client";

import { useState } from "react";
import { SlideShell } from "./SlidePrimitives";

const questions = [
  "How should we define optimal policies when the utility function is only partially known?",
  "Should tool-use benchmarks reward process efficiency even when final answers are correct?",
  "Can models learn transferable search policies across tasks?",
  "How do token-level reasoning costs relate to explicit tool-call costs?",
  "What forms of RL are most appropriate for training cost-aware tool use?",
];

const costs = ["tool calls", "tokens", "latency", "money"];

export default function OpenQuestionsSlide() {
  const [choice, setChoice] = useState(costs[0]);

  return (
    <SlideShell
      id="questions"
      number="24"
      eyebrow="Discussion"
      title={<span className="grad-violet-cyan">Open questions</span>}
      message="Tool-Lab opens several NLP research questions around tool-use evaluation, optimal stopping, and cost-aware reasoning."
    >
      <div className="tl-panel">
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {questions.map((question, index) => (
            <div className="tl-trace-step" key={question} style={{ gridTemplateColumns: "auto 1fr" }}>
              <span className="tl-step-index">{index + 1}</span>
              <span className="p-body" style={{ lineHeight: 1.45 }}>
                {question}
              </span>
            </div>
          ))}
        </div>
        <div className="tl-segment-row" style={{ marginTop: "1rem" }}>
          {costs.map((cost) => (
            <button
              key={cost}
              type="button"
              className={`tl-segment ${choice === cost ? "tl-segment-active" : ""}`}
              onClick={() => setChoice(cost)}
            >
              {cost}
            </button>
          ))}
        </div>
        <p className="tl-caption">Audience poll: include {choice} first in process-aware evaluation.</p>
      </div>
    </SlideShell>
  );
}
