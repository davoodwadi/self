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
  MediaBlock,
} from "@/components/SlideComponents";
import { BackgroundManager } from "@/components/Backgrounds";
import Mermaid from "@/components/MermaidDiagram";

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
        <Grid gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              Artificial Intelligence does not exist in a vacuum; it learns from
              historical data.
            </ContentText>
            <Callout variant="secondary">
              When that data contains societal biases, prejudices, and systemic
              inequalities, AI systems not only replicate but often amplify
              these flaws at scale.
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <MediaBlock
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
              alt="Digital representation of human society and AI"
              caption="AI reflects the data it is fed, acting as a mirror to society."
            />
          </Column>
        </Grid>
      </Slide>

      {/* Slide 3 (NEW) */}
      <Slide>
        <Tag>Conceptual Flow</Tag>
        <Heading>
          The <Highlight>Reflection</Highlight> Process
        </Heading>
        <Grid gap="large" items="center">
          <Column spanRatio="1/3">
            <ContentText layout="base">
              AI doesn't create bias out of nowhere; it absorbs and scales
              existing human patterns from historical records.
            </ContentText>
          </Column>
          <Column spanRatio="2/3">
            <Mermaid
              chart={`flowchart LR
    S[Societal Prejudices<br>& Inequalities] -->|Digitized into| D(Historical Data)
    D -->|Used to Train| M[AI Models]
    M -->|Automates & Scales| R((Amplified Flaws))
    
    style S fill:#fbeaea,stroke:#8B0000,stroke-width:2px
    style D fill:#fff,stroke:#1A1A1D,stroke-width:2px
    style M fill:#fff,stroke:#1A1A1D,stroke-width:2px
    style R fill:#fef7e0,stroke:#8B0000,stroke-width:4px`}
            />
          </Column>
        </Grid>
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
            <Quote>It is a massive operational and reputational risk.</Quote>
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

      {/* Slide 8 (NEW) */}
      <Slide>
        <Tag>Conceptual Flow</Tag>
        <Heading>
          The <Highlight>Bias</Highlight> Feedback Loop
        </Heading>
        <Grid gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              The three vectors interact dynamically. Biased training data feeds
              the algorithm, which produces skewed decisions. These decisions
              generate new data, reinforcing the original bias in a continuous
              feedback loop.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <Mermaid
              chart={`flowchart TD
    A[Historical Data Skew] -->|Vector 1| B(Algorithmic Optimization)
    B -->|Vector 2| C[Biased Predictions & Decisions]
    C -->|Real-world Actions| D((New Skewed Data))
    D -.->|Vector 3: Feedback Loop| A
    
    style A fill:#fbeaea,stroke:#8B0000,stroke-width:2px
    style B fill:#fff,stroke:#1A1A1D,stroke-width:2px
    style C fill:#fbeaea,stroke:#8B0000,stroke-width:2px
    style D fill:#fef7e0,stroke:#D4AF37,stroke-width:2px`}
            />
          </Column>
        </Grid>
      </Slide>

      {/* Slide 9 */}
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

      {/* Slide 10 (NEW) */}
      <Slide>
        <Tag>Metric Comparison</Tag>
        <Heading>
          Parity vs. <Highlight>Opportunity</Highlight>
        </Heading>
        <Grid gap="large" items="center">
          <Column spanRatio="1/3">
            <ContentText layout="base">
              Demographic Parity focuses on equal outcomes regardless of
              qualifications. Equal Opportunity ensures equal outcomes for
              equally qualified candidates.
            </ContentText>
          </Column>
          <Column spanRatio="2/3">
            <Mermaid
              chart={`flowchart TD
    A[Applicant Pool] --> DP(Demographic Parity)
    A --> EO(Equal Opportunity)
    
    DP -->|Selection rate| DP1[50% Group A Selected]
    DP -->|Selection rate| DP2[50% Group B Selected]
    
    EO -->|Qualified applicants| Q[Qualified Pool]
    Q -->|Selection rate| EO1[80% Qualified Group A Selected]
    Q -->|Selection rate| EO2[80% Qualified Group B Selected]
    
    style DP fill:#fef7e0,stroke:#D4AF37,stroke-width:2px
    style EO fill:#fef7e0,stroke:#D4AF37,stroke-width:2px
    style DP1 fill:#fff,stroke:#1A1A1D,stroke-width:1px
    style DP2 fill:#fff,stroke:#1A1A1D,stroke-width:1px
    style EO1 fill:#fff,stroke:#1A1A1D,stroke-width:1px
    style EO2 fill:#fff,stroke:#1A1A1D,stroke-width:1px
    style Q fill:#fbeaea,stroke:#8B0000,stroke-width:1px`}
            />
          </Column>
        </Grid>
      </Slide>

      {/* Slide 10 */}
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

      {/* Slide 11 */}
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

      {/* Slide 12 */}
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

      {/* Slide 13 (NEW) */}
      <Slide>
        <Tag>Decision Path</Tag>
        <Heading>
          The <Highlight>Diverging</Highlight> Paths
        </Heading>
        <Grid gap="large" items="center">
          <Column spanRatio="1/3">
            <ContentText layout="base">
              A business faces two distinct paths: allowing unchecked bias or
              intentionally building for inclusion.
            </ContentText>
          </Column>
          <Column spanRatio="2/3">
            <Mermaid
              chart={`flowchart LR
    Start{AI Strategy} -->|Unchecked Bias| B[Discriminatory Outcomes]
    Start -->|EDII Integration| I[Inclusive Products]
    
    B --> C1(Regulatory Fines)
    B --> C2(Loss of Trust)
    B --> C3(PR Disasters)
    
    I --> R1(Robust Global Products)
    I --> R2(New Markets)
    I --> R3(Reliable Performance)
    
    style Start fill:#1A1A1D,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#fbeaea,stroke:#8B0000,stroke-width:2px
    style I fill:#fef7e0,stroke:#D4AF37,stroke-width:2px
    style C1 fill:#fff,stroke:#8B0000,stroke-width:1px
    style C2 fill:#fff,stroke:#8B0000,stroke-width:1px
    style C3 fill:#fff,stroke:#8B0000,stroke-width:1px
    style R1 fill:#fff,stroke:#D4AF37,stroke-width:1px
    style R2 fill:#fff,stroke:#D4AF37,stroke-width:1px
    style R3 fill:#fff,stroke:#D4AF37,stroke-width:1px`}
            />
          </Column>
        </Grid>
      </Slide>

      {/* Slide 13 */}
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

      {/* Slide 14 */}
      <Slide>
        <Tag>Indigeneity</Tag>
        <Heading>
          Indigeneity & Data <Highlight>Sovereignty</Highlight>
        </Heading>
        <Grid gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              A critical, often overlooked pillar of EDII is Indigeneity,
              particularly concerning data rights.
            </ContentText>
            <Card>
              <ContentTitle>Data Colonialism</ContentTitle>
              <ContentDescription>
                The extraction of data from Indigenous communities without
                consent or benefit to those communities.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <MediaBlock
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
              alt="Global network representing data connectivity"
              caption="Data rights are fundamentally human rights."
            />
          </Column>
        </Grid>
      </Slide>

      {/* Slide 15 */}
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

      {/* Slide 16 (NEW) */}
      <Slide>
        <Tag>Conceptual Framework</Tag>
        <Heading>
          OCAP <Highlight>Architecture</Highlight>
        </Heading>
        <Grid gap="large" items="center">
          <Column spanRatio="1/3">
            <ContentText layout="base">
              The OCAP principles form a unified structural framework ensuring
              communities remain at the center of their data lifecycle.
            </ContentText>
          </Column>
          <Column spanRatio="2/3">
            <Mermaid
              chart={`flowchart TD
    OCAP{OCAP Principles}
    OCAP --> O[Ownership]
    OCAP --> C[Control]
    OCAP --> A[Access]
    OCAP --> P[Possession]
    
    O --> O1(Collective relationship<br>to cultural knowledge)
    C --> C1(Right to govern<br>how data is used)
    A --> A1(Community availability<br>to their own data)
    P --> P1(Physical jurisdiction<br>and stewardship)
    
    style OCAP fill:#1A1A1D,stroke:#333,stroke-width:2px,color:#fff
    style O fill:#fef7e0,stroke:#D4AF37,stroke-width:2px
    style C fill:#fef7e0,stroke:#D4AF37,stroke-width:2px
    style A fill:#fef7e0,stroke:#D4AF37,stroke-width:2px
    style P fill:#fef7e0,stroke:#D4AF37,stroke-width:2px`}
            />
          </Column>
        </Grid>
      </Slide>

      {/* Slide 17 */}
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

      {/* Slide 18 */}
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

      {/* Slide 19 */}
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

      {/* Slide 20 (NEW) */}
      <Slide>
        <Tag>Process Workflow</Tag>
        <Heading>
          Equitable AI <Highlight>Lifecycle</Highlight>
        </Heading>
        <Subtitle variant="section">
          Integrating mitigation strategies into the development pipeline.
        </Subtitle>
        <Mermaid
          chart={`flowchart LR
    A[Data Collection] --> B[Model Training]
    B --> C[Deployment]
    C --> D[Operations]
    D -.->|Continuous Monitoring| A
    
    A1([Mandate Diverse Teams]) --> A
    B1([Implement AI Audits]) --> B
    C1([Human-in-the-Loop]) --> C
    D1([Transparent Governance]) --> D
    
    style A fill:#fff,stroke:#1A1A1D,stroke-width:2px
    style B fill:#fff,stroke:#1A1A1D,stroke-width:2px
    style C fill:#fff,stroke:#1A1A1D,stroke-width:2px
    style D fill:#fff,stroke:#1A1A1D,stroke-width:2px
    style A1 fill:#fbeaea,stroke:#8B0000,stroke-width:1px
    style B1 fill:#fbeaea,stroke:#8B0000,stroke-width:1px
    style C1 fill:#fbeaea,stroke:#8B0000,stroke-width:1px
    style D1 fill:#fbeaea,stroke:#8B0000,stroke-width:1px`}
        />
      </Slide>

      {/* Slide 21 */}
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
