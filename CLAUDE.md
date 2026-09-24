# Creating the slides page.tsx

You should never change the words or sentences of the content.md
The content should be preserved.
You only can create the slides **using** the content. 

# Exercise rules

A topic tagged `[exercise]` in content.md gets one exercise; a topic tagged `[no-exercise]` gets none.

Exercises come after the topic they test has been introduced in the content.

Only test information students have already learned. Never test something they haven't been taught yet.

## Choosing the exercise

For each `[exercise]` topic, pick the one exercise type that best fits what that topic teaches. Let the shape of the content decide, and prefer the type that makes students use the idea rather than recall a sentence. Choose from the types that are built:

- **Quiz** (`quiz`): a multiple-choice question. Best for applying one idea to a new case or scenario.
- **Match-up** (`match`): pair each term with its example or definition. Best for a set of named parts (roles, bases, types).
- **Sort into groups** (`sort`): place cards into two or three groups. Best for a distinction (need or want, customer or consumer) or for assigning moments to stages.
- **Put it in order** (`order`): arrange steps or events into a sequence. Best for a process or a timeline, especially one with four or more steps.
- **Which one is it?** (`identify`): a run of short cases, each named with one concept from a shared set. Best for telling several look-alike concepts apart in real situations.

Choose by fit, not by rotation. Variety across a week is welcome when several types suit the content equally well. Cases, cards and examples should be new everyday situations that apply what the slide taught, so students recognise the idea rather than repeat the slide's sentences.

These types are planned but not built yet, so leave them for now: **spot it in the scene** (tap the parts of a drawing that show the concept), **place it on a scale** (set an item between two poles and compare with the class) and **class poll** (everyone answers and the results appear together).

## Where exercises live

Each week keeps its exercises in `exercises.json` beside its `page.tsx`, one entry per `[exercise]` topic, keyed by the slide's `id`. The data shape of every type is defined in `src/lib/course-exercise.ts`, and the shared components in `src/components/exercises/` render them. A slide shows its exercise with `exercise={exercise["<slide-id>"]}`, and it appears on its own screen right after that slide. These components serve every course through the shared `Slide`; courses with their own slide components keep their quizzes until they move to the shared ones.

# Slide density

Each topic in content.md should read as one slide, not a scroll of screens. Keep slides content dense: every visual has to earn its space, and related ideas belong together, not spread out. How to achieve that is a design choice, slide by slide. Never cut or reword content to make a slide fit.

# Slide height

Every slide (the title or hero, section and chapter openers, content slides, discussion and exercise slides, and the summary) fits one screen: `min-h-svh` on its section, with the content centred vertically (`flex flex-col justify-center`), and the next slide starts on a fresh screen. Exercise screens start from a fixed top instead of being centred, so the prompt and the answer areas stay still while students work.

Lay each slide out to fit a 1440×900 screen at full size. `FitSlides` (`src/components/slide-components/FitSlides.tsx`) adapts it to other screens: drawings and images shrink first, then the whole slide zooms, down to 60%. Every course layout renders `<FitSlides />`, and every slide section carries `data-slide`. Visuals are `svg[role=img]` or `img` so they can shrink. A slide that still runs past the screen holds too much for one screen and gets a density pass.

# Visual style

Each course keeps its own drawing and style rules in a `CLAUDE.md` inside its folder (for example `src/app/(courses-cb)/courses/consumer-behavior/CLAUDE.md`). Follow the file for the course you are working on, and never carry one course's style into another.
