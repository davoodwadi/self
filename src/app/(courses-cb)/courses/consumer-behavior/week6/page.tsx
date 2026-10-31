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
  ABCModelPlate,
  AdOnTheDesk,
  AskTwoModels,
  Attractiveness,
  Evaluations,
  ExpertSource,
  KatzFunctions,
  MessageFraming,
  ObjectiveSubjective,
  PatternNotFeeling,
  SameMistake,
  SupportConflict,
  ThreeHierarchies,
  TrustworthySource,
  TwoRoutes,
  WhoseInterests,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 6: ATTITUDES AND PERSUASION
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week6() {
  return (
    <SlideDeck label="Week 6">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 6
          </p>
          <p className="type-caption mt-2">Consumer Behavior | Davood Wadi, PhD</p>
          <Title className="mt-6">Attitudes and Persuasion</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumer attitudes integrate feelings, beliefs, and behavioral
              intentions toward marketplace objects, and persuasive
              communications change those attitudes through{" "}
              <Tint>source, message, and processing pathways</Tint>.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Consumer Attitudes
          ================================================================ */}
      <Slide className={TIGHT} id="defining-consumer-attitudes" border>
        <SlideHeading>Defining Consumer Attitudes</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              An <Term>attitude</Term> is a lasting, general evaluation of
              people, objects, advertisements, or issues (Solomon, 2020).
            </Lead>
            <Ruled>
              <P>
                Anything toward which a consumer holds an attitude, whether a
                specific brand, a product category, or a retail channel, is
                called an <Term>attitude object</Term> (A<sub>o</sub>).
              </P>
            </Ruled>
          </div>
          <Plate>
            <Evaluations />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Attitudes are characterized by <Term>valence</Term> (positive,
              negative, or neutral), <Term>extremity</Term> (how strongly the
              evaluation is held), and <Term>persistence</Term> over time.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because attitudes summarize prior learning and evaluation in
              memory, they allow consumers to make{" "}
              <Tint>rapid repeat choices</Tint> without re-evaluating every
              attribute from scratch.
            </P>
          </Ruled>
          <Ruled>
            <P>
              At the same time, strongly held attitudes create selective
              resistance to competing marketing claims.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Functional Theory of Attitudes
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-functional-theory-of-attitudes"
        border
        exercise={exercise["the-functional-theory-of-attitudes"]}
      >
        <SlideHeading>The Functional Theory of Attitudes</SlideHeading>
        <Lead>
          Developed by Daniel Katz, the <Term>functional theory of attitudes</Term>{" "}
          proposes that attitudes exist because they serve{" "}
          <Tint>specific psychological motives</Tint> for the person holding
          them (Katz, 1960).
        </Lead>
        <Plate wide className="mt-5">
          <KatzFunctions />
        </Plate>
        <div className="mt-5 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              The <Term>utilitarian function</Term> guides consumers toward
              products that provide tangible rewards and away from products
              that impose costs, such as favoring a detergent solely because
              it removes stains effectively.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>value-expressive function</Term> allows consumers to
              express their central values, self-concept, and social
              identity, such as driving an electric vehicle to signal
              environmental commitment.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>ego-defensive function</Term> protects the individual
              from external threats or internal insecurities, such as
              purchasing mouthwash or deodorant to avoid social
              embarrassment.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>knowledge function</Term> satisfies the need for
              order, structure, and meaning, especially when a consumer
              encounters an unfamiliar technology or product category.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: The ABC Model and Hierarchies of Effects
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-the-abc-model-and-hierarchies-of-effects"
        border
      >
        <PartHead n={1} title="The ABC Model and Hierarchies of Effects" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Every attitude comprises{" "}
            <Tint>three interrelated components</Tint>: affect, behavior, and
            cognition.
          </Statement>
          <Ruled>
            <Lead>
              The sequence in which these three components develop depends on
              the consumer&apos;s level of involvement and the nature of the
              product category.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The ABC Model: Affect, Behavior, and Cognition
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-abc-model-affect-behavior-and-cognition"
        border
        exercise={exercise["the-abc-model-affect-behavior-and-cognition"]}
      >
        <SlideHeading kicker="The ABC Model:">
          Affect, Behavior, and Cognition
        </SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <Lead>
            The <Term>ABC model of attitudes</Term> specifies that an attitude
            consists of Affect, Behavior, and Cognition.
          </Lead>
          <Ruled>
            <P>
              While the three components often align, they{" "}
              <Tint>can conflict</Tint>, as when a consumer knows a sports car
              is fuel-inefficient (cognition) yet feels excited by its design
              (affect).
            </P>
          </Ruled>
        </div>
        <Plate wide className="mt-5">
          <ABCModelPlate />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Affect</Term> refers to the emotions and feelings a
              consumer experiences toward an attitude object, such as warmth
              toward a childhood cereal brand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Behavior</Term> (or conation) refers to the
              consumer&apos;s intentions to take action toward the object,
              such as planning to buy, recommend, or boycott a brand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Cognition</Term> refers to the factual beliefs and
              knowledge a consumer holds about the object&apos;s attributes,
              such as believing that a laptop has a fourteen-hour battery
              life.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Three Hierarchies of Attitude Formation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="three-hierarchies-of-attitude-formation"
        border
        exercise={exercise["three-hierarchies-of-attitude-formation"]}
      >
        <SlideHeading>Three Hierarchies of Attitude Formation</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <Lead>
            A <Term>hierarchy of effects</Term> describes the fixed sequence in
            which cognition, affect, and behavior unfold when an attitude is
            formed.
          </Lead>
          <Ruled>
            <P>
              Identifying which hierarchy governs a category tells marketers
              whether advertising should emphasize{" "}
              <Tint>
                detailed attribute facts, simple repetition, or emotional
                sensory appeal
              </Tint>.
            </P>
          </Ruled>
        </div>
        <Plate wide className="mt-5">
          <ThreeHierarchies />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              The <Term>standard learning hierarchy</Term> (Cognition to
              Affect to Behavior) applies to high-involvement problem
              solving: the buyer gathers beliefs first, forms a feeling, and
              then buys, as when purchasing a home or laptop.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>low-involvement hierarchy</Term> (Cognition to
              Behavior to Affect) applies to routine convenience goods: the
              buyer forms minimal beliefs from shelf familiarity, tries the
              item, and forms a feeling only after use.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>experiential hierarchy</Term> (Affect to Behavior to
              Cognition) applies to hedonic and impulse purchases: the buyer
              reacts emotionally to sensory or symbolic appeal, buys the
              item, and rationalizes the beliefs afterward.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Multi-Attribute Attitude Models and the Theory of Planned Behavior
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="multi-attribute-attitude-models-and-the-theory-of-planned-behavior"
        border
      >
        <SlideHeading>
          Multi-Attribute Attitude Models and the Theory of Planned Behavior
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Multi-attribute attitude models</Term>, such as the Fishbein
              model, represent a consumer&apos;s overall attitude toward a brand
              as the sum of beliefs about its attributes weighted by the
              importance evaluation of each attribute (Fishbein, 1963).
            </Lead>
            <Ruled>
              <P>
                Marketers can change overall brand attitude under a
                multi-attribute model by improving a weak attribute belief,
                raising the importance weight of a strong attribute, or
                introducing a novel attribute.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <SupportConflict />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              A favorable attitude toward a brand{" "}
              <Tint>does not always translate into an actual purchase</Tint> on
              the next shopping trip.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>Theory of Reasoned Action</Term> and the{" "}
              <Term>Theory of Planned Behavior</Term> explain this gap by
              predicting behavioral intention from three factors: attitude
              toward the specific act of buying, subjective social norms, and
              perceived behavioral control (Ajzen, 1991).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Subjective norms</Term> combine normative beliefs about what
              important reference groups think the consumer should do with the
              consumer&apos;s motivation to comply with those groups.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Persuasion and the Elaboration Likelihood Model
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-persuasion-and-the-elaboration-likelihood-model"
        border
      >
        <PartHead n={2} title="Persuasion and the Elaboration Likelihood Model" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            <Term>Persuasion</Term> is an{" "}
            <Tint>active attempt to change a consumer&apos;s attitude</Tint>{" "}
            through marketing communications.
          </Statement>
          <Ruled>
            <Lead>
              Dual-process models of persuasion explain why detailed factual
              arguments succeed in some situations while celebrity endorsements
              or catchy music succeed in others.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Communications Model of Persuasion
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-communications-model-of-persuasion"
        border
      >
        <SlideHeading>The Communications Model of Persuasion</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              The classic <Term>communications model</Term> analyzes persuasion
              across <Tint>five components</Tint>: the source, the message, the
              medium, the receiver, and feedback.
            </Lead>
            <Ruled>
              <P>
                The <Term>source</Term> (who delivers the communication)
                determines initial credibility and likability.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AdOnTheDesk />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              The <Term>message</Term> (what is said and how it is structured)
              supplies the arguments, emotional appeals, and visual cues.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>medium</Term> (the channel through which the message
              travels, such as print, short-form video, or an interactive sales
              assistant) shapes processing pace and context.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Characteristics of the <Term>receiver</Term>, including prior
              knowledge, involvement, and mood, determine how the message is
              decoded and whether counterarguing occurs.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Central and Peripheral Routes to Persuasion
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="central-and-peripheral-routes-to-persuasion"
        border
        exercise={exercise["central-and-peripheral-routes-to-persuasion"]}
      >
        <SlideHeading>Central and Peripheral Routes to Persuasion</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <P className="!max-w-none">
            Formulated by Richard Petty and John Cacioppo, the{" "}
            <Term>Elaboration Likelihood Model</Term> (ELM) states that
            persuasion occurs through one of two distinct cognitive routes
            depending on the consumer&apos;s{" "}
            <Tint>motivation and ability to process the message</Tint> (Petty
            &amp; Cacioppo, 1986).
          </P>
          <Plate>
            <TwoRoutes />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-x-10 gap-y-5 md:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P>
                When both motivation (involvement) and ability (knowledge and
                distraction-free time) are high, consumers follow the{" "}
                <Term>central route</Term> to persuasion.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Under the central route, consumers carefully scrutinize the
                quality and logic of the message arguments, producing durable
                attitudes that resist counter-persuasion and predict behavior
                strongly.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled>
              <P>
                When motivation or ability is low, consumers follow the{" "}
                <Term>peripheral route</Term> to persuasion, relying on surface
                cues such as package design, background music, source
                attractiveness, or the sheer number of arguments.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Attitudes formed via the peripheral route are temporary and
                vulnerable to competitor promotions unless reinforced by
                repeated exposure.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Message Structure: One-Sided Versus Two-Sided Appeals
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="message-structure-one-sided-versus-two-sided-appeals"
        border
      >
        <SlideHeading kicker="Message Structure:">
          One-Sided Versus Two-Sided Appeals
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              A <Term>one-sided message</Term> presents only arguments in favor
              of the brand and omits any mention of limitations or drawbacks.
            </Lead>
            <Ruled>
              <P>
                One-sided messages are most effective when the audience already
                holds a favorable attitude toward the brand or has low
                involvement and limited education on the topic.
              </P>
            </Ruled>
          </div>
          <Plate>
            <TrustworthySource />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              A <Term>two-sided</Term> (or <Term>refutational</Term>) message
              acknowledges a minor limitation on a secondary attribute and then
              demonstrates superiority on the primary attribute that matters
              most to buyers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Two-sided messages are more effective with skeptical,
              well-informed audiences because acknowledging a minor flaw{" "}
              <Tint>reduces counterarguing</Tint> and enhances perceived source
              trustworthiness.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Comparative advertising</Term> that names a leading
              competitor directly can accelerate positioning for an unknown
              challenger brand, but risks generating free recall for the market
              leader if poorly executed.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Matching Campaign Strategy to the Hierarchy of Effects
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-matching-campaign-strategy-to-the-hierarchy-of-effects"
        border
      >
        <SlideHeading kicker="Discussion:">
          Matching Campaign Strategy to the Hierarchy of Effects
        </SlideHeading>
        <Prompt>
          A pharmaceutical company is launching two products simultaneously: an
          over-the-counter lip balm for winter chapping and a
          prescription-alternative home diagnostic kit for food intolerances.
          Which attitude formation hierarchy and which route of the Elaboration
          Likelihood Model apply to each product, and how should message
          argument density, peripheral cues, and media placement differ between
          the two launches?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Source Effects and Message Framing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-source-effects-and-message-framing"
        border
      >
        <PartHead n={3} title="Source Effects and Message Framing" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Even when two advertisements contain identical factual claims,
            consumers respond differently depending on{" "}
            <Tint>who delivers the message and how the outcomes are framed</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Source credibility, source attractiveness, and gain-loss framing
              systematically alter persuasive impact.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Source Credibility and the Sleeper Effect
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="source-credibility-and-the-sleeper-effect"
        border
      >
        <SlideHeading>Source Credibility and the Sleeper Effect</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Source credibility</Term> is the extent to which a
              communicator is perceived as possessing relevant expertise,
              objectivity, and trustworthiness (Hovland &amp; Weiss, 1951).
            </Lead>
            <Ruled>
              <P>
                <Term>Expertise</Term> refers to the source&apos;s technical
                competence, qualifications, or experience within the product
                category, such as an orthopedic surgeon evaluating athletic
                footwear.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ExpertSource />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Trustworthiness</Term> refers to the audience&apos;s belief
              that the source is honest and impartial rather than motivated
              purely by financial compensation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When a credible source lacks trustworthiness because of
              undisclosed bias, consumers engage in{" "}
              <Term>source discounting</Term> and reject the message.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>sleeper effect</Term> occurs when a persuasive message
              delivered by a low-credibility source gains attitude acceptance
              over time because the audience{" "}
              <Tint>forgets the discounting source faster</Tint> than the
              message content itself.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Source Attractiveness and the Match-Up Hypothesis
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="source-attractiveness-and-the-match-up-hypothesis"
        border
        exercise={exercise["source-attractiveness-and-the-match-up-hypothesis"]}
      >
        <SlideHeading>
          Source Attractiveness and the Match-Up Hypothesis
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Source attractiveness</Term> derives from the
              communicator&apos;s physical appeal, social status, familiarity,
              likability, and perceived similarity to the target audience.
            </Lead>
            <Ruled>
              <P>
                Attractive or celebrity sources capture attention in cluttered
                media environments and transfer cultural meaning from the
                celebrity&apos;s persona to the brand (McCracken, 1989).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <Attractiveness />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              According to the <Term>match-up hypothesis</Term>, an endorser is
              persuasive only when the source&apos;s image and expertise{" "}
              <Tint>fit the nature of the endorsed product</Tint> (Kahle &amp;
              Homer, 1985).
            </P>
          </Ruled>
          <Ruled>
            <P>
              A physically attractive fashion model increases persuasion for
              cosmetics and luxury apparel, whereas an accomplished engineer or
              athlete is more effective for technical equipment.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When a celebrity endorser has no logical connection to the product
              category, consumers may remember the celebrity while failing to
              encode the brand name, a risk known as the{" "}
              <Term>vampire effect</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Positive Versus Negative Message Framing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="positive-versus-negative-message-framing"
        border
      >
        <SlideHeading>Positive Versus Negative Message Framing</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Message framing</Term> refers to whether a persuasive
              communication emphasizes the positive benefits of adopting a
              behavior (<Term>gain frame</Term>) or the negative consequences of
              failing to adopt it (<Term>loss frame</Term>).
            </Lead>
            <Ruled>
              <P>
                <Term>Attribute framing</Term> describes a single characteristic
                in either positive or negative terms, such as labeling snack
                crackers &quot;90 percent fat-free&quot; versus &quot;10 percent
                fat.&quot;
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <MessageFraming />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Goal framing</Term> contrasts the benefit of action
              (&quot;Flossing daily keeps gums healthy&quot;) with the cost of
              inaction (&quot;Failing to floss daily leads to gum
              disease&quot;).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Regulatory focus theory</Term> shows that gain frames are
              more persuasive when consumers are in a promotion focus seeking
              growth and advancement, whereas loss frames are more persuasive
              under a prevention focus seeking safety and risk avoidance
              (Higgins, 1997).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Fear appeals</Term> are a specific form of loss framing that
              succeed only when paired with a{" "}
              <Tint>clear, high-efficacy action</Tint> the consumer can take to
              avert the threat.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: AI as a Message Source: Aversion and Appreciation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-ai-as-a-message-source-aversion-and-appreciation"
        border
      >
        <PartHead
          n={4}
          title="AI as a Message Source: Aversion and Appreciation"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Consumers increasingly receive product recommendations, financial
            advice, and medical screening from{" "}
            <Tint>algorithmic systems and conversational AI assistants</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Research on human-algorithm interaction reveals that consumers
              evaluate AI message sources through distinct patterns of algorithm
              aversion and algorithm appreciation.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Algorithm Aversion After Observing Error
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="algorithm-aversion-after-observing-error"
        border
      >
        <SlideHeading>Algorithm Aversion After Observing Error</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Algorithm aversion</Term> is the tendency of decision makers
              to distrust and reject algorithmic forecasters or advisors in
              favor of human judgment, even when the algorithm is statistically
              more accurate on average (Dietvorst, Simmons, &amp; Massey, 2015).
            </Lead>
            <Ruled>
              <P>
                Before observing any performance history, consumers are often
                neutral or open toward algorithmic advice.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SameMistake />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              However, once people observe an algorithm make an error, they{" "}
              <Tint>lose confidence in the algorithm much more rapidly</Tint>{" "}
              than they lose confidence in a human advisor who makes the exact
              same error (Dietvorst, Simmons, &amp; Massey, 2015).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers tend to attribute a human advisor&apos;s mistake to
              temporary fatigue or an isolated oversight while assuming the
              human will learn from experience.
            </P>
          </Ruled>
          <Ruled>
            <P>
              By contrast, consumers interpret an algorithmic error as evidence
              of a permanent structural flaw in the software, though giving
              users slight control to adjust the algorithm&apos;s forecast
              reduces this aversion (Dietvorst, Simmons, &amp; Massey, 2018).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Algorithm Appreciation and Task Objectivity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="algorithm-appreciation-and-task-objectivity"
        border
        exercise={exercise["algorithm-appreciation-and-task-objectivity"]}
      >
        <SlideHeading>Algorithm Appreciation and Task Objectivity</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <P className="!max-w-none">
              <Term>Algorithm appreciation</Term> is the opposite phenomenon, in
              which people adhere more closely to identical advice when they are
              told it comes from an algorithm than when they are told it comes
              from a human advisor (Logg, Minson, &amp; Moore, 2019).
            </P>
            <Ruled>
              <Lead>
                Whether consumers exhibit algorithm appreciation or algorithm
                aversion depends systematically on the{" "}
                <Tint>perceived objectivity of the task</Tint> (Castelo, Bos,
                &amp; Lehmann, 2019).
              </Lead>
            </Ruled>
          </div>
          <Plate>
            <ObjectiveSubjective />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              For tasks perceived as objective and quantifiable, such as
              forecasting stock returns, calculating mortgage refinancing
              savings, or routing traffic, consumers trust algorithms at high
              rates.
            </P>
          </Ruled>
          <Ruled>
            <P>
              For tasks perceived as subjective, emotional, or reliant on human
              intuition, such as recommending a romantic movie, selecting a
              joke, or choosing a personal gift, consumers strongly prefer human
              sources (Castelo, Bos, &amp; Lehmann, 2019).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Framing a subjective recommendation task around quantifiable
              behavioral steps increases consumer willingness to rely on an
              algorithmic source (Castelo, Bos, &amp; Lehmann, 2019).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Credibility and Perceived Independence of AI Advisors
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="credibility-and-perceived-independence-of-ai-advisors"
        border
      >
        <SlideHeading>
          Credibility and Perceived Independence of AI Advisors
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Like human communicators, AI recommendation sources are evaluated
              on the two classic pillars of credibility: expertise and
              trustworthiness.
            </Lead>
            <Ruled>
              <P>
                Conversational AI assistants project high apparent expertise
                because they generate fluent, structured, and immediate
                comparisons across dozens of technical attributes.
              </P>
            </Ruled>
          </div>
          <Plate>
            <WhoseInterests />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Perceived trustworthiness, however, depends on whether the
              consumer believes the AI system acts as an{" "}
              <Tint>independent advisor or as a commissioned sales channel</Tint>{" "}
              for the platform operating it.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When consumers suspect that an AI assistant prioritizes
              high-margin house brands or paid sponsorships without disclosure,
              source discounting erodes trust in the entire system.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Maintaining persuasive credibility for an AI shopping assistant
              therefore requires both verifiable accuracy and transparent
              alignment with the user&apos;s interests.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Measuring Attitudes in Humans and AI Models
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-measuring-attitudes-in-humans-and-ai-models"
        border
      >
        <PartHead n={5} title="Measuring Attitudes in Humans and AI Models" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Because large language models now advise consumers and act as
            surrogate buyers, researchers need rigorous methods to{" "}
            <Tint>measure the attitudes and evaluations</Tint> embedded in these
            models.
          </Statement>
          <Ruled>
            <Lead>
              Applying psychometric attitude scales to AI models reveals both
              methodological requirements and systematic differences across
              model developers.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Consumer Attitude Scales: Likert and Semantic Differential
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="consumer-attitude-scales-likert-and-semantic-differential"
        border
      >
        <SlideHeading kicker="Consumer Attitude Scales:">
          Likert and Semantic Differential
        </SlideHeading>
        <Lead className="">
          In human consumer research, attitudes are measured using structured
          multi-item self-report instruments.
        </Lead>
        <div className="mt-7 grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              A <Term>Likert scale</Term> presents a declarative statement about
              an attitude object and asks respondents to rate their degree of
              agreement, typically on a five-point or seven-point scale from
              &quot;strongly disagree&quot; to &quot;strongly agree&quot;
              (Likert, 1932).
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>semantic differential scale</Term> asks respondents to
              rate an attitude object across a series of bipolar adjective
              pairs, such as &quot;unreliable-reliable,&quot;
              &quot;expensive-inexpensive,&quot; and
              &quot;unpleasant-pleasant&quot; (Osgood, Suci, &amp; Tannenbaum,
              1957).
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Big className="">
            Combining multiple items into a composite index{" "}
            <Tint>reduces measurement error</Tint> from any single
            question&apos;s wording.
          </Big>
          <Ruled>
            <P>
              Researchers validate these scales for internal consistency
              reliability and construct validity before using them to compare
              market segments.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Administering Attitude Scales to Large Language Models
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="administering-attitude-scales-to-large-language-models"
        border
        exercise={exercise["administering-attitude-scales-to-large-language-models"]}
      >
        <SlideHeading>
          Administering Attitude Scales to Large Language Models
        </SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <P className="!max-w-none">
            Researchers now administer validated consumer attitude scales
            directly to large language models to audit the evaluations that
            guide model recommendations.
          </P>
          <P className="!max-w-none">
            Unlike a deterministic database lookup, a language model samples
            tokens probabilistically and does not return a single fixed rating.
          </P>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <Plate wide>
            <AskTwoModels />
          </Plate>
          <div className="flex min-w-0 flex-col gap-4">
            <Ruled className="!pt-3">
              <P>
                Asked the identical Likert-scale question across repeated
                independent runs, the same model can output different scale
                points on different trials (Wadi &amp; Fredette, 2025).
              </P>
            </Ruled>
            <Ruled className="!pt-3">
              <P>
                Treating a single completion as &quot;the model&apos;s
                attitude&quot; therefore introduces{" "}
                <Tint>severe measurement error</Tint>.
              </P>
            </Ruled>
            <Ruled className="!pt-3">
              <P>
                Reliable measurement requires either administering each scale
                item across many independent runs or extracting the probability
                distribution the model assigns to each scale option (Wadi,
                Ghodrat, &amp; Philp, 2026).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Cross-Developer Attitude Differences in AI Models
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cross-developer-attitude-differences-in-ai-models"
        border
      >
        <SlideHeading>
          Cross-Developer Attitude Differences in AI Models
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              When consumer attitude scales are measured across full response
              distributions,{" "}
              <Tint>systematic differences emerge</Tint> across models built by
              different organizations (Wadi, Ghodrat, &amp; Philp, 2026).
            </Lead>
            <Ruled>
              <P>
                Models trained on different text mixtures and post-training
                alignment procedures hold measurably different baseline
                evaluations on identical consumer attitude constructs (Wadi,
                Ghodrat, &amp; Philp, 2026).
              </P>
            </Ruled>
          </div>
          <Plate>
            <PatternNotFeeling />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              An attitude measured in a language model is a{" "}
              <Term>statistical regularity</Term> in its conditional output
              distribution rather than a conscious affective state experienced
              by a machine.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Nevertheless, these statistical dispositions have real marketplace
              consequences whenever they steer which brands, countries of
              origin, or product attributes an assistant recommends to users.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Brand managers and researchers must therefore audit attitude
              scales across multiple frontier models rather than assuming all AI
              assistants share a single neutral baseline.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing an AI Advisory Interface for Financial Planning
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-an-ai-advisory-interface-for-financial-planning"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing an AI Advisory Interface for Financial Planning
        </SlideHeading>
        <Prompt className="!max-w-5xl">
          A retail bank is introducing an AI-powered advisor inside its mobile
          app to help customers choose between two products: (1) refinancing a
          fixed-rate mortgage based on interest-rate math and (2) selecting a
          socially responsible investment portfolio that reflects the
          customer&apos;s personal ethics. Drawing on algorithm aversion,
          algorithm appreciation, task objectivity (Castelo, Bos, &amp; Lehmann,
          2019), and the Elaboration Likelihood Model, how should the bank
          design the source attribution, human-in-the-loop controls, and message
          framing for each of the two advisory journeys?
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
              Attitudes are lasting evaluations of objects that serve
              utilitarian, value-expressive, ego-defensive, and knowledge
              functions for the consumer.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The ABC model decomposes attitudes into affect, behavior, and
              cognition, which form through the standard learning,
              low-involvement, or experiential hierarchy depending on category
              involvement.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Multi-attribute models and the Theory of Planned Behavior explain
              how attribute beliefs, importance weights, subjective social
              norms, and perceived behavioral control combine to predict
              purchase intentions.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              The Elaboration Likelihood Model distinguishes central-route
              persuasion driven by argument quality under high involvement from
              peripheral-route persuasion driven by surface cues under low
              involvement.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Persuasive impact depends on source credibility (expertise and
              trustworthiness), source attractiveness (governed by the match-up
              hypothesis), and gain versus loss message framing.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Consumers exhibit algorithm aversion after observing errors and
              algorithm appreciation on objective tasks, while reliable
              measurement of AI models&apos; attitudes requires repeated
              sampling or token probability distributions across validated
              scales.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
