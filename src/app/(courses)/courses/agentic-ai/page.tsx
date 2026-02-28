import React from "react";
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
  Card,
  ContentTitle,
  ContentDescription,
  DiscussionCard,
  ContentText,
  AnimatedList,
  ListItem,
  Callout,
} from "@/app/(courses)/_components/SlideComponents";
import { BackgroundManager } from "@/app/(courses)/_components/Backgrounds";

export default function AgenticAIPresentation() {
  return (
    // <SlideDeck background={<BackgroundManager type="agentic" />}>
    <SlideDeck>
      {/* Slide 1: Introduction to the New Paradigm */}
      <Slide>
        <Tag>Introduction</Tag>
        <Title>Agentic AI and Vibe Coding</Title>
        <Subtitle variant="hero">
          The new paradigm in software development (2025-2026).
        </Subtitle>
        <Row gap="large" className="mt-12">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>The Shift</ContentTitle>
              <ContentDescription>
                Moving away from manual syntax writing to Agentic AI and Vibe
                Coding. The barrier to creating software has plummeted.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Discussion">
              How has your own interaction with technology and software creation
              changed since the introduction of advanced AI?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 2: Defining Agentic AI */}
      <Slide>
        <Tag>Definitions</Tag>
        <Heading>
          Defining <Highlight>Agentic AI</Highlight>
        </Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Systems designed to act autonomously, pursue defined goals, and
              execute decisions with minimal human intervention.
            </ContentText>
            <AnimatedList>
              <ListItem>
                From 2024 "AI Copilots" to 2026 "Autonomous Agents".
              </ListItem>
              <ListItem>
                Agents now negotiate, research, and execute tasks outside the
                IDE.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Group Activity">
              Think of a complex, multi-step task in your daily job. How would
              an autonomous "agent" handle it differently than an assistant
              "copilot"?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 3: The Microservices Moment for AI */}
      <Slide>
        <Tag>Architecture</Tag>
        <Heading>
          The <Highlight>Microservices</Highlight> Moment
        </Heading>
        <Subtitle variant="section">
          Multi-agent orchestration over monolithic LLMs
        </Subtitle>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>Orchestrator Agent</ContentTitle>
              <ContentDescription>
                Coordinates specialized sub-agents working in parallel (e.g.,
                data analyst, coding agent, QA agent). This mirrors the shift
                from monolithic to microservices architecture.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Brainstorm">
              If you had to build a team of specialized AI agents for your
              current project, what specific roles and responsibilities would
              you assign to them?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 4: Extended Autonomous Execution */}
      <Slide>
        <Tag>Capabilities</Tag>
        <Heading>Extended Autonomous Execution</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Callout title="Continuous Work" variant="primary">
              By 2026, agents can work continuously for days, navigating legacy
              codebases and building entire applications autonomously.
            </Callout>
            <ContentText layout="prose">
              Humans now provide strategic oversight at key decision checkpoints
              rather than micro-managing the code.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Risk Analysis">
              What are the potential risks of giving AI continuous, autonomous
              execution capabilities without continuous human monitoring?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 5: Governance-First Design */}
      <Slide>
        <Tag>Security</Tag>
        <Heading>Governance-First Design</Heading>
        <Subtitle variant="section">Establishing boundaries and logs</Subtitle>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Security and governance cannot be an afterthought.
              </ListItem>
              <ListItem>
                Strict permission boundaries and decision logs are central.
              </ListItem>
              <ListItem>
                Human-in-the-loop approval prevents rogue actions.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Process Design">
              In an automated software development lifecycle, where are the most
              critical points to place a mandatory "human-in-the-loop"
              checkpoint?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 6: The "Vibe Coding" Phenomenon */}
      <Slide>
        <Tag>Culture</Tag>
        <Heading>
          The <Highlight>Vibe Coding</Highlight> Phenomenon
        </Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>Chatbot-Based Development</ContentTitle>
              <ContentDescription>
                Users express intentions in high-level plain speech ("vibes"),
                while AI handles syntax and execution. Coined in Feb 2025 by
                Andrej Karpathy.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Debate">
              Do you feel that writing software based on "vibes" makes
              technology more accessible, or does it inherently reduce the
              quality of the final product?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 7: The "Code First, Refine Later" Philosophy */}
      <Slide>
        <Tag>Methodology</Tag>
        <Heading>Code First, Refine Later</Heading>
        <Subtitle variant="section">
          Prioritizing momentum over structural planning
        </Subtitle>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Creators use natural language prompts in tools like Cursor,
              accepting code without reviewing internal logic.
            </ContentText>
            <Callout title="Conversational Debugging" variant="secondary">
              Bugs are fixed via follow-up prompts rather than traditional
              line-by-line debugging.
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Business Scenarios">
              In what specific business scenarios is rapid, flawed prototyping
              more valuable than perfectly structured, maintainable code?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 8: The Democratization of Software Creation */}
      <Slide>
        <Tag>Impact</Tag>
        <Heading>Democratization of Software</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Non-technical workers (marketing, legal, sales) building
                functional digital products.
              </ListItem>
              <ListItem>
                Amateurs spinning up MVPs over a weekend without knowing a
                programming language.
              </ListItem>
              <ListItem>
                Shift of power from IT to the rest of the organization.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Organizational Change">
              If anyone in any department can create software, how does the role
              of the traditional enterprise IT department need to adapt?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 9: Vibe Coding vs. Professional Engineering */}
      <Slide>
        <Tag>Comparison</Tag>
        <Heading>
          Vibes vs. <Highlight>Engineering</Highlight>
        </Heading>
        <Subtitle variant="section">A strict line emerges</Subtitle>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>The Divide</ContentTitle>
              <ContentDescription>
                Vibe coding is unstructured and exploratory. AI-assisted
                engineering requires structured systems understanding
                architecture, constraints, and trade-offs.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Enterprise Strategy">
              How can a company safely encourage the creative experimentation of
              vibe coding without risking the stability of their production
              environments?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 10: Spec-Driven Development */}
      <Slide>
        <Tag>Professional</Tag>
        <Heading>Spec-Driven Development</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              In professional environments, AI generates code, writes tests, and
              performs security reviews based on deep architectural planning.
            </ContentText>
            <Callout title="Human Ownership" variant="primary">
              The human engineer retains full ownership, comprehension, and
              accountability of the codebase.
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Requirement Gathering">
              What are the essential components of a "rigorous technical spec"
              when you are delegating tasks to an AI rather than a human
              developer?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 11: Accelerated Technical Debt */}
      <Slide>
        <Tag>Risks</Tag>
        <Heading>
          Accelerated <Highlight>Technical Debt</Highlight>
        </Heading>
        <Subtitle variant="section">Writing bad code faster</Subtitle>
        <Row gap="large">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                AI tools can write flawed or poorly integrated code at lightning
                speed.
              </ListItem>
              <ListItem>
                Applications built purely on vibes become incredibly brittle
                over time.
              </ListItem>
              <ListItem>
                Massive accumulations of technical debt must eventually be
                reconciled.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Debt Management">
              How should engineering teams measure and manage technical debt
              when code is being generated at ten times the traditional speed?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 12: The "Maintenance Cliff" */}
      <Slide>
        <Tag>Failure Modes</Tag>
        <Heading>The "Maintenance Cliff"</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>The Breaking Point</ContentTitle>
              <ContentDescription>
                Occurs when an app becomes too complex for the AI to fix via
                simple prompts, but the human creator lacks the skill to fix it
                manually. Often results in project abandonment.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Personal Experience">
              Have you ever built or relied on a system you didn't fully
              understand? How did you handle the situation when it eventually
              broke?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 13: Security Vulnerabilities and AI */}
      <Slide>
        <Tag>Security</Tag>
        <Heading>Security Vulnerabilities</Heading>
        <Subtitle variant="section">
          Blindly accepting AI-generated code
        </Subtitle>
        <Row gap="large">
          <Column spanRatio="1/2">
            <ContentText layout="base">
              Professional teams pivot agentic AI to act as automated,
              adversarial security reviewers to analyze outputs for
              vulnerabilities.
            </ContentText>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Trust & Auditing">
              Should we trust AI to audit its own code for security flaws, or
              does security review fundamentally require a human perspective?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 14: The Illusion of Competence */}
      <Slide>
        <Tag>Skills Gap</Tag>
        <Heading>The Illusion of Competence</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <AnimatedList>
              <ListItem>
                Writing reliable software requires specifying edge cases,
                designing UX, and planning for scale.
              </ListItem>
              <ListItem>
                Natural language prompts are often "wish lists" rather than
                engineering blueprints.
              </ListItem>
              <ListItem>
                Apps work flawlessly in ideal conditions but break under
                real-world strain.
              </ListItem>
            </AnimatedList>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Training">
              How do we train the next generation of technologists to spot edge
              cases when the AI does the heavy lifting for them?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 15: The Shift: Instruction vs. Orchestration */}
      <Slide>
        <Tag>Evolution</Tag>
        <Heading>
          Instruction vs. <Highlight>Orchestration</Highlight>
        </Heading>
        <Subtitle variant="section">
          A historical shift in human-computer interaction
        </Subtitle>
        <Row gap="large">
          <Column spanRatio="1/2">
            <Card>
              <ContentTitle>From 'How' to 'What'</ContentTitle>
              <ContentDescription>
                Moving from telling computers exactly how to do something
                (instruction) to telling them what we want to achieve
                (orchestration). Focus shifts to systems thinking.
              </ContentDescription>
            </Card>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Future Skills">
              As we fully transition to an orchestration mindset, what
              traditional tech skills will become obsolete, and what new skills
              will become the most valuable?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>

      {/* Slide 16: Building a Maintainable Future */}
      <Slide>
        <Tag>Conclusion</Tag>
        <Heading>Building a Maintainable Future</Heading>
        <Row gap="large" items="center">
          <Column spanRatio="1/2">
            <ContentText layout="prose">
              The future relies on combining the creative freedom of "vibes"
              with the strict guardrails of traditional software engineering.
            </ContentText>
            <Callout title="Dual Approach" variant="primary">
              Vibe coding turns ideas into reality in hours for hobbyists.
              Enterprise teams harness Agentic systems responsibly.
            </Callout>
          </Column>
          <Column spanRatio="1/2">
            <DiscussionCard title="Action Plan">
              What is one practical step or policy your team can implement
              tomorrow to begin adapting to the Agentic AI and vibe coding era?
            </DiscussionCard>
          </Column>
        </Row>
      </Slide>
    </SlideDeck>
  );
}
