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
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import { cn } from "@/lib/utils";
import { Plate } from "../_visuals/kit";
import quizzesData from "./quizzes.json";
import {
  ResearchBridge,
  ProblemAim,
  ObjectiveFork,
  PlanSheet,
  CostValueBalance,
  ImplementInterpret,
  SalesDropFork,
  TwoDataTypes,
  SecondarySplitLane,
  FastCheap,
  BeyondOneCompany,
  SecondaryPitfalls,
  PrimaryDecisions,
  RelevantCostly,
  ObservePlate,
  SurveyPlate,
  ExperimentPlate,
  NovelShelf,
  BigDataFork,
  CrmCycle,
  AnalyticsDig,
  InterpretationChain,
  PrivacyLine,
  GlyphAim,
  GlyphTwoData,
  GlyphPattern,
} from "./visuals";

// ============================================================================
// WEEK 05 — MARKETING RESEARCH AND DATA ANALYTICS
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

/** A sentence at h2 size, for the second half of a two-column row. */
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
}: {
  kicker: string;
  children: React.ReactNode;
  tone?: "signal" | "counter";
}) {
  return (
    <div className="w-full mb-8 md:mb-12">
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
          className="select-none leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--signal)] text-[7rem] xl:text-[13rem]"
          style={{
            ...SERIF,
            fontVariationSettings: '"opsz" 144, "WONK" 1',
          }}
        >
          {String(n).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <h2 className="type-display !text-[clamp(2.4rem,5.4vw,4.5rem)] max-w-[18ch]">
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
   Research-process wayfinding
   -------------------------------------------------------------------------- */

const STEPS = [
  "Defining the Problem",
  "Developing the Research Plan",
  "Implementing",
  "Interpreting",
];

/**
 * The four steps as a strip. On the Part 1 plate it is the whole route; on
 * each step slide the current steps are lit and the ones behind are inked.
 */
function StepStrip({
  active = [],
  large = false,
  className = "",
}: {
  active?: number[];
  large?: boolean;
  className?: string;
}) {
  const first = active.length ? Math.min(...active) : -1;
  return (
    <ol
      aria-hidden
      className={cn(
        "grid w-full grid-cols-4",
        large ? "gap-3 sm:gap-5" : "gap-2 sm:gap-3",
        className,
      )}
    >
      {STEPS.map((s, i) => {
        const on = active.includes(i);
        const done = first >= 0 && i < first;
        return (
          <li
            key={s}
            className={cn(
              "min-w-0 border-t-2",
              large ? "pt-4" : "pt-3",
              on
                ? "border-[var(--signal)]"
                : done || large
                  ? "border-[var(--ink)]"
                  : "border-[var(--rule)]",
            )}
          >
            <span
              className={cn(
                "type-label block",
                large ? "!text-[0.8rem]" : "!text-[0.68rem]",
                on ? "!text-[var(--signal)]" : "!text-[var(--ink-3)]",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "mt-1.5 hidden sm:block leading-snug",
                large
                  ? "text-[clamp(0.95rem,1.4vw,1.25rem)] text-[var(--ink)]"
                  : "text-[0.8rem]",
                on && "font-semibold text-[var(--ink)]",
                !on && !large && "text-[var(--ink-3)]",
              )}
              style={large ? SERIF : undefined}
            >
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** A step slide: strip, kicker heading, then the slide's own content. */
function StepSlide({
  id,
  steps,
  kicker,
  title,
  children,
}: {
  id: string;
  steps: number[];
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Slide id={id} border quizData={quiz[id]}>
      <StepStrip active={steps} className="mb-12 md:mb-16" />
      <KickerHeading kicker={kicker}>{title}</KickerHeading>
      {children}
    </Slide>
  );
}

export default function Week5() {
  return (
    <SlideDeck
      label="Week 05"
    >
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 05 · Introduction to Marketing</Subtitle>
        <Title className="mt-6 !max-w-[18ch]">
          Marketing Research and{" "}
          <span className="text-[var(--signal)]">Data Analytics</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>

        <div className="mt-14 w-full max-w-3xl space-y-5 text-center">
          <p className="type-lead !text-[var(--ink)]">
            Welcome to Week 5 of Introduction to Marketing.
          </p>
          <p className="type-lead">
            Today we focus on Marketing Research and Data Analytics.
          </p>
        </div>

        <p className="type-body mt-14 max-w-3xl border-t border-[var(--rule)] pt-8 text-center [&_a]:whitespace-nowrap">
          We will cover the{" "}
          <a href="#part-1" data-n="01" className="toc-link">
            research process
          </a>
          ,{" "}
          <a href="#part-2" data-n="02" className="toc-link">
            data types
          </a>
          , and{" "}
          <a href="#part-3" data-n="03" className="toc-link">
            how insights drive decisions
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
          Part 1 — The Marketing Research Process
          ================================================================ */}
      <PartPlate id="part-1" n={1} title="The Marketing Research Process">
        <Lead className="mt-10 !max-w-[58ch]">
          Marketing research is the <Term>systematic</Term> design,
          collection, and analysis of data.
        </Lead>
        <Figure height="auto">
          <ResearchBridge />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled tone="counter">
            <P>
              It connects{" "}
              <Term tone="counter">consumers, customers, and the public</Term>{" "}
              to the marketer through information.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <Big>
              This information is used to identify and define marketing{" "}
              <Tint tone="counter">opportunities</Tint> and{" "}
              <Tint>problems</Tint>.
            </Big>
          </Ruled>
        </div>
        <StepStrip large className="mt-16" />
      </PartPlate>

      <StepSlide
        id="defining-the-problem"
        steps={[0]}
        kicker="Step 1:"
        title="Defining the Problem"
      >
        <Statement className="!max-w-[38ch]">
          The first step is to carefully{" "}
          <Tint>define the problem</Tint> and agree on research objectives.
        </Statement>
        <Figure height="auto">
          <ProblemAim />
        </Figure>
        <div className="grid w-full items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <Ruled tone="signal">
            <Big>
              This is often <Tint>the hardest step</Tint>, as it guides the
              entire research process.
            </Big>
          </Ruled>
          <div className="flex min-w-0 flex-col gap-8">
            <Plate>
              <ObjectiveFork />
            </Plate>
            <Ruled>
              <P>
                Objectives can be <Term tone="ink">exploratory</Term>,{" "}
                <Term tone="counter">descriptive</Term>, or{" "}
                <Term>causal</Term> depending on the problem.
              </P>
            </Ruled>
          </div>
        </div>
      </StepSlide>

      <StepSlide
        id="developing-the-research-plan"
        steps={[1]}
        kicker="Step 2:"
        title="Developing the Research Plan"
      >
        <Lead className="!max-w-[52ch]">
          The research plan determines the <Term>exact information</Term>{" "}
          needed.
        </Lead>
        <Figure height="auto">
          <PlanSheet />
        </Figure>
        <div className="grid w-full items-start gap-14 lg:grid-cols-2">
          <Ruled>
            <Big>
              It outlines <Tint tone="counter">sources of existing data</Tint>{" "}
              and spells out specific research approaches.
            </Big>
          </Ruled>
          <div className="flex min-w-0 flex-col gap-8">
            <Plate>
              <CostValueBalance />
            </Plate>
            <Ruled tone="signal">
              <P>
                The plan must <Term>balance</Term> the cost of obtaining data
                against the value of the insights.
              </P>
            </Ruled>
          </div>
        </div>
      </StepSlide>

      <StepSlide
        id="steps-3-and-4"
        steps={[2, 3]}
        kicker="Steps 3 and 4:"
        title="Implementing and Interpreting"
      >
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Implementing</Term> involves collecting,
              processing, and analyzing the information.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term>Interpreting</Term> the findings involves drawing
              conclusions and reporting them to management.
            </P>
          </Ruled>
        </div>
        <Figure height="auto">
          <ImplementInterpret />
        </Figure>
        <Statement className="!max-w-[36ch]">
          Managers and researchers must <Tint>work together</Tint> to extract
          actionable insights.
        </Statement>
      </StepSlide>

      <Slide id="discussion-defining-the-problem" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Defining the Problem
        </KickerHeading>
        <Prompt>
          <PromptKicker /> If a company notices a{" "}
          <Tint>sudden drop in sales</Tint> for a flagship product, what
          specific <Tint tone="counter">exploratory research objectives</Tint>{" "}
          might they set before rushing to launch a new advertising campaign?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <SalesDropFork />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 2 — Primary vs. Secondary Data
          ================================================================ */}
      <PartPlate id="part-2" n={2} title="Primary vs. Secondary Data">
        <Lead className="mt-10 !max-w-[58ch]">
          Marketers gather two main types of data:{" "}
          <Term>primary</Term> and <Term tone="counter">secondary</Term>.
        </Lead>
        <Figure height="auto">
          <TwoDataTypes />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Understanding the difference is crucial for{" "}
              <Term tone="ink">cost-effective research</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <Big>
              Each type of data has distinct{" "}
              <Tint tone="counter">advantages</Tint> and{" "}
              <Tint>limitations</Tint>.
            </Big>
          </Ruled>
        </div>
      </PartPlate>

      <Slide id="secondary-data" border quizData={quiz["secondary-data"]}>
        <Tag>Information that already exists</Tag>
        <Heading>Secondary Data</Heading>
        <Statement className="!max-w-[36ch]">
          Secondary data consists of information that{" "}
          <Tint tone="counter">already exists</Tint> somewhere.
        </Statement>
        <Figure height="auto">
          <SecondarySplitLane />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <P>
              It is usually collected for{" "}
              <Term tone="ink">another purpose</Term> but can be relevant to
              the <Term>current problem</Term>.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Sources include <Term tone="counter">internal databases</Term>,
              government reports, and commercial data services.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide id="advantages-and-disadvantages-of-secondary-data" border>
        <Tag>Speed, reach, and risk</Tag>
        <Heading>Advantages and Disadvantages of Secondary Data</Heading>
        <ol className="w-full">
          {[
            {
              plate: <FastCheap />,
              border: "border-[var(--counter)]",
              text: (
                <>
                  It can be obtained <Tint tone="counter">quickly</Tint> and at
                  a <Tint tone="counter">lower cost</Tint> than primary data.
                </>
              ),
            },
            {
              plate: <BeyondOneCompany />,
              border: "border-[var(--counter)]",
              text: (
                <>
                  It can provide data an individual company{" "}
                  <Tint tone="counter">cannot collect on its own</Tint>.
                </>
              ),
            },
            {
              plate: <SecondaryPitfalls />,
              border: "border-[var(--signal)]",
              text: (
                <>
                  <Tint>However</Tint>, the needed information might not exist
                  or might not be very usable or accurate.
                </>
              ),
            },
          ].map((row, i) => (
            <li
              key={i}
              className={cn(
                "grid items-center gap-6 border-t-2 py-8 md:grid-cols-[minmax(0,27rem)_1fr] md:gap-12",
                row.border,
              )}
            >
              <Plate className="!p-2 sm:!p-3">{row.plate}</Plate>
              <p className="type-h2 !font-normal max-w-[30ch]">{row.text}</p>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide id="primary-data" border quizData={quiz["primary-data"]}>
        <Tag>Collected for the purpose at hand</Tag>
        <Heading>Primary Data</Heading>
        <Statement className="!max-w-[36ch]">
          Primary data consists of information collected for the{" "}
          <Tint>specific purpose at hand</Tint>.
        </Statement>
        <Figure height="auto">
          <PrimaryDecisions />
        </Figure>
        <div className="grid w-full items-start gap-14 lg:grid-cols-2">
          <Ruled>
            <Big>
              It requires decisions on research approaches, contact methods,
              and sampling plans.
            </Big>
          </Ruled>
          <div className="flex min-w-0 flex-col gap-8">
            <Plate>
              <RelevantCostly />
            </Plate>
            <Ruled tone="signal">
              <P>
                This data is <Term>highly relevant</Term> but takes{" "}
                <Term tone="ink">more time and resources</Term> to gather.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      <Slide
        id="primary-research-approaches"
        border
        quizData={quiz["primary-research-approaches"]}
      >
        <Tag>Observe, ask, or test</Tag>
        <Heading>Primary Research Approaches</Heading>
        <div className="grid w-full gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {[
            {
              plate: <ObservePlate />,
              tone: "ink" as const,
              text: (
                <>
                  <Term tone="ink">Observational research</Term> involves
                  gathering data by observing relevant people and actions.
                </>
              ),
            },
            {
              plate: <SurveyPlate />,
              tone: "counter" as const,
              text: (
                <>
                  <Term tone="counter">Survey research</Term> is best for
                  gathering descriptive information about knowledge and
                  attitudes.
                </>
              ),
            },
            {
              plate: <ExperimentPlate />,
              tone: "signal" as const,
              text: (
                <>
                  <Term>Experimental research</Term> is best for gathering
                  causal information by matching groups and controlling
                  factors.
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

      <Slide id="discussion-choosing-data-types" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          Choosing Data Types
        </KickerHeading>
        <Prompt>
          <PromptKicker /> When launching a{" "}
          <Tint>completely novel product category</Tint> that does not
          currently exist, why might a company have to rely heavily on primary
          data rather than{" "}
          <Tint tone="counter">secondary data</Tint>?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <NovelShelf />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 3 — Data Analytics and Customer Insights
          ================================================================ */}
      <PartPlate id="part-3" n={3} title="Data Analytics and Customer Insights">
        <Lead className="mt-10 !max-w-[58ch]">
          In the digital age, marketers have access to{" "}
          <Term tone="ink">massive amounts of data</Term>.
        </Lead>
        <Figure height="auto">
          <BigDataFork />
        </Figure>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              <Term tone="ink">Big Data</Term> refers to the huge and complex
              data sets generated by sophisticated technologies.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <Big>
              The challenge is not getting more data, but getting{" "}
              <Tint>better data and insights</Tint>.
            </Big>
          </Ruled>
        </div>
      </PartPlate>

      <Slide
        id="customer-relationship-management"
        border
        quizData={quiz["customer-relationship-management"]}
      >
        <Tag>The CRM cycle</Tag>
        <Heading>Customer Relationship Management (CRM)</Heading>
        <Statement className="!max-w-[36ch]">
          CRM involves managing{" "}
          <Tint>detailed information about individual customers</Tint>.
        </Statement>
        <Figure height="auto">
          <CrmCycle />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <P>
              Marketers use CRM to carefully manage customer{" "}
              <Term>touchpoints</Term> to maximize <Term>loyalty</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              It <Term tone="ink">integrates</Term> everything a company
              sales, service, and marketing teams know about customers.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide
        id="role-of-marketing-analytics"
        border
        quizData={quiz["role-of-marketing-analytics"]}
      >
        <Tag>Patterns in big data</Tag>
        <Heading>The Role of Marketing Analytics</Heading>
        <Lead className="!max-w-[56ch]">
          <Term>Marketing analytics</Term> consists of the analysis tools,
          technologies, and processes.
        </Lead>
        <Figure height="auto">
          <AnalyticsDig />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <Big>
              These tools are used to dig out{" "}
              <Tint>meaningful patterns</Tint> in big data.
            </Big>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Analytics helps marketers gain{" "}
              <Term tone="counter">customer insights</Term> and gauge{" "}
              <Term tone="ink">marketing performance</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      <Slide id="transforming-data-into-actionable-insights" border>
        <Tag>The human element</Tag>
        <Heading>Transforming Data into Actionable Insights</Heading>
        <Statement className="!max-w-[34ch]">
          Data alone is useless without the{" "}
          <Tint>human element of interpretation</Tint>.
        </Statement>
        <Figure height="auto">
          <InterpretationChain />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <P>
              <Term>Customer insights</Term> are fresh understandings of
              customers and the marketplace.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <Big>
              These insights become the basis for creating{" "}
              <Tint tone="counter">customer value and relationships</Tint>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      <Slide id="discussion-the-ethics-of-big-data" border>
        <KickerHeading kicker="Discussion:" tone="counter">
          The Ethics of Big Data
        </KickerHeading>
        <Prompt>
          <PromptKicker /> With companies collecting vast amounts of personal
          data to generate insights, where is the line between providing{" "}
          <Tint tone="counter">personalized value</Tint> and{" "}
          <Tint>invading consumer privacy</Tint>?
        </Prompt>
        <Figure height="auto" className="max-w-5xl">
          <PrivacyLine />
        </Figure>
      </Slide>

      {/* ================================================================
          Conclusion
          ================================================================ */}
      <Slide id="conclusion" border>
        <KickerHeading kicker="Conclusion:">
          Data-Driven Decision Making
        </KickerHeading>
        <ol className="grid w-full gap-x-12 gap-y-12 md:grid-cols-3">
          {[
            {
              glyph: <GlyphAim />,
              text: "Marketing research reduces uncertainty in decision making.",
            },
            {
              glyph: <GlyphTwoData />,
              text: "A strategic mix of primary and secondary data provides a complete market view.",
            },
            {
              glyph: <GlyphPattern />,
              text: "Effective use of analytics transforms raw data into a competitive advantage.",
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
