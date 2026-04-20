"use client";

import React from "react";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { consumerDecisionFlow, buyingInfluencesFlow, buyingCenterFlow } from "./flowcharts";
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
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function IntroMarketingWeek3() {
  return (
    <SlideDeck
      background={<BackgroundManager type="marketing" />}
    >
      {/* Title Slide */}
      <Slide>
        <Title>Consumer Behavior</Title>
        <Subtitle variant="hero">Introduction to Marketing</Subtitle>
        <ContentText layout="base" className="text-center mt-8">Davood Wadi, PhD</ContentText>
        <AnimatedList className="mt-12 text-center max-w-2xl mx-auto">
          <ListItem>Welcome to Week 3 of Introduction to Marketing.</ListItem>
          <ListItem>Today we will explore Consumer Behavior.</ListItem>
          <ListItem>We will cover the consumer decision-making process, influences on buying behavior, and B2B vs B2C purchasing.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 1: The Consumer Decision-Making Process [no-quiz] */}
      <Slide>
        <Tag>Part 1</Tag>
        <Heading>The Consumer Decision-Making Process</Heading>
        <AnimatedList>
          <ListItem><Highlight>Consumer buyer behavior</Highlight> refers to the buying behavior of final consumers.</ListItem>
          <ListItem>The consumer market consists of all the individuals and households that buy or acquire goods and services for personal consumption.</ListItem>
          <ListItem>Understanding this process is key to predicting how consumers will respond to marketing strategies.</ListItem>
        </AnimatedList>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mt-8">
          <FlowRenderer {...consumerDecisionFlow} />
        </div>
      </Slide>

      {/* Step 1: Need Recognition [quiz] */}
      <Slide quizData={quizBySlideId["step-1-need-recognition"]}>
        <Tag>Step 1</Tag>
        <Heading>Need Recognition</Heading>
        <AnimatedList>
          <ListItem>The buying process starts with <Highlight>need recognition</Highlight>.</ListItem>
          <ListItem>The buyer recognizes a problem or need triggered by internal or external stimuli.</ListItem>
          <ListItem>Marketers must research to find out what kinds of needs or problems arise, what brought them about, and how they led the consumer to a particular product.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Step 2: Information Search [quiz] */}
      <Slide quizData={quizBySlideId["step-2-information-search"]}>
        <Tag>Step 2</Tag>
        <Heading>Information Search</Heading>
        <AnimatedList>
          <ListItem>Once a need is triggered, consumers may or may not search for more information.</ListItem>
          <ListItem>Information sources include personal sources, commercial sources, public sources, and experiential sources.</ListItem>
          <ListItem>The <Highlight>most effective sources tend to be personal</Highlight>, as they legitimize or evaluate products for the buyer.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Step 3: Evaluation of Alternatives */}
      <Slide>
        <Tag>Step 3</Tag>
        <Heading>Evaluation of Alternatives</Heading>
        <AnimatedList>
          <ListItem>Consumers use information to evaluate alternative brands in the choice set.</ListItem>
          <ListItem>The process varies significantly depending on the individual consumer and the specific buying situation.</ListItem>
          <ListItem>Marketers should study buyers to find out how they actually evaluate brand alternatives.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Step 4: Purchase Decision */}
      <Slide>
        <Tag>Step 4</Tag>
        <Heading>Purchase Decision</Heading>
        <AnimatedList>
          <ListItem>In the evaluation stage, the consumer ranks brands and forms purchase intentions.</ListItem>
          <ListItem>Generally, the consumer&apos;s purchase decision will be to buy the most preferred brand.</ListItem>
          <ListItem>However, attitudes of others and unexpected situational factors can come between the purchase intention and the purchase decision.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Step 5: Postpurchase Behavior [quiz] */}
      <Slide quizData={quizBySlideId["step-5-postpurchase-behavior"]}>
        <Tag>Step 5</Tag>
        <Heading>Postpurchase Behavior</Heading>
        <AnimatedList>
          <ListItem>The marketer&apos;s job does not end when the product is bought.</ListItem>
          <ListItem>Postpurchase behavior focuses on whether the consumer is satisfied or dissatisfied with the purchase.</ListItem>
          <ListItem><Highlight>Cognitive dissonance</Highlight>, or buyer discomfort caused by postpurchase conflict, is a common occurrence.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Postpurchase Dissonance */}
      <Slide>
        <Heading>Postpurchase Dissonance</Heading>
        <DiscussionCard title="Group Discussion">
          Think about a time you experienced &quot;buyer&apos;s remorse&quot; after a major purchase. How could the brand have communicated with you to reduce that cognitive dissonance?
        </DiscussionCard>
      </Slide>

      {/* Part 2: Influences on Buying Behavior [no-quiz] */}
      <Slide>
        <Tag>Part 2</Tag>
        <Heading>Influences on Buying Behavior</Heading>
        <AnimatedList>
          <ListItem>Consumer purchases are influenced strongly by cultural, social, personal, and psychological characteristics.</ListItem>
          <ListItem>Marketers cannot control such factors, but they must take them into account.</ListItem>
          <ListItem>These factors help us understand why consumers act the way they do.</ListItem>
        </AnimatedList>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mt-8">
          <FlowRenderer {...buyingInfluencesFlow} />
        </div>
      </Slide>

      {/* Cultural Factors */}
      <Slide>
        <Heading>Cultural Factors</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Culture">
              <ContentDescription>
                The most basic cause of a person&apos;s wants and behavior. It includes basic values, perceptions, wants, and behaviors learned from society.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Subcultures">
              <ContentDescription>
                Groups of people with shared value systems based on common life experiences and situations.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Social Factors */}
      <Slide>
        <Heading>Social Factors</Heading>
        <AnimatedList>
          <ListItem>A consumer&apos;s behavior is influenced by social factors such as small groups, social networks, family, and social roles.</ListItem>
          <ListItem><Highlight>Reference groups</Highlight> serve as direct or indirect points of comparison or reference in forming a person&apos;s attitudes or behavior.</ListItem>
          <ListItem>Word-of-mouth influence and influencer marketing play a massive role here.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Psychological Factors [quiz] */}
      <Slide quizData={quizBySlideId["psychological-factors"]}>
        <Heading>Psychological Factors</Heading>
        <AnimatedList>
          <ListItem>A person&apos;s buying choices are further influenced by four major psychological factors.</ListItem>
          <ListItem>These are <Highlight>motivation, perception, learning, and beliefs and attitudes</Highlight>.</ListItem>
          <ListItem>Perception is the process by which people select, organize, and interpret information to form a meaningful picture of the world.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Social Influence */}
      <Slide>
        <Heading>Social Influence</Heading>
        <DiscussionCard title="Class Discussion">
          How has a specific social media influencer affected your perception of a brand, and do you think their influence was based more on their expertise or their lifestyle?
        </DiscussionCard>
      </Slide>

      {/* Part 3: B2C vs B2B Purchasing [no-quiz] */}
      <Slide>
        <Tag>Part 3</Tag>
        <Heading>B2C vs B2B Purchasing</Heading>
        <AnimatedList>
          <ListItem>While B2C (Business-to-Consumer) marketing focuses on the final consumer, <Highlight>B2B (Business-to-Business)</Highlight> focuses on organizations.</ListItem>
          <ListItem>Business buyer behavior refers to the buying behavior of organizations that buy goods and services for use in the production of other products.</ListItem>
          <ListItem>The business market is huge and differs from the consumer market in several key ways.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Market Structure and Demand [quiz] */}
      <Slide quizData={quizBySlideId["market-structure-and-demand"]}>
        <Heading>Market Structure and Demand</Heading>
        <AnimatedList>
          <ListItem>The business marketer normally deals with far fewer but far larger buyers than the consumer marketer does.</ListItem>
          <ListItem>Business demand is <Highlight>derived demand</Highlight>; it ultimately derives from the demand for consumer goods.</ListItem>
          <ListItem>B2B demand is also more inelastic and fluctuating compared to B2C.</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Buying Center [quiz] */}
      <Slide quizData={quizBySlideId["the-buying-center"]}>
        <Heading>The Buying Center</Heading>
        <AnimatedList>
          <ListItem>B2B purchases are rarely made by a single individual.</ListItem>
          <ListItem>The <Highlight>buying center</Highlight> consists of all the individuals and units that play a role in the purchase decision-making process.</ListItem>
          <ListItem>It includes users, influencers, buyers, deciders, and gatekeepers.</ListItem>
        </AnimatedList>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mt-8">
          <FlowRenderer {...buyingCenterFlow} />
        </div>
      </Slide>

      {/* The Nature of the Buying Unit */}
      <Slide>
        <Heading>The Nature of the Buying Unit</Heading>
        <AnimatedList>
          <ListItem>Compared with consumer purchases, a business purchase usually involves more decision participants and a more professional purchasing effort.</ListItem>
          <ListItem>Business buying is done by trained purchasing agents who spend their professional lives learning how to buy better.</ListItem>
          <ListItem>Therefore, B2B marketers must have well-trained salespeople to deal with well-trained buyers.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: B2B Complexity */}
      <Slide>
        <Heading>B2B Complexity</Heading>
        <DiscussionCard title="Group Discussion">
          Why might a B2B software company need to create entirely different marketing materials for the &quot;user&quot; (e.g., an IT employee) versus the &quot;decider&quot; (e.g., the CFO) within the same buying center?
        </DiscussionCard>
      </Slide>

      {/* Conclusion: Consumer Behavior */}
      <Slide>
        <Tag>Conclusion</Tag>
        <Heading>Consumer Behavior</Heading>
        <AnimatedList>
          <ListItem>Understanding the consumer decision-making process is foundational to effective marketing.</ListItem>
          <ListItem>Cultural, social, and psychological factors continuously shape consumer preferences.</ListItem>
          <ListItem>While B2B and B2C markets share some similarities, B2B purchasing is generally more complex, professional, and relationship-driven.</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}