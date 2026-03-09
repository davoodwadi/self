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

// Schema for a SINGLE question
const SingleQuestionSchema = z.object({
  question_text: z.string(),
  hint: z.string().nullable(),
  correct_answer_citation: z.string().nullable(),
  options: z.array(
    z.object({
      option_text: z.string(),
      option_explanation: z.string().nullable(),
    }),
  ),
  correct_answer_index: z.number().int().min(0),
});

const jsonSchema = SingleQuestionSchema.toJSONSchema() as any;

async function generateLocalQuiz() {
  const weekFolder = "09-product-development";
  const contentPath = path.resolve(
    process.cwd(),
    `src/app/(courses)/courses/${weekFolder}/content.md`,
  );

  if (!fs.existsSync(contentPath)) {
    console.error("Content file not found at:", contentPath);
    process.exit(1);
  }

  const contentStr = fs.readFileSync(contentPath, "utf8");

  console.log("Generating a single quiz question from content using Gemini...");

  let aiResponseText = "";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Use the preview model as requested in the sample
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Generate a multiple choice question based strictly on the following content.",
            },
            { text: contentStr },
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
    if (!aiResponseText) throw new Error("Empty response from Gemini");
  } catch (err: any) {
    console.error("Error generating content:", err.message);
    process.exit(1);
  }

  console.log("Parsing Gemini response...");
  const parsedData = JSON.parse(aiResponseText);
  const result = SingleQuestionSchema.safeParse(parsedData);

  if (!result.success) {
    console.error("Schema Validation Error:", result.error.format());
    process.exit(1);
  }

  const validatedData = result.data;

  // Save the result as a JSON file in the same directory
  const outputPath = path.resolve(
    process.cwd(),
    `src/app/(courses)/courses/${weekFolder}/quiz.json`,
  );

  fs.writeFileSync(outputPath, JSON.stringify(validatedData, null, 2), "utf8");

  console.log(`Quiz successfully generated and saved to ${outputPath}`);
}

generateLocalQuiz();
