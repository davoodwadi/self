"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Prompt, Statement } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AgentInspections,
  AuditGrid,
  BidToDefend,
  ColdStartTrio,
  FeedbackLoop,
  FirstScreen,
  HypothesisPage,
  LaunchClimb,
  LedgerToPipeline,
  LookAlikeCards,
  PersuasionOrDelegation,
  PointOfPurchase,
  PullAndPush,
  RoleSwitch,
  SearchCost,
  ShelfToScreen,
  SlotSwap,
  SponsoredSlots,
  TwoPrincipals,
  TwoRecommenders,
  TwoStage,
} from "./visuals";

// ============================================================================
// WEEK 04: RECOMMENDER SYSTEMS, SEARCH RANKINGS, AND RETAIL MEDIA
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and which catalogue plate
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week4Page() {
  return (
    <SlideDeck label="Week 04">
      {/* ================================================================
          01. Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 04: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">Recommender Systems, Search Rankings, and Retail Media</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[52ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.3rem,2.1vw,1.8rem)]">
          Marketplace ranking and recommendation algorithms determine{" "}
          <span className="text-[var(--signal)]">which products win attention and sales</span> across both human
          shoppers and AI shopping agents.
        </p>
      </Slide>

      {/* ================================================================
          02. The Algorithm as the Digital Shelf [no-exercise]
          ================================================================ */}
      <Slide id="the-algorithm-as-the-digital-shelf" border className="!py-8">
        <SlideHeading>The Algorithm as the Digital Shelf</SlideHeading>
        <div className="grid w-full gap-x-12 gap-y-4 md:grid-cols-2">
          <Ruled weight="thin">
            <P>
              A physical supermarket holds roughly thirty thousand items, and consumer packaged goods brands pay
              slotting fees to place their boxes at eye level on the shelf.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              A major online marketplace hosts hundreds of millions of stock-keeping units (SKUs), far more than any
              human or agent can inspect.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-4">
          <ShelfToScreen />
        </Plate>
        <div className="mt-5 grid w-full gap-x-12 gap-y-4 md:grid-cols-2">
          <Ruled weight="thin">
            <P>
              On a digital screen, <Term tone="signal">the ranking and recommendation algorithm is the shelf</Term>,
              and the first few slots on the screen are the eye-level endcap.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Whether a product succeeds on an e-commerce platform depends not only on its intrinsic quality and price,
              but on how the platform&apos;s retrieval, ranking, and advertising auctions position it in front of
              buyers.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          03. Search Versus Recommendation in E-Commerce [no-exercise]
          ================================================================ */}
      <Slide id="search-versus-recommendation-in-e-commerce" border className="!py-8">
        <SlideHeading>Search Versus Recommendation in E-Commerce</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                E-commerce discovery relies on two complementary algorithmic systems, namely{" "}
                <Term tone="ink">search ranking</Term> (&quot;pull&quot; discovery) and{" "}
                <Term tone="ink">recommender systems</Term> (&quot;push&quot; discovery).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                In search ranking, the shopper provides an explicit query (e.g., &quot;wireless noise-canceling
                headphones&quot;), and the platform orders matching items from its catalog.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                In recommendation, no explicit query is needed. The platform proactively suggests items on the
                homepage, on product pages (&quot;frequently bought together&quot; or &quot;similar items&quot;), and in
                the cart based on browsing context and purchase history.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Both systems share the same engineering objective, which is to{" "}
                <Term tone="signal">select a handful of high-probability candidates from millions of items</Term>{" "}
                within a few dozen milliseconds.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PullAndPush />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          04. Part 1: Recommender System Architectures [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Recommender System Architectures" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>Recommender systems predict a user&apos;s affinity for items they have not yet purchased.</p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Over the past two decades, industrial recommenders have evolved from simple co-occurrence tables to{" "}
                <Term tone="signal">deep two-stage neural pipelines</Term>.
              </p>
            </Ruled>
          </div>
          <Plate>
            <LedgerToPipeline />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          05. Content-Based Filtering Versus Collaborative Filtering [exercise]
          ================================================================ */}
      <Slide
        id="content-based-filtering-versus-collaborative-filtering"
        border
        className="!py-8"
        exercise={exercise["content-based-filtering-versus-collaborative-filtering"]}
      >
        <SlideHeading>Content-Based Filtering Versus Collaborative Filtering</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Content-based filtering</Term> recommends items whose structured attributes, text
                descriptions, or image embeddings match the attributes of items the user has liked or viewed in the
                past.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                If a shopper buys a mystery novel by a Scandinavian author, a content-based system recommends other
                Scandinavian mystery novels using catalog metadata.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Collaborative filtering</Term> recommends items based on patterns in the user-item
                interaction matrix (views, cart additions, ratings, and purchases) across the entire population of
                shoppers, without requiring item metadata.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                User-based and item-based collaborative filtering identify that &quot;shoppers who bought Item A also
                bought Item B,&quot; while <Term tone="ink">matrix factorization</Term> decomposes the sparse interaction
                matrix into low-dimensional latent user and item vectors.
              </P>
            </Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate>
              <TwoRecommenders />
            </Plate>
            <Ruled weight="thin">
              <P className="!max-w-none">
                Content-based filtering <Term tone="signal">can recommend brand-new items</Term> that have no purchase
                history yet, whereas collaborative filtering discovers unexpected cross-category complements that share
                no text attributes.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          06. Cold Start, Filter Bubbles, and Two-Stage Retrieval-Ranking Pipelines [exercise]
          ================================================================ */}
      <Slide
        id="cold-start-filter-bubbles-and-two-stage-retrieval-ranking-pipelines"
        border
        className="!py-8"
        exercise={exercise["cold-start-filter-bubbles-and-two-stage-retrieval-ranking-pipelines"]}
      >
        <SlideHeading>Cold Start, Filter Bubbles, and Two-Stage Retrieval-Ranking Pipelines</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-3">
          <Ruled weight="thin">
            <P>
              The <Term tone="ink">item cold-start problem</Term> occurs when a newly listed product has zero clicks or
              purchases, starving collaborative filtering models of interaction signals unless the platform uses content
              features or exploration bandits.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              The <Term tone="ink">user cold-start problem</Term> occurs when an anonymous or first-time visitor arrives
              with no historical profile, requiring the system to rely on session-based behavior or contextual
              popularity.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Over-specialization</Term> (or the <Term tone="ink">filter bubble</Term>) occurs when a
              recommender shows only narrow variations of what a shopper already bought, suppressing catalog discovery
              and cross-selling.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-3">
          <ColdStartTrio />
        </Plate>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Ruled weight="thin">
            <P>
              To score millions of items in under 100 milliseconds, production marketplaces use a{" "}
              <Term tone="signal">two-stage architecture</Term>, where Stage 1 (candidate retrieval) rapidly narrows
              millions of SKUs down to a few hundred using approximate nearest-neighbor vector search, and Stage 2
              (ranking) scores those few hundred candidates with a heavy deep-learning model that predicts click,
              add-to-cart, and purchase probabilities.
            </P>
          </Ruled>
          <Plate>
            <TwoStage />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          07. Part 2: Why Rank Position Shapes Sales [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Why Rank Position Shapes Sales" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <SlotSwap />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Once a ranking algorithm orders a list of products, the position an item occupies on the page exerts{" "}
                <Term tone="signal">a powerful causal effect</Term> on whether it is clicked and bought.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Understanding position bias is fundamental to both marketplace algorithm design and digital marketing
                strategy.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          08. Why Rank Position Shapes Sales [no-exercise]
          ================================================================ */}
      <Slide id="why-rank-position-shapes-sales" border className="!py-8">
        <SlideHeading>Why Rank Position Shapes Sales</SlideHeading>
        <Statement className="!max-w-[46ch]">
          Shoppers rarely look past the first few results, so{" "}
          <span className="text-[var(--signal)]">clicks fall steeply with each step down the list</span>.
        </Statement>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <SearchCost />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                A sponsored listing that buys the top slot therefore wins attention that a better product further down
                never receives.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Eye-tracking and clickstream studies consistently show a steep, convex decay in attention from Position 1
                to Position 10, with the vast majority of clicks concentrated in the top three to five results.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                This pattern reflects rational search costs under time constraints, because inspecting every listing
                requires cognitive effort and scrolling, so shoppers use high rank position as a mental shortcut (a{" "}
                <Term tone="ink">trust bias</Term>) assuming the platform placed the best matches at the top.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          09. Disentangling Intrinsic Quality from Position Bias [exercise]
          ================================================================ */}
      <Slide
        id="disentangling-intrinsic-quality-from-position-bias"
        border
        className="!py-8"
        exercise={exercise["disentangling-intrinsic-quality-from-position-bias"]}
      >
        <SlideHeading>Disentangling Intrinsic Quality from Position Bias</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2">
          <Ruled weight="thin">
            <P>
              A central mistake in naive e-commerce analytics is assuming that the top-ranked item gets the most clicks
              solely because it is the most attractive product.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Observed <Term tone="ink">Click-Through Rate (CTR)</Term> is the product of two distinct probabilities,
              namely the probability that the user examines the slot at Position k (
              <Term tone="ink">examination probability</Term>) and the probability that the user clicks the item given
              that they examined it (<Term tone="ink">intrinsic relevance</Term>).
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                If a ranking model is trained naively on raw historical clicks without correcting for position bias, it
                creates <Term tone="signal">a rich-get-richer feedback loop</Term> in which items placed at the top
                accumulate clicks simply due to their position and become permanently locked into top ranks.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Platforms estimate true intrinsic relevance by running randomized top-k exploration experiments, logging
                viewport scroll impressions, or fitting <Term tone="ink">inverse propensity weighting (IPW)</Term>{" "}
                models that divide observed clicks by the slot&apos;s baseline examination probability.
              </P>
            </Ruled>
          </div>
          <Plate>
            <FeedbackLoop />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          10. Part 3: Retail Media Networks and Sponsored Rankings [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Retail Media Networks and Sponsored Rankings" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Because top rank positions command disproportionate shopper attention, marketplaces monetize the top of
                their search results and category grids through <Term tone="ink">Retail Media Networks (RMNs)</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Retail media has become one of the fastest-growing segments of digital advertising because it places
                ads <Term tone="signal">directly at the point of purchase</Term>.
              </p>
            </Ruled>
          </div>
          <Plate>
            <PointOfPurchase />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          11. Organic Rank Versus Sponsored Slots on the Marketplace Shelf [no-exercise]
          ================================================================ */}
      <Slide id="organic-rank-versus-sponsored-slots-on-the-marketplace-shelf" border className="!py-8">
        <SlideHeading>Organic Rank Versus Sponsored Slots on the Marketplace Shelf</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                On a modern marketplace results page, organic listings ranked by conversion probability sit interleaved
                with sponsored product listings paid for by merchants or brands.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Sponsored slots are allocated through real-time second-price or first-price auctions triggered by the
                shopper&apos;s search query or category browse event.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Unlike traditional display banners that take the user away to another website, a sponsored marketplace
                listing looks nearly identical to an organic product card, differing only by a small
                &quot;Sponsored&quot; or &quot;Ad&quot; disclosure label.
              </P>
            </Ruled>
            <Plate>
              <LookAlikeCards />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                For a newly launched product suffering from the item cold-start problem, buying sponsored top-slot
                placement is often{" "}
                <Term tone="signal">
                  the only way to generate the initial sales velocity and reviews required to climb the organic ranking
                  later
                </Term>
                .
              </P>
            </Ruled>
            <Plate>
              <LaunchClimb />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          12. The Platform's Three-Way Trade-Off in Retail Media [exercise]
          ================================================================ */}
      <Slide
        id="the-platforms-three-way-trade-off-in-retail-media"
        border
        className="!py-8"
        exercise={exercise["the-platforms-three-way-trade-off-in-retail-media"]}
      >
        <SlideHeading>The Platform&apos;s Three-Way Trade-Off in Retail Media</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P className="!max-w-none">
                Every marketplace operating a retail media network manages a delicate three-way optimization problem
                across buyers, third-party sellers, and the platform&apos;s own balance sheet.
              </P>
            </Ruled>
            <Plate>
              <SponsoredSlots />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                If the platform fills the top of the page with low-relevance, high-bidding sponsored products, it earns
                immediate advertising revenue, but shopper conversion falls and buyers lose trust in the platform&apos;s
                search utility.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Conversely, if the platform shows only organic results, it maximizes short-term buyer relevance but
                forfeits high-margin advertising revenue.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Marketplaces resolve this trade-off by imposing <Term tone="signal">relevance floors</Term> and
                expected-conversion multipliers inside the sponsored ad auction, so a poorly matched product cannot buy
                Position 1 at a reasonable price.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                When too many slots become pay-to-play, third-party merchants face a{" "}
                <Term tone="ink">prisoner&apos;s dilemma</Term> in which every seller bids up ad costs merely to defend
                their existing sales, compressing seller margins across the ecosystem.
              </P>
            </Ruled>
            <Plate>
              <BidToDefend />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          13. Discussion: The Sponsored Slot Dilemma
          ================================================================ */}
      <Slide id="discussion-the-sponsored-slot-dilemma" border className="!py-8">
        <SlideHeading>The Sponsored Slot Dilemma</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt className="[&_p]:!text-[clamp(1.2rem,1.9vw,1.65rem)]">
            A marketplace category manager proposes expanding the number of sponsored product slots at the top of mobile
            search results from two slots to four slots, which means mobile shoppers will see zero organic results on
            their first screen without scrolling. Ad-sales projections estimate a 28 percent jump in quarterly retail
            media revenue. What short-term and long-term effects will this change have on buyer conversion, organic
            seller retention, and search trust, and what experimental metrics should govern the decision?
          </Prompt>
          <Plate>
            <FirstScreen />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          14. Part 4: Position Bias When AI Agents Shop on Our Behalf [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Position Bias When AI Agents Shop on Our Behalf" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <HypothesisPage />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                A natural hypothesis about autonomous AI shopping agents is that because software can read an entire
                webpage of twenty or fifty listings in milliseconds, rank position and sponsored top slots should no
                longer matter.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Empirical research testing foundation models and tool-using shopping agents reveals{" "}
                <Term tone="signal">a very different reality</Term> (Wadi &amp; Ma, 2026b).
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          15. Does Rank Still Matter in Agent-Mediated Shopping? [exercise]
          ================================================================ */}
      <Slide
        id="does-rank-still-matter-in-agent-mediated-shopping"
        border
        className="!py-8"
        exercise={exercise["does-rank-still-matter-in-agent-mediated-shopping"]}
      >
        <SlideHeading>Does Rank Still Matter in Agent-Mediated Shopping?</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                Even when an AI shopping agent receives the full list of search results in its context window or through
                a browsing tool, it exhibits <Term tone="signal">systematic position bias</Term> rather than uniform
                evaluation (Wadi &amp; Ma, 2026b).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                First, in interactive browsing environments where inspecting a product&apos;s full details requires
                sequential tool calls, agents conserve steps by disproportionately inspecting candidates near the top of
                the ranked list.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Second, even when all candidate attributes are visible simultaneously inside a single prompt, transformer
                attention patterns and pre-trained linguistic priors produce primacy, recency, and non-monotonic position
                effects across the list order.
              </P>
            </Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate>
              <AgentInspections />
            </Plate>
            <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
              <Ruled weight="thin">
                <P>
                  Third, unless explicitly instructed otherwise, an AI agent often treats the marketplace&apos;s default
                  rank ordering as an informative quality signal, inheriting the human trust bias toward top-ranked
                  slots.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  Consequently, search rank optimization remains critical in business-to-agent (B2A) commerce, although
                  the shape of an agent&apos;s position curve differs from human visual decay.
                </P>
              </Ruled>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          16. Part 5: Sponsorship, Delegation, and Conflicts of Duty in Agentic Commerce [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Sponsorship, Delegation, and Conflicts of Duty in Agentic Commerce" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                When a human shopper sees a &quot;Sponsored&quot; label on Position 1,{" "}
                <Term tone="ink">persuasion knowledge</Term> helps the shopper recognize that the seller paid for that
                placement.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                When an AI shopping assistant mediates the purchase, how it treats sponsored listings depends on both its
                behavioral priors and <Term tone="signal">whom the agent is configured to serve</Term> (Wadi &amp; Ma,
                2026c).
              </p>
            </Ruled>
          </div>
          <Plate>
            <PersuasionOrDelegation />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          17. Principal-Agent Conflicts and Role Framing in AI Shopping Assistants [exercise]
          ================================================================ */}
      <Slide
        id="principal-agent-conflicts-and-role-framing-in-ai-shopping-assistants"
        border
        className="!py-8"
        exercise={exercise["principal-agent-conflicts-and-role-framing-in-ai-shopping-assistants"]}
      >
        <SlideHeading>Principal-Agent Conflicts and Role Framing in AI Shopping Assistants</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                In agentic commerce, a consumer (the <Term tone="ink">principal</Term>) delegates product evaluation to
                an AI agent, expecting the agent to maximize consumer surplus by trading off price, quality, and fit
                objectively.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                However, many conversational shopping assistants are built and deployed directly by advertising-funded
                marketplaces whose profit margins depend on sponsored ad clicks and higher-margin items.
              </P>
            </Ruled>
            <Plate>
              <TwoPrincipals />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P className="!max-w-none">
                Experimental evidence shows that an LLM agent&apos;s sensitivity to &quot;Sponsored&quot; disclosures
                and price-quality trade-offs shifts significantly depending on the institutional role assigned in its
                system prompt (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
            <Plate>
              <RoleSwitch />
            </Plate>
            <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
              <Ruled weight="thin">
                <P>
                  When prompted as an dedicated consumer advocate or fiduciary buyer&apos;s agent, the model penalizes
                  overpriced sponsored listings and searches deeper down the rankings for superior value.
                </P>
              </Ruled>
              <Ruled weight="thin">
                <P>
                  When prompted as a platform store assistant or given ambiguous dual mandates, the agent&apos;s
                  resistance to sponsored top slots weakens, creating{" "}
                  <Term tone="signal">a structural conflict of duty</Term> that is invisible to the human shopper who
                  sees only the final conversational recommendation.
                </P>
              </Ruled>
            </div>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          18. Discussion: Auditing a Marketplace Shopping Assistant
          ================================================================ */}
      <Slide id="discussion-auditing-a-marketplace-shopping-assistant" border className="!py-8">
        <SlideHeading>Auditing a Marketplace Shopping Assistant</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Plate>
            <AuditGrid />
          </Plate>
          <Prompt className="[&_p]:!text-[clamp(1.15rem,1.75vw,1.55rem)]">
            Major online retailers now embed conversational AI assistants directly into their mobile apps, encouraging
            shoppers to ask &quot;Pick the best car seat for my toddler&quot; rather than scrolling search results.
            Suppose a consumer advocacy regulator asks you to audit whether a retailer&apos;s AI assistant is steering
            parents toward higher-margin sponsored listings over higher-rated organic alternatives ranked lower on the
            page. How would you design a controlled experiment varying rank position, sponsorship labels, and price to
            test the assistant&apos;s recommendations?
          </Prompt>
        </div>
      </Slide>

      {/* ================================================================
          19. Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "E-commerce discovery combines \"pull\" search rankings with \"push\" recommender systems built on content-based filtering, collaborative filtering, and two-stage retrieval-ranking pipelines.",
            "Rank position exerts a steep causal effect on human sales because shoppers face visual search costs and trust the top of the list, requiring platforms to de-bias click data using exploration or inverse propensity weighting.",
            "Retail media networks monetize top shelf positions through real-time sponsored auctions, balancing high-margin ad revenue against organic buyer relevance via quality and conversion multipliers.",
            "Autonomous AI shopping agents do not eliminate rank effects. Instead, they exhibit bounded inspection patterns and non-monotonic position biases when evaluating ranked product lists.",
            "In agent-mediated commerce, an AI assistant's treatment of sponsored listings depends heavily on its system-level role assignment, creating principal-agent conflicts of duty when advertising-funded platforms deploy the assistant.",
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
