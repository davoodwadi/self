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
  AnimatedList,
  ListItem,
  Quote,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";

export default function Week4() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 04"
      background={<BackgroundManager type="marketing" />}
    >
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 04 · Consumer Behavior</Subtitle>
        <Title className="mt-6">Motivation, Needs &amp; Values</Title>
        <p className="type-lead max-w-[44ch] mt-4">
          Every purchase is an attempt to move from a current state to a better
          one.
        </p>
      </Slide>

      <Slide id="what-is-consumer-motivation" border>
        <Tag>Overview</Tag>
        <Heading>
          What is consumer <Highlight>motivation</Highlight>?
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Motivation drives people to act when they feel a gap between
                their current state and a desired state.
              </p>
              <p>
                An unmet need creates tension. The consumer takes action to
                reduce that tension and reach a goal.
              </p>
              <p>
                The same product can serve different motives. A gym membership
                may promise health, belonging, or status.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Quote author="Abraham Maslow" role="Motivation Theory">
              What one can be, one must be.
            </Quote>
            <ContentText layout="base">
              Marketers connect products with goals that matter to the person
              making the choice.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="drive-theory-tension-and-reduction"
        border
        quizData={quizBySlideId["drive-theory-tension-and-reduction"]}
      >
        <Tag>Motivation Theory</Tag>
        <Heading>
          Drive theory: tension and <Highlight>reduction</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentTitle>The cycle</ContentTitle>
            <AnimatedList>
              <ListItem><strong>01. Need:</strong> A biological or psychological gap appears.</ListItem>
              <ListItem><strong>02. Drive:</strong> The gap creates internal discomfort.</ListItem>
              <ListItem><strong>03. Action:</strong> The consumer searches for a solution.</ListItem>
              <ListItem><strong>04. Reduction:</strong> Satisfaction lowers the tension.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card title="A familiar example">
              <ContentDescription>
                Hunger creates a drive to find food. After eating, the need is
                temporarily satisfied and the drive becomes weaker.
              </ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4">
              <p>Marketing can remind people of a need or show how an offer may reduce its discomfort.</p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="expectancy-theory-effort-performance-and-outcome"
        border
        quizData={quizBySlideId["expectancy-theory-effort-performance-and-outcome"]}
      >
        <Tag>Motivation Theory</Tag>
        <Heading>
          Expectancy theory: effort, performance, and <Highlight>outcome</Highlight>
        </Heading>
        <ContentText className="mb-4">
          <p>Motivation depends on what consumers believe will happen after they act.</p>
        </ContentText>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3"><Card title="Expectancy"><ContentDescription>Will my effort lead to good performance? A fitness app must seem easy enough to use.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Instrumentality"><ContentDescription>Will good performance lead to the promised result? The app must seem useful.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Valence"><ContentDescription>How much do I value the result? The benefit must matter to this consumer.</ContentDescription></Card></Column>
        </Row>
      </Slide>

      <Slide
        id="needs-wants-and-demand"
        border
        quizData={quizBySlideId["needs-wants-and-demand"]}
      >
        <Tag>Foundations</Tag>
        <Heading>
          Needs, wants, and <Highlight>demand</Highlight>
        </Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3"><Card title="Need"><ContentDescription>A basic biological or psychological requirement, such as hunger, safety, or belonging.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Want"><ContentDescription>The specific product or service chosen to satisfy a need. Culture and personality shape it.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Demand"><ContentDescription>A want supported by both the ability and willingness to pay.</ContentDescription></Card></Column>
        </Row>
        <ContentText layout="base" className="mt-6"><p>Marketers can shape a want. They cannot create the basic human need underneath it.</p></ContentText>
      </Slide>

      <Slide id="maslows-hierarchy-in-consumer-markets" border quizData={quizBySlideId["maslows-hierarchy-in-consumer-markets"]}>
        <Tag>Human Needs</Tag>
        <Heading>Maslow&apos;s hierarchy in <Highlight>consumer markets</Highlight></Heading>
        <ContentText className="mb-4"><p>Maslow arranged needs from basic survival to growth and personal fulfillment. Consumers can pursue several levels at the same time.</p></ContentText>
        <AnimatedList>
          <ListItem><strong>05. Self-actualization:</strong> Growth, creativity, and becoming one&apos;s desired self.</ListItem>
          <ListItem><strong>04. Esteem:</strong> Achievement, respect, recognition, and status.</ListItem>
          <ListItem><strong>03. Belonging:</strong> Friendship, love, acceptance, and community.</ListItem>
          <ListItem><strong>02. Safety:</strong> Protection, stability, health, and security.</ListItem>
          <ListItem><strong>01. Physiological:</strong> Food, water, sleep, and shelter.</ListItem>
        </AnimatedList>
      </Slide>

      <Slide id="motivational-conflicts-three-difficult-choices" border quizData={quizBySlideId["motivational-conflicts-three-difficult-choices"]}>
        <Tag>Decision Tension</Tag>
        <Heading>Motivational conflicts: three <Highlight>difficult choices</Highlight></Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3"><Card title="Approach-Approach"><ContentDescription>Two attractive options compete. A buyer wants a new phone and a weekend trip, but can afford only one.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Approach-Avoidance"><ContentDescription>One option has both a benefit and a cost. A luxury product feels desirable but expensive.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Avoidance-Avoidance"><ContentDescription>Every option has an unwanted consequence. A consumer must choose between two repairs.</ContentDescription></Card></Column>
        </Row>
      </Slide>

      <Slide id="consumer-involvement-how-much-does-it-matter" border>
        <Tag>Consumer Effort</Tag>
        <Heading>Consumer involvement: how much does it <Highlight>matter</Highlight>?</Heading>
        <ContentText className="mb-4"><p>Involvement is the personal importance a consumer assigns to a product, message, or purchase situation.</p></ContentText>
        <Row gap="large" items="start">
          <Column spanRatio="1/2"><Card title="High involvement"><ContentDescription>High risk, identity, or importance leads to careful comparison and more information search. Buying a car is often high involvement.</ContentDescription></Card></Column>
          <Column spanRatio="1/2"><Card title="Low involvement"><ContentDescription>Routine purchases rely on habit, convenience, and simple cues. Choosing a familiar snack is often low involvement.</ContentDescription></Card></Column>
        </Row>
        <ContentText layout="base" className="mt-6"><p>Involvement can change with time pressure, social setting, and perceived risk.</p></ContentText>
      </Slide>

      <Slide id="values-guide-consumer-choices" border quizData={quizBySlideId["values-guide-consumer-choices"]}>
        <Tag>Personal Priorities</Tag>
        <Heading>Values guide consumer <Highlight>choices</Highlight></Heading>
        <ContentText className="mb-4"><p>Values are enduring beliefs about what is important or desirable. They help consumers decide which benefits matter most.</p></ContentText>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3">
            <Card title="Functional">
              <ContentDescription>
                Performance, convenience, reliability, and practical results.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Social">
              <ContentDescription>
                Belonging, recognition, status, and how other people see the consumer.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Experiential">
              <ContentDescription>
                Pleasure, excitement, comfort, identity, or personal meaning.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="discussion-find-the-motive" border>
        <Tag>Class Discussion</Tag>
        <Heading>Find the <Highlight>motive</Highlight></Heading>
        <DiscussionCard title="Discussion: Find the Motive">
          Choose a recent purchase. What need or value did it serve? Which theory best explains your choice: drive reduction, expectancy, hierarchy of needs, or motivational conflict?
        </DiscussionCard>
      </Slide>
    </SlideDeck>
  );
}