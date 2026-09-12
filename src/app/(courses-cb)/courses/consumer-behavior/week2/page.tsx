"use client";

import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Highlight,
  Tag,
  ContentText,
  Row,
  Column,
  Card,
  ContentTitle,
  ContentDescription,
  DiscussionCard,
  Figure,
  AnimatedList,
  ListItem,
  Quote,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import {
  PerceptionFunnel,
  SensoryWheel,
  WebersLawScale,
  GestaltPrinciples,
} from "./visuals";

export default function Week2() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 02"
      background={<BackgroundManager type="marketing" />}
    >
      {/* ================================================================
          Slide 1: Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 02 · Consumer Behavior</Subtitle>
        <Title className="mt-6">Perception &amp; Sensory Marketing</Title>
        <p className="type-lead max-w-[44ch] mt-4">
          We do not see things as they are. We see things through our senses and
          personal filters.
        </p>
      </Slide>

      {/* ================================================================
          Slide 2: What Is Perception?
          ================================================================ */}
      <Slide id="what-is-perception" border>
        <Tag>Overview</Tag>
        <Heading>
          What is <Highlight>perception</Highlight>?
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Perception is the process of selecting, organizing, and
                interpreting raw sensations.
              </p>
              <p>
                Every second, thousands of sights, sounds, smells, and textures
                reach our sensory organs. The human brain cannot process all of
                them.
              </p>
              <p>
                Perception creates meaning out of this chaos. Two shoppers
                exposed to the exact same advertisement often walk away with
                completely different impressions.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Quote author="Emanuel Swedenborg" role="Philosopher">
              We see things not as they are, but as we are.
            </Quote>
            <ContentText layout="base">
              Marketers do not fight for shelf space alone. They fight for space
              in the consumer&apos;s mind.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 3: The Three Stages of Perception [quiz]
          ================================================================ */}
      <Slide
        id="three-stages-of-perception"
        border
        quizData={quizBySlideId["three-stages-of-perception"]}
      >
        <Tag>The Framework</Tag>
        <Heading>
          The <Highlight>three stages</Highlight> of perception
        </Heading>
        <ContentText className="mb-2">
          <p>
            Perception happens in three sequential steps. Most sensory inputs
            are filtered out before they reach conscious thought.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Perception occurs across exposure, attention, and interpretation."
        >
          <PerceptionFunnel />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/3">
            <Card title="1. Exposure">
              <ContentDescription>
                Sensory stimuli come within range of a person&apos;s sensory
                receptors. If an ad plays when you leave the room, exposure did
                not happen.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="2. Attention">
              <ContentDescription>
                The mind allocates mental processing capacity to a specific
                stimulus. Shoppers ignore most stimuli and focus on what matters
                now.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="3. Interpretation">
              <ContentDescription>
                The brain assigns meaning to the sensory stimulus based on past
                experiences, memory schemas, and cultural background.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 4: Sensory Marketing
          ================================================================ */}
      <Slide id="sensory-marketing-beyond-sight" border>
        <Tag>Sensory Channels</Tag>
        <Heading>
          Sensory marketing: beyond <Highlight>sight and sound</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Sensory marketing engages multiple senses to influence emotions,
            memories, and buying choices.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="The five sensory modalities guiding consumer behavior in retail and digital settings."
        >
          <SensoryWheel />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="Touch &amp; Scent Power">
              <ContentDescription>
                Touching a product increases psychological ownership and
                willingness to pay. Scent connects directly to the limbic
                system, triggering instant emotional recall.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Sound &amp; Color Strategy">
              <ContentDescription>
                Slow tempo background music slows shopper pace in stores. Brand
                colors communicate reliability, urgency, or luxury within
                milliseconds of exposure.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 5: Sensory Thresholds [quiz]
          ================================================================ */}
      <Slide
        id="sensory-thresholds-limits-of-awareness"
        border
        quizData={quizBySlideId["sensory-thresholds-limits-of-awareness"]}
      >
        <Tag>Thresholds</Tag>
        <Heading>
          Sensory thresholds: limits of <Highlight>awareness</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentTitle>The Absolute Threshold</ContentTitle>
            <ContentText>
              <p>
                The absolute threshold is the minimum amount of stimulation a
                person can detect on a sensory channel.
              </p>
              <p>
                A highway billboard with small text placed too far away falls
                below the driver&apos;s absolute threshold. The driver cannot
                read it at all.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentTitle>The Differential Threshold (JND)</ContentTitle>
            <ContentText>
              <p>
                The differential threshold is the ability to detect differences
                between two stimuli.
              </p>
              <p>
                The minimum difference needed for detection is called the Just
                Noticeable Difference, or JND. Marketers study the JND to decide
                whether a product change will be noticed.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 6: Weber's Law [quiz]
          ================================================================ */}
      <Slide
        id="webers-law-when-differences-matter"
        border
        quizData={quizBySlideId["webers-law-when-differences-matter"]}
      >
        <Tag>Economic Psychology</Tag>
        <Heading>
          Weber&apos;s Law: when differences <Highlight>matter</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Weber&apos;s Law states that the stronger the initial stimulus, the
            greater the change must be for people to notice it. The required
            change is a constant proportion, not a fixed number.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="The proportional nature of Weber's Law: $0.10 matters on a candy bar, but goes unnoticed on a laptop."
        >
          <WebersLawScale />
        </Figure>
        <Row gap="large" items="start" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="Stay Below JND (Quiet Changes)">
              <ContentDescription>
                When shrinking candy bar weight (shrinkflation) or making minor
                price increases, marketers keep changes below the JND so
                shoppers do not complain.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Exceed JND (Noticeable Changes)">
              <ContentDescription>
                When launching a modern logo redesign, running a seasonal sale,
                or adding bonus volume, marketers make the change big enough to
                clearly cross the JND.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 7: Attention and Perceptual Filters
          ================================================================ */}
      <Slide id="attention-and-perceptual-filters" border>
        <Tag>Attention Filters</Tag>
        <Heading>
          How consumers <Highlight>filter</Highlight> sensory overload
        </Heading>
        <ContentText className="mb-4">
          <p>
            Shoppers encounter thousands of marketing messages every day. Human
            attention uses mental filters to protect cognitive energy.
          </p>
        </ContentText>
        <AnimatedList>
          <ListItem>
            <strong>01. Perceptual Vigilance:</strong> Consumers notice stimuli
            that relate to their current needs. If you are hungry, you suddenly
            spot every restaurant sign on the avenue.
          </ListItem>
          <ListItem>
            <strong>02. Perceptual Defense:</strong> Consumers screen out
            messages that cause anxiety or contradict core beliefs. Heavy
            smokers often look away from graphic health warning labels on packs.
          </ListItem>
          <ListItem>
            <strong>03. Adaptation:</strong> Consumers stop paying attention to
            a stimulus after repeated exposure. An unchanging billboard becomes
            invisible wallpaper over time.
          </ListItem>
          <ListItem>
            <strong>04. Contrast &amp; Novelty:</strong> Stimuli that break
            patterns through unusual size, bright color, or unexpected motion
            cut through habituated filters.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* ================================================================
          Slide 8: Interpretation and Gestalt Principles [quiz]
          ================================================================ */}
      <Slide
        id="interpretation-and-gestalt-principles"
        border
        quizData={quizBySlideId["interpretation-and-gestalt-principles"]}
      >
        <Tag>Gestalt Psychology</Tag>
        <Heading>
          Interpretation: seeing the <Highlight>whole picture</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            People do not see individual design pieces in isolation. Gestalt
            principles explain how people group elements into unified wholes.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Three core Gestalt principles in brand logos, packaging, and advertising."
        >
          <GestaltPrinciples />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/3">
            <Card title="Closure">
              <ContentDescription>
                The mind fills in missing lines and pieces to perceive an entire
                familiar shape, like the World Wildlife Fund panda logo.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Similarity">
              <ContentDescription>
                Consumers group objects that share visual traits such as color
                or shape. Store brands use similar packaging colors to look like
                name brands.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Figure-Ground">
              <ContentDescription>
                One part of the stimulus stands out as the focal object
                (figure), while the rest fades into the background (ground).
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 9: Semiotics in Marketing
          ================================================================ */}
      <Slide id="semiotics-in-marketing" border>
        <Tag>Symbolic Meaning</Tag>
        <Heading>
          Semiotics: the <Highlight>meaning</Highlight> of marketing messages
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="The Object">
              <ContentDescription>
                The actual product that serves as the focus of the marketing
                message (e.g., a luxury wristwatch or an electric car).
              </ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4">
              <p>
                Consumers rarely buy an item only for its functional features.
                They buy the psychological meaning associated with it.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Card title="The Sign &amp; Interpretant">
              <ContentDescription>
                The sign is the sensory image or symbol used (e.g., an eagle or
                a rugged mountain peak). The interpretant is the meaning derived
                by the consumer (e.g., freedom, courage, prestige).
              </ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4">
              <p>
                Example: A luxury vehicle ad displays a sleek panther running in
                silence. The panther signifies speed, grace, and quiet power.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 10: Discussion
          ================================================================ */}
      <Slide id="discussion-sensory-signatures" border>
        <Tag>Class Discussion</Tag>
        <Heading>
          Brand <Highlight>sensory signatures</Highlight>
        </Heading>
        <DiscussionCard title="Discussion: Sensory Signatures">
          Think of a brand that you recognize instantly without reading its name
          or seeing its logo. Does it use a signature scent, a distinct audio
          chime, a unique bottle shape, or a specific signature color? How does
          that sensory cue build brand recall for you?
        </DiscussionCard>
      </Slide>
    </SlideDeck>
  );
}
