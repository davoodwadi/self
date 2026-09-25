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
  OfferingKinds,
  ProblemValue,
  FinalConsumer,
  ConvenienceGood,
  ShoppingGood,
  SpecialtyGood,
  UnsoughtGood,
  FourCategories,
  PlcCascade,
  PlcCurve,
  NotStrict,
  StageWindow,
  AwarenessTrial,
  ShareGrowth,
  DefendOutlays,
  MaintainHarvestDrop,
  LegacyDecision,
  SuccessiveCurves,
  NewProductKinds,
  LaunchRisk,
  NpdStaircase,
  IdeaFunnel,
  ConceptTest,
  StrategyOutline,
  AttractivenessGauge,
  SketchToPrototype,
  TestMarketShelf,
  Launch,
  BrandElements,
  BrandPerceptions,
  BrandEquity,
  BrandFlag,
  NameChecklist,
  SponsorshipOptions,
  ContainerWrapper,
  PackageFunctions,
  LabelCallouts,
  ServiceForms,
  NoOwnership,
  ServiceEconomy,
  ServiceHub,
  FrontlineInteraction,
  ProfitChain,
  InternalMarketing,
  EmptySeats,
  PricingBalance,
  GlyphLifeCycle,
  GlyphStaircase,
  GlyphBrand,
  GlyphServiceHub,
} from "./visuals";

// ============================================================================
// WEEK 07 — PRODUCT AND SERVICE STRATEGIES (THE FIRST P)
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
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
 * A heading with a "Label:" prefix ("The Concept:", "Strategy:"). The prefix
 * is set as a small tracked kicker inside the same h2, so the heading text
 * stays exactly as written.
 */
function KickerHeading({
  kicker,
  children,
  tone = "signal",
}: {
  kicker: string;
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
        <span
          className={cn(
            "type-label mb-2 block !text-[0.8rem]",
            tone === "counter" && "!text-[var(--counter)]",
          )}
        >
          {kicker}
        </span>{" "}
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
   Wayfinding: the five movements of the week
   -------------------------------------------------------------------------- */

const SECTIONS = [
  "The Product",
  "Product Life Cycle",
  "New Product Development",
  "Branding and Packaging",
  "Services",
];

/**
 * The five movements as a strip. On each topic slide the current one is lit
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
        "grid w-full grid-cols-5 gap-2 sm:gap-3",
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

/** A topic slide: section strip, kicker heading, then the slide's content. */
function TopicSlide({
  id,
  section,
  kicker,
  title,
  children,
}: {
  id: string;
  section: number;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border className="!py-8" exercise={exercise[id]}>
      <SectionStrip active={section} className="mb-6" />
      <KickerHeading kicker={kicker}>{title}</KickerHeading>
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
      <P>{text}</P>
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

/** The four Ps, with Product lit: where this week sits in the mix. */
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
            i === 0
              ? "border-[var(--signal)] text-[var(--signal)]"
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

export default function Week7() {
  return (
    <SlideDeck
      label="Week 07"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 07 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[20ch]">
          Product and Service Strategies{" "}
          <span className="text-[var(--signal)]">(The First P)</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-10 w-full max-w-3xl space-y-4 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 7 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we focus on the first P of the marketing mix:{" "}
            <span className="text-[var(--signal)]">Product</span>.
          </p>
        </div>
        <MixStrip />

        <div className="mt-10 w-full max-w-3xl border-t border-[var(--rule)] pt-6">
          <p className="type-body mx-auto text-center">
            We will explore what makes a product successful from{" "}
            <strong className="font-semibold text-[var(--ink)]">
              inception
            </strong>{" "}
            to{" "}
            <strong className="font-semibold text-[var(--ink)]">decline</strong>
            .
          </p>
          <svg
            aria-hidden
            viewBox="0 0 600 90"
            className="mx-auto mt-5 block h-auto w-full max-w-xl"
          >
            <line x1="10" y1="80" x2="590" y2="80" stroke="var(--rule-2)" strokeWidth="1" />
            <path
              d="M10 80 C120 78 170 14 300 12 C430 10 500 60 590 76"
              fill="none"
              stroke="var(--signal)"
              strokeWidth="2.5"
            />
            <circle cx="10" cy="80" r="5" fill="var(--ink)" />
            <circle cx="590" cy="76" r="5" fill="var(--ink-3)" />
          </svg>
        </div>
      </Slide>

      {/* ================================================================
          The Product
          ================================================================ */}
      <TopicSlide
        id="defining-a-product"
        section={0}
        kicker="The Concept:"
        title="Defining a Product"
      >
        {/* The definition across the top, the seven kinds under it, and the
            closing statement beside its own small plate. */}
        <Lead className="!max-w-[62ch]">
          A product is <Term>anything</Term> that can be offered to a market
          for attention, acquisition, use, or consumption.
        </Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-10">
          <Ruled className="flex flex-col gap-4">
            <P className="!max-w-none">
              It includes physical objects, services, events, persons, places,
              organizations, and ideas.
            </P>
            <Plate className="!p-2">
              <OfferingKinds />
            </Plate>
          </Ruled>
          <Ruled tone="counter" className="flex flex-col gap-5">
            <Statement>
              Products solve problems and{" "}
              <Tint tone="counter">deliver value</Tint> to consumers.
            </Statement>
            <Plate className="!p-2">
              <ProblemValue />
            </Plate>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="consumer-goods"
        section={0}
        kicker="Product Classifications:"
        title="Consumer Goods"
      >
        {/* The umbrella sentence beside its plate, then the two kinds in
            columns, each sentence over its plate. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
          <Statement className="!max-w-[34ch]">
            <Tint tone="counter">Consumer goods</Tint> are bought by final
            consumers for personal consumption.
          </Statement>
          <Plate className="!p-2">
            <FinalConsumer />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <Row
            tone="signal"
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
            text={
              <>
                <Term>Convenience goods</Term> are purchased frequently with
                minimal comparison (e.g. toothpaste).
              </>
            }
            plate={<ConvenienceGood />}
          />
          <Row
            tone="counter"
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
            text={
              <>
                <Term tone="counter">Shopping goods</Term> require more planning
                and comparison on quality, price, and style (e.g. furniture).
              </>
            }
            plate={<ShoppingGood />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="specialty-and-unsought-goods"
        section={0}
        kicker="Product Classifications:"
        title="Specialty and Unsought Goods"
      >
        <div className="grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <Row
            tone="signal"
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]"
            text={
              <>
                <Term>Specialty goods</Term> have unique characteristics or brand
                identification requiring special purchase effort (e.g. luxury
                cars).
              </>
            }
            plate={<SpecialtyGood />}
          />
          <Row
            tone="ink"
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]"
            text={
              <>
                <Term tone="ink">Unsought goods</Term> are products consumers do
                not normally think of buying (e.g. life insurance).
              </>
            }
            plate={<UnsoughtGood />}
          />
        </div>
        <div className="mt-6 grid w-full items-center gap-8 border-t-2 border-[var(--signal)] pt-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <Statement>
            Each category requires a{" "}
            <Tint>distinct marketing and pricing strategy</Tint>.
          </Statement>
          <Plate className="!p-2">
            <FourCategories />
          </Plate>
        </div>
      </TopicSlide>

      {/* ================================================================
          Product Life Cycle
          ================================================================ */}
      <TopicSlide
        id="the-product-life-cycle"
        section={1}
        kicker="The Concept:"
        title="The Product Life Cycle"
      >
        {/* The definition beside the curve it defines; the stages and the
            caveat side by side underneath. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Lead className="!max-w-none">
            The <Term>Product Life Cycle (PLC)</Term> describes the course of a
            product&apos;s sales and profits over its lifetime.
          </Lead>
          <Plate className="!p-2">
            <PlcCurve />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                It consists of <Term>five distinct stages</Term>: development,
                introduction, growth, maturity, and decline.
              </>
            }
            plate={<PlcCascade />}
          />
          <Col
            tone="counter"
            text={
              <>
                Not all products follow this cycle strictly, but it provides a{" "}
                <Term tone="counter">useful framework</Term> for strategy.
              </>
            }
            plate={<NotStrict />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="introduction-and-growth"
        section={1}
        kicker="The PLC Stages:"
        title="Introduction and Growth"
      >
        {/* One ruled row per stage: what happens, then what the firm does. */}
        <div className="flex w-full flex-col gap-6">
          {[
            {
              stage: 1 as const,
              what: (
                <>
                  During <Term tone="ink">introduction</Term>, sales are slow
                  and profits are nonexistent due to heavy investment.
                </>
              ),
              tone: "counter" as const,
              goal: (
                <>
                  The marketing goal is to create{" "}
                  <Term tone="counter">product awareness and trial</Term>.
                </>
              ),
              plate: <AwarenessTrial />,
            },
            {
              stage: 2 as const,
              what: (
                <>
                  During <Term tone="ink">growth</Term>, the product achieves
                  rapid market acceptance and increasing profits.
                </>
              ),
              tone: "signal" as const,
              goal: (
                <>
                  The firm focuses on <Term>maximizing market share</Term> as
                  competition enters.
                </>
              ),
              plate: <ShareGrowth />,
            },
          ].map((r) => (
            <div
              key={r.stage}
              className="grid w-full items-start gap-6 lg:grid-cols-2 lg:gap-10"
            >
              <Row
                cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
                text={r.what}
                plate={<StageWindow stage={r.stage} />}
              />
              <Row
                tone={r.tone}
                cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
                text={r.goal}
                plate={r.plate}
              />
            </div>
          ))}
        </div>
      </TopicSlide>

      <TopicSlide
        id="maturity-and-decline"
        section={1}
        kicker="The PLC Stages:"
        title="Maturity and Decline"
      >
        {/* Three columns across, then the three routes out of decline. */}
        <div className="grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            text={
              <>
                <Term tone="ink">Maturity</Term> is a period of slowdown in
                sales growth because the product has achieved acceptance by
                most potential buyers.
              </>
            }
            plate={<StageWindow stage={3} />}
          />
          <Col
            tone="signal"
            text={
              <>
                Profits level off or decline due to{" "}
                <Term>increased marketing outlays</Term> to defend against
                competition.
              </>
            }
            plate={<DefendOutlays />}
          />
          <Col
            text={
              <>
                <Term tone="ink">Decline</Term> is the period when sales fall
                off and profits drop.
              </>
            }
            plate={<StageWindow stage={4} />}
          />
        </div>
        <div className="mt-6 grid w-full items-center gap-8 border-t-2 border-[var(--signal)] pt-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <Statement>
            Management may decide to <Tint tone="counter">maintain</Tint>,{" "}
            <Tint>harvest</Tint>, or drop the declining product.
          </Statement>
          <Plate className="!p-2">
            <MaintainHarvestDrop />
          </Plate>
        </div>
      </TopicSlide>

      <Slide id="discussion-managing-the-decline-stage" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter">
          Managing the Decline Stage
        </KickerHeading>
        {/* A text rail beside the dilemma, the prompt across the foot. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                A legacy software product has{" "}
                <Term tone="ink">steadily declining user numbers</Term>, but a
                core group of businesses still rely on it.
              </P>
            </Ruled>
            <Ruled tone="counter">
              <P>
                Shutting it down will{" "}
                <Term tone="counter">upset loyal clients</Term>, but keeping it
                running <Term tone="counter">costs engineering resources</Term>.
              </P>
            </Ruled>
          </div>
          <Plate className="!p-2">
            <LegacyDecision />
          </Plate>
        </div>
        <Prompt className="mt-6">
          <PromptKicker /> Do you <Tint>harvest the remaining profits</Tint> by
          cutting all support, or do you{" "}
          <Tint tone="counter">gracefully retire the product</Tint> and force
          migration to a new system?
        </Prompt>
      </Slide>

      {/* ================================================================
          New Product Development
          ================================================================ */}
      <TopicSlide
        id="new-product-development"
        section={2}
        kicker="The Challenge:"
        title="New Product Development"
      >
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <Statement>
            Companies must <Tint>continually innovate</Tint> to replace declining
            products.
          </Statement>
          <Plate className="!p-2">
            <SuccessiveCurves />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Col
            text={
              <>
                New products can be <Term tone="ink">original products</Term>,{" "}
                <Term tone="ink">improvements</Term>,{" "}
                <Term tone="ink">modifications</Term>, or{" "}
                <Term tone="ink">new brands</Term>.
              </>
            }
            plate={<NewProductKinds />}
          />
          <Col
            tone="signal"
            text={
              <>
                Innovation carries <Term>high risk</Term>, with many new
                products failing in the marketplace.
              </>
            }
            plate={<LaunchRisk />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="new-product-development-process"
        section={2}
        kicker="Strategy:"
        title="New Product Development Process"
      >
        {/* The eight steps as wayfinding, then the first four in columns. */}
        <Plate className="!p-2">
          <NpdStaircase active={[0, 1, 2, 3]} />
        </Plate>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                <Term>Idea generation and screening</Term> start the process by
                sourcing and filtering new concepts.
              </>
            }
            plate={<IdeaFunnel />}
          />
          <Col
            tone="counter"
            text={
              <>
                <Term tone="counter">Concept development and testing</Term>{" "}
                involve testing the idea with a group of target consumers.
              </>
            }
            plate={<ConceptTest />}
          />
          <Col
            tone="signal"
            text={
              <>
                <Term>Marketing strategy development</Term> outlines the
                initial marketing strategy for the new product.
              </>
            }
            plate={<StrategyOutline />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="from-business-analysis-to-commercialization"
        section={2}
        kicker="Strategy:"
        title="From Business Analysis to Commercialization"
      >
        <Plate className="!p-2">
          <NpdStaircase active={[4, 5, 6, 7]} />
        </Plate>
        {/* The last four steps as a two-by-two, each sentence beside its plate. */}
        <div className="mt-5 grid w-full gap-x-10 gap-y-4 lg:grid-cols-2">
          <Row
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]"
            text={
              <>
                <Term>Business analysis</Term> evaluates the business
                attractiveness of the proposal.
              </>
            }
            plate={<AttractivenessGauge />}
          />
          <Row
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]"
            text={
              <>
                <Term>Product development</Term> turns the concept into a
                physical and testable prototype.
              </>
            }
            plate={<SketchToPrototype />}
          />
          <Row
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]"
            text={
              <>
                <Term>Test marketing</Term> introduces the product and
                marketing program into realistic market settings.
              </>
            }
            plate={<TestMarketShelf />}
          />
          <Row
            tone="signal"
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]"
            text={
              <>
                <Term>Commercialization</Term> is the final step of introducing
                the new product into the market.
              </>
            }
            plate={<Launch />}
          />
        </div>
      </TopicSlide>

      {/* ================================================================
          Branding and Packaging
          ================================================================ */}
      <TopicSlide
        id="branding-strategy"
        section={3}
        kicker="The Concept:"
        title="Branding Strategy"
      >
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <Lead className="!max-w-none">
            A <Term>brand</Term> is a name, term, sign, symbol, or design that
            identifies the maker or seller of a product.
          </Lead>
          <Plate className="!p-2">
            <BrandElements />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Col
            tone="signal"
            text={
              <>
                It represents the consumer&apos;s{" "}
                <Term>perceptions and feelings</Term> about a product and its
                performance.
              </>
            }
            plate={<BrandPerceptions />}
          />
          <Col
            tone="signal"
            text={
              <>
                <Term>Brand equity</Term> is the differential effect that
                knowing the brand name has on customer response to the product
                or its marketing.
              </>
            }
            plate={<BrandEquity />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="building-strong-brands"
        section={3}
        kicker="Strategy:"
        title="Building Strong Brands"
      >
        {/* A ledger: three numbered decisions, each beside its plate. */}
        <div className="flex w-full flex-col gap-4">
          <Row
            tone="signal"
            lead
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            text={
              <>
                <Term>Brand positioning</Term> establishes the brand&apos;s
                mission and vision in the consumer&apos;s mind.
              </>
            }
            plate={<BrandFlag />}
          />
          <Row
            lead
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            text={
              <>
                <Term tone="ink">Brand name selection</Term> requires finding a
                name that suggests benefits, is easy to pronounce, and is
                distinctive.
              </>
            }
            plate={<NameChecklist />}
          />
          <Row
            tone="counter"
            lead
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            text={
              <>
                <Term tone="counter">Brand sponsorship</Term> options include
                manufacturer brands, private brands, licensed brands, or
                co-branding.
              </>
            }
            plate={<SponsorshipOptions />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="packaging-and-labeling"
        section={3}
        kicker="The Concept:"
        title="Packaging and Labeling"
      >
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
          <Statement className="!max-w-[34ch]">
            <Tint>Packaging</Tint> involves designing and producing the
            container or wrapper for a product.
          </Statement>
          <Plate className="!p-2">
            <ContainerWrapper />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Col
            text={
              <>
                It serves multiple functions: <Term tone="ink">protecting</Term>{" "}
                the product, <Term tone="ink">attracting attention</Term>, and{" "}
                <Term tone="ink">describing</Term> the product.
              </>
            }
            plate={<PackageFunctions />}
          />
          <Col
            tone="counter"
            text={
              <>
                <Term tone="counter">Labeling</Term> identifies the product,
                grades it, describes it, and promotes the product through
                attractive graphics.
              </>
            }
            plate={<LabelCallouts />}
          />
        </div>
      </TopicSlide>

      {/* ================================================================
          Services
          ================================================================ */}
      <TopicSlide
        id="the-nature-of-services"
        section={4}
        kicker="The Concept:"
        title="The Nature of Services"
      >
        {/* Three sentences, three columns, each over its plate. */}
        <div className="grid w-full items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <Col
            tone="counter"
            text={
              <>
                <Term tone="counter">Services</Term> are a form of product that
                consists of activities, benefits, or satisfactions offered for
                sale.
              </>
            }
            plate={<ServiceForms />}
          />
          <Col
            tone="signal"
            text={
              <>
                They are essentially <Term tone="counter">intangible</Term> and
                do not result in the <Term>ownership</Term> of anything.
              </>
            }
            plate={<NoOwnership />}
          />
          <Col
            tone="counter"
            text={
              <>
                The service economy is{" "}
                <Term tone="counter">growing rapidly</Term> and dominates
                modern markets.
              </>
            }
            plate={<ServiceEconomy />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="four-service-characteristics"
        section={4}
        kicker="The Challenge:"
        title="Four Service Characteristics"
      >
        {/* The hub in the middle, each sentence beside the node it names. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)_minmax(0,1fr)] lg:gap-8">
          <div className="flex min-w-0 flex-col gap-10 lg:order-1">
            <Ruled>
              <P>
                <Term>Intangibility</Term> means services cannot be seen,
                tasted, felt, heard, or smelled before purchase.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Variability</Term> means the quality of services depends
                on who provides them and when, where, and how.
              </P>
            </Ruled>
          </div>
          <Plate className="!p-2 lg:order-2">
            <ServiceHub />
          </Plate>
          <div className="flex min-w-0 flex-col gap-10 lg:order-3">
            <Ruled>
              <P>
                <Term>Inseparability</Term> means services cannot be separated
                from their providers.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Perishability</Term> means services cannot be stored for
                later sale or use.
              </P>
            </Ruled>
          </div>
        </div>
      </TopicSlide>

      <TopicSlide
        id="marketing-services"
        section={4}
        kicker="Strategy:"
        title="Marketing Services"
      >
        <div className="flex w-full flex-col gap-4">
          <Row
            tone="counter"
            lead
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            text={
              <>
                Service firms must manage the <Term>interaction</Term> between
                the customer and the frontline employee.
              </>
            }
            plate={<FrontlineInteraction />}
          />
          <Row
            tone="signal"
            lead
            cols="md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            text={
              <>
                <Term>Service profit chain</Term> links service firm profits
                with employee and customer satisfaction.
              </>
            }
            plate={<ProfitChain />}
          />
          <Row
            tone="counter"
            lead
            cols="md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            text={
              <>
                <Term tone="counter">Internal marketing</Term> means the firm
                must orient and motivate its customer-contact employees.
              </>
            }
            plate={<InternalMarketing />}
          />
        </div>
      </TopicSlide>

      <Slide
        id="discussion-overcoming-service-perishability"
        border
        className="!py-8"
      >
        <KickerHeading kicker="Discussion:" tone="counter">
          Overcoming Service Perishability
        </KickerHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <Lead className="!max-w-none">
            An airline has <Term>50 empty seats</Term> on a flight departing in
            24 hours. Once the plane takes off, the revenue opportunity for
            those seats is gone forever.
          </Lead>
          <Plate className="!p-2">
            <EmptySeats />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <Col
            tone="counter"
            text={
              <>
                Offering deep last-minute discounts might fill the seats but
                could <Term tone="counter">train customers to wait</Term> for
                cheap tickets in the future.
              </>
            }
            plate={<PricingBalance />}
          />
          <Prompt>
            <PromptKicker /> How should the airline balance the immediate need
            to capture <Tint>perishable revenue</Tint> against{" "}
            <Tint tone="counter">long-term brand pricing power</Tint>?
          </Prompt>
        </div>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border className="!py-8">
        <KickerHeading kicker="Conclusion:">
          Product and Service Strategies
        </KickerHeading>
        <ol className="grid w-full gap-x-12 gap-y-10 md:grid-cols-2">
          {[
            {
              glyph: <GlyphLifeCycle />,
              text: "The product is the foundation of the marketing mix and requires careful lifecycle management.",
            },
            {
              glyph: <GlyphStaircase />,
              text: "Continuous new product development is essential for long-term growth and survival.",
            },
            {
              glyph: <GlyphBrand />,
              text: "Strong branding and effective packaging create lasting consumer connections.",
            },
            {
              glyph: <GlyphServiceHub />,
              text: "Services require distinct strategies to manage their intangibility, inseparability, variability, and perishability.",
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
