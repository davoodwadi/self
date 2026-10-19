---
topic: Algorithmic Pricing, Collusion, and Fair Competition
lecturer: "Davood Wadi, PhD"
course: Responsible AI & Algorithmic Governance
week: week9
---

## Title Slide
- Week 09
- When algorithms set prices continuously and interact with competing algorithms, governance must address granular price discrimination, consumer fairness perceptions, tacit algorithmic collusion, and platform self-preferencing.

## When Algorithms Set Market Prices [no-exercise]
- Price is the central coordinating signal of a market economy and the only element of the marketing mix that directly generates revenue.
- Historically, changing prices across thousands of products required manual analysis and physical menu or shelf updates, which kept prices relatively stable and uniform across shoppers.
- Today, automated pricing algorithms observe competitor prices, inventory levels, search traffic, and individual customer telemetry in real time, updating prices milliseconds before a page loads.
- This speed and granularity create two major governance challenges: at the individual level, algorithms can extract consumer surplus through opaque personalized pricing; at the market level, competing algorithms can learn to sustain supra-competitive prices without an explicit human cartel.

## Dynamic Pricing Versus Personalized Pricing [exercise]
- Dynamic pricing adjusts the market price of a product over time in response to aggregate supply and demand conditions, so that two consumers shopping at the exact same moment see the same price, as in airline seat inventory or ride-hailing surge pricing.
- Personalized pricing (or surveillance pricing) charges different prices to different consumers at the exact same moment for the identical product, based on each individual's estimated willingness to pay derived from behavioral, geographic, or device data.
- Both techniques rely on predictive algorithms, but they carry very different ethical, perceptual, and regulatory risks: dynamic pricing reflects aggregate scarcity, whereas personalized pricing targets individual consumer characteristics.

## Part 1: Algorithmic Price Discrimination and Consumer Welfare [no-exercise]
- Economics classifies price discrimination into three degrees according to how finely a seller segments the market to capture willingness to pay.
- Machine learning and digital tracking allow firms to approximate theoretical first-degree price discrimination far more closely than was ever possible in brick-and-mortar retail.

## First-, Second-, and Third-Degree Price Discrimination [exercise]
- First-degree (perfect) price discrimination charges each individual consumer their exact maximum willingness to pay for each unit, transferring the entire consumer surplus to the seller.
- Second-degree price discrimination offers a menu of product versions, quantities, or service tiers (such as economy versus business class, or freemium versus enterprise software) and lets consumers self-select based on their preferences.
- Third-degree price discrimination charges different prices to observable demographic or situational segments, such as student, senior, or regional discounts.
- Behavioral surveillance pricing blurs the line between third-degree and first-degree discrimination by combining hundreds of observed and inferred variables (browsing history, loyalty status, battery level, or device model) to estimate an individual-specific reservation price.

## Welfare Effects of Granular Price Discrimination [no-exercise]
- In economic theory, the aggregate welfare effect of price discrimination is ambiguous and depends on whether total market output expands.
- Price discrimination can improve social welfare when lower personalized prices allow lower-income or price-sensitive consumers to buy a product they would otherwise be priced out of, while higher-income consumers pay more.
- However, algorithmic price discrimination reduces consumer welfare when it operates primarily as a surplus-extraction mechanism under fixed supply, or when it charges higher prices to captive, urgent, or digitally unsophisticated buyers who fail to comparison-shop.
- When willingness-to-pay predictions rely on proxies correlated with protected attributes or neighborhood disadvantage, personalized pricing can result in lower-income or minority households paying more for essential financial, insurance, or retail goods.

## Search Steering and Price Discrimination by Proxy [no-exercise]
- Because quoting two shoppers different prices for the exact same item on the same URL invites public backlash if discovered, many platforms implement price segmentation through personalized search steering rather than direct price alteration.
- In search steering, every shopper sees the same price on a given product page, but the ranking algorithm places higher-priced, higher-margin products at the top of the search results for shoppers predicted to be price-insensitive (Hannak et al., 2014).
- For example, early empirical audits of travel platforms documented that users browsing on certain operating systems or arriving from specific referral channels were systematically steered toward costlier hotel rooms.
- Personalized discount targeting achieves the same mathematical price dispersion as personalized surcharges by holding the public list price high and silently issuing targeted digital coupons only to shoppers predicted to abandon their carts.

## Part 2: Consumer Fairness Perceptions and Dual Entitlement [no-exercise]
- A pricing algorithm that is profitable in a static optimization model can destroy brand equity if consumers perceive its rules as exploitative.
- Behavioral economics explains why consumers accept some price variations as legitimate while judging others as unfair.

## Dual Entitlement and Reference Transactions [no-exercise]
- Formulated by Kahneman, Knetsch, and Thaler (1986), the principle of dual entitlement states that consumers evaluate the fairness of a price against a reference transaction: consumers believe they are entitled to the terms of the reference price, and firms are entitled to their reference profit.
- Under dual entitlement, consumers generally accept a price increase as fair when it passes through a genuine increase in the seller's input costs, because the firm is protecting its reference profit rather than exploiting the buyer.
- Conversely, consumers judge a price increase as unfair when the firm raises prices purely to capitalize on a sudden spike in buyer need or scarcity (such as doubling the price of snow shovels during a blizzard or bottled water during an emergency) without a corresponding rise in unit cost.

## Why Personalized Pricing Triggers Moral Outrage and Trust Erosion [exercise]
- Horizontal inequity occurs when a shopper discovers that another peer paid a lower price for the identical item at the same time, violating the social norm of equal treatment in public retail markets.
- Perceived privacy betrayal occurs when consumers realize that their own past loyalty, search urgency, or personal data were used against them to calculate a higher price rather than to reward their relationship.
- Vulnerability exploitation occurs when dynamic or personalized pricing extracts a premium from acute distress, such as surge pricing for rides away from a transit shutdown or higher medical-supply prices for anxious shoppers.
- Empirical studies show that discovering opaque personalized pricing triggers immediate anger, negative word of mouth, cart abandonment, and a lasting drop in brand trust that outweighs short-term margin gains.

## Framing and Transparency in Algorithmic Pricing [no-exercise]
- Prospect theory (Kahneman & Tversky, 1979) shows that framing a price difference as a discount below a standard reference price is judged significantly fairer than framing the identical price difference as a surcharge above a low baseline.
- Furthermore, verifiable eligibility rules (such as a published student discount, an off-peak matinee rate, or a loyalty tier with transparent thresholds) preserve fairness perceptions because any consumer can understand the rule and see how to qualify.
- Opaque algorithmic scores that silently alter prices without disclosed criteria violate both procedural fairness and consumer autonomy.

## Discussion: Surge Pricing During an Emergency
- Discussion: During a sudden severe rainstorm and municipal subway outage, a ride-hailing platform's automated pricing algorithm increases fares by 350 percent across the affected downtown core. The company's economics team defends the algorithm by arguing that higher prices incentivize more drivers to enter the zone and allocate scarce rides to passengers with the highest urgency. Analyze this defense using dual entitlement theory, welfare economics, and algorithmic governance, and propose how the platform's pricing algorithm should be constrained during civic emergencies.

## Part 3: Tacit Algorithmic Collusion in Automated Markets [no-exercise]
- Beyond how a single firm prices to its customers, algorithmic governance must address what happens when competing firms in an oligopoly delegate their pricing decisions to autonomous learning algorithms.
- Recent economic and computational research demonstrates that pricing algorithms can learn to sustain collusive, supra-competitive prices without ever being programmed to collude or exchanging a single message.

## Explicit Cartels Versus Tacit Coordination [no-exercise]
- Under competition and antitrust law (such as Section 1 of the US Sherman Act and Section 45 of Canada's Competition Act), an explicit cartel in which competitors communicate to fix prices, rig bids, or divide markets is a per se unlawful criminal offense.
- Conscious parallelism, or tacit coordination, occurs in concentrated oligopolies when each firm independently observes its rivals' public prices and recognizes that undercutting a rival will trigger a retaliatory price war that lowers profits for everyone.
- Historically, sustaining tacit coordination among human managers was difficult because markets are noisy, demand fluctuates, and human decision makers are slow to distinguish a rival's cheating from a normal response to demand shocks.
- High-frequency pricing algorithms remove those frictions: they monitor rivals' prices continuously, detect price cuts within seconds, and execute immediate, credible retaliation.

## How Reinforcement-Learning Pricing Agents Learn to Collude [no-exercise]
- In a landmark study published in the American Economic Review, Calvano, Calzolari, Denicolò, and Pastorello (2020) placed independent Q-learning pricing algorithms in a simulated repeated Bertrand oligopoly where each algorithm sought only to maximize its own firm's discounted cumulative profit.
- The algorithms had no prior knowledge of the market structure, could not communicate with one another, and were given no instructions to cooperate.
- Across thousands of simulations, the reinforcement-learning agents consistently learned to charge supra-competitive prices well above the static Nash equilibrium, capturing a large fraction of the monopoly profit gap.
- Crucially, the researchers proved that the elevated prices were not the result of naive learning mistakes: when the researchers manually forced one algorithm to cut its price for a single period, the rival algorithm immediately punished the deviation with a temporary price war before both algorithms gradually returned to the high collusive price (Calvano et al., 2020).
- The algorithms had autonomously discovered the classic reward-and-punishment enforcement mechanism of an economic cartel purely through trial-and-error reinforcement learning.

## Four Pathways to Algorithmic Price Coordination [exercise]
- Legal scholars Ariel Ezrachi and Maurice Stucke (2016) classify algorithmic collusion into four distinct governance scenarios based on how humans and algorithms interact.
- Messenger occurs when human executives explicitly agree to fix prices and merely use software algorithms as the operational tool to monitor compliance and update prices; this is a traditional illegal cartel.
- Hub-and-Spoke occurs when multiple competing firms (the spokes) all adopt the same third-party pricing algorithm or vendor (the hub), pooling confidential data or delegating pricing to a single shared optimization engine that coordinates prices across competitors instead of letting them compete.
- Predictable Agent occurs when each firm unilaterally deploys its own rule-based pricing algorithm (such as automated price-matching plus a margin floor) designed to react predictably and transparently to rivals' moves, dampening incentives to discount.
- Autonomous Machine occurs when each firm independently deploys a self-learning reinforcement or foundation model given only the goal "maximize long-term profit," and the models autonomously learn tacit punishment-and-reward collusion without human instruction or shared code.

## Part 4: Self-Preferencing, Gatekeeper Power, and Selling to Buying Bots [no-exercise]
- Competition risks in digital markets also arise vertically when a dominant digital platform acts simultaneously as the marketplace referee and as a competing merchant, and when seller algorithms interact with consumer shopping agents.

## Dual-Role Gatekeepers and Algorithmic Self-Preferencing [exercise]
- Many dominant e-commerce, app-store, and search platforms operate as dual-role gatekeepers: they run the marketplace infrastructure on which third-party merchants depend while also selling their own first-party or private-label products in the same categories.
- Algorithmic self-preferencing occurs when the platform designs its search ranking, recommendation assistant, or "Buy Box" algorithm to favor its own first-party products or logistics services over superior or lower-priced third-party offerings.
- Data appropriation occurs when the platform's retail arm accesses non-public, granular transaction and clickstream data generated by third-party sellers on the marketplace to identify profitable niche products, replicate them as private-label goods, and undercut the original sellers.
- Algorithmic tying and buy-box conditioning occur when a platform makes top ranking or default assistant selection contingent on a third-party seller purchasing the platform's own fulfillment, payment, or advertising services.

## When Pricing Algorithms Meet AI Shopping Agents [no-exercise]
- As consumers adopt autonomous AI shopping agents (Weeks 7 and 8), retail markets transition toward algorithm-versus-algorithm exchange in which pricing bots face buying bots.
- On the one hand, well-configured AI shopping agents can intensify price competition by inspecting more listings than humans (Wadi & Ma, 2026a), calculating exact unit prices when specifications are accessible (Wadi & Ma, 2026b), and bypassing brand inertia.
- On the other hand, seller pricing algorithms can exploit the systematic behavioral vulnerabilities of AI shopping agents: setting high arbitrary reference prices to trigger LLM anchoring bias (Wadi & Fredette, 2025), using just-below prices and promotional badges while burying unit weights behind costly tool calls (Wadi & Ma, 2026b), or purchasing platform-attributed sponsorship tags that attenuate the agent's skepticism (Wadi & Ma, 2026c).
- Fair competition in agentic markets therefore requires governing both sides of the automated interface.

## Part 5: Antitrust Enforcement and Auditing Pricing Algorithms [no-exercise]
- Competition authorities worldwide, including the US Department of Justice, the Federal Trade Commission, the Canadian Competition Bureau, and the European Commission, have made algorithmic pricing and gatekeeper self-preferencing top enforcement priorities.

## The Liability Gap in Competition Law [no-exercise]
- Classical antitrust statutes prohibit "agreements," "conspiracies," or "concerted practices" in restraint of trade, which courts have historically interpreted as requiring evidence of communication or a conscious meeting of the minds between competitors.
- While Messenger and Hub-and-Spoke arrangements (such as competitors feeding non-public data into a shared rental-housing or hotel pricing vendor) are actively prosecuted as unlawful coordination, pure Autonomous Machine tacit collusion challenges traditional evidentiary standards because no human communication or shared vendor exists.
- Legal and economic scholars therefore propose shifting regulatory scrutiny from searching for smoke-filled-room communications to auditing the algorithms themselves: prohibiting reward functions or state spaces that condition on rivals' real-time price changes solely to punish discounting, and holding firms strictly liable for the collusive strategies their deployed agents learn.

## Six Steps of an Algorithmic Pricing and Competition Audit [exercise]
- Step 1 is mapping all inputs to the pricing model, verifying that the algorithm does not ingest non-public competitor data or share a common third-party optimization hub with horizontal rivals.
- Step 2 is auditing personalized price dispersion across demographic segments and geographic proxies to ensure that price variations do not impose disparate impact on protected or vulnerable groups.
- Step 3 is evaluating price presentation and search steering against dual-entitlement and dark-pattern standards, verifying that discounts, reference prices, and dynamic surge rules are transparent and verifiable.
- Step 4 is conducting counterfactual impulse-response tests on reinforcement-learning pricing models in a sandbox environment: forcing a simulated competitor price cut and inspecting whether the firm's algorithm responds with a retaliatory punishment-and-return cycle (Calvano et al., 2020).
- Step 5 is auditing marketplace ranking and Buy Box algorithms for self-preferencing, testing whether first-party private-label products receive higher placement or recommendation share than identically rated and priced third-party listings.
- Step 6 is implementing hard algorithmic guardrails, including emergency surge caps, human-on-the-loop circuit breakers, and Chinese walls separating marketplace seller data from first-party retail teams.

## Governance Guardrails for Ethical and Compliant Pricing [exercise]
- Emergency and vulnerability price caps set hard upper bounds on dynamic surge multipliers during declared emergencies, natural disasters, or acute public disruptions.
- Transparent discount framing replaces covert personalized list-price inflation with published base prices and clearly stated, non-discriminatory eligibility rules for loyalty or promotional discounts.
- Collusion-resistant reward design restricts reinforcement-learning pricing agents from conditioning multi-period punishment policies on individual rivals' high-frequency price deviations.
- Firewall and ranking neutrality mandates prohibit dual-role platforms from using non-public third-party seller data for private-label development and require identical ranking weights for first-party and third-party goods.

## Discussion: The Shared Rental Pricing Algorithm
- Discussion: Twelve competing property-management companies that control 70 percent of the apartment buildings in a metropolitan city license the same cloud-based revenue-management software. Every night, each landlord uploads its private lease renewal rates, vacancy counts, and applicant traffic to the vendor's model, which returns recommended daily rents for every unit. Public records show that after adopting the software, landlords left more units vacant during slow months while average rents across the city rose 18 percent above historical trends. Using Ezrachi and Stucke's four pathways and competition governance principles, analyze whether this arrangement constitutes unlawful coordination and how an auditor would test the software.

## Key Takeaways
- Dynamic pricing varies prices over time based on aggregate market supply and demand, whereas personalized (surveillance) pricing charges different prices to different individuals at the same moment based on estimated willingness to pay.
- Granular behavioral telemetry pushes digital pricing toward first-degree price discrimination and search steering, which can extract consumer surplus and penalize vulnerable or captive segments.
- Under Kahneman, Knetsch, and Thaler's (1986) dual entitlement principle, consumers accept cost-justified price increases but judge opaque personalized pricing and emergency surge pricing as unfair violations of reference transactions.
- Independent reinforcement-learning pricing agents in repeated oligopoly games can autonomously learn to charge supra-competitive prices sustained by retaliatory price-war punishments without communicating (Calvano et al., 2020).
- Ezrachi and Stucke (2016) distinguish four pathways to algorithmic price coordination: Messenger, Hub-and-Spoke (shared third-party vendor), Predictable Agent, and Autonomous Machine learning.
- Dual-role gatekeeper platforms face vertical governance risks of algorithmic self-preferencing, third-party seller data appropriation, and Buy Box tying.
- Enterprise pricing audits combine disparate-impact dispersion checks, sandbox impulse-response tests for retaliatory punishment cycles, emergency surge caps, and strict separation from competitor data hubs.
