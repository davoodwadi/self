# Course Content Format

This repository treats `content.md` as constrained Markdown, not free-form Markdown.

The preferred format uses YAML front matter for week metadata and `##` headings for slides.

## Preferred Structure

Preferred format:

```md
---
topic: AI Innovations for Product Development
lecturer: "Davood Wadi, PhD"
course: AI and Innovation
week: 09-product-development
background: "A complex, evolving wireframe of a product transforming into a solid object."
---

## Title Slide
- ...
- ...

## Slide Title
- ...
- ...
```

Required front matter fields:

- `topic`
- `background`

Optional front matter fields:

- `lecturer` = "Davood Wadi, PhD"
- `course`
- `week`

Use `lecturer` as the preferred metadata field. The parser still accepts legacy `instructor` for backward compatibility, but new and updated files should use `lecturer`.

## Slide Rules

- Each `##` heading defines exactly one slide.
- Everything until the next `##` heading belongs to that slide.
- Slide bodies must contain bullet lines beginning with `- ` only.
- Body slides must contain at least 2 bullets.
- Discussion prompts are optional, not mandatory.
- If present, a discussion prompt must be the final bullet and must start with `Discussion:`.
- Slide titles must be unique after slugification.
- Quizzes are opt-in. Only slides marked with `[quiz]` at the end of the `##` heading are eligible for quiz generation.

## Allowed Content

- YAML front matter at the top of the file
- `# Topic`
- `# Background`
- `# Slide contents`
- `## <slide title>`
- `## <slide title> [quiz]`
- `## <slide title> [no-quiz]`
- `- <bullet point>`
- `- Discussion: <specific question tied to the slide>`

## Unsupported Content

The shared parser rejects these patterns:

- nested headings such as `###`
- paragraphs inside slide bodies
- numbered lists inside slide bodies
- tables
- fenced code blocks
- multiple slides sharing the same generated `slide_id`

## Why This Contract Exists

- week metadata should be separated cleanly from slide content.
- `page.tsx` generation needs reliable slide boundaries.
- `quizzes.json` generation needs one stable snippet per slide.
- `slide_id` must be deterministic across content, slides, and quizzes.

## Quiz Control

Quiz generation is intentionally selective so the course flow is not interrupted by a question before every slide.

Use these heading suffixes:

- `[quiz]`: generate one pre-slide quiz for this slide
- `[no-quiz]`: explicitly mark that this slide should not receive a quiz

Examples:

```md
## The Paradigm Shift [quiz]
```

```md
## Part 1: AI-Driven Ideation [no-quiz]
```

Slides without either suffix default to no quiz.

## Discussion Control

Discussion prompts should be used sparingly.

- Add a `Discussion:` bullet only when the slide presents a concrete scenario and asks class what they would do.
- Avoid generic prompts.

Example:

```md
## The Paradigm Shift [quiz]
- Product development is undergoing a fundamental transformation.
- Moving from isolated tasks to a reshaped lifecycle.
- Covers the fuzzy front end of ideation to regulatory compliance.
- Discussion: Is a child who asks their parent to buy her a toy a consumer?
```

Validation command:

```bash
pnpm exec tsx scripts/generate-local-quiz.ts 09-product-development --validate-only
```

Generation command:

```bash
pnpm exec tsx scripts/generate-local-quiz.ts 09-product-development
```

## Derived `slide_id`

Each slide ID is derived from the `##` slide title using this rule:

- lowercase the title
- replace non-alphanumeric runs with `-`
- trim leading and trailing `-`

Example:

```md
## The Concept: Training the Network
```

becomes:

```txt
the-concept-training-the-network
```