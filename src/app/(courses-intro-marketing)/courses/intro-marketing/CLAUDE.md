# Introduction to Marketing: design and plate style

These rules govern the course landing page, every weekly slide deck, and every SVG plate in this course.

## Design system, colours, and typography

The course uses a clean, straightforward academic sans-serif design system on a white ground (`--paper`), avoiding ornate editorial flourishes and AI-generated visual tropes. Only `Source Sans 3` (`--font-source-sans`) is loaded in `(courses-intro-marketing)/layout.tsx`, and `--font-sans`, `--font-heading`, `--font-body`, and `--font-label` in `(courses-intro-marketing)/globals.css` resolve to `var(--font-source-sans), ui-sans-serif, system-ui, -apple-system, sans-serif`. All headings, body copy, callouts, discussion prompts, exercises, and diagram labels are set in upright sans-serif. Never use display serifs (such as `Fraunces`), SVG noise/grain overlays, hollow text-stroke numerals, italic callout or discussion prompts, decorative small-caps tracking, or coloured slide headings and column rules.

- **Palette** (defined in `(courses-intro-marketing)/globals.css`): clean white ground `--paper` `#fffffe`, subtle card/band fill `--paper-2` `#f5f4f0`, filled zones `--paper-3` `#eae7e0`. Ink `--ink` (`#181613`) / `--ink-2` (`#2d2b29`) / `--ink-3` (`#5e5850`). Hairlines `--rule` (`#e2dfd9`) / `--rule-2` (`#c8c3ba`). Muted terracotta `--signal` (`#7a3b2e`). Deep slate teal `--counter` (`#1e4e52`).
- **Plate helpers:** every plate is built with `Frame`, `Key`, `Note`, `Display` and the palette constants (`INK`, `SIGNAL`, `COUNTER`, …) from `_visuals/kit.tsx`.
- **Look:** hand-built SVG, flat fills, hairline rules, no shadows or gradients.
- **Grammar:** each plate uses its own visual grammar (containment, branching, rings, hub-and-spoke, and so on). Do not repeat one node-and-arrow chart shape across a week.

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply. In this course:

- **Rule 10 (Colour):** `INK` is neutral, `SIGNAL` marks the single element in a plate that is learned, lit or chosen, and `COUNTER` marks the comparison or contrast case. Keep slide headings, body prose, defined terms, discussion prompts, and structural rules in neutral ink and `--rule` hairlines rather than colouring slide text or column borders with `--signal` or `--counter`.
- **Rule 18:** column plates sit in `Plate` wrappers (`figure-well`).
- **Rule 19 (Ground):** plates sit directly on the clean white slide surface (`--paper`) without a boxed `.figure-well` fill or border. Use `--paper-2` or `--paper-3` (or a subtle stroke) for filled zones inside a plate so they read against the white ground, and never draw white detail on an unstroked white fill.
- **Rule 28:** colour comes only from the palette constants (`INK`, `SIGNAL`, `COUNTER`). Use `weight="duotone"` by default and `regular` below about 20 units.
