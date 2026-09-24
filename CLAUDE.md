# Creating the slides page.tsx

You should never change the words or sentences of the content.md
The content should be preserved.
You only can create the slides **using** the content. 

# Exercise rules

A topic tagged `[exercise]` in content.md gets one exercise; a topic tagged `[no-exercise]` gets none.

Exercises come after the topic they test has been introduced in the content.

Only test information students have already learned. Never test something they haven't been taught yet.

## Choosing the exercise

For each `[exercise]` topic, pick the one exercise type that best fits what that topic teaches. Let the shape of the content decide, and prefer the type that makes students use the idea rather than recall a sentence. Choose from the types that are built:

- **Quiz** (`quiz`): a multiple-choice question. Best for applying one idea to a new case or scenario.
- **Match-up** (`match`): pair each term with its example or definition. Best for a set of named parts (roles, bases, types).
- **Sort into groups** (`sort`): place cards into two or three groups. Best for a distinction (need or want, customer or consumer) or for assigning moments to stages.
- **Put it in order** (`order`): arrange steps or events into a sequence. Best for a process or a timeline, especially one with four or more steps.
- **Which one is it?** (`identify`): a run of short cases, each named with one concept from a shared set. Best for telling several look-alike concepts apart in real situations.

Choose by fit, not by rotation. Variety across a week is welcome when several types suit the content equally well. Cases, cards and examples should be new everyday situations that apply what the slide taught, so students recognise the idea rather than repeat the slide's sentences.

These types are planned but not built yet, so leave them for now: **spot it in the scene** (tap the parts of a drawing that show the concept), **place it on a scale** (set an item between two poles and compare with the class) and **class poll** (everyone answers and the results appear together).

## Where exercises live

Each week keeps its exercises in `exercises.json` beside its `page.tsx`, one entry per `[exercise]` topic, keyed by the slide's `id`. The data shape of every type is defined in `src/lib/course-exercise.ts`, and the shared components in `src/components/exercises/` render them. A slide shows its exercise with `exercise={exercise["<slide-id>"]}`, and it appears on its own screen right after that slide. These components serve every course through the shared `Slide`; courses with their own slide components keep their quizzes until they move to the shared ones.

# Slide density

Each topic in content.md should read as one slide, not a scroll of screens. Keep slides content dense: every visual has to earn its space, and related ideas belong together, not spread out. How to achieve that is a design choice, slide by slide. Never cut or reword content to make a slide fit.

# Slide height

Every slide (the title or hero, section and chapter openers, content slides, discussion and exercise slides, and the summary) fits one screen: `min-h-svh` on its section, with the content centred vertically (`flex flex-col justify-center`), and the next slide starts on a fresh screen. Exercise screens start from a fixed top instead of being centred, so the prompt and the answer areas stay still while students work.

Lay each slide out to fit a 1440×900 screen at full size. `FitSlides` (`src/components/slide-components/FitSlides.tsx`) adapts it to other screens: drawings and images shrink first, then the whole slide zooms, down to 60%. Every course layout renders `<FitSlides />`, and every slide section carries `data-slide`. Visuals are `svg[role=img]` or `img` so they can shrink. A slide that still runs past the screen holds too much for one screen and gets a density pass.

# Visual style

Each course keeps its own drawing and style rules in a `CLAUDE.md` inside its folder (for example `src/app/(courses-cb)/courses/consumer-behavior/CLAUDE.md`). Follow the file for the course you are working on, and never carry one course's style into another.

# Shared pieces: reuse first, then share what you build

Every course keeps the pieces its weeks build with in a `_visuals/` folder inside the course, split the same way in every course:

- `_visuals/kit.tsx`: what everything is built with: the palette and type, the plate frame and label helpers, drawing primitives, geometry helpers and slide layout blocks.
- `_visuals/objects.tsx`: what gets drawn: people, products, places and marks, built on `./kit`.

Every piece in `_visuals/` is one the course has already paid for. Weeks import from their course's `_visuals/` and never from another week's folder, and pieces stay within their course, like its style.

For every slide and plate:

1. **Look before you build.** Search the course's `_visuals/` for what you need, including every numbered version, and use the one that fits. Props usually cover the difference.
2. **Extend when it almost fits.** Add an optional prop to the existing piece, with a default that keeps every current slide unchanged.
3. **Add to `_visuals/` when nothing fits.** Write the new piece straight into the file it belongs in and import it into the week. A new version of something that already exists takes the next number (`Car1`, `Car2`, … then `Car3`). A piece still sitting in a week's folder moves to `_visuals/` the moment another week needs it. A week keeps only its own slides and the plates drawn for them.

# SVG rules

These rules cover every SVG plate or figure in every course. Each course's `CLAUDE.md` adds its look, its palette and its notes on particular rules (by number); where a course note is more specific, follow it.

## Meaning

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

## Consistency

9. **Fixed cast per week.** One symbol per idea, reused on every plate (one brand badge, one heart for feeling, one Person glyph for every human). Never switch vocabulary inside a figure (dots in one memory store, blocks in the next).
10. **Colour has one job.** Each course's palette names a neutral, one accent for what is learned, lit or chosen, and a contrast (see the course's `CLAUDE.md`). The accent marks one subject per plate and is never decoration.
11. **Matched elements match exactly.** The same element across panels has the same size, spacing and baseline.

## Layout inside the plate

12. **Lines never pass through other things.** A connector must not cross a product, a label or another node. Route around, or fan out. Three lines at the same height stack into one.
13. **Nothing touches an edge by accident.** Keep a clear gap between elements and box borders, the canvas edge, dividers, and between labels and lines.
14. **Arrows start at their source and end at their target.** Not near it, and not inside it.
15. **Aligned things line up.** Groups sit under what they group, step text sits above its panel, and networks are symmetric unless the asymmetry means something.
16. **No dead space.** Trim the canvas when an element is removed. Scale figures up when they are small in the frame.

## Placement on the slide

17. **Text leads its plate.** Every plate follows the sentence it illustrates. Never put two plates back to back with no text between them, or the reader attaches the second to the wrong line.
18. **Sizes.** Column plates are 400 units wide. Full-width figures are 800. Nothing may scroll sideways at 375px.

## Technical

19. **Mind the background.** Know what the plate sits on (the course's `CLAUDE.md` says). An unstroked fill in the background colour disappears, so filled zones take a colour that differs from it, and never draw background-coloured detail on a background-coloured fill.
20. **Round every computed coordinate** to 2 decimals, so server and client render identical markup.
21. **Every plate has a `<title>` and an `aria-label`** that describe what is drawn, updated whenever the drawing changes.

## Verification

22. **HARD RULE: verify each graphic visually, one at a time, before making the next.** After writing or changing a plate, render it and take a screenshot of it at full size (never only a thumbnail or a gallery overview). Check it against every rule here and the course's own style rules and checklist, fix what is wrong, and screenshot again until it passes, or remove it (rule 1). Only then start the next graphic. Do not batch several plates and review them at the end. Code review, reading the SVG source, and automated checks do not replace the screenshot.
23. **Run the automated checks:** text bounding boxes against the viewBox (overflow), pairwise label overlap, a DOM walk for plate-after-plate runs, and the verbatim content check.
24. **Wait for the reload before judging a screenshot.** A stale frame looks like a bug.

The Browser pane can't zoom into a region: to see a plate at full size, clone its `<svg>` into a fixed full-screen overlay with `javascript_tool`, screenshot, then remove the overlay.

## Icons (Phosphor)

`@phosphor-icons/react` is installed for use **inside** SVG plates. Lucide (`lucide-react`) stays for UI chrome (buttons, navigation) and is never used in plates.

25. **An icon is a noun, never the plate.** Use a Phosphor icon only to stand for a single, recognisable object inside a hand-built diagram: a megaphone, share arrow, chat bubbles, envelope, gear, lightbulb, eye, lock, shield, shopping bag or cart, clock, graduation cap, globe, buildings, TV, radio, newspaper, a product (mug, sneaker, watch), sentiment faces, a cursor, a check badge. The structure of the diagram (hubs, spokes, Venns, stairs, forks, timelines, arrows) is always drawn by hand.
26. **Reach for an icon when a hand-drawn glyph is hard to recognise.** If the object is a standard symbol and your drawing could be mistaken for something else (a "wrench" that reads as a magnifier, a "guitar" that reads as a stick), use the icon. If a simple hand-drawn shape already reads clearly, keep it; don't swap for the sake of it.
27. **Never use an icon for:**
    - the week's **Person** glyph: people are repeated to show counts, scaled and tinted by segment (Isotype), so they stay our own glyph;
    - the **brand badge** or any other course-specific symbol that carries a taught meaning;
    - anything whose **shape encodes data**: coin stacks, bars, curves, axes, dot fields, gauges, scales;
    - **containers that hold other marks**: speech bubbles with text lines, browser windows or phones showing content, results pages, posts, inboxes;
    - **labels**: text stays live SVG text from the slide.
28. **How to place one.** Import named icons from `@phosphor-icons/react` and render them as nested SVGs, centred on a point: `<Megaphone x={cx - s / 2} y={cy - s / 2} size={s} weight={…} color={…} />`. Colour comes only from the course palette, so rule 10 still applies, and the course's `CLAUDE.md` sets the weight. Keep icons at 20 units or more.
29. **One style per object across the week.** If an object is an icon on one plate, it is the same icon (same weight) on every plate of that week. Never show the same object as an icon in one place and a hand drawing in another inside one plate.
30. **Icons follow every rule above.** An icon still has to depict the sentence (rules 5–6), sit clear of lines and labels (rules 12–13) and be named in the plate's `<title>`/`aria-label` (rule 21). Include nested icon `<svg>`s in the collision checks.
