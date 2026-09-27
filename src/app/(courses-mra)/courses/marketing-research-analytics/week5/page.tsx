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
import { ErrorsAndSampleSize, PeriodicList, StrataAndClusters, SampleSizeCurve, ContactFunnel, QualityChecks, SyntheticSpread } from "./visuals";

// ============================================================================
// WEEK 05 — SAMPLING AND DATA COLLECTION
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

export default function Week5() {
  return (
    <SlideDeck label="Week 05">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 05 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[20ch]">
          <span className="text-[var(--signal)]">Sampling</span> and Data Collection
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[44ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          The conclusions of a survey extend only as far as the{" "}
          <span className="text-[var(--signal)]">population</span> that its{" "}
          <span className="text-[var(--signal)]">sample</span> represents.
        </p>
      </Slide>

      {/* ================================================================
          Populations, Samples, and Censuses
          ================================================================ */}
      <Slide id="populations-samples-and-censuses" border className="!py-8">
        <SlideHeading>Populations, Samples, and Censuses</SlideHeading>
        <Lead className="!max-w-none">
          The <Term tone="ink">population</Term> is the complete set of elements
          about which the researcher seeks information, such as all households
          in a city or all customers of a firm.
        </Lead>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              A <Term tone="ink">census</Term> collects data from every element
              of the population.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              A <Term>sample</Term> is a subset of the population, selected to
              draw conclusions about the population as a whole.
            </p>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P className="!max-w-none !text-[1.1rem] !leading-relaxed">
              A census is appropriate when the population is small, as in many
              business-to-business markets, or when the variation among elements
              is large.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thin">
            <P className="!max-w-none !text-[1.1rem] !leading-relaxed">
              Samples are used rather than censuses when the population is large,
              when time and budget are limited, and when a census would not
              substantially improve the accuracy of the findings.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Sampling Design Process
          ================================================================ */}
      <Slide
        id="the-sampling-design-process"
        border
        className="!py-8"
        exercise={exercise["the-sampling-design-process"]}
      >
        <SlideHeading>The Sampling Design Process</SlideHeading>
        <ol className="grid w-full gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-[3fr_4fr_2fr_2fr_3fr]">
          {[
            <>
              The researcher first defines the <Term>target population</Term>,
              specifying the elements, the geographical boundaries, and the time
              period.
            </>,
            <>
              The researcher then determines the <Term tone="ink">sampling frame</Term>,
              which is the list or procedure from which the sample is drawn, such
              as a customer database or a panel of registered respondents.
            </>,
            <>The researcher then selects a sampling technique.</>,
            <>The researcher then determines the sample size.</>,
            <>
              Finally, the researcher executes the sampling process and documents
              how it was carried out.
            </>,
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone={i === 0 ? "signal" : "ink"}>
                <Ruled tone={i === 0 ? "signal" : "ink"}>
                  <P className="!leading-snug">{s}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <div className="mt-10 w-full border-l-2 border-[var(--signal)] bg-[var(--signal-tint)] px-7 py-6 md:px-10">
          <p className="type-quote max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
            For example, the target population of a study for a regional bank may
            be defined as{" "}
            <span className="text-[var(--signal)]">account holders</span> aged{" "}
            <span className="text-[var(--signal)]">18 or older</span> who used the
            bank&apos;s <span className="text-[var(--signal)]">mobile application</span>{" "}
            in the <span className="text-[var(--signal)]">past three months</span>.
          </p>
        </div>
      </Slide>

      {/* ================================================================
          Sampling and Nonsampling Error
          ================================================================ */}
      <Slide
        id="sampling-and-nonsampling-error"
        border
        className="!py-8"
        exercise={exercise["sampling-and-nonsampling-error"]}
      >
        <SlideHeading>Sampling and Nonsampling Error</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <P className="!max-w-none">
              <Term>Sampling error</Term> is the difference between a sample
              result and the true population value that arises because only a
              subset of the population is observed.
            </P>
            <P className="mt-2 !max-w-none">
              Sampling error decreases as the sample size increases, and can be
              estimated for probability samples.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P className="!max-w-none">
              <Term tone="counter">Nonsampling error</Term> arises from sources
              other than sampling, and does not decrease as the sample size
              increases.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <ErrorsAndSampleSize />
        </Plate>
        <ol className="mt-5 grid w-full gap-x-10 gap-y-4 md:grid-cols-3">
          {[
            <>
              <Term tone="counter">Frame error</Term> occurs when the sampling
              frame does not correspond to the target population, as when a list
              of email subscribers is used to represent all customers.
            </>,
            <>
              <Term tone="counter">Nonresponse error</Term> occurs when the people
              who respond differ systematically from those who do not.
            </>,
            <>
              <Term tone="counter">Response error</Term> occurs when respondents
              give inaccurate answers, whether because of poorly worded questions,
              faulty recall, or the response biases introduced in Week 4.
            </>,
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Ruled tone="counter" weight="thin">
                <P className="!leading-snug">{s}</P>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Part 2: Sampling Techniques
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Sampling Techniques" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Sampling techniques are classified as <Term>probability</Term> or{" "}
          <Term tone="counter">nonprobability</Term> techniques.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              In probability sampling, every element of the population has a
              known, nonzero chance of selection.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              In nonprobability sampling, selection depends on the judgment of the
              researcher or the convenience of access, and the chance of selection
              is unknown.
            </p>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-9 border-t-2 border-[var(--ink)] pt-5`}>
          Only probability samples permit the statistical estimation of{" "}
          <span className="text-[var(--signal)]">sampling error</span>.
        </p>
      </Slide>

      {/* ================================================================
          Simple Random and Systematic Sampling
          ================================================================ */}
      <Slide id="simple-random-and-systematic-sampling" border className="!py-8">
        <SlideHeading>Simple Random and Systematic Sampling</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P>
                In <Term tone="ink">simple random sampling</Term>, every element of
                the population has an equal chance of selection, and every
                possible sample of a given size is equally likely.
              </P>
            </Ruled>
            <P>
              Simple random sampling requires a complete sampling frame, from
              which elements are selected by a random procedure.
            </P>
            <Ruled tone="signal">
              <P>
                In <Term>systematic sampling</Term>, the researcher selects a
                random starting point in the sampling frame and then selects every
                kth element, such as every 20th customer on a list.
              </P>
            </Ruled>
            <Ruled tone="counter" weight="thin">
              <P>
                Systematic sampling is simpler to execute than simple random
                sampling, but it produces a{" "}
                <span className="text-[var(--counter)]">biased sample</span> if the
                list follows a pattern that coincides with the sampling interval.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PeriodicList />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Stratified and Cluster Sampling
          ================================================================ */}
      <Slide id="stratified-and-cluster-sampling" border className="!py-8">
        <SlideHeading>Stratified and Cluster Sampling</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="signal">
              <P className="!max-w-none">
                In <Term>stratified sampling</Term>, the population is divided into
                subgroups, called strata, and a random sample is drawn from each
                stratum.
              </P>
            </Ruled>
            <P className="!max-w-none">
              Strata are defined so that elements within a stratum are similar,
              such as customers grouped by region or by spending level.
            </P>
            <P className="!max-w-none">
              Stratified sampling increases precision and ensures that small but
              important subgroups are represented.
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="counter">
              <P className="!max-w-none">
                In <Term tone="counter">cluster sampling</Term>, the population is
                divided into clusters, such as city blocks or stores, a random
                sample of clusters is selected, and elements are studied within
                the selected clusters.
              </P>
            </Ruled>
            <P className="!max-w-none">
              Cluster sampling reduces the cost of data collection, particularly
              for in-person interviews, but it is less precise than stratified
              sampling of the same size.
            </P>
          </div>
        </div>
        <Plate className="mt-5">
          <StrataAndClusters />
        </Plate>
      </Slide>

      {/* ================================================================
          Nonprobability Sampling Techniques
          ================================================================ */}
      <Slide id="nonprobability-sampling-techniques" border className="!py-8">
        <SlideHeading>Nonprobability Sampling Techniques</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-7 md:grid-cols-2">
          {[
            <>
              In <Term tone="counter">convenience sampling</Term>, elements are
              selected because they are easily accessible, such as shoppers
              intercepted in a mall.
            </>,
            <>
              In <Term tone="counter">judgmental sampling</Term>, the researcher
              selects elements believed to be representative or especially
              informative, such as expert users of a product.
            </>,
            <>
              In <Term tone="counter">quota sampling</Term>, the researcher sets
              quotas for subgroups, such as age and gender, in proportion to the
              population, and fills each quota by convenience or judgment.
            </>,
            <>
              In <Term tone="counter">snowball sampling</Term>, initial respondents
              identify further respondents, which is useful for rare or
              hard-to-reach populations.
            </>,
          ].map((s, i) => (
            <Numbered key={i} n={i + 1} tone="counter">
              <Ruled tone="counter" weight="thin">
                <p className={BIG}>{s}</p>
              </Ruled>
            </Numbered>
          ))}
        </div>
        <div className="mt-9 grid w-full gap-8 border-t-2 border-[var(--ink)] pt-5 md:grid-cols-2 md:gap-12">
          <P className="!max-w-none">
            Nonprobability samples are faster and less expensive than probability
            samples, and are appropriate for exploratory research and pretesting.
          </P>
          <P className="!max-w-none">
            Their results{" "}
            <span className="text-[var(--counter)]">cannot be projected</span> to
            the population with a known level of precision.
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Selecting a Sampling Technique
          ================================================================ */}
      <Slide
        id="selecting-a-sampling-technique"
        border
        className="!py-8"
        exercise={exercise["selecting-a-sampling-technique"]}
      >
        <SlideHeading>Selecting a Sampling Technique</SlideHeading>
        <ul className="flex w-full flex-col">
          {[
            {
              term: "Probability sampling",
              rest: " is appropriate when the findings must be projected to the population with a known level of precision, as in estimates of market size.",
              tone: "signal" as const,
            },
            {
              term: "Nonprobability sampling",
              rest: " is appropriate for exploratory research, for pretesting, and when no sampling frame is available.",
              tone: "counter" as const,
            },
            {
              term: "Stratified sampling",
              rest: " is appropriate when subgroups differ substantially and each must be estimated accurately.",
              tone: "signal" as const,
            },
            {
              term: "Cluster sampling",
              rest: " is appropriate when the population is geographically dispersed and in-person data collection is required.",
              tone: "signal" as const,
            },
            {
              term: "Snowball sampling",
              rest: " is appropriate when the population is rare and its members know one another.",
              tone: "counter" as const,
            },
          ].map(({ term, rest, tone }) => (
            <li key={term} className="min-w-0 border-t border-[var(--rule-2)] py-4 last:border-b">
              <p className={BIG}>
                <Term tone={tone}>{term}</Term>
                {rest}
              </p>
            </li>
          ))}
        </ul>
      </Slide>

      {/* ================================================================
          Part 3: Determining the Sample Size
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Determining the Sample Size" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          The sample size is determined by <Term>statistical</Term> and{" "}
          <Term tone="counter">practical</Term> considerations.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              Larger samples are required for important decisions, for
              descriptive and causal research, for analyses of many variables,
              and for separate estimates of subgroups.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              The sample size is also constrained by the available budget and
              time, and by the proportion of contacted people who qualify for and
              complete the study.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Precision and Confidence
          ================================================================ */}
      <Slide
        id="precision-and-confidence"
        border
        className="!py-8"
        exercise={exercise["precision-and-confidence"]}
      >
        <SlideHeading>Precision and Confidence</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <P className="!max-w-none">
                The <Term>precision</Term> of an estimate is expressed as a margin
                of error, such as plus or minus five percentage points.
              </P>
            </Ruled>
            <Ruled>
              <P className="!max-w-none">
                The <Term tone="ink">confidence level</Term> is the probability
                that the interval formed by the estimate and its margin of error
                contains the true population value, conventionally 95 percent.
              </P>
            </Ruled>
            <Ruled>
              <P className="!max-w-none">
                The sample size required to estimate a proportion is{" "}
                <span className="whitespace-nowrap font-semibold text-[var(--ink)]">
                  n = z² × p(1 − p) / e²
                </span>
                , where z is 1.96 for 95 percent confidence, p is the expected
                proportion, and e is the margin of error.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P className="!max-w-none">
                With p set to 0.5, the most conservative assumption, a margin of
                error of five percentage points at 95 percent confidence requires
                a sample of <Term>385</Term>.
              </P>
            </Ruled>
            <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
              <Ruled tone="signal" weight="thin">
                <P className="!leading-snug">
                  Halving the margin of error requires approximately{" "}
                  <Term>four times</Term> the sample size.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P className="!leading-snug">
                  For large populations, the required sample size depends on the
                  desired precision, not on the size of the population.
                </P>
              </Ruled>
            </div>
          </div>
          <Plate>
            <SampleSizeCurve />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Incidence and Completion Rates
          ================================================================ */}
      <Slide id="incidence-and-completion-rates" border className="!py-8">
        <SlideHeading>Incidence and Completion Rates</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <p className={BIG}>
                The <Term tone="ink">incidence rate</Term> is the proportion of
                contacted people who qualify for the study.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                The <Term tone="ink">completion rate</Term> is the proportion of
                qualified people who complete it.
              </p>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P className="!max-w-none">
                The number of people who must be contacted equals the required
                sample size divided by the product of the incidence rate and the
                completion rate.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ContactFunnel />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--signal)] pt-5`}>
          For example, a study that requires 385 completed questionnaires, with an
          incidence rate of 50 percent and a completion rate of 40 percent,
          requires approximately{" "}
          <span className="text-[var(--signal)]">1,925 contacts</span>.
        </p>
      </Slide>

      {/* ================================================================
          Part 4: Survey Data Collection
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Survey Data Collection" />
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Once the sample is designed, the data are collected through a survey
              method.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              The method affects the <Term>cost</Term> and <Term>speed</Term> of
              the study, the <Term>population</Term> that can be reached, and the{" "}
              <Term>accuracy</Term> of the responses.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Survey Methods
          ================================================================ */}
      <Slide id="survey-methods" border className="!py-8">
        <SlideHeading>Survey Methods</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-4">
          {[
            <>
              <Term tone="ink">Online surveys</Term> are the least expensive and
              fastest method, but they reach only people with internet access who
              are willing to participate, and they provide no control over who
              completes the questionnaire.
            </>,
            <>
              <Term tone="ink">Telephone surveys</Term> allow an interviewer to
              clarify questions, but response rates have declined substantially.
            </>,
            <>
              <Term tone="ink">In-person surveys</Term> allow complex questions,
              product demonstrations, and the highest level of control, at the
              highest cost.
            </>,
            <>
              <Term tone="ink">Self-administered surveys</Term>, whether online or
              by mail, reduce interviewer bias and social desirability bias on
              sensitive topics.
            </>,
          ].map((s, i) => (
            <Numbered key={i} n={i + 1}>
              <Ruled>
                <p className={BIG}>{s}</p>
              </Ruled>
            </Numbered>
          ))}
        </div>
      </Slide>

      {/* ================================================================
          Online Panels
          ================================================================ */}
      <Slide id="online-panels" border className="!py-8">
        <SlideHeading>Online Panels</SlideHeading>
        <Lead className="!max-w-none">
          Most online surveys in marketing research draw respondents from{" "}
          <Term>online panels</Term>: large pools of people who have agreed to
          take part in surveys in exchange for incentives.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <p className={BIG}>
                Most online panels are <Term tone="counter">opt-in panels</Term>,
                recruited through advertising and referrals. They are
                nonprobability samples, even when quotas are applied.
              </p>
            </Ruled>
            <P className="!max-w-none">
              Some members of opt-in panels complete a large number of surveys,
              which may make their responses less representative of ordinary
              consumers.
            </P>
          </div>
          <Ruled tone="signal">
            <p className={BIG}>
              <Term>Probability-based panels</Term> recruit members through random
              sampling, such as the random selection of residential addresses,
              and are more costly to maintain.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Threats to Data Quality in Online Surveys
          ================================================================ */}
      <Slide id="threats-to-data-quality-in-online-surveys" border className="!py-8">
        <SlideHeading>Threats to Data Quality in Online Surveys</SlideHeading>
        <ul className="flex w-full flex-col">
          {[
            ["Speeders", " complete the questionnaire too quickly to have read the questions."],
            ["Straight-liners", " select the same response option for every item in a set of rating questions."],
            ["Inconsistent respondents", " give answers that contradict one another, such as reporting no purchases in a category and then rating a brand in that category."],
            ["Fraudulent respondents", " misrepresent their characteristics to qualify for surveys, or complete the same survey several times."],
            ["Bots", " are automated programs that complete surveys to collect incentives. Bots that use large language models can produce fluent answers to open-ended questions."],
          ].map(([term, rest]) => (
            <li key={term} className="border-t border-[var(--rule-2)] py-3.5 last:border-b">
              <p className={BIG}>
                <Term tone="counter">{term}</Term>
                {rest}
              </p>
            </li>
          ))}
        </ul>
      </Slide>

      {/* ================================================================
          Data Quality Checks
          ================================================================ */}
      <Slide
        id="data-quality-checks"
        border
        className="!py-8"
        exercise={exercise["data-quality-checks"]}
      >
        <SlideHeading>Data Quality Checks</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-2.5">
            {[
              "Completion time is compared with a minimum threshold, and respondents who complete the questionnaire implausibly quickly are removed.",
              "Attention checks instruct respondents to select a specific answer, such as “select ‘disagree’ for this item,” and respondents who fail them are removed.",
              "Consistency checks compare answers to related questions and flag contradictions.",
              "Open-ended answers are reviewed for irrelevant, copied, or generic text, including text that appears to be generated by AI.",
              "Technical checks identify duplicate responses from the same device and automated activity.",
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Ruled weight="thin">
                  <P className="!max-w-none !leading-snug">{s}</P>
                </Ruled>
              </li>
            ))}
          </ol>
          <Plate>
            <QualityChecks />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-6 border-t-2 border-[var(--signal)] pt-5`}>
          The criteria for removing respondents are specified{" "}
          <span className="text-[var(--signal)]">before data collection</span>, and
          the number of respondents removed is reported.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: A Sample for a Launch Decision
          ================================================================ */}
      <Slide id="discussion-a-sample-for-a-launch-decision" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          A Sample for a Launch Decision
        </SlideHeading>
        <Prompt>
          A meal-kit company plans to estimate the proportion of households in a
          city that would subscribe to a new service. The marketing team proposes
          a survey of the company&apos;s social media followers. Which errors
          could this sample introduce, and which alternative sampling design would
          support a more accurate estimate?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 5: Synthetic Respondents
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Synthetic Respondents" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          <AiStep /> <Term>Synthetic respondents</Term> are AI-generated answers to
          survey questions, produced by prompting a large language model to
          respond as a person with specified characteristics.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              A set of synthetic respondents is sometimes called a{" "}
              <Term tone="ink">silicon sample</Term>.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              Commercial vendors now offer synthetic respondents as a faster and
              less expensive alternative to human samples.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How Synthetic Respondents Are Produced
          ================================================================ */}
      <Slide id="how-synthetic-respondents-are-produced" border className="!py-8">
        <SlideHeading>How Synthetic Respondents Are Produced</SlideHeading>
        <ol className="grid w-full gap-x-8 gap-y-6 md:grid-cols-3">
          {[
            { s: "The researcher specifies a profile for each synthetic respondent, such as age, gender, income, and region." },
            { s: "The language model is instructed to answer the questionnaire as a person with that profile.", ai: true },
            { s: "Many profiles are generated to match the composition of the target population, and the answers are aggregated.", ai: true },
          ].map(({ s, ai }, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone={ai ? "signal" : "ink"}>
                <Ruled tone={ai ? "signal" : "ink"}>
                  <p className={BIG}>
                    {ai ? (
                      <>
                        <AiStep />{" "}
                      </>
                    ) : null}
                    {s}
                  </p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
        <p className={`${CLOSE} mt-10 border-t-2 border-[var(--ink)] pt-5`}>
          Studies have found that synthetic respondents can reproduce some
          aggregate patterns of real survey responses, such as differences in
          opinion between broad demographic groups.
        </p>
      </Slide>

      {/* ================================================================
          Limitations of Synthetic Respondents
          ================================================================ */}
      <Slide
        id="limitations-of-synthetic-respondents"
        border
        className="!py-8"
        exercise={exercise["limitations-of-synthetic-respondents"]}
      >
        <SlideHeading>Limitations of Synthetic Respondents</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <ol className="grid min-w-0 gap-x-8 gap-y-4 md:grid-cols-2">
            {[
              "A synthetic sample is not drawn from the target population. Its responses reflect the data on which the model was trained, and no sampling frame connects them to the population.",
              "Synthetic responses typically show less variation than real responses, which understates the diversity of opinion within the population.",
              "Synthetic responses may reproduce stereotypes about demographic groups rather than the actual views of their members.",
              "Synthetic responses are sensitive to the wording of the prompt, so that minor changes in instructions can change the results.",
              "Synthetic respondents have no experience of products, prices, or events that are absent from the model's training data, which limits their value for new products.",
              "The margin of error and confidence level introduced in this week cannot be meaningfully calculated for a synthetic sample.",
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Numbered n={i + 1} tone={i === 1 || i === 3 ? "signal" : "counter"}>
                  <Ruled tone={i === 1 || i === 3 ? "signal" : "counter"} weight="thin">
                    <P className="!leading-snug">{s}</P>
                  </Ruled>
                </Numbered>
              </li>
            ))}
          </ol>
          <Plate>
            <SyntheticSpread />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Appropriate Uses of Synthetic Respondents
          ================================================================ */}
      <Slide id="appropriate-uses-of-synthetic-respondents" border className="!py-8">
        <SlideHeading>Appropriate Uses of Synthetic Respondents</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                Synthetic respondents can be used to pretest questionnaires, as
                introduced in Week 4.
              </p>
            </Ruled>
            <Ruled tone="signal">
              <p className={BIG}>
                They can be used in exploratory research to generate hypotheses
                for testing with real respondents.
              </p>
            </Ruled>
          </div>
          <Ruled tone="counter">
            <p className={BIG}>
              They are <span className="text-[var(--counter)]">not</span> used as
              a substitute for real respondents when the findings inform
              consequential decisions.
            </p>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-9 border-t-2 border-[var(--ink)] pt-5`}>
          Where synthetic respondents are used, their results are compared with
          those of a real sample on the same questions, and their use is
          disclosed in the report.
        </p>
      </Slide>

      {/* ================================================================
          Discussion: A Synthetic Panel
          ================================================================ */}
      <Slide id="discussion-a-synthetic-panel" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          A Synthetic Panel
        </SlideHeading>
        <Prompt>
          A vendor offers a synthetic panel of 10,000 respondents, delivered
          within one hour at a fraction of the cost of a human sample, and states
          that its results are &ldquo;95 percent accurate.&rdquo; Which questions
          should the research team ask the vendor, and for which decisions, if
          any, would such a panel be appropriate?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "A sample is selected from a sampling frame to draw conclusions about a defined target population.",
            "Sampling error decreases as the sample size increases; nonsampling errors, such as frame, nonresponse, and response errors, do not.",
            "Only probability samples permit the estimation of sampling error, while nonprobability samples are appropriate for exploratory research and pretesting.",
            "The sample size depends on the desired precision and confidence, and the number of contacts depends on the incidence and completion rates.",
            "Online panels require data quality checks for speeders, straight-liners, fraudulent respondents, and bots, with criteria specified in advance.",
            "Synthetic respondents are not a sample of the target population, and they supplement rather than replace real respondents.",
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
