---
topic: Search Engine Marketing, Organic Search, and Paid Search
lecturer: "Davood Wadi, PhD"
course: Digital Marketing & E-Commerce
week: week3
---

## Title Slide
- Week 03
- Search marketing captures high-intent demand at the moment a shopper or an AI assistant formulates a question.

## Search as the Engine of Commercial Intent [no-exercise]
- Most advertising interrupts people while they are doing something else, such as watching a video, reading news, or scrolling a social feed.
- Search marketing is fundamentally different because the user initiates the interaction by typing or speaking an explicit query.
- A query reveals what the user wants right now, allowing marketers to match offers to immediate intent rather than inferred demographics.
- Search Engine Results Pages (SERPs) allocate visibility through two parallel mechanisms, namely organic results ranked by relevance and authority, and paid placements allocated through real-time auctions.
- As conversational AI assistants increasingly answer queries directly, search marketing now extends from ranking ten blue links to entering the synthesized answer of an AI agent.

## Classifying Search Queries by Intent [exercise]
- Informational queries seek knowledge, explanations, or how-to guidance (e.g., "how to descale an espresso machine"), typically occurring at the top of the funnel before a brand is chosen.
- Navigational queries seek a specific website or brand destination that the user already has in mind (e.g., "Breville support canada"), where the user uses the search bar as a shortcut for a URL.
- Commercial investigation queries compare options, read reviews, or evaluate attributes across competing alternatives (e.g., "best dual boiler espresso machine under 1500"), signaling mid-funnel evaluation.
- Transactional queries express an immediate readiness to buy, book, or sign up (e.g., "buy Breville Bambino Plus free shipping"), representing the highest conversion probability and the fiercest paid auction competition.

## Part 1: How Search Engines Crawl, Index, and Rank [no-exercise]
- Before a webpage can appear in organic search results, the search engine must discover its existence, parse and store its content, and score its relevance and trustworthiness against millions of competing pages.
- Understanding this three-stage information retrieval pipeline explains why technical site failures can erase a brand from search results overnight.

## Crawling, Indexing, and Ranking Pipelines [exercise]
- Stage 1 is crawling, in which automated bots (spiders) follow hyperlinks across the web and read XML sitemaps to fetch new or updated pages, bounded by the site's crawl budget and `robots.txt` directives.
- Stage 2 is rendering and indexing, in which the search engine executes page code, extracts text, links, and Schema.org structured data, and stores the canonical version of the document in a massive inverted index.
- Stage 3 is query processing and ranking, in which the search engine parses the user's query, retrieves candidate documents from the index, and orders them using hundreds of lexical, semantic, and authority signals within milliseconds.
- If a page is blocked in `robots.txt`, marked with a `noindex` meta tag, or trapped behind unrenderable client-side scripts, it fails at Stages 1 or 2 and can never be ranked at Stage 3 regardless of its quality.

## Lexical Matching, Semantic Embeddings, and Authority Signals [no-exercise]
- Classical information retrieval scored documents using lexical term frequency and inverse document frequency (TF-IDF and BM25), rewarding pages that repeated the exact words in the query.
- Modern search engines pair lexical matching with dense transformer embeddings that represent queries and documents in a shared semantic vector space, matching meaning even when exact words differ.
- Because thousands of pages may be topically relevant to a query, search engines break ties using authority and trust signals derived from the web's link graph, originally formalized in PageRank.
- In commercial and health or financial categories, ranking systems also weight experience, expertise, authoritativeness, and trustworthiness (E-E-A-T) alongside user interaction signals such as pogo-sticking (when a user clicks a result and immediately bounces back to the SERP).

## Part 2: Search Engine Optimization (SEO) Strategy [no-exercise]
- Search Engine Optimization (SEO) is the discipline of engineering a website's content, technical architecture, and external reputation to maximize qualified organic traffic.
- Because organic clicks carry zero marginal media cost per click, SEO builds a compounding asset, though results take months to materialize.

## On-Page, Technical, and Off-Page SEO [exercise]
- On-page SEO aligns individual pages with target query intent through descriptive title tags, heading hierarchy, comprehensive body content, internal anchor links, and keyword research covering both head terms and long-tail queries.
- Technical SEO ensures that search engines can crawl, render, and index the site efficiently by optimizing Core Web Vitals (loading speed, interactivity, and visual stability), mobile responsiveness, HTTPS security, XML sitemaps, and canonical tags that prevent duplicate URL dilution across faceted e-commerce filters.
- Off-page SEO builds domain authority outside the firm's own servers through earned editorial backlinks from reputable publications, digital public relations, brand mentions, and local citations.
- Black-hat practices, such as buying link farms, stuffing hidden text, or spinning automated doorway pages, violate search engine guidelines and risk manual or algorithmic de-indexing.

## The Long Tail of E-Commerce Search [no-exercise]
- In e-commerce catalogs, search demand follows a heavy-tailed power law distribution.
- A small number of short head queries (e.g., "running shoes") generate massive search volume but reflect vague intent, low conversion rates, and extreme competition from major aggregators.
- Millions of specific long-tail queries (e.g., "women's wide waterproof trail running shoes size 8") each receive modest monthly volume, but collectively account for a large share of total search traffic.
- Long-tail queries convert at substantially higher rates because the shopper has already specified the exact product attributes they need, making well-structured category facets and product pages natural long-tail landing pages.

## Part 3: Paid Search (SEM) and Auction Mechanics [no-exercise]
- Search Engine Marketing (SEM), or paid search, allows advertisers to buy immediate visibility at the top of the SERP for specific keywords on a pay-per-click (PPC) basis.
- Critically, search engines do not simply award the top slot to the advertiser who bids the highest dollar amount per click.

## Generalized Second-Price Auctions and Quality Score [exercise]
- Search engines allocate ad slots using a Generalized Second-Price (GSP) auction modified by ad quality, rather than a pure highest-bid auction.
- Why search engines weight quality alongside bid is straightforward, because an irrelevant ad with a high bid that nobody clicks generates zero revenue for a pay-per-click platform.
- Each advertiser is assigned a Quality Score (typically on a 1 to 10 scale) determined by three components, namely expected click-through rate (CTR), ad relevance to the query, and landing page experience.
- In simplified form, Ad Rank equals the advertiser's maximum Cost-Per-Click (CPC) bid multiplied by Quality Score, and ads are ordered down the page by Ad Rank.
- The actual CPC paid by a winning advertiser is the minimum amount needed to beat the Ad Rank of the next advertiser immediately below, calculated as the next advertiser's Ad Rank divided by the winner's own Quality Score, plus one cent.

## Keyword Match Types, Negative Keywords, and Automated Bidding [no-exercise]
- Exact match triggers an ad only when a search shares the tight specific meaning of the target keyword, offering maximum control over conversion intent.
- Phrase match triggers when a query includes the meaning of the keyword phrase alongside additional modifier words before or after it.
- Broad match allows the platform's language models to match the ad to any related query in the broader category, expanding reach but risking wasted spend without guardrails.
- Negative keywords explicitly block an ad from appearing on unprofitable queries (e.g., a luxury watch retailer adding "free," "repair," or "battery replacement" as negative keywords).
- Modern SEM campaigns combine match types with automated smart bidding algorithms that adjust bids in real time for each individual auction based on device, location, time of day, and target Cost Per Acquisition (tCPA) or target Return on Ad Spend (tROAS).

## Part 4: Search Cannibalization and Incrementality [no-exercise]
- Because paid search ads appear directly above organic search results on the same page, marketers face a fundamental economic question, namely how many paid clicks would have arrived for free via the organic link milliseconds later.
- Answering this question requires distinguishing correlation from causal incrementality.

## Branded Keywords, Cannibalization, and Competitive Conquesting [exercise]
- Branded keywords contain the advertiser's own brand name (e.g., "Patagonia fleece"), whereas non-branded keywords describe a generic category or problem (e.g., "recycled fleece jacket").
- Advertising on branded keywords often shows extraordinarily high accounting ROAS in platform dashboards because users typing the brand name already intend to buy from that brand.
- Controlled field experiments (such as Blake, Nosko, and Tadelis at eBay) demonstrate that when a dominant brand with the top organic result and no rival ads pauses its branded search ads, almost all lost paid clicks simply click the organic link below, revealing heavy cannibalization.
- Conversely, bidding on branded keywords is incrementally valuable when competing brands are actively "conquesting" (bidding on the focal brand's name to poach undecided shoppers) or when the brand's organic link is pushed below the fold.
- Non-branded search ads typically show lower raw conversion rates than branded ads, but generate genuine incremental customer acquisition among shoppers who had not yet chosen a brand.

## Discussion: Auditing a High-ROAS Search Agency Report
- Discussion: A Direct-to-Consumer luggage brand hires a paid search agency that reports a 900 percent Return on Ad Spend (ROAS) after sixty days. Upon inspecting the search term report, the founder sees that 85 percent of the budget was spent on exact-match searches for the brand's own trademarked name, where the brand already ranks first organically and faces no competitor ads. Why is the agency's reported ROAS misleading, and how should the founder design a geo-holdout experiment to measure the true incremental lift of paid search?

## Part 5: From Search Engines to AI Answer Engines [no-exercise]
- Traditional search engines return a ranked list of ten links and leave the work of reading, comparing, and synthesizing across tabs to the human user.
- Generative AI search interfaces (such as AI Overviews, Perplexity, and conversational shopping assistants) perform retrieval-augmented generation (RAG) to read candidate pages and present a single synthesized answer with a small shortlist of cited products.

## Generative Engine Optimization (GEO) and the AI Shortlist [exercise]
- In traditional search, ranking fourth or fifth on page one still captures a meaningful trickle of comparison clicks from thorough shoppers.
- In conversational answer engines, visibility becomes sharply concentrated because the language model typically synthesizes only two or three recommended brands into its narrative response, creating a winner-take-most shortlist.
- Generative Engine Optimization (GEO) is the practice of structuring brand and product evidence so retrieval-augmented language models select, cite, and recommend the brand accurately.
- Because RAG pipelines retrieve passages based on semantic similarity and factual specificity, pages with verifiable quantitative claims, clear comparison tables, authoritative third-party citations, and structured Schema.org data are more likely to be quoted in synthesized answers than pages filled with vague promotional superlatives.
- Sponsored placements are also migrating inside conversational answers, requiring marketers and auditors to track how paid insertions interact with organic citations when AI agents mediate search (Wadi & Ma, 2026c).

## Discussion: Winning the Conversational Shortlist
- Discussion: A B2B project-management software firm notices that organic click traffic from traditional informational blog queries has fallen by 35 percent over the past year because prospective buyers now ask conversational AI assistants "Which project management tool is best for a 50-person engineering team?" However, buyers who are referred from AI assistant citations convert at three times the rate of traditional blog readers. How should the firm restructure its content and SEO strategy to optimize for retrieval-augmented AI answers rather than top-of-funnel keyword volume alone?

## Key Takeaways
- Search marketing captures explicit user intent across informational, navigational, commercial investigation, and transactional queries.
- Search engines operate through a three-stage pipeline of crawling, rendering/indexing, and ranking, combining lexical matching, semantic vector embeddings, and link authority.
- Search Engine Optimization (SEO) aligns on-page content, technical site health (crawlability, Core Web Vitals, canonicalization), and off-page backlink authority to capture compounding organic traffic across head and long-tail queries.
- Paid search (SEM) uses Generalized Second-Price auctions weighted by Quality Score (expected CTR, ad relevance, and landing page experience), meaning higher ad quality lowers the actual CPC required to win top rank.
- High reported ROAS on branded keywords often reflects cannibalization of organic clicks rather than incremental sales, unless competitors are actively conquesting the brand's search results.
- As search shifts toward retrieval-augmented AI answer engines, Generative Engine Optimization (GEO) focuses on verifiable facts, structured comparisons, and authoritative citations to earn a place in the AI-generated shortlist.
