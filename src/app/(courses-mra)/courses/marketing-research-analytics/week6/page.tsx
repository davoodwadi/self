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
import { AiMark1 } from "../_visuals/objects";
import exercisesData from "./exercises.json";
import {
  CodedMatrix,
  CleaningMatrix,
  MissingTreatments,
  WeightedSample,
  FrequencyTable,
  MeanMedian,
  TwoBrandsSpread,
  CrossTabDirection,
  ThirdVariable,
  ChartPrinciples,
  ChartThumb,
  TruncatedAxis,
  TwoValueAxes,
  TwoChartsOneDataset,
  MissingCode,
  ConsensusVersusEntropy,
} from "./visuals";

// ============================================================================
// WEEK 06 — DATA PREPARATION AND DESCRIPTIVE ANALYSIS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx; the interactive ones are built around one action
// each.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** A sentence set large inside a column. */
const BIG = "type-h2 !font-normal !text-[clamp(1.2rem,1.7vw,1.45rem)] !leading-snug";

/** A closing sentence set as a serif line across the slide. */
const CLOSE = "type-quote w-full !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]";

/** The course's AI mark, set inline beside a step that an AI tool performs. */
function AiStep() {
  return (
    <svg viewBox="0 0 24 24" className="inline-block size-4 align-[-2px]" aria-hidden>
      <AiMark1 cx={12} cy={12} s={22} fill="var(--signal)" />
    </svg>
  );
}

export default function Week6() {
  return (
    <SlideDeck label="Week 06">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 06 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">
          <span className="text-[var(--signal)]">Data Preparation</span> and Descriptive Analysis
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[44ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          The validity of an analysis depends on the{" "}
          <span className="text-[var(--signal)]">preparation of the data</span> on
          which it is performed.
        </p>
      </Slide>

      {/* ================================================================
          The Data Preparation Process
          ================================================================ */}
      <Slide
        id="the-data-preparation-process"
        border
        className="!py-8"
        exercise={exercise["the-data-preparation-process"]}
      >
        <SlideHeading>The Data Preparation Process</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
          <Term>Data preparation</Term> converts the raw responses collected in the
          field into a dataset suitable for analysis.
        </Statement>
        <ol className="mt-10 grid w-full gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-5">
          {[
            <>
              The researcher first <Term tone="ink">checks</Term> the responses for
              completeness and for the data quality criteria specified before data
              collection, introduced in Week 5.
            </>,
            <>
              The researcher then <Term tone="ink">codes</Term> the responses and
              records them in a data matrix.
            </>,
            <>
              The researcher then <Term tone="ink">cleans</Term> the data,
              correcting or removing errors and inconsistencies.
            </>,
            <>
              The researcher then <Term tone="ink">treats missing values</Term> and,
              where necessary, applies statistical adjustments such as weighting.
            </>,
            <>
              Finally, the researcher <Term>selects the analysis strategy</Term>,
              according to the research questions and the level of measurement of
              each variable.
            </>,
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone={i === 4 ? "signal" : "ink"}>
                <Ruled tone={i === 4 ? "signal" : "ink"}>
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Coding and the Data Matrix
          ================================================================ */}
      <Slide id="coding-and-the-data-matrix" border className="!py-8">
        <SlideHeading>Coding and the Data Matrix</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3.5">
            <Ruled tone="signal">
              <P className="!max-w-none !leading-snug">
                <Term>Coding</Term> is the assignment of a numeric code to each
                possible response, such as 1 for &ldquo;strongly disagree&rdquo;
                through 5 for &ldquo;strongly agree.&rdquo;
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                A <Term tone="ink">codebook</Term> records, for each variable, its
                name, the question from which it derives, its codes and their
                meanings, its level of measurement, and the code used for missing
                values.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                Open-ended responses are coded into categories through the coding
                procedures introduced in Week 3.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                A <Term tone="ink">multiple-response question</Term>, in which
                respondents may select several options, is coded as a separate
                variable for each option, with 1 indicating selection and 0
                indicating no selection.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                The coded data are arranged in a <Term>data matrix</Term>, in which
                each row represents a respondent and each column represents a
                variable.
              </p>
            </Ruled>
            <Plate>
              <CodedMatrix />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Data Cleaning
          ================================================================ */}
      <Slide id="data-cleaning" border className="!py-8">
        <SlideHeading>Data Cleaning</SlideHeading>
        <Lead className="!max-w-none">
          <Term>Data cleaning</Term> is the identification and treatment of errors
          in the data matrix.
        </Lead>
        <ol className="mt-6 grid w-full gap-x-10 gap-y-5 md:grid-cols-3">
          {[
            <>
              <Term tone="counter">Out-of-range values</Term> are values that are
              not permitted by the codebook, such as a 7 on a five-point scale.
            </>,
            <>
              <Term tone="counter">Logical inconsistencies</Term> are combinations of
              answers that cannot both be true, such as a respondent who reports
              never having used a service but rates its customer support.
            </>,
            <>
              <Term tone="counter">Extreme values, or outliers</Term>, are values far
              from the rest of the distribution, such as a reported monthly spending
              of 90,000 dollars at a coffee chain. They are investigated before any
              decision is taken to correct, retain, or remove them.
            </>,
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone="counter">
                <Ruled tone="counter" weight="thin">
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <Plate className="mt-5">
          <CleaningMatrix />
        </Plate>
        <p className={`${CLOSE} mt-5 border-t-2 border-[var(--ink)] pt-4`}>
          Every change made during cleaning is{" "}
          <span className="text-[var(--signal)]">documented</span>, so that the
          analysis can be reproduced.
        </p>
      </Slide>

      {/* ================================================================
          Missing Values
          ================================================================ */}
      <Slide
        id="missing-values"
        border
        className="!py-8"
        exercise={exercise["missing-values"]}
      >
        <SlideHeading>Missing Values</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P className="!max-w-none !leading-snug">
              Missing values occur when respondents do not answer a question, or
              when an answer is removed during cleaning.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P className="!max-w-none !leading-snug">
              Missing values are least problematic when they occur at random. They
              are most problematic when the likelihood of a missing answer is
              related to the answer itself, as when respondents with high incomes
              are more likely to decline to report their income.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-2.5">
            {[
              <>
                In <Term tone="ink">casewise deletion</Term>, respondents with any
                missing value are excluded from the analysis, which can
                substantially reduce the sample size.
              </>,
              <>
                In <Term tone="ink">pairwise deletion</Term>, each calculation uses
                all respondents with complete data for the variables involved, so
                that different statistics are based on different respondents.
              </>,
              <>
                In <Term tone="ink">mean substitution</Term>, each missing value is
                replaced by the mean of the variable, which preserves the sample
                size but understates the variability of the data.
              </>,
              <>
                In <Term tone="ink">model-based imputation</Term>, missing values
                are estimated from the respondent&apos;s other answers. The method
                selected and the extent of missing data are reported.
              </>,
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Ruled weight="thin">
                  <P className="!max-w-none !leading-snug">{s}</P>
                </Ruled>
              </li>
            ))}
          </ol>
          <Plate>
            <MissingTreatments />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Weighting
          ================================================================ */}
      <Slide id="weighting" border className="!py-8">
        <SlideHeading>Weighting</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <p className={BIG}>
                <Term>Weighting</Term> assigns each respondent a weight so that the
                sample matches the population on known characteristics, such as
                age, gender, and region.
              </p>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none">
                For example, if women represent{" "}
                <span className="text-[var(--counter)]">51 percent</span> of the
                population but{" "}
                <span className="text-[var(--counter)]">40 percent</span> of the
                sample, each woman in the sample receives a weight greater than
                one.
              </P>
            </Ruled>
          </div>
          <Plate>
            <WeightedSample />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-x-10 gap-y-4 md:grid-cols-3">
          {[
            "Population figures for weighting are drawn from reliable secondary sources, such as a census.",
            "Weighting can reduce the effect of nonresponse error on the weighted characteristics, but it cannot correct differences between respondents and nonrespondents on characteristics that were not used in the weighting.",
            "Large weights increase the variability of estimates, and the weighting procedure is therefore reported.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Ruled tone={i === 1 ? "counter" : "ink"} weight="thin">
                <P className="!leading-snug">{s}</P>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Part 2: Descriptive Analysis
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Descriptive Analysis" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          <Term>Descriptive analysis</Term> summarizes the characteristics of the
          sample, one variable at a time.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              It is the first stage of any analysis, and it also reveals errors that
              remained after cleaning.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              The appropriate statistics depend on the{" "}
              <Term>level of measurement</Term> of each variable, introduced in
              Week 4.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Frequency Distributions
          ================================================================ */}
      <Slide id="frequency-distributions" border className="!py-8">
        <SlideHeading>Frequency Distributions</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-4 md:grid-cols-3">
          {[
            <>
              A <Term tone="ink">frequency distribution</Term> reports the number
              and the percentage of respondents who gave each response to a
              question.
            </>,
            <>
              <Term tone="ink">Valid percentages</Term> are calculated on the
              respondents who answered the question, excluding missing values.
            </>,
            <>
              <Term>Cumulative percentages</Term> report the percentage of
              respondents at or below each value, such as the percentage of
              customers who visited three times or fewer.
            </>,
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Ruled tone={i === 2 ? "signal" : "ink"}>
                <P className="!leading-snug">{s}</P>
              </Ruled>
            </li>
          ))}
        </ol>
        <p className={`${BIG} mt-6 w-full border-t border-[var(--rule-2)] pt-4`}>
          A <Term tone="ink">histogram</Term> displays the frequency distribution
          of a quantitative variable, and reveals its shape, including skewness and
          extreme values.
        </p>
        <Plate className="mt-4">
          <FrequencyTable />
        </Plate>
      </Slide>

      {/* ================================================================
          Measures of Central Tendency
          ================================================================ */}
      <Slide id="measures-of-central-tendency" border className="!py-8">
        <SlideHeading>Measures of Central Tendency</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-4 md:grid-cols-3">
          {[
            <>
              The <Term tone="ink">mode</Term> is the most frequently occurring
              value, and is the only measure of central tendency appropriate for
              nominal data.
            </>,
            <>
              The <Term>median</Term> is the value that divides the ordered
              distribution into two equal halves, and is appropriate for ordinal
              data and for skewed distributions.
            </>,
            <>
              The <Term tone="counter">mean</Term> is the arithmetic average, and is
              appropriate for interval and ratio data.
            </>,
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Ruled tone={(["ink", "signal", "counter"] as const)[i]}>
                <P className="!leading-snug">{s}</P>
              </Ruled>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <p className={BIG}>
            In a skewed distribution, the mean is drawn toward the extreme values.
            For example, if a small number of customers spend very large amounts,
            the mean monthly spending may be{" "}
            <span className="text-[var(--counter)]">80 dollars</span> while the
            median is <span className="text-[var(--signal)]">35 dollars</span>.
          </p>
          <Plate>
            <MeanMedian />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-6 border-t-2 border-[var(--signal)] pt-4`}>
          For skewed variables such as income and spending, the median therefore
          describes the typical respondent more accurately than the mean.
        </p>
      </Slide>

      {/* ================================================================
          Measures of Dispersion
          ================================================================ */}
      <Slide id="measures-of-dispersion" border className="!py-8">
        <SlideHeading>Measures of Dispersion</SlideHeading>
        <Lead className="!max-w-none">
          Measures of dispersion describe how widely values are spread around the
          center of the distribution.
        </Lead>
        <ol className="mt-6 grid w-full gap-x-10 gap-y-4 md:grid-cols-3">
          {[
            <>
              The <Term tone="ink">range</Term> is the difference between the
              largest and the smallest values, and is highly sensitive to extreme
              values.
            </>,
            <>
              The <Term tone="ink">interquartile range</Term> is the range of the
              middle 50 percent of values, and is not affected by extreme values.
            </>,
            <>
              The <Term tone="ink">variance</Term> is the average squared deviation
              from the mean, and the <Term tone="ink">standard deviation</Term> is
              its square root, expressed in the original units of the variable.
            </>,
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled weight="thin">
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <div className="mt-7 grid w-full items-center gap-8 border-t-2 border-[var(--ink)] pt-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <p className={BIG}>
            Two brands may each have a mean satisfaction rating of 4.0, one with a
            standard deviation of{" "}
            <span className="text-[var(--signal)]">0.5</span> and the other with a
            standard deviation of{" "}
            <span className="text-[var(--counter)]">1.5</span>. Customers&apos;
            evaluations of the second brand are considerably more dispersed than
            those of the first.
          </p>
          <Plate>
            <TwoBrandsSpread />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Selecting Descriptive Statistics
          ================================================================ */}
      <Slide
        id="selecting-descriptive-statistics"
        border
        className="!py-8"
        exercise={exercise["selecting-descriptive-statistics"]}
      >
        <SlideHeading>Selecting Descriptive Statistics</SlideHeading>
        <ul className="flex w-full flex-col">
          {[
            {
              level: "Nominal",
              s: (
                <>
                  For a nominal variable, such as preferred store, the analysis
                  reports <Term>the frequency distribution and the mode</Term>.
                </>
              ),
            },
            {
              level: "Ordinal",
              s: (
                <>
                  For an ordinal variable, such as the ranking of brands, the
                  analysis reports{" "}
                  <Term>the frequency distribution, the median, and percentiles</Term>
                  .
                </>
              ),
            },
            {
              level: "Symmetric",
              s: (
                <>
                  For an interval or ratio variable with a symmetric distribution,
                  such as a rating averaged across several items, the analysis
                  reports <Term>the mean and the standard deviation</Term>.
                </>
              ),
            },
            {
              level: "Skewed",
              s: (
                <>
                  For a ratio variable with a skewed distribution, such as annual
                  spending, the analysis reports{" "}
                  <Term>the median and the interquartile range</Term>, together with
                  the mean where appropriate.
                </>
              ),
            },
          ].map(({ level, s }) => (
            <li
              key={level}
              className="min-w-0 border-t border-[var(--rule-2)] py-5 last:border-b"
            >
              <p className={BIG}>{s}</p>
            </li>
          ))}
        </ul>
      </Slide>

      {/* ================================================================
          Part 3: Cross-Tabulation
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Cross-Tabulation" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled tone="counter">
            <p className={BIG}>
              Descriptive analysis of single variables does not reveal how
              variables are related to one another.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              <Term>Cross-tabulation</Term> describes two or more variables
              simultaneously.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              It is the most widely used method of analysis in commercial marketing
              research.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Constructing a Cross-Tabulation
          ================================================================ */}
      <Slide id="constructing-a-cross-tabulation" border className="!py-8">
        <SlideHeading>Constructing a Cross-Tabulation</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-3.5">
            <Ruled tone="signal">
              <P className="!max-w-none !leading-snug">
                A <Term>cross-tabulation</Term> is a table that shows the joint
                distribution of two or more variables with a limited number of
                categories.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                Each cell reports the number and percentage of respondents who share
                a particular combination of categories.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none !leading-snug">
                For example, a cross-tabulation of age group by preferred shopping
                channel reports, for each age group, the percentage who prefer
                online, in-store, or mobile shopping.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CrossTabDirection />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 border-t-2 border-[var(--ink)] pt-5 md:grid-cols-2 md:gap-12">
          <P className="!max-w-none !leading-snug">
            Percentages are calculated in the direction of the variable considered
            to be the <Term>influencing variable</Term>, so that the categories of
            the other variable can be compared across its groups.
          </P>
          <P className="!max-w-none !leading-snug">
            In the example, percentages are calculated within each age group, since
            age may influence channel preference, but channel preference cannot
            influence age.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Interpreting Cross-Tabulations
          ================================================================ */}
      <Slide
        id="interpreting-cross-tabulations"
        border
        className="!py-8"
        exercise={exercise["interpreting-cross-tabulations"]}
      >
        <SlideHeading>Interpreting Cross-Tabulations</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <P className="!max-w-none !leading-snug">
              A difference in percentages across groups indicates an{" "}
              <Term>association</Term> between the two variables.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P className="!max-w-none !leading-snug">
              An association does not establish causation, as introduced in the
              discussion of descriptive research in Week 2.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <p className={BIG}>
            The introduction of a <Term tone="counter">third variable</Term> can
            reveal that an apparent association is spurious. For example, users of a
            retailer&apos;s mobile application may spend more than other customers
            because they tend to have higher incomes, not because they use the
            application.
          </p>
          <Plate>
            <ThirdVariable />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              The introduction of a third variable can also reveal an association
              that was concealed in the original table, or show that the
              association holds only for some groups.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none !leading-snug">
              Whether a difference in a cross-tabulation is statistically
              significant is assessed with the chi-square test, introduced in
              Week 7.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Data Visualization for Decision Makers
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Data Visualization for Decision Makers" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Findings are communicated to decision makers largely through charts
              and tables.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              A chart is designed to communicate a <Term>specific finding</Term>,
              not to display all available data.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The design of a chart determines whether the finding is understood
              correctly.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Principles of Data Visualization
          ================================================================ */}
      <Slide id="principles-of-data-visualization" border className="!py-8">
        <SlideHeading>Principles of Data Visualization</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <ol className="grid min-w-0 gap-x-8 gap-y-4 md:grid-cols-2">
            {[
              "Each chart communicates one principal finding, which is stated in its title.",
              "The chart type is selected according to the relationship the finding concerns.",
              "Data are labeled directly, rather than through a separate legend, wherever possible.",
              "Elements that do not represent data, such as three-dimensional effects, heavy gridlines, and decorative images, are removed.",
              "The value axis of a bar chart begins at zero, since the length of each bar represents its value.",
              "Color is used to distinguish categories or to highlight the principal finding, and is applied consistently across charts.",
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
          <Plate>
            <ChartPrinciples />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Selecting a Chart
          ================================================================ */}
      <Slide
        id="selecting-a-chart"
        border
        className="!py-8"
        exercise={exercise["selecting-a-chart"]}
      >
        <SlideHeading>Selecting a Chart</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["bar", <>A <Term>bar chart</Term> compares values across categories, such as market share by brand.</>],
              ["line", <>A <Term>line chart</Term> shows change over time, such as monthly sales across two years.</>],
              ["histogram", <>A <Term>histogram</Term> shows the distribution of a single quantitative variable, such as the number of visits per customer.</>],
              ["scatter", <>A <Term>scatter plot</Term> shows the relationship between two quantitative variables, such as advertising expenditure and sales across regions.</>],
              ["stacked", <>A <Term>stacked bar chart</Term> showing percentages compares the composition of several groups, such as the channel mix of each age group.</>],
              ["table", <>A <Term>table</Term> is preferable to a chart when decision makers require exact values.</>],
            ] as const
          ).map(([kind, s]) => (
            <li key={kind} className="flex min-w-0 flex-col justify-between gap-3">
              <Ruled weight="thin">
                <P className="!leading-snug">{s}</P>
              </Ruled>
              <Plate className="!p-3">
                <ChartThumb kind={kind} />
              </Plate>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Misleading Visualizations
          ================================================================ */}
      <Slide id="misleading-visualizations" border className="!py-8">
        <SlideHeading>Misleading Visualizations</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="counter">
              <P className="!max-w-none !leading-snug">
                A <Term tone="counter">truncated value axis</Term> exaggerates small
                differences, as when a bar chart of satisfaction scores begins at
                3.8 rather than zero.
              </P>
            </Ruled>
            <Plate>
              <TruncatedAxis />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="counter">
              <P className="!max-w-none !leading-snug">
                A chart with <Term tone="counter">two value axes</Term> can suggest a
                relationship that depends only on the scaling of the axes.
              </P>
            </Ruled>
            <Plate>
              <TwoValueAxes />
            </Plate>
          </div>
        </div>
        <ol className="mt-6 grid w-full gap-x-10 gap-y-4 md:grid-cols-3">
          {[
            "A selective time period can show a trend that does not hold over a longer period.",
            "Area and three-dimensional charts distort the perception of relative size.",
            "Misleading visualizations can result from inattention as well as from intent, and the researcher is responsible for either.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Ruled tone={i === 2 ? "ink" : "counter"} weight="thin">
                <P className="!leading-snug">{s}</P>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: One Dataset, Two Charts
          ================================================================ */}
      <Slide id="discussion-one-dataset-two-charts" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          One Dataset, Two Charts
        </SlideHeading>
        <Prompt>
          Two analysts receive the same dataset on customer satisfaction across
          four regions. One presents a bar chart with an axis from zero to five, and
          the other presents a bar chart with an axis from 3.5 to 4.5. What would a
          regional manager conclude from each chart, and which design communicates
          the data accurately?
        </Prompt>
        <Plate className="mt-6">
          <TwoChartsOneDataset />
        </Plate>
      </Slide>

      {/* ================================================================
          Part 5: AI Data-Analysis Assistants
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="AI Data-Analysis Assistants" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          <AiStep /> <Term>AI data-analysis assistants</Term> allow analysts to ask
          questions of a dataset in natural language.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              They are now widely used for data preparation, descriptive analysis,
              and visualization.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              The standards of data preparation and analysis introduced in this week
              apply to their output in the same way as to analyses performed by
              researchers.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How AI Data-Analysis Assistants Work
          ================================================================ */}
      <Slide id="how-ai-data-analysis-assistants-work" border className="!py-8">
        <SlideHeading>How AI Data-Analysis Assistants Work</SlideHeading>
        <Lead className="!max-w-none">
          The analyst uploads a dataset and asks a question, such as &ldquo;What is
          the average satisfaction rating by region?&rdquo;
        </Lead>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              <AiStep /> Many assistants generate analysis code, execute it on the
              dataset, and report the result together with the code.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              <AiStep /> Some assistants generate answers from the text of the
              question and the data without executing code. Their numerical answers
              are{" "}
              <span className="text-[var(--counter)]">
                not the result of a calculation
              </span>{" "}
              and are particularly prone to error.
            </p>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-8 border-t-2 border-[var(--ink)] pt-5 md:grid-cols-2 md:gap-12">
          <P className="!max-w-none !leading-snug">
            AI assistants can be used to produce frequency tables, descriptive
            statistics, cross-tabulations, and charts, and to explain statistical
            output.
          </P>
          <P className="!max-w-none !leading-snug">
            Datasets containing personal or confidential data are uploaded only when
            the consent of respondents, the firm&apos;s data policies, and the terms
            of the tool permit it.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Sources of Error in AI-Assisted Analysis
          ================================================================ */}
      <Slide id="sources-of-error-in-ai-assisted-analysis" border className="!py-8">
        <SlideHeading>Sources of Error in AI-Assisted Analysis</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-2.5">
            {[
              <>
                The coding of a variable may be misread, so that the code{" "}
                <span className="text-[var(--counter)]">99</span>, which denotes a
                missing value, is treated as a valid response.
              </>,
              <>
                Rows may be excluded without notice, so that a result is based on
                fewer respondents than the analyst assumes.
              </>,
              <>
                A statistic may be applied that is inappropriate for the level of
                measurement, such as the mean of a nominal variable.
              </>,
              <>
                The output may include figures that were not computed from the data,
                or describe an association in causal terms.
              </>,
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Numbered n={i + 1} tone="counter">
                  <Ruled tone="counter" weight="thin">
                    <P className="!max-w-none !leading-snug">{s}</P>
                  </Ruled>
                </Numbered>
              </li>
            ))}
          </ol>
          <Plate>
            <MissingCode />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-6 border-t-2 border-[var(--counter)] pt-4`}>
          The output is presented fluently and with apparent confidence, whether or
          not it is correct.
        </p>
      </Slide>

      {/* ================================================================
          Verifying AI-Assisted Analysis
          ================================================================ */}
      <Slide
        id="verifying-ai-assisted-analysis"
        border
        className="!py-8"
        exercise={exercise["verifying-ai-assisted-analysis"]}
      >
        <SlideHeading>Verifying AI-Assisted Analysis</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "The analyst first supplies the codebook to the assistant, including the codes for missing values and the level of measurement of each variable.",
            "The analyst then reviews the code the assistant executed, including any filters and exclusions.",
            "The analyst then confirms the number of respondents on which each result is based.",
            "The analyst then reproduces the principal figures independently, using a different tool or method.",
            "The analyst then confirms that the interpretation is consistent with the level of measurement and the research design, and makes no causal claim that the design does not support.",
            "Finally, the analyst documents the questions asked and the code executed, so that the analysis can be reproduced.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone="signal">
                <Ruled tone="signal" weight={i === 0 ? "thick" : "thin"}>
                  <p className={BIG}>{s}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Describing Model Responses
          ================================================================ */}
      <Slide
        id="describing-model-responses"
        border
        className="!py-8"
        exercise={exercise["describing-model-responses"]}
      >
        <SlideHeading>Describing Model Responses</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
          The responses of an AI model to repeated prompts are described with the same statistics as survey data:
          frequency distributions, measures of central tendency, and measures of dispersion.
        </Statement>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P>
              The <Term tone="ink">coefficient of variation</Term>, the standard deviation divided by the mean,
              compares the variability of responses across models and products measured on different scales.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              A mean response alone can conceal important differences. Two models with the same mean on a Likert
              item may differ in whether their responses concentrate on one point or spread across the scale.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled tone="signal">
              <p className={BIG}>
                For ordinal responses, a <Term>consensus</Term> measure summarizes how concentrated the distribution
                is, from complete agreement on one scale point to an even split between the two extremes (Wadi,
                Ghodrat, &amp; Philp, 2026).
              </p>
            </Ruled>
            <Ruled tone="counter" weight="thin">
              <P>
                Entropy, a common measure of uncertainty in AI research, treats the scale points as unordered
                categories, and therefore does not distinguish a split between adjacent points from a split between
                opposite extremes.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ConsensusVersusEntropy />
          </Plate>
        </div>
        <p className="type-quote mt-7 w-full border-t-2 border-[var(--ink)] pt-5 !max-w-none !text-[clamp(1.15rem,1.8vw,1.5rem)]">
          Charts of full response distributions for each model, rather than a single bar for each mean, show both
          the level and the variability of model behavior.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: An Answer in Seconds
          ================================================================ */}
      <Slide id="discussion-an-answer-in-seconds" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          An Answer in Seconds
        </SlideHeading>
        <Prompt>
          A brand manager uploads a survey dataset to an AI assistant and asks which
          customer segment is most satisfied. The assistant replies within seconds
          with a segment name, a mean score, and a chart. Which checks should the
          brand manager perform before presenting the result to senior management?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Data preparation consists of checking, coding, cleaning, treating missing values, and weighting, and every step is documented.",
            "The treatment of missing values affects the results, and the method selected is reported.",
            "Descriptive statistics are selected according to the level of measurement and the shape of the distribution.",
            "Cross-tabulation reveals associations between variables, which may be spurious and do not establish causation.",
            "Charts communicate one finding each, with a chart type suited to that finding and axes that represent the data accurately.",
            "AI data-analysis assistants accelerate analysis, but their code, case counts, and interpretations must be verified before the results inform a decision.",
            "The responses of AI models are described by their full distributions, including dispersion and, for ordinal scales, consensus, rather than by a single typical answer.",
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
