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
import { digitalEcosystemFlow } from "./flowcharts";

export default function Week11DigitalMarketing() {
  const quizBySlideId = createCourseQuizLookup(quizzesData);

  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide">
        <Title>Digital and Social Media Marketing</Title>
        <Subtitle variant="hero">Transitioning to Digital Ecosystems</Subtitle>
        <AnimatedList>
          <ListItem>Welcome to Week 11</ListItem>
          <ListItem>Digital and Social Media Marketing</ListItem>
          <ListItem>Exploring the transition from traditional strategies to digital ecosystems</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Evolution: Traditional to Digital */}
      <Slide id="the-evolution-traditional-to-digital">
        <Heading>The Evolution: Traditional to Digital</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Marketing has shifted from static, one-way communication to interactive dialogues</ListItem>
              <ListItem>Traditional channels relied on mass broadcast models like print, radio, and television</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <ContentText>
                <Highlight>Digital platforms</Highlight> enable precision targeting and measurable engagement.
              </ContentText>
              <ContentText>
                The modern marketer must blend traditional principles with digital agility.
              </ContentText>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Problem: Adapting to Digital Channels */}
      <Slide id="the-problem-adapting-to-digital-channels">
        <Heading>The Problem: Adapting to Digital Channels</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Callout variant="secondary" title="The Challenge">
              Companies often struggle to transition legacy operations into the digital space.
            </Callout>
            <ContentText className="mt-4">
              Maintaining brand consistency across multiple fast-paced platforms is challenging.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The sheer volume of digital tools can overwhelm organizations without a clear strategy</ListItem>
              <ListItem>Customers now expect immediate, personalized responses from brands</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Core Concept: What is Digital Marketing? */}
      <Slide id="core-concept-what-is-digital-marketing" quizData={quizBySlideId["core-concept-what-is-digital-marketing"]}>
        <Heading>Core Concept: What is Digital Marketing?</Heading>
        <Card className="mb-8">
          <ContentText>
            Digital marketing encompasses all marketing efforts that use an electronic device or the internet.
          </ContentText>
        </Card>
        <AnimatedList>
          <ListItem>Businesses leverage digital channels such as search engines, social media, email, and other websites to connect with current and prospective customers</ListItem>
          <ListItem>It allows for <Highlight>real-time tracking</Highlight>, immediate feedback, and rapid campaign adjustment</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Paradigm Shift: Interactive vs. Broadcast Marketing */}
      <Slide id="the-paradigm-shift-interactive-vs-broadcast-marketing" quizData={quizBySlideId["the-paradigm-shift-interactive-vs-broadcast-marketing"]}>
        <Heading>The Paradigm Shift</Heading>
        <Subtitle>Interactive vs. Broadcast Marketing</Subtitle>
        <Row gap="large" items="center" className="mt-8">
          <Column spanRatio="1/2">
            <Card>
              <ContentDescription>
                <strong>Broadcast</strong>: Traditional broadcast marketing delivers a uniform message to a broad audience.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <ContentDescription>
                <strong>Interactive</strong>: Interactive digital marketing invites consumers to participate in a two-way conversation.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <AnimatedList className="mt-8">
          <ListItem>Campaigns are now designed to be shared, commented on, and personalized</ListItem>
          <ListItem>This shift empowers consumers, making them co-creators of brand value</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Digital Marketing Ecosystem */}
      <Slide id="the-digital-marketing-ecosystem">
        <Heading>The Digital Marketing Ecosystem</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The digital ecosystem is a complex network of interconnected channels and platforms</ListItem>
              <ListItem>It includes owned media (websites), paid media (ads), and earned media (shares and reviews)</ListItem>
              <ListItem>A successful digital strategy seamlessly integrates these different elements</ListItem>
              <ListItem><Highlight>Data analytics</Highlight> forms the foundation, guiding decisions across the entire ecosystem</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <div className="w-full h-[400px]">
              <FlowRenderer 
                aiGeneratedNodes={digitalEcosystemFlow.nodes} 
                aiGeneratedEdges={digitalEcosystemFlow.edges} 
              />
            </div>
          </Column>
        </Row>
      </Slide>

      {/* Strategy: Search Engine Optimization (SEO) */}
      <Slide id="strategy-search-engine-optimization-seo">
        <Heading>Strategy: Search Engine Optimization (SEO)</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText>
              SEO is the practice of optimizing web content to rank higher in organic search engine results.
            </ContentText>
            <AnimatedList className="mt-4">
              <ListItem>It involves technical website adjustments, keyword research, and high-quality content creation</ListItem>
              <ListItem>The algorithm prioritizes user intent, relevance, and website authority</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="secondary" title="Long-Term Value">
              A strong SEO foundation builds long-term, sustainable traffic without direct advertising costs.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* Strategy: Search Engine Marketing (SEM) */}
      <Slide id="strategy-search-engine-marketing-sem">
        <Heading>Strategy: Search Engine Marketing (SEM)</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Paid Visibility">
              SEM focuses on gaining visibility through paid search advertising.
            </Callout>
            <ContentText className="mt-4">
              Advertisers bid on keywords to appear at the top of search engine results pages.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>It provides immediate visibility and precise targeting based on user search queries</ListItem>
              <ListItem>Campaigns require constant monitoring and budget optimization to maximize return on ad spend</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* Strategy: Content Marketing */}
      <Slide id="strategy-content-marketing">
        <Heading>Strategy: Content Marketing</Heading>
        <Card className="mb-6">
          <ContentText>
            Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content.
          </ContentText>
        </Card>
        <AnimatedList>
          <ListItem>The goal is to attract and retain a clearly defined audience and ultimately drive profitable customer action</ListItem>
          <ListItem>Effective content <Highlight>educates or entertains</Highlight> rather than directly selling a product</ListItem>
        </AnimatedList>
        <Row gap="medium" className="mt-6">
          <Tag>Blog Posts</Tag>
          <Tag>Videos</Tag>
          <Tag>Infographics</Tag>
          <Tag>Podcasts</Tag>
        </Row>
      </Slide>

      {/* Strategy: Email Marketing Campaigns */}
      <Slide id="strategy-email-marketing-campaigns">
        <Heading>Strategy: Email Marketing</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Email marketing remains one of the most effective direct channels for customer retention</ListItem>
              <ListItem>It allows for highly personalized and segmented communication based on user behavior</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <AnimatedList>
                <ListItem>Automation tools can trigger specific messages during critical points in the customer journey</ListItem>
                <ListItem>Success relies on delivering <Highlight>value</Highlight> rather than overwhelming subscribers with promotional material</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Discussion: SEO vs. SEM Investment */}
      <Slide id="discussion-seo-vs-sem-investment">
        <Heading>Discussion: SEO vs. SEM Investment</Heading>
        <DiscussionCard>
          A startup has limited funds and must decide whether to invest entirely in immediate SEM campaigns for quick sales or long-term SEO strategy for sustainable growth. Which path creates a more resilient digital presence?
        </DiscussionCard>
      </Slide>

      {/* The Power of Social Media Marketing */}
      <Slide id="the-power-of-social-media-marketing">
        <Heading>The Power of Social Media</Heading>
        <AnimatedList>
          <ListItem>Social media platforms have transformed how brands build relationships with consumers</ListItem>
          <ListItem>They provide unique opportunities for storytelling and community building</ListItem>
          <ListItem>Brands can <Highlight>humanize</Highlight> their image by interacting directly with users</ListItem>
          <ListItem>Social platforms serve as crucial touchpoints for customer service and support</ListItem>
        </AnimatedList>
      </Slide>

      {/* Social Media Platforms and Demographics */}
      <Slide id="social-media-platforms-and-demographics" quizData={quizBySlideId["social-media-platforms-and-demographics"]}>
        <Heading>Platforms and Demographics</Heading>
        <ContentText className="mb-8">
          Different platforms attract distinct user demographics and require tailored content strategies.
        </ContentText>
        <Row gap="large">
          <Column spanRatio="1/3">
            <Card>
              <ContentDescription>
                <strong>Visual</strong>: Excel in lifestyle and product showcasing (e.g., Instagram, Pinterest).
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card>
              <ContentDescription>
                <strong>Professional</strong>: Essential for B2B marketing and corporate branding (e.g., LinkedIn).
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card>
              <ContentDescription>
                <strong>Short-Form</strong>: Dominate younger demographics and trend creation (e.g., TikTok).
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Strategy: Building Customer Engagement */}
      <Slide id="strategy-building-customer-engagement">
        <Heading>Strategy: Building Customer Engagement</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Engagement goes beyond likes and follows to foster genuine brand advocacy</ListItem>
              <ListItem>Brands must create interactive content that encourages user participation and sharing</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <AnimatedList>
                <ListItem>Prompt and authentic responses to comments and messages build trust</ListItem>
                <ListItem>User-generated content can be leveraged to amplify reach and credibility</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* The Concept: Social Listening */}
      <Slide id="the-concept-social-listening">
        <Heading>The Concept: Social Listening</Heading>
        <Callout variant="primary" title="Definition" className="mb-6">
          Social listening involves monitoring digital conversations to understand what customers are saying about a brand or industry.
        </Callout>
        <AnimatedList>
          <ListItem>It provides unfiltered insights into customer sentiment, pain points, and emerging trends</ListItem>
          <ListItem>Brands can proactively address issues before they escalate into crises</ListItem>
          <ListItem>These insights can directly inform product development and marketing strategies</ListItem>
        </AnimatedList>
      </Slide>

      {/* Strategy: Influencer Marketing */}
      <Slide id="strategy-influencer-marketing">
        <Heading>Strategy: Influencer Marketing</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText>
              Influencer marketing partners with individuals who have a dedicated social following and are viewed as experts within their niche.
            </ContentText>
            <ContentText className="mt-4">
              It relies on the <Highlight>trust</Highlight> that influencers have built with their audience.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Micro-influencers often yield higher engagement rates than high-profile celebrities</ListItem>
              <ListItem>Successful partnerships require authentic alignment between the brand and the influencer</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* The Challenge: Measuring ROI */}
      <Slide id="the-challenge-measuring-roi" quizData={quizBySlideId["the-challenge-measuring-roi"]}>
        <Heading>The Challenge: Measuring ROI</Heading>
        <Callout variant="secondary" title="Complexity">
          Measuring the exact return on investment for digital and social campaigns remains complex.
        </Callout>
        <AnimatedList className="mt-6">
          <ListItem>Marketers must navigate a multitude of metrics, from click-through rates to conversion attribution models</ListItem>
          <ListItem>Tying social engagement directly to revenue requires sophisticated analytics tracking</ListItem>
          <ListItem>The focus must remain on metrics that align with overarching business objectives rather than vanity numbers</ListItem>
        </AnimatedList>
      </Slide>

      {/* Ethics and Privacy in Digital Marketing */}
      <Slide id="ethics-and-privacy-in-digital-marketing">
        <Heading>Ethics and Privacy</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Digital marketing strategies must navigate complex ethical boundaries regarding consumer data</ListItem>
              <ListItem>Increasing regulations require transparent data collection and usage practices</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <AnimatedList>
                <ListItem>Consumers are becoming more protective of their personal information</ListItem>
                <ListItem>Building trust requires prioritizing user privacy over aggressive data harvesting</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* Discussion: Navigating Data Privacy */}
      <Slide id="discussion-navigating-data-privacy">
        <Heading>Discussion: Navigating Data Privacy</Heading>
        <DiscussionCard>
          A marketing team realizes that using third-party data will double their ad conversion rate but risks alienating customers concerned about surveillance. Should they prioritize the campaign's success or strictly adhere to first-party data?
        </DiscussionCard>
      </Slide>

      {/* Conclusion: Digital and Social Media Marketing */}
      <Slide id="conclusion-digital-and-social-media-marketing">
        <Heading>Conclusion</Heading>
        <AnimatedList>
          <ListItem>Digital channels have fundamentally transformed the marketing landscape</ListItem>
          <ListItem>A comprehensive strategy must integrate SEO, SEM, content, and email marketing</ListItem>
          <ListItem>Social media offers unparalleled opportunities for community building and engagement</ListItem>
          <ListItem>Ethical data practices and continuous adaptation are crucial for long-term digital success</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}
