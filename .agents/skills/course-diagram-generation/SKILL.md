---
name: course-diagram-generation
description: Generate and wire diagrams for existing slide decks by reading `page.tsx`, selecting diagram-worthy slides, creating `flowcharts.tsx` configs, and rendering them with `FlowRenderer`. Use when a course already has slides and only diagram creation or diagram refactoring is needed. DO NOT use for digital-transformation or other courses.
---

# course-diagram-generation

Use this skill when slide content already exists and the task is to convert process-heavy slides into clear visual diagrams.

## Usage

### When to use:

- "Add diagrams to this existing course page"
- "Improve readability of process slides with `FlowRenderer`"

## Steps

### 1. Inspect Existing Slides

1. Read the course `page.tsx` and map all slides.
2. Find slides that describe one of these patterns:
   - sequence or pipeline
   - lifecycle or loop
   - comparison or tradeoff
   - cause and effect chain
   - system with actors and dependencies
3. Skip slides that are purely quote, title, or single-fact callout slides.

### 2. Select Diagram Targets

1. Score each candidate slide from 1 to 3 on structural clarity:
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
2. Define semantic color hex codes as constants at the top of the file (e.g., `const PRIMARY = "#7f1d1d"; const NEUTRAL = "#1e293b"; const SUSTAINABLE = "#14532d";`).
3. Export one constant per diagram, for example `marketIntelligenceFlow`.
4. Each constant must include:
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
6. Use `lucide-react` icons in node `icon` fields with a delicate `size={20}` and `strokeWidth={1.5}`.
7. Do not set `markerEnd` in diagram configs. `FlowRenderer` injects arrow markers automatically.

### 4b. Diagram Quality Standards (Mandatory)

These rules are strict and must be followed for every generated diagram.

#### Layout And Spacing

1. Use a rectilinear grid. Align nodes to cardinal directions only.
2. Use `280px`, `300px`, or `320px` horizontal spacing for sequence steps (e.g., use `280px` or `300px` to fit 4-node sequences within width limits).
3. Use `140px`, `160px`, `180px`, or `280px` vertical spacing for layered rows or cascading steps.
4. Prefer cascading diagonal step layouts (e.g., dropping 160px vertically for every 320px horizontal move) over flat straight-line layouts for a more cinematic and elegant visual flow.
5. Do not use ad-hoc spacing values such as `250px`, `500px`, or `550px`.
6. Only use circular placement when the slide explicitly describes a loop and add a short comment documenting why.
7. Keep diagram spans within these bounds:
   - x-span `<= 960px`
   - y-span `<= 550px`
8. Preserve minimum visual clearance between node cards so edges remain visible:
   - minimum horizontal card-to-card gap: `>= 100px`
   - minimum vertical card-to-card gap: `>= 70px`
9. Do not place nodes so their rendered cards overlap or touch at any breakpoint.

#### Color Semantics

1. Group semantically related nodes with the same color.
2. Use the `(courses)` palette as the baseline, extracting these into constants at the top of `flowcharts.tsx` (e.g., `PRIMARY`, `NEUTRAL`, `SUSTAINABLE`). Prefer deeper, richer tones for a cinematic academic look:
   - Deep crimson for primary flow and risk path (e.g., `#7f1d1d`)
   - Deep slate/charcoal for neutral processing steps (e.g., `#1e293b`)
   - Deep green for sustainability/eco focus (e.g., `#14532d`)
   - Deep gold (`#D4AF37` or deeper) for premium emphasis only
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

1. Purely horizontal edges must use `sourceHandle: "right-source"` and `targetHandle: "left"`.
2. Vertical down edges (including cascading steps) must use `sourceHandle: "bottom-source"` and `targetHandle: "top"`.
3. Vertical up edges must use `sourceHandle: "top-source"` and `targetHandle: "bottom"`.
4. For fan-in/fan-out or circular layouts, target different sides of a single node (e.g., `left`, `right`, `top`) simultaneously to avoid overlapping edges.
5. Forward-flow edges must use `type: "smoothstep"` and `animated: true`.
6. Feedback or optional edges must use `type: "smoothstep"`, `animated: false`, and dashed stroke (`strokeDasharray: "5,5"`).
6. Edge style must be consistent and delicate for a cinematic look:
   - `strokeWidth: 1.5`
   - `opacity: 0.5` to `0.6` for main flow
   - `opacity: 0.7` for labeled emphasis edges
7. Edge stroke colors must match the semantic group of the source flow stage.
8. Avoid edge crossings. If unavoidable, adjust node positions before adding more edges.

#### Node Content And Density

1. Each node must include an icon. Use a finer, cinematic line weight for icons (`size={20}`, `strokeWidth={1.5}`).
2. Label length must be concise and use formal academic terminology (e.g., "Use Phase" instead of "Use", "End of Life" instead of "Disposal"):
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

1. Import `FlowRenderer` from `@/components/flowcharts/FlowRenderer`.
2. Import diagram constants from `./flowcharts`.
3. Insert a responsive diagram container inside the selected slide. Tune the container height classes based on the diagram's vertical span (e.g., `h-[280px]` vs `h-[300px]`):

```tsx
<div className="w-full h-[280px] sm:h-[300px] md:h-[320px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
  <FlowRenderer {...marketIntelligenceFlow} />
</div>
```

4. Place the diagram near supporting heading/text so narrative order remains clear.
5. Adjust container heights (`h-[280px]`, `h-[300px]`, `h-[360px]`, etc.) to cleanly fit the diagram without excessive whitespace.
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
- [ ] Spacing uses required grid values (`280px`, `300px`, `320px` horizontal; `140px`, `160px`, `180px`, `280px` vertical)
- [ ] Colors are grouped by semantic role using defined constants (`PRIMARY`, `NEUTRAL`, etc.) and documented by a short comment
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
