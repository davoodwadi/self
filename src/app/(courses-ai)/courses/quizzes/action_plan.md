# Action Plan: Weekly Quiz Generation & Display Pipeline

This plan outlines the steps required to take a specific week's content (e.g., product development), automatically generate a quiz from it, store that quiz inside the Supabase database (`quizzes`, `questions`, and `options` tables), and finally display the quiz content inside the nested route for that week.

## 1. Quiz Generation from Content
- [ ] Read the weekly content file (e.g., `src/app/(courses)/courses/09-product-development/content.md`).
- [ ] Use an LLM or an automated script (e.g., OpenAI API) to generate a quiz from the content. The generated output should follow a strict JSON schema matching our database structure:
  - `title`
  - `questions`: Array of objects containing `question_text`, `hint`, `correct_answer_citation`, and `options`.
  - `options`: Array of objects containing `option_text`, `is_correct`, and `option_explanation`.

## 2. Insert the Quiz into the Supabase Database
- [ ] Create a Node.js script (e.g., `scripts/insert-quiz.ts`) that will:
  1. Insert a record into the `quizzes` table with the week's title (e.g., "09-product-development") and capture the returned `quiz_id`.
  2. Map through the generated `questions` array and insert them into the `questions` table with the `quiz_id`. Capture the returned `question_id`s.
  3. Map through the nested `options` array for each question, and insert them into the `options` table with the appropriate `question_id`.

## 3. Create the Weekly Quiz Route
- [ ] Add a `quiz/page.tsx` file inside the target week's directory. For example: `src/app/(courses)/courses/09-product-development/quiz/page.tsx`.
- [ ] Inside this Server Component, use the Supabase client to fetch the specific quiz by its title/slug ("09-product-development"):
  ```typescript
  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select(`
      id,
      title,
      questions (
        id,
        question_text,
        hint,
        correct_answer_citation,
        options (
          id,
          option_text,
          is_correct,
          option_explanation
        )
      )
    `)
    .eq("title", "09-product-development") // Match the title inserted during generation
    .single();
  ```

## 4. Build the Quiz Interface UI
- [ ] Create a `<QuizDisplay quiz={quiz} />` Client Component to receive the fetched `quiz` data.
- [ ] **Quiz Header:** Display the quiz `title`.
- [ ] **Question List:** Map over `quiz.questions` to render each question.
- [ ] **Options List:** Render radio buttons or choice cards for each question by mapping over its `options`.
- [ ] **Interactivity & State:** Use React `useState` to track the user's selected answers, handle submission, compute their score, and display the `option_explanation` and `correct_answer_citation` after submission.

## 5. Handle Attempts (Optional Future Scope)
- [ ] Save the user's final score to the `attempts` table.
- [ ] Log individual question answers to the `attempt_answers` or `quiz_responses` tables.
