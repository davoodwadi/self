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
import { ConsumptionCycle, NeedWantTrio, SegmentationPillars } from "./visuals";

export default function Week1() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 01"
      background={<BackgroundManager type="marketing" />}
    >
      {/* ================================================================
          Slide 1: Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 01 · Consumer Behavior</Subtitle>
        <Title className="mt-6">What Is Consumer Behavior?</Title>
        <p className="type-lead max-w-[44ch] mt-4">
          People do not buy products. They buy solutions to feelings, problems,
          and social needs.
        </p>
      </Slide>

      {/* ================================================================
          Slide 2: The Tip of the Iceberg
          ================================================================ */}
      <Slide id="the-tip-of-the-iceberg" border>
        <Tag>Overview</Tag>
        <Heading>
          The <Highlight>tip</Highlight> of the iceberg
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Most people think consumer behavior is just shopping. But the
                purchase at the register is only one second in a long chain.
              </p>
              <p>
                Before paying, people spend weeks noticing problems, searching
                options, and asking friends. After the sale, they use the item,
                feel happy or regretful, and tell others.
              </p>
              <p>
                Consumer behavior studies the whole chain: before, during, and
                after the sale.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Quote author="Philip Kotler" role="Marketing Management">
              The customer is the ultimate arbiter of value.
            </Quote>
            <ContentText layout="base">
              Every purchase starts with an unmet need and ends with an
              evaluation that determines future loyalty.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 3: The Three Stages of Consumption [quiz]
          ================================================================ */}
      <Slide
        id="three-stages-of-consumption"
        border
        quizData={quizBySlideId["three-stages-of-consumption"]}
      >
        <Tag>The Framework</Tag>
        <Heading>
          The <Highlight>three stages</Highlight> of consumption
        </Heading>
        <ContentText className="mb-2">
          <p>
            Consumption is a continuous cycle. It does not begin or end at the
            cash register.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Consumption takes place across prepurchase, purchase, and postpurchase stages."
        >
          <ConsumptionCycle />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/3">
            <Card title="1. Prepurchase">
              <ContentDescription>
                The consumer identifies a problem and seeks information.
                Marketers study how consumer attitudes form.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="2. Purchase">
              <ContentDescription>
                The consumer encounters the store, website, or sales associate.
                Convenience, speed, and packaging determine the final choice.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="3. Postpurchase">
              <ContentDescription>
                The consumer uses the item and judges its performance. Marketers
                track customer satisfaction, returns, and repeat orders.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 4: Consumers Versus Customers
          ================================================================ */}
      <Slide id="consumers-versus-customers" border>
        <Tag>Key Distinction</Tag>
        <Heading>
          Consumers versus <Highlight>customers</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="The Customer">
              <ContentDescription>
                The customer is the person who makes the actual transaction and
                pays the bill. They care about price, payment terms, and store
                location.
              </ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4">
              <p>
                In common conversation, people use these two words as synonyms.
                In marketing strategy, confusing them is a costly mistake.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Card title="The Consumer">
              <ContentDescription>
                The consumer is the end-user who actually consumes or interacts
                with the good. They care about flavor, usability, and comfort.
              </ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4">
              <p>
                Example: A parent purchases baby food at a supermarket. The
                parent is the customer. The infant is the consumer. A smart
                marketer must satisfy both.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 5: Why Consumers Are Not Calculators [quiz]
          ================================================================ */}
      <Slide
        id="why-consumers-are-not-calculators"
        border
        quizData={quizBySlideId["why-consumers-are-not-calculators"]}
      >
        <Tag>Behavioral Reality</Tag>
        <Heading>
          Why consumers are not <Highlight>calculators</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentTitle>The Rational Myth</ContentTitle>
            <ContentText>
              <p>
                Early economic models assumed that consumers are purely rational
                decision makers.
              </p>
              <p>
                Under that view, shoppers gather complete information, weigh
                every feature, calculate exact utility, and always pick the
                optimal item.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentTitle>The Behavioral Reality</ContentTitle>
            <ContentText>
              <p>
                Real human beings have limited time and cognitive energy. They
                cannot analyze fifty brands in an aisle.
              </p>
              <p>
                Instead, consumers rely on mental shortcuts, habits, visual
                cues, and emotions. Marketers who treat buyers as cold
                calculators miss how decisions really happen.
              </p>
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 6: Needs Versus Wants
          ================================================================ */}
      <Slide id="needs-versus-wants" border>
        <Tag>Foundations</Tag>
        <Heading>
          Needs versus <Highlight>wants</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Do marketers invent human needs? The short answer is no. Marketers
            shape how people choose to fulfill those needs.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Needs stem from biology and psychology. Wants are shaped by culture. Demand occurs when purchasing power supports the want."
        >
          <NeedWantTrio />
        </Figure>
        <Row gap="large" items="start" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="A Need Is Biological">
              <ContentDescription>
                Thirst, hunger, shelter, and companionship exist before any
                advertising campaign is conceived. They cannot be created from
                scratch.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="A Want Is Cultural">
              <ContentDescription>
                A thirsty person wants a cold soda, sparkling water, or iced
                tea. Culture, habits, and marketing shape that specific choice.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 7: The Many Roles One Person Plays
          ================================================================ */}
      <Slide id="many-roles-one-purchase" border>
        <Tag>Purchase Roles</Tag>
        <Heading>
          The roles involved in <Highlight>one purchase</Highlight>
        </Heading>
        <ContentText className="mb-4">
          <p>
            A single consumer decision often distributes responsibility across
            several different roles.
          </p>
        </ContentText>
        <AnimatedList>
          <ListItem>
            <strong>01. The Initiator:</strong> The person who first realizes an
            unsatisfied need or opportunity (e.g., a student noticing their
            laptop is broken).
          </ListItem>
          <ListItem>
            <strong>02. The Influencer:</strong> The person whose advice or
            opinions carry weight in the selection (e.g., a friend recommending
            a particular brand).
          </ListItem>
          <ListItem>
            <strong>03. The Buyer:</strong> The person who handles the payment
            transaction and controls the budget (e.g., the parent paying for the
            laptop).
          </ListItem>
          <ListItem>
            <strong>04. The User:</strong> The actual person who operates,
            consumes, and interacts with the good daily.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* ================================================================
          Slide 8: Market Segmentation [quiz]
          ================================================================ */}
      <Slide
        id="market-segmentation-who-are-we-talking-to"
        border
        quizData={quizBySlideId["market-segmentation-who-are-we-talking-to"]}
      >
        <Tag>Targeting</Tag>
        <Heading>
          Market segmentation: who are we <Highlight>talking to</Highlight>?
        </Heading>
        <ContentText className="mb-2">
          <p>
            No brand appeals to everyone equally. Market segmentation divides a
            broad market into smaller groups with shared traits.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="The four primary bases of consumer segmentation."
        >
          <SegmentationPillars />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/2">
            <Card title="Demographics & Geographics">
              <ContentDescription>
                Objective metrics such as age, income, education, and location.
                Easy to measure and essential for media planning.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Psychographics & Behavioral">
              <ContentDescription>
                Subjective lifestyle variables, values, usage frequency, and
                brand loyalty. Harder to collect, but explains why people buy.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* ================================================================
          Slide 9: Ethics and Dark Patterns
          ================================================================ */}
      <Slide id="ethics-and-dark-patterns" border>
        <Tag>Ethics</Tag>
        <Heading>
          The ethical border: helping versus <Highlight>manipulating</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="Value Creation">
              <ContentDescription>
                Ethical marketing informs buyers, respects attention, and helps
                people choose goods that solve their genuine problems.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Dark Patterns">
              <ContentDescription>
                Deceptive digital designs that trick users into actions they did
                not intend, such as pre-checked subscription boxes or hidden
                cancellation links.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText layout="base" className="mt-6">
          <p>
            Consumer psychology gives marketers strong tools. When companies use
            them deceptively, consumer trust erodes and regulatory bodies step
            in.
          </p>
        </ContentText>
      </Slide>

      {/* ================================================================
          Slide 10: Discussion
          ================================================================ */}
      <Slide id="discussion-regretful-purchase" border>
        <Tag>Class Discussion</Tag>
        <Heading>
          Your last <Highlight>regretful</Highlight> purchase
        </Heading>
        <DiscussionCard title="Discussion: Regretful Purchase">
          Think of an item you bought recently for more than $50 that you now
          regret purchasing. Which stage of consumption failed you? Did you buy
          it to fulfill a true need or a fleeting impulse want? How did social
          influence shape your choice?
        </DiscussionCard>
      </Slide>
    </SlideDeck>
  );
}
