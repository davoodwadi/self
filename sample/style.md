# BUSI 654: Style Guide & Design System

## Theme: "The Academic"

The design direction for the "Applications of AI in Business" course website embodies **"The Academic"** theme. It is designed to be cinematic, high-fidelity, authoritative, and strictly tailored for an MBA and executive audience. It eschews generic patterns in favor of weighted, intentional, and bespoke aesthetics.

### Color Palette

The color scheme relies on deep, authoritative tones contrasted with a readable, creamy background to evoke a classic, high-end institutional feel.

- **Background (Cream/Off-White):** `#F9F7F5`
  - *Usage:* Primary page background. Soft on the eyes, providing a textured, print-like foundation.
- **Surface (White):** `#FFFFFF`
  - *Usage:* Cards, distinct content blocks, or overlays.
- **Deep Academic Crimson:** `#8B0000`
  - *Usage:* Primary brand color. Used for key highlights, strong accents, borders, and primary calls-to-action (CTAs).
- **Crimson Light:** `#A52A2A`
  - *Usage:* Subtitles, secondary accents, or hover states.
- **Deep Charcoal:** `#1A1A1D`
  - *Usage:* Primary text color (Headings), footer backgrounds, and high-contrast UI elements. Ensures maximum readability without the harshness of pure black.
- **Charcoal Light:** `#2D2D32`
  - *Usage:* Body text color.
- **Subtle Gold:** `#D4AF37`
  - *Usage:* Fine details, dividers, and premium accents.

### Typography

We utilize a dual-font system pairing a classic, legible serif for authority with a clean, modern sans-serif for functional readability.

#### Primary Typeface (Headings): `Merriweather`
- **Family:** `'Merriweather', serif`
- **Weights:** 300 (Light), 400 (Regular), 700 (Bold), 900 (Black)
- **Usage:** All Headings (`<h1>` to `<h6>`), Course Title, Logo marks.
- **Characteristics:** Provides an authoritative, academic, and highly credible tone. 

#### Secondary Typeface (Body): `Open Sans`
- **Family:** `'Open Sans', sans-serif`
- **Weights:** 300 to 800
- **Usage:** Body copy (`<p>`), navigation links, buttons, and captions.
- **Characteristics:** Highly legible across all devices, ensuring that dense academic and business text remains readable.

### Cinematic & Visual Treatment

To ensure the "1:1 Pixel Perfect" and cinematic feel:

1. **Noise Overlay:**
   - A fixed, low-opacity (4%) SVG fractal noise overlay is applied across the entire site. This breaks the sterile digital feel, giving it the texture of high-end print or film stock.
2. **Animation Philosophy:**
   - **No rapid "pop-ins".** All animations are weighted and deliberate.
   - We use custom cubic-bezier curves (e.g., `cubic-bezier(0.16, 1, 0.3, 1)`) for entrance animations (`fade-in-up`) to create a smooth, decelerating ease that feels premium.
   - Entrance delays are staggered (0.2s, 0.4s, 0.6s) to guide the user's eye naturally down the page.
3. **Spacing (The Grid):**
   - Ample white space is critical. Elements are never crowded. 
   - Root spacing variables (`--space-sm` to `--space-xl`) are strictly adhered to, ensuring a consistent rhythm throughout the document.

### Implementation Setup (Google Fonts)

To import the typography system, use the following snippet in the `<head>` of your HTML document:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">