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
  ResearchBridge,
  ProblemAim,
  ObjectiveFork,
  PlanSheet,
  CostValueBalance,
  ImplementInterpret,
  WorkTogether,
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
    <Slide id={id} border className="!py-8" exercise={exercise[id]}>
      <StepStrip active={steps} className="mb-6" />
      <KickerHeading kicker={kicker} className="md:!mb-6">
        {title}
      </KickerHeading>
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
      <Slide id="part-1" border className="!py-8">
        <div className="flex w-full items-end gap-8 xl:gap-12">
          <PartNumeral n={1} className="text-[5rem] xl:text-[6.5rem]" />
          <PartTitle n={1} title="The Marketing Research Process" />
        </div>
        <div className="mt-6 h-px w-full bg-[var(--rule)]" />
        {/* A text rail beside the bridge the sentences describe. */}
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,3.3fr)_minmax(0,8fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Lead className="!max-w-none">
              Marketing research is the <Term>systematic</Term> design,
              collection, and analysis of data.
            </Lead>
            <Ruled tone="counter">
              <P>
                It connects{" "}
                <Term tone="counter">consumers, customers, and the public</Term>{" "}
                to the marketer through information.
              </P>
            </Ruled>
            <Ruled>
              <P>
                This information is used to identify and define marketing{" "}
                <Term tone="counter">opportunities</Term> and{" "}
                <Term tone="ink">problems</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ResearchBridge />
          </Plate>
        </div>
        <StepStrip large className="mt-12" />
      </Slide>

      <StepSlide
        id="defining-the-problem"
        steps={[0]}
        kicker="Step 1:"
        title="Defining the Problem"
      >
        {/* Plates in columns, each under the sentences it draws. */}
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="!max-w-[34ch]">
              The first step is to carefully{" "}
              <Tint>define the problem</Tint> and agree on research
              objectives.
            </Statement>
            <P>
              This is often <Term>the hardest step</Term>, as it guides the
              entire research process.
            </P>
            <Plate>
              <ProblemAim />
            </Plate>
          </div>
          <Ruled className="flex min-w-0 flex-col gap-5">
            <Big>
              Objectives can be <Term tone="ink">exploratory</Term>,{" "}
              <Term tone="counter">descriptive</Term>, or{" "}
              <Term>causal</Term> depending on the problem.
            </Big>
            <Plate>
              <ObjectiveFork />
            </Plate>
          </Ruled>
        </div>
      </StepSlide>

      <StepSlide
        id="developing-the-research-plan"
        steps={[1]}
        kicker="Step 2:"
        title="Developing the Research Plan"
      >
        {/* Two sentences over the plan sheet they fill in. */}
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Lead className="!max-w-none">
            The research plan determines the <Term>exact information</Term>{" "}
            needed.
          </Lead>
          <Lead className="!max-w-none">
            It outlines <Term tone="counter">sources of existing data</Term>{" "}
            and spells out specific research approaches.
          </Lead>
        </div>
        <Figure height="auto" dense className="mx-auto !my-4 max-w-[790px]">
          <PlanSheet />
        </Figure>
        {/* The trade-off the plan must strike, beside its balance. */}
        <div className="grid w-full items-center gap-8 border-t-2 border-[var(--signal)] pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.5rem,2.3vw,2rem)]">
            The plan must <Tint>balance</Tint> the cost of obtaining data
            against the value of the insights.
          </Statement>
          <Plate className="!p-2">
            <CostValueBalance />
          </Plate>
        </div>
      </StepSlide>

      <StepSlide
        id="steps-3-and-4"
        steps={[2, 3]}
        kicker="Steps 3 and 4:"
        title="Implementing and Interpreting"
      >
        {/* Each sentence stands over its half of the pipeline. */}
        <div className="grid w-full gap-8 md:grid-cols-[minmax(0,43fr)_minmax(0,37fr)] md:gap-12">
          <Ruled tone="counter">
            <Big>
              <Tint tone="counter">Implementing</Tint> involves collecting,
              processing, and analyzing the information.
            </Big>
          </Ruled>
          <Ruled tone="signal">
            <Big>
              <Tint>Interpreting</Tint> the findings involves drawing
              conclusions and reporting them to management.
            </Big>
          </Ruled>
        </div>
        <Figure height="auto" dense>
          <ImplementInterpret />
        </Figure>
        {/* The closing sentence beside the two people it names. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-12">
          <Statement className="!max-w-[30ch]">
            Managers and researchers must <Tint>work together</Tint> to extract
            actionable insights.
          </Statement>
          <Plate>
            <WorkTogether />
          </Plate>
        </div>
      </StepSlide>

      <Slide id="discussion-defining-the-problem" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter" className="md:!mb-6">
          Defining the Problem
        </KickerHeading>
        <Prompt>
          <PromptKicker /> If a company notices a sudden drop in sales for a
          flagship product, what specific{" "}
          <Tint>exploratory research objectives</Tint> might they set before rushing to launch a new advertising campaign?
        </Prompt>
        <Figure height="auto" dense className="!mt-6 max-w-5xl">
          <SalesDropFork />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 2 — Primary vs. Secondary Data
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,13rem)_1fr] xl:gap-14">
          <PartNumeral n={2} className="text-[6rem] xl:text-[10rem]" />
          <div className="min-w-0">
            <PartTitle n={2} title="Primary vs. Secondary Data" />
            <div className="mt-6 h-px w-full bg-[var(--rule)]" />
            <Lead className="mt-6 !max-w-[58ch]">
              Marketers gather two main types of data:{" "}
              <Term>primary</Term> and <Term tone="counter">secondary</Term>.
            </Lead>
            <Figure height="auto" dense className="!my-5">
              <TwoDataTypes />
            </Figure>
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
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
          </div>
        </div>
      </Slide>

      <Slide
        id="secondary-data"
        border
        className="!py-8"
        exercise={exercise["secondary-data"]}
      >
        <Tag>Information that already exists</Tag>
        <Heading>Secondary Data</Heading>
        <Statement className="!max-w-none !text-[clamp(1.6rem,2.6vw,2.2rem)]">
          Secondary data consists of information that{" "}
          <Tint tone="counter">already exists</Tint> somewhere.
        </Statement>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <P>
              It is usually collected for{" "}
              <Term tone="ink">another purpose</Term> but can be relevant to
              the <Term>current problem</Term>.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Sources include <Term tone="ink">internal databases</Term>,{" "}
              <Term tone="counter">government reports</Term>, and{" "}
              <Term tone="counter">commercial data services</Term>.
            </P>
          </Ruled>
        </div>
        <Figure height="auto" dense className="mx-auto max-w-[920px]">
          <SecondarySplitLane />
        </Figure>
      </Slide>

      <Slide id="advantages-and-disadvantages-of-secondary-data" border className="!py-8">
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
                "grid items-center gap-6 border-t-2 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] md:gap-12",
                row.border,
              )}
            >
              <p className="type-h2 !font-normal max-w-[30ch]">{row.text}</p>
              <Plate className="!p-2">{row.plate}</Plate>
            </li>
          ))}
        </ol>
      </Slide>

      <Slide
        id="primary-data"
        border
        className="!py-8"
        exercise={exercise["primary-data"]}
      >
        <Tag>Collected for the purpose at hand</Tag>
        <Heading>Primary Data</Heading>
        <Statement className="!max-w-none !text-[clamp(1.6rem,2.6vw,2.2rem)]">
          Primary data consists of information collected for the{" "}
          <Tint>specific purpose at hand</Tint>.
        </Statement>
        <Lead className="mt-5 !max-w-none">
          It requires decisions on research approaches, contact methods, and
          sampling plans.
        </Lead>
        <Figure height="auto" dense className="mx-auto !my-4 max-w-[880px]">
          <PrimaryDecisions />
        </Figure>
        {/* What that tailoring gives, and what it costs. */}
        <div className="grid w-full items-center gap-8 border-t-2 border-[var(--signal)] pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-12">
          <Big className="!max-w-[28ch]">
            This data is <Tint>highly relevant</Tint> but takes more time and
            resources to gather.
          </Big>
          <Plate className="!p-2">
            <RelevantCostly />
          </Plate>
        </div>
      </Slide>

      <Slide
        id="primary-research-approaches"
        border
        className="!py-8"
        exercise={exercise["primary-research-approaches"]}
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
            <div key={i} className="flex min-w-0 flex-col gap-5">
              <Ruled tone={col.tone} className="md:min-h-[6.5rem]">
                <P>{col.text}</P>
              </Ruled>
              <Plate>{col.plate}</Plate>
            </div>
          ))}
        </div>
      </Slide>

      <Slide id="discussion-choosing-data-types" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter" className="md:!mb-6">
          Choosing Data Types
        </KickerHeading>
        <Prompt>
          <PromptKicker /> When launching a{" "}
          <Tint>completely novel product category</Tint> that does not
          currently exist, why might a company have to rely heavily on primary
          data rather than{" "}
          <Tint tone="counter">secondary data</Tint>?
        </Prompt>
        <Figure height="auto" dense className="!mt-6 max-w-5xl">
          <NovelShelf />
        </Figure>
      </Slide>

      {/* ================================================================
          Part 3 — Data Analytics and Customer Insights
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <div className="flex w-full items-end gap-8 xl:gap-12">
          <PartNumeral n={3} className="text-[5rem] xl:text-[6.5rem]" />
          <PartTitle n={3} title="Data Analytics and Customer Insights" />
        </div>
        <div className="mt-6 h-px w-full bg-[var(--rule)]" />
        {/* Two sentences over the field they describe, then a closing band. */}
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <Lead className="!max-w-none">
              In the digital age, marketers have access to{" "}
              <Term tone="ink">massive amounts of data</Term>.
            </Lead>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Big Data</Term> refers to the huge and complex
              data sets generated by sophisticated technologies.
            </P>
          </Ruled>
        </div>
        <Figure height="auto" dense className="mx-auto max-w-[880px]">
          <BigDataFork />
        </Figure>
        <p className="type-display w-full border-y-2 border-[var(--ink)] py-5 !text-[clamp(1.6rem,2.8vw,2.4rem)] !leading-tight">
          The challenge is not getting more data, but getting{" "}
          <span className="text-[var(--signal)]">better data and insights</span>.
        </p>
      </Slide>

      <Slide
        id="customer-relationship-management"
        border
        className="!py-8"
        exercise={exercise["customer-relationship-management"]}
      >
        <Tag>The CRM cycle</Tag>
        <Heading>Customer Relationship Management (CRM)</Heading>
        {/* A text rail beside the cycle it describes. */}
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement className="!max-w-none !text-[clamp(1.5rem,2.3vw,2rem)]">
              CRM involves managing{" "}
              <Tint>detailed information about individual customers</Tint>.
            </Statement>
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
          <Plate>
            <CrmCycle />
          </Plate>
        </div>
      </Slide>

      <Slide
        id="role-of-marketing-analytics"
        border
        className="!py-8"
        exercise={exercise["role-of-marketing-analytics"]}
      >
        <Tag>Patterns in big data</Tag>
        <Heading>The Role of Marketing Analytics</Heading>
        <Lead className="!max-w-none">
          <Term>Marketing analytics</Term> consists of the analysis tools,
          technologies, and processes.
        </Lead>
        {/* The lens first, then what it digs out and where that leads. */}
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,9fr)_minmax(0,4fr)] lg:gap-10">
          <Plate>
            <AnalyticsDig />
          </Plate>
          <div className="flex min-w-0 flex-col gap-6">
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
        </div>
      </Slide>

      <Slide id="transforming-data-into-actionable-insights" border className="!py-8">
        <Tag>The human element</Tag>
        <Heading>Transforming Data into Actionable Insights</Heading>
        <Statement className="!max-w-none !text-[clamp(1.6rem,2.6vw,2.2rem)]">
          Data alone is useless without the human element of
          interpretation.
        </Statement>
        <Figure height="auto" dense className="mx-auto max-w-[900px]">
          <InterpretationChain />
        </Figure>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <Ruled tone="signal">
            <Big>
              <Tint>Customer insights</Tint> are fresh understandings of
              customers and the marketplace.
            </Big>
          </Ruled>
          <Ruled tone="counter">
            <Big>
              These insights become the basis for creating{" "}
              <Tint tone="counter">customer value and relationships</Tint>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      <Slide id="discussion-the-ethics-of-big-data" border className="!py-8">
        <KickerHeading kicker="Discussion:" tone="counter" className="md:!mb-6">
          The Ethics of Big Data
        </KickerHeading>
        <Prompt>
          <PromptKicker /> With companies collecting vast amounts of personal
          data to generate insights, where is the line between providing{" "}
          <Tint tone="counter">personalized value</Tint> and{" "}
          <Tint>invading consumer privacy</Tint>?
        </Prompt>
        <Figure height="auto" dense className="!mt-6 max-w-5xl">
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
