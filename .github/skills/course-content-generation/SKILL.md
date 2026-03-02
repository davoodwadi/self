---
name: course-content-generation
description: "Generate a structured `content.md` file for a course session by synthesizing facts and latest research from a `deepResearch.md` source. This skill ensures the content is optimized for the cinematic 'Academic' slide deck format, using a professional, authoritative tone, and incorporating discussion questions on every slide. It strictly enforces the 'No M-dash/N-dash' rule."
---

# Course Content Generation Skill

## Overview

This skill takes a `deepResearch.md` file — containing the latest research, innovations, and data points on a specific topic — and transforms it into a structured, slide-ready `content.md` file. The output is used as the blueprint for generating a high-fidelity cinematic React `page.tsx` for the `(courses)` route.

## Workflow

### 1. Information Synthesis (`deepResearch.md` analysis)

- **Identify Core Themes**: Extract the 4-6 primary concepts or "arcs" (e.g., The Problem, The Hidden Costs, The Solutions, The Business Impact).
- **Extract Key Stats**: Pull out the most impactful data points (e.g., "500ml water per 20 queries", "90% efficiency improvement").
- **Identify Innovations**: Note specific technologies or frameworks mentioned (e.g., "GraphCast", "Quantization").

### 2. Structuring the `content.md`

The file MUST follow this exact structure:

1.  **# Topic**: A punchy, academic title.
2.  **# Background Shape**: A 1-2 sentence description of a cinematic background visual (e.g., "A slowly rotating 3D neural network", "Floating crystalline structures of data").
3.  **# Slide contents (30-40 slides for a 3-hour session)**: The header for the slide list.
4.  **## Slide Titles**: 30-40 headers representing the sequence of slides, organized into logical parts or modules (e.g., Part 1: Foundations, Part 2: Advanced Concepts).

### 3. Slide Composition Rules

- **Header Hierarchy**:
  - `## Title Slide`
  - `## The Problem: [Context]`
  - `## The Concept: [Context]`
  - `## Business Impact: [Context]`
  - `## The Challenge: [Context]`
  - `## Strategy: [Context]`
  - `## Conclusion: [Context]`
- **Bullet Point Constraint**: Use 2-4 bullet points per slide.
- **Discussion Questions**: Every slide (except perhaps the title) MUST end with a thought-provoking discussion question as the final bullet point. This triggers the interactive components in the final page.
- **Punctuation & Style**:
  - **CRITICAL**: Use NO m-dashes (—) or n-dashes (–). Use a colon (:), a comma (,), or a standard hyphen (-) instead.
  - **Academic Tone**: Use authoritative, executive language (e.g., "Leverage", "Optimize", "Mitigate", "Imperative").
- **Citations**:
  - **Preserve Markers**: Identify `[cite: X, Y]` markers in `deepResearch.md` and include them at the end of the relevant bullet points or sentences in `content.md`.

### 4. Logic for Background Selection

The background description should match the topic's "mood":

- **Sustainability**: "Gentle waves of emerald and gold particles", "Organic, slow-moving mesh structures".
- **Deep Learning**: "Glowing interconnected nodes", "Pulsing data streams".
- **Ethics/EDII**: "Prismatic glass shards reflecting light", "Balanced geometric lattices".

## Quality Criteria

- **No M-dash/N-dash**: Zero occurrences in the output.
- **30-40 Slides**: The deck must be substantial enough for a 3-hour academic session, divided into clear modules.
- **Research Grounding**: Every fact in `content.md` must be traceable to `deepResearch.md`.
- **Discussion Frequency**: 100% of body slides must have a closing question.

## Example Prompts

- "Synthesize `deepResearch.md` into a `content.md` for the Sustainability module."
- "Create a 16-slide content structure from the latest AI research, following the academic slide format."
- "Transform this research into a slide deck blueprint. Ensure no m-dashes and add discussion questions."

## Related Customizations

- `course-page-generation` (Next step: `content.md` -> `page.tsx`)
- `.github/instructions/main.instructions.md` (Repo conventions)
