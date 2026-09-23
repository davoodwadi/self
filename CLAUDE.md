# Creating the slides page.tsx

You should never change the words or sentences of the content.md
The content should be preserved.
You only can create the slides **using** the content. 

# Exercise rules

A topic tagged `[exercise]` in content.md gets one exercise; a topic tagged `[no-exercise]` gets none.

Exercises come after the topic they test has been introduced in the content.

Only test information students have already learned. Never test something they haven't been taught yet.

## Choosing the exercise

For each `[exercise]` topic, pick the one exercise type that best fits what that topic teaches. Let the shape of the content decide, and prefer the type that makes students use the idea rather than recall a sentence:

- **Quiz**: a multiple-choice question. Best for applying an idea to a new case or scenario.
- **Match-up**: pair each term with its example, drawing or definition. Best for a set of named parts (roles, bases, stages).
- **Sort into bins**: drop cards into two or three groups. Best for a distinction (need or want, customer or consumer).
- **Put it in order**: arrange steps or events into a sequence. Best for a process or a timeline.
- **Spot it in the scene**: tap the parts of a drawing that show the concept. Best for ideas students can see in a real situation.
- **Which one is it?**: a short case or persona, and students name the concept it shows. Best for recognising a concept in a described person, brand or situation.
- **Place it on a scale**: set an item on a line between two poles, then compare with the class. Best for ideas of degree, and for opening discussion.
- **Class poll**: everyone answers and the results appear together. Best for discussion prompts and personal reflection, where no answer is wrong.

Choose by fit, not by rotation. Variety across a week is welcome when several types suit the content equally well.

# Slide density

Each topic in content.md should read as one slide, not a scroll of screens. Keep slides content dense: every visual has to earn its space, and related ideas belong together, not spread out. How to achieve that is a design choice, slide by slide. Never cut or reword content to make a slide fit.

# Slide height

Every slide (the title or hero, section and chapter openers, content slides, discussion and exercise slides, and the summary) fills at least one screen: `min-h-svh` on its section, with the content centred vertically (`flex flex-col justify-center`). A slide with more content grows taller than the screen, and the next slide starts on a fresh screen. Exercise screens start from a fixed top instead of being centred, so the prompt and the answer areas stay still while students work.

# Visual style

Each course keeps its own drawing and style rules in a `CLAUDE.md` inside its folder (for example `src/app/(courses-cb)/courses/consumer-behavior/CLAUDE.md`). Follow the file for the course you are working on, and never carry one course's style into another.
