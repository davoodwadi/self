"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Lightbulb, ExternalLink } from "lucide-react";

type Option = {
  option_text: string;
  option_explanation: string | null;
};

type QuizData = {
  question_text: string;
  hint: string | null;
  correct_answer_citation: string | null;
  options: Option[];
  correct_answer_index: number;
};

export default function InlineQuiz({
  quizData,
}: {
  quizData: QuizData | undefined;
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
    return (
      // don't show errors - return an empty tag
      <></>
    );
  }

  const isCorrect = selectedOption === quizData.correct_answer_index;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-8 md:p-10 bg-white/20 dark:bg-[#1a1a1a]/70 backdrop-blur-xl border border-[var(--charcoal)]/10 dark:border-white/10 rounded-2xl shadow-xl transition-all">
      <div className="mb-8">
        <h3 className="text-sm font-bold tracking-[0.2em] text-[var(--crimson)] uppercase mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Knowledge Check
        </h3>
        <p className="text-2xl md:text-3xl font-serif text-[var(--charcoal)] leading-snug">
          {quizData.question_text}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {quizData.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isActuallyCorrect = index === quizData.correct_answer_index;

          let optionContainerStyle =
            "border-[var(--charcoal)]/20 hover:border-[var(--crimson)]/50 hover:bg-[var(--crimson)]/5 dark:border-white/20";
          let dotStyle = "border-[var(--charcoal)]/30 dark:border-white/30";
          let textStyle = "text-[var(--charcoal-light)]";

          if (hasSubmitted) {
            if (isActuallyCorrect) {
              // The right answer
              optionContainerStyle =
                "border-green-900 bg-green-50/50 dark:bg-green-900/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]";
              textStyle = "text-green-900 dark:text-green-200 font-medium";
            } else if (isSelected && !isActuallyCorrect) {
              // The wrong answer chosen by user
              optionContainerStyle =
                "border-red-900 bg-red-50/50 dark:bg-red-900/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
              textStyle = "text-red-900 dark:text-red-300 font-bold";
            } else {
              // Unchosen wrong answers
              optionContainerStyle =
                "border-[var(--charcoal)]/10 dark:border-white/5 opacity-40 grayscale";
            }
          } else if (isSelected) {
            // Selected before submission
            optionContainerStyle =
              "border-[var(--crimson)] bg-[var(--crimson)]/5 shadow-[0_0_10px_rgba(153,0,0,0.1)]";
            dotStyle = "border-[var(--crimson)] bg-[var(--crimson)]";
            textStyle = "text-[var(--charcoal)] font-medium";
          }

          return (
            <div key={index} className="relative">
              <button
                disabled={hasSubmitted}
                onClick={() => setSelectedOption(index)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${optionContainerStyle} ${
                  !hasSubmitted
                    ? "cursor-pointer transform hover:-translate-y-0.5"
                    : "cursor-default"
                }`}
              >
                <div className="flex items-start md:items-center">
                  {/* Radio Dot or Icon */}
                  <div className="flex-shrink-0 mr-4 mt-1 md:mt-0">
                    {hasSubmitted && isActuallyCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-900 dark:text-green-400" />
                    ) : hasSubmitted && isSelected && !isActuallyCorrect ? (
                      <XCircle className="w-6 h-6 text-red-900 dark:text-red-500" />
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${dotStyle}`}
                      />
                    )}
                  </div>

                  {/* Option Text */}
                  <span
                    className={`text-lg transition-colors duration-300 ${textStyle}`}
                  >
                    {option.option_text}
                  </span>
                </div>
              </button>

              {/* Show explanation only after submission, specifically for the selected answer OR the correct answer */}
              {hasSubmitted &&
                (isSelected || isActuallyCorrect) &&
                option.option_explanation && (
                  <div
                    className={`mt-3 ml-6 md:ml-10 p-5 text-base rounded-xl border-l-4 shadow-md ${
                      isActuallyCorrect
                        ? "bg-green-100/30 dark:bg-green-900/40 border-green-800/40 text-green-900 dark:text-green-100"
                        : "bg-red-100/30 dark:bg-red-900/40 border-red-800/40 text-red-950 dark:text-red-100"
                    } animate-in fade-in slide-in-from-top-2 duration-500`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {isActuallyCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-900 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-900 dark:text-red-400" />
                      )}
                      <strong className="text-sm uppercase tracking-widest opacity-90">
                        {isActuallyCorrect
                          ? "Correct Answer"
                          : "Your Answer (Incorrect)"}
                      </strong>
                    </div>
                    <div className="text-[1.05rem] leading-relaxed opacity-90 pl-7">
                      {option.option_explanation}
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || hasSubmitted}
          className="w-full sm:w-auto px-8 py-3 bg-[var(--charcoal)] hover:bg-[var(--crimson)] text-[var(--surface)] font-bold tracking-wider uppercase text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {hasSubmitted ? "Answer Submitted" : "Submit Answer"}
        </button>

        {quizData.hint && !hasSubmitted && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm font-medium text-[var(--charcoal-light)] hover:text-[var(--crimson)] underline underline-offset-4 transition-colors"
          >
            {showHint ? "Hide Hint" : "Stuck? View Hint"}
          </button>
        )}
      </div>

      {showHint && !hasSubmitted && quizData.hint && (
        <div className="mt-6 p-5 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl text-[var(--charcoal)] animate-in fade-in slide-in-from-bottom-2">
          <strong className="text-[var(--gold)] uppercase text-xs tracking-wider block mb-1">
            Hint
          </strong>
          <span className="text-lg italic font-light">{quizData.hint}</span>
        </div>
      )}

      {hasSubmitted && isCorrect && quizData.correct_answer_citation && (
        <div className="mt-8 pt-5 border-t border-[var(--charcoal)]/10 flex items-start gap-2 text-sm text-[var(--charcoal-light)]/80 animate-in fade-in">
          <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong className="text-[var(--charcoal)] font-semibold mr-2">
              Learn more:
            </strong>
            {quizData.correct_answer_citation}
          </span>
        </div>
      )}
    </div>
  );
}
