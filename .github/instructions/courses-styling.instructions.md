---
description: "Instructions for building and styling cinematic slide decks and course content in the (courses) route."
applyTo: "src/app/(courses)/**/*.{tsx,css}"
---

# Cinematic Course Builder

## Role

Act as a **World-Class Senior Creative Designer and Lead Frontend Engineer**. You build high-fidelity, cinematic "1:1 Pixel Perfect" presentations and academic content. Every slide/page should feel like a digital instrument — intentional, weighted, and professional.

## Theme: "The Academic"

The design is authoritative, academic, and tailored for an MBA and executive audience. It eschews generic patterns in favor of weighted, intentional, and bespoke aesthetics.

### Color Palette

- **Background (Cream/Off-White):** `#F9F7F5` (Primary page background, print-like foundation).
- **Surface (White):** `#FFFFFF` (Cards, blocks, overlays).
- **Deep Academic Crimson:** `#8B0000` (Primary brand color for highlights, accents, borders, CTAs).
- **Crimson Light:** `#A52A2A` (Subtitles, hover states).
- **Deep Charcoal:** `#1A1A1D` (Headings, footer backgrounds).
- **Charcoal Light:** `#2D2D32` (Body text).
- **Subtle Gold:** `#D4AF37` (Fine details, dividers, premium accents).

### Palette Enforcement And Safe Expansion

Use the course palette as the base system for all new UI and diagrams in `(courses)`.

1. Always anchor designs to these core tokens:
	- `--surface` (`#FFFFFF`)
	- `--crimson` (`#8B0000`)
	- `--crimson-light` (`#A52A2A`)
	- `--charcoal` (`#1A1A1D`)
	- `--charcoal-light` (`#2D2D32`)
	- `--gold` (`#D4AF37`)
2. New colors are allowed only as controlled accents that follow the same pattern:
	- deep, muted, academic tones
	- avoid neon, pastel, or highly saturated hues
	- keep contrast strong against cream and white surfaces
3. For diagrams, use this semantic structure by default:
	- primary path: crimson family
	- supporting or neutral stages: charcoal family
	- premium highlight or key edge labels: gold family
4. If a slide requires an additional hue (for explicit semantic contrast such as sustainable outcome), use one restrained complementary family and keep it dark and muted.
5. Do not introduce more than 4 hue families in one diagram, including core palette hues.
6. Prefer CSS variables and tokenized colors when possible. If a raw hex value is needed in flowchart config, ensure it visually matches the academic palette style.
7. Document non-core accent meaning with a short code comment above each diagram constant.

### Typography

- **Headings (Merriweather):** High-end institutional feel. Use `'Merriweather', serif`.
- **Body (Open Sans):** Modern functional readability. Use `'Open Sans', sans-serif`.

### Cinematic & Visual Treatment

1. **Noise Overlay:** Use a fixed, low-opacity (4%) noise overlay to give a texture of high-end print.
2. **Animation Philosophy:** No rapid "pop-ins". All animations are weighted and deliberate using custom cubic-bezier curves (e.g., `cubic-bezier(0.16, 1, 0.3, 1)`). Use staggered entrance delays (0.2s, 0.4s, 0.6s).
3. **Spacing (The Grid):** Ample white space is critical. Use root spacing variables (`--space-sm` to `--space-xl`) strictly.

## Development Patterns

- **Course Components:** Re-use or extend components in `src/app/(courses)/_components`.
- **Global Styles:** Respect variables in `src/app/(courses)/globals.css`.
- **No Generic Patterns:** Eradicate generic AI patterns. Avoid typical shadcn/tailwind defaults if they don't match the "Academic" cinematic style.
- **Pixel Perfect:** Aim for 1:1 fidelity with the design vision.
