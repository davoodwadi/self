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
import {
  FiveAdaptationStrategies,
  LinearVsCircularEconomy,
  MarketEntryModes,
  PrincipalAgentTriangle,
  SixMajorDecisions,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 12: GLOBAL MARKETING AND THE FUTURE OF MARKETING
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
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">Week 12</p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Global Marketing and the Future of Marketing
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Global marketing requires{" "}
              <Tint>
                evaluating international environments, selecting market entry
                modes, and balancing standardization with local adaptation
              </Tint>
              , while the future of marketing is shaped by sustainability,
              immersive technologies, and the question of whose interests AI
              shopping agents are built to serve.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Marketing in a Globalized Economy
          ================================================================ */}
      <Slide className={TIGHT} id="marketing-in-a-globalized-economy" border>
        <SlideHeading>Marketing in a Globalized Economy</SlideHeading>
        <Lead>
          Today, almost every firm, large or small, is touched in some way by
          global competition: a neighborhood florist buys roses imported from
          Ecuador, an electronics retailer sources components from East Asia,
          and a domestic software startup competes immediately with global
          rivals online.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              A <Term>global firm</Term> is one that, by operating in more than
              one country, gains research and development, production,
              marketing, and financial advantages in its costs and reputation
              that are not available to purely domestic competitors.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Going global is not a risk-free mandate for every business: a
              company that operates well domestically may still struggle abroad
              if it fails to understand foreign regulations, distribution
              networks, and cultural norms.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              International marketing management therefore follows a disciplined
              sequence of <Term>six major decisions</Term>: looking at the
              global marketing environment, deciding whether to go global,
              deciding which markets to enter, deciding how to enter the market,
              deciding on the global marketing program, and deciding on the
              global marketing organization.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Six Major Decisions in International Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="six-major-decisions-in-international-marketing"
        border
      >
        <SlideHeading>
          Six Major Decisions in International Marketing
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Before expanding across borders, managers must first understand
              the <Term>international trade system</Term> and the economic,
              political-legal, and cultural environments of prospective country
              markets.
            </Lead>
            <Ruled>
              <P>
                Next, the firm weighs the growth opportunities of international
                expansion against currency volatility, political instability,
                and administrative complexity to decide whether to go global and
                which specific markets offer the highest return on investment.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Once target countries are chosen, management selects a{" "}
                <Term>market entry mode</Term> (exporting, joint venturing, or
                direct investment) that matches its capital resources and
                desired control.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Finally, the firm determines how far to standardize or adapt its
                Product, Price, Place, and Promotion mix for local buyers and
                structures its <Term>global marketing organization</Term>.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <SixMajorDecisions />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Assessing the Global Marketing Environment
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-assessing-the-global-marketing-environment"
        border
      >
        <PartHead n={1} title="Assessing the Global Marketing Environment" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            When selling in another country, a marketer faces{" "}
            <Tint>
              trade restrictions, economic structures, legal frameworks, and
              cultural traditions
            </Tint>{" "}
            that differ markedly from the home market.
          </Statement>
          <Ruled>
            <Lead>
              Evaluating these environmental dimensions prevents costly blunders
              in market selection and positioning.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The International Trade System and Trade Barriers
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-international-trade-system-and-trade-barriers"
        border
        exercise={exercise["the-international-trade-system-and-trade-barriers"]}
      >
        <SlideHeading>
          The International Trade System and Trade Barriers
        </SlideHeading>
        <Lead>
          Companies looking abroad must start by understanding the{" "}
          <Term>international trade system</Term> and the restrictions that
          governments place on trade between nations.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Numbered n={1}>
            <P>
              A <Term>tariff</Term> is a tax levied by a foreign government
              against certain imported products, designed either to raise
              revenue or to protect domestic firms.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              A <Term>quota</Term> sets limits on the amount of foreign imports
              that a country will accept in certain product categories to
              conserve foreign exchange and protect local industry and
              employment.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Governments may also impose <Term>exchange controls</Term>{" "}
              (limiting the amount of foreign exchange and the exchange rate
              against other currencies) and{" "}
              <Term>nontariff trade barriers</Term> (such as biases against
              foreign company bids or restrictive product standards).
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              At the same time, <Term>regional free trade zones</Term> or{" "}
              <Term>economic communities</Term> (such as the European Union,
              USMCA in North America, and CPTPP across the Pacific) reduce
              tariffs and harmonize standards among member nations, guided
              globally by the <Term>World Trade Organization (WTO)</Term>.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Economic and Political-Legal Environments
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="economic-and-political-legal-environments"
        border
      >
        <SlideHeading>Economic and Political-Legal Environments</SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Two economic factors reflect a country&apos;s attractiveness as a
              market: its <Term>industrial structure</Term> and its{" "}
              <Term>income distribution</Term>.
            </Statement>
            <Ruled>
              <P>
                The country&apos;s industrial structure shapes its product and
                service needs, income levels, and employment levels across four
                types of economies: <Term>subsistence economies</Term>,{" "}
                <Term>raw-material-exporting economies</Term>,{" "}
                <Term>industrializing economies</Term> (emerging markets with
                rapidly growing manufacturing and middle classes), and{" "}
                <Term>industrial economies</Term>.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <Lead>
                In evaluating the <Term>political-legal environment</Term>, a
                firm considers a country&apos;s attitudes toward international
                buying, government bureaucracy, political stability, and
                monetary regulations.
              </Lead>
            </Ruled>
            <Ruled>
              <P>
                Ideally, marketers want to trade in stable jurisdictions with
                convertible currencies, though high-growth emerging markets can
                reward firms that manage currency and regulatory risk carefully.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Cultural Environment and Cultural Blunders
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-cultural-environment-and-cultural-blunders"
        border
      >
        <SlideHeading>
          The Cultural Environment and Cultural Blunders
        </SlideHeading>
        <Statement>
          Each country has its own <Term>folkways, norms, and taboos</Term>:
          when designing global marketing strategies, companies must understand
          how culture affects consumer reactions in each world market and how
          their own strategies affect local cultures.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Sellers that ignore cultural nuances commit expensive marketing
              failures: launching a beef-centered fast-food menu in regions of
              India where cattle are sacred, or using hand gestures, colors, or
              idioms in advertising that carry offensive meanings in the host
              language.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, companies that study local cultural traditions can
              uncover ways to position their products that resonate deeply with
              local rituals, family structures, and dining habits.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Cross-cultural marketing research</Term> and local
              native-speaking teams are essential safeguards before launching
              any campaign in a new country.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Market Selection and Market Entry Strategies
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-market-selection-and-market-entry-strategies"
        border
      >
        <PartHead n={2} title="Market Selection and Market Entry Strategies" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Not every company needs to venture into international markets to
            survive: companies operating in large domestic markets can often
            grow profitably at home, whereas firms in smaller domestic markets
            or saturated categories must expand internationally to achieve
            scale.
          </Statement>
          <Ruled>
            <Lead>
              Once a company decides to sell in a foreign country, it must
              choose the best <Term>mode of market entry</Term> along a
              continuum of commitment, risk, control, and profit potential.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Deciding Which Foreign Markets to Enter
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="deciding-which-foreign-markets-to-enter"
        border
      >
        <SlideHeading>Deciding Which Foreign Markets to Enter</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <Lead>
              Before going abroad, the company should define its{" "}
              <Term>international marketing objectives</Term> and policies,
              including what volume of foreign sales it wants, how many
              countries it wants to market in, and what types of countries it
              wants to enter.
            </Lead>
          </Ruled>
          <Ruled>
            <P>
              Possible international markets are screened and ranked on several
              quantitative and qualitative criteria: <Term>market size</Term>,{" "}
              <Term>market growth rate</Term>, <Term>cost of doing business</Term>
              , <Term>competitive advantage</Term>, and <Term>risk level</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Managers must weigh whether to enter a few countries with deep
              commitment or many countries with rapid surface entry.
            </P>
          </Ruled>
          <Ruled>
            <Statement>
              Ultimately, the goal is to determine the potential{" "}
              <Term>return on investment</Term> of each candidate market
              relative to the strategic risk of entry.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Exporting and Joint Venturing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="exporting-and-joint-venturing"
        border
        exercise={exercise["exporting-and-joint-venturing"]}
      >
        <SlideHeading>Exporting and Joint Venturing</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <P>
              The simplest way to enter a foreign market is through{" "}
              <Term>exporting</Term>, which occurs when the company produces all
              its goods in its home country and sends them abroad for sale,
              either through <Term>indirect exporting</Term> (working through
              independent international marketing intermediaries) or{" "}
              <Term>direct exporting</Term> (handling its own exports).
            </P>
            <Ruled>
              <P>
                Exporting requires the least change in the company&apos;s
                product lines, organization, investments, or mission.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A second method of entering a foreign market is{" "}
                <Term>joint venturing</Term>, joining with foreign companies to
                produce or market products or services, which differs from
                exporting in that the company joins with a host-country partner
                to sell or market abroad across four types.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Licensing</Term> is a simple way for a manufacturer to
                enter international marketing by entering into an agreement with
                a licensee in the foreign market to use the company&apos;s
                manufacturing process, trademark, patent, or trade secret for a
                fee or royalty, while <Term>contract manufacturing</Term>,{" "}
                <Term>management contracting</Term>, and{" "}
                <Term>joint ownership</Term> ventures provide progressively
                deeper operational involvement.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <MarketEntryModes />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Direct Investment in Foreign Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="direct-investment-in-foreign-markets"
        border
      >
        <SlideHeading>Direct Investment in Foreign Markets</SlideHeading>
        <Statement>
          The biggest involvement in a foreign market comes through{" "}
          <Term>direct investment</Term>, the development of foreign-based
          assembly or manufacturing facilities.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              If a company has gained experience in exporting and if the foreign
              market is large enough, foreign production facilities offer many
              advantages: the firm may have lower costs in the form of cheaper
              labor or raw materials, foreign government investment incentives,
              and freight and tariff savings.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The firm may also improve its image in the host country because it
              creates local jobs, and it retains full control over the
              investment and can therefore develop manufacturing and marketing
              policies that serve its long-term international objectives.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              The main disadvantage of direct investment is that the firm faces
              many risks, such as restricted or devalued currencies, falling
              markets, or government changes and <Term>expropriation</Term>.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Selecting a Market Entry Mode for a Regulated Foreign Market
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-selecting-a-market-entry-mode-for-a-regulated-foreign-market"
        border
      >
        <SlideHeading kicker="Discussion:">
          Selecting a Market Entry Mode for a Regulated Foreign Market
        </SlideHeading>
        <Prompt>
          A Canadian specialty coffee and bakery chain with strong domestic
          brand recognition and proprietary roasting recipes wants to expand
          into a fast-growing Asian market where foreign commercial real-estate
          ownership is heavily restricted and local taste preferences favor
          less-sweet pastries. Using the market entry continuum (exporting,
          licensing, joint ownership, and direct investment), recommend an entry
          mode and explain how it balances capital risk, regulatory compliance,
          and brand quality control.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Standardized Versus Adapted Global Marketing Mix
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-standardized-versus-adapted-global-marketing-mix"
        border
      >
        <PartHead
          n={3}
          title="Standardized Versus Adapted Global Marketing Mix"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Companies that operate in one or more foreign markets must decide
            how much, if at all, to adapt their marketing strategies and
            programs to local conditions.
          </Statement>
          <Ruled>
            <Lead>
              Global <Term>glocalization</Term> balances the cost efficiencies
              of global standardization against the customer value of local
              adaptation across all four Ps.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Standardized Versus Adapted Global Marketing (Glocalization)
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="standardized-versus-adapted-global-marketing-glocalization"
        border
      >
        <SlideHeading>
          Standardized Versus Adapted Global Marketing (Glocalization)
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              At one extreme, global companies use{" "}
              <Term>standardized global marketing</Term>, essentially using the
              same marketing strategy approaches and marketing mix worldwide.
            </P>
            <P className="mt-4">
              Proponents of standardization argue that global convergence of
              media and travel creates shared needs across countries, and that
              standardization produces lower production, distribution,
              advertising, and management costs alongside a consistent global
              brand image.
            </P>
          </Ruled>
          <Ruled>
            <P>
              At the other extreme is <Term>adapted global marketing</Term>, in
              which the producer adjusts the marketing strategy and mix elements
              to each target market, bearing more costs in the hope of producing
              a larger market share and return.
            </P>
            <P className="mt-4">
              Most successful multinational firms practice{" "}
              <Term>&ldquo;glocalization&rdquo;</Term> (thinking globally but
              acting locally): standardizing core brand architecture, technology
              platforms, and quality standards while adapting specific features,
              flavors, pricing tiers, and promotional messages to local
              preferences.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Product and Promotion Adaptation Strategies
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="product-and-promotion-adaptation-strategies"
        border
        exercise={exercise["product-and-promotion-adaptation-strategies"]}
      >
        <SlideHeading>
          Product and Promotion Adaptation Strategies
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Five international product and communications strategies exist for
              adapting product and promotion to a global market.
            </Lead>
            <Ruled>
              <P>
                <Term>Straight product extension</Term> means marketing a
                product in a foreign market without making any changes to the
                product, whereas <Term>product adaptation</Term> involves
                changing the product to meet local conditions or wants (such as
                McDonald&apos;s serving McAloo Tikki potato burgers in India or
                KitKat offering matcha green tea flavors in Japan).
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Product invention</Term> consists of creating something
                new to meet the needs of consumers in a given country, such as
                low-cost solar-powered appliances designed specifically for
                rural regions without reliable electrical grids.
              </P>
            </Ruled>
            <Ruled>
              <P>
                On the promotion side, companies can either use the same
                communication strategy they use in the home market or adopt{" "}
                <Term>communication adaptation</Term> (fully altering the
                advertising message or adopting <Term>dual adaptation</Term>{" "}
                that changes both the product and the communication to fit local
                cultural and media rules).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <FiveAdaptationStrategies />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Global Pricing and International Distribution Channels
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="global-pricing-and-international-distribution-channels"
        border
        exercise={
          exercise["global-pricing-and-international-distribution-channels"]
        }
      >
        <SlideHeading>
          Global Pricing and International Distribution Channels
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Global pricing poses acute challenges: a Gucci handbag may sell
              for much less in Italy than in North America because of{" "}
              <Term>price escalation</Term>, which occurs when a company simply
              adds the costs of transportation, tariffs, importer margin,
              wholesaler margin, and retailer margin to its factory price.
            </P>
          </Ruled>
          <Ruled>
            <P>
              To overcome price escalation when selling to consumers in less
              affluent countries with lower purchasing power, firms often
              introduce smaller package sizes or simplified models manufactured
              locally at lower cost, while managing{" "}
              <Term>transfer pricing</Term> across their own international
              subsidiaries.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In international distribution, the <Term>whole-channel view</Term>{" "}
              designs international channels that take into account all the
              necessary links in distributing the seller&apos;s products to
              final buyers, including the seller&apos;s headquarters
              organization, <Term>channels between nations</Term> (moving
              products to the borders of foreign nations), and{" "}
              <Term>channels within nations</Term> (moving products from their
              foreign entry point to the final consumers).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Channels within nations vary dramatically across countries, from
              fragmented networks of millions of tiny neighborhood shops in
              developing markets to consolidated supermarket chains in Western
              Europe.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Emerging Trends: AI, Sustainability, and Immersive Tech
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-emerging-trends-ai-sustainability-and-immersive-tech"
        border
      >
        <PartHead
          n={4}
          title="Emerging Trends: AI, Sustainability, and Immersive Tech"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Looking toward the future of marketing, three cross-cutting
            developments are transforming how organizations create and deliver
            value: <Term>artificial intelligence</Term> in analytics and
            personalization, the <Term>circular economy</Term>, and{" "}
            <Term>immersive omnichannel experiences</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Each trend presents both new capabilities for customer engagement
              and new ethical boundaries.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Predictive AI Analytics and Hyper-Personalization
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="predictive-ai-analytics-and-hyper-personalization"
        border
      >
        <SlideHeading>
          Predictive AI Analytics and Hyper-Personalization
        </SlideHeading>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <Lead>
              Marketers increasingly deploy machine learning and{" "}
              <Term>predictive analytics</Term> to forecast individual customer
              buying patterns, churn risk, and category affinities in real time.
            </Lead>
          </Ruled>
          <Ruled>
            <Lead>
              Combined with generative AI, predictive models power{" "}
              <Term>hyper-personalization</Term>: tailoring product
              recommendations, website layouts, email timing, and promotional
              offers to a segment of one.
            </Lead>
          </Ruled>
          <Ruled>
            <P>
              When executed transparently with consented{" "}
              <Term>first-party data</Term>, personalization reduces search
              fatigue for customers and raises marketing return on investment.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, hyper-personalization crosses into{" "}
              <Term>invasive surveillance</Term> when predictive algorithms
              infer sensitive personal life events (such as medical conditions
              or financial distress) and target consumers without their
              knowledge or consent.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Sustainability, Purpose-Driven Marketing, and the Circular Economy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="sustainability-purpose-driven-marketing-and-the-circular-economy"
        border
        exercise={
          exercise[
            "sustainability-purpose-driven-marketing-and-the-circular-economy"
          ]
        }
      >
        <SlideHeading>
          Sustainability, Purpose-Driven Marketing, and the Circular Economy
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <P>
              <Term>Environmental sustainability</Term> has shifted from a
              peripheral public-relations topic to a central driver of product
              engineering, supply chain logistics, and consumer brand choice.
            </P>
            <Ruled>
              <P>
                <Term>Purpose-driven marketing</Term> aligns a company&apos;s
                commercial strategy with a verifiable societal or environmental
                mission, recognizing that empty <Term>greenwashing</Term> claims
                are quickly exposed by regulators, watchdogs, and consumers.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A major operational shift in sustainable marketing is moving
                from a linear &ldquo;take-make-dispose&rdquo; economy to a{" "}
                <Term>circular economy</Term> that minimizes waste by designing
                products from the start for durability, repair, refurbishment,
                resale, and material recycling.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Outdoor apparel brands that operate trade-in and repair programs
                and electronics firms that recover rare-earth metals from
                returned devices turn <Term>reverse logistics</Term> into both
                environmental stewardship and customer loyalty.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <LinearVsCircularEconomy />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Immersive Experiences (AR and VR) and Seamless Omnichannel Journeys
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="immersive-experiences-ar-and-vr-and-seamless-omnichannel-journeys"
        border
      >
        <SlideHeading>
          Immersive Experiences (AR and VR) and Seamless Omnichannel Journeys
        </SlideHeading>
        <Statement>
          <Term>Augmented reality (AR)</Term> and{" "}
          <Term>virtual reality (VR)</Term> technologies bridge the sensory gap
          between physical in-store inspection and digital e-commerce
          convenience.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Augmented reality</Term> overlays digital 3D models onto the
              consumer&apos;s real physical environment through a smartphone
              camera or headset, allowing a shopper to see how a sofa fits in
              their living room or how eyeglasses look on their face before
              ordering.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Virtual reality</Term> immerses the user in a simulated
              three-dimensional environment, used for virtual real-estate
              walkthroughs, travel previews, and industrial B2B equipment
              training.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Together with mobile wallets and unified inventory systems, these
              tools reduce pre-purchase uncertainty and product return rates
              across the <Term>omnichannel journey</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Whom Do AI Agents Serve? The Future of Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-whom-do-ai-agents-serve-the-future-of-marketing"
        border
      >
        <PartHead
          n={5}
          title="Whom Do AI Agents Serve? The Future of Marketing"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Lead>
            Throughout this twelve-week course, we have seen{" "}
            <Term>AI shopping agents</Term> enter every stage of marketing:
            interpreting wants, navigating dark patterns, taking over consumer
            search and B2B buying-center roles, building positioning shortlists,
            comparing unit prices, and acting as channel intermediaries.
          </Lead>
          <Ruled>
            <Statement>
              We close the course with a foundational question for the future of
              marketing: when a consumer delegates a purchase to an AI agent
              built and hosted by a commercial platform, whose interests does
              that agent actually serve?
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Principal-Agent Conflict Between the Consumer and the Platform
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="principal-agent-conflict-between-the-consumer-and-the-platform"
        border
        exercise={
          exercise[
            "principal-agent-conflict-between-the-consumer-and-the-platform"
          ]
        }
      >
        <SlideHeading>
          Principal-Agent Conflict Between the Consumer and the Platform
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4">
            <P>
              An <Term>AI shopping agent</Term> that searches and buys for a
              consumer is rarely built by the consumer: it is typically built,
              hosted, and configured by a technology or retail platform that
              also earns advertising and commission revenue from sellers.
            </P>
            <Ruled>
              <P>
                This structure creates a classic{" "}
                <Term>conflict of interest</Term> (or{" "}
                <Term>principal-agent problem</Term>): the consumer wants the
                agent to recommend the option that best fits their needs and
                budget, whereas the platform may benefit financially when the
                agent selects a higher-margin or sponsored listing.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Controlled hotel-booking experiments tested how an AI agent
                behaves when choosing among hotels that include paid sponsored
                listings (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
            <Ruled>
              <P>
                When the AI agent was told in its system prompt that it worked
                on behalf of the traveler, it chose a sponsored hotel
                significantly less often than an otherwise identical unsponsored
                hotel (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
            <Ruled>
              <P>
                When the exact same AI agent was told that it worked on behalf
                of the booking platform, it penalized sponsored hotels
                significantly less and chose the sponsored option more often
                (Wadi &amp; Ma, 2026c).
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <PrincipalAgentTriangle />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Fiduciary Alignment and the Future of Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="fiduciary-alignment-and-the-future-of-marketing"
        border
      >
        <SlideHeading>
          Fiduciary Alignment and the Future of Marketing
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              The same hotel-booking experiments revealed a striking governance
              solution: adding a single explicit sentence to the
              platform-aligned prompt stating that the agent&apos;s
              recommendations should serve the traveler&apos;s best interest
              completely removed the difference between the platform-agent and
              traveler-agent conditions (Wadi &amp; Ma, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Thus, whether an AI shopping agent acts as a loyal{" "}
              <Term>fiduciary</Term> for the buyer or a subtle sales channel for
              the platform depends directly on how its{" "}
              <Term>duty of loyalty</Term> is specified and governed (Wadi &amp;
              Ma, 2026c).
            </P>
          </Ruled>
          <Ruled>
            <P>
              For marketers, platforms, and public policy makers, the future of{" "}
              <Term>agentic commerce</Term> requires two commitments: clear,
              machine-readable disclosures of prices, attributes, and
              sponsorships, and AI agents explicitly aligned to serve the
              customer they represent.
            </P>
          </Ruled>
          <Ruled>
            <Statement>
              Ultimately, whether a firm markets to a human shopper in a
              physical store or to an autonomous AI agent online, the
              foundational principle of Week 1 endures: sustainable marketing
              success comes from creating genuine, verifiable value for the
              customer.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing a Governance Charter for Platform AI Shopping Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-a-governance-charter-for-platform-ai-shopping-agents"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing a Governance Charter for Platform AI Shopping Agents
        </SlideHeading>
        <Prompt>
          A major global e-commerce platform is launching a default AI shopping
          assistant that books flights, hotels, and household essentials for
          consumers while charging brands for &ldquo;Sponsored&rdquo; and
          &ldquo;Promoted&rdquo; placements in its catalog feed. Drawing on the
          hotel-booking experiments of Wadi and Ma (2026c), marketing ethics,
          and the societal marketing concept, explain the conflict of interest
          facing the platform&apos;s AI agent and propose three specific rules
          that regulators and the platform should adopt so the agent serves the
          consumer&apos;s welfare.
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "International marketing progresses through six major decisions: assessing the global environment, deciding whether to go global, selecting which markets to enter, choosing an entry mode, designing the global marketing mix, and structuring the global organization.",
            "Assessing the global environment requires analyzing international trade barriers (tariffs, quotas, and nontariff barriers) alongside regional free trade zones, country economic structures, political-legal stability, and local cultural norms.",
            "Foreign market entry modes progress from exporting (indirect and direct) to joint venturing (licensing, contract manufacturing, management contracting, and joint ownership) and direct investment, with each step increasing capital commitment, risk, control, and profit potential.",
            'Global marketing programs balance standardized global marketing (lowering costs and unifying brand image) with adapted global marketing ("glocalization") across product extension, adaptation, or invention, communication adaptation, price escalation management, and whole-channel distribution.',
            "The future of marketing is shaped by predictive and generative AI personalization, circular-economy sustainability (repair, reuse, and recycling), and immersive AR and VR shopping experiences.",
            "Because AI shopping agents are often hosted by platforms that earn seller ad revenue, experiments show that agents told they work for the platform penalize sponsored hotels less than agents told they work for the traveler, unless a single instruction explicitly directs the agent to serve the traveler's interest (Wadi & Ma, 2026c).",
          ].map((text, i) => (
            <Numbered key={i} n={i + 1}>
              <P>{text}</P>
            </Numbered>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
