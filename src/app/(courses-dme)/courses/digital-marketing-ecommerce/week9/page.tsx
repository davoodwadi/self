"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { DynamicVsPersonal, DualEntitlement, ShippingThreshold, DiscountBreakEven, RepricerLoops, BadgeLift } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";
const SPLIT = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12";
const SPLIT_R = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12";
const code = "rounded-sm bg-[var(--paper-3)] px-1.5 py-0.5 font-mono text-[0.85em]";

export default function Week9Page() {
  return (
    <SlideDeck label="Week 9">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 9: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[28ch]">E-Commerce Pricing, Promotions, and Dynamic Revenue Management</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          Digital storefronts turn pricing from a static catalog decision into a real-time algorithmic lever that shapes perceived value, margin, and competition.
        </p>
      </Slide>

      <Slide id="why-digital-pricing-differs-from-physical-retail" border className="!py-8">
        <SlideHeading>Why Digital Pricing Differs from Physical Retail</SlideHeading>
        <ol className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2 [&_p]:!text-[1.2rem]">
          <li className="min-w-0"><Numbered n={1}><Ruled><P>In a brick-and-mortar store, changing prices across ten thousand items requires printing paper tags and paying staff to walk the aisles, imposing physical <Term>menu costs</Term> that keep prices fixed for weeks.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={2}><Ruled><P>In an e-commerce database, menu costs are effectively zero, allowing a merchant or marketplace algorithm to update thousands of prices in milliseconds.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={3}><Ruled><P>At the same time, <Term>price transparency</Term> is dramatically higher online, because a shopper or an AI price-comparison agent can check a competitor&apos;s price in another tab or API call without walking across town.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={4}><Ruled><P>Digital pricing strategy must therefore balance real-time responsiveness to inventory and demand against consumer fairness perceptions and intense cross-store price visibility.</P></Ruled></Numbered></li>
        </ol>
      </Slide>

      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Digital Pricing Architectures" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Before setting a specific dollar figure or running a discount, an e-commerce firm chooses its underlying <Term>pricing architecture</Term>, which determines how value is metered and captured.</p></Ruled>
          <Ruled><p className={BIG}>Different architectures suit physical goods, replenishable consumables, and digital software or content.</p></Ruled>
        </div>
      </Slide>

      <Slide id="dynamic-pricing-personalized-pricing-subscriptions-freemium-and-bundling" border className="!py-6" exercise={exercise["dynamic-pricing-personalized-pricing-subscriptions-freemium-and-bundling"]}>
        <SlideHeading className="!mb-5">Dynamic Pricing, Personalized Pricing, Subscriptions, Freemium, and Bundling</SlideHeading>
        <div className="grid w-full gap-6">
          <div className={SPLIT}>
            <div className="grid content-start gap-3">
              <Ruled><P><Term>Dynamic pricing</Term> adjusts the price of a product over time in response to market-level supply and demand conditions (e.g., airline seats, ride-share surge multipliers, or seasonal outdoor gear), while quoting the same price to any two shoppers checking at the exact same moment.</P></Ruled>
              <Ruled><P><Term>Personalized (or first-degree) pricing</Term> quotes different prices or discount depths to different individual shoppers at the same moment based on their inferred willingness to pay, browsing history, device, or location.</P></Ruled>
            </div>
            <Plate><DynamicVsPersonal /></Plate>
          </div>
          <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-3">
            <Ruled><P><Term>Subscription and auto-replenishment pricing</Term> offers a recurring delivery discount (e.g., &quot;Subscribe and Save 10%&quot;) in exchange for predictable repeat orders and higher Customer Lifetime Value.</P></Ruled>
            <Ruled><P><Term>Freemium and tiered SaaS pricing</Term> offers a functional free tier with zero marginal distribution cost to drive viral adoption, monetizing power users who hit usage or feature limits.</P></Ruled>
            <Ruled><P><Term>Pure and mixed bundling</Term> packages multiple complementary items together at a combined price lower than the sum of the individual items, increasing Average Order Value (AOV) and reducing unit fulfillment costs per item shipped.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="consumer-fairness-perceptions-and-the-risks-of-personalized-pricing" border className="!py-8">
        <SlideHeading>Consumer Fairness Perceptions and the Risks of Personalized Pricing</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Under <Term>dual-entitlement theory</Term> (Kahneman, Knetsch, and Thaler), consumers generally accept price increases that reflect genuine increases in the seller&apos;s costs, but judge price increases that merely exploit a buyer&apos;s urgency or profile as unfair.</P></Ruled>
            <Ruled><P>When shoppers discover that an online retailer charged them a higher price than another shopper based on their postal code, desktop operating system, or loyalty history, trust collapses and brand backlash follows.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><DualEntitlement /></Plate>
            <Ruled><P>Rather than varying the public list price on the Product Detail Page across individuals, sophisticated e-commerce firms maintain a <Term>uniform public list price</Term> and deliver personalized price variation through targeted private coupons, loyalty tier rewards, or bundle discounts in CRM channels.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Promotional Framing on the Digital Storefront" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>How a price is framed on the screen alters <Term>perceived value</Term> even when the net dollar amount paid is identical.</p></Ruled>
          <Ruled><p className={BIG}>Digital storefronts deploy behavioral pricing cues that interact with human cognitive heuristics.</p></Ruled>
        </div>
      </Slide>

      <Slide id="reference-prices-just-below-pricing-flash-sales-and-free-shipping-thresholds" border className="!py-8" exercise={exercise["reference-prices-just-below-pricing-flash-sales-and-free-shipping-thresholds"]}>
        <SlideHeading>Reference Prices, Just-Below Pricing, Flash Sales, and Free-Shipping Thresholds</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Strike-through reference pricing</Term> displays an anchor price (e.g., &quot;Was $120, Now $89&quot;) next to the current selling price to create <Term>transaction utility</Term>, the psychological satisfaction of getting a deal. Under deceptive pricing laws, the strike-through anchor must be a bona fide price at which the item was genuinely offered for a reasonable period.</P></Ruled>
            <Ruled><P><Term>Just-below (or charm) pricing</Term> sets prices at $19.99 or $49.95 rather than $20.00 or $50.00, exploiting left-digit anchoring in which shoppers disproportionately weight the leftmost digit when encoding price magnitude.</P></Ruled>
            <Ruled><P><Term>Partitioned pricing</Term> separates the base product price from mandatory surcharges (such as shipping and handling), which can lower initial price perception on the listing card but triggers cart abandonment at checkout if fees feel excessive.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><ShippingThreshold /></Plate>
            <Ruled><P><Term>Minimum-spend thresholds</Term> (e.g., &quot;Add $14 more to unlock Free Shipping&quot; or &quot;Spend $100, Get $20 Off&quot;) incentivize shoppers to add an extra item to their basket, lifting Average Order Value above the merchant&apos;s shipping cost threshold.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Targeted Promotions and Margin Management" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Discounts are the easiest lever to pull when weekly sales dip, but undisciplined promotional discounting is one of the fastest ways to destroy an e-commerce brand&apos;s unit economics.</p></Ruled>
          <Ruled><p className={BIG}>Understanding the mathematics of gross margin shows why <Term>a 20 percent discount requires far more than a 20 percent increase in unit volume</Term> to break even.</p></Ruled>
        </div>
      </Slide>

      <Slide id="margin-erosion-deal-waiting-and-promotional-guardrails" border className="!py-6" exercise={exercise["margin-erosion-deal-waiting-and-promotional-guardrails"]}>
        <SlideHeading className="!mb-5">Margin Erosion, Deal-Waiting, and Promotional Guardrails</SlideHeading>
        <div className="grid w-full gap-6">
          <div className={SPLIT_R}>
            <Plate><DiscountBreakEven /></Plate>
            <div className="grid content-start gap-3">
              <Ruled><P>Consider a product that sells for $100 with a variable cost of goods sold and fulfillment of $60, yielding a $40 <Term>gross contribution margin</Term> (40 percent margin).</P></Ruled>
              <Ruled><P>If the marketer runs a 20 percent sitewide discount, the selling price drops to $80 while the unit cost remains $60, cutting the contribution margin per unit in half from $40 to $20. The store must now sell twice as many units just to earn the same total dollar contribution.</P></Ruled>
            </div>
          </div>
          <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-3">
            <Ruled><P>Furthermore, frequent sitewide sales train customers in <Term>forward-buying</Term> (stockpiling during sales) and <Term>strategic deal-waiting</Term>, where loyal buyers delay full-price purchases until the next holiday code arrives.</P></Ruled>
            <Ruled><P>Browser coupon-extension scrapers (which automatically test leaked promo codes at checkout) further erode margin when merchants use generic, shareable codes like <code className={code}>WELCOME20</code> instead of single-use cryptographic codes generated per CRM recipient.</P></Ruled>
            <Ruled><P>High-performing e-commerce brands protect brand equity by limiting sitewide markdowns, using value-added gifts-with-purchase instead of percentage cuts, and targeting single-use retention incentives only to high-churn-risk cohorts.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-breaking-the-sitewide-discount-addiction" border className="!py-8">
        <SlideHeading>Discussion: Breaking the Sitewide Discount Addiction</SlideHeading>
        <Discussion
          scenario={"A Direct-to-Consumer home-fragrance brand has run a 25 percent sitewide flash sale at the end of every month for the past year to hit its monthly revenue targets. Today, 78 percent of its orders occur during the four sale days each month, full-price conversion on regular days has collapsed below 0.5 percent, and gross contribution after ad spend is negative."}
          question={"Propose a 90-day pricing and promotional transition plan to wean customers off monthly sitewide discounts without crashing cash flow."}
        />
      </Slide>

      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Algorithmic Repricers and Marketplace Competition" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>On multi-seller marketplaces where dozens of third-party merchants sell the exact same barcode (GTIN), the platform awards the prominent <Term>&quot;Buy Box&quot;</Term> (the default Add-to-Cart button) primarily on landed price, fulfillment speed, and seller rating.</p></Ruled>
          <Ruled><p className={BIG}>To compete at machine speed, merchants deploy automated repricing algorithms that monitor rival prices and adjust their own quotes continuously.</p></Ruled>
        </div>
      </Slide>

      <Slide id="algorithmic-repricing-loops-and-tacit-coordination-risks" border className="!py-8" exercise={exercise["algorithmic-repricing-loops-and-tacit-coordination-risks"]}>
        <SlideHeading>Algorithmic Repricing Loops and Tacit Coordination Risks</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Rule-based repricers</Term> follow deterministic instructions set by the seller, such as &quot;Undercut the lowest FBA competitor by $0.05, down to a hard floor of $24.00.&quot;</P></Ruled>
            <Ruled><P>When two sellers both deploy naive undercut-by-a-penny rules without proper floors, they can trigger a high-speed <Term>price war spiral</Term> that drives prices down to cost within minutes.</P></Ruled>
            <Ruled><P><Term>Reinforcement-learning (RL) pricing algorithms</Term> go beyond fixed rules by experimenting with prices and learning policies that maximize long-term cumulative profit in repeated marketplace interactions.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><RepricerLoops /></Plate>
            <Ruled><P>Economic and legal research shows that when multiple autonomous RL pricing agents interact repeatedly in the same market, they can learn to maintain supra-competitive (artificially high) prices and punish price-cutters without ever exchanging an explicit human message, a phenomenon known as <Term>tacit algorithmic collusion</Term> (Calvano et al., 2020).</P></Ruled>
            <Ruled><P>Competition authorities now scrutinize shared pricing algorithms and algorithmic hub-and-spoke arrangements under antitrust law even when no smoke-filled room agreement exists.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="How AI Shopping Agents Evaluate Prices and Promotions" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>As consumers delegate product comparison to LLM-based shopping agents, a crucial question for marketers is whether behavioral pricing tactics designed for human psychology <Term>still work on machines</Term>.</p></Ruled>
          <Ruled><p className={BIG}>Controlled experimental studies on AI shopping agents show that models both mitigate some framing traps and exhibit their own distinct heuristic sensitivities (Wadi &amp; Ma, 2026a).</p></Ruled>
        </div>
      </Slide>

      <Slide id="price-heuristics-anchoring-and-attribute-trade-offs-in-ai-agents" border className="!py-6" exercise={exercise["price-heuristics-anchoring-and-attribute-trade-offs-in-ai-agents"]}>
        <SlideHeading className="!mb-5">Price Heuristics, Anchoring, and Attribute Trade-Offs in AI Agents</SlideHeading>
        <div className="grid w-full gap-6">
          <div className={SPLIT}>
            <div className="grid content-start gap-3">
              <Ruled><P>When all price components (item price, shipping fee, and unit quantity) are visible in structured text, an AI shopping agent can compute <Term>total landed unit price</Term> accurately, reducing the effectiveness of simple partitioned-pricing tricks.</P></Ruled>
              <Ruled><P>However, because foundation models are trained on vast corpora of human commercial text, they internalize human-like decision heuristics and respond to reference-price anchors, promotional badges, and just-below pricing cues when evaluating options under ambiguity (Wadi &amp; Ma, 2026a).</P></Ruled>
            </div>
            <Plate><BadgeLift /></Plate>
          </div>
          <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-2">
            <Ruled><P>Moreover, the <Term>specificity of the consumer&apos;s delegation prompt</Term> strongly moderates how the agent weights price against quality. A vague prompt (&quot;Buy me a good toaster&quot;) leaves the agent susceptible to framing and rank cues, whereas a constraint-specific prompt (&quot;Find a two-slice stainless toaster under $60 with at least a 2-year warranty&quot;) anchors the agent on verifiable attribute cutoffs.</P></Ruled>
            <Ruled><P>In <Term>business-to-agent (B2A) pricing</Term>, transparent all-in pricing, clear unit-price metrics, and verifiable value-tier differentiation outperform deceptive drip fees that cause an agent&apos;s checkout validation step to abort the purchase.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-pricing-for-human-eyes-and-algorithmic-filters" border className="!py-8">
        <SlideHeading>Discussion: Pricing for Human Eyes and Algorithmic Filters</SlideHeading>
        <Discussion
          scenario={"An online electronics accessory brand sells a 65-watt USB-C charger for $29.99 with a strike-through reference price of $49.99 and a $5.99 shipping fee revealed at checkout. A competing brand sells an identical charger for $33.00 flat with free shipping and exposes the full price and specification breakdown in its Schema.org JSON-LD markup."}
          question={"Compare how an impulsive human shopper versus an autonomous AI shopping agent instructed to \"find the best-value 65W charger under $35 total\" will evaluate these two listings."}
        />
      </Slide>

      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Zero menu costs and high cross-store price transparency make e-commerce pricing a dynamic, data-driven discipline across subscriptions, freemium tiers, bundles, and real-time adjustments.",
            "Because consumers perceive personalized list-price discrimination on public product pages as unfair, firms implement individualized pricing through private CRM coupons, loyalty tiers, and bundles.",
            "Promotional framing (bona fide strike-through reference anchors, just-below charm pricing, and free-shipping basket thresholds) lifts conversion and Average Order Value when applied honestly.",
            "Frequent sitewide percentage discounts severely erode unit contribution margins, invite coupon-extension leakage, and train customers in strategic deal-waiting.",
            "Automated marketplace repricers compete for the Buy Box in real time, creating risks of both downward price-war spirals and upward tacit algorithmic collusion among reinforcement-learning agents.",
            "Autonomous AI shopping agents calculate all-in landed prices when data are structured, yet still exhibit learned sensitivity to price anchors and promotional framing depending on the specificity of the user's delegation prompt (Wadi & Ma, 2026a).",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
