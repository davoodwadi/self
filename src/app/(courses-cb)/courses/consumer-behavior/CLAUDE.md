# Consumer Behavior course: plate style

Every SVG plate in this course (all weeks, the landing page, anything new) is drawn in the **Editorial Sketch** style below. The reference plate is `Receipt` in `week1/visuals.tsx`: match it.

Other courses have their own style files; do not bring their conventions (INK/SIGNAL/COUNTER, flat fills, `--paper-2` wells, duotone icons) here.

## Build every plate from the shared kit

Import from `../_sketch/sketch.tsx`. Do not re-implement these, and do not draw plates with plain `<line>`/`<rect>`/`<circle>` or the old flat `Frame`/`Key`/`INK`/`SIGNAL` helpers.

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

## SVG rules

### Meaning

1. **No drawing beats a bad drawing.** If a plate does not work after an honest attempt to fix it, remove it. A slide with only its text is better than a slide with a confusing picture.
2. **Self-evident, or redraw it.** A student must understand the plate from the drawing and the sentence beside it. If it needs a caption, legend or explanation, it has failed (see rule 1).
3. **Never label an object with its own name.** No BELL, DOG, AD, MUSIC beside the thing drawn. Text inside an SVG is allowed only for:
   - a concept or stage name from the slide (WEAR-OUT, CONDITIONED RESPONSE);
   - a quantity or time span (ABOUT 20 SECONDS);
   - a distinction the picture cannot make (NATIONAL BRAND vs STORE BRAND on look-alike boxes);
   - text that is part of the object (a price tag's −10%, a wordmark on a package).
4. **Label in place, not in a legend.** Put a label next to an example of the thing, not in a key row the eye has to decode.
5. **Draw the thing, not an abstraction of it.** If a chart shows what people bought, draw the products, not grey dots.
6. **Depict the verb in the sentence.** "Watch a friend *buy*" needs a purchase cue (a bag, a counter), not a friend holding a shoe.
7. **One example per scene.** When a sentence gives alternatives ("an ad *or* a friend"), draw separate small scenes. Don't merge them into one picture.
8. **Cut anything that doesn't carry meaning.** Crumbs, a floating star, a loop arrow that returns nowhere, a slash over faded marks: if you cannot say what an element means, delete it. Simpler beats cleverer. The one background wash and the ground strokes are part of the style and are exempt.

### Consistency

9. **Fixed cast per week.** One symbol per idea, reused on every plate (one brand badge, one heart for feeling, one Person glyph for every human). Never switch vocabulary inside a figure (dots in one memory store, blocks in the next).
10. **Colour has one job.** Follow the colour roles above: `teal` is what is learned, lit or chosen (one subject per plate), `ochre` is a highlight, count or badge, `pencil` is an absent object, and the other washes describe the object itself. Never use teal for decoration.
11. **Matched elements match exactly.** The same element across panels has the same size, spacing and baseline.

### Layout inside the plate

12. **Lines never pass through other things.** A connector must not cross a product, a label or another node. Route around, or fan out. Three lines at the same height stack into one.
13. **Nothing touches an edge by accident.** Keep a clear gap between elements and box borders, the canvas edge, dividers, and between labels and lines.
14. **Arrows start at their source and end at their target.** Not near it, and not inside it.
15. **Aligned things line up.** Groups sit under what they group, step text sits above its panel, and networks are symmetric unless the asymmetry means something.
16. **No dead space.** Empty paper *around* the subject is part of the look, but trim canvas that holds nothing at all. Scale figures up when they are small in the frame.

### Placement on the slide

17. **Text leads its plate.** Every plate follows the sentence it illustrates. Never put two plates back to back with no text between them, or the reader attaches the second to the wrong line.
18. **Sizes.** Column plates are 400 units wide in plain wells. Full-width figures are 800. Nothing may scroll sideways at 375px.

### Technical

19. **Mind the background.** Plates bring their own palette: never use `--paper-2`/`--paper-3` or any CSS variable inside a plate. A plate in a `figure-well` must still read, so give it a background wash, and never draw cream detail on a cream fill.
20. **Round every computed coordinate** to 2 decimals, so server and client render identical markup. `wobble` already rounds; round anything else yourself, and never use `Math.random()`.
21. **Every plate has a `<title>` and an `aria-label`** that describe what is drawn, updated whenever the drawing changes.

### Verification

22. **HARD RULE: verify each graphic visually, one at a time, before making the next.** After writing or changing a plate, render it and take a screenshot of it at full size (never only a thumbnail or a gallery overview). Check it against every rule above and the style checklist below, fix what is wrong, and screenshot again until it passes, or remove it (rule 1). Only then start the next graphic. Do not batch several plates and review them at the end. Code review, reading the SVG source, and automated checks do not replace the screenshot.
23. **Run the automated checks:** text bounding boxes against the viewBox (overflow), pairwise label overlap, a DOM walk for plate-after-plate runs, and the verbatim content check.
24. **Wait for the reload before judging a screenshot.** A stale frame looks like a bug.

### Icons (Phosphor)

`@phosphor-icons/react` is installed for use **inside** SVG plates. Lucide (`lucide-react`) stays for UI chrome (buttons, navigation) and is never used in plates.

25. **An icon is a noun, never the plate.** Use a Phosphor icon only to stand for a single, recognisable object inside a hand-built diagram: a megaphone, share arrow, chat bubbles, envelope, gear, lightbulb, eye, lock, shield, shopping bag or cart, clock, graduation cap, globe, buildings, TV, radio, newspaper, a product (mug, sneaker, watch), sentiment faces, a cursor, a check badge. The structure of the diagram (hubs, spokes, Venns, stairs, forks, timelines, arrows) is always drawn by hand.
26. **Reach for an icon when a hand-drawn glyph is hard to recognise.** If the object is a standard symbol and your drawing could be mistaken for something else (a "wrench" that reads as a magnifier, a "guitar" that reads as a stick), use the icon. If a simple hand-drawn shape already reads clearly, keep it; don't swap for the sake of it.
27. **Never use an icon for:**
    - the week's **Person** glyph: people are repeated to show counts, scaled and tinted by segment (Isotype), so they stay our own glyph;
    - the **brand badge** or any other course-specific symbol that carries a taught meaning;
    - anything whose **shape encodes data**: coin stacks, bars, curves, axes, dot fields, gauges, scales;
    - **containers that hold other marks**: speech bubbles with text lines, browser windows or phones showing content, results pages, posts, inboxes;
    - **labels**: text stays live SVG text from the slide.
28. **How to place one.** Import named icons from `@phosphor-icons/react` and render them as nested SVGs, centred on a point: `<Megaphone x={cx - s / 2} y={cy - s / 2} size={s} weight="light" color={SK.ink} />`. Colour comes only from `SK`, so rule 10 still applies. In this course, prefer drawing the object by hand with `InkLine` + `Wash`; the style depends on it. Use an icon only when a hand drawing would be misread, with `weight="light"` and `color={SK.ink}`, plus a `Wash` behind it for colour. Never `duotone`. Keep icons at 20 units or more.
29. **One style per object across the week.** If an object is an icon on one plate, it is the same icon (same weight) on every plate of that week. Never show the same object as an icon in one place and a hand drawing in another inside one plate.
30. **Icons follow every rule above.** An icon still has to depict the sentence (rules 5–6), sit clear of lines and labels (rules 12–13) and be named in the plate's `<title>`/`aria-label` (rule 21). Include nested icon `<svg>`s in the collision checks.

## Style checklist (with rules 22–24)

Render it, screenshot it at full size one plate at a time, and ask:

- Does it look drawn by hand with pen and watercolour, not generated in software?
- Is everything from the original still there and recognisable, in the same place?
- Does the colour sit loosely under the lines, with some paper showing?
- Is every person and scene fully inked and coloured, with the difference between states shown by pose, clothes, props and wash (pencil only for absent objects)?
- Is there enough empty paper around the subject, and does the background wash show past it?
- Does it sit comfortably next to the Week 1 Receipt?

The Browser pane can't zoom into a region: to see a plate at full size, clone its `<svg>` into a fixed full-screen overlay with `javascript_tool`, screenshot, then remove the overlay. Pages fade in with GSAP, so wait about 7 s after a reload before judging.
