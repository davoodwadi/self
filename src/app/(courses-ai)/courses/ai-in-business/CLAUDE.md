# Applications of AI in Business: Design and Plate Guide

## Look and typography

The course uses a plain, academic design set in upright sans-serif (`Source Sans 3`) on a white ground (`--paper`). Shared typography tokens and slide layout blocks live in `_visuals/kit.tsx`. Hierarchy comes from type size, weight, whitespace, and simple horizontal rules.

## Palette

- `--paper` / `--background` (`#FFFFFF`): page and slide ground
- `--ink` (`#1A1D24`): primary ink and headings
- `--ink-2` (`#363B44`): body copy
- `--ink-3` (`#676D77`): muted grey for indices, axes, and metadata
- `--rule` (`#D9DCE1`): hairline borders and dividers
- `--accent` (`#2C4A8C`): academic slate blue for the single focal element or active state

## Structure

- Keep the landing page, title slides, and section dividers straightforward: clear headings in `--ink`, concise descriptions in `--ink-2`, and simple rules without decorative backgrounds or oversized watermark numerals.

## SVG plates

- **Colour:** `--ink` is primary structure, `--ink-3` is secondary structure, and `--accent` marks the single element that is learned, lit, or chosen.
- **Ground:** Plates sit directly on the white slide surface, so filled zones use a light stroke or subtle tint to stay visible.
- **Icons and labels:** Phosphor icons use the course palette with `weight="duotone"` (or `regular` at small sizes). Labels use `SVG_LABEL` from `_visuals/kit.tsx`.
