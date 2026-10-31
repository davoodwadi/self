---
topic: Transparency, Explainability, and Reasoning Traces
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week5
---

## Title Slide
- Week 5
- Governing opaque algorithms requires distinguishing intrinsic interpretability from post-hoc approximations, testing whether language-model reasoning traces are faithful to actual choices, and matching explanations to the decisions stakeholders must make.

## Why Opacity Is a Governance Problem [no-exercise]
[figure: input variables entering a sealed model whose internal routes are hidden, and decisions leaving it (a denied loan, a raised premium, a supplier crossed off a shortlist) with no visible link to the variables that drove them]
- Modern marketing and financial pipelines rely on gradient-boosted ensembles, deep neural networks, and billion-parameter language models whose internal computations cannot be inspected by reading a short formula.
- When an opaque model denies a loan, raises an insurance premium, or excludes a supplier from a procurement shortlist, neither the customer nor the manager can immediately see which variables drove the outcome.
- Opacity undermines three pillars of algorithmic governance: internal debugging of spurious correlations, regulatory verification of non-discrimination compliance, and a consumer's ability to contest an erroneous decision.
- Yet not every stakeholder needs the same form of visibility. An explanation that helps a machine learning engineer diagnose overfitting is rarely useful to a rejected credit applicant.

## Transparency Versus Explainability Versus Interpretability [exercise]
- Process transparency concerns institutional and procedural openness: disclosing that an automated system is in use, documenting its training data provenance, and publishing its governance and auditing standards.
- Intrinsic interpretability is a property of a model whose mathematical structure is simple and constrained enough that a human can directly trace how input features combine to produce a prediction.
- Post-hoc explainability is the use of a secondary mathematical procedure or surrogate model to approximate and summarize why a complex black-box model produced its outputs after the fact.
- A firm can provide high process transparency while deploying a black-box model, or use post-hoc explainability tools on an opaque model without making the underlying model intrinsically interpretable.

## Part 1: Intrinsic Interpretability Versus Black-Box Complexity [no-exercise]
[figure: a constrained interpretable model and a black-box ensemble balanced level on out-of-sample accuracy]
- A widespread assumption in commercial data science is that predictive accuracy always requires complex black-box architectures, leaving post-hoc explanation as the only path to accountability.
- On structured tabular business data, however, constrained interpretable models frequently match the out-of-sample accuracy of black-box ensembles when features are carefully engineered (Rudin, 2019).

## Intrinsically Interpretable Models: Linear Models, Generalized Additive Models, and Rule Lists [no-exercise]
[figure: interactive fraud score for one transaction read directly from a sparse linear model's coefficients, a generalized additive model's shape functions, and a falling rule list, as transaction velocity and account age change]
- Sparse linear and logistic regression models assign a single weight to each input variable, allowing an analyst to read the exact direction and magnitude of each feature's contribution directly from the coefficients.
- Generalized additive models (GAMs) extend linear models by fitting a smooth, nonlinear shape function for each individual feature while keeping the features additive, so that each variable's exact response curve can be plotted and inspected in isolation.
- Shallow decision trees and falling rule lists express predictions as a short sequence of if-then conditions, such as flagging an account if transaction velocity exceeds three per hour and account age is under seven days.
- In each of these architectures, the explanation is the model itself: there is zero discrepancy between how the model computes the decision and how the explanation describes it.

## Black-Box Models: Ensembles, Deep Neural Networks, and Foundation Models [no-exercise]
- Random forests and gradient-boosted trees combine hundreds of deep trees whose high-order feature interactions cannot be summarized by a single rule list or additive curve.
- Deep neural networks and transformer foundation models distribute representations across millions or billions of continuous parameters and attention heads.
- Black-box architectures provide genuine performance advantages primarily on unstructured data, such as raw text, speech, images, and multi-turn conversational interactions, where raw inputs must be mapped into latent representations.
- Even when a model's source code and weights are publicly released, its high-dimensional parameter space remains functionally opaque to human inspection without analytical tools.

## When High-Stakes Decisions Should Use Interpretable Models [exercise]
[figure: interactive post-hoc surrogate approximating a black-box decision boundary with a chosen number of pieces, counting the applicants whose explanation contradicts the black box's actual decision]
- As Rudin (2019) argues, post-hoc explanations of black-box models are necessarily approximations: if a post-hoc explanation were completely faithful to the black box in every case, the black box would not be needed.
- In high-stakes tabular domains such as consumer credit underwriting, medical risk scoring, and criminal justice, relying on a black box plus an approximate post-hoc explanation risks hiding critical edge-case failures.
- When structured tabular features already capture the domain signal and errors carry severe legal or human consequences, governance frameworks favor intrinsically interpretable models with monotonicity constraints.
- Complex black-box models are reserved for unstructured perception and language tasks, or for lower-stakes ranking tasks where the accuracy gain is verified to outweigh the loss of exact interpretability.

## Part 2: Post-Hoc Feature Attribution Methods [no-exercise]
- When an organization deploys an ensemble or neural network, auditors and data scientists use post-hoc attribution methods to quantify how features influence the model's predictions.
- Post-hoc methods are divided by scope into global explanations of the model as a whole and local explanations of a single prediction for one individual.

## Global Versus Local Explanations [no-exercise]
[figure: interactive comparison of a global explanation averaged over a population of customers with the local explanation for one selected applicant's default probability]
- A global explanation summarizes how a model behaves across the entire population of customers, identifying which features carry the greatest overall weight and how predictions shift on average as a feature changes.
- Global explanations are used by model developers, risk committees, and regulators to audit whether a model relies on sensible domain predictors or suspect demographic proxies.
- A local explanation accounts for why the model produced a specific prediction for one individual customer, such as why Applicant 4082 received a default probability of 0.42.
- Local explanations are used by customer service representatives, loan officers, and affected consumers who need to understand or challenge an individual decision.

## Permutation Feature Importance and Partial Dependence [no-exercise]
[figure: interactive shuffling of one feature column and the resulting rise in holdout error, beside a partial dependence curve that can be split into individual conditional expectation curves]
- Permutation feature importance is a global method that measures how much the model's holdout error increases when the values of a single feature are randomly shuffled across observations, breaking the link between that feature and the outcome.
- Partial dependence plots (PDPs) show the marginal effect of one or two features on the predicted outcome by averaging the model's predictions over the empirical distribution of all other features.
- Individual conditional expectation (ICE) curves disaggregate a partial dependence plot by drawing one curve per observation, revealing whether a feature's effect is uniform across customers or varies through interactions.
- Both permutation importance and partial dependence plots can produce misleading artifacts when input features are strongly correlated, because shuffling or varying one feature independently creates unrealistic combinations of customer attributes.

## Local Surrogates and Game-Theoretic Attributions: LIME and SHAP [no-exercise]
[figure: a local linear surrogate fitted to perturbed points around one customer on a nonlinear decision boundary, beside interactive joining orders whose marginal contributions average into Shapley values]
- Local Interpretable Model-agnostic Explanations (LIME) approximates a black-box model around a single customer's profile by perturbing that profile, querying the black box on the perturbed points, and fitting a simple weighted linear model locally (Ribeiro, Singh, & Guestrin, 2016).
- SHapley Additive exPlanations (SHAP) draws on cooperative game theory to treat input features as players in a coalition and computes each feature's Shapley value: its average marginal contribution to the prediction across all possible subsets of features (Lundberg & Lee, 2017).
- SHAP satisfies three desirable axiomatic properties that heuristic attribution methods lack: local accuracy (attributions sum to the difference between the individual prediction and the baseline mean), missingness, and consistency.
- Aggregating absolute SHAP values across a holdout dataset also provides a consistent global summary of feature importance alongside local case-by-case explanations.

## Limitations and Vulnerabilities of Post-Hoc Attributions [exercise]
- Feature attributions describe how the model uses its inputs, not the causal effect of those variables in the real world. A high SHAP value for a proxy variable reflects predictive association inside the model rather than a causal mechanism.
- Instability under perturbation occurs when small changes in the background reference distribution, neighborhood kernel width, or random seed cause LIME or empirical SHAP estimates to rank different features as the top driver for the same customer.
- Correlated-feature distortion occurs when marginal attribution procedures evaluate off-manifold combinations of correlated variables, such as pairing a twenty-year credit history with an age of nineteen.
- Adversarial scaffolding, demonstrated by Slack and colleagues (2020), shows that a malicious or non-compliant developer can wrap a discriminatory model in an out-of-distribution detector that returns fair behavior on synthetic LIME/SHAP perturbations while continuing to discriminate on real customer profiles.

## Discussion: The Disputed Credit Denial
- A small-business owner is denied a working-capital line of credit by an automated gradient-boosted model. The bank's customer portal displays the top three negative SHAP values for the application: "Number of recent credit inquiries," "Postal code commercial density," and "Average monthly balance volatility."
- Does this display satisfy the governance goals of transparency and contestability for the business owner, and what risks arise if the bank relies solely on SHAP values for regulatory compliance?

## Part 3: Counterfactual Explanations and Actionable Recourse [no-exercise]
- Knowing which features contributed to an unfavorable score does not tell a consumer what concrete steps will reverse the decision.
- Counterfactual explanations and algorithmic recourse shift the focus from internal feature weights to the minimum changes required to achieve a favorable outcome.

## Counterfactual Explanations: What Would Have Changed the Decision [no-exercise]
[figure: interactive decision boundary over annual income and credit utilization, showing the smallest change that moves a denied applicant to approval]
- Introduced to algorithmic governance by Wachter, Mittelstadt, and Russell (2017), a counterfactual explanation states the smallest modification to an individual's input profile that alters the model's prediction to a desired target outcome.
- Rather than opening the black box or approximating gradients, a counterfactual explanation takes the form: "Your loan application was denied. If your annual income had been 4,000 dollars higher or your credit card utilization had been below 30 percent, your application would have been approved."
- Because counterfactual explanations specify an exact point on the other side of the model's decision boundary, they are fully faithful to the model's actual decision rule at that boundary point.
- Multiple valid counterfactuals typically exist for the same individual, requiring an optimization criterion that balances proximity to the current profile, sparsity of changed features, and plausibility within the data manifold.

## From Explanation to Actionable Recourse [exercise]
[figure: interactive features of a denied applicant split into mutable and immutable ones, beside two groups whose members sit at unequal distances from the decision boundary]
- Actionable recourse, formalized by Ustun, Spangher, and Liu (2019), requires that a counterfactual explanation alter only mutable features that the individual can realistically change through their own actions.
- Immutable features, such as age, birthplace, or protected demographic attributes, and conditionally immutable history, such as "never having missed a payment five years ago," can explain a model's score but provide zero actionable recourse.
- Directionally constrained features must only move in feasible directions, such as increasing educational attainment or savings rather than decreasing years of work experience.
- Recourse audits also test whether the cost and difficulty of achieving recourse are equal across demographic groups. A model that satisfies group prediction parity can still impose a much larger recourse burden on one group by placing its rejected members farther from the decision boundary.
- Finally, publishing exact decision thresholds creates a strategic gaming trade-off (Goodhart's Law): when applicants manipulate easily altered surface proxies to cross the boundary without changing their underlying risk, the proxy loses its predictive validity.

## Part 4: Reasoning Traces in Large Language Models as Verbal Protocols [no-exercise]
- Unlike tabular classifiers that output a numeric score, large language models and AI agents can generate natural-language reasoning traces, often called chain-of-thought or scratchpad logs, before stating a final choice.
- These traces offer a rich qualitative window into agent decision-making, but they also introduce a critical governance trap if managers mistake fluent text for a faithful trace of the model's internal computation.

## Chain-of-Thought and Reasoning Traces as Verbal Protocols [no-exercise]
[figure: interactive codebook applied to a shopper's think-aloud transcript and to an AI agent's reasoning trace, highlighting the same coded variables in both]
- When prompted to think step by step or trained with reinforcement learning on reasoning tokens, a language model outputs an intermediate text sequence that lists the attributes it inspects, the rules it applies, and the trade-offs it weighs before selecting an option.
- In consumer and marketing research, human decision processes are studied through think-aloud verbal protocols, in which participants speak their thoughts aloud while shopping and researchers code those transcripts with a structured codebook.
- The reasoning traces of AI shopping agents can be analyzed with the exact same methodology: researchers develop a codebook of decision constructs and use human coders, or AI coders validated against human intercoder reliability, to classify thousands of agent traces (Wadi & Ma, 2026b, 2026c).
- Coded traces reveal process-level variables that final choices alone cannot show, such as which product attributes the agent compared, which goal it formulated, and whether it noticed a disclosure label.

## Plausibility Versus Faithfulness in LLM Explanations [exercise]
[figure: interactive prompt whose examples always place the correct answer in position A, producing a highly plausible chain-of-thought explanation that never mentions the cue that drove the choice]
- Plausibility means that an explanation reads as convincing, logical, and satisfying to a human reader.
- Faithfulness means that the explanation accurately reflects the true causal factors and internal computations that produced the model's output.
- In autoregressive language models, a reasoning trace is itself a sequence of predicted tokens conditioned on the prompt, not a diagnostic readout of the neural network's weights or attention activations.
- Controlled experiments by Turpin and colleagues (2023) demonstrate that language models can be systematically biased by covert cues, such as answer ordering or demographic stereotypes, while generating highly plausible chain-of-thought explanations that rationalize the biased choice using entirely neutral-sounding criteria.
- Post-hoc rationalization is even more severe when a model is asked to explain its choice after outputting the decision, as the model simply generates a story consistent with the token it already committed to.

## Auditing Reasoning Traces Alongside Observed Choices [exercise]
- Because reasoning traces can omit true drivers or rationalize biased outputs, behavioral governance never relies on reasoning traces in isolation. It pairs coded verbal protocols with controlled factorial choice experiments.
- In audits of resource rationality in AI shopping agents, coding the reasoning trace identifies whether the agent explicitly states unit-price minimization versus total-price minimization as its goal, which precedes how many product details the agent acquires and whether it selects the dominated option (Wadi & Ma, 2026b).
- In audits of sponsorship disclosure in agentic commerce, coding the reasoning trace measures whether the agent expresses explicit skepticism toward paid placements when the system prompt assigns the platform versus the traveler as the agent's principal (Wadi & Ma, 2026c).
- When a manipulation shifts both the coded reasoning trace (such as attenuating stated skepticism toward sponsored listings) and the final choice probability in a controlled experiment, the trace provides convergent process-tracing evidence for the behavioral mechanism.
- Conversely, when an agent's choice shifts across experimental conditions while its reasoning trace never mentions the manipulated factor, the divergence exposes unfaithful rationalization and hidden bias.

## Part 5: Designing Disclosures and Documentation for Stakeholders [no-exercise]
- Effective algorithmic governance translates technical interpretability, post-hoc attributions, counterfactuals, and behavioral audit results into structured documentation tailored to the audience that must act on them.

## Tailoring Explanations to Stakeholder Needs [exercise]
- Machine learning engineers and internal auditors require global feature attributions, ICE curves, activation diagnostics, and full factorial behavioral audit distributions to debug spurious correlations and verify robustness.
- Business executives and product owners require model cards, accuracy-fairness trade-off frontiers, and decision-boundary summaries to authorize deployment and allocate institutional risk.
- Regulators and external conformity assessors require standardized audit trails, disparate-impact ratios, data provenance sheets, and evidence that high-risk automated decisions comply with statutory transparency mandates.
- Affected consumers and end users require clear notice that an automated system is in use, plain-language reasons for adverse decisions, and feasible, actionable counterfactual recourse.

## Model Cards, Datasheets, and System Transparency Notes [no-exercise]
- Datasheets for Datasets, introduced by Gebru and colleagues (2021), standardize documentation of a dataset's motivation, composition, collection process, preprocessing, allowed uses, and maintenance plan.
- Model Cards, introduced by Mitchell and colleagues (2019), accompany a trained model to report its intended use cases, out-of-scope uses, architecture, evaluation datasets, disaggregated performance across demographic groups, and known ethical limitations.
- System-level transparency notes extend model cards to cover the complete deployed application, including system prompts, retrieval sources, guardrail filters, human oversight regimes, and the date of the most recent behavioral audit.
- Together, datasheets, model cards, and system transparency notes create an auditable chain of custody across the AI value chain introduced in Week 1.

## Dark Transparency and Disclosure Overload [no-exercise]
[figure: interactive disclosure length showing that as pages are added the share of readers who reach the material error rate on page 2 falls]
- More information is not always better governance: inundating consumers with technical parameters, thirty-page privacy policies, or uncalibrated confidence scores can obscure rather than clarify how a system works.
- Dark transparency, or strategic opacity through overload, occurs when an organization releases voluminous technical disclosures to create the appearance of openness while burying conflicts of interest or adverse error rates.
- Furthermore, displaying fluent, authoritative chain-of-thought explanations alongside a model's recommendation can amplify automation bias in human users, causing them to trust incorrect answers more than when no explanation is shown.
- Governance standards therefore evaluate disclosures empirically by testing whether human users and downstream agents actually comprehend and act appropriately on the explanation provided.

## Discussion: When the Reasoning Trace Looks Clean
- A retail marketplace deploys an AI shopping assistant that displays a collapsible "Why I picked this product" reasoning trace to shoppers. In a pre-deployment factorial audit, researchers find that the assistant selects higher-margin private-label products 28 percent more often than superior third-party brands with identical ratings and lower prices, yet the displayed reasoning trace never mentions brand ownership or margin and instead praises the private-label product's build quality.
- How is this divergence possible, why does displaying the trace create a governance risk for shoppers, and how should the marketplace's audit board respond?

## Key Takeaways
- Process transparency discloses how a system is governed, intrinsic interpretability builds models whose structure is directly readable, and post-hoc explainability approximates complex black-box models after training.
- On high-stakes structured tabular decisions, constrained interpretable models (such as sparse regressions, GAMs, and rule lists) frequently match black-box accuracy while avoiding approximation gaps (Rudin, 2019).
- Global post-hoc methods (permutation importance, PDPs) summarize overall model behavior, whereas local methods (LIME, SHAP) attribute individual predictions. Both describe model correlations rather than real-world causation and can be fooled by correlated features or adversarial scaffolding.
- Counterfactual explanations identify the smallest change that flips a decision, while actionable recourse requires that those changes involve mutable, feasible features with equitable effort across demographic groups.
- Reasoning traces in large language models can be coded as verbal protocols using validated codebooks (Wadi & Ma, 2026b, 2026c), but a plausible trace is not guaranteed to be a faithful record of the model's internal computation.
- Pairing coded reasoning traces with controlled factorial choice experiments separates genuine process mechanisms from unfaithful post-hoc rationalization.
- Institutional documentation combines Datasheets for Datasets, Model Cards, and audience-tailored explanations while guarding against disclosure overload and explanation-induced automation bias.
