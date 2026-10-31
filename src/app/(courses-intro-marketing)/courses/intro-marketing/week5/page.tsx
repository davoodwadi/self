"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Big,
  Lead,
  Numbered,
  P,
  PartHead,
  Plate,
  Prompt,
  Ruled,
  SlideHeading,
  Statement,
  Term,
  TIGHT,
  Tint,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  CrmCycle,
  FourStepProcess,
  SecondaryVsPrimary,
  SyntheticVsHumanSurvey,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 5: MARKETING RESEARCH AND DATA ANALYTICS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week5() {
  return (
    <SlideDeck label="Week 5">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 5
          </p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">Marketing Research and Data Analytics</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Marketing research and data analytics reduce uncertainty in
              managerial decisions by{" "}
              <Tint>systematically collecting and interpreting secondary and primary evidence</Tint>,
              while verifying outputs from AI research assistants and
              synthetic respondents against real customer data.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Customer Insights and Evidence-Based Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customer-insights-and-evidence-based-marketing"
        border
      >
        <SlideHeading>
          Customer Insights and Evidence-Based Marketing
        </SlideHeading>
        <Statement>
          Marketing managers make decisions under uncertainty about how
          consumers will respond to new products, price changes, distribution
          shifts, and promotional campaigns.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Customer insights</Term> are fresh, actionable
              understandings of customers and the marketplace derived from
              marketing information that become the basis for creating customer
              value and relationships.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Raw sales figures or web traffic counts are merely data points:
              they become customer insights only when analysis reveals the
              underlying reason behind buyer behavior.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Organizations build a{" "}
              <Term>marketing information system (MIS)</Term> to assess
              information needs, develop the needed information, and help
              decision makers use it to generate customer insights.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Three Sources of Marketing Information
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="three-sources-of-marketing-information"
        border
      >
        <SlideHeading>Three Sources of Marketing Information</SlideHeading>
        <Lead>
          A company&apos;s marketing information system draws continuously on
          three complementary sources of evidence: internal data, marketing
          intelligence, and marketing research.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Internal databases</Term> are electronic collections of
              consumer and market information obtained from data sources within
              the company&apos;s own network, including accounting, operations,
              sales, and customer service records.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Competitive marketing intelligence</Term> is the systematic
              monitoring, collection, and analysis of publicly available
              information about consumers, competitors, and developments in the
              marketplace.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Marketing research</Term> is the systematic design,
              collection, analysis, and reporting of data relevant to a specific
              marketing situation facing an organization.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 1: The Four-Step Marketing Research Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-the-four-step-marketing-research-process"
        border
      >
        <PartHead n={1} title="The Four-Step Marketing Research Process" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Every marketing research project follows a structured four-step
            sequence: defining the problem and research objectives, developing
            the research plan, implementing the research plan, and interpreting
            and reporting the findings.
          </Statement>
          <Ruled>
            <Lead>
              Because every subsequent decision depends on the initial problem
              formulation, managers and researchers must collaborate closely
              from the first step to the final report.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Step 1: Defining the Problem and Research Objectives
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="step-1-defining-the-problem-and-research-objectives"
        border
        exercise={exercise["step-1-defining-the-problem-and-research-objectives"]}
      >
        <SlideHeading>
          Step 1: Defining the Problem and Research Objectives
        </SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Defining the problem and agreeing on research objectives is often
              the most difficult and consequential step in the research process.
            </Lead>
            <Ruled>
              <P>
                A manager may observe a symptom, such as a sudden drop in store
                traffic, without knowing the underlying cause, such as a
                competitor&apos;s promotion or a change in local transit routes.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Once the problem is defined precisely, the researcher sets one
                of three types of research objectives.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <FourStepProcess />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Exploratory research</Term> gathers preliminary information
              that helps define the problem and suggest hypotheses.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Descriptive research</Term> describes things such as the
              market potential for a product or the demographics and attitudes
              of consumers, while <Term>causal research</Term> tests hypotheses
              about cause-and-effect relationships.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Step 2: Developing the Research Plan
          ================================================================ */}
      <Slide className={TIGHT} id="step-2-developing-the-research-plan" border>
        <SlideHeading>Step 2: Developing the Research Plan</SlideHeading>
        <Statement>
          In the second step, the researcher determines the exact information
          needed, develops a plan for gathering it efficiently, and presents the
          written proposal to management.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              The <Term>research plan</Term> outlines sources of existing
              secondary data and specifies the primary research approaches,
              contact methods, sampling plans, and research instruments required
              to gather new data.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Before approving the plan, management evaluates whether the
              expected value of the insights in improving the decision exceeds
              the financial cost and time required to conduct the study.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              A study whose findings arrive after the launch deadline or cost
              more than the decision at stake is not economically justified.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Steps 3 and 4: Implementing the Plan and Reporting Findings
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="steps-3-and-4-implementing-the-plan-and-reporting-findings"
        border
      >
        <SlideHeading>
          Steps 3 and 4: Implementing the Plan and Reporting Findings
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              In Step 3, the researcher puts the marketing research plan into
              action by collecting, processing, and analyzing the information.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Data collection</Term> is normally the most expensive and
              error-prone phase of the project, requiring careful checks for
              respondent non-response, interviewer bias, and recording errors.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Data processing and analysis</Term> isolate important
              findings by tabulating results, computing summary statistics, and
              testing the research hypotheses.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              In Step 4, the researcher interprets the findings, draws
              conclusions, and reports them to management in plain
              decision-oriented language rather than technical statistical
              jargon alone.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Secondary Data Versus Primary Data
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-secondary-data-versus-primary-data"
        border
      >
        <PartHead n={2} title="Secondary Data Versus Primary Data" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Researchers usually begin by gathering secondary data before
            collecting any primary data.
          </Statement>
          <Ruled>
            <Lead>
              Distinguishing the two data types and evaluating their quality
              ensures that research budgets are spent only on questions that
              existing records cannot answer.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Secondary Data: Sources, Advantages, and Limitations
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="secondary-data-sources-advantages-and-limitations"
        border
        exercise={exercise["secondary-data-sources-advantages-and-limitations"]}
      >
        <SlideHeading>
          Secondary Data: Sources, Advantages, and Limitations
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Secondary data</Term> consist of information that already
              exists somewhere, having been collected previously for another
              purpose.
            </Lead>
            <Ruled>
              <P>
                Sources of secondary data include the company&apos;s internal
                database as well as external sources such as government census
                agencies, trade associations, commercial data syndicators, and
                academic publications.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Secondary data can generally be obtained much faster and at a
                fraction of the cost of primary data, and can provide
                industry-wide benchmarks that an individual firm could never
                collect alone.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <SecondaryVsPrimary />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              However, the specific information needed for a novel decision may
              not exist in secondary records, or existing data may be outdated,
              inaccurately collected, or defined in incompatible units.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Researchers must therefore evaluate all secondary data for
              relevance, accuracy, currency, and impartiality before relying on
              them.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Primary Data Collection: Observational, Survey, and Experimental Approaches
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="primary-data-collection-observational-survey-and-experimental-approaches"
        border
        exercise={
          exercise[
            "primary-data-collection-observational-survey-and-experimental-approaches"
          ]
        }
      >
        <SlideHeading>
          Primary Data Collection: Observational, Survey, and Experimental
          Approaches
        </SlideHeading>
        <Lead>
          <Term>Primary data</Term> consist of information collected for the
          specific purpose at hand, requiring the researcher to choose among
          three core research approaches: observation, surveys, and experiments.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Observational research</Term> gathers primary data by
              observing relevant people, actions, and situations, such as
              watching how shoppers navigate a grocery aisle or using
              ethnographic home visits to see how families prepare meals.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Survey research</Term> gathers primary data by asking people
              questions about their knowledge, attitudes, preferences, and
              buying behavior, making it the most widely used method for
              descriptive research.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Experimental research</Term> gathers primary data by
              selecting matched groups of subjects, giving them different
              treatments (such as two prices or two ad layouts), controlling
              unrelated factors, and checking for differences in group responses
              to establish cause and effect.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Sampling Plans and Research Instruments
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sampling-plans-and-research-instruments"
        border
        exercise={exercise["sampling-plans-and-research-instruments"]}
      >
        <SlideHeading>Sampling Plans and Research Instruments</SlideHeading>
        <Lead>
          Collecting primary data requires designing a{" "}
          <Term>sampling plan</Term> that specifies three decisions: the{" "}
          <Term>sampling unit</Term> (who is to be surveyed), the{" "}
          <Term>sample size</Term> (how many people should be included), and the{" "}
          <Term>sampling procedure</Term> (how respondents should be chosen).
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              A <Term>probability sample</Term> (such as a simple random sample
              or stratified random sample) gives every population member a known
              chance of selection and allows researchers to calculate confidence
              intervals and sampling error.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>non-probability sample</Term> (such as a convenience
              sample or quota sample) is faster and less expensive when
              probability sampling is impractical, though its margin of sampling
              error cannot be measured exactly.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Researchers collect primary data using two main instruments:{" "}
              <Term>questionnaires</Term> (containing closed-ended scale items
              or open-ended text questions) and{" "}
              <Term>mechanical or physiological devices</Term> (such as checkout
              scanners and eye-tracking cameras).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Selecting Research Objectives and Data Sources
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-selecting-research-objectives-and-data-sources"
        border
      >
        <SlideHeading kicker="Discussion:">
          Selecting Research Objectives and Data Sources
        </SlideHeading>
        <Prompt>
          A regional chain of forty fitness clubs notices that cancellations
          among members in their first ninety days have doubled over the past
          six months. Before designing a pricey new advertising campaign, how
          should the marketing director sequence exploratory, descriptive, and
          causal research, and which internal secondary records should the team
          inspect before fielding a primary survey?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Data Analytics, Big Data, and CRM
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-data-analytics-big-data-and-crm"
        border
      >
        <PartHead n={3} title="Data Analytics, Big Data, and CRM" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Digital transactions, mobile apps, connected products, and social
            media generate vast streams of behavioral data that traditional
            manual reporting cannot process.
          </Statement>
          <Ruled>
            <Lead>
              Marketing analytics and customer relationship management (CRM)
              transform these raw data streams into individualized customer
              value.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Big Data and the Role of Marketing Analytics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="big-data-and-the-role-of-marketing-analytics"
        border
        exercise={exercise["big-data-and-the-role-of-marketing-analytics"]}
      >
        <SlideHeading>
          Big Data and the Role of Marketing Analytics
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Big Data</Term> refers to the huge and complex data sets
              generated by today&apos;s sophisticated information generation,
              collection, storage, and analysis technologies.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The primary managerial challenge is not collecting more data, but
              sifting through overwhelming data volume to extract timely,
              relevant insights.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Marketing analytics</Term> consists of the analysis tools,
              technologies, and processes by which marketers dig out meaningful
              patterns in big data to gain customer insights and gauge marketing
              performance.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Organizations apply <Term>descriptive analytics</Term> to
              summarize past performance, <Term>predictive analytics</Term> to
              forecast future customer behavior (such as churn probability), and{" "}
              <Term>prescriptive analytics</Term> to optimize pricing and media
              allocation.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Customer Relationship Management (CRM) and Touchpoint Integration
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customer-relationship-management-crm-and-touchpoint-integration"
        border
      >
        <SlideHeading>
          Customer Relationship Management (CRM) and Touchpoint Integration
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Customer Relationship Management (CRM)</Term> in an
              analytics context involves managing detailed information about
              individual customers and carefully managing customer touchpoints
              to maximize customer loyalty.
            </Lead>
            <Ruled>
              <P>
                A <Term>customer touchpoint</Term> is any occasion on which a
                customer encounters the brand and product, from actual
                experience to personal or mass communications and casual
                observation.
              </P>
            </Ruled>
            <Ruled>
              <P>
                For a hotel guest, touchpoints include reservation websites,
                check-in desks, room cleanliness, room-service billing, and
                post-stay loyalty emails.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Modern CRM platforms integrate data from sales, customer
                support, website browsing, and payment systems so the
                organization recognizes the customer consistently across every
                channel.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <CrmCycle />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Marketing Research Ethics and Consumer Privacy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="marketing-research-ethics-and-consumer-privacy"
        border
      >
        <SlideHeading>
          Marketing Research Ethics and Consumer Privacy
        </SlideHeading>
        <Statement>
          As firms collect granular behavioral and location data, marketing
          research and analytics raise acute ethical responsibilities toward
          respondents and consumers.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Intrusiveness and privacy breaches occur when companies track
              consumers without informed consent or repurpose personal research
              responses for targeted sales pitches.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Soliciting sales under the guise of conducting marketing research
              is known as <Term>sugging</Term>, and raising funds under the
              guise of research is known as <Term>frugging</Term>: both
              practices violate professional research codes and erode public
              cooperation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Ethical research</Term> requires obtaining informed consent,
              anonymizing respondent identities, securing stored records, and
              reporting methodological limitations honestly to clients.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Artificial Intelligence in Marketing Research
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-artificial-intelligence-in-marketing-research"
        border
      >
        <PartHead n={4} title="Artificial Intelligence in Marketing Research" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Artificial intelligence now assists marketers across desk research,
            qualitative coding, questionnaire drafting, and early-stage survey
            pretesting.
          </Statement>
          <Ruled>
            <Lead>
              Understanding how AI tools generate outputs explains why
              verification against primary human evidence remains mandatory.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          AI-Assisted Secondary Research and Qualitative Analysis
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="ai-assisted-secondary-research-and-qualitative-analysis"
        border
      >
        <SlideHeading>
          AI-Assisted Secondary Research and Qualitative Analysis
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              In secondary research, large language models can rapidly search,
              summarize, and cross-reference hundreds of industry reports,
              earnings transcripts, and regulatory filings.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In qualitative and survey analysis, AI tools can transcribe
              interviews, translate open-ended responses across languages, and
              classify thousands of customer comments into recurring themes.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, generative AI models can also fabricate non-existent
              citations, invent plausible-looking market statistics, or omit
              crucial sample caveats from a source document.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Every numerical claim or reference produced by an AI research
              assistant must therefore be verified directly against the original
              source document before being included in a management report.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Synthetic Survey Respondents in Early-Stage Research
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="synthetic-survey-respondents-in-early-stage-research"
        border
        exercise={
          exercise["synthetic-survey-respondents-in-early-stage-research"]
        }
      >
        <SlideHeading>
          Synthetic Survey Respondents in Early-Stage Research
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Researchers increasingly experiment with asking large language
              models to complete marketing questionnaires as if they were
              consumers with specific demographic profiles, producing what are
              called <Term>synthetic responses</Term>.
            </Lead>
            <Ruled>
              <P>
                Synthetic responses can be generated in minutes at minimal cost,
                allowing researchers to test whether survey questions are clear
                and whether scales capture variation before paying for a human
                panel.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <SyntheticVsHumanSurvey />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Empirical studies show that language models can reproduce
              directional patterns observed in real consumer data, such as
              downward-sloping demand curves and trade-offs between price and
              brand quality (Brand, Israeli, &amp; Ngwe, 2023).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Synthetic pretesting</Term> is therefore valuable for
              refining questionnaire wording, spotting ambiguous response
              options, and generating initial hypotheses for subsequent primary
              studies.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Methodological Limits of Synthetic Respondents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="methodological-limits-of-synthetic-respondents"
        border
      >
        <SlideHeading>
          Methodological Limits of Synthetic Respondents
        </SlideHeading>
        <Lead>
          Despite their speed, synthetic responses have fundamental
          methodological limits that prevent them from replacing primary
          research on real consumers.
        </Lead>
        <ol className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              First, language models generate answers probabilistically: the
              exact same model asked the identical survey question across
              repeated independent runs can give different responses (Wadi &amp;
              Fredette, 2025).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Second, language models reflect patterns in their historical
              training text rather than lived physical experience, so they
              cannot taste a new beverage formulation or feel the fabric of a
              garment.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Third, synthetic responses can under-represent minority or
              emerging consumer segments and conform to subtle framing cues in
              the researcher&apos;s prompt.
            </P>
          </Numbered>
        </ol>
        <Ruled className="mt-6">
          <Statement>
            Consequential decisions about real customers therefore still require
            primary empirical data collected from real human respondents.
          </Statement>
        </Ruled>
      </Slide>

      {/* ================================================================
          Part 5: Researching How AI Shopping Agents Behave
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-researching-how-ai-shopping-agents-behave"
        border
      >
        <PartHead n={5} title="Researching How AI Shopping Agents Behave" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Beyond using AI as a research tool, marketers now face a new subject
            of marketing research: the AI shopping agents that search and buy on
            consumers&apos; behalf.
          </Statement>
          <Ruled>
            <Lead>
              Auditing and experimenting on AI agents allows brands to
              understand how automated intermediaries evaluate their offerings.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The AI Shopping Agent as a Subject of Marketing Research
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-ai-shopping-agent-as-a-subject-of-marketing-research"
        border
      >
        <SlideHeading>
          The AI Shopping Agent as a Subject of Marketing Research
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              When consumers delegate product search and comparison to AI
              assistants, the assistant acts as a <Term>gatekeeper</Term> that
              filters the market before the human buyer sees a shortlist.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Traditional consumer surveys ask human shoppers how they perceive
              a brand, but they do not reveal how an AI shopping agent parses
              the brand&apos;s online catalog or product page.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketing research must therefore expand its{" "}
              <Term>unit of observation</Term> to study both human consumers and
              the AI agents that shop for them.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Researchers examine which product attributes AI agents inspect,
              how agents weight price against ratings, and whether page layout
              or sponsorship labels alter agent recommendations.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Descriptive Audits and Controlled Experiments on AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="descriptive-audits-and-controlled-experiments-on-ai-agents"
        border
        exercise={
          exercise["descriptive-audits-and-controlled-experiments-on-ai-agents"]
        }
      >
        <SlideHeading>
          Descriptive Audits and Controlled Experiments on AI Agents
        </SlideHeading>
        <Lead>
          Researchers study AI shopping agents using the same descriptive and
          causal designs applied in consumer research.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              In a <Term>descriptive audit</Term>, researchers submit hundreds
              of standardized shopping prompts to major AI assistants and record
              how frequently each brand is recommended and in what rank
              position.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In a <Term>controlled experiment</Term>, researchers hold the
              product catalog constant while manipulating one variable at a
              time, such as whether unit prices are visible on the main search
              page or require an extra click to view (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Because a single model run can vary probabilistically, researchers
              repeat each experimental prompt across multiple independent
              sessions to estimate agent behavior reliably (Wadi &amp; Fredette,
              2025).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Designing Actionable Reports from Human and Agent Evidence
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="designing-actionable-reports-from-human-and-agent-evidence"
        border
      >
        <SlideHeading>
          Designing Actionable Reports from Human and Agent Evidence
        </SlideHeading>
        <Statement>
          A research study creates value only when its findings are translated
          into clear managerial decisions across the marketing mix.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              When reporting research that combines human consumer studies and
              AI agent audits, analysts separate{" "}
              <Term>behavioral insights</Term> about end-user satisfaction from{" "}
              <Term>technical insights</Term> about catalog discoverability.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Researchers also document every stage where AI tools were used in
              literature review, coding, or pretesting so decision makers can
              evaluate the strength of the underlying evidence.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Grounding strategic recommendations in verified primary evidence
              protects the firm from acting on unverified assumptions or model
              hallucinations.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Evaluating a Proposal to Replace Human Surveys with Synthetic Personas
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-evaluating-a-proposal-to-replace-human-surveys-with-synthetic-personas"
        border
      >
        <SlideHeading kicker="Discussion:">
          Evaluating a Proposal to Replace Human Surveys with Synthetic Personas
        </SlideHeading>
        <Prompt>
          A consumer packaged goods manager proposes cancelling a planned
          40,000-dollar primary consumer concept test for a new functional
          beverage and replacing it entirely with 1,000 synthetic survey
          responses generated by a large language model in one afternoon.
          Drawing on primary versus secondary data principles, Brand, Israeli,
          and Ngwe (2023), and Wadi and Fredette (2025), explain which parts of
          the research workflow the AI personas can legitimately support and why
          final launch decisions still require human respondents.
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Numbered n={1}>
            <P>
              Customer insights are actionable understandings of buyers and
              markets generated by a firm&apos;s marketing information system
              across internal data, competitive marketing intelligence, and
              marketing research.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The marketing research process follows four steps: defining the
              problem and research objectives (exploratory, descriptive, or
              causal), developing the research plan, implementing data
              collection and analysis, and interpreting and reporting findings.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Secondary data (already collected for another purpose) provide
              rapid, low-cost context but must be checked for relevance,
              accuracy, currency, and impartiality before collecting primary
              data.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Primary data collection combines research approaches (observation,
              surveys, and experiments), sampling plans (probability and
              non-probability samples), and research instruments (questionnaires
              and mechanical devices).
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Marketing analytics and CRM systems integrate big data across
              customer touchpoints to uncover behavioral patterns and build
              long-term loyalty while respecting consumer privacy and research
              ethics.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              AI accelerates secondary literature reviews and survey pretesting
              through synthetic responses (Brand, Israeli, &amp; Ngwe, 2023),
              but fabricated citations and response variability across runs
              (Wadi &amp; Fredette, 2025) require human verification and primary
              data from real buyers.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}

