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
  AbsoluteThreshold,
  Adaptation,
  CerealTwoWays,
  DataSheets,
  Defense,
  GestaltPanels,
  Overload,
  PerceptionFunnel,
  PositionEffects,
  SelectOrganizeInterpret,
  SemioticTriangle,
  SensoryModalities,
  StayBelow,
  WeberLab,
} from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 2: PERCEPTION AND SENSORY MARKETING
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

/** Weber's Law written out: ΔI / I = k. */
function Weber() {
  return (
    <span className="whitespace-nowrap font-serif">
      <i>ΔI</i> / <i>I</i> = <i>k</i>
    </span>
  );
}

export default function Week2() {
  return (
    <SlideDeck label="Week 2">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 2
          </p>
          <p className="type-caption mt-2">Consumer Behavior | Davood Wadi, PhD</p>
          <Title className="mt-6">Perception and Sensory Marketing</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Perception is the process by which consumers{" "}
              <Tint>select, organize, and interpret</Tint> sensory inputs to
              construct meaning in the marketplace.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Sensation Versus Perception
          ================================================================ */}
      <Slide className={TIGHT} id="sensation-versus-perception" border>
        <SlideHeading>Sensation Versus Perception</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              <Term>Sensation</Term> is the immediate response of sensory
              receptors in the eyes, ears, nose, mouth, and skin to basic
              stimuli such as light, sound, odor, and texture.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Perception</Term> is the psychological process by which
              those raw sensations are selected, organized, and interpreted
              into a coherent picture of the environment.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <SelectOrganizeInterpret />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Consumers encounter thousands of commercial stimuli each day, far
              exceeding human information-processing capacity.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because interpretation depends on prior experience, expectations,
              and current needs, two consumers exposed to the same advertisement
              can construct different meanings from it.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketing decisions therefore depend on how consumers{" "}
              <Tint>perceive</Tint> a product or price rather than on its
              objective physical properties alone.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Three Stages of the Perception Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-three-stages-of-the-perception-process"
        border
        exercise={exercise["the-three-stages-of-the-perception-process"]}
      >
        <SlideHeading>The Three Stages of the Perception Process</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.9fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement className="">
              Human perception unfolds across three sequential stages:{" "}
              <Term>exposure</Term>, <Term>attention</Term>, and{" "}
              <Term>interpretation</Term>.
            </Statement>
            <Ruled>
              <P>
                Most marketing messages are <Tint>filtered out</Tint> at the
                exposure or attention stage before any interpretation takes
                place.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <PerceptionFunnel />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Exposure</Term> occurs when a stimulus comes within the
              detection range of a consumer&apos;s sensory receptors.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Attention</Term> occurs when cognitive processing capacity
              is allocated to a specific stimulus among competing inputs.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Interpretation</Term> occurs when the consumer assigns
              meaning to the attended stimulus by relating it to schemas stored
              in memory.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 1: Sensory Systems and Sensory Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-sensory-systems-and-sensory-marketing"
        border
      >
        <PartHead n={1} title="Sensory Systems and Sensory Marketing" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Sensory marketing engages the consumer&apos;s{" "}
            <Tint>five sensory systems</Tint> in a deliberate way to shape brand
            associations, perceived quality, and purchase behavior.
          </Statement>
          <Ruled>
            <Lead>
              Each sensory channel processes commercial cues differently and
              contributes distinct information during shopping and product use.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Vision and Auditory Cues in Brand Identity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="vision-and-auditory-cues-in-brand-identity"
        border
      >
        <SlideHeading>Vision and Auditory Cues in Brand Identity</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid min-w-0 content-start gap-4">
            <Ruled>
              <P>
                <Term>Vision</Term> is the dominant sensory channel in most
                retail categories, conveying brand identity through color,
                typography, package silhouette, and shelf contrast.
              </P>
            </Ruled>
            <P>
              Color associations are learned within a culture and category,
              allowing shoppers to identify product variants such as
              decaffeinated coffee or low-fat dairy at a glance.
            </P>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <Ruled>
              <P>
                <Term>Auditory cues</Term> include sonic logos, advertising
                music, and the functional sounds a product makes during use,
                such as the click of a luxury compact or the crunch of a snack.
              </P>
            </Ruled>
            <P>
              Background music tempo in retail stores and restaurants influences
              how quickly consumers move through aisles and how much time they
              spend browsing.
            </P>
          </div>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <SensoryModalities />
          </Plate>
        </div>
        <Ruled className="mt-6 w-full">
          <Big className="">
            Consistent visual and auditory cues build{" "}
            <Tint>distinctive brand assets</Tint> that aid rapid recognition
            under low-involvement shopping conditions.
          </Big>
        </Ruled>
      </Slide>

      {/* ================================================================
          Olfaction, Haptics, and Gustation in the Store Environment
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="olfaction-haptics-and-gustation-in-the-store-environment"
        border
        exercise={exercise["olfaction-haptics-and-gustation-in-the-store-environment"]}
      >
        <SlideHeading>
          Olfaction, Haptics, and Gustation in the Store Environment
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-3 md:gap-10">
          <div className="grid min-w-0 content-start gap-4">
            <Ruled>
              <P>
                <Term>Olfactory cues</Term> are processed through the limbic
                system, which links scent directly to{" "}
                <Tint>emotion and episodic memory</Tint>.
              </P>
            </Ruled>
            <P>
              Hotels, apparel retailers, and bakeries use ambient scent to
              increase lingering time and improve evaluations of store
              merchandise.
            </P>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <Ruled>
              <P>
                <Term>Haptics</Term> refers to the sense of touch, which
                provides diagnostic information about material quality, weight,
                softness, and temperature.
              </P>
            </Ruled>
            <P>
              Physically holding a product in a store increases psychological
              ownership, making the shopper value the item more highly before
              purchasing it.
            </P>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <Ruled>
              <P>
                <Term>Gustation</Term> combines taste receptor inputs with smell
                and texture to drive repeat purchase in food and beverage
                categories.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Embodied Cognition and Cross-Modal Sensory Associations
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="embodied-cognition-and-cross-modal-sensory-associations"
        border
      >
        <SlideHeading>
          Embodied Cognition and Cross-Modal Sensory Associations
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid min-w-0 content-start gap-4">
            <Statement className="">
              <Term>Embodied cognition</Term> holds that bodily sensations
              influence abstract cognitive judgments even without conscious
              awareness.
            </Statement>
            <Ruled>
              <P>
                Consumers holding a warm cup of coffee tend to judge an
                unfamiliar person as more generous and trustworthy than
                consumers holding an iced drink.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <Statement className="">
              <Term>Cross-modal correspondence</Term> occurs when a cue in one
              sensory modality alters perception in another modality.
            </Statement>
            <Ruled>
              <P>
                Beverage consumers judge a drink served in a heavier glass or a
                textured bottle as richer and higher in quality than the
                identical liquid served in a thin plastic cup.
              </P>
            </Ruled>
          </div>
        </div>
        <Ruled className="mt-10 w-full">
          <Big className="">
            Package designers coordinate visual color, surface texture, and
            container weight so that{" "}
            <Tint>all sensory channels reinforce the same quality positioning</Tint>.
          </Big>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 2: Sensory Thresholds and Psychophysics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-sensory-thresholds-and-psychophysics"
        border
      >
        <PartHead n={2} title="Sensory Thresholds and Psychophysics" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            <Term>Psychophysics</Term> studies the quantitative relationship
            between the physical intensity of a stimulus and the sensory
            response it produces in an observer.
          </Statement>
          <Ruled>
            <Lead>
              Understanding sensory thresholds tells marketers{" "}
              <Tint>how strong a signal must be to register</Tint> and how much
              a stimulus must change before buyers notice the difference.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Absolute and Differential Thresholds
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="absolute-and-differential-thresholds"
        border
        exercise={exercise["absolute-and-differential-thresholds"]}
      >
        <SlideHeading>Absolute and Differential Thresholds</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              The <Term>absolute threshold</Term> is the minimum intensity of
              stimulation that can be detected on a given sensory channel 50
              percent of the time.
            </Lead>
            <Ruled>
              <P>
                Highway billboard lettering that is too small for the viewing
                distance or an audio notification masked by street noise falls
                below the absolute threshold and fails to achieve exposure.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AbsoluteThreshold />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              The <Term>differential threshold</Term> is the ability of a
              sensory system to detect a difference between two stimuli of
              different intensities.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>Just Noticeable Difference (JND)</Term> is the minimum
              change in stimulus intensity required for a consumer to detect
              that a change has occurred.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Whether a consumer detects a price adjustment, a package size
              reduction, or a recipe reformulation depends on whether the change{" "}
              <Tint>crosses the JND</Tint>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Weber's Law and Proportional Change
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="webers-law-and-proportional-change"
        border
        exercise={exercise["webers-law-and-proportional-change"]}
      >
        <SlideHeading>Weber&apos;s Law and Proportional Change</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <div className="grid min-w-0 gap-4">
            <P>
              Formulated by Ernst Weber, <Term>Weber&apos;s Law</Term> states
              that the size of the Just Noticeable Difference is a{" "}
              <Tint>constant proportion</Tint> of the original stimulus
              intensity rather than a fixed absolute amount.
            </P>
            <P>
              The relationship is expressed as <Weber />, where <i>I</i> is the
              initial stimulus intensity, <i>ΔI</i> is the minimum noticeable
              change, and <i>k</i> is a constant for that sensory dimension.
            </P>
          </div>
          <Plate wide>
            <WeberLab />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              A 2-dollar reduction on a 10-dollar fast-food meal represents a 20
              percent change and is immediately noticeable to buyers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The same 2-dollar reduction on a 1,000-dollar television
              represents a 0.2 percent change and falls well below the
              differential threshold.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Retailers therefore express promotions in percentage terms on
              low-priced items and in dollar terms on high-priced items to make
              the discount feel substantial.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Strategic Applications of the Just Noticeable Difference
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="strategic-applications-of-the-just-noticeable-difference"
        border
      >
        <SlideHeading>
          Strategic Applications of the Just Noticeable Difference
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Marketers deliberately calibrate stimulus changes either{" "}
              <Term>below</Term> or <Term>above</Term> the JND depending on
              whether the change is unfavorable or favorable to the consumer.
            </Lead>
            <Ruled>
              <P>
                When input costs rise and a manufacturer reduces net package
                weight in a practice known as <Term>shrinkflation</Term>, the
                reduction is kept below the JND so habitual buyers do not switch
                brands.
              </P>
            </Ruled>
          </div>
          <Plate>
            <StayBelow />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When a brand updates a classic logo to look more contemporary
              without alienating loyal buyers, designers apply a series of
              incremental changes that each stay below the JND.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, when a brand introduces a promotional discount,
              increases package volume, or launches a product improvement, the
              change is designed to exceed the JND clearly.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Failing to exceed the JND on a costly product improvement{" "}
              <Tint>wastes engineering and promotional budget</Tint> on a
              benefit consumers never register.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Redesigning a Package Without Losing Recognition
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-redesigning-a-package-without-losing-recognition"
        border
      >
        <SlideHeading kicker="Discussion:">
          Redesigning a Package Without Losing Recognition
        </SlideHeading>
        <Prompt>
          A heritage oat-cereal brand with an aging customer base wants to
          modernize its bright yellow box and reduce net package weight from 500
          grams to 450 grams to offset grain cost inflation. How do the absolute
          threshold, the Just Noticeable Difference, and Weber&apos;s Law guide
          how the brand should execute the visual redesign versus the weight
          reduction, and at what point does staying below the JND raise ethical
          concerns?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Selective Exposure, Attention, and Adaptation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-selective-exposure-attention-and-adaptation"
        border
      >
        <PartHead n={3} title="Selective Exposure, Attention, and Adaptation" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Passing the absolute threshold guarantees only that a stimulus{" "}
            <Term>can be detected</Term>, not that a consumer{" "}
            <Tint>will attend to it</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Consumers actively filter commercial environments through
              selective exposure, perceptual vigilance, perceptual defense, and
              adaptation.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Sensory Overload and Selective Exposure
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sensory-overload-and-selective-exposure"
        border
      >
        <SlideHeading>Sensory Overload and Selective Exposure</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              <Term>Sensory overload</Term> occurs when the volume of
              environmental and digital stimuli exceeds a person&apos;s
              cognitive capacity to process them.
            </Statement>
            <Ruled>
              <P>
                To cope with overload, consumers practice{" "}
                <Term>selective exposure</Term> by actively choosing which media
                channels, websites, and store aisles they encounter or avoid.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <Overload />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Viewers skip pre-roll video advertisements, install browser ad
              blockers, and fast-forward through broadcast commercial breaks.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Selective exposure means that reach figures based on media
              placement <Tint>overstate actual consumer exposure</Tint> to the
              brand message.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers counter selective exposure by placing messages inside
              relevant editorial content, search results, or opt-in
              communications that match the consumer&apos;s current task.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Perceptual Vigilance and Perceptual Defense
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="perceptual-vigilance-and-perceptual-defense"
        border
        exercise={exercise["perceptual-vigilance-and-perceptual-defense"]}
      >
        <SlideHeading>Perceptual Vigilance and Perceptual Defense</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Perceptual vigilance</Term> is the heightened tendency of
              consumers to notice stimuli that relate to their current active
              needs or goals.
            </Lead>
            <Ruled>
              <P>
                A commuter whose car lease expires next month suddenly notices
                automobile dealerships and financing advertisements that were
                previously ignored.
              </P>
            </Ruled>
          </div>
          <Plate>
            <Defense />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Perceptual defense</Term> is the opposite mechanism, in
              which consumers screen out or distort stimuli that threaten their
              existing beliefs, habits, or self-image.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Heavy smokers frequently look away from graphic health warnings on
              cigarette packages or discount the personal relevance of the risk.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because attention is selective, the same public-health or
              commercial message achieves{" "}
              <Tint>very different attention rates</Tint> across segments with
              different baseline motives.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Sensory Adaptation and Stimulus Contrast
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sensory-adaptation-and-stimulus-contrast"
        border
      >
        <SlideHeading>Sensory Adaptation and Stimulus Contrast</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Sensory adaptation</Term> is the gradual decline in sensory
              responsiveness that occurs when a receptor is exposed to a
              constant, unchanging stimulus over time.
            </Lead>
            <Ruled>
              <P>
                A shopper notices a bakery&apos;s cinnamon aroma immediately
                upon entering the store, but stops perceiving the scent after
                ten minutes in the aisle.
              </P>
            </Ruled>
          </div>
          <Plate>
            <Adaptation />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In advertising, repeated exposure to an identical banner or
              commercial leads to <Term>habituation</Term>, where consumers
              cease allocating attention to the familiar layout.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers restore attention by introducing{" "}
              <Term>stimulus contrast</Term> through unexpected size, color
              isolation, movement, novelty, or directional visual cues.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Effective campaign management{" "}
              <Tint>refreshes creative execution</Tint> periodically while
              preserving core brand retrieval cues.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Perceptual Organization, Gestalt Principles, and Semiotics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-perceptual-organization-gestalt-principles-and-semiotics"
        border
      >
        <PartHead
          n={4}
          title="Perceptual Organization, Gestalt Principles, and Semiotics"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            Once a stimulus captures attention, the brain does not process
            individual lines, sounds, or words <Tint>in isolation</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Consumers organize sensory elements into recognizable wholes using
              Gestalt principles and interpret their symbolic meaning through
              cultural signs.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Gestalt Principles of Perceptual Organization
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="gestalt-principles-of-perceptual-organization"
        border
        exercise={exercise["gestalt-principles-of-perceptual-organization"]}
      >
        <SlideHeading>Gestalt Principles of Perceptual Organization</SlideHeading>
        <Statement>
          <Term>Gestalt psychology</Term> proposes that people perceive
          organized patterns as unified wholes whose meaning{" "}
          <Tint>exceeds the sum of their individual parts</Tint>.
        </Statement>
        <div className="mt-6 w-full">
          <Plate wide>
            <GestaltPanels />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              The principle of <Term>closure</Term> states that perceivers
              mentally fill in missing gaps in an incomplete image or melody,
              which increases active cognitive engagement with a logo or
              slogan.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The principle of <Term>similarity</Term> states that consumers
              group items that share visual attributes such as color, shape,
              or typography as belonging to the same product line.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              The principle of <Term>figure-ground</Term> states that the
              visual system separates a dominant focal object (the figure)
              from its surrounding context (the ground).
            </P>
            <P className="mt-3">
              Clear figure-ground separation ensures that the brand name and
              key benefit stand out immediately rather than blending into
              decorative background imagery.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Expectation, Categorization, and Perceptual Inference
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="expectation-categorization-and-perceptual-inference"
        border
      >
        <SlideHeading>
          Expectation, Categorization, and Perceptual Inference
        </SlideHeading>
        <Statement className="">
          Interpretation combines <Term>bottom-up processing</Term> driven by
          raw stimulus features with <Term>top-down processing</Term> driven by
          the consumer&apos;s prior knowledge and expectations.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid min-w-0 content-start gap-4">
            <Ruled>
              <P>
                <Term>Schema-based categorization</Term> occurs when a consumer
                assigns a new product to an existing mental category, which
                immediately transfers that category&apos;s expected attributes
                to the item.
              </P>
            </Ruled>
            <P>
              A beverage sold in a slim matte-black aluminum can is categorized
              as an energy drink, whereas a beverage in a green glass bottle is
              categorized as a sparkling mixer or craft soda.
            </P>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <Ruled>
              <P>
                <Term>Perceptual inference</Term> occurs when consumers form
                beliefs about unobserved product attributes, such as durability
                or natural ingredients, based on visible packaging cues.
              </P>
            </Ruled>
            <P>
              When a product&apos;s packaging cues conflict with its actual
              category, consumers experience <Tint>perceptual confusion</Tint>{" "}
              and often pass over the item on the shelf.
            </P>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Semiotics: Object, Sign, and Interpretant
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="semiotics-object-sign-and-interpretant"
        border
      >
        <SlideHeading kicker="Semiotics:">Object, Sign, and Interpretant</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-x-12">
          <div className="grid min-w-0 gap-4">
            <P>
              <Term>Semiotics</Term> is the study of how signs and symbols
              create and transmit meaning within a culture (Peirce, 1931).
            </P>
            <P>
              In marketing semiotics, every persuasive message links{" "}
              <Tint>three elements</Tint>: the object, the sign (or
              representamen), and the interpretant.
            </P>
          </div>
          <Plate wide>
            <SemioticTriangle />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              The <Term>object</Term> is the actual product or brand being
              promoted, such as a rugged four-wheel-drive vehicle.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The <Term>sign</Term> is the sensory image, word, or symbol used
              to represent the product&apos;s qualities, such as a mountain peak
              or a wild mustang.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              The <Term>interpretant</Term> is the mental meaning derived by the
              consumer, such as independence and resilience, which depends on
              the consumer&apos;s cultural background.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 5: Machine Perception in Agent-Mediated Shopping
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-machine-perception-in-agent-mediated-shopping"
        border
      >
        <PartHead n={5} title="Machine Perception in Agent-Mediated Shopping" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="">
            When a consumer delegates shopping to an AI agent, the initial
            stages of exposure, attention, and interpretation are performed by{" "}
            <Tint>software rather than human sensory organs</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Understanding how machine perception differs from human perception
              explains why visual merchandising alone cannot secure choice in
              agentic commerce.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How AI Shopping Agents Perceive Products
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="how-ai-shopping-agents-perceive-products"
        border
      >
        <SlideHeading>How AI Shopping Agents Perceive Products</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="grid min-w-0 gap-4">
            <Big className="">
              An AI shopping agent has no biological receptors for sight, sound,
              smell, touch, or taste.
            </Big>
            <P>
              Instead, the agent perceives a product through{" "}
              <Term>digital tokens</Term>: product titles, structured
              specification tables, price fields, ingredient lists, and
              customer review text.
            </P>
          </div>
          <Plate wide>
            <CerealTwoWays />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              While a human shopper in a grocery aisle perceives a cereal box
              through its shelf color and front-of-pack graphics, an AI agent
              reads its nutrition table, unit weight, and average star rating.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Sensory marketing remains essential during the postpurchase stage,
              because the human consumer still eats, wears, or handles the
              physical product after delivery.
            </P>
          </Ruled>
          <Ruled>
            <P>
              During prepurchase search and purchase selection, however, an AI
              agent responds to <Tint>machine-readable data</Tint> rather than
              sensory atmosphere.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Digital Exposure and Structured Product Data
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="digital-exposure-and-structured-product-data"
        border
      >
        <SlideHeading>Digital Exposure and Structured Product Data</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              For an AI shopping agent, <Term>exposure</Term> occurs only when a
              product&apos;s information is indexed, accessible via search or
              API, and included in the results returned to the agent.
            </Statement>
            <Ruled>
              <P>
                Clear digital exposure is therefore the algorithmic counterpart
                of <Tint>placing a package in clear view</Tint> on a well-lit
                retail shelf.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <DataSheets />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              If a brand places critical attributes such as allergen warnings,
              garment measurements, or warranty length inside an unindexed
              promotional graphic, those attributes fall below the agent&apos;s
              threshold of exposure.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Ambiguous or inconsistent attribute labels across retail listings
              act like sensory noise, preventing the agent from matching the
              item to the consumer&apos;s stated constraints.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Providing complete, standardized schema markup ensures that the
              agent can detect and verify every relevant product attribute
              during screening.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Position Effects in Human and Algorithmic Attention
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="position-effects-in-human-and-algorithmic-attention"
        border
        exercise={exercise["position-effects-in-human-and-algorithmic-attention"]}
      >
        <SlideHeading>
          Position Effects in Human and Algorithmic Attention
        </SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="grid min-w-0 gap-4">
            <P>
              Both human shoppers and AI shopping agents allocate{" "}
              <Term>uneven attention</Term> across positions in a display or
              list.
            </P>
            <P>
              In physical stores, human shoppers attend disproportionately to
              items placed at eye level and at the center of a shelf display,
              and in digital search they click the top results most often.
            </P>
            <P>
              Controlled experiments show that large language models acting as
              shopping agents also exhibit strong position effects when
              evaluating candidate lists (Wadi &amp; Ma, 2026a).
            </P>
          </div>
          <Plate wide>
            <PositionEffects />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Depending on model architecture and list structure, AI agents
              display <Term>primacy bias</Term> toward options listed first or{" "}
              <Term>recency bias</Term> toward options listed last, even when
              product attributes are identical (Wadi &amp; Ma, 2026a).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consequently, <Tint>search ranking order and display position</Tint>{" "}
              shape which products receive attention in both human and
              agent-mediated shopping.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Auditing Sensory and Machine Perception for a Beverage Launch
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-auditing-sensory-and-machine-perception-for-a-beverage-launch"
        border
      >
        <SlideHeading kicker="Discussion:">
          Auditing Sensory and Machine Perception for a Beverage Launch
        </SlideHeading>
        <Prompt>
          A specialty coffee roaster is launching a line of canned cold-brew
          coffee sold both in supermarket refrigerated cases and through online
          grocery platforms where customers use AI shopping assistants. Which
          sensory and Gestalt principles should guide the physical can design
          for in-store shoppers, and which structured data fields and ranking
          factors will determine whether an AI assistant attends to and selects
          the product online?
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
              Sensation is the physical detection of stimuli by sensory
              receptors, whereas perception is the psychological process of
              selecting, organizing, and interpreting those inputs into meaning.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Sensory marketing engages vision, hearing, smell, touch, and taste
              to shape brand associations, store lingering time, and perceived
              product quality.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Psychophysics distinguishes the absolute threshold from the
              differential threshold (JND), and Weber&apos;s Law establishes
              that a noticeable change is a constant proportion of the initial
              stimulus intensity.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Consumers manage sensory overload through selective exposure,
              heightened perceptual vigilance toward need-relevant cues,
              perceptual defense against threatening messages, and adaptation to
              constant stimuli.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Gestalt principles (closure, similarity, figure-ground) and
              semiotic relationships (object, sign, interpretant) explain how
              consumers organize visual elements into coherent brand meanings.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              AI shopping agents perceive products through structured text and
              metadata rather than biological senses, yet both human shoppers
              and AI agents exhibit systematic position effects in attention and
              choice.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
