import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import {
  CourseContentValidationError,
  formatCourseContentErrors,
  parseCourseContentMarkdown,
} from "../src/lib/course-content";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Schema for a SINGLE question
const SingleQuestionSchema = z.object({
  question_text: z.string(),
  hint: z.string().nullable(),
  correct_answer_citation: z.string().nullable(),
  options: z
    .array(
      z.object({
        option_text: z.string(),
        option_explanation: z.string().nullable(),
      }),
    )
    .length(4),
  correct_answer_index: z.number().int().min(0).max(3),
});

const jsonSchema = SingleQuestionSchema.toJSONSchema() as any;

type CliOptions = {
  weekFolder: string;
  validateOnly: boolean;
};

function getCliOptions(): CliOptions {
  const args = process.argv.slice(2);
  const validateOnly = args.includes("--validate-only");
  const positionalArgs = args.filter((arg) => !arg.startsWith("--"));
  const weekFolder = positionalArgs[0]?.trim();

  if (!weekFolder) {
    console.error(
      "Usage: pnpm exec tsx scripts/generate-local-quiz.ts <week-folder> [--validate-only]",
    );
    process.exit(1);
  }

  return { weekFolder, validateOnly };
}

function getAiClient() {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    console.error("Missing GEMINI_API_KEY in .env.local");
    process.exit(1);
  }

  return new GoogleGenAI({ apiKey: geminiApiKey });
}

function loadExistingQuizzes(outputPath: string) {
  if (!fs.existsSync(outputPath)) {
    return [] as Array<
      { slide_id: string } & z.infer<typeof SingleQuestionSchema>
    >;
  }

  try {
    const fileContent = fs.readFileSync(outputPath, "utf8");
    const parsed = JSON.parse(fileContent);
    return Array.isArray(parsed)
      ? parsed
      : ([] as Array<
          { slide_id: string } & z.infer<typeof SingleQuestionSchema>
        >);
  } catch {
    console.error("Failed to parse existing quizzes.json. Starting fresh.");
    return [] as Array<
      { slide_id: string } & z.infer<typeof SingleQuestionSchema>
    >;
  }
}

async function generateLocalQuiz() {
  const { weekFolder, validateOnly } = getCliOptions();
  const contentPath = path.resolve(
    process.cwd(),
    `src/app/(courses)/courses/${weekFolder}/content.md`,
  );
  const outputPath = path.resolve(
    process.cwd(),
    `src/app/(courses)/courses/${weekFolder}/quizzes.json`,
  );

  if (!fs.existsSync(contentPath)) {
    console.error("Content file not found at:", contentPath);
    process.exit(1);
  }

  const contentStr = fs.readFileSync(contentPath, "utf8");
  let parsedContent;

  try {
    parsedContent = parseCourseContentMarkdown(contentStr);
  } catch (error) {
    if (error instanceof CourseContentValidationError) {
      console.error(formatCourseContentErrors(error.errors));
      process.exit(1);
    }

    throw error;
  }

  const slideSections = parsedContent.slides.filter(
    (slide) => slide.shouldGenerateQuiz,
  );

  console.log(
    `Content is valid. Found ${parsedContent.slides.length} slides, ${slideSections.length} marked for quiz generation.`,
  );

  if (slideSections.length === 0) {
    console.error(
      "No slides are marked for quiz generation. Add [quiz] to the end of the slide headings you want to use.",
    );
    process.exit(1);
  }

  if (validateOnly) {
    console.log(
      slideSections.map((slide) => ({
        slideId: slide.slideId,
        title: slide.title,
        quizSnippet: slide.quizSnippet,
        discussionQuestion: slide.discussionQuestion,
      })),
    );
    return;
  }

  const ai = getAiClient();

  const existingQuizzes = loadExistingQuizzes(outputPath);

  console.log(
    `Generating one quiz question for ${slideSections.length} quiz-marked slides...`,
  );

  for (const section of slideSections) {
    const alreadyExists = existingQuizzes.some(
      (quiz) => quiz.slide_id === section.slideId,
    );

    if (alreadyExists) {
      console.log(
        `Skipping ${section.title} (${section.slideId}) - quiz already exists.`,
      );
      continue;
    }

    console.log(`Generating quiz for ${section.title}...`);

    let aiResponseText = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are generating one pre-slide multiple choice quiz question for a course deck.

Generate exactly one question based strictly on this single slide snippet. The question must test the main concept of this specific slide only. Do not use information from other slides. Do not ask about the discussion question itself. The quiz should appear immediately before the slide, so it should prime the learner for the topic they are about to read.

Slide snippet:
${section.quizSnippet}

Return strict JSON with exactly 4 answer options.`,
              },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: jsonSchema,
        },
      });

      if (!response.candidates) {
        throw new Error("No candidates returned from Gemini");
      }

      aiResponseText = response.candidates[0]?.content?.parts?.[0]?.text || "";

      if (!aiResponseText) {
        throw new Error("Empty response from Gemini");
      }
    } catch (err: any) {
      console.error(`Error generating quiz for ${section.title}:`, err.message);
      continue;
    }

    let parsedData: unknown;

    try {
      parsedData = JSON.parse(aiResponseText);
    } catch (err: any) {
      console.error(
        `Failed to parse Gemini response for ${section.title}:`,
        err.message,
      );
      continue;
    }

    const result = SingleQuestionSchema.safeParse(parsedData);

    if (!result.success) {
      console.error(
        `Schema validation error for ${section.title}:`,
        result.error.format(),
      );
      continue;
    }

    existingQuizzes.push({
      slide_id: section.slideId,
      ...result.data,
    });

    fs.writeFileSync(
      outputPath,
      JSON.stringify(existingQuizzes, null, 2),
      "utf8",
    );
  }

  console.log(`Quiz generation finished. Saved quizzes to ${outputPath}`);
}

generateLocalQuiz();
