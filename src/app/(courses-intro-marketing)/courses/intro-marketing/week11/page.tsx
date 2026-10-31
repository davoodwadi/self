"use client";

import React from "react";
import {
  SlideDeck,
  Slide,
  Title,
} from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import {
  Big,
  Lead,
  Numbered,
  P,
  PartHead,
  Plate,
  Prompt,
  Ruled,
  SlideHeading,
  Statement,
  Term,
  TIGHT,
  Tint,
} from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AgentRankAndLabels,
  OwnedPaidEarned,
  SeoVsSemSerp,
  TenLinksToAiAnswers,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 11: DIGITAL AND SOCIAL MEDIA MARKETING
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week11() {
  return (
    <SlideDeck label="Week 11">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">Week 11</p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">Digital and Social Media Marketing</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Digital and social media marketing connect brands with customers
              through{" "}
              <Tint>interactive owned, paid, and earned channels</Tint>, while
              the rise of conversational AI answers and shopping agents reshapes
              search visibility and sponsored placements.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Digital and Direct Marketing
          ================================================================ */}
      <Slide className={TIGHT} id="defining-digital-and-direct-marketing" border>
        <SlideHeading>Defining Digital and Direct Marketing</SlideHeading>
        <Statement>
          <Term>Direct and digital marketing</Term> involves engaging directly
          with carefully targeted individual consumers and customer communities
          to both obtain an immediate response and build lasting customer
          relationships.
        </Statement>
        <Lead className="mt-6">
          For most companies today, direct and digital marketing are not merely
          supplementary promotion channels, but a{" "}
          <Tint>complete model for doing business</Tint> and interacting with
          buyers.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Digital marketing</Term> uses electronic devices, the
              internet, mobile networks, and connected applications to reach
              buyers wherever they work, shop, and socialize.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Because digital interactions are logged at the{" "}
              <Term>individual session level</Term>, marketers can track
              audience responses in real time and adjust creative messages,
              targeting, and budgets continuously.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Shift from One-Way Broadcast to Two-Way Interactive Engagement
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-shift-from-one-way-broadcast-to-two-way-interactive-engagement"
        border
      >
        <SlideHeading>
          The Shift from One-Way Broadcast to Two-Way Interactive Engagement
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <Ruled>
            <Lead>
              Traditional mass marketing relied on{" "}
              <Term>one-way broadcast communication</Term>: the firm designed a
              uniform message and projected it via television, radio, or print
              to a passive mass audience.
            </Lead>
          </Ruled>
          <Ruled>
            <Lead>
              Digital and social media marketing shifts communication to an{" "}
              <Term>interactive, two-way dialogue</Term> in which consumers
              actively search for information, ask questions, post public
              product reviews, and share brand content with peers.
            </Lead>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              In this interactive environment, consumers exercise{" "}
              <Tint>substantial control</Tint> over which commercial messages
              they view, skip, block, or amplify.
            </P>
          </Ruled>
          <Ruled>
            <Statement>
              Effective digital marketing therefore focuses on{" "}
              <Term>customer-initiated attraction</Term> and{" "}
              <Term>permission-based engagement</Term> rather than intrusive
              interruption alone.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: The Digital Marketing Ecosystem
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-the-digital-marketing-ecosystem"
        border
      >
        <PartHead n={1} title="The Digital Marketing Ecosystem" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            A modern digital strategy coordinates three interconnected media
            categories: <Term>owned media</Term>, <Term>paid media</Term>, and{" "}
            <Term>earned media</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Balancing these three media pillars across desktop and mobile
              touchpoints creates a{" "}
              <Tint>resilient digital acquisition and retention funnel</Tint>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Owned, Paid, and Earned Digital Media
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="owned-paid-and-earned-digital-media"
        border
        exercise={exercise["owned-paid-and-earned-digital-media"]}
      >
        <SlideHeading>Owned, Paid, and Earned Digital Media</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1.55fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Numbered n={1}>
              <P>
                <Term>Owned media</Term> consist of digital properties that the
                brand controls directly, including its corporate website,
                e-commerce storefront, mobile application, blog, and opted-in
                email subscriber list.
              </P>
            </Numbered>
            <Numbered n={2}>
              <P>
                <Term>Paid media</Term> consist of external digital placements
                for which the brand pays to acquire reach and traffic, including
                paid search advertisements, programmatic display banners, paid
                social-media promotions, and paid influencer sponsorships.
              </P>
            </Numbered>
            <Numbered n={3}>
              <P>
                <Term>Earned media</Term> consist of organic exposure generated
                voluntarily by consumers, journalists, and independent creators
                through customer reviews, social shares, forum recommendations,
                and press coverage.
              </P>
            </Numbered>
          </div>
          <Plate wide>
            <OwnedPaidEarned />
          </Plate>
        </div>
        <Ruled className="mt-6">
          <Lead>
            Owned media build <Term>long-term customer equity</Term> at low
            marginal cost, paid media provide{" "}
            <Tint>immediate scalable traffic</Tint> for new launches, and earned
            media supply the <Term>third-party credibility</Term> that converts
            skeptical prospects.
          </Lead>
        </Ruled>
      </Slide>

      {/* ================================================================
          Websites, Landing Pages, and Conversion Optimization
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="websites-landing-pages-and-conversion-optimization"
        border
      >
        <SlideHeading>
          Websites, Landing Pages, and Conversion Optimization
        </SlideHeading>
        <Lead>
          For most organizations, the first step in conducting digital marketing
          is creating a <Term>brand website</Term> or{" "}
          <Term>storefront</Term> that serves as the central destination for
          owned, paid, and earned traffic.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Whereas a <Term>corporate brand website</Term> builds general
              goodwill and answers stakeholder questions, an e-commerce or{" "}
              <Term>campaign landing page</Term> is engineered to guide visitors
              toward a specific <Term>conversion action</Term>, such as
              completing a purchase, booking a demo, or subscribing to a
              newsletter.
            </P>
          </Ruled>
          <Ruled>
            <P>
              To attract repeat visitors and minimize <Term>bounce rates</Term>,
              marketers focus on clear navigation, fast page loading speeds,
              transparent pricing, and frictionless checkout flows.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Marketers continuously refine digital pages through{" "}
              <Term>randomized A/B testing</Term>, comparing two versions of a
              headline, product layout, or call-to-action button on live visitor
              traffic to measure which design yields a higher{" "}
              <Term>conversion rate</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Mobile Marketing and Omnichannel Integration
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="mobile-marketing-and-omnichannel-integration"
        border
      >
        <SlideHeading>Mobile Marketing and Omnichannel Integration</SlideHeading>
        <Statement>
          <Term>Mobile marketing</Term> features marketing messages,
          promotions, and other content delivered to on-the-go consumers
          through their smartphones and wearable devices.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Because smartphones accompany consumers throughout the day,
              mobile channels allow brands to deliver{" "}
              <Tint>time-sensitive, location-aware information</Tint> and
              immediate one-tap payment options.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Shoppers frequently use mobile devices inside{" "}
              <Term>physical retail aisles</Term> to look up product ratings,
              compare competitor prices, and redeem digital loyalty rewards.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Designing <Term>mobile-first interfaces</Term> ensures that
              product specifications, reviews, and checkout buttons remain
              legible and responsive on small screens.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Search, Content, and Email Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-search-content-and-email-marketing"
        border
      >
        <PartHead n={2} title="Search, Content, and Email Marketing" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            <Term>Search engines</Term>, <Term>content libraries</Term>, and{" "}
            <Term>email campaigns</Term> form the workhorse channels of digital
            customer acquisition and retention.
          </Statement>
          <Ruled>
            <Lead>
              Comparing organic search optimization with paid search advertising
              and permission-based email clarifies how firms balance{" "}
              <Tint>short-term sales with long-term organic equity</Tint>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Search Engine Optimization (SEO) Versus Search Engine Marketing (SEM)
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="search-engine-optimization-seo-versus-search-engine-marketing-sem"
        border
        exercise={
          exercise[
            "search-engine-optimization-seo-versus-search-engine-marketing-sem"
          ]
        }
      >
        <SlideHeading>
          Search Engine Optimization (SEO) Versus Search Engine Marketing (SEM)
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                <Term>Search Engine Optimization (SEO)</Term> is the practice of
                structuring web pages, technical metadata, site speed, and
                authoritative content so a brand ranks highly in unpaid
                (organic) search engine results when users query relevant
                topics.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Search engines rank organic pages based on relevance to the
                user&apos;s <Term>query intent</Term>,{" "}
                <Term>technical crawlability</Term>, and{" "}
                <Term>domain authority</Term> (signaled by reputable external
                websites linking to the page).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <SeoVsSemSerp />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Search Engine Marketing (SEM)</Term>, often called{" "}
              <Term>paid search</Term> or{" "}
              <Term>pay-per-click (PPC) advertising</Term>, involves bidding on
              specific keywords in real-time ad auctions so a sponsored text or
              product listing appears above or beside organic search results.
            </P>
          </Ruled>
          <Ruled>
            <P>
              SEM delivers <Tint>immediate, predictable visibility</Tint> as
              soon as a campaign budget is turned on (and stops the moment
              spending stops), whereas SEO requires months of sustained content
              investment but compounds into{" "}
              <Tint>durable, high-trust traffic</Tint> without a per-click ad
              fee.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Content Marketing Strategy
          ================================================================ */}
      <Slide className={TIGHT} id="content-marketing-strategy" border>
        <SlideHeading>Content Marketing Strategy</SlideHeading>
        <Statement>
          <Term>Content marketing</Term> is the strategic creation and
          distribution of valuable, relevant, and consistent content (such as
          educational guides, comparison articles, how-to videos, webinars, and
          interactive calculators) to attract and retain a clearly defined
          audience.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Rather than pitching a product directly in every message, content
              marketing solves practical problems that target buyers research
              during the early <Term>need-recognition</Term> and{" "}
              <Term>information-search</Term> stages of their journey.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A home-improvement retailer that publishes step-by-step
              tile-installation videos and mortar calculators builds{" "}
              <Tint>authority and trust</Tint> with homeowners, who then
              purchase the required tools and materials from that retailer.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              High-quality educational content also fuels both{" "}
              <Term>organic SEO rankings</Term> and{" "}
              <Term>social media sharing</Term>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Permission-Based Email Marketing and Lifecycle Automation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="permission-based-email-marketing-and-lifecycle-automation"
        border
        exercise={
          exercise["permission-based-email-marketing-and-lifecycle-automation"]
        }
      >
        <SlideHeading>
          Permission-Based Email Marketing and Lifecycle Automation
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <Lead>
              <Term>Email marketing</Term> remains one of the highest-return
              digital channels because it reaches an{" "}
              <Term>opted-in audience</Term> directly without paying an
              intermediary platform for each impression.
            </Lead>
          </Ruled>
          <Ruled>
            <Lead>
              Effective email marketing relies on <Term>segmentation</Term> and{" "}
              <Term>behavioral lifecycle automation</Term> rather than blasting
              identical promotional flyers to an entire mailing list.
            </Lead>
          </Ruled>
          <Ruled>
            <P>
              <Term>Automated lifecycle triggers</Term> send timely, relevant
              messages based on a customer&apos;s specific actions: a welcome
              sequence after account creation, a helpful reminder after an
              abandoned shopping cart, a care guide after product delivery, or a
              replenishment prompt when a consumable item is due to run out.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, sending unsolicited commercial email (<Term>spam</Term>)
              violates anti-spam laws (such as <Term>CAN-SPAM</Term> in the
              United States and <Term>CASL</Term> in Canada), triggers spam
              filters, and damages brand reputation.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Allocating a Startup Budget Across Paid Search, SEO Content, and Email
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-allocating-a-startup-budget-across-paid-search-seo-content-and-email"
        border
      >
        <SlideHeading kicker="Discussion:">
          Allocating a Startup Budget Across Paid Search, SEO Content, and Email
        </SlideHeading>
        <Prompt>
          A direct-to-consumer ergonomic desk manufacturer has a 15,000-dollar
          monthly digital marketing budget and needs both immediate
          first-quarter sales to pay suppliers and lower customer acquisition
          costs over the next two years. Using SEO, SEM (pay-per-click), content
          marketing, and permission-based email automation, design a phased
          allocation of the budget and explain how each channel supports the
          others across the customer journey.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Leveraging Social Media for Customer Engagement
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-leveraging-social-media-for-customer-engagement"
        border
      >
        <PartHead
          n={3}
          title="Leveraging Social Media for Customer Engagement"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            <Term>Social media</Term> are independent and commercial online
            communities where people congregate to socialize and share messages,
            opinions, pictures, videos, and other content.
          </Statement>
          <Ruled>
            <Lead>
              Marketers participate in social networks to{" "}
              <Tint>build brand communities</Tint>, listen to customer
              sentiment, and partner with credible creators.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Social Media Platforms, Demographics, and Use Cases
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="social-media-platforms-demographics-and-use-cases"
        border
        exercise={exercise["social-media-platforms-demographics-and-use-cases"]}
      >
        <SlideHeading>
          Social Media Platforms, Demographics, and Use Cases
        </SlideHeading>
        <Lead>
          Rather than treating social media as a single uniform channel,
          marketers match their content formats and objectives to the{" "}
          <Tint>distinct demographics and usage norms</Tint> of each platform.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Visual discovery</Term> and lifestyle platforms (such as
              Instagram and Pinterest) excel at showcasing aesthetics, fashion,
              food, and home design during early inspiration and consideration.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Short-form video platforms</Term> (such as TikTok and
              YouTube Shorts) rely on <Term>algorithmic interest graphs</Term>{" "}
              rather than follower graphs alone, enabling rapid organic reach
              and product demonstrations among younger and mainstream audiences.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Professional networks</Term> (such as LinkedIn) are
              essential for B2B thought leadership, executive networking, and
              account-based marketing, while <Term>discussion forums</Term>{" "}
              (such as Reddit) host detailed peer product evaluations.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Building Customer Engagement and Social Listening
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="building-customer-engagement-and-social-listening"
        border
      >
        <SlideHeading>
          Building Customer Engagement and Social Listening
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Because social media are interactive, using them solely to
              broadcast one-way sales announcements generates{" "}
              <Tint>low engagement</Tint>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Successful brands foster genuine <Term>customer engagement</Term>{" "}
              by creating shareable stories, responding promptly and helpfully
              to customer service inquiries in public threads, and encouraging{" "}
              <Term>user-generated content (UGC)</Term> from real buyers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Social listening</Term> is the systematic monitoring of
              digital conversations across social networks, forums, and review
              sites to understand what customers are saying about a brand, its
              competitors, and its industry.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Unfiltered social listening helps marketers detect{" "}
              <Tint>emerging product defects or service crises</Tint> early,
              uncover unmet customer use cases, and adopt the natural vocabulary
              buyers use to describe their problems.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Influencer Marketing and Creator Partnerships
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="influencer-marketing-and-creator-partnerships"
        border
      >
        <SlideHeading>
          Influencer Marketing and Creator Partnerships
        </SlideHeading>
        <Statement>
          <Term>Influencer marketing</Term> involves partnering with individuals
          who have built a dedicated social following and are viewed as
          knowledgeable or relatable <Term>opinion leaders</Term> within a
          specific niche.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Macro-influencers</Term> and celebrities offer massive broad
              reach for awareness campaigns, whereas{" "}
              <Term>micro-influencers</Term> (with smaller, highly focused
              audiences) frequently generate higher engagement rates and
              stronger purchase conversion because followers view their
              recommendations as authentic peer advice.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In accordance with the <Term>match-up hypothesis</Term>,
              influencer partnerships succeed only when the creator&apos;s
              expertise and values align naturally with the product category.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Consumer protection agencies require both brands and creators to
              disclose <Term>material connections</Term> clearly (for example,
              using prominent <Term>#Ad</Term> or{" "}
              <Term>Paid Partnership</Term> labels) so audiences are not
              deceived into mistaking paid promotions for independent reviews.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Measuring Digital ROI and Protecting Consumer Privacy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-measuring-digital-roi-and-protecting-consumer-privacy"
        border
      >
        <PartHead
          n={4}
          title="Measuring Digital ROI and Protecting Consumer Privacy"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Although digital channels generate abundant metrics, translating
            clicks and impressions into <Tint>true incremental profit</Tint>{" "}
            requires disciplined attribution and privacy governance.
          </Statement>
          <Ruled>
            <Lead>
              Marketers must separate <Term>vanity metrics</Term> from
              actionable business outcomes while respecting data protection
              laws.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Digital Metrics and Conversion Attribution
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="digital-metrics-and-conversion-attribution"
        border
        exercise={exercise["digital-metrics-and-conversion-attribution"]}
      >
        <SlideHeading>Digital Metrics and Conversion Attribution</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Numbered n={1}>
            <P>
              Digital platforms report dozens of performance indicators across
              the funnel: <Term>impressions</Term> (total views),{" "}
              <Term>click-through rate</Term> (clicks divided by impressions),{" "}
              <Term>cost per click (CPC)</Term>, <Term>conversion rate</Term>{" "}
              (purchases divided by clicks),{" "}
              <Term>customer acquisition cost (CAC)</Term>, and{" "}
              <Term>return on ad spend</Term> (ROAS).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              A common pitfall in social and digital reporting is optimizing for{" "}
              <Term>vanity metrics</Term>, such as raw follower counts, video
              views, or post likes, that look impressive on a slide but do not
              correlate with actual sales or retention.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Because a single customer may see a social video, read a blog
              post, and click a paid brand search link before buying, marketers
              use <Term>attribution modeling</Term> (such as first-touch,
              last-touch, or multi-touch attribution) to assign credit across
              touchpoints.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              To measure true <Term>causal incrementality</Term> rather than
              mere correlation, analytics teams run{" "}
              <Term>randomized holdout experiments</Term> that compare
              conversion rates with and without the digital campaign.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Digital Privacy Regulations and the Shift to First-Party Data
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="digital-privacy-regulations-and-the-shift-to-first-party-data"
        border
      >
        <SlideHeading>
          Digital Privacy Regulations and the Shift to First-Party Data
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <Lead>
              Digital targeting historically relied heavily on{" "}
              <Term>third-party cookies</Term> and cross-app tracking
              identifiers that followed users silently across unrelated
              websites.
            </Lead>
          </Ruled>
          <Ruled>
            <P>
              Growing consumer concern over surveillance and strict privacy
              laws, including the European Union&apos;s{" "}
              <Term>General Data Protection Regulation</Term> (GDPR) and state
              privacy laws in North America, have restricted non-consensual
              third-party tracking.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Major web browsers and mobile operating systems have likewise
              deprecated third-party cookies and mandated{" "}
              <Term>explicit opt-in</Term> tracking prompts.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Forward-looking marketers are replacing opaque third-party
              tracking with transparent <Term>first-party data</Term>{" "}
              strategies built on direct customer accounts, loyalty programs,
              and <Term>contextual advertising</Term> that matches ads to page
              content rather than personal surveillance profiles.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Ethical Boundaries in Behavioral Targeting and Personalization
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="ethical-boundaries-in-behavioral-targeting-and-personalization"
        border
      >
        <SlideHeading>
          Ethical Boundaries in Behavioral Targeting and Personalization
        </SlideHeading>
        <Statement>
          Even when data collection complies with statutory law, aggressive{" "}
          <Term>behavioral profiling</Term> can cross ethical boundaries and
          alienate customers.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Retargeting ads</Term> that follow a shopper across dozens
              of websites after a single product view often trigger feelings of{" "}
              <Term>surveillance and reactance</Term> rather than goodwill.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Targeting <Term>vulnerable consumers</Term> based on inferred
              financial distress, health anxieties, or compulsive habits
              violates marketing ethics and damages long-term brand trust.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Giving consumers clear <Term>preference centers</Term> to view,
              edit, or delete their stored profile data builds durable trust
              alongside personalized convenience.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: From Search Engines to AI Answers and Agent Rankings
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-from-search-engines-to-ai-answers-and-agent-rankings"
        border
      >
        <PartHead
          n={5}
          title="From Search Engines to AI Answers and Agent Rankings"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Search behavior is undergoing a structural shift as consumers ask{" "}
            <Term>conversational AI assistants</Term> for synthesized answers
            and delegate shopping searches to{" "}
            <Term>autonomous AI agents</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Empirical research on how AI agents process{" "}
              <Tint>ranked lists and sponsorship disclosures</Tint> shows how
              both organic search and paid search are changing.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          From Ten Blue Links to Conversational AI Answers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="from-ten-blue-links-to-conversational-ai-answers"
        border
      >
        <SlideHeading>
          From Ten Blue Links to Conversational AI Answers
        </SlideHeading>
        <div className="mb-6 w-full">
          <Plate wide>
            <TenLinksToAiAnswers />
          </Plate>
        </div>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              For two decades, digital search followed a consistent pattern: a
              consumer typed a short keyword phrase into a search engine,
              received a page of links, and clicked through to visit individual
              brand websites.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Increasingly, consumers ask conversational AI assistants complete
              questions and receive a single synthesized answer and product
              recommendation list directly inside the chat interface, often
              without clicking out to external websites (<Term>zero-click search</Term>).
            </P>
          </Ruled>
          <Ruled>
            <P>
              In this environment, brand visibility depends on whether the AI
              system retrieves and cites the brand&apos;s content when
              constructing its answer, a discipline sometimes called{" "}
              <Term>generative engine optimization (GEO)</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Clear, factual, well-structured documentation, authoritative
              third-party reviews, and consistent <Term>schema markup</Term>{" "}
              help a brand earn inclusion in both traditional organic search
              results and AI-generated answers.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          List Position Effects When AI Agents Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="list-position-effects-when-ai-agents-search"
        border
        exercise={exercise["list-position-effects-when-ai-agents-search"]}
      >
        <SlideHeading>List Position Effects When AI Agents Search</SlideHeading>
        <Lead>
          When an <Term>AI shopping agent</Term> searches an online marketplace
          or search engine on a consumer&apos;s behalf, the agent reads{" "}
          <Term>ranked product lists</Term> rather than browsing a physical
          store shelf.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              One might assume that a software agent evaluates every item on a
              page equally regardless of rank order, but empirical studies
              demonstrate the opposite (Wadi &amp; Ma, 2026a).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Controlled experiments show that AI shopping agents exhibit strong{" "}
              <Term>position effects</Term>: agents favor options simply because
              of where they appear in a ranked list, even when objective product
              attributes and prices are held constant (Wadi &amp; Ma, 2026a).
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Securing <Term>top rank placement</Term> in marketplace search
              feeds and structured data indices therefore remains critical when
              the searcher is an AI agent rather than a human shopper (Wadi
              &amp; Ma, 2026a).
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Sponsored Labels and Paid Placements in Agent-Mediated Search
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sponsored-labels-and-paid-placements-in-agent-mediated-search"
        border
        exercise={
          exercise[
            "sponsored-labels-and-paid-placements-in-agent-mediated-search"
          ]
        }
      >
        <SlideHeading>
          Sponsored Labels and Paid Placements in Agent-Mediated Search
        </SlideHeading>
        <div className="mb-6 w-full">
          <Plate wide>
            <AgentRankAndLabels />
          </Plate>
        </div>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Paid search placements</Term> and{" "}
              <Term>retail media ads</Term> now reach AI shopping agents
              alongside human consumers, raising the question of how agents
              react to <Term>disclosure labels</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In human search, regulators require paid listings to carry clear
              labels so shoppers can distinguish paid ads from organic rankings.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When AI agents evaluate ranked product lists, the exact wording of
              the disclosure label significantly alters agent choice: AI agents
              chose a paid listing less often when it was labeled
              &quot;Sponsored&quot; than when the identical paid listing was
              labeled &quot;Promoted&quot; (Wadi &amp; Ma, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Digital marketers bidding on retail media placements and policy
              makers standardizing ad disclosures must therefore account for how
              AI agents interpret <Term>sponsorship labels</Term> (Wadi &amp;
              Ma, 2026c).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Adapting Search and Paid Media Strategy for AI Shopping Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-adapting-search-and-paid-media-strategy-for-ai-shopping-agents"
        border
      >
        <SlideHeading kicker="Discussion:">
          Adapting Search and Paid Media Strategy for AI Shopping Agents
        </SlideHeading>
        <Prompt>
          An online travel and outdoor-gear retailer spends 60 percent of its
          digital budget bidding on paid search placements labeled
          &quot;Sponsored&quot; or &quot;Promoted&quot; and 40 percent on SEO
          blog articles written for human keyword searches. Drawing on
          conversational AI answers, list position effects in AI agents (Wadi
          &amp; Ma, 2026a), and the differential impact of &quot;Sponsored&quot;
          versus &quot;Promoted&quot; labels on AI agent choice (Wadi &amp; Ma,
          2026c), how should the retailer audit and adjust its search content
          and paid placement strategy as more customers shop through AI
          assistants?
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Numbered n={1}>
            <P>
              Digital and social media marketing shift customer communication
              from one-way mass broadcasting to interactive, measurable, two-way
              engagement across desktop and mobile devices.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              A balanced digital ecosystem integrates owned media (websites,
              apps, and email lists), paid media (search and display ads), and
              earned media (organic reviews, shares, and press mentions).
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Search Engine Optimization (SEO) builds long-term organic
              visibility through relevant content and site authority, whereas
              Search Engine Marketing (SEM) buys immediate top-of-page
              visibility through keyword auctions, complemented by educational
              content marketing and lifecycle email automation.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Social media strategy matches content to platform-specific
              demographics and norms, combining community engagement, social
              listening, and transparently disclosed influencer partnerships.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Digital performance evaluation prioritizes incremental conversion
              attribution and return on ad spend over vanity metrics, while
              privacy regulations and browser changes shift targeting toward
              consented first-party data.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              As search moves from keyword links to conversational AI answers
              and delegated AI shopping agents, visibility depends on structured
              factual content, list rank position because AI agents exhibit
              position effects (Wadi &amp; Ma, 2026a), and sponsorship label
              wording because AI agents penalize listings labeled
              &quot;Sponsored&quot; more than those labeled &quot;Promoted&quot;
              (Wadi &amp; Ma, 2026c).
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}

