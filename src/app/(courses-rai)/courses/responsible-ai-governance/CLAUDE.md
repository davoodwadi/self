# Responsible AI & Algorithmic Governance: plate style

Every SVG plate in this course (all weeks, the landing page, anything new) is drawn in the **Isometric Tabletop Diorama** style below. The reference plates are `IsoConsequentialism`, `IsoDeontology`, `IsoVirtueEthics`, and `IsoLoanWide` in `week1/page.tsx`: match them.

## Look: Isometric Tabletop Diorama (3D Architectural Scale Model)

Each plate is a three-dimensional axonometric tabletop scale model set on a bevelled cool-mineral board (`IsoBase`). People, buildings, barriers, desks, and coin stacks stand on the board as solid painted architectural model pieces, while **any AI system or algorithm is drawn as a translucent glass cube (`GlassCube`)** sitting on the board so the viewer can see the internal gears, levers, or routing rules operating inside the "black box".

## Drawing primitives (`_visuals/kit.tsx` & `_visuals/objects.tsx`)

| Piece | Use it for |
|---|---|
| `Frame` | The `<svg>` of every plate (`role="img"`, `<title>` + `aria-label`). Column plates are `width={400}`, full-width plates `width={800}`. |
| `IsoBase` | The bevelled 3D tabletop slab (`w={400}` or `w={800}`) that every diorama scene stands on: top plane in `PAL.slabTop`, front thickness in `PAL.slabLeft`, right bevel in `PAL.slabRight`. |
| `IsoBlock` | Any 3D rectangular volume on the board (a shield wall, desk, pedestal, vault, step), shaded across its front, right-side, and top faces. |
| `GlassCube` | **The signature AI symbol:** a translucent 3D glass cube on the board (`fillOpacity={0.45}` front/side, `0.65` top, dashed back edges) with its internal mechanism (`children`) visible inside and an exit port (`outside`) on the side face where its action emerges. |
| `IsoPerson` | Every human in the course (consumer, applicant, seller, auditor, regulator): a 3D sculpted tabletop figure with cast shadow ellipse, 3D coat torso (front lit plane + side shaded plane), white shirt collar V, posed arms (`reach`, `behindBack`), varied skin tones (`skin1`, `skin2`, `skin3`), and sculpted hair cap. |
| `IsoHouse` | A 3D isometric building with front wall, side wall, pitched 3D roof, and optional floating rate/price placard above the roof. |
| `IsoCoinStack` | A stack of 3D cylindrical coins on the board (`counter` for baseline welfare/value, `signal` for extracted surcharge or disparity). |

## Palette (`PAL`, defined in `_visuals/kit.tsx` and `(courses-rai)/globals.css`)

Cool mineral drafting paper and slate-black ink—**never yellow or sepia**:

| Constant | Role | Hex |
|---|---|---|
| `paper` | Page ground, lit top highlights, shirt collars | `#F2F5F4` |
| `well` | Figure-well background (`--paper-2`) | `#E5ECEA` |
| `slabTop` | Top plane of the isometric tabletop board | `#E8EFED` |
| `slabLeft` | Front thickness of the board, shaded wall faces | `#CEDAD7` |
| `slabRight` | Right bevel thickness of the board, cast shadows | `#B4C4C0` |
| `ink` | Outlines (`1.4px`), headings, shoes, hair | `#101820` |
| `ink2` / `ink3` | Body copy, secondary coats, dashed back-edges | `#2B3742` / `#586773` |
| `signal` / `signalMid` / `signalLight` | The harmed group, disparity, hidden trap, or audit fault (one subject per plate) | `#C83E1D` / `#DF7A61` / `#F2D2C9` |
| `counter` / `counterMid` / `counterLight` | The protected right, baseline group, or fair benchmark | `#1B5E4B` / `#4C8C79` / `#CBE0DA` |
| `skin1` / `skin2` / `skin3` | Human skin tones across figures | `#E4C0A4` / `#C28E6C` / `#8D5D3F` |

## Core visual rules for this course

1. **Concrete scenes, never abstract flowcharts.** Every plate shows a self-evident physical scene on the 3D tabletop board: people receiving or being denied loans, a shield wall stopping a mechanical claw, a seller hiding a hook behind their back while shaking hands, or two identical houses on opposite sides of a painted postal line (`POSTAL A` vs `POSTAL B`).
2. **Algorithms live in a `GlassCube`.** Whenever a plate depicts an AI model, scoring engine, or automated agent, place its mechanism inside a translucent 3D `GlassCube` on the board so students see what is inside the black box.
3. **Three-plane 3D lighting.** Every 3D object on the board uses three flat tones (top lightest, front medium, right bevel darkest) with `1.4px` `INK` edges (`strokeLinejoin="round"`). No gradients, no drop-shadow filters, and no wobbly lines.
4. **Never let an external arm or line cross a cube's edge.** When a lever, wire, or claw exits a `GlassCube`, draw an elliptical port on the front/right face of the cube and pass the external arm via `outside` so it renders *after* the glass faces in DOM order.

## Avoid

- Box-and-arrow flowcharts or text-stuffed badge rectangles inside plates.
- Yellow, cream, or sepia backgrounds—keep the ground cool mineral (`#F2F5F4` / `#E5ECEA`).
- Wobbly sketch lines or off-register watercolour washes (those belong to Consumer Behavior).
- Solid black silhouettes on cream monitors (those belong to Digital Transformation).
- Drawing a pitched roof on top of an `IsoBlock` whose flat top face is still rendered (its back-left corner will poke out behind the roof ridge).
- Letting a connector, arm, or suspension wire cut across a cube border, a coin stack, or a person's body.

## Style checklist (with rules 22–24)

Render each plate, screenshot it at full size one at a time, and check:

- Does the scene sit on a bevelled 3D `IsoBase` board (`w={400}` or `w={800}`), with three-plane lighting (`slabTop`, `slabLeft`, `slabRight`)?
- Is the scene immediately self-evident from the drawing and the sentence beside it, without needing a caption or legend?
- Is every AI model, scoring rule, or automated system shown inside a translucent 3D `GlassCube` so the internal mechanism is visible?
- When an arm or wire exits a `GlassCube`, does it emerge from an elliptical port via `outside` so no cube border crosses it?
- Does it sit in a cohesive set with `IsoConsequentialism`, `IsoDeontology`, `IsoVirtueEthics`, and `IsoLoanWide` in `week1/page.tsx`?

## Course notes on the SVG rules

- **Rule 10:** `PAL.signal` (`#C83E1D`) marks the audit finding, harmed group, hidden trap, or disparity (one subject per plate); `PAL.counter` (`#1B5E4B`) marks the protected right, baseline group, or fair benchmark; everything else stays in the cool mineral palette.
- **Rule 19:** Plates sit inside a `figure-well` (`#E5ECEA`), and the 3D `IsoBase` (`#E8EFED` / `#CEDAD7` / `#B4C4C0`) is always stroked in `PAL.ink` (`1.4px`) so every plane reads crisply against the well.
- **Rule 20:** Round every computed coordinate with `r2(n)`.
- **Rule 28:** Prefer 3D isometric objects on the board (`IsoPerson`, `IsoBlock`, `GlassCube`, `IsoHouse`, `IsoCoinStack`). If a Phosphor icon is used on a placard or screen, use `weight="regular"` in `PAL.ink`, `PAL.signal`, or `PAL.counter` at 24–32 units.

