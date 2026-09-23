"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Tag,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import quizzesData from "./quizzes.json";
import {
  ConsumerMarket,
  NeedStimuli,
  SearchFork,
  ChoiceSetSlope,
  IntentionToDecision,
  PostpurchaseTimeline,
  DissonanceCalm,
  InfluenceRings,
  LearnedFromSociety,
  SubcultureField,
  SocialWeb,
  PerceptionSequence,
  ExpertiseLifestyle,
  ConsumerAndBusinessLanes,
  MarketStructureTriptych,
  BuyingCenterTable,
  MatchedExperts,
  TwoBrochures,
  GlyphRoute,
  GlyphRings,
  GlyphTable,
} from "./visuals";

// ============================================================================
// WEEK 03 — CONSUMER BEHAVIOR
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// Quizzes: in this route group `Slide` renders `quizData` AFTER its section.
// Each [quiz]-tagged topic therefore carries its own quiz, which tests that
// slide and the ones before it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzesData as CourseQuiz[]);

const SERIF = { fontFamily: "var(--font-heading)", fontWeight: 600 } as const;

/** One verbatim sentence at reading size. */
function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "type-body max-w-[var(--measure)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** A sentence promoted to lead size. */
function Lead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-lead max-w-[46ch]", className)}>
      {children}
    </p>
  );
}

/** A sentence set as a serif statement — the line a slide lands on. */
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

/** Coloured term inside a sentence, without the Highlight underline. */
function Term({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: "signal" | "counter" | "ink";
}) {
  const color = {
    signal: "text-[var(--signal)]",
    counter: "text-[var(--counter)]",
    ink: "text-[var(--ink)]",
  }[tone];
  return <strong className={cn("font-semibold", color)}>{children}</strong>;
}

/** Hairline-topped block with a verbatim sentence. */
function Ruled({
  tone = "ink",
  weight = "thick",
  children,
  className = "",
}: {
  tone?: "signal" | "counter" | "ink";
  weight?: "thin" | "thick";
  children: React.ReactNode;
  className?: string;
}) {
  const border = {
    signal: "border-[var(--signal)]",
    counter: "border-[var(--counter)]",
    ink: "border-[var(--ink)]",
  }[tone];
  return (
    <div
      className={cn(
        "min-w-0 pt-5",
        weight === "thick" ? "border-t-2" : "border-t",
        border,
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A plate that lives in a column: a figure well without the 680px floor. */
function Plate({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("figure-well w-full p-3 sm:p-5", className)}>
      {children}
    </div>
  );
}

/**
 * A heading with a "Label:" prefix ("Step 1:", "Discussion:"). The prefix is
 * set as a small tracked kicker inside the same h2, so the heading text
 * stays exactly as written.
 */
function KickerHeading({
  kicker,
  children,
  tone = "signal",
  className = "",
}: {
  kicker: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
  className?: string;
}) {
  return (
    <div className={cn("w-full mb-8 md:mb-12", className)}>
      <h2 className="type-h1 max-w-[24ch]">
        <span
          className={cn(
            "type-label block mb-4 !text-[0.8rem]",
            tone === "counter" && "!text-[var(--counter)]",
          )}
        >
          {kicker}
        </span>{" "}
        {children}
      </h2>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Part plate: an oversized numeral beside the part heading. */
function PartPlate({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border>
      <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,15rem)_1fr] xl:gap-16">
        <div
          aria-hidden
          className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[7rem] xl:text-[13rem]"
          style={{
            ...SERIF,
            fontVariationSettings: '"opsz" 144, "WONK" 1',
          }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="type-display !text-[clamp(2.4rem,5.4vw,4.5rem)] max-w-[18ch]">
            <span className="type-label block mb-6 !text-[0.8rem]">
              {`Part ${n}:`}
            </span>{" "}
            {title}
          </h2>
          <div className="mt-10 h-px w-full bg-[var(--rule)]" />
          {children}
        </div>
      </div>
    </Slide>
  );
}

/** Discussion prompt. "Discussion:" stays in the sentence as a kicker. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
      <p className="type-quote !text-[clamp(1.45rem,2.7vw,2.3rem)] max-w-[42ch]">
        {children}
      </p>
    </div>
  );
}

function PromptKicker() {
  return (
    <span className="type-label !text-[var(--counter)] block mb-6 !text-[0.8rem] !leading-none">
      Discussion:
    </span>
  );
}

/* --------------------------------------------------------------------------
   Decision-process wayfinding
   -------------------------------------------------------------------------- */

const STAGES = [
  "Need Recognition",
  "Information Search",
  "Evaluation of Alternatives",
  "Purchase Decision",
  "Postpurchase Behavior",
];

/**
 * The five steps as a strip. On the Part 1 plate it is the whole route; on
 * each step slide the current step is lit and the ones behind it are inked.
 */
function StageStrip({
  active,
  large = false,
  className = "",
}: {
  active?: number;
  large?: boolean;
  className?: string;
}) {
  return (
    <ol
      aria-hidden
      className={cn(
        "grid w-full grid-cols-5",
        large ? "gap-3 sm:gap-5" : "gap-2 sm:gap-3",
        className,
      )}
    >
      {STAGES.map((s, i) => {
        const on = i === active;
        const done = active !== undefined && i < active;
        return (
          <li
            key={s}
            className={cn(
              "min-w-0 border-t-2",
              large ? "pt-4" : "pt-3",
              on
                ? "border-[var(--signal)]"
                : done || large
                  ? "border-[var(--ink)]"
                  : "border-[var(--rule)]",
            )}
          >
            <span
              className={cn(
                "type-label block",
                large ? "!text-[0.8rem]" : "!text-[0.68rem]",
                on ? "!text-[var(--signal)]" : "!text-[var(--ink-3)]",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "mt-1.5 hidden sm:block leading-snug",
                large
                  ? "text-[clamp(0.95rem,1.4vw,1.25rem)] text-[var(--ink)]"
                  : "text-[0.8rem]",
                on && "font-semibold text-[var(--ink)]",
                !on && !large && "text-[var(--ink-3)]",
              )}
              style={large ? SERIF : undefined}
            >
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** A step slide: strip, kicker heading, then the slide's own content. */
function StepSlide({
  id,
  step,
  title,
  children,
}: {
  id: string;
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border quizData={quiz[id]}>
      <StageStrip active={step - 1} className="mb-12 md:mb-16" />
      <KickerHeading kicker={`Step ${step}:`}>{title}</KickerHeading>
      {children}
    </Slide>
  );
}

export default function Week3() {
  return (
    <SlideDeck
      label="Week 03"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 03 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[18ch]">
          Consumer <span className="text-[var(--signal)]">Behavior</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 3 of Introduction to Marketing.
          </p>
          <p className="type-lead">Today we will explore Consumer Behavior.</p>
        </div>

        <p className="type-body mt-14 max-w-3xl border-t border-[var(--rule)] pt-8 text-center [&_a]:whitespace-nowrap">
          We will cover the{" "}
          <a href="#part-1" data-n="01" className="toc-link">
            consumer decision-making process
          </a>
          ,{" "}
          <a href="#part-2" data-n="02" className="toc-link">
            influences on buying behavior
          </a>
          , and{" "}
          <a href="#part-3" data-n="03" className="toc-link">
            B2B vs B2C purchasing
          </a>
          .
        </p>
        <style>{`
          .toc-link {
            color: var(--ink);
            font-weight: 550;
            text-decoration: underline;
            text-decoration-color: var(--signal-line);
            text-decoration-thickness: 0.08em;
            text-underline-offset: 0.2em;
            transition: color 200ms;
          }
          .toc-link::before,
          .num-item::before {
            content: attr(data-n);
            font-family: var(--font-label);
            font-weight: 600;
            letter-spacing: 0.12em;
            color: var(--signal);
            font-variant-numeric: tabular-nums;
          }
          .toc-link::before {
            font-size: 0.62em;
            vertical-align: 0.55em;
            margin-right: 0.3em;
          }
          .num-item::before {
            display: block;
            font-size: 0.75rem;
            margin-bottom: 0.6rem;
          }
          .toc-link:hover { color: var(--signal); }
        `}</style>
      </Slide>

      {/* ================================================================
          Part 1 — The Consumer Decision-Making Process
          ================================================================ */}
      <PartPlate id="part-1" n={1} title="The Consumer Decision-Making Process">
        <Lead className="mt-10 !max-w-[56ch]">
          Consumer buyer behavior refers to the buying behavior of{" "}
          <Term>final consumers</Term>.
        </Lead>
        <Figure height="auto">
          <ConsumerMarket />
        </Figure>
        <Ruled>
          <P className="!max-w-[70ch]">
            The consumer market consists of all the{" "}
            <Term tone="ink">individuals</Term> and{" "}
            <Term tone="counter">households</Term> that buy or acquire goods
            and services for personal consumption.
          </P>
        </Ruled>
        <Statement className="mt-16 !max-w-[34ch]">
          Understanding this process is key to{" "}
          <span className="text-[var(--signal)]">predicting</span> how
          consumers will respond to marketing strategies.
        </Statement>
        <StageStrip large className="mt-12" />
      </PartPlate>

      <StepSlide id="need-recognition" step={1} title="Need Recognition">
        <Statement className="!max-w-[32ch]">
          The buying process starts with{" "}
          <span className="text-[var(--signal)]">need recognition</span>.
        </Statement>
        <Figure height="auto">
          <NeedStimuli />
        </Figure>
        <Lead className="!max-w-[60ch]">
          The buyer recognizes a problem or need triggered by{" "}
          <Term tone="ink">internal</Term> or{" "}
          <Term tone="counter">external</Term> stimuli.
        </Lead>
        <div className="mt-14 w-full">
          <p className="type-label !text-[var(--ink-3)]">
            Marketers must research to find out
          </p>
          <ol className="mt-5 grid w-full gap-x-10 border-t-2 border-[var(--ink)] md:grid-cols-3">
            {[
              ["01", "what kinds of needs or problems arise,"],
              ["02", "what brought them about,"],
              ["03", "and how they led the consumer to a particular product."],
            ].map(([n, item]) => (
              <li
                key={n}
                data-n={n}
                className="num-item border-b border-[var(--rule)] py-6 type-h2 !font-normal"
              >
                {" "}
                {item}
              </li>
            ))}
          </ol>
        </div>
      </StepSlide>

      <StepSlide id="information-search" step={2} title="Information Search">
        <Lead className="!max-w-[56ch]">
          Once a need is triggered, consumers{" "}
          <Term>may or may not</Term> search for more information.
        </Lead>
        <Figure height="auto">
          <SearchFork />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              Information sources include personal sources, commercial
              sources, public sources, and experiential sources.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className="type-h2 !font-normal">
              The most effective sources tend to be{" "}
              <span className="text-[var(--signal)]">personal</span>, as they
              legitimize or evaluate products for the buyer.
            </p>
          </Ruled>
        </div>
      </StepSlide>

      <StepSlide
        id="evaluation-of-alternatives"
        step={3}
        title="Evaluation of Alternatives"
      >
        <Lead className="!max-w-[56ch]">
          Consumers use information to evaluate alternative brands in the{" "}
          <Term>choice set</Term>.
        </Lead>
        <Figure height="auto">
          <ChoiceSetSlope />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              The process varies significantly depending on the{" "}
              <Term tone="ink">individual consumer</Term> and the{" "}
              <Term tone="ink">specific buying situation</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className="type-h2 !font-normal">
              Marketers should study buyers to find out how they{" "}
              <span className="text-[var(--signal)]">actually</span> evaluate
              brand alternatives.
            </p>
          </Ruled>
        </div>
      </StepSlide>

      <StepSlide id="purchase-decision" step={4} title="Purchase Decision">
        <Lead className="!max-w-[58ch]">
          In the evaluation stage, the consumer <Term>ranks brands</Term> and
          forms <Term tone="ink">purchase intentions</Term>.
        </Lead>
        <Figure height="auto">
          <IntentionToDecision />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              Generally, the consumer&apos;s purchase decision will be to buy
              the most preferred brand.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <p className="type-h2 !font-normal">
              However,{" "}
              <span className="text-[var(--counter)]">attitudes of others</span>{" "}
              and{" "}
              <span className="text-[var(--counter)]">
                unexpected situational factors
              </span>{" "}
              can come between the purchase intention and the purchase
              decision.
            </p>
          </Ruled>
        </div>
      </StepSlide>

      <StepSlide id="postpurchase-behavior" step={5} title="Postpurchase Behavior">
        <Statement className="!max-w-[30ch]">
          The marketer&apos;s job does{" "}
          <span className="text-[var(--signal)]">not end</span> when the
          product is bought.
        </Statement>
        <Figure height="auto">
          <PostpurchaseTimeline />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="counter">
            <P>
              Postpurchase behavior focuses on whether the consumer is{" "}
              <Term tone="counter">satisfied</Term> or{" "}
              <Term tone="ink">dissatisfied</Term> with the purchase.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className="type-h2 !font-normal">
              <span className="text-[var(--signal)]">Cognitive dissonance</span>
              , or buyer discomfort caused by postpurchase conflict, is a
              common occurrence.
            </p>
          </Ruled>
        </div>
      </StepSlide>

      <Slide id="discussion-postpurchase-dissonance" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Postpurchase Dissonance
        </KickerHeading>
        <Prompt>
          <PromptKicker /> Think about a time you experienced{" "}
          <span className="text-[var(--signal)]">&quot;buyer&apos;s remorse&quot;</span>{" "}
          after a major purchase. How could the brand have{" "}
          <span className="text-[var(--counter)]">communicated with you</span>{" "}
          to reduce that cognitive dissonance?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <DissonanceCalm />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 2 — Influences on Buying Behavior
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="Influences on Buying Behavior">
        <Lead className="mt-10 !max-w-[60ch]">
          Consumer purchases are influenced strongly by{" "}
          <Term tone="counter">cultural</Term>,{" "}
          <Term tone="counter">social</Term>,{" "}
          <Term tone="counter">personal</Term>, and{" "}
          <Term tone="counter">psychological</Term> characteristics.
        </Lead>
        <Figure height="auto">
          <InfluenceRings />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className="type-h2 !font-normal">
              Marketers cannot control such factors, but they must take them
              into account.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <P>
              These factors help us understand{" "}
              <Term>why consumers act the way they do</Term>.
            </P>
          </Ruled>
        </div>
      </PartPlate>

      <Slide id="cultural-factors" border>
        <Tag>The most basic cause</Tag>
        <Heading>Cultural Factors</Heading>
        <Statement className="!max-w-[34ch]">
          Culture is the{" "}
          <span className="text-[var(--signal)]">most basic cause</span> of a
          person&apos;s wants and behavior.
        </Statement>
        <div className="mt-14 grid w-full gap-14 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col">
            <Plate>
              <LearnedFromSociety />
            </Plate>
            <Ruled className="mt-8">
              <P>
                It includes basic values, perceptions, wants, and behaviors{" "}
                <Term tone="counter">learned from society</Term>.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate>
              <SubcultureField />
            </Plate>
            <Ruled tone="signal" className="mt-8">
              <P>
                <Term>Subcultures</Term> are groups of people with shared
                value systems based on common life experiences and situations.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="social-factors" border>
        <Tag>Groups, networks, family, roles</Tag>
        <Heading>Social Factors</Heading>
        <Lead className="!max-w-[62ch]">
          A consumer&apos;s behavior is influenced by social factors such as
          the consumer&apos;s small groups, social networks, family, and social
          roles.
        </Lead>
        <Figure height="auto">
          <SocialWeb />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              <Term tone="ink">Reference groups</Term> serve as direct or
              indirect points of comparison or reference in forming a
              person&apos;s attitudes or behavior.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className="type-h2 !font-normal">
              <span className="text-[var(--counter)]">
                Word-of-mouth influence
              </span>{" "}
              and{" "}
              <span className="text-[var(--signal)]">influencer marketing</span>{" "}
              play a massive role here.
            </p>
          </Ruled>
        </div>
      </Slide>

      <Slide
        id="psychological-factors"
        border
        quizData={quiz["psychological-factors"]}
      >
        <Tag>Four factors</Tag>
        <Heading>Psychological Factors</Heading>
        <Lead className="!max-w-[56ch]">
          A person&apos;s buying choices are further influenced by four major
          psychological factors.
        </Lead>
        <div className="mt-12 w-full">
          <p className="type-label !text-[var(--ink-3)]">
            These are
          </p>
          <ol className="mt-5 grid w-full gap-x-10 border-t-2 border-[var(--ink)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "motivation,", false],
              ["02", "perception,", true],
              ["03", "learning,", false],
              ["04", "and beliefs and attitudes.", false],
            ].map(([n, item, lit]) => (
              <li
                key={n as string}
                data-n={n as string}
                className={cn(
                  "num-item border-b border-[var(--rule)] py-6 type-h2 !font-normal",
                  lit && "text-[var(--signal)]",
                )}
              >
                {" "}
                {item}
              </li>
            ))}
          </ol>
        </div>
        <Figure height="auto">
          <PerceptionSequence />
        </Figure>
        <Statement className="!max-w-[44ch] !text-[clamp(1.5rem,2.8vw,2.4rem)]">
          <span className="text-[var(--signal)]">Perception</span> is the
          process by which people select, organize, and interpret information
          to form a meaningful picture of the world.
        </Statement>
      </Slide>

      <Slide id="discussion-social-influence" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Social Influence
        </KickerHeading>
        <Prompt>
          <PromptKicker /> How has a specific social media influencer affected
          your perception of a brand, and do you think their influence was
          based more on their{" "}
          <span className="text-[var(--counter)]">expertise</span> or their{" "}
          <span className="text-[var(--signal)]">lifestyle</span>?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <ExpertiseLifestyle />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 3 — B2C vs B2B Purchasing
          ================================================================ */}
      <PartPlate id="part-3" n={3} title="B2C vs B2B Purchasing">
        <Lead className="mt-10 !max-w-[64ch]">
          While <Term tone="counter">B2C (Business-to-Consumer)</Term>{" "}
          marketing focuses on the final consumer,{" "}
          <Term>B2B (Business-to-Business)</Term> focuses on organizations.
        </Lead>
        <Figure height="auto">
          <ConsumerAndBusinessLanes />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Business buyer behavior refers to the buying behavior of
              organizations that buy goods and services for use in the
              production of other products.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className="type-h2 !font-normal">
              The business market is huge and differs from the consumer market
              in several key ways.
            </p>
          </Ruled>
        </div>
      </PartPlate>

      <Slide
        id="market-structure-and-demand"
        border
        quizData={quiz["market-structure-and-demand"]}
      >
        <Tag>Buyers and demand</Tag>
        <Heading>Market Structure and Demand</Heading>
        <Figure height="auto">
          <MarketStructureTriptych />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-3">
          <Ruled tone="signal">
            <P>
              The business marketer normally deals with{" "}
              <Term>far fewer but far larger</Term> buyers than the consumer
              marketer does.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Business demand is <Term tone="counter">derived demand</Term>; it
              ultimately derives from the demand for consumer goods.
            </P>
          </Ruled>
          <Ruled>
            <P>
              B2B demand is also more inelastic and{" "}
              <Term>fluctuating</Term> compared to B2C.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide
        id="the-buying-center"
        border
        quizData={quiz["the-buying-center"]}
      >
        <Tag>Many roles, one decision</Tag>
        <Heading>The Buying Center</Heading>
        <Statement className="!max-w-[34ch]">
          B2B purchases are{" "}
          <span className="text-[var(--signal)]">rarely</span> made by a single
          individual.
        </Statement>
        <Figure height="auto">
          <BuyingCenterTable />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              The buying center consists of all the individuals and units that
              play a role in the purchase decision-making process.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className="type-h2 !font-normal">
              It includes users, influencers, buyers, deciders, and
              gatekeepers.
            </p>
          </Ruled>
        </div>
      </Slide>

      <Slide id="the-nature-of-the-buying-unit" border>
        <Tag>Trained buyers, trained sellers</Tag>
        <Heading>The Nature of the Buying Unit</Heading>
        <Lead className="!max-w-[64ch]">
          Compared with consumer purchases, a business purchase usually
          involves <Term tone="ink">more decision participants</Term> and a{" "}
          <Term>more professional purchasing effort</Term>.
        </Lead>
        <Figure height="auto">
          <MatchedExperts />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              Business buying is done by{" "}
              <Term tone="ink">trained purchasing agents</Term> who spend their
              professional lives learning how to buy better.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className="type-h2 !font-normal">
              Therefore, B2B marketers must have{" "}
              <span className="text-[var(--signal)]">
                well-trained salespeople
              </span>{" "}
              to deal with well-trained buyers.
            </p>
          </Ruled>
        </div>
      </Slide>

      <Slide id="discussion-b2b-complexity" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          B2B Complexity
        </KickerHeading>
        <Prompt>
          <PromptKicker /> Why might a B2B software company need to create{" "}
          <span className="text-[var(--signal)]">
            entirely different marketing materials
          </span>{" "}
          for the &quot;user&quot; (e.g., an IT employee) versus the
          &quot;decider&quot; (e.g., the CFO) within the same buying center?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <TwoBrochures />
        </Figure>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <KickerHeading kicker="Conclusion:">Consumer Behavior</KickerHeading>
        <ol className="grid w-full gap-x-12 gap-y-12 md:grid-cols-3">
          {[
            {
              glyph: <GlyphRoute />,
              text: "Understanding the consumer decision-making process is foundational to effective marketing.",
            },
            {
              glyph: <GlyphRings />,
              text: "Cultural, social, and psychological factors continuously shape consumer preferences.",
            },
            {
              glyph: <GlyphTable />,
              text: "While B2B and B2C markets share some similarities, B2B purchasing is generally more complex, professional, and relationship-driven.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-6 border-t-2 border-[var(--ink)] pt-6"
            >
              <div aria-hidden className="flex items-center justify-between">
                <span
                  className="text-[2.6rem] leading-none text-[var(--signal)]"
                  style={SERIF}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.glyph}
              </div>
              <p className="type-h2 !font-normal">{item.text}</p>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
