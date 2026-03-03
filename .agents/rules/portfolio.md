---
trigger: always_on
---

# Core Repository Instructions

## Project Overview

This repository contains the portfolio for Davood Wadi, PhD, Marketing and AI.

# Package manager

IMPORTANT: We use `pnpm` as our package manager.

# Building components

- Use the `shadcn` mcp tool to get responsive and prebuilt components to use.
- Prefer `cn` and `cva` to make components composable.
- Prefer reusing components where possible
- Prefer creating new components for complex tailwindcss styles

# Debugging nextjs

IMPORTANT: Use the `init` tool to set up Next.js DevTools context
To debug the nextjs error always use the Next.js DevTools.

# Rules for writing

- Do not use M-dash or N-dash.

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
