"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Tag,
  Row,
  Column,
  Figure,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import quizzesData from "./quizzes.json";
import {
  MarketingIceberg,
  ValueExchange,
  AttractKeep,
  InwardOutward,
  SellingVersusMarketing,
  SocietalTriangle,
  MyopiaView,
  NeedsWantsDemandsLanes,
  OfferingRosette,
  PerceivedValueBars,
  SatisfactionGauge,
  FourPlusOne,
  SegmentTarget,
  RelationshipCycle,
  LifetimeStream,
  ShareOfCustomer,
  EquityLedger,
  RelationshipGroups,
  AcquireRetain,
} from "./visuals";

// ============================================================================
// WEEK 01 — INTRODUCTION TO MARKETING & THE MARKETING PROCESS
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

/** Hairline-topped block with a small key and a verbatim sentence. */
function Ruled({
  keyLabel,
  tone = "ink",
  weight = "thin",
  children,
  className = "",
}: {
  keyLabel?: string;
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
  const text = {
    signal: "!text-[var(--signal)]",
    counter: "!text-[var(--counter)]",
    ink: "!text-[var(--ink-3)]",
  }[tone];
  return (
    <div
      className={cn(
        "pt-5",
        weight === "thick" ? "border-t-2" : "border-t",
        border,
        className,
      )}
    >
      {keyLabel ? (
        <div aria-hidden className={cn("type-label mb-3", text)}>
          {keyLabel}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/**
 * A heading with a "Label:" prefix ("Part 1:", "Discussion:"). The prefix is
 * set as a small tracked kicker inside the same h2, so the heading text stays
 * exactly as written.
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
    <div className="w-full mb-8 md:mb-12">
      <h2 className="type-h1 max-w-[22ch]">
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
          className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[7rem] xl:text-[13rem]"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontVariationSettings: '"opsz" 144, "WONK" 1',
          }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="type-display !text-[clamp(2.4rem,5.4vw,4.5rem)] max-w-[16ch]">
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

/** The five philosophies as a wayfinding strip; the live ones are lit. */
const PHILOSOPHIES = [
  "Production",
  "Product",
  "Selling",
  "Marketing",
  "Societal Marketing",
];

function PhilosophyStrip({ active }: { active: number[] }) {
  return (
    <div aria-hidden className="w-full my-8">
      <ol className="grid grid-cols-5 border-t border-[var(--rule-2)]">
        {PHILOSOPHIES.map((name, i) => {
          const on = active.includes(i);
          return (
            <li
              key={name}
              className={cn(
                "relative pt-3 pr-1.5 md:pr-2 -mt-px border-t-2 transition-colors",
                on ? "border-[var(--signal)]" : "border-transparent",
              )}
            >
              <span
                className={cn(
                  "type-caption block tabular-nums",
                  on ? "!text-[var(--signal)]" : "!text-[var(--ink-3)]/60",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "block text-[0.68rem] sm:text-[0.8rem] md:text-[0.95rem] leading-tight mt-1 [overflow-wrap:anywhere]",
                  on ? "text-[var(--ink)] font-semibold" : "text-[var(--ink-3)]/70",
                )}
              >
                {name}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-3 flex items-center gap-3">
        <span className="type-caption !text-[var(--ink-3)]/70">Over time</span>
        <span className="relative h-px flex-1 bg-[var(--rule-2)]">
          <span className="absolute -right-px -top-[3px] h-[7px] w-[7px] rotate-45 border-r border-t border-[var(--rule-2)]" />
        </span>
      </div>
    </div>
  );
}

/** Discussion prompt. "Discussion:" stays in the sentence as a kicker. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-5xl border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-10 md:px-14 md:py-16">
      <p className="type-quote !text-[clamp(1.45rem,2.7vw,2.3rem)] max-w-[40ch]">
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

/** Needs / wants / demands and what marketers do to each — a quiet trio. */
function InfluenceTrio() {
  const items = [
    {
      term: "Needs",
      verb: "do not create",
      color: "var(--ink-3)",
      glyph: (
        <circle cx="28" cy="28" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
      ),
    },
    {
      term: "Wants",
      verb: "heavily influence",
      color: "var(--counter)",
      glyph: (
        <>
          <path d="M8 28 C18 8 38 8 48 28" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 28 C18 48 38 48 48 28" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M42 22 L48 28 L50 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="28" cy="28" r="4" fill="currentColor" />
        </>
      ),
    },
    {
      term: "Demands",
      verb: "channel",
      color: "var(--signal)",
      glyph: (
        <>
          <path d="M6 8 L50 8 L32 30 L32 50 L24 50 L24 30 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </>
      ),
    },
  ];
  return (
    <div aria-hidden className="mt-12 grid w-full grid-cols-3 border-t border-[var(--rule)]">
      {items.map((it, i) => (
        <div
          key={it.term}
          className={cn("flex items-center gap-4 py-6 pr-3", i > 0 && "border-l border-[var(--rule)] pl-4 md:pl-8")}
          style={{ color: it.color }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" className="hidden sm:block shrink-0">
            {it.glyph}
          </svg>
          <div>
            <div className="text-[1.35rem] md:text-[1.75rem] leading-none text-[var(--ink)]" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>
              {it.term}
            </div>
            <div className="type-label mt-2" style={{ color: it.color }}>
              {it.verb}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** The five steps as a descending staircase, bracketed four-plus-one. */
function Cascade({ steps }: { steps: string[] }) {
  return (
    <div className="w-full">
      <ol className="grid w-full gap-6 md:grid-cols-5 md:gap-4 lg:gap-6">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li
              key={i}
              className={cn(
                "relative border-l-2 pl-5 md:border-l-0 md:pl-0 md:border-t-2 md:pt-5",
                last ? "border-[var(--signal)]" : "border-[var(--counter)]",
                ["md:mt-0", "md:mt-12", "md:mt-24", "md:mt-36", "md:mt-48"][i],
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "text-[3.25rem] md:text-[4.25rem] leading-[0.85] mb-4",
                  last ? "text-[var(--signal)]" : "text-[var(--counter)]",
                )}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                {i + 1}
              </div>
              <p className="type-body !text-[1.05rem] md:!text-[1.02rem] lg:!text-[1.12rem] !leading-[1.5] text-[var(--ink)]">
                <span className={cn("type-label block mb-2", !last && "!text-[var(--counter)]")}>
                  {`Step ${i + 1}:`}
                </span>{" "}
                {s}
              </p>
              {!last ? (
                <svg
                  aria-hidden
                  className="absolute -right-3 -top-[7px] hidden md:block lg:-right-4"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <path d="M2 2 L8 6 L2 10" fill="none" stroke="var(--counter)" strokeWidth="1.5" />
                </svg>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div aria-hidden className="mt-12 hidden md:grid grid-cols-5 gap-4 lg:gap-6">
        <div className="col-span-4">
          <div className="h-3 border-x-2 border-b-2 border-[var(--counter)]" />
          <div className="type-label mt-3 text-center !text-[var(--counter)]">
            Create value for customers
          </div>
        </div>
        <div>
          <div className="h-3 border-x-2 border-b-2 border-[var(--signal)]" />
          <div className="type-label mt-3 text-center">Capture value in return</div>
        </div>
      </div>
    </div>
  );
}

/** The 4 Ps as a cross around the target consumers. */
function FourPs() {
  const ps = [
    { word: "Product", rest: "creating a need-satisfying market offering." },
    { word: "Price", rest: "deciding how much to charge for the offering." },
    { word: "Place", rest: "determining how to make the offering accessible to target consumers." },
    {
      word: "Promotion",
      rest: "engaging target consumers, communicating the offering, and persuading them of its merits.",
    },
  ];
  return (
    <div className="relative mt-14 w-full">
      {/* Equal rows put the cross exactly at 50% / 50%, under the disc. */}
      <ul className="grid w-full md:grid-cols-2 md:auto-rows-fr">
        {ps.map((p, i) => (
          <li
            key={p.word}
            className={cn(
              "py-8 md:py-12 border-[var(--ink)]",
              i < 2 ? "md:border-b" : "",
              i % 2 === 0 ? "md:border-r md:pr-36" : "md:pl-36",
              i > 0 && "border-t md:border-t-0",
            )}
          >
            <p className="type-body max-w-[34ch] text-[var(--ink-2)]">
              <span
                className="block mb-3 text-[2.5rem] md:text-[3.5rem] leading-none tracking-[-0.02em] text-[var(--ink)]"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontVariationSettings: '"opsz" 144, "WONK" 1' }}
              >
                <span className="text-[var(--signal)]">{p.word[0]}</span>
                {p.word.slice(1)}
                <span className="text-[var(--signal)]">:</span>
              </span>{" "}
              {p.rest}
            </p>
          </li>
        ))}
      </ul>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--signal)] bg-[var(--paper)] md:flex"
      >
        <span className="type-label text-center leading-snug">
          Target
          <br />
          consumers
        </span>
      </div>
    </div>
  );
}

/* Tiny callback glyphs for the conclusion — each echoes a plate already seen. */
const glyphProps = {
  width: 64,
  height: 40,
  viewBox: "0 0 64 40",
  fill: "none",
  className: "text-[var(--ink-3)]",
} as const;

function GlyphExchange() {
  return (
    <svg {...glyphProps}>
      <rect x="1" y="10" width="14" height="20" stroke="currentColor" />
      <rect x="49" y="10" width="14" height="20" stroke="currentColor" />
      <path d="M19 15 H44 M40 12 L45 15 L40 18" stroke="var(--counter)" strokeWidth="1.5" />
      <path d="M45 25 H20 M24 22 L19 25 L24 28" stroke="var(--signal)" strokeWidth="1.5" />
    </svg>
  );
}

function GlyphStrip() {
  return (
    <svg {...glyphProps}>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={1 + i * 13}
          y="16"
          width="10"
          height="8"
          fill={i >= 3 ? "var(--signal)" : "var(--rule-2)"}
        />
      ))}
    </svg>
  );
}

function GlyphNested() {
  return (
    <svg {...glyphProps}>
      <rect x="1" y="1" width="62" height="38" stroke="currentColor" />
      <rect x="11" y="8" width="42" height="24" stroke="var(--counter)" />
      <rect x="22" y="14" width="20" height="12" fill="var(--signal)" />
    </svg>
  );
}

function GlyphSteps() {
  return (
    <svg {...glyphProps}>
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={1 + i * 13}
          y1={4 + i * 8}
          x2={11 + i * 13}
          y2={4 + i * 8}
          stroke={i === 4 ? "var(--signal)" : "var(--counter)"}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default function Week1() {
  return (
    <SlideDeck
      label="Week 01"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 01 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[16ch]">
          Introduction to Marketing{" "}
          <span className="text-[var(--signal)]">&amp;</span> The Marketing
          Process
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 1 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we establish the foundational principles of modern marketing.
          </p>
        </div>

        <p className="type-body mt-14 max-w-3xl border-t border-[var(--rule)] pt-8 text-center [&_a]:whitespace-nowrap">
          We will cover{" "}
          <a href="#part-1" data-n="01" className="toc-link">
            the definition and evolution of marketing
          </a>
          ,{" "}
          <a href="#part-2" data-n="02" className="toc-link">
            needs, wants, and demands
          </a>
          , and{" "}
          <a href="#part-3" data-n="03" className="toc-link">
            the five-step marketing process
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
            font-size: 0.62em;
            font-weight: 600;
            letter-spacing: 0.12em;
            color: var(--signal);
            vertical-align: 0.55em;
            margin-right: 0.3em;
          }
          .toc-link:hover { color: var(--signal); }
        `}</style>
      </Slide>

      {/* ================================================================
          Part 1
          ================================================================ */}
      <PartPlate id="part-1" n={1} title="Definition and Evolution of Marketing">
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <Lead>
            Marketing is often misunderstood as merely selling or advertising.
          </Lead>
          <Lead>
            In reality, <Term>selling is only the visible tip</Term> of the
            marketing iceberg.
          </Lead>
        </div>
        <Figure height="auto">
          <MarketingIceberg />
        </Figure>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <P>
            Modern marketing focuses on{" "}
            <Term tone="counter">
              creating, delivering, and communicating value
            </Term>{" "}
            to customers.
          </P>
          <P>
            Its ultimate goal is to build strong, profitable customer
            relationships and <Term>capture value in return</Term>.
          </P>
        </div>
      </PartPlate>

      <Slide id="what-is-marketing" border quizData={quiz["what-is-marketing"]}>
        <Tag>Definition</Tag>
        <Heading>What is Marketing?</Heading>
        <Statement className="!max-w-[36ch]">
          Marketing is the process by which companies engage customers, build
          strong customer relationships, and{" "}
          <span className="text-[var(--counter)]">create customer value</span>{" "}
          in order to{" "}
          <span className="text-[var(--signal)]">
            capture value from customers in return
          </span>
          .
        </Statement>
        <Figure height="auto" className="max-w-4xl">
          <ValueExchange />
        </Figure>
        <Row gap="large" items="center" className="!mt-4">
          <Column spanRatio="1/2">
            <P>
              The dual goal of marketing is to{" "}
              <Term tone="counter">attract new customers</Term> by promising
              superior value and <Term>keep current customers</Term> by
              delivering satisfaction.
            </P>
            <div className="mt-8 w-full">
              <AttractKeep />
            </div>
          </Column>
          <Column spanRatio="1/2">
            <Ruled weight="thick" className="md:ml-8">
              <p className="type-h2 !font-normal max-w-[28ch]">
                Sound marketing is essential for the success of every
                organization, from commercial giants to non-profit entities.
              </p>
            </Ruled>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="evolution-of-philosophies"
        border
        quizData={quiz["evolution-of-philosophies"]}
      >
        <Tag>Five philosophies</Tag>
        <Heading>The Evolution of Marketing Philosophies</Heading>
        <Lead>
          Organizations have approached the marketplace through five distinct
          philosophies over time.
        </Lead>
        <PhilosophyStrip active={[0, 1]} />
        <div className="mt-6 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled keyLabel="01" tone="signal" weight="thick">
            <P>
              <Term tone="ink">The Production Concept</Term> holds that
              consumers favor products that are available and highly
              affordable; management must focus on improving production and
              distribution efficiency.
            </P>
          </Ruled>
          <Ruled keyLabel="02" tone="signal" weight="thick">
            <P>
              <Term tone="ink">The Product Concept</Term> suggests consumers
              favor products offering the most quality, performance, and
              innovative features; the focus is on continuous product
              improvements.
            </P>
          </Ruled>
        </div>
        <div className="mt-16 grid w-full items-center gap-6 xl:grid-cols-[minmax(0,21.75rem)_1fr] xl:gap-12">
          <p className="type-h2 !font-normal">
            Both orientations carry the danger of focusing too{" "}
            <span className="text-[var(--signal)]">inward</span> on operations
            rather than{" "}
            <span className="text-[var(--counter)]">outward</span> on customer
            needs.
          </p>
          <Figure height="auto" className="!my-0 min-w-0">
            <InwardOutward />
          </Figure>
        </div>
      </Slide>

      <Slide
        id="selling-and-marketing"
        border
        quizData={quiz["selling-and-marketing"]}
      >
        <Tag>Inside-out, outside-in</Tag>
        <Heading>The Selling and Marketing Concepts</Heading>
        <PhilosophyStrip active={[2, 3]} />
        <div className="mt-4 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled keyLabel="03" tone="signal" weight="thick" className="space-y-5">
            <P>
              <Term tone="ink">The Selling Concept</Term> holds that consumers
              will not buy enough of the firm&apos;s products unless it
              undertakes a large-scale selling and promotion effort.
            </P>
            <P>
              It takes an <Term>inside-out</Term> perspective: starting from
              the factory, focusing on existing products, and aiming for sales
              volume through heavy selling.
            </P>
          </Ruled>
          <Ruled keyLabel="04" tone="counter" weight="thick" className="space-y-5">
            <P>
              <Term tone="ink">The Marketing Concept</Term> holds that
              achieving organizational goals depends on knowing the needs and
              wants of target markets and delivering the desired satisfactions
              better than competitors.
            </P>
            <P>
              It takes an <Term tone="counter">outside-in</Term> perspective:
              starting with a well-defined market, focusing on customer needs,
              and integrating all marketing activities to generate profits
              through customer satisfaction.
            </P>
          </Ruled>
        </div>
        <Figure height="auto">
          <SellingVersusMarketing />
        </Figure>
      </Slide>

      <Slide id="societal-marketing" border quizData={quiz["societal-marketing"]}>
        <Tag>The fifth philosophy</Tag>
        <Heading>The Societal Marketing Concept</Heading>
        <PhilosophyStrip active={[4]} />
        <div className="mt-6 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <P>
            The Societal Marketing Concept questions whether the pure marketing
            concept overlooks possible conflicts between{" "}
            <Term>short-run consumer wants</Term> and{" "}
            <Term tone="counter">long-run consumer welfare</Term>.
          </P>
          <P>
            It holds that marketing strategy should deliver value to customers
            in a way that maintains or improves both the consumer&apos;s and
            the society&apos;s well-being.
          </P>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 xl:grid-cols-[47.25rem_minmax(0,1fr)] xl:gap-14">
          <Figure height="auto" className="min-w-0">
            <SocietalTriangle />
          </Figure>
          <div className="space-y-8">
            <Ruled weight="thick" tone="signal">
              <P>
                It calls for sustainable marketing that balances three core
                considerations: company profits, consumer wants, and public
                interest.
              </P>
            </Ruled>
            <Ruled>
              <p className="type-h2 !font-normal">
                Companies adopting this philosophy build shared value for both
                shareholders and society.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="marketing-myopia" border>
        <Tag>Theodore Levitt</Tag>
        <Heading>Marketing Myopia</Heading>
        <Lead className="!max-w-[58ch]">
          Marketing myopia occurs when sellers pay more attention to{" "}
          <span className="text-[var(--signal)]">
            the specific products they offer
          </span>{" "}
          than to{" "}
          <span className="text-[var(--counter)]">
            the benefits and experiences produced by these products
          </span>
          .
        </Lead>
        <Figure height="auto">
          <MyopiaView />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled>
            <P>
              Coined by Theodore Levitt, it warns that companies risk
              obsolescence if they define their business by products rather
              than by underlying customer needs.
            </P>
          </Ruled>
          <Ruled>
            <P>
              For example, railroad companies declined because they viewed
              themselves as being in the{" "}
              <Term>railroad business</Term> rather than the{" "}
              <Term tone="counter">transportation business</Term>.
            </P>
          </Ruled>
        </div>
        <Statement className="mt-16 !max-w-[34ch]">
          Smart marketers view their products as problem-solving tools rather
          than physical ends in themselves.
        </Statement>
      </Slide>

      <Slide id="discussion-myopia" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Overcoming Marketing Myopia
        </KickerHeading>
        <Prompt>
          <PromptKicker /> If a leading photographic film manufacturer viewed
          itself as being in the{" "}
          <span className="text-[var(--signal)]">
            &quot;chemical film and paper&quot;
          </span>{" "}
          business rather than the{" "}
          <span className="text-[var(--counter)]">
            &quot;memory preservation&quot;
          </span>{" "}
          business, how did this orientation influence its strategic choices
          when digital cameras emerged?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 2
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="Needs, Wants, and Demands">
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <Lead>
            The most fundamental concept underlying marketing is human needs.
          </Lead>
          <P>
            Understanding the relationship between needs, wants, and demands
            allows marketers to design relevant offerings.
          </P>
        </div>
        <Statement className="mt-16 !max-w-[32ch]">
          Marketers <span className="text-[var(--ink-3)]">do not create</span>{" "}
          basic needs, but they{" "}
          <span className="text-[var(--counter)]">heavily influence</span>{" "}
          wants and <span className="text-[var(--signal)]">channel</span>{" "}
          demands.
        </Statement>
        <InfluenceTrio />
      </PartPlate>

      <Slide
        id="needs-wants-demands"
        border
        quizData={quiz["needs-wants-demands"]}
      >
        <Tag>Comparing needs, wants, and demands</Tag>
        <Heading>Needs, Wants, and Demands Defined</Heading>
        <Figure height="auto" className="!mt-0">
          <NeedsWantsDemandsLanes />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-3 md:gap-10">
          <Ruled keyLabel="Needs" weight="thick">
            <P>
              Human needs are states of felt deprivation, including basic
              physical needs (food, clothing, warmth), social needs (belonging,
              affection), and individual needs (knowledge, self-expression).
            </P>
          </Ruled>
          <Ruled keyLabel="Wants" tone="counter" weight="thick">
            <P>
              Wants are the form human needs take as they are shaped by culture
              and individual personality; a hungry person in one culture wants
              a hamburger, while in another they want rice and fish.
            </P>
          </Ruled>
          <Ruled keyLabel="Demands" tone="signal" weight="thick">
            <P>
              Demands are human wants that are backed by buying power; when
              accompanied by purchasing ability, wants become demands.
            </P>
          </Ruled>
        </div>
        <p className="type-h2 !font-normal mt-14 max-w-[44ch]">
          Marketers conduct extensive research to identify unmet needs and
          formulate products that translate wants into actual demand.
        </p>
      </Slide>

      <Slide id="market-offerings" border>
        <Tag>Market offerings</Tag>
        <Heading>Market Offerings: Goods, Services, and Experiences</Heading>
        <div className="grid w-full items-center gap-8 xl:grid-cols-[minmax(0,1fr)_47.25rem] xl:gap-14">
          <div className="space-y-6">
            <Lead>
              Consumers satisfy their needs and wants through market offerings.
            </Lead>
            <P>
              A market offering is a{" "}
              <Term tone="counter">
                combination of products, services, information, or experiences
              </Term>{" "}
              offered to a market to satisfy a need or want.
            </P>
          </div>
          <Figure height="auto" className="!my-0 min-w-0">
            <OfferingRosette />
          </Figure>
        </div>
        <div className="mt-14 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled weight="thick">
            <P>
              Market offerings are not limited to physical products; they
              include services like banking, airlines, and hospitality.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thick">
            <P>
              Increasingly, companies orchestrate{" "}
              <Term>memorable customer experiences</Term> that engage consumers
              emotionally beyond the physical commodity.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide
        id="customer-value-satisfaction"
        border
        quizData={quiz["customer-value-satisfaction"]}
      >
        <Tag>Value and satisfaction</Tag>
        <Heading>Customer Value and Satisfaction</Heading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-14">
          <Lead>
            Consumers usually face a broad array of products and services that
            might satisfy a given need.
          </Lead>
          <Lead>
            Customers form expectations about the value and satisfaction that
            various market offerings will deliver.
          </Lead>
        </div>
        <div className="mt-14 grid w-full items-center gap-6 xl:grid-cols-[minmax(0,19rem)_1fr] xl:gap-12">
          <Ruled tone="counter" weight="thick">
            <P>
              <Term tone="ink">Customer perceived value</Term> is the
              customer&apos;s evaluation of the difference between all the
              benefits and all the costs of a marketing offer relative to
              competing offers.
            </P>
          </Ruled>
          <Figure height="auto" className="!my-0 min-w-0">
            <PerceivedValueBars />
          </Figure>
        </div>
        <div className="mt-12 grid w-full items-center gap-6 xl:grid-cols-[minmax(0,19rem)_1fr] xl:gap-12">
          <Ruled tone="signal" weight="thick">
            <P>
              <Term tone="ink">Customer satisfaction</Term> depends on the
              product&apos;s perceived performance relative to a buyer&apos;s
              expectations; if performance falls short, the customer is
              dissatisfied, and if performance matches or exceeds
              expectations, the customer is satisfied or delighted.
            </P>
          </Ruled>
          <Figure height="auto" className="!my-0 min-w-0">
            <SatisfactionGauge />
          </Figure>
        </div>
      </Slide>

      <Slide id="discussion-needs" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Needs Versus Shaped Wants
        </KickerHeading>
        <Prompt>
          <PromptKicker /> Do modern smartphone and social media companies{" "}
          <span className="text-[var(--signal)]">
            create entirely new human needs
          </span>
          , or do they simply offer novel, highly engaging ways to{" "}
          <span className="text-[var(--counter)]">
            fulfill ancient human needs
          </span>{" "}
          for communication and social belonging?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3
          ================================================================ */}
      <PartPlate
        id="part-3"
        n={3}
        title="The Marketing Process and Creating Customer Value"
      >
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <Lead>
            To translate marketing theory into practice, organizations follow a
            structured marketing process.
          </Lead>
          <P>
            The process consists of five distinct steps that guide decisions
            from research to value capture.
          </P>
        </div>
        <Figure height="auto">
          <FourPlusOne />
        </Figure>
        <Statement className="!max-w-[34ch]">
          The{" "}
          <span className="text-[var(--counter)]">
            first four steps create value for customers
          </span>
          , while the{" "}
          <span className="text-[var(--signal)]">
            final step captures value in return
          </span>
          .
        </Statement>
      </PartPlate>

      <Slide id="five-step-process" border quizData={quiz["five-step-process"]}>
        <Tag>The Five-Step Marketing Process</Tag>
        <Heading>The Five-Step Marketing Process</Heading>
        <Cascade
          steps={[
            "Understand the marketplace and customer needs and wants.",
            "Design a customer-value-driven marketing strategy.",
            "Construct an integrated marketing program that delivers superior value.",
            "Engage customers, build profitable relationships, and create customer delight.",
            "Capture value from customers to create profits and customer equity.",
          ]}
        />
      </Slide>

      <Slide
        id="customer-driven-strategy"
        border
        quizData={quiz["customer-driven-strategy"]}
      >
        <Tag>Step 2</Tag>
        <Heading>Designing a Customer-Driven Marketing Strategy</Heading>
        <Statement className="!max-w-[36ch]">
          Marketing managers cannot serve all customers in every way; they must
          select{" "}
          <span className="text-[var(--signal)]">
            which customers to serve
          </span>{" "}
          and <span className="text-[var(--counter)]">how</span>.
        </Statement>
        <div className="mt-14 grid w-full items-center gap-6 xl:grid-cols-[minmax(0,19rem)_1fr] xl:gap-12">
          <Ruled keyLabel="Which customers to serve" tone="signal" weight="thick">
            <P>
              Selecting target customers involves market segmentation (dividing
              the market) and targeting (selecting segments to enter).
            </P>
          </Ruled>
          <Figure height="auto" className="!my-0 min-w-0">
            <SegmentTarget />
          </Figure>
        </div>
        <div className="mt-14 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled keyLabel="How" tone="counter" weight="thick">
            <P>
              Choosing a <Term tone="counter">value proposition</Term> defines
              the set of benefits or values a company promises to deliver to
              satisfy consumer needs.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <p className="type-h2 !font-normal">
              A strong value proposition differentiates the brand and gives
              customers a compelling reason to choose it over competitors.
            </p>
          </Ruled>
        </div>
      </Slide>

      <Slide id="four-ps" border>
        <Tag>Step 3</Tag>
        <Heading>
          Constructing an Integrated Marketing Program: The 4 Ps
        </Heading>
        <div className="grid w-full items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <Ruled keyLabel="Strategy" weight="thick">
            <P>
              The company&apos;s marketing strategy outlines which customers to
              serve and how to create value.
            </P>
          </Ruled>
          <div
            aria-hidden
            className="hidden md:flex items-center text-[var(--signal)]"
          >
            <svg width="56" height="20" viewBox="0 0 56 20">
              <line x1="0" y1="10" x2="52" y2="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M44 4 L53 10 L44 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <Ruled keyLabel="Action" tone="signal" weight="thick">
            <P>
              The marketing program then transforms the strategy into action by
              blending the marketing mix tools (the 4 Ps).
            </P>
          </Ruled>
        </div>
        <FourPs />
      </Slide>

      <Slide id="crm" border quizData={quiz["crm"]}>
        <Tag>Step 4</Tag>
        <Heading>Building Customer Relationships (CRM)</Heading>
        <Statement className="!max-w-[40ch] !text-[clamp(1.4rem,2.6vw,2.2rem)]">
          Customer Relationship Management (CRM) is the overall process of
          building and maintaining profitable customer relationships by
          delivering superior customer value and satisfaction.
        </Statement>
        <div className="mt-14 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="counter" weight="thick">
            <P>
              CRM involves{" "}
              <Term tone="counter">
                acquiring, engaging, keeping, and growing
              </Term>{" "}
              customers across all company touchpoints.
            </P>
          </Ruled>
          <div className="space-y-6">
            <Ruled tone="signal" weight="thick">
              <P>
                Customer engagement marketing goes beyond selling to foster
                direct and continuous customer involvement in shaping brand
                conversations and community.
              </P>
            </Ruled>
            <P>
              Customer-managed relationships empower consumers to connect with
              brands and each other using social and mobile technologies.
            </P>
          </div>
        </div>
        <Figure height="auto">
          <RelationshipCycle />
        </Figure>
      </Slide>

      <Slide id="capturing-value" border quizData={quiz["capturing-value"]}>
        <Tag>Step 5</Tag>
        <Heading>Capturing Value from Customers</Heading>
        <Lead className="!max-w-[58ch]">
          By creating superior value for customers, the firm captures value
          from customers in return in the form of sales, profits, and long-term
          customer equity.
        </Lead>
        <div className="mt-14 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled weight="thick">
            <P>
              <Term tone="ink">Customer Lifetime Value (CLV)</Term> is the
              value of the entire stream of purchases a customer makes over a
              lifetime of patronage.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thick">
            <P>
              Losing a customer means losing more than{" "}
              <Term>a single sale</Term>; it means losing{" "}
              <Term>the entire future income stream</Term> that customer
              represents.
            </P>
          </Ruled>
        </div>
        <Figure height="auto">
          <LifetimeStream />
        </Figure>
        <div className="mt-4 grid w-full items-center gap-6 xl:grid-cols-[minmax(0,19rem)_1fr] xl:gap-12">
          <Ruled tone="signal" weight="thick">
            <P>
              <Term tone="ink">Share of customer</Term> is the portion of the
              customer&apos;s purchasing that a company gets in its product
              categories.
            </P>
          </Ruled>
          <Figure height="auto" className="!my-0 min-w-0">
            <ShareOfCustomer />
          </Figure>
        </div>
      </Slide>

      <Slide id="customer-equity" border quizData={quiz["customer-equity"]}>
        <Tag>The ultimate aim</Tag>
        <Heading>Customer Equity</Heading>
        <Statement className="!max-w-[34ch]">
          The ultimate aim of customer relationship management is to produce
          high customer equity.
        </Statement>
        <div className="mt-14 grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal" weight="thick">
            <P>
              <Term tone="ink">Customer equity</Term> is the total combined
              customer lifetime values of all of the company&apos;s current and
              potential customers.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thick">
            <P>
              While sales and market share reflect the past, customer equity
              suggests the future value of the firm.
            </P>
          </Ruled>
        </div>
        <Figure height="auto">
          <EquityLedger />
        </Figure>
        <P className="mt-14 !max-w-[60ch]">
          Managing customer equity requires classifying customers by potential
          profitability and projected loyalty into{" "}
          <Term tone="ink">strangers</Term>,{" "}
          <Term tone="counter">butterflies</Term>,{" "}
          <Term>true friends</Term>, and <Term tone="ink">barnacles</Term>.
        </P>
        <Figure height="auto" className="max-w-4xl">
          <RelationshipGroups />
        </Figure>
      </Slide>

      <Slide id="discussion-retention" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Customer Acquisition vs. Retention
        </KickerHeading>
        <Prompt>
          <PromptKicker /> Why is it often reported to be{" "}
          <span className="text-[var(--signal)]">five times more expensive</span>{" "}
          to acquire a new customer than to retain an existing one, and how
          should a startup balance its marketing budget between the two?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <AcquireRetain />
        </Figure>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <KickerHeading kicker="Conclusion:">
          Foundations of Modern Marketing
        </KickerHeading>
        <ol className="grid w-full gap-x-14 gap-y-12 md:grid-cols-2">
          {[
            {
              glyph: <GlyphExchange />,
              text: "Marketing is fundamentally about creating value for customers in order to capture value in return.",
            },
            {
              glyph: <GlyphStrip />,
              text: "Success requires moving beyond outdated production and selling mindsets to a customer-centric marketing philosophy.",
            },
            {
              glyph: <GlyphNested />,
              text: "Understanding needs, wants, and demands forms the bedrock for designing compelling market offerings.",
            },
            {
              glyph: <GlyphSteps />,
              text: "Following the five-step marketing process allows firms to build lasting customer relationships and maximize customer equity.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[4.5rem_1fr] gap-6 border-t-2 border-[var(--ink)] pt-6"
            >
              <div aria-hidden className="flex flex-col gap-4">
                <span
                  className="text-[2.6rem] leading-none text-[var(--signal)]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
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
