import fs from "fs";
import path from "path";

const pagePath = path.resolve(
  process.cwd(),
  "src/app/(courses)/courses/09-product-development/page.tsx",
);
let content = fs.readFileSync(pagePath, "utf8");

// Add the import if not present
if (!content.includes('import quizzesData from "./quizzes.json"')) {
  content = content.replace(
    'import { useState } from "react";',
    'import { useState } from "react";\nimport quizzesData from "./quizzes.json";',
  );
}

// Regex to find each Slide block that contains a Heading
// We need to carefully match `<Slide>` but NOT `</Slide>`
const slideRegex =
  /(<Slide>|<Slide [^>]+>)([\s\S]*?<Heading>(.*?)<\/Heading>)/g;

let newContent = content.replace(
  slideRegex,
  (match, slideStart, innerContent, heading) => {
    // Skip if it already has quizData
    if (slideStart.includes("quizData=")) return match;

    // Generate the slug from the heading exactly as we did in the generation script
    const slideId = heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Add quizData prop to Slide
    const newSlideStart = slideStart.replace(
      "<Slide",
      `<Slide quizData={quizzesData.find(q => q.slide_id === "${slideId}")}`,
    );

    return newSlideStart + innerContent;
  },
);

fs.writeFileSync(pagePath, newContent, "utf8");
console.log("Successfully added quizData props to Slide components!");
