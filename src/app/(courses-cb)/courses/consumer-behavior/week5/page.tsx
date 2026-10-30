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
// CONSUMER BEHAVIOR | WEEK 5: PERSONALITY, SELF-CONCEPT, AND LIFESTYLES
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md. The
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md), and reuse the words of the slide they illustrate.
//
// In the slide text, colour is rare: each slide gives SIGNAL to at most one
// phrase, its key idea. Defined terms are bold ink, and every rule is ink.
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
  signal: "border-[var(--rule)]",
  counter: "border-[var(--rule)]",
  ink: "border-[var(--rule)]",
};

const TEXT: Record<Tone, string> = {
  signal: "text-[var(--ink)]",
  counter: "text-[var(--ink)]",
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

/** Inline emphasis for a phrase inside a line. */
function Tint({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return <strong className={cn("font-semibold", TEXT[tone])}>{children}</strong>;
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
        "min-w-0 border-t pt-5",
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
 * inside its well there, like `Figure`. From lg up the column is wide enough.
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
          <div className={cn("border-t pt-3", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** A ruled line for a ring or map item. */
function MarkLine({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="min-w-0 border-t border-[var(--rule)] pt-3">
      <p className="type-body min-w-0">{children}</p>
    </li>
  );
}

export default function Week5() {
  return (
    <SlideDeck label="Week 5">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 5
          </p>
          <p className="type-caption mt-2">
            Consumer Behavior | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Personality, Self-Concept, and Lifestyles
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote !text-[clamp(1.4rem,2.2vw,1.9rem)]">
              Consumers do not just buy products.{" "}
              They buy symbols that mirror{" "}
              who they are and{" "}
              <Tint>who they hope to become</Tint>.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Is the Self-Concept?
          ================================================================ */}
      <Slide className={TIGHT} id="what-is-the-self-concept" border>
        <Heading>What Is the Self-Concept?</Heading>
        {/* The definition and the four things it covers sit beside their
            plate. Self-esteem and its two poles share the row below. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Statement className="!max-w-[26ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
              Self-concept is the collection of <Tint>beliefs</Tint> a person
              holds about their own attributes and qualities.
            </Statement>
            <Lead className="mt-5 text-[var(--ink-3)]">
              It includes how we judge our own{" "}
              <Term>appearance</Term>,{" "}
              <Term>intellect</Term>, <Term>skills</Term>,
              and <Term>character</Term>.
            </Lead>
          </div>
          <Plate wide>
            <V.SelfJudgement />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-10 lg:grid-cols-[0.9fr_2fr] lg:gap-10">
          <Ruled tone="ink" className="self-start">
            <Big>
              Self-esteem refers to the positivity of a
              person&apos;s self-concept.
            </Big>
          </Ruled>
          <Cells
            items={[
              {
                key: "high",
                tone: "ink",
                text: (
                  <>
                    People with <Term>high self-esteem</Term> expect to succeed
                    and take more risks when buying new products.
                  </>
                ),
              },
              {
                key: "low",
                tone: "ink",
                text: (
                  <>
                    {" "}
                    People with <Term>low self-esteem</Term> try to
                    avoid failure and seek reassurance through safe, well-known
                    brands.
                  </>
                ),
              },
            ]}
          />
        </div>
      </Slide>

      {/* ================================================================
          The Actual Self Versus the Ideal Self
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-actual-self-versus-the-ideal-self"
        border
        exercise={exercise["the-actual-self-versus-the-ideal-self"]}
      >
        <Heading>The Actual Self Versus the Ideal Self</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="grid w-full gap-8 md:grid-cols-2">
            <Ruled tone="ink">
              <Lead>
                The <Term>actual self</Term> is our realistic appraisal
                of the qualities we have right now.
              </Lead>
            </Ruled>
            <Ruled tone="ink">
              <Lead>
                {" "}
                The <Term tone="signal">ideal self</Term> is our conception of who we would like
                to be.
              </Lead>
            </Ruled>
          </div>
          <Plate>
            <V.GapPanel />
          </Plate>
        </div>
        <Cells
          cols={3}
          className="mt-7"
          items={[
            {
              key: "gap",
              tone: "ink",
              text: (
                <>
                  A <Term>gap</Term> between the actual self and the ideal self
                  creates emotional tension.
                </>
              ),
            },
            {
              key: "bridge",
              tone: "ink",
              text: (
                <>
                  {" "}
                  Consumers buy products to <Term>bridge this gap</Term>. This
                  is called <Term>compensatory consumption</Term>.
                </>
              ),
            },
            {
              key: "ad",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Fantasy appeals</Term> and{" "}
                  <Term>aspirational advertising</Term> show
                  consumers how a product brings them closer to their ideal
                  self.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          The Extended Self: Possessions as Identity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-extended-self-possessions-as-identity"
        border
        exercise={exercise["the-extended-self-possessions-as-identity"]}
      >
        <Heading kicker="The Extended Self:">Possessions as Identity</Heading>
        <Statement className="!max-w-[40ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          We are what we own.{" "}
          <span className="text-[var(--ink-3)]">
            External objects often become part of who we are.
          </span>
        </Statement>
        {/* The definition and its four levels read down the left. The rings
            they walk through sit beside them, each level keyed by its mark. */}
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="min-w-0">
            <Lead>
              The <Term tone="signal">extended self</Term> includes possessions that people
              use to define their social identity.
            </Lead>
            <ol className="mt-6 flex w-full flex-col gap-4">
              <MarkLine>
                <Term>Individual level:</Term> personal items like
                jewelry, cars, and clothing define personal identity.
              </MarkLine>
              <MarkLine>
                <Term>Family level:</Term> a consumer&apos;s home and
                furnishings represent family identity and shared memories.
              </MarkLine>
              <MarkLine>
                <Term>Community level:</Term> neighborhoods and
                hometowns shape local identity.
              </MarkLine>
              <MarkLine>
                <Term>Group level:</Term> attachments to sports
                teams, subcultures, or social movements define group identity.
              </MarkLine>
            </ol>
          </div>
          <Plate wide>
            <V.ExtendedRings />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Identity and Automation: The Tasks Consumers Keep
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="identity-and-automation-the-tasks-consumers-keep"
        border
        exercise={exercise["identity-and-automation-the-tasks-consumers-keep"]}
      >
        <Heading kicker="Identity and Automation:">The Tasks Consumers Keep</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-12">
          <div className="grid min-w-0 gap-3">
            <Statement className="!max-w-[44ch] !text-[clamp(1.2rem,1.8vw,1.5rem)]">
              Many products and AI tools now promise to do tasks for the consumer, from cooking to
              writing.
            </Statement>
            <P>
              Consumers <Term>do not always welcome</Term> this help.
            </P>
            <P>
              When a task is central to a person&apos;s identity, the person wants to feel that the
              result is <Term tone="signal">their own work</Term>.
            </P>
            <P>
              Research shows that people who strongly identify with an activity, such as cooking,
              are less interested in products that automate the skills involved (Leung, Paolacci,
              &amp; Puntoni, 2018).
            </P>
            <P>
              A passionate home baker may <Term>reject</Term> a machine that makes bread
              automatically, while a busy parent may welcome it.
            </P>
          </div>
          <Plate>
            <V.BakerVsParent />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled tone="ink" className="!pt-3">
            <P>
              For the same reason, a consumer may let an AI agent handle{" "}
              <Term>routine purchases</Term> but keep the choices that express who they
              are.
            </P>
          </Ruled>
          <Ruled tone="ink" className="!pt-3">
            <P>
              Marketers of automated products can leave room for the consumer&apos;s{" "}
              <Term>own contribution</Term>, so the consumer still feels ownership of the result.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Personality Traits and Consumer Behavior
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="personality-traits-and-consumer-behavior"
        border
      >
        <Heading>Personality Traits and Consumer Behavior</Heading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Personality refers to a person&apos;s unique psychological makeup that{" "}
          <Tint>consistently</Tint> influences their responses to the
          environment.
        </Statement>
        <Lead className="mt-5 text-[var(--ink-3)]">
          <Term>Trait theory</Term> views personality as a set of
          measurable characteristics.
        </Lead>
        <Cells
          cols={4}
          className="mt-7"
          items={[
            {
              key: "innovativeness",
              tone: "ink",
              text: (
                <>
                  <Term>Innovativeness</Term> is the degree to which
                  a person likes to try new things.
                </>
              ),
            },
            {
              key: "materialism",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Materialism</Term> is the emphasis a person
                  places on owning worldly goods for status.
                </>
              ),
            },
            {
              key: "cognition",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Need for cognition</Term> is the degree to
                  which a person enjoys thinking hard and reading detailed
                  product descriptions.
                </>
              ),
            },
            {
              key: "frugality",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Frugality</Term> is the tendency to
                  prioritize careful spending and resourcefulness over wasteful
                  buying.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          The Big Five Personality Dimensions
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-big-five-personality-dimensions"
        border
        exercise={exercise["the-big-five-personality-dimensions"]}
      >
        <Heading>The Big Five Personality Dimensions</Heading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Psychologists identify five fundamental dimensions of human
          personality called the <Tint>Big Five</Tint>.
        </Statement>
        {/* The five dimensions are one set, so they read as one strip. */}
        <Cells
          cols={5}
          className="mt-7"
          items={[
            {
              key: "openness",
              tone: "ink",
              text: (
                <>
                  <Term>Openness to experience:</Term> curiosity, creativity,
                  and interest in novelty.
                </>
              ),
            },
            {
              key: "conscientiousness",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Conscientiousness:</Term> organization, self-discipline,
                  and reliability.
                </>
              ),
            },
            {
              key: "extraversion",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Extraversion:</Term> sociability, energy, and
                  talkativeness in social settings.
                </>
              ),
            },
            {
              key: "agreeableness",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Agreeableness:</Term> friendliness, warmth, empathy, and
                  cooperation with others.
                </>
              ),
            },
            {
              key: "neuroticism",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Neuroticism:</Term> emotional instability, tendency to
                  experience anxiety, and mood swings.
                </>
              ),
            },
          ]}
        />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
          <Ruled tone="ink">
            <Big className="!text-[clamp(1.4rem,2.2vw,1.9rem)]">
              {" "}
              Marketers use these dimensions to tailor{" "}
              ad copy,{" "}
              visual tone, and{" "}
              brand messaging.
            </Big>
          </Ruled>
          <Plate wide>
            <V.TailoredAds />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Brand Personality: Giving Life to Objects
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-personality-giving-life-to-objects"
        border
        exercise={exercise["brand-personality-giving-life-to-objects"]}
      >
        <Heading kicker="Brand Personality:">Giving Life to Objects</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Statement className="!max-w-[30ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
            Brand personality is the set of <Tint>human traits</Tint> that
            consumers assign to a brand name.
          </Statement>
          <Plate className="mx-auto max-w-[300px]">
            <V.BrandTraits />
          </Plate>
        </div>
        {/* The five dimensions are one set, so they read as one strip. */}
        <Cells
          cols={5}
          className="mt-7"
          items={[
            {
              key: "sincerity",
              tone: "ink",
              text: (
                <>
                  <Term>Sincerity:</Term> brands seen as
                  down-to-earth, honest, wholesome, and cheerful, like Hallmark
                  or Campbell&apos;s.
                </>
              ),
            },
            {
              key: "excitement",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Excitement:</Term> brands seen as daring,
                  spirited, imaginative, and modern, like Apple or Red Bull.
                </>
              ),
            },
            {
              key: "competence",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Competence:</Term> brands seen as
                  reliable, intelligent, and successful, like Volvo or Google.
                </>
              ),
            },
            {
              key: "sophistication",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Sophistication:</Term> brands seen as
                  upper-class, elegant, and charming, like Chanel or Rolex.
                </>
              ),
            },
            {
              key: "ruggedness",
              tone: "ink",
              text: (
                <>
                  {" "}
                  <Term>Ruggedness:</Term> brands seen as
                  outdoorsy, tough, and durable, like Jeep or Patagonia.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          Anthropomorphism and Brand Relationships
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="anthropomorphism-and-brand-relationships"
        border
      >
        <Heading className="!max-w-none !text-[clamp(2rem,3.2vw,2.9rem)]">
          Anthropomorphism and Brand Relationships
        </Heading>
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead className="!text-[var(--ink)]">
              Anthropomorphism occurs when people assign{" "}
              <Term tone="signal">human qualities, faces, or intentions</Term> to non-human
              objects.
            </Lead>
            <Ruled tone="ink">
              <Lead>
                <Term>Mascots</Term> like the Michelin Man or the
                M&amp;M characters make abstract corporate products feel
                friendly.
              </Lead>
            </Ruled>
          </div>
          <Plate>
            <V.FaceInObject />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="ink">
            <P>
              When consumers view a brand as a{" "}
              human partner, brand loyalty turns
              into an emotional relationship.
            </P>
          </Ruled>
          <Ruled tone="ink">
            <P>
              <Term>Brand love</Term> occurs when a consumer feels passion,
              commitment, and positive attachment toward a brand.
            </P>
          </Ruled>
          <Ruled tone="ink">
            <P>
              {" "}
              When an anthropomorphized brand fails, consumers feel{" "}
              personal betrayal rather than simple dissatisfaction.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Psychographics and Lifestyles: Measuring AIOs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="psychographics-and-lifestyles-measuring-aios"
        border
        exercise={exercise["psychographics-and-lifestyles-measuring-aios"]}
      >
        <Heading kicker="Psychographics and Lifestyles:">
          Measuring AIOs
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <Statement className="!max-w-[22ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
            <span className="text-[var(--ink-3)]">
              Demographics tell us who buys.
            </span>{" "}
            Psychographics tell us <Tint>why</Tint> they buy.
          </Statement>
          <Plate wide>
            <V.WhoWhy />
          </Plate>
        </div>
        {/* Lifestyle and the method lead the row. The three AIOs follow. */}
        <div className="mt-5 grid w-full gap-10 lg:grid-cols-[0.95fr_3fr] lg:gap-8">
          <div className="min-w-0 border-t border-[var(--rule)] pt-4">
            <P>
              <Term>Lifestyle</Term> defines a pattern of consumption that
              reflects a person&apos;s choices about how they spend time and
              money.
            </P>
            <P className="mt-4 text-[var(--ink-3)]">
              Psychographics uses psychological, sociological, and
              anthropological factors to segment markets.
            </P>
          </div>
          <Cells
            cols={3}
            items={[
              {
                key: "activities",
                tone: "ink",
                text: (
                  <>
                    <Term>Activities</Term> focus on work, hobbies, social
                    events, vacations, and entertainment.
                  </>
                ),
              },
              {
                key: "interests",
                tone: "ink",
                text: (
                  <>
                    {" "}
                    <Term>Interests</Term> focus on family, home, job,
                    community, food, and fashion.
                  </>
                ),
              },
              {
                key: "opinions",
                tone: "ink",
                text: (
                  <>
                    {" "}
                    <Term>Opinions</Term> focus on oneself, social issues,
                    politics, business, and products.
                  </>
                ),
              },
            ]}
          />
        </div>
      </Slide>

      {/* ================================================================
          The VALS Segmentation System
          ================================================================ */}
      <Slide className={TIGHT} id="the-vals-segmentation-system" border>
        <Heading>The VALS Segmentation System</Heading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          The Values and Lifestyles system, or VALS, divides adults into{" "}
          <Tint>eight consumer segments</Tint> based on psychological traits and
          resources.
        </Statement>
        {/* The map sits beside its five lines. Each line's mark lights its
            own cells on the map. */}
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <Plate wide>
            <V.VALSMap />
          </Plate>
          <ol className="flex w-full min-w-0 flex-col gap-3">
            <MarkLine>
              <Term>Innovators</Term> are successful, sophisticated people with
              high resources and abundant energy.
            </MarkLine>
            <MarkLine>
              <Term>Thinkers and Believers</Term> are motivated by
              ideals, knowledge, and principles.
            </MarkLine>
            <MarkLine>
              <Term>Achievers and Strivers</Term> are motivated by
              achievement, status, and recognition from peers.
            </MarkLine>
            <MarkLine>
              <Term>Experiencers and Makers</Term> are motivated by
              self-expression, physical activity, and adventure.
            </MarkLine>
            <MarkLine>
              <Term>Survivors</Term> have the fewest resources and
              focus on meeting basic needs rather than expressing lifestyle.
            </MarkLine>
          </ol>
        </div>
      </Slide>

      {/* ================================================================
          Synthetic Consumers: AI as a Survey Respondent
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="synthetic-consumers-ai-as-a-survey-respondent"
        border
        exercise={exercise["synthetic-consumers-ai-as-a-survey-respondent"]}
      >
        <Heading kicker="Synthetic Consumers:">AI as a Survey Respondent</Heading>
        <div className="grid w-full gap-4">
          <P>
            Psychographic research depends on asking consumers about their activities, interests,
            and opinions.
          </P>
          <Statement className="!max-w-[46ch] !text-[clamp(1.15rem,1.7vw,1.45rem)]">
            Some researchers now ask large language models to answer surveys as if they were
            consumers with a given profile. These answers are called{" "}
            <Tint>synthetic responses</Tint>.
          </Statement>
          <P>
            Synthetic responses are fast and cheap. Early studies found that they can mirror some
            patterns in real consumer data, such as sensitivity to price (Brand, Israeli, &amp;
            Ngwe, 2023).
          </P>
        </div>
        {/* The first limit leads its plate. The others follow beneath it. */}
        <div className="mt-8 grid w-full items-center gap-6 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-x-12">
          <Ruled tone="ink" className="!pt-3 lg:col-start-1 lg:row-start-1 lg:self-end">
            <P>
              Synthetic responses also have <Term>limits</Term>. The same model can
              give a different answer each time it is asked the same question (Wadi &amp; Fredette,
              2025).
            </P>
          </Ruled>
          <Plate className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
            <V.AskAgain />
          </Plate>
          <P className="lg:col-start-1 lg:row-start-2">
            Models can also show biases, such as anchoring on a number in the question (Wadi &amp;
            Fredette, 2025) or favoring products from some countries over others (Wadi, Ghodrat,
            &amp; Philp, 2026).
          </P>
          <P className="lg:col-start-1 lg:row-start-3 lg:self-start">
            A synthetic consumer has <Term>no lived experience</Term> of buying or using
            a product.
          </P>
        </div>
        <Ruled tone="ink" className="mt-6 w-full !pt-3">
          <P className="!max-w-none">
            Synthetic responses can help researchers <Term>design and pretest</Term> a survey.
            Decisions about real consumers still need data from real consumers.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-your-extended-self" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Extended Self
        </Heading>
        <div className="relative w-full max-w-5xl border-l border-[var(--rule-2)] pl-6 py-2">
          <p className="type-quote !text-[clamp(1.3rem,2vw,1.75rem)] max-w-[46ch]">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--ink-3)]">
              Discussion:
            </span>{" "}
            Name one possession you own that feels like part of your identity.{" "}
            
              If someone took it away, how would it change the way you see
              yourself?
            {" "}
            Does it reflect your actual self or your ideal self?
          </p>
        </div>
      </Slide>
    </SlideDeck>
  );
}
