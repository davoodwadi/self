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

export default function Week6() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 06"
      background={<BackgroundManager type="marketing" />}
    >
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 06 · Consumer Behavior</Subtitle>
        <Title className="mt-6">Attitudes &amp; Persuasion</Title>
        <p className="type-lead max-w-[44ch] mt-4">
          Consumers do not just evaluate products. They feel, think, and act toward them.
        </p>
      </Slide>

      <Slide id="what-are-consumer-attitudes" border>
        <Tag>Overview</Tag>
        <Heading>
          What are consumer <Highlight>attitudes</Highlight>?
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>An attitude is a lasting evaluation of a person, object, or idea.</p>
              <p>Attitudes can be favorable, unfavorable, or somewhere between the two.</p>
              <p>They help consumers simplify repeated choices, but they can also resist new information.</p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Quote author="Daniel Katz" role="Attitude Functions">
              Attitudes help people organize their experience and guide action.
            </Quote>
          </Column>
        </Row>
      </Slide>

      <Slide id="abc-model-affect-behavior-and-cognition" border quizData={quizBySlideId["abc-model-affect-behavior-and-cognition"]}>
        <Tag>Attitude Structure</Tag>
        <Heading>The ABC model: feeling, doing, and <Highlight>thinking</Highlight></Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3"><Card title="Affect"><ContentDescription>Feelings and emotions toward an object. A consumer may love a brand&apos;s personality.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Behavior"><ContentDescription>Actions or intentions. A consumer may buy, recommend, or avoid the brand.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Cognition"><ContentDescription>Beliefs and thoughts. A consumer may believe the brand is reliable or good value.</ContentDescription></Card></Column>
        </Row>
        <ContentText layout="base" className="mt-6"><p>The three parts often support each other, but they can also conflict.</p></ContentText>
      </Slide>

      <Slide id="functions-of-consumer-attitudes" border quizData={quizBySlideId["functions-of-consumer-attitudes"]}>
        <Tag>Why Attitudes Matter</Tag>
        <Heading>Four functions of <Highlight>attitudes</Highlight></Heading>
        <AnimatedList>
          <ListItem><strong>Utilitarian:</strong> Helps consumers gain benefits or avoid costs.</ListItem>
          <ListItem><strong>Value-expressive:</strong> Communicates identity, values, and self-image.</ListItem>
          <ListItem><strong>Ego-defensive:</strong> Protects self-esteem from uncomfortable threats.</ListItem>
          <ListItem><strong>Knowledge:</strong> Organizes information and makes the world easier to understand.</ListItem>
        </AnimatedList>
      </Slide>

      <Slide id="attitude-formation-hierarchies" border quizData={quizBySlideId["attitude-formation-hierarchies"]}>
        <Tag>Formation</Tag>
        <Heading>How attitudes form: three <Highlight>hierarchies</Highlight></Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3"><Card title="Standard learning"><ContentDescription>Think, feel, then act. This pattern is common for important purchases that require careful comparison.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Low involvement"><ContentDescription>Think briefly, act, then develop a feeling. Familiar cues and repetition guide routine choices.</ContentDescription></Card></Column>
          <Column spanRatio="1/3"><Card title="Experiential"><ContentDescription>Feel, act, then explain. Direct experience and emotion lead when enjoyment matters most.</ContentDescription></Card></Column>
        </Row>
      </Slide>

      <Slide id="source-credibility-and-attractiveness" border quizData={quizBySlideId["source-credibility-and-attractiveness"]}>
        <Tag>Persuasion</Tag>
        <Heading>Who delivers the message changes its <Highlight>impact</Highlight></Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentTitle>Source credibility</ContentTitle>
            <ContentText layout="base"><p>Expertise makes a source seem knowledgeable. Trustworthiness makes the source seem honest and dependable.</p></ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentTitle>Source attractiveness</ContentTitle>
            <ContentText layout="base"><p>Familiarity, likability, and similarity can make a source more persuasive, especially when the audience identifies with it.</p></ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide id="message-framing-and-attitude-change" border quizData={quizBySlideId["message-framing-and-attitude-change"]}>
        <Tag>Message Strategy</Tag>
        <Heading>Framing changes what the audience <Highlight>notices</Highlight></Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/2"><Card title="Positive frame"><ContentDescription>Emphasizes gains, benefits, or the desirable result of choosing an offer.</ContentDescription></Card></Column>
          <Column spanRatio="1/2"><Card title="Negative frame"><ContentDescription>Emphasizes losses, risks, or the problem that may follow inaction.</ContentDescription></Card></Column>
        </Row>
        <ContentText layout="base" className="mt-6"><p>Effective framing depends on the audience, the goal, and whether the choice feels like a gain or a loss.</p></ContentText>
      </Slide>

      <Slide id="discussion-audit-a-persuasive-message" border>
        <Tag>Class Discussion</Tag>
        <Heading>Audit a <Highlight>persuasive message</Highlight></Heading>
        <DiscussionCard title="Discussion: Audit a Persuasive Message">
          Choose an advertisement or product recommendation. Identify its affect, behavior, and cognition elements. Who is the source? Is the message framed around a gain or a loss? Would a different audience be persuaded by the same message?
        </DiscussionCard>
      </Slide>
    </SlideDeck>
  );
}