"use client";

import {
  AnimatedList,
  Callout,
  Card,
  Column,
  ContentDescription,
  ContentText,
  ContentTitle,
  DiscussionCard,
  Heading,
  Highlight,
  ListItem,
  Metric,
  Quote,
  Row,
  Slide,
  SlideDeck,
  Subtitle,
  Tag,
  Title,
} from "@/app/(courses-ai)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses-ai)/_components/Backgrounds";
import { createCourseQuizLookup } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";

export default function Week1Introduction() {
  const quizBySlideId = createCourseQuizLookup(quizzesData);

  return (
    <SlideDeck background={<BackgroundManager type="introduction" />}>
      <Slide
        id="title-slide"
        className="flex flex-col items-center justify-center text-center"
      >
        <Title>Applications of AI in Business</Title>
        <Subtitle variant="hero">Introduction</Subtitle>
        <AnimatedList className="mt-12 text-xl space-y-6">
          <ListItem>
            A recap of AI fundamentals for MBA and executive audiences
          </ListItem>
          <ListItem>
            Framing the managerial questions that will carry through the rest of the course
          </ListItem>
        </AnimatedList>
      </Slide>

      <Slide
        id="the-strategic-case-for-ai"
        border
        quizData={quizBySlideId["the-strategic-case-for-ai"]}
      >
        <Tag>Week 1</Tag>
        <Heading>
          The <Highlight>Strategic</Highlight> Case for AI
        </Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Quote>
              The executive question is not whether AI exists, but where it creates measurable business advantage.
            </Quote>
          </Column>
          <Column spanRatio="1/2" className="justify-center">
            <AnimatedList>
              <ListItem>
                Changes how firms make decisions, scale expertise, and redesign workflows.
              </ListItem>
              <ListItem>
                Shows up through revenue growth, cost reduction, risk control, and faster learning cycles.
              </ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="what-ai-is-and-is-not"
        border
        quizData={quizBySlideId["what-ai-is-and-is-not"]}
      >
        <Tag>Foundations</Tag>
        <Heading>
          What AI <Highlight>Is</Highlight>, and Is Not
        </Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <Card className="h-full">
              <ContentTitle>What It Is</ContentTitle>
              <ContentDescription>
                Systems that perform tasks associated with perception, prediction, language, recommendation, or generation.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card className="h-full border-l-4 border-l-[var(--charcoal-light)]">
              <ContentTitle>What It Is Not</ContentTitle>
              <ContentDescription>
                Magic, autonomous wisdom, or a substitute for managerial accountability.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <Callout variant="secondary" className="mt-8">
          Most business value comes from pairing statistical systems with clear process design and human judgment.
        </Callout>
      </Slide>

      <Slide id="the-ai-family-tree" border>
        <Tag>Concept Map</Tag>
        <Heading>
          The AI <Highlight>Family Tree</Highlight>
        </Heading>
        <Row gap="medium">
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Artificial Intelligence</ContentTitle>
              <ContentDescription>
                Artificial Intelligence is the broad umbrella that includes machine learning, deep learning, and generative AI.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>Machine Learning</ContentTitle>
              <ContentDescription>
                Machine learning focuses on learning patterns from data rather than following only hard-coded rules.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Deep Learning</ContentTitle>
              <ContentDescription>
                Deep learning is a more specialized approach that becomes especially useful with complex data such as images, speech, and language.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>Generative AI</ContentTitle>
              <ContentDescription>
                Generative AI produces new text, images, code, or designs rather than only classifying or predicting.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="three-business-tasks-ai-does-best"
        border
        quizData={quizBySlideId["three-business-tasks-ai-does-best"]}
      >
        <Tag>Core Tasks</Tag>
        <Heading>
          Three Business Tasks AI Does <Highlight>Best</Highlight>
        </Heading>
        <Row gap="medium">
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>Prediction</ContentTitle>
              <ContentDescription>
                Prediction: estimating what is likely to happen next, such as churn, demand, or fraud.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>Classification</ContentTitle>
              <ContentDescription>
                Classification: assigning items to categories, such as sentiment, risk level, or document type.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>Generation</ContentTitle>
              <ContentDescription>
                Generation: creating drafts, options, summaries, or designs that accelerate human work.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="the-business-value-chain-of-ai" border>
        <Tag>Value Creation</Tag>
        <Heading>
          The Business <Highlight>Value Chain</Highlight> of AI
        </Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/3">
            <Metric value="1" label="The Catalyst" />
            <ContentText className="mt-4">
              Improves a business decision, customer interaction, or operational workflow.
            </ContentText>
          </Column>
          <Column spanRatio="1/3">
            <Metric value="2" label="The Advantage" />
            <ContentText className="mt-4">
              Comes from embedding technology into repeatable, proprietary processes.
            </ContentText>
          </Column>
          <Column spanRatio="1/3">
            <Metric value="3" label="The Outcome" />
            <ContentText className="mt-4">
              Connects a model output to a clear action, owner, and measurable result.
            </ContentText>
          </Column>
        </Row>
      </Slide>

      <Slide id="data-the-fuel-the-constraint-the-differentiator" border>
        <Tag>Data</Tag>
        <Heading>
          Data: The <Highlight>Fuel</Highlight>, the Constraint, the Differentiator
        </Heading>
        <Row gap="large" className="mt-8 items-center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Depends entirely on access to relevant, timely, and trustworthy data.
              </ListItem>
              <ListItem>
                Poor data quality can render a sophisticated model less useful than a simple heuristic.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <Callout variant="secondary">
              <Highlight>The Differentiator:</Highlight> Firms with better data access, cleaner processes, and stronger governance often outperform those with more ambitious models.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="how-ai-systems-learn-from-patterns" border>
        <Tag>Mechanics</Tag>
        <Heading>
          How AI Systems Learn from <Highlight>Patterns</Highlight>
        </Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>1. Training</ContentTitle>
              <ContentDescription>
                Trained on historical examples to detect statistical regularities.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full">
              <ContentTitle>2. Application</ContentTitle>
              <ContentDescription>
                Learned patterns are applied to new, unseen cases. Performance relies on condition similarity.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full border-b-4 border-b-[var(--crimson)]">
              <ContentTitle>3. Limitation</ContentTitle>
              <ContentDescription>
                Models do not understand context; they only optimize against the patterns they have seen.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="where-human-judgment-still-matters" border>
        <Tag>Leadership</Tag>
        <Heading>
          Where Human <Highlight>Judgment</Highlight> Still Matters
        </Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2" className="justify-center">
            <Quote>
              The strongest operating model is not human versus machine, but human judgment amplified by machine speed.
            </Quote>
          </Column>
          <Column spanRatio="1/2">
            <Card className="h-full">
              <ContentTitle>The Executive Role</ContentTitle>
              <AnimatedList className="mt-4">
                <ListItem>Define the goal and acceptable tradeoffs.</ListItem>
                <ListItem>Assess the consequences of failure.</ListItem>
                <ListItem>Govern decisions affecting reputation, fairness, safety, or capital allocation.</ListItem>
              </AnimatedList>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="discussion-human-judgment" border>
        <Tag>Discussion</Tag>
        <Heading>
          Discussion: Human <Highlight>Judgment</Highlight>
        </Heading>
        <DiscussionCard title="Group Discussion" className="mt-8">
          A highly accurate AI model flags a long-time, high-value vendor for contract termination due to sudden risk indicators. Do you automate the termination to prevent immediate loss, or require human review despite the delay?
        </DiscussionCard>
      </Slide>

      <Slide id="the-limits-of-ai-in-real-organizations" border>
        <Tag>Reality Check</Tag>
        <Heading>
          The Limits of AI in Real <Highlight>Organizations</Highlight>
        </Heading>
        <Row gap="medium" className="m-8">
          <Column spanRatio="1/2">
            <Card className="h-full">
              <ContentTitle>Brittleness</ContentTitle>
              <ContentDescription>
                AI systems can falter when customer behavior, market conditions, or internal processes unexpectedly change.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card className="h-full">
              <ContentTitle>Opacity</ContentTitle>
              <ContentDescription>
                Models can make confident but incorrect predictions for reasons that are entirely opaque to non-technical operators.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <Callout variant="secondary" className="mt-6">
          <Highlight>The Implementation Gap:</Highlight> Many failures stem from workflow misalignment, weak adoption, or unclear ownership rather than the algorithm itself.
        </Callout>
      </Slide>

      <Slide id="the-tradeoff-accuracy-explainability-and-control" border> 
        <Tag>Governance</Tag>
        <Heading>
          The Tradeoff: <Highlight>Accuracy</Highlight>, Explainability, and Control
        </Heading>
        <Row gap="large" className="mt-12 items-center">
          <Column spanRatio="1/3">
            <Metric value="High" label="Accuracy" />
            <ContentText className="mt-4 text-center text-sm md:text-sm text-[var(--charcoal-light)]">Deep Learning / Black Box</ContentText>
          </Column>
          <Column spanRatio="1/3">
            <ContentText className="text-center italic px-4">
              "High-performing models are not always the easiest to explain, audit, or govern."
            </ContentText>
          </Column>
          <Column spanRatio="1/3">
            <Metric value="High" label="Explainability" />
            <ContentText className="mt-4 text-center text-sm md:text-sm text-[var(--charcoal-light)]">Decision Trees / Linear Models</ContentText>
          </Column>
        </Row>
        <Callout variant="secondary" className="mt-12">
          The right balance depends heavily on regulation, customer trust, operational risk, and the reversibility of mistakes.
        </Callout>
      </Slide>

      <Slide id="discussion-accuracy-vs-control" border>
        <Tag>Discussion</Tag>
        <Heading>
          Discussion: <Highlight>Accuracy</Highlight> vs Control
        </Heading>
        <DiscussionCard title="Group Discussion" className="mt-8">
          Your bank has two loan-approval models. Model A is a "black box" deep learning model that increases profit by 15%. Model B is a simple decision tree that increases profit by 5% but provides exact reasons for denial. Which do you deploy?
        </DiscussionCard>
      </Slide>

      <Slide id="bridge-to-deep-learning" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to <Highlight>Deep Learning</Highlight>
        </Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/2">
            <Card className="h-full bg-[var(--surface)] border-t-4 border-t-[var(--crimson)]">
              <ContentTitle>Richer Patterns</ContentTitle>
              <ContentDescription>
                Deep learning extends our fundamentals into settings with images, language, and highly complex unstructured data.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card className="h-full bg-[var(--surface)] border-t-4 border-t-[var(--charcoal)]">
              <ContentTitle>Increased Complexity</ContentTitle>
              <ContentDescription>
                Deeper models come with steep tradeoffs: higher compute costs, severe opacity, and challenging governance demands.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <ContentText className="mt-8 text-center text-lg font-medium text-[var(--charcoal)]">
          Before discussing advanced architectures, executives must clearly define the business problem the model is meant to solve.
        </ContentText>
      </Slide>

      <Slide id="bridge-to-edii" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to <Highlight>EDII</Highlight>
        </Heading>
        <Row gap="large" className="mt-8 items-center">
          <Column spanRatio="1/2">
            <Quote>
              Ask not only whether a model works, but for whom it works and who may be harmed.
            </Quote>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                AI systems actively reflect the assumptions, exclusions, and historical biases of their creators and data.
              </ListItem>
              <ListItem>
                Equity, diversity, inclusion, and indigeneity are central governance requirements, not ethical add-ons.
              </ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>

      <Slide id="discussion-edii-in-action" border>
        <Tag>Discussion</Tag>
        <Heading>
          Discussion: <Highlight>EDII</Highlight> in Action
        </Heading>
        <DiscussionCard title="Group Discussion" className="mt-8">
          A new AI screening tool cuts hiring time by 40% and improves candidate quality metrics, but an audit reveals it systematically rejects resumes with large gaps in employment, disproportionately affecting mothers returning to the workforce. Do you pull the tool, or try to patch it while it runs?
        </DiscussionCard>
      </Slide>

      <Slide id="bridge-to-sustainability" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to <Highlight>Sustainability</Highlight>
        </Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/2">
            <Card className="h-full border-l-4 border-l-[var(--champagne)]">
              <ContentTitle>The Optimization Benefit</ContentTitle>
              <ContentDescription>
                AI drives massive efficiencies by optimizing logistics, demand forecasting, energy usage, and resource allocation across the supply chain.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <Card className="h-full border-l-4 border-l-[var(--charcoal)]">
              <ContentTitle>The Environmental Footprint</ContentTitle>
              <ContentDescription>
                Training and deploying AI systems consume immense compute, infrastructure, and energy that carry significant environmental costs.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <Callout variant="secondary" className="mt-8">
          The managerial challenge is to rigorously evaluate the net impact: balancing the sustainability benefits AI creates against the footprint it imposes.
        </Callout>
      </Slide>

      <Slide id="bridge-to-product-development" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to Product <Highlight>Development</Highlight>
        </Heading>
        <Row gap="large" className="mt-8">
          <Column spanRatio="1/3">
            <Metric value="Scale" label="Ideation & Prototyping" />
            <ContentText className="mt-4 text-[var(--charcoal-light)]">
              Accelerating the lifecycle from generation through testing.
            </ContentText>
          </Column>
          <Column spanRatio="2/3">
              <AnimatedList>
                <ListItem>
                  The core logic remains unchanged: value stems from pairing data, models, and human expertise around clear business objectives.
                </ListItem>
                <ListItem>
                  Our goal is establishing a managerial lens to judge where AI augmentation improves innovation versus where human design leadership is strictly required.
                </ListItem>
              </AnimatedList>
          </Column>
        </Row>
      </Slide>

      <Slide
        id="an-executive-adoption-playbook"
        border
        quizData={quizBySlideId["an-executive-adoption-playbook"]}
      >
        <Tag>Action</Tag>
        <Heading>
          An Executive Adoption <Highlight>Playbook</Highlight>
        </Heading>
        <Row gap="medium" className="mt-8">
          <Column spanRatio="1/3">
            <Card className="h-full bg-[var(--surface)] shadow-md border-t-2 border-[var(--crimson)]">
              <ContentTitle className="text-[var(--crimson)]">1. Identify</ContentTitle>
              <ContentDescription>
                Start with a specific business problem, not a vague ambition to "do AI."
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full bg-[var(--surface)] shadow-md border-t-2 border-[var(--champagne)]">
              <ContentTitle className="text-[var(--crimson)]">2. Select</ContentTitle>
              <ContentDescription>
                Choose use cases with accessible data, clear owners, and a measurable business outcome.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <Card className="h-full bg-[var(--surface)] shadow-md border-t-2 border-[var(--charcoal)]">
              <ContentTitle className="text-[var(--crimson)]">3. Execute</ContentTitle>
              <ContentDescription>
                Pilot narrowly, learn quickly, and scale only when governance is securely in place.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="a-functional-map-of-ai-opportunities" border>
        <Tag>Opportunity Map</Tag>
        <Heading>
          A Functional Map of AI <Highlight>Opportunities</Highlight>
        </Heading>
        <Row gap="medium">
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Marketing</ContentTitle>
              <ContentDescription>
                Marketing can use AI for segmentation, content support, pricing insight, and demand forecasting.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>Operations</ContentTitle>
              <ContentDescription>
                Operations can use AI for scheduling, quality monitoring, inventory planning, and exception detection.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Finance and Risk</ContentTitle>
              <ContentDescription>
                Finance and risk teams can use AI for anomaly detection, forecasting, compliance monitoring, and scenario analysis.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>HR and Service</ContentTitle>
              <ContentDescription>
                HR and service teams can use AI for talent support, knowledge retrieval, service triage, and workflow automation.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="executive-questions-before-you-scale" border>
        <Tag>Checklist</Tag>
        <Heading>
          Executive Questions Before You <Highlight>Scale</Highlight>
        </Heading>
        <div className="mt-8 space-y-4">
          <Callout variant="secondary">
            <Highlight>1. Accountability:</Highlight> What specific decision or workflow is being improved, and who owns the ultimate result?
          </Callout>
          <Callout variant="secondary">
            <Highlight>2. Foundation:</Highlight> What data, governance process, and change management effort are required to succeed?
          </Callout>
          <Callout variant="secondary">
            <Highlight>3. Risk:</Highlight> What would failure look like across operational, ethical, legal, and reputational dimensions?
          </Callout>
        </div>
      </Slide>

      <Slide id="conclusion-from-curiosity-to-competitive-advantage" border>
        <Tag>Conclusion</Tag>
        <Heading>
          From <Highlight>Curiosity</Highlight> to Competitive Advantage
        </Heading>
        <Row gap="large" className="mt-8 items-center">
          <Column spanRatio="1/2">
            <Quote>
              The goal of this course is to build managerial fluency, not technical theater.
            </Quote>
          </Column>
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                AI becomes strategic when tied to core business priorities, operating discipline, and responsible leadership.
              </ListItem>
              <ListItem>
                This foundation allows us to explore advanced methods and sector applications with sharp, critical judgment in the coming weeks.
              </ListItem>
            </AnimatedList>
          </Column>
        </Row>
      </Slide>
    </SlideDeck>
  );
}
