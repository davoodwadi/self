"use client";

import React from "react";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { stpProcessFlow, segmentationBasesFlow } from "./flowcharts";
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

export default function IntroMarketingWeek6() {
  return (
    <SlideDeck
      background={<BackgroundManager type="marketing" />}
    >
      {/* Title Slide */}
      <Slide>
        <Title>Segmentation, Targeting, and Positioning (STP)</Title>
        <Subtitle variant="hero">Introduction to Marketing</Subtitle>
        <ContentText layout="base" className="text-center mt-8">Davood Wadi, PhD</ContentText>
        <AnimatedList className="mt-12 text-center max-w-2xl mx-auto">
          <ListItem>Welcome to Week 6 of Introduction to Marketing.</ListItem>
          <ListItem>Today we will explore Segmentation, Targeting, and Positioning (STP).</ListItem>
          <ListItem>We will cover the bases for segmenting markets, evaluating and selecting target markets, and developing a compelling positioning strategy.</ListItem>
        </AnimatedList>
        <div className="w-full h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mt-8 mx-auto max-w-4xl">
          <FlowRenderer {...stpProcessFlow} />
        </div>
      </Slide>

      {/* Part 1: Market Segmentation [no-quiz] */}
      <Slide>
        <Tag>Part 1</Tag>
        <Heading>Market Segmentation</Heading>
        <AnimatedList>
          <ListItem><Highlight>Market segmentation</Highlight> involves dividing a market into distinct groups of buyers who have different needs, characteristics, or behaviors.</ListItem>
          <ListItem>These distinct groups might require separate products or marketing programs.</ListItem>
          <ListItem>The goal is to identify segments that are measurable, accessible, substantial, differentiable, and actionable.</ListItem>
        </AnimatedList>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mt-8">
          <FlowRenderer {...segmentationBasesFlow} />
        </div>
      </Slide>

      {/* Geographic and Demographic Segmentation [quiz] */}
      <Slide quizData={quizBySlideId["geographic-and-demographic-segmentation"]}>
        <Heading>Geographic and Demographic Segmentation</Heading>
        <AnimatedList>
          <ListItem><Highlight>Geographic segmentation</Highlight> divides the market into different geographical units, such as nations, states, regions, counties, cities, or even neighborhoods.</ListItem>
          <ListItem><Highlight>Demographic segmentation</Highlight> divides the market into segments based on variables such as age, life-cycle stage, gender, income, occupation, education, religion, ethnicity, and generation.</ListItem>
          <ListItem>Demographic variables are the most popular bases for segmenting customer groups because they are easier to measure.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Psychographic Segmentation */}
      <Slide>
        <Heading>Psychographic Segmentation</Heading>
        <AnimatedList>
          <ListItem><Highlight>Psychographic segmentation</Highlight> divides buyers into different segments based on lifestyle or personality characteristics.</ListItem>
          <ListItem>People in the same demographic group can have very different psychographic characteristics.</ListItem>
          <ListItem>Marketers often use personality variables to segment markets, offering products that align with consumer lifestyles.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Behavioral Segmentation [quiz] */}
      <Slide quizData={quizBySlideId["behavioral-segmentation"]}>
        <Heading>Behavioral Segmentation</Heading>
        <AnimatedList>
          <ListItem><Highlight>Behavioral segmentation</Highlight> divides buyers into segments based on their knowledge, attitudes, uses, or responses to a product.</ListItem>
          <ListItem>Variables include occasions, benefits sought, user status, usage rate, and loyalty status.</ListItem>
          <ListItem>Benefit segmentation requires finding the major benefits people look for in a product class, the kinds of people who look for each benefit, and the major brands that deliver each benefit.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Segmenting Business Markets */}
      <Slide>
        <Heading>Segmenting Business Markets</Heading>
        <AnimatedList>
          <ListItem>Consumer and business marketers use many of the same variables to segment their markets.</ListItem>
          <ListItem>Business buyers can be segmented geographically, demographically, or by benefits sought, user status, usage rate, and loyalty status.</ListItem>
          <ListItem>However, business marketers also use additional variables, such as customer operating characteristics, purchasing approaches, situational factors, and personal characteristics.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Segmentation Variables */}
      <Slide>
        <Heading>Segmentation Variables</Heading>
        <DiscussionCard title="Group Discussion">
          Think of a brand of athletic shoes. How might they use a combination of demographic, psychographic, and behavioral segmentation to target a specific consumer group?
        </DiscussionCard>
      </Slide>

      {/* Part 2: Market Targeting [no-quiz] */}
      <Slide>
        <Tag>Part 2</Tag>
        <Heading>Market Targeting</Heading>
        <AnimatedList>
          <ListItem><Highlight>Market targeting</Highlight> involves evaluating each market segment&apos;s attractiveness and selecting one or more segments to enter.</ListItem>
          <ListItem>A company should target segments in which it can profitably generate the greatest customer value and sustain it over time.</ListItem>
          <ListItem>The target market consists of a set of buyers who share common needs or characteristics that the company decides to serve.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Evaluating Market Segments [quiz] */}
      <Slide quizData={quizBySlideId["evaluating-market-segments"]}>
        <Heading>Evaluating Market Segments</Heading>
        <AnimatedList>
          <ListItem>In evaluating different market segments, a firm must look at three factors: segment size and growth, segment structural attractiveness, and company objectives and resources.</ListItem>
          <ListItem>A segment is less attractive if it already contains many strong and aggressive competitors or if it is easy for new entrants to come into the segment.</ListItem>
          <ListItem>The company must also consider whether it has the skills and resources needed to succeed in that segment.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Selecting Target Market Segments */}
      <Slide>
        <Heading>Selecting Target Market Segments</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Undifferentiated (Mass)">
              <ContentDescription>
                Focuses on what is common in the needs of consumers rather than on what is different.
              </ContentDescription>
            </Card>
            <Card title="Differentiated (Segmented)" className="mt-4">
              <ContentDescription>
                Targets several market segments and designs separate offers for each.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Concentrated (Niche)">
              <ContentDescription>
                Focuses on acquiring a large share of one or a few smaller segments or niches.
              </ContentDescription>
            </Card>
            <Card title="Micromarketing" className="mt-4">
              <ContentDescription>
                Tailoring products and marketing programs to suit the tastes of specific individuals and local segments.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Discussion: Targeting Strategy */}
      <Slide>
        <Heading>Targeting Strategy</Heading>
        <DiscussionCard title="Class Discussion">
          A startup creates a new line of premium, organic, plant-based protein powder. Should they use differentiated marketing or concentrated marketing? Why?
        </DiscussionCard>
      </Slide>

      {/* Part 3: Differentiation and Positioning [no-quiz] */}
      <Slide>
        <Tag>Part 3</Tag>
        <Heading>Differentiation and Positioning</Heading>
        <AnimatedList>
          <ListItem>Beyond deciding which segments to target, the company must decide on a value proposition.</ListItem>
          <ListItem><Highlight>Differentiation</Highlight> involves actually differentiating the firm&apos;s market offering to create superior customer value.</ListItem>
          <ListItem><Highlight>Positioning</Highlight> consists of arranging for a market offering to occupy a clear, distinctive, and desirable place relative to competing products in the minds of target consumers.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Positioning Maps */}
      <Slide>
        <Heading>Positioning Maps</Heading>
        <AnimatedList>
          <ListItem>In planning their differentiation and positioning strategies, marketers often prepare <Highlight>perceptual positioning maps</Highlight>.</ListItem>
          <ListItem>These maps show consumer perceptions of their brands versus competing products on important buying dimensions.</ListItem>
          <ListItem>The position of each circle on the map indicates the brand&apos;s perceived positioning, and the size of the circle may indicate the brand&apos;s relative market share.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Choosing a Differentiation and Positioning Strategy [quiz] */}
      <Slide quizData={quizBySlideId["choosing-a-differentiation-and-positioning-strategy"]}>
        <Heading>Choosing a Strategy</Heading>
        <AnimatedList>
          <ListItem>The differentiation and positioning task consists of three steps:</ListItem>
          <ListItem>1) Identifying a set of differentiating competitive advantages.</ListItem>
          <ListItem>2) Choosing the right competitive advantages.</ListItem>
          <ListItem>3) Selecting an overall positioning strategy.</ListItem>
          <ListItem>To build profitable relationships with target customers, marketers must understand customer needs better than competitors do and deliver more customer value.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Developing a Value Proposition [quiz] */}
      <Slide quizData={quizBySlideId["developing-a-value-proposition"]}>
        <Heading>Developing a Value Proposition</Heading>
        <AnimatedList>
          <ListItem>The full positioning of a brand is called the brand&apos;s <Highlight>value proposition</Highlight>.</ListItem>
          <ListItem>It is the full mix of benefits on which a brand is differentiated and positioned.</ListItem>
          <ListItem>Possible value propositions include &quot;More for More,&quot; &quot;More for the Same,&quot; &quot;The Same for Less,&quot; &quot;Less for much Less,&quot; and &quot;More for Less.&quot;</ListItem>
        </AnimatedList>
      </Slide>

      {/* Communicating and Delivering the Chosen Position */}
      <Slide>
        <Heading>Communicating the Position</Heading>
        <AnimatedList>
          <ListItem>Once it has chosen a position, the company must take strong steps to deliver and communicate the desired position to its target consumers.</ListItem>
          <ListItem>All the company&apos;s marketing mix efforts (the 4 Ps) must support the positioning strategy.</ListItem>
          <ListItem>Establishing a position or changing one usually takes a long time, but maintaining it requires consistent performance and communication.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Brand Positioning */}
      <Slide>
        <Heading>Brand Positioning</Heading>
        <DiscussionCard title="Group Discussion">
          Think of a popular smartphone brand. What is its value proposition, and how does it differentiate itself from its main competitor in the minds of consumers?
        </DiscussionCard>
      </Slide>

      {/* Conclusion: Segmentation, Targeting, and Positioning */}
      <Slide>
        <Tag>Conclusion</Tag>
        <Heading>Summary</Heading>
        <AnimatedList>
          <ListItem>The STP process is essential for creating customer value and building profitable relationships.</ListItem>
          <ListItem>Segmentation allows marketers to identify distinct groups with unique needs.</ListItem>
          <ListItem>Targeting selects the most attractive segments to serve.</ListItem>
          <ListItem>Positioning ensures the brand occupies a clear, distinctive place in the consumer&apos;s mind.</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}