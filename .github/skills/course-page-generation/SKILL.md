---
name: course-page-generation
description: "Transform a `content.md` file in the `ai-in-business` course into a high-fidelity, cinematic `page.tsx` using the 'Academic' theme and custom slide components. This skill uses pre-built components from `_components/SlideComponents`. DO NOT use for digital-transformation or other courses."
---

# Course Page Generation Skill

## Overview

This skill automates the process of generating a React `page.tsx` file for a course module in the `ai-in-business` course segment, based on a Markdown `content.md` file. It adheres to the "The Academic" design philosophy (Deep Crimson accents, Merriweather/Open Sans typography, and weighted animations).

## Workflow

### 1. Analyze Source (`content.md`)

Read the `content.md` file to extract:

- **Topic/Title**: Main course heading.
- **Background Shape**: Description of the background visuals (to be mapped to a `BackgroundManager` type).
- **Slide Sections**: Sections starting with `##` headers.
- **Key Concepts**: Bullet points, questions, and descriptions within each slide.

### 2. Component Mapping

Map the Markdown elements to the corresponding React components from `src/app/(courses)/_components/SlideComponents.tsx`.

| Markdown Element     | React Component      | Props/Variants                                    |
| -------------------- | -------------------- | ------------------------------------------------- |
| Main Title           | `<Title>`            | -                                                 |
| Sub-Header/Context   | `<Subtitle>`         | `variant="hero"` for title slide                  |
| `## Slide Header`    | `<Heading>`          | Use `<Highlight>` for key words                   |
| Category/Tag         | `<Tag>`              | Derived from slide context (e.g., "The Problem")  |
| Bullet Points        | `<AnimatedList>`     | Contains `<ListItem>`                             |
| Questions            | `<DiscussionCard>`   | `title="Group Discussion"`                        |
| Quote/Emphasis       | `<Quote>`            | -                                                 |
| Citation             | `<Citation>`         | `ids={[1, 2]}` linking to course citation sources |
| Callout/Note         | `<Callout>`          | `variant="secondary"`                             |
| Image/Visual         | `<MediaBlock>`       | `src`, `alt`, `caption`                           |
| Percentage Breakdown | `<PieChart>`         | `data`, `title?`, `caption?`, `size?`             |
| Split Layout         | `<Row>` & `<Column>` | `gap="large"`, `spanRatio="1/2"`                  |

### 3. Implementation Steps

1.  **Initialize File**: Create `page.tsx` with `"use client";` at the top.
2.  **Add Imports**:
    ```tsx
    import {
      SlideDeck,
      Slide,
      Title,
      Subtitle,
      Heading,
      Highlight,
      Tag,
      ContentText,
      Row,
      Column,
      Card,
      ContentTitle,
      ContentDescription,
      DiscussionCard,
      Quote,
      AnimatedList,
      ListItem,
      Callout,
      MediaBlock,
      PieChart,
      Citation,
      CitationProvider,
    } from "@/app/(courses)/_components/SlideComponents";
    import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";
    import { createCourseQuizLookup } from "@/lib/course-quiz";
    import {
      getCitation,
      getCitations,
      getCitationUrls,
    } from "./deepResearchCitations";
    ```
3.  **Construct Component**: Create the default export function and wrap the `<SlideDeck>` with `<CitationProvider>`:
    ```tsx
    export default function CourseName() {
      return (
        <CitationProvider
          value={{ getCitation, getCitations, getCitationUrls }}
        >
          <SlideDeck background={<BackgroundManager type="sustainability" />}>
            {/* slides here */}
          </SlideDeck>
        </CitationProvider>
      );
    }
    ```
4.  **Determine Background**: Check the `BackgroundManager` to see if background already exists (e.g., "deep-learning", "sustainability", "edii"). If not, create a new one based on the `content.md` file.
5.  **Populate Slides**:
    - **Slide 1 (Title)**: Use `<Title>` and `<Subtitle variant="hero">`.
    - **Subsequent Slides**: Use a mixture of components available in `"@/app/(courses)/_components/SlideComponents"` to create engaging slides.

- **Creative Freedom Rule (CRITICAL)**: You MUST be inventive with layout, hierarchy, composition, and component choice. DIVERSIFY YOUR SLIDES to avoid repetitive "Heading + Bullet points" structures. 
  - Heavily utilize `<Row>` and `<Column>` to create dynamic split layouts (e.g., text on the left, an impactful `<Quote>` or `<Card>` on the right).
  - Use `<Card>`, `<Callout>`, and `<DiscussionCard>` to visually segment and emphasize content.
  - Alternate slide compositions (e.g., center-aligned single column -> two-column split -> media-focused -> quote-focused) to keep the pacing engaging and creative.
- **Visible Copy Rule**: Do not introduce visible meta labels, editorial scaffolding, or pedagogical chrome. You MUST use the exact text from `content.md` without paraphrasing, summarizing, or modifying it.
- **Slide Overflow Prevention Rule**: Ensure the content of each slide fits comfortably within a single screen/viewport. To prevent vertical overflow on dense slides, distribute content horizontally using `<Row>` and `<Column>` rather than stacking all elements vertically. If a slide is excessively dense, consider using `<Card>` or smaller text layouts to organize the space efficiently.
- **Read-Only Source Rule**: NEVER edit, update, or modify the `content.md` file itself. Treat it as strictly read-only.

- **Quiz Wiring Rule**: If a slide is marked `[quiz]` in `content.md`, import `./quizzes.json`, build `const quizBySlideId = createCourseQuizLookup(quizzesData);`, and wire the corresponding `<Slide>` with `quizData={quizBySlideId["..."]}`.
- **Deterministic Helper Rule**: Treat `src/lib/course-quiz.ts` as the canonical helper for quiz wiring. When you need exact emitted JSX, follow `buildQuizLookupDeclaration`, `buildQuizDataProp`, and `createQuizWiringPlan` instead of inventing an inline pattern.
- **Selective Wiring**: Only slides marked `[quiz]` should receive `quizData` lookups. Non-quiz slides should not be wired to `quizzes.json`.
  - **Quantitative Slides (Required Emphasis)**: For any slide that explains percentages, market share, lifecycle proportion, allocation, or category distribution, prefer `<PieChart>` as the primary visual instead of raw bullet lists.
  - **PieChart Data Rule**: Pass a clean `data` array with meaningful labels and numeric values, and include a concise `caption` that states the core takeaway.
  - **Citations**: Use `<Citation ids={[1, 2]} />` where numbers correspond to the numbered sources in content.md. The citation data is automatically resolved from the CitationProvider context.
  - **Citation Example** in JSX:
    ```tsx
    <ListItem>
      Training legacy models like GPT-3 emitted over 550 metric tons of CO2e{" "}
      <Citation ids={[2, 3]} />.
    </ListItem>
    ```

6.  **Apply Highlights**: Wrap 1-2 key words in each `<Heading>` with `<Highlight>`.

## Quality Criteria

- **Cinematic Feel**: Ensure ample white space, weighted layouts, and high visual variety. Never generate more than two consecutive slides with the exact same layout structure. Break out of basic lists by using grids, rows, and rich typography.
- **Interactive**: All slides must be within a single `SlideDeck` for scroll-triggered animations to work.
- **Quiz Integration**: Slides marked `[quiz]` in `content.md` should automatically render pre-slide quizzes from `quizzes.json` using the shared lookup helper without a separate manual wiring step.
- **Source-Faithful Visible Copy**: Keep visible text EXACTLY as authored in `content.md`. Do not paraphrase or alter the copy. Creativity should come through presentation and composition, not text modification.
- **PieChart Usage**: All suitable part-to-whole or percentage slides should use `<PieChart>` with clear labels, valid totals, and a takeaway caption.
- **Code Cleanliness**: Keep `page.tsx` readable through clear sectioning, consistent component usage, and concise JSX blocks.

## Related Customizations

- `.github/instructions/courses-styling.instructions.md` (Design reference)
- `src/app/(courses)/_components/SlideComponents.tsx` (Component reference)
- `.github/skills/course-diagram-generation/SKILL.md` (Diagram-only workflow)
