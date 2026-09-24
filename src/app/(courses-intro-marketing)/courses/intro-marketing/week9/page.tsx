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
  ProductionToConsumption,
  Interdependent,
  MakeAvailable,
  ChannelSpan,
  LargerNetwork,
  NetworkMembers,
  SystemPerformance,
  InformationHub,
  MoreThanAlone,
  FourResources,
  AssortmentTransform,
  FnInformation,
  FnPromotion,
  FnContacting,
  FnNegotiating,
  FnPhysical,
  FnFinancing,
  LevelLayer,
  ChannelLength,
  DirectChannel,
  IndirectLevels,
  ControlComplexity,
  TwoRoutes,
  BehavioralSystem,
  ThreeGoals,
  WorkTogether,
  GoalsRolesRewards,
  HorizontalConflict,
  VerticalConflict,
  SeparateBusinesses,
  VmsCascade,
  ThreePowers,
  EconomiesImpact,
  CorporateVms,
  ContractualVms,
  AdministeredVms,
  MultiChannels,
  ComplexMarkets,
  CoverageAndConflict,
  CutOut,
  NewIntermediaries,
  OpportunityThreat,
  StreamingBypass,
  ThreeDomains,
  SoldToWhom,
  EfficientFlow,
  FinalSteps,
  ShopperToBuyer,
  TargetAndPositioning,
  BetterOrCheaper,
  ManySmallCustomers,
  HoldInventory,
  PlanImplementControl,
  FourRights,
  ThreeDistributions,
  UpstreamDownstream,
  ServiceAndCost,
  SupplyFunctions,
  OutsourceLogistics,
  ThreeGains,
  ComplexEnvironment,
  GlyphLink,
  GlyphBalance,
  GlyphAdvantage,
} from "./visuals";

// ============================================================================
// WEEK 09 — SUPPLY CHAIN AND DISTRIBUTION CHANNELS (THE THIRD P)
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx and reuse the words of the slide they illustrate.
//
// Colour carries meaning across the week: SIGNAL marks whatever the channel
// or its members do, INK the producer's own side, COUNTER the outward and
// contrasting case (the wider network, the conflict, the upstream flow).
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
    <div className={cn("min-w-0 border-t-2 pt-5", BORDER[tone], className)}>
      {children}
    </div>
  );
}

/**
 * A slide heading. When the content gives a "Label:" prefix ("Module 1:",
 * "Discussion:") it is set as a small tracked kicker inside the same h2, so
 * the heading text stays exactly as written.
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
   Wayfinding: the three modules of the week
   -------------------------------------------------------------------------- */

const SECTIONS = [
  "The Nature of Marketing Channels",
  "Channel Behavior and Organization",
  "Retailing, Wholesaling, and Logistics",
];

/**
 * The three modules as a strip. On each topic slide the current one is lit
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

/** A topic slide: module strip, heading, then the slide's content. */
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

/** A module opener: outlined numeral, "Module N:" kicker, and the strip lit. */
function ModulePlate({
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
          className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[7rem] xl:text-[13rem]"
          style={{ ...SERIF, fontVariationSettings: '"opsz" 144, "WONK" 1' }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="type-display !text-[clamp(2.4rem,5.4vw,4.5rem)] max-w-[18ch]">
            <span className="type-label block mb-6 !text-[0.8rem]">
              {`Module ${n}:`}
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
        "grid w-full items-center gap-6 border-t-2 py-8 md:grid-cols-[minmax(0,27rem)_1fr] md:gap-12",
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
      className={cn("grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14", className)}
    >
      {plateFirst ? <Plate>{plate}</Plate> : null}
      {children}
      {plateFirst ? null : <Plate>{plate}</Plate>}
    </div>
  );
}

/** The four Ps, with Place lit: where this week sits in the mix. */
function MixStrip() {
  return (
    <ol
      aria-hidden
      className="mx-auto mt-10 grid w-full max-w-2xl grid-cols-4 gap-3"
    >
      {["Product", "Price", "Place", "Promotion"].map((p, i) => (
        <li
          key={p}
          className={cn(
            "border-t-2 pt-3 text-center text-[clamp(1rem,1.6vw,1.35rem)]",
            i === 2
              ? "border-[var(--signal)] text-[var(--signal)]"
              : i < 2
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

export default function Week9() {
  return (
    <SlideDeck
      label="Week 09"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 09 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">
          Supply Chain and Distribution Channels{" "}
          <span className="text-[var(--signal)]">(The Third P)</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">Welcome to Week 9.</p>
          <p className="type-lead">
            Today we explore the Third P:{" "}
            <span className="text-[var(--signal)]">Place</span>.
          </p>
        </div>
        <MixStrip />

        <div className="mt-14 w-full max-w-3xl border-t border-[var(--rule)] pt-8">
          <p className="type-body mx-auto text-center">
            We will unpack how products move from{" "}
            <strong className="font-semibold text-[var(--ink)]">
              production
            </strong>{" "}
            to{" "}
            <strong className="font-semibold text-[var(--signal)]">
              consumption
            </strong>
            .
          </p>
          <div className="mx-auto mt-6 w-full max-w-xl">
            <ProductionToConsumption />
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Module 1 — The Nature of Marketing Channels
          ================================================================ */}
      <ModulePlate id="module-1" n={1} title="The Nature of Marketing Channels">
        <div className="mt-10 grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                A <Term>marketing channel</Term> is a set of interdependent
                organizations.
              </>
            }
            plate={<Interdependent />}
          />
          <PlateColumn
            tone="ink"
            text={
              <>
                These organizations help make a product{" "}
                <Term tone="ink">available</Term> for use or consumption.
              </>
            }
            plate={<MakeAvailable />}
          />
        </div>
        <Statement className="mt-16 !max-w-[38ch]">
          They <Tint>bridge the gap</Tint> between producers and users in terms
          of time, place, and possession.
        </Statement>
        <Figure height="auto">
          <ChannelSpan />
        </Figure>
      </ModulePlate>

      <TopicSlide
        id="the-value-delivery-network"
        section={0}
        title="The Value Delivery Network"
      >
        <Lead className="!max-w-[58ch]">
          Marketing channels are part of a{" "}
          <Term tone="counter">larger value delivery network</Term>.
        </Lead>
        <Figure height="auto">
          <LargerNetwork />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[48ch]">
            This network includes the{" "}
            <Tint tone="counter">
              company, suppliers, distributors, and customers
            </Tint>
            .
          </Big>
        </Ruled>
        <Figure height="auto">
          <NetworkMembers />
        </Figure>
        <Pair plate={<SystemPerformance />}>
          <Ruled tone="counter">
            <Big>
              Everyone partners to improve the performance of the{" "}
              <Tint tone="counter">entire system</Tint>.
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="how-channels-add-value"
        section={0}
        title="How Channels Add Value"
      >
        <Figure height="auto">
          <InformationHub />
        </Figure>
        <Pair plateFirst plate={<MoreThanAlone />}>
          <Ruled tone="signal">
            <Big>
              Intermediaries offer the firm{" "}
              <Tint>more than it can achieve on its own</Tint>.
            </Big>
          </Ruled>
        </Pair>
        <Ruled className="mt-16 w-full">
          <Big className="max-w-[50ch]">
            They provide <Term tone="ink">contacts</Term>,{" "}
            <Term tone="ink">experience</Term>,{" "}
            <Term tone="ink">specialization</Term>, and{" "}
            <Term>scale of operation</Term>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <FourResources />
        </Figure>
        <Statement className="mt-4 !max-w-[36ch]">
          They <Tint>transform the assortments</Tint> of products made by
          producers into the assortments wanted by consumers.
        </Statement>
        <Figure height="auto">
          <AssortmentTransform />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="key-functions-of-intermediaries"
        section={0}
        title="Key Functions of Intermediaries"
      >
        <div className="grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Information gathering</Term> about consumers and
                competitors.
              </>
            }
            plate={<FnInformation />}
          />
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Promotion development and dissemination</Term> about an
                offer.
              </>
            }
            plate={<FnPromotion />}
          />
        </div>
        <div className="mt-16 w-full">
          <PlateRow plate={<FnContacting />} tone="signal">
            <Tint>Contacting prospective buyers</Tint> and matching offers to
            meet buyer needs.
          </PlateRow>
        </div>
      </TopicSlide>

      <TopicSlide
        id="additional-functions"
        section={0}
        title="Additional Functions"
      >
        <div className="w-full">
          <PlateRow plate={<FnNegotiating />} tone="ink">
            <Tint>Negotiating price and other terms</Tint> so that ownership can
            be transferred.
          </PlateRow>
          <PlateRow plate={<FnPhysical />} tone="signal">
            <Tint>Physical distribution</Tint> of goods.
          </PlateRow>
          <PlateRow plate={<FnFinancing />} tone="counter">
            <Tint>Financing the channel work</Tint> and taking risks of carrying
            out the channel work.
          </PlateRow>
        </div>
      </TopicSlide>

      <TopicSlide id="channel-levels" section={0} title="Channel Levels">
        <Lead className="!max-w-[62ch]">
          A <Term>channel level</Term> is a layer of intermediaries that
          performs some work in bringing the product closer to the final buyer.
        </Lead>
        <Figure height="auto">
          <LevelLayer />
        </Figure>
        <Ruled className="w-full">
          <Big className="max-w-[48ch]">
            The number of intermediary levels indicates the{" "}
            <Term tone="ink">length of a channel</Term>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ChannelLength />
        </Figure>
        <Pair plate={<DirectChannel />}>
          <Ruled tone="signal">
            <Big>
              <Tint>Direct marketing channels</Tint> have no intermediary
              levels.
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="indirect-marketing-channels"
        section={0}
        title="Indirect Marketing Channels"
      >
        <Statement className="!max-w-[34ch]">
          <Tint>Indirect marketing channels</Tint> contain one or more
          intermediary levels.
        </Statement>
        <Figure height="auto">
          <IndirectLevels />
        </Figure>
        <Pair plate={<ControlComplexity />}>
          <div className="flex flex-col gap-10">
            <Ruled>
              <P>
                Common levels include{" "}
                <Term tone="ink">wholesalers, jobbers, and retailers</Term>.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <Big>
                More levels mean <Tint>less control</Tint> and greater channel
                complexity for the producer.
              </Big>
            </Ruled>
          </div>
        </Pair>
      </TopicSlide>

      <Slide id="discussion-direct-vs-indirect-channels" border>
        <Heading kicker="Discussion:" tone="counter">
          Direct vs. Indirect Channels
        </Heading>
        <Figure height="auto">
          <TwoRoutes />
        </Figure>
        <Prompt>
          <PromptKicker /> If you were launching a new organic snack brand,
          would you sell <Tint>directly through your website</Tint> or{" "}
          <Tint tone="counter">pitch to a major grocery chain</Tint>?
        </Prompt>
      </Slide>

      {/* ================================================================
          Module 2 — Channel Behavior and Organization
          ================================================================ */}
      <ModulePlate id="module-2" n={2} title="Channel Behavior and Organization">
        <Lead className="mt-10 !max-w-[56ch]">
          Distribution channels are{" "}
          <Term tone="counter">complex behavioral systems</Term>.
        </Lead>
        <Figure height="auto">
          <BehavioralSystem />
        </Figure>
        <Ruled tone="counter" className="w-full">
          <Big className="max-w-[48ch]">
            People and companies interact to accomplish{" "}
            <Tint tone="counter">individual, company, and channel goals</Tint>.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ThreeGoals />
        </Figure>
        <Pair plate={<WorkTogether />}>
          <Ruled tone="signal">
            <Big>
              Success depends on <Tint>how well the channel members work
              together</Tint>.
            </Big>
          </Ruled>
        </Pair>
      </ModulePlate>

      <TopicSlide id="channel-conflict" section={1} title="Channel Conflict">
        <Lead className="!max-w-[60ch]">
          <Term>Channel conflict</Term> occurs when members disagree over goals,
          roles, and rewards.
        </Lead>
        <Figure height="auto">
          <GoalsRolesRewards />
        </Figure>
        <div className="grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Horizontal conflict</Term> occurs among firms at the same
                level of the channel.
              </>
            }
            plate={<HorizontalConflict />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Vertical conflict</Term> occurs between
                different levels of the same channel.
              </>
            }
            plate={<VerticalConflict />}
          />
        </div>
      </TopicSlide>

      <TopicSlide
        id="conventional-distribution-systems"
        section={1}
        title="Conventional Distribution Systems"
      >
        <Lead className="!max-w-[60ch]">
          Consist of one or more{" "}
          <Term tone="ink">
            independent producers, wholesalers, and retailers
          </Term>
          .
        </Lead>
        <div className="mt-12 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <Big>
              Each is a <Tint>separate business</Tint> seeking to maximize its
              own profits.
            </Big>
          </Ruled>
          <Ruled tone="ink">
            <Big>
              No channel member has much{" "}
              <strong className="font-semibold">control</strong> over the other
              members.
            </Big>
          </Ruled>
        </div>
        <Figure height="auto">
          <SeparateBusinesses />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="vertical-marketing-systems-vms"
        section={1}
        title="Vertical Marketing Systems (VMS)"
      >
        <Statement className="!max-w-[38ch]">
          A <Tint>VMS</Tint> consists of producers, wholesalers, and retailers
          acting as a unified system.
        </Statement>
        <Figure height="auto">
          <VmsCascade />
        </Figure>
        <Ruled className="w-full">
          <Big className="max-w-[56ch]">
            <strong className="font-semibold">One channel member</strong> owns
            the others, has contracts with them, or wields so much power they
            all cooperate.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ThreePowers />
        </Figure>
        <Pair plate={<EconomiesImpact />}>
          <Ruled tone="signal">
            <Big>
              Designed to achieve{" "}
              <Tint>channel economies and maximum impact</Tint>.
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="types-of-vertical-marketing-systems"
        section={1}
        title="Types of Vertical Marketing Systems"
      >
        <div className="w-full">
          <PlateRow plate={<CorporateVms />} tone="signal">
            <Tint>Corporate VMS</Tint> integrates successive stages of
            production and distribution under single ownership.
          </PlateRow>
          <PlateRow plate={<ContractualVms />} tone="ink">
            <strong className="font-semibold">Contractual VMS</strong> consists
            of independent firms at different levels joining together through
            contracts.
          </PlateRow>
          <PlateRow plate={<AdministeredVms />} tone="counter">
            <Tint tone="counter">Administered VMS</Tint> coordinates successive
            stages through the size and power of one of the parties.
          </PlateRow>
        </div>
      </TopicSlide>

      <TopicSlide
        id="multichannel-distribution-systems"
        section={1}
        title="Multichannel Distribution Systems"
      >
        <Lead className="!max-w-[62ch]">
          A <Term>single firm</Term> sets up two or more marketing channels to
          reach one or more customer segments.
        </Lead>
        <Figure height="auto">
          <MultiChannels />
        </Figure>
        <Pair plateFirst plate={<ComplexMarkets />}>
          <Ruled tone="signal">
            <Big>
              Offers advantages for companies facing{" "}
              <Tint>large and complex markets</Tint>.
            </Big>
          </Ruled>
        </Pair>
        <Ruled tone="counter" className="mt-16 w-full">
          <Big className="max-w-[54ch]">
            Expands sales and market coverage but can be{" "}
            <Tint tone="counter">harder to control</Tint> and generate conflict.
          </Big>
        </Ruled>
        <Figure height="auto">
          <CoverageAndConflict />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="the-trend-of-disintermediation"
        section={1}
        title="The Trend of Disintermediation"
      >
        <Statement className="!max-w-[34ch]">
          <Tint>Disintermediation</Tint> occurs when product and service
          producers cut out intermediaries.
        </Statement>
        <Figure height="auto">
          <CutOut />
        </Figure>
        <Pair plate={<NewIntermediaries />}>
          <Ruled tone="signal">
            <Big>
              This includes going{" "}
              <Tint>directly to final buyers</Tint> or displacing traditional
              resellers with new types of intermediaries.
            </Big>
          </Ruled>
        </Pair>
        <Pair plateFirst plate={<OpportunityThreat />} className="mt-16">
          <Ruled tone="counter">
            <Big>
              Presents both <Tint>opportunities</Tint> and{" "}
              <Tint tone="counter">strategic threats</Tint> to established
              firms.
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      <Slide id="discussion-surviving-disintermediation" border>
        <Heading kicker="Discussion:" tone="counter">
          Surviving Disintermediation
        </Heading>
        <Figure height="auto">
          <StreamingBypass />
        </Figure>
        <Prompt>
          <PromptKicker /> As streaming services bypass traditional cable
          providers, how can cable companies adapt to{" "}
          <Tint>remain relevant in the distribution channel</Tint>?
        </Prompt>
      </Slide>

      {/* ================================================================
          Module 3 — Retailing, Wholesaling, and Logistics
          ================================================================ */}
      <ModulePlate
        id="module-3"
        n={3}
        title="Retailing, Wholesaling, and Logistics"
      >
        <Figure height="auto">
          <ThreeDomains />
        </Figure>
        <div className="grid w-full items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <PlateColumn
            tone="signal"
            text={
              <>
                <Term>Retailing</Term> includes all activities involved in
                selling goods directly to final consumers.
              </>
            }
            plate={<SoldToWhom side="retail" />}
          />
          <PlateColumn
            tone="counter"
            text={
              <>
                <Term tone="counter">Wholesaling</Term> includes all activities
                involved in selling goods to those buying for resale or business
                use.
              </>
            }
            plate={<SoldToWhom side="wholesale" />}
          />
        </div>
        <Pair plate={<EfficientFlow />} className="mt-16">
          <Ruled tone="ink">
            <Big>
              <strong className="font-semibold">Logistics management</strong>{" "}
              ensures the efficient flow of materials and final goods.
            </Big>
          </Ruled>
        </Pair>
      </ModulePlate>

      <TopicSlide id="the-role-of-retailing" section={2} title="The Role of Retailing">
        <Lead className="!max-w-[62ch]">
          <Term>Retailers</Term> connect brands with consumers in the final
          steps of the distribution process.
        </Lead>
        <Figure height="auto">
          <FinalSteps />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[56ch]">
            <Tint>Shopper marketing</Tint> focuses the entire marketing process
            on turning shoppers into buyers at the point of sale.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ShopperToBuyer />
        </Figure>
        <Pair plate={<TargetAndPositioning />}>
          <Ruled>
            <Big>
              Retailers must carefully define their{" "}
              <Term tone="ink">target markets and positioning</Term>.
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      <TopicSlide
        id="the-value-of-wholesaling"
        section={2}
        title="The Value of Wholesaling"
      >
        <Statement className="!max-w-[38ch]">
          <Tint>Wholesalers add value</Tint> by performing channel functions
          better or more cost effectively than producers.
        </Statement>
        <Figure height="auto">
          <BetterOrCheaper />
        </Figure>
        <Ruled className="w-full">
          <Big className="max-w-[52ch]">
            They help manufacturers reach{" "}
            <Term tone="ink">many small customers</Term> at a low cost.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ManySmallCustomers />
        </Figure>
        <Ruled tone="signal" className="mt-4 w-full">
          <Big className="max-w-[56ch]">
            They <Tint>hold inventories</Tint>, reducing inventory costs and
            risks to suppliers and customers.
          </Big>
        </Ruled>
        <Figure height="auto">
          <HoldInventory />
        </Figure>
      </TopicSlide>

      <TopicSlide id="marketing-logistics" section={2} title="Marketing Logistics">
        <Lead className="!max-w-[62ch]">
          <Term>Marketing logistics</Term> involves planning, implementing, and
          controlling the physical flow of goods.
        </Lead>
        <Figure height="auto">
          <PlanImplementControl />
        </Figure>
        <Statement className="!max-w-[36ch]">
          Focuses on getting the <Tint>right product</Tint> to the{" "}
          <Tint>right customer</Tint> in the <Tint>right place</Tint> at the{" "}
          <Tint>right time</Tint>.
        </Statement>
        <Figure height="auto">
          <FourRights />
        </Figure>
        <Ruled tone="counter" className="mt-4 w-full">
          <Big className="max-w-[56ch]">
            Involves{" "}
            <Tint tone="counter">
              inbound distribution, outbound distribution, and reverse
              distribution
            </Tint>
            .
          </Big>
        </Ruled>
        <Figure height="auto">
          <ThreeDistributions />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="supply-chain-management"
        section={2}
        title="Supply Chain Management"
      >
        <Lead className="!max-w-[64ch]">
          Managing{" "}
          <Term>upstream and downstream value-added flows</Term> of materials,
          final goods, and related information.
        </Lead>
        <Figure height="auto">
          <UpstreamDownstream />
        </Figure>
        <Pair plate={<ServiceAndCost />}>
          <Ruled tone="signal">
            <Big>
              Aims to <Tint>maximize customer service</Tint> while minimizing
              distribution costs.
            </Big>
          </Ruled>
        </Pair>
        <Ruled className="mt-16 w-full">
          <Big className="max-w-[58ch]">
            Major functions include{" "}
            <Term tone="ink">
              warehousing, inventory management, transportation, and logistics
              information management
            </Term>
            .
          </Big>
        </Ruled>
        <Figure height="auto">
          <SupplyFunctions />
        </Figure>
      </TopicSlide>

      <TopicSlide
        id="third-party-logistics-3pl"
        section={2}
        title="Third-Party Logistics (3PL)"
      >
        <Statement className="!max-w-[34ch]">
          <Tint>Outsourcing logistics functions</Tint> to third-party
          providers.
        </Statement>
        <Figure height="auto">
          <OutsourceLogistics />
        </Figure>
        <Ruled tone="signal" className="w-full">
          <Big className="max-w-[58ch]">
            <Tint>3PL providers</Tint> can help companies save money, improve
            service, and focus on core competencies.
          </Big>
        </Ruled>
        <Figure height="auto">
          <ThreeGains />
        </Figure>
        <Pair plate={<ComplexEnvironment />}>
          <Ruled>
            <Big>
              They understand{" "}
              <Term tone="ink">increasingly complex logistics environments</Term>
              .
            </Big>
          </Ruled>
        </Pair>
      </TopicSlide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <Heading kicker="Conclusion:">
          Supply Chain and Distribution Channels
        </Heading>
        <ol className="grid w-full gap-x-12 gap-y-12 md:grid-cols-3">
          {[
            {
              glyph: <GlyphLink />,
              text: "Distribution channels are the critical link between producers and final consumers.",
            },
            {
              glyph: <GlyphBalance />,
              text: "Choosing the right channel structure balances control, coverage, and cost.",
            },
            {
              glyph: <GlyphAdvantage />,
              text: "Effective channel management and logistics create sustainable competitive advantages.",
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
        <style>{`.step-n::before { content: attr(data-n); }`}</style>
      </Slide>
    </SlideDeck>
  );
}
