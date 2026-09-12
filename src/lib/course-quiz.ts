/**
 * Shared types and helpers for pre-slide knowledge checks.
 *
 * Each course week keeps its questions in a local `quizzes.json` file. A slide
 * opts into a quiz by passing `quizData={quizBySlideId["<slide-id>"]}`, which
 * renders an InlineQuiz screen immediately AFTER that slide.
 *
 * Because the quiz is shown *after* its slide, it must only test material the
 * student has already seen on earlier slides.
 */

export type CourseQuizOption = {
  option_text: string;
  option_explanation: string | null;
};

export type CourseQuiz = {
  /** Matches the `id` of the Slide the quiz is rendered in front of. */
  slide_id: string;
  question_text: string;
  hint: string | null;
  correct_answer_citation: string | null;
  options: CourseQuizOption[];
  correct_answer_index: number;
};

export type CourseQuizLookup = Record<string, CourseQuiz | undefined>;

export function createCourseQuizLookup(
  quizzes: readonly CourseQuiz[],
): CourseQuizLookup {
  const lookup: CourseQuizLookup = {};

  for (const quiz of quizzes) {
    lookup[quiz.slide_id] = quiz;
  }

  return lookup;
}
