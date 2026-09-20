"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import quizzesData from "./quizzes.json";
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
    <div className="gsap-reveal w-full mb-8 md:mb-12">
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
        "gsap-reveal grid w-full grid-cols-5 gap-2 sm:gap-3",
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
    <Slide id={id} border quizData={quiz[id]}>
      <SectionStrip active={section} className="mb-12 md:mb-16" />
      <KickerHeading kicker={kicker}>{title}</KickerHeading>
      {children}
    </Slide>
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

/** The four Ps, with Product lit: where this week sits in the mix. */
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
        <p className="gsap-reveal type-caption mt-2">Davood Wadi, PhD</p>

        <div className="gsap-reveal mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 7 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we focus on the first P of the marketing mix:{" "}
            <span className="text-[var(--signal)]">Product</span>.
          </p>
        </div>
        <MixStrip />

        <div className="gsap-reveal mt-14 w-full max-w-3xl border-t border-[var(--rule)] pt-8">
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
            className="mx-auto mt-6 block h-auto w-full max-w-xl"
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
        <Lead className="!max-w-[56ch]">
          A product is <Term>anything</Term> that can be offered to a market
          for attention, acquisition, use, or consumption.
        </Lead>
        <P className="mt-4">
          It includes physical objects, services, events, persons, places,
          organizations, and ideas.
        </P>
        <Figure height="auto">
          <OfferingKinds />
        </Figure>
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Plate>
            <ProblemValue />
          </Plate>
          <Ruled tone="counter">
            <Statement>
              Products <Tint tone="counter">solve problems</Tint> and{" "}
              <Tint>deliver value</Tint> to consumers.
            </Statement>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="consumer-goods"
        section={0}
        kicker="Product Classifications:"
        title="Consumer Goods"
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Ruled>
            <Big>
              <Tint tone="counter">Consumer goods</Tint> are bought by final
              consumers for personal consumption.
            </Big>
          </Ruled>
          <Plate>
            <FinalConsumer />
          </Plate>
        </div>
        <div className="mt-16 grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Convenience goods</Term> are purchased frequently with
                minimal comparison (e.g. toothpaste).
              </>
            }
            plate={<ConvenienceGood />}
          />
          <PlateColumn
            tone="counter"
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
        <div className="grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Specialty goods</Term> have unique characteristics or brand
                identification requiring special purchase effort (e.g. luxury
                cars).
              </>
            }
            plate={<SpecialtyGood />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Unsought goods</Term> are products consumers do
                not normally think of buying (e.g. life insurance).
              </>
            }
            plate={<UnsoughtGood />}
          />
        </div>
        <Statement className="mt-16 !max-w-[36ch]">
          Each category requires a{" "}
          <Tint>distinct marketing and pricing strategy</Tint>.
        </Statement>
        <Figure height="auto">
          <FourCategories />
        </Figure>
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
        <Lead className="!max-w-[58ch]">
          The <Term>Product Life Cycle (PLC)</Term> describes the course of a
          product&apos;s sales and profits over its lifetime.
        </Lead>
        <Figure height="auto">
          <PlcCurve />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[44ch]">
            It consists of <Tint>five distinct stages</Tint>: development,
            introduction, growth, maturity, and decline.
          </Big>
        </Ruled>
        <Figure height="auto">
          <PlcCascade />
        </Figure>
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Plate>
            <NotStrict />
          </Plate>
          <Ruled>
            <Big>
              Not all products follow this cycle strictly, but it provides a{" "}
              <Tint tone="counter">useful framework</Tint> for strategy.
            </Big>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="introduction-and-growth"
        section={1}
        kicker="The PLC Stages:"
        title="Introduction and Growth"
      >
        <div className="grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="flex min-w-0 flex-col gap-8">
            <PlateColumn
              tone="ink"
              text={
                <>
                  During <Term tone="ink">introduction</Term>, sales are slow
                  and profits are nonexistent due to heavy investment.
                </>
              }
              plate={<StageWindow stage={1} />}
            />
            <PlateColumn
              tone="counter"
              text={
                <>
                  The marketing goal is to create{" "}
                  <Term tone="counter">product awareness and trial</Term>.
                </>
              }
              plate={<AwarenessTrial />}
            />
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            <PlateColumn
              tone="ink"
              text={
                <>
                  During <Term tone="ink">growth</Term>, the product achieves
                  rapid market acceptance and increasing profits.
                </>
              }
              plate={<StageWindow stage={2} />}
            />
            <PlateColumn
              tone="signal"
              text={
                <>
                  The firm focuses on <Term>maximizing market share</Term> as
                  competition enters.
                </>
              }
              plate={<ShareGrowth />}
            />
          </div>
        </div>
      </TopicSlide>

      <TopicSlide
        id="maturity-and-decline"
        section={1}
        kicker="The PLC Stages:"
        title="Maturity and Decline"
      >
        <div className="grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="flex min-w-0 flex-col gap-8">
            <PlateColumn
              tone="ink"
              text={
                <>
                  <Term tone="ink">Maturity</Term> is a period of slowdown in
                  sales growth because the product has achieved acceptance by
                  most potential buyers.
                </>
              }
              plate={<StageWindow stage={3} />}
            />
            <PlateColumn
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
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            <PlateColumn
              tone="ink"
              text={
                <>
                  <Term tone="ink">Decline</Term> is the period when sales fall
                  off and profits drop.
                </>
              }
              plate={<StageWindow stage={4} />}
            />
            <Ruled tone="signal" className="mt-4">
              <Statement className="!max-w-[26ch]">
                Management may decide to <Tint tone="counter">maintain</Tint>,{" "}
                <Tint>harvest</Tint>, or drop the declining product.
              </Statement>
            </Ruled>
          </div>
        </div>
        <Figure height="auto">
          <MaintainHarvestDrop />
        </Figure>
      </TopicSlide>

      <Slide id="discussion-managing-the-decline-stage" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Managing the Decline Stage
        </KickerHeading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              A legacy software product has{" "}
              <Term tone="ink">steadily declining user numbers</Term>, but a
              core group of businesses still rely on it.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Shutting it down will <Term tone="counter">upset loyal clients</Term>
              , but keeping it running{" "}
              <Term tone="counter">costs engineering resources</Term>.
            </P>
          </Ruled>
        </div>
        <Figure height="auto">
          <LegacyDecision />
        </Figure>
        <Prompt>
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
        <Statement className="!max-w-[34ch]">
          Companies must <Tint>continually innovate</Tint> to replace declining
          products.
        </Statement>
        <Figure height="auto">
          <SuccessiveCurves />
        </Figure>
        <Ruled className="w-full">
          <P className="!max-w-[72ch]">
            New products can be <Term tone="ink">original products</Term>,{" "}
            <Term tone="ink">improvements</Term>,{" "}
            <Term tone="ink">modifications</Term>, or{" "}
            <Term tone="ink">new brands</Term>.
          </P>
        </Ruled>
        <Figure height="auto">
          <NewProductKinds />
        </Figure>
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Plate>
            <LaunchRisk />
          </Plate>
          <Ruled tone="signal">
            <Big>
              Innovation carries <Tint>high risk</Tint>, with many new products
              failing in the marketplace.
            </Big>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="new-product-development-process"
        section={2}
        kicker="Strategy:"
        title="New Product Development Process"
      >
        <Figure height="auto" className="!mt-0">
          <NpdStaircase active={[0, 1, 2, 3]} />
        </Figure>
        <div className="w-full">
          <PlateRow plate={<IdeaFunnel />} tone="signal">
            <Tint>Idea generation and screening</Tint> start the process by
            sourcing and filtering new concepts.
          </PlateRow>
          <PlateRow plate={<ConceptTest />} tone="counter">
            <Tint tone="counter">Concept development and testing</Tint> involve
            testing the idea with a group of target consumers.
          </PlateRow>
          <PlateRow plate={<StrategyOutline />} tone="ink">
            <Tint>Marketing strategy development</Tint> outlines the initial
            marketing strategy for the new product.
          </PlateRow>
        </div>
      </TopicSlide>

      <TopicSlide
        id="from-business-analysis-to-commercialization"
        section={2}
        kicker="Strategy:"
        title="From Business Analysis to Commercialization"
      >
        <Figure height="auto" className="!mt-0">
          <NpdStaircase active={[4, 5, 6, 7]} />
        </Figure>
        <div className="w-full">
          <PlateRow plate={<AttractivenessGauge />} tone="ink">
            <Tint>Business analysis</Tint> evaluates the business
            attractiveness of the proposal.
          </PlateRow>
          <PlateRow plate={<SketchToPrototype />} tone="ink">
            <Tint>Product development</Tint> turns the concept into a physical
            and testable prototype.
          </PlateRow>
          <PlateRow plate={<TestMarketShelf />} tone="ink">
            <Tint>Test marketing</Tint> introduces the product and marketing
            program into realistic market settings.
          </PlateRow>
          <PlateRow plate={<Launch />} tone="signal">
            <Tint>Commercialization</Tint> is the final step of introducing the
            new product into the market.
          </PlateRow>
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
        <Lead className="!max-w-[58ch]">
          A <Term>brand</Term> is a name, term, sign, symbol, or design that
          identifies the maker or seller of a product.
        </Lead>
        <Figure height="auto">
          <BrandElements />
        </Figure>
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Plate>
            <BrandPerceptions />
          </Plate>
          <Ruled tone="signal">
            <Big>
              It represents the consumer&apos;s{" "}
              <Tint>perceptions and feelings</Tint> about a product and its
              performance.
            </Big>
          </Ruled>
        </div>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[46ch]">
            <Tint>Brand equity</Tint> is the differential effect that knowing
            the brand name has on customer response to the product or its
            marketing.
          </Big>
        </Ruled>
        <Figure height="auto">
          <BrandEquity />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="building-strong-brands"
        section={3}
        kicker="Strategy:"
        title="Building Strong Brands"
      >
        <div className="w-full">
          <PlateRow plate={<BrandFlag />} tone="signal">
            <Tint>Brand positioning</Tint> establishes the brand&apos;s mission
            and vision in the consumer&apos;s mind.
          </PlateRow>
          <PlateRow plate={<NameChecklist />} tone="ink">
            <Tint>Brand name selection</Tint> requires finding a name that
            suggests benefits, is easy to pronounce, and is distinctive.
          </PlateRow>
          <PlateRow plate={<SponsorshipOptions />} tone="counter">
            <Tint tone="counter">Brand sponsorship</Tint> options include
            manufacturer brands, private brands, licensed brands, or
            co-branding.
          </PlateRow>
        </div>
      </TopicSlide>

      <TopicSlide
        id="packaging-and-labeling"
        section={3}
        kicker="The Concept:"
        title="Packaging and Labeling"
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Ruled tone="signal">
            <Big>
              <Tint>Packaging</Tint> involves designing and producing the
              container or wrapper for a product.
            </Big>
          </Ruled>
          <Plate>
            <ContainerWrapper />
          </Plate>
        </div>
        <Ruled className="mt-16 w-full">
          <P className="!max-w-[72ch]">
            It serves multiple functions: <Term tone="ink">protecting</Term> the
            product, <Term tone="ink">attracting attention</Term>, and{" "}
            <Term tone="ink">describing</Term> the product.
          </P>
        </Ruled>
        <Figure height="auto">
          <PackageFunctions />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <P className="!max-w-[72ch]">
            <Term tone="counter">Labeling</Term> identifies the product, grades
            it, describes it, and promotes the product through attractive
            graphics.
          </P>
        </Ruled>
        <Figure height="auto">
          <LabelCallouts />
        </Figure>
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
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Lead className="!max-w-[40ch]">
            <Term tone="counter">Services</Term> are a form of product that
            consists of activities, benefits, or satisfactions offered for sale.
          </Lead>
          <Plate>
            <ServiceForms />
          </Plate>
        </div>
        <Statement className="mt-16 !max-w-[36ch]">
          They are essentially <Tint tone="counter">intangible</Tint> and do not
          result in the <Tint>ownership</Tint> of anything.
        </Statement>
        <Figure height="auto">
          <NoOwnership />
        </Figure>
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Plate>
            <ServiceEconomy />
          </Plate>
          <Ruled tone="counter">
            <Big>
              The service economy is <Tint tone="counter">growing rapidly</Tint>{" "}
              and dominates modern markets.
            </Big>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="four-service-characteristics"
        section={4}
        kicker="The Challenge:"
        title="Four Service Characteristics"
      >
        <Figure height="auto" className="!mt-0">
          <ServiceHub />
        </Figure>
        <div className="grid w-full gap-x-14 gap-y-10 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Intangibility</Term> means services cannot be seen, tasted,
              felt, heard, or smelled before purchase.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Inseparability</Term> means services cannot be separated
              from their providers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Variability</Term> means the quality of services depends on
              who provides them and when, where, and how.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Perishability</Term> means services cannot be stored for
              later sale or use.
            </P>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="marketing-services"
        section={4}
        kicker="Strategy:"
        title="Marketing Services"
      >
        <PlateRow plate={<FrontlineInteraction />} tone="counter">
          Service firms must manage the{" "}
          <Tint>interaction</Tint> between the customer and the frontline
          employee.
        </PlateRow>
        <Ruled tone="signal" className="mt-8 w-full">
          <Big className="max-w-[44ch]">
            <Tint>Service profit chain</Tint> links service firm profits with
            employee and customer satisfaction.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ProfitChain />
        </Figure>
        <PlateRow plate={<InternalMarketing />} tone="counter">
          <Tint tone="counter">Internal marketing</Tint> means the firm must
          orient and motivate its customer-contact employees.
        </PlateRow>
      </TopicSlide>

      <Slide id="discussion-overcoming-service-perishability" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Overcoming Service Perishability
        </KickerHeading>
        <Lead className="!max-w-[60ch]">
          An airline has <Term>50 empty seats</Term> on a flight departing in 24
          hours. Once the plane takes off, the revenue opportunity for those
          seats is gone forever.
        </Lead>
        <Figure height="auto">
          <EmptySeats />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <P className="!max-w-[70ch]">
            Offering deep last-minute discounts might fill the seats but could{" "}
            <Term tone="counter">train customers to wait</Term> for cheap
            tickets in the future.
          </P>
        </Ruled>
        <Figure height="auto">
          <PricingBalance />
        </Figure>
        <Prompt>
          <PromptKicker /> How should the airline balance the immediate need to
          capture <Tint>perishable revenue</Tint> against{" "}
          <Tint tone="counter">long-term brand pricing power</Tint>?
        </Prompt>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <KickerHeading kicker="Conclusion:">
          Product and Service Strategies
        </KickerHeading>
        <ol className="grid w-full gap-x-12 gap-y-12 md:grid-cols-2">
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
