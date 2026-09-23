"use client";

import React from "react";
import type { CourseExercise } from "@/lib/course-exercise";
import InlineQuiz from "@/components/slide-components/InlineQuiz";
import SortExercise from "./SortExercise";
import MatchExercise from "./MatchExercise";

/**
 * One exercise, of any type. The mechanics are shared by every course; the
 * look comes from the course's theme tokens, and any drawings come from the
 * course through `art` (keyed by card or pair id), so no course's drawing
 * style ends up in another's.
 */
export default function Exercise({
  data,
  art,
}: {
  data: CourseExercise;
  art?: Record<string, React.ReactNode>;
}) {
  switch (data.type) {
    case "quiz":
      return <InlineQuiz quizData={data} />;
    case "sort":
      return <SortExercise data={data} art={art} />;
    case "match":
      return <MatchExercise data={data} art={art} />;
  }
}
