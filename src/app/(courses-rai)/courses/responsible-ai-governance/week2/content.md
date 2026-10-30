---
topic: Algorithmic Bias, Fairness, and Discrimination
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week2
---

## Title Slide
- Week 2
- Because predictive models learn from unequal histories and optimize narrow objectives, governing fairness requires explicit choices among competing mathematical and legal standards.

## From Statistical Patterns to Market Discrimination [no-exercise]
- Predictive models operate by discriminating in the statistical sense: they separate customers with high predicted probabilities of an outcome from customers with low predicted probabilities.
- Statistical discrimination becomes unlawful or unethical market discrimination when those predictions systematically disadvantage individuals on the basis of protected characteristics.
- A model does not need malicious intent, or even direct access to a customer's race, gender, or age, to produce discriminatory outcomes across groups.
- Whenever historical inequities, uneven sampling, or proxy variables enter the modeling pipeline, optimizing for predictive accuracy alone will reproduce or amplify existing disparities.

## Protected Characteristics and Legal Standards of Discrimination [no-exercise]
- Anti-discrimination statutes in employment, credit, housing, and public accommodations protect specific attributes, including race, sex, age, religion, national origin, disability, and marital status.
- Disparate treatment occurs when a decision rule intentionally or explicitly treats individuals differently because of a protected characteristic.
- Disparate impact occurs when a facially neutral policy or algorithm disproportionately harms a protected group without a demonstrable business necessity.
- A common regulatory benchmark for screening disparate impact is the four-fifths rule, under which a selection rate for any protected group that is less than 80 percent of the rate for the highest-selected group signals potential adverse impact.
- Removing protected attributes from a model's input table, known as fairness through unawareness, prevents explicit disparate treatment on paper but rarely prevents disparate impact in practice.

## Part 1: Sources of Algorithmic Bias Across the Pipeline [no-exercise]
- Algorithmic bias is a systematic difference in a model's predictions, errors, or resource allocations across groups that is not justified by the legitimate purpose of the decision.
- Bias does not originate in a single line of code. It enters at distinct stages of data generation, measurement, model specification, and market deployment.
- Diagnosing the exact stage at which bias enters is necessary because each source requires a different technical and managerial remedy.

## Bias in the Data: Historical and Representation Bias [no-exercise]
- Historical bias arises when the data accurately record a world shaped by past structural inequality or human prejudice, so that a model trained on those records treats past discrimination as the target to replicate.
- For example, a hiring model trained on ten years of past executive promotions in a male-dominated industry learns to penalize career patterns common among female applicants.
- Representation bias arises when certain segments of the population are undersampled or missing from the training dataset relative to the population on which the model will be deployed.
- A facial analysis system or voice assistant trained primarily on one demographic group exhibits substantially higher error rates when deployed to underrepresented groups.

## Bias in Modeling: Measurement and Aggregation Bias [no-exercise]
- Measurement bias arises when the observable proxy chosen to represent an unobservable construct is measured with different accuracy or meaning across groups.
- Using past healthcare expenditures as a proxy for medical need systematically underestimates the severity of illness among lower-income patients who historically had less access to care for the same level of sickness.
- Using arrest records as a proxy for criminal offense rates confounds underlying behavior with differences in policing intensity across neighborhoods.
- Aggregation bias arises when a single model is fit across distinct populations whose conditional relationships between predictors and outcomes differ, producing a model that fits the majority group well and minority groups poorly.

## Bias in Deployment: Proxy Variables and Feedback Loops [no-exercise]
- Proxy variables are seemingly neutral features, such as postal code, mobile device brand, browser language, or shopping schedule, that correlate strongly with protected characteristics.
- In high-dimensional marketing datasets, combinations of behavioral features allow a flexible machine learning model to reconstruct protected attributes with high precision even when demographic columns are deleted.
- Runaway feedback loops arise when a model's predictions determine which data are observed in the next period and used to retrain the model.
- If a credit model denies loans to a neighborhood, the firm never observes the repayment behavior of creditworthy applicants in that neighborhood, locking the initial bias into future training cycles.

## Identifying Sources of Bias in Commercial Pipelines [exercise]
- Historical bias is present when the labels themselves reflect past unequal treatment, even if the sample is large and the variables are measured without error.
- Representation bias is present when the training sample omits or under-represents a target customer segment, raising error rates for that segment even if historical labels were fair.
- Measurement bias is present when the target label or feature is a flawed proxy whose relationship to the true construct differs across groups.
- Aggregation bias is present when a uniform model pools groups that require separate functional relationships or group-specific interactions.

## Part 2: Group Fairness Criteria [no-exercise]
- Group fairness criteria formalize what it means for a model to treat demographic groups equitably in terms of its predictions and error rates.
- Most group fairness definitions are constructed from the cells of the confusion matrix evaluated separately for each demographic group.
- Three families of group fairness dominate regulatory and technical practice: independence, separation, and sufficiency.

## Confusion Matrices Across Demographic Groups [no-exercise]
- Consider a binary decision, such as approving a credit card application, where Y equals 1 if the applicant would repay the loan and Y equals 0 if the applicant would default.
- The model produces a binary decision D, where D equals 1 for approval and D equals 0 for denial, based on whether the applicant's predicted probability score S exceeds a cutoff threshold.
- For each demographic group A, the confusion matrix records the selection rate P(D = 1), the true positive rate P(D = 1 | Y = 1), the false positive rate P(D = 1 | Y = 0), and the positive predictive value P(Y = 1 | D = 1).
- Different stakeholders care about different cells of this matrix: applicants care whether qualified members of their group are rejected, whereas lenders care whether approved applicants from each group repay at the predicted rate.

## Independence: Demographic Parity [no-exercise]
- Independence, also called demographic parity or statistical parity, requires that the probability of receiving a favorable decision is equal across groups: P(D = 1 | A = a) equals P(D = 1 | A = b).
- Under demographic parity, if 30 percent of applicants from Group A are approved for a premium offer, then 30 percent of applicants from Group B must also be approved, regardless of differences in historical qualification rates.
- Demographic parity is appropriate when historical labels are deeply contaminated by past exclusion or when the organization's policy goal is equal representation in access to an opportunity.
- Its limitation is that if underlying qualification rates differ between groups, enforcing demographic parity requires approving less-qualified candidates in one group or rejecting qualified candidates in the other.

## Separation: Equal Opportunity and Equalized Odds [no-exercise]
- Separation conditions fairness on the true outcome Y, requiring that the model's error rates do not depend on group membership.
- Equalized odds requires that both the true positive rate P(D = 1 | Y = 1) and the false positive rate P(D = 1 | Y = 0) are equal across groups.
- Equal opportunity relaxes equalized odds to require only equal true positive rates across groups: among individuals who would genuinely succeed or repay (Y = 1), the probability of being selected by the model is identical regardless of group membership.
- Equal opportunity directly protects qualified individuals in disadvantaged groups from being overlooked at higher rates than equally qualified individuals in advantaged groups.

## Sufficiency: Predictive Parity and Calibration [no-exercise]
- Sufficiency conditions on the model's prediction rather than the true outcome, requiring that a given prediction or risk score means the same thing across all groups.
- Predictive parity requires that the positive predictive value P(Y = 1 | D = 1) is equal across groups: among applicants who are approved, the actual repayment rate is the same in Group A and Group B.
- Calibration within groups requires that for every score level s, the proportion of individuals with score s who achieve the outcome Y = 1 is equal across groups: P(Y = 1 | S = s, A = a) equals P(Y = 1 | S = s, A = b).
- Calibration ensures that a single cutoff threshold applied to the score S does not explicitly judge one group by a stricter predictive standard than another.

## Selecting a Group Fairness Criterion [exercise]
- Demographic parity is selected when the firm cannot trust historical outcome labels or seeks proportional representation across groups, as in broad awareness advertising or scholarship outreach.
- Equal opportunity is selected when the primary ethical harm is falsely rejecting qualified individuals, as in screening job applicants or approving small-business loans.
- Equalized odds is selected when both false rejections of the qualified and false selections of the unqualified carry severe group-level harms, as in fraud flagging or risk assessment.
- Predictive parity and calibration are selected when decision makers must trust that a numeric risk score carries identical predictive meaning across groups under a uniform cutoff rule.

## Part 3: Individual and Counterfactual Fairness [no-exercise]
- Group fairness averages outcomes across entire demographic categories, which leaves open the possibility that specific individuals within a group are treated arbitrarily.
- Individual and causal approaches evaluate fairness at the level of the single consumer rather than the group average.

## Individual Fairness: Treating Similar People Similarly [no-exercise]
- Individual fairness, formalized by Dwork and colleagues, requires that any two individuals who are similar with respect to a particular task receive similar probability distributions over outcomes.
- Formally, the distance between the model's predictions for two consumers cannot exceed the task-relevant distance between their profiles.
- Individual fairness prevents tokenism, in which a model satisfies group demographic parity by selecting arbitrary members of a protected group rather than the most qualified individuals within that group.
- The practical challenge of individual fairness is defining a similarity metric that captures genuine task qualification without quietly reintroducing socioeconomic proxies.

## Counterfactual Fairness and Causal Pathways [exercise]
- Counterfactual fairness defines fairness through a causal graph: a decision is counterfactually fair toward an individual if the prediction would remain identical in a counterfactual world where the individual belonged to a different demographic group.
- Evaluating counterfactual fairness requires distinguishing causal pathways that are legitimate for the decision from pathways that transmit discrimination through mediating variables.
- If a protected attribute influences a mediator, such as neighborhood school quality, which in turn influences test scores, a counterfactually fair model adjusts for the downstream effect of the protected attribute on the mediator.
- Unlike fairness through unawareness, which merely drops the demographic column, counterfactual fairness removes the causal influence of the protected attribute on all downstream proxy variables unless a pathway is explicitly deemed business-necessary.

## Part 4: The Fairness Impossibility Theorem and Managerial Trade-Offs [no-exercise]
- A central mathematical result in algorithmic governance is that the major criteria of group fairness are mutually incompatible in almost all realistic settings.
- Managers cannot instruct an engineering team to make a model "completely fair" on all metrics at once. They must decide which type of error disparity is most harmful in the specific market context.

## The Fairness Impossibility Theorem [no-exercise]
- Proven independently by Chouldechova (2017) and Kleinberg, Mullainathan, and Raghavan (2017), the impossibility theorem states that whenever two groups have different base rates of the underlying outcome P(Y = 1), no imperfect predictor can simultaneously satisfy independence, separation, and sufficiency.
- Specifically, if base rates differ across groups and a model is calibrated within groups (sufficiency), the group with the lower base rate will mathematically have a lower true positive rate or a lower false positive rate, violating equalized odds (separation).
- Conversely, if a firm enforces equalized odds across groups with unequal base rates, the resulting predictions cannot have equal positive predictive value across groups.
- Only two degenerate conditions avoid this trade-off: a perfect predictor that makes zero errors, or populations whose underlying base rates are identical.

## Managerial Trade-Offs in Credit, Hiring, and Ad Delivery [exercise]
- Because mathematical impossibility rules out satisfying every fairness metric simultaneously, choosing a fairness criterion is a normative governance decision rather than a purely technical optimization step.
- In consumer credit, lenders historically prioritized calibration so that a credit score of 700 implied the same default risk for every borrower, but doing so under unequal base rates produces higher false rejection rates for creditworthy borrowers in disadvantaged groups.
- In automated resume screening, regulators and human-resources leaders prioritize demographic parity or equal opportunity at the top of the funnel so qualified candidates from underrepresented groups reach human interviews.
- In medical triage or fraud intervention, equalized odds is prioritized so that neither missed diagnoses nor burdensome false investigations fall disproportionately on one demographic segment.

## Discussion: The Credit Scoring Trade-Off
- Discussion: A digital bank's credit model is perfectly calibrated across age and income groups, meaning that among approved borrowers at any score threshold, default rates are identical across groups. However, an internal audit reveals that creditworthy young adults who would have repaid their loans are rejected at a 35 percent rate, compared with an 18 percent false rejection rate for older borrowers. Should the bank preserve calibration or adjust group thresholds to achieve equal opportunity, and how should it justify that choice to regulators and customers?

## Part 5: Auditing and Mitigating Disparate Impact in Marketing Pipelines [no-exercise]
- In digital marketing, algorithmic discrimination most often appears not in explicit exclusions by a human marketer, but in automated ad delivery, dynamic pricing, and personalization systems.
- Governing these pipelines requires understanding how platform optimization algorithms allocate exposure and applying structured mitigation and auditing protocols.

## Bias in Ad Delivery and Algorithmic Targeting [no-exercise]
- Even when an advertiser selects broad, demographically neutral targeting parameters for a housing, credit, or employment advertisement, the platform's delivery algorithm can produce severely skewed audiences (Ali et al., 2019).
- Delivery skew occurs for two reasons: market-driven cost differences across demographic segments in ad auctions, and relevance models that optimize predicted click-through rates based on historical stereotypes.
- If young women are more expensive to reach in an ad auction because retail brands bid heavily for their attention, a budget-constrained algorithm advertising STEM careers will automatically shift impressions toward men to minimize cost per click.
- Similarly, an algorithm optimizing click probability on housing ads may steer luxury rental listings toward higher-income demographic profiles and subprime credit ads toward vulnerable neighborhoods.

## Pre-Processing, In-Processing, and Post-Processing Mitigation [exercise]
- Pre-processing interventions modify the training data before a model is fit, using techniques such as reweighting underrepresented observations, resampling, or transforming features to remove correlation with protected attributes.
- In-processing interventions modify the learning algorithm itself during training, by adding a fairness penalty to the loss function or imposing adversarial debiasing constraints so the model cannot predict group membership from its internal representations.
- Post-processing interventions leave the trained model unchanged and adjust its output scores or apply group-specific decision thresholds to satisfy a target criterion such as equal opportunity or demographic parity.
- Every mitigation method entails an accuracy-fairness frontier: tightening fairness constraints typically reduces predictive accuracy on the historical objective, a trade-off that governance teams must quantify and document.

## Six Steps of a Disparate Impact Audit [exercise]
- Step 1 is defining the decision scope, the protected groups of concern, and the legal and ethical fairness criteria appropriate to the domain.
- Step 2 is assembling an audit dataset with verified or ethically inferred group membership labels on a representative holdout sample.
- Step 3 is computing baseline group metrics, including selection rates, the four-fifths ratio, true positive rates, false positive rates, and calibration curves across groups.
- Step 4 is diagnosing the pipeline stage responsible for any observed disparity, testing whether the gap stems from representation gaps, proxy features, label measurement bias, or auction delivery dynamics.
- Step 5 is evaluating pre-processing, in-processing, or post-processing mitigations along the accuracy-fairness frontier and selecting the operating point.
- Step 6 is recording the decision in a formal audit report and configuring continuous production alerts to detect fairness drift after launch.

## Discussion: Neutral Targeting, Skewed Delivery
- Discussion: A university uses an automated social media ad platform to recruit applicants for its new Master of Financial Technology program, specifying only age 21 to 40 and a bachelor's degree as targeting criteria. After two weeks, platform logs show that 82 percent of ad impressions were served to men. Explain the algorithmic mechanisms that can produce this disparity under neutral targeting, and propose how the university and the platform should intervene.

## Key Takeaways
- Statistical discrimination becomes market discrimination when automated predictions systematically disadvantage protected groups through disparate treatment or disparate impact.
- Deleting demographic columns (fairness through unawareness) fails because high-dimensional behavioral and geographic proxies reconstruct group membership.
- Bias enters at specific stages of the pipeline: historical and representation bias in data, measurement and aggregation bias in modeling, and proxy reconstruction and feedback loops in deployment.
- Group fairness criteria formalize distinct moral priorities: demographic parity equalizes selection rates, equal opportunity and equalized odds equalize error rates conditional on true qualification, and calibration equalizes predictive meaning conditional on the score.
- Individual fairness requires similar treatment for task-similar individuals, and counterfactual fairness removes discriminatory causal pathways through mediating variables.
- By the fairness impossibility theorem, when underlying base rates differ across groups, no imperfect model can satisfy demographic parity, equalized odds, and calibration simultaneously.
- Marketing and ad-delivery algorithms can generate severe demographic skews through auction pricing and click-rate optimization, requiring structured disparate-impact audits and pre-, in-, or post-processing mitigation.
