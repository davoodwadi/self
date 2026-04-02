import type { ParsedCourseContent } from "./course-content";

export type CourseQuizOption = {
  option_text: string;
  option_explanation: string | null;
};

export type CourseQuiz = {
  slide_id: string;
  question_text: string;
  hint: string | null;
  correct_answer_citation: string | null;
  options: CourseQuizOption[];
  correct_answer_index: number;
};

export type CourseQuizLookup = Record<string, CourseQuiz | undefined>;

export type CourseQuizWiringPlanItem = {
  slideId: string;
  quizDataProp: string;
};

export function createCourseQuizLookup(
  quizzes: readonly CourseQuiz[],
): CourseQuizLookup {
  const lookup: CourseQuizLookup = {};

  for (const quiz of quizzes) {
    lookup[quiz.slide_id] = quiz;
  }

  return lookup;
}

export function getQuizMarkedSlideIds(
  parsedContent: Pick<ParsedCourseContent, "slides">,
) {
  return parsedContent.slides
    .filter((slide) => slide.shouldGenerateQuiz)
    .map((slide) => slide.slideId);
}

export function buildQuizLookupDeclaration(
  quizzesImportName = "quizzesData",
  lookupName = "quizBySlideId",
) {
  return `const ${lookupName} = createCourseQuizLookup(${quizzesImportName});`;
}

export function buildQuizDataProp(
  slideId: string,
  lookupName = "quizBySlideId",
) {
  return `quizData={${lookupName}[\"${slideId}\"]}`;
}

export function createQuizWiringPlan(
  parsedContent: Pick<ParsedCourseContent, "slides">,
  lookupName = "quizBySlideId",
): CourseQuizWiringPlanItem[] {
  return getQuizMarkedSlideIds(parsedContent).map((slideId) => ({
    slideId,
    quizDataProp: buildQuizDataProp(slideId, lookupName),
  }));
}
