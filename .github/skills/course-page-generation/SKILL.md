---
name: course-page-generation
description: "Transform a `content.md` file in a `(courses)` route into a high-fidelity, cinematic `page.tsx` using the 'Academic' theme and custom slide components. This skill uses pre-built components from `_components/SlideComponents`."
---

# Course Page Generation Skill

## Overview

This skill automates the process of generating a React `page.tsx` file for a course module in the `(courses)` segment, based on a Markdown `content.md` file. It adheres to the "The Academic" design philosophy (Deep Crimson accents, Merriweather/Open Sans typography, and weighted animations).

## Workflow

### 1. Analyze Source (`content.md`)

Read the `content.md` file to extract:

- **Topic/Title**: Main course heading.
- **Background Shape**: Description of the background visuals (to be mapped to a `BackgroundManager` type).
- **Slide Sections**: Sections starting with `##` headers.
- **Key Concepts**: Bullet points, questions, and descriptions within each slide.

### 2. Component Mapping

Map the Markdown elements to the corresponding React components from `src/app/(courses)/_components/SlideComponents.tsx`.

| Markdown Element   | React Component      | Props/Variants                                    |
| ------------------ | -------------------- | ------------------------------------------------- |
| Main Title         | `<Title>`            | -                                                 |
| Sub-Header/Context | `<Subtitle>`         | `variant="hero"` for title slide                  |
| `## Slide Header`  | `<Heading>`          | Use `<Highlight>` for key words                   |
| Category/Tag       | `<Tag>`              | Derived from slide context (e.g., "The Problem")  |
| Bullet Points      | `<AnimatedList>`     | Contains `<ListItem>`                             |
| Questions          | `<DiscussionCard>`   | `title="Group Discussion"`                        |
| Quote/Emphasis     | `<Quote>`            | -                                                 |
| Process/Flow       | `<Mermaid>`          | `chart={\`flowchart ...\`}`                       |
| Citation           | `<Citation>`         | `ids={[1, 2]}` linking to course citation sources |
| Callout/Note       | `<Callout>`          | `variant="secondary"`                             |
| Image/Visual       | `<MediaBlock>`       | `src`, `alt`, `caption`                           |
| Split Layout       | `<Row>` & `<Column>` | `gap="large"`, `spanRatio="1/2"`                  |

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
      Citation,
      CitationProvider,
    } from "@/app/(courses)/_components/SlideComponents";
    import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";
    import Mermaid from "@/app/(courses)/_components/MermaidDiagram";
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
    - **Citations**: Use `<Citation ids={[1, 2]} />` where numbers correspond to the numbered sources in content.md. The citation data is automatically resolved from the CitationProvider context.
    - **Citation Example** in JSX:
      ```tsx
      <ListItem>
        Training legacy models like GPT-3 emitted over 550 metric tons of CO2e{" "}
        <Citation ids={[2, 3]} />.
      </ListItem>
      ```
    - Use mermaid diagram to illustrate concepts. Make sure the diagrams are not overly complex and can safely sit inside a slide.
6.  **Apply Highlights**: Wrap 1-2 key words in each `<Heading>` with `<Highlight>`.

## Mermaid Diagram Usage

The `<Mermaid>` component renders diagrams. Keep diagrams simple (5-7 nodes max).

### Best Practices for Mermaid

- **Direction**: Use `TD` for hierarchies, `LR` for timelines/sequences
- **Labels**: Keep to 2-4 words maximum
- **Complexity**: Limit to 5-7 nodes per diagram to make sure it fits on the slide page.

## Quality Criteria

- **Cinematic Feel**: Ensure ample white space and weighted layout.
- **Interactive**: All slides must be within a single `SlideDeck` for scroll-triggered animations to work.

## Related Customizations

- `.github/instructions/courses-styling.instructions.md` (Design reference)
- `src/app/(courses)/_components/SlideComponents.tsx` (Component reference)
