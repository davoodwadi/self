/**
 * Shared types and helpers for in-class exercises.
 *
 * Each course week keeps its exercises in a local `exercises.json`. A topic
 * tagged `[exercise]` in content.md gets one exercise, of whichever type fits
 * what the topic teaches (see the root CLAUDE.md, "Choosing the exercise").
 * A slide opts in with `exercise={exerciseBySlideId["<slide-id>"]}`, which
 * renders the exercise on its own screen immediately AFTER that slide, so it
 * only ever tests what the student has just been taught.
 *
 * A quiz is one exercise type. Entries without a `type` are read as quizzes,
 * so an old `quizzes.json` entry is already a valid exercise.
 */

import type { CourseQuiz } from "./course-quiz";

/** Multiple choice: apply an idea to a new case. */
export type QuizExercise = CourseQuiz & { type: "quiz" };

/** Sort into bins: drop each card into the group it belongs to. */
export type SortExercise = {
  type: "sort";
  slide_id: string;
  prompt: string;
  bins: { id: string; label: string }[];
  cards: {
    id: string;
    text: string;
    /** The `id` of the bin the card belongs in. */
    bin: string;
    /** Shown after checking: why the card belongs where it does. */
    explanation?: string;
  }[];
};

/** Match-up: pair each term with its example, drawing or definition. */
export type MatchExercise = {
  type: "match";
  slide_id: string;
  prompt: string;
  /** Column headings, e.g. "Segmentation base" and "Example". */
  term_label?: string;
  match_label?: string;
  pairs: {
    id: string;
    term: string;
    match: string;
    explanation?: string;
  }[];
};

/** Put it in order: arrange steps or events into a sequence. */
export type OrderExercise = {
  type: "order";
  slide_id: string;
  prompt: string;
  /** The steps in their correct order; students see them shuffled. */
  steps: {
    id: string;
    text: string;
    /** Why the step sits where it does. */
    explanation?: string;
  }[];
};

/** Which one is it?: a run of short cases, each named with one concept from a shared set. */
export type IdentifyExercise = {
  type: "identify";
  slide_id: string;
  prompt: string;
  /** The concepts every case is named with. */
  options: { id: string; label: string }[];
  cases: {
    id: string;
    text: string;
    /** The `id` of the right option. */
    answer: string;
    /** Shown once the case is named correctly. */
    explanation?: string;
  }[];
};

export type CourseExercise = QuizExercise | SortExercise | MatchExercise | OrderExercise | IdentifyExercise;

/** What a week's JSON may hold: typed exercises, or plain quizzes with no `type`. */
export type ExerciseInput = CourseExercise | CourseQuiz;

export type ExerciseLookup = Record<string, CourseExercise | undefined>;

function normalise(item: ExerciseInput): CourseExercise {
  return "type" in item ? item : { ...item, type: "quiz" };
}

export function createExerciseLookup(items: readonly ExerciseInput[]): ExerciseLookup {
  const lookup: ExerciseLookup = {};
  for (const item of items) {
    const exercise = normalise(item);
    lookup[exercise.slide_id] = exercise;
  }
  return lookup;
}

/**
 * A stable shuffle seeded by a string (the slide id), so the server and the
 * client deal the cards in the same order and nothing mismatches on hydration.
 */
export function seededShuffle<T>(items: readonly T[], key: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  let t = h >>> 0;
  const rnd = () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * `seededShuffle`, then moved so no item sits in its own position (index i of
 * `items`), when that is possible. Used wherever a card's place in the deal
 * would otherwise give its answer away.
 */
export function seededDerangement<T>(items: readonly T[], key: string): T[] {
  const out = seededShuffle(items, key);
  const n = out.length;
  if (n < 2) return out;
  for (let pass = 0; pass < n; pass++) {
    let moved = false;
    for (let i = 0; i < n; i++) {
      if (out[i] === items[i]) {
        const j = (i + 1) % n;
        [out[i], out[j]] = [out[j], out[i]];
        moved = true;
      }
    }
    if (!moved) break;
  }
  return out;
}
