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
      <div className="flex items-baseline justify-between border-b border-[var(--charcoal)]/12 pb-4">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--champagne)]">
          Knowledge Check
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--charcoal-light)]/70">
          {hasSubmitted ? (isCorrect ? "Correct" : "Incorrect") : "Unanswered"}
        </span>
      </div>

      {/* Question */}
      <p className="mt-5 font-serif text-[1.25rem] leading-[1.25] tracking-[-0.01em] text-[var(--charcoal)] md:text-[1.6rem]">
        {quizData.question_text}
      </p>

      {/* Options — fixed geometry, state carried in colour only */}
      <ul className="mt-6 border-t border-[var(--charcoal)]/10">
        {quizData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isAnswer = index === quizData.correct_answer_index;

          let letter = "text-[var(--charcoal-light)]/70";
          let body = "text-[var(--charcoal-light)]";
          let row = "border-[var(--charcoal)]/10";

          if (hasSubmitted) {
            if (isAnswer) {
              letter = "";
              body = "";
              row = "";
            } else if (isSelected) {
              letter = "text-[var(--crimson)]";
              body = "text-[var(--crimson)]";
              row = "border-[var(--crimson)]/30";
            } else {
              letter = "text-[var(--charcoal-light)]/70";
              body = "text-[var(--charcoal-light)]/70";
            }
          } else if (isSelected) {
            letter = "text-[var(--crimson)]";
            body = "text-[var(--charcoal)]";
            row = "border-[var(--crimson)]/30";
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
                className={`flex w-full items-baseline gap-6 border-b py-3.5 text-left transition-colors duration-150 ${row} ${
                  hasSubmitted
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-[var(--charcoal)]/[0.02]"
                }`}
                style={
                  hasSubmitted && isAnswer
                    ? { borderColor: `${CORRECT}40` }
                    : undefined
                }
              >
                <span
                  className={`w-4 flex-shrink-0 font-sans text-[11px] font-semibold tracking-[0.14em] transition-colors duration-150 ${letter}`}
                  style={answerColour}
                >
                  {optionLetters[index]}
                </span>
                <span
                  className={`text-base font-light leading-relaxed transition-colors duration-150 md:text-lg ${body}`}
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
      <div className="mt-6 flex items-center gap-10">
        <button
          type="button"
          onClick={() => selectedOption !== null && setHasSubmitted(true)}
          disabled={selectedOption === null || hasSubmitted}
          className="border-b border-[var(--charcoal)] pb-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--charcoal)] transition-colors duration-150 hover:border-[var(--crimson)] hover:text-[var(--crimson)] disabled:cursor-not-allowed disabled:border-[var(--charcoal)]/15 disabled:text-[var(--charcoal-light)]/70"
        >
          {hasSubmitted ? "Submitted" : "Submit"}
        </button>

        {quizData.hint && !hasSubmitted && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="font-sans text-[11px] uppercase tracking-[0.22em] text-[var(--charcoal-light)]/70 transition-colors duration-150 hover:text-[var(--champagne)]"
          >
            {showHint ? "Hide hint" : "Hint"}
          </button>
        )}
      </div>

      {/*
        Reserved feedback region. Every variant lives in the same grid cell, so
        the tallest one fixes the height before anything is clicked.
      */}
      <div className="mt-6 grid border-t border-[var(--charcoal)]/12 pt-5">
        {/* idle */}
        <div aria-hidden={stage !== "idle"} className={layer(stage === "idle")}>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--charcoal-light)]/70">
            Choose an answer to continue
          </p>
        </div>

        {/* hint */}
        {quizData.hint && (
          <div aria-hidden={stage !== "hint"} className={layer(stage === "hint")}>
            <span className="mb-3 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--champagne)]">
              Hint
            </span>
            <p className="font-serif text-lg font-light italic leading-relaxed text-[var(--charcoal-light)]">
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
                <div className="border-l border-[var(--crimson)] pl-6">
                  <span className="mb-2.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--crimson)]">
                    Your answer
                  </span>
                  <p className="text-[0.875rem] font-light leading-[1.6] text-[var(--charcoal-light)]">
                    {option.option_explanation}
                  </p>
                </div>
              )}

              {answer.option_explanation && (
                <div className="border-l pl-6" style={{ borderColor: CORRECT }}>
                  <span
                    className="mb-2.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: CORRECT }}
                  >
                    {isAnswer
                      ? "Correct"
                      : `Answer \u2014 ${optionLetters[quizData.correct_answer_index]}`}
                  </span>
                  <p className="text-[0.875rem] font-light leading-[1.6] text-[var(--charcoal-light)]">
                    {answer.option_explanation}
                  </p>
                </div>
              )}

              </div>

              {quizData.correct_answer_citation && (
                <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.18em] text-[var(--charcoal-light)]/70">
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
