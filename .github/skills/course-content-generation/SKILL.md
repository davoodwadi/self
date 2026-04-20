---
name: course-content-generation
description: "Generate a structured `content.md` file for an AI in Business course session by synthesizing facts. This skill ensures the content is optimized for the cinematic 'Academic' slide deck format, using a curious, engaging classroom tone, and adding highly specific `Discussion:` prompts only when discussion is genuinely warranted. It strictly enforces the 'No M-dash/N-dash' rule. DO NOT use for digital-transformation or other courses."
---

# Course Content Generation Skill

## Overview

This skill takes a topic and transforms it into a structured, slide-ready `content.md` file. The output is used as the blueprint for generating a high-fidelity cinematic React `page.tsx` for the `ai-in-business` course.

## Workflow

### 1. Structuring the `content.md`

The file MUST follow this exact structure:

1.  **# Topic**: An academic title.
2.  **# Background Shape**: A 1-2 sentence description of a cinematic background visual (e.g., "A slowly rotating 3D neural network", "Floating crystalline structures of data"). The background must be slow-moving, calm, non-intrusive, and subtle.
3.  **# Slide contents (20-30 slides for a 3-hour session)**: The header for the slide list.
4.  **## Slide Titles**: 20-30 headers representing the sequence of slides, organized into logical parts or modules (e.g., Part 1: Foundations, Part 2: Advanced Concepts).

### 2. Slide Composition Rules

- **Header Hierarchy**:
  - `## Title Slide`
  - `## The Problem: [Context]`
  - `## The Concept: [Context]`
  - `## Business Impact: [Context]`
  - `## The Challenge: [Context]`
  - `## Strategy: [Context]`
  - `## Conclusion: [Context]`
- **Bullet Point Constraint**: Use 2-4 bullet points per slide.
- **Discussion Questions**: Discussion prompts MUST be on their own dedicated slide. Do not append them as a final bullet on a content slide. Create a new slide header (e.g., `## Discussion: [Topic]`) and place the scenario-based question as the only bullet point.
- **Specificity Requirement**: Discussion prompts must be tightly anchored to the exact slide content, by specifying a brief scenario that requires a judgement. Avoid generic prompts that could fit any topic.
- **Concluding Slide Requirement**: EVERY slide deck MUST end with a final `## Conclusion: [Topic]` slide that wraps up the session, summarizes the core takeaways, and provides closure for the module.
- **Diagram Intents**: If a slide describes a complex process, lifecycle, pipeline, or comparison, include a diagram intent tag right below the header: `[diagram: <shape> - <description>]`. Shapes can be: cascading flow, circular loop, hub-and-spoke, split-lane, etc. (e.g., `[diagram: cascading flow - steps of AI deployment]`). Do not overuse diagrams.
- **Punctuation & Style**:
  - **CRITICAL**: Use NO m-dashes (—) or n-dashes (–). Use a colon (:), a comma (,), or a standard hyphen (-) instead.

### 3. Logic for Background Selection

The background description should match the topic's "mood". It should be lowkey, gentle, and academic.

## Quality Criteria

- Use simple and easy to understand pedagogical sentences and avoid complex sentences 
- **No M-dash/N-dash**: Zero occurrences in the output.
- The deck must be enough for a 3-hour academic session, divided into clear modules.
- **Discussion Discipline**: Discussion prompts should be sparse, deliberate, and materially better than having no prompt at all.
- **Mandatory Conclusion**: The final slide must always be a summarization/conclusion slide.
- **Classroom-First Tone**: The content should feel like an engaging university lecture, not a corporate board meeting. Frame the content from an academic lens—focusing on critical thinking, systems design, ethical implications, and balanced evaluation. Avoid aggressive corporate jargon, "cutthroat" profit-maximization rhetoric, and hype-driven buzzwords. Use a curious, objective, and supportive pedagogical voice.

## Example Prompts

- "Create the content for the Sustainability module."
- "Create a 16-slide content structure for Introduction to Marketing."

## Related Customizations

- `course-page-generation` (Next step: `content.md` -> `page.tsx`)
- `.github/instructions/main.instructions.md` (Repo conventions)
