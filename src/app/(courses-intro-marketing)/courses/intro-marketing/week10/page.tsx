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
  TOOLS,
  ToolGlyph,
  BlendBar,
  EngageRelate,
  PersuasiveValue,
  CoreOfComms,
  MessageHub,
  DispersedReach,
  RepeatMessage,
  TvCost,
  NoSalesperson,
  Believability,
  AvoidersReached,
  Dramatize,
  Underused,
  FourIncentives,
  AttentionIncentive,
  QuickResponse,
  ShortLived,
  LateStages,
  Commitment,
  MostExpensive,
  Targeted,
  Immediate,
  Dialogue,
  Bullseye,
  BudgetScale,
  Bombarded,
  ConfusedImage,
  Fragmented,
  TiedTogether,
  Coordinated,
  ClearConsistentCompelling,
  Disconnect,
  Touchpoints,
  StepCascade,
  WhereTheyStand,
  ReadinessStairs,
  GuideToPurchase,
  Aida,
  ThreeAppeals,
  ConcludeOrLeave,
  AdFormat,
  Affordable,
  PercentOfSales,
  Parity,
  ObjectiveTask,
  Assumptions,
  LogicChain,
  TiedToGoals,
  PredictionFan,
  Roi,
  Remember,
  SeenRecall,
  SalesShare,
  StartupSlice,
  GlyphMix,
  GlyphTogether,
  GlyphAudience,
  GlyphBudget,
} from "./visuals";

// ============================================================================
// WEEK 10 — INTEGRATED MARKETING COMMUNICATIONS (THE FOURTH P)
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// A fixed cast carries the week: five glyphs for the five promotion tools
// and one seal for the brand message. SIGNAL marks the operative case (the
// tool's strength, the consistent message), COUNTER the limit or conflict.
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

/* --------------------------------------------------------------------------
   Wayfinding
   -------------------------------------------------------------------------- */

const SECTIONS = [
  "The Promotion Mix",
  "Integrated Marketing Communications",
  "Budget and Measurement",
];

/** The three parts of the week as a strip; the current one is lit. */
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
      className={cn("grid w-full grid-cols-3 gap-2 sm:gap-4", className)}
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

const TOOL_NAMES = [
  "Advertising",
  "Public Relations",
  "Sales Promotion",
  "Personal Selling",
  "Direct and Digital",
];

/** The five tools as glyphs; the one this slide covers is lit. */
function ToolStrip({ active }: { active: number }) {
  return (
    <ol aria-hidden className="mb-10 grid w-full grid-cols-5 gap-2 sm:gap-4">
      {TOOLS.map((t, i) => {
        const on = i === active;
        return (
          <li
            key={t.kind}
            className={cn(
              "flex min-w-0 flex-col items-center gap-2 border-b-2 pb-3",
              on ? "border-[var(--signal)]" : "border-[var(--rule)] opacity-45",
            )}
          >
            <ToolGlyph kind={t.kind} tone={on ? "var(--signal)" : "var(--ink)"} size={52} />
            <span
              className={cn(
                "hidden sm:block text-center text-[0.72rem] leading-tight",
                on ? "font-semibold text-[var(--signal)]" : "text-[var(--ink-3)]",
              )}
            >
              {TOOL_NAMES[i]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const STEP_NAMES = ["Audience", "Objectives", "Message", "Media", "Source and feedback"];

/** The five communication steps; the current one is lit. */
function StepStrip({ active }: { active: number }) {
  return (
    <ol aria-hidden className="mb-10 grid w-full grid-cols-5 gap-2 sm:gap-3">
      {STEP_NAMES.map((name, i) => {
        const on = i === active;
        return (
          <li
            key={name}
            className={cn(
              "min-w-0 px-2 py-2 sm:px-3",
              on
                ? "bg-[var(--signal)] text-[var(--paper)]"
                : i < active
                  ? "bg-[var(--paper-2)] text-[var(--ink)]"
                  : "border border-[var(--rule)] text-[var(--ink-3)]",
            )}
          >
            <span className="block text-[1.3rem] leading-none" style={SERIF}>
              {i + 1}
            </span>
            <span className="mt-1 hidden sm:block text-[0.72rem] leading-tight">
              {name}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const METHOD_NAMES = ["Affordable", "Percentage-of-Sales", "Competitive-Parity", "Objective-and-Task"];

/** The four budget methods; the one in focus is lit. */
function MethodStrip({ active }: { active: number }) {
  return (
    <ol aria-hidden className="mb-10 grid w-full grid-cols-4 gap-2 sm:gap-4">
      {METHOD_NAMES.map((name, i) => (
        <li
          key={name}
          className={cn(
            "min-w-0 border-t-2 pt-2 text-[0.72rem] sm:text-[0.8rem] leading-tight",
            i === active
              ? "border-[var(--signal)] font-semibold text-[var(--signal)]"
              : "border-[var(--rule)] text-[var(--ink-3)]",
          )}
        >
          {name}
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
  strip,
  children,
}: {
  id: string;
  section: number;
  title: string;
  strip?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border quizData={quiz[id]}>
      <SectionStrip active={section} className="mb-12 md:mb-16" />
      <Heading>{title}</Heading>
      {strip}
      {children}
    </Slide>
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

/** The four Ps, with Promotion lit: where this week sits in the mix. */
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
            i === 3
              ? "border-[var(--signal)] text-[var(--signal)]"
              : "border-[var(--ink)] text-[var(--ink-3)]",
          )}
          style={SERIF}
        >
          {p}
        </li>
      ))}
    </ol>
  );
}

/** A "Label: definition" line: the label bold, the rest as written. */
function Defined({
  label,
  children,
  tone = "signal",
}: {
  label: string;
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <>
      <Term tone={tone}>{label}</Term> {children}
    </>
  );
}

const numerals = `.step-n::before { content: attr(data-n); }`;

export default function Week10() {
  return (
    <SlideDeck label="Week 10">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 10 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">
          Integrated Marketing Communications{" "}
          <span className="text-[var(--signal)]">(The Fourth P)</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-4 text-center">
          <p className="type-lead !text-[var(--ink)]">Welcome to Week 10</p>
          <p className="type-lead">
            Exploring{" "}
            <span className="text-[var(--signal)]">
              Integrated Marketing Communications
            </span>
          </p>
        </div>

        <div className="mt-12 w-full max-w-3xl border-t border-[var(--rule)] pt-8">
          <p className="type-body mx-auto text-center">
            Understanding the{" "}
            <strong className="font-semibold text-[var(--signal)]">
              Fourth P
            </strong>{" "}
            of the Marketing Mix
          </p>
          <MixStrip />
        </div>
      </Slide>

      {/* ================================================================
          Part 1 — The Promotion Mix
          ================================================================ */}
      <TopicSlide id="the-promotion-mix" section={0} title="The Promotion Mix">
        <Lead className="!max-w-[58ch]">
          Defines the <Term>specific blend of promotional tools</Term>
        </Lead>
        <Figure height="auto">
          <BlendBar />
        </Figure>
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                Used to <Term tone="ink">engage consumers</Term> and build
                customer relationships
              </>
            }
            plate={<EngageRelate />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Communicates <Term>customer value</Term> persuasively
              </>
            }
            plate={<PersuasiveValue />}
          />
        </Columns>
        <Pair plate={<CoreOfComms />} className="mt-16">
          <Statement>
            Forms the <Tint>core</Tint> of marketing communications
          </Statement>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="elements-of-the-promotion-mix"
        section={0}
        title="Elements of the Promotion Mix"
      >
        <Figure height="auto" className="!mt-0">
          <MessageHub />
        </Figure>
        <ol className="w-full">
          {[
            {
              label: "Advertising:",
              text: "Paid, non-personal presentation of ideas",
            },
            {
              label: "Public Relations:",
              text: "Building good relations with various publics",
            },
            {
              label: "Sales Promotion:",
              text: "Short-term incentives to encourage purchase",
            },
            {
              label: "Personal Selling:",
              text: "Personal customer interactions by the firm's sales force",
            },
            {
              label: "Direct and Digital Marketing:",
              text: "Engaging directly with targeted individual consumers",
            },
          ].map((item, i) => (
            <li
              key={item.label}
              className="grid grid-cols-[auto_1fr] items-center gap-5 border-t border-[var(--rule)] py-5 sm:gap-8"
            >
              <ToolGlyph kind={TOOLS[i].kind} tone="var(--signal)" size={64} />
              <p className="type-h2 !font-normal">
                <Defined label={item.label}>{item.text}</Defined>
              </p>
            </li>
          ))}
        </ol>
      </TopicSlide>

      <TopicSlide
        id="advertising"
        section={0}
        title="Advertising"
        strip={<ToolStrip active={0} />}
      >
        <Lead className="!max-w-[58ch]">
          Reaches <Term>masses of geographically dispersed buyers</Term>
        </Lead>
        <Figure height="auto">
          <DispersedReach />
        </Figure>
        <Pair plate={<RepeatMessage />}>
          <Ruled tone="signal">
            <Big>
              Enables the seller to <Tint>repeat a message many times</Tint>
            </Big>
          </Ruled>
        </Pair>
        <Columns className="mt-16">
          <PlateColumn
            tone="counter"
            text={
              <>
                Can be <Term tone="counter">very costly</Term> for forms like
                television
              </>
            }
            plate={<TvCost />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Lacks the <Term tone="counter">direct persuasiveness</Term> of
                company salespeople
              </>
            }
            plate={<NoSalesperson />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="public-relations"
        section={0}
        title="Public Relations"
        strip={<ToolStrip active={1} />}
      >
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Highly believable</Term> compared to ads
              </>
            }
            plate={<Believability />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Reaches <Term>prospects who avoid</Term> salespeople and
                advertisements
              </>
            }
            plate={<AvoidersReached />}
          />
        </Columns>
        <Pair plateFirst plate={<Dramatize />} className="mt-16">
          <Ruled tone="signal">
            <Big>
              <Tint>Dramatizes</Tint> a company or product
            </Big>
          </Ruled>
        </Pair>
        <Statement className="mt-16 !max-w-[34ch]">
          Often <Tint tone="counter">underused</Tint> despite its{" "}
          <Tint>strong potential</Tint>
        </Statement>
        <Figure height="auto">
          <Underused />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="sales-promotion"
        section={0}
        title="Sales Promotion"
        strip={<ToolStrip active={2} />}
      >
        <Lead className="!max-w-[58ch]">
          Includes{" "}
          <Term>coupons, contests, discounts, and premiums</Term>
        </Lead>
        <Figure height="auto">
          <FourIncentives />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                Attracts <Term>consumer attention</Term> and offers strong
                incentives to purchase
              </>
            }
            plate={<AttentionIncentive />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Rewards <Term>quick response</Term> from buyers
              </>
            }
            plate={<QuickResponse />}
          />
        </Columns>
        <Ruled tone="counter" className="mt-16 w-full">
          <Big className="max-w-[56ch]">
            Effects are often <Tint tone="counter">short-lived</Tint> and not as
            effective in building long-term brand preference
          </Big>
        </Ruled>
        <Figure height="auto">
          <ShortLived />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="personal-selling"
        section={0}
        title="Personal Selling"
        strip={<ToolStrip active={3} />}
      >
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <Big>
              The <Tint>most effective tool</Tint> at certain stages of the
              buying process
            </Big>
          </Ruled>
          <Ruled tone="signal">
            <Big>
              Particularly important in building buyers&apos;{" "}
              <Tint>preferences, convictions, and actions</Tint>
            </Big>
          </Ruled>
        </div>
        <Figure height="auto">
          <LateStages />
        </Figure>
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                Requires a <Term tone="ink">longer-term commitment</Term> than
                advertising
              </>
            }
            plate={<Commitment />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Represents the company&apos;s{" "}
                <Term tone="counter">most expensive</Term> promotion tool
              </>
            }
            plate={<MostExpensive />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="direct-and-digital-marketing"
        section={0}
        title="Direct and Digital Marketing"
        strip={<ToolStrip active={4} />}
      >
        <Lead className="!max-w-[60ch]">
          More targeted and directed to a{" "}
          <Term>specific customer or community</Term>
        </Lead>
        <Figure height="auto">
          <Targeted />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Immediate and personalized</Term> for rapid response
              </>
            }
            plate={<Immediate />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Highly interactive</Term>, allowing for two-way dialogue
              </>
            }
            plate={<Dialogue />}
          />
        </Columns>
        <Pair plateFirst plate={<Bullseye />} className="mt-16">
          <Statement>
            Well suited to <Tint>highly targeted</Tint> marketing efforts
          </Statement>
        </Pair>
      </TopicSlide>

      <Slide id="discussion-selecting-promotional-tools" border>
        <Heading kicker="Discussion:" tone="counter">
          Selecting Promotional Tools
        </Heading>
        <Figure height="auto" className="!mt-0">
          <BudgetScale />
        </Figure>
        <Prompt>
          Imagine you are launching a highly technical, high-priced B2B
          software product. Would you allocate the majority of your budget to{" "}
          <Tint tone="counter">mass advertising</Tint> or{" "}
          <Tint>personal selling</Tint>, and what factors drive your decision?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 2 — Integrated Marketing Communications
          ================================================================ */}
      <TopicSlide
        id="the-need-for-integrated-marketing-communications"
        section={1}
        title="The Need for Integrated Marketing Communications"
      >
        <Lead className="!max-w-[62ch]">
          Consumers are <Term tone="counter">bombarded</Term> by commercial
          messages from a broad range of sources
        </Lead>
        <Figure height="auto">
          <Bombarded />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[56ch]">
            <Tint tone="counter">Conflicting messages</Tint> from different
            sources can result in confused company images
          </Big>
        </Ruled>
        <Figure height="auto">
          <ConfusedImage />
        </Figure>
        <Pair plate={<Fragmented />}>
          <Ruled tone="counter">
            <Big>
              A <Tint tone="counter">fragmented media landscape</Tint>{" "}
              complicates the communication process
            </Big>
          </Ruled>
        </Pair>
        <Statement className="mt-16 !max-w-[34ch]">
          <Tint>IMC ties together</Tint> all of the company&apos;s messages and
          images
        </Statement>
        <Figure height="auto">
          <TiedTogether />
        </Figure>
      </TopicSlide>

      <TopicSlide id="defining-imc" section={1} title="Defining IMC">
        <Lead className="!max-w-[62ch]">
          Carefully <Term>integrating and coordinating</Term> the
          company&apos;s many communications channels
        </Lead>
        <Figure height="auto">
          <Coordinated />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[56ch]">
            Delivers a <Tint>clear, consistent, and compelling</Tint> message
            about the organization and its products
          </Big>
        </Ruled>
        <Figure height="auto">
          <ClearConsistentCompelling />
        </Figure>
        <Pair plateFirst plate={<Disconnect />}>
          <Ruled tone="counter">
            <Big>
              Prevents the <Tint tone="counter">disconnect</Tint> that occurs
              when different departments create uncoordinated messages
            </Big>
          </Ruled>
        </Pair>
        <Statement className="mt-16 !max-w-[34ch]">
          Builds a <Tint>unified brand identity</Tint> across all touchpoints
        </Statement>
        <Figure height="auto">
          <Touchpoints />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="steps-in-developing-effective-communication"
        section={1}
        title="Steps in Developing Effective Communication"
      >
        <Figure height="auto" className="!mt-0">
          <StepCascade />
        </Figure>
        <ol className="grid w-full gap-x-10 md:grid-cols-2">
          {[
            "Identify the target audience",
            "Determine the communication objectives",
            "Design the message",
            "Choose the media to send the message",
            "Select the message source and collect feedback",
          ].map((s, i) => (
            <li
              key={s}
              className={cn(
                "flex items-baseline gap-5 border-t border-[var(--rule)] py-4",
                i === 4 && "md:col-span-2",
              )}
            >
              <span
                aria-hidden
                data-n={String(i + 1)}
                className="step-n w-6 shrink-0 text-[1.6rem] leading-none text-[var(--signal)]"
                style={SERIF}
              />
              <span className="type-h2 !font-normal">{s}</span>
            </li>
          ))}
        </ol>
        <style>{numerals}</style>
      </TopicSlide>

      <TopicSlide
        id="determining-communication-objectives"
        section={1}
        title="Determining Communication Objectives"
        strip={<StepStrip active={1} />}
      >
        <Pair plate={<WhereTheyStand />}>
          <Lead>
            Marketers must determine{" "}
            <Term>where the target audience stands</Term> in relation to the
            product
          </Lead>
        </Pair>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[48ch]">
            Move the consumer through <Tint>buyer-readiness stages</Tint>
          </Big>
          <P className="mt-5">
            Stages include awareness, knowledge, liking, preference,
            conviction, and <strong>purchase</strong>
          </P>
        </Ruled>
        <Figure height="auto">
          <ReadinessStairs />
        </Figure>
        <Pair plateFirst plate={<GuideToPurchase />}>
          <Statement>
            The goal is to guide the consumer toward the{" "}
            <Tint>final purchase decision</Tint>
          </Statement>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="designing-the-message"
        section={1}
        title="Designing the Message"
        strip={<StepStrip active={2} />}
      >
        <Lead className="!max-w-[62ch]">
          The message should <Term>get attention</Term>,{" "}
          <Term>hold interest</Term>, <Term>arouse desire</Term>, and{" "}
          <Term>obtain action</Term>
        </Lead>
        <Figure height="auto">
          <Aida />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            Content choices involve <Tint>rational, emotional, or moral</Tint>{" "}
            appeals
          </Big>
        </Ruled>
        <Figure height="auto">
          <ThreeAppeals />
        </Figure>
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Structure decisions</Term> determine whether
                to draw a conclusion or leave it to the audience
              </>
            }
            plate={<ConcludeOrLeave />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Format considerations</Term> include design,
                layout, color, and sound
              </>
            }
            plate={<AdFormat />}
          />
        </Columns>
      </TopicSlide>

      {/* ================================================================
          Part 3 — Budget and Measurement
          ================================================================ */}
      <TopicSlide
        id="setting-the-promotional-budget"
        section={2}
        title="Setting the Promotional Budget"
      >
        <Columns className="lg:gap-y-16">
          <PlateColumn
            tone="ink"
            text={
              <Defined label="Affordable Method:" tone="ink">
                Setting the budget at the level management thinks the company
                can afford
              </Defined>
            }
            plate={<Affordable />}
          />
          <PlateColumn
            tone="ink"
            text={
              <Defined label="Percentage-of-Sales Method:" tone="ink">
                Setting the budget at a certain percentage of current or
                forecasted sales
              </Defined>
            }
            plate={<PercentOfSales />}
          />
          <PlateColumn
            tone="counter"
            text={
              <Defined label="Competitive-Parity Method:" tone="counter">
                Setting the budget to match competitors&apos; outlays
              </Defined>
            }
            plate={<Parity />}
          />
          <PlateColumn
            tone="signal"
            text={
              <Defined label="Objective-and-Task Method:">
                Developing the budget by defining specific objectives and
                determining the tasks needed to achieve them
              </Defined>
            }
            plate={<ObjectiveTask />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="objective-and-task-method-advantage"
        section={2}
        title="Objective and Task Method Advantage"
        strip={<MethodStrip active={3} />}
      >
        <Pair plate={<Assumptions />}>
          <Lead>
            Forces management to <Term>spell out its assumptions</Term> about
            the relationship between dollars spent and promotion results
          </Lead>
        </Pair>
        <Statement className="mt-16 !max-w-[34ch]">
          The <Tint>most logical approach</Tint> to budget setting
        </Statement>
        <Figure height="auto">
          <LogicChain />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                Ensures spending is <Term>tied directly to strategic goals</Term>
              </>
            }
            plate={<TiedToGoals />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Often the <Term tone="counter">most difficult</Term> method to
                use effectively due to prediction challenges
              </>
            }
            plate={<PredictionFan />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="measuring-effectiveness"
        section={2}
        title="Measuring Effectiveness"
      >
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                Evaluating the <Term>return on investment</Term> for
                promotional activities
              </>
            }
            plate={<Roi />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Asking the target audience whether they{" "}
                <Term>remember the message</Term>
              </>
            }
            plate={<Remember />}
          />
        </Columns>
        <Pair plateFirst plate={<SeenRecall />} className="mt-16">
          <Ruled tone="signal">
            <Big>
              Measuring <Tint>how many times they saw it</Tint> and{" "}
              <Tint>what points they recall</Tint>
            </Big>
          </Ruled>
        </Pair>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[56ch]">
            Analyzing changes in <Tint>sales and market share</Tint> resulting
            from the campaign
          </Big>
        </Ruled>
        <Figure height="auto">
          <SalesShare />
        </Figure>
      </TopicSlide>

      <Slide id="discussion-budgeting-strategies" border>
        <Heading kicker="Discussion:" tone="counter">
          Budgeting Strategies
        </Heading>
        <Figure height="auto" className="!mt-0">
          <StartupSlice />
        </Figure>
        <Prompt>
          If a startup uses the{" "}
          <Tint tone="counter">percentage-of-sales method</Tint> during its
          first year when sales are low, how might this impact their ability to
          build <Tint>brand awareness</Tint>, and what alternative method might
          be more appropriate?
        </Prompt>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion-integrated-marketing-communications" border>
        <Heading kicker="Conclusion:">
          Integrated Marketing Communications
        </Heading>
        <ol className="grid w-full gap-x-14 gap-y-12 md:grid-cols-2">
          {[
            {
              glyph: <GlyphMix />,
              text: "The promotion mix consists of advertising, PR, sales promotion, personal selling, and digital marketing",
            },
            {
              glyph: <GlyphTogether />,
              text: "IMC ensures all promotional tools work together to deliver a consistent message",
            },
            {
              glyph: <GlyphAudience />,
              text: "Effective communication requires understanding the audience and setting clear objectives",
            },
            {
              glyph: <GlyphBudget />,
              text: "Strategic budgeting and measurement are essential for maximizing promotional impact",
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
