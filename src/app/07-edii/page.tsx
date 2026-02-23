import {
  SlideDeck,
  Slide,
  Title,
  Subtitle,
  Heading,
  Highlight,
  Tag,
  ContentText,
  Grid,
  Column,
  Card,
  ContentTitle,
  ContentDescription,
  DiscussionCard,
  Quote,
  AnimatedList,
  ListItem,
  Callout,
} from "@/components/SlideComponents";
import { BackgroundManager } from "@/components/Backgrounds";

export default function Presentation() {
  return (
    <SlideDeck background={<BackgroundManager type="edii" />}>
      {/* Slide 1 */}
      <Slide>
        <Tag>Week 7</Tag>
        <Title>EDII in AI</Title>
        <Subtitle variant="hero">
          Equity, Diversity, Inclusion, and Indigeneity
        </Subtitle>
      </Slide>

      {/* Slide 2 */}
      <Slide>
        <Tag>The Problem</Tag>
        <Heading>
          AI as a Mirror of <Highlight>Society</Highlight>
        </Heading>
        <ContentText layout="prose">
          Artificial Intelligence does not exist in a vacuum; it learns from
          historical data.
        </ContentText>
        <Callout variant="secondary">
          When that data contains societal biases, prejudices, and systemic
          inequalities, AI systems not only replicate but often amplify these
          flaws at scale.
        </Callout>
      </Slide>

      {/* Slide 3 */}
      <Slide>
        <Tag>The Problem</Tag>
        <Heading>The Operational Risk</Heading>
        <Grid gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              For business leaders, deploying biased AI isn't just an ethical
              failure.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Quote author="Business Reality" role="The Market">
              It is a massive operational and reputational risk.
            </Quote>
          </Column>
        </Grid>
      </Slide>

      {/* Slide 4 */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>
          The Cost of <Highlight>Failure</Highlight>
        </Heading>
        <DiscussionCard title="Group Discussion">
          Can you think of a time a brand suffered a major PR crisis due to an
          automated system or algorithm making a biased decision? How did it
          impact their bottom line?
        </DiscussionCard>
      </Slide>

      {/* Slide 5 */}
      <Slide>
        <Tag>Technical Concept</Tag>
        <Heading>
          How Algorithms Learn <Highlight>Bias</Highlight>
        </Heading>
        <Subtitle variant="section">
          To solve the problem, we must understand how it occurs.
        </Subtitle>
        <ContentText layout="prose">
          Bias enters AI systems through three primary vectors.
        </ContentText>
      </Slide>

      {/* Slide 6 */}
      <Slide>
        <Tag>Technical Concept</Tag>
        <Heading>
          Vector 1: <Highlight>Training Data Bias</Highlight>
        </Heading>
        <Grid gap="large">
          <Column>
            <Card>
              <ContentTitle>Historical Skew</ContentTitle>
              <ContentDescription>
                If a hiring algorithm is trained on 10 years of resumes where
                80% of successful candidates were male, the AI learns that being
                male is a predictor of success.
              </ContentDescription>
            </Card>
          </Column>
        </Grid>
      </Slide>

      {/* Slide 7 */}
      <Slide>
        <Tag>Technical Concept</Tag>
        <Heading>Vectors 2 & 3</Heading>
        <Grid gap="medium">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>Algorithmic Bias</ContentTitle>
              <ContentDescription>
                Weightings and optimization functions might inadvertently favor
                majority groups because the model optimizes for overall
                accuracy, ignoring minority edge cases.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>Feedback Loops</ContentTitle>
              <ContentDescription>
                A predictive algorithm over-targets a demographic, resulting in
                more historical actions, which feeds back into the system to
                justify even more targeting.
              </ContentDescription>
            </Card>
          </Column>
        </Grid>
      </Slide>

      {/* Slide 8 */}
      <Slide>
        <Tag>Technical Concept</Tag>
        <Heading>
          Measuring <Highlight>Fairness</Highlight>
        </Heading>
        <Subtitle variant="section">
          Simplified metrics for complex models.
        </Subtitle>
        <AnimatedList>
          <ListItem>
            <strong>Demographic Parity:</strong> Does the algorithm produce the
            same positive outcome rate across all groups?
          </ListItem>
          <ListItem>
            <strong>Equal Opportunity:</strong> Are the true positive rates
            equal? (e.g., highly qualified candidates from any background have
            the same chance of being selected).
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Slide 9 */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>
          The Ethics of <Highlight>Deployment</Highlight>
        </Heading>
        <DiscussionCard title="Strategic Decision">
          If an AI model achieves 99% overall accuracy, but has a 40% error rate
          for a specific minority demographic, is the model "ready for
          deployment"? Who makes that call in your organization?
        </DiscussionCard>
      </Slide>

      {/* Slide 10 */}
      <Slide>
        <Tag>Business Impact</Tag>
        <Heading>
          ROI of <Highlight>Inclusive AI</Highlight>
        </Heading>
        <Subtitle variant="section">
          EDII in AI is not just a compliance checkbox.
        </Subtitle>
        <Callout variant="primary">It is a competitive advantage.</Callout>
      </Slide>

      {/* Slide 11 */}
      <Slide>
        <Tag>Business Impact</Tag>
        <Heading>
          Cost vs. <Highlight>Inclusion</Highlight>
        </Heading>
        <Grid gap="medium">
          <Column spanRatio="1/2">
            <Card title="The Cost of Bias" subtitle="Liability">
              Fines from regulators (like the EU AI Act), lawsuits, loss of
              customer trust, and PR disasters. An algorithm that discriminates
              is fundamentally a broken product.
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card title="The ROI of Inclusion" subtitle="Innovation">
              Diverse datasets and engineering teams build robust, globally
              applicable products. Inclusive AI opens unserved markets. Audited
              algorithms perform more reliably.
            </Card>
          </Column>
        </Grid>
      </Slide>

      {/* Slide 12 */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>
          Measuring <Highlight>Value</Highlight>
        </Heading>
        <DiscussionCard title="Boardroom Strategy">
          How would you measure the ROI of investing in an AI Ethics and
          Diversity board for a mid-sized tech company? What KPIs would you
          track?
        </DiscussionCard>
      </Slide>

      {/* Slide 13 */}
      <Slide>
        <Tag>Indigeneity</Tag>
        <Heading>
          Indigeneity & Data <Highlight>Sovereignty</Highlight>
        </Heading>
        <ContentText layout="prose">
          A critical, often overlooked pillar of EDII is Indigeneity,
          particularly concerning data rights.
        </ContentText>
        <Card>
          <ContentTitle>Data Colonialism</ContentTitle>
          <ContentDescription>
            The extraction of data from Indigenous communities without consent
            or benefit to those communities.
          </ContentDescription>
        </Card>
      </Slide>

      {/* Slide 14 */}
      <Slide>
        <Tag>Indigeneity</Tag>
        <Heading>
          The <Highlight>OCAP</Highlight> Principles
        </Heading>
        <Subtitle variant="section">
          First Nations principles asserting control over data collection and
          usage.
        </Subtitle>
        <AnimatedList>
          <ListItem>
            <strong>Ownership:</strong> The community owns its information
            collectively.
          </ListItem>
          <ListItem>
            <strong>Control:</strong> First Nations communities control how
            information is collected, used, and disclosed.
          </ListItem>
          <ListItem>
            <strong>Access:</strong> First Nations must have access to
            information and data about themselves.
          </ListItem>
          <ListItem>
            <strong>Possession:</strong> First Nations must have physical
            control of the data.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Slide 15 */}
      <Slide>
        <Tag>Indigeneity</Tag>
        <Heading>
          Data as <Highlight>Sovereign Right</Highlight>
        </Heading>
        <Callout variant="secondary">
          Business leaders must recognize that data is not just "fuel" for AI;
          it represents people, cultures, and sovereign rights.
        </Callout>
      </Slide>

      {/* Slide 16 */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>
          Navigating <Highlight>Scraping</Highlight>
        </Heading>
        <DiscussionCard title="Ethics in Training">
          If your company wants to train an LLM on historical cultural texts,
          including Indigenous knowledge, how do you navigate data scraping
          versus data sovereignty?
        </DiscussionCard>
      </Slide>

      {/* Slide 17 */}
      <Slide>
        <Tag>Leadership</Tag>
        <Heading>
          Mitigation <Highlight>Strategies</Highlight>
        </Heading>
        <Subtitle variant="section">
          How do we lead teams to build equitable AI?
        </Subtitle>
        <AnimatedList>
          <ListItem>
            <strong>Mandate Diverse Teams:</strong> Diversity in thought catches
            edge cases before they ship.
          </ListItem>
          <ListItem>
            <strong>Implement AI Audits:</strong> Third-party auditing should be
            standard.
          </ListItem>
          <ListItem>
            <strong>Human-in-the-Loop (HITL):</strong> High-stakes decisions
            must always have a human override.
          </ListItem>
          <ListItem>
            <strong>Transparent Governance:</strong> Establish clear ethical
            guidelines and accountability.
          </ListItem>
        </AnimatedList>
      </Slide>

      {/* Slide 18 */}
      <Slide>
        <Tag>Discussion</Tag>
        <Heading>
          Vendor <Highlight>Accountability</Highlight>
        </Heading>
        <DiscussionCard title="The Executive View">
          As a future business leader, what is the very first question you will
          ask a vendor selling you a "black box" AI solution for your HR
          department?
        </DiscussionCard>
      </Slide>
    </SlideDeck>
  );
}
