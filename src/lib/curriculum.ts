import { readFileSync } from "node:fs";
import path from "node:path";

// ============================================================================
// CURRICULUM
// ============================================================================
// A course's curriculum.md is the single source for every piece of website
// text that describes the course: its landing masthead, its week index, its
// course cards and its page metadata. Reading the file at build time keeps
// the markdown and the website in one-to-one correspondence. A missing field
// fails the build instead of leaving the two out of step.
// ============================================================================

export type CurriculumWeek = {
  slug: string;
  n: number;
  title: string;
  summary: string;
  topics: string[];
};

export type Curriculum = {
  title: string;
  subtitle: string;
  level: string;
  program: string;
  duration: string;
  instructor: string;
  summary: string;
  overview: string;
  weeks: CurriculumWeek[];
};

const FIELD = /^\*\*(.+?)\*\*:\s*(.+?)\s*$/;
const WEEK = /^###\s+Week\s+(\d+):\s*(.+?)\s*$/;

function field(fields: Map<string, string>, name: string, file: string) {
  const value = fields.get(name);
  if (!value) throw new Error(`${file}: missing **${name}**`);
  return value;
}

/** Parses `<courseDir>/curriculum.md`. `courseDir` is relative to the repo root. */
export function readCurriculum(courseDir: string): Curriculum {
  const file = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    courseDir,
    "curriculum.md",
  );
  const lines = readFileSync(file, "utf8").split(/\r?\n/);

  const heading = lines.find((line) => line.startsWith("# "));
  if (!heading) throw new Error(`${file}: missing course title`);

  const fields = new Map<string, string>();
  const weeks: CurriculumWeek[] = [];
  let week: CurriculumWeek | null = null;

  for (const line of lines) {
    const w = WEEK.exec(line);
    if (w) {
      const n = Number(w[1]);
      week = { slug: `week${n}`, n, title: w[2], summary: "", topics: [] };
      weeks.push(week);
      continue;
    }
    const f = FIELD.exec(line);
    if (f && week) {
      if (f[1] === "Summary") week.summary = f[2];
      continue;
    }
    if (f) {
      fields.set(f[1], f[2]);
      continue;
    }
    if (week && line.startsWith("- ")) week.topics.push(line.slice(2).trim());
  }

  for (const w of weeks) {
    if (!w.summary) throw new Error(`${file}: Week ${w.n} missing **Summary**`);
  }

  return {
    title: heading.slice(2).replace(/\s+-\s+Course Curriculum\s*$/, "").trim(),
    subtitle: field(fields, "Subtitle", file),
    level: field(fields, "Course Level", file),
    program: field(fields, "Program", file),
    duration: field(fields, "Duration", file),
    instructor: field(fields, "Instructor", file),
    summary: field(fields, "Summary", file),
    overview: field(fields, "Overview", file),
    weeks,
  };
}

export const CB_DIR = "src/app/(courses-cb)/courses/consumer-behavior";
