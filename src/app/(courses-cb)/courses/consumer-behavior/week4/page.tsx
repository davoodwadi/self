"use client";

import React from "react";
import { SlideDeck, Slide, Title } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import exercisesData from "./exercises.json";
import {
  CurrentToBetter,
  MotivationGap,
  TensionAction,
  GymMotives,
  ConnectOffer,
  HungerThirst,
  DriveCurve,
  MarketingDrive,
  ExpectancyChain,
  MoreMotivated,
  NeedHunger,
  WantBurger,
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
  FindTheMotive,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 04 — MOTIVATION, NEEDS, AND VALUES
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx (Editorial Sketch, see ../CLAUDE.md).
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
// and the ones before it. Drive theory is a process, so its moments are put
// in order; the three expectancy beliefs and the three motivational conflicts
// are told apart case by case (identify); needs, wants and demand, and the
// three kinds of value, are sorted into groups; Maslow's levels are matched to
// purchases.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/**
 * Content slides trim the section's 7rem padding so each topic reads as one
 * screen, and trim it again on short screens (laptops at 800px tall or less),
 * keeping room at the foot for the folio.
 */
const TIGHT =
  "md:!py-16 [@media(min-width:768px)_and_(max-height:820px)]:!pt-8 [@media(min-width:768px)_and_(max-height:820px)]:!pb-14";

/** The gap between a slide's rows, tightened on short screens too. */
const GAP = "mt-10 [@media(min-width:768px)_and_(max-height:900px)]:!mt-6";

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

/**
 * A plate in a figure well. A `wide` (800-unit) plate keeps a legible minimum
 * width on phones and scrolls inside its well there; from lg up it fits.
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
    <div className={cn("figure-well w-full min-w-0 p-3", wide && "overflow-x-auto", className)}>
      {wide ? <div className="min-w-[480px] lg:min-w-0">{children}</div> : children}
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
    <div className="mb-8 w-full md:mb-10 [@media(min-width:768px)_and_(max-height:900px)]:!mb-6">
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
      <div className="mt-5 h-px w-full bg-[var(--rule)] [@media(min-width:768px)_and_(max-height:900px)]:!mt-3" />
    </div>
  );
}

/** Lines on the left, a plate on the right; on phones the plate follows the lines. */
function Lede({
  children,
  plate,
  wide = false,
  cols = "lg:grid-cols-[1fr_1.9fr]",
  className = "",
}: {
  children: React.ReactNode;
  plate: React.ReactNode;
  wide?: boolean;
  cols?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full items-center gap-8 lg:gap-12", cols, className)}>
      <div className="min-w-0">{children}</div>
      <Plate wide={wide} className={wide ? "" : "lg:max-w-[440px] lg:justify-self-end"}>
        {plate}
      </Plate>
    </div>
  );
}

/**
 * A row of ruled cells, each a verbatim line with its plate beneath. Plates
 * sit at the foot of their cell so a row of them shares one baseline.
 */
function Cells({
  cols,
  items,
  className = "",
}: {
  cols: 3 | 4;
  items: { key: string; tone: Tone; text: React.ReactNode; plate?: React.ReactNode }[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid w-full gap-10 sm:gap-x-8 lg:gap-6",
        { 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols],
        className,
      )}
    >
      {items.map((s) => (
        <li key={s.key} className="flex min-w-0 flex-col gap-4">
          <div className={cn("border-t-2 pt-4", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
          {s.plate ? <Plate className="mt-auto">{s.plate}</Plate> : null}
        </li>
      ))}
    </ol>
  );
}

/** Drive reduction · Expectancy · Hierarchy of needs · Motivational conflict. */
const THEORIES = ["Drive reduction", "Expectancy", "Hierarchy of needs", "Motivational conflict"];

function TheoryRule({ active }: { active: 0 | 1 | 2 | 3 }) {
  return (
    <ol aria-hidden className="mb-8 grid w-full grid-cols-2 gap-x-4 gap-y-3 md:mb-10 md:grid-cols-4">
      {THEORIES.map((name, i) => (
        <li
          key={name}
          className={cn(
            "min-w-0 border-t-2 pt-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em]",
            i === active
              ? "border-[var(--signal)] text-[var(--signal)]"
              : "border-[var(--rule)] text-[var(--ink-3)]",
          )}
        >
          {name}
        </li>
      ))}
    </ol>
  );
}

/** A line with the pyramid tiers it names. */
function TierLine({ lit, children }: { lit: number[]; children: React.ReactNode }) {
  return (
    <li className="flex min-w-0 items-start gap-4 border-t-2 border-[var(--ink)] pt-4">
      <TierMark lit={lit} />
      <p className="type-body min-w-0">{children}</p>
    </li>
  );
}

/** A lede line sized to share a row with a wide plate. */
const LEDE = "!text-[clamp(1.3rem,2vw,1.75rem)]";

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
      <Slide className={TIGHT} id="what-is-consumer-motivation" border>
        <Heading>What Is Consumer Motivation?</Heading>
        <Lede wide plate={<MotivationGap />}>
          <Statement className={cn(LEDE, "!max-w-[34ch]")}>
            Motivation is the process that drives people to act when they feel a{" "}
            <Tint>gap</Tint> between their <Tint tone="ink">current state</Tint> and a{" "}
            <Tint>desired state</Tint>.
          </Statement>
        </Lede>
        <Cells
          cols={3}
         
          className={GAP}
          items={[
            {
              key: "tension",
              tone: "signal",
              plate: <TensionAction />,
              text: (
                <>
                  A need creates <Term>tension</Term>. The consumer takes action to reduce that
                  tension.
                </>
              ),
            },
            {
              key: "motives",
              tone: "signal",
              plate: <GymMotives />,
              text: (
                <>
                  {" "}
                  The same product can serve <Term>different motives</Term> for different people.{" "}
                  A gym membership may help one person seek health, another seek belonging, and
                  another seek status.
                </>
              ),
            },
            {
              key: "connect",
              tone: "counter",
              plate: <ConnectOffer />,
              text: (
                <>
                  {" "}
                  Marketers study motives so they can connect an{" "}
                  <Term tone="counter">offer</Term> with a <Term>goal</Term> that matters to the
                  consumer.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Drive Theory: Tension and Reduction
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="drive-theory-tension-and-reduction"
        border
        exercise={exercise["drive-theory-tension-and-reduction"]}
      >
        <TheoryRule active={0} />
        <Heading kicker="Drive Theory:">Tension and Reduction</Heading>
        <div className="grid w-full gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-12">
          <Statement className={cn(LEDE, "!max-w-[36ch]")}>
            Drive theory says that an unmet need creates an uncomfortable internal state called a{" "}
            <Tint>drive</Tint>.
          </Statement>{" "}
          <Lead className="text-[var(--ink-3)]">
            The drive <Term tone="ink">pushes</Term> the consumer toward an action that reduces the
            discomfort.
          </Lead>
        </div>
        <Cells
          cols={3}
          className={GAP}
          items={[
            {
              key: "hunger",
              tone: "signal",
              plate: <HungerThirst />,
              text: (
                <>
                  {" "}
                  <Term>Hunger</Term> creates a drive to find food. <Term>Thirst</Term> creates a
                  drive to find a drink.
                </>
              ),
            },
            {
              key: "falls",
              tone: "signal",
              plate: <DriveCurve />,
              text: (
                <>
                  {" "}
                  After the need is satisfied, <Term>tension falls</Term> and the consumer returns
                  to a more balanced state.
                </>
              ),
            },
            {
              key: "marketing",
              tone: "counter",
              plate: <MarketingDrive />,
              text: (
                <>
                  {" "}
                  Marketing can <Term tone="ink">remind</Term> people of a need or show how a
                  product may <Term tone="counter">reduce</Term> the resulting drive.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Expectancy Theory: Effort, Performance, and Outcome
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="expectancy-theory-effort-performance-and-outcome"
        border
        exercise={exercise["expectancy-theory-effort-performance-and-outcome"]}
      >
        <TheoryRule active={1} />
        <Heading kicker="Expectancy Theory:">Effort, Performance, and Outcome</Heading>
        <Lede wide plate={<ExpectancyChain />}>
          <Statement className={cn(LEDE, "!max-w-[30ch]")}>
            Expectancy theory says that motivation depends on what people <Tint>believe</Tint> will
            happen after they act.
          </Statement>
        </Lede>
        <Cells
          cols={3}
          className="mt-8"
          items={[
            {
              key: "expectancy",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Expectancy</Term> is the belief that effort will lead to good performance.
                </>
              ),
            },
            {
              key: "instrumentality",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Instrumentality</Term> is the belief that good performance will lead to a
                  desired outcome.
                </>
              ),
            },
            {
              key: "valence",
              tone: "signal",
              text: (
                <>
                  {" "}
                  <Term>Valence</Term> is the value the consumer places on that outcome.
                </>
              ),
            },
          ]}
        />
        <Lede wide plate={<MoreMotivated />} className={GAP}>
          <Ruled tone="signal" className="!pt-4">
            <Lead>
              A consumer is more motivated when the goal seems <Term>possible</Term>, the product
              seems <Term>useful</Term>, and the result feels <Term>valuable</Term>.
            </Lead>
          </Ruled>
        </Lede>
      </Slide>

      {/* ================================================================
          Needs, Wants, and Demand
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="needs-wants-and-demand"
        border
        exercise={exercise["needs-wants-and-demand"]}
      >
        <Heading>Needs, Wants, and Demand</Heading>
        <Cells
          cols={4}
         
          items={[
            {
              key: "need",
              tone: "ink",
              plate: <NeedHunger />,
              text: (
                <>
                  A <Term tone="ink">need</Term> is a basic biological or psychological
                  requirement, such as hunger, safety, or belonging.
                </>
              ),
            },
            {
              key: "want",
              tone: "ink",
              plate: <WantBurger />,
              text: (
                <>
                  {" "}
                  A <Term tone="ink">want</Term> is the specific product or service chosen to
                  satisfy a need.
                </>
              ),
            },
            {
              key: "shaped",
              tone: "signal",
              plate: <ShapedWants />,
              text: (
                <>
                  {" "}
                  <Term>Culture, personality, and past experience</Term> shape wants.
                </>
              ),
            },
            {
              key: "demand",
              tone: "signal",
              plate: <DemandTest />,
              text: (
                <>
                  {" "}
                  <Term>Demand</Term> is a want supported by both the ability and willingness to
                  pay.
                </>
              ),
            },
          ]}
        />
        <Lede plate={<ShapeNotCreate />} cols="lg:grid-cols-[1.3fr_1fr]" className={GAP}>
          <Statement className={cn(LEDE, "!max-w-[34ch]")}>
            A marketer <Tint>can shape</Tint> a want.{" "}
            <span className="text-[var(--ink-3)]">
              A marketer cannot create the basic human need underneath it.
            </span>
          </Statement>
        </Lede>
      </Slide>

      {/* ================================================================
          Maslow's Hierarchy in Consumer Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="maslows-hierarchy-in-consumer-markets"
        border
        exercise={exercise["maslows-hierarchy-in-consumer-markets"]}
      >
        <TheoryRule active={2} />
        <Heading>Maslow&apos;s Hierarchy in Consumer Markets</Heading>
        <Statement className={cn(LEDE, "!max-w-[48ch]")}>
          Maslow proposed that human needs can be arranged from{" "}
          <Tint tone="ink">basic needs</Tint> to <Tint>higher-order needs</Tint>.
        </Statement>
        <ol className="mt-6 grid w-full gap-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-6">
          <TierLine lit={[0]}>
            <Term tone="ink">Physiological needs</Term> include food, water, and sleep.
          </TierLine>
          <TierLine lit={[1]}>
            <Term tone="ink">Safety needs</Term> include protection, stability, and health.
          </TierLine>
          <TierLine lit={[2, 3]}>
            <Term tone="counter">Belonging and esteem needs</Term> include friendship,
            acceptance, achievement, and status.
          </TierLine>
          <TierLine lit={[4]}>
            <Term>Self-actualization</Term> involves growth and becoming the person one wants to
            be.
          </TierLine>
        </ol>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr_1fr] lg:gap-10 [@media(min-width:768px)_and_(max-height:900px)]:!mt-6">
          <Plate>
            <MaslowPyramid />
          </Plate>
          <Statement className={cn(LEDE, "!max-w-[30ch]")}>
            Consumers can pursue several levels <Tint>at the same time</Tint>.{" "}
            <span className="text-[var(--ink-3)]">
              The hierarchy is a guide, not a strict shopping sequence.
            </span>
          </Statement>
          <Plate>
            <SeveralLevels />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Motivational Conflicts: Three Difficult Choices
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="motivational-conflicts-three-difficult-choices"
        border
        exercise={exercise["motivational-conflicts-three-difficult-choices"]}
      >
        <TheoryRule active={3} />
        <Heading kicker="Motivational Conflicts:">Three Difficult Choices</Heading>
        <Cells
          cols={3}
         
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
        <div className={cn(GAP, "grid w-full gap-10 lg:grid-cols-2 lg:gap-12")}>
          <Lede plate={<PhoneOrTrip />} cols="xl:grid-cols-[1fr_1.35fr]">
            <Ruled tone="signal" className="!pt-4">
              <P>
                {" "}
                A buyer may want <Term>a new phone</Term> and <Term>a weekend trip</Term>, but the
                budget allows only one.
              </P>
            </Ruled>
          </Lede>
          <Lede plate={<ClearerChoice />} cols="xl:grid-cols-[1fr_1.35fr]">
            <Ruled tone="counter" className="!pt-4">
              <P>
                Strong brands reduce conflict by making <Term tone="counter">benefits clear</Term>{" "}
                and <Term tone="counter">costs easier to understand</Term>.
              </P>
            </Ruled>
          </Lede>
        </div>
      </Slide>

      {/* ================================================================
          Consumer Involvement: How Much Does It Matter?
          ================================================================ */}
      <Slide className={TIGHT} id="consumer-involvement-how-much-does-it-matter" border>
        <Heading kicker="Consumer Involvement:">How Much Does It Matter?</Heading>
        <Lede wide plate={<InvolvementScale />}>
          <Statement className={cn(LEDE, "!max-w-[32ch]")}>
            Involvement is the <Tint>personal importance</Tint> a consumer assigns to a product,
            message, or purchase situation.
          </Statement>
        </Lede>
        <Cells
          cols={3}
         
          className={GAP}
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
        <Lede wide plate={<HighVsLow />} className={GAP}>
          <Ruled tone="signal" className="!pt-4">
            <Lead>
              {" "}
              <Term>High involvement</Term> leads to more effort and careful comparison.{" "}
              <span className="text-[var(--ink-3)]">
                Low involvement often leads to habit and simple cues.
              </span>
            </Lead>
          </Ruled>
        </Lede>
      </Slide>

      {/* ================================================================
          Values Guide Consumer Choices
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="values-guide-consumer-choices"
        border
        exercise={exercise["values-guide-consumer-choices"]}
      >
        <Heading>Values Guide Consumer Choices</Heading>
        <Statement className={cn(LEDE, "!max-w-[40ch]")}>
          Values are <Tint>enduring beliefs</Tint> about what is important or desirable.
        </Statement>
        <Cells
          cols={3}
         
          className="mt-8"
          items={[
            {
              key: "functional",
              tone: "ink",
              plate: <FunctionalValue />,
              text: (
                <>
                  <Term tone="ink">Functional values</Term> focus on performance, convenience, and
                  reliability.
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
        <Lede wide plate={<FitsValues />} className={GAP}>
          <Ruled tone="signal" className="!pt-4">
            <Lead>
              {" "}
              Consumers often choose between products by asking which one{" "}
              <Term>fits their values</Term>, not only which one has the most features.
            </Lead>
          </Ruled>
        </Lede>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-find-the-motive" border>
        <Heading kicker="Discussion:" tone="counter">
          Find the Motive
        </Heading>
        <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-8 md:px-14 md:py-10">
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
        <Plate wide className="mt-8 max-w-5xl">
          <FindTheMotive />
        </Plate>
      </Slide>
    </SlideDeck>
  );
}
