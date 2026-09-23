"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import {
  CurrentToBetter,
  MotivationGap,
  TensionAction,
  GymMotives,
  ConnectOffer,
  DriveCurve,
  HungerFood,
  ThirstDrink,
  MarketingDrive,
  ExpectancyChain,
  MoreMotivated,
  NeedWantDemand,
  ShapedWants,
  DemandTest,
  ShapeNotCreate,
  MaslowPyramid,
  TierMark,
  SeveralLevels,
  ApproachApproach,
  ApproachAvoidance,
  AvoidanceAvoidance,
  PhoneOrTrip,
  ClearerChoice,
  InvolvementScale,
  ProductInvolvement,
  MessageInvolvement,
  SituationInvolvement,
  HighVsLow,
  FunctionalValue,
  SocialValue,
  ExperientialValue,
  FitsValues,
  TheoryGlyph,
  FindTheMotive,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 04 — MOTIVATION, NEEDS, AND VALUES
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// SIGNAL marks what the consumer wants or reaches for (the desired state, the
// drive, the goal); COUNTER the offer, the marketer and the discussion.
//
// Wayfinding: the discussion asks which theory explains a purchase: "drive
// reduction, expectancy, hierarchy of needs, or motivational conflict". A
// TheoryRule strip names those four and lights one on each theory slide.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it. The three motivational conflicts are told apart in
// a run of cases (Which one is it?); the other topics are quizzes.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

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
function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("type-body max-w-[var(--measure)]", className)}>{children}</p>
  );
}

/** A line promoted to lead size. */
function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-lead max-w-[48ch]", className)}>{children}</p>;
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-quote max-w-[30ch]", className)}>{children}</p>;
}

/** A line at h2 size. */
function Big({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("type-h2 !font-normal", className)}>{children}</p>;
}

/** Coloured term inside a line. */
function Term({ children, tone = "signal" }: { children: React.ReactNode; tone?: Tone }) {
  return <strong className={cn("font-semibold", TEXT[tone])}>{children}</strong>;
}

/** Inline colour for a phrase inside a serif line. */
function Tint({ children, tone = "signal" }: { children: React.ReactNode; tone?: Tone }) {
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

/** A plate that lives in a column: a figure well without the 680px floor. */
function Plate({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("figure-well w-full min-w-0 p-3 sm:p-5", className)}>
      {children}
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
}: {
  kicker?: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
}) {
  return (
    <div className="mb-10 w-full md:mb-14">
      <h2 className="type-h1 max-w-[22ch]">
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label mb-4 block !text-[0.8rem]",
                tone === "counter" ? "!text-[var(--counter)]" : "!text-[var(--signal)]",
              )}
            >
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** A line and a column plate side by side. */
function Pair({
  plateFirst = false,
  plate,
  children,
  className = "",
}: {
  plateFirst?: boolean;
  plate: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14", className)}>
      {plateFirst ? <Plate>{plate}</Plate> : null}
      <div className="min-w-0">{children}</div>
      {plateFirst ? null : <Plate>{plate}</Plate>}
    </div>
  );
}

function Columns({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14", className)}>
      {children}
    </div>
  );
}

/** Drive reduction · Expectancy · Hierarchy of needs · Motivational conflict. */
const THEORIES = ["Drive reduction", "Expectancy", "Hierarchy of needs", "Motivational conflict"];

function TheoryRule({ active }: { active: 0 | 1 | 2 | 3 }) {
  return (
    <ol aria-hidden className="mb-12 grid w-full grid-cols-2 gap-x-4 gap-y-3 md:mb-16 md:grid-cols-4">
      {THEORIES.map((name, i) => {
        const on = i === active;
        return (
          <li
            key={name}
            className={cn(
              "flex min-w-0 items-center gap-2 border-t-2 pt-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em]",
              on
                ? "border-[var(--signal)] text-[var(--signal)]"
                : "border-[var(--rule)] text-[var(--ink-3)]",
            )}
          >
            <span className={cn("hidden md:block", on ? "opacity-100" : "opacity-35")}>
              <TheoryGlyph kind={i as 0 | 1 | 2 | 3} />
            </span>
            <span className="min-w-0">{name}</span>
          </li>
        );
      })}
    </ol>
  );
}

/** A numbered column; the numeral comes from CSS so the sentence stays whole. */
function Step({
  n,
  tone = "ink",
  children,
  className = "",
}: {
  n: number;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      data-n={String(n)}
      className={cn(
        "min-w-0 border-t-2 pt-5 before:mb-3 before:block before:font-[family-name:var(--font-heading)] before:text-[1.6rem] before:leading-none before:content-[attr(data-n)]",
        BORDER[tone],
        tone === "signal" ? "before:text-[var(--signal)]" : "before:text-[var(--ink-3)]",
        className,
      )}
    >
      {children}
    </li>
  );
}

/** A plate over its ruled line, for rows of three. */
function Trio({
  items,
}: {
  items: { key: string; tone: Tone; plate: React.ReactNode; text: React.ReactNode }[];
}) {
  return (
    <ol className="grid w-full gap-12 lg:grid-cols-3 lg:gap-8">
      {items.map((s) => (
        <li key={s.key} className="flex min-w-0 flex-col gap-6">
          <div className="figure-well w-full min-w-0 p-3">{s.plate}</div>
          <div className={cn("border-t-2 pt-5", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A line with the pyramid tiers it names. */
function TierLine({ lit, children }: { lit: number[]; children: React.ReactNode }) {
  return (
    <li className="flex min-w-0 items-start gap-5 border-t-2 border-[var(--ink)] pt-5">
      <TierMark lit={lit} />
      <p className="type-body min-w-0">{children}</p>
    </li>
  );
}

export default function Week4() {
  return (
    <SlideDeck label="Week 04">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <p className="type-label !text-[0.8rem] !text-[var(--signal)]">
              Week 04
            </p>
            <p className="type-caption mt-2">Consumer Behavior · Davood Wadi, PhD</p>
            <Title className="mt-8 !max-w-[14ch]">Motivation, Needs, and Values</Title>
            <div className="mt-10 max-w-[34ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote">
                <span className="text-[var(--ink-3)]">Every purchase is an attempt to </span>
                move from a current state to <Tint>a better one</Tint>
                <span className="text-[var(--ink-3)]">.</span>
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[340px]">
            <CurrentToBetter />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Is Consumer Motivation?
          ================================================================ */}
      <Slide id="what-is-consumer-motivation" border>
        <Heading>What Is Consumer Motivation?</Heading>
        <Statement className="!max-w-[38ch]">
          Motivation is the process that drives people to act when they feel a{" "}
          <Tint>gap</Tint> between their <Tint tone="ink">current state</Tint> and a{" "}
          <Tint>desired state</Tint>.
        </Statement>
        <Figure height="auto">
          <MotivationGap />
        </Figure>
        <Pair plate={<TensionAction />}>
          <Ruled tone="signal">
            <Lead>
              A need creates <Term>tension</Term>. The consumer takes action to reduce that
              tension.
            </Lead>
          </Ruled>
        </Pair>
        <Big className="mt-20 max-w-[40ch]">
          The same product can serve <Tint>different motives</Tint> for different people.
        </Big>
        <P className="mt-6">
          A gym membership may help one person seek <Term>health</Term>, another seek{" "}
          <Term>belonging</Term>, and another seek <Term>status</Term>.
        </P>
        <Figure height="auto">
          <GymMotives />
        </Figure>
        <Pair plateFirst plate={<ConnectOffer />} className="mt-20">
          <Ruled tone="counter">
            <Big className="!text-[clamp(1.35rem,2.3vw,2rem)]">
              Marketers study motives so they can connect an{" "}
              <Tint tone="counter">offer</Tint> with a <Tint>goal</Tint> that matters to the
              consumer.
            </Big>
          </Ruled>
        </Pair>
      </Slide>

      {/* ================================================================
          Drive Theory: Tension and Reduction
          ================================================================ */}
      <Slide
        id="drive-theory-tension-and-reduction"
        border
        exercise={exercise["drive-theory-tension-and-reduction"]}
      >
        <TheoryRule active={0} />
        <Heading kicker="Drive Theory:">Tension and Reduction</Heading>
        <Statement className="!max-w-[36ch]">
          Drive theory says that an unmet need creates an uncomfortable internal state called a{" "}
          <Tint>drive</Tint>.
        </Statement>{" "}
        <Lead className="mt-8 text-[var(--ink-3)]">
          The drive <Term tone="ink">pushes</Term> the consumer toward an action that reduces the
          discomfort.
        </Lead>
        <P className="mt-16">
          <Term>Hunger</Term> creates a drive to find food. <Term>Thirst</Term> creates a drive to
          find a drink.
        </P>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Plate>
            <HungerFood />
          </Plate>
          <Plate>
            <ThirstDrink />
          </Plate>
        </div>
        <Big className="mt-20 max-w-[42ch]">
          After the need is satisfied, <Tint>tension falls</Tint> and the consumer returns to a
          more <Tint tone="ink">balanced state</Tint>.
        </Big>
        <Figure height="auto">
          <DriveCurve />
        </Figure>
        <Pair plate={<MarketingDrive />}>
          <Ruled tone="counter">
            <Lead>
              Marketing can <Term tone="ink">remind</Term> people of a need or show how a product
              may <Term tone="counter">reduce</Term> the resulting drive.
            </Lead>
          </Ruled>
        </Pair>
      </Slide>

      {/* ================================================================
          Expectancy Theory: Effort, Performance, and Outcome
          ================================================================ */}
      <Slide
        id="expectancy-theory-effort-performance-and-outcome"
        border
        exercise={exercise["expectancy-theory-effort-performance-and-outcome"]}
      >
        <TheoryRule active={1} />
        <Heading kicker="Expectancy Theory:">Effort, Performance, and Outcome</Heading>
        <Statement className="!max-w-[36ch]">
          Expectancy theory says that motivation depends on what people <Tint>believe</Tint> will
          happen after they act.
        </Statement>
        <Figure height="auto">
          <ExpectancyChain />
        </Figure>
        <ol className="grid w-full gap-10 md:grid-cols-3 md:gap-8">
          <Step n={1}>
            <p className="type-body">
              {" "}
              <Term>Expectancy</Term> is the belief that effort will lead to good performance.
            </p>
          </Step>
          <Step n={2}>
            <p className="type-body">
              {" "}
              <Term>Instrumentality</Term> is the belief that good performance will lead to a
              desired outcome.
            </p>
          </Step>
          <Step n={3} tone="signal">
            <p className="type-body">
              {" "}
              <Term>Valence</Term> is the value the consumer places on that outcome.
            </p>
          </Step>
        </ol>
        <Ruled tone="signal" className="mt-20 w-full">
          <Big className="max-w-[46ch]">
            A consumer is more motivated when the goal seems <Tint>possible</Tint>, the product
            seems <Tint>useful</Tint>, and the result feels <Tint>valuable</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <MoreMotivated />
        </Figure>
      </Slide>

      {/* ================================================================
          Needs, Wants, and Demand
          ================================================================ */}
      <Slide id="needs-wants-and-demand" border exercise={exercise["needs-wants-and-demand"]}>
        <Heading>Needs, Wants, and Demand</Heading>
        <Figure height="auto" className="!mt-0">
          <NeedWantDemand />
        </Figure>
        <Columns>
          <Ruled tone="ink">
            <Lead>
              A <Term tone="ink">need</Term> is a basic biological or psychological requirement,
              such as hunger, safety, or belonging.
            </Lead>
          </Ruled>
          <Ruled tone="ink">
            <Lead>
              A <Term tone="ink">want</Term> is the specific product or service chosen to satisfy
              a need.
            </Lead>
          </Ruled>
        </Columns>
        <Big className="mt-20 max-w-[40ch]">
          <Tint>Culture, personality, and past experience</Tint> shape wants.
        </Big>
        <Figure height="auto">
          <ShapedWants />
        </Figure>
        <Ruled tone="signal" className="mt-10 w-full">
          <Lead className="!max-w-[56ch]">
            <Term>Demand</Term> is a want supported by both the ability and willingness to pay.
          </Lead>
        </Ruled>
        <Figure height="auto">
          <DemandTest />
        </Figure>
        <Pair plate={<ShapeNotCreate />}>
          <Statement>
            A marketer <Tint>can shape</Tint> a want.{" "}
            <span className="text-[var(--ink-3)]">
              A marketer cannot create the basic human need underneath it.
            </span>
          </Statement>
        </Pair>
      </Slide>

      {/* ================================================================
          Maslow's Hierarchy in Consumer Markets
          ================================================================ */}
      <Slide
        id="maslows-hierarchy-in-consumer-markets"
        border
        exercise={exercise["maslows-hierarchy-in-consumer-markets"]}
      >
        <TheoryRule active={2} />
        <Heading>Maslow&apos;s Hierarchy in Consumer Markets</Heading>
        <Statement className="!max-w-[36ch]">
          Maslow proposed that human needs can be arranged from <Tint tone="ink">basic needs</Tint>{" "}
          to <Tint>higher-order needs</Tint>.
        </Statement>
        <Figure height="auto">
          <MaslowPyramid />
        </Figure>
        <ol className="grid w-full gap-10 md:grid-cols-2 md:gap-x-14">
          <TierLine lit={[0]}>
            <Term tone="ink">Physiological needs</Term> include food, water, and sleep.
          </TierLine>
          <TierLine lit={[1]}>
            <Term tone="ink">Safety needs</Term> include protection, stability, and health.
          </TierLine>
          <TierLine lit={[2, 3]}>
            <Term tone="counter">Belonging and esteem needs</Term> include friendship, acceptance,
            achievement, and status.
          </TierLine>
          <TierLine lit={[4]}>
            <Term>Self-actualization</Term> involves growth and becoming the person one wants to
            be.
          </TierLine>
        </ol>
        <Pair plateFirst plate={<SeveralLevels />} className="mt-20">
          <Statement>
            Consumers can pursue several levels <Tint>at the same time</Tint>.{" "}
            <span className="text-[var(--ink-3)]">
              The hierarchy is a guide, not a strict shopping sequence.
            </span>
          </Statement>
        </Pair>
      </Slide>

      {/* ================================================================
          Motivational Conflicts: Three Difficult Choices
          ================================================================ */}
      <Slide
        id="motivational-conflicts-three-difficult-choices"
        border
        exercise={exercise["motivational-conflicts-three-difficult-choices"]}
      >
        <TheoryRule active={3} />
        <Heading kicker="Motivational Conflicts:">Three Difficult Choices</Heading>
        <Trio
          items={[
            {
              key: "aa",
              tone: "signal",
              plate: <ApproachApproach />,
              text: (
                <>
                  <Term>Approach-approach conflict</Term> occurs when a consumer wants two
                  attractive options but can choose only one.
                </>
              ),
            },
            {
              key: "av",
              tone: "ink",
              plate: <ApproachAvoidance />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Approach-avoidance conflict</Term> occurs when the same option
                  has both an attractive benefit and an unpleasant cost.
                </>
              ),
            },
            {
              key: "vv",
              tone: "ink",
              plate: <AvoidanceAvoidance />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Avoidance-avoidance conflict</Term> occurs when every available
                  option has an unwanted consequence.
                </>
              ),
            },
          ]}
        />
        <Big className="mt-20 max-w-[40ch]">
          {" "}
          A buyer may want <Tint>a new phone</Tint> and <Tint>a weekend trip</Tint>, but the
          budget allows only one.
        </Big>
        <Figure height="auto">
          <PhoneOrTrip />
        </Figure>
        <Ruled tone="counter" className="mt-10 w-full">
          <Lead className="!max-w-[56ch]">
            Strong brands reduce conflict by making <Term tone="counter">benefits clear</Term> and{" "}
            <Term tone="counter">costs easier to understand</Term>.
          </Lead>
        </Ruled>
        <Figure height="auto">
          <ClearerChoice />
        </Figure>
      </Slide>

      {/* ================================================================
          Consumer Involvement: How Much Does It Matter?
          ================================================================ */}
      <Slide id="consumer-involvement-how-much-does-it-matter" border>
        <Heading kicker="Consumer Involvement:">How Much Does It Matter?</Heading>
        <Statement className="!max-w-[38ch]">
          Involvement is the <Tint>personal importance</Tint> a consumer assigns to a product,
          message, or purchase situation.
        </Statement>
        <Figure height="auto">
          <InvolvementScale />
        </Figure>
        <Trio
          items={[
            {
              key: "product",
              tone: "ink",
              plate: <ProductInvolvement />,
              text: (
                <>
                  <Term tone="ink">Product involvement</Term> is high when the product affects
                  identity, risk, or daily life.
                </>
              ),
            },
            {
              key: "message",
              tone: "ink",
              plate: <MessageInvolvement />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Message involvement</Term> is high when the consumer pays close
                  attention to the information in an advertisement.
                </>
              ),
            },
            {
              key: "situation",
              tone: "ink",
              plate: <SituationInvolvement />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Purchase situation involvement</Term> changes with time
                  pressure, social setting, and perceived risk.
                </>
              ),
            },
          ]}
        />
        <Big className="mt-20 max-w-[46ch]">
          {" "}
          <Tint>High involvement</Tint> leads to more effort and careful comparison.{" "}
          <span className="text-[var(--ink-3)]">
            Low involvement often leads to habit and simple cues.
          </span>
        </Big>
        <Figure height="auto">
          <HighVsLow />
        </Figure>
      </Slide>

      {/* ================================================================
          Values Guide Consumer Choices
          ================================================================ */}
      <Slide
        id="values-guide-consumer-choices"
        border
        exercise={exercise["values-guide-consumer-choices"]}
      >
        <Heading>Values Guide Consumer Choices</Heading>
        <Statement className="!max-w-[34ch]">
          Values are <Tint>enduring beliefs</Tint> about what is important or desirable.
        </Statement>
        <div className="mt-16 w-full">
          <Trio
            items={[
              {
                key: "functional",
                tone: "ink",
                plate: <FunctionalValue />,
                text: (
                  <>
                    <Term tone="ink">Functional values</Term> focus on performance, convenience,
                    and reliability.
                  </>
                ),
              },
              {
                key: "social",
                tone: "ink",
                plate: <SocialValue />,
                text: (
                  <>
                    {" "}
                    <Term tone="ink">Social values</Term> focus on belonging, recognition, and how
                    others see the consumer.
                  </>
                ),
              },
              {
                key: "experiential",
                tone: "ink",
                plate: <ExperientialValue />,
                text: (
                  <>
                    {" "}
                    <Term tone="ink">Experiential values</Term> focus on pleasure, excitement,
                    comfort, or meaning.
                  </>
                ),
              },
            ]}
          />
        </div>
        <Ruled tone="signal" className="mt-20 w-full">
          <Big className="max-w-[48ch]">
            {" "}
            Consumers often choose between products by asking which one{" "}
            <Tint>fits their values</Tint>, not only which one has the most features.
          </Big>
        </Ruled>
        <Figure height="auto">
          <FitsValues />
        </Figure>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide id="discussion-find-the-motive" border>
        <Heading kicker="Discussion:" tone="counter">
          Find the Motive
        </Heading>
        <Figure height="auto" className="!mt-0">
          <FindTheMotive />
        </Figure>
        <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
          <p className="type-quote !text-[clamp(1.35rem,2.5vw,2.1rem)] max-w-[46ch]">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Choose a recent purchase.{" "}
            <Tint tone="counter">What need or value did it serve?</Tint> Which theory best
            explains your choice: drive reduction, expectancy, hierarchy of needs, or
            motivational conflict?
          </p>
        </div>
      </Slide>
    </SlideDeck>
  );
}
