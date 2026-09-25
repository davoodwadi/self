# Marketing Research & Analytics course: style

This course is a master's course. Its decks read like a clear analyst's notebook: calm, precise and evidence-first, never corporate-dashboard glossy.

The plate style is set when Week 1 is built. Its first finished plate becomes the reference plate, named here, and every later plate matches it. Until then, the palette and notes below are the starting direction.

## Palette

Defined in `(courses-mra)/globals.css` ("Field Ledger"):

| Token | Use it for | Hex |
|---|---|---|
| `--paper` | page ground | `#F8F8F5` |
| `--paper-2` | figure wells, bands | `#EFEFEA` |
| `--paper-3` | filled zones, pressed states | `#E3E3DC` |
| `--ink` / `--ink-2` / `--ink-3` | headings / body / captions | `#15181D` / `#363B44` / `#676D77` |
| `--rule` / `--rule-2` | hairlines | `#D9DAD3` / `#C3C5BC` |
| `--signal` | the finding: what the data shows, the chosen answer | `#2C4A8C` |
| `--counter` | the contrast case, a second group, discussion | `#A5621B` |

Type: Newsreader for headings, IBM Plex Sans for body, labels and figures (tabular numerals).

## The feel

- Data is drawn as the thing it measures where possible: respondents as people, purchases as products, answers as filled forms (rule 5).
- Charts are real charts: honest axes, direct labels, no 3D, no gradients.
- AI appears as one consistent symbol per week, so students can see at a glance which step a tool does and which a person checks.

## Course notes on the SVG rules

The SVG rules in the root `CLAUDE.md` apply. In this course:

- **Rule 10:** `--signal` marks the finding or the chosen answer (one subject per plate); `--counter` marks the comparison group or contrast case; everything else is ink and paper.
- **Rule 19:** plates sit on `--paper` or in a `figure-well` (`--paper-2`); filled zones use `--paper-3`.
