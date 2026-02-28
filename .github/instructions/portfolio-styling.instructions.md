---
description: "Use when creating or updating UI components for the portfolio website. Enforces the Dark Particles theme (dark backgrounds, neon blue accents, Playfair Display/Inter fonts, glassmorphism)."
applyTo: "**/*.{tsx,css}"
---

**Ignore the /src/app/(courses) directory completely!**

# Portfolio Styling Guidelines

This project uses a custom "Dark Particles" theme based on Tailwind CSS. When building or refactoring components, always adhere to these styling principles:

- **Colors**:
  - Primary Background: Set to `dark-900` (`#0a0a0a`).
  - Surface/Card Backgrounds: Use `dark-800` (`#171717`) or `dark-700` (`#262626`).
  - Accents: Use `accent-500` (`#3b82f6`) for primary interactive elements, and `accent-400` (`#60a5fa`) for hover states or highlights.
  - Text: `text-white` or `text-gray-100` for headings, `text-gray-400` for body text.

- **Typography**:
  - Headings (`h1`, `h2`, `h3`): Use the `font-serif` family (Playfair Display) along with tight tracking (`tracking-tight`).
  - Body & Labels: Use the `font-sans` family (Inter).

- **UI Effects (Glassmorphism)**:
  - For interactive cards, overlays, or navbars, use glassmorphism classes: `bg-dark-900/50 backdrop-blur-md border border-white/5`.
  - Add smooth transition for hover states: `transition-all duration-300 hover:border-accent-500/30 hover:bg-dark-800/60`.

- **Animations**:
  - Use `.fade-up` and `.visible` classes with intersection observers to reveal content as the user scrolls.

- **Scrollbar**:
  - Maintain the custom dark scrollbar pattern (mapped globally in CSS).
