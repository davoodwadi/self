"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";

const optionLetters = ["A", "B", "C", "D", "E", "F"];

/**
 * InlineQuiz - Knowledge check placed between slides.
 *
 * Styled as a ruled worksheet rather than a floating card: the question sits
 * under a signal rule, options are separated by hairlines, and feedback is
 * carried by a margin rule plus a mark, never by colour alone.
 */
export default function InlineQuiz({
  quizData,
}: {
  quizData: CourseQuiz | undefined;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (!quizData) return null;

  const isCorrect = selectedOption === quizData.correct_answer_index;

  return (
    <motion.div layout className="w-full max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px w-7 bg-[var(--signal)]" aria-hidden />
          <span className="type-label">Knowledge Check</span>
        </div>
        <p className="type-h2 !text-[1.35rem] md:!text-[1.7rem] max-w-[34ch]">
          {quizData.question_text}
        </p>
      </div>

      {/* Options */}
      <motion.ul layout className="border-t border-[var(--rule)]">
        {quizData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isAnswer = index === quizData.correct_answer_index;
          const showAsCorrect = hasSubmitted && isAnswer;
          const showAsWrong = hasSubmitted && isSelected && !isAnswer;
          const isDimmed = hasSubmitted && !isAnswer && !isSelected;

          return (
            <motion.li
              layout
              key={index}
              className="border-b border-[var(--rule)]"
            >
              <button
                type="button"
                disabled={hasSubmitted}
                onClick={() => setSelectedOption(index)}
                aria-pressed={isSelected}
                className={cn(
                  "w-full text-left flex items-baseline gap-4 px-4 py-5 transition-colors duration-200",
                  !hasSubmitted && "cursor-pointer hover:bg-[var(--paper-2)]",
                  hasSubmitted && "cursor-default",
                  isSelected && !hasSubmitted && "bg-[var(--signal-tint)]",
                  showAsCorrect && "bg-[var(--affirm-tint)]",
                  showAsWrong && "bg-[var(--signal-tint)]",
                  isDimmed && "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-6 type-caption tabular-nums",
                    showAsCorrect && "!text-[var(--affirm)]",
                    showAsWrong && "!text-[var(--signal)]",
                    isSelected && !hasSubmitted && "!text-[var(--signal)]",
                  )}
                >
                  {showAsCorrect ? (
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  ) : showAsWrong ? (
                    <X className="w-4 h-4" strokeWidth={2.5} />
                  ) : (
                    optionLetters[index]
                  )}
                </span>

                <span
                  className={cn(
                    "type-body flex-1",
                    showAsCorrect && "!text-[var(--ink)] font-medium",
                  )}
                >
                  {option.option_text}
                </span>
              </button>

              {/* Explanation for the answer and for whatever was chosen */}
              <AnimatePresence initial={false}>
                {hasSubmitted &&
                  (isSelected || isAnswer) &&
                  option.option_explanation && (
                    <motion.div
                      key="explanation"
                      layout
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          "ml-4 mb-5 pl-4 border-l-2",
                          isAnswer
                            ? "border-[var(--affirm)]"
                            : "border-[var(--signal)]",
                        )}
                      >
                        <span
                          className={cn(
                            "type-label block mb-1.5",
                            isAnswer && "!text-[var(--affirm)]",
                          )}
                        >
                          {isAnswer ? "Correct" : "Not quite"}
                        </span>
                        <p className="type-body !text-[1rem]">
                          {option.option_explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* Hint */}
      {showHint && !hasSubmitted && quizData.hint && (
        <p className="mt-6 pl-4 border-l-2 border-[var(--counter)] type-body italic">
          {quizData.hint}
        </p>
      )}

      {/* Actions */}
      <motion.div layout className="mt-8 flex flex-wrap items-center gap-6">
        {!hasSubmitted ? (
          <>
            <button
              type="button"
              onClick={() => selectedOption !== null && setHasSubmitted(true)}
              disabled={selectedOption === null}
              className={cn(
                "type-label px-7 py-3 transition-colors duration-200",
                selectedOption === null
                  // Outlined rather than faded, so the disabled label stays legible.
                  ? "!text-[var(--ink-3)] border border-[var(--rule-2)] cursor-not-allowed"
                  : "!text-[var(--paper)] bg-[var(--ink)] border border-[var(--ink)] hover:bg-[var(--signal)] hover:border-[var(--signal)] cursor-pointer",
              )}
            >
              Check answer
            </button>

            {quizData.hint && (
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="type-caption hover:text-[var(--signal)] transition-colors cursor-pointer underline underline-offset-4 decoration-[var(--rule-2)]"
              >
                {showHint ? "Hide hint" : "Need a hint?"}
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              setHasSubmitted(false);
              setSelectedOption(null);
              setShowHint(false);
            }}
            className="type-caption hover:text-[var(--signal)] transition-colors cursor-pointer underline underline-offset-4 decoration-[var(--rule-2)]"
          >
            Try again
          </button>
        )}
      </motion.div>

      {/* Source note */}
      {hasSubmitted && isCorrect && quizData.correct_answer_citation && (
        <p className="mt-6 type-caption">
          Source: {quizData.correct_answer_citation}
        </p>
      )}
    </motion.div>
  );
}
