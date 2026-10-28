---
topic: Digital Business Models and E-Commerce Architecture
lecturer: "Davood Wadi, PhD"
course: Digital Marketing & E-Commerce
week: week1
---

## Title Slide
- Week 01
- Digital marketing and e-commerce unite demand generation with the information systems that catalog, rank, price, and fulfill every transaction across human and agent-mediated markets.

## Why Digital Marketing and E-Commerce Are Inseparable [no-exercise]
- In physical retail, advertising and store operations often functioned as separate departments because weeks could pass between a television commercial and a trip to the store.
- In digital commerce, an advertisement, a search result, a product page, and a payment terminal are connected by milliseconds and a shared data layer.
- A marketing campaign that drives paid traffic to a slow, poorly structured storefront wastes acquisition spend, while a well-engineered storefront without discoverability attracts no buyers.
- Furthermore, the software architecture of the store directly determines what marketers can test, personalize, and measure.
- Studying digital marketing alongside e-commerce information systems therefore connects how firms attract attention with how their platforms convert that attention into revenue.

## Defining Digital Marketing and E-Commerce [no-exercise]
- Digital marketing is the use of networked digital channels, algorithms, and customer data to acquire, engage, and retain buyers in measurable ways.
- Electronic commerce (e-commerce) is the execution of commercial transactions, including product discovery, ordering, payment, and fulfillment orchestration, over digital networks.
- Whereas digital marketing governs the flow of attention and persuasion into the storefront, e-commerce governs the transactional and operational infrastructure that completes the exchange.
- Every design decision in an online store, such as page latency, catalog schema, or checkout friction, simultaneously acts as an information systems decision and a marketing conversion lever.

## Part 1: Digital Commerce Models [no-exercise]
- Online businesses organize exchange through distinct commercial models that differ in who sells, who buys, who owns the inventory, and how revenue is earned.
- Choosing a business model defines the firm's customer acquisition economics, its technology requirements, and its control over the buyer relationship.

## B2C, B2B, and Direct-to-Consumer (D2C) Commerce [no-exercise]
- Business-to-consumer (B2C) e-commerce sells finished goods or digital services directly to individual shoppers through online retailers, category specialists, or digital storefronts.
- Business-to-business (B2B) e-commerce handles transactions between organizations, such as wholesale supply portals, negotiated contract catalogs, and automated procurement systems.
- Direct-to-consumer (D2C) commerce occurs when a manufacturer bypasses traditional wholesale and retail intermediaries to sell its own brand directly to end consumers online.
- Selling direct gives a manufacturer first-party customer data, control over brand presentation, and higher gross margins per unit, but requires the firm to fund its own customer acquisition and single-item fulfillment.

## First-Party Retailers Versus Two-Sided Marketplaces [no-exercise]
- A first-party (1P) online retailer takes wholesale title to inventory, holds stock in its own fulfillment network, sets the retail price, and sells to the shopper as the merchant of record.
- A third-party (3P) two-sided marketplace does not own the goods it lists. Instead, it provides the discovery, ranking, checkout, and trust infrastructure that connects independent sellers with buyers.
- Hybrid platforms combine both models within the same storefront, operating as a first-party retailer in high-velocity categories while hosting third-party merchants to expand assortment breadth.
- Managing a hybrid platform creates structural tension whenever the platform's own private-label or first-party inventory competes for rank position against third-party sellers on the same results page.

## Revenue Models in Digital Commerce [exercise]
- Under a retail markup model, a first-party merchant buys or manufactures goods at cost and earns the gross margin between unit cost and retail selling price.
- Under a commission or take-rate model, a two-sided marketplace charges third-party sellers a percentage of gross merchandise value (GMV) for each completed transaction, often paired with listing or fulfillment fees.
- Under a subscription or membership model, the firm charges recurring monthly or annual fees for continuous access to products, replenishables, or delivery benefits, shifting focus from single orders to retention.
- Under a retail media model, a retailer or marketplace monetizes its shopper traffic by selling sponsored search placements and display impressions to brands inside the shopping funnel.

## Matching Commercial Scenarios to Digital Business Models [exercise]
- A footwear manufacturer that launches its own web store to capture buyer email addresses and test new designs without sharing margins with department stores operates a direct-to-consumer (D2C) model.
- An industrial fastener distributor whose portal integrates with factory enterprise resource planning (ERP) systems for bulk reorders under negotiated credit terms operates a B2B e-commerce model.
- A platform that connects thousands of independent craft sellers with shoppers and collects a 6.5 percent transaction fee without holding inventory operates a two-sided 3P marketplace model.
- A grocery app that sells ad slots at the top of its "sparkling water" search results to beverage brands on a cost-per-click basis operates a retail media revenue model.

## Part 2: Multi-Sided Platform Economics [no-exercise]
- Two-sided marketplaces do not scale like traditional retailers that add one warehouse or store at a time.
- Their growth and defensibility are governed by network effects, switching costs, and the rules by which the platform matches supply with demand.

## Same-Side and Cross-Side Network Effects [no-exercise]
- A network effect exists when the value of a platform to a user depends on the number of other users participating on the platform.
- Same-side (or direct) network effects occur when users on one side of the market directly benefit from or compete with more users on that same side, as when additional shopper reviews help other shoppers or when additional sellers intensify price competition.
- Cross-side (or indirect) network effects occur when growth on one side of the market makes the platform more valuable to the other side, as when more buyers attract more merchants and a wider merchant assortment attracts more buyers.
- Positive cross-side network effects create a self-reinforcing flywheel, but they can also run in reverse if falling buyer traffic causes merchants to abandon the marketplace.

## The Cold-Start Problem, Multi-Homing, and Disintermediation [exercise]
- The cold-start (or chicken-and-egg) problem arises at launch because buyers will not visit a marketplace without listings, and sellers will not list inventory on a marketplace without buyers.
- Platforms overcome the cold-start problem by seeding one side first, such as operating as a first-party retailer before opening to third-party sellers, or subsidizing marquee sellers with zero-commission periods.
- Multi-homing occurs when buyers or sellers participate on several competing platforms simultaneously, such as a merchant listing the same catalog on multiple marketplaces, which weakens any single platform's pricing power.
- Platform leakage (or disintermediation) occurs when buyers and sellers use the marketplace to discover each other once and then move repeat transactions off-platform to avoid paying the take rate.

## Why Retail Media Networks Emerged Inside Marketplaces [no-exercise]
- As third-party marketplaces grew to host millions of competing stock-keeping units (SKUs), organic shelf space on the first page of search results became scarce.
- At the same time, privacy regulations and the deprecation of third-party tracking cookies reduced the accuracy of advertising on external social and display networks.
- Retailers and marketplaces realized that their own search queries and purchase logs constitute closed-loop, first-party intent data captured at the exact moment a shopper is ready to buy.
- By building retail media networks that auction sponsored slots alongside organic search results, platforms added a high-margin advertising revenue stream on top of low-margin retail operations.

## Part 3: The E-Commerce Information Systems Stack [no-exercise]
- Behind every digital storefront sits an information systems architecture that manages product catalogs, inventory counts, pricing rules, shopping carts, and payments.
- How these systems are coupled determines how rapidly a marketing team can launch new channels, run experiments, and adapt to new interfaces.

## Monolithic Suites Versus Headless and Composable Commerce [exercise]
- In a monolithic e-commerce architecture, the customer-facing presentation layer (the front-end storefront) and the back-end commerce engine (catalog, cart, checkout, and order logic) are tightly coupled inside a single software application.
- Monolithic platforms simplify initial setup for standard web stores, but any change to the user interface requires modifying and redeploying the underlying back-end system.
- In a headless commerce architecture, the front-end presentation layer (the "head") is decoupled from the back-end commerce engine, and the two communicate exclusively through application programming interfaces (APIs).
- Composable commerce extends headless principles by assembling best-of-breed microservices, such as a dedicated search engine, a separate content management system, and a specialized payment service, orchestrated through APIs.
- Decoupling the presentation layer allows a firm to serve a web browser, a native mobile app, an in-store kiosk, a social commerce checkout, and an AI shopping agent from the same back-end commerce APIs.

## Core Systems of Record in E-Commerce [no-exercise]
- A Product Information Management (PIM) system serves as the central repository for structured product attributes, descriptions, media assets, and taxonomy mappings across all sales channels.
- An Order Management System (OMS) tracks inventory availability across warehouses and physical stores, routes orders to the optimal fulfillment node, and manages split shipments and returns.
- An Enterprise Resource Planning (ERP) system records the firm's financial ledger, procurement orders, supplier payables, and physical inventory valuation.
- A Customer Data Platform (CDP) and Customer Relationship Management (CRM) system unify behavioral events and transaction histories into persistent customer profiles for segmentation and lifecycle messaging.

## APIs, Checkout Orchestration, and Payment Gateways [exercise]
- When a shopper clicks the buy button, the storefront does not move money directly. It initiates a sequence of synchronous API calls across specialized financial and operational services.
- Step 1 is inventory reservation and tax calculation, in which the commerce engine verifies stock availability in the OMS and queries a tax engine for jurisdiction-specific duties and sales tax.
- Step 2 is payment tokenization, in which the payment gateway replaces sensitive card or wallet credentials with a cryptographic token so raw card numbers never touch the merchant's servers.
- Step 3 is fraud screening and authorization, in which a risk model evaluates transaction velocity and device signals before requesting a funds hold from the issuing bank via the card network.
- Step 4 is order commit and capture, in which the confirmed order is written to the OMS for warehouse pick-and-pack and the authorized funds are captured for settlement.

## Discussion: Monolithic or Headless?
- Discussion: A mid-sized outdoor apparel brand currently runs on an all-in-one monolithic e-commerce template. The marketing director wants to launch an interactive trail-gear configurator on mobile, sell directly inside short-form video apps, and expose a real-time catalog feed to conversational AI shopping assistants, but the engineering team warns that the current template cannot support custom API endpoints. What are the marketing and information systems trade-offs of migrating to a headless composable architecture versus staying on the monolithic platform?

## Part 4: The Digital Customer Funnel and Channel Strategy [no-exercise]
- Technology infrastructure creates value only when it moves buyers efficiently from initial awareness to repeat purchase.
- Marketers model this progression as a funnel and track conversion losses at every handoff between channels and systems.

## Stages of the Digital Commerce Funnel [exercise]
- Acquisition brings prospective shoppers to the storefront through organic search, paid search, programmatic display, social media, creator partnerships, or referral links.
- Activation and engagement occur when a visitor lands on the storefront, navigates the category taxonomy, queries the internal search engine, and inspects product detail pages.
- Conversion occurs when the shopper adds items to the cart, initiates checkout, completes shipping and payment steps, and submits a confirmed order.
- Fulfillment and post-purchase experience span order confirmation, warehouse dispatch, last-mile delivery speed, unboxing, and customer support.
- Retention and advocacy occur when satisfied buyers write online reviews, subscribe to replenishment flows, and return for repeat purchases without requiring another paid acquisition click.

## Channel Conflict and Omnichannel Integration [no-exercise]
- When a brand adds a direct-to-consumer web store alongside existing wholesale retail partners, it risks channel conflict if retail partners view the brand's own website as undercutting their floor traffic and margins.
- Double marginalization arises in indirect wholesale channels when both the manufacturer and the independent retailer add their own markups, resulting in a higher final price than an integrated direct channel would set.
- Firms mitigate channel conflict through minimum advertised price (MAP) policies, channel-exclusive product bundles, or routing online orders to local retail partners for fulfillment.
- True omnichannel integration unifies inventory, pricing, and loyalty records across physical stores and digital channels so a customer can research online, pick up in store, or return an online parcel at a retail counter.

## Part 5: From Web Browsers to Autonomous Shopping Agents [no-exercise]
- For three decades, e-commerce storefronts were designed around a single assumption, namely that a human shopper sits behind a screen, visually scans pages, clicks links, and types credit card details into a form.
- Large language models and tool-using AI agents break that assumption by acting as autonomous intermediaries between the consumer and the storefront.

## The AI Shopping Agent as a Surrogate Consumer [no-exercise]
- An AI shopping agent is a software system built on a foundation model that accepts a natural-language goal from a consumer, queries search engines or commerce APIs, evaluates candidate products, and recommends or executes a purchase.
- In consumer behavior theory, the agent functions as a surrogate consumer to whom the human principal delegates information search, attribute comparison, and transaction execution.
- Whereas a human shopper experiences a storefront through visual typography, color contrast, and photography, an AI agent experiences the storefront as tokens of text, HTML structure, JSON schemas, and ranked API responses.
- Consequently, digital marketing expands from business-to-consumer (B2C) communication to business-to-agent (B2A) optimization, where product data must be legible and verifiable to machine readers.

## How Agentic Commerce Reshapes the Digital Funnel [exercise]
- In discovery, consumers increasingly state multi-constraint goals in a conversational interface (e.g., a quiet espresso machine under 400 dollars with a stainless-steel boiler) instead of typing short keywords into a search bar.
- In evaluation, the AI agent reads product specifications, shipping cutoffs, and aggregated customer reviews across multiple merchants in parallel, compressing the consideration set before the human sees a single webpage (Wadi & Ma, 2026a).
- In ranking and retail media, position effects and sponsored placements now act on the agent's information acquisition process rather than on human eye movements alone (Wadi & Ma, 2026b, 2026c).
- In checkout, headless APIs and agent payment protocols allow an authenticated agent to verify stock, apply promotional codes, and complete payment using delegated credentials without rendering a graphical checkout page.

## Discussion: Designing for Two Audiences at Once
- Discussion: A consumer electronics retailer notices that 18 percent of its product page traffic now originates from automated AI shopping assistants fetching product specifications on behalf of users. The retailer's current pages rely heavily on lifestyle photography, promotional countdown banners, and specification tables embedded inside flat image files. How will an AI shopping agent perceive this storefront compared with a human shopper, and what changes to both marketing content and information systems architecture should the retailer prioritize?

## Key Takeaways
- Digital marketing and e-commerce operate as a single socio-technical system in which customer acquisition channels and storefront software architecture jointly determine conversion and profitability.
- Digital commerce business models span B2C, B2B, D2C, first-party (1P) retail, and third-party (3P) two-sided marketplaces, monetized through retail markups, take-rate commissions, subscriptions, and retail media networks.
- Two-sided marketplaces scale through cross-side network effects between buyers and sellers, while managing cold-start chicken-and-egg problems, multi-homing, and off-platform leakage.
- Decoupling the front-end presentation layer from back-end systems of record (PIM, OMS, ERP, and CDP) via headless and composable APIs enables firms to serve web, mobile, social, and agentic touchpoints from a unified commerce core.
- The digital commerce funnel tracks shoppers across acquisition, activation, conversion, fulfillment, and retention, requiring careful coordination across direct and retail channels.
- As consumers delegate search, evaluation, and checkout to AI shopping agents, firms must design storefronts, structured catalogs, and APIs for both human eyes and autonomous machine intermediaries.
