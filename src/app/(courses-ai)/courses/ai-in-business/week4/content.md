---
topic: "AI in Finance"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week4"
---

## Title Slide
- Week 4
- Financial institutions use artificial intelligence to price credit risk, detect fraud in milliseconds, and extract market signals under strict explainability and stability constraints.

## Risk, Return, and Asymmetric Information in Finance [no-exercise]
- Core financial decisions, including lending, payment authorization, insurance underwriting, and asset allocation, require pricing uncertain future cash flows.
- These decisions are made under asymmetric information, because a borrower or counterparty knows more about their true repayment capacity and intent than the institution does.
- Financial institutions have used statistical scorecards for decades to estimate default risk and set capital reserves from structured accounting records.
- Modern machine learning extends financial modeling to high-dimensional transaction streams, network graphs, and unstructured corporate disclosures.
- However, higher predictive complexity introduces new governance demands when models allocate credit or execute trades automatically.

## Distinctive Constraints of Financial AI [exercise]
[figure: comparison of operating requirements between consumer web AI and regulated financial AI across latency, error cost asymmetry, legal explainability, and non-stationary markets]
- Deploying artificial intelligence in finance is governed by four constraints that are stricter than in most consumer applications.
- First, error costs are highly asymmetric: the interest margin earned on twenty repaid loans can be wiped out by a single principal default.
- Second, payment and trading systems operate under strict latency budgets measured in milliseconds rather than seconds.
- Third, financial regulators require institutions to explain the specific reasons behind adverse credit decisions and to validate models independently before deployment.
- Fourth, financial markets are non-stationary and adversarial, meaning that historical statistical patterns shift as competitors, fraudsters, and macroeconomic conditions adapt.

## Part 1: Credit Risk Modeling and Underwriting Automation [no-exercise]
- Lending is the foundational prediction problem in banking: deciding whether to extend credit, how much to lend, and what interest rate compensates for risk.
- Machine learning and alternative data sources allow lenders to evaluate borrowers more granularly than traditional credit bureau scorecards, while introducing new statistical challenges.

## Probability of Default, Loss Given Default, and Expected Loss [no-exercise]
[figure: expected credit loss pipeline decomposing loan portfolio risk into probability of default, exposure at default, and loss given default]
- Credit risk management separates the expected financial loss on a loan into three distinct components that are estimated separately.
- Probability of default (PD) is the likelihood that a borrower will fail to meet scheduled debt obligations over a fixed horizon, typically twelve months.
- Exposure at default (EAD) is the total dollar balance the lender expects to be outstanding at the moment default occurs, including drawn credit lines.
- Loss given default (LGD) is the fraction of that exposure that the lender cannot recover after liquidating collateral and completing collection efforts.
- Multiplying these three quantities yields expected loss ($\text{EL} = \text{PD} \times \text{EAD} \times \text{LGD}$), which determines both risk-based loan pricing and required loss provisions.

## Traditional Scorecards Versus Machine Learning Underwriting [exercise]
[figure: side-by-side comparison of a linear logistic regression credit scorecard and a gradient-boosted tree model capturing non-linear borrower interactions]
- Traditional credit scorecards use logistic regression on a small set of credit bureau variables, assigning fixed point values to buckets of credit utilization, account age, and past delinquencies.
- Linear scorecards are transparent and easy to audit, but they assume that each variable affects default risk independently and monotonically.
- Tree-based ensemble models, such as gradient-boosted decision trees, capture non-linear relationships and interaction effects across hundreds of borrower attributes.
- For example, high monthly credit card spending indicates low default risk when paired with full monthly repayment, but high default risk when paired with rising revolving balances.
- Moving from linear scorecards to tree ensembles improves default discrimination, especially for borderline applicants, but requires post-hoc attribution tools to explain individual decisions.

## Alternative Credit Data and Reject Inference [no-exercise]
[figure: sample selection diagram showing observed repayment outcomes for approved applicants versus missing outcomes for rejected applicants in historical lending data]
- Millions of consumers and young small businesses are credit-invisible or have thin credit files because they have little history of traditional bank loans.
- Alternative credit data use permissioned bank-account cash flows, recurring rent and utility payments, and invoicing records to assess repayment capacity outside bureau reports.
- Incorporating new applicant populations exposes lenders to a statistical bias known as the reject inference problem.
- Historical loan datasets record repayment or default outcomes only for applicants who were approved under past underwriting rules, while the true outcomes of rejected applicants remain unobserved.
- If a machine learning model is trained naively on approved borrowers alone, it can misjudge default risk when applied to previously rejected segments unless the institution corrects for sample selection.

## Part 2: Real-Time Fraud Detection and Payment Security [no-exercise]
- Global payment networks process tens of thousands of card and wire transactions per second, deciding instantly whether to approve or block each payment.
- Fraud detection models must identify rare, evolving attacks within milliseconds without blocking the legitimate commerce of everyday cardholders.

## Extreme Class Imbalance and Precision-Recall Trade-Offs [exercise]
[figure: interactive precision-recall curve for payment fraud detection showing how shifting the risk threshold trades off false declines against unblocked fraud]
- Payment fraud detection operates under extreme class imbalance, where fraudulent transactions often represent fewer than 0.1 percent of all payment attempts.
- Under extreme class imbalance, overall classification accuracy is an uninformative metric: a model that approves every single transaction achieves 99.9 percent accuracy while stopping zero fraud.
- Fraud teams instead evaluate models using precision (the proportion of flagged transactions that are truly fraudulent) and recall (the proportion of all actual fraud cases caught by the model).
- Lowering the decision threshold increases recall by catching more fraud, but decreases precision by falsely declining more legitimate cardholders.
- Because false declines cost merchants lost sales and drive frustrated customers to competing cards, banks calibrate thresholds to minimize total economic cost rather than fraud losses alone.

## Supervised, Unsupervised, and Graph Models in Fraud Prevention [exercise]
[figure: transaction network graph connecting payment accounts, device identifiers, IP addresses, and merchants to reveal a coordinated fraud ring]
- Modern fraud engines combine three modeling approaches in a layered defense: supervised classifiers, unsupervised anomaly detectors, and graph models.
- Supervised models trained on confirmed historical chargebacks recognize known fraud patterns, such as rapid card-testing purchases at online electronics retailers.
- Unsupervised anomaly detection flags transactions that deviate sharply from an individual cardholder's baseline spending location, time of day, and merchant category, catching novel attack methods.
- Graph machine learning represents accounts, payment cards, device fingerprints, and bank routing numbers as nodes linked by shared attributes and money transfers.
- Graph algorithms detect organized synthetic-identity rings and money-laundering mule networks that appear normal when each account is scored in isolation.

## Latency Budgets and Adversarial Drift in Payment Systems [no-exercise]
- A point-of-sale payment authorization must return an approve-or-decline decision within 50 to 150 milliseconds, leaving no time for slow database joins or large generative model calls.
- Production fraud pipelines rely on streaming feature stores that continuously pre-compute velocity features, such as the number of distinct merchants charged by a card in the past ten minutes.
- Unlike physical equipment failures, fraud exhibits adversarial drift: criminal groups actively test payment thresholds and modify their tactics as soon as a pattern is blocked.
- When a transaction receives an intermediate risk score, payment systems use step-up authentication, prompting the cardholder for biometric or one-time-code verification on their phone.
- Confirmed fraud reports and customer verification responses feed back into the training pipeline to update model weights against newly observed attack vectors.

## Part 3: Financial Forecasting, Trading, and Unstructured Filings [no-exercise]
- Beyond credit and payments, financial institutions apply AI to forecast corporate cash flows, optimize trade execution, and analyze unstructured market disclosures.
- Successfully applying machine learning in capital markets requires respecting how competitive market pricing differs from physical or consumer environments.

## Low Signal-to-Noise Ratios and Backtest Overfitting [exercise]
[figure: comparison of in-sample backtest performance versus out-of-sample live performance when multiple trading models are screened on noisy historical returns]
- Predicting public asset returns is fundamentally harder than predicting retail demand or image labels because market participants immediately trade on predictable patterns, driving the signal toward zero.
- As a result, financial return series exhibit a very low signal-to-noise ratio, where genuine predictive relationships are small relative to random price fluctuations.
- Backtest overfitting occurs when researchers test dozens or hundreds of model variations on historical price data and select the version that showed the highest past return.
- Even if every candidate model has zero true predictive power, the best-looking backtest will appear profitable purely by chance, and will lose money when deployed in live markets.
- Rigorous financial modeling requires strict walk-forward validation, out-of-sample holdout periods, and statistical adjustments for the total number of strategies tested.

## Execution Algorithms and Portfolio Risk Optimization [no-exercise]
- While predicting future asset prices is difficult, machine learning delivers reliable operational gains in trade execution, cash-flow forecasting, and portfolio risk estimation.
- When an institutional fund buys or sells a large block of shares, executing the entire order at once pushes the market price against the fund, a cost known as market impact.
- Algorithmic execution systems use supervised and reinforcement learning to split a large parent order into small child orders scheduled across venues and time intervals to minimize transaction costs.
- In corporate treasury, machine learning forecasts daily working-capital cash inflows and outflows across subsidiaries to reduce idle cash balances and short-term borrowing costs.
- In portfolio management, models estimate time-varying return correlations and liquidity risk so managers can rebalance exposures before concentration limits are breached.

## Financial Sentiment and Retrieval over Unstructured Filings [no-exercise]
[figure: retrieval-augmented financial research workflow extracting risk disclosures, covenant terms, and verified financial ratios from 10-K filings and earnings transcripts]
- Institutional investors, credit analysts, and corporate development teams spend thousands of hours reading unstructured documents, including annual 10-K filings, loan agreements, and earnings call transcripts.
- General-purpose sentiment tools perform poorly on financial text because words such as "liability", "default", and "depreciation" are routine accounting terms rather than expressions of negative emotion.
- Domain-adapted language models classify subtle shifts in management tone, hedging language during analyst question-and-answer sessions, and newly added risk-factor disclosures.
- Retrieval-augmented generation allows analysts to query hundreds of bond indentures or credit agreements simultaneously while requiring every extracted covenant or ratio to cite its exact page and table.
- All arithmetic calculations and financial ratios are delegated to deterministic spreadsheet or code tools rather than computed through next-token prediction.

## Discussion: Designing a Small-Business Cash-Flow Underwriting System
- Discussion: A commercial bank wants to automate working-capital loan decisions up to 100,000 dollars for small restaurants and independent retailers that have sparse credit bureau histories. The proposed system combines a gradient-boosted tree model trained on daily point-of-sale revenue feeds and bank account balances with a language model that reads commercial lease agreements. What reject-inference and data-leakage risks must the modeling team address, and how should duties be divided between the tabular model, the language model, and human underwriters?

## Part 4: Explainability, Fair Lending, and Regulatory Compliance [no-exercise]
- Financial services are among the most heavily regulated industries in the economy because credit access and payment stability affect households and systemic solvency.
- An accurate financial model cannot be deployed in production unless it satisfies legal requirements for explainability, fair lending, and independent model risk governance.

## The Accuracy-Interpretability Trade-Off and Feature Attribution [no-exercise]
[figure: local feature attribution waterfall chart showing how each borrower attribute shifts a loan application's predicted default probability from the baseline rate]
- Inherently interpretable models, such as linear credit scorecards and monotonic decision trees, allow auditors to read the exact weight and direction of every input variable directly from the model specification.
- High-capacity models, such as deep neural networks and large tree ensembles, often achieve stronger predictive accuracy on complex datasets but behave as black boxes if unassisted.
- To bridge this gap, financial teams use post-hoc explainability methods, most commonly Shapley additive explanations (SHAP), to compute local feature attributions for individual predictions.
- A local feature attribution decomposes a specific applicant's predicted default score into the positive or negative contribution of each input variable, such as debt-to-income ratio or recent overdraft count.
- Risk committees often constrain tree ensembles with monotonicity rules so a borrower's credit score can never decrease when their income rises or their delinquency count falls.

## Adverse Action Notices and Proxy Discrimination [exercise]
[figure: causal diagram showing how an unprotected proxy variable such as neighborhood postal code or transaction merchant mix can encode a protected demographic attribute]
- Fair lending laws, such as the Equal Credit Opportunity Act in the United States and comparable provincial and federal rules in Canada, govern how credit models treat applicants.
- Whenever a lender denies credit or offers worse terms based on a model score, the lender must provide an adverse action notice stating the specific, accurate principal reasons for the decision.
- Fair lending statutes also prohibit both disparate treatment (explicitly using protected attributes such as race, sex, religion, or marital status) and unjustified disparate impact.
- Proxy discrimination occurs when a model excludes protected attributes from its feature table, but learns to rely on correlated variables, such as postal code or school attended, that act as statistical stand-ins for protected groups.
- Compliance teams must test underwriting models for disparate approval rates across demographic groups and remove or constrain features that create discriminatory proxy effects without strong business necessity.

## Model Risk Management and Independent Validation [no-exercise]
- Banking regulators oversee algorithmic decision systems through formal Model Risk Management (MRM) frameworks, including Federal Reserve SR 11-7 and Canada's OSFI Guideline E-23.
- Model risk is the potential for financial loss, incorrect reporting, or regulatory sanction caused by errors in a model's design, data inputs, implementation, or managerial use.
- Supervisory guidelines require every financial institution to maintain an enterprise model inventory that classifies every deployed model by materiality and risk tier.
- Before a high-materiality model enters production, an independent validation team, structurally separate from the developers who built the model, must audit its theory, code, data lineage, and edge-case behavior.
- Using a third-party vendor API or an external foundation model does not transfer accountability: the regulated institution remains legally responsible for validating and monitoring the system.

## Part 5: Stress-Testing, Regime Shifts, and Tail Events [no-exercise]
- A financial model validated on several years of calm economic data can fail rapidly when inflation, interest rates, or asset liquidity shift outside the historical training range.
- Managing financial AI requires stress-testing systems against macroeconomic regime shifts, extreme tail events, and systemic market feedback loops.

## Regime Shifts and Structural Breaks in Financial Markets [exercise]
[figure: multi-year timeline of interest rates and default rates illustrating how an underwriting model trained during a low-rate expansion underpredicts losses after a monetary regime shift]
- Standard cross-validation assumes that the joint probability distribution of features and outcomes remains stationary over time.
- Financial economies experience regime shifts, which are structural breaks caused by monetary policy changes, recessions, regulatory reforms, or credit crunches that alter historical relationships.
- A mortgage or auto-loan model trained between 2012 and 2021 operated in an environment of near-zero interest rates and rising collateral values, causing it to underestimate defaults when interest rates rose sharply in 2022 and 2023.
- During a crisis regime, historical correlations across borrower segments and asset classes break down: risks that appeared independent during normal periods move together simultaneously.
- Risk models must therefore be evaluated across multiple historical economic cycles rather than on a random split of recent observations from a single expansion.

## Tail Risk, Scenario Analysis, and Reverse Stress-Testing [no-exercise]
[figure: portfolio loss distribution contrasting everyday historical fluctuations with extreme tail-risk events evaluated through forward-looking stress scenarios]
- Tail risk refers to rare, extreme market or credit events at the far end of a loss distribution that occur infrequently in historical samples but threaten institutional survival when they happen.
- Because recent training data rarely contain a severe financial crisis, relying solely on historical backtesting leaves an institution blind to tail losses.
- Scenario stress-testing evaluates how a firm's models and capital reserves perform under severe, hypothetical forward-looking shocks, such as a simultaneous spike in unemployment, interest rates, and commercial real estate vacancies.
- Reverse stress-testing inverts the question: analysts start from a catastrophic outcome, such as insolvency or a liquidity freeze, and identify what combination of economic conditions and model failures would produce it.
- Stress-test results guide management in setting conservative credit cutoffs, capital buffers, and portfolio concentration limits before a downturn occurs.

## Systemic Herding and Kill-Switch Governance [no-exercise]
- When a single model makes an isolated error in retail marketing, the effect is confined to one campaign, whereas correlated model behavior in finance can destabilize an entire market.
- Algorithmic herding occurs when multiple banks, hedge funds, or automated market makers rely on similar risk models, data feeds, or pre-trained foundation models.
- If an external shock triggers identical sell signals or credit-line reductions across many institutions at the same moment, market liquidity vanishes and asset prices fall in a self-reinforcing loop.
- To prevent runaway losses, automated financial systems require hard operational guardrails outside the model itself, including position limits, maximum daily approval caps, and volatility circuit breakers.
- Every automated trading or underwriting pipeline must include an immediate manual kill switch that halts model execution and reverts to conservative human or rule-based controls when inputs move outside validated bounds.

## Discussion: Deploying an Automated Underwriting Model Across Economic Cycles
- Discussion: A national auto lender trained a gradient-boosted underwriting model on loans originated between 2021 and 2023, a period of elevated used-vehicle prices and low unemployment. In 2026, used-vehicle collateral values decline by 22 percent and regional unemployment rises, causing actual portfolio credit losses to exceed the model's predictions by 40 percent. Which specific components of expected loss ($\text{PD}$, $\text{EAD}$, $\text{LGD}$) broke down, how should the model risk team redesign validation and stress-testing, and what automated circuit breakers should govern loan approvals during macroeconomic regime shifts?

## Key Takeaways
- Financial AI operates under strict domain constraints: severe error cost asymmetry, millisecond payment latency budgets, legally mandated explainability, and non-stationary markets.
- Credit underwriting decomposes risk into probability of default, exposure at default, and loss given default, while machine learning models must account for non-linear interactions and reject inference bias.
- Real-time fraud detection manages extreme class imbalance and adversarial drift by combining supervised classifiers, unsupervised anomaly detection, graph networks, and step-up authentication.
- Because public asset returns have a low signal-to-noise ratio, financial machine learning must guard against backtest overfitting and achieves its most reliable gains in trade execution, risk modeling, and retrieval-grounded document analysis.
- Regulatory compliance requires local feature attributions, accurate adverse action notices, testing for proxy discrimination across protected groups, and independent model risk validation.
- Models trained during calm economic expansions fail during structural regime shifts, requiring forward-looking stress testing, concentration limits, and manual kill switches to protect institutional solvency.
