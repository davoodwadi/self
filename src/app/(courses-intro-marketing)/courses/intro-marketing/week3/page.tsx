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
  DecisionProcessStages,
  DelegatedDecisionSteps,
  SelectivePerceptionFilters,
  StimulusResponseModel,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 3: CONSUMER BEHAVIOR
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week3() {
  return (
    <SlideDeck label="Week 3">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 3
          </p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">Consumer Behavior</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumer buyer behavior is shaped by{" "}
              <Tint>cultural, social, personal, and psychological forces</Tint>{" "}
              across a five-stage decision process that consumers increasingly
              share with delegated AI shopping agents.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Consumer Buyer Behavior
          ================================================================ */}
      <Slide className={TIGHT} id="defining-consumer-buyer-behavior" border>
        <SlideHeading>Defining Consumer Buyer Behavior</SlideHeading>
        <Statement>
          <Term>Consumer buyer behavior</Term> refers to the purchasing and
          consumption behavior of final consumers, namely individuals and
          households that buy goods and services for personal use.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              All of these final consumers combined make up the{" "}
              <Term>consumer market</Term>, which accounts for trillions of
              dollars in annual spending across goods, services, and
              experiences.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Although marketers can observe what consumers buy, where they buy,
              and how much they pay, the underlying reasons why they buy are
              formed inside the buyer&apos;s mind.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Understanding how consumers respond to different product features,
              prices, and advertising appeals is essential for designing{" "}
              <Tint>effective marketing strategy</Tint>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Stimulus-Response Model of Buyer Behavior
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-stimulus-response-model-of-buyer-behavior"
        border
      >
        <SlideHeading>
          The Stimulus-Response Model of Buyer Behavior
        </SlideHeading>
        <Lead>
          Consumer research organizes buyer behavior around a three-part{" "}
          <Term>stimulus-response model</Term> (often called the{" "}
          <Term>buyer&apos;s black box</Term> model).
        </Lead>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <StimulusResponseModel />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              First, <Term>marketing stimuli</Term> (the Four Ps: product,
              price, place, and promotion) and broader{" "}
              <Term>environmental stimuli</Term> (economic, technological,
              social, and cultural forces) enter the buyer&apos;s consciousness.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Second, the buyer&apos;s internal &ldquo;black box&rdquo;
              transforms those stimuli through two components: the{" "}
              <Term>buyer&apos;s characteristics</Term> and the{" "}
              <Term>buyer&apos;s decision-making process</Term>.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Third, this internal processing produces observable{" "}
              <Term>buyer responses</Term>, including brand choice, dealer
              selection, purchase timing, purchase amount, and postpurchase
              loyalty.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 1: The Five-Step Consumer Decision Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-the-five-step-consumer-decision-process"
        border
      >
        <PartHead n={1} title="The Five-Step Consumer Decision Process" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            For a new or complex purchase, consumers move through a{" "}
            <Term>five-stage decision process</Term>: need recognition,
            information search, evaluation of alternatives, purchase decision,
            and postpurchase behavior.
          </Statement>
          <Ruled>
            <Lead>
              In routine <Term>low-involvement purchases</Term>, shoppers may
              skip or compress several stages, whereas{" "}
              <Term>high-involvement purchases</Term> engage all five stages
              deliberately.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Step 1: Need Recognition and Step 2: Information Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="step-1-need-recognition-and-step-2-information-search"
        border
        exercise={
          exercise["step-1-need-recognition-and-step-2-information-search"]
        }
      >
        <SlideHeading>
          Step 1: Need Recognition and Step 2: Information Search
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              The buying process begins with <Term>need recognition</Term>, when
              the buyer perceives a difference between their actual state and a
              desired state.
            </P>
            <P className="mt-4">
              Needs can be triggered by <Term>internal stimuli</Term>, such as
              hunger or thirst, or by <Term>external stimuli</Term>, such as
              smelling fresh bread from a bakery or seeing a neighbor&apos;s new
              electric bicycle.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Once a need is recognized, an aroused consumer may undertake an{" "}
              <Term>information search</Term> across four categories of sources:{" "}
              <Term>personal</Term> (family and friends),{" "}
              <Term>commercial</Term> (advertising, websites, and salespeople),{" "}
              <Term>public</Term> (independent media and consumer rating
              organizations), and <Term>experiential</Term> (handling or testing
              the product).
            </P>
            <P className="mt-4">
              Commercial sources typically inform the buyer about available
              options, whereas personal and independent public sources carry the
              greatest weight in legitimizing and evaluating brands.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <DecisionProcessStages />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Step 3: Evaluation of Alternatives and Step 4: Purchase Decision
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="step-3-evaluation-of-alternatives-and-step-4-purchase-decision"
        border
      >
        <SlideHeading>
          Step 3: Evaluation of Alternatives and Step 4: Purchase Decision
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              During <Term>evaluation of alternatives</Term>, the consumer
              processes information to arrive at brand attitudes and rank the
              options in their <Term>consideration set</Term>.
            </Statement>
            <Ruled>
              <P>
                Depending on the buyer and the category, evaluation may involve
                careful calculation across multiple attributes (such as fuel
                economy, safety ratings, and price) or rely on a single{" "}
                <Term>heuristic rule</Term> or gut impression.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <Lead>
                In the <Term>purchase decision</Term> stage, the consumer forms
                an <Term>intention to buy</Term> the most preferred brand.
              </Lead>
            </Ruled>
            <Ruled>
              <P>
                Two factors can intervene between purchase intention and the
                actual purchase decision: the{" "}
                <Term>attitudes of other people</Term> (such as a spouse&apos;s
                objection) and <Term>unexpected situational factors</Term> (such
                as a job loss or a competitor&apos;s sudden promotion).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Step 5: Postpurchase Behavior and Cognitive Dissonance
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="step-5-postpurchase-behavior-and-cognitive-dissonance"
        border
        exercise={
          exercise["step-5-postpurchase-behavior-and-cognitive-dissonance"]
        }
      >
        <SlideHeading>
          Step 5: Postpurchase Behavior and Cognitive Dissonance
        </SlideHeading>
        <Lead>
          The marketer&apos;s job continues after the transaction during{" "}
          <Term>postpurchase behavior</Term>, when the consumer uses the product
          and compares its perceived performance against prior expectations.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Almost all major purchases result in{" "}
              <Term>cognitive dissonance</Term>, which is buyer discomfort
              caused by postpurchase conflict after accepting the chosen
              brand&apos;s drawbacks and giving up the benefits of rejected
              alternatives.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Dissatisfied consumers may return the product, abandon the brand,
              and warn peers through negative online reviews, whereas satisfied
              consumers repurchase and become <Term>brand advocates</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers reduce postpurchase dissonance through clear onboarding
              instructions, responsive customer support, warranties, and
              follow-up communications that reinforce the wisdom of the
              buyer&apos;s choice.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Cultural, Social, and Personal Influences on Buying
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-cultural-social-and-personal-influences-on-buying"
        border
      >
        <PartHead
          n={2}
          title="Cultural, Social, and Personal Influences on Buying"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            A consumer&apos;s progression through the decision process is shaped
            by <Term>cultural</Term>, <Term>social</Term>, and{" "}
            <Term>personal characteristics</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Although marketers cannot control these background characteristics
              directly, they must understand them to design relevant offerings
              and communications.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Cultural and Subcultural Factors
          ================================================================ */}
      <Slide className={TIGHT} id="cultural-and-subcultural-factors" border>
        <SlideHeading>Cultural and Subcultural Factors</SlideHeading>
        <Statement>
          <Term>Culture</Term> is the most fundamental determinant of a
          person&apos;s wants and behavior, encompassing the basic values,
          perceptions, preferences, and behaviors learned from family and
          societal institutions.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Marketers continuously monitor <Term>cultural shifts</Term>, such
              as growing emphasis on health, fitness, and informal dress, in
              order to spot demand for new product categories.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Each culture contains smaller <Term>subcultures</Term>, which are
              groups of people with shared value systems based on common life
              experiences, nationalities, religions, racial groups, or
              geographic regions.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Social classes</Term> are society&apos;s relatively
              permanent and ordered divisions whose members share similar
              values, interests, and behaviors, measured as a combination of
              occupation, income, education, and wealth.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Social Factors: Groups, Family, and Roles
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="social-factors-groups-family-and-roles"
        border
        exercise={exercise["social-factors-groups-family-and-roles"]}
      >
        <SlideHeading>Social Factors: Groups, Family, and Roles</SlideHeading>
        <Lead>
          A consumer&apos;s behavior is strongly influenced by{" "}
          <Term>social factors</Term>, including membership groups, reference
          groups, family, and social roles and status.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Reference groups</Term> serve as direct (face-to-face) or
              indirect points of comparison or reference in forming a
              person&apos;s attitudes or behavior, including{" "}
              <Term>aspirational groups</Term> to which an individual wishes to
              belong.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Opinion leaders</Term> and online creators within reference
              groups exert powerful word-of-mouth influence, particularly when
              products are visible, expensive, or socially risky.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Family members</Term> constitute the most influential
              primary reference group, with buying roles shifting across spouses
              and children depending on the product category, while each
              person&apos;s <Term>role and status</Term> in organizations guide
              what they buy.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Personal Factors in Consumer Choice
          ================================================================ */}
      <Slide className={TIGHT} id="personal-factors-in-consumer-choice" border>
        <SlideHeading>Personal Factors in Consumer Choice</SlideHeading>
        <Lead>
          A buyer&apos;s decisions are also shaped by{" "}
          <Term>personal characteristics</Term> that change across life stages
          and economic circumstances.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              <Term>Age</Term> and <Term>family life-cycle stage</Term> alter
              consumption priorities as households form, raise children, change
              residences, and enter retirement.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Occupation</Term> and <Term>economic situation</Term>{" "}
              (spendable income, savings, and borrowing power) directly govern
              which product categories and price tiers a consumer considers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Lifestyle</Term> is a person&apos;s pattern of living as
              expressed in their activities, interests, and opinions, capturing
              how they interact with the world beyond their demographic class.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Personality</Term> and <Term>self-concept</Term> lead
              consumers to favor brands whose perceived traits match their own
              actual or ideal self-image.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: Psychological Influences on Consumer Behavior
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-psychological-influences-on-consumer-behavior"
        border
      >
        <PartHead
          n={3}
          title="Psychological Influences on Consumer Behavior"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Within the buyer&apos;s cultural and social context, four major{" "}
            <Term>psychological processes</Term> govern how an individual
            responds to marketing stimuli: motivation, perception, learning, and
            beliefs and attitudes.
          </Statement>
          <Ruled>
            <Lead>
              Each psychological process filters which marketing messages reach
              awareness and how they are stored in memory.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Motivation and Maslow's Hierarchy of Needs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="motivation-and-maslows-hierarchy-of-needs"
        border
      >
        <SlideHeading>
          Motivation and Maslow&apos;s Hierarchy of Needs
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              A <Term>motive</Term> (or <Term>drive</Term>) is a need that is
              sufficiently pressing to direct the person to seek satisfaction of
              that need.
            </Statement>
            <Ruled>
              <P>
                Psychologists have developed several theories of human
                motivation, most notably Sigmund Freud&apos;s theory of{" "}
                <Term>unconscious motives</Term> and Abraham Maslow&apos;s{" "}
                <Term>hierarchy of needs</Term>.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                Maslow&apos;s hierarchy arranges human needs in a pyramid from
                the most pressing at the bottom to the least pressing at the
                top: <Term>physiological needs</Term>,{" "}
                <Term>safety needs</Term>, <Term>social needs</Term>,{" "}
                <Term>esteem needs</Term>, and{" "}
                <Term>self-actualization needs</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                According to Maslow, a person tries to satisfy the most
                important need first: when that need is satisfied, it stops
                being a current motivator and the person turns attention to the
                next most important need.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Selective Perception in Marketplace Processing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="selective-perception-in-marketplace-processing"
        border
        exercise={exercise["selective-perception-in-marketplace-processing"]}
      >
        <SlideHeading>
          Selective Perception in Marketplace Processing
        </SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              A motivated person is ready to act, and how the person acts is
              influenced by <Term>perception</Term>, the process by which people
              select, organize, and interpret information to form a meaningful
              picture of the world.
            </P>
            <P className="mt-4">
              People can form different perceptions of the exact same stimulus
              because of three perceptual processes:{" "}
              <Term>selective attention</Term>,{" "}
              <Term>selective distortion</Term>, and{" "}
              <Term>selective retention</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Selective attention</Term> is the tendency for people to
              screen out most of the information to which they are exposed,
              requiring marketers to work hard to attract notice in cluttered
              environments.
            </P>
            <P className="mt-4">
              <Term>Selective distortion</Term> describes the tendency of people
              to interpret information in a way that will support what they
              already believe, and <Term>selective retention</Term> means that
              consumers are likely to remember good points made about a brand
              they favor and forget good points made about competing brands.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <SelectivePerceptionFilters />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Learning, Beliefs, and Attitudes
          ================================================================ */}
      <Slide className={TIGHT} id="learning-beliefs-and-attitudes" border>
        <SlideHeading>Learning, Beliefs, and Attitudes</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Learning</Term> describes changes in an individual&apos;s
              behavior arising from experience, driven by the interplay of
              drives, stimuli, cues, responses, and reinforcement.
            </Statement>
            <Ruled>
              <P>
                When a consumer tries a new coffee shop and enjoys the drink (
                <Term>positive reinforcement</Term>), the likelihood of
                repurchasing on the next morning commute increases.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                Through doing and learning, people acquire <Term>beliefs</Term>{" "}
                and <Term>attitudes</Term> that subsequently influence their
                buying behavior.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A <Term>belief</Term> is a descriptive thought that a person
                holds about something (which may be based on knowledge, opinion,
                or faith), and an <Term>attitude</Term> is a person&apos;s
                consistently favorable or unfavorable evaluations, feelings, and
                tendencies toward an object or idea.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Because attitudes are costly and difficult to change, marketers
                generally design offerings to fit existing attitudes rather than
                attempting to overturn them.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Diagnosing Perceptual Filters and Postpurchase Dissonance
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-diagnosing-perceptual-filters-and-postpurchase-dissonance"
        border
      >
        <SlideHeading kicker="Discussion:">
          Diagnosing Perceptual Filters and Postpurchase Dissonance
        </SlideHeading>
        <Prompt>
          A consumer spends three weeks researching high-end noise-canceling
          headphones, buys a 400-dollar model, and immediately notices
          advertisements for a competing brand that offers longer battery life
          for 50 dollars less. Using selective perception and cognitive
          dissonance, explain how the buyer is likely to process competitor ads
          after the purchase and what postpurchase actions the chosen brand
          should take during the first 14 days of ownership.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 4: Comparing B2C and B2B Purchasing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-comparing-b2c-and-b2b-purchasing"
        border
      >
        <PartHead n={4} title="Comparing B2C and B2B Purchasing" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            While consumer marketing addresses individuals and households buying
            for personal consumption,{" "}
            <Term>business-to-business (B2B) marketing</Term> addresses
            organizations buying goods and services to produce other products or
            to run their operations.
          </Statement>
          <Ruled>
            <Lead>
              Introducing the core contrasts between B2C and B2B purchasing
              prepares the ground for Week 4&apos;s deep examination of
              organizational markets.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Market Structure and Derived Demand
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="market-structure-and-derived-demand"
        border
        exercise={exercise["market-structure-and-derived-demand"]}
      >
        <SlideHeading>Market Structure and Derived Demand</SlideHeading>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <Numbered n={1}>
            <P>
              Business marketers typically interact with far fewer but much
              larger buyers than consumer marketers do: a tire manufacturer may
              sell millions of replacement tires to individual drivers, but
              sells original-equipment tires to only a handful of global
              automakers.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Business demand is <Term>derived demand</Term>, meaning it
              ultimately derives from consumer demand for finished goods: if
              household purchases of new automobiles fall, automaker demand for
              sheet steel and tires falls in turn.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              In the short run, B2B demand is also more{" "}
              <Term>price-inelastic</Term> than B2C demand: a shoe manufacturer
              will not buy substantially more leather merely because leather
              prices drop slightly, nor can it easily substitute leather
              overnight if prices rise.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              B2B demand also exhibits greater volatility (the{" "}
              <Term>acceleration effect</Term>), whereby a small percentage
              change in consumer retail demand triggers a much larger percentage
              swing in business orders for factory equipment.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          The Organizational Buying Unit and Decision Roles
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-organizational-buying-unit-and-decision-roles"
        border
      >
        <SlideHeading>
          The Organizational Buying Unit and Decision Roles
        </SlideHeading>
        <Statement>
          Compared with consumer purchases made by an individual or household, a
          business purchase typically involves more decision participants and a
          formal <Term>buying center</Term>.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              The organizational buying center brings together{" "}
              <Term>users</Term>, <Term>influencers</Term>,{" "}
              <Term>buyers</Term>, <Term>deciders</Term>, and{" "}
              <Term>gatekeepers</Term> who evaluate the purchase from technical,
              financial, and operational angles.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Users</Term> are the employees who operate the purchased
              item, <Term>influencers</Term> specify technical requirements,{" "}
              <Term>buyers</Term> handle vendor negotiations,{" "}
              <Term>deciders</Term> hold final approval authority, and{" "}
              <Term>gatekeepers</Term> control information flow.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because multiple stakeholders participate in a single purchase,
              B2B marketers must address each participant&apos;s distinct
              evaluation criteria.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Professional Purchasing and Relationship Orientation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="professional-purchasing-and-relationship-orientation"
        border
      >
        <SlideHeading>
          Professional Purchasing and Relationship Orientation
        </SlideHeading>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              Business purchasing is carried out by{" "}
              <Term>trained procurement agents</Term> who spend their
              professional careers learning how to evaluate supplier bids and
              negotiate contracts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Whereas many consumer purchases are completed in minutes at a
              shelf or checkout screen, major B2B purchases follow formal{" "}
              <Term>requests for proposals</Term>, engineering audits, and
              multi-month approval cycles.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In B2B markets, buyers and sellers work closely together over
              years, often customizing products and logistics to fit a specific
              client&apos;s operations.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consequently, B2B marketing relies primarily on{" "}
              <Term>consultative personal selling</Term>, technical
              documentation, and <Term>key account management</Term> rather than
              mass broadcast advertising.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Delegating the Consumer Decision to AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-delegating-the-consumer-decision-to-ai-agents"
        border
      >
        <PartHead
          n={5}
          title="Delegating the Consumer Decision to AI Agents"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Consumers can now delegate portions of the five-stage decision
            process to <Term>AI shopping agents</Term> that search, compare, and
            purchase on their behalf.
          </Statement>
          <Ruled>
            <Lead>
              Analyzing which stages consumers hand over and which stages they
              keep reveals how human psychology and agent design interact.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Which Decision Steps Are Delegated and Which Are Kept
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="which-decision-steps-are-delegated-and-which-are-kept"
        border
        exercise={
          exercise["which-decision-steps-are-delegated-and-which-are-kept"]
        }
      >
        <SlideHeading>
          Which Decision Steps Are Delegated and Which Are Kept
        </SlideHeading>
        <Lead>
          Across the five-stage decision process, delegation to an AI agent does
          not replace the consumer uniformly at every step.
        </Lead>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <DelegatedDecisionSteps />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 sm:grid-cols-2">
          <Ruled>
            <P>
              Step 1 (<Term>Need Recognition</Term>) remains with the human
              consumer, who experiences the underlying physical or psychological
              need and states the goal to the AI agent.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Step 2 (<Term>Information Search</Term>) and Step 3 (
              <Term>Evaluation of Alternatives</Term>) are the stages most
              heavily delegated: the AI agent queries retail catalogs, reads
              specifications and reviews, and compares competing brands.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Step 4 (<Term>Purchase Decision</Term>) may be executed
              autonomously by the AI agent for routine items or returned as a
              shortlist for the human consumer&apos;s final approval.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Step 5 (<Term>Postpurchase Behavior</Term>) stays entirely with
              the human consumer, who consumes the physical product and
              experiences satisfaction or cognitive dissonance.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Goal Specificity and Lookup Costs in Delegated Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="goal-specificity-and-lookup-costs-in-delegated-search"
        border
        exercise={
          exercise["goal-specificity-and-lookup-costs-in-delegated-search"]
        }
      >
        <SlideHeading>
          Goal Specificity and Lookup Costs in Delegated Search
        </SlideHeading>
        <Statement>
          When consumers delegate search and evaluation to an AI agent, the
          quality of the agent&apos;s choice depends critically on how specific
          the consumer&apos;s instruction is and how costly information is to
          look up.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              On many retail platforms, an initial search page shows only
              product titles and total prices, requiring an additional click or
              page lookup to inspect <Term>package weight</Term> or{" "}
              <Term>unit price</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In controlled experiments where inspecting detailed product pages
              carried a <Term>lookup cost</Term> and the shopper&apos;s prompt
              was vague, AI agents frequently skipped inspecting package weight
              and selected a coffee listing that cost more per ounce (Wadi &amp;
              Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              When the consumer&apos;s prompt stated a specific{" "}
              <Term>cost-minimization goal</Term>, the AI agents checked the
              hidden package details and selected the lower unit-price option
              significantly more often (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Identity-Based Resistance to Delegating Consumption
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="identity-based-resistance-to-delegating-consumption"
        border
      >
        <SlideHeading>
          Identity-Based Resistance to Delegating Consumption
        </SlideHeading>
        <Lead>
          Even when an automated tool or AI agent can perform a task
          efficiently, consumers deliberately keep certain consumption
          activities and choices for themselves.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Research on automation and identity demonstrates that people who
              view an activity, such as cooking, gardening, or curating music,
              as central to their <Term>self-identity</Term> resist products and
              tools that automate the core skill of that activity (Leung,
              Paolacci, &amp; Puntoni, 2018).
            </P>
          </Ruled>
          <Ruled>
            <P>
              For routine, <Term>utilitarian chores</Term> that carry no
              identity value (such as restocking paper towels or basic printer
              ink), consumers welcome full delegation to an automated agent.
            </P>
          </Ruled>
          <Ruled>
            <P>
              For <Term>self-expressive categories</Term>, however, consumers
              prefer AI assistants that augment their own discovery and skill
              rather than replacing their personal judgment (Leung, Paolacci,
              &amp; Puntoni, 2018).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing for Human and Delegated Decision Stages
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-for-human-and-delegated-decision-stages"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing for Human and Delegated Decision Stages
        </SlideHeading>
        <Prompt>
          A specialty coffee roaster sells whole-bean coffee online in 12-ounce
          and 16-ounce bags. Some customers are passionate home baristas who
          enjoy reading tasting notes and farm origins, while others tell an AI
          shopping assistant to reorder everyday morning coffee automatically.
          Drawing on identity-based resistance to automation (Leung, Paolacci,
          &amp; Puntoni, 2018) and AI agent search behavior under lookup costs
          (Wadi &amp; Ma, 2026b), how should the roaster design its product
          pages and unit-price disclosures to serve both buyer segments?
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
              Consumer buyer behavior follows a{" "}
              <Term>stimulus-response model</Term> in which marketing and
              environmental stimuli enter the buyer&apos;s black box (buyer
              characteristics and decision processes) to produce observable
              purchase choices.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The consumer decision-making process unfolds across{" "}
              <Term>five stages</Term>: need recognition, information search
              (across personal, commercial, public, and experiential sources),
              evaluation of alternatives, purchase decision, and postpurchase
              behavior.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Postpurchase satisfaction depends on performance relative to
              expectations, and marketers actively manage postpurchase{" "}
              <Term>cognitive dissonance</Term> to build repeat patronage.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              <Term>Cultural</Term> (culture and subculture),{" "}
              <Term>social</Term> (reference groups, family, and roles),{" "}
              <Term>personal</Term> (life-cycle stage, occupation, lifestyle,
              and personality), and <Term>psychological factors</Term>{" "}
              (motivation, selective perception, learning, and attitudes)
              jointly shape consumer preferences.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Compared with B2C markets, <Term>B2B markets</Term> involve fewer
              and larger buyers, derived and relatively inelastic demand, formal
              multi-person buying centers, and professional procurement
              processes.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              In <Term>delegated shopping</Term>, human consumers retain need
              recognition and postpurchase experience while handing information
              search and alternative evaluation to AI agents, whose performance
              depends on prompt specificity and accessible unit-level product
              data (Wadi &amp; Ma, 2026b), while consumers keep identity-central
              choices for themselves (Leung, Paolacci, &amp; Puntoni, 2018).
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
