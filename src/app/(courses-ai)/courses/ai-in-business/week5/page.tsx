"use client";

import React from "react";
import { SlideDeck, Slide } from "@/app/(courses-ai)/_components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  BODY,
  COL_RULE,
  Discussion1,
  Head1,
  LEAD,
  MICRO,
  PAIR,
  PartPlate1,
  Verdict,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AdoptionRoadmap,
  AttritionDrivers,
  BiasLoop,
  ConstructGap,
  FourFifthsLab,
  InterviewRubric,
  KeywordVsSemantic,
  LevelingEvidence,
  OnaToggle,
  SkillBridge,
  SurveillanceSpectrum,
  TaskUnbundle,
} from "./visuals";

// ============================================================================
// WEEK 5: AI IN HUMAN RESOURCES
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each sentence sits and which plate is drawn beside
// it. Plates live in ./visuals.tsx, exercises in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const T = "font-semibold text-[var(--ink)]";
const STACK = "space-y-4";
const SUB = `${BODY} border-t border-[var(--ink)]/10 pt-4`;
const GRID3 = "mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10";
const GRID2 = "mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14";
const FIG = "mt-8 w-full max-w-5xl";
const A = "text-[var(--accent)]";

export default function Week5Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 5</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            AI in Human Resources
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Artificial intelligence in human resources can improve talent matching and augment worker
            productivity, but requires careful job redesign, bias auditing, and clear boundaries on
            employee monitoring.
          </p>
        </div>
      </Slide>

      {/* People Analytics and High-Stakes Employment Decisions */}
      <Slide id="people-analytics" border align="left">
        <Head1>People Analytics and High-Stakes Employment Decisions</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Human resources decisions, including hiring, promotion, compensation, and retention, directly
          determine an organization&apos;s capabilities and an individual&apos;s livelihood.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            <span className={T}>People analytics</span> applies statistical and machine learning models to
            workforce data to improve talent decisions and organizational design.
          </p>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              Modeling employee behavior is harder than modeling consumer clicks or payment transactions
              because sample sizes inside a single firm are much smaller.
            </p>
            <p className={BODY}>
              Employment outcomes also take months or years to observe, and performance outcomes are
              missing entirely for job applicants who were rejected.
            </p>
          </div>
        </div>
        <Verdict>
          Because hiring and evaluation decisions carry high legal and ethical stakes, algorithms in human
          resources require <span className={A}>strict human oversight and validation</span>.
        </Verdict>
      </Slide>

      {/* Construct Validity and Target Labels in HR Modeling */}
      <Slide id="construct-validity" border align="left" exercise={exercise["construct-validity"]}>
        <Head1>Construct Validity and Target Labels in HR Modeling</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Construct validity</span> measures how accurately an observed data label
            captures the underlying concept that management actually cares about, such as job performance.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            In many roles, true contribution includes team mentorship, problem prevention, and client
            trust, which are not fully captured by a single numerical metric.
          </p>
        </div>
        <div className={FIG}>
          <ConstructGap />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            When data scientists train a model using annual supervisor ratings or past hiring decisions as
            the target label, the model learns to predict subjective human judgments.
          </p>
          <p className={BODY}>
            If historical promotions favored employees who worked in the headquarters office or belonged to
            a majority demographic, a supervised model will treat those traits as predictors of merit.
          </p>
          <p className={BODY}>
            Every people-analytics project must therefore{" "}
            <span className={A}>audit the target variable</span> for measurement bias before evaluating
            predictive accuracy.
          </p>
        </div>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="Automated Talent Acquisition and Candidate Matching"
        lines={[
          "Large employers frequently receive hundreds or thousands of applications for a single job posting, far exceeding what human recruiters can read line by line.",
          "Natural language processing and semantic embeddings help recruiting teams match candidate capabilities to job requirements while avoiding brittle keyword filters.",
        ]}
      />

      {/* From Keyword Filters to Semantic Skill Matching */}
      <Slide id="keyword-to-semantic" border align="left" exercise={exercise["keyword-to-semantic"]}>
        <Head1>From Keyword Filters to Semantic Skill Matching</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Early applicant tracking systems relied on exact keyword matching, automatically rejecting
            qualified candidates whose resumes used different terminology than the job posting.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Semantic skill matching</span> uses text embeddings and a structured skills
            taxonomy to represent how roles, tools, and competencies relate to one another.
          </p>
        </div>
        <div className={FIG}>
          <KeywordVsSemantic />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            A <span className={T}>skills taxonomy</span> is a structured knowledge graph that connects job
            titles, tasks, and adjacent skills, recognizing that experience in financial auditing transfers
            to compliance analysis.
          </p>
          <p className={BODY}>
            Language models extract structured work history, verified credentials, and demonstrated project
            outcomes from varied resume formats into a common schema.
          </p>
          <p className={BODY}>
            Well-designed screening systems use semantic matching to{" "}
            <span className={A}>surface overlooked candidates for human review</span> rather than
            automatically issuing final rejections.
          </p>
        </div>
      </Slide>

      {/* Structured Interview Analysis and Assessment Tools */}
      <Slide id="structured-interviews" border align="left">
        <Head1>Structured Interview Analysis and Assessment Tools</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Decades of organizational psychology research show that unstructured interviews, where each
            interviewer asks improvised questions, are poor predictors of future job performance.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            A <span className={T}>structured interview</span> asks every candidate the same job-related
            questions and scores responses against a predefined behavioral rubric.
          </p>
        </div>
        <div className={FIG}>
          <InterviewRubric />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Language models support structured interviewing by generating competency-based questions from
            job analyses, transcribing conversations, and organizing candidate answers by rubric criterion.
          </p>
          <p className={BODY}>
            By contrast, automated video interview tools that score candidates on facial expressions, vocal
            pitch, or eye contact <span className={A}>lack scientific validity</span> and should not be
            used.
          </p>
          <p className={BODY}>
            Emotion-recognition and vocal-tone algorithms penalize candidates with disabilities, speech
            differences, or non-native accents while measuring traits unrelated to job capability.
          </p>
        </div>
      </Slide>

      {/* Generative AI on Both Sides of the Hiring Funnel */}
      <Slide id="both-sides-funnel" border align="left">
        <Head1>Generative AI on Both Sides of the Hiring Funnel</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Generative AI operates on both sides of the labor market: employers use models to screen
          applications, while candidates use models to tailor resumes and cover letters.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Because applicants can generate customized applications in seconds, the average number of
              applications submitted per open role has risen sharply across industries.
            </p>
            <p className={BODY}>
              This two-sided automation reduces the diagnostic signal of polished cover letters, generic
              take-home essays, and unproctored online questionnaires.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            When screening algorithms evaluate machine-generated resumes, the hiring funnel risks
            degenerating into a filter comparing one language model&apos;s output against another&apos;s
            prompt.
          </p>
        </div>
        <Verdict>
          Employers increasingly restore signal quality by emphasizing{" "}
          <span className={A}>verified credentials, live problem-solving simulations</span>, and structured
          discussions of past work.
        </Verdict>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Workforce Analytics, Attrition, and Internal Mobility"
        lines={[
          "Once employees join an organization, people analytics shifts toward retaining key talent, identifying skill gaps, and supporting internal career mobility.",
          "Predictive models and network analysis help leadership diagnose structural causes of turnover and burnout before valuable teams dissolve.",
        ]}
      />

      {/* Predicting Voluntary Attrition and Regrettable Turnover */}
      <Slide id="attrition" border align="left">
        <Head1>Predicting Voluntary Attrition and Regrettable Turnover</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Voluntary attrition</span> occurs when an employee chooses to leave the
            firm, whereas <span className={T}>regrettable turnover</span> refers specifically to the loss
            of high-performing or critical-skill workers.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Replacing a skilled professional typically costs between 50 percent and 200 percent of their
            annual salary in recruiting fees, onboarding time, and lost institutional knowledge.
          </p>
        </div>
        <div className={FIG}>
          <AttritionDrivers />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Supervised attrition models estimate turnover probability from features such as time since last
            promotion, pay relative to market benchmarks, commute distance, and manager turnover.
          </p>
          <p className={BODY}>
            Predictive attrition scores are most effective when{" "}
            <span className={A}>aggregated at the team or department level</span> to fix systemic issues
            such as uncompetitive pay bands or chronic overtime.
          </p>
          <p className={BODY}>
            Using individual flight-risk scores to withhold training or promotions from flagged employees is
            unethical and creates a self-fulfilling prophecy that accelerates their departure.
          </p>
        </div>
      </Slide>

      {/* Internal Talent Marketplaces and Skill Adjacency */}
      <Slide id="talent-marketplaces" border align="left" exercise={exercise["talent-marketplaces"]}>
        <Head1>Internal Talent Marketplaces and Skill Adjacency</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            External hiring is slow and expensive, yet large organizations often lay off workers in one
            division while recruiting externally for similar skills in another.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            An <span className={T}>internal talent marketplace</span> is an AI-enabled platform that matches
            current employees to open internal roles, cross-functional projects, and training pathways.
          </p>
        </div>
        <div className={FIG}>
          <SkillBridge />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Skill adjacency</span> measures how closely a worker&apos;s existing
            capabilities align with the requirements of a new role, identifying the specific gap that
            training must bridge.
          </p>
          <p className={BODY}>
            For example, a customer support specialist with strong product knowledge and SQL familiarity is
            closely adjacent to a junior product operations or business analyst role.
          </p>
          <p className={BODY}>
            Internal mobility systems <span className={A}>improve retention</span> by giving employees
            transparent career progression while lowering the firm&apos;s external recruitment and
            onboarding costs.
          </p>
        </div>
      </Slide>

      {/* Organizational Network Analysis and Collaboration Patterns */}
      <Slide id="network-analysis" border align="left">
        <Head1>Organizational Network Analysis and Collaboration Patterns</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              An organization&apos;s formal reporting chart rarely reflects how information, advice, and
              coordination actually flow across departments in daily work.
            </p>
            <p className={BODY}>
              <span className={T}>Organizational network analysis (ONA)</span> maps informal collaboration
              patterns using aggregated, privacy-preserving metadata from calendars, project repositories,
              and team communication channels.
            </p>
            <p className={BODY}>
              Network graphs identify central connectors who bridge separate business units, peripheral
              employees who may be isolated during remote onboarding, and siloed teams that rarely
              coordinate.
            </p>
            <p className={SUB}>
              In many firms, a small fraction of employees field the majority of technical and operational
              questions, placing them at <span className={A}>high risk of exhaustion and burnout</span>.
            </p>
          </div>
          <OnaToggle />
        </div>
        <p className={`${LEAD} mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Leaders use ONA to redistribute mentoring loads, redesign cross-functional workflows, and preserve
          key institutional relationships during reorganizations.
        </p>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Job Redesign: Task Automation Versus Skill Augmentation"
        lines={[
          "Evaluating how artificial intelligence affects the workforce requires looking inside occupations rather than treating a job title as a single indivisible unit.",
          "Separating routine task automation from human skill augmentation allows managers to redesign roles for higher productivity without hollowing out organizational expertise.",
        ]}
      />

      {/* Unbundling Jobs into Tasks: Automation Versus Augmentation */}
      <Slide id="unbundling-jobs" border align="left" exercise={exercise["unbundling-jobs"]}>
        <Head1>Unbundling Jobs into Tasks: Automation Versus Augmentation</Head1>
        <div className={GRID3}>
          <p className={BODY}>
            In labor economics, every occupation is a bundle of distinct tasks that vary in their reliance
            on codifiable rules, interpersonal empathy, and contextual judgment.
          </p>
          <p className={BODY}>
            <span className={T}>Task automation</span> occurs when software replaces human labor on a
            specific subtask, such as transcribing meeting audio, categorizing expense receipts, or
            formatting routine reports.
          </p>
          <p className={BODY}>
            <span className={T}>Skill augmentation</span> occurs when AI serves as a collaborative tool that
            raises the speed or quality of a human worker performing a complex task, such as financial
            planning or clinical triage.
          </p>
        </div>
        <div className={FIG}>
          <TaskUnbundle />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Most enterprise AI deployments automate a subset of routine tasks within a role while augmenting
            the remaining analytical and interpersonal responsibilities.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Capturing the value of task automation requires{" "}
            <span className={A}>actively redesigning workflows</span> so freed employee hours are
            reallocated to higher-value client, creative, or strategic work.
          </p>
        </div>
      </Slide>

      {/* The Productivity Leveling Effect of Generative AI */}
      <Slide id="leveling-effect" border align="left" exercise={exercise["leveling-effect"]}>
        <Head1>The Productivity Leveling Effect of Generative AI</Head1>
        <div className={GRID3}>
          <p className={BODY}>
            Field experiments across customer service, business writing, consulting, and software
            development reveal a consistent distributional pattern when workers adopt generative AI
            assistants.
          </p>
          <p className={BODY}>
            Less-experienced and lower-performing workers achieve the largest percentage gains in speed and
            output quality, narrowing the performance gap with senior peers.
          </p>
          <p className={BODY}>
            This <span className={T}>leveling effect</span> occurs because the language model has absorbed
            the phrasing, structure, and troubleshooting patterns of high-performing workers from historical
            data.
          </p>
        </div>
        <div className={FIG}>
          <LevelingEvidence />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            However, researchers also observe a <span className={T}>jagged capability frontier</span>: tasks
            that appear similar in difficulty can fall on opposite sides of what a language model can solve
            reliably.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            On tasks outside the model&apos;s competence, workers who uncritically accept AI outputs{" "}
            <span className={A}>perform worse than workers who use no AI at all</span>, making human domain
            judgment essential.
          </p>
        </div>
      </Slide>

      {/* Protecting the Apprenticeship Ladder and Tacit Knowledge */}
      <Slide id="apprenticeship-ladder" border align="left">
        <Head1>Protecting the Apprenticeship Ladder and Tacit Knowledge</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          <span className={T}>Tacit knowledge</span> is the deep practical judgment acquired through
          hands-on experience, error correction, and mentorship that cannot be reduced to written
          instructions.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Professional fields such as law, accounting, engineering, and management consulting have
              historically trained novices by assigning them routine drafting, research, and verification
              tasks.
            </p>
            <p className={BODY}>
              If a firm automates 80 percent of entry-level analytical work and sharply cuts junior hiring,
              it risks <span className={A}>severing the apprenticeship ladder</span> that produces future
              senior leaders.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            Junior employees who only review polished AI drafts without ever building a financial model or
            contract from scratch struggle to detect subtle errors when the model fails.
          </p>
        </div>
        <Verdict>
          Sustainable workforce design preserves structured deliberate practice, simulation exercises, and
          code or document walkthroughs so early-career workers still build foundational expertise.
        </Verdict>
      </Slide>

      {/* Discussion: Redesigning the Junior Analyst Role at an Accounting Firm */}
      <Slide id="discussion-junior-analyst" border align="left">
        <Head1>Discussion: Redesigning the Junior Analyst Role at an Accounting Firm</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A mid-sized accounting and advisory firm deploys a
          generative AI system that extracts figures from client financial statements and drafts initial
          audit memos, reducing junior associate hours on these tasks by 60 percent. Senior partners propose
          cutting entry-level campus hiring by half next year to boost short-term profit per partner. What
          risks does this proposal pose to the firm&apos;s senior talent pipeline over a five-year horizon,
          and how should the firm redesign junior associate responsibilities, training, and client
          engagement instead?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="Auditing HR Algorithms for Disparate Impact"
        lines={[
          "Because employment algorithms influence who is interviewed, hired, and promoted, they are subject to civil rights statutes and emerging algorithmic accountability laws.",
          "Human resources leaders must understand how historical inequities enter training data and how to audit selection tools quantitatively before and after deployment.",
        ]}
      />

      {/* How Historical Bias Enters Hiring Models */}
      <Slide id="historical-bias" border align="left">
        <Head1>How Historical Bias Enters Hiring Models</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            A supervised hiring algorithm learns patterns from whatever historical dataset it is given,
            treating past organizational decisions as the definition of a good candidate.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            In a widely studied industry case, a large technology company trained an experimental
            resume-scoring model on ten years of resumes submitted to the firm.
          </p>
        </div>
        <div className={FIG}>
          <BiasLoop />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Because the historical applicant pool in technical roles was predominantly male, the model
            learned to downgrade resumes that included the word &quot;women&apos;s&quot; or listed all-women
            colleges.
          </p>
          <p className={BODY}>
            Removing explicit demographic fields such as gender, race, or age from the input table{" "}
            <span className={A}>does not prevent bias</span> when correlated proxy variables remain in the
            text.
          </p>
          <p className={BODY}>
            Extracurricular organizations, zip codes, universities attended, and career breaks for
            caregiving can all reconstruct protected group membership inside a high-dimensional model.
          </p>
        </div>
      </Slide>

      {/* Adverse Impact and the Four-Fifths Rule */}
      <Slide id="four-fifths" border align="left" exercise={exercise["four-fifths"]}>
        <Head1>Adverse Impact and the Four-Fifths Rule</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              Employment regulators evaluate whether a screening test or algorithm produces disparate impact
              by comparing selection rates across demographic groups.
            </p>
            <p className={BODY}>
              The <span className={T}>selection rate</span> (or pass-through rate) for a group is the number
              of applicants selected divided by the total number of applicants from that group who were
              evaluated.
            </p>
            <p className={BODY}>
              Under the Uniform Guidelines on Employee Selection Procedures in the United States, a widely
              used benchmark for detecting adverse impact is the{" "}
              <span className={T}>four-fifths (80 percent) rule</span>.
            </p>
            <p className={SUB}>
              Adverse impact is indicated if the selection rate for any protected race, sex, or ethnic group
              is <span className={A}>less than 80 percent (four-fifths) of the rate</span> for the group with
              the highest selection rate.
            </p>
          </div>
          <FourFifthsLab />
        </div>
        <p className={`${LEAD} mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          For example, if an automated assessment passes 40 percent of male applicants (40 / 100), the
          four-fifths threshold is 0.80 × 40% = 32%, so a 25 percent pass rate for female applicants
          triggers a legal and statistical audit.
        </p>
      </Slide>

      {/* Job Relatedness, Validation, and Municipal AI Audit Laws */}
      <Slide id="audit-laws" border align="left">
        <Head1>Job Relatedness, Validation, and Municipal AI Audit Laws</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            When a selection procedure violates the four-fifths rule or shows statistically significant
            disparities, it is unlawful unless the employer proves it is{" "}
            <span className={T}>job-related and consistent with business necessity</span>.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Even if a test is job-related, the employer must adopt an alternative selection method with less
            adverse impact if a comparably valid alternative is available.
          </p>
        </div>
        <p className={`${LEAD} mt-12 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-8`}>
          Jurisdictions have begun enacting mandatory transparency and audit statutes specifically targeting{" "}
          <span className={A}>automated employment decision tools (AEDTs)</span>.
        </p>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>New York City Local Law 144</span> requires employers using automated hiring
            or promotion tools to commission an independent annual bias audit, publish summary selection
            ratios publicly, and notify candidates in advance.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Under the <span className={T}>European Union AI Act</span>, AI systems used for recruitment,
            application filtering, task allocation, and performance evaluation are classified as high-risk
            systems subject to strict conformity, documentation, and human-oversight obligations.
          </p>
        </div>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Employee Surveillance, Trust, and Change Management"
        lines={[
          "Technical accuracy and legal compliance are necessary but not sufficient for successful AI adoption inside an organization.",
          "How management governs workplace data collection, psychological safety, and employee participation determines whether AI tools are trusted and used effectively.",
        ]}
      />

      {/* Algorithmic Management and Workplace Surveillance Boundaries */}
      <Slide id="surveillance-boundaries" border align="left" exercise={exercise["surveillance-boundaries"]}>
        <Head1>Algorithmic Management and Workplace Surveillance Boundaries</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Algorithmic management</span> refers to the use of software algorithms to
            allocate tasks, pace workflows, monitor worker activity, and evaluate performance with minimal
            human intermediation.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            While common in gig-economy dispatch and warehouse fulfillment, algorithmic monitoring has
            expanded into remote and office knowledge work through productivity-tracking software.
          </p>
        </div>
        <div className={FIG}>
          <SurveillanceSpectrum />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Invasive individual surveillance, such as keystroke logging, mouse-movement tracking, continuous
            webcam snapshots, and private message scanning, erodes employee trust and increases turnover.
          </p>
          <p className={BODY}>
            Such monitoring also fails as a productivity measure because of{" "}
            <span className={T}>Goodhart&apos;s Law</span>: when a narrow activity proxy becomes a
            performance target, it ceases to be a valid measure of actual output.
          </p>
          <p className={BODY}>
            Effective people analytics establishes{" "}
            <span className={A}>clear governance boundaries</span>: collecting aggregated, anonymized
            workflow telemetry to remove process bottlenecks while prohibiting covert individual
            surveillance.
          </p>
        </div>
      </Slide>

      {/* Psychological Safety and the Threat of Shadow AI */}
      <Slide id="shadow-ai" border align="left">
        <Head1>Psychological Safety and the Threat of Shadow AI</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          When employees believe that adopting an AI tool will be used to justify layoffs or punitive quota
          increases, they either resist the tool or conceal how they use it.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Shadow AI</span> occurs when workers bypass corporate IT controls and
              paste company documents, client records, or source code into unauthorized consumer AI
              accounts.
            </p>
            <p className={BODY}>
              Surveys across industries consistently find that a large share of workplace AI usage occurs on
              personal accounts without enterprise data-privacy protections, creating severe confidentiality
              and compliance leaks.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            Banning generative AI outright rarely stops shadow usage, and instead drives experimentation
            underground where security teams cannot audit or guide it.
          </p>
        </div>
        <Verdict>
          Organizations reduce shadow AI by providing{" "}
          <span className={A}>approved enterprise tools</span> with contractual zero-data-retention
          guarantees and by assuring workers that efficiency gains will not be punished.
        </Verdict>
      </Slide>

      {/* Change Management and Participatory AI Adoption */}
      <Slide id="participatory-adoption" border align="left">
        <Head1>Change Management and Participatory AI Adoption</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Many enterprise AI initiatives succeed in technical proof-of-concept testing but fail to generate
            return on investment because employees abandon the tools in daily work.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Top-down rollouts often fail because executives select tools without understanding where
            frontline workers actually experience friction or where noisy AI drafts create extra editing
            burden.
          </p>
        </div>
        <div className={FIG}>
          <AdoptionRoadmap />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Participatory AI adoption</span> involves frontline workers early in
            selecting target tasks, testing pilot tools against real edge cases, and defining human override
            procedures.
          </p>
          <p className={BODY}>
            Successful deployment pairs tool access with hands-on training in prompt formulation, output
            verification, and error reporting.
          </p>
          <p className={BODY}>
            When organizations <span className={A}>share the gains of automation</span> through reduced
            drudgery, skill development, and career progression, employees become active partners in
            continuous workflow improvement.
          </p>
        </div>
      </Slide>

      {/* Discussion: Governing an AI Productivity and Promotion Dashboard */}
      <Slide id="discussion-dashboard" border align="left">
        <Head1>Discussion: Governing an AI Productivity and Promotion Dashboard</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A professional services firm proposes deploying an AI
          workforce platform that ingests employee email response times, calendar hours, internal chat
          sentiment, and document edits to compute a monthly &quot;Contribution and Flight-Risk Score&quot;
          for every staff member. Executive leadership wants HR to use this score to select the bottom 5
          percent of employees for annual layoffs and to allocate retention bonuses. Evaluate this proposal
          across construct validity, legal and ethical surveillance boundaries, and Goodhart&apos;s Law, and
          propose a responsible alternative design.
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <ol className="mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 md:grid-cols-2">
          {[
            "People analytics operates on small samples, long time horizons, and subjective performance labels, requiring careful attention to construct validity before training predictive models.",
            "In talent acquisition, semantic skill taxonomies and structured interview rubrics improve candidate matching, whereas automated facial or vocal emotion scoring lacks validity and introduces bias.",
            "Workforce analytics creates value when attrition predictions, internal talent marketplaces, and organizational network analysis are used to improve retention, reskilling, and workload balance rather than to penalize individuals.",
            "Jobs are bundles of tasks: automating routine subtasks frees capacity while augmenting complex tasks narrows the productivity gap between novices and experts, provided firms protect the junior apprenticeship ladder.",
            "Hiring and promotion algorithms trained on historical decisions can replicate demographic inequities through proxy variables, requiring regular adverse-impact audits under the four-fifths rule and municipal AI laws.",
            "Sustainable AI adoption requires clear boundaries against invasive employee surveillance, approved enterprise tools that prevent shadow AI data leaks, and participatory change management that builds worker trust.",
          ].map((line, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] border-b border-[var(--ink)]/10 py-4">
              <span aria-hidden className={`${MICRO} pt-1 text-[var(--ink-3)]`}>
                {i + 1}
              </span>
              <p className="font-sans text-base leading-[1.55] text-[var(--ink)] md:text-[1.0625rem]">
                {line}
              </p>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
