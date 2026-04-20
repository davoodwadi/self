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
- **Slide Sections**: Sections starting with `##` headers.
- **Key Concepts**: Bullet points, questions, and descriptions within each slide.

### 2. Component Mapping

Map the Markdown elements to the corresponding React components from `src/components/slide-components/SlideComponents.tsx`.

| Markdown Element     | React Component      | Props/Variants                                    |
| -------------------- | -------------------- | ------------------------------------------------- |
| Main Title           | `<Title>`            | -                                                 |
| Sub-Header/Context   | `<Subtitle>`         | `variant="hero"` for title slide                  |
| `## Slide Header`    | `<Heading>`          | Use `<Highlight>` for key words                   |
| Category/Tag         | `<Tag>`              | Derived from slide context (e.g., "The Problem")  |
| Body Text/Paragraph  | `<ContentText>`      | `layout="prose"` (default) or `layout="base"`     |
| Sub-heading in cards | `<ContentTitle>`     | -                                                 |
| Description in cards | `<ContentDescription>` | -                                                 |
| Structured Box       | `<Card>`             | `title`, `subtitle`                               |
| Bullet Points        | `<AnimatedList>`     | Contains `<ListItem>`                             |
| Questions            | `<DiscussionCard>`   | `title="Group Discussion"`                        |
| Quote/Emphasis       | `<Quote>`            | `author`, `role`                                  |
| Statistics/Numbers   | `<Metric>`           | `value`, `label`                                  |
| Citation             | `<Citation>`         | `ids={[1, 2]}` linking to course citation sources |
| Callout/Note         | `<Callout>`          | `variant="primary"` or `variant="secondary"`      |
| Image/Visual         | `<MediaBlock>`       | `src`, `alt`, `caption`                           |
| Percentage Breakdown | `<PieChart>`         | `data`, `title?`, `caption?`, `size?`             |
| Split Layout         | `<Row>` & `<Column>` | `gap="large"`, `spanRatio="1/2"`                  |
| `[diagram: ...]`     | Placeholder `div`    | `<div data-diagram="shape - concept" className="...">` |

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
      Metric,
      AnimatedList,
      ListItem,
      Callout,
      MediaBlock,
      PieChart,
      Citation,
      CitationProvider,
    } from "@/components/slide-components/SlideComponents";
    import { createCourseQuizLookup } from "@/lib/course-quiz";
    ```

    ```tsx
    export default function CourseName() {
      return (
          <SlideDeck>
            {/* slides here */}
          </SlideDeck>
      );
    }
    ```
5.  **Populate Slides**:
    - **Slide 1 (Title)**: Use `<Title>` and `<Subtitle variant="hero">`.
    - **Subsequent Slides**: Use a mixture of components available in `"@/components/slide-components/SlideComponents"` to create engaging slides.

- **Creative Freedom Rule (CRITICAL)**: You MUST be inventive with layout, hierarchy, composition, and component choice. DIVERSIFY YOUR SLIDES to avoid repetitive "Heading + Bullet points" structures. 
  - Heavily utilize `<Row>` and `<Column>` to create dynamic split layouts (e.g., text on the left, an impactful `<Quote>` or `<Card>` on the right).
  - Use `<Card>`, `<Callout>`, and `<DiscussionCard>` to visually segment and emphasize content.
  - Alternate slide compositions (e.g., center-aligned single column -> two-column split -> media-focused -> quote-focused) to keep the pacing engaging and creative.
- **Visible Copy Rule**: Do not introduce visible meta labels, editorial scaffolding, or pedagogical chrome. You MUST use the exact text from `content.md` without paraphrasing, summarizing, or modifying it.
- **Slide Overflow Prevention Rule**: Ensure the content of each slide fits comfortably within a single screen/viewport. To prevent vertical overflow on dense slides, distribute content horizontally using `<Row>` and `<Column>` rather than stacking all elements vertically. If a slide is excessively dense, consider using `<Card>` or smaller text layouts to organize the space efficiently.
- **Read-Only Source Rule**: NEVER edit, update, or modify the `content.md` file itself. Treat it as strictly read-only.
- **Diagram Intents Rule**: If you encounter a `[diagram: shape - concept]` tag in `content.md`, DO NOT attempt to generate the `flowcharts.tsx` file. Instead, render a placeholder `div` inside the slide: `<div data-diagram="shape - concept" className="w-full h-[300px] sm:h-[340px] md:h-[380px] rounded-2xl border border-[var(--crimson)]/15 bg-white/80 flex items-center justify-center text-[var(--charcoal-light)]">Diagram Placeholder: concept</div>`. The Course Diagram Builder agent will replace this later.

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

### 4. Composition & Layout Examples (Avoiding Monotony)

To avoid monotony and create a highly engaging, cinematic experience, you MUST alternate slide layouts. **Never use the exact same layout for two consecutive slides.** Mix and match components to create distinct visual hierarchies and uniquely formatted slides. 

Here are examples of how to combine components for distinct slide layouts:

**Example 1: The "Metric & Quote Split" (Impact-focused)**
```tsx
<Slide>
  <Row gap="large" items="center">
    <Column spanRatio="1/3">
      <Metric value="85%" label="Adoption Rate" />
    </Column>
    <Column spanRatio="2/3">
      <Quote author="Industry Report">AI adoption has accelerated beyond all expectations.</Quote>
      <ContentText>This shift requires a fundamental rethinking of business strategy...</ContentText>
    </Column>
  </Row>
</Slide>
```

**Example 2: The "Visual Callout" (Combining media with important notes)**
```tsx
<Slide>
  <Heading>Strategic Implementation</Heading>
  <Row gap="large" items="start">
    <Column spanRatio="1/2">
      <MediaBlock src="/placeholder.jpg" alt="Implementation" caption="Phase 1 Rollout" />
    </Column>
    <Column spanRatio="1/2">
      <Callout variant="primary" title="Critical Step">
        Ensure stakeholder alignment before proceeding.
      </Callout>
      <AnimatedList>
        <ListItem>Assess current capabilities</ListItem>
        <ListItem>Define success metrics</ListItem>
      </AnimatedList>
    </Column>
  </Row>
</Slide>
```

**Example 3: The "Card Grid Breakdown" (Structured information)**
```tsx
<Slide>
  <Heading>Three Pillars of Success</Heading>
  <Subtitle variant="section">Foundational elements for AI readiness</Subtitle>
  <Row gap="medium">
    <Column spanRatio="1/3">
      <Card title="Data" subtitle="Pillar 1">
        <ContentDescription>Clean, accessible, and structured data pipelines.</ContentDescription>
      </Card>
    </Column>
    <Column spanRatio="1/3">
      <Card title="Talent" subtitle="Pillar 2">
        <ContentDescription>Skilled professionals and continuous training.</ContentDescription>
      </Card>
    </Column>
    <Column spanRatio="1/3">
      <Card title="Culture" subtitle="Pillar 3">
        <ContentDescription>An organizational mindset that embraces experimentation.</ContentDescription>
      </Card>
    </Column>
  </Row>
</Slide>
```

**Example 4: The "Deep Dive Discussion" (Reflection-focused)**
```tsx
<Slide>
  <Tag>Reflection</Tag>
  <Heading>Ethical Implications</Heading>
  <Row gap="large" items="center">
    <Column spanRatio="1/2">
      <ContentText layout="base">
        <strong>The challenge:</strong> Balancing innovation with responsibility.
      </ContentText>
    </Column>
    <Column spanRatio="1/2">
      <DiscussionCard title="Group Discussion">
        How would you apply these principles to your own work? Consider both technical and ethical implications.
      </DiscussionCard>
    </Column>
  </Row>
</Slide>
```

## Quality Criteria

- **Cinematic Feel**: Ensure ample white space, weighted layouts, and high visual variety. Never generate more than two consecutive slides with the exact same layout structure. Break out of basic lists by using grids, rows, and rich typography.
- **Interactive**: All slides must be within a single `SlideDeck` for scroll-triggered animations to work.
- **Quiz Integration**: Slides marked `[quiz]` in `content.md` should automatically render pre-slide quizzes from `quizzes.json` using the shared lookup helper without a separate manual wiring step.
- **Source-Faithful Visible Copy**: Keep visible text EXACTLY as authored in `content.md`. Do not paraphrase or alter the copy. Creativity should come through presentation and composition, not text modification.
- **PieChart Usage**: All suitable part-to-whole or percentage slides should use `<PieChart>` with clear labels, valid totals, and a takeaway caption.
- **Code Cleanliness**: Keep `page.tsx` readable through clear sectioning, consistent component usage, and concise JSX blocks.

## Related Customizations

- `.github/instructions/courses-styling.instructions.md` (Design reference)
- `src/components/slide-components/SlideComponents.tsx` (Component reference)
- `.github/skills/course-diagram-generation/SKILL.md` (Diagram-only workflow)
