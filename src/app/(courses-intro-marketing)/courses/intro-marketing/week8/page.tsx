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
  AnimatedList,
  ListItem,
  Callout,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { pricingApproachesFlow, newProductPricingFlow } from "./flowcharts";
import quizzesData from "./quizzes.json";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function Week8Page() {
  return (
    <SlideDeck>
      {/* 1. Title Slide */}
      <Slide>
        <Title>Pricing Strategies</Title>
        <Subtitle variant="hero">The Second P</Subtitle>
        <AnimatedList>
          <ListItem>Welcome to Week 8 of Introduction to Marketing.</ListItem>
          <ListItem>Today we explore the second P of the marketing mix, Price.</ListItem>
          <ListItem>We will examine how price affects the bottom line and customer perception.</ListItem>
        </AnimatedList>
      </Slide>

      {/* 2. The Paradigm of Price [quiz] */}
      <Slide quizData={quizBySlideId["the-paradigm-of-price"]}>
        <Heading>The <Highlight>Paradigm</Highlight> of Price</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Revenue Generator">
              Price is the only element in the marketing mix that produces revenue.
            </Callout>
            <ContentText>All other elements represent costs to the organization.</ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Price is highly flexible and can be changed quickly compared to product features or channel commitments.</ListItem>
              <ListItem>It is a critical determinant of buyer choice and market share.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 3. Part 1: Factors Affecting Pricing Decisions [no-quiz] */}
      <Slide>
        <Tag>Part 1</Tag>
        <Heading>Factors Affecting <Highlight>Pricing Decisions</Highlight></Heading>
        <ContentText layout="prose">Setting the right price requires balancing internal capabilities and external realities.</ContentText>
        <Row gap="medium">
          <Column spanRatio="1/2">
            <Card title="Internal Factors" subtitle="Inside the Organization">
              <ContentDescription>Internal factors include marketing objectives and costs.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="External Factors" subtitle="Outside the Organization">
              <ContentDescription>External factors encompass market demand and competitor behavior.</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 4. Internal Factors: Marketing Objectives */}
      <Slide>
        <Heading>Internal Factors: <Highlight>Marketing Objectives</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/3">
            <ContentText>Pricing strategies must align with broader company goals.</ContentText>
            <Callout variant="secondary" title="The Guide">A clear objective guides the initial pricing range.</Callout>
          </Column>
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Objectives may include survival or current profit maximization.</ListItem>
              <ListItem>Other goals focus on market share leadership or product quality leadership.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 5. Internal Factors: Costs */}
      <Slide>
        <Heading>Internal Factors: <Highlight>Costs</Highlight></Heading>
        <Subtitle variant="section">Costs set the absolute floor for the price that the company can charge.</Subtitle>
        <Row gap="medium">
          <Column spanRatio="1/3">
            <Card title="Fixed Costs" subtitle="Constant overhead">
              <ContentDescription>Fixed costs do not vary with production or sales level.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Variable Costs" subtitle="Volume dependent">
              <ContentDescription>Variable costs vary directly with the level of production.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Total Costs" subtitle="The baseline">
              <ContentDescription>Total costs must be covered to achieve long-term viability.</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 6. External Factors: The Market and Demand [quiz] */}
      <Slide quizData={quizBySlideId["external-factors-the-market-and-demand"]}>
        <Heading>External Factors: The Market and <Highlight>Demand</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="prose">While costs set the lower limit, the market sets the upper limit.</ContentText>
            <ContentText layout="prose">Understanding the relationship between price and demand is crucial.</ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Competitive Conditions">
              Different markets exhibit different competitive conditions.
            </Callout>
            <AnimatedList>
              <ListItem>Pricing freedom varies across pure competition, monopolistic competition, oligopoly, and pure monopoly.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 7. External Factors: Price Elasticity */}
      <Slide>
        <Heading>External Factors: <Highlight>Price Elasticity</Highlight></Heading>
        <Subtitle variant="section">Price elasticity measures how responsive demand will be to a change in price.</Subtitle>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="Inelastic Demand" subtitle="Low responsiveness">
              <ContentDescription>Inelastic demand means demand hardly changes with a small change in price.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Elastic Demand" subtitle="High responsiveness">
              <ContentDescription>Elastic demand means demand changes greatly in response to price changes.</ContentDescription>
            </Card>
          </Column>
        </Row>
        <div className="mt-8">
          <ContentText layout="prose">Companies must understand elasticity to forecast revenues accurately.</ContentText>
        </div>
      </Slide>

      {/* 8. Part 2: Core Pricing Approaches [no-quiz] */}
      <Slide>
        <Tag>Part 2</Tag>
        <Heading>Core Pricing <Highlight>Approaches</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Once factors are understood, marketers must select a pricing approach.</ListItem>
              <ListItem>Three major pricing strategies dominate the market.</ListItem>
              <ListItem>They are customer value-based pricing, cost-based pricing, and competition-based pricing.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] rounded-2xl border border-[var(--crimson)]/15 bg-white/80 flex items-center justify-center overflow-hidden">
              <FlowRenderer
                aiGeneratedNodes={pricingApproachesFlow.aiGeneratedNodes}
                aiGeneratedEdges={pricingApproachesFlow.aiGeneratedEdges}
              />
            </div>
          </Column>
        </Row>
      </Slide>

      {/* 9. Customer Value-Based Pricing [quiz] */}
      <Slide quizData={quizBySlideId["customer-value-based-pricing"]}>
        <Heading>Customer <Highlight>Value-Based</Highlight> Pricing</Heading>
        <Row gap="large" items="start">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>This approach uses buyers&apos; perceptions of value as the key to pricing.</ListItem>
              <ListItem>Price is considered along with all other marketing mix variables before the marketing program is set.</ListItem>
              <ListItem>The company assesses customer needs and value perceptions first.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="secondary" title="Paradigm Shift">
              It is the reverse of the cost-based approach.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 10. Good-Value Pricing vs. Value-Added Pricing */}
      <Slide>
        <Heading>Good-Value Pricing vs. <Highlight>Value-Added</Highlight> Pricing</Heading>
        <Row gap="large" items="stretch">
          <Column spanRatio="1/2">
            <Card title="Good-Value Pricing" subtitle="The Fair Trade">
              <ContentDescription>
                Good-value pricing offers the right combination of quality and good service at a fair price. It often involves introducing less expensive versions of established brand-name products.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Value-Added Pricing" subtitle="The Premium Lift">
              <ContentDescription>
                Value-added pricing attaches value-added features to differentiate offers. This allows companies to charge higher prices rather than cutting prices to match competitors.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 11. Cost-Based Pricing */}
      <Slide>
        <Heading><Highlight>Cost-Based</Highlight> Pricing</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="prose">Involves setting prices based on the costs of producing, distributing, and selling the product.</ContentText>
            <ContentText layout="prose">It includes a fair rate of return for effort and risk.</ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Types include cost-plus pricing and break-even pricing.</ListItem>
              <ListItem>While simple, it ignores demand and competitors&apos; prices.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 12. Competition-Based Pricing [quiz] */}
      <Slide quizData={quizBySlideId["competition-based-pricing"]}>
        <Heading><Highlight>Competition-Based</Highlight> Pricing</Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Prices are set based on competitors&apos; strategies, prices, costs, and market offerings.</ListItem>
              <ListItem>Consumers will base their judgments of a product&apos;s value on the prices that competitors charge.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Comparative Value">
              The company must assess how its offer compares to competitors in terms of customer value. If the offer provides greater value, a higher price can be justified.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 13. Discussion: Pricing Approaches */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>Pricing <Highlight>Approaches</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              A new streaming platform enters a crowded market dominated by established giants with a unique recommendation algorithm but a smaller content library.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Should the company use cost-based, value-based, or competition-based pricing?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 14. Part 3: Pricing Strategies for New Products [no-quiz] */}
      <Slide>
        <Tag>Part 3</Tag>
        <Heading>Pricing Strategies for <Highlight>New Products</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Introducing a new product brings unique pricing challenges.</ListItem>
              <ListItem>Pricing must be dynamic and adapt as the product passes through its life cycle.</ListItem>
              <ListItem>The two primary strategies are market-skimming pricing and market-penetration pricing.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] rounded-2xl border border-[var(--crimson)]/15 bg-white/80 flex items-center justify-center overflow-hidden p-4">
              <FlowRenderer
                aiGeneratedNodes={newProductPricingFlow.aiGeneratedNodes}
                aiGeneratedEdges={newProductPricingFlow.aiGeneratedEdges}
              />
            </div>
          </Column>
        </Row>
      </Slide>

      {/* 15. Market-Skimming Pricing [quiz] */}
      <Slide quizData={quizBySlideId["market-skimming-pricing"]}>
        <Heading>Market-<Highlight>Skimming</Highlight> Pricing</Heading>
        <Subtitle variant="section">Setting a high price for a new product to skim maximum revenues layer by layer.</Subtitle>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="The Mechanism" subtitle="Profit vs. Volume">
              <ContentDescription>The company makes fewer but more profitable sales.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Product quality and image must support the high price.</ListItem>
              <ListItem>Competitors should not be able to easily enter the market and undercut the high price.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 16. Market-Penetration Pricing */}
      <Slide>
        <Heading>Market-<Highlight>Penetration</Highlight> Pricing</Heading>
        <Subtitle variant="section">Setting a low initial price in order to penetrate the market quickly and deeply.</Subtitle>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Callout variant="primary" title="The Objective">
              The goal is to attract a large number of buyers quickly and win a large market share.
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The market must be highly price-sensitive.</ListItem>
              <ListItem>Production and distribution costs must decrease as sales volume increases.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 17. Pricing Strategies for Product Mixes [no-quiz] */}
      <Slide>
        <Heading>Pricing Strategies for <Highlight>Product Mixes</Highlight></Heading>
        <Row gap="large" items="start">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>The strategy changes when the product is part of a product mix.</ListItem>
              <ListItem>The firm looks for a set of prices that maximizes its profits on the total mix.</ListItem>
              <ListItem>Pricing is difficult because the various products have related demand and costs.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="secondary" title="Key Approaches">
              Common strategies include product line pricing and captive-product pricing.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 18. Product Line and Optional-Product Pricing */}
      <Slide>
        <Heading>Product Line and <Highlight>Optional</Highlight> Pricing</Heading>
        <Row gap="large" items="stretch">
          <Column spanRatio="1/2">
            <Card title="Product Line Pricing" subtitle="Stepped Value">
              <ContentDescription>
                Product line pricing determines the price steps between various products in a line. It is based on cost differences, customer evaluations of features, and competitors&apos; prices.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Optional-Product Pricing" subtitle="Base + Accessory">
              <ContentDescription>
                Optional-product pricing is the pricing of optional or accessory products along with a main product. Companies must decide which items to include in the base price and which to offer as options.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 19. Captive-Product Pricing [quiz] */}
      <Slide quizData={quizBySlideId["captive-product-pricing"]}>
        <Heading><Highlight>Captive-Product</Highlight> Pricing</Heading>
        <Subtitle variant="section">Setting a price for products that must be used along with a main product.</Subtitle>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Examples include blades for a razor and games for a video game console.</ListItem>
              <ListItem>The main product is often priced low, with high markups on the captive supplies.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Revenue Model">
              This strategy ensures ongoing revenue streams from the initial purchase.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 20. Product Bundle Pricing */}
      <Slide>
        <Heading>Product <Highlight>Bundle</Highlight> Pricing</Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <ContentText layout="prose">Combining several products and offering the bundle at a reduced price.</ContentText>
            <ContentText layout="prose">This can promote the sales of products consumers might not otherwise buy.</ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The combined price must be low enough to get them to buy the bundle.</ListItem>
              <ListItem>It helps clear out excess inventory while providing value.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 21. Discussion: Product Mix Pricing */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>Product Mix <Highlight>Pricing</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              A premium coffee machine manufacturer introduces a new model that requires proprietary coffee pods that only fit this specific machine.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Should they price the machine low to sell more pods or price the machine high to maintain a premium brand image?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 22. Conclusion: Pricing Strategies */}
      <Slide>
        <Heading>Conclusion: <Highlight>Pricing Strategies</Highlight></Heading>
        <AnimatedList>
          <ListItem>Pricing is the only revenue-generating element of the marketing mix.</ListItem>
          <ListItem>Decisions must align internal costs and objectives with external market realities.</ListItem>
          <ListItem>Whether cost-based, value-based, or competition-based, the strategy must reflect customer perceptions.</ListItem>
          <ListItem>Effective product mix and new product pricing ensures long-term profitability and market positioning.</ListItem>
        </AnimatedList>
      </Slide>

    </SlideDeck>
  );
}
