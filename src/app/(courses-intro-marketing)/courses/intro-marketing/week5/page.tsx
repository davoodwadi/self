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
  DiscussionCard,
  Tag,
  Highlight,
} from "@/components/slide-components/SlideComponents";
import { BackgroundManager } from "@/components/slide-components/Backgrounds";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import { internalExternalDataFlow, crmCycleFlow } from "./flowcharts";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function IntroMarketingWeek5() {
  return (
    <SlideDeck
      background={<BackgroundManager type="marketing" />}
    >
      {/* Title Slide */}
      <Slide>
        <Title>Marketing Research and Data Analytics</Title>
        <Subtitle variant="hero">Introduction to Marketing</Subtitle>
        <ContentText layout="base" className="text-center mt-8">Davood Wadi, PhD</ContentText>
        <AnimatedList className="mt-12 text-center max-w-2xl mx-auto">
          <ListItem>Welcome to Week 5 of Introduction to Marketing.</ListItem>
          <ListItem>Today we focus on Marketing Research and Data Analytics.</ListItem>
          <ListItem>We will cover the research process, data types, and how insights drive decisions.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 1: The Marketing Research Process [no-quiz] */}
      <Slide>
        <Tag>Part 1</Tag>
        <Heading>The Marketing Research Process</Heading>
        <AnimatedList>
          <ListItem>Marketing research is the systematic design, collection, and analysis of data.</ListItem>
          <ListItem>It connects consumers, customers, and the public to the marketer through information.</ListItem>
          <ListItem>This information is used to identify and define marketing opportunities and problems.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Step 1: Defining the Problem [quiz] */}
      <Slide quizData={quizBySlideId["step-1-defining-the-problem"]}>
        <Heading>Step 1: Defining the Problem</Heading>
        <AnimatedList>
          <ListItem>The first step is to carefully define the problem and agree on research objectives.</ListItem>
          <ListItem>This is often the hardest step, as it guides the entire research process.</ListItem>
          <ListItem>Objectives can be exploratory, descriptive, or causal depending on the problem.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Step 2: Developing the Research Plan [quiz] */}
      <Slide quizData={quizBySlideId["step-2-developing-the-research-plan"]}>
        <Heading>Step 2: Developing the Research Plan</Heading>
        <AnimatedList>
          <ListItem>The research plan determines the exact information needed.</ListItem>
          <ListItem>It outlines sources of existing data and spells out specific research approaches.</ListItem>
          <ListItem>The plan must balance the cost of obtaining data against the value of the insights.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Steps 3 and 4: Implementing and Interpreting */}
      <Slide>
        <Heading>Steps 3 and 4: Implementing and Interpreting</Heading>
        <AnimatedList>
          <ListItem>Implementing involves collecting, processing, and analyzing the information.</ListItem>
          <ListItem>Interpreting the findings involves drawing conclusions and reporting them to management.</ListItem>
          <ListItem>Managers and researchers must work together to extract actionable insights.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Defining the Problem */}
      <Slide>
        <Heading>Defining the Problem</Heading>
        <DiscussionCard title="Group Discussion">
          If a company notices a sudden drop in sales for a flagship product, what specific exploratory research objectives might they set before rushing to launch a new advertising campaign?
        </DiscussionCard>
      </Slide>

      {/* Part 2: Primary vs. Secondary Data [no-quiz] */}
      <Slide>
        <Tag>Part 2</Tag>
        <Heading>Primary vs. Secondary Data</Heading>
        <AnimatedList>
          <ListItem>Marketers gather two main types of data: primary and secondary.</ListItem>
          <ListItem>Understanding the difference is crucial for cost-effective research.</ListItem>
          <ListItem>Each type of data has distinct advantages and limitations.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Secondary Data [quiz] */}
      <Slide quizData={quizBySlideId["secondary-data"]}>
        <Heading>Secondary Data</Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mb-6">
          <FlowRenderer {...internalExternalDataFlow} />
        </div>
        <AnimatedList>
          <ListItem>Secondary data consists of information that already exists somewhere.</ListItem>
          <ListItem>It is usually collected for another purpose but can be relevant to the current problem.</ListItem>
          <ListItem>Sources include internal databases, government reports, and commercial data services.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Advantages and Disadvantages of Secondary Data */}
      <Slide>
        <Heading>Advantages and Disadvantages of Secondary Data</Heading>
        <AnimatedList>
          <ListItem>It can be obtained quickly and at a lower cost than primary data.</ListItem>
          <ListItem>It can provide data an individual company cannot collect on its own.</ListItem>
          <ListItem>However, the needed information might not exist or might not be very usable or accurate.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Primary Data [quiz] */}
      <Slide quizData={quizBySlideId["primary-data"]}>
        <Heading>Primary Data</Heading>
        <AnimatedList>
          <ListItem>Primary data consists of information collected for the specific purpose at hand.</ListItem>
          <ListItem>It requires decisions on research approaches, contact methods, and sampling plans.</ListItem>
          <ListItem>This data is highly relevant but takes more time and resources to gather.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Primary Research Approaches [quiz] */}
      <Slide quizData={quizBySlideId["primary-research-approaches"]}>
        <Heading>Primary Research Approaches</Heading>
        <AnimatedList>
          <ListItem><Highlight>Observational research</Highlight> involves gathering data by observing relevant people and actions.</ListItem>
          <ListItem><Highlight>Survey research</Highlight> is best for gathering descriptive information about knowledge and attitudes.</ListItem>
          <ListItem><Highlight>Experimental research</Highlight> is best for gathering causal information by matching groups and controlling factors.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: Choosing Data Types */}
      <Slide>
        <Heading>Choosing Data Types</Heading>
        <DiscussionCard title="Group Discussion">
          When launching a completely novel product category that does not currently exist, why might a company have to rely heavily on primary data rather than secondary data?
        </DiscussionCard>
      </Slide>

      {/* Part 3: Data Analytics and Customer Insights [no-quiz] */}
      <Slide>
        <Tag>Part 3</Tag>
        <Heading>Data Analytics and Customer Insights</Heading>
        <AnimatedList>
          <ListItem>In the digital age, marketers have access to massive amounts of data.</ListItem>
          <ListItem>Big Data refers to the huge and complex data sets generated by sophisticated technologies.</ListItem>
          <ListItem>The challenge is not getting more data, but getting better data and insights.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Customer Relationship Management (CRM) [quiz] */}
      <Slide quizData={quizBySlideId["customer-relationship-management-crm"]}>
        <Heading>Customer Relationship Management (CRM)</Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mb-6">
          <FlowRenderer {...crmCycleFlow} />
        </div>
        <AnimatedList>
          <ListItem>CRM involves managing detailed information about individual customers.</ListItem>
          <ListItem>Marketers use CRM to carefully manage customer touchpoints to maximize loyalty.</ListItem>
          <ListItem>It integrates everything a company sales, service, and marketing teams know about customers.</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Role of Marketing Analytics [quiz] */}
      <Slide quizData={quizBySlideId["the-role-of-marketing-analytics"]}>
        <Heading>The Role of Marketing Analytics</Heading>
        <AnimatedList>
          <ListItem>Marketing analytics consists of the analysis tools, technologies, and processes.</ListItem>
          <ListItem>These tools are used to dig out meaningful patterns in big data.</ListItem>
          <ListItem>Analytics helps marketers gain customer insights and gauge marketing performance.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Transforming Data into Actionable Insights */}
      <Slide>
        <Heading>Transforming Data into Actionable Insights</Heading>
        <AnimatedList>
          <ListItem>Data alone is useless without the human element of interpretation.</ListItem>
          <ListItem>Customer insights are fresh understandings of customers and the marketplace.</ListItem>
          <ListItem>These insights become the basis for creating customer value and relationships.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: The Ethics of Big Data */}
      <Slide>
        <Heading>The Ethics of Big Data</Heading>
        <DiscussionCard title="Group Discussion">
          With companies collecting vast amounts of personal data to generate insights, where is the line between providing personalized value and invading consumer privacy?
        </DiscussionCard>
      </Slide>

      {/* Conclusion: Data-Driven Decision Making */}
      <Slide>
        <Heading>Conclusion</Heading>
        <AnimatedList>
          <ListItem>Marketing research reduces uncertainty in decision making.</ListItem>
          <ListItem>A strategic mix of primary and secondary data provides a complete market view.</ListItem>
          <ListItem>Effective use of analytics transforms raw data into a competitive advantage.</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}