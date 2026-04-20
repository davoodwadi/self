---
name: course-diagram-generation
description: "Generate and wire diagrams for existing `ai-in-business` slide decks by reading `page.tsx`, selecting diagram-worthy slides, creating `flowcharts.tsx` configs, and rendering them with `FlowRenderer`. Use when a course already has slides and only diagram creation or diagram refactoring is needed. DO NOT use for digital-transformation or other courses."
argument-hint: "Course path within ai-in-business with existing page.tsx to diagramize"
---

# Course Diagram Generation

## Overview

This skill is for one job only: add or improve diagrams in an existing course `page.tsx` under `src/app/(courses)/courses/ai-in-business/*`.

Use this skill when slide content already exists and the task is to convert process-heavy slides into clear visual diagrams.

## Inputs

- Course folder with an existing `page.tsx`
- Existing slide structure in `<SlideDeck>`
- Optional existing `flowcharts.tsx`

## Outputs

- New or updated `flowcharts.tsx` in the same course folder
- Updated `page.tsx` imports and diagram render blocks
- Zero TypeScript errors from diagram-related changes

## When To Use

- "Add diagrams to this existing course page"
- "Improve readability of process slides with `FlowRenderer`"

## Procedure

### 1. Inspect Existing Slides

1. Read `content.md` (if available) and `page.tsx` to locate diagram intents.
2. Specifically look for slides in `page.tsx` that contain a placeholder `div` with a `data-diagram` attribute (e.g., `<div data-diagram="cascading flow - steps of AI deployment"...>`).
3. If no placeholders exist, manually find slides that describe one of these patterns:
   - sequence or pipeline
   - lifecycle or loop
   - comparison or tradeoff
   - cause and effect chain
   - system with actors and dependencies
4. Skip slides that are purely quote, title, or single-fact callout slides.

### 2. Select Diagram Targets

1. Slides with explicit `[diagram: ...]` intents or `data-diagram` placeholders are your primary targets. Treat them as score `3`.
2. For other slides, score each candidate slide from 1 to 3 on structural clarity:
   - `3`: explicit steps/stages with clear transitions
   - `2`: structure is present but needs interpretation
   - `1`: too vague for a useful diagram
2. Start with all score `3` slides.
3. Add score `2` slides only if the deck still lacks visual coverage.
4. If no slide scores above `1`, do not force diagrams. Leave the slide text-based and document why.

### 3. Decide Diagram Shape Per Slide

1. Use cascading flow (step-down diagonal) for staged pipelines or life cycles to provide a more elegant, cinematic look (e.g., each step drops 160px/280px on the Y axis while moving 320px on the X axis).
2. Avoid strict straight-line horizontal layouts for sequences unless horizontal space is extremely constrained; cascading steps look more academic and polished.
3. Use circular flow for lifecycle loops only when a loop is explicitly stated.
4. Use hub-and-spoke for central platform models.
5. Use split-lane layout for comparisons.
6. Use feedback arrows only when feedback is explicitly stated in slide content.
7. If structure is ambiguous, keep the slide text-based and document why no diagram was added.

### 4. Create Or Update `flowcharts.tsx`

1. Keep diagram data in a sibling `flowcharts.tsx` file, not in `page.tsx`.
2. Export one constant per diagram, for example `marketIntelligenceFlow`.
3. Each constant must include:
   - `aiGeneratedNodes`
   - `aiGeneratedEdges`
4. Node schema must include:
   - `id`
   - `position`
   - `data: { label, sublabel?, icon, color? }`
5. Edge schema must include:
   - `id`, `source`, `target`
   - optional `label`
   - `type: "smoothstep"`
   - `animated`
   - optional `style`
6. Use `lucide-react` icons in node `icon` fields with `size={20}` and `strokeWidth={2}`.
7. Do not set `markerEnd` in diagram configs. `FlowRenderer` injects arrow markers automatically.

### 4b. Diagram Quality Standards (Mandatory)

These rules are strict and must be followed for every generated diagram.

#### Layout And Spacing

1. Use a rectilinear grid. Align nodes to cardinal directions only.
2. Use `320px` horizontal spacing for sequence rows.
3. Use `160px` or `280px` vertical spacing for layered rows.
4. Do not use ad-hoc spacing values such as `250px`, `500px`, or `550px`.
5. Only use circular placement when the slide explicitly describes a loop and add a short comment documenting why.
6. Keep diagram spans within these bounds:
   - x-span `<= 960px`
   - y-span `<= 550px`
7. Preserve minimum visual clearance between node cards so edges remain visible:
   - minimum horizontal card-to-card gap: `>= 100px`
   - minimum vertical card-to-card gap: `>= 70px`
8. Do not place nodes so their rendered cards overlap or touch at any breakpoint.

#### Color Semantics

1. Group semantically related nodes with the same color.
2. Use the `(courses)` palette as the baseline:
   - crimson family for primary flow and risk path (`#8B0000`, `#A52A2A`)
   - charcoal family for neutral processing (`#1A1A1D`, `#2D2D32`)
   - gold (`#D4AF37`) for premium emphasis only
3. Use at most 3 semantic color groups per diagram, plus optional neutral gray.
4. New accent hues are allowed only when needed for explicit semantic contrast.
5. Any new accent hue must follow the same academic pattern:
   - muted and medium-dark
   - no neon or pastel tones
   - visually harmonious with crimson and charcoal
6. Do not introduce more than 1 non-core accent hue in a single diagram.
7. Add one short comment above each flow constant documenting color meaning, including any non-core accent rationale.
8. Avoid rainbow color assignment where each node has a different color without semantic need.

#### Edge Routing And Direction

1. Horizontal edges must use `sourceHandle: "right-source"` and `targetHandle: "left"`.
2. Vertical down edges must use `sourceHandle: "bottom-source"` and `targetHandle: "top"`.
3. Vertical up edges must use `sourceHandle: "top-source"` and `targetHandle: "bottom"`.
4. Forward-flow edges must use `type: "smoothstep"` and `animated: true`.
5. Feedback or optional edges must use `type: "smoothstep"`, `animated: false`, and dashed stroke (`strokeDasharray: "5,5"`).
6. Edge style must be consistent:
   - `strokeWidth: 2`
   - `opacity: 0.55` for main flow
   - `opacity: 0.6` for labeled emphasis edges
7. Edge stroke colors must match the semantic group of the source flow stage.
8. Avoid edge crossings. If unavoidable, adjust node positions before adding more edges.

#### Node Content And Density

1. Each node must include an icon.
2. Label length must be concise:
   - label: up to 3 words
   - sublabel: up to 4 words
3. Prefer noun phrases over long sentence labels.
4. Node count limits:
   - ideal: 4 to 5 nodes
   - minimum: 3 nodes
   - maximum: 7 nodes
5. If a concept needs more than 7 nodes, split it into two diagrams.

#### Renderer-Aware Constraints

1. `OmniNode` has `min-w-[220px]`, so leave adequate horizontal room between columns.
2. `FlowRenderer` applies `fitView` with padding, so keep layouts compact and balanced.
3. Do not rely on custom marker configuration because markers are auto-injected.
4. Always tune node spacing after placement to maintain visible edge lanes between adjacent cards.

#### Pre-Commit Self Audit

1. All node positions follow the required spacing system.
2. Handles match edge direction for every edge.
3. Forward flow, feedback flow, and optional flow are visually distinguishable.
4. No obvious line crossing remains.
5. Diagram remains readable at mobile, tablet, and desktop container heights.
6. No node cards overlap, and edge paths remain visible between all adjacent nodes.

### 5. Wire Diagrams Into `page.tsx`

1. Import default `FlowRenderer` from `@/components/flowcharts/FlowRenderer`.
2. Import diagram constants from `./flowcharts`.
3. If a placeholder `div` exists (e.g., `<div data-diagram="...">`), **replace it** with the actual responsive diagram container. Otherwise, insert it inside the selected slide:

```tsx
<div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
  <FlowRenderer {...marketIntelligenceFlow} />
</div>
```

4. Place the diagram near supporting heading/text so narrative order remains clear.
5. Keep container heights at `h-[300px] sm:h-[340px] md:h-[380px]` unless the slide has a justified exception.
6. Verify the selected diagram dimensions remain readable in this container across breakpoints.

### 6. Validate

1. Confirm imports resolve and there are no TypeScript errors.
2. Confirm each diagram is readable at these heights: mobile `300px`, tablet `340px`, desktop `380px`.
3. Confirm node labels are concise and match the slide language.
4. Confirm edge direction matches the story in the slide.
5. Confirm no edge crossings remain after layout tuning.
6. Confirm `page.tsx` stays focused on layout while large arrays remain in `flowcharts.tsx`.

### 7. Anti-Patterns (Do Not Generate)

1. Random spacing that breaks visual rhythm.
2. Diagonal or circular placement without explicit lifecycle justification.
3. One unique color per node when nodes belong to the same semantic group.
4. Mismatched handle pairs that force awkward bends.
5. Animated dashed feedback loops.
6. Verbose labels that exceed the word limits.
7. Missing icons on node cards.
8. Excessive edge density that creates spaghetti lines.
9. Manually setting `markerEnd` in flowchart definitions.
10. Using bright neon or pastel colors that break the academic palette pattern.
11. Adding multiple non-core accent hues in a single diagram.
12. Packing nodes tightly so edges are hidden, clipped, or visually merged with node cards.

## Completion Checklist

- [ ] Selected only structurally suitable slides
- [ ] Diagram constants extracted to `flowcharts.tsx`
- [ ] Spacing uses required grid values (`320px` horizontal, `160px` or `280px` vertical)
- [ ] Colors are grouped by semantic role and documented by a short comment
- [ ] Colors follow course palette baseline; any new accent is justified, muted, and limited to one extra hue family
- [ ] Handles are directionally correct for all edges
- [ ] Forward edges are animated `smoothstep`; feedback edges are dashed and not animated
- [ ] Labels and sublabels stay within word limits
- [ ] Every node has an icon with consistent size and stroke
- [ ] Node count is within limits (3 to 7, ideal 4 to 5)
- [ ] Diagram span remains within responsive bounds (`x <= 960`, `y <= 550`)
- [ ] Node cards have ample spacing (no overlap; edge lanes remain visible)
- [ ] `page.tsx` updated with clean imports and render blocks
- [ ] Visual hierarchy preserved in each slide
- [ ] No diagram-related lint or TypeScript errors

## Ambiguities To Confirm With User

- Target density: add diagrams to all eligible slides or only top 3 to 5 highest-value slides
- Visual style: conservative academic or more expressive cinematic layouts
- Naming convention: strict `<topic>Flow` constants or flexible names

## Example Prompts

- "Run `course-diagram-generation` on `src/app/(courses)/courses/09-product-development/page.tsx` and add diagrams to the best slides."
- "Use `course-diagram-generation` to move inline node and edge arrays into `flowcharts.tsx` and keep slide JSX clean."
- "Apply `course-diagram-generation` and focus only on lifecycle and pipeline slides."

## Related Files

- `@/components/flowcharts/FlowRenderer.tsx`
- `@/components/slide-components/SlideComponents.tsx`
- `.github/instructions/courses-styling.instructions.md`
