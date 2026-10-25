"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Lead, Term, Ruled, SlideHeading, Numbered, PartHead, Prompt } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AgencyReport,
  AuctionDesk,
  CompoundingClicks,
  CrawlPipeline,
  FeedVsQuery,
  HighBidLoses,
  IntentLadder,
  LongTail,
  MatchTypes,
  OvernightDrop,
  PauseBrandAds,
  RankSignals,
  ReferralQuality,
  SameShopTwice,
  SeoLevers,
  ShortlistEvidence,
  SponsoredInAnswer,
  WhoReads,
} from "./visuals";

// ============================================================================
// WEEK 03 — SEARCH ENGINE MARKETING, ORGANIC SEARCH, AND PAID SEARCH
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md;
// the design only decides where each sentence sits and which catalogue plate
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week3Page() {
  return (
    <SlideDeck label="Week 03">
      {/* ================================================================
          01 · Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 03 · Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">Search Engine Marketing, Organic Search, and Paid Search</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[50ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.3rem,2.1vw,1.8rem)]">
          Search marketing captures <span className="text-[var(--signal)]">high-intent demand</span> at the moment a
          shopper or an AI assistant formulates a question.
        </p>
      </Slide>

      {/* ================================================================
          02 · Search as the Engine of Commercial Intent [no-exercise]
          ================================================================ */}
      <Slide id="search-as-the-engine-of-commercial-intent" border className="!py-8">
        <SlideHeading>Search as the Engine of Commercial Intent</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Most advertising interrupts people while they are doing something else, such as watching a video,
                reading news, or scrolling a social feed.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Search marketing is fundamentally different because{" "}
                <Term tone="signal">the user initiates the interaction</Term> by typing or speaking an explicit query.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A query reveals what the user wants right now, allowing marketers to match offers to immediate intent
                rather than inferred demographics.
              </P>
            </Ruled>
          </div>
          <Plate>
            <FeedVsQuery />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Search Engine Results Pages (SERPs)</Term> allocate visibility through two parallel
              mechanisms, namely organic results ranked by relevance and authority, and paid placements allocated
              through real-time auctions.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              As conversational AI assistants increasingly answer queries directly, search marketing now extends from
              ranking ten blue links to entering the synthesized answer of an AI agent.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          03 · Classifying Search Queries by Intent [exercise]
          ================================================================ */}
      <Slide
        id="classifying-search-queries-by-intent"
        border
        className="!py-8"
        exercise={exercise["classifying-search-queries-by-intent"]}
      >
        <SlideHeading>Classifying Search Queries by Intent</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Informational queries</Term> seek knowledge, explanations, or how-to guidance (e.g.,
              &quot;how to descale an espresso machine&quot;), typically occurring at the top of the funnel before a
              brand is chosen.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Navigational queries</Term> seek a specific website or brand destination that the user
              already has in mind (e.g., &quot;Breville support canada&quot;), where the user uses the search bar as a
              shortcut for a URL.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Commercial investigation queries</Term> compare options, read reviews, or evaluate
              attributes across competing alternatives (e.g., &quot;best dual boiler espresso machine under
              1500&quot;), signaling mid-funnel evaluation.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Transactional queries</Term> express an immediate readiness to buy, book, or sign up
              (e.g., &quot;buy Breville Bambino Plus free shipping&quot;), representing{" "}
              <Term tone="signal">the highest conversion probability and the fiercest paid auction competition</Term>.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <IntentLadder />
        </Plate>
      </Slide>

      {/* ================================================================
          04 · Part 1: How Search Engines Crawl, Index, and Rank [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="How Search Engines Crawl, Index, and Rank" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Before a webpage can appear in organic search results, the search engine must discover its existence,
                parse and store its content, and score its relevance and trustworthiness against millions of competing
                pages.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Understanding this three-stage information retrieval pipeline explains why technical site failures{" "}
                <Term tone="signal">can erase a brand from search results overnight</Term>.
              </p>
            </Ruled>
          </div>
          <Plate>
            <OvernightDrop />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          05 · Crawling, Indexing, and Ranking Pipelines [exercise]
          ================================================================ */}
      <Slide
        id="crawling-indexing-and-ranking-pipelines"
        border
        className="!py-8"
        exercise={exercise["crawling-indexing-and-ranking-pipelines"]}
      >
        <SlideHeading>Crawling, Indexing, and Ranking Pipelines</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              Stage 1 is <Term tone="ink">crawling</Term>, in which automated bots (spiders) follow hyperlinks across
              the web and read XML sitemaps to fetch new or updated pages, bounded by the site&apos;s crawl budget and{" "}
              <code>robots.txt</code> directives.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Stage 2 is <Term tone="ink">rendering and indexing</Term>, in which the search engine executes page code,
              extracts text, links, and Schema.org structured data, and stores the canonical version of the document in
              a massive inverted index.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Stage 3 is <Term tone="ink">query processing and ranking</Term>, in which the search engine parses the
              user&apos;s query, retrieves candidate documents from the index, and orders them using hundreds of
              lexical, semantic, and authority signals within milliseconds.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <Ruled weight="thin">
            <P>
              If a page is blocked in <code>robots.txt</code>, marked with a <code>noindex</code> meta tag, or trapped
              behind unrenderable client-side scripts, it fails at Stages 1 or 2 and{" "}
              <Term tone="signal">can never be ranked at Stage 3 regardless of its quality</Term>.
            </P>
          </Ruled>
          <Plate>
            <CrawlPipeline />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          06 · Lexical Matching, Semantic Embeddings, and Authority Signals [no-exercise]
          ================================================================ */}
      <Slide id="lexical-matching-semantic-embeddings-and-authority-signals" border className="!py-8">
        <SlideHeading>Lexical Matching, Semantic Embeddings, and Authority Signals</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <RankSignals />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Classical information retrieval scored documents using lexical term frequency and inverse document
                frequency (TF-IDF and BM25), rewarding pages that repeated the exact words in the query.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Modern search engines pair lexical matching with dense transformer embeddings that represent queries and
                documents in a shared semantic vector space,{" "}
                <Term tone="signal">matching meaning even when exact words differ</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Because thousands of pages may be topically relevant to a query, search engines break ties using
                authority and trust signals derived from the web&apos;s link graph, originally formalized in{" "}
                <Term tone="ink">PageRank</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                In commercial and health or financial categories, ranking systems also weight experience, expertise,
                authoritativeness, and trustworthiness (<Term tone="ink">E-E-A-T</Term>) alongside user interaction
                signals such as <Term tone="ink">pogo-sticking</Term> (when a user clicks a result and immediately
                bounces back to the SERP).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          07 · Part 2: Search Engine Optimization (SEO) Strategy [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Search Engine Optimization (SEO) Strategy" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <CompoundingClicks />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                <Term tone="ink">Search Engine Optimization (SEO)</Term> is the discipline of engineering a
                website&apos;s content, technical architecture, and external reputation to maximize qualified organic
                traffic.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Because organic clicks carry zero marginal media cost per click, SEO builds{" "}
                <Term tone="signal">a compounding asset</Term>, though results take months to materialize.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          08 · On-Page, Technical, and Off-Page SEO [exercise]
          ================================================================ */}
      <Slide
        id="on-page-technical-and-off-page-seo"
        border
        className="!py-8"
        exercise={exercise["on-page-technical-and-off-page-seo"]}
      >
        <SlideHeading>On-Page, Technical, and Off-Page SEO</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">On-page SEO</Term> aligns individual pages with target query intent through descriptive
                title tags, heading hierarchy, comprehensive body content, internal anchor links, and keyword research
                covering both head terms and long-tail queries.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Technical SEO</Term> ensures that search engines can crawl, render, and index the site
                efficiently by optimizing Core Web Vitals (loading speed, interactivity, and visual stability), mobile
                responsiveness, HTTPS security, XML sitemaps, and canonical tags that prevent duplicate URL dilution
                across faceted e-commerce filters.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Off-page SEO</Term> builds domain authority outside the firm&apos;s own servers through
                earned editorial backlinks from reputable publications, digital public relations, brand mentions, and
                local citations.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Black-hat practices, such as buying link farms, stuffing hidden text, or spinning automated doorway
                pages, violate search engine guidelines and{" "}
                <Term tone="signal">risk manual or algorithmic de-indexing</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SeoLevers />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          09 · The Long Tail of E-Commerce Search [no-exercise]
          ================================================================ */}
      <Slide id="the-long-tail-of-e-commerce-search" border className="!py-8">
        <SlideHeading>The Long Tail of E-Commerce Search</SlideHeading>
        <Lead className="!max-w-none">
          In e-commerce catalogs, search demand follows a heavy-tailed power law distribution.
        </Lead>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                A small number of short head queries (e.g., &quot;running shoes&quot;) generate massive search volume
                but reflect vague intent, low conversion rates, and extreme competition from major aggregators.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Millions of specific long-tail queries (e.g., &quot;women&apos;s wide waterproof trail running shoes
                size 8&quot;) each receive modest monthly volume, but{" "}
                <Term tone="signal">collectively account for a large share of total search traffic</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Long-tail queries convert at substantially higher rates because the shopper has already specified the
                exact product attributes they need, making well-structured category facets and product pages natural
                long-tail landing pages.
              </P>
            </Ruled>
          </div>
          <Plate>
            <LongTail />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          10 · Part 3: Paid Search (SEM) and Auction Mechanics [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Paid Search (SEM) and Auction Mechanics" />
        <div className="mt-8 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <p className={BIG}>
              <Term tone="ink">Search Engine Marketing (SEM)</Term>, or paid search, allows advertisers to buy immediate
              visibility at the top of the SERP for specific keywords on a pay-per-click (PPC) basis.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              Critically, search engines{" "}
              <Term tone="signal">do not simply award the top slot to the advertiser who bids the highest</Term> dollar
              amount per click.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <HighBidLoses />
        </Plate>
      </Slide>

      {/* ================================================================
          11 · Generalized Second-Price Auctions and Quality Score [exercise]
          ================================================================ */}
      <Slide
        id="generalized-second-price-auctions-and-quality-score"
        border
        className="!py-8"
        exercise={exercise["generalized-second-price-auctions-and-quality-score"]}
      >
        <SlideHeading>Generalized Second-Price Auctions and Quality Score</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              Search engines allocate ad slots using a <Term tone="ink">Generalized Second-Price (GSP)</Term> auction
              modified by ad quality, rather than a pure highest-bid auction.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Why search engines weight quality alongside bid is straightforward, because an irrelevant ad with a high
              bid that nobody clicks generates zero revenue for a pay-per-click platform.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Each advertiser is assigned a <Term tone="ink">Quality Score</Term> (typically on a 1 to 10 scale)
              determined by three components, namely expected click-through rate (CTR), ad relevance to the query, and
              landing page experience.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                In simplified form, <Term tone="ink">Ad Rank</Term> equals the advertiser&apos;s maximum Cost-Per-Click
                (CPC) bid multiplied by Quality Score, and ads are ordered down the page by Ad Rank.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                The actual CPC paid by a winning advertiser is the minimum amount needed to beat the Ad Rank of the next
                advertiser immediately below, calculated as{" "}
                <Term tone="signal">the next advertiser&apos;s Ad Rank divided by the winner&apos;s own Quality Score,
                plus one cent</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <AuctionDesk />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          12 · Keyword Match Types, Negative Keywords, and Automated Bidding [no-exercise]
          ================================================================ */}
      <Slide id="keyword-match-types-negative-keywords-and-automated-bidding" border className="!py-8">
        <SlideHeading>Keyword Match Types, Negative Keywords, and Automated Bidding</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-3">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Exact match</Term> triggers an ad only when a search shares the tight specific meaning
                of the target keyword, offering maximum control over conversion intent.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Phrase match</Term> triggers when a query includes the meaning of the keyword phrase
                alongside additional modifier words before or after it.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Broad match</Term> allows the platform&apos;s language models to match the ad to any
                related query in the broader category, expanding reach but{" "}
                <Term tone="signal">risking wasted spend without guardrails</Term>.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Negative keywords</Term> explicitly block an ad from appearing on unprofitable queries
                (e.g., a luxury watch retailer adding &quot;free,&quot; &quot;repair,&quot; or &quot;battery
                replacement&quot; as negative keywords).
              </P>
            </Ruled>
          </div>
          <div className="grid gap-4">
            <Plate>
              <MatchTypes />
            </Plate>
            <Ruled weight="thin">
              <P className="!max-w-none">
                Modern SEM campaigns combine match types with automated smart bidding algorithms that adjust bids in
                real time for each individual auction based on device, location, time of day, and target Cost Per
                Acquisition (tCPA) or target Return on Ad Spend (tROAS).
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          13 · Part 4: Search Cannibalization and Incrementality [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Search Cannibalization and Incrementality" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Because paid search ads appear directly above organic search results on the same page, marketers face a
                fundamental economic question, namely{" "}
                <Term tone="signal">how many paid clicks would have arrived for free</Term> via the organic link
                milliseconds later.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>Answering this question requires distinguishing correlation from causal incrementality.</p>
            </Ruled>
          </div>
          <Plate>
            <SameShopTwice />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          14 · Branded Keywords, Cannibalization, and Competitive Conquesting [exercise]
          ================================================================ */}
      <Slide
        id="branded-keywords-cannibalization-and-competitive-conquesting"
        border
        className="!py-8"
        exercise={exercise["branded-keywords-cannibalization-and-competitive-conquesting"]}
      >
        <SlideHeading>Branded Keywords, Cannibalization, and Competitive Conquesting</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Branded keywords</Term> contain the advertiser&apos;s own brand name (e.g.,
              &quot;Patagonia fleece&quot;), whereas <Term tone="ink">non-branded keywords</Term> describe a generic
              category or problem (e.g., &quot;recycled fleece jacket&quot;).
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Advertising on branded keywords often shows extraordinarily high accounting ROAS in platform dashboards
              because users typing the brand name already intend to buy from that brand.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Controlled field experiments (such as Blake, Nosko, and Tadelis at eBay) demonstrate that when a dominant
                brand with the top organic result and no rival ads pauses its branded search ads,{" "}
                <Term tone="signal">almost all lost paid clicks simply click the organic link below</Term>, revealing
                heavy cannibalization.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Conversely, bidding on branded keywords is incrementally valuable when competing brands are actively
                &quot;conquesting&quot; (bidding on the focal brand&apos;s name to poach undecided shoppers) or when the
                brand&apos;s organic link is pushed below the fold.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Non-branded search ads typically show lower raw conversion rates than branded ads, but generate genuine
                incremental customer acquisition among shoppers who had not yet chosen a brand.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PauseBrandAds />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          15 · Discussion: Auditing a High-ROAS Search Agency Report
          ================================================================ */}
      <Slide id="discussion-auditing-a-high-roas-search-agency-report" border className="!py-8">
        <SlideHeading>Auditing a High-ROAS Search Agency Report</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt className="[&_p]:!text-[clamp(1.2rem,1.9vw,1.65rem)]">
            A Direct-to-Consumer luggage brand hires a paid search agency that reports a 900 percent Return on Ad Spend
            (ROAS) after sixty days. Upon inspecting the search term report, the founder sees that 85 percent of the
            budget was spent on exact-match searches for the brand&apos;s own trademarked name, where the brand already
            ranks first organically and faces no competitor ads. Why is the agency&apos;s reported ROAS misleading, and
            how should the founder design a geo-holdout experiment to measure the true incremental lift of paid search?
          </Prompt>
          <Plate>
            <AgencyReport />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          16 · Part 5: From Search Engines to AI Answer Engines [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="From Search Engines to AI Answer Engines" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <WhoReads />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Traditional search engines return a ranked list of ten links and leave the work of reading, comparing,
                and synthesizing across tabs to the human user.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Generative AI search interfaces (such as AI Overviews, Perplexity, and conversational shopping
                assistants) perform <Term tone="ink">retrieval-augmented generation (RAG)</Term> to read candidate pages
                and present <Term tone="signal">a single synthesized answer with a small shortlist</Term> of cited
                products.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          17 · Generative Engine Optimization (GEO) and the AI Shortlist [exercise]
          ================================================================ */}
      <Slide
        id="generative-engine-optimization-geo-and-the-ai-shortlist"
        border
        className="!py-8"
        exercise={exercise["generative-engine-optimization-geo-and-the-ai-shortlist"]}
      >
        <SlideHeading>Generative Engine Optimization (GEO) and the AI Shortlist</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              In traditional search, ranking fourth or fifth on page one still captures a meaningful trickle of
              comparison clicks from thorough shoppers.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              In conversational answer engines, visibility becomes sharply concentrated because the language model
              typically synthesizes only two or three recommended brands into its narrative response, creating{" "}
              <Term tone="signal">a winner-take-most shortlist</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Generative Engine Optimization (GEO)</Term> is the practice of structuring brand and
              product evidence so retrieval-augmented language models select, cite, and recommend the brand accurately.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P className="!max-w-none">
                Because RAG pipelines retrieve passages based on semantic similarity and factual specificity, pages with
                verifiable quantitative claims, clear comparison tables, authoritative third-party citations, and
                structured Schema.org data are more likely to be quoted in synthesized answers than pages filled with
                vague promotional superlatives.
              </P>
            </Ruled>
            <Plate>
              <ShortlistEvidence />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                Sponsored placements are also migrating inside conversational answers, requiring marketers and auditors
                to track how paid insertions interact with organic citations when AI agents mediate search (Wadi &amp;
                Ma, 2026c).
              </P>
            </Ruled>
            <Plate>
              <SponsoredInAnswer />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          18 · Discussion: Winning the Conversational Shortlist
          ================================================================ */}
      <Slide id="discussion-winning-the-conversational-shortlist" border className="!py-8">
        <SlideHeading>Winning the Conversational Shortlist</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt className="[&_p]:!text-[clamp(1.2rem,1.9vw,1.65rem)]">
            A B2B project-management software firm notices that organic click traffic from traditional informational
            blog queries has fallen by 35 percent over the past year because prospective buyers now ask conversational
            AI assistants &quot;Which project management tool is best for a 50-person engineering team?&quot; However,
            buyers who are referred from AI assistant citations convert at three times the rate of traditional blog
            readers. How should the firm restructure its content and SEO strategy to optimize for retrieval-augmented AI
            answers rather than top-of-funnel keyword volume alone?
          </Prompt>
          <Plate>
            <ReferralQuality />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          19 · Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Search marketing captures explicit user intent across informational, navigational, commercial investigation, and transactional queries.",
            "Search engines operate through a three-stage pipeline of crawling, rendering/indexing, and ranking, combining lexical matching, semantic vector embeddings, and link authority.",
            "Search Engine Optimization (SEO) aligns on-page content, technical site health (crawlability, Core Web Vitals, canonicalization), and off-page backlink authority to capture compounding organic traffic across head and long-tail queries.",
            "Paid search (SEM) uses Generalized Second-Price auctions weighted by Quality Score (expected CTR, ad relevance, and landing page experience), meaning higher ad quality lowers the actual CPC required to win top rank.",
            "High reported ROAS on branded keywords often reflects cannibalization of organic clicks rather than incremental sales, unless competitors are actively conquesting the brand's search results.",
            "As search shifts toward retrieval-augmented AI answer engines, Generative Engine Optimization (GEO) focuses on verifiable facts, structured comparisons, and authoritative citations to earn a place in the AI-generated shortlist.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled weight="thin">
                  <P>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
