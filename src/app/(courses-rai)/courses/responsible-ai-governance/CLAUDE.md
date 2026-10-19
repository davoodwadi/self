# Responsible AI & Algorithmic Governance: plate style

Every SVG plate in this course shares one **rendering craft**—crisp 3D axonometric & architectural drafting in a cool-mineral palette—while demanding **high visual variety and bespoke invention from slide to slide**.

The style is a *medium* (three-plane 3D lighting, `1.4px` slate-ink drafting lines, and translucent cutaways that expose hidden mechanisms), **not a single scene template**. Never turn a week into a repetitive parade of people standing around a box on a slab.

## Look: 3D Architectural & Technical Illustration

Plates read like precision architectural models, patent cutaways, and physical engineering instruments set on cool-mineral drafting paper:

- **Three-plane 3D lighting:** Every solid volume uses three flat tones (top lightest, front medium, right bevel darkest) with `1.4px` `PAL.ink` edges (`strokeLinejoin="round"`). No gradients, no drop-shadow filters, and no wobbly lines.
- **Translucent X-ray / glass cutaways for AI:** When a plate reveals how an algorithm, model, or rule operates internally, draw its housing as translucent mineral glass (`fillOpacity={0.45}` front/side, `0.65` top, with dashed `PAL.ink3` hidden back edges) so the viewer sees the gears, thresholds, filters, or routing paths inside the "black box". The housing does **not** have to be a standard cube—it can be a glass lens, a sorting cylinder, a prism, a cutaway conduit, an exploded layer, or a `GlassCube`.

## Visual creativity & variety (mandatory across every week)

Each slide's visual must be invented for that slide's specific idea, verb, and scale. Across a week, vary **camera distance, subject type, and visual grammar** so no two neighbouring slides feel the same:

1. **Macro close-ups of instruments & mechanisms:** Fill the frame with a single bespoke device—a precision caliper, a balance beam, a threshold knife slicing a distribution, a rotary valve, a pressure gauge, an interlock switch, or an auditor's magnifying lens—without any tabletop board underneath.
2. **Exploded views & layered cutaways:** Pull a system, model card, or governance stack apart vertically along dashed alignment axes so students see each layer (training strata, weights, guardrails, audit sign-off) in 3D relief.
3. **Physical documents, ledgers & governance artifacts:** Draw tactile paperwork in 3D axonometric projection—stacked case dossiers, an audit stamp striking a page, a redaction stencil masking fields, punched scorecards, regulatory seals, or contract clauses pinned with callouts.
4. **Tactile data & quantitative sculptures:** When the concept is statistical (error rates, calibration, disparity, false positives vs. false negatives, variance), draw the data as a physical 3D chart or instrument—stepped histograms, two-pan confusion trays, a sliding decision plane cutting through two distributions, or a calibration slope—rather than people standing next to a box.
5. **Spatial maps, cross-sections & zoning plans:** Show redlining, jurisdiction, supply chains, or deployment environments as angled street grids, architectural cross-sections, or radial territory rings.
6. **Tabletop scale scenes (`IsoBase`):** Use a full tabletop slab with `IsoPerson` figures **sparingly** (at most 2–3 times in a week, and never on consecutive slides), only when the sentence specifically stages multiple actors interacting across a shared space.

## Shared pieces (`_visuals/kit.tsx` & `_visuals/objects.tsx`)

The pieces in `_visuals/objects.tsx` are a **starting kit, not a closed menu**. Compose bespoke SVG geometry in each week's `visuals.tsx` whenever the concept calls for a new object, instrument, document, or chart, and promote a piece to `_visuals/objects.tsx` as soon as a second week needs it.

| Piece | Use it for |
|---|---|
| `Frame` | The `<svg>` of every plate (`role="img"`, `<title>` + `aria-label`). Column plates are `width={400}`, full-width plates `width={800}`. |
| `GlassCube` | A translucent 3D glass housing (`fillOpacity={0.45}` front/side, `0.65` top, dashed back edges) with its internal mechanism (`children`) visible inside and an exit port (`outside`) on the side face. Use when a cubic housing fits, or build custom translucent glass geometry (cylinders, lenses, conduits, layers) using the same opacity and dashed-edge conventions. |
| `IsoBlock` | A 3D rectangular volume (a plinth, wall, document slab, step, bar, or housing), shaded across its front, right-side, and top faces. |
| `IsoPerson` | Every human in the course when a scene includes people: a 3D sculpted figure with cast shadow ellipse, 3D coat torso, shirt collar V, posed arms (`reach`, `behindBack`), and varied skin tones (`skin1`, `skin2`, `skin3`). |
| `IsoHouse` | A 3D isometric building with front wall, side wall, pitched 3D roof, and optional floating rate/price placard. |
| `IsoCoinStack` | A stack of 3D cylindrical coins (`counter` for baseline welfare/value, `signal` for extracted surcharge or disparity). |
| `IsoBase` | An optional bevelled 3D tabletop slab (`w={400}` or `w={800}`). Reserve it for multi-actor spatial scenes; omit it on close-up instruments, exploded diagrams, documents, and data plates. |

## Palette (`PAL`, defined in `_visuals/kit.tsx` and `(courses-rai)/globals.css`)

Cool mineral drafting paper and slate-black ink—**never yellow or sepia**:

| Constant | Role | Hex |
|---|---|---|
| `paper` | Page ground, lit top highlights, document faces, shirt collars | `#F2F5F4` |
| `well` | Figure-well background (`--paper-2`) | `#E5ECEA` |
| `slabTop` | Top plane of mineral slabs, plinths, and neutral surfaces | `#E8EFED` |
| `slabLeft` | Front thickness of slabs, shaded front faces | `#CEDAD7` |
| `slabRight` | Right bevel thickness, deep shaded side faces, cast shadows | `#B4C4C0` |
| `ink` | Outlines (`1.4px`), headings, primary drafting lines | `#101820` |
| `ink2` / `ink3` | Body copy, secondary coats, dashed hidden/alignment edges | `#2B3742` / `#586773` |
| `signal` / `signalMid` / `signalLight` | The harmed group, disparity, hidden trap, or audit fault (one subject per plate) | `#C83E1D` / `#DF7A61` / `#F2D2C9` |
| `counter` / `counterMid` / `counterLight` | The protected right, baseline group, verified safeguard, or fair benchmark | `#1B5E4B` / `#4C8C79` / `#CBE0DA` |
| `skin1` / `skin2` / `skin3` | Human skin tones across figures | `#E4C0A4` / `#C28E6C` / `#8D5D3F` |

## Core visual rules for this course

1. **Start from the sentence's specific metaphor or mechanism.** Ask what single physical picture makes the sentence unforgettable: an instrument, a cutaway, a dossier, a data sculpture, a map, or a scene. Never default to "person + cube + barrier on a board" when a sharper visual exists.
2. **No two neighbouring slides may share the same composition.** Alternate framing and scale across the deck (e.g., a macro close-up of a gauge on one slide, an exploded 3D dossier stack on the next, a quantitative threshold chart after that, then a spatial scene).
3. **Three-plane 3D lighting & translucent glass.** Every 3D form uses three flat tones (top lightest, front medium, right bevel darkest) with `1.4px` `PAL.ink` outlines, and internal AI logic is shown through translucent mineral glass with dashed back edges.
4. **Clean depth ordering at ports and intersections.** When an arm, shaft, or wire exits a translucent glass volume, draw an elliptical port on the front/right face and render the emerging element *after* the glass faces in DOM order so no border line cuts across it.

## Avoid

- Repeating `IsoBase` + `GlassCube` + `IsoPerson` as a house formula on slide after slide.
- Flat 2D box-and-arrow flowcharts or text-stuffed badge rectangles inside plates.
- Yellow, cream, or sepia backgrounds—keep the ground cool mineral (`#F2F5F4` / `#E5ECEA`).
- Wobbly sketch lines or off-register watercolour washes (those belong to Consumer Behavior).
- Solid black silhouettes on cream monitors (those belong to Digital Transformation).
- Drawing a pitched roof on top of an `IsoBlock` whose flat top face is still rendered (its back-left corner will poke out behind the roof ridge).
- Letting a connector, arm, or suspension wire cut across a glass edge, a coin stack, or a person's body.

## Style checklist (with rules 22–24)

Render each plate, screenshot it at full size one at a time, and check:

- **Visual variety:** Does this plate use a distinctly different camera scale, composition, and subject type from the plates immediately before and after it?
- **Bespoke invention:** Did you draw the specific object, instrument, document, cutaway, or data structure the sentence calls for, rather than recycling generic blocks on a board?
- **Craft & lighting:** Are volumes rendered with crisp `1.4px` `PAL.ink` edges and three-plane mineral shading (`paper`/`slabTop`, `slabLeft`, `slabRight`), and are internal AI mechanisms shown through translucent glass with dashed hidden edges?
- **Self-evident meaning:** Is the point immediately clear from the drawing and the sentence beside it, without needing a caption or legend?
- **Clean intersections:** Do emerging shafts, wires, or arms exit cleanly through ports without border lines crossing through them?

## Course notes on the SVG rules

- **Rule 10:** `PAL.signal` (`#C83E1D`) marks the audit finding, harmed group, hidden trap, or disparity (one subject per plate); `PAL.counter` (`#1B5E4B`) marks the protected right, baseline group, or fair benchmark; everything else stays in the cool mineral palette.
- **Rule 19:** Plates sit inside a `figure-well` (`#E5ECEA`). Any surface in `PAL.paper` or `PAL.slabTop` is stroked in `PAL.ink` (`1.4px`) so every plane reads crisply against the well without needing an `IsoBase` underneath.
- **Rule 20:** Round every computed coordinate with `r2(n)`.
- **Rule 28:** Prefer bespoke 3D axonometric objects and instruments. If a Phosphor icon is used on a placard, stamp, or screen, use `weight="regular"` in `PAL.ink`, `PAL.signal`, or `PAL.counter` at 24–32 units.

