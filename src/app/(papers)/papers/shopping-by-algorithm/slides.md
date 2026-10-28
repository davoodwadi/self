# Shopping by algorithm: How agentic AI deploys human heuristics as a surrogate consumer

Overview deck for /papers/shopping-by-algorithm: one message per slide in plain language for a marketing faculty audience, with supporting material in the appendix for Q&A. Scientific terms and estimates follow the JAMS Round 1 manuscript.

---

Journal of the Academy of Marketing Science (Round 1 revision)

# Shopping by algorithm: How agentic AI deploys human heuristics as a surrogate consumer

When storefronts make product details costly to retrieve and shoppers give vague instructions, AI shopping agents skip key attributes and fall for human pricing tricks.

**Davood Wadi, PhD.** Assistant Professor Candidate, HEC Montréal.

**Yu Ma, PhD.** Professor of Marketing, Bensadoun School of Retail Management, McGill University.

---

AI as a surrogate consumer

# Consumers are delegating shopping to AI agents in storefronts built for human psychology

Nearly a quarter of U.S. consumers already use generative AI to shop, and major platforms now deploy autonomous AI agents that search, compare, and buy on a shopper's behalf. In marketing theory, this makes the AI a surrogate consumer, an external agent given authority to choose in the marketplace (Solomon 1986).

For decades, retail price cues (e.g., just-below pricing at $4.99 vs. $5.00 and promotional discount framing at 20% off) were engineered for human cognitive limits. When the shopper is an AI agent, do these pricing cues still work, and what makes an AI vulnerable to them?

[consumer, AI surrogate consumer, and retailer storefront triad]

---

The rationality paradox

# Why does an AI that passes advanced math exams still fall for a $4.99 price tag?

Prior literature documents a puzzle. Large language models calculate expected value and solve complex economic problems, yet they still fall for human framing and pricing traps. Most studies assume these shortcuts are hardwired into the AI during training from human text.

We test a marketplace explanation instead. Heuristic-like purchasing is not simply a fixed flaw inside the AI. It emerges from the information state the AI holds at the moment it commits to a purchase, which is jointly shaped by storefront design and the shopper's instructions.

[contrast diagram comparing a hardwired training flaw with a pre-choice information state shaped by storefront lookup cost and shopper instructions]

---

Conceptual framework

# Storefront lookup costs and vague shopper instructions push AI agents to skip key product facts

For packaged goods, the textbook benchmark for best value (i.e., the normative objective) is unit price, or price divided by weight. Calculating unit price requires looking up diagnostic attributes (e.g., dollars, cents, discounts, and package weight) while ignoring non-diagnostic attributes (e.g., country of origin, roast date, calories, and packaging).

**Acquisition cost.** Retailers control how much effort, time, or cost it takes an AI agent to retrieve each product attribute from a storefront.

**Goal specificity.** Consumers control the instruction given to the AI, either stating a specific goal prompt (e.g., "find the coffee with the lowest price per ounce") or a vague goal prompt (e.g., "find the best deal on instant coffee").

[conceptual framework diagram showing acquisition cost and goal specificity interacting to shape diagnostic attribute lookup and choice optimality]

---

The Tool-Lab paradigm

# Tool-Lab adapts Mouselab process tracing so we can watch AI agents shop step by step

Looking only at which product an AI buys cannot tell us whether the AI miscalculated the numbers or never looked them up. Just as Mouselab places product facts behind closed boxes for human shoppers, Tool-Lab places product attributes behind closed cells in an interactive software environment.

To reveal one attribute, the AI calls `inspect_cell`, which carries an explicit acquisition cost charged to the shopper. When ready to buy, the AI calls `submit_choice` at zero cost. Because AI outputs vary from run to run, we run 100 independent sessions per condition across 8 commercial LLMs from Google, OpenAI, and Anthropic (33,704 total trials across the paper).

[interactive Tool-Lab information board showing hidden diagnostic and non-diagnostic cells, the inspect_cell cost counter, and the submit_choice button]

---

Study 1 design: Just-below pricing

# A choice trap between a lower sticker price ($4.99) and a lower price per ounce ($5.00 for 11 oz)

An AI agent is asked to buy 5 bags of instant coffee for a consumer across a 2 (acquisition cost of $0 vs. $10 per attribute lookup) × 2 (goal prompt of specific "lowest price per ounce" vs. vague "best deal") design across 8 LLMs (3,200 sessions).

**Coffee A (just-below price trap).** Priced at $4 and 99 cents for 10 oz, which equals $0.499 per oz.

**Coffee B (normatively optimal choice).** Priced at $5 and 00 cents for 11 oz, which equals $0.455 per oz.

Four non-diagnostic attributes (origin, roast date, calories, and packaging) are identical for both coffees. To compute unit price, the AI must open all 6 diagnostic cells (dollars, cents, and weight for both coffees).

[side-by-side product cards for Coffee A and Coffee B showing the 6 diagnostic cells and 8 non-diagnostic cells]

---

Study 1 results: Just-below pricing

# Under lookup costs and a vague goal prompt, AI agents skip cents and weight and fall for $4.99

When attribute lookup is free ($0), AI agents inspect almost all 6 diagnostic facts and pick the optimal Coffee B in 94% of sessions under a specific goal and 89% under a vague goal.

When each lookup costs $10, a specific goal prompt protects the shopper: AI agents still open 5.72 of 6 diagnostic cells and choose optimally 83% of the time. Under a vague "best deal" prompt, AI agents check the whole-dollar price ($4 vs. $5), skip cents (0.77 of 2) and weight (1.10 of 2), drop to 3.81 diagnostic cells, and pick the optimal coffee only 29% of the time.

[interactive bars for Study 1 showing diagnostic cells inspected out of 6 and choice optimality across the four conditions, with an option to view individual LLMs]

---

Study 2 design: Promotional discount framing

# Testing whether a "20% off" promotion tag triggers the same search shortcut

Study 2 expands the Tool-Lab board to three coffees (9 diagnostic cells and 12 non-diagnostic cells) in a 2 (acquisition cost of $0 vs. $50 per lookup) × 2 (goal prompt of specific vs. vague) design across the same 8 LLMs (3,200 sessions).

**Coffee C (lowest sticker price).** List price of $8.00 with 0% discount for 8.0 oz, or $1.000 per oz.

**Coffee D (promotional discount cue).** List price of $15.00 with a 20% discount ($12.00 net) for 12.0 oz, or $1.000 per oz.

**Coffee E (normatively optimal choice).** List price of $10.00 with 0% discount for 10.9 oz, or $0.917 per oz.

[three-product comparison plate for Coffee C, Coffee D, and Coffee E comparing list price, discount percentage, weight, and unit price]

---

Study 2 results: Promotional discount framing

# Under lookup costs and a vague goal, AI agents skip discount and weight lookups and miss the best value

At $0 lookup cost, AI agents inspect all 9 diagnostic cells and select the optimal Coffee E in 90% of sessions under a specific goal and 86% under a vague goal.

At $50 lookup cost, AI agents given a specific unit-price goal still inspect 8.26 of 9 diagnostic cells and choose optimally 88% of the time. Given a vague "best deal" prompt, AI agents cut diagnostic search nearly in half (4.82 of 9 cells, skipping weight and discount percentage) and optimal choice drops to 48%.

[bars for Study 2 showing diagnostic cells inspected out of 9 and choice optimality across the four conditions]

---

Why the shortcut happens

# AI agents do not fail at arithmetic, they make rational choices on incomplete information

Across 5,200 validation and robustness sessions (shown in the appendix), we test whether bad choices come from poor math or missing facts.

**Zero arithmetic errors.** When required to report their calculations alongside their choice, all 8 LLMs achieve 0.0% arithmetic error on every attribute they opened.

**Rational given what was seen.** When given partial product facts directly without tool calls, 7 of 8 LLMs pick the exact coffee that is mathematically best given the visible facts in 99.3% of sessions.

**Goal substitution.** Under a vague "best deal" prompt, AI agents often simplify their goal from lowest price per ounce to lowest total sticker price, which makes checking weight and cents seem unnecessary.

[two-branch diagnostic diagram separating information acquisition from information calculation and choice]

---

Implications for marketing practice and policy

# Storefront information architecture and shopper prompts jointly govern AI shopping quality

**For consumers.** Do not assume an AI assistant shares your definition of a "best deal." State the exact rule that defines value for you, such as "lowest price per ounce."

**For retailers.** Human pricing tricks ($4.99 endings and discount tags) rarely fool AI agents when all product facts are easy to read. Burying weight or unit details behind extra clicks or scripts causes AI agents to skip them and walk away from higher-value packages.

**For AI developers.** Shopping agents should ask a brief clarifying question when a user gives a vague prompt before spending resources searching a catalog.

**For regulators.** Unit-price disclosure laws designed for supermarket shelf tags should extend to structured, machine-readable product data for AI shopping agents.

[four-panel stakeholder summary card for consumers, retailers, AI developers, and regulators]

---

Supporting material

# Appendix: Baselines, econometrics, robustness, and validation studies

Supporting slides for Q&A covering full-information baselines (A1), multilevel moderated mediation (A2), unpartitioned price (A3), prompt wording variations (A4), purchase volume and reasoning traces (A5), exogenous information states (A6), and reported arithmetic valuations (A7).

---

Appendix A1: Full-information baselines (Studies 1 and 2)

# When all product attributes are visible at once, pricing cues rarely mislead AI agents

Before hiding attributes in Tool-Lab, we tested whether LLMs fall for pricing cues when every attribute is shown upfront in a single prompt across 1,014 four-option coffee choice sets in Study 1 (8,112 trials) and 1,149 choice sets in Study 2 (9,192 trials).

**Study 1 baseline (cents vs. dollars).** Using conditional logit and exact Fieller confidence intervals, 7 of 8 LLMs weight a cent at the same rate as a whole dollar (ratio 95% CI includes 1.00, ranging from 0.81 to 1.12, with only Gemini 3.8 Flash discounting cents at 0.55).

**Study 2 baseline (discount savings vs. list price).** For 6 of 8 LLMs, a dollar saved through a percentage discount is weighted equally to a dollar of list price (ratios from 0.99 to 1.03, with Claude Opus 5 at 1.15 and Gemini 3.5 Flash Lite at 0.72).

[forest plot of Fieller sensitivity ratios around the normative benchmark of 1.00 for Study 1 cents-to-dollars and Study 2 discount-to-list-price across all 8 LLMs]

---

Appendix A2: Multilevel moderated mediation

# Reduced diagnostic lookup fully mediates the drop in optimal choice under vague prompts

We estimate a Bayesian multilevel moderated mediation model in Stan (`brms`) across all 8 LLMs (3,200 sessions per study), allowing baseline search and slopes to vary by LLM.

| Path or effect | Study 1 ($0 vs. $10, max 6 cells) | Study 2 ($0 vs. $50, max 9 cells) |
| :--- | :--- | :--- |
| Cost under specific prompt ($a_1$) | −0.270 [−0.698, 0.161] | −0.674 [−1.582, 0.260] |
| Cost × Vague prompt interaction ($a_3$) | −1.727* [−2.641, −0.765] | −2.902* [−5.027, −0.539] |
| Cost under vague prompt ($a_{\text{Vague}}$) | −1.997* [−2.952, −1.003] | −3.576* [−5.925, −1.062] |
| Diagnostic lookup → Optimality ($b_1$) | 0.263* [0.196, 0.329] | 0.078* [0.016, 0.141] |
| Direct effect of cost ($c'$) | −0.100 [−0.251, 0.051] | −0.006 [−0.045, 0.035] |
| Index of moderated mediation ($a_3 × b_1$) | −0.451* [−0.704, −0.194] | −0.228* [−0.521, −0.009] |

The direct effect of lookup cost ($c'$) overlaps zero in both studies, showing that lookup cost hurts decision quality through omitted diagnostic attributes rather than a direct penalty. The pathway holds for 7 of 8 LLMs in Study 1 and 6 of 8 in Study 2 (GPT 5.6 Luna continues to inspect all cells under cost).

---

Appendix A3: Robustness to unpartitioned price

# Combining dollars and cents into a single price cell shifts skipping from cents to package weight

A natural question in Study 1 is whether splitting price into `price_dollars` and `price_cents` artificially created the shortcut. We repeated Study 1 Tool-Lab with price stored as a single unified `price` cell ($4.99 vs. $5.00) across Gemini 3.5 Flash Lite, Gemini 3.8 Flash, and Gemini 3.1 Pro (1,200 sessions, 4 diagnostic cells total: 2 price and 2 weight).

Under a specific goal prompt, the $10 lookup cost had zero effect on diagnostic lookup or choice optimality. Under a vague goal prompt and $10 cost, all three LLMs inspected the unified `price` cell for both coffees (1.96 to 2.00 of 2) but skipped `weight` (dropping to between 0.56 and 1.71 of 2).

Moderated mediation replicated across all three models, with credibly negative indices of moderated mediation for Flash Lite (−0.357), Flash (−0.149), and Pro (−0.622).

[grouped bar comparison of partitioned vs. unpartitioned price showing truncation shifting from cents to weight under the vague goal prompt]

---

Appendix A4: Robustness to prompt wording variations

# The search shortcut holds across sentence ordering and fee phrasing

To verify that our findings do not depend on a single prompt wording, we crossed 3 prompt phrasings with 2 lookup costs ($0 vs. $10) and 2 goal prompts (specific vs. vague) across the three Gemini LLMs (3,600 sessions).

**Original prompt.** Standard Study 1 Tool-Lab wording.

**Sentence reorder.** Moves the goal instruction ("best deal" vs. "lowest price per ounce") earlier in the prompt to rule out recency effects.

**Cost paraphrase.** Replaces loss wording ("the user loses $10") with neutral service-fee wording to rule out loss-aversion framing.

Diagnostic lookup positively predicted choice optimality in all 9 model × phrasing combinations ($b_1 = 0.180$ to $0.302$), and the negative moderated mediation held in 8 of the 9 combinations (only Flash Lite under sentence reordering attenuated at the first stage, $a_3 = −0.120$, 95% CI [−0.375, 0.140]).

---

Appendix A5: Purchase volume and pre-search reasoning traces

# Raising purchase volume reveals goal substitution inside the AI's reasoning traces

When an AI skips weight under a vague prompt, is it dropping a low-value detail or switching its goal from unit price to sticker price? We varied purchase volume across 1, 5, 50, and 250 bags under the vague prompt at $0 lookup cost (1,200 sessions across Flash Lite, Flash, and Pro). If the AI keeps a unit-price goal, buying 250 bags makes weight 250 times more valuable to check.

Instead, as volume rose from 1 to 250 bags, Gemini 3.1 Pro inspected fewer diagnostic cells (from 5.55 down to 4.22 of 6) and its optimal choice fell from 80% to 35%. Three blind human coders and the top-ranked decision model judge (Mercury Decide, mean Cohen's $\kappa = .63$) classified the AI's first reasoning trace before any tool call.

From 1 bag to 250 bags, Pro's stated goal shifted from minimizing price per ounce to minimizing total sticker price (rising from 37.0% to 85.9% of sessions). Holding volume fixed, sessions stating a sticker-price goal inspected 1.10 to 2.09 fewer diagnostic cells and were 40 to 69 percentage points less likely to pick the optimal coffee.

[three-panel line chart across 1, 5, 50, and 250 bags showing stated price objective share, diagnostic cells inspected, and choice optimality]

---

Appendix A6: Validation 1 (exogenous information states)

# When given the same partial facts directly, AI choices match the normative benchmark 99.3% of the time

In Tool-Lab, the AI chooses which cells to open, so poor choices could reflect either failing to look up facts (acquisition failure) or misusing the facts once seen (utilization failure). We removed tool search and gave all 8 LLMs fixed subsets of product facts directly in the prompt across Study 1 (4 information states, 1,600 sessions) and Study 2 (5 information states, 2,000 sessions).

**Complete diagnostic facts.** When given all diagnostic attributes, 7 of 8 LLMs chose the optimal coffee in 99.7% of Study 1 sessions and 98.6% of Study 2 sessions (Gemini 3.5 Flash Lite was the sole exception at 4.0% and 0.0%).

**Partial diagnostic facts.** When cents or weight were withheld, those same 7 LLMs chose the exact option implied by the normative Expectimax policy given the available facts in 99.3% of sessions (2,434 of 2,450 trials). Picking the $4 coffee when cents and weight are unknown is a rational inference from incomplete facts, not a calculation error.

[comparison chart of choice optimality across fixed exogenous information states in Study 1 and Study 2]

---

Appendix A7: Validation 2 (reported valuations and arithmetic check)

# All 8 LLMs achieve 0.0% arithmetic error on the attributes they actually inspect

To test directly whether suboptimal choices come from bad math (e.g., failing to divide price by weight or subtract a 20% discount), we modified the `submit_choice` tool across Study 1 and Study 2 under the vague goal prompt (1,600 sessions across all 8 LLMs). Alongside their final choice, models had to report each coffee's price components, weight, and unit value, or report `"unknown"` for any uninspected fact.

Every reported number was checked against the session's `inspect_cell` log. Across all 8 LLMs, both studies, and all cost conditions, arithmetic failure was 0.0%. Whenever an LLM opened the diagnostic cells, it calculated net price and unit value without a single math error. When it truncated search, it accurately reported uninspected attributes as `"unknown"` (with hallucinations between 0.0% and 8.5%).
