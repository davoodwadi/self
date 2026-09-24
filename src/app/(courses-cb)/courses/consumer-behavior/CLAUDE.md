# Consumer Behavior course: plate style

Every SVG plate in this course (all weeks, the landing page, anything new) is drawn in the **Editorial Sketch** style below. The reference plate is `Receipt` in `week1/visuals.tsx`: match it.

## Drawing primitives

Every line, wash and label in a plate comes from these primitives, so the whole course shares one hand. Plain `<line>`/`<rect>`/`<circle>` would break the look.

| Piece | Use it for |
|---|---|
| `SketchFrame id="sk-<plate>"` | The `<svg>` of every plate. `id` must be unique on the page; it prefixes the bleed and grain filters. Gives `<title>` + `aria-label`. |
| `InkLine pts seed` | Every real line and outline: wobbly, drawn twice so the edge looks faintly doubled. Use `closed` for shapes. |
| `PencilLine pts seed` | Absent objects and placeholders only: an empty slot, a thing taken away or not bought, a diagram placeholder. Never a person or a scene (see "Visceral, not ghosted"). |
| `Wash pts seed fill` | Each colour area: ragged edge, set off-register from the line (`dx`/`dy`). |
| `Paper pts seed` | Paper objects (receipts, cards, signs, packaging): cream fill with faint grain, drawn under their `InkLine`. |
| `SketchText` | All text: crisp, small, ink. `serif` for a title set on an object. |
| `blobPts` | Ragged ellipse points for the background wash, heads, bushes, clouds. |
| `SK` | The only colours allowed. |
| `wobble`, `seeded` | Custom hand-drawn paths and seeded variation (e.g. uneven barcode bars). |

Never use `Math.random()`. All variation comes from `seeded(n)` or a `seed` prop, so server and client render the same markup. Give every mark its own seed.

## The feel

A quick, confident sketch from a fashion or magazine illustrator: ink and watercolour on warm paper. It should feel human, calm and a little unfinished, as if drawn by hand in an afternoon rather than built in software. It is elegant but relaxed, never cute, glossy or corporate.

## Paper

- A warm off-white, like cream sketchbook paper, never pure white (`SK.paper`).
- A faint grain on paper objects (`Paper`), just visible.
- Plenty of empty paper around the subject. White space is part of the look.

## Line

- Dark brown-black ink (`SK.ink`), softer than pure black.
- Lines are thin, even and slightly wobbly. No perfectly straight edges and no perfect circles.
- Edges look faintly doubled in places (`InkLine` does this).
- Lines stay open and loose. They don't always meet neatly, and they can stop short or overshoot a little.
- Detail is suggested, not rendered: a curve for an eye, a short stroke for a mouth, a few loops for curly hair, one line for a fold in a coat.
- Line weight stays mostly uniform (about 1.3). Fine detail such as hair or texture uses a thinner line (about 0.8).

## Colour

- Colour is laid on like loose watercolour washes, **separate from the ink lines** (`Wash`, drawn before the `InkLine` of the same shape).
- Washes roughly follow each shape but don't sit perfectly inside it. They spill slightly past the lines, fall a little short, and sit a touch off-register, so paper shows through.
- Each area is one flat, slightly translucent colour: no gradients, no shading, no highlights, no drop shadows.
- Some shapes stay uncoloured, just ink on paper. Not everything needs a wash.
- Behind the main subject sits one large, pale wash (`SK.blush` behind a person or object, `SK.sky` behind glass), a ragged `blobPts` patch that spills visibly past the subject.
- A few scratchy pen strokes over a pale `SK.earth` wash suggest the ground. No full floor or background scene.

## Palette (`SK`)

Muted, earthy and warm, with one cool accent. About five colours per plate.

| Key | Use it for | Hex |
|---|---|---|
| `paper` | paper objects | `#FBF7F0` |
| `ink` | all lines and text | `#2E2624` |
| `camel` | main clothing, warm objects | `#C9955B` |
| `tan` | shadow sides, belts, trims | `#8E6232` |
| `brown` | hair, dark objects | `#4A2E22` |
| `leather` | shoes, bags, wood | `#6B3F2A` |
| `skin` | skin | `#E5B08E` |
| `teal` | the cool accent (see colour roles) | `#5E9C94` |
| `ochre` | small highlights, badges, logos | `#E8B84A` |
| `charcoal` | trousers, dark fabric | `#3E3A4A` |
| `blush` | background wash | `#F2C9B0` |
| `sky` | glass, background wash | `#BFD6DF` |
| `earth` | ground wash | `#C9B8A6` |
| `pencil` | absent objects and placeholders | `#6F7785` |

No saturated brights, no neons, no pure black, no CSS variables (`var(--signal)` etc.) inside plates.

### Colour roles

- **`teal`**: the thing chosen, bought, learned, lit or ticked (the ticks on the Receipt). Only one teal subject per plate, never decoration.
- **`ochre`** marks a small highlight, a count or a badge (the "3" on the Receipt) and the course's brand badge.
- **`pencil`** is an absent object: not bought, taken away, an empty slot, a placeholder. Never a person, a self or a feeling.
- **`sky`** as a background wash marks a hope, an ideal or a daydream; **`blush`** the here and now.
- Everything else is descriptive colour for the object itself (a camel coat, a leather bag).

## Visceral, not ghosted: people and scenes are always fully drawn

A student should *feel* the difference between two states, not decode a line style. Every person and every scene is drawn in finished ink and colour, and the difference between states is carried by things a viewer reads instantly:

- **the body**: posture and pose (slumped, arms down, against upright, hand on hip, head high; a shrug; a hand clutching the chest);
- **clothes**: a plain, muted outfit against a sharper one in a richer wash;
- **props**: what they hold or have (the product in hand, a broken heart, a cracked box);
- **the background wash**: warm `blush` for the here and now, cool `sky` for a hope, daydream or ideal.

How to apply it:

- **Ideal, aspirational, future or imagined selves** are the same Person (same face, hair and skin), upgraded: confident pose, better clothes, the product in hand, set on a `sky` wash. Never a dashed outline. Their label is ordinary ink.
- **"Rather than" or "instead of" contrasts** are two fully drawn scenes side by side, each showing its own cause and reaction (a plain faceless product that breaks, and a shrug; the brand-as-person that fails, and a broken heart). Make the stronger case the fuller, warmer one. Don't fade the weaker case into pencil.
- **Reflections** are inked too, seen through the glass (the `sky` glass wash sits over them).
- **Imagined things inside a thought cloud** are inked; the cloud already says "imagined".

### Where pencil is still right

Pencil (`PencilLine`, `SketchText fill={SK.pencil}`: light grey, dashed, uncoloured, the same drawing as the real thing, broken up) is kept for **objects that are absent or placeholders**, never for a person or a whole scene:

- the empty spot a product was taken from, or something taken away (the outline of a missing guitar);
- a thing not bought or not chosen (the unbought bag, the receipt's PRODUCT line);
- a placeholder in a diagram.

A real action on an unreal thing stays in ink (the strike-through over the pencil PRODUCT line, the X over an unbought bag). If you reach for pencil to show a feeling, an aspiration or a contrast, redraw it with pose, clothes, props and wash instead.

## People

- Realistic, slightly elongated fashion-illustration proportions: long legs, small head, elegant posture.
- Natural, relaxed poses: weight on one hip, a hand on the hip or in a pocket, the head turned.
- Faces are minimal: a few strokes for eyes, brows, nose and lips. No heavy features and no cartoon eyes.
- Hair is expressive: loops, curls or sweeping strokes with a single wash.
- Clothing reads through a few key lines (lapels, a belt, a hem) rather than full detail.
- Show a range of people: different ages, builds, skin tones and hair types. Vary skin by mixing `skin` with `camel`/`tan`/`brown` washes at different opacities.
- When people are counted or grouped (Isotype), they stay one consistent figure per week, repeated; the variety comes from hair, clothing wash and skin wash, not a new drawing each time.

## Objects and settings

- Objects use the same loose line and one flat wash each.
- Decorative objects (mirrors, frames, furniture) may have a few light flourishes.
- Keep backgrounds minimal: one background wash, a ground line and maybe a single prop.

## Text

- Avoid text where possible (rule 3 decides what text is allowed).
- When needed, keep it small, plain and in ink via `SketchText`, crisp and readable. Never run text through `wobble`.

## Simplify when converting an existing plate

- Drop tiny decorative details, repeating patterns, textures and fine ornament (e.g. a 25-bar barcode becomes ~16 loose strokes).
- Turn gradients and shadows into one flat wash, or bare paper.
- Soften hard geometric shapes so they look hand-drawn.
- Fewer, better lines beat many careful ones.
- Keep everything the plate shows and where it sits. After converting, tell the user what was dropped or simplified.

## Avoid

- Clean vector look: perfect curves, uniform geometric shapes, crisp fills.
- Gradients, glossy highlights, drop shadows, 3D shading.
- Thick cartoon outlines or bold comic styling.
- Saturated or neon colour, pure black or pure white.
- Busy backgrounds or edge-to-edge scenes.
- Colour that fits perfectly inside the lines.

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply. In this course:

- **Rule 8:** the one background wash and the ground strokes are part of the style and are exempt.
- **Rule 10:** follow the colour roles above: `teal` is what is learned, lit or chosen (one subject per plate), `ochre` is a highlight, count or badge, `pencil` is an absent object, and the other washes describe the object itself. Never use teal for decoration.
- **Rule 16:** empty paper *around* the subject is part of the look; trim only canvas that holds nothing at all.
- **Rule 19:** plates bring their own palette: never use `--paper-2`/`--paper-3` or any CSS variable inside a plate. A plate in a `figure-well` must still read, so give it a background wash, and never draw cream detail on a cream fill.
- **Rule 20:** `wobble` already rounds; round anything else yourself, and never use `Math.random()`.
- **Rule 22:** check each plate against the style checklist below as well.
- **Rule 28:** prefer drawing the object by hand with `InkLine` + `Wash`; the style depends on it. Use an icon only when a hand drawing would be misread, with `weight="light"` and `color={SK.ink}`, plus a `Wash` behind it for colour. Never `duotone`. Colour comes only from `SK`.

## Style checklist (with rules 22–24)

Render it, screenshot it at full size one plate at a time, and ask:

- Does it look drawn by hand with pen and watercolour, not generated in software?
- Is everything from the original still there and recognisable, in the same place?
- Does the colour sit loosely under the lines, with some paper showing?
- Is every person and scene fully inked and coloured, with the difference between states shown by pose, clothes, props and wash (pencil only for absent objects)?
- Is there enough empty paper around the subject, and does the background wash show past it?
- Does it sit comfortably next to the Week 1 Receipt?
