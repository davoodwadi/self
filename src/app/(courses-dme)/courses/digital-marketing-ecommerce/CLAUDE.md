# Digital Marketing & E-Commerce: plate style

Every SVG plate in this course is drawn as a page from a **mail-order catalogue**: products engraved in halftone, set in ruled tiles with a position numeral and a price, on a clean neutral page. A catalogue page is a ranked list of products on paper, so search results, recommendations, sponsored slots and storefronts are drawn as the page itself, and the course can follow the line from catalogue to search engine to platform to AI shopping agent.

The reference plate is the Week 4 "Why rank position shapes sales" plate from the style round (`course-styles/digital-marketing-candidates.preview.html`): five double-ruled tiles of the same halftone mug, a stack of cursors above each falling from ten to one, the top stack in amber and the rest in ink. Match its line weights, halftone densities and type.

The style is a medium, not a scene template: each plate is invented for its sentence, and a week mixes many kinds of drawing.

## Look: Mail-Order Catalogue

- **Neutral page, white tiles.** Slides and plates sit on a neutral off-white page (`--paper` #FBFBF9) for comfortable long reading. Products sit in white tiles framed by a double rule (an outer 1-unit line and an inner 0.45-unit hairline, inset 3 units). Never tint the page sepia, cream or kraft.
- **Engraved products in halftone.** Products are drawn in clean ink outline (`LINE.outline`) and shaded with the halftone dot screens in `HalftoneDefs`: `light` across the body, `dense` on the shaded side. White highlights (a rim, a handle's inner line) are drawn in paper over the ink. No grey fills, gradients or drop shadows.
- **Ink marks.** Cursors, stars, counts and other small marks are solid ink. A mark becomes amber only when it is the slide's key idea.
- **Listing furniture is part of the object.** A position numeral (Bodoni italic) in the tile's top-left, a price (Bodoni semibold) at the foot, and two hairlines for the product name. A word printed on a listing (SPONSORED, a −10% tag) is a catalogue key: Franklin semibold capitals, tracked.
- **Catalogue grammar.** Whatever is ranked, compared or offered is laid out as a catalogue would lay it out: a row or grid of tiles, a page spread, an order form, a price list, a mailing envelope, a parcel. Flows of attention, clicks or data run between tiles, never through them.

## Palette (`CAT` in `_visuals/kit.tsx`, tokens in `(courses-dme)/globals.css`)

| Constant | Role | Hex |
|---|---|---|
| `paper` | The page and plate ground | `#FBFBF9` |
| `tile` | Product tiles, front faces, highlights | `#FFFFFF` |
| `ink` | Every outline, halftone dot, mark, numeral and key | `#1E1C1A` |
| `ink3` | Secondary notes on the page (not in plates) | `#5F5B57` |
| `amber` | The accent mark in plates: the slide's key idea, one subject per plate, always with an ink outline | `#E0A100` |
| `amberText` | The accent as text: the key phrase on a slide, and amber words in a plate | `#8A5A00` |
| `purple` | The contrast colour: only on a plate that compares two cases students must tell apart (sponsored vs organic, human shopper vs AI agent) | `#6A2C70` |

The bright amber reads at only about 2:1 on the page, so every amber mark carries an ink outline, and amber text always uses `amberText` (5.7:1). Purple (9.2:1) works as solid fill, line or text.

## Type

- Headings and display: **Libre Bodoni** 400 (`--font-heading`).
- Body, labels and controls: **Libre Franklin** (`--font-body`).
- Inside plates: catalogue keys (concept names, words printed on a listing) are `CatKey`, Franklin 600 capitals tracked 0.14em. Position numerals are `Numeral`, Bodoni italic. Prices and quantities are `Price`, Bodoni 600. Nothing else.
- Size by what students see, not by viewBox units: measured at 1440×900 after `FitSlides` has run, keys read at 11 to 13px and numerals and prices at 13 to 16px. A column plate renders far smaller than a full-width one, so the same word needs bigger units there.

## Visual variety across a week

Vary the camera distance, subject and drawing grammar so neighbouring slides feel different:

1. **One product, close up:** a single engraved object with its tag, label or barcode.
2. **Catalogue pages:** rows and grids of tiles, ranked lists, spreads, a results page, a shelf.
3. **Documents and forms:** order forms, receipts, invoices, mailing labels, coupons, email and ad layouts as printed pieces.
4. **Data as catalogue furniture:** counts drawn as stacks of the thing counted (cursors, parcels, coins, stars), price lists, tallies.
5. **Places and routes:** a storefront, a warehouse, a delivery route, a map of a marketplace.
6. **People and agents:** a shopper or an AI agent at the moment of choice, kept to a few per week.

## Shared pieces (`_visuals/kit.tsx`, `_visuals/objects.tsx`)

| Piece | Use it for |
|---|---|
| `Frame` | The `<svg>` of every plate (`role="img"`, `<title>` + `aria-label`). Column plates `width={400}`, full-width `width={800}`. |
| `HalftoneDefs id` | The halftone screens. Render once inside each plate with an id unique on the page. |
| `ht(id, tone)` | Fill for a halftone face: `light` or `dense`. |
| `Tile` | A double-ruled white listing tile. |
| `Numeral`, `Price`, `CatKey` | Position numeral, price or quantity, and catalogue key. |
| `CAT`, `LINE` | Palette and line weights. |
| `Mug`, `Cursor`, `Star`, `Listing` | The reference plate's cast (in `objects.tsx`): the engraved mug, the click cursor, the rating star, and a complete tile with numeral, product, price and optional SPONSORED key. |
| `Arrow` | A straight ink arrow with its head at the target (in `kit.tsx`). |
| `Person`, `Agent`, `Badge` | The shopper (head and shoulders), the AI shopping agent (console head, purple when contrasted with a human) and the platform's ringed-star badge. |
| `Shop`, `Warehouse`, `Factory`, `House`, `Monitor`, `Van` | Places and routes: the shop front, the warehouse, the plant, the buyer's house, a screen showing a page of tiles, the delivery van. |
| `Parcel`, `Coin`, `AmberCoin`, `PayCard`, `OrderForm`, `Receipt`, `Envelope`, `Cart`, `Stopwatch` | Orders, money, documents and time: parcels (ink, amber or purple), coins seen edge-on in stacks, payment card, order form, till receipt, mailed envelope, shopping cart, stopwatch. |
| `Sneaker`, `Bottle`, `Espresso`, `Jacket` | Engraved products beyond the mug. |

New objects are drawn in the week's `visuals.tsx` and move to `_visuals/objects.tsx` when a second week needs them.

## Style checklist (with root rules 22 to 24)

Render each plate, screenshot it at full size, and check:

- **Page:** the plate sits on the neutral page. Tiles are white with the double rule.
- **Line and tone:** ink outlines at the set weights and halftone screens only. No grey fills, gradients or shadows.
- **One accent:** amber marks one subject, with an ink outline. Purple appears only where the plate compares two cases.
- **Type:** keys, numerals and prices in the faces above, at the sizes above on the rendered slide.
- **Variety:** a different kind of picture from the plates before and after it.
- **Self-evident:** the drawing and its sentence make the point without a caption.

## Avoid

- Sepia, cream or kraft pages, and any paper texture on the page.
- Red, orange-red or crimson accents (Intro Marketing, AI in Business, Digital Transformation and Responsible AI use them), blue accents and Newsreader (Marketing Research & Analytics), patent stipple and Caslon (Responsible AI), watercolour sketch lines (Consumer Behavior), solid black silhouettes (Digital Transformation).
- Interface wireframes: draw the product, the listing or the page, not grey UI boxes.

## Course notes on the SVG rules

- **Rule 5:** Clicks are cursors, ratings are stars, sales are parcels or receipts, money is coins or prices: draw the thing counted.
- **Rule 10:** `CAT.amber` marks the key idea. `CAT.purple` only for a contrast students must see. Everything else is ink on white tiles and the neutral page.
- **Rule 12:** Click stacks, arrows and leader lines stop short of a tile's double rule. They never cross a tile or its product.
- **Rule 19:** Plates sit on `--paper`, and tiles are white, so every tile is outlined. Filled zones that are not tiles use `--paper-3`.
- **Rule 20:** Round every computed coordinate with `r2(n)`.
- **Rule 28:** Prefer engraved, drawn objects. If a Phosphor icon is used, use `weight="regular"` in `CAT.ink` (amber fill only for the key idea), 24 units or more.
