# Introduction to Marketing: plate style

These rules cover every SVG plate in this course (all weeks, the landing page, anything new).

## Design system: Broadsheet

- **Palette** (defined in `(courses-intro-marketing)/globals.css`): warm bone paper `--paper` #FBFAF7, figure wells `--paper-2` #F4F1E9, filled zones `--paper-3` #ECE7DB; ink `--ink` / `--ink-2` / `--ink-3`; hairlines `--rule` / `--rule-2`; persimmon `--signal` #B23A15; teal `--counter` #22575B.
- **Type:** Fraunces for display, Instrument Sans for body and keys. No monospace anywhere.
- **Plate helpers:** every plate is built with `Frame`, `Key`, `Note`, `Display` and the palette constants (`INK`, `SIGNAL`, `COUNTER`, …).
- **Look:** hand-built SVG, flat fills, hairline rules, no shadows or gradients. Keys are uppercase and tracked in `var(--font-label)`.
- **Grammar:** each plate uses its own visual grammar (containment, branching, rings, hub-and-spoke, and so on). Do not repeat one node-and-arrow chart shape across a week.
- **Wells:** 400-wide column plates go in a plain `figure-well` div, not `Figure`, whose 680px minimum makes half-width columns scroll.

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply. In this course:

- **Rule 10:** INK is neutral, SIGNAL is what is learned, lit or chosen, COUNTER is the brand or the contrast. Never use SIGNAL for decoration.
- **Rule 18:** column plates sit in plain wells.
- **Rule 19:** plates sit on `--paper-2` wells, so an unstroked `--paper-2` fill disappears. Use `--paper-3` for filled zones, and never draw paper-coloured detail on a paper-coloured fill.
- **Rule 28:** colour comes only from the palette constants (INK, SIGNAL, COUNTER). Use `weight="duotone"` by default (its pale fill matches the plates' outline-plus-tint style) and `regular` below about 20 units.
