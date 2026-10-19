---
topic: Accessibility, Inclusion, and Human-Centered AI Design
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week10
---

## Title Slide
- Week 10
- Human-centered algorithmic governance designs systems around diverse physical, sensory, cognitive, and linguistic needs, prevents deskilling and alert fatigue in human operators, and engages affected communities as co-designers rather than passive data sources.

## Who Is the "Average User" in Algorithmic Design? [no-exercise]
- Commercial software and machine learning systems are routinely optimized for an unstated default user: an individual with standard vision, hearing, motor control, neurotypical information processing, high digital literacy, and fluent proficiency in a dominant language.
- Because statistical models minimize average loss across the majority of observations in a dataset, users whose speech patterns, facial movements, reading speeds, or interaction styles sit in the statistical tails are frequently treated by algorithms as noise or anomalies.
- Over one billion people worldwide live with a physical, sensory, or cognitive disability, and billions more interact with digital markets in a second language or under situational constraints.
- Governing AI for inclusion requires shifting from designing for a mythical average user to designing systems that adapt to human variability from the start.

## The Medical Versus Social Model of Disability in Technology [exercise]
- The medical model of disability views disability as an individual biological deficit residing inside the person that must be fixed, cured, or accommodated through specialized exceptions.
- The social and relational model of disability views disability as a mismatch between an individual's functional characteristics and the design of the surrounding physical, digital, and institutional environment.
- Under the social model, a voice-only banking interface disables a deaf customer or a customer with a speech impairment by choice of architecture, whereas a multimodal interface that supports text, voice, and visual interaction removes the barrier by design.
- Algorithmic governance adopts the social model: when an automated system excludes or misclassifies users with disabilities, the defect lies in the system's design and evaluation scope, not in the user.

## Part 1: Universal Design and Digital Accessibility Standards [no-exercise]
- Universal design is the design of products, interfaces, and environments to be usable by all people, to the greatest extent possible, without the need for adaptation or specialized retrofitting.
- In digital and AI-mediated services, universal design benefits both users with permanent disabilities and the broader market.

## Universal Design and the Curb-Cut Effect [no-exercise]
- The curb-cut effect takes its name from sidewalk ramps originally advocated for by wheelchair users, which subsequently proved indispensable for parents pushing strollers, travelers pulling luggage, and delivery workers rolling carts.
- Every major assistive technology in computing has followed the curb-cut pattern: closed captions built for deaf viewers are used by commuters in noisy transit, screen-reader semantic markup enables search engines and AI shopping agents to parse webpages, and voice dictation built for users with motor impairments powers hands-free mobile interfaces.
- Designing AI systems for edge-case accessibility therefore improves robustness, clarity, and usability across the entire customer base under situational constraints such as glare, noise, multitasking, or cognitive fatigue.

## The Four POUR Principles of Digital Accessibility [exercise]
- Codified in the Web Content Accessibility Guidelines (WCAG), digital accessibility rests on four foundational requirements known by the acronym POUR: Perceivable, Operable, Understandable, and Robust.
- Perceivable requires that information and interface components be presented in ways users can perceive across sensory channels, such as providing accurate alt-text descriptions for visual charts and captions for generated audio or video.
- Operable requires that all interface controls, including interactive AI sliders, chat widgets, and verification prompts, function fully via keyboard navigation, switch devices, and voice commands without punitive time limits.
- Understandable requires that language, navigation, and model explanations be clear, predictable, and adjustable in reading complexity, avoiding opaque jargon or disorienting layout shifts.
- Robust requires that content and conversational outputs follow standardized semantic schemas so that current and future assistive technologies, such as screen readers and braille displays, can parse them reliably.

## Algorithmic Bias Against People With Disabilities [no-exercise]
- Even when an interface meets surface WCAG markup rules, the underlying machine learning models can systematically penalize people with disabilities.
- Automated video-interview and emotion-recognition tools trained on neurotypical benchmarks routinely assign lower employability or trustworthiness scores to candidates with autism, facial palsy, blindness, or speech differences because their eye contact, prosody, or facial expressions deviate from the training mean.
- Automated online exam-proctoring systems flag students with Tourette syndrome, screen-reader hardware, or mobility accommodations for suspected cheating at disproportionately high rates.
- Speech recognition and voice-authentication systems exhibit elevated word error rates on dysarthric speech, stuttered speech, and non-native accents, locking affected consumers out of automated telephone banking and support queues.

## Part 2: Assistive AI for Diverse Cognitive and Physical Needs [no-exercise]
- While poorly governed algorithms create severe barriers, thoughtfully designed foundation models offer unprecedented capabilities for individualized accessibility and learning support.
- Realizing this potential requires pairing multimodal generation with pedagogical and privacy guardrails.

## Multimodal AI as an Accessibility Bridge [no-exercise]
- Multimodal foundation models translate fluidly between sensory modalities in real time: converting complex visual scenes and diagrams into structured spoken narratives for blind users, transcribing and summarizing overlapping speech for deaf and hard-of-hearing users, and expanding brief telegraphic inputs into full written messages for users with motor impairments.
- For users with dyslexia, attention-deficit/hyperactivity disorder (ADHD), or cognitive processing differences, language models can restructure dense legal contracts, medical instructions, or financial disclosures into chunked summaries, progressive disclosures, or interactive question-and-answer dialogues.
- Unlike static accommodations that provide a single fixed alternative format, generative systems allow the user to ask follow-up questions at their own pace and preferred level of detail.

## Personalized Formative Support and Cognitive Scaffolding: The AILSS Architecture [no-exercise]
- In educational and consumer decision-support settings, learners and buyers with disabilities often face a timing gap: traditional accommodations require formal diagnosis disclosures and delayed human scheduling, arriving after the decision or assessment moment has passed.
- The AI-Powered Learning Support System (AILSS) architecture addresses this gap by using large language models to deliver immediate, low-stakes formative assessment and personalized cognitive scaffolding.
- Rather than handing the user a finished answer (which undermines learning and agency), a formative support system diagnoses the specific step where comprehension broke down, re-represents the concept using an alternative modality or analogy, and adapts pacing without time pressure.
- Because the interaction is private and non-punitive, users can request repeated clarifications without stigma or social anxiety.

## Privacy and Autonomy Risks in Assistive AI Systems [exercise]
- Inferred disability profiling occurs when a platform observes a user enabling accessibility features, requesting simplified text, or using assistive hardware and silently logs an inferred disability attribute that leaks into advertising, credit, or insurance scoring models.
- Assistive surveillance creep occurs when tools deployed to support students or employees with disabilities collect continuous biometric, eye-tracking, or keystroke telemetry that management repurposes for productivity surveillance.
- Paternalistic override occurs when an assistive AI system makes assumptions about what a disabled user can or should buy, read, or decide, restricting options instead of supporting the user's self-directed choice.
- Hallucination vulnerability in sensory translation occurs when a vision-to-speech model confidently fabricates details on a medication label, currency note, or product warning that a blind user cannot independently cross-check visually.

## Discussion: Automated Video Interview Screening
- Discussion: A national retail chain adopts an AI video-screening platform to evaluate 50,000 entry-level job applicants per year. Applicants record three-minute video answers, and the model scores their vocal tone, speaking pace, eye contact, and facial micro-expressions to filter out the bottom 70 percent of candidates. Analyze this system using the social model of disability, measurement bias (Week 2), and accessibility governance, and explain why simply offering an "accommodation request form" fails to make the pipeline equitable.

## Part 3: Language, Literacy, and the Three Levels of the Digital Divide [no-exercise]
- Inclusion in AI-mediated markets extends beyond physical and cognitive accessibility to the socioeconomic, linguistic, and cultural divides that determine who benefits from algorithmic systems and who bears their costs.

## The Three Levels of the AI Digital Divide [exercise]
- The first-level divide is the access divide: inequalities in broadband connectivity, computing hardware, and the ability to pay subscription fees for frontier AI models versus relying on ad-funded or lower-capability free tiers.
- The second-level divide is the capability and epistemic literacy divide: differences in users' ability to formulate effective prompts, configure reasoning effort, recognize hallucinations, and critically verify sycophantic or biased model outputs.
- The third-level divide is the outcome and agency divide: even when basic access is widespread, users and firms with advanced AI agents capture disproportionate market surplus (securing better prices, faster dispute resolution, and position-neutral search; Wadi & Ma, 2026a, 2026b), while less equipped consumers pay higher all-in prices and absorb algorithmic sludges.

## Linguistic, Register, and Health/Financial Literacy Barriers [no-exercise]
- Customer-service, healthcare, and banking chatbots frequently perform best when addressed in formal, standard metropolitan dialects and degrade when users write in regional dialects, African American Vernacular English, Indigenous languages, or code-switched multilingual text.
- As examined in Week 2's discussion of claim narratives, models that equate non-native grammar or informal register with low credibility or elevated fraud risk systematically penalize linguistic minorities in access to financial and public services.
- Similarly, when an AI financial or health advisor explains terms using technical vocabulary without checking user comprehension, it reproduces literacy barriers under the guise of automated self-service.

## Indigenous Data Sovereignty and OCAP Principles [no-exercise]
- Inclusive data governance recognizes that not all communities view knowledge and language as public-domain raw material for commercial web scraping.
- Data colonialism occurs when technology firms extract linguistic, cultural, ecological, or health data from Indigenous and marginalized communities without consent, governance authority, or reciprocal benefit.
- Established by First Nations in Canada, the OCAP principles (Ownership, Control, Access, and Possession) affirm that Indigenous communities hold collective ownership and jurisdiction over how their community data and cultural heritage are collected, stored, interpreted, and used in algorithmic systems.
- Respecting Indigenous data sovereignty requires formal community governance agreements rather than relying on individual clickwrap notices or public-web scraping exceptions.

## Part 4: Human-Centered AI Teaming, Deskilling, and Cognitive Ergonomics [no-exercise]
- Accessibility and human-centered design also apply inside the organization, to the employees, loan officers, clinicians, and moderators tasked with working alongside or overseeing AI systems.
- As introduced in Week 1, placing a human in the loop fails if the interface ignores human cognitive ergonomics.

## Complementarity Versus Substitution in Human-AI Teams [no-exercise]
- True human-AI complementarity occurs when the combined performance of the human-plus-AI team exceeds both the human working alone and the AI model operating alone.
- Empirical studies of human-AI decision making show that naive teaming often fails to achieve complementarity: humans either defer to the AI when the AI is wrong (automation bias) or override the AI when the AI is right (algorithm aversion).
- Achieving complementarity requires designing the workflow around asymmetric strengths: algorithms excel at consistent aggregation across high-dimensional historical records, whereas humans excel at detecting unmodeled context shifts, rare causal exceptions, and normative edge cases.

## Deskilling, Alert Fatigue, and Cognitive Offloading [exercise]
- Cognitive offloading and deskilling occur when workers rely on automated recommendations for routine cases over months or years, causing their independent diagnostic, analytical, or domain judgment skills to atrophy.
- Paradox of automation: as an automated system becomes more reliable on routine cases, the human operator becomes less practiced and less attentive, yet the rare cases where the automation fails and hands control back to the human are precisely the hardest, most ambiguous edge cases.
- Alert fatigue occurs in human-on-the-loop monitoring when a safety filter or fraud detector generates a high volume of false-positive alarms, conditioning operators to click "dismiss" or "approve" habitually without inspecting the underlying evidence.
- Moral crumple zone exposure occurs when frontline employees are held personally liable for overriding or failing to override an opaque model whose inputs and error bounds they cannot inspect.

## Designing Cognitive Forcing Functions for Effective Oversight [exercise]
- Cognitive forcing functions are deliberate interface patterns that interrupt automatic System 1 deference and prompt analytical System 2 evaluation during high-stakes human-in-the-loop reviews (Buçinca, Malaya, & Gajos, 2021).
- Delayed recommendation (human-first judgment) requires the reviewer to inspect the core case facts and record an initial provisional assessment before the interface reveals the AI model's score and rationale.
- Calibrated uncertainty and disagreement highlights display the model's predictive dispersion or ordinal dissension alongside the point score, visually flagging low-consensus cases where human scrutiny is most needed.
- On-demand contrastive explanations present both the strongest evidence supporting Approval and the strongest evidence supporting Rejection, rather than a one-sided persuasive summary that induces confirmation bias.

## Part 5: Participatory Design and Inclusive Governance [no-exercise]
- Designing accessible, culturally respectful, and ergonomically sound AI systems requires involving affected users and frontline workers throughout the governance lifecycle rather than consulting them only after harm occurs.

## Arnstein's Ladder and Participatory AI Design [exercise]
- Adapted from Sherry Arnstein's (1969) ladder of citizen participation, participatory AI governance distinguishes tokenistic consultation from genuine shared power.
- Non-participation and extraction occur when firms scrape community data or substitute synthetic LLM personas (Week 6) in place of speaking with real disabled or marginalized stakeholders.
- Tokenism and surface consultation occur when an organization holds a one-off focus group after the model architecture and objective function are already locked in, offering participants no authority to alter the system.
- Partnership and co-design ("Nothing About Us Without Us") include disabled users, minority communities, and frontline operators from problem scoping through dataset curation, interface prototyping, and pre-launch red-teaming, with compensated roles and veto authority over harmful deployments.

## Six Steps of an Accessibility and Human-Factors AI Audit [no-exercise]
- Step 1 is auditing the user interface against WCAG POUR standards across keyboard-only navigation, screen readers, high-contrast modes, and voice control.
- Step 2 is disaggregating model accuracy and false-positive rates across disability, accent, dialect, and age subgroups, specifically testing biometric, speech, and behavioral classifiers on atypical profiles.
- Step 3 is verifying that accessibility preferences and assistive interactions are sandboxed from commercial profiling, dynamic pricing, and credit or insurance risk scoring.
- Step 4 is testing high-stakes assistive outputs (such as visual descriptions for blind users or medical summaries) for hallucination rates and pairing uncertain outputs with explicit verification warnings.
- Step 5 is evaluating human-in-the-loop operator workflows in controlled user studies to measure automation bias, alert fatigue, and the effectiveness of cognitive forcing functions.
- Step 6 is conducting compensated participatory usability and red-team sessions with users with disabilities and frontline workers before launch sign-off.

## Discussion: Designing an Accessible Municipal Benefits Assistant
- Discussion: A provincial government agency plans to deploy a conversational AI assistant to help residents apply for disability and low-income housing benefits, replacing several paper forms and telephone intake lines. Using the social model of disability, the three levels of the digital divide, privacy safeguards for inferred disability data, and cognitive forcing functions for caseworkers, design a governance charter for this system that ensures equitable access without turning the assistant into a barrier or surveillance tool.

## Key Takeaways
- The social model of disability locates accessibility barriers in the design of digital and algorithmic environments rather than in individual deficits; universal design and the curb-cut effect improve robustness for all users.
- Accessible AI interfaces satisfy the four WCAG POUR principles (Perceivable, Operable, Understandable, Robust) while auditing underlying biometric, speech, and video models against outlier bias toward atypical bodies, voices, and neurotypes.
- Multimodal AI and formative support architectures such as AILSS provide immediate, stigma-free cognitive scaffolding for learners and consumers with disabilities, provided assistive telemetry is strictly walled off from commercial profiling and paternalistic overrides.
- The AI digital divide operates across three levels: hardware and frontier-model access (Level 1), prompt and epistemic verification literacy (Level 2), and unequal market outcomes in agent-mediated exchange (Level 3).
- Respecting linguistic diversity and Indigenous data sovereignty (OCAP: Ownership, Control, Access, Possession) prevents dialect discrimination and data colonialism.
- Effective human-in-the-loop oversight guards against deskilling, the paradox of automation, and alert fatigue by deploying cognitive forcing functions such as human-first provisional judgment and contrastive explanations.
- Genuine participatory design ("Nothing About Us Without Us") involves compensated disabled and marginalized stakeholders with real authority from initial problem scoping through pre-deployment auditing.
