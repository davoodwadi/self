import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectTables() {
  console.log("Fetching a single row from 'quizzes'...");
  const { data: quizzes, error: quizzesError } = await supabase
    .from("quizzes")
    .select("*")
    .limit(1);

  if (quizzesError) {
    console.error("Error fetching 'quizzes':", quizzesError.message);
  } else {
    console.log("Sample 'quizzes' row:", JSON.stringify(quizzes[0], null, 2));
    if (quizzes.length > 0) {
      console.log("Columns in 'quizzes':", Object.keys(quizzes[0]));
    }
  }

  // Common related tables
  const potentialTables = [
    "options",
    "choices",
    "question_options",
    "question_choices",
    "answers",
  ];

  for (const table of potentialTables) {
    console.log(`\nChecking for table '${table}'...`);
    const { data, error } = await supabase.from(table).select("*").limit(1);

    if (error) {
      console.log(
        `Table '${table}' might not exist or isn't accessible: ${error.message}`,
      );
    } else if (data.length > 0) {
      console.log(`Found data in '${table}'.`);
      console.log(
        `Sample row from '${table}':`,
        JSON.stringify(data[0], null, 2),
      );
      console.log(`Columns in '${table}':`, Object.keys(data[0]));
    } else {
      console.log(`Table '${table}' is accessible but empty.`);
    }
  }
}

inspectTables();
