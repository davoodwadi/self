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
  Quote,
  AnimatedList,
  ListItem,
  Callout,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import {
  consumptionProcessFlow,
  levelsOfAnalysisFlow,
} from "./flowcharts";

export default function Week1() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck background={<BackgroundManager type="marketing" />}>
      {/* Title Slide */}
      <Slide
        id="title-slide"
        className="flex flex-col items-center justify-center text-center"
      >
        <Title>Introduction to Consumer Behavior</Title>
        <Subtitle variant="hero">Consumer Behavior</Subtitle>
        <AnimatedList className="mt-12 text-xl space-y-6">
          <ListItem>Welcome to Consumer Behavior.</ListItem>
          <ListItem>Today we will define the field and map the territory the course will cover.</ListItem>
          <ListItem>We will look at the consumption process, why the field matters, and the levels at which we study it.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 1: What is Consumer Behavior? */}
      <Slide id="part-1-what-is-consumer-behavior" border>
        <Tag>Part 1</Tag>
        <Heading>What is <Highlight>Consumer Behavior</Highlight>?</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Callout variant="secondary">
              Marketing asks how firms create value. Consumer behavior asks what people actually do with it.
            </Callout>
          </Column>
          <Column spanRatio="1/2" className="justify-center">
            <AnimatedList>
              <ListItem>The field borrows from psychology, sociology, anthropology, and economics.</ListItem>
              <ListItem>Our unit of analysis is the consumer, not the firm.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* The Definition of Consumer Behavior */}
      <Slide
        id="the-definition-of-consumer-behavior"
        border
        quizData={quizBySlideId["the-definition-of-consumer-behavior"]}
      >
        <Tag>Definition</Tag>
        <Heading>The Definition of <Highlight>Consumer Behavior</Highlight></Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              <p>
                Consumer behavior is the study of the processes involved when individuals
                or groups <strong>select, purchase, use, or dispose of</strong> products,
                services, ideas, or experiences.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The definition is deliberately broad: it covers ideas and experiences, not just physical goods.</ListItem>
              <ListItem>It covers processes over time, not a single moment of choice.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Purchase Is Only One Moment */}
      <Slide id="purchase-is-only-one-moment" border>
        <Tag>Framing</Tag>
        <Heading>Purchase Is Only <Highlight>One Moment</Highlight></Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Marketers have historically concentrated on the moment of purchase.</ListItem>
              <ListItem>But the consumer&apos;s relationship with a product starts before it and continues long after.</ListItem>
              <ListItem>Usage and disposal shape satisfaction, repurchase, and word of mouth.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2" className="justify-center">
            <Callout>
              The transaction is the narrowest slice of the relationship, and the easiest one to measure. That is why it gets over-weighted.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* The Consumption Process */}
      <Slide
        id="the-consumption-process"
        border
        quizData={quizBySlideId["the-consumption-process"]}
      >
        <Tag>Process</Tag>
        <Heading>The <Highlight>Consumption</Highlight> Process</Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 my-8">
          <FlowRenderer {...consumptionProcessFlow} />
        </div>
        <AnimatedList className="mt-6">
          <ListItem>Pre-purchase: the consumer recognizes a need and searches for options.</ListItem>
          <ListItem>Purchase: choice, payment, and the experience of acquiring.</ListItem>
          <ListItem>Usage and disposal: how the product performs, what it comes to mean, and what happens when it is done.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Consumers Are More Than Buyers */}
      <Slide id="consumers-are-more-than-buyers" border>
        <Tag>Roles</Tag>
        <Heading>Consumers Are More Than <Highlight>Buyers</Highlight></Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/3">
            <Card title="Influencer">
              <ContentDescription>
                Shapes the choice without paying for it.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Buyer">
              <ContentDescription>
                Makes the transaction and bears the cost.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="User">
              <ContentDescription>
                Lives with the product and judges it.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <AnimatedList className="mt-8">
          <ListItem>One person can play several roles in a single purchase.</ListItem>
          <ListItem>A parent buying cereal for a child is the buyer; the child is the user and often the influencer.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Why Study Consumer Behavior? */}
      <Slide
        id="why-study-consumer-behavior"
        border
        quizData={quizBySlideId["why-study-consumer-behavior"]}
      >
        <Tag>Motivation</Tag>
        <Heading>Why Study <Highlight>Consumer Behavior</Highlight>?</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/3">
            <ContentTitle>For Marketers</ContentTitle>
            <ContentDescription>
              Segmentation, positioning, and product design all rest on assumptions about consumers.
            </ContentDescription>
          </Column>
          <Column spanRatio="1/3">
            <ContentTitle>For Policymakers</ContentTitle>
            <ContentDescription>
              Consumer protection, public health, and nudge policy depend on how people actually decide.
            </ContentDescription>
          </Column>
          <Column spanRatio="1/3">
            <ContentTitle>For Consumers</ContentTitle>
            <ContentDescription>
              Understanding your own behavior is a defense against being managed by it.
            </ContentDescription>
          </Column>
        </Row>
      </Slide>

      {/* Consumption and Identity */}
      <Slide id="consumption-and-identity" border>
        <Tag>Meaning</Tag>
        <Heading>Consumption and <Highlight>Identity</Highlight></Heading>
        <Quote author="Russell Belk" role="Consumer researcher">
          We are what we have.
        </Quote>
        <AnimatedList className="mt-6">
          <ListItem>What we buy signals who we are, both to others and to ourselves.</ListItem>
          <ListItem>Products carry meaning beyond their function.</ListItem>
          <ListItem>Two consumers can buy the same car for entirely different reasons.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Levels of Analysis */}
      <Slide
        id="levels-of-analysis"
        border
        quizData={quizBySlideId["levels-of-analysis"]}
      >
        <Tag>Scope</Tag>
        <Heading>Levels of <Highlight>Analysis</Highlight></Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 my-8">
          <FlowRenderer {...levelsOfAnalysisFlow} />
        </div>
        <AnimatedList className="mt-6">
          <ListItem>We can study the individual: perception, learning, memory, motivation, attitudes.</ListItem>
          <ListItem>We can study the decision itself: search, evaluation, and choice rules.</ListItem>
          <ListItem>We can widen out to groups, subcultures, and culture as a whole.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Two Traditions in the Field */}
      <Slide id="two-traditions-in-the-field" border>
        <Tag>Method</Tag>
        <Heading>Two <Highlight>Traditions</Highlight> in the Field</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <Card title="Positivist" subtitle="Measurement and control">
              <ContentDescription>
                Treats consumers as broadly rational, seeks objective measurement, and favors experiments.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Interpretivist" subtitle="Meaning and context">
              <ContentDescription>
                Treats consumption as meaning-making and favors ethnography and depth interviews.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <Callout className="mt-8">
          Both appear in this course. Neither is sufficient alone.
        </Callout>
      </Slide>

      {/* Data and Method */}
      <Slide id="data-and-method" border>
        <Tag>Evidence</Tag>
        <Heading>Data and <Highlight>Method</Highlight></Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Evidence comes from experiments, surveys, panel data, field studies, and increasingly digital trace data.</ListItem>
              <ListItem>Every method carries a tradeoff between control and realism.</ListItem>
              <ListItem>We will read findings critically rather than accepting headline claims.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2" className="justify-center">
            <Callout variant="secondary" title="A standing question">
              For any finding you meet this term: what was measured, on whom, and under what conditions?
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* The Dark Side of Consumption */}
      <Slide id="the-dark-side-of-consumption" border>
        <Tag>Ethics</Tag>
        <Heading>The <Highlight>Dark Side</Highlight> of Consumption</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Consumer behavior also studies compulsive buying, addiction, and exploitative marketing.</ListItem>
              <ListItem>Understanding influence is understanding how it can be misused.</ListItem>
              <ListItem>Ethics is not a final week appendix; it runs through the whole course.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Discussion">
              Where is the line between persuading a consumer and exploiting a known
              weakness in how they decide? Bring one example you have encountered
              yourself.
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Conclusion */}
      <Slide id="conclusion-introduction-to-consumer-behavior" border>
        <Tag>Conclusion</Tag>
        <Heading>Introduction to <Highlight>Consumer Behavior</Highlight></Heading>
        <AnimatedList className="mt-8">
          <ListItem>Consumer behavior covers selection, purchase, use, and disposal.</ListItem>
          <ListItem>The process extends well beyond the moment of sale.</ListItem>
          <ListItem>We analyze it from the individual outward to culture, using both positivist and interpretivist methods.</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}
