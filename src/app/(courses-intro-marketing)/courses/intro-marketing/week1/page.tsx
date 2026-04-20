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
  needsWantsDemandsFlow,
  evolutionOfMarketingFlow,
  marketingProcessFlow,
} from "./flowcharts";

export default function Week1() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck background={<BackgroundManager type="marketing" /> } >
      {/* Title Slide */}
      <Slide
        id="title-slide"
        className="flex flex-col items-center justify-center text-center"
      >
        <Title>Introduction to Marketing & The Marketing Process</Title>
        <Subtitle variant="hero">Introduction to Marketing</Subtitle>
        <AnimatedList className="mt-12 text-xl space-y-6">
          <ListItem>Welcome to Introduction to Marketing.</ListItem>
          <ListItem>Today we will explore the foundational principles of modern marketing.</ListItem>
          <ListItem>We will cover definitions, evolution, and the five-step marketing process.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 1: What is Marketing? */}
      <Slide id="part-1-what-is-marketing" border>
        <Tag>Part 1</Tag>
        <Heading>What is <Highlight>Marketing</Highlight>?</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Callout variant="secondary">
              Marketing is often misunderstood as just advertising or selling.
            </Callout>
          </Column>
          <Column spanRatio="1/2" className="justify-center">
            <AnimatedList>
              <ListItem>In reality, it is a comprehensive process of creating value for customers.</ListItem>
              <ListItem>The ultimate goal is to capture value from customers in return.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* The Definition of Marketing */}
      <Slide
        id="the-definition-of-marketing"
        border
        quizData={quizBySlideId["the-definition-of-marketing"]}
      >
        <Tag>Definition</Tag>
        <Heading>The Definition of <Highlight>Marketing</Highlight></Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              Marketing is the process by which companies engage customers.
            </ContentText>
            <AnimatedList className="mt-6">
              <ListItem>It involves building strong customer relationships.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>The Objective</ContentTitle>
              <ContentDescription>
                It is designed to create customer value in order to capture value in return.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Core Goal: Customer Value */}
      <Slide id="the-core-goal-customer-value" border>
        <Tag>Objective</Tag>
        <Heading>The Core Goal: <Highlight>Customer Value</Highlight></Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Customer value is the perceived benefit a customer gains from a product.</ListItem>
              <ListItem>It is compared to the cost of obtaining that product.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Quote author="The Loyalty Loop">
              Highly satisfied customers buy again and tell others about their good experiences.
            </Quote>
          </Column>
        </Row>
      </Slide>

      {/* Needs, Wants, and Demands */}
      <Slide
        id="needs-wants-and-demands"
        border
        quizData={quizBySlideId["needs-wants-and-demands"]}
      >
        <Tag>Foundation</Tag>
        <Heading>Needs, Wants, and <Highlight>Demands</Highlight></Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 my-8">
          <FlowRenderer {...needsWantsDemandsFlow} />
        </div>
        <AnimatedList className="mt-6">
          <ListItem>These three concepts are the foundation of marketing.</ListItem>
          <ListItem>Understanding the difference between them is critical for any strategy.</ListItem>
          <ListItem>Marketers do not create needs, but they can influence wants.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Needs: The Basic Requirements */}
      <Slide id="needs-the-basic-requirements" border>
        <Tag>Needs</Tag>
        <Heading><Highlight>Needs</Highlight>: The Basic Requirements</Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>What They Are</ContentTitle>
              <ContentDescription>
                Needs are states of felt deprivation.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full border-t-4 border-t-[var(--accent1)]">
              <ContentTitle>Physical Needs</ContentTitle>
              <ContentDescription>
                They include physical needs for food, clothing, warmth, and safety.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full border-t-4 border-t-[var(--accent2)]">
              <ContentTitle>Social & Individual Needs</ContentTitle>
              <ContentDescription>
                They also include social needs for belonging and individual needs for knowledge.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Wants: Shaped by Culture and Personality */}
      <Slide id="wants-shaped-by-culture-and-personality" border>
        <Tag>Wants</Tag>
        <Heading><Highlight>Wants</Highlight>: Shaped by Culture and Personality</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Wants are the form human needs take as they are shaped by culture.</ListItem>
              <ListItem>An individual needs food but wants a specific type of cuisine or restaurant.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="primary">
              Marketing helps shape wants by exposing consumers to attractive options.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* Demands: Backed by Buying Power */}
      <Slide id="demands-backed-by-buying-power" border>
        <Tag>Demands</Tag>
        <Heading><Highlight>Demands</Highlight>: Backed by Buying Power</Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Quote>
              When backed by purchasing power, wants become demands.
            </Quote>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Consumers view products as bundles of benefits and choose products that add up to the most satisfaction.</ListItem>
              <ListItem>A company must understand its customers' demands to offer the right products at the right price.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Discussion: Needs vs Wants */}
      <Slide id="discussion-needs-vs-wants" border>
        <Tag>Discussion</Tag>
        <Heading>Needs vs <Highlight>Wants</Highlight></Heading>
        <div className="mt-12">
          <DiscussionCard title="Group Discussion">
            If a consumer buys a highly expensive luxury watch, which specific psychological needs and culturally shaped wants are they satisfying compared to buying a basic timepiece?
          </DiscussionCard>
        </div>
      </Slide>

      {/* Part 2: The Evolution of Marketing */}
      <Slide id="part-2-the-evolution-of-marketing" border>
        <Tag>Part 2</Tag>
        <Heading>The <Highlight>Evolution</Highlight> of Marketing</Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 my-8">
          <FlowRenderer {...evolutionOfMarketingFlow} />
        </div>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              Marketing has evolved through several distinct philosophies over time.
            </ContentText>
            <AnimatedList className="mt-6">
              <ListItem>Each era represents a shift in how companies interact with the market.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="secondary">
              Understanding this history helps us see why modern marketing is customer focused.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* The Production Concept */}
      <Slide id="the-production-concept" border>
        <Tag>History</Tag>
        <Heading>The <Highlight>Production</Highlight> Concept</Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>Origins</ContentTitle>
              <ContentDescription>
                This is one of the oldest concepts in business.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>Premise</ContentTitle>
              <ContentDescription>
                It holds that consumers will favor products that are available and highly affordable.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>Focus</ContentTitle>
              <ContentDescription>
                Management focuses on improving production and distribution efficiency.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Product Concept */}
      <Slide id="the-product-concept" border>
        <Tag>History</Tag>
        <Heading>The <Highlight>Product</Highlight> Concept</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>This concept holds that consumers will favor products that offer the most in quality and performance.</ListItem>
              <ListItem>The focus is on making continuous product improvements.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="primary" title="Warning">
              A risk here is marketing myopia, focusing only on the product instead of the customer's underlying need.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* The Selling Concept */}
      <Slide
        id="the-selling-concept"
        border
        quizData={quizBySlideId["the-selling-concept"]}
      >
        <Tag>History</Tag>
        <Heading>The <Highlight>Selling</Highlight> Concept</Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>This approach assumes consumers will not buy enough of the firm's products unless it undertakes a large scale selling and promotion effort.</ListItem>
              <ListItem>It focuses on creating sales transactions rather than building long-term relationships.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>Common Application</ContentTitle>
              <ContentDescription>
                It is typically practiced with unsought goods, like insurance or blood donations.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Marketing Concept */}
      <Slide
        id="the-marketing-concept"
        border
        quizData={quizBySlideId["the-marketing-concept"]}
      >
        <Tag>Modern Paradigm</Tag>
        <Heading>The <Highlight>Marketing</Highlight> Concept</Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Quote>
              It is a customer-centered, sense and respond philosophy.
            </Quote>
          </Column>
          <Column spanRatio="1/2" className="justify-center">
            <AnimatedList>
              <ListItem>This philosophy holds that achieving organizational goals depends on knowing the needs and wants of target markets.</ListItem>
              <ListItem>It requires delivering the desired satisfactions better than competitors do.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* The Societal Marketing Concept */}
      <Slide id="the-societal-marketing-concept" border>
        <Tag>Future</Tag>
        <Heading>The <Highlight>Societal</Highlight> Marketing Concept</Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              This concept questions whether the pure marketing concept overlooks possible conflicts between consumer short-term wants and consumer long-term welfare.
            </ContentText>
            <AnimatedList className="mt-6">
              <ListItem>This leads to sustainable marketing practices.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>The Dual Objective</ContentTitle>
              <ContentDescription>
                It holds that marketing strategy should deliver value to customers in a way that maintains or improves both the consumer's and society's well-being.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Discussion: Applying the Concepts */}
      <Slide id="discussion-applying-the-concepts" border>
        <Tag>Discussion</Tag>
        <Heading>Applying the <Highlight>Concepts</Highlight></Heading>
        <div className="mt-12">
          <DiscussionCard title="Group Discussion">
            How can a traditional fast-food company pivot from a purely product and selling concept to a societal marketing concept without completely losing its core, price-sensitive customer base?
          </DiscussionCard>
        </div>
      </Slide>

      {/* Part 3: The Marketing Process */}
      <Slide id="part-3-the-marketing-process" border>
        <Tag>Part 3</Tag>
        <Heading>The Marketing <Highlight>Process</Highlight></Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 my-8">
          <FlowRenderer {...marketingProcessFlow} />
        </div>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The marketing process is a simple five-step model.</ListItem>
              <ListItem>The first four steps create value for customers.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="secondary">
              The final step captures value from customers in return.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* Step 1: Understand the Marketplace */}
      <Slide id="step-1-understand-the-marketplace" border>
        <Tag>Step 1</Tag>
        <Heading>Understand the <Highlight>Marketplace</Highlight></Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>Objective</ContentTitle>
              <ContentDescription>
                Marketers must understand customer needs and wants.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>Methodology</ContentTitle>
              <ContentDescription>
                This requires extensive market research and data collection.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>Scope</ContentTitle>
              <ContentDescription>
                It involves analyzing the broader marketing environment.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Step 2: Design a Customer Value-Driven Strategy */}
      <Slide
        id="step-2-design-a-customer-value-driven-strategy"
        border
        quizData={quizBySlideId["step-2-design-a-customer-value-driven-strategy"]}
      >
        <Tag>Step 2</Tag>
        <Heading>Design a Customer <Highlight>Value-Driven</Highlight> Strategy</Heading>
        <ContentText layout="base" className="mb-6">
          The marketing manager must answer two important questions.
        </ContentText>
        <Row gap="medium">
          <Column spanRatio="1/2">
            <Card className="h-full border-t-4 border-t-[var(--accent1)]">
              <ContentTitle>1. What customers will we serve?</ContentTitle>
              <ContentDescription>
                This involves market segmentation and targeting.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card className="h-full border-t-4 border-t-[var(--accent2)]">
              <ContentTitle>2. How can we serve these customers best?</ContentTitle>
              <ContentDescription>
                This involves differentiation and positioning.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Step 3: Construct an Integrated Marketing Program */}
      <Slide id="step-3-construct-an-integrated-marketing-program" border>
        <Tag>Step 3</Tag>
        <Heading>Construct an Integrated Marketing <Highlight>Program</Highlight></Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>The company's marketing strategy outlines which customers it will serve and how it will create value for them.</ListItem>
              <ListItem>Next, the marketer develops an integrated marketing program that will actually deliver the intended value.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="primary">
              This is done using the marketing mix, often called the four Ps: Product, Price, Place, and Promotion.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* Step 4: Engage Customers and Build Relationships */}
      <Slide id="step-4-engage-customers-and-build-relationships" border>
        <Tag>Step 4</Tag>
        <Heading>Engage Customers and Build <Highlight>Relationships</Highlight></Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Quote>
              Customer relationship management is the overall process of building and maintaining profitable customer relationships.
            </Quote>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>It involves delivering superior customer value and satisfaction.</ListItem>
              <ListItem>The goal is to produce high customer equity, the combined customer lifetime values of all the company's customers.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Step 5: Capture Value from Customers */}
      <Slide id="step-5-capture-value-from-customers" border>
        <Tag>Step 5</Tag>
        <Heading>Capture <Highlight>Value</Highlight> from Customers</Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              The first four steps involve creating value for the customer.
            </ContentText>
            <AnimatedList className="mt-6">
              <ListItem>In the final step, the company captures value in return in the form of sales, market share, and profit.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>The Value Loop</ContentTitle>
              <ContentDescription>
                Creating superior customer value creates highly satisfied customers who stay loyal and buy more.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Concept: Customer Lifetime Value */}
      <Slide id="the-concept-customer-lifetime-value" border>
        <Tag>Concept</Tag>
        <Heading>The Concept: Customer <Highlight>Lifetime Value</Highlight></Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Callout variant="primary">
              Keeping customers loyal makes good economic sense.
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Losing a customer means losing more than a single sale.</ListItem>
              <ListItem>It means losing the entire stream of purchases that the customer would make over a lifetime of patronage.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Discussion: Value Creation */}
      <Slide id="discussion-value-creation" border>
        <Tag>Discussion</Tag>
        <Heading><Highlight>Value</Highlight> Creation</Heading>
        <div className="mt-12">
          <DiscussionCard title="Group Discussion">
            Consider a brand to which you are highly loyal; how does this brand capture value from you beyond just your financial purchases over time?
          </DiscussionCard>
        </div>
      </Slide>

      {/* Conclusion: Introduction to Marketing */}
      <Slide id="conclusion-introduction-to-marketing" border>
        <Tag>Conclusion</Tag>
        <Heading>Introduction to <Highlight>Marketing</Highlight></Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>The Core</ContentTitle>
              <ContentDescription>
                Marketing is not just selling, it is a process of creating and capturing value.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>The Foundation</ContentTitle>
              <ContentDescription>
                Understanding needs, wants, and demands is the starting point for all marketing strategies.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>The Process</ContentTitle>
              <ContentDescription>
                The five-step marketing process provides a structured approach to building lasting customer relationships.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>
    </SlideDeck>
  );
}
