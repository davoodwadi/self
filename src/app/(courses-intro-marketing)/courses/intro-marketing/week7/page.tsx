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
  ContentDescription,
  DiscussionCard,
  Callout,
  AnimatedList,
  ListItem,
  Figure,
  Metric,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import { createCourseQuizLookup, CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import {
  ProductLayers,
  ProductMixMatrix,
  NpdFunnel,
  PlcCurves,
  BrandEquityHouse,
  BrandGrowthGrid,
  ServiceDimensions,
} from "./visuals";

export default function Week7() {
  const quizBySlideId = createCourseQuizLookup(quizzesData as CourseQuiz[]);

  return (
    <SlideDeck
      label="Week 07"
      background={<BackgroundManager type="marketing" />}
    >
      {/* Title Slide */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 07 · Introduction to Marketing</Subtitle>
        <Title className="mt-6">Product &amp; Service Strategies</Title>
        <p className="type-lead max-w-[44ch] mt-4">
          A product is not just an object on a shelf. It is a bundle of
          benefits, a promise, and a relationship that changes over time.
        </p>
      </Slide>

      {/* 1. Defining a Product */}
      <Slide
        id="the-concept-defining-a-product"
        border
        quizData={quizBySlideId["the-concept-defining-a-product"]}
      >
        <Tag>The Concept</Tag>
        <Heading>
          Defining a <Highlight>product</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                A product is anything that can be offered to a market for
                attention, acquisition, use, or consumption that might satisfy a
                want or need.
              </p>
              <p>
                It includes physical objects, services, events, persons, places,
                organizations, and ideas.
              </p>
              <p>
                Products solve problems and deliver customer value. Buyers do
                not purchase features for their own sake; they buy what those
                features accomplish.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5" justify="center">
            <Callout title="Levitt's classic insight">
              People do not buy quarter-inch drill bits. They buy quarter-inch
              holes. Start with the problem solved before listing the features.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 2. Three Levels of Product */}
      <Slide id="three-levels-of-product" border>
        <Tag>Product Architecture</Tag>
        <Heading>
          The three <Highlight>levels</Highlight> of product
        </Heading>
        <ContentText className="mb-2">
          <p>
            Every product can be understood as three layers: the core customer
            value, the actual physical product, and the augmented services.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Competition shifts outward over time. When actual products look similar, augmented services win the sale."
        >
          <ProductLayers />
        </Figure>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              <strong>Core value</strong> sits in the centre: the primary
              problem the customer wants solved. The{" "}
              <strong>actual product</strong> wraps around it: brand name,
              styling, packaging, and quality.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <ContentText layout="base">
              The <strong>augmented product</strong> forms the outer ring:
              warranty, fast delivery, customer service, and technical support.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* 3. Consumer Goods */}
      <Slide id="product-classifications-consumer-goods" border>
        <Tag>Classification</Tag>
        <Heading>
          Product classifications: <Highlight>consumer goods</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText>
              <p>
                Consumer goods are bought by final consumers for personal
                consumption.
              </p>
              <p>
                Marketers divide these goods into categories based on how
                consumers go about buying them: how much time, effort, and
                comparison they invest.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Convenience Goods" subtitle="Frequent Purchase">
              <ContentDescription>
                Purchased frequently, immediately, and with minimal comparison
                and buying effort. Examples: milk, candy, bread, toothpaste.
              </ContentDescription>
            </Card>
            <div className="h-4" />
            <Card title="Shopping Goods" subtitle="Planned Purchase">
              <ContentDescription>
                Purchased less frequently and compared carefully on suitability,
                quality, price, and style. Examples: furniture, winter coats,
                major appliances.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 4. Specialty and Unsought Goods */}
      <Slide
        id="product-classifications-specialty-and-unsought-goods"
        border
        quizData={
          quizBySlideId["product-classifications-specialty-and-unsought-goods"]
        }
      >
        <Tag>Classification</Tag>
        <Heading>
          Specialty and <Highlight>unsought</Highlight> goods
        </Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/2">
            <Card title="Specialty Goods" subtitle="Unique Identification">
              <ContentDescription>
                Goods with unique characteristics or strong brand
                identification. Buyers are willing to make a special purchase
                effort. Examples: sports cars, luxury watches, high-end cameras.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Unsought Goods" subtitle="Hidden Needs">
              <ContentDescription>
                Products that the consumer either does not know about or knows
                about but does not normally think of buying. Examples: life
                insurance, prepaid funeral services, blood donation.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <div className="mt-8">
          <Callout variant="primary" title="Strategic Approach">
            Each category requires a distinct marketing, distribution, and
            pricing strategy. Convenience demands wide placement; specialty
            demands exclusive reputation.
          </Callout>
        </div>
      </Slide>

      {/* 5. Product Mix Decisions */}
      <Slide id="product-mix-decisions" border>
        <Tag>Portfolio Strategy</Tag>
        <Heading>
          Product line and <Highlight>mix</Highlight> decisions
        </Heading>
        <ContentText className="mb-2">
          <p>
            An organization rarely sells a single product item. It manages an
            entire portfolio defined by line depth and mix width.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Width counts the number of distinct product lines. Depth counts the versions offered within each line."
        >
          <ProductMixMatrix />
        </Figure>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/3">
            <Card title="Product Line">
              <ContentDescription>
                A group of closely related items that function similarly, target
                the same buyers, or sell through similar outlets.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Mix Width">
              <ContentDescription>
                The number of different product lines carried by the company.
                Adding new lines expands overall business scope.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Mix Depth">
              <ContentDescription>
                The number of versions or variants offered within each product
                line, such as sizes, flavours, and formulations.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 6. Product Life Cycle */}
      <Slide
        id="the-concept-the-product-life-cycle"
        border
        quizData={quizBySlideId["the-concept-the-product-life-cycle"]}
      >
        <Tag>The Concept</Tag>
        <Heading>
          The product <Highlight>life cycle</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            The Product Life Cycle (PLC) describes the course of a product's
            sales and profits over its lifetime.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Profits peak before sales volume peaks. Price competition in maturity compresses margins even as units climb."
        >
          <PlcCurves />
        </Figure>
        <AnimatedList className="mt-4">
          <ListItem>
            The Product Life Cycle describes the course of a product's sales and
            profits over its lifetime.
          </ListItem>
          <ListItem>
            It consists of distinct stages: development, introduction, growth,
            maturity, and decline.
          </ListItem>
          <ListItem>
            Not all products follow this cycle strictly, but it provides a
            useful framework for strategic planning and resource allocation.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* 7. PLC Stages: Introduction and Growth */}
      <Slide id="the-plc-stages-introduction-and-growth" border>
        <Tag>The Stages</Tag>
        <Heading>
          Introduction and <Highlight>growth</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="Introduction" subtitle="Market Launch">
              <ContentDescription>
                Sales are slow and profits are nonexistent due to heavy initial
                investment in development and promotion. The marketing goal is
                to build product awareness and stimulate initial trial.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Growth" subtitle="Market Acceptance">
              <ContentDescription>
                The product achieves rapid market acceptance and increasing
                profits. New competitors enter the market; the firm focuses on
                maximizing market share and building distribution.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 8. PLC Stages: Maturity and Decline */}
      <Slide id="the-plc-stages-maturity-and-decline" border>
        <Tag>The Stages</Tag>
        <Heading>
          Maturity and <Highlight>decline</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="Maturity" subtitle="Market Saturation">
              <ContentDescription>
                A slowdown in sales growth because the product has achieved
                acceptance by most potential buyers. Profits level off or
                decline due to fierce competition and defensive marketing
                outlays.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Decline" subtitle="Phase Out">
              <ContentDescription>
                Sales fall off and profits drop as consumer tastes shift or
                superior technology replaces the product. Management decides
                whether to maintain, harvest, or drop the offering.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 9. Discussion: Managing the Decline Stage */}
      <Slide id="discussion-managing-the-decline-stage" border>
        <Tag>Case Study</Tag>
        <Heading>
          Managing the decline <Highlight>stage</Highlight>
        </Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                A legacy software product has steadily declining user numbers,
                but a core group of enterprise clients still rely on it.
              </ListItem>
              <ListItem>
                Shutting it down will upset loyal clients, but keeping it
                running consumes valuable engineering and support resources.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Strategic Choice">
              Do you harvest the remaining profits by cutting all updates and
              support, or do you gracefully retire the product and force
              migration to a new system?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 10. New Product Development */}
      <Slide id="the-challenge-new-product-development" border>
        <Tag>The Challenge</Tag>
        <Heading>
          New product <Highlight>development</Highlight>
        </Heading>
        <Row gap="large" items="center">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Companies must continually innovate to replace declining
                products.
              </p>
              <p>
                New products can be original products, product improvements,
                product modifications, or new brands developed through internal
                R&amp;D efforts.
              </p>
              <p>
                Innovation carries high financial risk, with most new products
                failing in the open marketplace.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5">
            <Metric
              value="60–80%"
              label="Estimated failure rate for newly launched products"
            />
          </Column>
        </Row>
      </Slide>

      {/* 11. NPD Process */}
      <Slide
        id="strategy-new-product-development-process"
        border
        quizData={quizBySlideId["strategy-new-product-development-process"]}
      >
        <Tag>The Process</Tag>
        <Heading>
          New product development <Highlight>process</Highlight>
        </Heading>
        <Figure
          height="auto"
          caption="An eight-step funnel filters concepts early. Screening out weak ideas saves capital before costly tooling commits."
        >
          <NpdFunnel />
        </Figure>
        <AnimatedList className="mt-4">
          <ListItem>
            Idea generation and screening start the process by sourcing and
            filtering new concepts.
          </ListItem>
          <ListItem>
            Concept development and testing involve evaluating the idea with
            target consumers.
          </ListItem>
          <ListItem>
            Marketing strategy development outlines the initial marketing plan
            for the new product.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* 12. Business Analysis to Commercialization */}
      <Slide id="strategy-from-business-analysis-to-commercialization" border>
        <Tag>Strategy</Tag>
        <Heading>
          Business analysis to <Highlight>commercialization</Highlight>
        </Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/2">
            <Card title="Analysis & Development" subtitle="Feasibility">
              <ContentDescription>
                Business analysis evaluates the business attractiveness, cost
                projections, and sales potential of the proposal.
              </ContentDescription>
              <div className="mt-4">
                <ContentDescription>
                  Product development turns the concept into a physical,
                  functional, and testable prototype.
                </ContentDescription>
              </div>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Testing & Launch" subtitle="Execution">
              <ContentDescription>
                Test marketing introduces the product and marketing mix into
                realistic market settings to assess consumer response.
              </ContentDescription>
              <div className="mt-4">
                <ContentDescription>
                  Commercialization is the full-scale introduction of the new
                  offering into the open market.
                </ContentDescription>
              </div>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 13. Branding Strategy */}
      <Slide
        id="the-concept-branding-strategy"
        border
        quizData={quizBySlideId["the-concept-branding-strategy"]}
      >
        <Tag>The Concept</Tag>
        <Heading>
          Branding <Highlight>strategy</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            A brand is a name, term, sign, symbol, or design that identifies the
            maker or seller of a product. It represents consumer perceptions,
            expectations, and feelings.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Four pillars support brand equity: awareness, perceived quality, brand associations, and brand loyalty."
        >
          <BrandEquityHouse />
        </Figure>
        <Row gap="large" items="center" className="mt-4">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              A brand provides buyers with information about quality and
              consistency while reducing purchase uncertainty.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Brand Equity">
              Brand equity is the differential effect that knowing the brand
              name has on customer response to the product or its marketing.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 14. Building Strong Brands */}
      <Slide id="strategy-building-strong-brands" border>
        <Tag>Strategy</Tag>
        <Heading>
          Building strong <Highlight>brands</Highlight>
        </Heading>
        <Figure
          height="auto"
          caption="Firms grow brands in four directions: line extensions, brand extensions, multibrands, and new brands."
        >
          <BrandGrowthGrid />
        </Figure>
        <Row gap="medium" items="stretch" className="mt-4">
          <Column spanRatio="1/3">
            <Card title="Brand Positioning" subtitle="Vision">
              <ContentDescription>
                Establishes the brand's mission and core value proposition in
                the consumer's mind.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Name Selection" subtitle="Identity">
              <ContentDescription>
                Requires finding a name that suggests benefits, is distinctive,
                and is easy to pronounce and legally protect.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Brand Sponsorship" subtitle="Ownership">
              <ContentDescription>
                Options include manufacturer brands, store brands (private
                labels), licensed brands, and co-branding.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 15. Packaging and Labeling */}
      <Slide id="the-concept-packaging-and-labeling" border>
        <Tag>The Concept</Tag>
        <Heading>
          Packaging and <Highlight>labeling</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="Packaging Functions" subtitle="Beyond Protection">
              <ContentDescription>
                Packaging involves designing and producing the container or
                wrapper. It protects the product, attracts shopper attention,
                and communicates key benefits on the store shelf.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Labeling Roles" subtitle="Information & Trust">
              <ContentDescription>
                Labeling identifies the product, grades it, describes its
                contents and nutritional facts, and complies with mandatory
                consumer protection and bilingual regulations.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <div className="mt-8">
          <Callout title="The five-second salesperson">
            In modern retail, a package has only a few seconds to attract a
            shopper, communicate the brand identity, and justify the purchase.
          </Callout>
        </div>
      </Slide>

      {/* 16. Nature of Services */}
      <Slide
        id="the-concept-the-nature-of-services"
        border
        quizData={quizBySlideId["the-concept-the-nature-of-services"]}
      >
        <Tag>The Concept</Tag>
        <Heading>
          The nature of <Highlight>services</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="3/5">
            <ContentText>
              <p>
                Services are a form of product that consists of activities,
                benefits, or satisfactions offered for sale.
              </p>
              <p>
                They are essentially intangible and do not result in the
                ownership of anything.
              </p>
              <p>
                The service economy is growing rapidly and dominates modern
                markets in employment and GDP.
              </p>
            </ContentText>
          </Column>
          <Column spanRatio="2/5" justify="center">
            <Callout variant="secondary" title="Economic Dominance">
              Because services produce experiences rather than physical
              inventories, they require tailored marketing mindsets and tools.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 17. Four Service Characteristics */}
      <Slide id="the-challenge-four-service-characteristics" border>
        <Tag>The Challenge</Tag>
        <Heading>
          Four service <Highlight>characteristics</Highlight>
        </Heading>
        <ContentText className="mb-2">
          <p>
            Services differ from goods across four fundamental dimensions, each
            posing a specific management challenge.
          </p>
        </ContentText>
        <Figure
          height="auto"
          caption="Services require distinctive marketing strategies to make intangible promises tangible, consistent, and resilient."
        >
          <ServiceDimensions />
        </Figure>
      </Slide>

      {/* 18. Marketing Services */}
      <Slide id="strategy-marketing-services" border>
        <Tag>Strategy</Tag>
        <Heading>
          Marketing <Highlight>services</Highlight>
        </Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Service firms must manage the interaction between the customer
                and the frontline employee.
              </ListItem>
              <ListItem>
                The service-profit chain links service firm profits with
                employee and customer satisfaction.
              </ListItem>
              <ListItem>
                Internal marketing means the firm must train, orient, and
                motivate its customer-contact employees.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2" justify="center">
            <Callout variant="secondary" title="Frontline is the brand">
              In service operations, the customer encounters the employee, not a
              factory box. Customer satisfaction starts with employee support.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 19. Overcoming Service Perishability */}
      <Slide id="discussion-overcoming-service-perishability" border>
        <Tag>Reflection</Tag>
        <Heading>
          Overcoming service <Highlight>perishability</Highlight>
        </Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                An airline has 50 empty seats on a flight departing in 24 hours.
                Once the plane takes off, the revenue opportunity for those
                seats is gone forever.
              </ListItem>
              <ListItem>
                Offering deep last-minute discounts might fill the seats but
                could train customers to wait for cheap tickets in the future.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              How should the airline balance the immediate need to capture
              perishable revenue against long-term brand pricing power?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 20. Conclusion */}
      <Slide id="conclusion-product-and-service-strategies" border>
        <Tag>Conclusion</Tag>
        <Heading>
          Product and service <Highlight>strategies</Highlight>
        </Heading>
        <Row gap="medium" items="stretch">
          <Column spanRatio="1/4">
            <Card title="Product Foundation">
              <ContentDescription>
                The product is the foundation of the marketing mix and requires
                careful lifecycle management.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4">
            <Card title="Continuous Innovation">
              <ContentDescription>
                Structured new product development is essential for long-term
                growth and survival.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4">
            <Card title="Brand Equity">
              <ContentDescription>
                Strong branding and effective packaging create lasting consumer
                connections and pricing leverage.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4">
            <Card title="Service Mindset">
              <ContentDescription>
                Services require distinct strategies to manage intangibility,
                inseparability, variability, and perishability.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>
    </SlideDeck>
  );
}
