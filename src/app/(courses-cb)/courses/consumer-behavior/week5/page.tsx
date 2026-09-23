"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import quizzesData from "./quizzes.json";
import * as V from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR · WEEK 05 — PERSONALITY, SELF-CONCEPT, AND LIFESTYLES
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx, drawn in the course's Editorial Sketch style (see
// ../CLAUDE.md), and reuse the words of the slide they illustrate.
//
// In the slide text, SIGNAL marks the self a consumer reaches for (the ideal
// self, the lit trait, the chosen segment); COUNTER the brand and the
// discussion.
//
// Wayfinding: the title names three ideas, Self-Concept, Personality and
// Lifestyles. A strip names them and lights the one each slide belongs to.
//
// Quizzes: `Slide` renders `quizData` AFTER its section, so each [quiz]-tagged
// topic carries its own quiz, testing that slide and the ones before it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzesData as CourseQuiz[]);

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
      className={cn("gsap-reveal type-body max-w-[var(--measure)]", className)}
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
    <p className={cn("gsap-reveal type-lead max-w-[48ch]", className)}>
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
    <p className={cn("gsap-reveal type-quote max-w-[30ch]", className)}>
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
    <p className={cn("gsap-reveal type-h2 !font-normal", className)}>
      {children}
    </p>
  );
}

/** Coloured term inside a line. */
function Term({
  children,
  tone = "signal",
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
        "gsap-reveal min-w-0 border-t-2 pt-5",
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
        "gsap-reveal figure-well w-full min-w-0 p-3",
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
}: {
  kicker?: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
}) {
  return (
    <div className="gsap-reveal mb-8 w-full md:mb-10">
      <h2 className="type-h1 max-w-[22ch]">
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label mb-4 block !text-[0.8rem]",
                tone === "counter"
                  ? "!text-[var(--counter)]"
                  : "!text-[var(--signal)]",
              )}
            >
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-5 h-px w-full bg-[var(--rule)]" />
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
        "grid w-full gap-10 md:grid-cols-2 md:gap-x-8 lg:gap-6",
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
        <li key={s.key} className="gsap-reveal flex min-w-0 flex-col gap-4">
          <div className={cn("border-t-2 pt-4", BORDER[s.tone])}>
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

/** A ruled line led by a small mark (a ring or a map cell) that places it. */
function MarkLine({
  mark,
  children,
}: {
  mark: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="gsap-reveal flex min-w-0 items-start gap-4 border-t border-[var(--ink)] pt-3">
      {mark}
      <p className="type-body min-w-0">{children}</p>
    </li>
  );
}

/** Self-Concept · Personality · Lifestyles, the three ideas in the title. */
const IDEAS = ["Self-Concept", "Personality", "Lifestyles"];

function IdeaRule({ active }: { active: 0 | 1 | 2 }) {
  return (
    <ol
      aria-hidden
      className="gsap-reveal mb-8 grid w-full grid-cols-3 gap-2 sm:gap-4 md:mb-10"
    >
      {IDEAS.map((name, i) => {
        const on = i === active;
        return (
          <li
            key={name}
            className={cn(
              "min-w-0 border-t-2 pt-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em]",
              on
                ? "border-[var(--signal)] text-[var(--signal)]"
                : "border-[var(--rule)] text-[var(--ink-3)]",
            )}
          >
            {name}
          </li>
        );
      })}
    </ol>
  );
}

export default function Week5() {
  return (
    <SlideDeck label="Week 05">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <p className="gsap-reveal type-label !text-[0.8rem] !text-[var(--signal)]">
              Week 05
            </p>
            <p className="gsap-reveal type-caption mt-2">
              Consumer Behavior · Davood Wadi, PhD
            </p>
            <Title className="mt-8 !max-w-[14ch]">
              Personality, Self-Concept, and Lifestyles
            </Title>
            <div className="gsap-reveal mt-10 max-w-[36ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote">
                <span className="text-[var(--ink-3)]">
                  Consumers do not just buy products.
                </span>{" "}
                They buy symbols that mirror{" "}
                <Tint tone="ink">who they are</Tint> and{" "}
                <Tint>who they hope to become</Tint>.
              </p>
            </div>
          </div>
          <div className="gsap-reveal mx-auto w-full max-w-[340px]">
            <V.MirrorSelf />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          What Is the Self-Concept?
          ================================================================ */}
      <Slide className={TIGHT} id="what-is-the-self-concept" border>
        <IdeaRule active={0} />
        <Heading>What Is the Self-Concept?</Heading>
        {/* The definition and the four things it covers sit beside their
            plate; self-esteem and its two poles share the row below. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="min-w-0">
            <Statement className="!max-w-[26ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
              Self-concept is the collection of <Tint>beliefs</Tint> a person
              holds about their own attributes and qualities.
            </Statement>
            <Lead className="mt-5 text-[var(--ink-3)]">
              It includes how we judge our own{" "}
              <Term tone="ink">appearance</Term>,{" "}
              <Term tone="ink">intellect</Term>, <Term tone="ink">skills</Term>,
              and <Term tone="ink">character</Term>.
            </Lead>
          </div>
          <Plate wide>
            <V.SelfJudgement />
          </Plate>
        </div>
        <div className="mt-12 grid w-full gap-10 lg:grid-cols-[0.9fr_2fr] lg:gap-10">
          <Ruled tone="signal" className="self-start">
            <Big>
              <Tint>Self-esteem</Tint> refers to the positivity of a
              person&apos;s self-concept.
            </Big>
          </Ruled>
          <Cells
            items={[
              {
                key: "high",
                tone: "signal",
                plate: <V.HighEsteem />,
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
                plate: <V.LowEsteem />,
                text: (
                  <>
                    {" "}
                    People with <Term tone="ink">low self-esteem</Term> try to
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
        quizData={quiz["the-actual-self-versus-the-ideal-self"]}
      >
        <IdeaRule active={0} />
        <Heading>The Actual Self Versus the Ideal Self</Heading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="ink">
            <Lead>
              The <Term tone="ink">actual self</Term> is our realistic appraisal
              of the qualities we have right now.
            </Lead>
          </Ruled>
          <Ruled tone="signal">
            <Lead>
              {" "}
              The <Term>ideal self</Term> is our conception of who we would like
              to be.
            </Lead>
          </Ruled>
        </div>
        {/* One idea in three beats, read left to right: the gap, the purchases
            that bridge it, the ad that sells the ideal. Matching panels, each
            under its own sentence. */}
        <Cells
          cols={3}
          className="mt-10"
          items={[
            {
              key: "gap",
              tone: "signal",
              plate: <V.GapPanel />,
              text: (
                <>
                  A <Term>gap</Term> between the actual self and the ideal self
                  creates emotional tension.
                </>
              ),
            },
            {
              key: "bridge",
              tone: "signal",
              plate: <V.BridgePanel />,
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
              tone: "counter",
              plate: <V.AdPanel />,
              text: (
                <>
                  {" "}
                  <Term tone="counter">Fantasy appeals</Term> and{" "}
                  <Term tone="counter">aspirational advertising</Term> show
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
        quizData={quiz["the-extended-self-possessions-as-identity"]}
      >
        <IdeaRule active={0} />
        <Heading kicker="The Extended Self:">Possessions as Identity</Heading>
        <Statement className="!max-w-[40ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          We are what we own.{" "}
          <span className="text-[var(--ink-3)]">
            External objects often become part of who we are.
          </span>
        </Statement>
        {/* The definition and its four levels read down the left; the rings
            they walk through sit beside them, each level keyed by its mark. */}
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[0.9fr_1.3fr] lg:gap-12">
          <div className="min-w-0">
            <Lead>
              The <Term>extended self</Term> includes possessions that people
              use to define their social identity.
            </Lead>
            <ol className="mt-6 flex w-full flex-col gap-4">
              <MarkLine mark={<V.RingMark lit={0} />}>
                <Term tone="ink">Individual level:</Term> personal items like
                jewelry, cars, and clothing define personal identity.
              </MarkLine>
              <MarkLine mark={<V.RingMark lit={1} />}>
                <Term tone="ink">Family level:</Term> a consumer&apos;s home and
                furnishings represent family identity and shared memories.
              </MarkLine>
              <MarkLine mark={<V.RingMark lit={2} />}>
                <Term tone="ink">Community level:</Term> neighborhoods and
                hometowns shape local identity.
              </MarkLine>
              <MarkLine mark={<V.RingMark lit={3} />}>
                <Term tone="ink">Group level:</Term> attachments to sports
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
          Personality Traits and Consumer Behavior
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="personality-traits-and-consumer-behavior"
        border
      >
        <IdeaRule active={1} />
        <Heading>Personality Traits and Consumer Behavior</Heading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Personality refers to a person&apos;s unique psychological makeup that{" "}
          <Tint>consistently</Tint> influences their responses to the
          environment.
        </Statement>
        <Lead className="mt-5 text-[var(--ink-3)]">
          <Term tone="ink">Trait theory</Term> views personality as a set of
          measurable characteristics.
        </Lead>
        <Cells
          cols={4}
          className="mt-10"
          items={[
            {
              key: "innovativeness",
              tone: "ink",
              plate: <V.Innovativeness />,
              text: (
                <>
                  <Term tone="ink">Innovativeness</Term> is the degree to which
                  a person likes to try new things.
                </>
              ),
            },
            {
              key: "materialism",
              tone: "ink",
              plate: <V.Materialism />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Materialism</Term> is the emphasis a person
                  places on owning worldly goods for status.
                </>
              ),
            },
            {
              key: "cognition",
              tone: "ink",
              plate: <V.NeedForCognition />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Need for cognition</Term> is the degree to
                  which a person enjoys thinking hard and reading detailed
                  product descriptions.
                </>
              ),
            },
            {
              key: "frugality",
              tone: "ink",
              plate: <V.Frugality />,
              text: (
                <>
                  {" "}
                  <Term tone="ink">Frugality</Term> is the tendency to
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
        quizData={quiz["the-big-five-personality-dimensions"]}
      >
        <IdeaRule active={1} />
        <Heading>The Big Five Personality Dimensions</Heading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Psychologists identify five fundamental dimensions of human
          personality called the <Tint>Big Five</Tint>.
        </Statement>
        {/* The five dimensions are one set, so they read as one strip. */}
        <Cells
          cols={5}
          className="mt-10"
          items={[
            {
              key: "openness",
              tone: "signal",
              plate: <V.Openness />,
              text: (
                <>
                  <Term>Openness to experience:</Term> curiosity, creativity,
                  and interest in novelty.
                </>
              ),
            },
            {
              key: "conscientiousness",
              tone: "signal",
              plate: <V.Conscientiousness />,
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
              tone: "signal",
              plate: <V.Extraversion />,
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
              tone: "signal",
              plate: <V.Agreeableness />,
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
              tone: "signal",
              plate: <V.Neuroticism />,
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
        <div className="mt-10 grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <Ruled tone="counter">
            <Big>
              {" "}
              Marketers use these dimensions to tailor{" "}
              <Tint tone="counter">ad copy</Tint>,{" "}
              <Tint tone="counter">visual tone</Tint>, and{" "}
              <Tint tone="counter">brand messaging</Tint>.
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
        quizData={quiz["brand-personality-giving-life-to-objects"]}
      >
        <IdeaRule active={1} />
        <Heading kicker="Brand Personality:">Giving Life to Objects</Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <Statement className="!max-w-[30ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
            Brand personality is the set of <Tint>human traits</Tint> that
            consumers assign to a <Tint tone="counter">brand name</Tint>.
          </Statement>
          <Plate className="mx-auto max-w-[300px]">
            <V.BrandTraits />
          </Plate>
        </div>
        {/* The five dimensions are one set, so they read as one strip. */}
        <Cells
          cols={5}
          className="mt-10"
          items={[
            {
              key: "sincerity",
              tone: "counter",
              plate: <V.Sincerity />,
              text: (
                <>
                  <Term tone="counter">Sincerity:</Term> brands seen as
                  down-to-earth, honest, wholesome, and cheerful, like Hallmark
                  or Campbell&apos;s.
                </>
              ),
            },
            {
              key: "excitement",
              tone: "counter",
              plate: <V.Excitement />,
              text: (
                <>
                  {" "}
                  <Term tone="counter">Excitement:</Term> brands seen as daring,
                  spirited, imaginative, and modern, like Apple or Red Bull.
                </>
              ),
            },
            {
              key: "competence",
              tone: "counter",
              plate: <V.Competence />,
              text: (
                <>
                  {" "}
                  <Term tone="counter">Competence:</Term> brands seen as
                  reliable, intelligent, and successful, like Volvo or Google.
                </>
              ),
            },
            {
              key: "sophistication",
              tone: "counter",
              plate: <V.Sophistication />,
              text: (
                <>
                  {" "}
                  <Term tone="counter">Sophistication:</Term> brands seen as
                  upper-class, elegant, and charming, like Chanel or Rolex.
                </>
              ),
            },
            {
              key: "ruggedness",
              tone: "counter",
              plate: <V.Ruggedness />,
              text: (
                <>
                  {" "}
                  <Term tone="counter">Ruggedness:</Term> brands seen as
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
        <IdeaRule active={1} />
        <Heading>Anthropomorphism and Brand Relationships</Heading>
        {/* Top: what anthropomorphism is, and the mascot that puts it to work.
            Below: the relationship it builds, and the betrayal when it fails. */}
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="grid min-w-0 items-center gap-5 sm:grid-cols-[1fr_1.1fr]">
            <Lead className="!text-[var(--ink)]">
              Anthropomorphism occurs when people assign{" "}
              <Term>human qualities, faces, or intentions</Term> to non-human
              objects.
            </Lead>
            <Plate>
              <V.FaceInObject />
            </Plate>
          </div>
          <div className="grid min-w-0 items-center gap-5 sm:grid-cols-[1fr_1.1fr]">
            <Ruled tone="counter">
              <Lead>
                <Term tone="counter">Mascots</Term> like the Michelin Man or the
                M&amp;M characters make abstract corporate products feel
                friendly.
              </Lead>
            </Ruled>
            <Plate>
              <V.Mascot />
            </Plate>
          </div>
        </div>
        <div className="mt-8 grid w-full gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Big>
              When consumers view a brand as a{" "}
              <Tint tone="counter">human partner</Tint>, brand loyalty turns
              into an <Tint>emotional relationship</Tint>.
            </Big>
            <Plate wide>
              <V.BrandPartner />
            </Plate>
            <Ruled tone="signal">
              <P>
                <Term>Brand love</Term> occurs when a consumer feels passion,
                commitment, and positive attachment toward a brand.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Big>
              {" "}
              When an anthropomorphized brand fails, consumers feel{" "}
              <Tint>personal betrayal</Tint> rather than simple dissatisfaction.
            </Big>
            <Plate wide>
              <V.Betrayal />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Psychographics and Lifestyles: Measuring AIOs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="psychographics-and-lifestyles-measuring-aios"
        border
        quizData={quiz["psychographics-and-lifestyles-measuring-aios"]}
      >
        <IdeaRule active={2} />
        <Heading kicker="Psychographics and Lifestyles:">
          Measuring AIOs
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
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
        {/* Lifestyle and the method lead the row; the three AIOs follow. */}
        <div className="mt-12 grid w-full gap-10 lg:grid-cols-[0.95fr_3fr] lg:gap-8">
          <div className="min-w-0 border-t-2 border-[var(--ink)] pt-4">
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
                tone: "signal",
                plate: <V.Activities />,
                text: (
                  <>
                    <Term>Activities</Term> focus on work, hobbies, social
                    events, vacations, and entertainment.
                  </>
                ),
              },
              {
                key: "interests",
                tone: "signal",
                plate: <V.Interests />,
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
                tone: "signal",
                plate: <V.Opinions />,
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
        <IdeaRule active={2} />
        <Heading>The VALS Segmentation System</Heading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          The Values and Lifestyles system, or VALS, divides adults into{" "}
          <Tint>eight consumer segments</Tint> based on psychological traits and
          resources.
        </Statement>
        {/* The map sits beside its five lines; each line's mark lights its
            own cells on the map. */}
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <Plate wide>
            <V.VALSMap />
          </Plate>
          <ol className="flex w-full min-w-0 flex-col gap-3">
            <MarkLine mark={<V.VALSMark lit={["innovators"]} />}>
              <Term>Innovators</Term> are successful, sophisticated people with
              high resources and abundant energy.
            </MarkLine>
            <MarkLine mark={<V.VALSMark lit={["thinkers", "believers"]} />}>
              <Term tone="ink">Thinkers and Believers</Term> are motivated by
              ideals, knowledge, and principles.
            </MarkLine>
            <MarkLine mark={<V.VALSMark lit={["achievers", "strivers"]} />}>
              <Term tone="ink">Achievers and Strivers</Term> are motivated by
              achievement, status, and recognition from peers.
            </MarkLine>
            <MarkLine mark={<V.VALSMark lit={["experiencers", "makers"]} />}>
              <Term tone="ink">Experiencers and Makers</Term> are motivated by
              self-expression, physical activity, and adventure.
            </MarkLine>
            <MarkLine mark={<V.VALSMark lit={["survivors"]} />}>
              <Term tone="ink">Survivors</Term> have the fewest resources and
              focus on meeting basic needs rather than expressing lifestyle.
            </MarkLine>
          </ol>
        </div>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide className={TIGHT} id="discussion-your-extended-self" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Extended Self
        </Heading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="gsap-reveal relative w-full min-w-0 border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-10 md:py-12">
            <p className="type-quote !text-[clamp(1.3rem,2vw,1.75rem)] max-w-[46ch]">
              <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
                Discussion:
              </span>{" "}
              Name one possession you own that feels like part of your identity.{" "}
              <Tint tone="counter">
                If someone took it away, how would it change the way you see
                yourself?
              </Tint>{" "}
              Does it reflect your actual self or your ideal self?
            </p>
          </div>
          <Plate wide>
            <V.YourPossession />
          </Plate>
        </div>
      </Slide>
    </SlideDeck>
  );
}
