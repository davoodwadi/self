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
} from "@/app/(courses)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";
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
            A business-first lens for judging where AI creates real value
          </ListItem>
          <ListItem>
            A clean bridge into deep learning, EDII, sustainability, and product
            development
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
        <Row gap="large">
          <Column spanRatio="1/3">
            <Metric value="1" label="Decision engine" />
          </Column>
          <Column spanRatio="1/3">
            <Metric value="2" label="Workflow accelerator" />
          </Column>
          <Column spanRatio="1/3">
            <Metric value="3" label="Learning amplifier" />
          </Column>
        </Row>
        <Callout title="Managerial Lens" className="mt-10 max-w-4xl">
          The relevant executive question is where AI improves revenue, cost,
          risk, or speed of learning in a way the organization can actually
          operationalize.
        </Callout>
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
        <Row gap="large" items="stretch">
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>What It Is</ContentTitle>
              <ContentDescription>
                Systems that support perception, prediction, language,
                recommendation, or generation in business contexts.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>What It Requires</ContentTitle>
              <ContentDescription>
                Reliable data, a defined task, and a workflow that converts
                model output into action.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>What It Is Not</ContentTitle>
              <ContentDescription>
                Automatic wisdom, self-managing strategy, or a substitute for
                leadership accountability.
              </ContentDescription>
            </Card>
            <Quote>
              Most business value comes from pairing statistical systems with
              sound managerial judgment.
            </Quote>
          </Column>
        </Row>
      </Slide>

      <Slide id="the-ai-family-tree" border>
        <Tag>Concept Map</Tag>
        <Heading>
          The AI <Highlight>Family Tree</Highlight>
        </Heading>
        <Row gap="medium">
          <Column spanRatio="1/4" align="stretch">
            <Card>
              <ContentTitle>AI</ContentTitle>
              <ContentDescription>
                The broad field of systems that perform cognitive-like tasks.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4" align="stretch">
            <Card>
              <ContentTitle>Machine Learning</ContentTitle>
              <ContentDescription>
                Learns patterns from data instead of relying only on fixed
                rules.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4" align="stretch">
            <Card>
              <ContentTitle>Deep Learning</ContentTitle>
              <ContentDescription>
                A specialized approach that performs well on complex data such
                as language and images.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/4" align="stretch">
            <Card>
              <ContentTitle>Generative AI</ContentTitle>
              <ContentDescription>
                Produces new text, images, code, or design options rather than
                only predictions.
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
                Forecast churn, demand, fraud, or likely next actions.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>Classification</ContentTitle>
              <ContentDescription>
                Assign sentiment, risk level, document type, or priority.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>Generation</ContentTitle>
              <ContentDescription>
                Draft summaries, options, content, or designs that speed up
                human work.
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
        <Row gap="large" items="center">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>
                AI matters only when a model output changes a real business
                decision or workflow.
              </ListItem>
              <ListItem>
                Strong use cases connect the output to a clear owner, action,
                and measurable outcome.
              </ListItem>
              <ListItem>
                The sustainable advantage is not the model alone, but the
                operating system built around it.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout title="Critical Discipline" variant="secondary">
              A clever prototype without workflow adoption is a demo, not a
              capability.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="data-the-fuel-the-constraint-the-differentiator" border>
        <Tag>Data</Tag>
        <Heading>
          Data: The <Highlight>Fuel</Highlight>, the Constraint, the
          Differentiator
        </Heading>
        <Row gap="large">
          <Column spanRatio="1/3">
            <Metric value="Access" label="Can you reach the data?" />
          </Column>
          <Column spanRatio="1/3">
            <Metric value="Quality" label="Can you trust the data?" />
          </Column>
          <Column spanRatio="1/3">
            <Metric value="Governance" label="Can you use it responsibly?" />
          </Column>
        </Row>
        <ContentText className="mt-10 max-w-4xl">
          <p>
            In many organizations, better data discipline beats more ambitious
            model selection.
          </p>
        </ContentText>
      </Slide>

      <Slide id="how-ai-systems-learn-from-patterns" border>
        <Tag>Mechanics</Tag>
        <Heading>
          How AI Systems Learn from <Highlight>Patterns</Highlight>
        </Heading>
        <Row gap="large" items="center">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>
                Models are trained on examples, detect regularities, and apply
                those learned patterns to new cases.
              </ListItem>
              <ListItem>
                Performance depends on how closely future conditions resemble
                the training environment.
              </ListItem>
              <ListItem>
                When the environment changes, model accuracy can degrade quickly
                even if nothing looks broken on the surface.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Quote>
              AI is powerful because it scales pattern recognition, not because
              it understands context like an executive team does.
            </Quote>
          </Column>
        </Row>
      </Slide>

      <Slide id="where-human-judgment-still-matters" border>
        <Tag>Leadership</Tag>
        <Heading>
          Where Human <Highlight>Judgment</Highlight> Still Matters
        </Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>
                Leaders define the objective, the tradeoffs, and the acceptable
                consequences of failure.
              </ListItem>
              <ListItem>
                Human oversight matters most when decisions affect fairness,
                reputation, safety, or major capital allocation.
              </ListItem>
              <ListItem>
                The strongest model is usually a human-machine workflow, not
                full automation by default.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <DiscussionCard title="Group Discussion">
              Which decision in your organization should remain human-led even
              if an AI system becomes highly accurate, and why?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      <Slide id="the-limits-of-ai-in-real-organizations" border>
        <Tag>Reality Check</Tag>
        <Heading>
          The Limits of AI in Real <Highlight>Organizations</Highlight>
        </Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>
                AI can be brittle when customer behavior, market structure, or
                internal processes shift.
              </ListItem>
              <ListItem>
                Models can fail quietly because non-technical users often do not
                see why a prediction changed.
              </ListItem>
              <ListItem>
                Many deployments fail because ownership, incentives, and
                workflows were never redesigned around the tool.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <Callout title="Common Failure Mode" variant="secondary">
              The organization treats AI as a technology purchase when it is
              actually an operating model change.
            </Callout>
          </Column>
        </Row>
      </Slide>

      <Slide id="the-tradeoff-accuracy-explainability-and-control" border>
        <Tag>Governance</Tag>
        <Heading>
          The Tradeoff: <Highlight>Accuracy</Highlight>, Explainability, and
          Control
        </Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <Card>
              <ContentTitle>Managerial Tension</ContentTitle>
              <ContentDescription>
                A more accurate system is not always the best system if it is
                hard to explain, audit, or govern.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>Decision Rule</ContentTitle>
              <ContentDescription>
                The right balance depends on regulation, customer trust,
                operational risk, and whether mistakes can be reversed.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3">
            <DiscussionCard title="Group Discussion">
              When should a business accept lower model accuracy in exchange for
              stronger explainability and control?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      <Slide id="bridge-to-deep-learning" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to <Highlight>Deep Learning</Highlight>
        </Heading>
        <Row gap="medium">
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Why It Matters</ContentTitle>
              <ContentDescription>
                Deep learning extends today's foundations into settings with
                language, images, and other complex data.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Executive Lens</ContentTitle>
              <ContentDescription>
                Richer pattern recognition comes with higher cost, greater
                opacity, and stronger governance requirements.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="bridge-to-edii" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to <Highlight>EDII</Highlight>
        </Heading>
        <Row gap="large">
          <Column spanRatio="2/3">
            <AnimatedList>
              <ListItem>
                AI systems can reflect historical exclusions hidden in data,
                labels, and design assumptions.
              </ListItem>
              <ListItem>
                That makes equity, diversity, inclusion, and indigeneity part of
                AI governance, not a separate conversation.
              </ListItem>
              <ListItem>
                Leadership must ask not only whether a model works, but for whom
                it works and who bears the risk.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3">
            <DiscussionCard title="Group Discussion">
              If an AI system improves efficiency for most users but
              systematically excludes a smaller group, how should leadership
              respond?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      <Slide id="bridge-to-sustainability" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to <Highlight>Sustainability</Highlight>
        </Heading>
        <Row gap="medium">
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Optimization Potential</ContentTitle>
              <ContentDescription>
                AI can improve forecasting, logistics, energy use, and resource
                allocation across the firm.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Resource Cost</ContentTitle>
              <ContentDescription>
                Those benefits must be weighed against compute intensity,
                infrastructure demand, and environmental footprint.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
      </Slide>

      <Slide id="bridge-to-product-development" border>
        <Tag>Looking Ahead</Tag>
        <Heading>
          Bridge to Product <Highlight>Development</Highlight>
        </Heading>
        <Row gap="medium">
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Lifecycle Impact</ContentTitle>
              <ContentDescription>
                AI can support ideation, prototyping, testing, iteration, and
                compliance across the product lifecycle.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Managerial Continuity</ContentTitle>
              <ContentDescription>
                The same business-first logic still applies: use data, models,
                and expert judgment around a real objective.
              </ContentDescription>
            </Card>
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
        <Row gap="medium">
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>1. Start Narrow</ContentTitle>
              <ContentDescription>
                Pick a specific business problem, not a broad ambition to do AI.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>2. Prove Value</ContentTitle>
              <ContentDescription>
                Choose use cases with accessible data, clear owners, and
                measurable outcomes.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <Card>
              <ContentTitle>3. Scale Carefully</ContentTitle>
              <ContentDescription>
                Expand only when workflow adoption and governance are already in
                place.
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
              <ContentTitle>Commercial Functions</ContentTitle>
              <ContentDescription>
                Marketing, sales, and service can apply AI to segmentation,
                content support, service triage, and demand forecasting.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>Operational Functions</ContentTitle>
              <ContentDescription>
                Operations can use AI for scheduling, inventory planning,
                quality monitoring, and exception detection.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card>
              <ContentTitle>Control Functions</ContentTitle>
              <ContentDescription>
                Finance and risk teams can use AI for anomaly detection,
                compliance monitoring, and scenario analysis.
              </ContentDescription>
            </Card>
            <Card>
              <ContentTitle>People Functions</ContentTitle>
              <ContentDescription>
                HR and knowledge teams can use AI for talent support, knowledge
                retrieval, and workflow automation.
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
        <AnimatedList className="max-w-4xl">
          <ListItem>
            What decision or workflow is being improved, and who is accountable
            for the result?
          </ListItem>
          <ListItem>
            What data foundation, governance process, and change management
            effort are required?
          </ListItem>
          <ListItem>
            What would failure look like in operational, ethical, legal, and
            reputational terms?
          </ListItem>
        </AnimatedList>
        <Callout title="Executive Discipline" className="mt-10 max-w-4xl">
          Scaling AI without clear ownership and governance usually scales
          confusion faster than value.
        </Callout>
      </Slide>

      <Slide id="conclusion-from-curiosity-to-competitive-advantage" border>
        <Tag>Conclusion</Tag>
        <Heading>
          From <Highlight>Curiosity</Highlight> to Competitive Advantage
        </Heading>
        <AnimatedList className="max-w-4xl">
          <ListItem>
            AI becomes strategic when it is tied to business priorities,
            operating discipline, and responsible leadership.
          </ListItem>
          <ListItem>
            This course is designed to build managerial fluency rather than
            technical theater.
          </ListItem>
          <ListItem>
            That foundation makes later weeks on deep learning, EDII,
            sustainability, and product development more actionable.
          </ListItem>
        </AnimatedList>
      </Slide>
    </SlideDeck>
  );
}
