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
  Quote,
  Metric,
  AnimatedList,
  ListItem,
  Callout,
} from "@/components/slide-components/SlideComponents";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";
import FlowRenderer from "@/components/flowcharts/FlowRenderer";
import { marketEntryFlow, aiApplicationsFlow } from "./flowcharts";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function Week12Page() {
  return (
    <SlideDeck>
      {/* 1. Title Slide */}
      <Slide>
        <Title>Global Marketing and the Future of Marketing</Title>
        <Subtitle variant="hero">Week 12 • Introduction to Marketing</Subtitle>
        <AnimatedList>
          <ListItem>Welcome to Week 12 of Introduction to Marketing.</ListItem>
          <ListItem>Today we will explore global marketing strategies.</ListItem>
          <ListItem>We will also examine emerging trends shaping the future.</ListItem>
        </AnimatedList>
      </Slide>

      {/* 2. What is Global Marketing? */}
      <Slide>
        <Heading>What is <Highlight>Global Marketing</Highlight>?</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Global marketing involves targeting markets across the world.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>It requires understanding diverse cultural and economic environments.</ListItem>
              <ListItem>Companies must navigate complex regulatory and political landscapes.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 3. The Global Marketing Environment */}
      <Slide>
        <Heading>The <Highlight>Global Marketing</Highlight> Environment</Heading>
        <Row gap="medium">
          <Column spanRatio="1/3">
            <Card title="Trade" subtitle="Systems">
              <ContentDescription>The global environment includes international trade systems.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Economy" subtitle="Conditions">
              <ContentDescription>Marketers assess economic conditions of target countries.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Culture" subtitle="Behavior">
              <ContentDescription>Cultural environments dictate consumer behavior and preferences.</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 4. Assessing the Global Environment [quiz] */}
      <Slide quizData={quizBySlideId["assessing-the-global-environment"]}>
        <Heading><Highlight>Assessing</Highlight> the Global Environment</Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Tariffs and quotas are common trade barriers.</ListItem>
              <ListItem>Economic indicators like GDP guide market selection.</ListItem>
              <ListItem>Cultural nuances influence product acceptance and messaging.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="primary" title="Critical Note">
              Ignoring local customs often leads to marketing failures.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 5. Discussion: The Cultural Trap */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>The Cultural <Highlight>Trap</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>A US fast food chain launches a highly successful beef burger in India.</ListItem>
              <ListItem>Sales are abysmal, and there is public backlash.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              What specific cultural or environmental factor did the company ignore, and how would you correct the strategy?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 6. Deciding Whether to Go Global */}
      <Slide>
        <Heading>Deciding Whether to Go <Highlight>Global</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText>
              Saturated domestic markets often push companies outward. Global expansion offers economies of scale and higher profits.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="secondary" title="The Tradeoff">
              However, international operations introduce significant financial and operational risks.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 7. Market Entry Strategies [diagram: cascading flow - Market entry risk and control] */}
      <Slide>
        <Heading>Market Entry <Highlight>Strategies</Highlight></Heading>
        <AnimatedList>
          <ListItem>Companies choose from several entry modes based on risk tolerance.</ListItem>
          <ListItem>The primary modes are exporting, joint venturing, and direct investment.</ListItem>
          <ListItem>Each mode offers different levels of control and profit potential.</ListItem>
        </AnimatedList>
        <div className="mt-8 w-full">
          <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
            <FlowRenderer {...marketEntryFlow} />
          </div>
        </div>
      </Slide>

      {/* 8. Market Entry: Exporting */}
      <Slide>
        <Heading>Market Entry: <Highlight>Exporting</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card title="Simplest Method" subtitle="Exporting">
              <ContentDescription>Exporting is the simplest way to enter a foreign market.</ContentDescription>
            </Card>
            <ContentText layout="base" className="mt-4 text-[var(--charcoal-light)]">
              Exporting requires the least change to the company product lines.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Indirect exporting uses independent international marketing intermediaries.</ListItem>
              <ListItem>Direct exporting involves handling your own exports.</ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* 9. Market Entry: Joint Venturing [quiz] */}
      <Slide quizData={quizBySlideId["market-entry-joint-venturing"]}>
        <Heading>Market Entry: <Highlight>Joint Venturing</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText>
              Joint venturing involves joining with foreign companies.
            </ContentText>
            <Callout variant="primary" title="Risk vs Control">
              It shares the financial risk but also reduces management control.
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Types of Joint Venturing" subtitle="Methods">
              <AnimatedList>
                <ListItem>Licensing</ListItem>
                <ListItem>Contract manufacturing</ListItem>
                <ListItem>Joint ownership</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 10. Market Entry: Direct Investment */}
      <Slide>
        <Heading>Market Entry: <Highlight>Direct Investment</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Direct investment is the development of foreign-based assembly or manufacturing.</ListItem>
              <ListItem>It offers the highest level of control over the operation.</ListItem>
              <ListItem>However, it requires the most substantial capital commitment.</ListItem>
              <ListItem>Companies face currency risks and potential political instability.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Metric value="High" label="Control & Risk" />
          </Column>
        </Row>
      </Slide>

      {/* 11. Discussion: Selecting the Right Entry Mode */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>Selecting the Right <Highlight>Entry Mode</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>A local coffee brand wants to expand into a highly regulated foreign market.</ListItem>
              <ListItem>They have limited capital but a strong, recognizable brand identity.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Would you recommend licensing or direct investment, and what are the tradeoffs?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 12. Standardized vs. Adapted Marketing Mix */}
      <Slide>
        <Heading>Standardized vs. Adapted <Highlight>Marketing Mix</Highlight></Heading>
        <Row gap="medium">
          <Column spanRatio="1/2">
            <Card title="Standardized" subtitle="Global Marketing">
              <ContentDescription>Standardized global marketing uses the same strategy worldwide.</ContentDescription>
              <ContentText layout="base" className="mt-4 text-sm">
                Standardization lowers costs.
              </ContentText>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Adapted" subtitle="Global Marketing">
              <ContentDescription>Adapted global marketing adjusts the strategy to each target market.</ContentDescription>
              <ContentText layout="base" className="mt-4 text-sm">
                Adaptation improves local relevance.
              </ContentText>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 13. Product Adaptation Strategies [quiz] */}
      <Slide quizData={quizBySlideId["product-adaptation-strategies"]}>
        <Heading><Highlight>Product Adaptation</Highlight> Strategies</Heading>
        <Row gap="medium">
          <Column spanRatio="1/3">
            <Card title="Extension" subtitle="Straight">
              <ContentDescription>Straight extension means marketing a product without any changes.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Adaptation" subtitle="Product">
              <ContentDescription>Product adaptation alters the product to meet local conditions.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Invention" subtitle="Product">
              <ContentDescription>Product invention consists of creating something new for a specific market.</ContentDescription>
            </Card>
          </Column>
        </Row>
        <div className="mt-6">
          <Callout variant="secondary" title="Key Driver">
            Local tastes and infrastructure heavily dictate the chosen strategy.
          </Callout>
        </div>
      </Slide>

      {/* 14. Promotion Adaptation */}
      <Slide>
        <Heading><Highlight>Promotion</Highlight> Adaptation</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Global companies must decide how to adapt their advertising messages.</ListItem>
              <ListItem>Communication adaptation fully alters the message for local markets.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Quote author="Marketing Principle" role="Best Practice">
              Even translated taglines must be carefully vetted for cultural context.
            </Quote>
          </Column>
        </Row>
      </Slide>

      {/* 15. Pricing in Global Markets */}
      <Slide>
        <Heading><Highlight>Pricing</Highlight> in Global Markets</Heading>
        <AnimatedList>
          <ListItem>Pricing must account for transportation, tariffs, and intermediary margins.</ListItem>
          <ListItem>Companies face the challenge of price escalation in foreign markets.</ListItem>
          <ListItem>Setting a uniform price globally is rarely viable.</ListItem>
        </AnimatedList>
      </Slide>

      {/* 16. Distribution Channels */}
      <Slide>
        <Heading><Highlight>Distribution</Highlight> Channels</Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Global distribution networks are often complex and fragmented.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Movement Flow" subtitle="Channels">
              <AnimatedList>
                <ListItem>The channel between nations moves products to the borders.</ListItem>
                <ListItem>The channel within nations moves products from borders to final buyers.</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 17. Discussion: The Cost of Adaptation */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>The Cost of <Highlight>Adaptation</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>A tech company launches its flagship smartphone globally.</ListItem>
              <ListItem>They discover that local competitors offer similar features at half the price.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Should the company lower its global premium price, or create a cheaper, stripped-down version for this specific market?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 18. Emerging Trends in Marketing */}
      <Slide>
        <Heading><Highlight>Emerging Trends</Highlight> in Marketing</Heading>
        <Row gap="medium">
          <Column spanRatio="1/3">
            <Card title="Technology" subtitle="Advancements">
              <ContentDescription>Marketing is rapidly evolving due to technological advancements.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Shift" subtitle="Expectations">
              <ContentDescription>Consumer expectations are shifting towards sustainability and transparency.</ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card title="Adaptation" subtitle="Survival">
              <ContentDescription>Brands must adapt to survive in a hyper-connected landscape.</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 19. AI in Marketing [diagram: hub-and-spoke - AI Applications in Marketing] */}
      <Slide>
        <Heading><Highlight>AI</Highlight> in Marketing</Heading>
        <AnimatedList>
          <ListItem>Artificial intelligence is revolutionizing data analysis and consumer insights.</ListItem>
          <ListItem>It enables predictive modeling for consumer behavior.</ListItem>
          <ListItem>Chatbots and automated systems enhance customer service efficiency.</ListItem>
        </AnimatedList>
        <div className="mt-8 w-full">
          <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded-2xl border border-[var(--crimson)]/15 bg-white/80">
            <FlowRenderer {...aiApplicationsFlow} />
          </div>
        </div>
      </Slide>

      {/* 20. AI Personalization and Analytics [quiz] */}
      <Slide quizData={quizBySlideId["ai-personalization-and-analytics"]}>
        <Heading>AI Personalization and <Highlight>Analytics</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>AI algorithms deliver hyper-personalized content to users.</ListItem>
              <ListItem>Predictive analytics forecast future buying patterns based on past behavior.</ListItem>
              <ListItem>Marketers use AI to optimize ad spend in real-time.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="primary" title="Ethical Challenge">
              Ethical concerns regarding data privacy remain a significant challenge.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 21. Sustainability and Purpose-Driven Marketing */}
      <Slide>
        <Heading><Highlight>Sustainability</Highlight> and Purpose-Driven Marketing</Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Consumers increasingly prefer brands with strong environmental commitments.</ListItem>
              <ListItem>Purpose-driven marketing aligns business goals with social impact.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="secondary" title="Warning">
              Greenwashing, or false sustainability claims, damages brand reputation.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 22. The Circular Economy [quiz] */}
      <Slide quizData={quizBySlideId["the-circular-economy"]}>
        <Heading>The <Highlight>Circular Economy</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>The circular economy minimizes waste by designing products for reuse.</ListItem>
              <ListItem>Brands are shifting from a take-make-dispose model.</ListItem>
              <ListItem>Product life cycles are extended through repair and recycling programs.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Card title="Impact" subtitle="Opportunities">
              <ContentDescription>This model reduces environmental impact while creating new business opportunities.</ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      {/* 23. Immersive Experiences: AR and VR */}
      <Slide>
        <Heading>Immersive Experiences: <Highlight>AR and VR</Highlight></Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>Augmented reality allows consumers to visualize products before purchase.</ListItem>
              <ListItem>Virtual reality creates fully immersive brand environments.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <ContentText layout="base">
              These technologies bridge the gap between physical and digital shopping.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      {/* 24. Omnichannel and Seamless Journeys */}
      <Slide>
        <Heading><Highlight>Omnichannel</Highlight> and Seamless Journeys</Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>Omnichannel marketing provides a unified experience across all touchpoints.</ListItem>
              <ListItem>Consumers expect seamless transitions between online and offline channels.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout variant="primary" title="Requirement">
              Data integration is essential for tracking the customer journey.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* 25. Discussion: The Ethics of Hyper-Personalization */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>The Ethics of <Highlight>Hyper-Personalization</Highlight></Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>A retail app uses predictive AI to know a customer is pregnant before they announce it.</ListItem>
              <ListItem>The app sends targeted ads for baby products, causing distress.</ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Where should the line be drawn between helpful personalization and invasive surveillance?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* 26. Conclusion: Global Marketing and the Future */}
      <Slide>
        <Heading>Conclusion: <Highlight>Global Marketing</Highlight> and the Future</Heading>
        <AnimatedList>
          <ListItem>Global expansion requires careful selection of entry and adaptation strategies.</ListItem>
          <ListItem>The future of marketing is driven by AI, sustainability, and immersive tech.</ListItem>
          <ListItem>Marketers must balance technological innovation with ethical responsibility.</ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}

