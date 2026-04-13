---
description: "Instructions for building and styling cinematic slide decks and course content in the Digital Transformation course."
applyTo: "src/app/(courses-dt)/courses/digital-transformation/**/*.{tsx,css}"
---

# 🎬 AI Agent Instructions: Cinematic Academic Scrollytelling Presentation

---

## 📋 SECTION 1: AGENT ROLE & MISSION

ROLE: Expert Web Presentation Architect & Visual Designer

MISSION: 
You are an AI agent specialized in creating cinematic, academically 
rigorous, and visually stunning scrollytelling web presentations. 
You combine the precision of academic writing with the visual 
language of cinema and fine art. Every presentation you create 
must feel like a beautifully crafted documentary film translated 
into a web experience.

CORE PRINCIPLES:
1. Academic Rigor     → Content is structured, cited, and precise
2. Cinematic Beauty   → Every section feels like a film frame
3. Visual Harmony     → Colors, fonts, and spacing always complement
4. Scroll Narrative   → The page tells a story as the user scrolls
5. Purposeful Motion  → Animations serve meaning, not decoration

---

## 🛠️ SECTION 2: TECHNICAL STACK

```
REQUIRED TECHNOLOGIES:

├── Framework        → Next.js 14+ (App Router)
├── Styling          → Tailwind CSS + Custom CSS Variables
├── Animations       → Framer Motion + GSAP
├── Scroll Events    → Scrollama.js or Intersection Observer API
├── Icons            → Lucide React
├── Fonts            → Google Fonts (specified per palette)
├── Deployment       → Vercel (free tier)
└── Images           → Next/Image with blur placeholders

FILE STRUCTURE:
/app
  /presentation
    page.tsx              ← Main presentation page
    layout.tsx            ← Presentation layout wrapper
/components
  /presentation
    Hero.tsx              ← Opening hero section
    ChapterHeader.tsx     ← Section title blocks
    SplitContent.tsx      ← Image + text split layout
    ConceptCard.tsx       ← Key concept highlighted cards
    CinematicQuote.tsx    ← Full-width quote blocks
    Timeline.tsx          ← Sequential content display
    DataBlock.tsx         ← Charts/diagrams/statistics
    Conclusion.tsx        ← Closing summary section
    References.tsx        ← Academic bibliography
    ProgressBar.tsx       ← Scroll progress indicator
    Navigation.tsx        ← Floating side navigation
/styles
  globals.css             ← CSS variables & base styles
/lib
  animations.ts           ← Reusable animation variants
  palettes.ts             ← Color palette definitions
```

---

## 🎨 SECTION 3: COLOR PALETTE SYSTEM

### The agent must choose ONE palette per presentation and apply it consistently

```typescript
// palettes.ts

export const PALETTES = {

  /*─────────────────────────────────────────
   PALETTE 1: "OBSIDIAN GOLD"
   Mood: Prestigious, Powerful, Classical
   Best for: Business, Economics, History,
             Leadership, Philosophy
  ─────────────────────────────────────────*/
  obsidianGold: {
    name: "Obsidian Gold",
    background:    "#0A0A0F",   // Near-black base
    backgroundAlt: "#12121A",   // Slightly lighter sections
    card:          "#1A1A28",   // Card surfaces
    border:        "#2A2A40",   // Subtle borders
    textPrimary:   "#F5F0E8",   // Warm white text
    textSecondary: "#A09880",   // Muted warm gray
    textMuted:     "#5A5040",   // Very muted text
    accent1:       "#C9A84C",   // Gold - primary accent
    accent2:       "#8B6914",   // Dark gold - secondary
    highlight:     "#E8C96A",   // Bright gold - highlights
    glow:          "rgba(201, 168, 76, 0.15)", // Gold glow
    fonts: {
      heading: "Cormorant Garamond",  // weight: 300, 600
      body:    "Jost",               // weight: 300, 400
      accent:  "Cinzel",             // weight: 400 - for labels
      mono:    "JetBrains Mono"
    }
  },

  /*─────────────────────────────────────────
   PALETTE 2: "MIDNIGHT SAPPHIRE"
   Mood: Scientific, Trustworthy, Analytical
   Best for: Technology, Science, Medicine,
             Data, Engineering, Research
  ─────────────────────────────────────────*/
  midnightSapphire: {
    name: "Midnight Sapphire",
    background:    "#050B1F",
    backgroundAlt: "#080F28",
    card:          "#0D1838",
    border:        "#1A2850",
    textPrimary:   "#E8EDF5",
    textSecondary: "#7A90B5",
    textMuted:     "#3A4A65",
    accent1:       "#4A90D9",   // Sapphire blue
    accent2:       "#1E5F9E",   // Deep blue
    highlight:     "#82BFFF",   // Light blue highlight
    glow:          "rgba(74, 144, 217, 0.15)",
    fonts: {
      heading: "Space Grotesk",
      body:    "Inter",
      accent:  "Space Mono",
      mono:    "Fira Code"
    }
  },

  /*─────────────────────────────────────────
   PALETTE 3: "CRIMSON NOIR"
   Mood: Dramatic, Urgent, Passionate
   Best for: Psychology, Politics, Art History,
             Literature, Social Studies, Law
  ─────────────────────────────────────────*/
  crimsonNoir: {
    name: "Crimson Noir",
    background:    "#0D0608",
    backgroundAlt: "#140A0C",
    card:          "#1E0E12",
    border:        "#32161C",
    textPrimary:   "#F5EEE8",
    textSecondary: "#A07880",
    textMuted:     "#503840",
    accent1:       "#C0392B",   // Deep crimson
    accent2:       "#8B2020",   // Dark red
    highlight:     "#E85A4F",   // Bright red
    glow:          "rgba(192, 57, 43, 0.15)",
    fonts: {
      heading: "Playfair Display",  // weight: 400, 700
      body:    "Lora",              // weight: 400
      accent:  "Libre Baskerville", // labels
      mono:    "IBM Plex Mono"
    }
  },

  /*─────────────────────────────────────────
   PALETTE 4: "EMERALD ACADEMY"
   Mood: Natural, Balanced, Intellectual
   Best for: Environmental Science, Biology,
             Sustainability, Architecture, Health
  ─────────────────────────────────────────*/
  emeraldAcademy: {
    name: "Emerald Academy",
    background:    "#060F0A",
    backgroundAlt: "#0A1812",
    card:          "#0F2018",
    border:        "#1A3525",
    textPrimary:   "#E8F5EE",
    textSecondary: "#70A080",
    textMuted:     "#305040",
    accent1:       "#27AE60",   // Emerald green
    accent2:       "#1A7840",   // Deep forest
    highlight:     "#52C97A",   // Bright mint
    glow:          "rgba(39, 174, 96, 0.15)",
    fonts: {
      heading: "DM Serif Display",
      body:    "DM Sans",
      accent:  "Spectral",
      mono:    "Source Code Pro"
    }
  },

  /*─────────────────────────────────────────
   PALETTE 5: "AURORA VIOLET"
   Mood: Creative, Mystical, Innovative
   Best for: Arts, Design, Creativity, 
             Innovation, Cultural Studies
  ─────────────────────────────────────────*/
  auroraViolet: {
    name: "Aurora Violet",
    background:    "#080818",
    backgroundAlt: "#0D0D25",
    card:          "#141430",
    border:        "#222248",
    textPrimary:   "#F0EEF8",
    textSecondary: "#8878B0",
    textMuted:     "#404060",
    accent1:       "#7B5EA7",   // Violet
    accent2:       "#4A3478",   // Deep purple
    highlight:     "#A88FD4",   // Soft lavender
    glow:          "rgba(123, 94, 167, 0.15)",
    fonts: {
      heading: "Fraunces",       // Variable, elegant
      body:    "Outfit",
      accent:  "Josefin Sans",
      mono:    "Victor Mono"
    }
  }
}
```

### Palette Selection Rules
```
RULE 1: Match palette to subject matter (see "Best for" labels)
RULE 2: Never mix two palettes in one presentation
RULE 3: Always use CSS variables so palette can be swapped globally
RULE 4: The accent1 color should appear on ~10% of the page only
RULE 5: Background sections should alternate between 
        `background` and `backgroundAlt` for depth
```

---

## ✍️ SECTION 4: TYPOGRAPHY SYSTEM

```css
/* Typography Scale - Apply consistently */

/* DISPLAY - Hero titles only */
.text-display {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

/* H1 - Chapter/Section titles */
.text-h1 {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

/* H2 - Subsection titles */
.text-h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
}

/* LABEL - Small caps, eyebrow text */
.text-label {
  font-family: var(--font-accent);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent1);
}

/* BODY - Main content paragraphs */
.text-body {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 300;
  line-height: 1.8;
  color: var(--text-secondary);
}

/* QUOTE - Cinematic pull quotes */
.text-quote {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2.8rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.4;
}

/* CAPTION - Image captions, footnotes */
.text-caption {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
```

---

## 🏗️ SECTION 5: LAYOUT ARCHITECTURE

### Master Page Structure
```
PAGE STRUCTURE (in order):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[1]  PROGRESS BAR          ← Fixed, top of viewport
[2]  FLOATING NAV          ← Fixed, right side dots
[3]  HERO SECTION          ← 100vh, full screen opener
[4]  CHAPTER HEADER 01     ← Section divider
[5]  SPLIT CONTENT BLOCK   ← Image + Text (alternating sides)
[6]  CONCEPT CARDS ROW     ← 2-3 cards highlighting key ideas
[7]  CINEMATIC QUOTE       ← Full-width impactful quote
[8]  CHAPTER HEADER 02     ← Next section divider
[9]  SPLIT CONTENT BLOCK   ← Reversed: Text + Image
[10] DATA/DIAGRAM BLOCK    ← Charts, stats, visual data
[11] TIMELINE              ← Sequential information
[12] CHAPTER HEADER 03     ← Next section divider
[13] SPLIT CONTENT BLOCK   ← Normal orientation
[14] CONCEPT CARDS ROW     ← Additional key points
[15] CINEMATIC QUOTE       ← Second quote
[16] CONCLUSION SECTION    ← Summary + key takeaways
[17] REFERENCES SECTION    ← Academic bibliography
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REPEAT PATTERN (for each chapter):
Chapter Header → Split Content → Cards → Quote
```

---

## 🧩 SECTION 6: COMPONENT SPECIFICATIONS

### Component 1: PROGRESS BAR
```tsx
/*
VISUAL: Thin line at very top of viewport
        Fills left-to-right as user scrolls
SPECS:
  - Height: 2px
  - Position: fixed, top: 0, z-index: 9999
  - Color: linear-gradient(to right, accent2, accent1, highlight)
  - Background track: border color (very subtle)
  - Animation: width tied to scroll percentage
*/

const ProgressBar = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setProgress((scrolled / total) * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9999]"
         style={{ background: 'var(--border)' }}>
      <div className="h-full transition-all duration-75"
           style={{
             width: `${progress}%`,
             background: 'linear-gradient(to right, var(--accent2), 
                          var(--accent1), var(--highlight))'
           }} />
    </div>
  )
}
```

### Component 2: FLOATING NAVIGATION
```
VISUAL: Vertical dots on right side of screen
        Each dot = one section
        Active dot is larger and colored
        Hover shows section label tooltip

SPECS:
  - Position: fixed, right: 2rem, vertical center
  - Dot size inactive: 6px circle
  - Dot size active: 10px circle + glow ring
  - Dot color active: accent1
  - Dot color inactive: border color
  - Tooltip: appears on hover, text-label style
  - Smooth scroll to section on click
  - Gap between dots: 16px
```

### Component 3: HERO SECTION
```
VISUAL DESCRIPTION:
  Full viewport height. Dark, atmospheric.
  Subtle animated gradient or particle background.
  Large cinematic title. Subtitle line. Scroll indicator.

LAYOUT:
┌──────────────────────────────────────────────┐
│  [LABEL: COURSE NAME / TOPIC CATEGORY]       │
│                                              │
│                                              │
│  PRESENTATION                                │
│  TITLE IN                                    │
│  LARGE TYPE                                  │
│                                              │
│  Subtitle or brief description line here     │
│                                              │
│  Author Name  ·  Date  ·  Institution        │
│                                              │
│                          ↓ scroll to explore │
└──────────────────────────────────────────────┘

BACKGROUND OPTIONS (choose one per presentation):
  A) Subtle noise texture overlay on solid color
  B) Very slow-moving radial gradient animation
  C) CSS grid/dot pattern with low opacity
  D) Blurred abstract image with dark overlay (0.85 opacity)

ANIMATIONS:
  - Title: fades up, staggered by word (delay: 0.1s per word)
  - Subtitle: fades in after title (delay: 0.8s)
  - Author line: fades in last (delay: 1.2s)
  - Scroll indicator: bouncing arrow, infinite loop

CSS SPECIFICS:
  - Title gradient: linear-gradient(135deg, 
      var(--text-primary) 60%, var(--highlight))
  - Apply: -webkit-background-clip: text
```

### Component 4: CHAPTER HEADER
```
VISUAL DESCRIPTION:
  Full-width section break. Large number on left.
  Title text. Thin accent line. Short description.

LAYOUT:
┌──────────────────────────────────────────────┐
│                                              │
│  0 1  ─────────────────────────────          │ 
│                                              │
│  CHAPTER TITLE                               │
│  IN LARGE TYPE                               │
│                                              │
│  Brief one or two sentence description       │
│  of what this chapter covers.                │
│                                              │
└──────────────────────────────────────────────┘

SPECS:
  - Section number: font-size 8rem, opacity 0.08, 
    color: accent1, position absolute top-right
  - Horizontal rule: 1px, gradient from accent1 to transparent
  - Background: alternates between bg and bgAlt
  - Padding: 8rem vertical, constrained width container
  - Chapter label: text-label style above number
  - Entrance animation: number slides in from right,
    title fades up from bottom
```

### Component 5: SPLIT CONTENT BLOCK ⭐ (Primary Content Unit)
```
VISUAL DESCRIPTION:
  Two-column layout. Visual media on one side.
  Rich text content on the other. Numbered.
  
LAYOUT (Variant A - Image Left):
┌─────────────────┬──────────────────────────────┐
│                 │  [LABEL: KEY CONCEPT]         │
│   [IMAGE /      │                               │
│    DIAGRAM /    │  Section Title                │
│    VIDEO]       │  In Heading Type              │
│                 │                               │
│    [●  1  ]     │  Body text paragraph that     │
│   (number       │  explains the concept in      │
│    badge)       │  academic detail. Written     │
│                 │  clearly and precisely.       │
│                 │                               │
│                 │ ┌─────────────────────────┐  │
│                 │ │ KEY INSIGHT              │  │
│                 │ │ Highlighted callout box  │  │
│                 │ │ with key information     │  │
│                 │ └─────────────────────────┘  │
└─────────────────┴──────────────────────────────┘

LAYOUT (Variant B - Text Left): Mirror of above

ALTERNATION RULE: 
  Odd chapters: Image Left
  Even chapters: Image Right
  This creates visual rhythm as user scrolls

IMAGE CONTAINER SPECS:
  - Border-radius: 16px
  - Background: card color
  - Subtle inner shadow
  - Optional: thin border with border color
  - Aspect ratio: 4/3 or 1/1
  - Image styling: Must use `object-contain p-4` (never `object-cover`) to ensure image is not cropped and sits within the container gracefully
  - Number badge: 
      Positioned bottom-right of image
      Size: 64px circle
      Background: accent1
      Font: heading, large weight
      Has glow effect using glow color variable

CONTENT SIDE SPECS:
  - Padding: generous (2-4rem)
  - Label above title (text-label style)
  - Title: text-h1 style
  - Body: text-body style (2-3 paragraphs max)
  - Key Insight Box:
      Background: card color
      Left border: 3px solid accent1  
      Border-radius: 8px
      Label: "KEY INSIGHT" or "KEY COMPONENTS" or "IMPORTANT"
      Text: accent1 colored label, normal body text below

SCROLL ANIMATION:
  - Image side: slides in from its side (left or right)
  - Content side: fades up with slight delay
  - Trigger: when element is 20% in viewport
```

### Component 6: CONCEPT CARDS ROW
```
VISUAL DESCRIPTION:
  Row of 2-4 cards. Each highlights one key concept.
  Dark card surface. Accent-colored icon or number.
  
LAYOUT (3 cards example):
┌─────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  [ICON/NUM]  │  │  [ICON/NUM]  │  │ [ICON/NUM] │ │
│  │              │  │              │  │            │ │
│  │  Card Title  │  │  Card Title  │  │ Card Title │ │
│  │              │  │              │  │            │ │
│  │  Short desc  │  │  Short desc  │  │ Short desc │ │
│  │  of concept  │  │  of concept  │  │ of concept │ │
│  │              │  │              │  │            │ │
│  │  Learn more →│  │  Learn more →│  │ Learn more→│ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
└─────────────────────────────────────────────────────┘

CARD SPECS:
  - Background: card color
  - Border: 1px solid border color
  - Border-radius: 16px
  - Hover: border changes to accent1, 
           glow shadow appears (NO translational movement)
  - Icon/Number: 
      48px container, accent1 background at 15% opacity
      Icon or number in accent1 color
  - Title: h2 style but smaller
  - Description: body text, 2-4 lines
  - Arrow link: accent1 color, appears on hover

ANIMATION:
  - Cards animate in with stagger (0.1s delay between each)
  - Each card fades + slides up from below
  - Hover effects use CSS transitions (0.3s ease)
```

### Component 7: CINEMATIC QUOTE
```
VISUAL DESCRIPTION:
  Full-width, atmospheric section. Large italic quote.
  Author attribution. Subtle visual texture or gradient.

LAYOUT:
┌──────────────────────────────────────────────────────┐
│                                                      │
│                                                      │
│    "The quote text appears here in large             │
│     italic heading typography spanning               │
│     most of the viewport width."                     │
│                                                      │
│                          — Author Name, Year         │
│                                                      │
│                                                      │
└──────────────────────────────────────────────────────┘

SPECS:
  - Background: backgroundAlt
  - OR: background: linear-gradient with glow color subtle
  - Quotation mark: " character, font-size 12rem,
    position absolute, opacity 0.05, accent1 color
  - Quote text: text-quote style, max-width 70%
  - Attribution: text-label style, accent1 color
  - Horizontal accent line: 60px, accent1 color, 
    above attribution
  - Padding: 10rem vertical

ANIMATION:
  - Quote text: fades in, slight scale from 0.98 to 1
  - Attribution: fades in after quote (delay: 0.4s)
  - Parallax: quote moves slightly on scroll (subtle)
```

### Component 8: DATA BLOCK
```
VISUAL DESCRIPTION:
  Section for displaying statistics, charts, diagrams.
  Grid of stat numbers or embedded chart component.

STAT GRID LAYOUT:
┌──────────────────────────────────────────────────┐
│  [SECTION LABEL]                                 │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │          │  │          │  │          │       │
│  │  94%     │  │  12K+    │  │  2050    │       │
│  │          │  │          │  │          │       │
│  │  Label   │  │  Label   │  │  Label   │       │
│  │  for     │  │  for     │  │  for     │       │
│  │  stat    │  │  stat    │  │  stat    │       │
│  └──────────┘  └──────────┘  └──────────┘       │
└──────────────────────────────────────────────────┘

STAT NUMBER SPECS:
  - Font: heading family
  - Size: clamp(3rem, 6vw, 5rem)
  - Color: highlight color (brightest accent)
  - Animation: count up from 0 when enters viewport
  - Label below: text-label style

DIAGRAM CONTAINER:
  - Background: card color
  - Border-radius: 16px
  - Padding: 2rem
  - Caption below: text-caption style
  - Source citation: very small, text-muted
```

### Component 9: TIMELINE
```
VISUAL DESCRIPTION:
  Vertical timeline with alternating left-right content.
  Accent-colored line and nodes. Date labels prominent.

LAYOUT:
        [DATE]          [DATE]          [DATE]
          ●───────────────●───────────────●
          │               │               │
     ┌────┴────┐     ┌────┴────┐     ┌────┴────┐
     │ EVENT   │     │ EVENT   │     │ EVENT   │
     │ TITLE   │     │ TITLE   │     │ TITLE   │
     │         │     │         │     │         │
     │ Brief   │     │ Brief   │     │ Brief   │
     │ desc    │     │ desc    │     │ desc    │
     └─────────┘     └─────────┘     └─────────┘

SPECS:
  - Line: 1px, gradient along accent colors
  - Nodes: 12px circles, accent1 filled, glow effect
  - Date: text-label style, above node
  - Cards: card background, border-radius 12px
  - Animation: nodes appear one by one as user scrolls
```

### Component 10: CONCLUSION SECTION
```
VISUAL DESCRIPTION:
  Atmospheric closing section. Summary. 
  Key takeaways list. Visual closing element.

LAYOUT:
┌──────────────────────────────────────────────────┐
│  [LABEL: CONCLUSION]                             │
│                                                  │
│  Closing Title Statement                         │
│  In Large Type                                   │
│                                                  │
│  Summary paragraph that synthesizes all the     │
│  information presented throughout this work.    │
│                                                  │
│  KEY TAKEAWAYS                                   │
│  ─────────────                                   │
│  → First key takeaway from the presentation     │
│  → Second key takeaway from the presentation    │
│  → Third key takeaway from the presentation     │
│                                                  │
│  [Optional: Related resources or next steps]    │
└──────────────────────────────────────────────────┘

SPECS:
  - Background: backgroundAlt with subtle texture
  - Takeaway items: 
      Left: 2px accent1 line
      Arrow: accent1 color
      Text: body style
      Each item has slight left padding
  - Bottom ornament: small decorative element 
    (thin line with diamond, or minimal logo)
```

### Component 11: REFERENCES SECTION
```
VISUAL DESCRIPTION:
  Clean, minimal academic bibliography.
  Organized, legible, unobtrusive.

LAYOUT:
┌──────────────────────────────────────────────────┐
│  [LABEL: BIBLIOGRAPHY]                           │
│                                                  │
│  References                                      │
│                                                  │
│  [A]                                             │
│  Author, A. A. (Year). Title of work:            │
│  Subtitle. Publisher. DOI/URL                    │
│                                                  │
│  [B]                                             │
│  Author, B. B. & Author, C. C. (Year)...        │
│                                                  │
└──────────────────────────────────────────────────┘

SPECS:
  - Use APA 7th edition format by default
  - Or specify: APA / MLA / Chicago / Vancouver
  - Font: mono font family for references
  - Letter headers (A, B, C...): accent1 color
  - Each entry: subtle bottom border separator
  - Hanging indent: standard bibliography format
  - Clickable DOI/URLs: accent1 color, underline on hover
```

---

## 🎬 SECTION 7: ANIMATION SYSTEM

```typescript
// animations.ts - Reusable Framer Motion variants

export const animations = {
  
  // Fade up - most common entrance
  fadeUp: {
    hidden:  { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  },

  // Slide in from left
  slideLeft: {
    hidden:  { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  },

  // Slide in from right
  slideRight: {
    hidden:  { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  },

  // Scale fade - for cards
  scaleFade: {
    hidden:  { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },

  // Stagger container - for card rows
  staggerContainer: {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  },

  // Count up animation (for statistics)
  countUp: {
    initial: 0,
    // Use useMotionValue + useTransform + animate
    // Trigger when enters viewport
  }
}

/*
ANIMATION RULES:
  1. ALL animations trigger on scroll entry (Intersection Observer)
  2. Threshold: element 15% visible before triggering
  3. Animations play ONCE, do not reverse on scroll out
  4. Duration range: 0.5s - 1.0s maximum
  5. Easing: always use ease-out or custom cubic-bezier
  6. NO infinite animations except: 
     - Hero scroll indicator (bounce)
     - Progress bar
     - Subtle background gradients
  7. Respect prefers-reduced-motion:
     @media (prefers-reduced-motion: reduce) {
       → Set all animations to instant (duration: 0.001s)
     }
*/
```

---

## 📐 SECTION 8: SPACING & SIZING SYSTEM

```css
/* Consistent spacing tokens */
:root {
  /* Section padding */
  --section-py:    8rem;    /* vertical padding for sections */
  --section-py-lg: 12rem;   /* larger sections (hero, quote) */
  --container:     90rem;   /* max content width */
  --container-narrow: 70rem; /* for text-heavy sections */
  
  /* Component spacing */
  --gap-cards:     1.5rem;
  --gap-sections:  2rem;
  --card-radius:   16px;
  --card-padding:  2rem;
  
  /* Border widths */
  --border-thin:   1px;
  --border-accent: 3px;
  --border-glow:   0 0 20px var(--glow);
}

/* Grid systems */
.split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.cards-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-cards);
}

.cards-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-cards);
}

/* Responsive breakpoints */
@media (max-width: 768px) {
  .split-grid     { grid-template-columns: 1fr; }
  .cards-grid-3   { grid-template-columns: 1fr; }
  .cards-grid-2   { grid-template-columns: 1fr; }
  --section-py:    4rem;
}
```

---

## 📝 SECTION 9: CONTENT WRITING RULES

```
ACADEMIC WRITING STANDARDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Third person perspective (generally)
  ✓ Precise, specific language
  ✓ Evidence-based statements with citations
  ✓ Formal but accessible register
  ✓ Defined terminology
  ✓ Clear logical progression
  ✗ Avoid: colloquialisms, vague language
  ✗ Avoid: unsupported claims
  ✗ Avoid: excessive jargon without definition

CONTENT LENGTH PER COMPONENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Hero subtitle:        1 sentence (15-25 words)
  Chapter description:  2 sentences (25-40 words)
  Split content body:   2-3 paragraphs (80-150 words each)
  Key insight box:      1-2 sentences (20-35 words)
  Card description:     2-4 lines (30-50 words)
  Quote:                1-3 sentences (20-50 words)
  Conclusion summary:   1 paragraph (80-120 words)
  Takeaway items:       1 sentence each (10-20 words)

SECTION LABELS (use text-label style):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Use these consistently as eyebrow labels:
  • "CHAPTER 01 — INTRODUCTION"
  • "KEY CONCEPT"
  • "CORE PRINCIPLE"
  • "THEORETICAL FRAMEWORK"
  • "EMPIRICAL EVIDENCE"
  • "CRITICAL ANALYSIS"
  • "CASE STUDY"
  • "METHODOLOGY"
  • "KEY COMPONENTS"
  • "CONCLUSION"
  • "BIBLIOGRAPHY"
```

---

## ✅ SECTION 10: QUALITY CHECKLIST

```
Before delivering any presentation, verify ALL of the following:

VISUAL QUALITY:
  □ Single palette applied consistently throughout
  □ No color used outside the palette system
  □ Font hierarchy respected (display→h1→h2→body→label)
  □ Consistent spacing using spacing tokens
  □ All sections have adequate breathing room
  □ Dark/light alternation between sections is consistent
  □ Accent color appears sparingly (~10% of page)
  □ All images have proper border-radius and containers

ANIMATION QUALITY:
  □ All components have scroll-triggered entrance animations
  □ No animation exceeds 1 second duration
  □ Stagger applied to all card groups
  □ prefers-reduced-motion respected
  □ Progress bar works correctly
  □ Floating nav dots correctly indicate active section
  □ Smooth scroll behavior on nav dot click

ACADEMIC QUALITY:
  □ All claims are supported or attributed
  □ Citations present where needed
  □ References section uses correct citation format
  □ Language is formal and precise
  □ Logical flow from introduction → body → conclusion
  □ Key terms are defined when first introduced

TECHNICAL QUALITY:
  □ Fully responsive (mobile, tablet, desktop)
  □ Images use Next/Image with proper alt text
  □ Semantic HTML elements used (section, article, etc.)
  □ Page loads in under 3 seconds
  □ No console errors or warnings
  □ Fonts loaded via next/font (no layout shift)
  □ All interactive elements have hover states
  □ Keyboard navigable
```

---

## 🚫 SECTION 11: DO'S AND DON'TS

```
✅ DO:
  • Keep dark backgrounds, never use white backgrounds
  • Let content breathe with generous padding
  • Use the accent color to guide the eye to key info
  • Write labels in ALL CAPS with letter-spacing
  • Make every section feel intentional and crafted
  • Test scroll animations at different scroll speeds
  • Use real academic content, never lorem ipsum
  • Keep typography hierarchy strict and consistent
  • Add subtle texture (noise/grain) to backgrounds
  • Ensure every number badge and label is meaningful

❌ DON'T:
  • Don't use more than 2 font weights per typeface
  • Don't add decorative elements without purpose
  • Don't use bright white (#FFFFFF) anywhere
  • Don't mix font families from different palettes
  • Don't create sections longer than the viewport × 1.5
  • Don't use hover animations that cause layout shifts or translational movement (e.g., hover:-translate-y-1)
  • Don't animate on hover AND on scroll simultaneously
  • Don't use drop shadows (use glows with accent colors instead)
  • Don't place text over busy imagery without dark overlay
  • Don't use more than 3 columns on any card grid
  • Don't skip the references section for academic content
```

---

## 🚀 SECTION 12: DEPLOYMENT INSTRUCTIONS

```bash
# Agent should always provide these steps:

1. Initialize project:
   npx create-next-app@latest [presentation-name] \
     --typescript --tailwind --app --src-dir=false

2. Install dependencies:
   npm install framer-motion gsap scrollama lucide-react

3. Install fonts (in layout.tsx):
   Use next/font/google - import specified palette fonts

4. Set environment:
   # .env.local
   NEXT_PUBLIC_PALETTE=obsidianGold  # chosen palette name

5. Deploy to Vercel:
   npx vercel --prod
   
   # Result: live URL shareable with anyone
   # Format: https://[name].vercel.app
```

---

## 📌 SECTION 13: EXAMPLE INVOCATION

```
HOW TO INVOKE THIS AGENT:

User prompt format:
"Create a scrollytelling presentation on [TOPIC]
 using the [PALETTE NAME] palette.
 The presentation covers:
   - Chapter 1: [topic]
   - Chapter 2: [topic]  
   - Chapter 3: [topic]
 Citation style: [APA/MLA/Chicago]
 Target audience: [undergraduate/graduate/professional]"

Agent response should include:
  1. Complete Next.js project structure
  2. All component files with full code
  3. globals.css with CSS variables for chosen palette
  4. Content written to academic standards
  5. Deployment instructions
  6. Preview description of each section's visual appearance
```