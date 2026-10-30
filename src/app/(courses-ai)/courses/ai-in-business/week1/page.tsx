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
  ChurnTable,
  ClassificationPanel,
  DecisionFlow,
  DriftTimeline,
  FitLab,
  FourStages,
  PredictiveGenerative,
  RegressionPanel,
  RewardLoop,
  RulesVersusLearning,
  Segments,
  StructuredUnstructured,
  ThresholdLab,
} from "./visuals";

// ============================================================================
// WEEK 1: FOUNDATIONS OF AI AND MACHINE LEARNING IN BUSINESS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each sentence sits and which plate is drawn beside
// it. Plates live in ./visuals.tsx, exercises in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const T = "font-semibold text-[var(--ink)]";
const STACK = "space-y-4";

export default function Week1Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 1</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            Foundations of AI and Machine Learning in Business
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Artificial intelligence reduces uncertainty in business decisions by learning statistical
            patterns from historical data.
          </p>
        </div>
      </Slide>

      {/* The Role of AI in Business Decisions */}
      <Slide id="role-of-ai" border align="left">
        <Head1>The Role of AI in Business Decisions</Head1>
        <p className={`${DISPLAY} mt-8 max-w-3xl`}>Managerial decisions are made under uncertainty.</p>
        <div className={PAIR}>
          <p className={BODY}>
            A lender who reviews a loan application does not know in advance whether the borrower will
            default.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            A retailer who orders seasonal inventory does not know in advance how many units each store
            will sell.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            Artificial intelligence reduces this uncertainty by estimating unknown outcomes from
            historical records.
          </p>
          <p className={BODY}>
            The value of an AI system depends on whether its predictions{" "}
            <span className="text-[var(--accent)]">improve the decisions of the organization</span>.
          </p>
        </div>
      </Slide>

      {/* Prediction Versus Judgment */}
      <Slide id="prediction-judgment" border align="left" exercise={exercise["prediction-judgment"]}>
        <Head1>Prediction Versus Judgment</Head1>
        <p className={`${LEAD} mt-6 max-w-3xl`}>
          A decision can be separated into two components: prediction and judgment.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <DecisionFlow />
        </div>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Prediction</span> is the estimation of an unknown fact or future event
              from available data.
            </p>
            <p className={BODY}>Machine learning systems perform prediction at scale.</p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              <span className={T}>Judgment</span> is the assignment of value to the possible outcomes of
              an action, including the cost of each type of error.
            </p>
            <p className={BODY}>
              Managers supply the judgment that determines which action to take when a prediction is
              given.
            </p>
          </div>
        </div>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="From Explicit Rules to Statistical Learning"
        lines={[
          "Computers can process business data in two ways: by following explicit rules written by programmers, or by learning patterns from examples.",
          "Distinguishing the two approaches clarifies which business tasks are suited to machine learning and which are better served by standard software.",
        ]}
      />

      {/* Rule-Based Software Versus Machine Learning */}
      <Slide id="rules-vs-learning" border align="left" exercise={exercise["rules-vs-learning"]}>
        <Head1>Rule-Based Software Versus Machine Learning</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              In <span className={T}>rule-based software</span>, a programmer states the exact conditions
              that determine the output.
            </p>
            <p className={BODY}>
              Payroll calculation, tax withholding, and inventory accounting operate on explicit rules
              because the governing formulas are known in advance.
            </p>
            <p className={BODY}>
              Rule-based software fails when the relationship between inputs and outcomes is too complex
              to state as a list of rules, as in credit fraud detection or speech recognition.
            </p>
            <p className={`${BODY} border-t border-[var(--ink)]/10 pt-4`}>
              In <span className={T}>machine learning</span>, the system is given historical examples of
              inputs and their known outcomes, and estimates the relationship between them from the
              data.
            </p>
          </div>
          <RulesVersusLearning />
        </div>
      </Slide>

      {/* Formulating a Prediction Problem */}
      <Slide id="formulating" border align="left">
        <Head1>Formulating a Prediction Problem</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Applying machine learning to a business problem requires specifying three elements: the unit
          of observation, the features, and the target.
        </p>
        <div className="mt-6 w-full max-w-5xl">
          <ChurnTable />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            The <span className={T}>unit of observation</span> is the entity being evaluated, such as a
            customer, a transaction, or a shipment.
          </p>
          <p className={BODY}>
            The <span className={T}>features</span> are the measured attributes of that observation that
            are known before the decision is made, such as past purchase frequency or transaction amount.
          </p>
          <p className={BODY}>
            The <span className={T}>target</span> is the outcome to be predicted, such as whether a
            subscriber cancels within 90 days.
          </p>
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl border-t border-[var(--ink)]/10 pt-5`}>
          If a feature contains information recorded only after the outcome has occurred, the model will
          appear accurate during testing but fail when deployed. This error is known as{" "}
          <span className={T}>data leakage</span>.
        </p>
      </Slide>

      {/* Error Asymmetry and Decision Thresholds */}
      <Slide id="thresholds" border align="left" exercise={exercise["thresholds"]}>
        <Head1>Error Asymmetry and Decision Thresholds</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              A classification model typically outputs a probability, such as a 0.25 probability that a
              transaction is fraudulent.
            </p>
            <p className={BODY}>
              Acting on that probability requires choosing a threshold above which the transaction is
              declined.
            </p>
            <p className={BODY}>
              Declining a legitimate transaction is a <span className={T}>false positive</span>. It costs
              the firm the margin on the sale and inconveniences the customer.
            </p>
            <p className={BODY}>
              Approving a fraudulent transaction is a <span className={T}>false negative</span>. It costs
              the firm the full value of the loss.
            </p>
            <p className={`${BODY} border-t border-[var(--ink)]/10 pt-4`}>
              Because the two errors have different financial consequences, the optimal threshold is{" "}
              <span className="text-[var(--accent)]">an economic decision</span> rather than a purely
              statistical one.
            </p>
          </div>
          <ThresholdLab />
        </div>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="The Three Learning Paradigms"
        lines={[
          "Machine learning methods are classified into three paradigms according to the data used to train them: supervised learning, unsupervised learning, and reinforcement learning.",
          "Each paradigm addresses a distinct class of managerial problems and requires different data infrastructure.",
        ]}
      />

      {/* Supervised Learning: Regression and Classification */}
      <Slide id="supervised" border align="left" exercise={exercise["supervised"]}>
        <Head1>Supervised Learning: Regression and Classification</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          <span className={T}>Supervised learning</span> estimates a function that maps input features to
          a known target using labeled historical records.
        </p>
        <div className="mt-8 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <RegressionPanel />
            <div className={`${STACK} mt-5`}>
              <p className={BODY}>
                When the target is a continuous number, the task is <span className={T}>regression</span>.
              </p>
              <p className={BODY}>
                Estimating next week&apos;s unit demand at a distribution center or the market value of a
                commercial property is a regression problem.
              </p>
            </div>
          </div>
          <div className={COL_RULE}>
            <ClassificationPanel />
            <div className={`${STACK} mt-5`}>
              <p className={BODY}>
                When the target is a discrete category, the task is{" "}
                <span className={T}>classification</span>.
              </p>
              <p className={BODY}>
                Determining whether an invoice is fraudulent or which subscription tier a customer will
                select is a classification problem.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Unsupervised Learning: Clustering and Anomaly Detection */}
      <Slide id="unsupervised" border align="left">
        <Head1>Unsupervised Learning: Clustering and Anomaly Detection</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          <span className={T}>Unsupervised learning</span> identifies structure in datasets that contain
          input features but no recorded target outcome.
        </p>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12">
          <Segments />
          <div className="space-y-6">
            <div className={STACK}>
              <p className={BODY}>
                <span className={T}>Clustering</span> groups observations that share similar
                characteristics.
              </p>
              <p className={BODY}>
                Retailers use clustering to segment customers by purchasing behavior when no predefined
                segment labels exist.
              </p>
            </div>
            <div className={`${STACK} border-t border-[var(--ink)]/10 pt-5`}>
              <p className={BODY}>
                <span className={T}>Anomaly detection</span> identifies observations that differ markedly
                from the typical pattern in the data.
              </p>
              <p className={BODY}>
                Operations teams use anomaly detection to flag unusual network traffic or abnormal
                equipment sensor readings before a failure occurs.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Reinforcement Learning: Sequential Decisions */}
      <Slide id="reinforcement" border align="left">
        <Head1>Reinforcement Learning: Sequential Decisions</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Reinforcement learning</span> addresses problems in which an agent makes
              a sequence of decisions over time and receives a numerical reward after each step.
            </p>
            <p className={BODY}>
              Each action alters the state of the environment and therefore affects the options available
              in future steps.
            </p>
            <p className={BODY}>
              Dynamic airline pricing, warehouse robot routing, and automated bidding in digital
              advertising are sequential decision problems.
            </p>
            <p className={`${BODY} border-t border-[var(--ink)]/10 pt-4`}>
              Because learning by trial and error in a live market can produce costly mistakes,
              reinforcement learning systems are usually trained in simulation before deployment.
            </p>
          </div>
          <RewardLoop />
        </div>
      </Slide>

      {/* Selecting a Learning Paradigm */}
      <Slide id="selecting-paradigm" border align="left" exercise={exercise["selecting-paradigm"]}>
        <Head1>Selecting a Learning Paradigm</Head1>
        <p className={`${DISPLAY} mt-8 max-w-4xl`}>
          The choice among supervised, unsupervised, and reinforcement learning depends on the decision
          problem and the available data.
        </p>
        <ol className="mt-12 grid w-full max-w-5xl border-t border-[var(--ink)]/15 md:grid-cols-3">
          <li className="border-b border-[var(--ink)]/10 py-6 md:border-b-0 md:pr-8">
            <p className={BODY}>
              <span className={T}>Supervised learning</span> is appropriate when the firm has a
              well-defined target outcome and reliable historical records of that outcome.
            </p>
          </li>
          <li className="border-b border-[var(--ink)]/10 py-6 md:border-b-0 md:border-l md:px-8">
            <p className={BODY}>
              <span className={T}>Unsupervised learning</span> is appropriate when the firm seeks to
              discover groupings or unusual cases in unlabeled records.
            </p>
          </li>
          <li className="py-6 md:border-l md:border-[var(--ink)]/10 md:pl-8">
            <p className={BODY}>
              <span className={T}>Reinforcement learning</span> is appropriate when decisions are
              sequential, actions affect future states, and performance can be measured by a cumulative
              reward.
            </p>
          </li>
        </ol>
      </Slide>

      {/* Discussion: Customer Returns in Online Retail */}
      <Slide id="discussion-returns" border align="left">
        <Head1>Discussion: Customer Returns in Online Retail</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>An online apparel retailer experiences a 20
          percent return rate, with each returned item costing 14 dollars in shipping and restocking. How
          could the retailer use (a) supervised learning, (b) unsupervised learning, and (c)
          reinforcement learning to reduce return costs? Which approach should management implement
          first, and what data would it require?
        </Discussion1>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Generalization and Model Evaluation"
        lines={[
          "A model that reproduces historical data accurately does not necessarily predict future outcomes well.",
          "Evaluating a model requires testing its performance on data that were not used to build it.",
        ]}
      />

      {/* Underfitting, Overfitting, and Generalization */}
      <Slide id="generalization" border align="left" exercise={exercise["generalization"]}>
        <Head1>Underfitting, Overfitting, and Generalization</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Generalization</span> is the ability of a model to predict accurately
              on new observations not seen during training.
            </p>
            <p className={BODY}>
              <span className={T}>Underfitting</span> occurs when a model is too simple to capture the
              underlying pattern in the data, resulting in poor performance on both training and new
              data.
            </p>
            <p className={BODY}>
              <span className={T}>Overfitting</span> occurs when a model is so complex that it fits
              random noise in the training sample along with the true signal.
            </p>
            <p className={BODY}>
              An overfitted model shows high accuracy on the data used to train it, but poor accuracy
              when applied to new customers or future periods.
            </p>
            <p className={`${BODY} border-t border-[var(--ink)]/10 pt-4`}>
              To detect overfitting, historical data are divided into a training set used to estimate
              the model and a{" "}
              <span className="text-[var(--accent)]">held-out test set</span> used only to evaluate its
              generalization.
            </p>
          </div>
          <FitLab />
        </div>
      </Slide>

      {/* Distribution Shift and Model Drift */}
      <Slide id="drift" border align="left">
        <Head1>Distribution Shift and Model Drift</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <p className={BODY}>
            Evaluation on a held-out test set assumes that future conditions will resemble the historical
            period from which the data were drawn.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            In business settings, customer behavior, prices, competitor actions, and macroeconomic
            conditions change over time.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <DriftTimeline />
        </div>
        <div className="mt-8 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            <span className={T}>Model drift</span> is the degradation of a model&apos;s predictive accuracy
            as the deployment environment diverges from the training data.
          </p>
          <p className={BODY}>
            Demand forecasting models trained on pre-2020 retail sales failed during the pandemic because
            purchasing patterns changed abruptly.
          </p>
          <p className={BODY}>
            Deployed models therefore require ongoing monitoring of prediction error and periodic
            retraining on recent data.
          </p>
        </div>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="Deep Learning and Unstructured Data"
        lines={[
          "Traditional machine learning methods are designed for structured data organized in tables of numbers and categories.",
          "A large share of organizational information consists of unstructured data, including text, images, audio, and video, which require a different modeling approach.",
        ]}
      />

      {/* Structured Versus Unstructured Data */}
      <Slide id="structured-unstructured" border align="left">
        <Head1>Structured Versus Unstructured Data</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Structured data</span> are recorded in tabular rows and columns where
              each variable has a defined meaning and unit, such as account balance, tenure, or unit
              price.
            </p>
            <p className={BODY}>
              Traditional statistical models work well on structured tables because the relevant
              variables have already been defined and measured.
            </p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              <span className={T}>Unstructured data</span> do not have predefined tabular features. A
              document is a sequence of words, an audio recording is a sound wave, and a photograph is a
              grid of pixel values.
            </p>
            <p className={BODY}>
              Analyzing unstructured data requires extracting meaningful features from raw text, sound,
              or pixels before a prediction can be made.
            </p>
          </div>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <StructuredUnstructured />
        </div>
      </Slide>

      {/* Neural Networks and Representation Learning */}
      <Slide id="neural-networks" border align="left">
        <Head1>Neural Networks and Representation Learning</Head1>
        <div className="mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-10">
          <p className={BODY}>
            An <span className={T}>artificial neural network</span> processes inputs through a series of
            layers, each computing weighted combinations of the values from the preceding layer.
          </p>
          <p className={BODY}>
            <span className={T}>Deep learning</span> refers to neural networks with many intermediate
            layers between the raw input and the final output.
          </p>
          <p className={BODY}>
            Rather than relying on human analysts to define features by hand, a deep network learns
            useful representations directly from the raw data during training.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <FourStages />
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl`}>
          In an image inspection system, early layers detect simple edges and shading, intermediate
          layers combine those edges into component shapes, and the final layer classifies whether the
          part is defective.
        </p>
      </Slide>

      {/* Compute, Data, and Scale in Deep Learning */}
      <Slide id="compute-scale" border align="left">
        <Head1>Compute, Data, and Scale in Deep Learning</Head1>
        <p className={`${LEAD} mt-8 max-w-4xl`}>
          The mathematical principles of neural networks were developed decades ago, but early networks
          were limited by small datasets and slow processors.
        </p>
        <p className={`${DISPLAY} mt-10 max-w-4xl border-l-2 border-l-[var(--accent)] pl-6`}>
          Recent advances in deep learning resulted from three developments: large digital datasets,
          parallel graphics processing units (GPUs) capable of fast matrix computation, and new network
          architectures such as the Transformer.
        </p>
        <p className={`${RULED} ${BODY} max-w-4xl`}>
          These developments made it possible to train large{" "}
          <span className={T}>foundation models</span> on broad collections of text, code, and images,
          and then adapt a single pre-trained model to many different business tasks.
        </p>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Predictive AI and Generative AI"
        lines={[
          "Organizations now deploy two broad classes of AI systems: predictive models and generative models.",
          "Understanding the distinction between them is essential for selecting the right tool for a given workflow.",
        ]}
      />

      {/* Predictive AI Versus Generative AI */}
      <Slide id="predictive-generative" border align="left" exercise={exercise["predictive-generative"]}>
        <Head1>Predictive AI Versus Generative AI</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-12">
          <div className="space-y-6">
            <div className={STACK}>
              <p className={BODY}>
                <span className={T}>Predictive AI</span> maps input data to a specific score, category,
                or numerical forecast.
              </p>
              <p className={BODY}>
                Credit scoring, demand forecasting, churn prediction, and fraud detection are predictive
                tasks.
              </p>
            </div>
            <div className={`${STACK} border-t border-[var(--ink)]/10 pt-5`}>
              <p className={BODY}>
                <span className={T}>Generative AI</span> learns the structure of text, code, images, or
                audio in order to produce new content in response to a prompt.
              </p>
              <p className={BODY}>
                Drafting customer correspondence, summarizing legal contracts, and generating software
                code are generative tasks.
              </p>
            </div>
          </div>
          <PredictiveGenerative />
        </div>
        <p className={`${LEAD} mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Many business workflows combine both: a predictive model identifies which customers are at
          high risk of canceling, and a generative model drafts the retention message for review.
        </p>
      </Slide>

      {/* Cost, Latency, and Verification Trade-Offs */}
      <Slide id="trade-offs" border align="left">
        <Head1>Cost, Latency, and Verification Trade-Offs</Head1>
        <div className={PAIR}>
          <p className={BODY}>
            Predictive models trained on tabular data are inexpensive to run, return predictions in
            milliseconds, and produce consistent outputs for a given input.
          </p>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              Large generative models require substantially more computing power, take longer to respond,
              and cost more per query.
            </p>
            <p className={BODY}>
              Generative models can also produce fluent outputs that contain factual errors or fabricated
              references, a failure mode known as <span className={T}>hallucination</span>.
            </p>
          </div>
        </div>
        <Verdict>
          Sound system design uses tabular predictive models for structured scoring tasks and reserves
          generative models for tasks that require language comprehension, synthesis, or content
          creation.
        </Verdict>
      </Slide>

      {/* Course Overview: Ten Weeks of AI in Business */}
      <Slide id="course-overview" border align="left">
        <Head1>Course Overview: Ten Weeks of AI in Business</Head1>
        <ol className="mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15">
          {[
            [
              "1 to 2",
              "Weeks 1 and 2 establish the technical foundations: machine learning and deep learning in Week 1, followed by large language models, prompting, retrieval-augmented generation, and AI agents in Week 2.",
            ],
            [
              "3 to 7",
              "Weeks 3 through 7 examine applications across core business functions: marketing and consumer behavior (Week 3), finance (Week 4), human resources (Week 5), operations and supply chain (Week 6), and product development (Week 7).",
            ],
            [
              "8",
              "Week 8 addresses corporate AI strategy, competitive advantage, build-versus-buy decisions, and the evaluation of return on investment.",
            ],
            [
              "9 to 10",
              "Weeks 9 and 10 examine governance and societal impact: Equity, Diversity, Inclusion, and Indigeneity (EDII) and algorithmic fairness in Week 9, and environmental sustainability in Week 10.",
            ],
          ].map(([weeks, line], i) => (
            <li
              key={weeks}
              className="grid gap-2 border-b border-[var(--ink)]/10 py-5 md:grid-cols-[7rem_1fr] md:gap-8"
            >
              <span
                aria-hidden
                className={`${MICRO} pt-1 ${i === 0 ? "text-[var(--accent)]" : "text-[var(--ink-3)]"}`}
              >
                {weeks}
              </span>
              <p className={BODY}>{line}</p>
            </li>
          ))}
        </ol>
      </Slide>

      {/* Discussion: Designing an Insurance Claims Workflow */}
      <Slide id="discussion-claims" border align="left">
        <Head1>Discussion: Designing an Insurance Claims Workflow</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>An auto insurance company wants to use AI across
          four steps of its claims process: (1) inspecting photographs of vehicle damage, (2) estimating
          the dollar cost of repairs, (3) flagging claims for potential fraud, and (4) drafting the
          coverage explanation letter sent to the policyholder. For each step, state whether the task
          calls for structured predictive modeling, deep computer vision, or generative AI, and identify
          where human review is required.
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <ol className="mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 md:grid-cols-2">
          {[
            "Artificial intelligence supports managerial decision-making under uncertainty by supplying predictions from data, while managers supply judgment regarding values and error costs.",
            "Rule-based software executes explicit human-written rules, whereas machine learning estimates relationships from historical examples.",
            "Supervised learning predicts known targets, unsupervised learning identifies structure in unlabeled data, and reinforcement learning optimizes sequential decisions through rewards.",
            "Models must be evaluated on their ability to generalize to unseen data rather than their fit to training data, and must be monitored after deployment for model drift.",
            "Deep learning uses multi-layer neural networks to learn representations directly from unstructured text, images, and audio.",
            "Predictive AI estimates scores and categories, whereas generative AI produces new content. Effective business workflows match each model class to the cost, speed, and verification requirements of the task.",
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
