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
  TwoUses,
  MarketSplitLane,
  SignOffSheet,
  DecisionTree,
  FormalChecklist,
  Interlock,
  EvCascade,
  BuyingCenterOrg,
  RadiatingRoles,
  RoleMapping,
  BuyingSituations,
  PowerPodium,
  RelationshipRope,
  LifetimeBracket,
  StrategicPartners,
  DeepUnderstanding,
  KamCore,
  KeyAccountShare,
  RetentionLoop,
  BarrierWall,
  JointInnovation,
  DependenceRisk,
  GlyphSplitLane,
  GlyphRadiate,
  GlyphCore,
} from "./visuals";

// ============================================================================
// WEEK 04 — BUSINESS-TO-BUSINESS (B2B) MARKETING
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

export default function Week4() {
  return (
    <SlideDeck
      label="Week 04"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 04 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[18ch]">
          Business-to-Business{" "}
          <span className="text-[var(--signal)]">(B2B)</span> Marketing
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 4 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we will explore Business-to-Business, or B2B, marketing.
          </p>
        </div>

        <p className="type-body mt-14 max-w-3xl border-t border-[var(--rule)] pt-8 text-center [&_a]:whitespace-nowrap">
          We will cover{" "}
          <a href="#part-1" data-n="01" className="toc-link">
            B2B market characteristics
          </a>
          ,{" "}
          <a href="#part-2" data-n="02" className="toc-link">
            buying centers
          </a>
          , and{" "}
          <a href="#part-3" data-n="03" className="toc-link">
            relationship marketing
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
          Part 1 — Characteristics of B2B Markets
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <div className="flex w-full items-end gap-8 xl:gap-12">
          <PartNumeral n={1} className="text-[5rem] xl:text-[6.5rem]" />
          <PartTitle n={1} title="Characteristics of B2B Markets" />
        </div>
        <div className="mt-6 h-px w-full bg-[var(--rule)]" />
        {/* Text on the left, the two uses branching on the right. */}
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead className="!max-w-none">
              B2B marketing involves selling products and services to{" "}
              <Term>other organizations</Term>.
            </Lead>
            <Ruled weight="thin">
              <P>
                These organizations use them to{" "}
                <Term tone="ink">produce other goods</Term>, or for their{" "}
                <Term tone="counter">own operations</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <TwoUses />
          </Plate>
        </div>
        {/* A closing band across the full width. */}
        <p className="type-display mt-10 w-full border-y-2 border-[var(--ink)] py-6 !text-[clamp(1.6rem,2.8vw,2.5rem)] !leading-tight">
          The scale and complexity of B2B transactions{" "}
          <span className="text-[var(--signal)]">differ significantly</span>{" "}
          from B2C.
        </p>
      </Slide>

      <Slide
        id="market-structure-and-demand"
        border
        className="!py-8"
        exercise={exercise["market-structure-and-demand"]}
      >
        <Tag>Buyers and demand</Tag>
        <Heading>Market Structure and Demand</Heading>
        {/* Each sentence stands over the column of the lane that shows it. */}
        <div className="grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled tone="signal">
            <P>
              B2B markets typically have{" "}
              <Term>fewer, but much larger,</Term> buyers than B2C markets.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Demand in B2B markets is{" "}
              <Term tone="counter">derived demand</Term>, meaning it comes
              from consumer demand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              B2B demand is also <Term tone="ink">more inelastic</Term> and{" "}
              <Term>fluctuates more rapidly</Term> than consumer demand.
            </P>
          </Ruled>
        </div>
        <Figure height="auto" dense className="!mt-4">
          <MarketSplitLane />
        </Figure>
      </Slide>

      <Slide id="nature-of-the-buying-unit" border className="!py-8">
        <Tag>More people, more formality</Tag>
        <Heading>Nature of the Buying Unit</Heading>
        {/* Text rail on the left, the purchase order on the right. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement className="!max-w-none !text-[clamp(1.6rem,2.6vw,2.3rem)]">
              A B2B purchase involves{" "}
              <Tint>more decision participants</Tint>.
            </Statement>
            <Ruled tone="signal">
              <P>
                B2B buying involves a{" "}
                <Term>more professional and formalized</Term> purchasing effort.
              </P>
            </Ruled>
            <Ruled tone="counter">
              <P>
                Buyers and sellers work more closely together and build{" "}
                <Term tone="counter">long term relationships</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SignOffSheet />
          </Plate>
        </div>
      </Slide>

      <Slide
        id="types-of-decisions-and-the-decision-process"
        border
        className="!py-8"
        exercise={exercise["types-of-decisions-and-the-decision-process"]}
      >
        <Tag>Complex, formal, dependent</Tag>
        <Heading>Types of Decisions and the Decision Process</Heading>
        {/* A ledger: each sentence on its own ruled line, its drawing at the end. */}
        <ol className="w-full">
          {[
            {
              plate: <DecisionTree />,
              text: (
                <>
                  B2B buyers face <Tint>more complex</Tint> purchasing
                  decisions.
                </>
              ),
            },
            {
              plate: <FormalChecklist />,
              text: (
                <>
                  The B2B buying process is <Tint>highly formalized</Tint>.
                </>
              ),
            },
            {
              plate: <Interlock />,
              text: (
                <>
                  Buyers and sellers are{" "}
                  <Tint tone="counter">highly dependent</Tint> on each other in
                  B2B markets.
                </>
              ),
            },
          ].map((row, i) => (
            <li
              key={i}
              className="grid items-center gap-4 border-t border-[var(--rule)] py-2 first:border-t-2 first:border-[var(--ink)] md:grid-cols-[3rem_minmax(0,1fr)_17.5rem] md:gap-10"
            >
              <span
                aria-hidden
                className="text-[1.6rem] leading-none text-[var(--signal)]"
                style={SERIF}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Big className="!max-w-[30ch]">{row.text}</Big>
              <Plate className="!p-2">{row.plate}</Plate>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide id="discussion-derived-demand" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter">
          Derived Demand
        </KickerHeading>
        {/* The question on the left, the stairs it runs down on the right. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <Prompt>
            <PromptKicker /> If consumer demand for electric vehicles drops,{" "}
            <Tint>how does this derived demand cascade</Tint> through the B2B
            supply chain to affect{" "}
            <Tint tone="counter">
              battery manufacturers and raw material suppliers
            </Tint>
            ?
          </Prompt>
          <Plate className="mx-auto max-w-[33rem]">
            <EvCascade />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 2 — The Organizational Buying Center
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,13rem)_1fr] xl:gap-14">
          <PartNumeral n={2} className="text-[6rem] xl:text-[8rem]" />
          <div className="min-w-0">
            <PartTitle n={2} title="The Organizational Buying Center" />
            <div className="mt-6 h-px w-full bg-[var(--rule)]" />
            <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
              <div className="flex min-w-0 flex-col gap-4">
                <Lead className="!max-w-none">
                  The buying center is the <Term>decision-making unit</Term> of
                  a buying organization.
                </Lead>
                <P className="!max-w-none">
                  It consists of all the individuals and units that play a role
                  in the purchase decision.
                </P>
              </div>
              <Ruled tone="signal">
                <Big>
                  It is not a fixed or formal department, but a{" "}
                  <Tint>set of buying roles</Tint>.
                </Big>
              </Ruled>
            </div>
            <Figure height="auto" dense className="!mb-0">
              <BuyingCenterOrg />
            </Figure>
          </div>
        </div>
      </Slide>

      <Slide
        id="roles-in-the-buying-center"
        border
        className="!py-8"
        exercise={exercise["roles-in-the-buying-center"]}
      >
        <Tag>Users, influencers, buyers</Tag>
        <Heading>Roles in the Buying Center</Heading>
        {/* The three definitions as a rail, the fan of roles beside them. */}
        <div className="grid w-full items-center gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <P>
                <Term>Users</Term> are members of the organization who will
                actually use the product.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <P>
                <Term>Influencers</Term> affect the buying decision by
                providing information or specifications.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <P>
                <Term>Buyers</Term> have formal authority to select the
                supplier and arrange terms.
              </P>
            </Ruled>
          </div>
          <Plate>
            <RadiatingRoles phase="first" />
          </Plate>
        </div>
      </Slide>

      <Slide id="deciders-and-gatekeepers" border className="!py-8">
        <Tag>Approval and access</Tag>
        <Heading>Deciders and Gatekeepers</Heading>
        {/* Two halves: the two new roles on the fan, then who plays them. */}
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col">
            <div className="grid gap-6 md:grid-cols-2">
              <Ruled tone="signal">
                <P>
                  <Term>Deciders</Term> have formal or informal power to select
                  or approve the final suppliers.
                </P>
              </Ruled>
              <Ruled tone="signal">
                <P>
                  <Term>Gatekeepers</Term> control the flow of information to
                  others.
                </P>
              </Ruled>
            </div>
            <Plate className="mt-5">
              <RadiatingRoles phase="second" />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-5 lg:border-l lg:border-[var(--rule)] lg:pl-12">
            <Statement className="!max-w-none !text-[clamp(1.35rem,2vw,1.75rem)]">
              A single person can play <Tint>multiple roles</Tint>, or multiple
              people can play <Tint tone="counter">the same role</Tint>.
            </Statement>
            <Plate className="mx-auto max-w-[28rem]">
              <RoleMapping />
            </Plate>
          </div>
        </div>
      </Slide>

      <Slide
        id="types-of-buying-situations"
        border
        className="!py-8"
        exercise={exercise["types-of-buying-situations"]}
      >
        <Tag>Rebuy to new task</Tag>
        <Heading>Types of Buying Situations</Heading>
        {/* Three definitions over the three panels they name. */}
        <div className="grid w-full gap-8 md:grid-cols-3 md:gap-10">
          {[
            {
              tone: "ink" as const,
              text: (
                <>
                  A <Term tone="ink">straight rebuy</Term> is a routine
                  purchase where the buyer reorders without modifications.
                </>
              ),
            },
            {
              tone: "counter" as const,
              text: (
                <>
                  A <Term tone="counter">modified rebuy</Term> is a situation
                  where the buyer wants to modify product specifications,
                  prices, or suppliers.
                </>
              ),
            },
            {
              tone: "signal" as const,
              text: (
                <>
                  A <Term>new task</Term> is a situation where the buyer
                  purchases a product or service for the first time.
                </>
              ),
            },
          ].map((col, i) => (
            <Ruled key={i} tone={col.tone}>
              <span
                aria-hidden
                className="mb-3 block text-[2rem] leading-none text-[var(--signal)]"
                style={SERIF}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="type-lead !max-w-none !text-[var(--ink-2)]">
                {col.text}
              </p>
            </Ruled>
          ))}
        </div>
        <Figure height="auto" dense className="!mt-6">
          <BuyingSituations />
        </Figure>
      </Slide>

      <Slide id="discussion-buying-center-dynamics" border className="!py-8">
        {/* Centred: the question between two hairlines, the podium below. */}
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="type-h1">
            <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            Buying Center Dynamics
          </h2>
          <div className="mt-8 w-full max-w-5xl border-y-2 border-[var(--counter)] px-4 py-8 md:px-12">
            <p className="type-quote mx-auto !max-w-[42ch] !text-[clamp(1.45rem,2.6vw,2.2rem)]">
              <span className="type-label mb-5 block !text-[0.8rem] !leading-none !text-[var(--counter)]">
                Discussion:
              </span>{" "}
              In a <Tint tone="counter">&apos;new task&apos;</Tint> buying
              situation for an enterprise software system, which buying center
              role do you think wields <Tint>the most actual power</Tint>, and
              why?
            </p>
          </div>
        </div>
        <Figure height="auto" dense className="mx-auto !mt-8 max-w-[900px]">
          <PowerPodium />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 3 — Relationship Marketing and Key Account Management
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        {/* A statement across the top, the two sentences as columns, the
            rope running the full width underneath. */}
        <div className="flex w-full items-end gap-8 xl:gap-12">
          <PartNumeral n={3} className="text-[5rem] xl:text-[6.5rem]" />
          <PartTitle
            n={3}
            title="Relationship Marketing and Key Account Management"
          />
        </div>
        <div className="mt-6 h-px w-full bg-[var(--rule)]" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.6rem,2.6vw,2.3rem)]">
          B2B marketing relies heavily on{" "}
          <Tint>building and maintaining strong relationships</Tint>.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <P className="!max-w-none">
              Transactions are often just the beginning of a{" "}
              <Term>long term partnership</Term>.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P className="!max-w-none">
              <Term tone="counter">Trust</Term> and{" "}
              <Term tone="counter">mutual benefit</Term> are the foundation of
              B2B success.
            </P>
          </Ruled>
        </div>
        <Figure height="auto" dense className="mx-auto !mb-0 max-w-[880px]">
          <RelationshipRope />
        </Figure>
      </Slide>

      <Slide id="relationship-marketing-focus" border className="!py-8">
        <Tag>Lifetime value</Tag>
        <Heading>Relationship Marketing Focus</Heading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.5rem,2.3vw,2rem)]">
            The focus shifts from single transactions to{" "}
            <Tint>customer lifetime value</Tint>.
          </Statement>
          <Plate>
            <LifetimeBracket />
          </Plate>
        </div>
        {/* Two pairs, each sentence beside its drawing. */}
        <div className="mt-8 grid w-full gap-8 lg:grid-cols-2 lg:gap-10">
          {[
            {
              plate: <StrategicPartners />,
              tone: "signal" as const,
              text: (
                <>
                  Marketers aim to become <Term>strategic partners</Term> with
                  their business customers.
                </>
              ),
            },
            {
              plate: <DeepUnderstanding />,
              tone: "counter" as const,
              text: (
                <>
                  This requires <Term tone="counter">deep understanding</Term>{" "}
                  of the customer&apos;s business and industry.
                </>
              ),
            },
          ].map((pair, i) => (
            <div
              key={i}
              className="grid min-w-0 items-center gap-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]"
            >
              <Ruled tone={pair.tone}>
                <P>{pair.text}</P>
              </Ruled>
              <Plate className="!p-2 sm:!p-3">{pair.plate}</Plate>
            </div>
          ))}
        </div>
      </Slide>

      <Slide
        id="key-account-management"
        border
        className="!py-8"
        exercise={exercise["key-account-management"]}
      >
        <Tag>The most valuable customers</Tag>
        <Heading>Key Account Management (KAM)</Heading>
        {/* The definition and its process loop on the left; the numbers and
            the teams in a rail on the right. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="!max-w-none !text-[clamp(1.35rem,2vw,1.75rem)]">
              Key Account Management is the process of building{" "}
              <Tint>long term relationships</Tint> with the company&apos;s most
              valuable customers.
            </Statement>
            <Plate>
              <KamCore />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <P>
                Key accounts contribute <Term>disproportionately</Term> to the
                company&apos;s revenue and profit.
              </P>
            </Ruled>
            <Plate className="!p-2 sm:!p-3">
              <KeyAccountShare />
            </Plate>
            <Ruled>
              <Big className="!text-[clamp(1.2rem,1.7vw,1.5rem)] !leading-snug">
                KAM involves <Tint>dedicated teams</Tint> providing customized
                solutions and exceptional service.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="benefits-of-strong-b2b-relationships" border className="!py-8">
        <Tag>Why relationships pay</Tag>
        <Heading>Benefits of Strong B2B Relationships</Heading>
        {/* Three columns: each benefit stated, then drawn. */}
        <ol className="grid w-full gap-8 md:grid-cols-3 md:gap-10">
          {[
            {
              plate: <RetentionLoop />,
              text: (
                <>
                  Strong relationships lead to higher{" "}
                  <Tint tone="counter">customer retention and loyalty</Tint>.
                </>
              ),
            },
            {
              plate: <BarrierWall />,
              text: (
                <>
                  They create <Tint>barriers to entry</Tint> for competitors.
                </>
              ),
            },
            {
              plate: <JointInnovation />,
              text: (
                <>
                  Collaborative relationships often result in{" "}
                  <Tint>joint innovation</Tint> and{" "}
                  <Tint tone="counter">cost reductions</Tint>.
                </>
              ),
            },
          ].map((col, i) => (
            <li
              key={i}
              className="flex min-w-0 flex-col gap-6 border-t-2 border-[var(--ink)] pt-5"
            >
              <span
                aria-hidden
                className="text-[2rem] leading-none text-[var(--signal)]"
                style={SERIF}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Big className="md:min-h-[5.5em]">{col.text}</Big>
              <Plate className="!p-2 sm:!p-3">{col.plate}</Plate>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide id="discussion-strategic-partnerships" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter">
          Strategic Partnerships
        </KickerHeading>
        <Prompt>
          <PromptKicker /> What are the potential risks for a supplier if they
          become{" "}
          <Tint tone="counter">too dependent on a single key account</Tint>,
          and how can they <Tint>mitigate these risks</Tint>?
        </Prompt>
        <Figure height="auto" dense className="!mt-8 max-w-[900px]">
          <DependenceRisk />
        </Figure>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <KickerHeading kicker="Conclusion:">B2B Marketing</KickerHeading>
        <ol className="grid w-full gap-x-12 gap-y-12 md:grid-cols-3">
          {[
            {
              glyph: <GlyphSplitLane />,
              text: "B2B marketing is characterized by complex decisions, derived demand, and multiple stakeholders.",
            },
            {
              glyph: <GlyphRadiate />,
              text: "Understanding the buying center is crucial for targeting the right individuals.",
            },
            {
              glyph: <GlyphCore />,
              text: "Long term relationship building and Key Account Management are essential for sustained B2B success.",
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
