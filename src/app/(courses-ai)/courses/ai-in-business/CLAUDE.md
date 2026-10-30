# Applications of AI in business design and plate rules

These rules govern the course landing page, every weekly slide deck, and every SVG figure in this course.

## Design system, colours, and typography

The course uses a plain, straightforward academic sans-serif design system that avoids ornate editorial flourishes or AI-generated visual tropes. Only `Source Sans 3` (`--font-open-sans`) is loaded in `(courses-ai)/layout.tsx`, and both `--font-sans` and `--font-serif` in `(courses-ai)/globals.css` resolve to `var(--font-open-sans), ui-sans-serif, system-ui, -apple-system, sans-serif`. All headings, body copy, callouts, discussion prompts, quizzes, and diagram labels are set in upright sans-serif. Never use serif display fonts (e.g., `EB Garamond`), italic subtitles, italic callout or discussion prompts, or decorative small-caps tracking.

Every weekly deck imports its shared typography tokens and slide blocks from `_visuals/kit.tsx` rather than writing ad-hoc font classes. `BODY` (`font-sans text-lg leading-[1.6] text-[var(--charcoal)] md:text-[1.1875rem]`) sets standard reading sentences, `LEAD` (`font-sans text-xl leading-[1.5] text-[var(--charcoal)] md:text-[1.375rem]`) sets intermediate callouts, `DISPLAY` (`font-sans text-[1.25rem] font-semibold leading-[1.4] tracking-[-0.01em] text-[var(--charcoal)] md:text-[1.625rem]`) and `Verdict` set promoted statements, `MICRO` (`font-sans text-[0.875rem] font-medium tracking-normal [font-variant-numeric:tabular-nums]`) sets step indices and metadata, `TAG` (`font-sans text-[0.875rem] font-medium tracking-normal`) sets inline tags, and `SVG_LABEL` (`fontSize: 9.5`, `letterSpacing: 0.2`, upright `var(--font-sans)`, `fontWeight: 500`) sets every SVG `<text>` label.

The palette defined in `(courses-ai)/globals.css` uses `--charcoal` (`#1A1A1D`) for primary ink and all headings, `--charcoal-light` (`#2D2D32`) for secondary body copy, `--champagne` and `--gold` (`#55555A`) as a quiet neutral grey for indices and metadata (never warm gold or bronze), `--crimson` (`#8B0000`) as the single semantic accent, and `--surface` or `--background` (`#FFFFFF`) as the ground. Headings (`<h1>`, `<h2>`, `<h3>`) are always solid `--charcoal`, so never colour individual words inside a title or heading in `--crimson`. Never add a full-screen noise overlay, gradients, or drop shadows.

## Course landing and slide structure

The course landing page displays each week's number, title, and one-line description in upright sans-serif without listing module or part subtopics beneath the rows, and without decorative eyebrow hairlines or slow underline sweep animations.

Weekly title slides present the week label, a unified upright `<h1>` in `--charcoal` without line breaks or multi-colour word highlights, and an upright subtitle in `--charcoal-light`. Never place giant background watermark numerals (e.g., `28vw` or `36vw` numbers) or decorative background wireframe or mesh textures behind title or closing slides.

Module and part divider slides (`ModulePlate1`, `ModulePlate2`, `PartPlate1`, `PartPlate2`, `PartPlate3`) use a simple stacked header consisting of a small `Module N` or `Part N` label, a bold upright `<h2>` title, a horizontal rule, and upright overview sentences. Never use oversized margin numerals.

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply across every week, with figures placed inline in each week's `page.tsx` next to the sentence they illustrate and carrying only words that already appear in the slide's sentences. All SVG `<text>` elements use `{...SVG_LABEL}` (`9.5px` upright `var(--font-sans)`). For Rule 10, `--charcoal` is neutral, `--crimson` marks the single element that is learned, lit, or chosen, and `--champagne` is the quiet neutral contrast, so crimson is never used for decoration. For Rule 19, figures sit directly on the white slide ground (`--surface` or `--background`), so any filled zone must be stroked or tinted with a light charcoal or crimson fill opacity. For Rule 28, Phosphor icons take their colour only from the course palette (`var(--charcoal)`, `var(--crimson)`, `var(--champagne)`), using `weight="duotone"` by default and `regular` below about 20 units.
