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
  IsoScalingRule,
  IsoGovernanceAuthority,
  IsoEthicsWashing,
  IsoThreeLenses,
  IsoWelfareTradeoff,
  IsoDeontologicalDuty,
  IsoVirtueCharacter,
  IsoFragmentedChain,
  IsoValueChainFiveActors,
  IsoManyHands,
  IsoAccountabilityDossiers,
  IsoInsuranceClaims,
  IsoBenchmarkGap,
  IsoProbabilisticRuns,
  IsoBenchmarkFailures,
  IsoSixStages,
  IsoSharedAuthority,
  IsoInTheLoop,
  IsoOnTheLoop,
  IsoAutonomous,
  IsoOversightFailures,
  IsoDecisionRiskRegimes,
  IsoDelegatedExchange,
  IsoSurrogateConsumer,
  IsoDualAgencyRisks,
  IsoTravelAgentHotel,
  IsoConsequentialism,
  IsoDeontology,
  IsoVirtueEthics,
  IsoLoanWide,
} from "./visuals";

export {
  IsoConsequentialism,
  IsoDeontology,
  IsoVirtueEthics,
  IsoLoanWide,
};

// ============================================================================
// WEEK 01 — FOUNDATIONS OF RESPONSIBLE AI IN MARKETS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md;
// the design only decides where each sentence sits and what Isometric Tabletop
// Diorama plate is drawn beside it. Plates live in ./visuals.tsx.
//
// Exercises: `Slide` renders `exercise` AFTER its section, on its own screen,
// so each [exercise]-tagged topic carries one exercise on what it taught.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week1Page() {
  return (
    <SlideDeck label="Week 01">
      {/* ================================================================
          01 · Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 01 · Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[18ch]">
          Foundations of <span className="text-[var(--signal)]">Responsible AI</span> in Markets
        </Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[40ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.35rem,2.2vw,1.9rem)]">
          Algorithmic governance translates ethical principles into{" "}
          <span className="text-[var(--signal)]">verifiable rules, audits, and accountability</span>{" "}
          across human and agent-mediated markets.
        </p>
      </Slide>

      {/* ================================================================
          02 · Why Market Algorithms Require Governance [no-exercise]
          ================================================================ */}
      <Slide id="why-market-algorithms-require-governance" border className="!py-8">
        <SlideHeading>Why Market Algorithms Require Governance</SlideHeading>
        <Lead className="!max-w-none">
          Algorithms now determine which products consumers see, what prices they
          are quoted, whether their credit application is approved, and how their
          service complaints are resolved.
        </Lead>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Unlike a human employee who makes one decision at a time, a deployed
              model executes <Term tone="ink">thousands of decisions per second</Term>{" "}
              using the same decision rule.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              An <Term tone="signal">error, bias, or perverse incentive</Term> in
              that rule therefore scales immediately across an entire market
              segment.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoScalingRule />
        </Plate>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Market algorithms also learn from historical records and optimize
              narrow commercial objectives, such as click-through rate or
              short-term revenue, that can conflict with consumer welfare.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P>
              Governing these systems requires both{" "}
              <Term tone="counter">normative principles</Term> that define
              acceptable behavior and <Term tone="ink">empirical methods</Term>{" "}
              that verify whether a deployed system complies with them.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          03 · Defining Responsible AI and Algorithmic Governance [no-exercise]
          ================================================================ */}
      <Slide id="defining-responsible-ai-and-algorithmic-governance" border className="!py-8">
        <SlideHeading>Defining Responsible AI and Algorithmic Governance</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled tone="counter">
            <p className={BIG}>
              <Term tone="counter">Responsible AI</Term> is the practice of
              designing, deploying, and operating artificial intelligence systems
              so that their decisions are fair, transparent, safe,
              privacy-preserving, and accountable to affected stakeholders.
            </p>
          </Ruled>
          <Ruled tone="ink">
            <p className={BIG}>
              <Term tone="ink">Algorithmic governance</Term> is the system of
              institutional rules, technical audits, oversight roles, and
              regulatory enforcement mechanisms that ensure an organization meets
              those obligations.
            </p>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin" className="flex flex-col justify-between">
            <P>
              Principles state what an organization values, whereas governance
              specifies who has the authority to approve, restrict, or halt a
              model and on the basis of what evidence.
            </P>
            <Plate className="mt-4">
              <IsoGovernanceAuthority />
            </Plate>
          </Ruled>
          <Ruled tone="signal" className="flex flex-col justify-between">
            <P>
              Ethics without governance produces aspirational statements that do
              not alter engineering or marketing decisions, a failure known as{" "}
              <Term tone="signal">ethics washing</Term>.
            </P>
            <Plate className="mt-4">
              <IsoEthicsWashing />
            </Plate>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          04 · Part 1: Ethical Frameworks for Automated Decisions [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Ethical Frameworks for Automated Decisions" />
        <Statement className="mt-8 !max-w-none !text-[clamp(1.4rem,2.3vw,2rem)]">
          Managers and regulators evaluate algorithmic decisions through three
          foundational traditions in normative ethics:{" "}
          <Term tone="ink">consequentialism</Term>,{" "}
          <Term tone="counter">deontology</Term>, and{" "}
          <Term tone="ink">virtue ethics</Term>.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Each framework asks a different question about an automated system
              and identifies different failure modes.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              Because the three frameworks can reach{" "}
              <span className="text-[var(--signal)]">conflicting conclusions</span>{" "}
              about the same deployment, responsible governance requires examining
              a system through all three lenses.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoThreeLenses />
        </Plate>
      </Slide>

      {/* ================================================================
          05 · Consequentialism and Market Welfare [no-exercise]
          ================================================================ */}
      <Slide id="consequentialism-and-market-welfare" border className="!py-8">
        <SlideHeading>Consequentialism and Market Welfare</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
          <Term tone="ink">Consequentialism</Term> judges an action or decision
          rule by the aggregate outcomes it produces across all affected parties.
        </Statement>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In commercial settings, consequentialist reasoning appears as
              cost-benefit analysis, welfare maximization, and the optimization of
              objective functions.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              A consequentialist defense of personalized recommendations argues
              that matching products to preferences reduces search costs and
              increases <Term tone="counter">total consumer surplus</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Consequentialism fails as a sole governance standard when an
              algorithm maximizes average benefit by{" "}
              <Term tone="signal">imposing severe harm on a smaller group</Term>,
              such as excluding a minority segment from credit offers to reduce
              overall default rates.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoWelfareTradeoff />
        </Plate>
      </Slide>

      {/* ================================================================
          06 · Deontology, Rights, and Duties [no-exercise]
          ================================================================ */}
      <Slide id="deontology-rights-and-duties" border className="!py-8">
        <SlideHeading>Deontology, Rights, and Duties</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
          <Term tone="counter">Deontology</Term> judges an action by whether it
          respects moral duties, individual rights, and autonomy, regardless of
          the aggregate profitability of the outcome.
        </Statement>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="counter">
            <P>
              In market governance, deontological rules establish{" "}
              <Term tone="counter">inviolable constraints</Term>, such as the duty
              not to deceive consumers, the right to informed consent, and the
              prohibition of discrimination against protected classes.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Under a deontological standard, a{" "}
              <Term tone="signal">manipulative interface or a fabricated product review</Term>{" "}
              is impermissible even if it increases conversion rates and leaves
              most buyers satisfied.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Deontological duties treat consumers as{" "}
              <Term tone="ink">autonomous decision makers</Term> whose choices must
              be informed rather than engineered through hidden coercion.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoDeontologicalDuty />
        </Plate>
      </Slide>

      {/* ================================================================
          07 · Virtue Ethics and Institutional Character [no-exercise]
          ================================================================ */}
      <Slide id="virtue-ethics-and-institutional-character" border className="!py-8">
        <SlideHeading>Virtue Ethics and Institutional Character</SlideHeading>
        <Statement className="!max-w-none !text-[clamp(1.35rem,2.1vw,1.8rem)]">
          <Term tone="ink">Virtue ethics</Term> shifts focus from isolated
          outcomes or formal rule compliance to the character, habits, and
          integrity of the decision maker and the institution.
        </Statement>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="counter">
            <P>
              It asks what kind of organization a firm becomes when it deploys a
              given algorithmic system, and whether the system cultivates{" "}
              <Term tone="counter">trustworthiness, honesty, and care</Term>.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              A firm that designs its AI assistant to{" "}
              <Term tone="signal">exploit loopholes in disclosure rules</Term> may
              comply with the letter of a regulation while failing the standard of
              institutional trustworthiness.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Virtue ethics explains why organizational culture, incentives, and
              engineering norms determine how teams handle ambiguous risks that
              regulations have not yet addressed.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoVirtueCharacter />
        </Plate>
      </Slide>

      {/* ================================================================
          08 · Applying Ethical Frameworks to Algorithmic Decisions [exercise]
          ================================================================ */}
      <Slide
        id="applying-ethical-frameworks-to-algorithmic-decisions"
        border
        className="!py-8"
        exercise={exercise["applying-ethical-frameworks-to-algorithmic-decisions"]}
      >
        <SlideHeading>Applying Ethical Frameworks to Algorithmic Decisions</SlideHeading>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Ruled tone="ink" className="flex flex-col justify-between">
            <P>
              <Term tone="ink">Consequentialist evaluation</Term> asks whether the net
              benefits of the system outweigh its harms across affected groups and over
              time.
            </P>
            <Plate className="mt-4">
              <IsoConsequentialism />
            </Plate>
          </Ruled>

          <Ruled tone="counter" className="flex flex-col justify-between">
            <P>
              <Term tone="counter">Deontological evaluation</Term> asks whether the
              system violates a consumer right, breaches a fiduciary or contractual
              duty, or treats individuals merely as instruments for revenue.
            </P>
            <Plate className="mt-4">
              <IsoDeontology />
            </Plate>
          </Ruled>

          <Ruled tone="ink" className="flex flex-col justify-between">
            <P>
              <Term tone="ink">Virtue-ethical evaluation</Term> asks whether deploying
              the system reflects the habits of a trustworthy, honest, and responsible
              institution.
            </P>
            <Plate className="mt-4">
              <IsoVirtueEthics />
            </Plate>
          </Ruled>
        </div>

        <div className="mt-8 border-t border-[var(--rule)] pt-5">
          <P className="max-w-[72ch]">
            An automated loan-pricing model that raises bank profits while{" "}
            <Term tone="signal">
              charging higher interest rates to applicants from specific postal codes
            </Term>{" "}
            illustrates the conflict: a narrow consequentialist metric favors
            deployment, whereas deontological non-discrimination duties and
            institutional integrity require <Term tone="ink">revision or rejection</Term>.
          </P>
          <Plate className="mt-4">
            <IsoLoanWide />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          09 · Part 2: Stakeholders and Accountability Across the AI Value Chain [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Stakeholders and Accountability Across the AI Value Chain" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,2rem)]">
            Commercial AI systems are rarely built, trained, deployed, and used
            by a single organization.
          </Statement>
          <Ruled tone="signal">
            <p className={BIG}>
              Because multiple actors contribute to the final decision that
              reaches the consumer, responsibility can become{" "}
              <span className="text-[var(--signal)]">fragmented</span> unless
              governance assigns clear accountability at each stage.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoFragmentedChain />
        </Plate>
      </Slide>

      {/* ================================================================
          10 · The AI Value Chain in Commercial Markets [no-exercise]
          ================================================================ */}
      <Slide id="the-ai-value-chain-in-commercial-markets" border className="!py-8">
        <SlideHeading>The AI Value Chain in Commercial Markets</SlideHeading>
        <ol className="grid w-full gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-5">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Foundation model developers</Term> pre-train
                  large-scale models on broad datasets and establish baseline
                  weights, safety filters, and application programming interfaces.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Downstream deploying firms</Term>, such as
                  retailers, banks, and travel platforms, fine-tune, prompt, or
                  integrate these models into customer-facing products and
                  workflows.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Digital platforms</Term> host marketplaces where
                  algorithmic rankings, advertising auctions, and conversational
                  assistants mediate between sellers and buyers.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4} tone="signal">
              <Ruled tone="signal" weight="thin">
                <P>
                  <Term tone="signal">Consumers and bystanders</Term> experience the
                  downstream consequences of the system&apos;s recommendations,
                  prices, and eligibility decisions.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={5} tone="counter">
              <Ruled tone="counter" weight="thin">
                <P>
                  <Term tone="counter">Regulators, auditors, and civil society organizations</Term>{" "}
                  monitor market outcomes and enforce statutory and industry
                  standards.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-6">
          <IsoValueChainFiveActors />
        </Plate>
      </Slide>

      {/* ================================================================
          11 · The Problem of Many Hands [exercise]
          ================================================================ */}
      <Slide
        id="the-problem-of-many-hands"
        border
        className="!py-8"
        exercise={exercise["the-problem-of-many-hands"]}
      >
        <SlideHeading>The Problem of Many Hands</SlideHeading>
        <Lead className="!max-w-none">
          The <Term tone="signal">problem of many hands</Term> arises when a
          harmful outcome is produced by the combined actions of several
          contributors, so that no single actor feels or accepts full
          responsibility.
        </Lead>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P>
              A <Term tone="ink">model developer</Term> may attribute a biased
              recommendation to the deploying retailer&apos;s system prompt and
              product catalog.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              The <Term tone="ink">deploying retailer</Term> may attribute the
              same outcome to the pre-trained weights of the foundation model or
              to historical consumer behavior in the market.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoManyHands />
        </Plate>
        <p className="type-quote mt-6 w-full border-l-2 border-[var(--counter)] bg-[var(--counter-tint)] px-7 py-5 !max-w-none !text-[clamp(1.15rem,1.75vw,1.5rem)]">
          Accountable governance resolves the problem of many hands by
          distinguishing causal contribution from legal and managerial liability:{" "}
          <span className="text-[var(--counter)]">
            the firm that deploys an AI system to customers remains accountable
          </span>{" "}
          for the decisions that system makes in its market.
        </p>
      </Slide>

      {/* ================================================================
          12 · Allocating Accountability Across Stakeholders [exercise]
          ================================================================ */}
      <Slide
        id="allocating-accountability-across-stakeholders"
        border
        className="!py-8"
        exercise={exercise["allocating-accountability-across-stakeholders"]}
      >
        <SlideHeading>Allocating Accountability Across Stakeholders</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              <Term tone="ink">Foundation model developers</Term> are accountable
              for documenting training data limitations, evaluating baseline
              capabilities and biases, and disclosing known failure modes in
              model documentation.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term tone="signal">Deploying firms</Term> are accountable for
              task-specific validation, prompt and interface configuration, human
              oversight, and monitoring outcomes across their own customer
              segments.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Platforms</Term> are accountable for the integrity
              of ranking and auction rules, the clarity of sponsorship
              disclosures, and preventing self-preferencing or deceptive design.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Auditors and ethics boards</Term> are
              accountable for independent verification, conflict-of-interest
              independence, and accurate reporting of risks to leadership and
              regulators.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoAccountabilityDossiers />
        </Plate>
      </Slide>

      {/* ================================================================
          13 · Discussion: When a Pricing Model Discriminates
          ================================================================ */}
      <Slide id="discussion-when-a-pricing-model-discriminates" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          When a Pricing Model Discriminates
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A national insurance firm licenses a third-party foundation model to
            summarize claim narratives and flag suspected fraud. An internal review
            reveals that claims written by non-native English speakers are flagged
            for investigation at twice the rate of claims with identical loss
            profiles written by native speakers. How does the problem of many hands
            appear in this case, and how should accountability be divided between
            the model vendor and the insurance firm?
          </Prompt>
          <Plate>
            <IsoInsuranceClaims />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          14 · Part 3: The Governance Gap Between Benchmarks and Markets [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="The Governance Gap Between Benchmarks and Markets" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <p className={BIG}>
              Organizations frequently rely on public AI leaderboards and
              technical benchmarks to select models for commercial deployment.
            </p>
          </Ruled>
          <Ruled tone="signal">
            <p className={BIG}>
              A core premise of this course is that{" "}
              <span className="text-[var(--signal)]">
                technical benchmark performance does not establish
              </span>{" "}
              that a model is safe, fair, or reliable in a real market setting.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoBenchmarkGap />
        </Plate>
      </Slide>

      {/* ================================================================
          15 · Technical Benchmarks Versus Market Behavior [no-exercise]
          ================================================================ */}
      <Slide id="technical-benchmarks-versus-market-behavior" border className="!py-8">
        <SlideHeading>Technical Benchmarks Versus Market Behavior</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled weight="thin">
            <P>
              Standard machine learning benchmarks evaluate accuracy on static
              collections of general tasks, such as reading comprehension,
              mathematical problem solving, or code generation.
            </P>
          </Ruled>
          <Ruled tone="counter" weight="thin">
            <P>
              Market decisions occur in{" "}
              <Term tone="counter">strategic, stochastic, and socially sensitive environments</Term>{" "}
              where there is often no single factual answer.
            </P>
          </Ruled>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              A model that scores highly on general reasoning benchmarks can
              still exhibit strong position bias in search rankings, favor
              domestic brands over foreign brands, or penalize protected
              demographic groups in customer service interactions.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              Furthermore, large language models generate{" "}
              <Term tone="signal">probabilistic outputs</Term>: the same prompt
              can yield different choices across repeated runs, and small changes
              in framing can reverse a model&apos;s recommendation (Wadi &amp;
              Fredette, 2025).
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoProbabilisticRuns />
        </Plate>
      </Slide>

      {/* ================================================================
          16 · Why Benchmark Accuracy Fails as a Governance Standard [exercise]
          ================================================================ */}
      <Slide
        id="why-benchmark-accuracy-fails-as-a-governance-standard"
        border
        className="!py-8"
        exercise={exercise["why-benchmark-accuracy-fails-as-a-governance-standard"]}
      >
        <SlideHeading>Why Benchmark Accuracy Fails as a Governance Standard</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              <Term tone="ink">Construct mismatch</Term> occurs when a benchmark
              measures general capability, such as trivia recall, rather than the
              market behavior of interest, such as fairness in credit screening or
              neutrality in product comparison.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term tone="signal">Single-sample fragility</Term> occurs when an
              evaluation tests one response per prompt rather than estimating the
              distribution of responses across repeated samples.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Prompt and context sensitivity</Term> occurs
              when a model passes safety checks under neutral test phrasings but
              exhibits bias when given realistic commercial system prompts or role
              assignments.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Benchmark contamination</Term> occurs when test
              questions appear in the model&apos;s training data, inflating
              reported scores without improving real-world generalization.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoBenchmarkFailures />
        </Plate>
      </Slide>

      {/* ================================================================
          17 · The Six Stages of Algorithmic Governance [exercise]
          ================================================================ */}
      <Slide
        id="the-six-stages-of-algorithmic-governance"
        border
        className="!py-8"
        exercise={exercise["the-six-stages-of-algorithmic-governance"]}
      >
        <SlideHeading>The Six Stages of Algorithmic Governance</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          <li className="min-w-0">
            <Numbered n={1}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Stage 1 is scoping and risk classification</Term>,
                  which identifies the decision the algorithm will inform, the
                  affected stakeholders, and the regulatory risk tier before
                  development begins.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={2}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Stage 2 is data and provenance review</Term>,
                  which audits training and operational data for consent,
                  representation gaps, historical bias, and privacy compliance.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={3} tone="signal">
              <Ruled tone="signal" weight="thin">
                <P>
                  <Term tone="signal">Stage 3 is pre-deployment behavioral auditing</Term>,
                  which tests the system under controlled experimental conditions
                  for fairness, robustness, manipulation, and task adherence.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={4}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Stage 4 is oversight and disclosure design</Term>,
                  which establishes human review gates, user-facing transparency
                  notices, and actionable recourse mechanisms.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={5} tone="counter">
              <Ruled tone="counter" weight="thin">
                <P>
                  <Term tone="counter">Stage 5 is authorization and launch sign-off</Term>,
                  in which a designated governance authority reviews the audit
                  dossier and formally approves, restricts, or rejects deployment.
                </P>
              </Ruled>
            </Numbered>
          </li>
          <li className="min-w-0">
            <Numbered n={6}>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Stage 6 is post-deployment monitoring and incident response</Term>,
                  which tracks live market outcomes for drift or disparate impact
                  and triggers rollback protocols when thresholds are breached.
                </P>
              </Ruled>
            </Numbered>
          </li>
        </ol>
        <Plate className="mt-5">
          <IsoSixStages />
        </Plate>
      </Slide>

      {/* ================================================================
          18 · Part 4: Human Oversight and Decision Regimes [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Human Oversight and Decision Regimes" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.4rem,2.3vw,2rem)]">
            Governance frameworks classify automated systems by how authority is
            shared between the algorithm and human decision makers.
          </Statement>
          <Ruled tone="signal">
            <p className={BIG}>
              Adding a human to a workflow does not automatically make a system
              safe; oversight must be designed around the{" "}
              <span className="text-[var(--signal)]">
                cognitive limits of human reviewers
              </span>
              .
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoSharedAuthority />
        </Plate>
      </Slide>

      {/* ================================================================
          19 · Human-in-the-Loop, Human-on-the-Loop, and Autonomous Regimes [exercise]
          ================================================================ */}
      <Slide
        id="human-in-the-loop-human-on-the-loop-and-autonomous-regimes"
        border
        className="!py-8"
        exercise={exercise["human-in-the-loop-human-on-the-loop-and-autonomous-regimes"]}
      >
        <SlideHeading>
          Human-in-the-Loop, Human-on-the-Loop, and Autonomous Regimes
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="counter" className="flex flex-col justify-between">
            <P>
              In a <Term tone="counter">human-in-the-loop regime</Term>, the
              algorithm generates a recommendation or score, but a human must
              actively review and approve each individual case before any action
              is taken, as in high-value commercial lending or medical triage.
            </P>
            <Plate className="mt-4">
              <IsoInTheLoop />
            </Plate>
          </Ruled>
          <Ruled tone="ink" className="flex flex-col justify-between">
            <P>
              In a <Term tone="ink">human-on-the-loop regime</Term>, the
              algorithm executes decisions automatically in real time, while a
              human operator monitors system-level dashboards and retains the
              authority to intervene, override, or shut down the system, as in
              dynamic retail pricing or fraud blocking.
            </P>
            <Plate className="mt-4">
              <IsoOnTheLoop />
            </Plate>
          </Ruled>
          <Ruled tone="signal" className="flex flex-col justify-between">
            <P>
              In a <Term tone="signal">fully autonomous regime</Term>, the
              algorithm initiates and completes actions without contemporaneous
              human review, bounded only by pre-programmed constraints and
              periodic post-hoc audits, as in programmatic ad bidding or automated
              shopping agents.
            </P>
            <Plate className="mt-4">
              <IsoAutonomous />
            </Plate>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          20 · Failure Modes of Human Oversight [no-exercise]
          ================================================================ */}
      <Slide id="failure-modes-of-human-oversight" border className="!py-8">
        <SlideHeading>Failure Modes of Human Oversight</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              <Term tone="ink">Automation bias</Term> is the tendency of human
              reviewers to defer uncritically to an algorithm&apos;s
              recommendation, failing to notice errors even when contradicting
              evidence is available.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Algorithm aversion</Term> is the opposite
              tendency to distrust and override an algorithm entirely after
              observing a single error, even when the algorithm outperforms human
              judgment on average.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Rubber-stamping</Term> occurs when reviewers are
              given too many cases, too little time, or insufficient context to
              evaluate the model&apos;s reasoning, turning human-in-the-loop
              review into a formality.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              <Term tone="signal">Moral crumple zones</Term> arise when an
              organization places a low-authority human operator in the loop
              primarily to absorb blame when a complex automated system fails.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoOversightFailures />
        </Plate>
      </Slide>

      {/* ================================================================
          21 · Matching Oversight Regimes to Decision Risk [exercise]
          ================================================================ */}
      <Slide
        id="matching-oversight-regimes-to-decision-risk"
        border
        className="!py-8"
        exercise={exercise["matching-oversight-regimes-to-decision-risk"]}
      >
        <SlideHeading>Matching Oversight Regimes to Decision Risk</SlideHeading>
        <Lead className="!max-w-none">
          The appropriate oversight regime depends on the{" "}
          <Term tone="ink">reversibility</Term> of the decision, the{" "}
          <Term tone="signal">severity of potential harm</Term> to the
          individual, and the <Term tone="counter">speed</Term> at which the
          decision must be made.
        </Lead>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled tone="signal">
            <P>
              <Term tone="signal">High-stakes, low-frequency decisions</Term>{" "}
              that are difficult to reverse, such as denying a mortgage or
              terminating an employee, require human-in-the-loop review supported
              by interpretable evidence and formal recourse.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Medium-stakes, high-frequency decisions</Term>,
              such as flagging suspicious transactions or adjusting inventory
              allocations, call for human-on-the-loop monitoring with automated
              circuit breakers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Low-stakes, high-velocity decisions</Term> where
              errors are easily corrected, such as reordering a webpage carousel,
              can operate autonomously under periodic statistical auditing.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoDecisionRiskRegimes />
        </Plate>
      </Slide>

      {/* ================================================================
          22 · Part 5: Delegated Consumption and Agent-Mediated Markets [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Delegated Consumption and Agent-Mediated Markets" />
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-none !text-[clamp(1.35rem,2.2vw,1.95rem)]">
            Artificial intelligence is no longer only a tool deployed by
            marketers; it is increasingly an{" "}
            <span className="text-[var(--signal)]">autonomous actor</span> that
            searches, evaluates, and purchases on the consumer&apos;s behalf.
          </Statement>
          <Ruled tone="counter">
            <p className={BIG}>
              This shift from human-mediated to agent-mediated exchange
              introduces a new class of governance problems that spans every week
              of this course.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoDelegatedExchange />
        </Plate>
      </Slide>

      {/* ================================================================
          23 · The AI Agent as a Surrogate Consumer [no-exercise]
          ================================================================ */}
      <Slide id="the-ai-agent-as-a-surrogate-consumer" border className="!py-8">
        <SlideHeading>The AI Agent as a Surrogate Consumer</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              An <Term tone="ink">AI shopping agent</Term> is a system built on a
              large language model that accepts a consumer&apos;s goal, inspects
              product listings, compares attributes, and recommends or executes a
              purchase.
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              When a consumer delegates search and evaluation to an AI agent, the
              agent acts as a <Term tone="counter">surrogate consumer</Term> in
              the marketplace.
            </P>
          </Ruled>
          <Ruled tone="signal">
            <P>
              In agent-mediated commerce,{" "}
              <Term tone="signal">the AI agent rather than the human shopper</Term>{" "}
              reads the search results page, processes the price framing, and
              interprets sponsorship disclosures.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Market governance must therefore examine not only how firms use
              algorithms to target humans, but also how commercial environments
              influence the AI agents that represent consumers.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <IsoSurrogateConsumer />
        </Plate>
      </Slide>

      {/* ================================================================
          24 · Dual Agency and Governance Risks in Agentic Commerce [exercise]
          ================================================================ */}
      <Slide
        id="dual-agency-and-governance-risks-in-agentic-commerce"
        border
        className="!py-8"
        exercise={exercise["dual-agency-and-governance-risks-in-agentic-commerce"]}
      >
        <SlideHeading>Dual Agency and Governance Risks in Agentic Commerce</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled tone="signal">
            <P>
              <Term tone="signal">Principal-agent conflicts</Term> arise when a
              conversational shopping assistant is deployed by an
              advertising-funded platform whose revenue depends on selling
              promoted placements, creating a conflict of duty between the
              platform and the consumer (Wadi &amp; Ma, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Heuristic and position biases</Term> arise when AI
              agents rely on cognitive shortcuts or non-monotonic position effects
              while scanning large product catalogs, leading to suboptimal
              consumer choices (Wadi &amp; Ma, 2026a, 2026b).
            </P>
          </Ruled>
          <Ruled tone="counter">
            <P>
              <Term tone="counter">Adversarial storefront manipulation</Term>{" "}
              occurs when sellers embed hidden instructions or strategic framing
              in product descriptions to hijack an agent&apos;s evaluation without
              the human shopper&apos;s knowledge.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term tone="ink">Liability ambiguity</Term> arises when an
              autonomous agent completes an unauthorized, unsuitable, or
              overpriced transaction, raising the question of whether the
              consumer, the platform, or the model developer bears the loss.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IsoDualAgencyRisks />
        </Plate>
      </Slide>

      {/* ================================================================
          25 · Discussion: The Autonomous Travel Agent
          ================================================================ */}
      <Slide id="discussion-the-autonomous-travel-agent" border className="!py-8">
        <SlideHeading kicker="Discussion:" tone="counter">
          The Autonomous Travel Agent
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A traveler instructs an AI assistant integrated into an online booking
            platform to book a quiet four-star hotel in Montreal under 250 dollars
            per night. The assistant selects a non-refundable sponsored listing with
            poor soundproofing reviews that was ranked first on the platform&apos;s
            results page. Using the ethical frameworks, value-chain accountability
            roles, and agentic governance risks introduced this week, analyze who
            bears responsibility for this outcome and what governance controls
            should have prevented it.
          </Prompt>
          <Plate>
            <IsoTravelAgentHotel />
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
            "Market algorithms scale decision rules across thousands of consumers instantly, requiring institutional governance rather than aspirational ethical principles alone.",
            "Consequentialism evaluates aggregate welfare outcomes, deontology enforces inviolable rights and duties, and virtue ethics examines institutional character and trustworthiness.",
            "The AI value chain spans model developers, deploying firms, platforms, consumers, and regulators; governance overcomes the problem of many hands by holding deploying firms accountable for market outcomes.",
            "High scores on general technical benchmarks do not guarantee fair, consistent, or unbiased behavior in commercial tasks.",
            "The six stages of algorithmic governance run from initial risk scoping and data review through pre-deployment behavioral auditing, oversight design, launch authorization, and continuous monitoring.",
            "Human-in-the-loop, human-on-the-loop, and autonomous regimes must be matched to decision stakes and reversibility while guarding against automation bias, rubber-stamping, and moral crumple zones.",
            "As consumers delegate shopping to AI agents, algorithmic governance expands to address conflicts of duty, agent heuristics, adversarial storefronts, and liability in agent-mediated markets.",
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







