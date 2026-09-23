#!/usr/bin/env node
// Rename the topic tags in every course content.md:
//   [quiz]    → [exercise]
//   [no-quiz] → [no-exercise]
// Only these exact tags change; every other word in the files stays as written.
//
// Usage:
//   node scripts/rename-exercise-tags.mjs            # rewrite the files
//   node scripts/rename-exercise-tags.mjs --dry-run  # only report what would change

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "src", "app");
const DRY = process.argv.includes("--dry-run");

const RENAMES = [
  [/\[no-quiz\]/g, "[no-exercise]"],
  [/\[quiz\]/g, "[exercise]"],
];

/** Every content.md under src/app, skipping dependency and build folders. */
function contentFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "node_modules" || e.name.startsWith(".") ? [] : contentFiles(p);
    return e.name === "content.md" ? [p] : [];
  });
}

let files = 0;
let tags = 0;
for (const file of contentFiles(ROOT).sort()) {
  const before = readFileSync(file, "utf8");
  let after = before;
  const counts = RENAMES.map(([re, to]) => {
    const n = (after.match(re) ?? []).length;
    after = after.replace(re, to);
    return n;
  });
  const n = counts[0] + counts[1];
  if (!n) continue;
  files += 1;
  tags += n;
  console.log(`${path.relative(process.cwd(), file)}: ${counts[1]} [quiz], ${counts[0]} [no-quiz]`);
  if (!DRY) writeFileSync(file, after);
}

console.log(`${DRY ? "Would rename" : "Renamed"} ${tags} tags in ${files} files.`);
