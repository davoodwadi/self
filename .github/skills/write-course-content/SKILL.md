---
name: write-course-content
description: "Write, draft, or revise weekly university course lecture files (content.md) under src/app/(courses-*)/courses/. Use when creating or editing content.md for any course week to enforce university academic register, 3-hour lecture pacing, plain-English concept definitions, and content-only [figure: ...] descriptions."
argument-hint: "<course-name> <week-number>"
---

# Write Course Content (`content.md`)

Use this skill whenever creating or revising a weekly `content.md` file in `src/app/(courses-*)/courses/<course>/week<N>/content.md`.

## 1. Grounding in the Course Curriculum

1. Read the course's `curriculum.md` (and `_landing/syllabus.ts` if present) before drafting.
2. Match the week's topic title, summary, and bullet sequence to the curriculum entry for that week.
3. Read an exemplar `content.md` such as `src/app/(courses-mra)/courses/marketing-research-analytics/week1/content.md` or `src/app/(courses-ai)/courses/ai-in-business/week1/content.md` to calibrate sentence length and academic register.

## 2. Structure and Pacing for a 3-Hour Lecture

A 3-hour (180-minute) university lecture requires **25 to 28 `##` sections** in `content.md`, which renders as **32 to 36 screens** once `[exercise]` screens are included:

- **Frontmatter**:
  ```yaml
  ---
  topic: "<Week Title>"
  lecturer: "Davood Wadi, PhD"
  course: "<Course Title>"
  week: "week<N>"
  ---
  ```
- **Title Slide (1 section)**:
  - `## Title Slide`
  - `- Week <N>` (never zero-padded: write `Week 1`, never `Week 01`)
  - One declarative sentence stating the core thesis of the week.
- **Opening Framing (2 sections)**:
  - Introduce the managerial or analytical problem the week addresses.
  - Tag `[no-exercise]` or `[exercise]` as appropriate.
- **Part Dividers (4 to 5 sections)**:
  - `## Part 1: <Title> [no-exercise]` through `## Part 4` or `Part 5`.
  - Two or three sentences stating what the part covers and why it matters.
- **Core Concept Slides (15 to 16 sections)**:
  - Three to four slides per part, with **4 to 5 bullets** per slide.
  - Tag **6 to 8** slides `[exercise]` where students can apply a distinction, sequence, calculation, or classification to a new case.
  - Tag the remaining concept slides `[no-exercise]`.
- **Group Discussions (2 sections)**:
  - `## Discussion: <Case Title>` placed midway and near the end of the lecture.
  - One concrete business scenario ending with a clear analytical question for small-group discussion.
- **Closing Summary (1 section)**:
  - `## Key Takeaways`
  - Six to seven bullets synthesizing the core propositions of the week.

## 3. University Register, Tone, and Terminology

- **Direct, declarative sentences**: Write one idea per bullet in plain academic prose (12 to 25 words). State the definition in one bullet and give the concrete business example in the next bullet.
- **No overstuffed parenthetical bullets**: Do not pack a definition, a mechanism, and a parenthetical `(such as A, B, or C)` into a single 40-word sentence.
- **No consulting, blog, or LLM clichés**: Avoid phrases such as _"Treating AI as magic"_, _"moved from isolated research labs"_, _"When the World Changes"_, _"Why the Boom Happened Now"_, _"broke overnight"_, _"Three reinforcing shifts unlocked"_, or _"Today's enterprise landscape"_. Use standard university headings (`Distribution Shift and Model Drift`, `Prediction Versus Judgment`, `Formulating a Prediction Problem`).
- **Define technical terms on first use**: Introduce every technical term (`unit of observation`, `features`, `target`, `data leakage`, `false positive`, `false negative`, `overfitting`, `representation learning`, `hallucination`) with a plain-English definition suited to the course level before relying on it in later slides.

## 4. Visual Descriptions (`[figure: ...]`)

`content.md` identifies which slides genuinely benefit from a visual and what that visual depicts, so downstream slide building never invents irrelevant filler graphics:

- **Only add `[figure: ...]` when a visual clarifies the concept**: Use figures for pipelines, coordinate plots, distributions, data tables, feedback loops, and interactive trade-offs.
- **Omit the tag when no visual is needed**: Do not write `[visual: none]`. Slides without a figure simply begin with their bullets.
- **Describe content, not styling**: Inside `[figure: ...]`, state only the subject matter and relationships shown in the diagram or interactive chart. Never include PascalCase component names, pixel widths (`800w`), CSS color tokens (`--ink`, `--accent`), or layout instructions.
  - Good: `[figure: contrasting pipeline of rule-based software (inputs plus explicit rules producing an output) and machine learning (inputs plus historical outcomes training a model)]`
  - Bad: `[figure: RulesVsLearning (800w, static): Two stacked horizontal pipelines in --ink with --accent highlights...]`

## 5. Repository Writing and Numbering Rules

- **Forbidden punctuation**: Never use the middle dot (U+00B7), a semicolon, an em dash (U+2014), or an en dash (U+2013) anywhere in `content.md`. Use colons, commas, parentheses, or separate sentences instead, and write ranges with "to" or "through" (`Weeks 1 to 2`).
