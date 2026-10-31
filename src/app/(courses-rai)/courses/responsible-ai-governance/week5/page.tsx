"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Statement, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  BuriedDisclosure,
  CodedProtocols,
  CounterfactualPlane,
  CoveredCue,
  GlobalLocal,
  IceCurves,
  LevelBalance,
  LimeFit,
  OpaqueDecisions,
  ReadableModels,
  RecourseBurden,
  RecourseLevers,
  ShapleyOrders,
  ShuffleColumn,
  SurrogateGap,
} from "./visuals";

// ============================================================================
// WEEK 5: TRANSPARENCY, EXPLAINABILITY, AND REASONING TRACES
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week5Page() {
  return (
    <SlideDeck label="Week 5">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 5: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">Transparency, Explainability, and Reasoning Traces</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[52ch] !text-[clamp(1.25rem,2vw,1.7rem)]">
          Governing opaque algorithms requires distinguishing intrinsic
          interpretability from post-hoc approximations, testing whether
          language-model reasoning traces are{" "}
          faithful to actual choices,
          and matching explanations to the decisions stakeholders must make.
        </p>
      </Slide>

      {/* ================================================================
          Why Opacity Is a Governance Problem [no-exercise]
          ================================================================ */}
      <Slide id="why-opacity-is-a-governance-problem" border className="!py-8">
        <SlideHeading>Why Opacity Is a Governance Problem</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled>
              <P>
                Modern marketing and financial pipelines rely on gradient-boosted
                ensembles, deep neural networks, and billion-parameter language
                models whose internal computations cannot be inspected by reading
                a short formula.
              </P>
            </Ruled>
            <Ruled>
              <P>
                When an opaque model denies a loan, raises an insurance premium,
                or excludes a supplier from a procurement shortlist, neither the
                customer nor the manager can immediately see{" "}
                <Term>which variables drove the outcome</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <OpaqueDecisions />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Opacity undermines three pillars of algorithmic governance:
              internal debugging of spurious correlations, regulatory
              verification of non-discrimination compliance, and a
              consumer&apos;s ability to contest an erroneous decision.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Yet not every stakeholder needs the same form of visibility. An
              explanation that helps a machine learning engineer diagnose
              overfitting is rarely useful to a rejected credit applicant.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Transparency Versus Explainability Versus Interpretability [exercise]
          ================================================================ */}
      <Slide
        id="transparency-versus-explainability-versus-interpretability"
        border
        className="!py-8"
        exercise={exercise["transparency-versus-explainability-versus-interpretability"]}
      >
        <SlideHeading>Transparency Versus Explainability Versus Interpretability</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled>
                <p className={BIG}>
                  <Term>Process transparency</Term> concerns
                  institutional and procedural openness: disclosing that an
                  automated system is in use, documenting its training data
                  provenance, and publishing its governance and auditing
                  standards.
                </p>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled>
                <p className={BIG}>
                  <Term>Intrinsic interpretability</Term> is a
                  property of a model whose mathematical structure is simple and
                  constrained enough that a human can directly trace how input
                  features combine to produce a prediction.
                </p>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled>
                <p className={BIG}>
                  <Term>Post-hoc explainability</Term> is the use of
                  a secondary mathematical procedure or surrogate model to
                  approximate and summarize why a complex black-box model
                  produced its outputs after the fact.
                </p>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <div className="mt-6 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              A firm can provide{" "}
              <Term>high process transparency while deploying a black-box model</Term>,
              or use post-hoc explainability tools on an opaque model without
              making the underlying model intrinsically interpretable.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Intrinsic Interpretability Versus Black-Box Complexity [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Intrinsic Interpretability Versus Black-Box Complexity" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                A widespread assumption in commercial data science is that
                predictive accuracy always requires complex black-box
                architectures, leaving post-hoc explanation as the only path to
                accountability.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                On structured tabular business data, however, constrained
                interpretable models{" "}
                <Term>frequently match the out-of-sample accuracy</Term>{" "}
                of black-box ensembles when features are carefully engineered
                (Rudin, 2019).
              </p>
            </Ruled>
          </div>
          <Plate>
            <LevelBalance />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Intrinsically Interpretable Models [no-exercise]
          ================================================================ */}
      <Slide id="intrinsically-interpretable-models-linear-models-generalized-additive-models-and-rule-lists" border className="!py-8">
        <SlideHeading className="[&_h2]:!max-w-none">Intrinsically Interpretable Models: Linear Models, Generalized Additive Models, and Rule Lists</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <li className="min-w-0">
            <Ruled>
              <P>
                Sparse linear and logistic regression models assign a single
                weight to each input variable, allowing an analyst to read the
                exact direction and magnitude of each feature&apos;s contribution
                directly from the coefficients.
              </P>
            </Ruled>
          </li>
          <li className="min-w-0">
            <Ruled>
              <P>
                Generalized additive models (GAMs) extend linear models by
                fitting a smooth, nonlinear shape function for each individual
                feature while keeping the features additive, so that each
                variable&apos;s exact response curve can be plotted and inspected
                in isolation.
              </P>
            </Ruled>
          </li>
          <li className="min-w-0">
            <Ruled>
              <P>
                Shallow decision trees and falling rule lists express
                predictions as a short sequence of if-then conditions, such as
                flagging an account if transaction velocity exceeds three per
                hour and account age is under seven days.
              </P>
            </Ruled>
          </li>
        </ol>
        <Plate className="mx-auto mt-4 max-w-[900px]">
          <ReadableModels />
        </Plate>
        <Ruled className="mt-4">
          <P className="!max-w-none">
            In each of these architectures,{" "}
            <Term>the explanation is the model itself</Term>: there
            is zero discrepancy between how the model computes the decision and
            how the explanation describes it.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Black-Box Models [no-exercise]
          ================================================================ */}
      <Slide id="black-box-models-ensembles-deep-neural-networks-and-foundation-models" border className="!py-8">
        <SlideHeading>Black-Box Models: Ensembles, Deep Neural Networks, and Foundation Models</SlideHeading>
        <div className="w-full">
          <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
            <Ruled>
              <p className={BIG}>
                Random forests and gradient-boosted trees combine hundreds of
                deep trees whose high-order feature interactions cannot be
                summarized by a single rule list or additive curve.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Deep neural networks and transformer foundation models
                distribute representations across millions or billions of
                continuous parameters and attention heads.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Black-box architectures provide genuine performance advantages
                primarily on unstructured data, such as raw text, speech, images,
                and multi-turn conversational interactions, where raw inputs must
                be mapped into latent representations.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Even when a model&apos;s source code and weights are publicly
                released, its high-dimensional parameter space{" "}
                <Term>remains functionally opaque</Term> to human
                inspection without analytical tools.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          When High-Stakes Decisions Should Use Interpretable Models [exercise]
          ================================================================ */}
      <Slide
        id="when-high-stakes-decisions-should-use-interpretable-models"
        border
        className="!py-8"
        exercise={exercise["when-high-stakes-decisions-should-use-interpretable-models"]}
      >
        <SlideHeading>When High-Stakes Decisions Should Use Interpretable Models</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          As Rudin (2019) argues, post-hoc explanations of black-box models are
          necessarily approximations: if a post-hoc explanation were{" "}
          completely faithful to
          the black box in every case, the black box would not be needed.
        </Statement>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <SurrogateGap />
          </Plate>
          <div className="grid gap-4">
            <Ruled>
              <P>
                In high-stakes tabular domains such as consumer credit
                underwriting, medical risk scoring, and criminal justice, relying
                on a black box plus an approximate post-hoc explanation risks
                hiding critical edge-case failures.
              </P>
            </Ruled>
            <Ruled>
              <P>
                When structured tabular features already capture the domain
                signal and errors carry severe legal or human consequences,
                governance frameworks favor{" "}
                <Term>intrinsically interpretable models with monotonicity constraints</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Complex black-box models are reserved for unstructured perception
                and language tasks, or for lower-stakes ranking tasks where the
                accuracy gain is verified to outweigh the loss of exact
                interpretability.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Post-Hoc Feature Attribution Methods [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Post-Hoc Feature Attribution Methods" />
        <div className="mt-8 w-full">
          <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
            <Ruled>
              <p className={BIG}>
                When an organization deploys an ensemble or neural network,
                auditors and data scientists use post-hoc attribution methods to
                quantify how features influence the model&apos;s predictions.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Post-hoc methods are divided by scope into{" "}
                <Term>global explanations</Term> of the model as a
                whole and <Term>local explanations</Term> of a single
                prediction for one individual.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Global Versus Local Explanations [no-exercise]
          ================================================================ */}
      <Slide id="global-versus-local-explanations" border className="!py-8">
        <SlideHeading>Global Versus Local Explanations</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                A <Term>global explanation</Term> summarizes how a
                model behaves across the entire population of customers,
                identifying which features carry the greatest overall weight and
                how predictions shift on average as a feature changes.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Global explanations are used by model developers, risk
                committees, and regulators to audit whether a model relies on
                sensible domain predictors or suspect demographic proxies.
              </P>
            </Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                A <Term>local explanation</Term> accounts for why the
                model produced a specific prediction for one individual customer,
                such as why Applicant 4082 received a default probability of 0.42.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Local explanations are used by customer service
                representatives, loan officers, and affected consumers who need
                to understand or challenge an individual decision.
              </P>
            </Ruled>
          </div>
        </div>
        <Plate className="mt-5">
          <GlobalLocal />
        </Plate>
      </Slide>

      {/* ================================================================
          Permutation Feature Importance and Partial Dependence [no-exercise]
          ================================================================ */}
      <Slide id="permutation-feature-importance-and-partial-dependence" border className="!py-8">
        <SlideHeading>Permutation Feature Importance and Partial Dependence</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>Permutation feature importance</Term> is a
                global method that measures how much the model&apos;s holdout
                error increases when the values of a single feature are randomly
                shuffled across observations, breaking the link between that
                feature and the outcome.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <ShuffleColumn />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>Partial dependence plots (PDPs)</Term> show the
                marginal effect of one or two features on the predicted outcome
                by averaging the model&apos;s predictions over the empirical
                distribution of all other features.
              </P>
            </Ruled>
            <Ruled className="mb-3">
              <P>
                <Term>Individual conditional expectation (ICE) curves</Term>{" "}
                disaggregate a partial dependence plot by drawing one curve per
                observation, revealing whether a feature&apos;s effect is uniform
                across customers or varies through interactions.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <IceCurves />
            </Plate>
          </div>
        </div>
        <Ruled className="mt-4">
          <P className="!max-w-none">
            Both permutation importance and partial dependence plots can produce{" "}
            <Term>misleading artifacts when input features are strongly correlated</Term>,
            because shuffling or varying one feature independently creates
            unrealistic combinations of customer attributes.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Local Surrogates and Game-Theoretic Attributions: LIME and SHAP [no-exercise]
          ================================================================ */}
      <Slide id="local-surrogates-and-game-theoretic-attributions-lime-and-shap" border className="!py-8">
        <SlideHeading>Local Surrogates and Game-Theoretic Attributions: LIME and SHAP</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>Local Interpretable Model-agnostic Explanations (LIME)</Term>{" "}
                approximates a black-box model around a single customer&apos;s
                profile by perturbing that profile, querying the black box on the
                perturbed points, and fitting a simple weighted linear model
                locally (Ribeiro, Singh, &amp; Guestrin, 2016).
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <LimeFit />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>SHapley Additive exPlanations (SHAP)</Term>{" "}
                draws on cooperative game theory to treat input features as
                players in a coalition and computes each feature&apos;s Shapley
                value: its average marginal contribution to the prediction across
                all possible subsets of features (Lundberg &amp; Lee, 2017).
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <ShapleyOrders />
            </Plate>
          </div>
        </div>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              SHAP satisfies three desirable axiomatic properties that heuristic
              attribution methods lack:{" "}
              <Term>local accuracy</Term> (attributions sum to the
              difference between the individual prediction and the baseline
              mean), missingness, and consistency.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Aggregating absolute SHAP values across a holdout dataset also
              provides a consistent global summary of feature importance
              alongside local case-by-case explanations.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Limitations and Vulnerabilities of Post-Hoc Attributions [exercise]
          ================================================================ */}
      <Slide
        id="limitations-and-vulnerabilities-of-post-hoc-attributions"
        border
        className="!py-6"
        exercise={exercise["limitations-and-vulnerabilities-of-post-hoc-attributions"]}
      >
        <SlideHeading className="!mb-4 [&_h2]:!max-w-none">Limitations and Vulnerabilities of Post-Hoc Attributions</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-3 md:grid-cols-2">
          <li className="min-w-0">
            <div className="flex h-full flex-col">
              <Ruled className="mb-2 !pt-3">
                <p className={BIG}>
                  Feature attributions describe how the model uses its inputs,
                  not the causal effect of those variables in the real world. A
                  high SHAP value for a proxy variable reflects predictive
                  association inside the model rather than a causal mechanism.
                </p>
              </Ruled>
            </div>
          </li>
          <li className="min-w-0">
            <div className="flex h-full flex-col">
              <Ruled className="mb-2 !pt-3">
                <p className={BIG}>
                  <Term>Instability under perturbation</Term> occurs
                  when small changes in the background reference distribution,
                  neighborhood kernel width, or random seed cause LIME or
                  empirical SHAP estimates to rank different features as the top
                  driver for the same customer.
                </p>
              </Ruled>
            </div>
          </li>
          <li className="min-w-0">
            <div className="flex h-full flex-col">
              <Ruled className="mb-2 !pt-3">
                <p className={BIG}>
                  <Term>Correlated-feature distortion</Term> occurs
                  when marginal attribution procedures evaluate off-manifold
                  combinations of correlated variables, such as pairing a
                  twenty-year credit history with an age of nineteen.
                </p>
              </Ruled>
            </div>
          </li>
          <li className="min-w-0">
            <div className="flex h-full flex-col">
              <Ruled className="mb-2 !pt-3">
                <p className={BIG}>
                  <Term>Adversarial scaffolding</Term>, demonstrated by
                  Slack and colleagues (2020), shows that a malicious or
                  non-compliant developer can wrap a discriminatory model in an
                  out-of-distribution detector that returns fair behavior on
                  synthetic LIME/SHAP perturbations while continuing to
                  discriminate on real customer profiles.
                </p>
              </Ruled>
            </div>
          </li>
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: The Disputed Credit Denial
          ================================================================ */}
      <Slide id="discussion-the-disputed-credit-denial" border className="!py-8">
        <SlideHeading>Discussion: The Disputed Credit Denial</SlideHeading>
        <Discussion
          scenario={"A small-business owner is denied a working-capital line of credit by an automated gradient-boosted model. The bank's customer portal displays the top three negative SHAP values for the application: “Number of recent credit inquiries,” “Postal code commercial density,” and “Average monthly balance volatility.”"}
          question={"Does this display satisfy the governance goals of transparency and contestability for the business owner, and what risks arise if the bank relies solely on SHAP values for regulatory compliance?"}
        />
      </Slide>

      {/* ================================================================
          Part 3: Counterfactual Explanations and Actionable Recourse [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Counterfactual Explanations and Actionable Recourse" />
        <div className="mt-8 w-full">
          <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
            <Ruled>
              <p className={BIG}>
                Knowing which features contributed to an unfavorable score{" "}
                <Term>does not tell a consumer what concrete steps will reverse the decision</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Counterfactual explanations and algorithmic recourse shift the
                focus from internal feature weights to the minimum changes
                required to achieve a favorable outcome.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Counterfactual Explanations: What Would Have Changed the Decision [no-exercise]
          ================================================================ */}
      <Slide id="counterfactual-explanations-what-would-have-changed-the-decision" border className="!py-8">
        <SlideHeading>Counterfactual Explanations: What Would Have Changed the Decision</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-10">
          <div className="grid gap-4">
            <Ruled>
              <P>
                Introduced to algorithmic governance by Wachter, Mittelstadt, and
                Russell (2017), a <Term>counterfactual explanation</Term>{" "}
                states the smallest modification to an individual&apos;s input
                profile that alters the model&apos;s prediction to a desired
                target outcome.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Rather than opening the black box or approximating gradients, a
                counterfactual explanation takes the form: &ldquo;Your loan
                application was denied. If your annual income had been 4,000
                dollars higher or your credit card utilization had been below 30
                percent, your application would have been approved.&rdquo;
              </P>
            </Ruled>
            <Ruled>
              <P>
                Because counterfactual explanations specify an exact point on the
                other side of the model&apos;s decision boundary, they are{" "}
                <Term>fully faithful</Term> to the model&apos;s
                actual decision rule at that boundary point.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Multiple valid counterfactuals typically exist for the same
                individual, requiring an optimization criterion that balances
                proximity to the current profile, sparsity of changed features,
                and plausibility within the data manifold.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CounterfactualPlane />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          From Explanation to Actionable Recourse [exercise]
          ================================================================ */}
      <Slide
        id="from-explanation-to-actionable-recourse"
        border
        className="!py-8"
        exercise={exercise["from-explanation-to-actionable-recourse"]}
      >
        <SlideHeading>From Explanation to Actionable Recourse</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                <Term>Actionable recourse</Term>, formalized by Ustun,
                Spangher, and Liu (2019), requires that a counterfactual
                explanation alter only mutable features that the individual can
                realistically change through their own actions.
              </P>
            </Ruled>
            <Ruled className="mb-3">
              <P>
                Immutable features, such as age, birthplace, or protected
                demographic attributes, and conditionally immutable history, such
                as &ldquo;never having missed a payment five years ago,&rdquo; can
                explain a model&apos;s score but provide{" "}
                <Term>zero actionable recourse</Term>.
              </P>
            </Ruled>
            <Ruled className="mb-3">
              <P>
                Directionally constrained features must only move in feasible
                directions, such as increasing educational attainment or savings
                rather than decreasing years of work experience.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <RecourseLevers />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <P>
                Recourse audits also test whether the cost and difficulty of
                achieving recourse are equal across demographic groups. A model
                that satisfies group prediction parity can still impose a much
                larger recourse burden on one group by placing its rejected
                members farther from the decision boundary.
              </P>
            </Ruled>
            <Plate className="mb-3">
              <RecourseBurden />
            </Plate>
            <Ruled>
              <P>
                Finally, publishing exact decision thresholds creates a strategic
                gaming trade-off (Goodhart&apos;s Law): when applicants
                manipulate easily altered surface proxies to cross the boundary
                without changing their underlying risk, the proxy loses its
                predictive validity.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Reasoning Traces in Large Language Models as Verbal Protocols [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Reasoning Traces in Large Language Models as Verbal Protocols" />
        <div className="mt-8 w-full">
          <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
            <Ruled>
              <p className={BIG}>
                Unlike tabular classifiers that output a numeric score, large
                language models and AI agents can generate natural-language
                reasoning traces, often called chain-of-thought or scratchpad
                logs, before stating a final choice.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                These traces offer a rich qualitative window into agent
                decision-making, but they also introduce a critical governance
                trap if managers{" "}
                <Term>mistake fluent text for a faithful trace</Term>{" "}
                of the model&apos;s internal computation.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Chain-of-Thought and Reasoning Traces as Verbal Protocols [no-exercise]
          ================================================================ */}
      <Slide id="chain-of-thought-and-reasoning-traces-as-verbal-protocols" border className="!py-8">
        <SlideHeading>Chain-of-Thought and Reasoning Traces as Verbal Protocols</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              When prompted to think step by step or trained with reinforcement
              learning on reasoning tokens, a language model outputs an
              intermediate text sequence that lists the attributes it inspects,
              the rules it applies, and the trade-offs it weighs before selecting
              an option.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In consumer and marketing research, human decision processes are
              studied through <Term>think-aloud verbal protocols</Term>,
              in which participants speak their thoughts aloud while shopping and
              researchers code those transcripts with a structured codebook.
            </P>
          </Ruled>
        </div>
        <Plate className="mx-auto mt-4 max-w-[920px]">
          <CodedProtocols />
        </Plate>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              The reasoning traces of AI shopping agents can be analyzed with{" "}
              <Term>the exact same methodology</Term>: researchers
              develop a codebook of decision constructs and use human coders, or
              AI coders validated against human intercoder reliability, to
              classify thousands of agent traces (Wadi &amp; Ma, 2026b, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Coded traces reveal{" "}
              <Term>process-level variables that final choices alone cannot show</Term>,
              such as which product attributes the agent compared, which goal it
              formulated, and whether it noticed a disclosure label.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Plausibility Versus Faithfulness in LLM Explanations [exercise]
          ================================================================ */}
      <Slide
        id="plausibility-versus-faithfulness-in-llm-explanations"
        border
        className="!py-8"
        exercise={exercise["plausibility-versus-faithfulness-in-llm-explanations"]}
      >
        <SlideHeading>Plausibility Versus Faithfulness in LLM Explanations</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              <Term>Plausibility</Term> means that an explanation
              reads as convincing, logical, and satisfying to a human reader.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Faithfulness</Term> means that the explanation
              accurately reflects the true causal factors and internal
              computations that produced the model&apos;s output.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <CoveredCue />
          </Plate>
          <div className="grid gap-4">
            <Ruled>
              <P>
                In autoregressive language models, a reasoning trace is itself a
                sequence of predicted tokens conditioned on the prompt, not a
                diagnostic readout of the neural network&apos;s weights or
                attention activations.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Controlled experiments by Turpin and colleagues (2023)
                demonstrate that language models can be systematically biased by
                covert cues, such as answer ordering or demographic stereotypes,
                while generating{" "}
                <Term>highly plausible chain-of-thought explanations</Term>{" "}
                that rationalize the biased choice using entirely
                neutral-sounding criteria.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Post-hoc rationalization is even more severe when a model is
                asked to explain its choice after outputting the decision, as the
                model simply generates a story consistent with the token it
                already committed to.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Auditing Reasoning Traces Alongside Observed Choices [exercise]
          ================================================================ */}
      <Slide
        id="auditing-reasoning-traces-alongside-observed-choices"
        border
        className="!py-6"
        exercise={exercise["auditing-reasoning-traces-alongside-observed-choices"]}
      >
        <SlideHeading className="!mb-4 [&_h2]:!max-w-none">Auditing Reasoning Traces Alongside Observed Choices</SlideHeading>
        <Ruled>
          <p className={BIG}>
            Because reasoning traces can omit true drivers or rationalize biased
            outputs, behavioral governance{" "}
            <Term>never relies on reasoning traces in isolation</Term>.
            It pairs coded verbal protocols with controlled factorial choice
            experiments.
          </p>
        </Ruled>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <p className={BIG}>
                In audits of resource rationality in AI shopping agents, coding
                the reasoning trace identifies whether the agent explicitly states
                unit-price minimization versus total-price minimization as its
                goal, which precedes how many product details the agent acquires
                and whether it selects the dominated option (Wadi &amp; Ma,
                2026b).
              </p>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled className="mb-3">
              <p className={BIG}>
                In audits of sponsorship disclosure in agentic commerce, coding
                the reasoning trace measures whether the agent expresses explicit
                skepticism toward paid placements when the system prompt assigns
                the platform versus the traveler as the agent&apos;s principal
                (Wadi &amp; Ma, 2026c).
              </p>
            </Ruled>
          </div>
        </div>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <p className={BIG}>
              When a manipulation shifts both the coded reasoning trace (such as
              attenuating stated skepticism toward sponsored listings) and the
              final choice probability in a controlled experiment, the trace
              provides <Term>convergent process-tracing evidence</Term>{" "}
              for the behavioral mechanism.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Conversely, when an agent&apos;s choice shifts across experimental
              conditions while its reasoning trace never mentions the
              manipulated factor, the divergence{" "}
              <Term>exposes unfaithful rationalization and hidden bias</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Designing Disclosures and Documentation for Stakeholders [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Designing Disclosures and Documentation for Stakeholders" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Effective algorithmic governance translates technical
              interpretability, post-hoc attributions, counterfactuals, and
              behavioral audit results into structured documentation{" "}
              <Term>tailored to the audience that must act on them</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Tailoring Explanations to Stakeholder Needs [exercise]
          ================================================================ */}
      <Slide
        id="tailoring-explanations-to-stakeholder-needs"
        border
        className="!py-8"
        exercise={exercise["tailoring-explanations-to-stakeholder-needs"]}
      >
        <SlideHeading>Tailoring Explanations to Stakeholder Needs</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          {(
            [
              [
                "engineer",
                "Machine learning engineers and internal auditors require global feature attributions, ICE curves, activation diagnostics, and full factorial behavioral audit distributions to debug spurious correlations and verify robustness.",
              ],
              [
                "executive",
                "Business executives and product owners require model cards, accuracy-fairness trade-off frontiers, and decision-boundary summaries to authorize deployment and allocate institutional risk.",
              ],
              [
                "regulator",
                "Regulators and external conformity assessors require standardized audit trails, disparate-impact ratios, data provenance sheets, and evidence that high-risk automated decisions comply with statutory transparency mandates.",
              ],
              [
                "consumer",
                "Affected consumers and end users require clear notice that an automated system is in use, plain-language reasons for adverse decisions, and feasible, actionable counterfactual recourse.",
              ],
            ] as const
          ).map(([kind, text], i) => (
            <li key={kind} className="min-w-0">
              <Numbered n={i + 1} className="flex h-full flex-col">
                <Ruled className="mb-3">
                  <p className={BIG}>{text}</p>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Model Cards, Datasheets, and System Transparency Notes [no-exercise]
          ================================================================ */}
      <Slide id="model-cards-datasheets-and-system-transparency-notes" border className="!py-8">
        <SlideHeading>Model Cards, Datasheets, and System Transparency Notes</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled>
                <p className={BIG}>
                  <Term>Datasheets for Datasets</Term>, introduced by
                  Gebru and colleagues (2021), standardize documentation of a
                  dataset&apos;s motivation, composition, collection process,
                  preprocessing, allowed uses, and maintenance plan.
                </p>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled>
                <p className={BIG}>
                  <Term>Model Cards</Term>, introduced by Mitchell and
                  colleagues (2019), accompany a trained model to report its
                  intended use cases, out-of-scope uses, architecture, evaluation
                  datasets, disaggregated performance across demographic groups,
                  and known ethical limitations.
                </p>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled>
                <p className={BIG}>
                  <Term>System-level transparency notes</Term> extend
                  model cards to cover the complete deployed application,
                  including system prompts, retrieval sources, guardrail filters,
                  human oversight regimes, and the date of the most recent
                  behavioral audit.
                </p>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Ruled className="mt-4">
          <p className={BIG}>
            Together, datasheets, model cards, and system transparency notes
            create an{" "}
            <Term>auditable chain of custody</Term> across the AI
            value chain introduced in Week 1.
          </p>
        </Ruled>
      </Slide>

      {/* ================================================================
          Dark Transparency and Disclosure Overload [no-exercise]
          ================================================================ */}
      <Slide id="dark-transparency-and-disclosure-overload" border className="!py-8">
        <SlideHeading>Dark Transparency and Disclosure Overload</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled>
              <P>
                More information is not always better governance: inundating
                consumers with technical parameters, thirty-page privacy
                policies, or uncalibrated confidence scores can obscure rather
                than clarify how a system works.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Dark transparency</Term>, or strategic opacity
                through overload, occurs when an organization releases
                voluminous technical disclosures to create the appearance of
                openness while{" "}
                <Term>burying conflicts of interest or adverse error rates</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Furthermore, displaying fluent, authoritative chain-of-thought
                explanations alongside a model&apos;s recommendation can amplify
                automation bias in human users, causing them to trust incorrect
                answers more than when no explanation is shown.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Governance standards therefore evaluate disclosures empirically
                by testing whether human users and downstream agents actually
                comprehend and act appropriately on the explanation provided.
              </P>
            </Ruled>
          </div>
          <Plate>
            <BuriedDisclosure />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: When the Reasoning Trace Looks Clean
          ================================================================ */}
      <Slide id="discussion-when-the-reasoning-trace-looks-clean" border className="!py-8">
        <SlideHeading>Discussion: When the Reasoning Trace Looks Clean</SlideHeading>
        <Discussion
          scenario={"A retail marketplace deploys an AI shopping assistant that displays a collapsible “Why I picked this product” reasoning trace to shoppers. In a pre-deployment factorial audit, researchers find that the assistant selects higher-margin private-label products 28 percent more often than superior third-party brands with identical ratings and lower prices, yet the displayed reasoning trace never mentions brand ownership or margin and instead praises the private-label product's build quality."}
          question={"How is this divergence possible, why does displaying the trace create a governance risk for shoppers, and how should the marketplace's audit board respond?"}
        />
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Process transparency discloses how a system is governed, intrinsic interpretability builds models whose structure is directly readable, and post-hoc explainability approximates complex black-box models after training.",
            "On high-stakes structured tabular decisions, constrained interpretable models (such as sparse regressions, GAMs, and rule lists) frequently match black-box accuracy while avoiding approximation gaps (Rudin, 2019).",
            "Global post-hoc methods (permutation importance, PDPs) summarize overall model behavior, whereas local methods (LIME, SHAP) attribute individual predictions. Both describe model correlations rather than real-world causation and can be fooled by correlated features or adversarial scaffolding.",
            "Counterfactual explanations identify the smallest change that flips a decision, while actionable recourse requires that those changes involve mutable, feasible features with equitable effort across demographic groups.",
            "Reasoning traces in large language models can be coded as verbal protocols using validated codebooks (Wadi & Ma, 2026b, 2026c), but a plausible trace is not guaranteed to be a faithful record of the model's internal computation.",
            "Pairing coded reasoning traces with controlled factorial choice experiments separates genuine process mechanisms from unfaithful post-hoc rationalization.",
            "Institutional documentation combines Datasheets for Datasets, Model Cards, and audience-tailored explanations while guarding against disclosure overload and explanation-induced automation bias.",
          ].map((takeaway, i) => (
            <li key={i} className={i === 6 ? "min-w-0 md:col-span-2 lg:col-span-3" : "min-w-0"}>
              <Numbered n={i + 1}>
                <Ruled>
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
