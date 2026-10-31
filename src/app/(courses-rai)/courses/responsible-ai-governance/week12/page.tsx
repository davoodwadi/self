"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { ActiveLrPath, DriftMonitor, EffortCost, RaciMatrix, StageGates, ThreeLines } from "./visuals";

// ============================================================================
// WEEK 12: ORGANIZATIONAL AI GOVERNANCE, RED-TEAMING, AND SUSTAINABILITY
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week12Page() {
  return (
    <SlideDeck label="Week 12">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 12: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[24ch]">Organizational AI Governance, Red-Teaming, and Sustainability</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[58ch] !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Effective algorithmic governance embeds cross-functional accountability,
          pre-launch dossiers, adversarial red-teaming, incident response
          playbooks, and resource-rational efficiency into the permanent operating
          structure of the organization.
        </p>
      </Slide>

      {/* ================================================================
          From Principles and Audits to Institutional Architecture [no-exercise]
          ================================================================ */}
      <Slide id="from-principles-and-audits-to-institutional-architecture" border className="!py-8">
        <SlideHeading className="!mb-5">From Principles and Audits to Institutional Architecture</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              Across the preceding eleven weeks, we examined ethical frameworks,
              fairness metrics, cultural alignment, statistical and exact-PMF
              behavioral audits, explainability, privacy, dark patterns, fiduciary
              duty in agentic commerce, algorithmic pricing, accessibility, and
              global regulation.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              None of those methods protect consumers or the firm if they remain{" "}
              <Term>isolated inside a research lab or an unread policy binder</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term>Organizational AI governance</Term> is the institutional
              architecture that determines who holds veto power over a model
              release, how third-party systems are procured, how production
              failures are contained, and how computational resources are budgeted
              responsibly.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Why Governance Fails Without Authority and Incentives [no-exercise]
          ================================================================ */}
      <Slide id="why-governance-fails-without-authority-and-incentives" border className="!py-8">
        <SlideHeading className="!mb-5">Why Governance Fails Without Authority and Incentives</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              Post-mortem investigations of major commercial AI failures
              repeatedly reveal that internal engineers or researchers had
              documented the exact bias or safety flaw months before launch, but{" "}
              <Term>lacked the institutional authority to delay the release</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              When product managers are compensated solely on speed-to-market and
              short-term conversion lift while ethics review is treated as an
              optional advisory consultation,{" "}
              <Term>commercial incentives systematically override safety warnings</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Durable governance therefore requires hard structural gates,
              independent reporting lines, and explicit allocation of personal and
              executive accountability.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Organizational Governance Structures and Cross-Functional Accountability [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Organizational Governance Structures and Cross-Functional Accountability" />
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              Mature enterprises structure algorithmic oversight using
              risk-management architectures adapted from financial regulation,
              aviation safety, and clinical governance.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Two complementary mechanisms anchor this structure:{" "}
              <Term>the Three Lines of Defense model and the cross-functional RACI matrix</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Three Lines of Defense in Enterprise AI Governance [exercise]
          ================================================================ */}
      <Slide
        id="the-three-lines-of-defense-in-enterprise-ai-governance"
        border
        className="!py-8"
        exercise={exercise["the-three-lines-of-defense-in-enterprise-ai-governance"]}
      >
        <SlideHeading className="!mb-5">The Three Lines of Defense in Enterprise AI Governance</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-3 md:grid-cols-3">
          <Ruled>
            <P>
              The <Term>First Line of Defense</Term> consists of the business
              units, product owners, data scientists, and marketing engineers who
              build, prompt, and operate AI systems. They own day-to-day quality
              control, initial dataset documentation, and baseline testing.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>Second Line of Defense</Term> consists of an independent AI
              Risk, Compliance, and Ethics Review function (including legal,
              privacy, and behavioral auditing specialists) that sets governance
              standards, defines risk tiers, conducts pre-launch behavioral audits,
              and holds binding sign-off authority over high-risk deployments.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>Third Line of Defense</Term> consists of internal audit and
              external independent conformity assessors who periodically evaluate
              whether both the First and Second Lines are following the governance
              charter accurately and without conflicts of interest.
            </P>
          </Ruled>
        </div>
        <div className="mt-4 grid w-full items-center gap-8 border-t border-[var(--rule)] pt-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <p className={BIG}>
            Separating these three lines ensures that{" "}
            <Term>
              the team whose bonus depends on shipping a feature is never the sole
              judge
            </Term>{" "}
            of whether that feature is fair, safe, and compliant.
          </p>
          <Plate className="!p-2">
            <ThreeLines />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Cross-Functional Accountability: The RACI Matrix for AI Launches [exercise]
          ================================================================ */}
      <Slide
        id="cross-functional-accountability-the-raci-matrix-for-ai-launches"
        border
        className="!py-8"
        exercise={exercise["cross-functional-accountability-the-raci-matrix-for-ai-launches"]}
      >
        <SlideHeading className="!mb-5">Cross-Functional Accountability: The RACI Matrix for AI Launches</SlideHeading>
        <Ruled className="mb-4 w-full">
          <P className="!max-w-none">
            To prevent the problem of many hands introduced in Week 1, a governance
            charter assigns four explicit roles for every milestone in the AI
            lifecycle using a <Term>RACI matrix</Term>: Responsible, Accountable,
            Consulted, and Informed.
          </P>
        </Ruled>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                <Term>Responsible (R)</Term> designates the practitioners who
                execute the task, such as the ML engineering team running the
                exact-PMF fairness audit or drafting the model card.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Accountable (A)</Term> designates the single executive or
                governance officer who owns final approval and bears institutional
                liability for the decision. Crucially,{" "}
                <Term>each governance gate must have exactly one Accountable owner</Term>{" "}
                so responsibility cannot be diffused.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Consulted (C)</Term> designates domain experts, legal counsel,
                Research Ethics Board members, and participatory stakeholder
                representatives whose input must be solicited and recorded before
                the gate closes.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Informed (I)</Term> designates downstream teams, such as
                customer support, public relations, and executive leadership, who
                receive structured updates once the decision is logged.
              </P>
            </Ruled>
          </div>
          <Plate className="self-center">
            <RaciMatrix />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Stage-Gate Release Controls and Stop-the-Line Authority [no-exercise]
          ================================================================ */}
      <Slide id="stage-gate-release-controls-and-stop-the-line-authority" border className="!py-8">
        <SlideHeading className="!mb-5">Stage-Gate Release Controls and Stop-the-Line Authority</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Inspired by high-reliability manufacturing,{" "}
                <Term>stage-gate governance</Term> divides the AI lifecycle into
                mandatory checkpoints: scoping approval, data-provenance clearance,
                pre-deployment behavioral and red-team sign-off, and production
                monitoring readiness.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A system cannot advance to production traffic until its audit
                dossier satisfies the quantitative release thresholds defined for
                its risk tier.
              </P>
            </Ruled>
          </div>
          <Plate>
            <StageGates />
          </Plate>
        </div>
        <Ruled className="mt-5 w-full">
          <P className="!max-w-none">
            <Term>Stop-the-line authority</Term> empowers any engineer, auditor, or
            human-on-the-loop operator who detects a severe safety breach,
            discriminatory disparity, or data leak to halt deployment or trigger an
            automated fallback without retaliation.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 2: Pre-Launch Documentation and Impact Dossiers [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Pre-Launch Documentation and Impact Dossiers" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Before the Second Line of Defense authorizes a launch, the project
              team compiles a{" "}
              <Term>standardized governance dossier</Term> that links data lineage,
              model behavior, and operational guardrails into an auditable record.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Pre-Launch Governance Dossier: Datasheets, Model Cards, and System Cards [no-exercise]
          ================================================================ */}
      <Slide id="the-pre-launch-governance-dossier-datasheets-model-cards-and-system-cards" border className="!py-8">
        <SlideHeading className="!mb-5">The Pre-Launch Governance Dossier: Datasheets, Model Cards, and System Cards</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          {(
            [
              [
                "datasheets",
                <>
                  As introduced in Week 5, <Term>Datasheets for Datasets</Term>{" "}
                  document the provenance, consent basis, demographic coverage, and
                  preprocessing of every training, fine-tuning, and retrieval corpus
                  (Gebru et al., 2021).
                </>,
              ],
              [
                "model-cards",
                <>
                  <Term>Model Cards</Term> report the foundation or predictive
                  model&apos;s architecture, intended and out-of-scope uses,
                  disaggregated group fairness metrics, and behavioral audit
                  distributions (Mitchell et al., 2019).
                </>,
              ],
              [
                "system-cards",
                <>
                  <Term>System Cards and Algorithmic Impact Assessments (AIAs)</Term>{" "}
                  evaluate the complete socio-technical deployment in context: the
                  exact system prompt, tool-calling permissions, human-oversight
                  regime, cognitive forcing functions, and customer recourse
                  channels.
                </>,
              ],
              [
                "version-lock",
                <>
                  Every artifact in the dossier is{" "}
                  <Term>version-locked to the exact model checkpoint, prompt hash, and evaluation script</Term>{" "}
                  so that any production decision can be reconstructed forensically.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="min-w-0">
              <Ruled>
                <p className={BIG}>{text}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Auditing Third-Party Vendors and Foundation Model Supply Chains [exercise]
          ================================================================ */}
      <Slide
        id="auditing-third-party-vendors-and-foundation-model-supply-chains"
        border
        className="!py-8"
        exercise={exercise["auditing-third-party-vendors-and-foundation-model-supply-chains"]}
      >
        <SlideHeading className="!mb-5">Auditing Third-Party Vendors and Foundation Model Supply Chains</SlideHeading>
        <div className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <div className="grid content-start gap-6">
            <Ruled>
              <p className={BIG}>
                Most commercial organizations do not pre-train foundation models
                from scratch. They procure models, APIs, or turnkey software from
                external vendors.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                As established in Week 1,{" "}
                <Term>outsourcing model development never outsources legal or ethical accountability</Term>{" "}
                to the firm&apos;s customers.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                A vendor that refuses to disclose disaggregated performance or blocks
                independent black-box behavioral auditing{" "}
                <Term>fails procurement qualification</Term> for high-risk or
                customer-facing deployments.
              </p>
            </Ruled>
          </div>
          <Ruled>
            <p className={BIG}>
              Procurement governance requires vendors to disclose training data
              provenance and indemnification against copyright or
              algorithmic-disgorgement claims (Week 11), expose model version
              pinning and log-probability access for behavioral auditing (Week 4),
              guarantee zero retention of enterprise customer data for vendor
              training (Week 6), and submit to independent disparate-impact and
              evaluative-invariance audits on the buyer&apos;s actual domain tasks.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: The Vendor Who Refuses an Audit
          ================================================================ */}
      <Slide id="discussion-the-vendor-who-refuses-an-audit" border className="!py-8">
        <SlideHeading>Discussion: The Vendor Who Refuses an Audit</SlideHeading>
        <Discussion
          scenario={"A hospital network is procuring an AI patient-triage and appointment-scheduling assistant from a commercial software vendor. The vendor claims its proprietary model is \"99 percent bias-free,\" but refuses to allow the hospital's governance team to run a factorial behavioral audit across patient age, language, and disability profiles, citing trade-secret protection."}
          question={"How should the hospital's Second Line of Defense respond, and what contractual and technical verification terms should be mandatory in enterprise AI procurement?"}
        />
      </Slide>

      {/* ================================================================
          Part 3: Adversarial Red-Teaming, Stress-Testing, and Incident Response [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Adversarial Red-Teaming, Stress-Testing, and Incident Response" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              While systematic behavioral audits (Week 4) measure expected behavior
              and distributional bias across standard operating conditions,
              organizations must also prepare for{" "}
              <Term>adversarial attacks, extreme edge cases, and post-launch failures</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Red-Teaming Generative and Agentic Systems [no-exercise]
          ================================================================ */}
      <Slide id="red-teaming-generative-and-agentic-systems" border className="!py-8">
        <SlideHeading className="!mb-5">Red-Teaming Generative and Agentic Systems</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          {(
            [
              [
                "team",
                <>
                  <Term>Adversarial red-teaming</Term> assembles an independent
                  multidisciplinary team of security researchers, domain experts, and
                  behavioral scientists to actively attack the AI system prior to
                  launch.
                </>,
              ],
              [
                "generative",
                <>
                  For conversational and generative models, red-teaming probes direct
                  jailbreaks (bypassing safety filters to generate harmful,
                  defamatory, or illegal advice), persona hijacking, and verbatim
                  training-data extraction.
                </>,
              ],
              [
                "agentic",
                <>
                  For autonomous tool-calling and shopping agents, red-teaming tests{" "}
                  <Term>indirect prompt injections</Term> embedded in third-party
                  webpages or product reviews (Week 7), unauthorized API tool
                  escalation (such as executing an unapproved refund or purchase),
                  and multi-agent manipulation loops.
                </>,
              ],
              [
                "regression",
                <>
                  Every vulnerability discovered during red-teaming is logged with a
                  severity score,{" "}
                  <Term>converted into an automated regression test</Term>, and
                  mitigated via input sandboxing, privilege separation, or guardrail
                  classifiers before launch.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="min-w-0">
              <Ruled>
                <p className={BIG}>{text}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Six Steps of an AI Incident Response Playbook [exercise]
          ================================================================ */}
      <Slide
        id="six-steps-of-an-ai-incident-response-playbook"
        border
        className="!py-8"
        exercise={exercise["six-steps-of-an-ai-incident-response-playbook"]}
      >
        <SlideHeading className="!mb-5">Six Steps of an AI Incident Response Playbook</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 1 is detection and triage, combining automated anomaly alerts, human-on-the-loop dashboards, and accessible customer complaint channels to identify and classify the severity of an algorithmic failure.",
            "Step 2 is immediate containment and rollback, executing a pre-engineered kill switch that routes traffic back to a deterministic rule-based baseline, a previous validated model snapshot, or human review within minutes.",
            "Step 3 is forensic preservation and root-cause analysis, freezing the exact model weights, system prompt, retrieval logs, and input traces that produced the harmful output.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <p className={BIG}>{step}</p>
              </Ruled>
            </li>
          ))}
        </ol>
        <ol className="mt-4 grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 4 is stakeholder and statutory notification, informing executive leadership, affected customers, and regulators (such as the European AI Office or privacy commissioners under mandatory breach-notification timelines).",
            "Step 5 is remediation and verification, fixing the underlying data, prompt, or guardrail defect and re-running both the adversarial red-team suite and the full factorial behavioral audit.",
            "Step 6 is post-incident review and restitution, compensating harmed consumers, reversing erroneous automated decisions, and updating the governance charter so the failure class cannot recur.",
          ].map((step) => (
            <li key={step} className="min-w-0">
              <Ruled>
                <p className={BIG}>{step}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Post-Deployment Monitoring, Drift Detection, and Sunset Protocols [no-exercise]
          ================================================================ */}
      <Slide id="post-deployment-monitoring-drift-detection-and-sunset-protocols" border className="!py-8">
        <SlideHeading className="!mb-5">Post-Deployment Monitoring, Drift Detection, and Sunset Protocols</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                Markets, consumer language, competitor pricing, and platform
                catalogs evolve continuously after an AI system is launched.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Covariate and concept drift</Term> occur when live production
                inputs diverge from the distribution on which the model was trained
                and audited, degrading both accuracy and group fairness over time.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Post-deployment governance runs <Term>scheduled canary audits</Term>{" "}
                (re-evaluating a fixed benchmark of synthetic and historical cases
                weekly) and tracks live disparate-impact ratios, recourse rates, and
                customer override frequencies.
              </P>
            </Ruled>
          </div>
          <Plate>
            <DriftMonitor />
          </Plate>
        </div>
        <Ruled className="mt-5 w-full">
          <P className="!max-w-none">
            Every deployed model also carries a{" "}
            <Term>mandatory sunset or recertification date</Term>: if a system is
            not re-audited and re-authorized within its review window, it is
            automatically decommissioned rather than left running as an unmonitored
            zombie model.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 4: Resource Rationality, Computational Efficiency, and Sustainable AI [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Resource Rationality, Computational Efficiency, and Sustainable AI" />
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              Responsible AI governance encompasses not only fairness, privacy, and
              safety toward humans, but also{" "}
              <Term>stewardship of the computational, financial, and environmental resources</Term>{" "}
              consumed by artificial intelligence.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Connecting computer science optimization with behavioral theory shows
              that computational efficiency and decision quality are deeply linked.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Environmental Footprint of AI: Training, Inference, Water, and Embodied Carbon [no-exercise]
          ================================================================ */}
      <Slide id="the-environmental-footprint-of-ai-training-inference-water-and-embodied-carbon" border className="!py-8">
        <SlideHeading className="!mb-5">The Environmental Footprint of AI: Training, Inference, Water, and Embodied Carbon</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              Schwartz and colleagues (2020) distinguish <Term>&quot;Red AI,&quot;</Term>{" "}
              which purchases marginal benchmark gains through exponential
              increases in compute and energy consumption, from{" "}
              <Term>&quot;Green AI,&quot;</Term> which treats computational and
              carbon efficiency as a primary evaluation metric alongside accuracy.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              The environmental footprint of AI spans four distinct dimensions:
              pre-training electricity and carbon emissions, cumulative inference
              energy across billions of daily production queries (which accounts
              for the majority of lifecycle emissions for deployed models),
              freshwater consumption for data-center cooling, and the embodied
              carbon and electronic waste of rapidly obsolete accelerator hardware.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Under the EU AI Act (including Article 40 standards on resource
              performance), providers of general-purpose and high-risk AI systems
              face growing obligations to{" "}
              <Term>measure, document, and reduce energy and water consumption</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Optimization Efficiency in Training: Sign-Conscious Adaptive Learning Rates (ActiveLR) [no-exercise]
          ================================================================ */}
      <Slide id="optimization-efficiency-in-training-sign-conscious-adaptive-learning-rates-activelr" border className="!py-8">
        <SlideHeading className="!mb-5">Optimization Efficiency in Training: Sign-Conscious Adaptive Learning Rates (ActiveLR)</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                A major source of wasted compute and carbon emissions during deep
                neural network development is <Term>hyperparameter search</Term>:
                training the same architecture dozens or hundreds of times to tune
                the initial learning rate and mini-batch size.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Wadi, Fredette, and Senecal (2023) introduced{" "}
                <Term>ActiveLR</Term>, a sign-conscious optimization meta-algorithm
                applied to standard optimizers including SGD with momentum, AdamW,
                RAdam, and AdaBelief.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ActiveLrPath />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-8 border-t border-[var(--rule)] pt-5 md:grid-cols-2 md:gap-12">
          <P>
            By tracking whether the gradient of each individual parameter changes
            sign between consecutive epochs, ActiveLR dynamically adapts local
            learning rates in real time,{" "}
            <Term>
              increasing step sizes when gradients remain consistent and shrinking
              them when oscillations indicate overshoot
            </Term>
            .
          </P>
          <P>
            Across vision and language benchmarks, ActiveLR improves generalization
            and training speed while rendering training robust to initial
            learning-rate choices and large mini-batch sizes, eliminating the heavy
            computational and carbon cost of grid-search tuning (Wadi, Fredette,
            &amp; Senecal, 2023).
          </P>
        </div>
      </Slide>

      {/* ================================================================
          Resource Rationality in Agentic Inference and Tool Use [exercise]
          ================================================================ */}
      <Slide
        id="resource-rationality-in-agentic-inference-and-tool-use"
        border
        className="!py-8"
        exercise={exercise["resource-rationality-in-agentic-inference-and-tool-use"]}
      >
        <SlideHeading className="!mb-5">Resource Rationality in Agentic Inference and Tool Use</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-3 md:grid-cols-3">
          <Ruled>
            <P>
              At inference time, deploying the largest available frontier model
              with unconstrained reasoning and exhaustive tool calls for every
              routine query wastes energy, increases latency, and inflates
              operational cost.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Grounded in resource-rational planning (Callaway et al., 2022, Lieder
              &amp; Griffiths, 2020), the <Term>Tool-Lab framework</Term> formulates
              an AI agent&apos;s sequential information search and tool calling as a
              cost-constrained Markov Decision Process (Wadi, 2026, Wadi &amp; Ma,
              2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Rather than evaluating an agent solely on whether its final answer is
              correct, Tool-Lab evaluates the optimality of the agent&apos;s planning
              policy: whether the sequence of tools it calls maximizes expected
              decision utility net of token, API, and latency costs.
            </P>
          </Ruled>
        </div>
        <div className="mt-4 grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                Conversely, as shown in Week 7, imposing blind resource cuts on an
                uncalibrated agent causes premature search truncation and heuristic
                errors (Wadi &amp; Ma, 2026b), whereas{" "}
                <Term>
                  configuring targeted reasoning effort on a lightweight model
                  eliminates position bias at roughly 4 percent of frontier model
                  cost
                </Term>{" "}
                (Wadi &amp; Ma, 2026a).
              </P>
            </Ruled>
            <Ruled>
              <P>
                Sustainable, resource-rational governance therefore matches model
                size and deliberation effort to the complexity and stakes of the
                decision, and trains agents via reinforcement learning to execute
                optimal, parsimonious tool-calling policies.
              </P>
            </Ruled>
          </div>
          <Plate className="self-start !p-2">
            <EffortCost />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Designing an Organizational Governance Charter for Human and Agent-Mediated Markets [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Designing an Organizational Governance Charter for Human and Agent-Mediated Markets" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              In the final synthesis of this course, we integrate ethical
              principles, statistical auditing, interface design, regulatory
              compliance, and resource rationality into{" "}
              <Term>a unified enterprise governance charter</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Core Pillars of an Enterprise AI Governance Charter [exercise]
          ================================================================ */}
      <Slide
        id="core-pillars-of-an-enterprise-ai-governance-charter"
        border
        className="!py-8"
        exercise={exercise["core-pillars-of-an-enterprise-ai-governance-charter"]}
      >
        <SlideHeading className="!mb-5">Core Pillars of an Enterprise AI Governance Charter</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
          {(
            [
              [
                "scope",
                <>
                  Pillar 1 is <Term>Scope, Risk Tiering, and RACI Authority</Term>:
                  classifying every predictive, generative, and agentic system by
                  risk tier and assigning a single Accountable executive and
                  independent Second-Line sign-off gate.
                </>,
              ],
              [
                "provenance",
                <>
                  Pillar 2 is <Term>Provenance, Privacy, and Research Ethics</Term>:
                  enforcing contextual integrity, purpose limitation, differential
                  privacy or zero-retention guardrails, OCAP data sovereignty, and
                  REB standards for human and synthetic studies.
                </>,
              ],
              [
                "auditing",
                <>
                  Pillar 3 is <Term>Rigorous Behavioral and Fairness Auditing</Term>:
                  requiring pre-launch disaggregated fairness analysis, Monte-Carlo
                  sampling or exact token-level PMF evaluation (Constraint,
                  Consensus, and Construct ANOVA), and counterfactual sycophancy
                  testing.
                </>,
              ],
              [
                "transparency",
                <>
                  Pillar 4 is{" "}
                  <Term>Human-Centered Transparency, Recourse, and Accessibility</Term>:
                  pairing intrinsically interpretable models or faithful
                  explanations with actionable counterfactual recourse, WCAG POUR
                  accessibility, and cognitive forcing functions for human
                  reviewers.
                </>,
              ],
              [
                "fiduciary",
                <>
                  Pillar 5 is{" "}
                  <Term>Agentic Fiduciary Integrity and Resource Rationality</Term>:
                  mandating consumer-beneficiary prompt clauses, evaluative
                  invariance across sponsored listings, upfront machine-readable
                  unit pricing, and Tool-Lab resource efficiency alongside continuous
                  drift monitoring and kill-switch playbooks.
                </>,
              ],
            ] as const
          ).map(([kind, text]) => (
            <li key={kind} className="min-w-0">
              <Ruled>
                <P>{text}</P>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Discussion: Writing the Chief AI Officer's Charter
          ================================================================ */}
      <Slide id="discussion-writing-the-chief-ai-officers-charter" border className="!py-8">
        <SlideHeading>Discussion: Writing the Chief AI Officer&apos;s Charter</SlideHeading>
        <Discussion
          scenario={"You have just been appointed Chief AI Governance Officer at a multinational retail and financial-services marketplace that operates a consumer credit arm, an advertising-funded e-commerce search engine, and a new autonomous AI shopping assistant. The board of directors gives you ninety days to establish a binding governance charter."}
          question={"Which three systems do you audit first, what quantitative release gates do you institute for the shopping assistant, and how do you structure the Three Lines of Defense so product teams cannot bypass your review?"}
        />
      </Slide>

      {/* ================================================================
          The Course in Review [no-exercise]
          ================================================================ */}
      <Slide id="the-course-in-review" border className="!py-8">
        <SlideHeading className="!mb-5">The Course in Review</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2">
          {[
            "Weeks 1 through 3 established the normative and social foundations of algorithmic governance: ethical frameworks (consequentialism, deontology, virtue ethics), value-chain accountability, group and individual fairness under the impossibility theorem, and cultural and country-of-origin biases in foundation models.",
            "Weeks 4 through 6 built the methodological and data toolkit: Monte-Carlo behavioral sampling (Wadi & Fredette, 2025), exact token-level Likert distributions and Hoeffding ANOVA (Wadi, Ghodrat, & Philp, 2026), interpretability and coded reasoning traces, contextual integrity, technical privacy safeguards, and Research Ethics Board governance.",
            "Weeks 7 through 9 examined market manipulation and competition in human and agent-mediated exchange: dark patterns, sycophancy, resource-rational heuristics in Tool-Lab (Wadi & Ma, 2026b), fiduciary conflicts of duty and sponsorship bias (Wadi & Ma, 2026c), non-monotonic position effects (Wadi & Ma, 2026a), personalized pricing, and tacit algorithmic collusion.",
            "Weeks 10 through 12 translated these findings into inclusive, compliant, and sustainable institutional practice: universal design and AILSS cognitive scaffolding, global compliance across the EU AI Act, Canadian privacy and AI law, and FTC enforcement, and organizational governance charters built on red-teaming and resource rationality.",
          ].map((block) => (
            <li key={block} className="min-w-0">
              <Ruled>
                <p className={BIG}>{block}</p>
              </Ruled>
            </li>
          ))}
        </ol>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Institutional AI governance relies on the Three Lines of Defense, a single Accountable owner per stage gate (RACI), and explicit stop-the-line authority so commercial pressure cannot override safety and fairness gates.",
            "Pre-launch governance dossiers combine version-locked Datasheets for Datasets, Model Cards, and System Impact Assessments, and hold third-party AI vendors to the same behavioral audit and data-provenance standards as internal models.",
            "Adversarial red-teaming probes worst-case jailbreaks, indirect prompt injections, and tool escalations prior to launch, while a six-step incident response playbook ensures rapid kill-switch containment, forensic root-cause analysis, and consumer restitution.",
            "Sustainable \"Green AI\" addresses training emissions, cumulative inference energy, water cooling, and hardware e-waste across the model lifecycle.",
            "Optimization innovations such as ActiveLR eliminate wasteful hyperparameter grid searches during training (Wadi, Fredette, & Senecal, 2023), while Tool-Lab evaluates and trains agentic tool use as a resource-rational Markov Decision Process (Wadi, 2026, Wadi & Ma, 2026b) and calibrated reasoning effort achieves position-neutral choice at a fraction of frontier model cost (Wadi & Ma, 2026a).",
            "A comprehensive governance charter unites ethical principles, statistical behavioral auditing, human-centered design, and fiduciary integrity across both human and agent-mediated markets.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled>
                  <P>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
