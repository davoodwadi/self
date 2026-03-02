#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", () => resolve(""));
  });
}

function unique(values) {
  return Array.from(new Set(values));
}

function toCourseDir(targetPath, repoRoot) {
  const sanitized = targetPath.replace(/^file:\/\//, "");
  const abs = path.isAbsolute(sanitized)
    ? sanitized
    : path.join(repoRoot, sanitized);
  if (
    abs.endsWith("content.md") ||
    abs.endsWith("deepResearch.md") ||
    abs.endsWith("deepResearchCitations.ts")
  ) {
    return path.dirname(abs);
  }
  return abs;
}

function findNearestCourseDir(candidatePath, repoRoot) {
  let cursor = candidatePath;
  const coursesRoot = path.join(repoRoot, "src", "app", "(courses)");

  for (let i = 0; i < 8; i += 1) {
    if (!cursor.startsWith(coursesRoot)) {
      break;
    }

    const deepResearchPath = path.join(cursor, "deepResearch.md");
    if (fs.existsSync(deepResearchPath)) {
      return cursor;
    }

    const parent = path.dirname(cursor);
    if (parent === cursor) {
      break;
    }
    cursor = parent;
  }

  return null;
}

function collectCourseDirs(payloadText, repoRoot) {
  const matches = payloadText.match(
    /(?:file:\/\/)?(?:\/home\/dw\/github\/self\/)?src\/app\/\(courses\)\/[^\s"']+/g,
  );

  if (!matches || matches.length === 0) return [];

  const discovered = [];
  for (const match of matches) {
    const relative = match
      .replace(/^file:\/\//, "")
      .replace(/^\/home\/dw\/github\/self\//, "");
    const candidate = toCourseDir(relative, repoRoot);
    const nearest = findNearestCourseDir(candidate, repoRoot);
    if (nearest) {
      discovered.push(nearest);
    }
  }

  return unique(discovered);
}

function discoverCourseDirsFallback(repoRoot) {
  const coursesDir = path.join(repoRoot, "src", "app", "(courses)", "courses");
  if (!fs.existsSync(coursesDir)) {
    return [];
  }

  const dirs = fs.readdirSync(coursesDir, { withFileTypes: true });
  const found = [];

  for (const dirent of dirs) {
    if (!dirent.isDirectory()) {
      continue;
    }

    const courseDir = path.join(coursesDir, dirent.name);
    if (fs.existsSync(path.join(courseDir, "deepResearch.md"))) {
      found.push(courseDir);
    }
  }

  return found;
}

function emitSystemMessage(message) {
  process.stdout.write(
    JSON.stringify({
      continue: true,
      systemMessage: message,
    }),
  );
}

function runCitationExtraction(courseDir, repoRoot) {
  const scriptPath = path.join(repoRoot, "scripts", "extractCitations.js");
  if (!fs.existsSync(scriptPath)) {
    return `Missing extractor script: ${path.relative(repoRoot, scriptPath)}`;
  }

  const result = spawnSync(
    process.execPath,
    [scriptPath, "./deepResearch.md", "./deepResearchCitations.ts"],
    {
      cwd: courseDir,
      encoding: "utf8",
      timeout: 7000,
    },
  );

  if (result.error) {
    return `Extraction failed: ${result.error.message}`;
  }

  if (result.status !== 0) {
    const stderr = (result.stderr || "").trim();
    const stdout = (result.stdout || "").trim();
    const details = stderr || stdout || `exit code ${result.status}`;
    return `Extraction failed: ${details}`;
  }

  return null;
}

(async () => {
  const repoRoot = process.cwd();
  const stdinText = await readStdin();

  let courseDirs = collectCourseDirs(stdinText || "", repoRoot);
  if (courseDirs.length === 0) {
    // Lightweight fallback: one-level scan in src/app/(courses)/courses.
    courseDirs = discoverCourseDirsFallback(repoRoot);
  }

  if (courseDirs.length === 0) {
    return;
  }

  const failures = [];

  for (const courseDir of courseDirs) {
    const deepResearchPath = path.join(courseDir, "deepResearch.md");
    const citationsPath = path.join(courseDir, "deepResearchCitations.ts");

    if (!fs.existsSync(deepResearchPath)) {
      continue;
    }

    const relCourseDir = path.relative(repoRoot, courseDir);

    const citationsMissing = !fs.existsSync(citationsPath);
    const citationsStale =
      !citationsMissing &&
      fs.statSync(citationsPath).mtimeMs <
        fs.statSync(deepResearchPath).mtimeMs;

    if (citationsMissing || citationsStale) {
      const error = runCitationExtraction(courseDir, repoRoot);
      if (error) {
        failures.push(`${relCourseDir}: ${error}`);
      }
    }
  }

  if (failures.length > 0) {
    emitSystemMessage(
      `Citation preprocessing errors:\n- ${failures.join("\n- ")}`,
    );
  }
})();
