import matter from "gray-matter";

export type CourseContentError = {
  line: number;
  message: string;
};

export type CourseContentMetadata = {
  topic: string;
  backgroundShape: string;
  lecturer?: string;
  course?: string;
  week?: string;
};

export type CourseSlide = {
  title: string;
  slideId: string;
  bullets: string[];
  contentBullets: string[];
  discussionQuestion: string | null;
  snippet: string;
  quizSnippet: string;
  startLine: number;
  shouldGenerateQuiz: boolean;
};

export type ParsedCourseContent = {
  topic: string;
  backgroundShape: string;
  metadata: CourseContentMetadata;
  slides: CourseSlide[];
};

export class CourseContentValidationError extends Error {
  errors: CourseContentError[];

  constructor(errors: CourseContentError[]) {
    super("Course content validation failed.");
    this.name = "CourseContentValidationError";
    this.errors = errors;
  }
}

const TITLE_SLIDE_NAME = "title slide";
const QUIZ_MARKER = /\s*\[(quiz|no-quiz)\]\s*$/i;

function normalizeDiscussionQuestion(value: string) {
  return value.replace(/^discussion:\s*/i, "").trim();
}

function isDiscussionBullet(value: string) {
  return /^discussion:\s*/i.test(value);
}

function parseSlideHeading(rawTitle: string) {
  const markerMatch = rawTitle.match(QUIZ_MARKER);
  const marker = markerMatch?.[1]?.toLowerCase() ?? null;
  const title = rawTitle.replace(QUIZ_MARKER, "").trim();

  return {
    title,
    shouldGenerateQuiz: marker === "quiz",
    hasExplicitNoQuiz: marker === "no-quiz",
  };
}

export function slugifySlideTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatCourseContentErrors(errors: CourseContentError[]) {
  return errors
    .map((error) => `Line ${error.line}: ${error.message}`)
    .join("\n");
}

export function validateCourseContentMarkdown(content: string) {
  try {
    parseCourseContentMarkdown(content);
    return [] as CourseContentError[];
  } catch (error) {
    if (error instanceof CourseContentValidationError) {
      return error.errors;
    }

    throw error;
  }
}

export function parseCourseContentMarkdown(
  content: string,
): ParsedCourseContent {
  const parsedMatter = matter(content);
  const lines = parsedMatter.content.split(/\r?\n/);
  const errors: CourseContentError[] = [];
  let usedLegacyTopicHeading = false;
  const hasFrontMatter = Object.keys(parsedMatter.data).length > 0;

  let currentSection: "topic" | "background" | "slides" | null = hasFrontMatter
    ? "slides"
    : null;
  let topicLines: string[] = [];
  let backgroundLines: string[] = [];

  const slides: Array<{
    title: string;
    bullets: string[];
    startLine: number;
    shouldGenerateQuiz: boolean;
    hasExplicitNoQuiz: boolean;
  }> = [];

  let currentSlide: {
    title: string;
    bullets: string[];
    startLine: number;
    shouldGenerateQuiz: boolean;
    hasExplicitNoQuiz: boolean;
  } | null = null;

  const pushCurrentSlide = () => {
    if (!currentSlide) {
      return;
    }

    if (currentSlide.bullets.length === 0) {
      errors.push({
        line: currentSlide.startLine,
        message: `Slide \"${currentSlide.title}\" has no bullet content.`,
      });
    }

    slides.push(currentSlide);
    currentSlide = null;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1;
    const rawLine = lines[index];
    const trimmedLine = rawLine.trim();

    if (!trimmedLine) {
      continue;
    }

    if (/^###\s+/.test(trimmedLine)) {
      errors.push({
        line: lineNumber,
        message:
          "Nested headings are not allowed. Use only # metadata headings and ## slide headings.",
      });
      continue;
    }

    if (/^#\s+/.test(trimmedLine) && !/^##\s+/.test(trimmedLine)) {
      pushCurrentSlide();

      const headingText = trimmedLine.replace(/^#\s+/, "").trim();

      if (/^Slide contents\b/i.test(headingText)) {
        currentSection = "slides";
      } else if (headingText === "Topic") {
        currentSection = "topic";
      } else if (headingText === "Background Shape") {
        currentSection = "background";
      } else if (
        !hasFrontMatter &&
        topicLines.length === 0 &&
        backgroundLines.length === 0 &&
        slides.length === 0
      ) {
        topicLines = [headingText];
        currentSection = "topic";
        usedLegacyTopicHeading = true;
      } else {
        errors.push({
          line: lineNumber,
          message: `Unsupported top-level heading "${headingText}". Use # Topic, # Background Shape, or # Slide contents.`,
        });
        currentSection = null;
      }

      continue;
    }

    if (/^##\s+/.test(trimmedLine)) {
      if (currentSection !== "slides") {
        errors.push({
          line: lineNumber,
          message: "Slide headings are only allowed after # Slide contents.",
        });
      }

      pushCurrentSlide();

      const parsedHeading = parseSlideHeading(
        trimmedLine.replace(/^##\s+/, "").trim(),
      );

      currentSlide = {
        title: parsedHeading.title,
        bullets: [],
        startLine: lineNumber,
        shouldGenerateQuiz: parsedHeading.shouldGenerateQuiz,
        hasExplicitNoQuiz: parsedHeading.hasExplicitNoQuiz,
      };
      continue;
    }

    if (currentSlide) {
      if (!trimmedLine.startsWith("- ")) {
        errors.push({
          line: lineNumber,
          message: `Slide "${currentSlide.title}" contains unsupported content. Use bullet lines beginning with "- " only.`,
        });
        continue;
      }

      currentSlide.bullets.push(trimmedLine.slice(2).trim());
      continue;
    }

    if (currentSection === "topic") {
      topicLines.push(trimmedLine);
      continue;
    }

    if (currentSection === "background") {
      backgroundLines.push(trimmedLine);
      continue;
    }

    errors.push({
      line: lineNumber,
      message: "Content must appear under a recognized heading.",
    });
  }

  pushCurrentSlide();

  const matterData = parsedMatter.data as Record<string, unknown>;
  const frontMatterTopic =
    typeof matterData.topic === "string" ? matterData.topic.trim() : "";
  const frontMatterBackground =
    typeof matterData.backgroundShape === "string"
      ? matterData.backgroundShape.trim()
      : typeof matterData.background === "string"
        ? matterData.background.trim()
        : "";

  const topic = hasFrontMatter ? frontMatterTopic : topicLines.join(" ").trim();
  const backgroundShape = hasFrontMatter
    ? frontMatterBackground
    : backgroundLines.join(" ").trim();

  if (!topic) {
    errors.push({
      line: 1,
      message: hasFrontMatter
        ? "Missing `topic` in YAML front matter."
        : usedLegacyTopicHeading
          ? "Missing topic title in the opening heading."
          : "Missing topic content under # Topic.",
    });
  }

  if (!backgroundShape) {
    errors.push({
      line: 1,
      message: hasFrontMatter
        ? "Missing `backgroundShape` or `background` in YAML front matter."
        : "Missing background description under # Background Shape.",
    });
  }

  if (slides.length === 0) {
    errors.push({
      line: 1,
      message: "No slides found under # Slide contents.",
    });
  }

  const seenSlideIds = new Map<string, number>();

  const parsedSlides = slides.map((slide) => {
    const slideId = slugifySlideTitle(slide.title);
    const isTitleSlide = slide.title.toLowerCase() === TITLE_SLIDE_NAME;
    const lastBullet = slide.bullets[slide.bullets.length - 1] ?? null;
    const hasDiscussionQuestion =
      !isTitleSlide && !!lastBullet && isDiscussionBullet(lastBullet);
    const discussionQuestion = hasDiscussionQuestion
      ? normalizeDiscussionQuestion(lastBullet as string)
      : null;
    const contentBullets = hasDiscussionQuestion
      ? slide.bullets.slice(0, -1)
      : slide.bullets;

    if (isTitleSlide && slide.shouldGenerateQuiz) {
      errors.push({
        line: slide.startLine,
        message: `Slide "${slide.title}" cannot be marked [quiz].`,
      });
    }

    if (slide.shouldGenerateQuiz && slide.hasExplicitNoQuiz) {
      errors.push({
        line: slide.startLine,
        message: `Slide "${slide.title}" cannot include both [quiz] and [no-quiz].`,
      });
    }

    if (!slideId) {
      errors.push({
        line: slide.startLine,
        message: `Slide \"${slide.title}\" does not produce a valid slide ID.`,
      });
    }

    if (seenSlideIds.has(slideId)) {
      errors.push({
        line: slide.startLine,
        message: `Duplicate slide ID \"${slideId}\" generated from slide title \"${slide.title}\".`,
      });
    } else if (slideId) {
      seenSlideIds.set(slideId, slide.startLine);
    }

    if (slide.bullets.length < 2) {
      errors.push({
        line: slide.startLine,
        message: `Slide \"${slide.title}\" must contain at least 2 bullet points.`,
      });
    }

    if (
      !isTitleSlide &&
      discussionQuestion &&
      !/\?$/.test(discussionQuestion)
    ) {
      errors.push({
        line: slide.startLine,
        message: `Slide \"${slide.title}\" has a discussion bullet, but it must end with a question mark.`,
      });
    }

    return {
      title: slide.title,
      slideId,
      bullets: slide.bullets,
      contentBullets,
      discussionQuestion,
      shouldGenerateQuiz: slide.shouldGenerateQuiz,
      snippet: [
        `## ${slide.title}`,
        ...slide.bullets.map((bullet) => `- ${bullet}`),
      ].join("\n"),
      quizSnippet: [
        `## ${slide.title}`,
        ...contentBullets.map((bullet) => `- ${bullet}`),
      ].join("\n"),
      startLine: slide.startLine,
    };
  });

  if (errors.length > 0) {
    throw new CourseContentValidationError(errors);
  }

  return {
    topic,
    backgroundShape,
    metadata: {
      topic,
      backgroundShape,
      lecturer:
        typeof matterData.lecturer === "string"
          ? matterData.lecturer.trim()
          : typeof matterData.instructor === "string"
            ? matterData.instructor.trim()
          : undefined,
      course:
        typeof matterData.course === "string"
          ? matterData.course.trim()
          : undefined,
      week:
        typeof matterData.week === "string"
          ? matterData.week.trim()
          : undefined,
    },
    slides: parsedSlides,
  };
}
