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
import { Plate } from "../_visuals/kit";
import quizzesData from "./quizzes.json";
import {
  MODES,
  EntryGlyph,
  WorldTargets,
  CultureEconomy,
  Navigate,
  TradeSystem,
  AssessEconomy,
  CultureChoice,
  TradeBarriers,
  GdpSelection,
  Acceptance,
  CustomsIgnored,
  BurgerBacklash,
  Saturated,
  ScaleCurve,
  HigherProfits,
  OperatingRisks,
  EntryCascade,
  SimplestRoute,
  IndirectExport,
  DirectExport,
  SameLine,
  JoinForeign,
  JvTypes,
  RiskControlSplit,
  OwnPlantAbroad,
  ModeMeter,
  CurrencyRisk,
  PoliticalRisk,
  CoffeeCrossroads,
  MixSpread,
  CostRelevance,
  ProductRow,
  TastesInfrastructure,
  HowMuchToAdapt,
  CommAdaptation,
  TaglineVetting,
  CostsAdded,
  PriceEscalation,
  UniformPrice,
  Fragmented,
  WholeChannel,
  PhoneRivals,
  RapidEvolution,
  Expectations,
  HyperConnected,
  AiHub,
  HyperPersonal,
  PredictPattern,
  RealTimeSpend,
  PrivacyConcern,
  GreenPreference,
  AlignedGoals,
  Greenwash,
  ReuseLoop,
  TakeMakeDispose,
  LifeExtended,
  ImpactDown,
  Opportunities,
  ArPreview,
  VrWorld,
  PhysicalDigitalBridge,
  UnifiedTouchpoints,
  SeamlessJourney,
  DataIntegration,
  WhereTheLine,
  GlyphGlobal,
  GlyphFuture,
  GlyphBalance,
} from "./visuals";

// ============================================================================
// WEEK 12 — GLOBAL MARKETING AND THE FUTURE OF MARKETING
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// A fixed cast carries the week: a dashed line is a border, a flag is a
// country, a globe is the world market. The three entry modes keep one colour
// each (exporting ink, joint venturing teal, direct investment persimmon), and
// in the global mix standardization is teal and adaptation persimmon.
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
      className={cn(
        "type-body max-w-[var(--measure)] [&_strong]:font-semibold [&_strong]:text-[var(--ink)]",
        className,
      )}
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
    <p className={cn("type-lead max-w-[46ch]", className)}>
      {children}
    </p>
  );
}

/** A line set as a serif statement — the line a slide lands on. */
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

/** Inline colour for a phrase inside a serif line. */
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
    <div className={cn("min-w-0 border-t-2 pt-5", BORDER[tone], className)}>
      {children}
    </div>
  );
}

/**
 * A slide heading. A "Label:" prefix from the content ("Discussion:",
 * "Conclusion:") is set as a small tracked kicker inside the same h2, so the
 * heading text stays exactly as written.
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
    <div className="w-full mb-8 md:mb-12">
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

/** Discussion prompt. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
      <p className="type-quote !text-[clamp(1.35rem,2.5vw,2.1rem)] max-w-[46ch]">
        {children}
      </p>
    </div>
  );
}
/** A column: a ruled line with its plate beneath. */
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
        <P className="!text-[clamp(1.05rem,1.5vw,1.3rem)]">{text}</P>
      </Ruled>
      <Plate>{plate}</Plate>
    </div>
  );
}

/** Two plate columns side by side. */
function Columns({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A line and a column plate side by side. */
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
      className={cn("grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14", className)}
    >
      {plateFirst ? <Plate>{plate}</Plate> : null}
      <div className="min-w-0">{children}</div>
      {plateFirst ? null : <Plate>{plate}</Plate>}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Wayfinding
   -------------------------------------------------------------------------- */

const SECTIONS = [
  "The Global Environment",
  "Going Global and Market Entry",
  "The Global Marketing Mix",
  "The Future of Marketing",
];

/** The four parts of the week as a strip; the current one is lit. */
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
      className={cn("grid w-full grid-cols-4 gap-2 sm:gap-4", className)}
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

const MODE_NAMES = ["Exporting", "Joint Venturing", "Direct Investment"];
const MODE_TEXT = [
  "text-[var(--ink)]",
  "text-[var(--counter)]",
  "text-[var(--signal)]",
];
const MODE_BORDER = [
  "border-[var(--ink)]",
  "border-[var(--counter)]",
  "border-[var(--signal)]",
];

/** The three entry modes as glyphs; the one this slide covers is lit. */
function ModeStrip({ active }: { active: number }) {
  return (
    <ol aria-hidden className="mb-10 grid w-full grid-cols-3 gap-3 sm:gap-5">
      {MODES.map((m, i) => {
        const on = i === active;
        return (
          <li
            key={m.kind}
            className={cn(
              "flex min-w-0 flex-col items-center gap-2 border-b-2 pb-3",
              on ? MODE_BORDER[i] : "border-[var(--rule)] opacity-45",
            )}
          >
            <EntryGlyph kind={m.kind} lit={on} size={104} />
            <span
              className={cn(
                "hidden sm:block text-center text-[0.75rem] leading-tight",
                on ? cn("font-semibold", MODE_TEXT[i]) : "text-[var(--ink-3)]",
              )}
            >
              {MODE_NAMES[i]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** The four Ps, in the order the week adapts them; the current one is lit. */
function MixStrip({ active }: { active: number }) {
  return (
    <ol aria-hidden className="mb-10 grid w-full grid-cols-4 gap-2 sm:gap-4">
      {["Product", "Promotion", "Price", "Place"].map((p, i) => (
        <li
          key={p}
          className={cn(
            "min-w-0 border-t-2 pt-2 text-[clamp(0.95rem,1.4vw,1.2rem)]",
            i === active
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

/** The twelve weeks of the course; this, the last, is lit. */
function WeekStrip() {
  return (
    <ol
      aria-hidden
      className="mx-auto mt-8 grid w-full max-w-2xl grid-cols-12 gap-1.5 sm:gap-2"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <li
          key={i}
          className={cn(
            "border-t-2 pt-2 text-center text-[0.7rem] tabular-nums sm:text-[0.8rem]",
            i === 11
              ? "border-[var(--signal)] font-semibold text-[var(--signal)]"
              : "border-[var(--ink)] text-[var(--ink-3)]",
          )}
        >
          {String(i + 1).padStart(2, "0")}
        </li>
      ))}
    </ol>
  );
}

/** A topic slide: part strip, heading, optional strip, then the content. */
function TopicSlide({
  id,
  section,
  title,
  kicker,
  strip,
  children,
}: {
  id: string;
  section: number;
  title: string;
  kicker?: string;
  strip?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border quizData={quiz[id]}>
      <SectionStrip active={section} className="mb-12 md:mb-16" />
      <Heading kicker={kicker}>{title}</Heading>
      {strip}
      {children}
    </Slide>
  );
}

/** Two plates side by side in column wells. */
function PlatePair({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("my-10 grid w-full gap-8 lg:grid-cols-2 lg:gap-10", className)}>
      {children}
    </div>
  );
}

/** The two situation lines of a discussion, side by side. */
function Situation({
  first,
  second,
}: {
  first: React.ReactNode;
  second: React.ReactNode;
}) {
  return (
    <div className="mb-12 grid w-full gap-8 md:grid-cols-2 md:gap-12">
      <Ruled tone="ink">
        <Big>{first}</Big>
      </Ruled>
      <Ruled tone="counter">
        <Big>{second}</Big>
      </Ruled>
    </div>
  );
}

/** The "Discussion:" that opens a prompt, set as a label inside the line. */
function Ask() {
  return (
    <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
      Discussion:
    </span>
  );
}

/** A definition row: the line on the left, its plate on the right. */
function Row({
  plate,
  children,
}: {
  plate: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid w-full items-center gap-6 border-t border-[var(--rule)] py-6 lg:grid-cols-2 lg:gap-14">
      <P className="!text-[clamp(1.15rem,1.9vw,1.6rem)] !leading-snug">
        {children}
      </P>
      <Plate>{plate}</Plate>
    </div>
  );
}

const numerals = `.step-n::before { content: attr(data-n); }`;

export default function Week12() {
  return (
    <SlideDeck label="Week 12">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 12 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[20ch]">
          Global Marketing and{" "}
          <span className="text-[var(--signal)]">the Future of Marketing</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-4 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 12 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we will explore{" "}
            <span className="text-[var(--signal)]">global marketing strategies</span>.
          </p>
          <p className="type-lead">
            We will also examine{" "}
            <span className="text-[var(--signal)]">emerging trends</span> shaping
            the future.
          </p>
        </div>

        <div className="mt-12 w-full max-w-3xl border-t border-[var(--rule)] pt-8">
          <WeekStrip />
        </div>
      </Slide>

      {/* ================================================================
          Part 1 — The Global Environment
          ================================================================ */}
      <TopicSlide
        id="what-is-global-marketing"
        section={0}
        title="What is Global Marketing?"
      >
        <Lead className="!max-w-[58ch]">
          Global marketing involves{" "}
          <Term>targeting markets across the world</Term>.
        </Lead>
        <Figure height="auto">
          <WorldTargets />
        </Figure>
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                It requires understanding diverse{" "}
                <Term tone="ink">cultural and economic environments</Term>.
              </>
            }
            plate={<CultureEconomy />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Companies must navigate complex{" "}
                <Term tone="counter">regulatory and political landscapes</Term>.
              </>
            }
            plate={<Navigate />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="the-global-marketing-environment"
        section={0}
        title="The Global Marketing Environment"
      >
        <Lead className="!max-w-[58ch]">
          The global environment includes{" "}
          <Term>international trade systems</Term>.
        </Lead>
        <Figure height="auto">
          <TradeSystem />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                Marketers assess <Term>economic conditions</Term> of target
                countries.
              </>
            }
            plate={<AssessEconomy />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Cultural environments</Term> dictate consumer behavior and
                preferences.
              </>
            }
            plate={<CultureChoice />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="assessing-the-global-environment"
        section={0}
        title="Assessing the Global Environment"
      >
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[48ch]">
            <Tint tone="counter">Tariffs and quotas</Tint> are common trade
            barriers.
          </Big>
        </Ruled>
        <Figure height="auto">
          <TradeBarriers />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[48ch]">
            Economic indicators like <Tint>GDP</Tint> guide market selection.
          </Big>
        </Ruled>
        <Figure height="auto">
          <GdpSelection />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                Cultural nuances influence{" "}
                <Term>product acceptance and messaging</Term>.
              </>
            }
            plate={<Acceptance />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Ignoring local customs often leads to{" "}
                <Term tone="counter">marketing failures</Term>.
              </>
            }
            plate={<CustomsIgnored />}
          />
        </Columns>
      </TopicSlide>

      <Slide id="discussion-the-cultural-trap" border>
        <Heading kicker="Discussion:" tone="counter">
          The Cultural Trap
        </Heading>
        <Figure height="auto" className="!mt-0">
          <BurgerBacklash />
        </Figure>
        <Situation
          first={
            <>
              A US fast food chain launches a{" "}
              <Tint>highly successful</Tint> beef burger in India.
            </>
          }
          second={
            <>
              Sales are <Tint tone="counter">abysmal</Tint>, and there is public
              backlash.
            </>
          }
        />
        <Prompt>
          <Ask /> What specific <Tint tone="counter">cultural or environmental
          factor</Tint> did the company ignore, and how would you correct the
          strategy?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 2 — Going Global and Market Entry
          ================================================================ */}
      <TopicSlide
        id="deciding-whether-to-go-global"
        section={1}
        title="Deciding Whether to Go Global"
      >
        <Lead className="!max-w-[58ch]">
          <Term>Saturated domestic markets</Term> often push companies outward.
        </Lead>
        <Figure height="auto">
          <Saturated />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            Global expansion offers <Tint>economies of scale</Tint> and{" "}
            <Tint>higher profits</Tint>.
          </Big>
        </Ruled>
        <PlatePair>
          <Plate>
            <ScaleCurve />
          </Plate>
          <Plate>
            <HigherProfits />
          </Plate>
        </PlatePair>
        <Ruled tone="counter" className="mt-6 w-full">
          <Big className="max-w-[56ch]">
            However, international operations introduce significant{" "}
            <Tint tone="counter">financial and operational risks</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <OperatingRisks />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="market-entry-strategies"
        section={1}
        title="Market Entry Strategies"
      >
        <Figure height="auto" className="!mt-0">
          <EntryCascade />
        </Figure>
        <div className="grid w-full gap-10 lg:grid-cols-3 lg:gap-12">
          <Ruled tone="ink">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              Companies choose from several entry modes based on{" "}
              <Term tone="ink">risk tolerance</Term>.
            </P>
          </Ruled>
          <Ruled tone="ink">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              The primary modes are <Term tone="ink">exporting</Term>,{" "}
              <Term tone="counter">joint venturing</Term>, and{" "}
              <Term>direct investment</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              Each mode offers different levels of{" "}
              <Term>control and profit potential</Term>.
            </P>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="market-entry-exporting"
        section={1}
        kicker="Market Entry:"
        title="Exporting"
        strip={<ModeStrip active={0} />}
      >
        <Statement className="!max-w-[34ch]">
          Exporting is the <Tint>simplest way</Tint> to enter a foreign market.
        </Statement>
        <Figure height="auto">
          <SimplestRoute />
        </Figure>
        <Columns>
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Indirect exporting</Term> uses independent
                international marketing intermediaries.
              </>
            }
            plate={<IndirectExport />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Direct exporting</Term> involves handling your own exports.
              </>
            }
            plate={<DirectExport />}
          />
        </Columns>
        <Ruled tone="ink" className="mt-16 w-full">
          <Big className="max-w-[52ch]">
            Exporting requires the <Tint>least change</Tint> to the company
            product lines.
          </Big>
        </Ruled>
        <Figure height="auto">
          <SameLine />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="market-entry-joint-venturing"
        section={1}
        kicker="Market Entry:"
        title="Joint Venturing"
        strip={<ModeStrip active={1} />}
      >
        <Lead className="!max-w-[58ch]">
          Joint venturing involves{" "}
          <Term tone="counter">joining with foreign companies</Term>.
        </Lead>
        <Figure height="auto">
          <JoinForeign />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[56ch]">
            Types include <Tint tone="counter">licensing</Tint>,{" "}
            <Tint tone="counter">contract manufacturing</Tint>, and{" "}
            <Tint tone="counter">joint ownership</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <JvTypes />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[56ch]">
            It <Tint>shares the financial risk</Tint> but also{" "}
            <Tint tone="counter">reduces management control</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <RiskControlSplit />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="market-entry-direct-investment"
        section={1}
        kicker="Market Entry:"
        title="Direct Investment"
        strip={<ModeStrip active={2} />}
      >
        <Lead className="!max-w-[62ch]">
          Direct investment is the development of{" "}
          <Term>foreign-based assembly or manufacturing</Term>.
        </Lead>
        <Figure height="auto">
          <OwnPlantAbroad />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                It offers the <Term>highest level of control</Term> over the
                operation.
              </>
            }
            plate={<ModeMeter metric="control" />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                However, it requires the{" "}
                <Term tone="counter">most substantial capital commitment</Term>.
              </>
            }
            plate={<ModeMeter metric="capital" />}
          />
        </Columns>
        <Statement className="mt-16 !max-w-[36ch]">
          Companies face <Tint tone="counter">currency risks</Tint> and potential{" "}
          <Tint tone="counter">political instability</Tint>.
        </Statement>
        <PlatePair>
          <Plate>
            <CurrencyRisk />
          </Plate>
          <Plate>
            <PoliticalRisk />
          </Plate>
        </PlatePair>
      </TopicSlide>

      <Slide id="discussion-selecting-the-right-entry-mode" border>
        <Heading kicker="Discussion:" tone="counter">
          Selecting the Right Entry Mode
        </Heading>
        <Figure height="auto" className="!mt-0">
          <CoffeeCrossroads />
        </Figure>
        <Situation
          first={
            <>
              A local coffee brand wants to expand into a{" "}
              <Tint tone="counter">highly regulated</Tint> foreign market.
            </>
          }
          second={
            <>
              They have <Tint tone="counter">limited capital</Tint> but a{" "}
              <Tint>strong, recognizable brand identity</Tint>.
            </>
          }
        />
        <Prompt>
          <Ask /> Would you recommend <Tint tone="counter">licensing</Tint> or{" "}
          <Tint>direct investment</Tint>, and what are the tradeoffs?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3 — The Global Marketing Mix
          ================================================================ */}
      <TopicSlide
        id="standardized-vs-adapted-marketing-mix"
        section={2}
        title="Standardized vs. Adapted Marketing Mix"
      >
        <Columns>
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Standardized</Term> global marketing uses the
                same strategy worldwide.
              </>
            }
            plate={<MixSpread mode="standardized" />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Adapted</Term> global marketing adjusts the strategy to each
                target market.
              </>
            }
            plate={<MixSpread mode="adapted" />}
          />
        </Columns>
        <Statement className="mt-16 !max-w-[38ch]">
          <Tint tone="counter">Standardization lowers costs</Tint> but{" "}
          <Tint>adaptation improves local relevance</Tint>.
        </Statement>
        <Figure height="auto">
          <CostRelevance />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="product-adaptation-strategies"
        section={2}
        title="Product Adaptation Strategies"
        strip={<MixStrip active={0} />}
      >
        <div className="w-full border-b border-[var(--rule)]">
          <Row plate={<ProductRow kind="extension" />}>
            <Term tone="ink">Straight extension</Term> means marketing a product
            without any changes.
          </Row>
          <Row plate={<ProductRow kind="adaptation" />}>
            <Term>Product adaptation</Term> alters the product to meet local
            conditions.
          </Row>
          <Row plate={<ProductRow kind="invention" />}>
            <Term>Product invention</Term> consists of creating something new for
            a specific market.
          </Row>
        </div>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[52ch]">
            <Tint>Local tastes</Tint> and <Tint>infrastructure</Tint> heavily
            dictate the chosen strategy.
          </Big>
        </Ruled>
        <Figure height="auto">
          <TastesInfrastructure />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="promotion-adaptation"
        section={2}
        title="Promotion Adaptation"
        strip={<MixStrip active={1} />}
      >
        <Lead className="!max-w-[58ch]">
          Global companies must decide how to{" "}
          <Term>adapt their advertising messages</Term>.
        </Lead>
        <Figure height="auto">
          <HowMuchToAdapt />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            <Tint>Communication adaptation</Tint> fully alters the message for
            local markets.
          </Big>
        </Ruled>
        <Figure height="auto">
          <CommAdaptation />
        </Figure>
        <Statement className="mt-6 !max-w-[36ch]">
          Even translated taglines must be carefully{" "}
          <Tint>vetted for cultural context</Tint>.
        </Statement>
        <Figure height="auto">
          <TaglineVetting />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="pricing-in-global-markets"
        section={2}
        title="Pricing in Global Markets"
        strip={<MixStrip active={2} />}
      >
        <Pair plate={<CostsAdded />}>
          <Lead>
            Pricing must account for{" "}
            <Term tone="counter">
              transportation, tariffs, and intermediary margins
            </Term>
            .
          </Lead>
        </Pair>
        <Ruled tone="counter" className="mt-16 w-full">
          <Big className="max-w-[52ch]">
            Companies face the challenge of{" "}
            <Tint tone="counter">price escalation</Tint> in foreign markets.
          </Big>
        </Ruled>
        <Figure height="auto">
          <PriceEscalation />
        </Figure>
        <Statement className="mt-6 !max-w-[34ch]">
          Setting a <Tint tone="counter">uniform price</Tint> globally is rarely
          viable.
        </Statement>
        <Figure height="auto">
          <UniformPrice />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="distribution-channels"
        section={2}
        title="Distribution Channels"
        strip={<MixStrip active={3} />}
      >
        <Lead className="!max-w-[58ch]">
          Global distribution networks are often{" "}
          <Term tone="counter">complex and fragmented</Term>.
        </Lead>
        <Figure height="auto">
          <Fragmented />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            The <Tint>channel between nations</Tint> moves products to the
            borders.
          </Big>
        </Ruled>
        <Figure height="auto">
          <WholeChannel phase="between" />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            The <Tint>channel within nations</Tint> moves products from borders
            to final buyers.
          </Big>
        </Ruled>
        <Figure height="auto">
          <WholeChannel phase="within" />
        </Figure>
      </TopicSlide>

      <Slide id="discussion-the-cost-of-adaptation" border>
        <Heading kicker="Discussion:" tone="counter">
          The Cost of Adaptation
        </Heading>
        <Figure height="auto" className="!mt-0">
          <PhoneRivals />
        </Figure>
        <Situation
          first={
            <>
              A tech company launches its <Tint>flagship smartphone</Tint>{" "}
              globally.
            </>
          }
          second={
            <>
              They discover that local competitors offer similar features at{" "}
              <Tint tone="counter">half the price</Tint>.
            </>
          }
        />
        <Prompt>
          <Ask /> Should the company{" "}
          <Tint tone="counter">lower its global premium price</Tint>, or create a{" "}
          <Tint>cheaper, stripped-down version</Tint> for this specific market?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 4 — The Future of Marketing
          ================================================================ */}
      <TopicSlide
        id="emerging-trends-in-marketing"
        section={3}
        title="Emerging Trends in Marketing"
      >
        <Lead className="!max-w-[58ch]">
          Marketing is <Term>rapidly evolving</Term> due to technological
          advancements.
        </Lead>
        <Figure height="auto">
          <RapidEvolution />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                Consumer expectations are shifting towards{" "}
                <Term>sustainability and transparency</Term>.
              </>
            }
            plate={<Expectations />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Brands must adapt to survive in a{" "}
                <Term>hyper-connected landscape</Term>.
              </>
            }
            plate={<HyperConnected />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide id="ai-in-marketing" section={3} title="AI in Marketing">
        <Figure height="auto" className="!mt-0">
          <AiHub />
        </Figure>
        <div className="grid w-full gap-10 lg:grid-cols-3 lg:gap-12">
          <Ruled tone="signal">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              Artificial intelligence is revolutionizing{" "}
              <Term>data analysis and consumer insights</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              It enables <Term>predictive modeling</Term> for consumer behavior.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P className="!text-[clamp(1.1rem,1.6vw,1.4rem)]">
              <Term>Chatbots and automated systems</Term> enhance customer
              service efficiency.
            </P>
          </Ruled>
        </div>
      </TopicSlide>

      <TopicSlide
        id="ai-personalization-and-analytics"
        section={3}
        title="AI Personalization and Analytics"
      >
        <Lead className="!max-w-[58ch]">
          AI algorithms deliver <Term>hyper-personalized content</Term> to users.
        </Lead>
        <Figure height="auto">
          <HyperPersonal />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[56ch]">
            Predictive analytics forecast <Tint>future buying patterns</Tint>{" "}
            based on past behavior.
          </Big>
        </Ruled>
        <Figure height="auto">
          <PredictPattern />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                Marketers use AI to <Term>optimize ad spend in real-time</Term>.
              </>
            }
            plate={<RealTimeSpend />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Ethical concerns regarding{" "}
                <Term tone="counter">data privacy</Term> remain a significant
                challenge.
              </>
            }
            plate={<PrivacyConcern />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="sustainability-and-purpose-driven-marketing"
        section={3}
        title="Sustainability and Purpose-Driven Marketing"
      >
        <Lead className="!max-w-[62ch]">
          Consumers increasingly prefer brands with{" "}
          <Term>strong environmental commitments</Term>.
        </Lead>
        <Figure height="auto">
          <GreenPreference />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Purpose-driven marketing</Term> aligns business goals with
                social impact.
              </>
            }
            plate={<AlignedGoals />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Greenwashing</Term>, or false sustainability
                claims, damages brand reputation.
              </>
            }
            plate={<Greenwash />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="the-circular-economy"
        section={3}
        title="The Circular Economy"
      >
        <Lead className="!max-w-[60ch]">
          The circular economy <Term>minimizes waste</Term> by designing products
          for reuse.
        </Lead>
        <Figure height="auto">
          <ReuseLoop />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[48ch]">
            Brands are shifting from a{" "}
            <Tint tone="counter">take-make-dispose</Tint> model.
          </Big>
        </Ruled>
        <Figure height="auto">
          <TakeMakeDispose />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            Product life cycles are extended through{" "}
            <Tint>repair and recycling programs</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <LifeExtended />
        </Figure>
        <Statement className="mt-6 !max-w-[38ch]">
          This model <Tint>reduces environmental impact</Tint> while creating{" "}
          <Tint>new business opportunities</Tint>.
        </Statement>
        <PlatePair>
          <Plate>
            <ImpactDown />
          </Plate>
          <Plate>
            <Opportunities />
          </Plate>
        </PlatePair>
      </TopicSlide>

      <TopicSlide
        id="immersive-experiences-ar-and-vr"
        section={3}
        title="Immersive Experiences: AR and VR"
      >
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Augmented reality</Term> allows consumers to visualize
                products before purchase.
              </>
            }
            plate={<ArPreview />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Virtual reality</Term> creates fully immersive brand
                environments.
              </>
            }
            plate={<VrWorld />}
          />
        </Columns>
        <Statement className="mt-16 !max-w-[36ch]">
          These technologies <Tint>bridge the gap</Tint> between physical and
          digital shopping.
        </Statement>
        <Figure height="auto">
          <PhysicalDigitalBridge />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="omnichannel-and-seamless-journeys"
        section={3}
        title="Omnichannel and Seamless Journeys"
      >
        <Lead className="!max-w-[60ch]">
          Omnichannel marketing provides a <Term>unified experience</Term> across
          all touchpoints.
        </Lead>
        <Figure height="auto">
          <UnifiedTouchpoints />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            Consumers expect <Tint>seamless transitions</Tint> between online and
            offline channels.
          </Big>
        </Ruled>
        <Figure height="auto">
          <SeamlessJourney />
        </Figure>
        <Statement className="mt-6 !max-w-[36ch]">
          <Tint>Data integration</Tint> is essential for tracking the customer
          journey.
        </Statement>
        <Figure height="auto">
          <DataIntegration />
        </Figure>
      </TopicSlide>

      <Slide id="discussion-the-ethics-of-hyper-personalization" border>
        <Heading kicker="Discussion:" tone="counter">
          The Ethics of Hyper-Personalization
        </Heading>
        <Figure height="auto" className="!mt-0">
          <WhereTheLine />
        </Figure>
        <Situation
          first={
            <>
              A retail app uses <Tint>predictive AI</Tint> to know a customer is
              pregnant before they announce it.
            </>
          }
          second={
            <>
              The app sends targeted ads for baby products, causing{" "}
              <Tint tone="counter">distress</Tint>.
            </>
          }
        />
        <Prompt>
          <Ask /> Where should the line be drawn between{" "}
          <Tint>helpful personalization</Tint> and{" "}
          <Tint tone="counter">invasive surveillance</Tint>?
        </Prompt>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion-global-marketing-and-the-future" border>
        <Heading kicker="Conclusion:">
          Global Marketing and the Future
        </Heading>
        <ol className="grid w-full gap-x-12 gap-y-12 lg:grid-cols-3">
          {[
            {
              glyph: <GlyphGlobal />,
              text: "Global expansion requires careful selection of entry and adaptation strategies.",
            },
            {
              glyph: <GlyphFuture />,
              text: "The future of marketing is driven by AI, sustainability, and immersive tech.",
            },
            {
              glyph: <GlyphBalance />,
              text: "Marketers must balance technological innovation with ethical responsibility.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-6 border-t-2 border-[var(--ink)] pt-6"
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
        <style>{numerals}</style>
      </Slide>
    </SlideDeck>
  );
}
