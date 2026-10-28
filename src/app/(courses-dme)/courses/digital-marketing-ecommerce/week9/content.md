---
topic: E-Commerce Pricing, Promotions, and Dynamic Revenue Management
lecturer: "Davood Wadi, PhD"
course: Digital Marketing & E-Commerce
week: week9
---

## Title Slide
- Week 09
- Digital storefronts turn pricing from a static catalog decision into a real-time algorithmic lever that shapes perceived value, margin, and competition.

## Why Digital Pricing Differs from Physical Retail [no-exercise]
- In a brick-and-mortar store, changing prices across ten thousand items requires printing paper tags and paying staff to walk the aisles, imposing physical menu costs that keep prices fixed for weeks.
- In an e-commerce database, menu costs are effectively zero, allowing a merchant or marketplace algorithm to update thousands of prices in milliseconds.
- At the same time, price transparency is dramatically higher online, because a shopper or an AI price-comparison agent can check a competitor's price in another tab or API call without walking across town.
- Digital pricing strategy must therefore balance real-time responsiveness to inventory and demand against consumer fairness perceptions and intense cross-store price visibility.

## Part 1: Digital Pricing Architectures [no-exercise]
- Before setting a specific dollar figure or running a discount, an e-commerce firm chooses its underlying pricing architecture, which determines how value is metered and captured.
- Different architectures suit physical goods, replenishable consumables, and digital software or content.

## Dynamic Pricing, Personalized Pricing, Subscriptions, Freemium, and Bundling [exercise]
- Dynamic pricing adjusts the price of a product over time in response to market-level supply and demand conditions (e.g., airline seats, ride-share surge multipliers, or seasonal outdoor gear), while quoting the same price to any two shoppers checking at the exact same moment.
- Personalized (or first-degree) pricing quotes different prices or discount depths to different individual shoppers at the same moment based on their inferred willingness to pay, browsing history, device, or location.
- Subscription and auto-replenishment pricing offers a recurring delivery discount (e.g., "Subscribe and Save 10%") in exchange for predictable repeat orders and higher Customer Lifetime Value.
- Freemium and tiered SaaS pricing offers a functional free tier with zero marginal distribution cost to drive viral adoption, monetizing power users who hit usage or feature limits.
- Pure and mixed bundling packages multiple complementary items together at a combined price lower than the sum of the individual items, increasing Average Order Value (AOV) and reducing unit fulfillment costs per item shipped.

## Consumer Fairness Perceptions and the Risks of Personalized Pricing [no-exercise]
- Under dual-entitlement theory (Kahneman, Knetsch, and Thaler), consumers generally accept price increases that reflect genuine increases in the seller's costs, but judge price increases that merely exploit a buyer's urgency or profile as unfair.
- When shoppers discover that an online retailer charged them a higher price than another shopper based on their postal code, desktop operating system, or loyalty history, trust collapses and brand backlash follows.
- Rather than varying the public list price on the Product Detail Page across individuals, sophisticated e-commerce firms maintain a uniform public list price and deliver personalized price variation through targeted private coupons, loyalty tier rewards, or bundle discounts in CRM channels.

## Part 2: Promotional Framing on the Digital Storefront [no-exercise]
- How a price is framed on the screen alters perceived value even when the net dollar amount paid is identical.
- Digital storefronts deploy behavioral pricing cues that interact with human cognitive heuristics.

## Reference Prices, Just-Below Pricing, Flash Sales, and Free-Shipping Thresholds [exercise]
- Strike-through reference pricing displays an anchor price (e.g., "Was $120, Now $89") next to the current selling price to create transaction utility, the psychological satisfaction of getting a deal. Under deceptive pricing laws, the strike-through anchor must be a bona fide price at which the item was genuinely offered for a reasonable period.
- Just-below (or charm) pricing sets prices at $19.99 or $49.95 rather than $20.00 or $50.00, exploiting left-digit anchoring in which shoppers disproportionately weight the leftmost digit when encoding price magnitude.
- Partitioned pricing separates the base product price from mandatory surcharges (such as shipping and handling), which can lower initial price perception on the listing card but triggers cart abandonment at checkout if fees feel excessive.
- Minimum-spend thresholds (e.g., "Add $14 more to unlock Free Shipping" or "Spend $100, Get $20 Off") incentivize shoppers to add an extra item to their basket, lifting Average Order Value above the merchant's shipping cost threshold.

## Part 3: Targeted Promotions and Margin Management [no-exercise]
- Discounts are the easiest lever to pull when weekly sales dip, but undisciplined promotional discounting is one of the fastest ways to destroy an e-commerce brand's unit economics.
- Understanding the mathematics of gross margin shows why a 20 percent discount requires far more than a 20 percent increase in unit volume to break even.

## Margin Erosion, Deal-Waiting, and Promotional Guardrails [exercise]
- Consider a product that sells for $100 with a variable cost of goods sold and fulfillment of $60, yielding a $40 gross contribution margin (40 percent margin).
- If the marketer runs a 20 percent sitewide discount, the selling price drops to $80 while the unit cost remains $60, cutting the contribution margin per unit in half from $40 to $20. The store must now sell twice as many units just to earn the same total dollar contribution.
- Furthermore, frequent sitewide sales train customers in forward-buying (stockpiling during sales) and strategic deal-waiting, where loyal buyers delay full-price purchases until the next holiday code arrives.
- Browser coupon-extension scrapers (which automatically test leaked promo codes at checkout) further erode margin when merchants use generic, shareable codes like `WELCOME20` instead of single-use cryptographic codes generated per CRM recipient.
- High-performing e-commerce brands protect brand equity by limiting sitewide markdowns, using value-added gifts-with-purchase instead of percentage cuts, and targeting single-use retention incentives only to high-churn-risk cohorts.

## Discussion: Breaking the Sitewide Discount Addiction
- Discussion: A Direct-to-Consumer home-fragrance brand has run a 25 percent sitewide flash sale at the end of every month for the past year to hit its monthly revenue targets. Today, 78 percent of its orders occur during the four sale days each month, full-price conversion on regular days has collapsed below 0.5 percent, and gross contribution after ad spend is negative. Propose a 90-day pricing and promotional transition plan to wean customers off monthly sitewide discounts without crashing cash flow.

## Part 4: Algorithmic Repricers and Marketplace Competition [no-exercise]
- On multi-seller marketplaces where dozens of third-party merchants sell the exact same barcode (GTIN), the platform awards the prominent "Buy Box" (the default Add-to-Cart button) primarily on landed price, fulfillment speed, and seller rating.
- To compete at machine speed, merchants deploy automated repricing algorithms that monitor rival prices and adjust their own quotes continuously.

## Algorithmic Repricing Loops and Tacit Coordination Risks [exercise]
- Rule-based repricers follow deterministic instructions set by the seller, such as "Undercut the lowest FBA competitor by $0.05, down to a hard floor of $24.00."
- When two sellers both deploy naive undercut-by-a-penny rules without proper floors, they can trigger a high-speed price war spiral that drives prices down to cost within minutes.
- Reinforcement-learning (RL) pricing algorithms go beyond fixed rules by experimenting with prices and learning policies that maximize long-term cumulative profit in repeated marketplace interactions.
- Economic and legal research shows that when multiple autonomous RL pricing agents interact repeatedly in the same market, they can learn to maintain supra-competitive (artificially high) prices and punish price-cutters without ever exchanging an explicit human message, a phenomenon known as tacit algorithmic collusion (Calvano et al., 2020).
- Competition authorities now scrutinize shared pricing algorithms and algorithmic hub-and-spoke arrangements under antitrust law even when no smoke-filled room agreement exists.

## Part 5: How AI Shopping Agents Evaluate Prices and Promotions [no-exercise]
- As consumers delegate product comparison to LLM-based shopping agents, a crucial question for marketers is whether behavioral pricing tactics designed for human psychology still work on machines.
- Controlled experimental studies on AI shopping agents show that models both mitigate some framing traps and exhibit their own distinct heuristic sensitivities (Wadi & Ma, 2026a).

## Price Heuristics, Anchoring, and Attribute Trade-Offs in AI Agents [exercise]
- When all price components (item price, shipping fee, and unit quantity) are visible in structured text, an AI shopping agent can compute total landed unit price accurately, reducing the effectiveness of simple partitioned-pricing tricks.
- However, because foundation models are trained on vast corpora of human commercial text, they internalize human-like decision heuristics and respond to reference-price anchors, promotional badges, and just-below pricing cues when evaluating options under ambiguity (Wadi & Ma, 2026a).
- Moreover, the specificity of the consumer's delegation prompt strongly moderates how the agent weights price against quality. A vague prompt ("Buy me a good toaster") leaves the agent susceptible to framing and rank cues, whereas a constraint-specific prompt ("Find a two-slice stainless toaster under $60 with at least a 2-year warranty") anchors the agent on verifiable attribute cutoffs.
- In business-to-agent (B2A) pricing, transparent all-in pricing, clear unit-price metrics, and verifiable value-tier differentiation outperform deceptive drip fees that cause an agent's checkout validation step to abort the purchase.

## Discussion: Pricing for Human Eyes and Algorithmic Filters
- Discussion: An online electronics accessory brand sells a 65-watt USB-C charger for $29.99 with a strike-through reference price of $49.99 and a $5.99 shipping fee revealed at checkout. A competing brand sells an identical charger for $33.00 flat with free shipping and exposes the full price and specification breakdown in its Schema.org JSON-LD markup. Compare how an impulsive human shopper versus an autonomous AI shopping agent instructed to "find the best-value 65W charger under $35 total" will evaluate these two listings.

## Key Takeaways
- Zero menu costs and high cross-store price transparency make e-commerce pricing a dynamic, data-driven discipline across subscriptions, freemium tiers, bundles, and real-time adjustments.
- Because consumers perceive personalized list-price discrimination on public product pages as unfair, firms implement individualized pricing through private CRM coupons, loyalty tiers, and bundles.
- Promotional framing (bona fide strike-through reference anchors, just-below charm pricing, and free-shipping basket thresholds) lifts conversion and Average Order Value when applied honestly.
- Frequent sitewide percentage discounts severely erode unit contribution margins, invite coupon-extension leakage, and train customers in strategic deal-waiting.
- Automated marketplace repricers compete for the Buy Box in real time, creating risks of both downward price-war spirals and upward tacit algorithmic collusion among reinforcement-learning agents.
- Autonomous AI shopping agents calculate all-in landed prices when data are structured, yet still exhibit learned sensitivity to price anchors and promotional framing depending on the specificity of the user's delegation prompt (Wadi & Ma, 2026a).
