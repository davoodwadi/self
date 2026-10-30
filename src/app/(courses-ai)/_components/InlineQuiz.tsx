"use client";

import { useState } from "react";
import type { CourseQuiz } from "@/lib/course-quiz";

const optionLetters = ["A", "B", "C", "D", "E", "F"];

const CORRECT = "#3d5c2a";

/**
 * InlineQuiz - Knowledge check shown between two slides.
 *
 * LAYOUT CONTRACT: the card must not change size when an answer is submitted.
 * Options carry their state in colour alone, and every piece of feedback
 * (hint, explanations, citation) is rendered into one reserved region where all
 * variants share a single CSS grid cell. The region is therefore always as tall
 * as its longest variant, from first paint, and revealing an answer moves
 * nothing above or below it.
 */
export default function InlineQuiz({
  quizData,
}: {
  quizData: CourseQuiz | undefined;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (!quizData) return <></>;

  const isCorrect = selectedOption === quizData.correct_answer_index;
  const answer = quizData.options[quizData.correct_answer_index];

  // Which reserved-region variant is on top right now.
  const stage = hasSubmitted ? "verdict" : showHint && quizData.hint ? "hint" : "idle";

  const layer = (visible: boolean) =>
    `col-start-1 row-start-1 transition-opacity duration-150 ease-out ${
      visible ? "opacity-100" : "pointer-events-none opacity-0"
    }`;

  return (
    <div className="mx-auto w-full max-w-3xl text-left">
      {/* Masthead */}
      <div className="flex items-baseline justify-between border-b border-[var(--ink)]/12 pb-3">
        <span className="font-sans text-sm font-semibold text-[var(--ink-2)]">
          Knowledge Check
        </span>
        <span className="font-sans text-sm font-medium text-[var(--ink-2)]/70">
          {hasSubmitted ? (isCorrect ? "Correct" : "Incorrect") : "Unanswered"}
        </span>
      </div>

      {/* Question */}
      <p className="mt-5 font-sans text-xl font-semibold leading-snug text-[var(--ink)] md:text-2xl">
        {quizData.question_text}
      </p>

      {/* Options: fixed geometry, state carried in colour only */}
      <ul className="mt-6 border-t border-[var(--ink)]/10">
        {quizData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isAnswer = index === quizData.correct_answer_index;

          let letter = "text-[var(--ink-2)]/70";
          let body = "text-[var(--ink-2)]";
          let row = "border-[var(--ink)]/10";

          if (hasSubmitted) {
            if (isAnswer) {
              letter = "";
              body = "";
              row = "";
            } else if (isSelected) {
              letter = "text-[var(--accent)]";
              body = "text-[var(--accent)]";
              row = "border-[var(--accent)]/30";
            } else {
              letter = "text-[var(--ink-2)]/70";
              body = "text-[var(--ink-2)]/70";
            }
          } else if (isSelected) {
            letter = "text-[var(--accent)]";
            body = "text-[var(--ink)]";
            row = "border-[var(--accent)]/30";
          }

          const answerColour =
            hasSubmitted && isAnswer ? { color: CORRECT } : undefined;

          return (
            <li key={index}>
              <button
                type="button"
                disabled={hasSubmitted}
                onClick={() => setSelectedOption(index)}
                aria-pressed={isSelected}
                className={`flex w-full items-baseline gap-5 border-b py-3.5 text-left transition-colors duration-150 ${row} ${
                  hasSubmitted
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-[var(--ink)]/[0.02]"
                }`}
                style={
                  hasSubmitted && isAnswer
                    ? { borderColor: `${CORRECT}40` }
                    : undefined
                }
              >
                <span
                  className={`w-5 flex-shrink-0 font-sans text-sm font-semibold transition-colors duration-150 ${letter}`}
                  style={answerColour}
                >
                  {optionLetters[index]}.
                </span>
                <span
                  className={`font-sans text-base leading-relaxed transition-colors duration-150 md:text-lg ${body}`}
                  style={answerColour}
                >
                  {option.option_text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-8">
        <button
          type="button"
          onClick={() => selectedOption !== null && setHasSubmitted(true)}
          disabled={selectedOption === null || hasSubmitted}
          className="border-b border-[var(--ink)] pb-1 font-sans text-sm font-semibold text-[var(--ink)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:cursor-not-allowed disabled:border-[var(--ink)]/15 disabled:text-[var(--ink-2)]/70"
        >
          {hasSubmitted ? "Submitted" : "Submit"}
        </button>

        {quizData.hint && !hasSubmitted && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="font-sans text-sm font-medium text-[var(--ink-2)]/75 transition-colors duration-150 hover:text-[var(--ink)]"
          >
            {showHint ? "Hide hint" : "Hint"}
          </button>
        )}
      </div>

      {/*
        Reserved feedback region. Every variant lives in the same grid cell, so
        the tallest one fixes the height before anything is clicked.
      */}
      <div className="mt-6 grid border-t border-[var(--ink)]/12 pt-5">
        {/* idle */}
        <div aria-hidden={stage !== "idle"} className={layer(stage === "idle")}>
          <p className="font-sans text-sm text-[var(--ink-2)]/70">
            Choose an answer to continue
          </p>
        </div>

        {/* hint */}
        {quizData.hint && (
          <div aria-hidden={stage !== "hint"} className={layer(stage === "hint")}>
            <span className="mb-2 block font-sans text-sm font-semibold text-[var(--ink-2)]">
              Hint
            </span>
            <p className="font-sans text-base leading-relaxed text-[var(--ink-2)]">
              {quizData.hint}
            </p>
          </div>
        )}

        {/*
          One verdict layer per option, all sharing the same grid cell. The
          region is therefore as tall as the longest possible verdict from
          first paint, whichever option the student ends up choosing.
        */}
        {quizData.options.map((option, index) => {
          const isAnswer = index === quizData.correct_answer_index;

          return (
            <div
              key={index}
              aria-hidden={!(stage === "verdict" && selectedOption === index)}
              className={layer(stage === "verdict" && selectedOption === index)}
            >
              <div className="grid gap-5 md:grid-cols-2 md:gap-8">
              {!isAnswer && option.option_explanation && (
                <div className="border-l border-[var(--accent)] pl-5">
                  <span className="mb-1.5 block font-sans text-sm font-semibold text-[var(--accent)]">
                    Your answer
                  </span>
                  <p className="font-sans text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
                    {option.option_explanation}
                  </p>
                </div>
              )}

              {answer.option_explanation && (
                <div className="border-l pl-5" style={{ borderColor: CORRECT }}>
                  <span
                    className="mb-1.5 block font-sans text-sm font-semibold"
                    style={{ color: CORRECT }}
                  >
                    {isAnswer
                      ? "Correct"
                      : `Answer: ${optionLetters[quizData.correct_answer_index]}`}
                  </span>
                  <p className="font-sans text-[0.9375rem] leading-[1.6] text-[var(--ink-2)]">
                    {answer.option_explanation}
                  </p>
                </div>
              )}

              </div>

              {quizData.correct_answer_citation && (
                <p className="mt-4 font-sans text-sm text-[var(--ink-2)]/75">
                  {quizData.correct_answer_citation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
