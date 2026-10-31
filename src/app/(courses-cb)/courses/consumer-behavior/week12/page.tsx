"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import {
  createExerciseLookup,
  type ExerciseInput,
} from "@/lib/course-exercise";
import {
  TIGHT,
  P,
  Lead,
  Statement,
  Big,
  Term,
  Tint,
  Ruled,
  Plate,
  SlideHeading,
  PartHead,
  Numbered,
  Prompt,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import * as V from "./visuals";

// ============================================================================
// CONSUMER BEHAVIOR | WEEK 12: AI-MEDIATED CONSUMPTION AND FUTURE TRENDS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week12() {
  return (
    <SlideDeck label="Week 12">
      {/* ================================================================
          1. Title Slide
          ================================================================ */}
      <Slide id="title-slide">
        <div className="w-full max-w-4xl">
          <p className="type-label !text-[0.8rem] !text-[var(--ink-3)]">
            Week 12
          </p>
          <p className="type-caption mt-2">
            Consumer Behavior | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            AI-Mediated Consumption and Future Trends
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Digital platforms, algorithmic recommenders, and autonomous AI
              shopping agents reshape the consumer journey, raising{" "}
              <Tint>
                fundamental questions of agency, fiduciary duty, data privacy,
                and sustainability
              </Tint>
              .
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          2. The Evolution of Digital and Intermediary-Driven Consumption
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-evolution-of-digital-and-intermediary-driven-consumption"
        border
      >
        <SlideHeading>
          The Evolution of Digital and Intermediary-Driven Consumption
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.9fr_1.85fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Over the past three decades, retail markets have evolved from
              physical store aisles to web catalogs, mobile applications, and
              now <Term>algorithmic and agentic intermediaries</Term>.
            </Lead>
            <Ruled>
              <P>
                Each technological layer reduces physical search friction while{" "}
                <Tint>
                  inserting a new software intermediary between the consumer and
                  the manufacturer
                </Tint>
                .
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.Intermediaries />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Digital interactions generate granular{" "}
              <Term>behavioral traces</Term>, including search queries, dwell
              times, location histories, and conversational transcripts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Firms use these behavioral traces to personalize product
              assortments, promotional messages, and dynamic price quotes in
              real time.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Analyzing modern consumer behavior requires examining how platform
              architecture and algorithmic incentives steer what buyers see and
              choose.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          3. Omnichannel Behavior, Showrooming, and Webrooming
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="omnichannel-behavior-showrooming-and-webrooming"
        border
      >
        <SlideHeading>
          Omnichannel Behavior, Showrooming, and Webrooming
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement>
              Contemporary consumers rarely restrict a purchase journey to a
              single physical or digital channel. Instead, they engage in{" "}
              <Term>omnichannel shopping</Term> that{" "}
              <Tint>blends both environments</Tint>.
            </Statement>
            <Ruled>
              <P>
                <Term>Showrooming</Term> occurs when a shopper inspects and
                touches a physical product in a brick-and-mortar store to
                resolve sensory uncertainty and then buys the item online at a
                lower price.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Webrooming</Term> (or reverse showrooming) occurs when a
                shopper researches specifications, reviews, and AI comparisons
                online before visiting a physical store to complete the purchase
                immediately and avoid shipping delays.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.PhoneInTheAisle />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Mobile smartphones bridge the two channels in real time, allowing
              shoppers standing in a physical store aisle to check competitor
              prices and consult AI assistants.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Retailers counter showrooming by offering price-matching
              guarantees, exclusive in-store bundles, and immediate
              click-and-collect fulfillment.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          4. Part 1: Mobile Shopping, Social Commerce, and Algorithmic Discovery
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-mobile-shopping-social-commerce-and-algorithmic-discovery"
        border
      >
        <PartHead
          n={1}
          title="Mobile Shopping, Social Commerce, and Algorithmic Discovery"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Digital interfaces alter not only where consumers buy, but also{" "}
            <Tint>how needs are triggered and how products enter awareness</Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Mobile convenience, social commerce feeds, and collaborative
              recommender systems compress the traditional stages of the
              decision process.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          5. Mobile Commerce, Location Targeting, and Impulse Purchasing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="mobile-commerce-location-targeting-and-impulse-purchasing"
        border
      >
        <SlideHeading>
          Mobile Commerce, Location Targeting, and Impulse Purchasing
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Mobile commerce</Term> (m-commerce) conducts product
              discovery, comparison, and payment through handheld smartphones
              and wearable devices.
            </Lead>
            <Ruled>
              <P>
                Because a smartphone accompanies the consumer continuously,
                coupled with one-click digital wallets and biometric
                authentication, the friction of executing a transaction drops to
                seconds.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.LateNightBuy />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Lower payment friction and smaller screen sizes{" "}
              <Tint>
                reduce System 2 deliberation and increase the incidence of
                unplanned impulse purchases
              </Tint>
              .
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Geofencing</Term> and location-based marketing allow
              retailers to send time-sensitive promotional notifications when a
              consumer walks within a few hundred meters of a physical store.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Mobile interface design also restricts how many competing options
              appear simultaneously on one screen, amplifying position effects
              for top-listed items.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          6. Social Commerce and Live-Stream Shopping
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="social-commerce-and-live-stream-shopping"
        border
        exercise={exercise["social-commerce-and-live-stream-shopping"]}
      >
        <SlideHeading>Social Commerce and Live-Stream Shopping</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Social commerce</Term> integrates product discovery, peer
              social proof, and payment processing directly inside a social
              media platform without redirecting the user to an external retail
              website.
            </Lead>
            <Ruled>
              <P>
                In short-form video feeds, a viewer encounters an entertaining
                lifestyle clip, taps an embedded product tag, and completes
                checkout inside the same application.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Live-stream shopping</Term> combines real-time video
                demonstration by a host, interactive audience chat, visible
                purchase counters, and expiring countdown discounts.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.StagesMerge />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <Big>
              By fusing entertainment, parasocial trust, and instant checkout,
              social commerce{" "}
              <Tint>
                collapses problem recognition, search, evaluation, and purchase
                into a single sixty-second interaction
              </Tint>
              .
            </Big>
          </Ruled>
          <Ruled>
            <P>
              Because postpurchase cooling-off periods are bypassed during
              live-stream impulse buying, categories sold heavily via social
              commerce often experience elevated product return rates.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          7. Recommender Systems, Filter Bubbles, and Algorithmic Discovery
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="recommender-systems-filter-bubbles-and-algorithmic-discovery"
        border
        exercise={
          exercise[
            "recommender-systems-filter-bubbles-and-algorithmic-discovery"
          ]
        }
      >
        <SlideHeading>
          Recommender Systems, Filter Bubbles, and Algorithmic Discovery
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.9fr_1.85fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement>
              In traditional search, the consumer initiates a query after
              recognizing a need. In{" "}
              <Term>algorithm-driven discovery</Term>, a{" "}
              <Term>recommender system</Term>{" "}
              <Tint>
                proactively predicts and surfaces products before the user
                searches
              </Tint>
              .
            </Statement>
            <Ruled>
              <P>
                <Term>Collaborative filtering</Term> and deep sequence models
                analyze a user&apos;s past clicks, watch durations, and
                purchases alongside millions of other users to curate a
                personalized storefront feed.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.FilterBubble />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              Algorithmic curation reduces choice overload in massive catalogs,
              helping consumers discover niche music, books, and apparel suited
              to their tastes.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, optimizing strictly for immediate click probability can
              trap consumers in a <Term>filter bubble</Term> (or echo chamber)
              that repeatedly serves narrow variations of past purchases
              (Pariser, 2011).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Over time, excessive algorithmic narrowing reduces serendipitous
              discovery and induces category satiation unless the system
              incorporates deliberate exploration.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          8. Part 2: Agentic Commerce and Levels of Delegation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-agentic-commerce-and-levels-of-delegation"
        border
      >
        <PartHead n={2} title="Agentic Commerce and Levels of Delegation" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Whereas recommender systems suggest options for a human to evaluate,{" "}
            <Term>agentic commerce</Term> introduces{" "}
            <Tint>
              autonomous AI software that executes marketplace tasks on the
              consumer&apos;s behalf
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Consumer delegation to AI agents spans a four-level continuum from
              advisory support to fully autonomous purchasing.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          9. Defining Agentic Commerce
          ================================================================ */}
      <Slide className={TIGHT} id="defining-agentic-commerce" border>
        <SlideHeading>Defining Agentic Commerce</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              <Term>Agentic commerce</Term> refers to market transactions in
              which an artificial intelligence agent acts as an{" "}
              <Tint>
                active intermediary that searches, evaluates, negotiates, or
                purchases goods and services on behalf of a human consumer
              </Tint>
              .
            </Lead>
            <Ruled>
              <P>
                Unlike static rule-based auto-ship subscriptions that simply
                repeat an identical SKU on a fixed calendar schedule, an AI
                agent can interpret natural-language goals, compare live catalog
                changes, and switch brands when prices or ratings shift.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.DeskOfResults />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              An <Term>agentic workflow</Term> combines a large language model
              for reasoning with external tool calls that read product pages,
              check inventory APIs, and submit checkout credentials.
            </P>
          </Ruled>
          <Ruled>
            <P>
              As consumers delegate higher shares of routine and limited problem
              solving to agents, the agent&apos;s internal evaluation criteria
              become a primary driver of market share.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Understanding agentic commerce integrates every behavioral topic
              of this course: machine perception, associative retrieval,
              involvement, heuristics, and social proof.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          10. Four Levels of Autonomy in Consumer AI Delegation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="four-levels-of-autonomy-in-consumer-ai-delegation"
        border
        exercise={
          exercise["four-levels-of-autonomy-in-consumer-ai-delegation"]
        }
      >
        <SlideHeading>
          Four Levels of Autonomy in Consumer AI Delegation
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Statement>
              Consumer delegation to AI shopping systems can be organized into{" "}
              <Tint>four progressive levels of autonomy</Tint>.
            </Statement>
            <Ruled>
              <P>
                At <Term>Level 1 (AI Recommendation)</Term>, the system suggests
                candidate items in response to a query or browsing history,
                while the human consumer conducts further search, compares
                details, and buys.
              </P>
            </Ruled>
            <Ruled>
              <P>
                At <Term>Level 2 (Delegated Search and Comparison)</Term>, the
                AI agent queries multiple retailers, extracts hidden attributes,
                compares trade-offs, and presents a structured shortlist, while
                the human selects the winner and checks out.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.AgentLevels />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              At <Term>Level 3 (User-Approved Execution)</Term>, the AI agent
              selects the single best option, fills the shopping cart, and
              prepares shipping and payment details, requiring only a final
              confirmation click from the consumer.
            </P>
          </Ruled>
          <Ruled>
            <P>
              At <Term>Level 4 (Autonomous Purchasing)</Term>, the AI agent
              monitors household needs and executes complete purchases
              independently within pre-authorized guardrails such as budget caps
              and preferred delivery windows.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          11. Dual-Audience Marketing: Persuading the Principal and the Agent
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="dual-audience-marketing-persuading-the-principal-and-the-agent"
        border
      >
        <SlideHeading kicker="Dual-Audience Marketing:">
          Persuading the Principal and the Agent
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              As transactions move up the autonomy ladder from Level 1 to Level
              4, the human consumer inspects fewer raw marketplace pages
              directly.
            </Lead>
            <Ruled>
              <P>
                Brands operating in agentic markets must therefore manage a{" "}
                <Term>dual-audience marketing strategy</Term>{" "}
                <Tint>
                  addressing both the human principal and the AI agent
                </Tint>
                .
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.TwoAudiences />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Marketing to the <Term>human principal</Term> focuses on brand
              equity, emotional storytelling, postpurchase sensory satisfaction,
              and values so the consumer names the brand in delegation prompts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketing to the <Term>AI agent</Term> focuses on machine-readable
              schema markup, transparent unit pricing, verified technical
              specifications, and strong customer review ratings so the brand
              wins when the prompt is goal-based.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Neglecting either audience creates strategic vulnerability: a
              brand unknown to humans is never requested by name, and a brand
              unreadable to agents is filtered out during automated search.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          12. Discussion: Designing a Brand Strategy for Level-Four Autonomous Replenishment
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-a-brand-strategy-for-level-four-autonomous-replenishment"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing a Brand Strategy for Level-Four Autonomous Replenishment
        </SlideHeading>
        <Prompt>
          A consumer packaged goods conglomerate manages two brands: a premium
          infant diaper brand (high parental involvement and safety sensitivity)
          and a commodity trash-bag brand (low involvement, utilitarian
          replenishment). At which level of the four-level AI autonomy ladder
          are households most likely to delegate each category over the next
          five years, and how should the marketing mix and catalog data strategy
          differ between the two brands?
        </Prompt>
      </Slide>

      {/* ================================================================
          13. Part 3: Principal-Agent Conflicts and Sponsorship Disclosure
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-principal-agent-conflicts-and-sponsorship-disclosure"
        border
      >
        <PartHead
          n={3}
          title="Principal-Agent Conflicts and Sponsorship Disclosure"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            When a consumer delegates a decision to an AI assistant hosted by a
            retail platform or search provider, the assistant operates at the{" "}
            <Tint>intersection of two competing economic interests</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              Principal-agent theory and experimental evidence show how
              conflicts of duty and sponsorship labels shape AI recommendations.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          14. Principal-Agent Theory in AI Shopping Assistants
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="principal-agent-theory-in-ai-shopping-assistants"
        border
      >
        <SlideHeading>
          Principal-Agent Theory in AI Shopping Assistants
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              In economics and law, a{" "}
              <Term>principal-agent relationship</Term> arises whenever one
              party (the principal) delegates decision-making authority to
              another party (the agent) to act on the principal&apos;s behalf
              (Jensen &amp; Meckling, 1976).
            </Lead>
            <Ruled>
              <P>
                An <Term>agency problem</Term> (or conflict of interest) occurs
                when the agent&apos;s incentives diverge from the
                principal&apos;s welfare and the principal cannot perfectly
                monitor the agent&apos;s actions.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.TwoPrincipals />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              A consumer who asks an AI shopping assistant for the best hotel or
              flight naturally assumes the role of principal and expects the
              assistant to maximize the consumer&apos;s utility.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, the AI assistant is developed, hosted, and configured by
              a platform operator whose revenue may depend on advertising fees,
              seller commissions, or sponsored placements.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The AI agent therefore occupies a{" "}
              <Term>dual-agency position</Term> between{" "}
              <Tint>two principals with conflicting objectives</Tint>: the buyer
              seeking objective value and the platform seeking ad revenue.
            </P>
          </Ruled>
        </div>
      </Slide>
      {/* ================================================================
          15. Conflicts of Duty: Serving the Traveler Versus Serving the Platform
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="conflicts-of-duty-serving-the-traveler-versus-serving-the-platform"
        border
        exercise={
          exercise[
            "conflicts-of-duty-serving-the-traveler-versus-serving-the-platform"
          ]
        }
      >
        <SlideHeading kicker="Conflicts of Duty:">
          Serving the Traveler Versus Serving the Platform
        </SlideHeading>
        <div className="grid w-full items-center gap-6 lg:grid-cols-[0.9fr_1.85fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Controlled experiments in hotel booking examine how an AI agent
              behaves when candidate listings include{" "}
              <Term>sponsored hotels</Term> whose sellers paid for featured
              placement (Wadi &amp; Ma, 2026c).
            </Lead>
            <Ruled>
              <P>
                When an AI agent was instructed in its system prompt that it
                worked on behalf of the traveler, the agent treated sponsorship
                skeptically and selected a sponsored hotel significantly less
                often than an otherwise identical unsponsored hotel (Wadi &amp;
                Ma, 2026c).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <V.WhomItServes />
          </Plate>
        </div>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled>
            <P>
              When the exact same AI model was told that it worked on behalf of
              the booking platform, it penalized sponsored hotels significantly
              less and recommended the paid listing more often (Wadi &amp; Ma,
              2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Crucially, adding a single explicit sentence to the
              platform-aligned prompt stating that the agent&apos;s
              recommendations must{" "}
              <Tint>serve the traveler&apos;s best interest</Tint> eliminated
              this gap (Wadi &amp; Ma, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Thus, the <Term>fiduciary orientation</Term> specified in an AI
              assistant&apos;s system instructions directly alters whether the
              consumer receives buyer-aligned or platform-aligned
              recommendations (Wadi &amp; Ma, 2026c).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          16. Sponsorship Disclosure Labels and Beneficiary Prompts
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sponsorship-disclosure-labels-and-beneficiary-prompts"
        border
        exercise={
          exercise["sponsorship-disclosure-labels-and-beneficiary-prompts"]
        }
      >
        <SlideHeading>
          Sponsorship Disclosure Labels and Beneficiary Prompts
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Consumer protection law requires online platforms to attach{" "}
              <Term>disclosure labels</Term> (such as &quot;Sponsored&quot; or
              &quot;Ad&quot;) to paid placements so human shoppers can recognize
              commercial intent.
            </Lead>
            <Ruled>
              <P>
                When an AI agent screens listings on the consumer&apos;s behalf,
                the sponsorship disclosure label is{" "}
                <Tint>
                  read by the agent rather than seen directly by the human buyer
                </Tint>
                .
              </P>
            </Ruled>
            <Ruled>
              <P>
                Experimental tests show that the exact wording of the disclosure
                label changes agent behavior: labeling a paid hotel listing
                &quot;Sponsored&quot; reduced the agent&apos;s probability of
                selecting it more than labeling the identical listing
                &quot;Promoted&quot; (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.LabelWording />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              However, a clearer disclosure label alone did not eliminate the
              divergence between an agent instructed to serve the platform and
              an agent instructed to serve the traveler (Wadi &amp; Ma, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Protecting consumers in agentic commerce therefore requires
              governance rules that mandate both{" "}
              <Term>standardized machine-readable sponsorship labels</Term> and
              a clear{" "}
              <Term>duty of loyalty to the consumer as beneficiary</Term>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          17. Part 4: Data Privacy, Surveillance, and Algorithmic Pricing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-data-privacy-surveillance-and-algorithmic-pricing"
        border
      >
        <PartHead
          n={4}
          title="Data Privacy, Surveillance, and Algorithmic Pricing"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch]">
            Digital and agent-mediated shopping environments rely on{" "}
            <Tint>
              continuous collection of personal data and automated pricing
              algorithms
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              These capabilities create acute ethical tensions around
              surveillance, price discrimination, and algorithmic collusion.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          18. Personalization, the Privacy Paradox, and Conversational Data
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="personalization-the-privacy-paradox-and-conversational-data"
        border
      >
        <SlideHeading>
          Personalization, the Privacy Paradox, and Conversational Data
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Behavioral personalization</Term> creates genuine
              convenience for consumers by filtering irrelevant noise and
              surfacing timely reminders.
            </Lead>
            <Ruled>
              <P>
                At the same time, consumers exhibit the{" "}
                <Term>privacy paradox</Term>: in surveys, buyers express strong
                concern about corporate data tracking, yet in practice they{" "}
                <Tint>
                  readily trade personal information for small discounts or
                  convenience
                </Tint>{" "}
                (Norberg, Horne, &amp; Horne, 2007).
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.PrivacyParadox />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Shoshana Zuboff (2019) termed the large-scale extraction of
              behavioral data to predict and modify human action{" "}
              <Term>surveillance capitalism</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversational AI assistants deepen privacy risks because users
              disclose sensitive personal contexts, financial constraints,
              medical worries, and family plans in natural-language prompts far
              more candidly than in keyword search bars.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Ethical data stewardship requires <Term>data minimization</Term>,
              clear <Term>purpose limitation</Term>, opt-in consent before
              training models on user conversations, and local or anonymized
              processing where feasible.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          19. Dynamic Pricing, Personalized Pricing, and Perceived Fairness
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="dynamic-pricing-personalized-pricing-and-perceived-fairness"
        border
        exercise={
          exercise[
            "dynamic-pricing-personalized-pricing-and-perceived-fairness"
          ]
        }
      >
        <SlideHeading>
          Dynamic Pricing, Personalized Pricing, and Perceived Fairness
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Algorithmic pricing</Term> uses software models to update
              retail prices continuously in response to market conditions or
              individual buyer characteristics.
            </Lead>
            <Ruled>
              <P>
                <Term>Dynamic pricing</Term> varies the price of a good over
                time for all buyers simultaneously based on aggregate supply and
                demand, as in airline yield management or ride-hailing surge
                pricing.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Personalized pricing</Term> (first-degree price
                discrimination) charges{" "}
                <Tint>
                  different individual consumers different prices for the exact
                  same item at the same moment
                </Tint>{" "}
                based on their estimated willingness to pay, browsing device, or
                location.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.TwoPrices />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              Drawing on equity theory and dual-entitlement fairness norms
              (Kahneman, Knetsch, &amp; Thaler, 1986), consumers judge
              personalized pricing as highly unfair and deceptive when
              discovered.
            </P>
          </Ruled>
          <Ruled>
            <P>
              While cost-justified price adjustments or transparent student and
              senior discounts are accepted as fair, covert willingness-to-pay
              extraction triggers severe brand backlash.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          20. Algorithmic Tacit Collusion and Machine-to-Machine Bargaining
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="algorithmic-tacit-collusion-and-machine-to-machine-bargaining"
        border
      >
        <SlideHeading>
          Algorithmic Tacit Collusion and Machine-to-Machine Bargaining
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              When competing firms deploy reinforcement-learning pricing
              algorithms in the same market, a new competition concern arises:{" "}
              <Term>algorithmic tacit collusion</Term>.
            </Lead>
            <Ruled>
              <P>
                Economic simulations by Calvano et al. (2020) demonstrate that
                independent pricing algorithms trained to maximize long-term
                profit{" "}
                <Tint>
                  learn to charge supra-competitive prices and punish price cuts
                  by rivals without any explicit human agreement or
                  communication
                </Tint>
                .
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.AlgorithmMeetsAgent />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Because the algorithms never exchange messages, traditional
              antitrust laws focused on explicit human cartels struggle to
              prosecute the resulting high prices.
            </P>
          </Ruled>
          <Ruled>
            <P>
              As consumers deploy AI shopping agents of their own, marketplaces
              increasingly feature <Term>machine-to-machine interaction</Term>{" "}
              in which buyer agents compare, negotiate, and switch instantly
              against seller pricing algorithms.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Whether automated marketplaces raise or lower consumer surplus
              depends on whether consumers have access to unconflicted shopping
              agents that enforce vigorous price competition.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          21. Part 5: Sustainable Consumption and Course Synthesis
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-sustainable-consumption-and-course-synthesis"
        border
      >
        <PartHead
          n={5}
          title="Sustainable Consumption and Course Synthesis"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement className="!max-w-[34ch]">
            Alongside digital transformation, modern consumer behavior is shaped
            by{" "}
            <Tint>
              growing awareness of environmental limits, climate impact, and
              ethical labor practices
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Closing the gap between pro-environmental attitudes and actual
              marketplace choices connects behavioral theory to sustainable
              consumption and agentic delegation.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          22. Sustainable Consumption and the Attitude-Behavior Gap
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sustainable-consumption-and-the-attitude-behavior-gap"
        border
        exercise={
          exercise["sustainable-consumption-and-the-attitude-behavior-gap"]
        }
      >
        <SlideHeading>
          Sustainable Consumption and the Attitude-Behavior Gap
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Sustainable consumption</Term> is the acquisition, use, and
              disposition of products in ways that minimize environmental
              degradation and preserve resources for future generations.
            </Lead>
            <Ruled>
              <P>
                A persistent finding in sustainability research is the{" "}
                <Term>green attitude-behavior gap</Term>: a large majority of
                consumers express positive attitudes toward eco-friendly
                products in surveys, yet{" "}
                <Tint>
                  sustainable options often capture a much smaller share at the
                  checkout register
                </Tint>
                .
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.SayGreenBuyCheap />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              This gap arises because environmental benefits are abstract,
              collective, and delayed in the future, whereas price premiums,
              convenience sacrifices, and habitual inertia are immediate and
              personal.
            </P>
          </Ruled>
          <Ruled>
            <P>
              White, Habib, and Hardisty (2019) synthesized five behavioral
              levers that close this gap in the <Term>SHIFT framework</Term>:
              Social influence, Habit formation, the Individual self, Feelings
              and cognition, and Tangibility.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Making sustainable options the default choice, signaling peer
              norms, and connecting eco-efficiency to immediate personal
              benefits prove far more effective than abstract guilt appeals.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          23. Greenwashing, Eco-Labels, and Delegated Sustainability Filters
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="greenwashing-eco-labels-and-delegated-sustainability-filters"
        border
      >
        <SlideHeading>
          Greenwashing, Eco-Labels, and Delegated Sustainability Filters
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              <Term>Greenwashing</Term> occurs when an organization uses vague,
              unsubstantiated, or misleading environmental claims (such as
              &quot;all-natural&quot; or &quot;eco-conscious&quot; packaging) to
              appear sustainable without reducing its actual environmental
              footprint.
            </Lead>
            <Ruled>
              <P>
                Greenwashing erodes consumer trust and induces{" "}
                <Term>green skepticism</Term>, causing buyers to discount even
                legitimate environmental innovations.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Credible third-party <Term>eco-labels</Term> (such as Energy
                Star, Fairtrade, or certified carbon-footprint disclosures)
                reduce information asymmetry by providing standardized, audited
                metrics.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.GreenInstruction />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <P>
              In agentic commerce, delegation offers a promising mechanism for
              overcoming the human attitude-behavior gap at the moment of
              impulse purchase.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              A consumer who sets a persistent rule in their AI shopping agent
              (such as requiring verified repairability scores or excluding
              uncertified palm oil) ensures that{" "}
              <Tint>
                System 2 ethical values are applied consistently across every
                routine transaction
              </Tint>
              .
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          24. Course Synthesis: The Human Consumer and the AI Surrogate
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="course-synthesis-the-human-consumer-and-the-ai-surrogate"
        border
      >
        <SlideHeading kicker="Course Synthesis:">
          The Human Consumer and the AI Surrogate
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <Lead>
              Across twelve weeks, this course has traced consumer behavior from
              sensory perception, learning, memory, motivation, self-concept,
              and attitudes through decision rules, behavioral heuristics,
              postpurchase loyalty, social influence, and culture.
            </Lead>
            <Ruled>
              <P>
                Throughout each stage, the marketplace now includes{" "}
                <Tint>two interacting decision makers</Tint>: the{" "}
                <Term>human consumer</Term> and the <Term>AI agent</Term> acting
                as a surrogate consumer.
              </P>
            </Ruled>
          </div>
          <Plate>
            <V.TwoActors />
          </Plate>
        </div>
        <div className="mt-7 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              The AI agent perceives products through structured data, retrieves
              brands from learned text associations, curtailed search under
              lookup costs, and reflects training-corpus cultural patterns and
              system-prompt duties.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Yet the human consumer remains the origin and the end of
              consumption: the person who experiences physiological and
              psychological needs, defines identity, enjoys or regrets the
              physical product, and bears the financial and societal
              consequences.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketing that respects both the psychology of the human consumer
              and the transparency needs of their delegated agents builds
              durable brand equity and a fairer marketplace.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          25. Discussion: Governance of Platform-Hosted AI Shopping Assistants
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-governance-of-platform-hosted-ai-shopping-assistants"
        border
      >
        <SlideHeading kicker="Discussion:">
          Governance of Platform-Hosted AI Shopping Assistants
        </SlideHeading>
        <Prompt>
          Suppose a dominant e-commerce marketplace launches an integrated AI
          shopping assistant that defaults to Level 3 (user-approved checkout)
          for household groceries and travel bookings while earning advertising
          fees from sponsored product listings. Drawing on Wadi and Ma (2026b,
          2026c), principal-agent theory, sponsorship disclosure, and the SHIFT
          sustainability framework, propose a three-part governance charter
          specifying (1) system-prompt fiduciary duties, (2) machine-readable
          disclosure of unit prices, sponsorships, and environmental
          certifications, and (3) user controls that protect consumer welfare.
        </Prompt>
      </Slide>

      {/* ================================================================
          26. Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Numbered n={1}>
            <P>
              Digital consumption has evolved from omnichannel webrooming and
              showrooming to mobile commerce, collapsed-funnel social commerce,
              and algorithm-driven recommender discovery.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Agentic commerce progresses across four levels of autonomy
              (recommendation, delegated search and comparison, user-approved
              execution, and autonomous purchasing), requiring brands to
              communicate with both human principals and AI agents.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Platform-hosted AI shopping assistants face a principal-agent
              conflict of duty between the consumer and the platform: agents
              told they work for the platform penalize sponsored listings less
              than agents told they work for the traveler, unless explicitly
              instructed to serve the traveler&apos;s interest (Wadi &amp; Ma,
              2026c).
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Sponsorship label wording (&quot;Sponsored&quot; versus
              &quot;Promoted&quot;) alters AI agent choice, showing that
              disclosure regulations must address machine-readable labels and
              beneficiary alignment, not only human visual banners (Wadi &amp;
              Ma, 2026c).
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Conversational data collection, personalized pricing, and
              algorithmic tacit collusion (Calvano et al., 2020) raise major
              privacy and fairness challenges in automated markets.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Sustainable consumption is hindered by the green attitude-behavior
              gap and greenwashing, which can be addressed through behavioral
              SHIFT levers, audited eco-labels, and persistent sustainability
              rules in delegated AI shopping agents.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
