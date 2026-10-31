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
  AiServiceComparison,
  BrandDevelopmentMatrix,
  NpdStaircase,
  PlcCurve,
  ServiceHub,
  ThreeProductLevels,
} from "./visuals";

// ============================================================================
// INTRODUCTION TO MARKETING | WEEK 7: PRODUCT AND SERVICE STRATEGIES (THE FIRST P)
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// Only slides carrying a [figure: ...] tag in content.md render a plate from
// ./visuals.tsx. Exercises live in ./exercises.json.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

export default function Week7() {
  return (
    <SlideDeck label="Week 7">
      {/* ================================================================
          Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="left">
        <div className="w-full max-w-4xl">
          <p className="type-label text-[var(--ink-3)]">Week 7</p>
          <p className="type-caption mt-2">
            Introduction to Marketing | Davood Wadi, PhD
          </p>
          <Title className="mt-6">
            Product and Service Strategies (The First P)
          </Title>
          <div className="mt-10 max-w-3xl border-t border-[var(--rule)] pt-8">
            <p className="type-quote">
              Product and service strategy is the{" "}
              <Tint>foundation of the marketing mix</Tint>, governing how
              organizations classify offerings, manage the product life cycle,
              develop new products, build brand equity, and manage the
              characteristics of human-delivered and AI-delivered services.
            </p>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Defining a Product and the Three Levels of an Offering
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="defining-a-product-and-the-three-levels-of-an-offering"
        border
      >
        <SlideHeading>
          Defining a Product and the Three Levels of an Offering
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              A <Term>product</Term> is anything that can be offered to a market
              for attention, acquisition, use, or consumption that might satisfy
              a want or need, encompassing physical objects, services, events,
              persons, places, organizations, and ideas.
            </Statement>
            <Ruled>
              <Lead>
                Product planners design offerings across{" "}
                <Tint>three concentric levels</Tint>.
              </Lead>
            </Ruled>
          </div>
          <Plate wide>
            <ThreeProductLevels />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              The first and most basic level is <Term>core customer value</Term>
              , which addresses the question: &ldquo;What is the buyer really
              buying?&rdquo; (for example, a buyer of a drill bit is buying a
              quarter-inch hole, and a buyer of a tablet is buying mobile
              entertainment and productivity).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              The second level is the <Term>actual product</Term>, which turns
              the core benefit into a tangible design with product features,
              styling, quality level, a brand name, and packaging.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              The third level is the <Term>augmented product</Term>, which
              surrounds the core benefit and actual product with additional
              consumer services and benefits such as warranty coverage, free
              tech support, financing, and repair services.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Social Responsibility in Product and Service Decisions
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="social-responsibility-in-product-and-service-decisions"
        border
      >
        <SlideHeading>
          Social Responsibility in Product and Service Decisions
        </SlideHeading>
        <Statement>
          Product and service decisions carry major{" "}
          <Tint>legal and ethical responsibilities</Tint> regarding product
          safety, warranty honesty, and environmental sustainability.
        </Statement>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              Manufacturers must comply with strict{" "}
              <Term>safety regulations</Term> and are legally liable when
              defective designs or inadequate warnings injure consumers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              When a product defect is discovered after launch, rapid,
              transparent <Term>product recalls</Term> protect consumer welfare
              and preserve long-run brand trust far better than denial or delay.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Designing durable, repairable products and{" "}
              <Term>recyclable packaging</Term> reduces lifecycle environmental
              impact while meeting rising consumer and regulatory expectations.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 1: Product Classifications and the Product Life Cycle
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-1-product-classifications-and-the-product-life-cycle"
        border
      >
        <PartHead
          n={1}
          title="Product Classifications and the Product Life Cycle"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Marketers classify products into{" "}
            <Tint>consumer and industrial categories</Tint> based on how buyers
            shop for and use them, and manage offerings across the five stages
            of the <Term>Product Life Cycle (PLC)</Term>.
          </Statement>
          <Ruled>
            <Lead>
              Matching marketing strategy to both the product classification and
              the current lifecycle stage prevents misallocated promotional and
              distribution spending.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Consumer Product Classifications
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="consumer-product-classifications"
        border
        exercise={exercise["consumer-product-classifications"]}
      >
        <SlideHeading>Consumer Product Classifications</SlideHeading>
        <Lead>
          <Term>Consumer products</Term> are goods and services bought by final
          consumers for personal consumption, classified into four groups
          according to how consumers go about buying them.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Convenience products</Term> are consumer products and
              services that the customer usually buys frequently, immediately,
              and with minimal comparison and buying effort (such as laundry
              detergent, candy, and fast food), priced low and placed in
              widespread locations.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Shopping products</Term> are less frequently purchased
              consumer products and services that customers compare carefully on
              suitability, quality, price, and style (such as furniture,
              clothing, and major appliances), distributed through fewer outlets
              with deeper sales support.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Specialty products</Term> have unique characteristics or
              brand identification for which a significant group of buyers is
              willing to make a special purchase effort (such as luxury watches
              or sports cars), and <Term>unsought products</Term> are items the
              consumer either does not know about or does not normally think of
              buying (such as life insurance or funeral services).
            </P>
          </Numbered>
        </div>
      </Slide>

      {/* ================================================================
          Industrial Products and Other Marketable Entities
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="industrial-products-and-other-marketable-entities"
        border
      >
        <SlideHeading>
          Industrial Products and Other Marketable Entities
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_1.35fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              <Term>Industrial products</Term> are those purchased for further
              processing or for use in conducting a business, so the distinction
              between a consumer product and an industrial product is based on{" "}
              <Tint>the purpose for which the item is bought</Tint>.
            </Statement>
            <Ruled>
              <P>
                If a person buys a lawn mower for use around a home, the mower
                is a <Term>consumer product</Term>, whereas if the same person
                buys the identical lawn mower for use in a commercial
                landscaping business, it is an <Term>industrial product</Term>.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                Industrial products divide into three groups:{" "}
                <Term>materials and parts</Term> (raw materials and manufactured
                components), <Term>capital items</Term> (industrial
                installations and accessory equipment), and{" "}
                <Term>supplies and services</Term> (operating supplies and
                repair or advisory services).
              </P>
            </Ruled>
            <Ruled>
              <P>
                Beyond tangible goods and services, organizations also apply
                product marketing principles to market <Term>experiences</Term>,{" "}
                <Term>organizations</Term>, <Term>persons</Term>,{" "}
                <Term>places</Term>, and <Term>social ideas</Term>.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Stages of the Product Life Cycle: Development to Growth
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="stages-of-the-product-life-cycle-development-to-growth"
        border
        exercise={exercise["stages-of-the-product-life-cycle-development-to-growth"]}
      >
        <SlideHeading>
          Stages of the Product Life Cycle: Development to Growth
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <Statement>
            The <Term>Product Life Cycle (PLC)</Term> traces the course of a
            product&apos;s sales and profits over its lifetime across five
            stages: product development, introduction, growth, maturity, and
            decline.
          </Statement>
          <Plate wide>
            <PlcCurve />
          </Plate>
        </div>
        <ol className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Numbered n={1}>
            <P>
              <Term>Product development</Term> begins when the company finds and
              develops a new product idea: during this stage, sales are zero and
              the company&apos;s investment costs mount.
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              <Term>Introduction</Term> is a period of slow sales growth as the
              product is introduced in the market, where profits are nonexistent
              because of the heavy expenses of product introduction and the
              primary goal is building awareness and trial.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              <Term>Growth</Term> is a period of rapid market acceptance and
              increasing profits as early adopters continue to buy and later
              buyers start following their lead, attracting new competitors and
              prompting the firm to expand distribution and add product
              features.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Maturity and Decline Stages of the PLC
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="maturity-and-decline-stages-of-the-plc"
        border
      >
        <SlideHeading>Maturity and Decline Stages of the PLC</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Maturity</Term> is a period of slowdown in sales growth
              because the product has achieved acceptance by most potential
              buyers, causing industry profits to level off or decline under
              intense price and promotional competition.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Product managers prevent stagnation during maturity by{" "}
              <Term>modifying the market</Term> (finding new users or usage
              occasions), <Term>modifying the product</Term> (improving quality,
              features, or style), or <Term>modifying the marketing mix</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Decline</Term> is the period when sales fall off and profits
              drop due to technological advances, shifts in consumer tastes, or
              increased domestic and foreign competition.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Management must regularly audit aging products and decide whether
              to <Term>maintain</Term> the brand without change,{" "}
              <Term>harvest</Term> the product (reducing support costs to
              extract remaining cash flow), or <Term>drop</Term> the product
              from the line.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 2: The New Product Development Process and AI
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-2-the-new-product-development-process-and-ai"
        border
      >
        <PartHead n={2} title="The New Product Development Process and AI" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Because existing products eventually enter maturity and decline,
            firms must excel at <Tint>developing new products</Tint> through
            either acquisition or internal research and development.
          </Statement>
          <Ruled>
            <Lead>
              To reduce the high risk of new-product failure, organizations
              manage innovation through a systematic eight-step{" "}
              <Term>new product development process</Term>, now accelerated in
              its early steps by artificial intelligence.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Idea Generation to Marketing Strategy Development
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="idea-generation-to-marketing-strategy-development"
        border
        exercise={exercise["idea-generation-to-marketing-strategy-development"]}
      >
        <SlideHeading>
          Idea Generation to Marketing Strategy Development
        </SlideHeading>
        <ol className="grid w-full gap-6 md:grid-cols-2">
          <Numbered n={1}>
            <P>
              Step 1 is <Term>idea generation</Term>, the systematic search for
              new product ideas from internal sources (researchers, engineers,
              and salespeople) and external sources (customers, competitors,
              distributors, suppliers, and crowdsourcing).
            </P>
          </Numbered>
          <Numbered n={2}>
            <P>
              Step 2 is <Term>idea screening</Term>, which spots good ideas and
              drops poor ones as early as possible using structured criteria
              such as whether the product is real, winnable, and worth doing.
            </P>
          </Numbered>
          <Numbered n={3}>
            <P>
              Step 3 is <Term>concept development and testing</Term>: a{" "}
              <Term>product idea</Term> is an idea for a possible product, a{" "}
              <Term>product concept</Term> is a detailed version of the idea
              stated in meaningful consumer terms, and{" "}
              <Term>concept testing</Term> presents the concept to target
              consumers to gauge their reactions.
            </P>
          </Numbered>
          <Numbered n={4}>
            <P>
              Step 4 is <Term>marketing strategy development</Term>, designing
              an initial marketing strategy for introducing the product based on
              the product concept, specifying the target market, value
              proposition, and first-year sales and profit goals.
            </P>
          </Numbered>
        </ol>
        <Plate wide className="mt-6">
          <NpdStaircase active={[0, 1, 2, 3]} />
        </Plate>
      </Slide>

      {/* ================================================================
          Business Analysis to Commercialization
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="business-analysis-to-commercialization"
        border
      >
        <SlideHeading>Business Analysis to Commercialization</SlideHeading>
        <ol className="grid w-full gap-8 md:grid-cols-2">
          <Numbered n={5}>
            <P>
              Step 5 is <Term>business analysis</Term>, a review of the sales,
              costs, and profit projections for a new product to find out
              whether these factors satisfy the company&apos;s objectives.
            </P>
          </Numbered>
          <Numbered n={6}>
            <P>
              Step 6 is <Term>product development</Term>, in which research and
              development or engineering turns the product concept into a
              physical product (or functional software prototype) and conducts
              rigorous functional and consumer tests.
            </P>
          </Numbered>
          <Numbered n={7}>
            <P>
              Step 7 is <Term>test marketing</Term>, the stage at which the
              product and its proposed marketing program are tested in realistic
              market settings (standard, controlled, or simulated test markets)
              before full-scale expense.
            </P>
          </Numbered>
          <Numbered n={8}>
            <P>
              Step 8 is <Term>commercialization</Term>, introducing the new
              product into the market, which requires deciding on launch timing
              and whether to roll out in a single locality, a region, or
              internationally.
            </P>
          </Numbered>
        </ol>
      </Slide>

      {/* ================================================================
          Artificial Intelligence in New Product Development
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="artificial-intelligence-in-new-product-development"
        border
        exercise={exercise["artificial-intelligence-in-new-product-development"]}
      >
        <SlideHeading>
          Artificial Intelligence in New Product Development
        </SlideHeading>
        <Lead>
          <Term>Artificial intelligence</Term> now accelerates the early stages
          of the new product development pipeline while leaving later economic
          and market validation dependent on{" "}
          <Tint>real-world evidence</Tint>.
        </Lead>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              In Step 1 (<Term>idea generation</Term>), generative AI models can
              analyze thousands of customer complaints, online reviews, and
              patent filings to propose hundreds of candidate product ideas in
              minutes, shifting managerial effort toward rigorous screening in
              Step 2.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In Step 3 (<Term>concept development and testing</Term>),
              marketers can generate rapid visual renderings of product concepts
              and screen preliminary wording against{" "}
              <Term>synthetic AI personas</Term> before fielding expensive human
              concept tests.
            </P>
          </Ruled>
          <Ruled>
            <P>
              In Step 6 (<Term>product development</Term>), computer-aided{" "}
              <Term>generative design</Term> and coding assistants help
              engineers iterate physical prototypes and software interfaces
              faster.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              However, Step 5 (<Term>business analysis</Term>), Step 7 (
              <Term>test marketing</Term>), and Step 8 (
              <Term>commercialization</Term>) cannot be simulated away: actual
              unit manufacturing costs, retail shelf acceptance, and repeat
              purchase rates still depend on real suppliers and real paying
              customers.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Managing Product Life Cycle Decline and Innovation
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-managing-product-life-cycle-decline-and-innovation"
        border
      >
        <SlideHeading kicker="Discussion:">
          Managing Product Life Cycle Decline and Innovation
        </SlideHeading>
        <Prompt>
          A consumer electronics company earns steady cash flow from its mature
          wired desktop keyboards, while sales of its legacy point-and-shoot
          digital cameras have fallen by 25 percent per year for five years due
          to smartphone photography. Using the Product Life Cycle and the
          eight-step new product development process, evaluate whether the firm
          should maintain, harvest, or drop the camera line, and explain how it
          should deploy cash from its keyboard line to fund new product
          development.
        </Prompt>
      </Slide>

      {/* ================================================================
          Part 3: Individual Product Decisions, Branding, and Packaging
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="part-3-individual-product-decisions-branding-and-packaging"
        border
      >
        <PartHead
          n={3}
          title="Individual Product Decisions, Branding, and Packaging"
        />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Beyond developing new offerings, marketers make ongoing strategic
            decisions regarding{" "}
            <Tint>
              individual product attributes, branding, packaging, labeling, and
              product lines
            </Tint>
            .
          </Statement>
          <Ruled>
            <Lead>
              Strong branding and packaging transform a commodity item into a
              differentiated market offering with enduring customer equity.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Product Attributes, Packaging, and Labeling
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="product-attributes-packaging-and-labeling"
        border
      >
        <SlideHeading>Product Attributes, Packaging, and Labeling</SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Developing a product or service involves defining the benefits
              that it will offer, communicated and delivered by{" "}
              <Term>product attributes</Term> such as{" "}
              <Term>product quality</Term> (performance quality and conformance
              quality), <Term>product features</Term>, and{" "}
              <Term>product style and design</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Good <Term>design</Term> goes beyond superficial skin-deep
              styling: it begins with observing how customers use the product
              and shapes both appearance and usefulness.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Packaging</Term> involves designing and producing the
              container or wrapper for a product: in self-service retail and
              e-commerce fulfillment, the package protects the item, prevents
              tampering, reduces shipping damage, and acts as a critical
              five-second commercial on the shelf.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Labeling</Term>, ranging from simple tags attached to
              products to complex graphics that are part of the package,
              identifies the product or brand, describes who made it and what it
              contains, promotes the brand, and complies with statutory
              unit-pricing, nutrition, and safety laws.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Brand Equity and Brand Sponsorship
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-equity-and-brand-sponsorship"
        border
        exercise={exercise["brand-equity-and-brand-sponsorship"]}
      >
        <SlideHeading>Brand Equity and Brand Sponsorship</SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              A <Term>brand</Term> is a name, term, sign, symbol, or design, or
              a combination of these, that identifies the maker or seller of a
              product or service and differentiates it from competitors.
            </Statement>
            <Ruled>
              <P>
                <Term>Brand equity</Term> is the differential effect that
                knowing the brand name has on customer response to the product
                or its marketing: a brand has positive brand equity when
                consumers react more favorably to it than to an unbranded or
                generic version of the same product.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                Building a strong brand starts with{" "}
                <Term>brand positioning</Term> (anchoring the brand on desirable
                attributes, benefits, or deep beliefs and values) and selecting
                a protectable, distinctive <Term>brand name</Term>.
              </P>
            </Ruled>
            <Ruled>
              <P>
                A manufacturer has four <Term>brand sponsorship</Term> options:
                launching a <Term>national</Term> (or manufacturer&apos;s)
                brand, selling to resellers who apply a <Term>private</Term> (or
                store) brand, marketing under a <Term>licensed brand</Term> name
                or character, or joining forces with another firm in a{" "}
                <Term>co-branded</Term> offering.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Brand Development and Product Line Strategy
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="brand-development-and-product-line-strategy"
        border
      >
        <SlideHeading>Brand Development and Product Line Strategy</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <Statement>
            A company has <Tint>four choices</Tint> when it comes to developing
            brands across existing or new brand names and existing or new
            product categories.
          </Statement>
          <Plate wide>
            <BrandDevelopmentMatrix />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          <Ruled>
            <P>
              <Term>Line extensions</Term> occur when a company extends existing
              brand names to new forms, colors, sizes, ingredients, or flavors
              of an existing product category, whereas{" "}
              <Term>brand extensions</Term> extend an existing brand name to a
              new product category.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Multibrands</Term> involve introducing additional brand
              names in the same product category to appeal to distinct segments
              and occupy more retailer shelf space, and <Term>new brands</Term>{" "}
              are created when entering a new category for which none of the
              company&apos;s current brand names are appropriate.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Managers also coordinate the firm&apos;s{" "}
              <Term>product lines</Term> (by <Term>line filling</Term> within
              the current range or <Term>line stretching</Term> upward or
              downward) and manage the overall <Term>product mix</Term> across
              its width, length, depth, and consistency.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 4: Services Marketing Strategy
          ================================================================ */}
      <Slide className={TIGHT} id="part-4-services-marketing-strategy" border>
        <PartHead n={4} title="Services Marketing Strategy" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Services have grown to account for{" "}
            <Tint>the majority of gross domestic product and employment</Tint>{" "}
            in advanced economies, spanning banking, healthcare, hospitality,
            education, and telecommunications.
          </Statement>
          <Ruled>
            <Lead>
              Because services are intangible performances rather than physical
              objects, marketers must manage four distinct service
              characteristics and three types of service marketing.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Four Characteristics of Services
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-four-characteristics-of-services"
        border
        exercise={exercise["the-four-characteristics-of-services"]}
      >
        <SlideHeading>The Four Characteristics of Services</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5">
            <Statement>
              A company must consider four special{" "}
              <Term>service characteristics</Term> when designing marketing
              programs: intangibility, inseparability, variability, and
              perishability.
            </Statement>
            <Ruled>
              <P>
                <Term>Service intangibility</Term> means that services cannot be
                seen, tasted, felt, heard, or smelled before they are bought: to
                reduce buyer uncertainty, marketers &ldquo;manage the
                evidence&rdquo; by providing concrete signals of quality in
                their physical facilities, staff appearance, equipment, and
                communications.
              </P>
            </Ruled>
          </div>
          <Plate wide>
            <ServiceHub />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              <Term>Service inseparability</Term> means that services are
              produced and consumed at the same time and cannot be separated
              from their providers, making provider-customer interaction a core
              part of the product itself.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Service variability</Term> means that the quality of
              services depends on who provides them and when, where, and how
              they are provided, while <Term>service perishability</Term> means
              that services cannot be stored for later sale or use, requiring
              differential pricing or reservation systems to match supply and
              demand.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          The Service Profit Chain and Three Types of Service Marketing
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="the-service-profit-chain-and-three-types-of-service-marketing"
        border
      >
        <SlideHeading>
          The Service Profit Chain and Three Types of Service Marketing
        </SlideHeading>
        <div className="grid w-full items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-6">
            <Statement>
              Because service quality depends heavily on the interaction between
              frontline employees and customers, successful service firms focus
              on both their employees and their customers through the{" "}
              <Term>service profit chain</Term>.
            </Statement>
            <Ruled>
              <P>
                The service profit chain links service firm profits with
                employee and customer satisfaction across five links:{" "}
                <Term>internal service quality</Term>, satisfied and productive
                service employees, greater service value, satisfied and loyal
                customers, and healthy service profits and growth.
              </P>
            </Ruled>
          </div>
          <div className="grid min-w-0 gap-6">
            <Ruled>
              <P>
                <Term>External marketing</Term> covers the normal work of
                preparing, pricing, distributing, and promoting the service to
                customers.
              </P>
            </Ruled>
            <Ruled>
              <P>
                <Term>Internal marketing</Term> means that the service firm must
                orient and motivate its customer-contact employees and
                supporting service people to work as a team to provide customer
                satisfaction, while <Term>interactive marketing</Term> means
                that service quality depends heavily on the quality of the
                buyer-seller interaction during the service encounter.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          Managing Service Differentiation, Quality, and Productivity
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="managing-service-differentiation-quality-and-productivity"
        border
      >
        <SlideHeading>
          Managing Service Differentiation, Quality, and Productivity
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              When customers view the services of different providers as
              similar, they care less about the provider than the{" "}
              <Term>price</Term>.
            </P>
          </Ruled>
          <Ruled>
            <P>
              The solution to price competition is to develop a differentiated{" "}
              <Term>offer</Term>, <Term>delivery</Term>, and <Term>image</Term>{" "}
              through innovative features, superior service delivery processes,
              and recognizable symbols.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Delivering consistently high <Term>service quality</Term> is
              harder than controlling physical product defects, and requires
              empowering frontline staff to recover quickly when a service
              failure occurs: good <Term>service recovery</Term> can turn angry
              customers into loyal advocates.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Finally, service providers must increase{" "}
              <Term>service productivity</Term> carefully without pushing
              standardization and cost cutting so far that perceived service
              quality erodes.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Part 5: AI-Delivered Services
          ================================================================ */}
      <Slide className={TIGHT} id="part-5-ai-delivered-services" border>
        <PartHead n={5} title="AI-Delivered Services" />
        <div className="grid w-full gap-10 md:grid-cols-2 md:gap-12">
          <Statement>
            Many customer-facing services are now delivered{" "}
            <Tint>partly or wholly by artificial intelligence</Tint>, including
            automated customer-service agents, diagnostic triage tools, travel
            booking assistants, and tutoring platforms.
          </Statement>
          <Ruled>
            <Lead>
              Examining AI-delivered services through the four service
              characteristics reveals how automation transforms capacity and
              inseparability while introducing new forms of variability.
            </Lead>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          How Artificial Intelligence Reshapes the Four Service Characteristics
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="how-artificial-intelligence-reshapes-the-four-service-characteristics"
        border
        exercise={
          exercise[
            "how-artificial-intelligence-reshapes-the-four-service-characteristics"
          ]
        }
      >
        <SlideHeading>
          How Artificial Intelligence Reshapes the Four Service Characteristics
        </SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <Statement>
            Applying the four service characteristics to{" "}
            <Term>AI-delivered services</Term> clarifies what changes when
            software replaces or augments a frontline employee.
          </Statement>
          <Plate wide>
            <AiServiceComparison />
          </Plate>
        </div>
        <div className="mt-8 grid w-full gap-6 md:grid-cols-2">
          <Ruled>
            <P>
              Under <Term>inseparability</Term>, the service is still produced
              and consumed simultaneously during the customer&apos;s
              conversation, but delivery is separated from human labor shifts
              and is available instantly at any hour.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Under <Term>perishability</Term>, cloud-hosted AI systems can
              serve thousands of concurrent customers during a demand spike and
              scale down during quiet periods, easing the rigid capacity limits
              of human call centers.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Under <Term>variability</Term>, an AI system follows the same
              software instructions every time, yet large language models remain
              probabilistic and can return different answers to the identical
              question across runs (Wadi &amp; Fredette, 2025).
            </P>
          </Ruled>
          <Ruled>
            <P>
              Under <Term>intangibility</Term>, customers still cannot inspect
              the service outcome before using it, so{" "}
              <Term>transparent disclosure</Term> that the customer is
              interacting with an AI system is essential for trust.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Service Quality, Guardrails, and Human Escalation in AI Services
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="service-quality-guardrails-and-human-escalation-in-ai-services"
        border
      >
        <SlideHeading>
          Service Quality, Guardrails, and Human Escalation in AI Services
        </SlideHeading>
        <div className="grid w-full gap-8 md:grid-cols-2">
          <Ruled>
            <P>
              Because AI-delivered services exhibit{" "}
              <Term>probabilistic response variability</Term> (Wadi &amp;
              Fredette, 2025) and can occasionally hallucinate policy rules,
              firms must manage AI service quality as rigorously as they train
              human employees.
            </P>
          </Ruled>
          <Ruled>
            <P>
              Just as <Term>internal marketing</Term> prepares frontline
              workers, deploying an AI service agent requires grounding the
              model in verified company documentation, setting strict{" "}
              <Term>action guardrails</Term>, and auditing conversation logs
              continuously.
            </P>
          </Ruled>
          <Ruled>
            <P>
              <Term>Interactive marketing</Term> in an AI setting requires
              designing the handoff between the automated agent and human
              specialists.
            </P>
          </Ruled>
          <Ruled>
            <Big>
              Routine, low-risk tasks (such as checking order status or
              resetting a password) are resolved rapidly by the AI agent,
              whereas emotionally sensitive, complex, or high-stakes service
              failures must escalate immediately to an{" "}
              <Term>empowered human representative</Term>.
            </Big>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          Discussion: Designing a Hybrid Human-and-AI Service Recovery Workflow
          ================================================================ */}
      <Slide
        className={TIGHT}
        id="discussion-designing-a-hybrid-human-and-ai-service-recovery-workflow"
        border
      >
        <SlideHeading kicker="Discussion:">
          Designing a Hybrid Human-and-AI Service Recovery Workflow
        </SlideHeading>
        <Prompt>
          A national retail bank replaces half of its telephone customer-service
          staff with a conversational AI voice assistant to handle account
          inquiries, card replacements, and disputed fraud charges. Within two
          months, wait times fall by 70 percent, but customer satisfaction
          scores among fraud victims drop sharply. Using the four service
          characteristics, the service profit chain, and response variability in
          AI systems (Wadi &amp; Fredette, 2025), design a hybrid service
          workflow that specifies which inquiries the AI assistant should handle
          and when calls must route immediately to trained human specialists.
        </Prompt>
      </Slide>

      {/* ================================================================
          Key Takeaways
          ================================================================ */}
      <Slide className={TIGHT} id="key-takeaways" border>
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "A product is designed across three levels (core customer value, actual product, and augmented product) and classified into consumer products (convenience, shopping, specialty, and unsought) or industrial products.",
            "The Product Life Cycle (PLC) progresses across five stages (product development, introduction, growth, maturity, and decline), requiring shifts in marketing strategy and eventual decisions to maintain, harvest, or drop aging items.",
            "The eight-step new product development process moves systematically from idea generation, screening, concept testing, and marketing strategy development to business analysis, product development, test marketing, and commercialization.",
            "Generative AI accelerates early-stage idea generation, concept rendering, and synthetic pretesting, whereas business analysis, test marketing, and commercialization still require real cost data and real human buyers.",
            "Brand equity captures the differential value of the brand name, built through brand positioning, name selection, sponsorship (national, store, licensed, or co-branded), and development (line extensions, brand extensions, multibrands, or new brands), supported by functional packaging and compliant labeling.",
            "Services are defined by intangibility, inseparability, variability, and perishability, and when services are delivered by AI systems, capacity scales more flexibly while probabilistic output variability (Wadi & Fredette, 2025) and intangibility require ongoing quality testing, transparent disclosure, and human escalation paths.",
          ].map((item, i) => (
            <Numbered key={i} n={i + 1}>
              <P>{item}</P>
            </Numbered>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
