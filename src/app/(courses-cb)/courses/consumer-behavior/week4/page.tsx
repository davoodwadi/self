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
  WhyReview,
  CreditByMessage,
  DelegateByInvolvement,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 04 — MOTIVATION, NEEDS, AND VALUES
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx (Editorial Sketch, see ../CLAUDE.md).
//
// Colour is rare (see the root CLAUDE.md): each slide gives SIGNAL to at most
// one phrase, its key idea; defined terms are bold ink and every rule is ink.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it. Drive theory is a process, so its moments are put
// in order; the three expectancy beliefs, intrinsic and extrinsic motives and
// crowding out, and the three motivational conflicts are told apart case by
// case (identify); needs, wants and demand, and the
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
function Term({ children, tone = "ink" }: { children: React.ReactNode; tone?: Tone }) {
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
      <h2 className="type-h1 max-w-[32ch]">
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
  plateClass = "",
}: {
  cols: 3 | 4;
  items: { key: string; tone: Tone; text: React.ReactNode; plate?: React.ReactNode }[];
  className?: string;
  /** Extra classes for each cell's plate, such as a width cap on a dense slide. */
  plateClass?: string;
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
          {s.plate ? <Plate className={cn("mt-auto", plateClass)}>{s.plate}</Plate> : null}
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
            <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
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
            desired state.
          </Statement>
        </Lede>
        <Cells
          cols={3}
         
          className={GAP}
          items={[
            {
              key: "tension",
              tone: "ink",
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
              tone: "ink",
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
              tone: "ink",
              plate: <ConnectOffer />,
              text: (
                <>
                  {" "}
                  Marketers study motives so they can connect an{" "}
                  <Term>offer</Term> with a <Term>goal</Term> that matters to the
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
        <Heading kicker="Drive Theory:">Tension and Reduction</Heading>
        <div className="grid w-full gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-12">
          <Statement className={cn(LEDE, "!max-w-[36ch]")}>
            Drive theory says that an unmet need creates an uncomfortable internal state called a{" "}
            <Tint>drive</Tint>.
          </Statement>{" "}
          <Lead className="text-[var(--ink-3)]">
            The drive <Term>pushes</Term> the consumer toward an action that reduces the
            discomfort.
          </Lead>
        </div>
        <Cells
          cols={3}
          className={GAP}
          items={[
            {
              key: "hunger",
              tone: "ink",
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
              tone: "ink",
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
              tone: "ink",
              plate: <MarketingDrive />,
              text: (
                <>
                  {" "}
                  Marketing can <Term>remind</Term> people of a need or show how a
                  product may <Term>reduce</Term> the resulting drive.
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
              tone: "ink",
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
          <Ruled tone="ink" className="!pt-4">
            <Lead>
              A consumer is more motivated when the goal seems <Term>possible</Term>, the product
              seems <Term>useful</Term>, and the result feels <Term>valuable</Term>.
            </Lead>
          </Ruled>
        </Lede>
      </Slide>

      {/* ================================================================
          Intrinsic and Extrinsic Motivation: Why Consumers Write Reviews
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="intrinsic-and-extrinsic-motivation-why-consumers-write-reviews"
        border
        exercise={exercise["intrinsic-and-extrinsic-motivation-why-consumers-write-reviews"]}
      >
        <Heading kicker="Intrinsic and Extrinsic Motivation:">Why Consumers Write Reviews</Heading>
        {/* The definitions lead the two-panel plate; the reward and its risk
            follow beneath them, beside the plate. */}
        <div className="grid w-full items-center gap-6 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-x-12">
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-1 lg:self-end">
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Intrinsic motivation</Term> comes from the activity itself, such as enjoyment
                or the wish to help others.
              </P>
            </Ruled>
            <Ruled tone="ink" className="!pt-3">
              <P>
                <Term>Extrinsic motivation</Term> comes from an outside reward, such as
                money, points, or a discount.
              </P>
            </Ruled>
            <P className="sm:col-span-2">
              Many consumers write online reviews to <Term>help other shoppers</Term> decide. This
              is an intrinsic, altruistic motive.
            </P>
          </div>
          <Plate className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <WhyReview />
          </Plate>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-2 lg:self-start">
            <P>
              Firms often offer rewards for reviews, because reviews guide both shoppers and the AI
              agents that read reviews for them.
            </P>
            <Ruled tone="ink" className="!pt-3">
              <P>
                A reward can <Term>crowd out</Term> intrinsic motives. When people are
                paid for a kind act, the act can start to feel like a transaction.
              </P>
            </Ruled>
          </div>
        </div>
        <div className={cn("grid w-full items-center gap-8 lg:grid-cols-[1fr_minmax(0,360px)] lg:gap-12", GAP)}>
          <div className="grid min-w-0 gap-4">
            <P className="!max-w-none">
              The <Term>message</Term> that comes with a request matters. In a field study with a
              North American online retailer, asking customers to help other shoppers raised the
              odds of a review more than asking them to help the company (Wadi et al., 2026a).
            </P>
            <P className="!max-w-none">
              In a follow-up experiment, a $10 credit raised review intentions more when the message
              asked customers to help other shoppers than when it asked them to help the company.
            </P>
          </div>
          <Plate>
            <CreditByMessage />
          </Plate>
        </div>
        <Ruled tone="ink" className={cn("w-full !pt-3", GAP)}>
          <P className="!max-w-none">
            The same reward also works differently for different people. A reward paid only when a
            review received a &ldquo;helpful&rdquo; vote raised the number and length of reviews
            more for <Term>first-time reviewers</Term> than for experienced reviewers
            (Wadi et al., 2026b).
          </P>
        </Ruled>
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
                  A <Term>need</Term> is a basic biological or psychological
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
                  A <Term>want</Term> is the specific product or service chosen to
                  satisfy a need.
                </>
              ),
            },
            {
              key: "shaped",
              tone: "ink",
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
              tone: "ink",
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
        <Heading>Maslow&apos;s Hierarchy in Consumer Markets</Heading>
        <Statement className={cn(LEDE, "!max-w-[48ch]")}>
          Maslow proposed that human needs can be arranged from{" "}
          <Tint tone="ink">basic needs</Tint> to <Tint>higher-order needs</Tint>.
        </Statement>
        <ol className="mt-6 grid w-full gap-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-6">
          <TierLine lit={[0]}>
            <Term>Physiological needs</Term> include food, water, and sleep.
          </TierLine>
          <TierLine lit={[1]}>
            <Term>Safety needs</Term> include protection, stability, and health.
          </TierLine>
          <TierLine lit={[2, 3]}>
            <Term>Belonging and esteem needs</Term> include friendship,
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
            Consumers can pursue several levels at the same time.{" "}
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
        <Heading kicker="Motivational Conflicts:">Three Difficult Choices</Heading>
        <Cells
          cols={3}
         
          items={[
            {
              key: "aa",
              tone: "ink",
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
                  <Term>Approach-avoidance conflict</Term> occurs when the same option
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
                  <Term>Avoidance-avoidance conflict</Term> occurs when every available
                  option has an unwanted consequence.
                </>
              ),
            },
          ]}
        />
        <div className={cn(GAP, "grid w-full gap-10 lg:grid-cols-2 lg:gap-12")}>
          <Lede plate={<PhoneOrTrip />} cols="xl:grid-cols-[1fr_1.35fr]">
            <Ruled tone="ink" className="!pt-4">
              <P>
                {" "}
                A buyer may want <Term>a new phone</Term> and <Term>a weekend trip</Term>, but the
                budget allows only one.
              </P>
            </Ruled>
          </Lede>
          <Lede plate={<ClearerChoice />} cols="xl:grid-cols-[1fr_1.35fr]">
            <Ruled tone="ink" className="!pt-4">
              <P>
                Strong brands reduce conflict by making <Term>benefits clear</Term>{" "}
                and <Term>costs easier to understand</Term>.
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
        <Lede wide plate={<InvolvementScale />} cols="lg:grid-cols-[1.2fr_1fr]">
          <Statement className={cn(LEDE, "!max-w-[32ch]")}>
            Involvement is the <Tint>personal importance</Tint> a consumer assigns to a product,
            message, or purchase situation.
          </Statement>
        </Lede>
        <Cells
          cols={3}
          className={GAP}
          plateClass="mx-auto max-w-[210px]"
          items={[
            {
              key: "product",
              tone: "ink",
              plate: <ProductInvolvement />,
              text: (
                <>
                  <Term>Product involvement</Term> is high when the product affects
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
                  <Term>Message involvement</Term> is high when the consumer pays close
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
                  <Term>Purchase situation involvement</Term> changes with time
                  pressure, social setting, and perceived risk.
                </>
              ),
            },
          ]}
        />
        {/* High and low involvement lead their plate; the delegation line
            sits beneath them and leads its own plate on the right. */}
        <div className={cn("grid w-full items-center gap-6 lg:grid-cols-[1.6fr_1.1fr_0.8fr] lg:gap-x-8", GAP)}>
          <Ruled tone="ink" className="!pt-4 lg:col-start-1 lg:row-start-1 lg:self-end">
            <Lead className="!text-[clamp(1.05rem,1.4vw,1.25rem)]">
              {" "}
              <Term>High involvement</Term> leads to more effort and careful comparison.{" "}
              <span className="text-[var(--ink-3)]">
                Low involvement often leads to habit and simple cues.
              </span>
            </Lead>
          </Ruled>
          <Plate wide className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <HighVsLow />
          </Plate>
          <P className="lg:col-start-1 lg:row-start-2 lg:self-start">
            Involvement also shapes <Term>delegation</Term>. A consumer may let an AI agent reorder
            laundry detergent, a low-involvement purchase, but still choose an engagement ring in
            person.
          </P>
          <Plate className="lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <DelegateByInvolvement />
          </Plate>
        </div>
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
                  <Term>Functional values</Term> focus on performance, convenience, and
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
                  <Term>Social values</Term> focus on belonging, recognition, and how
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
                  <Term>Experiential values</Term> focus on pleasure, excitement,
                  comfort, or meaning.
                </>
              ),
            },
          ]}
        />
        <Lede wide plate={<FitsValues />} className={GAP}>
          <Ruled tone="ink" className="!pt-4">
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
            What need or value did it serve? Which theory best
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
