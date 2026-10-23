# Official Journal: plate and page style

A deck that reads like a printed statute or official gazette: old legal-print type, numbered clauses, copper-engraving hatching and one violet official-stamp ink. Preview: [official-journal.preview.html](official-journal.preview.html).

## Look

- **Engraving, not fills.** Tone comes from line hatching, never from flat grey fills or gradients. Three tones: light (45° lines, 5-unit spacing, 0.55 stroke), mid (45°, 3-unit, 0.6), dark (cross-hatch, 3-unit, 0.7). Outlines are 1 unit in ink.
- **Paper objects.** Sheets with a folded corner and ruled lines, seals, stamps, ribbons, cartouches (a double-ruled white panel set into a hatched surface for a concept name).
- **Official-stamp ink.** The accent is violet, applied the way a rubber stamp is: a rounded double-bordered stamp with a small-caps word, slightly rotated, over the object it rules on.
- **Rules.** Double rules (3px double) under headings; a pair of hairlines as a column divider.

## Palette

| Token | Use | Hex |
|---|---|---|
| paper | page and plates | `#FFFFFF` |
| ink | outlines, headings, hatching | `#1A1714` |
| ink-2 | body | `#2A2620` |
| ink-3 | eyebrows, margin numbers, italic plate keys | `#4A443C` / `#8A8378` |
| violet (accent) | the slide's key idea, the stamp on the harmed or ruled-on case | `#5B3A8C` |

One accent only. A contrast case (granted vs denied) is drawn as an ink stamp beside a violet one.

## Type

- Headings: **IM Fell English** 400, about 30px on a slide.
- Eyebrows and plate keys: **IM Fell English SC**, letter-spaced (`Art. 1 · Section 2`).
- Plate notes: IM Fell English italic.
- Body: **Public Sans** 400/600.
- Margin clause numbers `(1)`, `(2)` in IM Fell, ink-3, before each paragraph.

## Do not

- Blue accents or Newsreader: those belong to Marketing Research & Analytics.
- Flat grey shading, drop shadows, isometric 3D.
