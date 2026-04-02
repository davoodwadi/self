"use client";

import type { ReactNode } from "react";
import {
  AnimatedList,
  Card,
  Column,
  ContentDescription,
  ContentTitle,
  Heading,
  Highlight,
  ListItem,
  Quote,
  Row,
  Slide,
  SlideDeck,
  Subtitle,
  Tag,
  Title,
  DiscussionCard,
} from "@/app/(courses)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";

const quizBySlideId = createCourseQuizLookup(quizzesData);

function InfoTiles({
  items,
  columns = 2,
}: {
  items: ReactNode[];
  columns?: 1 | 2 | 3 | 4;
}) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4",
  }[columns];

  return (
    <div className={`grid w-full min-w-0 gap-3 ${gridClass}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="min-w-0 overflow-hidden rounded-sm border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-3 text-sm font-semibold leading-snug text-[var(--charcoal)] break-words"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function SourceCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`my-0 h-full text-left ${className}`}>
      <ContentDescription>{children}</ContentDescription>
    </Card>
  );
}

function ModuleBreakSlide({
  id,
  tag,
  title,
  focus,
  managerialLens,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  focus: ReactNode;
  managerialLens: ReactNode;
}) {
  return (
    <Slide id={id} border>
      <Tag>{tag}</Tag>
      <Heading>{title}</Heading>
      <Row gap="large" items="stretch" className="w-full">
        <Column spanRatio="1/2" align="stretch">
          <SourceCard>{focus}</SourceCard>
        </Column>
        <Column spanRatio="1/2" align="stretch">
          <SourceCard>{managerialLens}</SourceCard>
        </Column>
      </Row>
    </Slide>
  );
}

function StandardListSlide({
  id,
  tag,
  title,
  items,
  aside,
  quizData,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  items: ReactNode[];
  aside?: ReactNode;
  quizData?: CourseQuiz;
}) {
  return (
    <Slide id={id} border quizData={quizData}>
      <Tag>{tag}</Tag>
      <Heading>{title}</Heading>
      <Row gap="large" items="stretch" className="w-full">
        <Column spanRatio={aside ? "2/3" : "full"} align="stretch">
          <AnimatedList>
            {items.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </AnimatedList>
        </Column>
        {aside ? (
          <Column spanRatio="1/3" align="stretch" justify="start">
            {aside}
          </Column>
        ) : null}
      </Row>
    </Slide>
  );
}

export default function AIInMarketingCourse() {
  return (
    <SlideDeck background={<BackgroundManager type="marketing" />}>
      <Slide id="title-slide">
        <Tag>Applications of AI in Business</Tag>
        <Title>Applications of AI in Marketing and Consumer Behavior</Title>
        <Subtitle variant="hero">Week 02</Subtitle>
        <div className="mt-10 w-full max-w-4xl">
          <SourceCard className="bg-[var(--crimson)]/5 shadow-none">
            Framing marketing as a coordinated system of sensing, deciding,
            acting, and learning
          </SourceCard>
        </div>
      </Slide>

      <StandardListSlide
        id="why-marketing-became-a-machine-learning-domain"
        tag="Week 02"
        title={
          <>
            Why Marketing Became a <Highlight>Machine Learning</Highlight>{" "}
            Domain
          </>
        }
        items={[
          "Modern marketing generates granular data from search, commerce, media, CRM, service, and product usage.",
          "Many marketing choices are repeated allocation decisions, making them suitable for prediction, ranking, optimization, and experimentation.",
          'The strategic question is not where to "use AI" in isolation, but which customer and budget decisions should be machine-assisted.',
        ]}
        aside={
          <SourceCard>
            The strategic question is not where to &quot;use AI&quot; in
            isolation, but which customer and budget decisions should be
            machine-assisted.
          </SourceCard>
        }
        quizData={
          quizBySlideId["why-marketing-became-a-machine-learning-domain"]
        }
      />

      <StandardListSlide
        id="the-customer-lifecycle-as-a-decision-chain"
        tag="Week 02"
        title={
          <>
            The Customer Lifecycle as a <Highlight>Decision Chain</Highlight>
          </>
        }
        items={[
          "Marketing spans awareness, consideration, conversion, retention, expansion, and advocacy.",
          "AI can support each stage only when firms define the decision, the data, the action, and the success metric.",
          "This lifecycle view prevents leaders from reducing AI to content generation alone.",
        ]}
        aside={
          <SourceCard>
            <div>
              AI can support each stage only when firms define the decision, the
              data, the action, and the success metric.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Awareness",
                  "Consideration",
                  "Conversion",
                  "Retention",
                  "Expansion",
                  "Advocacy",
                ]}
              />
            </div>
          </SourceCard>
        }
      />

      <ModuleBreakSlide
        id="module-i-sensing-demand-and-consumers"
        tag="Module I"
        title={
          <>
            Sensing <Highlight>Demand</Highlight> and Consumers
          </>
        }
        focus="This section focuses on how firms infer needs, patterns, and heterogeneous customer value."
        managerialLens="The core managerial issue is signal quality: which data should guide segmentation, targeting, and positioning decisions."
      />

      <StandardListSlide
        id="consumer-insight-from-unstructured-signals"
        tag="Module I"
        title={
          <>
            Consumer Insight from <Highlight>Unstructured Signals</Highlight>
          </>
        }
        items={[
          "Firms now learn from reviews, search queries, clickstreams, call transcripts, chat logs, and social conversation rather than only from surveys.",
          "AI helps convert noisy text, image, and behavioral data into themes, sentiment patterns, emerging needs, and friction points.",
          "Insight quality still depends on sampling logic, data provenance, and the difference between what consumers say and what they actually do.",
        ]}
        aside={
          <>
            <SourceCard>
              <div>
                Firms now learn from reviews, search queries, clickstreams, call
                transcripts, chat logs, and social conversation rather than only
                from surveys.
              </div>
              <div className="mt-6">
                <InfoTiles
                  items={[
                    "Reviews",
                    "Search queries",
                    "Clickstreams",
                    "Call transcripts",
                    "Chat logs",
                    "Social conversation",
                  ]}
                  columns={3}
                />
              </div>
            </SourceCard>
          </>
        }
      />

      <StandardListSlide
        id="segmentation-beyond-static-demographics"
        tag="Module I"
        title={
          <>
            Segmentation Beyond <Highlight>Static</Highlight> Demographics
          </>
        }
        items={[
          "AI-based segmentation groups customers using behavior, value, needs, responsiveness, or risk instead of relying only on age or income.",
          "Useful segments are stable enough to act on, distinct enough to prioritize, and explainable enough for managers to deploy.",
          "More segments are not always better; excessive granularity can raise complexity without improving decisions.",
        ]}
        aside={
          <SourceCard>
            <div>
              Useful segments are stable enough to act on, distinct enough to
              prioritize, and explainable enough for managers to deploy.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Stable enough to act on",
                  "Distinct enough to prioritize",
                  "Explainable enough to deploy",
                ]}
                columns={1}
              />
            </div>
          </SourceCard>
        }
        quizData={quizBySlideId["segmentation-beyond-static-demographics"]}
      />

      <StandardListSlide
        id="targeting-and-next-best-audience-decisions"
        tag="Module I"
        title={
          <>
            Targeting and <Highlight>Next-Best-Audience</Highlight> Decisions
          </>
        }
        items={[
          "Targeting systems estimate which audience is most likely to respond under a given objective such as reach, conversion, or retention.",
          "The practical output is often a next-best-audience rule that updates as new signals arrive.",
          "Managers should test whether algorithmic targeting improves business value or merely shifts exposure toward already active customers.",
        ]}
        aside={
          <SourceCard>
            Managers should test whether algorithmic targeting improves business
            value or merely shifts exposure toward already active customers.
          </SourceCard>
        }
      />

      <StandardListSlide
        id="positioning-intelligence-and-message-market-fit"
        tag="Module I"
        title={
          <>
            Positioning Intelligence and{" "}
            <Highlight>Message-Market Fit</Highlight>
          </>
        }
        items={[
          "AI can surface which claims, benefits, or proof points resonate across segments, channels, and contexts.",
          "This supports faster refinement of value propositions, creative briefs, and channel-specific narratives.",
          "Positioning remains a strategic choice; models can detect patterns, but leadership must decide what the brand should stand for.",
        ]}
        aside={
          <Quote className="my-0 h-full">
            Models can detect patterns, but leadership must decide what the
            brand should stand for.
          </Quote>
        }
      />

      <ModuleBreakSlide
        id="module-ii-personalization-and-commercial-engines"
        tag="Module II"
        title={
          <>
            Personalization and <Highlight>Commercial Engines</Highlight>
          </>
        }
        focus="This section moves from insight generation to individual-level treatment decisions in commerce and promotion."
        managerialLens="The central issue is balancing relevance, revenue, and brand coherence across millions of interactions."
      />

      <StandardListSlide
        id="personalization-as-a-managed-policy"
        tag="Module II"
        title={
          <>
            Personalization as a Managed <Highlight>Policy</Highlight>
          </>
        }
        items={[
          "Personalization is not just inserting a name into a message; it is choosing which offer, content, timing, and channel best fit a customer state.",
          "Effective personalization requires rules for when not to personalize, especially when data is sparse, sensitive, or likely to overfit recent behavior.",
          "Over-personalization can feel intrusive, narrow exploration, and erode trust if consumers perceive manipulation.",
        ]}
        aside={
          <DiscussionCard>
            Where should a firm draw the line between helpful relevance and
            surveillance-like personalization in its category?
          </DiscussionCard>
        }
      />

      <StandardListSlide
        id="recommendation-systems-in-commerce"
        tag="Module II"
        title={
          <>
            Recommendation Systems in <Highlight>Commerce</Highlight>
          </>
        }
        items={[
          "Recommendation systems rank products, services, or content by expected relevance under business constraints such as inventory, margin, or strategic assortment.",
          "In practice, leaders must decide whether the system should maximize immediate conversion, long-term value, basket size, or discovery.",
          "Poorly designed recommenders can create filter bubbles, over-promote familiar items, and suppress strategic new offerings.",
        ]}
        aside={
          <SourceCard>
            <div>
              In practice, leaders must decide whether the system should
              maximize immediate conversion, long-term value, basket size, or
              discovery.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Immediate conversion",
                  "Long-term value",
                  "Basket size",
                  "Discovery",
                ]}
              />
            </div>
          </SourceCard>
        }
        quizData={quizBySlideId["recommendation-systems-in-commerce"]}
      />

      <StandardListSlide
        id="creative-systems-and-content-operations"
        tag="Module II"
        title={
          <>
            Creative Systems and <Highlight>Content Operations</Highlight>
          </>
        }
        items={[
          "Generative tools can accelerate variant creation, copy testing, image adaptation, and localization across campaigns.",
          "The real value comes when creative generation is tied to response data, brand guidelines, and workflow review rather than treated as an isolated production tool.",
          "Marketing leadership still owns taste, positioning discipline, and the decision about which ideas deserve distribution.",
        ]}
        aside={
          <>
            <SourceCard>
              The real value comes when creative generation is tied to response
              data, brand guidelines, and workflow review rather than treated as
              an isolated production tool.
            </SourceCard>
          </>
        }
      />

      <StandardListSlide
        id="pricing-and-promotional-optimization"
        tag="Module II"
        title={
          <>
            Pricing and <Highlight>Promotional Optimization</Highlight>
          </>
        }
        items={[
          "AI can support pricing by forecasting demand, detecting responsiveness, and estimating tradeoffs across volume, margin, and channel behavior.",
          "Promotional systems help decide discount depth, offer sequencing, coupon targeting, and timing.",
          "These systems are most useful when firms distinguish between short-term lift, long-term willingness to pay, and brand effects.",
        ]}
        aside={
          <SourceCard>
            <div>
              These systems are most useful when firms distinguish between
              short-term lift, long-term willingness to pay, and brand effects.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Short-term lift",
                  "Willingness to pay",
                  "Brand effects",
                ]}
                columns={1}
              />
            </div>
          </SourceCard>
        }
      />

      <StandardListSlide
        id="revenue-lift-brand-risk-and-dynamic-pricing"
        tag="Module II"
        title={
          <>
            Revenue Lift, Brand Risk, and <Highlight>Dynamic Pricing</Highlight>
          </>
        }
        items={[
          "Dynamic pricing changes offers in response to demand conditions, customer context, capacity, or competitive moves.",
          "It can improve allocation efficiency, but consumers may interpret frequent price variation as unfair or opportunistic.",
          "The managerial challenge is to separate economically rational price adaptation from practices that damage trust or invite regulatory scrutiny.",
        ]}
        aside={
          <DiscussionCard>
            In which categories does dynamic pricing strengthen value capture,
            and in which categories does it undermine customer relationships?
          </DiscussionCard>
        }
      />

      <ModuleBreakSlide
        id="module-iii-measurement-and-learning"
        tag="Module III"
        title={
          <>
            Measurement and <Highlight>Learning</Highlight>
          </>
        }
        focus="This section addresses how firms learn which actions actually caused performance changes."
        managerialLens="The executive problem is not data scarcity, but false certainty from dashboards that confuse correlation with causal lift."
      />

      <StandardListSlide
        id="campaign-optimization-across-channels"
        tag="Module III"
        title={
          <>
            Campaign Optimization Across <Highlight>Channels</Highlight>
          </>
        }
        items={[
          "AI can coordinate campaign timing, sequencing, audience exposure, and creative rotation across email, search, social, retail media, and direct channels.",
          "Optimization works best when channel objectives are aligned; otherwise one system can improve its local metric while hurting total performance.",
          "Cross-channel orchestration requires governance over frequency, exclusions, and diminishing returns.",
        ]}
        aside={
          <SourceCard>
            <div>
              Cross-channel orchestration requires governance over frequency,
              exclusions, and diminishing returns.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Campaign timing",
                  "Sequencing",
                  "Audience exposure",
                  "Frequency, exclusions, and diminishing returns",
                ]}
              />
            </div>
          </SourceCard>
        }
      />

      <Slide id="budget-allocation-bidding-and-pacing" border>
        <Tag>Module III</Tag>
        <Heading>
          Budget Allocation, <Highlight>Bidding</Highlight>, and Pacing
        </Heading>
        <Row gap="medium" items="stretch" className="w-full">
          <Column spanRatio="1/3" align="stretch">
            <SourceCard className="flex items-center justify-center text-center">
              <span className="block text-2xl font-serif text-[var(--charcoal)] md:text-3xl">
                How much to spend
              </span>
            </SourceCard>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <SourceCard className="flex items-center justify-center text-center">
              <span className="block text-2xl font-serif text-[var(--charcoal)] md:text-3xl">
                Where to spend it
              </span>
            </SourceCard>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <SourceCard className="flex items-center justify-center text-center">
              <span className="block text-2xl font-serif text-[var(--charcoal)] md:text-3xl">
                How quickly to deploy budget over time
              </span>
            </SourceCard>
          </Column>
        </Row>
        <Row gap="large" items="stretch" className="mt-10 w-full">
          <Column spanRatio="1/2" align="stretch">
            <SourceCard>
              Automated bidding can outperform manual rules in volatile
              environments, but it also makes logic less visible to managers.
            </SourceCard>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <SourceCard>
              The right control model depends on market speed, data quality, and
              the cost of overspending on weak signals.
            </SourceCard>
          </Column>
        </Row>
      </Slide>

      <StandardListSlide
        id="experimentation-and-incrementality"
        tag="Module III"
        title={
          <>
            Experimentation and <Highlight>Incrementality</Highlight>
          </>
        }
        items={[
          "Experiments remain the cleanest way to estimate whether a campaign, offer, or message caused additional behavior rather than simply capturing existing demand.",
          "AI can help identify who to test, which treatments to compare, and when results are strong enough to act on.",
          "Organizations that skip experimentation often mistake optimized delivery for genuine value creation.",
        ]}
        aside={
          <DiscussionCard>
            When should a marketing team slow down automation in order to
            preserve a credible learning agenda?
          </DiscussionCard>
        }
        quizData={quizBySlideId["experimentation-and-incrementality"]}
      />

      <StandardListSlide
        id="causal-inference-without-clean-randomization"
        tag="Module III"
        title={
          <>
            Causal Inference Without <Highlight>Clean Randomization</Highlight>
          </>
        }
        items={[
          "Many important questions cannot be answered with perfect experiments because of cost, channel constraints, or operational disruption.",
          "In those cases, teams use quasi-experimental logic, holdout designs, uplift modeling, and careful counterfactual assumptions.",
          "Managers do not need to master the statistics, but they do need to ask what assumptions make the estimated lift believable.",
        ]}
        aside={
          <SourceCard>
            Managers do not need to master the statistics, but they do need to
            ask what assumptions make the estimated lift believable.
          </SourceCard>
        }
      />

      <Slide id="attribution-marketing-mix-models-and-their-limits" border>
        <Tag>Module III</Tag>
        <Heading>
          Attribution, Marketing Mix Models, and Their{" "}
          <Highlight>Limits</Highlight>
        </Heading>
        <Row gap="large" items="stretch" className="w-full">
          <Column spanRatio="1/2" align="stretch">
            <Card className="my-0 h-full text-left">
              <ContentTitle>Attribution</ContentTitle>
              <ContentDescription>
                Attribution assigns credit for observed outcomes across
                touchpoints.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <Card className="my-0 h-full text-left">
              <ContentTitle>Marketing Mix Models</ContentTitle>
              <ContentDescription>
                Marketing mix models estimate broader channel effects from
                aggregate variation over time.
              </ContentDescription>
            </Card>
          </Column>
        </Row>
        <div className="mt-10 w-full max-w-5xl">
          <SourceCard>
            Each method answers a different question and carries different
            biases, time horizons, and data requirements.
          </SourceCard>
        </div>
        <div className="mt-10 w-full max-w-4xl">
          <DiscussionCard>
            If attribution and marketing mix models point to different budget
            decisions, which one should leadership trust and why?
          </DiscussionCard>
        </div>
      </Slide>

      <ModuleBreakSlide
        id="module-iv-relationship-systems-and-governance"
        tag="Module IV"
        title={
          <>
            Relationship Systems and <Highlight>Governance</Highlight>
          </>
        }
        focus="This section shifts from acquisition to customer relationship management, service, and institutional safeguards."
        managerialLens="The main question is how to automate relationship decisions without weakening trust or accountability."
      />

      <StandardListSlide
        id="crm-orchestration-across-the-journey"
        tag="Module IV"
        title={
          <>
            CRM Orchestration Across the <Highlight>Journey</Highlight>
          </>
        }
        items={[
          "CRM systems increasingly use AI to determine next best action, next best offer, message timing, and suppression rules.",
          "The goal is to coordinate journeys across channels so that customers experience continuity rather than disconnected campaigns.",
          "Orchestration quality depends on clean event data, identity resolution, and explicit business priorities such as retention, cross-sell, or service recovery.",
        ]}
        aside={
          <SourceCard>
            <div>
              The goal is to coordinate journeys across channels so that
              customers experience continuity rather than disconnected
              campaigns.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Next best action",
                  "Next best offer",
                  "Message timing",
                  "Suppression rules",
                ]}
              />
            </div>
          </SourceCard>
        }
      />

      <StandardListSlide
        id="retention-churn-and-customer-lifetime-value"
        tag="Module IV"
        title={
          <>
            Retention, Churn, and <Highlight>Customer Lifetime Value</Highlight>
          </>
        }
        items={[
          "Retention models help identify who is at risk, who is worth saving, and which intervention is economically justified.",
          "Customer lifetime value is most useful when it informs resource allocation, not when it becomes a decorative dashboard metric.",
          "The managerial danger is treating predicted value as destiny and underinvesting in customers whose future potential can still be shaped.",
        ]}
        aside={
          <SourceCard>
            <div>
              Customer lifetime value is most useful when it informs resource
              allocation, not when it becomes a decorative dashboard metric.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Who is at risk",
                  "Who is worth saving",
                  "Which intervention is economically justified",
                ]}
                columns={1}
              />
            </div>
          </SourceCard>
        }
        quizData={quizBySlideId["retention-churn-and-customer-lifetime-value"]}
      />

      <StandardListSlide
        id="conversational-commerce-and-service-automation"
        tag="Module IV"
        title={
          <>
            Conversational Commerce and{" "}
            <Highlight>Service Automation</Highlight>
          </>
        }
        items={[
          "Conversational systems now support discovery, service triage, order updates, and guided selling across chat, voice, and messaging channels.",
          "Their value comes from reducing friction while preserving a coherent brand voice and reliable escalation path.",
          "Full automation is rarely the objective; the better design question is which intents can be resolved safely and which require human judgment.",
        ]}
        aside={
          <DiscussionCard>
            Which customer moments in your organization should remain human-led
            even if conversational AI becomes fast and accurate?
          </DiscussionCard>
        }
      />

      <StandardListSlide
        id="privacy-consent-and-trust-architecture"
        tag="Module IV"
        title={
          <>
            Privacy, Consent, and <Highlight>Trust Architecture</Highlight>
          </>
        }
        items={[
          "Marketing AI depends on customer data, identity linkage, and behavioral inference, making governance a core design requirement rather than a legal afterthought.",
          "Leaders must decide what data is appropriate to collect, how consent is expressed, how models are audited, and when data use becomes reputationally unacceptable.",
          "Privacy-preserving measurement, data minimization, and transparent value exchange are increasingly strategic capabilities.",
        ]}
        aside={
          <SourceCard>
            <div>
              Leaders must decide what data is appropriate to collect, how
              consent is expressed, how models are audited, and when data use
              becomes reputationally unacceptable.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "What data is appropriate to collect",
                  "How consent is expressed",
                  "How models are audited",
                  "When data use becomes reputationally unacceptable",
                ]}
              />
            </div>
          </SourceCard>
        }
        quizData={quizBySlideId["privacy-consent-and-trust-architecture"]}
      />

      <StandardListSlide
        id="manipulation-bias-and-consumer-welfare"
        tag="Module IV"
        title={
          <>
            Manipulation, Bias, and <Highlight>Consumer Welfare</Highlight>
          </>
        }
        items={[
          "AI systems can unintentionally reinforce exclusion, price discrimination, dark patterns, or exploitative targeting of vulnerable consumers.",
          "Bias in marketing is not limited to training data; it can also arise from objectives that reward short-term conversion without regard for downstream harm.",
          "Responsible marketing requires explicit guardrails on objectives, audience exclusions, escalation, and review.",
        ]}
        aside={
          <DiscussionCard>
            Should a model be considered successful if it increases conversion
            by exploiting behavioral vulnerability that a human marketer would
            judge inappropriate?
          </DiscussionCard>
        }
      />

      <ModuleBreakSlide
        id="module-v-organizational-implications"
        tag="Module V"
        title={
          <>
            Organizational <Highlight>Implications</Highlight>
          </>
        }
        focus="The final section considers the operating model required to deploy AI across marketing responsibly."
        managerialLens="Technology decisions matter, but organizational design usually determines whether promised value is realized."
      />

      <Slide
        id="marketing-operating-model-for-ai"
        border
        quizData={quizBySlideId["marketing-operating-model-for-ai"]}
      >
        <Tag>Module V</Tag>
        <Heading>
          Marketing <Highlight>Operating Model</Highlight> for AI
        </Heading>
        <Row gap="large" items="stretch" className="w-full">
          <Column spanRatio="1/2" align="stretch">
            <SourceCard>
              High-performing firms pair marketing, analytics, data engineering,
              product, legal, and service teams around shared customer outcomes.
            </SourceCard>
          </Column>
          <Column spanRatio="1/2" align="stretch">
            <SourceCard>
              The key design choice is where decisions should be centralized for
              governance and where they should be decentralized for speed and
              domain expertise.
            </SourceCard>
          </Column>
        </Row>
        <div className="mt-10 w-full max-w-5xl">
          <SourceCard>
            AI maturity in marketing is ultimately an operating model question,
            not only a tooling question.
          </SourceCard>
        </div>
      </Slide>

      <StandardListSlide
        id="build-buy-or-partner-the-stack-question"
        tag="Module V"
        title={
          <>
            Build, Buy, or Partner: The <Highlight>Stack Question</Highlight>
          </>
        }
        items={[
          "Some capabilities should be purchased as platforms, some configured as workflows, and a smaller set may justify internal development.",
          "The decision depends on strategic differentiation, data uniqueness, integration burden, talent availability, and governance needs.",
          "Vendor dependence can accelerate adoption, but it may also reduce transparency, portability, and bargaining power.",
        ]}
        aside={
          <DiscussionCard>
            Which marketing AI capabilities should remain proprietary in your
            firm, and which are better treated as infrastructure?
          </DiscussionCard>
        }
      />

      <Slide id="synthesis-and-managerial-action" border>
        <Tag>Week 02</Tag>
        <Heading>
          Synthesis and <Highlight>Managerial Action</Highlight>
        </Heading>
        <Row gap="medium" items="stretch" className="w-full">
          <Column spanRatio="1/3" align="stretch">
            <SourceCard>
              Treat AI in marketing as a connected decision system across
              insight, targeting, personalization, measurement, relationship
              management, and governance.
            </SourceCard>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <SourceCard>
              Start with a narrow set of high-value decisions, define success in
              business terms, and build the data and accountability needed to
              learn.
            </SourceCard>
          </Column>
          <Column spanRatio="1/3" align="stretch">
            <SourceCard>
              The managerial task is not to automate every interaction, but to
              decide where intelligence, judgment, and trust create durable
              advantage.
            </SourceCard>
          </Column>
        </Row>
      </Slide>
    </SlideDeck>
  );
}
