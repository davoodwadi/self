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
import  FlowRenderer  from "@/components/flowcharts/FlowRenderer";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import { pestleFrameworkFlow } from "./flowcharts";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function IntroMarketingWeek2() {
  return (
    <SlideDeck
      background={<BackgroundManager type="marketing" />}
    >
      {/* Title Slide */}
      <Slide>
        <Title>The Marketing Environment and Ethics</Title>
        <Subtitle variant="hero">Introduction to Marketing</Subtitle>
        <ContentText layout="base" className="text-center mt-8">Davood Wadi, PhD</ContentText>
        <AnimatedList className="mt-12 text-center max-w-2xl mx-auto">
          <ListItem>Welcome to Week 2 of Introduction to Marketing.</ListItem>
          <ListItem>Today we will explore the forces that shape a company&apos;s marketing environment.</ListItem>
          <ListItem>We will cover micro and macro-environmental factors, CSR, and marketing ethics.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 1: The Marketing Environment [no-quiz] */}
      <Slide>
        <Tag>Part 1</Tag>
        <Heading>The Marketing Environment</Heading>
        <AnimatedList>
          <ListItem>A company&apos;s <Highlight>marketing environment</Highlight> consists of the actors and forces outside marketing that affect marketing management&apos;s ability to build and maintain successful relationships with target customers.</ListItem>
          <ListItem>It is made up of a <Highlight>microenvironment</Highlight> and a <Highlight>macroenvironment</Highlight>.</ListItem>
          <ListItem>Marketers must be environmental trend trackers and opportunity seekers.</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Microenvironment [quiz] */}
      <Slide quizData={quizBySlideId["the-microenvironment"]}>
        <Heading>The Microenvironment</Heading>
        <AnimatedList>
          <ListItem>The microenvironment consists of the <Highlight>actors close to the company</Highlight> that affect its ability to serve its customers.</ListItem>
          <ListItem>These actors include the company itself, suppliers, marketing intermediaries, customer markets, competitors, and publics.</ListItem>
          <ListItem>Success depends on building relationships with other company departments and these external partners.</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Macroenvironment [quiz] */}
      <Slide quizData={quizBySlideId["the-macroenvironment"]}>
        <Heading>The Macroenvironment</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The macroenvironment consists of the <Highlight>larger societal forces</Highlight> that affect the microenvironment.</ListItem>
              <ListItem>It shapes opportunities and poses threats to the company.</ListItem>
              <ListItem>We often use the <Highlight>PESTLE framework</Highlight> to analyze these broad forces.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <div className="w-full h-[400px]">
              <FlowRenderer {...pestleFrameworkFlow} />
            </div>
          </Column>
        </Row>
      </Slide>

      {/* PESTLE Analysis: Political and Economic */}
      <Slide>
        <Tag>PESTLE</Tag>
        <Heading>Political and Economic</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Political">
              <ContentDescription>
                Laws, government agencies, and pressure groups that influence or limit organizations and individuals.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Economic">
              <ContentDescription>
                Factors that affect consumer purchasing power and spending patterns, such as inflation and interest rates.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText className="mt-8 text-center text-[var(--charcoal-light)]">
          These forces dictate how a business can operate and whether consumers can afford their products.
        </ContentText>
      </Slide>

      {/* PESTLE Analysis: Social and Technological */}
      <Slide>
        <Tag>PESTLE</Tag>
        <Heading>Social and Technological</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Social">
              <ContentDescription>
                Institutions and other forces that affect a society&apos;s basic values, perceptions, preferences, and behaviors.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Technological">
              <ContentDescription>
                Forces that create new technologies, creating new product and market opportunities.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText className="mt-8 text-center text-[var(--charcoal-light)]">
          Marketers must track cultural trends and adopt relevant technologies to stay competitive.
        </ContentText>
      </Slide>

      {/* PESTLE Analysis: Legal and Environmental */}
      <Slide>
        <Tag>PESTLE</Tag>
        <Heading>Legal and Environmental</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Legal">
              <ContentDescription>
                Specific legislation protecting companies from each other, protecting consumers, and protecting the interests of society.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Environmental">
              <ContentDescription>
                Natural resources that are needed as inputs by marketers or that are affected by marketing activities.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText className="mt-8 text-center text-[var(--charcoal-light)]">
          Compliance and environmental sustainability are now baseline expectations for modern businesses.
        </ContentText>
      </Slide>

      {/* Discussion: Environmental Forces */}
      <Slide>
        <Heading>Environmental Forces</Heading>
        <DiscussionCard title="Group Discussion">
          If a global coffee chain wants to enter a new emerging market, which PESTLE factor might pose the most immediate and unpredictable challenge to their launch strategy, and why?
        </DiscussionCard>
      </Slide>

      {/* Part 2: Corporate Social Responsibility (CSR) [no-quiz] */}
      <Slide>
        <Tag>Part 2</Tag>
        <Heading>Corporate Social Responsibility (CSR)</Heading>
        <AnimatedList>
          <ListItem>Beyond analyzing the environment, companies must respond to <Highlight>societal expectations</Highlight>.</ListItem>
          <ListItem>Corporate Social Responsibility involves self-regulating business models that help a company be socially accountable.</ListItem>
          <ListItem>CSR is not just philanthropy, it is deeply integrated into the business strategy.</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Pillars of CSR [quiz] */}
      <Slide quizData={quizBySlideId["the-pillars-of-csr"]}>
        <Heading>The Pillars of CSR</Heading>
        <div className="grid grid-cols-2 gap-6 mt-8">
          <Card title="Economic">
            <ContentDescription>To be profitable and economically viable.</ContentDescription>
          </Card>
          <Card title="Legal">
            <ContentDescription>To obey the law and play by the rules.</ContentDescription>
          </Card>
          <Card title="Ethical">
            <ContentDescription>To do what is right, just, and fair.</ContentDescription>
          </Card>
          <Card title="Philanthropic">
            <ContentDescription>To contribute resources to the community and improve quality of life.</ContentDescription>
          </Card>
        </div>
      </Slide>

      {/* The Business Case for CSR */}
      <Slide>
        <Heading>The Business Case for CSR</Heading>
        <AnimatedList>
          <ListItem>Consumers increasingly prefer to buy from companies that share their values.</ListItem>
          <ListItem>CSR programs can improve employee morale, recruitment, and retention.</ListItem>
          <ListItem>It also helps mitigate risks and can even reduce operational costs through sustainable practices.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Greenwashing: A Marketing Trap */}
      <Slide>
        <Heading>Greenwashing: A Marketing Trap</Heading>
        <AnimatedList>
          <ListItem><Highlight>Greenwashing</Highlight> occurs when a company spends more time and money claiming to be &quot;green&quot; than actually implementing business practices that minimize environmental impact.</ListItem>
          <ListItem>It damages brand trust and can lead to legal penalties.</ListItem>
          <ListItem>Transparency and authentic action are the only cures for greenwashing.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Discussion: The Cost of CSR */}
      <Slide>
        <Heading>The Cost of CSR</Heading>
        <DiscussionCard title="Group Discussion">
          When a retail brand publicly commits to sourcing 100% fair-trade materials, prices inevitably rise. Should the brand absorb the cost, or pass it on to consumers, and how does this affect their competitive positioning?
        </DiscussionCard>
      </Slide>

      {/* Part 3: Ethical Considerations in Marketing [no-quiz] */}
      <Slide>
        <Tag>Part 3</Tag>
        <Heading>Ethical Considerations</Heading>
        <AnimatedList>
          <ListItem>Marketing ethics are the broad guidelines that everyone in the organization must follow.</ListItem>
          <ListItem>These policies cover distributor relations, advertising standards, customer service, pricing, product development, and general ethical standards.</ListItem>
          <ListItem>Good ethics is good business.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Deceptive Practices [quiz] */}
      <Slide quizData={quizBySlideId["deceptive-practices"]}>
        <Heading>Deceptive Practices</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Deceptive Pricing">
              <ContentDescription>
                Includes falsely advertising &quot;factory&quot; or &quot;wholesale&quot; prices or a large price reduction from a phony high retail price.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Deceptive Promotion">
              <ContentDescription>
                Includes misrepresenting the product&apos;s features or performance.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText className="mt-8 text-center text-[var(--charcoal-light)]">
          These practices harm consumers and ultimately destroy brand equity.
        </ContentText>
      </Slide>

      {/* High-Pressure Selling */}
      <Slide>
        <Heading>High-Pressure Selling</Heading>
        <AnimatedList>
          <ListItem>Involves persuading people to buy goods they had no thought of buying.</ListItem>
          <ListItem>It is often used for unsought goods or in aggressive B2B environments.</ListItem>
          <ListItem>High-pressure selling yields short-term gains but damages long-term relationships and reputation.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Planned Obsolescence */}
      <Slide>
        <Heading>Planned Obsolescence</Heading>
        <AnimatedList>
          <ListItem>Causing products to become obsolete before they actually need replacement.</ListItem>
          <ListItem>Strategies include using materials that break easily, continuous changing of styles, or delaying functional features until later models.</ListItem>
          <ListItem>While it drives frequent replacement sales, it raises significant environmental and ethical concerns.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Sustainable Marketing */}
      <Slide>
        <Heading>Sustainable Marketing</Heading>
        <AnimatedList>
          <ListItem><Highlight>Sustainable marketing</Highlight> is socially and environmentally responsible marketing that meets the present needs of consumers and businesses.</ListItem>
          <ListItem>It also preserves or enhances the ability of future generations to meet their needs.</ListItem>
          <ListItem>It goes beyond the marketing concept to adopt a societal marketing concept.</ListItem>
        </AnimatedList>
      </Slide>

      {/* Conclusion: Adapting Responsibly */}
      <Slide>
        <Heading>Adapting Responsibly</Heading>
        <AnimatedList>
          <ListItem>The marketing environment is dynamic and constantly evolving.</ListItem>
          <ListItem>Companies must actively monitor micro and macro forces to seize opportunities and mitigate threats.</ListItem>
          <ListItem>Ultimately, long-term success requires a commitment to ethical practices and genuine corporate social responsibility.</ListItem>
        </AnimatedList>
      </Slide>

    </SlideDeck>
  );
}
