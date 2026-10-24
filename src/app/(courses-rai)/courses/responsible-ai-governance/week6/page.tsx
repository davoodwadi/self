"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Statement, Term, Ruled, SlideHeading, Numbered, PartHead, Prompt } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  BystanderUpload,
  CallArchive,
  ClipAndNoise,
  ConsentBanner,
  ContextFlows,
  DataOrigin,
  DeceptionInterlock,
  DisguisedSurvey,
  DisclosedReport,
  EpsilonNoise,
  ExtractionPrefix,
  FederatedPlan,
  FlowParameters,
  HiddenFuture,
  JusticeBurden,
  KAnonymity,
  LifecycleStations,
  MembershipGap,
  PersonaPress,
  PersonaPrompt,
  PersonVsDistribution,
  PilotNotReplace,
  PolicyHours,
  PolicyScroll,
  ProtocolDossier,
  ProvenanceTag,
  ProxyVsActor,
  PurposeGate,
  QuasiIdentifiers,
  RedactedRecord,
  RowsVsWeights,
  RuralPretest,
  SensitiveInference,
  ShadowPipeline,
  ShardUnlearning,
  TakeItOrLeaveIt,
  TemperatureShift,
  TracePoints,
  TranscriptStrip,
  VarianceCollapse,
  WelfareBalance,
  OngoingConsent,
} from "./visuals";

// ============================================================================
// WEEK 06 — PRIVACY, CONSENT, AND DATA GOVERNANCE
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md;
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week6Page() {
  return (
    <SlideDeck label="Week 06">
      {/* ================================================================
          01 · Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 06 · Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">Privacy, Consent, and Data Governance</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[52ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.25rem,2vw,1.7rem)]">
          Governing data in the age of artificial intelligence requires tracking
          provenance from collection to model weights, enforcing{" "}
          <span className="text-[var(--signal)]">contextual integrity beyond checkbox consent</span>,
          and upholding research ethics for both human participants and
          synthetic respondents.
        </p>
      </Slide>

      {/* ================================================================
          02 · Why AI Transforms Data Governance [no-exercise]
          ================================================================ */}
      <Slide id="why-ai-transforms-data-governance" border className="!py-8">
        <SlideHeading>Why AI Transforms Data Governance</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Traditional database governance treated personal data as discrete
                rows in a table that could be queried, corrected, or deleted on
                request.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Machine learning and foundation models transform personal data in
                two ways that challenge classical database controls: they infer
                sensitive attributes that were never collected, and they compress
                training examples into millions or billions of continuous model
                weights.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Once customer transcripts, browsing logs, or public posts are
                absorbed into a model&apos;s parameters, tracing provenance or{" "}
                <Term tone="signal">deleting a single individual&apos;s contribution is no longer a simple database query</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <RowsVsWeights />
          </Plate>
        </div>
        <div className="mt-6 grid w-full items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Ruled weight="thin">
            <P>
              Effective data governance therefore operates across the entire data
              lifecycle, before collection, during model training, at inference
              time, and during retirement or unlearning.
            </P>
          </Ruled>
          <Plate className="!py-2">
            <LifecycleStations />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          03 · From Data Ownership to Contextual Integrity [no-exercise]
          ================================================================ */}
      <Slide id="from-data-ownership-to-contextual-integrity" border className="!py-8">
        <SlideHeading>From Data Ownership to Contextual Integrity</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Public debates often frame privacy as either absolute secrecy
                (hiding information completely) or individual property ownership
                (selling personal data in a market).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Neither framing explains everyday consumer expectations: a shopper
                willingly shares a home address with a retailer to receive a
                package and shares medical symptoms with a pharmacist, yet objects
                if either party uses those details to train an advertising model.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ContextFlows />
          </Plate>
        </div>
        <Statement className="mt-8 !max-w-none border-t border-[var(--ink)] pt-6 !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          Privacy in commercial markets is governed not by whether information
          was once shared with someone, but by whether{" "}
          <span className="text-[var(--signal)]">the flow of information respects the norms of the context</span>{" "}
          in which it was shared.
        </Statement>
      </Slide>

      {/* ================================================================
          04 · Part 1: Data Provenance in Training and Personalization [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Data Provenance in Training and Personalization" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <ProvenanceTag />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                <strong className="font-semibold">Data provenance</strong> is the
                documented lineage of a dataset, recording where the data
                originated, under what legal and ethical authority they were
                collected, how they were transformed, and which downstream models
                depend on them.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Governance frameworks classify customer and training data by how
                the information was generated, because{" "}
                <Term tone="signal">each origin carries distinct legal obligations and privacy risks</Term>.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          05 · A Taxonomy of Customer Data [exercise]
          ================================================================ */}
      <Slide
        id="a-taxonomy-of-customer-data-volunteered-observed-inferred-and-scraped"
        border
        className="!py-8"
        exercise={exercise["a-taxonomy-of-customer-data-volunteered-observed-inferred-and-scraped"]}
      >
        <SlideHeading className="[&_h2]:!max-w-none">A Taxonomy of Customer Data: Volunteered, Observed, Inferred, and Scraped</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          {(
            [
              [
                "volunteered",
                <>
                  <Term tone="ink">Volunteered</Term> (or zero-party and explicit
                  first-party) data are intentionally provided by the consumer for
                  a stated purpose, such as account registration details, survey
                  responses, or stated product preferences.
                </>,
              ],
              [
                "observed",
                <>
                  <Term tone="ink">Observed</Term> data are captured automatically
                  from a consumer&apos;s interactions with a firm&apos;s digital or
                  physical properties, such as clickstreams, dwell time, location
                  traces, and purchase histories.
                </>,
              ],
              [
                "inferred",
                <>
                  <Term tone="ink">Inferred</Term> data are probabilistic
                  predictions generated by analytics or machine learning models
                  from volunteered and observed inputs, such as estimated household
                  income, pregnancy likelihood, price elasticity, or mental health
                  risk.
                </>,
              ],
              [
                "scraped",
                <>
                  <Term tone="ink">Scraped</Term> data are harvested in bulk from
                  publicly accessible web pages, forums, product review sites, and
                  social networks without a direct relationship with the
                  individuals who authored the content.
                </>,
              ],
            ] as const
          ).map(([kind, text], i) => (
            <li key={kind} className="min-w-0">
              <Numbered n={i + 1} className="flex h-full flex-col">
                <Ruled weight="thin" className="mb-3">
                  <P>{text}</P>
                </Ruled>
                <Plate className="mt-auto !p-2">
                  <DataOrigin kind={kind} />
                </Plate>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          06 · Purpose Limitation and Secondary Use in Foundation Models [no-exercise]
          ================================================================ */}
      <Slide id="purpose-limitation-and-secondary-use-in-foundation-models" border className="!py-8">
        <SlideHeading className="!mb-5">Purpose Limitation and Secondary Use in Foundation Models</SlideHeading>
        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                A foundational principle of modern privacy law is{" "}
                <Term tone="ink">purpose limitation</Term>: personal data
                collected for one specified, legitimate purpose may not be
                repurposed for an incompatible secondary use without a new legal
                basis or fresh consent.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A recurring governance failure in commercial AI is{" "}
                <Term tone="signal">retroactive repurposing</Term>, in which firms
                take historical customer service recordings, chat transcripts, or
                loyalty records collected years earlier and feed them into
                foundation model fine-tuning pipelines.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Because the original privacy notice contemplated quality assurance
                or order fulfillment rather than training a generative model,
                secondary training use violates purpose limitation unless explicit
                opt-in consent or rigorous de-identification is established.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Plate className="mb-3 !py-3">
              <PurposeGate />
            </Plate>
            <div className="grid items-center gap-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <Ruled weight="thin">
                <P>
                  Furthermore, inferred data often create sensitive personal data
                  out of non-sensitive inputs, triggering heightened regulatory
                  protections even when the raw inputs were benign.
                </P>
              </Ruled>
              <Plate className="!py-3">
                <SensitiveInference />
              </Plate>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          07 · Shadow Data Pipelines and Third-Party API Leakage [no-exercise]
          ================================================================ */}
      <Slide id="shadow-data-pipelines-and-third-party-api-leakage" border className="!py-8">
        <SlideHeading>Shadow Data Pipelines and Third-Party API Leakage</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <ShadowPipeline />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Even when an organization governs its central data warehouse
                carefully, employees frequently create{" "}
                <Term tone="signal">shadow data pipelines</Term> by pasting
                customer records, interview transcripts, or proprietary strategy
                documents into external generative AI tools.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Submitting personal data to an external AI provider constitutes a
                third-party data transfer and processing event under data
                protection law.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Under consumer-grade terms of service, prompts and uploaded files
                may be retained by the vendor, reviewed by human contractors, and
                incorporated into future training runs.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Enterprise data governance therefore enforces technical data-loss
                prevention (DLP) guardrails, zero-data-retention enterprise API
                contracts, and local or private-cloud model hosting for workflows
                touching personal data.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          08 · Part 2: Consent, Contextual Integrity, and the Limits of Notice-and-Choice [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Consent, Contextual Integrity, and the Limits of Notice-and-Choice" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                For decades, commercial digital markets relied on{" "}
                <strong className="font-semibold">notice-and-choice</strong>{" "}
                (publishing a lengthy privacy policy and treating continued
                website use as consent) to legitimize data collection.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Both privacy scholarship and contemporary regulation recognize
                that{" "}
                <Term tone="signal">notice-and-choice breaks down in complex algorithmic ecosystems</Term>.
              </p>
            </Ruled>
          </div>
          <Plate>
            <PolicyScroll />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          09 · Contextual Integrity and Informational Norms [exercise]
          ================================================================ */}
      <Slide
        id="contextual-integrity-and-informational-norms"
        border
        className="!py-6"
        exercise={exercise["contextual-integrity-and-informational-norms"]}
      >
        <SlideHeading className="!mb-5">Contextual Integrity and Informational Norms</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Developed by Helen Nissenbaum (2004), the theory of{" "}
              <Term tone="ink">contextual integrity</Term> defines privacy as the
              appropriate flow of information according to the norms of a
              specific social context, such as healthcare, education, banking, or
              retail.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Every information flow is specified by five independent parameters:
              the data subject (whom the data describe), the sender (who
              transmits the data), the recipient (who receives the data), the
              information type (the nature of the attribute), and the
              transmission principle (the condition or constraint under which the
              data flow, such as confidentiality, reciprocity, or warrant).
            </P>
          </Ruled>
        </div>
        <Plate className="mx-auto mt-4 max-w-[880px] !py-3">
          <FlowParameters />
        </Plate>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              A privacy violation occurs whenever an algorithmic system{" "}
              <Term tone="signal">alters any one of these five parameters</Term>{" "}
              in a way that breaches entrenched contextual norms, even if the data
              were not strictly secret.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              For example, scraping public patients&apos; support-group posts to
              train a commercial insurance risk model violates contextual
              integrity because it changes both the recipient (from peers to an
              insurer) and the transmission principle (from mutual support to
              commercial underwriting).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          10 · Why Notice-and-Choice Fails in AI Ecosystems [no-exercise]
          ================================================================ */}
      <Slide id="why-notice-and-choice-fails-in-ai-ecosystems" border className="!py-6">
        <SlideHeading className="!mb-4">Why Notice-and-Choice Fails in AI Ecosystems</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-3 md:grid-cols-2">
          {(
            [
              [
                "hours",
                <>
                  <Term tone="ink">Cognitive and temporal impossibility:</Term>{" "}
                  reading the privacy policies of every digital service a consumer
                  encounters in a year would require hundreds of hours, reducing
                  consent banners to habitual clicks.
                </>,
                <PolicyHours key="p" />,
              ],
              [
                "future",
                <>
                  <Term tone="ink">Opacity of downstream inferences:</Term> at the
                  moment of consent, neither the consumer nor often the collecting
                  firm can foresee which sensitive traits a future machine learning
                  model will infer from raw behavioral logs.
                </>,
                <HiddenFuture key="p" />,
              ],
              [
                "bystanders",
                <>
                  <Term tone="ink">Network externalities and relational data:</Term>{" "}
                  one individual&apos;s consent often exposes data about
                  non-consenting bystanders, as when a consumer uploads an address
                  book, a group photograph, or an email thread to an AI assistant.
                </>,
                <BystanderUpload key="p" />,
              ],
              [
                "power",
                <>
                  <Term tone="ink">Structural power asymmetry:</Term> when
                  essential financial, educational, or workplace services bundle
                  core functionality with broad AI training consent on a
                  take-it-or-leave-it basis, agreement is{" "}
                  <Term tone="signal">coerced rather than freely given</Term>.
                </>,
                <TakeItOrLeaveIt key="p" />,
              ],
            ] as const
          ).map(([kind, text, plate]) => (
            <li key={kind} className="min-w-0">
              <div className="flex h-full flex-col">
                <Ruled weight="thin" className="mb-2 !pt-3">
                  <P>{text}</P>
                </Ruled>
                <Plate className="mt-auto !p-2">{plate}</Plate>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          11 · Dark Patterns in Consent Management and Opt-Out Design [exercise]
          ================================================================ */}
      <Slide
        id="dark-patterns-in-consent-management-and-opt-out-design"
        border
        className="!py-8"
        exercise={exercise["dark-patterns-in-consent-management-and-opt-out-design"]}
      >
        <SlideHeading>Dark Patterns in Consent Management and Opt-Out Design</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <ol className="grid gap-4">
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Asymmetric friction (roach motels)</Term> occurs
                  when opting in to data sharing and AI training requires a single
                  prominent click, whereas opting out requires navigating multiple
                  nested settings menus.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Confirmshaming and visual interference</Term>{" "}
                  occur when the privacy-protective choice is styled in
                  low-contrast grey text or framed with manipulative language that
                  penalizes the user for declining.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Bundled consent</Term> occurs when a platform
                  forces users to accept behavioral profiling and AI model training
                  as a condition of receiving basic product functionality that does
                  not technically require those data.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Pre-selected defaults</Term> exploit status quo
                  bias by automatically enrolling existing accounts into new AI
                  training programs unless the user notices a quiet policy update
                  and manually opts out.
                </P>
              </Ruled>
            </li>
          </ol>
          <Plate>
            <ConsentBanner />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          12 · Discussion: Training on Customer Support Calls
          ================================================================ */}
      <Slide id="discussion-training-on-customer-support-calls" border className="!py-8">
        <SlideHeading>Training on Customer Support Calls</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A telecommunications company updates its terms of service with a
            banner stating, &ldquo;We use customer interactions to improve our
            services and AI technologies,&rdquo; and begins fine-tuning a
            commercial voice agent on five years of recorded billing and
            technical-support calls. Analyze this decision using Nissenbaum&apos;s
            five parameters of contextual integrity, identify why
            notice-and-choice is insufficient here, and specify what governance
            steps would be required before any call recordings could be used.
          </Prompt>
          <Plate>
            <CallArchive />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          13 · Part 3: Technical Privacy Risks and Safeguards [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Technical Privacy Risks and Safeguards" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <RedactedRecord />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                When organizations share datasets with researchers, train
                predictive models, or deploy language models, removing direct
                identifiers such as names and account numbers is{" "}
                <Term tone="signal">only the beginning of technical privacy protection</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Algorithmic governance requires evaluating formal
                re-identification and extraction threats and pairing them with
                mathematical privacy guarantees.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          14 · The Failure of Naive Anonymization and Re-Identification Attacks [no-exercise]
          ================================================================ */}
      <Slide id="the-failure-of-naive-anonymization-and-re-identification-attacks" border className="!py-6">
        <SlideHeading className="!mb-4 [&_h2]:!max-w-none [&_h2]:lg:!text-[2.3rem]">The Failure of Naive Anonymization and Re-Identification Attacks</SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <div className="grid gap-3">
            <Ruled weight="thin" className="!pt-3">
              <P>
                <Term tone="ink">Naive pseudonymization</Term> replaces direct
                identifiers (name, email, social insurance number) with a random
                token while leaving quasi-identifiers (postal code, birth date,
                gender, transaction timestamps) intact.
              </P>
            </Ruled>
            <Ruled weight="thin" className="!pt-3">
              <P>
                In a classic demonstration, Latanya Sweeney showed that{" "}
                <Term tone="signal">87 percent of the United States population could be uniquely identified</Term>{" "}
                by the combination of five-digit ZIP code, date of birth, and sex
                alone, allowing &ldquo;anonymized&rdquo; state hospital records to
                be linked directly to a public voter registration list.
              </P>
            </Ruled>
          </div>
          <Plate className="!py-3">
            <QuasiIdentifiers />
          </Plate>
        </div>
        <div className="mt-4 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-2 !pt-3">
              <P>
                In high-dimensional behavioral data, sparsity makes
                re-identification even easier: four spatiotemporal credit-card
                transaction points or browsing history pairs are sufficient to
                uniquely re-identify more than 90 percent of individuals in a
                de-identified mobility or retail trace (de Montjoye et al., 2015).
              </P>
            </Ruled>
            <Plate className="mt-auto !py-2 lg:mx-auto lg:max-w-[480px]">
              <TracePoints />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-2 !pt-3">
              <P>
                Syntactic privacy models such as{" "}
                <Term tone="ink">k-anonymity</Term> require that every combination
                of quasi-identifiers appear at least k times in a released table,
                but they remain vulnerable when sensitive attributes lack
                diversity within a group or when an attacker possesses
                high-dimensional auxiliary data.
              </P>
            </Ruled>
            <Plate className="mt-auto !py-2 lg:mx-auto lg:max-w-[480px]">
              <KAnonymity />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          15 · Training Data Memorization and Membership Inference in LLMs [no-exercise]
          ================================================================ */}
      <Slide id="training-data-memorization-and-membership-inference-in-llms" border className="!py-8">
        <SlideHeading>Training Data Memorization and Membership Inference in LLMs</SlideHeading>
        <Ruled>
          <P className="!max-w-none">
            Deep neural networks and large language models do not merely learn
            abstract statistical rules; they can{" "}
            <Term tone="signal">memorize verbatim sequences</Term> from their
            training corpora, particularly sequences that appear repeatedly or
            sit in unusual outliers.
          </P>
        </Ruled>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-3">
              <P>
                In a <Term tone="ink">training data extraction attack</Term>, an
                adversary prompts a language model with a prefix and recovers
                verbatim personal names, phone numbers, physical addresses, or
                proprietary code that appeared in the pre-training or fine-tuning
                data (Carlini et al., 2021).
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <ExtractionPrefix />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-3">
              <P>
                In a <Term tone="ink">membership inference attack</Term>, an
                adversary inspects a model&apos;s output probabilities on a target
                record to determine whether that specific individual&apos;s record
                was included in the model&apos;s training set, which is itself a
                severe privacy breach when the training set comes from a sensitive
                cohort such as a disease registry or a high-risk credit list.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <MembershipGap />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          16 · Differential Privacy, Federated Learning, and Machine Unlearning [exercise]
          ================================================================ */}
      <Slide
        id="differential-privacy-federated-learning-and-machine-unlearning"
        border
        className="!py-6"
        exercise={exercise["differential-privacy-federated-learning-and-machine-unlearning"]}
      >
        <SlideHeading className="!mb-4 [&_h2]:!max-w-none [&_h2]:lg:!text-[2.3rem]">Differential Privacy, Federated Learning, and Machine Unlearning</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-3 md:grid-cols-2">
          {(
            [
              [
                "dp",
                <>
                  <Term tone="ink">Differential privacy</Term> (Dwork et al., 2006)
                  provides a mathematical guarantee that the probability
                  distribution of an algorithm&apos;s output changes by at most a
                  bounded factor epsilon whether any single individual&apos;s record
                  is included in or excluded from the dataset.
                </>,
                <EpsilonNoise key="p" />,
              ],
              [
                "dpsgd",
                <>
                  In differentially private model training (such as{" "}
                  <Term tone="ink">DP-SGD</Term>), per-example gradients are
                  clipped to bound sensitivity and calibrated random noise is added
                  before weight updates, preventing the model from memorizing any
                  single individual&apos;s data at the cost of a{" "}
                  <Term tone="signal">governed privacy-utility trade-off</Term>.
                </>,
                <ClipAndNoise key="p" />,
              ],
              [
                "federated",
                <>
                  <Term tone="ink">Federated learning</Term> keeps raw personal
                  data on the user&apos;s local device, training local model updates
                  on-device and transmitting only aggregated weight updates to a
                  central server, though it must still be combined with secure
                  aggregation or differential privacy to prevent gradient inversion
                  attacks.
                </>,
                <FederatedPlan key="p" />,
              ],
              [
                "unlearning",
                <>
                  <Term tone="ink">Machine unlearning</Term> develops algorithms to
                  remove the influence of specific training records from an already
                  trained model when a consumer exercises a statutory right to
                  erasure (the right to be forgotten), without bearing the full
                  computational cost of retraining the foundation model from
                  scratch.
                </>,
                <ShardUnlearning key="p" />,
              ],
            ] as const
          ).map(([kind, text, plate]) => (
            <li key={kind} className="min-w-0">
              <div className="flex h-full flex-col">
                <Ruled weight="thin" className="mb-2 !pt-3">
                  <P>{text}</P>
                </Ruled>
                <Plate className="mt-auto !p-2">{plate}</Plate>
              </div>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          17 · Part 4: Research Ethics Board Governance for Human and AI Studies [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Research Ethics Board Governance for Human and AI Studies" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Academic researchers and corporate behavioral labs that study
                consumers, test algorithmic interfaces, or collect human
                annotations operate under{" "}
                <Term tone="signal">formal Research Ethics Board (REB) or Institutional Review Board (IRB) oversight</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                As AI enters behavioral research both as a tool for processing
                participant data and as the subject of human-AI interaction
                experiments, REB standards govern how studies are designed and
                approved.
              </p>
            </Ruled>
          </div>
          <Plate>
            <ProtocolDossier />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          18 · Core Principles of Human-Subjects Research Ethics [no-exercise]
          ================================================================ */}
      <Slide id="core-principles-of-human-subjects-research-ethics" border className="!py-8">
        <SlideHeading>Core Principles of Human-Subjects Research Ethics</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.2rem,1.8vw,1.55rem)]">
          Modern research ethics governance, codified in the Belmont Report and
          Canada&apos;s Tri-Council Policy Statement (TCPS 2), rests on three
          foundational principles: Respect for Persons, Concern for Welfare
          (Beneficence), and Justice.
        </Statement>
        <ol className="mt-6 grid w-full gap-x-6 gap-y-5 md:grid-cols-3">
          {(
            [
              [
                "respect",
                <>
                  <Term tone="ink">Respect for Persons</Term> protects individual
                  autonomy through free, informed, and ongoing consent, and provides
                  heightened safeguards for participants with diminished autonomy.
                </>,
                <OngoingConsent key="p" />,
              ],
              [
                "welfare",
                <>
                  <Term tone="ink">Concern for Welfare</Term> requires researchers
                  to minimize physical, psychological, social, economic, and privacy
                  risks to participants and to ensure that{" "}
                  <Term tone="signal">foreseeable risks are proportionate to the expected benefits</Term>{" "}
                  of the research.
                </>,
                <WelfareBalance key="p" />,
              ],
              [
                "justice",
                <>
                  <Term tone="ink">Justice</Term> requires that the burdens and
                  benefits of research participation be distributed fairly across
                  social groups, neither exploiting vulnerable populations for
                  convenient sampling nor excluding groups from beneficial
                  research.
                </>,
                <JusticeBurden key="p" />,
              ],
            ] as const
          ).map(([kind, text, plate], i) => (
            <li key={kind} className="min-w-0">
              <Numbered n={i + 1} className="flex h-full flex-col">
                <Ruled weight="thin" className="mb-3">
                  <P>{text}</P>
                </Ruled>
                <Plate className="mt-auto !p-2">{plate}</Plate>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          19 · Deception, Debriefing, and Minimal Risk in Behavioral Experiments [exercise]
          ================================================================ */}
      <Slide
        id="deception-debriefing-and-minimal-risk-in-behavioral-experiments"
        border
        className="!py-8"
        exercise={exercise["deception-debriefing-and-minimal-risk-in-behavioral-experiments"]}
      >
        <SlideHeading className="!mb-5">Deception, Debriefing, and Minimal Risk in Behavioral Experiments</SlideHeading>
        <div className="grid w-full gap-x-8 gap-y-4 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              A study qualifies as <Term tone="ink">minimal risk</Term> when the
              probability and magnitude of possible harms anticipated in the
              research are no greater than those encountered by participants in
              the aspects of their everyday life that relate to the research.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Incomplete disclosure or experimental deception, such as telling
              participants they are interacting with a human advisor when the
              advisor is an AI agent (or vice versa), is permitted by an REB{" "}
              <Term tone="signal">only when the research question cannot be answered without deception and the risk remains minimal</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Whenever deception is authorized, the protocol must include a
              mandatory post-study debriefing that explains the true nature of
              the manipulation and grants the participant the right to withdraw
              their data retroactively after learning the truth.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Plate className="!py-3">
            <DeceptionInterlock />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Coercive incentives or deceptive commercial solicitation
                disguised as academic or market research (sugging) are strictly
                prohibited.
              </P>
            </Ruled>
            <Plate className="!py-2">
              <DisguisedSurvey />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          20 · REB Oversight When AI Tools Process Participant Data [exercise]
          ================================================================ */}
      <Slide
        id="reb-oversight-when-ai-tools-process-participant-data"
        border
        className="!py-8"
        exercise={exercise["reb-oversight-when-ai-tools-process-participant-data"]}
      >
        <SlideHeading>REB Oversight When AI Tools Process Participant Data</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <Plate>
            <TranscriptStrip />
          </Plate>
          <ol className="grid gap-4">
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Informed consent scope:</Term> if researchers
                  plan to transcribe interviews, code open-ended responses, or
                  analyze participant records using an external AI service, that
                  processing and any third-party data transfer must be disclosed
                  explicitly in the consent form before participation begins.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Identifiability of qualitative text:</Term> as
                  examined in research ethics reviews, stripping a
                  participant&apos;s name from an interview transcript{" "}
                  <Term tone="signal">does not make it anonymous</Term> if detailed
                  life events, workplace descriptions, or verbatim quotes remain
                  before submission to an external language model.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Automated moderation and distress safeguards:</Term>{" "}
                  when an AI interviewer conducts qualitative interviews or when
                  participants interact with an unscripted conversational agent,
                  the protocol must define guardrails for unexpected harmful
                  outputs and provide immediate human contact channels.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Secondary analysis of scraped human data:</Term>{" "}
                  even when online reviews or forum posts are publicly viewable, an
                  REB evaluates whether quoting or linking those posts creates
                  re-identification or reputational risks that violate the
                  authors&apos; reasonable expectations of privacy.
                </P>
              </Ruled>
            </li>
          </ol>
        </div>
      </Slide>

      {/* ================================================================
          21 · Part 5: Ethical and Epistemic Boundaries of Synthetic AI Respondents [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Ethical and Epistemic Boundaries of Synthetic AI Respondents" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <PersonaPress />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Across marketing and consumer research, commercial vendors
                increasingly offer &ldquo;synthetic respondents&rdquo; or
                &ldquo;silicon samples,&rdquo; prompting large language models with
                demographic personas to answer surveys in place of human
                participants.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Governing the use of synthetic respondents requires{" "}
                <Term tone="signal">separating legitimate exploratory uses from epistemic and ethical failures</Term>.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          22 · Silicon Samples: Language Models as Simulated Survey Respondents [no-exercise]
          ================================================================ */}
      <Slide id="silicon-samples-language-models-as-simulated-survey-respondents" border className="!py-8">
        <SlideHeading>Silicon Samples: Language Models as Simulated Survey Respondents</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-3">
              <P>
                In a <Term tone="ink">silicon-sampling</Term> workflow, a
                researcher constructs a prompt specifying demographic and
                psychographic attributes (such as age, income, region, and
                political orientation) and asks a language model to complete a
                questionnaire or choice task as that persona.
              </P>
            </Ruled>
            <Plate className="mb-3">
              <PersonaPrompt />
            </Plate>
            <Ruled weight="thin">
              <P>
                Proponents argue that synthetic panels reduce data collection
                costs to pennies, return results in minutes, allow pretesting of
                fragile survey instruments, and avoid burdening human respondents
                during early design iterations.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-3">
              <P>
                However, a language model conditioned on a demographic label{" "}
                <Term tone="signal">is not a member of that demographic group</Term>;
                it is a conditional probability distribution over text learned
                from how that group is written about in training corpora.
              </P>
            </Ruled>
            <Plate className="mt-auto">
              <PersonVsDistribution />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          23 · Epistemic and Ethical Risks of Replacing Human Panels With AI [exercise]
          ================================================================ */}
      <Slide
        id="epistemic-and-ethical-risks-of-replacing-human-panels-with-ai"
        border
        className="!py-8"
        exercise={exercise["epistemic-and-ethical-risks-of-replacing-human-panels-with-ai"]}
      >
        <SlideHeading>Epistemic and Ethical Risks of Replacing Human Panels With AI</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-3">
              <P>
                <Term tone="signal">Variance collapse and hyper-consistency</Term>{" "}
                occur when language models produce artificially tight, stereotyped
                distributions that understate true within-group human
                heterogeneity and fail to capture idiosyncratic consumer
                preferences.
              </P>
            </Ruled>
            <Plate className="mb-3">
              <VarianceCollapse />
            </Plate>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Historical and WEIRD bias projection</Term> occurs
                when the model fills gaps in underrepresented personas by falling
                back to dominant Western cultural norms or caricatured demographic
                stereotypes, as examined in Week 3.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col">
            <Ruled weight="thin" className="mb-3">
              <P>
                <Term tone="ink">Non-invariance to prompt and scale formatting</Term>{" "}
                occurs when minor changes in persona wording, temperature, or
                single-response sampling shift the simulated sample&apos;s mean and
                variance (Wadi &amp; Fredette, 2025; Wadi, Ghodrat, &amp; Philp,
                2026).
              </P>
            </Ruled>
            <Plate className="mb-3">
              <TemperatureShift />
            </Plate>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Democratic and participatory erasure</Term> occurs
                when an organization uses synthetic personas to claim it consulted
                marginalized or disabled communities without ever speaking to or
                compensating real members of those communities.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          24 · Governance Rules for Hybrid Human-AI Research [no-exercise]
          ================================================================ */}
      <Slide id="governance-rules-for-hybrid-human-ai-research" border className="!py-8">
        <SlideHeading>Governance Rules for Hybrid Human-AI Research</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-3">
          {(
            [
              [
                "pilot",
                <>
                  <Term tone="ink">Pilot and pretest, never replace:</Term>{" "}
                  synthetic respondents can be used to pretest questionnaire
                  wording, check routing logic, or generate initial hypotheses, but
                  substantive conclusions about human consumers require empirical
                  validation on human samples.
                </>,
                <PilotNotReplace key="p" />,
              ],
              [
                "disclosure",
                <>
                  <Term tone="ink">Mandatory disclosure:</Term> any internal
                  report, client deck, or academic manuscript that uses
                  AI-generated responses must state explicitly which data came from
                  human participants and which came from simulated models,
                  alongside the exact model version and sampling protocol.
                </>,
                <DisclosedReport key="p" />,
              ],
              [
                "proxy",
                <>
                  <Term tone="ink">Distinguish studying AI as a proxy from studying AI as an actor:</Term>{" "}
                  using an LLM to guess how human shoppers feel is a{" "}
                  <Term tone="signal">fragile proxy</Term>, whereas auditing how an
                  LLM shopping agent itself evaluates products (Wadi &amp; Ma,
                  2026a, 2026b, 2026c) is direct empirical measurement of the
                  actual market actor.
                </>,
                <ProxyVsActor key="p" />,
              ],
            ] as const
          ).map(([kind, text, plate], i) => (
            <li key={kind} className="min-w-0">
              <Numbered n={i + 1} className="flex h-full flex-col">
                <Ruled weight="thin" className="mb-3">
                  <P>{text}</P>
                </Ruled>
                <Plate className="mt-auto !p-2">{plate}</Plate>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          25 · Discussion: The Synthetic Consumer Pretest
          ================================================================ */}
      <Slide id="discussion-the-synthetic-consumer-pretest" border className="!py-8">
        <SlideHeading>The Synthetic Consumer Pretest</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A healthcare consumer-products firm plans to launch a home diagnostic
            kit designed for low-income rural seniors. To save six weeks of
            recruitment and REB review, a consultancy proposes surveying 2,000
            LLM personas prompted with rural postal codes, ages 65 to 85, and low
            household incomes, and using the results to finalize pricing and
            instructional packaging. Evaluate this proposal on both statistical
            validity and research ethics, and specify what role, if any,
            synthetic testing could legitimately play in the project.
          </Prompt>
          <Plate>
            <RuralPretest />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          26 · Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Customer and training data fall into four provenance categories (volunteered, observed, inferred, and scraped), and repurposing historical interaction data for AI training without a fresh legal basis violates purpose limitation.",
            "Nissenbaum's (2004) contextual integrity evaluates privacy across five parameters (subject, sender, recipient, information type, and transmission principle), explaining why notice-and-choice banners and manipulative consent dark patterns fail to legitimize cross-context data flows.",
            "Naive anonymization fails in high-dimensional behavioral data because a handful of spatiotemporal points or quasi-identifiers uniquely re-identify individuals, while large language models can memorize and regurgitate verbatim training examples.",
            "Technical privacy governance relies on differential privacy (bounded epsilon sensitivity and calibrated noise), federated learning, and machine unlearning for statutory erasure requests.",
            "Research Ethics Board (REB) oversight enforces Respect for Persons, Concern for Welfare, and Justice, governing experimental deception, mandatory debriefing, and the disclosure of third-party AI data processing in informed consent.",
            "Synthetic AI respondents (silicon samples) suffer from variance collapse, cultural stereotyping, and participatory erasure when used as substitutes for human panels; governance restricts them to disclosed pretesting while distinguishing fragile human simulation from direct behavioral audits of AI shopping agents.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled weight="thin">
                  <P>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
