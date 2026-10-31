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
  AuditLab,
  BiasPipeline,
  ConsentModels,
  CostProxy,
  DocTrio,
  EdiiRing,
  FairnessLab,
  HarmTaxonomy,
  NameSwap,
  OcapPillars,
  RiskPyramid,
} from "./visuals";

// ============================================================================
// WEEK 9: EDII, FAIRNESS, AND RESPONSIBLE AI
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
const SIDE = "mt-10 grid w-full max-w-6xl items-start gap-10 md:grid-cols-[1fr_1.15fr] md:gap-14";

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

/** A sentence under a small grey label naming the idea it carries. */
function Labelled({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={`${MICRO} text-[var(--ink-3)]`}>{name}</p>
      <p className={`${BODY} mt-2`}>{children}</p>
    </div>
  );
}

export default function Week9Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 9</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            EDII, Fairness, and Responsible AI
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Responsible artificial intelligence requires diagnosing data and algorithmic bias, embedding Equity,
            Diversity, Inclusion, and Indigeneity (EDII) and Indigenous data sovereignty into system design, and
            enforcing accountability across the deployment lifecycle.
          </p>
        </div>
      </Slide>

      {/* Why Technical Optimization Alone Does Not Guarantee Fairness */}
      <Slide id="why-fairness" border align="left">
        <Head1>Why Technical Optimization Alone Does Not Guarantee Fairness</Head1>
        <p className={`${DISPLAY} mt-8 max-w-5xl`}>
          Machine learning algorithms are mathematical optimization engines that minimize{" "}
          <span className={A}>average prediction error</span> across a training dataset.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            A model that minimizes overall average error across a majority population can still inflict severe,
            systematic errors on smaller or historically underserved demographic groups.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Treating data as neutral and objective overlooks the fact that enterprise datasets record past human
            decisions, institutional policies, and unequal access to services.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            When automated systems scale a biased decision rule across millions of transactions, they turn
            localized human prejudices into <span className={T}>uniform institutional barriers</span>.
          </p>
        </div>
        <Verdict>
          Responsible AI leadership requires evaluating systems not only on aggregate efficiency, but also on how
          errors, opportunities, and authority are distributed across people.
        </Verdict>
      </Slide>

      {/* Allocative Harm Versus Representational Harm */}
      <Slide id="harms" border align="left" exercise={exercise["harms"]}>
        <Head1>Allocative Harm Versus Representational Harm</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Researchers and regulators distinguish two primary categories of harm caused by artificial intelligence
          systems: allocative harm and representational harm.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <HarmTaxonomy />
        </div>
        <div className={GRID2}>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Allocative harm</span> occurs when an automated system unfairly withholds an
              economic opportunity, resource, or service from a group, such as credit, employment, housing, or
              medical care.
            </p>
            <p className={BODY}>
              Allocative harms have immediate, measurable material consequences for an individual&apos;s
              livelihood, health, or legal standing.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Representational harm</span> occurs when a language, search, or image model
            reinforces demeaning stereotypes, subordinates a cultural identity, or erases the visibility of a
            community.
          </p>
        </div>
        <p className={CLOSE}>
          Even when no immediate financial transaction is denied, representational harms shape organizational
          culture and reinforce the social biases that lead to{" "}
          <span className={A}>future allocative inequities</span>.
        </p>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="Sources of Bias in Enterprise Data and Models"
        lines={[
          "Algorithmic bias rarely originates from malicious code written by an engineer.",
          "Most fairness failures enter the pipeline through three structural flaws in the underlying data: historical bias, representation bias, and measurement bias.",
        ]}
      />

      {/* Historical, Representation, and Measurement Bias */}
      <Slide id="data-bias" border align="left" exercise={exercise["data-bias"]}>
        <Head1>Historical, Representation, and Measurement Bias</Head1>
        <div className="mt-8 w-full max-w-5xl">
          <BiasPipeline />
        </div>
        <div className={GRID3}>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Historical bias</span> occurs when training data accurately reflect a world
              shaped by past discrimination or unequal opportunity, even when the data are measured without
              technical error.
            </p>
            <p className={BODY}>
              For example, a business lending dataset from decades of redlined credit markets will show fewer
              historical loans in minority neighborhoods regardless of creditworthiness.
            </p>
          </div>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Representation bias</span> occurs when certain demographic, geographic, or
              linguistic groups are under-sampled in the training data, causing the model to make higher errors
              on those groups.
            </p>
            <p className={BODY}>
              Early facial analysis and speech recognition systems failed disproportionately on darker skin tones
              and non-standard dialects because training corpora were overwhelmingly white and male.
            </p>
          </div>
          <p className={BODY}>
            <span className={T}>Measurement bias</span> occurs when the observable proxy variable chosen as a
            feature or target label systematically distorts the true underlying construct for specific groups.
          </p>
        </div>
      </Slide>

      {/* Case Study: Measurement Bias in Healthcare Risk Algorithms */}
      <Slide id="cost-proxy" border align="left">
        <Head1>Case Study: Measurement Bias in Healthcare Risk Algorithms</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            A landmark empirical study examined a commercial risk-prediction algorithm used by health systems
            across the United States to select patients for high-risk preventive care management.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            To predict which patients had the greatest future medical need, the model developers used{" "}
            <span className={T}>total future healthcare billing expenditure</span> as the target variable during
            training.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CostProxy />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Because lower-income and Black patients faced systemic barriers to routine medical access and
            preventive visits, they generated lower annual medical bills than equally sick white patients.
          </p>
          <p className={BODY}>
            As a result, at the exact same algorithm risk score, Black patients had significantly more
            uncontrolled chronic conditions, such as diabetes, hypertension, and renal disease, than white
            patients.
          </p>
          <p className={BODY}>
            Replacing the flawed cost proxy with biological indicators of chronic illness severity{" "}
            <span className={A}>more than doubled</span> the share of high-need Black patients properly enrolled
            in extra care.
          </p>
        </div>
      </Slide>

      {/* Aggregation and Evaluation Bias */}
      <Slide id="aggregation-evaluation" border align="left">
        <Head1>Aggregation and Evaluation Bias</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Even after data collection, bias can be introduced during modeling and testing through aggregation bias
          and evaluation bias.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Aggregation bias</span> arises when a single model assumes that the
              relationship between input features and outcomes is identical across all subpopulations when it
              actually differs.
            </p>
            <p className={BODY}>
              For instance, diabetic patients of different ethnic backgrounds or age groups exhibit different
              clinical relationships between hemoglobin A1c levels and complication risk.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Evaluation bias</span> occurs when a model is validated on a benchmark dataset
            that does not reflect the diversity of the real users who will encounter the system in production.
          </p>
        </div>
        <Verdict>
          Reporting a single aggregate accuracy score of <span className={A}>95 percent</span> can conceal a{" "}
          <span className={A}>40 percent</span> failure rate on a minority subgroup, making disaggregated subgroup
          reporting essential before launch.
        </Verdict>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Algorithmic Fairness and the EDII Framework"
        lines={[
          "Diagnosing bias requires both formal statistical fairness metrics and a broader organizational commitment to Equity, Diversity, Inclusion, and Indigeneity (EDII).",
          "Because mathematical fairness definitions can conflict with one another, leaders must make transparent value judgments rather than delegating fairness to an automated formula.",
        ]}
      />

      {/* Statistical Definitions of Fairness and Their Trade-Offs */}
      <Slide id="fairness-definitions" border align="left" exercise={exercise["fairness-definitions"]}>
        <Head1>Statistical Definitions of Fairness and Their Trade-Offs</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Quantitative auditing uses three primary statistical criteria to test whether a classification model
          treats demographic groups fairly.
        </p>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Demographic parity</span> (also called statistical parity) requires that the
            proportion of individuals receiving a positive decision, such as a loan approval or interview invite,
            be equal across groups.
          </p>
          <p className={BODY}>
            <span className={T}>Equal opportunity</span> requires that among individuals who truly qualify for the
            positive outcome, the model achieves the same true positive rate (recall) across every demographic
            group.
          </p>
          <p className={BODY}>
            <span className={T}>Predictive parity</span> (or calibration by group) requires that among individuals
            assigned a given risk score, such as a 70 percent repayment probability, the actual outcome rate be
            equal across groups.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <FairnessLab />
        </div>
        <p className={CLOSE}>
          A fundamental mathematical result known as the{" "}
          <span className={A}>impossibility theorem of fairness</span> proves that whenever base rates of the
          outcome differ between groups in the data, no imperfect model can satisfy all three criteria
          simultaneously.
        </p>
      </Slide>

      {/* Embedding EDII Across the AI Lifecycle */}
      <Slide id="edii-lifecycle" border align="left">
        <Head1>Embedding EDII Across the AI Lifecycle</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Because fairness cannot be reduced to a single mathematical equation, organizations embed Equity,
          Diversity, Inclusion, and Indigeneity (EDII) across the entire AI lifecycle.
        </p>
        <div className={SIDE}>
          <div className="w-full">
            <EdiiRing />
          </div>
          <div className="space-y-5">
            <Labelled name="Equity">
              Equity requires recognizing unequal historical starting points and designing target labels,
              thresholds, and interventions so the system reduces rather than amplifies structural disparities.
            </Labelled>
            <Labelled name="Diversity">
              Diversity requires ensuring that both training datasets and the multidisciplinary teams designing,
              testing, and governing the system include varied demographic and domain perspectives.
            </Labelled>
            <Labelled name="Inclusion">
              Inclusion requires building user interfaces, language models, and fallback processes that
              accommodate people with disabilities, neurodivergent users, and linguistic minorities.
            </Labelled>
            <Labelled name="Indigeneity">
              Indigeneity requires recognizing the distinct legal status, inherent sovereignty, collective rights,
              and knowledge systems of Indigenous Peoples rather than treating Indigenous communities as a generic
              demographic category.
            </Labelled>
          </div>
        </div>
      </Slide>

      {/* Accessibility and Inclusive System Design */}
      <Slide id="accessibility" border align="left">
        <Head1>Accessibility and Inclusive System Design</Head1>
        <p className={`${DISPLAY} mt-8 max-w-5xl`}>
          Artificial intelligence systems can either remove barriers for people with disabilities or erect new
          digital barriers when designed around narrow assumptions of a typical user.
        </p>
        <div className="mt-10 grid w-full max-w-5xl gap-8 border-t border-[var(--ink)]/15 pt-8 md:grid-cols-2 md:gap-14">
          <div>
            <p className={`${MICRO} text-[var(--accent)]`}>Removing barriers</p>
            <p className={`${BODY} mt-3`}>
              Properly designed AI tools advance workplace and consumer inclusion through real-time meeting
              captioning, screen-reader image descriptions, and plain-language document simplification.
            </p>
          </div>
          <div className={COL_RULE}>
            <p className={`${MICRO} text-[var(--ink-3)]`}>Erecting barriers</p>
            <div className={`${STACK} mt-3`}>
              <p className={BODY}>
                Conversely, poorly designed automated systems exclude users when voice-authentication banking
                locks out customers with speech impairments or stammering.
              </p>
              <p className={BODY}>
                Automated hiring games, timed cognitive tests, and webcam proctoring tools frequently penalize
                candidates with visual impairments, motor disabilities, or neurodivergent gaze patterns.
              </p>
            </div>
          </div>
        </div>
        <Verdict>
          Inclusive engineering mandates testing AI interfaces with assistive technologies, auditing error rates
          across disability categories, and providing{" "}
          <span className={A}>accessible human alternatives without penalty</span>.
        </Verdict>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Indigenous Data Sovereignty and OCAP Principles"
        lines={[
          "Standard corporate data governance is built on individual click-wrap consent and open-data sharing, frameworks that often conflict with the collective rights of Indigenous Peoples.",
          "Responsible AI in Canada and globally requires respecting Indigenous data sovereignty and adhering to the First Nations principles of OCAP and the international CARE principles.",
        ]}
      />

      {/* Indigenous Data Sovereignty and Collective Rights */}
      <Slide id="data-sovereignty" border align="left">
        <Head1>Indigenous Data Sovereignty and Collective Rights</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          <span className={T}>Indigenous data sovereignty</span> is the inherent right of Indigenous Nations and
          Peoples to govern the collection, ownership, application, and stewardship of data about their
          communities, citizens, lands, languages, and cultures.
        </p>
        <div className={GRID2}>
          <p className={BODY}>
            For decades, external governments, academic researchers, and corporations extracted data from
            Indigenous communities without community consent or local benefit.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Externally controlled statistics frequently emphasized deficit narratives that stigmatized Indigenous
            communities in policy, credit, and child-welfare systems while ignoring community strengths.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <ConsentModels />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            Unlike Western privacy statutes that focus solely on an individual user clicking an agreement,
            Indigenous data governance recognizes collective community ownership over shared cultural heritage,
            traditional ecological knowledge, and population records.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Meaningful recognition of Indigenous data sovereignty grounded in the United Nations Declaration on the
            Rights of Indigenous Peoples (UNDRIP) shifts Indigenous Nations from passive data subjects to{" "}
            <span className={A}>governing decision-makers</span>.
          </p>
        </div>
      </Slide>

      {/* The First Nations Principles of OCAP */}
      <Slide id="ocap" border align="left" exercise={exercise["ocap"]}>
        <Head1>The First Nations Principles of OCAP</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          The First Nations principles of OCAP, established by the First Nations Information Governance Centre,
          define how First Nations data must be governed across research and enterprise projects.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <OcapPillars />
        </div>
        <div className="mt-6 grid w-full max-w-6xl gap-6 md:grid-cols-4 md:gap-8">
          <p className={BODY}>
            <span className={T}>Ownership</span> states that a community or First Nation owns information
            collectively in the exact same way that an individual owns their personal information.
          </p>
          <p className={BODY}>
            <span className={T}>Control</span> affirms that First Nations hold the right to control all aspects
            of data management and AI development from initial project formulation through review, deployment,
            and retirement.
          </p>
          <p className={BODY}>
            <span className={T}>Access</span> requires that First Nations have full access to information and
            data about themselves and their communities wherever those records are held, and the right to decide
            who else may access them.
          </p>
          <p className={BODY}>
            <span className={T}>Possession</span> refers to the physical and technical jurisdiction under which
            the data sit, ensuring that data stewardship and infrastructure align with First Nation ownership in
            practice.
          </p>
        </div>
      </Slide>

      {/* The CARE Principles and Generative AI Scraping Risks */}
      <Slide id="care" border align="left">
        <Head1>The CARE Principles and Generative AI Scraping Risks</Head1>
        <div className={PAIR}>
          <p className={LEAD}>
            Complementing OCAP at the international level, the Global Indigenous Data Alliance formulated the{" "}
            <span className={T}>CARE Principles</span>: Collective Benefit, Authority to Control, Responsibility,
            and Ethics.
          </p>
          <p className={`${LEAD} ${COL_RULE}`}>
            The CARE principles were designed to balance technical open-data standards (FAIR: Findable,
            Accessible, Interoperable, Reusable) so open science does not become a vehicle for unauthorized data
            extraction.
          </p>
        </div>
        <div className={`${RULED} grid gap-8 md:grid-cols-2 md:gap-14`}>
          <p className={BODY}>
            Generative AI introduces acute sovereignty risks when developers scrape Indigenous languages, oral
            histories, sacred stories, or traditional artistic designs from public websites into commercial
            foundation models without consent.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Commercializing an Indigenous language translator or generating imitations of traditional Indigenous
            art without community governance violates collective intellectual and cultural rights.
          </p>
        </div>
        <Verdict>
          Enterprises working in natural resources, healthcare, finance, or technology on Indigenous territories
          must establish <span className={A}>formal, community-governed data agreements and benefit-sharing
          structures</span> before collecting or modeling data.
        </Verdict>
      </Slide>

      {/* Discussion: Partnering on an Environmental Monitoring AI Project */}
      <Slide id="discussion-monitoring" border align="left">
        <Head1>Discussion: Partnering on an Environmental Monitoring AI Project</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A forestry and clean-energy company wants to train a
          geospatial and language model to predict wildfire risk and watershed changes across a northern region
          that overlaps the traditional territories of three First Nations. The data science team proposes
          combining commercial satellite imagery with historical Indigenous land-use maps and digitized
          transcripts of Elder ecological interviews held in a public university library archive. How do
          Indigenous data sovereignty and the OCAP and CARE principles apply to those archived records, and what
          governance and partnership structure must the company establish before beginning the project?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="Behavioral Auditing of Large Language Models"
        lines={[
          "Auditing a tabular credit model involves inspecting a fixed set of numerical columns, whereas auditing a large language model requires testing an open-ended system that generates prose, rankings, and tool calls.",
          "Behavioral auditing treats the language model as an empirical subject, using controlled counterfactual experiments and red-teaming to uncover hidden demographic and cultural biases.",
        ]}
      />

      {/* Demographic Stereotyping and Cultural Alignment in LLMs */}
      <Slide id="llm-stereotyping" border align="left">
        <Head1>Demographic Stereotyping and Cultural Alignment in LLMs</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Because foundation models are trained on massive web scrapes, their internal representations absorb
            historical occupational stereotypes, cultural biases, and majority-group norms.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Even when surface safety filters block overtly offensive slurs, language models frequently exhibit{" "}
            <span className={T}>covert behavioral bias</span> in downstream business tasks.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <NameSwap />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Empirical studies show that when prompted to draft reference letters or suggest starting salaries,
            uncalibrated models systematically use more communal words and recommend lower pay for female names
            than for male names with identical resumes.
          </p>
          <p className={BODY}>
            Language models also exhibit <span className={T}>dialect bias</span>, assigning lower competence
            scores or more punitive customer-service decisions to users writing in African American Vernacular
            English, Indigenous English dialects, or non-native phrasing.
          </p>
          <p className={BODY}>
            In global business deployments, models trained predominantly on North American and European text often
            misinterpret cultural communication styles, family structures, and ethical norms from other regions.
          </p>
        </div>
      </Slide>

      {/* Counterfactual Testing and Behavioral Audits */}
      <Slide id="counterfactual-audits" border align="left" exercise={exercise["counterfactual-audits"]}>
        <Head1>Counterfactual Testing and Behavioral Audits</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Behavioral auditing</span> evaluates an AI system by systematically varying its
            inputs in controlled experiments and measuring disparities in its outputs, without needing access to
            internal model weights.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            The primary method for auditing language models in business workflows is{" "}
            <span className={T}>counterfactual testing</span>, analogous to correspondence audit studies in labor
            economics.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <AuditLab />
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            In a counterfactual audit, analysts construct hundreds of realistic task prompts, such as loan
            summaries, patient triage notes, or resumes, where all objective qualifications are held identical.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            The audit then permutes only a demographic indicator, such as culturally distinctive names, pronouns,
            tribal affiliations, postal codes, or dialects, across thousands of repeated API runs.
          </p>
        </div>
        <p className={CLOSE}>
          Comparing approval rates, sentiment scores, and error rates across permutations quantifies whether the
          model violates <span className={A}>invariance</span> (the rule that changing an irrelevant protected
          attribute must not alter the decision).
        </p>
      </Slide>

      {/* Red-Teaming and Adversarial Safety Evaluation */}
      <Slide id="red-teaming" border align="left">
        <Head1>Red-Teaming and Adversarial Safety Evaluation</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          While counterfactual audits measure statistical bias across routine workflows, red-teaming tests how an
          AI system behaves under adversarial or extreme conditions.
        </p>
        <p className={`${DISPLAY} mt-8 max-w-5xl`}>
          <span className={A}>Red-teaming</span> is a structured evaluation in which an independent group of
          security specialists, domain experts, and community representatives deliberately attempts to provoke
          harmful, biased, or policy-violating outputs.
        </p>
        <div className="mt-10 w-full max-w-5xl">
          <Numbered
            cols="md:grid-cols-3"
            items={[
              "Unlike static multiple-choice safety benchmarks that models quickly memorize, red teams test multi-turn dialogues, indirect prompt injections, and domain-specific edge cases.",
              "Effective enterprise red-teaming includes participants from the communities most likely to be harmed by system failures, who can spot subtle cultural stereotyping or accessibility barriers that homogeneous engineering teams miss.",
              "Findings from red-teaming are converted into automated regression tests, system-prompt constraints, input/output safety classifiers, and hard refusal boundaries before production release.",
            ]}
          />
        </div>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Accountability Frameworks and Regulatory Compliance"
        lines={[
          "Responsible AI principles have moved from voluntary corporate ethics statements to binding statutory law, industry standards, and board-level risk oversight.",
          "Organizations must build auditable documentation, clear lines of executive accountability, and accessible customer recourse into every high-impact AI deployment.",
        ]}
      />

      {/* Risk-Based AI Regulation Across Jurisdictions */}
      <Slide id="risk-regulation" border align="left" exercise={exercise["risk-regulation"]}>
        <Head1>Risk-Based AI Regulation Across Jurisdictions</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Global AI regulation increasingly follows a <span className={T}>risk-based architecture</span> that
            scales legal obligations to the severity of potential harm in a given use case.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            The European Union AI Act classifies AI applications into four risk tiers: unacceptable risk
            (prohibited outright, such as social scoring), high risk, limited transparency risk, and minimal risk.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <RiskPyramid />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            High-risk systems under the EU AI Act include AI used in employment and recruitment, creditworthiness
            scoring, educational admission, essential public benefits, biometric identification, and critical
            infrastructure.
          </p>
          <p className={BODY}>
            Deploying a high-risk system requires pre-market conformity assessments, documented data governance,
            bias testing, technical robustness, human oversight capabilities, and registration in a regulatory
            database.
          </p>
          <p className={BODY}>
            In North America, sector regulators enforce existing civil rights, fair lending, consumer protection,
            and privacy laws against algorithmic systems, complemented by governance standards such as the{" "}
            <span className={T}>NIST AI Risk Management Framework</span>.
          </p>
        </div>
      </Slide>

      {/* Documentation Standards: Model Cards, Datasheets, and Impact Assessments */}
      <Slide id="documentation" border align="left" exercise={exercise["documentation"]}>
        <Head1>Documentation Standards: Model Cards, Datasheets, and Impact Assessments</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Auditable AI governance relies on three standardized documentation artifacts maintained throughout a
          system&apos;s lifecycle.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <DocTrio />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            First, a <span className={T}>Datasheet for Datasets</span> records the provenance of a training or
            evaluation dataset: who funded and collected it, which populations are included or missing, how
            consent was obtained, and how target labels were defined.
          </p>
          <p className={BODY}>
            Second, a <span className={T}>Model Card</span> documents a trained model&apos;s architecture,
            intended business use cases, explicitly prohibited out-of-scope uses, and disaggregated error rates
            across demographic and operational subgroups.
          </p>
          <p className={BODY}>
            Third, an <span className={T}>Algorithmic Impact Assessment (AIA)</span> evaluates the
            socio-technical deployment as a whole, analyzing potential allocative and representational harms,
            human-in-the-loop safeguards, and monitoring plans before launch.
          </p>
        </div>
        <p className={CLOSE}>
          Maintaining these three artifacts prevents teams from repurposing a model built for a{" "}
          <span className={A}>low-stakes marketing task</span> into a high-stakes credit or HR workflow where it
          was never validated.
        </p>
      </Slide>

      {/* Assigning Organizational Accountability and Recourse */}
      <Slide id="accountability" border align="left">
        <Head1>Assigning Organizational Accountability and Recourse</Head1>
        <p className={`${LEAD} mt-6 max-w-5xl`}>
          A recurring failure in corporate AI incidents is the <span className={T}>problem of many hands</span>:
          when an algorithm causes harm, responsibility diffuses across the external vendor, the data engineers,
          the product manager, and the frontline operator.
        </p>
        <div className="mt-10 grid w-full max-w-6xl gap-8 border-t border-[var(--ink)]/15 pt-8 md:grid-cols-3 md:gap-10">
          <Labelled name="Named owner">
            Sound governance eliminates diffused responsibility by requiring a single named executive owner for
            every high-impact AI system in the enterprise inventory.
          </Labelled>
          <div className={COL_RULE.replace("md:pl-14", "md:pl-10")}>
            <Labelled name="Committee review">
              Before launch and at regular intervals, high-risk systems must pass review by a cross-functional
              governance committee with veto authority spanning legal, risk, engineering, EDII, and domain
              operations.
            </Labelled>
          </div>
          <div className={COL_RULE.replace("md:pl-14", "md:pl-10")}>
            <Labelled name="Recourse">
              Finally, every automated system that makes consequential decisions about customers or employees must
              provide a meaningful recourse mechanism.
            </Labelled>
          </div>
        </div>
        <Verdict>
          <span className={A}>Meaningful recourse</span> requires clear notice that an automated system was used,
          plain-language explanation of the decision factors, and a timely, accessible process to correct faulty
          input data and obtain human review.
        </Verdict>
      </Slide>

      {/* Discussion: Auditing a Multilingual Customer Hardship Triage Agent */}
      <Slide id="discussion-hardship" border align="left">
        <Head1>Discussion: Auditing a Multilingual Customer Hardship Triage Agent</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A national banking and telecommunications company deploys a
          language-model agent to evaluate written customer requests for temporary payment-hardship extensions.
          Six months after launch, an internal audit reveals that customers writing in non-standard English
          dialects or listing rural and First Nations reserve addresses receive hardship approvals at a 28 percent
          rate, compared with 52 percent for urban applicants with identical account balances and payment
          histories. Identify the specific forms of bias and harm present in this deployment, design a
          counterfactual behavioral audit to isolate the causes, and specify the governance, OCAP, and recourse
          reforms required before the system can operate.
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <Numbered
          items={[
            "Optimizing a model for average accuracy over historical data does not guarantee fairness and can inflict severe allocative or representational harms on under-represented groups.",
            "Bias enters enterprise AI through historical discrimination recorded in past data, under-representation in sampling, measurement bias in flawed proxy labels (such as using medical cost as a proxy for illness), and aggregation across distinct populations.",
            "Because statistical fairness metrics (demographic parity, equal opportunity, and predictive parity) cannot all be satisfied simultaneously when base rates differ, choosing a fairness criterion is an explicit ethical and managerial judgment grounded in EDII.",
            "Indigenous data sovereignty and the First Nations principles of OCAP (Ownership, Control, Access, and Possession) establish that Indigenous Nations hold collective governance authority over data concerning their communities, lands, languages, and cultures.",
            "Auditing large language models requires counterfactual behavioral experiments that permute demographic and dialect cues across identical task prompts, paired with multidisciplinary red-teaming.",
            "Regulatory compliance under frameworks such as the EU AI Act and NIST AI RMF requires risk-tiered oversight, Datasheets, Model Cards, Algorithmic Impact Assessments, named executive accountability, and accessible human recourse.",
          ]}
        />
      </Slide>
    </SlideDeck>
  );
}
