"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Big,
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
  BuysUses,
  ConsumptionCycle,
  DelegatedPurchase,
  FamilyCar,
  FourPulls,
  HiddenUnitPrice,
  NeedWantTrio,
  SegmentationPillars,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 1: INTRODUCTION TO CONSUMER BEHAVIOR
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week1() {
  return (
    <SlideDeck label="Week 1">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 1
          </p>
          <p className="type-caption mt-2">Consumer Behavior | Davood Wadi, PhD</p>
          <Title className="mt-6">Introduction to Consumer Behavior</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumer behavior examines how{" "}
              <Tint>individuals, groups, and delegated AI agents</Tint> select,
              purchase, use, and dispose of products and services to satisfy
              needs.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Consumer Behavior
          ================================================================ */}
      <Slide className={TIGHT} id="defining-consumer-behavior" border>
        <SlideHeading>Defining Consumer Behavior</SlideHeading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.3rem,2.1vw,1.75rem)]">
          <Term>Consumer behavior</Term> is the study of the processes involved
          when individuals or groups select, purchase, use, or dispose of
          products, services, ideas, or experiences to satisfy needs and
          desires.
        </Statement>
        <Lead className="mt-6">
          The transaction at the checkout is only one moment in a broader
          sequence of psychological and social events.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Before buying, consumers recognize problems, gather information,
              and compare alternatives.
            </P>
          </Ruled>
          <Ruled>
            <P>
              After buying, consumers evaluate product performance, experience
              satisfaction or regret, and decide whether to repurchase.
            </P>
          </Ruled>
          <Ruled>
            <Big className="!text-[clamp(1.15rem,1.65vw,1.4rem)]">
              Effective marketing strategy requires{" "}
              <Tint>analyzing the entire sequence</Tint> rather than only the
              point of sale.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Why Consumer Behavior Matters to Marketing Strategy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="why-consumer-behavior-matters-to-marketing-strategy"
        border
      >
        <SlideHeading>
          Why Consumer Behavior Matters to Marketing Strategy
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement className="!max-w-[34ch] !text-[clamp(1.3rem,2vw,1.7rem)]">
              Every core marketing decision, including product design, pricing,
              distribution, and promotion, rests on{" "}
              <Tint>assumptions about how buyers respond</Tint>.
            </Statement>
            <Ruled>
              <P>
                Studying consumer behavior also helps individuals understand the
                psychological and environmental cues that shape their own
                spending decisions.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                A firm that understands how consumers <Term>perceive value</Term>{" "}
                can design products that solve real problems rather than adding
                unused features.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A firm that understands <Term>when and where consumers search</Term>{" "}
                can place information in the channels buyers actually consult.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Public policy makers and regulators</Term> also study
                consumer behavior to protect buyers from deceptive practices and
                unsafe products.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: The Consumption Process and Market Segmentation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-the-consumption-process-and-market-segmentation"
        border
      >
        <PartHead
          n={1}
          title="The Consumption Process and Market Segmentation"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,2vw,1.65rem)]">
            Consumption unfolds across <Tint>three sequential stages</Tint>, and
            each stage raises distinct questions for both the buyer and the
            marketer.
          </Statement>
          <Ruled>
            <Lead>
              Because buyers differ in their needs, resources, and habits,
              marketers divide heterogeneous markets into smaller segments with
              shared characteristics.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Three Stages of Consumption
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-three-stages-of-consumption"
        border
        exercise={exercise["the-three-stages-of-consumption"]}
      >
        <SlideHeading>The Three Stages of Consumption</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="!max-w-[28ch] !text-[clamp(1.25rem,1.9vw,1.6rem)]">
              Consumption is organized into three stages:{" "}
              <Term>prepurchase</Term>, <Term>purchase</Term>, and{" "}
              <Term>postpurchase</Term>.
            </Statement>
            <Ruled>
              <P>
                Postpurchase outcomes determine <Tint>repeat sales</Tint>,
                product returns, and word-of-mouth recommendations, feeding
                directly into future prepurchase decisions.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ConsumptionCycle />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              In the <Term>prepurchase stage</Term>, the consumer recognizes a
              need, searches for information, and evaluates alternatives, while
              the marketer studies how attitudes form and which cues attract
              attention.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              In the <Term>purchase stage</Term>, the consumer experiences the
              retail environment, time pressure, and payment process, while the
              marketer manages packaging, shelf placement, and checkout
              friction.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              In the <Term>postpurchase stage</Term>, the consumer uses the
              item, evaluates whether it met expectations, and eventually
              disposes of it.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Needs, Wants, and Market Demand
          ================================================================ */}
      <Slide className={TIGHT} id="needs-wants-and-market-demand" border>
        <SlideHeading>Needs, Wants, and Market Demand</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              A <Term>need</Term> is a basic biological or psychological
              requirement, such as hydration, physical safety, or social
              belonging.
            </P>
            <P className="mt-3">
              Needs are inherent to the human condition and exist prior to any
              marketing activity.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>want</Term> is the specific product, brand, or cultural
              form chosen to satisfy an underlying need.
            </P>
            <P className="mt-3">
              Two consumers experiencing the same need for hydration may want
              sparkling water, iced coffee, or hot tea depending on culture and
              habit.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <Ruled>
            <Statement className="!max-w-[34ch] !text-[clamp(1.2rem,1.8vw,1.5rem)]">
              <Term>Demand</Term> occurs when a want is backed by both the
              financial ability and the willingness to pay, and{" "}
              <Tint>marketing shapes wants</Tint> rather than creating basic
              needs.
            </Statement>
          </Ruled>
          <Plate wide>
            <NeedWantTrio />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Market Segmentation Bases
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="market-segmentation-bases"
        border
        exercise={exercise["market-segmentation-bases"]}
      >
        <SlideHeading>Market Segmentation Bases</SlideHeading>
        <Lead>
          <Term>Market segmentation</Term> divides a broad market into distinct
          subsets of consumers who share common needs, priorities, or behavioral
          patterns.
        </Lead>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.3fr] lg:gap-12">
          <ol className="grid w-full gap-6 sm:grid-cols-2">
            <Ruled>
              <P>
                <Term>Geographic segmentation</Term> groups buyers by physical
                location, region, urban density, or climate.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Demographic segmentation</Term> groups buyers by
                observable statistics such as age, income, education,
                occupation, and household structure.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Psychographic segmentation</Term> groups buyers by
                psychological traits, values, interests, and lifestyles.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Behavioral segmentation</Term> groups buyers by their
                observed actions toward a product category, including usage
                frequency, occasion, and brand loyalty.
              </P>
            </Ruled>
          </ol>
          <Plate wide>
            <SegmentationPillars />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Buyers, Users, and Decision Roles
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-buyers-users-and-decision-roles"
        border
      >
        <PartHead n={2} title="Buyers, Users, and Decision Roles" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,2vw,1.65rem)]">
            Many market transactions involve more than one person, separating
            the <Tint>individual who pays</Tint> for a product from the{" "}
            <Tint>individual who uses</Tint> it.
          </Statement>
          <Ruled>
            <Lead>
              Analyzing a purchase therefore requires identifying every
              participant in the decision unit and the specific role each
              participant plays.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Customers Versus Consumers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customers-versus-consumers"
        border
        exercise={exercise["customers-versus-consumers"]}
      >
        <SlideHeading>Customers Versus Consumers</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <P>
              In everyday speech, the terms customer and consumer are often
              treated as synonyms, but they describe distinct roles in marketing
              analysis.
            </P>
            <div className="grid w-full gap-6 sm:grid-cols-2">
              <Ruled>
                <P>
                  A <Term>customer</Term> is the person or organization that
                  purchases and pays for a good or service.
                </P>
              </Ruled>
              <Ruled>
                <P>
                  A <Term>consumer</Term> is the person who actually uses or
                  experiences the good or service.
                </P>
              </Ruled>
            </div>
          </div>
          <Plate wide>
            <BuysUses />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              When a parent buys infant formula at a pharmacy, the{" "}
              <Term>parent is the customer</Term> and the{" "}
              <Term>infant is the consumer</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers must <Tint>address both roles simultaneously</Tint>,
              designing packaging and pricing that persuade the customer while
              delivering product performance that satisfies the consumer.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Household Decision-Making Roles
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="household-decision-making-roles"
        border
        exercise={exercise["household-decision-making-roles"]}
      >
        <SlideHeading>Household Decision-Making Roles</SlideHeading>
        <Lead>
          A single purchase decision often distributes{" "}
          <Tint>five distinct roles</Tint> across one or more people.
        </Lead>
        <ol className="mt-6 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Numbered n={1}>
            <P>
              The <Term>initiator</Term> is the person who first recognizes an
              unmet need or proposes acquiring a product.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The <Term>gatekeeper</Term> or information gatherer controls the
              flow of product information that reaches the group.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              The <Term>influencer</Term> provides recommendations, expertise,
              or preferences that sway how alternatives are evaluated.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              The <Term>buyer</Term> executes the transaction and pays for the
              item, while the <Term>user</Term> consumes the product and judges
              its performance in daily life.
            </P>
          </Numbered>
        </ol>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <FamilyCar />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Individual Consumers Versus Organizational Buyers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="individual-consumers-versus-organizational-buyers"
        border
      >
        <SlideHeading>
          Individual Consumers Versus Organizational Buyers
        </SlideHeading>
        <Statement className="!max-w-[46ch] !text-[clamp(1.25rem,1.95vw,1.65rem)]">
          <Term>Individual consumers</Term> purchase goods and services for
          personal or household use, whereas <Term>organizational buyers</Term>{" "}
          purchase to run a business, institution, or government agency.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Organizational buying typically involves higher dollar volumes,
              formal technical specifications, and negotiated contracts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              While a consumer often decides alone or within a household,
              organizational purchases are frequently governed by a formal{" "}
              <Term>buying center</Term> composed of engineers, procurement
              officers, and department managers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Organizational demand is <Term>derived demand</Term> because a
              manufacturer&apos;s need for components depends directly on
              consumer demand for the finished product.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Despite these structural differences, organizational buyers are
              still <Tint>human decision makers</Tint> influenced by perceived
              risk, brand reputation, and cognitive shortcuts.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Diagnosing a Postpurchase Failure
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-diagnosing-a-postpurchase-failure"
        border
      >
        <SlideHeading kicker="Discussion:">
          Diagnosing a Postpurchase Failure
        </SlideHeading>
        <Prompt>
          A manufacturer of ergonomic office chairs sells both directly to
          remote workers online and in bulk to corporate procurement teams. Over
          the past quarter, online consumer return rates rose to 18 percent
          while corporate reorders remained stable. How do the customer, user,
          and influencer roles differ across these two channels, and which stage
          of the consumption process should the marketing team investigate first
          to explain the divergence?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Beyond the Rational Consumer Model
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-beyond-the-rational-consumer-model"
        border
      >
        <PartHead n={3} title="Beyond the Rational Consumer Model" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,2vw,1.65rem)]">
            Classical economic theory modeled the buyer as a{" "}
            <Term>rational optimizer</Term> who inspects every available option,
            calculates expected utility, and selects the mathematically superior
            choice.
          </Statement>
          <Ruled>
            <Lead>
              Empirical consumer research demonstrates that real buyers operate
              under{" "}
              <Tint>strict constraints of time, attention, and memory</Tint>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Assumptions of the Rational Economic Buyer
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="assumptions-of-the-rational-economic-buyer"
        border
      >
        <SlideHeading>Assumptions of the Rational Economic Buyer</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              The classical economic model assumes that consumers possess{" "}
              <Term>complete information</Term> about all available brands,
              prices, and technical attributes.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              It assumes that consumers have{" "}
              <Term>stable, well-defined preferences</Term> that do not shift
              with how a question or price tag is worded.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              It further assumes that consumers have the{" "}
              <Term>computational capacity and time</Term> required to weigh
              every attribute trade-off before acting.
            </P>
          </Numbered>
        </div>
        <div className="mt-10 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Under these assumptions, marketing would serve only to transmit
              objective facts about price and product availability.
            </P>
          </Ruled>
          <Ruled>
            <Big className="!text-[clamp(1.15rem,1.65vw,1.4rem)]">
              In practice, <Tint>few consumer markets satisfy these conditions</Tint>,
              especially when assortments contain hundreds of competing items.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Bounded Rationality and Psychological Influences
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="bounded-rationality-and-psychological-influences"
        border
        exercise={exercise["bounded-rationality-and-psychological-influences"]}
      >
        <SlideHeading>
          Bounded Rationality and Psychological Influences
        </SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                <Term>Bounded rationality</Term> recognizes that human decision
                makers have limited time, attention, and working memory, leading
                them to rely on simplifying mental rules.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Emotional states</Term> such as stress, excitement, or
                nostalgia alter how buyers evaluate risk and product
                attractiveness.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Social context</Term> shapes choices because consumers
                seek approval from peers and use visible possessions to signal
                identity.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Habit and brand familiarity</Term> allow shoppers to
                repeat satisfactory past choices without recalculating costs on
                every trip to the store.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Plate wide>
              <FourPulls />
            </Plate>
            <Ruled>
              <Big className="!text-[clamp(1.15rem,1.65vw,1.4rem)]">
                Marketing predictions fail when managers model consumers as
                purely analytical calculators rather than{" "}
                <Tint>adaptive psychological actors</Tint>.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Interdisciplinary Foundations of Consumer Research
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="interdisciplinary-foundations-of-consumer-research"
        border
      >
        <SlideHeading>
          Interdisciplinary Foundations of Consumer Research
        </SlideHeading>
        <Lead>
          Because consumption spans mental processes and social structures,
          consumer behavior draws methods and theories from{" "}
          <Tint>several academic disciplines</Tint>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              <Term>Cognitive and experimental psychology</Term> examine how
              individuals perceive stimuli, form memories, and process
              persuasive messages.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Social psychology and sociology</Term> examine how reference
              groups, family structures, and social class influence individual
              preferences.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Cultural anthropology</Term> examines the shared rituals,
              myths, and symbolic meanings attached to possessions across
              societies.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Behavioral economics and computer science</Term> now extend
              this foundation to study how human buyers interact with digital
              platforms and autonomous algorithms.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: The AI Agent as a Surrogate Consumer
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-the-ai-agent-as-a-surrogate-consumer"
        border
      >
        <PartHead n={4} title="The AI Agent as a Surrogate Consumer" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,2vw,1.65rem)]">
            Consumers do not always conduct product search and comparison
            themselves. They frequently{" "}
            <Tint>delegate parts of the decision process</Tint> to external
            intermediaries.
          </Statement>
          <Ruled>
            <Lead>
              Large language models and autonomous software tools now extend
              surrogate consumption from high-end services to everyday retail
              purchasing.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Human Surrogate Consumers in the Marketplace
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="human-surrogate-consumers-in-the-marketplace"
        border
      >
        <SlideHeading>
          Human Surrogate Consumers in the Marketplace
        </SlideHeading>
        <Statement className="!max-w-[44ch] !text-[clamp(1.25rem,1.95vw,1.65rem)]">
          A <Term>surrogate consumer</Term> is an external agent retained by a
          buyer to guide, direct, or execute marketplace activities on the
          buyer&apos;s behalf (Solomon, 1986).
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Interior decorators, stockbrokers, travel agents, and personal
              shoppers have long acted as human surrogates in complex or
              unfamiliar categories.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers turn to a surrogate when they lack specialized category
              expertise, face severe time pressure, or wish to reduce the
              perceived risk of an expensive mistake.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When a surrogate is employed, the marketer must{" "}
              <Tint>persuade the professional intermediary</Tint> as well as the
              end user.
            </P>
          </Ruled>
          <Ruled>
            <P>
              For example, pharmaceutical firms communicate clinical evidence to
              prescribing physicians while addressing patient adherence
              separately.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Delegating Search, Evaluation, and Purchase to AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="delegating-search-evaluation-and-purchase-to-ai-agents"
        border
        exercise={
          exercise["delegating-search-evaluation-and-purchase-to-ai-agents"]
        }
      >
        <SlideHeading>
          Delegating Search, Evaluation, and Purchase to AI Agents
        </SlideHeading>
        <Lead>
          An <Term>AI shopping agent</Term> is a software system built on a
          language model that can search catalogs, compare product
          specifications, and execute transactions for a user.
        </Lead>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <DelegatedPurchase />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              In delegated shopping, the consumer specifies a goal and
              constraints, such as finding running shoes for flat feet under 120
              dollars.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The AI agent queries retail databases, reads product attributes
              and customer reviews, and narrows dozens of listings to a short
              recommendation list or a single purchase.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Unlike traditional human surrogates that were too costly for
              routine purchases, AI agents can be deployed at near-zero marginal
              cost for everyday grocery and household orders.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The quality of the outcome depends on both{" "}
              <Tint>how clearly the consumer states the goal</Tint> and which
              product data the agent can access.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How AI Delegation Reshapes Decision Roles
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="how-ai-delegation-reshapes-decision-roles"
        border
      >
        <SlideHeading>How AI Delegation Reshapes Decision Roles</SlideHeading>
        <Lead>
          Delegating a purchase to an AI agent redistributes the classic
          decision roles within the consumption process.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              The <Term>human consumer</Term> retains the role of{" "}
              <Term>initiator</Term> by recognizing the need and stating the
              prompt, and remains the final <Term>user</Term> who experiences
              the product after delivery.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>AI agent</Term> assumes the roles of{" "}
              <Term>gatekeeper</Term>, <Term>influencer</Term>, and often{" "}
              <Term>buyer</Term> by filtering the market, scoring alternatives,
              and completing checkout.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because the agent screens out most competing brands before the
              human ever sees them, entering the{" "}
              <Term>agent&apos;s consideration set</Term> becomes essential for
              brand survival.
            </P>
          </Ruled>
          <Ruled>
            <Big className="!text-[clamp(1.15rem,1.65vw,1.4rem)]">
              Marketers must therefore communicate with{" "}
              <Tint>two distinct audiences</Tint>: the human consumer who
              experiences the brand and the AI agent that parses structured
              product data.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Marketing Ethics, Dark Patterns, and Consumer Well-Being
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-marketing-ethics-dark-patterns-and-consumer-well-being"
        border
      >
        <PartHead
          n={5}
          title="Marketing Ethics, Dark Patterns, and Consumer Well-Being"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch] !text-[clamp(1.25rem,2vw,1.65rem)]">
            Understanding the psychological and algorithmic mechanisms behind
            consumer choice confers{" "}
            <Tint>substantial influence over what people buy and pay</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Marketing ethics distinguishes practices that inform and empower
              buyers from manipulative designs that exploit cognitive or
              computational vulnerabilities.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Consumer Well-Being and Ethical Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="consumer-well-being-and-ethical-marketing"
        border
      >
        <SlideHeading>Consumer Well-Being and Ethical Marketing</SlideHeading>
        <Statement className="!max-w-[44ch] !text-[clamp(1.25rem,1.95vw,1.65rem)]">
          <Term>Ethical marketing</Term> creates value by matching genuine
          consumer needs with transparent product information, fair pricing, and
          safe goods.
        </Statement>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              <Term>Consumer well-being</Term> encompasses physical health,
              financial stability, and protection from deception or coercion in
              the marketplace.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Transformative consumer research</Term> examines how
              marketing policies and retail environments can improve nutrition,
              financial literacy, and sustainable habits.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Regulatory bodies such as the Federal Trade Commission in the
              United States and the Competition Bureau in Canada enforce
              standards against false advertising and deceptive pricing.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Long-term brand equity depends on <Tint>consumer trust</Tint>,
              which erodes rapidly when buyers discover that a firm relied on
              manipulation to close a sale.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Dark Patterns Aimed at Human Shoppers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="dark-patterns-aimed-at-human-shoppers"
        border
        exercise={exercise["dark-patterns-aimed-at-human-shoppers"]}
      >
        <SlideHeading>Dark Patterns Aimed at Human Shoppers</SlideHeading>
        <Lead>
          <Term>Dark patterns</Term> are user-interface designs intentionally
          crafted to steer, deceive, or coerce consumers into actions they would
          not otherwise choose.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Numbered n={1}>
            <P>
              <Term>Drip pricing</Term> conceals mandatory service fees until
              the final checkout screen, after the shopper has already invested
              time and committed mentally to the purchase.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Confirmshaming</Term> uses guilt-inducing language on
              opt-out buttons to pressure users into accepting marketing emails
              or add-on warranties.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Roach-motel subscriptions</Term> make signing up effortless
              with a single click while requiring phone calls or multi-page
              forms to cancel.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              <Term>False scarcity</Term> and countdown timers fabricate urgency
              to prevent consumers from comparing competitor prices before
              buying.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Dark Patterns and Information Hiding Aimed at AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="dark-patterns-and-information-hiding-aimed-at-ai-agents"
        border
      >
        <SlideHeading>
          Dark Patterns and Information Hiding Aimed at AI Agents
        </SlideHeading>
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Deceptive storefront design can also target the{" "}
              <Term>AI agents</Term> that shop on behalf of consumers.
            </Lead>
            <Ruled>
              <P>
                When a retailer buries diagnostic product attributes such as
                package weight or unit price behind extra clicks or unindexed
                images, an AI agent facing lookup costs may skip those details.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Without the package weight, an agent comparing two options may
                select a lower total price that actually charges a higher price
                per ounce.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Sellers may also embed exaggerated claims or manipulative
                instructions in product text to bias how a language model scores
                their listing.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Protecting consumers in agent-mediated markets requires{" "}
                <Tint>transparency standards</Tint> that ensure essential
                product facts are machine-readable as well as human-readable.
              </P>
            </Ruled>
          </div>
          <Plate>
            <HiddenUnitPrice />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Marketing to the Consumer and the Agent
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-marketing-to-the-consumer-and-the-agent"
        border
      >
        <SlideHeading kicker="Discussion:">
          Marketing to the Consumer and the Agent
        </SlideHeading>
        <Prompt>
          A consumer electronics brand sells wireless headphones through major
          online marketplaces. Human shoppers mostly respond to lifestyle
          photography and celebrity endorsements, whereas AI shopping assistants
          filter by battery life, active noise cancellation specifications, and
          verified return policies. How should the brand structure its product
          listings so that it appeals to human buyers without being screened out
          by AI shopping agents, and which merchandising tactics would cross the
          line into manipulative design?
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
              Consumer behavior encompasses the full prepurchase, purchase, and
              postpurchase sequence through which individuals and groups satisfy
              needs.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Marketing strategy distinguishes underlying human needs from
              culturally shaped wants and segments markets across geographic,
              demographic, psychographic, and behavioral dimensions.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              A purchase frequently separates the customer who pays from the
              consumer who uses the product, distributing initiator, gatekeeper,
              influencer, buyer, and user roles across participants.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Real consumers operate under bounded rationality, relying on
              mental shortcuts, emotions, and social cues rather than exhaustive
              economic calculation.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              AI shopping agents act as surrogate consumers that assume
              information gathering, evaluation, and purchasing roles while
              leaving need recognition and postpurchase product use to the human
              consumer.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Ethical marketing supports consumer well-being through transparent
              value creation, whereas dark patterns exploit cognitive limits in
              humans or information-access limits in AI agents.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
