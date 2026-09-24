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
  ChannelGlyph,
  type ChannelKind,
  FormatGlyph,
  type FormatKind,
  Transition,
  MediaTimeline,
  Precision,
  Blend,
  LegacyGap,
  ConsistencyDrift,
  ToolPile,
  Expectation,
  DeviceBoundary,
  ChannelsConnect,
  TrackAdjust,
  Broadcast,
  Conversation,
  SharedCampaign,
  CoCreators,
  EcosystemHub,
  OwnedPaidEarned,
  Foundation,
  Serp,
  SeoThree,
  SeoTraffic,
  AlgorithmSieve,
  KeywordAuction,
  QueryTarget,
  Monitoring,
  ContentCadence,
  AttractRetainAct,
  EducateEntertain,
  Retention,
  Segmented,
  JourneyTriggers,
  ValueOrFlood,
  SeoSemFork,
  RelationshipShift,
  Storytelling,
  Community,
  Humanize,
  SupportThread,
  PlatformAudiences,
  VisualPlatform,
  ProfessionalNetwork,
  ShortFormVideo,
  EngagementStairs,
  InteractivePoll,
  ReplyTrust,
  UgcAmplify,
  Listening,
  UnfilteredInsights,
  Escalation,
  InsightToProduct,
  InfluencerNiche,
  TrustRelay,
  MicroVsCeleb,
  Alignment,
  TangledReturn,
  MetricSpan,
  EngagementToRevenue,
  VanityVsObjective,
  DataBoundaries,
  Regulations,
  Protective,
  PrivacyScale,
  DataDilemma,
  GlyphTransformed,
  GlyphFourStrategies,
  GlyphCommunity,
  GlyphEthics,
} from "./visuals";

// ============================================================================
// WEEK 11 — DIGITAL AND SOCIAL MEDIA MARKETING
// ============================================================================
// Every line on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// Colour code for the week: SIGNAL is paid (ads, SEM) and the operative case,
// COUNTER is earned and organic (SEO, shares, reviews) or the risk, INK is
// owned media and the neutral case.
//
// Quizzes: in this route group `Slide` renders `quizData` AFTER its section.
// Each [quiz]-tagged topic carries its own quiz, which tests that slide and
// the ones before it.
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

/** A line set as a serif statement: the line a slide lands on. */
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
 * A slide heading. A "Label:" prefix from the content ("Strategy:",
 * "Discussion:") is set as a small tracked kicker inside the same h2, so the
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

/** Discussion prompt. The line's own "Discussion:" opens it as a kicker. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
      <p className="type-quote !text-[clamp(1.35rem,2.5vw,2.1rem)] max-w-[46ch]">
        <span className="type-label mb-5 block !text-[0.8rem] !text-[var(--counter)]">
          Discussion:
        </span>{" "}
        {children}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Wayfinding
   -------------------------------------------------------------------------- */

const SECTIONS = [
  "Traditional to Digital",
  "SEO, SEM, Content, Email",
  "Social Media Marketing",
  "ROI, Ethics and Privacy",
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

const STRATEGIES: { kind: ChannelKind; name: string }[] = [
  { kind: "seo", name: "SEO" },
  { kind: "sem", name: "SEM" },
  { kind: "content", name: "Content Marketing" },
  { kind: "email", name: "Email Marketing" },
];

/** The four digital strategies as glyphs; the one this slide covers is lit. */
function StrategyStrip({ active }: { active: number }) {
  return (
    <ol aria-hidden className="mb-10 grid w-full grid-cols-4 gap-2 sm:gap-4">
      {STRATEGIES.map((s, i) => {
        const on = i === active;
        const tone = on ? (s.kind === "seo" ? "var(--counter)" : "var(--signal)") : "var(--ink)";
        return (
          <li
            key={s.kind}
            className={cn(
              "flex min-w-0 flex-col items-center gap-2 border-b-2 pb-3",
              on
                ? s.kind === "seo"
                  ? "border-[var(--counter)]"
                  : "border-[var(--signal)]"
                : "border-[var(--rule)] opacity-45",
            )}
          >
            <ChannelGlyph kind={s.kind} tone={tone} size={52} />
            <span
              className={cn(
                "hidden sm:block text-center text-[0.72rem] leading-tight",
                on ? "font-semibold text-[var(--ink)]" : "text-[var(--ink-3)]",
              )}
            >
              {s.name}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** A topic slide: part strip, heading, optional strip, then the content. */
function TopicSlide({
  id,
  section,
  kicker,
  title,
  strip,
  children,
}: {
  id: string;
  section: number;
  kicker?: string;
  title: string;
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

const numerals = `.step-n::before { content: attr(data-n); }`;

const FORMATS: { kind: FormatKind; name: string }[] = [
  { kind: "blog", name: "blog posts" },
  { kind: "video", name: "videos" },
  { kind: "infographic", name: "infographics" },
  { kind: "podcast", name: "podcasts" },
];

/** "Formats include blog posts, videos, …": each format sits over its glyph. */
function FormatRow() {
  return (
    <div className="w-full border-t-2 border-[var(--ink)] pt-6">
      <p className="type-h2 !font-normal">
        Formats include
        <span className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
          {FORMATS.map((f, i) => (
            <span key={f.kind} className="flex min-w-0 flex-col items-start gap-4">
              <FormatGlyph kind={f.kind} size={88} />
              <span className="text-[var(--signal)]">
                {" "}
                {i === FORMATS.length - 1 ? "and " : ""}
                {f.name}
                {i === FORMATS.length - 1 ? "" : ","}
              </span>
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}

export default function Week11() {
  return (
    <SlideDeck label="Week 11">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 11 · Introduction to Marketing</Subtitle>
        <p className="type-lead mt-6 !text-[var(--ink)]">
          Welcome to Week 11
        </p>
        <Title className="mt-4 !max-w-[20ch]">
          Digital and Social Media{" "}
          <span className="text-[var(--signal)]">Marketing</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <div className="mt-12 w-full max-w-4xl">
          <div className="figure-well w-full p-3 sm:p-6">
            <Transition />
          </div>
        </div>
        <p className="type-lead mx-auto mt-10 max-w-[48ch] text-center">
          Exploring the transition from{" "}
          <span className="text-[var(--ink)]">traditional strategies</span> to{" "}
          <span className="text-[var(--signal)]">digital ecosystems</span>
        </p>
      </Slide>

      {/* ================================================================
          Part 1 — Traditional to Digital
          ================================================================ */}
      <TopicSlide
        id="the-evolution-traditional-to-digital"
        section={0}
        kicker="The Evolution:"
        title="Traditional to Digital"
      >
        <Lead className="!max-w-[62ch]">
          Marketing has shifted from{" "}
          <Term tone="ink">static, one-way communication</Term> to{" "}
          <Term>interactive dialogues</Term>
        </Lead>
        <Figure height="auto">
          <MediaTimeline />
        </Figure>
        <Ruled tone="ink" className="w-full">
          <Big className="max-w-[56ch]">
            Traditional channels relied on mass broadcast models like print,
            radio, and television
          </Big>
        </Ruled>
        <Columns className="mt-16">
          <PlateColumn
            tone="signal"
            text={
              <>
                Digital platforms enable <Term>precision targeting</Term> and{" "}
                <Term tone="counter">measurable engagement</Term>
              </>
            }
            plate={<Precision />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                The modern marketer must blend{" "}
                <Term tone="ink">traditional principles</Term> with{" "}
                <Term>digital agility</Term>
              </>
            }
            plate={<Blend />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="the-problem-adapting-to-digital-channels"
        section={0}
        kicker="The Problem:"
        title="Adapting to Digital Channels"
      >
        <Lead className="!max-w-[62ch]">
          Companies often <Term tone="counter">struggle to transition</Term>{" "}
          legacy operations into the digital space
        </Lead>
        <Figure height="auto">
          <LegacyGap />
        </Figure>
        <Columns>
          <PlateColumn
            tone="counter"
            text={
              <>
                Maintaining <Term tone="counter">brand consistency</Term> across
                multiple fast-paced platforms is challenging
              </>
            }
            plate={<ConsistencyDrift />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                The <Term tone="counter">sheer volume</Term> of digital tools can
                overwhelm organizations without a clear strategy
              </>
            }
            plate={<ToolPile />}
          />
        </Columns>
        <Statement className="mt-16 !max-w-[34ch]">
          Customers now expect <Tint>immediate, personalized</Tint> responses
          from brands
        </Statement>
        <Figure height="auto">
          <Expectation />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="what-is-digital-marketing"
        section={0}
        kicker="Core Concept:"
        title="What is Digital Marketing?"
      >
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[52ch]">
            Digital marketing encompasses{" "}
            <Tint>all marketing efforts</Tint> that use an electronic device or
            the internet
          </Big>
        </Ruled>
        <Figure height="auto">
          <DeviceBoundary />
        </Figure>
        <Lead className="!max-w-[68ch]">
          Businesses leverage digital channels such as{" "}
          <Term tone="ink">
            search engines, social media, email, and other websites
          </Term>{" "}
          to connect with current and prospective customers
        </Lead>
        <Figure height="auto">
          <ChannelsConnect />
        </Figure>
        <Statement className="!max-w-[36ch]">
          It allows for <Tint>real-time tracking</Tint>,{" "}
          <Tint tone="counter">immediate feedback</Tint>, and{" "}
          <Tint>rapid campaign adjustment</Tint>
        </Statement>
        <Figure height="auto">
          <TrackAdjust />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="the-paradigm-shift-interactive-vs-broadcast-marketing"
        section={0}
        kicker="The Paradigm Shift:"
        title="Interactive vs. Broadcast Marketing"
      >
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                Traditional broadcast marketing delivers a{" "}
                <Term tone="ink">uniform message</Term> to a broad audience
              </>
            }
            plate={<Broadcast />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                Interactive digital marketing invites consumers to participate
                in a <Term>two-way conversation</Term>
              </>
            }
            plate={<Conversation />}
          />
        </Columns>
        <Ruled tone="counter" className="mt-16 w-full">
          <Big className="max-w-[56ch]">
            Campaigns are now designed to be <Tint tone="counter">shared</Tint>,
            commented on, and <Tint>personalized</Tint>
          </Big>
        </Ruled>
        <Figure height="auto">
          <SharedCampaign />
        </Figure>
        <Pair plateFirst plate={<CoCreators />}>
          <Statement>
            This shift empowers consumers, making them{" "}
            <Tint tone="counter">co-creators of brand value</Tint>
          </Statement>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="the-digital-marketing-ecosystem"
        section={0}
        title="The Digital Marketing Ecosystem"
      >
        <Figure height="auto" className="!mt-0">
          <EcosystemHub />
        </Figure>
        <Lead className="!max-w-[62ch]">
          The digital ecosystem is a{" "}
          <Term tone="ink">complex network</Term> of interconnected channels
          and platforms
        </Lead>
        <Ruled tone="ink" className="mt-12 w-full">
          <Big className="max-w-[60ch]">
            It includes <Term tone="ink">owned media</Term> (websites),{" "}
            <Tint>paid media</Tint> (ads), and{" "}
            <Tint tone="counter">earned media</Tint> (shares and reviews)
          </Big>
        </Ruled>
        <Figure height="auto">
          <OwnedPaidEarned />
        </Figure>
        <Statement className="!max-w-[36ch]">
          A successful digital strategy <Tint>seamlessly integrates</Tint> these
          different elements
        </Statement>
        <Pair plate={<Foundation />} className="mt-16">
          <Ruled tone="ink">
            <Big>
              <Term tone="ink">Data analytics</Term> forms the foundation,
              guiding decisions across the entire ecosystem
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      {/* ================================================================
          Part 2 — SEO, SEM, Content, Email
          ================================================================ */}
      <TopicSlide
        id="strategy-search-engine-optimization-seo"
        section={1}
        kicker="Strategy:"
        title="Search Engine Optimization (SEO)"
        strip={<StrategyStrip active={0} />}
      >
        <Pair plate={<Serp mode="organic" />}>
          <Lead>
            SEO is the practice of optimizing web content to{" "}
            <Term tone="counter">rank higher in organic</Term> search engine
            results
          </Lead>
        </Pair>
        <Ruled tone="counter" className="mt-16 w-full">
          <Big className="max-w-[60ch]">
            It involves <Tint tone="counter">technical website adjustments</Tint>
            , <Tint tone="counter">keyword research</Tint>, and{" "}
            <Tint tone="counter">high-quality content creation</Tint>
          </Big>
        </Ruled>
        <Figure height="auto">
          <SeoThree />
        </Figure>
        <Statement className="!max-w-[38ch]">
          A strong SEO foundation builds{" "}
          <Tint tone="counter">long-term, sustainable traffic</Tint> without
          direct advertising costs
        </Statement>
        <Figure height="auto">
          <SeoTraffic />
        </Figure>
        <Ruled tone="ink" className="w-full">
          <Big className="max-w-[56ch]">
            The algorithm prioritizes <Tint tone="counter">user intent</Tint>,{" "}
            <Tint tone="counter">relevance</Tint>, and{" "}
            <Tint tone="counter">website authority</Tint>
          </Big>
        </Ruled>
        <Figure height="auto">
          <AlgorithmSieve />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="strategy-search-engine-marketing-sem"
        section={1}
        kicker="Strategy:"
        title="Search Engine Marketing (SEM)"
        strip={<StrategyStrip active={1} />}
      >
        <Pair plate={<Serp mode="paid" />}>
          <Lead>
            SEM focuses on gaining visibility through{" "}
            <Term>paid search advertising</Term>
          </Lead>
        </Pair>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[56ch]">
            Advertisers <Tint>bid on keywords</Tint> to appear at the top of
            search engine results pages
          </Big>
        </Ruled>
        <Figure height="auto">
          <KeywordAuction />
        </Figure>
        <Columns>
          <PlateColumn
            tone="signal"
            text={
              <>
                It provides <Term>immediate visibility</Term> and precise
                targeting based on user search queries
              </>
            }
            plate={<QueryTarget />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                Campaigns require <Term tone="ink">constant monitoring</Term>{" "}
                and budget optimization to maximize return on ad spend
              </>
            }
            plate={<Monitoring />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="strategy-content-marketing"
        section={1}
        kicker="Strategy:"
        title="Content Marketing"
        strip={<StrategyStrip active={2} />}
      >
        <Lead className="!max-w-[66ch]">
          Content marketing is a strategic approach focused on creating and
          distributing <Term>valuable, relevant, and consistent</Term> content
        </Lead>
        <Figure height="auto">
          <ContentCadence />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[60ch]">
            The goal is to <Tint>attract</Tint> and{" "}
            <Tint tone="counter">retain</Tint> a clearly defined audience and
            ultimately drive <Tint>profitable customer action</Tint>
          </Big>
        </Ruled>
        <Figure height="auto">
          <AttractRetainAct />
        </Figure>
        <Pair plateFirst plate={<EducateEntertain />} className="mb-16">
          <Statement>
            Effective content <Tint>educates or entertains</Tint> rather than
            directly selling a product
          </Statement>
        </Pair>
        <FormatRow />
      </TopicSlide>

      <TopicSlide
        id="strategy-email-marketing-campaigns"
        section={1}
        kicker="Strategy:"
        title="Email Marketing Campaigns"
        strip={<StrategyStrip active={3} />}
      >
        <Pair plate={<Retention />}>
          <Lead>
            Email marketing remains one of the most effective direct channels
            for <Term tone="counter">customer retention</Term>
          </Lead>
        </Pair>
        <Ruled tone="ink" className="mt-16 w-full">
          <Big className="max-w-[56ch]">
            It allows for highly <Tint>personalized</Tint> and{" "}
            <Tint>segmented</Tint> communication based on user behavior
          </Big>
        </Ruled>
        <Figure height="auto">
          <Segmented />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[56ch]">
            <Tint>Automation tools</Tint> can trigger specific messages during
            critical points in the customer journey
          </Big>
        </Ruled>
        <Figure height="auto">
          <JourneyTriggers />
        </Figure>
        <Statement className="!max-w-[40ch]">
          Success relies on <Tint>delivering value</Tint> rather than{" "}
          <Tint tone="counter">overwhelming subscribers</Tint> with promotional
          material
        </Statement>
        <Figure height="auto">
          <ValueOrFlood />
        </Figure>
      </TopicSlide>

      <Slide id="discussion-seo-vs-sem-investment" border>
        <SectionStrip active={1} className="mb-12 md:mb-16" />
        <Heading kicker="Discussion:" tone="counter">
          SEO vs. SEM Investment
        </Heading>
        <Figure height="auto" className="!mt-0">
          <SeoSemFork />
        </Figure>
        <Prompt>
          A startup has limited funds and must decide whether to invest
          entirely in <Tint>immediate SEM campaigns</Tint> for quick sales or{" "}
          <Tint tone="counter">long-term SEO strategy</Tint> for sustainable
          growth. Which path creates a more resilient digital presence?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3 — Social Media Marketing
          ================================================================ */}
      <TopicSlide
        id="the-power-of-social-media-marketing"
        section={2}
        title="The Power of Social Media Marketing"
      >
        <Lead className="!max-w-[62ch]">
          Social media platforms have <Term>transformed</Term> how brands build
          relationships with consumers
        </Lead>
        <Figure height="auto">
          <RelationshipShift />
        </Figure>
        <Ruled tone="ink" className="w-full">
          <Big className="max-w-[56ch]">
            They provide unique opportunities for <Tint>storytelling</Tint> and{" "}
            <Tint tone="counter">community building</Tint>
          </Big>
        </Ruled>
        <div className="mt-10 grid w-full gap-12 lg:grid-cols-2 lg:gap-14">
          <Plate>
            <Storytelling />
          </Plate>
          <Plate>
            <Community />
          </Plate>
        </div>
        <Columns className="mt-16">
          <PlateColumn
            tone="signal"
            text={
              <>
                Brands can <Term>humanize their image</Term> by interacting
                directly with users
              </>
            }
            plate={<Humanize />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                Social platforms serve as crucial touchpoints for{" "}
                <Term tone="ink">customer service and support</Term>
              </>
            }
            plate={<SupportThread />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="social-media-platforms-and-demographics"
        section={2}
        title="Social Media Platforms and Demographics"
      >
        <Lead className="!max-w-[64ch]">
          Different platforms attract <Term tone="ink">distinct user demographics</Term>{" "}
          and require <Term>tailored content strategies</Term>
        </Lead>
        <Figure height="auto">
          <PlatformAudiences />
        </Figure>
        <div className="grid w-full items-start gap-12 lg:grid-cols-3 lg:gap-10">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Visual platforms</Term> excel in lifestyle and product
                showcasing
              </>
            }
            plate={<VisualPlatform />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                <Term tone="ink">Professional networks</Term> are essential for
                B2B marketing and corporate branding
              </>
            }
            plate={<ProfessionalNetwork />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Short-form video platforms</Term> dominate
                younger demographics and trend creation
              </>
            }
            plate={<ShortFormVideo />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="strategy-building-customer-engagement"
        section={2}
        kicker="Strategy:"
        title="Building Customer Engagement"
      >
        <Lead className="!max-w-[62ch]">
          Engagement goes beyond likes and follows to foster{" "}
          <Term>genuine brand advocacy</Term>
        </Lead>
        <Figure height="auto">
          <EngagementStairs />
        </Figure>
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                Brands must create <Term tone="ink">interactive content</Term>{" "}
                that encourages user participation and sharing
              </>
            }
            plate={<InteractivePoll />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Prompt and authentic responses</Term> to comments and
                messages build trust
              </>
            }
            plate={<ReplyTrust />}
          />
        </Columns>
        <Statement className="mt-16 !max-w-[38ch]">
          <Tint tone="counter">User-generated content</Tint> can be leveraged to
          amplify reach and credibility
        </Statement>
        <Figure height="auto">
          <UgcAmplify />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="the-concept-social-listening"
        section={2}
        kicker="The Concept:"
        title="Social Listening"
      >
        <Lead className="!max-w-[66ch]">
          Social listening involves <Term>monitoring digital conversations</Term>{" "}
          to understand what customers are saying about a brand or industry
        </Lead>
        <Figure height="auto">
          <Listening />
        </Figure>
        <Ruled tone="ink" className="w-full">
          <Big className="max-w-[58ch]">
            It provides <Tint>unfiltered insights</Tint> into customer
            sentiment, pain points, and emerging trends
          </Big>
        </Ruled>
        <Figure height="auto">
          <UnfilteredInsights />
        </Figure>
        <Statement className="!max-w-[38ch]">
          Brands can <Tint>proactively address issues</Tint> before they
          escalate into <Tint tone="counter">crises</Tint>
        </Statement>
        <Figure height="auto">
          <Escalation />
        </Figure>
        <Pair plateFirst plate={<InsightToProduct />}>
          <Ruled tone="signal">
            <Big>
              These insights can directly inform{" "}
              <Tint>product development and marketing strategies</Tint>
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="strategy-influencer-marketing"
        section={2}
        kicker="Strategy:"
        title="Influencer Marketing"
      >
        <Lead className="!max-w-[68ch]">
          Influencer marketing partners with individuals who have a{" "}
          <Term tone="ink">dedicated social following</Term> and are viewed as{" "}
          <Term tone="counter">experts within their niche</Term>
        </Lead>
        <Figure height="auto">
          <InfluencerNiche />
        </Figure>
        <Pair plate={<TrustRelay />}>
          <Statement>
            It relies on the <Tint tone="counter">trust</Tint> that influencers
            have built with their audience
          </Statement>
        </Pair>
        <Ruled tone="signal" className="mt-16 w-full">
          <Big className="max-w-[56ch]">
            <Tint tone="counter">Micro-influencers</Tint> often yield{" "}
            <Tint>higher engagement rates</Tint> than high-profile celebrities
          </Big>
        </Ruled>
        <Figure height="auto">
          <MicroVsCeleb />
        </Figure>
        <Pair plateFirst plate={<Alignment />}>
          <Ruled tone="ink">
            <Big>
              Successful partnerships require{" "}
              <Tint>authentic alignment</Tint> between the brand and the
              influencer
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      {/* ================================================================
          Part 4 — ROI, Ethics and Privacy
          ================================================================ */}
      <TopicSlide
        id="the-challenge-measuring-roi"
        section={3}
        kicker="The Challenge:"
        title="Measuring ROI"
      >
        <Lead className="!max-w-[64ch]">
          Measuring the <Term>exact return on investment</Term> for digital and
          social campaigns remains <Term tone="counter">complex</Term>
        </Lead>
        <Figure height="auto">
          <TangledReturn />
        </Figure>
        <Ruled tone="ink" className="w-full">
          <Big className="max-w-[60ch]">
            Marketers must navigate a <Tint tone="counter">multitude of metrics</Tint>
            , from click-through rates to conversion attribution models
          </Big>
        </Ruled>
        <Figure height="auto">
          <MetricSpan />
        </Figure>
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                Tying social engagement directly to revenue requires{" "}
                <Term tone="ink">sophisticated analytics tracking</Term>
              </>
            }
            plate={<EngagementToRevenue />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                The focus must remain on metrics that align with{" "}
                <Term>overarching business objectives</Term> rather than vanity
                numbers
              </>
            }
            plate={<VanityVsObjective />}
          />
        </Columns>
      </TopicSlide>

      <TopicSlide
        id="ethics-and-privacy-in-digital-marketing"
        section={3}
        title="Ethics and Privacy in Digital Marketing"
      >
        <Lead className="!max-w-[64ch]">
          Digital marketing strategies must navigate complex{" "}
          <Term tone="counter">ethical boundaries</Term> regarding consumer data
        </Lead>
        <Figure height="auto">
          <DataBoundaries />
        </Figure>
        <Columns>
          <PlateColumn
            tone="ink"
            text={
              <>
                Increasing regulations require{" "}
                <Term tone="counter">transparent</Term> data collection and
                usage practices
              </>
            }
            plate={<Regulations />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                Consumers are becoming more{" "}
                <Term tone="counter">protective</Term> of their personal
                information
              </>
            }
            plate={<Protective />}
          />
        </Columns>
        <Statement className="mt-16 !max-w-[38ch]">
          Building trust requires prioritizing{" "}
          <Tint tone="counter">user privacy</Tint> over{" "}
          <Tint>aggressive data harvesting</Tint>
        </Statement>
        <Figure height="auto">
          <PrivacyScale />
        </Figure>
      </TopicSlide>

      <Slide id="discussion-navigating-data-privacy" border>
        <SectionStrip active={3} className="mb-12 md:mb-16" />
        <Heading kicker="Discussion:" tone="counter">
          Navigating Data Privacy
        </Heading>
        <Figure height="auto" className="!mt-0">
          <DataDilemma />
        </Figure>
        <Prompt>
          A marketing team realizes that using{" "}
          <Tint>third-party data</Tint> will double their ad conversion rate
          but risks alienating customers concerned about surveillance. Should
          they prioritize the campaign&apos;s success or strictly adhere to{" "}
          <Tint tone="counter">first-party data</Tint>?
        </Prompt>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion-digital-and-social-media-marketing" border>
        <Heading kicker="Conclusion:">Digital and Social Media Marketing</Heading>
        <ol className="grid w-full gap-x-14 gap-y-12 md:grid-cols-2">
          {[
            {
              glyph: <GlyphTransformed />,
              text: "Digital channels have fundamentally transformed the marketing landscape",
            },
            {
              glyph: <GlyphFourStrategies />,
              text: "A comprehensive strategy must integrate SEO, SEM, content, and email marketing",
            },
            {
              glyph: <GlyphCommunity />,
              text: "Social media offers unparalleled opportunities for community building and engagement",
            },
            {
              glyph: <GlyphEthics />,
              text: "Ethical data practices and continuous adaptation are crucial for long-term digital success",
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
