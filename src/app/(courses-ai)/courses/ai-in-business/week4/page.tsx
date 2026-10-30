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
  BacktestLab,
  ExpectedLoss,
  FilingRetrieval,
  FinanceConstraints,
  FraudRing,
  FraudThresholdLab,
  ProxyPath,
  RegimeShift,
  RejectInference,
  ScorecardVsTrees,
  ShapWaterfall,
  TailRisk,
} from "./visuals";

// ============================================================================
// WEEK 4: AI IN FINANCE
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

/** A numbered row: index on the left, its sentence on the right. */
function Numbered({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mt-8 w-full max-w-5xl border-t border-[var(--ink)]/15">
      {items.map((line, i) => (
        <li key={i} className="grid grid-cols-[2.5rem_1fr] border-b border-[var(--ink)]/10 py-4">
          <span aria-hidden className={`${MICRO} pt-1 text-[var(--ink-3)]`}>
            {i + 1}
          </span>
          <p className={BODY}>{line}</p>
        </li>
      ))}
    </ol>
  );
}

export default function Week4Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 4</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            AI in Finance
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Financial institutions use artificial intelligence to price credit risk, detect fraud in
            milliseconds, and extract market signals under strict explainability and stability constraints.
          </p>
        </div>
      </Slide>

      {/* Risk, Return, and Asymmetric Information in Finance */}
      <Slide id="asymmetric-information" border align="left">
        <Head1>Risk, Return, and Asymmetric Information in Finance</Head1>
        <p className={`${DISPLAY} mt-8 max-w-4xl`}>
          Core financial decisions, including lending, payment authorization, insurance underwriting, and
          asset allocation, require pricing uncertain future cash flows.
        </p>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          These decisions are made under <span className={T}>asymmetric information</span>, because a
          borrower or counterparty knows more about their true repayment capacity and intent than the
          institution does.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            Financial institutions have used statistical scorecards for decades to estimate default risk and
            set capital reserves from structured accounting records.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Modern machine learning extends financial modeling to high-dimensional transaction streams,
            network graphs, and unstructured corporate disclosures.
          </p>
        </div>
        <Verdict>
          However, higher predictive complexity introduces{" "}
          <span className="text-[var(--accent)]">new governance demands</span> when models allocate credit
          or execute trades automatically.
        </Verdict>
      </Slide>

      {/* Distinctive Constraints of Financial AI */}
      <Slide id="constraints" border align="left" exercise={exercise["constraints"]}>
        <Head1>Distinctive Constraints of Financial AI</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Deploying artificial intelligence in finance is governed by four constraints that are stricter
          than in most consumer applications.
        </p>
        <div className={FIG}>
          <FinanceConstraints />
        </div>
        <div className="mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-2 md:gap-x-14">
          <p className={BODY}>
            First, error costs are highly asymmetric: the interest margin earned on twenty repaid loans can
            be wiped out by a single principal default.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Second, payment and trading systems operate under strict latency budgets measured in
            milliseconds rather than seconds.
          </p>
          <p className={BODY}>
            Third, financial regulators require institutions to explain the specific reasons behind adverse
            credit decisions and to validate models independently before deployment.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Fourth, financial markets are non-stationary and adversarial, meaning that historical
            statistical patterns shift as competitors, fraudsters, and macroeconomic conditions adapt.
          </p>
        </div>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="Credit Risk Modeling and Underwriting Automation"
        lines={[
          "Lending is the foundational prediction problem in banking: deciding whether to extend credit, how much to lend, and what interest rate compensates for risk.",
          "Machine learning and alternative data sources allow lenders to evaluate borrowers more granularly than traditional credit bureau scorecards, while introducing new statistical challenges.",
        ]}
      />

      {/* Probability of Default, Loss Given Default, and Expected Loss */}
      <Slide id="expected-loss" border align="left">
        <Head1>Probability of Default, Loss Given Default, and Expected Loss</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Credit risk management separates the expected financial loss on a loan into three distinct
          components that are estimated separately.
        </p>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Probability of default (PD)</span> is the likelihood that a borrower will
            fail to meet scheduled debt obligations over a fixed horizon, typically twelve months.
          </p>
          <p className={BODY}>
            <span className={T}>Exposure at default (EAD)</span> is the total dollar balance the lender
            expects to be outstanding at the moment default occurs, including drawn credit lines.
          </p>
          <p className={BODY}>
            <span className={T}>Loss given default (LGD)</span> is the fraction of that exposure that the
            lender cannot recover after liquidating collateral and completing collection efforts.
          </p>
        </div>
        <div className={FIG}>
          <ExpectedLoss />
        </div>
        <p className={`${LEAD} mt-8 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Multiplying these three quantities yields expected loss (
          <span className="text-[var(--accent)]">EL = PD × EAD × LGD</span>), which determines both
          risk-based loan pricing and required loss provisions.
        </p>
      </Slide>

      {/* Traditional Scorecards Versus Machine Learning Underwriting */}
      <Slide id="scorecards-vs-ml" border align="left" exercise={exercise["scorecards-vs-ml"]}>
        <Head1>Traditional Scorecards Versus Machine Learning Underwriting</Head1>
        <div className={GRID2}>
          <div className={STACK}>
            <p className={BODY}>
              Traditional credit scorecards use <span className={T}>logistic regression</span> on a small
              set of credit bureau variables, assigning fixed point values to buckets of credit utilization,
              account age, and past delinquencies.
            </p>
            <p className={BODY}>
              Linear scorecards are transparent and easy to audit, but they assume that each variable
              affects default risk independently and monotonically.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            Tree-based ensemble models, such as <span className={T}>gradient-boosted decision trees</span>,
            capture non-linear relationships and interaction effects across hundreds of borrower attributes.
          </p>
        </div>
        <div className={FIG}>
          <ScorecardVsTrees />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            For example, high monthly credit card spending indicates low default risk when paired with full
            monthly repayment, but high default risk when paired with rising revolving balances.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Moving from linear scorecards to tree ensembles improves default discrimination, especially for
            borderline applicants, but requires{" "}
            <span className="text-[var(--accent)]">post-hoc attribution tools</span> to explain individual
            decisions.
          </p>
        </div>
      </Slide>

      {/* Alternative Credit Data and Reject Inference */}
      <Slide id="reject-inference" border align="left">
        <Head1>Alternative Credit Data and Reject Inference</Head1>
        <div className={GRID3}>
          <p className={BODY}>
            Millions of consumers and young small businesses are credit-invisible or have thin credit files
            because they have little history of traditional bank loans.
          </p>
          <p className={BODY}>
            <span className={T}>Alternative credit data</span> use permissioned bank-account cash flows,
            recurring rent and utility payments, and invoicing records to assess repayment capacity outside
            bureau reports.
          </p>
          <p className={BODY}>
            Incorporating new applicant populations exposes lenders to a statistical bias known as the{" "}
            <span className={T}>reject inference problem</span>.
          </p>
        </div>
        <div className={FIG}>
          <RejectInference />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Historical loan datasets record repayment or default outcomes only for applicants who were
            approved under past underwriting rules, while the true outcomes of rejected applicants remain
            unobserved.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            If a machine learning model is trained naively on approved borrowers alone, it can misjudge
            default risk when applied to previously rejected segments unless the institution{" "}
            <span className="text-[var(--accent)]">corrects for sample selection</span>.
          </p>
        </div>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Real-Time Fraud Detection and Payment Security"
        lines={[
          "Global payment networks process tens of thousands of card and wire transactions per second, deciding instantly whether to approve or block each payment.",
          "Fraud detection models must identify rare, evolving attacks within milliseconds without blocking the legitimate commerce of everyday cardholders.",
        ]}
      />

      {/* Extreme Class Imbalance and Precision-Recall Trade-Offs */}
      <Slide id="class-imbalance" border align="left" exercise={exercise["class-imbalance"]}>
        <Head1>Extreme Class Imbalance and Precision-Recall Trade-Offs</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              Payment fraud detection operates under <span className={T}>extreme class imbalance</span>,
              where fraudulent transactions often represent fewer than 0.1 percent of all payment attempts.
            </p>
            <p className={BODY}>
              Under extreme class imbalance, overall classification accuracy is an uninformative metric: a
              model that approves every single transaction achieves 99.9 percent accuracy while stopping zero
              fraud.
            </p>
            <p className={BODY}>
              Fraud teams instead evaluate models using <span className={T}>precision</span> (the proportion
              of flagged transactions that are truly fraudulent) and <span className={T}>recall</span> (the
              proportion of all actual fraud cases caught by the model).
            </p>
            <p className={SUB}>
              Lowering the decision threshold increases recall by catching more fraud, but decreases precision
              by falsely declining more legitimate cardholders.
            </p>
          </div>
          <FraudThresholdLab />
        </div>
        <p className={`${LEAD} mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Because false declines cost merchants lost sales and drive frustrated customers to competing
          cards, banks calibrate thresholds to{" "}
          <span className="text-[var(--accent)]">minimize total economic cost</span> rather than fraud losses
          alone.
        </p>
      </Slide>

      {/* Supervised, Unsupervised, and Graph Models in Fraud Prevention */}
      <Slide id="fraud-models" border align="left" exercise={exercise["fraud-models"]}>
        <Head1>Supervised, Unsupervised, and Graph Models in Fraud Prevention</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Modern fraud engines combine three modeling approaches in a layered defense: supervised
          classifiers, unsupervised anomaly detectors, and graph models.
        </p>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Supervised models</span> trained on confirmed historical chargebacks
            recognize known fraud patterns, such as rapid card-testing purchases at online electronics
            retailers.
          </p>
          <p className={BODY}>
            <span className={T}>Unsupervised anomaly detection</span> flags transactions that deviate
            sharply from an individual cardholder&apos;s baseline spending location, time of day, and
            merchant category, catching novel attack methods.
          </p>
          <p className={BODY}>
            <span className={T}>Graph machine learning</span> represents accounts, payment cards, device
            fingerprints, and bank routing numbers as nodes linked by shared attributes and money transfers.
          </p>
        </div>
        <div className={FIG}>
          <FraudRing />
        </div>
        <p className={`${LEAD} mt-6 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Graph algorithms detect organized synthetic-identity rings and money-laundering mule networks that
          appear normal when <span className="text-[var(--accent)]">each account is scored in isolation</span>.
        </p>
      </Slide>

      {/* Latency Budgets and Adversarial Drift in Payment Systems */}
      <Slide id="latency-drift" border align="left">
        <Head1>Latency Budgets and Adversarial Drift in Payment Systems</Head1>
        <p className={`${DISPLAY} mt-8 max-w-4xl`}>
          A point-of-sale payment authorization must return an approve-or-decline decision within{" "}
          <span className="text-[var(--accent)]">50 to 150 milliseconds</span>, leaving no time for slow
          database joins or large generative model calls.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Production fraud pipelines rely on <span className={T}>streaming feature stores</span> that
              continuously pre-compute velocity features, such as the number of distinct merchants charged
              by a card in the past ten minutes.
            </p>
            <p className={BODY}>
              Unlike physical equipment failures, fraud exhibits <span className={T}>adversarial drift</span>
              : criminal groups actively test payment thresholds and modify their tactics as soon as a pattern
              is blocked.
            </p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              When a transaction receives an intermediate risk score, payment systems use{" "}
              <span className={T}>step-up authentication</span>, prompting the cardholder for biometric or
              one-time-code verification on their phone.
            </p>
            <p className={BODY}>
              Confirmed fraud reports and customer verification responses feed back into the training
              pipeline to update model weights against newly observed attack vectors.
            </p>
          </div>
        </div>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Financial Forecasting, Trading, and Unstructured Filings"
        lines={[
          "Beyond credit and payments, financial institutions apply AI to forecast corporate cash flows, optimize trade execution, and analyze unstructured market disclosures.",
          "Successfully applying machine learning in capital markets requires respecting how competitive market pricing differs from physical or consumer environments.",
        ]}
      />

      {/* Low Signal-to-Noise Ratios and Backtest Overfitting */}
      <Slide id="backtest-overfitting" border align="left" exercise={exercise["backtest-overfitting"]}>
        <Head1>Low Signal-to-Noise Ratios and Backtest Overfitting</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              Predicting public asset returns is fundamentally harder than predicting retail demand or image
              labels because market participants immediately trade on predictable patterns, driving the
              signal toward zero.
            </p>
            <p className={BODY}>
              As a result, financial return series exhibit a very{" "}
              <span className={T}>low signal-to-noise ratio</span>, where genuine predictive relationships are
              small relative to random price fluctuations.
            </p>
            <p className={SUB}>
              <span className={T}>Backtest overfitting</span> occurs when researchers test dozens or hundreds
              of model variations on historical price data and select the version that showed the highest
              past return.
            </p>
            <p className={BODY}>
              Even if every candidate model has zero true predictive power, the best-looking backtest will
              appear profitable purely by chance, and will lose money when deployed in live markets.
            </p>
          </div>
          <BacktestLab />
        </div>
        <p className={`${LEAD} mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Rigorous financial modeling requires strict{" "}
          <span className="text-[var(--accent)]">walk-forward validation</span>, out-of-sample holdout
          periods, and statistical adjustments for the total number of strategies tested.
        </p>
      </Slide>

      {/* Execution Algorithms and Portfolio Risk Optimization */}
      <Slide id="execution-risk" border align="left">
        <Head1>Execution Algorithms and Portfolio Risk Optimization</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          While predicting future asset prices is difficult, machine learning delivers reliable operational
          gains in trade execution, cash-flow forecasting, and portfolio risk estimation.
        </p>
        <Numbered
          items={[
            <>
              When an institutional fund buys or sells a large block of shares, executing the entire order at
              once pushes the market price against the fund, a cost known as{" "}
              <span className={T}>market impact</span>.
            </>,
            <>
              Algorithmic execution systems use supervised and reinforcement learning to split a large parent
              order into small child orders scheduled across venues and time intervals to minimize
              transaction costs.
            </>,
            <>
              In corporate treasury, machine learning forecasts daily working-capital cash inflows and
              outflows across subsidiaries to reduce idle cash balances and short-term borrowing costs.
            </>,
            <>
              In portfolio management, models estimate time-varying return correlations and liquidity risk so
              managers can rebalance exposures before concentration limits are breached.
            </>,
          ]}
        />
      </Slide>

      {/* Financial Sentiment and Retrieval over Unstructured Filings */}
      <Slide id="filings" border align="left">
        <Head1>Financial Sentiment and Retrieval over Unstructured Filings</Head1>
        <div className={GRID3}>
          <p className={BODY}>
            Institutional investors, credit analysts, and corporate development teams spend thousands of
            hours reading unstructured documents, including annual 10-K filings, loan agreements, and
            earnings call transcripts.
          </p>
          <p className={BODY}>
            General-purpose sentiment tools perform poorly on financial text because words such as
            &quot;liability&quot;, &quot;default&quot;, and &quot;depreciation&quot; are routine accounting
            terms rather than expressions of negative emotion.
          </p>
          <p className={BODY}>
            <span className={T}>Domain-adapted language models</span> classify subtle shifts in management
            tone, hedging language during analyst question-and-answer sessions, and newly added risk-factor
            disclosures.
          </p>
        </div>
        <div className={FIG}>
          <FilingRetrieval />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            <span className={T}>Retrieval-augmented generation</span> allows analysts to query hundreds of
            bond indentures or credit agreements simultaneously while requiring every extracted covenant or
            ratio to <span className="text-[var(--accent)]">cite its exact page and table</span>.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            All arithmetic calculations and financial ratios are delegated to deterministic spreadsheet or
            code tools rather than computed through next-token prediction.
          </p>
        </div>
      </Slide>

      {/* Discussion: Designing a Small-Business Cash-Flow Underwriting System */}
      <Slide id="discussion-cash-flow" border align="left">
        <Head1>Discussion: Designing a Small-Business Cash-Flow Underwriting System</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A commercial bank wants to automate working-capital
          loan decisions up to 100,000 dollars for small restaurants and independent retailers that have
          sparse credit bureau histories. The proposed system combines a gradient-boosted tree model trained
          on daily point-of-sale revenue feeds and bank account balances with a language model that reads
          commercial lease agreements. What reject-inference and data-leakage risks must the modeling team
          address, and how should duties be divided between the tabular model, the language model, and human
          underwriters?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="Explainability, Fair Lending, and Regulatory Compliance"
        lines={[
          "Financial services are among the most heavily regulated industries in the economy because credit access and payment stability affect households and systemic solvency.",
          "An accurate financial model cannot be deployed in production unless it satisfies legal requirements for explainability, fair lending, and independent model risk governance.",
        ]}
      />

      {/* The Accuracy-Interpretability Trade-Off and Feature Attribution */}
      <Slide id="feature-attribution" border align="left">
        <Head1>The Accuracy-Interpretability Trade-Off and Feature Attribution</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Inherently interpretable models</span>, such as linear credit scorecards and
            monotonic decision trees, allow auditors to read the exact weight and direction of every input
            variable directly from the model specification.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>High-capacity models</span>, such as deep neural networks and large tree
            ensembles, often achieve stronger predictive accuracy on complex datasets but behave as black
            boxes if unassisted.
          </p>
        </div>
        <div className={GRID2}>
          <p className={BODY}>
            To bridge this gap, financial teams use post-hoc explainability methods, most commonly{" "}
            <span className={T}>Shapley additive explanations (SHAP)</span>, to compute local feature
            attributions for individual predictions.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            A <span className="text-[var(--accent)]">local feature attribution</span> decomposes a specific
            applicant&apos;s predicted default score into the positive or negative contribution of each input
            variable, such as debt-to-income ratio or recent overdraft count.
          </p>
        </div>
        <div className={FIG}>
          <ShapWaterfall />
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl border-t border-[var(--ink)]/10 pt-6`}>
          Risk committees often constrain tree ensembles with <span className={T}>monotonicity rules</span>{" "}
          so a borrower&apos;s credit score can never decrease when their income rises or their delinquency
          count falls.
        </p>
      </Slide>

      {/* Adverse Action Notices and Proxy Discrimination */}
      <Slide id="proxy-discrimination" border align="left" exercise={exercise["proxy-discrimination"]}>
        <Head1>Adverse Action Notices and Proxy Discrimination</Head1>
        <div className={GRID3}>
          <p className={BODY}>
            Fair lending laws, such as the Equal Credit Opportunity Act in the United States and comparable
            provincial and federal rules in Canada, govern how credit models treat applicants.
          </p>
          <p className={BODY}>
            Whenever a lender denies credit or offers worse terms based on a model score, the lender must
            provide an <span className={T}>adverse action notice</span> stating the specific, accurate
            principal reasons for the decision.
          </p>
          <p className={BODY}>
            Fair lending statutes also prohibit both <span className={T}>disparate treatment</span>{" "}
            (explicitly using protected attributes such as race, sex, religion, or marital status) and
            unjustified <span className={T}>disparate impact</span>.
          </p>
        </div>
        <div className={FIG}>
          <ProxyPath />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            <span className="text-[var(--accent)]">Proxy discrimination</span> occurs when a model excludes
            protected attributes from its feature table, but learns to rely on correlated variables, such as
            postal code or school attended, that act as statistical stand-ins for protected groups.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Compliance teams must test underwriting models for disparate approval rates across demographic
            groups and remove or constrain features that create discriminatory proxy effects without strong
            business necessity.
          </p>
        </div>
      </Slide>

      {/* Model Risk Management and Independent Validation */}
      <Slide id="model-risk" border align="left">
        <Head1>Model Risk Management and Independent Validation</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Banking regulators oversee algorithmic decision systems through formal{" "}
          <span className={T}>Model Risk Management (MRM)</span> frameworks, including Federal Reserve SR
          11-7 and Canada&apos;s OSFI Guideline E-23.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Model risk</span> is the potential for financial loss, incorrect reporting,
              or regulatory sanction caused by errors in a model&apos;s design, data inputs, implementation,
              or managerial use.
            </p>
            <p className={BODY}>
              Supervisory guidelines require every financial institution to maintain an enterprise model
              inventory that classifies every deployed model by materiality and risk tier.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            Before a high-materiality model enters production, an{" "}
            <span className={T}>independent validation team</span>, structurally separate from the developers
            who built the model, must audit its theory, code, data lineage, and edge-case behavior.
          </p>
        </div>
        <Verdict>
          Using a third-party vendor API or an external foundation model{" "}
          <span className="text-[var(--accent)]">does not transfer accountability</span>: the regulated
          institution remains legally responsible for validating and monitoring the system.
        </Verdict>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Stress-Testing, Regime Shifts, and Tail Events"
        lines={[
          "A financial model validated on several years of calm economic data can fail rapidly when inflation, interest rates, or asset liquidity shift outside the historical training range.",
          "Managing financial AI requires stress-testing systems against macroeconomic regime shifts, extreme tail events, and systemic market feedback loops.",
        ]}
      />

      {/* Regime Shifts and Structural Breaks in Financial Markets */}
      <Slide id="regime-shifts" border align="left" exercise={exercise["regime-shifts"]}>
        <Head1>Regime Shifts and Structural Breaks in Financial Markets</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Standard cross-validation assumes that the joint probability distribution of features and
            outcomes remains stationary over time.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Financial economies experience <span className={T}>regime shifts</span>, which are structural
            breaks caused by monetary policy changes, recessions, regulatory reforms, or credit crunches that
            alter historical relationships.
          </p>
        </div>
        <div className={FIG}>
          <RegimeShift />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            A mortgage or auto-loan model trained between 2012 and 2021 operated in an environment of
            near-zero interest rates and rising collateral values, causing it to underestimate defaults when
            interest rates rose sharply in 2022 and 2023.
          </p>
          <p className={BODY}>
            During a crisis regime, historical correlations across borrower segments and asset classes break
            down: risks that appeared independent during normal periods move together simultaneously.
          </p>
          <p className={BODY}>
            Risk models must therefore be evaluated across{" "}
            <span className="text-[var(--accent)]">multiple historical economic cycles</span> rather than on
            a random split of recent observations from a single expansion.
          </p>
        </div>
      </Slide>

      {/* Tail Risk, Scenario Analysis, and Reverse Stress-Testing */}
      <Slide id="tail-risk" border align="left">
        <Head1>Tail Risk, Scenario Analysis, and Reverse Stress-Testing</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Tail risk</span> refers to rare, extreme market or credit events at the far
            end of a loss distribution that occur infrequently in historical samples but threaten
            institutional survival when they happen.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Because recent training data rarely contain a severe financial crisis, relying solely on
            historical backtesting leaves an institution blind to tail losses.
          </p>
        </div>
        <div className={FIG}>
          <TailRisk />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Scenario stress-testing</span> evaluates how a firm&apos;s models and capital
            reserves perform under severe, hypothetical forward-looking shocks, such as a simultaneous spike
            in unemployment, interest rates, and commercial real estate vacancies.
          </p>
          <p className={BODY}>
            <span className={T}>Reverse stress-testing</span> inverts the question: analysts start from a
            catastrophic outcome, such as insolvency or a liquidity freeze, and identify what combination of
            economic conditions and model failures would produce it.
          </p>
          <p className={BODY}>
            Stress-test results guide management in setting conservative credit cutoffs, capital buffers, and
            portfolio concentration limits{" "}
            <span className="text-[var(--accent)]">before a downturn occurs</span>.
          </p>
        </div>
      </Slide>

      {/* Systemic Herding and Kill-Switch Governance */}
      <Slide id="herding-kill-switch" border align="left">
        <Head1>Systemic Herding and Kill-Switch Governance</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          When a single model makes an isolated error in retail marketing, the effect is confined to one
          campaign, whereas correlated model behavior in finance can destabilize an entire market.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            <span className={T}>Algorithmic herding</span> occurs when multiple banks, hedge funds, or
            automated market makers rely on similar risk models, data feeds, or pre-trained foundation models.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            If an external shock triggers identical sell signals or credit-line reductions across many
            institutions at the same moment, market liquidity vanishes and asset prices fall in a
            self-reinforcing loop.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            To prevent runaway losses, automated financial systems require hard operational guardrails outside
            the model itself, including position limits, maximum daily approval caps, and volatility circuit
            breakers.
          </p>
          <p className={BODY}>
            Every automated trading or underwriting pipeline must include an immediate{" "}
            <span className="text-[var(--accent)]">manual kill switch</span> that halts model execution and
            reverts to conservative human or rule-based controls when inputs move outside validated bounds.
          </p>
        </div>
      </Slide>

      {/* Discussion: Deploying an Automated Underwriting Model Across Economic Cycles */}
      <Slide id="discussion-auto-lender" border align="left">
        <Head1>Discussion: Deploying an Automated Underwriting Model Across Economic Cycles</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A national auto lender trained a gradient-boosted
          underwriting model on loans originated between 2021 and 2023, a period of elevated used-vehicle
          prices and low unemployment. In 2026, used-vehicle collateral values decline by 22 percent and
          regional unemployment rises, causing actual portfolio credit losses to exceed the model&apos;s
          predictions by 40 percent. Which specific components of expected loss (PD, EAD, LGD) broke down,
          how should the model risk team redesign validation and stress-testing, and what automated circuit
          breakers should govern loan approvals during macroeconomic regime shifts?
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <ol className="mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 md:grid-cols-2">
          {[
            "Financial AI operates under strict domain constraints: severe error cost asymmetry, millisecond payment latency budgets, legally mandated explainability, and non-stationary markets.",
            "Credit underwriting decomposes risk into probability of default, exposure at default, and loss given default, while machine learning models must account for non-linear interactions and reject inference bias.",
            "Real-time fraud detection manages extreme class imbalance and adversarial drift by combining supervised classifiers, unsupervised anomaly detection, graph networks, and step-up authentication.",
            "Because public asset returns have a low signal-to-noise ratio, financial machine learning must guard against backtest overfitting and achieves its most reliable gains in trade execution, risk modeling, and retrieval-grounded document analysis.",
            "Regulatory compliance requires local feature attributions, accurate adverse action notices, testing for proxy discrimination across protected groups, and independent model risk validation.",
            "Models trained during calm economic expansions fail during structural regime shifts, requiring forward-looking stress testing, concentration limits, and manual kill switches to protect institutional solvency.",
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
