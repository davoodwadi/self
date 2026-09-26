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
  BrandsOnScale,
  OperationalDefinition,
  RanksHideGaps,
  ArbitraryZero,
  RegionCodes,
  ComparativeForms,
  LikertItems,
  HabitProfile,
  ScaleDecisions,
  MultiItemAccuracy,
  TestRetest,
  ValidityEvidence,
  BathroomScale,
  QuestionForms,
  QuestionnaireFunnel,
} from "./visuals";

// ============================================================================
// WEEK 04 — MEASUREMENT AND QUESTIONNAIRE DESIGN
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md; the
// design only decides where each one sits and what is drawn beside it. Plates
// live in ./visuals.tsx; the interactive ones are built around one action
// each (drag the zero point, renumber the regions, flip the adjective pairs,
// add a midpoint or a "no opinion" option, add items to a scale).
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

export default function Week4() {
  return (
    <SlideDeck label="Week 04">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 04 · Marketing Research &amp; Analytics</Subtitle>
        <Title className="mt-6 !max-w-[20ch]">
          <span className="text-[var(--signal)]">Measurement</span> and Questionnaire Design
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[44ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          The quality of survey findings depends on the quality of the{" "}
          <span className="text-[var(--signal)]">measures</span> and the{" "}
          <span className="text-[var(--signal)]">questions</span> from which they
          are derived.
        </p>
      </Slide>

      {/* ================================================================
          Measurement and Scaling
          ================================================================ */}
      <Slide id="measurement-and-scaling" border className="!py-8">
        <SlideHeading>Measurement and Scaling</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          <Term>Measurement</Term> is the assignment of numbers or other symbols
          to characteristics of objects according to specified rules.
        </Statement>
        <div className="mt-8 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P>
                The objects of measurement are consumers, brands, stores, or
                advertisements. What is measured is a characteristic of these
                objects, such as a consumer&apos;s income or a brand&apos;s
                perceived quality.
              </P>
            </Ruled>
            <Ruled weight="thin" tone="signal">
              <P>
                <Term>Scaling</Term> is the creation of a continuum on which
                measured objects are located, such as a scale from 1 to 7 on
                which consumers rate a brand.
              </P>
            </Ruled>
          </div>
          <Plate>
            <BrandsOnScale />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--ink)] pt-5`}>
          The rules of assignment must be consistent, so that the same
          characteristic always receives the same number.
        </p>
      </Slide>

      {/* ================================================================
          Constructs and Operational Definitions
          ================================================================ */}
      <Slide id="constructs-and-operational-definitions" border className="!py-8">
        <SlideHeading>Constructs and Operational Definitions</SlideHeading>
        <Lead className="!max-w-none">
          Many characteristics of interest in marketing are{" "}
          <Term>constructs</Term>: concepts that cannot be observed directly,
          such as satisfaction, brand loyalty, or purchase intention.
        </Lead>
        <div className="mt-7 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <div className="grid gap-8 md:grid-cols-2">
              <Ruled>
                <p className={BIG}>
                  A <Term tone="ink">conceptual definition</Term> states the
                  meaning of a construct in words.
                </p>
              </Ruled>
              <Ruled tone="signal">
                <p className={BIG}>
                  An <Term>operational definition</Term> specifies the procedure
                  by which the construct is measured, including the questions
                  asked and the response options offered.
                </p>
              </Ruled>
            </div>
            <P className="!max-w-none">
              For example, customer satisfaction may be operationally defined as
              the average of three ratings of satisfaction with a product, each
              on a scale from 1 to 7.
            </P>
          </div>
          <Plate>
            <OperationalDefinition />
          </Plate>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--counter)] pt-5`}>
          A single construct can be operationalized in several ways, and the
          choice of operational definition{" "}
          <span className="text-[var(--counter)]">affects the findings</span>.
        </p>
      </Slide>

      {/* ================================================================
          Part 1: Levels of Measurement
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Levels of Measurement" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Every measure has a level of measurement:{" "}
          <Term tone="ink">nominal</Term>, <Term tone="ink">ordinal</Term>,{" "}
          <Term tone="ink">interval</Term>, or <Term tone="ink">ratio</Term>.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              The level of measurement determines which statistical analyses are
              appropriate.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Each level possesses the properties of the levels below it,
              together with an additional property.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Nominal and Ordinal Scales
          ================================================================ */}
      <Slide id="nominal-and-ordinal-scales" border className="!py-8">
        <SlideHeading>Nominal and Ordinal Scales</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <p className={BIG}>
                A <Term tone="ink">nominal scale</Term> uses numbers only as
                labels to identify or classify objects.
              </p>
            </Ruled>
            <P className="!max-w-none">
              Examples include respondent identification numbers, gender
              categories, and region of residence. Assigning the number 1 to one
              region and 2 to another implies no order between them.
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                An <Term>ordinal scale</Term> indicates the relative position of
                objects, but not the magnitude of the differences between them.
              </p>
            </Ruled>
            <P className="!max-w-none">
              Examples include the ranking of brands by preference and categories
              of education.
            </P>
          </div>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <Ruled tone="signal" weight="thin">
            <p className={BIG}>
              A consumer who ranks three brands first, second, and third reveals
              an order of preference, but not how much more the first brand is
              preferred to the second.
            </p>
          </Ruled>
          <Plate>
            <RanksHideGaps />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Interval and Ratio Scales
          ================================================================ */}
      <Slide id="interval-and-ratio-scales" border className="!py-8">
        <SlideHeading>Interval and Ratio Scales</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled>
              <P className="!max-w-none">
                An <Term tone="ink">interval scale</Term> has equal distances
                between adjacent points, so that differences between values can
                be compared.
              </P>
            </Ruled>
            <P className="!max-w-none">
              The zero point of an interval scale is{" "}
              <span className="text-[var(--counter)]">arbitrary</span>.
              Temperature in degrees Celsius is an interval scale: 20 degrees is
              not twice as warm as 10 degrees.
            </P>
            <P className="!max-w-none">
              Rating scales, such as a scale from 1 to 7, are commonly treated as
              interval scales in marketing research.
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <Ruled tone="signal">
              <P className="!max-w-none">
                A <Term>ratio scale</Term> has all the properties of an interval
                scale, together with an absolute zero point.
              </P>
            </Ruled>
            <P className="!max-w-none">
              Examples include income, age, sales in units, and market share. A
              customer who spends 200 dollars spends twice as much as a customer
              who spends 100 dollars.
            </P>
          </div>
        </div>
        <Plate className="mt-6">
          <ArbitraryZero />
        </Plate>
      </Slide>

      {/* ================================================================
          Levels of Measurement and Permissible Statistics
          ================================================================ */}
      <Slide
        id="levels-of-measurement-and-permissible-statistics"
        border
        className="!py-8"
        exercise={exercise["levels-of-measurement-and-permissible-statistics"]}
      >
        <SlideHeading>Levels of Measurement and Permissible Statistics</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-3">
            {[
              ["Nominal", " data permit counts, percentages, and the mode."],
              ["Ordinal", " data additionally permit the median and percentiles."],
              ["Interval", " data additionally permit the mean and the standard deviation."],
              ["Ratio", " data additionally permit statements of proportion, such as “twice as much.”"],
            ].map(([term, rest], i) => (
              <li key={term} className="min-w-0" style={{ paddingLeft: `${i * 1.25}rem` }}>
                <Ruled weight={i === 0 ? "thick" : "thin"}>
                  <p className={BIG}>
                    <Term tone="ink">{term}</Term>
                    {rest}
                  </p>
                </Ruled>
              </li>
            ))}
          </ol>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="counter">
              <P className="!max-w-none">
                An analysis that assumes a higher level of measurement than the
                data possess produces results that cannot be meaningfully
                interpreted, such as the{" "}
                <span className="text-[var(--counter)]">
                  average of respondents&apos; region codes
                </span>
                .
              </P>
            </Ruled>
            <Plate>
              <RegionCodes />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Scaling Techniques
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Scaling Techniques" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          Scaling techniques are classified as{" "}
          <Term>comparative</Term> or <Term tone="counter">noncomparative</Term>.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              In comparative scales, respondents compare objects directly with
              one another.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              In noncomparative scales, each object is evaluated independently of
              the others.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Comparative Scales
          ================================================================ */}
      <Slide id="comparative-scales" border className="!py-8">
        <SlideHeading>Comparative Scales</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-5 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              In a <Term tone="ink">paired comparison scale</Term>, respondents
              choose one of two objects according to a stated criterion, such as
              preference.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              In a <Term tone="ink">rank-order scale</Term>, respondents rank
              several objects according to a criterion, such as ranking five
              coffee brands from most to least preferred.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              In a <Term tone="ink">constant sum scale</Term>, respondents divide
              a fixed number of points, typically 100, among several attributes
              or objects to indicate their relative importance.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <ComparativeForms />
        </Plate>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="ink" weight="thin">
            <P className="!max-w-none">
              Comparative scales produce ordinal data, with the exception of
              constant sum scales, which are often treated as interval data.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P className="!max-w-none">
              Comparative scales detect small differences between objects, but
              their results cannot be generalized beyond the objects included in
              the comparison.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Likert Scales
          ================================================================ */}
      <Slide id="likert-scales" border className="!py-8">
        <SlideHeading>Likert Scales</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <p className={BIG}>
                A <Term>Likert scale</Term> presents a series of statements, and
                respondents indicate their degree of agreement or disagreement
                with each.
              </p>
            </Ruled>
            <P>
              Response categories typically range from &ldquo;strongly
              disagree&rdquo; to &ldquo;strongly agree,&rdquo; with five or seven
              categories.
            </P>
            <P>
              For example: &ldquo;This bank&apos;s mobile application is easy to
              use,&rdquo; rated from 1, strongly disagree, to 5, strongly agree.
            </P>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P className="!max-w-none">
                The ratings for several statements measuring the same construct
                are summed or averaged to produce a single score.
              </P>
            </Ruled>
            <Plate>
              <LikertItems />
            </Plate>
          </div>
        </div>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--counter)] pt-5`}>
          Likert scales are easy to construct and to administer, but respondents
          must read each statement carefully, which increases the time required
          to complete the questionnaire.
        </p>
      </Slide>

      {/* ================================================================
          Semantic Differential Scales
          ================================================================ */}
      <Slide
        id="semantic-differential-scales"
        border
        className="!py-8"
        exercise={exercise["semantic-differential-scales"]}
      >
        <SlideHeading>Semantic Differential Scales</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled tone="signal">
              <P>
                A <Term>semantic differential scale</Term> presents pairs of
                adjectives with opposite meanings at the two ends of a scale,
                typically with seven points.
              </P>
            </Ruled>
            <P>
              Respondents indicate the point between the two adjectives that best
              describes the object.
            </P>
            <P>
              For example, a hotel may be rated on scales between
              &ldquo;modern&rdquo; and &ldquo;old-fashioned,&rdquo;
              &ldquo;friendly&rdquo; and &ldquo;unfriendly,&rdquo; and
              &ldquo;expensive&rdquo; and &ldquo;inexpensive.&rdquo;
            </P>
            <Ruled weight="thin">
              <P>
                Semantic differential scales are widely used to compare the
                images of brands, stores, and companies.
              </P>
            </Ruled>
            <Ruled tone="counter">
              <P>
                The adjective pairs are presented with the favorable adjective on
                the left for some pairs and on the right for others, so that
                respondents do not answer by habit.
              </P>
            </Ruled>
          </div>
          <Plate>
            <HabitProfile />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Decisions in Constructing Rating Scales
          ================================================================ */}
      <Slide
        id="decisions-in-constructing-rating-scales"
        border
        className="!py-8"
        exercise={exercise["decisions-in-constructing-rating-scales"]}
      >
        <SlideHeading>Decisions in Constructing Rating Scales</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-3">
            {[
              ["The number of categories", ": more categories permit finer distinctions, but respondents can reliably distinguish only a limited number. Five to nine categories are commonly used."],
              ["Balanced or unbalanced", ": a balanced scale has an equal number of favorable and unfavorable categories."],
              ["Odd or even number of categories", ": an odd number provides a neutral midpoint. An even number requires respondents to lean in one direction."],
              ["Forced or nonforced", ": a nonforced scale includes a “no opinion” or “don’t know” option, which is appropriate when some respondents lack the knowledge to answer."],
              ["Verbal labels", ": labels may be provided for every category or only for the endpoints."],
            ].map(([term, rest], i) => (
              <li key={term} className="min-w-0">
                <Numbered n={i + 1} tone={i === 2 || i === 3 ? "signal" : "ink"}>
                  <Ruled weight="thin" tone={i === 2 || i === 3 ? "signal" : "ink"}>
                    <P className="!max-w-none !leading-snug">
                      <Term tone={i === 2 || i === 3 ? "signal" : "ink"}>{term}</Term>
                      {rest}
                    </P>
                  </Ruled>
                </Numbered>
              </li>
            ))}
          </ol>
          <Plate>
            <ScaleDecisions />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Multi-Item Scales
          ================================================================ */}
      <Slide id="multi-item-scales" border className="!py-8">
        <SlideHeading>Multi-Item Scales</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Constructs are usually measured with several items rather than a
              single question.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              Each item captures part of the construct, and the combined score
              measures the construct{" "}
              <span className="text-[var(--signal)]">more accurately</span> than
              any single item.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <MultiItemAccuracy />
        </Plate>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P className="!max-w-none">
              Many multi-item scales have been developed and validated in
              published research, for constructs such as satisfaction, brand
              attitude, and service quality.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P className="!max-w-none">
              A validated scale is used in its published form. Changing the
              wording of its items can change what the scale measures.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: Reliability and Validity
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Reliability and Validity" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
            Every measure contains some error.
          </Statement>
          <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
            The observed score equals the true score plus{" "}
            <span className="text-[var(--counter)]">systematic error</span> plus{" "}
            <span className="text-[var(--signal)]">random error</span>.
          </Statement>
        </div>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="counter">
            <p className={BIG}>
              <Term tone="counter">Systematic error</Term> affects every
              measurement in the same way, such as a question that consistently
              encourages favorable answers.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              <Term>Random error</Term> varies unpredictably from one measurement
              to the next, such as errors caused by a respondent&apos;s fatigue or
              distraction.
            </p>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-9 border-t-2 border-[var(--ink)] pt-5`}>
          Reliability and validity are the criteria by which the extent of these
          errors is evaluated.
        </p>
      </Slide>

      {/* ================================================================
          Reliability
          ================================================================ */}
      <Slide id="reliability" border className="!py-8">
        <SlideHeading>Reliability</SlideHeading>
        <Lead className="!max-w-none">
          <Term>Reliability</Term> is the extent to which a scale produces
          consistent results when the measurement is repeated. It reflects the
          absence of random error.
        </Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin" tone="signal">
              <P className="!max-w-none">
                <Term>Test-retest reliability</Term> is assessed by administering
                the same scale to the same respondents at two points in time and
                correlating the results.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none">
                <Term tone="ink">Alternative-forms reliability</Term> is assessed
                by administering two equivalent versions of the scale and
                correlating the results.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none">
                <Term tone="ink">Internal consistency reliability</Term> is
                assessed by examining whether the items of a multi-item scale
                produce consistent results.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P className="!max-w-none">
                Coefficient alpha, also known as Cronbach&apos;s alpha, is the
                most widely used measure of internal consistency. A value of 0.70
                or higher is conventionally regarded as acceptable.
              </P>
            </Ruled>
          </div>
          <Plate>
            <TestRetest />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Validity
          ================================================================ */}
      <Slide id="validity" border className="!py-8">
        <SlideHeading>Validity</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.4rem,2.2vw,1.85rem)]">
          <Term>Validity</Term> is the extent to which a scale measures the
          construct it is intended to measure. It reflects the absence of both
          systematic and random error.
        </Statement>
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Content validity</Term> is the extent to which
                the items cover the full domain of the construct, as judged by
                experts.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Criterion validity</Term> is the extent to which
                the scale is related to other variables with which it should
                theoretically be related, such as actual purchases.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Construct validity</Term> is the extent to which
                the scale behaves as theory predicts.
              </P>
            </Ruled>
            <Ruled weight="thin" tone="signal">
              <P>
                <Term>Convergent validity</Term> is shown when the scale
                correlates with other measures of the same construct.{" "}
                <Term tone="counter">Discriminant validity</Term> is shown when it
                does not correlate strongly with measures of different
                constructs.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ValidityEvidence />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Reliability Versus Validity
          ================================================================ */}
      <Slide
        id="reliability-versus-validity"
        border
        className="!py-8"
        exercise={exercise["reliability-versus-validity"]}
      >
        <SlideHeading>Reliability Versus Validity</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
            A measure can be <Term>reliable</Term> without being{" "}
            <Term tone="counter">valid</Term>.
          </Statement>
          <Ruled>
            <p className={BIG}>
              A bathroom scale that consistently reads three kilograms too high is
              reliable, because its readings are consistent, but it is not valid,
              because its readings are systematically wrong.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <BathroomScale />
        </Plate>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P className="!max-w-none">
              A measure cannot be valid without being reliable, since
              inconsistent results cannot accurately reflect the true score.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <p className={`${BIG} !max-w-none`}>
              Reliability is therefore a necessary but not a sufficient condition
              for validity.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Questionnaire Design
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Questionnaire Design" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.5rem,2.5vw,2.1rem)]">
          A <Term>questionnaire</Term> is a structured set of questions designed
          to obtain information from respondents.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              It translates the information requirements of the research problem
              into questions that respondents are able and willing to answer.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              It also motivates respondents to complete the questionnaire and
              minimizes response error.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Types of Questions
          ================================================================ */}
      <Slide id="types-of-questions" border className="!py-8">
        <SlideHeading>Types of Questions</SlideHeading>
        <div className="grid w-full gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          <Ruled weight="thin">
            <P className="!leading-snug">
              <Term tone="ink">Open-ended questions</Term> allow respondents to
              answer in their own words. They provide rich information but
              require coding before analysis.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!leading-snug">
              <Term tone="ink">Multiple-choice questions</Term> offer a list of
              response options, from which respondents select one or more.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!leading-snug">
              <Term tone="ink">Dichotomous questions</Term> offer only two
              response options, such as yes and no.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!leading-snug">
              <Term tone="ink">Scaled questions</Term> use the rating scales
              introduced earlier in this week.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <QuestionForms />
        </Plate>
        <p className={`${CLOSE} mt-7 border-t-2 border-[var(--counter)] pt-5`}>
          Structured questions are faster to answer and to analyze, but they
          limit responses to the options the researcher has{" "}
          <span className="text-[var(--counter)]">anticipated</span>.
        </p>
      </Slide>

      {/* ================================================================
          Question Wording
          ================================================================ */}
      <Slide
        id="question-wording"
        border
        className="!py-8"
        exercise={exercise["question-wording"]}
      >
        <SlideHeading>Question Wording</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Questions use words that respondents understand, and avoid technical terms.",
            "Questions avoid ambiguous words, such as “often” or “regularly,” whose meaning varies across respondents.",
            "Questions avoid leading wording that suggests the desired answer, such as “Do you agree that our new menu is an improvement?”",
            "Questions avoid double-barreled wording that asks about two issues at once, such as “How satisfied are you with the price and quality of the product?”",
            "Questions avoid implicit assumptions, such as asking how often a respondent uses a feature without first establishing that the respondent uses it.",
            "Questions ask only for information that respondents are able to provide, such as recent rather than distant purchases.",
          ].map((s, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1} tone={i === 0 || i === 5 ? "ink" : "counter"}>
                <Ruled weight="thin" tone={i === 0 || i === 5 ? "ink" : "counter"}>
                  <p className={BIG}>{s}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Question Order
          ================================================================ */}
      <Slide id="question-order" border className="!py-8">
        <SlideHeading>Question Order</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <ol className="flex min-w-0 flex-col gap-3">
            {[
              "A questionnaire begins with simple and interesting questions that establish the respondent’s cooperation.",
              "Screening questions, which establish whether the respondent qualifies for the study, appear at the start.",
              "The funnel approach moves from general questions to specific questions, so that specific questions do not influence answers to general questions.",
              "Sensitive questions and classification questions, such as income, are placed near the end.",
            ].map((s, i) => (
              <li key={i} className="min-w-0">
                <Ruled weight="thin" tone={i === 2 ? "signal" : "ink"}>
                  <P className="!max-w-none">{s}</P>
                </Ruled>
              </li>
            ))}
          </ol>
          <Plate>
            <QuestionnaireFunnel />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-12">
          <Ruled tone="counter">
            <p className={BIG}>
              <Term tone="counter">Order effects</Term> occur when earlier
              questions influence answers to later questions. Rating a
              brand&apos;s safety, for example, can raise the importance that
              respondents later assign to safety.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The order of response options can also affect answers, and is
              therefore randomized where possible.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Response Bias
          ================================================================ */}
      <Slide id="response-bias" border className="!py-8" exercise={exercise["response-bias"]}>
        <SlideHeading>Response Bias</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
          <Term tone="counter">Response bias</Term> is the systematic tendency of
          respondents to answer in a way that does not reflect their true
          opinions or behavior.
        </Statement>
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled weight="thin">
            <P className="!max-w-none">
              <Term tone="ink">Social desirability bias</Term> is the tendency to
              give answers that present the respondent favorably, such as
              overstating recycling or understating alcohol consumption.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none">
              <Term tone="ink">Acquiescence bias</Term> is the tendency to agree
              with statements regardless of their content.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none">
              <Term tone="ink">Extreme responding</Term> and{" "}
              <Term tone="ink">midpoint responding</Term> are the tendencies to
              select the endpoints or the middle of a scale regardless of the
              question.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P className="!max-w-none">
              <Term tone="ink">Interviewer bias</Term> occurs when the presence or
              behavior of an interviewer influences responses.
            </P>
          </Ruled>
        </div>
        <p className="type-quote mt-9 w-full border-l-2 border-[var(--signal)] bg-[var(--signal-tint)] px-7 py-5 !max-w-none !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Response bias is reduced through careful wording, balanced scales,
          assurances of anonymity, and self-administered questionnaires for
          sensitive topics.
        </p>
      </Slide>

      {/* ================================================================
          Pretesting
          ================================================================ */}
      <Slide id="pretesting" border className="!py-8">
        <SlideHeading>Pretesting</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,1.95rem)]">
          <Term>Pretesting</Term> is the administration of the questionnaire to a
          small sample of respondents from the target population, in order to
          identify and eliminate problems before data collection.
        </Statement>
        <div className="mt-9 grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          <Ruled tone="signal">
            <p className={BIG}>
              In <Term>cognitive interviewing</Term>, respondents explain aloud how
              they interpret each question and arrive at their answers.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Pretesting reveals ambiguous wording, unclear instructions, missing
              response options, and questions that respondents are unable or
              unwilling to answer.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The questionnaire is revised after the pretest, and a substantially
              revised questionnaire is pretested again.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: AI in Questionnaire Design
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="AI in Questionnaire Design" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.45rem,2.4vw,2rem)]">
          AI tools are now widely used to draft, revise, translate, and review
          survey questions.
        </Statement>
        <div className="mt-9 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              They reduce the time required to produce a first draft of a
              questionnaire.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The principles of measurement introduced in this week apply to
              AI-generated items in the same way as to items written by
              researchers.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Applications and Risks of AI in Item Development
          ================================================================ */}
      <Slide id="applications-and-risks-of-ai-in-item-development" border className="!py-8">
        <SlideHeading>Applications and Risks of AI in Item Development</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              AI can be used to generate candidate items for a construct, to
              propose response options, and to produce alternative wordings of a
              question.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              AI can be used to review a draft questionnaire for leading,
              double-barreled, or ambiguous wording, and to translate it into
              other languages.
            </p>
          </Ruled>
        </div>
        <ol className="mt-9 grid w-full gap-x-10 gap-y-6 md:grid-cols-3">
          {[
            <>
              AI-generated items may appear appropriate while failing to cover the
              full domain of the construct, which reduces{" "}
              <Term tone="counter">content validity</Term>.
            </>,
            <>
              AI tools may present items as coming from a published, validated
              scale when the items have been{" "}
              <Term tone="counter">altered or invented</Term>.
            </>,
            <>
              AI tools may also rephrase the items of a validated scale, which{" "}
              <Term tone="counter">changes what the scale measures</Term>.
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
      </Slide>

      {/* ================================================================
          Pretesting With AI
          ================================================================ */}
      <Slide id="pretesting-with-ai" border className="!py-8">
        <SlideHeading>Pretesting With AI</SlideHeading>
        <Lead className="!max-w-none">
          <Term>AI-simulated respondents</Term> can be used to answer a draft
          questionnaire and to report which questions they find unclear, before
          the questionnaire is shown to real respondents.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              This procedure can identify some ambiguous wording and missing
              response options at low cost.
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              AI-simulated respondents do not share the knowledge, experiences,
              and interpretations of the target population, and cannot reveal all
              the problems that real respondents would encounter.
            </p>
          </Ruled>
        </div>
        <p className={`${CLOSE} mt-9 border-t-2 border-[var(--ink)] pt-5`}>
          AI pretesting therefore <span className="text-[var(--signal)]">supplements</span>{" "}
          pretesting with real respondents and does not replace it.
        </p>
      </Slide>

      {/* ================================================================
          An AI-Assisted Item Development Procedure
          ================================================================ */}
      <Slide
        id="an-ai-assisted-item-development-procedure"
        border
        className="!py-8"
        exercise={exercise["an-ai-assisted-item-development-procedure"]}
      >
        <SlideHeading>An AI-Assisted Item Development Procedure</SlideHeading>
        <ol className="grid w-full gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { s: "The researcher first defines the construct conceptually." },
            { s: "The researcher then searches for an existing validated scale, and uses it in its published form if one is suitable." },
            { s: "If no suitable scale exists, AI is used to generate a pool of candidate items.", ai: true },
            { s: "Experts then review the items for content validity and for flaws in wording." },
            { s: "The revised items are then pretested with AI-simulated respondents to identify obvious ambiguities.", ai: true },
            { s: "The items are then pretested with real respondents through cognitive interviews." },
            { s: "Finally, the scale is administered to a pilot sample, and its reliability and validity are assessed.", wide: true },
          ].map(({ s, ai, wide }, i) => (
            <li key={i} className={wide ? "min-w-0 lg:col-span-2" : "min-w-0"}>
              <Numbered n={i + 1} tone={ai ? "signal" : "ink"}>
                <Ruled weight="thin" tone={ai ? "signal" : "ink"}>
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
      </Slide>

      {/* ================================================================
          Discussion: A Questionnaire in Ten Minutes
          ================================================================ */}
      <Slide id="discussion-a-questionnaire-in-ten-minutes" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          A Questionnaire in Ten Minutes
        </SlideHeading>
        <Prompt>
          A product manager uses an AI tool to produce a complete customer
          satisfaction questionnaire in ten minutes and proposes to launch it the
          same day. Which checks should the questionnaire undergo before launch,
          and which of them cannot be performed by an AI tool?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Measurement assigns numbers to characteristics of objects according to rules, and constructs are measured through operational definitions.",
            "The level of measurement, whether nominal, ordinal, interval, or ratio, determines which statistical analyses are permissible.",
            "Comparative scales compare objects directly; noncomparative scales, such as Likert and semantic differential scales, evaluate each object independently.",
            "Reliability is the consistency of a measure, validity is the extent to which it measures the intended construct, and a measure can be reliable without being valid.",
            "Question wording, question order, and response bias affect the accuracy of responses, and every questionnaire is pretested before data collection.",
            "AI accelerates item development and review, but AI-generated items must be assessed for content validity and pretested with real respondents.",
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
