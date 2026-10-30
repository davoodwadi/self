---
topic: "AI in Marketing and Consumer Behavior"
lecturer: "Davood Wadi, PhD"
course: "Applications of AI in Business"
week: "week3"
---

## Title Slide
- Week 3
- Artificial intelligence reshapes marketing by predicting individual customer behavior, personalizing offers at scale, and introducing autonomous agents that shop on the consumer's behalf.

## From Mass Marketing to Algorithmic Personalization [no-exercise]
- Marketing decisions allocate scarce resources, including advertising budgets, promotional discounts, and catalog space, across customers whose preferences are only partially observable.
- Traditional mass marketing grouped buyers into broad demographic segments and delivered the same message and price to every member of a segment.
- Modern digital channels record granular behavioral histories for millions of individual accounts, including search queries, page views, cart additions, and repeat purchases.
- Machine learning allows marketers to estimate conversion probability, retention risk, and product affinity at the level of the individual customer and session.
- The managerial challenge shifts from designing a single campaign for an average buyer to governing automated systems that tailor thousands of decisions per second.

## Two Sides of AI in the Marketplace [exercise]
[figure: two-sided marketplace diagram showing firm-side AI systems for segmentation, ranking, and pricing interacting with consumer-side AI shopping assistants]
- Artificial intelligence now operates on both sides of the retail and business-to-business marketplace.
- On the firm side, organizations deploy predictive and generative models to segment audiences, rank search results, personalize promotions, and automate creative production.
- On the consumer side, buyers increasingly use conversational search assistants and autonomous shopping agents to filter products, compare prices, and execute purchases.
- Firm-side systems are optimized to maximize enterprise objectives such as conversion rate, gross margin, and customer lifetime value.
- Consumer-side systems are instructed to represent the buyer's stated preferences and budget constraints, changing how brands compete for visibility and choice.

## Part 1: Customer Segmentation, Propensity, and Churn [no-exercise]
- Acquiring a new customer typically costs several times more than retaining an existing one, making targeted acquisition and retention central to marketing profitability.
- Unsupervised clustering and supervised propensity models allow firms to identify distinct customer groups and allocate marketing spend where it creates incremental value.

## Behavioral Segmentation and RFM Features [no-exercise]
[figure: customer segmentation scatter plot grouping accounts by recency, frequency, and monetary value into distinct behavioral lifecycle clusters]
- Behavioral segmentation groups customers according to their observed actions and transaction histories rather than static demographic traits such as age or postal code.
- A foundational feature set in retail and subscription analytics is RFM: Recency of the last purchase, Frequency of purchases over a period, and Monetary value spent.
- Unsupervised clustering algorithms applied to RFM and product-category browsing logs identify distinct groups such as high-spend loyalists, seasonal gift buyers, and dormant accounts.
- Because clustering requires no predefined target label, it helps marketing teams discover emerging usage patterns and tailor product bundles to each group.
- Segment definitions must be refreshed periodically as customer purchasing habits and product assortments evolve over the year.

## Propensity Modeling and Customer Lifetime Value [no-exercise]
[figure: supervised propensity workflow combining historical transaction features with conversion probability and margin to estimate customer lifetime value]
- A propensity model is a supervised classification model that estimates the probability that a customer will perform a specific action, such as purchasing an add-on or redeeming a coupon.
- Customer lifetime value (CLV) is the present value of the future net profit expected from a customer over the duration of their relationship with the firm.
- Combining propensity scores with CLV prevents a common managerial mistake: optimizing campaigns solely for short-term clicks from low-margin or one-time bargain hunters.
- High-value acquisition targeting prioritizes prospects who exhibit both a high probability of converting and predicted spending patterns associated with long-term retention.
- Every propensity model requires a strict time horizon and feature cutoff so post-campaign outcomes never leak into the historical training features.

## Churn Prediction Versus Uplift Modeling [exercise]
[figure: two-by-two uplift matrix classifying customers into persuadables, sure things, lost causes, and sleeping dogs based on retention with and without an intervention]
- Churn prediction estimates the probability that an existing subscriber or repeat buyer will cancel their account or stop purchasing within a given window.
- Sending a costly retention discount to every customer with a high churn score is inefficient because high risk of leaving does not imply high responsiveness to an offer.
- Uplift modeling estimates the incremental change in retention probability caused by the marketing intervention itself, comparing expected behavior with the offer versus without it.
- Uplift analysis divides customers into four groups: persuadables who stay only if contacted, sure things who stay regardless, lost causes who leave regardless, and sleeping dogs who cancel when reminded of their subscription.
- Marketing budget creates positive return on investment only when directed to persuadables, while avoiding wasted discounts on sure things and triggered cancellations among sleeping dogs.

## Part 2: Recommender Systems and Personalization at Scale [no-exercise]
- Digital retailers and streaming platforms carry catalogs ranging from tens of thousands to hundreds of millions of items, far exceeding what a shopper can inspect manually.
- Recommender systems and search ranking algorithms filter this catalog into a personalized assortment tailored to each user's context and history.

## Collaborative Filtering Versus Content-Based Filtering [exercise]
[figure: side-by-side diagram contrasting collaborative filtering based on overlapping user purchase matrices with content-based filtering based on item attribute embeddings]
- Collaborative filtering predicts what a user will like based on the historical preferences of other users who exhibited similar purchasing or viewing patterns.
- If two shoppers both bought the same three running shoes and one shopper also bought a specific hydration vest, collaborative filtering recommends that vest to the second shopper.
- Content-based filtering recommends items whose descriptive attributes, such as category tags, text descriptions, or image embeddings, resemble items the user has favored in the past.
- Pure collaborative filtering suffers from the cold-start problem: it cannot recommend a newly launched product that has no prior user interactions, nor can it personalize for a first-time visitor.
- Production recommender systems therefore use hybrid architectures that rely on content and catalog embeddings when interaction data are sparse and incorporate collaborative signals as behavioral history accumulates.

## Two-Stage Recommendation and Search Ranking [no-exercise]
[figure: two-stage recommendation funnel narrowing millions of catalog items through fast vector retrieval into a candidate set scored by a deep ranking model]
- Scoring ten million catalog items with a complex deep neural network on every page load would exceed acceptable web response times of a few hundred milliseconds.
- Large-scale personalization systems solve this latency constraint by separating recommendation into two sequential stages: candidate retrieval and ranking.
- In the candidate retrieval stage, fast vector search selects a few hundred plausible items from the full catalog using lightweight user and item embeddings.
- In the ranking stage, a high-capacity neural network scores those few hundred candidates using rich session features, real-time inventory status, and cross-feature interactions.
- The final ranked list balances predicted conversion probability against business rules such as profit margin, inventory clearance targets, and contractual sponsored placements.

## Exploration Versus Exploitation in Personalization [exercise]
[figure: interactive contextual bandit simulation illustrating how allocating traffic between high-confidence offers and uncertain offers maximizes cumulative conversions]
- Every personalization system faces an exploitation-exploration trade-off when deciding which products or promotions to display.
- Exploitation displays the items with the highest currently estimated conversion rate to maximize immediate revenue on the current page view.
- Exploration displays newer or less-tested items to gather behavioral data and discover whether they perform better than the current default.
- A system that only exploits existing predictions creates a closed feedback loop: popular items receive all top-row impressions, while superior new products never accumulate enough clicks to be recommended.
- Contextual bandit algorithms manage this trade-off automatically by allocating most traffic to proven winners while reserving a controlled share of impressions to test uncertain alternatives across user contexts.

## Part 3: Generative AI in Creative Production and Marketing Research [no-exercise]
- While predictive models score and rank existing options, generative models create new marketing assets and synthesize unstructured customer feedback.
- Combining generative tools with controlled experimentation changes both the speed of creative production and the methods of market research.

## Generative AI in Copywriting and Creative Variation [no-exercise]
[figure: structured creative pipeline turning a campaign brief and brand guardrails into segment-specific ad variations evaluated through live field experiments]
- Producing tailored advertising copy, email subject lines, and product imagery for dozens of micro-segments was historically constrained by agency time and production cost.
- Generative language and image models reduce the marginal cost of drafting segment-specific creative variations from a single campaign brief.
- Reliable enterprise deployment requires grounding the model in verified product specifications and enforcing brand voice and regulatory compliance rules before publication.
- Lowering the cost of content generation does not mean every generated variant is effective with consumers.
- Creative generation creates measurable business value when paired with A/B testing or multi-armed bandits that retire weak variants and scale the messages that drive actual purchases.

## Unstructured Voice-of-the-Customer Analytics [no-exercise]
[figure: voice-of-the-customer pipeline extracting aspect-level sentiment and emerging defect clusters from reviews, support tickets, and call transcripts]
- Organizations collect vast quantities of unstructured customer feedback in product reviews, post-purchase surveys, social media posts, and call-center transcripts.
- Summary star ratings conceal actionable detail: a three-star review may praise product durability while criticizing confusing assembly instructions or damaged packaging.
- Aspect-based sentiment analysis uses language models to identify specific product or service attributes mentioned in text and assign a separate sentiment score to each attribute.
- Clustering the vector embeddings of open-ended support tickets allows product and marketing teams to detect emerging quality issues before return rates spike.
- Automated synthesis turns qualitative text into a continuous diagnostic feed tracked alongside quantitative sales and churn metrics.

## Synthetic Respondents and Concept Testing [exercise]
[figure: comparison of valid early-stage uses of synthetic LLM personas versus invalid uses that attempt to replace human samples in demand estimation]
- Marketing researchers increasingly experiment with synthetic respondents, prompting large language models with demographic and behavioral profiles to simulate consumer survey answers.
- Synthetic personas are valuable during early-stage research for pre-testing questionnaires, identifying ambiguous wording, and generating hypotheses about possible buyer objections.
- However, synthetic respondents cannot replace human samples when estimating market demand, price elasticity, or willingness to pay for a genuinely new product.
- Language models reflect the average patterns of their pre-training text, under-represent niche or minority consumer segments, and exhibit lower variance than real human populations.
- Sound research practice uses language models to accelerate survey design and qualitative exploration, and validates high-stakes pricing and launch decisions on real consumer data.

## Discussion: Redesigning Retention and Creative Workflows at a Meal-Kit Brand
- Discussion: A subscription meal-kit company loses 11 percent of its active subscribers each month. Currently, the firm sends a 30 percent discount coupon to every subscriber whose predicted monthly churn probability exceeds 0.60, eroding profit margins. How should the marketing team redesign this retention program using uplift modeling, and how can they combine generative AI with field experiments to test non-discount interventions such as recipe customization reminders or delivery-skip prompts?

## Part 4: AI Shopping Agents as Surrogate Consumers [no-exercise]
- For three decades, digital marketing assumed that a human shopper looked at a screen, read brand messaging, and clicked the buy button.
- As consumers delegate product search, comparison, and checkout to AI assistants and autonomous agents, the primary audience for many marketing signals becomes an algorithm.

## The AI Agent as a Surrogate Consumer [no-exercise]
[figure: delegated consumer decision journey where a shopper states a goal to an AI agent that searches catalogs, filters specifications and reviews, and presents a shortlist]
- In consumer behavior research, a surrogate consumer is an external agent retained by a buyer to search, evaluate alternatives, and make or recommend purchase decisions on the buyer's behalf.
- Historically, human interior designers, travel agents, and financial advisors served as surrogates for specialized purchases.
- General-purpose AI shopping agents extend surrogate consumption to everyday retail categories, from electronics and apparel to household replenishment and travel booking.
- When a shopper asks an agent to find a quiet dishwasher under 900 dollars that fits a 24-inch cabinet cutout, the agent translates the request into structured queries, screens dozens of listings, and returns two or three recommendations.
- Delegation sharply compresses the consideration set seen by the human buyer, making inclusion in the agent's shortlist the decisive step in the marketing funnel.

## Marketing to Algorithms Versus Marketing to Humans [exercise]
[figure: comparison between human-oriented merchandising cues (emotional photography, charm pricing, visual hierarchy) and agent-oriented signals (structured schemas, verified specs, review aggregates)]
- Human shoppers and AI shopping agents rely on fundamentally different cues when evaluating products.
- Human shoppers are influenced by visual packaging, lifestyle photography, emotional brand narratives, shelf placement, and psychological pricing such as 49.99 dollars instead of 50 dollars.
- AI shopping agents parse text descriptions, structured specification tables, total delivered price, warranty terms, and aggregated customer review statistics.
- Psychological pricing tactics and decorative web layouts have little effect on an agent programmed to calculate total unit cost or filter by exact technical thresholds.
- Conversely, a superior product whose key dimensions or compatibility details are locked inside an unindexed image file will be excluded by an agent during automated screening.

## Machine-Readable Catalogs and Agentic Commerce Protocols [no-exercise]
- Competing in agent-mediated channels requires treating product information as machine-readable data infrastructure rather than purely visual web design.
- Structured product metadata provide standardized fields for dimensions, materials, compatibility, energy ratings, unit pricing, real-time stock status, and return policies.
- When an agent uses retrieval or tool calls to verify whether an item meets a buyer's constraints, complete and unambiguous metadata determine whether the item passes the filter.
- Agentic commerce also requires application programming interfaces (APIs) that allow authorized agents to check live inventory, lock in price quotes, and initiate checkout under user-defined spending limits.
- Brands that publish verifiable, structured product feeds reduce friction for shopping agents and lower the likelihood that models hallucinate missing product specifications.

## Part 5: Biases and Position Effects in Agent-Mediated Marketplaces [no-exercise]
- Delegating a purchase decision to an AI agent does not make the choice purely objective or free of systematic distortion.
- Empirical research on large language models in shopping environments shows that models introduce their own position biases, brand preferences, and framing sensitivities.

## Position Bias and Context Sensitivity in LLM Product Choice [exercise]
[figure: product choice probability across list positions showing strong primacy bias in language-model recommendations when identical candidate products are reordered]
- Position bias is the tendency of a decision-maker or algorithm to favor options based on their location in a list or display rather than their underlying merits.
- Controlled experiments on AI shopping agents show that when a list of candidate products is inserted into a model's context window, the model exhibits strong primacy bias, selecting items listed first at much higher rates.
- Some models also display recency bias, favoring items at the very end of the list while overlooking equally strong alternatives in the middle of the context window.
- Because an agent's recommendation depends on the order in which search tools return results, upstream search ranking directly shapes downstream agent choices.
- Small variations in prompt phrasing, attribute ordering, or how product tables are formatted can shift an agent's recommendation share even when prices and ratings are unchanged.

## Brand Familiarity, Decoy Effects, and Algorithmic Heuristics [no-exercise]
[figure: comparison of recommendation shares showing how pre-training brand frequency and decoy options shift language-model product selection]
- Large language models exhibit brand familiarity bias: brands that appear frequently in the model's pre-training corpus are recommended more often than newer or smaller brands with identical specifications and ratings.
- Because language models learn patterns from human text, they also replicate human behavioral anomalies such as the attraction effect, where adding an inferior decoy option increases choice share for a target product.
- Without explicit calculation tools, language models often rely on surface heuristics, overweighting high review volume or superlative marketing adjectives relative to objective price-to-performance ratios.
- This creates a strategic vulnerability for challenger brands: even if a new entrant offers superior value, an uncalibrated model may default to the incumbent brand it encountered most often during training.
- Mitigating these biases requires equipping shopping agents with deterministic comparison and sorting tools rather than relying on raw next-token prediction over prose descriptions.

## Auditing and Regulating Agentic Marketplaces [no-exercise]
- As AI agents influence a growing share of consumer spending, both brands and marketplace regulators need systematic methods to audit algorithmic recommendations.
- Counterfactual auditing tests an agent on controlled product sets while permuting display order, swapping brand names, or varying price increments to measure position and familiarity biases.
- Open catalogs also create an adversarial security risk: sellers may embed hidden prompt injections or exaggerated claims in product descriptions to manipulate shopping agents into ranking their items first.
- Platform operators must sanitize catalog text, separate untrusted seller descriptions from system instructions, and verify structured claims against independent transaction records.
- Consumer protection in agentic marketplaces also requires transparent disclosure whenever paid sponsorship or platform self-preferencing influences which products an AI assistant recommends.

## Discussion: Competing for Visibility in Agent-Mediated Retail
- Discussion: A mid-sized cookware manufacturer discovers that while its stainless-steel skillets rank in the top five on major retail websites, popular AI shopping assistants recommend its largest national competitor 85 percent of the time when users ask for the best skillet under 100 dollars. How should the marketing team design an audit to determine whether this gap is driven by incomplete structured metadata, search retrieval order, or pre-training brand familiarity bias? What legitimate actions can the firm take to improve its recommendation share?

## Key Takeaways
- Machine learning shifts marketing from segment-level averages to individual-level predictions of conversion propensity, customer lifetime value, and incremental retention uplift.
- Uplift modeling improves campaign profitability by targeting persuadable customers whose behavior changes in response to an intervention, rather than subsidizing customers who would stay or leave regardless.
- Large-scale recommender systems combine collaborative and content-based signals in a two-stage retrieval-and-ranking pipeline, while using contextual bandits to balance exploitation with exploration.
- Generative AI lowers the cost of creative variation and extracts aspect-level insights from unstructured customer text, but synthetic personas cannot replace human samples for demand and pricing validation.
- AI shopping agents act as surrogate consumers that compress the buyer's consideration set and evaluate products through structured metadata, specifications, and APIs rather than visual merchandising alone.
- Language models acting as shopping agents exhibit position bias, brand familiarity bias, and susceptibility to adversarial catalog text, requiring counterfactual auditing and tool-based evaluation.
