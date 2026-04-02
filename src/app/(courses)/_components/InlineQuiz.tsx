"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Lightbulb, ExternalLink } from "lucide-react";
import type { CourseQuiz } from "@/lib/course-quiz";

const optionLetters = ["A", "B", "C", "D", "E", "F"];

export default function InlineQuiz({
  quizData,
}: {
  quizData: CourseQuiz | undefined;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setHasSubmitted(true);
    }
  };

  if (!quizData) {
    return <></>;
  }

  const isCorrect = selectedOption === quizData.correct_answer_index;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 relative">
      {/* Champagne Gold top accent bar */}
      <div className="h-1 bg-[var(--champagne)]" />

      <div className=" shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-8 py-10 md:px-12 md:py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 flex items-center justify-center bg-[var(--champagne)]/10 rounded-sm">
              <Lightbulb className="w-4 h-4 text-[var(--champagne)]" />
            </div>
            <span className="text-xs font-bold tracking-[0.25em] text-[var(--champagne)] uppercase font-sans">
              Knowledge Check
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-serif text-[var(--charcoal)] leading-snug tracking-tight">
            {quizData.question_text}
          </p>
          {/* Champagne gold hairline divider */}
          <div className="mt-6 h-px w-16 bg-[var(--champagne)]" />
        </div>

        {/* Options */}
        <div className="space-y-3 mb-10">
          {quizData.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isActuallyCorrect = index === quizData.correct_answer_index;

            let containerStyle =
              "border-[var(--charcoal)]/10 hover:border-[var(--champagne)]/40 hover:bg-[var(--champagne)]/[0.02]";
            let letterBg =
              "bg-[var(--charcoal)]/5 text-[var(--charcoal-light)]";
            let textStyle = "text-[var(--charcoal-light)]";

            if (hasSubmitted) {
              if (isActuallyCorrect) {
                containerStyle = "border-[#2d5016]/40 bg-[#2d5016]/[0.04]";
                letterBg = "bg-[#2d5016]/10 text-[#2d5016]";
                textStyle = "text-[#2d5016] font-medium";
              } else if (isSelected && !isActuallyCorrect) {
                containerStyle =
                  "border-[var(--crimson)]/40 bg-[var(--crimson)]/[0.04]";
                letterBg = "bg-[var(--crimson)]/10 text-[var(--crimson)]";
                textStyle = "text-[var(--crimson)]";
              } else {
                containerStyle = "border-[var(--charcoal)]/5 opacity-35";
                letterBg =
                  "bg-[var(--charcoal)]/3 text-[var(--charcoal-light)]/50";
              }
            } else if (isSelected) {
              containerStyle =
                "border-[var(--champagne)] bg-[var(--champagne)]/[0.03]";
              letterBg = "bg-[var(--champagne)] text-[var(--surface)]";
              textStyle = "text-[var(--charcoal)] font-medium";
            }

            return (
              <div key={index}>
                <button
                  disabled={hasSubmitted}
                  onClick={() => setSelectedOption(index)}
                  className={`w-full text-left px-6 py-5 border transition-colors duration-300 ${containerStyle} ${
                    !hasSubmitted ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div className="flex items-start md:items-center gap-5">
                    {/* Letter indicator or result icon */}
                    <div className="flex-shrink-0">
                      {hasSubmitted && isActuallyCorrect ? (
                        <div className="w-9 h-9 flex items-center justify-center bg-[#2d5016]/10 rounded-sm">
                          <CheckCircle2 className="w-5 h-5 text-[#2d5016]" />
                        </div>
                      ) : hasSubmitted && isSelected && !isActuallyCorrect ? (
                        <div className="w-9 h-9 flex items-center justify-center bg-[var(--crimson)]/10 rounded-sm">
                          <XCircle className="w-5 h-5 text-[var(--crimson)]" />
                        </div>
                      ) : (
                        <div
                          className={`w-9 h-9 flex items-center justify-center rounded-sm text-sm font-bold tracking-wide font-sans transition-colors duration-300 ${letterBg}`}
                        >
                          {optionLetters[index]}
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-lg leading-relaxed font-sans transition-colors duration-300 ${textStyle}`}
                    >
                      {option.option_text}
                    </span>
                  </div>
                </button>

                {/* Explanation panel */}
                {hasSubmitted &&
                  (isSelected || isActuallyCorrect) &&
                  option.option_explanation && (
                    <div
                      className={`mx-6 mt-0 px-6 py-5 border-l-2 ${
                        isActuallyCorrect
                          ? "border-l-[#2d5016]/30 bg-[#2d5016]/[0.03]"
                          : "border-l-[var(--crimson)]/30 bg-[var(--crimson)]/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isActuallyCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#2d5016]" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[var(--crimson)]" />
                        )}
                        <span
                          className={`text-xs font-bold uppercase tracking-[0.2em] font-sans ${
                            isActuallyCorrect
                              ? "text-[#2d5016]"
                              : "text-[var(--crimson)]"
                          }`}
                        >
                          {isActuallyCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                      <p className="text-base leading-relaxed text-[var(--charcoal-light)] font-sans pl-6">
                        {option.option_explanation}
                      </p>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--charcoal)]/8">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || hasSubmitted}
            className="w-full sm:w-auto px-10 py-3.5 bg-[var(--charcoal)] hover:bg-[var(--champagne)] text-[var(--surface)] font-bold tracking-[0.15em] uppercase text-xs font-sans disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {hasSubmitted ? "Submitted" : "Submit Answer"}
          </button>

          {quizData.hint && !hasSubmitted && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-semibold font-sans text-[var(--charcoal-light)]/60 hover:text-[var(--champagne)] uppercase tracking-[0.15em] transition-colors duration-300"
            >
              {showHint ? "Hide Hint" : "View Hint"}
            </button>
          )}
        </div>

        {/* Hint */}
        {showHint && !hasSubmitted && quizData.hint && (
          <div className="mt-6 px-6 py-5 border-l-2 border-l-[var(--champagne)]/40 bg-[var(--champagne)]/[0.04]">
            <span className="text-xs font-bold text-[var(--champagne)] uppercase tracking-[0.2em] font-sans block mb-2">
              Hint
            </span>
            <p className="text-lg font-light italic text-[var(--charcoal-light)] font-serif leading-relaxed">
              {quizData.hint}
            </p>
          </div>
        )}

        {/* Citation */}
        {hasSubmitted && isCorrect && quizData.correct_answer_citation && (
          <div className="mt-8 pt-5 border-t border-[var(--charcoal)]/8 flex items-start gap-3">
            <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--charcoal-light)]/40" />
            <span className="text-sm font-sans text-[var(--charcoal-light)]/70">
              <strong className="text-[var(--charcoal)] font-semibold mr-1.5">
                Source:
              </strong>
              {quizData.correct_answer_citation}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
