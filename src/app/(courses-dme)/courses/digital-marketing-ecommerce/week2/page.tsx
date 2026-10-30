"use client";

import React from "react";
import { SlideDeck, Slide, Title, Subtitle } from "@/components/slide-components/SlideComponents";
import { createExerciseLookup, type ExerciseInput } from "@/lib/course-exercise";
import { Plate, P, Lead, Term, Ruled, SlideHeading, Numbered, PartHead, Prompt } from "../_visuals/kit";
import exercisesData from "./exercises.json";
import {
  AgentCostReal,
  CatalogDepth,
  CheckoutFriction,
  ChoiceLevers,
  ClickMeter,
  ConversionMultiplier,
  DarkCheckout,
  FacetFilter,
  FrictionFixes,
  HiddenAttributes,
  HundredCarts,
  InspectionBudget,
  MobileShare,
  MugBanner,
  PdpAnatomy,
  QueryEngine,
  RecoveryDiscount,
  RedesignDrop,
  RenderTiming,
  RichResult,
  SessionLog,
  StoreToPage,
  ThreeTemplates,
  TierFraming,
  TrustLedger,
} from "./visuals";

// ============================================================================
// WEEK 2: STOREFRONT DESIGN, INFORMATION ARCHITECTURE, AND CONVERSION
// ============================================================================
// Every sentence on these slides is transcribed verbatim from content.md.
// the design only decides where each sentence sits and which catalogue plate
// is drawn beside it. Plates live in ./visuals.tsx.
// ============================================================================

const exercise = createExerciseLookup(exercisesData as ExerciseInput[]);

const BIG = "type-h2 !font-normal !text-[clamp(1.18rem,1.65vw,1.42rem)] !leading-snug";

export default function Week2Page() {
  return (
    <SlideDeck label="Week 2">
      {/* ================================================================
          01. Title Slide
          ================================================================ */}
      <Slide id="title-slide" align="center">
        <Subtitle variant="hero">Week 2: Digital Marketing &amp; E-Commerce</Subtitle>
        <Title className="mt-6 !max-w-[22ch]">Storefront Design, Information Architecture, and Conversion</Title>
        <p className="type-caption mt-2">Davood Wadi, PhD</p>
        <p className="type-quote mt-14 max-w-[50ch] border-t border-[var(--rule)] pt-10 !text-[clamp(1.3rem,2.1vw,1.8rem)]">
          Storefront architecture organizes product information to{" "}
          <span className="text-[var(--signal)]">minimize search friction and uncertainty</span> for both human
          shoppers and autonomous AI agents.
        </p>
      </Slide>

      {/* ================================================================
          02. The Storefront as a Decision Environment [no-exercise]
          ================================================================ */}
      <Slide id="the-storefront-as-a-decision-environment" border className="!py-8">
        <SlideHeading>The Storefront as a Decision Environment</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              A physical store guides shoppers through aisles, endcaps, signage, and sales associates who answer
              questions on the spot.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              An online storefront must perform every one of those functions through information architecture,
              interface layout, and structured data.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <StoreToPage />
        </Plate>
        <div className="mt-5 grid w-full gap-6 md:grid-cols-3 md:gap-8">
          <Ruled weight="thin">
            <P>
              Because online buyers cannot touch or try a physical product before ordering, the storefront&apos;s
              primary job is to <Term tone="signal">reduce product uncertainty and transaction friction</Term>.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Small increases in cognitive load, page latency, or checkout complexity cause prospective buyers to
              abandon the session before completing a purchase.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              At the same time, modern storefronts are read not only by humans looking at rendered pixels, but also by
              search crawlers and AI shopping agents parsing the underlying code.
            </P>
          </Ruled>
        </div>
      </Slide>

      {/* ================================================================
          03. Information Architecture in E-Commerce [no-exercise]
          ================================================================ */}
      <Slide id="information-architecture-in-e-commerce" border className="!py-8">
        <SlideHeading>Information Architecture in E-Commerce</SlideHeading>
        <Lead className="!max-w-none">
          <Term tone="ink">Information architecture</Term> is the structural design of shared information
          environments, encompassing how products are categorized, labeled, linked, and retrieved across a site.
        </Lead>
        <div className="mt-6 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                In a small Direct-to-Consumer catalog with ten items, a flat navigation bar allows a shopper to inspect
                every option within seconds.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                In a department store or marketplace catalog with hundreds of thousands of stock-keeping units (SKUs),
                poor taxonomy buries relevant products and inflates search costs.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Effective information architecture ensures that any product can be reached in{" "}
                <Term tone="signal">a few predictable steps</Term> whether the visitor arrives from the homepage, a
                category menu, an internal search query, or an external deep link.
              </P>
            </Ruled>
          </div>
          <Plate>
            <CatalogDepth />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          04. Part 1: Storefront Taxonomy, Navigation, and Product Page Design [no-exercise]
          ================================================================ */}
      <Slide id="part-1" border className="!py-8">
        <PartHead n={1} title="Storefront Taxonomy, Navigation, and Product Page Design" />
        <div className="mt-8 grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled>
            <p className={BIG}>
              Before a shopper can evaluate a product, the storefront must guide them from a broad need to a specific
              candidate set and then present the details required to decide.
            </p>
          </Ruled>
          <Ruled>
            <p className={BIG}>
              This journey moves across <Term tone="signal">three primary page templates</Term>, namely the category or
              search listing page, the product detail page, and the shopping cart.
            </p>
          </Ruled>
        </div>
        <Plate className="mt-6">
          <ThreeTemplates />
        </Plate>
      </Slide>

      {/* ================================================================
          05. Hierarchical Taxonomy Versus Faceted Navigation [exercise]
          ================================================================ */}
      <Slide
        id="hierarchical-taxonomy-versus-faceted-navigation"
        border
        className="!py-8"
        exercise={exercise["hierarchical-taxonomy-versus-faceted-navigation"]}
      >
        <SlideHeading>Hierarchical Taxonomy Versus Faceted Navigation</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-3">
            <Ruled weight="thin">
              <P>
                A <Term tone="ink">hierarchical taxonomy</Term> organizes products into a tree of mutually exclusive
                parent and child categories, such as Apparel, Footwear, and Running Shoes.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Hierarchical trees help browsers orient themselves, but they break down when shoppers filter by
                attributes that cut across categories, such as price range, material, waterproof rating, or customer
                star score.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Faceted navigation</Term> solves this problem by allowing shoppers to apply multiple
                independent attribute filters simultaneously to narrow a large result set in real time.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Breadcrumb trails</Term> display the user&apos;s current position within the category
                hierarchy and active facets, allowing one-click backtracking without losing search context.
              </P>
            </Ruled>
          </div>
          <div className="grid gap-4">
            <Plate>
              <FacetFilter />
            </Plate>
            <Ruled weight="thin">
              <P className="!max-w-none">
                Faceted navigation depends directly on the Product Information Management (PIM) system from Week 1,
                because <Term tone="signal">an item with missing or inconsistently formatted attribute values
                disappears</Term> whenever a shopper checks that filter.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          06. On-Site Search and Query Understanding [no-exercise]
          ================================================================ */}
      <Slide id="on-site-search-and-query-understanding" border className="!py-8">
        <SlideHeading>On-Site Search and Query Understanding</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <QueryEngine />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Visitors who use a storefront&apos;s internal search bar typically convert at two to four times the rate
                of visitors who only browse category menus, because a search query signals concrete purchase intent.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Early keyword search engines matched exact character strings, returning zero results whenever a shopper
                misspelled a word or used a synonym such as &quot;parka&quot; instead of &quot;winter coat.&quot;
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Modern e-commerce search combines <Term tone="ink">lexical matching</Term> with{" "}
                <Term tone="ink">semantic vector embeddings</Term> to handle typos, synonyms, and natural-language
                attribute queries such as &quot;carry-on backpack under 150 dollars.&quot;
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="signal">Zero-results pages represent a critical conversion failure</Term> and should always
                fall back to spell-corrected suggestions, relaxed attribute matches, or popular category alternatives.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          07. Anatomy of a High-Converting Product Detail Page (PDP) [exercise]
          ================================================================ */}
      <Slide
        id="anatomy-of-a-high-converting-product-detail-page-pdp"
        border
        className="!py-8"
        exercise={exercise["anatomy-of-a-high-converting-product-detail-page-pdp"]}
      >
        <SlideHeading>Anatomy of a High-Converting Product Detail Page (PDP)</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                Above the fold, the Product Detail Page (PDP) must immediately establish identity, value, and
                actionability through high-resolution media, product title, price, variant selectors (e.g., size and
                color), stock status, and a prominent add-to-cart call to action.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Below the fold, the PDP provides deeper justification for analytical buyers, including detailed
                technical specifications, size guides, care instructions, and verified customer reviews.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Experience attributes</Term>, which typically require physical inspection (e.g., fabric
                drape, fit on different body types, or port dimensions), must be translated into digital surrogates
                through 360-degree photography, short demonstration videos, and structured fit scales.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="signal">Risk-reversal signals</Term> placed near the call to action, such as exact delivery
                dates, free return windows, and warranty coverage, directly counter the uncertainty of buying sight
                unseen.
              </P>
            </Ruled>
          </div>
          <Plate>
            <PdpAnatomy />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          08. Part 2: Conversion Rate Optimization and Checkout Friction [no-exercise]
          ================================================================ */}
      <Slide id="part-2" border className="!py-8">
        <PartHead n={2} title="Conversion Rate Optimization and Checkout Friction" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <ConversionMultiplier />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Driving traffic to a storefront is costly, so improving the fraction of visitors who complete a purchase{" "}
                <Term tone="signal">multiplies the return on every acquisition channel</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                <Term tone="ink">Conversion Rate Optimization (CRO)</Term> applies behavioral diagnostics and controlled
                experimentation to remove barriers across the shopping funnel.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          09. Macro-Conversions, Micro-Conversions, and Funnel Diagnostics [exercise]
          ================================================================ */}
      <Slide
        id="macro-conversions-micro-conversions-and-funnel-diagnostics"
        border
        className="!py-8"
        exercise={exercise["macro-conversions-micro-conversions-and-funnel-diagnostics"]}
      >
        <SlideHeading>Macro-Conversions, Micro-Conversions, and Funnel Diagnostics</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              The <Term tone="ink">macro-conversion</Term> of an e-commerce site is a completed, paid order, and the
              overall conversion rate equals completed orders divided by total sessions (or unique visitors) over a
              defined period.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Micro-conversions</Term> are intermediate actions that indicate forward progress toward a
              purchase, such as executing an on-site search, viewing a product detail page, selecting a size variant,
              or clicking add to cart.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="signal">Decomposition of the funnel into step-by-step transition rates</Term> isolates where
                revenue is leaking.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A low transition rate from category page to product page points to weak thumbnail imagery,
                uncompetitive prices, or poor ranking relevance.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A high add-to-cart rate paired with a low order completion rate points to unexpected shipping fees,
                forced account creation, or payment errors inside the checkout flow.
              </P>
            </Ruled>
          </div>
          <Plate>
            <SessionLog />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          10. Sources of Shopping Cart Abandonment [no-exercise]
          ================================================================ */}
      <Slide id="sources-of-shopping-cart-abandonment" border className="!py-8">
        <SlideHeading>Sources of Shopping Cart Abandonment</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                Across global e-commerce benchmarks, roughly two-thirds to three-quarters of shopping carts are
                abandoned before payment is completed.
              </P>
            </Ruled>
            <Plate>
              <HundredCarts />
            </Plate>
            <Ruled weight="thin">
              <P>
                A portion of cart abandonment reflects natural browsing behavior, in which shoppers use the cart as a
                wish list or price comparison scratchpad without immediate intent to buy.
              </P>
            </Ruled>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                The preventable portion of cart abandonment is driven by checkout friction, led by{" "}
                <Term tone="signal">surprise extra costs</Term> (shipping fees, taxes, and handling charges revealed
                only at the final step).
              </P>
            </Ruled>
            <Plate>
              <CheckoutFriction />
            </Plate>
            <Ruled weight="thin">
              <P>
                Other major preventable causes include mandatory account registration before checkout, overly long
                address and billing forms, slow page loads, lack of preferred payment methods, and perceived security
                concerns.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          11. Reducing Checkout Friction and Recovering Abandoned Carts [exercise]
          ================================================================ */}
      <Slide
        id="reducing-checkout-friction-and-recovering-abandoned-carts"
        border
        className="!py-6"
        exercise={exercise["reducing-checkout-friction-and-recovering-abandoned-carts"]}
      >
        <SlideHeading>Reducing Checkout Friction and Recovering Abandoned Carts</SlideHeading>
        <div className="grid w-full gap-x-5 gap-y-3 md:grid-cols-2 xl:grid-cols-4">
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Upfront cost transparency</Term>, such as displaying estimated shipping fees or
              free-shipping progress bars on the product and cart pages, eliminates sticker shock at the final payment
              step.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Guest checkout</Term> allows first-time buyers to complete a transaction with only an
              email address and shipping destination, deferring optional account password creation to the order
              confirmation screen.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Form optimization</Term> reduces cognitive and typing effort through address
              autocomplete APIs, inline field validation, numeric keypads on mobile devices, and single-screen or
              clearly numbered progress steps.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Accelerated digital wallets</Term> (e.g., Apple Pay, Google Pay, and Shop Pay) replace
              manual card and address entry with biometric authentication, dramatically raising mobile checkout
              completion.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <Plate>
            <FrictionFixes />
          </Plate>
          <div className="grid gap-3">
            <Ruled weight="thin">
              <P>
                When a known shopper still abandons a cart, automated cart-recovery emails or messages sent within hours
                can recapture lost sales, though{" "}
                <Term tone="signal">routinely attaching discount codes to recovery emails trains repeat buyers to
                abandon carts strategically</Term>.
              </P>
            </Ruled>
            <Plate>
              <RecoveryDiscount />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          12. Discussion: Diagnosing a Leaky Mobile Funnel
          ================================================================ */}
      <Slide id="discussion-diagnosing-a-leaky-mobile-funnel" border className="!py-8">
        <SlideHeading>Diagnosing a Leaky Mobile Funnel</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt>
            A home-goods retailer analyzes its quarterly analytics and discovers that mobile devices account for 72
            percent of storefront sessions and 68 percent of add-to-cart events, but only 34 percent of completed
            orders. Desktop visitors convert at more than twice the mobile rate once items are in the cart. Walk through
            the checkout funnel to identify the most likely interface, form, and payment bottlenecks on mobile, and
            propose an experimentation plan to fix them.
          </Prompt>
          <Plate>
            <MobileShare />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          13. Part 3: Digital Choice Architecture and Dark Patterns [no-exercise]
          ================================================================ */}
      <Slide id="part-3" border className="!py-8">
        <PartHead n={3} title="Digital Choice Architecture and Dark Patterns" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Every storefront layout is a <Term tone="ink">choice architecture</Term> because{" "}
                <Term tone="signal">the order of options, the default selections, and the visual framing</Term>{" "}
                inevitably influence what shoppers notice and choose.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Marketers must distinguish persuasive choice architecture that helps consumers decide from deceptive dark
                patterns that manipulate them against their interests.
              </p>
            </Ruled>
          </div>
          <Plate>
            <ChoiceLevers />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          14. Persuasive Choice Architecture on the Storefront [no-exercise]
          ================================================================ */}
      <Slide id="persuasive-choice-architecture-on-the-storefront" border className="!py-8">
        <SlideHeading>Persuasive Choice Architecture on the Storefront</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <ol className="grid gap-4">
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Default options</Term> shape behavior because buyers frequently accept pre-selected
                  configurations (e.g., a standard shipping tier or a recommended bundle size) to save decision effort.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  Partitioning and limiting the number of featured alternatives prevents{" "}
                  <Term tone="ink">choice overload</Term>, as presenting three clearly differentiated product tiers
                  (e.g., Basic, Pro, and Enterprise) is easier to evaluate than presenting twenty nearly identical
                  variants.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  <Term tone="ink">Compromising and decoy framing</Term> occur when{" "}
                  <Term tone="signal">adding a high-priced anchor option makes a mid-tier option appear reasonable</Term>{" "}
                  and well-balanced by comparison.
                </P>
              </Ruled>
            </li>
            <li>
              <Ruled weight="thin">
                <P>
                  Authentic social proof and stock indicators (e.g., showing the verified count of recent reviews or
                  alerting a shopper that only two units remain in their physical size) provide decision-relevant
                  information when the underlying data are accurate.
                </P>
              </Ruled>
            </li>
          </ol>
          <Plate>
            <TierFraming />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          15. Deceptive Dark Patterns in E-Commerce Interfaces [exercise]
          ================================================================ */}
      <Slide
        id="deceptive-dark-patterns-in-e-commerce-interfaces"
        border
        className="!py-8"
        exercise={exercise["deceptive-dark-patterns-in-e-commerce-interfaces"]}
      >
        <SlideHeading>Deceptive Dark Patterns in E-Commerce Interfaces</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Drip pricing (or hidden costs)</Term> lures a shopper with a low headline price and
              progressively adds mandatory service, booking, or handling fees only after the shopper has invested time
              in the checkout flow.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Fake urgency and fabricated scarcity</Term> display countdown timers that reset on page
              refresh or &quot;Only 1 left in stock!&quot; warnings when warehouse inventory is plentiful.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Sneak into basket and pre-checked add-ons</Term> use opt-out defaults to slip extended
              warranties, shipping insurance, or recurring subscriptions into the cart without explicit affirmative
              consent.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              <Term tone="ink">Confirmshaming and roach motels</Term> manipulate emotional language on decline buttons
              or make subscribing take a single click while requiring phone calls and multi-screen labyrinths to cancel.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Plate>
            <DarkCheckout />
          </Plate>
          <div className="grid gap-4">
            <Ruled>
              <P>
                While dark patterns can inflate short-term conversion in a single A/B test, they{" "}
                <Term tone="signal">erode brand trust, increase chargebacks and returns</Term>, and violate consumer
                protection statutes enforced by the FTC, EU authorities, and Canadian regulators.
              </P>
            </Ruled>
            <Plate>
              <TrustLedger />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          16. Part 4: Machine-Readable Storefronts and Structured Data [no-exercise]
          ================================================================ */}
      <Slide id="part-4" border className="!py-8">
        <PartHead n={4} title="Machine-Readable Storefronts and Structured Data" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                A human shopper can look at a promotional banner image that says &quot;20% Off All Ceramic Mugs, Now
                $16&quot; and immediately understand the material, category, discount, and final price.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                To a search crawler or an AI agent inspecting raw webpage code, that same banner image is{" "}
                <Term tone="signal">an opaque file</Term> unless its attributes are expressed in structured,
                machine-readable markup.
              </p>
            </Ruled>
          </div>
          <Plate>
            <MugBanner />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          17. How Machines Read a Storefront [no-exercise]
          ================================================================ */}
      <Slide id="how-machines-read-a-storefront" border className="!py-8">
        <SlideHeading>How Machines Read a Storefront</SlideHeading>
        <div className="grid w-full gap-6 md:grid-cols-2 md:gap-10">
          <Ruled weight="thin">
            <P>
              Web browsers parse a page into the <Term tone="ink">Document Object Model (DOM)</Term>, a tree of HTML
              elements styled with Cascading Style Sheets (CSS) and modified by JavaScript.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Search engine crawlers, price-comparison scrapers, and LLM-based web agents extract product information by
              reading semantic HTML tags, structured metadata blocks, and text nodes in the DOM.
            </P>
          </Ruled>
        </div>
        <div className="mt-5 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                When a storefront relies entirely on client-side JavaScript to fetch prices or specifications after the
                initial page load, simple crawlers and fast text-fetching agents{" "}
                <Term tone="signal">may see an empty shell</Term> with missing product data.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Server-side rendering (SSR)</Term> and clean semantic HTML ensure that critical product
                facts (title, price, currency, availability, and specifications) are present in the initial document
                response.
              </P>
            </Ruled>
          </div>
          <Plate>
            <RenderTiming />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          18. Schema.org, JSON-LD, and Merchant Product Feeds [exercise]
          ================================================================ */}
      <Slide
        id="schema-org-json-ld-and-merchant-product-feeds"
        border
        className="!py-8"
        exercise={exercise["schema-org-json-ld-and-merchant-product-feeds"]}
      >
        <SlideHeading>Schema.org, JSON-LD, and Merchant Product Feeds</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <RichResult />
          </Plate>
          <div className="grid gap-4">
            <Ruled weight="thin">
              <P>
                <Term tone="ink">Schema.org</Term> is a standardized vocabulary founded by major search providers that
                defines universal schemas for entities such as Product, Offer, AggregateRating, Review, and
                BreadcrumbList.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Storefronts embed Schema.org data inside the page header using{" "}
                <Term tone="ink">JSON-LD (JavaScript Object Notation for Linked Data)</Term>, a clean script block that
                states exact attribute-value pairs independent of visual CSS layout.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                A JSON-LD Product block <Term tone="signal">explicitly declares</Term> the Global Trade Item Number (GTIN
                or SKU), brand name, numeric price, ISO currency code, stock status (e.g., InStock), and aggregate rating
                score and review count.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Alongside on-page JSON-LD, retailers publish automated <Term tone="ink">Merchant Center XML or API
                feeds</Term> that push bulk catalog updates, real-time inventory, and shipping rules directly to search
                engines, social platforms, and AI shopping ecosystems.
              </P>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          19. Part 5: Information Acquisition Costs in Agentic Shopping [no-exercise]
          ================================================================ */}
      <Slide id="part-5" border className="!py-8">
        <PartHead n={5} title="Information Acquisition Costs in Agentic Shopping" />
        <div className="mt-8 grid w-full items-center gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12">
          <Plate>
            <ClickMeter />
          </Plate>
          <div className="grid gap-6">
            <Ruled>
              <p className={BIG}>
                Even when an AI shopping agent can browse interactive webpages, reading and clicking through a
                storefront <Term tone="signal">is not free or instantaneous</Term>.
              </p>
            </Ruled>
            <Ruled>
              <p className={BIG}>
                Understanding how storefront information architecture affects an AI agent&apos;s inspection behavior is
                essential for business-to-agent (B2A) conversion.
              </p>
            </Ruled>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          20. Bounded Algorithmic Rationality and Inspection Costs [no-exercise]
          ================================================================ */}
      <Slide id="bounded-algorithmic-rationality-and-inspection-costs" border className="!py-8">
        <SlideHeading>Bounded Algorithmic Rationality and Inspection Costs</SlideHeading>
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                Classical economic models often assume that an automated shopping agent will exhaustively inspect every
                product listing, open every detail page, and compute a globally optimal utility score.
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Empirical research on LLM-based shopping agents demonstrates instead that agents exhibit{" "}
                <Term tone="ink">bounded algorithmic rationality</Term> (Wadi &amp; Ma, 2026a).
              </P>
            </Ruled>
            <Ruled weight="thin">
              <P>
                Each additional tool call, page navigation, or accordion expansion consumes context-window tokens, adds
                latency, and incurs monetary inference costs.
              </P>
            </Ruled>
            <Plate>
              <AgentCostReal />
            </Plate>
          </div>
          <div className="grid content-start gap-4">
            <Ruled weight="thin">
              <P>
                When key product attributes (such as unit price, warranty terms, or compatibility specs) are hidden
                behind secondary clicks or buried deep inside unstructured paragraphs, the information acquisition cost
                rises and{" "}
                <Term tone="signal">agents frequently decide using only surface-level cues visible on the listing
                card</Term>.
              </P>
            </Ruled>
            <Plate>
              <InspectionBudget />
            </Plate>
          </div>
        </div>
      </Slide>

      {/* ================================================================
          21. How Storefront Architecture Shapes AI Agent Choice [exercise]
          ================================================================ */}
      <Slide
        id="how-storefront-architecture-shapes-ai-agent-choice"
        border
        className="!py-8"
        exercise={exercise["how-storefront-architecture-shapes-ai-agent-choice"]}
      >
        <SlideHeading>How Storefront Architecture Shapes AI Agent Choice</SlideHeading>
        <div className="grid w-full gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
          <Ruled weight="thin">
            <P>
              When critical attributes are exposed upfront in structured summaries or listing cards, AI shopping agents
              compare alternatives more accurately and are less reliant on superficial heuristics (Wadi &amp; Ma,
              2026a).
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Conversely, when storefronts hide unfavorable attributes (e.g., high shipping fees, restocking penalties,
              or lower unit quantities) behind secondary tabs or checkout steps, agents that truncate search early can
              be misled into selecting dominated options.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              At the same time, if a legitimate brand buries its superior technical specifications inside non-indexed
              PDFs, flat images, or collapsed JavaScript tabs, an AI agent scanning the page may treat those missing
              attributes as absent and disqualify the product.
            </P>
          </Ruled>
          <Ruled weight="thin">
            <P>
              Designing for dual audiences therefore requires pairing{" "}
              <Term tone="signal">clean visual hierarchy for humans with low-friction, upfront structured attribute
              tables and JSON-LD markup for AI agents</Term>.
            </P>
          </Ruled>
        </div>
        <Plate className="mt-5">
          <HiddenAttributes />
        </Plate>
      </Slide>

      {/* ================================================================
          22. Discussion: When a Redesign Hurts Agentic Sales
          ================================================================ */}
      <Slide id="discussion-when-a-redesign-hurts-agentic-sales" border className="!py-8">
        <SlideHeading>When a Redesign Hurts Agentic Sales</SlideHeading>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <Prompt className="[&_p]:!text-[clamp(1.2rem,1.9vw,1.65rem)]">
            A specialty coffee equipment brand redesigns its Product Detail Pages with a minimalist aesthetic. To make
            the page look clean, the designer removes the visible specification table, puts boiler material and wattage
            inside a downloadable PDF manual, and requires three sequential clicks through a custom modal to reveal
            shipping costs. Human conversion rates remain flat, but orders originating from AI shopping assistants drop
            by 45 percent. Explain why this drop occurred using the concepts of machine readability and information
            acquisition costs, and specify how to redesign the page so both humans and AI agents convert.
          </Prompt>
          <Plate>
            <RedesignDrop />
          </Plate>
        </div>
      </Slide>

      {/* ================================================================
          23. Key Takeaways
          ================================================================ */}
      <Slide id="key-takeaways" border className="!py-8">
        <SlideHeading>Key Takeaways</SlideHeading>
        <ol className="grid w-full gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Storefront information architecture reduces search friction and product uncertainty through logical hierarchies, faceted attribute navigation, semantic on-site search, and risk-reversing Product Detail Pages.",
            "Conversion Rate Optimization (CRO) decomposes the journey into micro- and macro-conversions to diagnose where visitors drop off between discovery, cart, and checkout.",
            "Most preventable cart abandonment stems from surprise shipping fees, mandatory account creation, and tedious mobile forms, which firms counter through upfront price transparency, guest checkout, and digital wallets.",
            "Ethical choice architecture uses sensible defaults and clear tiering to reduce cognitive load, whereas deceptive dark patterns (drip pricing, fake urgency, sneak-into-basket, and roach motels) manipulate users and invite regulatory penalties.",
            "Machines read storefronts through the HTML DOM, server-side rendered content, Schema.org JSON-LD blocks, and structured merchant feeds rather than visual pixels.",
            "AI shopping agents operate under bounded algorithmic rationality and face real information acquisition costs, meaning that storefronts must make core product attributes, prices, and policies immediately accessible in structured text and code.",
          ].map((takeaway, i) => (
            <li key={i} className="min-w-0">
              <Numbered n={i + 1}>
                <Ruled weight="thin">
                  <P>{takeaway}</P>
                </Ruled>
              </Numbered>
            </li>
          ))}
        </ol>
      </Slide>
    </SlideDeck>
  );
}
