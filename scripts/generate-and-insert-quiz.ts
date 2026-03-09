import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseAnonKey || !geminiApiKey) {
  console.error("Missing required environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

// Schema based on QuizOutputSchema in the sample
const QuizOutputSchema = z.object({
  questions: z.array(
    z.object({
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
    }),
  ),
});

const jsonSchema = QuizOutputSchema.toJSONSchema() as any;

async function generateAndInsertQuiz() {
  const contentPath = path.resolve(
    process.cwd(),
    "src/app/(courses)/courses/09-product-development/content.md",
  );

  if (!fs.existsSync(contentPath)) {
    console.error("Content file not found at:", contentPath);
    process.exit(1);
  }

  const contentStr = fs.readFileSync(contentPath, "utf8");

  console.log("Generating quiz from content using Gemini...");

  const model = "gemini-3-flash-preview"; // or gemini-2.5-flash as fallback if needed
  let aiResponseText = "";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Generate a 5-question multiple choice quiz based strictly on the following content. Output the result in valid JSON.",
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
  const result = QuizOutputSchema.safeParse(parsedData);

  if (!result.success) {
    console.error("Schema Validation Error:", result.error.format());
    process.exit(1);
  }

  const validatedData = result.data;
  const instructorId = "6b705c8f-6ef0-407c-86c7-b03910c11add"; // Instructor ID found earlier

  console.log("Inserting Quiz into Supabase...");

  // 1. Create the Quiz
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .insert({
      title: "Product Development Quiz",
      instructor_id: instructorId,
      is_active: true,
    })
    .select()
    .single();

  if (quizError || !quiz) {
    console.error("Failed to insert quiz:", quizError);
    process.exit(1);
  }

  console.log(`Quiz inserted with ID: ${quiz.id}`);

  // 2. Insert Questions & Options
  for (let i = 0; i < validatedData.questions.length; i++) {
    const q = validatedData.questions[i];

    const { data: questionData, error: qError } = await supabase
      .from("questions")
      .insert({
        quiz_id: quiz.id,
        question_text: q.question_text,
        hint: q.hint,
        correct_answer_citation: q.correct_answer_citation,
      })
      .select()
      .single();

    if (qError || !questionData) {
      console.error(`Error inserting question ${i + 1}:`, qError);
      continue;
    }

    const optionsToInsert = q.options.map((opt, idx) => ({
      question_id: questionData.id,
      option_text: opt.option_text,
      option_explanation: opt.option_explanation,
      is_correct: idx === q.correct_answer_index,
    }));

    const { error: optError } = await supabase
      .from("options")
      .insert(optionsToInsert);

    if (optError) {
      console.error(`Error inserting options for question ${i + 1}:`, optError);
    }
  }

  console.log("Quiz fully generated and inserted into the database!");
}

generateAndInsertQuiz();
