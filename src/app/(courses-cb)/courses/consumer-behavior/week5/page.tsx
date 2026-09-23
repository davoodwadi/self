"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Figure,
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
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// SIGNAL marks the self a consumer reaches for (the ideal self, the lit
// trait, the chosen segment); COUNTER the brand and the discussion.
//
// Wayfinding: the title names three ideas, Self-Concept, Personality and
// Lifestyles. A strip names them and lights the one each slide belongs to.
//
// Quizzes: `Slide` renders `quizData` AFTER its section, so each [quiz]-tagged
// topic carries its own quiz, testing that slide and the ones before it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzesData as CourseQuiz[]);

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
    <p className={cn("gsap-reveal type-body max-w-[var(--measure)]", className)}>{children}</p>
  );
}

/** A line promoted to lead size. */
function Lead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("gsap-reveal type-lead max-w-[48ch]", className)}>{children}</p>;
}

/** A line set as a serif statement: the line a slide lands on. */
function Statement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("gsap-reveal type-quote max-w-[30ch]", className)}>{children}</p>;
}

/** A line at h2 size. */
function Big({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("gsap-reveal type-h2 !font-normal", className)}>{children}</p>;
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
    <div className={cn("gsap-reveal min-w-0 border-t-2 pt-5", BORDER[tone], className)}>
      {children}
    </div>
  );
}

/** A plate that lives in a column: a figure well without the 680px floor. */
function Plate({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("gsap-reveal figure-well w-full min-w-0 p-3 sm:p-5", className)}>
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
    <div className="gsap-reveal mb-10 w-full md:mb-14">
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

/** A line and a column plate side by side; the line always comes first. */
function Pair({
  plate,
  children,
  className = "",
}: {
  plate: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14", className)}>
      <div className="min-w-0">{children}</div>
      <Plate>{plate}</Plate>
    </div>
  );
}

/** Ruled lines in a grid, each followed by its own plate. */
function Cells({
  cols = 2,
  items,
  className = "",
}: {
  cols?: 2 | 3;
  items: { key: string; tone: Tone; plate: React.ReactNode; text: React.ReactNode }[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid w-full gap-12 lg:gap-8",
        cols === 3 ? "lg:grid-cols-3" : "md:grid-cols-2 md:gap-x-10",
        className,
      )}
    >
      {items.map((s) => (
        <li key={s.key} className="gsap-reveal flex min-w-0 flex-col gap-6">
          <div className={cn("border-t-2 pt-5", BORDER[s.tone])}>
            <p className="type-body">{s.text}</p>
          </div>
          <div className="figure-well mt-auto w-full min-w-0 p-3">{s.plate}</div>
        </li>
      ))}
    </ol>
  );
}

/** A ruled line with its plate to the right, for lists of dimensions. */
function Row({
  tone = "ink",
  plate,
  children,
}: {
  tone?: Tone;
  plate: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "gsap-reveal grid min-w-0 items-center gap-6 border-t-2 pt-5 md:grid-cols-[1fr_minmax(0,340px)] md:gap-12",
        BORDER[tone],
      )}
    >
      <p className="type-lead min-w-0 max-w-[40ch]">{children}</p>
      <div className="figure-well w-full min-w-0 p-3">{plate}</div>
    </li>
  );
}

/** A ruled line led by a small mark (a ring or a map cell) that places it. */
function MarkLine({ mark, children }: { mark: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="gsap-reveal flex min-w-0 items-start gap-5 border-t-2 border-[var(--ink)] pt-5">
      {mark}
      <p className="type-body min-w-0">{children}</p>
    </li>
  );
}

/** Self-Concept · Personality · Lifestyles, the three ideas in the title. */
const IDEAS = ["Self-Concept", "Personality", "Lifestyles"];

function IdeaRule({ active }: { active: 0 | 1 | 2 }) {
  return (
    <ol aria-hidden className="gsap-reveal mb-12 grid w-full grid-cols-3 gap-2 sm:gap-4 md:mb-16">
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
            <p className="gsap-reveal type-caption mt-2">Consumer Behavior · Davood Wadi, PhD</p>
            <Title className="mt-8 !max-w-[14ch]">Personality, Self-Concept, and Lifestyles</Title>
            <div className="gsap-reveal mt-10 max-w-[36ch] border-t-2 border-[var(--ink)] pt-6">
              <p className="type-quote">
                <span className="text-[var(--ink-3)]">
                  Consumers do not just buy products.
                </span>{" "}
                They buy symbols that mirror <Tint tone="ink">who they are</Tint> and{" "}
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
      <Slide id="what-is-the-self-concept" border>
        <IdeaRule active={0} />
        <Heading>What Is the Self-Concept?</Heading>
        <Statement className="!max-w-[38ch]">
          Self-concept is the collection of <Tint>beliefs</Tint> a person holds about their own
          attributes and qualities.
        </Statement>
        <Lead className="mt-8 text-[var(--ink-3)]">
          It includes how we judge our own <Term tone="ink">appearance</Term>,{" "}
          <Term tone="ink">intellect</Term>, <Term tone="ink">skills</Term>, and{" "}
          <Term tone="ink">character</Term>.
        </Lead>
        <Figure height="auto">
          <V.SelfJudgement />
        </Figure>
        <Big className="mt-20 max-w-[40ch]">
          <Tint>Self-esteem</Tint> refers to the positivity of a person&apos;s self-concept.
        </Big>
        <Cells
          className="mt-12"
          items={[
            {
              key: "high",
              tone: "signal",
              plate: <V.HighEsteem />,
              text: (
                <>
                  People with <Term>high self-esteem</Term> expect to succeed and take more risks
                  when buying new products.
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
                  People with <Term tone="ink">low self-esteem</Term> try to avoid failure and seek
                  reassurance through safe, well-known brands.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          The Actual Self Versus the Ideal Self
          ================================================================ */}
      <Slide
        id="the-actual-self-versus-the-ideal-self"
        border
        quizData={quiz["the-actual-self-versus-the-ideal-self"]}
      >
        <IdeaRule active={0} />
        <Heading>The Actual Self Versus the Ideal Self</Heading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="ink">
            <Lead>
              The <Term tone="ink">actual self</Term> is our realistic appraisal of the qualities
              we have right now.
            </Lead>
          </Ruled>
          <Ruled tone="signal">
            <Lead>
              {" "}
              The <Term>ideal self</Term> is our conception of who we would like to be.
            </Lead>
          </Ruled>
        </div>
        <Statement className="mt-16 !max-w-[36ch]">
          A <Tint>gap</Tint> between the actual self and the ideal self creates emotional
          tension.
        </Statement>
        <Figure height="auto">
          <V.ActualIdeal />
        </Figure>
        <Big className="mt-20 max-w-[42ch]">
          Consumers buy products to <Tint>bridge this gap</Tint>. This is called{" "}
          <Tint>compensatory consumption</Tint>.
        </Big>
        <Figure height="auto">
          <V.BridgeGap />
        </Figure>
        <Pair plate={<V.AspirationalAd />} className="mt-10">
          <Ruled tone="counter">
            <Lead>
              <Term tone="counter">Fantasy appeals</Term> and{" "}
              <Term tone="counter">aspirational advertising</Term> show consumers how a product
              brings them closer to their ideal self.
            </Lead>
          </Ruled>
        </Pair>
      </Slide>

      {/* ================================================================
          The Extended Self: Possessions as Identity
          ================================================================ */}
      <Slide
        id="the-extended-self-possessions-as-identity"
        border
        quizData={quiz["the-extended-self-possessions-as-identity"]}
      >
        <IdeaRule active={0} />
        <Heading kicker="The Extended Self:">Possessions as Identity</Heading>
        <Statement className="!max-w-[34ch]">
          We are what we own.{" "}
          <span className="text-[var(--ink-3)]">
            External objects often become part of who we are.
          </span>
        </Statement>
        <Lead className="mt-10 !max-w-[56ch]">
          The <Term>extended self</Term> includes possessions that people use to define their
          social identity.
        </Lead>
        <Figure height="auto">
          <V.ExtendedRings />
        </Figure>
        <ol className="grid w-full gap-10 md:grid-cols-2 md:gap-x-14">
          <MarkLine mark={<V.RingMark lit={0} />}>
            <Term tone="ink">Individual level:</Term> personal items like jewelry, cars, and
            clothing define personal identity.
          </MarkLine>
          <MarkLine mark={<V.RingMark lit={1} />}>
            <Term tone="ink">Family level:</Term> a consumer&apos;s home and furnishings represent
            family identity and shared memories.
          </MarkLine>
          <MarkLine mark={<V.RingMark lit={2} />}>
            <Term tone="ink">Community level:</Term> neighborhoods and hometowns shape local
            identity.
          </MarkLine>
          <MarkLine mark={<V.RingMark lit={3} />}>
            <Term tone="ink">Group level:</Term> attachments to sports teams, subcultures, or
            social movements define group identity.
          </MarkLine>
        </ol>
      </Slide>

      {/* ================================================================
          Personality Traits and Consumer Behavior
          ================================================================ */}
      <Slide id="personality-traits-and-consumer-behavior" border>
        <IdeaRule active={1} />
        <Heading>Personality Traits and Consumer Behavior</Heading>
        <Statement className="!max-w-[40ch]">
          Personality refers to a person&apos;s unique psychological makeup that{" "}
          <Tint>consistently</Tint> influences their responses to the environment.
        </Statement>
        <Lead className="mt-8 text-[var(--ink-3)]">
          <Term tone="ink">Trait theory</Term> views personality as a set of measurable
          characteristics.
        </Lead>
        <Cells
          className="mt-16"
          items={[
            {
              key: "innovativeness",
              tone: "ink",
              plate: <V.Innovativeness />,
              text: (
                <>
                  <Term tone="ink">Innovativeness</Term> is the degree to which a person likes to
                  try new things.
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
                  <Term tone="ink">Materialism</Term> is the emphasis a person places on owning
                  worldly goods for status.
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
                  <Term tone="ink">Need for cognition</Term> is the degree to which a person
                  enjoys thinking hard and reading detailed product descriptions.
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
                  <Term tone="ink">Frugality</Term> is the tendency to prioritize careful spending
                  and resourcefulness over wasteful buying.
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
        id="the-big-five-personality-dimensions"
        border
        quizData={quiz["the-big-five-personality-dimensions"]}
      >
        <IdeaRule active={1} />
        <Heading>The Big Five Personality Dimensions</Heading>
        <Statement className="!max-w-[38ch]">
          Psychologists identify five fundamental dimensions of human personality called the{" "}
          <Tint>Big Five</Tint>.
        </Statement>
        <ol className="mt-16 flex w-full flex-col gap-12">
          <Row plate={<V.Openness />}>
            <Term>Openness to experience:</Term> curiosity, creativity, and interest in novelty.
          </Row>
          <Row plate={<V.Conscientiousness />}>
            {" "}
            <Term>Conscientiousness:</Term> organization, self-discipline, and reliability.
          </Row>
          <Row plate={<V.Extraversion />}>
            {" "}
            <Term>Extraversion:</Term> sociability, energy, and talkativeness in social settings.
          </Row>
          <Row plate={<V.Agreeableness />}>
            {" "}
            <Term>Agreeableness:</Term> friendliness, warmth, empathy, and cooperation with
            others.
          </Row>
          <Row plate={<V.Neuroticism />}>
            {" "}
            <Term>Neuroticism:</Term> emotional instability, tendency to experience anxiety, and
            mood swings.
          </Row>
        </ol>
        <Ruled tone="counter" className="mt-20 w-full">
          <Big className="max-w-[44ch]">
            {" "}
            Marketers use these dimensions to tailor <Tint tone="counter">ad copy</Tint>,{" "}
            <Tint tone="counter">visual tone</Tint>, and{" "}
            <Tint tone="counter">brand messaging</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <V.TailoredAds />
        </Figure>
      </Slide>

      {/* ================================================================
          Brand Personality: Giving Life to Objects
          ================================================================ */}
      <Slide
        id="brand-personality-giving-life-to-objects"
        border
        quizData={quiz["brand-personality-giving-life-to-objects"]}
      >
        <IdeaRule active={1} />
        <Heading kicker="Brand Personality:">Giving Life to Objects</Heading>
        <Pair plate={<V.BrandTraits />}>
          <Statement>
            Brand personality is the set of <Tint>human traits</Tint> that consumers assign to a{" "}
            <Tint tone="counter">brand name</Tint>.
          </Statement>
        </Pair>
        <ol className="mt-16 flex w-full flex-col gap-12">
          <Row tone="counter" plate={<V.Sincerity />}>
            <Term tone="counter">Sincerity:</Term> brands seen as down-to-earth, honest,
            wholesome, and cheerful, like Hallmark or Campbell&apos;s.
          </Row>
          <Row tone="counter" plate={<V.Excitement />}>
            {" "}
            <Term tone="counter">Excitement:</Term> brands seen as daring, spirited, imaginative,
            and modern, like Apple or Red Bull.
          </Row>
          <Row tone="counter" plate={<V.Competence />}>
            {" "}
            <Term tone="counter">Competence:</Term> brands seen as reliable, intelligent, and
            successful, like Volvo or Google.
          </Row>
          <Row tone="counter" plate={<V.Sophistication />}>
            {" "}
            <Term tone="counter">Sophistication:</Term> brands seen as upper-class, elegant, and
            charming, like Chanel or Rolex.
          </Row>
          <Row tone="counter" plate={<V.Ruggedness />}>
            {" "}
            <Term tone="counter">Ruggedness:</Term> brands seen as outdoorsy, tough, and durable,
            like Jeep or Patagonia.
          </Row>
        </ol>
      </Slide>

      {/* ================================================================
          Anthropomorphism and Brand Relationships
          ================================================================ */}
      <Slide id="anthropomorphism-and-brand-relationships" border>
        <IdeaRule active={1} />
        <Heading>Anthropomorphism and Brand Relationships</Heading>
        <Pair plate={<V.FaceInObject />}>
          <Statement>
            Anthropomorphism occurs when people assign <Tint>human qualities, faces, or
            intentions</Tint> to non-human objects.
          </Statement>
        </Pair>
        <Pair plate={<V.Mascot />} className="mt-16">
          <Ruled tone="counter">
            <Lead>
              <Term tone="counter">Mascots</Term> like the Michelin Man or the M&amp;M characters
              make abstract corporate products feel friendly.
            </Lead>
          </Ruled>
        </Pair>
        <Big className="mt-20 max-w-[44ch]">
          When consumers view a brand as a <Tint tone="counter">human partner</Tint>, brand
          loyalty turns into an <Tint>emotional relationship</Tint>.
        </Big>
        <Figure height="auto">
          <V.BrandPartner />
        </Figure>
        <Ruled tone="signal" className="mt-10 w-full">
          <Lead className="!max-w-[56ch]">
            <Term>Brand love</Term> occurs when a consumer feels passion, commitment, and positive
            attachment toward a brand.
          </Lead>
        </Ruled>
        <Big className="mt-20 max-w-[44ch]">
          {" "}
          When an anthropomorphized brand fails, consumers feel <Tint>personal betrayal</Tint>{" "}
          rather than simple dissatisfaction.
        </Big>
        <Figure height="auto">
          <V.Betrayal />
        </Figure>
      </Slide>

      {/* ================================================================
          Psychographics and Lifestyles: Measuring AIOs
          ================================================================ */}
      <Slide
        id="psychographics-and-lifestyles-measuring-aios"
        border
        quizData={quiz["psychographics-and-lifestyles-measuring-aios"]}
      >
        <IdeaRule active={2} />
        <Heading kicker="Psychographics and Lifestyles:">Measuring AIOs</Heading>
        <Statement className="!max-w-[36ch]">
          <span className="text-[var(--ink-3)]">Demographics tell us who buys.</span>{" "}
          Psychographics tell us <Tint>why</Tint> they buy.
        </Statement>
        <Figure height="auto">
          <V.WhoWhy />
        </Figure>
        <Lead className="mt-10 !max-w-[56ch]">
          <Term>Lifestyle</Term> defines a pattern of consumption that reflects a person&apos;s
          choices about how they spend time and money.
        </Lead>
        <P className="mt-8">
          Psychographics uses psychological, sociological, and anthropological factors to segment
          markets.
        </P>
        <Cells
          cols={3}
          className="mt-16"
          items={[
            {
              key: "activities",
              tone: "signal",
              plate: <V.Activities />,
              text: (
                <>
                  <Term>Activities</Term> focus on work, hobbies, social events, vacations, and
                  entertainment.
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
                  <Term>Interests</Term> focus on family, home, job, community, food, and fashion.
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
                  <Term>Opinions</Term> focus on oneself, social issues, politics, business, and
                  products.
                </>
              ),
            },
          ]}
        />
      </Slide>

      {/* ================================================================
          The VALS Segmentation System
          ================================================================ */}
      <Slide id="the-vals-segmentation-system" border>
        <IdeaRule active={2} />
        <Heading>The VALS Segmentation System</Heading>
        <Statement className="!max-w-[40ch]">
          The Values and Lifestyles system, or VALS, divides adults into{" "}
          <Tint>eight consumer segments</Tint> based on psychological traits and resources.
        </Statement>
        <Figure height="auto">
          <V.VALSMap />
        </Figure>
        <ol className="grid w-full gap-10 md:grid-cols-2 md:gap-x-14">
          <MarkLine mark={<V.VALSMark lit={["innovators"]} />}>
            <Term>Innovators</Term> are successful, sophisticated people with high resources and
            abundant energy.
          </MarkLine>
          <MarkLine mark={<V.VALSMark lit={["thinkers", "believers"]} />}>
            <Term tone="ink">Thinkers and Believers</Term> are motivated by ideals, knowledge, and
            principles.
          </MarkLine>
          <MarkLine mark={<V.VALSMark lit={["achievers", "strivers"]} />}>
            <Term tone="ink">Achievers and Strivers</Term> are motivated by achievement, status,
            and recognition from peers.
          </MarkLine>
          <MarkLine mark={<V.VALSMark lit={["experiencers", "makers"]} />}>
            <Term tone="ink">Experiencers and Makers</Term> are motivated by self-expression,
            physical activity, and adventure.
          </MarkLine>
          <MarkLine mark={<V.VALSMark lit={["survivors"]} />}>
            <Term tone="ink">Survivors</Term> have the fewest resources and focus on meeting basic
            needs rather than expressing lifestyle.
          </MarkLine>
        </ol>
      </Slide>

      {/* ================================================================
          Discussion
          ================================================================ */}
      <Slide id="discussion-your-extended-self" border>
        <Heading kicker="Discussion:" tone="counter">
          Your Extended Self
        </Heading>
        <div className="gsap-reveal relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
          <p className="type-quote !text-[clamp(1.35rem,2.5vw,2.1rem)] max-w-[46ch]">
            <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Name one possession you own that feels like part of your identity.{" "}
            <Tint tone="counter">
              If someone took it away, how would it change the way you see yourself?
            </Tint>{" "}
            Does it reflect your actual self or your ideal self?
          </p>
        </div>
        <Figure height="auto">
          <V.YourPossession />
        </Figure>
      </Slide>
    </SlideDeck>
  );
}
