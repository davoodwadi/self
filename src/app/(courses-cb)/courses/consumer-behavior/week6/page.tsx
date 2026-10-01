"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import * as V from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 06 — ATTITUDES AND PERSUASION
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md). The week's marks stay fixed: heart = affect, thought cloud =
// cognition, bag = behavior.
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
//
// Interactive: the measuring slide's plate (V.AskTwoModels) lets students ask
// two simulated models the same item once or many times, and read the
// probabilities behind the answers.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise, of the type that fits
// it, testing that slide and the ones before it.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** Content slides trim the deck's outer padding so each topic fits one screen. */
const TIGHT = "md:!py-16";

type Tone = "signal" | "counter" | "ink";

const BORDER: Record<Tone, string> = {
  signal: "border-[var(--signal)]",
  counter: "border-[var(--counter)]",
  ink: "border-[var(--ink)]",
};

const TEXT: Record<Tone, string> = {
  signal: "text-[var(--signal)]",
  counter: "text-[var(--counter)]",
  ink: "text-[var(--ink)]",
};

/** One verbatim line at reading size. */
function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("type-body max-w-[var(--measure)]", className)}
    >
      {children}
    </p>
  );
}

/** A line promoted to lead size. */
function Lead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-lead max-w-[48ch]", className)}>
      {children}
    </p>
  );
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-quote max-w-[30ch]", className)}>
      {children}
    </p>
  );
}

/** A line at h2 size. */
function Big({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-h2 !font-normal", className)}>
      {children}
    </p>
  );
}

/** Coloured term inside a line. */
function Term({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <strong className={cn("font-semibold", TEXT[tone])}>{children}</strong>
  );
}

/** Inline colour for a phrase inside a serif line. */
function Tint({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return <span className={TEXT[tone]}>{children}</span>;
}

/** Hairline-topped block. */
function Ruled({
  tone = "ink",
  children,
  className = "",
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 border-t-2 pt-5",
        BORDER[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A plate that lives in a column: a figure well without the 680px floor. A
 * `wide` (800-unit) plate keeps a legible minimum width on phones and scrolls
 * inside its well there, like `Figure`; from lg up the column is wide enough.
 */
function Plate({
  children,
  wide = false,
  className = "",
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "figure-well w-full min-w-0 p-3",
        wide && "overflow-x-auto",
        className,
      )}
    >
      {wide ? (
        <div className="min-w-[480px] lg:min-w-0">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Slide heading. A "Label:" prefix from the content is set as a small tracked
 * kicker inside the same h2, so the heading text stays exactly as written.
 */
function Heading({
  kicker,
  children,
  tone = "signal",
  className = "",
}: {
  kicker?: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
  className?: string;
}) {
  return (
    <div className="mb-6 w-full">
      <h2 className={cn("type-h1 max-w-[32ch]", className)}>
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label mb-4 block !text-[0.8rem]",
                "!text-[var(--ink-3)]",
              )}
            >
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-3 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Ruled lines in a grid, each followed by its own plate. */
function Cells({
  cols = 2,
  items,
  className = "",
}: {
  cols?: 2 | 3 | 4 | 5;
  items: {
    key: string;
    tone: Tone;
    plate: React.ReactNode;
    text: React.ReactNode;
  }[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid w-full gap-10 md:grid-cols-2 md:gap-x-8 lg:gap-x-6 lg:gap-y-6",
        {
          2: "md:gap-x-10",
          3: "lg:grid-cols-3",
          4: "lg:grid-cols-4",
          5: "lg:grid-cols-5",
        }[cols],
        className,
      )}
    >
      {items.map((s) => (
        <li key={s.key} className="flex min-w-0 flex-col gap-3">
          <div className={cn("border-t-2 pt-3", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
          <div className="figure-well mt-auto w-full min-w-0 p-3">
            {s.plate}
          </div>
        </li>
      ))}
    </ol>
  );
}


/** A ruled line with its plate beside it, for rows of text-and-picture pairs. */
function SideCell({
  plate,
  children,
  plateClass = "",
  className = "",
}: {
  plate: React.ReactNode;
  children: React.ReactNode;
  plateClass?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-w-0 items-center gap-4 border-t-2 border-[var(--ink)] pt-3 sm:grid-cols-[1fr_1.15fr]",
        className,
      )}
    >
      <p className="type-body min-w-0">{children}</p>
      <div className={cn("figure-well w-full min-w-0 p-2", plateClass)}>{plate}</div>
    </div>
  );
}

export default function Week6() {
  return (
    <SlideDeck label="Week 06">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 06
            </p>
            <p className="type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-6 !max-w-[18ch]">Attitudes and Persuasion</Title>
            <div className="mt-8 max-w-[40ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
                <span className="text-[var(--ink-3)]">
                  Consumers do not just evaluate products.
                </span>{" "}
                They <Tint>feel, think, and act</Tint> toward them.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[360px]">
            <V.FeelThinkAct />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Are Consumer Attitudes?
          ================================================================ */}
      <Slide className={TIGHT} id="what-are-consumer-attitudes" border>
        <Heading>What Are Consumer Attitudes?</Heading>
        {/* Split screen: the definition and its range on the left; what an
            attitude does, for and against the consumer, stacked on the right. */}
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="!max-w-[30ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
              An attitude is a <Tint>lasting evaluation</Tint> of a person, object, or idea.
            </Statement>
            <Ruled tone="ink" className="!pt-3">
              <P>
                Attitudes can be <Term>favorable</Term>, <Term>unfavorable</Term>, or somewhere
                between the two.
              </P>
            </Ruled>
            <Plate>
              <V.Evaluations />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            <SideCell className="sm:grid-cols-[0.62fr_1.6fr]" plate={<V.SameBrandEveryWeek />}>
              They help consumers <Term>simplify repeated choices</Term>.
            </SideCell>
            <SideCell className="sm:grid-cols-[0.62fr_1.6fr]" plate={<V.ResistNew />}>
              They can also make consumers <Term>resist new information</Term>.
            </SideCell>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The ABC Model: Feeling, Doing, and Thinking
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-abc-model-feeling-doing-and-thinking"
        border
        exercise={exercise["the-abc-model-feeling-doing-and-thinking"]}
      >
        <Heading kicker="The ABC Model:">Feeling, Doing, and Thinking</Heading>
        <Cells
          cols={3}
          items={[
            {
              key: "affect",
              tone: "ink",
              plate: <V.AffectPlate />,
              text: (
                <>
                  <Term>Affect</Term> means feelings and emotions toward an object.
                </>
              ),
            },
            {
              key: "behavior",
              tone: "ink",
              plate: <V.BehaviorPlate />,
              text: (
                <>
                  <Term>Behavior</Term> means actions or intentions, such as buying, recommending,
                  or avoiding a brand.
                </>
              ),
            },
            {
              key: "cognition",
              tone: "ink",
              plate: <V.CognitionPlate />,
              text: (
                <>
                  <Term>Cognition</Term> means beliefs and thoughts about an object.
                </>
              ),
            },
          ]}
        />
        {/* The closing line, and the two scenes it names side by side. */}
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-10">
          <Ruled tone="ink">
            <Big className="!text-[clamp(1.3rem,1.9vw,1.65rem)]">
              The three parts often support each other, but they can also{" "}
              <Tint>conflict</Tint>.
            </Big>
          </Ruled>
          <Plate wide>
            <V.SupportConflict />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Four Functions of Attitudes
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="four-functions-of-attitudes"
        border
        exercise={exercise["four-functions-of-attitudes"]}
      >
        <Heading>Four Functions of Attitudes</Heading>
        {/* The four functions are one set, so they read as one strip. */}
        <Cells
          cols={4}
          items={[
            {
              key: "utilitarian",
              tone: "ink",
              plate: <V.UtilitarianPlate />,
              text: (
                <>
                  The <Term>utilitarian function</Term> helps consumers gain benefits or avoid
                  costs.
                </>
              ),
            },
            {
              key: "value-expressive",
              tone: "ink",
              plate: <V.ValueExpressivePlate />,
              text: (
                <>
                  The <Term>value-expressive function</Term> communicates identity, values, and
                  self-image.
                </>
              ),
            },
            {
              key: "ego-defensive",
              tone: "ink",
              plate: <V.EgoDefensivePlate />,
              text: (
                <>
                  The <Term>ego-defensive function</Term> protects self-esteem from uncomfortable
                  threats.
                </>
              ),
            },
            {
              key: "knowledge",
              tone: "ink",
              plate: <V.KnowledgePlate />,
              text: (
                <>
                  The <Term>knowledge function</Term> organizes information and makes the world
                  easier to understand.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          How Attitudes Form: Three Hierarchies
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="how-attitudes-form-three-hierarchies"
        border
        exercise={exercise["how-attitudes-form-three-hierarchies"]}
      >
        <Heading kicker="How Attitudes Form:">Three Hierarchies</Heading>
        {/* Three rows, one per hierarchy: the line, then its order drawn with
            the week's marks; the slide lands on what decides between them. */}
        <ol className="flex w-full flex-col gap-3">
          {[
            {
              key: "standard",
              plate: <V.StandardHierarchy />,
              text: (
                <>
                  The <Term>standard learning hierarchy</Term> is think, feel, then act.
                </>
              ),
            },
            {
              key: "low",
              plate: <V.LowInvolvementHierarchy />,
              text: (
                <>
                  The <Term>low-involvement hierarchy</Term> is think briefly, act, then develop a
                  feeling.
                </>
              ),
            },
            {
              key: "experiential",
              plate: <V.ExperientialHierarchy />,
              text: (
                <>
                  The <Term>experiential hierarchy</Term> is feel, act, then explain.
                </>
              ),
            },
          ].map((row) => (
            <li
              key={row.key}
              className="grid min-w-0 items-center gap-4 border-t border-[var(--ink)] pt-3 md:grid-cols-[1fr_1.5fr] md:gap-10"
            >
              <p className="type-lead min-w-0">{row.text}</p>
              <div className="figure-well w-full min-w-0 p-2">{row.plate}</div>
            </li>
          ))}
        </ol>
        <Ruled tone="ink" className="mt-5 w-full">
          <Statement className="!max-w-[52ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
            The hierarchy depends on the <Tint>product, the consumer, and the purchase situation</Tint>.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Who Delivers the Message Changes Its Impact
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="who-delivers-the-message-changes-its-impact"
        border
        exercise={exercise["who-delivers-the-message-changes-its-impact"]}
      >
        <Heading className="!max-w-none !text-[clamp(2rem,3.2vw,2.9rem)]">
          Who Delivers the Message Changes Its Impact
        </Heading>
        {/* Credibility and its two parts across the top; attractiveness and
            its three scenes across the bottom. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.6fr_2.4fr] lg:gap-10">
          <Statement className="!max-w-[22ch] !text-[clamp(1.4rem,2.2vw,1.9rem)]">
            Source credibility comes from <Tint>expertise and trustworthiness</Tint>.
          </Statement>
          <div className="grid min-w-0 gap-6 md:grid-cols-2">
            <SideCell className="sm:grid-cols-[0.75fr_1.5fr]" plate={<V.ExpertSource />}>
              <Term>Expertise</Term> makes a source seem knowledgeable.
            </SideCell>
            <SideCell className="sm:grid-cols-[0.75fr_1.5fr]" plate={<V.TrustworthySource />}>
              <Term>Trustworthiness</Term> makes a source seem honest and dependable.
            </SideCell>
          </div>
        </div>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[0.6fr_2.4fr] lg:gap-10">
          <Ruled tone="ink">
            <Lead>
              <Term>Source attractiveness</Term> comes from familiarity, likability, and
              similarity.
            </Lead>
          </Ruled>
          <Plate wide>
            <V.Attractiveness />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          AI as a Message Source: Aversion and Appreciation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="ai-as-a-message-source-aversion-and-appreciation"
        border
        exercise={exercise["ai-as-a-message-source-aversion-and-appreciation"]}
      >
        <Heading kicker="AI as a Message Source:">Aversion and Appreciation</Heading>
        <Lead className="!max-w-none">
          Consumers now receive advice from AI systems as well as from people.
        </Lead>
        {/* Aversion and appreciation, the opposite tendencies, side by side;
            then what decides between them, and what credibility still needs. */}
        <div className="mt-4 grid w-full gap-x-10 gap-y-5 lg:grid-cols-2">
          <SideCell plate={<V.SameMistake />}>
            <Term>Algorithm aversion</Term> is the tendency to trust an algorithm less than a
            person. After people see an algorithm make a mistake, they lose confidence in it faster
            than in a person who makes the same mistake (Dietvorst, Simmons, &amp; Massey, 2015).
          </SideCell>
          <SideCell plate={<V.FollowTheEstimate />}>
            <Term>Algorithm appreciation</Term> is the opposite tendency. In some tasks, such as
            numerical estimates, people follow advice more when they are told it comes from an
            algorithm than from a person (Logg, Minson, &amp; Moore, 2019).
          </SideCell>
          <SideCell plate={<V.ObjectiveSubjective />}>
            <Term tone="signal">The task matters.</Term> Consumers trust algorithms more for tasks
            that seem objective, such as calculating a loan payment, than for tasks that seem
            subjective, such as choosing a gift (Castelo, Bos, &amp; Lehmann, 2019).
          </SideCell>
          <SideCell plate={<V.WhoseInterests />}>
            Credibility still rests on <Term>expertise and trustworthiness</Term>. An AI source can
            seem expert but not trustworthy when consumers do not know whose interests it serves.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Framing Changes What the Audience Notices
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="framing-changes-what-the-audience-notices"
        border
        exercise={exercise["framing-changes-what-the-audience-notices"]}
      >
        <Heading>Framing Changes What the Audience Notices</Heading>
        {/* Two frames of one offer, in matching columns. */}
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <Lead>
                A <Term>positive frame</Term> emphasizes gains, benefits, or a desirable result.
              </Lead>
            </Ruled>
            <Plate>
              <V.PositiveFrame />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <Lead>
                A <Term>negative frame</Term> emphasizes losses, risks, or the problem that may
                follow inaction.
              </Lead>
            </Ruled>
            <Plate>
              <V.NegativeFrame />
            </Plate>
          </div>
        </div>
        <Statement className="mt-8 !max-w-[56ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
          Effective framing depends on the audience, the goal, and{" "}
          <Tint>whether the choice feels like a gain or a loss</Tint>.
        </Statement>
      </Slide>

      {/* ================================================================
          Measuring the Attitudes of AI Models
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="measuring-the-attitudes-of-ai-models"
        border
        exercise={exercise["measuring-the-attitudes-of-ai-models"]}
      >
        <Heading>Measuring the Attitudes of AI Models</Heading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <P className="!max-w-none">
            Researchers measure consumer attitudes with rating scales. A <Term>Likert scale</Term>{" "}
            asks how much a person agrees with a statement, for example from 1 (strongly disagree)
            to 7 (strongly agree).
          </P>
          <P className="!max-w-none">
            Researchers now give the same scales to AI models, because models that advise and shop
            for consumers may carry attitudes of their own.
          </P>
        </div>
        {/* The three lines the instrument lets students test (one answer
            varies, many answers settle, models differ) run across the slide;
            the instrument follows them, and the closing line sits beside it. */}
        <div className="mt-5 grid w-full gap-6 border-t-2 border-[var(--ink)] pt-3 md:grid-cols-3 md:gap-8">
          <P>
            A model does not give one fixed answer. Asked the same question many times, it can give
            a different rating each time (Wadi &amp; Fredette, 2025).
          </P>
          <P>
            A <Term tone="signal">single answer can therefore mislead</Term>. Reliable measurement
            asks the question many times, or reads the probability the model assigns to each point
            on the scale (Wadi, Ghodrat, &amp; Philp, 2026).
          </P>
          <P>
            Measured this way, models from different developers held different attitudes on the
            same consumer attitude scale (Wadi, Ghodrat, &amp; Philp, 2026).
          </P>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[2.4fr_1fr] lg:gap-10">
          <Plate wide>
            <V.AskTwoModels />
          </Plate>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>
                An attitude in a model is a <Term>pattern in its answers</Term>. It is not a feeling
                that the model experiences.
              </P>
            </Ruled>
            <Plate>
              <V.PatternNotFeeling />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-audit-a-persuasive-message" border>
        <Heading kicker="Discussion:" tone="counter">
          Audit a Persuasive Message
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>
            <ol className="flex flex-col gap-4">
              {[
                "Choose an advertisement or product recommendation.",
                "Identify its affect, behavior, and cognition elements.",
                "Identify the source and the message frame.",
                "Discuss whether a different audience would be persuaded by the same message.",
              ].map((line, i) => (
                <li key={i} className="flex gap-4">
                  <span className="type-label pt-1 !text-[0.8rem] !text-[var(--ink-3)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="type-quote !text-[clamp(1.15rem,1.7vw,1.5rem)]">{line}</p>
                </li>
              ))}
            </ol>
          </div>
          <Plate wide>
            <V.AuditAd />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
