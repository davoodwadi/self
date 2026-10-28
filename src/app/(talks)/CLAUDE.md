# Talk decks

These rules cover research talks and job talks in `src/app/(talks)/`. A talk is an argument made to faculty, not a lecture to students. Where they differ from the root `CLAUDE.md` rules for courses, follow this file. The root rules on punctuation, SVG plates, slide fit and visual verification still apply.

## A talk, not a lecture

The audience is faculty, so a slide carries one point of the argument and the speaker carries the explanation. Leave textbook ideas untaught: confidence intervals, distributions, significance and similar tools are assumed knowledge, never something a plate demonstrates.

A visual earns its place when it shows something the words cannot: a study's design, the stimulus or prompt participants saw, or a paper's key finding. A slide whose point is made by its sentences stands as text alone, and a deck often has several such slides in a row. Decide each slide on its own: what would this audience need to see here, if anything?

## The story decides the visual

Each slide plays one role in the talk (the problem, the design, the method, the finding), and its visual shows only that role. A method slide shows the method, and a results slide shows the result. Keep the punchline for the slide that delivers it, so an earlier slide never reveals what a later slide is there to show. Read a section's slides in order before building them, and check that the visuals tell one coherent story from the first slide to the last.

When a visual returns on a later slide (a design revisited with its result), it is the same plate, so the audience recognises it.

## Each paper for a non-specialist committee

The committee is likely consumer behaviour or quantitative marketing faculty, unfamiliar with AI terms such as tool calling, silicon sampling, decision models or pass@1. Give each paper two or more slides: the research question and design first, then the finding. A dense single slide per paper is worse than none.

Name things in the discipline's terms. Conditions and constructs take their marketing and consumer behaviour names (high anchor and low anchor, sponsorship penalty, willingness to pay), and scientific terms follow the manuscripts exactly.

## Plates

- **Data and structure only.** A plate shows the data, axis titles, statistics and control labels. Verdicts and explanatory lines ("looks biased", "the model now separates") belong to the speaker.
- **Real data for findings.** A plate that shows a paper's result is built on that paper's numbers (its tables, coefficients or released data) and shows the key finding, for example the curvilinear position effect for AI agents against humans. Select only what makes the finding visible, such as the questions where fine-tuning clearly improved on the base model.
- **Demonstrations for designs.** A design is best shown as something the speaker can operate in front of the committee, such as a clickable information board that starts closed, rather than a figure with the answers already filled in.
- **The exact stimulus.** When a plate shows a prompt or stimulus, it reproduces the paper's own wording (for example, a figure's system and user turns), with only the parts the slide needs.
- **Mechanism plates.** Made-up data is fine when a plate illustrates a mechanism, kept plausible and clearly apart from any cited result, with no "simulated" label.

## Text

- `slides.md` beside each deck's `page.tsx` is the only source of slide text. Build from it word for word and never reword it. Bracketed notes in it describe the intended visual.
- After every update, diff `slides.md` against the rendered page in both directions: words, bold, italics and links. Bold or italics removed from `slides.md` come off the page too.
- Write in an academic register: plain, precise, no slogans.
- Use sentence case with plain punctuation, and set labels in normal case rather than tracked capitals.
- Describe the speaker's positions as they are today. A candidate is a candidate, never the role they are applying for.

## Look and navigation

- Talks use the Marketing Research & Analytics course style (its kit, palette and type, imported from that course's `_visuals/`).
- The accent colour marks the slide's keyword: the one or two words that carry the claim (*attenuates*, *unseen data*, *ranking advantage*), chosen with thought, slide by slide. The rest of the sentence stays in ink, so the coloured word stands out.
- Every slide fits a 1440×900 screen at full size.
- A deck has keyboard navigation and a slim dot navigator on the right, one dot per section. Its hover labels are positioned outside the hit area, so the navigator responds only when the pointer is on a dot.
- Commit only when asked.
