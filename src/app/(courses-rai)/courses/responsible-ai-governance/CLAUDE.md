# Responsible AI & Algorithmic Governance: plate style

Every SVG plate in this course is a **patent drawing**: the algorithm, the rule or the market is drawn as an invention on file, so students can inspect how it works and where it fails. Fine black line work on white, shading by stipple, oblique projection, Caslon type, and one examiner's red for the finding.

The reference plate is the Week 1 "Why market algorithms require governance" plate as previewed in the style round (one hand stamp in the first figure; one rule bar pressing five cards in the second, four stippled red). Match its line weights, stipple densities and type.

The style is a medium, not a scene template: each plate is invented for its sentence, and a week mixes many kinds of drawing.

## Look: Patent drawing

- **Line, not fill.** Outlines are `LINE.outline` (0.9) in `PAT.ink`; text lines on documents and hidden or secondary detail are `LINE.hair` (0.6); a part under stress or in motion may take `LINE.bold` (1.3). Line ends and joins are round.
- **Tone by stipple.** Shading comes only from the dot patterns in `PatentDefs`: `light` on top faces, `dense` on side faces and cast shadows, white on front faces. No grey fills, gradients or shadows.
- **Oblique projection.** Solids are drawn with a white front face and the depth running up and to the right (`ObliqueBox`, default `dx 10, dy 6`). Flat objects lying down (cards, forms, maps) are parallelograms with a thin stippled edge. Cylinders get ellipse caps.
- **Hidden and moving parts.** Hidden edges are dashed hairlines; a path of motion or a drop (a stamp coming down, a value flowing) is a centre line (`CENTRE_DASH`) or a short dashed hairline. Cutaways show an internal mechanism by drawing the housing's front face open with a broken edge (a zig-zag break line), as in a patent section.
- **Figure names.** When a plate sets two or more figures side by side, each is identified by its name alone, set with `<FigureName>` underneath: a concept or quantity from the slide in Caslon italic (`thousands of decisions per second`). Figure names name a concept; they never explain the drawing (root rule 2).
- **Keys.** Concept names set on or beside a part use `PatentKey` (Caslon capitals, tracked 0.22em). A concept name set into a solid sits on its white front face.
- **People.** When the body carries the idea, draw people as patent figures: clean outline, no skin-tone fills, stipple for clothing shade, hands and tools drawn in the same line.

## Palette (`PAT` in `_visuals/kit.tsx`, tokens in `(courses-rai)/globals.css`)

| Constant | Role | Hex |
|---|---|---|
| `paper` | The sheet: page, plates, front faces | `#FFFFFF` |
| `ink` | Every outline, stipple dot, key and figure name | `#141414` |
| `ink3` | Secondary notes on the page (not in plates) | `#666666` |
| `signal` | Examiner's red: the finding (the harm, disparity, fault or trap), one subject per plate | `#B8321F` |
| `counter` | Rare second ink: the protected right or fair benchmark, only when the plate shows a contrast students must see | `#1F5747` |

A red finding is drawn in red line and/or red stipple (`stip(id, "signal")`); it never becomes a solid red block.

## Type

- Headings and display: **Libre Caslon Text** 400 (`--font-heading`), italic for figure names.
- Body and labels: **Libre Franklin** (`--font-body`).
- Inside plates and their controls everything is Caslon, weight 400: keys and any word printed on a drawn object (a badge, a sign, a stamp) are `PatentKey` capitals at 0.22em tracking; numerals and quantities are plain Caslon; figure names are Caslon italic. No sans and no bold in a plate.
- Size by what students see, not by viewBox units: measured at 1440×900 after `FitSlides` has run, keys and object words read at 11–13px, figure names at 12–15px, and quantities larger. A column plate renders far smaller than a full-width one, so the same idea needs bigger units there. When a slide shrinks its plates to fit, give the slide more room (a side-by-side layout, a shorter plate) rather than smaller type.
- The controls under a plate (`Segmented`, `Slider`, `PlateButton`) use the same Caslon tracked capitals in ink; their labels are terms from the slide.

## Visual variety across a week

Vary the camera distance, subject and drawing grammar so neighbouring slides feel different:

1. **A single mechanism, close up:** a threshold blade, a balance, a valve, a gauge, an interlock, a magnifier over a record.
2. **Exploded views:** a system or document stack pulled apart along centre lines so each layer can be seen (training data, weights, guardrails, sign-off).
3. **Documents and records:** forms, dossiers, stamps, redactions, contract clauses, model cards, drawn as paper objects in oblique projection.
4. **Data as an instrument:** distributions, error rates, calibration and disparity drawn as physical charts, trays or scales with stippled volumes.
5. **Sections and plans:** a street grid, a jurisdiction map, a supply chain or a deployment in plan or cross-section.
6. **Scenes with people:** used when the sentence stages actors meeting, and kept to a few per week.

## Shared pieces (`_visuals/kit.tsx`, `_visuals/objects.tsx`)

| Piece | Use it for |
|---|---|
| `Frame` | The `<svg>` of every plate (`role="img"`, `<title>` + `aria-label`). Column plates `width={400}`, full-width `width={800}`. |
| `PatentDefs id` | The stipple patterns; render once inside each plate with an id unique on the page. |
| `stip(id, tone)` | Fill for a stippled face: `light`, `dense`, `signal`, `counter`. |
| `ObliqueBox` | Any rectangular solid: a housing, a rule bar, a block, a plinth, a stamp body. |
| `FigureName` | The concept under each figure of a multi-figure plate (no numbering). |
| `PatentKey` | Concept names set on a part. |
| `PAT`, `LINE`, `CENTRE_DASH` | Palette, line weights, centre-line dash. |

New objects are drawn in the week's `visuals.tsx` and move to `_visuals/objects.tsx` when a second week needs them.

## Style checklist (with root rules 22–24)

Render each plate, screenshot it at full size, and check:

- **Line and stipple:** only ink outlines at the three weights and stipple tone; no grey or flat fills.
- **Type:** every label in Caslon at the sizes above, measured on the rendered slide.
- **Projection:** solids share one oblique direction and depth within the plate; front faces white.
- **One finding:** red marks one subject, as line or stipple.
- **Variety:** a different kind of drawing from the plates before and after it.
- **Self-evident:** the drawing and its sentence make the point without a caption; figure names name, never explain.

## Avoid

- Isometric three-tone shading, glass cubes and tabletop slabs (the previous style).
- Watercolour or wobbly sketch lines (Consumer Behavior), solid black silhouettes (Digital Transformation), blue accents and Newsreader (Marketing Research & Analytics).
- Box-and-arrow flowcharts or text-filled badges inside plates.

## Course notes on the SVG rules

- **Rule 10:** `PAT.signal` marks the finding; `PAT.counter` only for a contrast students must see; everything else is ink on white.
- **Rule 12:** Plunger shafts, leader lines and centre lines stop at a part's outline; they never cross another part.
- **Rule 19:** Plates sit on white (`figure-well` is white with a hairline border). Every white face is outlined in ink so it reads against the sheet.
- **Rule 20:** Round every computed coordinate with `r2(n)`.
- **Rule 28:** Prefer drawn objects. If a Phosphor icon is used, use `weight="light"` in `PAT.ink` (or `PAT.signal` for the finding), 24–32 units, so it matches the fine line work.
