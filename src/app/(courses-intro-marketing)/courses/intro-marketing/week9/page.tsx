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
  Callout,
  CitationProvider,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { channelsAddValueFlow, vmsFlow } from "./flowcharts";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function Week9CoursePage() {
  return (
    <SlideDeck>
      {/* Title Slide */}
        <Slide>
          <Title>Supply Chain and Distribution Channels</Title>
          <Subtitle variant="hero">The Third P</Subtitle>
          <AnimatedList>
            <ListItem>Welcome to Week 9.</ListItem>
            <ListItem>Today we explore the Third P: Place.</ListItem>
            <ListItem>We will unpack how products move from production to consumption.</ListItem>
          </AnimatedList>
        </Slide>

        {/* Module 1: The Nature of Marketing Channels */}
        <Slide>
          <Tag>Module 1</Tag>
          <Heading>The Nature of <Highlight>Marketing Channels</Highlight></Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <ContentText layout="base">
                A marketing channel is a set of interdependent organizations.
              </ContentText>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>These organizations help make a product available for use or consumption.</ListItem>
                <ListItem>They bridge the gap between producers and users in terms of time, place, and possession.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* The Value Delivery Network */}
        <Slide quizData={quizBySlideId["the-value-delivery-network"]}>
          <Heading>The <Highlight>Value Delivery</Highlight> Network</Heading>
          <Row gap="medium">
            <Column spanRatio="1/2">
              <Card title="Ecosystem" subtitle="Network Scope">
                <ContentDescription>Marketing channels are part of a larger value delivery network.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>This network includes the company, suppliers, distributors, and customers.</ListItem>
                <ListItem>Everyone partners to improve the performance of the entire system.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* How Channels Add Value */}
        <Slide>
          <Heading>How Channels <Highlight>Add Value</Highlight></Heading>
          <Row gap="large" items="center">
            <Column spanRatio="1/2">
              <div className="w-full h-[300px] sm:h-[340px] md:h-[380px]">
                <FlowRenderer
                  aiGeneratedNodes={channelsAddValueFlow.aiGeneratedNodes}
                  aiGeneratedEdges={channelsAddValueFlow.aiGeneratedEdges}
                />
              </div>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>Intermediaries offer the firm more than it can achieve on its own.</ListItem>
                <ListItem>They provide contacts, experience, specialization, and scale of operation.</ListItem>
                <ListItem>They transform the assortments of products made by producers into the assortments wanted by consumers.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Key Functions of Intermediaries */}
        <Slide>
          <Heading>Key Functions of <Highlight>Intermediaries</Highlight></Heading>
          <Row gap="medium">
            <Column spanRatio="1/3">
              <Card title="Information" subtitle="Market Intelligence">
                <ContentDescription>Information gathering about consumers and competitors.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/3">
              <Card title="Promotion" subtitle="Communication">
                <ContentDescription>Promotion development and dissemination about an offer.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/3">
              <Card title="Matching" subtitle="Alignment">
                <ContentDescription>Contacting prospective buyers and matching offers to meet buyer needs.</ContentDescription>
              </Card>
            </Column>
          </Row>
        </Slide>

        {/* Additional Functions */}
        <Slide>
          <Heading><Highlight>Additional Functions</Highlight></Heading>
          <AnimatedList>
            <ListItem>Negotiating price and other terms so that ownership can be transferred.</ListItem>
            <ListItem>Physical distribution of goods.</ListItem>
            <ListItem>Financing the channel work and taking risks of carrying out the channel work.</ListItem>
          </AnimatedList>
        </Slide>

        {/* Channel Levels */}
        <Slide>
          <Heading>Channel <Highlight>Levels</Highlight></Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <Callout variant="primary" title="Definition">
                A channel level is a layer of intermediaries that performs some work in bringing the product closer to the final buyer.
              </Callout>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>The number of intermediary levels indicates the length of a channel.</ListItem>
                <ListItem>Direct marketing channels have no intermediary levels.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Indirect Marketing Channels */}
        <Slide quizData={quizBySlideId["indirect-marketing-channels"]}>
          <Heading>Indirect <Highlight>Marketing Channels</Highlight></Heading>
          <Row gap="medium">
            <Column spanRatio="1/3">
              <Card title="Structure" subtitle="Intermediaries">
                <ContentDescription>Indirect marketing channels contain one or more intermediary levels.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>Common levels include wholesalers, jobbers, and retailers.</ListItem>
                <ListItem>More levels mean less control and greater channel complexity for the producer.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Discussion: Direct vs. Indirect Channels */}
        <Slide>
          <Tag>Discussion</Tag>
          <Heading><Highlight>Direct vs. Indirect</Highlight> Channels</Heading>
          <DiscussionCard title="Group Discussion">
            If you were launching a new organic snack brand, would you sell directly through your website or pitch to a major grocery chain?
          </DiscussionCard>
        </Slide>

        {/* Module 2: Channel Behavior and Organization */}
        <Slide>
          <Tag>Module 2</Tag>
          <Heading>Channel Behavior and <Highlight>Organization</Highlight></Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <ContentText layout="base">
                Distribution channels are complex behavioral systems.
              </ContentText>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>People and companies interact to accomplish individual, company, and channel goals.</ListItem>
                <ListItem>Success depends on how well the channel members work together.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Channel Conflict */}
        <Slide quizData={quizBySlideId["channel-conflict"]}>
          <Heading>Channel <Highlight>Conflict</Highlight></Heading>
          <Subtitle variant="section">Channel conflict occurs when members disagree over goals, roles, and rewards.</Subtitle>
          <Row gap="medium">
            <Column spanRatio="1/2">
              <Card title="Horizontal Conflict" subtitle="Same Level">
                <ContentDescription>Horizontal conflict occurs among firms at the same level of the channel.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/2">
              <Card title="Vertical Conflict" subtitle="Different Levels">
                <ContentDescription>Vertical conflict occurs between different levels of the same channel.</ContentDescription>
              </Card>
            </Column>
          </Row>
        </Slide>

        {/* Conventional Distribution Systems */}
        <Slide>
          <Heading><Highlight>Conventional</Highlight> Distribution Systems</Heading>
          <AnimatedList>
            <ListItem>Consist of one or more independent producers, wholesalers, and retailers.</ListItem>
            <ListItem>Each is a separate business seeking to maximize its own profits.</ListItem>
            <ListItem>No channel member has much control over the other members.</ListItem>
          </AnimatedList>
        </Slide>

        {/* Vertical Marketing Systems (VMS) */}
        <Slide>
          <Heading><Highlight>Vertical</Highlight> Marketing Systems (VMS)</Heading>
          <Row gap="large" items="center">
            <Column spanRatio="1/2">
              <div className="w-full h-[300px] sm:h-[340px] md:h-[380px]">
                <FlowRenderer
                  aiGeneratedNodes={vmsFlow.aiGeneratedNodes}
                  aiGeneratedEdges={vmsFlow.aiGeneratedEdges}
                />
              </div>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>A VMS consists of producers, wholesalers, and retailers acting as a unified system.</ListItem>
                <ListItem>One channel member owns the others, has contracts with them, or wields so much power they all cooperate.</ListItem>
                <ListItem>Designed to achieve channel economies and maximum impact.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Types of Vertical Marketing Systems */}
        <Slide>
          <Heading>Types of <Highlight>Vertical Marketing Systems</Highlight></Heading>
          <Row gap="medium">
            <Column spanRatio="1/3">
              <Card title="Corporate VMS" subtitle="Single Ownership">
                <ContentDescription>Integrates successive stages of production and distribution under single ownership.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/3">
              <Card title="Contractual VMS" subtitle="Independent Firms">
                <ContentDescription>Consists of independent firms at different levels joining together through contracts.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/3">
              <Card title="Administered VMS" subtitle="Size and Power">
                <ContentDescription>Coordinates successive stages through the size and power of one of the parties.</ContentDescription>
              </Card>
            </Column>
          </Row>
        </Slide>

        {/* Multichannel Distribution Systems */}
        <Slide>
          <Heading><Highlight>Multichannel</Highlight> Distribution Systems</Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <Callout variant="primary" title="Definition">
                A single firm sets up two or more marketing channels to reach one or more customer segments.
              </Callout>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>Offers advantages for companies facing large and complex markets.</ListItem>
                <ListItem>Expands sales and market coverage but can be harder to control and generate conflict.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* The Trend of Disintermediation */}
        <Slide quizData={quizBySlideId["the-trend-of-disintermediation"]}>
          <Heading>The Trend of <Highlight>Disintermediation</Highlight></Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <ContentText layout="base">
                Disintermediation occurs when product and service producers cut out intermediaries.
              </ContentText>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>This includes going directly to final buyers or displacing traditional resellers with new types of intermediaries.</ListItem>
                <ListItem>Presents both opportunities and strategic threats to established firms.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Discussion: Surviving Disintermediation */}
        <Slide>
          <Tag>Discussion</Tag>
          <Heading>Surviving <Highlight>Disintermediation</Highlight></Heading>
          <DiscussionCard title="Group Discussion">
            As streaming services bypass traditional cable providers, how can cable companies adapt to remain relevant in the distribution channel?
          </DiscussionCard>
        </Slide>

        {/* Module 3: Retailing, Wholesaling, and Logistics */}
        <Slide>
          <Tag>Module 3</Tag>
          <Heading>Retailing, Wholesaling, and <Highlight>Logistics</Highlight></Heading>
          <Row gap="medium">
            <Column spanRatio="1/3">
              <Card title="Retailing" subtitle="Final Consumers">
                <ContentDescription>Includes all activities involved in selling goods directly to final consumers.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/3">
              <Card title="Wholesaling" subtitle="Business Use">
                <ContentDescription>Includes all activities involved in selling goods to those buying for resale or business use.</ContentDescription>
              </Card>
            </Column>
            <Column spanRatio="1/3">
              <Card title="Logistics" subtitle="Flow Management">
                <ContentDescription>Management ensures the efficient flow of materials and final goods.</ContentDescription>
              </Card>
            </Column>
          </Row>
        </Slide>

        {/* The Role of Retailing */}
        <Slide>
          <Heading>The Role of <Highlight>Retailing</Highlight></Heading>
          <AnimatedList>
            <ListItem>Retailers connect brands with consumers in the final steps of the distribution process.</ListItem>
            <ListItem>Shopper marketing focuses the entire marketing process on turning shoppers into buyers at the point of sale.</ListItem>
            <ListItem>Retailers must carefully define their target markets and positioning.</ListItem>
          </AnimatedList>
        </Slide>

        {/* The Value of Wholesaling */}
        <Slide>
          <Heading>The Value of <Highlight>Wholesaling</Highlight></Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <ContentText layout="base">
                Wholesalers add value by performing channel functions better or more cost effectively than producers.
              </ContentText>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>They help manufacturers reach many small customers at a low cost.</ListItem>
                <ListItem>They hold inventories, reducing inventory costs and risks to suppliers and customers.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Marketing Logistics */}
        <Slide>
          <Heading>Marketing <Highlight>Logistics</Highlight></Heading>
          <Subtitle variant="section">Marketing logistics involves planning, implementing, and controlling the physical flow of goods.</Subtitle>
          <Row gap="large">
            <Column spanRatio="1/2">
              <Callout variant="primary" title="Focus">
                Focuses on getting the right product to the right customer in the right place at the right time.
              </Callout>
            </Column>
            <Column spanRatio="1/2">
              <Callout variant="secondary" title="Scope">
                Involves inbound distribution, outbound distribution, and reverse distribution.
              </Callout>
            </Column>
          </Row>
        </Slide>

        {/* Supply Chain Management */}
        <Slide>
          <Heading><Highlight>Supply Chain</Highlight> Management</Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <ContentText layout="base">
                Managing upstream and downstream value-added flows of materials, final goods, and related information.
              </ContentText>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>Aims to maximize customer service while minimizing distribution costs.</ListItem>
                <ListItem>Major functions include warehousing, inventory management, transportation, and logistics information management.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Third-Party Logistics (3PL) */}
        <Slide>
          <Heading>Third-Party <Highlight>Logistics (3PL)</Highlight></Heading>
          <Row gap="large">
            <Column spanRatio="1/2">
              <Callout variant="primary" title="Outsourcing">
                Outsourcing logistics functions to third-party providers.
              </Callout>
            </Column>
            <Column spanRatio="1/2">
              <AnimatedList>
                <ListItem>3PL providers can help companies save money, improve service, and focus on core competencies.</ListItem>
                <ListItem>They understand increasingly complex logistics environments.</ListItem>
              </AnimatedList>
            </Column>
          </Row>
        </Slide>

        {/* Conclusion: Supply Chain and Distribution Channels */}
        <Slide>
          <Tag>Conclusion</Tag>
          <Heading>Supply Chain and <Highlight>Distribution Channels</Highlight></Heading>
          <AnimatedList>
            <ListItem>Distribution channels are the critical link between producers and final consumers.</ListItem>
            <ListItem>Choosing the right channel structure balances control, coverage, and cost.</ListItem>
            <ListItem>Effective channel management and logistics create sustainable competitive advantages.</ListItem>
          </AnimatedList>
        </Slide>

      </SlideDeck>
  );
}
