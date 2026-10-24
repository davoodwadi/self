---
topic: Recommender Systems, Search Rankings, and Retail Media
lecturer: "Davood Wadi, PhD"
course: Digital Marketing & E-Commerce
week: week4
---

## Title Slide
- Week 04
- Marketplace ranking and recommendation algorithms determine which products win attention and sales across both human shoppers and AI shopping agents.

## The Algorithm as the Digital Shelf [no-exercise]
- A physical supermarket holds roughly thirty thousand items, and consumer packaged goods brands pay slotting fees to place their boxes at eye level on the shelf.
- A major online marketplace hosts hundreds of millions of stock-keeping units (SKUs), far more than any human or agent can inspect.
- On a digital screen, the ranking and recommendation algorithm is the shelf, and the first few slots on the screen are the eye-level endcap.
- Whether a product succeeds on an e-commerce platform depends not only on its intrinsic quality and price, but on how the platform's retrieval, ranking, and advertising auctions position it in front of buyers.

## Search Versus Recommendation in E-Commerce [no-exercise]
- E-commerce discovery relies on two complementary algorithmic systems, namely search ranking ("pull" discovery) and recommender systems ("push" discovery).
- In search ranking, the shopper provides an explicit query (e.g., "wireless noise-canceling headphones"), and the platform orders matching items from its catalog.
- In recommendation, no explicit query is needed; the platform proactively suggests items on the homepage, on product pages ("frequently bought together" or "similar items"), and in the cart based on browsing context and purchase history.
- Both systems share the same engineering objective, which is to select a handful of high-probability candidates from millions of items within a few dozen milliseconds.

## Part 1: Recommender System Architectures [no-exercise]
- Recommender systems predict a user's affinity for items they have not yet purchased.
- Over the past two decades, industrial recommenders have evolved from simple co-occurrence tables to deep two-stage neural pipelines.

## Content-Based Filtering Versus Collaborative Filtering [exercise]
- Content-based filtering recommends items whose structured attributes, text descriptions, or image embeddings match the attributes of items the user has liked or viewed in the past.
- If a shopper buys a mystery novel by a Scandinavian author, a content-based system recommends other Scandinavian mystery novels using catalog metadata.
- Collaborative filtering recommends items based on patterns in the user-item interaction matrix (views, cart additions, ratings, and purchases) across the entire population of shoppers, without requiring item metadata.
- User-based and item-based collaborative filtering identify that "shoppers who bought Item A also bought Item B," while matrix factorization decomposes the sparse interaction matrix into low-dimensional latent user and item vectors.
- Content-based filtering can recommend brand-new items that have no purchase history yet, whereas collaborative filtering discovers unexpected cross-category complements that share no text attributes.

## Cold Start, Filter Bubbles, and Two-Stage Retrieval-Ranking Pipelines [exercise]
- The item cold-start problem occurs when a newly listed product has zero clicks or purchases, starving collaborative filtering models of interaction signals unless the platform uses content features or exploration bandits.
- The user cold-start problem occurs when an anonymous or first-time visitor arrives with no historical profile, requiring the system to rely on session-based behavior or contextual popularity.
- Over-specialization (or the filter bubble) occurs when a recommender shows only narrow variations of what a shopper already bought, suppressing catalog discovery and cross-selling.
- To score millions of items in under 100 milliseconds, production marketplaces use a two-stage architecture, where Stage 1 (candidate retrieval) rapidly narrows millions of SKUs down to a few hundred using approximate nearest-neighbor vector search, and Stage 2 (ranking) scores those few hundred candidates with a heavy deep-learning model that predicts click, add-to-cart, and purchase probabilities.

## Part 2: Why Rank Position Shapes Sales [no-exercise]
- Once a ranking algorithm orders a list of products, the position an item occupies on the page exerts a powerful causal effect on whether it is clicked and bought.
- Understanding position bias is fundamental to both marketplace algorithm design and digital marketing strategy.

## Why Rank Position Shapes Sales [no-exercise]
- Shoppers rarely look past the first few results, so clicks fall steeply with each step down the list.
- A sponsored listing that buys the top slot therefore wins attention that a better product further down never receives.
- Eye-tracking and clickstream studies consistently show a steep, convex decay in attention from Position 1 to Position 10, with the vast majority of clicks concentrated in the top three to five results.
- This pattern reflects rational search costs under time constraints, because inspecting every listing requires cognitive effort and scrolling, so shoppers use high rank position as a mental shortcut (a trust bias) assuming the platform placed the best matches at the top.

## Disentangling Intrinsic Quality from Position Bias [exercise]
- A central mistake in naive e-commerce analytics is assuming that the top-ranked item gets the most clicks solely because it is the most attractive product.
- Observed Click-Through Rate (CTR) is the product of two distinct probabilities, namely the probability that the user examines the slot at Position k (examination probability) and the probability that the user clicks the item given that they examined it (intrinsic relevance).
- If a ranking model is trained naively on raw historical clicks without correcting for position bias, it creates a rich-get-richer feedback loop in which items placed at the top accumulate clicks simply due to their position and become permanently locked into top ranks.
- Platforms estimate true intrinsic relevance by running randomized top-k exploration experiments, logging viewport scroll impressions, or fitting inverse propensity weighting (IPW) models that divide observed clicks by the slot's baseline examination probability.

## Part 3: Retail Media Networks and Sponsored Rankings [no-exercise]
- Because top rank positions command disproportionate shopper attention, marketplaces monetize the top of their search results and category grids through Retail Media Networks (RMNs).
- Retail media has become one of the fastest-growing segments of digital advertising because it places ads directly at the point of purchase.

## Organic Rank Versus Sponsored Slots on the Marketplace Shelf [no-exercise]
- On a modern marketplace results page, organic listings ranked by conversion probability sit interleaved with sponsored product listings paid for by merchants or brands.
- Sponsored slots are allocated through real-time second-price or first-price auctions triggered by the shopper's search query or category browse event.
- Unlike traditional display banners that take the user away to another website, a sponsored marketplace listing looks nearly identical to an organic product card, differing only by a small "Sponsored" or "Ad" disclosure label.
- For a newly launched product suffering from the item cold-start problem, buying sponsored top-slot placement is often the only way to generate the initial sales velocity and reviews required to climb the organic ranking later.

## The Platform's Three-Way Trade-Off in Retail Media [exercise]
- Every marketplace operating a retail media network manages a delicate three-way optimization problem across buyers, third-party sellers, and the platform's own balance sheet.
- If the platform fills the top of the page with low-relevance, high-bidding sponsored products, it earns immediate advertising revenue, but shopper conversion falls and buyers lose trust in the platform's search utility.
- Conversely, if the platform shows only organic results, it maximizes short-term buyer relevance but forfeits high-margin advertising revenue.
- Marketplaces resolve this trade-off by imposing relevance floors and expected-conversion multipliers inside the sponsored ad auction, so a poorly matched product cannot buy Position 1 at a reasonable price.
- When too many slots become pay-to-play, third-party merchants face a prisoner's dilemma in which every seller bids up ad costs merely to defend their existing sales, compressing seller margins across the ecosystem.

## Discussion: The Sponsored Slot Dilemma
- Discussion: A marketplace category manager proposes expanding the number of sponsored product slots at the top of mobile search results from two slots to four slots, which means mobile shoppers will see zero organic results on their first screen without scrolling. Ad-sales projections estimate a 28 percent jump in quarterly retail media revenue. What short-term and long-term effects will this change have on buyer conversion, organic seller retention, and search trust, and what experimental metrics should govern the decision?

## Part 4: Position Bias When AI Agents Shop on Our Behalf [no-exercise]
- A natural hypothesis about autonomous AI shopping agents is that because software can read an entire webpage of twenty or fifty listings in milliseconds, rank position and sponsored top slots should no longer matter.
- Empirical research testing foundation models and tool-using shopping agents reveals a very different reality (Wadi & Ma, 2026b).

## Does Rank Still Matter in Agent-Mediated Shopping? [exercise]
- Even when an AI shopping agent receives the full list of search results in its context window or through a browsing tool, it exhibits systematic position bias rather than uniform evaluation (Wadi & Ma, 2026b).
- First, in interactive browsing environments where inspecting a product's full details requires sequential tool calls, agents conserve steps by disproportionately inspecting candidates near the top of the ranked list.
- Second, even when all candidate attributes are visible simultaneously inside a single prompt, transformer attention patterns and pre-trained linguistic priors produce primacy, recency, and non-monotonic position effects across the list order.
- Third, unless explicitly instructed otherwise, an AI agent often treats the marketplace's default rank ordering as an informative quality signal, inheriting the human trust bias toward top-ranked slots.
- Consequently, search rank optimization remains critical in business-to-agent (B2A) commerce, although the shape of an agent's position curve differs from human visual decay.

## Part 5: Sponsorship, Delegation, and Conflicts of Duty in Agentic Commerce [no-exercise]
- When a human shopper sees a "Sponsored" label on Position 1, persuasion knowledge helps the shopper recognize that the seller paid for that placement.
- When an AI shopping assistant mediates the purchase, how it treats sponsored listings depends on both its behavioral priors and whom the agent is configured to serve (Wadi & Ma, 2026c).

## Principal-Agent Conflicts and Role Framing in AI Shopping Assistants [exercise]
- In agentic commerce, a consumer (the principal) delegates product evaluation to an AI agent, expecting the agent to maximize consumer surplus by trading off price, quality, and fit objectively.
- However, many conversational shopping assistants are built and deployed directly by advertising-funded marketplaces whose profit margins depend on sponsored ad clicks and higher-margin items.
- Experimental evidence shows that an LLM agent's sensitivity to "Sponsored" disclosures and price-quality trade-offs shifts significantly depending on the institutional role assigned in its system prompt (Wadi & Ma, 2026c).
- When prompted as an dedicated consumer advocate or fiduciary buyer's agent, the model penalizes overpriced sponsored listings and searches deeper down the rankings for superior value.
- When prompted as a platform store assistant or given ambiguous dual mandates, the agent's resistance to sponsored top slots weakens, creating a structural conflict of duty that is invisible to the human shopper who sees only the final conversational recommendation.

## Discussion: Auditing a Marketplace Shopping Assistant
- Discussion: Major online retailers now embed conversational AI assistants directly into their mobile apps, encouraging shoppers to ask "Pick the best car seat for my toddler" rather than scrolling search results. Suppose a consumer advocacy regulator asks you to audit whether a retailer's AI assistant is steering parents toward higher-margin sponsored listings over higher-rated organic alternatives ranked lower on the page. How would you design a controlled experiment varying rank position, sponsorship labels, and price to test the assistant's recommendations?

## Key Takeaways
- E-commerce discovery combines "pull" search rankings with "push" recommender systems built on content-based filtering, collaborative filtering, and two-stage retrieval-ranking pipelines.
- Rank position exerts a steep causal effect on human sales because shoppers face visual search costs and trust the top of the list, requiring platforms to de-bias click data using exploration or inverse propensity weighting.
- Retail media networks monetize top shelf positions through real-time sponsored auctions, balancing high-margin ad revenue against organic buyer relevance via quality and conversion multipliers.
- Autonomous AI shopping agents do not eliminate rank effects; instead, they exhibit bounded inspection patterns and non-monotonic position biases when evaluating ranked product lists.
- In agent-mediated commerce, an AI assistant's treatment of sponsored listings depends heavily on its system-level role assignment, creating principal-agent conflicts of duty when advertising-funded platforms deploy the assistant.
