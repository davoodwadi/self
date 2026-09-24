# Digital Transformation: plate style

These rules cover every SVG plate in this course (all weeks, anything new).

The course takes only the **look and feel** of the Flat Silhouette style below. What gets drawn, where it sits and what text is allowed are decided by the SVG rules in the root `CLAUDE.md`, and they win wherever the two could disagree.

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

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply. In this course:

- **Rule 10:** INK (black) is neutral, SIGNAL (red) is what is learned, lit or chosen, COUNTER (blue, with its pale blue fill) is the contrast. Digital is shown by a screen frame. Never use SIGNAL for decoration.
- **Rule 19:** plates are filled cream, so an unstroked cream fill disappears. Put filled zones in pale blue, pale beige or black, and never draw cream detail on a cream fill (cream is only for gaps and badges on a coloured shape).
- **Rule 28:** colour comes only from the palette constants (INK, SIGNAL, COUNTER). Use `weight="fill"` so icons read as solid silhouettes like everything else in the plate.
