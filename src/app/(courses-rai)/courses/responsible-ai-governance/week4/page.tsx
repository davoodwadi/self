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
  AnchoringFindings,
  AuditBench,
  AuditDossier,
  ConfoundedVignettes,
  ConvolutionBuild,
  CrossedGrid,
  EffectInstrument,
  EntropyVsConsensus,
  EstimatorConverges,
  FourControls,
  HoeffdingStack,
  ItemStack,
  LifecycleGates,
  LikertLogprobs,
  OneDraw,
  PinnedVsLatest,
  ProbeVsGrid,
  SampleDispenser,
  SampleVsRead,
  ThreeLayerExploded,
  TwoInterfaces,
  TwoModelsOneDraw,
  UpgradeGate,
  ValidityMetrics,
  WeldedLevers,
} from "./visuals";

// ============================================================================
// WEEK 4: BEHAVIORAL AUDITING AND STATISTICAL EVALUATION OF AI SYSTEMS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week4Page() {
  return (
    <SlideDeck label="Week 4">
      {/* ================================================================
          01. Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 4: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">
          Behavioral Auditing and Statistical Evaluation of AI Systems
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[50ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.3rem,2.1vw,1.8rem)]">
          Reliable algorithmic governance replaces single-prompt anecdotes with{" "}
          <span className="text-[var(--signal)]">statistically grounded behavioral audits</span>{" "}
          using Monte-Carlo sampling, exact token-level distributions, and
          controlled factorial experiments.
        </p>
      </Slide>

      {/* ================================================================
          02. From Anecdotal Prompts to Scientific Behavioral Audits [no-exercise]
          ================================================================ */}
      <Slide id="from-anecdotal-prompts-to-scientific-behavioral-audits" border className="!py-8">
        <SlideHeading>From Anecdotal Prompts to Scientific Behavioral Audits</SlideHeading>
        <Lead className="!max-w-none">
          When an organization evaluates a foundation model for customer-facing
          deployment, testing a handful of prompts and inspecting the generated
          answers <Term tone="signal">is not an audit</Term>.
        </Lead>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Anecdotal prompting cannot tell a manager whether an observed
                error is a rare tail event or the model&apos;s dominant
                tendency, nor can it separate the effect of a suspect attribute
                from the wording of the prompt.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Behavioral auditing</Term> applies the
                experimental and statistical methods of behavioral science to
                artificial intelligence systems, treating the model as a
                decision-making subject whose preferences, biases, and
                consistency are measured with known precision.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Depending on whether the model produces open-ended numerical or
                text outputs in a black-box interface or evaluates structured
                scales with accessible token probabilities, auditors use two
                complementary frameworks:{" "}
                <Term tone="ink">Monte-Carlo sampling</Term> and{" "}
                <Term tone="ink">exact probability mass function analysis</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AuditBench />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          03. Why Single-Prompt Evaluations Fail [no-exercise]
          ================================================================ */}
      <Slide id="why-single-prompt-evaluations-fail" border className="!py-8">
        <SlideHeading>Why Single-Prompt Evaluations Fail</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Standard machine learning leaderboards rely on{" "}
              <Term tone="ink">pass-at-one evaluation</Term>, which draws a
              single completion per test item and scores whether that single
              output is correct.
            </P>
          </Ruled>
          <Ruled>
            <P>
              At non-zero sampling temperatures, a language model defines a
              probability distribution over many possible completions, so a
              single draw is{" "}
              <Term tone="signal">a sample of size one</Term> from a
              high-entropy distribution.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <OneDraw />
        </Plate>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Drawing a conclusion about a model&apos;s bias, safety, or pricing
              accuracy from a single completion commits the same statistical
              error as surveying a single consumer to estimate market demand.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Furthermore, open-ended text generation is prone to{" "}
              <Term tone="ink">fence-sitting</Term>, in which a model produces
              evasive disclaimers rather than revealing the latent preference
              that governs its downstream choices.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          04. Part 1: The Monte-Carlo Sampling Framework for Open-Ended Decisions [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="The Monte-Carlo Sampling Framework for Open-Ended Decisions" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                When a model generates open-ended quantities or multi-token
                decisions, such as willingness-to-pay dollar estimates, product
                recommendations, or negotiation offers, its full output
                distribution over multi-token sequences{" "}
                <Term tone="ink">cannot be read off</Term> a single
                token&apos;s vocabulary probabilities.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                In these settings, the Monte-Carlo behavioral evaluation
                framework estimates the model&apos;s true expected behavior by{" "}
                <Term tone="signal">drawing repeated independent samples</Term>{" "}
                under controlled conditions (Wadi &amp; Fredette, 2025).
              </p>
            </Ruled>
          </div>
          <Plate>
            <SampleDispenser />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          05. Stochastic Generation and Response Entropy [no-exercise]
          ================================================================ */}
      <Slide id="stochastic-generation-and-response-entropy" border className="!py-8">
        <SlideHeading>Stochastic Generation and Response Entropy</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <TwoModelsOneDraw />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Given a prompt p, a reference benchmark y, and a stochastic
                language model operating at temperature T, each generated
                response r is a random draw from the model&apos;s conditional
                distribution.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                An <Term tone="ink">evaluation function f(p, y, r)</Term> maps
                each generated response to a quantitative behavioral outcome,
                such as the dollar price quoted or an indicator of whether a
                sponsored product was chosen.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                The true behavioral parameter of interest is the{" "}
                <Term tone="ink">expected value of f(p, y, r)</Term> over the
                model&apos;s response distribution, alongside its variance
                across repeated draws.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Because different models and tasks exhibit widely different
                levels of response entropy, comparing two models on a single
                draw{" "}
                <Term tone="signal">
                  confounds true behavioral differences with random sampling
                  noise
                </Term>
                .
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          06. The Monte-Carlo Estimator and Its Statistical Guarantees [no-exercise]
          ================================================================ */}
      <Slide id="the-monte-carlo-estimator-and-its-statistical-guarantees" border className="!py-8">
        <SlideHeading>The Monte-Carlo Estimator and Its Statistical Guarantees</SlideHeading>
        <Lead className="!max-w-none">
          The <Term tone="ink">Monte-Carlo estimator</Term> computes the sample
          mean of the evaluation function across K independent and identically
          distributed responses drawn from the model for the same prompt
          condition (Wadi &amp; Fredette, 2025).
        </Lead>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="grid gap-4">
            <li className="min-w-0">
              <Ruled weight="thin">
                <P>
                  By Theorem 1 of the framework, this sample mean is an{" "}
                  <Term tone="ink">unbiased estimator</Term> of the model&apos;s
                  true expected behavior under that prompt condition.
                </P>
              </Ruled>
            </li>
            <li className="min-w-0">
              <Ruled weight="thin">
                <P>
                  By Theorem 2, the variance of the estimator{" "}
                  <Term tone="signal">decays in inverse proportion to the sample size K</Term>,
                  converging to zero as K grows large.
                </P>
              </Ruled>
            </li>
            <li className="min-w-0">
              <Ruled weight="thin">
                <P>
                  By the central limit theorem corollary, the sampling
                  distribution of the estimator converges to a normal
                  distribution with standard error equal to the response
                  standard deviation divided by the square root of K, enabling
                  exact confidence intervals and hypothesis tests.
                </P>
              </Ruled>
            </li>
          </ol>
          <Plate>
            <EstimatorConverges />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          07. Behavioral Validity Metrics: CSVR, APD, and Coefficient of Variation [exercise]
          ================================================================ */}
      <Slide
        id="behavioral-validity-metrics-csvr-apd-and-coefficient-of-variation"
        border
        className="!py-8"
        exercise={exercise["behavioral-validity-metrics-csvr-apd-and-coefficient-of-variation"]}
      >
        <SlideHeading>Behavioral Validity Metrics: CSVR, APD, and Coefficient of Variation</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Common Sense Validity Rate (CSVR)</Term>{" "}
                  measures task adherence and plausibility: the proportion of
                  sampled responses that fall within the empirically valid
                  range for the product category, filtering out hallucinations
                  and formatting failures.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Absolute Price Deviation (APD)</Term>{" "}
                  measures estimation error: the absolute difference between
                  the model&apos;s stated willingness to pay and the
                  product&apos;s actual market list price.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Coefficient of Variation (CV)</Term>, defined
                  as the standard deviation of the sampled responses divided by
                  their mean, measures within-model behavioral instability
                  across repeated runs of the identical prompt.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mx-auto mt-4 max-w-[980px]">
          <ValidityMetrics />
        </Plate>
        <Ruled weight="thin" className="mt-4">
          <P className="!max-w-none">
            A model is suitable for autonomous commercial deployment only when
            it{" "}
            <Term tone="signal">simultaneously</Term> achieves a high validity
            rate, a low deviation from normative benchmarks, and a low
            coefficient of variation.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          08. Anchoring Bias and Generational Regression in LLMs [no-exercise]
          ================================================================ */}
      <Slide id="anchoring-bias-and-generational-regression-in-llms" border className="!py-8">
        <SlideHeading>Anchoring Bias and Generational Regression in LLMs</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Applying the Monte-Carlo framework (K = 100 samples per condition
              across 16 models and 6 product categories) to Ariely, Loewenstein,
              and Prelec&apos;s (2003) anchoring paradigm reveals that language
              models are strongly susceptible to arbitrary numerical anchors
              (Wadi &amp; Fredette, 2025).
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Exposing models to a high arbitrary anchor raised mean willingness
              to pay by 31.62 dollars, whereas a low anchor reduced it by 15.70
              dollars, with a mean anchor-response correlation of 0.697 that
              exceeded the human benchmark of 0.388.
            </P>
          </Ruled>
        </div>
        <Plate className="mx-auto mt-4 max-w-[940px]">
          <AnchoringFindings />
        </Plate>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Crucially, a three-way interaction among parameter count, model
              generation, and anchoring condition demonstrated a{" "}
              <Term tone="signal">generational performance regression</Term>:
              newer and larger models exhibited larger pricing deviations and
              greater susceptibility to anchoring than earlier generations from
              the same providers.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Governance teams therefore cannot assume that upgrading to a newer
              or larger foundation model will reduce cognitive biases in
              commercial decision tasks.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          09. Part 2: Exact Token-Level Probability Distributions for Rating Scales [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Exact Token-Level Probability Distributions for Rating Scales" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <LikertLogprobs />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                While Monte-Carlo sampling is necessary for multi-token
                open-ended outputs, many behavioral and fairness audits
                administer structured psychometric instruments, such as 1-to-7
                Likert scales or discrete choice options.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                When the response is a single ordinal token and the model&apos;s
                next-token probabilities (logprobs) are accessible, text
                sampling is unnecessary and introduces{" "}
                <Term tone="signal">avoidable epistemic sampling error</Term>{" "}
                (Wadi, Ghodrat, &amp; Philp, 2026).
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          10. Why Text Sampling Is Redundant When Token Probabilities Are Observable [no-exercise]
          ================================================================ */}
      <Slide id="why-text-sampling-is-redundant-when-token-probabilities-are-observable" border className="!py-8">
        <SlideHeading>Why Text Sampling Is Redundant When Token Probabilities Are Observable</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                In human behavioral research, scientists draw random samples of
                respondents because the true probability distribution of
                attitudes inside a human population cannot be observed
                directly.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A language model, by contrast, computes an{" "}
                <Term tone="ink">exact deterministic conditional probability mass function (PMF)</Term>{" "}
                over its entire vocabulary before any token is sampled.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Generating text completions from a Likert prompt simply draws
                random samples from a discrete distribution that the model has
                already computed exactly.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Reading the token-level PMF directly{" "}
                <Term tone="signal">eliminates epistemic sampling error</Term>,
                requires only a single forward pass per item rather than dozens
                of sampled completions, and captures the exact aleatoric
                uncertainty of the model&apos;s internal state (Wadi, Ghodrat,
                &amp; Philp, 2026).
              </P>
            </Ruled>
          </div>
          <Plate>
            <SampleVsRead />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          11. Why Shannon Entropy Fails on Ordinal Rating Scales [exercise]
          ================================================================ */}
      <Slide
        id="why-shannon-entropy-fails-on-ordinal-rating-scales"
        border
        className="!py-8"
        exercise={exercise["why-shannon-entropy-fails-on-ordinal-rating-scales"]}
      >
        <SlideHeading>Why Shannon Entropy Fails on Ordinal Rating Scales</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <EntropyVsConsensus />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Standard machine learning evaluations use{" "}
                <Term tone="ink">Shannon entropy</Term> to measure uncertainty
                across a model&apos;s predicted token probabilities.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Shannon entropy treats all tokens as unordered nominal
                categories, meaning it is{" "}
                <Term tone="signal">invariant to the numerical distance</Term>{" "}
                between scale points.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Under Shannon entropy, a model that splits its probability mass
                equally between 1 (Strongly Disagree) and 7 (Strongly Agree) has
                the exact same entropy as a model that splits its mass equally
                between 3 (Somewhat Disagree) and 4 (Neutral).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Yet those two distributions represent opposite behavioral
                states: the first model is maximally polarized at the extremes
                of the scale, whereas the second holds a concentrated, moderate
                attitude.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          12. The Three-Layer Exact-PMF Pipeline: Constraint, Consensus, and Construct [exercise]
          ================================================================ */}
      <Slide
        id="the-three-layer-exact-pmf-pipeline-constraint-consensus-and-construct"
        border
        className="!py-8"
        exercise={exercise["the-three-layer-exact-pmf-pipeline-constraint-consensus-and-construct"]}
      >
        <SlideHeading>The Three-Layer Exact-PMF Pipeline: Constraint, Consensus, and Construct</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  Layer 1 is the <Term tone="ink">Constraint layer</Term>, which
                  sums the raw probability mass assigned to valid scale tokens
                  (such as the digits 1 through 7), defines the complement as
                  the model&apos;s task failure rate, and renormalizes the valid
                  probabilities into an exact ordinal item PMF (Wadi, Ghodrat,
                  &amp; Philp, 2026).
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  Layer 2 is the <Term tone="ink">Consensus layer</Term>, which
                  computes a multivariate ordinal consensus metric (extending
                  Tastle &amp; Wierman, 2007) that penalizes probability spread
                  in proportion to Euclidean distance on the ordinal scale,
                  distinguishing concentrated agreement from extreme
                  polarization.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled weight="thin">
                <P>
                  Layer 3 is the <Term tone="ink">Construct layer</Term>, which
                  combines item-level PMFs into a composite multi-item scale
                  distribution and decomposes variance across experimental
                  factors using distributional analysis of variance.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mx-auto mt-4 max-w-[960px]">
          <ThreeLayerExploded />
        </Plate>
        <Ruled weight="thin" className="mt-4">
          <P className="!max-w-none">
            Together, the three layers ensure that an auditor{" "}
            <Term tone="signal">never interprets a model&apos;s attitudinal score</Term>{" "}
            without first verifying that the model adhered to the scale
            constraints and formed a coherent ordinal position.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          13. Discussion: Sampling Versus Exact Probabilities
          ================================================================ */}
      <Slide id="discussion-sampling-versus-exact-probabilities" border className="!py-8">
        <SlideHeading>Sampling Versus Exact Probabilities</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            An enterprise governance team wants to audit two candidate models
            across 500 customer fairness scenarios. Model A is hosted on an
            internal server that exposes full next-token log-probabilities,
            while Model B is accessed through a commercial chat interface that
            returns only sampled text completions. How should the team design
            the evaluation protocol for each model, and what trade-offs in cost,
            precision, and construct coverage arise between the two approaches?
          </Prompt>
          <Plate>
            <TwoInterfaces />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          14. Part 3: Distributional ANOVA and Hoeffding Decomposition [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Distributional ANOVA and Hoeffding Decomposition" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Psychometric constructs such as ethnocentrism, brand trust, or
              algorithm aversion are measured with{" "}
              <Term tone="ink">multi-item scales</Term> rather than single
              questions, because single items are noisy and narrow.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              To preserve the full uncertainty of the model across all K items
              of a scale, the Construct layer replaces arithmetic averaging of
              sampled numbers with{" "}
              <Term tone="signal">exact probability convolution</Term> and
              orthogonal factor decomposition (Wadi, Ghodrat, &amp; Philp,
              2026).
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <ItemStack />
        </Plate>
      </Slide>

      {/* ================================================================
          15. Convolving Item Distributions Into a Composite Construct Score [no-exercise]
          ================================================================ */}
      <Slide id="convolving-item-distributions-into-a-composite-construct-score" border className="!py-8">
        <SlideHeading>Convolving Item Distributions Into a Composite Construct Score</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Because each item k in a scale is administered in an isolated
                context window under experimental condition lambda, the item
                responses are{" "}
                <Term tone="ink">conditionally independent</Term> given the
                condition.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                By probability theory, the exact probability mass function of
                the sum of K independent discrete random variables is given by
                the <Term tone="ink">discrete convolution</Term> of their
                individual item PMFs.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Convolving the K item PMFs produces the exact probability
                distribution of the composite scale score{" "}
                <Term tone="signal">without collapsing item-level uncertainty into a single mean</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                This composite distribution propagates all token-level aleatoric
                uncertainty forward into the factor-level comparisons.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ConvolutionBuild />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          16. Hoeffding Decomposition of Main Effects and Interactions [no-exercise]
          ================================================================ */}
      <Slide id="hoeffding-decomposition-of-main-effects-and-interactions" border className="!py-8">
        <SlideHeading>Hoeffding Decomposition of Main Effects and Interactions</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <HoeffdingStack />
          </Plate>
          <div className="grid gap-5">
            <Ruled>
              <P>
                In a fully crossed factorial experiment, the composite construct
                score depends on multiple factors, such as the model tested, the
                target demographic or country, and the framing of the
                instruction.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Using <Term tone="ink">Hoeffding decomposition</Term>, the
                composite score distribution is decomposed into an overall grand
                mean, isolated main effects for each factor, and two-way or
                higher-order interaction effects (Wadi, Ghodrat, &amp; Philp,
                2026).
              </P>
            </Ruled>
            <Ruled>
              <P>
                Theorem 1 of the exact-PMF framework proves that the expected
                values of these decomposed random variables equal the classical
                fixed-effect parameters of traditional human Analysis of
                Variance (ANOVA), while{" "}
                <Term tone="signal">retaining the full probability distribution of each effect</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          17. Four Distributional Inference Metrics: Mean Shift, Dispersion, dPD, and SNR [exercise]
          ================================================================ */}
      <Slide
        id="four-distributional-inference-metrics-mean-shift-dispersion-dpd-and-snr"
        border
        className="!py-8"
        exercise={exercise["four-distributional-inference-metrics-mean-shift-dispersion-dpd-and-snr"]}
      >
        <SlideHeading>Four Distributional Inference Metrics: Mean Shift, Dispersion, dPD, and SNR</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Expected Effect Size (Mean Shift)</Term> is
                  the expected value of the decomposed effect distribution,
                  quantifying the exact magnitude and direction by which a
                  factor level or interaction shifts the composite scale score.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Predictive Dispersion (SD)</Term> is the
                  standard deviation of the effect distribution, capturing the
                  model&apos;s intrinsic aleatoric uncertainty around that
                  shift.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Discrete Probability of Direction (dPD)</Term>{" "}
                  is the total probability mass of the effect distribution that
                  lies strictly on the dominant side of zero (plus half the mass
                  at zero), measuring the certainty of the effect&apos;s sign on
                  a scale from 0.50 to 1.00.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Signal-to-Noise Ratio (SNR)</Term>, defined as
                  the absolute mean shift divided by predictive dispersion,
                  measures whether the systematic shift exceeds the model&apos;s
                  internal probabilistic noise.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-4">
          <EffectInstrument />
        </Plate>
      </Slide>

      {/* ================================================================
          18. Part 4: Designing Controlled Factorial Choice and Rating Experiments [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Designing Controlled Factorial Choice and Rating Experiments" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Statement className="!max-w-none !text-[clamp(1.3rem,2.1vw,1.8rem)]">
              Statistical sophistication in the analysis stage{" "}
              <span className="text-[var(--signal)]">
                cannot rescue a confounded experimental design
              </span>
              .
            </Statement>
            <Ruled>
              <p className={BIG}>
                Whether an audit uses Monte-Carlo sampling or exact token PMFs,
                isolating the cause of an algorithmic bias requires{" "}
                <Term tone="ink">controlled factorial experimentation</Term>.
              </p>
            </Ruled>
          </div>
          <Plate>
            <WeldedLevers />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          19. Why Isolated Vignettes Cannot Isolate Causes [no-exercise]
          ================================================================ */}
      <Slide id="why-isolated-vignettes-cannot-isolate-causes" border className="!py-8">
        <SlideHeading>Why Isolated Vignettes Cannot Isolate Causes</SlideHeading>
        <Lead className="!max-w-none">
          Many published AI evaluations test bias using a small set of
          handwritten story vignettes that vary several attributes at once, such
          as comparing a software engineer named John in Boston with a nurse
          named Maria in Miami.
        </Lead>
        <Plate className="mt-5">
          <ConfoundedVignettes />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              When a model responds differently to those two vignettes, the
              auditor{" "}
              <Term tone="signal">cannot determine whether the difference was caused</Term>{" "}
              by gender, ethnicity, occupation, city, or their interaction.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              In consumer and market audits, similarly, testing real brand names
              in uncrossed scenarios confounds country of origin with brand
              equity, price tier, and historical market share.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          20. Fully Crossed Factorial Designs and Context Isolation [no-exercise]
          ================================================================ */}
      <Slide id="fully-crossed-factorial-designs-and-context-isolation" border className="!py-8">
        <SlideHeading>Fully Crossed Factorial Designs and Context Isolation</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <CrossedGrid />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                A <Term tone="ink">fully crossed factorial design</Term>{" "}
                specifies two or more independent factors, each with defined
                levels, and tests every possible combination of factor levels
                across the design grid.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Orthogonality across factors guarantees that the main effect of
                each factor and every interaction effect can be estimated
                independently of all other manipulated variables.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Unlike human participants, who remember previous questions and
                suffer from fatigue, boredom, and within-subject carryover
                effects, language models are{" "}
                <Term tone="ink">stateless across separate API calls</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Context isolation</Term> exploits this
                statelessness by{" "}
                <Term tone="signal">resetting the context window before every single item and condition</Term>,
                eliminating carryover contamination across experimental trials.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          21. Controlling Prompt Sensitivity, Order Effects, and Framing [exercise]
          ================================================================ */}
      <Slide
        id="controlling-prompt-sensitivity-order-effects-and-framing"
        border
        className="!py-8"
        exercise={exercise["controlling-prompt-sensitivity-order-effects-and-framing"]}
      >
        <SlideHeading>Controlling Prompt Sensitivity, Order Effects, and Framing</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          <li className="min-w-0">
            <Numbered n={1} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Prompt template counterbalancing</Term> tests
                  each experimental condition across multiple semantically
                  equivalent phrasings and instruction templates to verify that
                  findings are not artifacts of a single wording.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <FourControls kind="template" />
              </Plate>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Scale direction and polarity counterbalancing</Term>{" "}
                  includes both positively worded and reverse-coded scale items,
                  or reverses option presentation order, to separate substantive
                  attitude from acquiescence or first-option bias.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <FourControls kind="polarity" />
              </Plate>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Position randomization</Term> shuffles the
                  order of product listings and attribute rows across
                  experimental sessions so that list-position bias does not
                  confound attribute weight estimates.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <FourControls kind="position" />
              </Plate>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4} className="flex h-full flex-col">
              <Ruled weight="thin" className="mb-3">
                <P>
                  <Term tone="ink">Attribute matching</Term> holds all
                  non-manipulated product attributes, such as price, warranty,
                  and star rating, constant across conditions so that any change
                  in choice probability is attributable solely to the
                  manipulated factor.
                </P>
              </Ruled>
              <Plate className="mt-auto !p-2">
                <FourControls kind="matching" />
              </Plate>
            </Numbered>
          </li>
        </ol>
      </Slide>

      {/* ================================================================
          22. Part 5: Enterprise Pre-Deployment and Post-Deployment Auditing Workflows [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Enterprise Pre-Deployment and Post-Deployment Auditing Workflows" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              In an enterprise governance system, behavioral auditing is not a
              one-time academic exercise. It is a{" "}
              <Term tone="signal">recurring gate in the model lifecycle</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Organizations distinguish exploratory red-teaming from systematic
              behavioral auditing and maintain{" "}
              <Term tone="ink">continuous monitoring after launch</Term>.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <LifecycleGates />
        </Plate>
      </Slide>

      {/* ================================================================
          23. Pre-Deployment Red-Teaming Versus Behavioral Auditing [exercise]
          ================================================================ */}
      <Slide
        id="pre-deployment-red-teaming-versus-behavioral-auditing"
        border
        className="!py-8"
        exercise={exercise["pre-deployment-red-teaming-versus-behavioral-auditing"]}
      >
        <SlideHeading>Pre-Deployment Red-Teaming Versus Behavioral Auditing</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term tone="ink">Adversarial red-teaming</Term> is an
                exploratory stress test in which human specialists or automated
                attacker models probe a system with extreme, jailbreak, or
                edge-case inputs to discover worst-case safety failures.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <ProbeVsGrid kind="probe" />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term tone="ink">Behavioral auditing</Term> is a systematic,
                statistically powered evaluation across a representative
                factorial grid that measures average bias, variance, task
                adherence, and effect sizes under normal commercial operating
                conditions.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <ProbeVsGrid kind="grid" />
            </Plate>
          </div>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Red-teaming establishes whether a system can be broken by a
              determined adversary (existence of a vulnerability), whereas
              behavioral auditing establishes how the system treats customer
              segments across thousands of routine interactions (distribution
              of market behavior).
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Responsible release sign-off{" "}
              <Term tone="signal">requires both</Term>: red-teaming to bound
              catastrophic tail risks, and behavioral auditing to certify
              fairness and decision reliability.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          24. Six Steps of an Enterprise Behavioral Audit [exercise]
          ================================================================ */}
      <Slide
        id="six-steps-of-an-enterprise-behavioral-audit"
        border
        className="!py-8"
        exercise={exercise["six-steps-of-an-enterprise-behavioral-audit"]}
      >
        <SlideHeading>Six Steps of an Enterprise Behavioral Audit</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-12">
          <ol className="grid w-full gap-x-6 gap-y-3 md:grid-cols-2">
            {[
              "Step 1 is defining the target construct, the decision context, and the normative governance threshold, such as zero sponsorship penalty divergence or parity across demographic profiles.",
              "Step 2 is constructing the fully crossed factorial design grid, specifying the focal factors (such as demographic cues, anchors, or role assignments) and nuisance factors to counterbalance.",
              "Step 3 is selecting the measurement protocol: exact token-level PMFs for single-token ordinal scales and discrete choices, or Monte-Carlo sampling with sample size K chosen to achieve the required confidence interval width for open-ended outputs.",
              "Step 4 is executing the trials under strict context isolation, recording model version identifiers, sampling parameters, and system prompts.",
              "Step 5 is evaluating the constraint and validity layer first (CSVR or token failure rate) and computing ordinal consensus or response CV before interpreting main effects and interactions.",
              "Step 6 is comparing effect sizes, dPD, and SNR against governance release gates, documenting failures in the model dossier, and re-testing after mitigation.",
            ].map((step, i) => (
              <li key={i} className="min-w-0">
                <Ruled weight="thin" className="!pt-2.5">
                  <P className="!max-w-none">{step}</P>
                </Ruled>
              </li>
            ))}
          </ol>
          <Plate>
            <AuditDossier />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          25. Continuous Post-Deployment Drift Monitoring and Version Pinning [no-exercise]
          ================================================================ */}
      <Slide id="continuous-post-deployment-drift-monitoring-and-version-pinning" border className="!py-8">
        <SlideHeading>Continuous Post-Deployment Drift Monitoring and Version Pinning</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.25rem,1.9vw,1.65rem)]">
          A behavioral audit certifies{" "}
          <span className="text-[var(--signal)]">only the exact combination</span>{" "}
          of model checkpoint, tokenizer, system prompt, and retrieval pipeline
          that was tested.
        </Statement>
        <Plate className="mt-5">
          <PinnedVsLatest />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Because foundation model providers frequently update hosted
              weights, safety filters, or quantization settings behind API
              endpoints, and because newer model generations can regress on
              behavioral stability (Wadi &amp; Fredette, 2025), enterprise
              deployments <Term tone="ink">pin exact model version snapshots</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Whenever a provider deprecates a snapshot, or when the deploying
              firm edits its system prompt or product catalog schema, the
              automated behavioral audit suite must run again before the update
              reaches production traffic.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          26. Discussion: The Model Upgrade Regression
          ================================================================ */}
      <Slide id="discussion-the-model-upgrade-regression" border className="!py-8">
        <SlideHeading>The Model Upgrade Regression</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            An e-commerce platform&apos;s engineering team proposes upgrading its
            customer-facing price-comparison assistant from last year&apos;s
            30-billion-parameter model to a newly released 70-billion-parameter
            model that scores 14 points higher on standard coding and reasoning
            leaderboards. Before approving the switch, what behavioral audit
            evidence should the governance board require, why might the newer
            model perform worse on the platform&apos;s pricing task, and how
            should the release gate be structured?
          </Prompt>
          <Plate>
            <UpgradeGate />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          27. Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Single-prompt (pass-at-one) evaluations fail as a governance standard because stochastic language models exhibit high response entropy and framing sensitivity.",
            "For open-ended numerical and text decisions, the Monte-Carlo framework (Wadi & Fredette, 2025) provides an unbiased estimator whose variance decays as 1/K and whose asymptotic normality enables exact confidence intervals.",
            "Behavioral validity requires checking Common Sense Validity Rate (CSVR), Absolute Price Deviation (APD), and Coefficient of Variation (CV). Empirical audits show that LLMs suffer strong anchoring bias and can regress across newer model generations.",
            "For structured Likert scales and discrete choices with accessible log-probabilities, reading the exact token-level PMF eliminates sampling error entirely (Wadi, Ghodrat, & Philp, 2026).",
            "Because Shannon entropy ignores ordinal scale distances, exact-PMF audits use a three-layer pipeline: Constraint (task failure rate), Consensus (distance-weighted ordinal agreement), and Construct (discrete convolution and Hoeffding ANOVA decomposition).",
            "Controlled factorial experiments exploit LLM statelessness for context isolation and counterbalance prompt phrasing, scale polarity, and list position.",
            "Enterprise governance combines exploratory red-teaming with systematic behavioral audits and re-runs the audit suite whenever model weights, prompts, or interfaces change.",
          ].map((takeaway, i) => (
            <li
              key={i}
              className={i === 6 ? "min-w-0 md:col-span-2 lg:col-span-3" : "min-w-0"}
            >
              <Numbered n={i + 1}>
                <Ruled weight="thin">
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
