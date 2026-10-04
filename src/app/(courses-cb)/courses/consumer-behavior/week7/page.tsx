"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import {
  createExerciseLookup,
  type ExerciseInput,
} from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import * as V from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 07 — THE CONSUMER DECISION-MAKING PROCESS
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md). The week's fixed cast: the shopper (one Person look), the AI
// agent (a phone with the sparkle) and the coffee jar.
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
//
// Interactive plates (students act on the drawing itself):
//   · Problem recognition: drag the actual or ideal phone and watch the gap.
//   · Delegated search: switch look-ups between free and costly.
//   · Delegation instruction: tap the hidden weights of two coffees.
//   · Evaluating alternatives: switch the source of the consideration set.
//   · Decision rules: pick a rule and see which laptop it chooses.
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
    <p className={cn("type-body max-w-[var(--measure)]", className)}>
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
  return <p className={cn("type-lead max-w-[48ch]", className)}>{children}</p>;
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-quote max-w-[30ch]", className)}>{children}</p>;
}

/** A line at h2 size. */
function Big({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-h2 !font-normal", className)}>{children}</p>;
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
    <div className={cn("min-w-0 border-t-2 pt-5", BORDER[tone], className)}>
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
    plate?: React.ReactNode;
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
          {s.plate ? (
            <div className="figure-well mt-auto w-full min-w-0 p-3">
              {s.plate}
            </div>
          ) : null}
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
      <div className={cn("figure-well w-full min-w-0 p-2", plateClass)}>
        {plate}
      </div>
    </div>
  );
}

export default function Week7() {
  return (
    <SlideDeck label="Week 07">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
              Week 07
            </p>
            <p className="type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-6 !max-w-[18ch]">
              Consumer Decision-Making Process
            </Title>
            <div className="mt-8 max-w-[40ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
                A purchase is <Tint>the last step</Tint> of a decision that
                begins long before the checkout.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <V.DecisionPath />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Is Consumer Decision Making?
          ================================================================ */}
      <Slide className={TIGHT} id="what-is-consumer-decision-making" border>
        <Heading>What Is Consumer Decision Making?</Heading>
        <Statement className="!max-w-[40ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          <Term>Consumer decision making</Term> is the process by which people{" "}
          <Tint>identify a need, gather information, compare options, and choose</Tint>.
        </Statement>
        {/* Four lines, four scenes: the range of decisions runs from weeks to
            a second, in the same shopper, and now to an agent. */}
        <Cells
          cols={4}
          className="mt-6"
          items={[
            {
              key: "weeks",
              tone: "ink",
              plate: <V.WeeksDecision />,
              text: (
                <>
                  Some decisions take weeks of research, such as choosing a
                  university or a car.
                </>
              ),
            },
            {
              key: "second",
              tone: "ink",
              plate: <V.SecondDecision />,
              text: (
                <>
                  Other decisions take less than a second, such as picking up
                  the usual brand of milk.
                </>
              ),
            },
            {
              key: "same",
              tone: "ink",
              plate: <V.TwoCategories />,
              text: (
                <>
                  The same consumer can make careful decisions in one category
                  and habitual decisions in another.
                </>
              ),
            },
            {
              key: "agent",
              tone: "ink",
              plate: <V.AgentHandsOff />,
              text: (
                <>
                  Today, a consumer can also hand part of the process to an AI
                  agent that searches and compares on the consumer&apos;s
                  behalf.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          The Five Stages of the Decision Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-five-stages-of-the-decision-process"
        border
        exercise={exercise["the-five-stages-of-the-decision-process"]}
      >
        <Heading>The Five Stages of the Decision Process</Heading>
        <Lead className="!max-w-none !mb-5">
          The traditional model describes decision making as five stages.
        </Lead>
        <Cells
          cols={5}
          items={[
            {
              key: "problem",
              tone: "ink",
              plate: <V.StageProblem />,
              text: (
                <>
                  Stage 1 is <Term>problem recognition</Term>. The consumer
                  notices a gap between the current state and a desired state.
                </>
              ),
            },
            {
              key: "search",
              tone: "ink",
              plate: <V.StageSearch />,
              text: (
                <>
                  Stage 2 is <Term>information search</Term>. The consumer looks
                  for information about possible solutions.
                </>
              ),
            },
            {
              key: "evaluate",
              tone: "ink",
              plate: <V.StageEvaluate />,
              text: (
                <>
                  Stage 3 is <Term>evaluation of alternatives</Term>. The
                  consumer compares the options on the attributes that matter.
                </>
              ),
            },
            {
              key: "choice",
              tone: "ink",
              plate: <V.StageChoose />,
              text: (
                <>
                  Stage 4 is <Term>product choice</Term>. The consumer selects
                  one option and buys it.
                </>
              ),
            },
            {
              key: "post",
              tone: "ink",
              plate: <V.StagePost />,
              text: (
                <>
                  Stage 5 is <Term>postpurchase evaluation</Term>. The consumer
                  uses the product and judges whether it met expectations.
                </>
              ),
            },
          ]}
        />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-10">
          <Ruled tone="ink">
            <Big className="!text-[clamp(1.2rem,1.7vw,1.5rem)]">
              The model assumes a rational consumer. Real consumers often{" "}
              <Tint>skip stages, repeat them, or move through them in a
              different order</Tint>.
            </Big>
          </Ruled>
          <Plate wide>
            <V.SkipRepeat />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Problem Recognition: The Actual State and the Ideal State
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="problem-recognition-the-actual-state-and-the-ideal-state"
        border
        exercise={exercise["problem-recognition-the-actual-state-and-the-ideal-state"]}
      >
        <Heading kicker="Problem Recognition:">
          The Actual State and the Ideal State
        </Heading>
        {/* The definition beside the instrument: drag either phone and the
            gap decides whether a problem is recognised. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.8fr_2.2fr] lg:gap-10">
          <Statement className="!max-w-[24ch] !text-[clamp(1.4rem,2.2vw,1.9rem)]">
            Problem recognition occurs when the consumer sees a{" "}
            <Tint>significant difference</Tint> between the actual state and the
            ideal state.
          </Statement>
          <Plate wide>
            <V.ActualIdeal />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-6 lg:grid-cols-2">
          <SideCell plate={<V.MarketerNeed />} className="sm:grid-cols-[1fr_1.1fr]">
            <Term>Need recognition</Term> happens when the actual state falls. A
            phone breaks, or the fridge is empty.{" "}
            Marketers can trigger need recognition by reminding consumers that a
            product runs out or wears out.
          </SideCell>
          <SideCell
            plate={<V.MarketerOpportunity />}
            className="sm:grid-cols-[1fr_1.1fr]"
          >
            <Term>Opportunity recognition</Term> happens when the ideal state
            rises. A consumer sees a new phone with a better camera and wants
            it.{" "}
            Marketers can trigger opportunity recognition by showing a better
            state that the consumer had not imagined.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Three Levels of Decision Making
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="three-levels-of-decision-making"
        border
        exercise={exercise["three-levels-of-decision-making"]}
      >
        <Heading>Three Levels of Decision Making</Heading>
        <Lead className="!max-w-none !mb-5">
          Consumers do not put the same effort into every decision.
        </Lead>
        <Cells
          cols={3}
          items={[
            {
              key: "routine",
              tone: "ink",
              plate: <V.RoutineScene />,
              text: (
                <>
                  <Term>Routine response behavior</Term> is automatic. The
                  consumer buys the same product with little or no search, such
                  as a favorite toothpaste.
                </>
              ),
            },
            {
              key: "limited",
              tone: "ink",
              plate: <V.LimitedScene />,
              text: (
                <>
                  <Term>Limited problem solving</Term> uses some search and
                  simple rules. The consumer compares a few options, such as
                  when choosing a new cereal.
                </>
              ),
            },
            {
              key: "extended",
              tone: "ink",
              plate: <V.ExtendedScene />,
              text: (
                <>
                  <Term>Extended problem solving</Term> uses extensive search
                  and careful comparison. It occurs when the purchase is
                  expensive, risky, or rare, such as buying a house.
                </>
              ),
            },
          ]}
        />
        <Ruled tone="ink" className="mt-6 w-full">
          <Statement className="!max-w-[56ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
            The level of effort depends on{" "}
            <Tint>involvement, perceived risk, and past experience</Tint> with
            the category.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Information Search: Internal and External
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="information-search-internal-and-external"
        border
        exercise={exercise["information-search-internal-and-external"]}
      >
        <Heading kicker="Information Search:">Internal and External</Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Internal search</Term> means looking into memory for what
                the consumer already knows about the options.
              </P>
            </Ruled>
            <Plate>
              <V.InternalSearch />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>External search</Term> means gathering new information
                from ads, websites, stores, reviews, friends, and sales staff.
              </P>
            </Ruled>
            <Plate>
              <V.ExternalSearch />
            </Plate>
          </div>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>
                Consumers search <Term>more</Term> when the purchase is
                important, the risk is high, and they know little about the
                category.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                Consumers search <Term>less</Term> when they are experts, when
                they are satisfied with their current brand, or when time is
                short.
              </P>
            </Ruled>
          </div>
          <SideCell
            plate={<V.SearchStreet />}
            className="sm:grid-cols-[1.1fr_1fr]"
          >
            <Term>Search has costs.</Term> Each extra comparison takes time,
            money, and mental effort, so consumers{" "}
            <Tint>stop searching before they have seen every option</Tint>.
          </SideCell>
        </div>
      </Slide>

      {/* ================================================================
          Perceived Risk and the Amount of Search
          ================================================================ */}
      <Slide className={TIGHT} id="perceived-risk-and-the-amount-of-search" border>
        <Heading className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">Perceived Risk and the Amount of Search</Heading>
        <Lead className="!max-w-none !mb-5">
          <Term>Perceived risk</Term> is the belief that a purchase may have
          negative consequences.
        </Lead>
        <Cells
          cols={5}
          items={[
            {
              key: "monetary",
              tone: "ink",
              plate: <V.MonetaryRisk />,
              text: (
                <>
                  <Term>Monetary risk</Term> is the chance of losing money on a
                  poor choice.
                </>
              ),
            },
            {
              key: "functional",
              tone: "ink",
              plate: <V.FunctionalRisk />,
              text: (
                <>
                  <Term>Functional risk</Term> is the chance that the product
                  will not perform as expected.
                </>
              ),
            },
            {
              key: "physical",
              tone: "ink",
              plate: <V.PhysicalRisk />,
              text: (
                <>
                  <Term>Physical risk</Term> is the chance of harm to the body
                  or health.
                </>
              ),
            },
            {
              key: "social",
              tone: "ink",
              plate: <V.SocialRisk />,
              text: (
                <>
                  <Term>Social risk</Term> is the chance that others will judge
                  the consumer negatively.
                </>
              ),
            },
            {
              key: "psychological",
              tone: "ink",
              plate: <V.PsychologicalRisk />,
              text: (
                <>
                  <Term>Psychological risk</Term> is the chance that the choice
                  will damage the consumer&apos;s self-image.
                </>
              ),
            },
          ]}
        />
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-10">
          <Ruled tone="ink">
            <Big className="!text-[clamp(1.2rem,1.7vw,1.5rem)]">
              The higher the perceived risk,{" "}
              <Tint>the more information consumers tend to gather</Tint> before
              they buy.
            </Big>
          </Ruled>
          <Plate wide>
            <V.RiskMoreInfo />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Delegated Search: When an AI Agent Gathers the Information
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="delegated-search-when-an-ai-agent-gathers-the-information"
        border
        exercise={exercise["delegated-search-when-an-ai-agent-gathers-the-information"]}
      >
        <Heading kicker="Delegated Search:" className="!max-w-none !text-[clamp(1.9rem,3.1vw,2.9rem)]">
          When an AI Agent Gathers the Information
        </Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="ink" className="!pt-3">
              <P>Consumers can now delegate information search to an AI agent.</P>
            </Ruled>
            <P>
              The consumer gives the agent a goal. The agent looks up product
              details, compares options, and makes a choice.
            </P>
            <P>
              Like a human shopper, the agent often cannot see every detail at
              once. It has to look up each attribute, and each look-up can cost
              time or money.
            </P>
          </div>
          <div className="min-w-0">
            <P className="mb-3">
              Researchers can trace which details an agent looks up before it
              chooses, as consumer researchers have long traced which
              information human shoppers open before they choose (Wadi &amp;
              Ma, 2026b).
            </P>
            <Plate wide>
              <V.InformationBoard />
            </Plate>
          </div>
        </div>
        <div className="mt-5 grid w-full gap-6 border-t-2 border-[var(--ink)] pt-3 md:grid-cols-2 md:gap-10">
          <P>
            When looking up information was free, AI agents gathered the
            details they needed and rarely chose a worse product (Wadi &amp;
            Ma, 2026b).
          </P>
          <P>
            When each look-up had a cost, agents stopped searching earlier and
            sometimes chose without the details they needed (Wadi &amp; Ma,
            2026b).
          </P>
        </div>
        <Statement className="mt-5 !max-w-[60ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
          The quality of a delegated decision therefore depends on{" "}
          <Tint>the information the agent gathers</Tint>, not only on how well
          it reasons.
        </Statement>
      </Slide>

      {/* ================================================================
          The Delegation Instruction: How Specific Is the Goal?
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-delegation-instruction-how-specific-is-the-goal"
        border
        exercise={exercise["the-delegation-instruction-how-specific-is-the-goal"]}
      >
        <Heading kicker="The Delegation Instruction:">
          How Specific Is the Goal?
        </Heading>
        <Lead className="!max-w-none !mb-4">
          The instruction the consumer gives the agent defines what a good
          choice means.
        </Lead>
        {/* The goals and the study on the left; on the right, the study's
            agents at work under whichever instruction students pick. */}
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                A <Term>vague goal</Term> leaves the criterion open, for example
                &quot;find the best deal on instant coffee.&quot;
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A <Term>specific goal</Term> states the criterion, for example
                &quot;find the coffee with the lowest price per ounce.&quot;
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                In one study, one coffee cost $4.99 for 10 ounces and another
                cost $5.00 for 11 ounces. The $5.00 coffee was cheaper per
                ounce (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
            <P>
              When look-ups were costly and the goal was vague, AI agents often
              skipped the package weight and more often chose the $4.99 coffee
              (Wadi &amp; Ma, 2026b).
            </P>
            <P>
              When the goal was specific, the agents kept looking up the
              details needed to compare price per ounce and chose better (Wadi
              &amp; Ma, 2026b).
            </P>
          </div>
          <Plate wide>
            <V.GoalBoard />
          </Plate>
        </div>
        <Statement className="mt-4 !max-w-none !text-[clamp(1.2rem,1.7vw,1.5rem)]">
          A consumer who states the criterion that defines a good choice gives
          the agent a clear objective.{" "}
          <Tint>An agent cannot pursue an objective the consumer did not state.</Tint>
        </Statement>
      </Slide>

      {/* ================================================================
          Evaluating Alternatives: From Awareness to Consideration
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="evaluating-alternatives-from-awareness-to-consideration"
        border
        exercise={exercise["evaluating-alternatives-from-awareness-to-consideration"]}
      >
        <Heading kicker="Evaluating Alternatives:">
          From Awareness to Consideration
        </Heading>
        <div className="grid w-full gap-8 lg:grid-cols-[0.78fr_2fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Lead className="!max-w-none">
              Consumers rarely evaluate every brand in a category.
            </Lead>
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>awareness set</Term> includes all the brands a
                consumer knows.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>evoked set</Term> includes the brands a consumer
                recalls from memory when making a decision.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>consideration set</Term> includes the brands the
                consumer seriously considers buying.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>inept set</Term> includes brands the consumer rejects,
                and the <Term>inert set</Term> includes brands the consumer
                feels indifferent toward.
              </P>
            </Ruled>
          </div>
          <Plate wide className="self-center">
            <V.ConsiderationSets />
          </Plate>
        </div>
        <Statement className="mt-5 !max-w-[64ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          A brand that does not enter the consideration set has almost no chance
          of being chosen. When an AI agent searches,{" "}
          <Tint>the list it returns can become the consumer&apos;s consideration set</Tint>.
        </Statement>
      </Slide>

      {/* ================================================================
          Decision Rules: How Consumers Choose
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="decision-rules-how-consumers-choose"
        border
        exercise={exercise["decision-rules-how-consumers-choose"]}
      >
        <Heading kicker="Decision Rules:">How Consumers Choose</Heading>
        <Lead className="!max-w-none !mb-3">
          Decision rules are the strategies consumers use to choose among
          alternatives.
        </Lead>
        <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_1.5fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Compensatory rules</Term> let a strength on one attribute
                make up for a weakness on another. A laptop with a weak battery
                can still win if its screen and price are excellent.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Noncompensatory rules</Term> do not allow this trade-off.
                A weakness on one important attribute rules the option out.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>lexicographic rule</Term> chooses the brand that is
                best on the most important attribute. If there is a tie, the
                consumer moves to the next attribute.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>elimination-by-aspects rule</Term> removes every
                option that fails a cut-off on an important attribute, such as
                any flight with more than one stop.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                The <Term>conjunctive rule</Term> sets a minimum level for every
                attribute and rejects any option that falls below one of them.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate wide>
              <V.DecisionRules />
            </Plate>
            <Statement className="!max-w-[50ch] !text-[clamp(1.2rem,1.8vw,1.55rem)]">
              Consumers often use noncompensatory rules to narrow the options
              and <Tint>then a compensatory rule to choose</Tint> among the few
              that remain.
            </Statement>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Write the Instruction
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-write-the-instruction" border>
        <Heading kicker="Discussion:" tone="counter">
          Write the Instruction
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>
            <p className="type-quote !text-[clamp(1.15rem,1.7vw,1.5rem)]">
              Think of a product you plan to buy soon. Write the instruction you
              would give an AI agent to buy it for you. Which attributes and
              decision rule does your instruction state, and which does it leave
              for the agent to decide?
            </p>
          </div>
          <Plate wide>
            <V.InstructionCard />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
