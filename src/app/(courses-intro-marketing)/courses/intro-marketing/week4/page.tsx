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
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import quizzesData from "./quizzes.json";
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
// Quizzes: in this route group `Slide` renders `quizData` AFTER its section.
// Each [quiz]-tagged topic therefore carries its own quiz, which tests that
// slide and the ones before it.
// ============================================================================

const quiz = createCourseQuizLookup(quizzesData as CourseQuiz[]);

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

/** A sentence at h2 size, for the second half of a two-column row. */
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
    <div className={cn("gsap-reveal min-w-0 border-t-2 pt-5", border, className)}>
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
 * A heading with a "Label:" prefix ("Discussion:", "Conclusion:"). The prefix
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

/** Part plate: an oversized numeral beside the part heading. */
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
    <Slide id={id} border>
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

export default function Week4() {
  return (
    <SlideDeck
      label="Week 04"
      background={<BackgroundManager type="marketing" />}
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
        <p className="gsap-reveal type-caption mt-2">Davood Wadi, PhD</p>

        <div className="gsap-reveal mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 4 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we will explore Business-to-Business, or B2B, marketing.
          </p>
        </div>

        <p className="gsap-reveal type-body mt-14 max-w-3xl border-t border-[var(--rule)] pt-8 text-center [&_a]:whitespace-nowrap">
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
      <PartPlate id="part-1" n={1} title="Characteristics of B2B Markets">
        <Lead className="mt-10 !max-w-[58ch]">
          B2B marketing involves selling products and services to{" "}
          <Term>other organizations</Term>.
        </Lead>
        <Figure height="auto">
          <TwoUses />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              These organizations use them to{" "}
              <Term tone="ink">produce other goods</Term>, or for their{" "}
              <Term tone="counter">own operations</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <Big>
              The scale and complexity of B2B transactions differ
              significantly from B2C.
            </Big>
          </Ruled>
        </div>
      </PartPlate>

      <Slide
        id="market-structure-and-demand"
        border
        quizData={quiz["market-structure-and-demand"]}
      >
        <Tag>Buyers and demand</Tag>
        <Heading>Market Structure and Demand</Heading>
        <Statement className="!max-w-[36ch]">
          B2B markets typically have{" "}
          <Tint>fewer, but much larger,</Tint> buyers than B2C markets.
        </Statement>
        <Figure height="auto">
          <MarketSplitLane />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="counter">
            <P>
              Demand in B2B markets is{" "}
              <Term tone="counter">derived demand</Term>, meaning it comes
              from consumer demand.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              B2B demand is also <Term>more inelastic</Term> and{" "}
              <Term>fluctuates more rapidly</Term> than consumer demand.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide id="nature-of-the-buying-unit" border>
        <Tag>More people, more formality</Tag>
        <Heading>Nature of the Buying Unit</Heading>
        <Lead className="!max-w-[52ch]">
          A B2B purchase involves{" "}
          <Term>more decision participants</Term>.
        </Lead>
        <Figure height="auto">
          <SignOffSheet />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <P>
              B2B buying involves a{" "}
              <Term>more professional and formalized</Term> purchasing effort.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <Big>
              Buyers and sellers work more closely together and build{" "}
              <Tint tone="counter">long term relationships</Tint>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      <Slide
        id="types-of-decisions-and-the-decision-process"
        border
        quizData={quiz["types-of-decisions-and-the-decision-process"]}
      >
        <Tag>Complex, formal, dependent</Tag>
        <Heading>Types of Decisions and the Decision Process</Heading>
        <div className="grid w-full gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {[
            {
              plate: <DecisionTree />,
              tone: "ink" as const,
              text: (
                <>
                  B2B buyers face <Term tone="ink">more complex</Term>{" "}
                  purchasing decisions.
                </>
              ),
            },
            {
              plate: <FormalChecklist />,
              tone: "signal" as const,
              text: (
                <>
                  The B2B buying process is <Term>highly formalized</Term>.
                </>
              ),
            },
            {
              plate: <Interlock />,
              tone: "counter" as const,
              text: (
                <>
                  Buyers and sellers are{" "}
                  <Term tone="counter">highly dependent</Term> on each other
                  in B2B markets.
                </>
              ),
            },
          ].map((col, i) => (
            <div key={i} className="flex min-w-0 flex-col gap-6">
              <Plate>{col.plate}</Plate>
              <Ruled tone={col.tone}>
                <P>{col.text}</P>
              </Ruled>
            </div>
          ))}
        </div>
      </Slide>

      <Slide id="discussion-derived-demand" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Derived Demand
        </KickerHeading>
        <Prompt>
          <PromptKicker /> If consumer demand for electric vehicles drops,{" "}
          <Tint>how does this derived demand cascade</Tint> through the B2B
          supply chain to affect{" "}
          <Tint tone="counter">
            battery manufacturers and raw material suppliers
          </Tint>
          ?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <EvCascade />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 2 — The Organizational Buying Center
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="The Organizational Buying Center">
        <Lead className="mt-10 !max-w-[58ch]">
          The buying center is the <Term>decision-making unit</Term> of a
          buying organization.
        </Lead>
        <Figure height="auto">
          <BuyingCenterOrg />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              It consists of all the individuals and units that play a role
              in the purchase decision.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <Big>
              It is not a fixed or formal department, but a{" "}
              <Tint>set of buying roles</Tint>.
            </Big>
          </Ruled>
        </div>
      </PartPlate>

      <Slide
        id="roles-in-the-buying-center"
        border
        quizData={quiz["roles-in-the-buying-center"]}
      >
        <Tag>Users, influencers, buyers</Tag>
        <Heading>Roles in the Buying Center</Heading>
        <Figure height="auto">
          <RadiatingRoles phase="first" />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-3">
          <Ruled tone="signal">
            <P>
              <Term>Users</Term> are members of the organization who will
              actually use the product.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term>Influencers</Term> affect the buying decision by providing
              information or specifications.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term>Buyers</Term> have formal authority to select the supplier
              and arrange terms.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide id="deciders-and-gatekeepers" border>
        <Tag>Approval and access</Tag>
        <Heading>Deciders and Gatekeepers</Heading>
        <Figure height="auto">
          <RadiatingRoles phase="second" />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <P>
              <Term>Deciders</Term> have formal or informal power to select or
              approve the final suppliers.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term>Gatekeepers</Term> control the flow of information to
              others.
            </P>
          </Ruled>
        </div>
        <Statement className="mt-16 !max-w-[40ch]">
          A single person can play <Tint>multiple roles</Tint>, or multiple
          people can play <Tint tone="counter">the same role</Tint>.
        </Statement>
        <Figure height="auto">
          <RoleMapping />
        </Figure>
      </Slide>

      <Slide
        id="types-of-buying-situations"
        border
        quizData={quiz["types-of-buying-situations"]}
      >
        <Tag>Rebuy to new task</Tag>
        <Heading>Types of Buying Situations</Heading>
        <Figure height="auto">
          <BuyingSituations />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-3">
          <Ruled>
            <P>
              A <Term tone="ink">straight rebuy</Term> is a routine purchase
              where the buyer reorders without modifications.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              A <Term tone="counter">modified rebuy</Term> is a situation
              where the buyer wants to modify product specifications, prices,
              or suppliers.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              A <Term>new task</Term> is a situation where the buyer purchases
              a product or service for the first time.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide id="discussion-buying-center-dynamics" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Buying Center Dynamics
        </KickerHeading>
        <Prompt>
          <PromptKicker /> In a <Tint tone="counter">&apos;new task&apos;</Tint>{" "}
          buying situation for an enterprise software system, which buying
          center role do you think wields{" "}
          <Tint>the most actual power</Tint>, and why?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <PowerPodium />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 3 — Relationship Marketing and Key Account Management
          ================================================================ */}
      <PartPlate
        id="part-3"
        n={3}
        title="Relationship Marketing and Key Account Management"
      >
        <Lead className="mt-10 !max-w-[58ch]">
          B2B marketing relies heavily on{" "}
          <Term>building and maintaining strong relationships</Term>.
        </Lead>
        <Figure height="auto">
          <RelationshipRope />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <P>
              Transactions are often just the beginning of a{" "}
              <Term>long term partnership</Term>.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <Big>
              <Tint tone="counter">Trust</Tint> and{" "}
              <Tint tone="counter">mutual benefit</Tint> are the foundation of
              B2B success.
            </Big>
          </Ruled>
        </div>
      </PartPlate>

      <Slide id="relationship-marketing-focus" border>
        <Tag>Lifetime value</Tag>
        <Heading>Relationship Marketing Focus</Heading>
        <Lead className="!max-w-[56ch]">
          The focus shifts from single transactions to{" "}
          <Term>customer lifetime value</Term>.
        </Lead>
        <Figure height="auto">
          <LifetimeBracket />
        </Figure>
        <div className="grid w-full gap-14 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-8">
            <Plate>
              <StrategicPartners />
            </Plate>
            <Ruled tone="signal">
              <P>
                Marketers aim to become <Term>strategic partners</Term> with
                their business customers.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            <Plate>
              <DeepUnderstanding />
            </Plate>
            <Ruled tone="counter">
              <P>
                This requires <Term tone="counter">deep understanding</Term>{" "}
                of the customer&apos;s business and industry.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      <Slide
        id="key-account-management"
        border
        quizData={quiz["key-account-management"]}
      >
        <Tag>The most valuable customers</Tag>
        <Heading>Key Account Management (KAM)</Heading>
        <Statement className="!max-w-[40ch]">
          Key Account Management is the process of building{" "}
          <Tint>long term relationships</Tint> with the company&apos;s most
          valuable customers.
        </Statement>
        <Figure height="auto">
          <KamCore />
        </Figure>
        <div className="grid w-full items-start gap-14 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-8">
            <Plate>
              <KeyAccountShare />
            </Plate>
            <Ruled tone="signal">
              <P>
                Key accounts contribute <Term>disproportionately</Term> to the
                company&apos;s revenue and profit.
              </P>
            </Ruled>
          </div>
          <Ruled tone="ink" className="lg:mt-0">
            <Big>
              KAM involves <Tint>dedicated teams</Tint> providing customized
              solutions and exceptional service.
            </Big>
          </Ruled>
        </div>
      </Slide>

      <Slide id="benefits-of-strong-b2b-relationships" border>
        <Tag>Why relationships pay</Tag>
        <Heading>Benefits of Strong B2B Relationships</Heading>
        <ol className="w-full">
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
          ].map((row, i) => (
            <li
              key={i}
              className="gsap-reveal grid items-center gap-6 border-t-2 border-[var(--ink)] py-8 md:grid-cols-[minmax(0,27rem)_1fr] md:gap-12"
            >
              <Plate className="!p-2 sm:!p-3">{row.plate}</Plate>
              <p className="type-h2 !font-normal max-w-[30ch]">{row.text}</p>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide id="discussion-strategic-partnerships" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Strategic Partnerships
        </KickerHeading>
        <Prompt>
          <PromptKicker /> What are the potential risks for a supplier if they
          become <Tint>too dependent on a single key account</Tint>, and how
          can they <Tint tone="counter">mitigate these risks</Tint>?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
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
              className="gsap-reveal flex flex-col gap-6 border-t-2 border-[var(--ink)] pt-6"
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
