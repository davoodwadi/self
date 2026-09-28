"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Plate,
  P,
  Statement,
  Term,
  Ruled,
  SlideHeading,
  Numbered,
  PartHead,
  Prompt,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  ProbabilisticCause,
  ThreeConditions,
  ExperimentAnatomy,
  RandomBalance,
  ThreatsAndControls,
  GeneralizeThreeWays,
  LabThenField,
  DesignRows,
  AbSplit,
  TestPlanner,
  CombinationGrid,
  PeekingPaths,
  QuasiDesigns,
  ParallelTrends,
  PilotDemand,
  BanditAllocation,
  CostAndPrecision,
  AgentFactorial,
  InformationBoard,
} from "./visuals";

// ============================================================================
// WEEK 08 — EXPERIMENTS AND A/B TESTING
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx; the interactive ones are built around one action
// each, so students can run the logic of an experiment rather than read it.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

/** A closing sentence set as a serif line across the slide. */
const CLOSE = "type-quote w-full !max-w-none !text-[clamp(1.15rem,1.8vw,1.5rem)]";

/** A body sentence inside a ruled cell. */
const CELL = "!max-w-none !leading-snug";

export default function Week8() {
  return (
    <SlideDeck label="Week 08">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 08 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">
          <span className="text-[var(--signal)]">Experiments</span> and A/B Testing
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[44ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Experimentation is the principal method by which marketing research establishes{" "}
          <span className="text-[var(--signal)]">cause and effect</span>.
        </p>
      </Slide>

      {/* ================================================================
          Causality in Marketing Research
          ================================================================ */}
      <Slide id="causality-in-marketing-research" border className="!py-8">
        <SlideHeading>Causality in Marketing Research</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          Many marketing decisions depend on a causal question, such as whether a price
          reduction increases sales or whether a new advertisement increases purchase intention.
        </Statement>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P className={CELL}>
                Descriptive research, introduced in Week 2, can establish that two variables are
                associated, but not that one causes the other.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Marketing outcomes typically have several causes, so that research establishes
                whether a particular factor is one of them and estimates the size of its effect.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                In the scientific sense, causality is <Term>probabilistic</Term>: a cause makes
                an effect more likely, but does not guarantee it.
              </p>
            </Ruled>
            <Plate>
              <ProbabilisticCause />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Conditions for Causality
          ================================================================ */}
      <Slide
        id="conditions-for-causality"
        border
        className="!py-8"
        exercise={exercise["conditions-for-causality"]}
      >
        <SlideHeading>Conditions for Causality</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          Three conditions must be satisfied before a causal inference can be drawn.
        </Statement>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Numbered n={1}>
            <Ruled>
              <P className={CELL}>
                <Term tone="ink">Concomitant variation</Term>: the presumed cause and the
                presumed effect vary together, as when stores with more in-store promotion have
                higher sales.
              </P>
            </Ruled>
          </Numbered>
          <Numbered n={2}>
            <Ruled>
              <P className={CELL}>
                <Term tone="ink">Time order</Term>: the cause occurs before or at the same time
                as the effect, and not after it.
              </P>
            </Ruled>
          </Numbered>
          <Numbered n={3} tone="counter">
            <Ruled tone="counter">
              <P className={CELL}>
                <Term tone="counter">Elimination of other possible causes</Term>: other factors
                that could explain the effect are ruled out, such as the possibility that stores
                with more promotion are also located in busier areas.
              </P>
            </Ruled>
          </Numbered>
        </div>
        <Plate className="mt-5">
          <ThreeConditions />
        </Plate>
        <p className={`${CLOSE} mt-5 border-t-2 border-[var(--signal)] pt-4`}>
          Satisfying all three conditions does not prove causality with certainty, but it
          provides strong evidence for it.
        </p>
      </Slide>

      {/* ================================================================
          Elements of an Experiment
          ================================================================ */}
      <Slide id="elements-of-an-experiment" border className="!py-8">
        <SlideHeading>Elements of an Experiment</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          In an experiment, the researcher manipulates one or more independent variables and
          measures their effect on one or more dependent variables, while controlling extraneous
          variables.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="signal" weight="thin">
              <P className={CELL}>
                <Term>Independent variables</Term>, also called treatments, are the variables
                manipulated by the researcher, such as price level or advertising message.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                <Term tone="ink">Dependent variables</Term> are the outcomes measured, such as
                sales, click-through rate, or purchase intention.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                <Term tone="ink">Test units</Term> are the entities exposed to the treatments,
                such as consumers, stores, or geographic regions.
              </P>
            </Ruled>
            <Ruled tone="counter" weight="thin">
              <P className={CELL}>
                <Term tone="counter">Extraneous variables</Term> are variables other than the
                treatments that could affect the dependent variable, such as the season or the
                characteristics of the test units.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <p className={BIG}>
              The <Term>treatment group</Term> receives the treatment, and the{" "}
              <Term tone="ink">control group</Term> does not, or receives the current version.
            </p>
            <Plate>
              <ExperimentAnatomy />
            </Plate>
            <Ruled weight="thin">
              <P className={CELL}>
                A <Term tone="ink">manipulation check</Term> is a measure that verifies whether
                participants perceived the treatment as intended, such as asking participants
                which price they saw.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Random Assignment
          ================================================================ */}
      <Slide id="random-assignment" border className="!py-8">
        <SlideHeading>Random Assignment</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!text-[clamp(1.2rem,1.8vw,1.5rem)]">
              In <Term>random assignment</Term>, chance alone determines the group of each test
              unit, and each test unit has a known, planned probability of being assigned to
              each group, usually an equal one.
            </Statement>
            <Ruled tone="signal">
              <P className={CELL}>
                Random assignment makes the groups equivalent, on average, on all
                characteristics, including characteristics that the researcher has not measured.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                A difference in the dependent variable between randomly assigned groups can
                therefore be attributed to the treatment, within the limits of sampling
                variation.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <RandomBalance />
            </Plate>
            <Ruled tone="counter" weight="thin">
              <P className={`${CELL} !text-[0.95em]`}>
                Random assignment differs from the random sampling introduced in Week 5. Random
                sampling determines who is studied and supports generalization to the
                population. Random assignment determines who receives which treatment and
                supports causal inference.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Validity and Experimental Settings
          ================================================================ */}
      <Slide id="part-2-validity-and-experimental-settings" border className="!py-8">
        <PartHead n={2} title="Validity and Experimental Settings" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          An experiment is evaluated by two criteria: internal validity and external validity.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              <Term>Internal validity</Term> concerns whether the observed effect was caused by
              the treatment.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              <Term tone="counter">External validity</Term> concerns whether the effect
              generalizes beyond the experiment.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Threats to Internal Validity
          ================================================================ */}
      <Slide
        id="threats-to-internal-validity"
        border
        className="!py-8"
        exercise={exercise["threats-to-internal-validity"]}
      >
        <SlideHeading>Threats to Internal Validity</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="grid min-w-0 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {[
              <>
                <Term tone="ink">History</Term> refers to external events that occur during the
                experiment and affect the dependent variable, such as a competitor&rsquo;s price
                reduction during a test of a new promotion.
              </>,
              <>
                <Term tone="ink">Maturation</Term> refers to changes within the test units over
                time, such as growing fatigue or familiarity with the product.
              </>,
              <>
                <Term tone="ink">Testing effects</Term> occur when an initial measurement
                influences later measurements, as when a pretest questionnaire draws
                respondents&rsquo; attention to the advertisement being tested.
              </>,
              <>
                <Term tone="ink">Instrumentation</Term> refers to changes in the measurement
                procedure, such as a change in the definition of a conversion during the test.
              </>,
              <>
                <Term tone="ink">Selection bias</Term> occurs when the groups differ before the
                treatment, as when stores volunteer to take part in a test.
              </>,
              <>
                <Term tone="ink">Mortality</Term>, or attrition, occurs when test units leave the
                experiment at different rates across groups.
              </>,
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Ruled weight="thin" className="!pt-2.5">
                  <P className="!max-w-none !text-[0.92em] !leading-snug">{s}</P>
                </Ruled>
              </li>
            ))}
          </ol>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                Random assignment and a control group address most of these threats.
              </p>
            </Ruled>
            <Plate>
              <ThreatsAndControls />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          External Validity
          ================================================================ */}
      <Slide id="external-validity" border className="!py-8">
        <SlideHeading>External Validity</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          <Term tone="counter">External validity</Term> is the extent to which the results of an
          experiment can be generalized to other people, settings, and times.
        </Statement>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Ruled weight="thin">
            <P className={CELL}>
              Results obtained with student participants may not generalize to the consumers in
              the target market.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className={CELL}>
              Results obtained in an artificial setting may not generalize to the conditions
              under which consumers actually make decisions.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className={CELL}>Results obtained in one season or market may not hold in another.</P>
          </Ruled>
        </div>
        <Plate className="mt-4">
          <GeneralizeThreeWays />
        </Plate>
        <p className={`${CLOSE} mt-5 border-t-2 border-[var(--counter)] pt-4`}>
          Measures taken to increase internal validity, such as tightly controlling the setting,
          often reduce external validity.
        </p>
      </Slide>

      {/* ================================================================
          Laboratory and Field Experiments
          ================================================================ */}
      <Slide
        id="laboratory-and-field-experiments"
        border
        className="!py-8"
        exercise={exercise["laboratory-and-field-experiments"]}
      >
        <SlideHeading>Laboratory and Field Experiments</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="signal">
              <P className={CELL}>
                A <Term>laboratory experiment</Term> is conducted in an artificial environment
                constructed by the researcher, such as a simulated store or an online study with
                a panel of respondents.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Laboratory experiments offer strong control over extraneous variables, and
                therefore high internal validity, at relatively low cost.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="counter">
              <P className={CELL}>
                A <Term tone="counter">field experiment</Term> is conducted in a natural setting,
                such as actual stores, websites, or markets, often without participants being
                aware of the experiment.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Field experiments conducted without participants&rsquo; awareness raise the
                questions of informed consent and harm introduced in Week 1, and are subject to
                the same ethical standards as other research.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Field experiments offer higher external validity, since behavior is observed
                under real conditions, but less control over extraneous variables.
              </P>
            </Ruled>
          </div>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <p className={`${BIG} !text-[clamp(1.3rem,2vw,1.7rem)]`}>
              The two are frequently combined: a laboratory experiment identifies promising
              treatments, and a field experiment confirms their effect in the market.
            </p>
          </div>
          <Plate>
            <LabThenField />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Experimental Designs
          ================================================================ */}
      <Slide id="experimental-designs" border className="!py-8">
        <SlideHeading>Experimental Designs</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled weight="thin">
              <P className={CELL}>
                In a <Term tone="ink">posttest-only control group design</Term>, test units are
                randomly assigned to a treatment group and a control group, and the dependent
                variable is measured once, after the treatment.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                In a <Term tone="ink">pretest-posttest control group design</Term>, the dependent
                variable is also measured before the treatment, which allows change to be
                measured but introduces the possibility of testing effects.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P className={CELL}>
                In a <Term>factorial design</Term>, two or more independent variables are
                manipulated simultaneously, and every combination of their levels is tested.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                For example, a two-by-two factorial design tests two price levels combined with
                two advertising messages, producing four treatment conditions.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <DesignRows />
            </Plate>
            <Ruled tone="signal">
              <P className={CELL}>
                Factorial designs reveal <Term>interactions</Term>, in which the effect of one
                independent variable depends on the level of another, as when a quality-focused
                message is effective only at the higher price.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Testing a New Package
          ================================================================ */}
      <Slide id="discussion-testing-a-new-package" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          Testing a New Package
        </SlideHeading>
        <Prompt>
          A beverage company must choose between two new package designs before a national
          launch. Should the choice be based on a laboratory experiment, a field experiment, or
          both? Which threats to internal and external validity would each design face?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: A/B and Multivariate Testing
          ================================================================ */}
      <Slide id="part-3-ab-and-multivariate-testing" border className="!py-8">
        <PartHead n={3} title="A/B and Multivariate Testing" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Digital channels allow firms to conduct field experiments continuously and at large
          scale.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              A/B testing is now the most widely used form of field experimentation in digital
              marketing.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              It applies the principles of experimental design introduced in this week to
              websites, applications, emails, and advertisements.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          A/B Testing
          ================================================================ */}
      <Slide id="ab-testing" border className="!py-8">
        <SlideHeading>A/B Testing</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          An <Term>A/B test</Term> is a randomized field experiment in which users are randomly
          assigned to one of two versions of a digital asset.
        </Statement>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P className={CELL}>
                Version A is usually the current version and serves as the control. Version B
                contains the change being tested.
              </P>
            </Ruled>
            <Plate>
              <AbSplit />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <P className={CELL}>
                Each test has a <Term>primary metric</Term>, such as the conversion rate, the
                click-through rate, or the average order value, specified before the test begins.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Because users are randomly assigned, a statistically significant difference in
                the primary metric can be attributed to the change.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>The difference is tested with the procedures introduced in Week 7.</P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Designing an A/B Test
          ================================================================ */}
      <Slide
        id="designing-an-ab-test"
        border
        className="!py-8"
        exercise={exercise["designing-an-ab-test"]}
      >
        <SlideHeading>Designing an A/B Test</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-3">
            {[
              "The analyst first states the hypothesis and specifies the primary metric.",
              null,
              "The analyst then configures the random assignment of users to the two versions.",
              "The test then runs for the full planned duration, including at least one complete weekly cycle, without being stopped early.",
              "The analyst then tests the difference in the primary metric and reports the effect size and its confidence interval.",
              "Finally, the decision and its rationale are documented, including tests that produced no significant difference.",
            ].map((s, i) =>
              s ? (
                <li key={i} className="flex min-w-0 gap-4">
                  <span className="type-label w-6 shrink-0 pt-2.5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <Ruled weight="thin" className="!pt-2 flex-1">
                    <P className="!max-w-none !text-[0.95em] !leading-snug">{s}</P>
                  </Ruled>
                </li>
              ) : (
                <li key={i} className="flex min-w-0 gap-4">
                  <span className="type-label w-6 shrink-0 pt-2.5 tabular-nums !text-[var(--signal)]">02</span>
                  <Ruled tone="signal" weight="thin" className="!pt-2 flex-1">
                    <P className="!max-w-none !text-[0.95em] !leading-snug">
                      The analyst then determines the <Term>required sample size and duration</Term>,
                      according to the smallest effect that would be of practical importance and
                      the desired statistical power.
                    </P>
                  </Ruled>
                </li>
              ),
            )}
          </ol>
          <Plate>
            <TestPlanner />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Multivariate Testing
          ================================================================ */}
      <Slide id="multivariate-testing" border className="!py-8">
        <SlideHeading>Multivariate Testing</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!text-[clamp(1.25rem,1.9vw,1.6rem)]">
              A <Term>multivariate test</Term> changes several elements of a page or message
              simultaneously and tests every combination of their versions.
            </Statement>
            <Ruled weight="thin">
              <P className={CELL}>It is the digital application of the factorial design.</P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Multivariate testing reveals interactions among elements, which a sequence of
                separate A/B tests cannot reveal.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <p className={BIG}>
              For example, three headlines, two images, and two button labels produce twelve
              combinations.
            </p>
            <Plate>
              <CombinationGrid />
            </Plate>
            <Ruled tone="counter" weight="thin">
              <P className={CELL}>
                Because traffic is divided among many combinations, multivariate tests require
                much larger samples than A/B tests.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Common Errors in A/B Testing
          ================================================================ */}
      <Slide id="common-errors-in-ab-testing" border className="!py-8">
        <SlideHeading>Common Errors in A/B Testing</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <p className={BIG}>
                Stopping a test as soon as the result becomes significant, known as{" "}
                <Term tone="counter">peeking</Term>, increases the probability of a Type I error,
                in the same manner as the p-hacking practices introduced in Week 7.
              </p>
            </Ruled>
            <Plate>
              <PeekingPaths />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled weight="thin">
              <P className={CELL}>
                Examining many metrics and reporting the one that differs increases the
                probability of a false finding.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                A <Term tone="ink">novelty effect</Term> occurs when users respond to a change
                because it is new, so that the effect declines over time.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                A <Term tone="ink">sample ratio mismatch</Term> occurs when the numbers of users
                in the two groups differ substantially from the planned allocation, which
                indicates a fault in the random assignment.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Tests that run for only a few days may not represent the behavior of users across
                the full weekly cycle.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Quasi-Experiments
          ================================================================ */}
      <Slide id="part-4-quasi-experiments" border className="!py-8">
        <PartHead n={4} title="Quasi-Experiments" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          Random assignment is not always possible.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              A firm may introduce a price change in one region only, renovate selected stores,
              or launch a national television campaign that reaches every consumer.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              In such cases, the researcher uses a <Term>quasi-experimental design</Term>, which
              applies experimental logic without full control over the assignment of treatments.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Quasi-Experimental Designs
          ================================================================ */}
      <Slide
        id="quasi-experimental-designs"
        border
        className="!py-8"
        exercise={exercise["quasi-experimental-designs"]}
      >
        <SlideHeading>Quasi-Experimental Designs</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled weight="thin">
              <P className={CELL}>
                In a <Term tone="ink">time series design</Term>, the dependent variable is
                measured repeatedly before and after the treatment, and a change in its level or
                trend at the time of the treatment is taken as evidence of an effect.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                In a <Term tone="ink">nonequivalent control group design</Term>, the treatment
                group is compared with a group that did not receive the treatment but was not
                randomly assigned.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P className={CELL}>
                In a <Term>difference-in-differences design</Term>, the change in the treatment
                group before and after the treatment is compared with the change in a control
                group over the same period.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <P className="!max-w-none !leading-snug">
              For example, a retailer introduces a loyalty program in Region A but not in Region
              B. Average weekly sales per store rise from 100,000 to 112,000 dollars in Region A
              and from 100,000 to 105,000 dollars in Region B over the same period.
            </P>
            <Plate>
              <QuasiDesigns />
            </Plate>
            <p className="type-quote !text-[clamp(1.1rem,1.6vw,1.35rem)]">
              The estimated effect of the program is the difference between the two changes:
              12,000 minus 5,000, or 7,000 dollars per store per week.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Limitations of Quasi-Experiments
          ================================================================ */}
      <Slide id="limitations-of-quasi-experiments" border className="!py-8">
        <SlideHeading>Limitations of Quasi-Experiments</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P className={CELL}>
                Because the groups are not randomly assigned, they may differ in ways that affect
                the dependent variable.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Events that affect only one group during the study period, such as the opening
                of a competitor&rsquo;s store in Region A, threaten the validity of the estimate.
              </P>
            </Ruled>
            <Ruled tone="counter">
              <P className={CELL}>
                Quasi-experiments therefore provide weaker evidence of causality than randomized
                experiments, and their assumptions are stated in the report.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                The difference-in-differences design assumes that, without the treatment, both
                groups would have followed the same trend. This assumption is examined by
                comparing the trends of the two groups before the treatment.
              </p>
            </Ruled>
            <Plate>
              <ParallelTrends />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: AI in Experimentation
          ================================================================ */}
      <Slide id="part-5-ai-in-experimentation" border className="!py-8">
        <PartHead n={5} title="AI in Experimentation" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          AI is used in experimentation in two distinct ways.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Numbered n={1} tone="signal">
            <Ruled tone="signal">
              <p className={BIG}>
                AI agents can serve as simulated subjects for piloting an experiment before it is
                conducted with real participants.
              </p>
            </Ruled>
          </Numbered>
          <Numbered n={2} tone="signal">
            <Ruled tone="signal">
              <p className={BIG}>
                Adaptive algorithms can allocate users among versions during a test, according
                to their performance.
              </p>
            </Ruled>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Piloting Experiments With Simulated Subjects
          ================================================================ */}
      <Slide
        id="piloting-experiments-with-simulated-subjects"
        border
        className="!py-8"
        exercise={exercise["piloting-experiments-with-simulated-subjects"]}
      >
        <SlideHeading>Piloting Experiments With Simulated Subjects</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled weight="thin">
              <P className={CELL}>
                An AI agent is instructed to respond as a participant with a specified profile,
                and is presented with the experimental instructions, the stimuli, and the
                measures.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P className={CELL}>
                Such pilots can reveal unclear instructions, stimuli that fail to convey the
                intended difference, and manipulation checks that do not work.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Pilots with simulated subjects are fast and inexpensive, and can be repeated with
                many variations of the design.
              </P>
            </Ruled>
            <Ruled tone="counter" weight="thin">
              <P className={CELL}>
                The responses of simulated subjects are not evidence of how consumers respond.
                They share the limitations of the synthetic respondents introduced in Week 5.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <P className={CELL}>
                The experimental materials may also reveal the hypothesis to the model, so that
                its responses conform to the expected result, which can exaggerate or distort
                treatment effects.
              </P>
            </Ruled>
            <Plate>
              <PilotDemand />
            </Plate>
            <p className="type-quote !text-[clamp(1.1rem,1.6vw,1.35rem)]">
              A pilot with simulated subjects therefore precedes an experiment with real
              participants and does not replace it.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Multi-Armed Bandits
          ================================================================ */}
      <Slide id="multi-armed-bandits" border className="!py-8">
        <SlideHeading>Multi-Armed Bandits</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          A <Term>multi-armed bandit</Term> is an adaptive algorithm that allocates users among
          several versions during a test, according to their observed performance.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P className={CELL}>
                As evidence accumulates, the algorithm directs more users to the versions that
                perform better and fewer to those that perform worse.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <P className={CELL}>
                The algorithm balances <Term>exploration</Term>, which gathers information about
                every version, with <Term>exploitation</Term>, which directs users to the version
                that currently appears best.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                Many advertising and personalization platforms use bandit algorithms to select
                among creative versions automatically.
              </P>
            </Ruled>
          </div>
          <Plate>
            <BanditAllocation />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          A/B Tests and Bandits Compared
          ================================================================ */}
      <Slide
        id="ab-tests-and-bandits-compared"
        border
        className="!py-8"
        exercise={exercise["ab-tests-and-bandits-compared"]}
      >
        <SlideHeading>A/B Tests and Bandits Compared</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="signal" weight="thin">
              <P className={CELL}>
                A bandit reduces the number of users exposed to inferior versions during the
                test, and therefore reduces its cost.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P className={CELL}>
                A bandit is appropriate when the objective is to maximize performance during a
                short period, as with the headline of a news article or a promotion that lasts a
                few days.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                A fixed A/B test is appropriate when the objective is an accurate estimate of the
                size of an effect, or an understanding of why one version performs better.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <CostAndPrecision />
            </Plate>
            <Ruled tone="counter" weight="thin">
              <P className={CELL}>
                Because a bandit allocates users unequally and changes the allocation over time,
                its results do not support the same statistical inferences as a fixed A/B test.
              </P>
            </Ruled>
          </div>
        </div>
        <p className={`${CLOSE} mt-5 border-t-2 border-[var(--counter)] pt-4`}>
          A version selected by a bandit is the best performer on the platform&rsquo;s chosen
          metric, which may differ from the firm&rsquo;s broader objectives, such as brand
          building or long-term customer value.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: The Platform Has Chosen
          ================================================================ */}
      <Slide id="discussion-the-platform-has-chosen" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          The Platform Has Chosen
        </SlideHeading>
        <Prompt>
          An advertising platform&rsquo;s bandit algorithm selects one of five creative versions
          after two days and allocates nearly all impressions to it. The brand manager proposes
          to use this version in the firm&rsquo;s national television campaign. What does the
          platform&rsquo;s result establish, what does it not establish, and which additional
          evidence should be obtained?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 6: Experiments on AI Agents
          ================================================================ */}
      <Slide id="part-6-experiments-on-ai-agents" border className="!py-8">
        <PartHead n={6} title="Experiments on AI Agents" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              AI agents are also the subject of experiments, when the research question concerns
              how the agents themselves search, evaluate, and choose.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Such experiments apply the principles of experimental design introduced in this
              week to the instructions, information, and alternatives that agents receive.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Controlled Experiments on AI Agents
          ================================================================ */}
      <Slide
        id="controlled-experiments-on-ai-agents"
        border
        className="!py-8"
        exercise={exercise["controlled-experiments-on-ai-agents"]}
      >
        <SlideHeading>Controlled Experiments on AI Agents</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,2vw,1.65rem)]">
          When an AI agent is the subject of research rather than a proxy for consumers, its
          responses are direct evidence about the agent&rsquo;s behavior.
        </Statement>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled weight="thin">
              <P className={CELL}>
                The <Term tone="ink">system prompt</Term> is the set of instructions given to an
                agent before the consumer&rsquo;s request, usually by the firm or the researcher
                that deploys it.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={`${CELL} !text-[0.95em]`}>
                The factors manipulated in such experiments include the system prompt, such as
                the party the agent is told it serves; the consumer&rsquo;s instruction, such as
                the specificity of the goal; the information environment, such as the cost of
                acquiring an attribute; and the attributes of the alternatives, such as a
                sponsorship label.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P className={CELL}>
                Factorial designs cross these factors to estimate their main effects and
                interactions.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <P className="!max-w-none !leading-snug">
              In one study, a 2 × 2 design crossed the cost of inspecting an attribute ($0.00 vs.
              $10.00) with the specificity of the goal (&ldquo;find the best deal&rdquo; vs.
              &ldquo;find the coffee with the lowest price per ounce&rdquo;), across eight models
              and 100 sessions per condition, for 3,200 sessions in total (Wadi &amp; Ma, 2026b).
            </P>
            <Plate>
              <AgentFactorial />
            </Plate>
            <Ruled weight="thin">
              <P className={CELL}>
                The order of alternatives and attributes is randomized across sessions, and the
                design is replicated across models, providers, and wordings of the prompt.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Process Tracing With AI Agents
          ================================================================ */}
      <Slide
        id="process-tracing-with-ai-agents"
        border
        className="!py-8"
        exercise={exercise["process-tracing-with-ai-agents"]}
      >
        <SlideHeading>Process Tracing With AI Agents</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled weight="thin">
              <P className={CELL}>
                An <Term tone="ink">information board</Term> is a process-tracing method in which
                product attributes are hidden in the cells of a matrix, and the participant opens
                cells one at a time before choosing (Payne, Bettman, &amp; Johnson, 1993).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                A <Term tone="ink">tool</Term> is a function that an AI agent can call to retrieve
                information or perform an action, such as looking up the price of a product.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                The same method can be applied to AI agents by placing each attribute behind a
                tool that the agent must call to reveal it, at a cost that the researcher sets
                (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className={CELL}>
                The record of tool calls shows which attributes the agent acquired, in which
                order, and which it omitted before choosing.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <P className={CELL}>
                Process tracing separates two sources of a poor choice:{" "}
                <Term tone="counter">failure to acquire</Term> the necessary information and{" "}
                <Term tone="counter">failure to use it</Term> correctly.
              </P>
            </Ruled>
            <Plate>
              <InformationBoard />
            </Plate>
          </div>
        </div>
        <p className={`${CLOSE} mt-5 border-t-2 border-[var(--signal)] pt-4 !text-[clamp(1.05rem,1.5vw,1.3rem)]`}>
          In a validation study, seven of eight agents given a fixed set of attributes selected
          the alternative implied by those attributes in nearly all sessions, and no agent made
          an arithmetic error when asked to calculate unit prices. Most poor choices therefore
          arose from incomplete information acquisition (Wadi &amp; Ma, 2026b).
        </p>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Causal inference requires concomitant variation, time order, and the elimination of other possible causes.",
            "Random assignment makes treatment and control groups equivalent on average, and supports the attribution of differences to the treatment.",
            "Internal validity concerns whether the treatment caused the effect; external validity concerns whether the effect generalizes; laboratory and field experiments trade one against the other.",
            "A/B and multivariate tests are randomized field experiments that require a primary metric, a planned sample size and duration, and no early stopping.",
            "Quasi-experimental designs, such as difference-in-differences, estimate causal effects when randomization is not possible, under stated assumptions.",
            "AI agents can pilot experimental materials but cannot replace real participants, and bandit algorithms optimize performance during a test at the cost of precise estimates of effect size.",
            "Controlled experiments on AI agents manipulate prompts, roles, and information environments in factorial designs, and process tracing separates failures of information acquisition from failures of information use.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone="signal">
                <Ruled weight="thin">
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
