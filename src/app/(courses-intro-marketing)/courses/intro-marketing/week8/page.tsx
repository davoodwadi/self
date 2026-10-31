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
  AgentCoffeeComparison,
  PriceElasticityComparison,
  PricingCorridor,
  ReverseChains,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 8: PRICING STRATEGIES (THE SECOND P)
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week8() {
  return (
    <SlideDeck label="Week 8">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">
            Week 8
          </p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">Pricing Strategies (The Second P)</Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Pricing is the only element of the marketing mix that{" "}
              <Tint>captures revenue directly</Tint>, requiring managers to
              balance customer value perceptions, internal cost structures, and
              competitor actions while navigating algorithmic pricing and
              unit-price comparison by AI shopping agents.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Strategic Role of Price in the Marketing Mix
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-strategic-role-of-price-in-the-marketing-mix"
        border
      >
        <SlideHeading>
          The Strategic Role of Price in the Marketing Mix
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              In the narrowest sense, <Term>price</Term> is the amount of money
              charged for a product or a service.
            </Statement>
            <Ruled>
              <Lead>
                More broadly, price is the sum of all the values that customers
                give up to gain the benefits of having or using a product or
                service.
              </Lead>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                Price is the only element in the marketing mix that{" "}
                <Term>produces revenue</Term>: all other elements (product
                development, distribution channels, and promotional campaigns)
                represent costs.
              </P>
            </Ruled>
            <Ruled>
              <Big>
                Price is also one of the{" "}
                <Tint>most flexible marketing mix elements</Tint>: unlike
                product features or channel commitments that take months or
                years to alter, prices can be changed rapidly.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Pricing Ceiling and the Pricing Floor
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-pricing-ceiling-and-the-pricing-floor"
        border
      >
        <SlideHeading>The Pricing Ceiling and the Pricing Floor</SlideHeading>
        <Statement>
          Every pricing decision operates within a{" "}
          <Tint>corridor bounded by a floor and a ceiling</Tint>.
        </Statement>
        <div className="mt-6 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Customer perceptions</Term> of the product&apos;s value set
              the ceiling for prices: if customers perceive that a
              product&apos;s price is greater than its value, they will not buy
              the product.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Product costs</Term> set the floor for a product&apos;s
              price: if the company prices the product below its costs of
              production and distribution, the company&apos;s profits will
              suffer.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <Ruled>
            <P>
              In setting its price between these two extremes, the company must
              consider several internal and external factors, including
              competitors&apos; strategies and prices, the overall marketing
              strategy and mix, and the nature of the market and demand.
            </P>
          </Ruled>
          <Plate wide>
            <PricingCorridor />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Internal and External Factors Affecting Pricing Decisions
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-internal-and-external-factors-affecting-pricing-decisions"
        border
      >
        <PartHead
          n={1}
          title="Internal and External Factors Affecting Pricing Decisions"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Effective pricing requires aligning{" "}
            <Tint>internal company capabilities and cost structures</Tint> with
            external market conditions and demand sensitivity.
          </Statement>
          <Ruled>
            <Lead>
              Understanding fixed versus variable costs, competitive market
              structures, and price elasticity of demand prevents costly pricing
              errors.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Internal Factors: Marketing Objectives and Mix Strategy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="internal-factors-marketing-objectives-and-mix-strategy"
        border
      >
        <SlideHeading>
          Internal Factors: Marketing Objectives and Mix Strategy
        </SlideHeading>
        <Lead>
          Before setting price, the company must decide on its{" "}
          <Tint>overall marketing strategy</Tint> for the product or service.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Pricing objectives</Term> may focus on survival (setting low
              prices to cover variable costs and some fixed costs during
              overcapacity), current profit maximization, market-share
              leadership (building low unit costs through high volume), or
              product-quality leadership (charging a high price to fund
              continuous R&amp;D).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Price decisions must be closely coordinated with product design,
              distribution, and promotion decisions to form a consistent{" "}
              <Term>integrated marketing program</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Many firms support price-positioning strategies with{" "}
              <Term>target costing</Term>, which reverses the usual sequence by
              starting with an ideal selling price based on customer value
              considerations and then targeting product design and manufacturing
              costs that ensure that price is met.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Internal Factors: Fixed, Variable, and Total Costs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="internal-factors-fixed-variable-and-total-costs"
        border
      >
        <SlideHeading>
          Internal Factors: Fixed, Variable, and Total Costs
        </SlideHeading>
        <Statement>
          Costs set the floor for the price that the company can charge: a firm
          must charge a price that covers all its costs for producing,
          distributing, and selling the product and delivers a{" "}
          <Tint>fair rate of return</Tint> for its effort and risk.
        </Statement>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Fixed costs</Term> (also known as overhead) are costs that
              do not vary with production or sales level, such as monthly rent,
              heat, interest, and executive salaries.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Variable costs</Term> vary directly with the level of
              production: each tablet or pair of shoes produced incurs a set
              cost of microchips, fabric, packaging, and assembly labor, called
              variable because the total variable cost varies with the number of
              units produced.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Total costs</Term> are the sum of the fixed and variable
              costs for any given level of production, and as production scale
              rises and workers gain experience (the{" "}
              <Term>experience or learning curve</Term>), average cost per unit
              typically falls.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          External Factors: Market Structure and Price Elasticity of Demand
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="external-factors-market-structure-and-price-elasticity-of-demand"
        border
        exercise={
          exercise[
            "external-factors-market-structure-and-price-elasticity-of-demand"
          ]
        }
      >
        <SlideHeading>
          External Factors: Market Structure and Price Elasticity of Demand
        </SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              Whereas costs set the lower limit of prices, the market and demand
              set the upper limit, and the seller&apos;s pricing freedom varies
              across four types of markets: <Term>pure competition</Term>,{" "}
              <Term>monopolistic competition</Term>,{" "}
              <Term>oligopolistic competition</Term>, and{" "}
              <Term>pure monopoly</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>demand curve</Term> shows the number of units the market
              will buy in a given time period at different prices that might be
              charged: in normal cases, demand and price are inversely related.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Price elasticity of demand</Term> measures how responsive
              demand will be to a change in price, calculated as the percentage
              change in quantity demanded divided by the percentage change in
              price.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If demand hardly changes with a small change in price, demand is{" "}
              <Term>inelastic</Term> (common when there are few substitutes or
              when the item is a necessity), whereas if demand changes greatly,
              demand is <Term>elastic</Term>, guiding whether a price cut will
              increase or decrease total revenue.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <PriceElasticityComparison />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Core Pricing Approaches
          ================================================================ */}
      <Slide className={TIGHT} id="part-2-core-pricing-approaches" border>
        <PartHead n={2} title="Core Pricing Approaches" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Companies set prices by selecting one of three general pricing
            approaches that emphasize one or more of the three major
            considerations: <Term>customer value-based pricing</Term>,{" "}
            <Term>cost-based pricing</Term>, and{" "}
            <Term>competition-based pricing</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Comparing the sequences of cost-based and value-based pricing
              highlights why successful pricing{" "}
              <Tint>starts with the buyer rather than the factory ledger</Tint>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Customer Value-Based Pricing: Good-Value and Value-Added Strategies
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customer-value-based-pricing-good-value-and-value-added-strategies"
        border
        exercise={
          exercise[
            "customer-value-based-pricing-good-value-and-value-added-strategies"
          ]
        }
      >
        <SlideHeading>
          Customer Value-Based Pricing: Good-Value and Value-Added Strategies
        </SlideHeading>
        <Statement>
          <Term>Customer value-based pricing</Term> uses buyers&apos;
          perceptions of value, not the seller&apos;s cost, as the key to
          pricing: the marketer cannot design a product and marketing program
          and then set the price afterwards.
        </Statement>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Good-value pricing</Term> offers the right combination of
              quality and good service at a fair price, either by introducing
              less-expensive versions of established brand-name products or by
              adopting <Term>everyday low pricing (EDLP)</Term> rather than
              frequent high-low sales promotions.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Value-added pricing</Term> attaches value-added features and
              services to differentiate a company&apos;s offers and support
              charging higher prices rather than cutting prices to match
              competitors.
            </P>
          </Ruled>
          <Ruled>
            <P>
              For example, luxury cinema chains add reclined seating, reserved
              booking, and gourmet dining to justify charging twice the ticket
              price of a standard theater.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <ReverseChains />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Cost-Based Pricing: Cost-Plus and Break-Even Analysis
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="cost-based-pricing-cost-plus-and-break-even-analysis"
        border
        exercise={
          exercise["cost-based-pricing-cost-plus-and-break-even-analysis"]
        }
      >
        <SlideHeading>
          Cost-Based Pricing: Cost-Plus and Break-Even Analysis
        </SlideHeading>
        <Lead>
          <Term>Cost-based pricing</Term> involves setting prices based on the
          costs of producing, distributing, and selling the product plus a fair
          rate of return for the company&apos;s effort and risk.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              The simplest method is <Term>cost-plus pricing</Term> (or{" "}
              <Term>markup pricing</Term>), which adds a standard markup to the
              cost of the product, though markup pricing generally ignores
              current demand and competitor prices.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Another cost-oriented approach is <Term>break-even pricing</Term>{" "}
              (or <Term>target return pricing</Term>), in which the firm tries
              to determine the price at which it will break even or make the
              target return it is seeking on its investment.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Break-even volume</Term> is calculated as Fixed Costs
              divided by (Price minus Variable Cost per unit), allowing managers
              to test how many units must be sold at different candidate prices
              to cover total costs.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Competition-Based Pricing
          ================================================================ */}
      <Slide className={TIGHT} id="competition-based-pricing" border>
        <SlideHeading>Competition-Based Pricing</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Competition-based pricing</Term> involves setting prices
              based on competitors&apos; strategies, costs, prices, and market
              offerings.
            </Statement>
            <Ruled>
              <Lead>
                Consumers base their judgments of a product&apos;s value on the
                prices that competitors charge for similar products.
              </Lead>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                In assessing competitors&apos; pricing strategies, a company
                asks two questions: first, how does the company&apos;s market
                offering compare with competitors&apos; offerings in terms of
                customer value, and second, how strong are current competitors
                and what are their current pricing strategies?
              </P>
            </Ruled>
            <Ruled>
              <P>
                Even when a small firm cannot match a giant rival&apos;s low
                unit costs, it can avoid head-on price wars by targeting a{" "}
                <Tint>distinct niche with value-added service</Tint>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 3: New-Product and Product Mix Pricing Strategies
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-new-product-and-product-mix-pricing-strategies"
        border
      >
        <PartHead
          n={3}
          title="New-Product and Product Mix Pricing Strategies"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Pricing strategies usually change as a product passes through its{" "}
            <Tint>life cycle</Tint>, with the introductory stage posing the
            greatest challenge.
          </Statement>
          <Ruled>
            <Lead>
              Furthermore, when a product is part of a broader product mix, the
              firm searches for a set of prices that maximizes profits on the
              total mix rather than on a single item in isolation.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          New-Product Pricing: Market-Skimming Versus Market-Penetration
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="new-product-pricing-market-skimming-versus-market-penetration"
        border
        exercise={
          exercise[
            "new-product-pricing-market-skimming-versus-market-penetration"
          ]
        }
      >
        <SlideHeading>
          New-Product Pricing: Market-Skimming Versus Market-Penetration
        </SlideHeading>
        <Lead>
          Companies bringing out a new product face the challenge of setting
          prices for the first time and can choose between two broad strategies:{" "}
          <Term>market-skimming pricing</Term> and{" "}
          <Term>market-penetration pricing</Term>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Market-skimming pricing</Term> sets a high initial price for
              a new product to skim maximum revenues layer by layer from the
              segments willing to pay the high price, making fewer but more
              profitable sales (as Apple and Sony often do with flagship
              electronics).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Market skimming makes sense only when the product&apos;s quality
              and image support its higher price, the costs of producing a
              smaller volume are not so high that they cancel the advantage of
              charging more, and competitors cannot enter the market easily and
              undercut the high price.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Market-penetration pricing</Term> sets a low initial price
              to penetrate the market quickly and deeply, attracting a large
              number of buyers and winning a large market share, which works
              best when the market is highly price-sensitive and production and
              distribution costs fall as sales volume increases.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Product Line, Optional-Product, and Captive-Product Pricing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="product-line-optional-product-and-captive-product-pricing"
        border
        exercise={
          exercise["product-line-optional-product-and-captive-product-pricing"]
        }
      >
        <SlideHeading>
          Product Line, Optional-Product, and Captive-Product Pricing
        </SlideHeading>
        <Lead>
          When a product is part of a <Term>product mix</Term>, marketers must
          coordinate prices across related items that share demand or production
          costs.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Product line pricing</Term> sets the price steps between
              various products in a product line based on cost differences
              between the products, customer evaluations of different features,
              and competitors&apos; prices.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Optional-product pricing</Term> prices optional or accessory
              products sold along with a main product, such as upgraded storage,
              extended warranties, or accessories sold with a laptop.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Captive-product pricing</Term> sets prices for products that
              must be used along with a main product, such as razor blades for a
              razor, ink cartridges for a printer, or coffee pods for a brewing
              machine (or <Term>two-part pricing</Term> in services, combining a
              fixed membership fee plus a variable usage fee).
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          By-Product and Product Bundle Pricing
          ================================================================ */}
      <Slide className={TIGHT} id="by-product-and-product-bundle-pricing" border>
        <SlideHeading>By-Product and Product Bundle Pricing</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Producing products and services often generates{" "}
              <Term>by-products</Term>: if the by-products have no value and
              getting rid of them is costly, this will affect the pricing of the
              main product.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Using <Term>by-product pricing</Term>, the company seeks a market
              for these by-products to offset disposal costs and make the main
              product&apos;s price more competitive (such as sawmills selling
              bark and sawdust as garden mulch or fuel pellets).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Using <Term>product bundle pricing</Term>, sellers often combine
              several products and offer the bundle at a reduced price, such as
              fast-food combo meals, season theatre tickets, or software office
              suites.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Price bundling can promote the sales of products consumers might
              not otherwise buy, provided the combined price is low enough to
              induce buyers to purchase the bundle.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Selecting a Pricing Strategy for a Connected Fitness Device
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-selecting-a-pricing-strategy-for-a-connected-fitness-device"
        border
      >
        <SlideHeading kicker="Discussion:">
          Selecting a Pricing Strategy for a Connected Fitness Device
        </SlideHeading>
        <Prompt>
          A hardware startup has
          developed an indoor rowing machine that pairs with a live-streamed
          coaching app. Manufacturing each rower costs 450 dollars in variable
          costs, fixed R&amp;D and tooling costs total 3 million dollars, and
          delivering the streaming app costs 4 dollars per active user per
          month. Using break-even analysis, market-skimming versus
          market-penetration pricing, and captive-product (two-part tariff)
          pricing, evaluate whether the startup should price the rower at 1,200
          dollars with a 15-dollar monthly subscription or at 550 dollars with a
          39-dollar monthly subscription.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 4: Price Adjustment Strategies and Public Policy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-price-adjustment-strategies-and-public-policy"
        border
      >
        <PartHead
          n={4}
          title="Price Adjustment Strategies and Public Policy"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Companies usually adjust their basic prices to account for{" "}
            <Tint>
              various customer differences, changing situations, and
              psychological perceptions</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              At the same time, pricing decisions are bounded by competition
              laws and public policy rules that protect consumers and channel
              partners.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discount, Segmented, and Promotional Pricing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discount-segmented-and-promotional-pricing"
        border
      >
        <SlideHeading>Discount, Segmented, and Promotional Pricing</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Discount and allowance pricing</Term> reduces prices to
              reward customer responses such as paying bills early (<Term>cash discount</Term>),
              buying in large volume (<Term>quantity discount</Term>), buying
              off-season (<Term>seasonal discount</Term>), or trading in an old
              item (<Term>trade-in allowance</Term>).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Segmented pricing</Term> sells a product or service at two
              or more prices, where the difference in prices is based on
              differences in customer segments (student or senior rates),
              product form, location (theater seat tiers), or time (matinee or
              off-peak pricing) rather than differences in cost.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Promotional pricing</Term> temporarily prices products below
              list price, and sometimes even below cost as{" "}
              <Term>loss leaders</Term>, to create buying excitement and urgency
              through special-event pricing, limited-time flash sales, or cash
              rebates.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Used excessively, however, promotional pricing can erode a
              brand&apos;s perceived quality in the eyes of consumers and train
              buyers to wait for price deals.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Psychological Pricing and Reference Prices
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="psychological-pricing-and-reference-prices"
        border
        exercise={exercise["psychological-pricing-and-reference-prices"]}
      >
        <SlideHeading>Psychological Pricing and Reference Prices</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Psychological pricing</Term> considers the psychology of
              prices and not simply the economics: the price is used to say
              something about the product.
            </Statement>
            <Ruled>
              <Lead>
                When consumers cannot judge quality directly because they lack
                the information or skill, price becomes an important{" "}
                <Tint>signal of quality</Tint>.
              </Lead>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                Another aspect of psychological pricing is{" "}
                <Term>reference prices</Term>, which are prices that buyers
                carry in their minds and refer to when looking at a given
                product.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A reference price might be formed by noting current prices,
                remembering past prices, or assessing the buying situation, and
                sellers influence reference prices by placing a standard model
                next to a luxury model or displaying a legitimate
                manufacturer&apos;s suggested retail price alongside the sale
                price.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Initiating Price Changes and Legal Considerations in Pricing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="initiating-price-changes-and-legal-considerations-in-pricing"
        border
      >
        <SlideHeading>
          Initiating Price Changes and Legal Considerations in Pricing
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              After developing their pricing structures and strategies,
              companies often face situations in which they must initiate{" "}
              <Term>price cuts</Term> (due to excess capacity or falling share)
              or <Term>price increases</Term> (due to cost inflation or excess
              demand), while anticipating how buyers and competitors will react.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Federal and provincial or state laws also govern pricing across
              two levels: pricing within a channel level and pricing across
              channel levels.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Within a channel level, <Term>price-fixing</Term> (talking with
              competitors to set prices) is illegal, as is{" "}
              <Term>predatory pricing</Term> (selling below cost with the
              intention of punishing a competitor or gaining higher long-run
              profits by putting competitors out of business).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Across channel levels, laws prohibit unfair{" "}
              <Term>price discrimination</Term> among trade buyers,{" "}
              <Term>retail price maintenance</Term> (requiring dealers to charge
              a specified retail price), and <Term>deceptive pricing</Term>{" "}
              (such as scanner fraud or phony reference price markdowns).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Algorithmic Pricing and Price Comparison by AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-algorithmic-pricing-and-price-comparison-by-ai-agents"
        border
      >
        <PartHead
          n={5}
          title="Algorithmic Pricing and Price Comparison by AI Agents"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Pricing has moved from static printed catalogs to{" "}
            <Tint>real-time algorithmic pricing</Tint> on the seller side and
            automated price comparison by <Term>AI shopping agents</Term> on the
            buyer side.
          </Statement>
          <Ruled>
            <Lead>
              Examining how seller algorithms set prices and how buyer agents
              compare unit prices reveals new strategic and ethical dynamics in
              digital markets.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Dynamic Pricing, Personalized Pricing, and Perceived Fairness
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="dynamic-pricing-personalized-pricing-and-perceived-fairness"
        border
      >
        <SlideHeading>
          Dynamic Pricing, Personalized Pricing, and Perceived Fairness
        </SlideHeading>
        <Lead>
          <Term>Dynamic pricing</Term> is the practice of continually adjusting
          prices to meet the characteristics and needs of individual customers
          and situations, driven by real-time algorithms that monitor inventory,
          demand surges, and competitor prices.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Aggregate dynamic pricing</Term> changes the price of a good
              or service over time for all buyers simultaneously based on market
              supply and demand, such as airline seat pricing or ride-hailing
              surge multipliers during a rainstorm.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Personalized pricing</Term> uses individual browsing
              histories, location, or device data to charge different customers
              different prices for the exact same item at the same time
              according to their estimated willingness to pay.
            </P>
          </Ruled>
          <Ruled>
            <P>
              While dynamic pricing tied to transparent supply-and-demand shifts
              is widely tolerated in travel and ticketing, covert personalized
              pricing triggers severe consumer outrage and trust loss when
              buyers discover they were charged more than peers.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How AI Shopping Agents Compare Prices and Unit Costs
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="how-ai-shopping-agents-compare-prices-and-unit-costs"
        border
        exercise={
          exercise["how-ai-shopping-agents-compare-prices-and-unit-costs"]
        }
      >
        <SlideHeading>
          How AI Shopping Agents Compare Prices and Unit Costs
        </SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              On the demand side, consumers increasingly deploy{" "}
              <Term>AI shopping agents</Term> to compare prices across competing
              brands and retailers on their behalf.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Unlike a human shopper who may be swayed by{" "}
              <Term>odd-even psychological pricing</Term> ($4.99 versus $5.00),
              an AI agent can calculate exact <Term>unit prices</Term> when it
              inspects all product attributes.
            </P>
          </Ruled>
          <Ruled>
            <P>
              However, whether an AI agent actually computes the best unit value
              depends on <Term>lookup costs</Term> and the specificity of the
              consumer&apos;s prompt: in a controlled study, one coffee option
              cost $4.99 for 10 ounces ($0.499 per ounce) while a competing
              option cost $5.00 for 11 ounces ($0.455 per ounce), making the
              $5.00 bag cheaper per ounce (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              When inspecting the detailed product page to see the package
              weight carried a small lookup cost and the consumer&apos;s goal
              was vague, AI agents frequently skipped checking the weight and
              picked the $4.99 bag, whereas when given a specific
              cost-minimization goal, they checked the package size and chose
              the better-value $5.00 bag (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <AgentCoffeeComparison />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Pricing Transparency for Human Shoppers and AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="pricing-transparency-for-human-shoppers-and-ai-agents"
        border
      >
        <SlideHeading>
          Pricing Transparency for Human Shoppers and AI Agents
        </SlideHeading>
        <Statement>
          The interaction between seller pricing strategies and buyer AI agents
          changes how firms <Tint>compete on price and value</Tint>.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Sellers that rely on <Term>shrinkflation</Term> (reducing package
              weight while keeping the package price just below a
              competitor&apos;s sticker price) and hide the net weight on
              secondary tabs exploit both hurried human shoppers and AI agents
              operating under vague instructions (Wadi &amp; Ma, 2026b).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Conversely, a brand that offers superior <Term>unit value</Term>{" "}
              (such as a larger package or concentrated formula at a lower cost
              per ounce) only wins the comparison if the AI agent actually sees
              the unit price.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Stating package size, unit count, and price per ounce or unit
              directly in the primary product title and structured catalog
              fields ensures that both human shoppers and delegated AI agents
              recognize the offer&apos;s true value.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Competing on Unit Value in an Agent-Mediated Grocery Category
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-competing-on-unit-value-in-an-agent-mediated-grocery-category"
        border
      >
        <SlideHeading kicker="Discussion:">
          Competing on Unit Value in an Agent-Mediated Grocery Category
        </SlideHeading>
        <Prompt>
          A national brand of
          liquid laundry detergent sells a concentrated 50-load bottle for
          $11.50 ($0.23 per load), while its main competitor sells a diluted
          40-load bottle in a physically larger jug for $10.99 ($0.275 per
          load). Human shoppers in store aisles often buy the $10.99 jug because
          it looks larger and has a lower sticker price, and online AI shopping
          agents given vague prompts also pick the $10.99 listing when load
          counts are buried on secondary tabs. Drawing on psychological
          reference pricing and Wadi and Ma (2026b), how should the national
          brand redesign its packaging, online title attributes, and pricing
          communication to win both human and AI comparisons?
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
              Price is the only revenue-generating element of the marketing mix
              and operates within a corridor bounded by product costs at the
              floor and customer perceptions of value at the ceiling.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Internal pricing factors include marketing objectives, target
              costing, and fixed versus variable cost structures, while external
              factors include market competitive structure and the price
              elasticity of demand.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Customer value-based pricing (good-value and value-added pricing)
              reverses cost-based pricing by starting with buyer needs and value
              perceptions rather than factory costs, while competition-based
              pricing benchmarks against rivals&apos; offerings.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              For new products, marketers choose between market-skimming pricing
              (high initial price to capture high-margin segments) and
              market-penetration pricing (low initial price to build rapid
              volume and share).
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              Product mix pricing coordinates prices across product lines,
              optional products, captive products, by-products, and product
              bundles, while price adjustments incorporate discounts, segmented
              pricing, psychological reference prices, and promotional pricing.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Sellers now use algorithms for dynamic and personalized pricing,
              while buyers use AI shopping agents whose ability to identify the
              lowest unit price (such as a $5.00 11-ounce coffee over a $4.99
              10-ounce coffee) depends on prompt specificity and accessible
              package-size disclosures (Wadi &amp; Ma, 2026b).
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
