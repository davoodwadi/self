---
topic: Behavioral Auditing and Statistical Evaluation of AI Systems
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week4
---

## Title Slide
- Week 4
- Reliable algorithmic governance replaces single-prompt anecdotes with statistically grounded behavioral audits using Monte-Carlo sampling, exact token-level distributions, and controlled factorial experiments.

## From Anecdotal Prompts to Scientific Behavioral Audits [no-exercise]
- When an organization evaluates a foundation model for customer-facing deployment, testing a handful of prompts and inspecting the generated answers is not an audit.
- Anecdotal prompting cannot tell a manager whether an observed error is a rare tail event or the model's dominant tendency, nor can it separate the effect of a suspect attribute from the wording of the prompt.
- Behavioral auditing applies the experimental and statistical methods of behavioral science to artificial intelligence systems, treating the model as a decision-making subject whose preferences, biases, and consistency are measured with known precision.
- Depending on whether the model produces open-ended numerical or text outputs in a black-box interface or evaluates structured scales with accessible token probabilities, auditors use two complementary frameworks: Monte-Carlo sampling and exact probability mass function analysis.

## Why Single-Prompt Evaluations Fail [no-exercise]
- Standard machine learning leaderboards rely on pass-at-one evaluation, which draws a single completion per test item and scores whether that single output is correct.
- At non-zero sampling temperatures, a language model defines a probability distribution over many possible completions, so a single draw is a sample of size one from a high-entropy distribution.
- Drawing a conclusion about a model's bias, safety, or pricing accuracy from a single completion commits the same statistical error as surveying a single consumer to estimate market demand.
- Furthermore, open-ended text generation is prone to fence-sitting, in which a model produces evasive disclaimers rather than revealing the latent preference that governs its downstream choices.

## Part 1: The Monte-Carlo Sampling Framework for Open-Ended Decisions [no-exercise]
- When a model generates open-ended quantities or multi-token decisions, such as willingness-to-pay dollar estimates, product recommendations, or negotiation offers, its full output distribution over multi-token sequences cannot be read off a single token's vocabulary probabilities.
- In these settings, the Monte-Carlo behavioral evaluation framework estimates the model's true expected behavior by drawing repeated independent samples under controlled conditions (Wadi & Fredette, 2025).

## Stochastic Generation and Response Entropy [no-exercise]
- Given a prompt p, a reference benchmark y, and a stochastic language model operating at temperature T, each generated response r is a random draw from the model's conditional distribution.
- An evaluation function f(p, y, r) maps each generated response to a quantitative behavioral outcome, such as the dollar price quoted or an indicator of whether a sponsored product was chosen.
- The true behavioral parameter of interest is the expected value of f(p, y, r) over the model's response distribution, alongside its variance across repeated draws.
- Because different models and tasks exhibit widely different levels of response entropy, comparing two models on a single draw confounds true behavioral differences with random sampling noise.

## The Monte-Carlo Estimator and Its Statistical Guarantees [no-exercise]
- The Monte-Carlo estimator computes the sample mean of the evaluation function across K independent and identically distributed responses drawn from the model for the same prompt condition (Wadi & Fredette, 2025).
- By Theorem 1 of the framework, this sample mean is an unbiased estimator of the model's true expected behavior under that prompt condition.
- By Theorem 2, the variance of the estimator decays in inverse proportion to the sample size K, converging to zero as K grows large.
- By the central limit theorem corollary, the sampling distribution of the estimator converges to a normal distribution with standard error equal to the response standard deviation divided by the square root of K, enabling exact confidence intervals and hypothesis tests.

## Behavioral Validity Metrics: CSVR, APD, and Coefficient of Variation [exercise]
- Common Sense Validity Rate (CSVR) measures task adherence and plausibility: the proportion of sampled responses that fall within the empirically valid range for the product category, filtering out hallucinations and formatting failures.
- Absolute Price Deviation (APD) measures estimation error: the absolute difference between the model's stated willingness to pay and the product's actual market list price.
- Coefficient of Variation (CV), defined as the standard deviation of the sampled responses divided by their mean, measures within-model behavioral instability across repeated runs of the identical prompt.
- A model is suitable for autonomous commercial deployment only when it simultaneously achieves a high validity rate, a low deviation from normative benchmarks, and a low coefficient of variation.

## Anchoring Bias and Generational Regression in LLMs [no-exercise]
- Applying the Monte-Carlo framework (K = 100 samples per condition across 16 models and 6 product categories) to Ariely, Loewenstein, and Prelec's (2003) anchoring paradigm reveals that language models are strongly susceptible to arbitrary numerical anchors (Wadi & Fredette, 2025).
- Exposing models to a high arbitrary anchor raised mean willingness to pay by 31.62 dollars, whereas a low anchor reduced it by 15.70 dollars, with a mean anchor-response correlation of 0.697 that exceeded the human benchmark of 0.388.
- Crucially, a three-way interaction among parameter count, model generation, and anchoring condition demonstrated a generational performance regression: newer and larger models exhibited larger pricing deviations and greater susceptibility to anchoring than earlier generations from the same providers.
- Governance teams therefore cannot assume that upgrading to a newer or larger foundation model will reduce cognitive biases in commercial decision tasks.

## Part 2: Exact Token-Level Probability Distributions for Rating Scales [no-exercise]
- While Monte-Carlo sampling is necessary for multi-token open-ended outputs, many behavioral and fairness audits administer structured psychometric instruments, such as 1-to-7 Likert scales or discrete choice options.
- When the response is a single ordinal token and the model's next-token probabilities (logprobs) are accessible, text sampling is unnecessary and introduces avoidable epistemic sampling error (Wadi, Ghodrat, & Philp, 2026).

## Why Text Sampling Is Redundant When Token Probabilities Are Observable [no-exercise]
- In human behavioral research, scientists draw random samples of respondents because the true probability distribution of attitudes inside a human population cannot be observed directly.
- A language model, by contrast, computes an exact deterministic conditional probability mass function (PMF) over its entire vocabulary before any token is sampled.
- Generating text completions from a Likert prompt simply draws random samples from a discrete distribution that the model has already computed exactly.
- Reading the token-level PMF directly eliminates epistemic sampling error, requires only a single forward pass per item rather than dozens of sampled completions, and captures the exact aleatoric uncertainty of the model's internal state (Wadi, Ghodrat, & Philp, 2026).

## Why Shannon Entropy Fails on Ordinal Rating Scales [exercise]
- Standard machine learning evaluations use Shannon entropy to measure uncertainty across a model's predicted token probabilities.
- Shannon entropy treats all tokens as unordered nominal categories, meaning it is invariant to the numerical distance between scale points.
- Under Shannon entropy, a model that splits its probability mass equally between 1 (Strongly Disagree) and 7 (Strongly Agree) has the exact same entropy as a model that splits its mass equally between 3 (Somewhat Disagree) and 4 (Neutral).
- Yet those two distributions represent opposite behavioral states: the first model is maximally polarized at the extremes of the scale, whereas the second holds a concentrated, moderate attitude.

## The Three-Layer Exact-PMF Pipeline: Constraint, Consensus, and Construct [exercise]
- Layer 1 is the Constraint layer, which sums the raw probability mass assigned to valid scale tokens (such as the digits 1 through 7), defines the complement as the model's task failure rate, and renormalizes the valid probabilities into an exact ordinal item PMF (Wadi, Ghodrat, & Philp, 2026).
- Layer 2 is the Consensus layer, which computes a multivariate ordinal consensus metric (extending Tastle & Wierman, 2007) that penalizes probability spread in proportion to Euclidean distance on the ordinal scale, distinguishing concentrated agreement from extreme polarization.
- Layer 3 is the Construct layer, which combines item-level PMFs into a composite multi-item scale distribution and decomposes variance across experimental factors using distributional analysis of variance.
- Together, the three layers ensure that an auditor never interprets a model's attitudinal score without first verifying that the model adhered to the scale constraints and formed a coherent ordinal position.

## Discussion: Sampling Versus Exact Probabilities
- Discussion: An enterprise governance team wants to audit two candidate models across 500 customer fairness scenarios. Model A is hosted on an internal server that exposes full next-token log-probabilities, while Model B is accessed through a commercial chat interface that returns only sampled text completions. How should the team design the evaluation protocol for each model, and what trade-offs in cost, precision, and construct coverage arise between the two approaches?

## Part 3: Distributional ANOVA and Hoeffding Decomposition [no-exercise]
- Psychometric constructs such as ethnocentrism, brand trust, or algorithm aversion are measured with multi-item scales rather than single questions, because single items are noisy and narrow.
- To preserve the full uncertainty of the model across all K items of a scale, the Construct layer replaces arithmetic averaging of sampled numbers with exact probability convolution and orthogonal factor decomposition (Wadi, Ghodrat, & Philp, 2026).

## Convolving Item Distributions Into a Composite Construct Score [no-exercise]
- Because each item k in a scale is administered in an isolated context window under experimental condition lambda, the item responses are conditionally independent given the condition.
- By probability theory, the exact probability mass function of the sum of K independent discrete random variables is given by the discrete convolution of their individual item PMFs.
- Convolving the K item PMFs produces the exact probability distribution of the composite scale score without collapsing item-level uncertainty into a single mean.
- This composite distribution propagates all token-level aleatoric uncertainty forward into the factor-level comparisons.

## Hoeffding Decomposition of Main Effects and Interactions [no-exercise]
- In a fully crossed factorial experiment, the composite construct score depends on multiple factors, such as the model tested, the target demographic or country, and the framing of the instruction.
- Using Hoeffding decomposition, the composite score distribution is decomposed into an overall grand mean, isolated main effects for each factor, and two-way or higher-order interaction effects (Wadi, Ghodrat, & Philp, 2026).
- Theorem 1 of the exact-PMF framework proves that the expected values of these decomposed random variables equal the classical fixed-effect parameters of traditional human Analysis of Variance (ANOVA), while retaining the full probability distribution of each effect.

## Four Distributional Inference Metrics: Mean Shift, Dispersion, dPD, and SNR [exercise]
- Expected Effect Size (Mean Shift) is the expected value of the decomposed effect distribution, quantifying the exact magnitude and direction by which a factor level or interaction shifts the composite scale score.
- Predictive Dispersion (SD) is the standard deviation of the effect distribution, capturing the model's intrinsic aleatoric uncertainty around that shift.
- Discrete Probability of Direction (dPD) is the total probability mass of the effect distribution that lies strictly on the dominant side of zero (plus half the mass at zero), measuring the certainty of the effect's sign on a scale from 0.50 to 1.00.
- Signal-to-Noise Ratio (SNR), defined as the absolute mean shift divided by predictive dispersion, measures whether the systematic shift exceeds the model's internal probabilistic noise.

## Part 4: Designing Controlled Factorial Choice and Rating Experiments [no-exercise]
- Statistical sophistication in the analysis stage cannot rescue a confounded experimental design.
- Whether an audit uses Monte-Carlo sampling or exact token PMFs, isolating the cause of an algorithmic bias requires controlled factorial experimentation.

## Why Isolated Vignettes Cannot Isolate Causes [no-exercise]
- Many published AI evaluations test bias using a small set of handwritten story vignettes that vary several attributes at once, such as comparing a software engineer named John in Boston with a nurse named Maria in Miami.
- When a model responds differently to those two vignettes, the auditor cannot determine whether the difference was caused by gender, ethnicity, occupation, city, or their interaction.
- In consumer and market audits, similarly, testing real brand names in uncrossed scenarios confounds country of origin with brand equity, price tier, and historical market share.

## Fully Crossed Factorial Designs and Context Isolation [no-exercise]
- A fully crossed factorial design specifies two or more independent factors, each with defined levels, and tests every possible combination of factor levels across the design grid.
- Orthogonality across factors guarantees that the main effect of each factor and every interaction effect can be estimated independently of all other manipulated variables.
- Unlike human participants, who remember previous questions and suffer from fatigue, boredom, and within-subject carryover effects, language models are stateless across separate API calls.
- Context isolation exploits this statelessness by resetting the context window before every single item and condition, eliminating carryover contamination across experimental trials.

## Controlling Prompt Sensitivity, Order Effects, and Framing [exercise]
- Prompt template counterbalancing tests each experimental condition across multiple semantically equivalent phrasings and instruction templates to verify that findings are not artifacts of a single wording.
- Scale direction and polarity counterbalancing includes both positively worded and reverse-coded scale items, or reverses option presentation order, to separate substantive attitude from acquiescence or first-option bias.
- Position randomization shuffles the order of product listings and attribute rows across experimental sessions so that list-position bias does not confound attribute weight estimates.
- Attribute matching holds all non-manipulated product attributes, such as price, warranty, and star rating, constant across conditions so that any change in choice probability is attributable solely to the manipulated factor.

## Part 5: Enterprise Pre-Deployment and Post-Deployment Auditing Workflows [no-exercise]
- In an enterprise governance system, behavioral auditing is not a one-time academic exercise. It is a recurring gate in the model lifecycle.
- Organizations distinguish exploratory red-teaming from systematic behavioral auditing and maintain continuous monitoring after launch.

## Pre-Deployment Red-Teaming Versus Behavioral Auditing [exercise]
- Adversarial red-teaming is an exploratory stress test in which human specialists or automated attacker models probe a system with extreme, jailbreak, or edge-case inputs to discover worst-case safety failures.
- Behavioral auditing is a systematic, statistically powered evaluation across a representative factorial grid that measures average bias, variance, task adherence, and effect sizes under normal commercial operating conditions.
- Red-teaming establishes whether a system can be broken by a determined adversary (existence of a vulnerability), whereas behavioral auditing establishes how the system treats customer segments across thousands of routine interactions (distribution of market behavior).
- Responsible release sign-off requires both: red-teaming to bound catastrophic tail risks, and behavioral auditing to certify fairness and decision reliability.

## Six Steps of an Enterprise Behavioral Audit [exercise]
- Step 1 is defining the target construct, the decision context, and the normative governance threshold, such as zero sponsorship penalty divergence or parity across demographic profiles.
- Step 2 is constructing the fully crossed factorial design grid, specifying the focal factors (such as demographic cues, anchors, or role assignments) and nuisance factors to counterbalance.
- Step 3 is selecting the measurement protocol: exact token-level PMFs for single-token ordinal scales and discrete choices, or Monte-Carlo sampling with sample size K chosen to achieve the required confidence interval width for open-ended outputs.
- Step 4 is executing the trials under strict context isolation, recording model version identifiers, sampling parameters, and system prompts.
- Step 5 is evaluating the constraint and validity layer first (CSVR or token failure rate) and computing ordinal consensus or response CV before interpreting main effects and interactions.
- Step 6 is comparing effect sizes, dPD, and SNR against governance release gates, documenting failures in the model dossier, and re-testing after mitigation.

## Continuous Post-Deployment Drift Monitoring and Version Pinning [no-exercise]
- A behavioral audit certifies only the exact combination of model checkpoint, tokenizer, system prompt, and retrieval pipeline that was tested.
- Because foundation model providers frequently update hosted weights, safety filters, or quantization settings behind API endpoints, and because newer model generations can regress on behavioral stability (Wadi & Fredette, 2025), enterprise deployments pin exact model version snapshots.
- Whenever a provider deprecates a snapshot, or when the deploying firm edits its system prompt or product catalog schema, the automated behavioral audit suite must run again before the update reaches production traffic.

## Discussion: The Model Upgrade Regression
- Discussion: An e-commerce platform's engineering team proposes upgrading its customer-facing price-comparison assistant from last year's 30-billion-parameter model to a newly released 70-billion-parameter model that scores 14 points higher on standard coding and reasoning leaderboards. Before approving the switch, what behavioral audit evidence should the governance board require, why might the newer model perform worse on the platform's pricing task, and how should the release gate be structured?

## Key Takeaways
- Single-prompt (pass-at-one) evaluations fail as a governance standard because stochastic language models exhibit high response entropy and framing sensitivity.
- For open-ended numerical and text decisions, the Monte-Carlo framework (Wadi & Fredette, 2025) provides an unbiased estimator whose variance decays as 1/K and whose asymptotic normality enables exact confidence intervals.
- Behavioral validity requires checking Common Sense Validity Rate (CSVR), Absolute Price Deviation (APD), and Coefficient of Variation (CV). Empirical audits show that LLMs suffer strong anchoring bias and can regress across newer model generations.
- For structured Likert scales and discrete choices with accessible log-probabilities, reading the exact token-level PMF eliminates sampling error entirely (Wadi, Ghodrat, & Philp, 2026).
- Because Shannon entropy ignores ordinal scale distances, exact-PMF audits use a three-layer pipeline: Constraint (task failure rate), Consensus (distance-weighted ordinal agreement), and Construct (discrete convolution and Hoeffding ANOVA decomposition).
- Controlled factorial experiments exploit LLM statelessness for context isolation and counterbalance prompt phrasing, scale polarity, and list position.
- Enterprise governance combines exploratory red-teaming with systematic behavioral audits and re-runs the audit suite whenever model weights, prompts, or interfaces change.
