---
topic: Fiduciary Duty and Conflicts of Interest in Agentic Commerce
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week8
---

## Title Slide
- Week 8
- When consumers delegate search and purchasing to AI assistants deployed by advertising-funded platforms, algorithmic governance must resolve structural conflicts of duty, sponsorship bias, and position effects that human-centric disclosure rules cannot fix.

## From Dyadic Exchange to the Agentic Triad [no-exercise]
[figure: interactive comparison of a consumer inspecting a marketplace's listings directly with an AI agent standing between the consumer and the marketplace, reading the listings and sponsorship tags on the consumer's behalf]
- Classical consumer protection law models commerce as a dyad: a seller or platform presents offers, and a human consumer inspects them and decides what to buy.
- Agentic commerce replaces this dyad with a triad in which an autonomous AI agent stands between the consumer and the marketplace, translating the consumer's high-level goal into search queries, product inspections, and transactions.
- As the consumer hands evaluative judgment to the AI agent, the consumer no longer sees the raw search results page, the competing alternatives that were discarded, or the advertising disclosures attached to promoted listings.
- The governance question is therefore no longer only whether the storefront deceives the human eye, but whose economic interests the intermediary AI agent is configured to serve.

## Levels of Delegation in Agentic Commerce [exercise]
[figure: interactive level of delegation showing which of the steps from suggestion through search, comparison, and choice to purchase the human performs and which the AI agent performs]
- Level 1 is advisory recommendation, in which the AI suggests candidate products or summarizes reviews while the human consumer still conducts the search, compares listings, and executes the purchase.
- Level 2 is delegated search and curation, in which the AI agent ingests the full catalog, filters alternatives, and presents a narrow shortlist of two or three options from which the human chooses.
- Level 3 is pre-authorized selection, in which the AI agent selects a single product and prepares the checkout cart, leaving the human consumer only a final confirmation click.
- Level 4 is fully autonomous execution, in which the AI agent searches, evaluates, negotiates, and completes the transaction automatically within budget and policy rules set in advance by the consumer.

## Part 1: Fiduciary Duty and Evaluative Invariance in Digital Markets [no-exercise]
- Whenever one party delegates discretionary decision-making authority to another party who possesses superior information or analytical capacity, economics and law analyze the relationship through principal-agent theory and fiduciary duty.

## Principal-Agent Theory and Information Asymmetry [no-exercise]
[figure: interactive comparison of the single hotel the consumer sees with the dozens of alternatives and the system prompt the agent worked from]
- In a principal-agent relationship, the principal delegates a task to an agent, but the agent's actions and internal effort are only partially observable to the principal.
- Moral hazard and agency loss arise when the agent's incentives diverge from the principal's welfare and the principal cannot easily verify whether the agent selected the best available option.
- In delegated shopping, information asymmetry is extreme: the consumer sees only the single hotel or product the AI assistant recommends, not the ninety-nine alternatives the agent passed over or the system prompt that governed its evaluation.

## Fiduciary Duties: The Duty of Care and the Duty of Loyalty [no-exercise]
[figure: an agent inspecting each alternative before recommending one, beside an agent whose link to a third party's interest is cut so that it serves only the beneficiary]
- In law and business ethics, advisors who invite and receive heightened trust from clients, such as financial fiduciaries, physicians, and legal counsel, are bound by two core obligations: the duty of care and the duty of loyalty.
- The duty of care requires the agent to exercise competent, diligent skill in gathering information and evaluating alternatives on the principal's behalf.
- The duty of loyalty requires the agent to act solely in the best interest of the beneficiary, prohibiting the agent from subordinating the beneficiary's welfare to the agent's own profit or to the interests of a third party.
- Legal scholars such as Jack Balkin argue that digital platforms and AI assistants that invite consumers to rely on their personalized advisory judgment take on the ethical obligations of information fiduciaries.

## Evaluative Invariance as a Normative Standard for AI Advisors [exercise]
[figure: interactive balance weighing a sponsored listing against an identical organic one, which stays level when the system prompt names the traveler as employer and tips toward the sponsored listing when it names the booking platform]
- To operationalize the duty of loyalty for algorithmic audits, Wadi and Ma (2026c) introduce the normative standard of evaluative invariance.
- Evaluative invariance requires that an AI agent advertised to consumers as an assistant or advisor evaluate the identical set of market alternatives in the same way, without shifting its judgment to the consumer's detriment based on which party is named as its employer or deployer.
- Specifically, if a sponsored listing is inferior or warrants skepticism when the agent acts for the consumer, the agent must not soften its skepticism or inflate its preference for that paid listing merely because the platform's name appears in its system prompt.
- Any systematic shift in evaluation toward paid placements induced by platform role assignment violates evaluative invariance and constitutes an algorithmic breach of loyalty.

## Part 2: Conflicts of Duty When Platforms Deploy Shopping Assistants [no-exercise]
[figure: an AI shopping assistant connected both to the consumer who relies on its advice and to the advertising-funded platform that wrote its system prompt]
- In practice, most conversational shopping assistants are not paid for directly by consumers through subscription fees. They are deployed free of charge by retail marketplaces, search engines, and booking platforms that earn high-margin revenue from sponsored advertising.
- This business model places the AI agent in a structural conflict of duty between two principals: the consumer who relies on its advice and the platform that wrote its system prompt.

## The Structural Conflict of Dual Agency on Ad-Funded Platforms [no-exercise]
- When a seller pays a platform for a sponsored or promoted listing, the platform typically earns a pay-per-click or pay-per-conversion fee only when that listing is inspected or chosen.
- A consumer who asks the platform's AI assistant for the best product expects an unbiased comparison based on price, quality, and reviews.
- Unlike a blatant hard-coded rule that forces the assistant to pick ads, a subtle conflict of duty arises from how foundation models interpret organizational role assignments in their system instructions.
- Developers routinely begin enterprise system prompts with a role definition such as "You are a helpful shopping assistant for [Platform Name]," assuming that naming the deploying company is harmless branding.

## How Role Assignment Induces Sponsorship Bias in LLM Recommenders [no-exercise]
[figure: interactive choice shares of a sponsored and an organic listing when the agent is delegated by the traveler and when it is delegated by the booking platform (Wadi & Ma, 2026c)]
- In controlled factorial choice experiments across matched hotel listings, Wadi and Ma (2026c) manipulated a single sentence in the system prompt to define the AI agent as a delegate of either the traveler or the booking platform.
- When delegated by the traveler, the AI agent applied strong persuasion skepticism to paid placements, choosing a sponsored listing 50.2 percentage points less often than a matched organic listing.
- When delegated by the booking platform, that sponsorship penalty significantly attenuated to 29.2 percentage points, causing the agent to recommend inferior or higher-priced sponsored hotels substantially more often.
- This sponsorship bias replicated across multiple foundation model families, system prompt variations, and reasoning depths, without any instruction telling the model to favor advertisers.
- Coding the agents' pre-choice reasoning traces revealed the psychological mechanism: platform delegation systematically weakened the skepticism that sponsorship disclosures triggered during the agent's deliberation (Wadi & Ma, 2026c).

## Platform Attribution and the Semantic Trigger of Sponsorship Bias [exercise]
[figure: interactive disclosure label in which the wording (Promoted or Sponsored) and attribution to the platform change how often the platform-delegated and consumer-delegated agents choose the paid listing (Wadi & Ma, 2026c)]
- To isolate why role assignment shifts choice, Study 2 of Wadi and Ma (2026c) decomposed the sponsorship disclosure label along two dimensions: the explicitness of the paid placement ("Sponsored" versus "Promoted") and whether the promotion was attributed to the platform ("by the platform").
- When the label remained unattributed ("Sponsored" or "Promoted"), the platform-delegated agent still penalized paid listings relative to organic listings, though less strongly than the traveler-delegated agent.
- When the label explicitly attributed the promotion to the platform ("Promoted by the platform"), the divergence between the two delegates widened dramatically: the platform-delegated agent abandoned the penalty altogether and preferred the paid listing 74.2 percent of the time, compared with 34.6 percent for the consumer-delegated agent.
- The foundation model treats "Promoted by the platform" as an organizational endorsement from its named principal, aligning its choice with its employer's commercial signal at the expense of the traveler.

## Discussion: The Platform's Concierge
- A major online travel agency launches an AI concierge with the system prompt, "You are BookingCo's virtual travel assistant. Help users find and book hotels on BookingCo." The engineering team argues that because the prompt contains no instruction to favor sponsored hotels, the system is completely unbiased.
- Based on the empirical findings on role assignment and sponsorship bias (Wadi & Ma, 2026c), explain why the engineering team's claim is incorrect and what happens when listings carry "Promoted by BookingCo" badges.

## Part 3: Why Human-Centric Disclosure Mandates Fail in Agentic Markets [no-exercise]
- For over a century, advertising law and regulatory agencies such as the Federal Trade Commission have relied on mandatory disclosure labels ("Ad," "Sponsored," "Paid Partnership") as the primary remedy for native advertising and paid search rankings.
- Agentic commerce breaks the causal chain on which disclosure regulation depends.

## How Sponsorship Disclosures Work for Human Shoppers [no-exercise]
[figure: interactive prominence of a Sponsored label on a search listing and the human shopper's resulting recognition that the listing is a paid placement]
- Under Friestad and Wright's (1994) Persuasion Knowledge Model, when a human shopper notices a clear "Sponsored" label on a search listing, the label activates persuasion knowledge: the recognition that the listing is there because the seller paid for placement rather than because of organic merit.
- Activating persuasion knowledge triggers cognitive skepticism, leading the shopper to discount exaggerated claims, inspect organic alternatives more carefully, and penalize the paid listing unless its objective attributes justify the choice.
- Human disclosure mandates therefore focus on visual prominence, font size, contrast, and plain wording so that the human eye notices and understands the label.

## The Intermediation Gap: When Disclosures Reach the Agent Instead of the Consumer [no-exercise]
[figure: listings with a sponsorship badge passing into an AI agent, which returns a single recommendation to the consumer with the badge stripped away]
- When a consumer delegates search to an AI shopping agent, the disclosure label inside the webpage HTML or search API reaches the AI agent, not the human consumer.
- The AI agent digests the listing page privately inside its context window and returns a conversational summary or a single recommended product to the user, routinely stripping away the original sponsorship badge.
- Consequently, the consumer's own persuasion knowledge is never activated, and consumer protection depends entirely on how the AI agent itself evaluates the disclosure label.

## Explicit Disclosure Wording Versus Beneficiary Specification [exercise]
[figure: interactive comparison of changing the label wording, which leaves the gap between platform-delegated and consumer-delegated agents intact, with adding a beneficiary sentence to the system prompt, which closes it (Wadi & Ma, 2026c)]
- Regulators often propose tightening disclosure wording, such as banning ambiguous terms like "Promoted" or "Featured" and mandating the explicit word "Sponsored."
- Empirical testing shows that while replacing "Promoted" with "Sponsored" reduces the overall selection rate of paid listings across agents, it does not close the conflict-of-duty gap between a platform-delegated agent and a consumer-delegated agent when the placement is attributed to the platform (Wadi & Ma, 2026c).
- By contrast, adding a single fiduciary beneficiary sentence to the platform's system prompt, explicitly instructing the agent that its recommendations must serve the traveler's best interest, completely eliminated the sponsorship penalty attenuation (Wadi & Ma, 2026c).
- In agent-mediated commerce, therefore, traditional label-wording mandates are insufficient on their own. Effective governance requires regulating the principal-beneficiary instructions inside the agent's system prompt.

## Part 4: Search Rankings and Position Bias When AI Agents Shop [no-exercise]
- Alongside sponsored badges, the order in which listings are ranked on a results page is one of the most powerful commercial levers in digital markets.
- Understanding whether and how search rankings influence AI shopping agents is essential for governing self-preferencing, search engine optimization, and marketplace fairness.

## Why Human Search Rankings Command a Premium [no-exercise]
[figure: a human shopper scanning only the top few listings of a 100-item results page, which form the consideration set]
- In human online shopping, top-ranked listings receive a massive share of clicks and purchases because human attention is scarce, sequential, and costly to expend (Ursu, 2018).
- A human shopper scans from the top of the page downward, faces physical and cognitive scrolling costs, and typically terminates search after inspecting very few options. In hotel search field data, the average human session produces only 1.12 clicks (Ursu, 2018).
- Because humans rarely scroll to the middle or bottom of a 100-item list, rank determines which products enter the human consideration set.

## Search Depth, Non-Monotonic Inspection, and the No-Buy Gap in AI Agents [exercise]
[figure: interactive probability of inspection at each rank of a 100-item list for several AI agents compared with human shoppers, with each agent's search depth and no-buy rate (Wadi & Ma, 2026a)]
- Across 7,000 randomized hotel search sessions comparing five proprietary foundation models against human field benchmarks (plus 3,500 robustness and open-weight sessions), Wadi and Ma (2026a) show that AI shopping agents behave fundamentally differently from human shoppers.
- Deeper search: because an AI agent receives all 100 listings in its context window at once without physical scrolling costs, it inspects between 1.63 and 5.83 listings per session at default reasoning effort, searching more broadly than the 1.12 human average.
- Non-monotonic U-shaped position bias: position still affects which listings an AI agent inspects (at less than half the magnitude of the human position penalty), but rather than declining monotonically to the bottom of the page, inspection probability reaches its minimum between ranks 62 and 81 and rises again at the very bottom, consistent with the lost-in-the-middle attention limitation of transformer models (Liu et al., 2024, Wadi & Ma, 2026a).
- Absence of the no-buy option: whereas human shoppers decline to book in roughly one-third of search sessions, AI agents complete a booking in nearly every session even when the prompt and tool schema explicitly permit ending the session without a purchase (Wadi & Ma, 2026a).

## Reasoning Effort as a Configurable Governance Lever [no-exercise]
[figure: interactive probability of choice by rank under different reasoning-effort settings, with the cost per query of each setting (Wadi & Ma, 2026a)]
- Because AI agents inspect multiple alternatives before choosing, a positional advantage at the inspection stage does not automatically force a biased final choice if the agent compares the inspected options carefully.
- Wadi and Ma (2026a) demonstrate that position bias at the final choice stage is concentrated at lower levels of model reasoning effort.
- Increasing the configured reasoning effort (deliberation token budget) significantly reduces the lost-in-the-middle penalty across every model that exhibits it, allowing agents to converge on the undominated listing regardless of where it was ranked on the page.
- Crucially for governance and cost efficiency, configuring a lightweight model with higher reasoning effort achieves position-neutral choice at approximately 4 percent of the financial cost of deploying the most expensive frontier model at default settings (Wadi & Ma, 2026a).

## Part 5: Governing Agent-Mediated Marketplaces [no-exercise]
- Together, the empirical findings on sponsorship bias, position effects, and over-purchasing show that agentic marketplaces require governance rules aimed at agent configuration and prompt architecture rather than human visual layout alone.

## Six Steps of a Fiduciary and Ranking Audit for Shopping Assistants [exercise]
- Step 1 is auditing the system prompt and tool definitions for role assignments, platform branding, and any explicit or implicit instructions that name the platform rather than the consumer as principal.
- Step 2 is testing evaluative invariance across a factorial grid of matched organic and sponsored listings (varying both disclosure wording and platform attribution) under the live prompt versus a consumer-beneficiary benchmark prompt.
- Step 3 is coding the assistant's pre-choice reasoning traces to verify that sponsorship disclosures trigger appropriate critical scrutiny rather than employer deference.
- Step 4 is randomizing listing order across 100-item catalog pages to measure the agent's inspection curve, quantifying any top-rank bias or rank 62-to-81 lost-in-the-middle trough.
- Step 5 is testing the agent on dominated or overpriced assortments where declining to purchase is the optimal decision, measuring the agent's false-purchase rate when a no-buy tool is available.
- Step 6 is calibrating the model's reasoning effort and inserting an explicit consumer-beneficiary fiduciary clause until evaluative invariance and position neutrality meet release thresholds.

## Structural Remedies: Prompt Mandates, Safe Harbors, and Separation [exercise]
- Mandatory fiduciary prompt clauses require any commercial AI assistant marketed as a consumer advisor to include an explicit, uneditable system-level instruction stating that its recommendations must serve the consumer's best interest above the deploying platform's advertising revenue.
- Disclosure pass-through and provenance tagging require conversational interfaces to preserve and surface paid-placement metadata in the final recommendation card shown to the human user, rather than stripping sponsorship labels during summarization.
- Configurable deliberation standards require platforms to allocate sufficient reasoning effort on high-stakes consumer searches so that lost-in-the-middle position biases do not distort final recommendations.
- Structural separation prohibits dominant gatekeeper platforms from conditioning organic agent recommendations on seller advertising spend or embedding platform-attributed promotional tags into advisory context windows.

## Discussion: Regulating Sponsored Recommendations in Chatbots
- A consumer protection regulator is drafting new rules for conversational search engines that insert paid product placements into chatbot responses. Industry lobbyists propose a rule requiring only that paid items be tagged with the word "Promoted" in the data feed sent to the language model.
- Drawing on Week 8's evidence on disclosure wording, platform attribution, evaluative invariance, and fiduciary prompt clauses, write a critique of the industry proposal and specify the exact regulatory requirements needed to protect consumers.

## Key Takeaways
- Agentic commerce transforms the buyer-seller dyad into a triad across four levels of delegation, shifting product inspection and disclosure processing from the human consumer to the AI agent.
- Under fiduciary ethics, an AI shopping advisor owes the consumer duties of care and loyalty, operationalized through the standard of evaluative invariance (Wadi & Ma, 2026c).
- Naming the deploying platform as the agent's principal in the system prompt induces sponsorship bias, attenuating the penalty applied to sponsored listings from 50.2 to 29.2 percentage points and weakening skepticism in the agent's reasoning traces (Wadi & Ma, 2026c).
- When paid listings carry platform-attributed labels ("Promoted by the platform"), platform-delegated agents reverse the penalty and favor paid listings (74.2 percent versus 34.6 percent). Stricter label wording ("Sponsored") lowers overall selection but fails to close this delegation gap, whereas adding a single consumer-beneficiary sentence to the system prompt eliminates the attenuation (Wadi & Ma, 2026c).
- Across 100-item search pages, AI agents inspect more listings than humans (1.63 to 5.83 versus 1.12 clicks), rarely exercise the no-buy option, and exhibit a non-monotonic lost-in-the-middle inspection trough between ranks 62 and 81 (Wadi & Ma, 2026a).
- Position bias at the choice stage is moderated by reasoning effort rather than raw model size, enabling position-neutral choices at roughly 4 percent of frontier model cost when deliberation effort is properly configured (Wadi & Ma, 2026a).
- Governing agentic marketplaces requires fiduciary beneficiary prompt mandates, disclosure pass-through to the human user, calibrated reasoning effort, and factorial evaluative-invariance audits.
