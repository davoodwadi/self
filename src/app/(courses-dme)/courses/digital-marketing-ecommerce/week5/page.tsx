"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Term, Ruled, SlideHeading, Numbered, PartHead, Prompt } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import { TitleAuction, ManualToMoment, BuySellDeadline, AuctionClock, DealAccess, SameSlotDifferentValue, DataProvenance, TargetingScenes, PaidWithoutViewer, VerificationLab, SupplyPath, SeventeenImpressions, BrokenCookieTrail, PrivacyRoutes, CreativeToBlackBox, CreativeAssembler, ReportedVsBank } from "./visuals";

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);
const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week5Page() {
  return (
    <SlideDeck label="Week 05">
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 05 · Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[25ch]">Programmatic Advertising and AdTech Infrastructure</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <Plate className="mt-8 !max-w-4xl !p-2 sm:!p-3">
          <TitleAuction />
        </Plate>
        <p className="type-quote mt-7 max-w-[57ch] !text-[clamp(1.2rem,1.8vw,1.6rem)]">
          Programmatic advertising replaces human media negotiation with{" "}
          <span className="text-[var(--signal)]">millisecond auctions</span> across interconnected demand, supply,
          and customer data platforms.
        </p>
      </Slide>
      <Slide id="from-manual-insertion-orders-to-programmatic-exchanges" border className="!py-8">
        <SlideHeading>From Manual Insertion Orders to Programmatic Exchanges</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>Historically, buying display or video advertising resembled buying print magazine pages, in which human media buyers negotiated contracts (insertion orders) with human publisher sales teams weeks in advance.</P>
            </Ruled>
            <Ruled weight="thin">
              <P>That manual model could not scale to an internet with millions of websites, mobile apps, and connected televisions generating billions of individual ad impressions every hour.</P>
            </Ruled>
            <Ruled weight="thin">
              <P>Programmatic advertising automates the buying, selling, and targeting of digital ad inventory through software protocols and real-time financial auctions.</P>
            </Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>Instead of buying a fixed banner slot on a newspaper website for an entire month regardless of who visits, programmatic systems allow an e-commerce brand to <Term>bid on a single impression shown to a specific user at a specific moment</Term>.</P>
            </Ruled>
            <Plate><ManualToMoment /></Plate>
            <Ruled weight="thin">
              <P>Understanding the AdTech information systems stack is essential because fees, latency, data leakage, and fraud can consume a large share of every advertising dollar along the supply chain.</P>
            </Ruled>
          </div>
        </div>
      </Slide>
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="The Programmatic AdTech Stack and Real-Time Bidding" />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled><p className={BIG}>When a user opens a content website or mobile app that supports programmatic ads, an automated auction takes place behind the scenes in <Term>roughly 100 milliseconds</Term> before the page finishes rendering.</p></Ruled>
            <Ruled><p className={BIG}>This ecosystem separates software that represents advertisers (the buy side) from software that represents publishers (the sell side).</p></Ruled>
          </div>
          <Plate><BuySellDeadline /></Plate>
        </div>
      </Slide>
      <Slide id="dsps-ssps-ad-exchanges-and-the-100-millisecond-rtb-auction" border className="!py-4" exercise={exercise["dsps-ssps-ad-exchanges-and-the-100-millisecond-rtb-auction"]}>
        <SlideHeading className="!mb-5">DSPs, SSPs, Ad Exchanges, and the 100-Millisecond RTB Auction</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="grid content-start gap-2">
            <Numbered n={1}><Ruled weight="thin"><P>Step 1 is the ad request, triggered when a user loads a publisher&apos;s webpage or app and the user&apos;s browser sends an impression call containing context and user identifiers to the publisher&apos;s Supply-Side Platform (SSP).</P></Ruled></Numbered>
            <Numbered n={2}><Ruled weight="thin"><P>Step 2 is the bid request broadcast, in which the SSP packages the available ad slot and user metadata and broadcasts a standardized OpenRTB bid request through an Ad Exchange to connected Demand-Side Platforms (DSPs).</P></Ruled></Numbered>
            <Numbered n={3}><Ruled weight="thin"><P>Step 3 is buy-side valuation and bidding, in which each advertiser&apos;s DSP evaluates the user profile, predicts click or conversion probability, checks budget and frequency caps, and submits a monetary bid response within tens of milliseconds.</P></Ruled></Numbered>
            <Numbered n={4}><Ruled weight="thin"><P>Step 4 is auction clearing and ad serving, in which the exchange and SSP select the winning bid, return the winning advertiser&apos;s ad markup to the user&apos;s browser, and fire tracking pixels to record the impression.</P></Ruled></Numbered>
          </ol>
          <Plate><AuctionClock /></Plate>
        </div>
      </Slide>
      <Slide id="open-exchanges-private-marketplaces-and-programmatic-guaranteed" border className="!py-8" exercise={exercise["open-exchanges-private-marketplaces-and-programmatic-guaranteed"]}>
        <SlideHeading>Open Exchanges, Private Marketplaces, and Programmatic Guaranteed</SlideHeading>
        <div className="grid w-full gap-7 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled weight="thin"><P>On an <Term tone="ink">Open Exchange</Term> (real-time bidding in the open market), any approved advertiser can bid on inventory across thousands of publishers, offering maximum scale and low prices but lower transparency into exact placement context.</P></Ruled>
            <Ruled weight="thin"><P>In a <Term tone="ink">Private Marketplace (PMP)</Term>, a publisher invites a select group of advertisers into a closed auction using a Deal ID, giving brands priority access to premium inventory before it reaches the open exchange.</P></Ruled>
            <Plate><DealAccess /></Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin"><P>In <Term tone="ink">Preferred Deals</Term>, an advertiser gets a fixed-price first look at a publisher&apos;s inventory via programmatic pipes and can choose whether to buy each impression before it falls to the auction.</P></Ruled>
            <Ruled weight="thin"><P>In <Term>Programmatic Guaranteed</Term> (automated direct), the advertiser and publisher agree in advance on a fixed volume of impressions and a fixed price, using programmatic infrastructure to automate audience trafficking and frequency capping without an auction.</P></Ruled>
          </div>
        </div>
      </Slide>
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Audience Data and Behavioral Targeting" />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled><p className={BIG}>The economic premise of programmatic advertising is that <Term>an ad slot is worth different amounts to different advertisers</Term> depending on who is viewing the screen.</p></Ruled>
            <Ruled><p className={BIG}>Marketers combine contextual signals from the page with behavioral identity data to decide how much to bid.</p></Ruled>
          </div>
          <Plate><SameSlotDifferentValue /></Plate>
        </div>
      </Slide>
      <Slide id="first-party-second-party-and-third-party-data-in-ad-targeting" border className="!py-8" exercise={exercise["first-party-second-party-and-third-party-data-in-ad-targeting"]}>
        <SlideHeading>First-Party, Second-Party, and Third-Party Data in Ad Targeting</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin"><P><Term tone="ink">First-party (1P) data</Term> are collected directly by the marketer from its own customers and site visitors with their consent, including CRM purchase records, email lists, app usage, and on-site cart events.</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Second-party (2P) data</Term> are another organization&apos;s first-party data shared directly through a trusted strategic partnership, such as an airline sharing traveler intent data with a partner hotel chain or a retailer sharing category insights with a brand supplier.</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Third-party (3P) data</Term> are aggregated from many external sources by commercial data brokers who do not have a direct relationship with the consumer, sold as pre-packaged demographic or interest segments.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><DataProvenance /></Plate>
            <Ruled weight="thin"><P>First-party data provide the <Term>highest accuracy, deterministic identity, and regulatory durability</Term>, whereas third-party broker segments often suffer from stale inferences, opaque provenance, and tightening privacy restrictions.</P></Ruled>
          </div>
        </div>
      </Slide>
      <Slide id="contextual-targeting-retargeting-and-lookalike-modeling" border className="!py-8">
        <SlideHeading>Contextual Targeting, Retargeting, and Lookalike Modeling</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled weight="thin"><P><Term tone="ink">Contextual targeting</Term> matches ads to the topic, keywords, and sentiment of the webpage or video currently being consumed (e.g., placing a running shoe ad alongside a marathon training article), requiring zero personal user history.</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Behavioral retargeting</Term> (or remarketing) targets users who previously visited the advertiser&apos;s storefront, viewed a specific Product Detail Page, or abandoned a shopping cart, serving dynamic product ads that show the exact SKU left behind.</P></Ruled>
            <Ruled weight="thin"><P>While retargeting often exhibits high apparent conversion rates, uncontrolled retargeting can <Term>waste budget chasing users who already bought the item elsewhere or who would have returned organically</Term>.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><TargetingScenes /></Plate>
            <Ruled weight="thin"><P><Term tone="ink">Lookalike (or actalike) modeling</Term> uses a seed list of the brand&apos;s highest-value first-party customers and trains a machine learning classifier inside a platform to find new prospective users whose behavioral profiles resemble the seed group.</P></Ruled>
          </div>
        </div>
      </Slide>
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Ad Verification, Viewability, Fraud, and Brand Safety" />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled><p className={BIG}>Because open programmatic auctions route ads across millions of third-party websites and apps automatically, advertisers face severe principal-agent and information asymmetry problems.</p></Ruled>
            <Ruled><p className={BIG}>Without independent verification, an advertiser can <Term>pay for millions of impressions that no human ever saw</Term>.</p></Ruled>
          </div>
          <Plate><PaidWithoutViewer /></Plate>
        </div>
      </Slide>
      <Slide id="viewability-invalid-traffic-ad-fraud-and-brand-safety" border className="!py-8" exercise={exercise["viewability-invalid-traffic-ad-fraud-and-brand-safety"]}>
        <SlideHeading>Viewability, Invalid Traffic (Ad Fraud), and Brand Safety</SlideHeading>
        <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled weight="thin"><P><Term tone="ink">Ad viewability</Term> measures whether an ad served into the DOM actually entered the user&apos;s visible screen viewport; under Media Rating Council (MRC) standards, a display ad counts as viewable only if <Term>at least 50 percent of its pixels remain on screen for at least one continuous second</Term> (two seconds for video).</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Invalid Traffic (IVT) and ad fraud</Term> occur when non-human bots, malware hijacks, hidden 1x1 pixel iframes, ad stacking, or spoofed domain names generate fake impressions and clicks to steal advertiser budgets.</P></Ruled>
          </div>
          <div className="grid content-start gap-3">
            <Plate><VerificationLab /></Plate>
            <div className="grid gap-4 md:grid-cols-2">
              <Ruled weight="thin"><P><Term tone="ink">Brand safety and brand suitability controls</Term> prevent a company&apos;s advertisements from appearing adjacent to harmful, illegal, hate-filled, or contextually inappropriate content (such as an airline ad appearing next to news of an aviation accident).</P></Ruled>
              <Ruled weight="thin"><P><Term tone="ink">Frequency capping</Term> limits the maximum number of times the same individual is shown the same advertisement within a day or week, preventing ad wear-out, budget waste, and consumer annoyance.</P></Ruled>
            </div>
          </div>
        </div>
      </Slide>
      <Slide id="the-adtech-tax-and-supply-path-optimization" border className="!py-8">
        <SlideHeading>The &quot;AdTech Tax&quot; and Supply Path Optimization</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin"><P>In complex programmatic chains, multiple intermediaries (agency trading desks, DSPs, data providers, verification vendors, exchanges, and SSPs) each deduct a fee between the advertiser&apos;s dollar and the publisher&apos;s net payout.</P></Ruled>
            <Ruled weight="thin"><P>Industry audits by advertising associations have shown that intermediary fees and unattributed discrepancies, often called the &quot;AdTech tax,&quot; can absorb <Term>30 to 50 percent of open-web programmatic spend</Term>.</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Supply Path Optimization (SPO)</Term> is the practice by which advertisers audit and consolidate the SSPs and exchanges they bid through, cutting out redundant resellers to establish the most direct, transparent, and lowest-fee path to publisher inventory.</P></Ruled>
          </div>
          <Plate><SupplyPath /></Plate>
        </div>
      </Slide>
      <Slide id="discussion-retargeting-or-stalking" border className="!py-8">
        <SlideHeading>Retargeting or Stalking?</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate><SeventeenImpressions /></Plate>
          <Prompt className="[&_p]:!text-[clamp(1.05rem,1.55vw,1.35rem)] [&_p>span:first-child]:!inline [&_p>span:first-child]:!mb-0 [&_p>span:first-child]:!mr-3 [&_p>span:first-child]:!text-[0.8rem] [&_p>span:first-child]:!leading-normal">A consumer browses a pair of winter boots on an online shoe store, decides not to buy them, and then sees dynamic banner ads for those exact boots <Term>seventeen times over the next forty-eight hours</Term> across news sites, weather apps, and recipe blogs, including three days after buying a different pair at a local mall. Analyze this scenario from both an AdTech mechanics perspective and a marketing effectiveness perspective. Why did this happen, how does it affect brand equity and incremental ROAS, and what DSP controls should the marketer configure?</Prompt>
        </div>
      </Slide>
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="The Post-Cookie Transition and Privacy-Preserving AdTech" />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled><p className={BIG}>For two decades, cross-site behavioral targeting and attribution relied on third-party HTTP cookies and mobile device advertising identifiers (such as Apple&apos;s IDFA).</p></Ruled>
            <Ruled><p className={BIG}>Browser restrictions, operating system opt-in prompts (such as Apple&apos;s App Tracking Transparency), and privacy statutes have <Term>dismantled unrestricted cross-site tracking</Term>.</p></Ruled>
          </div>
          <Plate><BrokenCookieTrail /></Plate>
        </div>
      </Slide>
      <Slide id="navigating-signal-loss-with-clean-rooms-conversion-apis-and-contextual-ai" border className="!py-8" exercise={exercise["navigating-signal-loss-with-clean-rooms-conversion-apis-and-contextual-ai"]}>
        <SlideHeading>Navigating Signal Loss with Clean Rooms, Conversion APIs, and Contextual AI</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled weight="thin"><P><Term tone="ink">Signal loss</Term> refers to the degradation of cross-site user identification, which shrinks retargeting pools, breaks frequency capping across domains, and blinds client-side pixel attribution.</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Server-Side Conversion APIs (CAPI)</Term> replace fragile browser third-party pixels by sending consented first-party purchase events directly from the merchant&apos;s commerce server to the advertising platform&apos;s server.</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Data Clean Rooms</Term> are secure, cryptographic computing environments in which a brand and a media platform (or retailer) join their respective first-party datasets to measure overlap and lift without either party exposing raw, row-level personal identifiers to the other.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><PrivacyRoutes /></Plate>
            <Ruled weight="thin"><P><Term tone="ink">Modern Contextual AI</Term> uses large language and vision models to analyze the granular frame-by-frame meaning, tone, and product suitability of webpage or video content in real time, delivering high relevance without tracking individual users across the web.</P></Ruled>
          </div>
        </div>
      </Slide>
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Generative AI and Autonomous Media Buying" />
        <div className="mt-7 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled><p className={BIG}>As cross-site tracking signals tighten, creative quality and algorithmic portfolio optimization have become the primary levers of paid media performance.</p></Ruled>
            <Ruled><p className={BIG}>Platforms increasingly bundle targeting, bidding, and creative assembly into <Term>end-to-end automated campaign suites</Term>.</p></Ruled>
          </div>
          <Plate><CreativeToBlackBox /></Plate>
        </div>
      </Slide>
      <Slide id="dynamic-creative-optimization-and-autonomous-campaign-suites" border className="!py-8">
        <SlideHeading>Dynamic Creative Optimization and Autonomous Campaign Suites</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid content-start gap-3">
            <Ruled weight="thin"><P><Term tone="ink">Dynamic Creative Optimization (DCO)</Term> assembles personalized ad variations on the fly by combining modular headlines, product images, prices, and calls to action from a product feed based on the viewer&apos;s context or segment.</P></Ruled>
            <Ruled weight="thin"><P>Generative AI extends DCO by generating background scenes, adapting aspect ratios across placements, translating copy, and tailoring value propositions to distinct buyer personas, subject to brand-safety and disclosure governance.</P></Ruled>
            <Ruled weight="thin"><P><Term tone="ink">Autonomous cross-channel campaign systems</Term> (such as Meta Advantage+ and Google Performance Max) replace manual audience segmenting with goal-based optimization, where the marketer supplies creative assets, a product catalog feed, and a margin-adjusted conversion value target.</P></Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Plate><CreativeAssembler /></Plate>
            <Ruled weight="thin"><P>In these black-box campaign systems, the marketer&apos;s role shifts from pulling manual bidding levers to feeding accurate first-party conversion profit signals and auditing whether the algorithm is buying <Term>incremental new customers or merely harvesting existing buyers</Term>.</P></Ruled>
          </div>
        </div>
      </Slide>
      <Slide id="discussion-trusting-the-black-box-ad-campaign" border className="!py-8">
        <SlideHeading>Trusting the Black-Box Ad Campaign</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <Plate><ReportedVsBank /></Plate>
          <Prompt className="[&_p]:!text-[clamp(1.05rem,1.55vw,1.35rem)] [&_p>span:first-child]:!inline [&_p>span:first-child]:!mb-0 [&_p>span:first-child]:!mr-3 [&_p>span:first-child]:!text-[0.8rem] [&_p>span:first-child]:!leading-normal">An e-commerce skincare brand switches its programmatic and social budget into an automated AI campaign suite that promises to find conversions across display, video, search, and shopping placements automatically. Within a month, reported conversions double and cost per acquisition drops by 40 percent, yet the company&apos;s <Term>total warehouse orders and bank revenue grow by only 4 percent</Term>. What programmatic and attribution mechanisms explain the gap between the platform&apos;s reported conversions and total business revenue, and how can the brand verify what the black-box campaign is actually buying?</Prompt>
        </div>
      </Slide>
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Programmatic advertising automates media buying through Demand-Side Platforms (DSPs), Supply-Side Platforms (SSPs), and Ad Exchanges executing real-time bidding (RTB) auctions in under 100 milliseconds.",
            "Transaction structures range from high-scale Open Exchanges to curated Private Marketplaces (PMPs), Preferred Deals, and fixed-volume Programmatic Guaranteed contracts.",
            "Targeting relies on first-, second-, and third-party data across contextual, retargeting, and lookalike strategies, with first-party data offering the highest accuracy and privacy resilience.",
            "Advertisers guard against market failures in programmatic supply chains by enforcing MRC viewability standards, invalid traffic (ad fraud) filtering, brand safety rules, frequency caps, and Supply Path Optimization.",
            "As third-party cookies and mobile tracking IDs deprecate, marketers preserve measurement and targeting through Server-Side Conversion APIs, cryptographic Data Clean Rooms, and Contextual AI.",
            "Dynamic Creative Optimization and autonomous AI campaign suites automate asset assembly and bidding, requiring marketers to govern them with profit-weighted first-party signals and incrementality audits.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0"><Numbered n={i + 1}><Ruled weight="thin"><P>{takeaway}</P></Ruled></Numbered></li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
