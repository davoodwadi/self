"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
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
import {
  SameSourceDifferences,
  TailDirections,
  PValueTail,
  ErrorTradeoff,
  TLevers,
  PairedVersusIndependent,
  BetweenWithin,
  ObservedExpected,
  TestGlyph,
  SignificanceAndSize,
  EffectOverlap,
  IntervalAndZero,
  ForkingPaths,
  ManyTests,
  PreregistrationTimeline,
  ModelComparisons,
  EvaluationRecord,
} from "./visuals";

// ============================================================================
// WEEK 07 — HYPOTHESIS TESTING AND GROUP DIFFERENCES
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx; the interactive ones are built around one action
// each, so students can try the logic of a test rather than read about it.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

/** A closing sentence set as a serif line across the slide. */
const CLOSE = "type-quote w-full !max-w-none !text-[clamp(1.15rem,1.8vw,1.5rem)]";

export default function Week7() {
  return (
    <SlideDeck label="Week 07">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 07 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">
          <span className="text-[var(--signal)]">Hypothesis Testing</span> and Group Differences
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[44ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Hypothesis testing assesses whether a difference observed in a{" "}
          <span className="text-[var(--signal)]">sample</span> is likely to exist in the{" "}
          <span className="text-[var(--signal)]">population</span>.
        </p>
      </Slide>

      {/* ================================================================
          From Sample to Population
          ================================================================ */}
      <Slide id="from-sample-to-population" border className="!py-8">
        <SlideHeading>From Sample to Population</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
          A difference between two groups in a sample does not necessarily indicate a
          difference in the population.
        </Statement>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                Samples vary by <Term>chance</Term>, so that two samples drawn from the same
                population produce different results.
              </p>
            </Ruled>
            <Plate>
              <SameSourceDifferences />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                A <Term tone="ink">population parameter</Term> is a characteristic of the
                population, such as the true mean satisfaction of all customers. A{" "}
                <Term tone="ink">sample statistic</Term> is the corresponding value
                calculated from a sample.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                <Term tone="ink">Statistical inference</Term> is the procedure by which
                conclusions about population parameters are drawn from sample statistics.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <P className="!max-w-none !leading-snug">
                <Term>Hypothesis testing</Term> is the form of inference that assesses
                whether an observed difference or association can reasonably be attributed
                to chance.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Null and Alternative Hypotheses
          ================================================================ */}
      <Slide id="null-and-alternative-hypotheses" border className="!py-8">
        <SlideHeading>Null and Alternative Hypotheses</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              The <Term tone="ink">null hypothesis</Term>, denoted H0, states that there is
              no difference or no association in the population.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              The <Term>alternative hypothesis</Term>, denoted H1, states that a difference
              or association exists.
            </p>
          </Ruled>
        </div>
        <P className="mt-6 !max-w-none border-l-2 border-[var(--rule-2)] pl-5 !leading-snug">
          For example, H0 states that loyalty program members and nonmembers have the same
          mean monthly spending. H1 states that their mean monthly spending differs.
        </P>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <p className="type-quote !text-[clamp(1.2rem,1.9vw,1.55rem)]">
              The test assesses the evidence against the null hypothesis. The null
              hypothesis is either rejected or not rejected; it is{" "}
              <span className="text-[var(--counter)]">never proven true</span>.
            </p>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                A <Term tone="ink">two-tailed test</Term> examines a difference in either
                direction. A <Term tone="ink">one-tailed test</Term> examines a difference in
                a direction specified in advance, such as members spending more than
                nonmembers.
              </P>
            </Ruled>
          </div>
          <Plate>
            <TailDirections />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          The Hypothesis Testing Procedure
          ================================================================ */}
      <Slide
        id="the-hypothesis-testing-procedure"
        border
        className="!py-8"
        exercise={exercise["the-hypothesis-testing-procedure"]}
      >
        <SlideHeading>The Hypothesis Testing Procedure</SlideHeading>
        <ol className="grid w-full gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-4">
          {[
            <>
              The researcher first <Term tone="ink">formulates</Term> the null and
              alternative hypotheses.
            </>,
            <>
              The researcher then <Term tone="ink">selects</Term> the appropriate
              statistical test.
            </>,
            <>
              The researcher then <Term tone="ink">specifies the significance level</Term>,
              conventionally 0.05.
            </>,
            <>
              The researcher then <Term tone="ink">collects the data</Term> and calculates
              the test statistic.
            </>,
            <>
              The researcher then <Term tone="ink">determines the p-value</Term> associated
              with the test statistic.
            </>,
            <>
              The researcher then <Term tone="ink">compares</Term> the p-value with the
              significance level, and rejects the null hypothesis if the p-value is
              smaller.
            </>,
            <>
              Finally, the researcher <Term>states the conclusion</Term> in terms of the
              marketing research problem.
            </>,
          ].map((s, i) => (
            <li key={i} className={i === 6 ? "min-w-0 lg:col-span-2" : "min-w-0"}>
              <Numbered n={i + 1} tone={i === 6 ? "signal" : "ink"}>
                <Ruled tone={i === 6 ? "signal" : "ink"} weight={i < 3 ? "thick" : "thin"}>
                  <p className={i === 6 ? `${BIG} max-w-[34ch]` : BIG}>{s}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          The p-Value and the Significance Level
          ================================================================ */}
      <Slide id="the-p-value-and-the-significance-level" border className="!py-8">
        <SlideHeading>The p-Value and the Significance Level</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          The <Term>p-value</Term> is the probability of obtaining a result at least as
          extreme as the one observed, assuming that the null hypothesis is true.
        </Statement>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                A small p-value indicates that the observed result would be unlikely if the
                null hypothesis were true.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                The <Term tone="ink">significance level</Term>, denoted alpha, is the
                threshold below which the p-value leads to the rejection of the null
                hypothesis.
              </P>
            </Ruled>
            <Ruled tone="counter">
              <P className="!max-w-none !leading-snug">
                The p-value is <Term tone="counter">not</Term> the probability that the null
                hypothesis is true, and it is <Term tone="counter">not</Term> the probability
                that the result occurred by chance.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Plate>
              <PValueTail />
            </Plate>
            <p className={BIG}>
              A p-value of 0.04 and a p-value of 0.06 represent very similar strength of
              evidence, although only the first falls below the conventional threshold.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Type I and Type II Errors
          ================================================================ */}
      <Slide
        id="type-i-and-type-ii-errors"
        border
        className="!py-8"
        exercise={exercise["type-i-and-type-ii-errors"]}
      >
        <SlideHeading>Type I and Type II Errors</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-12">
          <Ruled tone="counter">
            <P className="!max-w-none !leading-snug">
              A <Term tone="counter">Type I error</Term> occurs when the null hypothesis is
              rejected although it is true, so that a difference is reported that does not
              exist in the population. When the null hypothesis is true, the probability of
              a Type I error equals the significance level.
            </P>
          </Ruled>
          <Ruled>
            <P className="!max-w-none !leading-snug">
              A <Term tone="ink">Type II error</Term> occurs when the null hypothesis is not
              rejected although it is false, so that a real difference is not detected.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <P className="!max-w-none !leading-snug">
                The <Term>power</Term> of a test is the probability of correctly rejecting a
                false null hypothesis. Power increases with the sample size and with the size
                of the true difference.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !text-[0.95em] !leading-snug">
                For example, concluding that a new advertisement increases purchase intention
                when it does not is a Type I error, and may lead the firm to spend its budget
                on an ineffective campaign. Failing to detect a real improvement is a Type II
                error, and may lead the firm to abandon an effective campaign.
              </P>
            </Ruled>
            <p className="type-quote !text-[clamp(1.1rem,1.6vw,1.35rem)]">
              For a given sample size, reducing the probability of one type of error
              increases the probability of the other.
            </p>
          </div>
          <Plate>
            <ErrorTradeoff />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Tests of Group Differences
          ================================================================ */}
      <Slide id="part-2-tests-of-group-differences" border className="!py-8">
        <PartHead n={2} title="Tests of Group Differences" />
        <Statement className="mt-9 !max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          The appropriate test depends on the level of measurement of the variables, the
          number of groups compared, and whether the groups consist of different or the
          same respondents.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled tone="signal">
            <p className={BIG}>
              <Term>Tests of means</Term> are used for interval and ratio variables.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              <Term tone="counter">Tests of frequencies</Term> are used for nominal
              variables.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term tone="ink">Nonparametric tests</Term>, such as the Mann-Whitney U test
              and the Wilcoxon signed-rank test, are used for ordinal variables.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Independent-Samples t-Test
          ================================================================ */}
      <Slide id="the-independent-samples-t-test" border className="!py-8">
        <SlideHeading>The Independent-Samples t-Test</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="!text-[clamp(1.3rem,2vw,1.7rem)]">
              The <Term>independent-samples t-test</Term> compares the means of an interval
              or ratio variable between two groups of different respondents.
            </Statement>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                For example, it tests whether the mean monthly spending of loyalty program
                members differs from that of nonmembers.
              </P>
            </Ruled>
            <Ruled>
              <P className="!max-w-none !leading-snug">
                The test statistic, <Term tone="ink">t</Term>, is the difference between the
                two sample means divided by the standard error of that difference.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                A larger difference between the means, less variation within the groups,
                and larger samples each produce a larger value of t and a smaller p-value.
              </p>
            </Ruled>
            <Plate>
              <TLevers />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Paired-Samples t-Test
          ================================================================ */}
      <Slide id="the-paired-samples-t-test" border className="!py-8">
        <SlideHeading>The Paired-Samples t-Test</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Ruled tone="signal">
            <P className="!max-w-none !leading-snug">
              The <Term>paired-samples t-test</Term> compares two means obtained from the
              same respondents.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              It is used when respondents are measured twice, as in ratings of a brand
              before and after exposure to an advertisement.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              It is also used when the same respondents rate two objects, as in ratings of
              two package designs.
            </P>
          </Ruled>
        </div>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <Statement className="!text-[clamp(1.25rem,1.9vw,1.6rem)]">
            Because the comparison is made within each respondent, the test removes
            variation between respondents and detects smaller differences than the
            independent-samples test.
          </Statement>
          <Plate>
            <PairedVersusIndependent />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Analysis of Variance
          ================================================================ */}
      <Slide id="analysis-of-variance" border className="!py-8">
        <SlideHeading>Analysis of Variance</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-12">
          <Lead className="!max-w-none">
            One-way analysis of variance, known as <Term>ANOVA</Term>, compares the means of
            an interval or ratio variable across three or more groups.
          </Lead>
          <P className="!max-w-none !leading-snug">
            For example, it tests whether mean satisfaction differs among customers who shop
            online, in store, and through a mobile application.
          </P>
        </div>
        <Ruled tone="signal" className="mt-5 w-full">
          <p className={BIG}>
            The <Term>F statistic</Term> compares the variation between the group means with
            the variation within the groups.
          </p>
        </Ruled>
        <Plate className="mt-4 !py-3">
          <BetweenWithin />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              A significant F statistic indicates that at least one group mean differs from
              the others, but not which one.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              <Term tone="ink">Post hoc tests</Term> then identify which pairs of groups
              differ, while controlling the overall probability of a Type I error.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Chi-Square Test
          ================================================================ */}
      <Slide id="the-chi-square-test" border className="!py-8">
        <SlideHeading>The Chi-Square Test</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          The <Term>chi-square test</Term> assesses whether two nominal variables in a
          cross-tabulation, introduced in Week 6, are associated in the population.
        </Statement>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <P className="!max-w-none !leading-snug">
              It compares the <Term tone="ink">observed frequency</Term> in each cell with
              the <Term tone="ink">frequency expected</Term> if the two variables were
              unrelated. For example, it tests whether preferred shopping channel is
              associated with age group.
            </P>
            <Plate>
              <ObservedExpected />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <p className={BIG}>
                The larger the discrepancies between observed and expected frequencies, the
                larger the chi-square statistic and the smaller the p-value.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                The test requires an adequate expected frequency in each cell,
                conventionally at least five.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Selecting a Test
          ================================================================ */}
      <Slide
        id="selecting-a-test"
        border
        className="!py-8"
        exercise={exercise["selecting-a-test"]}
      >
        <SlideHeading>Selecting a Test</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {(
            [
              [
                "independent",
                <>
                  To compare the means of two groups of different respondents, the{" "}
                  <Term>independent-samples t-test</Term> is used.
                </>,
              ],
              [
                "paired",
                <>
                  To compare two means obtained from the same respondents, the{" "}
                  <Term>paired-samples t-test</Term> is used.
                </>,
              ],
              [
                "anova",
                <>
                  To compare the means of three or more groups,{" "}
                  <Term>analysis of variance</Term> is used.
                </>,
              ],
              [
                "chisquare",
                <>
                  To assess the association between two nominal variables, the{" "}
                  <Term>chi-square test</Term> is used.
                </>,
              ],
              [
                "ranks",
                <>
                  To compare two groups on an ordinal variable, a nonparametric test such as
                  the <Term>Mann-Whitney U test</Term> is used.
                </>,
              ],
            ] as const
          ).map(([kind, s], i) => (
            <li key={kind} className="flex min-w-0 flex-col gap-4">
              <Numbered n={i + 1} tone="signal">
                <Ruled tone="signal" weight="thin">
                  <p className={BIG}>{s}</p>
                </Ruled>
              </Numbered>
              <Plate className="mt-auto !p-3">
                <TestGlyph kind={kind} />
              </Plate>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Testing a Loyalty Program
          ================================================================ */}
      <Slide id="discussion-testing-a-loyalty-program" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          Testing a Loyalty Program
        </SlideHeading>
        <Prompt>
          A grocery chain reports that members of its loyalty program spend on average 18
          percent more per month than nonmembers, and the difference is statistically
          significant. Which hypotheses were tested, which test was appropriate, and does
          the result establish that the program increases spending?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Statistical and Practical Significance
          ================================================================ */}
      <Slide id="part-3-statistical-and-practical-significance" border className="!py-8">
        <PartHead n={3} title="Statistical and Practical Significance" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              A statistically significant result indicates that the observed difference
              would be unlikely if no difference existed in the population.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              It does <Term tone="counter">not</Term> indicate that the difference is large
              or that it matters for the decision.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              Researchers therefore report the <Term>size of the difference</Term> in
              addition to its statistical significance.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Statistical Versus Practical Significance
          ================================================================ */}
      <Slide id="statistical-versus-practical-significance" border className="!py-8">
        <SlideHeading>Statistical Versus Practical Significance</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!text-[clamp(1.25rem,1.9vw,1.6rem)]">
              With a sufficiently large sample, very small differences become statistically
              significant.
            </Statement>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                For example, in a test with two million website visitors divided equally
                between two versions of a page, a conversion rate of 3.05 percent for one
                version and 3.00 percent for the other is statistically significant at the
                0.05 level.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SignificanceAndSize />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Ruled tone="signal">
            <P className="!leading-snug">
              <Term>Practical significance</Term> is the extent to which a difference is
              large enough to affect a marketing decision.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!leading-snug">
              Whether a difference is practically significant depends on the costs and
              benefits of acting on it, such as the cost of implementing the new page
              relative to the additional revenue it produces.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P className="!leading-snug">
              Conversely, a large and practically important difference may fail to reach
              statistical significance in a small sample.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Effect Size
          ================================================================ */}
      <Slide id="effect-size" border className="!py-8" exercise={exercise["effect-size"]}>
        <SlideHeading>Effect Size</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          An <Term>effect size</Term> measures the magnitude of a difference or association,
          independently of the sample size.
        </Statement>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <P className="!max-w-none !leading-snug">
              For a difference between two means, <Term>Cohen&apos;s d</Term> is the
              difference between the means divided by their pooled standard deviation.
              Values of d of approximately 0.2, 0.5, and 0.8 are conventionally described as
              small, medium, and large, although the importance of an effect depends on the
              context.
            </P>
            <Plate>
              <EffectOverlap />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                For differences between proportions, the effect size can be expressed as the
                difference in percentage points or as the ratio between the proportions.
              </P>
            </Ruled>
            <Ruled tone="signal">
              <p className={BIG}>
                Effect sizes allow findings to be compared across studies with different
                sample sizes.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Confidence Intervals
          ================================================================ */}
      <Slide id="confidence-intervals" border className="!py-8">
        <SlideHeading>Confidence Intervals</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                A <Term>confidence interval</Term>, which extends the margin of error
                introduced in Week 5, reports a range of plausible values for a population
                parameter, such as a difference between two means.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                A 95 percent confidence interval for a difference in mean spending of 8 to 22
                dollars indicates both the likely size of the difference and the uncertainty
                of the estimate.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                If a 95 percent confidence interval for a difference excludes zero, the
                difference is statistically significant at the 0.05 level.
              </P>
            </Ruled>
          </div>
          <Plate>
            <IntervalAndZero />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--signal)] pt-4`}>
          Confidence intervals are therefore more informative than p-values alone, and are
          reported together with them.
        </p>
      </Slide>

      {/* ================================================================
          Part 4: Research Integrity
          ================================================================ */}
      <Slide id="part-4-research-integrity" border className="!py-8">
        <PartHead n={4} title="Research Integrity" />
        <Statement className="mt-9 !max-w-[40ch] !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          The validity of hypothesis testing depends on how the tests are conducted and
          reported.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              A number of published findings in psychology and consumer research have failed
              to replicate when other researchers repeated the studies.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P className="!max-w-none !leading-snug">
              Among the causes identified are analytical practices that increase the
              probability of Type I errors.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Questionable Research Practices
          ================================================================ */}
      <Slide id="questionable-research-practices" border className="!py-8">
        <SlideHeading>Questionable Research Practices</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-3">
            {[
              <>
                <Term tone="counter">p-Hacking</Term> is the practice of analyzing the data
                in several ways and reporting only the analyses that produce statistically
                significant results.
              </>,
              <>
                Examples include removing outliers only after examining the results, testing
                many outcome variables and reporting only the significant ones, and adding
                respondents until the result becomes significant.
              </>,
              <>
                <Term tone="counter">Selective reporting of subgroups</Term> is the practice
                of testing the effect in many segments and presenting only the segments in
                which it is significant.
              </>,
              <>
                <Term tone="counter">HARKing</Term>, or hypothesizing after the results are
                known, is the practice of presenting a hypothesis formulated after examining
                the data as if it had been formulated in advance.
              </>,
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Ruled tone={i === 1 ? "ink" : "counter"} weight="thin" className="!pt-3">
                  <P className="!max-w-none !leading-snug">{s}</P>
                </Ruled>
              </li>
            ))}
          </ol>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <p className={BIG}>
                Each practice increases the probability of reporting a difference that does
                not exist in the population.
              </p>
            </Ruled>
            <Plate>
              <ForkingPaths />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Multiple Comparisons
          ================================================================ */}
      <Slide id="multiple-comparisons" border className="!py-8">
        <SlideHeading>Multiple Comparisons</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Ruled weight="thin">
            <P className="!leading-snug">
              Each test conducted at a significance level of 0.05 has a five percent
              probability of producing a Type I error when the null hypothesis is true.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!leading-snug">
              When many tests are conducted, the probability that at least one produces a
              Type I error increases rapidly.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P className="!leading-snug">
              With 20 independent tests of true null hypotheses, the probability of at least
              one statistically significant result is approximately{" "}
              <Term tone="counter">64 percent</Term>.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-10">
          <Plate>
            <ManyTests />
          </Plate>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <P className="!max-w-none !leading-snug">
                The <Term>Bonferroni correction</Term> divides the significance level by the
                number of tests, so that 20 tests are each conducted at a level of 0.0025.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                Reports that present many significance tests, such as comparisons across
                numerous customer segments, state how many tests were conducted and whether a
                correction was applied.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Preregistration and Reproducible Analysis
          ================================================================ */}
      <Slide
        id="preregistration-and-reproducible-analysis"
        border
        className="!py-8"
        exercise={exercise["preregistration-and-reproducible-analysis"]}
      >
        <SlideHeading>Preregistration and Reproducible Analysis</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <P className="!max-w-none !leading-snug">
              <Term>Preregistration</Term> is the documentation of the hypotheses, sample
              size, exclusion criteria, and analysis plan before the data are collected.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              It distinguishes <Term tone="ink">confirmatory analyses</Term>, which test
              hypotheses specified in advance, from{" "}
              <Term tone="ink">exploratory analyses</Term>, which generate hypotheses for
              future testing.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <PreregistrationTimeline />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-10">
          <Ruled weight="thin">
            <P className="!leading-snug">
              In commercial research, the equivalent practice is an analysis plan agreed
              with the client before data collection.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!leading-snug">
              <Term tone="ink">Reproducible analysis</Term> is conducted with documented
              code, so that another analyst can obtain the same results from the same data.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!leading-snug">
              <Term tone="ink">Complete reporting</Term> states every test conducted,
              including those that did not produce significant results.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Hypothesis Testing in AI Evaluation
          ================================================================ */}
      <Slide
        id="hypothesis-testing-in-ai-evaluation"
        border
        className="!py-8"
        exercise={exercise["hypothesis-testing-in-ai-evaluation"]}
      >
        <SlideHeading>Hypothesis Testing in AI Evaluation</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement className="!text-[clamp(1.25rem,1.9vw,1.6rem)]">
              Comparisons of AI models and prompts are hypothesis tests, in which the
              responses to each model or prompt form a sample.
            </Statement>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                A t-test compares two models or prompts, and analysis of variance compares
                several, with each response as an observation.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                Because additional responses cost little, very large samples are easily
                obtained, and very small differences become statistically significant.
                Effect sizes and confidence intervals therefore accompany every test.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <P className="!max-w-none !leading-snug">
                Evaluations that compare many models, prompts, and products involve many
                tests at once, and the corrections for multiple comparisons introduced in
                this week apply.
              </P>
            </Ruled>
            <Plate>
              <ModelComparisons />
            </Plate>
          </div>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--signal)] pt-4`}>
          Claims that a newer model performs better are tested rather than assumed. In one
          evaluation, newer model generations were more susceptible to anchoring in price
          judgments than older generations (Wadi &amp; Fredette, 2025).
        </p>
      </Slide>

      {/* ================================================================
          Reproducibility of AI Evaluations
          ================================================================ */}
      <Slide id="reproducibility-of-ai-evaluations" border className="!py-8">
        <SlideHeading>Reproducibility of AI Evaluations</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.85rem)]">
          Providers update their models frequently, and a model with the same name may
          behave differently some months later.
        </Statement>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                A reproducible evaluation records the exact model version, the date, the
                generation settings, the complete prompts, and the number of responses per
                condition.
              </p>
            </Ruled>
            <Plate>
              <EvaluationRecord />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled weight="thin">
              <p className={BIG}>
                The hypotheses, measures, and analyses are preregistered before the responses
                are collected, as for research with human participants.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <p className={BIG}>
                The prompts, responses, and analysis code are retained, so that the
                evaluation can be repeated on newer models with the same design.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Twenty Segments
          ================================================================ */}
      <Slide id="discussion-twenty-segments" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          Twenty Segments
        </SlideHeading>
        <Prompt>
          An analyst tests whether a new loyalty offer increased spending in each of 20
          customer segments and finds a statistically significant increase in one segment.
          The marketing director proposes to extend the offer to that segment immediately.
          How should this result be interpreted, and what further evidence should be
          obtained before the decision is taken?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Hypothesis testing assesses whether a sample result provides sufficient evidence against the null hypothesis of no difference or no association.",
            "The p-value is the probability of a result at least as extreme as the one observed if the null hypothesis were true, and not the probability that the null hypothesis is true.",
            "Type I errors report differences that do not exist; Type II errors fail to detect differences that do exist.",
            "The t-test compares two means, analysis of variance compares three or more means, and the chi-square test assesses the association between two nominal variables.",
            "Statistical significance does not establish practical significance, and effect sizes and confidence intervals are reported together with p-values.",
            "p-Hacking, selective reporting, and uncorrected multiple comparisons increase false findings, while preregistration and reproducible analysis protect against them.",
            "Comparisons of AI models and prompts are hypothesis tests that require effect sizes, corrections for multiple comparisons, and complete records of model versions and prompts.",
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
