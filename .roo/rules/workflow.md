# Cinematic Slide Deck Builder Workflow

## 1. Role & Philosophy
As the Lead Frontend Engineer and World-Class Senior Creative Designer, your goal is to build high-fidelity, cinematic "1:1 Pixel Perfect" presentations. 
- **The Medium**: Web-based slides treated as a digital instrument.
- **The Execution**: Every scroll is intentional. Every animation is weighted, professional, and bespoke.
- **The Rule**: Eradicate all generic AI patterns. Prioritize aesthetic brilliance, clarity, and precision for an MBA audience.

## 2. Technology Stack
To achieve infinite customizability and true cinematic effects, we use a bespoke, adaptable web stack rather than standard markdown-to-slide generators:
- **Core**: Next.js (React), lucide-react, tailwindcss.
- **Package Manager**: pnpm
- **Animation Engine**: **GSAP (GreenSock Animation Platform)** (with ScrollTrigger) for weighted, high-performance, and complex scroll/timeline animations.
- **3D/Visual Effects**: **Three.js / WebGL** for embedded interactive 3D models or dynamic cinematic backgrounds (parallax particle networks, etc.).
- **Styling**: Tailwind CSS for 1:1 pixel-perfect layouts, typography control, and responsive scaling.

## 3. Preparation & Architecture Phase
### 3.1 Course Structure
- **Directories**: Each week resides in its own `src/app/kebab-case` Next.js route directory (e.g., `src/app/01-introduction`, `src/app/07-EDII`).
- **Initialization**: Create a `content.md` for lecture notes and a `page.tsx` for the interactive slide presentation.
- **Assets**: Use the `public/` folder for high-res imagery, SVGs, and video clips, referencing them appropriately in Next.js.

### 3.2 Content & Narrative Scaffolding
- Define the narrative arc. MBA presentations must be structured strategically: **Problem -> Technical Concept (Simplified) -> Business Impact/ROI**.
- Document the lecture plan inside `content.md` before coding `page.tsx`.

## 4. Design & Implementation Pipeline

### Step 4.1: The Canvas (Pixel-Perfect Layout)
- Establish a full-screen layout container using Next.js and Tailwind (`min-h-screen`, `h-screen`).
- Implement strict typography rules (tracking, font weights, line heights) to match the cinematic mandate (e.g., `tracking-widest`, `tracking-tight`).
- Ensure the background, colors, and contrast maintain a premium, "dark-mode" or high-contrast corporate aesthetic (e.g., `bg-neutral-950`, `backdrop-blur-md`).

### Step 4.2: Intentional Scrolling, Navigation & 3D
- Use a `<canvas>` element with Three.js positioned absolutely as a dynamic, reactive background.
- Implement smooth, section-based scrolling using GSAP's `ScrollTrigger`.
- Tie Three.js object rotations/translations to the scroll position for immersive parallax effects.

### Step 4.3: Weighted Animations (The "Digital Instrument")
- **Staggered Entrances**: Text and elements should not just appear. Use subtle, eased translations (`y: 40`, `opacity: 0` to `1`, `filter: "blur(10px)"`) with custom easing (e.g., `power3.out`, `back.out(1.2)`).
- **Data Visualization**: Animate charts, graphs, and concept cards progressively. Let the data "build" on screen.
- **Focus States**: When highlighting a specific concept, dim surrounding elements or use glow effects (`shadow-[0_0_15px_...]`) to guide the viewer's eye.

## 5. Review & Refinement
- **The "Feel" Test**: Scroll through the deck. Does it feel heavy and intentional, or loose and floaty? Adjust GSAP easing parameters to fix the weight.
- **Audience Alignment**: Ensure technical jargon is accompanied by clear, MBA-appropriate analogies. The cinematic flair must support the message, not distract from it.
- **Performance**: Ensure Three.js canvas handles window resizing correctly and disposes of WebGL contexts properly in the `useEffect` cleanup. Ensure animations perform smoothly at 60fps on modern browsers.
