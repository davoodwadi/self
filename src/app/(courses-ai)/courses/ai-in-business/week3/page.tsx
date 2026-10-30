"use client";

import React from "react";
import { SlideDeck, Slide } from "@/app/(courses-ai)/_components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  BODY,
  COL_RULE,
  DISPLAY,
  Discussion1,
  Head1,
  LEAD,
  MICRO,
  PAIR,
  PartPlate1,
  RULED,
  Verdict,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  BanditLab,
  BrandDecoy,
  CfVsCb,
  CreativePipeline,
  HumanVsAgent,
  PositionLab,
  PropensityClv,
  RfmScatter,
  SurrogateJourney,
  SyntheticUses,
  TwoSidedMarket,
  TwoStageFunnel,
  UpliftMatrix,
  VocPipeline,
} from "./visuals";

// ============================================================================
// WEEK 3: AI IN MARKETING AND CONSUMER BEHAVIOR
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md. The
// design only decides where each sentence sits and which plate is drawn beside
// it. Plates live in ./visuals.tsx, exercises in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const T = "font-semibold text-[var(--ink)]";
const STACK = "space-y-4";
const SUB = `${BODY} border-t border-[var(--ink)]/10 pt-4`;
const GRID3 = "mt-6 grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-10";
const GRID2 = "mt-8 grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-14";

export default function Week3Page() {
  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className={`${MICRO} text-[var(--accent)]`}>Week 3</p>
          <h1 className="mt-4 font-sans text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] md:text-[3.75rem]">
            AI in Marketing and Consumer Behavior
          </h1>
          <p className={`${MICRO} mt-6 text-[var(--ink-3)]`}>Davood Wadi, PhD</p>
          <p className={`${LEAD} mt-12 max-w-3xl border-t border-[var(--ink)]/15 pt-8`}>
            Artificial intelligence reshapes marketing by predicting individual customer behavior,
            personalizing offers at scale, and introducing autonomous agents that shop on the
            consumer&apos;s behalf.
          </p>
        </div>
      </Slide>

      {/* From Mass Marketing to Algorithmic Personalization */}
      <Slide id="mass-to-algorithmic" border align="left">
        <Head1>From Mass Marketing to Algorithmic Personalization</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Marketing decisions allocate scarce resources, including advertising budgets, promotional
          discounts, and catalog space, across customers whose preferences are only partially observable.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              Traditional mass marketing grouped buyers into broad demographic segments and delivered the
              same message and price to every member of a segment.
            </p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              Modern digital channels record granular behavioral histories for millions of individual
              accounts, including search queries, page views, cart additions, and repeat purchases.
            </p>
            <p className={BODY}>
              Machine learning allows marketers to estimate conversion probability, retention risk, and
              product affinity at the level of the individual customer and session.
            </p>
          </div>
        </div>
        <Verdict>
          The managerial challenge shifts from designing a single campaign for an average buyer to
          governing automated systems that tailor{" "}
          <span className="text-[var(--accent)]">thousands of decisions per second</span>.
        </Verdict>
      </Slide>

      {/* Two Sides of AI in the Marketplace */}
      <Slide id="two-sides" border align="left" exercise={exercise["two-sides"]}>
        <Head1>Two Sides of AI in the Marketplace</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Artificial intelligence now operates on both sides of the retail and business-to-business
          marketplace.
        </p>
        <div className="mt-8 w-full max-w-5xl">
          <TwoSidedMarket />
        </div>
        <div className={`${GRID2} !mt-6`}>
          <div className={STACK}>
            <p className={BODY}>
              On the <span className={T}>firm side</span>, organizations deploy predictive and generative
              models to segment audiences, rank search results, personalize promotions, and automate
              creative production.
            </p>
            <p className={BODY}>
              Firm-side systems are optimized to maximize enterprise objectives such as conversion rate,
              gross margin, and customer lifetime value.
            </p>
          </div>
          <div className={`${STACK} ${COL_RULE}`}>
            <p className={BODY}>
              On the <span className={T}>consumer side</span>, buyers increasingly use conversational
              search assistants and autonomous shopping agents to filter products, compare prices, and
              execute purchases.
            </p>
            <p className={BODY}>
              Consumer-side systems are instructed to represent the buyer&apos;s stated preferences and
              budget constraints, changing how brands compete for visibility and choice.
            </p>
          </div>
        </div>
      </Slide>

      {/* Part 1 */}
      <PartPlate1
        id="part-1"
        numeral="1"
        title="Customer Segmentation, Propensity, and Churn"
        lines={[
          "Acquiring a new customer typically costs several times more than retaining an existing one, making targeted acquisition and retention central to marketing profitability.",
          "Unsupervised clustering and supervised propensity models allow firms to identify distinct customer groups and allocate marketing spend where it creates incremental value.",
        ]}
      />

      {/* Behavioral Segmentation and RFM Features */}
      <Slide id="rfm" border align="left">
        <Head1>Behavioral Segmentation and RFM Features</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            <span className={T}>Behavioral segmentation</span> groups customers according to their
            observed actions and transaction histories rather than static demographic traits such as age
            or postal code.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            A foundational feature set in retail and subscription analytics is{" "}
            <span className={T}>RFM</span>: Recency of the last purchase, Frequency of purchases over a
            period, and Monetary value spent.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <RfmScatter />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Unsupervised clustering algorithms applied to RFM and product-category browsing logs identify
            distinct groups such as high-spend loyalists, seasonal gift buyers, and dormant accounts.
          </p>
          <p className={BODY}>
            Because clustering requires no predefined target label, it helps marketing teams discover
            emerging usage patterns and tailor product bundles to each group.
          </p>
          <p className={BODY}>
            Segment definitions must be refreshed periodically as customer purchasing habits and product
            assortments evolve over the year.
          </p>
        </div>
      </Slide>

      {/* Propensity Modeling and Customer Lifetime Value */}
      <Slide id="propensity-clv" border align="left">
        <Head1>Propensity Modeling and Customer Lifetime Value</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            A <span className={T}>propensity model</span> is a supervised classification model that
            estimates the probability that a customer will perform a specific action, such as purchasing an
            add-on or redeeming a coupon.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Customer lifetime value (CLV)</span> is the present value of the future
            net profit expected from a customer over the duration of their relationship with the firm.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <PropensityClv />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Combining propensity scores with CLV prevents a common managerial mistake: optimizing
            campaigns solely for short-term clicks from low-margin or one-time bargain hunters.
          </p>
          <p className={BODY}>
            High-value acquisition targeting prioritizes prospects who exhibit both a high probability of
            converting and predicted spending patterns associated with long-term retention.
          </p>
          <p className={BODY}>
            Every propensity model requires a strict time horizon and{" "}
            <span className="text-[var(--accent)]">feature cutoff</span> so post-campaign outcomes never
            leak into the historical training features.
          </p>
        </div>
      </Slide>

      {/* Churn Prediction Versus Uplift Modeling */}
      <Slide id="churn-uplift" border align="left" exercise={exercise["churn-uplift"]}>
        <Head1>Churn Prediction Versus Uplift Modeling</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Churn prediction</span> estimates the probability that an existing
              subscriber or repeat buyer will cancel their account or stop purchasing within a given window.
            </p>
            <p className={BODY}>
              Sending a costly retention discount to every customer with a high churn score is inefficient
              because high risk of leaving does not imply high responsiveness to an offer.
            </p>
            <p className={SUB}>
              <span className={T}>Uplift modeling</span> estimates the incremental change in retention
              probability caused by the marketing intervention itself, comparing expected behavior with the
              offer versus without it.
            </p>
            <p className={BODY}>
              Uplift analysis divides customers into four groups: persuadables who stay only if contacted,
              sure things who stay regardless, lost causes who leave regardless, and sleeping dogs who
              cancel when reminded of their subscription.
            </p>
          </div>
          <UpliftMatrix />
        </div>
        <p className={`${LEAD} mt-10 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Marketing budget creates positive return on investment only when directed to{" "}
          <span className="text-[var(--accent)]">persuadables</span>, while avoiding wasted discounts on
          sure things and triggered cancellations among sleeping dogs.
        </p>
      </Slide>

      {/* Part 2 */}
      <PartPlate1
        id="part-2"
        numeral="2"
        title="Recommender Systems and Personalization at Scale"
        lines={[
          "Digital retailers and streaming platforms carry catalogs ranging from tens of thousands to hundreds of millions of items, far exceeding what a shopper can inspect manually.",
          "Recommender systems and search ranking algorithms filter this catalog into a personalized assortment tailored to each user's context and history.",
        ]}
      />

      {/* Collaborative Filtering Versus Content-Based Filtering */}
      <Slide id="cf-vs-cb" border align="left" exercise={exercise["cf-vs-cb"]}>
        <Head1>Collaborative Filtering Versus Content-Based Filtering</Head1>
        <div className={GRID2}>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Collaborative filtering</span> predicts what a user will like based on
              the historical preferences of other users who exhibited similar purchasing or viewing
              patterns.
            </p>
            <p className={BODY}>
              If two shoppers both bought the same three running shoes and one shopper also bought a
              specific hydration vest, collaborative filtering recommends that vest to the second shopper.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            <span className={T}>Content-based filtering</span> recommends items whose descriptive
            attributes, such as category tags, text descriptions, or image embeddings, resemble items the
            user has favored in the past.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CfVsCb />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Pure collaborative filtering suffers from the <span className={T}>cold-start problem</span>:
            it cannot recommend a newly launched product that has no prior user interactions, nor can it
            personalize for a first-time visitor.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Production recommender systems therefore use{" "}
            <span className="text-[var(--accent)]">hybrid architectures</span> that rely on content and
            catalog embeddings when interaction data are sparse and incorporate collaborative signals as
            behavioral history accumulates.
          </p>
        </div>
      </Slide>

      {/* Two-Stage Recommendation and Search Ranking */}
      <Slide id="two-stage" border align="left">
        <Head1>Two-Stage Recommendation and Search Ranking</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Scoring ten million catalog items with a complex deep neural network on every page load would
            exceed acceptable web response times of a few hundred milliseconds.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Large-scale personalization systems solve this latency constraint by separating recommendation
            into two sequential stages: <span className={T}>candidate retrieval</span> and{" "}
            <span className={T}>ranking</span>.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <TwoStageFunnel />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            In the candidate retrieval stage, fast vector search selects a few hundred plausible items from
            the full catalog using lightweight user and item embeddings.
          </p>
          <p className={BODY}>
            In the ranking stage, a high-capacity neural network scores those few hundred candidates using
            rich session features, real-time inventory status, and cross-feature interactions.
          </p>
          <p className={BODY}>
            The final ranked list balances predicted conversion probability against business rules such as
            profit margin, inventory clearance targets, and contractual sponsored placements.
          </p>
        </div>
      </Slide>

      {/* Exploration Versus Exploitation in Personalization */}
      <Slide id="explore-exploit" border align="left" exercise={exercise["explore-exploit"]}>
        <Head1>Exploration Versus Exploitation in Personalization</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              Every personalization system faces an exploitation-exploration trade-off when deciding which
              products or promotions to display.
            </p>
            <p className={BODY}>
              <span className={T}>Exploitation</span> displays the items with the highest currently
              estimated conversion rate to maximize immediate revenue on the current page view.
            </p>
            <p className={BODY}>
              <span className={T}>Exploration</span> displays newer or less-tested items to gather
              behavioral data and discover whether they perform better than the current default.
            </p>
            <p className={SUB}>
              A system that only exploits existing predictions creates a closed feedback loop: popular items
              receive all top-row impressions, while superior new products never accumulate enough clicks to
              be recommended.
            </p>
            <p className={BODY}>
              <span className={T}>Contextual bandit</span> algorithms manage this trade-off automatically by
              allocating most traffic to proven winners while reserving a controlled share of impressions to
              test uncertain alternatives across user contexts.
            </p>
          </div>
          <BanditLab />
        </div>
      </Slide>

      {/* Part 3 */}
      <PartPlate1
        id="part-3"
        numeral="3"
        title="Generative AI in Creative Production and Marketing Research"
        lines={[
          "While predictive models score and rank existing options, generative models create new marketing assets and synthesize unstructured customer feedback.",
          "Combining generative tools with controlled experimentation changes both the speed of creative production and the methods of market research.",
        ]}
      />

      {/* Generative AI in Copywriting and Creative Variation */}
      <Slide id="creative-variation" border align="left">
        <Head1>Generative AI in Copywriting and Creative Variation</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Producing tailored advertising copy, email subject lines, and product imagery for dozens of
            micro-segments was historically constrained by agency time and production cost.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Generative language and image models reduce the marginal cost of drafting segment-specific
            creative variations from a single campaign brief.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <CreativePipeline />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Reliable enterprise deployment requires grounding the model in verified product specifications
            and enforcing brand voice and regulatory compliance rules before publication.
          </p>
          <p className={BODY}>
            Lowering the cost of content generation does not mean every generated variant is effective with
            consumers.
          </p>
          <p className={BODY}>
            Creative generation creates measurable business value when paired with{" "}
            <span className="text-[var(--accent)]">A/B testing or multi-armed bandits</span> that retire
            weak variants and scale the messages that drive actual purchases.
          </p>
        </div>
      </Slide>

      {/* Unstructured Voice-of-the-Customer Analytics */}
      <Slide id="voice-of-customer" border align="left">
        <Head1>Unstructured Voice-of-the-Customer Analytics</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Organizations collect vast quantities of unstructured customer feedback in product reviews,
            post-purchase surveys, social media posts, and call-center transcripts.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Summary star ratings conceal actionable detail: a three-star review may praise product
            durability while criticizing confusing assembly instructions or damaged packaging.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <VocPipeline />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            <span className={T}>Aspect-based sentiment analysis</span> uses language models to identify
            specific product or service attributes mentioned in text and assign a separate sentiment score
            to each attribute.
          </p>
          <p className={BODY}>
            Clustering the vector embeddings of open-ended support tickets allows product and marketing
            teams to detect emerging quality issues before return rates spike.
          </p>
          <p className={BODY}>
            Automated synthesis turns qualitative text into a continuous diagnostic feed tracked alongside
            quantitative sales and churn metrics.
          </p>
        </div>
      </Slide>

      {/* Synthetic Respondents and Concept Testing */}
      <Slide id="synthetic-respondents" border align="left" exercise={exercise["synthetic-respondents"]}>
        <Head1>Synthetic Respondents and Concept Testing</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Marketing researchers increasingly experiment with <span className={T}>synthetic respondents</span>,
            prompting large language models with demographic and behavioral profiles to simulate consumer
            survey answers.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Synthetic personas are valuable during early-stage research for pre-testing questionnaires,
            identifying ambiguous wording, and generating hypotheses about possible buyer objections.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <SyntheticUses />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            However, synthetic respondents cannot replace human samples when estimating market demand, price
            elasticity, or willingness to pay for a genuinely new product.
          </p>
          <p className={BODY}>
            Language models reflect the average patterns of their pre-training text, under-represent niche
            or minority consumer segments, and exhibit{" "}
            <span className="text-[var(--accent)]">lower variance</span> than real human populations.
          </p>
          <p className={BODY}>
            Sound research practice uses language models to accelerate survey design and qualitative
            exploration, and validates high-stakes pricing and launch decisions on real consumer data.
          </p>
        </div>
      </Slide>

      {/* Discussion: Redesigning Retention and Creative Workflows at a Meal-Kit Brand */}
      <Slide id="discussion-meal-kit" border align="left">
        <Head1>Discussion: Redesigning Retention and Creative Workflows at a Meal-Kit Brand</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A subscription meal-kit company loses 11 percent of
          its active subscribers each month. Currently, the firm sends a 30 percent discount coupon to every
          subscriber whose predicted monthly churn probability exceeds 0.60, eroding profit margins. How
          should the marketing team redesign this retention program using uplift modeling, and how can they
          combine generative AI with field experiments to test non-discount interventions such as recipe
          customization reminders or delivery-skip prompts?
        </Discussion1>
      </Slide>

      {/* Part 4 */}
      <PartPlate1
        id="part-4"
        numeral="4"
        title="AI Shopping Agents as Surrogate Consumers"
        lines={[
          "For three decades, digital marketing assumed that a human shopper looked at a screen, read brand messaging, and clicked the buy button.",
          "As consumers delegate product search, comparison, and checkout to AI assistants and autonomous agents, the primary audience for many marketing signals becomes an algorithm.",
        ]}
      />

      {/* The AI Agent as a Surrogate Consumer */}
      <Slide id="surrogate-consumer" border align="left">
        <Head1>The AI Agent as a Surrogate Consumer</Head1>
        <div className={GRID3}>
          <p className={BODY}>
            In consumer behavior research, a <span className={T}>surrogate consumer</span> is an external
            agent retained by a buyer to search, evaluate alternatives, and make or recommend purchase
            decisions on the buyer&apos;s behalf.
          </p>
          <p className={BODY}>
            Historically, human interior designers, travel agents, and financial advisors served as
            surrogates for specialized purchases.
          </p>
          <p className={BODY}>
            General-purpose AI shopping agents extend surrogate consumption to everyday retail categories,
            from electronics and apparel to household replenishment and travel booking.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <SurrogateJourney />
        </div>
        <p className={`${BODY} mt-6 w-full max-w-5xl`}>
          When a shopper asks an agent to find a quiet dishwasher under 900 dollars that fits a 24-inch
          cabinet cutout, the agent translates the request into structured queries, screens dozens of
          listings, and returns two or three recommendations.
        </p>
        <p className={`${LEAD} mt-6 w-full max-w-5xl border-t border-[var(--ink)]/15 pt-6`}>
          Delegation sharply compresses the consideration set seen by the human buyer, making{" "}
          <span className="text-[var(--accent)]">inclusion in the agent&apos;s shortlist</span> the
          decisive step in the marketing funnel.
        </p>
      </Slide>

      {/* Marketing to Algorithms Versus Marketing to Humans */}
      <Slide id="algorithms-vs-humans" border align="left" exercise={exercise["algorithms-vs-humans"]}>
        <Head1>Marketing to Algorithms Versus Marketing to Humans</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          Human shoppers and AI shopping agents rely on fundamentally different cues when evaluating
          products.
        </p>
        <div className={GRID2}>
          <p className={BODY}>
            Human shoppers are influenced by visual packaging, lifestyle photography, emotional brand
            narratives, shelf placement, and psychological pricing such as 49.99 dollars instead of 50
            dollars.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            AI shopping agents parse text descriptions, structured specification tables, total delivered
            price, warranty terms, and aggregated customer review statistics.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <HumanVsAgent />
        </div>
        <div className={`${GRID2} !mt-6 border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Psychological pricing tactics and decorative web layouts have little effect on an agent
            programmed to calculate total unit cost or filter by exact technical thresholds.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Conversely, a superior product whose key dimensions or compatibility details are locked inside
            an <span className="text-[var(--accent)]">unindexed image file</span> will be excluded by an
            agent during automated screening.
          </p>
        </div>
      </Slide>

      {/* Machine-Readable Catalogs and Agentic Commerce Protocols */}
      <Slide id="machine-readable" border align="left">
        <Head1>Machine-Readable Catalogs and Agentic Commerce Protocols</Head1>
        <p className={`${DISPLAY} mt-8 max-w-4xl`}>
          Competing in agent-mediated channels requires treating product information as machine-readable
          data infrastructure rather than purely visual web design.
        </p>
        <div className={PAIR}>
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Structured product metadata</span> provide standardized fields for
              dimensions, materials, compatibility, energy ratings, unit pricing, real-time stock status, and
              return policies.
            </p>
            <p className={BODY}>
              When an agent uses retrieval or tool calls to verify whether an item meets a buyer&apos;s
              constraints, complete and unambiguous metadata determine whether the item passes the filter.
            </p>
          </div>
          <p className={`${BODY} ${COL_RULE}`}>
            Agentic commerce also requires application programming interfaces (APIs) that allow authorized
            agents to check live inventory, lock in price quotes, and initiate checkout under user-defined
            spending limits.
          </p>
        </div>
        <Verdict>
          Brands that publish verifiable, structured product feeds reduce friction for shopping agents and
          lower the likelihood that models hallucinate missing product specifications.
        </Verdict>
      </Slide>

      {/* Part 5 */}
      <PartPlate1
        id="part-5"
        numeral="5"
        title="Biases and Position Effects in Agent-Mediated Marketplaces"
        lines={[
          "Delegating a purchase decision to an AI agent does not make the choice purely objective or free of systematic distortion.",
          "Empirical research on large language models in shopping environments shows that models introduce their own position biases, brand preferences, and framing sensitivities.",
        ]}
      />

      {/* Position Bias and Context Sensitivity in LLM Product Choice */}
      <Slide id="position-bias" border align="left" exercise={exercise["position-bias"]}>
        <Head1>Position Bias and Context Sensitivity in LLM Product Choice</Head1>
        <div className="mt-8 grid w-full max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-12">
          <div className={STACK}>
            <p className={BODY}>
              <span className={T}>Position bias</span> is the tendency of a decision-maker or algorithm to
              favor options based on their location in a list or display rather than their underlying
              merits.
            </p>
            <p className={BODY}>
              Controlled experiments on AI shopping agents show that when a list of candidate products is
              inserted into a model&apos;s context window, the model exhibits strong{" "}
              <span className={T}>primacy bias</span>, selecting items listed first at much higher rates.
            </p>
            <p className={BODY}>
              Some models also display <span className={T}>recency bias</span>, favoring items at the very
              end of the list while overlooking equally strong alternatives in the middle of the context
              window.
            </p>
          </div>
          <PositionLab />
        </div>
        <div className={`${GRID2} border-t border-[var(--ink)]/10 pt-6`}>
          <p className={BODY}>
            Because an agent&apos;s recommendation depends on the order in which search tools return
            results, <span className="text-[var(--accent)]">upstream search ranking</span> directly shapes
            downstream agent choices.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Small variations in prompt phrasing, attribute ordering, or how product tables are formatted can
            shift an agent&apos;s recommendation share even when prices and ratings are unchanged.
          </p>
        </div>
      </Slide>

      {/* Brand Familiarity, Decoy Effects, and Algorithmic Heuristics */}
      <Slide id="brand-decoy" border align="left">
        <Head1>Brand Familiarity, Decoy Effects, and Algorithmic Heuristics</Head1>
        <div className={GRID2}>
          <p className={BODY}>
            Large language models exhibit <span className={T}>brand familiarity bias</span>: brands that
            appear frequently in the model&apos;s pre-training corpus are recommended more often than newer
            or smaller brands with identical specifications and ratings.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Because language models learn patterns from human text, they also replicate human behavioral
            anomalies such as the <span className={T}>attraction effect</span>, where adding an inferior
            decoy option increases choice share for a target product.
          </p>
        </div>
        <div className="mt-8 w-full max-w-5xl">
          <BrandDecoy />
        </div>
        <div className={GRID3}>
          <p className={BODY}>
            Without explicit calculation tools, language models often rely on surface heuristics,
            overweighting high review volume or superlative marketing adjectives relative to objective
            price-to-performance ratios.
          </p>
          <p className={BODY}>
            This creates a strategic vulnerability for challenger brands: even if a new entrant offers
            superior value, an uncalibrated model may default to the incumbent brand it encountered most
            often during training.
          </p>
          <p className={BODY}>
            Mitigating these biases requires equipping shopping agents with{" "}
            <span className="text-[var(--accent)]">deterministic comparison and sorting tools</span> rather
            than relying on raw next-token prediction over prose descriptions.
          </p>
        </div>
      </Slide>

      {/* Auditing and Regulating Agentic Marketplaces */}
      <Slide id="auditing" border align="left">
        <Head1>Auditing and Regulating Agentic Marketplaces</Head1>
        <p className={`${LEAD} mt-6 max-w-4xl`}>
          As AI agents influence a growing share of consumer spending, both brands and marketplace
          regulators need systematic methods to audit algorithmic recommendations.
        </p>
        <div className={PAIR}>
          <p className={BODY}>
            <span className={T}>Counterfactual auditing</span> tests an agent on controlled product sets
            while permuting display order, swapping brand names, or varying price increments to measure
            position and familiarity biases.
          </p>
          <p className={`${BODY} ${COL_RULE}`}>
            Open catalogs also create an adversarial security risk: sellers may embed hidden{" "}
            <span className={T}>prompt injections</span> or exaggerated claims in product descriptions to
            manipulate shopping agents into ranking their items first.
          </p>
        </div>
        <div className={`${RULED} ${STACK}`}>
          <p className={BODY}>
            Platform operators must sanitize catalog text, separate untrusted seller descriptions from system
            instructions, and verify structured claims against independent transaction records.
          </p>
          <p className={BODY}>
            Consumer protection in agentic marketplaces also requires{" "}
            <span className="text-[var(--accent)]">transparent disclosure</span> whenever paid sponsorship
            or platform self-preferencing influences which products an AI assistant recommends.
          </p>
        </div>
      </Slide>

      {/* Discussion: Competing for Visibility in Agent-Mediated Retail */}
      <Slide id="discussion-cookware" border align="left">
        <Head1>Discussion: Competing for Visibility in Agent-Mediated Retail</Head1>
        <Discussion1>
          <span className="sr-only">Discussion: </span>A mid-sized cookware manufacturer discovers that while
          its stainless-steel skillets rank in the top five on major retail websites, popular AI shopping
          assistants recommend its largest national competitor 85 percent of the time when users ask for the
          best skillet under 100 dollars. How should the marketing team design an audit to determine whether
          this gap is driven by incomplete structured metadata, search retrieval order, or pre-training brand
          familiarity bias? What legitimate actions can the firm take to improve its recommendation share?
        </Discussion1>
      </Slide>

      {/* Key Takeaways */}
      <Slide id="key-takeaways" border align="left">
        <Head1>Key Takeaways</Head1>
        <ol className="mt-8 grid w-full max-w-6xl gap-x-12 border-t border-[var(--ink)]/15 md:grid-cols-2">
          {[
            "Machine learning shifts marketing from segment-level averages to individual-level predictions of conversion propensity, customer lifetime value, and incremental retention uplift.",
            "Uplift modeling improves campaign profitability by targeting persuadable customers whose behavior changes in response to an intervention, rather than subsidizing customers who would stay or leave regardless.",
            "Large-scale recommender systems combine collaborative and content-based signals in a two-stage retrieval-and-ranking pipeline, while using contextual bandits to balance exploitation with exploration.",
            "Generative AI lowers the cost of creative variation and extracts aspect-level insights from unstructured customer text, but synthetic personas cannot replace human samples for demand and pricing validation.",
            "AI shopping agents act as surrogate consumers that compress the buyer's consideration set and evaluate products through structured metadata, specifications, and APIs rather than visual merchandising alone.",
            "Language models acting as shopping agents exhibit position bias, brand familiarity bias, and susceptibility to adversarial catalog text, requiring counterfactual auditing and tool-based evaluation.",
          ].map((line, i) => (
            <li key={i} className="grid grid-cols-[2rem_1fr] border-b border-[var(--ink)]/10 py-4">
              <span aria-hidden className={`${MICRO} pt-1 text-[var(--ink-3)]`}>
                {i + 1}
              </span>
              <p className="font-sans text-base leading-[1.55] text-[var(--ink)] md:text-[1.0625rem]">
                {line}
              </p>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
