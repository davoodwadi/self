"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Discussion } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { RentVsOwn, TopicCluster, CdpPipeline, IdentityLinks, LifecycleTimeline, RfmMap, InboxPlacement, CreepinessCurve } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";
const SPLIT = "grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12";

export default function Week7Page() {
  return (
    <SlideDeck label="Week 7">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 7: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[26ch]">Content Strategy, CRM Systems, and Lifecycle Automation</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-10 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          Owned content and CRM data systems transform expensive one-time clicks into compounding customer relationships and automated repeat sales.
        </p>
      </Slide>

      <Slide id="the-economics-of-renting-attention-versus-owning-relationships" border className="!py-8">
        <SlideHeading>The Economics of Renting Attention Versus Owning Relationships</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Paid search, programmatic display, and paid social auctions allow an e-commerce firm to <Term>rent attention</Term>, but the moment the advertising budget stops, traffic from those channels drops to zero.</P></Ruled>
            <Ruled><P>Furthermore, as more merchants bid inside digital ad auctions, average Customer Acquisition Cost (CAC) tends to rise over time.</P></Ruled>
            <Ruled><P>Many e-commerce businesses actually lose money or barely break even on a customer&apos;s first order once paid media costs, product cost of goods sold, and shipping are deducted.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><RentVsOwn /></Plate>
            <Ruled><P>Long-term profitability therefore depends on moving newly acquired shoppers into <Term>owned media channels</Term> (content, email, SMS, and mobile apps) managed through Customer Relationship Management (CRM) systems, where marginal communication cost is near zero.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Content Marketing Strategy Across the Funnel" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}><Term>Content marketing</Term> is the creation and distribution of valuable, relevant, and consistent editorial, visual, or interactive material designed to attract, educate, and retain a clearly defined audience.</p></Ruled>
          <Ruled><p className={BIG}>Unlike interruptive advertising, effective content marketing provides utility to the buyer before asking for a transaction.</p></Ruled>
        </div>
      </Slide>

      <Slide id="mapping-content-formats-to-funnel-stages" border className="!py-8" exercise={exercise["mapping-content-formats-to-funnel-stages"]}>
        <SlideHeading>Mapping Content Formats to Funnel Stages</SlideHeading>
        <ol className="grid w-full gap-x-12 gap-y-6 md:grid-cols-2 [&_p]:!text-[1.2rem]">
          <li className="min-w-0"><Numbered n={1}><Ruled><P>At the <Term>top of the funnel</Term> (awareness and problem recognition), educational guides, original industry research, and entertaining short-form videos attract prospective buyers who are researching a problem rather than a brand.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={2}><Ruled><P>In the <Term>middle of the funnel</Term> (evaluation and consideration), buying guides, interactive product finders, specification comparison matrices, and detailed case studies help shoppers narrow their consideration set and understand why the firm&apos;s approach fits their needs.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={3}><Ruled><P>At the <Term>bottom of the funnel</Term> (conversion), customer video testimonials, sizing calculators, return-policy explainers, and transparent total-cost breakdowns resolve final purchase hesitation.</P></Ruled></Numbered></li>
          <li className="min-w-0"><Numbered n={4}><Ruled><P><Term>Post-purchase</Term> (onboarding and retention), setup tutorials, maintenance checklists, recipe or styling lookbooks, and user community forums ensure the customer extracts full value from the product, reducing returns and building brand affinity.</P></Ruled></Numbered></li>
        </ol>
      </Slide>

      <Slide id="content-pillar-architecture-and-editorial-roi" border className="!py-8">
        <SlideHeading>Content Pillar Architecture and Editorial ROI</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Rather than publishing disconnected blog posts at random, high-performing digital teams organize content into <Term>topic clusters</Term> anchored by a comprehensive <Term>pillar page</Term> (e.g., a complete guide to home espresso extraction) linked to specific cluster articles (grinder burr geometry, water chemistry, and milk steaming).</P></Ruled>
            <Ruled><P>Topic clusters signal deep topical authority to both search engines and retrieval-augmented AI assistants while guiding human readers naturally toward relevant product categories.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><TopicCluster /></Plate>
            <Ruled><P>Measuring content marketing ROI requires looking beyond single-session last-click conversion, tracking assisted conversions, email subscriber capture rates, organic search visibility, and lower support ticket volume from post-purchase tutorials.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Customer Data Infrastructure (CRM and CDP)" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Personalizing communication across millions of shoppers requires an information systems foundation capable of <Term>recognizing the same person across devices, channels, and transactions</Term>.</p></Ruled>
          <Ruled><p className={BIG}>Marketers rely on two distinct but complementary enterprise systems, namely the Customer Relationship Management (CRM) platform and the Customer Data Platform (CDP).</p></Ruled>
        </div>
      </Slide>

      <Slide id="crm-systems-versus-customer-data-platforms-cdps" border className="!py-8" exercise={exercise["crm-systems-versus-customer-data-platforms-cdps"]}>
        <SlideHeading>CRM Systems Versus Customer Data Platforms (CDPs)</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>A <Term>Customer Relationship Management (CRM) system</Term> is designed primarily to manage direct, known interactions with customers and prospects, storing contact records, communication history, support tickets, and sales pipelines.</P></Ruled>
            <Ruled><P>A <Term>Customer Data Platform (CDP)</Term> is a data engineering and unification layer that ingests real-time behavioral event streams (anonymous web clicks, mobile app events, cart views, POS store purchases, and ERP order updates) to build a single, persistent, unified profile for each customer.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><CdpPipeline /></Plate>
            <Ruled><P>Whereas a traditional CRM struggles to ingest millions of anonymous clickstream events per hour, a CDP unifies those raw events, <Term>resolves identity</Term> when an anonymous visitor logs in or enters an email, and syncs audience segments outward to email platforms, ad networks, and personalization engines.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="deterministic-and-probabilistic-identity-resolution" border className="!py-8">
        <SlideHeading>Deterministic and Probabilistic Identity Resolution</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>A shopper might discover a brand on a smartphone via a social app, research reviews on a work laptop, and complete the purchase on a home tablet, appearing as three separate anonymous visitors unless their identity is resolved.</P></Ruled>
            <Ruled><P><Term>Deterministic identity resolution</Term> links profiles using exact, verified first-party identifiers that persist across devices, such as a logged-in account ID, an authenticated email address, a loyalty phone number, or a hashed purchase credential.</P></Ruled>
            <Ruled><P><Term>Probabilistic identity resolution</Term> uses statistical models to infer that multiple devices belong to the same person or household based on shared IP addresses, device graphs, browsing timing, and geographic co-location.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><IdentityLinks /></Plate>
            <Ruled><P>Because privacy laws and browser protections heavily restrict cross-device probabilistic fingerprinting, modern e-commerce stores design <Term>value exchanges</Term> (such as wish-list saving, restock alerts, or loyalty rewards) that encourage shoppers to authenticate early and provide deterministic first-party identity.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Event-Driven Lifecycle Marketing Automation" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Once a CDP or e-commerce store streams customer events into a marketing automation platform, marketers replace one-size-fits-all batch email blasts with <Term>event-driven behavioral flows</Term>.</p></Ruled>
          <Ruled><p className={BIG}>Automated flows consistently generate a vastly higher revenue per recipient than batch newsletters because every message is triggered by a specific action the customer just took.</p></Ruled>
        </div>
      </Slide>

      <Slide id="core-automated-e-commerce-lifecycle-flows" border className="!py-6" exercise={exercise["core-automated-e-commerce-lifecycle-flows"]}>
        <SlideHeading className="!mb-5">Core Automated E-Commerce Lifecycle Flows</SlideHeading>
        <div className="grid w-full gap-5">
          <Plate className="mx-auto w-full max-w-[880px]"><LifecycleTimeline /></Plate>
          <div className="grid w-full gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
            <Ruled><P>The <Term>welcome series</Term> is triggered immediately when a prospect subscribes to an email or SMS list, introducing the brand&apos;s story, surfacing best-selling products, and converting high early curiosity into a first order.</P></Ruled>
            <Ruled><P><Term>Browse abandonment and cart abandonment flows</Term> are triggered when an identified shopper views a product page repeatedly or adds an item to the cart without completing checkout, sending a timely reminder with product imagery, stock status, or support answers.</P></Ruled>
            <Ruled><P><Term>Post-purchase onboarding and cross-sell flows</Term> are triggered at order confirmation and delivery, providing tracking peace of mind, care instructions prior to unboxing, and complementary product recommendations after the item has been used.</P></Ruled>
            <Ruled><P><Term>Replenishment flows</Term> are triggered for consumable products (e.g., coffee beans, contact lenses, or pet food) just before the customer&apos;s predicted run-out date based on package size and historical reorder intervals.</P></Ruled>
            <Ruled><P><Term>Win-back (or sunset) flows</Term> are triggered when a previously active customer exceeds their expected inter-purchase time window without ordering, offering a targeted incentive to re-engage before suppressing permanently inactive addresses.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="segmentation-by-recency-frequency-and-monetary-value-rfm" border className="!py-6" exercise={exercise["segmentation-by-recency-frequency-and-monetary-value-rfm"]}>
        <SlideHeading className="!mb-5">Segmentation by Recency, Frequency, and Monetary Value (RFM)</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled><P>Not all customers in a CRM database deserve the same messaging cadence or promotional discount.</P></Ruled>
            <Ruled><P><Term>Recency</Term> measures how recently the customer made their last purchase, which is the strongest single behavioral predictor of whether they will respond to a new campaign.</P></Ruled>
            <Ruled><P><Term>Frequency</Term> measures how often the customer has purchased within a given period, separating one-time gift buyers from habitual repeat customers.</P></Ruled>
            <Ruled><P><Term>Monetary value</Term> measures the total revenue (or gross contribution margin) the customer has generated across their history with the firm.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><RfmMap /></Plate>
            <Ruled><P>Grouping customers into RFM segments (such as Champions with high R, F, and M, At-Risk Big Spenders with low R but high historical F and M, and Price-Sensitive One-Timers) allows marketers to reserve VIP early access for Champions while directing win-back interventions to At-Risk high-value buyers.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Email and Push Deliverability, Hygiene, and Frequency" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Even the best lifecycle flow fails if inbox providers route the company&apos;s emails into the spam folder or if push notifications cause users to uninstall the mobile app.</p></Ruled>
          <Ruled><p className={BIG}>Deliverability is governed by <Term>cryptographic authentication standards and behavioral sender reputation</Term>.</p></Ruled>
        </div>
      </Slide>

      <Slide id="inbox-authentication-sender-reputation-and-list-hygiene" border className="!py-8">
        <SlideHeading>Inbox Authentication, Sender Reputation, and List Hygiene</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P>Mailbox providers verify that an email genuinely originated from the brand&apos;s domain using three DNS-level authentication protocols, namely <Term>Sender Policy Framework (SPF)</Term>, <Term>DomainKeys Identified Mail (DKIM)</Term>, and <Term>Domain-based Message Authentication, Reporting, and Conformance (DMARC)</Term>.</P></Ruled>
            <Ruled><P>Beyond technical authentication, inbox placement depends on domain <Term>sender reputation</Term>, which mailbox algorithms compute from recipient engagement signals (open rates, clicks, replies, folder moves) versus negative signals (spam complaints, hard bounces, and spam-trap hits).</P></Ruled>
            <Ruled><P>Strict <Term>list hygiene</Term> through confirmed opt-in, automated sunset policies that remove chronically unengaged subscribers, and granular preference centers protects long-term inbox placement.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><InboxPlacement /></Plate>
            <Ruled><P>Sending daily batch emails to hundreds of thousands of unengaged addresses lowers overall engagement rates and damages sender reputation, causing transactional receipts and cart-recovery emails for active buyers to land in spam as well.</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-fixing-a-broken-lifecycle-program" border className="!py-8">
        <SlideHeading>Discussion: Fixing a Broken Lifecycle Program</SlideHeading>
        <Discussion
          scenario={"An online kitchenware retailer sends a 15 percent promotional blast to its entire 400,000-person email list four times every week. Over the past six months, open rates have fallen below 8 percent, unsubscribe and spam complaint rates have spiked, and high-margin customers now refuse to buy anything at full price because they know another coupon arrives in forty-eight hours."}
          question={"Using RFM segmentation, event-driven lifecycle flows, and deliverability hygiene, design a restructuring plan to restore margin and inbox placement."}
        />
      </Slide>

      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Hyper-Personalization at Scale and AI Lifecycle Agents" />
        <div className="mt-7 grid w-full max-w-[64rem] gap-6">
          <Ruled><p className={BIG}>Traditional marketing automation relies on rigid, human-authored decision trees (<code className="rounded-sm bg-[var(--paper-3)] px-1.5 py-0.5 font-mono text-[0.85em]">if segment = A and viewed_category = B, send template_3</code>).</p></Ruled>
          <Ruled><p className={BIG}>Large language models and reinforcement-learning bandits allow CRM systems to tailor send times, channel selection, product bundles, and message copy <Term>at the level of the individual customer</Term>.</p></Ruled>
        </div>
      </Slide>

      <Slide id="ai-driven-personalization-versus-customer-reactance" border className="!py-8" exercise={exercise["ai-driven-personalization-versus-customer-reactance"]}>
        <SlideHeading>AI-Driven Personalization Versus Customer Reactance</SlideHeading>
        <div className={SPLIT}>
          <div className="grid content-start gap-3">
            <Ruled><P><Term>Next-best-action models</Term> evaluate each customer&apos;s real-time CDP profile to decide which product to feature, which channel to use (email, SMS, app push, or silence), and what time of day to send.</P></Ruled>
            <Ruled><P>Generative language models can dynamically adapt email subject lines and body explanations to highlight the specific product attributes a customer cares about (e.g., emphasizing durability for one buyer and lightweight portability for another).</P></Ruled>
            <Ruled><P>Furthermore, as consumers begin using AI inbox filters and personal assistant agents that summarize promotional emails and manage subscriptions automatically, lifecycle messages must offer clear, structured value rather than clickbait subject lines.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><CreepinessCurve /></Plate>
            <Ruled><P>However, personalization exhibits an <Term>inverted-U relationship</Term> with consumer response. When a message references overly granular behavioral tracking that the customer did not consciously realize they shared, it triggers perceived surveillance, eeriness, and psychological reactance (Aguirre et al., 2015).</P></Ruled>
          </div>
        </div>
      </Slide>

      <Slide id="discussion-the-personalization-creepiness-line" border className="!py-8">
        <SlideHeading>Discussion: The Personalization Creepiness Line</SlideHeading>
        <Discussion
          scenario={"A pet supply e-commerce store uses its CDP and a language model to send personalized follow-up emails. When a shopper browses an orthopedic dog bed for twelve seconds without buying, the system automatically sends an email two hours later reading, \"We noticed you were looking at the Large Orthopedic Bed at 2:14 PM today, is your older dog having joint trouble?\" Compare this message with a well-designed browse abandonment trigger."}
          question={"Why does the first message trigger customer reactance, and what governance rules should constrain generative CRM copy?"}
        />
      </Slide>

      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Owned content and CRM channels convert expensive paid acquisition clicks into profitable long-term customer equity by lowering the marginal cost of repeat transactions.",
            "Content strategy maps educational, comparison, risk-reducing, and onboarding formats across the customer journey using structured topic clusters.",
            "CRM systems manage known customer relationships, while Customer Data Platforms (CDPs) ingest real-time behavioral event streams and resolve identity across devices using deterministic first-party data.",
            "Event-driven lifecycle flows (welcome, browse/cart abandonment, post-purchase onboarding, replenishment, and win-back) paired with RFM segmentation vastly outperform unsegmented batch blasts.",
            "Email and push deliverability require technical authentication (SPF, DKIM, DMARC), sender reputation management, and disciplined sunsetting of unengaged contacts.",
            "AI-driven hyper-personalization optimizes channel, timing, and attribute framing at the individual level, but must respect privacy boundaries to avoid surveillance reactance and survive AI inbox filtering.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
