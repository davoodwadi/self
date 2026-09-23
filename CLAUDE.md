# Creating the slides page.tsx

You should never change the words or sentences of the content.md
The content should be preserved.
You only can create the slides **using** the content. 

# Quiz rules

Quizzes must come after the topic they test has been introduced in the content.

Only test information students have already learned. Never test something they haven't been taught yet.

# Slide density

Each topic in content.md should read as one slide, not a scroll of screens. Keep slides content dense: every visual has to earn its space, and related ideas belong together, not spread out. How to achieve that is a design choice, slide by slide. Never cut or reword content to make a slide fit.

# Slide height

Every slide (the title or hero, section and chapter openers, content slides, discussion and quiz slides, and the summary) fills at least one screen: `min-h-svh` on its section, with the content centred vertically (`flex flex-col justify-center`). A slide with more content grows taller than the screen, and the next slide starts on a fresh screen.

# Visual style

Each course keeps its own drawing and style rules in a `CLAUDE.md` inside its folder (for example `src/app/(courses-cb)/courses/consumer-behavior/CLAUDE.md`). Follow the file for the course you are working on, and never carry one course's style into another.
