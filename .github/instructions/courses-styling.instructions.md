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
