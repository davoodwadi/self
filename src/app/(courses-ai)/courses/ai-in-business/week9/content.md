---
topic: "EDII, Fairness, and Responsible AI"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week9"
---

## Title Slide
- Week 9
- Responsible artificial intelligence requires diagnosing data and algorithmic bias, embedding Equity, Diversity, Inclusion, and Indigeneity (EDII) and Indigenous data sovereignty into system design, and enforcing accountability across the deployment lifecycle.

## Why Technical Optimization Alone Does Not Guarantee Fairness [no-exercise]
- Machine learning algorithms are mathematical optimization engines that minimize average prediction error across a training dataset.
- A model that minimizes overall average error across a majority population can still inflict severe, systematic errors on smaller or historically underserved demographic groups.
- Treating data as neutral and objective overlooks the fact that enterprise datasets record past human decisions, institutional policies, and unequal access to services.
- When automated systems scale a biased decision rule across millions of transactions, they turn localized human prejudices into uniform institutional barriers.
- Responsible AI leadership requires evaluating systems not only on aggregate efficiency, but also on how errors, opportunities, and authority are distributed across people.

## Allocative Harm Versus Representational Harm [exercise]
[figure: taxonomy of algorithmic harms contrasting allocative harms in economic resource distribution with representational harms in language, search, and media generation]
- Researchers and regulators distinguish two primary categories of harm caused by artificial intelligence systems: allocative harm and representational harm.
- Allocative harm occurs when an automated system unfairly withholds an economic opportunity, resource, or service from a group, such as credit, employment, housing, or medical care.
- Allocative harms have immediate, measurable material consequences for an individual's livelihood, health, or legal standing.
- Representational harm occurs when a language, search, or image model reinforces demeaning stereotypes, subordinates a cultural identity, or erases the visibility of a community.
- Even when no immediate financial transaction is denied, representational harms shape organizational culture and reinforce the social biases that lead to future allocative inequities.

## Part 1: Sources of Bias in Enterprise Data and Models [no-exercise]
- Algorithmic bias rarely originates from malicious code written by an engineer.
- Most fairness failures enter the pipeline through three structural flaws in the underlying data: historical bias, representation bias, and measurement bias.

## Historical, Representation, and Measurement Bias [exercise]
[figure: three-stage data pipeline showing where historical bias in society, representation bias in sampling, and measurement bias in proxy labels enter a training dataset]
- Historical bias occurs when training data accurately reflect a world shaped by past discrimination or unequal opportunity, even when the data are measured without technical error.
- For example, a business lending dataset from decades of redlined credit markets will show fewer historical loans in minority neighborhoods regardless of creditworthiness.
- Representation bias occurs when certain demographic, geographic, or linguistic groups are under-sampled in the training data, causing the model to make higher errors on those groups.
- Early facial analysis and speech recognition systems failed disproportionately on darker skin tones and non-standard dialects because training corpora were overwhelmingly white and male.
- Measurement bias occurs when the observable proxy variable chosen as a feature or target label systematically distorts the true underlying construct for specific groups.

## Case Study: Measurement Bias in Healthcare Risk Algorithms [no-exercise]
[figure: clinical risk calibration chart showing that at the exact same predicted healthcare cost score, Black patients had substantially higher chronic illness severity than white patients]
- A landmark empirical study examined a commercial risk-prediction algorithm used by health systems across the United States to select patients for high-risk preventive care management.
- To predict which patients had the greatest future medical need, the model developers used total future healthcare billing expenditure as the target variable during training.
- Because lower-income and Black patients faced systemic barriers to routine medical access and preventive visits, they generated lower annual medical bills than equally sick white patients.
- As a result, at the exact same algorithm risk score, Black patients had significantly more uncontrolled chronic conditions, such as diabetes, hypertension, and renal disease, than white patients.
- Replacing the flawed cost proxy with biological indicators of chronic illness severity more than doubled the share of high-need Black patients properly enrolled in extra care.

## Aggregation and Evaluation Bias [no-exercise]
- Even after data collection, bias can be introduced during modeling and testing through aggregation bias and evaluation bias.
- Aggregation bias arises when a single model assumes that the relationship between input features and outcomes is identical across all subpopulations when it actually differs.
- For instance, diabetic patients of different ethnic backgrounds or age groups exhibit different clinical relationships between hemoglobin A1c levels and complication risk.
- Evaluation bias occurs when a model is validated on a benchmark dataset that does not reflect the diversity of the real users who will encounter the system in production.
- Reporting a single aggregate accuracy score of 95 percent can conceal a 40 percent failure rate on a minority subgroup, making disaggregated subgroup reporting essential before launch.

## Part 2: Algorithmic Fairness and the EDII Framework [no-exercise]
- Diagnosing bias requires both formal statistical fairness metrics and a broader organizational commitment to Equity, Diversity, Inclusion, and Indigeneity (EDII).
- Because mathematical fairness definitions can conflict with one another, leaders must make transparent value judgments rather than delegating fairness to an automated formula.

## Statistical Definitions of Fairness and Their Trade-Offs [exercise]
[figure: visual comparison of three statistical fairness criteria across demographic groups: demographic parity, equal opportunity, and predictive parity]
- Quantitative auditing uses three primary statistical criteria to test whether a classification model treats demographic groups fairly.
- Demographic parity (also called statistical parity) requires that the proportion of individuals receiving a positive decision, such as a loan approval or interview invite, be equal across groups.
- Equal opportunity requires that among individuals who truly qualify for the positive outcome, the model achieves the same true positive rate (recall) across every demographic group.
- Predictive parity (or calibration by group) requires that among individuals assigned a given risk score, such as a 70 percent repayment probability, the actual outcome rate be equal across groups.
- A fundamental mathematical result known as the impossibility theorem of fairness proves that whenever base rates of the outcome differ between groups in the data, no imperfect model can satisfy all three criteria simultaneously.

## Embedding EDII Across the AI Lifecycle [no-exercise]
[figure: lifecycle governance ring embedding Equity, Diversity, Inclusion, and Indigeneity across problem formulation, data curation, disaggregated testing, accessible deployment, and community recourse]
- Because fairness cannot be reduced to a single mathematical equation, organizations embed Equity, Diversity, Inclusion, and Indigeneity (EDII) across the entire AI lifecycle.
- Equity requires recognizing unequal historical starting points and designing target labels, thresholds, and interventions so the system reduces rather than amplifies structural disparities.
- Diversity requires ensuring that both training datasets and the multidisciplinary teams designing, testing, and governing the system include varied demographic and domain perspectives.
- Inclusion requires building user interfaces, language models, and fallback processes that accommodate people with disabilities, neurodivergent users, and linguistic minorities.
- Indigeneity requires recognizing the distinct legal status, inherent sovereignty, collective rights, and knowledge systems of Indigenous Peoples rather than treating Indigenous communities as a generic demographic category.

## Accessibility and Inclusive System Design [no-exercise]
- Artificial intelligence systems can either remove barriers for people with disabilities or erect new digital barriers when designed around narrow assumptions of a typical user.
- Properly designed AI tools advance workplace and consumer inclusion through real-time meeting captioning, screen-reader image descriptions, and plain-language document simplification.
- Conversely, poorly designed automated systems exclude users when voice-authentication banking locks out customers with speech impairments or stammering.
- Automated hiring games, timed cognitive tests, and webcam proctoring tools frequently penalize candidates with visual impairments, motor disabilities, or neurodivergent gaze patterns.
- Inclusive engineering mandates testing AI interfaces with assistive technologies, auditing error rates across disability categories, and providing accessible human alternatives without penalty.

## Part 3: Indigenous Data Sovereignty and OCAP Principles [no-exercise]
- Standard corporate data governance is built on individual click-wrap consent and open-data sharing, frameworks that often conflict with the collective rights of Indigenous Peoples.
- Responsible AI in Canada and globally requires respecting Indigenous data sovereignty and adhering to the First Nations principles of OCAP and the international CARE principles.

## Indigenous Data Sovereignty and Collective Rights [no-exercise]
[figure: comparison between individual click-wrap privacy consent models and collective Indigenous data governance grounded in nationhood, land stewardship, and community benefit]
- Indigenous data sovereignty is the inherent right of Indigenous Nations and Peoples to govern the collection, ownership, application, and stewardship of data about their communities, citizens, lands, languages, and cultures.
- For decades, external governments, academic researchers, and corporations extracted data from Indigenous communities without community consent or local benefit.
- Externally controlled statistics frequently emphasized deficit narratives that stigmatized Indigenous communities in policy, credit, and child-welfare systems while ignoring community strengths.
- Unlike Western privacy statutes that focus solely on an individual user clicking an agreement, Indigenous data governance recognizes collective community ownership over shared cultural heritage, traditional ecological knowledge, and population records.
- Meaningful recognition of Indigenous data sovereignty grounded in the United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP) shifts Indigenous Nations from passive data subjects to governing decision-makers.

## The First Nations Principles of OCAP [exercise]
[figure: four-pillar governance framework of the First Nations principles of OCAP: Ownership, Control, Access, and Possession]
- The First Nations principles of OCAP, established by the First Nations Information Governance Centre, define how First Nations data must be governed across research and enterprise projects.
- Ownership states that a community or First Nation owns information collectively in the exact same way that an individual owns their personal information.
- Control affirms that First Nations hold the right to control all aspects of data management and AI development from initial project formulation through review, deployment, and retirement.
- Access requires that First Nations have full access to information and data about themselves and their communities wherever those records are held, and the right to decide who else may access them.
- Possession refers to the physical and technical jurisdiction under which the data sit, ensuring that data stewardship and infrastructure align with First Nation ownership in practice.

## The CARE Principles and Generative AI Scraping Risks [no-exercise]
- Complementing OCAP at the international level, the Global Indigenous Data Alliance formulated the CARE Principles: Collective Benefit, Authority to Control, Responsibility, and Ethics.
- The CARE principles were designed to balance technical open-data standards (FAIR: Findable, Accessible, Interoperable, Reusable) so open science does not become a vehicle for unauthorized data extraction.
- Generative AI introduces acute sovereignty risks when developers scrape Indigenous languages, oral histories, sacred stories, or traditional artistic designs from public websites into commercial foundation models without consent.
- Commercializing an Indigenous language translator or generating imitations of traditional Indigenous art without community governance violates collective intellectual and cultural rights.
- Enterprises working in natural resources, healthcare, finance, or technology on Indigenous territories must establish formal, community-governed data agreements and benefit-sharing structures before collecting or modeling data.

## Discussion: Partnering on an Environmental Monitoring AI Project
- Discussion: A forestry and clean-energy company wants to train a geospatial and language model to predict wildfire risk and watershed changes across a northern region that overlaps the traditional territories of three First Nations. The data science team proposes combining commercial satellite imagery with historical Indigenous land-use maps and digitized transcripts of Elder ecological interviews held in a public university library archive. How do Indigenous data sovereignty and the OCAP and CARE principles apply to those archived records, and what governance and partnership structure must the company establish before beginning the project?

## Part 4: Behavioral Auditing of Large Language Models [no-exercise]
- Auditing a tabular credit model involves inspecting a fixed set of numerical columns, whereas auditing a large language model requires testing an open-ended system that generates prose, rankings, and tool calls.
- Behavioral auditing treats the language model as an empirical subject, using controlled counterfactual experiments and red-teaming to uncover hidden demographic and cultural biases.

## Demographic Stereotyping and Cultural Alignment in LLMs [no-exercise]
[figure: behavioral audit comparison showing how changing only an applicant's demographic name or dialect in an identical prompt shifts an uncalibrated language model's tone, salary suggestion, or screening score]
- Because foundation models are trained on massive web scrapes, their internal representations absorb historical occupational stereotypes, cultural biases, and majority-group norms.
- Even when surface safety filters block overtly offensive slurs, language models frequently exhibit covert behavioral bias in downstream business tasks.
- Empirical studies show that when prompted to draft reference letters or suggest starting salaries, uncalibrated models systematically use more communal words and recommend lower pay for female names than for male names with identical resumes.
- Language models also exhibit dialect bias, assigning lower competence scores or more punitive customer-service decisions to users writing in African American Vernacular English, Indigenous English dialects, or non-native phrasing.
- In global business deployments, models trained predominantly on North American and European text often misinterpret cultural communication styles, family structures, and ethical norms from other regions.

## Counterfactual Testing and Behavioral Audits [exercise]
[figure: counterfactual audit matrix holding job qualifications and credit metrics constant while systematically permuting demographic names, pronouns, and dialects across thousands of model runs]
- Behavioral auditing evaluates an AI system by systematically varying its inputs in controlled experiments and measuring disparities in its outputs, without needing access to internal model weights.
- The primary method for auditing language models in business workflows is counterfactual testing, analogous to correspondence audit studies in labor economics.
- In a counterfactual audit, analysts construct hundreds of realistic task prompts, such as loan summaries, patient triage notes, or resumes, where all objective qualifications are held identical.
- The audit then permutes only a demographic indicator, such as culturally distinctive names, pronouns, tribal affiliations, postal codes, or dialects, across thousands of repeated API runs.
- Comparing approval rates, sentiment scores, and error rates across permutations quantifies whether the model violates invariance (the rule that changing an irrelevant protected attribute must not alter the decision).

## Red-Teaming and Adversarial Safety Evaluation [no-exercise]
- While counterfactual audits measure statistical bias across routine workflows, red-teaming tests how an AI system behaves under adversarial or extreme conditions.
- Red-teaming is a structured evaluation in which an independent group of security specialists, domain experts, and community representatives deliberately attempts to provoke harmful, biased, or policy-violating outputs.
- Unlike static multiple-choice safety benchmarks that models quickly memorize, red teams test multi-turn dialogues, indirect prompt injections, and domain-specific edge cases.
- Effective enterprise red-teaming includes participants from the communities most likely to be harmed by system failures, who can spot subtle cultural stereotyping or accessibility barriers that homogeneous engineering teams miss.
- Findings from red-teaming are converted into automated regression tests, system-prompt constraints, input/output safety classifiers, and hard refusal boundaries before production release.

## Part 5: Accountability Frameworks and Regulatory Compliance [no-exercise]
- Responsible AI principles have moved from voluntary corporate ethics statements to binding statutory law, industry standards, and board-level risk oversight.
- Organizations must build auditable documentation, clear lines of executive accountability, and accessible customer recourse into every high-impact AI deployment.

## Risk-Based AI Regulation Across Jurisdictions [exercise]
[figure: four-tier risk pyramid of the European Union AI Act classifying AI systems into unacceptable risk, high risk, limited transparency risk, and minimal risk]
- Global AI regulation increasingly follows a risk-based architecture that scales legal obligations to the severity of potential harm in a given use case.
- The European Union AI Act classifies AI applications into four risk tiers: unacceptable risk (prohibited outright, such as social scoring), high risk, limited transparency risk, and minimal risk.
- High-risk systems under the EU AI Act include AI used in employment and recruitment, creditworthiness scoring, educational admission, essential public benefits, biometric identification, and critical infrastructure.
- Deploying a high-risk system requires pre-market conformity assessments, documented data governance, bias testing, technical robustness, human oversight capabilities, and registration in a regulatory database.
- In North America, sector regulators enforce existing civil rights, fair lending, consumer protection, and privacy laws against algorithmic systems, complemented by governance standards such as the NIST AI Risk Management Framework.

## Documentation Standards: Model Cards, Datasheets, and Impact Assessments [exercise]
[figure: three-part responsible AI documentation framework connecting Datasheets for Datasets, Model Cards for subgroup performance and scope limits, and Algorithmic Impact Assessments]
- Auditable AI governance relies on three standardized documentation artifacts maintained throughout a system's lifecycle.
- First, a Datasheet for Datasets records the provenance of a training or evaluation dataset: who funded and collected it, which populations are included or missing, how consent was obtained, and how target labels were defined.
- Second, a Model Card documents a trained model's architecture, intended business use cases, explicitly prohibited out-of-scope uses, and disaggregated error rates across demographic and operational subgroups.
- Third, an Algorithmic Impact Assessment (AIA) evaluates the socio-technical deployment as a whole, analyzing potential allocative and representational harms, human-in-the-loop safeguards, and monitoring plans before launch.
- Maintaining these three artifacts prevents teams from repurposing a model built for a low-stakes marketing task into a high-stakes credit or HR workflow where it was never validated.

## Assigning Organizational Accountability and Recourse [no-exercise]
- A recurring failure in corporate AI incidents is the problem of many hands: when an algorithm causes harm, responsibility diffuses across the external vendor, the data engineers, the product manager, and the frontline operator.
- Sound governance eliminates diffused responsibility by requiring a single named executive owner for every high-impact AI system in the enterprise inventory.
- Before launch and at regular intervals, high-risk systems must pass review by a cross-functional governance committee with veto authority spanning legal, risk, engineering, EDII, and domain operations.
- Finally, every automated system that makes consequential decisions about customers or employees must provide a meaningful recourse mechanism.
- Meaningful recourse requires clear notice that an automated system was used, plain-language explanation of the decision factors, and a timely, accessible process to correct faulty input data and obtain human review.

## Discussion: Auditing a Multilingual Customer Hardship Triage Agent
- Discussion: A national banking and telecommunications company deploys a language-model agent to evaluate written customer requests for temporary payment-hardship extensions. Six months after launch, an internal audit reveals that customers writing in non-standard English dialects or listing rural and First Nations reserve addresses receive hardship approvals at a 28 percent rate, compared with 52 percent for urban applicants with identical account balances and payment histories. Identify the specific forms of bias and harm present in this deployment, design a counterfactual behavioral audit to isolate the causes, and specify the governance, OCAP, and recourse reforms required before the system can operate.

## Key Takeaways
- Optimizing a model for average accuracy over historical data does not guarantee fairness and can inflict severe allocative or representational harms on under-represented groups.
- Bias enters enterprise AI through historical discrimination recorded in past data, under-representation in sampling, measurement bias in flawed proxy labels (such as using medical cost as a proxy for illness), and aggregation across distinct populations.
- Because statistical fairness metrics (demographic parity, equal opportunity, and predictive parity) cannot all be satisfied simultaneously when base rates differ, choosing a fairness criterion is an explicit ethical and managerial judgment grounded in EDII.
- Indigenous data sovereignty and the First Nations principles of OCAP (Ownership, Control, Access, and Possession) establish that Indigenous Nations hold collective governance authority over data concerning their communities, lands, languages, and cultures.
- Auditing large language models requires counterfactual behavioral experiments that permute demographic and dialect cues across identical task prompts, paired with multidisciplinary red-teaming.
- Regulatory compliance under frameworks such as the EU AI Act and NIST AI RMF requires risk-tiered oversight, Datasheets, Model Cards, Algorithmic Impact Assessments, named executive accountability, and accessible human recourse.
