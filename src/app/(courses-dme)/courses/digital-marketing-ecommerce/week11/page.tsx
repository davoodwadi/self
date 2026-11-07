"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { ClaimedOrders, EventStream, CohortTable, PaybackCurve, RoasMargin, MarginalRoas, AttributionRules, HoldoutLift, DarkFunnel } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";
const SPLIT = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12";
const TWO = "grid w-full items-start gap-8 lg:grid-cols-2 lg:gap-10";

function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded-sm bg-[var(--paper-3)] px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>;
}

export default function Week11Page() {
  return (
    <SlideDeck label="Week 11">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 11: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[26ch]">Web Analytics, Multi-Touch Attribution, and Unit Economics</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          Digital telemetry, unit economics, and causal attribution separate marketing spend that genuinely grows profit from spend that merely takes credit for existing demand.
        </p>
      </Slide>

      <Slide id="the-measurement-paradox-of-digital-marketing" border className="!py-8">
        <SlideHeading>The Measurement Paradox of Digital Marketing</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>A century ago, retail pioneer John Wanamaker famously remarked that half the money he spent on advertising was wasted, and the trouble was he did not know which half.</P></Ruled>
            <Ruled><P>Digital marketing promised to solve Wanamaker&apos;s dilemma permanently by logging every impression, click, session, and checkout in database tables.</P></Ruled>
            <Ruled><P>Paradoxically, modern e-commerce leaders often drown in tracking dashboards while still misallocating millions of dollars in ad spend.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><ClaimedOrders /></Plate>
            <Ruled><P>Why this happens is that every advertising platform <Term>grades its own homework</Term> using generous attribution windows, taking credit for conversions that would have happened anyway or that were driven by other touchpoints.</P></Ruled>
            <Ruled><P>Rigorous e-commerce analytics therefore combines clean event instrumentation, disciplined unit economics, and causal incrementality testing.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Digital Telemetry, Event Schemas, and Cohort Tables" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Before a firm can calculate conversion rates or return on ad spend, its engineering and marketing teams must instrument the storefront to capture accurate <Term>behavioral telemetry</Term>.</p></Ruled>
          <Ruled><p className={BIG}>Modern analytics platforms have moved away from simple pageview counters toward structured, event-driven data models.</p></Ruled>
        </div>
      </Slide>

      <Slide id="event-tracking-schemas-utm-parameters-and-server-side-tagging" border className="!py-8" exercise={exercise["event-tracking-schemas-utm-parameters-and-server-side-tagging"]}>
        <SlideHeading>Event Tracking Schemas, UTM Parameters, and Server-Side Tagging</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>In an <Term>event-based analytics schema</Term>, every meaningful user interaction is recorded as a named event (e.g., <C>page_view</C>, <C>view_item</C>, <C>add_to_cart</C>, <C>begin_checkout</C>, and <C>purchase</C>) accompanied by a dictionary of structured parameters (such as <C>item_id</C>, <C>price</C>, <C>currency</C>, and <C>coupon</C>).</P></Ruled>
            <Ruled><P><Term>Urchin Tracking Module (UTM)</Term> query parameters appended to inbound destination URLs (<C>utm_source</C>, <C>utm_medium</C>, <C>utm_campaign</C>, <C>utm_content</C>, and <C>utm_term</C>) tell the analytics system which external channel, campaign, and creative asset referred the visitor.</P></Ruled>
            <Ruled><P><Term>Client-side tracking</Term> relies on JavaScript tags and pixels executing inside the shopper&apos;s browser, which can be blocked by privacy browsers, ad blockers, or network timeouts.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><EventStream /></Plate>
            <Ruled><P><Term>Server-side tagging</Term> routes measurement events from the merchant&apos;s own first-party cloud server directly to analytics and advertising endpoints, improving page load speed, data governance control, and conversion count accuracy.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="cohort-retention-analysis-versus-aggregate-averages" border className="!py-8">
        <SlideHeading>Cohort Retention Analysis Versus Aggregate Averages</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Aggregate metrics (such as overall monthly conversion rate or total active customers) often mask deteriorating underlying health when rapid paid acquisition hides high customer churn.</P></Ruled>
            <Ruled><P>A <Term>cohort</Term> is a group of customers who share a common starting event within a specific time window, most commonly the month or week of their first purchase (an acquisition cohort).</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><CohortTable /></Plate>
            <Ruled><P>A <Term>cohort retention table</Term> tracks the percentage of customers or repeat revenue retained from each cohort in Month 1, Month 2, Month 3, and beyond, allowing managers to see whether product changes or new acquisition channels bring in loyal buyers or one-time deal hunters.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="E-Commerce Unit Economics (CAC, CLV, and Contribution Margin)" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Revenue growth destroys firm value if each additional customer costs more to acquire and fulfill than the net profit they generate over their lifetime.</p></Ruled>
          <Ruled><p className={BIG}><Term>Unit economics</Term> evaluates profitability at the level of a single order and a single acquired customer.</p></Ruled>
        </div>
      </Slide>

      <Slide id="customer-acquisition-cost-cac-contribution-margin-and-customer-lifetime-value-clv" border className="!py-8" exercise={exercise["customer-acquisition-cost-cac-contribution-margin-and-customer-lifetime-value-clv"]}>
        <SlideHeading>Customer Acquisition Cost (CAC), Contribution Margin, and Customer Lifetime Value (CLV)</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Customer Acquisition Cost (CAC)</Term> is total sales and marketing acquisition spend divided by the number of new customers acquired in that period. Managers must distinguish blended CAC (which averages paid and organic new buyers together) from paid CAC (paid spend divided by customers acquired through paid channels).</P></Ruled>
            <Ruled><P><Term>Order Contribution Margin (CM1/CM2)</Term> equals net order revenue (after discounts and expected returns) minus variable Cost of Goods Sold (COGS), packaging, warehouse pick-pack labor, outbound shipping, and payment processing fees.</P></Ruled>
            <Ruled><P><Term>Customer Lifetime Value (CLV or LTV)</Term> is the present value of the total net contribution margin (not gross revenue) a customer generates across all purchases before churning.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><PaybackCurve /></Plate>
            <Ruled><P>The <Term>LTV-to-CAC ratio</Term> and the <Term>CAC payback period</Term> (how many months of repeat contribution margin are required to recover the initial acquisition cost) govern how aggressively an e-commerce firm can scale paid media without running out of working capital.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="return-on-ad-spend-roas-versus-marginal-profit" border className="!py-6" exercise={exercise["return-on-ad-spend-roas-versus-marginal-profit"]}>
        <SlideHeading className="!mb-5">Return on Ad Spend (ROAS) Versus Marginal Profit</SlideHeading>
        <div className={TWO}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Return on Ad Spend (ROAS)</Term> is defined as attributed gross revenue divided by advertising spend (e.g., spending $1,000 on ads to generate $4,000 in attributed revenue equals a 4.0x or 400 percent ROAS).</P></Ruled>
            <Ruled><P>A common managerial error is celebrating a high ROAS number without checking the product&apos;s gross margin and return rate. On a product with a 20 percent net contribution margin after shipping and returns, a 4.0x gross revenue ROAS yields only $800 in contribution margin on $1,000 of ad spend, losing $200 before fixed overhead.</P></Ruled>
            <Plate><RoasMargin /></Plate>
          </div>
          <div className="grid content-start gap-3">
            <Ruled><P>Furthermore, average ROAS differs sharply from <Term>marginal ROAS</Term>. As an advertiser scales daily budget in an ad auction, the algorithm exhausts the highest-intent buyers first and must bid for progressively colder prospects, causing marginal return on the last dollar spent to fall well below the campaign average.</P></Ruled>
            <Plate><MarginalRoas /></Plate>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-the-unprofitable-5x-roas-campaign" border className="!py-8">
        <SlideHeading>Discussion: The Unprofitable 5x ROAS Campaign</SlideHeading>
        <Discussion
          scenario={"A Direct-to-Consumer footwear startup sells sneakers for $150 per pair. Manufacturing COGS is $52, outbound shipping and warehouse handling is $18, payment processing is $4.50, and 25 percent of orders are returned at a net reverse-logistics loss of $22 per returned order. The paid social agency reports a 4.5x gross ROAS (calculated on initial checkout revenue before returns) and asks to double the monthly ad budget."}
          question={"Calculate the true first-order contribution margin after returns and ad spend, and advise the CEO on whether to approve the budget increase."}
        />
      </Slide>

      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Multi-Touch Attribution (MTA) Models" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>A customer rarely buys a high-consideration product on the very first tap. Instead, they may see a creator video on Monday, click a paid search ad on Wednesday, read an email on Friday, and type the brand URL directly on Sunday.</p></Ruled>
          <Ruled><p className={BIG}><Term>Multi-Touch Attribution (MTA)</Term> determines how to assign fractional conversion credit across that sequence of touchpoints.</p></Ruled>
        </div>
      </Slide>

      <Slide id="rule-based-heuristics-versus-data-driven-attribution" border className="!py-8" exercise={exercise["rule-based-heuristics-versus-data-driven-attribution"]}>
        <SlideHeading>Rule-Based Heuristics Versus Data-Driven Attribution</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Last-touch (or last-click) attribution</Term> assigns 100 percent of the credit to the final touchpoint immediately preceding the purchase, systematically over-crediting bottom-of-funnel channels (branded search and retargeting) and starving top-of-funnel discovery.</P></Ruled>
            <Ruled><P><Term>First-touch attribution</Term> assigns 100 percent of the credit to the initial touchpoint that introduced the customer to the site, rewarding awareness channels while ignoring conversion closers.</P></Ruled>
            <Ruled><P><Term>Linear, time-decay, and U-shaped (position-based)</Term> rules distribute fractional credit across multiple touches using fixed weights (e.g., 40 percent to first touch, 40 percent to last touch, and 20 percent split across middle touches), improving on single-touch rules but relying on arbitrary human weights.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><AttributionRules /></Plate>
            <Ruled><P><Term>Algorithmic (data-driven) MTA</Term> models use cooperative game theory (Shapley values) or stochastic Markov chains to compare the empirical conversion probabilities of customer journeys with and without each channel, estimating each channel&apos;s marginal contribution from observed path data.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Why Attribution Is Not Incrementality" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Even the most sophisticated Shapley-value or Markov-chain attribution model suffers from a fundamental econometric flaw, namely that observational clickstream paths record <Term>correlation rather than causal incrementality</Term>.</p></Ruled>
          <Ruled><p className={BIG}>If a retargeting bot serves a banner ad to loyal customers ten minutes before they were going to buy anyway, observational MTA sees the ad in the winning path and assigns it credit.</p></Ruled>
        </div>
      </Slide>

      <Slide id="incrementality-experiments-geo-lift-tests-and-marketing-mix-modeling" border className="!py-6" exercise={exercise["incrementality-experiments-geo-lift-tests-and-marketing-mix-modeling"]}>
        <SlideHeading className="!mb-5">Incrementality Experiments, Geo-Lift Tests, and Marketing Mix Modeling</SlideHeading>
        <div className={TWO}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Incremental lift</Term> is the causal difference between the conversions achieved when an ad campaign is shown (the treatment state) and the counterfactual conversions that would have occurred if the campaign had been withheld (the control state).</P></Ruled>
            <Ruled><P><Term>Conversion Lift (or ghost-ad) experiments</Term> randomize target users into treatment and holdout control groups inside the ad platform, measuring the exact incremental sales generated by the ads.</P></Ruled>
            <Plate><HoldoutLift /></Plate>
          </div>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Geo-lift (or matched-market) experiments</Term> randomize entire geographic regions (such as Designated Market Areas or census metro areas) into treatment and holdout control groups, enabling causal measurement even when user-level cookies and cross-site IDs are unavailable.</P></Ruled>
            <Ruled><P><Term>Marketing Mix Modeling (MMM)</Term> uses aggregated time-series econometric regression across weekly channel spend, pricing, seasonality, and macroeconomic controls to estimate top-down channel elasticities without relying on individual user tracking.</P></Ruled>
            <Ruled><P>Modern analytics teams <Term>triangulate</Term> across all three methods (fast day-to-day MTA, top-down privacy-safe MMM, and periodic randomized geo-lift experiments) so experimental causal lift calibrates the day-to-day models.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Measuring Dark Funnel and Agent-Mediated Traffic" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Traditional web analytics assumes every step of the customer journey leaves a clickable trail of URL referrals and UTM tags.</p></Ruled>
          <Ruled><p className={BIG}>Today, a rapidly growing share of product discovery and evaluation happens off-site inside conversational AI assistants, private messaging apps, and autonomous shopping agents.</p></Ruled>
        </div>
      </Slide>

      <Slide id="dark-social-zero-click-discovery-and-agentic-telemetry" border className="!py-8">
        <SlideHeading>Dark Social, Zero-Click Discovery, and Agentic Telemetry</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Dark social and dark-funnel discovery</Term> occur when a buyer learns about a product through word-of-mouth, a podcast, a private group chat, or a multi-turn conversation with an LLM assistant, and then visits the merchant&apos;s site directly to buy, appearing in web analytics as &quot;Direct&quot; or &quot;Branded Search&quot; traffic.</P></Ruled>
            <Ruled><P>When an autonomous AI shopping agent queries a merchant&apos;s catalog API or fetches product pages via headless HTTP requests before presenting a single recommendation to the user, traditional browser JavaScript pixels often fail to fire altogether.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><DarkFunnel /></Plate>
            <Ruled><P>Forward-looking e-commerce teams instrument <Term>server-side HTTP request logs</Term> and API gateway telemetry to identify known AI crawler and shopping-agent user agents (such as <C>ChatGPT-User</C>, <C>PerplexityBot</C>, and <C>ClaudeBot</C>), pair checkout flows with post-purchase &quot;How did you hear about us?&quot; (HDYHAU) zero-party surveys, and run brand-search lift tests to capture dark-funnel influence.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-reconciling-conflicting-platform-dashboards" border className="!py-8">
        <SlideHeading>Discussion: Reconciling Conflicting Platform Dashboards</SlideHeading>
        <Discussion
          scenario={"At the monthly marketing review, a retailer's social ad platform claims credit for 4,200 orders, its search ad platform claims credit for 3,800 orders, and its email platform claims credit for 2,900 orders (10,900 attributed orders in total), yet the company's Order Management System recorded only 6,000 actual warehouse orders for the entire month."}
          question={"Explain to the executive team why the sum of platform-reported conversions exceeds reality, and outline a measurement framework combining server-side tracking, holdout lift tests, and contribution margin to allocate next quarter's budget."}
        />
      </Slide>

      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Reliable e-commerce measurement begins with structured event schemas, disciplined UTM taxonomy, server-side tagging, and cohort retention tables that separate repeat customer health from top-line acquisition spikes.",
            "Healthy unit economics require measuring paid versus blended Customer Acquisition Cost (CAC), net Contribution Margin after shipping and returns, and present-value Customer Lifetime Value (CLV).",
            "Gross revenue ROAS can be deeply misleading when margins are thin, returns are high, or marginal returns diminish as ad budgets scale.",
            "Multi-Touch Attribution (MTA) progresses from single-touch rules (first-touch, last-touch) and weighted heuristics to data-driven Shapley value and Markov chain models, but remains observational.",
            "True causal incrementality requires randomized holdout experiments (user-level conversion lift or matched geo-lift tests) paired with privacy-resilient Marketing Mix Modeling (MMM).",
            "As discovery shifts into conversational AI interfaces and autonomous shopping agents, marketers supplement browser pixels with server-side bot/agent log analytics and post-purchase zero-party attribution surveys.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
