# Decision-Making in Digital and AI-Mediated Marketplaces (brief deck)

Condensed version of /talks/guelph: one message per slide, about 40 words or fewer. Each paper gets a research question and method slide, then a results slide. Scientific terms follow the manuscripts exactly. The detailed slides stay at /talks/guelph and serve as backup for Q&A.

---

Candidate for Assistant Professor in AI and Business, Lang School

# Decision-Making in Digital and AI-Mediated Marketplaces

From human e-commerce behavior to large language models as surrogate consumers

**Davood Wadi, PhD** (Marketing, AI specialization, HEC Montréal)
- Researcher, McGill Centre for the Convergence of Health and Economics
- AI Research Scientist, General Motors R&D

---

Where I come from

# Prosocial behavior and financial incentives in digital markets

- Asking for reviews "to help the company" backfires when paired with payment. "to help other customers" does not.
- Performance-contingent incentives motivate first-time (vs. experienced) reviewers more strongly to write a review and to put more effort.

- *The interplay of altruism and financial incentives: Maximizing online reviews through effective messaging*, Journal of Electronic Commerce Research, 2026
- *Be careful what you pay for: The effect of performance-contingent incentives on online product reviews*, Journal of Research in Interactive Marketing, 2026

<!-- **Next: what happens when the shopper is an AI agent?** -->

---

Why AI agents

# Storefronts were built for humans. AI agents now act as surrogate consumers.

- **38%** of U.S. consumers have shopped with generative AI
- AI referral traffic to retailers grew **10x** in one year (Pandya 2025)

[consumer, AI agent, firm triad]

1 Bounded Rationality & Search (*JAMS*, major revision). 2 Principal-Agent Conflicts (*JBR*, in preparation). 3 Position Bias & Consideration (*Marketing Letters*, under review). 4 Methods & Distributional Models (*EMNLP* 2025, *ACL*, *Marketing Science*)

---

Paper 1: *Shopping by Algorithm* (*JAMS*, major revision)

# Tool-Lab: information-board process tracing for AI shopping agents

Product attributes are placed behind costly tool calls (`inspect_cell`) until the agent calls `submit_choice`.

2 (Acquisition cost: $0 vs. $10) × 2 (Goal prompt: specific vs. vague), across 8 LLMs

- **Coffee A:** $4.99 for 10 oz (just-below price)
- **Coffee B:** $5.00 for 11 oz (normatively optimal choice)

[interactive Tool-Lab board, with goal prompt and acquisition cost as choices]

---

Paper 1: *Shopping by Algorithm* (*JAMS*, major revision)

# Under acquisition costs and a vague goal prompt, AI agents fall for just-below pricing and promotional framing

[bars: choice optimality by goal prompt and acquisition cost, Study 1: 0.94, 0.83, 0.89, 0.29]

**For firms:** price cues are still effective for AI as shoppers.
**For consumers:** a specific goal prompt preserves diagnostic acquisition and choice optimality.

---

Paper 2: *Whom Do AI Agents Serve?* (*JBR*, in preparation)

# Does the delegating principal change how an AI agent evaluates sponsored listings?

2 (Sponsorship: organic vs. sponsored) × 2 (Principal: consumer vs. platform delegation)


**DV:** target choice. **Mediator:** pre-choice skepticism (Kev 9B judge, ICC(2,1) = .959)

[interactive design plate: system prompt by principal, target and competitor listings, "Platform sponsor" tag on the target when sponsored]

---

Paper 2: *Whom Do AI Agents Serve?* (*JBR*, in preparation)

# Platform delegation attenuates the sponsorship penalty

[bars: sponsored target choice share by principal specification: role-neutral 7.8%, consumer delegation 2.8%, platform delegation 25.0%, platform with consumer beneficiary 3.2%]

Principal × Sponsorship: β = 3.99, p < .001

Index of moderated mediation via pre-choice skepticism = 2.27, 95% CI [1.92, 3.14]

Replicates across 5 additional LLMs and 6 decision models

---

Paper 2: Principal-invariance context distillation (preliminary)

# Context distillation removes the Principal × Sponsorship interaction on held-out stimuli

[bars: Kev 9B sponsorship penalty (pp) under consumer and platform delegation, baseline: 2.8 and −1.2, Principal × Sponsorship β = +0.193, p < .001, context distillation: 1.5 and 1.5, β = −0.001, p = .85]

Kev 9B, distilled on retail categories only. Tested on the 360 Study 2 hotel stimuli

The sponsorship penalty under consumer delegation is preserved.

---

Paper 3: *Does Rank Still Matter?* (*Marketing Letters*, under review)

# When shopping is delegated to AI agents, does the ranking advantage documented for humans persist?

- **Simulated hotel search:** A results page of 100 hotel listings in randomized order, comparable to human field data (Ursu 2018)
- **Tool calls:** `inspect` (analogous to a click) and `submit_choice` (booking)
- **7,000 sessions:** 5 LLMs × 2 to 4 levels of reasoning effort. 500 Monte Carlo sessions per cell

---

Paper 3: *Does Rank Still Matter?* (*Marketing Letters*, under review)

# Unlike humans, AI agents show a lost-in-the-middle effect

- Middle listings have the lowest probability of inspection
- At the choice stage, higher reasoning effort reduces the middle penalty for every LLM that exhibits it
- **For platforms and consumers:** position-neutral choice costs less with a less capable LLM at high reasoning effort (Flash Lite, $0.011 per session, 4% of the cost of Pro).

[interactive position curve]

---

Methods

# A single LLM response is one draw from a probability distribution

[interactive Likert plate]

- Monte-Carlo behavioral evaluation of LLMs (*Findings of EMNLP* 2025)
- Exact token-level Likert distributions (*ACL* 2027 submission)

---

Paper 4: *Can Decision Models Sample Human Behavior?* (*Marketing Science*, in preparation)

# Can decision models approximate empirical human response distributions across demographic subpopulations?

- **Silicon sampling:** Simulating survey responses with LLMs relies on generative text sampling, resulting in mode collapse and distorted population variance
- **Decision models:** Single-pass architectures that map a context state and typed questions directly to a calibrated probability distribution over answer options
- **Fine-tuning on human respondents:** Kev decision models trained to minimize KL divergence on ISSP 2015 to 2024 (14,356 respondents, 16 demographic attributes)

---

Paper 4: *Can Decision Models Sample Human Behavior?* (*Marketing Science*, in preparation)

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
