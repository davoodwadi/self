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
  FourStepStpFramework,
  ConsumerSegmentationBases,
  TargetingContinuum,
  PerceptualMap,
  ValueGrid,
  AiConsiderationShortlist,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 6: SEGMENTATION, TARGETING, AND POSITIONING (STP)
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week6() {
  return (
    <SlideDeck label="Week 6">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">Week 6</p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Segmentation, Targeting, and Positioning (STP)
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Segmentation, targeting, and positioning (STP) enable
              organizations to{" "}
              <Tint>
                divide heterogeneous markets into distinct buyer groups
              </Tint>
              , select the segments they can serve best, and establish a clear
              value proposition in both consumer minds and AI-generated
              shortlists.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          From Mass Marketing to Customer-Driven Strategy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="from-mass-marketing-to-customer-driven-strategy"
        border
      >
        <SlideHeading>
          From Mass Marketing to Customer-Driven Strategy
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Companies today recognize that they{" "}
              <Tint>cannot appeal to all buyers</Tint> in the marketplace, or at
              least not to all buyers in the same way.
            </Statement>
            <Ruled>
              <P>
                Buyers are too numerous, too widely scattered, and too varied in
                their needs and buying practices for a single uniform product to
                satisfy everyone.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <Lead>
                Most companies have therefore moved away from{" "}
                <Term>mass marketing</Term> and toward{" "}
                <Term>target marketing</Term>: identifying market segments,
                selecting one or more of them, and developing products and
                marketing programs tailored to each.
              </Lead>
            </Ruled>
            <Ruled>
              <Big>
                <Term>Target marketing</Term> focuses the firm&apos;s resources
                on the buyers it can{" "}
                <Tint>serve best and most profitably</Tint>.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          The Four Steps of Designing a Customer-Driven Strategy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-four-steps-of-designing-a-customer-driven-strategy"
        border
      >
        <SlideHeading>
          The Four Steps of Designing a Customer-Driven Strategy
        </SlideHeading>
        <Lead>
          Designing a customer-driven marketing strategy consists of four
          interconnected steps commonly summarized as <Term>STP</Term>.
        </Lead>
        <div className="mt-6 w-full">
          <Plate wide>
            <FourStepStpFramework />
          </Plate>
        </div>
        <ol className="mt-6 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Numbered n={1}>
            <P>
              In the first step, <Term>market segmentation</Term> divides a
              market into smaller groups of buyers with distinct needs,
              characteristics, or behaviors that might require separate products
              or marketing programs.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              In the second step, <Term>market targeting</Term> evaluates each
              market segment&apos;s attractiveness and selects one or more
              segments to enter.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              In the third step, <Term>differentiation</Term> actually
              differentiates the firm&apos;s market offering to create superior
              customer value for the targeted segments.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              In the fourth step, <Term>positioning</Term> arranges for a market
              offering to occupy a clear, distinctive, and desirable place
              relative to competing products in the minds of target consumers.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 1: Bases for Segmenting Consumer and Business Markets
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-bases-for-segmenting-consumer-and-business-markets"
        border
      >
        <PartHead
          n={1}
          title="Bases for Segmenting Consumer and Business Markets"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            There is <Tint>no single way to segment a market</Tint>. A marketer
            must try different segmentation variables, alone and in combination,
            to find the best way to view the market structure.
          </Statement>
          <Ruled>
            <Lead>
              Consumer markets are segmented across geographic, demographic,
              psychographic, and behavioral dimensions, while business markets
              incorporate additional organizational variables.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Geographic and Demographic Segmentation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="geographic-and-demographic-segmentation"
        border
        exercise={exercise["geographic-and-demographic-segmentation"]}
      >
        <SlideHeading>Geographic and Demographic Segmentation</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Ruled>
              <P>
                <Term>Geographic segmentation</Term> divides the market into
                different geographical units such as nations, regions, states,
                counties, cities, climate zones, or neighborhoods.
              </P>
            </Ruled>
            <Ruled>
              <P>
                National retailers localize merchandise assortments by region,
                stocking snow blowers and insulated boots in northern stores
                while featuring patio furniture in southern stores.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ConsumerSegmentationBases />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Demographic segmentation</Term> divides the market into
              segments based on variables such as age, life-cycle stage, gender,
              income, occupation, education, religion, ethnicity, and
              generation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Demographic variables are the{" "}
              <Tint>most popular basis for segmenting customer groups</Tint>{" "}
              because consumer needs, wants, and usage rates often vary closely
              with demographic traits, and because demographics are easier to
              measure than most other variables.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Psychographic and Behavioral Segmentation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="psychographic-and-behavioral-segmentation"
        border
        exercise={exercise["psychographic-and-behavioral-segmentation"]}
      >
        <SlideHeading>Psychographic and Behavioral Segmentation</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                <Term>Psychographic segmentation</Term> divides buyers into
                different segments based on social class, lifestyle, or
                personality characteristics, recognizing that people in the same
                demographic group can have very different psychographic
                profiles.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Outdoor gear brands, for example, design different product lines
                for weekend recreational campers and extreme alpine
                mountaineers even when both groups share similar ages and
                incomes.
              </P>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                <Term>Behavioral segmentation</Term> divides buyers into
                segments based on their knowledge, attitudes, uses, or responses
                to a product, which many marketers consider the{" "}
                <Tint>best starting point</Tint> for building market segments.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Behavioral variables include <Term>occasions</Term> (when buyers
                get the idea to buy or use the item),{" "}
                <Term>benefits sought</Term> (the specific functional or
                emotional benefit desired), <Term>user status</Term> (nonusers,
                ex-users, potential users, first-time users, and regular users),{" "}
                <Term>usage rate</Term> (light, medium, and heavy users), and{" "}
                <Term>loyalty status</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Segmenting Business Markets and Requirements for Effective Segmentation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="segmenting-business-markets-and-requirements-for-effective-segmentation"
        border
        exercise={
          exercise[
            "segmenting-business-markets-and-requirements-for-effective-segmentation"
          ]
        }
      >
        <SlideHeading>
          Segmenting Business Markets and Requirements for Effective
          Segmentation
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Business marketers use many of the same segmentation variables as
              consumer marketers, including geography, benefits sought, user
              status, usage rate, and loyalty status.
            </P>
          </Ruled>
          <Ruled>
            <P>
              They also use variables specific to organizational operations:
              customer <Term>operating characteristics</Term>,{" "}
              <Term>purchasing approaches</Term>,{" "}
              <Term>situational factors</Term> (such as urgency and order size),
              and <Term>personal characteristics</Term> of buyers (such as risk
              tolerance).
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full items-start gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <Statement>
            Not all segmentation schemes are useful: to be effective, market
            segments must <Tint>meet five criteria</Tint>.
          </Statement>
          <Ruled>
            <P>
              Segments must be <Term>measurable</Term> (size, purchasing power,
              and profiles can be measured), <Term>accessible</Term>{" "}
              (effectively reached and served), <Term>substantial</Term> (large
              or profitable enough to serve), <Term>differentiable</Term>{" "}
              (conceptually distinguishable and responding differently to
              different marketing mixes), and <Term>actionable</Term> (effective
              programs can be designed for attracting and serving the segments).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Market Targeting Strategies
          ================================================================ */}
      <Slide className={TIGHT} id="part-2-market-targeting-strategies" border>
        <PartHead n={2} title="Market Targeting Strategies" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Market segmentation reveals the firm&apos;s market segment
            opportunities. The firm must next{" "}
            <Tint>evaluate the various segments</Tint> and decide how many and
            which segments it can serve best.
          </Statement>
          <Ruled>
            <Lead>
              Selecting a targeting strategy requires balancing segment size and
              attractiveness against the firm&apos;s own capabilities and
              objectives.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Evaluating Market Segments
          ================================================================ */}
      <Slide className={TIGHT} id="evaluating-market-segments" border>
        <SlideHeading>Evaluating Market Segments</SlideHeading>
        <Lead>
          In evaluating different market segments, a company must look at three
          core factors: <Term>segment size and growth</Term>,{" "}
          <Term>segment structural attractiveness</Term>, and{" "}
          <Term>company objectives and resources</Term>.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              The largest, fastest-growing segments are not always the most
              attractive ones for every company: a small firm may lack the
              skills and financial resources needed to serve a massive segment
              or may find it too competitive.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Michael Porter&apos;s <Term>five forces model</Term> helps assess
              a segment&apos;s structural attractiveness: a segment is less
              attractive if it already contains many strong and aggressive
              competitors, if new entrants can enter easily, if substitute
              products exist, or if buyers or suppliers wield strong bargaining
              power.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Even if a segment has positive size, growth, and structural
              attractiveness, the company must reject it if serving it conflicts
              with the firm&apos;s long-run objectives or environmental
              commitments.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Selecting Target Market Segments: Mass to Micromarketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="selecting-target-market-segments-mass-to-micromarketing"
        border
        exercise={
          exercise["selecting-target-market-segments-mass-to-micromarketing"]
        }
      >
        <SlideHeading>
          Selecting Target Market Segments: Mass to Micromarketing
        </SlideHeading>
        <Lead>
          A <Term>target market</Term> consists of a set of buyers who share
          common needs or characteristics that a company decides to serve,
          chosen along a four-stage continuum of breadth.
        </Lead>
        <div className="mt-6 w-full">
          <Plate wide>
            <TargetingContinuum />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Ruled>
            <P>
              <Term>Undifferentiated (or mass) marketing</Term> ignores market
              segment differences and goes after the whole market with one
              offer, focusing on what is common in the needs of consumers rather
              than on what is different.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Differentiated (or segmented) marketing</Term> targets
              several market segments and designs separate offers for each, such
              as a hotel group operating distinct luxury, business-select, and
              economy brands, which increases total sales but also raises
              production and marketing costs.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Concentrated (or niche) marketing</Term> goes after a large
              share of one or a few smaller segments or niches, allowing a firm
              with limited resources to achieve a strong market position through
              deep specialization.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Micromarketing</Term> tailors products and marketing
              programs to the tastes of specific locations (
              <Term>local marketing</Term>) or individual customers (
              <Term>individual marketing</Term> or{" "}
              <Term>mass customization</Term>).
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Socially Responsible Target Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="socially-responsible-target-marketing"
        border
      >
        <SlideHeading>Socially Responsible Target Marketing</SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Smart targeting{" "}
              <Tint>benefits consumers as well as companies</Tint> by reaching
              specific groups of people with offers carefully tailored to
              satisfy their needs.
            </Statement>
            <Ruled>
              <P>
                <Term>Socially responsible targeting</Term> requires ensuring
                that segmentation and targeting decisions serve the welfare of
                the targeted segment rather than exploiting its vulnerabilities.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                However, target marketing sometimes generates public controversy
                when marketers target vulnerable or disadvantaged populations
                (such as children or low-income borrowers) with harmful or
                high-cost products.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Marketing sugary cereals, high-caffeine energy drinks, or
                violent entertainment directly to young children through mobile
                games raises ethical and regulatory scrutiny.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Selecting a Segmentation and Targeting Strategy for an Athletic Brand
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-selecting-a-segmentation-and-targeting-strategy-for-an-athletic-brand"
        border
      >
        <SlideHeading kicker="Discussion:">
          Selecting a Segmentation and Targeting Strategy for an Athletic Brand
        </SlideHeading>
        <Prompt>
          A new athletic footwear startup has engineered a running shoe
          specifically designed to reduce knee impact for runners weighing over
          200 pounds. Using the four consumer segmentation bases, the five
          criteria for effective segmentation, and the targeting continuum,
          explain how the startup should define its target market and why
          concentrated (niche) marketing is superior to differentiated or
          undifferentiated marketing at launch.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Differentiation and Positioning Strategy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-differentiation-and-positioning-strategy"
        border
      >
        <PartHead n={3} title="Differentiation and Positioning Strategy" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Once a company has decided which segments of the market it will
            enter, it must{" "}
            <Tint>decide on its differentiation and positioning strategy</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              A <Term>product&apos;s position</Term> is the complex set of
              perceptions, impressions, and feelings that consumers hold for the
              product compared with competing products.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Perceptual Positioning Maps
          ================================================================ */}
      <Slide className={TIGHT} id="perceptual-positioning-maps" border>
        <SlideHeading>Perceptual Positioning Maps</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <P>
              Consumers position products in their minds with or without the
              help of marketers, because they cannot re-evaluate every product
              from scratch each time they buy.
            </P>
            <Ruled>
              <P>
                In planning their differentiation and positioning strategies,
                marketers prepare <Term>perceptual positioning maps</Term> that
                show consumer perceptions of their brands versus competing
                products on important buying dimensions.
              </P>
            </Ruled>
            <Ruled>
              <P>
                For example, an automaker might plot competing sport-utility
                vehicles on a two-axis map where the horizontal axis represents
                price (from economy to luxury) and the vertical axis represents
                orientation (from fuel efficiency to rugged off-road
                performance).
              </P>
            </Ruled>
            <Ruled>
              <P>
                The position of each circle on the map indicates the
                brand&apos;s perceived positioning on those two dimensions, and
                the size of the circle indicates the brand&apos;s relative
                market share, revealing{" "}
                <Tint>crowded zones and unserved market gaps</Tint>.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <PerceptualMap />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Choosing Competitive Advantages to Promote
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="choosing-competitive-advantages-to-promote"
        border
        exercise={exercise["choosing-competitive-advantages-to-promote"]}
      >
        <SlideHeading>Choosing Competitive Advantages to Promote</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              The differentiation and positioning task consists of three steps:
              identifying a set of possible differentiating competitive
              advantages, choosing the right competitive advantages, and
              selecting an overall positioning strategy.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A <Term>competitive advantage</Term> is an advantage over
              competitors gained by offering consumers greater value, either by
              charging lower prices or by providing more benefits that justify
              higher prices.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              Firms can differentiate their offerings along five lines:{" "}
              <Term>product</Term> (features, performance, style),{" "}
              <Term>services</Term> (speedy delivery, installation),{" "}
              <Term>channels</Term> (coverage, expertise), <Term>people</Term>{" "}
              (courteous, well-trained staff), or <Term>image</Term>{" "}
              (distinctive symbols and brand atmosphere).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Not every brand difference is worth promoting: a difference is
              worth establishing to the extent that it satisfies seven criteria:{" "}
              <Term>important</Term>, <Term>distinctive</Term>,{" "}
              <Term>superior</Term>, <Term>communicable</Term>,{" "}
              <Term>preemptive</Term>, <Term>affordable</Term>, and{" "}
              <Term>profitable</Term>.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Value Proposition Strategies
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="value-proposition-strategies"
        border
        exercise={exercise["value-proposition-strategies"]}
      >
        <SlideHeading>Value Proposition Strategies</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              The full positioning of a brand is called the brand&apos;s{" "}
              <Term>value proposition</Term>: the full mix of benefits on which
              a brand is differentiated and positioned.
            </Lead>
            <Ruled>
              <P>
                Five winning value propositions exist on the
                benefit-versus-price grid: <Term>More for More</Term> (luxury
                offerings providing upscale benefits at a high price) and{" "}
                <Term>More for the Same</Term> (offering comparable quality to
                luxury rivals at a lower price, as Lexus did when challenging
                Mercedes-Benz).
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>The Same for Less</Term> offers standard brands at deep
                discounts based on superior purchasing power and lower-cost
                operations, while <Term>Less for Much Less</Term> meets
                consumers&apos; lower performance or frill requirements at
                rock-bottom prices (such as budget airlines or no-frills
                motels).
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>More for Less</Term> is the most attractive value
                proposition in the short run, but in the long run companies find
                it very difficult to sustain offering more benefits while
                charging less than competitors.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ValueGrid />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Communicating and Delivering the Chosen Position
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-communicating-and-delivering-the-chosen-position"
        border
      >
        <PartHead
          n={4}
          title="Communicating and Delivering the Chosen Position"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Selecting a value proposition is only the starting point: the
            organization must{" "}
            <Tint>summarize its position clearly and align every operational decision</Tint>{" "}
            to deliver it.
          </Statement>
          <Ruled>
            <Lead>
              A positioning strategy succeeds only when target buyers experience
              the promised point of difference consistently across all four Ps.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Crafting a Formal Positioning Statement
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="crafting-a-formal-positioning-statement"
        border
      >
        <SlideHeading>Crafting a Formal Positioning Statement</SlideHeading>
        <Lead>
          Company and brand positioning should be summed up in a formal{" "}
          <Term>positioning statement</Term> that guides internal teams and
          external agencies.
        </Lead>
        <div className="mt-6 border-t border-[var(--rule)] pt-6">
          <Statement>
            The statement follows the standard structure: &quot;To (target
            segment and need) our (brand) is (concept) that (point of
            difference).&quot;
          </Statement>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Notice that the statement first states the product&apos;s
              membership in a category (its <Term>point of parity</Term>) and
              then shows its <Term>point of difference</Term> from other members
              of the same category.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Defining both category membership and the point of difference
              ensures that buyers know{" "}
              <Tint>
                what the offering can be compared against and why it is superior
              </Tint>{" "}
              for their specific need.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Delivering the Position Across the Marketing Mix
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="delivering-the-position-across-the-marketing-mix"
        border
      >
        <SlideHeading>
          Delivering the Position Across the Marketing Mix
        </SlideHeading>
        <Statement>
          Once it has chosen a position, the company must take{" "}
          <Tint>strong, concrete steps to deliver and communicate</Tint> the
          desired position to target consumers.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              All the company&apos;s marketing mix efforts must support the
              positioning strategy: if a firm decides to build a position on
              &quot;More for More&quot; quality and service, it must first
              engineer the product to deliver that quality.
            </P>
          </Ruled>
          <Ruled>
            <P>
              It must then charge the corresponding price, distribute through
              high-service retailers that reinforce the premium image, and
              advertise in media that reach quality-conscious buyers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Designing the <Term>marketing mix</Term> (product, price, place,
              and promotion) is therefore the operational working out of the
              tactical details of the positioning strategy.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Maintaining and Adapting Brand Positioning Over Time
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="maintaining-and-adapting-brand-positioning-over-time"
        border
      >
        <SlideHeading>
          Maintaining and Adapting Brand Positioning Over Time
        </SlideHeading>
        <div className="grid w-full gap-8 sm:grid-cols-2">
          <Numbered n={1}>
            <P>
              Establishing a clear position or changing an existing one usually
              takes a long time because consumer beliefs in memory shift
              gradually.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              By contrast, a position that took decades to build can be lost
              quickly if product quality slips or if the firm chases short-term
              sales with inconsistent promotions.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Once a company has built the desired position, it must take care
              to maintain the position through consistent performance and
              communication while monitoring changes in consumer wants and
              competitors&apos; strategies.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Rather than making abrupt, confusing shifts that alienate loyal
              customers, successful brands{" "}
              <Tint>evolve their positioning gradually</Tint> as market
              conditions change.
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Positioning for AI Assistants and Conversational Shortlists
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-positioning-for-ai-assistants-and-conversational-shortlists"
        border
      >
        <PartHead
          n={5}
          title="Positioning for AI Assistants and Conversational Shortlists"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Historically, positioning meant occupying a clear, distinctive place{" "}
            <Tint>in the minds of human target consumers</Tint>.
          </Statement>
          <Ruled>
            <Lead>
              As consumers increasingly ask conversational AI assistants for
              product recommendations, positioning now also requires occupying a
              clear, verifiable place in the information sources that AI
              assistants use to construct their shortlists.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Brand Positioning and the AI-Generated Consideration Set
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-positioning-and-the-ai-generated-consideration-set"
        border
        exercise={
          exercise["brand-positioning-and-the-ai-generated-consideration-set"]
        }
      >
        <SlideHeading>
          Brand Positioning and the AI-Generated Consideration Set
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <P>
              Consumers increasingly ask AI assistants natural-language
              questions such as &quot;Which running shoes are best for marathon
              training on concrete?&quot; instead of browsing store shelves or
              ten pages of web links.
            </P>
            <Ruled>
              <P>
                In response, the AI assistant synthesizes product pages,
                independent review sites, and comparison articles to return a
                compact shortlist of three to five recommended brands.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <AiConsiderationShortlist />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              A brand that is absent from that AI-generated shortlist fails to
              enter the consumer&apos;s <Term>consideration set</Term>,
              regardless of how memorable its television commercials are.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Positioning in an AI-mediated market therefore means{" "}
              <Tint>
                linking the brand name consistently to specific target segments,
                usage occasions, and verifiable points of difference
              </Tint>{" "}
              across all public text and catalog data.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Specific Evidence Versus Vague Puffery in AI Positioning
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="specific-evidence-versus-vague-puffery-in-ai-positioning"
        border
      >
        <SlideHeading>
          Specific Evidence Versus Vague Puffery in AI Positioning
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                Human consumers exposed to low-involvement image advertising may
                form a warm impression from a vague slogan such as &quot;The
                Ultimate Running Experience.&quot;
              </P>
            </Ruled>
            <Ruled>
              <Big>
                <Term>Vague puffery</Term> gives the language model no concrete
                attribute evidence with which to match the brand to a
                segment-specific query.
              </Big>
            </Ruled>
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                An AI assistant answering a specific user prompt, however,
                matches the user&apos;s stated constraints (&quot;wide toe
                box,&quot; &quot;carbon plate,&quot; &quot;cushioning tested for
                800 kilometers,&quot; &quot;under 180 dollars&quot;) against
                documented product facts.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Conversely, a brand that states its positioning clearly and
                supports its point of difference with{" "}
                <Tint>specific, consistent facts</Tint> across its website,
                retail listings, and third-party reviews is retrieved reliably
                when consumers state that need.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Auditing Brand Positioning Across AI Assistants
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="auditing-brand-positioning-across-ai-assistants"
        border
      >
        <SlideHeading>
          Auditing Brand Positioning Across AI Assistants
        </SlideHeading>
        <Lead>
          Just as marketers prepare perceptual positioning maps from human
          consumer surveys, they can map how conversational AI assistants
          position their brand relative to competitors.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              By prompting AI assistants across the key usage occasions and
              segment needs of the category, managers observe which brands are
              retrieved for each benefit and which attributes the assistant
              cites as each brand&apos;s strength.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If an AI assistant associates a brand with an outdated price tier
              or omits its primary point of difference, the marketing team can
              diagnose which product pages, schema feeds, or review summaries
              lack clear evidence.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Aligning human brand positioning with{" "}
              <Tint>machine-readable evidence</Tint> ensures that the
              brand&apos;s value proposition carries through whether the shopper
              searches personally or delegates the search to an AI assistant.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Auditing a Brand's Position Across Human and AI Channels
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-auditing-a-brands-position-across-human-and-ai-channels"
        border
      >
        <SlideHeading kicker="Discussion:">
          Auditing a Brand&apos;s Position Across Human and AI Channels
        </SlideHeading>
        <Prompt>
          A heritage cookware manufacturer positions its cast-iron skillets
          around the value proposition &quot;More for More,&quot; emphasizing
          generational durability and even heat retention in its print ads, but
          its online product pages list only dimensions, weight, and a generic
          paragraph of brand history. When young apartment dwellers ask AI
          assistants for &quot;durable non-toxic skillets for induction
          stoves,&quot; competing brands dominate the shortlist. Write a formal
          positioning statement for the brand and specify how it should align
          its product data, reviews, and communications so its position
          registers with both human buyers and AI assistants.
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
              Target marketing replaces one-size-fits-all mass marketing with a
              four-step customer-driven strategy: segmentation, targeting,
              differentiation, and positioning (STP).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Consumer markets are segmented using geographic, demographic,
              psychographic, and behavioral variables, while business markets
              add operating, purchasing, and situational variables, and
              effective segments must be measurable, accessible, substantial,
              differentiable, and actionable.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Market targeting evaluates segment size and growth, structural
              attractiveness, and company fit before choosing a coverage
              strategy along the continuum from undifferentiated and
              differentiated marketing to concentrated (niche) and
              micromarketing.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Perceptual positioning maps plot competing brands on key buying
              dimensions to identify market gaps and guide differentiation
              across product, service, channel, people, or image advantages.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              A differentiator is worth promoting when it is important,
              distinctive, superior, communicable, preemptive, affordable, and
              profitable, and is anchored in one of five winning value
              propositions (More for More, More for the Same, The Same for Less,
              Less for Much Less, or More for Less).
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Because consumers increasingly rely on conversational AI
              assistants to build their product shortlists, modern brand
              positioning must establish clear, fact-backed associations in both
              human memory and the public text and catalog sources that AI
              assistants consult.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
