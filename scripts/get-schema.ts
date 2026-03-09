import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

// We can query the REST API directly using fetch to hit the OpenAPI spec which lists all tables
async function fetchSchema() {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/?apikey=${supabaseAnonKey}`,
    );
    if (!res.ok) {
      console.error("Failed to fetch OpenAPI spec:", res.statusText);
      return;
    }
    const spec = await res.json();
    console.log("Tables found:");

    // The spec.definitions object holds the tables and views exposed by PostgREST
    if (spec && spec.definitions) {
      const tables = Object.keys(spec.definitions);
      tables.forEach((table) => {
        console.log(`\n--- TABLE: ${table} ---`);
        const columns = spec.definitions[table].properties;
        if (columns) {
          Object.keys(columns).forEach((col) => {
            console.log(
              `  - ${col} (${columns[col].type || columns[col].format})`,
            );
          });
        }
      });
    } else {
      console.log(
        "No definitions found in the OpenAPI spec. Make sure tables are exposed to the public/anon role.",
      );
    }
  } catch (err) {
    console.error("Error fetching schema:", err);
  }
}

fetchSchema();
