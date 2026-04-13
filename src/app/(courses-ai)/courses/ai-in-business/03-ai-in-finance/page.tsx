"use client";

import type { ReactNode } from "react";
import {
  AnimatedList,
  Callout,
  Card,
  Column,
  ContentDescription,
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
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzesData from "./quizzes.json";

const quizBySlideId = createCourseQuizLookup(quizzesData);

type TileColumns = 1 | 2 | 3 | 4 | 5;

type GridCard = {
  title?: ReactNode;
  body: ReactNode;
};

function InfoTiles({
  items,
  columns = 2,
}: {
  items: ReactNode[];
  columns?: TileColumns;
}) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-5",
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

function PanelCard({
  title,
  children,
  className = "",
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`my-0 h-full text-left ${className}`}>
      {title ? <ContentTitle>{title}</ContentTitle> : null}
      <ContentDescription>{children}</ContentDescription>
    </Card>
  );
}

function CardGridSlide({
  id,
  tag,
  title,
  cards,
  columns = 3,
  quizData,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  cards: GridCard[];
  columns?: 2 | 3 | 4;
  quizData?: CourseQuiz;
}) {
  const spanRatio: "1/2" | "1/3" | "1/4" =
    columns === 2 ? "1/2" : columns === 4 ? "1/4" : "1/3";

  return (
    <Slide id={id} border quizData={quizData}>
      <Tag>{tag}</Tag>
      <Heading>{title}</Heading>
      <Row gap="medium" items="stretch" className="w-full">
        {cards.map((card, index) => (
          <Column key={index} spanRatio={spanRatio} align="stretch">
            <PanelCard title={card.title}>{card.body}</PanelCard>
          </Column>
        ))}
      </Row>
    </Slide>
  );
}

function ListAsideSlide({
  id,
  tag,
  title,
  items,
  aside,
  quizData,
  asideSpan = "1/3",
}: {
  id: string;
  tag: string;
  title: ReactNode;
  items: ReactNode[];
  aside?: ReactNode;
  quizData?: CourseQuiz;
  asideSpan?: "1/3" | "1/2";
}) {
  const mainSpan: "full" | "1/2" | "2/3" = aside
    ? asideSpan === "1/2"
      ? "1/2"
      : "2/3"
    : "full";

  return (
    <Slide id={id} border quizData={quizData}>
      <Tag>{tag}</Tag>
      <Heading>{title}</Heading>
      <Row gap="large" items="stretch" className="w-full">
        <Column spanRatio={mainSpan} align="stretch">
          <AnimatedList>
            {items.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </AnimatedList>
        </Column>
        {aside ? (
          <Column spanRatio={asideSpan} align="stretch" justify="start">
            {aside}
          </Column>
        ) : null}
      </Row>
    </Slide>
  );
}

function DiscussionSlide({
  id,
  tag,
  title,
  items,
  question,
  quizData,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  items: ReactNode[];
  question: ReactNode;
  quizData?: CourseQuiz;
}) {
  return (
    <ListAsideSlide
      id={id}
      tag={tag}
      title={title}
      items={items}
      quizData={quizData}
      aside={<DiscussionCard title="Discussion">{question}</DiscussionCard>}
    />
  );
}

export default function AIInFinanceCourse() {
  return (
    <SlideDeck background={<BackgroundManager type="introduction" />}>
      <Slide id="title-slide">
        <Tag>Applications of AI in Business</Tag>
        <Title>
          Applications of AI in <Highlight>Finance</Highlight>
        </Title>
        <Subtitle variant="hero">
          How intelligent systems reshape credit, control, markets, operations,
          and governance
        </Subtitle>
      </Slide>

      <ListAsideSlide
        id="why-finance-became-an-ai-domain"
        tag="Week 03"
        title={
          <>
            Why Finance Became an <Highlight>AI Domain</Highlight>
          </>
        }
        items={[
          "Finance runs on repeated decisions under uncertainty: approve, price, monitor, flag, hedge, and allocate.",
          "Digital channels, machine-readable records, and high-frequency workflows create dense operational signals.",
          "Small model errors can scale quickly because financial systems are linked to capital, compliance, and customer trust.",
        ]}
        aside={
          <PanelCard>
            <div>Finance runs on repeated decisions under uncertainty.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Approve",
                  "Price",
                  "Monitor",
                  "Flag",
                  "Hedge",
                  "Allocate",
                ]}
                columns={3}
              />
            </div>
          </PanelCard>
        }
        quizData={quizBySlideId["why-finance-became-an-ai-domain"]}
      />

      <CardGridSlide
        id="the-financial-firm-as-a-decision-architecture"
        tag="Week 03"
        title={
          <>
            The Financial Firm as a <Highlight>Decision Architecture</Highlight>
          </>
        }
        cards={[
          {
            title: "Information into decisions",
            body: "Front office, risk, operations, compliance, and finance each transform information into decisions.",
          },
          {
            title: "Where AI matters",
            body: "AI matters when it improves the speed, consistency, or quality of those decisions.",
          },
          {
            title: "Opacity threshold",
            body: "The strategic question is where machine assistance strengthens judgment and where it creates unacceptable opacity.",
          },
        ]}
      />

      <Slide id="value-creation-in-finance" border>
        <Tag>Week 03</Tag>
        <Heading>
          <Highlight>Value Creation</Highlight> in Finance
        </Heading>
        <Row gap="medium" items="stretch" className="w-full">
          <Column spanRatio="1/3">
            <Metric
              value="Revenue"
              label="Better pricing, cross-sell, retention, portfolio construction"
            />
          </Column>
          <Column spanRatio="1/3">
            <Metric
              value="Cost"
              label="Automation in onboarding, servicing, reconciliation, investigation"
            />
          </Column>
          <Column spanRatio="1/3">
            <Metric
              value="Risk"
              label="Earlier fraud, deterioration, drift, and control detection"
            />
          </Column>
        </Row>
      </Slide>

      <CardGridSlide
        id="module-i-foundations"
        tag="Module I"
        title={
          <>
            Module I: <Highlight>Foundations</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title:
              "Prediction, classification, optimization, and documentation",
            body: "This module frames finance as a prediction, classification, optimization, and documentation domain.",
          },
          {
            title: "The goal",
            body: "The goal is to distinguish promising use cases from cases where AI adds complexity without improving decisions.",
          },
        ]}
      />

      <ListAsideSlide
        id="data-types-and-signal-quality-in-financial-services"
        tag="Module I"
        title={
          <>
            Data Types and <Highlight>Signal Quality</Highlight> in Financial
            Services
          </>
        }
        items={[
          "Structured records such as transactions, bureau files, contracts, claims, and market data remain foundational.",
          "Text, voice, document images, and relationship graphs expand what firms can monitor and automate.",
          "In finance, data lineage, timestamp quality, and entity resolution often matter more than model novelty.",
        ]}
        aside={
          <PanelCard>
            <div>Structured records remain foundational.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Transactions",
                  "Bureau files",
                  "Contracts",
                  "Claims",
                  "Market data",
                  "Text",
                  "Voice",
                  "Document images",
                  "Relationship graphs",
                ]}
                columns={3}
              />
            </div>
          </PanelCard>
        }
      />

      <CardGridSlide
        id="matching-method-to-financial-task"
        tag="Module I"
        title={
          <>
            Matching <Highlight>Method</Highlight> to Financial Task
          </>
        }
        quizData={quizBySlideId["matching-method-to-financial-task"]}
        cards={[
          {
            title: "Supervised learning",
            body: "Supervised learning supports default prediction, fraud scoring, churn estimation, and document classification.",
          },
          {
            title: "Unsupervised methods",
            body: "Unsupervised methods help surface anomalies, clusters, and unusual network behavior when labels are weak.",
          },
          {
            title: "Generative models",
            body: "Generative models support summarization, drafting, extraction, scenario narration, and analyst copilots rather than final authority.",
          },
        ]}
      />

      <ListAsideSlide
        id="human-judgment-in-high-stakes-finance"
        tag="Module I"
        title={
          <>
            Human Judgment in <Highlight>High-Stakes</Highlight> Finance
          </>
        }
        items={[
          "High-value financial decisions are rarely one-shot predictions; they carry legal, reputational, and capital consequences.",
          "Human oversight is most important when exceptions are novel, customers are vulnerable, or adverse outcomes are hard to reverse.",
          "Effective design clarifies escalation paths instead of assuming automation is the objective.",
        ]}
        aside={
          <Callout
            title="Escalation paths"
            variant="secondary"
            className="mt-0"
          >
            Effective design clarifies escalation paths instead of assuming
            automation is the objective.
          </Callout>
        }
      />

      <CardGridSlide
        id="module-ii-credit-and-lending"
        tag="Module II"
        title={
          <>
            Module II: <Highlight>Credit and Lending</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Origination to collections",
            body: "This module examines how AI changes origination, underwriting, portfolio monitoring, and collections.",
          },
          {
            title: "Managerial issue",
            body: "The managerial issue is balancing growth, default control, fairness, and explainability.",
          },
        ]}
      />

      <ListAsideSlide
        id="credit-scoring-beyond-static-rules"
        tag="Module II"
        title={
          <>
            Credit Scoring Beyond <Highlight>Static Rules</Highlight>
          </>
        }
        items={[
          "Modern scoring systems can incorporate richer behavioral, transactional, and application-level patterns than traditional scorecards alone.",
          "Their value lies in better rank ordering of risk and better segmentation of approve, review, and decline decisions.",
          "More predictive power is useful only if the institution can explain, govern, and operationalize the result.",
        ]}
        aside={
          <PanelCard>
            <div>Richer patterns can sharpen risk ordering.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Behavioral patterns",
                  "Transactional patterns",
                  "Application-level patterns",
                ]}
                columns={1}
              />
            </div>
          </PanelCard>
        }
        quizData={quizBySlideId["credit-scoring-beyond-static-rules"]}
      />

      <CardGridSlide
        id="underwriting-with-broader-signals"
        tag="Module II"
        title={
          <>
            Underwriting with <Highlight>Broader Signals</Highlight>
          </>
        }
        cards={[
          {
            title: "Internal and contextual data",
            body: "Lenders increasingly combine internal history, verified cash flow, collateral information, and contextual business data.",
          },
          {
            title: "Coverage",
            body: "Broader signals can improve coverage for thin-file applicants, small businesses, or newer customers.",
          },
          {
            title: "Relevance and stability",
            body: "New inputs also raise questions about relevance, stability, and whether the model is learning structural disadvantage rather than true risk.",
          },
        ]}
      />

      <CardGridSlide
        id="pricing-limit-setting-and-profitability"
        tag="Module II"
        title={
          <>
            Pricing, Limit Setting, and <Highlight>Profitability</Highlight>
          </>
        }
        cards={[
          {
            title: "Approval is not the end",
            body: "Credit decisions do not end at approval; institutions also set limits, pricing, covenants, and review intensity.",
          },
          {
            title: "Granular alignment",
            body: "AI can help align expected loss, expected revenue, and capital usage at a more granular level.",
          },
          {
            title: "Governance risk",
            body: "Poorly governed pricing models can optimize short-term margin while worsening adverse selection or customer trust.",
          },
        ]}
      />

      <ListAsideSlide
        id="early-warning-systems-and-portfolio-surveillance"
        tag="Module II"
        title={
          <>
            Early Warning Systems and{" "}
            <Highlight>Portfolio Surveillance</Highlight>
          </>
        }
        items={[
          "Portfolio models monitor delinquency signals, payment behavior, sector weakness, covenant breaches, or utilization changes before formal default.",
          "The goal is not only prediction, but earlier intervention through restructuring, outreach, or exposure management.",
          "Early warning is only valuable when response teams have clear playbooks and authority to act.",
        ]}
        aside={
          <PanelCard>
            <div>Monitor deterioration before formal default.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Delinquency signals",
                  "Payment behavior",
                  "Sector weakness",
                  "Covenant breaches",
                  "Utilization changes",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <DiscussionSlide
        id="collections-strategy-and-treatment-design"
        tag="Module II"
        title={
          <>
            Collections Strategy and <Highlight>Treatment Design</Highlight>
          </>
        }
        items={[
          "Collections systems estimate which account, channel, timing, or hardship option is most likely to recover value.",
          "The best treatment is not always the most aggressive; it must balance recovery, customer outcome, and regulatory expectations.",
          "AI can improve prioritization, but firms still need policy boundaries for hardship, vulnerability, and escalation.",
        ]}
        question="When should a lender optimize for recovery efficiency, and when should it prioritize longer-term relationship preservation even at lower near-term cash recovery?"
      />

      <DiscussionSlide
        id="explainability-fairness-and-adverse-action"
        tag="Module II"
        title={
          <>
            Explainability, Fairness, and <Highlight>Adverse Action</Highlight>
          </>
        }
        items={[
          "Lending models operate under scrutiny because affected customers may be denied credit, priced differently, or sent to manual review.",
          "Institutions need explanations that are meaningful to risk managers, regulators, and customers, not only to data scientists.",
          "The core governance question is whether a model's performance is acceptable across segments, outcomes, and decision contexts.",
        ]}
        question="Should a lender use a more predictive model if its logic is materially harder to explain to customers and examiners?"
        quizData={quizBySlideId["explainability-fairness-and-adverse-action"]}
      />

      <CardGridSlide
        id="module-iii-fraud-aml-and-compliance"
        tag="Module III"
        title={
          <>
            Module III: <Highlight>Fraud, AML, and Compliance</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Adversarial behavior and controls",
            body: "This module focuses on adversarial behavior, financial crime detection, and regulatory control systems.",
          },
          {
            title: "Central challenge",
            body: "The central challenge is reducing losses and false positives at the same time.",
          },
        ]}
      />

      <ListAsideSlide
        id="fraud-detection-as-an-adversarial-problem"
        tag="Module III"
        title={
          <>
            Fraud Detection as an <Highlight>Adversarial Problem</Highlight>
          </>
        }
        items={[
          "Fraud is adaptive: once a pattern is detected, attackers change timing, identity, channel, or transaction structure.",
          "Effective systems combine historical patterns with device signals, behavioral context, network relationships, and case feedback.",
          "Static rules remain useful, but they degrade quickly when adversaries learn the thresholds.",
        ]}
        aside={
          <Quote className="my-0 h-full">
            Static rules remain useful, but they degrade quickly when
            adversaries learn the thresholds.
          </Quote>
        }
        quizData={quizBySlideId["fraud-detection-as-an-adversarial-problem"]}
      />

      <ListAsideSlide
        id="transaction-monitoring-and-anti-money-laundering"
        tag="Module III"
        title={
          <>
            Transaction Monitoring and{" "}
            <Highlight>Anti-Money Laundering</Highlight>
          </>
        }
        items={[
          "Transaction monitoring seeks suspicious flows, counterparties, geographies, or transaction patterns that merit investigation.",
          "AI can prioritize alerts, cluster related activity, and surface patterns that rules alone may miss.",
          "The system is only as credible as its documentation, investigator workflow, and escalation discipline.",
        ]}
        aside={
          <Callout title="Credibility" variant="secondary" className="mt-0">
            The system is only as credible as its documentation, investigator
            workflow, and escalation discipline.
          </Callout>
        }
      />

      <ListAsideSlide
        id="graph-analytics-and-entity-resolution"
        tag="Module III"
        title={
          <>
            Graph Analytics and <Highlight>Entity Resolution</Highlight>
          </>
        }
        items={[
          "Financial crime often spans accounts, merchants, devices, shell entities, and synthetic identities that appear unrelated in tabular views.",
          "Graph methods help connect shared addresses, phones, counterparties, and transaction paths into investigable networks.",
          "Entity resolution quality is a control issue because broken links can hide risk and weak links can create noise.",
        ]}
        aside={
          <PanelCard>
            <div>Networks become visible when entities resolve cleanly.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Accounts",
                  "Merchants",
                  "Devices",
                  "Shell entities",
                  "Synthetic identities",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <DiscussionSlide
        id="false-positives-customer-friction-and-inclusion"
        tag="Module III"
        title={
          <>
            False Positives, Customer Friction, and{" "}
            <Highlight>Inclusion</Highlight>
          </>
        }
        items={[
          "Overly sensitive detection systems block legitimate customers, delay payments, and erode trust at critical moments.",
          "Institutions must weigh the cost of friction against the cost of missed fraud and regulatory failure.",
          "Some groups may be disproportionately affected when proxies for unusual behavior overlap with non-standard but legitimate financial lives.",
        ]}
        question="How much customer friction is acceptable in exchange for a meaningful reduction in fraud and financial crime exposure?"
      />

      <CardGridSlide
        id="compliance-copilots-and-case-productivity"
        tag="Module III"
        title={
          <>
            Compliance Copilots and <Highlight>Case Productivity</Highlight>
          </>
        }
        cards={[
          {
            title: "Summaries and narratives",
            body: "Generative and retrieval systems can summarize alerts, assemble evidence, draft narratives, and route cases to the right reviewer.",
          },
          {
            title: "Operational leverage",
            body: "Their value is operational leverage for investigators, not autonomous compliance judgment.",
          },
          {
            title: "Traceability",
            body: "Firms need controls over hallucination, source traceability, and what content can enter the formal record.",
          },
        ]}
      />

      <CardGridSlide
        id="module-iv-markets-treasury-and-risk"
        tag="Module IV"
        title={
          <>
            Module IV: <Highlight>Markets, Treasury, and Risk</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Forecasting, trading support, and balance sheet decisions",
            body: "This module examines forecasting, trading support, balance sheet decisions, and risk management.",
          },
          {
            title: "Recurring issue",
            body: "The recurring issue is that more data does not remove uncertainty, especially in regime shifts.",
          },
        ]}
      />

      <ListAsideSlide
        id="market-forecasting-and-signal-extraction"
        tag="Module IV"
        title={
          <>
            Market Forecasting and <Highlight>Signal Extraction</Highlight>
          </>
        }
        items={[
          "AI can process prices, volumes, news, filings, macro releases, and alternative text streams faster than human analysts.",
          "The task is rarely to predict markets with certainty; it is to improve signal extraction and decision support under uncertainty.",
          "Leaders should distinguish between models that identify persistent structure and models that overfit recent noise.",
        ]}
        aside={
          <PanelCard>
            <div>Signal extraction depends on the right information mix.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Prices",
                  "Volumes",
                  "News",
                  "Filings",
                  "Macro releases",
                  "Alternative text streams",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <ListAsideSlide
        id="portfolio-construction-and-decision-support"
        tag="Module IV"
        title={
          <>
            Portfolio Construction and <Highlight>Decision Support</Highlight>
          </>
        }
        items={[
          "Portfolio tools can help rank opportunities, estimate correlations, rebalance exposures, and test scenarios under changing constraints.",
          "Their usefulness depends on assumptions about liquidity, turnover, transaction costs, and risk appetite.",
          "Portfolio recommendations should be treated as decision support unless governance explicitly permits automated execution.",
        ]}
        aside={
          <PanelCard>
            <div>Decision support depends on clear operating assumptions.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Liquidity",
                  "Turnover",
                  "Transaction costs",
                  "Risk appetite",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
        quizData={quizBySlideId["portfolio-construction-and-decision-support"]}
      />

      <CardGridSlide
        id="model-risk-in-non-stationary-environments"
        tag="Module IV"
        title={
          <>
            Model Risk in <Highlight>Non-Stationary</Highlight> Environments
          </>
        }
        cards={[
          {
            title: "Regime change",
            body: "Financial markets, customer behavior, and macro conditions change, sometimes abruptly.",
          },
          {
            title: "Failure under stress",
            body: "A model that performs well in one regime can fail precisely when volatility or structural breaks matter most.",
          },
          {
            title: "Lifecycle discipline",
            body: "Model risk management requires monitoring drift, challenger models, override policies, and disciplined retirement of stale systems.",
          },
        ]}
      />

      <ListAsideSlide
        id="stress-testing-and-scenario-analysis"
        tag="Module IV"
        title={
          <>
            Stress Testing and <Highlight>Scenario Analysis</Highlight>
          </>
        }
        items={[
          "Stress testing asks how portfolios and business lines behave under severe but plausible shocks.",
          "AI can accelerate scenario construction, loss estimation, narrative generation, and sensitivity analysis.",
          "The point is not to predict the future exactly, but to surface concentrations, vulnerabilities, and management actions before crisis conditions emerge.",
        ]}
        aside={
          <Callout title="Stress testing objective" className="mt-0">
            Surface concentrations, vulnerabilities, and management actions
            before crisis conditions emerge.
          </Callout>
        }
      />

      <ListAsideSlide
        id="treasury-liquidity-and-balance-sheet-management"
        tag="Module IV"
        title={
          <>
            Treasury, Liquidity, and <Highlight>Balance Sheet</Highlight>
            Management
          </>
        }
        items={[
          "Treasury teams need forecasts of cash flows, deposit stability, funding needs, collateral usage, and interest-rate sensitivity.",
          "AI can improve forecasting granularity and anomaly detection across a complex balance sheet.",
          "Managers still need explicit limits because liquidity decisions are intertwined with regulation, confidence, and market access.",
        ]}
        aside={
          <PanelCard>
            <div>
              Liquidity decisions are intertwined with regulation and
              confidence.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Cash flows",
                  "Deposit stability",
                  "Funding needs",
                  "Collateral usage",
                  "Interest-rate sensitivity",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <DiscussionSlide
        id="pricing-hedging-and-the-limits-of-automation"
        tag="Module IV"
        title={
          <>
            Pricing, Hedging, and the{" "}
            <Highlight>Limits of Automation</Highlight>
          </>
        }
        items={[
          "Some financial decisions can be optimized continuously, but full automation can amplify feedback loops and hidden assumptions.",
          "Pricing and hedging systems should be evaluated not only by local accuracy, but by their behavior under stress and low-liquidity conditions.",
        ]}
        question="Which market or treasury decisions should remain human-approved even if an automated system is usually faster and more consistent?"
      />

      <CardGridSlide
        id="module-v-operations-and-client-service"
        tag="Module V"
        title={
          <>
            Module V: <Highlight>Operations and Client Service</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Operational backbone",
            body: "This module shifts from high-stakes analytics to the operational backbone of finance.",
          },
          {
            title: "Near-term value",
            body: "Much of the near-term value in AI comes from process redesign rather than frontier modeling.",
          },
        ]}
      />

      <ListAsideSlide
        id="intelligent-document-processing"
        tag="Module V"
        title={
          <>
            Intelligent <Highlight>Document Processing</Highlight>
          </>
        }
        items={[
          "Financial firms handle applications, income documents, contracts, invoices, statements, policies, and regulatory forms at scale.",
          "AI can extract fields, compare documents, identify missing items, and route exceptions for review.",
          "The managerial benefit is shorter cycle time and cleaner downstream data, not merely optical character recognition.",
        ]}
        aside={
          <PanelCard>
            <div>
              Document workflows become operational bottlenecks at scale.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Applications",
                  "Income documents",
                  "Contracts",
                  "Invoices",
                  "Statements",
                  "Policies",
                  "Regulatory forms",
                ]}
                columns={4}
              />
            </div>
          </PanelCard>
        }
      />

      <ListAsideSlide
        id="reconciliation-exceptions-and-control-rooms"
        tag="Module V"
        title={
          <>
            Reconciliation, Exceptions, and <Highlight>Control Rooms</Highlight>
          </>
        }
        items={[
          "Many finance operations revolve around matching records across systems, identifying breaks, and resolving root causes quickly.",
          "Machine learning can prioritize exceptions, detect unusual break patterns, and learn which cases need experienced reviewers.",
          "Control quality depends on audit trails, override reason codes, and whether teams use AI outputs as prompts rather than hidden rules.",
        ]}
        aside={
          <Callout title="Control quality" variant="secondary" className="mt-0">
            Control quality depends on audit trails, override reason codes, and
            whether teams use AI outputs as prompts rather than hidden rules.
          </Callout>
        }
      />

      <ListAsideSlide
        id="customer-service-advice-and-relationship-support"
        tag="Module V"
        title={
          <>
            Customer Service, Advice, and{" "}
            <Highlight>Relationship Support</Highlight>
          </>
        }
        items={[
          "AI assistants can handle routine inquiries, summarize relationship history, and help staff prepare for conversations.",
          "In wealth management, insurance, or banking, suitability and fiduciary expectations shape what may be automated.",
          "The right design question is which interactions benefit from speed and consistency, and which require contextual human trust.",
        ]}
        aside={
          <Quote className="my-0 h-full">
            The right design question is which interactions benefit from speed
            and consistency, and which require contextual human trust.
          </Quote>
        }
      />

      <DiscussionSlide
        id="personalization-suitability-and-conduct-risk"
        tag="Module V"
        title={
          <>
            Personalization, Suitability, and{" "}
            <Highlight>Conduct Risk</Highlight>
          </>
        }
        items={[
          "Financial firms increasingly tailor offers, reminders, education, or next-best actions to customer context.",
          "Personalization can improve relevance, but unsuitable nudges may cross into manipulation or mis-selling.",
          "Managers need guardrails on objectives, product eligibility, vulnerability signals, and escalation when AI-generated guidance becomes too prescriptive.",
        ]}
        question="At what point does personalized financial guidance become a conduct risk rather than a service improvement?"
      />

      <CardGridSlide
        id="module-vi-governance-and-strategy"
        tag="Module VI"
        title={
          <>
            Module VI: <Highlight>Governance and Strategy</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Institutional capabilities",
            body: "This final module addresses the institutional capabilities required to scale AI responsibly in finance.",
          },
          {
            title: "Real differentiator",
            body: "The real differentiator is disciplined governance, not isolated pilot activity.",
          },
        ]}
      />

      <ListAsideSlide
        id="model-governance-across-the-lifecycle"
        tag="Module VI"
        title={
          <>
            Model Governance Across the <Highlight>Lifecycle</Highlight>
          </>
        }
        items={[
          "Financial institutions need controls for data sourcing, development, validation, deployment, monitoring, and retirement.",
          "Governance must clarify who approves use, who challenges assumptions, who owns incidents, and how exceptions are documented.",
          "A model inventory is useful only if it is tied to actual decision rights and review cadence.",
        ]}
        aside={
          <PanelCard>
            <div>Lifecycle governance is an end-to-end control problem.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Data sourcing",
                  "Development",
                  "Validation",
                  "Deployment",
                  "Monitoring",
                  "Retirement",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
        quizData={quizBySlideId["model-governance-across-the-lifecycle"]}
      />

      <ListAsideSlide
        id="data-governance-privacy-and-cybersecurity"
        tag="Module VI"
        title={
          <>
            Data Governance, Privacy, and <Highlight>Cybersecurity</Highlight>
          </>
        }
        items={[
          "Finance data is sensitive, connected, and valuable, making data governance a strategic control function.",
          "Institutions must manage access, retention, lineage, consent, vendor exposure, and prompt or model leakage risks.",
          "Security design is part of AI strategy because attackers may target both the institution and the models it depends on.",
        ]}
        aside={
          <PanelCard>
            <div>Data governance remains a strategic control function.</div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Access",
                  "Retention",
                  "Lineage",
                  "Consent",
                  "Vendor exposure",
                  "Prompt leakage risks",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <DiscussionSlide
        id="build-buy-or-partner"
        tag="Module VI"
        title={
          <>
            Build, <Highlight>Buy</Highlight>, or Partner
          </>
        }
        items={[
          "Some AI capabilities are better sourced from vendors with proven tooling, while others justify internal development because data, workflows, or risk appetite are unique.",
          "The decision depends on differentiation, integration burden, vendor transparency, speed, and supervisory comfort.",
          "Outsourcing execution does not outsource accountability for customer outcomes or control failures.",
        ]}
        question="Which finance AI capabilities should remain proprietary, and which should be treated as infrastructure?"
      />

      <ListAsideSlide
        id="generative-ai-in-finance-high-value-uses-and-red-lines"
        tag="Module VI"
        title={
          <>
            Generative AI in Finance: <Highlight>High-Value Uses</Highlight> and
            Red Lines
          </>
        }
        items={[
          "They are weakest when used as unchecked authorities for regulated advice, formal disclosures, or final risk approval.",
          "Institutions should define explicit red lines for autonomous use before experimentation spreads across teams.",
        ]}
        aside={
          <div className="flex h-full flex-col gap-6">
            <PanelCard>
              <div>
                Generative systems are strongest in summarization, knowledge
                retrieval, drafting, coding assistance, and analyst support.
              </div>
              <div className="mt-6">
                <InfoTiles
                  items={[
                    "Summarization",
                    "Knowledge retrieval",
                    "Drafting",
                    "Coding assistance",
                    "Analyst support",
                  ]}
                  columns={2}
                />
              </div>
            </PanelCard>
            <Callout title="Red lines" variant="secondary" className="mt-0">
              They are weakest when used as unchecked authorities for regulated
              advice, formal disclosures, or final risk approval.
            </Callout>
          </div>
        }
        quizData={
          quizBySlideId[
            "generative-ai-in-finance-high-value-uses-and-red-lines"
          ]
        }
      />

      <ListAsideSlide
        id="operating-model-talent-and-change-management"
        tag="Module VI"
        title={
          <>
            Operating Model, Talent, and{" "}
            <Highlight>Change Management</Highlight>
          </>
        }
        items={[
          "Durable adoption requires collaboration among business leaders, risk, compliance, operations, data teams, model validators, and legal partners.",
          "Talent strategy is less about hiring only specialists and more about building shared fluency between domain experts and technical teams.",
          "Change management matters because even accurate models fail when front-line staff do not trust the workflow or understand escalation.",
        ]}
        aside={
          <PanelCard>
            <div>
              Durable adoption depends on cross-functional collaboration.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Business leaders",
                  "Risk",
                  "Compliance",
                  "Operations",
                  "Data teams",
                  "Model validators",
                  "Legal partners",
                ]}
                columns={4}
              />
            </div>
          </PanelCard>
        }
      />

      <Slide id="conclusion-ai-in-finance-as-institutional-capability" border>
        <Tag>Conclusion</Tag>
        <Title>
          AI in Finance as <Highlight>Institutional Capability</Highlight>
        </Title>
        <div className="mt-12 w-full">
          <Row gap="medium" items="stretch" className="w-full">
            <Column spanRatio="1/3" align="stretch">
              <PanelCard title="Prediction, automation, and governance">
                The strongest finance applications combine prediction,
                automation, and governance around clearly owned decisions.
              </PanelCard>
            </Column>
            <Column spanRatio="1/3" align="stretch">
              <PanelCard title="Competitive advantage">
                Competitive advantage comes from embedding AI into credit,
                control, markets, service, and operations without weakening
                trust.
              </PanelCard>
            </Column>
            <Column spanRatio="1/3" align="stretch">
              <PanelCard title="Executive task">
                The executive task is not to automate finance wholesale, but to
                decide where machine intelligence improves judgment, resilience,
                and accountability.
              </PanelCard>
            </Column>
          </Row>
        </div>
      </Slide>
    </SlideDeck>
  );
}
