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
  AssistantShortList,
  BrandAssociativeNetwork,
  Chunking,
  CopyCat,
  CueInQuestion,
  ExperienceChanges,
  ForgettingCurve,
  InstrumentalMatrix,
  LearnByWatching,
  LoyaltyPoints,
  MemoryStorageFlow,
  Pavlov,
  RepetitionCurve,
  Retrieve,
  WebFromReviews,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 3: LEARNING AND MEMORY
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
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 3
          </p>
          <p className="type-caption mt-2">Consumer Behavior | Davood Wadi, PhD</p>
          <Title className="mt-6">Learning and Memory</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Consumer learning and memory determine how marketplace experiences
              are <Tint>encoded into brand associations</Tint> and{" "}
              <Tint>retrieved</Tint> when a purchase decision is made.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Consumer Learning
          ================================================================ */}
      <Slide className={TIGHT} id="defining-consumer-learning" border>
        <SlideHeading>Defining Consumer Learning</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <Statement className="">
            <Term>Learning</Term> is a relatively permanent change in behavior
            or knowledge that results from direct or indirect experience.
          </Statement>
          <Plate wide>
            <ExperienceChanges />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              <Term>Direct learning</Term> occurs when a consumer samples a
              product, uses a service, and evaluates the outcome firsthand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Indirect or vicarious learning</Term> occurs when a consumer
              observes advertisements, reviews, or the behavior of other people
              without trying the product personally.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Incidental learning</Term> also takes place unintentionally,
              as when a consumer absorbs brand jingles and package colors during
              routine media exposure.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because consumer preferences are largely learned rather than
              innate, marketers design communications and product experiences to
              build <Tint>durable brand knowledge</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Behavioral Versus Cognitive Approaches to Learning
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="behavioral-versus-cognitive-approaches-to-learning"
        border
      >
        <SlideHeading>
          Behavioral Versus Cognitive Approaches to Learning
        </SlideHeading>
        <Lead>
          Psychological theories of consumer learning divide into two broad
          traditions: <Term>behavioral learning</Term> and{" "}
          <Term>cognitive learning</Term>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Behavioral learning theories</Term> focus on observable
              connections between external stimuli and consumer responses,
              treating the mind as a black box.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Classical conditioning</Term> and{" "}
              <Term>operant conditioning</Term> are the two foundational
              mechanisms of behavioral learning.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Cognitive learning theories</Term> view consumers as active
              problem solvers who process information, form mental
              representations, and learn by observing others.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Low-involvement convenience purchases often rely on{" "}
              <Tint>behavioral conditioning</Tint>, whereas high-involvement
              purchases rely heavily on <Tint>cognitive learning</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Classical Conditioning in Brand Building
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-classical-conditioning-in-brand-building"
        border
      >
        <PartHead n={1} title="Classical Conditioning in Brand Building" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Classical conditioning explains how a neutral brand name or logo
            acquires <Tint>emotional meaning through repeated pairing</Tint>{" "}
            with a stimulus that already evokes a response.
          </Statement>
          <Ruled>
            <Lead>
              Many advertising campaigns aim to build favorable affective
              associations through classical conditioning before consumers ever
              evaluate technical specifications.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Pairing Unconditioned and Conditioned Stimuli
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="pairing-unconditioned-and-conditioned-stimuli"
        border
        exercise={exercise["pairing-unconditioned-and-conditioned-stimuli"]}
      >
        <SlideHeading>
          Pairing Unconditioned and Conditioned Stimuli
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Classical conditioning</Term> was first demonstrated by Ivan
              Pavlov, who paired meat powder (an unconditioned stimulus) with a
              ringing bell (a neutral stimulus) until the bell alone elicited
              salivation in dogs.
            </Lead>
            <Ruled>
              <P>
                An <Term>unconditioned stimulus (UCS)</Term> is any stimulus
                that naturally and automatically triggers an{" "}
                <Term>unconditioned response (UCR)</Term> without prior
                training.
              </P>
            </Ruled>
          </div>
          <Plate>
            <Pavlov />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In marketing, upbeat music, humor, appetizing imagery, or scenic
              nature footage serve as unconditioned stimuli that naturally
              elicit positive feelings.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When a previously neutral brand logo becomes a{" "}
              <Term>conditioned stimulus (CS)</Term> by appearing repeatedly
              alongside that music or imagery, the brand eventually evokes the
              positive feeling on its own as a{" "}
              <Term>conditioned response (CR)</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conditioning is most effective when the{" "}
              <Tint>conditioned brand stimulus precedes</Tint> the unconditioned
              stimulus consistently and when the pairing is not overshadowed by
              competing brands.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Repetition, Extinction, and Advertising Wear-Out
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="repetition-extinction-and-advertising-wear-out"
        border
      >
        <SlideHeading>
          Repetition, Extinction, and Advertising Wear-Out
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Conditioning a durable association between a brand and a feeling
              requires <Term>repeated pairings</Term> across multiple exposures.
            </Lead>
            <Ruled>
              <P>
                The <Term>two-factor theory of repetition</Term> states that
                initial exposures increase familiarity and reduce uncertainty,
                whereas excessive exposures induce boredom and counterarguing
                (Berlyne, 1970).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <RepetitionCurve />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Advertising wear-out</Term> occurs when consumers have seen
              an identical execution so many times that attention drops and
              brand evaluations begin to decline.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Extinction</Term> occurs when the conditioned brand stimulus
              is repeatedly presented without the unconditioned reward or
              positive cue, causing the learned association to weaken.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Media planners <Tint>balance repetition and wear-out</Tint> by
              spacing exposures over time and varying creative executions around
              a single campaign theme.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Stimulus Generalization and Stimulus Discrimination
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="stimulus-generalization-and-stimulus-discrimination"
        border
        exercise={
          exercise["stimulus-generalization-and-stimulus-discrimination"]
        }
      >
        <SlideHeading>
          Stimulus Generalization and Stimulus Discrimination
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                <Term>Stimulus generalization</Term> occurs when consumers
                respond to a new stimulus in the same way they respond to a
                similar conditioned stimulus.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Private-label store brands frequently apply stimulus
                generalization by adopting package shapes, color schemes, and
                typography that resemble the category leader.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Family branding, product line extensions, and licensing also
                rely on stimulus generalization to transfer goodwill from an
                established parent brand to a new product.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CopyCat />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Stimulus discrimination</Term> is the opposite process, in
              which consumers learn to distinguish one stimulus from similar
              competing stimuli and respond only to the original brand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Market leaders invest in <Tint>distinctive packaging</Tint>,
              patented bottle shapes, and comparative messaging to promote
              stimulus discrimination and defend against look-alike competitors.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Operant Conditioning and Observational Learning
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-operant-conditioning-and-observational-learning"
        border
      >
        <PartHead
          n={2}
          title="Operant Conditioning and Observational Learning"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Consumers also learn from the{" "}
            <Tint>consequences that follow their own actions</Tint> and from the
            consequences they observe when other people act.
          </Statement>
          <Ruled>
            <Lead>
              Operant conditioning and observational learning explain how
              rewards, penalties, and social role models shape repeat
              purchasing.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Positive Reinforcement, Negative Reinforcement, and Punishment
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="positive-reinforcement-negative-reinforcement-and-punishment"
        border
        exercise={
          exercise[
            "positive-reinforcement-negative-reinforcement-and-punishment"
          ]
        }
      >
        <SlideHeading>
          Positive Reinforcement, Negative Reinforcement, and Punishment
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <Lead>
            Developed by B. F. Skinner,{" "}
            <Term>operant (or instrumental) conditioning</Term> holds that
            individuals learn to repeat behaviors that produce favorable
            outcomes and avoid behaviors that produce unfavorable outcomes.
          </Lead>
          <Plate>
            <InstrumentalMatrix />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              <Term>Positive reinforcement</Term> strengthens a behavior by
              delivering a rewarding consequence after the action, such as
              earning airline miles or receiving a compliment on a new jacket.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Negative reinforcement</Term> strengthens a behavior by
              removing an unpleasant or aversive state, as when a pain reliever
              eliminates a headache or insurance removes financial anxiety.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Punishment</Term> weakens a behavior by following an action
              with an aversive consequence, such as a late-payment penalty fee
              or a poor product experience.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Extinction</Term> in operant conditioning occurs when a
              previously rewarded behavior ceases to receive reinforcement, such
              as when a retailer discontinues loyalty rebates and repeat visits
              fall.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Reinforcement Schedules in Loyalty Programs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="reinforcement-schedules-in-loyalty-programs"
        border
      >
        <SlideHeading>Reinforcement Schedules in Loyalty Programs</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              The rate at which consumers learn and maintain a purchase habit
              depends on the <Term>schedule</Term> by which reinforcement is
              delivered.
            </Lead>
            <Ruled>
              <P>
                Under <Term>continuous reinforcement</Term>, every single
                purchase receives a reward, which accelerates initial learning
                but leads to rapid extinction if the reward stops.
              </P>
            </Ruled>
          </div>
          <Plate>
            <LoyaltyPoints />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              A <Term>fixed-interval schedule</Term> delivers reinforcement
              after a set time period has elapsed, such as an annual member
              dividend or a weekly Tuesday matinee discount.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>fixed-ratio schedule</Term> delivers reinforcement after a
              fixed number of purchases, such as a coffee shop punch card that
              awards a free drink on the tenth visit.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>variable-ratio schedule</Term> delivers reinforcement
              after an unpredictable number of actions, as in sweepstakes,
              mystery rebates, or blind-box collectibles, producing{" "}
              <Tint>high and persistent engagement</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Cognitive and Observational Learning
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cognitive-and-observational-learning"
        border
        exercise={exercise["cognitive-and-observational-learning"]}
      >
        <SlideHeading>Cognitive and Observational Learning</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <Lead>
            <Term>Observational learning</Term> (or social modeling) occurs when
            consumers acquire new behaviors by watching the actions of others
            and noting the consequences those models experience (Bandura, 1977).
          </Lead>
          <Plate>
            <LearnByWatching />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Numbered n={1}>
            <P>
              First, the consumer must direct <Term>attention</Term> to a model
              who is salient, attractive, competent, or similar to the observer.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Second, the consumer must <Term>retain</Term> the observed
              behavior in memory as a symbolic representation.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Third, the consumer must possess the{" "}
              <Term>ability and resources</Term> required to reproduce the
              behavior in practice.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Fourth, <Term>motivation</Term> determines whether the consumer
              enacts the behavior, typically when the model is seen receiving
              social approval or functional success from using the brand.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Designing a Behavioral Loyalty Program
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-a-behavioral-loyalty-program"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing a Behavioral Loyalty Program
        </SlideHeading>
        <Prompt>
          A regional specialty grocery chain wants to replace its flat 2 percent
          cashback card with a new loyalty program that encourages shoppers to
          buy fresh prepared meals and visit during off-peak weekday mornings.
          How can the marketing team combine operant reinforcement schedules,
          shaping (rewarding successive steps toward the target behavior), and
          observational learning to design this program without training
          customers to buy only when items are discounted?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: The Human Memory System
          ================================================================ */}
      <Slide className={TIGHT} id="part-3-the-human-memory-system" border>
        <PartHead n={3} title="The Human Memory System" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            For learning to influence a future purchase, information acquired
            during exposure must be{" "}
            <Tint>encoded, stored, and later retrieved</Tint> from memory.
          </Statement>
          <Ruled>
            <Lead>
              Cognitive psychology models human memory as a sequence of three
              interconnected stores: sensory memory, working (short-term)
              memory, and long-term memory.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Encoding, Storage, and Retrieval across Memory Stores
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="encoding-storage-and-retrieval-across-memory-stores"
        border
        exercise={
          exercise["encoding-storage-and-retrieval-across-memory-stores"]
        }
      >
        <SlideHeading>
          Encoding, Storage, and Retrieval across Memory Stores
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-12">
          <Lead>
            Memory operates through three functional stages:{" "}
            <Term>encoding</Term> information into a mental representation,{" "}
            <Term>storing</Term> that representation over time, and{" "}
            <Term>retrieving</Term> it when needed.
          </Lead>
          <Plate wide>
            <MemoryStorageFlow />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              <Term>Sensory memory</Term> holds a high-capacity, literal record
              of incoming visual or auditory inputs for less than a couple of
              seconds.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If a stimulus in sensory memory captures attention, it passes into{" "}
              <Term>short-term (working) memory</Term> for active
              interpretation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Information in working memory that undergoes{" "}
              <Term>elaborative rehearsal</Term>, in which the consumer connects
              the new input to existing knowledge, transfers into long-term
              memory.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Long-term memory</Term> holds vast quantities of information
              over months, years, or a lifetime, serving as the{" "}
              <Tint>repository of brand knowledge</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Working Memory Capacity and Chunking
          ================================================================ */}
      <Slide className={TIGHT} id="working-memory-capacity-and-chunking" border>
        <SlideHeading>Working Memory Capacity and Chunking</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Working memory</Term> is the mental workspace where
              consumers hold and combine information while making an active
              comparison, such as comparing two nutrition labels in an aisle.
            </Lead>
            <Ruled>
              <P>
                Working memory has a strictly limited capacity, holding roughly{" "}
                <Term>four to seven meaningful units</Term> of information at
                one time for about 15 to 30 seconds without rehearsal (Miller,
                1956).
              </P>
            </Ruled>
          </div>
          <Plate>
            <Chunking />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Chunking</Term> is the process of grouping individual pieces
              of data into larger, familiar units so they occupy fewer slots in
              working memory.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A ten-digit telephone number is easier to remember as three chunks
              than as ten separate digits, and a brand slogan groups product
              benefits into a single rhythmic phrase.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Product pages and advertisements that present fifteen ungrouped
              technical claims <Tint>overload working memory</Tint> and reduce
              comprehension.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Long-Term Memory: Episodic and Semantic Knowledge
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="long-term-memory-episodic-and-semantic-knowledge"
        border
      >
        <SlideHeading>
          Long-Term Memory: Episodic and Semantic Knowledge
        </SlideHeading>
        <Lead>
          Long-term memory stores two complementary forms of declarative
          knowledge that influence consumer choice:{" "}
          <Term>semantic memory</Term> and <Term>episodic memory</Term>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              <Term>Semantic memory</Term> contains general factual knowledge
              and concepts independent of personal context, such as knowing that
              Volvo is a Swedish automaker associated with safety.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Episodic memory</Term> stores autobiographical records of
              personally experienced events, such as remembering a family road
              trip or a frustrating customer-service call.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Procedural memory</Term> stores motor skills and automatic
              behavioral scripts, such as how to navigate a self-checkout kiosk
              or use a smartphone interface.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Nostalgia marketing</Term> appeals directly to episodic
              memory by using vintage packaging or music from an earlier decade
              to evoke <Tint>warm autobiographical recollections</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Associative Networks, Retrieval Cues, and Forgetting
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-associative-networks-retrieval-cues-and-forgetting"
        border
      >
        <PartHead
          n={4}
          title="Associative Networks, Retrieval Cues, and Forgetting"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Knowledge in long-term memory is organized not as isolated files,
            but as an <Tint>associative network of linked concepts</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Customer-based brand equity depends on the strength, favorability,
              and uniqueness of the nodes linked to a brand in memory (Keller,
              1993).
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Associative Networks and Spreading Activation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="associative-networks-and-spreading-activation"
        border
      >
        <SlideHeading>
          Associative Networks and Spreading Activation
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              An <Term>associative network</Term> represents long-term memory as
              a web of nodes (concepts, brands, attributes, feelings, and usage
              occasions) connected by associative links of varying strength.
            </Lead>
            <Ruled>
              <P>
                A <Term>brand schema</Term> is the specific cluster of nodes
                connected to a brand name, such as linking Nike to running,
                athletic performance, the Swoosh logo, and its slogan.
              </P>
            </Ruled>
          </div>
          <Plate>
            <BrandAssociativeNetwork />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Spreading activation</Term> occurs when activating one node
              in memory sends activation along connected links to trigger
              related nodes automatically.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If a consumer activates the usage node for &ldquo;afternoon energy
              slump,&rdquo; spreading activation retrieves the brands most
              strongly linked to that occasion.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Building brand equity requires forging{" "}
              <Tint>strong links between the brand node</Tint> and the category
              entry points that trigger consumer need recognition.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Retrieval Cues at the Point of Purchase
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="retrieval-cues-at-the-point-of-purchase"
        border
      >
        <SlideHeading>Retrieval Cues at the Point of Purchase</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Brand awareness takes two forms: <Term>brand recognition</Term>{" "}
              (identifying the brand when prompted with a visual or verbal cue)
              and <Term>brand recall</Term> (retrieving the brand from memory
              without a prompt).
            </Lead>
            <Ruled>
              <P>
                In a physical store aisle, package color, distinctive shapes,
                and logos serve as <Term>external retrieval cues</Term> that
                trigger recognition and activate advertising memories stored
                earlier.
              </P>
            </Ruled>
          </div>
          <Plate>
            <Retrieve />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In out-of-store decisions such as deciding where to eat dinner,
              the consumer must rely on unaided brand recall triggered by
              internal need cues.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>State-dependent retrieval</Term> occurs when consumers
              recall information more accurately if their internal mood at
              retrieval matches their mood during encoding.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Maintaining <Tint>visual consistency</Tint> between advertising
              campaigns and shelf packaging ensures that point-of-purchase cues
              connect directly to encoded brand claims.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Decay, Proactive Interference, and Retroactive Interference
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="decay-proactive-interference-and-retroactive-interference"
        border
        exercise={
          exercise["decay-proactive-interference-and-retroactive-interference"]
        }
      >
        <SlideHeading>
          Decay, Proactive Interference, and Retroactive Interference
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Stored brand memories become inaccessible over time through two
              primary mechanisms: <Term>trace decay</Term> and{" "}
              <Term>interference</Term>.
            </Lead>
            <Ruled>
              <P>
                <Term>Decay</Term> is the gradual weakening of a memory link
                when it is not reactivated through repeat exposure or product
                use.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ForgettingCurve />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Interference</Term> occurs when competing information stored
              in memory blocks the accurate retrieval of a target brand claim.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Proactive interference</Term> occurs when prior learning
              about an older brand makes it harder to encode and remember claims
              about a newer brand.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Retroactive interference</Term> occurs when new learning,
              such as exposure to several competitor advertisements in the same
              category, <Tint>disrupts recall of an earlier brand message</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Brand Retrieval in Conversational AI Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-brand-retrieval-in-conversational-ai-search"
        border
      >
        <PartHead n={5} title="Brand Retrieval in Conversational AI Search" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Increasingly, consumers do not retrieve brands from their own
            long-term memory alone. Instead, they{" "}
            <Tint>ask conversational AI assistants</Tint> to recommend products
            for a specific need.
          </Statement>
          <Ruled>
            <Lead>
              In conversational search, the language model&apos;s internal
              representations perform an analogue of associative retrieval to
              construct the consumer&apos;s consideration set.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Conversational Search and the Consideration Set
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="conversational-search-and-the-consideration-set"
        border
      >
        <SlideHeading>
          Conversational Search and the Consideration Set
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              When a shopper asks an AI assistant a category question such as
              &ldquo;Which running shoes are best for flat feet?&rdquo;, the
              assistant responds with a short list of three to five brands.
            </Lead>
            <Ruled>
              <P>
                This generated list frequently becomes the consumer&apos;s{" "}
                <Term>consideration set</Term>, the subset of brands the buyer
                seriously evaluates before purchasing.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AssistantShortList />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Unlike a traditional search engine that returns pages of blue
              links, a conversational assistant synthesizes a single
              authoritative-sounding shortlist.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A brand omitted from the assistant&apos;s initial response may
              never be evaluated, even if the human consumer would have
              recognized the brand on a store shelf.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversational search therefore shifts brand competition from
              shelf recognition toward{" "}
              <Tint>unprompted category retrieval inside the model</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How Language Models Encode Brand Associations
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="how-language-models-encode-brand-associations"
        border
      >
        <SlideHeading>
          How Language Models Encode Brand Associations
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Large language models do not possess human episodic memory, but
              they encode <Term>statistical associations</Term> among brands,
              product categories, attributes, and use cases from their training
              text.
            </Lead>
            <Ruled>
              <P>
                Reviews, news articles, comparison guides, forum discussions,
                and product documentation in the training corpus shape which
                attributes are associated with each brand name.
              </P>
            </Ruled>
          </div>
          <Plate>
            <WebFromReviews />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When an assistant uses{" "}
              <Term>retrieval-augmented generation (RAG)</Term> or live web
              search, it combines these pre-trained associations with current
              retail pages and review summaries.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In functional terms, the prompt acts as an{" "}
              <Term>activation cue</Term> that retrieves the brands most
              strongly associated with the stated category and constraints.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If a brand is rarely mentioned alongside a specific use case in
              public text and structured catalogs, the model is{" "}
              <Tint>unlikely to retrieve it for that prompt</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Prompt Cues and Brand Visibility in AI Recommendations
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="prompt-cues-and-brand-visibility-in-ai-recommendations"
        border
        exercise={
          exercise["prompt-cues-and-brand-visibility-in-ai-recommendations"]
        }
      >
        <SlideHeading>
          Prompt Cues and Brand Visibility in AI Recommendations
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              In conversational search, <Term>retrieval cues</Term> move from
              visual shelf packaging into the exact words of the
              consumer&apos;s natural-language prompt.
            </Lead>
            <Ruled>
              <P>
                Modifiers in the prompt, such as &ldquo;budget-friendly,&rdquo;
                &ldquo;durable,&rdquo; &ldquo;hypoallergenic,&rdquo; or
                &ldquo;for small apartments,&rdquo; alter which brand nodes
                receive the highest probability during generation.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CueInQuestion />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Brands that have built clear, verifiable associations with
              specific category entry points and consumer problems are retrieved
              across a wider range of user prompts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, brands that rely solely on vague image advertising
              without clear attribute documentation in text and reviews lose
              visibility in conversational retrieval.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketing management now includes{" "}
              <Tint>auditing which prompts retrieve the brand</Tint> across
              major AI assistants and strengthening the factual documentation
              linking the brand to core consumer needs.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Diagnosing Brand Omission in Conversational Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-diagnosing-brand-omission-in-conversational-search"
        border
      >
        <SlideHeading kicker="Discussion:">
          Diagnosing Brand Omission in Conversational Search
        </SlideHeading>
        <Prompt>
          A thirty-year-old mattress manufacturer has high aided brand
          recognition in consumer surveys because of decades of television
          jingles, yet the brand rarely appears when shoppers ask conversational
          AI assistants for &ldquo;the best mattress for side sleepers with
          lower-back pain.&rdquo; Using associative networks, retrieval cues,
          and how language models learn brand links, explain why high human
          recognition does not guarantee AI retrieval, and recommend a strategy
          to close this gap.
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
              Consumer learning is a relatively permanent change in knowledge or
              behavior resulting from direct product experience or indirect
              observation.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Classical conditioning builds affective brand associations by
              pairing a neutral brand stimulus with an unconditioned stimulus,
              while balancing repetition against wear-out and managing stimulus
              generalization versus discrimination.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Operant conditioning shapes repeat behavior through positive
              reinforcement, negative reinforcement, punishment, and
              reinforcement schedules, while observational learning operates
              through attention, retention, production, and motivation.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              The human memory system processes information across sensory
              memory, capacity-limited working memory (aided by chunking), and
              long-term episodic and semantic memory.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Long-term brand knowledge is structured as an associative network
              in which retrieval cues trigger spreading activation, while decay
              and proactive or retroactive interference cause forgetting.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              When consumers use conversational AI assistants, the prompt acts
              as a retrieval cue that generates the consideration set from the
              model&apos;s learned text associations and retrieved product
              records.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
