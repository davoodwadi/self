"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { cn } from "@/lib/utils";
import {
  Plate,
  P,
  Lead,
  Statement,
  Term,
  Ruled,
  SlideHeading,
  Numbered,
  PartHead,
  Prompt,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { UncertaintyNarrowing, EvidenceLanes, ShareTracking, ChooseAmongAlternatives, JustifiedQuadrant, SymptomAndCauses, CancellationsDoubled, ResearchProcess, SimulatedVersusReal, EffortShift, Stakeholders, PreciseWrongTarget, AgentMediatedPurchase, SamePromptResponses } from "./visuals";

// ============================================================================
// WEEK 01 — RESEARCH FOR MARKETING DECISIONS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

export default function Week1() {
  return (
    <SlideDeck label="Week 01">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 01 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[16ch]">
          Research for <span className="text-[var(--signal)]">Marketing Decisions</span>
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[36ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Marketing research provides{" "}
          <span className="text-[var(--signal)]">evidence</span> that reduces
          uncertainty in managerial decisions.
        </p>
      </Slide>

      {/* ================================================================
          The Purpose of Marketing Research
          ================================================================ */}
      <Slide id="the-purpose-of-marketing-research" border className="!py-8">
        <SlideHeading>The Purpose of Marketing Research</SlideHeading>
        <Statement className="!max-w-none">
          Marketing decisions are made under{" "}
          <span className="text-[var(--counter)]">uncertainty</span>.
        </Statement>
        <div className="mt-7 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              A manager who launches a product cannot know in advance the level
              of demand it will attract.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              A manager who changes a price cannot know in advance how
              customers will respond.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled tone="signal">
              <p className={BIG}>
                Marketing research reduces this uncertainty by providing{" "}
                <span className="text-[var(--signal)]">evidence</span> in place
                of assumptions.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P>
                The value of a study depends on the extent to which its findings
                change, confirm, or refine a decision.
              </P>
            </Ruled>
          </div>
          <Plate>
            <UncertaintyNarrowing />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Defining Marketing Research
          ================================================================ */}
      <Slide id="defining-marketing-research" border className="!py-8">
        <SlideHeading>Defining Marketing Research</SlideHeading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.5rem,2.6vw,2.2rem)]">
          Marketing research is the <Term tone="ink">systematic</Term> and{" "}
          <Term tone="ink">objective</Term> identification, collection,
          analysis, and dissemination of information for the purpose of{" "}
          <span className="text-[var(--signal)]">improving marketing decisions</span>.
        </Statement>
        <div className="mt-10 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              <Term tone="ink">Systematic</Term> means that the research
              follows a planned and documented procedure rather than relying on
              intuition.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term tone="ink">Objective</Term> means that the researcher
              reports what the evidence shows, independent of the
              client&apos;s expectations.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              The definition is oriented toward{" "}
              <Term>decisions</Term>: a study whose findings are not used in
              decision-making has not achieved its purpose, regardless of its
              methodological rigor.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Research, Analytics, and Intelligence
          ================================================================ */}
      <Slide
        id="research-analytics-and-intelligence"
        border
        className="!py-8"
        exercise={exercise["research-analytics-and-intelligence"]}
      >
        <SlideHeading>Research, Analytics, and Intelligence</SlideHeading>
        <Lead className="!max-w-none">
          Three related activities provide evidence to marketing managers.
        </Lead>
        <EvidenceLanes
          texts={[
            <P key="r" className="!max-w-none">
              <Term>Marketing research</Term> is project-based. It involves
              collecting new data to answer a specific question, such as why
              trial users of an application do not convert to paid
              subscriptions.
            </P>,
            <P key="a" className="!max-w-none">
              <Term tone="ink">Marketing analytics</Term> is ongoing. It
              involves the analysis of data that the firm already generates,
              such as sales, web traffic, and customer records, in order to
              monitor and predict performance.
            </P>,
            <P key="i" className="!max-w-none">
              <Term tone="counter">Marketing intelligence</Term> is the
              continuous monitoring of the external environment, including
              competitor prices, regulatory changes, and industry developments.
            </P>,
          ]}
        />
        <p className="type-quote mt-6 !max-w-none !text-[clamp(1.25rem,2vw,1.7rem)]">
          Most organizations require all three, as each addresses different
          questions over different time horizons.
        </p>
      </Slide>

      {/* ================================================================
          Problem-Identification and Problem-Solving Research
          ================================================================ */}
      <Slide
        id="problem-identification-and-problem-solving-research"
        border
        className="!py-8"
        exercise={exercise["problem-identification-and-problem-solving-research"]}
      >
        <SlideHeading className="[&_h2]:!max-w-none">
          Problem-Identification and Problem-Solving Research
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <p className={BIG}>
                <span className="text-[var(--counter)]">Problem-identification research</span>{" "}
                detects problems that are not yet apparent.
              </p>
            </Ruled>
            <P>
              Examples include market potential studies, market share tracking,
              and brand image research.
            </P>
            <Plate>
              <ShareTracking />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                <span className="text-[var(--signal)]">Problem-solving research</span>{" "}
                informs the choice among alternative courses of action for a
                known problem.
              </p>
            </Ruled>
            <P>
              Examples include pricing research, advertising testing, and
              product concept tests.
            </P>
            <Plate>
              <ChooseAmongAlternatives />
            </Plate>
          </div>
        </div>
        <p className="type-quote mt-8 w-full border-t-2 border-[var(--ink)] pt-6 !max-w-none !text-[clamp(1.25rem,2vw,1.7rem)]">
          A single project may combine both types; identifying the type
          required determines the design of the study.
        </p>
      </Slide>

      {/* ================================================================
          When Research Is Justified
          ================================================================ */}
      <Slide
        id="when-research-is-justified"
        border
        className="!py-8"
        exercise={exercise["when-research-is-justified"]}
      >
        <SlideHeading>When Research Is Justified</SlideHeading>
        <Lead className="!max-w-none">
          Research requires financial resources and time, and its expected
          benefit must therefore exceed its cost.
        </Lead>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <p className={BIG}>
                Research is <span className="text-[var(--signal)]">justified</span>{" "}
                when the decision is consequential and the appropriate course of
                action is uncertain.
              </p>
            </Ruled>
            <Plate className="max-w-[26rem]">
              <JustifiedQuadrant />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <P>
                Research is <Term tone="counter">not justified</Term> when the
                decision has already been made and the study would serve only to
                legitimize it.
              </P>
            </Ruled>
            <Ruled tone="counter" weight="thin">
              <P>
                Research is <Term tone="counter">not justified</Term> when its
                cost exceeds the value of the decision it is intended to inform.
              </P>
            </Ruled>
            <Ruled tone="counter" weight="thin">
              <P>
                Research is <Term tone="counter">not justified</Term> when its
                findings would become available only after the decision must be
                made.
              </P>
            </Ruled>
          </div>
        </div>
        <p className="type-quote mt-8 w-full border-l-2 border-[var(--signal)] bg-[var(--signal-tint)] px-7 py-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          The <span className="text-[var(--signal)]">value of information</span>{" "}
          is the expected improvement in the decision that the research makes
          possible.
        </p>
      </Slide>

      {/* ================================================================
          Providers of Marketing Research
          ================================================================ */}
      <Slide id="providers-of-marketing-research" border className="!py-8">
        <SlideHeading>Providers of Marketing Research</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          <Numbered n={1}>
            <Ruled>
              <p className={BIG}>
                <Term tone="ink">Internal research departments</Term>, often
                called insights teams, operate within the firm and have direct
                knowledge of its data and decisions.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={2}>
            <Ruled>
              <p className={BIG}>
                <Term tone="ink">Full-service agencies</Term> design and conduct
                entire projects on behalf of clients.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={3}>
            <Ruled>
              <p className={BIG}>
                <Term tone="ink">Syndicated services</Term> collect data once
                and sell it to multiple firms, as in retail sales panels and
                media audience measurement.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={4}>
            <Ruled>
              <p className={BIG}>
                <Term tone="ink">Specialized suppliers</Term> provide a single
                component of the process, such as online panels, field
                interviewing, or data analysis.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={5} tone="counter" className="lg:col-span-2">
            <Ruled tone="counter">
              <p className={BIG}>
                <span className="text-[var(--counter)]">Self-service platforms</span>{" "}
                now enable managers to conduct surveys and experiments
                independently, which increases speed but does not in itself
                ensure quality.
              </p>
            </Ruled>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Defining the Problem
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Defining the Problem" />
        <Statement className="mt-8 !max-w-none">
          Problem definition is the{" "}
          <span className="text-[var(--signal)]">most consequential step</span>{" "}
          in any research project.
        </Statement>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled tone="counter">
              <p className={BIG}>
                A precise answer to an incorrectly defined question produces
                unwarranted confidence in a flawed decision.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Every subsequent step, from research design to analysis, depends
                on the definition of the problem.
              </p>
            </Ruled>
          </div>
          <Plate>
            <PreciseWrongTarget />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Symptoms Versus Problems
          ================================================================ */}
      <Slide
        id="symptoms-versus-problems"
        border
        className="!py-8"
        exercise={exercise["symptoms-versus-problems"]}
      >
        <SlideHeading>Symptoms Versus Problems</SlideHeading>
        <Lead className="!max-w-none">
          Decision makers typically present a symptom rather than a problem.
        </Lead>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="counter">
            <P>
              A <Term tone="counter">symptom</Term> is an observable change,
              such as declining sales, increasing complaints, or fewer repeat
              visits.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              A <Term>problem</Term> is the underlying cause that produces the
              symptom.
            </P>
          </Ruled>
        </div>
        <P className="mt-6 !max-w-none">
          Declining sales at a coffee chain may result from a new competitor, a
          price increase, slower service, or a change in commuting patterns.
        </P>
        <Plate className="mt-4 max-w-[60rem]">
          <SymptomAndCauses />
        </Plate>
        <p className="type-quote mt-6 w-full border-t-2 border-[var(--ink)] pt-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Each cause requires a different decision; the researcher must
          therefore identify the underlying cause before designing the study.
        </p>
      </Slide>

      {/* ================================================================
          The Problem Audit
          ================================================================ */}
      <Slide id="the-problem-audit" border className="!py-8">
        <SlideHeading>The Problem Audit</SlideHeading>
        <Lead className="!max-w-[62ch]">
          A <Term>problem audit</Term> is a structured examination of the
          decision situation, conducted by the researcher together with the
          decision maker.
        </Lead>
        <ol className="mt-8 grid w-full gap-x-10 gap-y-6 border-t-2 border-[var(--ink)] pt-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "It establishes the event that created the need for action and the history of the problem.",
            "It identifies the courses of action under consideration.",
            "It specifies the information required to choose among them.",
            "It determines how, and by whom, the findings will be used.",
          ].map((s, i) => (
            <li key={i}>
              <Numbered n={i + 1}>
                <p className={BIG}>{s}</p>
              </Numbered>
            </li>
          ))}
          <li className="lg:col-span-2">
            <Numbered n={5} tone="signal">
              <p className={BIG}>
                It records the decision maker&apos;s existing beliefs, so that
                the research <span className="text-[var(--signal)]">tests</span>{" "}
                those beliefs rather than confirms them.
              </p>
            </Numbered>
          </li>
        </ol>
      </Slide>

      {/* ================================================================
          Management Decision Problem Versus Marketing Research Problem
          ================================================================ */}
      <Slide
        id="management-decision-problem-versus-marketing-research-problem"
        border
        className="!py-8"
        exercise={exercise["management-decision-problem-versus-marketing-research-problem"]}
      >
        <SlideHeading className="[&_h2]:!max-w-none [&_h2]:!text-[clamp(1.7rem,3vw,2.5rem)]">
          Management Decision Problem Versus Marketing Research Problem
        </SlideHeading>
        <div className="grid w-full gap-x-4 gap-y-4 md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] md:gap-x-6">
          <Ruled tone="counter">
            <p className={BIG}>
              The <Term tone="counter">management decision problem</Term>{" "}
              concerns what the decision maker should do. It is action-oriented.
            </p>
          </Ruled>
          <span aria-hidden className="hidden md:block" />
          <Ruled tone="signal">
            <p className={BIG}>
              The <Term>marketing research problem</Term> concerns what
              information is required and how it can be obtained. It is
              information-oriented.
            </p>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-center gap-x-4 gap-y-3 border-y border-[var(--rule)] py-5 md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] md:gap-x-6">
          <p className={BIG}>
            &ldquo;Should the firm introduce a premium tier of its streaming
            service?&rdquo; is a management decision problem.
          </p>
          <span aria-hidden className="hidden text-center text-[1.5rem] text-[var(--ink-3)] md:block">
            &rarr;
          </span>
          <p className={BIG}>
            &ldquo;What proportion of current subscribers would pay a higher
            price for premium features, and which features determine that
            willingness to pay?&rdquo; is the corresponding marketing research
            problem.
          </p>
        </div>
        <div className="grid w-full items-center gap-x-4 gap-y-1 border-b border-[var(--rule)] py-5 md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] md:gap-x-6">
          <p className={BIG}>
            &ldquo;Should the retailer redesign its store layout?&rdquo;
          </p>
          <span className="type-caption text-center">corresponds to</span>
          <p className={BIG}>
            &ldquo;How does the current layout affect the time shoppers spend in
            the store and the categories they visit?&rdquo;
          </p>
        </div>
        <p className="type-quote mt-6 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          The research problem must be broad enough to capture the underlying
          issue and specific enough to guide the research design.
        </p>
      </Slide>

      {/* ================================================================
          Research Questions and Hypotheses
          ================================================================ */}
      <Slide id="research-questions-and-hypotheses" border className="!py-8">
        <SlideHeading>Research Questions and Hypotheses</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                The research problem is divided into specific research
                questions.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <p className={BIG}>
                Each research question specifies one element of the information
                the decision requires.
              </p>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <p className={BIG}>
                A <span className="text-[var(--signal)]">hypothesis</span> is a
                testable statement that proposes an answer to a research
                question.
              </p>
            </Ruled>
            <p className="type-quote border-l-2 border-[var(--signal)] bg-[var(--signal-tint)] px-6 py-5 !text-[clamp(1.2rem,1.8vw,1.5rem)]">
              &ldquo;Subscribers under 30 are more willing to pay for premium
              features than subscribers over 30&rdquo; is a hypothesis.
            </p>
          </div>
        </div>
        <p className="type-quote mt-8 w-full border-t-2 border-[var(--ink)] pt-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Hypotheses increase the precision of a study, because the data can
          either support or contradict them.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: Symptom or Problem?
          ================================================================ */}
      <Slide id="discussion-symptom-or-problem" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          Symptom or Problem?
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A fitness club reports that new members now cancel within three
            months at twice the rate of the previous year. The general manager
            requests a survey of member satisfaction. Which other causes could
            account for this symptom, and how should the management decision
            problem and the marketing research problem be formulated before the
            survey is commissioned?
          </Prompt>
          <Plate>
            <CancellationsDoubled />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: The Marketing Research Process
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="The Marketing Research Process" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.5rem,2.4vw,2.1rem)]">
            Rigorous research follows a{" "}
            <span className="text-[var(--signal)]">structured sequence</span> of
            steps.
          </Statement>
          <Ruled tone="counter">
            <p className={BIG}>
              The steps are presented in sequence, although in practice
              researchers return to earlier steps when new evidence changes the
              question.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Six Steps of the Research Process
          ================================================================ */}
      <Slide
        id="the-six-steps-of-the-research-process"
        border
        className="!py-8"
        exercise={exercise["the-six-steps-of-the-research-process"]}
      >
        <SlideHeading>The Six Steps of the Research Process</SlideHeading>
        <div className="mb-4 w-full min-w-0">
          <ResearchProcess />
        </div>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-3 xl:grid-cols-6">
          {[
            "Step 1 is defining the problem, through the problem audit and discussions with decision makers.",
            "Step 2 is developing an approach to the problem, including the theoretical framework, research questions, and hypotheses.",
            "Step 3 is formulating the research design, which specifies the type of study, the measures, and the sample.",
            "Step 4 is collecting the data, in the field, online, or from existing sources.",
            "Step 5 is preparing and analyzing the data.",
            "Step 6 is preparing and presenting the report, with findings and recommendations linked to the decision.",
          ].map((s, i) => (
            <li key={i} className="min-w-0 border-t border-[var(--rule-2)] pt-3">
              <P className="!leading-snug">{s}</P>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Part 4: AI Across the Research Workflow
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="AI Across the Research Workflow" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.4rem,2.3vw,2rem)]">
          Artificial intelligence, and large language models in particular, is
          now used at every step of the research process.
        </Statement>
        <Plate className="mt-6">
          <ResearchProcess ai />
        </Plate>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              AI increases the speed at which research can be conducted. It
              does not alter the criteria by which the validity of research is
              judged.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The researcher&apos;s task is therefore to determine at which
              steps AI is appropriate and how its output is to be verified.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Applications of AI in Marketing Research
          ================================================================ */}
      <Slide
        id="applications-of-ai-in-marketing-research"
        border
        className="!py-8"
        exercise={exercise["applications-of-ai-in-marketing-research"]}
      >
        <SlideHeading>Applications of AI in Marketing Research</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["problem definition", "AI can be used to summarize background documents and to propose alternative explanations for a symptom."],
            ["research design", "AI can be used to draft survey questions, interview guides, and screening criteria."],
            ["data collection", "AI can be used to moderate interviews at scale and to translate research instruments into other languages."],
            ["analysis", "AI can be used to code open-ended responses, to write analysis code, and to summarize large volumes of text."],
            ["reporting", "AI can be used to draft summaries and visualizations for different audiences."],
          ].map(([stage, rest], i) => (
            <li key={stage} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <p className={BIG}>
                    In <Term tone="ink">{stage}</Term>, {rest}
                  </p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Limitations of AI in Marketing Research
          ================================================================ */}
      <Slide
        id="limitations-of-ai-in-marketing-research"
        border
        className="!py-8"
        exercise={exercise["limitations-of-ai-in-marketing-research"]}
      >
        <SlideHeading>Limitations of AI in Marketing Research</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <p className={BIG}>
                AI systems can generate facts, statistics, and references that
                appear credible but are false.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>AI systems can reproduce biases present in their training data.</p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                AI output tends to conform to the framing of the prompt, so
                that a leading prompt yields a confirmatory answer.
              </p>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <p className={BIG}>
                Responses from AI-simulated consumers are not observations of
                real consumers. They may appear plausible while differing
                systematically from the responses of real people.
              </p>
            </Ruled>
            <Plate>
              <SimulatedVersusReal />
            </Plate>
          </div>
        </div>
        <p className="type-quote mt-7 w-full border-t-2 border-[var(--ink)] pt-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          AI output is expressed with the same apparent confidence whether it
          is accurate or not, so its fluency provides no evidence of its
          accuracy.
        </p>
      </Slide>

      {/* ================================================================
          The Researcher's Accountability
          ================================================================ */}
      <Slide id="the-researchers-accountability" border className="!py-8">
        <SlideHeading>The Researcher&apos;s Accountability</SlideHeading>
        <Statement className="!max-w-none">
          The <span className="text-[var(--signal)]">researcher</span>, not the
          tool, is responsible for every finding in the report.
        </Statement>
        <div className="mt-8 grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                Every AI output that informs a decision must be verified against
                a source, a sample of human judgments, or empirical data.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Researchers should document where and how AI was used, so that
                others can evaluate and replicate the work.
              </p>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <p className={BIG}>
                The use of AI shifts the researcher&apos;s effort from producing
                the work to verifying it.
              </p>
            </Ruled>
            <Plate>
              <EffortShift />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          AI Agents as a Subject of Marketing Research
          ================================================================ */}
      <Slide id="ai-agents-as-a-subject-of-marketing-research" border className="!py-8">
        <SlideHeading>AI Agents as a Subject of Marketing Research</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
          An <span className="text-[var(--signal)]">AI agent</span> is a system built on a large language model that
          can search for information, compare alternatives, and complete transactions on behalf of a person.
        </Statement>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                A consumer who delegates a purchase to an AI agent makes the agent a{" "}
                <Term>surrogate consumer</Term>: the consumer states the goal, and the agent acquires product
                information and selects an alternative.
              </p>
            </Ruled>
            <Ruled tone="counter">
              <p className={BIG}>
                In agent-mediated purchasing, the agent rather than the consumer encounters the product page, the
                price presentation, and the sponsorship label.
              </p>
            </Ruled>
          </div>
          <Plate>
            <AgentMediatedPurchase />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P>
              Research questions therefore extend from consumers to their agents: which information agents
              acquire, how they weight product attributes, and whose interests their recommendations serve.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              New management decision problems follow, such as how to present product information to AI agents,
              and whether an agent is suitable for deployment to the firm&apos;s customers.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Evaluating AI Systems as a Research Task
          ================================================================ */}
      <Slide
        id="evaluating-ai-systems-as-a-research-task"
        border
        className="!py-8"
        exercise={exercise["evaluating-ai-systems-as-a-research-task"]}
      >
        <SlideHeading>Evaluating AI Systems as a Research Task</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
          The evaluation of an AI model or agent is a research problem: the researcher defines the behavior of
          interest, measures it under controlled conditions, and estimates it with known precision.
        </Statement>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="counter" weight="thin">
            <P>
              Standard AI benchmarks report accuracy on large sets of general questions, such as mathematics or
              programming. They do not establish how a model behaves in a specific marketing task.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thin">
            <P>
              A <Term>behavioral evaluation</Term> applies the methods of this course to the AI system: validated
              measures (Week 4), adequate samples of responses (Week 5), hypothesis tests (Week 7), and controlled
              experiments (Week 8).
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                The same model can produce different responses to the same prompt, so that a single response is
                not a reliable basis for conclusions about its behavior (Wadi &amp; Fredette, 2025).
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P>
                The researcher who evaluates an AI system is accountable for the evidence in the same way as for
                research on consumers.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SamePromptResponses />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Ethics in Marketing Research
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Ethics in Marketing Research" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.4rem,2.3vw,2rem)]">
          Marketing research involves four stakeholders: the researcher, the
          client, the respondent, and the public.
        </Statement>
        <Plate className="mt-6">
          <Stakeholders />
        </Plate>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>Each stakeholder holds rights and bears obligations.</p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              Ethical violations reduce public trust in research, on which all
              researchers depend.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Obligations to Respondents
          ================================================================ */}
      <Slide
        id="obligations-to-respondents"
        border
        className="!py-8"
        exercise={exercise["obligations-to-respondents"]}
      >
        <SlideHeading>Obligations to Respondents</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              Respondents give <Term tone="ink">informed consent</Term>: they
              are told the purpose of the study and how their data will be
              used, and that they may withdraw at any time.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Respondents&apos; <Term tone="ink">privacy</Term> is protected:
              personal data are kept confidential and reported only in
              aggregate or anonymized form.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Respondents are not harmed, deceived without justification, or
              pressured to participate.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              Research is never used as a pretext for selling. Soliciting sales
              under the guise of research is known as{" "}
              <Term tone="counter">sugging</Term> and constitutes an ethical
              violation.
            </p>
          </Ruled>
          <Ruled tone="signal" className="lg:col-span-2">
            <p className={BIG}>
              Uploading respondent data to an external{" "}
              <span className="text-[var(--signal)]">AI tool</span> constitutes
              a use of those data and must therefore fall within the scope of
              the consent that respondents gave.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Obligations to Clients and the Public
          ================================================================ */}
      <Slide id="obligations-to-clients-and-the-public" border className="!py-8">
        <SlideHeading>Obligations to Clients and the Public</SlideHeading>
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-14">
          <div className="flex min-w-0 flex-col gap-5 border-t-2 border-[var(--signal)] pt-5">
            <p className={BIG}>
              <span className="text-[var(--signal)]">Researchers</span> report
              findings accurately, including findings that are unfavorable to
              the client.
            </p>
            <p className={BIG}>
              <span className="text-[var(--signal)]">Researchers</span> disclose
              the limitations of the method, the sample, and the tools used,
              including AI.
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-5 border-t-2 border-[var(--counter)] pt-5">
            <p className={BIG}>
              <span className="text-[var(--counter)]">Clients</span> do not
              misrepresent findings to the public, for example by citing results
              out of context in advertising.
            </p>
            <p className={BIG}>
              <span className="text-[var(--counter)]">Clients</span> do not
              commission studies designed to reach a predetermined conclusion.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: AI in the Research Function
          ================================================================ */}
      <Slide id="discussion-ai-in-the-research-function" border className="!py-8">
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="type-h1">
            <span className="type-label mb-4 block !text-[0.8rem] !text-[var(--counter)]">
              Discussion:
            </span>{" "}
            AI in the Research Function
          </h2>
          <div className="mt-10 w-full max-w-5xl border-y-2 border-[var(--counter)] px-4 py-9 md:px-12">
            <p className="type-quote mx-auto !max-w-[44ch] !text-[clamp(1.4rem,2.4vw,2.1rem)]">
              <span className="type-label mb-5 block !text-[0.8rem] !leading-none !text-[var(--counter)]">
                Discussion:
              </span>{" "}
              A marketing manager proposes to replace a planned focus group
              study with a set of AI-generated personas that respond to the same
              questions within minutes. What would the firm{" "}
              <span className="text-[var(--signal)]">gain</span>, what might it{" "}
              <span className="text-[var(--counter)]">lose</span>, and under
              what conditions, if any, would the substitution be
              methodologically defensible?
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Marketing research provides evidence for decisions made under uncertainty, and it is justified only when its findings can inform a decision in time.",
            "Research, analytics, and intelligence are complementary sources of evidence.",
            "The most consequential step is the translation of a symptom and a management decision problem into a precise marketing research problem.",
            "The research process comprises six steps, from problem definition to reporting, to which researchers often return iteratively.",
            "AI can accelerate every step of the process, but its output must be verified, and the researcher remains accountable for every finding.",
            "Ethical research protects respondents, reports accurately to clients, and respects the public interest.",
            "AI agents that acquire information and select products on consumers' behalf are a new subject of marketing research, and the evaluation of AI systems applies the methods of measurement, sampling, and experimentation developed in this course.",
          ].map((s, i) => (
            <li key={i} className={cn("min-w-0")}>
              <Numbered n={i + 1} tone="signal">
                <Ruled weight="thin">
                  <p className={BIG}>{s}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
