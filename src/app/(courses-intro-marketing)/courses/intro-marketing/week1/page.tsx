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
  DelegatedShoppingSequence,
  FourPlusOne,
  LifetimeStream,
  NeedsWantsDemandsLanes,
  PerceivedValueBars,
  RelationshipGroups,
  SellingVersusMarketing,
  SocietalTriangle,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 1: INTRODUCTION TO MARKETING & THE MARKETING PROCESS
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week1() {
  return (
    <SlideDeck label="Week 1">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">
            Week 1
          </p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Introduction to Marketing &amp; The Marketing Process
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Marketing creates, communicates, and delivers value to{" "}
              <Tint>target customers and their delegated AI agents</Tint> in
              order to build durable relationships and capture value in return.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining Modern Marketing
          ================================================================ */}
      <Slide className={TIGHT} id="defining-modern-marketing" border>
        <SlideHeading>Defining Modern Marketing</SlideHeading>
        <Statement>
          <Term>Marketing</Term> is the process by which organizations engage
          customers, build strong customer relationships, and create customer
          value in order to capture value from customers in return.
        </Statement>
        <Lead className="mt-6">
          The discipline pursues a <Term>dual objective</Term>: attracting new
          buyers by promising superior value and retaining existing buyers by
          delivering ongoing satisfaction.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Every organization, whether a consumer packaged goods
              manufacturer, a software firm, a hospital, or a university, relies
              on marketing to connect its capabilities with societal needs.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Marketing begins well before a product is manufactured and
              continues long after a sale is completed.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Marketing Beyond Selling and Advertising
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="marketing-beyond-selling-and-advertising"
        border
      >
        <SlideHeading>Marketing Beyond Selling and Advertising</SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              In everyday speech, marketing is frequently equated with{" "}
              <Term>selling and advertising</Term>, which are only the most
              visible communication activities of a firm.
            </Statement>
            <Ruled>
              <P>
                Selling and advertising occur near the end of the marketing
                process, after the organization has already researched the
                market, designed the product, set the price, and arranged
                distribution.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                As management theorist <Term>Peter Drucker</Term> observed, the
                aim of marketing is to understand the customer so well that the
                product or service fits the buyer and sells itself.
              </P>
            </Ruled>
            <Ruled>
              <Big>
                Effective marketing therefore starts by diagnosing{" "}
                <Term>unmet customer problems</Term> rather than persuading
                people to buy whatever the factory happens to produce.
              </Big>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: The Evolution of Marketing Management
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-the-evolution-of-marketing-management"
        border
      >
        <PartHead n={1} title="The Evolution of Marketing Management" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Organizations have guided their marketplace activities through five
            competing <Term>management orientations</Term>: the production,
            product, selling, marketing, and societal marketing concepts.
          </Statement>
          <Ruled>
            <Lead>
              Tracing how these philosophies evolved clarifies why
              inward-looking operational efficiency or aggressive selling rarely
              sustains competitive advantage in modern markets.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Production and Product Orientations
          ================================================================ */}
      <Slide className={TIGHT} id="production-and-product-orientations" border>
        <SlideHeading>Production and Product Orientations</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              The <Term>production concept</Term> holds that consumers favor
              products that are widely available and inexpensive, so management
              should concentrate on production efficiency and broad
              distribution.
            </P>
            <P className="mt-4">
              This orientation succeeds only when demand exceeds supply or when
              manufacturing scale substantially lowers unit costs, as in
              commodity hardware or basic generic staples.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The <Term>product concept</Term> holds that consumers favor
              offerings with the highest quality, performance, or innovative
              features, leading management to focus on continuous engineering
              improvements.
            </P>
          </Ruled>
        </div>
        <div className="mt-8 w-full">
          <Ruled>
            <Statement>
              Both orientations look inward at the firm&apos;s factories and
              laboratories rather than outward at the customer&apos;s actual
              problem.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Selling Versus Marketing Orientations
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="selling-versus-marketing-orientations"
        border
        exercise={exercise["selling-versus-marketing-orientations"]}
      >
        <SlideHeading>Selling Versus Marketing Orientations</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Ruled>
              <P>
                The <Term>selling concept</Term> holds that consumers will not
                buy enough of the firm&apos;s offerings unless the organization
                undertakes a large-scale selling and promotional effort.
              </P>
              <P className="mt-3">
                It follows an <Term>inside-out sequence</Term>: starting at the
                factory, focusing on the firm&apos;s existing products, using
                heavy promotion, and seeking short-term profit through sales
                volume.
              </P>
            </Ruled>
            <Ruled>
              <P>
                The <Term>marketing concept</Term> holds that achieving
                organizational goals depends on identifying the needs and wants
                of target markets and delivering the desired satisfactions more
                effectively than competitors.
              </P>
              <P className="mt-3">
                It follows an <Term>outside-in sequence</Term>: starting with a
                well-defined market, focusing on underlying customer needs,
                coordinating all marketing activities, and earning profit
                through long-term customer satisfaction.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SellingVersusMarketing />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          The Societal Marketing Concept
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-societal-marketing-concept"
        border
        exercise={exercise["the-societal-marketing-concept"]}
      >
        <SlideHeading>The Societal Marketing Concept</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              The <Term>societal marketing concept</Term> questions whether
              satisfying immediate individual consumer wants always serves the
              long-term welfare of consumers and society.
            </Statement>
            <Ruled>
              <P>
                Fast food, disposable plastics, and high-emission vehicles may
                satisfy immediate consumer desires for convenience while
                imposing long-term health or environmental costs.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Under the societal marketing concept, marketing strategy
                delivers value to customers in a way that maintains or improves
                both the consumer&apos;s and society&apos;s well-being.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Managers applying this orientation balance three considerations
                simultaneously: <Term>company profits</Term>,{" "}
                <Term>consumer wants</Term>, and the{" "}
                <Term>long-run public interest</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SocietalTriangle />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Marketing Myopia and Need-Based Strategy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="marketing-myopia-and-need-based-strategy"
        border
      >
        <SlideHeading>Marketing Myopia and Need-Based Strategy</SlideHeading>
        <Statement>
          <Term>Marketing myopia</Term> occurs when sellers pay more attention
          to the specific physical products they offer than to the underlying
          benefits and experiences those products produce (Levitt, 1960).
        </Statement>
        <Lead className="mt-5">
          A firm suffering from marketing myopia defines its industry by its
          current technology rather than by the customer problem it solves.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Legacy railroad companies lost passenger and freight business
              because executives defined their industry as railroads rather than
              transportation.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Photographic film manufacturers struggled during the rise of
              digital imaging when they defined their business as chemical film
              paper rather than memory preservation.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Defining a market around <Term>enduring customer needs</Term>{" "}
              allows a firm to adapt its products when underlying technologies
              change.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: Customer Needs, Wants, and Market Offerings
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-customer-needs-wants-and-market-offerings"
        border
      >
        <PartHead n={2} title="Customer Needs, Wants, and Market Offerings" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            The foundational building blocks of marketing analysis are{" "}
            <Term>human needs</Term>, culturally shaped <Term>wants</Term>, and
            purchasing-power-backed <Term>demands</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Marketers design combinations of goods, services, and experiences
              to satisfy these wants and evaluate success through customer
              perceived value and satisfaction.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Needs, Wants, and Market Demands
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="needs-wants-and-market-demands"
        border
        exercise={exercise["needs-wants-and-market-demands"]}
      >
        <SlideHeading>Needs, Wants, and Market Demands</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              <Term>Human needs</Term> are states of felt deprivation that exist
              as part of the human condition, prior to any commercial influence.
            </P>
            <P className="mt-3">
              Needs include <Term>physical requirements</Term> (food, clothing,
              shelter, safety), <Term>social requirements</Term> (belonging and
              affection), and <Term>individual requirements</Term> (knowledge
              and self-expression).
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Wants</Term> are the specific forms human needs take as they
              are shaped by culture, social context, and individual personality.
            </P>
            <P className="mt-3">
              A hungry commuter in Toronto may want a bagel and coffee, whereas
              a hungry commuter in Tokyo may want rice, grilled fish, and miso
              soup.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[1fr_1.45fr] lg:gap-12">
          <Ruled>
            <Statement>
              <Term>Demands</Term> are human wants that are backed by financial
              buying power, and marketers influence wants and demand rather than
              creating basic needs.
            </Statement>
          </Ruled>
          <Plate wide>
            <NeedsWantsDemandsLanes />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Market Offerings: Goods, Services, and Experiences
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="market-offerings-goods-services-and-experiences"
        border
      >
        <SlideHeading>
          Market Offerings: Goods, Services, and Experiences
        </SlideHeading>
        <Lead>
          Consumers satisfy their needs and wants through a{" "}
          <Term>market offering</Term>, which is any combination of physical
          goods, services, information, or experiences offered to a market.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              <Term>Physical goods</Term>, such as laptops, groceries, and
              winter coats, transfer tangible ownership from the seller to the
              buyer.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Services</Term>, such as retail banking, airline
              transportation, medical care, and cloud storage, consist of
              intangible activities and benefits that do not result in physical
              ownership.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Many firms also orchestrate structured{" "}
              <Term>customer experiences</Term>, such as theme parks or
              specialty coffee roasteries, that combine goods and services into
              a memorable environment.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Market offerings also extend beyond commercial products to include
              persons, places, organizations, public health campaigns, and
              social ideas.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Customer Perceived Value and Satisfaction
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customer-perceived-value-and-satisfaction"
        border
        exercise={exercise["customer-perceived-value-and-satisfaction"]}
      >
        <SlideHeading>Customer Perceived Value and Satisfaction</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Lead>
              Consumers typically confront a wide array of competing market
              offerings that could satisfy a given need.
            </Lead>
            <Ruled>
              <P>
                <Term>Customer perceived value</Term> is the buyer&apos;s
                evaluation of the difference between all the benefits and all
                the costs of a marketing offer relative to competing
                alternatives.
              </P>
              <P className="mt-3">
                Benefits include functional performance, reliability, service
                quality, and brand prestige, while costs include monetary price,
                search time, physical effort, and psychological risk.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Customer satisfaction</Term> is the extent to which a
                product&apos;s perceived performance matches a buyer&apos;s
                prior expectations.
              </P>
              <P className="mt-3">
                When performance falls below expectations, the buyer is{" "}
                <Term>dissatisfied</Term>, whereas performance that matches or
                exceeds expectations produces <Term>satisfaction</Term> or{" "}
                <Term>delight</Term>.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PerceivedValueBars />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Exchanges, Transactions, and Markets
          ================================================================ */}
      <Slide className={TIGHT} id="exchanges-transactions-and-markets" border>
        <SlideHeading>Exchanges, Transactions, and Markets</SlideHeading>
        <ol className="grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Exchange</Term> is the act of obtaining a desired object
              from someone by offering something of value in return, such as
              money, a vote, or attention.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              A <Term>transaction</Term> is Marketing&apos;s unit of
              measurement: a completed trade of values between two or more
              parties under agreed conditions, time, and place.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              In marketing analysis, a <Term>market</Term> is the set of all
              actual and potential buyers of a product or service who share a
              particular need or want that can be satisfied through exchange.
            </P>
          </Numbered>
        </ol>
        <div className="mt-8 w-full">
          <Ruled>
            <Statement>
              Modern marketers seek to move beyond isolated one-time
              transactions toward <Term>ongoing exchange relationships</Term>{" "}
              with their target markets.
            </Statement>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Diagnosing Marketing Myopia
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-diagnosing-marketing-myopia"
        border
      >
        <SlideHeading kicker="Discussion:">
          Diagnosing Marketing Myopia
        </SlideHeading>
        <Prompt>
          A legacy manufacturer of gas-powered residential lawn mowers defines
          its core business as &ldquo;small internal-combustion yard
          engines.&rdquo; How does this product-centered definition expose the
          firm to marketing myopia as battery-electric tools, robotic mowers,
          and drought-resistant landscaping grow, and how should management
          redefine the customer need it serves?
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: The Five-Step Marketing Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-the-five-step-marketing-process"
        border
      >
        <PartHead n={3} title="The Five-Step Marketing Process" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            To translate customer orientation into daily management practice,
            organizations follow a structured{" "}
            <Term>five-step marketing process</Term>.
          </Statement>
          <Ruled>
            <Lead>
              In the first four steps, the firm works to understand consumers,
              create customer value, and build strong relationships. In the
              fifth step, the firm captures value from customers in return.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Overview of the Five-Step Marketing Process
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="overview-of-the-five-step-marketing-process"
        border
        exercise={exercise["overview-of-the-five-step-marketing-process"]}
      >
        <SlideHeading>Overview of the Five-Step Marketing Process</SlideHeading>
        <Plate wide>
          <FourPlusOne />
        </Plate>
        <ol className="mt-6 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <Numbered n={1}>
            <P>
              <Term>Step 1</Term> is understanding the marketplace and customer
              needs and wants through systematic research and data analysis.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Step 2</Term> is designing a customer-value-driven marketing
              strategy that selects target customers and defines a clear value
              proposition.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Step 3</Term> is constructing an integrated marketing
              program that delivers the promised value through product, price,
              place, and promotion decisions.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              <Term>Step 4</Term> is engaging customers, building profitable
              relationships, and creating customer satisfaction and loyalty.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              <Term>Step 5</Term> is capturing value from customers in return in
              the form of current sales, long-term profits, and customer equity.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Selecting Customers and Defining a Value Proposition
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="selecting-customers-and-defining-a-value-proposition"
        border
      >
        <SlideHeading>
          Selecting Customers and Defining a Value Proposition
        </SlideHeading>
        <Lead>
          Designing a customer-driven marketing strategy requires answering two
          foundational questions: which customers will we serve, and how will we
          create value for them?
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Because no firm can serve every buyer in every way, managers use{" "}
              <Term>market segmentation</Term> to divide the market into
              distinct groups and <Term>market targeting</Term> to select which
              segments to enter.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The firm then formulates a <Term>value proposition</Term>, which
              is the full set of benefits or values it promises to deliver to
              consumers to satisfy their needs.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A discounted regional airline promises low fares without frills,
              whereas an international business carrier promises workspace
              comfort, priority boarding, and schedule flexibility.
            </P>
          </Ruled>
          <Ruled>
            <P>
              A clear value proposition differentiates the brand from
              competitors and answers the buyer&apos;s question: &ldquo;Why
              should I buy your brand rather than another?&rdquo;
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Integrated Marketing Mix: The Four Ps
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-integrated-marketing-mix-the-four-ps"
        border
        exercise={exercise["the-integrated-marketing-mix-the-four-ps"]}
      >
        <SlideHeading>The Integrated Marketing Mix: The Four Ps</SlideHeading>
        <Lead>
          While the marketing strategy specifies which customers to serve and
          what value to promise, the <Term>marketing mix</Term> (the{" "}
          <Term>Four Ps</Term>) turns that strategy into concrete action.
        </Lead>
        <ol className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Numbered n={1}>
            <P>
              <Term>Product</Term> means creating a need-satisfying market
              offering, including its design, features, quality, brand name,
              packaging, and support services.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Price</Term> means determining the monetary amount customers
              must pay to obtain the offering, including list prices, discounts,
              credit terms, and subscription structures.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Place</Term> (or distribution) means managing the company
              activities and partner channels that make the offering available
              and accessible to target consumers.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              <Term>Promotion</Term> means executing the activities that
              communicate the merits of the offering and persuade target
              customers to buy it.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Part 4: Customer Relationships and Customer Equity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-4-customer-relationships-and-customer-equity"
        border
      >
        <PartHead n={4} title="Customer Relationships and Customer Equity" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Delivering superior value through the marketing mix lays the
            foundation for step four (building customer relationships) and step
            five (capturing value in return).
          </Statement>
          <Ruled>
            <Lead>
              Managers evaluate the financial return of these relationships
              using <Term>customer lifetime value</Term>,{" "}
              <Term>share of customer</Term>, and <Term>customer equity</Term>.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Customer Relationship Management and Engagement
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customer-relationship-management-and-engagement"
        border
      >
        <SlideHeading>
          Customer Relationship Management and Engagement
        </SlideHeading>
        <Statement>
          <Term>Customer relationship management</Term> (<Term>CRM</Term>) is
          the overall process of building and maintaining profitable customer
          relationships by delivering superior customer value and satisfaction.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Firms practice <Term>selective relationship management</Term>,
              using profitability analysis to identify which customers warrant
              high-touch personalized service and which are better served
              through automated self-service.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Customer engagement marketing</Term> fosters direct and
              continuous customer involvement in shaping brand conversations,
              experiences, and communities rather than treating buyers as
              passive recipients of ads.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Digital platforms also create{" "}
              <Term>customer-managed relationships</Term>, in which consumers
              actively choose how, when, and through which channels they
              interact with brands and review products publicly.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Customer Lifetime Value and Share of Customer
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customer-lifetime-value-and-share-of-customer"
        border
        exercise={exercise["customer-lifetime-value-and-share-of-customer"]}
      >
        <SlideHeading>
          Customer Lifetime Value and Share of Customer
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          <Ruled>
            <P>
              <Term>Customer lifetime value</Term> (<Term>CLV</Term>) is the
              present value of the entire stream of purchases and profit margins
              a customer generates over a lifetime of patronage.
            </P>
            <P className="mt-3">
              When a dissatisfied grocery shopper switches stores over a
              five-dollar dispute, the retailer loses not five dollars, but tens
              of thousands of dollars in cumulative household spending over the
              next decade.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Share of customer</Term> (or <Term>share of wallet</Term>)
              is the portion of a customer&apos;s total purchasing in a product
              category that a firm captures.
            </P>
            <P className="mt-3">
              Banks increase share of customer by offering checking-account
              holders mortgages and wealth management, and bookstores do so by
              recommending audiobooks and e-readers.
            </P>
          </Ruled>
        </div>
        <div className="mt-6 w-full">
          <Plate wide>
            <LifetimeStream />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Customer Equity and Relationship Groups
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="customer-equity-and-relationship-groups"
        border
        exercise={exercise["customer-equity-and-relationship-groups"]}
      >
        <SlideHeading>Customer Equity and Relationship Groups</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              <Term>Customer equity</Term> is the total combined customer
              lifetime values of all of the company&apos;s current and potential
              customers.
            </Statement>
            <Ruled>
              <P>
                Whereas current sales and market share reflect past performance,
                customer equity measures the future revenue-generating value of
                the firm&apos;s customer base.
              </P>
            </Ruled>
            <Ruled>
              <P>
                Marketers classify customers along two dimensions,{" "}
                <Term>potential profitability</Term> and{" "}
                <Term>projected loyalty</Term>, into four relationship groups.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>True friends</Term> are both highly profitable and loyal,
                warranting continuous investment to nurture and retain them,
                whereas <Term>butterflies</Term> are profitable but transient.
              </P>
              <P className="mt-3">
                <Term>Strangers</Term> have low profitability and little
                loyalty, and <Term>barnacles</Term> are highly loyal but
                generate too little revenue to cover the cost of serving them
                unless their spending increases or service costs fall.
              </P>
            </Ruled>
          </div>
          <Plate>
            <RelationshipGroups />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: Marketing to Consumers and Their AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-5-marketing-to-consumers-and-their-ai-agents"
        border
      >
        <PartHead
          n={5}
          title="Marketing to Consumers and Their AI Agents"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Consumers increasingly delegate parts of their shopping journey to{" "}
            <Term>artificial intelligence agents</Term> that search, compare,
            and purchase products on their behalf.
          </Statement>
          <Ruled>
            <Lead>
              When an AI agent acts between the consumer and the firm, every
              concept in Week 1, from wants and perceived value to the marketing
              mix, operates across two audiences.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Delegated Shopping and the AI Agent as Surrogate Buyer
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="delegated-shopping-and-the-ai-agent-as-surrogate-buyer"
        border
      >
        <SlideHeading>
          Delegated Shopping and the AI Agent as Surrogate Buyer
        </SlideHeading>
        <Lead>
          An <Term>AI shopping agent</Term> is a software system built on a
          large language model that can search catalogs, compare competing
          offers, and complete transactions on a person&apos;s behalf.
        </Lead>
        <div className="mt-6 w-full">
          <Plate wide>
            <DelegatedShoppingSequence />
          </Plate>
        </div>
        <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
          <Ruled>
            <P>
              In <Term>delegated shopping</Term>, the human consumer states a
              want and a budget constraint, such as a waterproof hiking jacket
              under 150 dollars, and the AI agent conducts the search and
              comparison.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The underlying need, the culturally shaped want, and the financial
              buying power still belong to the human consumer, while the AI
              agent acts as an <Term>operational surrogate</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              After delivery, the human consumer wears the jacket in the rain,
              experiences its actual performance, and forms the{" "}
              <Term>postpurchase satisfaction</Term> judgment that drives
              customer lifetime value.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Communicating Value to Consumers and AI Agents
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="communicating-value-to-consumers-and-ai-agents"
        border
      >
        <SlideHeading>
          Communicating Value to Consumers and AI Agents
        </SlideHeading>
        <Lead>
          Because the AI agent evaluates alternatives before the human consumer
          sees them, how a firm communicates customer value must address both
          the person and the software agent.
        </Lead>
        <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
          <Ruled>
            <P>
              A <Term>human shopper</Term> browsing a store or website responds
              to visual design, emotional storytelling, and brand imagery
              alongside price and features.
            </P>
          </Ruled>
          <Ruled>
            <P>
              An <Term>AI agent</Term> evaluates an offering strictly from the
              structured text and numbers it can read, including prices, unit
              weights, technical specifications, return policies, and verified
              customer reviews.
            </P>
          </Ruled>
          <Ruled>
            <P>
              If a brand&apos;s value proposition rests on superior durability
              or lower cost per unit, those facts must be stated clearly in{" "}
              <Term>machine-readable product data</Term> so the AI agent can
              include the brand in its comparison.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Modern marketing management therefore designs offerings that
              deliver real satisfaction to the human user while presenting
              clear, verifiable value to the AI agent that screens the market.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Balancing Acquisition and Retention
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-balancing-acquisition-and-retention"
        border
      >
        <SlideHeading kicker="Discussion:">
          Balancing Acquisition and Retention
        </SlideHeading>
        <Prompt>
          A meal-kit subscription startup spends 85 dollars in digital
          advertising and introductory discounts to acquire each new household,
          earns 15 dollars in contribution margin per weekly box, and currently
          loses 60 percent of new subscribers within the first four weeks. Using
          customer perceived value, customer lifetime value, and the customer
          relationship groups matrix, explain why heavy acquisition spending is
          failing to build customer equity and propose how the firm should
          reallocate its marketing mix.
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
              Marketing is the process of creating, communicating, and
              delivering value to target customers in order to build durable
              relationships and capture value in return.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Among the five management orientations (production, product,
              selling, marketing, and societal marketing), sustainable success
              requires an outside-in focus on customer needs and long-run
              societal welfare rather than inside-out selling or product myopia.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Marketing analysis distinguishes inherent human needs from
              culturally shaped wants and purchasing-power-backed demands, which
              are satisfied through market offerings combining goods, services,
              and experiences.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Customer perceived value weighs total benefits against total costs
              relative to competitors, while customer satisfaction compares
              perceived product performance against prior expectations.
            </P>
          </Numbered>
          <Numbered n={5}>
            <P>
              The five-step marketing process guides managers from understanding
              the marketplace and designing a value-driven strategy
              (segmentation, targeting, and value proposition) through the
              integrated Four Ps (product, price, place, and promotion) to
              relationship building and value capture.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Capturing value is measured through customer lifetime value, share
              of customer, and total customer equity across true friends,
              butterflies, barnacles, and strangers.
            </P>
          </Numbered>
          <Numbered n={7}>
            <P>
              As consumers delegate product search and comparison to AI agents,
              marketers must deliver postpurchase satisfaction to the human user
              while making product value legible to the AI agent that evaluates
              competing offers.
            </P>
          </Numbered>
        </ol>
      </Slide>
    </SlideDeck>
  );
}
