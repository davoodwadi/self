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
} from "@/app/(courses)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";

type TileColumns = 1 | 2 | 3 | 4;

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
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
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
}: {
  id: string;
  tag: string;
  title: ReactNode;
  cards: GridCard[];
  columns?: 2 | 3 | 4;
}) {
  const spanRatio: "1/2" | "1/3" | "1/4" =
    columns === 2 ? "1/2" : columns === 4 ? "1/4" : "1/3";

  return (
    <Slide id={id} border>
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
  asideSpan = "1/3",
}: {
  id: string;
  tag: string;
  title: ReactNode;
  items: ReactNode[];
  aside?: ReactNode;
  asideSpan?: "1/3" | "1/2";
}) {
  const mainSpan: "full" | "1/2" | "2/3" = aside
    ? asideSpan === "1/2"
      ? "1/2"
      : "2/3"
    : "full";

  return (
    <Slide id={id} border>
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
}: {
  id: string;
  tag: string;
  title: ReactNode;
  items: ReactNode[];
  question: ReactNode;
}) {
  return (
    <ListAsideSlide
      id={id}
      tag={tag}
      title={title}
      items={items}
      aside={<DiscussionCard title="Discussion">{question}</DiscussionCard>}
    />
  );
}

export default function AIInHumanResourcesCourse() {
  return (
    <SlideDeck background={<BackgroundManager type="introduction" />}>
      <Slide id="title-slide">
        <Tag>Applications of AI in Business</Tag>
        <Title>
          Applications of AI in <Highlight>Human Resources</Highlight>
        </Title>
        <Subtitle variant="hero">
          How intelligent systems reshape talent acquisition, workforce
          planning, development, governance, and employee experience
        </Subtitle>
      </Slide>

      <ListAsideSlide
        id="why-hr-became-an-ai-domain"
        tag="Week 04"
        title={
          <>
            Why HR Became an <Highlight>AI Domain</Highlight>
          </>
        }
        items={[
          "Human resources manages repeated decisions about hiring, staffing, development, performance, retention, and compliance under uncertainty.",
          "Digital HR systems now capture recruiting activity, learning records, collaboration traces, employee feedback, and workflow histories at scale.",
          "AI matters in HR when it improves judgment quality, operating speed, or organizational consistency without weakening fairness or trust.",
        ]}
        aside={
          <PanelCard>
            <div>
              HR is a repeated decision environment with growing data depth.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Hiring",
                  "Staffing",
                  "Development",
                  "Performance",
                  "Retention",
                  "Compliance",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <CardGridSlide
        id="the-hr-function-as-a-decision-architecture"
        tag="Week 04"
        title={
          <>
            The HR Function as a <Highlight>Decision Architecture</Highlight>
          </>
        }
        cards={[
          {
            title: "Strategy into people decisions",
            body: "HR connects strategy to people decisions across recruiting, workforce design, development, rewards, employee relations, and culture.",
          },
          {
            title: "Fragmented signals into action",
            body: "Each subfunction converts fragmented workforce information into recommendations, approvals, or interventions.",
          },
          {
            title: "Where review stays human",
            body: "The managerial issue is deciding which judgments can be augmented reliably and which require human review because the social cost of error is high.",
          },
        ]}
      />

      <Slide id="value-creation-in-ai-enabled-hr" border>
        <Tag>Week 04</Tag>
        <Heading>
          <Highlight>Value Creation</Highlight> in AI-Enabled HR
        </Heading>
        <Row gap="medium" items="stretch" className="w-full">
          <Column spanRatio="1/3">
            <Metric
              value="Talent"
              label="Faster hiring, better allocation, stronger internal mobility"
            />
          </Column>
          <Column spanRatio="1/3">
            <Metric
              value="Ops"
              label="Automation in screening, scheduling, document handling, and policy support"
            />
          </Column>
          <Column spanRatio="1/3">
            <Metric
              value="Risk"
              label="Earlier detection of compliance gaps, pay inequities, burnout signals, and inconsistent management"
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
            title: "How the domain is framed",
            body: "This module frames HR as a domain of classification, prediction, optimization, summarization, and governed judgment.",
          },
          {
            title: "What the module separates",
            body: "The aim is to separate genuinely high-value applications from uses that create administrative speed but strategic harm.",
          },
        ]}
      />

      <ListAsideSlide
        id="hr-data-signal-quality-and-context"
        tag="Module I"
        title={
          <>
            HR Data, <Highlight>Signal Quality</Highlight>, and Context
          </>
        }
        items={[
          "Core inputs include applicant records, job histories, skills inventories, learning activity, engagement data, compensation records, and policy cases.",
          "Useful signals are rarely complete because HR data is fragmented across systems, managers, vendors, and informal work practices.",
          "In people decisions, definitions, data lineage, and context often matter more than model complexity because labels are noisy and outcomes evolve over time.",
        ]}
        aside={
          <PanelCard>
            <div>
              Signal quality matters more than model novelty when labels drift.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Applicant records",
                  "Job histories",
                  "Skills inventories",
                  "Learning activity",
                  "Engagement data",
                  "Compensation records",
                  "Policy cases",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <CardGridSlide
        id="matching-ai-method-to-the-hr-task"
        tag="Module I"
        title={
          <>
            Matching AI Method to the <Highlight>HR Task</Highlight>
          </>
        }
        cards={[
          {
            title: "Supervised learning",
            body: "Supervised learning supports attrition prediction, candidate ranking, workforce demand forecasting, and case classification when outcomes are labeled.",
          },
          {
            title: "Unsupervised methods",
            body: "Unsupervised methods help identify skill clusters, unusual workforce patterns, or emerging segments when categories are not yet known.",
          },
          {
            title: "Generative systems",
            body: "Generative systems are strongest in summarization, drafting, retrieval, and manager support rather than autonomous people decisions.",
          },
        ]}
      />

      <ListAsideSlide
        id="human-judgment-in-high-stakes-people-decisions"
        tag="Module I"
        title={
          <>
            Human Judgment in <Highlight>High-Stakes</Highlight> People
            Decisions
          </>
        }
        items={[
          "Employment decisions affect livelihoods, legal exposure, managerial legitimacy, and the credibility of the HR function.",
          "Human oversight is most important when evidence is incomplete, context is sensitive, or the decision can materially alter a person's trajectory.",
          "Good system design clarifies escalation, documentation, and override rules instead of assuming automation is the objective.",
        ]}
        aside={
          <Callout title="System design" variant="secondary" className="mt-0">
            Good system design clarifies escalation, documentation, and override
            rules instead of assuming automation is the objective.
          </Callout>
        }
      />

      <ListAsideSlide
        id="measuring-success-beyond-efficiency"
        tag="Module I"
        title={
          <>
            Measuring Success <Highlight>Beyond Efficiency</Highlight>
          </>
        }
        items={[
          "Faster processing is useful, but HR value should also be measured through quality of hire, internal fill rates, retention, capability growth, and manager adoption.",
          "Some apparent gains are misleading if they reduce candidate quality, intensify bias, or create compliance rework later.",
          "Executives need metrics that connect HR automation to enterprise outcomes rather than only transactional throughput.",
        ]}
        aside={
          <PanelCard>
            <div>
              Operational speed matters only when it connects to workforce
              outcomes.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Quality of hire",
                  "Internal fill rates",
                  "Retention",
                  "Capability growth",
                  "Manager adoption",
                ]}
                columns={1}
              />
            </div>
          </PanelCard>
        }
      />

      <CardGridSlide
        id="module-ii-recruiting-and-talent-access"
        tag="Module II"
        title={
          <>
            Module II: <Highlight>Recruiting and Talent Access</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Where AI changes recruiting",
            body: "This module examines how AI changes sourcing, screening, interviews, and recruiting operations.",
          },
          {
            title: "Core managerial challenge",
            body: "The central challenge is improving speed and fit while preserving fairness, transparency, and labor-market credibility.",
          },
        ]}
      />

      <ListAsideSlide
        id="sourcing-and-candidate-discovery"
        tag="Module II"
        title={
          <>
            Sourcing and <Highlight>Candidate Discovery</Highlight>
          </>
        }
        items={[
          "AI can help identify likely candidates across internal databases, external platforms, alumni networks, and adjacent talent pools.",
          "Better discovery expands recruiter reach and helps surface candidates whose experience does not map neatly to traditional job titles.",
          "The strategic gain is not merely more applicants, but better access to relevant talent in constrained labor markets.",
        ]}
        aside={
          <PanelCard>
            <div>
              Discovery broadens access when talent does not fit standard
              labels.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Internal databases",
                  "External platforms",
                  "Alumni networks",
                  "Adjacent talent pools",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <ListAsideSlide
        id="resume-screening-and-candidate-matching"
        tag="Module II"
        title={
          <>
            Resume Screening and <Highlight>Candidate Matching</Highlight>
          </>
        }
        items={[
          "Matching systems compare applicant profiles to role requirements, inferred skills, prior outcomes, and hiring patterns.",
          "Their usefulness depends on whether job requirements are current, outcome labels are reliable, and the model is not simply replicating historical preference.",
          "Screening tools should support prioritization and structured review rather than serving as hidden gatekeepers.",
        ]}
        aside={
          <Quote className="my-0 h-full">
            Screening tools should support prioritization and structured review
            rather than serving as hidden gatekeepers.
          </Quote>
        }
      />

      <CardGridSlide
        id="interview-intelligence-and-structured-assessment"
        tag="Module II"
        title={
          <>
            Interview Intelligence and{" "}
            <Highlight>Structured Assessment</Highlight>
          </>
        }
        cards={[
          {
            title: "Interview guide generation",
            body: "AI can help generate interview guides, summarize interview notes, and identify whether assessments cover the intended competencies consistently.",
          },
          {
            title: "Reducing noise",
            body: "Structured evaluation is often more valuable than prediction alone because it reduces noise across interviewers and hiring teams.",
          },
          {
            title: "What should be reinforced",
            body: "Systems should reinforce evidence-based assessment rather than reward fluency, confidence, or resume polish unrelated to job performance.",
          },
        ]}
      />

      <ListAsideSlide
        id="candidate-experience-and-recruiting-operations"
        tag="Module II"
        title={
          <>
            Candidate Experience and{" "}
            <Highlight>Recruiting Operations</Highlight>
          </>
        }
        items={[
          "Recruiting teams use AI to schedule interviews, answer routine candidate questions, draft communications, and track process bottlenecks.",
          "Operational improvements matter because candidate experience affects acceptance rates, employer brand, and recruiter productivity.",
          "Automation should reduce uncertainty for candidates, not increase the sense that nobody is accountable for the process.",
        ]}
        aside={
          <PanelCard>
            <div>
              Operational gains matter because process quality shapes employer
              credibility.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Scheduling",
                  "Candidate questions",
                  "Draft communications",
                  "Bottleneck tracking",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <DiscussionSlide
        id="fairness-adverse-impact-and-hiring-governance"
        tag="Module II"
        title={
          <>
            Fairness, Adverse Impact, and{" "}
            <Highlight>Hiring Governance</Highlight>
          </>
        }
        items={[
          "Hiring models require scrutiny because they influence who gets seen, who advances, and which qualifications are treated as signals of merit.",
          "Governance should test for disparate outcomes, unstable proxies, and role-specific assumptions that no longer fit the labor market.",
          "Clear documentation is essential when vendors supply the model logic but the employer carries the employment risk.",
        ]}
        question="Should an employer accept a materially faster recruiting process if the scoring logic remains only partially explainable to candidates, managers, and legal reviewers?"
      />

      <CardGridSlide
        id="module-iii-workforce-planning-and-organizational-design"
        tag="Module III"
        title={
          <>
            Module III:{" "}
            <Highlight>Workforce Planning and Organizational Design</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Scope of planning support",
            body: "This module focuses on how AI supports workforce forecasting, staffing, skills visibility, and retention planning.",
          },
          {
            title: "Managerial objective",
            body: "The managerial objective is to align labor supply, capability needs, and organizational resilience under changing business conditions.",
          },
        ]}
      />

      <ListAsideSlide
        id="workforce-demand-forecasting"
        tag="Module III"
        title={
          <>
            Workforce Demand <Highlight>Forecasting</Highlight>
          </>
        }
        items={[
          "AI can estimate hiring needs, overtime pressure, capacity gaps, and role demand by combining business forecasts with historical labor patterns.",
          "Forecast quality improves when models reflect seasonality, business-unit strategy, productivity assumptions, and external labor constraints.",
          "Leaders should treat workforce forecasts as decision support because restructuring, policy shifts, and macro shocks can quickly change the picture.",
        ]}
        aside={
          <PanelCard>
            <div>
              Forecasts only help when business assumptions remain visible.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Seasonality",
                  "Business-unit strategy",
                  "Productivity assumptions",
                  "External labor constraints",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <DiscussionSlide
        id="skills-graphs-and-the-internal-labor-market"
        tag="Module III"
        title={
          <>
            Skills Graphs and the <Highlight>Internal Labor Market</Highlight>
          </>
        }
        items={[
          "Skills inference systems connect roles, experiences, credentials, projects, and learning history into a dynamic view of organizational capability.",
          "The strategic opportunity is better internal mobility, smarter succession planning, and reduced dependence on external hiring for every capability gap.",
          "Skills systems are only useful when employees and managers trust that inferred skills are current, relevant, and not silently punitive.",
        ]}
        question="Should firms rely on inferred skills data to shape promotion and mobility opportunities when many high-value capabilities are still informal, relational, or poorly documented?"
      />

      <ListAsideSlide
        id="scheduling-staffing-and-frontline-allocation"
        tag="Module III"
        title={
          <>
            Scheduling, Staffing, and{" "}
            <Highlight>Frontline Allocation</Highlight>
          </>
        }
        items={[
          "In labor-intensive settings, AI can optimize schedules, shift coverage, location staffing, and contingency plans against service demand.",
          "Operational gains come from matching labor supply to customer volume while reducing understaffing, overtime, and avoidable churn.",
          "Optimization should respect legal constraints, fatigue, fairness, and employee autonomy rather than treating labor as a purely mathematical input.",
        ]}
        aside={
          <Callout
            title="Optimization boundary"
            variant="secondary"
            className="mt-0"
          >
            Optimization should respect legal constraints, fatigue, fairness,
            and employee autonomy.
          </Callout>
        }
      />

      <DiscussionSlide
        id="attrition-risk-and-retention-intervention"
        tag="Module III"
        title={
          <>
            Attrition Risk and <Highlight>Retention Intervention</Highlight>
          </>
        }
        items={[
          "Retention models aim to identify employees or segments with elevated exit risk before turnover becomes visible in manager reporting.",
          "High-performing systems still require care because the intervention may change behavior, expectations, or employee trust.",
          "The relevant question is not only who may leave, but which actions are legitimate, effective, and ethically defensible.",
        ]}
        question="When does predictive retention become a strategic advantage, and when does it become an intrusive practice that changes the employment relationship for the worse?"
      />

      <ListAsideSlide
        id="organizational-network-analysis-and-collaboration-patterns"
        tag="Module III"
        title={
          <>
            Organizational Network Analysis and{" "}
            <Highlight>Collaboration Patterns</Highlight>
          </>
        }
        items={[
          "Digital collaboration traces can reveal bottlenecks, overloaded connectors, isolated teams, and hidden dependencies across the organization.",
          "These insights can improve succession planning, team design, integration after restructuring, and leadership visibility into how work actually flows.",
          "Network analytics must be handled carefully because behavioral visibility can quickly be perceived as surveillance if governance is weak.",
        ]}
        aside={
          <PanelCard>
            <div>
              Visibility into collaboration can guide redesign or trigger
              surveillance concerns.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Bottlenecks",
                  "Overloaded connectors",
                  "Isolated teams",
                  "Hidden dependencies",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <CardGridSlide
        id="module-iv-learning-development-and-performance"
        tag="Module IV"
        title={
          <>
            Module IV:{" "}
            <Highlight>Learning, Development, and Performance</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "What this module covers",
            body: "This module examines how AI supports capability building, managerial coaching, performance review quality, and reward decisions.",
          },
          {
            title: "Strategic theme",
            body: "The strategic theme is moving from generic HR programs to more targeted workforce development without reducing people to narrow metrics.",
          },
        ]}
      />

      <ListAsideSlide
        id="personalized-learning-and-capability-building"
        tag="Module IV"
        title={
          <>
            Personalized Learning and <Highlight>Capability Building</Highlight>
          </>
        }
        items={[
          "AI can recommend learning pathways based on role requirements, career goals, adjacent skills, and current performance gaps.",
          "Personalization is useful when it increases relevance and completion, not when it overwhelms employees with automated content suggestions.",
          "Learning systems should connect development activity to real internal opportunities so capability building is tied to mobility and business need.",
        ]}
        aside={
          <PanelCard>
            <div>
              Learning matters when it connects directly to real mobility and
              business need.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Role requirements",
                  "Career goals",
                  "Adjacent skills",
                  "Performance gaps",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <ListAsideSlide
        id="knowledge-retrieval-and-manager-copilots"
        tag="Module IV"
        title={
          <>
            Knowledge Retrieval and <Highlight>Manager Copilots</Highlight>
          </>
        }
        items={[
          "HR and people managers increasingly need fast access to policy guidance, coaching templates, job architectures, and process rules.",
          "Retrieval-based copilots can improve consistency and reduce routine administrative burden across dispersed management populations.",
          "Their value depends on source quality, access controls, and whether ambiguous issues are escalated to qualified HR partners.",
        ]}
        aside={
          <Callout title="Copilot value" className="mt-0">
            Retrieval-based copilots help most when source quality, access
            control, and escalation paths remain disciplined.
          </Callout>
        }
      />

      <CardGridSlide
        id="performance-management-and-goal-calibration"
        tag="Module IV"
        title={
          <>
            Performance Management and <Highlight>Goal Calibration</Highlight>
          </>
        }
        cards={[
          {
            title: "Summarizing evidence",
            body: "AI can help summarize feedback, detect inconsistency in manager narratives, and compare evaluation patterns across teams or job families.",
          },
          {
            title: "What improves",
            body: "The benefit is stronger calibration and earlier identification of inflated, missing, or weakly evidenced reviews.",
          },
          {
            title: "What stays human",
            body: "Performance systems should support better judgment, not replace manager accountability for coaching, context, and difficult conversations.",
          },
        ]}
      />

      <DiscussionSlide
        id="rewards-promotion-and-pay-equity-analytics"
        tag="Module IV"
        title={
          <>
            Rewards, Promotion, and <Highlight>Pay Equity Analytics</Highlight>
          </>
        }
        items={[
          "AI can surface unexplained pay variation, promotion bottlenecks, and inconsistent reward outcomes across comparable employee groups.",
          "These tools help move equity analysis from episodic review to ongoing monitoring tied to actual decision processes.",
          "Governance is essential because salary, promotion, and bonus decisions are socially sensitive and legally consequential.",
        ]}
        question="Should firms use algorithmic recommendations in promotion and compensation cycles if doing so improves consistency but may narrow managerial discretion and contextual judgment?"
      />

      <DiscussionSlide
        id="productivity-analytics-and-responsible-monitoring"
        tag="Module IV"
        title={
          <>
            Productivity Analytics and{" "}
            <Highlight>Responsible Monitoring</Highlight>
          </>
        }
        items={[
          "Organizations can combine workflow data, output data, and collaboration data to estimate capacity constraints, workload patterns, and process bottlenecks.",
          "Used well, productivity analytics can support redesign of work, team staffing, and manager coaching rather than individual policing.",
          "Used poorly, the same tools can create fear, gaming behavior, and degraded trust across the workforce.",
        ]}
        question="Where is the boundary between legitimate operational analytics and unacceptable employee surveillance in knowledge-intensive work?"
      />

      <CardGridSlide
        id="module-v-employee-listening-dei-and-compliance"
        tag="Module V"
        title={
          <>
            Module V:{" "}
            <Highlight>Employee Listening, DEI, and Compliance</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "Signal interpretation",
            body: "This module addresses employee sentiment, inclusion analytics, case management, and legal boundaries.",
          },
          {
            title: "The central challenge",
            body: "The challenge is interpreting workforce signals responsibly without overclaiming what the data actually means.",
          },
        ]}
      />

      <ListAsideSlide
        id="employee-listening-and-sentiment-interpretation"
        tag="Module V"
        title={
          <>
            Employee Listening and{" "}
            <Highlight>Sentiment Interpretation</Highlight>
          </>
        }
        items={[
          "AI can summarize survey comments, open-text feedback, exit interviews, and service-center narratives into recurring themes and emerging concerns.",
          "The value lies in scale and speed, especially when leaders need to distinguish local operational issues from enterprise-wide cultural patterns.",
          "Sentiment outputs should be treated as directional evidence because silence, fear, and context can distort what employees choose to say.",
        ]}
        aside={
          <Quote className="my-0 h-full">
            Sentiment outputs should be treated as directional evidence because
            silence, fear, and context can distort what employees choose to say.
          </Quote>
        }
      />

      <ListAsideSlide
        id="dei-analytics-and-representation-risk"
        tag="Module V"
        title={
          <>
            DEI Analytics and <Highlight>Representation Risk</Highlight>
          </>
        }
        items={[
          "AI-enabled analytics can track representation patterns, funnel drop-off, promotion velocity, pay dispersion, and program participation across groups.",
          "These analyses help identify structural barriers that may not be visible in aggregate workforce dashboards.",
          "Leaders still need careful interpretation because representation gaps do not automatically reveal causality or the right intervention.",
        ]}
        aside={
          <PanelCard>
            <div>
              Representation analytics can surface barriers without proving
              their cause.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Representation patterns",
                  "Funnel drop-off",
                  "Promotion velocity",
                  "Pay dispersion",
                  "Program participation",
                ]}
                columns={1}
              />
            </div>
          </PanelCard>
        }
      />

      <ListAsideSlide
        id="employee-relations-case-triage-and-policy-guidance"
        tag="Module V"
        title={
          <>
            Employee Relations, Case Triage, and{" "}
            <Highlight>Policy Guidance</Highlight>
          </>
        }
        items={[
          "HR teams can use AI to classify cases, summarize documents, surface policy precedents, and route matters to the right specialist more quickly.",
          "This can reduce administrative delay in investigations, leave management, accommodation requests, and misconduct response.",
          "Because cases may involve trauma, legal exposure, or power imbalance, AI should support workflow discipline rather than final judgment.",
        ]}
        aside={
          <Callout title="Case handling" variant="secondary" className="mt-0">
            AI should support workflow discipline rather than final judgment in
            socially sensitive cases.
          </Callout>
        }
      />

      <DiscussionSlide
        id="privacy-consent-and-employment-law-boundaries"
        tag="Module V"
        title={
          <>
            Privacy, Consent, and{" "}
            <Highlight>Employment Law Boundaries</Highlight>
          </>
        }
        items={[
          "HR data often includes health information, compensation details, identity attributes, grievances, and performance records that require strict access control.",
          "AI programs must be designed around employment law, labor standards, privacy obligations, records retention, and cross-border data handling rules.",
          "Leaders should assume that technically possible analysis is often broader than legally or ethically acceptable analysis.",
        ]}
        question="Which categories of workforce data should remain off-limits for predictive modeling even if they would improve forecast accuracy or managerial control?"
      />

      <CardGridSlide
        id="module-vi-governance-and-the-strategic-operating-model"
        tag="Module VI"
        title={
          <>
            Module VI:{" "}
            <Highlight>Governance and the Strategic Operating Model</Highlight>
          </>
        }
        columns={2}
        cards={[
          {
            title: "What the final module focuses on",
            body: "This final module focuses on how organizations scale HR AI responsibly across policy, technology, operating model, and trust.",
          },
          {
            title: "What differentiates mature adopters",
            body: "The strategic differentiator is disciplined governance and adoption, not isolated pilots with impressive demonstrations.",
          },
        ]}
      />

      <ListAsideSlide
        id="ai-governance-for-hr-across-the-lifecycle"
        tag="Module VI"
        title={
          <>
            AI Governance for HR Across the <Highlight>Lifecycle</Highlight>
          </>
        }
        items={[
          "HR AI requires controls for problem definition, data selection, validation, deployment, monitoring, incident handling, and retirement.",
          "Governance should clarify who owns the use case, who reviews legal risk, who validates outcomes, and who has authority to stop deployment.",
          "A model inventory is valuable only when it is linked to decisions, review cadence, and documented accountability.",
        ]}
        aside={
          <PanelCard>
            <div>
              Governance only matters when it is tied to named owners and
              operating decisions.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Problem definition",
                  "Data selection",
                  "Validation",
                  "Deployment",
                  "Monitoring",
                  "Incident handling",
                  "Retirement",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <DiscussionSlide
        id="build-buy-or-partner-in-the-hr-technology-stack"
        tag="Module VI"
        title={
          <>
            Build, Buy, or Partner in the{" "}
            <Highlight>HR Technology Stack</Highlight>
          </>
        }
        items={[
          "Some capabilities can be sourced from established HR vendors, while others require internal design because workflows, labor strategy, or risk tolerance are distinctive.",
          "The choice depends on integration burden, vendor transparency, configurability, data portability, and internal capability.",
          "Purchasing software does not transfer accountability for employment outcomes, fairness concerns, or regulatory exposure.",
        ]}
        question="Which HR AI capabilities should be treated as strategic internal assets, and which are mature enough to buy as standardized infrastructure?"
      />

      <ListAsideSlide
        id="change-management-and-workforce-trust"
        tag="Module VI"
        title={
          <>
            Change Management and <Highlight>Workforce Trust</Highlight>
          </>
        }
        items={[
          "Even accurate tools fail when employees, managers, works councils, or HR partners do not trust how the system is used.",
          "Adoption improves when organizations explain use cases clearly, define limits, train managers, and create credible appeal paths.",
          "Trust is built through visible governance, not through claims that the technology is objective or inevitable.",
        ]}
        aside={
          <Quote className="my-0 h-full">
            Trust is built through visible governance, not through claims that
            the technology is objective or inevitable.
          </Quote>
        }
      />

      <CardGridSlide
        id="talent-strategy-for-an-ai-enabled-hr-function"
        tag="Module VI"
        title={
          <>
            Talent Strategy for an <Highlight>AI-Enabled HR Function</Highlight>
          </>
        }
        cards={[
          {
            title: "Capability mix",
            body: "HR teams need a mix of domain expertise, data literacy, process design, change leadership, and legal awareness.",
          },
          {
            title: "Shared fluency",
            body: "The capability challenge is not hiring a few specialists alone, but building shared fluency between HR practitioners, business leaders, and technical teams.",
          },
          {
            title: "Managerial capability",
            body: "A mature HR function treats AI literacy as part of managerial capability, not as a side project owned by a small innovation team.",
          },
        ]}
      />

      <ListAsideSlide
        id="strategic-operating-model-for-enterprise-hr-ai"
        tag="Module VI"
        title={
          <>
            Strategic Operating Model for{" "}
            <Highlight>Enterprise HR AI</Highlight>
          </>
        }
        items={[
          "The most durable model links business priorities, HR process ownership, data governance, legal review, and product management.",
          "Use cases should be prioritized by business value, implementation readiness, workforce impact, and governance complexity.",
          "Enterprise scale requires common standards for data, evaluation, monitoring, vendor review, and exception handling across HR domains.",
        ]}
        aside={
          <PanelCard>
            <div>
              Enterprise scale depends on common standards, not isolated pilots.
            </div>
            <div className="mt-6">
              <InfoTiles
                items={[
                  "Business value",
                  "Implementation readiness",
                  "Workforce impact",
                  "Governance complexity",
                ]}
                columns={2}
              />
            </div>
          </PanelCard>
        }
      />

      <Slide id="conclusion-hr-as-a-strategic-intelligence-function" border>
        <Tag>Conclusion</Tag>
        <Heading>
          HR as a <Highlight>Strategic Intelligence</Highlight> Function
        </Heading>
        <Row gap="large" items="stretch" className="w-full">
          <Column spanRatio="2/3" align="stretch">
            <AnimatedList>
              <ListItem>
                The strongest HR applications combine prediction, automation,
                and human judgment around clearly owned people decisions.
              </ListItem>
              <ListItem>
                Competitive advantage comes from using AI to improve talent
                quality, workforce resilience, and managerial consistency
                without weakening legitimacy.
              </ListItem>
              <ListItem>
                The executive task is not to automate HR wholesale, but to
                decide where intelligent systems strengthen capability,
                fairness, and organizational trust.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/3" align="stretch" justify="start">
            <Callout title="Executive task" className="mt-0">
              Decide where intelligent systems strengthen capability, fairness,
              and organizational trust.
            </Callout>
          </Column>
        </Row>
      </Slide>
    </SlideDeck>
  );
}
