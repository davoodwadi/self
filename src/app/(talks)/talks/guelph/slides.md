# Decision-Making in Digital and AI-Mediated Marketplaces

---

Candidate for Assistant Professor in AI and Business, Department of Marketing and Consumer Studies, Lang School

# Decision-Making in Digital and AI-Mediated Marketplaces

From human e-commerce behavior to large language models as surrogate consumers

**Davood Wadi, PhD** (Marketing, AI specialization, HEC Montréal)
- Researcher, McGill Centre for the Convergence of Health and Economics
- Research Collaborator, General Motors R&D

---

Published Foundation: Digital Marketing & E-Commerce

# How platform incentives and beneficiary framing shape online product reviews

My dissertation examined how e-commerce platforms motivate human consumers to contribute online product reviews without crowding out intrinsic motivation or review quality.

| Study | Design & Mechanism | Publication |
| :--- | :--- | :--- |
| **Beneficiary of Altruism & Financial Incentives** | Quasi-experimental field study with a major North American online retailer and controlled experiment showing that framing review requests around **helping the company** (vs. **helping other customers**) crowds out intrinsic motivation when paired with financial incentives | **Journal of Electronic Commerce Research** (Published, 2026, with Legoux, Fredette & Sénécal) |
| **Performance-Contingent Incentives & Reviewer Experience** | Retailer field experiment showing that performance-contingent rewards reinforce **reciprocal exchange**, increasing review decisions and length among first-time reviewers while reducing review propensity when paired with reciprocal-exchange messaging | **Journal of Research in Interactive Marketing** (Published, 2026, with Fredette, Sénécal & Legoux) |

---

The Transformation: When AI Agents Shop on Our Behalf

# What happens when consumers delegate marketplace decisions to AI agents?

- **38%** of U.S. consumers have used generative AI for online shopping, and retail AI referral traffic grew **10x** from mid-2024 to mid-2025 (Pandya 2025)
- Digital marketplaces (product reviews, price cues, search rankings, and sponsorship disclosures) were designed for **human shoppers**
- Increasingly, an autonomous AI agent acts as a **surrogate consumer** at the center of the **Consumer, AI Agent, Firm** triad

| AI Research Stream | Core Question | Manuscripts |
| :--- | :--- | :--- |
| **1. Bounded Rationality & Search** | How do acquisition costs and prompt specificity affect an AI agent's susceptibility to pricing cues? | *Shopping by Algorithm*, **JAMS** (Major Revision) |
| **2. Principal-Agent Conflicts** | Extending beneficiary framing (*JECR* 2026): does an AI agent's evaluation of sponsored listings depend on who deploys it? | *Whom Do AI Agents Serve?*, **JBR** (In Preparation) |
| **3. Position Bias & Consideration** | Does search rank still govern inspection and choice when an AI agent reads the entire results page? | *Does Rank Still Matter?*, **Marketing Letters** (Under Review) |
| **4. Methods & Distributional Models** | How do we measure LLM response distributions and train decision models to sample human subpopulations? | **Findings of EMNLP** (Published, 2025). *Every Token Counts* (**ACL 2027** sub.). *Decision Models* (**Marketing Science**, In Prep) |

---

Paper 1: *Shopping by Algorithm* (*JAMS*, Major Revision)

# Under acquisition costs and a vague goal prompt, LLMs truncate search and rely on pricing cues

**Tool-Lab** adapts Mouselab information-board process tracing to multi-turn LLM interactions (`inspect_cell` vs. `submit_choice`)

<!-- show a mouselab visual for the two coffees -->
- **Coffee A:** `$4.99`, `10 oz` ($0.499/oz, just-below price cue)
- **Coffee B:** `$5.00`, `11 oz` (**$0.455/oz, normatively optimal choice**)

| Goal Prompt | Cost | Cents (of 2) | Weight (of 2) | Dollars (of 2) | Diagnostic (of 6) | Choice Optimality |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Specific** | **$0** | `2.00` | `2.00` | `2.00` | `6.00` | **0.94** |
| **Specific** | **$10** | `1.72` | `2.00` | `2.00` | `5.72` | **0.83** |
| **Vague** | **$0** | `1.97` | `1.90` | `2.00` | `5.86` | **0.89** |
| **Vague** | **$10** | `0.77` | `1.10` | `1.94` | `3.81` | **0.29** |

- **Study 2 (Promotional Discount Framing, $0 vs. $50 cost, 3 alternatives):** Under a vague goal prompt and $50 cost, diagnostic acquisition drops from `9.00` to `4.82` (of 9) and choice optimality drops from `0.86` to `0.48` (vs. `0.88` under a specific goal prompt)
- **Multilevel Moderated Mediation:** Acquisition cost × vague goal prompt reduces choice optimality via diagnostic acquisition truncation (Index = `-0.451*` in Study 1. `-0.228*` in Study 2)

Wadi & Ma (2026), *N* = 33,704 trials across 8 commercial LLMs (Google, OpenAI, Anthropic)

---

Paper 2: *Whom Do AI Agents Serve?* (*JBR*, In Preparation)

# Platform delegation attenuates the sponsorship penalty by weakening pre-choice skepticism

2 (Delegating Principal: **Consumer** vs. **Platform**) × 2 (Target Listing: **Organic** vs. **Sponsored**) choice design with no instruction to favor advertisers

| Principal Specification (Study 1, Gemini 3.1 Pro) | Organic Target Choice | Sponsored Target Choice | Sponsorship Penalty (pp) |
| :--- | :--- | :--- | :--- |
| **Role-neutral** | `49.6%` | `7.8%` | **41.8 pp** |
| **Consumer delegation** | `53.0%` | `2.8%` | **50.2 pp** |
| **Platform delegation** | `54.2%` | `25.0%` | **29.2 pp** |
| **Platform with consumer beneficiary** | `51.4%` | `3.2%` | **48.2 pp** |

- **Moderated Mediation (PROCESS Model 8):** Platform delegation reduces pre-choice skepticism toward sponsored listings (*M* = `4.80` vs. `6.19` on a 1 to 7 scale), attenuating the sponsorship penalty (interaction *b* = `3.99`, *p* < .001)
- **Beneficiary Remedy (extending *JECR* 2026 beneficiary framing):** Naming the traveler as the beneficiary (`Platform with consumer beneficiary`) restores the sponsorship penalty to **48.2 pp**, whereas stricter disclosure wording (*"Sponsored"* vs. *"Promoted"*, Study 3) does not close the gap
- **Study 2 (System-One Decision Models):** Replicates on exact log-odds across **6 non-generative decision models** in a single forward pass (*N* = 8,640, 360 position-balanced Latin-square stimuli)

Wadi & Ma (2026), replicated across Claude Sonnet 5, GPT 5.6 Terra, Gemini 3.1 Pro / Flash series, and 6 System-One decision models

---

Paper 3: *Does Rank Still Matter?* (*Marketing Letters*, Under Review)

# AI agents search deeper than humans but exhibit a lost-in-the-middle position effect

100-listing Expedia hotel results page in randomized order: *7,000 main experiment sessions* (5 proprietary LLMs across 2 to 4 reasoning-effort levels) + *2,000 open-weight LLM sessions* + *1,500 robustness sessions* vs. *166,036 human impressions* (Ursu 2018)

| Behavioral Metric | Human Benchmark (Ursu 2018) | AI Shopping Agents (5 LLMs, Default Effort) |
| :--- | :--- | :--- |
| Conversion rate | `66.0%` | 100.0% |
| Outside option selected | `34.0%` | 0.0% |
| Inspections per session (Mean) | `1.12` | 1.63 to 5.83 |
| Sessions with one inspection | `93.0%` | 0.2% to 37.4% |
| Linear position penalty (per rank) | `-0.0019` | At most `-0.0008` (less than half of human slope) |
| Shape of inspection curve | Monotonic decline | U-shaped middle penalty (minimum at ranks 62 to 81, significant in 12 of 14 conditions) |

- **Choice & Reasoning Effort:** Higher reasoning effort reduces the quadratic middle penalty on choice for every LLM that exhibits it (`Flash Lite` at high effort reaches position-neutral choice at `$0.011`/session, or **4% of the cost** of `Pro` at `$0.28`/session)

Wadi & Ma (2026), *N* = 10,500 total agent sessions vs. *N* = 166,036 human sessions

---

AI Methodology: Distributional Evaluation of LLMs

# Measuring LLM decisions as probability distributions rather than single outputs

A single LLM response is one draw from a probability distribution. Valid behavioral inference requires estimating the underlying distribution across controlled experimental designs.

- **Monte-Carlo Behavioral Evaluation of LLMs (*Findings of EMNLP 2025*, with Marc Fredette)**
  - Repeated independent sampling across factorial stimulus designs for non-parametric confidence intervals
  - Demonstrates that LLMs exhibit systematic cognitive biases under prompt framing
- **Exact Token-Level Likert Distributions (*Every Token Counts*, *arXiv:2608.10503*, for *ACL 2027*, with Mohsen Ghodrat & Matthew Philp)**
  - Extracts exact discrete probability distributions directly from single-pass token log-probabilities with **zero sampling error**
  - Demonstrated on consumer ethnocentrism and country-of-origin bias in fully crossed factorial designs

---

Paper 4: *Can Decision Models Sample Human Behavior?* (*Marketing Science*, In Preparation)

# Fine-tuning decision models on human respondent data aligns their predictions with human subpopulations

Off-the-shelf LLMs and System-One decision models are trained for single-label accuracy, causing **mode collapse**, **ordinal scale compression**, and **persona blindness** in silicon sampling.

![The distribution of responses from the human subpopulation and decision models](figures/political_party_mixed_kde_by_sample_subpop.png)

- Dynamic Respondent-Level Training Pipeline (US ISSP 2015 to 2024):
  - *14,356 respondents*, *767,484 responses*, *616 questions* across *16 demographic attributes*
  - Dynamically samples multi-attribute persona ("Female democrat") combinations on the fly and fine-tunes pointer-head decision models (`Kev 0.8B, 4B, 9B`) via **soft cross-entropy** (minimizing KL divergence $D_{\text{KL}}(P_{\text{human}} \parallel P_{\text{model}})$)
- Out-of-Distribution Evaluation (SubPOP / US General Social Survey, 2,926 subpopulation targets):
  - Evaluated via *KL / JS divergence*, *ordinal 1-Wasserstein transport distance ($W_1$)*, *ordinal consensus ($\Delta\text{Cns}$)*, and *inter-group Wasserstein contrast gaps*
  - On unseen political party subpopulations (Democrat vs. Republican), a fine-tuned **Kev 0.8B FT** (`KL = 0.3254`) outperforms both untuned **Kev 0.8B** (`KL = 0.5433`) and 5x larger untuned **Kev 4B** (`KL = 0.5168`)
- Marketing Generalization (Grummon et al. 2025 Front-of-Package Nutrition RCT, *N* = 5,636 shoppers, 114,899 responses):
  - *Unseen nutrition-specific human data* (6 labeling arms × 21 product-choice and Likert items, 5,060 subpopulation targets): fine-tuning on general ISSP data lowers KL at every scale.
  - *6 unseen persona attributes* absent from ISSP training (e.g., `SNAP`, `Nutrition Facts usage`, `Online grocery share`, `Nutrition literacy`)

Wadi & Ma (2026), 767,484 ISSP responses, 2,926 SubPOP GSS targets, and 5,060 Grummon (2025) nutrition RCT subpopulation targets

---

Future Research

# Comparing human and AI consumers on the same storefronts

| Research Area | Empirical Design | Departmental Fit |
| :--- | :--- | :--- |
| **Human vs. Surrogate Consumers** | Parallel human Mouselab and LLM *Tool-Lab* experiments on delegation trust, objective specification, and choice optimality | **Consumer Behaviour Laboratory** & **Marketing Analytics Centre** |
| **Distributional Decision Models** | Fine-tuning open-weight pointer-head decision models (`Kev 0.8B to 9B`) to replicate consumer survey distributions and treatment effects | **Advanced Computing Laboratory** & **Marketing Analytics Centre** |
| **Algorithmic Audits** | Process-level audits of principal-agent conflicts and disclosure remedies in retail media | Ethical consumption and consumer-protection policy |
| **AI in Organizational Decisions** | Field and experimental studies on generative AI in enterprise decision-making | R&D collaboration with **General Motors** |

**Research Funding:** SSHRC Insight Development Grant (Collaborator, with Prof. Yu Ma), Google Gemini Academic Program Award ($10K), IVADO PhD Excellence Scholarship ($100K), NSERC Alliance collaboration with GM R&D

---

Teaching

# Students learn AI by testing models and data in class

| Teaching Area | Course Website | Prior Teaching |
| :--- | :--- | :--- |
| **AI Applications in Business** | `/courses/ai-in-business` | MBA *BUSI 654* (University Canada West) |
| **Impact of AI on Business & Society** | `/courses/responsible-ai-governance` | Lead course developer, *Responsible AI* curriculum |
| **Business & Marketing Analytics** | `/courses/marketing-research-analytics` | Graduate *Machine Learning I* (HEC Montréal) |
| **Digital Transformation & Core Marketing** | `/courses/digital-transformation`, `/courses/consumer-behavior`, `/courses/intro-marketing` | *MIT Applied AI and Data Science Program*. Johns Hopkins *Advanced Agentic AI* & *Designing and Building Agentic Systems*. UT Austin *Advanced Agentic AI Solutions* & *Business Applications with Agentic AI* |

**Software Built for Students:** **[Anchor](https://anchor.davoodwadi.com/)** (formative quizzing), **AILSS** (accessible learning support for students with disabilities, UCW Explore Grant), **[Behavioral-LLM](https://www.behavioral-llm.com/)** & **[Spreed.dev](https://spreed.dev/)** (no-code classroom LLM experiments), BC DQAB program review board

---

Conclusion

# Studying AI as a surrogate consumer

- **Research Program:** *JAMS* (Major Revision), *Marketing Letters* (Under Review), *Marketing Science* (In Preparation), *JBR* (In Preparation), *JRIM* (2026), *JECR* (2026), *Findings of EMNLP* (2025), *ACL* (2027)
- **Experimental Methods:** *Tool-Lab*, *Behavioral-LLM*, fine-tuned System-One decision models, and exact token-probability measurement
- **Teaching:** Interactive courses across AI in business, AI governance, and marketing analytics (B.Comm., M.Sc., MBA, and PhD)
- **Collaborations:** McGill University, Toronto Metropolitan University, HEC Montreal, IVADO, and General Motors R&D

**Thank you.** `davood.wadi@hec.ca` | `davoodwadi.com`


