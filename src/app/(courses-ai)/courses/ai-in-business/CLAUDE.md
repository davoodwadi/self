# Applications of AI in Business: plate style

These rules cover every SVG figure in this course (all weeks, the landing page, anything new).

## Design system: editorial, one crimson mark

- **Palette** (defined in `(courses-ai)/globals.css`): ink `--charcoal` #1A1A1D, body `--charcoal-light` #2D2D32, the one accent `--crimson` #8B0000, a quiet secondary `--champagne` #8C7349, the ground `--surface` / `--background` (white).
- **Look:** hairlines instead of boxes, flat fills, no shadows or gradients. Crimson marks one thing per figure.
- **Type:** the `MICRO` small-caps label (`font-sans text-[10px] font-semibold uppercase tracking-[0.22em]`) for every eyebrow, axis tick and numeral; `var(--font-serif)` for display.
- **Where figures live:** inline in each week's `page.tsx`, next to the slide they illustrate. There is no `visuals.tsx`.
- **Words:** figures carry only words that already appear in the slide's sentences.
- **Headings:** `(courses-ai)/globals.css` sets h1–h6 outside any cascade layer, so Tailwind utilities on headings lose. Set heading type through CSS-module classes.

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply. In this course:

- **Rule 10:** `--charcoal` is neutral, `--crimson` is the one thing that is learned, lit or chosen, `--champagne` is the quiet contrast. Never use crimson for decoration.
- **Rule 19:** figures sit directly on the slide's `--surface`/`--background`, so an unstroked fill of that colour disappears. Stroke it, or use a light charcoal or crimson tint for filled zones.
- **Rule 28:** colour comes only from the palette (`var(--charcoal)`, `var(--crimson)`, `var(--champagne)`). Use `weight="duotone"` by default (its pale fill matches the figures' outline-plus-tint style) and `regular` below about 20 units.
