---
topic: Global AI Regulation, Standards, and Compliance
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week11
---

## Title Slide
- Week 11
- Global algorithmic governance combines binding risk-based statutes, data protection mandates, consumer protection enforcement, and auditable management standards that translate legal obligations into engineering controls.

## From Self-Regulation to Hard Law [no-exercise]
- Between 2016 and 2021, the first wave of responsible AI governance relied almost entirely on voluntary corporate ethics boards, non-binding charters, and self-regulatory pledges.
- Repeated market failures in algorithmic credit scoring, targeted advertising discrimination, biometric surveillance, and deceptive generative content demonstrated that voluntary principles without statutory enforcement often succumb to commercial pressure.
- Governments across Europe, North America, and Asia have since enacted binding legal regimes backed by substantial financial penalties, mandatory conformity audits, and powers to ban or delete non-compliant models.
- Because digital services and foundation models cross national borders instantly, enterprises must design compliance architectures that satisfy the strictest overlapping requirements across jurisdictions.

## Horizontal Versus Sectoral AI Regulation [exercise]
[figure: one horizontal statute spanning every industry, beside separate domain-specific statutes and regulators for finance, employment, healthcare, housing, and consumer protection]
- Horizontal regulation establishes a single, cross-cutting statutory framework that governs artificial intelligence systems across all industries based on their risk level, as exemplified by the European Union AI Act.
- Sectoral regulation governs algorithmic systems through existing domain-specific statutes and regulators in finance, employment, healthcare, housing, and consumer protection, as exemplified by the federal enforcement model in the United States.
- Hybrid jurisdictions combine horizontal data protection and automated decision-making laws with sectoral guidelines and technical management standards, as seen in Canada and several Asia-Pacific economies.

## Part 1: The European Union AI Act and Risk-Based Regulation [no-exercise]
- Enacted as the world's first comprehensive horizontal statute for artificial intelligence, the European Union AI Act regulates AI systems according to the severity of risk they pose to health, safety, and fundamental rights.
- Rather than regulating every algorithm identically, the Act assigns proportional obligations across four distinct risk tiers and adds dedicated rules for general-purpose AI models.

## The Four Risk Tiers of the EU AI Act [exercise]
[figure: the four risk tiers of the EU AI Act, from prohibited unacceptable-risk systems through high-risk and limited-risk systems to minimal-risk systems, each with example systems and its obligations]
- Unacceptable-risk systems are strictly prohibited from being placed on the market or put into service in the European Union because they contravene fundamental rights and values.
- High-risk systems are permitted on the market only if they pass a rigorous ex-ante conformity assessment and comply with strict technical, documentation, and oversight mandates.
- Limited-risk (transparency-risk) systems are subject to specific disclosure obligations ensuring that humans know when they are interacting with an AI system or viewing synthetic media.
- Minimal-risk systems, such as spam filters, inventory forecasting tools, or basic video game AI, face no mandatory statutory obligations beyond general consumer and data protection law.

## Prohibited AI Practices and High-Risk Obligations [no-exercise]
- Prohibited practices under the EU AI Act include AI systems that deploy subliminal or purposefully manipulative techniques that impair autonomous decision-making and cause significant harm, systems that exploit the vulnerabilities of specific groups (defined by age, disability, or severe socioeconomic distress), social scoring systems, and untargeted scraping of facial images for recognition databases.
- High-risk commercial applications under Annex III include AI systems used for recruitment and employee management, creditworthiness evaluation and credit scoring, and risk assessment and pricing in life and health insurance.
- Providers and deployers of high-risk systems must maintain a continuous risk management system, govern training and testing datasets for representative quality and bias, compile detailed technical documentation, enable automatic event logging for traceability, provide clear instructions for use, build human-oversight interfaces, and verify accuracy, robustness, and cybersecurity.

## Obligations for General-Purpose AI (GPAI) Models and Systemic Risk [no-exercise]
[figure: interactive cumulative training compute on a logarithmic scale, with the 10 to the power of 25 FLOP threshold above which a general-purpose AI model takes on systemic-risk obligations]
- Because foundation models can be adapted to hundreds of downstream tasks, the EU AI Act establishes a dedicated governance layer for providers of General-Purpose AI (GPAI) models.
- All GPAI providers must maintain technical documentation for downstream deployers and regulators, establish policies to respect copyright and text-and-data-mining opt-outs, and publish a sufficiently detailed summary of the content used for pre-training.
- GPAI models classified as posing systemic risk, including models trained with cumulative compute exceeding 10 to the power of 25 floating-point operations (FLOPs), must additionally conduct standardized model evaluations and adversarial red-teaming, assess and mitigate systemic risks, report serious incidents to the European AI Office, and ensure strong cybersecurity for model weights.

## The Brussels Effect and Extraterritorial Reach [no-exercise]
[figure: interactive global annual turnover setting the maximum EU AI Act penalty for prohibited practices and for high-risk violations, as the fixed sum or the percentage of turnover]
- Like the General Data Protection Regulation (GDPR), the EU AI Act applies extraterritorially: it binds any provider or deployer worldwide whose AI system is placed on the EU market or whose output is used within the European Union, regardless of where the firm is headquartered.
- Penalties for non-compliance reach up to 35 million euros or 7 percent of global annual turnover for prohibited AI practices, and up to 15 million euros or 3 percent of global turnover for violations of high-risk obligations.
- Through the Brussels Effect (Bradford, 2020), multinational firms frequently adopt EU-compliant documentation, risk tiers, and audit trails as their global baseline rather than maintaining separate, lower-standard engineering pipelines for other regions.

## Part 2: Canadian Privacy and AI Governance Frameworks [no-exercise]
- In Canada, commercial algorithmic governance is anchored by federal and provincial privacy statutes, enforceable automated decision-making rights, public-sector algorithmic impact assessments, and national generative AI commitments.

## PIPEDA and Automated Commercial Data Processing [no-exercise]
- The Personal Information Protection and Electronic Documents Act (PIPEDA) governs how private-sector organizations across Canada collect, use, and disclose personal information in the course of commercial activity.
- Under PIPEDA's ten fair information principles and the Office of the Privacy Commissioner's guidelines on meaningful consent, organizations must explain in plain, accessible language how personal data will be used, including any secondary use for training or personalizing AI models, and any material risk of significant harm.
- Furthermore, PIPEDA's appropriate-purpose restriction (Section 5(3)) limits data processing to purposes that a reasonable person would consider appropriate in the circumstances, even if a consumer clicked an agreement banner.

## Quebec Law 25 and Automated Decision-Making Rights [exercise]
[figure: an automated credit decision sent to a Quebec resident, showing the notice that the decision was automated, the principal factors and parameters available on request, and the route to review by a staff member]
- Quebec's Law 25 (modernizing the province's private-sector privacy statute) establishes some of the strictest enforceable rights regarding automated decision-making in North America, applying to any enterprise processing personal information of Quebec residents.
- Mandatory automated-decision notice requires an enterprise that uses personal information to render a decision based exclusively on automated processing to inform the individual of that fact no later than the time the decision is communicated.
- Right to explanation and provenance grants the individual the right, upon request, to be informed of the personal information used to render the decision, the reasons and the principal factors and parameters that led to the decision, and the right to have inaccurate personal information rectified.
- Right to human review and contestation requires the enterprise to give the affected individual the opportunity to submit observations to a staff member who is in a position to review and, if warranted, overturn the automated decision.

## Federal AI Governance in Canada: AIDA Lessons, Voluntary Codes, and Treasury Board Directives [no-exercise]
- Canada's federal government pioneered public-sector algorithmic governance through the Treasury Board Directive on Automated Decision-Making, which requires federal agencies to complete a public Algorithmic Impact Assessment (AIA) that scores systems into four impact levels and mandates proportional peer review, explanation, and human-in-the-loop oversight.
- In the private sector, policy debates around the proposed Artificial Intelligence and Data Act (AIDA) established the concept of "high-impact systems," focusing regulatory scrutiny on commercial algorithms that determine access to employment, credit, healthcare, insurance, and essential services, or that risk biased output and physical or psychological harm.
- Alongside legislative reform, Canada's Voluntary Code of Conduct on the Responsible Development and Management of Advanced Generative AI Systems commits signatories to six operational pillars: accountability, safety, fairness and equity, transparency (including watermarking AI-generated content), human oversight, and robustness testing.

## Discussion: Deploying a Hiring and Credit Model Across Montreal, Toronto, and Paris
- A Canadian financial-technology company based in Toronto builds an automated small-business loan approval and recruitment platform and plans to launch it simultaneously in Montreal (Quebec), Toronto (Ontario), and Paris (France).
- Map the overlapping statutory obligations the company faces under Quebec Law 25, PIPEDA, and the EU AI Act, and explain whether a single unified governance workflow can satisfy all three jurisdictions.

## Part 3: United States Sectoral Enforcement and the FTC [no-exercise]
- Rather than enacting a single federal AI statute, the United States regulates commercial algorithms through vigorous enforcement of federal consumer protection, civil rights, and credit laws, supplemented by targeted state and municipal statutes.

## The US Approach: Sectoral Laws and Agency Enforcement [no-exercise]
- In consumer finance and housing, the Equal Credit Opportunity Act (ECOA) and the Fair Credit Reporting Act (FCRA) require lenders to provide specific, accurate adverse-action notices stating the principal reasons a credit application was denied, prohibiting lenders from hiding behind black-box opacity.
- In employment, the Equal Employment Opportunity Commission (EEOC) enforces Title VII of the Civil Rights Act against automated resume screeners and video-interview algorithms that produce disparate impact against protected groups.
- At the state and municipal levels, targeted statutes such as New York City Local Law 144 (mandating annual independent bias audits of automated employment decision tools) and the Colorado AI Act (imposing a statutory duty of reasonable care on developers and deployers of high-risk AI systems to prevent algorithmic discrimination) create binding compliance gates.

## FTC Enforcement Under Section 5: Unfair and Deceptive AI Practices [exercise]
[figure: algorithmic disgorgement, in which both the unlawfully collected dataset and the model weights trained on it are ordered destroyed]
- Under Section 5 of the Federal Trade Commission Act, the FTC holds broad authority to prosecute "unfair or deceptive acts or practices in or affecting commerce," applying this authority directly to artificial intelligence and automated marketing.
- Unsubstantiated AI capability claims (AI hype and snake oil) violate Section 5 when a vendor markets an algorithm as predicting human behavior, detecting fraud, or eliminating bias without rigorous, independent scientific evidence supporting that claim.
- Deceptive synthetic media and dark patterns violate Section 5 when firms deploy undisclosed AI-generated customer reviews, deepfake endorsements, anthropomorphic bots that impersonate humans, or manipulative subscription sludges.
- Unfair discriminatory or privacy-invading models violate Section 5 when an algorithm causes substantial injury to consumers that is not reasonably avoidable by consumers themselves and is not outweighed by countervailing benefits to competition.
- Algorithmic disgorgement (model deletion) is a powerful equitable remedy enforced by the FTC: when a company trains a machine learning model on illegally collected or non-consensual consumer data, the FTC can order the company not only to delete the raw dataset, but also to destroy the trained models, weights, and algorithms derived from those tainted data.

## Part 4: Voluntary Governance Frameworks and Management Standards [no-exercise]
- Statutes state what outcomes are forbidden or required, but engineering and compliance teams need structured operational frameworks to implement those requirements day to day.
- Two international frameworks serve as the global lingua franca of enterprise AI governance: the NIST AI Risk Management Framework and ISO/IEC 42001.

## The NIST AI Risk Management Framework (AI RMF) [exercise]
[figure: the NIST AI RMF with Govern as the cross-cutting core and Map, Measure, and Manage as the continuous cycle around it]
- Published by the US National Institute of Standards and Technology, the NIST AI RMF (and its Generative AI Profile) organizes trustworthy AI management into four continuous operational functions: Govern, Map, Measure, and Manage.
- Govern is a cross-cutting function that establishes organizational culture, risk tolerance, clear executive accountability, policies, and workforce competencies across the entire AI lifecycle.
- Map establishes the context of a specific AI deployment before launch, identifying the intended business purpose, the affected stakeholder groups, data provenance, value-chain dependencies, and foreseeable socio-technical risks.
- Measure applies quantitative and qualitative behavioral auditing methods (such as the factorial, Monte-Carlo, and exact-PMF audits of Weeks 2 through 8) to assess trustworthiness metrics including validity, reliability, fairness, explainability, privacy, and robustness.
- Manage allocates resources to prioritize, mitigate, monitor, and respond to the measured risks through pre-deployment controls, human oversight, incident playbooks, and system decommissioning when risk thresholds are exceeded.

## ISO/IEC 42001: Certifiable AI Management Systems [no-exercise]
- While the NIST AI RMF is a voluntary guidance framework, ISO/IEC 42001 is the world's first international standard specifying requirements for an auditable, certifiable Artificial Intelligence Management System (AIMS).
- Structured around a continuous Plan-Do-Check-Act (PDCA) cycle analogous to ISO/IEC 27001 for information security, ISO/IEC 42001 requires organizations to maintain a formal AI risk register, conduct documented AI System Impact Assessments on individuals and society, and implement specific Annex A controls covering data quality, responsible development, third-party supplier oversight, and user transparency.
- Independent third-party certification against ISO/IEC 42001 allows enterprise vendors to demonstrate governance maturity to corporate procurement teams, insurers, and regulatory auditors.

## Part 5: Translating Legal Mandates Into Product Compliance and Conformity Assessments [no-exercise]
- Legal counsel, data scientists, and marketing managers collaborate through formal conformity assessments and algorithmic impact assessments to turn regulatory text into testable product requirements.

## Algorithmic Impact Assessments and Conformity Assessments [no-exercise]
- An Algorithmic Impact Assessment (AIA) is a structured, pre-deployment evaluation that documents a system's purpose, affected populations, data lineage, fairness and behavioral audit results, human-oversight design, and mitigation measures.
- Under the EU AI Act, a conformity assessment is the mandatory verification procedure demonstrating that a high-risk AI system fulfills all statutory technical and governance requirements before the CE marking is affixed and the system enters the market.
- Maintaining an immutable audit trail of training datasets, prompt templates, evaluation scripts, and sign-off decisions ensures that if a regulator or court investigates an adverse outcome two years after launch, the firm can prove due diligence.

## Six Steps of a Cross-Jurisdictional AI Compliance Workflow [exercise]
- Step 1 is inventory and jurisdictional mapping, cataloging every predictive, generative, and agentic system in use and identifying all geographic markets whose residents interact with or are affected by its outputs.
- Step 2 is risk-tier classification, screening each system against prohibited-practice lists and classifying whether it triggers high-risk (EU AI Act Annex III), high-impact, or fully automated decision-making (Quebec Law 25) status.
- Step 3 is provenance and consent verification, auditing every training and fine-tuning dataset to ensure valid legal basis, opt-out compliance, and zero exposure to FTC algorithmic disgorgement.
- Step 4 is executing the NIST Measure / behavioral audit suite, testing disaggregated group fairness, counterfactual recourse, sycophancy, and evaluative invariance across the target models.
- Step 5 is engineering transparency, oversight, and contestability interfaces, building plain-language automated-decision notices, factor explanations, and human review escalation paths into the product UI.
- Step 6 is compiling the conformity dossier, obtaining formal governance sign-off, and activating continuous post-market monitoring and incident reporting logs.

## Regulating Agentic Commerce: Where Current Statutes Fall Short [exercise]
- First-generation AI regulations were drafted primarily around two paradigms: tabular high-risk classifiers (credit, hiring) and human-facing generative chatbots (requiring a watermark or a notice that the user is chatting with an AI under EU AI Act Article 50).
- As established in Weeks 7 and 8, agentic commerce introduces governance gaps that current statutes do not yet fully close:
- Disclosure interception gap: FTC endorsement guides and consumer protection rules mandate human-visible "Sponsored" labels, but when an AI shopping agent reads the results page, label wording alone fails to eliminate sponsorship bias under platform delegation (Wadi & Ma, 2026c).
- System-prompt fiduciary gap: current transparency rules require telling the user that a system is an AI, but they do not yet mandate disclosing whom the system prompt names as the agent's principal or require a consumer-beneficiary fiduciary clause (Wadi & Ma, 2026c).
- Machine-readable unit-price and ranking gap: consumer unit-pricing laws require shelf labels for human eyes, leaving storefronts free to bury unit weights behind costly API tool calls that induce resource-rational search truncation (Wadi & Ma, 2026b) or exploit lost-in-the-middle rank positions (Wadi & Ma, 2026a).

## Discussion: The Algorithmic Disgorgement Order
- A retail analytics startup scrapes four million consumer photos and product reviews from social media without consent and uses them to train a proprietary multimodal recommendation model that now powers 80 percent of its enterprise product revenue. Following an investigation, the FTC proposes a consent decree requiring algorithmic disgorgement (deletion of both the scraped dataset and the trained foundation model weights).
- Analyze why regulators impose algorithmic disgorgement rather than a simple monetary fine, and explain what data-provenance and ISO/IEC 42001 controls would have prevented this existential business loss.

## Key Takeaways
- Global AI regulation has shifted from voluntary ethics pledges to binding statutes that combine horizontal risk-based laws (EU AI Act), privacy and automated-decision rights (PIPEDA, Quebec Law 25), and sectoral consumer-protection enforcement (FTC Section 5, ECOA, NYC Local Law 144).
- The EU AI Act classifies systems into four risk tiers (unacceptable, high, limited, minimal), bans manipulative and vulnerability-exploiting AI, imposes strict conformity obligations on high-risk credit and HR systems, and regulates General-Purpose AI (GPAI) models with extraterritorial reach.
- In Canada, PIPEDA enforces meaningful consent and appropriate purposes, while Quebec Law 25 grants individuals mandatory notice, factor explanations, and the right to human review for exclusively automated decisions.
- In the United States, the FTC prosecutes unsubstantiated AI claims, deceptive dark patterns, and unfair discriminatory algorithms under Section 5, enforcing algorithmic disgorgement (model deletion) when models are trained on unlawfully obtained data.
- The NIST AI Risk Management Framework (*Govern*, *Map*, *Measure*, *Manage*) and ISO/IEC 42001 translate legal mandates into operational risk registers, behavioral audits, and certifiable management systems.
- Next-generation regulatory compliance must also address agentic commerce gaps by mandating fiduciary consumer-beneficiary prompt clauses, disclosure pass-through, and machine-readable unit pricing.
