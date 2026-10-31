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
  AdPanel,
  AIOStrip,
  AnchoredAsk,
  AskAgain,
  BakerVsParent,
  BigFiveStrip,
  BrandPersonalityStrip,
  BridgePanel,
  ExtendedRings,
  LeaveTheLastStep,
  MirrorSelf,
  NeedForCognition,
  RealAndSynthetic,
  SelfJudgement,
  VALSMap,
  WhoWhy,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 5: PERSONALITY, SELF-CONCEPT, AND LIFESTYLES
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week5() {
  return (
    <SlideDeck label="Week 5">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 5
          </p>
          <p className="type-caption mt-2">Consumer Behavior | Davood Wadi, PhD</p>
          <Title className="mt-6">Personality, Self-Concept, and Lifestyles</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumers select products and brands not only for functional
              performance, but also to express their{" "}
              <Tint>self-concept, personality traits, and lifestyle patterns</Tint>.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining the Self-Concept and Self-Esteem
          ================================================================ */}
      <Slide className={TIGHT} id="defining-the-self-concept-and-self-esteem" border>
        <SlideHeading>Defining the Self-Concept and Self-Esteem</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.55fr] lg:gap-10">
          <div className="grid min-w-0 content-start gap-4">
            <Statement>
              The <Term>self-concept</Term> is the totality of an
              individual&apos;s beliefs, thoughts, and evaluations regarding
              their own personal attributes, roles, and capabilities.
            </Statement>
            <Ruled>
              <P>
                It encompasses physical appearance, intellectual abilities,
                social roles, and moral character.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <SelfJudgement />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Self-esteem</Term> refers to the{" "}
              <Tint>overall positivity or negativity</Tint> of a person&apos;s
              self-concept.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers with <Term>high self-esteem</Term> generally expect
              social acceptance and are more willing to experiment with novel or
              unconventional products.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumers with <Term>low self-esteem</Term> are motivated to avoid
              social rejection and tend to prefer established, socially safe
              brands.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Multiple Selves and Situational Self-Image
          ================================================================ */}
      <Slide className={TIGHT} id="multiple-selves-and-situational-self-image" border>
        <SlideHeading>Multiple Selves and Situational Self-Image</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.45fr_0.85fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Rather than holding a single monolithic identity, consumers
              maintain <Term>multiple role identities</Term> that become active
              in different social contexts (Markus &amp; Nurius, 1986).
            </Lead>
            <Ruled>
              <P>
                The same individual may act as a conservative financial analyst
                at work, an adventurous trail runner on weekends, and a
                nurturing parent at home.
              </P>
            </Ruled>
          </div>
          <Plate className="lg:max-w-[330px]">
            <MirrorSelf />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Each active role activates a distinct{" "}
              <Term>situational self-image</Term> and a corresponding set of
              appropriate products, clothing, and brands.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>looking-glass self</Term> describes the process of
              imagining how others evaluate us and adjusting our behavior and
              possessions to manage that impression (Cooley, 1902).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketing communications succeed when they cue the{" "}
              <Tint>specific situational identity</Tint> that is relevant to the
              product&apos;s usage occasion.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Self-Concept, Symbolic Consumption, and the Extended Self
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-self-concept-symbolic-consumption-and-the-extended-self"
        border
      >
        <PartHead n={1} title="Self-Concept, Symbolic Consumption, and the Extended Self" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            <Term>Symbolic consumption</Term> occurs when buyers evaluate
            products based on{" "}
            <Tint>what those products communicate</Tint> to themselves and
            others about who they are.
          </Statement>
          <Ruled>
            <Lead>
              Gap reduction between the actual and ideal self, self-image
              congruence, and the extended self explain how possessions become
              part of personal identity.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Actual Self, the Ideal Self, and Compensatory Consumption
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-actual-self-the-ideal-self-and-compensatory-consumption"
        border
        exercise={exercise["the-actual-self-the-ideal-self-and-compensatory-consumption"]}
      >
        <SlideHeading>
          The Actual Self, the Ideal Self, and Compensatory Consumption
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              The <Term>actual self</Term> is a person&apos;s realistic
              appraisal of the qualities and attributes they currently possess.
            </Lead>
            <Ruled>
              <P>
                The <Term>ideal self</Term> is the person&apos;s conception of
                how they would like to be, shaped by cultural heroes, peers, and
                advertising models.
              </P>
            </Ruled>
          </div>
          <Plate>
            <BridgePanel />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When a consumer experiences a threat or discrepancy between the
              actual self and the ideal self on an important dimension,{" "}
              <Term>self-discrepancy tension</Term> arises (Higgins, 1987).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Compensatory consumption</Term> is the acquisition and
              display of symbolic goods to{" "}
              <Tint>offset a perceived self-deficit</Tint>, such as buying
              high-status apparel when professional competence feels threatened.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Realistic marketing appeals target the actual self with everyday
              relatability, whereas aspirational appeals depict how a brand
              moves the buyer toward the ideal self.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Self-Image Congruence Theory
          ================================================================ */}
      <Slide className={TIGHT} id="self-image-congruence-theory" border>
        <SlideHeading>Self-Image Congruence Theory</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Self-image congruence theory</Term> states that consumers
              prefer brands whose perceived image{" "}
              <Tint>matches their own self-concept</Tint> (Sirgy, 1982).
            </Lead>
            <Ruled>
              <P>
                For privately consumed utilitarian products, evaluation is
                guided primarily by functional congruence between product
                performance and practical requirements.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AdPanel />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              For publicly visible products such as automobiles, watches, and
              apparel, evaluation depends heavily on congruence with the social
              or ideal self.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Symbolic self-completion theory</Term> adds that individuals
              who feel incomplete in a newly adopted role, such as a novice
              golfer or first-year executive, rely most heavily on visible role
              symbols (Wicklund &amp; Gollwitzer, 1982).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Experienced experts with secure role identities feel less need to
              display conspicuous beginner equipment to prove their membership.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Extended Self Across Four Levels of Identity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-extended-self-across-four-levels-of-identity"
        border
        exercise={exercise["the-extended-self-across-four-levels-of-identity"]}
      >
        <SlideHeading>The Extended Self Across Four Levels of Identity</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <Statement className="">
              Formulated by Russell Belk, the <Term>extended self</Term>{" "}
              encompasses the external objects, places, and possessions that
              consumers functionally and emotionally{" "}
              <Tint>integrate into their identity</Tint> (Belk, 1988).
            </Statement>
          <Plate wide>
            <ExtendedRings />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Numbered n={1}>
                <P>
                  At the <Term>individual level</Term>, personal items such as
                  clothing, jewelry, smartphones, and automobiles serve as
                  direct extensions of the person.
                </P>
              </Numbered>
              <Numbered n={2}>
                <P>
                  At the <Term>family level</Term>, the residence and its
                  furnishings represent shared household identity and continuity
                  across generations.
                </P>
              </Numbered>
              <Numbered n={3}>
                <P>
                  At the <Term>community level</Term>, attachment to a
                  neighborhood, city, or region shapes local civic identity and
                  consumption habits.
                </P>
              </Numbered>
              <Numbered n={4}>
                <P>
                  At the <Term>group level</Term>, shared symbols such as sports
                  team jerseys, university insignia, and subcultural artifacts
                  anchor collective belonging.
                </P>
              </Numbered>
            </ol>
      </Slide>

      {/* ================================================================
          Part 2: Identity-Based Consumption and Resistance to Automation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-identity-based-consumption-and-resistance-to-automation"
        border
      >
        <PartHead n={2} title="Identity-Based Consumption and Resistance to Automation" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Modern appliances, software tools, and AI agents increasingly offer
            to automate tasks that consumers previously performed by hand.
          </Statement>
          <Ruled>
            <Lead>
              Whether consumers welcome or reject automation depends on whether
              the automated task is{" "}
              <Tint>central to their self-concept</Tint>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Identity Relevance and Internal Attribution of Effort
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="identity-relevance-and-internal-attribution-of-effort"
        border
      >
        <SlideHeading>Identity Relevance and Internal Attribution of Effort</SlideHeading>
        <Statement className="">
          Consumers derive identity value from an activity only when they can{" "}
          <Tint>attribute the outcome</Tint> to their own skill, effort, and
          judgment.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              A home cook who prepares a complex meal from scratch experiences
              pride and self-expression because the finished dish reflects
              personal competence.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If a fully automated machine performs the core skill steps of
              chopping, seasoning, and cooking, the consumer can no longer claim
              authorship of the outcome.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Big className="">
            Consequently, full automation severs the link between task
            completion and identity expression.
          </Big>
          <Ruled>
            <P>
              This mechanism explains why historical products such as instant
              cake mixes initially met resistance when they removed too much of
              the baker&apos;s perceived contribution.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Consumer Resistance to Automating Identity-Relevant Tasks
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="consumer-resistance-to-automating-identity-relevant-tasks"
        border
        exercise={exercise["consumer-resistance-to-automating-identity-relevant-tasks"]}
      >
        <SlideHeading>
          Consumer Resistance to Automating Identity-Relevant Tasks
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="grid min-w-0 content-start gap-4">
            <P>
              Empirical research by Leung, Paolacci, and Puntoni (2018)
              demonstrates that consumers who strongly identify with a domain
              resist products that automate skill-based tasks within that
              domain.
            </P>
            <Ruled>
              <P>
                Across studies of cooking, baking, driving, and gardening,{" "}
                <Term>non-identifiers</Term> welcomed labor-saving automation
                because their primary goal was convenience.
              </P>
            </Ruled>
            <Ruled>
              <P>
                In contrast, <Term>strong identifiers</Term> rejected automated
                features that replaced the core skill of the activity, preferring
                manual control even when it required greater effort (Leung,
                Paolacci, &amp; Puntoni, 2018).
              </P>
            </Ruled>
          </div>
          <Plate>
            <BakerVsParent />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Identifiers did not reject all technology: they accepted tools
              that assisted peripheral preparation without replacing the central
              skill step.
            </P>
          </Ruled>
          <Ruled>
            <Big className="">
              Resistance to automation is therefore driven by the desire to{" "}
              <Tint>protect self-attribution</Tint> rather than by general
              technophobia.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Designing Automated Products and AI Delegation Around Identity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="designing-automated-products-and-ai-delegation-around-identity"
        border
      >
        <SlideHeading>
          Designing Automated Products and AI Delegation Around Identity
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              The same identity mechanism governs how consumers adopt AI
              assistants and autonomous shopping agents.
            </Lead>
            <Ruled>
              <P>
                A consumer who views fashion curation, vinyl record collecting,
                or gift selection as central to personal identity will resist
                delegating those choices to an AI agent.
              </P>
            </Ruled>
          </div>
          <Plate>
            <LeaveTheLastStep />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Conversely, the same consumer will readily let an AI agent
              automate non-identity tasks such as comparing utility tariffs or
              reordering household cleaning supplies.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers introducing automated products or AI tools into
              identity-relevant categories can preserve adoption by positioning
              the tool as a <Tint>collaborator</Tint> that leaves final creative
              control to the user.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Allowing the consumer to customize parameters or execute the
              signature step preserves <Term>psychological ownership</Term> of
              the result.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Automation in Identity-Driven Categories
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-automation-in-identity-driven-categories"
        border
      >
        <SlideHeading kicker="Discussion:">
          Automation in Identity-Driven Categories
        </SlideHeading>
        <Prompt>
          A camera manufacturer is launching an AI-assisted mirrorless camera
          that can automatically compose shots, select aperture and shutter
          settings, and retouch portraits in real time. Using the extended self
          and the findings of Leung, Paolacci, and Puntoni (2018), explain how
          amateur smartphone upgraders versus serious hobbyist photographers
          will react to this feature set, and recommend how the firm should
          frame and configure the AI modes for each segment.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Human Personality Traits and Brand Personality
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-human-personality-traits-and-brand-personality"
        border
      >
        <PartHead n={3} title="Human Personality Traits and Brand Personality" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Beyond the self-concept, individuals exhibit{" "}
            <Tint>enduring psychological predispositions</Tint> that shape how
            they respond to novelty, risk, and persuasive messages.
          </Statement>
          <Ruled>
            <Lead>
              Consumers also project human personality dimensions onto brands,
              forming relationships with corporate symbols.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Trait Theory and Consumer-Specific Traits
          ================================================================ */}
      <Slide className={TIGHT} id="trait-theory-and-consumer-specific-traits" border>
        <SlideHeading>Trait Theory and Consumer-Specific Traits</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Personality</Term> is a person&apos;s distinctive
              psychological makeup that <Tint>consistently</Tint> influences how
              the individual responds to their environment over time.
            </Lead>
            <Ruled>
              <P>
                <Term>Trait theory</Term> focuses on the quantitative
                measurement of specific psychological dimensions across
                individuals.
              </P>
            </Ruled>
          </div>
          <Plate>
            <NeedForCognition />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <P>
              <Term>Consumer innovativeness</Term> is the degree to which a
              person is receptive to new products, services, and experiences
              rather than remaining attached to familiar options.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Need for cognition (NFC)</Term> measures the degree to which
              an individual enjoys effortful cognitive activity, determining
              whether they prefer detailed technical copy or peripheral visual
              cues (Cacioppo &amp; Petty, 1982).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Materialism</Term> measures the importance a consumer
              attaches to worldly possessions as a source of happiness and
              social status, while <Term>frugality</Term> measures disciplined
              restraint in acquiring and using economic goods.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Five-Factor Model of Personality
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-five-factor-model-of-personality"
        border
        exercise={exercise["the-five-factor-model-of-personality"]}
      >
        <SlideHeading>The Five-Factor Model of Personality</SlideHeading>
        <Lead>
          Contemporary personality psychology converges on the{" "}
          <Tint>Five-Factor Model (the Big Five)</Tint> as the primary taxonomy
          of human traits (McCrae &amp; Costa, 1987).
        </Lead>
        <Plate wide className="mt-6">
          <BigFiveStrip />
        </Plate>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              <Term>Openness to experience</Term> captures intellectual
              curiosity, aesthetic sensitivity, imagination, and preference for
              variety.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Conscientiousness</Term> captures organization,
              self-discipline, dependability, and goal-directed planning.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Extraversion</Term> captures sociability, assertiveness,
              positive energy, and excitement-seeking in social environments.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Agreeableness</Term> captures empathy, interpersonal trust,
              warmth, and cooperative orientation, while{" "}
              <Term>neuroticism</Term> captures emotional instability and
              proneness to anxiety or stress.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Brand Personality Dimensions and Anthropomorphism
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-personality-dimensions-and-anthropomorphism"
        border
        exercise={exercise["brand-personality-dimensions-and-anthropomorphism"]}
      >
        <SlideHeading>Brand Personality Dimensions and Anthropomorphism</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <Statement>
            <Term>Brand personality</Term> is the set of{" "}
            <Tint>human characteristics</Tint> permanently associated with a
            brand name in consumer memory (Aaker, 1997).
          </Statement>
          <Ruled>
            <P className="!max-w-none">
              Jennifer Aaker identified five core dimensions of brand
              personality: <Term>sincerity</Term> (down-to-earth, honest,
              wholesome), <Term>excitement</Term> (daring, spirited,
              imaginative), <Term>competence</Term> (reliable, intelligent,
              successful), <Term>sophistication</Term> (upper-class, charming),
              and <Term>ruggedness</Term> (outdoorsy, tough).
            </P>
          </Ruled>
        </div>
        <Plate wide className="mt-5">
          <BrandPersonalityStrip />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              <Term>Anthropomorphism</Term> occurs when marketers endow a brand
              or product with human physical features, voices, or intentions, as
              in brand mascots or conversational assistants.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Anthropomorphized brands foster stronger emotional attachment and
              brand love when performance is high.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, when an anthropomorphized brand commits a service failure
              or ethical transgression, consumers judge it as a deliberate
              betrayal rather than a mechanical error.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Lifestyles, Psychographics, and VALS
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-lifestyles-psychographics-and-vals"
        border
      >
        <PartHead n={4} title="Lifestyles, Psychographics, and VALS" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Two consumers with identical demographic profiles in age, income,
            and education frequently purchase{" "}
            <Tint>entirely different brands</Tint> and leisure experiences.
          </Statement>
          <Ruled>
            <Lead>
              <Term>Psychographics</Term> combines psychology and demographics to
              measure how consumers express their identities through everyday
              lifestyles.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Lifestyles Versus Demographics in Market Segmentation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="lifestyles-versus-demographics-in-market-segmentation"
        border
      >
        <SlideHeading>Lifestyles Versus Demographics in Market Segmentation</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.55fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              A <Term>lifestyle</Term> is a pattern of consumption reflecting a
              person&apos;s choices about how to allocate time, money, and
              attention across products and activities.
            </Lead>
            <Ruled>
              <P>
                <Term>Demographic variables</Term> describe who buys a product
                objectively, making them useful for buying media space and
                estimating census market size.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <WhoWhy />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Psychographic variables</Term> explain why those buyers
              choose a specific brand, providing the insights needed to craft
              advertising tone, imagery, and product positioning.
            </P>
          </Ruled>
          <Ruled>
            <P>
              For example, two 35-year-old households earning 110,000 dollars a
              year may diverge completely between urban culinary exploration and
              suburban home renovation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Effective segmentation <Tint>pairs</Tint> demographic reach data
              with psychographic lifestyle profiles.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Measuring Activities, Interests, and Opinions
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="measuring-activities-interests-and-opinions"
        border
        exercise={exercise["measuring-activities-interests-and-opinions"]}
      >
        <SlideHeading>Measuring Activities, Interests, and Opinions</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <Lead>
            Quantitative psychographic studies typically administer large-scale
            surveys measuring Activities, Interests, and Opinions, known as{" "}
            <Term>AIO inventories</Term>.
          </Lead>
          <Ruled>
            <P>
              Clustering respondents across hundreds of AIO statements reveals{" "}
              <Tint>distinct lifestyle segments</Tint> that transcend single
              product categories.
            </P>
          </Ruled>
        </div>
        <Plate wide className="mt-5">
          <AIOStrip />
        </Plate>
        <div className="mt-5 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Activities</Term> measure observable behaviors showing how
              consumers spend their time, including hobbies, sports, shopping
              routines, entertainment, and community work.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Interests</Term> measure the degree of excitement and
              ongoing attention a consumer devotes to topics such as food,
              fashion, technology, family, or fitness.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Opinions</Term> measure descriptive beliefs and normative
              views regarding oneself, social issues, politics, business
              practices, and future economic trends.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The VALS Psychographic Segmentation System
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-vals-psychographic-segmentation-system"
        border
      >
        <SlideHeading>The VALS Psychographic Segmentation System</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div className="grid min-w-0 content-start gap-4">
            <Lead>
              Developed by SRI International, the{" "}
              <Term>Values and Lifestyles (VALS)</Term> system classifies adults
              into eight segments organized along two dimensions:{" "}
              <Tint>primary motivation and resources</Tint>.
            </Lead>
            <Ruled>
              <P>
                The three primary motivations are ideals (guided by knowledge and
                principles, splitting into Thinkers and Believers), achievement
                (guided by social approval and success, splitting into Achievers
                and Strivers), and self-expression (guided by action, variety,
                and physical risk, splitting into Experiencers and Makers).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <VALSMap />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <P>
              The vertical axis measures psychological, physical, and financial
              resources, ranging from Innovators at the top to Survivors at the
              base.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Innovators</Term> possess abundant resources and high
              innovativeness, adopting premium and emerging technologies across
              all three motivational orientations.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Survivors</Term> possess the lowest resources and exhibit
              cautious, brand-loyal behavior focused on meeting immediate safety
              and physiological needs.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Synthetic Consumers in Psychographic Research
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-synthetic-consumers-in-psychographic-research"
        border
      >
        <PartHead n={5} title="Synthetic Consumers in Psychographic Research" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Because administering large psychographic and attitude surveys to
            thousands of human respondents is costly and slow, researchers have
            begun testing <Term>large language models</Term> as simulated
            respondents.
          </Statement>
          <Ruled>
            <Lead>
              Evaluating synthetic consumers requires comparing where model
              outputs match human patterns and where they{" "}
              <Tint>fail systematically</Tint>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Large Language Models as Simulated Survey Respondents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="large-language-models-as-simulated-survey-respondents"
        border
      >
        <SlideHeading>Large Language Models as Simulated Survey Respondents</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              A <Term>synthetic respondent</Term> (or <Term>silicon sample</Term>)
              is created by conditioning a large language model on a demographic
              and psychographic persona and asking it to answer marketing survey
              questions.
            </Lead>
            <Ruled>
              <P>
                Early studies demonstrated that language models prompted with
                consumer profiles can reproduce certain aggregate directional
                patterns, such as downward-sloping demand curves and established
                brand preferences (Brand, Israeli, &amp; Ngwe, 2023).
              </P>
            </Ruled>
          </div>
          <Plate>
            <RealAndSynthetic />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <Ruled>
            <P>
              Synthetic surveys can be executed in minutes at a fraction of the
              cost of commercial online panels.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because the model has read vast corpora of consumer text, its
              responses often reflect common cultural associations between
              demographic traits and product preferences.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, plausibility at the aggregate level does not guarantee{" "}
              <Tint>psychometric validity</Tint> or fidelity to real consumer
              populations.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Response Instability and Systematic Biases in Synthetic Respondents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="response-instability-and-systematic-biases-in-synthetic-respondents"
        border
        exercise={
          exercise["response-instability-and-systematic-biases-in-synthetic-respondents"]
        }
      >
        <SlideHeading>
          Response Instability and Systematic Biases in Synthetic Respondents
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.75fr] lg:gap-10">
          <div className="grid min-w-0 content-start gap-4">
            <P>
              Empirical evaluations reveal major psychometric limitations when
              large language models are used as survey respondents.
            </P>
            <Ruled>
              <P>
                First, models exhibit <Term>stochastic instability</Term>: asked
                the identical survey question repeatedly under the same persona,
                the same model can generate substantially different ratings
                across runs (Wadi &amp; Fredette, 2025).
              </P>
            </Ruled>
            <Ruled>
              <P>
                Second, models exhibit strong sensitivity to irrelevant numerical{" "}
                <Term>anchors</Term> embedded in the prompt, with newer model
                releases sometimes displaying larger anchoring biases than older
                releases (Wadi &amp; Fredette, 2025).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <AnchoredAsk />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Third, models exhibit systematic <Term>cultural and
              country-of-origin biases</Term> that vary by the developer&apos;s
              home region and the country named in the survey item (Wadi,
              Ghodrat, &amp; Philp, 2026).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Unlike a human respondent, a language model has{" "}
              <Tint>no lived physiological or emotional experience</Tint> of
              purchasing, owning, or consuming a product.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Appropriate Boundaries for Synthetic Consumer Research
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="appropriate-boundaries-for-synthetic-consumer-research"
        border
      >
        <SlideHeading>Appropriate Boundaries for Synthetic Consumer Research</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Because of response variance and training-corpus biases, synthetic
              respondents cannot replace human samples for final segmentation
              sizing, pricing validation, or new-product forecasting.
            </Lead>
            <Ruled>
              <P>
                Synthetic distributions also tend to compress minority
                viewpoints and under-represent segments whose behaviors are less
                documented in online text.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AskAgain />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Synthetic respondents are methodologically useful during the{" "}
              <Term>exploratory stage</Term> of research: pre-testing survey
              wording, checking for confusing scale items, and generating
              initial hypotheses.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When researchers do evaluate model outputs on rating scales, they
              must sample responses repeatedly (Wadi &amp; Fredette, 2025) or
              inspect token probability distributions rather than relying on a
              single completion (Wadi, Ghodrat, &amp; Philp, 2026).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Substantive marketing decisions about human consumers still
              require <Tint>empirical verification on human respondents</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Evaluating a Synthetic Psychographic Study
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-evaluating-a-synthetic-psychographic-study"
        border
      >
        <SlideHeading kicker="Discussion:">
          Evaluating a Synthetic Psychographic Study
        </SlideHeading>
        <Prompt>
          A consumer packaged goods firm plans to launch a line of functional
          probiotic sodas in Canada, France, and Japan. An external consultancy
          proposes skipping human AIO and VALS surveys altogether and instead
          interviewing 5,000 LLM-generated personas across the three countries
          to select the brand personality and price point. Drawing on research
          on synthetic respondents by Brand, Israeli, and Ngwe (2023), Wadi and
          Fredette (2025), and Wadi, Ghodrat, and Philp (2026), which parts of
          this proposal are defensible, which parts risk costly errors, and how
          should the research design be modified?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Numbered n={1}>
            <P>
              The self-concept comprises the beliefs a consumer holds about
              their attributes, and discrepancies between the actual self and
              the ideal self motivate aspirational and compensatory consumption.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Through self-image congruence and the extended self (individual,
              family, community, and group levels), external possessions become
              central markers of identity.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Consumers who strongly identify with a domain resist products and
              AI tools that automate the core skill-based steps of that activity
              because automation prevents internal attribution of the outcome.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Trait theories (innovativeness, need for cognition, materialism,
              and the Big Five) measure enduring human predispositions, while
              brand personality (sincerity, excitement, competence,
              sophistication, ruggedness) and anthropomorphism describe human
              traits projected onto brands.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Psychographic segmentation uses Activities, Interests, and
              Opinions (AIO) inventories and frameworks such as VALS to explain
              why demographically similar consumers pursue different lifestyles.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Large language models used as synthetic survey respondents can aid
              exploratory survey pre-testing, but stochastic variability,
              anchoring sensitivity, and cultural bias prevent them from
              replacing human consumer data.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
