"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Statement, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { ComputeThreshold, Disgorgement, HorizontalSectoral, Law25Letter, PenaltyCeiling, RiskTiers, RmfWheel } from "./visuals";

// ============================================================================
// WEEK 11: GLOBAL AI REGULATION, STANDARDS, AND COMPLIANCE
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and what patent drawing
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week11Page() {
  return (
    <SlideDeck label="Week 11">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 11: Responsible AI &amp; Algorithmic Governance</Subtitle>
        <Title className="mt-6 !max-w-[24ch]">Global AI Regulation, Standards, and Compliance</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[58ch] !text-[clamp(1.2rem,1.9vw,1.6rem)]">
          Global algorithmic governance combines binding risk-based statutes, data
          protection mandates, consumer protection enforcement, and auditable
          management standards that translate legal obligations into engineering
          controls.
        </p>
      </Slide>

      {/* ================================================================
          From Self-Regulation to Hard Law [no-exercise]
          ================================================================ */}
      <Slide id="from-self-regulation-to-hard-law" border className="!py-8">
        <SlideHeading className="!mb-5">From Self-Regulation to Hard Law</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          {(
            [
              [
                "wave",
                <>
                  Between 2016 and 2021, the first wave of responsible AI
                  governance relied almost entirely on voluntary corporate ethics
                  boards, non-binding charters, and self-regulatory pledges.
                </>,
              ],
              [
                "failures",
                <>
                  Repeated market failures in algorithmic credit scoring, targeted
                  advertising discrimination, biometric surveillance, and deceptive
                  generative content demonstrated that{" "}
                  <Term>voluntary principles without statutory enforcement often succumb to commercial pressure</Term>.
                </>,
              ],
              [
                "binding",
                <>
                  Governments across Europe, North America, and Asia have since
                  enacted <Term>binding legal regimes</Term> backed by substantial
                  financial penalties, mandatory conformity audits, and powers to
                  ban or delete non-compliant models.
                </>,
              ],
              [
                "borders",
                <>
                  Because digital services and foundation models cross national
                  borders instantly, enterprises must design compliance
                  architectures that{" "}
                  <Term>satisfy the strictest overlapping requirements across jurisdictions</Term>.
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
          Horizontal Versus Sectoral AI Regulation [exercise]
          ================================================================ */}
      <Slide
        id="horizontal-versus-sectoral-ai-regulation"
        border
        className="!py-8"
        exercise={exercise["horizontal-versus-sectoral-ai-regulation"]}
      >
        <SlideHeading className="!mb-5">Horizontal Versus Sectoral AI Regulation</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              <Term>Horizontal regulation</Term> establishes a single,
              cross-cutting statutory framework that governs artificial
              intelligence systems across all industries based on their risk
              level, as exemplified by the European Union AI Act.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Sectoral regulation</Term> governs algorithmic systems through
              existing domain-specific statutes and regulators in finance,
              employment, healthcare, housing, and consumer protection, as
              exemplified by the federal enforcement model in the United States.
            </P>
          </Ruled>
        </div>
        <Plate className="mx-auto mt-5 w-full max-w-[860px]">
          <HorizontalSectoral />
        </Plate>
        <Ruled className="mt-5 w-full">
          <P className="!max-w-none">
            <Term>Hybrid jurisdictions</Term> combine horizontal data protection
            and automated decision-making laws with sectoral guidelines and
            technical management standards, as seen in Canada and several
            Asia-Pacific economies.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 1: The European Union AI Act and Risk-Based Regulation [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="The European Union AI Act and Risk-Based Regulation" />
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              Enacted as the world&apos;s first comprehensive horizontal statute
              for artificial intelligence, the European Union AI Act regulates AI
              systems according to{" "}
              <Term>the severity of risk they pose to health, safety, and fundamental rights</Term>.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Rather than regulating every algorithm identically, the Act assigns
              proportional obligations across four distinct risk tiers and adds
              dedicated rules for general-purpose AI models.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Four Risk Tiers of the EU AI Act [exercise]
          ================================================================ */}
      <Slide
        id="the-four-risk-tiers-of-the-eu-ai-act"
        border
        className="!py-8"
        exercise={exercise["the-four-risk-tiers-of-the-eu-ai-act"]}
      >
        <SlideHeading className="!mb-5">The Four Risk Tiers of the EU AI Act</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                <Term>Unacceptable-risk systems</Term> are strictly prohibited
                from being placed on the market or put into service in the European
                Union because they contravene fundamental rights and values.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>High-risk systems</Term> are permitted on the market only if
                they pass a rigorous ex-ante conformity assessment and comply with
                strict technical, documentation, and oversight mandates.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Limited-risk (transparency-risk) systems</Term> are subject
                to specific disclosure obligations ensuring that humans know when
                they are interacting with an AI system or viewing synthetic media.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Minimal-risk systems</Term>, such as spam filters, inventory
                forecasting tools, or basic video game AI, face no mandatory
                statutory obligations beyond general consumer and data protection
                law.
              </P>
            </Ruled>
          </div>
          <Plate className="self-center">
            <RiskTiers />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Prohibited AI Practices and High-Risk Obligations [no-exercise]
          ================================================================ */}
      <Slide id="prohibited-ai-practices-and-high-risk-obligations" border className="!py-8">
        <SlideHeading className="!mb-5">Prohibited AI Practices and High-Risk Obligations</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              <Term>Prohibited practices</Term> under the EU AI Act include AI
              systems that deploy subliminal or purposefully manipulative
              techniques that impair autonomous decision-making and cause
              significant harm, systems that exploit the vulnerabilities of
              specific groups (defined by age, disability, or severe socioeconomic
              distress), social scoring systems, and untargeted scraping of facial
              images for recognition databases.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              <Term>High-risk commercial applications under Annex III</Term>{" "}
              include AI systems used for recruitment and employee management,
              creditworthiness evaluation and credit scoring, and risk assessment
              and pricing in life and health insurance.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Providers and deployers of high-risk systems must maintain a
              continuous risk management system, govern training and testing
              datasets for representative quality and bias, compile detailed
              technical documentation, enable automatic event logging for
              traceability, provide clear instructions for use, build
              human-oversight interfaces, and verify accuracy, robustness, and
              cybersecurity.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Obligations for General-Purpose AI (GPAI) Models and Systemic Risk [no-exercise]
          ================================================================ */}
      <Slide id="obligations-for-general-purpose-ai-gpai-models-and-systemic-risk" border className="!py-8">
        <SlideHeading className="!mb-5">Obligations for General-Purpose AI (GPAI) Models and Systemic Risk</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Because foundation models can be adapted to hundreds of downstream
                tasks, the EU AI Act establishes a dedicated governance layer for
                providers of <Term>General-Purpose AI (GPAI) models</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                All GPAI providers must maintain technical documentation for
                downstream deployers and regulators, establish policies to respect
                copyright and text-and-data-mining opt-outs, and publish a
                sufficiently detailed summary of the content used for pre-training.
              </P>
            </Ruled>
          </div>
          <Plate>
            <ComputeThreshold />
          </Plate>
        </div>
        <Ruled className="mt-5 w-full">
          <P className="!max-w-none">
            GPAI models classified as posing systemic risk, including models
            trained with{" "}
            <Term>cumulative compute exceeding 10 to the power of 25 floating-point operations (FLOPs)</Term>,
            must additionally conduct standardized model evaluations and
            adversarial red-teaming, assess and mitigate systemic risks, report
            serious incidents to the European AI Office, and ensure strong
            cybersecurity for model weights.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          The Brussels Effect and Extraterritorial Reach [no-exercise]
          ================================================================ */}
      <Slide id="the-brussels-effect-and-extraterritorial-reach" border className="!py-8">
        <SlideHeading className="!mb-5">The Brussels Effect and Extraterritorial Reach</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled>
              <P>
                Like the General Data Protection Regulation (GDPR), the EU AI Act{" "}
                <Term>applies extraterritorially</Term>: it binds any provider or
                deployer worldwide whose AI system is placed on the EU market or
                whose output is used within the European Union, regardless of where
                the firm is headquartered.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Penalties for non-compliance reach up to 35 million euros or 7
                percent of global annual turnover for prohibited AI practices, and
                up to 15 million euros or 3 percent of global turnover for
                violations of high-risk obligations.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PenaltyCeiling />
          </Plate>
        </div>
        <Ruled className="mt-5 w-full">
          <P className="!max-w-none">
            Through the <Term>Brussels Effect</Term> (Bradford, 2020),
            multinational firms frequently adopt EU-compliant documentation, risk
            tiers, and audit trails as their global baseline rather than
            maintaining separate, lower-standard engineering pipelines for other
            regions.
          </P>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 2: Canadian Privacy and AI Governance Frameworks [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Canadian Privacy and AI Governance Frameworks" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              In Canada, commercial algorithmic governance is anchored by federal
              and provincial privacy statutes,{" "}
              <Term>enforceable automated decision-making rights</Term>,
              public-sector algorithmic impact assessments, and national generative
              AI commitments.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          PIPEDA and Automated Commercial Data Processing [no-exercise]
          ================================================================ */}
      <Slide id="pipeda-and-automated-commercial-data-processing" border className="!py-8">
        <SlideHeading className="!mb-5">PIPEDA and Automated Commercial Data Processing</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              The <Term>Personal Information Protection and Electronic Documents Act (PIPEDA)</Term>{" "}
              governs how private-sector organizations across Canada collect, use,
              and disclose personal information in the course of commercial
              activity.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Under PIPEDA&apos;s ten fair information principles and the Office of
              the Privacy Commissioner&apos;s guidelines on meaningful consent,
              organizations must explain in plain, accessible language how personal
              data will be used, including any secondary use for training or
              personalizing AI models, and any material risk of significant harm.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Furthermore, PIPEDA&apos;s <Term>appropriate-purpose restriction</Term>{" "}
              (Section 5(3)) limits data processing to purposes that a reasonable
              person would consider appropriate in the circumstances, even if a
              consumer clicked an agreement banner.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Quebec Law 25 and Automated Decision-Making Rights [exercise]
          ================================================================ */}
      <Slide
        id="quebec-law-25-and-automated-decision-making-rights"
        border
        className="!py-8"
        exercise={exercise["quebec-law-25-and-automated-decision-making-rights"]}
      >
        <SlideHeading className="!mb-5">Quebec Law 25 and Automated Decision-Making Rights</SlideHeading>
        <Ruled className="mb-4 w-full">
          <P className="!max-w-none">
            Quebec&apos;s <Term>Law 25</Term> (modernizing the province&apos;s
            private-sector privacy statute) establishes some of the strictest
            enforceable rights regarding automated decision-making in North
            America, applying to any enterprise processing personal information of
            Quebec residents.
          </P>
        </Ruled>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <div className="grid content-start gap-3">
            <Ruled>
              <P>
                <Term>Mandatory automated-decision notice</Term> requires an
                enterprise that uses personal information to render a decision
                based exclusively on automated processing to inform the individual
                of that fact no later than the time the decision is communicated.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Right to explanation and provenance</Term> grants the
                individual the right, upon request, to be informed of the personal
                information used to render the decision, the reasons and the
                principal factors and parameters that led to the decision, and the
                right to have inaccurate personal information rectified.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Right to human review and contestation</Term> requires the
                enterprise to give the affected individual the opportunity to submit
                observations to a staff member who is in a position to review and,
                if warranted, overturn the automated decision.
              </P>
            </Ruled>
          </div>
          <Plate className="self-center">
            <Law25Letter />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Federal AI Governance in Canada: AIDA Lessons, Voluntary Codes, and Treasury Board Directives [no-exercise]
          ================================================================ */}
      <Slide id="federal-ai-governance-in-canada-aida-lessons-voluntary-codes-and-treasury-board-directives" border className="!py-8">
        <SlideHeading className="!mb-5">Federal AI Governance in Canada: AIDA Lessons, Voluntary Codes, and Treasury Board Directives</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              Canada&apos;s federal government pioneered public-sector algorithmic
              governance through the{" "}
              <Term>Treasury Board Directive on Automated Decision-Making</Term>,
              which requires federal agencies to complete a public Algorithmic
              Impact Assessment (AIA) that scores systems into four impact levels
              and mandates proportional peer review, explanation, and
              human-in-the-loop oversight.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              In the private sector, policy debates around the proposed Artificial
              Intelligence and Data Act (AIDA) established the concept of{" "}
              <Term>&quot;high-impact systems,&quot;</Term> focusing regulatory
              scrutiny on commercial algorithms that determine access to
              employment, credit, healthcare, insurance, and essential services, or
              that risk biased output and physical or psychological harm.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Alongside legislative reform, Canada&apos;s{" "}
              <Term>Voluntary Code of Conduct</Term> on the Responsible Development
              and Management of Advanced Generative AI Systems commits signatories
              to six operational pillars: accountability, safety, fairness and
              equity, transparency (including watermarking AI-generated content),
              human oversight, and robustness testing.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Deploying a Hiring and Credit Model Across Montreal, Toronto, and Paris
          ================================================================ */}
      <Slide id="discussion-deploying-a-hiring-and-credit-model-across-montreal-toronto-and-paris" border className="!py-8">
        <SlideHeading>Discussion: Deploying a Hiring and Credit Model Across Montreal, Toronto, and Paris</SlideHeading>
        <Discussion
          scenario={"A Canadian financial-technology company based in Toronto builds an automated small-business loan approval and recruitment platform and plans to launch it simultaneously in Montreal (Quebec), Toronto (Ontario), and Paris (France)."}
          question={"Map the overlapping statutory obligations the company faces under Quebec Law 25, PIPEDA, and the EU AI Act, and explain whether a single unified governance workflow can satisfy all three jurisdictions."}
        />
      </Slide>

      {/* ================================================================
          Part 3: United States Sectoral Enforcement and the FTC [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="United States Sectoral Enforcement and the FTC" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Rather than enacting a single federal AI statute, the United States
              regulates commercial algorithms through{" "}
              <Term>vigorous enforcement of federal consumer protection, civil rights, and credit laws</Term>,
              supplemented by targeted state and municipal statutes.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The US Approach: Sectoral Laws and Agency Enforcement [no-exercise]
          ================================================================ */}
      <Slide id="the-us-approach-sectoral-laws-and-agency-enforcement" border className="!py-8">
        <SlideHeading className="!mb-5">The US Approach: Sectoral Laws and Agency Enforcement</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              In consumer finance and housing, the Equal Credit Opportunity Act
              (ECOA) and the Fair Credit Reporting Act (FCRA) require lenders to
              provide specific, accurate <Term>adverse-action notices</Term>{" "}
              stating the principal reasons a credit application was denied,
              prohibiting lenders from hiding behind black-box opacity.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              In employment, the Equal Employment Opportunity Commission (EEOC)
              enforces Title VII of the Civil Rights Act against automated resume
              screeners and video-interview algorithms that produce{" "}
              <Term>disparate impact</Term> against protected groups.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              At the state and municipal levels, targeted statutes such as New
              York City Local Law 144 (mandating annual independent bias audits of
              automated employment decision tools) and the Colorado AI Act
              (imposing a statutory duty of reasonable care on developers and
              deployers of high-risk AI systems to prevent algorithmic
              discrimination) create <Term>binding compliance gates</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          FTC Enforcement Under Section 5: Unfair and Deceptive AI Practices [exercise]
          ================================================================ */}
      <Slide
        id="ftc-enforcement-under-section-5-unfair-and-deceptive-ai-practices"
        border
        className="!py-8"
        exercise={exercise["ftc-enforcement-under-section-5-unfair-and-deceptive-ai-practices"]}
      >
        <SlideHeading className="!mb-5">FTC Enforcement Under Section 5: Unfair and Deceptive AI Practices</SlideHeading>
        <Ruled className="mb-4 w-full">
          <P className="!max-w-none">
            Under Section 5 of the Federal Trade Commission Act, the FTC holds broad
            authority to prosecute &quot;unfair or deceptive acts or practices in
            or affecting commerce,&quot; applying this authority directly to
            artificial intelligence and automated marketing.
          </P>
        </Ruled>
        <div className="grid w-full gap-x-6 gap-y-3 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Unsubstantiated AI capability claims</Term> (AI hype and snake
              oil) violate Section 5 when a vendor markets an algorithm as
              predicting human behavior, detecting fraud, or eliminating bias
              without rigorous, independent scientific evidence supporting that
              claim.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Deceptive synthetic media and dark patterns</Term> violate
              Section 5 when firms deploy undisclosed AI-generated customer
              reviews, deepfake endorsements, anthropomorphic bots that impersonate
              humans, or manipulative subscription sludges.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Unfair discriminatory or privacy-invading models</Term> violate
              Section 5 when an algorithm causes substantial injury to consumers
              that is not reasonably avoidable by consumers themselves and is not
              outweighed by countervailing benefits to competition.
            </P>
          </Ruled>
        </div>
        <div className="mt-4 grid w-full items-center gap-8 border-t border-[var(--rule)] pt-4 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <P>
            <Term>Algorithmic disgorgement (model deletion)</Term> is a powerful
            equitable remedy enforced by the FTC: when a company trains a machine
            learning model on illegally collected or non-consensual consumer data,
            the FTC can order the company not only to delete the raw dataset, but
            also to destroy the trained models, weights, and algorithms derived
            from those tainted data.
          </P>
          <Plate className="!p-2">
            <Disgorgement />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Voluntary Governance Frameworks and Management Standards [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Voluntary Governance Frameworks and Management Standards" />
        <div className="mt-8 grid w-full gap-x-10 gap-y-6 md:grid-cols-2">
          <Ruled>
            <p className={BIG}>
              Statutes state what outcomes are forbidden or required, but
              engineering and compliance teams need{" "}
              <Term>structured operational frameworks</Term> to implement those
              requirements day to day.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Two international frameworks serve as the global lingua franca of
              enterprise AI governance: the NIST AI Risk Management Framework and
              ISO/IEC 42001.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The NIST AI Risk Management Framework (AI RMF) [exercise]
          ================================================================ */}
      <Slide
        id="the-nist-ai-risk-management-framework-ai-rmf"
        border
        className="!py-8"
        exercise={exercise["the-nist-ai-risk-management-framework-ai-rmf"]}
      >
        <SlideHeading className="!mb-5">The NIST AI Risk Management Framework (AI RMF)</SlideHeading>
        <Ruled className="mb-4 w-full">
          <P className="!max-w-none">
            Published by the US National Institute of Standards and Technology, the
            NIST AI RMF (and its Generative AI Profile) organizes trustworthy AI
            management into four continuous operational functions: Govern, Map,
            Measure, and Manage.
          </P>
        </Ruled>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-10">
          <div className="grid content-start gap-x-6 gap-y-3 md:grid-cols-2">
            <Ruled>
              <P>
                <Term>Govern</Term> is a cross-cutting function that establishes
                organizational culture, risk tolerance, clear executive
                accountability, policies, and workforce competencies across the
                entire AI lifecycle.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Map</Term> establishes the context of a specific AI
                deployment before launch, identifying the intended business
                purpose, the affected stakeholder groups, data provenance,
                value-chain dependencies, and foreseeable socio-technical risks.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Measure</Term> applies quantitative and qualitative
                behavioral auditing methods (such as the factorial, Monte-Carlo,
                and exact-PMF audits of Weeks 2 through 8) to assess
                trustworthiness metrics including validity, reliability, fairness,
                explainability, privacy, and robustness.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Manage</Term> allocates resources to prioritize, mitigate,
                monitor, and respond to the measured risks through pre-deployment
                controls, human oversight, incident playbooks, and system
                decommissioning when risk thresholds are exceeded.
              </P>
            </Ruled>
          </div>
          <Plate className="self-center">
            <RmfWheel />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          ISO/IEC 42001: Certifiable AI Management Systems [no-exercise]
          ================================================================ */}
      <Slide id="iso-iec-42001-certifiable-ai-management-systems" border className="!py-8">
        <SlideHeading className="!mb-5">ISO/IEC 42001: Certifiable AI Management Systems</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              While the NIST AI RMF is a voluntary guidance framework,{" "}
              <Term>ISO/IEC 42001</Term> is the world&apos;s first international
              standard specifying requirements for an auditable, certifiable
              Artificial Intelligence Management System (AIMS).
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Structured around a continuous Plan-Do-Check-Act (PDCA) cycle
              analogous to ISO/IEC 27001 for information security, ISO/IEC 42001
              requires organizations to maintain a formal AI risk register, conduct
              documented AI System Impact Assessments on individuals and society,
              and implement specific Annex A controls covering data quality,
              responsible development, third-party supplier oversight, and user
              transparency.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Independent third-party certification against ISO/IEC 42001 allows
              enterprise vendors to{" "}
              <Term>demonstrate governance maturity</Term> to corporate procurement
              teams, insurers, and regulatory auditors.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Translating Legal Mandates Into Product Compliance and Conformity Assessments [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Translating Legal Mandates Into Product Compliance and Conformity Assessments" />
        <div className="mt-8 w-full max-w-[56rem]">
          <Ruled>
            <p className={BIG}>
              Legal counsel, data scientists, and marketing managers collaborate
              through formal conformity assessments and algorithmic impact
              assessments to{" "}
              <Term>turn regulatory text into testable product requirements</Term>.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Algorithmic Impact Assessments and Conformity Assessments [no-exercise]
          ================================================================ */}
      <Slide id="algorithmic-impact-assessments-and-conformity-assessments" border className="!py-8">
        <SlideHeading className="!mb-5">Algorithmic Impact Assessments and Conformity Assessments</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled>
            <p className={BIG}>
              An <Term>Algorithmic Impact Assessment (AIA)</Term> is a structured,
              pre-deployment evaluation that documents a system&apos;s purpose,
              affected populations, data lineage, fairness and behavioral audit
              results, human-oversight design, and mitigation measures.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Under the EU AI Act, a <Term>conformity assessment</Term> is the
              mandatory verification procedure demonstrating that a high-risk AI
              system fulfills all statutory technical and governance requirements
              before the CE marking is affixed and the system enters the market.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Maintaining an <Term>immutable audit trail</Term> of training
              datasets, prompt templates, evaluation scripts, and sign-off decisions
              ensures that if a regulator or court investigates an adverse outcome
              two years after launch, the firm can prove due diligence.
            </p>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Six Steps of a Cross-Jurisdictional AI Compliance Workflow [exercise]
          ================================================================ */}
      <Slide
        id="six-steps-of-a-cross-jurisdictional-ai-compliance-workflow"
        border
        className="!py-8"
        exercise={exercise["six-steps-of-a-cross-jurisdictional-ai-compliance-workflow"]}
      >
        <SlideHeading className="!mb-5">Six Steps of a Cross-Jurisdictional AI Compliance Workflow</SlideHeading>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {[
            "Step 1 is inventory and jurisdictional mapping, cataloging every predictive, generative, and agentic system in use and identifying all geographic markets whose residents interact with or are affected by its outputs.",
            "Step 2 is risk-tier classification, screening each system against prohibited-practice lists and classifying whether it triggers high-risk (EU AI Act Annex III), high-impact, or fully automated decision-making (Quebec Law 25) status.",
            "Step 3 is provenance and consent verification, auditing every training and fine-tuning dataset to ensure valid legal basis, opt-out compliance, and zero exposure to FTC algorithmic disgorgement.",
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
            "Step 4 is executing the NIST Measure / behavioral audit suite, testing disaggregated group fairness, counterfactual recourse, sycophancy, and evaluative invariance across the target models.",
            "Step 5 is engineering transparency, oversight, and contestability interfaces, building plain-language automated-decision notices, factor explanations, and human review escalation paths into the product UI.",
            "Step 6 is compiling the conformity dossier, obtaining formal governance sign-off, and activating continuous post-market monitoring and incident reporting logs.",
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
          Regulating Agentic Commerce: Where Current Statutes Fall Short [exercise]
          ================================================================ */}
      <Slide
        id="regulating-agentic-commerce-where-current-statutes-fall-short"
        border
        className="!py-8"
        exercise={exercise["regulating-agentic-commerce-where-current-statutes-fall-short"]}
      >
        <SlideHeading className="!mb-5">Regulating Agentic Commerce: Where Current Statutes Fall Short</SlideHeading>
        <Ruled className="mb-3 w-full">
          <P className="!max-w-none">
            First-generation AI regulations were drafted primarily around two
            paradigms: tabular high-risk classifiers (credit, hiring) and
            human-facing generative chatbots (requiring a watermark or a notice
            that the user is chatting with an AI under EU AI Act Article 50).
          </P>
        </Ruled>
        <Statement className="mb-5 !max-w-none !text-[clamp(1.1rem,1.6vw,1.4rem)]">
          As established in Weeks 7 and 8, agentic commerce introduces governance
          gaps that current statutes do not yet fully close:
        </Statement>
        <ol className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          {(
            [
              [
                "disclosure",
                <>
                  <Term>Disclosure interception gap</Term>: FTC endorsement guides
                  and consumer protection rules mandate human-visible
                  &quot;Sponsored&quot; labels, but when an AI shopping agent reads
                  the results page, label wording alone fails to eliminate
                  sponsorship bias under platform delegation (Wadi &amp; Ma, 2026c).
                </>,
              ],
              [
                "fiduciary",
                <>
                  <Term>System-prompt fiduciary gap</Term>: current transparency
                  rules require telling the user that a system is an AI, but they do
                  not yet mandate disclosing whom the system prompt names as the
                  agent&apos;s principal or require a consumer-beneficiary
                  fiduciary clause (Wadi &amp; Ma, 2026c).
                </>,
              ],
              [
                "unit",
                <>
                  <Term>Machine-readable unit-price and ranking gap</Term>: consumer
                  unit-pricing laws require shelf labels for human eyes, leaving
                  storefronts free to bury unit weights behind costly API tool calls
                  that induce resource-rational search truncation (Wadi &amp; Ma,
                  2026b) or exploit lost-in-the-middle rank positions (Wadi &amp;
                  Ma, 2026a).
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
          Discussion: The Algorithmic Disgorgement Order
          ================================================================ */}
      <Slide id="discussion-the-algorithmic-disgorgement-order" border className="!py-8">
        <SlideHeading>Discussion: The Algorithmic Disgorgement Order</SlideHeading>
        <Discussion
          scenario={"A retail analytics startup scrapes four million consumer photos and product reviews from social media without consent and uses them to train a proprietary multimodal recommendation model that now powers 80 percent of its enterprise product revenue. Following an investigation, the FTC proposes a consent decree requiring algorithmic disgorgement (deletion of both the scraped dataset and the trained foundation model weights)."}
          question={"Analyze why regulators impose algorithmic disgorgement rather than a simple monetary fine, and explain what data-provenance and ISO/IEC 42001 controls would have prevented this existential business loss."}
        />
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Global AI regulation has shifted from voluntary ethics pledges to binding statutes that combine horizontal risk-based laws (EU AI Act), privacy and automated-decision rights (PIPEDA, Quebec Law 25), and sectoral consumer-protection enforcement (FTC Section 5, ECOA, NYC Local Law 144).",
            "The EU AI Act classifies systems into four risk tiers (unacceptable, high, limited, minimal), bans manipulative and vulnerability-exploiting AI, imposes strict conformity obligations on high-risk credit and HR systems, and regulates General-Purpose AI (GPAI) models with extraterritorial reach.",
            "In Canada, PIPEDA enforces meaningful consent and appropriate purposes, while Quebec Law 25 grants individuals mandatory notice, factor explanations, and the right to human review for exclusively automated decisions.",
            "In the United States, the FTC prosecutes unsubstantiated AI claims, deceptive dark patterns, and unfair discriminatory algorithms under Section 5, enforcing algorithmic disgorgement (model deletion) when models are trained on unlawfully obtained data.",
            <>
              The NIST AI Risk Management Framework (<em>Govern</em>, <em>Map</em>,{" "}
              <em>Measure</em>, <em>Manage</em>) and ISO/IEC 42001 translate legal
              mandates into operational risk registers, behavioral audits, and
              certifiable management systems.
            </>,
            "Next-generation regulatory compliance must also address agentic commerce gaps by mandating fiduciary consumer-beneficiary prompt clauses, disclosure pass-through, and machine-readable unit pricing.",
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
