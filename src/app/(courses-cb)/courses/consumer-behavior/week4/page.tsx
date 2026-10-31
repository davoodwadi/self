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
  ClearerChoice,
  CreditByMessage,
  CrowdingOut,
  DelegateByInvolvement,
  DriveCurve,
  ExpectancyLab,
  FitsValues,
  HighVsLow,
  InvolvementSources,
  MaslowPyramid,
  MotivationCycle,
  PhoneOrTrip,
  ShapedWants,
  ThreeConflicts,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 4: MOTIVATION, NEEDS, AND VALUES
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. The expectancy chain is interactive: motivation is the
// product of the three beliefs. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week4() {
  return (
    <SlideDeck label="Week 4">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 4
          </p>
          <p className="type-caption mt-2">Consumer Behavior | Davood Wadi, PhD</p>
          <Title className="mt-6">Motivation, Needs, and Values</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumer motivation arises when a{" "}
              <Tint>discrepancy between a present state and a desired state</Tint>{" "}
              creates psychological tension that directs behavior toward a goal.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Consumer Motivation
          ================================================================ */}
      <Slide className={TIGHT} id="defining-consumer-motivation" border>
        <SlideHeading>Defining Consumer Motivation</SlideHeading>
        <Statement className="">
          <Term>Motivation</Term> is the internal process that initiates,
          directs, and sustains goal-oriented behavior in consumers.
        </Statement>
        <div className="mt-6 w-full max-w-4xl">
          <Plate wide>
            <MotivationCycle />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              It begins when a consumer recognizes an <Term>unfulfilled need</Term>,
              defined as a discrepancy between the consumer&apos;s current state
              and a desired ideal state.
            </P>
          </Ruled>
          <Ruled>
            <P>
              This discrepancy produces an uncomfortable internal state of
              arousal referred to as <Term>tension</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              To reduce the tension, the consumer expends energy searching for,
              purchasing, and using products or services expected to close the
              gap.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Tint>Identical purchasing behavior</Tint> across two buyers can
              reflect entirely different underlying motives, such as buying a
              bicycle for commuting savings, cardiovascular health, or
              environmental values.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Motivational Strength and Motivational Direction
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="motivational-strength-and-motivational-direction"
        border
      >
        <SlideHeading>Motivational Strength and Motivational Direction</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Every motivational state has two distinct properties: strength and
              direction.
            </Lead>
            <Ruled>
              <P>
                <Term>Motivational strength</Term> is the degree of energy a
                person is willing to expend to reach a goal, which depends on
                the size and importance of the unmet need.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ShapedWants />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Motivational direction</Term> is the specific pathway or
              product choice the consumer selects to satisfy that need.
            </P>
          </Ruled>
          <Ruled>
            <P>
              While basic biological needs determine the existence of tension,
              cultural norms, social learning, and marketing communications
              shape motivational direction.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers{" "}
              <Tint>cannot create primary physiological needs</Tint>, but they
              design products and messages that channel motivational direction
              toward a specific brand solution.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Drive Theory, Expectancy Theory, and Goal Pursuit
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-drive-theory-expectancy-theory-and-goal-pursuit"
        border
      >
        <PartHead n={1} title="Drive Theory, Expectancy Theory, and Goal Pursuit" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Psychological explanations of consumer motivation draw on both{" "}
            <Tint>biological push models and cognitive pull models</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Comparing drive theory and expectancy theory explains why some
              purchases are triggered by immediate bodily discomfort while others
              are guided by anticipated future outcomes.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Drive Theory and Homeostasis
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="drive-theory-and-homeostasis"
        border
        exercise={exercise["drive-theory-and-homeostasis"]}
      >
        <SlideHeading>Drive Theory and Homeostasis</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              Formulated in behavioral psychology by Clark Hull,{" "}
              <Term>drive theory</Term> states that biological needs produce
              unpleasant internal states of arousal called drives.
            </Statement>
            <Ruled>
              <P>
                Behavior is motivated by the organism&apos;s effort to reduce
                this internal tension and return to <Term>homeostasis</Term>, a
                balanced physiological equilibrium.
              </P>
            </Ruled>
          </div>
          <Plate>
            <DriveCurve />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              When body temperature drops or blood sugar falls, homeostasis is
              disrupted, generating a drive to purchase warm clothing or food.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Once the purchase or consumption restores equilibrium, the drive
              subsides until the need recurs.
            </P>
          </Numbered>
          <Ruled>
            <P>
              Drive theory explains routine replenishment purchases well, but it{" "}
              <Tint>struggles to explain</Tint> why sated consumers eat dessert
              or undertake physically taxing adventure travel.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Expectancy Theory: Expectancy, Instrumentality, and Valence
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="expectancy-theory-expectancy-instrumentality-and-valence"
        border
        exercise={exercise["expectancy-theory-expectancy-instrumentality-and-valence"]}
      >
        <SlideHeading kicker="Expectancy Theory:">
          Expectancy, Instrumentality, and Valence
        </SlideHeading>
        <Lead className="">
          <Term>Expectancy theory</Term> proposes that motivation is pulled by
          cognitive expectations of achieving desirable future outcomes rather
          than pushed solely by biological deficits (Vroom, 1964).
        </Lead>
        <div className="mt-6 grid w-full items-start gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-10">
          <div className="grid min-w-0 gap-5">
            <Ruled>
              <P>
                <Term>Expectancy</Term> is the consumer&apos;s belief that
                expending effort, such as following a training program or using a
                study app, will result in successful performance.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Instrumentality</Term> is the belief that achieving that
                performance level will lead to a specific outcome, such as career
                advancement or health improvement.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Valence</Term> is the subjective value or attractiveness
                the consumer assigns to that final outcome.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-5">
            <Plate wide>
              <ExpectancyLab />
            </Plate>
            <Big className="">
              Motivation is high only when{" "}
              <Tint>all three components are positive</Tint>: the goal appears
              attainable, the product provides an effective path, and the reward
              is valued.
            </Big>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Goal Systems and Means-End Chains
          ================================================================ */}
      <Slide className={TIGHT} id="goal-systems-and-means-end-chains" border>
        <SlideHeading>Goal Systems and Means-End Chains</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Lead>
            Consumers organize their motives in hierarchical goal systems that
            connect concrete product attributes to abstract personal goals.
          </Lead>
          <Lead>
            The <Term>means-end chain</Term> model links three levels of
            knowledge: concrete product attributes, functional and psychosocial
            consequences, and personal values (Gutman, 1982).
          </Lead>
        </div>
        <Ruled className="mt-8 w-full">
          <Big className="">
            For example, a consumer notices the attribute{" "}
            {'"lightweight titanium frame"'} on a pair of eyeglasses, links it to
            the consequence {'"comfortable all-day wear during meetings,"'} and
            connects that consequence to the value{" "}
            {'"professional accomplishment."'}
          </Big>
        </Ruled>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Researchers uncover these links using <Term>laddering interviews</Term>,
              which repeatedly ask why an attribute matters to the buyer.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Advertising is most persuasive when it connects tangible product
              features to the <Tint>higher-order consequences and values</Tint>{" "}
              that drive the segment.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Classification of Needs and Values
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-classification-of-needs-and-values"
        border
      >
        <PartHead n={2} title="Classification of Needs and Values" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Human needs vary from{" "}
            <Tint>universal biological requirements</Tint> to culturally learned
            psychological desires.
          </Statement>
          <Ruled>
            <Lead>
              Classifying needs and values allows marketers to identify which
              level of benefit a product category addresses.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Biogenic, Psychogenic, Utilitarian, and Hedonic Needs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="biogenic-psychogenic-utilitarian-and-hedonic-needs"
        border
        exercise={exercise["biogenic-psychogenic-utilitarian-and-hedonic-needs"]}
      >
        <SlideHeading>Biogenic, Psychogenic, Utilitarian, and Hedonic Needs</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Biogenic needs</Term> are innate physiological requirements
              necessary to sustain life, including food, water, air, shelter, and
              sleep.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Utilitarian needs</Term> direct consumers to emphasize
              objective, tangible product attributes such as fuel economy,
              durability, calories, or storage capacity.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Psychogenic needs</Term> are acquired in the process of
              becoming a member of a culture, including needs for status, power,
              affiliation, and achievement (Murray, 1938).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Hedonic needs</Term> are subjective and experiential,
              motivating consumers to seek excitement, sensory pleasure, fantasy,
              or aesthetic enjoyment.
            </P>
          </Ruled>
        </div>
        <div className="mt-10 w-full max-w-4xl border-l-2 border-[var(--rule-2)] pl-6">
          <Big className="">
            Many categories <Tint>combine both</Tint>: a winter coat satisfies a
            utilitarian need for thermal insulation alongside a hedonic or
            psychogenic need for style and status.
          </Big>
        </div>
      </Slide>

      {/* ================================================================
          Maslow's Hierarchy of Needs in Consumer Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="maslows-hierarchy-of-needs-in-consumer-markets"
        border
        exercise={exercise["maslows-hierarchy-of-needs-in-consumer-markets"]}
      >
        <SlideHeading>Maslow&apos;s Hierarchy of Needs in Consumer Markets</SlideHeading>
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
          <Plate>
            <MaslowPyramid />
          </Plate>
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Abraham Maslow arranged human needs into a five-tier hierarchy
              progressing from basic survival requirements to psychological
              growth (Maslow, 1943).
            </Lead>
            <Ruled>
              <P>
                <Term>Physiological needs</Term> occupy the base (food, water,
                rest), followed by <Term>safety needs</Term> (physical security,
                insurance, preventive healthcare).
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Belongingness and love needs</Term> occupy the middle tier
                (friendship, family acceptance, community clubs), followed by{" "}
                <Term>esteem needs</Term> (prestige, mastery, recognition).
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Self-actualization</Term> sits at the apex, representing
                the desire for self-fulfillment, creative expression, and
                personal growth.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Although originally proposed as a strict progression,
                cross-cultural consumer research treats the hierarchy as a{" "}
                <Tint>taxonomy of motives that can operate simultaneously</Tint>{" "}
                within a single purchase.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Core Cultural and Personal Values
          ================================================================ */}
      <Slide className={TIGHT} id="core-cultural-and-personal-values" border>
        <SlideHeading>Core Cultural and Personal Values</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              A <Term>value</Term> is an enduring belief that a specific mode of
              conduct or end-state of existence is personally or socially
              preferable to an opposite mode or end-state (Rokeach, 1973).
            </Lead>
            <Ruled>
              <P>
                Consumers evaluate whether a brand&apos;s actions, sourcing
                practices, and messaging{" "}
                <Tint>align with their core values</Tint> when choosing among
                functionally similar alternatives.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <FitsValues />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Terminal values</Term> are desired end-states of existence,
              such as family security, freedom, social recognition, or a
              comfortable life.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Instrumental values</Term> are preferred modes of behavior
              used to achieve terminal values, such as ambition, honesty,
              frugality, or self-reliance.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Unlike needs that fluctuate with immediate deprivation, values
              remain relatively stable over years and guide choices across many
              product categories.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Positioning One Product Across Multiple Needs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-positioning-one-product-across-multiple-needs"
        border
      >
        <SlideHeading kicker="Discussion:">
          Positioning One Product Across Multiple Needs
        </SlideHeading>
        <Prompt>
          A fitness wearable manufacturer sells a smart ring that tracks sleep
          stages, heart-rate variability, and daily activity. How would the
          marketing team construct three distinct campaign messages for this
          single product grounded in (a) safety and preventive health needs, (b)
          social belonging needs, and (c) esteem and achievement needs? Which
          expectancy theory component is most likely to fail if users abandon
          the device after two months?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Motivational Conflicts in Consumer Choice
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-motivational-conflicts-in-consumer-choice"
        border
      >
        <PartHead n={3} title="Motivational Conflicts in Consumer Choice" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Because every purchase involves trade-offs among competing goals,
            budgets, and risks, consumers frequently experience{" "}
            <Tint>conflicting motives at the same time</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Kurt Lewin classified motivational conflicts into three structural
              types according to whether the competing forces attract or repel
              the buyer.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Approach-Approach Conflict and Cognitive Dissonance
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="approach-approach-conflict-and-cognitive-dissonance"
        border
      >
        <SlideHeading>Approach-Approach Conflict and Cognitive Dissonance</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              An <Term>approach-approach conflict</Term> occurs when a consumer
              must choose between two desirable alternatives that cannot both be
              acquired within the same budget or time constraint.
            </Lead>
            <Ruled>
              <P>
                A graduate student with one week of vacation and a fixed budget
                may be torn between attending a music festival in Montreal and
                taking a hiking trip in Banff.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PhoneOrTrip />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Because both options carry positive valence, the consumer
              hesitates before deciding and often experiences{" "}
              <Term>post-decision regret</Term> over the foregone benefits of
              the rejected option.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers resolve approach-approach conflicts by offering{" "}
              <Tint>product bundles, modular upgrades, or flexible financing</Tint>{" "}
              that allow buyers to obtain benefits from both options.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Highlighting a unique attribute on which the promoted brand
              clearly dominates also helps the buyer justify closing the
              decision.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Approach-Avoidance and Avoidance-Avoidance Conflicts
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="approach-avoidance-and-avoidance-avoidance-conflicts"
        border
        exercise={exercise["approach-avoidance-and-avoidance-avoidance-conflicts"]}
      >
        <SlideHeading>Approach-Avoidance and Avoidance-Avoidance Conflicts</SlideHeading>
        <Plate wide>
          <ThreeConflicts />
        </Plate>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 md:grid-cols-2">
          <Ruled>
            <P>
              An <Term>approach-avoidance conflict</Term> occurs when a single
              product or action possesses both desirable outcomes that attract
              the consumer and undesirable outcomes that repel the consumer.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A shopper may desire the taste and indulgence of rich ice cream
              while wishing to avoid caloric intake, or admire a luxury coat
              while feeling guilt over its price.
            </P>
          </Ruled>
          <Ruled>
            <P>
              An <Term>avoidance-avoidance conflict</Term> occurs when a consumer
              is forced to choose between two undesirable alternatives, each
              carrying a negative consequence.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A homeowner facing a broken furnace must choose between paying
              thousands of dollars for a replacement and enduring a cold house
              while paying for repeated emergency repairs.
            </P>
          </Ruled>
        </div>
        <Lead className="mt-6">
          Each conflict structure requires a{" "}
          <Tint>distinct marketing intervention</Tint> to reduce the negative
          vector holding back purchase.
        </Lead>
      </Slide>

      {/* ================================================================
          Resolving Motivational Conflicts Through Product and Pricing Design
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="resolving-motivational-conflicts-through-product-and-pricing-design"
        border
      >
        <SlideHeading>
          Resolving Motivational Conflicts Through Product and Pricing Design
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              In approach-avoidance conflicts, marketers{" "}
              <Term>reduce the avoidance force</Term> by reformulating the
              product or restructuring the terms of purchase.
            </Lead>
            <Ruled>
              <P>
                Zero-sugar beverages, plant-based meats, and energy-efficient
                appliances are designed specifically to preserve the approach
                benefit while minimizing health or environmental guilt.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ClearerChoice />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Money-back guarantees, free return shipping, and certified
              pre-owned warranties reduce the financial and performance
              avoidance forces associated with high-ticket purchases.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In avoidance-avoidance conflicts, communications emphasize peace
              of mind, predictable installment payments, and hassle-free
              installation to make one option substantially less painful.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Tint>Removing the specific friction</Tint> that generates
              avoidance is often more effective than adding new promotional
              claims to the approach side.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Intrinsic and Extrinsic Motivation in Online Review Writing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-intrinsic-and-extrinsic-motivation-in-online-review-writing"
        border
      >
        <PartHead
          n={4}
          title="Intrinsic and Extrinsic Motivation in Online Review Writing"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Postpurchase behaviors such as writing online product reviews are
            driven by a combination of{" "}
            <Tint>internal psychological motives and external firm-sponsored incentives</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Because reviews guide both human shoppers and AI shopping agents,
              firms must design solicitation messages and rewards that do not
              backfire.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Intrinsic Versus Extrinsic Motivation and Crowding Out
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="intrinsic-versus-extrinsic-motivation-and-crowding-out"
        border
        exercise={exercise["intrinsic-versus-extrinsic-motivation-and-crowding-out"]}
      >
        <SlideHeading>Intrinsic Versus Extrinsic Motivation and Crowding Out</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              <Term>Intrinsic motivation</Term> occurs when an individual engages
              in an activity for its inherent satisfaction, enjoyment, or
              prosocial meaning, such as helping fellow shoppers make informed
              choices.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Extrinsic motivation</Term> occurs when behavior is driven by
              an external contingency separated from the activity itself, such as
              cash rebates, loyalty points, or sweepstakes entries.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-12">
          <Plate>
            <CrowdingOut />
          </Plate>
          <div className="grid min-w-0 gap-5">
            <P>
              According to self-determination and motivation crowding theory,
              introducing an external monetary reward for a prosocial behavior
              can <Term>crowd out</Term> intrinsic motivation (Deci, Koestner, &amp;
              Ryan, 1999).
            </P>
            <P>
              When a firm pays customers to write a review, an act that
              previously felt like a helpful community contribution can be
              reframed as a commercial transaction for the firm.
            </P>
            <Ruled>
              <P>
                Consequently, <Tint>the wording of the review request</Tint>{" "}
                determines whether a financial incentive complements or
                undermines the consumer&apos;s intrinsic motive.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Altruistic Versus Company-Focused Review Appeals
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="altruistic-versus-company-focused-review-appeals"
        border
      >
        <SlideHeading>Altruistic Versus Company-Focused Review Appeals</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Retailers typically solicit reviews with one of two message
              frames: an <Term>altruistic appeal</Term>{" "}
              {'("help other shoppers decide")'} or a{" "}
              <Term>company-focused appeal</Term>{" "}
              {'("help our company improve")'}.
            </Lead>
            <Numbered n={1}>
              <P>
                In a large-scale field study with a North American online
                retailer, asking customers to help other shoppers significantly
                increased the likelihood of submitting a review compared with
                asking them to help the company (Wadi et al., 2026a).
              </P>
            </Numbered>
          </div>
          <Plate>
            <CreditByMessage />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={2}>
            <P>
              In a controlled follow-up experiment, offering a 10-dollar store
              credit increased review intentions substantially more when paired
              with the {'"help other shoppers"'} appeal than with the{" "}
              {'"help the company"'} appeal (Wadi et al., 2026a).
            </P>
          </Numbered>
          <Ruled>
            <P>
              Pairing a monetary reward with a company-focused appeal heightened
              the transactional framing and dampened customers&apos; willingness
              to contribute.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Firms offering review incentives should therefore{" "}
              <Tint>align their solicitation copy</Tint> with the
              consumer&apos;s prosocial goal of assisting peers.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Conditional Quality Incentives and Reviewer Experience
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="conditional-quality-incentives-and-reviewer-experience"
        border
      >
        <SlideHeading>Conditional Quality Incentives and Reviewer Experience</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Lead>
            Rather than paying for any review regardless of effort, some
            platforms offer <Term>conditional incentives</Term> paid only when a
            submitted review receives a {'"helpful"'} vote from other shoppers.
          </Lead>
          <Lead>
            Research shows that the effect of conditional incentives{" "}
            <Tint>depends on the customer&apos;s prior reviewing history</Tint>{" "}
            (Wadi et al., 2026b).
          </Lead>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Among <Term>first-time reviewers</Term>, a reward tied to receiving
              a helpful vote increased both the number of submitted reviews and
              the length of those reviews (Wadi et al., 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Among <Term>experienced reviewers</Term> who already possessed
              established intrinsic habits for writing reviews, the same
              conditional incentive produced a much smaller change (Wadi et al.,
              2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              In addition, framing the request as a reciprocal exchange with the
              company led respondents who did write a review to write longer
              text, but reduced the overall participation rate (Wadi et al.,
              2026b).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Consumer Involvement and Delegation to AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-consumer-involvement-and-delegation-to-ai-agents"
        border
      >
        <PartHead n={5} title="Consumer Involvement and Delegation to AI Agents" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Consumers do not invest the{" "}
            <Tint>same motivational energy</Tint> in every product category or
            purchase occasion.
          </Statement>
          <Ruled>
            <Lead>
              The construct of involvement explains when buyers expend extensive
              cognitive effort and when they willingly delegate choices to habits
              or AI agents.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Product, Message, and Situational Involvement
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="product-message-and-situational-involvement"
        border
        exercise={exercise["product-message-and-situational-involvement"]}
      >
        <SlideHeading>Product, Message, and Situational Involvement</SlideHeading>
        <Lead className="">
          <Term>Involvement</Term> is a person&apos;s perceived relevance of an
          object, advertisement, or purchase decision based on inherent needs,
          values, and interests (Zaichkowsky, 1985).
        </Lead>
        <div className="mt-6 w-full">
          <Plate wide>
            <InvolvementSources />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Product involvement</Term> reflects the enduring importance a
              consumer attaches to a product category, which rises when the item
              is expensive, socially visible, or central to self-identity.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Message-response involvement</Term> reflects the
              consumer&apos;s motivation to process marketing communications,
              which varies across media formats and narrative styles.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Purchase situation involvement</Term> reflects temporary
              contextual factors such as whether the item is bought as a gift for
              a boss versus for private home use, or under acute time pressure.
            </P>
          </Ruled>
        </div>
        <Lead className="mt-6">
          The <Tint>interaction of these three dimensions</Tint> determines the
          depth of information search and the decision rule the buyer applies.
        </Lead>
      </Slide>

      {/* ================================================================
          Measuring Involvement and Overcoming Low Involvement
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="measuring-involvement-and-overcoming-low-involvement"
        border
      >
        <SlideHeading>Measuring Involvement and Overcoming Low Involvement</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Researchers measure involvement using validated multi-item scales
              such as Zaichkowsky&apos;s{" "}
              <Term>Personal Involvement Inventory</Term>, which rates a
              category on pairs such as important-unimportant and
              relevant-irrelevant.
            </Lead>
            <Ruled>
              <P>
                Under <Term>high involvement</Term>, consumers actively search
                for technical specifications, compare competing brands, and
                process strong message arguments carefully.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <HighVsLow />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Under <Term>low involvement</Term>, consumers experience inertia:
              they buy the same brand out of habit without strong commitment and
              switch easily if a competitor is on sale or at eye level.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers increase low consumer involvement by linking a mundane
              product to an important health or environmental issue, introducing
              novel sensory packaging, or using celebrity endorsers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Alternatively, brands design point-of-sale displays and automatic
              subscription refills that{" "}
              <Tint>accommodate low-involvement inertia</Tint> rather than
              trying to force deep deliberation.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Consumer Involvement and Purchase Delegation to AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="consumer-involvement-and-purchase-delegation-to-ai-agents"
        border
      >
        <SlideHeading>Consumer Involvement and Purchase Delegation to AI Agents</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Consumer involvement directly governs which purchasing tasks
              buyers are willing to delegate to autonomous AI shopping agents.
            </Lead>
            <Ruled>
              <P>
                In <Term>low-involvement, utilitarian categories</Term> such as
                paper towels, laundry detergent, or printer ink, consumers
                derive little psychological satisfaction from comparing prices
                manually.
              </P>
            </Ruled>
          </div>
          <Plate>
            <DelegateByInvolvement />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In these categories, buyers readily delegate search, comparison,
              and automated reordering to an AI agent to save time and cognitive
              effort.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In <Term>high-involvement categories</Term> tied to personal
              identity, sensory pleasure, or high financial risk, consumers
              prefer to retain final evaluation and choice even if they use an
              AI assistant for initial information gathering.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Understanding category involvement therefore tells brands whether
              their primary decision maker at checkout will be{" "}
              <Tint>an engaged human buyer or an autonomous replenishment agent</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing a Review Solicitation Program
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-a-review-solicitation-program"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing a Review Solicitation Program
        </SlideHeading>
        <Prompt>
          An online outdoor-gear retailer wants to increase the volume and detail
          of verified customer reviews on its technical hiking backpacks so that
          both human shoppers and AI shopping assistants have rich attribute data
          to consult. Based on intrinsic and extrinsic motivation research (Wadi
          et al., 2026a, 2026b), how should the retailer structure its email
          wording and incentive rules for first-time buyers versus veteran
          community reviewers?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2">
          <Numbered n={1}>
            <P>
              Consumer motivation begins when a gap between the actual state and
              a desired state creates tension, with motivational strength
              determining effort and motivational direction determining the
              chosen product path.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Drive theory explains tension reduction toward biological
              homeostasis, whereas expectancy theory explains how expectancy,
              instrumentality, and outcome valence pull behavior toward future
              goals.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Needs are classified as biogenic or psychogenic and utilitarian or
              hedonic, and Maslow&apos;s hierarchy organizes motives from
              physiological and safety needs to belonging, esteem, and
              self-actualization.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Consumers face approach-approach, approach-avoidance, and
              avoidance-avoidance motivational conflicts, which marketers address
              by reducing financial, health, or performance avoidance forces.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              In online review writing, monetary incentives can crowd out
              intrinsic prosocial motivation unless paired with altruistic
              appeals {'("help other shoppers")'}, and conditional helpfulness
              rewards are most effective for first-time reviewers.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Consumer involvement spans product, message, and situational
              dimensions, determining whether buyers engage in extensive search or
              delegate routine purchases to AI shopping agents.
            </P>
          </Numbered>
        </div>
      </Slide>
    </SlideDeck>
  );
}
