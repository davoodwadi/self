"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import quizzesData from "./quizzes.json";
import {
  BottomLinePerception,
  RevenueAndCosts,
  ChangeSpeed,
  ChoiceShare,
  InsideOutside,
  AlignGoals,
  Objectives,
  ObjectiveRange,
  CostFloor,
  CostLine,
  TotalCosts,
  FloorCeiling,
  DemandCurve,
  MarketStructures,
  Elasticity,
  RevenueForecast,
  ApproachLanes,
  ValueKey,
  MixTogether,
  ReverseChains,
  GoodValueBalance,
  LessExpensiveVersion,
  ValueAddedFeatures,
  HigherNotCut,
  CostBuildUp,
  CostPlus,
  BreakEven,
  Blinkers,
  CompetitorReadings,
  ValueJudged,
  ValueJustifies,
  StreamingMarket,
  SkimToPenetrate,
  MarketLayers,
  FewerProfitable,
  QualityImagePillars,
  NoUndercut,
  ManyBuyersShare,
  CostsFall,
  AloneVsMix,
  TotalMixProfit,
  RelatedDemand,
  PriceSteps,
  StepInputs,
  OptionalProducts,
  BaseOrOptions,
  CaptiveFit,
  CaptiveExamples,
  CaptiveMarkups,
  OngoingStream,
  BundleReduced,
  BundleRideAlong,
  BundleThreshold,
  ClearInventory,
  PodDilemma,
  GlyphRevenue,
  GlyphWall,
  GlyphLanes,
  GlyphLayers,
} from "./visuals";

// ============================================================================
// WEEK 08 — PRICING STRATEGIES (THE SECOND P)
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// Colour carries meaning across Part 2: customer value-based pricing is
// SIGNAL, cost-based pricing is INK, competition-based pricing is COUNTER.
// In Part 3, skimming is SIGNAL and penetration is COUNTER.
//
// Quizzes: in this route group `Slide` renders `quizData` AFTER its section.
// Each [quiz]-tagged topic therefore carries its own quiz, which tests that
// slide and the ones before it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzesData as CourseQuiz[]);

const SERIF = { fontFamily: "var(--font-heading)", fontWeight: 600 } as const;

type Tone = "signal" | "counter" | "ink";

const BORDER: Record<Tone, string> = {
  signal: "border-[var(--signal)]",
  counter: "border-[var(--counter)]",
  ink: "border-[var(--ink)]",
};

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
        "gsap-reveal type-body max-w-[var(--measure)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)]",
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
    <p className={cn("gsap-reveal type-lead max-w-[46ch]", className)}>
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
    <p className={cn("gsap-reveal type-quote max-w-[30ch]", className)}>
      {children}
    </p>
  );
}

/** A sentence at h2 size. */
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

/** Coloured term inside a sentence, without the Highlight underline. */
function Term({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  const color = {
    signal: "text-[var(--signal)]",
    counter: "text-[var(--counter)]",
    ink: "text-[var(--ink)]",
  }[tone];
  return <strong className={cn("font-semibold", color)}>{children}</strong>;
}

/** Inline colour for a phrase inside a serif sentence. */
function Tint({
  children,
  tone = "signal",
}: {
  children: React.ReactNode;
  tone?: "signal" | "counter";
}) {
  return (
    <span
      className={
        tone === "signal" ? "text-[var(--signal)]" : "text-[var(--counter)]"
      }
    >
      {children}
    </span>
  );
}

/** Hairline-topped block with a verbatim sentence. */
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

/** A plate that lives in a column: a figure well without the 680px floor. */
function Plate({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gsap-reveal figure-well w-full p-3 sm:p-5", className)}>
      {children}
    </div>
  );
}

/**
 * A slide heading. When the content gives a "Label:" prefix ("Internal
 * Factors:", "Discussion:") it is set as a small tracked kicker inside the
 * same h2, so the heading text stays exactly as written.
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
    <div className="gsap-reveal w-full mb-8 md:mb-12">
      <h2 className="type-h1 max-w-[24ch]">
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label block mb-4 !text-[0.8rem]",
                tone === "counter" && "!text-[var(--counter)]",
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

/** Discussion prompt. "Discussion:" stays in the sentence as a kicker. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="gsap-reveal relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
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
   Wayfinding: the four movements of the week
   -------------------------------------------------------------------------- */

const SECTIONS = [
  "Factors Affecting Pricing",
  "Core Pricing Approaches",
  "New Products",
  "Product Mixes",
];

/**
 * The four movements as a strip. On each topic slide the current one is lit
 * and those behind it are inked, so students always know where they are.
 */
function SectionStrip({
  active,
  className = "",
}: {
  active: number;
  className?: string;
}) {
  return (
    <ol
      aria-hidden
      className={cn(
        "gsap-reveal grid w-full grid-cols-4 gap-2 sm:gap-3",
        className,
      )}
    >
      {SECTIONS.map((name, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <li
            key={name}
            className={cn(
              "min-w-0 border-t-2 pt-3",
              on
                ? "border-[var(--signal)]"
                : done
                  ? "border-[var(--ink)]"
                  : "border-[var(--rule)]",
            )}
          >
            <span
              className={cn(
                "type-label block !text-[0.68rem]",
                on ? "!text-[var(--signal)]" : "!text-[var(--ink-3)]",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "mt-1.5 hidden sm:block text-[0.8rem] leading-snug",
                on ? "font-semibold text-[var(--ink)]" : "text-[var(--ink-3)]",
              )}
            >
              {name}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** A topic slide: section strip, heading, then the slide's content. */
function TopicSlide({
  id,
  section,
  kicker,
  title,
  children,
}: {
  id: string;
  section: number;
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border quizData={quiz[id]}>
      <SectionStrip active={section} className="mb-12 md:mb-16" />
      <Heading kicker={kicker}>{title}</Heading>
      {children}
    </Slide>
  );
}

/** A part opener: outlined numeral, "Part N:" kicker, and the strip lit. */
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
    <Slide id={id} border quizData={quiz[id]}>
      <SectionStrip active={n - 1} className="mb-12 md:mb-16" />
      <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,15rem)_1fr] xl:gap-16">
        <div
          aria-hidden
          className="gsap-reveal select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[7rem] xl:text-[13rem]"
          style={{
            ...SERIF,
            fontVariationSettings: '"opsz" 144, "WONK" 1',
          }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="gsap-reveal type-display !text-[clamp(2.4rem,5.4vw,4.5rem)] max-w-[18ch]">
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

/** A column: a ruled sentence with its plate beneath. */
function PlateColumn({
  tone = "ink",
  text,
  plate,
}: {
  tone?: Tone;
  text: React.ReactNode;
  plate: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <Ruled tone={tone}>
        <P>{text}</P>
      </Ruled>
      <Plate>{plate}</Plate>
    </div>
  );
}

/** A plate on the left, a sentence on the right, ruled across the top. */
function PlateRow({
  plate,
  tone = "ink",
  children,
}: {
  plate: React.ReactNode;
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "gsap-reveal grid w-full items-center gap-6 border-t-2 py-8 md:grid-cols-[minmax(0,27rem)_1fr] md:gap-12",
        BORDER[tone],
      )}
    >
      <Plate className="!p-2 sm:!p-3">{plate}</Plate>
      <p className="type-h2 !font-normal max-w-[32ch]">{children}</p>
    </div>
  );
}

/** A sentence and a column plate side by side. */
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
    <div
      className={cn(
        "grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14",
        className,
      )}
    >
      {plateFirst ? <Plate>{plate}</Plate> : null}
      {children}
      {plateFirst ? null : <Plate>{plate}</Plate>}
    </div>
  );
}

/** The four Ps, with Price lit: where this week sits in the mix. */
function MixStrip() {
  return (
    <ol
      aria-hidden
      className="gsap-reveal mx-auto mt-10 grid w-full max-w-2xl grid-cols-4 gap-3"
    >
      {["Product", "Price", "Place", "Promotion"].map((p, i) => (
        <li
          key={p}
          className={cn(
            "border-t-2 pt-3 text-center text-[clamp(1rem,1.6vw,1.35rem)]",
            i === 1
              ? "border-[var(--signal)] text-[var(--signal)]"
              : i === 0
                ? "border-[var(--ink)] text-[var(--ink-3)]"
                : "border-[var(--rule)] text-[var(--ink-3)]",
          )}
          style={SERIF}
        >
          {p}
        </li>
      ))}
    </ol>
  );
}

export default function Week8() {
  return (
    <SlideDeck
      label="Week 08"
      background={<BackgroundManager type="marketing" />}
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 08 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[20ch]">
          Pricing Strategies{" "}
          <span className="text-[var(--signal)]">(The Second P)</span>
        </Title>
        <p className="gsap-reveal type-caption mt-2">Davood Wadi, PhD</p>

        <div className="gsap-reveal mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 8 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we explore the second P of the marketing mix,{" "}
            <span className="text-[var(--signal)]">Price</span>.
          </p>
        </div>
        <MixStrip />

        <div className="gsap-reveal mt-14 w-full max-w-3xl border-t border-[var(--rule)] pt-8">
          <p className="type-body mx-auto text-center">
            We will examine how price affects the{" "}
            <strong className="font-semibold text-[var(--ink)]">
              bottom line
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-[var(--counter)]">
              customer perception
            </strong>
            .
          </p>
          <div className="mx-auto mt-6 w-full max-w-xl">
            <BottomLinePerception />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Paradigm of Price
          ================================================================ */}
      <Slide id="the-paradigm-of-price" border quizData={quiz["the-paradigm-of-price"]}>
        <Heading>The Paradigm of Price</Heading>
        <div className="grid w-full items-end gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
          <Statement className="!max-w-[26ch]">
            Price is the <Tint>only element</Tint> in the marketing mix that
            produces revenue.
          </Statement>
          <Ruled>
            <P>
              All other elements represent{" "}
              <Term tone="ink">costs to the organization</Term>.
            </P>
          </Ruled>
        </div>
        <Figure height="auto">
          <RevenueAndCosts />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[46ch]">
            Price is <Tint>highly flexible</Tint> and can be changed quickly
            compared to product features or channel commitments.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ChangeSpeed />
        </Figure>
        <Pair plateFirst plate={<ChoiceShare />}>
          <Ruled tone="signal">
            <Big>
              It is a <Tint>critical determinant</Tint> of buyer choice and
              market share.
            </Big>
          </Ruled>
        </Pair>
      </Slide>

      {/* ================================================================
          Part 1 — Factors Affecting Pricing Decisions
          ================================================================ */}
      <PartPlate id="part-1" n={1} title="Factors Affecting Pricing Decisions">
        <Lead className="mt-10 !max-w-[58ch]">
          Setting the right price requires balancing{" "}
          <Term tone="ink">internal capabilities</Term> and{" "}
          <Term tone="counter">external realities</Term>.
        </Lead>
        <Figure height="auto">
          <InsideOutside />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <Big>
              <strong className="font-semibold">Internal factors</strong>{" "}
              include marketing objectives and costs.
            </Big>
          </Ruled>
          <Ruled tone="counter">
            <Big>
              <Tint tone="counter">External factors</Tint> encompass market
              demand and competitor behavior.
            </Big>
          </Ruled>
        </div>
      </PartPlate>

      <TopicSlide
        id="internal-factors-marketing-objectives"
        section={0}
        kicker="Internal Factors:"
        title="Marketing Objectives"
      >
        <Pair plate={<AlignGoals />}>
          <Ruled>
            <Big>
              Pricing strategies must <Tint>align</Tint> with broader company
              goals.
            </Big>
          </Ruled>
        </Pair>
        <div className="mt-16 grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                Objectives may include <Term>survival</Term> or{" "}
                <Term>current profit maximization</Term>.
              </>
            }
            plate={<Objectives pair="first" />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Other goals focus on <Term>market share leadership</Term> or{" "}
                <Term>product quality leadership</Term>.
              </>
            }
            plate={<Objectives pair="second" />}
          />
        </div>
        <Statement className="mt-16 !max-w-[34ch]">
          A <Tint>clear objective</Tint> guides the initial pricing range.
        </Statement>
        <Figure height="auto">
          <ObjectiveRange />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="internal-factors-costs"
        section={0}
        kicker="Internal Factors:"
        title="Costs"
      >
        <Pair plateFirst plate={<CostFloor />}>
          <Ruled>
            <Big>
              Costs set the <Tint>absolute floor</Tint> for the price that the
              company can charge.
            </Big>
          </Ruled>
        </Pair>
        <div className="mt-16 grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Fixed costs</Term> do not vary with production
                or sales level.
              </>
            }
            plate={<CostLine kind="fixed" />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Variable costs</Term> vary directly with
                the level of production.
              </>
            }
            plate={<CostLine kind="variable" />}
          />
        </div>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[44ch]">
            <Tint>Total costs must be covered</Tint> to achieve long-term
            viability.
          </Big>
        </Ruled>
        <Figure height="auto">
          <TotalCosts />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="external-factors-the-market-and-demand"
        section={0}
        kicker="External Factors:"
        title="The Market and Demand"
      >
        <Statement className="!max-w-[36ch]">
          While <strong className="font-semibold">costs</strong> set the lower limit, the{" "}
          <Tint tone="counter">market</Tint> sets the upper limit.
        </Statement>
        <Figure height="auto">
          <FloorCeiling />
        </Figure>
        <Pair plate={<DemandCurve />}>
          <Ruled tone="counter">
            <Big>
              Understanding the relationship between{" "}
              <Tint>price</Tint> and <Tint tone="counter">demand</Tint> is
              crucial.
            </Big>
          </Ruled>
        </Pair>
        <Ruled className="mt-16 w-full">
          <P className="!max-w-[72ch]">
            Different markets exhibit different competitive conditions.
          </P>
          <P className="mt-3 !max-w-[72ch]">
            <Term>Pricing freedom</Term> varies across pure competition,
            monopolistic competition, oligopoly, and pure monopoly.
          </P>
        </Ruled>
        <Figure height="auto">
          <MarketStructures />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="external-factors-price-elasticity"
        section={0}
        kicker="External Factors:"
        title="Price Elasticity"
      >
        <Lead className="!max-w-[58ch]">
          <Term>Price elasticity</Term> measures how responsive demand will be
          to a change in price.
        </Lead>
        <div className="mt-12 grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Inelastic demand</Term> means demand hardly
                changes with a small change in price.
              </>
            }
            plate={<Elasticity kind="inelastic" />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Elastic demand</Term> means demand changes
                greatly in response to price changes.
              </>
            }
            plate={<Elasticity kind="elastic" />}
          />
        </div>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[44ch]">
            Companies must understand elasticity to{" "}
            <Tint>forecast revenues</Tint> accurately.
          </Big>
        </Ruled>
        <Figure height="auto">
          <RevenueForecast />
        </Figure>
      </TopicSlide>

      {/* ================================================================
          Part 2 — Core Pricing Approaches
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="Core Pricing Approaches">
        <Lead className="mt-10 !max-w-[58ch]">
          Once factors are understood, marketers must select a pricing
          approach.
        </Lead>
        <Statement className="mt-10 !max-w-[34ch]">
          Three major pricing strategies dominate the market.
        </Statement>
        <Figure height="auto">
          <ApproachLanes />
        </Figure>
        <Ruled className="w-full">
          <Big className="max-w-[44ch]">
            They are <Tint>customer value-based pricing</Tint>,{" "}
            <strong className="font-semibold">cost-based pricing</strong>, and{" "}
            <Tint tone="counter">competition-based pricing</Tint>.
          </Big>
        </Ruled>
      </PartPlate>

      <TopicSlide
        id="customer-value-based-pricing"
        section={1}
        title="Customer Value-Based Pricing"
      >
        <Pair plate={<ValueKey />}>
          <Lead>
            This approach uses <Term>buyers&apos; perceptions of value</Term> as
            the key to pricing.
          </Lead>
        </Pair>
        <Ruled className="mt-16 w-full">
          <P className="!max-w-[72ch]">
            Price is considered along with{" "}
            <Term tone="ink">all other marketing mix variables</Term> before
            the marketing program is set.
          </P>
        </Ruled>
        <Figure height="auto">
          <MixTogether />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[44ch]">
            The company assesses{" "}
            <Tint>customer needs and value perceptions first</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ReverseChains />
        </Figure>
        <Statement className="!max-w-[34ch]">
          It is the <Tint>reverse</Tint> of the cost-based approach.
        </Statement>
      </TopicSlide>

      <TopicSlide
        id="good-value-pricing-vs-value-added-pricing"
        section={1}
        title="Good-Value Pricing vs. Value-Added Pricing"
      >
        <div className="grid w-full items-start gap-14 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-8">
            <PlateColumn
              tone="signal"
              text={
                <>
                  <Term>Good-value pricing</Term> offers the right combination
                  of quality and good service at a fair price.
                </>
              }
              plate={<GoodValueBalance />}
            />
            <PlateColumn
              tone="signal"
              text={
                <>
                  It often involves introducing{" "}
                  <Term>less expensive versions</Term> of established
                  brand-name products.
                </>
              }
              plate={<LessExpensiveVersion />}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            <PlateColumn
              tone="counter"
              text={
                <>
                  <Term tone="counter">Value-added pricing</Term> attaches
                  value-added features to differentiate offers.
                </>
              }
              plate={<ValueAddedFeatures />}
            />
            <PlateColumn
              tone="counter"
              text={
                <>
                  This allows companies to{" "}
                  <Term tone="counter">charge higher prices</Term> rather than
                  cutting prices to match competitors.
                </>
              }
              plate={<HigherNotCut />}
            />
          </div>
        </div>
      </TopicSlide>

      <TopicSlide
        id="cost-based-pricing"
        section={1}
        title="Cost-Based Pricing"
      >
        <Lead className="!max-w-[60ch]">
          Involves setting prices based on the{" "}
          <Term tone="ink">costs of producing, distributing, and selling</Term>{" "}
          the product.
        </Lead>
        <P className="mt-4">
          It includes a <Term>fair rate of return</Term> for effort and risk.
        </P>
        <Figure height="auto">
          <CostBuildUp />
        </Figure>
        <Ruled className="w-full">
          <P className="!max-w-[72ch]">
            Types include <Term tone="ink">cost-plus pricing</Term> and{" "}
            <Term tone="ink">break-even pricing</Term>.
          </P>
        </Ruled>
        <div className="mt-8 grid w-full items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <Plate className="flex items-center">
            <CostPlus />
          </Plate>
          <Plate>
            <BreakEven />
          </Plate>
        </div>
        <Statement className="mt-16 !max-w-[34ch]">
          While simple, it <Tint>ignores demand</Tint> and{" "}
          <Tint>competitors&apos; prices</Tint>.
        </Statement>
        <Figure height="auto">
          <Blinkers />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="competition-based-pricing"
        section={1}
        title="Competition-Based Pricing"
      >
        <Lead className="!max-w-[60ch]">
          Prices are set based on{" "}
          <Term tone="counter">
            competitors&apos; strategies, prices, costs, and market offerings
          </Term>
          .
        </Lead>
        <Figure height="auto">
          <CompetitorReadings />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[46ch]">
            Consumers will base their judgments of a product&apos;s value on{" "}
            <Tint tone="counter">the prices that competitors charge</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ValueJudged />
        </Figure>
        <Pair plate={<ValueJustifies />}>
          <div className="flex min-w-0 flex-col gap-8">
            <Ruled>
              <P>
                The company must assess how its offer compares to competitors
                in terms of <Term tone="counter">customer value</Term>.
              </P>
            </Ruled>
            <Ruled tone="counter">
              <Statement>
                If the offer provides <Tint tone="counter">greater value</Tint>
                , a higher price can be justified.
              </Statement>
            </Ruled>
          </div>
        </Pair>
      </TopicSlide>

      <Slide id="discussion-pricing-approaches" border>
        <Heading kicker="Discussion:" tone="counter">
          Pricing Approaches
        </Heading>
        <Lead className="!max-w-[62ch]">
          A new streaming platform enters a crowded market dominated by{" "}
          <Term tone="ink">established giants</Term> with a{" "}
          <Term>unique recommendation algorithm</Term> but a{" "}
          <Term tone="ink">smaller content library</Term>.
        </Lead>
        <Figure height="auto">
          <StreamingMarket />
        </Figure>
        <Prompt>
          <PromptKicker /> Should the company use{" "}
          <strong className="font-semibold">cost-based</strong>,{" "}
          <Tint>value-based</Tint>, or{" "}
          <Tint tone="counter">competition-based</Tint> pricing?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3 — Pricing Strategies for New Products
          ================================================================ */}
      <PartPlate id="part-3" n={3} title="Pricing Strategies for New Products">
        <Lead className="mt-10 !max-w-[58ch]">
          Introducing a new product brings unique pricing challenges.
        </Lead>
        <Figure height="auto">
          <SkimToPenetrate />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[44ch]">
            Pricing must be <Tint>dynamic</Tint> and adapt as the product passes
            through its life cycle.
          </Big>
        </Ruled>
        <P className="mt-8 !max-w-[72ch]">
          The two primary strategies are{" "}
          <Term>market-skimming pricing</Term> and{" "}
          <Term tone="counter">market-penetration pricing</Term>.
        </P>
      </PartPlate>

      <TopicSlide
        id="market-skimming-pricing"
        section={2}
        title="Market-Skimming Pricing"
      >
        <Lead className="!max-w-[60ch]">
          Setting a <Term>high price</Term> for a new product to skim maximum
          revenues layer by layer.
        </Lead>
        <Figure height="auto">
          <MarketLayers mode="skim" />
        </Figure>
        <div className="w-full">
          <PlateRow plate={<FewerProfitable />} tone="signal">
            The company makes <Tint>fewer but more profitable sales</Tint>.
          </PlateRow>
          <PlateRow plate={<QualityImagePillars />} tone="ink">
            <Tint>Product quality and image</Tint> must support the high price.
          </PlateRow>
          <PlateRow plate={<NoUndercut />} tone="ink">
            Competitors should not be able to <Tint>easily enter</Tint> the
            market and undercut the high price.
          </PlateRow>
        </div>
      </TopicSlide>

      <TopicSlide
        id="market-penetration-pricing"
        section={2}
        title="Market-Penetration Pricing"
      >
        <Lead className="!max-w-[60ch]">
          Setting a <Term tone="counter">low initial price</Term> in order to
          penetrate the market quickly and deeply.
        </Lead>
        <Figure height="auto">
          <MarketLayers mode="penetrate" />
        </Figure>
        <div className="w-full">
          <PlateRow plate={<ManyBuyersShare />} tone="counter">
            The goal is to attract a{" "}
            <Tint tone="counter">large number of buyers</Tint> quickly and win
            a large market share.
          </PlateRow>
          <PlateRow
            plate={<Elasticity kind="elastic" title="HIGHLY PRICE-SENSITIVE" />}
            tone="ink"
          >
            The market must be <Tint tone="counter">highly price-sensitive</Tint>
            .
          </PlateRow>
          <PlateRow plate={<CostsFall />} tone="ink">
            Production and distribution costs must{" "}
            <Tint tone="counter">decrease</Tint> as sales volume increases.
          </PlateRow>
        </div>
      </TopicSlide>

      {/* ================================================================
          Pricing Strategies for Product Mixes
          ================================================================ */}
      <TopicSlide
        id="pricing-strategies-for-product-mixes"
        section={3}
        title="Pricing Strategies for Product Mixes"
      >
        <Pair plate={<AloneVsMix />}>
          <Ruled>
            <Big>
              The strategy changes when the product is part of a{" "}
              <Tint>product mix</Tint>.
            </Big>
          </Ruled>
        </Pair>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[46ch]">
            The firm looks for a <Tint>set of prices</Tint> that maximizes its
            profits on the total mix.
          </Big>
        </Ruled>
        <Figure height="auto">
          <TotalMixProfit />
        </Figure>
        <Pair plateFirst plate={<RelatedDemand />}>
          <Ruled>
            <Big>
              Pricing is difficult because the various products have{" "}
              <Tint>related demand and costs</Tint>.
            </Big>
          </Ruled>
        </Pair>
        <Statement className="mt-16 !max-w-[36ch]">
          Common strategies include <Tint>product line pricing</Tint> and{" "}
          <Tint>captive-product pricing</Tint>.
        </Statement>
      </TopicSlide>

      <TopicSlide
        id="product-line-and-optional-product-pricing"
        section={3}
        title="Product Line and Optional-Product Pricing"
      >
        <Lead className="!max-w-[60ch]">
          <Term>Product line pricing</Term> determines the price steps between
          various products in a line.
        </Lead>
        <Figure height="auto">
          <PriceSteps />
        </Figure>
        <Ruled className="w-full">
          <P className="!max-w-[72ch]">
            It is based on <Term tone="ink">cost differences</Term>,{" "}
            <Term tone="ink">customer evaluations of features</Term>, and{" "}
            <Term tone="ink">competitors&apos; prices</Term>.
          </P>
        </Ruled>
        <Figure height="auto">
          <StepInputs />
        </Figure>
        <div className="mt-8 grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Optional-product pricing</Term> is the pricing of optional
                or accessory products along with a main product.
              </>
            }
            plate={<OptionalProducts />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Companies must decide which items to include in the{" "}
                <Term tone="ink">base price</Term> and which to offer as{" "}
                <Term tone="counter">options</Term>.
              </>
            }
            plate={<BaseOrOptions />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="captive-product-pricing"
        section={3}
        title="Captive-Product Pricing"
      >
        <Pair plate={<CaptiveFit />}>
          <Lead>
            Setting a price for products that{" "}
            <Term>must be used along with</Term> a main product.
          </Lead>
        </Pair>
        <Ruled className="mt-16 w-full">
          <P className="!max-w-[72ch]">
            Examples include <Term>blades</Term> for a razor and{" "}
            <Term>games</Term> for a video game console.
          </P>
        </Ruled>
        <Figure height="auto">
          <CaptiveExamples />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[46ch]">
            The main product is often <strong className="font-semibold">priced low</strong>,
            with <Tint>high markups</Tint> on the captive supplies.
          </Big>
        </Ruled>
        <Figure height="auto">
          <CaptiveMarkups />
        </Figure>
        <Statement className="!max-w-[36ch]">
          This strategy ensures <Tint>ongoing revenue streams</Tint> from the
          initial purchase.
        </Statement>
        <Figure height="auto">
          <OngoingStream />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="product-bundle-pricing"
        section={3}
        title="Product Bundle Pricing"
      >
        <Lead className="!max-w-[60ch]">
          Combining several products and offering the bundle at a{" "}
          <Term>reduced price</Term>.
        </Lead>
        <Figure height="auto">
          <BundleReduced />
        </Figure>
        <div className="w-full">
          <PlateRow plate={<BundleRideAlong />} tone="signal">
            This can promote the sales of products consumers{" "}
            <Tint>might not otherwise buy</Tint>.
          </PlateRow>
          <PlateRow plate={<BundleThreshold />} tone="counter">
            The combined price must be <Tint tone="counter">low enough</Tint> to
            get them to buy the bundle.
          </PlateRow>
          <PlateRow plate={<ClearInventory />} tone="ink">
            It helps <Tint>clear out excess inventory</Tint> while providing
            value.
          </PlateRow>
        </div>
      </TopicSlide>

      <Slide id="discussion-product-mix-pricing" border>
        <Heading kicker="Discussion:" tone="counter">
          Product Mix Pricing
        </Heading>
        <Lead className="!max-w-[62ch]">
          A premium coffee machine manufacturer introduces a new model that
          requires <Term>proprietary coffee pods</Term> that only fit this
          specific machine.
        </Lead>
        <Figure height="auto">
          <PodDilemma />
        </Figure>
        <Prompt>
          <PromptKicker /> Should they price the machine{" "}
          <Tint>low to sell more pods</Tint> or price the machine{" "}
          <Tint tone="counter">high to maintain a premium brand image</Tint>?
        </Prompt>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <Heading kicker="Conclusion:">Pricing Strategies</Heading>
        <ol className="grid w-full gap-x-12 gap-y-12 md:grid-cols-2">
          {[
            {
              glyph: <GlyphRevenue />,
              text: "Pricing is the only revenue-generating element of the marketing mix.",
            },
            {
              glyph: <GlyphWall />,
              text: "Decisions must align internal costs and objectives with external market realities.",
            },
            {
              glyph: <GlyphLanes />,
              text: "Whether cost-based, value-based, or competition-based, the strategy must reflect customer perceptions.",
            },
            {
              glyph: <GlyphLayers />,
              text: "Effective product mix and new product pricing ensures long-term profitability and market positioning.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="gsap-reveal flex flex-col gap-6 border-t-2 border-[var(--ink)] pt-6"
            >
              <div aria-hidden className="flex items-center justify-between">
                <span
                  data-n={String(i + 1).padStart(2, "0")}
                  className="step-n text-[2.2rem] leading-none text-[var(--signal)]"
                  style={SERIF}
                />
                {item.glyph}
              </div>
              <p className="type-h2 !font-normal">{item.text}</p>
            </li>
          ))}
        </ol>
        <style>{`.step-n::before { content: attr(data-n); }`}</style>
      </Slide>
    </SlideDeck>
  );
}
