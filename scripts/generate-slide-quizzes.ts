import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
  console.error("Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// Schema for a single question (without slide_id, we will inject it manually)
const SingleQuestionSchema = z.object({
  question_text: z
    .string()
    .describe(
      "A question designed to make the user think about the topic BEFORE they see the slide",
    ),
  hint: z.string().nullable(),
  correct_answer_citation: z.string().nullable(),
  options: z
    .array(
      z.object({
        option_text: z.string(),
        option_explanation: z.string().nullable(),
      }),
    )
    .length(4), // Force exactly 4 options
  correct_answer_index: z.number().int().min(0).max(3),
});

const jsonSchema = SingleQuestionSchema.toJSONSchema() as any;

async function generateSlideQuizzes() {
  const weekFolder = "09-product-development";
  const pagePath = path.resolve(
    process.cwd(),
    `src/app/(courses)/courses/${weekFolder}/page.tsx`,
  );
  const outputPath = path.resolve(
    process.cwd(),
    `src/app/(courses)/courses/${weekFolder}/quizzes.json`,
  );

  if (!fs.existsSync(pagePath)) {
    console.error("Page file not found at:", pagePath);
    process.exit(1);
  }

  // 1. Load existing quizzes if they exist
  let existingQuizzes: any[] = [];
  if (fs.existsSync(outputPath)) {
    try {
      const fileContent = fs.readFileSync(outputPath, "utf8");
      existingQuizzes = JSON.parse(fileContent);
      if (!Array.isArray(existingQuizzes)) {
        existingQuizzes = [];
      }
      console.log(
        `Loaded ${existingQuizzes.length} existing quizzes from ${outputPath}`,
      );
    } catch (e) {
      console.error("Failed to parse existing quizzes.json. Starting fresh.");
      existingQuizzes = [];
    }
  }

  const pageStr = fs.readFileSync(pagePath, "utf8");

  // Extract slides using a simple regex (between <Slide> and </Slide>)
  const slideRegex = /<Slide>([\s\S]*?)<\/Slide>/g;
  const slides: string[] = [];
  let match;
  while ((match = slideRegex.exec(pageStr)) !== null) {
    slides.push(match[1]);
  }

  console.log(`Found ${slides.length} slides in page.tsx.`);

  // We skip the first slide as it's usually the title
  for (let i = 1; i < slides.length; i++) {
    const slideContent = slides[i];

    // Extract heading as an ID/Context
    const headingMatch = slideContent.match(/<Heading>(.*?)<\/Heading>/);
    const heading = headingMatch ? headingMatch[1] : `Slide ${i + 1}`;

    // Create a clean id suitable for keys deterministically
    const slideId = heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // 2. Check if this slide already has a quiz generated
    const alreadyExists = existingQuizzes.some((q) => q.slide_id === slideId);
    if (alreadyExists) {
      console.log(
        `Skipping Slide ${i + 1}: ${heading} (ID: ${slideId}) - Quiz already exists.`,
      );
      continue;
    }

    console.log(`\nGenerating question for Slide ${i + 1}: ${heading}`);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an expert educator. I will provide you with the content of an upcoming presentation slide.
    Your goal is to generate a SINGLE multiple-choice question that PRECEDES this slide.
    The question should challenge the user's intuition or test their prior knowledge about the topic BEFORE they read the slide.
    It should act as a "hook" or "setup" for the concepts that are about to be introduced.

    Slide Content:
    ${slideContent}

    Output the result in strict JSON format. Ensure exactly 4 options.`,
              },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: jsonSchema,
        },
      });

      if (
        !response.candidates ||
        !response.candidates[0]?.content?.parts?.[0]?.text
      ) {
        console.error(`Failed to get response for ${heading}`);
        continue;
      }

      const aiResponseText = response.candidates[0].content.parts[0].text;
      const parsedData = JSON.parse(aiResponseText);
      const result = SingleQuestionSchema.safeParse(parsedData);

      if (!result.success) {
        console.error(
          `Schema Validation Error for ${heading}:`,
          result.error.format(),
        );
        continue;
      }

      // Manually inject the deterministic slide_id
      const questionWithId = {
        slide_id: slideId,
        ...result.data,
      };

      // 3. Append to array and continuously save
      existingQuizzes.push(questionWithId);

      fs.writeFileSync(
        outputPath,
        JSON.stringify(existingQuizzes, null, 2),
        "utf8",
      );

      console.log(
        `Successfully generated and saved question for: ${heading} (ID: ${slideId})`,
      );

      // Delay slightly to respect rate limits if any
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err: any) {
      console.error(`Error generating for ${heading}:`, err.message);
    }
  }

  console.log(
    `\nFinished processing all slides. Total quizzes saved: ${existingQuizzes.length}`,
  );
}

generateSlideQuizzes();
