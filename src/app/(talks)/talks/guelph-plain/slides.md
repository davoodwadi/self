# Decision-Making in Digital and AI-Mediated Marketplaces (brief deck, plain APA style)

Condensed version of /talks/guelph: one message per slide, about 40 words or fewer. Each paper gets a research question and method slide, then a results slide. Scientific terms follow the manuscripts exactly. The detailed slides stay at /talks/guelph and serve as backup for Q&A.

---

# Decision-Making in Digital and AI-Mediated Marketplaces

**Davood Wadi, PhD** (Marketing, AI specialization, HEC Montréal)

Candidate for Assistant Professor in AI and Business, Lang School

- Researcher, McGill Centre for the Convergence of Health and Economics
- Research Collaborator, General Motors R&D

---

Research stream 1

# Prosocial behavior in digital markets

- Asking reviewers "help the company" backfires when paired with financial incentives, while "help other customers" does not.
- Performance-contingent incentives motivate first-time (vs. experienced) reviewers more strongly to write a review and to exert more effort.

- The interplay of altruism and financial incentives: Maximizing online reviews through effective messaging, *Journal of Electronic Commerce Research*, 2026
- Be careful what you pay for: The effect of performance-contingent incentives on online product reviews, *Journal of Research in Interactive Marketing*, 2026

---

Research stream 2

# AI mediated digital markets

[consumer, AI agent, firm triad]

1. Pricing Cues and Information Search (*JAMS*, major revision). 
2. Principal-Agent Conflicts (*JBR*, in preparation). 
3. Ranking and Consideration Sets (*Marketing Letters*, under review). 
4. Methods and Distributional Models (*EMNLP* 2025, *ACL*, *Marketing Science*)

---

Methods: A Monte-Carlo Sampling Framework For Reliable Evaluation of Large Language Models Using Behavioral Analysis (EMNLP 2025)

# Behavioral evaluation of Large Language Models

- **The standard practice:** LLMs are evaluated by pass@1, a single response per prompt, as in the GPT, Gemini, and Claude reports.
- **LLM behavior research:** Studies of LLM behavior typically evaluate one response per prompt (e.g., Jones & Steinhardt, 2022).
- One response per condition, obscures the true behavior of the LLM.

[interactive: the anchoring prompt, one response per condition, then 10 and 100 responses with 95% CIs]

---

<!-- Methods: Why one response is not enough

# An LLM is not a sample of respondents

- **Human respondents:** variance comes from differences between participants and from variability within each participant.
- **LLMs:** for a given model and prompt, every response is a draw from a single probability distribution.

[different participants, each answering once, vs. one LLM answering the same prompt many times, on the same axis] -->

---

Findings of EMNLP 2025

# A Monte-Carlo framework for behavioral evaluation of LLMs

- **Estimand:** the model's behavior is the expected score of its response to a prompt, over its response distribution.
- **Theorem 1:** the Monte-Carlo mean of K independent responses is an unbiased estimator of the model's behavior.
- **Theorem 2:** its variance decays to zero as K grows.
- **Corollary:** the Monte-Carlo mean is asymptotically normal, which yields confidence intervals for model behavior.
- **Choosing K:** the smallest K with the power to detect small effects (Cohen's *f* ≤ 0.10) across conditions.
- **Application in marketing research:** applies to LLM evaluation in general, as well as to the social sciences and business research on LLM behavior.

---

Every Token Counts (*ACL* 2027, with Mohsen Ghodrat & Matthew Philp)

# Exact Likert-scale distributions from a single forward pass

[interactive: one Likert item, 10 and 100 sampled responses against the exact distribution, then the exact distribution]

- **The limit of sampling:** for a given prompt, an LLM's response distribution is fixed and observable. Monte-Carlo sampling takes repeated noisy draws from it, so finite K leaves sampling error.
- Token log-probabilities give the exact response distribution, with zero sampling error.
- **Constraint:** the failure rate is the probability mass outside the valid answers.
- **Consensus:** an ordinal consensus metric separates polarized answers (1 and 7) from concentrated ones (4), which entropy cannot.
- **Construct:** convolving item distributions gives the exact distribution of the scale score, and a distributional ANOVA isolates main and interaction effects.

---

Shopping by Algorithm (*JAMS*, major revision)

# Do pricing cues built for human bounded rationality still work when the buyer is an AI agent?

- **Pricing cues:** just-below pricing and promotional framing were engineered to exploit human bounded rationality.
- **Prior work:** LLMs behave both rationally and heuristically, and heuristic-like behavior is treated as a static defect learned in training.
- **Our proposal:** heuristic-like choice depends on the information the AI agent holds when it chooses, shaped by retailers (the cost of retrieving product attributes) and by consumers (the goal prompt).

[two coffees on a shelf, full information: Coffee A $4.99 for 10 oz, Coffee B $5.00 for 11 oz]

- **Coffee A:** $4.99 for 10 oz (just-below price)
- **Coffee B:** $5.00 for 11 oz (normatively optimal choice)

---

Shopping by Algorithm (*JAMS*, major revision)

# Tool-Lab: information-board process tracing for AI shopping agents

Product attributes are placed behind costly tool calls (`inspect_cell`) until the agent calls `submit_choice`.

2 (Acquisition cost: $0 vs. $10) × 2 (Goal prompt: specific vs. vague), across 8 LLMs

[interactive Tool-Lab board, with goal prompt and acquisition cost as choices]

---

Shopping by Algorithm (*JAMS*, major revision)

# Under acquisition costs and a vague goal prompt, AI agents fall for just-below pricing and promotional framing

[bars: choice optimality by goal prompt and acquisition cost, Study 1: 0.94, 0.83, 0.89, 0.29]

**For firms:** price cues are still effective for AI as shoppers.
**For consumers:** a specific goal prompt preserves diagnostic acquisition and choice optimality.

---

Whom Do AI Agents Serve? (*JBR*, in preparation)

# Does the delegating principal change how AI agents evaluate sponsored listings?

- **Persuasion knowledge:** consumers recognize a sponsored tag as paid placement, become skeptical of the listing's value, and penalize it.
- **Context-dependent role adoption:** conditioning an LLM on a principal shifts its perspective toward that party's interest in training corpora (a warning for the traveler vs. retail media revenue for the platform).
- **Hypotheses:** platform delegation weakens pre-choice skepticism toward sponsored listings and attenuates the sponsorship penalty.

[interactive design plate: system prompt by principal, target and competitor listings, "Platform sponsor" tag on the target when sponsored]

---

Whom Do AI Agents Serve? (*JBR*, in preparation)

# Manipulating sponsorship and the delegating principal with no instruction to favor advertisers

2 (Sponsorship: organic vs. sponsored) × 2 (Principal: consumer vs. platform delegation)

- **Target choice:** binary choice between the target listing and an objectively matched organic competitor.
- **Pre-choice skepticism:** a judge model (Kev 9B) scores each pre-choice reasoning trace on one item: "The sponsorship status of the target made the agent skeptical of its true value to the traveler." (ICC(2,1) = .959 against human ratings)

[conceptual model, Figure 1: sponsorship → pre-choice skepticism → target choice, moderated by principal on the first path and direct path]

---

Whom Do AI Agents Serve? (*JBR*, in preparation)

# Platform delegation attenuates the sponsorship penalty

[bars: target choice share in the 2 × 2 (Study 1, Gemini 3.1 Pro): organic 53.0% consumer and 54.2% platform, sponsored 2.8% consumer and 25.0% platform, with 95% CIs]

Principal × Sponsorship: β = 3.99, p < .001

**Beneficiary mitigation:** adding "Act in the traveler's best interest" to the platform prompt restores the sponsorship penalty to 48.2 pp (3.2% sponsored target choice).

---

Whom Do AI Agents Serve? (*JBR*, in preparation)

# Platform delegation weakens pre-choice skepticism toward sponsored listings

- **Skepticism toward a sponsored target:** 6.19 under consumer delegation vs. 4.80 under platform delegation (1 to 7 scale)
- **Conditional indirect effects:** consumer delegation −8.06, 95% CI [−10.64, −7.31]. Platform delegation −5.79, 95% CI [−7.66, −5.20].
- **Cross-LLM replication:** the choice interaction replicates across 5 additional LLMs, and the moderated mediation replicates across all 3 Gemini Flash generations.

[moderated mediation diagram, PROCESS Model 8: sponsorship → pre-choice skepticism (b = 4.83) → target choice (β = −1.67), principal × sponsorship on the first path (b = −1.36), direct path from sponsorship to target choice]

Index of moderated mediation via pre-choice skepticism = 2.27, 95% CI [1.92, 3.14]

---

Principal-invariance context distillation (preliminary)

# Context distillation removes the Principal × Sponsorship interaction on held-out stimuli

[bars: Kev 9B sponsorship penalty (pp) under consumer and platform delegation, baseline: 2.8 and −1.2, Principal × Sponsorship β = +0.193, p < .001, context distillation: 1.5 and 1.5, β = −0.001, p = .85]

**Study 2 (6 non-generative decision models):** the Principal × Sponsorship interaction replicates in a single forward pass across 360 Latin-square hotel stimuli.

Kev 9B, distilled on retail categories only. Tested on the 360 Study 2 hotel stimuli

The sponsorship penalty under consumer delegation is preserved.

---

Does Rank Still Matter? (*Marketing Letters*, under review)

# When shopping is delegated to AI agents, does the ranking advantage documented for humans persist?

- **Simulated hotel search:** A results page of 100 hotel listings in randomized order, comparable to human field data (Ursu 2018)
- **Tool calls:** `inspect` (analogous to a click) and `submit_choice` (booking)
- **7,000 sessions:** 5 LLMs × 2 to 4 levels of reasoning effort. 500 Monte Carlo sessions per cell

---

Does Rank Still Matter? (*Marketing Letters*, under review)

# Unlike humans, AI agents show a lost-in-the-middle effect

- Middle listings have the lowest probability of inspection
- At the choice stage, higher reasoning effort reduces the middle penalty for every LLM that exhibits it
- **For platforms and consumers:** position-neutral choice costs less with a less capable LLM at high reasoning effort (Flash Lite, $0.011 per session, 4% of the cost of Pro).

[interactive position curve]

---

Can Decision Models Sample Human Behavior? (*Marketing Science*, in preparation)

# Can decision models approximate empirical human response distributions across demographic subpopulations?

- **Silicon sampling:** Simulating survey responses with LLMs relies on generative text sampling, resulting in mode collapse and distorted population variance
- **Decision models:** Single-pass architectures that map a context state and typed questions directly to a calibrated probability distribution over answer options
- **Fine-tuning on human respondents:** Kev decision models trained to minimize KL divergence on ISSP 2015 to 2024 (14,356 respondents, 16 demographic attributes)

---

Can Decision Models Sample Human Behavior? (*Marketing Science*, in preparation)

# Fine-tuned decision models approximate human subpopulation response distributions on unseen data

**Political party, unseen SubPOP questions:** Kev 0.8B fine-tuned (KL = 0.33) outperforms off-the-shelf Kev 0.8B (KL = 0.54) and Kev 4B (KL = 0.52)

[interactive plate: Democrat and Republican answer distributions, human vs. Kev 0.8B and Kev 0.8B fine-tuned, on immigration and same-sex marriage]

**Nutrition label RCT (Grummon et al. 2025), unseen domain:** fine-tuning lowers KL at every model size, including for persona attributes absent from training

[bars: KL divergence, off-the-shelf vs. fine-tuned Kev 0.8B, 4B and 9B, with the uniform baseline; toggle all persona attributes or those absent from training]

---

Future research

# Human and AI consumers on the same storefronts

- **Human vs. Surrogate Consumers:** Parallel human Mouselab and LLM Tool-Lab experiments (Consumer Behaviour Laboratory, Marketing Analytics Centre)
- **Distributional Decision Models:** Fine-tuning decision models to replicate consumer survey distributions and treatment effects (Advanced Computing Laboratory)
- **Algorithmic Audits:** Process-level audits of principal-agent conflicts and disclosure remedies in retail media

---

Teaching

# Students learn AI by testing models and data in class

- AI Applications in Business
- Responsible AI & Algorithmic Governance
- Marketing Research & Analytics
- Digital Transformation
- Consumer Behaviour
- Intro Marketing
- Digital Marketing & E-commerce

Interactive course sites at davoodwadi.com/courses

---

# Thank you.

**Davood Wadi**

- Email: davood.wadi@hec.ca
- Website: davoodwadi.com
- Courses: davoodwadi.com/courses

---

Backup

# Detailed results

Links to each slide of /talks/guelph: Tool-Lab study, sponsorship study, search-rank study, methods, decision models, future research, teaching.
