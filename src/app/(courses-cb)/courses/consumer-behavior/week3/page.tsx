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
  ConditioningFlow,
  GeneralizationChart,
  InstrumentalMatrix,
  MemoryStorageFlow,
  BrandAssociativeNetwork,
} from "./visuals";

export default function Week3() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 03"
      background={<BackgroundManager type="marketing" />}
    >
      {/* ================================================================
          Slide 1: Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 03 · Consumer Behavior</Subtitle>
        <Title className="mt-6">Learning and Memory</Title>
        <p className="type-lead max-w-[44ch] mt-4">
          Brands live in the brain. How people learn, remember, and forget
          shapes every purchase.
        </p>
      </Slide>

      {/* ================================================================
          Slide 2: What Is Consumer Learning?
          ================================================================ */}
      <Slide id="what-is-consumer-learning" border>
        <Tag>Overview</Tag>
        <Heading>
          What is <Highlight>consumer learning</Highlight>?
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Learning is a permanent change in behavior caused by experience.
              </p>
              <p>
                The experience can be direct. You try a new snack and like the
                taste. The experience can also be indirect. You see an ad or
                watch a friend buy running shoes.
              </p>
              <p>
                Learning is an ongoing process. Consumers constantly update
                their knowledge when they encounter new products.
              </p>
              <p>
                Marketers study learning so that brand names become automatic
                habits in the mind of the buyer.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Quote author="B.F. Skinner" role="Behavioral Psychology">
              We learn by doing, and we repeat what brings good results.
            </Quote>
            <ContentText layout="base">
              Consumer loyalty is often a set of learned associations repeated
              until they feel effortless.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 3: Classical Conditioning: Pairing Stimuli [quiz]
          ================================================================ */}
      <Slide
        id="classical-conditioning-pairing-stimuli"
        border
        quizData={quizBySlideId["classical-conditioning-pairing-stimuli"]}
      >
        <Tag>Conditioning</Tag>
        <Heading>
          Classical conditioning: <Highlight>pairing stimuli</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Classical conditioning happens when a stimulus that brings a natural
            response pairs with a neutral stimulus.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Repeated pairing of a natural stimulus (music) with a neutral brand cue builds a conditioned response."
        >
          <ConditioningFlow />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="The Unconditioned Stimulus (UCS)">
              <ContentDescription>
                A natural trigger, like upbeat music or appetizing imagery, that
                automatically creates positive feelings without prior training.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="The Conditioned Stimulus (CS)">
              <ContentDescription>
                Initially neutral, such as a logo or package shape. With
                repeated pairings, seeing the logo alone triggers the positive
                emotion.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 4: Repetition and Stimulus Generalization [quiz]
          ================================================================ */}
      <Slide
        id="repetition-and-stimulus-generalization"
        border
        quizData={quizBySlideId["repetition-and-stimulus-generalization"]}
      >
        <Tag>Stimulus Dynamics</Tag>
        <Heading>
          Repetition and <Highlight>stimulus generalization</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Conditioning requires repetition, but how consumers perceive similar
            packages determines their choice.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Store brands borrow familiar packaging cues through stimulus generalization, while leaders protect discrimination."
        >
          <GeneralizationChart />
        </Figure>
        <Row gap="large" items="start" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="Stimulus Generalization">
              <ContentDescription>
                Similar stimuli trigger the same learned response. Store brands
                copy colors and fonts so shoppers transfer trust from the
                leading brand.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Stimulus Discrimination">
              <ContentDescription>
                A brand teaches shoppers to spot unique traits. Distinct bottles
                and patented logos help products stand out from copycats.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 5: Instrumental Conditioning: Rewards and Punishments
          ================================================================ */}
      <Slide id="instrumental-conditioning-rewards-and-punishments" border>
        <Tag>Operant Learning</Tag>
        <Heading>
          Instrumental conditioning:{" "}
          <Highlight>rewards and penalties</Highlight>
        </Heading>
        <ContentText className="mb-4">
          <p>
            In instrumental conditioning, consumers learn to perform behaviors
            that produce positive results and avoid negative results.
          </p>
        </ContentText>
        <InstrumentalMatrix />
        <Row gap="large" items="start" className="mt-6">
          <Column spanRatio="1/2">
            <ContentTitle>Reinforcement Builds Habits</ContentTitle>
            <ContentText>
              <p>
                Positive rewards, like bonus points or cashback, make repeat
                trips more frequent.
              </p>
              <p>
                Negative reinforcement shows how buying a product removes an
                annoyance, like buying noise-canceling headphones to eliminate
                office chatter.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentTitle>Punishment Stops Behavior</ContentTitle>
            <ContentText>
              <p>
                Punishment introduces a painful consequence. Return fees or
                missed-payment penalties stop unwanted actions.
              </p>
              <p>
                Marketers use reinforcement far more than punishment because
                punishment can cause resentment toward the brand.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 6: Observational Learning: Watching Others [quiz]
          ================================================================ */}
      <Slide
        id="observational-learning-watching-others"
        border
        quizData={quizBySlideId["observational-learning-watching-others"]}
      >
        <Tag>Social Modeling</Tag>
        <Heading>
          Observational learning: <Highlight>watching others</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText>
              <p>
                Consumers do not learn only from personal rewards. They also
                learn by observing the actions of other people.
              </p>
              <p>
                This process is called observational learning or modeling.
                People watch celebrities, coworkers, or peers, and imitate their
                product choices.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                <strong>01. Attention:</strong> The consumer notices an
                attractive or credible person using a brand.
              </ListItem>
              <ListItem>
                <strong>02. Retention:</strong> The consumer remembers what the
                model wore, drove, or recommended.
              </ListItem>
              <ListItem>
                <strong>03. Production:</strong> The consumer has the ability to
                replicate the behavior.
              </ListItem>
              <ListItem>
                <strong>04. Motivation:</strong> The consumer expects to receive
                similar social praise or satisfaction.
              </ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 7: The Memory System: Three Stores [quiz]
          ================================================================ */}
      <Slide
        id="the-memory-system-three-stores"
        border
        quizData={quizBySlideId["the-memory-system-three-stores"]}
      >
        <Tag>Cognitive Architecture</Tag>
        <Heading>
          The memory system: <Highlight>three stores</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Memory acquires information and stores it for later recall during a
            shopping trip.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Information moves through sensory, short-term, and long-term memory stores."
        >
          <MemoryStorageFlow />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/3">
            <Card title="1. Sensory Memory">
              <ContentDescription>
                Brief sensory inputs lasting less than two seconds. Only items
                that receive active attention pass into working memory.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="2. Short-Term Memory">
              <ContentDescription>
                Holds active thoughts for about twenty seconds. Limited to four
                to seven chunks of information at any one time.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="3. Long-Term Memory">
              <ContentDescription>
                Stores brand associations, stories, and facts for months or
                decades through elaborative rehearsal and emotional ties.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 8: Associative Networks and Brand Nodes
          ================================================================ */}
      <Slide id="associative-networks-and-brand-nodes" border>
        <Tag>Memory Structure</Tag>
        <Heading>
          Associative networks and <Highlight>brand nodes</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Long-term memory organizes knowledge like a spider web. Nodes
            represent concepts, feelings, and brand names.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="A brand node connects to attributes, feelings, and slogans through spreading activation."
        >
          <BrandAssociativeNetwork />
        </Figure>
        <Row gap="large" items="start" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="Spreading Activation">
              <ContentDescription>
                When one node turns on in consciousness, connected nodes light
                up too. Hearing a brand name prompts memories of logos,
                athletes, and emotional slogans.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Brand Equity in Memory">
              <ContentDescription>
                Stronger and more positive connections make a brand easier to
                retrieve in crowded store aisles and search bars.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 9: Brand Retrieval and Cues in the Aisle
          ================================================================ */}
      <Slide id="brand-retrieval-and-cues-in-the-aisle" border>
        <Tag>In-Store Decision</Tag>
        <Heading>
          Brand retrieval and <Highlight>cues in the aisle</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentTitle>Retrieval Cues</ContentTitle>
            <ContentText>
              <p>
                Having brand knowledge stored in memory is useless if the
                shopper cannot access it at the point of sale.
              </p>
              <p>
                Visual cues act as memory triggers. Distinct package colors,
                mascots, and shelf displays reactivate ad memories from earlier
                in the week.
              </p>
              <p>
                Matching the package in the ad to the package on the shelf is
                one of the easiest ways to boost sales.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentTitle>State-Dependent Retrieval</ContentTitle>
            <ContentText>
              <p>
                People recall information better when their internal mood or
                physical setting matches when they first learned it.
              </p>
              <p>
                A consumer who sees an energetic gym ad while working out will
                remember the sports drink better when standing in the fitness
                club lobby than at a quiet library.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 10: Why Consumers Forget
          ================================================================ */}
      <Slide id="why-consumers-forget" border>
        <Tag>Memory Decay &amp; Interference</Tag>
        <Heading>
          Why consumers <Highlight>forget</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="Decay Over Time">
              <ContentDescription>
                Memory traces naturally weaken when not refreshed. If a brand
                stops running ads, consumers slowly lose access to the brand
                node.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Competitive Interference">
              <ContentDescription>
                New competitor messages crowd out older brand memories. In
                retroactive interference, new brand ads make older claims harder
                to recall.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText layout="base" className="mt-6">
          <p>
            Brands use consistent visual assets, regular reminder campaigns, and
            prime shelf space to prevent memory decay.
          </p>
        </ContentText>
      </Slide>

      {/* ================================================================
          Slide 11: Discussion
          ================================================================ */}
      <Slide id="discussion-your-brand-web" border>
        <Tag>Class Discussion</Tag>
        <Heading>
          Your personal <Highlight>brand web</Highlight>
        </Heading>
        <DiscussionCard title="Discussion: Your Brand Web">
          Pick a brand you buy regularly. What four associations pop into your
          mind first? Did the brand teach you these links through conditioning,
          observational learning, or your own personal experience?
        </DiscussionCard>
      </Slide>
    </SlideDeck>
  );
}
