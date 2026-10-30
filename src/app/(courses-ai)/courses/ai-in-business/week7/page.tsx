"use client";

import React from "react";
import { SlideDeck, Slide } from "@/app/(courses-ai)/_components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  BODY,
  COL_RULE,
  DISPLAY,
  Discussion1,
  Head1,
  LEAD,
  MICRO,
  PAIR,
  PartPlate1,
  RULED,
  Verdict,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  BottleneckLab,
  CitizenDev,
  DebtLab,
  DiscoveryPipeline,
  DoubleDiamond,
  GuardrailPipeline,
  HarnessLab,
  RiskGrid,
  SecurityFlaws,
  TierPyramid,
  ToolEvolution,
  VibeVsTraditional,
  WireframeVsPrototype,
} from "./visuals";

// ============================================================================
// WEEK 7: AI IN PRODUCT DEVELOPMENT AND SOFTWARE ENGINEERING
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each sentence sits and which plate is drawn beside
// it. Plates live in ./visuals.tsx, exercises in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const T = "font-semibold text-[var(--ink)]";
const A = "text-[var(--accent)]";
const STACK = "space-y-4";
const GRID3 = "mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10";
const GRID2 = "mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14";
const CLOSE = `${LEAD} mt-8 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`;

/** A numbered list of sentences in a hairline grid. */
function Numbered({ items, cols = "md:grid-cols-2" }: { items: React.ReactNode[]; cols?: string }) {
  return (
    <ol className={`mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 ${cols}`}>
      {items.map((line, i) => (
        <li key={i} className="grid grid-cols-[2rem_1fr] border-b border-[var(--ink)]/10 py-4">
          <span aria-hidden className={`${MICRO} pt-1 text-[var(--ink-3)]`}>
            {i + 1}
          </span>
          <p className="font-sans text-base leading-[1.55] text-[var(--ink)] md:text-[1.0625rem]">{line}</p>
        </li>
      ))}
    </ol>
  );
}

export default function Week7Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 7</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            AI in Product Development and Software Engineering
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Artificial intelligence compresses the time and cost required to turn an idea into working
            software, shifting the bottleneck from typing code to problem specification, verification, and
            security governance.
          </p>
        </div>
      </Slide>

      {/* The Economics of Product Discovery and Software Creation */}
      <Slide id="economics" border align="left">
        <Head1>The Economics of Product Discovery and Software Creation</Head1>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Developing digital products and enterprise software historically required slow, sequential
              handoffs among business stakeholders, product managers, user-experience designers, and software
              engineers.
            </p>
            <p className={BODY}>
              Because custom software engineering was scarce and expensive, organizations built only a small
              fraction of the internal tools and product experiments they conceived.
            </p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              Software engineering became one of the earliest high-impact domains for large language models
              because programming languages have explicit syntax and abundant training repositories.
            </p>
            <p className={BODY}>
              Unlike open-ended prose, software code can be executed against compilers, type checkers, and
              automated test suites that provide <span className={T}>objective verification feedback</span>.
            </p>
          </div>
        </div>
        <Verdict>
          Lowering the marginal cost of writing code changes how products are{" "}
          <span className={A}>discovered, prototyped, tested, and governed</span> across the enterprise.
        </Verdict>
      </Slide>

      {/* Shifting the Bottleneck from Code Generation to Specification and Verification */}
      <Slide id="bottleneck" border align="left" exercise={exercise["bottleneck"]}>
        <Head1>Shifting the Bottleneck from Code Generation to Specification and Verification</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          When a language model can generate hundreds of lines of working code in seconds, writing initial
          syntax is no longer the primary bottleneck in software delivery.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <BottleneckLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            The binding constraint shifts upstream to <span className={T}>problem specification</span>:
            defining which customer problem is worth solving, what rules apply, and how edge cases should
            behave.
          </p>
          <p className={BODY}>
            The constraint also shifts downstream to <span className={T}>verification</span>: proving that
            the generated software is factually accurate, secure against attacks, and maintainable over time.
          </p>
          <p className={BODY}>
            Generating the wrong feature ten times faster destroys organizational value by cluttering the
            product and creating maintenance burden.
          </p>
        </div>
        <p className={CLOSE}>
          Product and engineering leaders must therefore reallocate human effort toward{" "}
          <span className={A}>clear specification before generation and rigorous verification after generation</span>.
        </p>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="AI-Assisted Product Discovery and Concept Generation"
        lines={[
          "Before a team writes production software, it must discover what users actually need and which product concepts are viable for the business.",
          "Language models and semantic embeddings accelerate product discovery by synthesizing unstructured user feedback and generating testable design alternatives.",
        ]}
      />

      {/* Synthesizing Unstructured User Research and Support Logs */}
      <Slide id="user-research" border align="left">
        <Head1>Synthesizing Unstructured User Research and Support Logs</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Product discovery</span> is the iterative process of identifying real
            customer problems and validating whether a proposed solution creates value before committing full
            engineering resources.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Organizations accumulate thousands of hours of unstructured product feedback across customer
            support tickets, sales call recordings, app-store reviews, and user interviews.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <DiscoveryPipeline />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Language models and embedding clusters synthesize this unstructured text into recurring friction
            themes, linking each theme to customer segments and renewal risk.
          </p>
          <p className={BODY}>
            Effective discovery pipelines preserve <span className={A}>full traceability</span>, so every
            summarized theme links directly to verbatim customer quotes and original session recordings.
          </p>
          <p className={BODY}>
            Grounding synthesis in linked source records prevents product teams from acting on hallucinated
            summaries or vocal-minority complaints.
          </p>
        </div>
      </Slide>

      {/* Divergent Concept Generation and Specification Drafting */}
      <Slide id="divergent-concepts" border align="left">
        <Head1>Divergent Concept Generation and Specification Drafting</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          Product design alternates between <span className={T}>divergent exploration</span> (generating many
          alternative ways to solve a problem) and <span className={T}>convergent selection</span> (narrowing
          options against technical and economic constraints).
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <DoubleDiamond />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            During divergent exploration, product teams use generative models to brainstorm alternative user
            flows, interface layouts, and onboarding sequences from a problem statement.
          </p>
          <p className={BODY}>
            During specification drafting, language models help translate rough design notes into structured
            Product Requirements Documents (PRDs), user stories, and edge-case checklists.
          </p>
          <p className={BODY}>
            A common failure mode is <span className={T}>specification bloat</span>: using a language model to
            expand three vague bullet points into a twenty-page document that nobody reads carefully.
          </p>
        </div>
        <p className={CLOSE}>
          High-quality AI-assisted specifications remain concise, focusing on{" "}
          <span className={A}>explicit acceptance criteria, data schemas, and measurable success metrics</span>.
        </p>
      </Slide>

      {/* Validating Product Hypotheses Before Full Engineering Build */}
      <Slide id="validating-hypotheses" border align="left" exercise={exercise["validating-hypotheses"]}>
        <Head1>Validating Product Hypotheses Before Full Engineering Build</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Product management frameworks evaluate every proposed feature across four distinct risks: value
          risk, usability risk, feasibility risk, and business viability risk.
        </p>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Value risk</span> asks whether customers truly want the capability, while{" "}
            <span className={T}>usability risk</span> asks whether users can understand and navigate the
            interface without confusion.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Feasibility risk</span> asks whether the system can be built reliably within
            technical constraints, and <span className={T}>viability risk</span> asks whether it complies with
            legal, financial, and brand rules.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <RiskGrid />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            Generative tools dramatically lower the cost of testing usability and technical feasibility by
            allowing teams to build interactive prototypes in <span className={A}>hours rather than weeks</span>.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            However, fast prototyping does not eliminate value or viability risk: only real user behavior and
            unit-economics analysis can confirm whether a product should be scaled.
          </p>
        </div>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Vibe Coding and Natural-Language Prototyping"
        lines={[
          "Natural-language coding environments allow users to create working software applications by describing what they want in plain English.",
          "Understanding both the speed of natural-language prototyping and its structural limits is essential for product managers and business leaders.",
        ]}
      />

      {/* What Is Vibe Coding? */}
      <Slide id="vibe-coding" border align="left" exercise={exercise["vibe-coding"]}>
        <Head1>What Is Vibe Coding?</Head1>
        <p className={`${DISPLAY} mt-8 max-w-5xl`}>
          <span className={A}>Vibe coding</span> is the practice of building functional software by prompting
          a language model in natural language and evaluating the running application visually, without
          manually reading or editing the underlying code.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <VibeVsTraditional />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            In a vibe-coding workflow, the creator describes a desired screen or calculation, runs the
            generated program, pastes any error message back into the model, and iterates until the interface
            works.
          </p>
          <p className={BODY}>
            This approach empowers non-engineers, including product managers, marketers, and financial
            analysts, to turn abstract ideas into working interactive tools in a single afternoon.
          </p>
          <p className={BODY}>
            Vibe coding differs fundamentally from <span className={T}>AI-assisted software engineering</span>,
            in which professional developers use models to speed up typing and refactoring while inspecting and
            owning every line of source code.
          </p>
        </div>
        <p className={CLOSE}>
          Treating vibe coding and production software engineering as interchangeable is one of the most
          common organizational errors in enterprise AI adoption.
        </p>
      </Slide>

      {/* Interactive Prototypes Versus Static Wireframes */}
      <Slide id="prototypes-wireframes" border align="left">
        <Head1>Interactive Prototypes Versus Static Wireframes</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Historically, product managers communicated feature ideas using written documents and{" "}
            <span className={T}>static wireframes</span>, which are flat drawings of screens that cannot
            process real inputs.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Static wireframes frequently hide interaction problems, awkward multi-step transitions, and edge
            cases in data formatting until engineers are weeks into construction.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <WireframeVsPrototype />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Natural-language coding tools allow product teams to bring functional prototypes to stakeholder
            reviews and customer usability sessions instead of static drawings.
          </p>
          <p className={BODY}>
            When test users interact with a live prototype populated with{" "}
            <span className={A}>realistic sample data</span>, they give concrete feedback on workflow friction
            that they could never spot on a slide.
          </p>
          <p className={BODY}>
            Iterating on a disposable prototype in hours prevents the far greater expense of rewriting
            production engineering code after launch.
          </p>
        </div>
      </Slide>

      {/* The Prototype-to-Production Trap */}
      <Slide id="prototype-trap" border align="left">
        <Head1>The Prototype-to-Production Trap</Head1>
        <div className={PAIR}>
          <p className={LEAD}>
            A working prototype built in three hours often creates an illusion for executives that the
            finished enterprise software is <span className={A}>90 percent complete</span>.
          </p>
          <p className={`${LEAD} ${COL_RULE}`}>
            In reality, a prototype demonstrates only the <span className={T}>happy path</span> for a single
            user operating on clean sample data under ideal conditions.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            Production enterprise software requires capabilities that remain invisible in a demo: identity
            authentication, role-based access control, encryption, audit logging, database concurrency, and
            automated error recovery.
          </p>
          <p className={BODY}>
            A vibe-coded application may appear polished on screen while storing passwords in plain text,
            exposing customer records across accounts, or crashing when ten users click simultaneously.
          </p>
        </div>
        <Verdict>
          Moving from a validated prototype to a production system requires a deliberate engineering phase
          that establishes architecture, security boundaries, and automated verification.
        </Verdict>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Agentic Software Engineering Workflows"
        lines={[
          "Inside professional engineering organizations, AI tools have progressed from simple line-by-line code completion to autonomous agents that operate across entire software repositories.",
          "Agentic software engineering pairs language models with deterministic developer tools, including compilers, linters, and test runners, in a closed verification loop.",
        ]}
      />

      {/* From Autocomplete Copilots to Autonomous Coding Agents */}
      <Slide id="coding-agents" border align="left" exercise={exercise["coding-agents"]}>
        <Head1>From Autocomplete Copilots to Autonomous Coding Agents</Head1>
        <div className="mt-8 w-full max-w-5xl">
          <ToolEvolution />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            First-generation coding assistants operated as <span className={T}>inline autocomplete</span>{" "}
            tools, predicting the next few tokens or lines inside the single file a developer had open.
          </p>
          <p className={BODY}>
            Second-generation assistants added <span className={T}>conversational chat</span>, allowing
            developers to paste an error message or function and receive an explanation or code snippet in
            reply.
          </p>
          <p className={BODY}>
            Third-generation tools operate as <span className={T}>autonomous coding agents</span> that can
            search an entire codebase, plan changes across multiple files, execute terminal commands, and
            inspect test results.
          </p>
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            When assigned a bug report or feature specification, a coding agent reads the relevant modules,
            edits the code, runs the test suite, reads any failure output, and iterates until all checks pass.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Software engineering is uniquely suited to agentic loops because compilers and test suites provide{" "}
            <span className={A}>fast, unambiguous ground-truth feedback</span> at every step.
          </p>
        </div>
      </Slide>

      {/* Automated Testing, Verification Loops, and Continuous Refactoring */}
      <Slide id="verification-loops" border align="left">
        <Head1>Automated Testing, Verification Loops, and Continuous Refactoring</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          An autonomous coding agent is only as trustworthy as the{" "}
          <span className={A}>automated verification harness</span> that evaluates its work.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <HarnessLab />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Unit tests</span> verify that individual functions return the exact expected
            output for both typical inputs and boundary edge cases, such as zero balances or missing fields.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Integration tests</span> verify that separate modules, databases, and external
            APIs communicate properly across a complete user workflow.
          </p>
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Without strong automated tests, an agent instructed to fix a bug may silence the error message by
            deleting a required validation check, breaking downstream business logic.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            When backed by a comprehensive test suite, coding agents excel at{" "}
            <span className={T}>continuous refactoring</span>: modernizing legacy frameworks, updating API
            versions, and cleaning up duplicated code across hundreds of files.
          </p>
        </div>
      </Slide>

      {/* Spec-Driven Development and Human Code Review */}
      <Slide id="spec-driven" border align="left">
        <Head1>Spec-Driven Development and Human Code Review</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          As coding agents take over routine implementation, the daily craft of software engineering shifts
          toward <span className={T}>specification-driven development</span> and architectural review.
        </p>
        <Numbered
          items={[
            "Before launching an agent on a task, the engineer writes a precise technical specification defining the target behavior, data structures, module interfaces, and test cases to satisfy.",
            "Breaking a large project into small, well-specified tasks prevents the agent from drifting across architectural boundaries or making incompatible design assumptions.",
            "Every pull request generated by an agent still requires human code review before merging into the main production branch.",
          ]}
          cols="md:grid-cols-3"
        />
        <Verdict>
          Human reviewers focus on high-level concerns that automated syntax checks cannot judge:{" "}
          <span className={A}>alignment with business rules, data privacy compliance, and long-term system simplicity</span>.
        </Verdict>
      </Slide>

      {/* Discussion: Evaluating a Vibe-Coded Customer Portal at a Logistics Firm */}
      <Slide id="discussion-logistics" border align="left">
        <Head1>Discussion: Evaluating a Vibe-Coded Customer Portal at a Logistics Firm</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>An operations manager at a regional freight brokerage
          uses a natural-language coding platform over a weekend to build a web portal where customers can type
          their account number, view unpaid freight invoices, and submit delivery address changes. Impressed by
          the live demo on Monday morning, the Vice President of Sales asks the IT department to publish the
          portal on the company website by Friday. What specific security, data-integrity, and operational
          risks are hidden behind this working demo, and how should leadership structure the transition from
          this prototype to a production system?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="Managing Technical Debt, Security, and Verification"
        lines={[
          "While AI coding tools increase the volume of code produced per developer, uncurated machine generation can rapidly accumulate technical debt and security vulnerabilities.",
          "Engineering leaders must measure long-term maintenance health and enforce automated security guardrails across the software supply chain.",
        ]}
      />

      {/* Technical Debt and Codebase Comprehension */}
      <Slide id="technical-debt" border align="left" exercise={exercise["technical-debt"]}>
        <Head1>Technical Debt and Codebase Comprehension</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Technical debt</span> is the future rework cost and development slowdown
            incurred when a team chooses a quick, messy software implementation instead of a clean modular
            design.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Generative AI changes how technical debt accumulates: because generating new lines of code is
            nearly effortless, unguided models frequently copy and paste similar blocks of code rather than
            reusing shared functions.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <DebtLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Codebase bloat increases maintenance cost because a future change to a business rule, such as a tax
            calculation, must be found and updated in <span className={A}>twelve places instead of one</span>.
          </p>
          <p className={BODY}>
            A related hazard is <span className={T}>comprehension debt</span>, which arises when a team merges
            thousands of lines of machine-generated code that no human engineer on the team fully understands.
          </p>
          <p className={BODY}>
            When a critical system fails in production, comprehension debt increases outage duration because
            engineers must decipher unfamiliar machine-written logic under time pressure.
          </p>
        </div>
      </Slide>

      {/* Security Vulnerabilities in Machine-Generated Code */}
      <Slide id="security-vulnerabilities" border align="left" exercise={exercise["security-vulnerabilities"]}>
        <Head1>Security Vulnerabilities in Machine-Generated Code</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Language models are trained on vast public code repositories that contain decades of insecure
            coding habits, deprecated cryptography, and unpatched vulnerabilities.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Unless explicitly constrained, coding models frequently reproduce classic security flaws, including{" "}
            <span className={T}>SQL injection</span> (building database queries directly from unvalidated user
            text) and missing authorization checks.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <SecurityFlaws />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Models and novice builders also accidentally embed sensitive API keys or database credentials
            directly inside client-side code where any web browser user can inspect them.
          </p>
          <p className={BODY}>
            A vulnerability unique to generative AI is <span className={T}>package hallucination</span>: a
            model may import a plausible-sounding open-source library name that does not actually exist.
          </p>
          <p className={BODY}>
            Attackers exploit this pattern through <span className={A}>slopsquatting</span>, registering
            commonly hallucinated package names on public registries and filling them with malware that runs as
            soon as a developer installs the suggested dependency.
          </p>
        </div>
      </Slide>

      {/* Automated Guardrails, Static Analysis, and Sandboxed Execution */}
      <Slide id="guardrails" border align="left">
        <Head1>Automated Guardrails, Static Analysis, and Sandboxed Execution</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          Organizations manage the risks of machine-generated software by embedding deterministic security
          checks into their continuous integration and continuous deployment (CI/CD) pipelines.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <GuardrailPipeline />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Static application security testing (SAST)</span> tools automatically scan
            every proposed code change for insecure patterns, type errors, and hardcoded secret keys before a
            human even reviews it.
          </p>
          <p className={BODY}>
            <span className={T}>Software composition analysis</span> and internal package allowlists block
            developers and agents from installing unverified third-party libraries or hallucinated packages.
          </p>
          <p className={BODY}>
            Furthermore, autonomous coding agents that execute shell commands and tests must run inside{" "}
            <span className={A}>isolated sandboxes</span>, which are restricted virtual containers with no
            access to production databases or live customer networks.
          </p>
        </div>
        <p className={CLOSE}>
          Combining agentic speed with strict, non-negotiable automated gates allows teams to ship faster
          without lowering enterprise security standards.
        </p>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Organizational Shifts Between Business Units, Product, and IT"
        lines={[
          "When employees outside engineering can generate working scripts, dashboards, and applications in natural language, traditional boundaries between business units and IT change.",
          "Capturing the speed of decentralized building without creating an ungovernable sprawl of insecure apps requires a tiered organizational model.",
        ]}
      />

      {/* Citizen Development and the Rise of Domain Builders */}
      <Slide id="citizen-development" border align="left">
        <Head1>Citizen Development and the Rise of Domain Builders</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Citizen development</span> occurs when non-engineering domain experts in
            finance, marketing, operations, or human resources build software tools and automations to solve
            local workflow problems.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            In traditional enterprises, requests for small internal utilities, such as a custom commission
            calculator or a vendor onboarding tracker, waited months or years in central IT backlogs.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CitizenDev />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Domain experts possess deep knowledge of business rules and edge cases, whereas central software
            engineers often spend weeks learning the domain before writing a single line of code.
          </p>
          <p className={BODY}>
            Natural-language coding tools allow domain experts to build and refine local utilities directly,
            eliminating <span className={A}>translation errors</span> between business requirements and
            software implementation.
          </p>
          <p className={BODY}>
            However, without clear platform boundaries, decentralized building can produce hundreds of
            undocumented <span className={T}>shadow applications</span> that break when their creator changes
            roles.
          </p>
        </div>
      </Slide>

      {/* Tiered Governance: Disposable Tools Versus Core Systems */}
      <Slide id="tiered-governance" border align="left" exercise={exercise["tiered-governance"]}>
        <Head1>Tiered Governance: Disposable Tools Versus Core Systems</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Enterprise governance fails when it applies the same heavy approval process to a one-off
            spreadsheet script as it does to the core customer billing system.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            A <span className={A}>risk-tiered governance framework</span> classifies software into three
            distinct tiers based on user scope, data sensitivity, and operational criticality.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <TierPyramid />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Tier 1</span> covers personal and small-team utilities operating on
            non-sensitive or synthetic data, such as a local formatting script or an interactive UI prototype,
            which domain builders can create freely inside approved sandboxes.
          </p>
          <p className={BODY}>
            <span className={T}>Tier 2</span> covers shared departmental tools and internal dashboards, which
            must run on IT-managed hosting with single sign-on authentication, role-based data permissions, and
            peer review.
          </p>
          <p className={BODY}>
            <span className={T}>Tier 3</span> covers customer-facing products, financial transaction systems,
            and regulated decision pipelines, which require full professional software engineering, security
            audits, and formal change control.
          </p>
        </div>
      </Slide>

      {/* Redefining the Product, Engineering, and IT Partnership */}
      <Slide id="partnership" border align="left">
        <Head1>Redefining the Product, Engineering, and IT Partnership</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Low-barrier software creation causes adjacent roles in product development to overlap more closely
          while making core engineering expertise even more valuable.
        </p>
        <div className="mt-10 grid w-full max-w-6xl gap-8 border-t border-[var(--ink)]/15 pt-8 md:grid-cols-3 md:gap-10">
          <div>
            <p className={`${MICRO} text-[var(--ink-3)]`}>Product and design</p>
            <p className={`${BODY} mt-3`}>
              Product managers and designers increasingly build functional prototypes to validate user
              workflows directly, reducing reliance on engineering capacity for early experiments.
            </p>
          </div>
          <div className={COL_RULE.replace("md:pl-14", "md:pl-10")}>
            <p className={`${MICRO} text-[var(--ink-3)]`}>Engineering</p>
            <p className={`${BODY} mt-3`}>
              Professional software engineers spend less time writing routine form-handling code and more time
              designing resilient system architectures, shared APIs, automated test harnesses, and data
              pipelines.
            </p>
          </div>
          <div className={COL_RULE.replace("md:pl-14", "md:pl-10")}>
            <p className={`${MICRO} text-[var(--ink-3)]`}>Central IT</p>
            <p className={`${BODY} mt-3`}>
              Central IT evolves from a bottleneck that manually builds every internal form into an enablement
              platform that provides secure templates, governed data connectors, and sandboxed hosting for
              business units.
            </p>
          </div>
        </div>
        <Verdict>
          Explicit <span className={A}>graduation rules</span> specify when a successful Tier 1 or Tier 2
          business-built tool has become mission-critical and must be refactored and adopted by the
          professional engineering team.
        </Verdict>
      </Slide>

      {/* Discussion: Governing Decentralized Software Creation at a Wealth Management Firm */}
      <Slide id="discussion-wealth" border align="left">
        <Head1>Discussion: Governing Decentralized Software Creation at a Wealth Management Firm</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>At a mid-sized wealth management firm, several financial
          advisors and operations analysts have used natural-language coding tools to build custom internal web
          apps that pull client portfolio holdings, compute tax-loss harvesting scenarios, and generate client
          report PDFs. Central IT discovers these applications only after an advisor accidentally shares a
          public URL that exposes another client&apos;s account balances. Why would an outright ban on AI coding
          tools backfire, and how should the Chief Information Officer design a three-tier governance framework
          and sandboxed platform that preserves advisor innovation while protecting client privacy and
          calculation accuracy?
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <Numbered
          items={[
            "Generative AI lowers the cost and time of writing code, shifting the primary bottleneck in software delivery upstream to problem specification and downstream to verification.",
            "In product discovery, language models synthesize unstructured customer feedback with source citations and accelerate divergent concept exploration and interactive prototyping.",
            "Vibe coding enables non-engineers to build functional prototypes in hours to test usability, but a working prototype lacks the security, concurrency, and reliability required for production deployment.",
            "Agentic software engineering pairs language models with compilers, type checkers, and automated unit and integration tests in a closed loop, elevating the engineer's role to architecture and spec-driven review.",
            "Unchecked machine code generation accelerates code duplication, comprehension debt, security vulnerabilities, and hallucinated package risks, requiring automated static analysis and sandboxed execution.",
            "Organizations balance speed and safety through a three-tier governance model that empowers domain experts to build local tools in IT-managed sandboxes while reserving core systems for professional engineering rigor.",
          ]}
        />
      </Slide>
    </SlideDeck>
  );
}
