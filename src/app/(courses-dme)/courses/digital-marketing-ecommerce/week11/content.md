---
topic: Web Analytics, Multi-Touch Attribution, and Unit Economics
lecturer: "Davood Wadi, PhD"
course: Digital Marketing & E-Commerce
week: week11
---

## Title Slide
- Week 11
- Digital telemetry, unit economics, and causal attribution separate marketing spend that genuinely grows profit from spend that merely takes credit for existing demand.

## The Measurement Paradox of Digital Marketing [no-exercise]
- A century ago, retail pioneer John Wanamaker famously remarked that half the money he spent on advertising was wasted, and the trouble was he did not know which half.
- Digital marketing promised to solve Wanamaker's dilemma permanently by logging every impression, click, session, and checkout in database tables.
- Paradoxically, modern e-commerce leaders often drown in tracking dashboards while still misallocating millions of dollars in ad spend.
- Why this happens is that every advertising platform grades its own homework using generous attribution windows, taking credit for conversions that would have happened anyway or that were driven by other touchpoints.
- Rigorous e-commerce analytics therefore combines clean event instrumentation, disciplined unit economics, and causal incrementality testing.

## Part 1: Digital Telemetry, Event Schemas, and Cohort Tables [no-exercise]
- Before a firm can calculate conversion rates or return on ad spend, its engineering and marketing teams must instrument the storefront to capture accurate behavioral telemetry.
- Modern analytics platforms have moved away from simple pageview counters toward structured, event-driven data models.

## Event Tracking Schemas, UTM Parameters, and Server-Side Tagging [exercise]
- In an event-based analytics schema, every meaningful user interaction is recorded as a named event (e.g., `page_view`, `view_item`, `add_to_cart`, `begin_checkout`, and `purchase`) accompanied by a dictionary of structured parameters (such as `item_id`, `price`, `currency`, and `coupon`).
- Urchin Tracking Module (UTM) query parameters appended to inbound destination URLs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`) tell the analytics system which external channel, campaign, and creative asset referred the visitor.
- Client-side tracking relies on JavaScript tags and pixels executing inside the shopper's browser, which can be blocked by privacy browsers, ad blockers, or network timeouts.
- Server-side tagging routes measurement events from the merchant's own first-party cloud server directly to analytics and advertising endpoints, improving page load speed, data governance control, and conversion count accuracy.

## Cohort Retention Analysis Versus Aggregate Averages [no-exercise]
- Aggregate metrics (such as overall monthly conversion rate or total active customers) often mask deteriorating underlying health when rapid paid acquisition hides high customer churn.
- A cohort is a group of customers who share a common starting event within a specific time window, most commonly the month or week of their first purchase (an acquisition cohort).
- A cohort retention table tracks the percentage of customers or repeat revenue retained from each cohort in Month 1, Month 2, Month 3, and beyond, allowing managers to see whether product changes or new acquisition channels bring in loyal buyers or one-time deal hunters.

## Part 2: E-Commerce Unit Economics (CAC, CLV, and Contribution Margin) [no-exercise]
- Revenue growth destroys firm value if each additional customer costs more to acquire and fulfill than the net profit they generate over their lifetime.
- Unit economics evaluates profitability at the level of a single order and a single acquired customer.

## Customer Acquisition Cost (CAC), Contribution Margin, and Customer Lifetime Value (CLV) [exercise]
- Customer Acquisition Cost (CAC) is total sales and marketing acquisition spend divided by the number of new customers acquired in that period; managers must distinguish blended CAC (which averages paid and organic new buyers together) from paid CAC (paid spend divided by customers acquired through paid channels).
- Order Contribution Margin (CM1/CM2) equals net order revenue (after discounts and expected returns) minus variable Cost of Goods Sold (COGS), packaging, warehouse pick-pack labor, outbound shipping, and payment processing fees.
- Customer Lifetime Value (CLV or LTV) is the present value of the total net contribution margin (not gross revenue) a customer generates across all purchases before churning.
- The LTV-to-CAC ratio and the CAC payback period (how many months of repeat contribution margin are required to recover the initial acquisition cost) govern how aggressively an e-commerce firm can scale paid media without running out of working capital.

## Return on Ad Spend (ROAS) Versus Marginal Profit [exercise]
- Return on Ad Spend (ROAS) is defined as attributed gross revenue divided by advertising spend (e.g., spending $1,000 on ads to generate $4,000 in attributed revenue equals a 4.0x or 400 percent ROAS).
- A common managerial error is celebrating a high ROAS number without checking the product's gross margin and return rate; on a product with a 20 percent net contribution margin after shipping and returns, a 4.0x gross revenue ROAS yields only $800 in contribution margin on $1,000 of ad spend, losing $200 before fixed overhead.
- Furthermore, average ROAS differs sharply from marginal ROAS; as an advertiser scales daily budget in an ad auction, the algorithm exhausts the highest-intent buyers first and must bid for progressively colder prospects, causing marginal return on the last dollar spent to fall well below the campaign average.

## Discussion: The Unprofitable 5x ROAS Campaign
- Discussion: A Direct-to-Consumer footwear startup sells sneakers for $150 per pair. Manufacturing COGS is $52, outbound shipping and warehouse handling is $18, payment processing is $4.50, and 25 percent of orders are returned at a net reverse-logistics loss of $22 per returned order. The paid social agency reports a 4.5x gross ROAS (calculated on initial checkout revenue before returns) and asks to double the monthly ad budget. Calculate the true first-order contribution margin after returns and ad spend, and advise the CEO on whether to approve the budget increase.

## Part 3: Multi-Touch Attribution (MTA) Models [no-exercise]
- A customer rarely buys a high-consideration product on the very first tap; instead, they may see a creator video on Monday, click a paid search ad on Wednesday, read an email on Friday, and type the brand URL directly on Sunday.
- Multi-Touch Attribution (MTA) determines how to assign fractional conversion credit across that sequence of touchpoints.

## Rule-Based Heuristics Versus Data-Driven Attribution [exercise]
- Last-touch (or last-click) attribution assigns 100 percent of the credit to the final touchpoint immediately preceding the purchase, systematically over-crediting bottom-of-funnel channels (branded search and retargeting) and starving top-of-funnel discovery.
- First-touch attribution assigns 100 percent of the credit to the initial touchpoint that introduced the customer to the site, rewarding awareness channels while ignoring conversion closers.
- Linear, time-decay, and U-shaped (position-based) rules distribute fractional credit across multiple touches using fixed weights (e.g., 40 percent to first touch, 40 percent to last touch, and 20 percent split across middle touches), improving on single-touch rules but relying on arbitrary human weights.
- Algorithmic (data-driven) MTA models use cooperative game theory (Shapley values) or stochastic Markov chains to compare the empirical conversion probabilities of customer journeys with and without each channel, estimating each channel's marginal contribution from observed path data.

## Part 4: Why Attribution Is Not Incrementality [no-exercise]
- Even the most sophisticated Shapley-value or Markov-chain attribution model suffers from a fundamental econometric flaw, namely that observational clickstream paths record correlation rather than causal incrementality.
- If a retargeting bot serves a banner ad to loyal customers ten minutes before they were going to buy anyway, observational MTA sees the ad in the winning path and assigns it credit.

## Incrementality Experiments, Geo-Lift Tests, and Marketing Mix Modeling [exercise]
- Incremental lift is the causal difference between the conversions achieved when an ad campaign is shown (the treatment state) and the counterfactual conversions that would have occurred if the campaign had been withheld (the control state).
- Conversion Lift (or ghost-ad) experiments randomize target users into treatment and holdout control groups inside the ad platform, measuring the exact incremental sales generated by the ads.
- Geo-lift (or matched-market) experiments randomize entire geographic regions (such as Designated Market Areas or census metro areas) into treatment and holdout control groups, enabling causal measurement even when user-level cookies and cross-site IDs are unavailable.
- Marketing Mix Modeling (MMM) uses aggregated time-series econometric regression across weekly channel spend, pricing, seasonality, and macroeconomic controls to estimate top-down channel elasticities without relying on individual user tracking.
- Modern analytics teams triangulate across all three methods (fast day-to-day MTA, top-down privacy-safe MMM, and periodic randomized geo-lift experiments) so experimental causal lift calibrates the day-to-day models.

## Part 5: Measuring Dark Funnel and Agent-Mediated Traffic [no-exercise]
- Traditional web analytics assumes every step of the customer journey leaves a clickable trail of URL referrals and UTM tags.
- Today, a rapidly growing share of product discovery and evaluation happens off-site inside conversational AI assistants, private messaging apps, and autonomous shopping agents.

## Dark Social, Zero-Click Discovery, and Agentic Telemetry [no-exercise]
- Dark social and dark-funnel discovery occur when a buyer learns about a product through word-of-mouth, a podcast, a private group chat, or a multi-turn conversation with an LLM assistant, and then visits the merchant's site directly to buy, appearing in web analytics as "Direct" or "Branded Search" traffic.
- When an autonomous AI shopping agent queries a merchant's catalog API or fetches product pages via headless HTTP requests before presenting a single recommendation to the user, traditional browser JavaScript pixels often fail to fire altogether.
- Forward-looking e-commerce teams instrument server-side HTTP request logs and API gateway telemetry to identify known AI crawler and shopping-agent user agents (such as `ChatGPT-User`, `PerplexityBot`, and `ClaudeBot`), pair checkout flows with post-purchase "How did you hear about us?" (HDYHAU) zero-party surveys, and run brand-search lift tests to capture dark-funnel influence.

## Discussion: Reconciling Conflicting Platform Dashboards
- Discussion: At the monthly marketing review, a retailer's social ad platform claims credit for 4,200 orders, its search ad platform claims credit for 3,800 orders, and its email platform claims credit for 2,900 orders (10,900 attributed orders in total), yet the company's Order Management System recorded only 6,000 actual warehouse orders for the entire month. Explain to the executive team why the sum of platform-reported conversions exceeds reality, and outline a measurement framework combining server-side tracking, holdout lift tests, and contribution margin to allocate next quarter's budget.

## Key Takeaways
- Reliable e-commerce measurement begins with structured event schemas, disciplined UTM taxonomy, server-side tagging, and cohort retention tables that separate repeat customer health from top-line acquisition spikes.
- Healthy unit economics require measuring paid versus blended Customer Acquisition Cost (CAC), net Contribution Margin after shipping and returns, and present-value Customer Lifetime Value (CLV).
- Gross revenue ROAS can be deeply misleading when margins are thin, returns are high, or marginal returns diminish as ad budgets scale.
- Multi-Touch Attribution (MTA) progresses from single-touch rules (first-touch, last-touch) and weighted heuristics to data-driven Shapley value and Markov chain models, but remains observational.
- True causal incrementality requires randomized holdout experiments (user-level conversion lift or matched geo-lift tests) paired with privacy-resilient Marketing Mix Modeling (MMM).
- As discovery shifts into conversational AI interfaces and autonomous shopping agents, marketers supplement browser pixels with server-side bot/agent log analytics and post-purchase zero-party attribution surveys.
