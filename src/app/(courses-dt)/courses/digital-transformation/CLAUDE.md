# Digital Transformation: design and plate style

These rules govern the course landing page, every weekly slide deck, and every SVG plate in this course.

## Design system, colours, and typography

The course uses a clean, straightforward academic sans-serif design system paired with Flat Silhouette SVG plates, avoiding ornate editorial flourishes and AI-generated visual tropes. Only `Source Sans 3` (`--font-source-sans`) is loaded in `(courses-dt)/layout.tsx`, and `--font-sans` in `(courses-dt)/globals.css` resolves to `var(--font-source-sans), ui-sans-serif, system-ui, -apple-system, sans-serif`. All headings, body copy, callouts, discussion prompts, exercises, and diagram labels are set in upright sans-serif. Never use display serifs, italic callout or discussion prompts, decorative small-caps tracking, rotated diamond ornaments, or heavy double-bordered frames around slides or plates.

## Look: Flat Silhouette

A bold, quiet plate style: solid black silhouettes on white, a red accent (optional), and framed screens for anything digital.

### Palette

| Constant | Colour | Use | Hex | Contrast on white |
|---|---|---|---|---|
| `WHITE` | White | plate and page background, gaps between shapes, badges, text on a coloured shape | `#FFFFFE` | : |
| `INK` | Warm black | silhouettes, frames, rules, text | `#1D1B1A` | 17.2:1 |
| `SKIN` | Pale beige | visible skin | `#D7C9B1` | : |
| `SIGNAL` | Brick red | what is learned, lit or chosen (rule 10) | `#A63A2C` | 6.2:1 |
| `COUNTER` | Deep blue | the contrast (rule 10) | `#1F5FAF` | 6.1:1 |
| `COUNTER_FILL` | Pale blue | fill for a contrast zone | `#CFDDF0` | : |

No gradients, shading, shadows, highlights, textures, grain, halftone or noise anywhere.

### Background

- Clean white across the whole plate and slide surface, separated by quiet hairlines (`border-[var(--dt-ink)]/12` or `border-[var(--dt-ink)]/15`).
- No decorative outer frames or corner diamonds around plates.
- Generous empty space around the subject.

### Silhouettes

- Each figure or object is one strong, solid black shape, recognisable from its outline alone.
- No outline strokes and no inner lines on black shapes.
- Pick poses and angles that give the clearest outline: profiles, turned heads, raised arms, clear gaps between limbs and body.
- Where two black shapes overlap (an arm across a body, a hand over an object), separate them with a thin gap of about 3 units.
- Smooth, deliberate shapes: clean curves, crisp corners, no wobble or sketchiness.

### People

- Hair, clothing and limbs are solid black.
- Visible skin (face, neck) is flat pale beige, edged with one thin black line so the profile stays sharp.
- Faces are minimal: an almond-shaped eye at most. The nose and lips exist only as the profile edge. No mouths, cheeks or shading.
- Hair is one bold shape (a bob, a bun, a crop) that helps identify the person.
- Show a range of people through silhouette alone: hairstyles, head coverings, body shapes, posture, clothing outlines.

### The digital version

Anything digital (a digitized record, an online business, a digital initiative, a system) is shown **on a screen**:

- the thing itself is the same **solid black silhouette** used for the physical version (same path, same glyph), so the viewer connects the two at once.
- it sits inside a **framed screen** (`Monitor` or `MiniScreen`): a clean `1.5px` hairline rectangle with a subtle surface tint (`fillOpacity={0.03}`, `strokeOpacity={0.35}`).
- centre the glyph in the screen's inner area with clear space on every side (rule 13). Scale the glyph and keep the frame's rule weights fixed, so every screen in a plate reads as the same object (rule 11).
- several digital things are several identical screens, one glyph each (rule 7), with clear space between screens.
- a physical-to-digital change is the black silhouette, an arrow, then the same silhouette on a screen.

### Slide structure and text colour

- Weekly title slides, chapter dividers (`ChapterBand`), content slides (`Slide`), discussion slides (`DiscussionSlide`, `DiscussionList`), and conclusions (`Summary`) use left-aligned upright sans-serif headings and hairlines without full-bleed inverted black backgrounds, giant display numerals, or double borders.
- Text inside a plate follows rule 3 and uses upright `var(--font-sans)` in neutral `INK` (`fill={INK}`):
  - headings and stage or group names: weight 600 or 700, about 18 to 20 units, `fill={INK}`.
  - names set on a shape (a step, a bar, a block): weight 600, about 14 to 16 units, `fill={INK}`.
- **Never colour slide text or SVG `<text>` labels in `SIGNAL` red or `COUNTER` blue.** Build hierarchy on the slide and inside plates with type and space: font size, bold `INK` (`<strong>` in `var(--font-sans)`), hairlines and white space. Keep headings, subheadings, defined terms, list numerals, card/tab borders, card/tab background tints, and all SVG `<text>` labels in `INK`. Reserve `SIGNAL` strictly for the focal glyph, icon, bar, or curve inside the diagram.

### Avoid

- Textures, grain, halftone, noise, gradients, drop shadows, 3D shading.
- Display serifs, italic callouts, tracked uppercase eyebrow labels, rotated diamond bullets or corner ornaments, and heavy double borders.
- Full-bleed inverted black chapter or takeaway boxes and oversized display numerals.
- Overusing `SIGNAL` red on slide text, headings, numerals or rules.

### Look checklist (with rules 22 to 24)

- Can you recognise every person and object from its silhouette alone?
- Are all fills flat, with no texture or gradient anywhere?
- Is every digital element a solid black glyph inside a framed screen, clearly the same shape as its physical version?
- Is there plenty of empty white space around the subject?
- Does it sit in a set with the course's other plates?

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply. In this course:

- **Rule 10:** INK (black) is neutral, SIGNAL (red) is what is learned, lit or chosen, COUNTER (blue, with its pale blue fill) is the contrast. Digital is shown by a screen frame. Never use SIGNAL for decoration.
- **Rule 19:** plates sit on a white ground (`WHITE`), so an unstroked white fill disappears. Put filled zones in pale blue, pale beige, or a tinted hairline box, and never draw white detail on a white fill (`WHITE` is only for gaps and cutouts inside a solid shape).
- **Rule 28:** colour comes only from the palette constants (INK, SIGNAL, COUNTER). Use `weight="fill"` so icons read as solid silhouettes like everything else in the plate.
