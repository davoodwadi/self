"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  ContentText,
  AnimatedList,
  ListItem,
  Card,
  ContentDescription,
  DiscussionCard,
  Tag,
  Highlight,
  Row,
  Column,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import { marketStructureFlow, buyingCenterFlow, kamProcessFlow } from "./flowcharts";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function IntroMarketingWeek4() {
  return (
    <SlideDeck
      background={<BackgroundManager type="marketing" />}
    >
      {/* Title Slide */}
      <Slide>
        <Title>Business-to-Business (B2B) Marketing</Title>
        <Subtitle variant="hero">Introduction to Marketing</Subtitle>
        <ContentText layout="base" className="text-center mt-8">Davood Wadi, PhD</ContentText>
        <AnimatedList className="mt-12 text-center max-w-2xl mx-auto">
          <ListItem>Welcome to Week 4 of Introduction to Marketing.</ListItem>
          <ListItem>Today we will explore Business-to-Business, or B2B, marketing.</ListItem>
          <ListItem>We will cover B2B market characteristics, buying centers, and relationship marketing.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 1: Characteristics of B2B Markets [no-quiz] */}
      <Slide>
        <Tag>Part 1</Tag>
        <Heading>Characteristics of B2B Markets</Heading>
        <AnimatedList>
          <ListItem>B2B marketing involves selling products and services to other organizations.</ListItem>
          <ListItem>These organizations use them to produce other goods, or for their own operations.</ListItem>
          <ListItem>The scale and complexity of B2B transactions differ significantly from B2C.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Market Structure and Demand [quiz] */}
      <Slide quizData={quizBySlideId["market-structure-and-demand"]}>
        <Heading>Market Structure and Demand</Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mb-6">
          <FlowRenderer {...marketStructureFlow} />
        </div>
        <AnimatedList>
          <ListItem>B2B markets typically have fewer, but much larger, buyers than B2C markets.</ListItem>
          <ListItem>Demand in B2B markets is <Highlight>derived demand</Highlight>, meaning it comes from consumer demand.</ListItem>
          <ListItem>B2B demand is also more inelastic and fluctuates more rapidly than consumer demand.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Nature of the Buying Unit */}
      <Slide>
        <Heading>Nature of the Buying Unit</Heading>
        <AnimatedList>
          <ListItem>A B2B purchase involves more decision participants.</ListItem>
          <ListItem>B2B buying involves a more professional and formalized purchasing effort.</ListItem>
          <ListItem>Buyers and sellers work more closely together and build long term relationships.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Types of Decisions and the Decision Process [quiz] */}
      <Slide quizData={quizBySlideId["types-of-decisions-and-the-decision-process"]}>
        <Heading>Types of Decisions and the Decision Process</Heading>
        <AnimatedList>
          <ListItem>B2B buyers face more complex purchasing decisions.</ListItem>
          <ListItem>The B2B buying process is highly formalized.</ListItem>
          <ListItem>Buyers and sellers are highly dependent on each other in B2B markets.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Derived Demand */}
      <Slide>
        <Heading>Derived Demand</Heading>
        <DiscussionCard title="Group Discussion">
          If consumer demand for electric vehicles drops, how does this derived demand cascade through the B2B supply chain to affect battery manufacturers and raw material suppliers?
        </DiscussionCard>
      </Slide>

      {/* Part 2: The Organizational Buying Center [no-quiz] */}
      <Slide>
        <Tag>Part 2</Tag>
        <Heading>The Organizational Buying Center</Heading>
        <AnimatedList>
          <ListItem>The buying center is the decision-making unit of a buying organization.</ListItem>
          <ListItem>It consists of all the individuals and units that play a role in the purchase decision.</ListItem>
          <ListItem>It is not a fixed or formal department, but a set of buying roles.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Roles in the Buying Center [quiz] */}
      <Slide quizData={quizBySlideId["roles-in-the-buying-center"]}>
        <Heading>Roles in the Buying Center</Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mb-6">
          <FlowRenderer {...buyingCenterFlow} />
        </div>
        <AnimatedList>
          <ListItem><Highlight>Users</Highlight> are members of the organization who will actually use the product.</ListItem>
          <ListItem><Highlight>Influencers</Highlight> affect the buying decision by providing information or specifications.</ListItem>
          <ListItem><Highlight>Buyers</Highlight> have formal authority to select the supplier and arrange terms.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Deciders and Gatekeepers */}
      <Slide>
        <Heading>Deciders and Gatekeepers</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Deciders">
              <ContentDescription>
                Have formal or informal power to select or approve the final suppliers.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Gatekeepers">
              <ContentDescription>
                Control the flow of information to others.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <AnimatedList className="mt-8">
          <ListItem>A single person can play multiple roles, or multiple people can play the same role.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Types of Buying Situations [quiz] */}
      <Slide quizData={quizBySlideId["types-of-buying-situations"]}>
        <Heading>Types of Buying Situations</Heading>
        <AnimatedList>
          <ListItem>A <Highlight>straight rebuy</Highlight> is a routine purchase where the buyer reorders without modifications.</ListItem>
          <ListItem>A <Highlight>modified rebuy</Highlight> is a situation where the buyer wants to modify product specifications, prices, or suppliers.</ListItem>
          <ListItem>A <Highlight>new task</Highlight> is a situation where the buyer purchases a product or service for the first time.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Buying Center Dynamics */}
      <Slide>
        <Heading>Buying Center Dynamics</Heading>
        <DiscussionCard title="Class Discussion">
          In a &apos;new task&apos; buying situation for an enterprise software system, which buying center role do you think wields the most actual power, and why?
        </DiscussionCard>
      </Slide>

      {/* Part 3: Relationship Marketing and Key Account Management [no-quiz] */}
      <Slide>
        <Tag>Part 3</Tag>
        <Heading>Relationship Marketing and Key Account Management</Heading>
        <AnimatedList>
          <ListItem>B2B marketing relies heavily on building and maintaining strong relationships.</ListItem>
          <ListItem>Transactions are often just the beginning of a long term partnership.</ListItem>
          <ListItem><Highlight>Trust and mutual benefit</Highlight> are the foundation of B2B success.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Relationship Marketing Focus */}
      <Slide>
        <Heading>Relationship Marketing Focus</Heading>
        <AnimatedList>
          <ListItem>The focus shifts from single transactions to customer lifetime value.</ListItem>
          <ListItem>Marketers aim to become strategic partners with their business customers.</ListItem>
          <ListItem>This requires deep understanding of the customer&apos;s business and industry.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Key Account Management (KAM) [quiz] */}
      <Slide quizData={quizBySlideId["key-account-management-kam"]}>
        <Heading>Key Account Management (KAM)</Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mb-6">
          <FlowRenderer {...kamProcessFlow} />
        </div>
        <AnimatedList>
          <ListItem><Highlight>Key Account Management</Highlight> is the process of building long term relationships with the company&apos;s most valuable customers.</ListItem>
          <ListItem>Key accounts contribute disproportionately to the company&apos;s revenue and profit.</ListItem>
          <ListItem>KAM involves dedicated teams providing customized solutions and exceptional service.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Benefits of Strong B2B Relationships */}
      <Slide>
        <Heading>Benefits of Strong B2B Relationships</Heading>
        <AnimatedList>
          <ListItem>Strong relationships lead to higher customer retention and loyalty.</ListItem>
          <ListItem>They create barriers to entry for competitors.</ListItem>
          <ListItem>Collaborative relationships often result in joint innovation and cost reductions.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Strategic Partnerships */}
      <Slide>
        <Heading>Strategic Partnerships</Heading>
        <DiscussionCard title="Group Discussion">
          What are the potential risks for a supplier if they become too dependent on a single key account, and how can they mitigate these risks?
        </DiscussionCard>
      </Slide>

      {/* Conclusion: B2B Marketing */}
      <Slide>
        <Heading>Conclusion: B2B Marketing</Heading>
        <AnimatedList>
          <ListItem>B2B marketing is characterized by complex decisions, derived demand, and multiple stakeholders.</ListItem>
          <ListItem>Understanding the buying center is crucial for targeting the right individuals.</ListItem>
          <ListItem>Long term relationship building and Key Account Management are essential for sustained B2B success.</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}
