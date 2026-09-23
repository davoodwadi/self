# Applications of AI in Business: plate style

These rules cover every SVG figure in this course (all weeks, the landing page, anything new). Other courses have their own style files; do not bring their conventions here.

## Design system: editorial, one crimson mark

- **Palette** (defined in `(courses-ai)/globals.css`): ink `--charcoal` #1A1A1D, body `--charcoal-light` #2D2D32, the one accent `--crimson` #8B0000, a quiet secondary `--champagne` #8C7349, the ground `--surface` / `--background` (white).
- **Look:** hairlines instead of boxes, flat fills, no shadows or gradients. Crimson marks one thing per figure.
- **Type:** the `MICRO` small-caps label (`font-sans text-[10px] font-semibold uppercase tracking-[0.22em]`) for every eyebrow, axis tick and numeral; `var(--font-serif)` for display.
- **Where figures live:** inline in each week's `page.tsx`, next to the slide they illustrate. There is no `visuals.tsx`.
- **Words:** figures carry only words that already appear in the slide's sentences.
- **Invented quantities:** any shape implying a number content.md does not give carries the `Schematic` caption. When content.md gives real numbers, draw to scale and drop `Schematic`.
- **Headings:** `(courses-ai)/globals.css` sets h1–h6 outside any cascade layer, so Tailwind utilities on headings lose. Set heading type through CSS-module classes.

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
10. **Colour has one job.** `--charcoal` is neutral, `--crimson` is the one thing that is learned, lit or chosen, `--champagne` is the quiet contrast. Never use crimson for decoration.
11. **Matched elements match exactly.** The same element across panels has the same size, spacing and baseline.

### Layout inside the plate

12. **Lines never pass through other things.** A connector must not cross a product, a label or another node. Route around, or fan out. Three lines at the same height stack into one.
13. **Nothing touches an edge by accident.** Keep a clear gap between elements and box borders, the canvas edge, dividers, and between labels and lines.
14. **Arrows start at their source and end at their target.** Not near it, and not inside it.
15. **Aligned things line up.** Groups sit under what they group, step text sits above its panel, and networks are symmetric unless the asymmetry means something.
16. **No dead space.** Trim the canvas when an element is removed. Scale figures up when they are small in the frame.

### Placement on the slide

17. **Text leads its plate.** Every plate follows the sentence it illustrates. Never put two plates back to back with no text between them, or the reader attaches the second to the wrong line.
18. **Sizes.** Column figures are 400 units wide. Full-width figures are 800. Nothing may scroll sideways at 375px.

### Technical

19. **Mind the background.** Figures sit directly on the slide's `--surface`/`--background`, so an unstroked fill of that colour disappears. Stroke it, or use a light charcoal or crimson tint for filled zones, and never draw background-coloured detail on a background-coloured fill.
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
28. **How to place one.** Import named icons from `@phosphor-icons/react` and render them as nested SVGs, centred on a point: `<Megaphone x={cx - s / 2} y={cy - s / 2} size={s} weight="duotone" color="var(--crimson)" />`. Colour comes only from the palette (`var(--charcoal)`, `var(--crimson)`, `var(--champagne)`), so rule 10 still applies. Use `weight="duotone"` by default (its pale fill matches the plates' outline-plus-tint style) and `regular` below about 20 units. Keep icons at 20 units or more.
29. **One style per object across the week.** If an object is an icon on one plate, it is the same icon (same weight) on every plate of that week. Never show the same object as an icon in one place and a hand drawing in another inside one plate.
30. **Icons follow every rule above.** An icon still has to depict the sentence (rules 5–6), sit clear of lines and labels (rules 12–13) and be named in the plate's `<title>`/`aria-label` (rule 21). Include nested icon `<svg>`s in the collision checks.
