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
  IsoDiagnosticBench,
  IsoThreeFairnessFamilies,
  IsoConfusionMatrix3D,
  IsoDemographicParity,
  IsoSeparationBridge,
  IsoCalibrationTower,
  IsoCriterionSelector,
  IsoGroupAverageVsIndividual,
  IsoIndividualSimilarity,
  IsoCausalPathwayTable,
  IsoIncompatibleTriad,
  IsoImpossibilityInstrument,
  IsoDomainTradeoffs,
  IsoCreditAgeTradeoff,
  IsoMarketingDeliveryOverview,
  IsoAdAuctionSkew,
  IsoMitigationFrontier,
  IsoSixStepAuditLoop,
  IsoUniversityAdSkew,
} from "./visuals-legacy";
import { AggregationBias, FeedbackLoop, FourFifthsRule, HistoricalBias, MeasurementBias, PipelineStages, ProxyReconstruction, RepresentationBias, StatisticalToMarket, TreatmentVsImpact } from "./visuals";

// ============================================================================
// WEEK 02 — ALGORITHMIC BIAS, FAIRNESS, AND DISCRIMINATION
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md;
// the design only decides where each sentence sits and what Isometric Tabletop
// Diorama plate is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week2Page() {
  return (
    <SlideDeck label="Week 02">
      {/* ================================================================
          01 · Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 02 · Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[18ch]">
          Algorithmic <span className="text-[var(--signal)]">Bias, Fairness</span>, and Discrimination
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[42ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Because predictive models learn from unequal histories and optimize
          narrow objectives,{" "}
          <span className="text-[var(--signal)]">
            governing fairness requires explicit choices
          </span>{" "}
          among competing mathematical and legal standards.
        </p>
      </Slide>

      {/* ================================================================
          02 · From Statistical Patterns to Market Discrimination [no-exercise]
          ================================================================ */}
      <Slide id="from-statistical-patterns-to-market-discrimination" border className="!py-8">
        <SlideHeading>From Statistical Patterns to Market Discrimination</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled tone="counter">
            <P>
              Predictive models operate by{" "}
              <Term tone="counter">discriminating in the statistical sense</Term>:
              they separate customers with high predicted probabilities of an
              outcome from customers with low predicted probabilities.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Statistical discrimination becomes{" "}
              <Term tone="signal">unlawful or unethical market discrimination</Term>{" "}
              when those predictions systematically disadvantage individuals on
              the basis of protected characteristics.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <StatisticalToMarket />
        </Plate>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              A model does not need <Term tone="ink">malicious intent</Term>, or
              even direct access to a customer&apos;s race, gender, or age, to
              produce discriminatory outcomes across groups.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thin">
            <P>
              Whenever historical inequities, uneven sampling, or proxy variables
              enter the modeling pipeline,{" "}
              <Term tone="signal">optimizing for predictive accuracy alone</Term>{" "}
              will reproduce or amplify existing disparities.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          03 · Protected Characteristics and Legal Standards of Discrimination [no-exercise]
          ================================================================ */}
      <Slide
        id="protected-characteristics-and-legal-standards-of-discrimination"
        border
        className="!py-8"
      >
        <SlideHeading>
          Protected Characteristics and Legal Standards of Discrimination
        </SlideHeading>
        <Lead className="!max-w-none">
          Anti-discrimination statutes in employment, credit, housing, and public
          accommodations protect specific attributes, including{" "}
          <Term tone="counter">
            race, sex, age, religion, national origin, disability, and marital status
          </Term>
          .
        </Lead>
        <div className="mt-4 grid w-full items-center gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Disparate treatment</Term> occurs when a
                decision rule intentionally or explicitly treats individuals
                differently because of a protected characteristic.
              </P>
            </Ruled>
            <Ruled tone="signal" weight="thin">
              <P>
                <Term tone="signal">Disparate impact</Term> occurs when a
                facially neutral policy or algorithm disproportionately harms a
                protected group without a demonstrable business necessity.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Removing protected attributes from a model&apos;s input table,
                known as <Term tone="ink">fairness through unawareness</Term>,
                prevents explicit disparate treatment on paper but rarely
                prevents disparate impact in practice.
              </P>
            </Ruled>
          </div>
          <Plate>
            <TreatmentVsImpact />
          </Plate>
        </div>
        <div className="mt-4 grid w-full items-center gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10">
          <Ruled tone="counter">
            <p className="type-lead">
              A common regulatory benchmark for screening disparate impact is
              the <Term tone="counter">four-fifths rule</Term>, under which a
              selection rate for any protected group that is{" "}
              <Term tone="signal">less than 80 percent</Term> of the rate for
              the highest-selected group signals potential adverse impact.
            </p>
          </Ruled>
          <Plate>
            <FourFifthsRule />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          04 · Part 1: Sources of Algorithmic Bias Across the Pipeline [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Sources of Algorithmic Bias Across the Pipeline" />
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="signal">
            <P>
              <Term tone="signal">Algorithmic bias</Term> is a systematic
              difference in a model&apos;s predictions, errors, or resource
              allocations across groups that is not justified by the legitimate
              purpose of the decision.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Bias does not originate in a single line of code; it enters at
              distinct stages of{" "}
              <Term tone="ink">
                data generation, measurement, model specification, and market deployment
              </Term>
              .
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Diagnosing the exact stage at which bias enters is necessary
              because each source requires a{" "}
              <Term tone="counter">different technical and managerial remedy</Term>.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <PipelineStages />
        </Plate>
      </Slide>

      {/* ================================================================
          05 · Bias in the Data: Historical and Representation Bias [no-exercise]
          ================================================================ */}
      <Slide id="bias-in-the-data-historical-and-representation-bias" border className="!py-8">
        <SlideHeading>Bias in the Data: Historical and Representation Bias</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-between gap-4">
            <div className="grid gap-4">
              <Ruled tone="signal">
                <P>
                  <Term tone="signal">Historical bias</Term> arises when the data
                  accurately record a world shaped by past structural inequality
                  or human prejudice, so that a model trained on those records
                  treats past discrimination as the target to replicate.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  For example, a hiring model trained on ten years of past
                  executive promotions in a male-dominated industry learns to
                  penalize career patterns common among female applicants.
                </P>
              </Ruled>
            </div>
            <Plate>
              <HistoricalBias />
            </Plate>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="grid gap-4">
              <Ruled tone="counter">
                <P>
                  <Term tone="counter">Representation bias</Term> arises when
                  certain segments of the population are undersampled or missing
                  from the training dataset relative to the population on which
                  the model will be deployed.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  A facial analysis system or voice assistant trained primarily
                  on one demographic group exhibits substantially higher error
                  rates when deployed to underrepresented groups.
                </P>
              </Ruled>
            </div>
            <Plate>
              <RepresentationBias />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          06 · Bias in Modeling: Measurement and Aggregation Bias [no-exercise]
          ================================================================ */}
      <Slide id="bias-in-modeling-measurement-and-aggregation-bias" border className="!py-8">
        <SlideHeading>Bias in Modeling: Measurement and Aggregation Bias</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-between gap-4">
            <div className="grid gap-3.5">
              <Ruled tone="signal">
                <P>
                  <Term tone="signal">Measurement bias</Term> arises when the
                  observable proxy chosen to represent an unobservable construct
                  is measured with different accuracy or meaning across groups.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  Using past healthcare expenditures as a proxy for medical need
                  systematically underestimates the severity of illness among
                  lower-income patients who historically had less access to care
                  for the same level of sickness.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  Using arrest records as a proxy for criminal offense rates
                  confounds underlying behavior with differences in policing
                  intensity across neighborhoods.
                </P>
              </Ruled>
            </div>
            <Plate>
              <MeasurementBias />
            </Plate>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <Ruled tone="counter">
              <p className={BIG}>
                <Term tone="counter">Aggregation bias</Term> arises when a single
                model is fit across distinct populations whose conditional
                relationships between predictors and outcomes differ, producing a
                model that fits the majority group well and minority groups
                poorly.
              </p>
            </Ruled>
            <Plate>
              <AggregationBias />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          07 · Bias in Deployment: Proxy Variables and Feedback Loops [no-exercise]
          ================================================================ */}
      <Slide id="bias-in-deployment-proxy-variables-and-feedback-loops" border className="!py-8">
        <SlideHeading>Bias in Deployment: Proxy Variables and Feedback Loops</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-between gap-4">
            <div className="grid gap-4">
              <Ruled>
                <P>
                  <Term tone="ink">Proxy variables</Term> are seemingly neutral
                  features, such as postal code, mobile device brand, browser
                  language, or shopping schedule, that correlate strongly with
                  protected characteristics.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  In high-dimensional marketing datasets, combinations of
                  behavioral features allow a flexible machine learning model to{" "}
                  <Term tone="signal">reconstruct protected attributes</Term> with
                  high precision even when demographic columns are deleted.
                </P>
              </Ruled>
            </div>
            <Plate>
              <ProxyReconstruction />
            </Plate>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="grid gap-4">
              <Ruled tone="signal">
                <P>
                  <Term tone="signal">Runaway feedback loops</Term> arise when a
                  model&apos;s predictions determine which data are observed in
                  the next period and used to retrain the model.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  If a credit model denies loans to a neighborhood, the firm
                  never observes the repayment behavior of creditworthy
                  applicants in that neighborhood, locking the initial bias into
                  future training cycles.
                </P>
              </Ruled>
            </div>
            <Plate>
              <FeedbackLoop />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          08 · Identifying Sources of Bias in Commercial Pipelines [exercise]
          ================================================================ */}
      <Slide
        id="identifying-sources-of-bias-in-commercial-pipelines"
        border
        className="!py-8"
        exercise={exercise["identifying-sources-of-bias-in-commercial-pipelines"]}
      >
        <SlideHeading>Identifying Sources of Bias in Commercial Pipelines</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          <li className="min-w-0">
            <Numbered n={1} tone="signal">
              <Ruled tone="signal" weight="thin">
                <P>
                  <Term tone="signal">Historical bias</Term> is present when the
                  labels themselves reflect past unequal treatment, even if the
                  sample is large and the variables are measured without error.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2} tone="counter">
              <Ruled tone="counter" weight="thin">
                <P>
                  <Term tone="counter">Representation bias</Term> is present when
                  the training sample omits or under-represents a target customer
                  segment, raising error rates for that segment even if
                  historical labels were fair.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3} tone="signal">
              <Ruled tone="signal" weight="thin">
                <P>
                  <Term tone="signal">Measurement bias</Term> is present when the
                  target label or feature is a flawed proxy whose relationship to
                  the true construct differs across groups.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Aggregation bias</Term> is present when a
                  uniform model pools groups that require separate functional
                  relationships or group-specific interactions.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-5">
          <IsoDiagnosticBench />
        </Plate>
      </Slide>

      {/* ================================================================
          09 · Part 2: Group Fairness Criteria [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Group Fairness Criteria" />
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Group fairness criteria</Term> formalize what
              it means for a model to treat demographic groups equitably in terms
              of its predictions and error rates.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Most group fairness definitions are constructed from the cells of
              the <Term tone="ink">confusion matrix</Term> evaluated separately
              for each demographic group.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Three families of group fairness dominate regulatory and technical
              practice: <Term tone="counter">independence</Term>,{" "}
              <Term tone="signal">separation</Term>, and{" "}
              <Term tone="ink">sufficiency</Term>.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoThreeFairnessFamilies />
        </Plate>
      </Slide>

      {/* ================================================================
          10 · Confusion Matrices Across Demographic Groups [no-exercise]
          ================================================================ */}
      <Slide id="confusion-matrices-across-demographic-groups" border className="!py-8">
        <SlideHeading>Confusion Matrices Across Demographic Groups</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled weight="thin">
            <P>
              Consider a binary decision, such as approving a credit card
              application, where <Term tone="counter">Y equals 1</Term> if the
              applicant would repay the loan and <Term tone="signal">Y equals 0</Term>{" "}
              if the applicant would default.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              The model produces a binary decision D, where{" "}
              <Term tone="counter">D equals 1</Term> for approval and{" "}
              <Term tone="ink">D equals 0</Term> for denial, based on whether the
              applicant&apos;s predicted probability score S exceeds a cutoff
              threshold.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P>
              For each demographic group A, the confusion matrix records the
              selection rate <Term tone="ink">P(D = 1)</Term>, the true positive
              rate <Term tone="counter">P(D = 1 | Y = 1)</Term>, the false
              positive rate <Term tone="signal">P(D = 1 | Y = 0)</Term>, and the
              positive predictive value <Term tone="ink">P(Y = 1 | D = 1)</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thin">
            <P>
              Different stakeholders care about different cells of this matrix:{" "}
              <Term tone="signal">
                applicants care whether qualified members of their group are rejected
              </Term>
              , whereas{" "}
              <Term tone="counter">
                lenders care whether approved applicants from each group repay at the predicted rate
              </Term>
              .
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoConfusionMatrix3D />
        </Plate>
      </Slide>

      {/* ================================================================
          11 · Independence: Demographic Parity [no-exercise]
          ================================================================ */}
      <Slide id="independence-demographic-parity" border className="!py-8">
        <SlideHeading>Independence: Demographic Parity</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.3rem,2.05vw,1.75rem)]">
          <Term tone="counter">Independence</Term>, also called demographic
          parity or statistical parity, requires that the probability of
          receiving a favorable decision is equal across groups:{" "}
          <Term tone="ink">P(D = 1 | A = a) equals P(D = 1 | A = b)</Term>.
        </Statement>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              Under demographic parity, if 30 percent of applicants from Group A
              are approved for a premium offer, then 30 percent of applicants
              from Group B must also be approved, regardless of differences in
              historical qualification rates.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              Demographic parity is appropriate when{" "}
              <Term tone="counter">
                historical labels are deeply contaminated by past exclusion
              </Term>{" "}
              or when the organization&apos;s policy goal is equal representation
              in access to an opportunity.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Its limitation is that if underlying qualification rates differ
              between groups, enforcing demographic parity requires{" "}
              <Term tone="signal">
                approving less-qualified candidates in one group or rejecting qualified candidates in the other
              </Term>
              .
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoDemographicParity />
        </Plate>
      </Slide>

      {/* ================================================================
          12 · Separation: Equal Opportunity and Equalized Odds [no-exercise]
          ================================================================ */}
      <Slide id="separation-equal-opportunity-and-equalized-odds" border className="!py-8">
        <SlideHeading>Separation: Equal Opportunity and Equalized Odds</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              <Term tone="ink">Separation</Term> conditions fairness on the true
              outcome Y, requiring that the model&apos;s error rates do not
              depend on group membership.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term tone="signal">Equalized odds</Term> requires that both the
              true positive rate <Term tone="ink">P(D = 1 | Y = 1)</Term> and the
              false positive rate <Term tone="ink">P(D = 1 | Y = 0)</Term> are
              equal across groups.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Equal opportunity</Term> relaxes equalized
              odds to require only equal true positive rates across groups: among
              individuals who would genuinely succeed or repay (Y = 1), the
              probability of being selected by the model is identical regardless
              of group membership.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Equal opportunity directly{" "}
              <Term tone="counter">
                protects qualified individuals in disadvantaged groups
              </Term>{" "}
              from being overlooked at higher rates than equally qualified
              individuals in advantaged groups.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoSeparationBridge />
        </Plate>
      </Slide>

      {/* ================================================================
          13 · Sufficiency: Predictive Parity and Calibration [no-exercise]
          ================================================================ */}
      <Slide id="sufficiency-predictive-parity-and-calibration" border className="!py-8">
        <SlideHeading>Sufficiency: Predictive Parity and Calibration</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              <Term tone="ink">Sufficiency</Term> conditions on the model&apos;s
              prediction rather than the true outcome, requiring that a given
              prediction or risk score means the same thing across all groups.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Predictive parity</Term> requires that the
              positive predictive value <Term tone="ink">P(Y = 1 | D = 1)</Term>{" "}
              is equal across groups: among applicants who are approved, the
              actual repayment rate is the same in Group A and Group B.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term tone="signal">Calibration within groups</Term> requires that
              for every score level s, the proportion of individuals with score s
              who achieve the outcome Y = 1 is equal across groups:{" "}
              <Term tone="ink">
                P(Y = 1 | S = s, A = a) equals P(Y = 1 | S = s, A = b)
              </Term>
              .
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Calibration ensures that a{" "}
              <Term tone="ink">single cutoff threshold applied to the score S</Term>{" "}
              does not explicitly judge one group by a stricter predictive
              standard than another.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoCalibrationTower />
        </Plate>
      </Slide>

      {/* ================================================================
          14 · Selecting a Group Fairness Criterion [exercise]
          ================================================================ */}
      <Slide
        id="selecting-a-group-fairness-criterion"
        border
        className="!py-8"
        exercise={exercise["selecting-a-group-fairness-criterion"]}
      >
        <SlideHeading>Selecting a Group Fairness Criterion</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Demographic parity</Term> is selected when the
                  firm cannot trust historical outcome labels or seeks
                  proportional representation across groups, as in broad
                  awareness advertising or scholarship outreach.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2} tone="counter">
              <Ruled tone="counter" weight="thin">
                <P>
                  <Term tone="counter">Equal opportunity</Term> is selected when
                  the primary ethical harm is falsely rejecting qualified
                  individuals, as in screening job applicants or approving
                  small-business loans.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3} tone="signal">
              <Ruled tone="signal" weight="thin">
                <P>
                  <Term tone="signal">Equalized odds</Term> is selected when both
                  false rejections of the qualified and false selections of the
                  unqualified carry severe group-level harms, as in fraud
                  flagging or risk assessment.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Predictive parity and calibration</Term> are
                  selected when decision makers must trust that a numeric risk
                  score carries identical predictive meaning across groups under
                  a uniform cutoff rule.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-5">
          <IsoCriterionSelector />
        </Plate>
      </Slide>

      {/* ================================================================
          15 · Part 3: Individual and Counterfactual Fairness [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Individual and Counterfactual Fairness" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="signal">
            <p className={BIG}>
              Group fairness averages outcomes across entire demographic
              categories, which leaves open the possibility that{" "}
              <Term tone="signal">
                specific individuals within a group are treated arbitrarily
              </Term>
              .
            </p>
          </Ruled>
          <Ruled tone="counter">
            <p className={BIG}>
              <Term tone="counter">Individual and causal approaches</Term>{" "}
              evaluate fairness at the level of the single consumer rather than
              the group average.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoGroupAverageVsIndividual />
        </Plate>
      </Slide>

      {/* ================================================================
          16 · Individual Fairness: Treating Similar People Similarly [no-exercise]
          ================================================================ */}
      <Slide id="individual-fairness-treating-similar-people-similarly" border className="!py-8">
        <SlideHeading>Individual Fairness: Treating Similar People Similarly</SlideHeading>
        <Lead className="!max-w-none">
          <Term tone="counter">Individual fairness</Term>, formalized by Dwork
          and colleagues, requires that any two individuals who are similar with
          respect to a particular task receive similar probability distributions
          over outcomes.
        </Lead>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              Formally, the <Term tone="ink">distance between the model&apos;s predictions</Term>{" "}
              for two consumers cannot exceed the task-relevant distance between
              their profiles.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Individual fairness prevents <Term tone="signal">tokenism</Term>,
              in which a model satisfies group demographic parity by selecting
              arbitrary members of a protected group rather than the most
              qualified individuals within that group.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              The practical challenge of individual fairness is defining a{" "}
              <Term tone="counter">similarity metric</Term> that captures genuine
              task qualification without quietly reintroducing socioeconomic
              proxies.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoIndividualSimilarity />
        </Plate>
      </Slide>

      {/* ================================================================
          17 · Counterfactual Fairness and Causal Pathways [exercise]
          ================================================================ */}
      <Slide
        id="counterfactual-fairness-and-causal-pathways"
        border
        className="!py-8"
        exercise={exercise["counterfactual-fairness-and-causal-pathways"]}
      >
        <SlideHeading>Counterfactual Fairness and Causal Pathways</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Counterfactual fairness</Term> defines
              fairness through a causal graph: a decision is counterfactually
              fair toward an individual if the prediction would remain identical
              in a counterfactual world where the individual belonged to a
              different demographic group.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Evaluating counterfactual fairness requires distinguishing{" "}
              <Term tone="ink">causal pathways that are legitimate</Term> for the
              decision from pathways that transmit discrimination through{" "}
              <Term tone="signal">mediating variables</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              If a protected attribute influences a mediator, such as{" "}
              <Term tone="signal">neighborhood school quality</Term>, which in
              turn influences test scores, a counterfactually fair model adjusts
              for the downstream effect of the protected attribute on the
              mediator.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Unlike fairness through unawareness, which merely drops the
              demographic column, counterfactual fairness{" "}
              <Term tone="counter">
                removes the causal influence of the protected attribute on all downstream proxy variables
              </Term>{" "}
              unless a pathway is explicitly deemed business-necessary.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoCausalPathwayTable />
        </Plate>
      </Slide>

      {/* ================================================================
          18 · Part 4: The Fairness Impossibility Theorem and Managerial Trade-Offs [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead
          n={4}
          title="The Fairness Impossibility Theorem and Managerial Trade-Offs"
        />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.9rem)]">
            A central mathematical result in algorithmic governance is that the
            major criteria of group fairness are{" "}
            <span className="text-[var(--signal)]">mutually incompatible</span> in
            almost all realistic settings.
          </Statement>
          <Ruled tone="counter">
            <p className={BIG}>
              Managers cannot instruct an engineering team to make a model
              &ldquo;completely fair&rdquo; on all metrics at once; they must
              decide{" "}
              <Term tone="counter">
                which type of error disparity is most harmful
              </Term>{" "}
              in the specific market context.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoIncompatibleTriad />
        </Plate>
      </Slide>

      {/* ================================================================
          19 · The Fairness Impossibility Theorem [no-exercise]
          ================================================================ */}
      <Slide id="the-fairness-impossibility-theorem" border className="!py-8">
        <SlideHeading>The Fairness Impossibility Theorem</SlideHeading>
        <Lead className="!max-w-none">
          Proven independently by Chouldechova (2017) and Kleinberg,
          Mullainathan, and Raghavan (2017), the{" "}
          <Term tone="signal">impossibility theorem</Term> states that whenever
          two groups have different base rates of the underlying outcome P(Y = 1),
          no imperfect predictor can simultaneously satisfy{" "}
          <Term tone="ink">independence, separation, and sufficiency</Term>.
        </Lead>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled tone="signal" weight="thin">
            <P>
              Specifically, if base rates differ across groups and a model is{" "}
              <Term tone="ink">calibrated within groups (sufficiency)</Term>, the
              group with the lower base rate will mathematically have a lower
              true positive rate or a lower false positive rate,{" "}
              <Term tone="signal">violating equalized odds (separation)</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal" weight="thin">
            <P>
              Conversely, if a firm enforces{" "}
              <Term tone="ink">equalized odds</Term> across groups with unequal
              base rates, the resulting predictions{" "}
              <Term tone="signal">
                cannot have equal positive predictive value
              </Term>{" "}
              across groups.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P>
              Only two degenerate conditions avoid this trade-off: a{" "}
              <Term tone="counter">perfect predictor</Term> that makes zero
              errors, or populations whose{" "}
              <Term tone="counter">underlying base rates are identical</Term>.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoImpossibilityInstrument />
        </Plate>
      </Slide>

      {/* ================================================================
          20 · Managerial Trade-Offs in Credit, Hiring, and Ad Delivery [exercise]
          ================================================================ */}
      <Slide
        id="managerial-trade-offs-in-credit-hiring-and-ad-delivery"
        border
        className="!py-8"
        exercise={exercise["managerial-trade-offs-in-credit-hiring-and-ad-delivery"]}
      >
        <SlideHeading>
          Managerial Trade-Offs in Credit, Hiring, and Ad Delivery
        </SlideHeading>
        <Lead className="!max-w-none">
          Because mathematical impossibility rules out satisfying every fairness
          metric simultaneously, choosing a fairness criterion is a{" "}
          <Term tone="signal">normative governance decision</Term> rather than a
          purely technical optimization step.
        </Lead>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled tone="signal">
            <P>
              In <Term tone="ink">consumer credit</Term>, lenders historically
              prioritized calibration so that a credit score of 700 implied the
              same default risk for every borrower, but doing so under unequal
              base rates produces{" "}
              <Term tone="signal">
                higher false rejection rates for creditworthy borrowers
              </Term>{" "}
              in disadvantaged groups.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              In <Term tone="counter">automated resume screening</Term>,
              regulators and human-resources leaders prioritize demographic
              parity or equal opportunity at the top of the funnel so qualified
              candidates from underrepresented groups reach human interviews.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In <Term tone="ink">medical triage or fraud intervention</Term>,
              equalized odds is prioritized so that neither missed diagnoses nor
              burdensome false investigations fall disproportionately on one
              demographic segment.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoDomainTradeoffs />
        </Plate>
      </Slide>

      {/* ================================================================
          21 · Discussion: The Credit Scoring Trade-Off
          ================================================================ */}
      <Slide id="discussion-the-credit-scoring-trade-off" border className="!py-8">
        <SlideHeading>
          The Credit Scoring Trade-Off
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A digital bank&apos;s credit model is perfectly calibrated across age
            and income groups, meaning that among approved borrowers at any score
            threshold, default rates are identical across groups. However, an
            internal audit reveals that creditworthy young adults who would have
            repaid their loans are rejected at a 35 percent rate, compared with
            an 18 percent false rejection rate for older borrowers. Should the
            bank preserve calibration or adjust group thresholds to achieve equal
            opportunity, and how should it justify that choice to regulators and
            customers?
          </Prompt>
          <Plate>
            <IsoCreditAgeTradeoff />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          22 · Part 5: Auditing and Mitigating Disparate Impact in Marketing Pipelines [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead
          n={5}
          title="Auditing and Mitigating Disparate Impact in Marketing Pipelines"
        />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.35rem,2.15vw,1.85rem)]">
            In digital marketing, algorithmic discrimination most often appears
            not in explicit exclusions by a human marketer, but in{" "}
            <span className="text-[var(--signal)]">
              automated ad delivery, dynamic pricing, and personalization systems
            </span>
            .
          </Statement>
          <Ruled tone="counter">
            <p className={BIG}>
              Governing these pipelines requires understanding how{" "}
              <Term tone="counter">
                platform optimization algorithms allocate exposure
              </Term>{" "}
              and applying structured mitigation and auditing protocols.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoMarketingDeliveryOverview />
        </Plate>
      </Slide>

      {/* ================================================================
          23 · Bias in Ad Delivery and Algorithmic Targeting [no-exercise]
          ================================================================ */}
      <Slide id="bias-in-ad-delivery-and-algorithmic-targeting" border className="!py-8">
        <SlideHeading>Bias in Ad Delivery and Algorithmic Targeting</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              Even when an advertiser selects{" "}
              <Term tone="counter">
                broad, demographically neutral targeting parameters
              </Term>{" "}
              for a housing, credit, or employment advertisement, the
              platform&apos;s delivery algorithm can produce severely skewed
              audiences (Ali et al., 2019).
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Delivery skew occurs for two reasons:{" "}
              <Term tone="signal">
                market-driven cost differences across demographic segments in ad auctions
              </Term>
              , and{" "}
              <Term tone="signal">
                relevance models that optimize predicted click-through rates based on historical stereotypes
              </Term>
              .
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              If young women are more expensive to reach in an ad auction because
              retail brands bid heavily for their attention, a budget-constrained
              algorithm advertising STEM careers will automatically shift
              impressions toward men to minimize cost per click.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Similarly, an algorithm optimizing click probability on housing ads
              may steer luxury rental listings toward higher-income demographic
              profiles and subprime credit ads toward vulnerable neighborhoods.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoAdAuctionSkew />
        </Plate>
      </Slide>

      {/* ================================================================
          24 · Pre-Processing, In-Processing, and Post-Processing Mitigation [exercise]
          ================================================================ */}
      <Slide
        id="pre-processing-in-processing-and-post-processing-mitigation"
        border
        className="!py-8"
        exercise={exercise["pre-processing-in-processing-and-post-processing-mitigation"]}
      >
        <SlideHeading>
          Pre-Processing, In-Processing, and Post-Processing Mitigation
        </SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-3">
          <Ruled tone="counter" weight="thin">
            <P>
              <Term tone="counter">Pre-processing interventions</Term> modify the
              training data before a model is fit, using techniques such as
              reweighting underrepresented observations, resampling, or
              transforming features to remove correlation with protected
              attributes.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">In-processing interventions</Term> modify the
              learning algorithm itself during training, by adding a fairness
              penalty to the loss function or imposing adversarial debiasing
              constraints so the model cannot predict group membership from its
              internal representations.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P>
              <Term tone="counter">Post-processing interventions</Term> leave the
              trained model unchanged and adjust its output scores or apply
              group-specific decision thresholds to satisfy a target criterion
              such as equal opportunity or demographic parity.
            </P>
          </Ruled>
        </div>
        <Ruled tone="signal" weight="thin" className="mt-5">
          <P className="!max-w-none">
            Every mitigation method entails an{" "}
            <Term tone="signal">accuracy-fairness frontier</Term>: tightening
            fairness constraints typically reduces predictive accuracy on the
            historical objective, a trade-off that governance teams must quantify
            and document.
          </P>
        </Ruled>
        <Plate className="mt-5">
          <IsoMitigationFrontier />
        </Plate>
      </Slide>

      {/* ================================================================
          25 · Six Steps of a Disparate Impact Audit [exercise]
          ================================================================ */}
      <Slide
        id="six-steps-of-a-disparate-impact-audit"
        border
        className="!py-8"
        exercise={exercise["six-steps-of-a-disparate-impact-audit"]}
      >
        <SlideHeading>Six Steps of a Disparate Impact Audit</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">
                    Step 1 is defining the decision scope, the protected groups of concern, and the legal and ethical fairness criteria
                  </Term>{" "}
                  appropriate to the domain.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Step 2 is assembling an audit dataset</Term>{" "}
                  with verified or ethically inferred group membership labels on
                  a representative holdout sample.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3} tone="signal">
              <Ruled tone="signal" weight="thin">
                <P>
                  <Term tone="signal">Step 3 is computing baseline group metrics</Term>,
                  including selection rates, the four-fifths ratio, true positive
                  rates, false positive rates, and calibration curves across
                  groups.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">
                    Step 4 is diagnosing the pipeline stage responsible for any observed disparity
                  </Term>
                  , testing whether the gap stems from representation gaps, proxy
                  features, label measurement bias, or auction delivery dynamics.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={5} tone="counter">
              <Ruled tone="counter" weight="thin">
                <P>
                  <Term tone="counter">
                    Step 5 is evaluating pre-processing, in-processing, or post-processing mitigations
                  </Term>{" "}
                  along the accuracy-fairness frontier and selecting the
                  operating point.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={6}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">
                    Step 6 is recording the decision in a formal audit report
                  </Term>{" "}
                  and configuring continuous production alerts to detect fairness
                  drift after launch.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-5">
          <IsoSixStepAuditLoop />
        </Plate>
      </Slide>

      {/* ================================================================
          26 · Discussion: Neutral Targeting, Skewed Delivery
          ================================================================ */}
      <Slide id="discussion-neutral-targeting-skewed-delivery" border className="!py-8">
        <SlideHeading>
          Neutral Targeting, Skewed Delivery
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A university uses an automated social media ad platform to recruit
            applicants for its new Master of Financial Technology program,
            specifying only age 21 to 40 and a bachelor&apos;s degree as targeting
            criteria. After two weeks, platform logs show that 82 percent of ad
            impressions were served to men. Explain the algorithmic mechanisms
            that can produce this disparity under neutral targeting, and propose
            how the university and the platform should intervene.
          </Prompt>
          <Plate>
            <IsoUniversityAdSkew />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          27 · Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Statistical discrimination becomes market discrimination when automated predictions systematically disadvantage protected groups through disparate treatment or disparate impact.",
            "Deleting demographic columns (fairness through unawareness) fails because high-dimensional behavioral and geographic proxies reconstruct group membership.",
            "Bias enters at specific stages of the pipeline: historical and representation bias in data, measurement and aggregation bias in modeling, and proxy reconstruction and feedback loops in deployment.",
            "Group fairness criteria formalize distinct moral priorities: demographic parity equalizes selection rates, equal opportunity and equalized odds equalize error rates conditional on true qualification, and calibration equalizes predictive meaning conditional on the score.",
            "Individual fairness requires similar treatment for task-similar individuals, and counterfactual fairness removes discriminatory causal pathways through mediating variables.",
            "By the fairness impossibility theorem, when underlying base rates differ across groups, no imperfect model can satisfy demographic parity, equalized odds, and calibration simultaneously.",
            "Marketing and ad-delivery algorithms can generate severe demographic skews through auction pricing and click-rate optimization, requiring structured disparate-impact audits and pre-, in-, or post-processing mitigation.",
          ].map((takeaway, i) => (
            <li
              key={i}
              className={i === 6 ? "min-w-0 md:col-span-2 lg:col-span-3" : "min-w-0"}
            >
              <Numbered n={i + 1} tone={i === 6 ? "signal" : "ink"}>
                <Ruled tone={i === 6 ? "signal" : "ink"} weight="thin">
                  <P className={i === 6 ? "!max-w-none" : ""}>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}

