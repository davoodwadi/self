"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import {
  createExerciseLookup,
  type ExerciseInput,
} from "@/lib/course-exercise";
import {
  Lead,
  Numbered,
  P,
  PartHead,
  Plate,
  Prompt,
  Ruled,
  SlideHeading,
  Statement,
  Term,
  TIGHT,
  Tint,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  ActualIdeal,
  AgentHandsOff,
  ConsiderationSets,
  DecisionPath,
  DecisionRules,
  ExtendedScene,
  ExternalSearch,
  GoalBoard,
  InformationBoard,
  RiskMoreInfo,
  SearchStreet,
  SecondDecision,
  SkipRepeat,
  StageEvaluate,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 7: CONSUMER DECISION-MAKING PROCESS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week7() {
  return (
    <SlideDeck label="Week 7">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 7
          </p>
          <p className="type-caption mt-2">
            Consumer Behavior | Davood Wadi, PhD
          </p>
          <Title className="mt-6">Consumer Decision-Making Process</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumer decision making spans{" "}
              <Tint>
                problem recognition, information search, alternative evaluation,
                product choice, and postpurchase review
              </Tint>{" "}
              across both human and AI-delegated workflows.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Consumer Decision Making
          ================================================================ */}
      <Slide className={TIGHT} id="defining-consumer-decision-making" border>
        <SlideHeading>Defining Consumer Decision Making</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Statement className="">
            <Term>Consumer decision making</Term> is the cognitive and
            behavioral process by which buyers identify a need, gather
            information, evaluate competing options, and select a course of
            action.
          </Statement>
          <Plate>
            <DecisionPath />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              Some purchases require weeks of deliberation across dozens of
              technical attributes, such as selecting a university, an
              automobile, or a residential mortgage.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Other purchases occur in less than two seconds at the shelf, such
              as replenishing a household staple.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The same individual applies analytical effort in one product
              category while relying on automatic habit in another.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Increasingly, consumers also{" "}
              <Tint>delegate portions of information search</Tint> and
              alternative comparison to autonomous AI shopping agents.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Five-Stage Model of the Decision Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-five-stage-model-of-the-decision-process"
        border
        exercise={exercise["the-five-stage-model-of-the-decision-process"]}
      >
        <SlideHeading>
          The Five-Stage Model of the Decision Process
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.65fr] lg:gap-12">
          <Lead>
            The classical cognitive model decomposes consumer decision making
            into <Term>five sequential stages</Term> (Dewey, 1910, and Engel,
            Kollat, &amp; Blackwell, 1968).
          </Lead>
          <Plate wide>
            <SkipRepeat />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Numbered n={1}>
            <P>
              Stage 1 is <Term>problem recognition</Term>, in which the consumer
              perceives a meaningful discrepancy between their current state and
              a desired state.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Stage 2 is <Term>information search</Term>, in which the consumer
              retrieves relevant knowledge from memory and consults external
              sources.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Stage 3 is <Term>evaluation of alternatives</Term>, in which the
              consumer compares the consideration set across determinant
              attributes.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Stage 4 is <Term>product choice (and purchase)</Term>, followed by
              Stage 5, <Term>postpurchase evaluation</Term>, in which experience
              with the item <Tint>updates future brand attitudes</Tint>.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 1: Problem Recognition and Levels of Effort
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-problem-recognition-and-levels-of-effort"
        border
      >
        <PartHead n={1} title="Problem Recognition and Levels of Effort" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Every decision begins when a shift in either the consumer&apos;s
            current circumstances or their aspirations{" "}
            <Tint>triggers problem recognition</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Once a problem is recognized, the consumer&apos;s level of
              involvement and category experience determine how much effort is
              invested in solving it.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Need Recognition Versus Opportunity Recognition
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="need-recognition-versus-opportunity-recognition"
        border
        exercise={exercise["need-recognition-versus-opportunity-recognition"]}
      >
        <SlideHeading>
          Need Recognition Versus Opportunity Recognition
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Problem recognition</Term> occurs whenever the perceived
              distance between the actual state and the ideal state crosses a
              threshold of awareness.
            </Lead>
            <Ruled>
              <P>
                <Term>Need recognition</Term> occurs when the consumer&apos;s
                actual state declines below the threshold, as when a laptop
                battery fails or household groceries run out.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Opportunity recognition</Term> occurs when the
                consumer&apos;s ideal state moves upward while the actual state
                remains unchanged, as when exposure to a faster smartphone makes
                a working phone feel inadequate.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ActualIdeal />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Primary demand stimulation</Term> seeks to trigger problem
              recognition for an entire product category, typically at the early
              stage of the product life cycle.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Secondary demand stimulation</Term> seeks to convince buyers
              who have already recognized a problem that a{" "}
              <Tint>specific brand offers the superior solution</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Continuum of Decision Effort: Routine, Limited, and Extended
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="continuum-of-decision-effort-routine-limited-and-extended"
        border
        exercise={
          exercise[
            "continuum-of-decision-effort-routine-limited-and-extended"
          ]
        }
      >
        <SlideHeading>
          Continuum of Decision Effort: Routine, Limited, and Extended
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Howard and Sheth (1969) classified consumer decision processes
              along a <Term>continuum of effort</Term> into three levels.
            </Lead>
            <Ruled>
              <P>
                Managerial strategy differs sharply across the continuum: market
                leaders reinforce routine response through consistent shelf
                availability, whereas challengers{" "}
                <Tint>disrupt routine habits</Tint> to trigger limited problem
                solving.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ExtendedScene />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Routine response behavior</Term> (or habitual decision
              making) applies to low-cost, frequently purchased items where the
              buyer selects a familiar brand with minimal conscious search.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Limited problem solving</Term> applies when buyers are
              familiar with the product category but evaluate an unfamiliar
              brand or variant using a few simple decision rules.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Extended problem solving</Term> applies to unfamiliar,
              expensive, or high-risk purchases where buyers gather extensive
              information and evaluate multiple attributes carefully.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Habitual Purchasing, Inertia, and Brand Switching
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="habitual-purchasing-inertia-and-brand-switching"
        border
      >
        <SlideHeading>
          Habitual Purchasing, Inertia, and Brand Switching
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Repeat purchasing of the same brand over time can reflect two
              distinct psychological states: <Term>inertia</Term> or{" "}
              <Term>brand loyalty</Term>.
            </Lead>
            <Ruled>
              <P>
                <Term>Inertia</Term> is habitual repeat buying driven by
                convenience and the desire to avoid the cognitive cost of
                comparing alternatives.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SecondDecision />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              A shopper acting under inertia lacks deep commitment to the brand
              and will switch readily if the habitual item is out of stock or a
              competitor displays a prominent point-of-sale discount.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Variety seeking</Term> is the opposite tendency, in which
              consumers switch among familiar brands in categories such as
              snacks or beverages simply to{" "}
              <Tint>relieve sensory boredom</Tint> (McAlister &amp; Pessemier,
              1982).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Retailers encourage variety seeking through end-aisle sampling and
              multi-flavor variety packs.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Information Search and Perceived Risk
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-information-search-and-perceived-risk"
        border
      >
        <PartHead n={2} title="Information Search and Perceived Risk" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            After recognizing a problem that cannot be resolved by automatic
            habit, the consumer{" "}
            <Tint>searches for information to identify and evaluate</Tint>{" "}
            potential solutions.
          </Statement>
          <Ruled>
            <Lead>
              The breadth and depth of search depend on prior category
              knowledge, search costs, and the level of perceived risk.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Internal Search Versus External Information Sources
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="internal-search-versus-external-information-sources"
        border
        exercise={
          exercise["internal-search-versus-external-information-sources"]
        }
      >
        <SlideHeading>
          Internal Search Versus External Information Sources
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Information search divides into two modes that typically operate
              in sequence: <Term>internal search</Term> and{" "}
              <Term>external search</Term>.
            </Lead>
            <Ruled>
              <P>
                <Term>Internal search</Term> is the process of scanning
                long-term memory to retrieve prior brand experiences,
                advertising claims, and category schemas.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ExternalSearch />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When internal search provides insufficient confidence, the
              consumer supplements it with <Term>external search</Term> by
              acquiring information from the environment.
            </P>
          </Ruled>
          <Ruled>
            <P>
              External sources are classified into{" "}
              <Term>marketer-controlled sources</Term> (advertising, packaging,
              brand websites, sales staff),{" "}
              <Term>independent public sources</Term> (consumer testing
              organizations, editorial reviews), and{" "}
              <Term>interpersonal sources</Term> (friends, family, and user
              reviews).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Deliberate prepurchase search</Term> is directed at an
              immediate buying task, whereas <Term>ongoing search</Term> is
              conducted regularly by category enthusiasts to{" "}
              <Tint>stay informed and enjoy browsing</Tint> (Bloch, Sherrell,
              &amp; Ridgway, 1986).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Economics of Information Search and Prior Expertise
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="economics-of-information-search-and-prior-expertise"
        border
      >
        <SlideHeading>
          Economics of Information Search and Prior Expertise
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              From an information-economics perspective, consumers continue
              searching only as long as the{" "}
              <Term>expected marginal benefit</Term> of discovering a better
              price or attribute exceeds the <Term>marginal cost of search</Term>{" "}
              in time and mental effort (Stigler, 1961).
            </Lead>
            <Ruled>
              <P>
                Empirical research reveals an <Term>inverted-U relationship</Term>{" "}
                between a consumer&apos;s prior category knowledge and the
                amount of external search conducted (Bettman &amp; Park, 1980).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <SearchStreet />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Complete novices</Term> often search less than moderately
              knowledgeable buyers because novices do not know which technical
              attributes to compare or how to interpret specification tables.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>True experts</Term> also conduct less external search
              because they already store well-organized category knowledge in
              long-term memory and can narrow options immediately.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Moderately knowledgeable consumers</Term>{" "}
              <Tint>search the most</Tint>, as they understand enough to
              formulate questions while still needing external data to compare
              specific models.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Five Types of Perceived Risk
          ================================================================ */}
      <Slide className={TIGHT} id="five-types-of-perceived-risk" border>
        <SlideHeading>Five Types of Perceived Risk</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.65fr] lg:gap-12">
          <Lead>
            <Term>Perceived risk</Term> is the consumer&apos;s belief that
            purchasing or using a product may produce negative consequences that
            cannot be anticipated with certainty (Bauer, 1960).
          </Lead>
          <Plate wide>
            <RiskMoreInfo />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              <Term>Monetary (financial) risk</Term> is the potential loss of
              money if a purchase fails or turns out to be overpriced relative
              to alternatives.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Functional (performance) risk</Term> is the possibility that
              the product will not perform its intended technical task reliably.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Physical risk</Term> is the threat of bodily harm, illness,
              or safety hazards arising from product use.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Social risk</Term> is the danger of embarrassment or
              disapproval from peers, while <Term>psychological risk</Term> is
              the threat of{" "}
              <Tint>bruised self-esteem or guilt from making a poor judgment</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Reducing Perceived Risk in an Unfamiliar Category
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-reducing-perceived-risk-in-an-unfamiliar-category"
        border
      >
        <SlideHeading kicker="Discussion:">
          Reducing Perceived Risk in an Unfamiliar Category
        </SlideHeading>
        <Prompt>
          A consumer electronics startup is launching a 1,400-dollar smart home
          energy battery designed for apartment renters. Prospective buyers have
          moderate technical familiarity but express high functional, monetary,
          and physical risk concerns. Which specific external information
          sources, warranty structures, and trial mechanisms should the firm
          deploy to lower each of those three risk dimensions during prepurchase
          search?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Delegated Search and Goal Specificity in AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-delegated-search-and-goal-specificity-in-ai-agents"
        border
      >
        <PartHead
          n={3}
          title="Delegated Search and Goal Specificity in AI Agents"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Consumers can now{" "}
            <Tint>delegate prepurchase information search</Tint> and product
            comparison to autonomous AI shopping agents.
          </Statement>
          <Ruled>
            <Lead>
              Process-tracing experiments show that how much information an AI
              agent acquires depends on both lookup costs and the specificity of
              the user&apos;s delegation instruction.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Process Tracing of Human and Algorithmic Information Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="process-tracing-of-human-and-algorithmic-information-search"
        border
      >
        <SlideHeading>
          Process Tracing of Human and Algorithmic Information Search
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              In classical consumer research, <Term>process-tracing methods</Term>{" "}
              such as Mouselab record which attribute cells a shopper opens, in
              what order, and for how long before making a choice (Payne,
              Bettman, &amp; Johnson, 1993).
            </Lead>
            <Ruled>
              <P>
                The same paradigm can be applied to <Term>AI shopping agents</Term>{" "}
                when product attributes are placed behind explicit tool calls or
                expandable lookup fields (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <InformationBoard />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In realistic online storefronts, neither a human shopper nor an AI
              agent sees every product detail on the summary search page.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Inspecting net package weight, warranty exclusions, or ingredient
              breakdowns requires clicking into individual product pages or
              executing additional API queries.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Observing which attributes an agent inspects before choosing{" "}
              <Tint>separates mistakes caused by incomplete search</Tint> from
              mistakes caused by flawed reasoning (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Information Acquisition Costs in Delegated Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="information-acquisition-costs-in-delegated-search"
        border
        exercise={exercise["information-acquisition-costs-in-delegated-search"]}
      >
        <SlideHeading>
          Information Acquisition Costs in Delegated Search
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Every information lookup performed by an AI shopping agent incurs
              a <Term>cost</Term> in latency, token consumption, or explicit API
              fees.
            </Lead>
            <Ruled>
              <P>
                In controlled experiments where looking up hidden product
                attributes was free, AI shopping agents inspected the necessary
                fields and rarely selected dominated products (Wadi &amp; Ma,
                2026b).
              </P>
            </Ruled>
          </div>
          <Plate>
            <AgentHandsOff />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When each attribute lookup carried a cost, however, agents{" "}
              <Term>curtailed their search early</Term> and frequently made a
              final selection without opening diagnostic attributes such as
              package weight (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Truncated search caused agents to select inferior options that
              appeared attractive on surface attributes such as headline price
              (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Thus, just as time pressure and search friction limit human
              external search,{" "}
              <Tint>lookup costs constrain the information acquisition</Tint> of
              AI shopping agents.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Goal Specificity in the Delegation Instruction
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="goal-specificity-in-the-delegation-instruction"
        border
        exercise={exercise["goal-specificity-in-the-delegation-instruction"]}
      >
        <SlideHeading>
          Goal Specificity in the Delegation Instruction
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              The <Term>delegation instruction</Term> is the prompt in which the
              consumer specifies the purchasing task for the AI agent.
            </Lead>
            <Ruled>
              <P>
                A <Term>vague instruction</Term> leaves the optimization
                criterion ambiguous, such as asking the agent to &ldquo;find the
                best deal on instant coffee.&rdquo;
              </P>
            </Ruled>
            <Ruled>
              <P>
                A <Term>specific instruction</Term> states the exact evaluation
                metric, such as asking the agent to &ldquo;find the instant
                coffee with the lowest price per ounce.&rdquo;
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <GoalBoard />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              In an experimental test comparing a 10-ounce coffee priced at 4.99
              dollars against an 11-ounce coffee priced at 5.00 dollars (where
              the 5.00-dollar jar has the lower price per ounce), agents given a
              vague goal under lookup costs often skipped the weight field and
              selected the 4.99-dollar jar (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              When the consumer&apos;s instruction{" "}
              <Tint>explicitly specified minimizing price per ounce</Tint>,
              agents continued looking up package weights despite the lookup
              cost and selected the superior 11-ounce option (Wadi &amp; Ma,
              2026b).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Categorization and the Consideration Set
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-categorization-and-the-consideration-set"
        border
      >
        <PartHead n={4} title="Categorization and the Consideration Set" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Because consumers cannot evaluate every brand available in a market,
            they <Tint>partition the total assortment into smaller mental subsets</Tint>{" "}
            before applying decision rules.
          </Statement>
          <Ruled>
            <Lead>
              Product categorization and determinant attributes govern which
              brands survive screening and how they are compared.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          From the Awareness Set to the Consideration Set
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="from-the-awareness-set-to-the-consideration-set"
        border
        exercise={exercise["from-the-awareness-set-to-the-consideration-set"]}
      >
        <SlideHeading>
          From the Awareness Set to the Consideration Set
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.6fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Within any product category, the total set of available brands is
              first divided into the <Term>awareness set</Term> (brands the
              buyer knows) and the <Term>unawareness set</Term>.
            </Lead>
            <Ruled>
              <P>
                The <Term>evoked set</Term> comprises the brands the consumer
                retrieves from memory (or receives from a search tool) when
                confronting a purchase occasion.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Brands known to the consumer are further sorted into three
                functional subsets: the <Term>consideration set</Term>, the{" "}
                <Term>inept set</Term>, and the <Term>inert set</Term> (Narayana
                &amp; Markin, 1975).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ConsiderationSets />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              The <Term>consideration set</Term> includes the{" "}
              <Tint>few brands the consumer actively and positively evaluates</Tint>{" "}
              for purchase.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>inept set</Term> contains brands rejected from
              consideration because of a past negative experience or unfavorable
              positioning, while the <Term>inert set</Term> contains brands
              toward which the buyer holds no strong evaluation.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Product Categorization Levels and Exemplar Brands
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="product-categorization-levels-and-exemplar-brands"
        border
      >
        <SlideHeading>
          Product Categorization Levels and Exemplar Brands
        </SlideHeading>
        <Lead>
          Consumers organize product knowledge in{" "}
          <Term>hierarchical category structures</Term> with three primary
          levels: superordinate, basic, and subordinate (Rosch et al., 1976).
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              The <Term>superordinate level</Term> is broad and abstract (such
              as &ldquo;beverages&rdquo;), the <Term>basic level</Term> groups
              items with shared core attributes (such as &ldquo;soft
              drinks&rdquo;), and the <Term>subordinate level</Term>{" "}
              distinguishes specific variants (such as &ldquo;diet cola&rdquo;).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Category exemplars</Term> are prototypical brands that
              define the standard for a category in consumer memory, such as
              Kleenex for facial tissues or Jeep for off-road vehicles.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Moderately incongruent products</Term> that differ slightly
              from the category prototype stimulate curiosity and cognitive
              elaboration without confusing the buyer (Meyers-Levy &amp; Tybout,
              1989).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Positioning a new product requires choosing{" "}
              <Tint>which category level and exemplar comparison</Tint> frame
              its benefits most favorably.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Determinant Attributes and Diagnostic Signals
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="determinant-attributes-and-diagnostic-signals"
        border
      >
        <SlideHeading>
          Determinant Attributes and Diagnostic Signals
        </SlideHeading>
        <Lead>
          <Term>Evaluative criteria</Term> are the dimensions a consumer uses to
          judge the merits of competing options, such as price, safety rating,
          warranty length, and design.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              Not all important attributes influence the final brand choice
              equally.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Salient attributes</Term> are features consumers think of
              first when asked about a category, such as having four wheels and
              functional brakes on a new passenger car.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Determinant attributes</Term> are the specific features that
              both matter to the buyer and perceivedly differ across competing
              brands, thereby <Tint>determining which option wins</Tint>{" "}
              (Alpert, 1971).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Effective positioning differentiates the brand on a determinant
              attribute rather than spending budget advertising a salient
              attribute that every competitor already matches.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Compensatory and Noncompensatory Decision Rules
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-compensatory-and-noncompensatory-decision-rules"
        border
      >
        <PartHead
          n={5}
          title="Compensatory and Noncompensatory Decision Rules"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Once the consideration set and determinant attributes are
            established, the consumer{" "}
            <Tint>applies a decision rule (heuristic or analytical)</Tint> to
            select a single alternative.
          </Statement>
          <Ruled>
            <Lead>
              Decision rules divide into two fundamental families: compensatory
              rules and noncompensatory rules.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Compensatory Decision Rules: Simple and Weighted Additive
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="compensatory-decision-rules-simple-and-weighted-additive"
        border
      >
        <SlideHeading>
          Compensatory Decision Rules: Simple and Weighted Additive
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Compensatory decision rules</Term> allow a perceived
              weakness on one product attribute to be{" "}
              <Tint>offset by a strong performance</Tint> on another attribute.
            </Lead>
            <Ruled>
              <P>
                Under the <Term>simple additive rule</Term>, the consumer counts
                the number of attributes on which each brand performs well and
                selects the option with the largest number of positive features.
              </P>
            </Ruled>
          </div>
          <Plate>
            <StageEvaluate />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Under the <Term>weighted additive rule</Term>, the consumer
              assigns an importance weight to each attribute, multiplies each
              brand&apos;s attribute rating by that weight, and sums the
              weighted scores.
            </P>
          </Ruled>
          <Ruled>
            <P>
              For example, a laptop with mediocre battery life can still achieve
              the highest weighted score if its processor speed and lightweight
              chassis receive high importance weights.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because compensatory rules require inspecting and combining
              multiple attributes across all candidates, they are used primarily
              when involvement is high or the candidate set is small.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Noncompensatory Rules: Lexicographic, Elimination-by-Aspects, and Conjunctive
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="noncompensatory-rules-lexicographic-elimination-by-aspects-and-conjunctive"
        border
        exercise={
          exercise[
            "noncompensatory-rules-lexicographic-elimination-by-aspects-and-conjunctive"
          ]
        }
      >
        <SlideHeading>
          Noncompensatory Rules: Lexicographic, Elimination-by-Aspects, and
          Conjunctive
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Noncompensatory decision rules</Term> do not permit
              trade-offs across attributes: a{" "}
              <Tint>failure to meet a threshold on one attribute</Tint>{" "}
              eliminates the brand regardless of its strengths elsewhere.
            </Lead>
            <Ruled>
              <P>
                Under the <Term>lexicographic rule</Term>, the consumer ranks
                attributes by importance, compares all brands on the single most
                important attribute, and selects the winner (moving to the
                second attribute only to break a tie).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <DecisionRules />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Under the <Term>elimination-by-aspects (EBA) rule</Term>, the
              consumer evaluates attributes sequentially in order of importance
              and eliminates any option that falls below a minimum cutoff on
              each attribute (Tversky, 1972).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Under the <Term>conjunctive rule</Term>, the consumer establishes
              minimum cutoff thresholds across all relevant attributes
              simultaneously and rejects any brand that fails even a single
              threshold.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Under the <Term>disjunctive rule</Term>, the consumer accepts any
              brand that exceeds a high excellence threshold on at least one key
              attribute.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Phased Decision Strategies in Complex Assortments
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="phased-decision-strategies-in-complex-assortments"
        border
      >
        <SlideHeading>
          Phased Decision Strategies in Complex Assortments
        </SlideHeading>
        <Lead>
          When confronting large retail assortments containing dozens of
          alternatives, consumers rarely rely on a single decision rule from
          start to finish.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              Instead, buyers adopt a{" "}
              <Term>two-stage (or phased) decision strategy</Term> that balances
              cognitive effort against decision accuracy (Bettman, Luce, &amp;
              Payne, 1998).
            </P>
          </Ruled>
          <Ruled>
            <P>
              In the <Term>first phase</Term>, the consumer applies a fast
              noncompensatory rule (such as conjunctive filtering or
              elimination-by-aspects) to screen out unacceptable options and
              reduce thirty brands to three or four.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In the <Term>second phase</Term>, the consumer applies a careful
              compensatory rule (such as weighted additive comparison) to{" "}
              <Tint>evaluate trade-offs among the surviving finalists</Tint>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Online search filters and AI shopping assistants mirror this
              phased architecture when they apply hard constraint filters before
              scoring the remaining candidates.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Writing a Delegation Prompt for an AI Shopping Agent
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-writing-a-delegation-prompt-for-an-ai-shopping-agent"
        border
      >
        <SlideHeading kicker="Discussion:">
          Writing a Delegation Prompt for an AI Shopping Agent
        </SlideHeading>
        <Prompt>
          Suppose a student household wants to delegate the purchase of a
          countertop microwave oven to an AI shopping agent operating on an
          online marketplace where dimensions, wattage, and warranty terms
          require separate page lookups. Drawing on phased decision rules and
          the findings of Wadi and Ma (2026b) on lookup costs and goal
          specificity, write both a vague delegation prompt that risks a poor
          choice and a well-structured delegation prompt that specifies
          conjunctive cutoffs and a compensatory optimization rule.
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Numbered n={1}>
            <P>
              The classical decision process comprises five stages: problem
              recognition, information search, evaluation of alternatives,
              product choice, and postpurchase evaluation.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Problem recognition arises from need recognition (a drop in the
              actual state) or opportunity recognition (a rise in the ideal
              state), and decision effort spans routine response behavior,
              limited problem solving, and extended problem solving.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Information search combines internal memory retrieval with
              external sources, follows an inverted-U curve across prior
              category knowledge, and expands as monetary, functional, physical,
              social, or psychological risk increases.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              When search is delegated to an AI agent, attribute lookup costs
              cause agents to curtail search early unless the user&apos;s
              delegation instruction states a specific evaluation goal.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Consumers narrow the total market to an awareness set, an evoked
              set, and a consideration set (distinct from the inept and inert
              sets) before evaluating determinant attributes.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Choice among alternatives relies on compensatory rules (simple and
              weighted additive), noncompensatory rules (lexicographic,
              elimination-by-aspects, conjunctive, disjunctive), or phased
              combinations of both.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
