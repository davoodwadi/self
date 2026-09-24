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
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import { Plate } from "../_visuals/kit";
import exercisesData from "./exercises.json";
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
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that
// slide and the ones before it.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

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
  className,
  children,
  layout = "column",
}: {
  id: string;
  n: number;
  title: string;
  className?: string;
  children: React.ReactNode;
  /** "stacked": numeral and heading share one row and the content runs the full width below. */
  layout?: "column" | "stacked";
}) {
  if (layout === "stacked") {
    return (
      <Slide id={id} border className={className}>
        <div className="flex w-full items-end gap-8 xl:gap-12">
          <div
            aria-hidden
            className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[5rem] xl:text-[6.5rem]"
            style={{ ...SERIF, fontVariationSettings: '"opsz" 144, "WONK" 1' }}
          >
            {String(n).padStart(2, "0")}
          </div>
          <h2 className="type-display !text-[clamp(2.2rem,4.2vw,3.5rem)] max-w-[24ch]">
            <span className="type-label block mb-3 !text-[0.8rem]">
              {`Part ${n}:`}
            </span>{" "}
            {title}
          </h2>
        </div>
        <div className="mt-6 h-px w-full bg-[var(--rule)]" />
        {children}
      </Slide>
    );
  }
  return (
    <Slide id={id} border className={className}>
      <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,15rem)_1fr] xl:gap-16">
        <div
          aria-hidden
          className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[6rem] xl:text-[8rem]"
          style={{
            ...SERIF,
            fontVariationSettings: '"opsz" 144, "WONK" 1',
          }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="type-display !text-[clamp(2.2rem,4.2vw,3.5rem)] max-w-[24ch]">
            <span className="type-label block mb-3 !text-[0.8rem]">
              {`Part ${n}:`}
            </span>{" "}
            {title}
          </h2>
          <div className="mt-6 h-px w-full bg-[var(--rule)]" />
          {children}
        </div>
      </div>
    </Slide>
  );
}

/** Discussion prompt. "Discussion:" stays in the sentence as a kicker. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-7 md:px-12 md:py-9">
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

/**
 * Text rail beside a plate. The rail comes first in the DOM (text leads its
 * plate, on phones too); `side` decides which side the plate sits on.
 */
function Split({
  rail,
  side = "right",
  children,
}: {
  rail: React.ReactNode;
  /** Where the rail sits. */
  side?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid w-full items-center gap-4 lg:gap-10",
        side === "right"
          ? "lg:grid-cols-[minmax(0,1fr)_17rem]"
          : "lg:grid-cols-[17rem_minmax(0,1fr)]",
      )}
    >
      <div
        className={cn(
          "flex min-w-0 flex-col gap-6",
          side === "right" && "lg:order-2",
        )}
      >
        {rail}
      </div>
      <div className={cn("min-w-0", side === "right" && "lg:order-1")}>
        {children}
      </div>
    </div>
  );
}

/** A sentence set large inside a rail. */
const RAIL_BIG = "type-h2 !font-normal !text-[1.3rem] !leading-snug";

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
  vertical = false,
  className = "",
}: {
  active?: number;
  large?: boolean;
  /** The whole route as a column of numbered rungs joined by one rule. */
  vertical?: boolean;
  className?: string;
}) {
  if (vertical) {
    return (
      <ol aria-hidden className={cn("relative w-full", className)}>
        <span className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 bg-[var(--ink)]" />
        {STAGES.map((s, i) => (
          <li key={s} className="relative flex items-center gap-6 py-2.5">
            <span
              className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] text-[1rem] text-[var(--signal)]"
              style={SERIF}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="text-[clamp(1.15rem,1.7vw,1.5rem)] leading-tight text-[var(--ink)]"
              style={SERIF}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>
    );
  }
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
  className,
  children,
}: {
  id: string;
  step: number;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border exercise={exercise[id]} className={className}>
      <StageStrip active={step - 1} className="mb-8 md:mb-10" />
      <KickerHeading kicker={`Step ${step}:`} className="!mb-2 md:!mb-4">{title}</KickerHeading>
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
      <Slide id="part-1" border className="!py-8">
        {/* Split screen: the definitions and the market on the left, the
            whole five-step route standing tall on the right. */}
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="min-w-0">
            <div className="flex items-end gap-6">
              <div
                aria-hidden
                className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[5rem] xl:text-[6rem]"
                style={{ ...SERIF, fontVariationSettings: '"opsz" 144, "WONK" 1' }}
              >
                01
              </div>
              <h2 className="type-display !text-[clamp(2rem,3.4vw,3rem)]">
                <span className="type-label block mb-3 !text-[0.8rem]">
                  Part 1:
                </span>{" "}
                The Consumer Decision-Making Process
              </h2>
            </div>
            <div className="mt-6 h-px w-full bg-[var(--rule)]" />
            <Lead className="mt-6 !max-w-none">
              Consumer buyer behavior refers to the buying behavior of{" "}
              <Term>final consumers</Term>.
            </Lead>
            <P className="mt-4 !max-w-none">
              The consumer market consists of all the{" "}
              <Term tone="ink">individuals</Term> and{" "}
              <Term tone="counter">households</Term> that buy or acquire goods
              and services for personal consumption.
            </P>
            <Plate className="mt-5">
              <ConsumerMarket />
            </Plate>
          </div>
          <div className="min-w-0 border-t-2 border-[var(--signal)] pt-6 lg:border-l lg:border-t-0 lg:border-l-[var(--rule)] lg:pl-12 lg:pt-0">
            <Statement className="!max-w-none !text-[clamp(1.3rem,2vw,1.75rem)]">
              Understanding this process is key to{" "}
              <span className="text-[var(--signal)]">predicting</span> how
              consumers will respond to marketing strategies.
            </Statement>
            <StageStrip vertical className="mt-8" />
          </div>
        </div>
      </Slide>

      <StepSlide id="need-recognition" step={1} title="Need Recognition" className="!py-8">
        <Statement className="!max-w-none !text-[clamp(1.8rem,3vw,2.6rem)]">
          The buying process starts with{" "}
          <span className="text-[var(--signal)]">need recognition</span>.
        </Statement>
        <div className="mt-2 grid w-full items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-12">
          <Ruled>
            <p className="type-lead">
              The buyer recognizes a problem or need triggered by{" "}
              <Term tone="ink">internal</Term> or{" "}
              <Term tone="counter">external</Term> stimuli.
            </p>
          </Ruled>
          <Plate>
            <NeedStimuli />
          </Plate>
        </div>
        <div className="w-full">
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
                className="num-item border-b border-[var(--rule)] py-4 type-h2 !font-normal"
              >
                {" "}
                {item}
              </li>
            ))}
          </ol>
        </div>
      </StepSlide>

      <StepSlide id="information-search" step={2} title="Information Search" className="!py-8">
        <div className="grid w-full items-start gap-6 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={RAIL_BIG}>
              Once a need is triggered, consumers{" "}
              <span className="text-[var(--signal)]">may or may not</span>{" "}
              search for more information.
            </p>
          </Ruled>
          <Ruled>
            <P>
              Information sources include personal sources, commercial
              sources, public sources, and experiential sources.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className={RAIL_BIG}>
              The most effective sources tend to be{" "}
              <span className="text-[var(--signal)]">personal</span>, as they
              legitimize or evaluate products for the buyer.
            </p>
          </Ruled>
        </div>
        <Figure height="auto" dense>
          <SearchFork />
        </Figure>
      </StepSlide>

      <StepSlide
        id="evaluation-of-alternatives"
        className="!py-8"
        step={3}
        title="Evaluation of Alternatives"
      >
        <Lead className="!max-w-[56ch]">
          Consumers use information to evaluate alternative brands in the{" "}
          <Term>choice set</Term>.
        </Lead>
        {/* Triptych: the cause on the left, the evidence in the middle, what
            marketers do about it on the right. */}
        <div className="grid w-full items-center gap-6 lg:grid-cols-[14rem_minmax(0,1fr)_14rem] lg:gap-10">
          <Ruled>
            <P>
              The process varies significantly depending on the{" "}
              <Term tone="ink">individual consumer</Term> and the{" "}
              <Term tone="ink">specific buying situation</Term>.
            </P>
          </Ruled>
          <Plate>
            <ChoiceSetSlope />
          </Plate>
          <Ruled tone="signal">
            <p className={RAIL_BIG}>
              Marketers should study buyers to find out how they{" "}
              <span className="text-[var(--signal)]">actually</span> evaluate
              brand alternatives.
            </p>
          </Ruled>
        </div>
      </StepSlide>

      <StepSlide id="purchase-decision" step={4} title="Purchase Decision" className="!py-8">
        <Lead className="!max-w-[58ch]">
          In the evaluation stage, the consumer <Term>ranks brands</Term> and
          forms <Term tone="ink">purchase intentions</Term>.
        </Lead>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-[1fr_1.4fr] md:gap-14">
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
        <Figure height="auto" dense>
          <IntentionToDecision />
        </Figure>
      </StepSlide>

      <StepSlide id="postpurchase-behavior" step={5} title="Postpurchase Behavior" className="!py-8">
        <Split
          side="left"
          rail={
            <>
              <Statement className="!max-w-[30ch] !text-[1.5rem]">
                The marketer&apos;s job does{" "}
                <span className="text-[var(--signal)]">not end</span> when the
                product is bought.
              </Statement>
              <Ruled tone="counter">
                <P>
                  Postpurchase behavior focuses on whether the consumer is{" "}
                  <Term tone="counter">satisfied</Term> or{" "}
                  <Term tone="ink">dissatisfied</Term> with the purchase.
                </P>
              </Ruled>
              <Ruled tone="signal">
                <p className={RAIL_BIG}>
                  <span className="text-[var(--signal)]">
                    Cognitive dissonance
                  </span>
                  , or buyer discomfort caused by postpurchase conflict, is a
                  common occurrence.
                </p>
              </Ruled>
            </>
          }
        >
          <Figure height="auto" dense>
            <PostpurchaseTimeline />
          </Figure>
        </Split>
      </StepSlide>

      <Slide id="discussion-postpurchase-dissonance" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter">
          Postpurchase Dissonance
        </KickerHeading>
        <div className="w-full lg:w-[70%]">
          <Prompt>
            <PromptKicker /> Think about a time you experienced{" "}
            <span className="text-[var(--signal)]">&quot;buyer&apos;s remorse&quot;</span>{" "}
            after a major purchase. How could the brand have{" "}
            <span className="text-[var(--counter)]">communicated with you</span>{" "}
            to reduce that cognitive dissonance?
          </Prompt>
        </div>
        {/* The waveform runs the full width of the slide, like a line
            printed under the question: remorse, a message, then calm. */}
        <div className="mt-10 w-full min-w-0 overflow-x-auto border-y border-[var(--rule)] py-4">
          <div className="min-w-[640px]">
            <DissonanceCalm />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 2 — Influences on Buying Behavior
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="Influences on Buying Behavior" className="!py-8">
        <div className="mt-8 w-full flow-root">
          {/* On wide screens the rings float right and the lines curve
              around them. Phones get the plate after the first sentence. */}
          <div
            className="hidden lg:block lg:float-right lg:ml-6 lg:w-[27rem]"
            style={{ shapeOutside: "circle(48%)", shapeMargin: "32px" }}
          >
            <InfluenceRings compact />
          </div>
          <p className="type-h2 !max-w-none !font-normal !text-[clamp(1.6rem,2.5vw,2.25rem)] !leading-snug">
            Consumer purchases are influenced strongly by{" "}
            <Term tone="counter">cultural</Term>,{" "}
            <Term tone="counter">social</Term>,{" "}
            <Term tone="counter">personal</Term>, and{" "}
            <Term tone="counter">psychological</Term> characteristics.
          </p>
          <div className="mx-auto mt-6 max-w-[22rem] lg:hidden">
            <InfluenceRings compact />
          </div>
          <p className="type-lead mt-8 !max-w-none !text-[var(--ink)]">
            Marketers cannot control such factors, but they must take them
            into account.
          </p>
          <p className="type-lead mt-6 !max-w-none">
            These factors help us understand{" "}
            <Term>why consumers act the way they do</Term>.
          </p>
        </div>
      </PartPlate>

      <Slide id="cultural-factors" border className="!py-8">
        <Tag>The most basic cause</Tag>
        <Heading>Cultural Factors</Heading>
        <Statement className="!max-w-[34ch]">
          Culture is the{" "}
          <span className="text-[var(--signal)]">most basic cause</span> of a
          person&apos;s wants and behavior.
        </Statement>
        <div className="mt-8 grid w-full gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-5 !pt-3">
              <P>
                It includes basic values, perceptions, wants, and behaviors{" "}
                <Term tone="counter">learned from society</Term>.
              </P>
            </Ruled>
            <Plate className="flex-1">
              <LearnedFromSociety />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled tone="signal" className="mb-5 !pt-3">
              <P>
                <Term>Subcultures</Term> are groups of people with shared
                value systems based on common life experiences and situations.
              </P>
            </Ruled>
            <Plate className="flex-1">
              <SubcultureField />
            </Plate>
          </div>
        </div>
      </Slide>

      <Slide id="social-factors" border className="!py-8">
        <Tag>Groups, networks, family, roles</Tag>
        <Heading>Social Factors</Heading>
        <p className="type-h2 !max-w-[48ch] !font-normal !text-[clamp(1.45rem,2.2vw,1.9rem)] !leading-snug">
          A consumer&apos;s behavior is influenced by social factors such as
          the consumer&apos;s small groups, social networks, family, and social
          roles.
        </p>
        <Split
          side="left"
          rail={
            <>
              <Ruled>
                <P>
                  <Term tone="ink">Reference groups</Term> serve as direct or
                  indirect points of comparison or reference in forming a
                  person&apos;s attitudes or behavior.
                </P>
              </Ruled>
              <Ruled tone="signal">
                <p className={RAIL_BIG}>
                  <span className="text-[var(--counter)]">
                    Word-of-mouth influence
                  </span>{" "}
                  and{" "}
                  <span className="text-[var(--signal)]">
                    influencer marketing
                  </span>{" "}
                  play a massive role here.
                </p>
              </Ruled>
            </>
          }
        >
          <Figure height="auto" dense>
            <SocialWeb />
          </Figure>
        </Split>
      </Slide>

      <Slide
        id="psychological-factors"
        border
        className="!py-8"
        exercise={exercise["psychological-factors"]}
      >
        <Tag>Four factors</Tag>
        <Heading>Psychological Factors</Heading>
        {/* Stacked bands: the four factors as a row of tiles, the one this
            slide defines lit; then its definition; then the drawing. */}
        <div className="grid w-full items-end gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-10">
          <Lead className="!max-w-none">
            A person&apos;s buying choices are further influenced by four major
            psychological factors.
          </Lead>
          <div className="min-w-0">
            <p className="type-label !text-[var(--ink-3)]">These are</p>
            <ol className="mt-3 grid w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
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
                    "num-item border-t-2 px-4 py-3 text-[1.15rem] leading-snug",
                    lit
                      ? "border-[var(--signal)] bg-[var(--signal-tint)] text-[var(--signal)]"
                      : "border-[var(--ink)] bg-[var(--paper-2)] text-[var(--ink)]",
                  )}
                  style={SERIF}
                >
                  {" "}
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <Statement className="mt-8 !max-w-none !text-[clamp(1.35rem,2.1vw,1.85rem)]">
          <span className="text-[var(--signal)]">Perception</span> is the
          process by which people select, organize, and interpret information
          to form a meaningful picture of the world.
        </Statement>
        <Figure height="auto" dense className="mx-auto max-w-[960px]">
          <PerceptionSequence />
        </Figure>
      </Slide>

      <Slide id="discussion-social-influence" border className="!py-8">
        {/* Centred and symmetric: the question sits between two hairlines and
            the spectrum below it reaches out to both sides, like a slider. */}
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="type-h1">
            <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Social Influence
          </h2>
          <div className="mt-8 w-full max-w-5xl border-y-2 border-[var(--counter)] px-4 py-8 md:px-12">
            <p className="type-quote mx-auto !max-w-[40ch] !text-[clamp(1.45rem,2.6vw,2.2rem)]">
              <span className="type-label mb-5 block !text-[0.8rem] !leading-none !text-[var(--counter)]">
                Discussion:
              </span>{" "}
              How has a specific social media influencer affected your
              perception of a brand, and do you think their influence was based
              more on their{" "}
              <span className="text-[var(--counter)]">expertise</span> or their{" "}
              <span className="text-[var(--signal)]">lifestyle</span>?
            </p>
          </div>
        </div>
        <Figure height="auto" dense className="mx-auto !mt-8 max-w-[1000px]">
          <ExpertiseLifestyle />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 3 — B2C vs B2B Purchasing
          ================================================================ */}
      <PartPlate id="part-3" n={3} title="B2C vs B2B Purchasing" layout="stacked" className="!py-8">
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead className="!max-w-none">
              While <Term tone="counter">B2C (Business-to-Consumer)</Term>{" "}
              marketing focuses on the final consumer,{" "}
              <Term>B2B (Business-to-Business)</Term> focuses on organizations.
            </Lead>
            <Ruled weight="thin">
              <P>
                Business buyer behavior refers to the buying behavior of
                organizations that buy goods and services for use in the
                production of other products.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ConsumerAndBusinessLanes />
          </Plate>
        </div>
        {/* A closing band across the full width. */}
        <p className="type-display mt-10 w-full border-y-2 border-[var(--ink)] py-6 !text-[clamp(1.6rem,2.8vw,2.5rem)] !leading-tight">
          The business market is{" "}
          <span className="text-[var(--signal)]">huge</span> and differs from
          the consumer market in several key ways.
        </p>
      </PartPlate>

      <Slide
        id="market-structure-and-demand"
        border
        className="!py-8"
        exercise={exercise["market-structure-and-demand"]}
      >
        <Tag>Buyers and demand</Tag>
        <Heading>Market Structure and Demand</Heading>
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
        <Figure height="auto" dense className="!mt-4">
          <MarketStructureTriptych />
        </Figure>
      </Slide>

      <Slide
        id="the-buying-center"
        border
        className="!py-8"
        exercise={exercise["the-buying-center"]}
      >
        <Tag>Many roles, one decision</Tag>
        <Heading>The Buying Center</Heading>
        <div className="w-full flow-root">
          {/* On wide screens the table floats right and the lines follow its
              oval of people. Phones get the plate after the first sentence. */}
          <div
            className="hidden lg:block lg:float-right lg:ml-6 lg:w-[28rem]"
            style={{
              shapeOutside:
                "polygon(38% 0%, 100% 0%, 100% 100%, 20% 100%, 20% 64%, 0% 60%, 0% 30%, 38% 22%)",
              shapeMargin: "28px",
            }}
          >
            <BuyingCenterTable round />
          </div>
          <Statement className="!max-w-none !text-[clamp(2rem,3.3vw,3rem)] !leading-[1.12]">
            B2B purchases are{" "}
            <span className="text-[var(--signal)]">rarely</span> made by a
            single individual.
          </Statement>
          <div className="mx-auto mt-6 max-w-[24rem] lg:hidden">
            <BuyingCenterTable round />
          </div>
          <p className="type-lead mt-8 !max-w-none !text-[1.45rem] !leading-relaxed !text-[var(--ink)]">
            The buying center consists of all the individuals and units that
            play a role in the purchase decision-making process.
          </p>
          <p className="type-h2 mt-8 !max-w-none !font-normal !text-[clamp(1.6rem,2.4vw,2.1rem)] !leading-snug">
            It includes <Term>users</Term>, <Term>influencers</Term>,{" "}
            <Term>buyers</Term>, <Term>deciders</Term>, and{" "}
            <Term>gatekeepers</Term>.
          </p>
        </div>
      </Slide>

      <Slide id="the-nature-of-the-buying-unit" border className="!py-8">
        <Tag>Trained buyers, trained sellers</Tag>
        <Heading>The Nature of the Buying Unit</Heading>
        <Lead className="!max-w-[64ch]">
          Compared with consumer purchases, a business purchase usually
          involves <Term tone="ink">more decision participants</Term> and a{" "}
          <Term>more professional purchasing effort</Term>.
        </Lead>
        {/* Versus: each sentence stands over the side of the match it names,
            the buyer's side on the left, the marketer's on the right. */}
        <div className="mt-4 grid w-full md:grid-cols-2">
          <div className="min-w-0 border-t-2 border-[var(--ink)] pt-5 md:pr-12">
            <p className="type-lead !max-w-none !text-[var(--ink-2)]">
              Business buying is done by{" "}
              <Term tone="ink">trained purchasing agents</Term> who spend
              their professional lives learning how to buy better.
            </p>
          </div>
          <div className="min-w-0 border-t-2 border-[var(--signal)] pt-5 md:border-l md:border-l-[var(--rule)] md:pl-12">
            <p className="type-h2 !max-w-none !font-normal">
              Therefore, B2B marketers must have{" "}
              <span className="text-[var(--signal)]">
                well-trained salespeople
              </span>{" "}
              to deal with well-trained buyers.
            </p>
          </div>
        </div>
        <Figure height="auto" dense className="mx-auto !mt-6 max-w-[780px]">
          <MatchedExperts />
        </Figure>
      </Slide>

      <Slide id="discussion-b2b-complexity" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter">
          B2B Complexity
        </KickerHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            <PromptKicker /> Why might a B2B software company need to create{" "}
            <span className="text-[var(--signal)]">
              entirely different marketing materials
            </span>{" "}
            for the <span className="text-[var(--ink)]">&quot;user&quot;</span>{" "}
            (e.g., an IT employee) versus the{" "}
            <span className="text-[var(--counter)]">&quot;decider&quot;</span>{" "}
            (e.g., the CFO) within the same buying center?
          </Prompt>
          <Plate className="mx-auto max-w-[27rem]">
            <TwoBrochures column />
          </Plate>
        </div>
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
