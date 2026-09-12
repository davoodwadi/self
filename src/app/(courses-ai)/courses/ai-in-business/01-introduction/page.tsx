"use client";

import {
  Callout,
  DiscussionCard,
  Heading,
  Slide,
  SlideDeck,
  Subtitle,
  Title,
} from "@/app/(courses-ai)/_components/SlideComponents";
import {
  BigStatement,
  ConceptRings,
  Eyebrow,
  Flywheel,
  Lead,
  ModuleMark,
  NumberedCards,
  RevealGrid,
  RoadmapRail,
  ScrollProgress,
  SlideHead,
  SortingBoard,
  SplitCompare,
  StakesDial,
  StepTimeline,
} from "@/app/(courses-ai)/_components/Interactive";
import { createCourseQuizLookup, type CourseQuiz } from "@/lib/course-quiz";
import quizzes from "./quizzes.json";

// Knowledge checks render immediately BEFORE the slide they are attached to,
// so each quiz below only tests material from slides the student has passed.
const quiz = createCourseQuizLookup(quizzes as CourseQuiz[]);

export default function Week01Introduction() {
  return (
    <SlideDeck>
      <ScrollProgress label="Week 01" />

      {/* ==================================================================
          TITLE
      ================================================================== */}
      <Slide id="title" align="left">
        <Eyebrow>Week 01: Course Overview and Foundations</Eyebrow>

        <Title className="mt-8">Applications of AI in Business</Title>

        <Subtitle variant="hero" className="mt-3">
          Understanding how modern intelligent systems create value, change
          decisions, and require human leadership
        </Subtitle>

        <div className="mt-10 flex w-full items-baseline justify-between border-t border-[var(--charcoal)]/12 pt-6">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--champagne)]">
            Davood Wadi, PhD
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[var(--charcoal-light)]/70">
            BUSI 654
          </span>
        </div>
      </Slide>

      {/* ==================================================================
          WHY LEADERS MUST UNDERSTAND AI
      ================================================================== */}
      <Slide id="why-leaders" border align="left">
        <SlideHead>
          <Heading>Why Business Leaders Must Understand AI</Heading>
        </SlideHead>

        <Lead className="mt-8">
          Artificial intelligence has moved from research labs into core
          business operations.
        </Lead>
        <Lead className="mt-4">
          Modern companies process massive volumes of customer, transaction, and
          operational data every second.
        </Lead>

        <SplitCompare
          className="mt-10"
          left={{
            label: "Leaders do not need",
            points: ["Leaders do not need to write raw code."],
          }}
          right={{
            label: "Leaders do need",
            points: [
              "Leaders do need to understand what AI can and cannot do well.",
            ],
          }}
        />

        <Callout className="mt-10 max-w-3xl">
          The primary strategic goal is knowing which business decisions can be
          improved with machine assistance.
        </Callout>
      </Slide>

      {/* ==================================================================
          BUSINESS AS A SERIES OF DECISIONS   [quiz]
      ================================================================== */}
      <Slide
        id="business-decisions"
        border
        align="left"
        quizData={quiz["business-decisions"]}
      >
        <SlideHead>
          <Heading>Business as a Series of Decisions</Heading>
        </SlideHead>

        <Lead className="mt-8">
          Every business runs on repeated decisions made under uncertainty.
        </Lead>

        <RevealGrid
          className="mt-10"
          openFirst
          items={[
            {
              label: "Marketers",
              text: "Marketers choose which audience to target and which message to show.",
            },
            {
              label: "Financial managers",
              text: "Financial managers decide which loans to approve and which transactions to review for fraud.",
            },
            {
              label: "Supply chain teams",
              text: "Supply chain teams estimate how much inventory to order and when to replenish stock.",
            },
          ]}
        />

        <BigStatement className="mt-10">
          AI creates business value by improving the speed, accuracy, and
          consistency of these operational choices.
        </BigStatement>
      </Slide>

      {/* ==================================================================
          MODULE I
      ================================================================== */}
      <Slide id="module-1" border>
        <ModuleMark label="Module" numeral="I" />

        <Heading className="mt-6">What Is Artificial Intelligence?</Heading>

        <Subtitle variant="hero" className="mt-6">
          This section defines the core ideas behind artificial intelligence in
          simple terms.
        </Subtitle>
        <Subtitle variant="hero" className="mt-4">
          We will look at the differences between artificial intelligence,
          machine learning, and deep learning.
        </Subtitle>
      </Slide>

      {/* ==================================================================
          DEFINING AI
      ================================================================== */}
      <Slide id="defining-ai" border align="left">
        <SlideHead>
          <Heading>Defining Artificial Intelligence</Heading>
        </SlideHead>

        <Lead className="mt-8">
          Artificial intelligence refers to computer systems designed to perform
          tasks that once required human intelligence.
        </Lead>
        <Lead className="mt-4">
          These tasks include recognizing patterns, understanding text, making
          forecasts, and solving problems.
        </Lead>

        <SplitCompare
          className="mt-10"
          left={{
            label: "Traditional software",
            points: [
              "Traditional software follows rigid rules written directly by human programmers.",
            ],
          }}
          right={{
            label: "Modern AI systems",
            points: [
              "Modern AI systems learn patterns directly from historical data.",
            ],
          }}
        />
      </Slide>

      {/* ==================================================================
          AI / ML / DL   [quiz]
      ================================================================== */}
      <Slide id="ai-ml-dl" border align="left" quizData={quiz["ai-ml-dl"]}>
        <SlideHead>
          <Heading>
            Artificial Intelligence, Machine Learning, and Deep Learning
          </Heading>
        </SlideHead>

        <ConceptRings
          className="mt-10"
          layers={[
            {
              label: "Artificial Intelligence",
              text: "Artificial intelligence is the broad umbrella term for all intelligent computer behavior.",
            },
            {
              label: "Machine Learning",
              text: "Machine learning is a specific subfield of AI where algorithms find patterns in data on their own.",
            },
            {
              label: "Deep Learning",
              text: "Deep learning is a specialized branch of machine learning based on multi-layered neural networks.",
            },
          ]}
        />

        <Callout className="mt-10 max-w-3xl" title="Why It Matters">
          Deep learning works exceptionally well on complex data such as images,
          audio, and free-form text.
        </Callout>
      </Slide>

      {/* ==================================================================
          PREDICTIVE VS GENERATIVE   [quiz]
      ================================================================== */}
      <Slide
        id="predictive-generative"
        border
        align="left"
        quizData={quiz["predictive-generative"]}
      >
        <SlideHead>
          <Heading>Predictive AI Versus Generative AI</Heading>
        </SlideHead>

        <SplitCompare
          className="mt-10"
          left={{
            label: "Predictive AI",
            points: [
              "Predictive AI analyzes past data to forecast future events, estimate numbers, or classify items into categories.",
              "Common predictive examples include credit risk scoring, fraud detection, and customer churn forecasting.",
            ],
          }}
          right={{
            label: "Generative AI",
            points: [
              "Generative AI creates new content such as text, images, audio, or computer code based on learned patterns.",
            ],
          }}
        />

        <BigStatement className="mt-10">
          Most business value comes from combining predictive analysis with
          generative capabilities.
        </BigStatement>
      </Slide>

      {/* ==================================================================
          CHATBOTS TO AGENTS
      ================================================================== */}
      <Slide id="chatbots-to-agents" border align="left">
        <SlideHead>
          <Heading>From Chatbots to Autonomous Agents</Heading>
        </SlideHead>

        <StepTimeline
          className="mt-10"
          steps={[
            {
              label: "Chatbots",
              text: "Early AI assistants acted like simple conversational chatbots that answered one prompt at a time.",
            },
            {
              label: "Agentic AI",
              text: "The latest frontier is agentic AI, where systems can pursue multi-step goals with minimal human supervision.",
            },
            {
              label: "An AI agent",
              text: "An AI agent can plan steps, query databases, use software tools, and review its own output for errors.",
            },
            {
              label: "Autonomous execution",
              text: "Autonomous execution increases operating speed, but it also demands clear safety boundaries.",
            },
          ]}
        />

        <DiscussionCard title="Discussion" className="mt-10 max-w-3xl">
          Think of a multi-step task you do regularly. What risks might arise if
          an autonomous software agent did that task without your supervision?
        </DiscussionCard>
      </Slide>

      {/* ==================================================================
          MODULE II
      ================================================================== */}
      <Slide id="module-2" border>
        <ModuleMark label="Module" numeral="II" />

        <Heading className="mt-6">The Economics of Prediction</Heading>

        <Subtitle variant="hero" className="mt-6">
          This section explains how artificial intelligence affects business
          economics and operational costs.
        </Subtitle>
        <Subtitle variant="hero" className="mt-4">
          We examine how falling prediction costs change the value of human
          judgment.
        </Subtitle>
      </Slide>

      {/* ==================================================================
          COST OF PREDICTION
      ================================================================== */}
      <Slide id="cost-of-prediction" border align="left">
        <SlideHead>
          <Heading>The Cost of Prediction Drops to Zero</Heading>
        </SlideHead>

        <Lead className="mt-8">
          In economics, technological breakthroughs often make a specific,
          valuable input cheap and abundant.
        </Lead>

        <StepTimeline
          className="mt-10"
          steps={[
            { label: "Computers", text: "Computers made arithmetic cheap." },
            {
              label: "The internet",
              text: "The internet made information distribution cheap.",
            },
            {
              label: "Machine learning",
              text: "Modern machine learning makes prediction cheap and accessible across every industry.",
            },
          ]}
        />

        <BigStatement className="mt-10">
          When prediction becomes cheap, companies start applying it to problems
          that were never treated as prediction tasks before.
        </BigStatement>
      </Slide>

      {/* ==================================================================
          PREDICTION VS JUDGMENT   [quiz]
      ================================================================== */}
      <Slide
        id="prediction-judgment"
        border
        align="left"
        quizData={quiz["prediction-judgment"]}
      >
        <SlideHead>
          <Heading>Prediction Versus Judgment</Heading>
        </SlideHead>

        <SplitCompare
          className="mt-10"
          left={{
            label: "Prediction",
            points: [
              "A prediction is an estimate of what is likely to happen when information is incomplete.",
            ],
          }}
          right={{
            label: "Judgment",
            points: [
              "A judgment is an evaluation of what outcome matters most, what is fair, and what risk is acceptable.",
            ],
          }}
        />

        <Callout
          className="mt-10 max-w-3xl"
          variant="secondary"
          title="The Limit"
        >
          Machines handle prediction at scale, but they do not possess moral
          principles, business ethics, or context.
        </Callout>

        <BigStatement className="mt-10">
          As machine prediction becomes cheaper and faster, the economic value of
          human judgment goes up.
        </BigStatement>
      </Slide>

      {/* ==================================================================
          THREE SOURCES OF VALUE
      ================================================================== */}
      <Slide id="three-sources-of-value" border align="left">
        <SlideHead>
          <Heading>The Three Sources of Business Value</Heading>
        </SlideHead>

        <RevealGrid
          className="mt-10"
          openFirst
          items={[
            {
              label: "Cost reduction",
              text: "Cost reduction comes from automating repetitive tasks in document processing, customer intake, and reporting.",
            },
            {
              label: "Revenue growth",
              text: "Revenue growth comes from better recommendations, personalized pricing, and faster product discovery.",
            },
            {
              label: "Risk management",
              text: "Risk management comes from catching fraud early, forecasting cash shortfalls, and monitoring compliance gaps.",
            },
          ]}
        />

        <Callout className="mt-10 max-w-3xl">
          Successful firms target all three areas instead of focusing on
          headcount reduction alone.
        </Callout>
      </Slide>

      {/* ==================================================================
          FALLACY OF PLUG AND PLAY
      ================================================================== */}
      <Slide id="plug-and-play" border align="left">
        <SlideHead>
          <Heading>The Fallacy of Plug and Play</Heading>
        </SlideHead>

        <BigStatement className="mt-10">
          Buying an off-the-shelf AI tool does not guarantee a lasting
          competitive edge.
        </BigStatement>

        <SplitCompare
          className="mt-10"
          left={{
            label: "Public models and subscriptions",
            points: [
              "Anyone can purchase the same public models and software subscriptions.",
            ],
          }}
          right={{
            label: "Unique workflows and proprietary data",
            points: [
              "Real business advantage comes from connecting AI directly to unique business workflows and high-quality proprietary data.",
            ],
          }}
        />

        <DiscussionCard title="Discussion" className="mt-10 max-w-3xl">
          If every firm in your industry uses the same commercial AI models,
          where will your competitive advantage come from?
        </DiscussionCard>
      </Slide>

      {/* ==================================================================
          MODULE III
      ================================================================== */}
      <Slide id="module-3" border>
        <ModuleMark label="Module" numeral="III" />

        <Heading className="mt-6">How Companies Apply AI</Heading>

        <Subtitle variant="hero" className="mt-6">
          This section maps the main ways companies deploy machine learning
          across business units.
        </Subtitle>
        <Subtitle variant="hero" className="mt-4">
          We divide applications into customer-facing front office tasks and
          internal back office workflows.
        </Subtitle>
      </Slide>

      {/* ==================================================================
          FRONT OFFICE   [quiz]
      ================================================================== */}
      <Slide
        id="front-office"
        border
        align="left"
        quizData={quiz["front-office"]}
      >
        <SlideHead>
          <Heading>Front-Office Applications: Customer Engagement</Heading>
        </SlideHead>

        <RevealGrid
          className="mt-10"
          openFirst
          items={[
            {
              label: "Customer service teams",
              text: "Customer service teams use AI to answer common questions and route complex issues to human agents.",
            },
            {
              label: "Marketing teams",
              text: "Marketing teams use machine learning to segment audiences and personalize promotional messages.",
            },
            {
              label: "E-commerce platforms",
              text: "E-commerce platforms use recommendation engines to suggest products that match individual shopper interests.",
            },
          ]}
        />

        <Callout className="mt-10 max-w-3xl" title="The Goal">
          The goal is reducing customer friction while maintaining a consistent
          and trustworthy brand image.
        </Callout>
      </Slide>

      {/* ==================================================================
          BACK OFFICE
      ================================================================== */}
      <Slide id="back-office" border align="left">
        <SlideHead>
          <Heading>Back-Office Applications: Operations and Finance</Heading>
        </SlideHead>

        <RevealGrid
          className="mt-10"
          openFirst
          items={[
            {
              label: "Operations teams",
              text: "Operations teams use predictive models to forecast demand, prevent factory breakdowns, and plan delivery routes.",
            },
            {
              label: "Finance teams",
              text: "Finance teams use machine learning to score loan applications, detect fraudulent charges, and reconcile records.",
            },
            {
              label: "Human resources teams",
              text: "Human resources teams use AI to draft job descriptions, sort resumes, and match employees with training programs.",
            },
          ]}
        />

        <BigStatement className="mt-10">
          Back-office automation cuts operating costs and speeds up internal
          workflows.
        </BigStatement>
      </Slide>

      {/* ==================================================================
          HUMAN IN THE LOOP   [quiz]
      ================================================================== */}
      <Slide
        id="human-in-the-loop"
        border
        align="left"
        quizData={quiz["human-in-the-loop"]}
      >
        <SlideHead>
          <Heading>Human in the Loop Versus Full Autonomy</Heading>
        </SlideHead>

        <SplitCompare
          className="mt-10"
          left={{
            label: "Full autonomy",
            points: [
              "Full autonomy means the computer makes the decision and takes action without waiting for human approval.",
            ],
          }}
          right={{
            label: "Human-in-the-loop",
            points: [
              "Human-in-the-loop means a person must review and approve the machine recommendation before it takes effect.",
            ],
          }}
        />

        <StakesDial
          className="mt-10 max-w-4xl"
          axis={{ low: "Low cost of error", high: "High cost of error" }}
          low={{
            label: "Automate safely",
            text: "Low-stakes decisions with low cost of error can be automated safely, such as product recommendations.",
          }}
          high={{
            label: "Human sign-off",
            text: "High-stakes decisions that affect jobs, credit, health, or legal liability require human sign-off and review.",
          }}
        />

        <DiscussionCard title="Discussion" className="mt-10 max-w-3xl">
          In your view, which business decisions should always require human
          approval, even if an algorithm is 99 percent accurate?
        </DiscussionCard>
      </Slide>

      {/* ==================================================================
          MODULE IV
      ================================================================== */}
      <Slide id="module-4" border>
        <ModuleMark label="Module" numeral="IV" />

        <Heading className="mt-6">
          Data and the Machine Learning Pipeline
        </Heading>

        <Subtitle variant="hero" className="mt-6">
          This section covers the raw material of artificial intelligence:
          organizational data.
        </Subtitle>
        <Subtitle variant="hero" className="mt-4">
          We will look at how data is collected, cleaned, and used to
          continuously improve business models.
        </Subtitle>
      </Slide>

      {/* ==================================================================
          DATA IS THE RAW MATERIAL
      ================================================================== */}
      <Slide id="data-raw-material" border align="left">
        <SlideHead>
          <Heading>Data Is the Raw Material of AI</Heading>
        </SlideHead>

        <BigStatement className="mt-10">
          An algorithm cannot learn without data.
        </BigStatement>

        <SortingBoard
          className="mt-10"
          bins={[
            {
              key: "structured",
              label: "Structured data",
              description:
                "Structured data includes numbers, dates, and clear tables like spreadsheet rows or SQL databases.",
            },
            {
              key: "unstructured",
              label: "Unstructured data",
              description:
                "Unstructured data includes emails, video footage, audio recordings, customer reviews, and scanned PDFs.",
            },
          ]}
          items={[
            { text: "Numbers", bin: "structured" },
            { text: "Emails", bin: "unstructured" },
            { text: "Spreadsheet rows", bin: "structured" },
            { text: "Video footage", bin: "unstructured" },
            { text: "SQL databases", bin: "structured" },
            { text: "Customer reviews", bin: "unstructured" },
            { text: "Dates", bin: "structured" },
            { text: "Scanned PDFs", bin: "unstructured" },
          ]}
        />

        <Callout className="mt-10 max-w-3xl" title="Why It Matters">
          Modern deep learning allows companies to extract clear business
          insights from unstructured data for the first time.
        </Callout>
      </Slide>

      {/* ==================================================================
          DATA QUALITY AND BIAS   [quiz]
      ================================================================== */}
      <Slide
        id="data-quality"
        border
        align="left"
        quizData={quiz["data-quality"]}
      >
        <SlideHead>
          <Heading>Data Quality, Bias, and the Garbage-In Principle</Heading>
        </SlideHead>

        <BigStatement className="mt-10">
          A model is only as good as the data used to train it.
        </BigStatement>

        <RevealGrid
          className="mt-10"
          columns={2}
          items={[
            {
              label: "Past human biases",
              text: "If historical data contains past human biases or missing records, the model will learn and repeat those errors.",
            },
            {
              label: "Incomplete records and bad labels",
              text: "Incomplete records and bad labels create noisy forecasts that mislead decision makers.",
            },
          ]}
        />

        <Callout className="mt-10 max-w-3xl">
          High data quality and careful verification matter far more than using
          a trendy model architecture.
        </Callout>
      </Slide>

      {/* ==================================================================
          FLYWHEEL
      ================================================================== */}
      <Slide id="flywheel" border align="left">
        <SlideHead>
          <Heading>The Feedback Loop and Data Flywheel</Heading>
        </SlideHead>

        <Flywheel
          className="mt-10"
          stages={[
            {
              label: "Deployment",
              text: "A successful AI deployment is never finished on day one.",
            },
            {
              label: "Customer actions",
              text: "When customers use the product, their actions generate fresh behavioral signals and performance data.",
            },
            {
              label: "Retraining",
              text: "This new data is fed back into the system to retrain models and improve predictions.",
            },
            {
              label: "Better predictions",
              text: "Better predictions attract more users, which generates more data and creates a virtuous learning cycle.",
            },
          ]}
        />
      </Slide>

      {/* ==================================================================
          MODULE V
      ================================================================== */}
      <Slide id="module-5" border>
        <ModuleMark label="Module" numeral="V" />

        <Heading className="mt-6">Risks, Ethics, and Governance</Heading>

        <Subtitle variant="hero" className="mt-6">
          This section examines the operational, legal, and reputational risks of
          deploying AI.
        </Subtitle>
        <Subtitle variant="hero" className="mt-4">
          We review why AI initiatives fail and how business leaders can manage
          these risks.
        </Subtitle>
      </Slide>

      {/* ==================================================================
          WHY PROJECTS FAIL   [quiz]
      ================================================================== */}
      <Slide
        id="why-projects-fail"
        border
        align="left"
        quizData={quiz["why-projects-fail"]}
      >
        <SlideHead>
          <Heading>Why Business AI Projects Fail</Heading>
        </SlideHead>

        <RevealGrid
          className="mt-10"
          openFirst
          columns={2}
          items={[
            {
              label: "Exciting technology first",
              text: "Many AI projects fail because teams start with exciting technology instead of an urgent business problem.",
            },
            {
              label: "Poor data quality",
              text: "Poor data quality, messy databases, and disconnected systems prevent models from working reliably.",
            },
            {
              label: "Employee resistance",
              text: "Employees often resist new tools if they do not trust the recommendations or fear losing their jobs.",
            },
            {
              label: "Executive sponsorship",
              text: "Clear executive sponsorship, realistic timelines, and change management are essential for adoption.",
            },
          ]}
        />
      </Slide>

      {/* ==================================================================
          HALLUCINATIONS AND BLACK BOXES   [quiz]
      ================================================================== */}
      <Slide
        id="hallucinations"
        border
        align="left"
        quizData={quiz["hallucinations"]}
      >
        <SlideHead>
          <Heading>Hallucinations, Accuracy, and the Black Box Problem</Heading>
        </SlideHead>

        <SplitCompare
          className="mt-10"
          left={{
            label: "Hallucinations",
            points: [
              "Generative models can produce convincing answers that are factually wrong, known as hallucinations.",
            ],
          }}
          right={{
            label: "Black boxes",
            points: [
              "Many deep learning models are black boxes, meaning humans cannot easily trace how the system reached a conclusion.",
            ],
          }}
        />

        <Callout
          className="mt-10 max-w-3xl"
          variant="secondary"
          title="Regulated Industries"
        >
          In regulated fields like banking and healthcare, companies must be able
          to explain the exact logic behind their decisions.
        </Callout>

        <BigStatement className="mt-10">
          Leaders must test system outputs and build guardrails before deploying
          customer-facing AI.
        </BigStatement>
      </Slide>

      {/* ==================================================================
          PRIVACY, SECURITY, IP
      ================================================================== */}
      <Slide id="privacy-security-ip" border align="left">
        <SlideHead>
          <Heading>Privacy, Security, and Intellectual Property</Heading>
        </SlideHead>

        <RevealGrid
          className="mt-10"
          openFirst
          items={[
            {
              label: "Public AI tools",
              text: "Using public AI tools can accidentally expose proprietary customer records, financial figures, or trade secrets.",
            },
            {
              label: "Data privacy laws",
              text: "Businesses must follow data privacy laws and obtain proper customer consent before training models.",
            },
            {
              label: "Copyrighted materials",
              text: "Training models on copyrighted materials creates growing legal and financial liability.",
            },
          ]}
        />

        <Callout className="mt-10 max-w-3xl">
          Organizations need strict data handling policies and secure
          infrastructure to protect sensitive information.
        </Callout>

        <DiscussionCard title="Discussion" className="mt-10 max-w-3xl">
          How should a company respond if an employee accidentally uploads
          confidential client data into a public chatbot to save time on a
          report?
        </DiscussionCard>
      </Slide>

      {/* ==================================================================
          GOVERNANCE
      ================================================================== */}
      <Slide id="governance" border align="left">
        <SlideHead>
          <Heading>Governance and Executive Accountability</Heading>
        </SlideHead>

        <BigStatement className="mt-10">
          Business executives, not data scientists alone, are legally and
          ethically responsible for automated decisions.
        </BigStatement>

        <NumberedCards
          className="mt-10"
          items={[
            "Leaders must set clear rules for who approves model deployment, who monitors accuracy, and who handles customer complaints.",
            "Regular audits are needed to check for algorithmic bias, performance decline, and compliance issues over time.",
            "Good governance protects customer trust and preserves the long-term reputation of the enterprise.",
          ]}
        />
      </Slide>

      {/* ==================================================================
          MODULE VI
      ================================================================== */}
      <Slide id="module-6" border>
        <ModuleMark label="Module" numeral="VI" />

        <Heading className="mt-6">The Course Roadmap</Heading>

        <Subtitle variant="hero" className="mt-6">
          This final section outlines the upcoming weeks of the semester in BUSI
          654.
        </Subtitle>
        <Subtitle variant="hero" className="mt-4">
          We will explore how AI applies across each major business discipline.
        </Subtitle>
      </Slide>

      {/* ==================================================================
          ROADMAP
      ================================================================== */}
      <Slide id="roadmap" border align="left">
        <SlideHead>
          <Heading>Semester Roadmap: Applications of AI in Business</Heading>
        </SlideHead>

        <RoadmapRail
          className="mt-10"
          stops={[
            {
              id: "02",
              text: "Week 02 explores marketing, demand sensing, dynamic personalization, and consumer behavior.",
            },
            {
              id: "03",
              text: "Week 03 covers finance, credit scoring, algorithmic risk management, and fraud prevention.",
            },
            {
              id: "04",
              text: "Week 04 examines human resources, talent acquisition, workforce planning, and organizational analytics.",
            },
            {
              id: "05",
              text: "Week 05 focuses on operations, logistics, demand forecasting, and supply chain visibility.",
            },
            {
              id: "06",
              text: "Week 06 analyzes corporate strategy, competitive advantage, and data moats.",
            },
            {
              id: "07",
              text: "Week 07 addresses equity, diversity, inclusion, and algorithmic fairness.",
            },
            {
              id: "08",
              text: "Week 08 covers sustainability and the environmental footprint of computing.",
            },
            {
              id: "09",
              text: "Week 09 examines product development and modern agentic engineering workflows.",
            },
          ]}
        />
      </Slide>

      {/* ==================================================================
          SUMMARY
      ================================================================== */}
      <Slide id="summary" border align="left">
        <SlideHead>
          <Heading>Summary and Core Principles for Leaders</Heading>
        </SlideHead>

        <NumberedCards
          className="mt-10"
          items={[
            "View artificial intelligence as an engine that lowers the cost of prediction.",
            "Focus on specific, high-value business decisions rather than generic technology trends.",
            "Build clean data foundations and establish ongoing governance for every deployed system.",
            "Remember that human judgment, ethical standards, and strategic vision remain irreplaceable.",
          ]}
        />
      </Slide>
    </SlideDeck>
  );
}
