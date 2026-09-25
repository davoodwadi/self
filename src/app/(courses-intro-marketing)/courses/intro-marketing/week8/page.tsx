"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import { Plate } from "../_visuals/kit";
import exercisesData from "./exercises.json";
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
  CostTypes,
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
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise that tests that slide
// and the ones before it. They live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

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
    <p
      className={cn(
        "type-quote max-w-[30ch] !text-[clamp(1.4rem,2.1vw,1.85rem)]",
        className,
      )}
    >
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
        "min-w-0 border-t-2 pt-4",
        BORDER[tone],
        className,
      )}
    >
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
    <div className="mb-6 w-full">
      <h2
        className={cn(
          "type-h1",
          typeof children === "string" &&
            children.length > 36 &&
            "!text-[clamp(2rem,3.4vw,3rem)]",
        )}
      >
        {kicker ? (
          <>
            <span
              className={cn(
                "type-label mb-2 block !text-[0.8rem]",
                tone === "counter" && "!text-[var(--counter)]",
              )}
            >
              {kicker}
            </span>{" "}
          </>
        ) : null}
        {children}
      </h2>
      <div className="mt-4 h-px w-full bg-[var(--rule)]" />
    </div>
  );
}

/** Discussion prompt. "Discussion:" stays in the sentence as a kicker. */
function Prompt({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-7 md:px-10 md:py-8",
        className,
      )}
    >
      <p className="type-quote !text-[clamp(1.35rem,2.1vw,1.8rem)] max-w-[44ch]">
        {children}
      </p>
    </div>
  );
}

function PromptKicker() {
  return (
    <span className="type-label !text-[var(--counter)] block mb-4 !text-[0.8rem] !leading-none">
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
        "grid w-full grid-cols-4 gap-2 sm:gap-3",
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
              "flex min-w-0 items-baseline gap-2 border-t-2 pt-2",
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
                "hidden sm:block text-[0.8rem] leading-snug",
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
    <Slide id={id} border className="!py-8" exercise={exercise[id]}>
      <SectionStrip active={section} className="mb-6" />
      <Heading kicker={kicker}>{title}</Heading>
      {children}
    </Slide>
  );
}

/**
 * A part opener: the strip lit, an outlined numeral beside the "Part N:"
 * heading, then the part's sentences and plate.
 */
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
    <Slide id={id} border className="!py-8" exercise={exercise[id]}>
      <SectionStrip active={n - 1} className="mb-8" />
      <div className="mb-8 flex w-full items-end gap-8 md:gap-12">
        <div
          aria-hidden
          className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[5.5rem] xl:text-[8rem]"
          style={{
            ...SERIF,
            fontVariationSettings: '"opsz" 144, "WONK" 1',
          }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <h2 className="type-display min-w-0 !text-[clamp(2.2rem,4.4vw,3.8rem)]">
          <span className="type-label block mb-3 !text-[0.8rem]">
            {`Part ${n}:`}
          </span>{" "}
          {title}
        </h2>
      </div>
      <div className="mb-8 h-px w-full bg-[var(--rule)]" />
      {children}
    </Slide>
  );
}

/** A ruled sentence with its plate beneath. */
function Col({
  tone = "ink",
  text,
  plate,
  plateClass = "",
  className = "",
}: {
  tone?: Tone;
  text: React.ReactNode;
  plate: React.ReactNode;
  plateClass?: string;
  className?: string;
}) {
  return (
    <Ruled tone={tone} className={cn("flex flex-col gap-4", className)}>
      {React.isValidElement(text) && text.type === "div" ? (
        text
      ) : (
        <P>{text}</P>
      )}
      <Plate className={cn("!p-2", plateClass)}>{plate}</Plate>
    </Ruled>
  );
}

/** A ruled row: the sentence on the left, its plate on the right. */
function Row({
  tone = "ink",
  text,
  plate,
  cols = "md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]",
  lead = false,
  className = "",
}: {
  tone?: Tone;
  text: React.ReactNode;
  plate: React.ReactNode;
  cols?: string;
  /** Set the sentence at lead size, for rows with room to spare. */
  lead?: boolean;
  className?: string;
}) {
  return (
    <Ruled
      tone={tone}
      className={cn("grid items-center gap-5 !pt-3", cols, className)}
    >
      {lead ? (
        <Lead className="!max-w-[34ch] [&_strong]:font-semibold">{text}</Lead>
      ) : (
        <P className="!max-w-none">{text}</P>
      )}
      <Plate className="!p-2">{plate}</Plate>
    </Ruled>
  );
}

/** Text on one side, a plate on the other, unruled. */
function Beside({
  text,
  plate,
  cols = "lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]",
  className = "",
}: {
  text: React.ReactNode;
  plate: React.ReactNode;
  cols?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full items-center gap-8 lg:gap-10",
        cols,
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-5">{text}</div>
      <Plate className="!p-2">{plate}</Plate>
    </div>
  );
}

/** The four Ps, with Price lit: where this week sits in the mix. */
function MixStrip() {
  return (
    <ol
      aria-hidden
      className="mx-auto mt-8 grid w-full max-w-2xl grid-cols-4 gap-3"
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
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-10 w-full max-w-3xl space-y-4 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 8 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we explore the second P of the marketing mix,{" "}
            <span className="text-[var(--signal)]">Price</span>.
          </p>
        </div>
        <MixStrip />

        <div className="mt-10 w-full max-w-3xl border-t border-[var(--rule)] pt-6">
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
          <div className="mx-auto mt-5 w-full max-w-xl">
            <BottomLinePerception />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Paradigm of Price
          ================================================================ */}
      <Slide
        id="the-paradigm-of-price"
        border
        className="!py-8"
        exercise={exercise["the-paradigm-of-price"]}
      >
        <Heading>The Paradigm of Price</Heading>
        {/* The claim and its counterpart beside the zero line; flexibility
            and choice in two columns underneath. */}
        <Beside
          text={
            <>
              <Statement className="!max-w-[22ch]">
                Price is the <Tint>only element</Tint> in the marketing mix that
                produces revenue.
              </Statement>
              <Ruled>
                <P>
                  All other elements represent{" "}
                  <Term tone="ink">costs to the organization</Term>.
                </P>
              </Ruled>
            </>
          }
          plate={<RevenueAndCosts />}
        />
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                Price is <Term>highly flexible</Term> and can be changed quickly
                compared to product features or channel commitments.
              </>
            }
            plate={<ChangeSpeed />}
          />
          <Col
            tone="signal"
            text={
              <>
                It is a <Term>critical determinant</Term> of buyer choice and
                market share.
              </>
            }
            plate={<ChoiceShare />}
          />
        </div>
      </Slide>

      {/* ================================================================
          Part 1 — Factors Affecting Pricing Decisions
          ================================================================ */}
      <PartPlate id="part-1" n={1} title="Factors Affecting Pricing Decisions">
        <Beside
          cols="lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          text={
            <>
              <Lead className="!max-w-none">
                Setting the right price requires balancing{" "}
                <Term tone="ink">internal capabilities</Term> and{" "}
                <Term tone="counter">external realities</Term>.
              </Lead>
              <Ruled>
                <P>
                  <Term tone="ink">Internal factors</Term> include marketing
                  objectives and costs.
                </P>
              </Ruled>
              <Ruled tone="counter">
                <P>
                  <Term tone="counter">External factors</Term> encompass market
                  demand and competitor behavior.
                </P>
              </Ruled>
            </>
          }
          plate={<InsideOutside />}
        />
      </PartPlate>

      <TopicSlide
        id="internal-factors-marketing-objectives"
        section={0}
        kicker="Internal Factors:"
        title="Marketing Objectives"
      >
        {/* Alignment and the four objectives in three columns; the pricing
            range across the foot. */}
        <div className="grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            text={
              <>
                Pricing strategies must <Term>align</Term> with broader company
                goals.
              </>
            }
            plate={<AlignGoals />}
          />
          <Col
            tone="signal"
            text={
              <>
                Objectives may include <Term>survival</Term> or{" "}
                <Term>current profit maximization</Term>.
              </>
            }
            plate={<Objectives pair="first" />}
          />
          <Col
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
        <Beside
          className="mt-6 border-t-2 border-[var(--signal)] pt-4"
          text={
            <Statement>
              A <Tint>clear objective</Tint> guides the initial pricing range.
            </Statement>
          }
          plate={<ObjectiveRange />}
        />
      </TopicSlide>

      <TopicSlide
        id="internal-factors-costs"
        section={0}
        kicker="Internal Factors:"
        title="Costs"
      >
        <div className="grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            text={
              <>
                Costs set the <Term>absolute floor</Term> for the price that the
                company can charge.
              </>
            }
            plate={<CostFloor />}
          />
          <Col
            text={
              <>
                <Term tone="ink">Fixed costs</Term> do not vary with production
                or sales level.
              </>
            }
            plate={<CostLine kind="fixed" />}
          />
          <Col
            tone="counter"
            text={
              <>
                <Term tone="counter">Variable costs</Term> vary directly with the
                level of production.
              </>
            }
            plate={<CostLine kind="variable" />}
          />
        </div>
        <Beside
          className="mt-6 border-t-2 border-[var(--signal)] pt-4"
          text={
            <Statement>
              <Tint>Total costs must be covered</Tint> to achieve long-term
              viability.
            </Statement>
          }
          plate={<TotalCosts />}
        />
      </TopicSlide>

      <TopicSlide
        id="external-factors-the-market-and-demand"
        section={0}
        kicker="External Factors:"
        title="The Market and Demand"
      >
        <Beside
          text={
            <Statement>
              While <strong className="font-semibold">costs</strong> set the
              lower limit, the <Tint tone="counter">market</Tint> sets the upper
              limit.
            </Statement>
          }
          plate={<FloorCeiling />}
        />
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <Col
            tone="counter"
            text={
              <>
                Understanding the relationship between <Term>price</Term> and{" "}
                <Term tone="counter">demand</Term> is crucial.
              </>
            }
            plate={<DemandCurve />}
          />
          <Col
            text={
              <div className="flex flex-col gap-2">
                <P className="!max-w-none">
                  Different markets exhibit different competitive conditions.
                </P>
                <P className="!max-w-none">
                  <Term>Pricing freedom</Term> varies across pure competition,
                  monopolistic competition, oligopoly, and pure monopoly.
                </P>
              </div>
            }
            plate={<MarketStructures />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="external-factors-price-elasticity"
        section={0}
        kicker="External Factors:"
        title="Price Elasticity"
      >
        <Lead className="!max-w-[62ch]">
          <Term>Price elasticity</Term> measures how responsive demand will be
          to a change in price.
        </Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            text={
              <>
                <Term tone="ink">Inelastic demand</Term> means demand hardly
                changes with a small change in price.
              </>
            }
            plate={<Elasticity kind="inelastic" />}
          />
          <Col
            tone="counter"
            text={
              <>
                <Term tone="counter">Elastic demand</Term> means demand changes
                greatly in response to price changes.
              </>
            }
            plate={<Elasticity kind="elastic" />}
          />
          <Col
            tone="signal"
            text={
              <>
                Companies must understand elasticity to{" "}
                <Term>forecast revenues</Term> accurately.
              </>
            }
            plate={<RevenueForecast />}
          />
        </div>
      </TopicSlide>

      {/* ================================================================
          Part 2 — Core Pricing Approaches
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="Core Pricing Approaches">
        <Beside
          text={
            <>
              <Lead className="!max-w-none">
                Once factors are understood, marketers must select a pricing
                approach.
              </Lead>
              <Statement>
                Three major pricing strategies dominate the market.
              </Statement>
              <Ruled>
                <P>
                  They are <Term>customer value-based pricing</Term>,{" "}
                  <Term tone="ink">cost-based pricing</Term>, and{" "}
                  <Term tone="counter">competition-based pricing</Term>.
                </P>
              </Ruled>
            </>
          }
          plate={<ApproachLanes />}
        />
      </PartPlate>

      <TopicSlide
        id="customer-value-based-pricing"
        section={1}
        title="Customer Value-Based Pricing"
      >
        <Beside
          cols="lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
          text={
            <Lead className="!max-w-[40ch]">
              This approach uses <Term>buyers&apos; perceptions of value</Term>{" "}
              as the key to pricing.
            </Lead>
          }
          plate={<ValueKey />}
        />
        <div className="mt-6 flex w-full flex-col gap-5">
          <Row
            cols="md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]"
            text={
              <>
                Price is considered along with{" "}
                <Term tone="ink">all other marketing mix variables</Term> before
                the marketing program is set.
              </>
            }
            plate={<MixTogether />}
          />
          <Ruled
            tone="signal"
            className="grid items-center gap-5 !pt-3 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]"
          >
            <div className="flex min-w-0 flex-col gap-2">
              <P className="!max-w-none">
                The company assesses{" "}
                <Term>customer needs and value perceptions first</Term>.
              </P>
              <P className="!max-w-none">
                It is the <Term>reverse</Term> of the cost-based approach.
              </P>
            </div>
            <Plate className="!p-2">
              <ReverseChains />
            </Plate>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="good-value-pricing-vs-value-added-pricing"
        section={1}
        title="Good-Value Pricing vs. Value-Added Pricing"
      >
        {/* Good value on the left, value added on the right; each sentence
            beside its plate. */}
        <div className="grid w-full gap-x-10 gap-y-5 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-2">
          <Row
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            tone="signal"
            text={
              <>
                <Term>Good-value pricing</Term> offers the right combination of
                quality and good service at a fair price.
              </>
            }
            plate={<GoodValueBalance />}
          />
          <Row
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            tone="signal"
            text={
              <>
                It often involves introducing{" "}
                <Term>less expensive versions</Term> of established brand-name
                products.
              </>
            }
            plate={<LessExpensiveVersion />}
          />
          <Row
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            tone="counter"
            text={
              <>
                <Term tone="counter">Value-added pricing</Term> attaches
                value-added features to differentiate offers.
              </>
            }
            plate={<ValueAddedFeatures />}
          />
          <Row
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
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
      </TopicSlide>

      <TopicSlide
        id="cost-based-pricing"
        section={1}
        title="Cost-Based Pricing"
      >
        <Beside
          cols="lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          text={
            <>
              <Lead className="!max-w-none">
                Involves setting prices based on the{" "}
                <Term tone="ink">
                  costs of producing, distributing, and selling
                </Term>{" "}
                the product.
              </Lead>
              <P>
                It includes a <Term>fair rate of return</Term> for effort and
                risk.
              </P>
            </>
          }
          plate={<CostBuildUp />}
        />
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <Col
            text={
              <>
                Types include <Term tone="ink">cost-plus pricing</Term> and{" "}
                <Term tone="ink">break-even pricing</Term>.
              </>
            }
            plate={<CostTypes />}
          />
          <Col
            tone="signal"
            text={
              <>
                While simple, it <Term>ignores demand</Term> and{" "}
                <Term>competitors&apos; prices</Term>.
              </>
            }
            plate={<Blinkers />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="competition-based-pricing"
        section={1}
        title="Competition-Based Pricing"
      >
        <Beside
          text={
            <Lead className="!max-w-none">
              Prices are set based on{" "}
              <Term tone="counter">
                competitors&apos; strategies, prices, costs, and market
                offerings
              </Term>
              .
            </Lead>
          }
          plate={<CompetitorReadings />}
        />
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Col
            tone="counter"
            text={
              <>
                Consumers will base their judgments of a product&apos;s value on{" "}
                <Term tone="counter">the prices that competitors charge</Term>.
              </>
            }
            plate={<ValueJudged />}
          />
          <Col
            tone="counter"
            text={
              <div className="flex flex-col gap-2">
                <P className="!max-w-none">
                  The company must assess how its offer compares to competitors
                  in terms of <Term tone="counter">customer value</Term>.
                </P>
                <P className="!max-w-none">
                  If the offer provides{" "}
                  <Term tone="counter">greater value</Term>, a higher price can
                  be justified.
                </P>
              </div>
            }
            plate={<ValueJustifies />}
          />
        </div>
      </TopicSlide>

      <Slide id="discussion-pricing-approaches" border className="!py-8">
        <Heading kicker="Discussion:" tone="counter">
          Pricing Approaches
        </Heading>
        <Beside
          text={
            <Lead className="!max-w-none">
              A new streaming platform enters a crowded market dominated by{" "}
              <Term tone="ink">established giants</Term> with a{" "}
              <Term>unique recommendation algorithm</Term> but a{" "}
              <Term tone="ink">smaller content library</Term>.
            </Lead>
          }
          plate={<StreamingMarket />}
        />
        <Prompt className="mt-6">
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
        <Beside
          text={
            <>
              <Lead className="!max-w-none">
                Introducing a new product brings unique pricing challenges.
              </Lead>
              <Statement>
                Pricing must be <Tint>dynamic</Tint> and adapt as the product
                passes through its life cycle.
              </Statement>
              <Ruled>
                <P>
                  The two primary strategies are{" "}
                  <Term>market-skimming pricing</Term> and{" "}
                  <Term tone="counter">market-penetration pricing</Term>.
                </P>
              </Ruled>
            </>
          }
          plate={<SkimToPenetrate />}
        />
      </PartPlate>

      <TopicSlide
        id="market-skimming-pricing"
        section={2}
        title="Market-Skimming Pricing"
      >
        <Beside
          text={
            <Lead className="!max-w-none">
              Setting a <Term>high price</Term> for a new product to skim
              maximum revenues layer by layer.
            </Lead>
          }
          plate={<MarketLayers mode="skim" />}
        />
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                The company makes <Term>fewer but more profitable sales</Term>.
              </>
            }
            plate={<FewerProfitable />}
          />
          <Col
            text={
              <>
                <Term>Product quality and image</Term> must support the high
                price.
              </>
            }
            plate={<QualityImagePillars />}
          />
          <Col
            text={
              <>
                Competitors should not be able to <Term>easily enter</Term> the
                market and undercut the high price.
              </>
            }
            plate={<NoUndercut />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="market-penetration-pricing"
        section={2}
        title="Market-Penetration Pricing"
      >
        <Beside
          text={
            <Lead className="!max-w-none">
              Setting a <Term tone="counter">low initial price</Term> in order
              to penetrate the market quickly and deeply.
            </Lead>
          }
          plate={<MarketLayers mode="penetrate" />}
        />
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            tone="counter"
            text={
              <>
                The goal is to attract a{" "}
                <Term tone="counter">large number of buyers</Term> quickly and
                win a large market share.
              </>
            }
            plate={<ManyBuyersShare />}
          />
          <Col
            text={
              <>
                The market must be{" "}
                <Term tone="counter">highly price-sensitive</Term>.
              </>
            }
            plate={<Elasticity kind="elastic" title="HIGHLY PRICE-SENSITIVE" />}
          />
          <Col
            text={
              <>
                Production and distribution costs must{" "}
                <Term tone="counter">decrease</Term> as sales volume increases.
              </>
            }
            plate={<CostsFall />}
          />
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
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Col
            text={
              <>
                The strategy changes when the product is part of a{" "}
                <Term>product mix</Term>.
              </>
            }
            plate={<AloneVsMix />}
          />
          <Col
            tone="signal"
            text={
              <>
                The firm looks for a <Term>set of prices</Term> that maximizes
                its profits on the total mix.
              </>
            }
            plate={<TotalMixProfit />}
          />
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Row
            text={
              <>
                Pricing is difficult because the various products have{" "}
                <Term>related demand and costs</Term>.
              </>
            }
            plate={<RelatedDemand />}
          />
          <Ruled tone="signal">
            <Statement className="!max-w-none">
              Common strategies include <Tint>product line pricing</Tint> and{" "}
              <Tint>captive-product pricing</Tint>.
            </Statement>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="product-line-and-optional-product-pricing"
        section={3}
        title="Product Line and Optional-Product Pricing"
      >
        <div className="grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                <Term>Product line pricing</Term> determines the price steps
                between various products in a line.
              </>
            }
            plate={<PriceSteps />}
          />
          <Col
            tone="signal"
            text={
              <>
                It is based on <Term tone="ink">cost differences</Term>,{" "}
                <Term tone="ink">customer evaluations of features</Term>, and{" "}
                <Term tone="ink">competitors&apos; prices</Term>.
              </>
            }
            plate={<StepInputs />}
          />
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <Row
            text={
              <>
                <Term>Optional-product pricing</Term> is the pricing of optional
                or accessory products along with a main product.
              </>
            }
            plate={<OptionalProducts />}
          />
          <Row
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
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <Col
            text={
              <>
                Setting a price for products that{" "}
                <Term>must be used along with</Term> a main product.
              </>
            }
            plate={<CaptiveFit />}
          />
          <Col
            text={
              <>
                Examples include <Term>blades</Term> for a razor and{" "}
                <Term>games</Term> for a video game console.
              </>
            }
            plate={<CaptiveExamples />}
          />
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                The main product is often{" "}
                <strong className="font-semibold">priced low</strong>, with{" "}
                <Term>high markups</Term> on the captive supplies.
              </>
            }
            plate={<CaptiveMarkups />}
          />
          <Col
            tone="signal"
            text={
              <>
                This strategy ensures <Term>ongoing revenue streams</Term> from
                the initial purchase.
              </>
            }
            plate={<OngoingStream />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="product-bundle-pricing"
        section={3}
        title="Product Bundle Pricing"
      >
        <Beside
          text={
            <Lead className="!max-w-none">
              Combining several products and offering the bundle at a{" "}
              <Term>reduced price</Term>.
            </Lead>
          }
          plate={<BundleReduced />}
        />
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                This can promote the sales of products consumers{" "}
                <Term>might not otherwise buy</Term>.
              </>
            }
            plate={<BundleRideAlong />}
          />
          <Col
            tone="counter"
            text={
              <>
                The combined price must be{" "}
                <Term tone="counter">low enough</Term> to get them to buy the
                bundle.
              </>
            }
            plate={<BundleThreshold />}
          />
          <Col
            text={
              <>
                It helps <Term>clear out excess inventory</Term> while providing
                value.
              </>
            }
            plate={<ClearInventory />}
          />
        </div>
      </TopicSlide>

      <Slide id="discussion-product-mix-pricing" border className="!py-8">
        <Heading kicker="Discussion:" tone="counter">
          Product Mix Pricing
        </Heading>
        <Beside
          text={
            <Lead className="!max-w-none">
              A premium coffee machine manufacturer introduces a new model that
              requires <Term>proprietary coffee pods</Term> that only fit this
              specific machine.
            </Lead>
          }
          plate={<PodDilemma />}
        />
        <Prompt className="mt-6">
          <PromptKicker /> Should they price the machine{" "}
          <Tint>low to sell more pods</Tint> or price the machine{" "}
          <Tint tone="counter">high to maintain a premium brand image</Tint>?
        </Prompt>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border className="!py-8">
        <Heading kicker="Conclusion:">Pricing Strategies</Heading>
        <ol className="grid w-full gap-x-12 gap-y-10 md:grid-cols-2">
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
              className="flex flex-col gap-5 border-t-2 border-[var(--ink)] pt-5"
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
