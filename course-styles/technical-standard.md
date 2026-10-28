# Technical standard: plate and page style

A deck that reads like an industrial standard: DIN-style condensed type, clause numbering, and pictograms built on one strict stroke system, with ISO safety-sign colours as the two meanings. Preview: [technical-standard.preview.html](technical-standard.preview.html).

## Look

- **One stroke system.** Every pictogram is built from a few fixed weights: 11 (torso), 8 (legs), 7 (arms), 6 (shafts), 5 (ground lines), 4 (object outlines), 3.5 (text lines on objects). Round caps and joins everywhere. Heads are solid circles of r 9. This consistency is what keeps the pictograms from looking like clip art. Never mix in a stroke weight outside the system.
- **Solid black for machines and rules.** A system or rule is a solid ink block with rounded corners (r 6) and its name reversed out in white condensed caps.
- **Documents** are white with a folded corner and two rounded text lines.
- **Signs carry the verdict.** Outcomes are ISO sign forms placed at the lower-right of the object they judge: a red prohibition circle with diagonal bar for harm or refusal, a green rounded square with a white check for the safe or protected outcome.
- Column dividers are a solid 3-unit ink bar.

## Palette

| Token | Use | Hex |
|---|---|---|
| paper | page | `#F2F2EF` |
| ink | pictograms, headings, rule blocks | `#1B1B1B` |
| ink-2 | body | `#222222` |
| red (prohibition) | harm, refusal, violation. The slide's key idea | `#C1272D` |
| green (safe condition) | protected right, compliant outcome | `#00804A` |

The two colours always keep their sign meanings. Never use them decoratively.

## Type

- Headings: **Barlow Condensed** 600, uppercase, about 30px.
- Eyebrow: Barlow Condensed 600 in a 2px ink box (`CLAUSE 1.2`).
- Plate keys: Barlow Condensed 600, uppercase, tracked 1.2.
- Body: **Barlow** 400/600.

## Do not

- Generic bold-sans-and-red posters (the failed first draft): the stroke system and sign forms are what make the style.
- Gradients, shadows, 3D.
