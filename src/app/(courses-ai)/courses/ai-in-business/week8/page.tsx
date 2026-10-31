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
  AIStack,
  ArchetypeGrid,
  BreakEvenLab,
  Commoditization,
  ExperimentLab,
  FlywheelLab,
  FrontierShift,
  MoatMatrix,
  OperatingModels,
  PilotFunnel,
  PortfolioMatrix,
  ROILedger,
  ValueChain,
} from "./visuals";

// ============================================================================
// WEEK 8: AI IN BUSINESS STRATEGY
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
const FIG = "mt-8 w-full max-w-5xl";

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

export default function Week8Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 8</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            AI in Business Strategy
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Sustainable competitive advantage from artificial intelligence comes not from renting public model
            APIs, but from proprietary data loops, workflow integration, rigorous ROI experimentation, and
            organizational execution.
          </p>
        </div>
      </Slide>

      {/* Operational Effectiveness Versus Strategic Differentiation */}
      <Slide id="operational-effectiveness" border align="left" exercise={exercise["operational-effectiveness"]}>
        <Head1>Operational Effectiveness Versus Strategic Differentiation</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            In corporate strategy, <span className={T}>operational effectiveness</span> means performing the
            same business activities faster, cheaper, or with fewer defects than before.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Strategic differentiation</span> means configuring activities and proprietary
            assets in a distinctive way that delivers unique value competitors cannot easily copy.
          </p>
        </div>
        <div className={FIG}>
          <FrontierShift />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            When every firm in an industry licenses the same commercial AI copilot to summarize meetings or
            draft emails, the entire industry&apos;s productivity baseline rises together.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Adopting off-the-shelf AI tools is necessary to maintain parity, but it does not confer a lasting
            competitive advantage if rivals can purchase the exact same capability tomorrow.
          </p>
        </div>
        <p className={CLOSE}>
          Durable strategic advantage requires embedding AI into{" "}
          <span className={A}>proprietary datasets, specialized domain workflows, and complementary assets</span>{" "}
          that competitors cannot replicate from a public API.
        </p>
      </Slide>

      {/* Value Creation Versus Value Capture in Technological Shifts */}
      <Slide id="value-capture" border align="left">
        <Head1>Value Creation Versus Value Capture in Technological Shifts</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Economic history shows that technologies that create massive value for society do not automatically
          generate superior profits for the firms that adopt them.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            <span className={T}>Value creation</span> is the total economic benefit a product or process
            generates by lowering costs or improving quality for customers.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Value capture</span> is the portion of that total benefit that a firm retains
            as operating profit rather than competing away in price cuts or paying out to infrastructure
            suppliers.
          </p>
        </div>
        <p className={`${BODY} ${RULED}`}>
          When textile mills electrified factories or retailers launched standard e-commerce websites, cost
          savings were quickly passed on to consumers through lower market prices while profit margins remained
          flat.
        </p>
        <Verdict>
          A sound AI strategy asks not only whether a model improves a workflow, but also{" "}
          <span className={A}>what prevents competitors from copying the deployment</span> and competing the
          margin away.
        </Verdict>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="Where Value Accrues in the AI Stack"
        lines={[
          "The modern artificial intelligence ecosystem is organized as a vertical technology stack spanning physical hardware, foundation models, data infrastructure, and end-user applications.",
          "Analyzing the market structure and switching costs of each layer clarifies where profit margins concentrate and where capabilities become commoditized.",
        ]}
      />

      {/* The Four Layers of the Enterprise AI Stack */}
      <Slide id="ai-stack" border align="left" exercise={exercise["ai-stack"]}>
        <Head1>The Four Layers of the Enterprise AI Stack</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          The enterprise AI stack consists of four interdependent layers, each governed by different economic
          forces and capital requirements.
        </p>
        <div className={FIG}>
          <AIStack />
        </div>
        <div className="mt-8 grid w-full max-w-6xl gap-6 md:grid-cols-4 md:gap-8">
          <p className={BODY}>
            At the base sits the <span className={T}>hardware and compute layer</span>, comprising specialized
            semiconductor accelerators, networking fabric, energy generation, and hyperscale data centers.
          </p>
          <p className={BODY}>
            Above compute sits the <span className={T}>foundation model layer</span>, where proprietary labs and
            open-weight consortia train large language, vision, and multimodal models.
          </p>
          <p className={BODY}>
            The third layer is <span className={T}>enterprise data and orchestration infrastructure</span>,
            including vector databases, feature stores, retrieval pipelines, security guardrails, and
            observability tools.
          </p>
          <p className={BODY}>
            At the top sits the <span className={A}>application workflow layer</span>, where models are embedded
            inside specific business processes such as clinical triage, tax preparation, or supply chain
            planning.
          </p>
        </div>
      </Slide>

      {/* Commoditization Pressure at the Foundation Model Layer */}
      <Slide id="commoditization" border align="left">
        <Head1>Commoditization Pressure at the Foundation Model Layer</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          Training a frontier foundation model requires hundreds of millions or billions of dollars in compute
          capital, yet standalone model APIs face intense commoditization pressure.
        </p>
        <div className={FIG}>
          <Commoditization />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Multiple commercial providers and open-weight releases repeatedly converge in accuracy on standard
            language, coding, and reasoning benchmarks within months of each new release.
          </p>
          <p className={BODY}>
            Because developers interact with language models through standardized text and JSON interfaces, the
            switching cost of swapping one general-purpose model API for another is low.
          </p>
          <p className={BODY}>
            Over the past several years, the price per million tokens for a fixed level of model capability has
            fallen by <span className={A}>more than 80 percent annually</span> as hardware and smaller distilled
            models improve.
          </p>
        </div>
        <p className={CLOSE}>
          Consequently, startups and enterprise initiatives built as <span className={T}>thin user-interface
          wrappers</span> around a public prompt lack a defensible moat against both rival wrappers and the model
          providers themselves.
        </p>
      </Slide>

      {/* Complementary Assets and Workflow Integration */}
      <Slide id="complementary-assets" border align="left">
        <Head1>Complementary Assets and Workflow Integration</Head1>
        <div className={PAIR}>
          <p className={LEAD}>
            When the core algorithmic engine is widely accessible through APIs or open weights, value capture
            shifts toward complementary assets.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Complementary assets</span> are the non-algorithmic capabilities required to
            turn a prediction into a commercial outcome, including regulatory approvals, brand trust,
            distribution channels, and physical fulfillment networks.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            In enterprise software, the strongest complementary asset is{" "}
            <span className={A}>deep workflow integration with the system of record</span> where employees
            already make decisions and store audited transactions.
          </p>
          <p className={BODY}>
            A standalone model that flags supply chain delays has low switching costs, whereas a model embedded
            directly into a firm&apos;s ERP purchase-order approval rules and supplier contracts is hard to
            displace.
          </p>
        </div>
        <Verdict>
          Incumbent firms that modernize their core workflows around AI can often defend their market position
          against algorithm-only entrants that lack distribution and institutional trust.
        </Verdict>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Data Moats, Feedback Loops, and Network Effects"
        lines={[
          "Executives frequently claim that their company's historical database is a competitive moat, yet most corporate data reserves confer no strategic advantage at all.",
          "Distinguishing commodity data from proprietary outcome feedback loops is essential for deciding where to invest engineering capital.",
        ]}
      />

      {/* What Makes a Data Asset a True Competitive Moat? */}
      <Slide id="data-moat" border align="left" exercise={exercise["data-moat"]}>
        <Head1>What Makes a Data Asset a True Competitive Moat?</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Under the <span className={T}>resource-based view</span> of strategy, an asset creates sustained
            competitive advantage only if it is valuable, rare, costly to imitate, and non-substitutable.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Raw data volume rarely meets this standard: terabytes of public web text, generic customer chat
            logs, or third-party demographic tables can be purchased or synthetically generated by any
            competitor.
          </p>
        </div>
        <div className={FIG}>
          <MoatMatrix />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            A genuine data moat requires proprietary records generated as an exclusive byproduct of the
            firm&apos;s operations that cannot be bought on the open market.
          </p>
          <p className={BODY}>
            Most importantly, a strategic dataset must capture <span className={A}>closed-loop outcomes</span>:
            not merely what inputs entered a workflow, but which specific action was taken and whether that
            action succeeded or failed in the real world.
          </p>
          <p className={BODY}>
            Ten years of proprietary loan underwriting decisions paired with verified repayment outcomes, or
            millions of industrial machine sensor traces paired with verified mechanical failures, constitute
            durable data moats.
          </p>
        </div>
      </Slide>

      {/* Data Flywheels and Diminishing Returns to Scale */}
      <Slide id="data-flywheels" border align="left">
        <Head1>Data Flywheels and Diminishing Returns to Scale</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            A <span className={T}>data flywheel</span> is a self-reinforcing loop in which a superior product
            attracts more users, user interactions generate more labeled training data, and those data further
            improve the model.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            While data flywheels are powerful in theory, statistical learning curves exhibit diminishing
            marginal returns as sample size grows.
          </p>
        </div>
        <div className={FIG}>
          <FlywheelLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Moving from 1,000 labeled examples to 100,000 examples often produces a dramatic jump in model
            accuracy, whereas moving from 10 million to 100 million static examples often yields negligible
            gains.
          </p>
          <p className={BODY}>
            If the underlying task is static, a competitor with 5 percent of the market leader&apos;s data volume
            may still reach <span className={A}>99 percent of the leader&apos;s model accuracy</span>, neutralizing
            the scale advantage.
          </p>
          <p className={BODY}>
            A data flywheel creates a lasting moat primarily in <span className={T}>non-stationary
            environments</span>, such as real-time road traffic, payment fraud, or fast-moving retail trends,
            where yesterday&apos;s data decay rapidly and continuous daily feedback is required.
          </p>
        </div>
      </Slide>

      {/* Protecting Proprietary Knowledge When Using External Models */}
      <Slide id="protecting-knowledge" border align="left">
        <Head1>Protecting Proprietary Knowledge When Using External Models</Head1>
        <p className={`${DISPLAY} mt-8 max-w-5xl`}>
          Relying on external AI vendors introduces a <span className={A}>strategic leakage risk</span> if a
          firm&apos;s proprietary domain knowledge is absorbed into a shared public model.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            Consumer-tier AI terms of service typically allow the model provider to log user prompts, uploaded
            documents, and human corrections to train future versions of their general model.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            If a pharmaceutical firm or investment bank allows its proprietary research workflows to train a
            vendor&apos;s shared model, it effectively transfers its institutional know-how to every competitor
            licensing that vendor.
          </p>
        </div>
        <div className={PAIR}>
          <p className={BODY}>
            Enterprise AI procurement therefore requires strict <span className={T}>contractual data
            isolation</span>: zero-data-retention API agreements, virtual private cloud hosting, or self-hosted
            open-weight models.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Firms preserve their competitive edge by keeping their proprietary retrieval indexes, verified
            outcome labels, and fine-tuned model weights inside their own security boundary.
          </p>
        </div>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Build, Fine-Tune, or Buy Decisions"
        lines={[
          "Every enterprise AI initiative requires an architectural and economic choice among buying turnkey vendor software, composing workflows on commercial APIs, customizing open-weight models, or training proprietary models.",
          "Matching the procurement approach to the strategic importance and unit economics of the task prevents both overspending on commodity tools and outsourcing core differentiation.",
        ]}
      />

      {/* The Four Procurement Archetypes for Enterprise AI */}
      <Slide id="procurement-archetypes" border align="left" exercise={exercise["procurement-archetypes"]}>
        <Head1>The Four Procurement Archetypes for Enterprise AI</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Enterprise AI initiatives fall into four architectural archetypes along a spectrum of customization
          and control.
        </p>
        <div className={FIG}>
          <ArchetypeGrid />
        </div>
        <div className="mt-8 grid w-full max-w-6xl gap-6 md:grid-cols-4 md:gap-8">
          <p className={BODY}>
            First, <span className={T}>buying turnkey software-as-a-service (SaaS)</span> embeds pre-built AI
            features into existing workplace tools, such as automated meeting transcription or standard
            accounts-payable invoice scanning.
          </p>
          <p className={BODY}>
            Second, <span className={T}>composing with commercial APIs and retrieval-augmented generation
            (RAG)</span> combines rented frontier models with the firm&apos;s private document indexes and custom
            workflow logic.
          </p>
          <p className={BODY}>
            Third, <span className={T}>customizing and hosting open-weight models</span> allows an enterprise to
            fine-tune compact models on its own cloud infrastructure for strict data residency and low-latency,
            high-volume tasks.
          </p>
          <p className={BODY}>
            Fourth, <span className={T}>training a proprietary model from scratch</span> is reserved for core
            domain problems, such as quantitative credit scoring, supply chain optimization, or biological
            sequence design, where <span className={A}>the algorithm itself is the firm&apos;s primary source of
            differentiation</span>.
          </p>
        </div>
      </Slide>

      {/* Unit Economics: Fixed Training Costs Versus Variable Inference Costs */}
      <Slide id="unit-economics" border align="left">
        <Head1>Unit Economics: Fixed Training Costs Versus Variable Inference Costs</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Traditional enterprise software has high upfront development costs but near-zero marginal cost for
            each additional click or database query.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Generative AI reintroduces significant <span className={T}>variable cost of goods sold (COGS)</span>{" "}
            because every prompt and generated response consumes GPU compute and memory bandwidth.
          </p>
        </div>
        <div className={FIG}>
          <BreakEvenLab />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            At low to moderate query volumes, paying per million tokens to a commercial API provider is far
            cheaper than renting dedicated GPU servers that sit idle overnight.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            However, once an automated workflow scales to tens of millions of daily transactions, variable API
            token bills can exceed the fixed cost of hosting a fine-tuned, smaller open-weight model.
          </p>
        </div>
        <p className={CLOSE}>
          Mature engineering teams optimize unit economics through <span className={A}>model routing</span>:
          directing 80 percent of routine requests to fast, inexpensive small models and escalating only complex
          queries to large frontier models.
        </p>
      </Slide>

      {/* Managing Vendor Lock-In and Model Obsolescence */}
      <Slide id="vendor-lock-in" border align="left">
        <Head1>Managing Vendor Lock-In and Model Obsolescence</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Because the relative performance and pricing of foundation models shift every few months, committing
          an enterprise architecture permanently to a single model vendor creates technical lock-in.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            <span className={T}>Vendor lock-in</span> occurs when application logic, prompt templates, embedding
            vectors, and tool-calling formats are written so specifically for one provider that switching
            requires a complete rewrite.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            If that vendor raises API prices, deprecates a model version, or suffers a service outage, a
            locked-in enterprise cannot easily redirect traffic to an alternative provider.
          </p>
        </div>
        <div className={PAIR}>
          <p className={BODY}>
            Resilient enterprise architecture insulates business applications behind an{" "}
            <span className={A}>internal model gateway</span> that standardizes authentication, logging, and tool
            schemas across multiple model providers.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Maintaining an automated internal evaluation benchmark allows the firm to test any newly released
            commercial or open-weight model against its own business cases in hours and switch when economics
            warrant.
          </p>
        </div>
      </Slide>

      {/* Discussion: Build-Versus-Buy Strategy at a Regional Healthcare Network */}
      <Slide id="discussion-healthcare" border align="left">
        <Head1>Discussion: Build-Versus-Buy Strategy at a Regional Healthcare Network</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A regional healthcare network plans to deploy two AI
          systems this year: (1) an ambient clinical documentation assistant that transcribes physician-patient
          consultations into standard electronic health record notes, and (2) a post-operative risk scoring
          system that predicts ICU readmission using twelve years of the network&apos;s proprietary lab, vitals,
          and surgical outcome records. For each system, recommend whether the hospital should buy a turnkey
          vendor product, compose on a commercial API with RAG, or train and host a proprietary model, justifying
          your choice across strategic differentiation, data privacy, and unit economics.
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="Measuring AI Tool Quality and Business ROI"
        lines={[
          "A model that achieves impressive scores on a data science benchmark can still lose money when deployed inside a real organization.",
          "Evaluating AI investments requires connecting offline technical metrics to causal field experiments and full lifecycle cost accounting.",
        ]}
      />

      {/* Separating Model Metrics from Business Outcomes */}
      <Slide id="model-metrics" border align="left" exercise={exercise["model-metrics"]}>
        <Head1>Separating Model Metrics from Business Outcomes</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Data science teams evaluate models using <span className={T}>offline technical metrics</span>, such
            as classification area under the curve (AUC), forecast root mean squared error, or RAG citation
            faithfulness.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Executive leadership evaluates investments using <span className={T}>online business
            outcomes</span>, such as net customer retention, claims processing cost per file, or gross margin per
            order.
          </p>
        </div>
        <div className={FIG}>
          <ValueChain />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            High offline model accuracy frequently fails to translate into business return on investment because{" "}
            <span className={A}>three organizational links break</span> between prediction and value.
          </p>
          <p className={BODY}>
            First, frontline workers may distrust or ignore the model&apos;s recommendations, leaving actual human
            decisions unchanged.
          </p>
          <p className={BODY}>
            Second, even if workers use the tool, downstream capacity bottlenecks or added human verification
            time can offset the speed gains of initial draft or score generation.
          </p>
        </div>
      </Slide>

      {/* Designing Controlled Experiments and A/B Tests for AI Systems */}
      <Slide id="controlled-experiments" border align="left" exercise={exercise["controlled-experiments"]}>
        <Head1>Designing Controlled Experiments and A/B Tests for AI Systems</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            The gold standard for measuring whether an AI system creates real business value is a{" "}
            <span className={T}>randomized controlled experiment</span>, commonly called an A/B test.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            In a controlled experiment, customers, transactions, or employees are randomly assigned to either a
            treatment group (with the AI system) or a control group (using the existing baseline workflow).
          </p>
        </div>
        <div className={FIG}>
          <ExperimentLab />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Simple before-and-after comparisons without a concurrent control group are unreliable because
            seasonal demand shifts, price changes, or macroeconomic trends confound the result.
          </p>
          <p className={BODY}>
            Designing valid AI experiments requires guarding against <span className={T}>novelty effects</span>{" "}
            (where users click or engage more during the first week out of curiosity) and{" "}
            <span className={T}>interference</span> (where treatment and control groups compete for the same
            limited inventory).
          </p>
          <p className={BODY}>
            Crucially, experiments must track both primary productivity metrics and{" "}
            <span className={A}>guardrail metrics</span>, ensuring that faster task completion does not come at
            the expense of higher downstream error rework or customer complaints.
          </p>
        </div>
      </Slide>

      {/* Risk-Adjusted ROI and Hidden Cost Accounting */}
      <Slide id="risk-adjusted-roi" border align="left">
        <Head1>Risk-Adjusted ROI and Hidden Cost Accounting</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Many enterprise AI business cases overestimate return on investment by counting gross labor time
            saved while omitting ongoing operational and verification costs.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            If an AI copilot saves an employee twenty minutes of drafting twice a week, those fragmented forty
            minutes rarely translate into immediate headcount reductions unless workflows are consolidated.
          </p>
        </div>
        <div className={FIG}>
          <ROILedger />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            On the cost side, initial model development typically represents less than a third of total
            lifecycle expenditure.
          </p>
          <p className={BODY}>
            Complete ROI accounting includes recurring token and compute costs, data pipeline maintenance,
            retrieval index updates, continuous drift monitoring, and the labor cost of human-in-the-loop review.
          </p>
          <p className={BODY}>
            Financial analysts must also deduct the expected cost of residual model failures, such as customer
            refunds, SLA penalties, or compliance remediation, to calculate{" "}
            <span className={A}>risk-adjusted net return</span>.
          </p>
        </div>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="From Pilots to Production: Organizational Leadership"
        lines={[
          "Industry surveys consistently report that while a vast majority of large enterprises run AI pilots, only a small fraction successfully scale those pilots into core production workflows.",
          "Moving from isolated demonstrations to enterprise-wide value is primarily an organizational, data-governance, and leadership challenge rather than an algorithmic one.",
        ]}
      />

      {/* Why Enterprise AI Projects Stall in Pilot Purgatory */}
      <Slide id="pilot-purgatory" border align="left">
        <Head1>Why Enterprise AI Projects Stall in Pilot Purgatory</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          <span className={A}>Pilot purgatory</span> refers to the organizational trap in which a company funds
          dozens of impressive proof-of-concept AI demonstrations that never transition into live production
          systems.
        </p>
        <div className={FIG}>
          <PilotFunnel />
        </div>
        <div className="mt-8 grid w-full max-w-6xl gap-6 md:grid-cols-4 md:gap-8">
          <p className={BODY}>
            First, many pilots start as technology-first experiments (&quot;let us build a chatbot&quot;) without a
            clearly defined business decision, owner, or economic metric.
          </p>
          <p className={BODY}>
            Second, pilots are usually built on clean, static CSV extracts, and fail when engineers discover that
            live production data are fragmented across legacy databases with inconsistent schemas.
          </p>
          <p className={BODY}>
            Third, teams often treat legal, privacy, and security review as a final sign-off step before launch,
            discovering too late that the pilot violates data-residency or fair-lending rules.
          </p>
          <p className={BODY}>
            Fourth, organizations deploy the software tool without changing incentives, standard operating
            procedures, or training, so employees revert to their familiar manual habits.
          </p>
        </div>
      </Slide>

      {/* Operating Models: Centralized, Decentralized, and Hub-and-Spoke */}
      <Slide id="operating-models" border align="left" exercise={exercise["operating-models"]}>
        <Head1>Operating Models: Centralized, Decentralized, and Hub-and-Spoke</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Scaling AI across a multi-division enterprise requires choosing an organizational operating model that
          balances technical standards with domain proximity.
        </p>
        <div className={FIG}>
          <OperatingModels />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            In a <span className={T}>centralized AI lab</span> model, all machine learning engineers and data
            scientists sit in one corporate group. This avoids duplicated infrastructure but often produces
            ivory-tower models disconnected from daily business operations.
          </p>
          <p className={BODY}>
            In a <span className={T}>fully decentralized</span> model, each business unit hires its own analysts
            and purchases its own vendor tools. This maximizes local speed but creates fragmented data silos,
            duplicated vendor contracts, and inconsistent security governance.
          </p>
          <div className={STACK}>
            <p className={BODY}>
              Most mature enterprises converge on a federated <span className={A}>hub-and-spoke</span> operating
              model.
            </p>
            <p className={BODY}>
              In a hub-and-spoke structure, a central platform hub builds shared data pipelines, model gateways,
              security guardrails, and evaluation harnesses, while embedded domain teams in marketing, finance,
              and operations lead problem selection and workflow integration.
            </p>
          </div>
        </div>
      </Slide>

      {/* Executive Leadership and Portfolio Prioritization */}
      <Slide id="portfolio" border align="left">
        <Head1>Executive Leadership and Portfolio Prioritization</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Effective executive leadership manages enterprise AI as a disciplined capital-allocation portfolio
            rather than a contest to launch the highest number of demos.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Leaders evaluate proposed initiatives along two axes: strategic and financial value on one axis, and
            data, technical, and governance readiness on the other.
          </p>
        </div>
        <div className={FIG}>
          <PortfolioMatrix />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            High-readiness, moderate-value internal workflows serve as foundational learning projects that
            validate the firm&apos;s data pipelines and governance processes.
          </p>
          <p className={BODY}>
            High-value, differentiating workflows receive concentrated multi-quarter investment across data
            engineering, domain design, controlled experimentation, and employee change management.
          </p>
          <p className={BODY}>
            Equally important is <span className={A}>portfolio pruning</span>: executives must establish clear
            stage-gate criteria to shut down stalled or low-ROI pilots early and reallocate talent to proven
            production workflows.
          </p>
        </div>
      </Slide>

      {/* Discussion: Auditing a Stalled Enterprise AI Portfolio */}
      <Slide id="discussion-insurance" border align="left">
        <Head1>Discussion: Auditing a Stalled Enterprise AI Portfolio</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>The Chief Executive Officer of a mid-sized property and
          casualty insurance company spent 6 million dollars over the past eighteen months funding fourteen
          separate generative AI proof-of-concept pilots across marketing, claims, underwriting, and HR. Today,
          thirteen of the fourteen pilots remain in demo status while operating expenses have risen due to
          overlapping software subscriptions. As the incoming Chief AI Officer, how would you audit and prune
          this portfolio, restructure the teams around a hub-and-spoke operating model, and design a controlled
          experiment to prove net ROI on the two highest-priority workflows?
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <Numbered
          items={[
            "Off-the-shelf AI tools improve operational effectiveness across an entire industry simultaneously, whereas durable strategic advantage requires proprietary data loops, workflow integration, and complementary assets.",
            "In the four-layer AI stack, general-purpose foundation model APIs face rapid price and capability commoditization, shifting value capture toward scarce compute below and deeply integrated application workflows above.",
            "Raw data volume is rarely a competitive moat. A defensible data moat requires exclusive operational data paired with verified, closed-loop outcome labels in a non-stationary environment.",
            "Enterprises should buy turnkey SaaS for routine administrative tasks, compose with commercial APIs or fine-tuned open-weight models for domain workflows, and train proprietary models only where the algorithm is core to competitive differentiation.",
            "High offline model accuracy does not guarantee financial return. Proving business ROI requires randomized controlled experiments that measure causal lift net of inference, integration, verification, and error costs.",
            "Escaping pilot purgatory requires early legal and data-pipeline integration, a federated hub-and-spoke operating model, and executive discipline to retire low-value demos and scale high-impact production workflows.",
          ]}
        />
      </Slide>
    </SlideDeck>
  );
}
