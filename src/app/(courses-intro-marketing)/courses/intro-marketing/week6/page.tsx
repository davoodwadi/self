"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import { Plate } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  MarketDivided,
  GlyphMeasurable,
  GlyphAccessible,
  GlyphSubstantial,
  GlyphDifferentiable,
  GlyphActionable,
  GeographicZoom,
  DemographicCard,
  PsychographicTwins,
  LifestyleProducts,
  BehavioralVariables,
  BenefitMapping,
  BusinessTowers,
  ShoeOverlap,
  EvaluateSelect,
  ThreeFactors,
  CrowdedSegment,
  SkillsFit,
  TargetUndifferentiated,
  TargetDifferentiated,
  TargetConcentrated,
  TargetMicro,
  ProteinFork,
  OfferingAndMind,
  PerceptualMap,
  DifferenceSieve,
  ValueGrid,
  FourPsColonnade,
  EstablishMaintain,
  PhonesInMind,
  GlyphSegment,
  GlyphTarget,
  GlyphMind,
} from "./visuals";

// ============================================================================
// WEEK 06 — SEGMENTATION, TARGETING, AND POSITIONING (STP)
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

/** A sentence at h2 size. */
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
  tone?: "signal" | "counter" | "ink";
  children: React.ReactNode;
  className?: string;
}) {
  const border = {
    signal: "border-[var(--signal)]",
    counter: "border-[var(--counter)]",
    ink: "border-[var(--ink)]",
  }[tone];
  return (
    <div className={cn("min-w-0 border-t-2 pt-5", border, className)}>
      {children}
    </div>
  );
}

/**
 * A heading with a "Label:" prefix ("Discussion:", "Conclusion:"). The prefix
 * is set as a small tracked kicker inside the same h2, so the heading text
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

/** The outlined numeral that marks a part. */
function PartNumeral({ n, className = "" }: { n: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)]",
        className,
      )}
      style={{ ...SERIF, fontVariationSettings: '"opsz" 144, "WONK" 1' }}
    >
      {String(n).padStart(2, "0")}
    </div>
  );
}

/** The part heading, "Part N:" kept as a kicker inside the h2. */
function PartTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="type-display !text-[clamp(2.2rem,4.2vw,3.5rem)] max-w-[26ch]">
      <span className="type-label block mb-3 !text-[0.8rem]">{`Part ${n}:`}</span>{" "}
      {title}
    </h2>
  );
}

/** Numeral and part heading on one line, ruled underneath. */
function PartHead({ n, title }: { n: number; title: string }) {
  return (
    <>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:gap-8 xl:gap-12">
        <PartNumeral n={n} className="text-[4rem] sm:text-[5rem] xl:text-[6.5rem]" />
        <div className="min-w-0">
          <PartTitle n={n} title={title} />
        </div>
      </div>
      <div className="mt-6 h-px w-full bg-[var(--rule)]" />
    </>
  );
}

/** Discussion prompt. "Discussion:" stays in the sentence as a kicker. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-7 md:px-12 md:py-9">
      <p className="type-quote !text-[clamp(1.4rem,2.4vw,2rem)] max-w-[46ch]">
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
   STP wayfinding
   -------------------------------------------------------------------------- */

const PARTS = [
  { letter: "S", name: "Market Segmentation" },
  { letter: "T", name: "Market Targeting" },
  { letter: "P", name: "Differentiation and Positioning" },
];

/**
 * The three parts as a strip. On each topic slide the current part is lit and
 * the parts behind it are inked, so students always know where they are in
 * the STP process.
 */
function PartStrip({
  active,
  className = "",
}: {
  active: number;
  className?: string;
}) {
  return (
    <ol
      aria-hidden
      className={cn("grid w-full grid-cols-3 gap-2 sm:gap-3", className)}
    >
      {PARTS.map((p, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <li
            key={p.name}
            className={cn(
              "flex min-w-0 items-baseline gap-2.5 border-t-2 pt-3",
              on
                ? "border-[var(--signal)]"
                : done
                  ? "border-[var(--ink)]"
                  : "border-[var(--rule)]",
            )}
          >
            <span
              className={cn(
                "text-[1.35rem] leading-none",
                on ? "text-[var(--signal)]" : "text-[var(--ink-3)]",
              )}
              style={SERIF}
            >
              {p.letter}
            </span>
            <span
              className={cn(
                "hidden sm:block text-[0.8rem] leading-snug",
                on ? "font-semibold text-[var(--ink)]" : "text-[var(--ink-3)]",
              )}
            >
              {p.name}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** A topic slide: part strip, heading, then the slide's own content. */
function TopicSlide({
  id,
  part,
  title,
  children,
}: {
  id: string;
  part: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border className="!py-8" exercise={exercise[id]}>
      <PartStrip active={part} className="mb-6" />
      <Heading className="md:!mb-6">{title}</Heading>
      {children}
    </Slide>
  );
}

export default function Week6() {
  return (
    <SlideDeck
      label="Week 06"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 06 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[20ch]">
          <span className="text-[var(--counter)]">Segmentation</span>,{" "}
          <span className="text-[var(--ink)]">Targeting</span>, and{" "}
          <span className="text-[var(--signal)]">Positioning</span> (STP)
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 6 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we will explore Segmentation, Targeting, and Positioning
            (STP).
          </p>
        </div>

        <p className="type-body mt-14 max-w-3xl border-t border-[var(--rule)] pt-8 text-center sm:[&_a]:whitespace-nowrap">
          We will cover the{" "}
          <a href="#part-1" data-n="01" className="toc-link">
            bases for segmenting markets
          </a>
          ,{" "}
          <a href="#part-2" data-n="02" className="toc-link">
            evaluating and selecting target markets
          </a>
          , and{" "}
          <a href="#part-3" data-n="03" className="toc-link">
            developing a compelling positioning strategy
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
          .toc-link::before {
            content: attr(data-n);
            font-family: var(--font-label);
            font-weight: 600;
            letter-spacing: 0.12em;
            color: var(--signal);
            font-variant-numeric: tabular-nums;
            font-size: 0.62em;
            vertical-align: 0.55em;
            margin-right: 0.3em;
          }
          .toc-link:hover { color: var(--signal); }
        `}</style>
      </Slide>

      {/* ================================================================
          Part 1 — Market Segmentation
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Market Segmentation" />
        {/* A text rail beside the crowd the sentences divide. */}
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead className="!max-w-none">
              Market segmentation involves <Term>dividing a market</Term> into
              distinct groups of buyers who have different needs,
              characteristics, or behaviors.
            </Lead>
            <Ruled tone="signal">
              <P>
                These distinct groups might require{" "}
                <Tint>separate products or marketing programs</Tint>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <MarketDivided />
          </Plate>
        </div>

        <div className="mt-10 w-full">
          <p className="type-lead !text-[var(--ink)]">
            The goal is to identify segments that are
          </p>
          <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { glyph: <GlyphMeasurable />, word: " measurable," },
              { glyph: <GlyphAccessible />, word: " accessible," },
              { glyph: <GlyphSubstantial />, word: " substantial," },
              { glyph: <GlyphDifferentiable />, word: " differentiable," },
              { glyph: <GlyphActionable />, word: " and actionable." },
            ].map((c, i) => (
              <li
                key={c.word}
                className="flex min-w-0 flex-col gap-3 border-t-2 border-[var(--ink)] pt-3"
              >
                <div aria-hidden className="flex items-start justify-between">
                  <span
                    data-n={String(i + 1).padStart(2, "0")}
                    className="step-n text-[1.6rem] leading-none text-[var(--signal)]"
                    style={SERIF}
                  />
                  {c.glyph}
                </div>
                <span
                  className="text-[clamp(1.15rem,1.55vw,1.5rem)] leading-snug text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {c.word}
                </span>
              </li>
            ))}
          </ol>
          <style>{`.step-n::before { content: attr(data-n); }`}</style>
        </div>
      </Slide>

      <TopicSlide
        id="geographic-and-demographic-segmentation"
        part={0}
        title="Geographic and Demographic Segmentation"
      >
        <div className="grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="ink">
              <P>
                <Term tone="ink">Geographic segmentation</Term> divides the
                market into different geographical units, such as nations,
                states, regions, counties, cities, or even neighborhoods.
              </P>
            </Ruled>
            <Plate className="!p-2">
              <GeographicZoom />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="counter">
              <P>
                <Term tone="counter">Demographic segmentation</Term> divides
                the market into segments based on variables such as age,
                life-cycle stage, gender, income, occupation, education,
                religion, ethnicity, and generation.
              </P>
            </Ruled>
            <Plate className="!p-2">
              <DemographicCard />
            </Plate>
          </div>
        </div>
        <Statement className="mt-6 !max-w-none !text-[clamp(1.5rem,2.3vw,2rem)]">
          Demographic variables are the <Tint>most popular</Tint> bases for
          segmenting customer groups because they are{" "}
          <Tint>easier to measure</Tint>.
        </Statement>
      </TopicSlide>

      <TopicSlide
        id="psychographic-segmentation"
        part={0}
        title="Psychographic Segmentation"
      >
        {/* The two sentences beside the twins they describe. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead className="!max-w-none">
              <Term>Psychographic segmentation</Term> divides buyers into
              different segments based on lifestyle or personality
              characteristics.
            </Lead>
            <Ruled tone="signal">
              <Big>
                People in the <Tint tone="counter">same demographic group</Tint>{" "}
                can have <Tint>very different psychographic characteristics</Tint>.
              </Big>
            </Ruled>
          </div>
          <Plate className="!p-2">
            <PsychographicTwins />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 border-t-2 border-[var(--ink)] pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.5rem,2.3vw,2rem)]">
            Marketers often use personality variables to segment markets,
            offering products that <Tint>align with consumer lifestyles</Tint>.
          </Statement>
          <Plate className="!p-2">
            <LifestyleProducts />
          </Plate>
        </div>
      </TopicSlide>

      <TopicSlide
        id="behavioral-segmentation"
        part={0}
        title="Behavioral Segmentation"
      >
        <div className="grid w-full gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12">
          <Lead className="!max-w-none">
            <Term>Behavioral segmentation</Term> divides buyers into segments
            based on their knowledge, attitudes, uses, or responses to a
            product.
          </Lead>
          <Ruled>
            <P>
              Variables include <Term tone="ink">occasions</Term>,{" "}
              <Term tone="ink">benefits sought</Term>,{" "}
              <Term tone="ink">user status</Term>,{" "}
              <Term tone="ink">usage rate</Term>, and{" "}
              <Term tone="ink">loyalty status</Term>.
            </P>
          </Ruled>
        </div>
        <Figure height="auto" dense className="mx-auto !my-3 max-w-[760px]">
          <BehavioralVariables />
        </Figure>
        {/* Benefit segmentation beside the three-column map it needs. */}
        <div className="grid w-full items-center gap-8 border-t-2 border-[var(--signal)] pt-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <P className="!max-w-none">
            <Term>Benefit segmentation</Term> requires finding the major
            benefits people look for in a product class, the kinds of people
            who look for each benefit, and the major brands that deliver each
            benefit.
          </P>
          <Plate className="!p-2">
            <BenefitMapping />
          </Plate>
        </div>
      </TopicSlide>

      <TopicSlide
        id="segmenting-business-markets"
        part={0}
        title="Segmenting Business Markets"
      >
        <Statement className="!max-w-[44ch]">
          Consumer and business marketers use{" "}
          <Tint tone="counter">many of the same variables</Tint> to segment
          their markets.
        </Statement>
        {/* The two sentences beside the towers they stack. */}
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                Business buyers can be segmented geographically,
                demographically, or by benefits sought, user status, usage
                rate, and loyalty status.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <P>
                However, business marketers also use{" "}
                <Tint>additional variables</Tint>, such as customer operating
                characteristics, purchasing approaches, situational factors,
                and personal characteristics.
              </P>
            </Ruled>
          </div>
          <Plate className="!p-2">
            <BusinessTowers />
          </Plate>
        </div>
      </TopicSlide>

      <Slide id="discussion-segmentation-variables" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter" className="md:!mb-6">
          Segmentation Variables
        </KickerHeading>
        <Prompt>
          <PromptKicker /> Think of a brand of athletic shoes. How might they
          use a <Tint>combination</Tint> of demographic, psychographic, and
          behavioral segmentation to target a{" "}
          <Tint tone="counter">specific consumer group</Tint>?
        </Prompt>
        <Figure height="auto" dense className="!mt-5 !mb-0 max-w-[780px]">
          <ShoeOverlap />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 2 — Market Targeting
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Market Targeting" />
        <Lead className="mt-6 !max-w-[64ch]">
          Market targeting involves <Term>evaluating</Term> each market
          segment&apos;s attractiveness and <Term>selecting</Term> one or more
          segments to enter.
        </Lead>
        <Figure height="auto" dense className="mx-auto !my-4 max-w-[880px]">
          <EvaluateSelect />
        </Figure>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <P>
              A company should target segments in which it can profitably
              generate the <Term>greatest customer value</Term> and{" "}
              <Term>sustain it over time</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term tone="ink">target market</Term> consists of a set of
              buyers who share common needs or characteristics that the
              company decides to serve.
            </P>
          </Ruled>
        </div>
      </Slide>

      <TopicSlide
        id="evaluating-market-segments"
        part={1}
        title="Evaluating Market Segments"
      >
        <Lead className="!max-w-[68ch]">
          In evaluating different market segments, a firm must look at{" "}
          <Term>three factors</Term>: segment size and growth, segment
          structural attractiveness, and company objectives and resources.
        </Lead>
        <Figure height="auto" dense className="mx-auto !my-3 max-w-[680px]">
          <ThreeFactors />
        </Figure>
        {/* The last two sentences in columns, each over its own plate. */}
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          {[
            {
              tone: "signal" as const,
              plate: <CrowdedSegment />,
              text: (
                <>
                  A segment is <Term>less attractive</Term> if it already
                  contains many strong and aggressive competitors or if it is
                  easy for new entrants to come into the segment.
                </>
              ),
            },
            {
              tone: "counter" as const,
              plate: <SkillsFit />,
              text: (
                <>
                  The company must also consider whether it has the{" "}
                  <Term tone="counter">skills and resources</Term> needed to
                  succeed in that segment.
                </>
              ),
            },
          ].map((col) => (
            <Ruled key={col.tone} tone={col.tone} className="flex flex-col gap-4 !pt-4">
              <P>{col.text}</P>
              <Plate className="!p-2 max-w-[440px]">{col.plate}</Plate>
            </Ruled>
          ))}
        </div>
      </TopicSlide>

      <TopicSlide
        id="selecting-target-market-segments"
        part={1}
        title="Selecting Target Market Segments"
      >
        {/* A 2 × 2 of the four strategies, each sentence beside its panel. */}
        <div className="grid w-full gap-x-12 gap-y-6 lg:grid-cols-2">
          {[
            {
              plate: <TargetUndifferentiated />,
              tone: "ink" as const,
              text: (
                <>
                  <Term tone="ink">Undifferentiated (mass) marketing</Term>{" "}
                  focuses on what is common in the needs of consumers rather
                  than on what is different.
                </>
              ),
            },
            {
              plate: <TargetDifferentiated />,
              tone: "counter" as const,
              text: (
                <>
                  <Term tone="counter">Differentiated (segmented) marketing</Term>{" "}
                  targets several market segments and designs separate offers
                  for each.
                </>
              ),
            },
            {
              plate: <TargetConcentrated />,
              tone: "signal" as const,
              text: (
                <>
                  <Term>Concentrated (niche) marketing</Term> focuses on
                  acquiring a large share of one or a few smaller segments or
                  niches.
                </>
              ),
            },
            {
              plate: <TargetMicro />,
              tone: "signal" as const,
              text: (
                <>
                  <Term>Micromarketing</Term> is the practice of tailoring
                  products and marketing programs to suit the tastes of
                  specific individuals and local customer segments.
                </>
              ),
            },
          ].map((col, i) => (
            <Ruled
              key={i}
              tone={col.tone}
              className="grid items-center gap-5 !pt-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]"
            >
              <P>{col.text}</P>
              <Plate className="!p-2">{col.plate}</Plate>
            </Ruled>
          ))}
        </div>
      </TopicSlide>

      <Slide id="discussion-targeting-strategy" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter" className="md:!mb-6">
          Targeting Strategy
        </KickerHeading>
        <Prompt>
          <PromptKicker /> A startup creates a new line of premium, organic,
          plant-based protein powder. Should they use{" "}
          <Tint tone="counter">differentiated marketing</Tint> or{" "}
          <Tint>concentrated marketing</Tint>? Why?
        </Prompt>
        <Figure height="auto" dense className="!mt-6 max-w-5xl">
          <ProteinFork />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 3 — Differentiation and Positioning
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Differentiation and Positioning" />
        <Lead className="mt-6 !max-w-[64ch]">
          Beyond deciding which segments to target, the company must decide on
          a <Term>value proposition</Term>.
        </Lead>
        {/* Each sentence stands over its half of the plate. */}
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              <Term tone="ink">Differentiation</Term> involves actually
              differentiating the firm&apos;s market offering to create
              superior customer value.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term>Positioning</Term> consists of arranging for a market
              offering to occupy a clear, distinctive, and desirable place
              relative to competing products in the minds of target
              consumers.
            </P>
          </Ruled>
        </div>
        <Figure height="auto" dense className="mx-auto !my-4 max-w-[900px]">
          <OfferingAndMind />
        </Figure>
      </Slide>

      <TopicSlide id="positioning-maps" part={2} title="Positioning Maps">
        {/* The three sentences as a rail beside the map they describe. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead className="!max-w-none">
              In planning their differentiation and positioning strategies,
              marketers often prepare <Term>perceptual positioning maps</Term>.
            </Lead>
            <Ruled>
              <P>
                These maps show consumer perceptions of their brands versus
                competing products on important buying dimensions.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <Big>
                The <Tint>position</Tint> of each circle on the map indicates
                the brand&apos;s perceived positioning, and the{" "}
                <Tint>size</Tint> of the circle may indicate the brand&apos;s
                relative market share.
              </Big>
            </Ruled>
          </div>
          <Plate className="!p-2">
            <PerceptualMap />
          </Plate>
        </div>
      </TopicSlide>

      <TopicSlide
        id="choosing-a-differentiation-and-positioning-strategy"
        part={2}
        title="Choosing a Differentiation and Positioning Strategy"
      >
        <div className="w-full">
          <p className="type-lead !text-[var(--ink)]">
            The differentiation and positioning task consists of three steps:
          </p>
          <ol className="mt-4 grid gap-5 md:grid-cols-3 md:gap-8">
            {[
              " identifying a set of differentiating competitive advantages,",
              " choosing the right competitive advantages,",
              " and selecting an overall positioning strategy.",
            ].map((step, i) => (
              <li
                key={i}
                className={cn(
                  "flex min-w-0 items-baseline gap-4 border-t-2 pt-3",
                  i === 2 ? "border-[var(--signal)]" : "border-[var(--ink)]",
                )}
              >
                <span
                  aria-hidden
                  data-n={String(i + 1).padStart(2, "0")}
                  className={cn(
                    "step-n text-[1.8rem] leading-none",
                    i === 2 ? "text-[var(--signal)]" : "text-[var(--ink-3)]",
                  )}
                  style={SERIF}
                />
                <span
                  className="text-[clamp(1.1rem,1.5vw,1.35rem)] leading-snug text-[var(--ink)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <style>{`.step-n::before { content: attr(data-n); }`}</style>
        </div>

        {/* The two remaining sentences beside the sieve the last one names. */}
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="!max-w-none !text-[clamp(1.3rem,1.8vw,1.6rem)]">
              To build profitable relationships with target customers,
              marketers must <Tint>understand customer needs better</Tint> than
              competitors do and <Tint>deliver more customer value</Tint>.
            </Statement>
            <Ruled tone="signal">
              <P>
                Differences should be <Term>promoted</Term> if they are
                important, distinctive, superior, communicable, preemptive,
                affordable, and profitable.
              </P>
            </Ruled>
          </div>
          <Plate className="!p-2">
            <DifferenceSieve />
          </Plate>
        </div>
      </TopicSlide>

      <TopicSlide
        id="developing-a-value-proposition"
        part={2}
        title="Developing a Value Proposition"
      >
        {/* The definition as a rail beside the grid of propositions. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead className="!max-w-none">
              The full positioning of a brand is called the brand&apos;s{" "}
              <Term>value proposition</Term>.
            </Lead>
            <Ruled tone="counter">
              <Big>
                It is the <Tint tone="counter">full mix of benefits</Tint> on
                which a brand is differentiated and positioned.
              </Big>
            </Ruled>
            <Ruled tone="signal">
              <P>
                Possible value propositions include{" "}
                <Term>&quot;More for More,&quot;</Term>{" "}
                <Term>&quot;More for the Same,&quot;</Term>{" "}
                <Term>&quot;The Same for Less,&quot;</Term>{" "}
                <Term>&quot;Less for much Less,&quot;</Term> and{" "}
                <Term>&quot;More for Less.&quot;</Term>
              </P>
            </Ruled>
          </div>
          <Plate className="!p-2">
            <ValueGrid />
          </Plate>
        </div>
      </TopicSlide>

      <TopicSlide
        id="communicating-and-delivering-the-chosen-position"
        part={2}
        title="Communicating and Delivering the Chosen Position"
      >
        <Statement className="!max-w-[52ch] !text-[clamp(1.5rem,2.3vw,2rem)]">
          Once it has chosen a position, the company must take strong steps to{" "}
          <Tint>deliver and communicate</Tint> the desired position to its
          target consumers.
        </Statement>
        {/* Two columns, each sentence over the plate that draws it. */}
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-10">
          <Ruled tone="signal" className="flex flex-col gap-4 !pt-4">
            <P>
              All the company&apos;s marketing mix efforts (the 4 Ps) must{" "}
              <Term>support</Term> the positioning strategy.
            </P>
            <Plate className="!p-2 max-w-[440px]">
              <FourPsColonnade />
            </Plate>
          </Ruled>
          <Ruled className="flex flex-col gap-4 !pt-4">
            <P>
              Establishing a position or changing one usually takes a{" "}
              <Term tone="ink">long time</Term>, but maintaining it requires{" "}
              <Term>consistent performance and communication</Term>.
            </P>
            <Plate className="!p-2">
              <EstablishMaintain />
            </Plate>
          </Ruled>
        </div>
      </TopicSlide>

      <Slide id="discussion-brand-positioning" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter" className="md:!mb-6">
          Brand Positioning
        </KickerHeading>
        <Prompt>
          <PromptKicker /> Think of a popular smartphone brand. What is its{" "}
          <Tint>value proposition</Tint>, and how does it differentiate itself
          from its <Tint tone="counter">main competitor</Tint> in the minds of
          consumers?
        </Prompt>
        <Figure height="auto" dense className="!mt-6 max-w-5xl">
          <PhonesInMind />
        </Figure>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <KickerHeading kicker="Conclusion:">
          Segmentation, Targeting, and Positioning
        </KickerHeading>
        <Statement className="!max-w-[36ch]">
          The STP process is essential for creating{" "}
          <Tint>customer value</Tint> and building{" "}
          <Tint tone="counter">profitable relationships</Tint>.
        </Statement>
        <ol className="mt-14 grid w-full gap-x-12 gap-y-12 md:grid-cols-3">
          {[
            {
              letter: "S",
              glyph: <GlyphSegment />,
              text: "Segmentation allows marketers to identify distinct groups with unique needs.",
            },
            {
              letter: "T",
              glyph: <GlyphTarget />,
              text: "Targeting selects the most attractive segments to serve.",
            },
            {
              letter: "P",
              glyph: <GlyphMind />,
              text: "Positioning ensures the brand occupies a clear, distinctive place in the consumer's mind.",
            },
          ].map((item) => (
            <li
              key={item.letter}
              className="flex flex-col gap-6 border-t-2 border-[var(--ink)] pt-6"
            >
              <div aria-hidden className="flex items-center justify-between">
                <span
                  className="text-[2.6rem] leading-none text-[var(--signal)]"
                  style={SERIF}
                >
                  {item.letter}
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
