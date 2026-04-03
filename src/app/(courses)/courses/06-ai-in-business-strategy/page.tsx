"use client";

import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Highlight,
  Tag,
  Row,
  Column,
  DiscussionCard,
  AnimatedList,
  ListItem,
  Citation,
  CitationProvider,
  Card,
  ContentTitle,
  ContentDescription,
  Metric,
  Callout,
  Quote,
  PieChart,
} from "@/app/(courses)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";

const quizBySlideId = createCourseQuizLookup(quizzesData);

export default function CourseName() {
  return (
    <SlideDeck background={<BackgroundManager type="strategy" />}>
      {/* Title Slide */}
      <Slide className="items-center justify-center text-center">
        <Tag>Week 06</Tag>
        <Title>AI in Business Strategy</Title>
        <Subtitle variant="hero">
          Integrating Artificial Intelligence into Competitive Advantage
        </Subtitle>
        <Callout variant="secondary">
          Moving beyond technological implementation to strategic alignment
        </Callout>
      </Slide>

      {/* Part 1: The Strategic Imperative of AI */}
      <Slide className="items-center justify-center text-center">
        <Tag>Part 1</Tag>
        <Heading>
          The Strategic <Highlight>Imperative</Highlight> of AI
        </Heading>
        <AnimatedList>
          <ListItem>Redefining the boundaries of corporate strategy</ListItem>
          <ListItem>
            The shift from operational efficiency to strategic differentiation
          </ListItem>
          <ListItem>Understanding AI as a general-purpose technology</ListItem>
        </AnimatedList>
      </Slide>

      {/* The New Strategic Landscape */}
      <Slide quizData={quizBySlideId["the-new-strategic-landscape"]}>
        <Heading>
          The New <Highlight>Strategic Landscape</Highlight>
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>Traditional Strategy</ContentTitle>
              <ContentDescription>
                Relied on static industry analysis and slow, deliberate
                adaptation to market changes.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>AI-Driven Strategy</ContentTitle>
              <ContentDescription>
                Introduces dynamic, predictive capabilities that continually
                reshape market boundaries.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Organizations must transition from reactive planning to
                proactive foresight.
              </ListItem>
              <ListItem>
                The velocity of strategic decision making accelerates
                significantly.
              </ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      {/* AI as a Strategic Asset */}
      <Slide>
        <Heading>
          AI as a <Highlight>Strategic Asset</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Data alone is insufficient for competitive advantage.
          </ListItem>
          <ListItem>
            The true asset is the proprietary algorithmic capability trained on
            unique data.
          </ListItem>
          <ListItem>
            Organizations must build defensible data moats to protect their
            strategic position.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Rethinking the Value Chain */}
      <Slide>
        <Heading>
          Rethinking the <Highlight>Value Chain</Highlight>
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                AI transforms primary activities, from inbound logistics to
                customer service.
              </ListItem>
              <ListItem>
                Support activities like human resources and procurement become
                intelligent and predictive.
              </ListItem>
              <ListItem>
                The integration of AI across the value chain creates compound
                strategic benefits.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Which segment of the traditional value chain is most vulnerable to
              commoditization by AI competitors?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* The Fallacy of Plug and Play */}
      <Slide>
        <Heading>
          The Fallacy of <Highlight>Plug and Play</Highlight>
        </Heading>
        <Callout variant="secondary" className="max-w-4xl">
          Implementing off-the-shelf AI tools does not confer long-term
          advantage.
        </Callout>
        <AnimatedList>
          <ListItem>
            Strategic value requires deep integration with unique organizational
            processes.
          </ListItem>
          <ListItem>
            The alignment between business strategy and AI architecture is
            paramount.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* The Leadership Imperative */}
      <Slide>
        <Heading>
          The <Highlight>Leadership</Highlight> Imperative
        </Heading>
        <AnimatedList>
          <ListItem>
            Executive leadership must own the AI strategy, not delegate it to
            the IT department.
          </ListItem>
          <ListItem>
            Cultivating an organizational mindset that embraces probabilistic
            outcomes.
          </ListItem>
          <ListItem>
            Fostering cross-functional collaboration to align AI initiatives
            with business goals.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 2: Value Creation and Capture */}
      <Slide className="items-center justify-center text-center">
        <Tag>Part 2</Tag>
        <Heading>
          Value <Highlight>Creation and Capture</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>Mechanisms of AI-driven value generation</ListItem>
          <ListItem>
            Reimagining products, services, and customer experiences
          </ListItem>
          <ListItem>
            Capturing the economic surplus generated by artificial intelligence
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Dimensions of Value Creation */}
      <Slide quizData={quizBySlideId["dimensions-of-value-creation"]}>
        <Heading>
          Dimensions of <Highlight>Value Creation</Highlight>
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Cost reduction through intelligent automation and process
                optimization.
              </ListItem>
              <ListItem>
                Revenue growth via hyper-personalization and predictive
                cross-selling.
              </ListItem>
              <ListItem>
                Business model innovation enabling entirely new revenue streams.
              </ListItem>
              <ListItem>
                The highest strategic return often comes from business model
                innovation.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <PieChart
              title="Strategic Return Focus"
              data={[
                {
                  label: "Business Model Innovation",
                  value: 60,
                  color: "rgba(255, 0, 51, 0.8)",
                },
                {
                  label: "Revenue Growth",
                  value: 25,
                  color: "rgba(180, 0, 30, 0.8)",
                },
                {
                  label: "Cost Reduction",
                  value: 15,
                  color: "rgba(120, 0, 20, 0.8)",
                },
              ]}
              caption="Business model innovation drives the vast majority of long-term strategic returns."
            />
          </Column>
        </Row>
      </Slide>

      {/* Product and Service Transformation */}
      <Slide>
        <Heading>
          Product and Service <Highlight>Transformation</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Augmenting existing products with predictive maintenance and
            intelligent features.
          </ListItem>
          <ListItem>
            Shifting from selling discrete products to offering continuous,
            AI-enhanced services.
          </ListItem>
          <ListItem>
            The transition from static offerings to learning, evolving
            solutions.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* The Economics of AI */}
      <Slide quizData={quizBySlideId["the-economics-of-ai"]}>
        <Heading>
          The <Highlight>Economics</Highlight> of AI
        </Heading>
        <AnimatedList>
          <ListItem>
            High fixed costs of model development paired with near-zero marginal
            costs of deployment.
          </ListItem>
          <ListItem>
            Economies of scale are amplified by network effects in data
            accumulation.
          </ListItem>
          <ListItem>
            Understanding the diminishing returns of data volume versus data
            quality.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Capturing Value from Ecosystems */}
      <Slide>
        <Heading>
          Capturing Value from <Highlight>Ecosystems</Highlight>
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Competing as an ecosystem orchestrator rather than a standalone
                firm.
              </ListItem>
              <ListItem>
                Leveraging AI to optimize partner interactions and platform
                dynamics.
              </ListItem>
              <ListItem>
                Data sharing agreements become critical strategic assets.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              How should a firm balance data sharing for ecosystem growth
              against the risk of leaking competitive advantage?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Pricing Strategy in the AI Era */}
      <Slide>
        <Heading>
          Pricing Strategy in the <Highlight>AI Era</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Moving from fixed pricing to dynamic, algorithmic pricing models.
          </ListItem>
          <ListItem>
            Capturing consumer surplus through personalized pricing based on
            willingness to pay.
          </ListItem>
          <ListItem>
            Managing the ethical and regulatory risks of algorithmic price
            discrimination.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Metrics for AI Strategy */}
      <Slide>
        <Heading>
          Metrics for <Highlight>AI Strategy</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Traditional financial metrics lag behind the leading indicators of
            AI success.
          </ListItem>
          <ListItem>
            New KPIs must focus on algorithmic accuracy, data acquisition rates,
            and model deployment speed.
          </ListItem>
          <ListItem>
            Measuring the strategic alignment of AI projects with core business
            objectives.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 3: Competitive Advantage in the AI Era */}
      <Slide className="items-center justify-center text-center">
        <Tag>Part 3</Tag>
        <Heading>
          <Highlight>Competitive Advantage</Highlight> in the AI Era
        </Heading>
        <AnimatedList>
          <ListItem>Sustaining leadership in rapidly evolving markets</ListItem>
          <ListItem>
            The role of proprietary data and algorithmic network effects
          </ListItem>
          <ListItem>Navigating the build versus buy strategic dilemma</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Data Moat Fallacy */}
      <Slide quizData={quizBySlideId["the-data-moat-fallacy"]}>
        <Heading>
          The <Highlight>Data Moat</Highlight> Fallacy
        </Heading>
        <Callout variant="secondary" className="max-w-4xl">
          Accumulating massive volumes of generic data does not guarantee a
          durable advantage.
        </Callout>
        <AnimatedList>
          <ListItem>
            Competitors can often purchase or synthesize similar datasets.
          </ListItem>
          <ListItem>
            True advantage stems from exclusive, domain-specific data tied to
            proprietary workflows.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Algorithmic Network Effects */}
      <Slide>
        <Heading>
          Algorithmic <Highlight>Network Effects</Highlight>
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                The cycle where better algorithms attract more users, generating
                better data.
              </ListItem>
              <ListItem>
                This improved data further refines the algorithms, creating a
                virtuous cycle.
              </ListItem>
              <ListItem>
                Breaking into markets dominated by established algorithmic
                network effects is exceptionally difficult.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              If a competitor has a five-year head start on algorithmic network
              effects, what asymmetric strategies can a challenger employ?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Strategic Positioning */}
      <Slide>
        <Heading>
          Strategic <Highlight>Positioning</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Choosing between competing on cost leadership or differentiation
            using AI.
          </ListItem>
          <ListItem>
            AI can uniquely enable firms to pursue both simultaneously, breaking
            traditional strategic trade-offs.
          </ListItem>
          <ListItem>
            The emergence of the "smart niche" strategy tailored to highly
            specific customer segments.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* The Build versus Buy Dilemma */}
      <Slide quizData={quizBySlideId["the-build-versus-buy-dilemma"]}>
        <Heading>
          The <Highlight>Build versus Buy</Highlight> Dilemma
        </Heading>
        <AnimatedList>
          <ListItem>
            Purchasing AI solutions offers speed to market but limits strategic
            differentiation.
          </ListItem>
          <ListItem>
            Building custom models requires significant capital and talent but
            secures proprietary advantage.
          </ListItem>
          <ListItem>
            Organizations must map their core competencies to determine where to
            build and where to buy.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Open Source Strategy */}
      <Slide>
        <Heading>
          <Highlight>Open Source</Highlight> Strategy
        </Heading>
        <AnimatedList>
          <ListItem>
            Leveraging open source models accelerates development and reduces
            fixed costs.
          </ListItem>
          <ListItem>
            Contributing to open source can attract top talent and establish
            industry standards.
          </ListItem>
          <ListItem>
            The strategic risk involves reliance on external ecosystems that the
            firm does not control.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Disruptive AI Innovation */}
      <Slide>
        <Heading>
          <Highlight>Disruptive</Highlight> AI Innovation
        </Heading>
        <AnimatedList>
          <ListItem>
            Anticipating how AI enables non-traditional competitors to enter the
            market.
          </ListItem>
          <ListItem>
            AI lowers the barriers to entry in industries traditionally
            protected by scale.
          </ListItem>
          <ListItem>
            Incumbents must leverage their existing customer base and domain
            expertise defensively.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 4: AI Operating Models and Organization */}
      <Slide className="items-center justify-center text-center">
        <Tag>Part 4</Tag>
        <Heading>
          AI Operating Models and <Highlight>Organization</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>Structuring the firm for AI readiness</ListItem>
          <ListItem>
            Aligning talent, technology, and organizational design
          </ListItem>
          <ListItem>Fostering an AI-native corporate culture</ListItem>
        </AnimatedList>
      </Slide>

      {/* The AI Operating Model */}
      <Slide quizData={quizBySlideId["the-ai-operating-model"]}>
        <Heading>
          The AI <Highlight>Operating Model</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Shifting from siloed departments to cross-functional,
            product-oriented squads.
          </ListItem>
          <ListItem>
            Integrating data engineering, data science, and business strategy
            roles.
          </ListItem>
          <ListItem>
            The operating model must optimize for rapid iteration and continuous
            learning.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Centralized versus Decentralized AI */}
      <Slide>
        <Heading>
          <Highlight>Centralized versus Decentralized</Highlight> AI
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>Centralized</ContentTitle>
              <ContentDescription>
                Centers of excellence ensure standard practices and resource
                efficiency.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>Decentralized</ContentTitle>
              <ContentDescription>
                Embeds AI capabilities directly into business units for faster
                execution.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="secondary">
              A hybrid approach often balances governance with agility.
            </Callout>
          </Column>
        </Row>
      </Slide>

      {/* Talent Strategy and Acquisition */}
      <Slide>
        <Heading>
          Talent <Highlight>Strategy</Highlight> and Acquisition
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                The scarcity of specialized AI talent requires innovative
                recruitment and retention strategies.
              </ListItem>
              <ListItem>
                Upskilling the existing workforce is as critical as hiring new
                experts.
              </ListItem>
              <ListItem>
                Building a culture that bridges the communication gap between
                technical and business teams.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              Should business units have their own data scientists, or should
              they request resources from a central pool, and how does this
              impact strategic alignment?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Agile AI Development */}
      <Slide>
        <Heading>
          <Highlight>Agile</Highlight> AI Development
        </Heading>
        <AnimatedList>
          <ListItem>
            Traditional software development methodologies are insufficient for
            probabilistic AI projects.
          </ListItem>
          <ListItem>
            Embracing experimentation, failure, and rapid prototyping.
          </ListItem>
          <ListItem>
            Managing the lifecycle from proof of concept to enterprise scale
            deployment.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Data Governance as Strategy */}
      <Slide>
        <Heading>
          <Highlight>Data Governance</Highlight> as Strategy
        </Heading>
        <AnimatedList>
          <ListItem>
            Data governance is no longer just a compliance function; it is a
            strategic enabler.
          </ListItem>
          <ListItem>
            Ensuring data quality, lineage, and accessibility across the
            organization.
          </ListItem>
          <ListItem>
            Establishing clear ownership and accountability for data assets.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Cultivating an AI Culture */}
      <Slide>
        <Heading>
          Cultivating an <Highlight>AI Culture</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Shifting the organizational mindset from deterministic rules to
            probabilistic outcomes.
          </ListItem>
          <ListItem>
            Encouraging data-driven decision making at all levels of the
            hierarchy.
          </ListItem>
          <ListItem>
            Overcoming institutional resistance to automated decision systems.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Part 5: Strategy Execution and Risk Management */}
      <Slide className="items-center justify-center text-center">
        <Tag>Part 5</Tag>
        <Heading>
          Strategy <Highlight>Execution</Highlight> and Risk Management
        </Heading>
        <AnimatedList>
          <ListItem>Translating AI strategy into operational reality</ListItem>
          <ListItem>
            Navigating the ethical, legal, and operational risks
          </ListItem>
          <ListItem>Ensuring long-term strategic resilience</ListItem>
        </AnimatedList>
      </Slide>

      {/* The Execution Gap */}
      <Slide quizData={quizBySlideId["the-execution-gap"]}>
        <Heading>
          The <Highlight>Execution Gap</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Many AI strategies fail during the transition from pilot to
            production.
          </ListItem>
          <ListItem>
            Lack of integration with legacy systems often stalls deployment.
          </ListItem>
          <ListItem>
            Successful execution requires rigorous change management and
            stakeholder alignment.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Managing Algorithmic Risk */}
      <Slide>
        <Heading>
          Managing <Highlight>Algorithmic Risk</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            AI models can degrade over time as the external environment changes.
          </ListItem>
          <ListItem>
            Implementing robust monitoring systems to detect model drift and
            data bias.
          </ListItem>
          <ListItem>
            Establishing fallback mechanisms when automated systems fail.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Strategic Agility */}
      <Slide>
        <Heading>
          Strategic <Highlight>Agility</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            AI accelerates market dynamics, requiring firms to rapidly pivot
            their strategies.
          </ListItem>
          <ListItem>
            Building continuous sensing capabilities to monitor competitive
            movements.
          </ListItem>
          <ListItem>
            The capacity to reallocate resources dynamically based on predictive
            insights.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Regulatory Strategy */}
      <Slide>
        <Heading>
          <Highlight>Regulatory</Highlight> Strategy
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Navigating the evolving landscape of global AI regulations and
                compliance standards.
              </ListItem>
              <ListItem>
                Proactively engaging with policymakers to shape industry
                standards.
              </ListItem>
              <ListItem>
                Treating privacy and ethical compliance as a competitive
                differentiator rather than a constraint.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              If a new regulation heavily restricts your primary algorithmic
              advantage, how do you pivot the corporate strategy without losing
              market share?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* AI and Corporate Social Responsibility */}
      <Slide>
        <Heading>
          AI and <Highlight>Corporate Social Responsibility</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            The ethical implications of AI deployment, including bias, fairness,
            and job displacement.
          </ListItem>
          <ListItem>
            Aligning the AI strategy with the broader environmental, social, and
            governance goals.
          </ListItem>
          <ListItem>
            Building trust with customers and stakeholders through transparent
            AI practices.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* The Future Strategic Horizon */}
      <Slide>
        <Heading>
          The Future <Highlight>Strategic Horizon</Highlight>
        </Heading>
        <AnimatedList>
          <ListItem>
            Preparing for the integration of generative AI and autonomous agents
            into core strategy.
          </ListItem>
          <ListItem>
            The shift from human-machine collaboration to autonomous
            organizational units.
          </ListItem>
          <ListItem>
            Sustaining strategic advantage in a completely AI-saturated market.
          </ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}
