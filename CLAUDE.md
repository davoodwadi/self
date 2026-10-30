# Creating the slides page.tsx

When building `page.tsx` from `content.md`, preserve the sentences of `content.md` verbatim. Only add visuals on slides that carry a `[figure: ...]` tag in `content.md`. When authoring or revising `content.md` itself, follow `.github/skills/write-course-content/SKILL.md`.

# Writing and numbering rules

Never use the middle dot (Unicode U+00B7), a semicolon, an em dash (U+2014), or an en dash (U+2013) in any writing in this repo: slide text, `content.md` and `slides.md` files, exercises, labels, navigation, metadata, SVG text, string literals, or comments. Separate items with a colon, a comma, or a vertical bar (`email | website`), end the sentence with a period, set an aside in commas or parentheses, write ranges with "to" ("2015 to 2024"), write negative numbers with the minus sign (−), write multiplication as "×", and write an empty table cell as "n/a". Semicolons that are code syntax or HTML entities stay.

Never zero-pad week numbers or step indices: write `Week 1`, `week1`, and `1`, never `Week 01`, `01-introduction`, or `01`.

# Exercises

A topic tagged `[exercise]` in `content.md` gets one exercise in `exercises.json` (keyed by the slide's `id`, typed in `src/lib/course-exercise.ts`, and rendered via `exercise={exercise["<slide-id>"]}`). A topic tagged `[no-exercise]` gets none. Only test concepts students have already learned up to that slide, using new everyday scenarios rather than repeating the slide's sentences.

Pick the exercise type that best fits the topic:

- **Quiz** (`quiz`): multiple-choice question applying one idea to a new scenario.
- **Match-up** (`match`): pair each term with its example or definition.
- **Sort into groups** (`sort`): place cards into two or three categories.
- **Put it in order** (`order`): arrange steps or events into a sequence.
- **Which one is it?** (`identify`): classify a series of short cases using a shared set of concepts.

# Slide layout and interactivity

Each topic in `content.md` reads as one slide with a varied layout suited to its content. Never cut or reword content to make a slide fit.

Use an interactive visual when changing a value lets students discover a quantitative relationship (such as decision thresholds, sample size, or model fit). Otherwise use a clear static figure. Present illustrative data directly without "SIMULATED" or "ILLUSTRATIVE" labels, and use real study data whenever teaching a specific empirical finding.

# Shared pieces

Each course keeps its shared layout and drawing primitives in `_visuals/kit.tsx` and reusable drawn objects in `_visuals/objects.tsx`. Weeks import from their own course's `_visuals/` and never from another week or another course.

# SVG rules

Each course's `CLAUDE.md` defines its palette and visual style. Across all courses:

1. **No drawing beats a bad drawing.** If a figure does not clarify the slide, remove it.
2. **Self-evident, or redraw it.** A student must understand the figure from the drawing and the sentence beside it without a separate legend.
3. **Never label an object with its own name.** Text inside an SVG is only for a concept or stage name from the slide, a quantity or axis value, a distinction the drawing alone cannot make, or text that belongs to the object itself.
4. **Draw the concrete subject and action** rather than generic abstract boxes.
5. **Cut anything that does not carry meaning** and keep lines, labels, and borders clear of collisions.
6. **Verify each graphic visually at full size** after rendering, and run bounding-box overflow, label-overlap, and verbatim content checks.
7. **Phosphor icons (`@phosphor-icons/react`)** may stand for a single recognizable object inside a hand-built diagram, using the course palette and consistent weight across the week. Never use an icon as the whole plate or for data-encoding shapes.
