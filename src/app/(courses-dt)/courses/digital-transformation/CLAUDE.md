# Digital Transformation: plate style

These rules cover every SVG plate in this course (all weeks, anything new). Other courses have their own style files; do not bring their conventions here.

The course takes only the **look and feel** of the Flat Silhouette style below. What gets drawn, where it sits and what text is allowed are decided by the SVG rules further down, and they win wherever the two could disagree.

## Look: Flat Silhouette

A bold, quiet poster: solid black silhouettes on warm cream, a red accent, and framed screens for anything digital. It borrows from mid-century and Swiss poster design: confident shapes and lots of empty space. It should feel considered and hand-designed, like a printed poster, not like generic stock illustration.

### Palette

Deep, muted poster inks on warm cream, like colours printed on paper: calm to look at and comfortable to read at any size. Each accent sits at 5:1 contrast or more against cream, so red or blue text reads as easily as black, and cream text reads on a red shape. The same values colour the plates and the page around them (kickers, numerals, rules, the section marker), so the deck stays one palette. Every fill is flat.

| Constant | Colour | Use | Hex | Contrast on cream |
|---|---|---|---|---|
| `CREAM` | Warm cream | plate and page background, gaps between shapes, badges, text on a coloured shape | `#F1EADB` | — |
| `INK` | Warm black | silhouettes, frames, rules, text | `#1D1B1A` | 14.3:1 |
| `SKIN` | Pale beige | visible skin | `#DCCFB8` | — |
| `SIGNAL` | Brick red | what is learned, lit or chosen (rule 10) | `#A63A2C` | 5.4:1 |
| `COUNTER` | Deep blue | the contrast (rule 10) | `#1F5FAF` | 5.3:1 |
| `COUNTER_FILL` | Pale blue | fill for a contrast zone | `#CFDDF0` | — |

When a new colour value is needed, choose a deep, slightly muted tone in the same family and check it reaches 5:1 on cream before using it.

No gradients, shading, shadows, highlights, textures, grain, halftone or noise anywhere.

### Background

- Flat warm cream across the whole plate.
- No scenery: no rooms, floors, skies or furniture unless the sentence needs that one object.
- Generous plain cream around the subject.

### Silhouettes

- Each figure or object is one strong, solid black shape, recognisable from its outline alone.
- No outline strokes and no inner lines on black shapes.
- Pick poses and angles that give the clearest outline: profiles, turned heads, raised arms, clear gaps between limbs and body.
- Where two black shapes overlap (an arm across a body, a hand over an object), separate them with a thin cream gap: give the front shape a cream stroke of about 3 units.
- Smooth, deliberate shapes: clean curves, crisp corners, no wobble or sketchiness.

### People

- Hair, clothing and limbs are solid black.
- Visible skin (face, neck) is flat pale beige, edged with one thin black line so the profile stays sharp.
- Faces are minimal: an almond-shaped eye at most; the nose and lips exist only as the profile edge. No mouths, cheeks or shading.
- Hair is one bold shape (a bob, a bun, a crop) that helps identify the person.
- Show a range of people through silhouette alone: hairstyles, head coverings, body shapes, posture, clothing outlines.

### The digital version

Anything digital (a digitized record, an online business, a digital initiative, a system) is shown **on a screen**:

- the thing itself is the same **solid black silhouette** used for the physical version (same path, same glyph), so the viewer connects the two at once;
- it sits inside a **framed screen**: a heavy black rule, a thin inner rule set just inside, and a short black stand (neck and base). The screen is what says "digital";
- centre the glyph in the screen's inner area with clear cream on every side (rule 13); scale the glyph and keep the frame's rule weights fixed, so every screen in a plate reads as the same object (rule 11);
- several digital things are several identical screens, one glyph each (rule 7), with clear space between one screen's stand and the next screen;
- a physical-to-digital change is the black silhouette on cream, an arrow, then the same silhouette on a screen.

Solid black on cream (physical) against the same solid black on a screen (digital) is the core of the look. Keep it identical on every plate.

### Frames and small marks

- Frames (mirrors, screens, windows, panels) are heavy black rules, like a printed border, with a thin inner rule set just inside.
- Corners may carry a small solid black diamond, the only ornament.
- Small marks are simple geometry (circles, stars, arrows, short rules) in solid black or red, or cream on a coloured shape.
- Badges and logos are generic: a cream circle with a simple black mark such as a star. No real brands.

### Type

Text follows rule 3. When text is allowed, write it in sentence case, as it appears in the source ("Digital transformation", "Digitize information"), in INK or SIGNAL, or CREAM on a coloured shape:

- headings and stage or group names: bold display serif (`var(--font-heading)`, weight 700), about 20 units;
- names set on a shape (a step, a bar, a block): the reading serif (`var(--font-body)`, weight 600), about 15–17 units;
- lines of a two-line label about 1.4× the font size apart, so descenders clear the line below.

### Avoid

- Textures, grain, halftone, noise, gradients, drop shadows, 3D shading.
- Outline-style drawing, sketchy lines, hand-drawn wobble.
- Detailed faces, facial expressions, fingers, fabric folds.
- Colours outside the palette.
- Busy backgrounds, decorative clutter, real logos or brand names.

### Look checklist (with rules 22–24)

- Can you recognise every person and object from its silhouette alone?
- Are all fills flat, with no texture or gradient anywhere?
- Is every digital element a solid black glyph inside a framed screen, clearly the same shape as its physical version?
- Is there plenty of empty cream around the subject?
- Does it sit in a set with the course's other plates?

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
8. **Cut anything that doesn't carry meaning.** Crumbs, a floating star, a loop arrow that returns nowhere, a slash over faded marks: if you cannot say what an element means, delete it. Simpler beats cleverer.

### Consistency

9. **Fixed cast per week.** One symbol per idea, reused on every plate (one brand badge, one heart for feeling, one Person glyph for every human). Never switch vocabulary inside a figure (dots in one memory store, blocks in the next).
10. **Colour has one job.** INK (black) is neutral, SIGNAL (red) is what is learned, lit or chosen, COUNTER (blue, with its pale blue fill) is the contrast. Digital is shown by a screen frame. Never use SIGNAL for decoration.
11. **Matched elements match exactly.** The same element across panels has the same size, spacing and baseline.

### Layout inside the plate

12. **Lines never pass through other things.** A connector must not cross a product, a label or another node. Route around, or fan out. Three lines at the same height stack into one.
13. **Nothing touches an edge by accident.** Keep a clear gap between elements and box borders, the canvas edge, dividers, and between labels and lines.
14. **Arrows start at their source and end at their target.** Not near it, and not inside it.
15. **Aligned things line up.** Groups sit under what they group, step text sits above its panel, and networks are symmetric unless the asymmetry means something.
16. **No dead space.** Trim the canvas when an element is removed. Scale figures up when they are small in the frame.

### Placement on the slide

17. **Text leads its plate.** Every plate follows the sentence it illustrates. Never put two plates back to back with no text between them, or the reader attaches the second to the wrong line.
18. **Sizes.** Column plates are 400 units wide in plain wells. Full-width figures are 800. Nothing may scroll sideways at 375px.

### Technical

19. **Mind the background.** Plates are filled cream, so an unstroked cream fill disappears. Put filled zones in pale blue, pale beige or black, and never draw cream detail on a cream fill (cream is only for gaps and badges on a coloured shape).
20. **Round every computed coordinate** to 2 decimals, so server and client render identical markup.
21. **Every plate has a `<title>` and an `aria-label`** that describe what is drawn, updated whenever the drawing changes.

### Verification

22. **HARD RULE: verify each graphic visually, one at a time, before making the next.** After writing or changing a plate, render it and take a screenshot of it at full size (never only a thumbnail or a gallery overview). Check it against every rule above, fix what is wrong, and screenshot again until it passes, or remove it (rule 1). Only then start the next graphic. Do not batch several plates and review them at the end. Code review, reading the SVG source, and automated checks do not replace the screenshot.
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
28. **How to place one.** Import named icons from `@phosphor-icons/react` and render them as nested SVGs, centred on a point: `<Megaphone x={cx - s / 2} y={cy - s / 2} size={s} weight="fill" color={INK} />`. Colour comes only from the palette constants (INK, SIGNAL, COUNTER), so rule 10 still applies. Use `weight="fill"` so icons read as solid silhouettes like everything else in the plate. Keep icons at 20 units or more.
29. **One style per object across the week.** If an object is an icon on one plate, it is the same icon (same weight) on every plate of that week. Never show the same object as an icon in one place and a hand drawing in another inside one plate.
30. **Icons follow every rule above.** An icon still has to depict the sentence (rules 5–6), sit clear of lines and labels (rules 12–13) and be named in the plate's `<title>`/`aria-label` (rule 21). Include nested icon `<svg>`s in the collision checks.
