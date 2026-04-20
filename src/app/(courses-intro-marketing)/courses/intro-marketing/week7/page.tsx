"use client";

import React from "react";
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
  AnimatedList,
  ListItem,
  Callout,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import {
  productLifeCycleFlow,
  newProductDevFlow,
  serviceCharacteristicsFlow,
} from "./flowcharts";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function IntroMarketingWeek7() {
  return (
    <SlideDeck background={<BackgroundManager type="marketing" />}>
      {/* Title Slide */}
      <Slide>
        <Title>Product and Service Strategies</Title>
        <Subtitle variant="hero">The First P</Subtitle>
        <ContentText layout="base" className="text-center mt-8">
          Davood Wadi, PhD
        </ContentText>
        <AnimatedList className="mt-12 text-center max-w-2xl mx-auto">
          <ListItem>Welcome to Week 7 of Introduction to Marketing.</ListItem>
          <ListItem>Today we focus on the first P of the marketing mix: Product.</ListItem>
          <ListItem>We will explore what makes a product successful from inception to decline.</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Concept: Defining a Product [quiz] */}
      <Slide quizData={quizBySlideId["the-concept-defining-a-product"]}>
        <Tag>The Concept</Tag>
        <Heading>Defining a <Highlight>Product</Highlight></Heading>
        <AnimatedList>
          <ListItem>A product is anything that can be offered to a market for attention, acquisition, use, or consumption.</ListItem>
          <ListItem>It includes physical objects, services, events, persons, places, organizations, and ideas.</ListItem>
          <ListItem>Products solve problems and deliver value to consumers.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Product Classifications: Consumer Goods */}
      <Slide>
        <Heading>Product Classifications: <Highlight>Consumer Goods</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText>
              Consumer goods are bought by final consumers for personal consumption.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Convenience Goods" subtitle="Frequent Purchase">
              <ContentDescription>Convenience goods are purchased frequently with minimal comparison (e.g. toothpaste).</ContentDescription>
            </Card>
            <div className="h-4" />
            <Card title="Shopping Goods" subtitle="Planned Purchase">
              <ContentDescription>Shopping goods require more planning and comparison on quality, price, and style (e.g. furniture).</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Product Classifications: Specialty and Unsought Goods [quiz] */}
      <Slide quizData={quizBySlideId["product-classifications-specialty-and-unsought-goods"]}>
        <Heading>Product Classifications: <Highlight>Specialty & Unsought</Highlight></Heading>
        <Row gap="medium">
          <Column spanRatio="1/2">
            <Card title="Specialty Goods" subtitle="Unique Identification">
              <ContentDescription>Specialty goods have unique characteristics or brand identification requiring special purchase effort (e.g. luxury cars).</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Unsought Goods" subtitle="Hidden Needs">
              <ContentDescription>Unsought goods are products consumers do not normally think of buying (e.g. life insurance).</ContentDescription>
            </Card>
          </Column>
        </Row>
        <div className="mt-8">
          <Callout variant="primary" title="Strategic Approach">
            Each category requires a distinct marketing and pricing strategy.
          </Callout>
        </div>
      </Slide>

      {/* The Concept: The Product Life Cycle [quiz] */}
      <Slide quizData={quizBySlideId["the-concept-the-product-life-cycle"]}>
        <Tag>The Concept</Tag>
        <Heading>The <Highlight>Product Life Cycle</Highlight></Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
          <FlowRenderer {...productLifeCycleFlow} />
        </div>
        <AnimatedList className="mt-8">
          <ListItem>The Product Life Cycle (PLC) describes the course of a product's sales and profits over its lifetime.</ListItem>
          <ListItem>It consists of five distinct stages: development, introduction, growth, maturity, and decline.</ListItem>
          <ListItem>Not all products follow this cycle strictly, but it provides a useful framework for strategy.</ListItem>
        </AnimatedList>
      </Slide>

      {/* The PLC Stages: Introduction and Growth */}
      <Slide>
        <Heading>The PLC Stages: <Highlight>Introduction and Growth</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Introduction" subtitle="Creating Awareness">
              <ContentDescription>During introduction, sales are slow and profits are nonexistent due to heavy investment.</ContentDescription>
              <div className="mt-4">
                <ContentText layout="base">The marketing goal is to create product awareness and trial.</ContentText>
              </div>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Growth" subtitle="Market Expansion">
              <ContentDescription>During growth, the product achieves rapid market acceptance and increasing profits.</ContentDescription>
              <div className="mt-4">
                <ContentText layout="base">The firm focuses on maximizing market share as competition enters.</ContentText>
              </div>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The PLC Stages: Maturity and Decline */}
      <Slide>
        <Heading>The PLC Stages: <Highlight>Maturity and Decline</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText>
              <strong>Maturity</strong> is a period of slowdown in sales growth because the product has achieved acceptance by most potential buyers.
            </ContentText>
            <AnimatedList>
              <ListItem>Profits level off or decline due to increased marketing outlays to defend against competition.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <ContentText>
              <strong>Decline</strong> is the period when sales fall off and profits drop.
            </ContentText>
            <AnimatedList>
              <ListItem>Management may decide to maintain, harvest, or drop the declining product.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Discussion: Managing the Decline Stage */}
      <Slide>
        <Tag>Reflection</Tag>
        <Heading>Managing the <Highlight>Decline Stage</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>A legacy software product has steadily declining user numbers, but a core group of businesses still rely on it.</ListItem>
              <ListItem>Shutting it down will upset loyal clients, but keeping it running costs engineering resources.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Do you harvest the remaining profits by cutting all support, or do you gracefully retire the product and force migration to a new system?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* The Challenge: New Product Development */}
      <Slide>
        <Tag>The Challenge</Tag>
        <Heading>New <Highlight>Product Development</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Companies must continually innovate to replace declining products.</ListItem>
              <ListItem>New products can be original products, improvements, modifications, or new brands.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="secondary" title="High Risk">
              Innovation carries high risk, with many new products failing in the marketplace.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* Strategy: New Product Development Process [quiz] */}
      <Slide quizData={quizBySlideId["strategy-new-product-development-process"]}>
        <Tag>Strategy</Tag>
        <Heading><Highlight>New Product</Highlight> Development Process</Heading>
        <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
          <FlowRenderer {...newProductDevFlow} />
        </div>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Idea generation and screening start the process by sourcing and filtering new concepts.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Concept development and testing involve testing the idea with a group of target consumers.</ListItem>
              <ListItem>Marketing strategy development outlines the initial marketing strategy for the new product.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Strategy: From Business Analysis to Commercialization */}
      <Slide>
        <Tag>Strategy</Tag>
        <Heading>Business Analysis to <Highlight>Commercialization</Highlight></Heading>
        <Row gap="medium">
          <Column spanRatio="1/2">
            <Card title="Analysis & Development" subtitle="Feasibility">
              <ContentDescription>Business analysis evaluates the business attractiveness of the proposal.</ContentDescription>
              <div className="mt-4">
                <ContentText layout="base">Product development turns the concept into a physical and testable prototype.</ContentText>
              </div>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Testing & Launch" subtitle="Market Entry">
              <ContentDescription>Test marketing introduces the product and marketing program into realistic market settings.</ContentDescription>
              <div className="mt-4">
                <ContentText layout="base">Commercialization is the final step of introducing the new product into the market.</ContentText>
              </div>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Concept: Branding Strategy [quiz] */}
      <Slide quizData={quizBySlideId["the-concept-branding-strategy"]}>
        <Tag>The Concept</Tag>
        <Heading><Highlight>Branding</Highlight> Strategy</Heading>
        <AnimatedList>
          <ListItem>A brand is a name, term, sign, symbol, or design that identifies the maker or seller of a product.</ListItem>
          <ListItem>It represents the consumer's perceptions and feelings about a product and its performance.</ListItem>
          <ListItem>Brand equity is the differential effect that knowing the brand name has on customer response to the product or its marketing.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Strategy: Building Strong Brands */}
      <Slide>
        <Tag>Strategy</Tag>
        <Heading>Building <Highlight>Strong Brands</Highlight></Heading>
        <Row gap="medium">
          <Column spanRatio="1/3">
            <Card title="Positioning" subtitle="Mission & Vision">
              <ContentDescription>Brand positioning establishes the brand's mission and vision in the consumer's mind.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Name Selection" subtitle="Distinctiveness">
              <ContentDescription>Brand name selection requires finding a name that suggests benefits, is easy to pronounce, and is distinctive.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Sponsorship" subtitle="Brand Options">
              <ContentDescription>Brand sponsorship options include manufacturer brands, private brands, licensed brands, or co-branding.</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Concept: Packaging and Labeling */}
      <Slide>
        <Tag>The Concept</Tag>
        <Heading>Packaging and <Highlight>Labeling</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText>
              <strong>Packaging</strong> involves designing and producing the container or wrapper for a product.
            </ContentText>
            <AnimatedList>
              <ListItem>It serves multiple functions: protecting the product, attracting attention, and describing the product.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <ContentText>
              <strong>Labeling</strong> identifies the product, grades it, describes it, and promotes the product through attractive graphics.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* The Concept: The Nature of Services [quiz] */}
      <Slide quizData={quizBySlideId["the-concept-the-nature-of-services"]}>
        <Tag>The Concept</Tag>
        <Heading>The Nature of <Highlight>Services</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Services are a form of product that consists of activities, benefits, or satisfactions offered for sale.</ListItem>
              <ListItem>They are essentially intangible and do not result in the ownership of anything.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="primary" title="Market Context">
              The service economy is growing rapidly and dominates modern markets.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* The Challenge: Four Service Characteristics */}
      <Slide>
        <Tag>The Challenge</Tag>
        <Heading>Four Service <Highlight>Characteristics</Highlight></Heading>
        <div className="w-full h-[250px] sm:h-[300px] md:h-[340px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
          <FlowRenderer {...serviceCharacteristicsFlow} />
        </div>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Intangibility means services cannot be seen, tasted, felt, heard, or smelled before purchase.</ListItem>
              <ListItem>Inseparability means services cannot be separated from their providers.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Variability means the quality of services depends on who provides them and when, where, and how.</ListItem>
              <ListItem>Perishability means services cannot be stored for later sale or use.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Strategy: Marketing Services */}
      <Slide>
        <Tag>Strategy</Tag>
        <Heading>Marketing <Highlight>Services</Highlight></Heading>
        <AnimatedList>
          <ListItem>Service firms must manage the interaction between the customer and the frontline employee.</ListItem>
          <ListItem>Service profit chain links service firm profits with employee and customer satisfaction.</ListItem>
          <ListItem>Internal marketing means the firm must orient and motivate its customer-contact employees.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Overcoming Service Perishability */}
      <Slide>
        <Tag>Reflection</Tag>
        <Heading>Overcoming Service <Highlight>Perishability</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>An airline has 50 empty seats on a flight departing in 24 hours. Once the plane takes off, the revenue opportunity for those seats is gone forever.</ListItem>
              <ListItem>Offering deep last-minute discounts might fill the seats but could train customers to wait for cheap tickets in the future.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              How should the airline balance the immediate need to capture perishable revenue against long-term brand pricing power?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Conclusion: Product and Service Strategies */}
      <Slide>
        <Tag>Conclusion</Tag>
        <Heading>Product and Service <Highlight>Strategies</Highlight></Heading>
        <AnimatedList>
          <ListItem>The product is the foundation of the marketing mix and requires careful lifecycle management.</ListItem>
          <ListItem>Continuous new product development is essential for long-term growth and survival.</ListItem>
          <ListItem>Strong branding and effective packaging create lasting consumer connections.</ListItem>
          <ListItem>Services require distinct strategies to manage their intangibility, inseparability, variability, and perishability.</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}

