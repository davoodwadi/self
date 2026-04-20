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
  Metric,
  AnimatedList,
  ListItem,
  Callout,
} from "@/components/slide-components/SlideComponents";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import { promotionMixFlow, communicationStepsFlow } from "./flowcharts";

export default function Week10IMC() {
  const quizBySlideId = createCourseQuizLookup(quizzesData);

  return (
    <SlideDeck>
      <Slide id="title-slide">
        <Title>Integrated Marketing Communications</Title>
        <Subtitle variant="hero">The Fourth P</Subtitle>
        <AnimatedList>
          <ListItem>Welcome to Week 10</ListItem>
          <ListItem>Exploring Integrated Marketing Communications</ListItem>
          <ListItem>Understanding the Fourth P of the Marketing Mix</ListItem>
        </AnimatedList>
      </Slide>

      <Slide id="the-promotion-mix" quizData={quizBySlideId["the-promotion-mix"]}>
        <Heading>The Promotion Mix</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Core Concept">
              Forms the core of marketing communications
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Defines the specific blend of promotional tools</ListItem>
              <ListItem>Used to engage consumers and build customer relationships</ListItem>
              <ListItem>Communicates customer value persuasively</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      <Slide id="elements-of-the-promotion-mix" quizData={quizBySlideId["elements-of-the-promotion-mix"]}>
        <Heading>Elements of the <Highlight>Promotion Mix</Highlight></Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[420px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mb-8">
          <FlowRenderer {...promotionMixFlow} />
        </div>
        <Row gap="medium" items="start">
          <Column spanRatio="1/3">
            <Card title="Advertising" subtitle="Paid Format">
              <ContentDescription>Advertising: Paid, non-personal presentation of ideas</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Public Relations" subtitle="Relationship Building">
              <ContentDescription>Public Relations: Building good relations with various publics</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Sales Promotion" subtitle="Incentives">
              <ContentDescription>Sales Promotion: Short-term incentives to encourage purchase</ContentDescription>
            </Card>
          </Column>
        </Row>
        <Row gap="medium" items="start">
          <Column spanRatio="1/2">
            <Card title="Personal Selling" subtitle="Direct Interaction">
              <ContentDescription>Personal Selling: Personal customer interactions by the firm's sales force</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Direct & Digital Marketing" subtitle="Targeted Action">
              <ContentDescription>Direct and Digital Marketing: Engaging directly with targeted individual consumers</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="advertising">
        <Heading>Advertising</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Card title="Reach & Repetition">
              <AnimatedList>
                <ListItem>Reaches masses of geographically dispersed buyers</ListItem>
                <ListItem>Enables the seller to repeat a message many times</ListItem>
              </AnimatedList>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Limitations">
              <AnimatedList>
                <ListItem>Can be very costly for forms like television</ListItem>
                <ListItem>Lacks the direct persuasiveness of company salespeople</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="public-relations">
        <Heading>Public Relations</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Highly believable compared to ads</ListItem>
              <ListItem>Reaches prospects who avoid salespeople and advertisements</ListItem>
              <ListItem>Dramatizes a company or product</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="secondary" title="Potential">
              Often underused despite its strong potential
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="sales-promotion" quizData={quizBySlideId["sales-promotion"]}>
        <Heading>Sales <Highlight>Promotion</Highlight></Heading>
        <Row gap="medium">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Includes coupons, contests, discounts, and premiums</ListItem>
              <ListItem>Attracts consumer attention and offers strong incentives to purchase</ListItem>
              <ListItem>Rewards quick response from buyers</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="secondary" title="Effectiveness">
              Effects are often short-lived and not as effective in building long-term brand preference
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="personal-selling">
        <Heading>Personal Selling</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Metric value="$$$" label="Cost" />
            <ContentText>Represents the company's most expensive promotion tool</ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The most effective tool at certain stages of the buying process</ListItem>
              <ListItem>Particularly important in building buyers' preferences, convictions, and actions</ListItem>
              <ListItem>Requires a longer-term commitment than advertising</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      <Slide id="direct-and-digital-marketing">
        <Heading>Direct and Digital Marketing</Heading>
        <Row gap="large" items="start">
          <Column spanRatio="1/2">
            <Card title="Targeting">
              <AnimatedList>
                <ListItem>More targeted and directed to a specific customer or community</ListItem>
                <ListItem>Well suited to highly targeted marketing efforts</ListItem>
              </AnimatedList>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Interaction">
              <AnimatedList>
                <ListItem>Immediate and personalized for rapid response</ListItem>
                <ListItem>Highly interactive, allowing for two-way dialogue</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="discussion-selecting-promotional-tools">
        <Tag>Reflection</Tag>
        <Heading>Discussion: Selecting Promotional Tools</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="full">
            <DiscussionCard title="Group Discussion">
              Imagine you are launching a highly technical, high-priced B2B software product. Would you allocate the majority of your budget to mass advertising or personal selling, and what factors drive your decision?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      <Slide id="the-need-for-integrated-marketing-communications" quizData={quizBySlideId["the-need-for-integrated-marketing-communications"]}>
        <Heading>The Need for <Highlight>IMC</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
             <AnimatedList>
               <ListItem>Consumers are bombarded by commercial messages from a broad range of sources</ListItem>
               <ListItem>A fragmented media landscape complicates the communication process</ListItem>
               <ListItem>Conflicting messages from different sources can result in confused company images</ListItem>
             </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="primary" title="The Solution">
              IMC ties together all of the company's messages and images
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="defining-imc">
        <Heading>Defining IMC</Heading>
        <Subtitle variant="section">Integrated Marketing Communications</Subtitle>
        <Row gap="medium">
          <Column spanRatio="1/3">
            <Card title="Integration" subtitle="Coordination">
              <ContentDescription>Carefully integrating and coordinating the company's many communications channels</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Consistency" subtitle="Messaging">
              <ContentDescription>Delivers a clear, consistent, and compelling message about the organization and its products</ContentDescription>
            </Card>
            <Card title="Identity" subtitle="Branding">
              <ContentDescription>Builds a unified brand identity across all touchpoints</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Alignment" subtitle="Prevention">
              <ContentDescription>Prevents the disconnect that occurs when different departments create uncoordinated messages</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="steps-in-developing-effective-communication" quizData={quizBySlideId["steps-in-developing-effective-communication"]}>
        <Heading>Steps in Developing <Highlight>Effective Communication</Highlight></Heading>
        <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80 mb-8">
          <FlowRenderer {...communicationStepsFlow} />
        </div>
        <AnimatedList>
          <ListItem>Identify the target audience</ListItem>
          <ListItem>Determine the communication objectives</ListItem>
          <ListItem>Design the message</ListItem>
          <ListItem>Choose the media to send the message</ListItem>
          <ListItem>Select the message source and collect feedback</ListItem>
        </AnimatedList>
      </Slide>

      <Slide id="determining-communication-objectives">
        <Heading>Determining Communication Objectives</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Marketers must determine where the target audience stands in relation to the product</ListItem>
              <ListItem>Move the consumer through buyer-readiness stages</ListItem>
              <ListItem>Stages include awareness, knowledge, liking, preference, conviction, and purchase</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
             <ContentText layout="base"><strong>The goal is to guide the consumer toward the final purchase decision</strong></ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide id="designing-the-message">
        <Heading>Designing the Message</Heading>
        <Row gap="medium">
           <Column spanRatio="1/2">
             <Callout variant="primary" title="AIDA Model">
               The message should get attention, hold interest, arouse desire, and obtain action
             </Callout>
             <Card title="Content">
                <ContentDescription>Content choices involve rational, emotional, or moral appeals</ContentDescription>
             </Card>
           </Column>
           <Column spanRatio="1/2">
             <Card title="Structure">
                <ContentDescription>Structure decisions determine whether to draw a conclusion or leave it to the audience</ContentDescription>
             </Card>
             <Card title="Format">
                <ContentDescription>Format considerations include design, layout, color, and sound</ContentDescription>
             </Card>
           </Column>
        </Row>
      </Slide>

      <Slide id="setting-the-promotional-budget" quizData={quizBySlideId["setting-the-promotional-budget"]}>
        <Heading>Setting the Promotional Budget</Heading>
        <Row gap="medium">
          <Column spanRatio="1/2">
            <Card title="Affordable Method">
              <ContentDescription>Affordable Method: Setting the budget at the level management thinks the company can afford</ContentDescription>
            </Card>
            <Card title="Competitive-Parity Method">
              <ContentDescription>Competitive-Parity Method: Setting the budget to match competitors' outlays</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Percentage-of-Sales Method">
              <ContentDescription>Percentage-of-Sales Method: Setting the budget at a certain percentage of current or forecasted sales</ContentDescription>
            </Card>
            <Card title="Objective-and-Task Method">
              <ContentDescription>Objective-and-Task Method: Developing the budget by defining specific objectives and determining the tasks needed to achieve them</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="objective-and-task-method-advantage">
        <Heading>Objective and Task Method Advantage</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="2/3">
             <AnimatedList>
                <ListItem>Forces management to spell out its assumptions about the relationship between dollars spent and promotion results</ListItem>
                <ListItem>Ensures spending is tied directly to strategic goals</ListItem>
                <ListItem>The most logical approach to budget setting</ListItem>
             </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
             <Callout variant="secondary" title="Challenge">
               Often the most difficult method to use effectively due to prediction challenges
             </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="measuring-effectiveness" quizData={quizBySlideId["measuring-effectiveness"]}>
        <Heading>Measuring <Highlight>Effectiveness</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
             <AnimatedList>
                <ListItem>Evaluating the return on investment for promotional activities</ListItem>
                <ListItem>Analyzing changes in sales and market share resulting from the campaign</ListItem>
             </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
             <AnimatedList>
                <ListItem>Asking the target audience whether they remember the message</ListItem>
                <ListItem>Measuring how many times they saw it and what points they recall</ListItem>
             </AnimatedList>
          </Column>
        </Row>
      </Slide>

      <Slide id="discussion-budgeting-strategies">
        <Tag>Application</Tag>
        <Heading>Discussion: Budgeting Strategies</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="full">
            <DiscussionCard title="Group Discussion">
              If a startup uses the percentage-of-sales method during its first year when sales are low, how might this impact their ability to build brand awareness, and what alternative method might be more appropriate?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      <Slide id="conclusion-integrated-marketing-communications">
        <Heading>Conclusion</Heading>
        <Subtitle variant="section">Integrated Marketing Communications</Subtitle>
        <Row gap="large">
          <Column spanRatio="full">
            <AnimatedList>
              <ListItem>The promotion mix consists of advertising, PR, sales promotion, personal selling, and digital marketing</ListItem>
              <ListItem>IMC ensures all promotional tools work together to deliver a consistent message</ListItem>
              <ListItem>Effective communication requires understanding the audience and setting clear objectives</ListItem>
              <ListItem>Strategic budgeting and measurement are essential for maximizing promotional impact</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>
    </SlideDeck>
  );
}
